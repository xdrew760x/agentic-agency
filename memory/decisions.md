# Key Decisions

Log important architectural or workflow decisions here so future sessions have context.

| Date | Decision | Reason |
|---|---|---|
| 2026-03-31 | Switched workspace from research tool to full agency AI workspace | User leading team in AI adoption for web agency |
| 2026-03-31 | Built 10-subagent team around lead developer role | Need specialized agents for research, copy, SEO, scaffolding, debugging, etc. |
| 2026-03-31 | Using xpress-2 as base theme for all client projects | Agency's own theme, already has AI features + MCP server built in |
| 2026-03-31 | Moved memory to in-repo memory/ folder | Visible, git-tracked, transferable — replaces flat memory.md and hidden system memory |
| 2026-04-01 | memory.md converted to memory/ folder | Better structure as project grows; each concern in its own file |
| 2026-04-02 | Office avatars: slowed movement + speech, tuned to 0.047 step / 5000ms default | Original 0.06/4500ms was too fast; 0.035/6500ms was too slow; settled on middle |
| 2026-04-02 | Added strategy-meeting event type to office | Agents walk to center table, speak strategy lines in sequence, then disperse to desks |
| 2026-04-02 | Conference table expanded: diameter 7.0, 12 chairs at radius 4.2 | 11 agents + 1 spare; backrest position and rotation fixed (was placed inward, wrong angle) |
| 2026-04-02 | Team-first agent policy | Always route tasks through specialized subagent team sequentially; parallel instances only when explicitly requested |
