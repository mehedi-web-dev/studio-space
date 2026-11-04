import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

let handlers: ReturnType<typeof toNextJsHandler> | null = null;

function getHandlers() {
  handlers ??= toNextJsHandler(getAuth());
  return handlers;
}

export async function GET(request: Request) {
  return getHandlers().GET(request);
}

export async function POST(request: Request) {
  return getHandlers().POST(request);
}
