import type { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module.js';
import { configureApp } from '../../src/bootstrap/configure-app.js';
import type { Env } from '../../src/config/env.schema.js';
import { validateEnv } from '../../src/config/validate-env.js';
import { PrismaService } from '../../src/infrastructure/prisma/prisma.service.js';

export interface TestAppOptions {
  /** Extra modules (e.g. test-only controllers). */
  imports?: Type[];
  /** Overrides applied on top of process.env for HTTP-level settings. */
  env?: Record<string, string>;
  /** Point Prisma at a different database URL (e.g. an unreachable one). */
  databaseUrl?: string;
}

/** Boots the real AppModule with the same HTTP configuration as production. */
export async function createTestApp(options: TestAppOptions = {}): Promise<NestExpressApplication> {
  const env = validateEnv({ ...process.env, ...options.env });

  let builder = Test.createTestingModule({ imports: [AppModule, ...(options.imports ?? [])] });
  if (options.databaseUrl) {
    const config = new ConfigService<Env, true>({ ...env, DATABASE_URL: options.databaseUrl });
    builder = builder.overrideProvider(PrismaService).useValue(new PrismaService(config));
  }
  const moduleRef = await builder.compile();

  const app = moduleRef.createNestApplication<NestExpressApplication>({ bodyParser: false, logger: false });
  configureApp(app, env);
  await app.init();
  return app;
}
