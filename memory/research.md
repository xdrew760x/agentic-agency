# Research Findings

Pointers to research reports in `output/` and key takeaways worth remembering across sessions.

---

## Nextech API Integration for Custom Booking Form — April 2026
**Report:** `output/nextech-api-integration-report.md`
**Widget report:** `output/nextpatient-widget-research.md`
**Core finding:** Nextech exposes two FHIR STU3 REST APIs (Select and Practice+) with OAuth 2.0 auth via Azure AD. Slot availability, appointment creation, and inline prospect creation are all supported. Daily limit of 1,000 API calls is a major constraint. NextPatient is the endorsed embeddable widget alternative — script tag embed, quote-based pricing, requires demo with sales. BAA required, backend proxy mandatory for HIPAA compliance.
**Agency implication:** Custom booking form is technically feasible but requires serverless backend proxy, careful rate limit management, and BAA execution. NextPatient widget is the faster path — practice must activate via Nextech Community Portal, then we embed a script tag. User has not yet decided which route to take.

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

---

## Agentic Agency Landing Page — April 2026
**Report:** `output/agentic-office-landing-research.md`
**Core finding:** The 3D virtual office concept is genuine whitespace — only two comparable projects exist (OpenClaw Office, Agent Office), both dev tools with no marketing presence. Interactive demos convert at 12.3% vs 4.7% for static images. Dark theme + gradient accents + scroll-triggered narrative is the 2026 standard for AI tool pages. Pain-first messaging + "human strategy, agent execution" framing outperforms generic AI hype.
**Agency implication:** Our office is a differentiator. Embedding the live Babylon.js scene (or video) in the hero is the highest-leverage design decision. Landing page shipped with all 10 agents contributing — research, brief, tokens, copy, SEO audit, image prompts, build, review, debug, launch emails.
