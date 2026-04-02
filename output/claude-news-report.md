# Claude AI (Anthropic) — Research Report
Date: 2026-04-02

## Executive Summary
- Claude Opus 4.6 and Sonnet 4.6 are the current flagships — both released in February 2026 with 1M token context windows and significant price drops (Opus down 66%)
- An internal model called **Claude Mythos** was leaked March 26 — confirmed by Anthropic as a "step change" with autonomous cybersecurity capabilities; no public release date set
- Anthropic **scrapped its core safety pledge** in February (RSP v3.0), replacing hard guardrails with nonbinding roadmaps — widely criticized
- A **$100M Claude Partner Network** launched with Accenture, PwC, Deloitte, Cognizant, and Infosys signed on

---

## Key Findings

### Current Models (as of April 2026)

| Model | Context | Input | Output | Notes |
|---|---|---|---|---|
| Opus 4.6 | 1M tokens | $5/M | $25/M | 66% cheaper than Opus 4.1 |
| Sonnet 4.6 | 200k tokens | $3/M | $15/M | Default on Free/Pro plans |
| Haiku 4.5 | 200k tokens | $1/M | $5/M | Fastest/cheapest tier |
| Haiku 3 | — | — | — | Retiring April 19, 2026 |

- No long-context pricing surcharge on Opus 4.6 or Sonnet 4.6
- 300k output tokens available on Batch API (beta header `output-300k-2026-03-24`)
- Batch API = 50% off standard pricing

### Claude Mythos (Leaked March 26, 2026)
- Belongs to new internal tier called "Capybara" — above Opus
- Described internally as "by far the most powerful AI model we've ever developed"
- Can autonomously surface unknown vulnerabilities in production codebases
- Anthropic is briefing U.S. government officials on cybersecurity risks
- No public release date; cost-to-serve at scale is a blocker
- Market reaction: cybersecurity stocks fell, Bitcoin slid

### New Features and Products
- **Claude Code 2.1.0** — enhanced agentic/workflow capabilities (January 2026)
- **Claude Cowork** — GUI version of Claude Code for non-technical users (research preview, January 2026)
- **Agent Team** — multi-agent task coordination, launched with Opus 4.6
- **Extended + Adaptive Thinking** — available across all three current flagships
- **Claude Certified Architect (Foundations)** — first official technical certification

### Safety and Policy
- **RSP v3.0 (February 24, 2026)** — Anthropic dropped its 2023 commitment to pause model development if capabilities outpace safety
- New policy: publish a Frontier Safety Roadmap covering Security, Alignment, Safeguards, Policy; release model risk assessments every 3–6 months
- Widely criticized by CNN, Time, AI safety advocacy groups
- Anthropic's rationale: if they pause while less safety-conscious labs don't, the least-safe developers set the pace

### Enterprise
- **$100M Claude Partner Network** — Accenture (30k staff trained), PwC, Deloitte, Cognizant, Infosys
- **Accenture Anthropic Business Group** — dedicated team, select strategic partner status
- Code Modernization starter kit for legacy codebase migration
- Confirmed presence at Google Cloud Next 2026

---

## Implications for the Agency

### Pricing
- Opus 4.6 at $5/$25 makes high-quality copy generation (hero text, property descriptions) economically viable for small RV park and housing clients — was cost-prohibitive at $15/$75
- Batch API at 50% off is useful for bulk operations: generating copy for multiple pages/listings at once

### Context Window
- 1M tokens on Opus 4.6 means entire client document libraries (lease agreements, HOA docs, zoning codes, RV park site maps) can be processed in a single API call
- Directly useful for the `client-onboarder` and `researcher` subagents when handling large brief documents

### Computer Use (Sonnet 4.6)
- "Human-level" on complex multi-step web forms — opens up automation for booking systems and MLS form submissions for clients

### Claude Cowork
- Non-technical clients could interact with Claude-powered tools directly; worth monitoring for demos to agency clients

### Cybersecurity (Mythos)
- If any clients run booking or property management platforms with exposed APIs, the threat landscape is shifting — worth factoring into security audits

### Platform Stability
- $100M partner network + major consultancy sign-ons signal Claude is a safe long-term bet as the agency's AI platform

---

## Sources

1. [Anthropic's Explosive Start to 2026 — Medium](https://fazal-sec.medium.com/anthropics-explosive-start-to-2026-everything-claude-has-launched-and-why-it-s-shaking-up-the-668788c2c9de) — January–February 2026 launch overview
2. [Introducing Claude Sonnet 4.6 — Anthropic](https://www.anthropic.com/news/claude-sonnet-4-6) — Official feature breakdown and pricing
3. [Models Overview — Claude API Docs](https://platform.claude.com/docs/en/about-claude/models/overview) — Authoritative model IDs, context windows, pricing
4. [Claude Mythos — Fortune](https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/) — Primary source on Mythos leak
5. [Claude Mythos — Futurism](https://futurism.com/artificial-intelligence/anthropic-step-change-new-model-claude-mythos) — Cybersecurity risk framing
6. [Claude Mythos — Euronews](https://www.euronews.com/next/2026/03/30/what-is-anthropics-mythos-the-leaked-ai-model-that-poses-unprecedented-cybersecurity-risks) — Public explainer on Mythos capabilities
7. [Cybersecurity Stocks Fall — CNBC](https://www.cnbc.com/2026/03/27/anthropic-cybersecurity-stocks-ai-mythos.html) — Market reaction
8. [Anthropic Drops Safety Pledge — Time](https://time.com/7380854/exclusive-anthropic-drops-flagship-safety-pledge/) — RSP v3.0 investigative report
9. [Responsible Scaling Policy v3.0 — Anthropic](https://www.anthropic.com/news/responsible-scaling-policy-v3) — Official policy document
10. [Anthropic Loosens Safety Pledge — Marketplace](https://www.marketplace.org/story/2026/02/25/anthropic-loosens-safety-pledge-to-compete-with-its-ai-peers) — Competitive context
11. [Claude Partner Network — Anthropic](https://www.anthropic.com/news/claude-partner-network) — Official $100M initiative
12. [Accenture Partnership — Anthropic](https://www.anthropic.com/news/anthropic-accenture-partnership) — Partnership details
13. [Claude API Pricing 2026 — MetaCTO](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration) — Pricing breakdown
14. [Anthropic Removes Long-Context Surcharge — The New Stack](https://thenewstack.io/claude-million-token-pricing/) — Specific pricing change for 1M context
