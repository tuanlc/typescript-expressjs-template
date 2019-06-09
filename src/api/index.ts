import ExampleApi from './example';

import { Router, Express } from 'express';

export let setupApis = (application: Express) => {
  const router = Router();
  const exampleApi = new ExampleApi(router);

  exampleApi.setupApi();

  application.use('/api', router);
};

export interface API {
  setupApi(): any;
}
