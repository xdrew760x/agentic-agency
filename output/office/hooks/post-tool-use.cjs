'use strict';
// ── PostToolUse hook ───────────────────────────────────────────────────────
// Fired by Claude Code after a tool completes.
// If the tool is "Agent", POSTs agent-done to the office event server.

const AGENT_MAP = {
  'researcher':       'researcher',
  'copywriter':       'copywriter',
  'seo-analyst':      'seo',
  'client-onboarder': 'onboarder',
  'email-writer':     'emailwriter',
  'design-tokenizer': 'tokenizer',
  'image-prompter':   'imageprompter',
  'code-reviewer':    'reviewer',
  'scaffolder':       'scaffolder',
  'debugger':         'debugger',
  'Explore':          'researcher',
  'Plan':             'anders',
};

async function main() {
  let raw = '';
  for await (const chunk of process.stdin) raw += chunk;

  let input;
  try { input = JSON.parse(raw); } catch (_) { return; }

  if (input.tool_name !== 'Agent') return;

  const subagentType = input.tool_input?.subagent_type;
  const agentId      = AGENT_MAP[subagentType];
  if (!agentId) return;

  try {
    await fetch('http://localhost:5174/agent-event', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ type: 'agent-done', agentId }),
      signal:  AbortSignal.timeout(1500),
    });
  } catch (_) {
    // Event server not running — fail silently
  }
}

main().catch(() => {}).finally(() => process.exit(0));
