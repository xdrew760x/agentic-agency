// ── Browser SSE client ─────────────────────────────────────────────────────
// Connects to the event server (via Vite proxy at /api/events).
// Drives avatar behaviors in response to real Claude agent activity.

import { AGENTS } from './agentData.js';
import { walkTo, speak, setAvatarState, feedSay, feedAction } from './behaviors.js';

// Subagent type string → avatar ID
const AGENT_TYPE_MAP = {
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
export { AGENT_TYPE_MAP };

// Home desk position keyed by avatar ID
const HOME = Object.fromEntries(AGENTS.map(a => [a.id, { x: a.deskPos.x, z: a.deskPos.z }]));

const START_LINES = {
  researcher:    'On it. Pulling data now.',
  copywriter:    'Got it. Writing now.',
  seo:           'Running the audit.',
  onboarder:     'Starting the brief.',
  emailwriter:   'Drafting the email.',
  tokenizer:     'Mapping design tokens.',
  imageprompter: 'Writing image prompts.',
  reviewer:      'Reading the code.',
  scaffolder:    'Setting up the project.',
  debugger:      'Tracing the issue.',
  anders:        'On it.',
};

const DONE_LINES = {
  researcher:    'Research complete.',
  copywriter:    'Copy is ready.',
  seo:           'SEO audit done.',
  onboarder:     'Brief is ready.',
  emailwriter:   'Email drafted.',
  tokenizer:     'Tokens mapped.',
  imageprompter: 'Prompts ready.',
  reviewer:      'Review complete.',
  scaffolder:    'Scaffold done.',
  debugger:      'Found it. Fix is ready.',
  anders:        'Done.',
};

// ── Connect ────────────────────────────────────────────────────────────────
export function connectEventStream(avatarMap) {
  const src = new EventSource('/api/events');

  src.onmessage = (e) => {
    try {
      handleEvent(JSON.parse(e.data), avatarMap);
    } catch (_) {}
  };

  // EventSource reconnects automatically on error — no extra handling needed
  return src;
}

// ── Event handler ──────────────────────────────────────────────────────────
function handleEvent(event, avatarMap) {
  if (event.type === 'connected') return;

  const avatar = event.agentId ? avatarMap[event.agentId] : null;

  switch (event.type) {

    case 'agent-start': {
      if (!avatar) break;
      setAvatarState(avatar, 'working');
      const line = START_LINES[event.agentId] ?? 'Working on it.';
      speak(avatar, line);
      feedSay(avatar.agentDef, line);
      if (event.description) feedAction(avatar.agentDef, event.description);

      // Anders acknowledges the delegation
      const anders = avatarMap['anders'];
      if (anders && event.agentId !== 'anders') {
        const role = avatar.agentDef.role;
        const desc = event.description ? `${event.description}` : 'task delegated';
        speak(anders, `${role} — ${desc}.`);
        feedSay(anders.agentDef, `Delegated to ${role}: ${desc}`);
      }
      break;
    }

    case 'agent-done': {
      if (!avatar) break;
      setAvatarState(avatar, 'idle');
      const line = DONE_LINES[event.agentId] ?? 'Done.';
      speak(avatar, line);
      feedSay(avatar.agentDef, line);
      // Walk back home
      const home = HOME[event.agentId];
      if (home) walkTo(avatar, home.x, home.z, () => {});
      break;
    }

    case 'speak': {
      if (!avatar) break;
      speak(avatar, event.text);
      feedSay(avatar.agentDef, event.text);
      break;
    }

    case 'setState': {
      if (!avatar) break;
      setAvatarState(avatar, event.state);
      break;
    }

    case 'walkTo': {
      if (!avatar) break;
      walkTo(avatar, event.pos.x, event.pos.z, () => {});
      break;
    }
  }
}
