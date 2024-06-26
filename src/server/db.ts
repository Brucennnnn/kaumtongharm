import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import { env } from '@ktm/env';

let libsql: ReturnType<typeof createClient> | undefined;
if (env.IS_PROD) {
  libsql = createClient({
    url: `${env.DATABASE_URL}`,
    authToken: `${env.DATABASE_AUTH}`,
  });
} else {
  libsql = createClient({
    url: `file:prisma/dev.db`,
  });
}

const adapter = new PrismaLibSQL(libsql);
export const db = new PrismaClient({
  log: env.IS_PROD ? ['error'] : ['query', 'error', 'warn'],
  adapter: adapter,
});
