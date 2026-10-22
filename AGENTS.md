# CareerOS — agent guide

CareerOS is a career-intelligence web app for students and early-career users. The journey: profile → ranked, explained careers → skill gaps → prerequisite-aware roadmap → progress dashboard.

This repo currently holds the specification only; there is no application code yet. Every change an agent makes here is code that must satisfy the specs below.

## Specs

Each document owns one kind of question. Read the one the task names; open the others only when a decision spans them.

- **Requirements** — `3_Software_Requirements_Specification (SRS).md`. Read when the task names an ID (`FR-`, `UI-`, `API-`, `NFR-`, `SEC-`) or asks what "done" means. The requirement row and its acceptance column are the contract. Sections: §4 functional requirements, §5 data entities, §6 API conventions, §10 error cases, §11 test plan, §13 open decisions.
- **Decisions** — `2_Product_Requirements_Document (PRD).md`. Read when the task is about what to build and why: module priority (P0/P1/P2), personas, product logic for scoring, gaps, and roadmap ordering (§9), data-quality rules (§10.2), UX rules (§12.1), architecture direction (§13), AI honesty policy (§14).
- **Scope** — `1_Project_Blueprint.md`. Read for the one-screen version: problem, users, objectives, core features.

These files were exported from Word. Page headers ("CareerOS PRD • Working baseline • Page 3") sit inline in the text, several table rows are split across a page break (`FR-CR-04`, `FR-FT-03`, `FR-FT-04`, `NFR-12`, `DB-05`), and the PRD build order in §16.4 is numbered from 13. Reconstruct a split requirement from the surrounding sentences, and confirm the intended wording with the human before implementing it.

## Non-negotiables

These hold for every change, in every module. The specs remain the source of truth; this is their short form.

1. **Explain every result.** A score, gap category, job match, or trend ships with the factors that produced it, traceable to stored input or a documented rule (SRS §9).
2. **Show "not assessed" as its own state**, distinct from a confirmed low level (FR-SG-02).
3. **Label what a number is.** Scores are guidance, estimates are estimates, datasets carry their source and period (FR-CR-08, FR-JB-03, FR-FT-04).
4. **Start deterministic.** Rules, a dependency graph, and weighted scoring come first; an LLM or trained model is an optional addition, named for exactly what it is (PRD §14).
5. **Surface missing data as an explicit state** and keep the flow usable — every value traces back to stored input (SRS §10).
6. **Use public or licensed data and approved APIs**, and keep credentials in environment files (SEC-04, SEC-08).

## Making a change

1. **Name the requirement.** Every change cites at least one SRS ID, or one explicit PRD decision, so the work traces to a spec line.
2. **Ship one vertical slice.** The smallest end-to-end path a user can exercise: profile → career → gap → roadmap → dashboard. Optional modules wait until the slice is green (PRD §5, §6.1).
3. **Implement against the acceptance column.** That text is the completion criterion; write the check that proves it.
4. **Test the logic.** Scoring, gap classification, dependency ordering, and progress calculation are pure functions — unit-test them; add an integration test where a request crosses the API boundary (SRS §11.2).
5. **Re-read the acceptance column before declaring done.** Every cited ID passes, and the core journey still works end to end (SRS §11.1).
6. **Record the change.** New or altered behavior lands in the SRS change log and the affected module's table. A changed priority or scope also lands in the PRD.

## Open decisions

The specs name what is still unresolved (SRS §13, PRD §19): proficiency scale, scoring weights and tie rule, gap thresholds, dependency source, accounts versus demo mode, dataset choice, resource curation policy, performance targets, and which optional modules ship.

An implementation that needs one of these states its assumption, marks it provisional, and puts it in front of the human. Ground such a value in a recorded decision rather than an invented one — reproducibility (FR-CR-02, FR-CR-07) depends on it.

## Repo notes

- Layout today: three numbered spec files at the repo root. When code lands, keep it modular and simple enough for one developer to debug and explain: `web/` (Next.js), `api/` (Express + PostgreSQL), `services/` only if a separate Python service earns its place (PRD §13.2). Record the final layout here.
- Conventions (naming, migration style, test layout) get written here once the first module lands, so there is one authoritative place instead of scattered habits.
- Secrets belong in `.env` files that stay uncommitted; the repo carries only `.env.example`.
