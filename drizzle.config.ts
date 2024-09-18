import { defineConfig } from 'drizzle-kit'
import { env } from '~/infrastructure/enviroment'

export default defineConfig({
  schema: './src/infrastructure/db/schema.ts',
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
