# Workflow Notes

## Design Goal

Create a small automation portfolio demo that shows how a lead capture process can be structured, scored, and prepared for review without using real customer data or external services.

The goal is to support junior AI-agent/operator applications where the user can honestly show workflow thinking, documentation, and basic frontend implementation.

## Planning

The workflow was planned around a simple business process:

1. Receive lead information from a form or CSV.
2. Validate whether required fields are present.
3. Score the lead using visible rules.
4. Categorize the lead into Hot, Warm, or Cold.
5. Draft a follow-up message.
6. Export a structured summary.
7. Keep a human approval checkpoint before any real outreach.

## How Codex Was Used

Codex was used to draft the project structure, write the static HTML/CSS/JavaScript files, create fictional sample records, and document the automation flow.

The work was kept local and reviewable. No external services, scraping, real lead lists, API keys, or paid tools were used.

## Manual Review

The following items were manually reviewed:

- Demo data is fictional and uses `.example` email addresses.
- The page states that it is a portfolio demo, not client work.
- Scoring logic is visible and deterministic.
- Follow-up messages are drafts only.
- The workflow includes human approval before outreach.
- The project can run as a simple static site.

## Risks Avoided

- No real personal data was processed.
- No scraping was included.
- No API calls or automation accounts were connected.
- No paid tools or platform-specific credentials were required.
- No claim was made that this is client work.
- No automated outreach or spam behavior was included.

## Possible n8n / Zapier / Make Implementation

This project could later be implemented as a no-code automation:

- Form trigger receives a new lead.
- Validation node checks required fields.
- IF/Switch nodes apply scoring conditions.
- Set node stores score and category.
- Template node creates a follow-up draft.
- Approval step pauses before sending.
- Google Sheets, Airtable, Notion, or a CRM could store the result if approved.

## Improvements For A Later Version

- Add a visual workflow canvas.
- Add a CSV upload parser for local-only files.
- Add editable scoring rules.
- Add an approval checklist before copying a follow-up draft.
- Add examples for n8n node mapping.
- Add accessibility testing notes after visual QA.
