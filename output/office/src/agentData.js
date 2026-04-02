// ── Agent definitions ──────────────────────────────────────────────────────
// Each agent is placed at an exact swivel-chair position with rotation
// computed to face the nearest computer monitor.
//
// Paired seats extracted from GLB mesh vertex clusters (4x scale):
//  Seat 0: chair(-8.7,-8.0) → mon(-9.5,-8.2)  rot=-1.816
//  Seat 1: chair(-3.1,-8.0) → mon(-3.8,-8.2)  rot=-1.849
//  Seat 2: chair(-8.5,-6.0) → mon(-8.8,-5.5)  rot=-0.540
//  Seat 3: chair( 2.6,-5.4) → mon( 2.1,-6.2)  rot=-2.583
//  Seat 4: chair(-8.8,-3.3) → mon(-8.3,-3.5)  rot= 1.951
//  Seat 5: chair(-2.6,-0.9) → mon(-3.0,-3.4)  rot=-2.983
//  Seat 6: chair( 4.1,-21)  → mon( 6.3,-21.1) rot= 1.616
//  Seat 7: chair(10.8,-20.1)→ mon( 9.2,-21.1) rot=-2.129
//  Seat 8: chair( 7.8,-14)  → mon( 9.5,-15.8) rot= 2.385
//  Seat 9: chair(-2.9, 9.4) → mon(-2.8, 9.9)  rot= 0.197
//  Seat10: chair(-9.4, 9.4) → mon(-9.2,10.2)  rot= 0.245

export const AGENTS = [
  // ── Anders — Lead Dev, center desk ───────────────────────────────────────
  {
    id:       'anders',
    name:     'Anders',
    role:     'Lead Developer',
    color:    '#3B82F6', 
    isLead:   true,
    homeRoom: 'main',
    deskPos:  { x: -2, z: -1 },
    defaultRotation: -3.2,
    description: 'Owns all technical decisions, architecture, and project delivery.',
  },

  // ── Content & creative team — center cluster ─────────────────────────────
  {
    id:       'researcher',
    name:     'Researcher',
    role:     'Researcher',
    color:    '#F59E0B',
    homeRoom: 'main',
    deskPos:  { x: -7, z: -7.5 },
    defaultRotation: 0,
    description: 'Gathers background research, market analysis, and competitor intel.',
  },
  {
    id:       'copywriter',
    name:     'Copywriter',
    role:     'Copywriter',
    color:    '#10B981',
    homeRoom: 'main',
    deskPos:  { x: -2.5, z: -7.5 },
    defaultRotation: 0,
    description: 'Writes all client-facing web copy for RV parks and real estate.',
  },
  {
    id:       'seo',
    name:     'SEO Analyst',
    role:     'SEO Analyst',
    color:    '#14B8A6',
    homeRoom: 'main',
    deskPos:  { x: -10.0, z: -24.5 },
    defaultRotation: -5,
    description: 'Audits pages for on-page SEO, local signals, and schema markup.',
  },
  {
    id:       'onboarder',
    name:     'Client Onboarder',
    role:     'Client Onboarder',
    color:    '#EAB308',
    homeRoom: 'main',
    deskPos:  { x: 2.8, z: -4.5 },
    defaultRotation: -1.583,
    description: 'Takes raw client intake and produces structured project briefs.',
  },
  {
    id:       'emailwriter',
    name:     'Email Writer',
    role:     'Email Writer',
    color:    '#38BDF8',
    homeRoom: 'main',
    deskPos:  { x: -7.4, z: -1.8 },
    defaultRotation: 9.3,
    description: 'Drafts professional client-facing emails — proposals, updates, delivery notes.',
  },

  // ── Design team — north workstation row ───────────────────────────────────
  {
    id:       'tokenizer',
    name:     'Design Tokenizer',
    role:     'Design Tokenizer',
    color:    '#A855F7',
    homeRoom: 'north',
    deskPos:  { x: -8, z: 7.5 },
    defaultRotation: 0.345,
    description: 'Translates brand assets into xpress-2 theme tokens and Tailwind variables.',
  },
  {
    id:       'imageprompter',
    name:     'Image Prompter',
    role:     'Image Prompter',
    color:    '#EC4899',
    homeRoom: 'north',
    deskPos:  { x: -2.5, z: 7.5 },
    defaultRotation: 0.345,
    description: 'Writes AI image prompts for hero images, amenity photos, and listings.',
  },

  // ── QA / build team — east wing ───────────────────────────────────────────
  {
    id:       'reviewer',
    name:     'Code Reviewer',
    role:     'Code Reviewer',
    color:    '#EF4444',
    homeRoom: 'east',
    deskPos:  { x: 3.1, z: -17.5 },
    defaultRotation: 1.216,
    description: 'Audits code for quality, security, and WordPress coding standards.',
  },
  {
    id:       'scaffolder',
    name:     'Scaffolder',
    role:     'Scaffolder',
    color:    '#F97316',
    homeRoom: 'east',
    deskPos:  { x: 9.6, z: -16.5 },
    defaultRotation: -2.129,
    description: 'Sets up WordPress client projects using the xpress-2 theme.',
  },
  {
    id:         'debugger',
    name:       'Debugger',
    role:       'Debugger',
    color:      '#DC2626',
    homeRoom:   'east',
    deskPos:    { x: 6.5, z: -11 },
    defaultRotation: 3,
    description: 'Diagnoses broken functionality — reads error logs, traces hooks, finds root causes.',
  },
];

// ── Reporting waypoints — agents walk to Anders' area to deliver reports ────
const ANDERS_AREA = { x: 2, z: -2 };
export const REPORT_WAYPOINTS = {
  researcher:    ANDERS_AREA,
  copywriter:    ANDERS_AREA,
  seo:           ANDERS_AREA,
  onboarder:     ANDERS_AREA,
  emailwriter:   ANDERS_AREA,
  tokenizer:     ANDERS_AREA,
  imageprompter: ANDERS_AREA,
  reviewer:      ANDERS_AREA,
  scaffolder:    ANDERS_AREA,
  debugger:      ANDERS_AREA,
  anders:        null,
};

// ── Room focus targets for camera ──────────────────────────────────────────
export const ROOMS = {
  main: {
    label:     'Main Office',
    camTarget: { x: -4, y: 1, z: -4 },
    camAlpha:  -Math.PI / 2,
    camBeta:   Math.PI / 3.2,
    camRadius: 24,
  },
  north: {
    label:     'Design Area',
    camTarget: { x: -6, y: 1, z: 9 },
    camAlpha:  -Math.PI / 2,
    camBeta:   Math.PI / 3.2,
    camRadius: 16,
  },
  east: {
    label:     'QA Station',
    camTarget: { x: 7, y: 1, z: -18 },
    camAlpha:  -Math.PI / 2,
    camBeta:   Math.PI / 3.2,
    camRadius: 16,
  },
  meeting: {
    label:     'Meeting Table',
    camTarget: { x: 1, y: 1, z: 26 },
    camAlpha:  -Math.PI / 2,
    camBeta:   Math.PI / 3.2,
    camRadius: 12,
  },
};

// ── Demo activity sequences (kept for reference — not auto-played) ─────────
const DEMO_SEQUENCES = [];
