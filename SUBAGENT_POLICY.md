# Subagent delegation and token efficiency policy

The Primary Agent is the lead orchestrator and retains responsibility for the
result. Quality first, token efficiency second; delegate only when beneficial.

## Model and capability rules
- Use the lowest-cost lightweight model available and suitable for the task;
  prefer Mini-tier models. Never use expensive or high-reasoning subagent models.
- Select the model explicitly. If selection is unavailable, work directly or
  disclose that limitation; never claim a lightweight model was selected.
- Keep advanced reasoning, architecture, complex coding and final decisions with
  the Primary Agent. A lightweight failure returns to the Primary Agent rather
  than escalating to an expensive subagent.

## Scope and depth
- Delegate only small, independent, clearly defined information tasks: repository
  or documentation searches, large-file summaries, log/error/code-location scans,
  reference gathering, factual extraction, simple comparisons and organization.
- Do not delegate architecture, strategy, complex problem-solving, critical code
  changes, repository modifications, integration, final validation or QA, or tasks
  requiring substantial main-conversation context.
- Only the Primary Agent may create or manage subagents. Maximum depth is one.
  Every assignment must explicitly prohibit recursive delegation and repository
  modifications. Subagents must not invoke, create or manage other subagents.

## Efficiency
- Before delegating, assess whether it saves time, context or computational cost.
  Complete trivial tasks directly; batch related searches into one assignment.
- Use narrow, self-contained instructions and only the minimum necessary context.
  Prefer a fresh context over forwarding the full conversation.
- Limit concurrency to three subagents unless the Primary Agent records a clear
  efficiency justification for more; depth and model restrictions still apply.
- Require concise findings, not reasoning transcripts or duplicated reports.

## Required return format
Each subagent returns concise bullets containing key findings; relevant file
paths and line numbers or source references; and uncertainties/unresolved issues.
No unnecessary narration, repetition or unsupported completion claims.

## Primary Agent accountability
The Primary Agent plans and coordinates work, evaluates and verifies findings,
makes implementation decisions, performs repository changes and integration,
runs final validation/testing, and ensures all project requirements are met.
Delegated research is a lead, not a verified fact until checked. Never represent
AI checks as human/domain review. Apply this policy within actual tool and
model-selection capabilities and higher-priority instructions.
