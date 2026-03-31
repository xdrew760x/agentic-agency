# Claude Features for Web Agency Automation — Research Report
Date: 2026-03-31
Audience: Web agency serving RV park and housing/real estate clients

---

## Executive Summary

- Claude's highest-leverage agency features are: **Claude Code** (agentic CLI), **Structured Outputs API**, **MCP integrations**, and the **Figma MCP + Code Connect** pipeline
- RV parks score an average of **27/100 on AI-readiness** — an immediate commercial opportunity for agencies that can build Claude-powered content layers
- Real estate has proven, production-ready templates (BatchData MCP, listing generators, contract extraction) that directly translate to campground/property builds
- Combining **Batch API + Prompt Caching** cuts content generation costs by up to **95%**
- The recommended agency stack: React 18 + TypeScript + Tailwind v4 + shadcn/ui + Figma MCP + Claude Code

---

## 1. Claude Code — Agentic Development CLI

**What it is:** A terminal-based AI coding agent that reads your entire codebase, writes files, runs commands, and iterates autonomously until tasks are done.

**Top features for agencies:**

- **CLAUDE.md** — a shared "constitution" (~100 lines, checked into git) that every Claude session reads automatically. Captures your stack, conventions, and client-specific rules. Free, instant, team-wide.
- **Plan Mode** — Claude drafts a full implementation plan for review before writing any code. Critical for client work where mistakes are costly.
- **Agent Teams** — spawn 3–5 parallel Claude instances, each on its own git worktree (separate branch). Frontend, backend, and tests built simultaneously. Reported 3–4x speed vs. sequential.
- **GitHub Actions (`claude-code-action`)** — comment `@claude` on any PR or issue → Claude implements the fix and opens a PR. Automates routine maintenance entirely.
- **PostToolUse Hooks** — auto-run linter/tests every time Claude writes a file. Self-testing agent loop with zero manual steps.
- **Custom Skills** — slash commands like `/scaffold-component` or `/new-client-project` that encode your agency's patterns. Shared via git — no per-person training.
- **Extended Thinking** — auto-allocates up to 31,999 reasoning tokens on complex tasks (architecture decisions, cross-file refactors).

**Productivity reported:** 20–40% gains for general use; Agent Teams compress multi-day features into hours.

---

## 2. Claude API — Content & Data Population

**What it is:** REST API + Python/TypeScript SDKs for building automated content pipelines.

**Top features for RV park / housing clients:**

- **Structured Outputs** — define a JSON schema (e.g., `title`, `amenities[]`, `meta_description`, `price_range`) and Claude is constrained to produce valid, schema-matching data every time. No broken JSON, no missing fields.
- **Batch API** — up to 100,000 requests per batch, async, results in 1 hour. Use case: generate all 50 site-type pages for a campground overnight. **50% cost discount** vs. standard API.
- **Prompt Caching** — 90% cost reduction on repeated system prompts. Combined with Batch API = up to **95% total savings**.
- **PDF Extraction** — upload lease agreements, rate sheets, permit docs, purchase contracts → Claude extracts structured data into JSON → auto-populates CMS or CRM. No parsing logic needed.
- **Model selection for cost optimization:**
  - Haiku 4.5 → volume tasks (meta descriptions, FAQs, social captions)
  - Sonnet 4.6 → quality-sensitive copy (hero text, About pages, property narratives)

**RV Park specific:**
- Insider Perks / CampVantage platform is already using Claude for campground content automation
- RoverPass added Claude/Zapier integration for reservation-triggered workflows (e.g., personalized welcome emails)
- AI-readiness score of 27/100 across 127 North American properties = immediate market gap

**Real estate specific:**
- BatchData MCP: one request triggers fetch → ownership verify → geocode → comp enrichment → marketing copy generation
- Contract PDF extraction → auto-fill CRM in seconds
- Time savings documented: 70–80% reduction in content creation time

---

## 3. UI Design & Component Generation

**What it is:** Claude can go from text description → live React component → Figma canvas, and back.

**Top features:**

- **Claude Artifacts** — generates live-preview React/HTML components in chat. Share a link with clients for instant review. No dev environment needed.
- **Frontend Design Plugin** (277K+ installs, Anthropic official) — overrides Claude's conservative UI defaults with bold typography, purposeful color, and intentional animation. **Must install** — defaults produce generic output.
- **Figma MCP Server** (open beta) — Claude reads your Figma file directly:
  - `get_design_context` → returns code + screenshot from any Figma node
  - `get_variable_defs` → extracts color/spacing/type tokens
  - `search_design_system` → queries your component library
- **Code Connect** — maps Figma components to your actual codebase components and prop interfaces. Without it, Claude generates generic React. With it, Claude generates code using **your real imports and components**.
- **Code to Canvas** (Figma × Anthropic, Feb 2026) — push Claude-generated UI back into Figma as editable vector layers. Lets clients compare options in Figma before dev commitment.
- **Design token pipelines** — Claude converts design tokens into `tailwind.config.js`, CSS custom properties, and semantic token hierarchies in one command.

**Agency use case:** Anthropic's growth team generates 100 Figma ad variations (swapping headlines/CTAs) in under a second per batch.

---

## 4. CMS & Framework Integrations (MCP)

**What it is:** MCP (Model Context Protocol) — open standard launched Nov 2024 — connects Claude to any tool via a server. 16,000+ public MCP servers exist.

**Best integrations for agency use:**

| Platform | Status | Key Capabilities |
|---|---|---|
| **Webflow** | Official (April 2025) | Canvas, styles, CMS collections, SEO metadata, bulk updates |
| **WordPress.com** | Official (Feb 2026) | Create/edit posts, upload media, manage themes |
| **WordPress (self-hosted)** | Community (Royal MCP, AI Engine) | 30+ tools, auth + rate limiting + audit logging |
| **Sanity** | Official hosted | GROQ queries, releases, schema-aware doc patching |
| **Contentful** | Community | Create/edit/publish content via Management API |
| **Next.js** | Official (Vercel) | Dev tools, component inspection |
| **Astro** | Official | Real-time docs access, prevents API hallucination |

**Key recommendation:** Add Astro or Next.js MCP servers as baseline on all framework projects — prevents Claude from using outdated/hallucinated APIs.

**Security note:** Most community MCP servers skip auth, rate limiting, and audit logging. Evaluate carefully before production use. Royal MCP is the exception for WordPress.

---

## 5. Recommended Agency Workflow (RV Park / Housing Builds)

**Project setup (one-time per client):**
1. Write a `CLAUDE.md` capturing client stack, brand conventions, content rules
2. Install Figma MCP Server + Code Connect for the client's design file
3. Enable Frontend Design skill
4. Set up PostToolUse Hook for auto-linting

**Content population pipeline:**
1. Receive client data (rate sheets, amenity lists, site maps, PDFs)
2. Define Structured Output schema matching CMS fields
3. Run Batch API overnight → all pages generated at 95% reduced cost
4. PDF extraction for any contracts or documents → auto-populate CRM

**Ongoing maintenance:**
1. Install GitHub Action (`claude-code-action`) → bug report issues become auto-fix PRs
2. Use Agent Teams for any large feature builds
3. Use Custom Skills for repeatable patterns (e.g., `/new-rv-park-page`, `/generate-listing`)

---

## Implications / Takeaways

- **RV parks are an underserved niche right now** — 27/100 average AI-readiness score means structured, Claude-generated content is a direct competitive differentiator your agency can sell
- **Real estate templates are proven and portable** — the BatchData → Claude → CMS pipeline can be adapted directly for campground property management
- **CLAUDE.md is the highest ROI starting point** — free, immediate, shared across your team, and makes every session follow your agency's standards
- **The Figma MCP + Code Connect combination** is where the biggest speed gains are for design-heavy client work
- **Batch API + Prompt Caching** is the correct cost model for content-heavy builds — never run single-call loops at scale

---

## Sources

1. [Claude Code Docs](https://code.claude.com/docs/en/overview) — Official feature reference
2. [Enabling Claude Code to Work Autonomously — Anthropic](https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously)
3. [How Anthropic Teams Use Claude Code](https://www.anthropic.com/news/how-anthropic-teams-use-claude-code)
4. [Structured Outputs — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
5. [Batch Processing — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
6. [Webflow Claude Connector](https://www.ingeniom.com/post/webflow-claude-connector-ai-workflows)
7. [Webflow MCP Docs](https://developers.webflow.com/mcp/reference/overview)
8. [WordPress.com MCP Docs](https://developer.wordpress.com/docs/mcp/)
9. [Sanity MCP Docs](https://www.sanity.io/docs/ai/mcp-server)
10. [Figma Blog — Code to Canvas](https://www.figma.com/blog/introducing-claude-code-to-figma/)
11. [Figma MCP Help Center](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
12. [Frontend Design Plugin — Anthropic](https://claude.com/plugins/frontend-design)
13. [BatchData + Claude Pipeline](https://batchdata.io/blog/how-to-use-real-estate-data-mcp-for-automated-real-estate-market-reports)
14. [Insider Perks / AI-Ready Website Standard](https://moderncampground.com/usa/insider-perks-publishes-first-ai-ready-website-standard-for-outdoor-hospitality-industry)
15. [RoverPass + AI Integration](https://moderncampground.com/press-releases/roverpass-adds-ai-integration-for-campgrounds-and-rv-parks-via-zapier)
16. [Claude Code GitHub Actions Docs](https://code.claude.com/docs/en/github-actions)
17. [Agent Teams — Official Docs](https://code.claude.com/docs/en/agent-teams)
18. [Astro Docs MCP Server](https://github.com/withastro/docs-mcp)
19. [Top Claude Skills for UI/UX — Snyk](https://snyk.io/articles/top-claude-skills-ui-ux-engineers/)
20. [Claude API for Real Estate — C21 Edge](https://www.c21edge.com/ai-assistants-in-real-estate-comparing-chatgpt-and-claude/)
