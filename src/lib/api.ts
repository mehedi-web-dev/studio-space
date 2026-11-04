/**
 * Base URL for the Express backend, accessed through the same-origin proxy
 * (src/app/api/backend/[...path]/route.ts). The browser always talks to this
 * Next.js origin; the proxy server forwards requests (including the session
 * cookie) to the backend, so no cross-origin cookie issues arise.
 */
export const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "/api/backend";
