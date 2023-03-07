import express from 'express';
import bodyParser from 'body-parser';
import { setupApis } from './api';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setupApis(app);

const server = app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );

  console.log('Press CTRL-C to stop\n');
});

export default server;
