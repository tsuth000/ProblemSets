// usage: node find.js sid regex  -> which unit cards mention the pattern
const ctx = require('./load.js'), [sid, pat] = process.argv.slice(2), re = new RegExp(pat, 'i');
const s = ctx.SUBJECTS.find(x => x.id === sid);
for (const c of s.learn) { const t = JSON.stringify(c); const m = t.match(re); if (m) console.log(`${c.title}: ...${t.slice(Math.max(0, m.index - 80), m.index + 120).replace(/\\n/g, ' ')}...`); }
