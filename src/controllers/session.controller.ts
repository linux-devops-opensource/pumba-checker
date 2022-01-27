import { inject } from '@loopback/core';
import { FilterExcludingWhere, repository } from '@loopback/repository';
import { post, param, get, getModelSchemaRef, put, del, requestBody } from '@loopback/rest';
import { Session } from '../models';
import { SessionRepository } from '../repositories';
import { Nexus } from '../services';

export class SessionsController {
	constructor(
		@repository(SessionRepository) public sessionRepository: SessionRepository,
		@inject('services.Nexus') protected nexusService: Nexus
	) {}

	@post('/session', {
		responses: {
			'200': {
				description: 'Session model instance',
				content: { 'application/json': { schema: getModelSchemaRef(Session) } }
			}
		}
	})
	async checkAssets(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Session, {
						title: 'NewSession'
					})
				}
			}
		})
		session: Session
	): Promise<Session> {
		for (let pkg of session.pkgs) {
			console.log('checking for ', pkg.name);
			try {
				const assets = await this.nexusService.searchAssetBySha1(pkg.sha1);
				console.log(assets);
				if (assets.items[0]) {
					pkg.existInTarget = true;
				} else {
					throw new Error();
				}
			} catch (e) {
				pkg.existInTarget = false;
			}
		}

		return this.sessionRepository.create(session);
	}

	@get('/session/{id}', {
		responses: {
			'200': {
				description: 'Session model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(Session, { includeRelations: true })
					}
				}
			}
		}
	})
	async findById(
		@param.path.string('id') id: string,
		@param.filter(Session, { exclude: 'where' })
		filter?: FilterExcludingWhere<Session>
	): Promise<Session> {
		return this.sessionRepository.findById(id, filter);
	}

	@put('/session/{id}', {
		responses: {
			'204': {
				description: 'Session PUT success'
			}
		}
	})
	async replaceById(@param.path.string('id') id: string, @requestBody() session: Session): Promise<void> {
		await this.sessionRepository.replaceById(id, session);
	}

	@del('/session/{id}', {
		responses: {
			'204': {
				description: 'Session DELETE success'
			}
		}
	})
	async deleteById(@param.path.string('id') id: string): Promise<void> {
		await this.sessionRepository.deleteById(id);
	}
}
