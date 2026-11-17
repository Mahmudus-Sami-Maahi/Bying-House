import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { RawResponse } from '../../common/interceptors/response-envelope.interceptor.js';
import type { Env } from '../../config/env.schema.js';
import { DatabaseHealthIndicator } from './database.health.js';

/**
 * Container health checks (unversioned: /api/health/*).
 * - live:  the process answers; never checks dependencies (a restart cannot fix a database).
 * - ready: the API can serve requests; checks the database.
 */
@ApiTags('Health')
@RawResponse()
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: DatabaseHealthIndicator,
    private readonly config: ConfigService<Env, true>,
  ) {}

  @Get('live')
  @HealthCheck()
  @ApiOperation({ summary: 'Liveness: the API process is running', operationId: 'healthLive' })
  live() {
    const version = this.config.get('APP_VERSION', { infer: true });
    return this.health.check([
      () => ({ app: { status: 'up', version, uptimeSeconds: Math.round(process.uptime()) } }),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  @ApiOperation({ summary: 'Readiness: the API and its database are available', operationId: 'healthReady' })
  ready() {
    return this.health.check([() => this.database.isHealthy('database')]);
  }
}
