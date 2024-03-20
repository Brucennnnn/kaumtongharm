import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { env } from "@ktm/env";

const libsql = createClient({
  url: `${env.DATABASE_URL}`,
  authToken: `${env.DATABASE_AUTH}`,
});
const adapter = new PrismaLibSQL(libsql);
const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter: process.env.NODE_ENV === "production" ? adapter : undefined,
  });

export const db = createPrismaClient();
