// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


export class CheckPackagesController {
  constructor() {}
}
@post('/checkpackages')
check(@requestBody() package: any): Object {
  package.status = "success";
  return package;
}
