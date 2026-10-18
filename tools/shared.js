const ctx = require('./load.js');
let tot = 0;
for (const s of ctx.SUBJECTS) {
  const by = {}; for (const c of s.learn) if (c.skill) (by[c.skill] = by[c.skill] || []).push(c.title);
  for (const [sk, titles] of Object.entries(by)) if (titles.length > 1) {
    const qs = s.questions.filter(q => q.skill === sk); tot += qs.length;
    console.log(`## ${s.id} | ${sk} -> ${titles.join(' / ')}`);
    for (const q of qs) console.log(`   ${q.id}: ${String(q.q).replace(/\\\(|\\\)/g, '').replace(/\s+/g, ' ').slice(0, 110)}`);
  } }
console.log('static questions in shared skills:', tot);
