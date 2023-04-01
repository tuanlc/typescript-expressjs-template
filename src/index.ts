import express from 'express';
import bodyParser from 'body-parser';
import { setupApis } from './api';
import { lifecycle } from './lifecycle-manager';

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

const closeServer = async (): Promise<void> => {
  await server.close();
};

lifecycle.on('close', closeServer);

process
  .on('SIGTERM', async () => {
    process.exitCode = 1;
    await lifecycle.close();
  })
  .on('SIGINT', async () => {
    process.exitCode = 1;
    await lifecycle.close();
  })
  .on('uncaughtException', async (err) => {
    console.log('Uncaught exception', err);
    process.exitCode = 1;
    await lifecycle.close();
  })
  .on('unhandledRejection', async () => {
    process.exitCode = 1;
    await lifecycle.close();
  });

export default server;
