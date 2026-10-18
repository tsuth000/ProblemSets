'use strict';
// Figures for Discrete math, Calculus III, and Linear algebra.
(() => {
  const F = window.FIGS, { Plot, Canvas, r2, minus } = F.util, PI = Math.PI;
  // Oblique projection for 3D sketches: x toward the viewer (down-left), y right, z up.
  const pr = (x, y, z) => [y - 0.55 * x, z - 0.38 * x];
  const seg3 = (p, a, b, cls, arrow) => p.seg(...pr(...a), ...pr(...b), cls, arrow);
  const axes3 = (p, L = 2.2) => { seg3(p, [0, 0, 0], [L, 0, 0], 'ax', true); seg3(p, [0, 0, 0], [0, L, 0], 'ax', true); seg3(p, [0, 0, 0], [0, 0, L * 0.9], 'ax', true);
    p.txt(...pr(L + 0.25, 0, 0), 'x', { a: 'middle', dy: 5 }).txt(...pr(0, L + 0.2, 0), 'y', { dy: 5 }).txt(...pr(0, 0, L * 0.9 + 0.15), 'z', { a: 'middle' }); };
  const poly3 = (p, pts, cls) => p.poly(pts.map(q => pr(...q)), cls);
  const arrowTo = (p, x0, y0, x1, y1, cls, arrow) => p.seg(x0, y0, x1, y1, cls, arrow || cls.split(' ')[0]);

  // =================== Discrete ===================
  F.venn2 = {
    controls: [{ k: 'op', label: 'region', options: [['and', 'A \u2229 B'], ['or', 'A \u222A B'], ['minus', 'A \u2212 B'], ['xor', 'exactly one']], val: 'and' }],
    draw(s) {
      const p = Plot({ x: [-2.6, 2.6], y: [-1.7, 1.7], eq: true, w: 320, pad: 6 }), ca = -0.65, cb = 0.65, r = 1.25;
      const c = (x, cls) => p.add(`<ellipse class="${cls}" cx="${p.X(x)}" cy="${p.Y(0)}" rx="${r2(r * p.sx)}" ry="${r2(r * p.sy)}"/>`);
      const clipA = 'cA' + Math.random().toString(36).slice(2, 7);
      p.add(`<rect class="box" x="${p.X(-2.5)}" y="${p.Y(1.6)}" width="${r2(5 * p.sx)}" height="${r2(3.2 * p.sy)}"/>`);
      p.add(`<clipPath id="${clipA}"><ellipse cx="${p.X(ca)}" cy="${p.Y(0)}" rx="${r2(r * p.sx)}" ry="${r2(r * p.sy)}"/></clipPath>`);
      const fill = 'tri';
      if (s.op === 'or' || s.op === 'xor') { c(ca, fill); c(cb, fill); }
      if (s.op === 'minus') c(ca, fill);
      if (s.op === 'and') p.add(`<g clip-path="url(#${clipA})">`), c(cb, fill), p.add('</g>');
      if (s.op === 'minus' || s.op === 'xor') p.add(`<g clip-path="url(#${clipA})">`), c(cb, 'bgfill'), p.add('</g>');
      c(ca, 'ink'); c(cb, 'ink');
      p.txt(-1.75, 1.0, 'A', { a: 'middle' }).txt(1.75, 1.0, 'B', { a: 'middle' }).txt(-2.4, 1.35, 'U', { cls: 'tk' });
      return p.svg();
    },
    read: s => ({ and: 'A \u2229 B, "A and B": elements in both.', or: 'A \u222A B, "A or B": elements in at least one.', minus: 'A \u2212 B: elements of A that are not in B.', xor: 'Exactly one: in A or in B, but not both.' })[s.op]
  };

  F.venn3 = {
    draw() {
      const p = Plot({ x: [-2.4, 2.4], y: [-2.1, 1.9], eq: true, w: 300, pad: 6 }), r = 1.15;
      for (const [x, y, cls, lab, lx, ly] of [[-0.6, 0.35, 'vA', 'A', -1.75, 1.2], [0.6, 0.35, 'vB', 'B', 1.75, 1.2], [0, -0.65, 'vC', 'C', 0, -1.95]])
        { p.add(`<ellipse class="${cls}" cx="${p.X(x)}" cy="${p.Y(y)}" rx="${r2(r * p.sx)}" ry="${r2(r * p.sy)}"/>`); p.txt(lx, ly, lab, { a: 'middle' }); }
      p.txt(0, 0.05, 'all three', { a: 'middle', cls: 'tm' });
      return p.svg();
    }
  };

  F.dominoes = {
    draw() {
      const p = Canvas(340, 130), base = 108;
      for (let i = 0; i < 9; i++) {
        const x = 18 + i * 36, tilt = i < 3 ? 52 - i * 6 : i === 3 ? 22 : 0;
        p.add(`<rect class="tile ${i < 4 ? 'ta' : ''}" x="${x}" y="${base - 62}" width="12" height="62" transform="rotate(${tilt} ${x + 12} ${base})"/>`);
        p.txt(x + 6, base + 16, i < 8 ? String(i + 1) : '\u2026', { a: 'middle', cls: 'tk' });
      }
      p.add(`<path class="ax" d="M8 ${base}H332"/>`);
      return p.svg();
    }
  };

  F.countTree = {
    draw() {
      const p = Canvas(340, 230), root = [22, 115], shirts = ['red', 'blue', 'green'], pants = ['jeans', 'khakis'];
      p.dot(...root, 'ink', 5);
      shirts.forEach((sh, i) => {
        const y = 40 + i * 75, sx = 120;
        p.add(`<path class="mut" d="M${root[0]} ${root[1]}L${sx} ${y}"/>`); p.dot(sx, y, 'a', 4.5); p.txt(sx, y, sh, { dy: -9, a: 'middle', cls: 'tu' });
        pants.forEach((pa, j) => { const py = y - 18 + j * 36; p.add(`<path class="mut" d="M${sx} ${y}L230 ${py}"/>`); p.dot(230, py, 'b', 4); p.txt(238, py + 4, `${sh} + ${pa}`, { cls: 'tk' }); });
      });
      return p.svg();
    }
  };

  F.pascal = {
    draw() {
      const p = Canvas(340, 200), rows = 7;
      for (let n = 0; n < rows; n++) {
        let c = 1;
        for (let k = 0; k <= n; k++) {
          const x = 170 + (k - n / 2) * 44, y = 22 + n * 27;
          if (n === 4) p.add(`<circle class="pt pa" cx="${x}" cy="${y - 5}" r="13" style="fill-opacity:.15"/>`);
          p.txt(x, y, String(c), { a: 'middle', cls: n === 4 ? 'tb' : 'tu' });
          c = c * (n - k) / (k + 1);
        }
      }
      return p.svg();
    }
  };

  F.pigeons = {
    draw() {
      const p = Canvas(340, 120), boxes = 4, put = [0, 1, 2, 3, 1];
      for (let b = 0; b < boxes; b++) p.add(`<rect class="box" x="${20 + b * 80}" y="40" width="60" height="58"/>`);
      const cnt = [0, 0, 0, 0];
      put.forEach((b, i) => { const x = 38 + b * 80 + cnt[b]++ * 24, cls = b === 1 ? 'b' : 'a'; p.dot(x, 70, cls, 9); p.txt(x, 74, String(i + 1), { a: 'middle', cls: 'tm' }); });
      p.txt(170, 24, '5 pigeons, 4 holes: some hole holds at least 2', { a: 'middle', cls: 'tu' });
      return p.svg();
    }
  };

  F.clock = {
    controls: [{ k: 'a', label: 'start', min: 0, max: 11, step: 1, val: 9 }, { k: 'b', label: 'add', min: 1, max: 23, step: 1, val: 5 }],
    draw(s) {
      const p = Plot({ x: [-1.45, 1.45], y: [-1.4, 1.4], eq: true, w: 260, pad: 6 }), ang = k => PI / 2 - k * PI / 6;
      p.circ(0, 0, 1, 'ink');
      for (let k = 0; k < 12; k++) { const t = ang(k); p.seg(0.92 * Math.cos(t), 0.92 * Math.sin(t), Math.cos(t), Math.sin(t), 'ax'); p.txt(1.2 * Math.cos(t), 1.2 * Math.sin(t), String(k), { a: 'middle', dy: 5, cls: k === s.a ? 'tb' : 'tu' }); }
      const end = (s.a + s.b) % 12;
      p.arc(0, 0, 0.72, ang(s.a), ang(s.a) - s.b * PI / 6, 'b', 'b');
      p.dot(Math.cos(ang(s.a)), Math.sin(ang(s.a)), 'a', 6).dot(Math.cos(ang(end)), Math.sin(ang(end)), 'b', 6);
      return p.svg();
    },
    read: s => `${s.a} + ${s.b} = ${s.a + s.b}, and ${s.a + s.b} leaves remainder ${(s.a + s.b) % 12} when divided by 12, so ${s.a} + ${s.b} \u2261 ${(s.a + s.b) % 12} (mod 12). Going around the clock ${Math.floor((s.a + s.b) / 12)} full time${Math.floor((s.a + s.b) / 12) === 1 ? '' : 's'} changes nothing.`
  };

  F.graphDeg = {
    draw() {
      const p = Canvas(340, 200), V = [[60, 50], [180, 30], [290, 70], [250, 170], [100, 160]], E = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 4], [1, 3]];
      const deg = V.map((_, i) => E.filter(e => e.includes(i)).length);
      for (const [a, b] of E) p.add(`<path class="ink" d="M${V[a][0]} ${V[a][1]}L${V[b][0]} ${V[b][1]}"/>`);
      V.forEach(([x, y], i) => { p.add(`<circle class="pt pa" cx="${x}" cy="${y}" r="15"/>`); p.txt(x, y + 5, String(deg[i]), { a: 'middle', cls: 'tb' }); });
      return p.svg().replace(/class="tb" x/g, 'class="tb" style="fill:var(--on-accent)" x');
    }
  };

  F.mapping = {
    draw() {
      const p = Canvas(340, 170);
      const panel = (ox, title, arrows) => {
        p.add(`<ellipse class="box" cx="${ox + 30}" cy="80" rx="26" ry="58"/><ellipse class="box" cx="${ox + 120}" cy="80" rx="26" ry="58"/>`);
        const L = [40, 80, 120], Rt = [45, 80, 115];
        L.forEach((y, i) => { p.dot(ox + 30, y, 'a', 4); p.txt(ox + 18, y + 4, 'abc'[i], { a: 'end', cls: 'tu' }); });
        Rt.forEach((y, i) => { p.dot(ox + 120, y, 'b', 4); p.txt(ox + 133, y + 4, String(i + 1), { cls: 'tu' }); });
        for (const [i, j] of arrows) p.add(`<path class="mut" d="M${ox + 34} ${L[i]}L${ox + 114} ${Rt[j]}" marker-end="url(#ARW)"/>`);
        p.txt(ox + 75, 160, title, { a: 'middle', cls: 'tu' });
      };
      panel(5, 'a function', [[0, 0], [1, 0], [2, 2]]);
      panel(180, 'not a function', [[0, 0], [0, 1], [2, 2]]);
      const svg = p.svg(), id = (svg.match(/marker id="(f\d+)m"/) || [])[1];
      return svg.replace(/url\(#ARW\)/g, `url(#${id}m)`);
    }
  };

  F.growth = {
    draw() {
      const p = Plot({ x: [0, 11], y: [0, 105], h: 240 }).grid(1, 10).axes({ xt: 2, yt: 20, xl: 'n', yl: '' });
      const fs = [[n => Math.log2(n), 'log n', 'c'], [n => n, 'n', 'a'], [n => n * Math.log2(n), 'n log n', 'ink'], [n => n * n, 'n\u00B2', 'b'], [n => 2 ** n, '2\u207F', 'b dash']];
      for (const [f, lab, cls] of fs) { p.fn(f, cls, 1, 10.5); if (f(10.5) < 100) p.txt(10.4, f(10.5), lab, { a: 'end', dy: -5, dx: -2, cls: 'tu' }); }
      p.txt(6.5, 100, '2\u207F', { cls: 'tu b', dy: 4 }).txt(9.7, 100, 'n\u00B2', { cls: 'tu b', dy: 4 });
      return p.svg();
    }
  };

  F.hanoi = {
    draw() {
      const p = Canvas(340, 140);
      p.add(`<path class="ax" d="M10 118H330"/>`);
      for (const x of [60, 170, 280]) p.add(`<rect class="tile" x="${x - 3}" y="30" width="6" height="88"/>`);
      [[60, 3], [60, 2], [170, 1]].forEach(([x, w], i) => p.add(`<rect class="tile ${['ta', 'tb', 'tc'][w - 1]} disk" x="${x - 18 * w}" y="${100 - (x === 60 ? i * 18 : 0)}" width="${36 * w}" height="16" rx="4"/>`));
      p.txt(60, 136, 'A', { a: 'middle', cls: 'tu' }).txt(170, 136, 'B', { a: 'middle', cls: 'tu' }).txt(280, 136, 'C', { a: 'middle', cls: 'tu' });
      return p.svg();
    }
  };

  // =================== Calculus III ===================
  F.vecAdd = {
    draw() {
      const p = Plot({ x: [-0.6, 5], y: [-0.6, 3.8], eq: true, w: 300 }).grid(1).axes({ xt: 1, yt: 1 });
      p.poly([[0, 0], [3, 1], [4, 3], [1, 2]], 'fa');
      p.seg(3, 1, 4, 3, 'mut dash').seg(1, 2, 4, 3, 'mut dash');
      arrowTo(p, 0, 0, 3, 1, 'a'); arrowTo(p, 0, 0, 1, 2, 'b'); arrowTo(p, 0, 0, 4, 3, 'ink');
      p.txt(1.6, 0.5, 'u', { dy: 16 }).txt(0.5, 1.2, 'v', { dx: -10, a: 'end' }).txt(4, 3, 'u + v', { dx: 8, dy: 4 });
      return p.svg();
    }
  };

  F.dotProj = {
    controls: [{ k: 'd', label: 'angle between u and v', min: 0, max: 180, step: 5, val: 50, fmt: v => v + '\u00B0' }],
    draw(s) {
      const t = s.d * PI / 180, U = 3, V = 2.2, vx = V * Math.cos(t), vy = V * Math.sin(t);
      const p = Plot({ x: [-2.6, 3.6], y: [-0.7, 2.6], eq: true, w: 320 });
      p.seg(-2.5, 0, 3.5, 0, 'faint');
      p.seg(vx, vy, vx, 0, 'mut dash').seg(0, 0, vx, 0, 'c');
      arrowTo(p, 0, 0, U, 0, 'a'); arrowTo(p, 0, 0, vx, vy, 'b');
      p.arc(0, 0, 0.45, 0, t, 'ink').txt(U, 0, 'u', { dx: 6, dy: 5 }).txt(vx, vy, 'v', { dx: 6, dy: -4 }).txt(vx / 2, 0, 'shadow of v', { dy: 16, a: 'middle', cls: 'tu c' });
      return p.svg();
    },
    read(s) { const c = Math.cos(s.d * PI / 180), d = 3 * 2.2 * c; return `u \u00B7 v = |u||v| cos \u03B8 = 3 \u00D7 2.2 \u00D7 ${c.toFixed(3)} = ${minus(d.toFixed(2))}. ${Math.abs(d) < 1e-9 ? 'Perpendicular: the dot product is 0.' : d > 0 ? 'The shadow points along u: positive.' : 'The shadow points against u: negative.'}`; }
  };

  F.cross3 = {
    draw() {
      const p = Plot({ x: [-1.6, 2.6], y: [-1.1, 2.4], eq: true, w: 300, pad: 6 });
      axes3(p, 2.1);
      const u = [1.6, 0.4, 0], v = [0.2, 1.6, 0], n = [0, 0, 1.6];
      poly3(p, [[0, 0, 0], u, [1.8, 2.0, 0], v], 'fa');
      seg3(p, [0, 0, 0], u, 'a', 'a'); seg3(p, [0, 0, 0], v, 'b', 'b'); seg3(p, [0, 0, 0], n, 'c', 'c');
      p.txt(...pr(...u), 'u', { dx: -8, dy: 14 }).txt(...pr(...v), 'v', { dx: 6, dy: 14 }).txt(...pr(...n), 'u \u00D7 v', { dx: 8 });
      p.txt(...pr(0.9, 1.0, 0), 'area = |u \u00D7 v|', { a: 'middle', cls: 'tm' });
      return p.svg();
    }
  };

  F.linePlane = {
    draw() {
      const p = Plot({ x: [-1.8, 2.8], y: [-1.3, 2.5], eq: true, w: 300, pad: 6 });
      const z = (x, y) => 0.8 - 0.15 * x - 0.1 * y;
      poly3(p, [[-1, -0.2, z(-1, -0.2)], [1.8, -0.2, z(1.8, -0.2)], [1.8, 2.2, z(1.8, 2.2)], [-1, 2.2, z(-1, 2.2)]], 'fa');
      const P0 = [0.4, 1, z(0.4, 1)];
      seg3(p, P0, [P0[0] + 0.15 * 1.4, P0[1] + 0.1 * 1.4, P0[2] + 1.4], 'b', 'b');
      seg3(p, [P0[0] + 0.9, P0[1] - 1.2, P0[2] - 0.9], [P0[0] - 0.6, P0[1] + 0.8, P0[2] + 0.6], 'c');
      p.dot(...pr(...P0), 'ink', 4.5).txt(...pr(P0[0] + 0.2, P0[1] + 0.1, P0[2] + 1.4), 'normal n', { dx: 6, cls: 'tu b' }).txt(...pr(...P0), 'P\u2080', { dx: 8, dy: 14 });
      p.txt(...pr(P0[0] - 0.6, P0[1] + 0.8, P0[2] + 0.6), 'line', { dx: 6, cls: 'tu c' });
      return p.svg();
    }
  };

  F.helix = {
    controls: [{ k: 't', label: 'time t', min: 0, max: 12.5, step: 0.1, val: 4, fmt: v => v.toFixed(1) }],
    draw(s) {
      const p = Plot({ x: [-1.7, 1.9], y: [-1.1, 3.9], eq: true, w: 240, pad: 6 }), c = 0.25;
      const r = t => [Math.cos(t), Math.sin(t), c * t], v = t => [-Math.sin(t), Math.cos(t), c];
      p.par(t => pr(...r(t))[0], t => pr(...r(t))[1], 0, 12.5, 'faint', 600);
      p.par(t => pr(...r(t))[0], t => pr(...r(t))[1], 0, s.t, 'a', 600);
      const P = r(s.t), V = v(s.t);
      seg3(p, P, [P[0] + V[0] * 0.9, P[1] + V[1] * 0.9, P[2] + V[2] * 0.9], 'b', 'b'); p.dot(...pr(...P), 'ink', 4.5);
      return p.svg();
    },
    read: s => `r(t) = (cos t, sin t, t/4). At t = ${s.t.toFixed(1)} the velocity r\u2032(t) = (\u2212sin t, cos t, 1/4) (red) is tangent to the path, with constant speed \u221A(1 + 1/16) \u2248 1.031.`
  };

  F.pathsLimit = {
    draw() {
      const p = Plot({ x: [-2.2, 2.2], y: [-2.2, 2.2], eq: true, w: 280 }).axes({ xt: false, yt: false, xl: '', yl: '' });
      for (const m of [0, 0.5, 1, 2, -1, -0.5]) {
        const L = 1.9 / Math.sqrt(1 + m * m), v = m / (1 + m * m);
        p.seg(-L, -m * L, L, m * L, m >= 0 ? 'a' : 'b'); p.txt(L, m * L, minus(r2(v)), { dx: 6, dy: m < 0 ? 12 : -2, cls: 'tu' });
      }
      p.dot(0, 0, 'ink', 5, true);
      return p.svg();
    }
  };

  // Wireframe surfaces: bowl z = x^2 + y^2, saddle z = x^2 - y^2. Options draw a slice or a tangent plane.
  F.surface = {
    controls: [{ k: 'kind', label: 'surface', options: [['bowl', 'bowl'], ['saddle', 'saddle']], val: 'bowl' }],
    draw(s, o) {
      const f = s.kind === 'bowl' ? (x, y) => 0.55 * (x * x + y * y) : (x, y) => 0.55 * (x * x - y * y);
      const p = Plot({ x: [-2.2, 2.5], y: [-1.9, 2.4], eq: true, w: 300, pad: 6 }), N = 8, R = 1.3;
      for (let i = 0; i <= N; i++) {
        const a = -R + 2 * R * i / N;
        p.par(t => pr(a, t, f(a, t))[0], t => pr(a, t, f(a, t))[1], -R, R, 'mut', 60);
        p.par(t => pr(t, a, f(t, a))[0], t => pr(t, a, f(t, a))[1], -R, R, 'mut', 60);
      }
      if (o.slice) { const b = 0.65; p.par(t => pr(t, b, f(t, b))[0], t => pr(t, b, f(t, b))[1], -R, R, 'b', 80); }
      if (o.tp) {
        const [x0, y0] = [0.6, 0.5], z0 = f(x0, y0), fx = s.kind === 'bowl' ? 1.1 * x0 : 1.1 * x0, fy = s.kind === 'bowl' ? 1.1 * y0 : -1.1 * y0, h = 0.55;
        const T = (x, y) => [x, y, z0 + fx * (x - x0) + fy * (y - y0)];
        poly3(p, [T(x0 - h, y0 - h), T(x0 + h, y0 - h), T(x0 + h, y0 + h), T(x0 - h, y0 + h)], 'fb'); p.dot(...pr(x0, y0, z0), 'ink', 4.5);
      }
      if (!o.slice && !o.tp) p.dot(...pr(0, 0, 0), 'b', 5);
      return p.svg();
    },
    read: (s, o) => o.slice ? 'The red curve holds y fixed and lets x vary. Its slope is the partial derivative \u2202f/\u2202x.'
      : o.tp ? 'The tangent plane touches the surface at one point and matches its slope in every direction there.'
      : s.kind === 'bowl' ? 'z = x\u00B2 + y\u00B2: the origin is a minimum. Both partial derivatives are 0 there and the surface rises in every direction.'
      : 'z = x\u00B2 \u2212 y\u00B2: the origin is a saddle. Both partials are 0, but the surface rises along x and falls along y.'
  };

  F.contourGrad = {
    draw() {
      const p = Plot({ x: [-3, 3], y: [-2.2, 2.2], eq: true, w: 320 }).axes({ xt: 1, yt: 1 });
      for (const c of [0.5, 1.5, 3, 5, 7.5]) p.par(t => Math.sqrt(c) * Math.cos(t), t => Math.sqrt(c / 2) * Math.sin(t), 0, 2 * PI, 'mut', 120);
      for (const [x, y] of [[1, 0.5], [-1.2, 0.9], [0.5, -1.4], [2, -0.6], [-2, -0.5]]) { const gx = 2 * x, gy = 4 * y, L = 0.22; arrowTo(p, x, y, x + gx * L, y + gy * L, 'b'); p.dot(x, y, 'ink', 3); }
      return p.svg();
    }
  };

  F.lagrange = {
    draw() {
      const p = Plot({ x: [-2.4, 2.8], y: [-2.4, 2.6], eq: true, w: 300 }).grid(1).axes({ xt: 1, yt: 1 });
      for (const c of [-2, -1, 0, 1, 2, 3]) p.fn(x => c - x, c === 2 ? 'a' : 'faint');
      p.circ(0, 0, Math.SQRT2, 'ink');
      arrowTo(p, 1, 1, 1.6, 1.6, 'b'); arrowTo(p, 1, 1, 1.45, 1.45, 'c');
      p.dot(1, 1, 'ink', 5).txt(1, 1, '(1, 1)', { dx: -8, dy: 16, a: 'end' }).txt(-2.3, -2.25, 'f = x + y = 2 (blue) touches the circle', { cls: 'tu' });
      return p.svg();
    }
  };

  F.dblRegion = {
    draw() {
      const p = Plot({ x: [-0.2, 1.35], y: [-0.2, 1.25], eq: true, w: 280 }).axes({ xt: [[0.5, '0.5'], [1, '1']], yt: [[1, '1']] });
      p.shade(Math.sqrt, x => x * x, 0, 1, 'fa');
      for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) { const x = i * 0.1, y = j * 0.1; if (y >= x * x && y + 0.1 <= Math.sqrt(x) && y + 0.1 <= Math.sqrt(x + 0.1)) p.poly([[x, y], [x + 0.1, y], [x + 0.1, y + 0.1], [x, y + 0.1]], 'rect'); }
      p.fn(Math.sqrt, 'b', 0, 1.2).fn(x => x * x, 'a', 0, 1.1).txt(1.05, 1.02, 'y = \u221Ax', { cls: 'tu b' }).txt(1.02, 0.78, 'y = x\u00B2', { cls: 'tu a' });
      return p.svg();
    }
  };

  F.polarElement = {
    draw() {
      const p = Plot({ x: [-0.3, 2.4], y: [-0.3, 2.3], eq: true, w: 260 });
      p.seg(-0.2, 0, 2.3, 0, 'ax', true).seg(0, -0.2, 0, 2.2, 'ax', true);
      for (const r of [0.5, 1, 1.5, 2]) p.arc(0, 0, r, 0, PI / 2, 'faint');
      for (let k = 1; k < 6; k++) p.seg(0, 0, 2 * Math.cos(k * PI / 12), 2 * Math.sin(k * PI / 12), 'faint');
      const r0 = 1.2, r1 = 1.5, t0 = PI / 6, t1 = PI / 6 + 0.22, pts = [];
      for (let i = 0; i <= 10; i++) { const t = t0 + (t1 - t0) * i / 10; pts.push([r1 * Math.cos(t), r1 * Math.sin(t)]); }
      for (let i = 10; i >= 0; i--) { const t = t0 + (t1 - t0) * i / 10; pts.push([r0 * Math.cos(t), r0 * Math.sin(t)]); }
      p.poly(pts, 'fb');
      p.txt(1.75 * Math.cos(t0 + 0.1), 1.75 * Math.sin(t0 + 0.1), 'r dr d\u03B8', { cls: 'tu', dx: 2 });
      p.txt(1.35 * Math.cos(t0 - 0.12), 1.35 * Math.sin(t0 - 0.12), 'dr', { cls: 'tm', a: 'middle' });
      return p.svg();
    }
  };

  F.field = {
    controls: [{ k: 'kind', label: 'field', options: [['rot', '\u27E8\u2212y, x\u27E9 swirl'], ['src', '\u27E8x, y\u27E9 source']], val: 'rot' }],
    draw(s) {
      const p = Plot({ x: [-2.4, 2.4], y: [-2.4, 2.4], eq: true, w: 280 }).axes({ xt: 1, yt: 1 });
      for (let x = -2; x <= 2.01; x += 0.5) for (let y = -2; y <= 2.01; y += 0.5) {
        if (Math.abs(x) < 1e-9 && Math.abs(y) < 1e-9) continue;
        const [u, v] = s.kind === 'rot' ? [-y, x] : [x, y], m = Math.hypot(u, v), L = 0.2 + 0.07 * m;
        arrowTo(p, x - u / m * L / 2, y - v / m * L / 2, x + u / m * L / 2, y + v / m * L / 2, 'fl', 'a');
      }
      return p.svg();
    },
    read: s => s.kind === 'rot' ? 'F = \u27E8\u2212y, x\u27E9 circulates: curl = 2 everywhere, divergence 0. A paddle wheel spins; nothing piles up.' : 'F = \u27E8x, y\u27E9 spreads out: divergence = 2 everywhere, curl 0. Fluid flows outward; nothing spins.'
  };

  F.lineInt = {
    draw() {
      const p = Plot({ x: [-2.3, 2.3], y: [-2.3, 2.3], eq: true, w: 280 });
      for (let x = -2; x <= 2.01; x += 0.5) for (let y = -2; y <= 2.01; y += 0.5) { if (!x && !y) continue; const m = Math.hypot(x, y), L = 0.14 + 0.06 * m; p.seg(x, y, x - y / m * L, y + x / m * L, 'faint'); }
      p.circ(0, 0, 1.5, 'b');
      for (const t of [0.3, 1.9, 3.5, 5.1]) arrowTo(p, 1.5 * Math.cos(t), 1.5 * Math.sin(t), 1.5 * Math.cos(t + 0.35), 1.5 * Math.sin(t + 0.35), 'b');
      return p.svg();
    }
  };

  F.greenCells = {
    draw() {
      const p = Plot({ x: [-0.4, 3.4], y: [-0.4, 3.4], eq: true, w: 260 });
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
        p.poly([[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]], 'rect');
        p.arc(i + 0.5, j + 0.5, 0.26, -PI * 0.75, PI * 0.95, 'mut', true);
      }
      p.add(`<path class="b" d="M${p.X(0)} ${p.Y(0)}H${p.X(3)}V${p.Y(3)}H${p.X(0)}Z"/>`);
      arrowTo(p, 1.2, 0, 1.9, 0, 'b'); arrowTo(p, 3, 1.2, 3, 1.9, 'b'); arrowTo(p, 1.9, 3, 1.2, 3, 'b'); arrowTo(p, 0, 1.9, 0, 1.2, 'b');
      return p.svg();
    }
  };

  F.fluxOut = {
    draw() {
      const p = Plot({ x: [-2.3, 2.3], y: [-2.3, 2.3], eq: true, w: 260 });
      p.circ(0, 0, 1.4, 'fa').circ(0, 0, 1.4, 'ink');
      for (let k = 0; k < 12; k++) { const t = k * PI / 6, c = Math.cos(t), s = Math.sin(t); arrowTo(p, 1.4 * c, 1.4 * s, 2.05 * c, 2.05 * s, 'b'); if (k % 2 === 0) arrowTo(p, 0.3 * c, 0.3 * s, 0.95 * c, 0.95 * s, 'fl', 'a'); }
      p.dot(0, 0, 'a', 4);
      return p.svg();
    }
  };

  // =================== Linear algebra ===================
  F.solutionCases = {
    draw() {
      const p = Canvas(340, 150), g = [];
      const mini = (ox, title, d) => { const q = Plot({ x: [-2, 2], y: [-2, 2], w: 110, h: 120, pad: 6 }); q.seg(-2, 0, 2, 0, 'ax').seg(0, -2, 0, 2, 'ax'); d(q);
        g.push(`<g transform="translate(${ox} 0)">${q.svg().replace(/^<svg[^>]*>|<\/svg>$/g, '')}<text class="tu" x="55" y="140" text-anchor="middle">${title}</text></g>`); };
      mini(0, 'one solution', q => q.fn(x => 0.5 * x + 0.5, 'a').fn(x => -x + 0.5, 'b').dot(0, 0.5, 'ink', 4));
      mini(115, 'no solution', q => q.fn(x => 0.6 * x + 0.8, 'a').fn(x => 0.6 * x - 0.8, 'b'));
      mini(230, 'infinitely many', q => q.fn(x => 0.6 * x, 'b').fn(x => 0.6 * x, 'a dash'));
      p.add(g.join(''));
      return p.svg();
    }
  };

  F.colCombo = {
    controls: [{ k: 'x1', label: 'x\u2081', min: -2, max: 3, step: 0.5, val: 1.5 }, { k: 'x2', label: 'x\u2082', min: -2, max: 3, step: 0.5, val: 1 }],
    draw(s) {
      const a1 = [2, 1], a2 = [-1, 1.5], P = [s.x1 * a1[0], s.x1 * a1[1]], Q = [P[0] + s.x2 * a2[0], P[1] + s.x2 * a2[1]];
      const p = Plot({ x: [-5, 7], y: [-4, 7.5], eq: true, w: 300 }).grid(1).axes({ xt: 2, yt: 2 });
      p.seg(0, 0, a1[0], a1[1], 'faint').seg(0, 0, a2[0], a2[1], 'faint');
      if (s.x1) arrowTo(p, 0, 0, ...P, 'a'); if (s.x2) arrowTo(p, ...P, ...Q, 'b');
      arrowTo(p, 0, 0, ...Q, 'ink');
      return p.svg();
    },
    read: s => `Ax = x\u2081a\u2081 + x\u2082a\u2082 with columns a\u2081 = (2, 1) (blue) and a\u2082 = (\u22121, 1.5) (red). Here Ax = (${minus(r2(2 * s.x1 - s.x2))}, ${minus(r2(s.x1 + 1.5 * s.x2))}). A matrix times a vector is a recipe for mixing the columns.`
  };

  const MATS = { rot: [[0.866, -0.5], [0.5, 0.866]], shear: [[1, 1], [0, 1]], scale: [[2, 0], [0, 0.5]], reflect: [[1, 0], [0, -1]], project: [[1, 0], [0, 0]], combo: [[1.5, 0.5], [0.5, 1]] };
  F.linmap = {
    controls: [{ k: 'm', label: 'matrix', options: [['rot', 'rotate'], ['shear', 'shear'], ['scale', 'stretch'], ['reflect', 'reflect'], ['project', 'project']], val: 'shear' }],
    draw(s) {
      const A = MATS[s.m], T = (x, y) => [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y];
      const p = Plot({ x: [-2.6, 3.2], y: [-2.2, 2.6], eq: true, w: 300 });
      for (let k = -3; k <= 3; k++) { p.seg(...T(k, -3), ...T(k, 3), 'faint'); p.seg(...T(-3, k), ...T(3, k), 'faint'); }
      p.seg(-2.5, 0, 3.1, 0, 'ax').seg(0, -2.1, 0, 2.5, 'ax');
      p.poly([[0, 0], [1, 0], [1, 1], [0, 1]], 'tri').poly([[0, 0], T(1, 0), T(1, 1), T(0, 1)], 'fb');
      arrowTo(p, 0, 0, ...T(1, 0), 'a'); arrowTo(p, 0, 0, ...T(0, 1), 'c');
      p.txt(...T(1, 0), 'Ae\u2081', { dx: 6, dy: 14, cls: 'tu a' }).txt(...T(0, 1), 'Ae\u2082', { dx: 6, dy: -4, cls: 'tu c' });
      return p.svg();
    },
    read(s) {
      const A = MATS[s.m], det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      const note = { rot: 'Rotation keeps areas and shapes.', shear: 'A shear slides the top; area is unchanged.', scale: 'Stretch x by 2, squash y by 1/2: area unchanged.', reflect: 'A reflection flips orientation, so the determinant is negative.', project: 'Everything collapses onto a line: area 0, so the matrix has no inverse. The y-axis is its null space.' }[s.m];
      return `A = [[${A[0].map(v => minus(v)).join(', ')}], [${A[1].map(v => minus(v)).join(', ')}]]. Columns are where e\u2081 and e\u2082 land. det A = ${minus(r2(det))}: the unit square (blue) becomes the red shape, with area scaled by |det A|. ${note}`;
    }
  };

  F.span2 = {
    controls: [{ k: 'd', label: 'direction of v\u2082', min: 0, max: 180, step: 5, val: 70, fmt: v => v + '\u00B0' }],
    draw(s) {
      const t = s.d * PI / 180, v1 = [1.2, 0.3], v2 = [0.9 * Math.cos(t + 0.245), 0.9 * Math.sin(t + 0.245)];
      const p = Plot({ x: [-3.2, 3.2], y: [-2.6, 2.6], eq: true, w: 300 });
      for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) { const x = a * v1[0] + b * v2[0], y = a * v1[1] + b * v2[1]; if (Math.abs(x) < 3.1 && Math.abs(y) < 2.5) p.dot(x, y, 'ink', 2.2); }
      arrowTo(p, 0, 0, ...v1, 'a'); arrowTo(p, 0, 0, ...v2, 'b');
      return p.svg();
    },
    read(s) { const det = Math.sin(s.d * PI / 180); return Math.abs(det) < 1e-6 ? 'v\u2082 is a multiple of v\u2081: the vectors are dependent. Every combination lands on one line, so they span only a line.' : `The dots are integer combinations a v\u2081 + b v\u2082. Allowing all real a, b fills the whole plane: v\u2081 and v\u2082 are independent and form a basis. Turn v\u2082 to 0\u00B0 or 180\u00B0 to see the span collapse.`; }
  };

  F.subspaceLine = {
    draw() {
      const p = Plot({ x: [-3, 4], y: [-2, 4], eq: true, w: 300 }).grid(1).axes({ xt: 1, yt: 1 });
      p.fn(x => 0.5 * x, 'a').fn(x => 0.5 * x + 1.5, 'b dash');
      arrowTo(p, 0, 0, 2, 1, 'a'); arrowTo(p, 0, 0, 1, 0.5, 'a');
      p.dot(0, 1.5, 'b', 4).dot(2, 2.5, 'b', 4).dot(2, 4, 'b', 4, true);
      p.txt(1.1, -1.4, 'through 0: a subspace', { cls: 'tu a' }).txt(-2.8, 3.4, 'shifted: not a subspace', { cls: 'tu b' });
      return p.svg();
    }
  };

  F.eigen2 = {
    controls: [{ k: 'd', label: 'direction of x', min: 0, max: 180, step: 5, val: 20, fmt: v => v + '\u00B0' }],
    draw(s) {
      const t = s.d * PI / 180, x = [Math.cos(t), Math.sin(t)], Ax = [2 * x[0] + x[1], x[0] + 2 * x[1]];
      const p = Plot({ x: [-3.3, 3.3], y: [-1.5, 3.3], eq: true, w: 300 });
      p.seg(-3.2, 0, 3.2, 0, 'ax').seg(0, -1.4, 0, 3.2, 'ax').seg(-1.4, -1.4, 3.2, 3.2, 'c dash').seg(-1.5, 1.5, 1.4, -1.4, 'c dash').circ(0, 0, 1, 'faint');
      arrowTo(p, 0, 0, ...Ax, 'b'); arrowTo(p, 0, 0, ...x, 'a');
      p.txt(...Ax, 'Ax', { dx: 6, cls: 'tu b' }).txt(...x, 'x', { dx: 6, dy: 14, cls: 'tu a' });
      return p.svg();
    },
    read(s) {
      const t = s.d * PI / 180, x = [Math.cos(t), Math.sin(t)], Ax = [2 * x[0] + x[1], x[0] + 2 * x[1]], cr = x[0] * Ax[1] - x[1] * Ax[0];
      return `A = [[2, 1], [1, 2]]. ${Math.abs(cr) < 1e-6 ? `Ax points along x: x is an eigenvector, with eigenvalue \u03BB = ${r2((Ax[0] * x[0] + Ax[1] * x[1]))}.` : 'Ax points in a different direction from x. Turn x to 45\u00B0 or 135\u00B0 (the green lines) to find directions A only stretches.'}`;
    }
  };

  F.ellipseMap = {
    draw(s, o) {
      const A = o.svd ? [[1.6, 0.9], [0.1, 0.9]] : [[2, 1], [1, 2]];
      const p = Plot({ x: [-3.3, 3.3], y: [-3.1, 3.1], eq: true, w: 280 }).axes({ xt: false, yt: false });
      p.circ(0, 0, 1, 'a dash');
      p.par(t => A[0][0] * Math.cos(t) + A[0][1] * Math.sin(t), t => A[1][0] * Math.cos(t) + A[1][1] * Math.sin(t), 0, 2 * PI, 'b');
      if (!o.svd) { arrowTo(p, 0, 0, 3 * Math.SQRT1_2, 3 * Math.SQRT1_2, 'c'); arrowTo(p, 0, 0, -Math.SQRT1_2, Math.SQRT1_2, 'c'); p.txt(2.1, 2.1, '\u03BB = 3', { dx: 6, cls: 'tu c' }).txt(-0.7, 0.7, '\u03BB = 1', { dx: -6, a: 'end', cls: 'tu c' }); }
      else {
        const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1], S = [[a * a + c * c, a * b + c * d], [a * b + c * d, b * b + d * d]];
        const th = 0.5 * Math.atan2(2 * S[0][1], S[0][0] - S[1][1]);
        for (const ang of [th, th + PI / 2]) { const v = [Math.cos(ang), Math.sin(ang)], Av = [a * v[0] + b * v[1], c * v[0] + d * v[1]]; arrowTo(p, 0, 0, ...v, 'a'); arrowTo(p, 0, 0, ...Av, 'c'); }
        p.txt(-3.1, 2.8, 'right singular vectors (blue) map to', { cls: 'tm' }).txt(-3.1, 2.45, 'the ellipse axes \u03C3\u2081u\u2081, \u03C3\u2082u\u2082 (green)', { cls: 'tm' });
      }
      return p.svg();
    }
  };

  F.gramSchmidt = {
    draw() {
      const p = Plot({ x: [-0.6, 4.4], y: [-0.6, 3.4], eq: true, w: 300 }).grid(1).axes({ xt: 1, yt: 1 });
      const v1 = [3, 1], v2 = [2, 3], k = (v1[0] * v2[0] + v1[1] * v2[1]) / 10, proj = [k * 3, k * 1], u2 = [v2[0] - proj[0], v2[1] - proj[1]];
      arrowTo(p, 0, 0, ...v1, 'a'); arrowTo(p, 0, 0, ...v2, 'ink'); arrowTo(p, 0, 0, ...proj, 'c'); p.seg(...proj, ...v2, 'mut dash'); arrowTo(p, 0, 0, ...u2, 'b');
      p.txt(...v1, 'v\u2081', { dx: 6 }).txt(...v2, 'v\u2082', { dx: 6 }).txt(...proj, 'projection', { dx: 4, dy: 16, cls: 'tu c' }).txt(...u2, 'v\u2082 \u2212 proj', { dx: 6, dy: -2, cls: 'tu b' });
      return p.svg();
    }
  };

  const DATA = [[1, 2.1], [2, 2.9], [3, 3.2], [4, 4.8], [5, 4.6], [6, 6.1], [7, 6.4], [8, 7.9]];
  F.leastSquares = {
    draw() {
      const n = DATA.length, mx = DATA.reduce((a, d) => a + d[0], 0) / n, my = DATA.reduce((a, d) => a + d[1], 0) / n;
      const b1 = DATA.reduce((a, d) => a + (d[0] - mx) * (d[1] - my), 0) / DATA.reduce((a, d) => a + (d[0] - mx) ** 2, 0), b0 = my - b1 * mx;
      const p = Plot({ x: [0, 9], y: [0, 9], h: 230 }).grid(1).axes({ xt: 1, yt: 1 });
      p.fn(x => b0 + b1 * x, 'a');
      for (const [x, y] of DATA) p.seg(x, y, x, b0 + b1 * x, 'b').dot(x, y, 'ink', 3.8);
      p.txt(1.2, 8.3, `\u0177 = ${b0.toFixed(2)} + ${b1.toFixed(2)}x`, { cls: 'tu a' });
      return p.svg();
    }
  };

  F.quadForm = {
    draw() {
      const p = Plot({ x: [-2.6, 2.6], y: [-2.2, 2.2], eq: true, w: 300 }).axes({ xt: 1, yt: 1 });
      // q = 3x^2 + 2xy + 3y^2 has eigenvalues 4 (along (1,1)) and 2 (along (1,-1)).
      for (const c of [1, 3, 6]) p.par(t => Math.sqrt(c / 4) * Math.cos(t) * Math.SQRT1_2 + Math.sqrt(c / 2) * Math.sin(t) * Math.SQRT1_2, t => Math.sqrt(c / 4) * Math.cos(t) * Math.SQRT1_2 - Math.sqrt(c / 2) * Math.sin(t) * Math.SQRT1_2, 0, 2 * PI, 'a');
      p.seg(-2, -2, 2, 2, 'c dash').seg(-2, 2, 2, -2, 'c dash').txt(1.5, 1.5, '\u03BB = 4', { dx: 6, cls: 'tu c' }).txt(1.5, -1.5, '\u03BB = 2', { dx: 6, cls: 'tu c' });
      return p.svg();
    }
  };
})();
