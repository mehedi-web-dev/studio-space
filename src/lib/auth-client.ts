import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// Falls back to the current origin (same-origin /api/auth) when unset.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
