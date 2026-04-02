import { MeshBuilder, StandardMaterial, Color3, Vector3 } from '@babylonjs/core';

function mat(scene, name, color, emissive) {
  const m = new StandardMaterial(name, scene);
  m.diffuseColor  = color instanceof Color3 ? color : new Color3(...color);
  m.specularColor = new Color3(0.1, 0.1, 0.1);
  if (emissive) m.emissiveColor = emissive instanceof Color3 ? emissive : new Color3(...emissive);
  return m;
}

// ── Round conference table — in the computer room (Anders' command center) ──
function buildMeetingTable(scene) {
  const tableMat  = mat(scene, 'table_top', new Color3(0.22, 0.18, 0.14));
  const legMat    = mat(scene, 'table_leg', new Color3(0.15, 0.15, 0.18));

  // Round table centered in computer room (cx=4, offset north so Anders can see it from his desk)
  const TABLE_X = 4, TABLE_Z = 3;

  const top = MeshBuilder.CreateCylinder('meeting_table', {
    diameter: 5.5, height: 0.12, tessellation: 32,
  }, scene);
  top.position.set(TABLE_X, 0.84, TABLE_Z);
  top.material = tableMat;
  top.receiveShadows = true;

  // Single pedestal leg
  const leg = MeshBuilder.CreateCylinder('meeting_table_leg', {
    diameter: 0.3, height: 0.84, tessellation: 8,
  }, scene);
  leg.position.set(TABLE_X, 0.42, TABLE_Z);
  leg.material = legMat;

  // Chairs around table
  const chairMat  = mat(scene, 'chair_seat', new Color3(0.1, 0.12, 0.2));
  const chairBack = mat(scene, 'chair_back', new Color3(0.12, 0.14, 0.22));

  const chairCount  = 8;
  const chairRadius = 3.5;
  for (let i = 0; i < chairCount; i++) {
    const angle = (i / chairCount) * Math.PI * 2;
    const cx = TABLE_X + Math.cos(angle) * chairRadius;
    const cz = TABLE_Z + Math.sin(angle) * chairRadius;

    const seat = MeshBuilder.CreateBox(`chair_seat_${i}`, { width: 0.7, height: 0.08, depth: 0.7 }, scene);
    seat.position.set(cx, 0.5, cz);
    seat.material = chairMat;

    const back = MeshBuilder.CreateBox(`chair_back_${i}`, { width: 0.7, height: 0.6, depth: 0.07 }, scene);
    back.position.set(cx - Math.cos(angle) * 0.32, 0.85, cz - Math.sin(angle) * 0.32);
    back.rotation.y = -angle;
    back.material = chairBack;

    const cleg = MeshBuilder.CreateCylinder(`chair_leg_${i}`, { diameter: 0.08, height: 0.5, tessellation: 6 }, scene);
    cleg.position.set(cx, 0.25, cz);
    cleg.material = legMat;
  }
}

// ── Computer workstations ─────────────────────────────────────────────────
export function buildWorkstation(scene, { id, x, z, screenColor, shadows, facingNorth = false }) {
  const deskMat   = new StandardMaterial(`desk_mat_${id}`, scene);
  deskMat.diffuseColor = new Color3(0.16, 0.16, 0.22);

  const monMat    = new StandardMaterial(`mon_mat_${id}`, scene);
  monMat.diffuseColor  = new Color3(0.05, 0.05, 0.08);
  monMat.emissiveColor = screenColor
    ? new Color3(screenColor.r * 0.25, screenColor.g * 0.25, screenColor.b * 0.25)
    : new Color3(0.02, 0.04, 0.08);
  monMat.specularColor = new Color3(0.2, 0.2, 0.2);

  // Desk surface
  const desk = MeshBuilder.CreateBox(`desk_${id}`, { width: 2.2, height: 0.08, depth: 1.1 }, scene);
  desk.position.set(x, 0.72, z);
  desk.material = deskMat;
  desk.receiveShadows = true;
  shadows?.addShadowCaster(desk);

  // Desk legs
  const legM = new StandardMaterial(`desk_leg_mat_${id}`, scene);
  legM.diffuseColor = new Color3(0.1, 0.1, 0.14);
  [[-0.9, -0.4], [0.9, -0.4], [-0.9, 0.4], [0.9, 0.4]].forEach(([dx, dz], i) => {
    const l = MeshBuilder.CreateBox(`desk_leg_${id}_${i}`, { width: 0.07, height: 0.72, depth: 0.07 }, scene);
    l.position.set(x + dx, 0.36, z + dz);
    l.material = legM;
  });

  // For south-facing avatars: monitor on far (south) side, keyboard on near (north) side.
  // For north-facing avatars (facingNorth): flipped — monitor far (north), keyboard near (south).
  const monZ = facingNorth ? z + 0.3 : z - 0.3;
  const kbZ  = facingNorth ? z - 0.15 : z + 0.15;

  // Monitor
  const mon = MeshBuilder.CreateBox(`mon_${id}`, { width: 1.1, height: 0.7, depth: 0.06 }, scene);
  mon.position.set(x, 1.24, monZ);
  mon.material = monMat;
  shadows?.addShadowCaster(mon);

  // Monitor stand
  const standM = new StandardMaterial(`stand_mat_${id}`, scene);
  standM.diffuseColor = new Color3(0.08, 0.08, 0.1);
  const stand = MeshBuilder.CreateBox(`stand_${id}`, { width: 0.1, height: 0.28, depth: 0.1 }, scene);
  stand.position.set(x, 0.9, monZ);
  stand.material = standM;

  // Keyboard
  const kbMat = new StandardMaterial(`kb_mat_${id}`, scene);
  kbMat.diffuseColor = new Color3(0.12, 0.12, 0.16);
  const kb = MeshBuilder.CreateBox(`kb_${id}`, { width: 0.9, height: 0.03, depth: 0.32 }, scene);
  kb.position.set(x, 0.78, kbZ);
  kb.material = kbMat;

  return { desk, mon };
}

// ── Testing room equipment ─────────────────────────────────────────────────
function buildTestingRoom(scene, shadows) {
  // Status light panel — right side of desk surface, away from avatar center
  const lightColors = [
    { name: 'red_light',   color: new Color3(1, 0.1, 0.1), x: 7.6, on: true  },
    { name: 'amber_light', color: new Color3(1, 0.6, 0.0), x: 8.0, on: false },
    { name: 'green_light', color: new Color3(0.1, 1, 0.2), x: 8.4, on: false },
  ];

  const lightMats = {};
  lightColors.forEach(({ name, color, x, on }) => {
    const lMat = new StandardMaterial(`${name}_mat`, scene);
    lMat.diffuseColor  = on ? color : new Color3(color.r * 0.15, color.g * 0.15, color.b * 0.15);
    lMat.emissiveColor = on ? color : new Color3(0, 0, 0);
    const light = MeshBuilder.CreateSphere(name, { diameter: 0.14, segments: 8 }, scene);
    light.position.set(x, 0.84, 33.15);
    light.material = lMat;
    lightMats[name] = lMat;
  });

  // Rack unit — against east wall (xMax=20, inner face=19.875), center of room depth
  const rackMat = new StandardMaterial('rack_mat', scene);
  rackMat.diffuseColor = new Color3(0.1, 0.1, 0.12);
  const rack = MeshBuilder.CreateBox('rack', { width: 0.6, height: 2.0, depth: 0.8 }, scene);
  rack.position.set(19.5, 1.0, 27);
  rack.material = rackMat;

  // Rack LED strips — on south face of rack (27-0.4=26.6)
  for (let i = 0; i < 5; i++) {
    const ledMat = new StandardMaterial(`rack_led_${i}`, scene);
    ledMat.emissiveColor = i % 2 === 0 ? new Color3(0, 0.5, 1) : new Color3(0, 0.2, 0.4);
    const led = MeshBuilder.CreateBox(`rack_led_mesh_${i}`, { width: 0.4, height: 0.04, depth: 0.05 }, scene);
    led.position.set(19.5, 0.3 + i * 0.35, 26.58);
    led.material = ledMat;
  }

  return { debugLights: lightMats };
}

// ── Build all furniture ────────────────────────────────────────────────────
export function buildFurniture(scene, shadows) {
  buildMeetingTable(scene);
  const { debugLights } = buildTestingRoom(scene, shadows);
  return { debugLights };
}
