import { createTRPCRouter, userProcedure } from "@ktm/server/api/trpc";
import { z } from "zod";
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
                createdAt: "asc",
              },
            },
            UserResult: true,
          },
        });

        if (
          newVote.UserVote.length === 0 ||
          newVote.UserResult.length / 2 > newVote.UserVote.length
        ) {
          return newVote;
        }
        await tx.userResult.updateMany({
          data: {
            point: {
              decrement: 1,
            },
            status: "died",
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
      return userVote;
    }),
});
