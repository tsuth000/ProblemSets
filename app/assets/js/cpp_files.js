'use strict';
// C++ fundamentals, units 13 and 14: file streams and the filesystem library. Appended to the C++ fundamentals path.
// Each program is compiled and run by tools/verify.py in its own empty directory, so files start absent.
(() => {
  const { pre, cd, mc, HEAD } = window.CPP;
  const s = window.SUBJECTS.find(x => x.id === 'cpp');
  const U = ['File streams', 'Paths and the filesystem library'];
  const FSA = 'namespace fs = std::filesystem;\n';
  // Like CPP.prog, with the std::filesystem alias that the snippets assume.
  const prog = body => ({ code: body, cpp: `${HEAD}${FSA}int main() {\n${body}\n}\n` });
  const oq = (body, right, wrong, x) => Object.assign(prog(body), { q: 'What does this print?', c: mc(right, wrong), x });
  const nq = (body, answer, x) => Object.assign(prog(body), { q: 'What does this print?', answer, x });
  const NL = "'\\n'";

  s.learn.push(
    { title: U[0], skill: U[0],
      hook: T`<p>A file stream works like ${cd('cout')} and ${cd('cin')}, pointed at a file instead of the terminal. The details that trip people up are when a file is created or emptied, when written data actually reaches the disk, and how to write a read loop that stops at the right moment.</p>`,
      body: T`
<p>${cd('<fstream>')} provides ${cd('ofstream')} (write), ${cd('ifstream')} (read) and ${cd('fstream')} (both). Opening an ${cd('ofstream')} <b>creates the file, or empties it if it exists</b>. To add to the end instead, open it with ${cd('ios::app')}.</p>
<table class="tt"><tr><th>Mode</th><th>Effect</th></tr>
<tr><td>${cd('ios::out')}</td><td>write; the ofstream default; truncates</td></tr>
<tr><td>${cd('ios::app')}</td><td>every write goes to the end</td></tr>
<tr><td>${cd('ios::in')}</td><td>read; the ifstream default</td></tr>
<tr><td>${cd('ios::ate')}</td><td>start positioned at the end</td></tr>
<tr><td>${cd('ios::binary')}</td><td>no newline translation</td></tr></table>
${pre(T`ofstream out("trades.csv");
out << "AAPL," << 187.5 << '\n';
out.close();
out.open("trades.csv", ios::app);
out << "MSFT," << 402.1 << '\n';`)}
<p><b>Did it open?</b> A stream that failed to open, for example an ${cd('ifstream')} on a missing file, converts to ${cd('false')} and ${cd('is_open()')} returns false. Every read from it fails quietly, so check: ${cd('if (!in) { ... }')}.</p>
<p><b>Buffering.</b> Writes collect in a memory buffer and reach the file when the buffer fills, on ${cd('flush()')} or ${cd('endl')}, or when the stream is closed. The destructor closes the stream (RAII), so a block scope is the clean way to finish a file. Reading the file back while the ${cd('ofstream')} is still open and unflushed can find it empty.</p>
<p><b>Reading tokens.</b> ${cd('in >> x')} skips whitespace, reads one value, and returns the stream, which is false once a read fails. The correct loop tests the read itself:</p>
${pre(T`int x, n = 0;
while (in >> x) n++;`)}
<p>The tempting ${cd('while (!in.eof())')} is wrong: end-of-file is only noticed after a read fails. If the file ends with a newline, the last successful read stops before it, the loop runs once more, and that read fails, so the body runs one extra time.</p>
<p><b>Reading lines.</b> ${cd('getline(in, s)')} reads up to the next newline and discards it. Mixing the two styles has a trap: ${cd('in >> n')} leaves the newline after the number in the stream, so the next ${cd('getline')} returns an empty string. Skip leading whitespace first with ${cd('in >> ws')}.</p>
<p><b>Splitting a line.</b> Wrap the line in a ${cd('stringstream')} and use ${cd('getline')} with a delimiter. An empty field between two commas is returned as an empty string, but a trailing comma does not produce a final empty field.</p>
${pre(T`stringstream ss("AAPL,187.5,300");
string f;
while (getline(ss, f, ','))
  cout << f << '|';
// AAPL|187.5|300|`)}
<p><b>Binary files.</b> ${cd('out.write(p, n)')} copies n raw bytes from a ${cd('const char*')}: ${cd('reinterpret_cast<const char*>(v.data())')} with ${cd('v.size() * sizeof(int)')} writes a vector of ints exactly as it sits in memory, 4 bytes per int. Text output of the same numbers uses one byte per digit plus separators. Opened with ${cd('ios::ate')}, a stream starts at the end, so ${cd('tellg()')} reports the file's size.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`ofstream out("f.txt");
out << 7 << ' ' << 8;
ifstream in("f.txt");
int x = 0, s = 0;
while (in >> x) s += x;
cout << s;`)}`, a: T`<p>The two numbers are still in ${cd('out')}'s buffer when ${cd('in')} opens the file, which is empty on disk, so the loop never runs. Output: ${cd('0')}. Closing ${cd('out')} first (or putting it in a block) gives 15.</p>` },
      trap: T`Looping with ${cd('while (!in.eof())')}. It runs one extra time when the file ends with a newline; loop on the read instead, ${cd('while (in >> x)')}.`,
      vary: [[T`A file holds the line ${cd('3 4 5')} followed by a newline. How many times does a ${cd('while (in >> x)')} loop run?`, 3, T`The fourth read fails and ends the loop.`],
        [T`The same file with ${cd('while (!in.eof()) { in >> x; n++; }')}. Final n?`, 4, T`EOF is detected only by the failed fourth read.`],
        [T`What does this print?${pre('stringstream ss("a,,b,");\nstring f;\nint n = 0;\nwhile (getline(ss, f, \',\'))\n  n++;\ncout << n;')}`, 3, T`"a", "", "b": the trailing comma adds no field.`],
        [T`An ${cd('ofstream')} opens an existing 2 KB file without ${cd('ios::app')}. Its size right after opening?`, ['0 bytes', '2 KB', 'it fails to open'], T`The default mode truncates.`],
        [T`Binary-writing ${cd('vector<int> v(10)')}: how many bytes?`, 40, T`10 × sizeof(int).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Streams read and write the contents of files. ${cd('std::filesystem')} (C++17) handles everything around them: building paths, checking what exists, sizes, creating and removing directories, and listing their contents.</p>`,
      body: T`
<p>The snippets assume ${cd('namespace fs = std::filesystem;')}, the usual alias.</p>
<p><b>Paths.</b> ${cd('fs::path')} holds a path and splits it into parts; ${cd('/')} joins paths with the right separator: ${cd('fs::path("data") / "q3.csv"')} is ${cd('data/q3.csv')}.</p>
<table class="tt"><tr><th>For data/2026/q3.csv</th><th>Gives</th></tr>
<tr><td>${cd('filename()')}</td><td>q3.csv</td></tr>
<tr><td>${cd('stem()')}</td><td>q3</td></tr>
<tr><td>${cd('extension()')}</td><td>.csv (with the dot)</td></tr>
<tr><td>${cd('parent_path()')}</td><td>data/2026</td></tr></table>
<p>The extension is the part from the last dot of the filename, so ${cd('app.log.gz')} has stem ${cd('app.log')} and extension ${cd('.gz')}. A name that only starts with a dot, such as ${cd('.bashrc')}, has no extension: its stem is the whole name. A name without a dot has an empty extension.</p>
<p><b>Printing a path.</b> ${cd('cout << p')} writes the path in double quotes, so that paths with spaces can be read back. Use ${cd('p.string()')} for the bare text.</p>
<p><b>Queries and changes.</b></p>
<table class="tt"><tr><th>Call</th><th>Result</th></tr>
<tr><td>${cd('fs::exists(p)')}</td><td>true if anything is there</td></tr>
<tr><td>${cd('fs::file_size(p)')}</td><td>size in bytes</td></tr>
<tr><td>${cd('fs::create_directory(p)')}</td><td>true if it made one</td></tr>
<tr><td>${cd('fs::create_directories(p)')}</td><td>makes missing parents too</td></tr>
<tr><td>${cd('fs::remove(p)')}</td><td>true if it deleted something</td></tr>
<tr><td>${cd('fs::remove_all(p)')}</td><td>number of entries deleted</td></tr>
<tr><td>${cd('fs::rename(a, b)')}</td><td>moves or renames</td></tr></table>
<p>${cd('remove')} on a missing path returns false rather than failing, and ${cd('create_directory')} on an existing directory returns false. ${cd('remove_all')} counts every file and directory it deletes, the starting directory included. On error, these functions throw ${cd('fs::filesystem_error')}; each has an overload taking a ${cd('std::error_code&')} that reports the error instead of throwing.</p>
<p><b>File sizes are bytes.</b> Text output takes one byte per character: ${cd('out << 3.25')} writes 4 bytes, and a newline adds 1 on Linux and macOS (2 on Windows in text mode).</p>
<p><b>Listing.</b> ${cd('fs::directory_iterator it("d");')} visits each entry of d once, files and subdirectories alike but not their contents; ${cd('recursive_directory_iterator')} descends into subdirectories. The order is unspecified, so sort the names if order matters.</p>
${pre(T`fs::create_directories("out/2026");
ofstream("out/a.csv");
ofstream("out/b.csv");
fs::directory_iterator it("out");
int n = 0;
for (auto& e : it) n++;
// n is 3: a.csv, b.csv, 2026`)}
<p>A bare ${cd('ofstream("name");')} creates an empty file and closes it at once.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`fs::path p = "logs/app.log.gz";
cout << p.stem().string();
cout << ' ';
cout << p.extension().string();
cout << ' ' << p.filename();`)}`, a: T`<p>The stem drops only the last extension: ${cd('app.log')}. The extension is ${cd('.gz')}. Printing the path itself adds quotes. Output: ${cd('app.log .gz "app.log.gz"')}.</p>` },
      trap: T`Printing a path with ${cd('cout << p')} and getting quotes in the output. Use ${cd('p.string()')}.`,
      vary: [[T`What is ${cd('fs::path("a/b.tar.gz").extension()')}?`, ['.gz', '.tar.gz', 'gz'], T`Only the part from the last dot.`],
        [T`What does this print?${pre('ofstream("t.txt");\ncout << fs::remove("t.txt");\ncout << fs::remove("t.txt");')}`, ['10', '11', '01'], T`The second call finds nothing to delete.`],
        [T`What does this print?${pre('{\n  ofstream out("a");\n  out << 1000;\n}\ncout << fs::file_size("a");')}`, 4, T`Four characters.`],
        [T`${cd('fs::create_directories("x/y/z")')} in an empty folder, then ${cd('fs::remove_all("x")')}. What does remove_all return?`, 3, T`x, y and z.`]] }
  );

  addQuestions('cpp', [
    { id: 'cpq25', skill: U[0], q: 'What happens when an ofstream opens an existing file with the default mode?', c: ['The file is emptied', 'Writes go to the end', 'The open fails', 'The file is renamed'], x: 'ios::out truncates; use ios::app to append.' },
    { id: 'cpq26', skill: U[0], q: 'Why can a file look empty when another stream reads it right after writing?', c: ['The data is still in the writing stream\'s buffer', 'Files are written asynchronously by the OS only at exit', 'ifstream ignores recent writes', 'Text mode hides the data'], x: 'Close or flush the ofstream, or end its scope, before reading.' },
    { id: 'cpq27', skill: U[0], q: 'Which loop reads every integer from a stream correctly?', c: ['while (in >> x) { ... }', 'while (!in.eof()) { in >> x; ... }', 'while (in.good()) { in >> x; ... }', 'for (;;) { in >> x; ... }'], x: 'Test the read itself; the others act on a failed read once.' },
    { id: 'cpq28', skill: U[1], q: 'What does fs::path(".bashrc").extension() return?', c: ['an empty path', '".bashrc"', '"bashrc"', '"."'], x: 'A leading dot marks a hidden file, not an extension.' },
    { id: 'cpq29', skill: U[1], q: 'What does fs::remove_all return?', c: ['the number of files and directories deleted', 'true or false', 'nothing', 'the bytes freed'], x: 'It counts every entry it deletes, the starting directory included.' }
  ]);

  // ---------- generators ----------
  registerUnitGens('cpp', { units: {
    [U[0]]: [{ id: 'cp-files', make(R) {
      const k = R.int(0, 6);
      if (k === 0) {
        const a = R.int(2, 5), b = R.int(1, 3), app = R.int(0, 1);
        return nq(`ofstream out("f.txt");\nfor (int i = 0; i < ${a}; i++)\n  out << i << ${NL};\nout.close();\nout.open("f.txt"${app ? ', ios::app' : ''});\nfor (int i = 0; i < ${b}; i++)\n  out << i << ${NL};\nout.close();\nifstream in("f.txt");\nstring s;\nint n = 0;\nwhile (getline(in, s)) n++;\ncout << n;`,
          app ? a + b : b, app ? `ios::app adds to the end: ${a} lines, then ${b} more.` : `Reopening without ios::app empties the file, so only the last ${b} line${b > 1 ? 's' : ''} remain${b > 1 ? '' : 's'}.`);
      }
      if (k === 1) {
        const v = Array.from({ length: 3 }, () => R.int(1, 60)), sep = R.int(0, 1);
        const ans = sep ? v.reduce((p, q) => p + q, 0) : Number(v.join(''));
        return nq(`ofstream out("n.txt");\nfor (int x : {${v.join(', ')}})\n  out << x${sep ? " << ' '" : ''};\nout.close();\nifstream in("n.txt");\nint x, s = 0;\nwhile (in >> x) s += x;\ncout << s;`, ans,
          sep ? `The spaces separate the numbers, which are read back one by one: ${v.join(' + ')}.` : `Nothing separates the numbers, so the file holds ${v.join('')}, which reads back as one integer.`);
      }
      if (k === 2) {
        const v = R.vec(R.int(2, 5), 1, 99), nl = R.int(0, 1), good = R.int(0, 2) === 0;
        const ans = good ? v.length : v.length + (nl ? 1 : 0);
        const loop = good ? 'while (in >> x) n++;' : 'while (!in.eof()) {\n  in >> x;\n  n++;\n}';
        return nq(`ofstream out("v.txt");\nout << "${v.join(' ')}"${nl ? ' << endl' : ''};\nout.close();\nifstream in("v.txt");\nint x, n = 0;\n${loop}\ncout << n;`, ans,
          good ? `The loop runs once per successful read: ${v.length}.` : nl ? `The last read stops at the final newline without reaching end-of-file, so the loop runs once more, fails, and counts it: ${v.length} + 1.` : `With no trailing newline, reading the last number reaches end-of-file, so the loop stops after ${v.length}.`);
      }
      if (k === 3) {
        const w = R.pick(['hello', 'spread', 'notional', 'bid', 'hedge']), fix = R.pick(['', 'out.close();\n', 'out.flush();\n', '']);
        return nq(`ofstream out("a.txt");\nout << "${w}";\n${fix}ifstream in("a.txt");\nstring s;\nin >> s;\ncout << s.size();`, fix ? w.length : 0,
          fix ? `${fix.trim()} pushes the text to the file before it is read: "${w}" has ${w.length} characters.` : `"${w}" is still in out's buffer, so the file is empty on disk; the read fails and s stays empty.`);
      }
      if (k === 4) {
        const n = R.int(10, 99), w = R.pick(['bid ask', 'fill', 'limit order', 'mid']), ws = R.int(0, 1);
        return nq(`ofstream out("p.txt");\nout << ${n} << ${NL};\nout << "${w}";\nout.close();\nifstream in("p.txt");\nint n;\nstring s;\nin >> n${ws ? ' >> ws' : ''};\ngetline(in, s);\ncout << s.size();`, ws ? w.length : 0,
          ws ? `ws skips the newline left after ${n}, so getline reads "${w}", ${w.length} characters.` : `in >> n stops before the newline, so getline reads the rest of that line: an empty string.`);
      }
      if (k === 5) {
        const rows = [['AAPL,187.5,3', 3], ['a,,b', 3], ['a,b,', 2], [',x', 2], ['bid,ask', 2], ['1,2,3,4', 4], ['x,,', 2], ['solo', 1]], [row, n] = R.pick(rows);
        return nq(`stringstream ss("${row}");\nstring f;\nint n = 0;\nwhile (getline(ss, f, ','))\n  n++;\ncout << n;`, n,
          `getline returns each field between commas, including empty ones between two commas, but a trailing comma adds no final field: ${n}.`);
      }
      const T2 = R.pick([['int', 4], ['double', 8], ['short', 2], ['long long', 8]]), N = R.int(3, 25);
      return nq(`vector<${T2[0]}> v(${N});\nofstream out("b.bin", ios::binary);\nauto p = reinterpret_cast<\n  const char*>(v.data());\nout.write(p, v.size() * sizeof(${T2[0]}));\nout.close();\nifstream in("b.bin", ios::ate);\ncout << in.tellg();`.replace(`out.write(p, v.size() * sizeof(${T2[0]}));`, 'size_t n = v.size();\nout.write(p, n * sizeof v[0]);').replace('ofstream out("b.bin", ios::binary);', 'ofstream out("b.bin",\n             ios::binary);'), N * T2[1],
        `write copies the raw bytes: ${N} × sizeof(${T2[0]}) = ${N} × ${T2[1]}. Opened with ios::ate, the stream starts at the end, so tellg() is the size.`);
    } }],
    [U[1]]: [{ id: 'cp-fsys', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const P = ['data/2026/q3.csv', 'logs/app.log.gz', '/tmp/notes.txt', 'report', 'archive/.bashrc', 'src/main.cpp', 'v1.2/model.bin'], p = R.pick(P);
        const slash = p.lastIndexOf('/'), fn = p.slice(slash + 1), par = slash < 0 ? '' : p.slice(0, slash) || '/';
        const dot = fn.lastIndexOf('.'), ext = dot > 0 ? fn.slice(dot) : '', stem = dot > 0 ? fn.slice(0, dot) : fn;
        const parts = { filename: fn, stem, extension: ext, parent_path: par }, which = R.pick(Object.keys(parts)), quoted = R.int(0, 2) === 0, val = parts[which];
        const right = quoted ? `["${val}"]` : `[${val}]`;
        const others = Object.values(parts).filter(v => v !== val).map(v => quoted ? `["${v}"]` : `[${v}]`);
        return oq(`fs::path p = "${p}";\ncout << '[' << p.${which}()\n     ${quoted ? '' : '.string() '}<< ']';`, right, [quoted ? `[${val}]` : `["${val}"]`, ...others, `[${ext.replace('.', '')}]`],
          `${which}() of ${p} is "${val}"${which === 'extension' ? (ext ? ', from the last dot of the filename' : (fn.startsWith('.') ? ': a leading dot is not an extension' : ': there is no dot')) : ''}. ${quoted ? 'Printing the path itself adds double quotes.' : 'string() gives the bare text.'}`);
      }
      if (k === 1) {
        const items = R.pick([['"spread"', 6], ['1000000', 7], ['3.25', 4], ['"bid ask"', 7], ['-42', 3], ['0.5', 3]]), nl = R.int(0, 1);
        return nq(`{\n  ofstream out("a.txt");\n  out << ${items[0]}${nl ? ` << ${NL}` : ''};\n}\ncout << fs::file_size("a.txt");`, items[1] + nl,
          `Text output is one byte per character: ${items[1]}${nl ? ', plus 1 for the newline on Linux' : ''}.`);
      }
      if (k === 2) {
        const nf = R.int(1, 4), deep = R.int(0, 1), rem = R.int(0, 1);
        const lines = [`fs::create_directories("d/x${deep ? '/y' : ''}");`, `for (int i = 0; i < ${nf}; i++)`, '  ofstream("d/" + to_string(i));'];
        if (rem) lines.push('cout << fs::remove_all("d");'); else lines.push('fs::directory_iterator it("d");', 'int n = 0;', 'for (auto& e : it) n++;', 'cout << n;');
        const ans = rem ? nf + 2 + deep : nf + 1;
        return nq(lines.join('\n'), ans, rem ? `remove_all counts every entry it deletes: ${nf} file${nf > 1 ? 's' : ''}, x${deep ? ', y' : ''}, and d itself.` : `directory_iterator lists d's own entries once each: ${nf} file${nf > 1 ? 's' : ''} and the directory x${deep ? ' (y is inside x, so it is not listed)' : ''}.`);
      }
      const ops = R.pick([['exists', 'remove', 'exists', 'remove'], ['remove', 'exists', 'remove', 'exists'], ['exists', 'remove', 'remove', 'exists'], ['remove', 'remove', 'exists', 'exists']]);
      const remake = R.int(0, 1) ? 2 : -1, vals = [], lines = ['ofstream("t.txt");']; let exists = true;
      ops.forEach((o, i) => { if (i === remake) { lines.push('ofstream("t.txt");'); exists = true; } lines.push(`cout << fs::${o}("t.txt");`); vals.push(+exists); if (o === 'remove') exists = false; });
      const right = vals.join('');
      return oq(lines.join('\n'), right, [ops.map(() => '1').join(''), vals.map(v => 1 - v).join(''), ops.map(o => o === 'remove' ? '1' : '0').join('')],
        `exists reports whether the file is there; remove returns true only if it deleted something, so a remove with nothing left returns false${remake > 0 ? ', and the second ofstream creates the file again' : ''}. Output: ${right}.`);
    } }]
  } });
})();
