import { createTRPCRouter, userProcedure } from '@ktm/server/api/trpc';
import { z } from 'zod';
export const gameActionRouter = createTRPCRouter({
  voteToUser: userProcedure
    .input(
      z.object({
        toUser: z.string(),
        chatId: z.number(),
        roundId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userVote = await ctx.db.$transaction(async (tx) => {
        const newVote = await tx.round.update({
          where: {
            id: input.roundId,
          },
          data: {
            UserVote: {
              create: {
                voteToId: input.toUser,
                voterId: ctx.session.userId,
                chatId: input.chatId,
              },
            },
          },
          include: {
            UserVote: {
              where: {
                voteToId: input.toUser,
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
            UserResult: true,
          },
        });

        if (newVote.UserVote.length === 0 || newVote.UserResult.length / 2 > newVote.UserVote.length) {
          return newVote;
        }
        await tx.userResult.updateMany({
          data: {
            point: {
              decrement: 1,
            },
            status: 'died',
          },
          where: {
            userId: input.toUser,
            roundId: input.roundId,
            chatId: input.chatId,
          },
        });
        await tx.userResult.updateMany({
          data: {
            point: {
              increment: 1,
            },
          },
          where: {
            userId: newVote.UserVote[0]?.voterId,
            roundId: input.roundId,
            chatId: input.chatId,
          },
        });

        return newVote;
      });

      await Promise.all([
        ctx.pusher.trigger(`gameroom-${userVote.gameRoomId}`, 'playing-room', {
          status: 'refresh',
          userDeath: input.toUser,
          userVote: userVote.UserVote[0]?.voterId,
        }),
      ]);
      return userVote;
    }),
  endGame: userProcedure
    .input(
      z.object({
        roomId: z.number(),
        take: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const gameResult = await ctx.db.$transaction(async (tx) => {
        const round = await tx.round.findMany({
          where: {
            gameRoomId: input.roomId,
          },
          take: input.take,
          orderBy: {
            id: 'desc',
          },
        });
        const result = await tx.userResult.groupBy({
          by: ['userId'],
          where: {
            roundId: {
              gte: round[round.length - 1]?.id,
            },
            gameRoomId: input.roomId,
          },
          _sum: {
            point: true,
          },
          orderBy: {
            _sum: {
              point: 'desc',
            },
          },
        });
        await tx.gameRoom.update({
          data: {},
          where: {
            id: input.roomId,
          },
        });
        return result;
      });

      await Promise.all([
        ctx.pusher.trigger(`gameroom-${input.roomId}`, 'playing-room', {
          status: 'end-game',
        }),
      ]);
      return gameResult;
    }),
});
