import * as exampleMW from './middleware';
import * as exampleCtrl from './controller';
import { Router } from 'express';
import { API } from '..';

export default class ExampleApi implements API {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  setupApi() {
    this.router.get('/example', exampleMW.canGet, exampleCtrl.get);
  }
}
