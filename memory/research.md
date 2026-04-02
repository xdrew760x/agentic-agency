# Research Findings

Pointers to research reports in `output/` and key takeaways worth remembering across sessions.

---

## Claude / Anthropic — April 2026
**Report:** `output/claude-news-report.md`
**Core finding:** Opus 4.6 dropped 66% in price ($5/$25/M tokens), 1M token context. Mythos model leaked — autonomous cybersecurity capabilities, no public release. Anthropic dropped core safety pledge (RSP v3.0). $100M partner network launched.
**Agency implication:** Opus 4.6 pricing now viable for small RV park / housing clients at scale.

---

## Claude Features Deep-Dive — April 2026
**Report:** `output/claude-features-april2026-research.md`
**Core finding:** Three current models (Opus 4.6, Sonnet 4.6, Haiku 4.5) with 1M context GA on Opus/Sonnet at standard pricing. Claude Code now has Agent Teams, remote access, scheduled tasks, and auto memory. MCP donated to Linux Foundation AAIF (97M installs). Structured Outputs, Auto Caching, Compaction API, Batch API 300k output all GA or near-GA. Haiku 3 retires April 19, 2026.
**Agency implication:** Sonnet 4.6 ($3/$15 MTok) is the practical production model for client automation. Batch API at 50% discount makes nightly runs viable for small clients. Structured Outputs enables reliable block attribute generation for xpress-2 builds. MCP Connector in API enables remote page builds without local server.

---

## Claude Upcoming Features — April 2026
**Report:** `output/claude-upcoming-features-research.md`
**Copy deliverable:** `output/claude-upcoming-features-copy.md`
**Core finding:** Claude Mythos (Capybara) is trained and in private pilot — Q2 2026 public release likely pending safety eval. Claude Code source leak exposed KAIROS (always-on daemon), COORDINATOR_MODE (native multi-agent), ULTRAPLAN (30-min cloud Opus planning), BUDDY (AI pet companion) — all hidden behind compile flags, internal notes hint May 2026 launch. Claude Sonnet 5 "Fennec" already shipped Feb 3 (82.1% SWE-Bench, $3/MTok). MCP next spec release targeted June 2026: server cards .well-known, horizontal scaling, enterprise SSO/audit trails. Key betas not yet GA: Context Compaction, Agent Skills, Code Execution Tool, Claude Agent SDK, output-300k.
**Agency implication:** COORDINATOR_MODE and KAIROS are transformative for multi-page client builds if/when released. Agent Skills GA will enable automated file ingestion (rate sheets, inventory). MCP enterprise auth is the unlock for scaling multi-client xpress-2 deployments.
