# Agentic Agency Landing Page — SEO Audit
Date: 2026-04-02
Auditor: SEO Analyst Agent

---

## Pass / Fail Summary

| Element | Status | Notes |
|---|---|---|
| Page Title | FAIL | Missing primary keyword, uses em dash which wastes characters |
| Meta Description | PASS | Good length, includes CTA-like language, specific |
| OG Title | PASS | Stronger than the page title — consider swapping |
| OG Description | PASS | Good differentiation language, includes CTA |
| H1 (Hero Headline) | FAIL | No target keyword present; poetic but not searchable |
| H2 Structure | FAIL | Current copy uses vague section headers ("The duct-tape workflow", "The office") |
| H3 Structure | PASS | Agent names and feature titles are descriptive |
| Primary Keyword in First 100 Words | FAIL | "AI agent team" does not appear until well into the page |
| LSI / Secondary Keywords | PARTIAL | "3D" and "agents" appear throughout; "multi-agent", "agentic workflow", "AI development team" are missing from body copy |
| FAQ Section Present | PASS | 6 strong questions targeting long-tail queries |
| FAQ Schema Markup | NOT YET | Must be implemented in HTML — template provided below |
| LocalBusiness Schema | N/A | Not a local business page — use Organization + SoftwareApplication instead |
| Image Alt Text | NOT YET | Patterns recommended below |
| Canonical Tag | NOT YET | Must be implemented in HTML |
| OG Tags | PARTIAL | Title and description drafted; image, url, type still needed |
| Internal / Outbound Links | FAIL | No links defined in copy — GitHub, demo, contact all need hrefs |
| Word Count | PASS | ~1,800 words of body copy — strong for a single landing page |
| Content Structure / Crawl Order | PASS | Logical flow: problem > solution > proof > FAQ > CTA |

---

## Issues (Prioritized)

### Critical

**1. Page title missing primary keyword**
Current: `Agentic Agency -- Watch Your AI Team Work in 3D`
- "Agentic Agency" is not a searched term yet (zero brand awareness)
- Leading with brand name wastes the most valuable SEO real estate
- Em dash takes 3 characters; pipe takes 3 but reads cleaner in SERPs

**2. H1 has no keyword signal**
Current: `Your AI team works in the dark. This one works in glass.`
- Poetic and compelling for humans, but search engines get zero keyword signal
- "AI team", "AI agents", "3D office" — none present in the H1
- This is the single most important on-page ranking signal

**3. No structured data defined**
- No Organization, SoftwareApplication, or FAQPage schema in the build plan
- FAQPage schema alone can win featured snippets for "what is an AI agent team"

**4. No internal or outbound links in copy**
- GitHub repo link mentioned in CTA but not wired
- No link to a demo, documentation, or contact page
- Zero internal linking signals for crawlers

### Important

**5. Section H2s are creative but not descriptive**
- "The duct-tape workflow" — no keyword, no search intent match
- "The office" — too vague for an H2
- "Under the hood" — generic; does not signal "tech stack" or "architecture"

**6. Primary keyword absent from first 100 words**
- The hero headline and subhead do not contain "AI agent team" or "multi-agent"
- First 100 words should establish topical relevance for crawlers

**7. Missing LSI keywords in body copy**
These terms from the research appear zero times in the copy:
- "multi-agent platform"
- "agentic workflow"
- "AI automation"
- "AI development team"
- "autonomous AI team"
These should be woven into body paragraphs naturally.

**8. OG tags incomplete**
Missing:
- `og:image` — needs a 1200x630 social share image of the 3D office
- `og:url` — canonical URL
- `og:type` — should be `website`
- `twitter:card` — `summary_large_image`
- `twitter:title` and `twitter:description`

### Minor

**9. FAQ answers are slightly long**
- Some answers run 3-4 sentences. For FAQ schema, 2-3 concise sentences perform better in featured snippets. The tech stack answer is the longest — trim it.

**10. No explicit mention of "WordPress" or "web development agency" in visible copy**
- The page targets developers and agency owners but never names the verticals it serves
- One mention of "WordPress agency workflow" or "web development agency" would capture niche long-tail queries

**11. Alt CTA headlines not evaluated for SEO**
- "Not a chatbot. Not a copilot. A team." — strong copy, weak SEO
- "You have tried prompting. Try delegating." — strong copy, no keywords
- These are fine as A/B variants since the primary H1 should carry keyword weight

---

## Recommended Fixes

### Title Tag

**Before:**
```
Agentic Agency -- Watch Your AI Team Work in 3D
```

**After:**
```
AI Agent Team in a 3D Virtual Office | Agentic Agency
```
- 52 characters
- Primary keyword "AI Agent Team" leads
- "3D Virtual Office" captures secondary keyword
- Brand trails for recognition once awareness builds

**Alternative (if targeting "multi-agent"):**
```
Multi-Agent AI Team — Watch Them Work in 3D | Agentic Agency
```
- 60 characters, at the limit

### Meta Description

**Before:**
```
11 AI agents. One 3D office. Watch them research, write, review, debug, and ship -- in real time. Built with Babylon.js, Claude Code, and real engineering.
```

**After (minor tightening):**
```
11 AI agents. One 3D office. Watch them research, write, review, debug, and ship in real time. Built with Babylon.js and Claude Code. See the demo.
```
- 148 characters
- Added explicit CTA "See the demo"
- Removed "real engineering" (implied by tech names)
- Removed em dashes for cleaner SERP display

### H1 (Hero Headline)

**Before:**
```
Your AI team works in the dark. This one works in glass.
```

**After:**
```
An AI Agent Team That Works in a Glass Office
```
- Contains "AI Agent Team" (primary keyword)
- Retains the "glass office" metaphor from the brand voice
- Clear, scannable, and keyword-rich

**Note:** The original headline is excellent copy. Consider keeping it as a styled subheadline or tagline directly above the H1, rendered as a `<p>` or `<span>` so the H1 carries keyword weight while the creative line still leads visually.

### H2 Section Headers

| Section | Before | After |
|---|---|---|
| Problem | The duct-tape workflow | The Problem With Black-Box AI Tools |
| Solution | The office | How the AI Agent Team Works |
| Agent Roster | *(none — uses H3s directly)* | Meet the 11 AI Agents |
| Features | *(none — uses H3s directly)* | Features of the 3D AI Workspace |
| Technical | Under the hood | Technical Architecture |
| FAQ | *(none)* | Frequently Asked Questions |
| Final CTA | *(none)* | See the AI Agent Team in Action |

### First 100 Words — Keyword Insertion

Add "AI agent team" to the hero subhead:

**Before:**
```
11 specialized agents. One 3D office. They research, write, review, debug, and deliver -- and you watch every step.
```

**After:**
```
A full AI agent team — 11 specialists in one 3D virtual office. They research, write, review, debug, and deliver while you watch every step.
```

### Body Copy — LSI Keyword Insertions

These are surgical additions, not rewrites:

**Problem section, Pain Point 2 body — add "multi-agent" and "agentic workflow":**

Before:
> Every AI tool you use is a silo. Your researcher does not talk to your copywriter. Your debugger does not know what your scaffolder built. You are the glue -- and you are stretched thin.

After:
> Every AI tool you use is a silo. Your researcher does not talk to your copywriter. Your debugger does not know what your scaffolder built. There is no agentic workflow — just you as the glue, stretched thin.

**Solution section subhead — add "multi-agent":**

Before:
> One task in. Finished work out. Everything visible in between.

After:
> One task in. Finished work out. A multi-agent system where everything is visible in between.

**Features section, "Structured Delegation" body — add "AI development team":**

Before:
> Every task flows through the lead developer. Anders breaks work into pieces, assigns the right agent, and reviews the output. The hierarchy is clear. The chain of responsibility is visible.

After:
> Every task flows through the lead developer — the way a real AI development team should work. Anders breaks work into pieces, assigns the right agent, and reviews the output. The hierarchy is clear. The chain of responsibility is visible.

**Technical section intro — add "AI automation agency":**

Add a one-line intro paragraph before the tech bullets:
> This is the stack behind an AI automation agency that runs in your browser.

---

## Heading Hierarchy (Full Page)

```
<h1>An AI Agent Team That Works in a Glass Office</h1>

<h2>The Problem With Black-Box AI Tools</h2>
  <h3>Copy. Paste. Pray.</h3>
  <h3>Powerful Alone. Useless Together.</h3>
  <h3>You Cannot See What It Is Doing.</h3>

<h2>How the AI Agent Team Works</h2>
  <h3>Briefing</h3>
  <h3>Assignment</h3>
  <h3>Execution</h3>
  <h3>Delivery</h3>

<h2>Meet the 11 AI Agents</h2>
  <h3>Anders — Lead Developer</h3>
  <h3>Researcher</h3>
  <h3>Copywriter</h3>
  <h3>SEO Analyst</h3>
  <h3>Client Onboarder</h3>
  <h3>Email Writer</h3>
  <h3>Design Tokenizer</h3>
  <h3>Image Prompter</h3>
  <h3>Code Reviewer</h3>
  <h3>Scaffolder</h3>
  <h3>Debugger</h3>

<h2>Features of the 3D AI Workspace</h2>
  <h3>Real-Time 3D Visualization</h3>
  <h3>Dynamic Speech and Thought Bubbles</h3>
  <h3>Task-Aware Behavior</h3>
  <h3>Parallel Workflows</h3>
  <h3>Structured Delegation</h3>
  <h3>Persistent Memory</h3>

<h2>Technical Architecture</h2>
  <h3>Babylon.js 3D Engine</h3>
  <h3>Claude Code Orchestration</h3>
  <h3>Server-Sent Events (SSE)</h3>
  <h3>Vite + Vanilla JS</h3>
  <h3>MCP Server Integration</h3>

<h2>Frequently Asked Questions</h2>

<h2>See the AI Agent Team in Action</h2>
```

---

## Schema Markup Templates

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Agentic Agency",
  "url": "https://agenticagency.com",
  "logo": "https://agenticagency.com/images/logo.png",
  "description": "A 3D virtual office where 11 AI agents research, write, review, debug, and deliver — visualized in real time with Babylon.js and Claude Code.",
  "founder": {
    "@type": "Person",
    "name": "Anders"
  },
  "sameAs": [
    "https://github.com/xdrew760x/agentic-agency"
  ]
}
```

### SoftwareApplication Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Agentic Agency",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "description": "A multi-agent AI development team working in a 3D virtual office. 11 specialized agents handle research, copywriting, SEO, code review, debugging, and more — orchestrated by a lead developer and visualized in real time.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Real-time 3D visualization of AI agent workflows",
    "11 specialized AI agents with defined roles",
    "Claude Code orchestration with subagent delegation",
    "Server-Sent Events for live activity streaming",
    "MCP server integration for WordPress and GitHub",
    "Persistent git-tracked memory across sessions"
  ],
  "screenshot": "https://agenticagency.com/images/office-screenshot.png",
  "softwareRequirements": "Modern web browser with WebGL support"
}
```

### FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this a real working system or a concept demo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is real. The 3D office visualizes actual Claude Code subagent sessions. When a researcher agent is spawned in the terminal, the Researcher avatar walks to their desk, glows, and surfaces real dialogue. The visualization layer is driven by live events, not pre-recorded animations."
      }
    },
    {
      "@type": "Question",
      "name": "What is an AI agent team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A group of specialized AI instances — each with a defined role, tools, and scope — coordinated by a lead agent or human operator. Instead of one general-purpose chatbot, you get a researcher, a copywriter, a debugger, and eight other specialists, each doing what they are built for."
      }
    },
    {
      "@type": "Question",
      "name": "Does this replace developers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Anders, the lead developer, delegates every task and reviews every deliverable. Agents handle execution — research, first drafts, audits, scaffolding. The human sets strategy, makes judgment calls, and decides what ships."
      }
    },
    {
      "@type": "Question",
      "name": "What tech stack powers this?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Babylon.js for 3D rendering, Claude Code (Opus 4) for agent orchestration, a Node.js SSE server for real-time event streaming, Vite for the frontend build, and MCP servers for WordPress and GitHub integration."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this for my own agency or workflow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The architecture is modular. The agent definitions, event server, and 3D visualization are separate layers. If you run Claude Code with subagents and session hooks, you can wire up the same event-driven visualization for your own team structure."
      }
    },
    {
      "@type": "Question",
      "name": "How does the 3D visualization stay in sync with agent activity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Code session hooks emit events on task start, agent spawn, speech, and completion. These hit a local SSE server which pushes them to the browser. The Babylon.js scene translates each event into agent movement, glow states, and dialogue bubbles with under 100ms latency."
      }
    }
  ]
}
```

---

## Internal and Outbound Linking Opportunities

| Link Text | Destination | Placement |
|---|---|---|
| Watch It Work | #workflow section or /demo | Hero CTA, Final CTA |
| View on GitHub | https://github.com/xdrew760x/agentic-agency | Final CTA secondary, Technical section |
| Claude Code | https://docs.anthropic.com/en/docs/claude-code | Technical section, FAQ |
| Babylon.js | https://www.babylonjs.com/ | Technical section |
| Model Context Protocol | https://modelcontextprotocol.io/ | Technical section, MCP mention |
| Big Rig Media | https://bigrigmedia.com (if public) | Footer, "Built by" credit |
| Contact / Work With Us | /contact or mailto: | Footer tertiary CTA |

These outbound links to authoritative sources (Anthropic docs, Babylon.js) signal topical authority to search engines. The GitHub link serves double duty as social proof and a crawlable resource.

---

## Niche SEO Signals for "AI Development Agency" / "AI Agent Team"

This page is not a local business, so traditional local SEO (GBP, NAP consistency) does not apply. Instead, focus on **niche authority signals**:

1. **Topical entity associations** — Mention Claude Code, Babylon.js, MCP, Vite, and Node.js by name. Search engines build entity graphs; associating "Agentic Agency" with known technical entities builds topical authority.

2. **"AI agent team" as a definable concept** — The FAQ answer for "What is an AI agent team?" is well-written and quotable. This has featured snippet potential. Keep it concise and lead with the definition.

3. **GitHub as a ranking signal** — A public repo with a README linking back to the landing page creates a high-authority backlink. GitHub repos rank well for developer queries.

4. **GEO (Generative Engine Optimization)** — AI search engines (Perplexity, Google AI Overviews) favor:
   - Clear definitions (the FAQ provides these)
   - Structured data (schema markup above)
   - Concrete specifics over vague claims (agent count, tech stack names, latency numbers)
   - The copy already does this well

5. **Content gap opportunity** — No competitor has a polished page targeting "AI agent team visualization" or "3D AI agent workspace." Publishing first with strong on-page SEO can own these terms.

---

## Technical SEO Checklist for HTML Build

### Head Section — Required

```html
<!-- Canonical -->
<link rel="canonical" href="https://agenticagency.com/" />

<!-- Title -->
<title>AI Agent Team in a 3D Virtual Office | Agentic Agency</title>

<!-- Meta -->
<meta name="description" content="11 AI agents. One 3D office. Watch them research, write, review, debug, and ship in real time. Built with Babylon.js and Claude Code. See the demo." />
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="A 3D Virtual Office Where AI Agents Ship Real Work" />
<meta property="og:description" content="Not a chatbot. Not a prompt. A full AI development team you can watch collaborate in a real-time 3D office. Delegate a task. Watch it get done." />
<meta property="og:image" content="https://agenticagency.com/images/og-share.png" />
<meta property="og:url" content="https://agenticagency.com/" />
<meta property="og:site_name" content="Agentic Agency" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="AI Agent Team in a 3D Virtual Office | Agentic Agency" />
<meta name="twitter:description" content="11 AI agents. One 3D office. Watch them research, write, review, debug, and ship in real time." />
<meta name="twitter:image" content="https://agenticagency.com/images/og-share.png" />

<!-- Schema (JSON-LD) -->
<script type="application/ld+json">
  <!-- Organization, SoftwareApplication, FAQPage schemas from above -->
</script>
```

### Image Alt Text Patterns

| Image Context | Alt Text Pattern |
|---|---|
| Hero 3D scene / video | "AI agents working in a 3D virtual office built with Babylon.js" |
| Briefing phase | "AI agent team gathering at the center table for a task briefing" |
| Agent at workstation | "[Agent Name] agent glowing while working at their desk in the 3D office" |
| Agent walking | "AI agent walking to their workstation after receiving a task assignment" |
| Delivery phase | "AI agents returning to the center table with completed deliverables" |
| Agent roster card | "[Role] AI agent — [one-line description of function]" |
| Architecture diagram | "Technical architecture diagram showing Babylon.js, Claude Code, SSE server, and MCP integration" |
| OG share image | "Agentic Agency — 11 AI agents in a 3D virtual office" |

### Performance Hints

- **Lazy-load the Babylon.js canvas** — use `loading="lazy"` on the canvas container or defer initialization until the hero enters viewport
- **Video fallback for mobile** — serve WebM (smaller) with MP4 fallback; use `<video>` with `preload="metadata"` not `preload="auto"`
- **Defer non-critical JS** — Babylon.js engine script should use `defer` or dynamic import
- **Preload critical fonts** — `<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>`
- **Compress images** — all screenshots/renders in WebP with PNG fallback
- **Minify HTML/CSS/JS** — Vite handles this in production build
- **Add `<link rel="dns-prefetch">` for external domains** (GitHub, CDNs)

### Accessibility (SEO-Adjacent)

- All images must have `alt` attributes (see patterns above)
- CTA buttons need `aria-label` if text is ambiguous
- Color contrast: verify agent accent colors against dark backgrounds (amber #f59e0b on #0a0a0f = 8.2:1, passes)
- Skip-to-content link for keyboard navigation
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>` — helps crawlers understand page structure

---

## Summary of Priority Actions

1. **Change the title tag** to lead with "AI Agent Team" keyword
2. **Rewrite the H1** to include primary keyword while keeping the creative line as a visual subhead
3. **Rename all H2s** to be descriptive and keyword-bearing
4. **Insert primary keyword in the first 100 words** (hero subhead edit)
5. **Add LSI keywords** to 3-4 body paragraphs (surgical edits provided above)
6. **Implement all three schema blocks** (Organization, SoftwareApplication, FAQPage)
7. **Add canonical, OG, and Twitter Card tags** to the HTML head
8. **Wire all links** — GitHub, Anthropic docs, Babylon.js, demo anchor, contact
9. **Create OG share image** at 1200x630 showing the 3D office scene
10. **Write alt text** for every image using the patterns above

---

*Audit prepared by the SEO Analyst agent for the Agentic Agency landing page project.*
