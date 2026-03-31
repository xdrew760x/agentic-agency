# Agency AI Workspace

This is the AI agent workspace for our web agency. It powers an AI lead developer (Claude) backed by a team of specialized subagents — built for delivering WordPress sites to RV park and housing clients using the xpress-2 theme.

---

## How to Use Me

Talk to me like a lead developer on your team. Tell me what you need done and I'll figure out which agents to involve, show you a plan, and execute it.

### Starting a New Client Project
```
"Start a new client project for [Client Name] — they run an RV park in [City]"
```
I'll run the full onboarding chain: intake → design tokens → project scaffold → CLAUDE.md

### Connecting to a WordPress Site
```
"Connect to [client] site"
```
I'll walk you through setting up the xpress-2 MCP server credentials so I can push pages directly to WordPress.

### Building a WordPress Site
```
"Build the [client] site"
"Populate the site"
"Push pages to WordPress"
```
I'll chain the copywriter, SEO analyst, and image prompter — then push all pages directly to WordPress as drafts using the xpress-2 MCP server. You review and publish when ready.

### Editing an Existing Page
```
"Edit the home page on [client] site"
"Update the rates page — new pricing is X"
"Rewrite the about section"
```
I'll read the current page, make surgical edits, and push the update. I'll always show you what will change before applying.

### Writing Copy
```
"Write the home page copy for [Client Name]"
"Rewrite the amenities page for [Client]"
```
I'll delegate to the copywriter subagent and review the output before giving it to you.

### Researching a Topic
```
"Research [topic]"
```
I'll ask if you want parallel instances for speed, plan the sub-topics, delegate to the researcher, and synthesize a report.

### Reviewing Code
```
"Review this code before it ships"
"Do a security review of inc/class-ai-page-generator.php"
```
I'll delegate to the code-reviewer and give you a prioritized issues list.

### Debugging Something Broken
```
"The rates block isn't rendering on the front end"
"Getting a fatal error on the contact page"
```
I'll delegate to the debugger for systematic diagnosis and return a root cause + fix.

### SEO Audit
```
"Audit the home page for SEO"
"Check the rates page for local SEO signals"
```
I'll delegate to the seo-analyst and return a pass/fail audit with exact fixes.

### Writing Client Emails
```
"Write a project update email for [Client Name]"
"Draft a delivery email for the [Client] site launch"
```
I'll delegate to the email-writer and return a ready-to-send draft.

### Generating Image Prompts
```
"Generate image prompts for the [Client] hero section"
"I need campground lifestyle photos for [Client]"
```
I'll delegate to the image-prompter and return ready-to-paste prompts for Midjourney/DALL-E.

---

## Agent Team

| Agent | Role |
|---|---|
| **Lead Developer (me)** | Architecture, code, decisions, coordination |
| `client-onboarder` | Intake → structured project brief |
| `design-tokenizer` | Brand colors → xpress-2 theme.json + Tailwind tokens |
| `scaffolder` | WordPress project setup using xpress-2 theme |
| `copywriter` | All client-facing web content |
| `seo-analyst` | On-page SEO audits, local SEO, schema markup |
| `image-prompter` | AI image generation prompts |
| `code-reviewer` | Security, quality, WordPress + xpress-2 conventions |
| `debugger` | Diagnoses broken functionality |
| `email-writer` | Client-facing agency emails |
| `researcher` | Web research, market analysis, source gathering |

---

## Workflows

Workflows are recipes in `workflows/` that I follow automatically when triggered.

| Workflow | Trigger phrase |
|---|---|
| `new-client.md` | "new client", "start a project for" |
| `wordpress-connect.md` | "connect to [client] site", "switch to [client]" |
| `wordpress-build.md` | "build the site", "push pages", "populate the site" |
| `wordpress-edit.md` | "edit [page]", "update [page]", "change the [section]" |
| `research.md` | "research [topic]" |
| `code-review.md` | "review this code", "do a code review" |
| `write-copy.md` | "write copy for", "write the [page] page" |
| `debug.md` | "something is broken", "debug", "getting an error" |

---

## xpress-2 MCP Server

When connected to a client's WordPress site, I can directly:
- Read all existing pages and media
- Create new pages with full xpress-2 block markup
- Edit existing pages surgically
- Read site colors, fonts, and theme options

All pages are created as **drafts** — you always review before publishing.

**Setup:** Each client needs a `.env` file in `mcp-server/` with their WordPress credentials. Run `"connect to [client] site"` and I'll walk you through it.

---

## Parallel Instances

For research and other multi-part tasks, I can spawn parallel instances — temporary Claude processes that each handle one sub-topic simultaneously and report back to me. I'll always ask before doing this. These are faster but use more tokens.

---

## Project Structure

```
.claude/
  agents/          — subagent definitions (the team)
workflows/         — recipes I follow automatically
output/            — all finished deliverables
resources/         — templates and reference docs
memory.md          — shared memory, updated after every significant session
CLAUDE.md          — my core instructions (lead developer config)
README.md          — this file
```

---

## Stack

- **Theme:** xpress-2 (github.com/xdrew760x/xpress-2)
- **WordPress:** 6.6+, PHP 8.1+
- **Frontend:** React/Gutenberg, Tailwind v4, SCSS, webpack
- **MCP:** xpress-2 MCP server — direct WordPress page creation and editing
- **Clients:** RV parks / campgrounds, housing / real estate
