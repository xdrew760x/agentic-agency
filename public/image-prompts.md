# Agentic Agency Landing Page — Image Prompts
Date: 2026-04-02

---

## Color Reference (from agentData.js)

| Agent | Hex | Role |
|---|---|---|
| Anders | #3B82F6 | Lead Developer |
| Researcher | #F59E0B | Researcher |
| Copywriter | #10B981 | Copywriter |
| SEO Analyst | #14B8A6 | SEO Analyst |
| Client Onboarder | #EAB308 | Client Onboarder |
| Email Writer | #38BDF8 | Email Writer |
| Design Tokenizer | #A855F7 | Design Tokenizer |
| Image Prompter | #EC4899 | Image Prompter |
| Code Reviewer | #EF4444 | Code Reviewer |
| Scaffolder | #F97316 | Scaffolder |
| Debugger | #DC2626 | Debugger |

---

## 1. Hero Image / Background

### Primary Prompt
**Tool:** Midjourney v6
**Aspect Ratio:** 21:9 (ultrawide cinematic)

```
Cinematic wide-angle overhead view of a dark minimalist 3D virtual office environment, four connected rooms visible from above at a slight angle, near-black floor (#0a0a0f) with subtle grid lines, 11 glowing pill-shaped avatars in distinct neon colors (blue, amber, emerald, teal, yellow, sky blue, purple, pink, red, orange, crimson) positioned at workstations, soft volumetric light emanating from each avatar casting colored reflections on the dark floor, ambient fog, one avatar walking between rooms leaving a faint light trail, translucent glass walls separating rooms, floating holographic speech bubbles with blurred text, moody cyberpunk office atmosphere, dark UI aesthetic, Unreal Engine quality rendering, ray-traced lighting, depth of field with sharp center and soft edges --ar 21:9 --s 750 --style raw
```

**Negative Prompt:**
```
--no bright room lighting, white walls, daylight, realistic humans, text, watermark, cartoon style, cluttered desk items, windows showing outside, cheerful colors, flat lighting
```

### Variation A — Tighter angle, more atmospheric
**Tool:** Midjourney v6
**Aspect Ratio:** 16:9

```
Low-angle cinematic view through a dark 3D virtual office, camera at floor level looking across a polished black reflective floor, glowing pill-shaped avatars visible in the distance at workstations, neon blue and amber light reflecting off the floor surface, volumetric fog catching colored light beams, glass partition walls with subtle edge glow, a single bright blue avatar (Anders) standing near a round table in the center room, moody dark tech environment, Blade Runner 2049 lighting aesthetic, anamorphic lens flare, shallow depth of field --ar 16:9 --s 750 --style raw
```

### Variation B — Abstract gradient (video-first fallback)
**Tool:** DALL-E 3
**Aspect Ratio:** 16:9

```
Abstract dark gradient background for a tech landing page hero section. Deep navy black (#0a0a0f) base transitioning to subtle colored light pools — blue (#3B82F6), amber (#F59E0B), emerald (#10B981), and purple (#A855F7) — arranged as soft unfocused orbs suggesting workstations in a dark room. Faint geometric grid overlay. No text. No objects. Pure atmospheric color on darkness. Suitable as a background behind white headline text.
```

**Alt Text Suggestion:** Cinematic overhead view of a dark virtual office environment with 11 glowing AI agent avatars at workstations across four connected rooms, each emitting a distinct colored light.

---

## 2. How It Works — Step Illustrations

### Step 1: Briefing (Agents gather at center table)
**Tool:** Midjourney v6
**Aspect Ratio:** 4:3

```
Top-down view of a round table in a dark minimalist 3D room, five glowing pill-shaped avatars gathered around the table — one bright blue avatar at the head position, four others in amber, emerald, teal, and yellow arranged around the table, each avatar casting a soft colored glow on the dark table surface, small floating speech bubble above the blue avatar with blurred text, dark near-black environment (#0a0a0f), subtle ambient fog, glass walls visible in background, holographic briefing aesthetic, volumetric lighting, clean 3D render style --ar 4:3 --s 600 --style raw
```

**Negative Prompt:**
```
--no realistic humans, chairs, paper documents, bright overhead lights, white room, cartoon characters
```

**Alt Text:** Five glowing AI agent avatars gathered around a round briefing table in a dark virtual office, with the lead developer avatar in blue addressing the team.

### Step 2: Assignment (Agent walking to workstation)
**Tool:** Midjourney v6
**Aspect Ratio:** 4:3

```
Side view inside a dark 3D virtual office corridor, a single glowing amber pill-shaped avatar walking along a dark reflective floor toward a workstation desk in the distance, the avatar leaving a subtle warm light trail behind it, glass partition walls on both sides with faint edge glow, dark environment with minimal ambient light, the destination desk has a soft glow indicating it is the avatar's assigned station, motion blur suggesting purposeful movement, cinematic lighting, volumetric fog, clean 3D render --ar 4:3 --s 600 --style raw
```

**Negative Prompt:**
```
--no realistic person, bright hallway, office furniture clutter, daylight, multiple avatars
```

**Alt Text:** A glowing amber AI agent avatar walking through a dark office corridor toward its assigned workstation, leaving a faint light trail.

### Step 3: Execution (Agent working at desk, glowing)
**Tool:** Midjourney v6
**Aspect Ratio:** 4:3

```
Close-up view of a single glowing emerald green pill-shaped avatar seated at a minimalist dark desk in a 3D virtual office, the avatar pulsing with bright green light indicating active work state, floating holographic speech bubble beside the avatar showing blurred lines of text representing thought process, small holographic data fragments orbiting the avatar, the desk surface reflecting green light, dark near-black environment, ambient particle effects, concentrated focused energy aesthetic, clean 3D render, volumetric glow --ar 4:3 --s 600 --style raw
```

**Negative Prompt:**
```
--no monitor screen, keyboard, realistic hands, bright room, multiple agents, cartoon style
```

**Alt Text:** A glowing emerald AI agent avatar actively working at a dark desk, surrounded by floating speech bubbles showing its real-time reasoning process.

### Step 4: Delivery (Agent reporting back to Anders)
**Tool:** Midjourney v6
**Aspect Ratio:** 4:3

```
Two glowing pill-shaped avatars facing each other at a round table in a dark 3D virtual office — one bright blue (lead developer) and one amber (researcher) — the amber avatar has a small floating holographic document icon above it representing a completed deliverable being handed over, soft colored light from both avatars mixing on the dark table surface creating a warm glow intersection, dark environment, glass walls in background, completion and handoff moment, clean 3D render, volumetric lighting --ar 4:3 --s 600 --style raw
```

**Negative Prompt:**
```
--no paper documents, handshake, realistic humans, bright office, multiple avatars beyond two
```

**Alt Text:** An amber agent avatar presenting a completed deliverable to the blue lead developer avatar at the center table, their glows merging on the dark surface.

---

## 3. Agent Roster Cards (11 Individual Portraits)

All agent portraits follow a consistent template. Each is a centered portrait of a single pill-shaped glowing avatar against a dark background, with the agent's signature color as the dominant glow.

**Tool:** Midjourney v6
**Aspect Ratio:** 1:1 (square, for card layout)
**Consistent style suffix for all:**
```
, centered composition, dark near-black background (#0a0a0f), soft radial glow behind the avatar, minimal environment, clean 3D render, portrait framing, no text --ar 1:1 --s 500 --style raw
```

**Negative prompt for all:**
```
--no realistic human face, text, label, logo, bright background, multiple subjects, busy background
```

### Anders — Lead Developer (#3B82F6)
```
Single glowing blue (#3B82F6) pill-shaped 3D avatar, bright confident glow, subtle holographic command interface floating beside it suggesting leadership and control, faint connecting lines radiating outward to suggest delegation to other agents [consistent style suffix]
```
**Alt Text:** Blue glowing avatar representing Anders, the lead developer who coordinates all AI agents.

### Researcher (#F59E0B)
```
Single glowing amber (#F59E0B) pill-shaped 3D avatar, warm golden glow, small floating holographic data charts and magnifying glass icon orbiting the avatar suggesting research and analysis [consistent style suffix]
```
**Alt Text:** Amber glowing avatar representing the Researcher agent, specialized in market data and competitor analysis.

### Copywriter (#10B981)
```
Single glowing emerald green (#10B981) pill-shaped 3D avatar, vibrant green glow, small floating holographic text lines and paragraph blocks orbiting the avatar suggesting content writing [consistent style suffix]
```
**Alt Text:** Emerald glowing avatar representing the Copywriter agent, specialized in client-facing web content.

### SEO Analyst (#14B8A6)
```
Single glowing teal (#14B8A6) pill-shaped 3D avatar, cool teal glow, small floating holographic search bar icon and upward-trending graph orbiting the avatar suggesting search optimization [consistent style suffix]
```
**Alt Text:** Teal glowing avatar representing the SEO Analyst agent, specialized in keyword strategy and on-page optimization.

### Client Onboarder (#EAB308)
```
Single glowing yellow (#EAB308) pill-shaped 3D avatar, warm yellow glow, small floating holographic clipboard and checklist icons orbiting the avatar suggesting intake and project briefing [consistent style suffix]
```
**Alt Text:** Yellow glowing avatar representing the Client Onboarder agent, specialized in turning client intake into structured project briefs.

### Email Writer (#38BDF8)
```
Single glowing sky blue (#38BDF8) pill-shaped 3D avatar, bright sky blue glow, small floating holographic envelope and message icons orbiting the avatar suggesting email communication [consistent style suffix]
```
**Alt Text:** Sky blue glowing avatar representing the Email Writer agent, specialized in professional client communications.

### Design Tokenizer (#A855F7)
```
Single glowing purple (#A855F7) pill-shaped 3D avatar, rich purple glow, small floating holographic color swatches and typography specimens orbiting the avatar suggesting brand-to-code translation [consistent style suffix]
```
**Alt Text:** Purple glowing avatar representing the Design Tokenizer agent, specialized in mapping brand assets to theme tokens.

### Image Prompter (#EC4899)
```
Single glowing pink (#EC4899) pill-shaped 3D avatar, vibrant pink glow, small floating holographic image frames and camera icons orbiting the avatar suggesting visual asset generation [consistent style suffix]
```
**Alt Text:** Pink glowing avatar representing the Image Prompter agent, specialized in AI image generation prompts.

### Code Reviewer (#EF4444)
```
Single glowing red (#EF4444) pill-shaped 3D avatar, sharp red glow, small floating holographic code brackets and checkmark icon orbiting the avatar suggesting code audit and approval [consistent style suffix]
```
**Alt Text:** Red glowing avatar representing the Code Reviewer agent, specialized in security checks and code quality audits.

### Scaffolder (#F97316)
```
Single glowing orange (#F97316) pill-shaped 3D avatar, warm orange glow, small floating holographic folder tree structure and build icon orbiting the avatar suggesting project setup and scaffolding [consistent style suffix]
```
**Alt Text:** Orange glowing avatar representing the Scaffolder agent, specialized in WordPress project setup and boilerplate generation.

### Debugger (#DC2626)
```
Single glowing crimson red (#DC2626) pill-shaped 3D avatar, intense deep red glow, small floating holographic bug icon and terminal log lines orbiting the avatar suggesting error diagnosis and debugging [consistent style suffix]
```
**Alt Text:** Crimson glowing avatar representing the Debugger agent, specialized in error diagnosis and root cause analysis.

---

## 4. Feature Section Visuals

### Real-Time 3D Visualization
**Tool:** Midjourney v6
**Aspect Ratio:** 16:9

```
Wide establishing shot of a fully rendered dark 3D virtual office with four rooms visible, 11 glowing pill-shaped avatars in distinct colors positioned throughout the space, some at desks glowing brightly (working state), two walking between rooms, one gathered at a center table, glass partition walls catching colored light reflections, real-time visualization feel with subtle motion blur on moving avatars, dark near-black environment, volumetric fog, god rays from avatar glow, cinematic 3D render quality, clean geometric architecture --ar 16:9 --s 700 --style raw
```

**Negative Prompt:**
```
--no realistic people, bright room, daylight, UI overlay, text labels, screenshot border
```

**Alt Text:** Wide view of the complete 3D virtual office showing all four rooms with glowing AI agent avatars at various states of activity — working, walking, and meeting.

### Dynamic Speech and Dialogue
**Tool:** Midjourney v6
**Aspect Ratio:** 16:9

```
Close-up of three glowing pill-shaped avatars at desks in a dark 3D virtual office, each with a floating translucent speech bubble above them containing blurred text lines, the speech bubbles glow softly matching each avatar's color — amber, emerald, and teal — creating a visual dialogue network, thin glowing connection lines between the bubbles suggesting information flow, dark environment, holographic UI aesthetic, thought visualization concept, clean 3D render --ar 16:9 --s 700 --style raw
```

**Negative Prompt:**
```
--no readable text, comic book style, realistic faces, bright background, chat interface UI
```

**Alt Text:** Three AI agent avatars at their workstations with glowing speech bubbles showing real-time reasoning, connected by faint light trails indicating information flow.

### Parallel Workflows
**Tool:** Midjourney v6
**Aspect Ratio:** 16:9

```
Split composition showing two separate rooms in a dark 3D virtual office, left side shows two avatars (emerald and teal) glowing at adjacent desks working simultaneously in the content room, right side shows two avatars (red and orange) in the testing room also both glowing and active, thin horizontal timeline bar at the bottom edge glowing white suggesting concurrent progress, glass walls between rooms, all four avatars working at the same moment, dark environment, parallel processing visual metaphor, clean 3D render, volumetric glow --ar 16:9 --s 700 --style raw
```

**Negative Prompt:**
```
--no single avatar, sequential layout, arrows, flowchart, bright background, UI elements
```

**Alt Text:** Split view of two office rooms showing four AI agents working simultaneously on different tasks, illustrating parallel workflow execution.

### Structured Delegation (Architecture flow)
**Tool:** DALL-E 3
**Aspect Ratio:** 16:9

```
Minimalist dark technical diagram showing a delegation hierarchy. At the top center, a bright blue glowing circle labeled with a subtle glow. Below it, five thin glowing lines branch downward to five smaller colored circles (amber, emerald, purple, red, orange) arranged in a horizontal row. Below each colored circle, a single thin line drops to a small icon representing a tool (globe, document, palette, terminal, wrench). Dark near-black background (#0a0a0f). Clean geometric style. No text. Neon glow on dark. Tech diagram aesthetic matching Cursor or Linear design language.
```

**Negative Prompt:** Avoid text labels, white background, corporate clip art, 3D perspective, busy details, gradient backgrounds.

**Alt Text:** Technical diagram showing the delegation hierarchy from the lead developer to specialized AI agents, each connected to their respective tools.

---

## 5. OG / Social Share Image

### Primary Prompt
**Tool:** DALL-E 3
**Aspect Ratio:** Exactly 1200x630px (specify in tool)

```
Dark social share card image, 1200x630 pixels. Near-black background (#0a0a0f) with a subtle overhead silhouette of a four-room office floor plan rendered as faint glowing grid lines in dark gray (#1e1e2a). Eleven small colored dots arranged within the floor plan matching agent positions — blue, amber, emerald, teal, yellow, sky blue, purple, pink, red, orange, crimson — each with a soft radial glow. The overall effect is a constellation of colored lights on a dark surface suggesting an active virtual workspace. Leave generous empty space in the upper-left quadrant for text overlay. No text in the image. Clean, premium, dark tech aesthetic.
```

**Negative Prompt:** Avoid text, logos, watermarks, bright backgrounds, realistic office furniture, 3D perspective view, busy details.

**Text Overlay (to be added in post-production):**
- Title: "Agentic Agency" in Inter Bold, off-white (#e4e4e7), large
- Subtitle: "Watch Your AI Team Work in 3D" in Inter Regular, muted gray (#9ca3af), medium
- Position: upper-left quadrant

### Variation A — More dramatic
**Tool:** Midjourney v6
**Aspect Ratio:** Forced to approximate 1200x630 via --ar 40:21

```
Dark cinematic bird's eye view of a virtual office floor plan, eleven glowing colored orbs arranged in four room clusters on a near-black surface, the brightest blue orb in the center room, soft volumetric light rising from each orb, reflective dark floor, no walls visible just light suggesting spatial layout, moody atmospheric, premium dark tech card suitable for social media sharing --ar 40:21 --s 500 --style raw
```

**Alt Text:** Social share preview showing the Agentic Agency virtual office as a constellation of eleven colored lights representing AI agents working across four rooms in a dark environment.

---

## 6. Production Notes

### Consistency Rules
- All images share the same near-black base (#0a0a0f)
- Avatars are always pill-shaped / capsule-shaped glowing forms, never humanoid
- Each agent's color must match the hex values from agentData.js exactly
- Speech bubbles are always translucent with blurred text, never readable
- Glass walls have subtle edge glow, never fully opaque
- No text burned into any generated image (add in post-production)

### Recommended Generation Order
1. Hero image first (sets the visual tone for everything else)
2. Agent roster portraits (highest quantity, need consistency)
3. Step illustrations (narrative sequence, should feel connected)
4. Feature visuals (can be more abstract/varied)
5. OG image last (can composite from hero elements)

### Post-Production Needed
- OG image: add title text overlay in Figma or similar
- Agent portraits: may need background color-matching to ensure consistent #0a0a0f
- Step illustrations: may benefit from numbered overlay badges (1-4)
- All images: export as WebP for web delivery, PNG for fallback

### Tool Selection Rationale
- **Midjourney v6:** Best for the 3D rendered scenes, volumetric lighting, and cinematic quality needed for hero and step illustrations. Raw style mode keeps it grounded and avoids over-stylization.
- **DALL-E 3:** Better for the abstract/diagrammatic pieces (delegation diagram, gradient background, OG card) where precise composition and negative space matter more than cinematic rendering.
- **Firefly:** Not recommended for this project. The dark sci-fi aesthetic and specific glow effects are better served by Midjourney's rendering engine.

---

*Prompts prepared by the Image Prompter agent for the Agentic Agency landing page.*
