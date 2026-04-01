# Research Workflow

## Trigger
User says: "research [topic]" or "I want to research [topic]"

---

## Steps

### 1. Clarify
- If the topic is broad, ask: "Any specific angle or audience for this?"
- Always ask: "Would you like me to use parallel instances for faster research? (yes/no)"
  - **Yes** → spawn one parallel instance per sub-topic simultaneously
  - **No** → delegate to the `researcher` subagent as a single task

### 2. Plan
Define before delegating:
- Core question the report should answer
- 3–5 sub-topics or angles to cover
- State the plan in a brief bullet list to the user

### 3. Delegate to `researcher` subagent
The lead developer does NOT run searches directly. Delegate to the `researcher` subagent.

**If parallel instances enabled:**
- Spawn one instance per sub-topic simultaneously
- Each instance searches its topic and returns findings + sources
- Collect all results, then synthesize

**If parallel instances disabled:**
- Delegate the full research task to the `researcher` subagent as a single job

### 4. Synthesize
As lead developer, organize raw findings into themes.
Do not just pass through the researcher's output — add technical context and implications relevant to web dev / agency work.

### 5. Write the Report
Save to: `output/[topic-slug]-report.md`

**Report structure:**
```
# [Topic] — Research Report
Date: [today's date]

## Executive Summary
2–4 bullet points — the most important findings

## Key Findings
Organized by theme. Headers and bullet points.

## Implications for the Agency
What this means practically for web dev / RV park / housing client work

## Sources
Numbered list: title, URL, one-line contribution
```

### 6. Save to Memory
After saving the report, always do both:

1. **Reference memory entry** — add a pointer to the report file in the system memory index (`~/.claude/projects/.../memory/MEMORY.md`) using type `reference`. Format:
   - Name: `[Topic] Research Report`
   - Description: one-line summary of what the report covers and why it's useful
   - Body: path to the file (`output/[topic-slug]-report.md`) and the core question it answers

2. **Project memory entry** (if applicable) — if the research revealed facts that should shape future decisions (e.g., a tool to prefer, a pattern to follow, a competitor to watch), save a `project` memory entry capturing that insight.

---

## Output Rules
- Bullet points over paragraphs
- No filler
- Every claim tied to a source
- File saved to `output/` before presenting to user
