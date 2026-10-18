'use strict';
window.T = String.raw;
window.SUBJECTS = [];
window.registerSubject = s => { window.SUBJECTS.push(s); };

// Random and formatting helpers passed to every generator.
window.R = (() => {
  const int = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const R = {
    int,
    nz(a, b) { let v; do { v = int(a, b); } while (v === 0); return v; },
    pick: arr => arr[Math.floor(Math.random() * arr.length)],
    shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    sample(arr, k) { return R.shuffle(arr).slice(0, k); },
    vec: (n, a, b) => Array.from({ length: n }, () => int(a, b)),
    gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; },
    lcm: (a, b) => Math.abs(a * b) / R.gcd(a, b),
    binom(n, k) { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); },
    // Format a number: integers as-is, otherwise up to d decimals with trailing zeros trimmed.
    fmt(v, d = 4) {
      if (Number.isInteger(v)) return String(v);
      const s = v.toFixed(d).replace(/\.?0+$/, '');
      return s === '-0' ? '0' : s;
    },
    // Signed term for polynomials: sgn(3) -> "+ 3", sgn(-1) -> "- " (coefficient 1 hidden), sgn(0) -> "".
    sgn(v, isConst = false) {
      if (v === 0) return '';
      const m = Math.abs(v);
      return (v < 0 ? '- ' : '+ ') + (m === 1 && !isConst ? '' : R.fmt(m));
    },
    // Signed term with its variable, omitted entirely when the coefficient is 0: t(-3, 'x') -> "- 3x".
    t: (v, name) => (v === 0 ? '' : R.sgn(v) + name),
    // Leading coefficient: co(1) -> "", co(-1) -> "-", co(3) -> "3".
    co: v => (v === 1 ? '' : v === -1 ? '-' : R.fmt(v)),
    // Reduced fraction as LaTeX: frac(6, -4) -> "-\frac{3}{2}", frac(4, 2) -> "2".
    frac(n, d) {
      const g = R.gcd(n, d) || 1; n /= g; d /= g;
      if (d < 0) { n = -n; d = -d; }
      return d === 1 ? String(n) : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`;
    },
    // Linear factor (x - r) written with the natural sign.
    fac: r => (r === 0 ? 'x' : r > 0 ? `(x - ${r})` : `(x + ${-r})`),
    // Monomial with zero-safe powers: mono(-3, [['x', 2], ['y', 1]]) -> "-3x^{2}y", mono(2, [['x', 0]]) -> "2", mono(0, ...) -> "0".
    mono(c, vars = []) {
      if (c === 0) return '0';
      const body = vars.filter(([, e]) => e !== 0).map(([v, e]) => (e === 1 ? v : `${v}^{${e}}`)).join('');
      return body ? R.co(c) + body : R.fmt(c);
    },
    // Linear combination with zero terms dropped: lin([[2, 'x'], [-1, 'y'], [3, '']]) -> "2x - y + 3"; all zero -> "0".
    lin(terms) {
      const kept = terms.filter(([c]) => c !== 0);
      if (!kept.length) return '0';
      return kept.map(([c, v], i) => {
        const m = Math.abs(c), mag = m === 1 && v ? '' : R.fmt(m);
        return i === 0 ? (c < 0 ? '-' : '') + mag + v : (c < 0 ? ' - ' : ' + ') + mag + v;
      }).join('');
    }
  };
  return R;
})();

// Persistence: native SharedPreferences bridge when running in the app, localStorage otherwise.
window.Store = (() => {
  const KEY = 'problemsets.v1';
  const blank = () => ({ items: {}, skills: {}, subj: {}, missed: {}, days: {}, settings: { length: 10 } });
  let data;
  function read() {
    try {
      const raw = window.AndroidStore ? window.AndroidStore.get(KEY) : localStorage.getItem(KEY);
      return raw ? Object.assign(blank(), JSON.parse(raw)) : blank();
    } catch (e) { return blank(); }
  }
  function write() {
    const raw = JSON.stringify(data);
    try { if (window.AndroidStore) window.AndroidStore.set(KEY, raw); else localStorage.setItem(KEY, raw); } catch (e) { /* storage unavailable; keep in memory */ }
  }
  data = read();
  return {
    get: () => data,
    save: write,
    reset() { const s = data.settings; data = blank(); data.settings = s; write(); }
  };
})();

// Concept notes live in js/learn/*.js and attach to subjects registered earlier.
window.registerLearn = (id, cards) => { const s = window.SUBJECTS.find(x => x.id === id); if (s) s.learn = cards; };

// Beginner lessons attach to concept notes by title: {hook, more, vary}.
window.LESSON_MISSES = [];
window.registerLessons = (id, map) => {
  const s = window.SUBJECTS.find(x => x.id === id);
  for (const [title, extra] of Object.entries(map)) {
    const card = s && s.learn && s.learn.find(c => c.title === title);
    if (card) Object.assign(card, extra); else window.LESSON_MISSES.push(id + ': ' + title);
  }
};

// Unit generators: tag existing generators with a unit, or add new ones that inherit the unit's skill.
window.registerUnitGens = (sid, spec) => {
  const s = window.SUBJECTS.find(x => x.id === sid);
  for (const [gid, title] of Object.entries(spec.tag || {})) {
    const g = s.generators.find(x => x.id === gid);
    if (g && s.learn.some(c => c.title === title)) g.unit = title; else window.LESSON_MISSES.push(`${sid}: tag ${gid} -> ${title}`);
  }
  for (const [title, gens] of Object.entries(spec.units || {})) {
    const card = s.learn.find(c => c.title === title);
    if (!card) { window.LESSON_MISSES.push(`${sid}: unit ${title}`); continue; }
    if (!card.skill) card.skill = title;
    for (const g of gens) s.generators.push(Object.assign({ skill: card.skill, unit: title }, g));
  }
};
// Content additions that live outside the original note files.
window.insertCard = (sid, after, card) => {
  const s = window.SUBJECTS.find(x => x.id === sid), i = s.learn.findIndex(c => c.title === after);
  if (i < 0) window.LESSON_MISSES.push(`${sid}: insert after ${after}`); else s.learn.splice(i + 1, 0, card);
};
window.amendCard = (sid, title, extra) => {
  const s = window.SUBJECTS.find(x => x.id === sid), card = s.learn.find(c => c.title === title);
  if (card) Object.assign(card, extra); else window.LESSON_MISSES.push(`${sid}: amend ${title}`);
};
// Display cleanup for generated math, applied only inside \( \) and \[ \]:
// "1x" -> "x", "-1x" -> "-x", "a + -b" -> "a - b", "a - -b" -> "a + b", "x^{1}" -> "x".
// Every rewrite preserves the value. Numeric products such as "1(0.5)" are left alone.
window.tidyMath = str => String(str == null ? '' : str).replace(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g, (all, a, b) => {
  let m = a != null ? a : b;
  m = m.replace(/(^|[^\w.\\^_])1(?=\\(?:sin|cos|tan|sec|csc|cot|ln|log|pi|theta)(?![a-zA-Z])|[a-zA-Z](?![a-zA-Z]))/g, '$1');
  m = m.replace(/ \+ -(?=[\w\\(])/g, ' - ').replace(/ - -(?=[\w\\(])/g, ' + ');
  m = m.replace(/\\([a-zA-Z]+)\^\{1\}(?![\d.])/g, '\\$1 ').replace(/([a-zA-Z])\^\{1\}(?![\d.])/g, '$1').replace(/\)\^\{1\}(?![\d.])/g, ')');
  m = m.replace(/([^\\ ]) +\)/g, '$1)');
  return a != null ? '\\(' + m + '\\)' : '\\[' + m + '\\]';
});
window.addQuestions = (sid, qs) =>window.SUBJECTS.find(x => x.id === sid).questions.push(...qs);
