import { envSchema, type Env } from './env.schema.js';

/**
 * Validates raw environment variables. On failure it throws one error that
 * lists every problem by variable name. Values are never echoed, because they
 * may be secrets.
 */
export function validateEnv(raw: Record<string, unknown>): Env {
  const result = envSchema.safeParse(raw);
  if (result.success) {
    return result.data;
  }

  const problems = result.error.issues
    .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid environment configuration:\n${problems}`);
}

/**
 * Loads a `.env`-style file into process.env when it exists. Variables that
 * are already set (for example by Docker) keep their value.
 */
export function loadEnvFileIfPresent(path: string): void {
  try {
    process.loadEnvFile(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
}
