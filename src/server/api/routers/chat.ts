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
				username: z.string(),
				message: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await Promise.all([
				ctx.pusher.trigger("chat-1", "test", {
					username: input.username,
					message: input.message,
				}),
			]);
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
				include: {
					chat: {
						include: {
							gameRoom: true,
						},
					},
				},
			});

			await Promise.all([
				ctx.pusher.trigger(
					`gameroom-${user.chat?.gameRoomId}`,
					"waiting-room",
					"refresh",
				),
			]);
			return user;
		}),
	exitChat: userProcedure
		.input(z.object({ roomId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.user.update({
				data: {
					chatId: null,
				},
				where: {
					id: ctx.session.userId,
				},
			});
			await Promise.all([
				ctx.pusher.trigger(`gameroom-${input.roomId}`, "waiting-room", "exit"),
			]);
		}),
});
