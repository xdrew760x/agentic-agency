# Agent Office Demo

Run a live demonstration of the 3D virtual office by firing real events to the office event server. This makes the avatars walk, meet, speak, and animate in the browser.

**IMPORTANT RULES:**
- Do NOT spawn real subagents — this is a visual demo only
- Fire events via `curl` to `http://localhost:4001/agent-event`
- Narrate each step briefly so the viewer knows what's happening
- Wait between phases so animations have time to play out

---

## How It Works

The office event server accepts `POST /agent-event` with these event types:

### `agent-start` — All agents walk to the meeting table. Anders briefs the assigned agent. Then everyone returns to desks and the assigned agent starts working.
```json
{"type": "agent-start", "agentId": "<id>", "description": "<task>"}
```

### `agent-done` — Agent walks to Anders' area, delivers their report, Anders acknowledges, agent returns to desk.
```json
{"type": "agent-done", "agentId": "<id>"}
```

### `strategy-meeting` — Selected agents walk to the table and speak lines in sequence, then return to desks.
```json
{"type": "strategy-meeting", "agents": ["anders","researcher","copywriter"], "lines": ["Line 1","Line 2","Line 3"]}
```

Agent IDs: `anders`, `researcher`, `copywriter`, `seo`, `onboarder`, `emailwriter`, `tokenizer`, `imageprompter`, `reviewer`, `scaffolder`, `debugger`

---

## Demo Sequence — Execute in order

### Phase 1: Check the servers are running
Run `curl -s http://localhost:4001/events -m 1 || echo "Event server not running"` to verify. If not running, tell the user to start a fresh session so the servers boot up.

### Phase 2: Strategy Meeting
Narrate: "First, let's call a strategy meeting. Watch the agents walk to the conference table."

Fire a strategy-meeting event with 4-5 agents discussing a fake project. Use realistic lines. Wait **25 seconds** for the full animation cycle (walk + speak + return).

Example:
```bash
curl -s -X POST http://localhost:4001/agent-event \
  -H 'Content-Type: application/json' \
  -d '{"type":"strategy-meeting","agents":["anders","researcher","copywriter","seo","onboarder"],"lines":["Team, new client just came in. Sunset Ridge RV Park in Sedona. Let'\''s plan the approach.","I can pull competitor data and market intel for the Sedona area.","Once research lands, I'\''ll draft the homepage and key pages.","I'\''ll audit everything before it ships — local SEO is critical for RV parks.","I'\''ll structure the intake into a project brief first."]}'
```

### Phase 3: Narrate during the wait
While the animation plays (25s), briefly explain what the viewer is seeing:
- "All five agents are walking to the conference table"
- "Anders (the lead developer) speaks first — he's briefing the team"
- "Each agent responds with their role in the project"
- "Now they're heading back to their desks"

Use `sleep 25` to wait.

### Phase 4: Agent Start — Researcher
Narrate: "Now Anders delegates research to the Researcher agent. Watch — the whole team gathers for a briefing."

```bash
curl -s -X POST http://localhost:4001/agent-event \
  -H 'Content-Type: application/json' \
  -d '{"type":"agent-start","agentId":"researcher","description":"Sedona RV park competitor analysis"}'
```

Wait **20 seconds** for the full meeting + dispatch animation.

### Phase 5: Narrate the meeting
- "Everyone walks to the meeting table"
- "Anders briefs the Researcher on the task"
- "The Researcher acknowledges and heads to their workstation"
- "Everyone else returns to their desks"

### Phase 6: Agent Done — Researcher reports back
Narrate: "Research is complete. Watch the Researcher walk to Anders to deliver the report."

```bash
curl -s -X POST http://localhost:4001/agent-event \
  -H 'Content-Type: application/json' \
  -d '{"type":"agent-done","agentId":"researcher"}'
```

Wait **15 seconds**.

### Phase 7: Narrate the report
- "The Researcher walks to Anders' area"
- "They deliver their findings — see the speech bubble"
- "Anders acknowledges the report"
- "Researcher heads back to their desk"

### Phase 8: Agent Start — Copywriter
Narrate: "Now Anders sends the Copywriter to write homepage copy, informed by the research."

```bash
curl -s -X POST http://localhost:4001/agent-event \
  -H 'Content-Type: application/json' \
  -d '{"type":"agent-start","agentId":"copywriter","description":"Sunset Ridge homepage hero copy"}'
```

Wait **20 seconds**.

### Phase 9: Agent Done — Copywriter
Narrate: "Copy is ready. The Copywriter delivers to Anders."

```bash
curl -s -X POST http://localhost:4001/agent-event \
  -H 'Content-Type: application/json' \
  -d '{"type":"agent-done","agentId":"copywriter"}'
```

Wait **15 seconds**.

### Phase 10: Agent Start — SEO Analyst
Narrate: "Finally, the SEO Analyst audits the copy before it ships."

```bash
curl -s -X POST http://localhost:4001/agent-event \
  -H 'Content-Type: application/json' \
  -d '{"type":"agent-start","agentId":"seo","description":"Homepage SEO audit for Sunset Ridge"}'
```

Wait **20 seconds**.

### Phase 11: Agent Done — SEO Analyst
Narrate: "Audit complete. SEO Analyst delivers findings to Anders."

```bash
curl -s -X POST http://localhost:4001/agent-event \
  -H 'Content-Type: application/json' \
  -d '{"type":"agent-done","agentId":"seo"}'
```

Wait **15 seconds**.

### Phase 12: Wrap-Up
Summarize what the viewer just saw:
- "That was the full pipeline — strategy meeting, then three agents delegated in sequence"
- "Each agent got briefed at the table, worked at their desk, then reported back to Anders"
- "In a real session, these animations trigger automatically when Claude Code spawns subagents"
- "The hooks fire events to the office server — no manual triggering needed"

---

## Timing Reference
- Strategy meeting: ~25s total (5s walk + 5s per speaker + 2s return)
- Agent start (team meeting): ~20s total (5s walk + 4s briefing + 4s response + 8s dispatch)
- Agent done (report): ~15s total (5s walk + 5.5s report + 2s ack + 7s return)
