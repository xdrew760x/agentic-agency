// ── Agent definitions ──────────────────────────────────────────────────────
// Each agent has a home room and a desk position within that room.
// Positions are in world-space (x, z). Y is computed at runtime.

// Meeting Room: x -35→-13, z -11→11  — content/creative team workspace
// Row 1 (z=0):  Researcher(-31), Copywriter(-24), SEO(-17)     — rotation PI (face south, toward whiteboard)
// Row 2 (z=4):  Onboarder(-28), Email Writer(-20)              — rotation PI
//
// Computer Room: x -8→16, z -12→12  — Anders' command center
// Anders: x=4, z=-7, rotation=0 (face north, toward table + door)
// Round table centered at (4, y, 3)
//
// Design Room: x 18→32, z -12→12
// Tokenizer(21), Image Prompter(28)  — rotation 0

export const AGENTS = [
  // ── Computer Room — Anders' command center ────────────────────────────────
  {
    id:       'anders',
    name:     'Anders',
    role:     'Lead Developer',
    color:    '#3B82F6',
    isLead:   true,
    homeRoom: 'computer',
    deskPos:  { x: 4, z: -7 },
    defaultRotation: 0,
    description: 'Owns all technical decisions, architecture, and project delivery.',
  },

  // ── Meeting Room — content & creative team ────────────────────────────────
  {
    id:       'researcher',
    name:     'Researcher',
    role:     'Researcher',
    color:    '#F59E0B',
    homeRoom: 'meeting',
    deskPos:  { x: -31, z: 0 },
    defaultRotation: Math.PI,
    description: 'Gathers background research, market analysis, and competitor intel.',
  },
  {
    id:       'copywriter',
    name:     'Copywriter',
    role:     'Copywriter',
    color:    '#10B981',
    homeRoom: 'meeting',
    deskPos:  { x: -24, z: 0 },
    defaultRotation: Math.PI,
    description: 'Writes all client-facing web copy for RV parks and real estate.',
  },
  {
    id:       'seo',
    name:     'SEO Analyst',
    role:     'SEO Analyst',
    color:    '#14B8A6',
    homeRoom: 'meeting',
    deskPos:  { x: -17, z: 0 },
    defaultRotation: Math.PI,
    description: 'Audits pages for on-page SEO, local signals, and schema markup.',
  },
  {
    id:       'onboarder',
    name:     'Client Onboarder',
    role:     'Client Onboarder',
    color:    '#EAB308',
    homeRoom: 'meeting',
    deskPos:  { x: -28, z: 4 },
    defaultRotation: Math.PI,
    description: 'Takes raw client intake and produces structured project briefs.',
  },
  {
    id:       'emailwriter',
    name:     'Email Writer',
    role:     'Email Writer',
    color:    '#38BDF8',
    homeRoom: 'meeting',
    deskPos:  { x: -20, z: 4 },
    defaultRotation: Math.PI,
    description: 'Drafts professional client-facing emails — proposals, updates, delivery notes.',
  },

  // ── Design Room ───────────────────────────────────────────────────────────
  {
    id:       'tokenizer',
    name:     'Design Tokenizer',
    role:     'Design Tokenizer',
    color:    '#A855F7',
    homeRoom: 'design',
    deskPos:  { x: 21, z: -2 },
    defaultRotation: 0,
    description: 'Translates brand assets into xpress-2 theme tokens and Tailwind variables.',
  },
  {
    id:       'imageprompter',
    name:     'Image Prompter',
    role:     'Image Prompter',
    color:    '#EC4899',
    homeRoom: 'design',
    deskPos:  { x: 28, z: -2 },
    defaultRotation: 0,
    description: 'Writes AI image prompts for hero images, amenity photos, and listings.',
  },

  // ── Testing Room — Debugger (custom station), Reviewer, Scaffolder ────────
  {
    id:       'reviewer',
    name:     'Code Reviewer',
    role:     'Code Reviewer',
    color:    '#EF4444',
    homeRoom: 'testing',
    deskPos:  { x: 1, z: 23 },
    defaultRotation: 0,
    description: 'Audits code for quality, security, and WordPress coding standards.',
  },
  {
    id:       'scaffolder',
    name:     'Scaffolder',
    role:     'Scaffolder',
    color:    '#F97316',
    homeRoom: 'testing',
    deskPos:  { x: 13, z: 23 },
    defaultRotation: 0,
    description: 'Sets up WordPress client projects using the xpress-2 theme.',
  },
  {
    id:         'debugger',
    name:       'Debugger',
    role:       'Debugger',
    color:      '#DC2626',
    homeRoom:   'testing',
    customDesk: true,
    deskPos:    { x: 7, z: 32 },
    defaultRotation: Math.PI,
    description: 'Diagnoses broken functionality — reads error logs, traces hooks, finds root causes.',
  },
];

// ── Room focus targets for camera ──────────────────────────────────────────
export const ROOMS = {
  meeting: {
    label:     'Meeting Room',
    camTarget: { x: -24, y: 0, z: 0 },
    camAlpha:  -Math.PI / 2,
    camBeta:   Math.PI / 3.2,
    camRadius: 26,
  },
  computer: {
    label:     'Command Center',
    camTarget: { x: 4, y: 0, z: 0 },
    camAlpha:  -Math.PI / 2,
    camBeta:   Math.PI / 3.2,
    camRadius: 24,
  },
  design: {
    label:     'Design Room',
    camTarget: { x: 25, y: 0, z: 0 },
    camAlpha:  -Math.PI / 2,
    camBeta:   Math.PI / 3.2,
    camRadius: 20,
  },
  testing: {
    label:     'Testing Room',
    camTarget: { x: 7, y: 0, z: 27 },
    camAlpha:  -Math.PI / 2,
    camBeta:   Math.PI / 3.2,
    camRadius: 22,
  },
};

// ── Demo activity sequences ────────────────────────────────────────────────
// Actions: speak, think, walkTo, setState, feedAction
export const DEMO_SEQUENCES = [
  {
    trigger: 2000,
    events: [
      { agentId: 'anders',      action: 'think',  text: 'New project request just came in. RV park in Texas. Need to scope this out before anyone starts work.' },
      { agentId: 'debugger',    action: 'think',  text: 'Nothing in the error queue right now. Keeping an eye on the testing room logs.' },
      { agentId: 'copywriter',  action: 'think',  text: 'Quiet morning. Waiting for a brief before I can write anything.' },
    ]
  },
  {
    trigger: 4000,
    events: [
      { agentId: 'anders',      action: 'speak',  text: 'Morning team. New client project today — RV park in Texas.' },
    ]
  },
  {
    trigger: 5500,
    events: [
      { agentId: 'researcher',  action: 'think',  text: 'RV park. Texas. I should look at market size, competitor density, and seasonal booking patterns.' },
      { agentId: 'onboarder',   action: 'think',  text: 'I need intake info from Anders before I can build the brief. What\'s their brand, target audience, differentiators?' },
    ]
  },
  {
    trigger: 7000,
    events: [
      { agentId: 'anders',      action: 'walkTo', pos: { x: -24, z: -2 } },
      { agentId: 'researcher',  action: 'walkTo', pos: { x: -21, z:  3 } },
      { agentId: 'onboarder',   action: 'walkTo', pos: { x: -27, z:  3 } },
      { agentId: 'anders',      action: 'feedAction', text: 'Walking to Meeting Room' },
    ]
  },
  {
    trigger: 10500,
    events: [
      { agentId: 'anders',      action: 'speak',  text: 'Researcher — I need competitor intel on RV parks in central Texas.' },
      { agentId: 'anders',      action: 'think',  text: 'I want to know what we\'re up against before we touch a single line of copy or code.' },
    ]
  },
  {
    trigger: 12500,
    events: [
      { agentId: 'researcher',  action: 'speak',  text: 'Understood. I\'ll pull market data, 10 top competitors, pricing, and amenity trends.' },
      { agentId: 'researcher',  action: 'think',  text: 'Start with Google Maps + TripAdvisor data. Then cross-reference against RV park directories. Should take 4–6 minutes.' },
    ]
  },
  {
    trigger: 14000,
    events: [
      { agentId: 'onboarder',   action: 'speak',  text: 'Anders, what do we know about the client so far?' },
      { agentId: 'anders',      action: 'speak',  text: 'Family-owned, 80 sites, they want a booking-first site. No brand kit yet.' },
      { agentId: 'onboarder',   action: 'think',  text: 'No brand kit. That means I\'ll flag the design tokenizer early. I\'ll draft the brief with placeholder tokens.' },
    ]
  },
  {
    trigger: 17000,
    events: [
      { agentId: 'researcher',  action: 'walkTo', pos: { x: -31, z: 0 } },
      { agentId: 'researcher',  action: 'setState', state: 'working' },
      { agentId: 'researcher',  action: 'feedAction', text: 'Pulling competitor data — Google Maps, TripAdvisor, RVParkReviews.com' },
      { agentId: 'onboarder',   action: 'setState', state: 'working' },
      { agentId: 'onboarder',   action: 'feedAction', text: 'Drafting project brief with client intake data' },
    ]
  },
  {
    trigger: 19000,
    events: [
      { agentId: 'researcher',  action: 'think',  text: 'Seeing a pattern — top competitors all have amenity-heavy homepages. Pet-friendly and pool features dominate CTAs in this market.' },
      { agentId: 'onboarder',   action: 'think',  text: 'Structuring the brief: project goal, target audience (families + retirees), pages needed, tone notes, open questions for client.' },
    ]
  },
  {
    trigger: 22000,
    events: [
      { agentId: 'copywriter',  action: 'think',  text: 'Watching the brief come together. Once I have it I\'ll start with the hero headline — that sets the tone for everything else.' },
      { agentId: 'seo',         action: 'think',  text: 'Making a note: "RV park Texas" is high volume. I\'ll want to weave in "Hill Country" and city-specific terms once copy drafts land.' },
    ]
  },
  {
    trigger: 25000,
    events: [
      { agentId: 'researcher',  action: 'setState', state: 'idle' },
      { agentId: 'researcher',  action: 'speak',  text: 'Done. Found 12 competitors. Top 3 all use booking widgets above the fold.' },
      { agentId: 'researcher',  action: 'think',  text: 'Key insight: none of the competitors have strong mobile experiences. That\'s an opportunity.' },
    ]
  },
  {
    trigger: 27000,
    events: [
      { agentId: 'onboarder',   action: 'setState', state: 'idle' },
      { agentId: 'onboarder',   action: 'speak',  text: 'Brief is ready. 6 pages: Home, Amenities, Sites, Gallery, FAQs, Contact.' },
      { agentId: 'onboarder',   action: 'think',  text: 'I flagged the missing brand kit as a blocker for design tokenizer. Anders needs to chase the client on that.' },
    ]
  },
  {
    trigger: 29500,
    events: [
      { agentId: 'anders',      action: 'walkTo', pos: { x: 4, z: -7 } },
      { agentId: 'anders',      action: 'think',  text: 'Good output from both. Now I need to get copy moving. Copywriter gets the brief, SEO gets looped in on keywords.' },
      { agentId: 'anders',      action: 'speak',  text: 'Copywriter — homepage is first. Hero, intro, amenities preview. Researcher\'s data is yours to use.' },
    ]
  },
  {
    trigger: 32000,
    events: [
      { agentId: 'copywriter',  action: 'setState', state: 'working' },
      { agentId: 'copywriter',  action: 'speak',  text: 'On it. Going for a warm, outdoorsy tone. Booking CTA front and center.' },
      { agentId: 'copywriter',  action: 'think',  text: 'Hero headline options: "Your Texas Adventure Starts Here" or "Where Families Come to Unplug." The second one is stronger.' },
      { agentId: 'seo',         action: 'setState', state: 'working' },
      { agentId: 'seo',         action: 'think',  text: 'Cross-referencing copy brief with keyword data. "RV park near Austin TX" is 2.4k/mo. I\'ll pass target terms to Copywriter.' },
    ]
  },
  {
    trigger: 35000,
    events: [
      { agentId: 'debugger',    action: 'setState', state: 'working' },
      { agentId: 'debugger',    action: 'speak',  text: 'Found a conflict — booking plugin registering a hook that clashes with xpress-2 template loader.' },
      { agentId: 'debugger',    action: 'think',  text: 'The plugin is calling add_action on template_redirect too early. Fix is to wrap it in an init hook. Checking if that breaks any other filters...' },
      { agentId: 'debugger',    action: 'feedAction', text: 'Tracing hook conflict: booking-plugin → template_redirect vs xpress-2 template loader' },
    ]
  },
  {
    trigger: 38000,
    events: [
      { agentId: 'reviewer',    action: 'think',  text: 'Debugger flagged a hook conflict. I should review the fix before it touches the theme. Can\'t let a bad patch slip through.' },
      { agentId: 'reviewer',    action: 'walkTo', pos: { x: 5, z: 27 } },
      { agentId: 'reviewer',    action: 'speak',  text: 'I\'ll review the fix. Send me the diff when it\'s ready.' },
    ]
  },
  {
    trigger: 41000,
    events: [
      { agentId: 'debugger',    action: 'speak',  text: 'Fix is ready. Wrapped the hook in init, added a priority of 20. No other filters affected.' },
      { agentId: 'debugger',    action: 'setState', state: 'idle' },
      { agentId: 'debugger',    action: 'think',  text: 'Clean fix. The priority 20 gives the theme loader enough time to run first. Should be stable.' },
    ]
  },
  {
    trigger: 44000,
    events: [
      { agentId: 'reviewer',    action: 'think',  text: 'Checking: hook priority correct? Yes. Any nonce or capability issues? No. Security escaping on output? Present. Looks good.' },
      { agentId: 'reviewer',    action: 'speak',  text: 'Code reviewed. Logic is sound, security escaping is clean. Approved to merge.' },
      { agentId: 'reviewer',    action: 'setState', state: 'idle' },
      { agentId: 'reviewer',    action: 'walkTo', pos: { x: 1, z: 23 } },
    ]
  },
  {
    trigger: 47000,
    events: [
      { agentId: 'anders',      action: 'think',  text: 'Debug loop closed quickly. Good. Copy and SEO are both working in parallel now. Project is moving.' },
      { agentId: 'anders',      action: 'speak',  text: 'Good work everyone. Copy draft by end of session, then SEO pass before it goes to client.' },
      { agentId: 'copywriter',  action: 'speak',  text: 'Hero copy is done. Moving to amenities section now.' },
      { agentId: 'seo',         action: 'speak',  text: 'Keyword map is ready. I\'ll annotate the copy draft with target terms.' },
    ]
  },
];
