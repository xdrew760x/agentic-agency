#!/bin/bash
LAN_IP=$(ipconfig getifaddr en0 2>/dev/null || echo "unavailable")
export LAN_IP
python3 -c "
import json, os
lan_ip = os.environ.get('LAN_IP', 'unavailable')
msg = '''
          AGENTIC AGENCY  |  AI DEVELOPMENT WORKSPACE


  Lead Developer Anders is online.
  Theme: xpress-2  |  Stack: WordPress + Gutenberg + Tailwind v4

  Landing page:  http://localhost:8080
  LAN access:    http://''' + lan_ip + ''':8080

  WHAT DO YOU WANT TO DO?

  [ 1 ]  Onboard a new client
         -> \"Start a project for [Client Name]\"

  [ 2 ]  Connect to a WordPress site
         -> \"Connect to [client] site\"

  [ 3 ]  Build or edit a site
         -> \"Build the site\" / \"Edit the [page] page\"

  [ 4 ]  Write copy
         -> \"Write copy for the [page] page\"

  [ 5 ]  Research a topic
         -> \"Research [topic]\"

  [ 6 ]  Debug something broken
         -> \"Something is broken\" / \"Getting an error on [X]\"

  [ 7 ]  Review code before it ships
         -> \"Review this code\"

----------------------------------------------------------------
  Need help?  Just describe what you are working on.
----------------------------------------------------------------
'''
print(json.dumps({'systemMessage': msg}))
"
