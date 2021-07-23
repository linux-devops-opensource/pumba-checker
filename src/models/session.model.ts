import {Entity, model, property} from '@loopback/repository';
import {Pkg} from './pkg.model';

@model()
export class Session extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  sid: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  statusCode: number;

  @property.array(Pkg, {
    type: 'array',
    itemType: 'object',
  })
  pkgs: Pkg[];

  // Define well-known properties here

  constructor(data?: Partial<Session>) {
    super(data);
  }
}

export interface SessionRelations {
  // describe navigational properties here
}

export type SessionWithRelations = Session & SessionRelations;
