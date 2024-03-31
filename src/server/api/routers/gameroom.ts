import { createTRPCRouter, publicProcedure } from "@ktm/server/api/trpc";
import { z } from "zod";
import { Prisma, type KaumTongHarm } from "@prisma/client";
export const gameRoomRouter = createTRPCRouter({
  createGameRoom: publicProcedure
    .input(
      z.object({
        roomName: z.string().min(1),
        maxPlayers: z.number().min(1),
        rounds: z.number().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const gameRoom = await ctx.db.$transaction(async (tx) => {
        const gameRoom = await tx.gameRoom.create({
          data: {
            roomName: input.roomName,
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
    return await ctx.db.gameRoom.findMany();
  }),
  getGameRoom: publicProcedure
    .input(z.object({ roomId: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.gameRoom.findFirst({
        where: {
          id: input.roomId,
        },
      });
    }),
  startRound: publicProcedure
    .input(z.object({ roomId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const gameRound = ctx.db.$transaction(async (tx) => {
        const updateGameState = await tx.gameRoom.update({
          where: {
            id: input.roomId,
          },
          data: {
            isBegin: true,
          },
          include: {
            chat: {
              include: {
                User: true,
              },
            },
          },
        });
        if (!updateGameState || !updateGameState.chat) {
          throw Error("gameid is invalid");
        }
        const createGameRound = await tx.round.create({
          data: {
            gameId: updateGameState.id,
          },
        });
        const chatId = updateGameState.chat.id;

        const kuamTongHarm: KaumTongHarm[] = await tx.$queryRaw(
          Prisma.sql`SELECT * FROM kaumTongHarm ORDER BY random() LIMIT ${updateGameState.chat.User.length}`,
        );
        if (kuamTongHarm.length !== updateGameState.chat.User.length)
          throw new Error("word is not enough");
        const userResult = await Promise.all(
          updateGameState.chat.User.map(async (e, index) => {
            const ktm = kuamTongHarm[index];
            if (!ktm) {
              throw new Error(`word at index ${index} is undefined`);
            }
            return await tx.userResult.create({
              data: {
                userId: e.id,
                kuamTongHarm: ktm.word,
                chatId: chatId,
                gameId: updateGameState.id,
                roundId: createGameRound.id,
              },
              include: {
                user: true,
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
      const result = await ctx.db.round.findFirst({
        where: {
          gameId: input.roomId,
        },
        orderBy: {
          id: "desc",
        },
        include: {
          UserResult: {
            include: {
              user: true,
            },
          },
        },
      });
      return result;
    }),
});
