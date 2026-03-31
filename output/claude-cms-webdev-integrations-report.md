# Claude + CMS & Web Framework Integrations — Research Report
Date: 2026-03-31

---

## Executive Summary

- Anthropic launched the Model Context Protocol (MCP) in November 2024 — an open standard that became the dominant integration layer between Claude and external tools; by late 2025, over 16,000 MCP servers existed publicly
- Webflow has the most mature first-party Claude integration, with an official MCP server launched April 2025 that gives Claude direct access to the Designer API and Data/CMS API
- WordPress.com, Sanity, and Contentful all have official or community MCP servers; Sanity's is officially supported and hosted; Contentful's is community-led
- Next.js and Astro both have MCP servers (Vercel and Astro team respectively) enabling Claude to work natively with documentation, dev tools, and project context
- Claude Code (Anthropic's CLI agent) is the primary interface developers use to connect these MCP servers to their workflow

---

## Background

Anthropic introduced the **Model Context Protocol (MCP)** in November 2024 as an open standard for connecting AI models to external data sources, tools, and services — replacing fragile one-off API integrations. MCP works like a USB-C standard for AI: any MCP-compatible client (Claude Desktop, Claude Code, Cursor, VS Code) can connect to any MCP-compatible server.

By early 2026, MCP has become the dominant integration pattern for Claude in web development. Nearly every major CMS and web platform has either released an official MCP server or has community servers actively maintained on GitHub.

---

## Key Findings

### 1. Webflow — Most Mature First-Party Integration

- Webflow launched its official MCP server in **April 2025**, one of the first production implementations from a major CMS/web platform
- Two API families exposed to Claude:
  - **Designer API** — canvas manipulation, element creation, style management, CSS variables, components, responsive breakpoints
  - **Data API** — CMS collections/items/fields, SEO metadata, location management, custom code injection
- Use cases: bulk CMS updates, SEO audits, content generation, programmatic site management — all from natural language prompts
- Also integrates via **Make (formerly Integromat)** and **Albato** automation platforms for no-code Claude → Webflow pipelines
- WordPress.com released their own native **Claude Connector** in February 2026, positioning it as the first officially Anthropic-supported WordPress host connector
- Sources:
  - https://developers.webflow.com/mcp/reference/overview
  - https://webflow.com/updates/use-the-webflow-connector-in-claude
  - https://www.cmswire.com/digital-experience/webflow-adds-claude-connector-for-ai-driven-site-management/

---

### 2. WordPress — Multiple Integration Paths

- **WordPress.com** built-in MCP server — official, natively supported; works with Claude Desktop, Claude Code, Cursor, VS Code
- **WordPress MCP Adapter** (developer.wordpress.org, Feb 2026) — lets AI tools discover and call WordPress Abilities directly from within a WP site
- **Royal MCP Plugin** (wordpress.org) — security-focused MCP server with authentication, rate limiting, and audit logging; works with Claude, ChatGPT, and Gemini
- **AI Engine Plugin** — exposes 30+ tools to Claude (wp_create_post, wp_upload_media, theme operations); enables Claude to draft posts, upload images, fork themes from chat
- **InstaWP** — auto-installs MCP plugin, generates secure auth token, creates connection URL, activates SSE transport with a single toggle
- **SEOWriting.ai** — dedicated WordPress MCP Server workflow for Claude-driven SEO content publishing
- Sources:
  - https://developer.wordpress.com/docs/mcp/
  - https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/
  - https://instawp.com/connect-claude-with-wordpress/
  - https://wordpress.org/plugins/royal-mcp/
  - https://meowapps.com/claude-wordpress-mcp/

---

### 3. Sanity — Official MCP Server (Hosted)

- Sanity has an **officially supported, hosted MCP server** at `https://mcp.sanity.io`
- Follows Anthropic's official MCP specification; compatible with any MCP client
- Setup: Sanity CLI auto-detects Cursor, VS Code, and Claude Code and configures the MCP server automatically
- Capabilities: execute GROQ queries, manage releases, patch documents, full schema awareness — no manual context needed
- Status: official but marked experimental as of 2025
- Sources:
  - https://www.sanity.io/docs/ai/mcp-server
  - https://mcp.so/server/sanity-mcp-server/sanity-io

---

### 4. Contentful — Community-Led MCP Server

- **contentful-mcp-server** on GitHub (maintained by Contentful and community contributors): provides Claude with tools to create, edit, organize, and publish content via Contentful Management API
- Two active repos: official `contentful/contentful-mcp-server` and community `ivo-toby/contentful-mcp`
- Composio also wraps Contentful as a managed MCP integration for AI agents
- Status: community-led; no official Anthropic-listed integration as of early 2026
- Sources:
  - https://github.com/contentful/contentful-mcp-server
  - https://github.com/ivo-toby/contentful-mcp
  - https://skywork.ai/blog/contentful-vs-sanity-vs-notion-vs-wordpress-mcp-comparison-2025/

---

### 5. Next.js — Vercel MCP Server + Build-Your-Own

- **next-devtools-mcp** (Vercel, GitHub): official MCP server providing Next.js dev tools for coding agents (Claude, Cursor); requires Next.js 16+ with running dev server
- Tools available: `nextjs_index`, `nextjs_call`, and others that work without a running server
- Community guides exist for building production MCP servers in Next.js deployed on Vercel (with Redis-backed SSE streaming, shareable `.mcp.json` config)
- Claude Code connects to Next.js MCP servers directly via `claude mcp add` CLI command
- Sources:
  - https://github.com/vercel/next-devtools-mcp
  - https://mcpservers.org/servers/run-llama/mcp-nextjs
  - https://www.buildwithmatija.com/blog/build-mcp-server-nextjs

---

### 6. Astro — Official Docs MCP Server

- **Astro Docs MCP Server** (`https://mcp.docs.astro.build/mcp`) — official, hosted by the Astro team
- Claude gets real-time access to the latest Astro documentation while working on Astro projects
- One-line setup: `claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp`
- Particularly useful for avoiding hallucinated or outdated API usage in Astro projects
- Sources:
  - https://github.com/withastro/docs-mcp
  - https://www.elian.codes/blog/25-10-18-astro-docs-gets-an-mcp-server/
  - https://neoads.substack.com/p/astro-mcp-guide

---

### 7. Official Anthropic Reference MCP Servers

Anthropic maintains reference servers for foundational web dev use cases:

| Server | Function |
|--------|----------|
| Filesystem | Secure file read/write with configurable access |
| Git | Read, search, manipulate git repositories |
| Fetch | Web content fetching and HTML → markdown conversion |
| Puppeteer | Browser automation for scraping and testing |
| Memory | Persistent knowledge graph memory across sessions |
| Sequential Thinking | Multi-step reasoning/planning |

- Also: GitHub MCP server (official GitHub × Anthropic collaboration) — lets Claude interact with issues, PRs, repos
- Sources:
  - https://github.com/modelcontextprotocol/servers
  - https://www.anthropic.com/news/model-context-protocol

---

### 8. Claude Code — The Primary Developer Interface

- Claude Code (CLI tool, GA in 2025) is how most developers connect MCP servers to their workflow
- Key web dev capabilities:
  - Runs terminal commands, manages git, edits files, runs test suites
  - Supports **parallel git worktrees** — multiple Claude sessions on separate branches simultaneously
  - Custom slash commands (`/deploy`, `/testall`) for routine automation
  - PR review via `@claude review this PR` comment
- Real-world adoption: teams reporting months-long projects compressed to weeks; individual devs matching small team output
- Production workflow pattern: requirements → design → planning → implementation → verification (using specialized sub-agents per phase)
- Sources:
  - https://code.claude.com/docs/en/common-workflows
  - https://www.digitalapplied.com/blog/claude-code-ai-development-revolution
  - https://www.eesel.ai/blog/claude-code-workflow-automation

---

## Notable Perspectives / Debates

- **Official vs. community MCP servers**: Sanity and Webflow have invested in official, maintained servers; Contentful relies on community maintainers — reliability and longevity differ significantly
- **Security concerns**: Community MCP servers like Royal MCP explicitly call out that most implementations skip authentication, rate limiting, and audit logging — a real gap for production use
- **CMS comparison gap**: A September 2025 comparison of Contentful, Sanity, Notion, and WordPress MCP servers found significant differences in schema awareness, auth models, hosted vs. local setup, and error handling — no single platform excels at everything
- **MCP ecosystem fragmentation**: 16,000+ public MCP servers by end of 2025 creates discovery/quality problems; Anthropic's official plugin marketplace attempts to curate this but coverage is still thin for web-specific tools

---

## Implications / Takeaways

- **If you're on Webflow**: the official MCP server is the most complete integration available today — use it for CMS automation, SEO audits, and bulk content ops directly from Claude
- **If you're on WordPress**: multiple good options exist; WordPress.com's native connector is the safest/most supported path; Royal MCP is best if self-hosting with security requirements
- **If you're on Sanity**: official MCP server is your best option — the auto-configure via Sanity CLI is the fastest setup
- **If you're on Contentful**: use the community `contentful-mcp-server` or route through Composio; expect some maintenance risk
- **For Next.js projects**: Vercel's `next-devtools-mcp` is the go-to; supplement with the Filesystem and Git reference servers
- **For Astro projects**: add the official Astro Docs MCP server as a baseline — prevents hallucinated API usage
- **Claude Code is the recommended interface** for all of the above — it's purpose-built for agentic development workflows and integrates cleanly with MCP via CLI commands
- **Automation platforms** (Make, Zapier, Albato) offer lower-code entry points for Claude → CMS pipelines if direct MCP setup is too technical

---

## Sources

1. [Webflow MCP Server Overview](https://developers.webflow.com/mcp/reference/overview) — Webflow's official MCP docs covering Designer and Data API capabilities
2. [Use the Webflow Connector in Claude](https://webflow.com/updates/use-the-webflow-connector-in-claude) — Webflow's announcement of the Claude Connector, April 2025
3. [Webflow Adds Claude Connector — CMSWire](https://www.cmswire.com/digital-experience/webflow-adds-claude-connector-for-ai-driven-site-management/) — Industry coverage of the launch
4. [WordPress.com MCP Docs](https://developer.wordpress.com/docs/mcp/) — Official WordPress.com MCP server documentation
5. [WordPress MCP Adapter — WordPress Developer Blog](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/) — Feb 2026 announcement of WP MCP Adapter
6. [Connect Claude to WordPress — InstaWP](https://instawp.com/connect-claude-with-wordpress/) — Step-by-step setup guide
7. [Royal MCP Plugin — WordPress.org](https://wordpress.org/plugins/royal-mcp/) — Security-focused community MCP plugin
8. [Meow Apps Claude + WordPress MCP Guide](https://meowapps.com/claude-wordpress-mcp/) — Practical how-to with AI Engine integration
9. [Sanity MCP Server Docs](https://www.sanity.io/docs/ai/mcp-server) — Official Sanity MCP documentation
10. [Contentful MCP Server — GitHub (Official)](https://github.com/contentful/contentful-mcp-server) — Contentful's official MCP server repo
11. [Contentful MCP — Community Fork](https://github.com/ivo-toby/contentful-mcp) — Community-maintained alternative
12. [CMS MCP Comparison 2025 — Skywork](https://skywork.ai/blog/contentful-vs-sanity-vs-notion-vs-wordpress-mcp-comparison-2025/) — Contentful vs Sanity vs Notion vs WordPress MCP deep dive
13. [Vercel next-devtools-mcp — GitHub](https://github.com/vercel/next-devtools-mcp) — Official Next.js dev tools MCP server
14. [Build an MCP Server in Next.js — Build with Matija](https://www.buildwithmatija.com/blog/build-mcp-server-nextjs) — Guide for production Next.js MCP servers
15. [Astro Docs MCP Server — GitHub](https://github.com/withastro/docs-mcp) — Official Astro MCP server repo
16. [Astro MCP Deep Dive — Elian Codes](https://www.elian.codes/blog/25-10-18-astro-docs-gets-an-mcp-server/) — Community write-up on the Astro docs MCP
17. [MCP Reference Servers — GitHub](https://github.com/modelcontextprotocol/servers) — Anthropic's official reference MCP server collection
18. [Introducing MCP — Anthropic](https://www.anthropic.com/news/model-context-protocol) — Original MCP launch announcement, Nov 2024
19. [Claude Code Common Workflows](https://code.claude.com/docs/en/common-workflows) — Official Claude Code workflow documentation
20. [Claude Code Workflow Automation Guide — eesel AI](https://www.eesel.ai/blog/claude-code-workflow-automation) — Practical 2025 guide to Claude Code automation
21. [Webflow + Make Integration](https://www.make.com/en/integrations/webflow/anthropic-claude) — No-code Claude → Webflow automation via Make
