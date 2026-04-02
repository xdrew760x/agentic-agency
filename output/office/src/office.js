import { MeshBuilder, StandardMaterial, Color3, DynamicTexture } from '@babylonjs/core';

// ── Office layout constants ────────────────────────────────────────────────
//
//  ┌───────MEETING (22×22)──────┐  gap  ┌──COMPUTER (24×24)──┐  gap  ┌──DESIGN (14×24)──┐
//  │  cx=-24  z:-11→11          │◄─────►│  cx=4   z:-12→12   │◄─────►│  cx=25  z:-12→12 │
//  │  x:-35→-13                 │       │  x:-8→16            │       │  x:18→32          │
//  │  Whiteboard south wall     │       │  6 workstations     │       │  2 workstations   │
//  └────────────────────────────┘       └────────┬────────────┘       └───────────────────┘
//                                                │ gap
//                                   ┌──────TESTING (26×14)─────────────┐
//                                   │  cx=7  z:20→34  x:-6→20          │
//                                   │  Debugger, Reviewer, Scaffolder   │
//                                   └──────────────────────────────────-┘
//
export const LAYOUT = {
  meeting:  { cx: -24, cz:  0,  xMin: -35, xMax: -13, zMin: -11, zMax:  11 },
  computer: { cx:   4, cz:  0,  xMin:  -8, xMax:  16, zMin: -12, zMax:  12 },
  design:   { cx:  25, cz:  0,  xMin:  18, xMax:  32, zMin: -12, zMax:  12 },
  testing:  { cx:   7, cz: 27,  xMin:  -6, xMax:  20, zMin:  20, zMax:  34 },
  hallH:    { cx: -10.5, cz: 0.5 },  // meeting ↔ computer
  hallV:    { cx:   6,   cz: 16  },  // computer ↔ testing
  hallE:    { cx:  17,   cz:  0  },  // computer ↔ design
};

// Doorway openings (in absolute world coords)
// Meeting east wall  / Computer west wall:  z  -3 →  4
// Computer north wall / Testing south wall: x   0 → 12
// Computer east wall / Design west wall:    z  -4 →  4
const DOOR_MC_ZMIN = -3,  DOOR_MC_ZMAX =  4;
const DOOR_CT_XMIN =  0,  DOOR_CT_XMAX = 12;
const DOOR_CD_ZMIN = -4,  DOOR_CD_ZMAX =  4;

const WH = 5.5;   // wall height
const WT = 0.25;  // wall thickness

// ── Material cache ─────────────────────────────────────────────────────────
const _mats = {};
function mat(scene, key, r, g, b) {
  if (_mats[key]) return _mats[key];
  const m = new StandardMaterial(key, scene);
  m.diffuseColor  = new Color3(r, g, b);
  m.specularColor = new Color3(0.04, 0.04, 0.04);
  _mats[key] = m;
  return m;
}

// ── Primitives ─────────────────────────────────────────────────────────────
function floor(scene, id, cx, cz, w, d, r, g, b) {
  const m = MeshBuilder.CreateBox(id, { width: w, height: 0.18, depth: d }, scene);
  m.position.set(cx, -0.09, cz);
  m.material = mat(scene, id + 'm', r, g, b);
  m.receiveShadows = true;
  return m;
}

// Wall running along X axis (north/south walls)
function wallX(scene, id, z, xMin, xMax) {
  if (xMax <= xMin) return;
  const w = xMax - xMin;
  const m = MeshBuilder.CreateBox(id, { width: w, height: WH, depth: WT }, scene);
  m.position.set((xMin + xMax) / 2, WH / 2, z);
  m.material = mat(scene, 'wallmat', 0.2, 0.2, 0.27);
  m.receiveShadows = true;
  return m;
}

// Wall running along Z axis (east/west walls)
function wallZ(scene, id, x, zMin, zMax) {
  if (zMax <= zMin) return;
  const d = zMax - zMin;
  const m = MeshBuilder.CreateBox(id, { width: WT, height: WH, depth: d }, scene);
  m.position.set(x, WH / 2, (zMin + zMax) / 2);
  m.material = mat(scene, 'wallmat', 0.2, 0.2, 0.27);
  m.receiveShadows = true;
  return m;
}

// Baseboard trim along X
function trimX(scene, id, z, xMin, xMax, side = 1) {
  if (xMax <= xMin) return;
  const m = MeshBuilder.CreateBox(id, { width: xMax - xMin, height: 0.13, depth: 0.06 }, scene);
  m.position.set((xMin + xMax) / 2, 0.065, z + side * 0.02);
  m.material = mat(scene, 'trimmat', 0.25, 0.25, 0.33);
}

// Baseboard trim along Z
function trimZ(scene, id, x, zMin, zMax, side = 1) {
  if (zMax <= zMin) return;
  const m = MeshBuilder.CreateBox(id, { width: 0.06, height: 0.13, depth: zMax - zMin }, scene);
  m.position.set(x + side * 0.02, 0.065, (zMin + zMax) / 2);
  m.material = mat(scene, 'trimmat', 0.25, 0.25, 0.33);
}

// Transparent ceiling
function ceil(scene, id, cx, cz, w, d) {
  const cm = new StandardMaterial(id + '_cm', scene);
  cm.diffuseColor    = new Color3(0.14, 0.14, 0.18);
  cm.alpha           = 0.18;
  cm.backFaceCulling = false;
  const c = MeshBuilder.CreateBox(id, { width: w, height: 0.14, depth: d }, scene);
  c.position.set(cx, WH, cz);
  c.material = cm;
}

// ── Meeting Room ───────────────────────────────────────────────────────────
function buildMeetingRoom(scene) {
  const { xMin, xMax, zMin, zMax, cx, cz } = LAYOUT.meeting;
  const w = xMax - xMin, d = zMax - zMin;

  floor(scene, 'meet_fl', cx, cz, w, d, 0.17, 0.15, 0.20); // warm carpet tone
  ceil(scene, 'meet_ceil', cx, cz, w, d);

  // South wall — full (has whiteboard on it)
  wallX(scene, 'meet_S', zMin, xMin, xMax);
  trimX(scene, 'meet_S_trim', zMin + WT / 2, xMin, xMax, 1);

  // North wall — full
  wallX(scene, 'meet_N', zMax, xMin, xMax);
  trimX(scene, 'meet_N_trim', zMax - WT / 2, xMin, xMax, -1);

  // West wall — full (back wall)
  wallZ(scene, 'meet_W', xMin, zMin, zMax);
  trimZ(scene, 'meet_W_trim', xMin + WT / 2, zMin, zMax, 1);

  // East wall — two segments, doorway at DOOR_MC_ZMIN → DOOR_MC_ZMAX
  wallZ(scene, 'meet_E1', xMax, zMin, DOOR_MC_ZMIN);
  wallZ(scene, 'meet_E2', xMax, DOOR_MC_ZMAX, zMax);
  trimZ(scene, 'meet_E1_trim', xMax - WT / 2, zMin, DOOR_MC_ZMIN);
  trimZ(scene, 'meet_E2_trim', xMax - WT / 2, DOOR_MC_ZMAX, zMax);

  // Door header beam above opening
  const dhm = MeshBuilder.CreateBox('meet_door_header', { width: WT, height: 0.35, depth: DOOR_MC_ZMAX - DOOR_MC_ZMIN }, scene);
  dhm.position.set(xMax, WH - 0.175, (DOOR_MC_ZMIN + DOOR_MC_ZMAX) / 2);
  dhm.material = mat(scene, 'wallmat', 0.2, 0.2, 0.27);
}

// ── Computer Room ──────────────────────────────────────────────────────────
function buildComputerRoom(scene) {
  const { xMin, xMax, zMin, zMax, cx, cz } = LAYOUT.computer;
  const w = xMax - xMin, d = zMax - zMin;

  floor(scene, 'comp_fl', cx, cz, w, d, 0.14, 0.14, 0.19);
  ceil(scene, 'comp_ceil', cx, cz, w, d);

  // South wall — full
  wallX(scene, 'comp_S', zMin, xMin, xMax);
  trimX(scene, 'comp_S_trim', zMin + WT / 2, xMin, xMax, 1);

  // North wall — doorway at DOOR_CT_XMIN → DOOR_CT_XMAX
  wallX(scene, 'comp_N1', zMax, xMin, DOOR_CT_XMIN);
  wallX(scene, 'comp_N2', zMax, DOOR_CT_XMAX, xMax);
  trimX(scene, 'comp_N1_trim', zMax - WT / 2, xMin, DOOR_CT_XMIN);
  trimX(scene, 'comp_N2_trim', zMax - WT / 2, DOOR_CT_XMAX, xMax);

  // Door header above north opening
  const nhd = MeshBuilder.CreateBox('comp_N_header', { width: DOOR_CT_XMAX - DOOR_CT_XMIN, height: 0.35, depth: WT }, scene);
  nhd.position.set((DOOR_CT_XMIN + DOOR_CT_XMAX) / 2, WH - 0.175, zMax);
  nhd.material = mat(scene, 'wallmat', 0.2, 0.2, 0.27);

  // East wall — doorway to design room at DOOR_CD_ZMIN → DOOR_CD_ZMAX
  wallZ(scene, 'comp_E1', xMax, zMin, DOOR_CD_ZMIN);
  wallZ(scene, 'comp_E2', xMax, DOOR_CD_ZMAX, zMax);
  trimZ(scene, 'comp_E1_trim', xMax - WT / 2, zMin, DOOR_CD_ZMIN);
  trimZ(scene, 'comp_E2_trim', xMax - WT / 2, DOOR_CD_ZMAX, zMax);

  const edhc = MeshBuilder.CreateBox('comp_E_header', { width: WT, height: 0.35, depth: DOOR_CD_ZMAX - DOOR_CD_ZMIN }, scene);
  edhc.position.set(xMax, WH - 0.175, (DOOR_CD_ZMIN + DOOR_CD_ZMAX) / 2);
  edhc.material = mat(scene, 'wallmat', 0.2, 0.2, 0.27);

  // West wall — doorway matching meeting room: DOOR_MC_ZMIN → DOOR_MC_ZMAX
  wallZ(scene, 'comp_W1', xMin, zMin, DOOR_MC_ZMIN);
  wallZ(scene, 'comp_W2', xMin, DOOR_MC_ZMAX, zMax);
  trimZ(scene, 'comp_W1_trim', xMin + WT / 2, zMin, DOOR_MC_ZMIN);
  trimZ(scene, 'comp_W2_trim', xMin + WT / 2, DOOR_MC_ZMAX, zMax);

  const wdhc = MeshBuilder.CreateBox('comp_W_header', { width: WT, height: 0.35, depth: DOOR_MC_ZMAX - DOOR_MC_ZMIN }, scene);
  wdhc.position.set(xMin, WH - 0.175, (DOOR_MC_ZMIN + DOOR_MC_ZMAX) / 2);
  wdhc.material = mat(scene, 'wallmat', 0.2, 0.2, 0.27);
}

// ── Testing Room ───────────────────────────────────────────────────────────
function buildTestingRoom(scene) {
  const { xMin, xMax, zMin, zMax, cx, cz } = LAYOUT.testing;
  const w = xMax - xMin, d = zMax - zMin;

  floor(scene, 'test_fl', cx, cz, w, d, 0.12, 0.10, 0.15); // darker lab floor
  ceil(scene, 'test_ceil', cx, cz, w, d);

  // North wall — full
  wallX(scene, 'test_N', zMax, xMin, xMax);
  trimX(scene, 'test_N_trim', zMax - WT / 2, xMin, xMax);

  // South wall — doorway at DOOR_CT_XMIN → DOOR_CT_XMAX
  wallX(scene, 'test_S1', zMin, xMin, DOOR_CT_XMIN);
  wallX(scene, 'test_S2', zMin, DOOR_CT_XMAX, xMax);
  trimX(scene, 'test_S1_trim', zMin + WT / 2, xMin, DOOR_CT_XMIN);
  trimX(scene, 'test_S2_trim', zMin + WT / 2, DOOR_CT_XMAX, xMax);

  const shd = MeshBuilder.CreateBox('test_S_header', { width: DOOR_CT_XMAX - DOOR_CT_XMIN, height: 0.35, depth: WT }, scene);
  shd.position.set((DOOR_CT_XMIN + DOOR_CT_XMAX) / 2, WH - 0.175, zMin);
  shd.material = mat(scene, 'wallmat', 0.2, 0.2, 0.27);

  // West wall — full
  wallZ(scene, 'test_W', xMin, zMin, zMax);
  trimZ(scene, 'test_W_trim', xMin + WT / 2, zMin, zMax);

  // East wall — full
  wallZ(scene, 'test_E', xMax, zMin, zMax);
  trimZ(scene, 'test_E_trim', xMax - WT / 2, zMin, zMax);
}

// ── Design Room ────────────────────────────────────────────────────────────
function buildDesignRoom(scene) {
  const { xMin, xMax, zMin, zMax, cx, cz } = LAYOUT.design;
  const w = xMax - xMin, d = zMax - zMin;

  floor(scene, 'design_fl', cx, cz, w, d, 0.14, 0.12, 0.20); // cool purple-tinted carpet
  ceil(scene, 'design_ceil', cx, cz, w, d);

  // South wall — full
  wallX(scene, 'design_S', zMin, xMin, xMax);
  trimX(scene, 'design_S_trim', zMin + WT / 2, xMin, xMax, 1);

  // North wall — full
  wallX(scene, 'design_N', zMax, xMin, xMax);
  trimX(scene, 'design_N_trim', zMax - WT / 2, xMin, xMax, -1);

  // East wall — full (far wall)
  wallZ(scene, 'design_E', xMax, zMin, zMax);
  trimZ(scene, 'design_E_trim', xMax - WT / 2, zMin, zMax);

  // West wall — doorway at DOOR_CD_ZMIN → DOOR_CD_ZMAX (connection to computer room)
  wallZ(scene, 'design_W1', xMin, zMin, DOOR_CD_ZMIN);
  wallZ(scene, 'design_W2', xMin, DOOR_CD_ZMAX, zMax);
  trimZ(scene, 'design_W1_trim', xMin + WT / 2, zMin, DOOR_CD_ZMIN, 1);
  trimZ(scene, 'design_W2_trim', xMin + WT / 2, DOOR_CD_ZMAX, zMax, 1);

  const wdhd = MeshBuilder.CreateBox('design_W_header', { width: WT, height: 0.35, depth: DOOR_CD_ZMAX - DOOR_CD_ZMIN }, scene);
  wdhd.position.set(xMin, WH - 0.175, (DOOR_CD_ZMIN + DOOR_CD_ZMAX) / 2);
  wdhd.material = mat(scene, 'wallmat', 0.2, 0.2, 0.27);
}

// ── Corridor floors ────────────────────────────────────────────────────────
function buildCorridors(scene) {
  // Horizontal: meeting ↔ computer (x: -13→-8, z: DOOR_MC_ZMIN→DOOR_MC_ZMAX)
  const hw = LAYOUT.computer.xMin - LAYOUT.meeting.xMax; // 5
  const hd = DOOR_MC_ZMAX - DOOR_MC_ZMIN;                // 7
  const hcx = (LAYOUT.meeting.xMax + LAYOUT.computer.xMin) / 2; // -10.5
  const hcz = (DOOR_MC_ZMIN + DOOR_MC_ZMAX) / 2;               // 0.5
  floor(scene, 'hall_H', hcx, hcz, hw, hd, 0.13, 0.13, 0.18);

  // Vertical: computer ↔ testing (z: 12→20, x: DOOR_CT_XMIN→DOOR_CT_XMAX)
  const vw = DOOR_CT_XMAX - DOOR_CT_XMIN;                       // 12
  const vd = LAYOUT.testing.zMin - LAYOUT.computer.zMax;        // 20 - 12 = 8
  const vcx = (DOOR_CT_XMIN + DOOR_CT_XMAX) / 2;               // 6
  const vcz = (LAYOUT.computer.zMax + LAYOUT.testing.zMin) / 2; // 16
  floor(scene, 'hall_V', vcx, vcz, vw, vd, 0.13, 0.13, 0.18);

  // East: computer ↔ design (x: 16→18, z: DOOR_CD_ZMIN→DOOR_CD_ZMAX)
  const edw = LAYOUT.design.xMin - LAYOUT.computer.xMax; // 2
  const edd = DOOR_CD_ZMAX - DOOR_CD_ZMIN;               // 8
  const ecx = (LAYOUT.computer.xMax + LAYOUT.design.xMin) / 2; // 17
  const ecz = (DOOR_CD_ZMIN + DOOR_CD_ZMAX) / 2;               // 0
  floor(scene, 'hall_E', ecx, ecz, edw, edd, 0.13, 0.13, 0.18);
}

// ── Whiteboard (on south wall of meeting room) ─────────────────────────────
export function buildWhiteboard(scene) {
  const boardTex = new DynamicTexture('wb_tex', { width: 640, height: 320 }, scene);
  const ctx = boardTex.getContext();

  ctx.fillStyle = '#f5f5f0';
  ctx.fillRect(0, 0, 640, 320);

  ctx.fillStyle = '#1a1a2e';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('AGENTIC AGENCY', 28, 56);

  ctx.fillStyle = '#3B82F6';
  ctx.font = '19px monospace';
  ctx.fillText('[ Active Project ]', 28, 96);

  ctx.fillStyle = '#6b6b8a';
  ctx.font = '15px monospace';
  ctx.fillText('Waiting for instructions...', 28, 138);
  boardTex.update();

  const boardMat = new StandardMaterial('wb_mat', scene);
  boardMat.diffuseTexture  = boardTex;
  boardMat.emissiveColor   = new Color3(0.65, 0.65, 0.62);
  boardMat.backFaceCulling = false; // visible from both sides

  // Place on south wall (zMin = -11), facing north into the room
  const { cx: mcx, zMin } = LAYOUT.meeting;
  const board = MeshBuilder.CreatePlane('whiteboard', { width: 7, height: 3.5 }, scene);
  board.position.set(mcx, 3.6, zMin + 0.18);
  board.rotation.y = Math.PI; // face north (into room)
  board.material   = boardMat;

  // Frame around board
  const frameMat = new StandardMaterial('wb_frame_mat', scene);
  frameMat.diffuseColor = new Color3(0.13, 0.13, 0.18);
  const frame = MeshBuilder.CreateBox('wb_frame_mesh', { width: 7.5, height: 4.0, depth: 0.12 }, scene);
  frame.position.set(mcx, 3.6, zMin + 0.12);
  frame.material = frameMat;

  return { board, boardTex };
}

// ── Floor labels ───────────────────────────────────────────────────────────
function buildFloorLabel(scene, text, cx, cz) {
  const tex = new DynamicTexture(`fl_${text}`, { width: 320, height: 64 }, scene);
  const ctx = tex.getContext();
  ctx.clearRect(0, 0, 320, 64);
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = 'rgba(110,120,190,0.45)';
  ctx.textAlign = 'center';
  ctx.fillText(text, 160, 42);
  tex.update();

  const m = new StandardMaterial(`fl_mat_${text}`, scene);
  m.diffuseTexture  = tex;
  m.emissiveTexture = tex;
  m.emissiveColor   = new Color3(1, 1, 1);
  m.useAlphaFromDiffuseTexture = true;
  m.alpha = 0.55;

  const p = MeshBuilder.CreatePlane(`fl_plane_${text}`, { width: 8, height: 1.6 }, scene);
  p.rotation.x = Math.PI / 2;
  p.position.set(cx, 0.02, cz);
  p.material = m;
}

// ── Full office build ──────────────────────────────────────────────────────
export function buildOffice(scene, shadows) {
  buildMeetingRoom(scene);
  buildComputerRoom(scene);
  buildDesignRoom(scene);
  buildTestingRoom(scene);
  buildCorridors(scene);

  buildFloorLabel(scene, 'RESEARCH & COPY', LAYOUT.meeting.cx,  3);
  buildFloorLabel(scene, 'COMMAND CENTER', LAYOUT.computer.cx, -9);
  buildFloorLabel(scene, 'DESIGN ROOM',   LAYOUT.design.cx,    3);
  buildFloorLabel(scene, 'TESTING ROOM',  LAYOUT.testing.cx,   LAYOUT.testing.cz);

  const wb = buildWhiteboard(scene);
  return { whiteboard: wb };
}
