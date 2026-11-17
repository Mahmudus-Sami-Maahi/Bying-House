import { Injectable, Logger } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';
import { currentRequestId } from '../../common/request-context.js';
import { describeDbError, PrismaService } from '../../infrastructure/prisma/prisma.service.js';

const TIMEOUT_MS = 1500;

/**
 * Database readiness. Unlike Terminus' built-in Prisma indicator, it never puts
 * driver error text in the public response (it can reveal internals); the
 * details are logged on the server instead.
 */
@Injectable()
export class DatabaseHealthIndicator {
  private readonly logger = new Logger(DatabaseHealthIndicator.name);

  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,
    private readonly prisma: PrismaService,
  ) {}

  async isHealthy(key: string) {
    const indicator = this.healthIndicatorService.check(key);
    const startedAt = Date.now();
    try {
      await withTimeout(this.prisma.$queryRaw`SELECT 1`, TIMEOUT_MS);
      return indicator.up({ responseTime: Date.now() - startedAt });
    } catch (error) {
      this.logger.error('Database readiness check failed', undefined, {
        requestId: currentRequestId(),
        cause: describeDbError(error),
      });
      return indicator.down('database unavailable');
    }
  }
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${ms} ms`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}
