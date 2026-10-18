// Sample every generator many times; flag display smells in question/explanation text.
const ctx = require('./load.js');
const pats = [
  [/(?<![\d._^{\\a-zA-Z])1(?=[a-z](?![a-z])|\\(sin|cos|tan|ln|pi|theta|cdot\s*x)|\()/, 'coef 1'],
  [/(?<![\d._^])0(?=[a-z](?![a-z])|\\(sin|cos|pi))/, 'coef 0'],
  [/[+-]\s*-\s*\d/, 'sign pile'], [/\+\s*0(?![\d.])/, '+ 0'], [/-\s*0(?![\d.])/, '- 0'],
  [/(?<![\d)])\^\{?1\}?(?![\d./])/, '^1'], [/(?<![\d)])\^\{?0\}?(?![\d./])/, '^0'], [/undefined|NaN|Infinity|null/, 'bad value'], [/\(\s*\+/, '(+']
];
const hits = {};
for (const s of ctx.SUBJECTS) for (const g of s.generators) for (let i = 0; i < 300; i++) {
  let o; try { o = g.make(ctx.R); } catch (e) { (hits[g.id] = hits[g.id] || new Set()).add('THROW ' + e.message); continue; }
  for (const part0 of [o.q, o.x, ...(o.c || [])]) { const part = (g.raw || s.plain) ? part0 : ctx.tidyMath(part0); const t = String(part || '').replace(/<pre[\s\S]*?<\/pre>|<code>[\s\S]*?<\/code>/g, '');
    for (const [re, name] of pats) { const m = t.match(re); if (m) (hits[g.id] = hits[g.id] || new Set()).add(`${name}: ...${t.slice(Math.max(0, m.index - 30), m.index + 30)}...`); } }
}
for (const [id, set] of Object.entries(hits)) { console.log('##', id); [...set].slice(0, 4).forEach(x => console.log('   ', x)); }
