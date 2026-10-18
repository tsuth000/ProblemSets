const ctx = require('./load.js'), ids = process.argv.slice(2);
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\\\(|\\\)/g, '').replace(/\s+/g, ' ');
for (const s of ctx.SUBJECTS) for (const g of s.generators) if (ids.includes(g.id)) {
  console.log(`## ${g.id} [${s.id} | ${g.unit}]`);
  for (let i = 0; i < 2; i++) { const o = g.make(ctx.R); console.log('  Q:', strip(o.q), o.code ? 'CODE ' + o.code.replace(/\n/g, ';') : '', '=>', o.c ? strip(o.c[0]) : o.answer, '| X:', strip(o.x).slice(0, 200)); } }
