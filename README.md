# Simple Lead Capture Automation Demo

A fictional automation portfolio demo that simulates lead intake, validation, scoring, categorization, follow-up drafting, and exportable reporting.

This is not client work. All data is fictional demo data.

## Purpose

This project demonstrates AI-assisted automation thinking for roles that involve workflow design, n8n-style automation planning, lead routing, and lightweight operational reporting.

The demo does not use real leads, scraping, external APIs, paid tools, backend services, or third-party automation platforms.

## Built With

- HTML
- CSS
- JavaScript
- Codex
- ChatGPT
- GitHub
- Local workspace workflow

## What The Demo Shows

- Lead intake from sample form/CSV-style records
- Basic lead validation
- Rule-based lead scoring
- Categorization into Hot, Warm, and Cold leads
- Draft follow-up message generation
- Exportable JSON-style summary
- Delivery/reporting notes
- Human approval checkpoint before any follow-up is used

## How To Run Locally

Open `index.html` in a browser.

No build step, backend, API key, or installation is required.

## Files

- `index.html` - demo page structure
- `styles.css` - responsive visual design
- `script.js` - local mock scoring and output logic
- `sample_leads.csv` - fictional input data
- `sample_output.json` - example output after scoring
- `automation_flow.md` - workflow logic and checkpoints
- `workflow_notes.md` - planning, review, and risk notes

## How This Maps To n8n / Automation Work

This static demo can be translated into an n8n, Zapier, or Make workflow:

1. Trigger: new form submission or uploaded CSV row
2. Validation: check required fields
3. Scoring: apply rule-based conditions
4. Routing: place lead into Hot, Warm, or Cold queue
5. Drafting: generate a follow-up template
6. Approval: wait for a human to review before sending
7. Reporting: store or export a structured summary

The current project intentionally keeps everything local and fictional so it can be reviewed safely as a portfolio sample.

## Human-Reviewed Items

- No real leads or personal data are included.
- No websites are scraped.
- No API calls are made.
- No follow-up message is sent automatically.
- Scoring rules are simple and visible in `script.js`.
- The project is clearly labeled as a demo, not client work.
