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

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  const client = new MongoClient(mongoUri);
  const db = client.db("studio-space");

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL ?? PROD_FRONTEND_URL,

    trustedOrigins: [PROD_FRONTEND_URL, "http://localhost:3000"],

    emailAndPassword: {
      enabled: true,
    },

    // Google OAuth Configuration
    socialProviders: {
      ...(googleClientId && googleClientSecret
        ? {
            google: {
              clientId: googleClientId,
              clientSecret: googleClientSecret,
            },
          }
        : {}),
    },

    database: mongodbAdapter(db, {
      client,
    }),

    // Session Cookie Configuration
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
      defaultCookieAttributes: {
        path: "/",
        sameSite: "lax",
      },
    },
  });
}


export function getAuth() {
  authInstance ??= createAuth();
  return authInstance;
}
