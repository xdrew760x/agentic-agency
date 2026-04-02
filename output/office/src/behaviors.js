import { Vector3, Color3 } from '@babylonjs/core';
import { feedSay, feedThink, feedAction } from './feed.js';

export { feedSay, feedThink, feedAction };

// ── Chair seat height ─────────────────────────────────────────────────────
const SEAT_Y = 1.8;

// ── Walk an avatar directly to a target position ──────────────────────────
export function walkTo(avatar, targetX, targetZ, onArrived) {
  avatar.state = 'walking';
  setAvatarBodyColor(avatar, 'walking');

  // Drop to floor for walking
  avatar.root.position.y = 0;

  const target = new Vector3(targetX, 0, targetZ);
  let done     = false;

  const observer = avatar.root.getScene().onBeforeRenderObservable.add(() => {
    const current = avatar.root.position.clone();
    current.y = 0;
    const dir     = target.subtract(current);
    const dist    = dir.length();

    if (dist < 0.3) {
      avatar.root.position.x = targetX;
      avatar.root.position.z = targetZ;

      // Raise to seat height if arriving at home desk or meeting table
      const home = avatar.agentDef.deskPos;
      const isHome = Math.abs(targetX - home.x) < 1 && Math.abs(targetZ - home.z) < 1;
      const isTable = targetZ > 20;
      avatar.root.position.y = (isHome || isTable) ? SEAT_Y : 0;

      // Restore home rotation if returning to desk
      if (isHome) {
        avatar.root.rotation.y = avatar.agentDef.defaultRotation ?? 0;
      }

      avatar.root.getScene().onBeforeRenderObservable.remove(observer);
      done = true;
      if (onArrived) onArrived();
      return;
    }

    const step = Math.min(0.18, dist);
    dir.normalize().scaleInPlace(step);
    avatar.root.position.addInPlace(dir);

    // Face direction of travel
    if (dir.length() > 0.001) {
      avatar.root.rotation.y = Math.atan2(dir.x, dir.z);
    }
  });

  return () => {
    if (!done) {
      avatar.state = 'idle';
      avatar.root.getScene().onBeforeRenderObservable.remove(observer);
    }
  };
}

// ── Alias for compatibility ───────────────────────────────────────────────
export const walkPath = walkTo;
export function getPathTo() { return []; }
export function getPathHome() { return []; }
export function getPathFromMeeting() { return []; }

// ── Set avatar visual state ────────────────────────────────────────────────
export function setAvatarState(avatar, state) {
  avatar.state = state;
  setAvatarBodyColor(avatar, state);
  updateStatusRow(avatar.agentDef.id, state);
}

function setAvatarBodyColor(avatar, state) {
  const baseColor = hexToColor3(avatar.agentDef.color);

  if (state === 'working') {
    avatar.body.material.emissiveColor = new Color3(baseColor.r, baseColor.g, baseColor.b);
    avatar.head.material.emissiveColor = new Color3(baseColor.r * 0.6, baseColor.g * 0.6, baseColor.b * 0.6);
  } else if (state === 'walking') {
    avatar.body.material.emissiveColor = new Color3(baseColor.r * 0.4, baseColor.g * 0.4, baseColor.b * 0.4);
    avatar.head.material.emissiveColor = new Color3(0, 0, 0);
  } else {
    avatar.body.material.emissiveColor = new Color3(0, 0, 0);
    avatar.head.material.emissiveColor = new Color3(0, 0, 0);
  }
}

// ── Show a speech bubble for N ms ─────────────────────────────────────────
export function speak(avatar, text, duration = 5000) {
  avatar.bubbleText.text = text;
  avatar.bubble.isVisible = true;

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
