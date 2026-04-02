# Agentic Agency — AI Development Workspace

An AI-powered lead developer workspace for building WordPress sites for RV park and housing clients. Powered by Claude Code + a team of 11 specialized AI agents, orchestrated through a persistent memory system, automated workflows, and a **real-time 3D virtual office**.

---

## What This Is

This repo is the **agency brain** — not a client project. It contains:
- The lead developer agent configuration (`CLAUDE.md`)
- A team of 10 specialized subagents (`.claude/agents/`)
- Workflow recipes that execute automatically (`workflows/`)
- Shared memory that persists across sessions (`memory/`)
- Output folder for all deliverables (`output/`)
- Reference templates (`resources/`)
- A **3D virtual office** built with Babylon.js where you can watch agents work in real time (`output/office/`)
- A **landing page** showcasing the entire system (`output/agentic-office-landing/`)

Client projects are **separate repos**, each scaffolded by this workspace with their own `memory/` folder that builds up context over time.

---

## 3D Virtual Office

The office is a Babylon.js scene that visualizes agent activity in real time. When you delegate a task in Claude Code, the corresponding avatar animates:

- **Pre-task briefing** — Anders (lead dev) and the assigned agent walk to the center table, exchange task-specific dialogue, then the agent heads to their workstation
- **Working state** — Agents glow at their desks with speech bubbles showing what they're doing
- **Reporting back** — When done, agents walk to a hallway waypoint, deliver their report, and Anders acknowledges
- **Dynamic dialogue** — All lines are randomized and interpolated with the actual task description. No two interactions sound the same.
- **Team Feed** — A live sidebar logs every thought, speech line, and action with timestamps

### Rooms
| Room | Agents |
|---|---|
| Command Center | Anders (Lead Developer) |
| Research & Copy | Researcher, Copywriter, SEO Analyst, Client Onboarder, Email Writer |
| Design Room | Design Tokenizer, Image Prompter |
| Testing Room | Code Reviewer, Scaffolder, Debugger |

### Running the Office
The office starts automatically when you open Claude Code in this repo (via `SessionStart` hook). To run it manually:

```bash
cd output/office
npm install        # first time only
npm run dev        # Vite on port 5173
node event-server.js  # SSE server on port 4001
```

Open `http://localhost:5173` — or `http://<your-ip>:5173` for LAN access.

### Landing Page
A static HTML page showcasing the system lives at `output/agentic-office-landing/index.html`. It embeds the live 3D office in the hero section. Serve it on your network:

```bash
cd output/agentic-office-landing
python3 -m http.server 8080 --bind 0.0.0.0
```

Then visit `http://<your-ip>:8080`.

---

## Requirements

- [Claude Code](https://claude.ai/code) — CLI or desktop app
- An Anthropic account with Claude access
- Node.js + npm (for xpress-2 theme builds)
- WordPress 6.6+ with PHP 8.1+ (for client sites)
- xpress-2 theme: [github.com/xdrew760x/xpress-2](https://github.com/xdrew760x/xpress-2)

---

## Getting Started

### 1. Clone this repo
```bash
git clone https://github.com/xdrew760x/agentic-agency.git
cd agentic-agency
```

### 2. Open in Claude Code
```bash
claude
```

Claude will display the welcome screen and read the `memory/` folder automatically. You're ready.

### 3. Start with a command
Tell the lead developer what you need:
```
"Start a project for [Client Name] — they run an RV park in [City, State]"
```

---

## How to Talk to the Lead Developer

No special syntax needed. Just describe what you want done. The lead developer matches your request to the right workflow and subagents automatically.

**Before spawning any subagent**, the lead developer will tell you which agent it plans to use and why — and wait for your approval before proceeding.

---

## Commands & Trigger Phrases

### Start a New Client Project
```
"Start a project for [Client Name]"
"Onboard [Client Name] — RV park in [City]"
```
Runs the full onboarding chain: intake → project brief → design tokens → WordPress scaffold → `memory/` setup.

### Connect to a WordPress Site
```
"Connect to [client] site"
"Set up MCP for [client]"
```
Walks through setting up the xpress-2 MCP server `.env` so the lead developer can push pages directly to WordPress.

### Build a Site
```
"Build the [client] site"
"Populate the site"
"Push pages to WordPress"
```
Chains copywriter → SEO analyst → image prompter → pushes all pages to WordPress as **drafts**. You review and publish.

### Edit a Page
```
"Edit the home page on [client] site"
"Update the rates page — new pricing is [X]"
"Rewrite the about section"
```
Reads the current page, makes surgical edits, shows you the diff before applying.

### Write Copy
```
"Write the home page copy for [Client]"
"Rewrite the amenities page for [Client]"
```
Delegates to the copywriter, optionally runs an SEO pass, delivers reviewed copy.

### Research a Topic
```
"Research [topic]"
```
Delegates to the researcher agent. Returns a structured report saved to `output/`.

### Review Code
```
"Review this code before it ships"
"Do a security review of [file]"
```
Delegates to the code-reviewer. Returns a prioritized issues list covering security, quality, and xpress-2 conventions.

### Debug Something Broken
```
"Something is broken"
"Getting a fatal error on [X]"
"The [block] isn't rendering"
```
Delegates to the debugger for systematic root cause diagnosis.

### SEO Audit
```
"Audit the home page for SEO"
"Check the rates page for local SEO signals"
```
Delegates to the seo-analyst. Returns a pass/fail audit with exact title, meta, heading, and schema fixes.

### Write a Client Email
```
"Write a project update email for [Client]"
"Draft a delivery email for the [Client] site launch"
```
Delegates to the email-writer. Returns a polished, ready-to-send draft.

### Generate Image Prompts
```
"Generate image prompts for the [Client] hero"
"I need campground lifestyle photos for [Client]"
```
Delegates to the image-prompter. Returns ready-to-paste prompts for Midjourney, DALL-E, or Firefly.

---

## Agent Team

| Agent | What it does |
|---|---|
| **Lead Developer** | Architecture, code, decisions, orchestration — always in the lead |
| `client-onboarder` | Turns raw intake into a structured project brief + CLAUDE.md draft |
| `design-tokenizer` | Maps brand colors/fonts to xpress-2 theme.json + Tailwind v4 tokens |
| `scaffolder` | Sets up new WordPress client projects using xpress-2 |
| `copywriter` | Writes all client-facing web content |
| `seo-analyst` | On-page SEO audits, local SEO signals, schema markup |
| `image-prompter` | AI image generation prompts for heroes, amenities, listings |
| `code-reviewer` | Security, quality, and convention audit before code ships |
| `debugger` | Systematic diagnosis of broken functionality |
| `email-writer` | Client-facing agency emails |
| `researcher` | Web research, market analysis, competitive intel |

---

## Memory System

Memory is **project-scoped and git-tracked**. Each project (this workspace and every client repo) has its own `memory/` folder that the lead developer reads at session start and updates after significant work.

```
memory/
  index.md       — index of all memory files
  clients.md     — active and past clients
  decisions.md   — key technical and creative decisions + rationale
  research.md    — research findings and pointers to output/ reports
  preferences.md — working style and delegation preferences
  pending.md     — deferred work and open questions
```

When you clone this to a new machine or hand it to a new developer, memory comes with it.

---

## Project Structure

```
.claude/
  agents/                        — subagent definitions (the team)
workflows/                       — recipes the lead developer follows automatically
output/                          — all finished deliverables
  office/                        — 3D virtual office (Babylon.js + Vite)
    src/                         — scene, avatars, behaviors, event client
    hooks/                       — Claude Code hooks (pre/post tool use, session)
    event-server.js              — SSE server for real-time agent events
  agentic-office-landing/        — static landing page with live office embed
  [topic]-report.md              — research reports
  [client]-[page]-copy.md        — copy deliverables
resources/                       — templates and reference docs
memory/                          — shared memory, git-tracked and transferable
CLAUDE.md                        — lead developer configuration and rules
README.md                        — this file
```

---

## xpress-2 MCP Server

When connected, the lead developer can read and write WordPress pages directly — no manual copy/paste.

- Pages are always created as **drafts** — you review before publishing
- The lead developer reads block schemas before building markup — never guesses attribute names
- Each client has their own `.env` in `mcp-server/` with `WP_URL`, `WP_USER`, `WP_APP_PASSWORD`

---

## Stack

| Layer | Technology |
|---|---|
| Theme | xpress-2 — Gutenberg blocks, PHP 8.1+, WordPress 6.6+ |
| Frontend | React/Gutenberg, Tailwind v4, SCSS, webpack |
| 3D Office | Babylon.js, Vite, SSE (Server-Sent Events) |
| MCP | xpress-2 MCP server — direct WordPress page I/O |
| AI | Claude (Opus 4.6 / Sonnet 4.6 / Haiku 4.5) via Claude Code |
| Clients | RV parks / campgrounds, housing / real estate |

---

## Architecture

```
You (human) ──► Claude Code (Lead Dev / Anders)
                    │
                    ├── PreToolUse hook ──► event-server (SSE) ──► 3D Office (browser)
                    │
                    ├── Agent: researcher
                    ├── Agent: copywriter
                    ├── Agent: seo-analyst
                    ├── Agent: client-onboarder
                    ├── Agent: email-writer
                    ├── Agent: design-tokenizer
                    ├── Agent: image-prompter
                    ├── Agent: code-reviewer
                    ├── Agent: scaffolder
                    └── Agent: debugger
                    │
                    ├── PostToolUse hook ──► event-server (SSE) ──► 3D Office (browser)
                    │
                    └── Output ──► output/ (reports, copy, audits, briefs, landing page)
```
