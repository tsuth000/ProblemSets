// Loads the app's content into a Node context, in index.html order.
const fs = require('fs'), vm = require('vm'), path = require('path');
const A = path.join(__dirname, '../app/assets/');
const html = fs.readFileSync(A + 'index.html', 'utf8');
const files = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => !/app\.js|board\.js|vendor/.test(f));
const ctx = { console, Math, JSON, Number, String, Array, Object, Set, Map, Date, localStorage: { getItem() { return null; }, setItem() {} } };
ctx.window = ctx; vm.createContext(ctx);
for (const f of files) vm.runInContext(fs.readFileSync(A + f, 'utf8'), ctx, { filename: f });
module.exports = ctx;
