// ── Browser SSE client ─────────────────────────────────────────────────────
// Connects to the event server (via Vite proxy at /api/events).
// Drives avatar behaviors in response to real Claude agent activity.

import { AGENTS, REPORT_WAYPOINTS } from './agentData.js';
import { walkTo, speak, setAvatarState, feedSay, feedAction, feedThink } from './behaviors.js';

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

// ── What Anders says when delegating ──────────────────────────────────────
const DELEGATE_LINES = {
  researcher:    'Get me competitor intel and market data.',
  copywriter:    'I need homepage copy — warm tone, booking CTA up top.',
  seo:           'Run the full on-page audit. Flag any schema gaps.',
  onboarder:     'Build the project brief from the intake form.',
  emailwriter:   'Draft the client delivery email. Professional, clear.',
  tokenizer:     'Extract the brand tokens and map them to Tailwind vars.',
  imageprompter: 'Write the hero and amenity image prompts.',
  reviewer:      'Review the latest diff. Security and standards.',
  scaffolder:    'Spin up the WordPress scaffold with xpress-2.',
  debugger:      'Trace that error. I need root cause, not a workaround.',
};

// ── What each agent thinks when starting ──────────────────────────────────
const THINK_LINES = {
  researcher:    'Need to pull market data, competitor positioning, amenity trends.',
  copywriter:    'Reading the brief first. Tone, audience, page goals — then I write.',
  seo:           'Checking title tags, meta, schema, internal links. Full sweep.',
  onboarder:     'Intake → structured brief. Page list, audience, tone, open questions.',
  emailwriter:   'Subject line, clear summary, next steps. Keep it under 200 words.',
  tokenizer:     'Brand colors → CSS vars → Tailwind config. Then check contrast ratios.',
  imageprompter: 'Hero first. Then amenity shots. Lighting, mood, subject — be specific.',
  reviewer:      'Security escaping, nonce checks, hook priorities. Standards compliance.',
  scaffolder:    'Theme install, plugin stack, permalink structure, test post types.',
  debugger:      'Reproduce it first. Then trace the call stack. No guessing.',
  anders:        'Scoping the work. Breaking it into parallel tracks.',
};

// ── What each agent says when done ────────────────────────────────────────
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

// ── What Anders says when an agent reports back ───────────────────────────
const ACK_LINES = {
  researcher:    'Good. Drop the data in the shared doc.',
  copywriter:    "Solid. I'll read it before it goes to SEO.",
  seo:           'Copy those keyword targets to the copywriter.',
  onboarder:     "Brief accepted. I'll circulate it now.",
  emailwriter:   "Send it over — I'll do a final read before sending.",
  tokenizer:     'Push the token file to the design branch.',
  imageprompter: 'Forward those to the client for approval.',
  reviewer:      'Approved. Ready to merge.',
  scaffolder:    'Stand it up on staging.',
  debugger:      'Fix deployed. Mark the ticket closed.',
};

// ── In-flight walk cancel handles + done-sequence timers ──────────────────
const activeWalkCancels  = {};
const activeBubbleTimers = {};
const activeDoneTimers   = {};

// ── Debug status lights ────────────────────────────────────────────────────
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
    off(red,   1, 0.1, 0.1);
    off(amber, 1, 0.6, 0.0);
    on(green,  0.1, 1, 0.2);
  }
}

// ── Cancel any in-flight walk + done timers for an agent ──────────────────
function cancelAgent(id) {
  if (activeWalkCancels[id])  { activeWalkCancels[id]();  delete activeWalkCancels[id];  }
  if (activeBubbleTimers[id]) { clearTimeout(activeBubbleTimers[id]); delete activeBubbleTimers[id]; }
  if (activeDoneTimers[id])   { clearTimeout(activeDoneTimers[id]);   delete activeDoneTimers[id];   }
}

// ── Connect ────────────────────────────────────────────────────────────────
export function connectEventStream(avatarMap, debugLights) {
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

      // Cancel anything in flight for this agent
      cancelAgent(event.agentId);
      avatar.bubble.isVisible = false;

      // Glow immediately so the user sees a reaction right away
      setAvatarState(avatar, 'working');
      if (event.agentId === 'debugger') setDebugLights(debugLights, 'working');

      // Feed: what the agent is thinking as they start
      feedThink(avatar.agentDef, THINK_LINES[event.agentId] ?? 'Preparing to start.');

      // Walk to home desk, then show bubble + say start line on arrival
      const home = HOME[event.agentId];
      if (home) {
        feedAction(avatar.agentDef, 'Heading to workstation');
        const cancel = walkTo(avatar, home.x, home.z, () => {
          delete activeWalkCancels[event.agentId];
          setAvatarState(avatar, 'working'); // re-apply after walk tint

          const startLine = START_LINES[event.agentId] ?? 'Working on it.';
          avatar.bubbleText.text  = startLine;
          avatar.bubble.isVisible = true;
          activeBubbleTimers[event.agentId] = setTimeout(() => {
            avatar.bubble.isVisible = false;
          }, 600000); // safety net — cleared by agent-done

          feedSay(avatar.agentDef, startLine);
          if (event.description) feedAction(avatar.agentDef, event.description);
        });
        activeWalkCancels[event.agentId] = cancel;
      }

      // Anders: glow, speak delegation, return to idle after speaking
      const anders = avatarMap['anders'];
      if (anders && event.agentId !== 'anders') {
        cancelAgent('anders');
        setAvatarState(anders, 'working');
        const delegateLine = DELEGATE_LINES[event.agentId] ?? `${avatar.agentDef.role} — on it.`;
        speak(anders, delegateLine, 4000);
        feedSay(anders.agentDef, delegateLine);
        activeDoneTimers['anders'] = setTimeout(() => {
          setAvatarState(anders, 'idle');
          delete activeDoneTimers['anders'];
        }, 4200);
      }
      break;
    }

    case 'agent-done': {
      if (!avatar) { console.warn('[office] agent-done: no avatar for', event.agentId); break; }

      // Cancel anything in flight
      cancelAgent(event.agentId);
      avatar.bubble.isVisible = false;

      if (event.agentId === 'debugger') setDebugLights(debugLights, 'idle');

      const doneLine = DONE_LINES[event.agentId] ?? 'Done.';
      const waypoint = REPORT_WAYPOINTS[event.agentId];
      const home     = HOME[event.agentId];
      const anders   = avatarMap['anders'];

      const deliverReport = () => {
        setAvatarState(avatar, 'idle');
        speak(avatar, doneLine, 5000);
        feedSay(avatar.agentDef, doneLine);

        // Anders acks with a specific line
        if (anders && event.agentId !== 'anders') {
          const ackLine = ACK_LINES[event.agentId] ?? 'Good work. Stand by.';
          activeDoneTimers[`${event.agentId}_ack`] = setTimeout(() => {
            delete activeDoneTimers[`${event.agentId}_ack`];
            speak(anders, ackLine, 4000);
            feedSay(anders.agentDef, ackLine);
          }, 1500);
        }

        // Walk home after done line finishes
        activeDoneTimers[event.agentId] = setTimeout(() => {
          delete activeDoneTimers[event.agentId];
          if (home) {
            feedAction(avatar.agentDef, 'Returning to desk');
            const cancelHome = walkTo(avatar, home.x, home.z, () => {
              delete activeWalkCancels[event.agentId];
            });
            activeWalkCancels[event.agentId] = cancelHome;
          }
        }, 5500);
      };

      if (waypoint) {
        feedAction(avatar.agentDef, 'Heading to report');
        const cancel = walkTo(avatar, waypoint.x, waypoint.z, () => {
          delete activeWalkCancels[event.agentId];
          deliverReport();
        });
        activeWalkCancels[event.agentId] = cancel;
      } else {
        deliverReport();
      }
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
      cancelAgent(event.agentId);
      const cancel = walkTo(avatar, event.pos.x, event.pos.z, () => {
        delete activeWalkCancels[event.agentId];
      });
      activeWalkCancels[event.agentId] = cancel;
      break;
    }
  }
}
