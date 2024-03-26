import { createTRPCRouter, publicProcedure } from "@ktm/server/api/trpc";
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
});
