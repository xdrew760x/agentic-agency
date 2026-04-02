import {
  MeshBuilder, StandardMaterial, Color3, Vector3,
  DynamicTexture, TransformNode, Animation, ActionManager,
  ExecuteCodeAction,
} from '@babylonjs/core';
import { Rectangle, TextBlock } from '@babylonjs/gui';

// ── Parse hex color → BabylonJS Color3 ────────────────────────────────────
export function hexToColor3(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new Color3(r, g, b);
}

// ── Build a single agent avatar ────────────────────────────────────────────
export function createAvatar(scene, agentDef, guiTexture, shadows, onClickCb) {
  const color = hexToColor3(agentDef.color);

  // Root transform node — move this to reposition the whole avatar
  const root = new TransformNode(`agent_root_${agentDef.id}`, scene);
  root.position.set(agentDef.deskPos.x, 0, agentDef.deskPos.z);
  root.rotation.y = agentDef.defaultRotation ?? 0;

  // ── Body (capsule-like: tall cylinder) ───────────────────────────────────
  const bodyMat = new StandardMaterial(`body_mat_${agentDef.id}`, scene);
  bodyMat.diffuseColor  = color;
  bodyMat.specularColor = new Color3(0.2, 0.2, 0.2);

  const body = MeshBuilder.CreateCylinder(`body_${agentDef.id}`, {
    diameterTop:    0.38,
    diameterBottom: 0.42,
    height:         0.9,
    tessellation:   12,
  }, scene);
  body.position.set(0, 0.45, 0);
  body.parent   = root;
  body.material = bodyMat;
  shadows?.addShadowCaster(body);

  // ── Head (sphere) ─────────────────────────────────────────────────────────
  const headMat = new StandardMaterial(`head_mat_${agentDef.id}`, scene);
  headMat.diffuseColor  = new Color3(
    Math.min(color.r + 0.2, 1),
    Math.min(color.g + 0.2, 1),
    Math.min(color.b + 0.2, 1),
  );
  headMat.specularColor = new Color3(0.3, 0.3, 0.3);

  const head = MeshBuilder.CreateSphere(`head_${agentDef.id}`, {
    diameter: 0.44, segments: 12,
  }, scene);
  head.position.set(0, 1.12, 0);
  head.parent   = root;
  head.material = headMat;
  shadows?.addShadowCaster(head);

  // ── Eyes ──────────────────────────────────────────────────────────────────
  const eyeMat = new StandardMaterial(`eye_mat_${agentDef.id}`, scene);
  eyeMat.emissiveColor = new Color3(1, 1, 1);

  [[-0.1, 0.05], [0.1, 0.05]].forEach(([ex, ey], i) => {
    const eye = MeshBuilder.CreateSphere(`eye_${agentDef.id}_${i}`, { diameter: 0.08, segments: 6 }, scene);
    eye.position.set(ex, 1.16 + ey, -0.2);
    eye.parent   = root;
    eye.material = eyeMat;
  });

  // ── Lead dev halo ring ────────────────────────────────────────────────────
  if (agentDef.isLead) {
    const haloMat = new StandardMaterial(`halo_mat_${agentDef.id}`, scene);
    haloMat.emissiveColor = color;
    haloMat.alpha = 0.7;
    const halo = MeshBuilder.CreateTorus(`halo_${agentDef.id}`, {
      diameter: 0.55, thickness: 0.05, tessellation: 24,
    }, scene);
    halo.position.set(0, 1.45, 0);
    halo.parent   = root;
    halo.material = haloMat;
  }

  // ── GUI: floating name label ──────────────────────────────────────────────
  const labelRect = new Rectangle(`label_rect_${agentDef.id}`);
  labelRect.width           = '130px';
  labelRect.height          = '28px';
  labelRect.cornerRadius    = 6;
  labelRect.color           = agentDef.color;
  labelRect.thickness       = 1;
  labelRect.background = 'rgba(10,10,20,0.82)';
  guiTexture.addControl(labelRect);

  const labelText = new TextBlock(`label_text_${agentDef.id}`);
  labelText.text      = agentDef.name;
  labelText.color     = agentDef.color;
  labelText.fontSize  = 11;
  labelText.fontFamily = 'monospace';
  labelRect.addControl(labelText);

  // Anchor the label to a point above the head
  const labelAnchor = MeshBuilder.CreateSphere(`label_anchor_${agentDef.id}`, { diameter: 0.01 }, scene);
  labelAnchor.position.set(0, 1.7, 0);
  labelAnchor.parent    = root;
  labelAnchor.isVisible = false;
  labelRect.linkWithMesh(labelAnchor);
  labelRect.linkOffsetYInPixels = -20;

  // ── Speech bubble (hidden by default) ────────────────────────────────────
  const bubble = new Rectangle(`bubble_${agentDef.id}`);
  bubble.width           = '200px';
  bubble.height          = '48px';
  bubble.cornerRadius    = 8;
  bubble.color           = 'rgba(255,255,255,0.15)';
  bubble.thickness       = 1;
  bubble.background = 'rgba(10,10,30,0.9)';
  bubble.isVisible  = false;
  guiTexture.addControl(bubble);

  const bubbleText = new TextBlock(`bubble_text_${agentDef.id}`);
  bubbleText.text        = '';
  bubbleText.color       = '#e5e7eb';
  bubbleText.fontSize    = 11;
  bubbleText.fontFamily  = 'monospace';
  bubbleText.textWrapping = true;
  bubbleText.paddingLeft = '8px';
  bubbleText.paddingRight = '8px';
  bubble.addControl(bubbleText);

  const bubbleAnchor = MeshBuilder.CreateSphere(`bubble_anchor_${agentDef.id}`, { diameter: 0.01 }, scene);
  bubbleAnchor.position.set(0, 2.05, 0);
  bubbleAnchor.parent    = root;
  bubbleAnchor.isVisible = false;
  bubble.linkWithMesh(bubbleAnchor);
  bubble.linkOffsetYInPixels = -24;

  // ── Click interaction ─────────────────────────────────────────────────────
  [body, head].forEach(mesh => {
    mesh.actionManager = new ActionManager(scene);
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => onClickCb(agentDef))
    );
    mesh.isPickable = true;
  });

  // ── Idle bob animation ────────────────────────────────────────────────────
  const bobAnim = new Animation(
    `bob_${agentDef.id}`, 'position.y', 30,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );
  const offset = (agentDef.id.charCodeAt(0) % 30) / 30; // stagger
  bobAnim.setKeys([
    { frame: 0,               value: 0 },
    { frame: 15 + offset * 5, value: 0.06 },
    { frame: 30 + offset * 5, value: 0 },
  ]);
  root.animations = [bobAnim];
  scene.beginAnimation(root, 0, 30, true);

  return {
    root, body, head,
    bubble, bubbleText,
    labelRect,
    state: 'idle',
    agentDef,
  };
}
