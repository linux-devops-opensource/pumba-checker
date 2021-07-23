import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'nexusds',
  connector: 'rest',
  baseURL: 'http://20.76.247.10:8081/service/rest/',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'http://20.76.247.10:8081/service/rest/v1/search/assets?sha1={sha1}',
      },
      functions: {
        searchAssetBySha1: ['sha1'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class NexusdsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'nexusds';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.nexusds', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
