# Claude Features & Updates — Research Report
Date: 2026-04-02
Prepared by: Researcher Agent
Audience: Web agency team (WordPress builds, RV park / housing clients)

---

## Executive Summary

- **Three current production models** as of April 2026: Opus 4.6, Sonnet 4.6, Haiku 4.5 — all with 1M token context (Opus/Sonnet) and extended thinking. Pricing dropped significantly vs. prior generation.
- **Claude Code is the agency's highest-leverage tool** — now GA with Agent Teams, parallel subagents, VS Code integration, remote access, and scheduled tasks. Used internally by Anthropic for multi-agent code review.
- **MCP has gone from experiment to industry standard** — donated to Linux Foundation (AAIF) in December 2025, 97M installs, 75+ connectors, and now GA on the API with no beta header required.
- **API surface has matured rapidly** — Structured Outputs GA, Automatic Prompt Caching, Compaction API, Files API, Code Execution v2, Web Search/Fetch GA, and a 300k output token ceiling on Batch API are all shipping production-ready.

---

## Key Findings by Theme

### 1. Current Model Lineup (as of April 2026)

**Claude Opus 4.6** — Released February 5, 2026
- Best for: complex agentic tasks, long-horizon work, coding
- Context window: 1M tokens (GA, no beta header)
- Max output: 128k tokens (sync); 300k tokens on Batch API
- Pricing: $5 / MTok input · $25 / MTok output
- Extended thinking: Yes (adaptive mode recommended; manual `budget_tokens` deprecated)
- Training data cutoff: August 2025 / Reliable knowledge: May 2025
- METR autonomy benchmark: 14.5-hour task horizon at 50th percentile
- Fast Mode available (up to 2.5x speed, research preview, waitlist)
- Does NOT support prefilling assistant messages

**Claude Sonnet 4.6** — Released February 17, 2026
- Best for: everyday tasks, agentic search, balanced speed/intelligence
- Context window: 1M tokens (GA)
- Max output: 64k tokens (sync); 300k on Batch API
- Pricing: $3 / MTok input · $15 / MTok output (same as Sonnet 4.5)
- Extended thinking: Yes (interleaved thinking auto-enabled with adaptive mode)
- Training data cutoff: January 2026 / Reliable knowledge: August 2025
- First Sonnet preferred over prior-gen Opus on coding evaluations

**Claude Haiku 4.5** — Released October 15, 2025
- Best for: real-time, high-volume, cost-sensitive workloads
- Context window: 200k tokens
- Max output: 64k tokens
- Pricing: $1 / MTok input · $5 / MTok output
- Extended thinking: Yes; Adaptive thinking: No
- Training data cutoff: July 2025

**Legacy / Deprecated Models (action required)**
- Claude Haiku 3 (`claude-3-haiku-20240307`): **Retiring April 19, 2026** — migrate to Haiku 4.5 immediately
- Sonnet 4.5 / Sonnet 4: 1M context beta retiring April 30, 2026 — migrate to Sonnet 4.6 or Opus 4.6
- Claude Sonnet 3.7 and Haiku 3.5: Retired February 19, 2026
- Claude Opus 3: Retired January 5, 2026

**API IDs for current models:**
- `claude-opus-4-6`
- `claude-sonnet-4-6`
- `claude-haiku-4-5-20251001` (alias: `claude-haiku-4-5`)

---

### 2. Claude Code — Agentic Dev Environment

**General trajectory:** Launched as research preview March 2025, GA by May 2025. 176+ documented updates in 2025. Annualized revenue passed $500M within three months of GA.

**Agent Teams (experimental, Opus 4.6+, v2.1.32+)**
- One "lead" session coordinates multiple "teammate" sessions
- Teammates have independent context windows, peer-to-peer messaging, and shared task lists with dependency tracking
- File locking prevents conflicts across parallel work
- Enable via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- Primary use cases: parallel code review (security + perf + architecture simultaneously), cross-layer changes spanning frontend/backend/tests

**Subagents (stable)**
- Run within a single session, report results back to main agent
- Named subagents now appear in `@` mention typeahead
- Use subagents for focused, discrete tasks; use Agent Teams for collaborative, inter-dependent work

**VS Code Integration** — Launched September 29, 2025
- Native VS Code extension (beta): inline diffs, dedicated sidebar panel, graphical interaction
- Complements the existing CLI workflow

**Remote Control** — February 2026
- Access a live Claude Code session from a browser or mobile device

**Scheduled Tasks**
- Automate recurring workflows without manual prompts

**Parallel Agents**
- Execute large development tasks using multiple coordinated agents

**Auto Memory**
- Persistent project knowledge that improves over time across sessions

**Hook Events (April 2026)**
- `PreToolUse` hooks now support "defer" — headless sessions can pause and resume with `-p --resume`
- `PermissionDenied` hook fires after auto-mode classifier denials
- `CLAUDE_CODE_NO_FLICKER=1` env var for flicker-free rendering

**Claude Code Analytics API** — September 10, 2025
- Programmatic access to daily aggregated usage metrics: productivity metrics, tool usage stats, cost data

---

### 3. API Capabilities — What's New

**Extended Thinking**
- Interleaved thinking (thinking between tool calls) now auto-enabled via adaptive mode on Sonnet 4.6+
- `effort` parameter (GA as of February 5, 2026) replaces `budget_tokens` for controlling thinking depth
- `thinking.display: "omitted"` field (March 16, 2026): omit thinking content from streaming responses while preserving the signature for multi-turn continuity. No billing change.
- Up to 128k output tokens on Opus 4.6; 64k on Sonnet 4.6 / Haiku 4.5

**Structured Outputs** — GA January 29, 2026
- Guaranteed schema conformance for JSON responses and tool inputs
- No beta header required (for Claude API; still in beta on Bedrock and Azure)
- Expanded schema support, improved grammar compilation latency
- Parameter renamed: `output_format` → `output_config.format`
- Available on: Sonnet 4.5, Opus 4.5, Haiku 4.5, and all 4.6 models

**Batch API**
- 50% discount on all input/output tokens
- Now supports up to **300k output tokens** per message (Opus 4.6 / Sonnet 4.6) using `output-300k-2026-03-24` beta header — suited for long-form content, large code generation, structured data dumps
- Prompt caching supported in Batch API (optimized January 2025)

**Prompt Caching**
- **Automatic caching** (GA February 19, 2026): add single `cache_control` field; system automatically caches last cacheable block and advances the cache point as conversations grow. No manual breakpoint management.
- 1-hour cache duration: GA since August 13, 2025 (no beta header)
- Cost savings: up to 90% cost reduction and 80% latency reduction on cached content
- Available on Claude API and Azure AI Foundry (preview)

**Web Search Tool** — GA February 17, 2026
- No beta header required
- Dynamic filtering (Opus 4.6 / Sonnet 4.6): uses code execution to pre-filter results before they enter context — reduces token cost and improves answer quality

**Web Fetch Tool** — GA February 17, 2026
- Retrieve full content from specified URLs and PDFs
- No beta header required

**Code Execution Tool v2** — GA February 17, 2026
- Bash command execution (not just Python)
- Direct file manipulation
- Free when used with web search or web fetch
- Sandboxed, secure environment

**Programmatic Tool Calling** — GA February 17, 2026
- Claude calls tools from within code execution
- Reduces latency and token usage in multi-tool workflows

**Tool Search Tool** — GA February 17, 2026
- Claude dynamically discovers and loads tools on-demand from large tool catalogs
- Lazy loading: identifies and activates only relevant tools based on context

**Memory Tool** — GA February 17, 2026
- Store and consult information across conversations
- No beta header required

**Files API** — Launched May 22, 2025
- Upload files once, reference them in Messages API and code execution
- Eliminates re-uploading the same assets across requests

**Compaction API** — Beta, February 5, 2026 (Opus 4.6)
- Server-side context summarization
- Enables effectively infinite conversations by compressing older context
- Client-side compaction also available in Python/TypeScript SDKs via `tool_runner`

**Agent Skills** — Launched October 16, 2025
- Organized folders of instructions, scripts, and resources Claude loads dynamically
- Anthropic-managed skills: PowerPoint (.pptx), Excel (.xlsx), Word (.docx), PDF
- Custom Skills API: upload domain expertise and org workflows at `/v1/skills`
- Requires code execution tool enabled

**Search Results / RAG Citations** — GA August 8, 2025
- Tools can return search results with source attribution
- Claude auto-cites sources in responses — matches web search citation quality
- Eliminates document workarounds in custom knowledge base applications

**Fine-Grained Tool Streaming** — GA February 5, 2026
- Stream tool use parameters without JSON buffering / validation
- Available on all models and platforms, no beta header

**Context Windows**
- 1M token context: GA for Opus 4.6 / Sonnet 4.6 at standard pricing (no beta header, no surcharge)
- Media limit raised from 100 to **600 images or PDF pages** per request at 1M context
- Standard rate limits now apply at all context lengths (dedicated 1M rate limits removed)

**Models API** — Updated March 18, 2026
- `GET /v1/models` now returns `max_input_tokens`, `max_tokens`, and a `capabilities` object per model
- Programmatically query what each model supports

**Data Residency** — February 5, 2026
- `inference_geo` parameter: specify where model inference runs
- US-only inference available at 1.1x pricing for models released after February 1, 2026

**OpenAI Compatibility Layer** — February 27, 2025
- Test Claude by changing only API key, base URL, and model name in existing OpenAI integrations
- Supports core chat completions

---

### 4. MCP — Model Context Protocol

**Governance / Foundation**
- December 9, 2025: Anthropic donated MCP to the **Agentic AI Foundation (AAIF)**, a directed fund under the Linux Foundation
- Co-founded by Anthropic, Block, and OpenAI — supported by Google, Microsoft, AWS, Cloudflare, Bloomberg
- MCP is now vendor-neutral, community-driven, and institutionally governed
- Joins `goose` (Block) and `AGENTS.md` (OpenAI) as founding AAIF projects

**MCP Connector** — API Integration (May 22, 2025)
- Connect to remote MCP servers directly from the Messages API
- No local server installation required

**Scale / Adoption**
- 97 million installs as of March 25, 2026
- 75+ official connectors in Anthropic's directory
- Tool Search + Programmatic Tool Calling optimize production-scale MCP deployments

**November 2025 Spec (2025-11-25)**
- Asynchronous operations
- Statelessness improvements
- Server identity
- Official extensions support
- Community-driven registry for discovering available MCP servers

**MCP Apps Extension (SEP-1865)** — November 21, 2025
- Joint spec with Anthropic and OpenAI
- Standardized interactive UI capabilities: HTML in sandboxed iframes, form inputs, visual information display
- Addresses most-requested MCP community feature

**Roadmap**
- Enterprise authentication (Q2 2026): OAuth 2.1 with PKCE, SAML/OIDC for enterprise identity providers
- Curated, verified server registry with security audits (Q4 2026)

---

### 5. Claude.ai Product Features

**Memory**
- Synthesizes "Memory Summary" from past interactions
- Categorizes into: Role & Work, Current Projects, Personal Content
- Long-term Project Memory: remembers architectural decisions and style preferences across sessions

**Projects**
- Organize conversations with persistent context and files
- Long-term project memory reduces need to re-upload context

**Claude.ai Consumer Plans**
- Free tier available
- Pro: $20/month (or ~$17/month billed annually)
- Max: $100/month (very high usage)

**Claude.ai Business / Team Plans**
- Team: $25/user/month (standard seats)
- Premium seats (includes Claude Code): $150/month

**Azure AI Foundry** — November 18, 2025
- Full Messages API on Azure: extended thinking, prompt caching (5-min and 1-hour), PDF support, Files API, Agent Skills, tool use
- Azure billing and OAuth authentication

**Platform / Console Rename** — September 16, 2025
- `console.anthropic.com` → `platform.claude.com` (fully redirected January 12, 2026)
- `docs.claude.com` and `support.claude.com` retained, unified under Claude brand

---

## Relevant to RV Park / Housing Agency Work

**Cost profile is now agency-viable at scale**
- Sonnet 4.6 at $3/$15 per MTok is the practical production model for most client automation work
- Haiku 4.5 at $1/$5 handles bulk tasks: content refreshes, metadata generation, listing descriptions
- Batch API at 50% discount makes nightly processing runs cheap enough for small RV park and housing clients

**1M context window changes what's possible**
- An entire WordPress site's worth of pages, copy, and schema can fit in a single request
- No more chunking client site audits across multiple calls

**Agent Skills for document workflows**
- Pre-built skills for Word (.docx), PDF, Excel (.xlsx) are directly relevant to RV park rate sheets, lease agreements, park maps, and housing disclosure documents

**Automatic Prompt Caching**
- System prompts, brand guides, and per-client instructions cached automatically
- Reduces per-request cost significantly for high-frequency API usage (e.g., page generation loops)

**Structured Outputs GA**
- Reliable JSON schema outputs mean more robust page builder integrations
- Block attribute generation for xpress-2 can be wired to a strict schema — fewer hallucinated attributes

**Web Search + Web Fetch GA**
- Competitor park / listing research can now be built into automated workflows
- Useful for SEO audits, market positioning, and pulling live data into page content

**Claude Code Agent Teams**
- Parallel agents for frontend/backend/test coverage matches the agency's multi-file WordPress build workflow
- Lead agent for planning + teammate agents for block registration, PHP classes, and SCSS — all in parallel

**MCP Connector in API**
- The xpress-2 MCP server can be called directly from the Messages API (no local server required on client's machine)
- Opens the door to remote, browser-triggered page builds for client self-service portals

**Memory Tool + Auto Memory (Claude Code)**
- Per-client memory reduces prompt overhead significantly
- Client brand guidelines, color tokens, preferred tone — stored once, retrieved automatically

---

## Sources

1. [Models Overview — Claude API Docs](https://platform.claude.com/docs/en/about-claude/models/overview) — Primary source for all model IDs, context windows, pricing, and capabilities table
2. [Claude Platform Release Notes](https://platform.claude.com/docs/en/release-notes/overview) — Complete dated changelog from 2024 through March 2026
3. [Claude API Pricing 2026 — metacto.com](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration) — Pricing tiers and breakdown for 2026 models
4. [Claude Code Changelog — claudefa.st](https://claudefa.st/blog/guide/changelog) — Claude Code update history and feature list
5. [Anthropic Release Notes April 2026 — Releasebot](https://releasebot.io/updates/anthropic) — April 2026 Claude Code hook events and recent fixes
6. [Claude Code Agent Teams Guide — code.claude.com](https://code.claude.com/docs/en/agent-teams) — Official docs on Agent Teams architecture, setup, and use cases
7. [Claude Code Multiple Agent Systems — eesel.ai](https://www.eesel.ai/blog/claude-code-multiple-agent-systems-complete-2026-guide) — 2026 guide to subagents vs. Agent Teams distinction
8. [Donating MCP to AAIF — Anthropic](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) — Primary source on MCP governance donation, founding members, Linux Foundation structure
9. [MCP Hits 97M Installs — AI Unfiltered](https://www.arturmarkus.com/anthropics-model-context-protocol-hits-97-million-installs-on-march-25-mcp-transitions-from-experimental-to-foundation-layer-for-agentic-ai/) — Adoption statistics and current MCP footprint
10. [Anthropic & OpenAI MCP Apps Extension — Inkeep](https://inkeep.com/blog/anthropic-openai-mcp-apps-extension) — SEP-1865 joint spec for interactive UI in MCP
11. [Claude Computer Use Agent 2026 — tech-insider.org](https://tech-insider.org/anthropic-claude-computer-use-agent-2026/) — Computer use evolution, Claude Code remote control context
12. [Claude Code: Computer Use and the Agentic Shift — andrewbaker.ninja](https://andrewbaker.ninja/2026/03/30/claude-code-computer-use-and-remote-control-the-agentic-shift-of-2026/) — March 2026 analysis of remote control and agentic shift
13. [Claude.ai Memory Feature — StartupHub.ai](https://www.startuphub.ai/ai-news/ai-video/2025/claudes-new-memory-feature-elevates-ai-personalization) — Memory synthesis behavior and category structure
14. [What's New in Claude 4.6 — Claude API Docs](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-6) — Official 4.6-specific feature notes
