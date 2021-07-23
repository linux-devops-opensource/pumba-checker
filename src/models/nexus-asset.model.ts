import {Entity, model, property} from '@loopback/repository';

@model()
export class NexusAsset extends Entity {
  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  items: object[];

  @property({
    type: 'string',
  })
  continuationToken?: string;


  constructor(data?: Partial<NexusAsset>) {
    super(data);
  }
}

export interface NexusAssetRelations {
  // describe navigational properties here
}

export type NexusAssetWithRelations = NexusAsset & NexusAssetRelations;
