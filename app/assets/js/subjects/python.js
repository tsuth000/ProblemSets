registerSubject({
  id: 'python', name: 'Python coding', color: '#2D5A9A', plain: true,
  blurb: 'Semantics, data structures, functions, idioms, NumPy',
  questions: [
    { id: 'p1', skill: 'Mutability', q: 'What does this print?', code: `a = [1, 2, 3]
b = a
b.append(4)
print(a)`, c: ['[1, 2, 3, 4]', '[1, 2, 3]', '[4]', 'An error'],
      x: 'b = a binds a second name to the same list, so the append is visible through a.' },
    { id: 'p2', skill: 'Functions', q: 'What does this print?', code: `def add(x, lst=[]):
    lst.append(x)
    return lst

add(1)
print(add(2))`, c: ['[1, 2]', '[2]', '[1]', 'An error'],
      x: 'The default list is created once when the function is defined and persists between calls. Use lst=None and create a new list inside.' },
    { id: 'p3', skill: 'Arithmetic', q: 'What does this print?', code: `print(7 // 2, -7 // 2)`, c: ['3 -4', '3 -3', '3.5 -3.5', '4 -4'],
      x: '// floors toward negative infinity: floor(-3.5) = -4.' },
    { id: 'p4', skill: 'Arithmetic', q: 'What does this print?', code: `print(-7 % 3)`, c: ['2', '-1', '1', '-2'],
      x: 'The result takes the sign of the divisor: -7 = (-3)(3) + 2.' },
    { id: 'p5', skill: 'Comprehensions', q: 'What does this print?', code: `print([x**2 for x in range(5) if x % 2 == 0])`,
      c: ['[0, 4, 16]', '[4, 16]', '[0, 1, 4, 9, 16]', '[1, 9]'],
      x: 'range(5) is 0..4; the even values 0, 2, 4 are squared.' },
    { id: 'p6', skill: 'Functions', q: 'What does this print?', code: `fs = [lambda: i for i in range(3)]
print([f() for f in fs])`, c: ['[2, 2, 2]', '[0, 1, 2]', '[0, 0, 0]', 'An error'],
      x: 'Each lambda looks up i when called, after the loop has finished with i = 2. Bind early with lambda i=i: i.' },
    { id: 'p7', skill: 'Slicing', q: 'What does this print?', code: `s = "python"
print(s[::-1][1:4])`, c: ['oht', 'yth', 'noh', 'hty'],
      x: 's[::-1] is "nohtyp"; indices 1, 2, 3 give "oht".' },
    { id: 'p8', skill: 'Arithmetic', q: 'What does this print?', code: `print(0.1 + 0.2 == 0.3)`, c: ['False', 'True', 'An error', 'None'],
      x: '0.1 + 0.2 is 0.30000000000000004 in binary floating point. Compare with math.isclose.' },
    { id: 'p9', skill: 'Idioms', q: 'What does this print?', code: `d = {"a": 1}
print(d.get("b", 0) + d["a"])`, c: ['1', 'KeyError', '0', 'None'],
      x: 'get returns the default 0 for a missing key instead of raising; d["a"] is 1.' },
    { id: 'p10', skill: 'Copies', q: 'What does this print?', code: `import copy
a = [[1, 2], [3]]
b = copy.copy(a)
b[0].append(9)
print(a)`, c: ['[[1, 2, 9], [3]]', '[[1, 2], [3]]', '[[1, 2], [3], 9]', 'An error'],
      x: 'A shallow copy makes a new outer list whose elements are the same inner lists. deepcopy would isolate them.' },
    { id: 'p11', skill: 'Mutability', q: 'What happens?', code: `t = (1, 2)
t[0] = 5`, c: ['TypeError', 't becomes (5, 2)', 't becomes [5, 2]', 'Nothing; the assignment is ignored'],
      x: 'Tuples are immutable and do not support item assignment.' },
    { id: 'p12', skill: 'Idioms', q: 'What does this print?', code: `print(sorted(["bb", "a", "ccc"], key=len, reverse=True))`,
      c: ["['ccc', 'bb', 'a']", "['a', 'bb', 'ccc']", "['bb', 'a', 'ccc']", "['ccc', 'a', 'bb']"],
      x: 'key=len sorts by length; reverse=True puts the longest first.' },
    { id: 'p13', skill: 'Idioms', q: 'What does this print?', code: `print(list(zip([1, 2, 3], "ab")))`,
      c: ["[(1, 'a'), (2, 'b')]", "[(1, 'a'), (2, 'b'), (3, None)]", 'An error', "[(1, 2, 3), ('a', 'b')]"],
      x: 'zip stops at the shortest input. itertools.zip_longest pads instead.' },
    { id: 'p14', skill: 'Comprehensions', q: 'What does this print?', code: `g = (x for x in range(3))
print(sum(g), sum(g))`, c: ['3 0', '3 3', '0 3', 'An error'],
      x: 'A generator is exhausted after one pass. The second sum sees no items.' },
    { id: 'p15', skill: 'Functions', q: 'What does this print?', code: `def f():
    try:
        return "try"
    finally:
        print("finally", end=" ")

print(f())`, c: ['finally try', 'try finally', 'try', 'finally'],
      x: 'The finally block runs before the function actually returns, so its print happens before the caller prints the return value.' },
    { id: 'p16', skill: 'Functions', q: 'What happens?', code: `x = 10
def f():
    x += 1
    return x

print(f())`, c: ['UnboundLocalError', '11', '10', 'NameError'],
      x: 'The assignment makes x local to f, so x += 1 reads a local that has no value yet. Declare global x (or better, pass it in).' },
    { id: 'p17', skill: 'Functions', q: 'What does this print?', code: `def f(a, *args, **kw):
    return len(args), len(kw)

print(f(1, 2, 3, x=4))`, c: ['(2, 1)', '(3, 1)', '(2, 0)', '(4, 0)'],
      x: 'a takes 1, args collects (2, 3), kw collects {"x": 4}.' },
    { id: 'p18', skill: 'Slicing', q: 'What does this print?', code: `a = [1, 2, 3]
a[1:2] = [7, 8, 9]
print(a)`, c: ['[1, 7, 8, 9, 3]', '[1, [7, 8, 9], 3]', '[1, 7, 3]', 'An error'],
      x: 'Slice assignment replaces the one-element slice [2] with three elements, growing the list.' },
    { id: 'p19', skill: 'Mutability', q: 'What does this print?', code: `a = [1]
b = [1]
print(a == b, a is b)`, c: ['True False', 'True True', 'False False', 'False True'],
      x: 'Equal contents, two distinct list objects.' },
    { id: 'p20', skill: 'Idioms', q: 'What does this print?', code: `print("-".join(str(i) for i in range(3)))`, c: ['0-1-2', '1-2-3', '-0-1-2', '0-1-2-'],
      x: 'join places the separator between items only.' },
    { id: 'p21', skill: 'Complexity', q: 'For a large collection, which gives the fastest membership test with in?', c: ['set', 'list', 'tuple', 'str of joined items'],
      x: 'Sets are hash tables with O(1) average lookup; lists and tuples scan in O(n).' },
    { id: 'p22', skill: 'NumPy', q: 'What is the shape of the result?', code: `import numpy as np
(np.ones((3, 1)) + np.ones((1, 4))).shape`, c: ['(3, 4)', '(3, 1)', '(1, 4)', 'ValueError'],
      x: 'Broadcasting stretches each size-1 dimension to match: 3 with 1 gives 3, 1 with 4 gives 4.' },
    { id: 'p23', skill: 'NumPy', q: 'What happens?', code: `import numpy as np
np.ones((2, 3)) + np.ones((3, 2))`, c: ['ValueError: shapes cannot be broadcast', 'A (3, 3) array', 'A (2, 3) array', 'A (2, 2) array'],
      x: 'Comparing from the right: 3 vs 2 are unequal and neither is 1.' },
    { id: 'p24', skill: 'Arithmetic', q: 'What does this print?', code: `print(True + True, type(3 / 1))`, c: ["2 <class 'float'>", "True <class 'int'>", "2 <class 'int'>", 'An error'],
      x: 'bool is a subclass of int, and / always returns a float.' }
  ],
  generators: [
    { id: 'pg-slice', skill: 'Slicing', make(R) {
      const a = R.sample([3, 5, 7, 8, 11, 12, 14, 19, 21, 26, 30], 7), n = a.length;
      const kind = R.int(0, 2); let expr, res, wrong;
      const sl = (s, e, st) => { const o = []; if (st > 0) { for (let i = s; i < e; i += st) o.push(a[i]); } else { for (let i = s; i > e; i += st) o.push(a[i]); } return o; };
      if (kind === 0) { const s = R.int(1, 3), e = R.int(s + 2, n - 1); expr = `a[${s}:${e}]`; res = sl(s, e, 1); wrong = [sl(s, e + 1, 1), sl(s - 1, e, 1), sl(s + 1, e + 1, 1)]; }
      else if (kind === 1) { const k = R.int(2, 4); expr = `a[-${k}:]`; res = sl(n - k, n, 1); wrong = [sl(n - k - 1, n, 1), sl(n - k + 1, n, 1), sl(0, k, 1)]; }
      else { const st = R.int(2, 3); expr = `a[::${st}]`; res = sl(0, n, st); wrong = [sl(1, n, st), sl(0, n, st + 1), sl(0, n, st).slice(0, -1)]; }
      const f = x => `[${x.join(', ')}]`, choices = [f(res)];
      for (const w of wrong) { const s = f(w); if (!choices.includes(s)) choices.push(s); }
      return { q: 'What does this print?', code: `a = ${f(a)}\nprint(${expr})`, c: choices,
        x: `Slices include start and exclude stop. ${expr} evaluates to ${f(res)}.` };
    } },
    { id: 'pg-floordiv', skill: 'Arithmetic', make(R) {
      const a = R.nz(-40, 40), b = R.pick([-7, -5, -4, -3, 3, 4, 5, 6, 7]), useMod = R.int(0, 1) === 1;
      const fl = Math.floor(a / b), md = a - b * fl;
      return { q: 'What does this print?', code: `print(${a} ${useMod ? '%' : '//'} ${b})`, answer: useMod ? md : fl,
        x: `${a} / ${b} = ${R.fmt(a / b, 3)}, and // floors to ${fl}. Then ${a} % ${b} = ${a} - (${b})(${fl}) = ${md}, which ${md === 0 ? 'is zero' : 'has the sign of the divisor'}.` };
    } },
    { id: 'pg-range', skill: 'Comprehensions', make(R) {
      const s = R.int(0, 6), st = R.int(2, 5), e = s + R.int(8, 30), xs = []; for (let i = s; i < e; i += st) xs.push(i);
      const useLen = R.int(0, 1) === 1, v = useLen ? xs.length : xs.reduce((p, q) => p + q, 0);
      return { q: 'What does this print?', code: `print(${useLen ? 'len' : 'sum'}(range(${s}, ${e}, ${st})))`, answer: v,
        x: `range(${s}, ${e}, ${st}) yields ${xs.join(', ')}; stop is excluded. ${useLen ? 'That is ' + v + ' values.' : 'Their sum is ' + v + '.'}` };
    } },
    { id: 'pg-comp', skill: 'Comprehensions', make(R) {
      const n = R.int(6, 14), k = R.int(2, 4), xs = []; for (let i = 0; i < n; i++) if (i % k === 0) xs.push(i);
      const v = xs.reduce((p, q) => p + q * q, 0);
      return { q: 'What does this print?', code: `print(sum(x * x for x in range(${n}) if x % ${k} == 0))`, answer: v,
        x: `The multiples of ${k} below ${n} are ${xs.join(', ')}. Their squares sum to ${v}.` };
    } },
    { id: 'pg-while', skill: 'Control flow', make(R) {
      const N = R.int(5, 500), d = R.pick([2, 3]); let n = N, c = 0; const trace = [N];
      while (n > 1) { n = Math.floor(n / d); c++; trace.push(n); }
      return { q: 'What does this print?', code: `n, c = ${N}, 0\nwhile n > 1:\n    n //= ${d}\n    c += 1\nprint(c)`, answer: c,
        x: `n takes the values ${trace.join(' → ')}. The loop body ran ${c} times.` };
    } },
    { id: 'pg-dict', skill: 'Idioms', make(R) {
      const w = R.pick(['banana', 'mississippi', 'bookkeeper', 'parallel', 'committee', 'assessment']), ch = R.pick([...new Set(w)]);
      const cnt = [...w].filter(x => x === ch).length;
      return { q: 'What does this print?', code: `counts = {}\nfor ch in "${w}":\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts["${ch}"])`, answer: cnt,
        x: `The loop tallies each character. "${ch}" appears ${cnt} time${cnt === 1 ? '' : 's'} in "${w}". collections.Counter("${w}") does the same.` };
    } }
  ]
});
