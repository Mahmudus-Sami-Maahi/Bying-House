// Local development reads .env; containers receive real environment variables.
import './config/load-env.js'; // must stay first
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { configureApp } from './bootstrap/configure-app.js';
import { createLogger } from './common/logger/create-logger.js';
import { validateEnv } from './config/validate-env.js';

async function bootstrap(): Promise<void> {
  const env = validateEnv(process.env);

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: createLogger(env),
    bodyParser: false, // configured in configureApp with an explicit size limit
  });
  configureApp(app, env);

  await app.listen(env.PORT, '0.0.0.0');
  new Logger('Bootstrap').log(`API listening on port ${env.PORT}`, {
    version: env.APP_VERSION,
    nodeEnv: env.NODE_ENV,
    docs: env.SWAGGER_ENABLED ? '/api/docs' : 'disabled',
  });
}

await bootstrap();
