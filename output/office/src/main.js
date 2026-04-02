import { AdvancedDynamicTexture } from '@babylonjs/gui';
import { AGENTS }                           from './agentData.js';
import { createScene }                      from './scene.js';
import { buildOffice }                      from './office.js';
import { buildFurniture, buildWorkstation } from './furniture.js';
import { createAvatar, hexToColor3 }        from './avatar.js';
import {
  buildStatusPanel, showInfoCard,
} from './behaviors.js';
import { connectEventStream } from './eventClient.js';

// ── Bootstrap ─────────────────────────────────────────────────────────────
const canvas = document.getElementById('renderCanvas');
const { engine, scene, camera, shadows } = createScene(canvas);

// ── Full-screen GUI layer ──────────────────────────────────────────────────
const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);

// ── Build world ────────────────────────────────────────────────────────────
const { whiteboard } = buildOffice(scene, shadows);
buildFurniture(scene, shadows);

// Build workstations — desk is placed 1.4 units in the direction the avatar faces
// Facing south (rotation PI): deskZ = z - 1.4
// Facing north (rotation 0):  deskZ = z + 1.4
// Debugger skipped — custom gear built in buildTestingRoom (customDesk: true)
AGENTS.forEach(a => {
  if (a.customDesk) return;
  const dir   = (a.defaultRotation === Math.PI) ? -1 : 1;
  const deskZ = a.deskPos.z + dir * 1.4;
  buildWorkstation(scene, {
    id:          a.id,
    x:           a.deskPos.x,
    z:           deskZ,
    screenColor: hexToColor3(a.color),
    shadows,
  });
});

// ── Spawn all avatars ──────────────────────────────────────────────────────
const avatarMap = {}; // id → avatar object

AGENTS.forEach(agentDef => {
  const avatar = createAvatar(scene, agentDef, guiTexture, shadows, (def) => {
    const av = avatarMap[def.id];
    showInfoCard(def, av?.state ?? 'idle');
  });
  avatarMap[agentDef.id] = avatar;
});

// Build the DOM status panel
buildStatusPanel(AGENTS);

// ── Live event stream ──────────────────────────────────────────────────────
// Connects to the office event server (via Vite proxy /api/events).
// Avatars animate in real time as Claude delegates to subagents.
connectEventStream(avatarMap);

// ── Double-click a floor area → focus camera on that room ─────────────────
scene.onPointerObservable.add(evt => {
  if (evt.type !== 64) return; // POINTERDOUBLETAP = 64
  const pick = scene.pick(scene.pointerX, scene.pointerY);
  if (!pick.hit) return;

  const name = pick.pickedMesh?.name ?? '';

  if (name.includes('meet')) {
    animateCamera(camera, { alpha: -Math.PI / 2, beta: Math.PI / 3.2, radius: 26, target: { x: -24, y: 0, z: 0 } });
  } else if (name.includes('design')) {
    animateCamera(camera, { alpha: -Math.PI / 2, beta: Math.PI / 3.2, radius: 20, target: { x: 25, y: 0, z: 0 } });
  } else if (name.includes('test')) {
    animateCamera(camera, { alpha: -Math.PI / 2, beta: Math.PI / 3.2, radius: 22, target: { x: 7, y: 0, z: 27 } });
  } else if (name.includes('comp') || name.includes('desk') || name.includes('mon')) {
    animateCamera(camera, { alpha: -Math.PI / 2, beta: Math.PI / 3.2, radius: 24, target: { x: 4, y: 0, z: 0 } });
  }
});

// ── Smooth camera transition ───────────────────────────────────────────────
function animateCamera(cam, to) {
  let t = 0;
  const startAlpha  = cam.alpha;
  const startBeta   = cam.beta;
  const startRadius = cam.radius;
  const startTx     = cam.target.x;
  const startTy     = cam.target.y;
  const startTz     = cam.target.z;

  const obs = scene.onBeforeRenderObservable.add(() => {
    t += 0.04;
    const k    = Math.min(t, 1);
    const ease = 1 - Math.pow(1 - k, 3);

    cam.alpha    = lerp(startAlpha,  to.alpha,  ease);
    cam.beta     = lerp(startBeta,   to.beta,   ease);
    cam.radius   = lerp(startRadius, to.radius, ease);
    cam.target.x = lerp(startTx, to.target.x, ease);
    cam.target.y = lerp(startTy, to.target.y, ease);
    cam.target.z = lerp(startTz, to.target.z, ease);

    if (k >= 1) scene.onBeforeRenderObservable.remove(obs);
  });
}

function lerp(a, b, t) { return a + (b - a) * t; }

// ── Render loop ───────────────────────────────────────────────────────────
engine.runRenderLoop(() => scene.render());
window.addEventListener('resize', () => engine.resize());
