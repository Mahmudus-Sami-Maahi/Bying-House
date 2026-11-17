import { z } from 'zod';

/**
 * Every environment variable the API reads, validated once at startup.
 * Add new variables here (and to .env.example) in the phase that needs them.
 */

const LOG_LEVELS = ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'] as const;

const booleanFlag = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');

const commaSeparatedOrigins = z
  .string()
  .default('')
  .transform((value) =>
    value
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.url({ protocol: /^https?$/ })));

export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(4000),
    APP_VERSION: z.string().min(1).default('dev'),

    DATABASE_URL: z
      .string()
      .min(1)
      .refine((value) => /^postgres(ql)?:\/\//.test(value), {
        message: 'must be a postgresql:// connection string',
      }),

    CORS_ORIGINS: commaSeparatedOrigins,
    TRUST_PROXY_HOPS: z.coerce.number().int().min(0).max(5).default(1),
    REQUEST_BODY_LIMIT: z
      .string()
      .regex(/^\d+(kb|mb)$/)
      .default('512kb'),

    LOG_LEVEL: z.enum(LOG_LEVELS).default('log'),
    LOG_FORMAT: z.enum(['json', 'pretty']).optional(),

    SWAGGER_ENABLED: booleanFlag.optional(),
  })
  .transform((env) => ({
    ...env,
    // JSON logs in production unless overridden; readable logs elsewhere.
    LOG_FORMAT: env.LOG_FORMAT ?? (env.NODE_ENV === 'production' ? 'json' : 'pretty'),
    // API docs on by default outside production; in production they must be
    // switched on explicitly (and are protected at the proxy, Phase 14).
    SWAGGER_ENABLED: env.SWAGGER_ENABLED ?? env.NODE_ENV !== 'production',
  }));

export type Env = z.output<typeof envSchema>;
export type LogLevel = (typeof LOG_LEVELS)[number];
export const ALL_LOG_LEVELS = LOG_LEVELS;
