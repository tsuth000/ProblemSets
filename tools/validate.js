// Full content check: KaTeX renders, MC choices distinct, unit coverage, and a dump of verification jobs.
const fs = require('fs'), path = require('path');
const ctx = require('./load.js'), katex = require('../app/assets/vendor/katex/katex.min.js');
const N = +(process.argv[2] || 40), errors = [], jobs = [];
const segs = s => [...String(s || '').matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g)].map(m => [m[1] != null ? m[1] : m[2], m[2] != null]);
function render(where, s) {
  const str = String(s || '');
  for (const [tex, disp] of segs(str)) { try { katex.renderToString(tex, { throwOnError: true, displayMode: disp, strict: 'ignore' }); } catch (e) { errors.push(`${where}: KaTeX ${e.message.slice(0, 120)} :: ${tex.slice(0, 80)}`); } }
  const bare = str.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|<pre[\s\S]*?<\/pre>|<code>[\s\S]*?<\/code>/g, '');
  if (/\\(frac|sqrt|le|ge|cdot|pi|theta|int|sum|lim)\b/.test(bare)) errors.push(`${where}: TeX outside math: ${bare.match(/.{0,30}\\(frac|sqrt|le|ge|cdot|pi|theta|int|sum|lim)\b.{0,20}/)[0]}`);
  if (/[—]/.test(str)) errors.push(`${where}: em dash`);
  if (/\\u[0-9a-fA-F]{4}/.test(str)) errors.push(`${where}: literal unicode escape ${str.match(/\\u[0-9a-fA-F]{4}/)[0]}`);
}
for (const s of ctx.SUBJECTS) {
  for (const c of s.learn) {
    const w = `${s.id}/${c.title}`;
    for (const f of ['body', 'more', 'trap', 'hook']) render(`${w}.${f}`, c[f]);
    if (s.id.startsWith('cpp')) {
      // Code blocks must fit a 360 px screen without sideways scrolling: lesson text, worked examples and "Your turn" sheets differ in width.
      const longest = (h, max, where) => { for (const m of String(h || '').matchAll(/<pre class="code">([\s\S]*?)<\/pre>/g)) { const l = m[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').split('\n').find(x => x.length > max); if (l) errors.push(`${w}.${where}: code line over ${max} chars: ${l}`); } };
      longest(c.body, 36, 'body'); longest(c.hook, 36, 'hook'); longest(c.more, 36, 'more');
      for (const e of (c.ex ? [c.ex] : []).concat(c.exs || [])) { longest(e.q, 31, 'ex.q'); longest(e.a, 31, 'ex.a'); }
      for (const v of c.vary || []) longest(v[0], 30, 'vary');
    }
    for (const [k, e] of (c.ex ? [c.ex] : []).concat(c.exs || []).entries()) { render(`${w}.ex${k}.q`, e.q); render(`${w}.ex${k}.a`, e.a); }
    for (const [k, v] of (c.vary || []).entries()) {
      render(`${w}.vary${k}`, v[0]); render(`${w}.vary${k}.why`, v[2]);
      if (Array.isArray(v[1])) { v[1].forEach(x => render(`${w}.vary${k}.c`, x)); if (new Set(v[1]).size !== v[1].length) errors.push(`${w}.vary${k}: duplicate choices`); }
      else if (!Number.isFinite(v[1])) errors.push(`${w}.vary${k}: bad answer`);
    }
  }
  for (const q of s.questions) {
    render(`${s.id}/${q.id}.q`, q.q); render(`${s.id}/${q.id}.x`, q.x); (q.c || []).forEach(x => render(`${s.id}/${q.id}.c`, x));
    if (q.c && new Set(q.c).size !== q.c.length) errors.push(`${s.id}/${q.id}: duplicate choices`);
    if (!q.c && !Number.isFinite(q.answer)) errors.push(`${s.id}/${q.id}: bad answer`);
    if (!q.unit) errors.push(`${s.id}/${q.id}: no unit`);
    if (q.cpp) jobs.push({ id: q.id, sid: s.id, cpp: q.cpp, cerr: q.cerr, answer: q.answer, c: q.c });
    if (s.id.startsWith('cpp') && q.code && String(q.code).split('\n').some(l => l.length > 32)) errors.push(`${s.id}/${q.id}: code line over 32 chars: ${String(q.code).split('\n').find(l => l.length > 32)}`);
  }
  for (const g of s.generators) {
    if (!s.learn.some(c => c.title === g.unit)) errors.push(`${s.id}/${g.id}: unit missing`);
    for (let i = 0; i < N; i++) {
      let o; try { o = g.make(ctx.R); } catch (e) { errors.push(`${s.id}/${g.id}: throws ${e.message}`); break; }
      const t = (g.raw || s.plain) ? (x => x) : ctx.tidyMath, w = `${s.id}/${g.id}`;
      render(w + '.q', t(o.q)); render(w + '.x', t(o.x));
      if (o.c && o.c.length < (s.id.startsWith('cpp') ? 3 : 2)) errors.push(`${w}: only ${o.c.length} choices`);
      if (o.c) { const cs = o.c.map(t); cs.forEach(x => render(w + '.c', x)); if (new Set(cs).size !== cs.length) errors.push(`${w}: duplicate choices ${JSON.stringify(cs)}`); }
      else if (!Number.isFinite(o.answer)) errors.push(`${w}: bad answer ${o.answer}`);
      if (/(?<!is )undefined|NaN/.test(o.q + o.x)) errors.push(`${w}: undefined/NaN in text`);
      if (i < 25) jobs.push({ id: g.id, sid: s.id, v: o.v, vk: o.vk, key: o.key, code: o.code, cpp: o.cpp, cerr: o.cerr, answer: o.answer, c: o.c, tol: o.tol });
      if (s.id.startsWith('cpp') && o.code && String(o.code).split('\n').some(l => l.length > 32)) errors.push(`${w}: code line over 32 chars: ${String(o.code).split('\n').find(l => l.length > 32)}`);
      if (s.id.startsWith('cpp') && o.c && o.code && !o.cpp && !o.concept) errors.push(`${w}: C++ code without cpp source`);
    }
  }
}
// Every unit with a check must be able to fill a 5-question set.
for (const s of ctx.SUBJECTS) for (const c of s.learn) {
  const g = s.generators.filter(x => x.unit === c.title).length, st = s.questions.filter(q => q.unit === c.title).length;
  if (g + st > 0 && g === 0 && st < 5) errors.push(`${s.id}/${c.title}: only ${st} fixed problems and no generators`);
}
if (ctx.LESSON_MISSES.length) errors.push('LESSON_MISSES: ' + ctx.LESSON_MISSES.join('; '));
fs.writeFileSync(process.env.JOBS || '/tmp/claude-0/jobs.json', JSON.stringify(jobs));
console.log(errors.length ? errors.slice(0, 60).join('\n') + `\n${errors.length} errors` : 'validate: 0 errors', `| ${jobs.length} verification jobs`);
