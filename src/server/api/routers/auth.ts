import { createTRPCRouter, publicProcedure } from "@ktm/server/api/trpc";
export const authRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.userId) return null;
    const userData = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.userId,
      },
    });

    if (!userData) {
      return null;
    }

    return {
      ...userData,
      userId: userData.id,
      userName: userData.username,
    };
  }),
});
