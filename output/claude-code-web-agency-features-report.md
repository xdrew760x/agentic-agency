# Claude Code for Web Agency Automation — Research Report
Date: 2026-03-31

---

## Executive Summary

- Claude Code is Anthropic's terminal-based agentic coding CLI — it reads entire codebases, writes files, runs commands, and iterates autonomously until tasks are complete
- Key agency-relevant capabilities: multi-file code generation, large-scale refactoring, test running/debugging, GitHub Actions automation, and parallel multi-agent sessions via worktrees
- The MCP (Model Context Protocol) ecosystem now has thousands of integrations — giving Claude Code native connections to GitHub, databases, design tools, and more
- Agent Teams + Git Worktrees (added 2025) enable 10–15 parallel Claude sessions without file conflicts — the single biggest team productivity unlock

---

## Background

Claude Code launched in early 2024, went into public release in 2025, and by mid-2025 had 80%+ of Anthropic's own engineers using it daily. It generated $500M+ ARR by late 2025. The tool is built on a deliberately minimal philosophy: expose the model as directly as possible with minimal scaffolding, rather than wrapping it in rigid menus or UI constraints.

It runs in the terminal and integrates natively with VS Code, JetBrains IDEs, the Claude desktop app, and any browser. The current default model is Claude Sonnet 4.6.

---

## Key Findings

### 1. Agentic Core — Autonomous Multi-Step Execution

- Claude Code does not just suggest code — it executes: reads files, writes edits, runs terminal commands, checks output, and iterates in a loop until the task is done
- The model uses **agentic search** to map project structure, import chains, and type hierarchies without you manually providing context files
- **Plan Mode**: Start sessions in plan mode — Claude drafts a step-by-step plan for review before writing any code. Best practice: have one Claude draft the plan, a second review it as a "staff engineer," then approve before execution
- **Extended Thinking** (formerly "Ultrathink"): Now automatically enabled for Claude Opus 4.6 and Sonnet 4.6, with a default budget of 31,999 thinking tokens. The model dynamically allocates reasoning depth based on task complexity. Use prompts like "think hard" or "think" to guide reasoning depth
- **Background Tasks**: Long-running processes (dev servers, log watchers) can run in the background via `Ctrl+B` without blocking the main session

**Agency use case:** Hand off entire feature tickets end-to-end — Claude reads the issue, writes the code, runs the tests, and opens the PR.

---

### 2. Code Generation & Project Scaffolding

- Claude generates components that match your existing project patterns by reading `CLAUDE.md`, design system docs, and similar components in your repo — not generic boilerplate
- **CLAUDE.md** is the "constitution" for every session: a ~100-line file (≈2,500 tokens) checked into git that defines project conventions, file patterns, stack details, and prohibited behaviors. Every session reads it automatically
- On project init, Claude can analyze your codebase and auto-generate a `CLAUDE.md` capturing detected patterns and conventions
- Handles full-stack generation: API routes, database schemas, auth flows, responsive layouts, dark mode, design tokens — with one natural language instruction
- **Project Templates** (via `claudefa.st` and community tools): Claude Code supports structured project scaffolding templates for rapid onboarding of new client projects
- Skills (`.claude/skills/<name>/SKILL.md`) are markdown recipes that extend Claude's capabilities for specific tasks — e.g., a "scaffold-component" skill that generates your agency's component pattern on demand via `/scaffold-component`

**Agency use case:** New client project kickoff — run Claude to scaffold the repo structure, generate `CLAUDE.md`, stub routes and DB schema, and commit the initial boilerplate in one session.

---

### 3. Refactoring & Codebase Understanding

- Claude Code can process and refactor **multiple files simultaneously** in a single pass, maintaining consistency across imports, types, and call sites
- Especially effective on legacy code: analyzes existing patterns, identifies improvement areas, implements changes across the codebase while preserving original functionality
- Used with **Aider** for large-scale refactors: Claude Code handles planning and high-level coordination, Aider handles line-level edits in tight loops
- Common workflow: "explain this codebase to me" → Claude maps the architecture → then "refactor the auth module to use JWT" → Claude makes all needed cross-file changes
- The **Refactoring Specialist subagent** (community pattern from `awesome-claude-code-subagents`) runs dedicated refactoring passes against a codebase with specific quality rules

**Agency use case:** Inherited a messy legacy client codebase? Claude Code maps it, proposes a refactor plan, then executes across 50+ files in minutes — not days.

---

### 4. Test Running & Debugging

- Claude Code runs your test suite directly from the terminal (e.g., `npm test`, `pytest`, `phpunit`) and interprets the output to diagnose failures and apply fixes in a loop
- Use `!npm test` prefix in a prompt to run commands inline, or Claude will automatically run tests after writing code to verify its work
- **Debugging workflow**: Ask Claude to add comprehensive logging → paste terminal output back → Claude identifies the root cause and patches it — iterating until the error resolves
- Claude traces execution paths across files, understands async flows, and spots subtle cross-component bugs that are hard to catch manually
- **Hooks** (`PostToolUse` events) can auto-trigger your test suite after every code change, or run a linter before every commit — without any manual intervention
  - Example hook: after any file write → run `eslint` → block the commit if errors are found

**Agency use case:** Set a `PostToolUse` hook to run your test suite automatically every time Claude writes a file. You get a self-testing agent loop with zero manual test runs.

---

### 5. Hooks, Subagents & Parallel Agent Teams

- **Hooks** fire at key lifecycle points: `PreToolUse` (validate before a tool runs), `PostToolUse` (react after), subagent start/stop, agent idle, execution finished
  - Use `PreToolUse` to block dangerous operations; `PostToolUse` to trigger linting, tests, or logging
- **Custom Subagents** (`.claude/agents/`): Create specialized agents with their own prompts, tool restrictions, permission modes, and skills — e.g., a "frontend-agent" that only touches `src/components/` or a "database-agent" limited to schema files
- **Agent Teams** (released 2025): One lead session coordinates a team of parallel Claude instances, each working in its own git worktree (separate branch + working directory — no file conflicts)
  - Typical setup: 3–5 teammate agents per lead; 5–6 tasks per teammate
  - Each teammate spawns in 20–30 seconds; produces first results within 1 minute
  - Teams use 3–4x the tokens of a sequential session, but dramatically reduce wall-clock time on complex tasks
  - Real-world benchmark: 16 Claude agents built a C compiler across ~2,000 sessions consuming ~2B tokens for under $20,000 — producing a compiler that could build a bootable Linux kernel
- **Worktrees** (built-in since Claude Code v2.1.50): Each agent gets its own worktree so 10–15 sessions run in parallel without conflicting. Now available in both CLI and Desktop app
- Move tasks to background with `Ctrl+B`; resume named sessions with `claude --resume session-name`

**Agency use case:** Assign a separate Claude agent to frontend, backend, tests, and documentation simultaneously. All work in isolation, then merge — turning a 2-day feature into a 2-hour one.

---

### 6. GitHub Actions & Git Automation

- **`claude-code-action`** (GitHub): Official Anthropic GitHub Action for PR and issue automation — launched September 29, 2025 (Claude Code 2.0 release)
  - Trigger: `@claude` mentions in any PR comment or issue
  - Capabilities: analyze diffs, post code review comments, implement requested changes, open new PRs, update documentation
- **Common automation patterns:**
  - Automated code review on every PR open/update
  - Issue-to-PR: mention `@claude` in an issue → Claude reads it, implements the feature, opens a PR
  - Auto-documentation updates when code changes land
  - CI/CD pipeline integration via GitHub Actions YAML
- Setup: Run `/install-github-app` inside a Claude Code session — walks through GitHub App setup and secrets
- Supports Anthropic API, Amazon Bedrock, Google Vertex AI, and Microsoft Foundry for auth
- Full git workflow support: read issues → write code → run tests → commit → push → open PR — all from a single Claude Code session in the terminal

**Agency use case:** Route all client bug reports as GitHub issues → `@claude` auto-implements fixes and opens PRs for your team to review. Near-zero developer time for routine maintenance tickets.

---

### 7. MCP (Model Context Protocol) Integrations

- MCP is an open standard (launched by Anthropic November 2024) now adopted as the de-facto industry standard for connecting AI agents to external tools
- Thousands of MCP servers now exist across the community; SDKs available for all major languages
- Claude Code connects to MCP servers via config — giving it access to databases, APIs, and dev tools natively
- **Key MCP integrations for web agencies:**
  - GitHub / GitLab: read PRs, create issues, push commits
  - Figma MCP: read design files, extract tokens and component specs directly into code
  - HubSpot MCP: read/write CRM data (client project management)
  - Database tools: direct query access for schema inspection and data work
  - JIRA / Linear: read and update tickets as part of coding workflows
- **Tool Search** optimization: Only tool names load at session start — full tool definitions are fetched on demand. Adding more MCP servers does not bloat the context window
- Self-hosted or cloud MCP servers both supported

**Agency use case:** Connect Claude Code to your Figma account — it reads the design file and generates component code matching the exact design tokens without copy-pasting specs manually.

---

### 8. Slash Commands & Custom Skills (Agency Workflow Automation)

- **Slash commands** (`/command-name`) are explicit, repeatable entry points stored in `.claude/skills/<name>/SKILL.md`
- **Skills** auto-invoke when Claude detects the task matches — without manual triggering
- Each skill file has: YAML frontmatter (trigger conditions, allowed tools, subagent assignment) + markdown instructions
- Skills live in project root (`.claude/skills/`) for project-specific use, or `~/.claude/skills/` for global use across all projects
- Example agency skills:
  - `/scaffold-component` — generates a React component matching the project's design system
  - `/write-tests` — generates unit + integration tests for any file passed to it
  - `/code-review` — runs a structured review against your agency's standards
  - `/deploy-check` — pre-deployment checklist run before any production push
- Skills checked into git are **shared across the entire team** — everyone gets the same AI workflow without training each person individually

**Agency use case:** Build a `/new-client-project` skill that scaffolds the full project, installs dependencies, writes CLAUDE.md, creates GitHub repo, and pushes first commit — run once per new client.

---

## Notable Perspectives / Debates

- **Cost vs. time trade-off with Agent Teams**: Teams of agents use 3–4x more tokens than sequential sessions. For agencies on tight margins, the speed gain needs to offset the API cost — most report it does for complex tasks, but single-file changes don't warrant it
- **Context window management is still the main constraint**: Every file read, command output, and message eats context. Subagents help by spawning fresh context windows, but sessions still need to be managed (use `/compact` to compress, start fresh sessions for new task domains)
- **UltraThink deprecation**: Some power users report quality degradation since the explicit `ultrathink` keyword was removed in favor of automatic extended thinking — an active GitHub issue (#19098) on the Claude Code repo. Anthropic's position is that automatic allocation is better, but not everyone agrees
- **Autonomous mode trust**: The more autonomous Claude runs, the more important `PreToolUse` hooks and a well-tuned `CLAUDE.md` become. Agencies should invest in these guardrails before deploying agents autonomously on client repos

---

## Implications / Takeaways

- **Immediate wins for agencies**: CLAUDE.md (shared across team, free, instant), GitHub Actions (`@claude` on issues/PRs), and Hooks for auto-testing are the highest-ROI starting points — require no architectural changes
- **Medium-term investment**: Build a library of custom Skills for your agency's recurring patterns (component scaffolding, test generation, code review). This is your agency's proprietary AI workflow layer
- **Parallel agents are the multiplier**: Agent Teams + Worktrees turn one developer into a multi-stream pipeline. Most useful for large feature builds, not small fixes
- **MCP is the integration layer**: Connect Claude Code to the tools your agency already uses (Figma, GitHub, HubSpot, databases) rather than switching workflows. MCP means Claude meets you where your work already is
- **Power user benchmark**: Agencies combining CLAUDE.md + Skills + Hooks + Agent Teams report 20–40% productivity boosts. The 16-agent compiler case study shows what's possible at the extreme end
- **Recommend starting path**: (1) Install Claude Code, write CLAUDE.md, (2) add one `/scaffold-component` skill, (3) install GitHub Action for PR automation, (4) add PostToolUse hook for auto-linting — then expand from there

---

## Sources

1. [Claude Code Docs — Overview](https://code.claude.com/docs/en/overview) — Official feature reference and architecture overview
2. [Claude Code Product Page — Anthropic](https://claude.com/product/claude-code) — Feature list and IDE integrations
3. [GitHub — anthropics/claude-code](https://github.com/anthropics/claude-code) — Source repo, changelog, and community issues
4. [Enabling Claude Code to Work More Autonomously — Anthropic](https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously) — Official post on autonomous capabilities and checkpointing
5. [Claude Code Best Practices — Simon Willison](https://simonwillison.net/2025/Apr/19/claude-code-best-practices/) — Synthesis of Anthropic's published best practices guide
6. [How Claude Code Is Built — Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built) — Deep dive on architecture and internal design philosophy
7. [Claude Code Handbook — freeCodeCamp](https://www.freecodecamp.org/news/claude-code-handbook/) — Practical professional introduction with real examples
8. [Claude Code Common Workflows — Official Docs](https://code.claude.com/docs/en/common-workflows) — Refactoring, testing, debugging workflow patterns
9. [Claude Code MCP Docs — Official](https://code.claude.com/docs/en/mcp) — MCP setup, server types, and tool search
10. [Claude Code GitHub Actions — Official Docs](https://code.claude.com/docs/en/github-actions) — PR automation setup and trigger patterns
11. [Claude Code Subagents — Official Docs](https://code.claude.com/docs/en/sub-agents) — Custom subagent creation and configuration
12. [Claude Code Agent Teams — Official Docs](https://code.claude.com/docs/en/agent-teams) — Multi-agent parallel session orchestration
13. [Claude Code Skills — Official Docs](https://code.claude.com/docs/en/skills) — Skill file format, invocation, and YAML frontmatter
14. [50 Claude Code Tips — Builder.io](https://www.builder.io/blog/claude-code-tips-best-practices) — Power user tips with real-world workflow patterns
15. [Claude Code Hidden Features — Sidetool](https://www.sidetool.co/post/claude-code-hidden-features-15-secrets-productivity-2025/) — Underdocumented features and productivity shortcuts
16. [Using Claude Code and Aider for Large Refactors — Codenotary](https://codenotary.com/blog/using-claude-code-and-aider-to-refactor-large-projects-enhancing-maintainability-and-scalability) — Real-world large codebase refactoring case study
17. [Claude Code Worktrees Guide — Claudefa.st](https://claudefa.st/blog/guide/development/worktree-guide) — Built-in git worktree usage for parallel agents
18. [Built-in Worktree Support Announcement — Boris Cherny (Anthropic)](https://www.threads.com/@boris_cherny/post/DVAAnexgRUj/) — Official announcement of CLI worktree support
