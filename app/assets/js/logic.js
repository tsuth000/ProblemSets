'use strict';
// Propositional formulas as trees, shared by the discrete logic generators.
// Template syntax: letters p q r, slots X Y Z, and ~ & | > = for not, and, or, implies, if and only if.
// Binary operators are printed with full parentheses, so templates should be parenthesized the same way.
window.Logic = (() => {
  const SYM = { and: '\\land', or: '\\lor', imp: '\\to', iff: '\\leftrightarrow' };
  const LETTERS = ['p', 'q', 'r'], NAMES = 'ABCDEFG';

  function parse(src) {
    const s = src.replace(/\s+/g, ''); let i = 0;
    const fail = () => { throw new Error('Logic.parse: ' + src); };
    const iff = () => { let l = imp(); while (s[i] === '=') { i++; l = { op: 'iff', a: l, b: imp() }; } return l; };
    const imp = () => { const l = or(); if (s[i] === '>') { i++; return { op: 'imp', a: l, b: imp() }; } return l; };
    const or = () => { let l = and(); while (s[i] === '|') { i++; l = { op: 'or', a: l, b: and() }; } return l; };
    const and = () => { let l = unary(); while (s[i] === '&') { i++; l = { op: 'and', a: l, b: unary() }; } return l; };
    const unary = () => {
      const c = s[i++];
      if (c === '~') return { op: 'not', a: unary() };
      if (c === '(') { const e = iff(); if (s[i++] !== ')') fail(); return e; }
      if (/[pqr]/.test(c || '')) return { op: 'var', v: c };
      if (/[XYZ]/.test(c || '')) return { op: 'slot', v: c };
      return fail();
    };
    const e = iff(); if (i !== s.length) fail(); return e;
  }

  const V = v => ({ op: 'var', v }), not = a => ({ op: 'not', a }), bin = (op, a, b) => ({ op, a, b });
  const atomic = n => n.op === 'var' || n.op === 'slot' || n.op === 'not';
  const tex = n => (n.op === 'var' || n.op === 'slot' ? n.v : n.op === 'not' ? '\\neg ' + wrap(n.a) : `${wrap(n.a)} ${SYM[n.op]} ${wrap(n.b)}`);
  const wrap = n => (atomic(n) ? tex(n) : `(${tex(n)})`);
  const ev = (n, e) => {
    switch (n.op) {
      case 'var': return e[n.v];
      case 'not': return !ev(n.a, e);
      case 'and': return ev(n.a, e) && ev(n.b, e);
      case 'or': return ev(n.a, e) || ev(n.b, e);
      case 'imp': return !ev(n.a, e) || ev(n.b, e);
      default: return ev(n.a, e) === ev(n.b, e);
    }
  };
  // Python source with the same meaning, for tools/verify.py.
  const py = n => (n.op === 'var' ? n.v : n.op === 'not' ? `(not ${py(n.a)})` : n.op === 'and' ? `(${py(n.a)} and ${py(n.b)})`
    : n.op === 'or' ? `(${py(n.a)} or ${py(n.b)})` : n.op === 'imp' ? `((not ${py(n.a)}) or ${py(n.b)})` : `(${py(n.a)} == ${py(n.b)})`);
  const has = (n, v) => (n.op === 'var' ? n.v === v : n.op === 'slot' ? false : n.op === 'not' ? has(n.a, v) : has(n.a, v) || has(n.b, v));
  const varsOf = (...ns) => LETTERS.filter(v => ns.some(n => has(n, v)));
  const lambda = (n, vs = varsOf(n)) => `(lambda ${vs.join(', ')}: ${py(n)})`;
  const fill = (n, map) => (n.op === 'slot' ? map[n.v] : n.op === 'var' ? n : n.op === 'not' ? not(fill(n.a, map)) : bin(n.op, fill(n.a, map), fill(n.b, map)));
  const slotsOf = (n, out = new Set()) => { if (n.op === 'slot') out.add(n.v); else if (n.op === 'not') slotsOf(n.a, out); else if (n.op !== 'var') { slotsOf(n.a, out); slotsOf(n.b, out); } return [...out].sort(); };
  // All assignments in textbook order: the first letter in blocks of half the rows, the last alternating.
  const rowsOver = vs => { let rows = [{}]; for (const v of vs) rows = rows.flatMap(r => [true, false].map(b => Object.assign({}, r, { [v]: b }))); return rows; };
  const TV = b => (b ? 'T' : 'F');
  const rowText = (vs, r) => vs.map(v => T`\(${v}\) ${TV(r[v])}`).join(', ');
  const rowTuple = (vs, r) => `(${vs.map(v => (r[v] ? 'True' : 'False')).join(', ')})`;
  const classify = n => { const vals = rowsOver(varsOf(n)).map(r => ev(n, r)); return vals.every(Boolean) ? 'tautology' : vals.some(Boolean) ? 'contingency' : 'contradiction'; };
  const equivalent = (a, b) => rowsOver(varsOf(a, b)).every(r => ev(a, r) === ev(b, r));
  const trueRows = n => rowsOver(varsOf(n)).filter(r => ev(n, r)).length;

  // Inside-out columns: every distinct compound piece once, children before parents, the whole formula last (S).
  function columns(n) {
    const cols = [], index = new Map();
    const visit = m => {
      if (m.op === 'var') return m.v;
      const k = tex(m); if (index.has(k)) return index.get(k);
      const a = visit(m.a), b = m.op === 'not' ? null : visit(m.b);
      cols.push({ node: m, op: m.op, a, b }); index.set(k, cols.length - 1); return cols.length - 1;
    };
    visit(n);
    const name = i => (i === cols.length - 1 ? 'S' : NAMES[i]), lab = x => (typeof x === 'string' ? x : name(x));
    return cols.map((c, i) => Object.assign(c, { name: name(i), tmpl: c.op === 'not' ? `\\neg {${lab(c.a)}}` : `{${lab(c.a)}} ${SYM[c.op]} {${lab(c.b)}}` }));
  }
  const fillT = (t, sub) => t.replace(/\{(\w)\}/g, (m, k) => sub(k));
  const defs = n => columns(n).map(c => T`\(${c.name} = ${fillT(c.tmpl, k => k)}\)`).join(', ');
  const runRow = (n, r) => { const e = Object.assign({}, r); for (const c of columns(n)) e[c.name] = ev(c.node, r); return e; };
  // The full truth table with every intermediate column; T entries of the last column in bold.
  function table(n) {
    const vs = varsOf(n), cols = columns(n), head = vs.concat(cols.map(c => c.name));
    const rows = rowsOver(vs).map(r => { const e = runRow(n, r); return '<tr>' + head.map((h, j) => (j === head.length - 1 && e[h] ? '<td><b>T</b></td>' : `<td>${TV(e[h])}</td>`)).join('') + '</tr>'; });
    return `<table class="tt tv"><tr>${head.map(h => T`<th>\(${h}\)</th>`).join('')}</tr>${rows.join('')}</table>`;
  }
  // A table of several named formulas side by side (premises and conclusion, or two candidate equivalents).
  function multiTable(vs, named, bold) {
    const rows = rowsOver(vs).map(r => { const hot = bold && bold(r); return '<tr>' + vs.map(v => `<td>${TV(r[v])}</td>`).join('') + named.map(([, f]) => (hot ? `<td><b>${TV(ev(f, r))}</b></td>` : `<td>${TV(ev(f, r))}</td>`)).join('') + '</tr>'; });
    return `<table class="tt tv"><tr>${vs.map(v => T`<th>\(${v}\)</th>`).join('')}${named.map(([h]) => `<th>${h}</th>`).join('')}</tr>${rows.join('')}</table>`;
  }
  // Substitutes the truth values of one row into each column, inside out.
  function steps(n, r) {
    const e = runRow(n, r), sub = k => T`\mathrm{${TV(e[k])}}`;
    return columns(n).map(c => T`<p>\(${c.name} = ${fillT(c.tmpl, k => k)} = ${fillT(c.tmpl, sub)} = \mathrm{${TV(e[c.name])}}\)</p>`).join('');
  }
  // A counting shortcut read off the main connective. Every number is computed, so the text is always right.
  function shortcut(n) {
    const vs = varsOf(n), rows = rowsOver(vs), k = rows.length, cnt = rows.filter(r => ev(n, r)).length;
    const A = T`\(${tex(n.op === 'not' ? n.a : n.a)}\)`, Bt = n.b ? T`\(${tex(n.b)}\)` : '';
    const both = (x, y) => rows.filter(r => ev(n.a, r) === x && ev(n.b, r) === y).length;
    if (n.op === 'and') return T`The main connective is \(\land\), so count the rows where ${A} and ${Bt} are both T: ${cnt}.`;
    if (n.op === 'or') { const f = both(false, false); return T`The main connective is \(\lor\), so it is false only where ${A} and ${Bt} are both F. That happens in ${f} row${f === 1 ? '' : 's'}, so \(${k} - ${f} = ${cnt}\).`; }
    if (n.op === 'imp') { const f = both(true, false); return T`The main connective is \(\to\), so it is false only where ${A} is T and ${Bt} is F. That happens in ${f} row${f === 1 ? '' : 's'}, so \(${k} - ${f} = ${cnt}\).`; }
    if (n.op === 'iff') return T`The main connective is \(\leftrightarrow\), so count the rows where ${A} and ${Bt} have the same value: ${cnt}.`;
    const m = rows.filter(r => ev(n.a, r)).length;
    return T`The main connective is \(\neg\). ${A} is true in ${m} row${m === 1 ? '' : 's'}, so its negation is true in \(${k} - ${m} = ${cnt}\).`;
  }
  // Negation pushed down to the letters (negation normal form), keeping implications that are not negated.
  function negate(n, neg = true) {
    switch (n.op) {
      case 'var': return neg ? not(n) : n;
      case 'not': return negate(n.a, !neg);
      case 'and': return neg ? bin('or', negate(n.a), negate(n.b)) : bin('and', negate(n.a, false), negate(n.b, false));
      case 'or': return neg ? bin('and', negate(n.a), negate(n.b)) : bin('or', negate(n.a, false), negate(n.b, false));
      case 'imp': return neg ? bin('and', negate(n.a, false), negate(n.b)) : bin('imp', negate(n.a, false), negate(n.b, false));
      default: return neg ? bin('iff', negate(n.a, false), negate(n.b)) : bin('iff', negate(n.a, false), negate(n.b, false));
    }
  }
  // Every formula one small edit away: a connective swapped, a negation added or removed.
  function mutations(n) {
    const out = [];
    const walk = (m, rebuild) => {
      if (m.op === 'not') { out.push(rebuild(m.a)); walk(m.a, x => rebuild(not(x))); return; }
      out.push(rebuild(not(m)));
      if (m.op === 'var') return;
      for (const op of ['and', 'or', 'imp', 'iff']) if (op !== m.op) out.push(rebuild(bin(op, m.a, m.b)));
      if (m.op === 'imp') out.push(rebuild(bin('imp', m.b, m.a)));
      walk(m.a, x => rebuild(bin(m.op, x, m.b))); walk(m.b, x => rebuild(bin(m.op, m.a, x)));
    };
    walk(n, x => x);
    return out;
  }
  const size = n => (n.op === 'var' ? 0 : columns(n).length);
  // Rough rendered width in characters, used to keep formulas inside a 360 px screen.
  const width = n => tex(n).replace(/\\neg /g, '~').replace(/\\[a-z]+/g, 'OO').replace(/ /g, '').length;
  const fits = (n, maxCols = 8, maxW = 26) => varsOf(n).length + size(n) <= maxCols && width(n) <= maxW;

  // Fills the slots of a template: usually distinct letters, sometimes a negated letter or a small compound.
  function instance(R, src, opt = {}) {
    const t = typeof src === 'string' ? parse(src) : src, slots = slotsOf(t);
    for (let tries = 0; tries < 40; tries++) {
      const ls = R.shuffle(LETTERS).slice(0, slots.length), map = {};
      slots.forEach((s, i) => { map[s] = V(ls[i]); });
      if (!opt.letters && R.int(0, 2) === 0) {
        const s = R.pick(slots), x = map[s], y = V(R.pick(LETTERS.filter(l => l !== x.v)));
        map[s] = R.pick([not(x), not(x), bin('and', x, y), bin('or', x, y), bin('imp', x, y)]);
      }
      const f = fill(t, map);
      if (fits(f, opt.maxCols, opt.maxW)) return { f, map };
    }
    const map = {}; slots.forEach((s, i) => { map[s] = V(LETTERS[i]); });
    return { f: fill(t, map), map };
  }
  // A random formula over the given letters, using each at least once.
  function random(R, vs, depth) {
    const grow = d => {
      if (d === 0 || (d < depth && R.int(0, 3) === 0)) { const v = V(R.pick(vs)); return R.int(0, 3) === 0 ? not(v) : v; }
      if (R.int(0, 6) === 0) return not(grow(d - 1));
      return bin(R.pick(['and', 'or', 'imp', 'imp', 'iff']), grow(d - 1), grow(d - 1));
    };
    for (;;) { const f = grow(depth); if (varsOf(f).length === vs.length && f.op !== 'not' && f.op !== 'var' && fits(f)) return f; }
  }

  // English for simple formulas: letters become sentences from one scenario. Returns null when a phrase would be clumsy.
  const SCENES = [
    [['it rains', 'it does not rain'], ['the field is wet', 'the field is not wet'], ['the game is canceled', 'the game is not canceled']],
    [['the code compiles', 'the code does not compile'], ['the tests pass', 'the tests do not pass'], ['the build ships', 'the build does not ship']],
    [['Ana studies', 'Ana does not study'], ['Ana passes the exam', 'Ana does not pass the exam'], ['Ana keeps her scholarship', 'Ana does not keep her scholarship']],
    [['the battery is charged', 'the battery is not charged'], ['the car starts', 'the car does not start'], ['Ben is on time', 'Ben is not on time']],
    [['the price rises', 'the price does not rise'], ['demand falls', 'demand does not fall'], ['revenue drops', 'revenue does not drop']],
    [['the server is up', 'the server is not up'], ['the site loads', 'the site does not load'], ['orders go through', 'orders do not go through']],
    [['the store is open', 'the store is not open'], ['Kim buys milk', 'Kim does not buy milk'], ['Kim makes pancakes', 'Kim does not make pancakes']],
    [['the alarm sounds', 'the alarm does not sound'], ['the building is cleared', 'the building is not cleared'], ['the drill is logged', 'the drill is not logged']]
  ];
  function english(n, scene) {
    const lit = m => (m.op === 'var' ? scene[LETTERS.indexOf(m.v)][0] : m.op === 'not' && m.a.op === 'var' ? scene[LETTERS.indexOf(m.a.v)][1] : null);
    const part = m => lit(m) || (m.op === 'and' || m.op === 'or' ? (lit(m.a) && lit(m.b) ? `${lit(m.a)} ${m.op} ${lit(m.b)}` : null) : null);
    let s = lit(n);
    if (!s && (n.op === 'and' || n.op === 'or')) s = part(n);
    if (!s && n.op === 'imp' && part(n.a) && lit(n.b)) s = `if ${part(n.a)}, then ${lit(n.b)}`;
    if (!s && n.op === 'imp' && lit(n.a) && part(n.b)) s = `if ${lit(n.a)}, then ${part(n.b)}`;
    return s ? s[0].toUpperCase() + s.slice(1) + '.' : null;
  }

  return { parse, tex, ev, py, lambda, varsOf, fill, rowsOver, rowText, rowTuple, classify, equivalent, trueRows, columns, defs, table, multiTable, steps,
    shortcut, negate, mutations, fits, width, instance, random, english, SCENES, V, not, bin, TV };
})();
