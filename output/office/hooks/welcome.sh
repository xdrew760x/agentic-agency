#!/bin/bash
python3 -c "
import json
msg = '''
          AGENTIC AGENCY  |  AI DEVELOPMENT WORKSPACE


  Lead Developer Anders is online.
  Theme: xpress-2  |  Stack: WordPress + Gutenberg + Tailwind v4

  WHAT DO YOU WANT TO DO?

  [ 1 ]  Onboard a new client
         \u2192 \"Start a project for [Client Name]\"

  [ 2 ]  Connect to a WordPress site
         \u2192 \"Connect to [client] site\"

  [ 3 ]  Build or edit a site
         \u2192 \"Build the site\" / \"Edit the [page] page\"

  [ 4 ]  Write copy
         \u2192 \"Write copy for the [page] page\"

  [ 5 ]  Research a topic
         \u2192 \"Research [topic]\"

  [ 6 ]  Debug something broken
         \u2192 \"Something is broken\" / \"Getting an error on [X]\"

  [ 7 ]  Review code before it ships
         \u2192 \"Review this code\"

\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  Need help?  Just describe what you are working on.
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
'''
print(json.dumps({'systemMessage': msg}))
"
