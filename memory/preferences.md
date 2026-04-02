# User Preferences

Working style and preferences for the lead developer agent.

- **Role:** Web developer leading a team in AI adoption for a web agency
- **Communication:** Bullet points over paragraphs; concise responses
- **Planning:** Always show a plan before execution
- **Parallel work:** Parallel OK when agents are independent (no output dependency). Never duplicate same agent type. Ask before doing anything unusual.
- **Subagent delegation:** Always tell the user which agent will be used and why, then wait for approval before spawning. Never auto-delegate.
- **Token efficiency:** Use Haiku for light agents (Email Writer, Image Prompter, Onboarder, Tokenizer). Keep prompts short (<150 words). Skip agents when lead can handle it directly.
- **Memory:** Use `memory/` folder in the repo — git-tracked and transferable. Also update auto-memory at `~/.claude/projects/...` when relevant.
