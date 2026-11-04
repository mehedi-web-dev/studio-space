import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const PROD_FRONTEND_URL = "https://studio-space-one.vercel.app";

let authInstance: ReturnType<typeof createAuth> | null = null;

function createAuth() {
  const mongoUri = process.env.MONGODB_URI ?? process.env.MONGOBD_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is required");
  }

  const client = new MongoClient(mongoUri);
  const db = client.db("studio-space");

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL ?? PROD_FRONTEND_URL,

    trustedOrigins: [PROD_FRONTEND_URL, "http://localhost:3000"],

    emailAndPassword: {
      enabled: true,
    },

    database: mongodbAdapter(db, {
      client,
    }),

    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
        strategy: "jwt",
      },
    },

    plugins: [
      jwt({
        sessionCookieCache: true,
      }),
    ],

    advanced: {
      // HTTPOnly and Secure defaults are kept; pin path and same-origin
      // SameSite behavior (no cross-subdomain cookies).
      defaultCookieAttributes: {
        path: "/",
        sameSite: "lax",
      },
    },
  });
}

/**
 * Lazily initializes Better Auth on first request instead of at module scope.
 * This keeps `next build` from failing when runtime-only environment
 * variables (e.g. MONGODB_URI) are not present at build time.
 */
export function getAuth() {
  authInstance ??= createAuth();
  return authInstance;
}
