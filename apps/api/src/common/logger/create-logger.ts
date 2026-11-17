import { ConsoleLogger } from '@nestjs/common';
import { ALL_LOG_LEVELS, type Env } from '../../config/env.schema.js';

/**
 * Keys masked in every log entry, wherever they appear. Inquiry contact
 * details are personal data and must not reach log storage.
 */
export const REDACTED_LOG_KEYS = [
  'password',
  'passwordHash',
  'token',
  'authorization',
  'cookie',
  'secret',
  'email',
  'phone',
  'message',
] as const;

/** Nest's built-in logger: JSON lines in production, readable text locally. */
export function createLogger(env: Pick<Env, 'LOG_LEVEL' | 'LOG_FORMAT'>): ConsoleLogger {
  const threshold = ALL_LOG_LEVELS.indexOf(env.LOG_LEVEL);
  return new ConsoleLogger({
    json: env.LOG_FORMAT === 'json',
    logLevels: ALL_LOG_LEVELS.slice(0, threshold + 1),
    redact: [...REDACTED_LOG_KEYS],
  });
}
