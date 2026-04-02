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

// ── Helpers ───────────────────────────────────────────────────────────────
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
// {task} = original, {Task} = lowercase (for mid-sentence use)
function fill(template, task) {
  const lower = task.charAt(0).toLowerCase() + task.slice(1);
  return template.replace(/\{Task\}/g, lower).replace(/\{task\}/g, task);
}

// ── Anders delegation lines — task-aware + generic fallbacks ──────────────
const DELEGATE_LINES = {
  researcher:    { generic: ['I need competitor intel and market data.', 'Pull everything you can. Full picture.', 'Dig deep, report back.'], task: ['I need research on {Task}.', 'Deep dive — {Task}. Report back.', 'Look into {Task} for me.'] },
  copywriter:    { generic: ['Copy time. Warm tone, CTA up top.', "Brief is ready. Start writing.", 'Keep it sharp and on-brand.'], task: ['Write copy for {Task}.', 'I need you on {Task}. Match the brief.', '{task} — make it persuasive.'] },
  seo:           { generic: ['Full on-page audit. Flag gaps.', 'Title tags, meta, schema — the works.', 'I want zero SEO gaps.'], task: ['Audit {Task} for SEO.', 'Run a sweep on {Task}.', '{task} — headings, schema, local signals.'] },
  onboarder:     { generic: ['Build the brief from intake.', 'New client. Structure it, flag gaps.', 'Turn the intake into a brief.'], task: ['Build a brief for {Task}.', 'Onboard {Task}. Flag open questions.', '{task} — structure the brief.'] },
  emailwriter:   { generic: ['Draft the client email. No fluff.', 'Keep it concise and actionable.', 'Professional, clear, done.'], task: ['Draft an email about {Task}.', 'Client needs to know about {Task}.', '{task} — professional tone.'] },
  tokenizer:     { generic: ['Map brand tokens to Tailwind vars.', 'Extract the design system.', 'Colors, fonts, spacing — go.'], task: ['Map tokens for {Task}.', 'Extract the design system from {Task}.', '{task} — push to theme.json.'] },
  imageprompter: { generic: ['Write hero and amenity prompts.', 'Be specific on lighting and mood.', 'Hero first, then supporting shots.'], task: ['Write image prompts for {Task}.', 'I need visuals for {Task}.', '{task} — hero and supporting images.'] },
  reviewer:      { generic: ['Review the diff. Security first.', "Check for OWASP issues. Don't miss anything.", 'Second pair of eyes. Be thorough.'], task: ['Review the code for {Task}.', 'Check {Task} — security and standards.', '{task} — full code review.'] },
  scaffolder:    { generic: ['Spin up the scaffold. Standard stack.', 'Theme, plugins, CPTs — go.', 'Build the project structure.'], task: ['Scaffold {Task}.', 'Set up {Task} with xpress-2.', '{task} — standard stack.'] },
  debugger:      { generic: ['Trace it. Root cause, not a workaround.', 'Something broke. Find it.', "Don't guess — trace it."], task: ['Debug {Task}.', 'Something is wrong with {Task}. Find it.', '{task} — trace to root cause.'] },
};

// ── Agent internal thoughts — task-aware + generic fallbacks ──────────────
const THINK_LINES = {
  researcher:    { generic: ['Multiple sources. Cross-reference everything.', 'Starting broad, narrowing down.', 'Market data, competitors, trends.'], task: ['How should I approach {Task}?', 'Multiple angles on {Task}.', 'Breaking down {Task}.'] },
  copywriter:    { generic: ['Tone, audience, goals — then write.', 'Audience first. Structure second.', 'Brief first, keyboard second.'], task: ['What angle works for {Task}?', 'Tone and structure for {Task}.', 'Mapping {Task} sections.'] },
  seo:           { generic: ['Title tags, meta, schema, links.', 'Technical first, then content.', 'Systematic sweep.'], task: ['Audit plan for {Task}.', 'Which signals matter for {Task}?', 'Checklist for {Task}.'] },
  onboarder:     { generic: ['Page list, audience, tone, gaps.', 'Organizing raw data into a brief.', 'Fill gaps, flag unknowns.'], task: ['Structuring {Task} intake.', 'Organizing {Task} into a brief.', 'What pages does {Task} need?'] },
  emailwriter:   { generic: ['Subject, summary, next steps.', 'Professional but warm.', 'Structure first, polish second.'], task: ['Framing for {Task}.', 'What does the client need to hear about {Task}?', 'Structuring the {Task} email.'] },
  tokenizer:     { generic: ['Colors to CSS vars to Tailwind.', 'Extracting the visual system.', 'Mapping to our token structure.'], task: ['Analyzing {Task} brand assets.', 'Extracting {Task} color system.', 'Token pipeline for {Task}.'] },
  imageprompter: { generic: ['Hero first. Lighting, mood, subject.', 'Mood, composition, style.', 'Prompts that give consistent results.'], task: ['What mood fits {Task}?', 'Hero composition for {Task}.', 'Visual direction for {Task}.'] },
  reviewer:      { generic: ['Security first, then conventions.', 'Line by line.', 'What could break in production?'], task: ['Reviewing {Task} approach.', 'Checking {Task} for issues.', 'Review checklist for {Task}.'] },
  scaffolder:    { generic: ['Theme, plugins, permalinks, CPTs.', 'Standard xpress-2 scaffold.', 'Clean structure first.'], task: ['Planning {Task} scaffold.', 'CPTs and blocks for {Task}.', 'Project structure for {Task}.'] },
  debugger:      { generic: ['Reproduce first. Then trace.', 'Error logs, hooks, filters.', 'Systematic. No shortcuts.'], task: ['What could cause {Task}?', 'Reproducing {Task} first.', 'Tracing {Task} step by step.'] },
  anders:        { generic: ['Scoping the work.', 'Figuring out the order.', 'Planning who handles what.'], task: ['Planning {Task}.', 'Best workflow for {Task}.'] },
};

// ── Agent start lines — task-aware + generic ──────────────────────────────
const START_LINES = {
  researcher:    { generic: ['On it.', 'Going deep.', 'Pulling data.'], task: ['On it — {Task}.', 'Pulling data on {Task}.', 'Researching {Task}.'] },
  copywriter:    { generic: ['Writing.', 'On it.', 'Brief absorbed.'], task: ['Writing {Task}.', 'Starting on {Task}.', 'Drafting {Task}.'] },
  seo:           { generic: ['Running the audit.', 'Sweep started.', 'Checking.'], task: ['Auditing {Task}.', 'SEO sweep on {Task}.', 'Checking {Task}.'] },
  onboarder:     { generic: ['Building the brief.', 'Organizing intake.', 'On it.'], task: ['Briefing {Task}.', 'Structuring {Task}.', 'On it — {Task}.'] },
  emailwriter:   { generic: ['Drafting.', 'Writing.', 'On it.'], task: ['Drafting {Task} email.', 'Writing — {Task}.', 'On it — {Task}.'] },
  tokenizer:     { generic: ['Mapping tokens.', 'Extracting.', 'On it.'], task: ['Mapping {Task} tokens.', 'Extracting {Task}.', 'On it — {Task}.'] },
  imageprompter: { generic: ['Writing prompts.', 'Visualizing.', 'On it.'], task: ['Prompts for {Task}.', 'Visualizing {Task}.', 'On it — {Task}.'] },
  reviewer:      { generic: ['Reading the code.', 'Review started.', 'Eyes on it.'], task: ['Reviewing {Task}.', 'Reading {Task}.', 'On it — {Task}.'] },
  scaffolder:    { generic: ['Setting up.', 'Scaffold started.', 'Building.'], task: ['Scaffolding {Task}.', 'Setting up {Task}.', 'Building {Task}.'] },
  debugger:      { generic: ['Tracing.', 'Debug active.', 'Hunting.'], task: ['Tracing {Task}.', 'Debugging {Task}.', 'On it — {Task}.'] },
  anders:        { generic: ['On it.', 'Working.', 'Handling this.'], task: ['On {Task}.'] },
};

// ── Done lines — task-aware + generic ─────────────────────────────────────
const DONE_LINES = {
  researcher:    { generic: ['Research done.', 'Report ready.', 'Findings in.'], task: ['{task} — research done.', 'Done. {task} report ready.', '{task} findings compiled.'] },
  copywriter:    { generic: ['Copy ready.', 'Draft done.', 'Copy is in.'], task: ['{task} copy ready.', 'Done with {Task}.', '{task} draft done.'] },
  seo:           { generic: ['Audit done.', 'Findings tagged.', 'Sweep done.'], task: ['{task} audit done.', 'Finished {Task}.', '{task} flags documented.'] },
  onboarder:     { generic: ['Brief ready.', 'Onboarding done.', 'Brief is in.'], task: ['{task} brief ready.', 'Done with {Task}.', '{task} — brief done.'] },
  emailwriter:   { generic: ['Email drafted.', 'Draft done.', 'Email ready.'], task: ['{task} email done.', 'Done — {Task}.', '{task} ready for review.'] },
  tokenizer:     { generic: ['Tokens mapped.', 'Token file ready.', 'Done.'], task: ['{task} tokens mapped.', 'Done — {Task}.', '{task} token file ready.'] },
  imageprompter: { generic: ['Prompts ready.', 'All written.', 'Done.'], task: ['{task} prompts ready.', 'Done — {Task}.', '{task} prompts written.'] },
  reviewer:      { generic: ['Review done.', 'Notes attached.', 'All reviewed.'], task: ['{task} review done.', 'Done with {Task}.', '{task} — notes attached.'] },
  scaffolder:    { generic: ['Scaffold done.', 'Structure ready.', 'Done.'], task: ['{task} scaffold done.', 'Done — {Task}.', '{task} structure ready.'] },
  debugger:      { generic: ['Found it. Fix ready.', 'Bug traced.', 'Root cause found.'], task: ['{task} — found and fixed.', 'Traced {Task}. Fix ready.', '{task} resolved.'] },
  anders:        { generic: ['Done.', 'Wrapped up.', 'Complete.'], task: ['{task} done.'] },
};

// ── Anders acknowledgement lines — task-aware + generic ───────────────────
const ACK_LINES = {
  researcher:    { generic: ['Good. Drop it in the doc.', 'Solid. Filing.', 'Good work.'], task: ['Good work on {Task}. Filing.', '{task} findings look solid.', 'Nice. Share the {Task} report.'] },
  copywriter:    { generic: ["Solid. Sending to SEO.", 'Good draft. Moving forward.', 'Strong copy.'], task: ['Good {Task} copy. Moving forward.', '{task} looks solid.', 'Nice. Sending {Task} to SEO.'] },
  seo:           { generic: ['Good audit. Share the flags.', 'Noted. Forwarding.', 'Targets received.'], task: ['Good {Task} audit. Forwarding.', '{task} notes received.', 'Solid. {task} targets noted.'] },
  onboarder:     { generic: ["Brief accepted. Circulating.", 'Good brief. Moving on.', 'Clean brief.'], task: ['{task} brief accepted.', 'Good {Task} onboarding.', '{task} — team notified.'] },
  emailwriter:   { generic: ["I'll proof it. Then send.", 'Good draft. Final read.', 'Clean. Sending.'], task: ['{task} email received. Proofing.', 'Good draft on {Task}.', '{task} — sending.'] },
  tokenizer:     { generic: ['Push the tokens.', 'Clean mapping.', 'Deploy them.'], task: ['{task} tokens look good.', 'Clean. Push {Task} tokens.', '{task} — deployed.'] },
  imageprompter: { generic: ['Forwarding for approval.', 'Good prompts. Queued.', 'Approved.'], task: ['{task} prompts received.', 'Good {Task} prompts. Forwarding.', '{task} images approved.'] },
  reviewer:      { generic: ['Approved. Ship it.', 'Clean review.', 'Code checks out.'], task: ['{task} approved. Merging.', '{task} looks clean. Ship it.', 'Good {Task} review.'] },
  scaffolder:    { generic: ['Push to staging.', 'Looks good. Deploy.', 'Structure is clean.'], task: ['{task} ready. Push to staging.', 'Good {Task} setup.', '{task} — ship it.'] },
  debugger:      { generic: ['Fix verified. Ticket closed.', 'Good trace.', 'Bug squashed.'], task: ['{task} fix verified.', 'Good trace on {Task}.', '{task} resolved. Nice.'] },
};

// ── Line picker — uses task context when available ────────────────────────
function getLine(lineSet, agentId, task) {
  const pool = lineSet[agentId];
  if (!pool) return 'Working.';
  if (task && pool.task) return fill(pick(pool.task), task);
  return pick(pool.generic);
}

// ── Meeting table position (north end of office, wood floor) ──────────────
const TABLE_X = 1, TABLE_Z = 26, SEAT_R = 5.0;

// ── In-flight walk cancel handles + done-sequence timers ──────────────────
const activeWalkCancels  = {};
const activeBubbleTimers = {};
const activeDoneTimers   = {};
const activeTaskDesc     = {};  // agentId → current task description

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
  // Clear primary timer + any compound-key timers (briefing, response, dispatch, ack)
  for (const key of Object.keys(activeDoneTimers)) {
    if (key === id || key.startsWith(`${id}_`)) {
      clearTimeout(activeDoneTimers[key]);
      delete activeDoneTimers[key];
    }
  }
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

      const task = event.description || '';
      activeTaskDesc[event.agentId] = task;

      // Cancel anything in flight for this agent
      cancelAgent(event.agentId);
      avatar.bubble.isVisible = false;

      // Glow immediately so the user sees a reaction right away
      setAvatarState(avatar, 'working');
      if (event.agentId === 'debugger') setDebugLights(debugLights, 'working');

      // Feed: what the agent is thinking as they start
      feedThink(avatar.agentDef, getLine(THINK_LINES, event.agentId, task));

      const home   = HOME[event.agentId];
      const anders = avatarMap['anders'];

      // ── Full team meeting before every task ─────────────────────────
      if (anders && event.agentId !== 'anders') {

        // Walk ALL agents to the meeting table
        const allIds = AGENTS.map(a => a.id);
        const n = allIds.length;
        const seats = allIds.map((_, i) => {
          const angle = (i / n) * Math.PI * 2 + Math.PI / 2;
          return { x: TABLE_X + Math.cos(angle) * SEAT_R, z: TABLE_Z + Math.sin(angle) * SEAT_R };
        });

        allIds.forEach((id, i) => {
          const a = avatarMap[id];
          if (!a) return;
          cancelAgent(id);
          setAvatarState(a, 'working');
          feedAction(a.agentDef, 'Heading to team meeting');
          const cancelWalk = walkTo(a, seats[i].x, seats[i].z, () => {
            delete activeWalkCancels[id];
          });
          activeWalkCancels[id] = cancelWalk;
        });

        // After all arrive — Anders briefs the team
        const TRAVEL_MS = 5000;

        activeDoneTimers[`${event.agentId}_briefing`] = setTimeout(() => {
          delete activeDoneTimers[`${event.agentId}_briefing`];

          const delegateLine = getLine(DELEGATE_LINES, event.agentId, task);
          speak(anders, delegateLine, 3500);
          feedSay(anders.agentDef, delegateLine);
        }, TRAVEL_MS);

        // Assigned agent responds
        activeDoneTimers[`${event.agentId}_response`] = setTimeout(() => {
          delete activeDoneTimers[`${event.agentId}_response`];

          const startLine = getLine(START_LINES, event.agentId, task);
          speak(avatar, startLine, 3000);
          feedSay(avatar.agentDef, startLine);
          if (task) feedAction(avatar.agentDef, task);
        }, TRAVEL_MS + 4000);

        // After exchange, ALL agents return to desks; assigned agent starts working
        activeDoneTimers[`${event.agentId}_dispatch`] = setTimeout(() => {
          delete activeDoneTimers[`${event.agentId}_dispatch`];

          allIds.forEach(id => {
            const a = avatarMap[id];
            const agentHome = HOME[id];
            if (!a || !agentHome) return;

            feedAction(a.agentDef, id === event.agentId ? 'Heading to workstation' : 'Returning to desk');
            const cancelHome = walkTo(a, agentHome.x, agentHome.z, () => {
              delete activeWalkCancels[id];

              if (id === event.agentId) {
                // Assigned agent starts working at their desk
                setAvatarState(a, 'working');
                a.bubbleText.text  = getLine(START_LINES, id, task);
                a.bubble.isVisible = true;
                activeBubbleTimers[id] = setTimeout(() => {
                  a.bubble.isVisible = false;
                }, 600000);
              } else {
                setAvatarState(a, 'idle');
              }
            });
            activeWalkCancels[id] = cancelHome;
          });
        }, TRAVEL_MS + 8000);

      } else {
        // Anders himself or fallback — go straight to desk
        if (home) {
          feedAction(avatar.agentDef, 'Heading to workstation');
          const cancel = walkTo(avatar, home.x, home.z, () => {
            delete activeWalkCancels[event.agentId];
            setAvatarState(avatar, 'working');

            const startLine = getLine(START_LINES, event.agentId, task);
            avatar.bubbleText.text  = startLine;
            avatar.bubble.isVisible = true;
            activeBubbleTimers[event.agentId] = setTimeout(() => {
              avatar.bubble.isVisible = false;
            }, 600000);

            feedSay(avatar.agentDef, startLine);
            if (task) feedAction(avatar.agentDef, task);
          });
          activeWalkCancels[event.agentId] = cancel;
        }
      }
      break;
    }

    case 'agent-done': {
      if (!avatar) { console.warn('[office] agent-done: no avatar for', event.agentId); break; }

      // Cancel anything in flight
      cancelAgent(event.agentId);
      avatar.bubble.isVisible = false;

      if (event.agentId === 'debugger') setDebugLights(debugLights, 'idle');

      const task     = activeTaskDesc[event.agentId] || '';
      const doneLine = getLine(DONE_LINES, event.agentId, task);
      const waypoint = REPORT_WAYPOINTS[event.agentId];
      const home     = HOME[event.agentId];
      const anders   = avatarMap['anders'];

      const deliverReport = () => {
        setAvatarState(avatar, 'idle');
        speak(avatar, doneLine, 5500);
        feedSay(avatar.agentDef, doneLine);

        // Anders acks with a task-aware line
        if (anders && event.agentId !== 'anders') {
          const ackLine = getLine(ACK_LINES, event.agentId, task);
          activeDoneTimers[`${event.agentId}_ack`] = setTimeout(() => {
            delete activeDoneTimers[`${event.agentId}_ack`];
            speak(anders, ackLine, 4500);
            feedSay(anders.agentDef, ackLine);
          }, 2000);
        }

        // Walk home after done line finishes — via aisle paths
        activeDoneTimers[event.agentId] = setTimeout(() => {
          delete activeDoneTimers[event.agentId];
          delete activeTaskDesc[event.agentId]; // clear task context
          if (home) {
            feedAction(avatar.agentDef, 'Returning to desk');
            const cancelHome = walkTo(avatar, home.x, home.z, () => {
              delete activeWalkCancels[event.agentId];
            });
            activeWalkCancels[event.agentId] = cancelHome;
          }
        }, 7000);
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

    case 'strategy-meeting': {
      // event: { agents: ['anders','researcher',...], lines: ['text by agent[0]','text by agent[1]',...] }
      const agentIds = event.agents || [];
      const lines    = event.lines  || [];
      if (agentIds.length === 0) break;

      // Seats evenly spaced around the table — start from south (closest to Anders' desk)
      const TABLE_X  = 1, TABLE_Z = 26, SEAT_R = 5.0;
      const n        = agentIds.length;
      const seats    = agentIds.map((_, i) => {
        const angle = (i / n) * Math.PI * 2 + Math.PI / 2; // south-first
        return { x: TABLE_X + Math.cos(angle) * SEAT_R, z: TABLE_Z + Math.sin(angle) * SEAT_R };
      });

      // Walk all agents to their seats via aisle paths
      agentIds.forEach((id, i) => {
        const a = avatarMap[id];
        if (!a) return;
        cancelAgent(id);
        setAvatarState(a, 'working');
        feedAction(a.agentDef, 'Heading to strategy meeting');
        const cancelWalk = walkTo(a, seats[i].x, seats[i].z, () => {
          delete activeWalkCancels[id];
        });
        activeWalkCancels[id] = cancelWalk;
      });

      // Speak lines in sequence — longer travel for waypoint paths
      const TRAVEL_MS  = 4500;
      const PER_LINE_MS = 5000; // gap between speakers
      lines.forEach((line, i) => {
        const speakerId = agentIds[i % agentIds.length];
        const a         = avatarMap[speakerId];
        if (!a) return;
        setTimeout(() => {
          speak(a, line, 6500);
          feedSay(a.agentDef, line);
        }, TRAVEL_MS + i * PER_LINE_MS);
      });

      // After all lines finish, agents return to their home desks
      const returnAt = TRAVEL_MS + lines.length * PER_LINE_MS + 2000;
      agentIds.forEach((id) => {
        const a    = avatarMap[id];
        const home = HOME[id];
        if (!a || !home) return;
        setTimeout(() => {
          feedAction(a.agentDef, 'Returning to desk');
          setAvatarState(a, 'idle');
          const cancelHome = walkTo(a, home.x, home.z, () => {
            delete activeWalkCancels[id];
          });
          activeWalkCancels[id] = cancelHome;
        }, returnAt);
      });
      break;
    }
  }
}
