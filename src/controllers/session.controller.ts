import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Session} from '../models';
import {SessionRepository} from '../repositories';

export class SessionsController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) { }

  @post('/session', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: {'application/json': {schema: getModelSchemaRef(Session)}},
      }
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Session, {
            title: 'NewSession',
          }),
        },
      },
    })
    session: Session,
  ): Promise<Session> {
      return this.sessionRepository.create(session);
    }

  @get('/session/{id}', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Session, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Session, {exclude: 'where'}) filter?: FilterExcludingWhere<Session>
  ): Promise<Session> {
    return this.sessionRepository.findById(id, filter);
  }

  @put('/session/{id}', {
    responses: {
      '204': {
        description: 'Session PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() session: Session,
  ): Promise<void> {
    await this.sessionRepository.replaceById(id, session);
  }

  @del('/session/{id}', {
    responses: {
      '204': {
        description: 'Session DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sessionRepository.deleteById(id);
  }
}
