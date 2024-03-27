import { createTRPCRouter, publicProcedure } from "@ktm/server/api/trpc";
import { z } from "zod";
export const gameRouter = createTRPCRouter({
  createGameRoom: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        maxPlayers: z.number().min(1),
        rounds: z.number().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const gameRoom = await ctx.db.$transaction(async (tx) => {
        const chat = await tx.chat.create({});
        const gameRoom = await tx.game.create({
          data: {
            gameTitle: input.title,
            maxPlayers: input.maxPlayers,
            rounds: input.rounds,
            description: input.description,
            chatId: chat.id,
          },
        });
        return gameRoom;
      });
      return gameRoom;
    }),
  getAllGameRoom: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.game.findMany();
  }),
});
