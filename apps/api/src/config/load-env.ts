/**
 * Side-effect module: loads the local env file into process.env.
 * Import it FIRST in every entry point. ES modules evaluate imports before the
 * importing file's body, and ConfigModule validates the environment while
 * app.module is being imported.
 */
import { loadEnvFileIfPresent } from './validate-env.js';

loadEnvFileIfPresent(process.env.NODE_ENV === 'test' ? '.env.test' : '.env');
