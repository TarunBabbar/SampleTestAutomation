# SampleTestAutomation

Playwright (TypeScript) test automation for two public targets, kept separate from
the QABuddy app repo:

| Suite | System under test | Base URL |
|---|---|---|
| **api** | restful-booker (REST API: auth + booking CRUD) | `https://restful-booker.herokuapp.com` |
| **ui** | restful-booker-platform front end (booking, admin, rooms, messages) | `https://automationintesting.online` |

The test cases are documented in Jira, project **QAB** (issue type *Test Case*,
priority P0/P1/P2). Each spec's title carries the Jira test-case id (e.g.
`TC-BOOK-001`) so QABuddy can build a traceability matrix from this repo plus Jira.

## Run

```bash
npm ci
npm run test:api        # API suite — no browser download needed
npm run test:ui         # UI suite — run `npx playwright install chromium` first
npm test                # everything
npm run report          # open the last HTML report
```

Override targets with `API_BASE_URL` / `UI_BASE_URL`.

## Layout

```
src/api/RestfulBooker.ts   thin API client (auth, booking CRUD)
src/data/booking.ts        test-data factories (unique per call, parallel-safe)
src/fixtures/api.ts        Playwright fixtures: `api` client + `token`
tests/api/                 API specs (health, auth, booking, negative)
tests/ui/                  UI specs (added in the next pass)
```

## Conventions

- Page-object model for UI, a per-service client for API — specs contain no raw selectors/URLs.
- Fixtures over setup/teardown; no hard sleeps.
- Unique data per test, so the suite is safe to run in parallel.
- Every test names the Jira test case it exercises.

## CI

`.github/workflows/automation.yml` runs the API suite on push/PR against
restful-booker and uploads the HTML + JUnit report as an artifact.

## Known defects being tracked

restful-booker ships with intentional bugs. Tests that document a defect are written
to assert the *expected* behaviour and are annotated with the matching QAB bug;
a future step also feeds the CI JUnit output into QABuddy so failure analysis can
cite real runs.
