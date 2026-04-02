import { SceneLoader }            from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { AdvancedDynamicTexture } from '@babylonjs/gui';
import { AGENTS }                           from './agentData.js';
import { createScene }                      from './scene.js';
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

// ── Load the GLB office model ──────────────────────────────────────────────
async function init() {
  try {
    const result = await SceneLoader.ImportMeshAsync(
      '',               // all meshes
      '/models/',       // path
      'mersus_office.glb', // file
      scene,
    );

    // Scale the office model to fit the agent layout (~4x)
    const root = result.meshes[0]; // __root__ transform
    root.scaling.setAll(4);

    // Enable shadows + make ceiling transparent so we can see inside
    result.meshes.forEach(mesh => {
      mesh.receiveShadows = true;
      if (mesh.getTotalVertices() > 0) {
        shadows.addShadowCaster(mesh);
      }
      // Hide ceiling tiles so we can see inside the office
      if (mesh.name.toLowerCase().includes('ceiling')) {
        mesh.isVisible = false;
      }
    });

    // Log mesh names and bounding info so we can map rooms
    console.log('[office] GLB loaded —', result.meshes.length, 'meshes');
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    result.meshes.forEach(m => {
      if (m.name === '__root__' || m.getTotalVertices() === 0) {
        console.log('  mesh:', m.name, '(transform only)');
        return;
      }
      m.computeWorldMatrix(true);
      const bi = m.getBoundingInfo();
      const bMin = bi.boundingBox.minimumWorld;
      const bMax = bi.boundingBox.maximumWorld;
      if (bMin.x < minX) minX = bMin.x;
      if (bMin.y < minY) minY = bMin.y;
      if (bMin.z < minZ) minZ = bMin.z;
      if (bMax.x > maxX) maxX = bMax.x;
      if (bMax.y > maxY) maxY = bMax.y;
      if (bMax.z > maxZ) maxZ = bMax.z;
      const cx = ((bMin.x + bMax.x) / 2).toFixed(1);
      const cy = ((bMin.y + bMax.y) / 2).toFixed(1);
      const cz = ((bMin.z + bMax.z) / 2).toFixed(1);
      const sx = (bMax.x - bMin.x).toFixed(1);
      const sy = (bMax.y - bMin.y).toFixed(1);
      const sz = (bMax.z - bMin.z).toFixed(1);
      console.log(`  mesh: ${m.name} | center:(${cx},${cy},${cz}) | size:(${sx}x${sy}x${sz})`);
    });

    console.log(`[office] TOTAL BOUNDS: min(${minX.toFixed(1)},${minY.toFixed(1)},${minZ.toFixed(1)}) max(${maxX.toFixed(1)},${maxY.toFixed(1)},${maxZ.toFixed(1)}) size: ${(maxX-minX).toFixed(1)} x ${(maxY-minY).toFixed(1)} x ${(maxZ-minZ).toFixed(1)}`);

    // Expose scene for debugging desk positions
    window.__scene = scene;
    window.__result = result;

  } catch (err) {
    console.error('[office] Failed to load GLB model:', err);
  }

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
  connectEventStream(avatarMap, null);

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
      animateCamera(camera, { alpha: -1.3, beta: 1.22, radius: 6.5, target: { x: 4, y: 0.5, z: -3 } });
    }
  });
}

init();

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
