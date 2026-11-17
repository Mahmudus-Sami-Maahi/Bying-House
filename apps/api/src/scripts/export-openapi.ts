/**
 * Writes the OpenAPI document to apps/api/openapi.json without starting the
 * server or connecting to the database. The web app generates its API types
 * from this file, and CI fails if the committed copy is out of date.
 *
 * Run with: npm run openapi:export
 */
import './export-openapi.env.js'; // must stay first
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../app.module.js';
import { configureApp } from '../bootstrap/configure-app.js';
import { buildOpenApiDocument } from '../bootstrap/openapi.js';
import { validateEnv } from '../config/validate-env.js';

async function exportOpenApi(): Promise<void> {
  // The version in the committed file must not change between builds.
  const env = validateEnv({ ...process.env, APP_VERSION: '1.0.0', SWAGGER_ENABLED: 'false' });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
    bodyParser: false,
    abortOnError: false,
  });
  configureApp(app, env);

  const document = buildOpenApiDocument(app, env);
  const target = resolve(process.cwd(), 'openapi.json');
  writeFileSync(target, `${JSON.stringify(document, null, 2)}\n`, 'utf8');
  await app.close();

  console.log(`OpenAPI document written to ${target}`);
}

await exportOpenApi();
