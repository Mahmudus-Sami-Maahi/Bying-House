// Prisma CLI configuration (Prisma ORM 7.10+ reads `prisma7.config.ts`).
// The CLI loads `.env` for local development; in containers DATABASE_URL
// comes from the environment.
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
