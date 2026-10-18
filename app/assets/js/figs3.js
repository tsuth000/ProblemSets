'use strict';
// Figures for Statistics, Python, and Physics.
(() => {
  const F = window.FIGS, { Plot, Canvas, r2, minus } = F.util, PI = Math.PI;
  const arrowTo = (p, x0, y0, x1, y1, cls, arrow) => p.seg(x0, y0, x1, y1, cls, arrow || cls.split(' ')[0]);
  // Standard normal CDF via the Abramowitz-Stegun erf approximation (error below 1.5e-7).
  const erf = x => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x);
    return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
  const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
  const phi = z => Math.exp(-z * z / 2) / Math.sqrt(2 * PI);
  F.util.Phi = Phi;
  const strip = svg => svg.replace(/^<svg[^>]*>|<\/svg>$/g, '');

  // =================== Statistics ===================
  const SAMPLE = [12, 14, 15, 15, 16, 17, 17, 18, 18, 19, 20, 21, 22, 24, 26, 29, 33, 41];
  F.histBox = {
    draw() {
      const p = Canvas(340, 250), q = Plot({ x: [8, 44], y: [0, 7.5], w: 340, h: 170, pad: 24 }).axes({ xt: 4, yt: 2, xl: '', yl: 'count' });
      for (let b = 10; b < 44; b += 4) { const n = SAMPLE.filter(v => v >= b && v < b + 4).length; if (n) q.poly([[b, 0], [b + 4, 0], [b + 4, n], [b, n]], 'rect'); }
      const sorted = SAMPLE.slice().sort((a, b) => a - b), med = (sorted[8] + sorted[9]) / 2, q1 = sorted[4], q3 = sorted[13], mean = SAMPLE.reduce((a, b) => a + b, 0) / SAMPLE.length;
      q.seg(mean, 0, mean, 7, 'b dash').txt(mean, 7, 'mean', { dx: 4, cls: 'tu b' }).seg(med, 0, med, 6.2, 'c dash').txt(med, 6.2, 'median', { dx: -4, a: 'end', cls: 'tu c' });
      p.add(strip(q.svg()));
      const X = q.X, y = 205;
      p.add(`<path class="ink" d="M${X(sorted[0])} ${y}H${X(q1)}M${X(q3)} ${y}H${X(sorted[16])}M${X(sorted[0])} ${y - 8}v16M${X(sorted[16])} ${y - 8}v16"/>`);
      p.add(`<rect class="tile ta" x="${X(q1)}" y="${y - 14}" width="${r2(X(q3) - X(q1))}" height="28"/><path class="ink" d="M${X(med)} ${y - 14}v28"/>`);
      p.dot(X(41), y, 'b', 4, true); p.txt(X(41), y + 26, 'outlier', { a: 'middle', cls: 'tk' }); p.txt(X(q1), y + 30, 'Q1', { a: 'middle', cls: 'tk' }).txt(X(q3), y + 30, 'Q3', { a: 'middle', cls: 'tk' });
      return p.svg();
    }
  };

  F.bayesTree = {
    draw() {
      const p = Canvas(340, 210), node = (x, y, t, cls) => { p.add(`<rect class="box" x="${x - 40}" y="${y - 14}" width="80" height="26" rx="5"${cls ? ` style="stroke:var(--${cls})"` : ''}/>`); p.txt(x, y + 4, t, { a: 'middle', cls: 'tu' }); };
      const ln = (a, b, c, d) => p.add(`<path class="mut" d="M${a} ${b}L${c} ${d}"/>`);
      ln(50, 105, 140, 50); ln(50, 105, 140, 160); ln(180, 50, 255, 25); ln(180, 50, 255, 75); ln(180, 160, 255, 135); ln(180, 160, 255, 185);
      node(46, 105, '1000'); node(140, 50, '10 sick'); node(140, 160, '990 well');
      node(285, 25, '9 test +', 'red'); node(285, 75, '1 test \u2212'); node(285, 135, '99 test +', 'red'); node(285, 185, '891 test \u2212');
      return p.svg();
    }
  };

  F.normal = {
    controls: [{ k: 'z', label: 'z', min: 0.1, max: 3, step: 0.05, val: 1.96, fmt: v => v.toFixed(2) }],
    draw(s) {
      const p = Plot({ x: [-3.6, 3.6], y: [0, 0.45], h: 200 }).axes({ xt: [[-3, '\u22123'], [-2, '\u22122'], [-1, '\u22121'], [1, '1'], [2, '2'], [3, '3']], yt: false, xl: 'z', yl: '' });
      p.shade(phi, () => 0, -s.z, s.z, 'fa').fn(phi, 'a').seg(-s.z, 0, -s.z, phi(s.z), 'b').seg(s.z, 0, s.z, phi(s.z), 'b');
      return p.svg();
    },
    read: s => `P(\u2212${s.z.toFixed(2)} < Z < ${s.z.toFixed(2)}) = ${(Phi(s.z) - Phi(-s.z)).toFixed(4)}. Each tail holds ${(1 - Phi(s.z)).toFixed(4)}. The 68-95-99.7 rule is z = 1, 2, 3.`
  };

  F.clt = {
    controls: [{ k: 'n', label: 'sample size n', options: [[1, '1'], [2, '2'], [5, '5'], [15, '15'], [40, '40']], val: 2 }],
    draw(s) {
      const n = s.n, lg = x => { let r = 0; for (let k = 2; k < n; k++) r += Math.log(k); return r; }, lf = lg();
      const dens = x => (x <= 0 ? 0 : Math.exp(n * Math.log(n) + (n - 1) * Math.log(x) - n * x - lf));
      const sd = 1 / Math.sqrt(n), top = Math.max(1.05, phi(0) / sd * 1.1);
      const p = Plot({ x: [0, 3.2], y: [0, top], h: 210 }).axes({ xt: 1, yt: false, xl: 'x\u0304', yl: '' });
      p.fn(z => phi((z - 1) / sd) / sd, 'c dash', 0, 3.2).fn(dens, 'a', 0.001, 3.2, 500);
      return p.svg();
    },
    read: s => `Means of n = ${s.n} draws from a strongly skewed distribution (exponential, n = 1). Blue: the exact distribution of the sample mean. Green dashed: the normal approximation. The spread shrinks like 1/\u221An and the shape turns normal.`
  };

  F.ciCoverage = {
    draw() {
      let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const gauss = () => Math.sqrt(-2 * Math.log(rnd())) * Math.cos(2 * PI * rnd());
      const p = Plot({ x: [-3.2, 3.2], y: [0, 21], h: 260 }).axes({ xt: false, yt: false, xl: '', yl: '' });
      p.seg(0, 0, 0, 20.6, 'ink dash').txt(0, 20.6, 'true mean \u03BC', { a: 'middle', dy: -4, cls: 'tu' });
      let miss = 0;
      for (let i = 0; i < 20; i++) { const c = gauss() * 1, lo = c - 1.96, hi = c + 1.96, bad = lo > 0 || hi < 0; if (bad) miss++;
        p.seg(lo, i + 0.6, hi, i + 0.6, bad ? 'b' : 'a').dot(c, i + 0.6, bad ? 'b' : 'a', 3); }
      return p.svg().replace('</svg>', `<text class="tu" x="8" y="252">${20 - miss} of 20 intervals cover \u03BC</text></svg>`);
    }
  };

  F.pvalue = {
    controls: [{ k: 'z', label: 'observed z', min: 0, max: 3.5, step: 0.05, val: 2.1, fmt: v => v.toFixed(2) }],
    draw(s) {
      const p = Plot({ x: [-3.8, 3.8], y: [0, 0.45], h: 190 }).axes({ xt: [[-2, '\u22122'], [-1.96, ''], [2, '2']], yt: false, xl: 'z', yl: '' });
      p.shade(phi, () => 0, s.z, 3.8, 'fb').shade(phi, () => 0, -3.8, -s.z, 'fb').fn(phi, 'a').seg(s.z, 0, s.z, 0.42, 'ink').txt(s.z, 0.42, 'observed', { a: 'middle', dy: -3, cls: 'tm' });
      return p.svg();
    },
    read: s => { const pv = 2 * (1 - Phi(s.z)); return `Two-sided p-value = ${pv.toFixed(4)}: the chance of a result at least this extreme if the null hypothesis is true. ${pv < 0.05 ? 'Below 0.05: reject at the 5% level.' : 'Not below 0.05: fail to reject at the 5% level.'}`; }
  };

  F.residualPlots = {
    draw() {
      const p = Canvas(340, 160), g = [];
      let seed = 3; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5;
      const mini = (ox, title, f) => { const q = Plot({ x: [0, 10], y: [-3, 3], w: 160, h: 130, pad: 10 }); q.seg(0, 0, 10, 0, 'mut dash'); for (let i = 0; i < 26; i++) { const x = 0.3 + i * 0.37; q.dot(x, f(x), 'a', 2.6); }
        g.push(`<g transform="translate(${ox} 0)">${strip(q.svg())}<text class="tu" x="80" y="150" text-anchor="middle">${title}</text></g>`); };
      mini(0, 'random scatter: fine', () => rnd() * 3.2);
      mini(175, 'curve: model misses shape', x => 0.12 * (x - 5) ** 2 - 1 + rnd() * 0.8);
      p.add(g.join(''));
      return p.svg();
    }
  };

  F.logistic = {
    draw() {
      const p = Plot({ x: [-6, 6], y: [-0.15, 1.15], h: 200 }).axes({ xt: 2, yt: [[0.5, '0.5'], [1, '1']], yl: 'p' });
      p.seg(-6, 1, 6, 1, 'faint').fn(x => 1 / (1 + Math.exp(-x)), 'a');
      for (const x of [-5, -4.2, -3, -2.5, -1, 0.4, 1.5]) p.dot(x, 0, 'b', 3.5);
      for (const x of [-1.6, -0.3, 0.8, 1.9, 2.5, 3.4, 4.5, 5.2]) p.dot(x, 1, 'c', 3.5);
      return p.svg();
    }
  };

  F.biasVariance = {
    draw() {
      const p = Plot({ x: [0, 10], y: [0, 10], h: 210 }).axes({ xt: false, yt: false, xl: '', yl: 'error' });
      p.txt(5, 0, 'model complexity \u2192', { a: 'middle', dy: 18, cls: 'tk' });
      p.fn(x => 8 * Math.exp(-0.35 * x) + 0.4, 'a').fn(x => 8 * Math.exp(-0.35 * x) + 0.06 * x * x + 0.9, 'b').seg(4.1, 0, 4.1, 9.5, 'mut dash');
      p.txt(9.6, 1.8, 'training error', { a: 'end', cls: 'tu a' }).txt(9.6, 7.6, 'test error', { a: 'end', cls: 'tu b' }).txt(4.1, 9.5, 'best', { dx: 4, cls: 'tu' });
      p.txt(0.5, 2.5, 'underfit', { cls: 'tk' }).txt(7.2, 9.5, 'overfit', { cls: 'tk' });
      return p.svg();
    }
  };

  // =================== Python ===================
  const boxText = (p, x, y, w, h, t, cls = 'box') => { p.add(`<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`); p.add(`<text class="tcode" x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle">${t}</text>`); };
  const arrowPx = (p, x0, y0, x1, y1) => p.add(`<path class="ink" d="M${x0} ${y0}L${x1} ${y1}" marker-end="url(#ARW)"/>`);
  const fixArrows = svg => { const id = (svg.match(/marker id="(f\d+)ik"/) || [])[1]; return svg.replace(/url\(#ARW\)/g, `url(#${id}ik)`); };

  F.namesObjects = {
    draw() {
      const p = Canvas(340, 170);
      p.txt(14, 18, 'names', { cls: 'tk' }).txt(170, 18, 'objects', { cls: 'tk' });
      boxText(p, 14, 34, 44, 30, 'a'); boxText(p, 14, 82, 44, 30, 'b'); boxText(p, 14, 130, 44, 30, 'c');
      boxText(p, 170, 50, 150, 40, '[1, 2, 3]', 'tile ta'); boxText(p, 170, 118, 150, 40, '[1, 2, 3]', 'tile tb');
      arrowPx(p, 58, 49, 166, 66); arrowPx(p, 58, 97, 166, 76); arrowPx(p, 58, 145, 166, 138);
      return fixArrows(p.svg());
    }
  };

  F.copies = {
    draw() {
      const p = Canvas(340, 180);
      boxText(p, 10, 28, 40, 30, 'a'); boxText(p, 10, 122, 40, 30, 'b');
      boxText(p, 80, 20, 100, 46, '[ \u2022 , \u2022 ]', 'tile ta'); boxText(p, 80, 114, 100, 46, '[ \u2022 , \u2022 ]', 'tile tb');
      boxText(p, 240, 52, 86, 32, '[1, 2]', 'tile tc'); boxText(p, 240, 96, 86, 32, '[3, 4]', 'tile tc');
      arrowPx(p, 50, 43, 76, 43); arrowPx(p, 50, 137, 76, 137);
      for (const y0 of [43, 137]) { arrowPx(p, 112, y0, 236, 68); arrowPx(p, 148, y0, 236, 112); }
      return fixArrows(p.svg());
    }
  };

  F.sliceIdx = {
    controls: [{ k: 'a', label: 'start', min: 0, max: 6, step: 1, val: 1 }, { k: 'b', label: 'stop', min: 0, max: 6, step: 1, val: 4 }],
    draw(s) {
      const p = Canvas(340, 150), w = 46, x0 = 32, word = 'PYTHON';
      for (let i = 0; i < 6; i++) {
        const on = i >= s.a && i < s.b;
        p.add(`<rect class="tile ${on ? 'ta' : ''}" x="${x0 + i * w}" y="50" width="${w}" height="44"/>`);
        p.add(`<text class="tcode" x="${x0 + i * w + w / 2}" y="78" text-anchor="middle">${word[i]}</text>`);
        p.txt(x0 + i * w + w / 2, 40, String(i), { a: 'middle', cls: 'tu a' }).txt(x0 + i * w + w / 2, 114, String(i - 6), { a: 'middle', cls: 'tu b' });
      }
      for (const [k, cls] of [[s.a, 'c'], [s.b, 'c']]) p.add(`<path class="${cls}" d="M${x0 + k * w} 44V100"/>`);
      return p.svg();
    },
    read: s => `s = "PYTHON"; s[${s.a}:${s.b}] == "${'PYTHON'.slice(s.a, s.b)}". Indices sit on the letters; slice boundaries (green) sit between them, so s[a:b] has b \u2212 a characters. Negative indices count from the end (red).`
  };

  F.broadcast = {
    draw() {
      const p = Canvas(340, 150), c = 22;
      const grid = (x, y, r, k, cls, vals) => { for (let i = 0; i < r; i++) for (let j = 0; j < k; j++) { p.add(`<rect class="tile ${cls}" x="${x + j * c}" y="${y + i * c}" width="${c}" height="${c}"/>`); if (vals) p.add(`<text class="tm" x="${x + j * c + c / 2}" y="${y + i * c + 15}" text-anchor="middle">${vals(i, j)}</text>`); } };
      grid(10, 30, 3, 1, 'ta', i => i * 10); p.txt(42, 70, '+', { cls: 'tb' });
      grid(60, 30, 1, 4, 'tb', (i, j) => j); p.txt(160, 70, '=', { cls: 'tb' });
      grid(180, 30, 3, 4, 'tc', (i, j) => i * 10 + j);
      p.txt(21, 116, '(3, 1)', { a: 'middle', cls: 'tu' }).txt(104, 116, '(1, 4)', { a: 'middle', cls: 'tu' }).txt(224, 116, '(3, 4)', { a: 'middle', cls: 'tu' });
      p.txt(170, 140, 'size-1 axes stretch to match', { a: 'middle', cls: 'tk' });
      return p.svg();
    }
  };

  F.scopes = {
    draw() {
      const p = Canvas(340, 200), boxes = [['Built-in: len, print', 6, 6, 328, 188, ''], ['Global: module names', 22, 34, 296, 152, 'ta'], ['Enclosing: outer function', 38, 62, 264, 116, 'tb'], ['Local: this function', 54, 90, 232, 80, 'tc']];
      for (const [t, x, y, w, h, cls] of boxes) { p.add(`<rect class="tile ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`); p.txt(x + 8, y + 18, t, { cls: 'tu' }); }
      p.txt(170, 150, 'lookup goes outward: L, E, G, B', { a: 'middle', cls: 'tb' });
      return p.svg();
    }
  };

  // =================== Physics ===================
  F.kinGraphs = {
    controls: [{ k: 't', label: 'time t (s)', min: 0.5, max: 4, step: 0.1, val: 3, fmt: v => v.toFixed(1) }],
    draw(s) {
      const v0 = 1, a = 1.5, x = t => v0 * t + 0.5 * a * t * t, v = t => v0 + a * t;
      const p = Canvas(340, 330);
      const top = Plot({ x: [0, 4.3], y: [0, 17], w: 340, h: 160, pad: 22 }).axes({ xt: 1, yt: 5, xl: 't', yl: 'x (m)' });
      top.fn(x, 'a', 0, 4).dot(s.t, x(s.t), 'b');
      const bot = Plot({ x: [0, 4.3], y: [0, 8], w: 340, h: 160, pad: 22 }).axes({ xt: 1, yt: 2, xl: 't', yl: 'v (m/s)' });
      bot.shade(v, () => 0, 0, s.t, 'fa').fn(v, 'a', 0, 4).dot(s.t, v(s.t), 'b');
      p.add(strip(top.svg())).add(`<g transform="translate(0 168)">${strip(bot.svg())}</g>`);
      return p.svg();
    },
    read: s => `x\u2080 = 0, v\u2080 = 1 m/s, a = 1.5 m/s\u00B2. At t = ${s.t.toFixed(1)} s, v = ${(1 + 1.5 * s.t).toFixed(2)} m/s and x = ${(s.t + 0.75 * s.t * s.t).toFixed(2)} m. The shaded area under v(t) equals the distance traveled; the slope of x(t) equals v.`
  };

  F.projectile = {
    controls: [{ k: 'd', label: 'launch angle', min: 10, max: 80, step: 5, val: 45, fmt: v => v + '\u00B0' }, { k: 'v', label: 'speed (m/s)', min: 5, max: 25, step: 1, val: 18 }],
    draw(s) {
      const g = 9.8, t = s.d * PI / 180, vx = s.v * Math.cos(t), vy = s.v * Math.sin(t), T = 2 * vy / g;
      const p = Plot({ x: [0, 66], y: [0, 33], eq: true, w: 330, pad: 22 }).grid(10).axes({ xt: 10, yt: 10, xl: 'x (m)', yl: 'y' });
      p.par(u => vx * u, u => vy * u - g * u * u / 2, 0, T, 'a', 200);
      p.dot(vx * T / 2, vy * vy / (2 * g), 'b', 4).dot(vx * T, 0, 'c', 4);
      arrowTo(p, 0, 0, vx * 0.5, vy * 0.5, 'b');
      return p.svg();
    },
    read(s) { const g = 9.8, t = s.d * PI / 180, R = s.v * s.v * Math.sin(2 * t) / g, H = (s.v * Math.sin(t)) ** 2 / (2 * g); return `Range ${R.toFixed(1)} m, peak height ${H.toFixed(1)} m, flight time ${(2 * s.v * Math.sin(t) / g).toFixed(2)} s. With no air resistance the range peaks at 45\u00B0, and complementary angles (30\u00B0 and 60\u00B0) land at the same spot.`; }
  };

  F.incline = {
    controls: [{ k: 'd', label: 'incline angle', min: 5, max: 60, step: 1, val: 30, fmt: v => v + '\u00B0' }],
    draw(s) {
      const t = s.d * PI / 180, L = 5.2, c = Math.cos(t), sn = Math.sin(t);
      const p = Plot({ x: [-0.3, 5.6], y: [-0.4, 4.4], eq: true, w: 320, pad: 6 });
      p.poly([[0, 0], [L * c, 0], [L * c, L * sn]], 'tri').seg(0, 0, L * c, 0, 'ink').seg(0, 0, L * c, L * sn, 'ink');
      const m = 0.55 * L, bx = m * c, by = m * sn, h = 0.55, cx = bx - sn * h / 2, cy = by + c * h / 2;
      p.poly([[bx - 0.45 * c, by - 0.45 * sn], [bx + 0.45 * c, by + 0.45 * sn], [bx + 0.45 * c - sn * h, by + 0.45 * sn + c * h], [bx - 0.45 * c - sn * h, by - 0.45 * sn + c * h]], 'fb');
      arrowTo(p, cx, cy, cx, cy - 1.6, 'b'); arrowTo(p, cx, cy, cx - sn * 1.6 * c, cy + c * 1.6 * c, 'a'); arrowTo(p, cx, cy, cx - c * 1.6 * sn * 0.6, cy - sn * 1.6 * sn * 0.6, 'c');
      p.txt(cx, cy - 1.6, 'mg', { dx: 6, dy: 4, cls: 'tu b' }).txt(cx - sn * 1.6 * c, cy + c * 1.6 * c, 'N', { dx: -6, a: 'end', cls: 'tu a' }).txt(cx - c * 0.96 * sn, cy - sn * 0.96 * sn, 'friction', { dx: -6, dy: 12, a: 'end', cls: 'tu c' });
      p.arc(0, 0, 0.8, 0, t, 'ink').txt(0.95, 0.12, '\u03B8', { cls: 't' });
      return p.svg();
    },
    read: s => { const t = s.d * PI / 180; return `Weight splits into mg sin \u03B8 = ${Math.sin(t).toFixed(3)}mg down the slope and mg cos \u03B8 = ${Math.cos(t).toFixed(3)}mg into it, so N = mg cos \u03B8. Without friction, a = g sin \u03B8 = ${(9.8 * Math.sin(t)).toFixed(2)} m/s\u00B2.`; }
  };

  F.circular = {
    draw() {
      const p = Plot({ x: [-2.2, 2.6], y: [-1.8, 2.2], eq: true, w: 280 });
      p.circ(0, 0, 1.5, 'mut dash').dot(0, 0, 'ink', 3);
      const t = PI / 4, x = 1.5 * Math.cos(t), y = 1.5 * Math.sin(t);
      p.seg(0, 0, x, y, 'faint'); arrowTo(p, x, y, x - 1.1 * Math.sin(t), y + 1.1 * Math.cos(t), 'a'); arrowTo(p, x, y, x - 0.75 * Math.cos(t), y - 0.75 * Math.sin(t), 'b');
      p.dot(x, y, 'ink', 6).txt(x - 1.1 * Math.sin(t), y + 1.1 * Math.cos(t), 'v (tangent)', { dx: -4, dy: -6, a: 'end', cls: 'tu a' }).txt(x - 0.75 * Math.cos(t), y - 0.75 * Math.sin(t), 'a = v\u00B2/r', { dx: 4, dy: 16, cls: 'tu b' });
      return p.svg();
    }
  };

  F.energyTrack = {
    controls: [{ k: 'x', label: 'position', min: 0, max: 10, step: 0.1, val: 3, fmt: v => v.toFixed(1) }],
    draw(s) {
      const h = x => 5 - 4.2 * Math.sin(x * PI / 10) ** 2 + 1.2 * Math.sin(x * PI / 5) ** 2 * (x > 5 ? 1 : 0), H0 = 5;
      const p = Canvas(340, 250), q = Plot({ x: [0, 10], y: [0, 6], w: 230, h: 220, pad: 18 }).axes({ xt: false, yt: 1, xl: '', yl: 'h (m)' });
      q.shade(h, () => 0, 0, 10, 'faint-fill').fn(h, 'ink', 0, 10).dot(s.x, h(s.x) + 0.18, 'b', 7);
      p.add(strip(q.svg()));
      const pe = h(s.x) / H0, bx = 262, base = 202, Hb = 170, w = 34;
      p.add(`<rect class="tile ta" x="${bx}" y="${r2(base - Hb * pe)}" width="${w}" height="${r2(Hb * pe)}"/><rect class="tile tb" x="${bx}" y="${base - Hb}" width="${w}" height="${r2(Hb * (1 - pe))}"/>`);
      if (pe > 0.08) p.txt(bx + w / 2, base - Hb * pe / 2 + 4, 'PE', { a: 'middle', cls: 'tu' });
      if (pe < 0.92) p.txt(bx + w / 2, base - Hb + Hb * (1 - pe) / 2 + 4, 'KE', { a: 'middle', cls: 'tu' });
      p.txt(bx + w / 2, base + 18, 'total', { a: 'middle', cls: 'tk' });
      return p.svg();
    },
    read: s => 'Released from rest at 5 m on a frictionless track. Potential energy turns into kinetic energy and back; the sum stays fixed, so speed depends only on height: v = \u221A(2g(5 \u2212 h)).'
  };

  F.collision = {
    draw() {
      const p = Canvas(340, 170), cart = (x, y, w, lab, cls) => { p.add(`<rect class="tile ${cls}" x="${x}" y="${y}" width="${w}" height="30" rx="4"/>`); p.txt(x + w / 2, y + 20, lab, { a: 'middle', cls: 'tu' }); p.add(`<circle class="box" cx="${x + 10}" cy="${y + 34}" r="5"/><circle class="box" cx="${x + w - 10}" cy="${y + 34}" r="5"/>`); };
      const arr = (x0, x1, y, cls) => p.add(`<path class="${cls}" d="M${x0} ${y}H${x1}" marker-end="url(#ARW)"/>`);
      p.txt(10, 20, 'before', { cls: 'tk' }); cart(20, 30, 60, '2 kg', 'ta'); arr(84, 130, 45, 'a'); p.txt(108, 38, '3 m/s', { a: 'middle', cls: 'tm' }); cart(200, 30, 80, '4 kg', 'tb'); p.txt(240, 82, 'at rest', { a: 'middle', cls: 'tm' });
      p.txt(10, 110, 'after (stick together)', { cls: 'tk' }); cart(120, 120, 140, '6 kg', 'tc'); arr(264, 310, 135, 'a'); p.txt(288, 128, '1 m/s', { a: 'middle', cls: 'tm' });
      const svg = p.svg(), id = (svg.match(/marker id="(f\d+)ab"/) || [])[1];
      return svg.replace(/url\(#ARW\)/g, `url(#${id}ab)`);
    }
  };

  F.torque = {
    controls: [{ k: 'd', label: 'angle of force', min: 0, max: 180, step: 5, val: 90, fmt: v => v + '\u00B0' }],
    draw(s) {
      const t = s.d * PI / 180, r = 2.6, Fm = 1.5;
      const p = Plot({ x: [-0.6, 4.6], y: [-1.8, 1.9], eq: true, w: 300 });
      p.circ(0, 0, 0.18, 'ink').seg(0, 0, r, 0, 'wall');
      arrowTo(p, r, 0, r + Fm * Math.cos(t), Fm * Math.sin(t), 'b');
      p.seg(r, 0, r + Fm * Math.cos(t), 0, 'mut dash').seg(r + Fm * Math.cos(t), 0, r + Fm * Math.cos(t), Fm * Math.sin(t), 'c');
      p.arc(r, 0, 0.4, 0, t, 'ink').txt(r / 2, 0, 'r', { dy: 18, a: 'middle' }).txt(r + Fm * Math.cos(t), Fm * Math.sin(t), 'F', { dx: 6, dy: -2, cls: 't b' });
      return p.svg();
    },
    read: s => { const v = Math.sin(s.d * PI / 180); return `\u03C4 = rF sin \u03B8 = ${v.toFixed(3)} rF. Only the perpendicular part of F (green) turns the bar. Pushing straight along the bar (0\u00B0 or 180\u00B0) produces no torque.`; }
  };

  F.shm = {
    controls: [{ k: 't', label: 'time (fraction of a period)', min: 0, max: 2, step: 0.02, val: 0.3, fmt: v => v.toFixed(2) + ' T' }],
    draw(s) {
      const x = Math.cos(2 * PI * s.t), p = Canvas(340, 260);
      const top = Plot({ x: [-1.6, 1.6], y: [-0.5, 0.6], w: 340, h: 80, pad: 10 });
      top.seg(-1.55, -0.3, -1.55, 0.5, 'wall');
      let d = `M${top.X(-1.55)} ${top.Y(0.1)}`; const xe = x - 0.25, nz = 14;
      for (let i = 1; i <= nz; i++) d += `L${top.X(-1.55 + (xe + 1.55) * i / nz)} ${top.Y(0.1 + (i % 2 ? 0.15 : -0.15) * (i < nz ? 1 : 0))}`;
      top.add(`<path class="ink" d="${d}"/>`).add(`<rect class="tile tb" x="${top.X(x - 0.25)}" y="${top.Y(0.35)}" width="${r2(0.5 * top.sx)}" height="${r2(0.5 * top.sy)}"/>`);
      top.seg(0, -0.4, 0, 0.55, 'mut dash').seg(-1.55, -0.3, 1.6, -0.3, 'ax');
      const bot = Plot({ x: [0, 2.1], y: [-1.3, 1.3], w: 340, h: 170, pad: 22 }).axes({ xt: [[0.5, 'T/2'], [1, 'T'], [1.5, '3T/2'], [2, '2T']], yt: [[1, 'A'], [-1, '\u2212A']], xl: 't', yl: 'x' });
      bot.fn(u => Math.cos(2 * PI * u), 'faint', 0, 2).fn(u => Math.cos(2 * PI * u), 'a', 0, s.t).dot(s.t, x, 'b');
      p.add(strip(top.svg())).add(`<g transform="translate(0 86)">${strip(bot.svg())}</g>`);
      return p.svg();
    },
    read: s => `x(t) = A cos(\u03C9t). Here x = ${Math.cos(2 * PI * s.t).toFixed(2)}A. Speed is greatest at the center and zero at the ends, where the spring force, and so the acceleration, is largest.`
  };

  F.wave = {
    controls: [{ k: 'L', label: 'wavelength \u03BB (m)', min: 1, max: 6, step: 0.5, val: 3 }, { k: 'A', label: 'amplitude A (m)', min: 0.2, max: 1.5, step: 0.1, val: 1, fmt: v => v.toFixed(1) }],
    draw(s) {
      const p = Plot({ x: [0, 10], y: [-2, 2.2], h: 200 }).axes({ xt: 1, yt: 1, xl: 'x (m)', yl: 'y' });
      p.fn(x => s.A * Math.sin(2 * PI * x / s.L), 'a');
      const x0 = s.L / 4; p.seg(x0, s.A + 0.35, x0 + s.L, s.A + 0.35, 'b').seg(x0, s.A + 0.2, x0, s.A + 0.5, 'b').seg(x0 + s.L, s.A + 0.2, x0 + s.L, s.A + 0.5, 'b').txt(x0 + s.L / 2, s.A + 0.35, '\u03BB', { a: 'middle', dy: -5, cls: 'tu b' });
      return p.svg();
    },
    read: s => `Sound in air travels at about 343 m/s, so v = f\u03BB gives f = 343/${s.L} \u2248 ${(343 / s.L).toFixed(0)} Hz for this wavelength. Amplitude sets loudness, not speed or pitch.`
  };

  F.buoyancy = {
    draw() {
      const p = Canvas(300, 200);
      p.add(`<rect class="fa" x="10" y="80" width="280" height="110"/><path class="a" d="M10 80H290"/>`);
      p.add(`<rect class="tile tc" x="110" y="50" width="80" height="70"/>`);
      p.add(`<path class="b" d="M150 85V160" marker-end="url(#ARW1)"/><path class="a" d="M162 85V20" marker-end="url(#ARW2)"/>`);
      p.txt(140, 160, 'weight', { a: 'end', cls: 'tu b' }).txt(170, 26, 'buoyant force', { cls: 'tu a' }).txt(20, 182, 'water', { cls: 'tk' });
      const svg = p.svg(), id = (svg.match(/marker id="(f\d+)k"/) || [])[1];
      return svg.replace('url(#ARW1)', `url(#${id}k)`).replace('url(#ARW2)', `url(#${id}ab)`);
    }
  };

  F.dipole = {
    draw() {
      const p = Plot({ x: [-3, 3], y: [-2.2, 2.2], eq: true, w: 320 });
      const E = (x, y) => { const f = (qx, q) => { const dx = x - qx, dy = y, r3 = Math.pow(dx * dx + dy * dy, 1.5); return [q * dx / r3, q * dy / r3]; }; const a = f(-1, 1), b = f(1, -1); return [a[0] + b[0], a[1] + b[1]]; };
      for (let x = -2.75; x <= 2.8; x += 0.5) for (let y = -2; y <= 2.01; y += 0.5) {
        if (Math.hypot(x + 1, y) < 0.35 || Math.hypot(x - 1, y) < 0.35) continue;
        const [u, v] = E(x, y), m = Math.hypot(u, v), L = 0.32; arrowTo(p, x - u / m * L / 2, y - v / m * L / 2, x + u / m * L / 2, y + v / m * L / 2, 'fl', 'a');
      }
      p.dot(-1, 0, 'b', 11).dot(1, 0, 'a', 11).txt(-1, 0, '+', { a: 'middle', dy: 5, cls: 'tb' }).txt(1, 0, '\u2212', { a: 'middle', dy: 5, cls: 'tb' });
      return p.svg().replace(/class="tb" x="([\d.]+)" y="([\d.]+)" text-anchor="middle">([+\u2212])/g, 'class="tb" style="fill:var(--on-accent)" x="$1" y="$2" text-anchor="middle">$3');
    }
  };

  const zig = (x0, y0, x1, y1) => { const n = 6, dx = (x1 - x0) / (n * 2), dy = (y1 - y0) / (n * 2), nx = -(y1 - y0), ny = x1 - x0, L = Math.hypot(nx, ny), a = 7;
    let d = `M${x0} ${y0}`; for (let i = 1; i < n * 2; i++) d += `L${r2(x0 + dx * i + (i % 2 ? 1 : -1) * a * nx / L)} ${r2(y0 + dy * i + (i % 2 ? 1 : -1) * a * ny / L)}`; return d + `L${x1} ${y1}`; };
  F.circuit = {
    draw() {
      const p = Canvas(340, 190), ink = d => p.add(`<path class="ink" d="${d}"/>`);
      p.txt(80, 18, 'series', { a: 'middle', cls: 'tu' }).txt(250, 18, 'parallel', { a: 'middle', cls: 'tu' });
      ink('M20 50H40'); ink(zig(40, 50, 80, 50)); ink('M80 50H90'); ink(zig(90, 50, 130, 50)); ink('M130 50H145V150H20V115'); ink('M20 85V50');
      p.add('<path class="ink" d="M10 100H30M14 108H26" style="stroke-width:2.5"/>'); ink('M20 100V85M20 108V115');
      p.txt(60, 38, 'R\u2081', { a: 'middle', cls: 't' }).txt(110, 38, 'R\u2082', { a: 'middle', cls: 't' }).txt(82, 174, 'R = R\u2081 + R\u2082', { a: 'middle', cls: 'tu' });
      ink('M200 50H300M200 50V85M200 115V150H300'); p.add('<path class="ink" d="M190 100H210M194 108H206" style="stroke-width:2.5"/>'); ink('M200 100V85M200 108V115');
      ink('M260 50V65'); ink(zig(260, 65, 260, 125)); ink('M260 125V150'); ink('M300 50V65'); ink(zig(300, 65, 300, 125)); ink('M300 125V150');
      p.txt(244, 100, 'R\u2081', { a: 'end', cls: 't' }).txt(316, 100, 'R\u2082', { cls: 't' }).txt(255, 174, '1/R = 1/R\u2081 + 1/R\u2082', { a: 'middle', cls: 'tu' });
      return p.svg();
    }
  };

  F.wireB = {
    draw() {
      const p = Plot({ x: [-2.2, 2.2], y: [-2.2, 2.2], eq: true, w: 260 });
      for (const r of [0.6, 1.1, 1.6, 2.05]) { p.circ(0, 0, r, 'a'); for (const t of [0.4, 2.5, 4.6]) arrowTo(p, r * Math.cos(t), r * Math.sin(t), r * Math.cos(t + 0.18), r * Math.sin(t + 0.18), 'a'); }
      p.circ(0, 0, 0.22, 'ink').dot(0, 0, 'ink', 3);
      return p.svg();
    }
  };

  F.pvCycle = {
    draw() {
      const p = Plot({ x: [0, 6], y: [0, 6], h: 230 }).axes({ xt: false, yt: false, xl: 'V', yl: 'P' });
      for (const c of [4, 8, 14]) p.fn(v => c / v, 'faint', 0.5, 6);
      p.poly([[1.5, 4.5], [4.5, 4.5], [4.5, 1.8], [1.5, 1.8]], 'fa');
      arrowTo(p, 1.5, 4.5, 4.5, 4.5, 'b'); arrowTo(p, 4.5, 4.5, 4.5, 1.8, 'b'); arrowTo(p, 4.5, 1.8, 1.5, 1.8, 'b'); arrowTo(p, 1.5, 1.8, 1.5, 4.5, 'b');
      p.txt(3, 3.15, 'net work = area', { a: 'middle', cls: 'tu' }).txt(5.9, 14 / 5.9, 'isotherms', { a: 'end', dy: -6, cls: 'tk' });
      return p.svg();
    }
  };
})();
