import { createTRPCRouter, publicProcedure } from '@ktm/server/api/trpc';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const kaumTongHarmRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.kaumTongHarm.findMany();
  }),
  getRamdom: publicProcedure
    .input(
      z.object({
        take: z.number().default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.$queryRaw(Prisma.sql`SELECT * FROM kaumTongHarm ORDER BY random() LIMIT ${input.take}`);
    }),
});
