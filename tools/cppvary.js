// Dump C++ lesson snippets ("Your turn" items and worked examples with a single code block) for compile-and-run checks.
const fs = require('fs'), ctx = require('./load.js');
const un = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const out = [];
for (const s of ctx.SUBJECTS.filter(s => s.id.startsWith('cpp'))) for (const c of s.learn) for (const [k, v] of (c.vary || []).entries()) {
  if (v[3]) { out.push({ id: `${s.id}/${c.title}#${k}`, head: (v[3].f || []).map(n => ctx.CPP_F[n]).join('\n'), body: v[3].b, want: Array.isArray(v[1]) ? v[1][0] : v[1] }); continue; }
  const pres = [...v[0].matchAll(/<pre class="code">([\s\S]*?)<\/pre>/g)].map(m => un(m[1]));
  if (pres.length !== 1) continue;
  const [head, body] = pres[0].includes('// in main:\n') ? pres[0].split('// in main:\n') : ['', pres[0]];
  // Snippets that use the lesson's tracer struct T get its definition.
  const tr = head || (/\bT \w+\(|<T>/.test(body) ? ctx.CPP_TRACER : /\bM \w|take\(|vector<M>/.test(body) ? ctx.CPP_MV : /Ring</.test(body) ? ctx.CPP_RING : /Fast/.test(body) ? ctx.CPP_CRTP : '');
  out.push({ id: `${s.id}/${c.title}#${k}`, head: tr, body, want: Array.isArray(v[1]) ? v[1][0] : v[1] });
}
fs.writeFileSync('/tmp/claude-0/cppvary.json', JSON.stringify(out));
console.log(out.length, 'snippets');
