registerLearn('python', [
  { title: 'Names and objects', skill: 'Mutability', body: T`
<p>Every value is an object with a type and an identity. A variable is a name bound to an object; assignment rebinds the name and never copies.</p>
<pre class="code">a = [1, 2]
b = a          # same list, two names
b.append(3)    # a is now [1, 2, 3]
b = [9]        # rebinds b only</pre>
<p><code>==</code> compares values; <code>is</code> compares identity. Use <code>is</code> only for singletons such as <code>None</code>.</p>`,
    ex: { q: T`What do <code>a</code> and <code>b</code> hold after this code?<pre class="code">a = [1, 2]
b = a
a += [3]
a = a + [4]</pre>`, a: T`
<p><code>+=</code> on a list mutates it in place, so <code>b</code> sees <code>[1, 2, 3]</code>. <code>a + [4]</code> builds a new list and rebinds <code>a</code> to <code>[1, 2, 3, 4]</code>; <code>b</code> stays <code>[1, 2, 3]</code>.</p>` },
    trap: T`Assuming <code>b = a</code> makes a copy. It makes an alias.` },

  { title: 'Built-in types', skill: 'Mutability', body: T`
<table class="tt"><tr><th>Type</th><th>Example</th><th>Mutable</th><th>Notes</th></tr>
<tr><td><code>int</code></td><td><code>42</code></td><td>no</td><td>arbitrary precision</td></tr>
<tr><td><code>float</code></td><td><code>3.14</code></td><td>no</td><td>64-bit binary</td></tr>
<tr><td><code>str</code></td><td><code>"hi"</code></td><td>no</td><td>Unicode text</td></tr>
<tr><td><code>tuple</code></td><td><code>(1, 2)</code></td><td>no</td><td>hashable if contents are</td></tr>
<tr><td><code>list</code></td><td><code>[1, 2]</code></td><td>yes</td><td>ordered sequence</td></tr>
<tr><td><code>dict</code></td><td><code>{"k": 1}</code></td><td>yes</td><td>insertion ordered</td></tr>
<tr><td><code>set</code></td><td><code>{1, 2}</code></td><td>yes</td><td>unique, hashable items</td></tr></table>
<p>Only hashable (in practice, immutable) objects can be dict keys or set elements. <code>{}</code> is an empty dict; use <code>set()</code> for an empty set.</p>`,
    ex: { q: T`Which of these can be a dict key: <code>(1, 2)</code>, <code>[1, 2]</code>, <code>(1, [2])</code>?`, a: T`
<p>Only <code>(1, 2)</code>. A list is unhashable, and a tuple containing a list is too.</p>` },
    trap: T`Writing <code>s = {}</code> expecting an empty set.` },

  { title: 'Numbers and arithmetic', skill: 'Arithmetic', body: T`
<p><code>/</code> returns a float. <code>//</code> floors toward negative infinity; <code>%</code> takes the divisor's sign, so <code>a == (a // b) * b + a % b</code> always holds. <code>divmod(a, b)</code> returns both. <code>**</code> is exponentiation.</p>
<p>Floats are binary approximations: <code>0.1 + 0.2 != 0.3</code>. Compare with <code>math.isclose</code>; use <code>decimal</code> or integer cents for money. <code>round</code> uses banker's rounding: <code>round(2.5) == 2</code>.</p>`,
    ex: { q: T`Evaluate <code>divmod(-7, 2)</code> and <code>int(-3.7)</code>.`, a: T`
<p><code>-7 / 2 = -3.5</code> floors to <code>-4</code>, and <code>-7 - (-4)(2) = 1</code>, giving <code>(-4, 1)</code>. <code>int</code> truncates toward zero: <code>-3</code>.</p>` },
    trap: T`Expecting <code>//</code> to truncate like C or Java. It floors, which differs for negatives.` },

  { title: 'Strings and slicing', skill: 'Slicing', body: T`
<p><code>s[i]</code> indexes from 0; negative indices count from the end. <code>s[start:stop:step]</code> includes <code>start</code>, excludes <code>stop</code>, and never raises for out-of-range bounds. <code>s[::-1]</code> reverses.</p>
<p>Strings are immutable; methods return new strings: <code>strip</code>, <code>split</code>, <code>join</code>, <code>replace</code>, <code>lower</code>, <code>startswith</code>. Format with f-strings: <code>f"{x:.2f}"</code>, <code>f"{n:,}"</code>, <code>f"{p:.1%}"</code>.</p>`,
    ex: { q: T`For <code>s = "statistics"</code>, evaluate <code>s[1:4]</code>, <code>s[-3:]</code>, <code>s[::3]</code>.`, a: T`
<p>Indices 1 to 3: <code>"tat"</code>. Last three: <code>"ics"</code>. Every third from 0 (indices 0, 3, 6, 9): <code>"stts"</code>.</p>` },
    trap: T`Building strings with <code>+=</code> in a loop. Collect pieces in a list and <code>"".join</code> them once.` },

  { title: 'Lists, dicts, sets', skill: 'Idioms', body: T`
<p>Lists: <code>append</code>, <code>extend</code>, <code>insert</code>, <code>pop</code>, <code>sort</code> (in place, returns <code>None</code>) versus <code>sorted</code> (new list). Dicts: <code>d[k]</code> raises <code>KeyError</code>; <code>d.get(k, default)</code> does not; iterate with <code>d.items()</code>. Sets: <code>|</code> union, <code>&amp;</code> intersection, <code>-</code> difference, <code>^</code> symmetric difference.</p>
<p><code>collections</code> adds <code>Counter</code>, <code>defaultdict</code>, and <code>deque</code> (fast appends and pops at both ends).</p>`,
    ex: { q: T`Count word frequencies in <code>text</code> and get the three most common.`, a: T`
<pre class="code">from collections import Counter
words = text.lower().split()
counts = Counter(words)
counts.most_common(3)</pre>` },
    trap: T`Writing <code>x = x.sort()</code>. <code>sort</code> returns <code>None</code>, so <code>x</code> is lost.` },

  { title: 'Control flow', skill: 'Control flow', body: T`
<p><code>for</code> iterates over any iterable. Use <code>enumerate</code> for indices and <code>zip</code> for parallel sequences instead of <code>range(len(...))</code>. <code>break</code> exits a loop; <code>continue</code> skips to the next iteration.</p>
<p>A loop's <code>else</code> block runs only if the loop finished without <code>break</code>. Truthiness: <code>0</code>, <code>""</code>, <code>[]</code>, <code>{}</code>, <code>None</code> are false. <code>and</code>/<code>or</code> short-circuit and return an operand, not necessarily a bool.</p>`,
    ex: { q: T`Use <code>for</code>/<code>else</code> to test whether <code>n</code> is prime.`, a: T`
<pre class="code">for d in range(2, int(n**0.5) + 1):
    if n % d == 0:
        print("composite")
        break
else:  # runs only if no break
    print("prime")</pre>` },
    trap: T`Changing a list's length while iterating over it. Iterate over a copy or build a new list.` },

  { title: 'Comprehensions and generators', skill: 'Comprehensions', body: T`
<pre class="code">squares = [x * x for x in range(10)]
evens = {x for x in nums if x % 2 == 0}
pos = {w: i for i, w in enumerate(ws)}
# generator: no list is built
total = sum(x * x for x in range(10))</pre>
<p>A generator function uses <code>yield</code> to produce values lazily, one at a time. Generators can be consumed only once.</p>`,
    ex: { q: T`Write a generator for the Fibonacci numbers below <code>limit</code>.`, a: T`
<pre class="code">def fib(limit):
    a, b = 0, 1
    while a &lt; limit:
        yield a
        a, b = b, a + b

list(fib(50))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]</pre>` },
    trap: T`Iterating a generator twice and getting nothing the second time.` },

  { title: 'Functions and arguments', skill: 'Functions', body: T`
<pre class="code">def f(a, b=2, *args, c, d=4, **kw):
    ...
# a, b: positional (b has a default)
# args: extra positionals, a tuple
# c, d: keyword-only
# kw: extra keywords, a dict</pre>
<p>Parameters after <code>*args</code> (or a bare <code>*</code>) are keyword-only. Defaults are evaluated once, at definition, so a mutable default is shared across calls. Use <code>None</code> as a sentinel. Functions return <code>None</code> unless told otherwise; returning several values returns a tuple.</p>`,
    ex: { q: T`Fix the shared-default bug.<pre class="code">def add(x, items=[]):
    items.append(x)
    return items</pre>`, a: T`
<pre class="code">def add(x, items=None):
    if items is None:
        items = []
    items.append(x)
    return items</pre>` },
    trap: T`Using <code>[]</code>, <code>{}</code>, or any mutable object as a default value.` },

  { title: 'Scope and closures', skill: 'Functions', body: T`
<p>Lookup order is LEGB: local, enclosing function, global, built-in. Assigning to a name anywhere in a function makes it local for the whole function. <code>global</code> and <code>nonlocal</code> override that.</p>
<p>A closure is an inner function that remembers variables from its enclosing scope. It captures the variable, not its value at creation time.</p>`,
    ex: { q: T`Write a counter factory using a closure.`, a: T`
<pre class="code">def make_counter():
    n = 0
    def step():
        nonlocal n
        n += 1
        return n
    return step

c = make_counter()
c(), c()   # (1, 2)</pre>` },
    trap: T`Creating lambdas in a loop that all see the final loop value. Bind early with a default: <code>lambda i=i: i</code>.` },

  { title: 'Copying', skill: 'Copies', body: T`
<p><code>b = a</code>: alias. <code>a[:]</code>, <code>list(a)</code>, <code>a.copy()</code>, <code>copy.copy(a)</code>: shallow copy (new outer container, shared inner objects). <code>copy.deepcopy(a)</code>: recursive copy.</p>`,
    ex: { q: T`Why does this grid misbehave?<pre class="code">grid = [[0] * 3] * 3
grid[0][0] = 1</pre>`, a: T`
<p>All three rows are the same list object, so every row changes. Build independent rows: <code>[[0] * 3 for _ in range(3)]</code>.</p>` },
    trap: T`Multiplying a list of lists, which repeats references rather than copying.` },

  { title: 'Exceptions', body: T`
<pre class="code">try:
    value = int(text)
except ValueError:
    value = None  # one specific error
else:
    print("parsed")  # no exception
finally:
    cleanup()  # always runs</pre>
<p>Catch specific exceptions, not a bare <code>except:</code>. Raise with <code>raise ValueError("message")</code>. Use <code>with</code> for files and locks so cleanup is automatic.</p>`,
    ex: { q: T`Read a file safely.`, a: T`
<pre class="code">with open("data.csv") as f:
    rows = f.read().splitlines()
# file is closed here, even on error</pre>` },
    trap: T`Swallowing every error with <code>except Exception: pass</code>, which hides bugs.` },

  { title: 'Classes', body: T`
<pre class="code">from dataclasses import dataclass
from math import hypot

@dataclass
class Point:
    x: float
    y: float

    def norm(self):
        return hypot(self.x, self.y)

p = Point(3, 4)
p.norm()   # 5.0</pre>
<p><code>self</code> is the instance. <code>__init__</code> sets up state; <code>__repr__</code> controls display; <code>@dataclass</code> writes both for you. Class attributes are shared by every instance; instance attributes belong to one object.</p>`,
    ex: { q: T`Why does every <code>Team</code> share one member list?<pre class="code">class Team:
    members = []</pre>`, a: T`
<p><code>members</code> is a class attribute. Create it per instance in <code>__init__</code>: <code>self.members = []</code>.</p>` },
    trap: T`Forgetting <code>self</code> as the first method parameter.` },

  { title: 'Time complexity', skill: 'Complexity', body: T`
<table class="tt"><tr><th>Operation</th><th>list</th><th>dict / set</th></tr>
<tr><td><code>x in c</code></td><td>\(O(n)\)</td><td>\(O(1)\) average</td></tr>
<tr><td>append / add</td><td>\(O(1)\) amortized</td><td>\(O(1)\) average</td></tr>
<tr><td>insert or pop at front</td><td>\(O(n)\)</td><td>n/a</td></tr>
<tr><td>index <code>c[i]</code></td><td>\(O(1)\)</td><td>\(O(1)\) by key</td></tr>
<tr><td>sort</td><td>\(O(n\log n)\)</td><td>n/a</td></tr></table>
<p>Use <code>collections.deque</code> for queues and <code>heapq</code> for priority queues.</p>`,
    ex: { q: T`Why is <code>[x for x in a if x in b]</code> slow for two lists of 100,000 items?`, a: T`
<p>Each membership test scans <code>b</code>: about \(10^{10}\) steps. Convert first: <code>sb = set(b)</code>, then test <code>x in sb</code>, for about \(2\times10^5\) steps.</p>` },
    trap: T`Using <code>list.pop(0)</code> as a queue; each pop shifts every element.` },

  { title: 'NumPy essentials', skill: 'NumPy', body: T`
<p>Arrays have a <code>shape</code> and a single <code>dtype</code>. Operations are elementwise and vectorized; avoid Python loops over elements. <code>@</code> is matrix multiplication; <code>*</code> is elementwise.</p>
<p><code>axis=0</code> reduces down the rows (one result per column); <code>axis=1</code> reduces across columns. Broadcasting aligns shapes from the right; each pair of dimensions must be equal or contain a 1. Boolean masks select: <code>x[x &gt; 0]</code>. Slices are views, not copies.</p>`,
    ex: { q: T`Standardize each column of a data matrix <code>X</code> with shape <code>(n, p)</code>.`, a: T`
<pre class="code">mu = X.mean(axis=0)  # shape (p,)
sd = X.std(axis=0)
Z = (X - mu) / sd  # row-wise</pre>` },
    trap: T`Modifying a slice and expecting the original to stay unchanged. Call <code>.copy()</code> when you need independence.` }
]);
