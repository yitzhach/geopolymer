# Agent instructions

Read `HANDOFF.md` before work and follow `KNOWLEDGE_ENGINE_MASTER_PROMPT.md` for
research. Apply `SUBAGENT_POLICY.md` throughout every session. These instructions
apply to the entire repository. Preserve source provenance and evidence limits.

Before adding or changing summaries/deep dives, read and apply
`SUMMARY_DEEP_DIVE_STANDARD.md`. Every detailed summary and guide must expose the
shared `mix-data-v1` dataset, with source quantities when available and explicit
pending/held/not-applicable states otherwise. Use the existing exact-DOI recipe
catalog and never fabricate masses or complete-protocol status to fill fields.

Mix sheets (`research/mix-sheets/`) follow `MIX_SHEET_STANDARD.md`; use the `mix-sheet`
skill (`.claude/skills/mix-sheet/SKILL.md`). Review-note mode opens no source, so the
master prompt's research procedures apply only to source-text mode. Every sheet must
pass `npm run mixes -- check`.

