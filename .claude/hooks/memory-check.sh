#!/bin/bash
# memory-check.sh
# Fires on Stop — checks if significant work was done this session but memory/ wasn't updated.
# Outputs a block decision to prompt Claude to update memory before finishing.

PROJECT_DIR="/Users/bigrigmedia/Documents/projects/agentic-agency"
MEMORY_DIR="$PROJECT_DIR/memory"
MARKER="/tmp/agentic_agency_session_start"

# Find files changed or created this session
# If session marker exists, use it as the time reference; otherwise fall back to git status
if [ -f "$MARKER" ]; then
  CHANGED=$(find "$PROJECT_DIR" \
    -newer "$MARKER" \
    -type f \
    -not -path "*/memory/*" \
    -not -path "*/.claude/*" \
    -not -path "*/.git/*" \
    -not -path "*/node_modules/*" \
    2>/dev/null | head -10)
else
  # No session marker — fall back to uncommitted git changes outside memory/
  CHANGED=$(git -C "$PROJECT_DIR" status --porcelain 2>/dev/null | \
    awk '{print $NF}' | \
    grep -v "^memory/" | \
    grep -v "^\.claude/" | \
    head -10)
fi

if [ -z "$CHANGED" ]; then
  # Nothing changed outside memory/ — no work to record
  exit 0
fi

# Check if memory was updated this session
if [ -f "$MARKER" ]; then
  MEMORY_UPDATED=$(find "$MEMORY_DIR" -newer "$MARKER" -name "*.md" 2>/dev/null | head -1)
else
  # No marker — check if any memory file was modified today
  MEMORY_UPDATED=$(find "$MEMORY_DIR" -name "*.md" -mmin -120 2>/dev/null | head -1)
fi

if [ -n "$MEMORY_UPDATED" ]; then
  # Memory was already updated this session — good
  exit 0
fi

# Work was done but memory wasn't updated — prompt Claude to update before stopping
python3 -c "
import json
reason = (
  'Work was done this session but memory/ has not been updated. '
  'Before finishing, update the relevant file(s) in memory/: '
  'clients.md (new/updated clients), '
  'decisions.md (architectural decisions), '
  'research.md (research findings + report pointers), '
  'preferences.md (workflow preferences), or '
  'pending.md (deferred work). '
  'If nothing from this session is worth saving to memory, output \"nothing to save\" and stop.'
)
print(json.dumps({'decision': 'block', 'reason': reason}))
"
