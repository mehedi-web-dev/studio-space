# StudioSpace — agent notes

Next.js 16 (App Router, `src/app`) creative-studio booking app. Single package, npm only (lockfile is `package-lock.json`).

## Commands

```bash
npm run dev    # next dev (Turbopack)
npm run build  # next build
npm run lint   # bare "eslint" — lints whole repo, no args/paths
npx tsc --noEmit  # typecheck; there is no "typecheck" script
```

No tests exist. Verify changes with `lint` + `tsc --noEmit` (+ `build` for anything touching routing/config).

## Stack gotchas

- **React Compiler is ON** (`reactCompiler: true` in `next.config.ts`). Never add manual `useMemo`/`memo`/`useCallback` "optimizations"; they can conflict with compilation.
- **Tailwind v4** via `@tailwindcss/turbopack` — config lives in `src/app/globals.css` (CSS-first), there is no `tailwind.config.*`.
- **UI is HeroUI v3** (`@heroui/react`), not shadcn/MUI etc. Buttons/forms use HeroUI primitives (see `src/app/sign-in/page.tsx` for the established pattern). Toasts come from `sonner` (`<Toaster>` is mounted in `src/app/layout.tsx`), don't add another toast lib.
- Components live in `src/app/component/` (singular, inside the app dir) — not `src/components`. Shared libs (auth) live in `src/lib/`. Path alias `@/*` → `./src/*`.

## Auth (better-auth + MongoDB)

- Server: `src/lib/auth.ts`; browser client: `src/lib/auth-client.ts`; catch-all route handler: `src/app/api/auth/[...all]/route.ts`.
- **Env var:** be careful with the MongoDB URI name — `.env` defines `MONGODB_URI`, and `src/lib/auth.ts` must read the same key (it now accepts `MONGODB_URI` with a legacy `MONGOBD_URI` fallback). The server throws at import time if unset.
- DB name is hardcoded `studio-space`; auth uses email+password via the official mongo adapter. `.env` also expects `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` (client reads `BETTER_AUTH_URL` for its baseURL).
- `.env` is committed with a real Atlas URL — don't republish or rotate it in commits; don't echo secrets in output.

## Next.js-specific

Refer to Next.js docs locally before writing code: `node_modules/next/dist/docs/`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
