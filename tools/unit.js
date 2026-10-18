const ctx = require('./load.js'), [sid, title] = process.argv.slice(2);
const c = ctx.SUBJECTS.find(x => x.id === sid).learn.find(x => x.title === title);
const strip = s => String(s || '').replace(/<\/(p|tr|li|table|pre)>/g, '\n').replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' ');
console.log('BODY:', strip(c.body)); console.log('EX:', strip(c.ex && c.ex.q), '=>', strip(c.ex && c.ex.a)); console.log('TRAP:', strip(c.trap));
console.log('HOOK:', strip(c.hook)); console.log('MORE:', strip(c.more)); for (const v of c.vary || []) console.log('VARY:', strip(v[0]), '|', v[1], '|', strip(v[2]));
