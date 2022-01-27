import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SessionsDsDataSource} from '../datasources';
import {Session, SessionRelations} from '../models';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.sid,
  SessionRelations
> {
  constructor(
    @inject('datasources.SessionsDs') dataSource: SessionsDsDataSource,
  ) {
    super(Session, dataSource);
  }
}
