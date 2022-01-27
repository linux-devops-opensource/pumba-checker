import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

require('dotenv').config();

const BASE_URL = process.env.REPO_BASE_URL;
const SEARCH_SHA1_URL = process.env.SHA1_SEARCH_API;

if (BASE_URL == undefined || SEARCH_SHA1_URL == undefined) {
	throw new Error('base urls are undefined somehow -- nexusds');
}

const config = {
	name: 'nexusds',
	connector: 'rest',
	baseURL: BASE_URL,
	crud: false,
	options: {
		headers: {
			accept: 'application/json',
			'content-type': 'application/json'
		}
	},
	operations: [
		{
			template: {
				method: 'GET',
				url: BASE_URL + SEARCH_SHA1_URL + '{sha1}'
			},
			functions: {
				searchAssetBySha1: [ 'sha1' ]
			}
		}
	]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class NexusdsDataSource extends juggler.DataSource implements LifeCycleObserver {
	static dataSourceName = 'nexusds';
	static readonly defaultConfig = config;

	constructor(
		@inject('datasources.config.nexusds', { optional: true })
		dsConfig: object = config
	) {
		super(dsConfig);
	}
}
