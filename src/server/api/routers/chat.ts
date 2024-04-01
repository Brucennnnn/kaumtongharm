import {
  createTRPCRouter,
  publicProcedure,
  userProcedure,
} from "@ktm/server/api/trpc";
import { z } from "zod";
export const chatRouter = createTRPCRouter({
  sendChatMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await Promise.all([ctx.pusher.trigger(`chat-1`, "test", input.message)]);
    }),
  joinChat: userProcedure
    .input(
      z.object({
        chatId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        data: {
          chatId: input.chatId,
        },
        where: {
          id: ctx.session.userId,
        },
      });
      return user;
    }),
  exitChat: userProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.update({
      data: {
        chatId: null,
      },
      where: {
        id: ctx.session.userId,
      },
    });
  }),
});
