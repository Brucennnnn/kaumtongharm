import { createTRPCRouter, publicProcedure } from '@ktm/server/api/trpc';
export const authRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.userId) return null;
    const userData = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.userId,
      },
      include: {
        chat: {
          include: {
            gameRoom: true,
          },
        },
      },
    });

    if (!userData) {
      return null;
    }

    return {
      ...userData,
    };
  }),
});
