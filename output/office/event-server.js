// ── Office Event Server ────────────────────────────────────────────────────
// Tiny Express SSE server on port 5174.
// Accepts POST /agent-event from Claude Code hooks.
// Streams events to the browser via GET /events (SSE).

import express from 'express';

const app  = express();
app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const clients = new Set();

// ── SSE stream ─────────────────────────────────────────────────────────────
app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type':  'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection':    'keep-alive',
  });
  res.write('data: {"type":"connected"}\n\n');
  clients.add(res);
  req.on('close', () => clients.delete(res));
});

// ── Receive agent events from hooks ────────────────────────────────────────
app.post('/agent-event', (req, res) => {
  const payload = JSON.stringify(req.body);
  for (const client of clients) {
    client.write(`data: ${payload}\n\n`);
  }
  res.json({ ok: true, clients: clients.size });
});

app.listen(5174, () =>
  console.log('[office-events] listening on http://localhost:5174'),
);
