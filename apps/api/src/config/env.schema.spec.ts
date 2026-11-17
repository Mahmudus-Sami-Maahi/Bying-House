import { validateEnv } from './validate-env.js';

const base = { DATABASE_URL: 'postgresql://user:pass@localhost:5432/db' };

describe('validateEnv', () => {
  it('applies development defaults', () => {
    const env = validateEnv(base);
    expect(env).toMatchObject({
      NODE_ENV: 'development',
      PORT: 4000,
      APP_VERSION: 'dev',
      CORS_ORIGINS: [],
      TRUST_PROXY_HOPS: 1,
      LOG_LEVEL: 'log',
      LOG_FORMAT: 'pretty',
      SWAGGER_ENABLED: true,
    });
  });

  it('defaults to JSON logs and no API docs in production', () => {
    const env = validateEnv({ ...base, NODE_ENV: 'production' });
    expect(env.LOG_FORMAT).toBe('json');
    expect(env.SWAGGER_ENABLED).toBe(false);
  });

  it('lets production enable API docs explicitly', () => {
    expect(validateEnv({ ...base, NODE_ENV: 'production', SWAGGER_ENABLED: 'true' }).SWAGGER_ENABLED).toBe(true);
  });

  it('parses a comma-separated CORS origin list', () => {
    const env = validateEnv({ ...base, CORS_ORIGINS: 'https://example.com, http://localhost:3000 ,' });
    expect(env.CORS_ORIGINS).toEqual(['https://example.com', 'http://localhost:3000']);
  });

  it('rejects a CORS origin that is not an http(s) URL', () => {
    expect(() => validateEnv({ ...base, CORS_ORIGINS: 'javascript:alert(1)' })).toThrow(/CORS_ORIGINS/);
  });

  it('rejects a non-PostgreSQL DATABASE_URL', () => {
    expect(() => validateEnv({ DATABASE_URL: 'mysql://user:pass@localhost/db' })).toThrow(/DATABASE_URL/);
  });

  it('names every invalid variable without echoing secret values', () => {
    let message = '';
    try {
      validateEnv({ DATABASE_URL: 'mysql://user:supersecret@localhost/db', PORT: 'abc' });
    } catch (error) {
      message = (error as Error).message;
    }
    expect(message).toContain('DATABASE_URL');
    expect(message).toContain('PORT');
    expect(message).not.toContain('supersecret');
  });

  it('requires DATABASE_URL', () => {
    expect(() => validateEnv({})).toThrow(/DATABASE_URL/);
  });
});
