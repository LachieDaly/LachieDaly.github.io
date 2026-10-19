# Migration plan: GitHub Pages → Cloudflare (Workers + D1)

Goal: add global leaderboards and user accounts to lachlandaly.com, treating
the work as a backend learning project, for **$0/month** (the domain aside).

## Guiding rules

- **Every phase ships on its own.** The site keeps working after each phase,
  and you can stop anywhere without leaving things half-done.
- **Every phase can be rolled back.** GitHub Pages stays live until Phase 3
  has proven itself.
- **Stay on the Cloudflare free plan.** When it hits a limit, it fails
  requests instead of charging you. Don't add a payment method unless you
  decide to upgrade on purpose.
- **Never trust the client.** Anything that affects a leaderboard is
  checked on the server.
- **Content stays in git unless there's a reason to move it.** Blog posts
  remain markdown in `content/blog/` (see Phase 6).

## Where we are now

| Piece | Today |
|---|---|
| Hosting | Next.js 16 static export (`output: "export"`), deployed by `.github/workflows/nextjs.yml` to GitHub Pages, custom domain via `CNAME` |
| Blog | Markdown + frontmatter in `content/blog/`, rendered at build time by `lib/blog.ts` |
| Overlap | 80 puzzles in `app/games/overlap/puzzles.ts`; completions in `localStorage` (`overlap-completed-v1`) stored as **array indices** |
| Reviewd | Rounds + answers in `app/games/reviewd/reviews.ts`; answer matching (`normalise`) runs in the browser; score discarded at the end |
| Soundtrack | Questions + answers inline in `app/games/soundtrack/page.tsx`; audio is YouTube embeds (no file hosting needed) |
| Bingo | Boards in `app/bingo/boards.ts`; progress in `localStorage` per board (`<kind>-bingo:<slug>`) |

All answers ship in the JS bundle, so any score the client reports can be faked.

## Where we're heading

```
lachlandaly.com  ──►  Cloudflare Worker
                        ├─ static assets (the Next.js `out/` export)
                        └─ /api/*  ──►  D1 (SQLite)
                                         players, accounts, sessions,
                                         scores, game content, progress
```

Everything is served from one origin, so there's no CORS to configure, and
cookies are plain first-party `HttpOnly` cookies.

---

## Phase 0: Groundwork (an evening)

**You'll learn:** DNS, Cloudflare tooling, local serverless development.

1. Create a Cloudflare account (free plan, no card).
2. Move DNS for `lachlandaly.com` to Cloudflare: add the site and change the
   nameservers at your registrar. Keep the existing GitHub Pages records as
   **DNS only** (grey cloud) so nothing changes for visitors yet.
3. Restructure the repo:
   ```
   /            Next.js site (unchanged)
   /worker      Worker source, wrangler config, migrations, tests
   ```
   Give `worker/` its own `package.json` so the site build stays untouched.
4. `npm create cloudflare@latest worker` → a minimal "hello" Worker.
   Run it with `wrangler dev` and deploy it to `api.lachlandaly.com`.
5. Create a D1 database (`wrangler d1 create lachlandaly`) and get
   `wrangler d1 migrations` working locally and remotely.
6. Set up tests with Vitest + `@cloudflare/vitest-pool-workers`, which runs
   tests inside a real Workers runtime with a local D1.

**Done when:** `curl https://api.lachlandaly.com/health` returns `ok` from a
deployed Worker that reads from D1.

**Rollback:** nothing user-facing has changed.

---

## Phase 1: Anonymous players and leaderboards

**You'll learn:** REST API design, SQL schema and migrations, input
validation, CORS, rate limiting.

Start with Reviewd. It has a single score per run, which makes it the
simplest game.

1. **Identity without login:** on first visit the client creates a
   `player_id` (`crypto.randomUUID()`) and asks for a display name. Both live
   in `localStorage`.
2. **Schema** (`worker/migrations/0001_init.sql`):
   ```sql
   CREATE TABLE players (
     id           TEXT PRIMARY KEY,          -- client-generated UUID
     display_name TEXT NOT NULL,
     created_at   INTEGER NOT NULL DEFAULT (unixepoch())
   );

   CREATE TABLE scores (
     id          INTEGER PRIMARY KEY,
     player_id   TEXT NOT NULL REFERENCES players(id),
     game        TEXT NOT NULL,              -- 'reviewd' | 'soundtrack' | 'overlap'
     puzzle_id   TEXT,                       -- null for whole-game scores
     score       INTEGER NOT NULL,
     duration_ms INTEGER,
     created_at  INTEGER NOT NULL DEFAULT (unixepoch())
   );
   CREATE INDEX scores_leaderboard ON scores (game, puzzle_id, score DESC);
   ```
3. **Endpoints:**
   - `POST /players` creates or renames a player.
   - `POST /scores` takes `{ playerId, game, score, durationMs }`.
   - `GET /leaderboard?game=reviewd&period=all|week` returns the top 20,
     using each player's best score.
4. **Basic defences:** reject a score above the game's maximum, a run that
   finished impossibly fast, or a malformed name (length limit, simple
   profanity list). Allow CORS only from `lachlandaly.com` and
   `localhost:3000`. Rate-limit by IP using the Workers Rate Limiting
   binding.
5. **Client:** add `lib/api.ts` (a typed fetch wrapper with the base URL from
   `NEXT_PUBLIC_API_URL`) and a `<Leaderboard game="reviewd" />` component
   on the end screen. If the API is down, the game still plays; the
   leaderboard just shows "unavailable".
6. Add Soundtrack and Overlap once Reviewd works.

**Done when:** two different browsers see each other's scores.

**Rollback:** remove the leaderboard component. The games never depended on it.

---

## Phase 2: The server scores the games

**You'll learn:** server-authoritative design, seeding data, short-lived
signed tokens, and why "never trust the client" matters.

Scores are on the honour system until this phase, which is fine among
friends. Phase 2 makes the leaderboard trustworthy.

1. **Move the answers into D1.** Write a seed script that reads `puzzles.ts`,
   `reviews.ts` and the Soundtrack questions and generates
   `worker/seed/*.sql`. Those files remain the source of truth: you edit
   them in git and re-run the seed. Give every Overlap puzzle a stable `id`
   instead of relying on its array position.
2. **Game sessions:**
   - `POST /runs` with `{ game }` returns `{ runId, questions }` with the
     **answers removed** (Soundtrack options shuffled on the server).
   - `POST /runs/:id/guess` checks one guess on the server. Reviewd's
     `normalise` and alt-answer matching move here.
   - `POST /runs/:id/finish` makes the server calculate the score and write
     it to `scores`. `POST /scores` from Phase 1 is removed.
   - Store `runs` in D1 with a start time, so the server measures the time
     taken as well.
3. **Strip the answers from the frontend bundle.** The game pages fetch
   their content at runtime. That's a real trade-off: the games now need
   the API to work. Decide whether an offline "practice mode" is worth
   keeping (see open decisions).

**Done when:** searching the built `out/` folder for a known answer (e.g.
`grep -r "Godfather" out/`) finds nothing.

**Rollback:** revert the game pages to import the local data files.

---

## Phase 3: Move hosting to Cloudflare

**You'll learn:** CI/CD with wrangler, DNS cutover, running a zero-downtime
migration.

1. Serve the Next.js `out/` folder as **Workers static assets** from the
   same Worker, so `/` is the site and `/api/*` is the API. The static
   export stays as it is; only the host changes.
2. Replace the Pages job in `.github/workflows/nextjs.yml` with a job that
   runs `next build`, then `wrangler deploy`. Store `CLOUDFLARE_API_TOKEN` as
   a GitHub Actions secret, scoped to just this Worker.
3. Test on the `*.workers.dev` URL, then point `lachlandaly.com` at the
   Worker (a custom domain on the Worker).
4. Switch the client's API base URL to the relative `/api`. Remove the CORS
   config; `api.lachlandaly.com` can redirect or be retired.
5. Leave GitHub Pages deployed but unused for a couple of weeks, then delete
   `CNAME` and disable Pages.

**Done when:** the site and API are served from the same origin, and every
deploy goes out from CI.

**Rollback:** point the DNS records back at GitHub Pages.

---

## Phase 4: Real accounts

**You'll learn:** OAuth 2.0 (redirects, `state`, PKCE), session management,
secure cookies, account linking, deleting user data.

1. **Providers:** GitHub first (simplest developer setup), Google second.
   For the learning, hand-roll the GitHub flow once. The `arctic` library
   is a lightweight way to add more providers afterwards.
2. **Schema:**
   ```sql
   CREATE TABLE accounts (
     id          TEXT PRIMARY KEY,
     provider    TEXT NOT NULL,              -- 'github' | 'google'
     provider_id TEXT NOT NULL,
     player_id   TEXT NOT NULL REFERENCES players(id),
     UNIQUE (provider, provider_id)
   );
   CREATE TABLE sessions (
     id         TEXT PRIMARY KEY,            -- store a SHA-256 of the token, not the token
     player_id  TEXT NOT NULL REFERENCES players(id),
     expires_at INTEGER NOT NULL
   );
   ```
3. **Sessions:** a random token in an `HttpOnly; Secure; SameSite=Lax`
   cookie, with only its hash stored in D1. Never store passwords.
4. **Linking:** on first sign-in, attach the account to the browser's
   existing anonymous `player_id` so earlier scores carry over.
5. **Housekeeping:** `GET /me`, sign out, and **delete my account** (which
   removes scores and progress). Add a short privacy note to the site.

**Done when:** you sign in on your phone and see the scores you set on your
laptop.

**Rollback:** hide the sign-in button. Anonymous play keeps working.

---

## Phase 5: Sync progress across devices

**You'll learn:** client/server sync and resolving conflicts.

1. `PUT/GET /progress/:key` stores JSON for signed-in players:
   `overlap-completed` (now stable puzzle ids rather than indices) and each
   `<kind>-bingo:<slug>` board.
2. On sign-in, merge local and server state. Union the Overlap completions;
   for bingo cells, the most recently updated value wins.
3. Keep `localStorage` as the offline cache. The existing
   `useSyncExternalStore` hooks can stay, with sync happening alongside them.

**Rollback:** stop calling the sync endpoints. `localStorage` still works on its own.

---

## Phase 6 (optional): Content in storage

Only do this if you want to **edit content without a redeploy** (e.g. an
admin page for posts or new puzzles). Otherwise, markdown in git is the
better system.

- Switch from static export to server rendering with the OpenNext
  Cloudflare adapter (`@opennextjs/cloudflare`), so pages are rendered from
  D1 and keep their SEO.
- Posts live in D1 (or as markdown files in R2), and images go in R2.
- Add an admin-only editor protected by your Phase 4 account.

---

## Running it

- **Backups:** D1 Time Travel gives point-in-time restore. Also run
  `wrangler d1 export` to a private location now and then.
- **Environments:** use a separate `preview` D1 database for testing, and
  never test against production data.
- **Observability:** Workers Logs, plus a `/health` endpoint.
- **Limits:** the free-tier quotas for Workers and D1 are far beyond what a
  personal site needs. Check Cloudflare's current pricing page before you
  start, and add a usage alert in the dashboard.

## Open decisions

- [ ] **Leaderboard shape:** all-time, weekly, per-puzzle (Overlap), or all three?
- [ ] **Display names:** must they be unique? How much moderation?
- [ ] **Offline play after Phase 2:** keep a bundled practice mode with no
      leaderboard, or require the API?
- [ ] **Sign-in providers:** GitHub only, or GitHub + Google?
- [ ] **Phase 6:** do you actually want in-browser editing of posts/puzzles?

## Suggested order and rough effort

| Phase | Effort (evenings) | Value |
|---|---|---|
| 0 Groundwork | 1 | Foundations |
| 1 Leaderboards | 2–3 | First visible feature |
| 2 Server scoring | 2–3 | Trustworthy leaderboards |
| 3 Hosting move | 1–2 | One platform, simpler auth |
| 4 Accounts | 3–4 | Cross-device identity |
| 5 Progress sync | 1–2 | Nice-to-have |
| 6 Content in storage | 3+ | Optional |

Phase 3 deliberately comes before Phase 4: once the site and API share one
origin, auth needs no CORS or cross-site cookie setup. Phases 1–2 and 3 could
swap if you'd rather move hosting first.
