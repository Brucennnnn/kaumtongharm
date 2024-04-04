import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import { env } from '@ktm/env';
import { appRouter } from '@ktm/server/api/root';
import { createTRPCContext } from '@ktm/server/api/trpc';
import { validateRequest } from '@ktm/server/api/auth';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  const { session } = await validateRequest();
  return createTRPCContext({
    headers: req.headers,
    session: session,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: !env.IS_PROD
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
        }
      : undefined,
  });

export { handler as GET, handler as POST };
