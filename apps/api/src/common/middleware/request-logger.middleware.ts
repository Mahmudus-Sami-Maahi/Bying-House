import { Logger } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { currentRequestId } from '../request-context.js';

const logger = new Logger('HTTP');

// Container health probes run every few seconds; keep them out of normal logs.
const QUIET_PATHS = /^\/api\/health(\/|$)/;

/**
 * Writes one structured line per finished request. Only the path is logged,
 * never the query string or body, so personal data stays out of the logs.
 */
export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const startedAt = process.hrtime.bigint();
  const requestId = currentRequestId();
  // Captured now: routers rewrite req.url/req.path while handling the request.
  const path = req.originalUrl.split('?')[0];

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    const entry = {
      requestId,
      method: req.method,
      path,
      status: res.statusCode,
      durationMs: Math.round(durationMs * 10) / 10,
    };
    const message = `${req.method} ${path} ${res.statusCode}`;

    if (QUIET_PATHS.test(path) && res.statusCode < 400) {
      logger.verbose(message, entry);
    } else if (res.statusCode >= 500) {
      logger.error(message, entry);
    } else if (res.statusCode >= 400) {
      logger.warn(message, entry);
    } else {
      logger.log(message, entry);
    }
  });

  next();
}
