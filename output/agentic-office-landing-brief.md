# Agentic Agency Landing Page — Project Brief
Date: 2026-04-02

---

## 1. Project Overview

**What:** A single static HTML landing page for "Agentic Agency" — a virtual 3D office environment built in Babylon.js where AI subagents visually animate as they work on real tasks delegated by a lead developer.

**Who:** Big Rig Media (we are the client). The lead developer is Anders. The product is the agentic-agency workspace itself — the 3D office, the subagent team, and the orchestration layer that ties it all together.

**Why:** No one else is marketing a visual, spatial AI agent workflow. OpenClaw Office and Agent Office exist as dev tools on GitHub but neither has a polished public-facing page. This is whitespace. The landing page establishes Agentic Agency as the reference example of what a multi-agent development workflow looks like when you can actually see it working.

**Format:** Single-page static HTML. Dark theme. Scroll-driven narrative. Embedded Babylon.js scene or high-quality looping video of the 3D office. No backend, no CMS — pure frontend artifact.

---

## 2. Target Audience Profiles

### Persona 1 — The Solo Agency Developer
- Runs a 1-3 person web shop, drowning in context-switching
- Already uses AI tools (Cursor, Claude, ChatGPT) but duct-tapes them together
- Wants to see how agents can be orchestrated, not just prompted
- Attracted by the visual proof — seeing agents work removes the "is this real?" skepticism
- Decision trigger: "I could build something like this for my workflow"

### Persona 2 — The Tech-Forward Agency Owner
- Runs a 5-20 person agency, evaluating AI adoption strategy
- Cares about efficiency metrics: hours saved, cost per deliverable, throughput
- Wants to see the system in action before committing engineering time
- Attracted by the team metaphor — agents with roles, not a single chatbot
- Decision trigger: "This could replace 2-3 contractor roles on repeatable work"

### Persona 3 — The Developer/Builder Audience
- Browses GitHub, follows AI tooling discourse, builds side projects
- Interested in the architecture: Babylon.js, Claude Code, MCP servers, subagent delegation
- Wants to understand how it works, not just what it does
- Attracted by the open/transparent approach — glass office, not black box
- Decision trigger: "I want to fork this" or "I want to see the code"

---

## 3. Page Sections (in scroll order)

### 3.1 Hero
**Goal:** Stop the scroll. Establish the concept in under 10 seconds. Show, don't tell.

- Dark background with embedded Babylon.js scene (or looping video fallback)
- The scene shows the full office: agents at workstations, one walking to the center table, ambient glow effects
- Pain-first headline: something in the territory of "Most AI tools are a black box. This one is a glass office."
- Single subline establishing what it is: "A 3D virtual agency where AI agents research, write, review, debug, and deliver — and you watch every step."
- One primary CTA: "Watch it work" (scrolls to workflow section or triggers demo)
- No competing secondary CTAs in the hero

### 3.2 The Problem
**Goal:** Validate the visitor's frustration. Create tension that the solution resolves.

- 3-4 short, sharp pain points:
  - "You paste into ChatGPT. Then copy into Cursor. Then manually review. Then do it again."
  - "AI tools are powerful in isolation. Useless as a team."
  - "You can't see what your AI is doing. You just wait and hope."
- Visual: dark, minimal. Could use a simple animation of disconnected tool icons or a fragmented workflow diagram.
- No CTA here — this section builds tension, the next section releases it.

### 3.3 The Solution — "The Office"
**Goal:** Reveal the product. Show the full workflow cycle.

- Scroll-triggered narrative showing the workflow in 4-5 phases:
  1. **Briefing** — Anders delegates a task. Agents gather at the center table.
  2. **Assignment** — Each agent receives their piece. They walk to their workstation.
  3. **Execution** — Agents glow while working. Status indicators show progress.
  4. **Delivery** — Agents return to the table with results. Output is assembled.
  5. **Review** — Lead developer reviews, approves, or sends back.
- Each phase gets a short heading + one-line description + visual (screenshot, render, or animated clip from the Babylon.js scene)
- This is the centerpiece of the page. Give it room to breathe.

### 3.4 The Team — Agent Roster
**Goal:** Make each agent feel real. Show breadth of capability.

- Card grid (2-3 columns desktop, single column mobile)
- Each card: agent avatar/icon, role name, one-line description, 2-3 example tasks
- Agents to feature:
  - **Researcher** — Pulls market data, competitor analysis, background research
  - **Copywriter** — Client-facing content, page copy, brand voice adherence
  - **SEO Analyst** — Keyword strategy, on-page audits, meta optimization
  - **Code Reviewer** — Security checks, best practices, pre-ship review
  - **Debugger** — Error diagnosis, stack trace analysis, fix recommendations
  - **Scaffolder** — Project setup, file structure, boilerplate generation
  - **Design Tokenizer** — Brand colors and fonts mapped to theme tokens
  - **Image Prompter** — AI image generation prompts for visual assets
  - **Email Writer** — Client-facing agency communications
  - **Client Onboarder** — Intake processing, project briefs, structured handoff
- Subtle glow or accent color per agent to differentiate roles
- Optional: hover state showing a sample output snippet for each agent

### 3.5 How It Works — Technical Architecture
**Goal:** Satisfy the builder persona. Show this is real engineering, not a demo.

- 3-4 key technical pillars:
  - **Babylon.js 3D Environment** — Real-time visualization, not a recording
  - **Claude Code Orchestration** — Lead developer delegates via structured prompts
  - **MCP Server Integration** — Agents connect directly to WordPress, GitHub, design tools
  - **Memory System** — Shared context across sessions, git-tracked, persistent
- Keep it concise — bullet points, not paragraphs. Link to deeper docs if available.

### 3.6 Proof / Metrics
**Goal:** Convert skeptics with concrete numbers.

- Internal benchmarks (even if early-stage):
  - "Full competitor research report in X minutes"
  - "10-page site copy generated in X minutes"
  - "Code review with security audit in X seconds"
- Before/after comparison: traditional agency workflow timeline vs. agentic office timeline
- If available: GitHub stars, task completion counts, beta user quotes
- Place proof near the claims they support — do not cluster at the bottom

### 3.7 FAQ
**Goal:** Capture long-tail SEO queries. Address objections.

- 5-7 questions targeting search intent:
  - "What is an AI agent team?"
  - "How do AI agents collaborate?"
  - "Is this a replacement for developers?"
  - "What tech stack does Agentic Agency use?"
  - "Can I use this for my own agency?"
  - "How does the 3D visualization work?"
- Use FAQPage schema markup for SEO
- Keep answers concise (2-3 sentences each)

### 3.8 Final CTA
**Goal:** Convert. Give the visitor a clear next step.

- Repeat the primary CTA with stronger framing: "See the office. Watch the agents. Judge the output."
- Dark section with a single glowing button
- Optional secondary link: "View on GitHub" or "Read the docs"

---

## 4. Copy Tone Notes

### Voice
- **Dark, technical, premium.** Think Cursor's confidence meets Linear's precision.
- **Declarative sentences.** Short. Direct. No filler.
- **Show the human in the loop.** Anders delegates. Anders reviews. Agents execute. The hierarchy is clear.
- **Concrete over abstract.** Name the agents. Name the tasks. Show the output.

### Words and phrases TO USE
- "Watch", "see", "observe" — reinforce the visual transparency angle
- "Delegate", "orchestrate", "coordinate" — implies human control
- "Glass office", "visible", "transparent" — counter the black-box narrative
- "Ship", "deliver", "output" — results-oriented language
- "Team", "roster", "crew" — agents are colleagues, not tools
- Agent role names as proper nouns — "the Researcher", "the Debugger"

### Words and phrases TO AVOID
- "Revolutionary", "game-changing", "disruptive" — empty hype
- "Autonomous", "fully automated" — triggers replacement anxiety
- "Magic", "effortless", "just works" — undermines credibility
- "AI-powered" as a standalone descriptor — meaningless without context
- "Chatbot", "assistant" — these agents are more than that
- "Replace", "eliminate" — always frame as augmentation

### Emotion to evoke
- Fascination first ("I want to watch this")
- Then credibility ("This is real engineering")
- Then aspiration ("I want to build with this")

---

## 5. Color & Design Direction

### Base Palette — Dark UI
- **Background:** Near-black (gray-950 / #0a0a0f or similar) — matches the Babylon.js scene void
- **Surface:** Dark gray (gray-900 / #111118) — card backgrounds, elevated surfaces
- **Border:** Subtle gray (gray-800 / #1e1e2a) — low-contrast dividers
- **Text primary:** Off-white (#e4e4e7) — high readability on dark
- **Text secondary:** Muted gray (#9ca3af) — supporting text, labels

### Agent Accent Colors
Each agent gets a signature glow color. These should match or derive from whatever colors are already used in the Babylon.js office scene. Suggested starting point:

| Agent | Accent Color | Hex (approx) |
|---|---|---|
| Lead Developer (Anders) | White/bright | #f0f0ff |
| Researcher | Blue | #3b82f6 |
| Copywriter | Emerald | #10b981 |
| SEO Analyst | Amber | #f59e0b |
| Code Reviewer | Purple | #8b5cf6 |
| Debugger | Red | #ef4444 |
| Scaffolder | Cyan | #06b6d4 |
| Design Tokenizer | Pink | #ec4899 |
| Image Prompter | Orange | #f97316 |
| Email Writer | Indigo | #6366f1 |
| Client Onboarder | Teal | #14b8a6 |

### CTA / Interactive Elements
- Primary CTA: Gradient or solid accent — likely a blue-to-purple gradient to match the AI/tech palette established by Flowise, Cursor, and others
- Hover states: Subtle glow effect, matching the agent glow aesthetic from the 3D scene
- Focus states: Visible ring for accessibility

### Typography Direction
- Large, bold headlines (text-5xl to text-7xl range) — modern sans-serif (Inter, Geist, or similar)
- Monospace accents for technical details (code snippets, agent names in context)
- Generous line-height on body text for readability on dark backgrounds

### Accessibility Notes
- All text must meet WCAG AA contrast against dark backgrounds (4.5:1 for body text, 3:1 for large text)
- Off-white on near-black passes easily; watch the muted gray secondary text (#9ca3af on #0a0a0f = ~6.5:1, passes)
- Agent accent colors used as text must be checked individually — some (amber, orange) may need lightened variants for text use
- Glow effects are decorative and do not need to meet contrast requirements, but interactive elements using accent colors do

---

## 6. Image / Visual Needs Per Section

### Hero
- **Babylon.js embed or looping video** of the full office scene — agents at stations, ambient movement, glow effects
- Video fallback required for mobile (WebGL performance)
- Format: WebM + MP4 for video; lazy-loaded Babylon.js canvas for desktop
- Aspect ratio: 16:9 or ultrawide (21:9) for cinematic feel

### The Problem
- Minimal — could be pure typography with subtle animated disconnection effect
- Optional: simple icon set showing fragmented tools (chat icon, code icon, clipboard icon) with visual breaks between them

### The Solution (Workflow)
- 4-5 screenshots or short clips from the Babylon.js scene, one per workflow phase:
  1. Agents gathered at center table (briefing)
  2. Agent walking to workstation (assignment)
  3. Agent glowing at desk (execution)
  4. Agent returning to table (delivery)
  5. Lead developer reviewing output (review)
- These can be captured from the existing 3D environment

### Agent Roster
- Avatar renders or icons for each of the 10 agents
- Could extract from Babylon.js scene or create simplified 2D versions
- Consistent style across all — same framing, same lighting, same crop

### How It Works
- Architecture diagram or flow chart showing: User -> Lead Dev -> Agent Delegation -> MCP Tools -> Output
- Could be a clean SVG with the agent accent colors

### Proof / Metrics
- Before/after timeline graphic (traditional vs. agentic)
- Metric callout blocks with large numbers

### FAQ
- No images needed — pure text section

### Final CTA
- Could reuse a dimmed/blurred version of the hero scene as background
- Single glowing CTA button

---

## 7. CTA Strategy

### Primary CTA — "Watch It Work"
- **Action:** Scrolls to the workflow section or opens a demo/video
- **Placement:** Hero (above fold), repeated after features section, final section
- **Rationale:** The product IS the visual experience. Getting people to watch is the conversion event. Lower friction than "sign up" or "book a demo" for a project at this stage.

### Secondary CTA — "View on GitHub"
- **Action:** Links to the public repo
- **Placement:** After the technical architecture section, footer
- **Rationale:** Satisfies the builder persona who wants to see code, not marketing. GitHub stars become organic social proof.

### Tertiary CTA — "Get in Touch" or "Work With Us"
- **Action:** Links to a contact form or email
- **Placement:** Footer only
- **Rationale:** For the agency owner persona who wants to hire the capability, not build it

### CTA Rules
- Never more than one CTA per viewport
- Primary CTA repeats 3 times (hero, mid-page, end)
- Sticky mobile CTA bar on scroll (appears after hero exits viewport)
- All CTAs use action verbs: "Watch", "View", "Build" — not "Learn more" or "Get started"

---

## 8. Open Questions / Decisions Needed

1. **Babylon.js embed vs. video-only?** Embedding the live 3D scene is the strongest differentiator but has performance and bundle-size implications. Do we ship a live embed on desktop with video fallback on mobile, or go video-only for v1?

2. **Is the GitHub repo public yet?** The "View on GitHub" CTA only works if the repo is public or will be by launch. If not, swap for "Join the waitlist" or "Follow the build."

3. **What metrics do we have?** The proof section needs real numbers. Do we have task completion times, agent throughput stats, or any beta usage data to reference? Even rough internal benchmarks work.

4. **Agent avatars — 3D renders or 2D?** The roster section needs visuals for each agent. Are we extracting renders from the Babylon.js scene, creating simplified 2D icons, or using a different approach?

5. **Domain and hosting?** Where does this page live? Is there a domain secured (agenticagency.com, agentic.agency, etc.)? Static hosting (Vercel, Netlify, GitHub Pages)?

6. **Scope of interactivity?** Research shows interactive demos convert at 12.3% vs. 4.7% for static. Is there appetite to build a mini interactive element (e.g., visitor clicks "delegate a task" and watches an agent respond) for v1, or is that v2?

7. **SEO priority?** This is a single landing page. Do we optimize aggressively for search (schema markup, meta tags, FAQ section, keyword density) or treat this as a portfolio/showcase piece shared via direct links?

8. **Copy — who writes it?** This brief defines tone and section goals. Do we want the copywriter subagent to draft all section copy next, or will it be written manually?

---

## 9. Recommended Next Steps

In this order:

1. **Resolve open questions** (decisions 1, 2, 5, 6 at minimum — these affect build scope)
2. **Run `copywriter`** — Draft all section copy based on this brief's tone notes and section goals
3. **Run `design-tokenizer`** — Formalize the color palette into a token system (CSS custom properties)
4. **Run `image-prompter`** — Generate prompts for any AI-generated visuals needed (agent avatars, architecture diagram, hero background elements)
5. **Build** — Scaffold the static HTML page, wire up styles, embed the Babylon.js scene or video, place the copy
6. **Run `seo-analyst`** — Audit the finished page for meta tags, schema markup, keyword coverage, and accessibility
7. **Run `code-reviewer`** — Final review before shipping

---

*Brief prepared by the Client Onboarder agent for the Agentic Agency landing page project.*
