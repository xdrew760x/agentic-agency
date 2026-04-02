// ── Team Feed — live log of agent thoughts, speech, and actions ────────────

let entries    = [];
let filter     = 'all';
let startTime  = Date.now();

const container = () => document.getElementById('feed-messages');
const countEl   = () => document.getElementById('feed-count');

// ── Public API ─────────────────────────────────────────────────────────────

export function feedThink(agentDef, text) {
  addEntry({ agentDef, type: 'think', text });
}

export function feedSay(agentDef, text) {
  addEntry({ agentDef, type: 'say', text });
}

export function feedAction(agentDef, text) {
  addEntry({ agentDef, type: 'action', text });
}

// ── Internal ───────────────────────────────────────────────────────────────

function addEntry({ agentDef, type, text }) {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const entry   = { agentDef, type, text, elapsed };
  entries.push(entry);

  renderEntry(entry);
  updateCount();
}

function renderEntry({ agentDef, type, text, elapsed }) {
  const c = container();
  if (!c) return;

  const typeLabel = type === 'think' ? 'thinking' : type === 'say' ? 'says' : 'action';

  // hide if filtered out
  const hidden = filter !== 'all' && filter !== type;

  const el = document.createElement('div');
  el.className      = 'feed-entry';
  el.dataset.type   = type;
  el.style.display  = hidden ? 'none' : 'block';
  el.innerHTML = `
    <div class="feed-entry-header">
      <div class="feed-dot" style="background:${agentDef.color}"></div>
      <div class="feed-agent-name" style="color:${agentDef.color}">${agentDef.name}</div>
      <div class="feed-type-badge ${type}">${typeLabel}</div>
    </div>
    <div class="feed-message ${type}">${escapeHtml(text)}</div>
    <div class="feed-time">${elapsed}s</div>
  `;

  c.appendChild(el);
  c.scrollTop = c.scrollHeight;
}

function updateCount() {
  const el = countEl();
  if (el) el.textContent = `${entries.length} message${entries.length !== 1 ? 's' : ''}`;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Filter control (called from HTML) ─────────────────────────────────────

window.setFeedFilter = (f) => {
  filter = f;

  // update tab active state
  document.querySelectorAll('.feed-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === f);
  });

  // show/hide existing entries
  document.querySelectorAll('.feed-entry').forEach(el => {
    el.style.display = (f === 'all' || el.dataset.type === f) ? 'block' : 'none';
  });
};

window.clearFeed = () => {
  entries = [];
  const c = container();
  if (c) c.innerHTML = '';
  updateCount();
};
