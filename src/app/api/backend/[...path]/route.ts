import type { NextRequest } from "next/server";

/**
 * Same-origin proxy for the Express backend.
 *
 * Frontend:  /api/backend/<path>            (?query preserved)
 * Backend:   ${BACKEND_API_URL}/<path>
 *
 * e.g. /api/backend/studios  ->  .../api/studios
 *      /api/backend/api/studios -> .../api/studios (also accepted, since
 *      existing pages call `${API_URL}/api/studios`)
 *
 * The browser only ever talks to this Next.js origin, so Better Auth
 * HTTPOnly cookies are sent same-origin; the proxy forwards the incoming
 * Cookie header to the backend server-side. No Authorization/Bearer
 * headers or secrets are exposed to the browser.
 */

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ?? "https://studio-space-server-sooty.vercel.app/api";

// Hop-by-hop headers must never be forwarded.
const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;

  try {
    // Build the backend URL from the configured base URL. A leading "api"
    // segment is dropped because BACKEND_API_URL already ends with "/api";
    // this makes both /api/backend/studios and /api/backend/api/studios map
    // to .../api/studios on the backend.
    const segments = path[0]?.toLowerCase() === "api" ? path.slice(1) : path;
    const query = request.nextUrl.search;
    const target = `${BACKEND_API_URL.replace(/\/+$/, "")}/${segments
      .map(encodeURIComponent)
      .join("/")}${query}`;

    // Forward content-type, accept and cookies. Explicitly drop
    // Authorization so browser-held bearer tokens never cross domains.
    const headers = new Headers();
    const contentType = request.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);
    const accept = request.headers.get("accept");
    if (accept) headers.set("accept", accept);
    const cookie = request.headers.get("cookie");
    if (cookie) headers.set("cookie", cookie);

    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const backendResponse = await fetch(target, {
      method: request.method,
      headers,
      body: body && body.byteLength > 0 ? body : undefined,
      redirect: "manual",
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    backendResponse.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (HOP_BY_HOP.has(lower) || lower === "set-cookie") return;
      responseHeaders.append(key, value);
    });

    // Pass backend cookies through, but strip any Domain attribute so they
    // are stored for this (frontend) origin instead of the backend domain.
    const setCookies = backendResponse.headers.getSetCookie?.() ?? [];
    for (const cookieValue of setCookies) {
      responseHeaders.append(
        "set-cookie",
        cookieValue.replace(/;\s*domain=[^;]*/gi, ""),
      );
    }

    return new Response(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to reach the backend.",
      },
      { status: 502 },
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
