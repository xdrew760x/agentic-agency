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

---

## Landing Page — Next Steps
- Generate actual images from the AI prompts in `output/agentic-office-landing-image-prompts.md`
- Replace inline SVG placeholders with real generated images
- Deploy to a real domain (agenticagency.com or similar)
- Record a video walkthrough of the office for fallback/social
- Update iframe src from LAN IP to production URL when deployed
