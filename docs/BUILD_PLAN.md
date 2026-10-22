# CareerOS — Build Plan & Mentor Reference

| Document field | Details |
|---|---|
| Purpose | Reference for building CareerOS: current state, architecture, roadmap, daily tasks, timeline, learning plan, Git/AI-agent workflows, and risks |
| Authority | **Planning document.** Does not override the PRD or SRS |
| Status | D1–D6 below are **proposed and provisional — not ratified**. Nothing here is implemented |
| Environment snapshot | 2026-10-22 |
| Companion docs | `2_Product_Requirements_Document (PRD).md` (what and why) · `3_Software_Requirements_Specification (SRS).md` (the contract) · `AGENTS.md` (agent rules) · `docs/STATUS.md` (current state, when created) |

---

## How to use this document

Three kinds of statement appear here, and they are marked so you never confuse them:

| Marker | Meaning |
|---|---|
| **Fact** | Verified by reading the repo or running a command. Dated where it could go stale. |
| **Recommendation** | My professional judgment. Disagree freely — but change it in writing, in `docs/DECISIONS.md`. |
| **Assumption** | Something I assumed that may turn out false. Each one is listed in §9. |

**Reading order by need:**

- *Starting today?* → §3 (next action), then §10 (daily tasks)
- *Writing code this week?* → §5 (decisions to ratify), then §6 (architecture)
- *Lost in a session?* → §11 (Git), §12 (AI agents)
- *Tempted by a feature?* → §13 (risks), §14 (cut list)
- *Explaining the project?* → §6 (architecture), §8 (timeline), Appendix B (glossary)

---

## 1. Your next action

> ### Day 1 — create `.gitignore` and `README.md`, then make your first branch and commit

Fifteen minutes. It prevents a real disaster (committing `node_modules` and a `.env` with live credentials — a direct SEC-04 violation) and it gets you using Git every day from the start.

```powershell
cd C:\CareerOS\CareerOS
git switch -c feature/setup

@"
node_modules/
.next/
.env
.env.local
*.log
.DS_Store
"@ | Set-Content .gitignore

@"
# CareerOS

AI-powered career intelligence and personalised career development system.

See `AGENTS.md` for agent guidance, `docs/BUILD_PLAN.md` for the build plan,
and `docs/agents/` for tooling configuration.

## Status

Pre-implementation. Specification complete (PRD + SRS).
"@ | Set-Content README.md

git add .gitignore README.md
git commit -m "chore: add gitignore and project readme"
git push -u origin feature/setup
```

**Then:** read §5 and give me your ruling on decisions D1–D6. That is the only thing blocking Milestone 0.

---

## 2. Current state

### 2.1 Facts — repository (verified 2026-10-22)

| Item | Finding |
|---|---|
| Files | 4 Markdown at root + 3 in `docs/agents/` + this plan. **That is all.** |
| Application code | **None.** No `package.json`, no source files, no `node_modules` |
| Dependencies | **None.** No manifest, no lockfile, no build config |
| Database | **None.** No schema, no migrations, no seed script |
| Tests | **None.** No test files, no runner, no CI workflow |
| `.gitignore` | **Missing** ⚠️ — fix on Day 1 |
| `README.md` | **Missing** ⚠️ — fix on Day 1 |
| `.env.example` | Missing (expected — no code yet) |
| Git | 2 commits, both docs. Branch `main`, clean tree, synced with `origin/main` |
| Remote | `https://github.com/AizenSupreme/CareerOS` (GitHub, public) |
| `gh` CLI | Installed v2.103.0, **not authenticated** — 4 triage labels uncreated |

### 2.2 Facts — toolchain (verified by running, 2026-10-22)

| Tool | Status |
|---|---|
| Node.js | ✅ v24.22.1 |
| npm | ✅ 11.19.1 — ⚠️ `npm` fails in PowerShell; use `npm.cmd`, or set `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| Python | ✅ 3.13.3 |
| Git | ✅ 2.56.0 |
| VS Code | ✅ 1.142.0 |
| PostgreSQL | ❌ not installed |
| Docker | ❌ not installed |
| WSL2 | ✅ Ubuntu present (possible local-Postgres path, not recommended) |
| `gh` | ⚠️ installed, not authenticated |

### 2.3 Assessment

**Exists:** a strong specification set. The PRD and SRS define acceptance criteria per requirement, name data entities, specify error cases, and list open decisions rather than hiding assumptions. That is more than most projects have at this stage, and it is genuinely usable.

**Missing:** everything executable. The specs describe a system that does not exist yet.

**Consequence for planning:** the first milestone cannot be "build the app." It must be "stand up the toolchain and prove one piece of logic works." That is Milestone 0 in §7.

### 2.4 Academic calendar (Fact: PRD §16.1–16.2)

Semester 7 is specified as **analysis** — literature survey, UML/DFD, ER model, wireframes, stack justification — with implementation only "if schedule allows." Semester 8 is the build.

**The two overlap almost completely:**

| Academic deliverable | Produced during |
|---|---|
| ER / database model | Week 6 — the Prisma schema *is* the ER model |
| DFD | Week 7 — the seed script *is* the data flow |
| UML use-case / activity | Week 9 — the real user journey through your screens |
| API contract | Week 8 — SRS §6.2 endpoint map, implemented |
| Wireframes / prototype | Weeks 10–11 — your actual screens |
| Stack justification | Week 1 — §6 of this document |
| Literature survey | PRD §23 already lists five sources |

Don't do them twice.

---

## 3. Decisions to ratify (D1–D6)

> **These block Milestone 0.** Per `AGENTS.md`: an implementation needing an open decision must *"state its assumption, mark it provisional, and put it in front of the human."* Each one below is a proposal. **Rule on each: accept, amend, or reject.**
>
> Ratified decisions become entries in `docs/DECISIONS.md` and get logged in the SRS change log.

### D1 — Proficiency scale

Blocks **FR-SG-02**, **FR-UP-02**, **FR-UP-04**.

| Value | Label | Meaning |
|---|---|---|
| `null` | **not assessed** | No evidence either way. **Never** treated as zero ability (FR-SG-02, `AGENTS.md` non-negotiable #2) |
| 1 | Novice | Awareness only |
| 2 | Beginner | Can do guided tasks |
| 3 | Competent | Works independently |
| 4 | Advanced | Solves non-trivial problems |

*Assumption: four assessed levels plus a distinct `null`. Adjustable — but write it down.*

### D2 — Gap classification thresholds

Blocks **FR-SG-02**.

| Category | Rule |
|---|---|
| `strong` | current ≥ target |
| `developing` | current = target − 1 |
| `priority_gap` | current ≤ target − 2 (and assessed) |
| `missing` | required skill, **no user record**, and the user explicitly confirmed no experience |
| `not_assessed` | required skill, **no evidence either way** → show "Not assessed" and offer the assessment |

*Design note:* "missing" and "not assessed" differ in whether we have positive evidence of zero. A blank beginner profile produces `not_assessed`, not `missing`.

### D3 — Scoring factors and weights

Blocks **FR-CR-02**, **FR-CR-04**, **FR-CR-06**.

| Factor | Weight | Missing-data handling |
|---|---|---|
| Interest alignment | 0.30 | Excluded if empty; recorded as a missing input |
| Current skill alignment | 0.30 | Excluded if no skills; confidence drops |
| Education alignment | 0.15 | Excluded if unset |
| Preference alignment | 0.15 | Excluded if unset |
| Gap size (smaller gap = better) | 0.10 | Excluded if unknown |
| Market demand | — | **0 for MVP** (no dataset yet) |

Weights are renormalised over *available* factors, and the number of factors used is displayed ("Based on 3 of 5 factors — limited confidence"). This satisfies **FR-CR-06**.

Every stored recommendation carries `scoring_version: "v1.0.0"`, so changing a weight later never makes an old result unexplainable (**FR-CR-07**).

### D4 — Tie rule

Blocks **FR-CR-03**.

Score descending, then `career_id` ascending. Deterministic and trivially reproducible.

### D5 — Dependency source

Blocks **FR-RM-02**, **FR-RM-03**.

`data/catalogue/dependencies.json`, hand-authored, **validated by a script** that rejects cycles and dangling references. Reviewed in a pull request.

### D6 — Authentication mode

Blocks SRS §13 open decision.

**Demo mode first** — one seeded user writing real rows to the real database. Real accounts come after the P0 slice is stable.

### D7 — Backend framework (deviation from PRD §13) ⚠️

**PRD §13** specifies Node.js + Express as a separate backend service. **Recommendation: use Next.js Route Handlers instead for the MVP**, because it means one dev server instead of two — no CORS, no proxy, one port, one deploy.

This is a deviation and must be recorded in the SRS change log per `AGENTS.md`.

**Why it is safe:** SRS §6.2 defines a *candidate* endpoint map (`POST /api/profile`, `GET /api/careers`, …), not a mandate on which framework serves it. Route Handlers implement those exact paths.

**The escape hatch — non-negotiable:**

> All business logic lives in `src/domain/` as pure functions that import nothing from `next`, `react`, or `prisma`.

This rule is what makes SRS §9 observable rules testable (SRS §11.2 requires unit tests for scoring, gap classification, dependency ordering, progress), satisfies PRD §13.2's *"keep recommendation and roadmap logic independently testable from the UI,"* and means that if you or your guide later want Express, you **move the route handlers and leave every test, every domain function, and every UI component untouched.** Reversible in a day. That is why it is safe to decide now.

---

## 4. Architecture — summary

Full reasoning in §6. **Recommendation**, pending D7.

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 15 (App Router) + TypeScript + Tailwind | Your spec's choice; one framework for the whole app |
| Backend | Next.js Route Handlers *(pending D7)* | One dev server instead of two |
| Database | PostgreSQL on **Neon** (free tier) + **Prisma** | Neon = zero install (no Windows service, no password, no port conflict). Prisma = one schema file → client + migrations |
| Validation | **Zod** | One schema validates the request *and* generates types. Satisfies FR-UP-06, API-04 |
| Tests | **Vitest** | Fast, minimal config, TypeScript out of the box |
| Auth | **Seeded demo user** for the whole MVP (D6) | ~2 days vs ~2 weeks |
| Deploy | **Vercel** (free tier) + Neon | Next.js deploys with zero config → live public URL |
| Python | **None in P0.** Later a standalone CSV→DB script, not a service | SRS §3.1 marks the Python service "No" for P0 |
| Catalog admin | **Version-controlled JSON + seed script** | SRS §2.3: "A dedicated admin UI is optional" |

**Explicitly not using:** Redis, pgvector, vector databases, Docker, Kubernetes, message queues, GraphQL, microservices, machine learning, embeddings. PRD §13.2 warns against adding these "only to appear advanced." A beginner who ships the P0 slice beats a beginner who never ships.

### Proposed layout

```
CareerOS/
├── web/                      # Next.js app
│   ├── app/
│   │   ├── profile/ careers/ gaps/ roadmap/ dashboard/
│   │   └── api/              # route handlers
│   ├── src/
│   │   ├── domain/           ★ PURE — imports nothing from next/react/prisma
│   │   │   ├── scoring.ts    # weighted career suitability
│   │   │   ├── gaps.ts       # current vs target classification
│   │   │   ├── roadmap.ts    # topological ordering + prioritisation
│   │   │   ├── progress.ts   # progress % + next action
│   │   │   └── taxonomy.ts   # alias resolution
│   │   ├── db/               # Prisma client + queries
│   │   └── validation/       # Zod schemas
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── data/catalogue/       # version-controlled JSON
│       ├── skills.json  careers.json  requirements.json
│       ├── dependencies.json  resources.json
├── scripts/                  # demo.ts, validate_dependencies.ts
└── docs/
    ├── BUILD_PLAN.md         # this file
    ├── STATUS.md             # current state (create Week 1)
    └── DECISIONS.md          # ratified D1–D7 (create Week 5)
```

---

## 5. Development roadmap

**Principle:** every phase ends with something *runnable and demonstrable*. No phase ends with "code written but not working."

| # | Phase | Weeks | Ends with |
|---|---|---|---|
| 0 | Toolchain & foundations | 1–3 | Live Next.js app on Vercel; Git/GitHub muscle memory; first unit tests passing |
| 1 | **Milestone 0 — scoring in a terminal** | 3–4 | `npm test` green; a command prints ranked careers with reasons |
| 2 | Data model & catalogue | 5–6 | Postgres schema + seeded catalogue (5 careers, ~15 skills); migrations in Git |
| 3 | Domain logic complete | 7–9 | Scoring, gaps, roadmap ordering, progress — all with passing unit tests |
| 4 | **Vertical slice (P0)** | 10–12 | Profile → recommendation → gap → roadmap → dashboard, end to end |
| 5 | Hardening & honesty | 13–14 | Empty/loading/error states; "not assessed" distinct; accessibility; explanations visible |
| 6 | Deployment & demo | 15–16 | Live public URL, seeded demo profile, README, 5-minute demo script |
| 7 | P1 extras | 17–20 | Curated resources; job dataset import + matching — **or stop and polish** |
| 8 | P2 optional | 21+ | Project builder / resume / trends — only if time genuinely remains |

**Phase 7 is where Python enters** — and even then as a **script** (`python scripts/import_jobs.py`) reading a CSV and writing to Postgres, not an HTTP service.

---

## 6. Architecture — reasoning

### 6.1 The central problem

**Fact (PRD §13, SRS §2.4):** the prescribed stack is four parts — Next.js/React + Tailwind, Node/Express, PostgreSQL, Python/FastAPI.

**Recommendation:** right for the finished product, wrong as the starting configuration. The arithmetic:

| Component | Running processes |
|---|---|
| Next.js dev server | 1 |
| Express dev server | 1 |
| PostgreSQL | 1 service (+ user, password, port) |
| Python/FastAPI | 1 process (+ venv, + port, + CORS) |

**Four things to start, keep alive, and debug** — for a developer with no practical experience, at 2 hours a day. The likely outcome: a disproportionate share of hours go into "why won't it connect" instead of "how does the scoring work."

**The specs already give the escape hatch:** SRS §3.1 marks the Python service **"No" for P0 — "core scoring may initially run in backend."** PRD §13.2: *"Start with a modular monolith… Keep the architecture simple enough for one beginner developer to build, debug, deploy, and explain."* SRS §2.4: *"not every component must be deployed in the earliest prototype."*

### 6.2 Key architectural decisions

**1. Hand-written catalogue, not an admin UI.** Skills, careers, requirements, and the prerequisite graph live in version-controlled JSON (`data/catalogue/*.json`), loaded by a seed script. A seed file is reviewable in a PR, diffable, and versioned — an admin UI is none of those and costs 2–3 weeks.

**2. The prerequisite graph is validated by code, not trusted.** **FR-RM-03** requires cycle detection. Hand-authoring a dependency graph *will* produce mistakes — this is a certainty, not a risk. A validation script turns them into a red test instead of a wrong roadmap.

**3. "Not assessed" is a data value, not a UI trick.** `UserSkill` needs a `source` field (`self_reported | assessed | inferred`) and a **nullable** `level`. "Not assessed" = null level, no evidence. Never silently coerced to 0.

**4. Every recommendation stores `scoring_version`.** **FR-CR-07** requires reproducibility. Change a weight in month 3 → old recommendations stay explainable.

**5. Demo mode is a seeded user, not a bypass.** Even in demo mode the app reads and writes real rows. Persistence, refresh-survival, and access control behave like production from Day 1 — adding real accounts later is a login screen, not a rewrite.

### 6.3 Data flow

```
Browser
  ↓ HTTPS
Vercel ── Next.js 15 (TypeScript, Tailwind)          ← one dev server
           ├── app/api/*/route.ts   parse → validate → call domain → respond
           ├── src/domain/*         ★ pure, no framework imports
           ├── src/db/*              Prisma queries
           └── src/validation/*      Zod schemas
  ↓ SQL over TLS
Neon PostgreSQL                       ← migrations live in Git
  ↑ seed script reads data/catalogue/*.json
```

---

## 7. Milestones

| Milestone | When | Demonstrable outcome |
|---|---|---|
| **M0 — Scoring in a terminal** | Wk 4 | Ranked careers with reasons, from the command line, with tests |
| **M1 — One page** | Wk 6 | A web page showing one hardcoded profile's top career with reasons |
| **M2 — Data layer** | Wk 8 | Postgres populated from seed files; migrations in Git |
| **M3 — Full domain logic** | Wk 10 | Scoring + gaps + roadmap + progress, all unit-tested |
| **M4 — Vertical slice (P0)** | Wk 13 | Profile → recommendation → gap → roadmap → dashboard, in the browser |
| **M5 — Deployed MVP** | Wk 16 | Live public URL, seeded demo profile, README, demo script |

### Milestone 0 — "The scoring engine in a terminal" (Weeks 3–4)

**The smallest useful thing you can complete, test, and demonstrate.**

**Scope:**
- `data/catalogue/skills.json` — ~10 skills with canonical names
- `data/catalogue/careers.json` — 5 careers
- `data/catalogue/requirements.json` — which skills each career needs, at what level
- `src/domain/scoring.ts` — one pure function: `(profile, career) → { score, reasons[] }`
- `scripts/demo.ts` — prints a ranked list for a hardcoded profile
- `src/domain/scoring.test.ts` — 6–8 unit tests

**Explicitly excluded:** no UI, no database, no auth, no deploy, no Express, no Python.

**Why this is right:**
1. **Zero infrastructure risk** — no DB means no connection errors eating your day.
2. **It teaches the hardest concept** — explainable scoring is the intellectual core and the thing your viva asks about.
3. **Real CareerOS work** — FR-CR-02, FR-CR-03, FR-CR-04, FR-CR-07 land here.
4. **Unit-testable from day one** — you learn testing before the code is complex.
5. **Demoable in 60 seconds.**
6. **Exercises every foundation:** Git, Node, TypeScript, JSON, functions, testing.

**Definition of done:**
```
$ npm test          → all green
$ npm run demo      → prints:
   1. Data Analyst          0.82  ▸ interests: data ✓  skills: 3/4 met ✓  gap: 1 skill
   2. Frontend Developer   0.71  ▸ skills: 2/4 met ✓  gap: 2 skills
   ...
$ git log --oneline  → ~10 focused commits
$ git status         → clean
```

---

## 8. Daily tasks

### Weeks 1–4 in detail (6 days/week, 2 h/day)

Days 7–8 are off. Rest is part of a six-month plan.

#### Week 1 — Terminal, Git, and the repo (12 h)

| Day | Task | Deliverable |
|---|---|---|
| 1 | PowerShell basics: `cd`, `Get-ChildItem`, `New-Item`, `Get-Content`, `pwd`, pipes, `>` redirect | `notes/day01.md` — 5 commands with real output pasted in |
| 2 | Git local: `status`, `add`, `commit`, `log`, `diff`, `restore`. Practice in a throwaway repo | A throwaway repo with 3 commits; you can undo your last change |
| 3 | Git remote: `clone`, `remote -v`, `push`, `pull`, `fetch`. Read about branches | A branch `feature/setup` pushed to GitHub |
| 4 | **Add `.gitignore` and `README.md`** | A commit on `feature/setup`; `git status` shows `.env` ignored |
| 5 | HTML structure + CSS box model, flexbox, forms. Build one static page by hand | `notes/week01/profile.html` — a styled profile card, no framework |
| 6 | JavaScript core: `let/const`, functions, arrays (`.map/.filter/.reduce`), objects, `import/export`, JSON | `notes/week01/script.js` — reads a fake profile object, prints a formatted summary |
| — | *Review* | `notes/week01/recap.md` — in your own words: what a commit is, a branch is, a function is |

#### Week 2 — JavaScript you can actually use (12 h)

| Day | Task | Deliverable |
|---|---|---|
| 7 | Functions, parameters, return values, scope. Write 10 tiny functions | `notes/week02/functions.js` — 10 functions, each commented |
| 8 | Arrays in depth: `map`, `filter`, `reduce`, `find`, `some`, sorting | `notes/week02/arrays.js` — computes an average, finds duplicates |
| 9 | Objects and JSON: nested objects, `JSON.parse`, `JSON.stringify` | `notes/week02/data.json` + a script that reads and writes it |
| 10 | Modules: `import`/`export`, splitting a file | `notes/week02/` split into `skills.js`, `profile.js`, `main.js` |
| 11 | Errors: `try/catch`, `throw`, reading a stack trace | A script that handles a missing file gracefully |
| 12 | **Set up the Node project**: `npm init`, install `typescript`, `tsx`, `vitest`; write `npm test` | `package.json` with a working `npm test`; one test file passing |
| — | *Review* | `notes/week02/recap.md` |

#### Week 3 — TypeScript + React mental model (12 h)

| Day | Task | Deliverable |
|---|---|---|
| 13 | TypeScript basics: `type`, `interface`, unions, optionals. Convert your Week 2 scripts | `src/types.ts` with your profile and skill types |
| 14 | React mental model: components, props, state, `useState`, `useEffect`, JSX, `.map` for lists | A page rendering your profile object as a card |
| 15 | React forms: controlled inputs, `onChange`, controlled vs uncontrolled | A form capturing name, education, interests |
| 16 | React routing + data fetching: `app/` directory, a route per screen, `fetch` from a local JSON file | 3 linked pages: profile → careers → gaps |
| 17 | Tailwind basics: utility classes, spacing, responsive prefixes | Restyle your 3 pages responsively |
| 18 | **Create the Next.js app** (`create-next-app`, TypeScript, Tailwind, App Router) | `web/` running with `npm run dev` |
| — | *Review* | `notes/week03/recap.md` |

#### Week 4 — HTTP, REST, and the API (12 h)

| Day | Task | Deliverable |
|---|---|---|
| 19 | HTTP essentials: request/response, methods, status codes (200/400/404/500), headers, JSON bodies | `notes/week04/http.md` with examples and your own explanations |
| 20 | REST design: resources, nouns not verbs, consistent error shape | `notes/week04/api-design.md` — your endpoint list |
| 21 | Route Handlers: `export async function GET/POST`, `request.json()`, `Response` | `app/api/careers/route.ts` returning hardcoded JSON |
| 22 | Fetching from the browser: `useEffect` + `fetch`, loading and error state | Careers page renders from your route handler, with a spinner |
| 23 | **Zod validation**: schemas, `safeParse`, friendly error messages | A profile POST route rejecting bad input with readable messages |
| 24 | **Deploy to Vercel** — connect the repo, set env vars, get a live URL | A public URL you can open on your phone |
| — | *Review* | `notes/week04/recap.md` + update `AGENTS.md` and `docs/STATUS.md` |

### Weeks 5–16 — the repeating daily pattern

| Day type | Task | Deliverable |
|---|---|---|
| **Day 1** | Learn the concept you need *this week* (2–3 h reading + a tiny scratch exercise) | A scratch exercise file |
| **Day 2** | Write the **test** first, before the implementation | A failing test describing the behaviour |
| **Day 3** | Implement the smallest thing that makes the test pass | Green test |
| **Day 4** | Build the next piece | Green test + commit |
| **Day 5** | Wire it into the UI or API | The feature visible in the browser |
| **Day 6** | Refactor, commit, push, update docs/status | Clean commit on GitHub + updated `docs/STATUS.md` |

### Weekly themes, Weeks 5–16

| Week | Theme | Deliverable |
|---|---|---|
| 5 | PostgreSQL & SQL basics | Neon DB created; you can write `SELECT ... JOIN` by hand |
| 6 | Prisma schema & migrations | `schema.prisma` with 6 tables; first migration applied |
| 7 | Seed the catalogue | `data/catalogue/*.json` + seed script; DB populated |
| 8 | **Scoring engine** + tests | `src/domain/scoring.ts`; FR-CR-02/03/04 covered |
| 9 | **Gap classification** + tests | `src/domain/gaps.ts`; FR-SG-02 covered, "not assessed" distinct |
| 10 | **Dependency ordering** + tests | `src/domain/roadmap.ts`; topological sort + cycle detection |
| 11 | **Progress & next action** + tests | `src/domain/progress.ts`; FR-RM-06, FR-DB-02 |
| 12 | Profile screen + API | FR-UP-01…07 working in the browser |
| 13 | Career discovery + detail screens | FR-CR-03, FR-CR-05 working |
| 14 | Gap view + roadmap screens | FR-SG-01, FR-RM-01/02/05 working |
| 15 | Dashboard + empty/error/loading states | FR-DB-01…04 working; UI-02 satisfied |
| 16 | Polish, accessibility, deploy, README | Live demo; the P0 slice end to end |

---

## 9. Timeline & assumptions

### 9.1 Assumptions

| # | Assumption | If false |
|---|---|---|
| A1 | 6 days/week × 2 h = **12 h/week** | Scale linearly |
| A2 | ~1.5 h of each 2 h is productive; rest is setup, reading, context-switching | More realistic later in the project |
| A3 | AI agents accelerate boilerplate but **not** your understanding | Timeline grows |
| A4 | Catalogue is small: 5 careers, ~15 skills, ~40 requirement rows, ~25 dependency edges | Data entry grows |
| A5 | No auth, no Python, no job dataset in the MVP | See §14 cut list |
| A6 | No major illness, exam week, or family disruption | Timeline grows |
| A7 | The plan is followed; scope isn't expanded mid-flight | Biggest schedule risk |

### 9.2 Estimates

| Scenario | Basic working MVP (P0 slice, deployed) | + Polished & P1 features |
|---|---|---|
| **Optimistic** | **11 weeks** (~2.5 months) · ~130 h | 17 weeks (~4 months) |
| **Realistic** | **16 weeks** (~3.5–4 months) · ~190 h | 22 weeks (~5 months) |
| **Conservative** | **24 weeks** (~5.5–6 months) · ~290 h | 30 weeks (~7 months) |

**My honest expectation for you: 18–20 weeks.** You are a genuine beginner, and the two things most likely to overrun are (a) the learning curve in Weeks 1–4 and (b) the temptation to build the admin UI or the job crawler. The "basic MVP" column assumes you cut scope when it hurts.

### 9.3 Where the hours go

| Work | Hours | Notes |
|---|---|---|
| Learning (Weeks 1–4) | ~48 h | Non-negotiable and non-compressible |
| Domain logic + tests | ~50 h | The heart of the project — PRD §14 |
| Data model + catalogue | ~25 h | Data entry, not code |
| UI screens | ~40 h | Biggest hidden cost |
| Integration, states, accessibility | ~20 h | Where P0 acceptance actually lives |
| Deploy, docs, demo | ~12 h | Cheap if continuous, expensive if saved for the end |

---

## 10. Learning plan

**Rule (PRD §16.3):** learn a concept, make a small exercise, apply it to CareerOS, test it, then move on. **Never postpone implementation until you've mastered the technology.**

**Just-in-time rule:** learn a concept **the day before** you need it. Not the week before. Not three months before.

### What to learn, and when

| Learn | When | Why now, not earlier |
|---|---|---|
| Terminal, file paths, folders | **Day 1** | Everything else depends on it |
| Git & GitHub | **Days 2–3** | Needed from your first commit onward |
| HTML + CSS | **Day 5** | You must read the docs you write |
| JavaScript core | **Days 6, 7–11** | The language of both frontend and backend |
| TypeScript basics | **Day 13** | Types pay for themselves when Prisma generates them |
| React + Next.js | **Days 14–18** | The UI layer |
| HTTP / REST | **Days 19–20** | Before you write any API |
| Zod validation | **Day 23** | Required by FR-UP-06 and API-04 |
| SQL fundamentals | **Week 5** | Before Prisma hides it — you need to *read* the generated SQL |
| Prisma ORM | **Week 6** | Your data layer |
| **Unit testing** | **Week 8** (before writing scoring) | The highest-leverage habit in this project |
| **Graphs / topological sort** | **Week 10** | Needed for FR-RM-02/03. The one genuinely new algorithm — expect a full day |
| Deployment, env vars | **Day 24** | Learn early; redeploys are cheap |
| Auth (sessions, cookies, JWT) | **Only if you add accounts** | Not in the MVP |
| **Python + Pandas** | **Week 17+, only if you reach P1** | Zero need before then |
| ML, embeddings, vector DBs | **Never, in this project** | Violates PRD §14 |

### What NOT to learn yet

Docker, Kubernetes, Redis, microservices, message queues, GraphQL, pattern catalogues, async/concurrency deep-dives, system design, OAuth internals, ML/PyTorch.

Learning these is the most common way beginners lose a six-month project.

### The Explain-Back Rule

At the end of every day, write **three sentences in your own words** (not the agent's words, not copied docs) explaining what you built and how it works. If you can't, that day's work wasn't learned — treat it as not done.

---

## 11. Git & GitHub reference

### 11.1 Current state (inspected 2026-10-22)

- Branch `main`, tracking `origin/main`, **clean working tree**, 2 commits
- Remote: `https://github.com/AizenSupreme/CareerOS` (public)
- `main` is the default branch; no other branches exist
- `gh` CLI installed but **not authenticated** — 4 triage labels still need creating

### 11.2 The everyday loop

```powershell
git status                    # always first — what's changed?
git add <file>                # stage ONE thing at a time, never `git add .`
git commit -m "feat: add skill gap classification (FR-SG-02)"
git push
```

**Rules that will save you:**
1. **Commit every time something works.** Small commits are free; archaeology is not.
2. **Push at least once a day.** Recoverable even if your laptop dies.
3. **One commit = one thing.** "add scoring" and "fix typo" are two commits.
4. **Never `git add .`** until you've seen `git status`. This is how `.env` gets committed.
5. **Conventional Commits**: `feat:`, `fix:`, `docs:`, `chore:`, `test:`.

### 11.3 Branching + pull requests

```powershell
git switch -c feature/gap-classification
# ... work, commit ...
git push -u origin feature/gap-classification
```

**Why bother at 2 h/day?** A PR is where AI-agent work gets *reviewed* rather than *trusted* — a natural checkpoint, a portfolio artefact, and a broken agent attempt never touches `main`.

### 11.4 Recovering from mistakes

| Mistake | Command | Safe? |
|---|---|---|
| Edited a file, want to discard | `git restore <file>` | ✅ Discards uncommitted changes |
| Staged a file, want to unstage | `git restore --staged <file>` | ✅ |
| Bad message on the last commit | `git commit --amend -m "new message"` | ✅ If not pushed |
| Bad commit already pushed | `git revert <sha>` | ✅ New commit that undoes it |
| "I lost a commit" | `git reflog` | ✅ Read-only — **your safety net** |
| Want to go back to yesterday | `git reset --hard <sha>` | ⚠️ **Destructive.** Only after `git reflog`, only if pushed |

**The one rule:** `git reflog` remembers everything for ~30 days. If you think you've destroyed work, **stop and run `git reflog` first.** That single command has saved more beginners' work than any other.

**Never** run `git reset --hard` or `git clean -fd` on a repo you can't restore from. You have no remote backup of unpushed work.

### 11.5 GitHub issues

Configured in `docs/agents/issue-tracker.md`. **Outstanding:** authenticate `gh` and create the four missing labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`; `wontfix` already exists). The GitHub web UI works in the meantime.

```powershell
gh auth login --hostname github.com --git-protocol https --web
gh label create "needs-triage"    --color "fbca04" --description "Maintainer needs to evaluate this issue"
gh label create "needs-info"      --color "d4c5f9" --description "Waiting on reporter for more information"
gh label create "ready-for-agent" --color "0e8a16" --description "Fully specified, ready for an AFK agent"
gh label create "ready-for-human" --color "1d76db" --description "Requires human implementation"
```

Also referenced by `docs/agents/issue-tracker.md` but not yet created: `wayfinder:map`, `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, `wayfinder:task`.

---

## 12. Working with AI agents

### 12.1 The problem

Every agent (OpenCode, Antigravity, Claude Code) starts with **no memory of your project**. If each re-reads ~1,600 lines of PRD and SRS, 30–40% of every session goes to re-orientation — and worse, different agents make *different* architectural decisions, producing an inconsistent codebase.

### 12.2 The fix: `AGENTS.md` is the contract, `docs/STATUS.md` is the state

`AGENTS.md` is already strong: a **Specs** section with sharp trigger conditions, six **Non-negotiables**, a **Making a change** procedure, and **Open decisions**. Two gaps for the new phase:

1. **It describes the specification, not the project's current state.** An agent reading it knows what CareerOS should do, not what's built or next. → Add `docs/STATUS.md` and point to it.
2. **It promises things that don't exist yet** ("Conventions… get written here once the first module lands"). → Week 4.

### 12.3 What needs updating, and when

| Update | When | Content |
|---|---|---|
| `AGENTS.md` → Specs section | Now | Add the file layout once `web/`, `src/domain/`, `data/catalogue/` exist |
| `AGENTS.md` → Non-negotiables | Now | Add: *"the domain layer imports nothing from `next`, `react`, or `prisma`"* |
| `AGENTS.md` → Repo notes | Week 4 | Replace "Layout today: three numbered spec files" with the real tree; write the naming/migration/test conventions it promises |
| `AGENTS.md` → Open decisions | Week 5 | D1–D7 get ratified answers, then move out of "open" |
| **New `docs/STATUS.md`** | Now | Current phase, what's done, what's next, known bugs, current branch |
| **New `docs/DECISIONS.md`** | Week 5 | One entry per ratified decision: date, decision, why, alternatives rejected |
| SRS change log | Whenever behaviour changes | `AGENTS.md` already requires this — log the D7 deviation here |
| `data/catalogue/*.json` | Weeks 6–8 | The catalogue is data, not code — versioned and reviewable |

### 12.4 The daily agent workflow

```
1. git switch -c feature/<name>          # one branch per feature
2. Read AGENTS.md → docs/STATUS.md       # 2 minutes, the difference between agents
3. YOU write the behaviour in 3–5 lines   # in your own words. Paste to the agent.
4. Ask for the TEST first                 # "Write the test that proves this works."
5. Read the test                          # states intent in plain language — best teacher
6. Ask for the implementation
7. Read every line                        # git diff. If unclear, ask the agent to TEACH it
8. Run `npm test` yourself                # never trust "it works"
9. git commit + git push
10. Update docs/STATUS.md                  # so the next agent (and you) know where you are
```

### 12.5 The rules that make this learning rather than copying

1. **Spec before code.** Never accept code you didn't specify. Write the input, the output, and one worked example first.
2. **Ask for the test first, every time.** A test expresses intent in plain language. Reading it teaches you the design.
3. **Never commit code you cannot explain.** If a line is unclear, ask *"explain line 12 in plain English"* — never *"fix it."*
4. **One function per request.** 30–60 line diffs. Large diffs hide errors and teach nothing.
5. **The best learning prompt:** *"Don't write the code. Ask me questions until you understand exactly what I want, then give me the first three lines to write."*
6. **Read `git diff` before every commit.** Every time. No exceptions.
7. **Own the domain logic yourself.** Agents are excellent at scaffolding, wiring, and boilerplate, and they will happily write your scoring function. That function is the intellectual core and the thing your viva will ask about. Write it — even if it takes three attempts.
8. **You own the commit.** Never let an agent run `git commit` or `git push`.

---

## 13. Risks

### 13.1 Feature risks

| # | Feature | Why it's a trap | Simpler first version |
|---|---|---|---|
| 1 | **Job-market intelligence** (JM-01…04) | Real dataset cleaning is a swamp: inconsistent titles, duplicates, missing fields, licence questions. Days vanish. | **Hand-curate ~30 job records** in JSON with documented source and date. Honest provenance. Real dataset later. |
| 2 | **Python/FastAPI service** | Second server, venv, CORS, second deployment. Pure cost here. | **No Python in P0.** Later: a standalone import script, not a service. SRS §3.1 already permits this. |
| 3 | **Learning-resources catalogue** | Curating 200 URLs is manual busywork that produces rot. | **3–5 resources for each of ~15 skills**, hand-curated. ~60 links — a weekend. |
| 4 | **Five-year forecasting** (FT-03) | No ground truth, no validation method; easy to produce a confident lie. | **Descriptive counts only** + explicit *"insufficient evidence"* state. FR-FT-04 then genuinely holds. |
| 5 | **Real accounts & auth** | Sessions, password hashing, token refresh, access control — 1–2 weeks for something the demo doesn't need. | **Seeded demo user.** Real auth is a clean later add. |
| 6 | **LLM-generated recommendations** | Breaks `AGENTS.md` non-negotiable #4 and FR-CR-02's reproducibility. | **No LLM in the core.** If added later, only a clearly-labelled plain-English summary of an already-computed score. |
| 7 | **Admin UI for the catalogue** | 2–3 weeks of CRUD screens for data you can edit in JSON and review in a PR. | **Version-controlled JSON + seed script.** |
| 8 | **Skill extraction with NLP** (SE-01) | Real entity extraction needs labelled data and evaluation infrastructure. | **Taxonomy + string matching** on a small hand-labelled sample. FR-SE-01 says "documented matching/normalization rules" — string matching qualifies. |
| 9 | **Project Builder / Resume / GitHub / LinkedIn** | All P2. Each is a week's work minimum. | **Cut entirely.** Resume Intelligence is also the one most likely to look like a "fake ATS" — FR-RS-04 forbids it. |
| 10 | **Docker, Redis, vector DB** | Pure ceremony for this project. | **None.** PRD §13.2 warns against adding these "only to appear advanced." |
| 11 | **Hand-authored dependency graph** | You *will* introduce a cycle. Certainty, not risk. | **Validate in code** — a script that fails loudly on cycles or dangling refs (FR-RM-03), plus a unit test with a known cycle. |

### 13.2 Project risks (not about features)

| Risk | Mitigation |
|---|---|
| **Learning spiral** — study for months, never ship | The Week 4 deploy is a hard gate. Live URL before any CareerOS logic exists. |
| **AI-agent dependency** — codebase you can't debug | Explain-back rule, one-function-per-request, and *you* write the domain logic. |
| **Scope creep mid-flight** — a P2 feature looks fun in Week 6 | Write the §14 cut list into `docs/STATUS.md`. Say "that's P2" out loud. |
| **Burnout** — 2 h/day × 6 months ≈ 290 h of sustained effort | One rest day per week. A missed day is a schedule change, not a failure. |
| **Spec paralysis** — the specs are so thorough you freeze | You don't need all open decisions before starting. D1–D4 block Milestone 0; D5 and D6 can wait a week each. |
| **Nobody sees your work** | Push daily. GitHub is your public record. One green PR per day is a visible trail. |

---

## 14. Cut list

**Keep this visible in `docs/STATUS.md`.** When a P2 feature looks fun in Week 6, read this.

| Cut from the MVP | Cut until the P0 slice is stable | Cut permanently from this project |
|---|---|---|
| Job dataset pipeline | Learning-resources catalogue (P1) | AI Interview Simulator — **removed from scope; do not reintroduce** |
| Python/FastAPI service | Job matching (P1) | Docker, Kubernetes, Redis, microservices, vector DB, GraphQL |
| Admin UI | Trend estimation (P1/P2) | Real-time job scraping |
| Real accounts / auth | Project builder (P2) | LLM in the core scoring path |
| | Resume / GitHub / LinkedIn (P2) | Foundation model training |
| | Skill extraction via NLP | Automated job applications, agentic workflows |
| | | Any guarantee of hiring, salary, or future demand |

---

## 15. Appendix A — Environment snapshot

Taken 2026-10-22. Verify before relying on it.

```
OS              : Windows (PowerShell)
Node.js         : v24.22.1   C:\Program Files\nodejs\node.exe
npm             : 11.19.1    (use `npm.cmd` — `npm.ps1` blocked by execution policy)
Python          : 3.13.3     C:\Users\naray\AppData\Local\Programs\Python\Python313
Git             : 2.56.0     C:\Program Files\Git\cmd\git.exe
VS Code         : 1.142.0
gh              : 2.103.0    installed via winget (user scope) — NOT AUTHENTICATED
PostgreSQL      : not installed
Docker          : not installed
WSL2            : Ubuntu present
Repo remote     : https://github.com/AizenSupreme/CareerOS (public)
Branch          : main, clean, synced with origin/main
```

**PowerShell fix (one-time, recommended):**
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## 16. Appendix B — Beginner glossary

The PRD (§22) and SRS (§1.4) glossify *product* terms. These are the *development* terms you'll meet.

| Term | Plain-English meaning |
|---|---|
| **API** | A defined way for one program to ask another for something. Here: the backend exposes URLs like `/api/careers` that the frontend calls. |
| **REST** | A convention for designing those URLs — resources as nouns (`/api/careers`, not `/api/getCareers`), manipulated with standard HTTP methods. |
| **Route handler** | A function in Next.js that answers a request for one URL. `app/api/careers/route.ts` → the `/api/careers` endpoint. |
| **Endpoint** | One specific URL your API answers, e.g. `GET /api/careers`. |
| **Request / Response** | The question your program sends, and the answer it receives. Usually JSON text. |
| **JSON** | A plain-text format for structured data — objects, arrays, strings, numbers, booleans, null. What APIs speak. |
| **HTTP status code** | The number in an HTTP reply that says what happened: 200 ok, 400 bad request, 404 not found, 500 server error. |
| **Database** | Where information is stored so it survives a restart. Here: PostgreSQL. |
| **Table** | One category of records — `users`, `skills`, `careers`. |
| **Row** | One record in a table — one user, one skill. |
| **Column** | One field of a record — a user's `education`. |
| **Primary key** | The column that uniquely identifies a row (usually `id`). |
| **Foreign key** | A column that points to another table's primary key. This is how "a user's skills" link to "skills". |
| **Join** | A SQL operation that combines two tables using their shared key. |
| **ORM** | Object-Relational Mapper. Lets you work with database rows as JavaScript objects instead of writing SQL by hand. **Prisma** is your ORM. |
| **Schema** | The definition of your tables, columns, and relationships. In Prisma, one file — `schema.prisma`. |
| **Migration** | A numbered, versioned change to the database structure, recorded in Git. Never edit a database by hand. |
| **Seed script** | A script that fills an empty database with known starting data — your career catalogue. |
| **Type** | A label saying what kind of value something is, so the computer can catch mistakes before they happen. |
| **TypeScript** | JavaScript with types added. You write it; it compiles to JavaScript the browser runs. |
| **Component** | A reusable piece of UI — a `ProfileCard`, a `ProgressBar`. React's building block. |
| **State** | Data a component remembers between renders. `useState` is how you create it. |
| **Hook** | A React function that adds a capability to a component — `useState` (memory), `useEffect` (do something after render). |
| **Props** | Values you pass into a component from outside. |
| **Environment variable** | A setting that lives outside your code, read at runtime (`.env` file). Used for database passwords and API keys. **Never commit it** (SEC-04). |
| **Unit test** | A test for one small function in isolation. Fast, and the first line of defence when you change code. |
| **Dependency** | One thing your code needs another thing to have installed — listed in `package.json`. |
| **`npm install`** | Downloads those dependencies into `node_modules/`. |
| **`npm run dev`** | Starts your app in development mode, with auto-reload. |
| **TypeScript compiler / build** | Turns your `.ts` files into runnable code. |
| **Environment / deployment** | "Local" = on your laptop. "Deployed" = running on the internet. **Vercel** hosts the deployed version. |
| **Topological sort** | An algorithm that orders items so every prerequisite comes before what depends on it. **FR-RM-02** needs it. |
| **Cycle** | A → B → A in a dependency graph. Impossible to order — must be detected, not silently ignored. **FR-RM-03**. |
| **Pure function** | A function whose output depends only on its inputs — no database reads, no clock, no randomness. Pure functions are trivial to test, which is why all CareerOS scoring lives in one. |
| **Container (Docker)** | A packaged copy of your app with its dependencies, so it runs the same everywhere. Not needed for the MVP. |
| **Cache (Redis)** | A fast temporary store to avoid repeated slow work. Not needed for the MVP. |
| **Embedding / vector DB** | Ways to store text as numbers to find similar meanings. Used by "semantic search". Not needed; would violate the deterministic-first rule. |
| **LLM** | Large Language Model — an AI that generates text. Optional add-on only, never in the core scoring path. |
| **Deterministic** | Same inputs → same outputs, every time. Required by FR-CR-02 and FR-CR-07, and the reason the core is rules rather than AI. |

---

*End of build plan. Ratify D1–D7, then start §8 Week 1 Day 1.*
