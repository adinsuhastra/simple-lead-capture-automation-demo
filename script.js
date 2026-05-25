const sampleLeads = [
  {
    company: "Northstar Studio",
    contactName: "Maya",
    email: "maya@northstar.example",
    need: "Landing page cleanup and lead form routing",
    budget: 1200,
    urgency: "high",
    fit: "strong",
    source: "Website form"
  },
  {
    company: "Cedar Books",
    contactName: "Rafi",
    email: "rafi@cedarbooks.example",
    need: "Spreadsheet cleanup for supplier list",
    budget: 350,
    urgency: "medium",
    fit: "strong",
    source: "CSV import"
  },
  {
    company: "Blue Harbor Cafe",
    contactName: "Lina",
    email: "",
    need: "New booking automation idea",
    budget: 450,
    urgency: "low",
    fit: "medium",
    source: "Manual entry"
  },
  {
    company: "Pixel Lane",
    contactName: "Andre",
    email: "andre@pixellane.example",
    need: "Workflow automation audit",
    budget: 900,
    urgency: "high",
    fit: "medium",
    source: "Website form"
  },
  {
    company: "Green Desk Admin",
    contactName: "Sari",
    email: "sari@greendesk.example",
    need: "Research list formatting",
    budget: 220,
    urgency: "medium",
    fit: "low",
    source: "CSV import"
  }
];

let latestOutput = [];

function validateLead(lead) {
  const missingFields = [];

  if (!lead.company) missingFields.push("company");
  if (!lead.contactName) missingFields.push("contact name");
  if (!lead.email) missingFields.push("email");
  if (!lead.need) missingFields.push("need");

  return {
    valid: missingFields.length === 0,
    missingFields
  };
}

function scoreLead(lead) {
  const validation = validateLead(lead);
  let score = 0;
  const reasons = [];

  if (validation.valid) {
    score += 20;
    reasons.push("complete contact details");
  } else {
    reasons.push(`missing ${validation.missingFields.join(", ")}`);
  }

  if (lead.budget >= 1000) {
    score += 30;
    reasons.push("high budget");
  } else if (lead.budget >= 500) {
    score += 20;
    reasons.push("mid-range budget");
  } else {
    score += 8;
    reasons.push("small budget");
  }

  if (lead.urgency === "high") {
    score += 25;
    reasons.push("high urgency");
  } else if (lead.urgency === "medium") {
    score += 15;
    reasons.push("medium urgency");
  } else {
    score += 5;
    reasons.push("low urgency");
  }

  if (lead.fit === "strong") {
    score += 25;
    reasons.push("strong service fit");
  } else if (lead.fit === "medium") {
    score += 15;
    reasons.push("medium service fit");
  } else {
    score += 5;
    reasons.push("low service fit");
  }

  let category = "Cold";
  if (score >= 75 && validation.valid) {
    category = "Hot";
  } else if (score >= 50) {
    category = "Warm";
  }

  return {
    ...lead,
    score,
    category,
    validation,
    reasons
  };
}

function createFollowUpDraft(lead) {
  if (!lead) {
    return "Run mock scoring to generate a human-reviewed follow-up draft for the strongest sample lead.";
  }

  return `Hi ${lead.contactName},

Thanks for sharing the request for ${lead.company}. Based on the details, the strongest next step would be a short review of the current workflow and a simple implementation plan for: ${lead.need}.

I can start with a small scoped task first, keep the process documented, and send a clear summary for review before anything is used with real customers.

Best,
Adin`;
}

function renderLeadTable(leads = sampleLeads) {
  const tableBody = document.querySelector("#leadTableBody");

  tableBody.innerHTML = leads.map((lead) => {
    const statusClass = lead.category ? lead.category.toLowerCase() : "pending";
    const statusLabel = lead.category || "Pending";

    return `
      <tr>
        <td><strong>${lead.company}</strong><br><span>${lead.source}</span></td>
        <td>${lead.need}</td>
        <td>$${lead.budget.toLocaleString()}</td>
        <td>${lead.urgency}</td>
        <td>${lead.fit}</td>
        <td><span class="status-pill ${statusClass}">${statusLabel}</span></td>
      </tr>
    `;
  }).join("");
}

function renderSummary(scoredLeads) {
  const totals = scoredLeads.reduce((summary, lead) => {
    summary.total += 1;
    summary[lead.category.toLowerCase()] += 1;
    return summary;
  }, { total: 0, hot: 0, warm: 0, cold: 0 });

  document.querySelector("#totalLeads").textContent = totals.total;
  document.querySelector("#hotLeads").textContent = totals.hot;
  document.querySelector("#warmLeads").textContent = totals.warm;
  document.querySelector("#coldLeads").textContent = totals.cold;
}

function renderOutput(scoredLeads) {
  latestOutput = scoredLeads.map((lead) => ({
    company: lead.company,
    score: lead.score,
    category: lead.category,
    validation: lead.validation.valid ? "complete" : `needs review: ${lead.validation.missingFields.join(", ")}`,
    recommended_next_action: lead.category === "Hot"
      ? "Human review, then send a short follow-up."
      : lead.category === "Warm"
        ? "Review budget and scope before follow-up."
        : "Hold or request clearer details."
  }));

  document.querySelector("#jsonPreview").textContent = JSON.stringify({
    demo: "Simple Lead Capture Automation Demo",
    generated_locally: true,
    contains_real_personal_data: false,
    leads: latestOutput
  }, null, 2);

  const strongestLead = scoredLeads
    .filter((lead) => lead.validation.valid)
    .sort((a, b) => b.score - a.score)[0];

  document.querySelector("#followUpDraft").textContent = createFollowUpDraft(strongestLead);
}

function runScoring() {
  const scoredLeads = sampleLeads.map(scoreLead);
  renderLeadTable(scoredLeads);
  renderSummary(scoredLeads);
  renderOutput(scoredLeads);
}

async function copyDraft() {
  const draft = document.querySelector("#followUpDraft").textContent;
  const status = document.querySelector("#copyStatus");

  try {
    await navigator.clipboard.writeText(draft);
    status.textContent = "Draft copied for review.";
  } catch (error) {
    status.textContent = "Copy unavailable in this browser. Select the draft text manually.";
  }
}

function downloadSummary() {
  if (!latestOutput.length) {
    runScoring();
  }

  const blob = new Blob([document.querySelector("#jsonPreview").textContent], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "lead-scoring-summary-demo.json";
  link.click();
  URL.revokeObjectURL(url);
}

document.querySelector("#runScoringButton").addEventListener("click", runScoring);
document.querySelector("#copyDraftButton").addEventListener("click", copyDraft);
document.querySelector("#downloadSummaryButton").addEventListener("click", downloadSummary);

renderLeadTable();
