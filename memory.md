# Agency Memory

This file is the shared memory for the agentic-agency workspace. It is tracked in git and shared across all sessions and team members. The lead developer reads from and writes to this file to maintain context across conversations.

**Always update this file after significant work — new clients, key decisions, research findings, workflow changes.**

---

## Agency Context

- **Agency type:** Web agency building WordPress sites for local/niche businesses
- **Primary clients:** RV parks / campgrounds and housing / real estate
- **Theme:** xpress-2 (github.com/xdrew760x/xpress-2) — Gutenberg block-focused, PHP 8.1+, WordPress 6.6+, Tailwind v4
- **Lead developer:** AI agent (Claude) coordinating a team of specialized subagents

---

## Research Findings

### Claude Automation for RV Park & Housing Web Builds (2026-03-31)
- RV parks average **27/100 AI-readiness score** — clear market gap the agency can exploit
- Best Claude features for this niche: Claude Code (CLAUDE.md, Agent Teams, GitHub Actions), Structured Outputs + Batch API for content population, Figma MCP + Code Connect for design-to-code, Webflow/WordPress MCP integrations
- **Batch API + Prompt Caching = up to 95% cost reduction** on content pipelines
- Real estate automation templates (BatchData MCP, contract PDF extraction) are portable to campground/RV park builds
- Full report: `output/claude-web-agency-automation-report.md`

---

## Clients

_Add new clients here as they are onboarded._

| Client | Type | Location | Status | Brief |
|---|---|---|---|---|
| — | — | — | — | — |

---

## Pending / To Build Later

- **Server deployment workflow** — user wants to connect to live servers for theme file changes (PHP, CSS, JS, theme.json). Recommended approach: git deployment pipeline (local edit → git push → server auto-pulls) + xpress-2 MCP for page content. Need to build: `server-connect` workflow and a git deployment guide in `resources/`. Do not build until user asks.

---

## Key Decisions

_Log important architectural or workflow decisions here so future sessions have context._

| Date | Decision | Reason |
|---|---|---|
| 2026-03-31 | Switched workspace from research tool to full agency AI workspace | User leading team in AI adoption for web agency |
| 2026-03-31 | Built 10-subagent team around lead developer role | Need specialized agents for research, copy, SEO, scaffolding, debugging, etc. |
| 2026-03-31 | Using xpress-2 as base theme for all client projects | Agency's own theme, already has AI features + MCP server built in |
| 2026-03-31 | Moved memory to in-repo memory.md | Visible, git-tracked, shared across team — replaces hidden system memory |

---

## User Preferences

- Lead: web developer leading team in AI adoption
- Prefers bullet points over paragraphs
- Always wants a plan shown before execution
- Ask before using parallel instances for research
