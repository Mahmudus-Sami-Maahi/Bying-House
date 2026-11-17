import { VersioningType } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { requestIdMiddleware } from '../common/middleware/request-id.middleware.js';
import { requestLoggerMiddleware } from '../common/middleware/request-logger.middleware.js';
import type { Env } from '../config/env.schema.js';
import { setupOpenApi } from './openapi.js';

export const API_PREFIX = 'api';

/**
 * Applies every HTTP-level setting. Shared by main.ts, the e2e tests and the
 * OpenAPI export, so all three run the same configuration.
 */
export function configureApp(app: NestExpressApplication, env: Env): void {
  // Must come first so even early responses carry the headers.
  // The API serves JSON only, so the strictest CSP applies outside Swagger UI.
  app.useSecurityHeaders({
    referrerPolicy: { policy: 'no-referrer' },
  });

  app.use(requestIdMiddleware);
  app.use(requestLoggerMiddleware);

  // Behind Nginx: trust exactly the configured number of proxy hops for req.ip.
  app.set('trust proxy', env.TRUST_PROXY_HOPS);
  app.useBodyParser('json', { limit: env.REQUEST_BODY_LIMIT });

  // Browsers do not call this API directly (Next.js calls it server-side), so
  // CORS is closed unless origins are configured explicitly.
  app.enableCors({
    origin: env.CORS_ORIGINS.length > 0 ? env.CORS_ORIGINS : false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id', 'Idempotency-Key'],
    exposedHeaders: ['X-Request-Id'],
    credentials: false,
    maxAge: 600,
  });

  // Routes: /api/v1/... ; health stays unversioned at /api/health/...
  app.setGlobalPrefix(API_PREFIX);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.enableShutdownHooks();

  if (env.SWAGGER_ENABLED) {
    setupOpenApi(app, env);
  }
}
