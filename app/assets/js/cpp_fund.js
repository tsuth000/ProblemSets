'use strict';
// C++ track, part 1: fundamentals. Each code question carries `cpp`, the complete program behind the snippet.
// tools/verify.py compiles every distinct program with g++ -std=c++20 under UBSan and ASan, runs it, and compares stdout with the keyed answer.
(() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const pre = s => `<pre class="code">${esc(String(s).replace(/^\n/, ''))}</pre>`;
  const cd = s => `<code>${esc(s)}</code>`;
  const HEAD = '#include <bits/stdc++.h>\nusing namespace std;\n';
  const prog = (body, head = '') => ({ code: head ? `${head}\n// in main:\n${body}` : body, cpp: `${HEAD}${head}\nint main() {\n${body}\n}\n` });
  // Distinct choices, correct first; when the listed distractors collapse, near misses fill the set to at least three.
  const mc = (right, wrong) => { const r = String(right), o = [r];
    const near = []; if (/\d/.test(r)) { near.push(r.replace(/(-?\d+)(?!.*\d)/, d => String(+d + 1)), r.replace(/-?\d+/, d => String(+d + 1)), r.replace(/(-?\d+)(?!.*\d)/, d => String(+d - 1))); }
    for (let i = r.length - 2; i >= 0; i--) if (r[i] !== r[i + 1] && r[i] !== ' ' && r[i + 1] !== ' ') near.push(r.slice(0, i) + r[i + 1] + r[i] + r.slice(i + 2));
    for (let i = 0; i < r.length; i++) if (/[a-zA-Z]/.test(r[i])) near.push(r.slice(0, i) + (r[i] === r[i].toLowerCase() ? r[i].toUpperCase() : r[i].toLowerCase()) + r.slice(i + 1));
    for (const w of wrong) { const s = String(w); if (!o.includes(s)) o.push(s); if (o.length === 4) break; }
    for (const s of near) { if (o.length >= 3) break; if (!o.includes(s)) o.push(s); }
    return o; };
  const oq = (body, head, right, wrong, x) => Object.assign(prog(body, head), { q: 'What does this print?', c: mc(right, wrong), x });
  const nq = (body, head, answer, x, q) => Object.assign(prog(body, head), { q: q || 'What does this print?', answer, x });
  // printf("%g")-style output of a double, as cout prints it by default (6 significant digits).
  const g6 = v => { if (!Number.isFinite(v)) return v > 0 ? 'inf' : v < 0 ? '-inf' : 'nan'; const s = Number(v.toPrecision(6)); return Math.abs(s) >= 1e6 || (s !== 0 && Math.abs(s) < 1e-4) ? s.toExponential().replace(/e([+-])(\d)$/, 'e$10$2') : String(s); };
  window.CPP = { esc, pre, cd, prog, mc, oq, nq, g6, HEAD };

  registerSubject({ id: 'cpp', name: 'C++ fundamentals', color: '#00599C', plain: true, blurb: 'Types, integer arithmetic, control flow, functions, vectors, strings, pointers, classes, virtual functions, lifetime, conversions, undefined behavior', questions: [], generators: [] });
  const U = ['Programs, types and output', 'Integer arithmetic', 'Control flow', 'Functions and references', 'Arrays and vectors', 'Strings', 'Pointers', 'Classes and objects', 'Inheritance and virtual functions', 'Scope, lifetime and static', 'Conversions', 'Undefined behavior'];

  registerLearn('cpp', [
    { title: U[0], skill: U[0],
      hook: T`<p>C++ compiles to machine code with no interpreter or garbage collector in between. Every variable has a type fixed at compile time, and the type determines its size in memory and the operations it allows.</p>`,
      body: T`
<p>A complete program:</p>
${pre(T`#include <iostream>
using namespace std;

int main() {
  int n = 3;
  double x = 2.5;
  cout << n * x << '\n';
}`)}
<p>It prints 7.5. <b>Practice snippets</b> show only the statements inside ${cd('main')}, with the standard headers included and ${cd('using namespace std;')} in effect, so that they fit a phone screen. When a snippet defines functions or classes, those come first and a ${cd('// in main:')} line marks where ${cd('main')} begins. In headers and larger programs, write ${cd('std::cout')} in full.</p>
<table class="tt"><tr><th>Type</th><th>Bytes</th><th>Holds</th></tr>
<tr><td>${cd('bool')}</td><td>1</td><td>true or false</td></tr>
<tr><td>${cd('char')}</td><td>1</td><td>a character code</td></tr>
<tr><td>${cd('short')}</td><td>2</td><td>up to 32767</td></tr>
<tr><td>${cd('int')}</td><td>4</td><td>up to about 2.1 billion</td></tr>
<tr><td>${cd('long long')}</td><td>8</td><td>up to about 9.2e18</td></tr>
<tr><td>${cd('float')}</td><td>4</td><td>about 7 digits</td></tr>
<tr><td>${cd('double')}</td><td>8</td><td>about 16 digits</td></tr></table>
<p>The sizes are those of 64-bit Linux, macOS and Windows compilers. The standard guarantees only minimums: ${cd('sizeof(char)')} is 1, ${cd('int')} has at least 16 bits, and ${cd('long long')} at least 64. ${cd('sizeof(T)')} gives a size in bytes as an unsigned ${cd('size_t')}.</p>
<p><b>Output.</b> ${cd('cout <<')} prints each operand according to its type. A ${cd('bool')} prints as 1 or 0; after ${cd('cout << boolalpha')} it prints true or false. A ${cd('char')} prints as a character.</p>
<p><b>Characters are small integers.</b> In ASCII, ${cd("'A'")} is 65, ${cd("'a'")} is 97 and ${cd("'0'")} is 48, and letters and digits are consecutive. In arithmetic a ${cd('char')} is promoted to ${cd('int')}, so ${cd("'A' + 2")} is the int 67 and prints as 67. Storing the result in a ${cd('char')} gives the character C:</p>
${pre(T`char c = 'A' + 2;
cout << c << ' ' << 'A' + 2;`)}
<p>This prints ${cd('C 67')}.</p>`,
      ex: { q: T`<p>What does this print on 64-bit Linux?</p>${pre(T`bool b = 3 > 5;
cout << b << ' ' << sizeof(b);
cout << ' ' << char('a' + 1);`)}`, a: T`<p>${cd('3 > 5')} is false, which prints as 0. ${cd('sizeof(bool)')} is 1. ${cd("'a' + 1")} is the int 98, and converting it to ${cd('char')} gives b. Output: ${cd('0 1 b')}.</p>` },
      trap: T`Expecting ${cd("cout << 'A' + 1")} to print B. The sum is an int and prints as 66; only storing or converting it to char gives B.`,
      vary: [[T`What does this print?${pre("cout << 'a' + 1;")}`, 98, T`${cd("'a'")} is 97, and the sum is an int.`],
        [T`What does this print?${pre("char c = 'a' + 1;\ncout << c;")}`, ['b', '98', 'a1'], T`Stored in a char, 98 prints as the character b.`],
        [T`What does this print?${pre('cout << (2 < 3);')}`, ['1', 'true', '0'], T`A bool prints as 1 or 0 by default.`],
        [T`What does this print?${pre('cout << boolalpha << (2 < 3);')}`, ['true', '1', 'True'], T`${cd('boolalpha')} switches bool output to words.`],
        [T`On 64-bit Linux, what is ${cd('sizeof(int) + sizeof(long long)')}?`, 12, T`4 + 8.`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Integer arithmetic is exact until it overflows, and division discards the fraction. Both rules differ from Python, and both cause real bugs.</p>`,
      body: T`
<p><b>Division truncates toward zero.</b> ${cd('7 / 2')} is 3 and ${cd('-7 / 2')} is −3 (Python's ${cd('//')} gives −4). The remainder satisfies ${cd('(a / b) * b + a % b == a')}, so it takes the sign of the dividend.</p>
<table class="tt"><tr><th>a</th><th>b</th><th>a / b</th><th>a % b</th></tr>
<tr><td>7</td><td>2</td><td>3</td><td>1</td></tr>
<tr><td>−7</td><td>2</td><td>−3</td><td>−1</td></tr>
<tr><td>7</td><td>−2</td><td>−3</td><td>1</td></tr>
<tr><td>−7</td><td>−2</td><td>3</td><td>−1</td></tr></table>
<p>Integer division by zero is undefined behavior.</p>
<p><b>Overflow.</b> Signed overflow, such as ${cd('INT_MAX + 1')}, is undefined behavior. Unsigned types never overflow: their arithmetic wraps modulo 2<sup>n</sup>. With a 32-bit ${cd('unsigned')}, ${cd('0u - 1')} is 4294967295 = 2<sup>32</sup> − 1.</p>
<p><b>Signed meets unsigned.</b> When an ${cd('int')} and an ${cd('unsigned')} meet in an operator, the int is converted to unsigned. So ${cd('-1 < 1u')} is false: −1 becomes 4294967295. The same trap appears with ${cd('v.size()')}, which is unsigned: for an empty ${cd('v')}, ${cd('v.size() - 1')} is huge.</p>
<p><b>Increment.</b> ${cd('++i')} increments and yields the new value; ${cd('i++')} yields the old value and increments. ${cd('x += y')}, ${cd('x *= y')}, ${cd('x /= y')} and ${cd('x %= y')} apply the operator and store the result.</p>
${pre(T`int i = 5;
int a = i++;  // a = 5, i = 6
int b = ++i;  // b = 7, i = 7`)}`,
      ex: { q: T`<p>What does this print?</p>${pre(T`int a = -17, b = 5;
cout << a / b << ' ' << a % b;`)}`, a: T`<p>−17 / 5 = −3.4 truncates to −3, and −17 − (−3)(5) = −2. Output: ${cd('-3 -2')}. Python's floor division would give −4 and 3.</p>` },
      trap: T`Assuming ${cd('%')} is never negative. It has the sign of the dividend; for an index in 0..n−1 use ${cd('((a % n) + n) % n')}.`,
      vary: [[T`What does this print?${pre('cout << -9 / 4;')}`, -2, T`−2.25 truncates toward zero.`],
        [T`What does this print?${pre('cout << -9 % 4;')}`, -1, T`−9 − (−2)(4) = −1.`],
        [T`What does this print?${pre('cout << 9 % -4;')}`, 1, T`9 − (−2)(−4) = 1: the dividend is positive.`],
        [T`What does this print?${pre('unsigned u = 2;\nu -= 3;\ncout << u;')}`, 4294967295, T`−1 wraps to 2<sup>32</sup> − 1.`],
        [T`What does this print?${pre('int i = 4;\nint j = i++ * 10;\ncout << i + j;')}`, 45, T`${cd('j')} uses the old value 4, then ${cd('i')} becomes 5.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Branches and loops look like those of most languages. What differs is that a ${cd('switch')} falls through its cases, a ${cd('do')} loop always runs once, and ${cd('&&')} and ${cd('||')} skip their right side when the left side decides.</p>`,
      body: T`
<p><b>Conditions.</b> ${cd('if')} / ${cd('else')} and the conditional operator ${cd('c ? a : b')}. A condition can be any value convertible to bool: zero is false, everything else true.</p>
<p><b>Loops.</b> ${cd('for (init; cond; step)')} and ${cd('while (cond)')} test before each pass. ${cd('do { ... } while (cond);')} runs the body once before the first test. ${cd('break')} leaves the innermost loop; ${cd('continue')} skips to the next pass, and in a ${cd('for')} loop the step still runs.</p>
${pre(T`int s = 0;
for (int i = 1; i <= 10; i++) {
  if (i % 3 == 0) continue;
  if (i > 7) break;
  s += i;
}`)}
<p>${cd('s')} is 1 + 2 + 4 + 5 + 7 = 19: multiples of 3 are skipped, and the loop stops at 8.</p>
<p><b>switch</b> jumps to the matching ${cd('case')} label and runs from there, through the following labels, until a ${cd('break')} or the end. ${cd('default')} matches when no case does.</p>
${pre(T`switch (x) {
  case 1: s += 1;
  case 2: s += 2;
    break;
  default: s += 10;
}`)}
<p>For ${cd('x == 1')} this adds 3 (case 1 falls into case 2); for 2 it adds 2; for anything else, 10.</p>
<p><b>Short circuit.</b> In ${cd('a && b')}, ${cd('b')} is evaluated only if ${cd('a')} is true; in ${cd('a || b')}, only if ${cd('a')} is false. A skipped function call does not run at all, so its side effects do not happen.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`int n = 6, c = 0;
while (n > 1) {
  if (n % 2) n = 3 * n + 1;
  else n /= 2;
  c++;
}
cout << c;`)}`, a: T`<p>6, 3, 10, 5, 16, 8, 4, 2, 1: eight steps. Output: ${cd('8')}.</p>` },
      trap: T`Forgetting ${cd('break')} at the end of a case. Execution continues into the next case.`,
      vary: [[T`What does this print?${pre('int s = 0;\nfor (int i = 0; i < 9; i += 3)\n  s += i;\ncout << s;')}`, 9, T`0 + 3 + 6; the loop stops at 9.`],
        [T`What does this print?${pre('int n = 0;\ndo { n++; } while (n < 0);\ncout << n;')}`, 1, T`The body runs once before the test fails.`],
        [T`In the switch from the lesson, what is added for ${cd('x == 2')}?`, 2, T`Case 2 adds 2, then ${cd('break')}.`],
        [T`What does this print?${pre('int c = 0;\nif (c++ > 0 && c++ > 0)\n  c += 10;\ncout << c;')}`, 1, T`${cd('0 > 0')} is false, so the right side never runs.`],
        [T`What does this print?${pre('int c = 0;\nif (++c > 0 || ++c > 0)\n  c += 10;\ncout << c;')}`, 11, T`The left side is true, so ${cd('||')} skips the right; then 10 is added.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>By default a C++ function receives copies of its arguments. A reference parameter gives it the caller's variable instead, and that one choice decides whether a function can change what it is given.</p>`,
      body: T`
<p><b>By value.</b> The parameter is a copy; changing it does not affect the caller. <b>By reference</b> (${cd('int& x')}), the parameter is another name for the caller's variable, so changes are visible to the caller. Use ${cd('const T&')} to pass large objects such as strings and vectors without copying when the function only reads them.</p>
${pre(T`void bump(int a, int& b) {
  a++;
  b++;
}
int x = 1, y = 1;
bump(x, y);  // x = 1, y = 2`)}
<p><b>Overloading.</b> Functions may share a name if their parameter types differ. The compiler ranks each candidate by how the arguments convert: an exact match beats a <b>promotion</b> (${cd('bool')}, ${cd('char')} and ${cd('short')} to ${cd('int')}; ${cd('float')} to ${cd('double')}), which beats any other <b>conversion</b> (${cd('int')} to ${cd('double')}, and so on). With ${cd('g(int)')} and ${cd('g(double)')}:</p>
<table class="tt"><tr><th>Call</th><th>Picks</th><th>Why</th></tr>
<tr><td>${cd('g(3)')}</td><td>int</td><td>exact</td></tr>
<tr><td>${cd("g('a')")}</td><td>int</td><td>promotion</td></tr>
<tr><td>${cd('g(true)')}</td><td>int</td><td>promotion</td></tr>
<tr><td>${cd('g(2.5)')}</td><td>double</td><td>exact</td></tr>
<tr><td>${cd('g(2.5f)')}</td><td>double</td><td>promotion</td></tr>
<tr><td>${cd('g(3L)')}</td><td>neither</td><td>ambiguous</td></tr></table>
<p>The type of an expression decides, not its value: ${cd('7 / 2')} is an int and ${cd('7 / 2.0')} a double.</p>
<p><b>Default arguments</b> fill in trailing parameters the call leaves out: with ${cd('int h(int a, int b = 2)')}, ${cd('h(5)')} means ${cd('h(5, 2)')}.</p>
<p><b>Recursion.</b> A function may call itself; each call has its own parameters. It needs a base case, and to trace it you work from the base case up. Naive recursive Fibonacci makes an exponential number of calls, because it recomputes the same values:</p>
${pre(T`int fib(int n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`)}`,
      ex: { q: T`<p>With ${cd("void g(int) { cout << 'i'; }")} and ${cd("void g(double) { cout << 'd'; }")}, what does ${cd("g('x'); g(1.5f); g(true); g(7.0);")} print?</p>`, a: T`<p>A char promotes to int, a float promotes to double, a bool promotes to int, and 7.0 is an exact double. Output: ${cd('idid')}.</p>` },
      trap: T`Expecting a function to change a variable passed by value. Only a reference (or pointer) parameter reaches the caller's variable.`,
      vary: [[T`What does this print?${pre('void sw(int a, int b) {\n  int t = a; a = b; b = t;\n}\n// in main:\nint x = 1, y = 2;\nsw(x, y);\ncout << x << y;')}`, ['12', '21', '11'], T`Both parameters are copies.`],
        [T`The same, with ${cd('void sw(int& a, int& b)')}?`, ['21', '12', '22'], T`References swap the caller's variables.`],
        [T`With the lesson's ${cd('fib')}, what is ${cd('fib(7)')}?`, 13, T`0, 1, 1, 2, 3, 5, 8, 13.`],
        [T`With ${cd('int h(int a, int b = 2) { return a * b; }')}, what is ${cd('h(5)')}?`, 10, T`${cd('b')} defaults to 2.`],
        [T`With ${cd('g(int)')} and ${cd('g(double)')}, which runs for ${cd('g(7 / 2)')}?`, ['g(int)', 'g(double)', 'neither: ambiguous'], T`${cd('7 / 2')} is the int 3.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>A built-in array has a size fixed at compile time and carries little information about itself. ${cd('std::vector')} grows at run time and is the default container in C++.</p>`,
      body: T`
<p><b>Built-in arrays.</b> ${cd('int a[5] = {4, 2};')} sets ${cd('a[0] = 4')} and ${cd('a[1] = 2')} and zero-initializes the rest; ${cd('size(a)')} is 5. An array cannot be assigned or returned, and passing it to a function passes only a pointer to its first element. ${cd('std::array<int, 5>')} is a fixed-size array that can be copied, assigned and returned.</p>
<p><b>std::vector.</b> ${cd('push_back(x)')} appends, ${cd('pop_back()')} removes the last element, ${cd('back()')} reads it, ${cd('size()')} counts elements. ${cd('insert(v.begin() + i, x)')} puts ${cd('x')} at index ${cd('i')}, shifting later elements right; ${cd('erase(v.begin() + i)')} removes index ${cd('i')}, shifting later elements left.</p>
<p><b>Parentheses and braces differ.</b> ${cd('vector<int> v(3, 7)')} holds three 7s; ${cd('vector<int> w{3, 7}')} holds 3 and 7, because braces prefer the list constructor. ${cd('vector<int> z(4)')} holds four zeros.</p>
<p><b>Indexing.</b> ${cd('v[i]')} is not bounds-checked: reading past the end is undefined behavior. ${cd('v.at(i)')} checks and throws ${cd('std::out_of_range')}.</p>
<p><b>Range for.</b> ${cd('for (int x : v)')} copies each element, so changes to ${cd('x')} are lost. ${cd('for (int& x : v)')} binds a reference, so changes are written back. Use ${cd('const auto&')} to read large elements without copying.</p>
${pre(T`vector<int> v{1, 2, 3};
for (int x : v) x *= 10;
for (int& x : v) x += 1;
// v is now 2 3 4`)}
<p>A 2-D grid is a vector of vectors: ${cd('vector<vector<int>> g(r, vector<int>(c));')} and ${cd('g[i][j]')} is row ${cd('i')}, column ${cd('j')}.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`vector<int> v{5, 1, 4};
v.push_back(2);
v.erase(v.begin() + 1);
v.insert(v.begin(), 9);
for (int x : v)
  cout << x << ' ';`)}`, a: T`<p>After ${cd('push_back')}: 5 1 4 2. Erasing index 1: 5 4 2. Inserting 9 at the front: 9 5 4 2. Output: ${cd('9 5 4 2')}.</p>` },
      trap: T`Writing ${cd('vector<int> v{n};')} when you mean ${cd('n')} zeros. Braces make a one-element vector holding ${cd('n')}; use ${cd('v(n)')}.`,
      vary: [[T`What does this print?${pre('vector<int> v{4};\ncout << v.size();')}`, 1, T`One element, the value 4.`],
        [T`What does this print?${pre('vector<int> v(4);\ncout << v.size();')}`, 4, T`Four zeros.`],
        [T`What does this print?${pre('int a[6] = {1, 2};\ncout << a[4];')}`, 0, T`Elements without an initializer are zero.`],
        [T`What does this print?${pre('vector<int> v{1, 2};\nfor (int x : v) x = 0;\ncout << v[0] + v[1];')}`, 3, T`The loop changes copies.`],
        [T`What does this print?${pre('vector<int> v{1, 2};\nfor (int& x : v) x = 0;\ncout << v[0] + v[1];')}`, 0, T`Now the loop writes through references.`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>${cd('std::string')} is a growable sequence of chars that manages its own memory. Most string bugs come from three details: what ${cd('substr')}'s second argument means, what ${cd('find')} returns on failure, and how comparison orders characters.</p>`,
      body: T`
<p>${cd('s.size()')} (or ${cd('s.length()')}) is the number of chars, ${cd('s[i]')} is the char at index ${cd('i')} from 0, and ${cd('+')} and ${cd('+=')} concatenate.</p>
<p><b>Substrings.</b> ${cd('s.substr(pos, len)')} returns up to ${cd('len')} chars starting at ${cd('pos')}. The second argument is a length, not an end index. If it runs past the end, or is left out, you get the rest of the string.</p>
<p><b>Search.</b> ${cd('s.find(x)')} returns the index of the first occurrence of a char or string, and ${cd('s.rfind(x)')} the last. When ${cd('x')} is absent they return ${cd('string::npos')}, the largest ${cd('size_t')}. Test with ${cd('s.find(x) != string::npos')}.</p>
${pre(T`string s = "market";
s.substr(1, 3);  // "ark"
s.substr(4);     // "et"
s.find('k');     // 3
s.find("et");    // 4
s + "s";         // "markets"`)}
<p><b>Comparison</b> with ${cd('==')} and ${cd('<')} is lexicographic by char code. The first differing char decides, and a proper prefix comes first. Uppercase letters (65 to 90) come before lowercase (97 to 122), so ${cd('"Zoo" < "apple"')}. Digits compare as chars, so ${cd('"10" < "9"')}.</p>
<p><b>Digits.</b> The digit chars ${cd("'0'")} to ${cd("'9'")} are the codes 48 to 57, so ${cd("c - '0'")} converts ${cd("'7'")} to 7. Without the subtraction, ${cd("'7'")} in arithmetic is 55. ${cd('to_string(42)')} gives ${cd('"42"')}, and ${cd('stoi("42")')} gives 42.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`string s = "bid-ask";
size_t d = s.find('-');
cout << s.substr(d + 1);
cout << ' ' << s.rfind('a');`)}`, a: T`<p>The dash is at index 3, so ${cd('substr(4)')} is ${cd('ask')}. The last ${cd("'a'")} is at index 4. Output: ${cd('ask 4')}.</p>` },
      trap: T`Treating ${cd('substr')}'s second argument as an end index, as in Java's or JavaScript's ${cd('substring')}. ${cd('s.substr(2, 3)')} takes three chars.`,
      vary: [[T`What does this print?${pre('string s = "option";\ncout << s.substr(2, 3);')}`, ['tio', 'ti', 'tion'], T`Three chars from index 2.`],
        [T`For the same ${cd('s')}, what does ${cd("cout << s.rfind('o');")} print?`, 4, T`The last o.`],
        [T`For the same ${cd('s')}, what does ${cd("cout << s.find('o');")} print?`, 0, T`The first o.`],
        [T`What does this print?${pre('string a = "Zoo";\nstring b = "apple";\ncout << (a < b);')}`, 1, T`${cd("'Z'")} (90) is less than ${cd("'a'")} (97).`],
        [T`What does this print?${pre("char c = '9';\ncout << c - '0' + c;")}`, 66, T`9 + 57: the second ${cd('c')} is the code 57.`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>A pointer is a variable whose value is an address. Arrays, iterators and every low-level data structure are built on pointers, and the arithmetic rules for them follow from one fact: a pointer knows the size of what it points to.</p>`,
      body: T`
<p>${cd('&x')} is the address of ${cd('x')}. For ${cd('int* p = &x;')}, ${cd('*p')} is the int that ${cd('p')} points to, and ${cd('*p = 5;')} changes ${cd('x')}. A pointer can be reassigned to point elsewhere. ${cd('nullptr')} points nowhere; dereferencing it is undefined behavior.</p>
<p><b>Arrays and arithmetic.</b> An array name converts to a pointer to its first element. ${cd('p + k')} points ${cd('k')} elements further on, not ${cd('k')} bytes, and ${cd('p[k]')} means ${cd('*(p + k)')}; negative ${cd('k')} is fine while it stays inside the array. Subtracting two pointers into one array gives the number of elements between them, as a signed value.</p>
${pre(T`int a[] = {10, 20, 30, 40};
int* p = a + 1;   // &a[1]
*p;               // 20
p[2];             // 40
*(p - 1);         // 10
&a[3] - p;        // 2`)}
<p><b>Pointer to pointer.</b> ${cd('int** q = &p;')} stores the address of ${cd('p')}: ${cd('*q')} is ${cd('p')} itself, so ${cd('*q = &y;')} makes ${cd('p')} point to ${cd('y')}, and ${cd('**q')} is the int that ${cd('p')} points to.</p>
<p><b>const.</b> ${cd('const int* p')}: the pointee cannot be changed through ${cd('p')}, but ${cd('p')} can move. ${cd('int* const p')}: ${cd('p')} cannot move, but the pointee can change.</p>
<p>A reference is like a pointer that cannot be null or reseated and is dereferenced automatically. Prefer references for parameters and smart pointers for ownership (see the Modern C++ subject); raw pointers remain the language of arrays and low-level code.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`int x = 5, y = 7;
int* p = &x;
int* q = &y;
*p += *q;
p = q;
*p *= 2;
cout << x << ' ' << y;`)}`, a: T`<p>${cd('*p += *q')} makes ${cd('x')} 12. Then ${cd('p')} points to ${cd('y')}, which doubles to 14. Output: ${cd('12 14')}.</p>` },
      trap: T`Thinking ${cd('p + 1')} adds one byte. It advances by ${cd('sizeof(*p)')} bytes, one element.`,
      vary: [[T`What does this print?${pre('int a[] = {3, 6, 9, 12};\nint* p = a + 2;\ncout << *p;')}`, 9, T`${cd('a + 2')} is ${cd('&a[2]')}.`],
        [T`Same array and ${cd('p')}: what does ${cd('cout << p[-1];')} print?`, 6, T`One element back.`],
        [T`Same: what does ${cd('cout << *(p + 1) - *a;')} print?`, 9, T`12 − 3.`],
        [T`What does this print?${pre('int x = 4;\nint* p = &x;\nint** q = &p;\n**q = 9;\ncout << x;')}`, 9, T`${cd('**q')} is ${cd('x')}.`],
        [T`For ${cd('int a[8];')}, what is ${cd('&a[1] - &a[6]')}?`, -5, T`Pointer differences are signed element counts.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>A class bundles data with the functions that act on it, and constructors and destructors tie each object's setup and cleanup to its lifetime. Knowing exactly when they run is the basis of resource management in C++.</p>`,
      body: T`
<p>${cd('struct')} and ${cd('class')} differ only in default access: struct members are public by default, class members private.</p>
<p><b>Constructors</b> initialize an object. The member initializer list after the colon initializes members directly. A default member initializer (${cd('int qty = 0;')}) applies whenever a constructor does not mention that member. Members are initialized in the order they are declared, whatever order the list uses.</p>
${pre(T`struct Order {
  int qty = 0;
  double px = 0;
  Order(int q, double p)
    : qty(q), px(p) {}
  double value() const {
    return qty * px;
  }
};`)}
<p>A <b>const member function</b> (${cd('value() const')}) promises not to modify the object; only const member functions can be called on a const object.</p>
<p><b>Destructors</b> (${cd('~Order()')}) run when an object's lifetime ends: at the end of the enclosing block for a local, at ${cd('delete')} for an object made with ${cd('new')}, and at the end of ${cd('main')} for its locals. Locals in a block are destroyed in reverse order of construction.</p>
<p><b>Static data members</b> belong to the class, not to any object: one copy is shared by all instances, written ${cd('C::n')}. It is defined once outside the class, as in ${cd('int C::n = 0;')}.</p>
<p>Practice snippets use this tracer to show lifetimes. It prints a lowercase letter on construction and the uppercase letter on destruction (lowercase minus 32):</p>
${pre(T`struct T {
  char c;
  T(char c) : c(c) {
    cout << c;
  }
  ~T() { cout << char(c - 32); }
};
// in main:
T a('a');
{ T b('b'); }
T c('c');`)}
<p>This prints ${cd('abBcCA')}: ${cd('b')} dies at the end of its block, and at the end of ${cd('main')} ${cd('c')} dies before ${cd('a')}.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`struct C {
  static int n;
  C() { n++; }
  ~C() { n--; }
};
int C::n = 0;
// in main:
C a;
{ C b[4]; }
C* p = new C;
cout << C::n;
delete p;`)}`, a: T`<p>${cd('a')} is alive (1). The four in the block were constructed and destroyed (back to 1). ${cd('new C')} makes 2. Output: ${cd('2')}.</p>` },
      trap: T`Expecting members to be initialized in initializer-list order. Declaration order wins, so in ${cd('struct P { int a, b; P() : b(1), a(b) {} };')} the member ${cd('a')} reads ${cd('b')} before it is set.`,
      vary: [[T`With the tracer ${cd('T')}, what does this print?${pre("T x('x');\n{\n  T y('y');\n  T z('z');\n}")}`, ['xyzZYX', 'xyzYZX', 'xyzXYZ'], T`The block destroys z, then y; x dies at the end of main.`],
        [T`What does this print?${pre('struct S {\n  int a = 4, b = 5;\n  S(int x) : a(x) {}\n};\n// in main:\nS s(9);\ncout << s.a + s.b;')}`, 14, T`The constructor sets ${cd('a')} to 9; ${cd('b')} keeps its default 5.`],
        [T`In a ${cd('class')} with no access specifier, the members are:`, ['private', 'public', 'protected'], T`A struct would make them public.`],
        [T`A const object can call:`, ['only const member functions', 'any member function', 'no member functions'], T`A non-const member function might modify it.`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Inheritance lets a derived class be used wherever its base is expected. A virtual function chooses its implementation at run time from the object's actual type; everything else is decided at compile time from the declared type.</p>`,
      body: T`
<p>${cd('struct D : B { ... };')} makes ${cd('D')} a ${cd('B')} plus its own members; a ${cd('D')} can bind to a ${cd('B&')} or ${cd('B*')}.</p>
<p><b>Construction order:</b> the base first, then the members in declaration order, then the constructor body. <b>Destruction</b> reverses it exactly: the destructor body, then the members in reverse order, then the base.</p>
<p><b>Virtual dispatch.</b> A call through a reference or pointer to ${cd('B')} runs the version of the object's dynamic type if the function is ${cd('virtual')}, and ${cd('B')}'s version (the static type) if it is not. ${cd('override')} asks the compiler to confirm that a function really overrides a virtual one.</p>
${pre(T`struct B {
  virtual int f() { return 1; }
  int g() { return 1; }
};
struct D : B {
  int f() override { return 2; }
  int g() { return 2; }
};
D d;
B& r = d;
B* p = &d;
B s = d;`)}
<table class="tt"><tr><th>Call</th><th>Result</th><th>Why</th></tr>
<tr><td>${cd('r.f()')}, ${cd('p->f()')}</td><td>2</td><td>virtual: dynamic type D</td></tr>
<tr><td>${cd('r.g()')}, ${cd('p->g()')}</td><td>1</td><td>not virtual: static type B</td></tr>
<tr><td>${cd('d.f()')}, ${cd('d.g()')}</td><td>2</td><td>the object is a D</td></tr>
<tr><td>${cd('s.f()')}, ${cd('s.g()')}</td><td>1</td><td>sliced: s is a B</td></tr></table>
<p><b>Slicing.</b> Copying a ${cd('D')} into a ${cd('B')} object (${cd('B s = d;')}, or passing by value to a ${cd('B')} parameter) copies only the ${cd('B')} part. ${cd('s')} is a real ${cd('B')}, so even virtual calls run ${cd('B')}'s code.</p>
<p><b>Virtual destructors.</b> Deleting a ${cd('D')} through a ${cd('B*')} is undefined unless ${cd('B')}'s destructor is virtual. Give any class with virtual functions a virtual destructor. A <b>pure virtual</b> function (${cd('virtual int f() = 0;')}) makes the class abstract: it can be derived from but not instantiated.</p>
<p>A virtual call goes through a table of function pointers found via the object, and it usually blocks inlining. The Modern C++ subject covers the compile-time alternative.</p>`,
      ex: { q: T`<p>What does ${cd('{ B x; }')} print?</p>${pre(T`struct A {
  A() { cout << 'A'; }
  ~A() { cout << 'a'; }
};
struct B : A {
  B() { cout << 'B'; }
  ~B() { cout << 'b'; }
};`)}`, a: T`<p>The base is constructed first, then B's body runs; destruction reverses that. Output: ${cd('ABba')}.</p>` },
      trap: T`Expecting a non-virtual function to dispatch on the object's real type. Without ${cd('virtual')}, a call through ${cd('B&')} or ${cd('B*')} runs ${cd('B')}'s version.`,
      vary: [[T`In the lesson's code, what is ${cd('p->f() + 10 * p->g()')}?`, 12, T`2 + 10 · 1.`],
        [T`What is ${cd('s.f()')}?`, 1, T`${cd('s')} is a sliced copy, a genuine B.`],
        [T`What is ${cd('d.g()')}?`, 2, T`Called on a D directly.`],
        [T`With the A and B of the example and ${cd('struct C : A { B m; ... }')} printing C and c, what does ${cd('{ C x; }')} print?`, ['AABCcbaa', 'ABACcaba', 'AABCaabc'], T`Base A, then member m (A then B), then C's body; destruction reverses.`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Scope decides where a name can be used; storage duration decides how long the object behind it lives. The two coincide for ordinary locals but not for statics and heap objects.</p>`,
      body: T`
<p><b>Scope.</b> A name is visible from its declaration to the end of its enclosing block. A name declared in an inner block shadows the same name outside; the outer variable is untouched and visible again after the block. A variable declared in a ${cd('for')} header belongs to the loop.</p>
${pre(T`int x = 1;
{
  int x = 5;  // a new variable
  x++;        // the inner x is 6
}
cout << x;    // 1`)}
<p>Without the ${cd('int')}, ${cd('x = 5;')} would assign to the outer ${cd('x')}.</p>
<table class="tt"><tr><th>Storage</th><th>Created</th><th>Destroyed</th></tr>
<tr><td>automatic: locals</td><td>at the declaration</td><td>end of block</td></tr>
<tr><td>static: globals, static locals</td><td>once</td><td>program exit</td></tr>
<tr><td>dynamic</td><td>${cd('new')}</td><td>${cd('delete')}</td></tr></table>
<p>A <b>static local</b> is initialized the first time control reaches it and keeps its value between calls; an automatic local starts fresh each call.</p>
${pre(T`int counter() {
  static int n = 0;
  return ++n;
}
// returns 1, 2, 3, ...`)}
<p>Returning a reference or pointer to an automatic local leaves it dangling: the object no longer exists, and using it is undefined behavior. Return by value instead; the compiler elides or moves the copy.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`int f() {
  int a = 0;
  static int s = 0;
  a++;
  s++;
  return a * 10 + s;
}
// in main:
f(); f();
cout << f();`)}`, a: T`<p>${cd('a')} is 1 on every call; ${cd('s')} reaches 3 on the third. Output: ${cd('13')}.</p>` },
      trap: T`Expecting a static local's initializer to run on every call. It runs once.`,
      vary: [[T`With the lesson's ${cd('counter')}, what does ${cd('counter(); cout << counter() * 10;')} print?`, 20, T`The second call returns 2.`],
        [T`What does this print?${pre('int x = 3;\n{\n  int x = 8;\n  x += 1;\n}\ncout << x;')}`, 3, T`The block's x is a different variable.`],
        [T`What does this print?${pre('int x = 3;\n{\n  x = 8;\n  x += 1;\n}\ncout << x;')}`, 9, T`No declaration, so the block changes the outer x.`],
        [T`What does this print?${pre('int i = 7;\nfor (int i = 0; i < 3; i++) {}\ncout << i;')}`, 7, T`The loop declares its own i.`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>C++ converts between arithmetic types silently. The rules are simple, but the type of an expression is fixed by its operands, not by where the result is stored.</p>`,
      body: T`
<p><b>Usual arithmetic conversions.</b> Before a binary operator, both operands convert to a common type: the wider one (int with double gives double; int with long long gives long long), and a signed and an unsigned type of the same size give the unsigned type. Types narrower than int are first promoted to int. Operators of equal precedence group left to right.</p>
<p>In ${cd('double d = 7 / 2;')} the division is integer division, so ${cd('d')} is 3. Write ${cd('7 / 2.0')} or ${cd('double(a) / b')}.</p>
<p><b>Floating to integer</b> truncates toward zero: ${cd('int(3.99)')} is 3 and ${cd('int(-3.99)')} is −3. Use ${cd('lround')} to round.</p>
<p><b>To and from bool.</b> Zero converts to false and any other value, negative or fractional, to true. True converts to 1 and false to 0.</p>
<p><b>To a narrower integer type</b> the value is reduced modulo 2<sup>n</sup>: ${cd('unsigned char c = 300;')} stores 300 − 256 = 44, and −1 stores 255. Since C++20 the same rule holds for signed targets.</p>
<p><b>Casts.</b> ${cd('static_cast<double>(x)')} states a conversion explicitly. The forms ${cd('(double)x')} and ${cd('double(x)')} also work but can perform riskier casts without warning.</p>
<p><b>Braces reject narrowing.</b> ${cd('int i{3.5};')} and ${cd('char c{300};')} do not compile; ${cd('int i = 3.5;')} compiles and truncates.</p>
<p><b>Printing doubles.</b> ${cd('cout')} shows at most 6 significant digits and drops trailing zeros, so 3.0 prints as 3 and 2.50 as 2.5.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`int a = 7, b = 2;
double x = a / b;
double y = a / double(b);
cout << x << ' ' << y;`)}`, a: T`<p>${cd('a / b')} is integer division, 3, converted to 3.0 and printed as 3. The second divides doubles. Output: ${cd('3 3.5')}.</p>` },
      trap: T`Writing ${cd('double avg = sum / n;')} with int ${cd('sum')} and ${cd('n')}. The division happens in int first.`,
      vary: [[T`What does this print?${pre('cout << 9 / 2 * 2.0;')}`, 8, T`${cd('9 / 2')} is 4 first, then 4 · 2.0.`],
        [T`What does this print?${pre('cout << int(-2.7);')}`, -2, T`Truncation toward zero.`],
        [T`What does this print?${pre('unsigned char c = 260;\ncout << int(c);')}`, 4, T`260 − 256.`],
        [T`What does this print?${pre('bool b = -3;\ncout << b + 1;')}`, 2, T`Nonzero is true, which is 1.`],
        [T`What happens with ${cd('int i{2.5};')}?`, ['It does not compile', 'i is 2', 'i is 3'], T`Brace initialization forbids narrowing.`]] },

    { title: U[11], skill: U[11],
      hook: T`<p>Some operations have no defined meaning in C++. A program that performs one may crash, print nonsense, or seem to work until a different compiler or optimization level changes the result.</p>`,
      body: T`
<p>The standard imposes no requirement at all on a program with <b>undefined behavior</b>, and optimizers assume it never happens. A check written after the fact, such as testing whether ${cd('x + 1 < x')} for signed ${cd('x')}, can be deleted as always false.</p>
<table class="tt"><tr><th>Undefined</th><th>Example</th></tr>
<tr><td>signed overflow</td><td>${cd('INT_MAX + 1')}</td></tr>
<tr><td>out of bounds</td><td>${cd('a[n]')}, size ${cd('n')}</td></tr>
<tr><td>null dereference</td><td>${cd('*p')}, ${cd('p')} null</td></tr>
<tr><td>use after free</td><td>${cd('*p')} after ${cd('delete p')}</td></tr>
<tr><td>uninitialized read</td><td>${cd('int x; f(x);')}</td></tr>
<tr><td>integer ÷ 0</td><td>${cd('n / 0')}</td></tr>
<tr><td>bad shift</td><td>${cd('1 << 32')}, 32-bit int</td></tr>
<tr><td>data race</td><td>unsynchronized write</td></tr></table>
<p><b>Defined, though surprising:</b> unsigned arithmetic wraps; ${cd('v.at(i)')} out of range throws ${cd('std::out_of_range')}, which ends the program if nothing catches it; ${cd('1u << 31')} is 2147483648.</p>
<p><b>Not the same thing:</b> implementation-defined behavior is documented by each compiler (${cd('sizeof(int)')}, whether ${cd('char')} is signed). Unspecified behavior allows several outcomes (the order in which function arguments are evaluated).</p>
<p><b>Invalidation.</b> A vector keeps its elements in one block. When ${cd('size()')} reaches ${cd('capacity()')}, the next ${cd('push_back')} moves everything to a larger block, and every pointer, reference and iterator into the old block dangles. After ${cd('v.reserve(n)')}, no reallocation happens until the size exceeds ${cd('n')}. A vector built from a brace list has capacity equal to its size.</p>
<p><b>Tools.</b> Compile tests with ${cd('-Wall -Wextra')} and run them under ${cd('-fsanitize=address,undefined')}; the sanitizers stop at the first detected error and report it. Every snippet in these C++ subjects was checked that way.</p>`,
      ex: { q: T`<p>Which is undefined: (a) ${cd('unsigned u = 0; u--;')} (b) ${cd('int i = INT_MAX; i++;')} (c) ${cd('vector<int> v(3); v.at(3);')}?</p>`, a: T`<p>Only (b). (a) wraps to 4294967295. (c) throws ${cd('std::out_of_range')}.</p>` },
      trap: T`Concluding that code is correct because it printed the expected value once. Undefined behavior often looks fine until something changes.`,
      vary: [[T`What does this print?${pre('unsigned u = UINT_MAX;\nu += 2;\ncout << u;')}`, 1, T`Unsigned arithmetic wraps: 2<sup>32</sup> + 1 mod 2<sup>32</sup>.`],
        [T`${cd('int x = INT_MAX; x += 2;')} gives:`, ['Undefined behavior', '-2147483647', '1'], T`Signed overflow.`],
        [T`${cd('vector<int> v(3); cout << v.at(3);')} gives:`, ['Throws std::out_of_range', 'Undefined behavior', '0'], T`${cd('at')} checks bounds.`],
        [T`${cd('vector<int> v{1, 2, 3}; int& r = v[0]; v.push_back(4);')} leaves ${cd('r')}:`, ['dangling', 'equal to 1', 'equal to 4'], T`The brace list gave capacity 3, so the push reallocates.`]] }
  ]);

  addQuestions('cpp', [
    { id: 'cpq1', skill: U[0], q: 'Which size does the C++ standard guarantee on every platform?', c: ['sizeof(char) == 1', 'sizeof(int) == 4', 'sizeof(long) == 8', 'sizeof(double) == 8'], x: 'char is 1 by definition. The others are typical, not guaranteed: long is 4 bytes on 64-bit Windows.' },
    { id: 'cpq2', skill: U[0], q: 'What does this print?', code: "cout << 'B' - 'A' + 'a';", cpp: `${HEAD}int main() {\ncout << 'B' - 'A' + 'a';\n}\n`, c: ['98', 'b', '1', 'Ba'], x: "1 + 97 = 98. The result is an int, so it prints as a number." },
    { id: 'cpq3', skill: U[1], q: 'What does this print?', code: 'cout << -1 / 2 << -1 % 2;', cpp: `${HEAD}int main() {\ncout << -1 / 2 << -1 % 2;\n}\n`, c: ['0-1', '-11', '-1-1', '01'], x: '-0.5 truncates to 0, and -1 - 0 * 2 = -1.' },
    { id: 'cpq4', skill: U[1], q: 'Which line contains undefined behavior?', c: ['int x = INT_MAX; x++;', 'unsigned u = 0; u--;', 'int y = -7 / 2;', 'int z = -7 % 2;'], x: 'Signed overflow is undefined. Unsigned wraps, and negative division and remainder are fully defined.' },
    { id: 'cpq5', skill: U[1], q: 'What does this print?', code: 'int a = -1;\nunsigned b = 1;\ncout << (a < b);', cpp: `${HEAD}int main() {\nint a = -1;\nunsigned b = 1;\ncout << (a < b);\n}\n`, c: ['0', '1', 'It does not compile', '-1'], x: 'a converts to unsigned, becoming 4294967295, which is not less than 1.' },
    { id: 'cpq6', skill: U[2], q: 'What does this print?', code: 'int s = 0;\nfor (int i = 0; i < 5; i++) {\n  if (i == 2) continue;\n  s += i;\n}\ncout << s;', cpp: `${HEAD}int main() {\nint s = 0;\nfor (int i = 0; i < 5; i++) {\n  if (i == 2) continue;\n  s += i;\n}\ncout << s;\n}\n`, c: ['8', '10', '1', '3'], x: '0 + 1 + 3 + 4: only i = 2 is skipped.' },
    { id: 'cpq7', skill: U[2], q: 'How many times does the body of do { } while (false); run?', c: ['once', 'never', 'forever', 'it does not compile'], x: 'A do loop tests after the body.' },
    { id: 'cpq8', skill: U[3], q: 'With overloads g(int) and g(double), what happens for g(5L)?', c: ['It does not compile: the call is ambiguous', 'g(int) runs', 'g(double) runs', 'g(int) runs with a warning'], x: 'long to int and long to double are both conversions of equal rank.' },
    { id: 'cpq9', skill: U[3], q: 'Why pass a std::vector as const vector<int>& to a function that only reads it?', c: ['To avoid copying it while preventing changes', 'To let the function resize it', 'Because vectors cannot be passed by value', 'To make it a global variable'], x: 'By value copies every element; a const reference copies nothing and forbids modification.' },
    { id: 'cpq10', skill: U[4], q: 'What does this print?', code: 'vector<int> v(3, 5);\nvector<int> w{3, 5};\ncout << v.size() << w.size();', cpp: `${HEAD}int main() {\nvector<int> v(3, 5);\nvector<int> w{3, 5};\ncout << v.size() << w.size();\n}\n`, c: ['32', '23', '33', '22'], x: 'v has three 5s; w has the two values 3 and 5.' },
    { id: 'cpq11', skill: U[4], q: 'What does v.at(i) do that v[i] does not?', c: ['Checks bounds and throws std::out_of_range', 'Returns a copy', 'Grows the vector if needed', 'Works on const vectors'], x: 'v[i] out of range is undefined behavior.' },
    { id: 'cpq12', skill: U[5], q: 'What does s.find(x) return when x is absent?', c: ['string::npos', '-1 as an int', '0', 's.size()'], x: 'npos is the largest size_t. Comparing an int -1 with it happens to work only because -1 converts to that value.' },
    { id: 'cpq13', skill: U[5], q: 'What does this print?', code: 'string s = "spread";\ncout << s.substr(2, 2);', cpp: `${HEAD}int main() {\nstring s = "spread";\ncout << s.substr(2, 2);\n}\n`, c: ['re', 'r', 'rea', 'pr'], x: 'Two chars starting at index 2.' },
    { id: 'cpq14', skill: U[6], q: 'For int* p, what does p + 1 point to?', c: ['the next int, sizeof(int) bytes further', 'the next byte', 'the value *p + 1', 'nothing; it is undefined'], x: 'Pointer arithmetic counts elements.' },
    { id: 'cpq15', skill: U[6], q: 'In const int* p, what is const?', c: ['the int pointed to, through p', 'the pointer p itself', 'both', 'neither'], x: 'Read right to left: p is a pointer to const int. int* const p makes the pointer const.' },
    { id: 'cpq16', skill: U[7], q: 'In which order are members initialized?', c: ['the order they are declared in the class', 'the order of the initializer list', 'alphabetical order', 'unspecified'], x: 'Compilers warn (-Wreorder) when the list order differs.' },
    { id: 'cpq17', skill: U[7], q: 'Locals a, b, c are constructed in that order in one block. In what order are they destroyed?', c: ['c, b, a', 'a, b, c', 'unspecified', 'only at program exit'], x: 'Destruction reverses construction.' },
    { id: 'cpq18', skill: U[8], q: 'Why should a base class with virtual functions have a virtual destructor?', c: ['Deleting a derived object through a base pointer is undefined otherwise', 'Virtual functions do not compile without one', 'It makes the class abstract', 'It speeds up dispatch'], x: 'Without it, delete through B* would not run the derived destructor.' },
    { id: 'cpq19', skill: U[8], q: 'What is object slicing?', c: ['Copying a derived object into a base object, keeping only the base part', 'Splitting a class into two files', 'Deleting part of an array', 'Calling a base function from a derived one'], x: 'B s = d; makes s a genuine B.' },
    { id: 'cpq20', skill: U[9], q: 'What is wrong with int& f() { int x = 1; return x; }?', c: ['It returns a reference to a local that no longer exists', 'References cannot be returned', 'x must be const', 'Nothing'], x: 'x dies when f returns, so the reference dangles.' },
    { id: 'cpq21', skill: U[10], q: 'Which line does not compile?', c: ['int i{3.5};', 'int i = 3.5;', 'int i(3.5);', 'double d{3};'], x: 'Brace initialization rejects narrowing. Widening int to double is fine.' },
    { id: 'cpq22', skill: U[10], q: 'What does this print?', code: 'double d = 1 / 4;\ncout << d;', cpp: `${HEAD}int main() {\ndouble d = 1 / 4;\ncout << d;\n}\n`, c: ['0', '0.25', '0.0', '1'], x: 'Integer division gives 0 before the conversion to double.' },
    { id: 'cpq23', skill: U[11], q: 'What is the difference between undefined and implementation-defined behavior?', c: ['Implementation-defined behavior is documented by the compiler; undefined behavior has no requirements at all', 'They are the same', 'Undefined behavior always crashes', 'Implementation-defined behavior is a compile error'], x: 'sizeof(int) is implementation-defined; signed overflow is undefined.' },
    { id: 'cpq24', skill: U[11], q: 'Why can an optimizer delete the check if (x + 1 < x) for a signed int x?', c: ['Signed overflow is undefined, so the compiler may assume it never happens', 'The check is a syntax error', 'Integers cannot overflow', 'The comparison is unspecified'], x: 'Under that assumption x + 1 < x is always false.' }
  ]);

  // ---------- generators ----------
  const TR = 'struct T {\n  char c;\n  T(char c) : c(c) {\n    cout << c;\n  }\n  ~T() { cout << char(c - 32); }\n};';
  window.CPP_TRACER = TR;
  registerUnitGens('cpp', { units: {
    [U[0]]: [{ id: 'cp-out', make(R) {
      const k = R.int(0, 2);
      if (k === 0) {
        const L = R.pick(['A', 'a']), n = R.int(1, 12), code = L.charCodeAt(0) + n, ch = String.fromCharCode(code);
        return oq(`char c = '${L}' + ${n};\ncout << c << ' ' << '${L}' + ${n};`, '', `${ch} ${code}`, [`${ch} ${ch}`, `${code} ${code}`, `${code} ${ch}`],
          `'${L}' is ${L.charCodeAt(0)}, so the sum is the int ${code}. Stored in the char c it prints as ${ch}; printed directly it stays the int ${code}.`);
      }
      if (k === 1) {
        const a = R.int(1, 20), b = R.int(1, 20), op = R.pick(['<', '>', '==', '!=', '<=']), v = { '<': a < b, '>': a > b, '==': a === b, '!=': a !== b, '<=': a <= b }[op], words = R.int(0, 1);
        const f = t => words ? String(t) : String(+t);
        return oq(`bool b = ${a} ${op} ${b};\n${words ? 'cout << boolalpha;\n' : ''}cout << b << ' ' << !b;`, '', `${f(v)} ${f(!v)}`, [`${f(!v)} ${f(v)}`, words ? `${+v} ${+!v}` : `${v} ${!v}`, words ? `${+!v} ${+v}` : `${!v} ${v}`],
          `${a} ${op} ${b} is ${v}. ${words ? 'After boolalpha a bool prints as true or false.' : 'Without boolalpha a bool prints as 1 or 0.'}`);
      }
      const TY = [['char', 1], ['bool', 1], ['short', 2], ['int', 4], ['float', 4], ['long long', 8], ['double', 8]], ts = R.sample(TY, 3);
      return nq(`size_t s = sizeof(${ts[0][0]});\ns += sizeof(${ts[1][0]});\ns += sizeof(${ts[2][0]});\ncout << s;`, '', ts.reduce((s, t) => s + t[1], 0),
        `On 64-bit Linux: ${ts.map(t => `${t[0]} is ${t[1]}`).join(', ')}.`, 'What does this print on 64-bit Linux?');
    } }],
    [U[1]]: [{ id: 'cp-arith', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const a = R.nz(-40, 40), b = R.pick([-9, -7, -6, -5, -4, -3, 3, 4, 5, 6, 7, 9]);
        if (a % b === 0 || (a < 0) === (b < 0)) return this.make(R);
        const q = Math.trunc(a / b), r = a - q * b, fq = Math.floor(a / b), fr = a - fq * b;
        return oq(`int a = ${a}, b = ${b};\ncout << a / b << ' ' << a % b;`, '', `${q} ${r}`, [`${fq} ${fr}`, `${q} ${-r}`, `${fq} ${r}`, `${q} ${fr}`],
          `${a} / ${b} = ${R.fmt(a / b, 3)} truncates toward zero to ${q}. The remainder is ${a} - (${q})(${b}) = ${r}, with the sign of the dividend. Floor division, as in Python, would give ${fq} and ${fr}.`);
      }
      if (k === 1) {
        const n = R.int(0, 6), m = R.int(n + 1, n + 12), ans = 2 ** 32 - (m - n);
        return nq(`unsigned u = ${n};\nu -= ${m};\ncout << u;`, '', ans, `Unsigned arithmetic wraps modulo 2^32: ${n} - ${m} = -${m - n} becomes 2^32 - ${m - n} = ${ans}.`);
      }
      if (k === 2) {
        const a = R.int(1, 9), mk = () => ({ pre: R.int(0, 1), op: R.pick(['+', '*']), p: R.int(2, 9) }), s1 = mk(), s2 = mk();
        let i = a; const step = s => { let v; if (s.pre) { i++; v = i; } else { v = i; i++; } return s.op === '+' ? v + s.p : v * s.p; };
        const j = step(s1), kk = step(s2), inc = s => s.pre ? '++i' : 'i++';
        return nq(`int i = ${a};\nint j = ${inc(s1)} ${s1.op} ${s1.p};\nint k = ${inc(s2)} ${s2.op} ${s2.p};\ncout << i + j + k;`, '', i + j + kk,
          `${inc(s1)} ${s1.pre ? 'yields the new value' : 'yields the old value'}, so j = ${j}; ${inc(s2)} ${s2.pre ? 'yields the new value' : 'yields the old value'}, so k = ${kk}. i ends at ${i}. Sum: ${i + j + kk}.`);
      }
      const a = R.int(1, 9), b = R.int(1, 9);
      return oq(`int a = -${a};\nunsigned b = ${b};\ncout << (a < b) << ' ';\ncout << (a < ${b});`, '', '0 1', ['1 1', '0 0', '1 0'],
        `In a < b the int converts to unsigned, so -${a} becomes ${2 ** 32 - a}, which is not less than ${b}. In a < ${b} both sides are int, and -${a} < ${b} is true.`);
    } }],
    [U[2]]: [{ id: 'cp-flow', make(R) {
      const k = R.int(0, 4);
      if (k === 0) {
        const a = R.int(0, 5), b = R.int(12, 30), st = R.int(2, 5), sq = R.int(0, 1); let s = 0; const terms = [];
        for (let i = a; i < b; i += st) { s += sq ? i * i : i; terms.push(i); }
        return nq(`int s = 0;\nfor (int i = ${a}; i < ${b}; i += ${st})\n  s += ${sq ? 'i * i' : 'i'};\ncout << s;`, '', s, `i takes ${terms.join(', ')}. ${sq ? 'Summing squares' : 'Summing'} gives ${s}.`);
      }
      if (k === 1) {
        const N = R.int(12, 20), P = R.int(2, 5), M = R.int(5, N - 2); let s = 0; const used = [];
        for (let i = 1; i <= N; i++) { if (i % P === 0) continue; if (i > M) break; s += i; used.push(i); }
        return nq(`int s = 0;\nfor (int i = 1; i <= ${N}; i++) {\n  if (i % ${P} == 0) continue;\n  if (i > ${M}) break;\n  s += i;\n}\ncout << s;`, '', s,
          `Multiples of ${P} are skipped, and the first other value above ${M} ends the loop. Added: ${used.join(' + ')} = ${s}.`);
      }
      if (k === 2) {
        const br = R.int(1, 3), x = R.int(1, 5), add = [1, 2, 4, 8], lab = ['case 1', 'case 2', 'case 3', 'default'];
        let st = x <= 3 ? x - 1 : 3, s = 0; const ran = [];
        for (let i = st; i < 4; i++) { s += add[i]; ran.push(lab[i]); if (i === br - 1) break; }
        const lines = lab.map((l, i) => `  ${l}: s += ${add[i]};${i === br - 1 ? ' break;' : ''}`);
        return nq(`int s = 0, x = ${x};\nswitch (x) {\n${lines.join('\n')}\n}\ncout << s;`, '', s,
          `x = ${x} jumps to ${lab[st]}, then execution falls through until a break or the end: ${ran.join(', ')}. s = ${s}.`);
      }
      if (k === 3) {
        const B = R.int(0, 5), small = R.int(0, 3) === 0, n0 = small ? R.int(0, B) : R.int(20, 200); let n = n0, c = 0;
        do { n = Math.trunc(n / 2); c++; } while (n > B);
        return nq(`int n = ${n0}, c = 0;\ndo {\n  n /= 2;\n  c++;\n} while (n > ${B});\ncout << c;`, '', c,
          small ? `The body runs once before the first test; then n = ${n} is not above ${B}. c = 1.` : `Halving with truncation, the loop stops once n is at most ${B}. That takes ${c} passes.`);
      }
      const v = Array.from({ length: 4 }, () => R.int(0, 1)); let c = 0; const f = r => { c++; return !!r; };
      if (f(v[0]) && f(v[1])) c += 10; if (f(v[2]) || f(v[3])) c += 100;
      const calls1 = v[0] ? 2 : 1, calls2 = v[2] ? 1 : 2;
      return nq(`if (f(${v[0]}) && f(${v[1]}))\n  c += 10;\nif (f(${v[2]}) || f(${v[3]}))\n  c += 100;\ncout << c;`, 'int c = 0;\nbool f(bool r) {\n  c++;\n  return r;\n}', c,
        `The && runs ${calls1} call${calls1 > 1 ? 's' : ''}${v[0] ? '' : ' (the left side is false, so the right is skipped)'}; the || runs ${calls2}${v[2] ? ' (the left side is true, so the right is skipped)' : ''}. Calls: ${calls1 + calls2}; bonuses: ${c - calls1 - calls2}. c = ${c}.`);
    } }],
    [U[3]]: [{ id: 'cp-func', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const A = R.int(1, 9), B = R.int(10, 90), P = R.int(1, 9), Q = R.int(1, 9), kinds = R.pick([[0, 1], [1, 0], [1, 1]]);
        const sim = ks => { const vars = { a: P, b: Q }; for (const args of [['a', 'b'], ['b', 'a']]) { const loc = args.map(n => vars[n]); const add = [A, B]; for (let i = 0; i < 2; i++) { if (ks[i]) vars[args[i]] += add[i]; else loc[i] += add[i]; } } return `${vars.a} ${vars.b}`; };
        const ty = ks => ks.map((r, i) => `int${r ? '&' : ''} ${'xy'[i]}`).join(', ');
        return oq(`int a = ${P}, b = ${Q};\nf(a, b);\nf(b, a);\ncout << a << ' ' << b;`, `void f(${ty(kinds)}) {\n  x += ${A};\n  y += ${B};\n}`, sim(kinds),
          [sim([0, 0]), sim([1, 1]), sim([kinds[1], kinds[0]]), `${P + A} ${Q + B}`, `${P + B} ${Q + A}`],
          `Only reference parameters change the caller's variables. f(a, b) passes a to x and b to y; f(b, a) swaps the roles. Result: ${sim(kinds)}.`);
      }
      if (k === 1) {
        const form = R.int(0, 3);
        if (form === 0) { const n = R.int(3, 10), F = [1, 1]; for (let i = 2; i <= n; i++) F.push(F[i - 1] + F[i - 2]);
          return nq(`cout << f(${n});`, 'int f(int n) {\n  if (n <= 1) return 1;\n  return f(n - 1) + f(n - 2);\n}', F[n], `From the base cases f(0) = f(1) = 1 upward: ${F.join(', ')}.`); }
        if (form === 1) { const n = R.int(100, 99999), d = String(n).split('').map(Number);
          return nq(`cout << f(${n});`, 'int f(int n) {\n  if (n == 0) return 0;\n  return n % 10 + f(n / 10);\n}', d.reduce((a, b) => a + b, 0), `Each call peels off the last digit: ${d.join(' + ')}.`); }
        if (form === 2) { const n = R.int(2, 5000), ans = Math.floor(Math.log2(n));
          return nq(`cout << f(${n});`, 'int f(int n) {\n  if (n < 2) return 0;\n  return 1 + f(n / 2);\n}', ans, `f counts halvings until n < 2: floor(log2 ${n}) = ${ans}.`); }
        const n = R.int(3, 10), C = [1, 1]; for (let i = 2; i <= n; i++) C.push(1 + C[i - 1] + C[i - 2]);
        return nq(`f(${n});\ncout << calls;`, 'int calls = 0;\nint f(int n) {\n  calls++;\n  if (n <= 1) return n;\n  return f(n - 1) + f(n - 2);\n}', C[n],
          `Calls C(n) = 1 + C(n - 1) + C(n - 2) with C(0) = C(1) = 1: ${C.join(', ')}.`);
      }
      if (k === 2) {
        const A = [['3', 'i'], ['3.0', 'd'], ["'a'", 'i'], ['2.5f', 'd'], ['true', 'i'], ['7 / 2', 'i'], ['7 / 2.0', 'd'], ['1e2', 'd']], args = R.sample(A, 4);
        const right = args.map(a => a[1]).join(''), flip = i => right.split('').map((c, j) => j === i ? (c === 'i' ? 'd' : 'i') : c).join('');
        const calls = args.map(a => `g(${a[0]});`); const body = `${calls.slice(0, 2).join(' ')}\n${calls.slice(2).join(' ')}`;
        return oq(body, "void g(int) { cout << 'i'; }\nvoid g(double) { cout << 'd'; }", right, R.shuffle([0, 1, 2, 3]).map(flip),
          `${args.map(a => `${a[0]} -> ${a[1] === 'i' ? 'int' : 'double'}`).join('; ')}. Promotions (char, bool to int; float to double) beat conversions, and the type of the expression decides.`);
      }
      const B = R.int(1, 9), C = R.int(1, 9), args = R.pick([[R.int(1, 9)], [R.int(1, 9), R.int(1, 9)], [R.int(1, 9), R.int(1, 9), R.int(1, 9)]]);
      const full = [args[0], args[1] != null ? args[1] : B, args[2] != null ? args[2] : C];
      return nq(`cout << h(${args.join(', ')});`, `int h(int a, int b = ${B},\n      int c = ${C}) {\n  return 100 * a + 10 * b + c;\n}`, 100 * full[0] + 10 * full[1] + full[2],
        `Missing trailing arguments take their defaults, so the call is h(${full.join(', ')}).`);
    } }],
    [U[4]]: [{ id: 'cp-vec', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const A = R.int(3, 7), B = R.int(0, 9);
        return oq(`vector<int> a(${A}, ${B});\nvector<int> b{${A}, ${B}};\ncout << a.size() << ' ';\ncout << b.size();`, '', `${A} 2`, [`2 ${A}`, `${A} ${A}`, '2 2'],
          `Parentheses: ${A} copies of ${B}. Braces: the two elements ${A} and ${B}.`);
      }
      if (k === 1) {
        const v = R.vec(R.int(3, 5), 1, 9), m = R.int(2, 5), d = R.int(1, 5), order = R.int(0, 1), refMul = R.int(0, 1);
        const copyL = refMul ? `for (int x : v) x += ${d};` : `for (int x : v) x *= ${m};`, refL = refMul ? `for (int& x : v) x *= ${m};` : `for (int& x : v) x += ${d};`;
        const w = v.map(x => refMul ? x * m : x + d), s = w.reduce((a, b) => a + b, 0);
        return nq(`vector<int> v{${v.join(', ')}};\n${order ? copyL + '\n' + refL : refL + '\n' + copyL}\nint s = 0;\nfor (int x : v) s += x;\ncout << s;`, '', s,
          `The loop over int x changes copies and has no effect. The loop over int& ${refMul ? `multiplies each element by ${m}` : `adds ${d} to each element`}: ${w.join(' + ')} = ${s}.`);
      }
      if (k === 2) {
        let v = R.vec(3, 1, 9); const init = v.slice(), ops = [], alt = { erase: v.slice(), insert: v.slice() };
        for (let t = 0; t < 3; t++) {
          const o = R.int(0, 3), x = R.int(1, 9), i = R.int(0, Math.max(0, v.length - 2));
          if (o === 0) { ops.push(`v.push_back(${x});`); v.push(x); alt.erase.push(x); alt.insert.push(x); }
          else if (o === 1 && v.length > 1) { ops.push('v.pop_back();'); v.pop(); alt.erase.pop(); alt.insert.pop(); }
          else if (o === 2 && v.length > 1) { ops.push(`v.erase(v.begin() + ${i});`); v.splice(i, 1); alt.erase.splice(Math.min(i + 1, alt.erase.length - 1), 1); alt.insert.splice(i, 1); }
          else { ops.push(`v.insert(v.begin() + ${i}, ${x});`); v.splice(i, 0, x); alt.erase.splice(i, 0, x); alt.insert.splice(i + 1, 0, x); }
        }
        const right = v.join(' ');
        return oq(`vector<int> v{${init.join(', ')}};\n${ops.join('\n')}\nfor (int x : v)\n  cout << x << ' ';`, '', right, [alt.erase.join(' '), alt.insert.join(' '), init.join(' '), v.slice().reverse().join(' '), v.slice(0, -1).concat([v[v.length - 1] % 9 + 1]).join(' '), v.slice(1).join(' ')],
          `Applying the operations in order to ${init.join(' ')}: insert(begin() + i, x) puts x at index i, and erase(begin() + i) removes index i. Result: ${right}.`);
      }
      const N = R.int(4, 8), x = R.int(1, 9), y = R.int(1, 9);
      return nq(`int a[${N}] = {${x}, ${y}};\nint s = size(a);\nfor (int e : a) s += e;\ncout << s;`, '', N + x + y, `size(a) is ${N}, and the elements without initializers are 0, so the sum is ${N} + ${x} + ${y}.`);
    } }],
    [U[5]]: [{ id: 'cp-str', make(R) {
      const W = ['market', 'option', 'futures', 'spread', 'hedging', 'notional', 'volatile', 'template', 'pointer', 'compiler', 'arbitrage', 'settlement'];
      const k = R.int(0, 4), w = R.pick(W);
      if (k === 0) {
        const pos = R.int(1, w.length - 3), len = R.int(2, w.length - pos + 1), right = w.substr(pos, len);
        return oq(`string s = "${w}";\ncout << s.substr(${pos}, ${len});`, '', right, [w.substring(pos, len), w.substr(pos, len - 1), w.substr(pos + 1, len), w.substr(pos - 1, len), w.substr(pos, len + 1)].filter(Boolean),
          `Start at index ${pos} ('${w[pos]}') and take up to ${len} chars${pos + len > w.length ? '; the string ends first' : ''}: ${right}. The second argument is a length.`);
      }
      if (k === 1) {
        const chars = [...new Set(w)], ch = R.pick(chars), last = R.int(0, 1), ans = last ? w.lastIndexOf(ch) : w.indexOf(ch);
        return nq(`string s = "${w}";\ncout << s.${last ? 'rfind' : 'find'}('${ch}');`, '', ans, `Indexing from 0, the ${last ? 'last' : 'first'} '${ch}' in ${w} is at ${ans}.`);
      }
      if (k === 2) {
        const d = R.vec(R.int(3, 6), 0, 9), raw = R.int(0, 1), ds = d.reduce((a, b) => a + b, 0), ans = raw ? ds + 48 * d.length : ds;
        return nq(`string s = "${d.join('')}";\nint t = 0;\nfor (char c : s) t += ${raw ? 'c' : "c - '0'"};\ncout << t;`, '', ans,
          raw ? `Without subtracting '0', each digit char counts as its code, 48 more than the digit: ${ds} + 48 · ${d.length} = ${ans}.` : `c - '0' turns each digit char into its value: ${d.join(' + ')} = ${ds}.`);
      }
      if (k === 3) {
        let [a, b] = R.pick([['Zoo', 'apple'], ['apple', 'apples'], ['bid', 'ask'], ['Ask', 'ask'], ['abc', 'abd'], ['b', 'abc'], ['10', '9'], ['100', '99'], ['Bond', 'bond'], ['swap', 'swaps']]);
        if (R.int(0, 1)) [a, b] = [b, a];
        const lt = a < b ? 1 : 0;
        return nq(`string a = "${a}";\nstring b = "${b}";\ncout << (a < b);`, '', lt, `Lexicographic by char code: ${a < b ? `"${a}" comes first` : `"${a}" does not come before "${b}"`}. ${b.startsWith(a) || a.startsWith(b) ? 'A proper prefix comes first.' : 'Uppercase codes (65 to 90) are below lowercase (97 to 122), and digits compare as chars.'}`);
      }
      const p = R.pick(['ab', 'xyz', 'q', 'bid']), s2 = R.pick(['c', 'ask', '!!']);
      return nq(`string s = "${p}";\ns += s;\ns = s + "${s2}";\ncout << s.size();`, '', 2 * p.length + s2.length, `s becomes "${p + p}", then "${p + p + s2}", which has ${2 * p.length + s2.length} chars.`);
    } }],
    [U[6]]: [{ id: 'cp-ptr', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const a = R.vec(5, 1, 50), i = R.int(1, 3), forms = [];
        for (let j = -i; j <= 4 - i; j++) { if (j === 0) forms.push(['*p', a[i]]); else { forms.push([`p[${j}]`, a[i + j]]); if (j > 0) forms.push([`*(p + ${j})`, a[i + j]]); else forms.push([`*(p - ${-j})`, a[i + j]]); } }
        const [f1, f2] = R.sample(forms, 2);
        return nq(`int a[] = {${a.join(', ')}};\nint* p = a + ${i};\ncout << ${f1[0]} + ${f2[0]};`, '', f1[1] + f2[1], `p points to a[${i}] = ${a[i]}. ${f1[0]} is ${f1[1]} and ${f2[0]} is ${f2[1]}, counting elements from p.`);
      }
      if (k === 1) {
        const x = R.int(1, 9), y = R.int(1, 9), A = R.int(2, 9), M = R.int(2, 4);
        return oq(`int x = ${x}, y = ${y};\nint* p = &x;\n*p += ${A};\np = &y;\n*p *= ${M};\ncout << x << ' ' << y;`, '', `${x + A} ${y * M}`, [`${(x + A) * M} ${y}`, `${x} ${y * M}`, `${x + A} ${y}`, `${(x + A) * M} ${y * M}`],
          `*p += ${A} changes x to ${x + A}. Then p is reseated to y, which becomes ${y * M}.`);
      }
      if (k === 2) {
        const x = R.int(1, 9), y = R.int(1, 9), C = R.int(10, 40), re = R.int(0, 1);
        const right = re ? `${x} ${y + C}` : `${x + C} ${y}`;
        return oq(`int x = ${x}, y = ${y};\nint* p = &x;\nint** q = &p;\n${re ? '*q = &y;\n' : ''}**q += ${C};\ncout << x << ' ' << y;`, '', right, [re ? `${x + C} ${y}` : `${x} ${y + C}`, `${x} ${y}`, `${x + C} ${y + C}`],
          re ? `*q is p itself, so *q = &y makes p point to y. Then **q is y: ${y} + ${C}.` : `**q is what p points to, x: ${x} + ${C}.`);
      }
      const i = R.int(0, 9), j = R.int(0, 9); if (i === j) return this.make(R);
      return nq(`int a[10];\nint* p = &a[${i}];\nint* q = &a[${j}];\ncout << q - p;`, '', j - i, `Pointer subtraction counts elements, with sign: ${j} - ${i}.`);
    } }],
    [U[7]]: [{ id: 'cp-class', make(R) {
      const k = R.int(0, 2);
      if (k === 0) {
        // Random block structure; letters in order of construction.
        let L = 0; const next = () => String.fromCharCode(97 + L++);
        const tree = [next()], inner = [next()]; if (R.int(0, 1)) inner.push(next()); tree.push(inner); if (R.int(0, 1)) tree.push(next());
        if (R.int(0, 1)) { const in2 = [next()]; if (R.int(0, 1)) in2.push(next()); tree.push(in2); }
        if (L < 6 && R.int(0, 1)) tree.push(next());
        const lines = []; const show = (nodes, ind) => { for (const n of nodes) { if (Array.isArray(n)) { lines.push(ind + '{'); show(n, ind + '  '); lines.push(ind + '}'); } else lines.push(`${ind}T ${n}('${n}');`); } };
        show(tree, '');
        const all = []; (function walk(ns) { for (const n of ns) Array.isArray(n) ? walk(n) : all.push(n); })(tree);
        const run = mode => { let out = ''; const up = xs => xs.map(c => c.toUpperCase()).join('');
          const blk = (nodes, top) => { const made = []; for (const n of nodes) { if (Array.isArray(n)) blk(n, false); else { out += n; made.push(n); } }
            if (mode === 'defer') { if (top) out += up(all.slice().reverse()); return; }
            if (top && mode === 'nomain') return;
            out += up(mode === 'fifo' || (top && mode === 'topfifo') ? made : made.slice().reverse()); };
          blk(tree, true); return out; };
        const right = run('lifo');
        return oq(lines.join('\n'), TR, right, [run('fifo'), run('defer'), run('nomain'), run('topfifo'), right.toLowerCase()],
          `Each object prints its letter when constructed. At the end of each block its objects die in reverse order of construction, and the locals of main die last, also in reverse. Output: ${right}.`);
      }
      if (k === 1) {
        const top = R.int(1, 3), arr = R.int(2, 5), arr2 = R.int(0, 3), heap = R.int(0, 1);
        const names = ['a', 'b', 'c'].slice(0, top);
        const body = `C ${names.join(', ')};\n{\n  C t[${arr}];\n}\n${arr2 ? `C u[${arr2}];\n` : ''}${heap ? 'C* p = new C;\n' : ''}cout << C::n;${heap ? '\ndelete p;' : ''}`;
        const ans = top + arr2 + heap;
        return nq(body, 'struct C {\n  static int n;\n  C() { n++; }\n  ~C() { n--; }\n};\nint C::n = 0;', ans,
          `n counts live objects. ${top} named, ${arr2 ? `${arr2} in u, ` : ''}${heap ? '1 on the heap, ' : ''}and the ${arr} in the block are already destroyed: ${ans}.`);
      }
      const A = R.int(1, 9), B = R.int(1, 9), X = R.int(1, 9), Y = R.int(1, 9), Z = R.int(1, 9);
      const obj = { s: { a: A, b: B }, t: { a: X, b: B }, u: { a: Y, b: Z } }, picks = R.sample([['s', 'a'], ['s', 'b'], ['t', 'a'], ['t', 'b'], ['u', 'a'], ['u', 'b']], 3);
      const ans = Number(picks.map(([o, m]) => obj[o][m]).join(''));
      return nq(`S s, t(${X}), u(${Y}, ${Z});\ncout << ${picks.map(([o, m]) => `${o}.${m}`).join(' << ')};`,
        `struct S {\n  int a = ${A}, b = ${B};\n  S() {}\n  S(int x) : a(x) {}\n  S(int x, int y)\n    : a(x), b(y) {}\n};`, ans,
        `s uses both defaults (${A}, ${B}); t sets a = ${X} and keeps b = ${B}; u sets both (${Y}, ${Z}). The three values print side by side: ${ans}.`);
    } }],
    [U[8]]: [{ id: 'cp-virt', make(R) {
      const k = R.int(0, 1);
      if (k === 0) {
        const E = [['r.f()', 2, 1, 2], ['r.g()', 1, 1, 2], ['p->f()', 2, 1, 2], ['p->g()', 1, 1, 2], ['s.f()', 1, 1, 2], ['s.g()', 1, 1, 2], ['d.f()', 2, 2, 2], ['d.g()', 2, 2, 2]];
        const es = R.sample(E, 4), right = es.map(e => e[1]).join(''), stat = es.map(e => e[2]).join(''), dyn = es.map(e => e[3]).join('');
        const noslice = es.map(e => e[0].startsWith('s.f') ? 2 : e[1]).join('');
        return oq(`D d;\nB& r = d;\nB* p = &d;\nB s = d;\ncout << ${es[0][0]} << ${es[1][0]};\ncout << ${es[2][0]} << ${es[3][0]};`,
          'struct B {\n  virtual int f() { return 1; }\n  int g() { return 1; }\n};\nstruct D : B {\n  int f() override { return 2; }\n  int g() { return 2; }\n};', right, [stat, dyn, noslice, right.split('').reverse().join('')],
          `f is virtual, so through r or p it runs D::f; g is not, so through r or p it runs B::g. s is a sliced copy, a real B, so both return 1. Called on d directly, both return 2. Output: ${right}.`);
      }
      const ct = (t, mf, rc) => { const r = t === 'A' ? 'A' : t === 'B' ? 'AB' : mf ? 'ABAC' : 'AABC'; return rc ? r.split('').reverse().join('') : r; }, dt = (t, so) => t === 'A' ? 'a' : t === 'B' ? (so ? 'ab' : 'ba') : (so ? 'aabc' : 'cbaa');
      let X = R.pick(['A', 'B', 'C']), Y = R.pick(['B', 'C']); if (R.int(0, 1)) [X, Y] = [Y, X];
      const s = (mf, so, rc) => `${ct(X, mf, rc)}${dt(X, so)}|${ct(Y, mf, rc)}${dt(Y, so)}`;
      return oq(`{ ${X} x; }\ncout << '|';\n{ ${Y} y; }`, "struct A {\n  A() { cout << 'A'; }\n  ~A() { cout << 'a'; }\n};\nstruct B : A {\n  B() { cout << 'B'; }\n  ~B() { cout << 'b'; }\n};\nstruct C : A {\n  B m;\n  C() { cout << 'C'; }\n  ~C() { cout << 'c'; }\n};",
        s(false, false), [s(false, true), s(true, false), s(true, true), s(false, false, true), s(false, true, true)],
        `Construction: base, then members in order, then the body (C is A, then m as A and B, then C). Destruction reverses this exactly. Output: ${s(false, false)}.`);
    } }],
    [U[9]]: [{ id: 'cp-scope', make(R) {
      const k = R.int(0, 2);
      if (k === 0) {
        const A = R.int(0, 9), B = R.int(1, 9), pre = R.int(0, 3); let n = A; const nx = () => (n += B);
        for (let i = 0; i < pre; i++) nx(); const x = nx(), y = nx();
        return nq(`${'next();\n'.repeat(pre)}int x = next();\ncout << x + next();`, `int next() {\n  static int n = ${A};\n  n += ${B};\n  return n;\n}`, x + y,
          `n starts at ${A} once and grows by ${B} per call. x = ${x}, and the next call returns ${y}: ${x + y}.`);
      }
      if (k === 1) {
        const loop = R.int(0, 1), decl = R.int(0, 1);
        if (loop) { const A = R.int(10, 50), m = R.int(2, 9);
          return nq(`int i = ${A};\nfor (${decl ? 'int ' : ''}i = 0; i < ${m}; i++) {}\ncout << i;`, '', decl ? A : m, decl ? `The loop declares its own i, which shadows the outer one and ends with the loop. The outer i is still ${A}.` : `No declaration: the loop uses the outer i and leaves it at ${m}.`); }
        const A = R.int(1, 9), B = R.int(10, 30), C = R.int(1, 9), D = R.int(1, 9);
        return nq(`int x = ${A};\n{\n  ${decl ? 'int ' : ''}x = ${B};\n  x += ${C};\n}\nx += ${D};\ncout << x;`, '', decl ? A + D : B + C + D,
          decl ? `The block declares a new x; the outer x stays ${A} and then gains ${D}.` : `No declaration in the block, so it changes the outer x: ${B} + ${C} + ${D}.`);
      }
      const n = R.int(2, 6), m = R.int(2, 9);
      return nq(`${'f();\n'.repeat(n - 1)}cout << f();`, `int f() {\n  int a = 0;\n  static int s = 0;\n  a++;\n  s += ${m};\n  return a * 100 + s;\n}`, 100 + n * m,
        `a is automatic and is 1 on every call; s is static and reaches ${n} · ${m} = ${n * m} on call ${n}.`);
    } }],
    [U[10]]: [{ id: 'cp-conv', make(R) {
      const k = R.int(0, 4);
      if (k === 0) {
        const B = R.pick([2, 4, 5, 8]), A = R.int(B + 1, 60); if (A % B === 0) return this.make(R);
        const d = Math.trunc(A / B), e = g6(A / B);
        return oq(`int a = ${A}, b = ${B};\ndouble d = a / b;\ndouble e = double(a) / b;\ncout << d << ' ' << e;`, '', `${d} ${e}`, [`${e} ${e}`, `${d} ${d}`, `${d}.0 ${e}`],
          `a / b divides ints, giving ${d}, before the conversion to double; cout prints ${d}.0 as ${d}. double(a) / b divides doubles: ${e}.`);
      }
      if (k === 1) {
        const X = R.int(11, 99) / 10; if (Number.isInteger(X)) return this.make(R);
        const t = Math.trunc(X), right = `${t} ${-t}`;
        return oq(`double x = ${X};\ncout << int(x) << ' ';\ncout << int(-x);`, '', right, [`${t} ${-t - 1}`, `${Math.round(X)} ${-Math.round(X)}`, `${t + 1} ${-t - 1}`, `${t + 1} ${-t}`],
          `Conversion to int truncates toward zero in both directions: ${t} and ${-t}.`);
      }
      if (k === 2) {
        const N = R.pick(['-3', '0', '5', '0.5', '-0.25', '2']), add = R.int(1, 5), b = Number(N) !== 0;
        return nq(`bool b = ${N};\nint i = b + ${add};\ncout << i;`, '', +b + add, `${N} is ${b ? 'nonzero, so b is true, which converts to 1' : 'zero, so b is false, which converts to 0'}. i = ${+b + add}.`);
      }
      if (k === 3) {
        const V = R.pick([R.int(256, 1000), -R.int(1, 100)]), ans = ((V % 256) + 256) % 256;
        return nq(`int x = ${V};\nunsigned char c = x;\ncout << int(c);`, '', ans, `unsigned char holds 0 to 255, and the value is reduced modulo 256: ${V} becomes ${ans}.`);
      }
      const a = R.int(5, 30), b = R.int(2, 7), c = R.int(2, 9); if (a % b === 0) return this.make(R);
      const ans = Math.trunc(a / b) * c;
      return nq(`cout << ${a} / ${b} * ${c}.0;`, '', ans, `Left to right: ${a} / ${b} is integer division, ${Math.trunc(a / b)}; only then does ${c}.0 make it a double. ${ans}.`);
    } }],
    [U[11]]: [{ id: 'cp-ub', make(R) {
      const UBS = 'Undefined behavior', NC = 'Does not compile', OOR = 'Throws std::out_of_range';
      const n = R.int(3, 6), v = R.int(2, 9), twin = R.int(0, 1), k = R.int(0, 6);
      let body, right, wrong, x;
      if (k === 0) { const a = R.int(1, 5);
        if (twin) { body = `int x = INT_MAX;\nx += ${a};\ncout << x;`; right = UBS; wrong = [String(-2147483648 + a - 1), String(2147483647 + a), NC]; x = 'Signed overflow is undefined behavior, even though the hardware would wrap.'; }
        else { body = `unsigned x = UINT_MAX;\nx += ${a};\ncout << x;`; right = String(a - 1); wrong = [UBS, String(4294967295 + a), NC]; x = `Unsigned arithmetic wraps modulo 2^32: UINT_MAX + ${a} is ${a - 1}.`; } }
      else if (k === 1) {
        if (twin) { body = `int a[${n}] = {};\ncout << a[${n}];`; right = UBS; wrong = ['0', String(n), NC]; x = `Valid indices are 0 to ${n - 1}; a[${n}] reads past the end.`; }
        else { body = `int a[${n}] = {};\ncout << a[${n - 1}];`; right = '0'; wrong = [UBS, String(n - 1), NC]; x = `Index ${n - 1} is the last element, and = {} zeroed it.`; } }
      else if (k === 2) {
        if (twin) { body = `vector<int> v(${n});\ncout << v[${n}];`; right = UBS; wrong = [OOR, '0', NC]; x = 'operator[] does no bounds check, so reading past the end is undefined.'; }
        else { body = `vector<int> v(${n});\ncout << v.at(${n});`; right = OOR; wrong = [UBS, '0', NC]; x = 'at() checks the index and throws std::out_of_range; uncaught, it ends the program, but the behavior is defined.'; } }
      else if (k === 3) {
        if (twin) { body = `int* p = new int(${v});\ndelete p;\ncout << *p;`; right = UBS; wrong = [String(v), '0', NC]; x = 'After delete, the memory no longer holds an int; reading it is use after free.'; }
        else { body = `int* p = new int(${v});\ncout << *p;\ndelete p;`; right = String(v); wrong = [UBS, '0', NC]; x = 'The read happens before the delete.'; } }
      else if (k === 4) { const a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9);
        if (twin) { body = `vector<int> v{${a}, ${b}, ${c}};\nint& r = v[0];\nv.push_back(${v});\ncout << r;`; right = UBS; wrong = [String(a), String(v), NC]; x = 'The brace list gives capacity 3, so push_back reallocates and r refers to freed memory.'; }
        else { body = `vector<int> v{${a}, ${b}, ${c}};\nv.reserve(8);\nint& r = v[0];\nv.push_back(${v});\ncout << r;`; right = String(a); wrong = [UBS, String(v), NC]; x = 'After reserve(8), pushing a fourth element does not reallocate, so r stays valid.'; } }
      else if (k === 5) { const j = R.int(0, 4);
        if (twin) { body = `int s = ${32 + j};\ncout << (1 << s);`; right = UBS; wrong = [String(2 ** j), '0', NC]; x = 'Shifting a 32-bit int by 32 or more is undefined. (x86 happens to mask the count, which is where the tempting answer comes from.)'; }
        else { body = `unsigned s = 31;\ncout << (1u << s);`; right = '2147483648'; wrong = [UBS, '-2147483648', NC]; x = 'For unsigned, shifts below the width are defined: 2^31.'; } }
      else { body = `int z = 0;\ncout << ${v * 10} / z;`; right = UBS; wrong = ['0', 'inf', NC]; x = 'Integer division by zero is undefined; there is no integer infinity.'; }
      return Object.assign(oq(body, '', right, wrong, x), { q: 'What happens when this runs?' });
    } }]
  } });
})();
