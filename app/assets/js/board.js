'use strict';
// Whiteboard for scratch work. Opens as a half-screen sheet below the problem; the corner button maximizes it.
window.Board = (() => {
  // Pen colors follow the theme, so strokes stay visible on light and dark paper.
  const COLORS = ['--ink', '--blue', '--red'];
  const colorOf = i => getComputedStyle(document.documentElement).getPropertyValue(COLORS[i]).trim() || '#1E2A44';
  const ICON = {
    pen: '<path d="M4 20l1-4L15.5 5.5a2.1 2.1 0 013 3L8 19z M13.5 7.5l3 3"/>',
    eraser: '<path d="M7 20h11 M4.5 14.5l8-8a2 2 0 012.8 0l3.2 3.2a2 2 0 010 2.8L13 18H8.5z M9 10l6 6"/>',
    undo: '<path d="M9 14L4 9l5-5 M4 9h10a6 6 0 010 12h-3"/>',
    clear: '<path d="M5 7h14 M10 11v6 M14 11v6 M6 7l1 13h10l1-13 M9 7V4h6v3"/>',
    max: '<path d="M14 4h6v6 M10 20H4v-6 M20 4l-7 7 M4 20l7-7"/>',
    min: '<path d="M20 10h-6V4 M4 14h6v6 M14 10l7-7 M10 14l-7 7"/>',
    close: '<path d="M6 6l12 12 M18 6L6 18"/>',
    board: '<path d="M4 18l1-4L14.5 4.5a2.1 2.1 0 013 3L8 17z M3 21h18"/>'
  };
  const svg = (k, label) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg><span class="sr">${label}</span>`;
  let fab, panel, canvas, ctx, mode = 'closed', page = null, strokes = [], cur = null, tool = 'pen', color = 0, avail = false, built = false;

  function build() {
    built = true;
    fab = document.createElement('button'); fab.id = 'boardFab'; fab.type = 'button'; fab.innerHTML = svg('board', 'Open whiteboard'); fab.setAttribute('aria-label', 'Open whiteboard');
    fab.addEventListener('click', () => open('half'));
    panel = document.createElement('section'); panel.id = 'board'; panel.setAttribute('aria-label', 'Whiteboard');
    panel.innerHTML = `<div class="bbar">
        <button type="button" data-b="pen" aria-pressed="true" aria-label="Pen">${svg('pen', 'Pen')}</button>
        <button type="button" data-b="eraser" aria-pressed="false" aria-label="Eraser">${svg('eraser', 'Eraser')}</button>
        ${COLORS.map((c, i) => `<button type="button" class="bcolor" data-b="color" data-i="${i}" aria-pressed="${i === 0}" aria-label="Color ${i + 1}"><i style="background:var(${c})"></i></button>`).join('')}
        <span class="bsp"></span>
        <button type="button" data-b="undo" aria-label="Undo">${svg('undo', 'Undo')}</button>
        <button type="button" data-b="clear" aria-label="Clear">${svg('clear', 'Clear')}</button>
        <button type="button" data-b="size" aria-label="Maximize">${svg('max', 'Maximize')}</button>
        <button type="button" data-b="close" aria-label="Close whiteboard">${svg('close', 'Close')}</button>
      </div><div class="bpaper"><canvas></canvas></div>`;
    document.body.appendChild(fab); document.body.appendChild(panel);
    canvas = panel.querySelector('canvas'); ctx = canvas.getContext('2d');
    panel.querySelector('.bbar').addEventListener('click', e => {
      const b = e.target.closest('[data-b]'); if (!b) return; const a = b.dataset.b;
      if (a === 'pen' || a === 'eraser') { tool = a; syncBar(); }
      else if (a === 'color') { color = +b.dataset.i; tool = 'pen'; syncBar(); }
      else if (a === 'undo') { strokes.pop(); redraw(); }
      else if (a === 'clear') { strokes = []; redraw(); }
      else if (a === 'size') open(mode === 'full' ? 'half' : 'full');
      else if (a === 'close') close();
    });
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    window.addEventListener('resize', () => { if (mode !== 'closed') size(); });
  }
  function syncBar() {
    panel.querySelectorAll('[data-b="pen"],[data-b="eraser"]').forEach(b => b.setAttribute('aria-pressed', b.dataset.b === tool));
    panel.querySelectorAll('.bcolor').forEach(b => b.setAttribute('aria-pressed', tool === 'pen' && +b.dataset.i === color));
    const s = panel.querySelector('[data-b="size"]'); s.innerHTML = svg(mode === 'full' ? 'min' : 'max', mode === 'full' ? 'Minimize' : 'Maximize'); s.setAttribute('aria-label', mode === 'full' ? 'Minimize' : 'Maximize');
  }
  function size() {
    const box = canvas.parentElement.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(box.width * dpr); canvas.height = Math.round(box.height * dpr);
    canvas.style.width = box.width + 'px'; canvas.style.height = box.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); redraw();
  }
  const pt = e => { const b = canvas.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top, e.pressure || 0.5]; };
  function seg(s, a, b) {
    ctx.save(); ctx.globalCompositeOperation = s.tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.strokeStyle = colorOf(s.color); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.lineWidth = s.tool === 'eraser' ? 26 : 1.6 + 2.2 * (s.pen ? b[2] : 0.5);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
  }
  function redraw() {
    if (!ctx) return; ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of strokes) { if (s.pts.length === 1) seg(s, s.pts[0], s.pts[0]); for (let i = 1; i < s.pts.length; i++) seg(s, s.pts[i - 1], s.pts[i]); }
  }
  // While a pen is in use, ignore touches so a resting palm does not draw.
  let penSeen = false;
  function down(e) {
    if (e.pointerType === 'pen') penSeen = true; else if (penSeen && e.pointerType === 'touch') return;
    e.preventDefault(); canvas.setPointerCapture(e.pointerId);
    cur = { tool, color, pen: e.pointerType === 'pen', id: e.pointerId, pts: [pt(e)] }; seg(cur, cur.pts[0], cur.pts[0]);
  }
  function move(e) {
    if (!cur || e.pointerId !== cur.id) return; e.preventDefault();
    const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    for (const ev of evs.length ? evs : [e]) { const p = pt(ev), last = cur.pts[cur.pts.length - 1]; cur.pts.push(p); seg(cur, last, p); }
  }
  function up(e) { if (!cur || e.pointerId !== cur.id) return; strokes.push(cur); cur = null; }

  function open(m) {
    if (!built) build();
    mode = m; panel.dataset.mode = m; panel.classList.add('on'); fab.hidden = true;
    document.body.classList.toggle('board-half', m === 'half'); document.body.classList.toggle('board-full', m === 'full');
    syncBar(); requestAnimationFrame(size);
    // Keep the problem in view above the half-height sheet.
    if (m === 'half') { const q = document.querySelector('.vsheet, .sheet, .worked, .lesson-body'); if (q) window.scrollTo({ top: Math.max(0, q.getBoundingClientRect().top + window.scrollY - 8) }); }
  }
  function close() {
    if (!built) return; mode = 'closed'; panel.classList.remove('on'); document.body.classList.remove('board-half', 'board-full'); fab.hidden = !avail;
  }
  // Called on every render: whether the board belongs on this screen, and which problem it is for.
  function setAvailable(on, key) {
    if (!built) { if (!on) return; build(); }
    avail = on;
    if (key !== page) { page = key; strokes = []; cur = null; redraw(); }
    if (!on) close(); else if (mode === 'closed') fab.hidden = false;
  }
  return { setAvailable, open, close, isOpen: () => mode !== 'closed', mode: () => mode };
})();
