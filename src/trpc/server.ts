import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "@ktm/server/api/root";
import { createTRPCContext } from "@ktm/server/api/trpc";
import { validateRequest } from "@ktm/server/api/auth";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  const { session } = await validateRequest();
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
    session: session,
  });
});

export const api = createCaller(createContext);
