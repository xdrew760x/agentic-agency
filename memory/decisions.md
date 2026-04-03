# Key Decisions

Log important architectural or workflow decisions here so future sessions have context.

| Date | Decision | Reason |
|---|---|---|
| 2026-03-31 | Switched workspace from research tool to full agency AI workspace | User leading team in AI adoption for web agency |
| 2026-03-31 | Built 10-subagent team around lead developer role | Need specialized agents for research, copy, SEO, scaffolding, debugging, etc. |
| 2026-03-31 | Using xpress-2 as base theme for all client projects | Agency's own theme, already has AI features + MCP server built in |
| 2026-03-31 | Moved memory to in-repo memory/ folder | Visible, git-tracked, transferable — replaces flat memory.md and hidden system memory |
| 2026-04-01 | memory.md converted to memory/ folder | Better structure as project grows; each concern in its own file |
| 2026-04-02 | Added strategy-meeting event type to office | Agents walk to center table, speak strategy lines in sequence, then disperse to desks |
| 2026-04-02 | Conference table expanded: diameter 7.0, 12 chairs at radius 4.2 | 11 agents + 1 spare; backrest position and rotation fixed |
| 2026-04-02 | Dynamic dialogue system for office avatars | Replaced static single-string lines with randomized arrays + `{task}`/`{Task}` interpolation from Agent tool description |
| 2026-04-02 | Pre-task table meeting on every agent-start | Anders + agent walk to center table, exchange task-specific dialogue, then agent goes to desk |
| 2026-04-02 | Avatar walk speed tripled: 0.047 → 0.14 per frame | Original speed was too slow; meeting timing compressed to match (1200ms travel, 4000ms gap) |
| 2026-04-02 | Vite binds 0.0.0.0 for LAN access | Office and landing page accessible to anyone on WiFi |
| 2026-04-02 | Built landing page with all 10 agents | First full-team showcase: research → brief → tokens → copy → SEO → images → scaffold → review → debug → emails |
| 2026-04-02 | Token efficiency: Haiku for light agents, parallel independent agents | Email Writer, Image Prompter, Onboarder, Tokenizer use Haiku; parallelize when no dependency |
| 2026-04-02 | Session start opens landing page (port 8080) not office directly | Landing page at public/index.html served via npx serve; office runs on :5173 as iframe inside it |
| 2026-04-02 | Welcome message shows LAN URL | Detects en0 IP so anyone on WiFi can access the landing page |
| 2026-04-02 | Created /demo slash command for office avatar demo | `.claude/commands/demo.md` — fires real events to office event server to animate avatars through a full project pipeline (strategy meeting → researcher → copywriter → SEO) |
