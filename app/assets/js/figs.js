'use strict';
// Figures: small SVG plots, some with sliders. Content embeds them with fig(key, options, caption).
(() => {
  const PI = Math.PI;
  let uid = 0;
  const r2 = v => Math.round(v * 100) / 100;
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const minus = s => String(s).replace(/^-/, '\u2212');

  // Plain-text labels for SVG (KaTeX is not used inside figures).
  const piText = t => {
    const k = Math.round(t / (PI / 12));
    if (Math.abs(t - k * PI / 12) > 1e-6) return minus(t.toFixed(2));
    if (k === 0) return '0';
    const g = gcd(k, 12), n = k / g, d = 12 / g, m = Math.abs(n);
    return (n < 0 ? '\u2212' : '') + (m === 1 ? '' : m) + '\u03C0' + (d === 1 ? '' : '/' + d);
  };
  const EX = [[0, '0'], [0.5, '1/2'], [Math.SQRT2 / 2, '\u221A2/2'], [Math.sqrt(3) / 2, '\u221A3/2'], [1, '1'], [Math.sqrt(3), '\u221A3'], [Math.sqrt(3) / 3, '\u221A3/3']];
  const exText = v => {
    if (!Number.isFinite(v) || Math.abs(v) > 1e6) return 'undefined';
    for (const [n, s] of EX) if (Math.abs(Math.abs(v) - n) < 1e-9) return (v < -1e-12 && n ? '\u2212' : '') + s;
    return minus(v.toFixed(3));
  };
  const num = v => minus(String(r2(v)));

  function Plot(o) {
    const W = o.w || 340, pad = o.pad != null ? o.pad : 26;
    const [x0, x1] = o.x, [y0, y1] = o.y;
    const H = o.h || (o.eq ? Math.round(2 * pad + (W - 2 * pad) * (y1 - y0) / (x1 - x0)) : 230);
    const sx = (W - 2 * pad) / (x1 - x0), sy = (H - 2 * pad) / (y1 - y0);
    const X = x => r2(pad + (x - x0) * sx), Y = y => r2(H - pad - (y - y0) * sy);
    const id = 'f' + (++uid);
    const out = [];
    const p = {
      X, Y, W, H, sx, sy, x0, x1, y0, y1,
      add(s) { out.push(s); return p; },
      grid(dx = 1, dy = dx) {
        let s = '';
        for (let x = Math.ceil(x0 / dx) * dx; x <= x1 + 1e-9; x += dx) s += `M${X(x)} ${Y(y0)}V${Y(y1)}`;
        for (let y = Math.ceil(y0 / dy) * dy; y <= y1 + 1e-9; y += dy) s += `M${X(x0)} ${Y(y)}H${X(x1)}`;
        return p.add(`<path class="g" d="${s}"/>`);
      },
      axes(a = {}) {
        const ay = y0 <= 0 && y1 >= 0 ? 0 : y0, ax = x0 <= 0 && x1 >= 0 ? 0 : x0;
        p.add(`<path class="ax" d="M${X(x0)} ${Y(ay)}H${X(x1)}" marker-end="url(#${id}m)"/><path class="ax" d="M${X(ax)} ${Y(y0)}V${Y(y1)}" marker-end="url(#${id}m)"/>`);
        const tick = (list, horiz) => {
          for (const t of list) {
            const [v, lab] = Array.isArray(t) ? t : [t, minus(r2(t))];
            if (horiz) { p.add(`<path class="ax" d="M${X(v)} ${Y(ay) - 3}v6"/>`); p.txt(v, ay, lab, { dy: 15, a: 'middle', cls: 'tk' }); }
            else { p.add(`<path class="ax" d="M${X(ax) - 3} ${Y(v)}h6"/>`); p.txt(ax, v, lab, { dx: -6, dy: 4, a: 'end', cls: 'tk' }); }
          }
        };
        const steps = (lo, hi, st) => { const r = []; for (let v = Math.ceil(lo / st) * st; v <= hi + 1e-9; v += st) if (Math.abs(v) > 1e-9) r.push(r2(v)); return r; };
        if (a.xt !== false) tick(Array.isArray(a.xt) ? a.xt : steps(x0 + 1e-9, x1 - (x1 - x0) * 0.04, a.xt || 1), true);
        if (a.yt !== false) tick(Array.isArray(a.yt) ? a.yt : steps(y0 + 1e-9, y1 - (y1 - y0) * 0.04, a.yt || 1), false);
        if (a.xl !== '') p.txt(x1, ay, a.xl || 'x', { dx: -4, dy: -7, a: 'end' });
        if (a.yl !== '') p.txt(ax, y1, a.yl || 'y', { dx: 7, dy: 12 });
        return p;
      },
      fn(f, cls = 'a', a = x0, b = x1, n = 300) {
        let d = '', pen = false, py = null;
        for (let i = 0; i <= n; i++) {
          const x = a + (b - a) * i / n, y = f(x), Yv = Y(y);
          const ok = Number.isFinite(y) && Yv > -H && Yv < 2 * H && !(py !== null && Math.abs(Yv - py) > H * 0.9);
          if (ok) { d += (pen ? 'L' : 'M') + X(x) + ' ' + Yv; pen = true; py = Yv; } else { pen = false; py = null; }
        }
        return p.add(`<path class="${cls}" d="${d}" clip-path="url(#${id})"/>`);
      },
      par(fx, fy, t0, t1, cls = 'a', n = 300) {
        let d = '';
        for (let i = 0; i <= n; i++) { const t = t0 + (t1 - t0) * i / n; d += (i ? 'L' : 'M') + X(fx(t)) + ' ' + Y(fy(t)); }
        return p.add(`<path class="${cls}" d="${d}" clip-path="url(#${id})"/>`);
      },
      seg(xa, ya, xb, yb, cls = 'ink', arrow = false) {
        return p.add(`<path class="${cls}" d="M${X(xa)} ${Y(ya)}L${X(xb)} ${Y(yb)}"${arrow ? ` marker-end="url(#${id}${({ b: 'k', a: 'ab', c: 'cg', ink: 'ik' })[arrow] || 'm'})"` : ''}/>`);
      },
      dot(x, y, cls = 'a', r = 4.5, hollow = false) {
        return p.add(`<circle class="pt p${cls}${hollow ? ' hollow' : ''}" cx="${X(x)}" cy="${Y(y)}" r="${r}"/>`);
      },
      txt(x, y, s, t = {}) {
        return p.add(`<text class="${t.cls || 't'}" x="${r2(X(x) + (t.dx || 0))}" y="${r2(Y(y) + (t.dy || 0))}" text-anchor="${t.a || 'start'}">${s}</text>`);
      },
      poly(pts, cls) { return p.add(`<path class="${cls}" d="${pts.map((q, i) => (i ? 'L' : 'M') + X(q[0]) + ' ' + Y(q[1])).join('')}Z" clip-path="url(#${id})"/>`); },
      shade(f, g, a, b, cls = 'fa', n = 120) {
        const pts = [];
        for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; pts.push([x, f(x)]); }
        for (let i = n; i >= 0; i--) { const x = a + (b - a) * i / n; pts.push([x, g(x)]); }
        return p.poly(pts, cls);
      },
      circ(cx, cy, r, cls = 'ink') { return p.add(`<ellipse class="${cls}" cx="${X(cx)}" cy="${Y(cy)}" rx="${r2(r * sx)}" ry="${r2(r * sy)}"/>`); },
      arc(cx, cy, r, t0, t1, cls = 'ink', arrow = false) {
        let d = ''; const n = Math.max(8, Math.ceil(Math.abs(t1 - t0) * 24));
        for (let i = 0; i <= n; i++) { const t = t0 + (t1 - t0) * i / n; d += (i ? 'L' : 'M') + X(cx + r * Math.cos(t)) + ' ' + Y(cy + r * Math.sin(t)); }
        return p.add(`<path class="${cls}" d="${d}"${arrow ? ` marker-end="url(#${id}${({ b: 'k', a: 'ab', c: 'cg', ink: 'ik' })[arrow] || 'm'})"` : ''}/>`);
      },
      svg() {
        const mk = (n, c) => `<marker id="${id}${n}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="${c}" d="M0 1L10 5L0 9z"/></marker>`;
        return `<svg class="figsvg" viewBox="0 0 ${W} ${H}" role="img"><defs><clipPath id="${id}"><rect x="${pad - 2}" y="${pad - 2}" width="${W - 2 * pad + 4}" height="${H - 2 * pad + 4}"/></clipPath>${mk('m', 'mk')}${mk('k', 'mkb')}${mk('ab', 'mka')}${mk('cg', 'mkc')}${mk('ik', 'mki')}</defs>${out.join('')}</svg>`;
      }
    };
    return p;
  }

  // A blank canvas in pixel units, for diagrams that are not graphs.
  const Canvas = (w, h) => Plot({ x: [0, w], y: [h, 0], w, h, pad: 0 });

  const F = {};
  window.FIGS = F;
  window.fig = (key, o, cap) => `<figure class="fig" data-fig="${key}" data-o='${JSON.stringify(o || {})}'>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
  F.util = { Plot, Canvas, piText, exText, num, r2, minus };

  // ---------- Mounting ----------
  F.mount = root => {
    root.querySelectorAll('figure.fig:not(.on)').forEach(el => {
      const spec = F[el.dataset.fig];
      if (!spec) return;
      el.classList.add('on');
      let o = {};
      try { o = JSON.parse(el.dataset.o || '{}'); } catch (e) { /* keep defaults */ }
      const st = {};
      for (const c of spec.controls || []) st[c.k] = o[c.k] != null ? o[c.k] : c.val;
      const box = document.createElement('div'); box.className = 'figbox';
      const read = document.createElement('p'); read.className = 'figread';
      const ctl = document.createElement('div'); ctl.className = 'figctl';
      const draw = () => {
        box.innerHTML = spec.draw(st, o);
        const rt = spec.read ? spec.read(st, o) : '';
        read.innerHTML = rt; read.hidden = !rt;
      };
      for (const c of spec.controls || []) {
        const row = document.createElement('label'); row.className = 'figrow';
        if (c.options) {
          row.innerHTML = `<span class="figlab">${c.label}</span><span class="figopts">${c.options.map(([v, t]) => `<button type="button" class="figopt" data-v="${v}" aria-pressed="${st[c.k] === v}">${t}</button>`).join('')}</span>`;
          row.querySelectorAll('button').forEach(b => b.addEventListener('click', ev => {
            ev.preventDefault(); st[c.k] = isNaN(+b.dataset.v) ? b.dataset.v : +b.dataset.v;
            row.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); draw();
          }));
        } else {
          const show = v => (c.fmt ? c.fmt(v) : minus(r2(v)));
          row.innerHTML = `<span class="figlab">${c.label} <b>${show(st[c.k])}</b></span><input type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${st[c.k]}">`;
          const inp = row.querySelector('input'), b = row.querySelector('b');
          inp.addEventListener('input', () => { st[c.k] = +inp.value; b.textContent = show(st[c.k]); draw(); });
        }
        ctl.appendChild(row);
      }
      const cap = el.querySelector('figcaption');
      el.insertBefore(box, cap); el.insertBefore(read, cap);
      if ((spec.controls || []).length) el.insertBefore(ctl, cap);
      draw();
    });
  };

  // =====================================================================
  // Algebra
  // =====================================================================
  // Singapore bar model for n*x + c = total.
  F.barModel = {
    draw(s, o) {
      const n = o.n || 3, c = o.c || 4, tot = o.total || 19, x = (tot - c) / n;
      const W = 340, H = 168, L = 16, R = W - 16, unit = (R - L) / tot;
      const p = Canvas(W, H);
      let cx = L;
      for (let i = 0; i < n; i++) { p.add(`<rect class="bm ba" x="${r2(cx)}" y="22" width="${r2(x * unit)}" height="34"/>`); p.txt(cx + x * unit / 2, 44, 'x', { a: 'middle' }); cx += x * unit; }
      p.add(`<rect class="bm bc" x="${r2(cx)}" y="22" width="${r2(c * unit)}" height="34"/>`); p.txt(cx + c * unit / 2, 44, String(c), { a: 'middle', cls: 'tb' });
      p.add(`<path class="ax" d="M${L} 64v6H${R}v-6M${(L + R) / 2} 70v6"/>`); p.txt((L + R) / 2, 92, String(tot), { a: 'middle', cls: 'tb' });
      cx = L;
      for (let i = 0; i < n; i++) { p.add(`<rect class="bm ba" x="${r2(cx)}" y="110" width="${r2(x * unit)}" height="30"/>`); p.txt(cx + x * unit / 2, 130, `x = ${x}`, { a: 'middle', cls: 'tu' }); cx += x * unit; }
      p.add(`<rect class="bm ghost" x="${r2(cx)}" y="110" width="${r2(c * unit)}" height="30"/>`); p.txt(cx + c * unit / 2, 130, `\u2212${c}`, { a: 'middle', cls: 'tu' });
      p.txt(L, 160, `${tot} \u2212 ${c} = ${tot - c}, shared by ${n} equal bars`, { cls: 'tu' });
      return p.svg();
    }
  };

  // Number line with intervals, rays, and points. o.segs: [[a, b, closedA, closedB]], o.rays: [[a, dir(+1|-1), closed]], o.pts: [[v, closed, label]].
  F.numline = {
    draw(s, o) {
      const [a, b] = o.range || [-6, 6], p = Plot({ x: [a - 0.6, b + 0.6], y: [-1, 1.2], h: 86, pad: 8 });
      p.seg(a - 0.5, 0, b + 0.5, 0, 'ax', true).seg(b + 0.5, 0, a - 0.5, 0, 'ax', true);
      for (let v = a; v <= b; v++) { p.seg(v, -0.12, v, 0.12, 'ax'); p.txt(v, 0, minus(v), { dy: 20, a: 'middle', cls: 'tk' }); }
      for (const [l, r, ca, cb] of o.segs || []) { p.seg(l, 0, r, 0, 'band'); p.dot(l, 0, 'b', 6, !ca); p.dot(r, 0, 'b', 6, !cb); }
      for (const [v, dir, c] of o.rays || []) { p.seg(v, 0, dir > 0 ? b + 0.45 : a - 0.45, 0, 'band', 'b'); p.dot(v, 0, 'b', 6, !c); }
      for (const [v, c, lab] of o.pts || []) { p.dot(v, 0, 'a', 6, !c); if (lab) p.txt(v, 0, lab, { dy: -12, a: 'middle', cls: 'tu' }); }
      if (o.brace) { const [l, r, lab] = o.brace; p.add(`<path class="ax" d="M${p.X(l)} ${p.Y(0.45)}v-5H${p.X(r)}v5"/>`); p.txt((l + r) / 2, 0.45, lab, { dy: -9, a: 'middle', cls: 'tu' }); }
      return p.svg();
    }
  };

  // Area model (algebra tiles) for (x + p)(x + q).
  F.areaModel = {
    controls: [{ k: 'p', label: 'p', min: 1, max: 5, step: 1, val: 2 }, { k: 'q', label: 'q', min: 1, max: 5, step: 1, val: 3 }],
    draw(s) {
      const W = 340, u = 19, X0 = 44, Y0 = 30, xl = 6.2 * u, H = Y0 + xl + s.q * u + 34, p = Canvas(W, H);
      const wTot = xl + s.p * u, hTot = xl + s.q * u;
      const rect = (x, y, w, h, c, lab) => { p.add(`<rect class="tile ${c}" x="${x}" y="${y}" width="${w}" height="${h}"/>`); if (lab) p.txt(x + w / 2, y + h / 2 + 5, lab, { a: 'middle' }); };
      rect(X0, Y0, xl, xl, 'ta', 'x\u00B2');
      for (let i = 0; i < s.p; i++) rect(X0 + xl + i * u, Y0, u, xl, 'tb');
      for (let j = 0; j < s.q; j++) rect(X0, Y0 + xl + j * u, xl, u, 'tb');
      for (let i = 0; i < s.p; i++) for (let j = 0; j < s.q; j++) rect(X0 + xl + i * u, Y0 + xl + j * u, u, u, 'tc');
      p.txt(X0 + xl / 2, Y0 - 10, 'x', { a: 'middle' }); p.txt(X0 + xl + s.p * u / 2, Y0 - 10, String(s.p), { a: 'middle' });
      p.txt(X0 - 10, Y0 + xl / 2 + 5, 'x', { a: 'end' }); p.txt(X0 - 10, Y0 + xl + s.q * u / 2 + 5, String(s.q), { a: 'end' });
      p.txt(X0 + wTot + 8, Y0 + xl / 2, `${s.p}x`, { cls: 'tu' }); p.txt(X0 + xl / 2, Y0 + hTot + 20, `${s.q}x`, { a: 'middle', cls: 'tu' });
      p.txt(X0 + wTot + 8, Y0 + xl + s.q * u / 2 + 5, String(s.p * s.q), { cls: 'tu' });
      return p.svg();
    },
    read: s => `(x + ${s.p})(x + ${s.q}) = x\u00B2 + ${s.p + s.q}x + ${s.p * s.q}. The two strips give the middle term; the small squares give the constant.`
  };

  F.parabola = {
    controls: [{ k: 'a', label: 'a', min: -2, max: 2, step: 0.5, val: 1 }, { k: 'h', label: 'h', min: -3, max: 3, step: 1, val: 1 }, { k: 'k', label: 'k', min: -4, max: 3, step: 1, val: -3 }],
    draw(s) {
      const p = Plot({ x: [-6, 6], y: [-6, 6], h: 280 }).grid(1).axes({ xt: 2, yt: 2 });
      const a = s.a || 0.0001;
      p.seg(s.h, -6, s.h, 6, 'mut dash');
      p.fn(x => a * (x - s.h) ** 2 + s.k, 'a');
      const disc = -s.k / a;
      if (disc >= 0 && s.a) { const r = Math.sqrt(disc); p.dot(s.h - r, 0, 'c').dot(s.h + r, 0, 'c'); }
      p.dot(s.h, s.k, 'b', 5.5);
      return p.svg();
    },
    read(s) {
      if (!s.a) return 'With a = 0 there is no x\u00B2 term, so the graph is a line, not a parabola.';
      const disc = -s.k / s.a, roots = disc > 0 ? `roots at x = ${num(s.h - Math.sqrt(disc))} and ${num(s.h + Math.sqrt(disc))}` : disc === 0 ? 'one root, at the vertex' : 'no real roots';
      return `y = ${s.a === 1 ? '' : s.a === -1 ? '\u2212' : minus(s.a)}(x ${s.h < 0 ? '+' : '\u2212'} ${Math.abs(s.h)})\u00B2 ${s.k < 0 ? '\u2212' : '+'} ${Math.abs(s.k)}. Vertex (${minus(s.h)}, ${minus(s.k)}), opens ${s.a > 0 ? 'up' : 'down'}, ${roots}.`;
    }
  };

  F.slope = {
    controls: [{ k: 'm', label: 'slope m', min: -3, max: 3, step: 0.5, val: 1.5 }, { k: 'b', label: 'intercept b', min: -4, max: 4, step: 1, val: -1 }],
    draw(s) {
      const p = Plot({ x: [-5, 5], y: [-5, 5], eq: true, w: 300 }).grid(1).axes({ xt: 1, yt: 1 });
      p.fn(x => s.m * x + s.b, 'a');
      const x1 = 1, x2 = 3, y1 = s.m * x1 + s.b, y2 = s.m * x2 + s.b;
      p.seg(x1, y1, x2, y1, 'c').seg(x2, y1, x2, y2, 'b');
      p.txt((x1 + x2) / 2, y1, 'run 2', { dy: s.m >= 0 ? 15 : -7, a: 'middle', cls: 'tu' });
      p.txt(x2, (y1 + y2) / 2, `rise ${minus(r2(y2 - y1))}`, { dx: 6, cls: 'tu' });
      p.dot(0, s.b, 'b').dot(x1, y1, 'a', 3.5).dot(x2, y2, 'a', 3.5);
      return p.svg();
    },
    read: s => `m = rise / run = ${minus(r2(2 * s.m))} / 2 = ${minus(s.m)}. The line crosses the y-axis at b = ${minus(s.b)}.`
  };

  F.system = {
    draw() {
      const p = Plot({ x: [-1, 7], y: [-2, 6], eq: true, w: 300 }).grid(1).axes({ xt: 1, yt: 1 });
      p.fn(x => (12 - 2 * x) / 3, 'a').fn(x => x - 1, 'b').dot(3, 2, 'ink', 5.5);
      p.txt(0.2, 4.4, '2x + 3y = 12', { cls: 'tu' }).txt(4.6, 3.3, 'x \u2212 y = 1', { cls: 'tu' }).txt(3, 2, '(3, 2)', { dx: 14, dy: 5 });
      return p.svg();
    }
  };

  F.percentBar = {
    draw() {
      const W = 340, H = 150, p = Canvas(W, H), u = 1.6, L = 16;
      const bar = (y, val, lab, cls) => { p.add(`<rect class="bm ${cls}" x="${L}" y="${y}" width="${r2(val * u)}" height="26"/>`); p.txt(Math.max(val, 100) * u + L + 6, y + 18, lab, { cls: 'tu' }); };
      bar(14, 100, '100', 'ba'); bar(58, 120, '120 (+20%)', 'bc'); bar(102, 96, '96 (\u221220% of 120)', 'bb');
      p.add(`<path class="mut dash" d="M${L + 100 * u} 8V136"/>`);
      return p.svg();
    }
  };

  // =====================================================================
  // Trigonometry
  // =====================================================================
  F.radian = {
    controls: [{ k: 't', label: 'angle \u03B8 (radians)', min: 0, max: 6.28, step: 0.01, val: 1, fmt: v => v.toFixed(2) }],
    draw(s) {
      const p = Plot({ x: [-1.5, 1.5], y: [-1.35, 1.35], eq: true, w: 280, pad: 8 });
      p.circ(0, 0, 1, 'mut').seg(0, 0, 1, 0, 'ink').seg(0, 0, Math.cos(s.t), Math.sin(s.t), 'ink');
      p.arc(0, 0, 1, 0, s.t, 'arcb').arc(0, 0, 0.22, 0, s.t, 'ink');
      p.txt(0.5, 0, 'r', { dy: 16, a: 'middle' }).txt(Math.cos(s.t / 2) * 1.12, Math.sin(s.t / 2) * 1.12, 's', { a: 'middle', dy: 5 });
      p.txt(Math.cos(s.t / 2) * 0.36, Math.sin(s.t / 2) * 0.36, '\u03B8', { a: 'middle', dy: 5 });
      return p.svg();
    },
    read: s => `\u03B8 = ${s.t.toFixed(2)} rad = ${(s.t * 180 / PI).toFixed(1)}\u00B0. The arc s is ${s.t.toFixed(2)} radii long. One radian is the angle whose arc equals the radius; a full turn is 2\u03C0 \u2248 6.28.`
  };

  F.rightTri = {
    controls: [{ k: 'd', label: 'angle \u03B8 (degrees)', min: 10, max: 80, step: 1, val: 35 }],
    draw(s) {
      const t = s.d * PI / 180, c = Math.cos(t), sn = Math.sin(t), L = 4;
      const p = Plot({ x: [-0.6, 4.6], y: [-0.7, 3.8], eq: true, w: 320, pad: 8 });
      const A = [0, 0], B = [L * c, 0], C = [L * c, L * sn];
      p.poly([A, B, C], 'tri');
      p.seg(...A, ...B, 'c').seg(...B, ...C, 'b').seg(...A, ...C, 'ink');
      p.add(`<path class="ax" d="M${p.X(B[0] - 0.25)} ${p.Y(0)}V${p.Y(0.25)}H${p.X(B[0])}"/>`);
      p.arc(0, 0, 0.6, 0, t, 'ink').txt(0.8 * Math.cos(t / 2), 0.8 * Math.sin(t / 2), '\u03B8', { dy: 5, a: 'middle' });
      p.txt(B[0] / 2, 0, 'adjacent', { dy: 18, a: 'middle', cls: 'tu c' });
      p.txt(B[0], C[1] / 2, 'opposite', { dx: 8, cls: 'tu b' });
      p.txt(C[0] / 2, C[1] / 2, 'hypotenuse', { dx: -10, dy: -6, a: 'end', cls: 'tu' });
      return p.svg();
    },
    read(s) {
      const t = s.d * PI / 180;
      return `sin ${s.d}\u00B0 = opp/hyp = ${Math.sin(t).toFixed(3)}, cos ${s.d}\u00B0 = adj/hyp = ${Math.cos(t).toFixed(3)}, tan ${s.d}\u00B0 = opp/adj = ${Math.tan(t).toFixed(3)}. The ratios depend only on the angle, not on the size of the triangle.`;
    }
  };

  F.specialTri = {
    draw() {
      const p = Plot({ x: [-0.25, 4.15], y: [-0.45, 1.75], eq: true, w: 340, pad: 6 }), s3 = Math.sqrt(3), L = 1.45, o = 2.45;
      p.poly([[0, 0], [s3, 0], [s3, 1]], 'tri').poly([[o, 0], [o + L, 0], [o + L, L]], 'tri');
      p.seg(0, 0, s3, 0, 'ink').seg(s3, 0, s3, 1, 'ink').seg(0, 0, s3, 1, 'ink');
      p.seg(o, 0, o + L, 0, 'ink').seg(o + L, 0, o + L, L, 'ink').seg(o, 0, o + L, L, 'ink');
      p.txt(s3 / 2, 0, '\u221A3', { dy: 17, a: 'middle' }).txt(s3, 0.5, '1', { dx: 7 }).txt(s3 / 2, 0.5, '2', { dx: -6, dy: -6, a: 'end' });
      p.txt(0.42, 0.06, '30\u00B0', { cls: 'tu' }).txt(s3 - 0.06, 0.6, '60\u00B0', { cls: 'tu', a: 'end' });
      p.txt(o + L / 2, 0, '1', { dy: 17, a: 'middle' }).txt(o + L, L / 2, '1', { dx: 7 }).txt(o + L / 2, L / 2, '\u221A2', { dx: -6, dy: -6, a: 'end' });
      p.txt(o + 0.42, 0.06, '45\u00B0', { cls: 'tu' }).txt(o + L - 0.06, L - 0.5, '45\u00B0', { cls: 'tu', a: 'end' });
      return p.svg();
    }
  };

  const ucPoint = (p, t, opts = {}) => {
    const c = Math.cos(t), s = Math.sin(t);
    p.seg(0, 0, c, 0, 'cosl').seg(c, 0, c, s, 'sinl').seg(0, 0, c, s, 'ink');
    p.arc(0, 0, 0.2, 0, t, 'ink');
    p.dot(c, s, 'ink', 5);
    if (opts.labels !== false) {
      p.txt(c / 2, 0, 'cos', { dy: s >= 0 ? 15 : -6, a: 'middle', cls: 'tu a' });
      p.txt(c, s / 2, 'sin', { dx: c >= 0 ? 6 : -6, a: c >= 0 ? 'start' : 'end', cls: 'tu b' });
    }
  };

  F.unitCircle = {
    controls: [{ k: 'd', label: 'angle \u03B8', min: 0, max: 360, step: 15, val: 30, fmt: v => `${v}\u00B0 = ${piText(v * PI / 180)}` }],
    draw(s) {
      const t = s.d * PI / 180, c = Math.cos(t), sn = Math.sin(t);
      const p = Plot({ x: [-1.55, 1.55], y: [-1.4, 1.4], eq: true, w: 320, pad: 6 });
      p.seg(-1.45, 0, 1.45, 0, 'ax', true).seg(0, -1.33, 0, 1.33, 'ax', true).circ(0, 0, 1, 'mut');
      p.txt(0.95, 0.95, 'I', { cls: 'tq', a: 'middle' }).txt(-0.95, 0.95, 'II', { cls: 'tq', a: 'middle' }).txt(-0.95, -1.05, 'III', { cls: 'tq', a: 'middle' }).txt(0.95, -1.05, 'IV', { cls: 'tq', a: 'middle' });
      p.txt(1, 0, '1', { dx: 3, dy: 15, cls: 'tk' }).txt(-1, 0, '\u22121', { dx: -3, dy: 15, cls: 'tk', a: 'end' }).txt(0, 1, '1', { dx: -5, dy: -3, cls: 'tk', a: 'end' });
      ucPoint(p, t);
      p.txt(c, sn, `(${exText(c)}, ${exText(sn)})`, { dx: c >= 0 ? 8 : -8, dy: sn >= 0 ? -8 : 18, a: c >= 0 ? 'start' : 'end', cls: 'tb' });
      return p.svg();
    },
    read(s) {
      const t = s.d * PI / 180, c = Math.cos(t), sn = Math.sin(t);
      const q = [[0, 'on the positive x-axis'], [90, 'on the positive y-axis'], [180, 'on the negative x-axis'], [270, 'on the negative y-axis'], [360, 'back at the start']].find(([a]) => a === s.d);
      const quad = q ? q[1] : `in quadrant ${['I', 'II', 'III', 'IV'][Math.floor(s.d / 90)]}`;
      const ref = q ? '' : `, reference angle ${Math.min(s.d % 180, 180 - s.d % 180)}\u00B0`;
      return `The point is ${quad}${ref}. cos \u03B8 = ${exText(c)} (blue, the x-coordinate), sin \u03B8 = ${exText(sn)} (red, the y-coordinate), tan \u03B8 = ${Math.abs(c) < 1e-9 ? 'undefined' : exText(sn / c)}.`;
    }
  };

  F.unitChart = {
    draw() {
      const p = Plot({ x: [-1.62, 1.62], y: [-1.5, 1.5], eq: true, w: 340, pad: 4 });
      p.seg(-1.3, 0, 1.3, 0, 'ax').seg(0, -1.3, 0, 1.3, 'ax').circ(0, 0, 1, 'ink');
      for (const t of [0, PI / 6, PI / 4, PI / 3, PI / 2, 2 * PI / 3, 3 * PI / 4, 5 * PI / 6, PI, 7 * PI / 6, 5 * PI / 4, 4 * PI / 3, 3 * PI / 2, 5 * PI / 3, 7 * PI / 4, 11 * PI / 6]) {
        const c = Math.cos(t), s = Math.sin(t);
        p.seg(0, 0, c, s, 'faint').dot(c, s, 'a', 3.5);
        p.txt(1.2 * c, 1.2 * s, piText(t), { a: Math.abs(c) < 0.2 ? 'middle' : c > 0 ? 'start' : 'end', dy: 5, dx: c > 0.2 ? -4 : c < -0.2 ? 4 : 0, cls: 'tk' });
      }
      return p.svg();
    }
  };

  // The unit circle unrolled into the sine wave.
  F.sineWave = {
    controls: [{ k: 't', label: 'angle \u03B8', min: 0, max: 6.28, step: 0.02, val: 2.1, fmt: v => `${v.toFixed(2)} rad` }],
    draw(s) {
      const p = Plot({ x: [-4.6, 6.6], y: [-1.25, 1.4], w: 340, h: 172, pad: 6 }), k = p.sy / p.sx, cx = -0.35 - k;
      p.seg(-0.1, 0, 6.55, 0, 'ax', true).seg(0, -1.2, 0, 1.35, 'ax', true).seg(cx - k * 1.15, 0, cx + k * 1.1, 0, 'faint');
      p.par(t => cx + k * Math.cos(t), Math.sin, 0, 2 * PI, 'mut');
      for (const [v, l] of [[PI / 2, '\u03C0/2'], [PI, '\u03C0'], [3 * PI / 2, '3\u03C0/2'], [2 * PI, '2\u03C0']]) { p.seg(v, -0.06, v, 0.06, 'ax'); p.txt(v, 0, l, { dy: 16, a: 'middle', cls: 'tk' }); }
            p.fn(Math.sin, 'faint', 0, 2 * PI).fn(Math.sin, 'b', 0, s.t);
      const px = cx + k * Math.cos(s.t), py = Math.sin(s.t);
      p.add(`<path class="ink" d="M${p.X(cx)} ${p.Y(0)}L${p.X(px)} ${p.Y(py)}"/>`);
      p.seg(px, py, s.t, py, 'mut dash').seg(s.t, 0, s.t, py, 'sinl');
      p.dot(px, py, 'ink', 4.5).dot(s.t, py, 'b', 4.5);
      return p.svg();
    },
    read: s => `As the point travels around the circle, its height is sin \u03B8 = ${Math.sin(s.t).toFixed(3)}. Plotting that height against the angle traced so far draws the sine wave; one lap (2\u03C0) is one period.`
  };

  F.sinGraph = {
    controls: [{ k: 'A', label: 'A (amplitude)', min: -3, max: 3, step: 0.5, val: 2 }, { k: 'B', label: 'B', min: 0.5, max: 3, step: 0.5, val: 1 }, { k: 'C', label: 'C (shift)', min: -3.14, max: 3.14, step: PI / 4, val: 0, fmt: v => piText(v) }, { k: 'D', label: 'D (midline)', min: -2, max: 2, step: 0.5, val: 0 }],
    draw(s, o) {
      const f = o.fn === 'cos' ? Math.cos : Math.sin;
      const p = Plot({ x: [-PI, 2 * PI + 0.3], y: [-5, 5], h: 250 }).axes({ xt: [[-PI, '\u2212\u03C0'], [PI / 2, '\u03C0/2'], [PI, '\u03C0'], [3 * PI / 2, '3\u03C0/2'], [2 * PI, '2\u03C0']], yt: 1, xl: '' });
      p.fn(f, 'faint').seg(-PI, s.D, 2 * PI + 0.3, s.D, 'mut dash');
      p.fn(x => s.A * f(s.B * (x - s.C)) + s.D, 'a');
      return p.svg();
    },
    read(s, o) {
      const per = 2 * PI / s.B;
      return `y = ${minus(s.A)} ${o.fn === 'cos' ? 'cos' : 'sin'}(${s.B}(x ${s.C < 0 ? '+' : '\u2212'} ${piText(Math.abs(s.C))})) ${s.D < 0 ? '\u2212' : '+'} ${Math.abs(s.D)}. Amplitude ${Math.abs(s.A)}, period 2\u03C0/${s.B} \u2248 ${per.toFixed(2)}, shift ${piText(s.C)}, range [${minus(s.D - Math.abs(s.A))}, ${minus(s.D + Math.abs(s.A))}]. The faint curve is the parent ${o.fn === 'cos' ? 'cos' : 'sin'} x.`;
    }
  };

  F.tanGraph = {
    draw() {
      const p = Plot({ x: [-PI, PI * 1.6], y: [-4, 4], h: 240 }).axes({ xt: [[-PI / 2, '\u2212\u03C0/2'], [PI / 2, '\u03C0/2'], [PI, '\u03C0'], [3 * PI / 2, '3\u03C0/2']], yt: 1, xl: '' });
      for (const v of [-PI / 2, PI / 2, 3 * PI / 2]) p.seg(v, -4, v, 4, 'b dash');
      p.fn(Math.tan, 'a', -PI, PI * 1.6, 900);
      return p.svg();
    }
  };

  F.pythagUnit = {
    controls: [{ k: 'd', label: 'angle \u03B8', min: 5, max: 85, step: 1, val: 40, fmt: v => v + '\u00B0' }],
    draw(s) {
      const t = s.d * PI / 180, p = Plot({ x: [-0.25, 1.3], y: [-0.2, 1.15], eq: true, w: 280, pad: 6 });
      p.seg(-0.2, 0, 1.25, 0, 'ax', true).seg(0, -0.15, 0, 1.1, 'ax', true).arc(0, 0, 1, -0.1, PI / 2 + 0.1, 'mut');
      ucPoint(p, t, { labels: false });
      p.txt(Math.cos(t) / 2, 0, 'cos \u03B8', { dy: 15, a: 'middle', cls: 'tu a' }).txt(Math.cos(t), Math.sin(t) / 2, 'sin \u03B8', { dx: 6, cls: 'tu b' }).txt(Math.cos(t) / 2, Math.sin(t) / 2, '1', { dx: -8, a: 'end' });
      return p.svg();
    },
    read(s) { const t = s.d * PI / 180, c = Math.cos(t), sn = Math.sin(t); return `cos\u00B2\u03B8 + sin\u00B2\u03B8 = ${(c * c).toFixed(3)} + ${(sn * sn).toFixed(3)} = 1. It is the Pythagorean theorem on a triangle with hypotenuse 1.`; }
  };

  F.inverseSin = {
    draw() {
      const p = Plot({ x: [-3.3, 3.3], y: [-2, 2], eq: true, w: 340, pad: 8 }).axes({ xt: [[-PI / 2, '\u2212\u03C0/2'], [-1, '\u22121'], [1, '1'], [PI / 2, '\u03C0/2']], yt: [[-PI / 2, '\u2212\u03C0/2'], [1, '1'], [PI / 2, '\u03C0/2']] });
      p.fn(x => x, 'mut dash').fn(Math.sin, 'faint').fn(Math.sin, 'a', -PI / 2, PI / 2).fn(Math.asin, 'b', -1, 1);
      p.dot(-PI / 2, -1, 'a', 3.5).dot(PI / 2, 1, 'a', 3.5).dot(-1, -PI / 2, 'b', 3.5).dot(1, PI / 2, 'b', 3.5);
      p.txt(2.2, 1.0, 'sin x', { cls: 'tu a' }).txt(-0.75, 1.85, 'arcsin x', { a: 'end', cls: 'tu b' }).txt(2.1, 2.1, 'y = x', { cls: 'tu', dy: 14 });
      return p.svg();
    }
  };

  F.trigEq = {
    draw() {
      const p = Plot({ x: [-0.3, 2 * PI + 0.3], y: [-1.4, 1.4], h: 190 }).axes({ xt: [[PI / 6, '\u03C0/6'], [5 * PI / 6, '5\u03C0/6'], [3 * PI / 2, '3\u03C0/2'], [2 * PI, '2\u03C0']], yt: [[0.5, '1/2'], [1, '1'], [-1, '\u22121']], xl: '' });
      p.fn(Math.sin, 'a', 0, 2 * PI).seg(0, 0.5, 2 * PI, 0.5, 'b dash');
      p.seg(PI / 6, 0, PI / 6, 0.5, 'mut').seg(5 * PI / 6, 0, 5 * PI / 6, 0.5, 'mut').dot(PI / 6, 0.5, 'b').dot(5 * PI / 6, 0.5, 'b');
      return p.svg();
    }
  };

  F.oblique = {
    draw() {
      const p = Plot({ x: [-0.4, 6.4], y: [-0.6, 3.6], eq: true, w: 330, pad: 6 });
      const A = [0, 0], B = [6, 0], C = [2, 3];
      p.poly([A, B, C], 'tri').seg(...A, ...B, 'ink').seg(...B, ...C, 'ink').seg(...A, ...C, 'ink');
      p.txt(...A, 'A', { dx: -6, dy: 14, a: 'end' }).txt(...B, 'B', { dx: 6, dy: 14 }).txt(...C, 'C', { dy: -8, a: 'middle' });
      p.txt(3, 0, 'c', { dy: 18, a: 'middle', cls: 't b' }).txt(4, 1.5, 'a', { dx: 8, cls: 't b' }).txt(1, 1.5, 'b', { dx: -8, a: 'end', cls: 't b' });
      return p.svg();
    }
  };

  F.ssa = {
    draw() {
      const p = Plot({ x: [-0.4, 7], y: [-0.6, 3.4], eq: true, w: 330, pad: 6 });
      const A = [0, 0], C = [2.4, 2.6], r = 2.9, dx = Math.sqrt(r * r - C[1] ** 2);
      const B1 = [C[0] - dx, 0], B2 = [C[0] + dx, 0];
      p.seg(0, 0, 6.8, 0, 'ax').seg(...A, ...C, 'ink');
      p.arc(C[0], C[1], r, -PI * 0.92, -PI * 0.08, 'mut dash');
      p.seg(...C, ...B1, 'a').seg(...C, ...B2, 'b').dot(...B1, 'a').dot(...B2, 'b');
      p.txt(...A, 'A', { dx: -6, dy: 14, a: 'end' }).txt(...C, 'C', { dy: -8, a: 'middle' }).txt(...B1, 'B\u2081', { dy: 18, a: 'middle' }).txt(...B2, 'B\u2082', { dy: 18, a: 'middle' });
      p.txt(4.2, 2.6, 'side a fits twice', { cls: 'tu' });
      return p.svg();
    }
  };

  // =====================================================================
  // Precalculus
  // =====================================================================
  const BASES = { sq: [x => x * x, 'x\u00B2'], abs: [Math.abs, '|x|'], root: [x => (x >= 0 ? Math.sqrt(x) : NaN), '\u221Ax'], cube: [x => x ** 3 / 2, 'x\u00B3/2'] };
  F.transform = {
    controls: [{ k: 'base', label: 'parent', options: [['sq', 'x\u00B2'], ['abs', '|x|'], ['root', '\u221Ax']], val: 'sq' }, { k: 'a', label: 'a (stretch)', min: -2, max: 2, step: 0.5, val: 1 }, { k: 'h', label: 'h (horizontal)', min: -4, max: 4, step: 1, val: 2 }, { k: 'k', label: 'k (vertical)', min: -4, max: 4, step: 1, val: 1 }],
    draw(s) {
      const f = BASES[s.base][0], p = Plot({ x: [-6, 6], y: [-6, 6], eq: true, w: 300 }).grid(1).axes({ xt: 2, yt: 2 });
      p.fn(f, 'faint').fn(x => s.a * f(x - s.h) + s.k, 'a', -6, 6, 600).dot(s.h, s.k, 'b');
      return p.svg();
    },
    read: s => `y = ${s.a === 1 ? '' : minus(s.a)}f(x ${s.h < 0 ? '+' : '\u2212'} ${Math.abs(s.h)}) ${s.k < 0 ? '\u2212' : '+'} ${Math.abs(s.k)} with f(x) = ${BASES[s.base][1]}. The key point (0, 0) moved to (${minus(s.h)}, ${minus(s.k)}): ${s.h >= 0 ? 'right' : 'left'} ${Math.abs(s.h)}, ${s.k >= 0 ? 'up' : 'down'} ${Math.abs(s.k)}${s.a < 0 ? ', flipped' : ''}.`
  };

  F.inverseReflect = {
    draw() {
      const p = Plot({ x: [-3, 4], y: [-3, 4], eq: true, w: 300 }).grid(1).axes({ xt: 1, yt: 1 });
      p.fn(x => x, 'mut dash').fn(Math.exp, 'a').fn(x => (x > 0 ? Math.log(x) : NaN), 'b', 0.01, 4, 500);
      p.dot(0, 1, 'a').dot(1, 0, 'b').dot(1, Math.E, 'a', 3.5).dot(Math.E, 1, 'b', 3.5);
      p.txt(-2.9, 0.45, 'y = e\u02E3', { cls: 'tu a' }).txt(2.6, 0.55, 'y = ln x', { cls: 'tu b' }).txt(-2.4, -2.4, 'y = x', { cls: 'tu', dx: 8 });
      return p.svg();
    }
  };

  F.polyZeros = {
    draw() {
      const f = x => 0.25 * (x + 2) * (x - 1) ** 2 * (x - 3);
      const p = Plot({ x: [-3.2, 4], y: [-5, 4], h: 230 }).grid(1).axes({ xt: 1, yt: 2 });
      p.fn(f, 'a').dot(-2, 0, 'b').dot(1, 0, 'c').dot(3, 0, 'b');
      p.txt(-2, 0, 'crosses', { dy: -10, a: 'middle', cls: 'tu' }).txt(1, 0, 'touches', { dy: -10, a: 'middle', cls: 'tu' }).txt(3, 0, 'crosses', { dy: -10, a: 'middle', cls: 'tu' });
      return p.svg();
    }
  };

  F.rational = {
    draw() {
      const f = x => (2 * x * x - 2) / (x * x - x - 2);
      const p = Plot({ x: [-6, 7], y: [-6, 8], h: 250 }).grid(1).axes({ xt: 2, yt: 2 });
      p.seg(2, -6, 2, 8, 'b dash').seg(-6, 2, 7, 2, 'c dash');
      p.fn(f, 'a', -6, 7, 1200).dot(-1, 4 / 3, 'a', 5, true);
      p.txt(2, 7, 'x = 2', { dx: 5, cls: 'tu b' }).txt(-5.8, 2, 'y = 2', { dy: -6, cls: 'tu c' }).txt(-1, 4 / 3, 'hole', { dy: 20, a: 'middle', cls: 'tu' });
      return p.svg();
    }
  };

  F.expCurves = {
    controls: [{ k: 'b', label: 'base b', min: 0.25, max: 3, step: 0.25, val: 2 }],
    draw(s) {
      const p = Plot({ x: [-4, 4], y: [-1, 8], h: 240 }).grid(1).axes({ xt: 1, yt: 1 });
      p.fn(Math.exp, 'faint').fn(x => s.b ** x, 'a').dot(0, 1, 'b').dot(1, s.b, 'a', 3.5);
      return p.svg();
    },
    read: s => s.b === 1 ? 'b = 1 gives the flat line y = 1: no growth at all.' : `y = ${s.b}\u02E3 ${s.b > 1 ? 'grows' : 'decays'}: each step of 1 in x multiplies y by ${s.b}. Every curve passes through (0, 1). The faint curve is e\u02E3.`
  };

  F.geoSquares = {
    draw() {
      const S = 220, X0 = 60, Y0 = 10, p = Canvas(340, 240);
      let x = X0, y = Y0, w = S, h = S, horiz = true, k = 1;
      p.add(`<rect class="tile" x="${X0}" y="${Y0}" width="${S}" height="${S}"/>`);
      for (let i = 0; i < 7; i++) {
        const cls = ['ta', 'tb', 'tc'][i % 3];
        if (horiz) { p.add(`<rect class="tile ${cls}" x="${x}" y="${y}" width="${r2(w / 2)}" height="${r2(h)}"/>`); if (i < 4) p.txt(x + w / 4, y + h / 2 + 5, `1/${k * 2}`, { a: 'middle', cls: 'tu' }); x += w / 2; w /= 2; }
        else { p.add(`<rect class="tile ${cls}" x="${x}" y="${y}" width="${r2(w)}" height="${r2(h / 2)}"/>`); if (i < 4) p.txt(x + w / 2, y + h / 4 + 5, `1/${k * 2}`, { a: 'middle', cls: 'tu' }); y += h / 2; h /= 2; }
        horiz = !horiz; k *= 2;
      }
      return p.svg();
    }
  };

  F.conics = {
    draw() {
      const W = 340, p = Canvas(W, 300), panels = [];
      const mini = (ox, oy, title, fnDraw) => {
        const q = Plot({ x: [-3, 3], y: [-3, 3], w: 160, h: 140, pad: 10 });
        q.seg(-3, 0, 3, 0, 'ax').seg(0, -3, 0, 3, 'ax'); fnDraw(q);
        panels.push(`<g transform="translate(${ox} ${oy})">${q.svg().replace(/^<svg[^>]*>|<\/svg>$/g, '')}<text class="tu" x="80" y="152" text-anchor="middle">${title}</text></g>`);
      };
      mini(0, 0, 'circle', q => q.circ(0, 0, 2, 'a'));
      mini(175, 0, 'ellipse', q => q.par(t => 2.6 * Math.cos(t), t => 1.4 * Math.sin(t), 0, 2 * PI, 'a'));
      mini(0, 150, 'parabola', q => q.fn(x => x * x / 2 - 2, 'a'));
      mini(175, 150, 'hyperbola', q => { q.fn(x => 0.8 * x, 'mut dash').fn(x => -0.8 * x, 'mut dash'); q.par(t => 1.2 * Math.cosh(t), t => Math.sinh(t), -2, 2, 'a').par(t => -1.2 * Math.cosh(t), t => Math.sinh(t), -2, 2, 'a'); });
      p.add(panels.join(''));
      return p.svg();
    }
  };

  F.complexPlane = {
    draw() {
      const p = Plot({ x: [-1, 5], y: [-3.4, 3.4], eq: true, w: 260 }).grid(1).axes({ xt: 1, yt: 1, xl: 'Re', yl: 'Im' });
      p.seg(0, 0, 3, 2, 'a', true).seg(0, 0, 3, -2, 'b dash').seg(3, 2, 3, -2, 'mut dash').arc(0, 0, 0.7, 0, Math.atan2(2, 3), 'ink');
      p.dot(3, 2, 'a').dot(3, -2, 'b').txt(3, 2, '3 + 2i', { dx: 8, dy: -4 }).txt(3, -2, '3 \u2212 2i', { dx: 8, dy: 10 });
      p.txt(1.2, 0.8, '|z| = \u221A13', { dx: -10, dy: -10, a: 'end', cls: 'tu' }).txt(0.8, 0.25, '\u03B8', { dy: 3 });
      return p.svg();
    }
  };

  F.polarPoint = {
    draw() {
      const p = Plot({ x: [-2.5, 2.5], y: [-0.8, 2.4], eq: true, w: 300 }).axes({ xt: 1, yt: 1 });
      p.arc(0, 0, 2, 0, PI, 'faint').seg(0, 0, -1, Math.sqrt(3), 'a').arc(0, 0, 0.5, 0, 2 * PI / 3, 'ink', true);
      p.dot(-1, Math.sqrt(3), 'a').txt(-1, Math.sqrt(3), '(\u22121, \u221A3)', { dx: -8, dy: -6, a: 'end' }).txt(-0.5, 0.87, 'r = 2', { dx: -10, a: 'end', cls: 'tu' }).txt(0.45, 0.45, '\u03B8 = 2\u03C0/3', { dx: 4, cls: 'tu' });
      return p.svg();
    }
  };

  // =====================================================================
  // Calculus I
  // =====================================================================
  F.limitHole = {
    draw() {
      const p = Plot({ x: [-1, 6], y: [-1, 9], h: 240 }).grid(1).axes({ xt: 1, yt: 1 });
      p.fn(x => x + 3, 'a', -1, 6).dot(3, 6, 'a', 5.5, true);
      p.seg(1.6, 4.6, 2.75, 5.75, 'b', true).seg(4.4, 7.4, 3.25, 6.25, 'b', true);
      p.seg(3, 0, 3, 6, 'mut dash').seg(0, 6, 3, 6, 'mut dash');
      p.txt(3, 6, 'no value at x = 3', { dx: 10, dy: 22, cls: 'tu' });
      return p.svg();
    }
  };

  F.squeeze = {
    draw() {
      const p = Plot({ x: [-0.5, 0.5], y: [-0.26, 0.26], h: 220 }).axes({ xt: [[-0.4, '\u22120.4'], [0.4, '0.4']], yt: [[0.2, '0.2'], [-0.2, '\u22120.2']] });
      p.fn(x => x * x, 'c dash').fn(x => -x * x, 'c dash').fn(x => x * x * Math.sin(1 / x), 'a', -0.5, 0.5, 4000);
      p.txt(0.32, 0.12, 'x\u00B2', { cls: 'tu c' }).txt(0.32, -0.12, '\u2212x\u00B2', { cls: 'tu c', dy: 12 });
      return p.svg();
    }
  };

  F.continuity = {
    draw() {
      const W = 340, p = Canvas(W, 150), g = [];
      const mini = (ox, title, d) => {
        const q = Plot({ x: [-2, 2], y: [-2, 2.5], w: 110, h: 120, pad: 8 }); q.seg(-2, 0, 2, 0, 'ax').seg(0, -2, 0, 2.5, 'ax'); d(q);
        g.push(`<g transform="translate(${ox} 0)">${q.svg().replace(/^<svg[^>]*>|<\/svg>$/g, '')}<text class="tu" x="55" y="140" text-anchor="middle">${title}</text></g>`);
      };
      mini(0, 'removable', q => q.fn(x => 0.5 * x + 1, 'a').dot(1, 1.5, 'a', 4, true).dot(1, 0.5, 'a', 4));
      mini(115, 'jump', q => q.fn(x => x < 0 ? 0.5 : NaN, 'a', -2, -0.001).fn(x => 1.6, 'a', 0, 2).dot(0, 0.5, 'a', 4, true).dot(0, 1.6, 'a', 4));
      mini(230, 'infinite', q => q.fn(x => 0.4 / (x * x), 'a', -2, 2, 800));
      p.add(g.join(''));
      return p.svg();
    }
  };

  F.secant = {
    controls: [{ k: 'h', label: 'h', min: 0.05, max: 2, step: 0.05, val: 1.5 }],
    draw(s) {
      const f = x => x * x / 2 + 0.5, a = 1, b = a + s.h, m = (f(b) - f(a)) / s.h;
      const p = Plot({ x: [-1, 4], y: [-1, 6], h: 240 }).grid(1).axes({ xt: 1, yt: 1 });
      p.fn(f, 'ink').fn(x => f(a) + 1 * (x - a), 'c dash').fn(x => f(a) + m * (x - a), 'b');
      p.dot(a, f(a), 'ink').dot(b, f(b), 'b').seg(a, f(a), b, f(a), 'mut').seg(b, f(a), b, f(b), 'mut');
      p.txt((a + b) / 2, f(a), 'h', { dy: 15, a: 'middle' });
      return p.svg();
    },
    read: s => `Secant slope = [f(1 + h) \u2212 f(1)] / h = ${(1 + s.h / 2).toFixed(3)}. As h shrinks toward 0, the red secant turns into the green tangent, whose slope is the derivative f\u2032(1) = 1.`
  };

  F.fDeriv = {
    draw() {
      const W = 340, p = Canvas(W, 330);
      const top = Plot({ x: [-2.5, 2.5], y: [-3, 3], w: W, h: 160, pad: 18 }).axes({ xt: 1, yt: 2, yl: 'f' });
      top.fn(x => x ** 3 - 3 * x, 'a').dot(-1, 2, 'b').dot(1, -2, 'b').txt(-1, 2, 'max', { dy: -8, a: 'middle', cls: 'tu' }).txt(1, -2, 'min', { dy: 18, a: 'middle', cls: 'tu' });
      const bot = Plot({ x: [-2.5, 2.5], y: [-4, 6], w: W, h: 160, pad: 18 }).axes({ xt: 1, yt: 2, yl: 'f\u2032' });
      bot.fn(x => 3 * x * x - 3, 'b').dot(-1, 0, 'b').dot(1, 0, 'b');
      p.add(top.svg().replace(/^<svg[^>]*>|<\/svg>$/g, '')).add(`<g transform="translate(0 168)">${bot.svg().replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>`);
      p.add(`<path class="mut dash" d="M${top.X(-1)} ${top.Y(2)}V${168 + bot.Y(0)}M${top.X(1)} ${top.Y(-2)}V${168 + bot.Y(0)}"/>`);
      return p.svg();
    }
  };

  F.mvt = {
    draw() {
      const f = x => Math.sqrt(x), a = 0.25, b = 4, m = (f(b) - f(a)) / (b - a), c = 1 / (4 * m * m);
      const p = Plot({ x: [-0.3, 4.5], y: [-0.3, 2.6], h: 210 }).axes({ xt: 1, yt: 1 });
      p.fn(x => (x >= 0 ? Math.sqrt(x) : NaN), 'ink', 0, 4.5).fn(x => f(a) + m * (x - a), 'b').fn(x => f(c) + m * (x - c), 'c dash');
      p.dot(a, f(a), 'b').dot(b, f(b), 'b').dot(c, f(c), 'c').txt(c, f(c), 'c', { dy: -9, a: 'middle' });
      return p.svg();
    }
  };

  F.ladder = {
    draw() {
      const p = Plot({ x: [-0.6, 5.2], y: [-0.6, 4.8], eq: true, w: 260, pad: 6 });
      p.add(`<path class="wall" d="M${p.X(0)} ${p.Y(4.6)}V${p.Y(0)}H${p.X(5)}"/>`);
      p.seg(3, 0, 0, 4, 'a').seg(3.15, -0.25, 4.1, -0.25, 'b', true);
      p.txt(1.5, 2, '5 m', { dx: 8 }).txt(1.5, 0, 'x', { dy: 16, a: 'middle' }).txt(0, 2, 'y', { dx: -8, a: 'end' }).txt(3.6, -0.25, 'dx/dt', { dy: 16, a: 'middle', cls: 'tu b' });
      return p.svg();
    }
  };

  F.boxOpt = {
    controls: [{ k: 'x', label: 'cut size x', min: 0.2, max: 5.8, step: 0.1, val: 1, fmt: v => v.toFixed(1) }],
    draw(s) {
      const V = x => x * (12 - 2 * x) ** 2, p = Plot({ x: [0, 6.2], y: [0, 140], h: 220 }).grid(1, 20).axes({ xt: 1, yt: 20, yl: 'V' });
      p.fn(V, 'a', 0, 6).dot(2, 128, 'c', 4).seg(s.x, 0, s.x, V(s.x), 'mut dash').dot(s.x, V(s.x), 'b');
      return p.svg();
    },
    read: s => `V(${s.x.toFixed(1)}) = ${s.x.toFixed(1)} \u00D7 ${(12 - 2 * s.x).toFixed(1)}\u00B2 = ${(s.x * (12 - 2 * s.x) ** 2).toFixed(1)}. Small cuts make a shallow box; large cuts leave little base. The top of the curve, where V\u2032 = 0, is at x = 2 with V = 128.`
  };

  F.riemann = {
    controls: [{ k: 'n', label: 'rectangles n', min: 1, max: 40, step: 1, val: 4 }, { k: 'm', label: 'height from', options: [['l', 'left'], ['c', 'middle'], ['r', 'right']], val: 'l' }],
    draw(s) {
      const f = x => Math.sin(x) + 0.2 * x + 0.3, a = 0, b = PI, dx = (b - a) / s.n;
      const p = Plot({ x: [-0.2, 3.5], y: [-0.2, 2], h: 210 }).axes({ xt: [[PI / 2, '\u03C0/2'], [PI, '\u03C0']], yt: 1 });
      for (let i = 0; i < s.n; i++) { const x = a + i * dx, h = f(x + (s.m === 'l' ? 0 : s.m === 'c' ? dx / 2 : dx)); p.poly([[x, 0], [x + dx, 0], [x + dx, h], [x, h]], 'rect'); }
      p.fn(f, 'a', 0, PI);
      return p.svg();
    },
    read(s) {
      const f = x => Math.sin(x) + 0.2 * x + 0.3, dx = PI / s.n; let sum = 0;
      for (let i = 0; i < s.n; i++) sum += f(i * dx + (s.m === 'l' ? 0 : s.m === 'c' ? dx / 2 : dx)) * dx;
      const exact = 2 + 0.1 * PI * PI + 0.3 * PI;
      return `Sum of ${s.n} rectangle${s.n === 1 ? '' : 's'} = ${sum.toFixed(4)}. Exact area = ${exact.toFixed(4)}. Error ${(sum - exact).toFixed(4)}; it shrinks as n grows.`;
    }
  };

  F.implicitCircle = {
    draw() {
      const p = Plot({ x: [-6.5, 9], y: [-6, 7.5], eq: true, w: 300 }).grid(1).axes({ xt: 2, yt: 2 });
      p.circ(0, 0, 5, 'a').seg(0, 0, 3, 4, 'mut dash').fn(x => 4 - 0.75 * (x - 3), 'b').dot(3, 4, 'ink');
      p.txt(-6.2, -5.6, 'at (3, 4): slope \u2212x/y = \u22123/4', { cls: 'tu' });
      return p.svg();
    }
  };

  // =====================================================================
  // Calculus II
  // =====================================================================
  F.areaBetween = {
    draw() {
      const p = Plot({ x: [-0.5, 2.6], y: [-0.5, 5], h: 220 }).grid(0.5, 1).axes({ xt: 1, yt: 1 });
      p.shade(x => 2 * x, x => x * x, 0, 2, 'fa').fn(x => 2 * x, 'b').fn(x => x * x, 'a').dot(0, 0, 'ink', 3.5).dot(2, 4, 'ink', 3.5);
      p.txt(1.2, 2.6, 'y = 2x', { dx: -8, a: 'end', cls: 'tu b' }).txt(2.1, 3.3, 'y = x\u00B2', { dx: 6, cls: 'tu a' });
      return p.svg();
    }
  };

  F.washer = {
    draw() {
      const p = Plot({ x: [-0.3, 1.5], y: [-1.15, 1.15], eq: true, w: 320, pad: 8 });
      p.seg(-0.2, 0, 1.4, 0, 'ax', true).seg(0, -1.1, 0, 1.1, 'ax');
      p.shade(x => x, x => x * x, 0, 1, 'fa').shade(x => -x, x => -x * x, 0, 1, 'faint-fill');
      p.fn(x => x, 'b', 0, 1).fn(x => x * x, 'a', 0, 1).fn(x => -x, 'mut dash', 0, 1).fn(x => -x * x, 'mut dash', 0, 1);
      const x = 0.6;
      p.add(`<ellipse class="b" cx="${p.X(x)}" cy="${p.Y(0)}" rx="${r2(0.09 * p.sx)}" ry="${r2(x * p.sy)}"/><ellipse class="a" cx="${p.X(x)}" cy="${p.Y(0)}" rx="${r2(0.05 * p.sx)}" ry="${r2(x * x * p.sy)}"/>`);
      p.txt(1.02, 0.95, 'R = x', { cls: 'tu b' }).txt(1.02, 0.62, 'r = x\u00B2', { cls: 'tu a' });
      return p.svg();
    }
  };

  F.improper = {
    controls: [{ k: 'b', label: 'upper limit b', min: 1.5, max: 30, step: 0.5, val: 4 }],
    draw(s) {
      const p = Plot({ x: [0, 10], y: [0, 1.2], h: 200 }).axes({ xt: 1, yt: [[1, '1']] });
      p.shade(x => 1 / (x * x), () => 0, 1, Math.min(s.b, 10), 'fa').fn(x => 1 / (x * x), 'a', 0.9, 10).fn(x => 1 / x, 'mut dash', 0.85, 10);
      p.txt(4.5, 0.32, '1/x (dashed)', { cls: 'tu' }).txt(2.2, 0.55, '1/x\u00B2', { cls: 'tu a' });
      return p.svg();
    },
    read: s => `Area under 1/x\u00B2 from 1 to ${s.b} = 1 \u2212 1/${s.b} = ${(1 - 1 / s.b).toFixed(4)}, which approaches 1. Under 1/x the same area is ln ${s.b} = ${Math.log(s.b).toFixed(3)}, which grows without bound.`
  };

  F.partialSums = {
    draw() {
      const p = Plot({ x: [0, 31], y: [0, 4.3], h: 230 }).grid(5, 1).axes({ xt: 5, yt: 1, xl: 'N', yl: 'S' });
      let h = 0, q = 0, g = 0;
      p.seg(0, PI * PI / 6, 31, PI * PI / 6, 'c dash').seg(0, 2, 31, 2, 'b dash');
      for (let n = 1; n <= 30; n++) { h += 1 / n; q += 1 / (n * n); g += 0.5 ** (n - 1); p.dot(n, h, 'a', 2.6).dot(n, q, 'c', 2.6).dot(n, g, 'b', 2.6); }
      p.txt(9, 1.15, '\u03A3 1/n keeps climbing', { cls: 'tu a' }).txt(9, 0.85, '\u03A3 (1/2)\u207F\u207B\u00B9 \u2192 2', { cls: 'tu b' }).txt(9, 0.55, '\u03A3 1/n\u00B2 \u2192 \u03C0\u00B2/6', { cls: 'tu c' });
      return p.svg();
    }
  };

  F.taylor = {
    controls: [{ k: 'n', label: 'degree', min: 1, max: 15, step: 2, val: 3 }],
    draw(s) {
      const T = x => { let t = 0, term = x; for (let k = 1; k <= s.n; k += 2) { t += term; term *= -x * x / ((k + 1) * (k + 2)); } return t; };
      const p = Plot({ x: [-2 * PI, 2 * PI], y: [-2.5, 2.5], h: 210 }).axes({ xt: [[-PI, '\u2212\u03C0'], [PI, '\u03C0'], [2 * PI, '2\u03C0'], [-2 * PI, '\u22122\u03C0']], yt: 1, xl: '' });
      p.fn(Math.sin, 'faint').fn(Math.sin, 'mut').fn(T, 'b', -2 * PI, 2 * PI, 600);
      return p.svg();
    },
    read: s => `Degree ${s.n} Maclaurin polynomial of sin x (red) against sin x (gray). Each added term hugs the curve over a wider stretch around 0.`
  };

  F.polarArea = {
    draw() {
      const p = Plot({ x: [-1.6, 1.6], y: [-0.3, 2.3], eq: true, w: 280, pad: 6 });
      p.seg(-1.5, 0, 1.5, 0, 'ax', true).seg(0, -0.25, 0, 2.25, 'ax', true);
      p.par(t => 2 * Math.sin(t) * Math.cos(t), t => 2 * Math.sin(t) ** 2, 0, PI, 'a');
      const t1 = 0.9, t2 = 1.05, pt = t => [2 * Math.sin(t) * Math.cos(t), 2 * Math.sin(t) ** 2];
      p.poly([[0, 0], pt(t1), pt(t2)], 'fb').txt(1.55, 0.12, 'wedge \u2248 \u00BDr\u00B2 d\u03B8', { a: 'end', cls: 'tu' });
      p.txt(-1.2, 1.8, 'r = 2 sin \u03B8', { cls: 'tu a' });
      return p.svg();
    }
  };

  F.slopeField = {
    draw(s, o) {
      const k = o.k || 'xy', f = { xy: (x, y) => x * y, ky: (x, y) => 0.6 * y, log: (x, y) => y * (1 - y / 3) }[k];
      const p = Plot({ x: [-2.2, 2.2], y: [-1, 4], eq: true, w: 300 }).axes({ xt: 1, yt: 1 });
      for (let x = -2; x <= 2.01; x += 0.4) for (let y = -0.8; y <= 3.81; y += 0.4) {
        const m = f(x, y), L = 0.15 / Math.sqrt(1 + m * m);
        p.seg(x - L, y - m * L, x + L, y + m * L, 'fld');
      }
      if (k === 'xy') p.fn(x => Math.exp(x * x / 2), 'b', -2.2, 2.2).dot(0, 1, 'b');
      if (k === 'log') p.fn(x => 3 / (1 + 2 * Math.exp(-x)), 'b').seg(-2.2, 3, 2.2, 3, 'c dash');
      if (k === 'ky') p.fn(x => Math.exp(0.6 * x), 'b');
      return p.svg();
    }
  };

  F.arcLength = {
    draw() {
      const f = x => 0.12 * x ** 3 - 0.6 * x + 2, p = Plot({ x: [-0.3, 4.3], y: [0, 6.5], h: 220 }).axes({ xt: 1, yt: 1 });
      p.fn(f, 'faint', 0, 4);
      const xs = [0, 1, 2, 3, 4];
      for (let i = 0; i < 4; i++) p.seg(xs[i], f(xs[i]), xs[i + 1], f(xs[i + 1]), 'a').dot(xs[i], f(xs[i]), 'a', 3);
      p.dot(4, f(4), 'a', 3).seg(3, f(3), 4, f(3), 'mut').seg(4, f(3), 4, f(4), 'mut').txt(3.5, f(3), 'dx', { dy: 15, a: 'middle', cls: 'tu' }).txt(4, (f(3) + f(4)) / 2, 'dy', { dx: 6, cls: 'tu' });
      return p.svg();
    }
  };

  F.trigSubTri = {
    draw() {
      const p = Plot({ x: [-0.4, 4.6], y: [-0.6, 3.2], eq: true, w: 260, pad: 6 });
      p.poly([[0, 0], [4, 0], [4, 2.8]], 'tri').seg(0, 0, 4, 0, 'c').seg(4, 0, 4, 2.8, 'b').seg(0, 0, 4, 2.8, 'ink');
      p.arc(0, 0, 0.7, 0, Math.atan2(2.8, 4), 'ink').txt(0.95, 0.22, '\u03B8');
      p.txt(2, 1.4, 'a', { dx: -8, dy: -4, a: 'end' }).txt(4, 1.4, 'x', { dx: 7 }).txt(2, 0, '\u221A(a\u00B2 \u2212 x\u00B2)', { dy: 17, a: 'middle', cls: 'tu' });
      return p.svg();
    }
  };

})();
