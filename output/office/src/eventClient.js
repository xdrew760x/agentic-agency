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

// Track active task bubbles so we can clear them on agent-done
const activeBubbleTimers = {};

// ── Debug status lights ────────────────────────────────────────────────────
// idle → green on   working → amber on   error → red on
function setDebugLights(debugLights, state) {
  if (!debugLights) return;
  const red   = debugLights['red_light'];
  const amber = debugLights['amber_light'];
  const green = debugLights['green_light'];
  if (!red || !amber || !green) return;

  const on  = (mat, r, g, b) => { mat.diffuseColor.set(r, g, b); mat.emissiveColor.set(r, g, b); };
  const off = (mat, r, g, b) => { mat.diffuseColor.set(r * 0.12, g * 0.12, b * 0.12); mat.emissiveColor.set(0, 0, 0); };

  if (state === 'working') {
    off(red,   1, 0.1, 0.1);
    on(amber,  1, 0.6, 0.0);
    off(green, 0.1, 1, 0.2);
  } else if (state === 'error') {
    on(red,    1, 0.1, 0.1);
    off(amber, 1, 0.6, 0.0);
    off(green, 0.1, 1, 0.2);
  } else {
    // idle
    off(red,   1, 0.1, 0.1);
    off(amber, 1, 0.6, 0.0);
    on(green,  0.1, 1, 0.2);
  }
}

// ── Connect ────────────────────────────────────────────────────────────────
export function connectEventStream(avatarMap, debugLights) {
  // Start in idle state — green on
  setDebugLights(debugLights, 'idle');

  const src = new EventSource('/api/events');

  src.onmessage = (e) => {
    try {
      const event = JSON.parse(e.data);
      console.log('[office] event received:', event);
      handleEvent(event, avatarMap, debugLights);
    } catch (err) {
      console.warn('[office] event parse error:', err);
    }
  };

  src.onerror = () => console.warn('[office] SSE disconnected — will reconnect');
  src.onopen  = () => console.log('[office] SSE connected to event server');

  return src;
}

// ── Event handler ──────────────────────────────────────────────────────────
function handleEvent(event, avatarMap, debugLights) {
  if (event.type === 'connected') return;

  const avatar = event.agentId ? avatarMap[event.agentId] : null;

  switch (event.type) {

    case 'agent-start': {
      if (!avatar) { console.warn('[office] agent-start: no avatar for', event.agentId); break; }
      setAvatarState(avatar, 'working');
      if (event.agentId === 'debugger') setDebugLights(debugLights, 'working');
      const startLine = START_LINES[event.agentId] ?? 'Working on it.';

      // Keep bubble visible for full task — clear any previous timer
      if (activeBubbleTimers[event.agentId]) clearTimeout(activeBubbleTimers[event.agentId]);
      avatar.bubbleText.text = startLine;
      avatar.bubble.isVisible = true;
      // Auto-hide after 10 min as a safety net
      activeBubbleTimers[event.agentId] = setTimeout(() => {
        avatar.bubble.isVisible = false;
      }, 600000);

      feedSay(avatar.agentDef, startLine);
      if (event.description) feedAction(avatar.agentDef, event.description);

      // Anders acknowledges the delegation
      const anders = avatarMap['anders'];
      if (anders && event.agentId !== 'anders') {
        const role = avatar.agentDef.role;
        const desc = event.description ?? 'task delegated';
        speak(anders, `${role} — ${desc}.`, 8000);
        feedSay(anders.agentDef, `Delegated to ${role}: ${desc}`);
      }
      break;
    }

    case 'agent-done': {
      if (!avatar) { console.warn('[office] agent-done: no avatar for', event.agentId); break; }

      // Clear the persistent task bubble
      if (activeBubbleTimers[event.agentId]) {
        clearTimeout(activeBubbleTimers[event.agentId]);
        delete activeBubbleTimers[event.agentId];
      }
      avatar.bubble.isVisible = false;

      setAvatarState(avatar, 'idle');
      if (event.agentId === 'debugger') setDebugLights(debugLights, 'idle');
      const doneLine = DONE_LINES[event.agentId] ?? 'Done.';
      speak(avatar, doneLine, 6000);
      feedSay(avatar.agentDef, doneLine);
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
      if (event.agentId === 'debugger') setDebugLights(debugLights, event.state);
      break;
    }

    case 'walkTo': {
      if (!avatar) break;
      walkTo(avatar, event.pos.x, event.pos.z, () => {});
      break;
    }
  }
}
