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
      await ctx.db.usersOnChats.create({
        data: {
          chatId: input.chatId,
          userId: ctx.session.userId,
        },
      });
    }),
});
