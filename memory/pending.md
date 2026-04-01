# Pending / To Build Later

Deferred work — do not build until the user explicitly asks.

---

## Server Deployment Workflow
User wants to connect to live servers for theme file changes (PHP, CSS, JS, theme.json).

Recommended approach:
- Git deployment pipeline (local edit → git push → server auto-pulls)
- xpress-2 MCP for page content

To build:
- `workflows/server-connect.md` workflow
- Git deployment guide in `resources/`
