# Claude Latest Features — Research Report
Date: 2026-03-31

## Executive Summary
- Anthropic has had an extremely active Q1 2026 — 14+ launches in March alone
- Claude Opus 4.6 and Sonnet 4.6 are the current flagship models, both with 1M token context windows
- Computer use on macOS launched in research preview March 23, 2026 — Claude can now control a desktop
- A new, more powerful model called **Claude Mythos** has been confirmed and is in development

---

## Background
Anthropic has accelerated its release cadence dramatically entering 2026, shipping major model upgrades, new products (Claude Cowork, Claude Marketplace, Claude Dispatch), and expanding Claude's agentic capabilities well beyond chat. The Claude 4.x family (Opus 4.6, Sonnet 4.6, Haiku 4.5) represents the current production lineup.

---

## Key Findings

### Models
- **Claude Opus 4.6** (Feb 2026)
  - 1M token context window
  - 14.5-hour task completion time horizon — longest of any AI model
  - #1 on Finance Agent benchmark
  - Up to 128k output tokens
  - Default model in Claude Code
- **Claude Sonnet 4.6** (Feb 2026)
  - 1M token context window (beta)
  - Improved agentic search with lower token consumption
  - Up to 64k output tokens
  - Best balance of speed + capability
- **Claude Haiku 4.5** — fastest/cheapest tier, 64k output tokens
- **Claude Mythos** (in training, not yet released)
  - Described by Anthropic as "by far the most powerful model we've ever developed"
  - "Step change" in reasoning, coding, and cybersecurity
  - Existence confirmed after a data leak in March 2026
- **Claude 5 / Sonnet 5 ("Fennec")** — spotted in Google Vertex AI logs, expected mid-2026
  - Reported "Dev Team" multi-agent mode with coordinated specialized agents
  - Pricing expected ~50% lower than current flagships

### Claude Code Updates (March 2026)
- **Voice Mode** — push-to-talk via spacebar (`/voice`), 20 languages supported
- **1M token context window** — available on Max/Team/Enterprise plans
- **/loop** — schedule recurring software tasks on a cron-like interval
- **Computer Use** — Claude can control your Mac (open apps, click, navigate, fill forms); Pro/Max plans only
- **Auto Mode** — AI safety classifier auto-approves routine dev actions
- **Claude Code Channels** — control Claude Code from Discord and Telegram
- **MCP Tool Elicitation** — MCP servers can request structured input via interactive forms mid-execution
- **Session naming** — `claude -n "session name"` at startup

### Agentic Platform
- **Computer Use Agent** (March 23, 2026) — research preview; macOS only currently; requires Pro ($20/mo) or Max ($100-200/mo)
- **Claude Dispatch** — persistent agent thread in Cowork; assign tasks from phone, Claude completes on Mac
- **Agent Teams** — multiple Claude agents working in parallel on different parts of a task, coordinating directly
- **Claude Cowork** — GUI-based coding/agent tool for non-technical users (launched Jan 2026)
- **Claude Marketplace** (March 6, 2026) — consolidated billing across 6 partner tools
- **Claude Code Security** (Feb 2026) — automated codebase vulnerability scanning

### API & Developer Features
- **Adaptive thinking / `effort` parameter** — replaces `budget_tokens`; Claude dynamically calibrates thinking depth based on query complexity
- **Extended thinking + tool use** — interleaved thinking between tool calls for more sophisticated reasoning
- **Web search & web fetch GA** — no longer require beta headers
- **Dynamic filtering** — code execution filters search/fetch results before hitting context (free when used with web search/fetch)
- **Compaction API (beta)** — server-side context summarization for effectively infinite conversations (Opus 4.6)
- **`thinking.display: "omitted"`** — faster streaming by stripping thinking blocks from responses
- **Interactive visualizations** — Claude can generate inline charts, diagrams, and mobile interactive apps

### Safety & Governance
- Constitutional AI document expanded to 23,000 words (up from 2,700 in 2023)
- Computer use requires explicit permission before accessing new apps
- Auto Mode uses a safety classifier to gatekeep actions in Claude Code

---

## Notable Perspectives / Debates
- **Anthropic's pace vs. stability**: March 2026 saw 14+ launches but also 5 service outages — raising questions about reliability at this release velocity
- **Computer use risks**: Giving Claude desktop control is powerful but controversial; security researchers are watching closely for prompt injection via screen content
- **Claude Mythos leak**: Anthropic didn't announce the model — it was revealed via a data leak, sparking debate about pre-announcement transparency in AI development

---

## Implications / Takeaways
- **For web devs**: Claude Code is maturing into a full agentic coding environment — voice, computer use, scheduling, and channels make it a persistent dev collaborator, not just a chat assistant
- **For AI builders**: The `effort` parameter, compaction API, and free code execution with web tools materially reduce cost and complexity for agentic app development
- **Platform strategy**: Anthropic is building a full ecosystem (Marketplace, Dispatch, Cowork, Channels) — positioning Claude as an OS-level agent, not just an API
- **Upcoming**: Claude Mythos and Claude 5 suggest another major capability jump in mid-2026; plan for model migration

---

## Sources
1. [Claude AI 2026: Models, Features, Desktop & More](https://www.buildfastwithai.com/blogs/claude-ai-complete-guide-2026) — broad 2026 feature overview
2. [Anthropic's Explosive Start to 2026 — Medium](https://fazal-sec.medium.com/anthropics-explosive-start-to-2026-everything-claude-has-launched-and-why-it-s-shaking-up-the-668788c2c9de) — Q1 2026 launch roundup
3. [Exclusive: Anthropic 'Mythos' — Fortune](https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/) — Claude Mythos confirmation
4. [Introducing Claude Opus 4.6 — PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/anthropic-announces-new-version-claude-opus-next-step-enterprise-ai-development/) — Opus 4.6 enterprise details
5. [Introducing Claude Sonnet 4.6 — Anthropic](https://www.anthropic.com/news/claude-sonnet-4-6) — official Sonnet 4.6 announcement
6. [What's new in Claude 4.6 — API Docs](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-6) — official API changelog
7. [Models Overview — Claude API Docs](https://platform.claude.com/docs/en/about-claude/models/overview) — current model specs
8. [Claude Code March 2026 Updates — builder.io](https://www.builder.io/blog/claude-code-updates) — Claude Code feature breakdown
9. [Claude Code March 2026 — pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/381/claude-code-march-2026-updates) — /loop, voice mode details
10. [Anthropic Computer Use Agent — CNBC](https://www.cnbc.com/2026/03/24/anthropic-claude-ai-agent-use-computer-finish-tasks.html) — computer use launch coverage
11. [Auto Mode, Cowork Desktop Control — Winbuzzer](https://winbuzzer.com/2026/03/25/anthropic-claude-code-cowork-auto-mode-computer-use-xcxwbn/) — auto mode & Cowork updates
12. [Anthropic's Madcap March — The New Stack](https://thenewstack.io/anthropic-march-2026-roundup/) — full March 2026 roundup including outages
13. [Adaptive Reasoning & Extended Thinking — MarkTechPost](https://www.marktechpost.com/2026/02/05/anthropic-releases-claude-opus-4-6-with-1m-context-agentic-coding-adaptive-reasoning-controls-and-expanded-safety-tooling-capabilities/) — Opus 4.6 technical details
14. [Anthropic Release Notes — Releasebot](https://releasebot.io/updates/anthropic) — rolling release notes aggregator
15. [Claude Platform API Release Notes](https://platform.claude.com/docs/en/release-notes/overview) — official API changelog
