// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {Nexus} from '../services';

// import {inject} from '@loopback/core';


export class TestController {
  constructor(
    //@inject('services.Nexus')
    protected nexusService: Nexus
  ) {}

  @get('/asset/{sha1}', {
    responses: {
      '200': {
        description: 'Asset model instance',
        content: 'application/json',
      },
    },
  })
  async searchAsset(@param.path.string('sha1') sha1: string): Promise<boolean> {
    // wrap the parameters in a JSON object
    const response = await this.nexusService.searchAssetBySha1(sha1);

    var assetExist = false

    if (response.items[0]) {
      assetExist = true
    }
    // we normally only return the response body
    return assetExist;
  }
}
