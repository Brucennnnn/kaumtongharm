import { createTRPCRouter, publicProcedure } from "@ktm/server/api/trpc";
import { z } from "zod";
export const userRouter = createTRPCRouter({
  updateProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.userId) return null;
      const userData = await ctx.db.user.update({
        where: {
          id: ctx.session.userId,
        },
        data: {
          ...input,
        },
      });

      return {
        ...userData,
      };
    }),
});
