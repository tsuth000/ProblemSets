const ctx = require('./load.js'), sid = process.argv[2];
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\\\(|\\\)/g, '').replace(/\s+/g, ' ').slice(0, 150);
for (const s of ctx.SUBJECTS) { if (sid && s.id !== sid) continue;
  for (const c of s.learn) {
    const gens = s.generators.filter(g => g.unit === c.title);
    console.log(`## ${s.id} | ${c.title}`);
    for (const g of gens) { const o = g.make(ctx.R); console.log(`   [${g.id}] ${strip(o.q)}${o.code ? ' CODE: ' + o.code.replace(/\n/g, ' ; ').slice(0, 90) : ''}`); }
  } }
