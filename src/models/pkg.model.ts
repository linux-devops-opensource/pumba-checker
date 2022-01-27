import {Entity, model, property} from '@loopback/repository';

@model()
export class Pkg extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  version: string;

  @property({
    type: 'boolean',
    default: false,
  })
  existInTarget: boolean;

  @property({
    type: 'string',
    required: true,
  })
  sha1: string;

  constructor(data?: Partial<Pkg>) {
    super(data);
  }
}

export interface PkgRelations {
  // describe navigational properties here
}

export type PkgWithRelations = Pkg & PkgRelations;
