import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { env } from "@ktm/env";

const libsql = createClient({
  url: `${env.DATABASE_URL}`,
  authToken: `${env.DATABASE_AUTH}`,
});

const adapter = new PrismaLibSQL(libsql);
export const prisma = new PrismaClient(
  process.env.NODE_ENV === "development" ? { adapter } : undefined,
);
