import { authRouter } from "@ktm/server/api/routers/auth";
import { createCallerFactory, createTRPCRouter } from "@ktm/server/api/trpc";
import { chatRouter } from "./routers/chat";
import { gameRoomRouter } from "./routers/gameroom";
import { kaumTongHarmRouter } from "./routers/kaumTongHarm";
import { gameActionRouter } from "./routers/gameaction";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  chat: chatRouter,
  gameRoom: gameRoomRouter,
  gameAction: gameActionRouter,
  kaumTongHarm: kaumTongHarmRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
