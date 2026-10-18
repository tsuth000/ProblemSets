const ctx = require('./load.js'), sid = process.argv[2];
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\\\(|\\\)|\\displaystyle|\\dfrac/g, '').replace(/\s+/g, ' ');
for (const s of ctx.SUBJECTS) { if (sid && s.id !== sid) continue;
  const cnt = {}; for (const c of s.learn) cnt[c.skill] = (cnt[c.skill] || 0) + 1;
  for (const q of s.questions) { if (cnt[q.skill] > 1 && !q.unit) continue;
    const u = q.unit || s.learn.find(c => c.skill === q.skill).title;
    console.log(`${q.id} [${u}] ${strip(q.q).slice(0, 120)}${q.code ? ' CODE ' + q.code.replace(/\n/g, ';') : ''} => ${q.c ? strip(q.c[0]) : q.answer}`); } }
