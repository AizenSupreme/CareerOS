# CareerOS — Ratified Decisions

| Field | Details |
| --- | --- |
| Purpose | Record decisions ratified from docs/BUILD_PLAN.md. The PRD and SRS remain authoritative. |
| Status | In progress |

## D1 — Proficiency scale
- **Status:** Ratified (accepted as written)
- **Date:** 2026-10-22
- **Blocks:** FR-SG-02, FR-UP-02, FR-UP-04
- **Decision:**

| Value | Label | Meaning |
| --- | --- | --- |
| null | not assessed | No evidence either way. Never treated as zero ability. |
| 1 | Novice | Awareness only |
| 2 | Beginner | Can do guided tasks |
| 3 | Competent | Works independently |
| 4 | Advanced | Solves non-trivial problems |

- **Rationale:** Distinguish not assessed from a confirmed low skill level. A blank beginner profile must not be coerced to 0.

## D2 — Gap classification thresholds
- **Status:** Ratified (accepted as written)
- **Date:** 2026-10-22
- **Blocks:** FR-SG-02
- **Decision:**

| Category | Rule |
| --- | --- |
| strong | current >= target |
| developing | current = target - 1 |
| priority_gap | current <= target - 2 (and assessed) |
| missing | required skill, no user record, and the user explicitly confirmed no experience |
| not_assessed | required skill, no evidence either way -> show 'Not assessed' and offer the assessment |

- **Rationale:** Distinguish missing and not_assessed. A blank beginner profile produces not_assessed, not missing.
## D3 — Scoring factors and weights
- **Status:** Ratified (accepted as written)
- **Date:** 2026-10-22
- **Blocks:** FR-CR-02, FR-CR-04, FR-CR-06
- **Decision:**

| Factor | Weight | Missing-data handling |
| --- | --- | --- |
| Interest alignment | 0.30 | Excluded if empty; recorded as a missing input |
| Current skill alignment | 0.30 | Excluded if no skills; confidence drops |
| Education alignment | 0.15 | Excluded if unset |
| Preference alignment | 0.15 | Excluded if unset |
| Gap size (smaller gap = better) | 0.10 | Excluded if unknown |
| Market demand | — | 0 for MVP (no dataset yet) |

- **Notes:** Weights are renormalised over available factors. Display 'Based on X of 5 factors — limited confidence' (FR-CR-06). Every recommendation carries scoring_version: "v1.0.0" (FR-CR-07).
## D4 — Tie rule
- **Status:** Ratified (accepted as written)
- **Date:** 2026-10-22
- **Blocks:** FR-CR-03
- **Decision:** Score descending, then career_id ascending. Deterministic and trivially reproducible.
- **Rationale:** Simple, reproducible ordering when scores are equal.
## D5 — Dependency source
- **Status:** Ratified (accepted as written)
- **Date:** 2026-10-22
- **Blocks:** FR-RM-02, FR-RM-03
- **Decision:** data/catalogue/dependencies.json (hand-authored), validated by a script that rejects cycles and dangling references, reviewed in a pull request.
- **Rationale:** Keeps prerequisites explicit, testable, and versioned in Git.
## D6 — Authentication mode
- **Status:** Ratified (accepted as written)
- **Date:** 2026-10-22
- **Blocks:** SRS §13
- **Decision:** Demo mode first — one seeded user writing real rows to the real database. Real accounts come after the P0 slice is stable.
- **Rationale:** Keeps MVP scope small while still exercising real persistence and access patterns.
