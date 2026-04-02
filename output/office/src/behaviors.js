import { Vector3, Color3 } from '@babylonjs/core';
import { feedSay, feedThink, feedAction } from './feed.js';

export { feedSay, feedThink, feedAction };

// ── Walk an avatar to a target position (simple lerp per frame) ────────────
export function walkTo(avatar, targetX, targetZ, onArrived) {
  avatar.state = 'walking';
  setAvatarBodyColor(avatar, 'walking');

  const target = new Vector3(targetX, 0, targetZ);
  let done     = false;

  const observer = avatar.root.getScene().onBeforeRenderObservable.add(() => {
    const current = avatar.root.position;
    const dir     = target.subtract(current);
    const dist    = dir.length();

    if (dist < 0.08) {
      avatar.root.position.x = targetX;
      avatar.root.position.z = targetZ;
      avatar.root.getScene().onBeforeRenderObservable.remove(observer);
      done = true;
      if (onArrived) onArrived();
      return;
    }

    const step = Math.min(0.06, dist);
    dir.normalize().scaleInPlace(step);
    avatar.root.position.addInPlace(dir);

    // Face direction of travel
    if (dir.length() > 0.001) {
      const angle = Math.atan2(dir.x, dir.z);
      avatar.root.rotation.y = angle;
    }
  });

  return () => {
    if (!done) {
      avatar.state = 'idle'; // reset so next setAvatarState isn't fighting stale 'walking'
      avatar.root.getScene().onBeforeRenderObservable.remove(observer);
    }
  };
}

// ── Set avatar visual state ────────────────────────────────────────────────
export function setAvatarState(avatar, state) {
  avatar.state = state;
  setAvatarBodyColor(avatar, state);

  // Update the DOM status panel
  updateStatusRow(avatar.agentDef.id, state);
}

function setAvatarBodyColor(avatar, state) {
  const baseColor = hexToColor3(avatar.agentDef.color);

  if (state === 'working') {
    // Full emissive = agent color — very visible glow even from far camera
    avatar.body.material.emissiveColor = new Color3(baseColor.r, baseColor.g, baseColor.b);
    avatar.head.material.emissiveColor = new Color3(baseColor.r * 0.6, baseColor.g * 0.6, baseColor.b * 0.6);
  } else if (state === 'walking') {
    avatar.body.material.emissiveColor = new Color3(baseColor.r * 0.4, baseColor.g * 0.4, baseColor.b * 0.4);
    avatar.head.material.emissiveColor = new Color3(0, 0, 0);
  } else {
    // idle
    avatar.body.material.emissiveColor = new Color3(0, 0, 0);
    avatar.head.material.emissiveColor = new Color3(0, 0, 0);
  }
}

// ── Show a speech bubble for N ms ─────────────────────────────────────────
export function speak(avatar, text, duration = 4500) {
  avatar.bubbleText.text = text;
  avatar.bubble.isVisible = true;

  // Pulse the bubble width to fit text
  const charWidth = 9;
  const minW      = 160;
  const newW      = Math.max(minW, text.length * charWidth);
  avatar.bubble.width = `${newW}px`;

  setTimeout(() => {
    avatar.bubble.isVisible = false;
  }, duration);
}

// ── DOM status panel helpers ───────────────────────────────────────────────
export function updateStatusRow(agentId, state) {
  const row = document.getElementById(`status_${agentId}`);
  if (!row) return;
  const dot   = row.querySelector('.agent-dot');
  const label = row.querySelector('.agent-state-label');
  if (dot)   { dot.className = `agent-dot ${state}`; }
  if (label) { label.textContent = state; }
}

export function buildStatusPanel(agents) {
  const list = document.getElementById('agent-list');
  if (!list) return;
  list.innerHTML = '';

  agents.forEach(a => {
    const row = document.createElement('div');
    row.className = 'agent-status-row';
    row.id        = `status_${a.id}`;
    row.innerHTML = `
      <div class="agent-dot idle" style="background:${a.color};color:${a.color}"></div>
      <div class="agent-name-label">${a.name}</div>
      <div class="agent-state-label">idle</div>
    `;
    list.appendChild(row);
  });
}

// ── Info card (click on avatar) ────────────────────────────────────────────
export function showInfoCard(agentDef, currentState) {
  document.getElementById('card-color').style.background = agentDef.color;
  document.getElementById('card-name').textContent  = agentDef.name;
  document.getElementById('card-role').textContent  = agentDef.role;
  document.getElementById('card-task').textContent  =
    currentState === 'working' ? 'Currently working...' :
    currentState === 'walking' ? 'Moving to new location...' :
    'Idle — waiting for a task';

  document.getElementById('info-card').style.display = 'block';
}

window.closeCard = () => {
  document.getElementById('info-card').style.display = 'none';
};

// ── Hex → Color3 ───────────────────────────────────────────────────────────
function hexToColor3(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new Color3(r, g, b);
}
