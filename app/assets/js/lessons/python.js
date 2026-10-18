// Code is written as HTML: escape < and > by hand.
const PY = code => `<pre class="code">${code}</pre>`;
registerLessons('python', {
  'Names and objects': {
    hook: T`
<p>Think of objects as things and names as sticky labels. <code>b = a</code> does not copy anything; it puts a second label on the same thing. Change the thing through either label and both see the change.</p>
${fig('namesObjects', {}, 'a and b label one list; c labels a different list with equal contents.')}`,
    vary: [
      [T`What does this print?${PY('a = [1, 2]\nb = a\nb.append(3)\nprint(len(a))')}`, 3, T`One list, two names.`],
      [T`What does this print?${PY('a = [1, 2]\nb = a\nb = b + [3]\nprint(len(a))')}`, 2, T`<code>b + [3]</code> builds a new list and moves the label <code>b</code> to it.`],
      [T`What does this print?${PY('a = [1, 2]\nb = a\nb += [3]\nprint(len(a))')}`, 3, T`For lists, <code>+=</code> changes the object in place.`],
      [T`What does this print?${PY('x = 5\ny = x\ny += 1\nprint(x)')}`, 5, T`Integers cannot change; <code>+=</code> makes a new int and relabels <code>y</code>.`],
      [T`What does this print?${PY('a = [1]\nb = [1]\nprint(a == b, a is b)')}`, ['<code>True False</code>', '<code>True True</code>', '<code>False False</code>'], T`Equal contents, different objects.`]
    ]
  },
  'Built-in types': {
    hook: T`
<p>Python's core types split into two families. Immutable ones (numbers, strings, tuples) can never change; "modifying" them creates a new object. Mutable ones (lists, dicts, sets) change in place.</p>
<p>Only immutable values can serve as dict keys or set members, because their hash must never change.</p>`,
    vary: [
      [T`What does this print?${PY('print(len({1, 1, 2}))')}`, 2, T`Sets drop duplicates.`],
      [T`What is the type of <code>{}</code>?`, ['<code>dict</code>', '<code>set</code>', '<code>list</code>'], T`Empty braces make a dict; use <code>set()</code> for an empty set.`],
      [T`What does this print?${PY('print(len("hello"))')}`, 5, T`Characters in the string.`],
      [T`What does <code>(1, 2) + (3,)</code> give?`, ['<code>(1, 2, 3)</code>', '<code>(1, 2, (3,))</code>', 'an error'], T`Tuples concatenate into a new tuple. The comma makes <code>(3,)</code> a tuple.`]
    ]
  },
  'Numbers and arithmetic': {
    hook: T`
<p>Integers have unlimited size. Floats are binary approximations, so <code>0.1 + 0.2</code> is not exactly <code>0.3</code>.</p>
<p><code>//</code> is floor division: it rounds down, toward negative infinity, not toward zero. <code>%</code> gives the matching remainder, which takes the sign of the divisor.</p>`,
    vary: [
      [T`What is <code>7 // 2</code>?`, 3, T`3.5 rounded down.`],
      [T`What is <code>-7 // 2</code>?`, -4, T`\(-3.5\) rounded down is \(-4\), not \(-3\).`],
      [T`What is <code>7 % 3</code>?`, 1, T`\(7 = 2\cdot3 + 1\).`],
      [T`What is <code>-7 % 3</code>?`, 2, T`\(-7 = -3\cdot3 + 2\): the remainder matches the floor.`],
      [T`What does <code>0.1 + 0.2 == 0.3</code> give?`, ['<code>False</code>', '<code>True</code>'], T`Use <code>math.isclose</code> for floats.`]
    ]
  },
  'Strings and slicing': {
    hook: T`
<p>Index positions label the characters, starting at 0. Slice boundaries sit between characters, which is why <code>s[a:b]</code> has exactly <code>b - a</code> characters and why <code>s[:k] + s[k:]</code> rebuilds <code>s</code>.</p>
${fig('sliceIdx', {}, 'Move start and stop and read the slice.')}`,
    vary: [
      [T`<code>s = "PYTHON"</code>. What is <code>s[1:4]</code>?`, ['<code>"YTH"</code>', '<code>"YTHO"</code>', '<code>"PYT"</code>'], T`Characters 1, 2, 3; the stop index is excluded.`],
      [T`What is <code>s[:3]</code>?`, ['<code>"PYT"</code>', '<code>"PYTH"</code>', '<code>"HON"</code>'], T`An omitted start means 0.`],
      [T`What is <code>s[-2:]</code>?`, ['<code>"ON"</code>', '<code>"HO"</code>', '<code>"N"</code>'], T`Negative indices count from the end.`],
      [T`What is <code>s[::-1]</code>?`, ['<code>"NOHTYP"</code>', '<code>"PYTHON"</code>', 'an error'], T`A step of \(-1\) walks backward.`],
      [T`What is <code>len(s[1:4])</code>?`, 3, T`<code>4 - 1</code>.`]
    ]
  },
  'Lists, dicts, sets': {
    hook: T`
<p>Pick the container by the question you will ask most. A list answers "what is at position \(i\)?" A dict answers "what goes with this key?" A set answers "is this in here?", and answers it fast.</p>`,
    vary: [
      [T`What does this print?${PY('d = {"a": 1}\nd["b"] = 2\nprint(len(d))')}`, 2, T`Assigning to a new key adds it.`],
      [T`With the same <code>d</code>, what is <code>d.get("c", 0)</code>?`, 0, T`<code>get</code> returns the default instead of raising <code>KeyError</code>.`],
      [T`What is <code>len(set([1, 2, 2, 3]))</code>?`, 3, T`Duplicates collapse.`],
      [T`What is <code>[1, 2, 3][-1]</code>?`, 3, T`The last element.`],
      [T`What does this print?${PY('xs = [3, 1, 2]\nxs.sort()\nprint(xs[0])')}`, 1, T`<code>sort</code> reorders the list in place.`]
    ]
  },
  'Control flow': {
    hook: T`
<p><code>for</code> walks through items; <code>while</code> repeats until a condition fails. <code>range(a, b)</code> runs from <code>a</code> up to but not including <code>b</code>, matching slice boundaries. <code>break</code> leaves the loop at once.</p>`,
    vary: [
      [T`What is <code>sum(range(5))</code>?`, 10, T`\(0 + 1 + 2 + 3 + 4\).`],
      [T`What is <code>sum(range(1, 6))</code>?`, 15, T`Now 1 through 5.`],
      [T`What is <code>len(range(0, 10, 3))</code>?`, 4, T`0, 3, 6, 9.`],
      [T`What does this print?${PY('for i in range(10):\n    if i == 4:\n        break\nprint(i)')}`, 4, T`The loop variable keeps its last value.`],
      [T`What does this print?${PY('n, steps = 16, 0\nwhile n > 1:\n    n //= 2\n    steps += 1\nprint(steps)')}`, 4, T`Halving 16 to 1 takes \(\log_2 16\) steps.`]
    ]
  },
  'Comprehensions and generators': {
    hook: T`
<p>A comprehension builds a collection in one readable line: "the squares of the even numbers" becomes <code>[x*x for x in xs if x % 2 == 0]</code>. Round brackets make a generator instead, which produces values one at a time without storing them all.</p>`,
    vary: [
      [T`What is <code>len([x for x in range(10) if x % 2 == 0])</code>?`, 5, T`0, 2, 4, 6, 8.`],
      [T`What is <code>sum([x*x for x in range(4)])</code>?`, 14, T`\(0 + 1 + 4 + 9\).`],
      [T`What is <code>{x % 3 for x in range(10)}</code>?`, ['<code>{0, 1, 2}</code>', '<code>[0, 1, 2, 0, ...]</code>', '<code>{3}</code>'], T`Braces make a set, so repeats collapse.`],
      [T`What is <code>sum(x for x in range(4))</code>?`, 6, T`A generator feeds <code>sum</code> without building a list.`]
    ]
  },
  'Functions and arguments': {
    hook: T`
<p>A function packages a computation behind a name. Default values make arguments optional, and keyword arguments let callers name them in any order.</p>
<p>One classic trap: a default value is created once, when the function is defined. A mutable default such as <code>[]</code> is shared by every call.</p>`,
    vary: [
      [T`${PY('def f(a, b=2):\n    return a * b')}What is <code>f(3)</code>?`, 6, T`<code>b</code> takes its default.`],
      [T`Same <code>f</code>. What is <code>f(3, 4)</code>?`, 12, T`Passing <code>b</code> overrides the default.`],
      [T`Same <code>f</code>. What is <code>f(b=5, a=2)</code>?`, 10, T`Keywords can come in any order.`],
      [T`${PY('def g(*args):\n    return len(args)')}What is <code>g(1, 2, 3)</code>?`, 3, T`<code>*args</code> gathers positional arguments into a tuple.`],
      [T`What does this print?${PY('def h(x, acc=[]):\n    acc.append(x)\n    return len(acc)\nh(1)\nprint(h(2))')}`, 2, T`The default list persists between calls. Use <code>acc=None</code> instead.`]
    ]
  },
  'Scope and closures': {
    hook: T`
<p>When Python meets a name, it searches outward through nested scopes: local, then enclosing functions, then the module's globals, then built-ins.</p>
${fig('scopes', {}, 'LEGB: the first match wins.')}
<p>Assigning to a name inside a function makes it local unless you declare it <code>global</code> or <code>nonlocal</code>. A closure is an inner function that remembers variables from the scope where it was created.</p>`,
    vary: [
      [T`What does this print?${PY('x = 1\ndef f():\n    x = 2\nf()\nprint(x)')}`, 1, T`The assignment created a local <code>x</code>.`],
      [T`What does this print?${PY('x = 1\ndef f():\n    global x\n    x = 2\nf()\nprint(x)')}`, 2, T`<code>global</code> makes the assignment reach the module variable.`],
      [T`What does this print?${PY('def make():\n    n = 0\n    def inc():\n        nonlocal n\n        n += 1\n        return n\n    return inc\nc = make()\nc()\nprint(c())')}`, 2, T`The closure keeps <code>n</code> alive between calls.`],
      [T`What does this print?${PY('fs = [lambda: i for i in range(3)]\nprint(fs[0]())')}`, 2, T`Each lambda looks up <code>i</code> when called, after the loop finished with <code>i = 2</code>.`]
    ]
  },
  'Copying': {
    hook: T`
<p>A shallow copy makes a new outer container but reuses the objects inside it. A deep copy duplicates everything, all the way down.</p>
${fig('copies', {}, 'After <code>b = a.copy()</code>, a and b are different outer lists, but they share the same inner lists.')}`,
    vary: [
      [T`What does this print?${PY('a = [[1, 2], [3, 4]]\nb = a.copy()\nb[0].append(9)\nprint(len(a[0]))')}`, 3, T`The inner list is shared.`],
      [T`What does this print?${PY('a = [[1, 2], [3, 4]]\nb = a.copy()\nb.append([5])\nprint(len(a))')}`, 2, T`The outer lists are separate.`],
      [T`What does this print?${PY('import copy\na = [[1, 2], [3, 4]]\nc = copy.deepcopy(a)\nc[0].append(9)\nprint(len(a[0]))')}`, 2, T`A deep copy shares nothing.`],
      [T`What does this print?${PY('a = [0] * 3\na[0] = 7\nprint(sum(a))')}`, 7, T`Repeating immutable ints is safe; <code>[[0]] * 3</code> would repeat one shared list.`]
    ]
  },
  'Exceptions': {
    hook: T`
<p>An exception signals that something went wrong. <code>try</code> runs code, <code>except</code> handles specific errors, <code>else</code> runs only if nothing was raised, and <code>finally</code> always runs, which makes it the place for cleanup.</p>
<p>Catch the narrowest exception you can handle; a bare <code>except</code> also swallows bugs you wanted to see.</p>`,
    vary: [
      [T`What does <code>int("x")</code> raise?`, ['<code>ValueError</code>', '<code>TypeError</code>', '<code>KeyError</code>'], T`The type is right (a string); the value is not.`],
      [T`What does <code>[1][5]</code> raise?`, ['<code>IndexError</code>', '<code>KeyError</code>', '<code>ValueError</code>'], T`Position out of range.`],
      [T`What does <code>{}["k"]</code> raise?`, ['<code>KeyError</code>', '<code>IndexError</code>', 'nothing; it gives <code>None</code>'], T`Missing key. Use <code>.get</code> to avoid it.`],
      [T`How many lines does this print?${PY('try:\n    print("a")\nexcept ValueError:\n    print("b")\nelse:\n    print("c")\nfinally:\n    print("d")')}`, 3, T`a, then c (no error), then d.`]
    ]
  },
  'Classes': {
    hook: T`
<p>A class is a blueprint and each instance is one object built from it. Methods are functions that receive the instance as <code>self</code>. Attributes set on <code>self</code> belong to that one instance; attributes set on the class are shared by all of them.</p>`,
    vary: [
      [T`${PY('class C:\n    def __init__(self, n):\n        self.n = n\n    def double(self):\n        return 2 * self.n')}What is <code>C(4).double()</code>?`, 8, T`<code>self.n</code> is 4.`],
      [T`What does this print?${PY('class D:\n    count = 0\n    def __init__(self):\n        D.count += 1\nD(); D()\nprint(D.count)')}`, 2, T`A class attribute is shared by every instance.`],
      [T`What does this print?${PY('class A:\n    def f(self):\n        return 1\nclass B(A):\n    def f(self):\n        return 2\nprint(B().f())')}`, 2, T`The subclass method overrides the parent's.`],
      [T`Same classes. What does <code>A().f() + B().f()</code> give?`, 3, T`Each instance uses its own class's method.`]
    ]
  },
  'Time complexity': {
    hook: T`
<p>Complexity describes how running time grows with input size. It matters more than raw speed: an \(O(n^2)\) loop over a million items is a trillion steps, while an \(O(n\log n)\) sort is about twenty million.</p>
${fig('growth', {}, 'Doubling n: linear doubles, quadratic quadruples, exponential explodes.')}`,
    vary: [
      [T`<code>x in my_list</code> takes time:`, [T`\(O(n)\)`, T`\(O(1)\)`, T`\(O(\log n)\)`], T`It may scan every element.`],
      [T`<code>x in my_set</code> takes time, on average:`, [T`\(O(1)\)`, T`\(O(n)\)`, T`\(O(\log n)\)`], T`Hashing jumps straight to the bucket.`],
      [T`Two nested loops, each over \(n\) items:`, [T`\(O(n^2)\)`, T`\(O(2n)\)`, T`\(O(n)\)`], T`\(n\) passes of \(n\) steps.`],
      [T`About how many comparisons does binary search need for one million sorted items?`, 20, T`Each step halves the range: \(\log_2 10^6 \approx 20\).`]
    ]
  },
  'NumPy essentials': {
    hook: T`
<p>NumPy arrays run whole-array operations in compiled code, so you write math, not loops. Broadcasting lets arrays of different shapes combine: any axis of size 1 stretches to match the other array.</p>
${fig('broadcast', {}, 'A column plus a row gives a full table.')}`,
    vary: [
      [T`What is <code>np.arange(6).reshape(2, 3).shape[1]</code>?`, 3, T`Two rows, three columns.`],
      [T`What is <code>(np.arange(3) * 2).sum()</code>?`, 6, T`\(0 + 2 + 4\): elementwise, no loop.`],
      [T`What is <code>(np.ones((3, 1)) + np.ones((1, 4))).size</code>?`, 12, T`Broadcasting gives shape \((3, 4)\).`],
      [T`<code>a = np.array([1, 2, 3])</code>. What is <code>(a > 1).sum()</code>?`, 2, T`True counts as 1.`],
      [T`Same <code>a</code>. What is <code>a[a > 1].sum()</code>?`, 5, T`A boolean mask selects 2 and 3.`]
    ]
  }
});
