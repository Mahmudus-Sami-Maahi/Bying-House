import type { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service.js';
import { createTestApp } from './utils/create-test-app.js';

/**
 * Needs a running PostgreSQL at DATABASE_URL (local: infra/compose/docker-compose.dev.yml,
 * CI: a postgres service container).
 */
describe('Database connectivity (e2e)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });
  afterAll(async () => {
    await app.close();
  });

  it('GET /api/health/ready reports the database as up', async () => {
    const res = await request(app.getHttpServer()).get('/api/health/ready').expect(200);
    expect(res.body).toMatchObject({ status: 'ok', info: { database: { status: 'up' } } });
  });

  it('runs a query through Prisma and the pg driver adapter', async () => {
    const prisma = app.get(PrismaService);
    const [row] = await prisma.$queryRaw<{ version: string }[]>`SELECT current_setting('server_version') AS version`;
    expect(row.version).toMatch(/^18\./);
  });
});
