# Toolshop Test Automation — Playwright (TypeScript)

UI and API automated tests for [Practice Software Testing – Toolshop](https://practicesoftwaretesting.com),
a demo e-commerce app built for testing practice. Personal learning project by Trang Nguyen (QA/QC Tester).

## Tech stack
Playwright Test · TypeScript · Node.js · HTML report & trace viewer

## How to run
```bash
npm install
npx playwright install chromium
npx playwright test            # run all tests
npx playwright test --ui       # run step by step in UI mode
npx playwright show-report     # open the HTML report
```

## Test cases
| ID | Layer | Description |
|---|---|---|
| TC-S01 | UI | Search "pliers" shows only matching products |
| TC-S02 | UI | Search with an unknown keyword shows "There are no products found." |
| TC-A01 | API | `GET /products` returns a paginated list with the correct structure and data types |
| TC-A02 | API | `GET /products/{id}` with a non-existing id returns 404 |
| TC-C01 | UI | Adding 2 "Combination Pliers" to the cart updates the cart badge to 2 |
| TC-A03 | API | `GET /products/search?q=pliers` returns only products containing "pliers" |
| TC-X01 | UI + API | Product price on the detail page matches the price returned by the API |

## Design notes
- Locators use `data-test` attributes (`testIdAttribute: 'data-test'`) instead of CSS/XPath, so tests survive layout changes.
- No hard waits: only Playwright auto-waiting and web-first assertions.
- Assertions check business rules, not fixed product counts, because demo data can change.

## What I learned
- A passing test is not always a correct test. Make each new test fail on purpose to prove that its assertion really works.
- When a test fails, I first decide whether the test or app is wrong. I read Expected vs Received, find the failing line, and check the screenshot and trace.
- A 500 status code means a server error, not a problem in the test code.
