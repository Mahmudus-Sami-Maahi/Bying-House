import type { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { createTestApp } from './utils/create-test-app.js';
import { ProbeModule } from './utils/probe.module.js';

// Port 1 is never listening, so this database is guaranteed unreachable.
const UNREACHABLE_DB = 'postgresql://nobody:nothing@127.0.0.1:1/none';

/**
 * HTTP foundation: routing, envelopes, errors, validation, headers, CORS and docs.
 * These tests do not need a running database.
 */
describe('API foundation (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    app = await createTestApp({
      imports: [ProbeModule],
      databaseUrl: UNREACHABLE_DB,
      env: { CORS_ORIGINS: 'https://allowed.example', SWAGGER_ENABLED: 'true' },
    });
  });
  afterAll(async () => {
    await app.close();
  });

  describe('health', () => {
    it('GET /api/health/live answers without checking the database', async () => {
      const res = await request(app.getHttpServer()).get('/api/health/live').expect(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.info.app).toMatchObject({ status: 'up', version: expect.any(String) });
    });

    it('GET /api/health/ready reports 503 when the database is unreachable', async () => {
      const res = await request(app.getHttpServer()).get('/api/health/ready').expect(503);
      expect(res.body.status).toBe('error');
      expect(res.body.error.database.status).toBe('down');
    });

    it('does not reveal driver error details in the readiness response', async () => {
      const res = await request(app.getHttpServer()).get('/api/health/ready').expect(503);
      const text = JSON.stringify(res.body);
      expect(text).not.toMatch(/ECONNREFUSED|prisma|127\.0\.0\.1|nobody/i);
    });
  });

  describe('routing and envelopes', () => {
    it('serves versioned routes under /api/v1 and wraps data', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/probe/echo')
        .send({ name: 'Paris', email: 'buyer@example.com' })
        .expect(201);
      expect(res.body).toEqual({ data: { name: 'Paris', email: 'buyer@example.com' } });
    });

    it('wraps paginated lists as { data, meta }', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/probe/list').expect(200);
      expect(res.body).toEqual({ data: [{ id: 1 }], meta: { page: 1, pageSize: 20, total: 1, totalPages: 1 } });
    });

    it('returns the error envelope for unknown routes, with the request ID', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/nothing-here').expect(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
      expect(res.body.error.requestId).toBe(res.headers['x-request-id']);
    });

    it('does not serve unprefixed paths', async () => {
      await request(app.getHttpServer()).get('/health/live').expect(404);
    });
  });

  describe('validation and errors', () => {
    it('rejects invalid input with 422 and one detail per field', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/probe/echo')
        .send({ name: 'P', email: 'not-an-email', extra: true })
        .expect(422);
      expect(res.body.error.code).toBe('VALIDATION_FAILED');
      const paths = res.body.error.details.map((d: { path?: string }) => d.path);
      expect(paths).toEqual(expect.arrayContaining(['name', 'email']));
    });

    it('rejects malformed JSON with 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/probe/echo')
        .set('Content-Type', 'application/json')
        .send('{"name": ')
        .expect(400);
      expect(res.body.error.code).toBe('BAD_REQUEST');
    });

    it('rejects bodies over the size limit with 413', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/probe/echo')
        .send({ name: 'x'.repeat(600 * 1024), email: 'a@b.co' })
        .expect(413);
      expect(res.body.error.code).toBe('PAYLOAD_TOO_LARGE');
    });

    it('hides internal details of unexpected errors', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/probe/crash').expect(500);
      expect(res.body.error.code).toBe('INTERNAL_ERROR');
      expect(JSON.stringify(res.body)).not.toContain('hunter2');
    });
  });

  describe('request IDs', () => {
    it('keeps a safe incoming X-Request-Id', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/health/live')
        .set('X-Request-Id', 'web-1234abcd')
        .expect(200);
      expect(res.headers['x-request-id']).toBe('web-1234abcd');
    });

    it('replaces an unsafe X-Request-Id', async () => {
      const res = await request(app.getHttpServer()).get('/api/health/live').set('X-Request-Id', 'bad id!').expect(200);
      expect(res.headers['x-request-id']).not.toBe('bad id!');
    });
  });

  describe('security headers and CORS', () => {
    it('sends security headers and hides the framework', async () => {
      const res = await request(app.getHttpServer()).get('/api/health/live');
      expect(res.headers['x-content-type-options']).toBe('nosniff');
      expect(res.headers['content-security-policy']).toBeDefined();
      expect(res.headers['referrer-policy']).toBe('no-referrer');
      expect(res.headers['x-powered-by']).toBeUndefined();
    });

    it('allows a configured origin', async () => {
      const res = await request(app.getHttpServer())
        .options('/api/v1/probe/echo')
        .set('Origin', 'https://allowed.example')
        .set('Access-Control-Request-Method', 'POST');
      expect(res.headers['access-control-allow-origin']).toBe('https://allowed.example');
      expect(res.headers['access-control-allow-credentials']).toBeUndefined();
    });

    it('does not allow other origins', async () => {
      const res = await request(app.getHttpServer())
        .options('/api/v1/probe/echo')
        .set('Origin', 'https://evil.example')
        .set('Access-Control-Request-Method', 'POST');
      expect(res.headers['access-control-allow-origin']).toBeUndefined();
    });
  });

  describe('API documentation', () => {
    it('serves the OpenAPI document at /api/docs-json', async () => {
      const res = await request(app.getHttpServer()).get('/api/docs-json').expect(200);
      expect(res.body.info.title).toBe('MetaMax Fashions API');
      expect(Object.keys(res.body.paths)).toEqual(
        expect.arrayContaining(['/api/health/live', '/api/health/ready', '/api/v1/probe/echo']),
      );
    });

    it('serves Swagger UI at /api/docs', async () => {
      const res = await request(app.getHttpServer()).get('/api/docs').redirects(1).expect(200);
      expect(res.text).toContain('swagger');
    });
  });
});

describe('API documentation switched off (e2e)', () => {
  it('does not expose /api/docs when SWAGGER_ENABLED=false', async () => {
    const app = await createTestApp({ databaseUrl: UNREACHABLE_DB, env: { SWAGGER_ENABLED: 'false' } });
    try {
      await request(app.getHttpServer()).get('/api/docs-json').expect(404);
    } finally {
      await app.close();
    }
  });
});
