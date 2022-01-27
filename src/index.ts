import {ApplicationConfig, CheckerApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {

  // moved the variable check here so that the server won't start if they aren't defined, 
  // instead of starting the server and then error-ing later 
  if ( process.env.REPO_BASE_URL == undefined ) {
    throw new Error('nexus base url is not defined')
  }
  if ( process.env.SHA1_SEARCH_API == undefined) {
    throw new Error('nexus base sha1 search url is not defined')
  }

  const app = new CheckerApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
