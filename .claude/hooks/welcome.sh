#!/bin/bash
# Outputs the Agentic Agency welcome screen as a Claude Code systemMessage
# Also stamps a session marker so memory-check.sh knows when this session started
touch /tmp/agentic_agency_session_start

python3 - << 'PYEOF'
import json

msg = """\
╔══════════════════════════════════════════════════════════════╗
║           AGENTIC AGENCY — AI DEVELOPMENT WORKSPACE          ║
╚══════════════════════════════════════════════════════════════╝

  Lead Developer is online.
  Theme: xpress-2  |  Stack: WordPress + Gutenberg + Tailwind v4

  WHAT DO YOU WANT TO DO?

  [ 1 ]  Onboard a new client
         → "Start a project for [Client Name]"

  [ 2 ]  Connect to a WordPress site
         → "Connect to [client] site"

  [ 3 ]  Build or edit a site
         → "Build the site" / "Edit the [page] page"

  [ 4 ]  Write copy
         → "Write copy for the [page] page"

  [ 5 ]  Research a topic
         → "Research [topic]"

  [ 6 ]  Debug something broken
         → "Something is broken" / "Getting an error on [X]"

  [ 7 ]  Review code before it ships
         → "Review this code"

──────────────────────────────────────────────────────────────
  Need help?  Just describe what you're working on.
──────────────────────────────────────────────────────────────"""

print(json.dumps({"systemMessage": msg}))
PYEOF
