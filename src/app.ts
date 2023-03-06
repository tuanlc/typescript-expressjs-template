import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import './api';

export default app;
