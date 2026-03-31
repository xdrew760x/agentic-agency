# WordPress Connect Workflow

## Trigger
User says: "connect to [client] site", "switch to [client]", "set up MCP for [client]", "connect WordPress"

---

## Purpose
Connect the xpress-2 MCP server to a specific client's WordPress site so all other WordPress workflows can run.

---

## Steps

### 1. Get Credentials
Ask the user for:
- **WP_URL** — the site URL (e.g., https://sunsetpines.com)
- **WP_USER** — WordPress username
- **WP_APP_PASSWORD** — WordPress application password

**How to generate an Application Password:**
WordPress Admin → Users → Profile → Application Passwords → Add New → Copy the password

### 2. Locate the .env File
The `.env` file lives in `mcp-server/` inside the xpress-2 theme on the client's server.

If working locally (local dev environment):
- Path: `/path/to/wp-content/themes/xpress-2/mcp-server/.env`

### 3. Verify Connection
Once credentials are set, run:
```
get_site_info
```
Confirm it returns the correct site name and URL.

### 4. Register MCP Server in Claude Code (first time only)
```
claude mcp add xpress2 -- node /path/to/xpress-2/mcp-server/index.js
```

Or add to `.claude/settings.json`:
```json
{
  "mcpServers": {
    "xpress2": {
      "command": "node",
      "args": ["/path/to/xpress-2/mcp-server/index.js"]
    }
  }
}
```

### 5. Update memory.md
Add the client site connection to the Clients table in `memory.md`:
- Client name, site URL, connection status

---

## Security Notes
- Never commit `.env` files to git — they contain credentials
- `mcp-server/.env` is already in xpress-2's `.gitignore`
- Use Application Passwords, not your main WordPress password
- Application Passwords can be revoked per-client at any time
