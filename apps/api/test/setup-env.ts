// Runs before every e2e test file: use the test environment and local .env.test.
process.env.NODE_ENV = 'test';
try {
  process.loadEnvFile('.env.test');
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
}
