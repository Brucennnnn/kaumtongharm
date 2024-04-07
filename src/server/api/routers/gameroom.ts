import { createTRPCRouter, publicProcedure, userProcedure } from '@ktm/server/api/trpc';
import { z } from 'zod';
import { Prisma, type KaumTongHarm } from '@prisma/client';
export const gameRoomRouter = createTRPCRouter({
  createGameRoom: userProcedure
    .input(
      z.object({
        roomName: z.string().min(1),
        maxPlayers: z.number().min(1),
        rounds: z.number().min(1),
        description: z.string().optional(),
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
            hostId: ctx.session.userId,
            chat: {
              create: {
                User: {
                  connect: {
                    id: ctx.session.userId,
                  },
                },
              },
            },
          },
        });
        return gameRoom;
      });
      await Promise.all([ctx.pusher.trigger(`gamelist`, 'add-room', 'join')]);
      return gameRoom;
    }),
  getAllGameRoom: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.gameRoom.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }),

  getGameRoomsByFilter: publicProcedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.gameRoom.findMany({
        where: {
          roomName: {
            contains: input.searchQuery,
          },
        },
        include: {
          chat: {
            include: {
              User: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
      if (!res) throw new Error('internal error');
      return res;
    }),
  getGameRoom: publicProcedure.input(z.object({ roomId: z.number() })).query(async ({ input, ctx }) => {
    return await ctx.db.gameRoom.findFirst({
      where: {
        id: input.roomId,
      },
      include: {
        chat: {
          include: {
            User: true,
          },
        },
      },
    });
  }),
  startRound: publicProcedure.input(z.object({ roomId: z.number() })).mutation(async ({ input, ctx }) => {
    const gameRound = await ctx.db.$transaction(async (tx) => {
      const updateGameState = await tx.gameRoom.update({
        where: {
          id: input.roomId,
        },
        data: {
          isBegin: true,
          Round: {
            create: {},
          },
        },
        include: {
          Round: {
            orderBy: {
              id: 'desc',
            },
          },
          chat: {
            include: {
              User: true,
            },
          },
        },
      });
      const recentRound = updateGameState.Round[0];
      if (!updateGameState || !updateGameState.chat || !recentRound) {
        throw Error('gameid is invalid');
      }
      const chatId = updateGameState.chat.id;

      const kuamTongHarm: KaumTongHarm[] = await tx.$queryRaw(
        Prisma.sql`SELECT * FROM kaumTongHarm ORDER BY random() LIMIT ${updateGameState.chat.User.length}`,
      );
      if (kuamTongHarm.length !== updateGameState.chat.User.length) throw new Error('word is not enough');

      let isNext = true;

      if (updateGameState.Round.length % updateGameState.rounds === 0) {
        isNext = false;
      }

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
              gameRoomId: updateGameState.id,
              roundId: recentRound.id,
            },
            include: {
              user: true,
            },
          });
        }),
      );

      return { recentRound, userResult, isNext };
    });

    await Promise.all([ctx.pusher.trigger(`gameroom-${gameRound.recentRound.gameRoomId}`, 'start-round', 'hello')]);
    return gameRound;
  }),
  getRecentRound: publicProcedure.input(z.object({ roomId: z.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.$transaction(async (tx) => {
      const result = await tx.round.findFirst({
        where: {
          gameRoomId: input.roomId,
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          UserResult: {
            include: {
              user: true,
            },
          },
          game: true,
        },
      });
      if (!result) throw new Error('room id is wrong');
      const countRound = await tx.round.count({
        where: {
          gameRoomId: input.roomId,
        },
      });
      let isNext = true;
      if (countRound % result?.game.rounds === 0) {
        isNext = false;
      }
      return { isNext, result };
    });
    return res;
  }),
  joinGameRoom: userProcedure
    .input(z.object({ roomId: z.number(), username: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db.$transaction(async (tx) => {
        const gameRoom = await tx.gameRoom.findFirst({
          where: {
            id: input.roomId,
          },
          include: {
            chat: true,
          },
        });
        if (!gameRoom || !gameRoom.chat) throw new Error('room Id is wrong');
        return await tx.user.update({
          where: {
            id: ctx.session.userId,
          },
          data: {
            chatId: gameRoom.chat.id,
          },
          include: {
            chat: {
              include: {
                gameRoom: true,
              },
            },
          },
        });
      });

      await Promise.all([
        ctx.pusher.trigger(`gameroom-${input.roomId}`, 'waiting-room', `${input.username} join room`),
      ]);
      return result;
    }),
});
