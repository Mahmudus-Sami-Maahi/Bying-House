import { Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import type { Env } from '../../config/env.schema.js';
import { PrismaClient } from '../../generated/prisma/client.js';

/** The single Prisma Client for the app, connected through the PostgreSQL driver adapter. */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(config: ConfigService<Env, true>) {
    const adapter = new PrismaPg({
      connectionString: config.get('DATABASE_URL', { infer: true }),
    });
    super({ adapter });
  }

  /**
   * Tries to connect at startup so problems show up in the logs immediately.
   * If PostgreSQL is temporarily unavailable, the API still starts: the
   * readiness check (/api/health/ready) reports "down" and Prisma reconnects
   * on the next query. A malformed DATABASE_URL is already rejected by config
   * validation before this runs.
   */
  async onModuleInit(): Promise<void> {
    try {
      // With a driver adapter, $connect() does not open a connection by itself,
      // so run a real query to know whether the database answers.
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      this.logger.log('Connected to PostgreSQL');
    } catch (error) {
      this.logger.error(
        'PostgreSQL is not reachable at startup; readiness will report it until it recovers',
        undefined,
        { cause: describeDbError(error) },
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}

/**
 * A short, log-safe description of a database error: the driver error code
 * (e.g. ECONNREFUSED, 28P01) and the first meaningful message line.
 */
export function describeDbError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const code = findCode(error);
  const firstLine = error.message
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('Invalid `prisma'));
  return [code, firstLine].filter(Boolean).join(': ') || error.name;
}

function findCode(error: unknown, depth = 0): string | undefined {
  if (typeof error !== 'object' || error === null || depth > 3) return undefined;
  const { code, cause } = error as { code?: unknown; cause?: unknown };
  if (typeof code === 'string' && code) return code;
  return findCode(cause, depth + 1);
}
