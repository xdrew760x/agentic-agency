---
name: Token efficiency rules for subagent delegation
description: Use haiku for light agents, parallelize independent work, keep prompts short, skip agents when lead can handle it
type: feedback
---

Reduce token usage when delegating to subagents. Four rules:

1. **Use `model: "haiku"` for light agents** — Email Writer, Image Prompter, Client Onboarder, and Design Tokenizer don't need Opus. Always pass `model: "haiku"` for these. Reserve Opus/Sonnet for Scaffolder, Code Reviewer, Debugger, Researcher, Copywriter, SEO Analyst.

2. **Run independent agents in parallel** — If two agents don't depend on each other's output, launch them in the same message. Examples: Researcher + Onboarder, Copywriter + Tokenizer, SEO + Image Prompter, Code Reviewer + Email Writer.

3. **Keep prompts short** — No verbose briefs. Give the agent: what to do, what files to read, where to save. Cut preamble and over-explanation. Under 150 words per prompt when possible.

4. **Skip optional agents** — If the lead developer can handle it directly (simple fixes, small edits, combining debugger work into review), do it instead of spawning a full agent. Don't delegate for delegation's sake.

**Why:** 10 sequential Opus agents on one task burned excessive tokens. The landing page project used ~350k+ tokens across agents. Haiku alone would cut 40%+ on the lighter tasks.

**How to apply:** Check these rules at the delegation gate before every spawn. Ask "Can I do this myself?" and "Does this need Opus?" first.
