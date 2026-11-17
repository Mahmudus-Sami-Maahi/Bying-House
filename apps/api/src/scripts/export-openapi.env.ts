/**
 * Environment for the OpenAPI export. No database connection is opened, but
 * config validation still needs a well-formed DATABASE_URL.
 */
import '../config/load-env.js';

process.env.DATABASE_URL ??= 'postgresql://openapi:export@localhost:5432/unused';
