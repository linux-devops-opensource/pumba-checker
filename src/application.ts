import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RestExplorerBindings, RestExplorerComponent } from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication, RestBindings } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';

export { ApplicationConfig };

export class CheckerApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
	constructor(options: ApplicationConfig = {}) {
		super(options);

		// Set up the custom sequence
		this.sequence(MySequence);

		// allows for a normal-er debugging experience -- BANDAID
		// // https://stackoverflow.com/questions/55308813/how-do-i-return-an-error-from-a-controller-in-loopback-4
		this.bind(RestBindings.ERROR_WRITER_OPTIONS).to({ debug: true });

		// Set up default home page
		this.static('/', path.join(__dirname, '../public'));

		// Customize @loopback/rest-explorer configuration here
		this.configure(RestExplorerBindings.COMPONENT).to({
			path: '/explorer'
		});
		this.component(RestExplorerComponent);

		this.projectRoot = __dirname;
		// Customize @loopback/boot Booter Conventions here
		this.bootOptions = {
			controllers: {
				// Customize ControllerBooter Conventions here
				dirs: [ 'controllers' ],
				extensions: [ '.controller.js' ],
				nested: true
			}
		};
	}
}
