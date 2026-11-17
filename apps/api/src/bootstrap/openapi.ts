import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, type OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import type { Env } from '../config/env.schema.js';

export const DOCS_PATH = 'api/docs';

export function buildOpenApiDocument(app: INestApplication, env: Pick<Env, 'APP_VERSION'>): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('MetaMax Fashions API')
    .setDescription(
      [
        'Backend API for the MetaMax Fashions website and admin panel.',
        '',
        '- `/api/v1/public/*`: no authentication, read-only except inquiry submission.',
        '- `/api/v1/admin/*`: requires an admin session (Bearer token) and a permission.',
        '- `/api/health/*`: container health checks.',
        '',
        'Successful responses are wrapped as `{ "data": ... }` (lists add `"meta"`).',
        'Errors are `{ "error": { "code", "message", "details"?, "requestId" } }`.',
      ].join('\n'),
    )
    .setVersion(env.APP_VERSION)
    .addBearerAuth({ type: 'http', scheme: 'bearer', description: 'Admin session token' }, 'session')
    .build();

  return SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  });
}

/** Serves Swagger UI at /api/docs and the JSON spec at /api/docs-json. */
export function setupOpenApi(app: INestApplication, env: Pick<Env, 'APP_VERSION'>): void {
  SwaggerModule.setup(DOCS_PATH, app, () => buildOpenApiDocument(app, env), {
    jsonDocumentUrl: `${DOCS_PATH}-json`,
    customSiteTitle: 'MetaMax Fashions API',
  });
}
