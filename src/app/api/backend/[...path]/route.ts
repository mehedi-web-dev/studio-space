import type { NextRequest } from "next/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ??
  "https://studio-space-server-sooty.vercel.app/api";

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "content-encoding",
  "content-length",
]);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await context.params;

    // Avoid duplicating /api in the backend URL.
    const segments = path[0]?.toLowerCase() === "api" ? path.slice(1) : path;

    const baseURL = BACKEND_API_URL.replace(/\/+$/, "");

    const targetURL = `${baseURL}/${segments
      .map(encodeURIComponent)
      .join("/")}${request.nextUrl.search}`;

    // Forward required headers and Better Auth cookies.
    const headers = new Headers();

    const contentType = request.headers.get("content-type");
    const accept = request.headers.get("accept");
    const cookie = request.headers.get("cookie");

    if (contentType) headers.set("content-type", contentType);
    if (accept) headers.set("accept", accept);
    if (cookie) headers.set("cookie", cookie);

    // Request an uncompressed response from the backend.
    headers.set("accept-encoding", "identity");

    const hasBody = !["GET", "HEAD"].includes(request.method);

    const body = hasBody ? await request.arrayBuffer() : undefined;

    const backendResponse = await fetch(targetURL, {
      method: request.method,
      headers,
      body: body && body.byteLength > 0 ? body : undefined,
      redirect: "manual",
      cache: "no-store",
    });

    // Forward backend response headers.
    const responseHeaders = new Headers();

    backendResponse.headers.forEach((value, key) => {
      const lower = key.toLowerCase();

      if (HOP_BY_HOP.has(lower) || lower === "set-cookie") {
        return;
      }

      responseHeaders.append(key, value);
    });

    // Forward cookies without backend Domain restrictions.
    const setCookies = backendResponse.headers.getSetCookie?.() ?? [];

    for (const cookieValue of setCookies) {
      responseHeaders.append(
        "set-cookie",
        cookieValue.replace(/;\s*domain=[^;]*/gi, ""),
      );
    }

    // Read the response body before creating the new response.
    const responseBody = await backendResponse.arrayBuffer();

    return new Response(responseBody.byteLength > 0 ? responseBody : null, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Backend proxy error:", error);

    return Response.json(
      {
        success: false,
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
