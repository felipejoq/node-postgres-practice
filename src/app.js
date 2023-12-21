import express from 'express';
import { envs } from './config/plugins/envs.js';
import { AppRouter } from './routes/v1/appRoutes.js';

const app = express();

app.use('/', AppRouter)

app.listen(envs.PORT, () => {
  console.log(`🚀 App Ready on: ${envs.BASE_URL}:${envs.PORT}`);
})