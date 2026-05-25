# Automation Flow

## Trigger

A new lead is received from a form submission, manual entry, or uploaded CSV row.

For this static demo, the trigger is the `Run mock scoring` button.

## Input

Each lead record includes:

- Company name
- Contact name
- Email
- Requested need
- Estimated budget
- Urgency
- Service fit
- Source

All included records are fictional demo data.

## Processing Steps

1. Read lead record.
2. Validate required fields:
   - company
   - contact name
   - email
   - need
3. Score budget:
   - high budget: 30 points
   - mid-range budget: 20 points
   - small budget: 8 points
4. Score urgency:
   - high: 25 points
   - medium: 15 points
   - low: 5 points
5. Score fit:
   - strong: 25 points
   - medium: 15 points
   - low: 5 points
6. Add validation score:
   - complete contact details: 20 points
   - incomplete record: no validation points
7. Categorize the lead.
8. Draft a follow-up message for review.
9. Export a structured summary.

## Decision Logic

- Hot: score is 75 or above and required contact fields are complete.
- Warm: score is 50 or above.
- Cold: score is below 50, or details are too weak for immediate follow-up.

Incomplete records can still be Warm or Cold, but they should not be sent directly to outreach.

## Output

The workflow produces:

- Lead score
- Lead category
- Validation status
- Recommended next action
- Draft follow-up message for the best qualified lead
- JSON-style summary

## Human Approval Checkpoint

No follow-up message should be sent automatically.

A human should review:

- whether the lead details are complete
- whether the score makes sense
- whether the follow-up draft is accurate and respectful
- whether outreach is allowed under the source/platform rules

## Error Handling Ideas

- If email is missing, mark the lead as needing review.
- If budget is missing, use a conservative default and request clarification.
- If urgency is unclear, categorize as low urgency until confirmed.
- If duplicate company names appear, flag for manual merge.
- If the source is not approved for outreach, hold the record.
- If any field contains private or sensitive data, remove it from demo/reporting output.
