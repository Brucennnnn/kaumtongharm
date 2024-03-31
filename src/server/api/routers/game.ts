import { createTRPCRouter, publicProcedure } from "@ktm/server/api/trpc";
import { z } from "zod";
import { type Prisma } from "@prisma/client";
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
        const gameRoom = await tx.game.create({
          data: {
            gameTitle: input.title,
            maxPlayers: input.maxPlayers,
            rounds: input.rounds,
            description: input.description,
            chat: {
              create: {},
            },
          },
        });
        return gameRoom;
      });
      return gameRoom;
    }),
  getAllGameRoom: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.game.findMany();
  }),
  getGameRoom: publicProcedure
    .input(z.object({ roomId: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.game.findFirst({
        where: {
          id: input.roomId,
        },
      });
    }),
  startRound: publicProcedure
    .input(z.object({ roomId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const gameRound = ctx.db.$transaction(async (tx) => {
        const updateGameState = await tx.game.update({
          where: {
            id: input.roomId,
          },
          data: {
            isBegin: true,
          },
          include: {
            chat: {
              include: {
                UsersOnChats: true,
              },
            },
          },
        });
        const createGameRound = await tx.round.create({
          data: {
            gameId: updateGameState.id,
          },
        });

        const userResult = await Promise.all(
          updateGameState.chat.UsersOnChats.map(async (e) => {
            return await tx.userResult.create({
              data: {
                userId: e.userId,
                kuamTongHarm: "hello",
                chatId: updateGameState.chat.id,
                gameId: updateGameState.id,
                roundId: createGameRound.id,
              },
            });
          }),
        );

        return { createGameRound, userResult };
      });
      return gameRound;
    }),
  getRecentRound: publicProcedure
    .input(z.object({ roomId: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.round.findFirst({
        where: {
          gameId: input.roomId,
        },
        orderBy: {
          id: "desc",
        },
        select: {
          UserResult: true,
        },
      });
    }),
});
