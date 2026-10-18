'use strict';
// C++ track, part 3: algorithms and data structures. The lesson's reference implementations are the same strings compiled
// into each question's `cpp` program; tools/verify.py runs them with g++, and every keyed answer is computed separately in JS,
// usually by brute force or by a different algorithm.
(() => {
  const { pre, cd, prog, mc, oq, nq, HEAD } = window.CPP;
  registerSubject({ id: 'cppa', name: 'Algorithms in C++', color: '#3A5A40', plain: true, blurb: 'Complexity, binary search, sorting, stacks, heaps, hashing, two pointers, backtracking, dynamic programming, graphs, shortest paths, bits', questions: [], generators: [] });
  const U = ['Complexity and counting', 'Binary search', 'Sorting and selection', 'Stacks and queues', 'Heaps and priority queues', 'Hash tables, sets and maps', 'Two pointers and sliding windows', 'Recursion and backtracking', 'Dynamic programming', 'Graph traversal', 'Shortest paths and spanning trees', 'Bit manipulation'];

  // ---------- reference implementations (shown in lessons, compiled into questions) ----------
  const F = {
    lb: `// first index i with a[i] >= x
int lowerBound(const vector<int>& a,
               int x) {
  int lo = 0, hi = a.size();
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
    isqrt: `// largest r with r * r <= n
int isqrt(int n) {
  int lo = 0, hi = n;
  while (lo < hi) {
    int mid = hi - (hi - lo) / 2;
    if (mid <= n / mid) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}`,
    bubble: `int bubbleSwaps(vector<int> v) {
  int n = v.size(), s = 0;
  for (int i = 0; i < n; i++)
    for (int j = 1; j < n - i; j++)
      if (v[j - 1] > v[j]) {
        swap(v[j - 1], v[j]);
        s++;
      }
  return s;
}`,
    bal: `bool balanced(string s) {
  stack<char> st;
  for (char c : s) {
    if (c == '(' || c == '[') {
      st.push(c);
      continue;
    }
    if (st.empty()) return false;
    char o = st.top();
    st.pop();
    if ((c == ')') != (o == '('))
      return false;
  }
  return st.empty();
}`,
    nge: `vector<int> nextGreater(
    const vector<int>& a) {
  int n = a.size();
  vector<int> res(n, -1);
  stack<int> st;  // indices
  for (int i = 0; i < n; i++) {
    while (!st.empty() &&
           a[st.top()] < a[i]) {
      res[st.top()] = a[i];
      st.pop();
    }
    st.push(i);
  }
  return res;
}`,
    pairs: `// a holds distinct values
int countPairs(vector<int> a,
               int t) {
  sort(a.begin(), a.end());
  int i = 0, j = a.size() - 1;
  int n = 0;
  while (i < j) {
    int s = a[i] + a[j];
    if (s == t) { n++; i++; j--; }
    else if (s < t) i++;
    else j--;
  }
  return n;
}`,
    maxwin: `int maxWindow(const vector<int>& a,
              int k) {
  int n = a.size();
  int s = 0, best = INT_MIN;
  for (int i = 0; i < n; i++) {
    s += a[i];
    if (i >= k) s -= a[i - k];
    if (i >= k - 1)
      best = max(best, s);
  }
  return best;
}`,
    longu: `int longestUnique(string s) {
  vector<int> last(256, -1);
  int n = s.size();
  int best = 0, lo = 0;
  for (int i = 0; i < n; i++) {
    lo = max(lo, last[s[i]] + 1);
    last[s[i]] = i;
    best = max(best, i - lo + 1);
  }
  return best;
}`,
    minlen: `// shortest window with sum >= S;
// a holds positive values
int minLen(const vector<int>& a,
           int S) {
  int n = a.size(), best = n + 1;
  int lo = 0, s = 0;
  for (int hi = 0; hi < n; hi++) {
    s += a[hi];
    while (s >= S) {
      best = min(best, hi - lo + 1);
      s -= a[lo++];
    }
  }
  return best > n ? 0 : best;
}`,
    cnt: `// subsets of a[i..] summing to left
int cnt(const vector<int>& a,
        int i, int left) {
  if (i == (int)a.size())
    return left == 0;
  return cnt(a, i + 1, left)
       + cnt(a, i + 1, left - a[i]);
}`,
    queens: `int queens(int n, int r,
           vector<int>& col) {
  if (r == n) return 1;
  int total = 0;
  for (int c = 0; c < n; c++) {
    bool ok = true;
    for (int i = 0; i < r; i++)
      if (col[i] == c ||
          abs(col[i] - c) == r - i)
        ok = false;
    if (!ok) continue;
    col[r] = c;
    total += queens(n, r + 1, col);
  }
  return total;
}`,
    ways: `long long ways(vector<int> coins,
               int amt) {
  vector<long long> f(amt + 1);
  f[0] = 1;
  for (int c : coins)
    for (int a = c; a <= amt; a++)
      f[a] += f[a - c];
  return f[amt];
}`,
    minc: `int minCoins(vector<int> coins,
             int amt) {
  const int INF = 1e9;
  vector<int> f(amt + 1, INF);
  f[0] = 0;
  for (int c : coins)
    for (int a = c; a <= amt; a++)
      if (f[a - c] + 1 < f[a])
        f[a] = f[a - c] + 1;
  if (f[amt] >= INF) return -1;
  return f[amt];
}`,
    lis: `int lis(const vector<int>& a) {
  vector<int> t;  // tails
  for (int x : a) {
    auto it = lower_bound(
        t.begin(), t.end(), x);
    if (it == t.end())
      t.push_back(x);
    else
      *it = x;
  }
  return t.size();
}`,
    knap: `int knap(vector<int> w,
         vector<int> v, int W) {
  vector<int> f(W + 1);
  int n = w.size();
  for (int i = 0; i < n; i++)
    for (int c = W; c >= w[i]; c--)
      f[c] = max(f[c], v[i] +
                 f[c - w[i]]);
  return f[W];
}`,
    edit: `int edit(string a, string b) {
  int n = a.size(), m = b.size();
  vector<vector<int>> f(n + 1,
      vector<int>(m + 1));
  for (int j = 0; j <= m; j++)
    f[0][j] = j;
  for (int i = 1; i <= n; i++) {
    f[i][0] = i;
    for (int j = 1; j <= m; j++) {
      int s = a[i - 1] != b[j - 1];
      f[i][j] = min({f[i-1][j] + 1,
        f[i][j-1] + 1,
        f[i-1][j-1] + s});
    }
  }
  return f[n][m];
}`,
    bfs: `using G = vector<vector<int>>;
vector<int> bfs(const G& g, int s) {
  vector<int> d(g.size(), -1);
  queue<int> q;
  d[s] = 0;
  q.push(s);
  while (!q.empty()) {
    int u = q.front();
    q.pop();
    for (int v : g[u])
      if (d[v] < 0) {
        d[v] = d[u] + 1;
        q.push(v);
      }
  }
  return d;
}`,
    dfs: `void dfs(const G& g, int u,
         vector<bool>& seen,
         vector<int>& order) {
  seen[u] = true;
  order.push_back(u);
  for (int v : g[u])
    if (!seen[v])
      dfs(g, v, seen, order);
}`,
    comps: `int components(const G& g) {
  int n = g.size(), c = 0;
  vector<bool> seen(n);
  vector<int> order;
  for (int u = 0; u < n; u++)
    if (!seen[u]) {
      dfs(g, u, seen, order);
      c++;
    }
  return c;
}`,
    topo: `vector<int> topo(const G& g) {
  int n = g.size();
  vector<int> in(n), out;
  for (auto& es : g)
    for (int v : es) in[v]++;
  priority_queue<int, vector<int>,
                 greater<int>> q;
  for (int u = 0; u < n; u++)
    if (!in[u]) q.push(u);
  while (!q.empty()) {
    int u = q.top();
    q.pop();
    out.push_back(u);
    for (int v : g[u])
      if (--in[v] == 0) q.push(v);
  }
  return out;
}`,
    dij: `using E = pair<int, int>;
using WG = vector<vector<E>>;
// g[u] holds {v, w} pairs,
// pq holds {d, u} pairs
vector<int> dijkstra(const WG& g,
                     int s) {
  vector<int> d(g.size(), INT_MAX);
  priority_queue<E, vector<E>,
                 greater<E>> pq;
  d[s] = 0;
  pq.push({0, s});
  while (!pq.empty()) {
    auto [du, u] = pq.top();
    pq.pop();
    if (du > d[u]) continue;
    for (auto [v, w] : g[u])
      if (d[u] + w < d[v]) {
        d[v] = d[u] + w;
        pq.push({d[v], v});
      }
  }
  return d;
}`,
    dsu: `struct DSU {
  vector<int> p;
  DSU(int n) : p(n) {
    iota(p.begin(), p.end(), 0);
  }
  int find(int x) {
    return p[x] == x ? x
         : p[x] = find(p[x]);
  }
  bool unite(int a, int b) {
    a = find(a), b = find(b);
    if (a == b) return false;
    p[a] = b;
    return true;
  }
};`,
    mst: `// edges as {w, u, v}
int mst(int n,
        vector<array<int, 3>> es) {
  sort(es.begin(), es.end());
  DSU d(n);
  int total = 0;
  for (auto [w, u, v] : es)
    if (d.unite(u, v)) total += w;
  return total;
}`,
    iv: `// intervals [s, e) as {e, s}
int maxDisjoint(
    vector<pair<int, int>> iv) {
  sort(iv.begin(), iv.end());
  int n = 0, last = INT_MIN;
  for (auto [e, s] : iv)
    if (s >= last) {
      n++;
      last = e;
    }
  return n;
}`
  };
  // A program that defines the named implementations and runs `body` in main.
  const withF = (names, body) => `${HEAD}${names.map(n => F[n]).join('\n')}\nint main() {\n${body}\n}\n`;
  const ref = (q, names, body, answer, x) => ({ q, cpp: withF(names, body), answer, x });
  const arr = v => `{${v.join(', ')}}`;
  const vdecl = (ty, vals, name = 'v') => cdecl(`vector<${ty}>`, vals, name);
  const cdecl = (ty, vals, name) => { const one = `${ty} ${name}{${vals.join(', ')}};`; if (one.length <= 32) return one; const L = [`${ty} ${name}{`]; let cur = ''; vals.forEach((x, i) => { const piece = String(x) + (i < vals.length - 1 ? ',' : '};'); if (cur && (`  ${cur} ${piece}`).length > 32) { L.push(`  ${cur}`); cur = piece; } else cur = cur ? `${cur} ${piece}` : piece; }); L.push(`  ${cur}`); return L.join('\n'); };
  const BE = 'auto b = v.begin(), e = v.end();';

  // ---------- independent JS checks ----------
  const graph = (R, n, m, connected) => {
    const E = new Set(), es = [];
    const add = (u, v) => { if (u === v) return false; const k = u < v ? `${u}-${v}` : `${v}-${u}`; if (E.has(k)) return false; E.add(k); es.push(u < v ? [u, v] : [v, u]); return true; };
    if (connected) for (let v = 1; v < n; v++) add(R.int(0, v - 1), v);
    let guard = 0; while (es.length < m && guard++ < 500) add(R.int(0, n - 1), R.int(0, n - 1));
    // Relabel so that node numbers carry no hint of the construction order (0 stays a random node).
    const perm = R.shuffle([...Array(n).keys()]);
    return R.shuffle(es.map(([u, v]) => { const a = perm[u], b = perm[v]; return a < b ? [a, b] : [b, a]; }));
  };
  const floyd = (n, es, w) => { const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 0 : Infinity)); es.forEach(([u, v], i) => { const c = w ? w[i] : 1; D[u][v] = Math.min(D[u][v], c); D[v][u] = Math.min(D[v][u], c); }); for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (D[i][k] + D[k][j] < D[i][j]) D[i][j] = D[i][k] + D[k][j]; return D; };
  const adj = (n, es, directed) => { const g = Array.from({ length: n }, () => []); for (const [u, v] of es) { g[u].push(v); if (!directed) g[v].push(u); } g.forEach(a => a.sort((x, y) => x - y)); return g; };
  const buildG = (n, es, directed) => `G g(${n});\nfor (auto [u, v] : vector<pair<int, int>>${arr(es.map(arr))}) {\n  g[u].push_back(v);\n${directed ? '' : '  g[v].push_back(u);\n'}}\nfor (auto& a : g) sort(a.begin(), a.end());`;
  const edgeText = es => es.map(([u, v]) => `${u}-${v}`).join(', ');
  const subsets = a => { const out = []; for (let m = 0; m < 1 << a.length; m++) out.push(a.filter((_, i) => m >> i & 1)); return out; };
  const fact = n => n < 2 ? 1 : n * fact(n - 1);

  registerLearn('cppa', [
    { title: U[0], skill: U[0],
      hook: T`<p>Before writing an algorithm, estimate how its running time grows with the input size n. A modern core does very roughly 10<sup>8</sup> to 10<sup>9</sup> simple operations per second, so the growth rate decides whether a solution takes milliseconds or years.</p>`,
      body: T`
<table class="tt"><tr><th>Class</th><th>Typical source</th><th>n = 10⁶</th></tr>
<tr><td>O(1)</td><td>index, hash lookup</td><td>instant</td></tr>
<tr><td>O(log n)</td><td>binary search, halving</td><td>20 steps</td></tr>
<tr><td>O(√n)</td><td>trial division</td><td>1000</td></tr>
<tr><td>O(n)</td><td>one pass</td><td>10⁶</td></tr>
<tr><td>O(n log n)</td><td>sorting</td><td>2 × 10⁷</td></tr>
<tr><td>O(n²)</td><td>all pairs</td><td>10¹²: too slow</td></tr>
<tr><td>O(2ⁿ)</td><td>all subsets</td><td>only n ≲ 30</td></tr></table>
<p><b>Counting loops.</b> Count how many times the innermost statement runs.</p>
<ul><li>Independent nested loops multiply: n × m.</li>
<li>A dependent inner loop sums: ${cd('for i < n, for j from i + 1 to n')} runs 0 + 1 + ... + (n − 1) = n(n − 1)/2 times, which is O(n²).</li>
<li>A loop that doubles (${cd('i *= 2')}) or halves its counter runs about log₂ n times. ${cd('for (int i = 1; i < n; i *= 2)')} visits 1, 2, 4, ... below n: ⌈log₂ n⌉ passes.</li>
<li>${cd('for (int i = 1; i * i <= n; i++)')} runs ⌊√n⌋ times.</li>
<li>Three dependent loops, k < j < i < n, run once per choice of 3 indices: n(n − 1)(n − 2)/6 times, O(n³).</li></ul>
<p>Big-O drops constant factors and lower-order terms: 3n² + 5n is O(n²). Constants still matter in practice, which is where memory layout and cache behavior come in.</p>
<p><b>Amortized cost</b> averages over a sequence: a vector's ${cd('push_back')} sometimes copies everything, but n pushes cost O(n) in total, so each is amortized O(1).</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`int n = 10, c = 0;
for (int i = 0; i < n; i++) {
  int j = 1;
  while (j < n) {
    j *= 2;
    c++;
  }
}
cout << c;`)}`, a: T`<p>The inner loop runs with j = 1, 2, 4, 8: 4 passes. The outer loop runs 10 times. Output: ${cd('40')}, and in general n⌈log₂ n⌉, O(n log n).</p>` },
      trap: T`Calling a doubling loop O(n) because it has one loop. Count the passes: the counter reaches n after about log₂ n doublings.`,
      vary: [[T`What does this print?${pre('int c = 0;\nfor (int i = 0; i < 6; i++)\n  for (int j = 0; j < i; j++)\n    c++;\ncout << c;')}`, 15, T`0 + 1 + 2 + 3 + 4 + 5.`],
        [T`How many passes does ${cd('for (int i = 1; i < 100; i *= 2)')} make?`, 7, T`1, 2, 4, 8, 16, 32, 64.`],
        [T`How many passes does ${cd('for (int i = 1; i * i <= 50; i++)')} make?`, 7, T`⌊√50⌋ = 7.`],
        [T`Sorting then scanning once costs:`, ['O(n log n)', 'O(n)', 'O(n²)'], T`The sort dominates.`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Binary search finds a boundary in sorted data by halving the range each step: about 20 steps for a million elements. Most bugs come from an inconsistent invariant, so it pays to state exactly what ${cd('lo')} and ${cd('hi')} mean.</p>`,
      body: T`
<p><b>Standard library.</b> On a sorted range: ${cd('lower_bound(b, e, x)')} points to the first element ${cd('>= x')}; ${cd('upper_bound(b, e, x)')} to the first element ${cd('> x')}. Both return ${cd('e')} if there is none, so subtracting ${cd('b')} gives an index from 0 to n. ${cd('upper_bound - lower_bound')} counts the copies of ${cd('x')}, and ${cd('binary_search')} reports presence. Each runs in O(log n).</p>
<p>For ${cd('{1, 3, 3, 3, 7}')} and x = 3: lower bound index 1, upper bound index 4, count 3. For x = 5 both are 4; for x = 9 both are 5.</p>
<p><b>Writing it yourself.</b> Keep the half-open invariant: the answer always lies in [lo, hi]. Every index below lo has ${cd('a[i] < x')}; every index at or above hi has ${cd('a[i] >= x')}.</p>
${pre(F.lb)}
<p>Write the midpoint as ${cd('lo + (hi - lo) / 2')}: ${cd('(lo + hi) / 2')} can overflow when the indices are large.</p>
<p><b>Searching on the answer.</b> Binary search works on any monotone yes/no question, not only arrays. To find the largest r with r² ≤ n, test the middle candidate and keep the half that can still hold the answer. Rounding the midpoint up, as ${cd('hi - (hi - lo) / 2')} does, ensures progress when the update is ${cd('lo = mid')}, and testing ${cd('mid <= n / mid')} avoids overflowing ${cd('mid * mid')}.</p>
${pre(F.isqrt)}`,
      ex: { q: T`<p>For ${cd('v{2, 4, 4, 4, 8, 9}')} sorted, what are ${cd('lower_bound(b, e, 4) - b')}, ${cd('upper_bound(b, e, 4) - b')} and ${cd('lower_bound(b, e, 5) - b')}?</p>`, a: T`<p>The first 4 is at index 1; the first element above 4 is 8, at index 4. The first element ≥ 5 is also 8. Answers: 1, 4, 4. There are 4 − 1 = 3 copies of 4.</p>` },
      trap: T`Running binary search on unsorted data, or with a comparator different from the one used to sort. The result is meaningless rather than an error.`,
      vary: [[T`For ${cd('{1, 3, 3, 3, 7}')}, what is ${cd('lower_bound(b, e, 0) - b')}?`, 0, T`Every element is ≥ 0.`],
        [T`For the same array, ${cd('upper_bound(b, e, 7) - b')}?`, 5, T`No element exceeds 7, so it returns e.`],
        [T`What does the lesson's ${cd('isqrt(99)')} return?`, 9, T`9² = 81 ≤ 99 < 100.`],
        [T`At most how many halvings bring a range of 1000 elements down to 1?`, 10, T`2¹⁰ = 1024 ≥ 1000.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Sorting is the most common preprocessing step in algorithms: it enables binary search, two pointers and greedy choices. The standard library offers several variants, and choosing the cheapest one that answers the question matters.</p>`,
      body: T`
<table class="tt"><tr><th>Call</th><th>Gives</th><th>Cost</th></tr>
<tr><td>${cd('sort')}</td><td>all sorted, not stable</td><td>O(n log n)</td></tr>
<tr><td>${cd('stable_sort')}</td><td>sorted, ties keep input order</td><td>O(n log n)</td></tr>
<tr><td>${cd('partial_sort(b, b + k, e)')}</td><td>the k smallest, sorted, at the front</td><td>O(n log k)</td></tr>
<tr><td>${cd('nth_element(b, b + k, e)')}</td><td>${cd('v[k]')} as if sorted; smaller before, larger after</td><td>O(n) average</td></tr></table>
<p>${cd('nth_element')} is the right tool for a median or a percentile: it finds the k-th smallest element (counting from 0) without sorting the rest.</p>
<p><b>Pairs and tuples</b> compare lexicographically: by ${cd('first')}, then by ${cd('second')} to break ties. Plain ${cd('sort')} on ${cd('vector<pair<int, char>>')} therefore orders ties by the char. To sort by ${cd('first')} only and keep ties in input order, use ${cd('stable_sort')} with a comparator on ${cd('first')}.</p>
<p><b>Inversions.</b> A pair i < j with ${cd('a[i] > a[j]')} is an inversion. Each adjacent swap in bubble sort removes exactly one inversion, so bubble sort makes exactly as many swaps as the array has inversions: 0 when sorted, n(n − 1)/2 when reversed.</p>
${pre(F.bubble)}
<p>${cd('std::sort')} is an introsort: quicksort that switches to heapsort if recursion gets too deep, and to insertion sort on small ranges, guaranteeing O(n log n).</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`vector<pair<int, char>> v{
  {2, 'a'}, {1, 'b'}, {2, 'c'},
  {1, 'd'}, {2, 'e'}};
auto cmp = [](auto x, auto y) {
  return x.first > y.first;
};
auto b = v.begin();
stable_sort(b, v.end(), cmp);
for (auto [k, c] : v)
  cout << c;`)}`, a: T`<p>Descending by the number, with ties in input order: the 2s (a, c, e), then the 1s (b, d). Output: ${cd('acebd')}.</p>` },
      trap: T`Using ${cd('sort')} and expecting equal elements to keep their order. Only ${cd('stable_sort')} promises that.`,
      vary: [[T`After ${cd('nth_element(b, b + 2, e)')} on ${cd('{9, 4, 7, 1, 5}')}, what is ${cd('v[2]')}?`, 5, T`Sorted: 1 4 5 7 9.`],
        [T`What does the lesson's ${cd('bubbleSwaps')} return for ${cd('{3, 1, 2}')}?`, 2, T`Inversions (3, 1) and (3, 2).`],
        [T`What does it return for ${cd('{4, 3, 2, 1}')}?`, 6, T`Reversed: 4 · 3 / 2.`],
        [T`${cd('sort')} on ${cd('{(1,b), (0,z), (1,a)}')} gives first:`, ['(0,z)', '(1,a)', '(1,b)'], T`Lexicographic: 0 comes first.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>A stack serves the most recent item first; a queue serves the oldest. Matching brackets, undo, expression parsing and depth-first search use stacks; scheduling and breadth-first search use queues.</p>`,
      body: T`
<table class="tt"><tr><th>Type</th><th>Order</th><th>Operations</th></tr>
<tr><td>${cd('stack')}</td><td>LIFO</td><td>${cd('push')}, ${cd('top')}, ${cd('pop')}</td></tr>
<tr><td>${cd('queue')}</td><td>FIFO</td><td>${cd('push')} (back), ${cd('front')}, ${cd('back')}, ${cd('pop')} (front)</td></tr>
<tr><td>${cd('deque')}</td><td>both ends</td><td>${cd('push_front')}, ${cd('push_back')}, ${cd('pop_front')}, ${cd('pop_back')}, ${cd('front')}, ${cd('back')}</td></tr></table>
<p>All are O(1). ${cd('pop()')} returns nothing; read ${cd('top()')} or ${cd('front()')} first. Calling them on an empty container is undefined.</p>
<p><b>Matching brackets.</b> Push each opener; each closer must match the opener on top, which is then popped. The string is balanced if no closer fails and the stack ends empty.</p>
${pre(F.bal)}
<p><b>Monotonic stack.</b> To find, for each element, the next element to its right that is larger: keep a stack of indices still waiting for an answer, with values decreasing from bottom to top. Each new value resolves every smaller waiting value, then waits itself. Every index is pushed and popped once, so the whole pass is O(n). Elements that never find one get −1.</p>
${pre(F.nge)}
<p>For ${cd('{2, 7, 3, 5, 4, 6, 1}')} the result is ${cd('{7, -1, 5, 6, 6, -1, -1}')}.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`queue<int> q;
stack<int> s;
for (int x : {4, 8, 1, 6}) {
  q.push(x);
  s.push(x);
}
q.pop();
s.pop();
cout << q.front() << s.top();`)}`, a: T`<p>The queue removes its oldest item, 4, so its front is 8. The stack removes its newest, 6, so its top is 1. Output: ${cd('81')}.</p>` },
      trap: T`Writing ${cd('int x = s.pop();')}. ${cd('pop')} returns void; read ${cd('top()')} first.`,
      vary: [[T`Is ${cd('"([)]"')} balanced? 1 for yes, 0 for no.`, 0, T`The ) meets [ on top.`],
        [T`Is ${cd('"[()()]"')} balanced? 1 for yes, 0 for no.`, 1, T`Every closer matches.`],
        [T`For ${cd('{5, 3, 8}')}, what is ${cd('nextGreater')} at index 1?`, 8, T`The next larger element to the right of 3.`],
        [T`For ${cd('{5, 3, 8}')}, ${cd('nextGreater')} at index 2?`, -1, T`Nothing follows 8.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>A priority queue always hands out its largest (or smallest) element, in O(log n) per operation. It is the engine of Dijkstra's algorithm, event simulation, order-book matching and every "top k" problem.</p>`,
      body: T`
<p><b>Binary heap.</b> A complete binary tree stored in an array: node i has children 2i + 1 and 2i + 2 and parent ⌊(i − 1)/2⌋. In a max-heap every parent is at least its children, so the maximum sits at index 0. Push appends and sifts up; pop moves the last element to the root and sifts down; both are O(log n). Building a heap from n elements with ${cd('make_heap')} is O(n).</p>
<p><b>priority_queue.</b> ${cd('push')}, ${cd('top')}, ${cd('pop')}, ${cd('size')}. It is a max-heap by default. For a min-heap pass a container and ${cd('greater')}:</p>
${pre(T`priority_queue<int> mx;
priority_queue<int, vector<int>,
               greater<int>> mn;`)}
<p><b>Heap algorithms</b> on a vector: ${cd('make_heap(b, e)')} arranges it as a max-heap with the largest at ${cd('v.front()')}. ${cd('pop_heap(b, e)')} moves the largest to the back and re-heaps the rest; follow it with ${cd('v.pop_back()')}. ${cd('push_heap')} sifts up an element just appended.</p>
<p><b>Top k.</b> To find the k-th largest of a stream, keep a min-heap of the k largest seen so far: push each value, and pop whenever the size exceeds k. The top is then the k-th largest. This costs O(n log k) time and O(k) memory.</p>
${pre(T`priority_queue<int, vector<int>,
               greater<int>> pq;
for (int x : v) {
  pq.push(x);
  if (pq.size() > k) pq.pop();
}
// pq.top() is the k-th largest`)}`,
      ex: { q: T`<p>What does this print?</p>${pre(T`priority_queue<int> pq;
for (int x : {5, 1, 9, 3, 7})
  pq.push(x);
pq.pop();
pq.pop();
cout << pq.top();`)}`, a: T`<p>A max-heap: the pops remove 9 and 7, leaving 5 on top. Output: ${cd('5')}.</p>` },
      trap: T`Expecting ${cd('priority_queue<int>')} to give the smallest element first. It is a max-heap unless you pass ${cd('greater')}.`,
      vary: [[T`The same pushes into a min-heap, with two pops. The top?`, 5, T`The pops remove 1 and 3.`],
        [T`In a 0-indexed heap array, what is the parent of index 9?`, 4, T`⌊(9 − 1)/2⌋.`],
        [T`The first child of index 4?`, 9, T`2 · 4 + 1.`],
        [T`With the top-k loop and k = 2 over ${cd('{4, 9, 2, 7}')}, what is ${cd('pq.top()')}?`, 7, T`The two largest are 9 and 7; the min-heap's top is 7.`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Hash tables give constant-time lookup on average, and balanced trees give ordered data with logarithmic operations. Knowing which operations silently insert is as important as knowing their cost.</p>`,
      body: T`
<p><b>unordered_map / unordered_set</b> hash each key to a bucket: insert, find and erase are O(1) on average, O(n) in the worst case. Iteration order is unspecified and can change after a rehash; never depend on it.</p>
<p><b>map / set</b> are balanced search trees: O(log n) operations and iteration in sorted key order. ${cd('s.lower_bound(x)')} and ${cd('s.upper_bound(x)')} work as on a sorted vector, returning iterators to elements: the first ≥ x and the first > x.</p>
<p><b>operator[] inserts.</b> ${cd('m[k]')} returns a reference to the value for ${cd('k')}, inserting a value-initialized one (0 for numbers) if ${cd('k')} is absent. Reading ${cd('m[k]')} to check for a key therefore adds it. ${cd('m.count(k)')}, ${cd('m.find(k)')} and ${cd('m.contains(k)')} (C++20) never insert.</p>
${pre(T`map<string, int> m;
m["bid"] = 5;
int x = m["ask"];   // inserts ask
bool y = m.count("mid");
cout << m.size();   // 2`)}
<p><b>Frequency counting</b> is where ${cd('[]')} helps: ${cd('for (char c : s) f[c]++;')} creates each counter at 0 on first sight.</p>
<p><b>Multisets</b> keep duplicates. ${cd('ms.erase(x)')} removes every copy of x; ${cd('ms.erase(ms.find(x))')} removes exactly one. ${cd('ms.count(x)')} is the number of copies.</p>
<p>Choose ${cd('map')} when you need order, range queries or predictable worst cases; ${cd('unordered_map')} when you only look up exact keys and speed matters.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`string s = "banana";
unordered_map<char, int> f;
for (char c : s) f[c]++;
cout << f['a'] << ' ';
cout << f['z'] << ' ';
cout << f.size();`)}`, a: T`<p>a appears 3 times. ${cd("f['z']")} inserts z with count 0 and prints 0. The map now holds b, a, n and z. Output: ${cd('3 0 4')}.</p>` },
      trap: T`Testing membership with ${cd('if (m[k])')}. It inserts k, and a stored 0 looks the same as a missing key.`,
      vary: [[T`For ${cd('set<int> s{2, 5, 9}')}, what is ${cd('*s.lower_bound(5)')}?`, 5, T`The first element ≥ 5.`],
        [T`And ${cd('*s.upper_bound(5)')}?`, 9, T`The first element > 5.`],
        [T`${cd('multiset<int> m{1, 3, 3, 3};')} then ${cd('m.erase(3);')}. Size?`, 1, T`erase by value removes every copy.`],
        [T`The same, with ${cd('m.erase(m.find(3));')}. Size?`, 3, T`Exactly one copy is removed.`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Many problems on arrays and strings ask about pairs or contiguous ranges. Moving two indices in one direction only, instead of trying every pair, turns O(n²) into O(n).</p>`,
      body: T`
<p><b>Opposite ends.</b> On sorted data, to find pairs summing to t: start with i at the left and j at the right. If ${cd('a[i] + a[j]')} is too small, only increasing i can help; if too big, only decreasing j. Each step discards one index for good.</p>
${pre(F.pairs)}
<p><b>Fixed window.</b> To get every sum of k consecutive elements, add the element entering the window and subtract the one leaving it.</p>
${pre(F.maxwin)}
<p><b>Variable window.</b> Grow the right end every step and shrink the left end while the window is valid (or invalid, depending on the problem). Both ends only move right, so the total work is O(n).</p>
${pre(F.longu)}
<p>Here ${cd('last[c]')} is the last index where char c appeared; the window [lo, i] never contains a repeat.</p>
${pre(F.minlen)}
<p>The shrinking loop is correct because all values are positive: removing an element never increases the sum.</p>`,
      ex: { q: T`<p>What does ${cd('maxWindow({4, -1, 3, 5, -2, 6}, 3)')} return?</p>`, a: T`<p>Window sums: 4 − 1 + 3 = 6, then 7, then 6, then 9. The largest is 9, from 5, −2, 6.</p>` },
      trap: T`Using the shrinking-window trick when values can be negative. Removing a negative element raises the sum, so the window logic breaks; use prefix sums instead.`,
      vary: [[T`${cd('countPairs({1, 2, 3, 4, 5, 6}, 7)')}?`, 3, T`(1,6), (2,5), (3,4).`],
        [T`${cd('longestUnique("abcabcbb")')}?`, 3, T`"abc".`],
        [T`${cd('minLen({2, 3, 1, 2, 4, 3}, 7)')}?`, 2, T`{4, 3}.`],
        [T`${cd('minLen({1, 1, 1}, 5)')}?`, 0, T`No window reaches 5.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Backtracking builds candidates one choice at a time and abandons a partial candidate as soon as it cannot succeed. It explores subsets, permutations and placements that are too many to list but small enough to search with pruning.</p>`,
      body: T`
<p><b>Subsets.</b> Each element is either in or out, so n elements have 2ⁿ subsets. A recursive count tries both choices at each index:</p>
${pre(F.cnt)}
<p>${cd('cnt(a, 0, t)')} counts the subsets of a summing to t, the empty subset included when t = 0.</p>
<p><b>Permutations.</b> n distinct items have n! orders. ${cd('next_permutation(b, e)')} rearranges a range into the next permutation in lexicographic order and returns true; from the last one (descending) it wraps to the first (ascending) and returns false. Starting from sorted order, a ${cd('do { } while (next_permutation(b, e));')} loop visits each distinct permutation once: with repeated items, n! / (k₁! k₂! ...) of them.</p>
<p>To find the next permutation by hand: find the rightmost position i with ${cd('a[i] < a[i + 1]')}, swap ${cd('a[i]')} with the rightmost element larger than it, then reverse the suffix after i. For ${cd('"acdb"')}: i points at c; the rightmost larger element is d; swapping gives "adcb"; reversing "cb" gives ${cd('"adbc"')}.</p>
<p><b>N queens.</b> Place one queen per row, rejecting columns attacked by earlier rows (same column, or same diagonal: column difference equals row difference).</p>
${pre(F.queens)}
<p>${cd('queens(n, 0, col)')} with ${cd('col')} of size n counts the solutions: 1, 0, 0, 2, 10, 4, 40, 92 for n = 1 to 8.</p>`,
      ex: { q: T`<p>What is ${cd('cnt({3, 1, 4, 2}, 0, 6)')}?</p>`, a: T`<p>Subsets summing to 6: {4, 2}, {3, 1, 2}. So 2.</p>` },
      trap: T`Forgetting that ${cd('next_permutation')} starts from the current arrangement. To enumerate all permutations, sort first.`,
      vary: [[T`How many times does ${cd('do c++; while (next_permutation(b, e));')} run for the string ${cd('"aab"')}?`, 3, T`3! / 2! orders: aab, aba, baa.`],
        [T`For the string ${cd('"abc"')}, what does one ${cd('next_permutation')} give?`, ['acb', 'bac', 'cba'], T`The next arrangement in dictionary order.`],
        [T`${cd('queens(6, 0, col)')}?`, 4, T`From the table.`],
        [T`${cd('cnt({1, 2, 3}, 0, 3)')}?`, 2, T`{3} and {1, 2}.`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Dynamic programming solves a problem by combining answers to smaller instances of the same problem, storing each answer so it is computed only once. It applies when subproblems overlap and an optimal answer is built from optimal sub-answers.</p>`,
      body: T`
<p><b>Recipe:</b> define a state (what ${cd('f[x]')} means), write the recurrence, set base cases, and order the computation so dependencies come first.</p>
<p><b>Counting coin combinations.</b> ${cd('f[a]')} is the number of ways to make amount a. Looping over coins on the outside counts each combination once, regardless of order (looping over amounts on the outside would count orderings).</p>
${pre(F.ways)}
<p><b>Fewest coins.</b> ${cd('f[a]')} is the fewest coins making a; −1 means impossible.</p>
${pre(F.minc)}
<p><b>Longest increasing subsequence.</b> ${cd('t[k]')} is the smallest tail of any strictly increasing subsequence of length k + 1 seen so far. Each value replaces the first tail ≥ it, or extends the list. The length of ${cd('t')} is the answer, in O(n log n).</p>
${pre(F.lis)}
<p><b>0/1 knapsack.</b> ${cd('f[c]')} is the best value within capacity c. Iterating capacity downward ensures each item is used at most once.</p>
${pre(F.knap)}
<p><b>Edit distance.</b> ${cd('f[i][j]')} is the fewest insertions, deletions and substitutions turning the first i chars of a into the first j of b.</p>
${pre(F.edit)}`,
      ex: { q: T`<p>What do ${cd('ways({1, 2, 5}, 5)')} and ${cd('minCoins({1, 2, 5}, 11)')} return?</p>`, a: T`<p>Ways to make 5: 5; 2+2+1; 2+1+1+1; 1×5. That is 4. Fewest coins for 11: 5 + 5 + 1, so 3.</p>` },
      trap: T`Iterating capacity upward in 0/1 knapsack. Then ${cd('f[c - w[i]]')} may already include item i, and items get reused.`,
      vary: [[T`${cd('lis({3, 1, 4, 1, 5, 9, 2, 6})')}?`, 4, T`For example 1, 4, 5, 9.`],
        [T`${cd('edit("kitten", "sitting")')}?`, 3, T`k→s, e→i, insert g.`],
        [T`${cd('minCoins({2}, 3)')}?`, -1, T`Odd amounts are impossible with 2s.`],
        [T`${cd('knap({1, 3, 4}, {15, 20, 30}, 4)')}?`, 35, T`Items of weight 1 and 3.`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>A graph is a set of nodes joined by edges. Breadth-first search finds shortest paths when every edge counts the same; depth-first search explores as deep as possible first, which suits connectivity, cycle detection and ordering.</p>`,
      body: T`
<p><b>Representation.</b> An adjacency list ${cd('G g(n)')}, with ${cd('g[u]')} the neighbors of u. For an undirected edge, add each endpoint to the other's list. The practice problems sort each list, so neighbors are visited in increasing order.</p>
<p><b>BFS</b> visits nodes in order of distance from the source, using a queue. ${cd('d[v]')} is the number of edges on a shortest path, or −1 if v is unreachable. O(n + m).</p>
${pre(F.bfs)}
<p><b>DFS</b> follows one neighbor as deep as possible before backtracking. The order in which nodes are first visited is the preorder.</p>
${pre(F.dfs)}
<p>Starting a DFS from each unvisited node counts the <b>connected components</b>:</p>
${pre(F.comps)}
<p><b>Topological order.</b> In a directed graph with no cycle, list the nodes so that every edge goes from earlier to later. Kahn's algorithm repeatedly outputs a node with no remaining incoming edges. Using a min-heap for the ready nodes produces the lexicographically smallest valid order. If the output is shorter than n, the graph has a cycle.</p>
${pre(F.topo)}`,
      ex: { q: T`<p>An undirected graph on 0 to 5 has edges 0-1, 0-2, 1-3, 2-3, 3-4. What are the BFS distances from 0, and the DFS preorder from 0?</p>`, a: T`<p>BFS: d = 0, 1, 1, 2, 3, −1 (node 5 is isolated). DFS from 0 visits 1 first (smallest neighbor), then 3, then 2 (3's smallest unvisited neighbor), back to 3, then 4: ${cd('0 1 3 2 4')}.</p>` },
      trap: T`Using DFS to find shortest paths in an unweighted graph. DFS finds a path, not a shortest one; BFS does.`,
      vary: [[T`In the example, how many connected components are there?`, 2, T`{0, 1, 2, 3, 4} and {5}.`],
        [T`A directed graph on 0 to 3 has edges 2→0, 2→1, 0→3, 1→3. The lesson's topo order?`, ['2 0 1 3', '2 1 0 3', '0 1 2 3'], T`Only 2 has no incoming edge; then 0 and 1 are ready, smallest first.`],
        [T`BFS on n nodes and m edges costs:`, ['O(n + m)', 'O(n · m)', 'O(n²)'], T`Each node is queued once and each edge examined a constant number of times.`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>With weighted edges, the fewest edges is no longer the shortest path. Dijkstra's algorithm handles nonnegative weights, union-find tracks connectivity as edges are added, and both feed Kruskal's minimum spanning tree.</p>`,
      body: T`
<p><b>Dijkstra.</b> Always settle the unsettled node with the smallest tentative distance, using a min-heap of (distance, node). Stale heap entries, those larger than the node's current distance, are skipped. O((n + m) log n). Negative edges break it; use Bellman-Ford for those, and Floyd-Warshall (O(n³)) for all pairs on small graphs.</p>
${pre(F.dij)}
<p><b>Union-find</b> (disjoint set union) keeps a forest in which each set is a tree; ${cd('find')} returns the root, compressing the path as it goes. ${cd('unite')} links two roots and returns false if they were already in one set.</p>
${pre(F.dsu)}
<p><b>Minimum spanning tree.</b> Kruskal's algorithm takes edges in increasing weight and keeps each one that joins two different components.</p>
${pre(F.mst)}
<p><b>Greedy interval scheduling.</b> To keep the most pairwise disjoint intervals, repeatedly take the interval that ends first among those compatible with the last one taken. Intervals are half-open [s, e), so one ending at 5 and another starting at 5 do not overlap.</p>
${pre(F.iv)}`,
      ex: { q: T`<p>Weighted undirected edges: 0-1 (4), 0-2 (1), 2-1 (2), 1-3 (5), 2-3 (8). What is ${cd('dijkstra(g, 0)[3]')}, and the MST weight?</p>`, a: T`<p>Shortest paths: 2 at 1, 1 at 1 + 2 = 3, 3 at 3 + 5 = 8 (the direct 2-3 edge gives 9). Kruskal takes 0-2 (1), 2-1 (2), skips 0-1 (4), takes 1-3 (5): total 8.</p>` },
      trap: T`Running Dijkstra on a graph with a negative edge. A node can be settled before a cheaper path through the negative edge is found.`,
      vary: [[T`${cd('DSU d(4);')} then ${cd('d.unite(0, 1)')}, ${cd('d.unite(2, 3)')}, ${cd('d.unite(1, 0)')}. How many returned true?`, 2, T`The third pair is already joined.`],
        [T`${cd('maxDisjoint')} on [1, 3), [2, 5), [3, 4), [4, 7)?`, 3, T`[1, 3), [3, 4), [4, 7).`],
        [T`A spanning tree of a connected graph on n nodes has how many edges?`, ['n − 1', 'n', 'n + 1'], T`A tree on n nodes.`]] },

    { title: U[11], skill: U[11],
      hook: T`<p>An integer is a row of bits, and the bitwise operators act on all of them at once. Bit tricks pack sets into words, test powers of two, and run inner loops of search and hashing code without branches.</p>`,
      body: T`
<table class="tt"><tr><th>Expression</th><th>Effect</th></tr>
<tr><td>${cd('x & y')}, ${cd('x | y')}, ${cd('x ^ y')}</td><td>and, or, xor bit by bit</td></tr>
<tr><td>${cd('x << k')}, ${cd('x >> k')}</td><td>× 2ᵏ, ÷ 2ᵏ (unsigned)</td></tr>
<tr><td>${cd('(x >> i) & 1')}</td><td>bit i</td></tr>
<tr><td>${cd('x | (1u << i)')}</td><td>set bit i</td></tr>
<tr><td>${cd('x & ~(1u << i)')}</td><td>clear bit i</td></tr>
<tr><td>${cd('x & (x - 1)')}</td><td>clear the lowest set bit</td></tr>
<tr><td>${cd('x & -x')}</td><td>keep only the lowest set bit</td></tr>
<tr><td>${cd('x ^ (x >> 1)')}</td><td>Gray code of x</td></tr></table>
<p>Use unsigned types for bit work: shifting into or out of the sign bit of a signed int is error-prone. ${cd('<bit>')} (C++20) provides ${cd('popcount(x)')} (number of 1 bits), ${cd('countr_zero(x)')} (trailing zeros), ${cd('bit_width(x)')} (bits needed, ⌊log₂ x⌋ + 1) and ${cd('has_single_bit(x)')} (power of two), all for unsigned arguments.</p>
<p><b>Powers of two.</b> x > 0 is a power of two exactly when ${cd('x & (x - 1)')} is 0.</p>
<p><b>Sets as masks.</b> Bit i of a mask says whether item i is in the set: union is |, intersection is &. Counting from 0 to 2ⁿ − 1 enumerates every subset of n items. The submasks of m, from m down to 1, are visited by</p>
${pre(T`for (unsigned s = m; s;
     s = (s - 1) & m)
  // use s`)}
<p>which runs 2^popcount(m) − 1 times.</p>
<p><b>XOR.</b> x ^ x = 0 and x ^ 0 = x, and xor is associative and commutative. XOR-ing a list in which every value appears twice except one leaves that one.</p>`,
      ex: { q: T`<p>For ${cd('unsigned x = 44;')} (binary 101100), what are ${cd('x & (x - 1)')}, ${cd('x & -x')}, ${cd('popcount(x)')} and ${cd('countr_zero(x)')}?</p>`, a: T`<p>Clearing the lowest set bit gives 101000 = 40. The lowest set bit alone is 100 = 4. Three bits are set, and there are two trailing zeros. Answers: 40, 4, 3, 2.</p>` },
      trap: T`Writing ${cd('x & 1 << i')} expecting ${cd('(x & 1) << i')}. Shifts bind tighter than ${cd('&')}, so it means ${cd('x & (1 << i)')}; parenthesize bit expressions.`,
      vary: [[T`${cd('12 ^ 10')}?`, 6, T`1100 ^ 1010 = 0110.`],
        [T`${cd('bit_width(37u)')}?`, 6, T`37 is 100101.`],
        [T`How many times does the submask loop run for m = 0b1011?`, 7, T`2³ − 1.`],
        [T`XOR of ${cd('{4, 7, 4, 9, 7}')}?`, 9, T`Pairs cancel.`]] }
  ]);


  // Programs that check each "Your turn" answer above (tools/cppvary.py compiles and runs them); null where the item is conceptual.
  const VCHK = {
    [U[0]]: [null, { b: 'int c = 0;\nfor (int i = 1; i < 100; i *= 2) c++;\ncout << c;' }, { b: 'int c = 0;\nfor (int i = 1; i * i <= 50; i++) c++;\ncout << c;' }, null],
    [U[1]]: [{ b: 'vector<int> v{1, 3, 3, 3, 7};\ncout << lower_bound(v.begin(), v.end(), 0) - v.begin();' }, { b: 'vector<int> v{1, 3, 3, 3, 7};\ncout << upper_bound(v.begin(), v.end(), 7) - v.begin();' }, { f: ['isqrt'], b: 'cout << isqrt(99);' }, { b: 'int n = 1000, c = 0;\nwhile (n > 1) { n = (n + 1) / 2; c++; }\ncout << c;' }],
    [U[2]]: [{ b: 'vector<int> v{9, 4, 7, 1, 5};\nnth_element(v.begin(), v.begin() + 2, v.end());\ncout << v[2];' }, { f: ['bubble'], b: 'cout << bubbleSwaps({3, 1, 2});' }, { f: ['bubble'], b: 'cout << bubbleSwaps({4, 3, 2, 1});' }, { b: 'vector<pair<int, char>> v{{1, \'b\'}, {0, \'z\'}, {1, \'a\'}};\nsort(v.begin(), v.end());\ncout << "(" << v[0].first << "," << v[0].second << ")";' }],
    [U[3]]: [{ f: ['bal'], b: 'cout << balanced("([)]");' }, { f: ['bal'], b: 'cout << balanced("[()()]");' }, { f: ['nge'], b: 'cout << nextGreater({5, 3, 8})[1];' }, { f: ['nge'], b: 'cout << nextGreater({5, 3, 8})[2];' }],
    [U[4]]: [{ b: 'priority_queue<int, vector<int>, greater<int>> pq;\nfor (int x : {5, 1, 9, 3, 7}) pq.push(x);\npq.pop(); pq.pop();\ncout << pq.top();' }, { b: 'cout << (9 - 1) / 2;' }, { b: 'cout << 2 * 4 + 1;' }, { b: 'int k = 2;\npriority_queue<int, vector<int>, greater<int>> pq;\nfor (int x : {4, 9, 2, 7}) { pq.push(x); if (pq.size() > k) pq.pop(); }\ncout << pq.top();' }],
    [U[5]]: [{ b: 'set<int> s{2, 5, 9};\ncout << *s.lower_bound(5);' }, { b: 'set<int> s{2, 5, 9};\ncout << *s.upper_bound(5);' }, { b: 'multiset<int> m{1, 3, 3, 3};\nm.erase(3);\ncout << m.size();' }, { b: 'multiset<int> m{1, 3, 3, 3};\nm.erase(m.find(3));\ncout << m.size();' }],
    [U[6]]: [{ f: ['pairs'], b: 'cout << countPairs({1, 2, 3, 4, 5, 6}, 7);' }, { f: ['longu'], b: 'cout << longestUnique("abcabcbb");' }, { f: ['minlen'], b: 'cout << minLen({2, 3, 1, 2, 4, 3}, 7);' }, { f: ['minlen'], b: 'cout << minLen({1, 1, 1}, 5);' }],
    [U[7]]: [{ b: 'string s = "aab";\nint c = 0;\ndo c++; while (next_permutation(s.begin(), s.end()));\ncout << c;' }, { b: 'string s = "abc";\nnext_permutation(s.begin(), s.end());\ncout << s;' }, { f: ['queens'], b: 'vector<int> col(6);\ncout << queens(6, 0, col);' }, { f: ['cnt'], b: 'cout << cnt({1, 2, 3}, 0, 3);' }],
    [U[8]]: [{ f: ['lis'], b: 'cout << lis({3, 1, 4, 1, 5, 9, 2, 6});' }, { f: ['edit'], b: 'cout << edit("kitten", "sitting");' }, { f: ['minc'], b: 'cout << minCoins({2}, 3);' }, { f: ['knap'], b: 'cout << knap({1, 3, 4}, {15, 20, 30}, 4);' }],
    [U[9]]: [{ f: ['bfs', 'dfs', 'comps'], b: 'G g(6);\nfor (auto [u, v] : vector<pair<int, int>>{{0, 1}, {0, 2}, {1, 3}, {2, 3}, {3, 4}}) { g[u].push_back(v); g[v].push_back(u); }\ncout << components(g);' }, { f: ['bfs', 'topo'], b: 'G g(4);\ng[2] = {0, 1};\ng[0] = {3};\ng[1] = {3};\nauto o = topo(g);\nfor (int i = 0; i < 4; i++) cout << o[i] << (i < 3 ? " " : "");' }, null],
    [U[10]]: [{ f: ['dsu'], b: 'DSU d(4);\nint ok = d.unite(0, 1) + d.unite(2, 3) + d.unite(1, 0);\ncout << ok;' }, { f: ['iv'], b: 'cout << maxDisjoint({{3, 1}, {5, 2}, {4, 3}, {7, 4}});' }, null],
    [U[11]]: [{ b: 'cout << (12 ^ 10);' }, { b: 'cout << bit_width(37u);' }, { b: 'unsigned m = 0b1011, c = 0;\nfor (unsigned s = m; s; s = (s - 1) & m) c++;\ncout << c;' }, { b: 'int r = 0;\nfor (int x : {4, 7, 4, 9, 7}) r ^= x;\ncout << r;' }]
  };
  for (const c of window.SUBJECTS.find(x => x.id === 'cppa').learn) (VCHK[c.title] || []).forEach((k, i) => { if (k && c.vary[i]) c.vary[i][3] = k; });
  window.CPP_F = F;

  addQuestions('cppa', [
    { id: 'caq1', skill: U[0], q: 'Which grows fastest?', c: ['2^n', 'n^3', 'n log n', 'n^2 log n'], x: 'Any exponential eventually exceeds any polynomial.' },
    { id: 'caq2', skill: U[0], q: 'An O(n^2) algorithm takes 1 second at n = 10,000. About how long at n = 100,000?', c: ['100 seconds', '10 seconds', '1000 seconds', '20 seconds'], x: '10 times the input, 100 times the work.' },
    { id: 'caq3', skill: U[1], q: 'What does lower_bound return when every element is less than x?', c: ['end()', 'begin()', 'an iterator to the last element', 'it throws'], x: 'The first element >= x does not exist, so the result is the end.' },
    { id: 'caq4', skill: U[1], q: 'Why write mid = lo + (hi - lo) / 2 instead of (lo + hi) / 2?', c: ['lo + hi can overflow', 'it rounds differently for all inputs', 'it is required by the standard', 'it is faster'], x: 'With large indices, lo + hi may exceed INT_MAX.' },
    { id: 'caq5', skill: U[2], q: 'Which call finds the median of a vector in O(n) average time?', c: ['nth_element', 'sort', 'partial_sort', 'stable_sort'], x: 'It places the k-th element correctly without sorting the rest.' },
    { id: 'caq6', skill: U[2], q: 'How many swaps does bubble sort make on an array with 7 inversions?', c: ['7', '49', '6', 'it depends on n only'], x: 'Each adjacent swap removes exactly one inversion.' },
    { id: 'caq7', skill: U[3], q: 'Which structure does breadth-first search use to hold the frontier?', c: ['a queue', 'a stack', 'a priority queue', 'a set'], x: 'First in, first out keeps nodes in order of distance.' },
    { id: 'caq8', skill: U[3], q: 'Why is the monotonic-stack pass O(n) despite its inner while loop?', c: ['Each index is pushed once and popped at most once', 'The inner loop runs at most once per step', 'The stack never holds more than 2 items', 'It is O(n^2)'], x: 'Total pops cannot exceed total pushes.' },
    { id: 'caq9', skill: U[4], q: 'What is the cost of building a heap from n elements with make_heap?', c: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n^2)'], x: 'Sifting down from the bottom levels sums to linear work.' },
    { id: 'caq10', skill: U[4], q: 'What does priority_queue<int> return from top()?', c: ['the largest element', 'the smallest element', 'the first element pushed', 'the last element pushed'], x: 'A max-heap by default.' },
    { id: 'caq11', skill: U[5], q: 'What does this print?', code: 'map<int, int> m;\nif (m[7] == 0) m[1] = 1;\ncout << m.size();', cpp: `${HEAD}int main() {\nmap<int, int> m;\nif (m[7] == 0) m[1] = 1;\ncout << m.size();\n}\n`, c: ['2', '1', '0', '3'], x: 'Reading m[7] inserts key 7 with value 0; then key 1 is added.' },
    { id: 'caq12', skill: U[5], q: 'Which is true of iterating an unordered_map?', c: ['The order is unspecified and may change after rehashing', 'Keys come out sorted', 'Keys come out in insertion order', 'Iteration is not allowed'], x: 'Use map for sorted order.' },
    { id: 'caq13', skill: U[6], q: 'Why does the shrinking window in minLen require positive values?', c: ['So that removing an element never increases the sum', 'So that the vector is sorted', 'To avoid overflow', 'It does not'], x: 'With negatives, shrinking can raise the sum and the logic fails.' },
    { id: 'caq14', skill: U[7], q: 'How many subsets does a set of 10 elements have?', c: ['1024', '100', '3628800', '10'], x: '2^10.' },
    { id: 'caq15', skill: U[7], q: 'next_permutation is called on "cba". What happens?', c: ['It returns false and the string becomes "abc"', 'It returns true and the string becomes "abc"', 'The string is unchanged', 'It throws'], x: 'From the last permutation it wraps to the first and reports false.' },
    { id: 'caq16', skill: U[8], q: 'What two properties make dynamic programming applicable?', c: ['Overlapping subproblems and optimal substructure', 'Sorted input and unique keys', 'Linear time and constant space', 'Recursion and randomness'], x: 'Stored sub-answers are reused, and optimal answers combine optimal sub-answers.' },
    { id: 'caq17', skill: U[8], q: 'In the coin-combinations DP, looping over amounts outside and coins inside counts:', c: ['ordered sequences of coins', 'combinations', 'the fewest coins', 'the same thing'], x: 'Then 1+2 and 2+1 are counted separately.' },
    { id: 'caq18', skill: U[9], q: "Kahn's algorithm outputs fewer than n nodes. What does that show?", c: ['The graph has a directed cycle', 'The graph is disconnected', 'The graph is a tree', 'Nothing'], x: 'Nodes on a cycle never reach in-degree 0.' },
    { id: 'caq19', skill: U[10], q: 'Why does Dijkstra skip heap entries with du > d[u]?', c: ['They are stale: u was already settled with a shorter distance', 'They are negative', 'They would overflow', 'They are duplicates of the source'], x: 'Lazy deletion leaves old entries in the heap.' },
    { id: 'caq20', skill: U[10], q: 'Which algorithm handles negative edge weights (with no negative cycle)?', c: ['Bellman-Ford', 'Dijkstra', 'BFS', 'Kruskal'], x: 'It relaxes every edge n - 1 times.' },
    { id: 'caq21', skill: U[11], q: 'What does x & (x - 1) == 0 test, for x > 0?', c: ['x is a power of two', 'x is even', 'x is zero', 'x is odd'], x: 'A power of two has a single set bit, which the expression clears.' },
    { id: 'caq22', skill: U[11], q: 'Why prefer unsigned types for bit manipulation?', c: ['Shifts and wraparound are fully defined and no sign bit interferes', 'They are faster', 'Signed types have no bitwise operators', 'popcount requires 64 bits'], x: 'Right shifts of negative values and shifts into the sign bit are traps.' }
  ]);

  // ---------- generators ----------
  registerUnitGens('cppa', { units: {
    [U[0]]: [{ id: 'ca-count', make(R) {
      const f = R.int(0, 5), L = [
        ['for (int i = 0; i < n; i++)\n  for (int j = 0; j < i; j++)\n    c++;', () => R.int(5, 60), 'O(n^2)', 'The inner loop runs i times: the total is 0 + 1 + ... + (n - 1) = n(n - 1)/2.'],
        ['for (int i = 1; i < n; i *= 2)\n  c++;', () => R.int(2, 5000), 'O(log n)', 'i doubles: 1, 2, 4, ... below n.'],
        ['for (int i = 0; i < n; i++)\n  for (int j = 1; j < n; j *= 2)\n    c++;', () => R.int(5, 100), 'O(n log n)', 'n outer passes, each with a doubling inner loop.'],
        ['for (int i = n; i > 0; i /= 3)\n  c++;', () => R.int(2, 5000), 'O(log n)', 'i shrinks by a factor of 3 each pass.'],
        ['for (int i = 1; i * i <= n; i++)\n  c++;', () => R.int(5, 5000), 'O(sqrt n)', 'i runs up to floor(sqrt n).'],
        ['for (int i = 0; i < n; i++)\n  for (int j = 0; j < i; j++)\n    for (int k = 0; k < j; k++)\n      c++;', () => R.int(3, 25), 'O(n^3)', 'Once per choice of indices k < j < i < n: n(n - 1)(n - 2)/6.']][f];
      const sim = n => { let c = 0; if (f === 0) for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) c++; else if (f === 1) for (let i = 1; i < n; i *= 2) c++; else if (f === 2) for (let i = 0; i < n; i++) for (let j = 1; j < n; j *= 2) c++; else if (f === 3) for (let i = n; i > 0; i = Math.trunc(i / 3)) c++; else if (f === 4) for (let i = 1; i * i <= n; i++) c++; else for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) for (let k2 = 0; k2 < j; k2++) c++; return c; };
      if (R.int(0, 2) === 0) {
        const classes = ['O(1)', 'O(log n)', 'O(sqrt n)', 'O(n)', 'O(n log n)', 'O(n^2)', 'O(n^3)'];
        return { q: 'How does the number of times c++ runs grow with n?', code: L[0], concept: true, c: [L[2], ...R.shuffle(classes.filter(x => x !== L[2])).slice(0, 3)], x: L[3] };
      }
      const n = L[1](), ans = sim(n);
      return nq(`int n = ${n}, c = 0;\n${L[0]}\ncout << c;`, '', ans, `${L[3]} For n = ${n}: ${ans}.`);
    } }],
    [U[1]]: [{ id: 'ca-bsearch', make(R) {
      const k = R.int(0, 2);
      if (k === 2) { const n = R.int(2, 1000000), r = Math.floor(Math.sqrt(n)), rr = (r + 1) * (r + 1) <= n ? r + 1 : r * r > n ? r - 1 : r;
        return ref(`What does the lesson's isqrt(${n}) return?`, ['isqrt'], `cout << isqrt(${n});`, rr, `The largest r with r^2 <= ${n}: ${rr}^2 = ${rr * rr}, and ${rr + 1}^2 = ${(rr + 1) ** 2} is too big.`); }
      const v = R.vec(R.int(6, 8), 1, 15).sort((a, b) => a - b), x = R.pick([...v, R.int(0, 17), R.int(0, 17)]);
      const lo = v.findIndex(y => y >= x), up = v.findIndex(y => y > x), L = lo < 0 ? v.length : lo, Up = up < 0 ? v.length : up;
      if (k === 1) return nq(`${vdecl('int', v)}\n${BE}\nint x = ${x};\ncout << upper_bound(b, e, x)\n      - lower_bound(b, e, x);`, '', Up - L, `The copies of ${x} occupy indices ${L} to ${Up - 1}${Up === L ? ' (none)' : ''}: upper bound ${Up} minus lower bound ${L}.`);
      const fn = R.pick(['lower_bound', 'upper_bound']), ans = fn === 'lower_bound' ? L : Up;
      return nq(`${vdecl('int', v)}\n${BE}\nint x = ${x};\nauto it = ${fn}(b, e, x);\ncout << it - b;`, '', ans,
        `${fn} finds the first element ${fn === 'lower_bound' ? '>=' : '>'} ${x}: ${ans < v.length ? `${v[ans]} at index ${ans}` : `none, so e, whose index is ${v.length}`}.`);
    } }],
    [U[2]]: [{ id: 'ca-sort', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const v = R.vec(R.int(6, 9), 1, 60), kk = R.int(0, v.length - 1), s = v.slice().sort((a, b) => a - b);
        return nq(`${vdecl('int', v)}\n${BE}\nnth_element(b, b + ${kk}, e);\ncout << v[${kk}];`, '', s[kk], `v[${kk}] becomes the element that sorted order puts there: ${s.join(' ')}.`); }
      if (k === 1) { const v = R.vec(R.int(4, 7), 1, 30);
        let inv = 0; for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) if (v[i] > v[j]) inv++;
        return ref(`What does the lesson's bubbleSwaps(${arr(v)}) return?`, ['bubble'], `cout << bubbleSwaps(${arr(v)});`, inv, `Bubble sort makes one swap per inversion, a pair i < j with v[i] > v[j]. Counting them: ${inv}.`); }
      const n = R.int(5, 6), keys = Array.from({ length: n }, () => R.int(1, 3)), chars = R.shuffle('abcdefgh'.split('')).slice(0, n), ps = keys.map((k2, i) => [k2, chars[i]]);
      const lines = []; for (let i = 0; i < n; i += 3) lines.push('  ' + ps.slice(i, i + 3).map(([a, c]) => `{${a}, '${c}'}`).join(', ') + (i + 3 >= n ? '};' : ','));
      const decl = `vector<pair<int, char>> v{\n${lines.join('\n')}`;
      if (k === 2) {
        const desc = R.int(0, 1), st = ps.map((p, i) => [p, i]).sort((x, y) => (desc ? y[0][0] - x[0][0] : x[0][0] - y[0][0]) || x[1] - y[1]).map(x => x[0][1]).join('');
        const lex = ps.slice().sort((x, y) => (desc ? y[0] - x[0] : x[0] - y[0]) || (x[1] < y[1] ? -1 : 1)).map(x => x[1]).join('');
        const rev = ps.map((p, i) => [p, i]).sort((x, y) => (desc ? y[0][0] - x[0][0] : x[0][0] - y[0][0]) || y[1] - x[1]).map(x => x[0][1]).join('');
        return oq(`${decl}\n${BE}\nauto cmp = [](auto x, auto y) {\n  return x.first ${desc ? '>' : '<'} y.first;\n};\nstable_sort(b, e, cmp);\nfor (auto [k, c] : v) cout << c;`, '', st, [lex, rev, ps.map(p => p[1]).join('')],
          `stable_sort orders by the number (${desc ? 'descending' : 'ascending'}) and keeps equal numbers in input order: ${st}.`);
      }
      const lex = ps.slice().sort((x, y) => x[0] - y[0] || (x[1] < y[1] ? -1 : 1)).map(x => x[1]).join(''), stab = ps.map((p, i) => [p, i]).sort((x, y) => x[0][0] - y[0][0] || x[1] - y[1]).map(x => x[0][1]).join('');
      return oq(`${decl}\nsort(v.begin(), v.end());\nfor (auto [k, c] : v) cout << c;`, '', lex, [stab, ps.slice().sort((x, y) => y[0] - x[0] || (x[1] < y[1] ? -1 : 1)).map(x => x[1]).join(''), ps.map(p => p[1]).join('')],
        `Pairs compare by first, then by second, so ties on the number are ordered by the letter: ${lex}.`);
    } }],
    [U[3]]: [{ id: 'ca-stack', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const isQ = R.int(0, 1), vals = R.vec(R.int(4, 6), 1, 9), pops = R.int(1, 2), more = R.vec(R.int(0, 2), 1, 9);
        const run = fifo => { const a = []; vals.forEach(x => a.push(x)); for (let i = 0; i < pops; i++) fifo ? a.shift() : a.pop(); more.forEach(x => a.push(x)); return `${fifo ? a[0] : a[a.length - 1]} ${a.length}`; };
        const nm = isQ ? 'q' : 's', look = isQ ? 'front()' : 'top()';
        return oq(`${isQ ? 'queue' : 'stack'}<int> ${nm};\nfor (int x : ${arr(vals)})\n  ${nm}.push(x);\n${`${nm}.pop();\n`.repeat(pops)}${more.map(x => `${nm}.push(${x});`).join('\n')}${more.length ? '\n' : ''}cout << ${nm}.${look} << ' ';\ncout << ${nm}.size();`, '', run(isQ), [run(!isQ), `${isQ ? vals[pops] : vals[vals.length - 1]} ${vals.length + more.length}`, `${vals[0]} ${vals.length - pops + more.length}`, run(isQ).replace(/ (\d+)$/, (m, d) => ` ${+d + 1}`), run(isQ).replace(/ (\d+)$/, (m, d) => ` ${+d - 1}`)],
          `A ${isQ ? 'queue removes the oldest item and its front is the oldest remaining' : 'stack removes the newest item and its top is the newest remaining'}. Output: ${run(isQ)}.`);
      }
      if (k === 1) {
        let s = ''; const L = R.int(4, 8); for (let i = 0; i < L; i++) s += R.pick(['(', ')', '[', ']', '(', '[']);
        if (R.int(0, 1)) { const B = ['()', '[]', '([])', '[()]', '()[]', '(())', '[[]]', '([]())', '[()()]']; s = R.pick(B) + (R.int(0, 2) ? '' : R.pick(B)); }
        let t = s, prev; do { prev = t; t = t.replace(/\(\)|\[\]/g, ''); } while (t !== prev);
        const ok = t === '' ? 1 : 0;
        return ref(`Does the lesson's balanced("${s}") return true? Enter 1 for true, 0 for false.`, ['bal'], `cout << balanced("${s}");`, ok,
          ok ? 'Every closer meets the matching opener on top of the stack, and the stack ends empty.' : 'Either a closer meets the wrong opener (or none), or openers are left on the stack.');
      }
      if (k === 2) {
        const v = R.vec(R.int(5, 7), 1, 9), res = v.map((x, i) => { for (let j = i + 1; j < v.length; j++) if (v[j] > x) return v[j]; return -1; }), i = R.int(0, v.length - 1), sum = R.int(0, 1);
        return ref(sum ? `What is the sum of the vector returned by the lesson's nextGreater(${arr(v)})?` : `For the lesson's nextGreater(${arr(v)}), what is the element at index ${i}?`, ['nge'],
          `auto r = nextGreater(${arr(v)});\n${sum ? 'cout << accumulate(r.begin(), r.end(), 0);' : `cout << r[${i}];`}`, sum ? res.reduce((a, b) => a + b, 0) : res[i],
          `For each element, the first larger value to its right, or -1: ${res.join(', ')}.`);
      }
      const ops = [], dq = [];
      for (let t = 0; t < 6; t++) { const o = dq.length < 2 ? R.int(0, 1) : R.int(0, 3), x = R.int(1, 9);
        if (o === 0) { ops.push(`d.push_back(${x});`); dq.push(x); } else if (o === 1) { ops.push(`d.push_front(${x});`); dq.unshift(x); } else if (o === 2) { ops.push('d.pop_back();'); dq.pop(); } else { ops.push('d.pop_front();'); dq.shift(); } }
      if (!dq.length) return this.make(R);
      const right = `${dq[0]} ${dq[dq.length - 1]}`;
      return oq(`deque<int> d;\n${ops.join('\n')}\ncout << d.front() << ' ';\ncout << d.back();`, '', right, [`${dq[dq.length - 1]} ${dq[0]}`, `${dq[0]} ${dq[0]}`, `${dq[dq.length - 1]} ${dq[dq.length - 1]}`, `${dq[1] != null ? dq[1] : 0} ${dq[0]}`, `${dq[0] + 1} ${dq[dq.length - 1]}`, `${dq[0]} ${dq[dq.length - 1] + 1}`],
        `Tracking the deque after each operation leaves ${dq.join(' ')}: front ${dq[0]}, back ${dq[dq.length - 1]}.`);
    } }],
    [U[4]]: [{ id: 'ca-heap', make(R) {
      const k = R.int(0, 2), v = R.vec(R.int(5, 7), 1, 50);
      if (k === 0) {
        const mn = R.int(0, 1), pops = R.int(0, 3), s = v.slice().sort((a, b) => mn ? a - b : b - a);
        return nq(`${mn ? 'priority_queue<int, vector<int>,\n               greater<int>> pq;' : 'priority_queue<int> pq;'}\n${vdecl('int', v)}\nfor (int x : v)\n  pq.push(x);\n${'pq.pop();\n'.repeat(pops)}cout << pq.top();`, '', s[pops],
          `A ${mn ? 'min' : 'max'}-heap releases values in ${mn ? 'increasing' : 'decreasing'} order: ${s.join(', ')}. After ${pops} pop${pops === 1 ? '' : 's'} the top is ${s[pops]}.`);
      }
      if (k === 1) {
        const K = R.int(2, 4), s = v.slice().sort((a, b) => b - a);
        return nq(`int k = ${K};\npriority_queue<int, vector<int>,\n               greater<int>> pq;\n${vdecl('int', v)}\nfor (int x : v) {\n  pq.push(x);\n  if (pq.size() > k) pq.pop();\n}\ncout << pq.top();`, '', s[K - 1],
          `The min-heap keeps the ${K} largest values seen; its top is the smallest of them, the ${K}-th largest: ${s[K - 1]}.`);
      }
      const s = v.slice().sort((a, b) => b - a), t = R.int(1, 2);
      return nq(`${vdecl('int', v)}\nmake_heap(v.begin(), v.end());\n${'pop_heap(v.begin(), v.end());\nv.pop_back();\n'.repeat(t)}cout << v.front();`, '', s[t],
        `make_heap puts the maximum at the front; each pop_heap moves it to the back, where pop_back removes it. After ${t}, the front is the ${t + 1}${t === 1 ? 'nd' : 'rd'} largest: ${s[t]}.`);
    } }],
    [U[5]]: [{ id: 'ca-hash', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const w = R.pick(['banana', 'mississippi', 'abracadabra', 'arbitrage', 'volatility', 'settlement', 'orderbook']), cs = [...new Set(w)];
        const q = R.int(0, 2) ? R.pick(cs) : R.pick('zqxw'.split('')), cntq = [...w].filter(c => c === q).length, size = cs.length + (cs.includes(q) ? 0 : 1);
        return oq(`string s = "${w}";\nunordered_map<char, int> f;\nfor (char c : s) f[c]++;\ncout << f['${q}'] << ' ';\ncout << f.size();`, '', `${cntq} ${size}`, [`${cntq} ${cs.length}`, `${cntq} ${w.length}`, `${cntq + 1} ${size}`, `${cntq} ${size + 1}`],
          `'${q}' appears ${cntq} time${cntq === 1 ? '' : 's'}. ${cs.includes(q) ? `There are ${cs.length} distinct letters.` : `Reading f['${q}'] inserts it with count 0, so the ${cs.length} distinct letters become ${size} keys.`}`);
      }
      if (k === 1) {
        const ws = R.sample(['bid', 'ask', 'fill', 'cancel', 'quote', 'trade', 'mid'], 4), seq = [...ws, R.pick(ws), R.pick(ws)];
        const cnt = {}; seq.forEach(x => cnt[x] = (cnt[x] || 0) + 1); const sorted = Object.keys(cnt).sort(), ins = [...new Set(seq)];
        const fmt = ks => ks.map(x => `${x}${cnt[x]}`).join(' ');
        return oq(`${vdecl('string', seq.map(x => `"${x}"`), 'ws')}\nmap<string, int> m;\nfor (auto& w : ws) m[w]++;\nfor (auto& [k, v] : m)\n  cout << k << v << ' ';`, '', fmt(sorted), [fmt(ins), fmt(sorted.slice().reverse()), sorted.map(x => `${x}1`).join(' ')],
          `A map iterates in sorted key order, whatever the insertion order, with each count accumulated: ${fmt(sorted)}.`);
      }
      if (k === 2) {
        const v = R.sample([...Array(40).keys()].map(i => i + 1), R.int(4, 6)).sort((a, b) => a - b), x = R.int(1, v[v.length - 1] - 1), up = R.int(0, 1), ans = v.find(y => up ? y > x : y >= x);
        return nq(`${cdecl('set<int>', v, 's')}\ncout << *s.${up ? 'upper' : 'lower'}_bound(${x});`, '', ans, `The first element ${up ? '>' : '>='} ${x} in sorted order ${v.join(', ')}: ${ans}.`);
      }
      const base = R.vec(R.int(5, 8), 1, 5).sort((a, b) => a - b), x = R.pick(base), one = R.int(0, 1), c = base.filter(y => y === x).length;
      return nq(`${cdecl('multiset<int>', base, 'm')}\nm.erase(${one ? `m.find(${x})` : x});\ncout << m.size();`, '', base.length - (one ? 1 : c), one ? `erase with an iterator removes one copy of ${x}: ${base.length} - 1.` : `erase by value removes all ${c} cop${c === 1 ? 'y' : 'ies'} of ${x}: ${base.length} - ${c}.`);
    } }],
    [U[6]]: [{ id: 'ca-window', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const v = R.sample([...Array(20).keys()].map(i => i + 1), R.int(5, 8)), t = R.pick(v) + R.pick(v); let n = 0; for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) if (v[i] + v[j] === t) n++;
        return ref(`What does the lesson's countPairs(${arr(v)}, ${t}) return?`, ['pairs'], `cout << countPairs(${arr(v)}, ${t});`, n, `Pairs of distinct elements summing to ${t}: ${n}.`); }
      if (k === 1) { const v = Array.from({ length: R.int(6, 9) }, () => R.int(-9, 12)), K = R.int(2, 4); let best = -Infinity; for (let i = 0; i + K <= v.length; i++) best = Math.max(best, v.slice(i, i + K).reduce((a, b) => a + b, 0));
        return ref(`What does the lesson's maxWindow(${arr(v)}, ${K}) return?`, ['maxwin'], `cout << maxWindow(${arr(v)}, ${K});`, best, `The largest sum of ${K} consecutive elements: ${best}.`); }
      if (k === 2) { const s = Array.from({ length: R.int(6, 11) }, () => R.pick('abcde'.split(''))).join(''); let best = 0; for (let i = 0; i < s.length; i++) for (let j = i; j < s.length; j++) if (new Set(s.slice(i, j + 1)).size === j - i + 1) best = Math.max(best, j - i + 1);
        return ref(`What does the lesson's longestUnique("${s}") return?`, ['longu'], `cout << longestUnique("${s}");`, best, `The longest substring with no repeated letter has length ${best}.`); }
      const v = R.vec(R.int(5, 8), 1, 9), S = R.int(5, 30); let best = 0; for (let i = 0; i < v.length; i++) { let s = 0; for (let j = i; j < v.length; j++) { s += v[j]; if (s >= S) { if (!best || j - i + 1 < best) best = j - i + 1; break; } } }
      return ref(`What does the lesson's minLen(${arr(v)}, ${S}) return?`, ['minlen'], `cout << minLen(${arr(v)}, ${S});`, best, best ? `The shortest run of consecutive elements summing to at least ${S} has length ${best}.` : `Even the whole array sums to less than ${S}, so 0.`);
    } }],
    [U[7]]: [{ id: 'ca-backtrack', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const v = R.vec(R.int(4, 7), 1, 9), t = R.int(4, 15), n = subsets(v).filter(s => s.reduce((a, b) => a + b, 0) === t).length;
        return ref(`What does the lesson's cnt(${arr(v)}, 0, ${t}) return?`, ['cnt'], `cout << cnt(${arr(v)}, 0, ${t});`, n, `Trying all ${2 ** v.length} subsets, ${n} sum to ${t} (equal values at different positions count separately).`); }
      if (k === 3) { const n = R.int(4, 8); let c = 0; const col = []; const place = r => { if (r === n) { c++; return; } for (let x = 0; x < n; x++) { if (col.some((y, i) => y === x || Math.abs(y - x) === r - i)) continue; col[r] = x; place(r + 1); } col.length = r; }; place(0);
        return ref(`What does the lesson's queens(${n}, 0, col) return, with col a vector of size ${n}?`, ['queens'], `vector<int> col(${n});\ncout << queens(${n}, 0, col);`, c, `There are ${c} ways to place ${n} non-attacking queens.`); }
      const nextPerm = a => { a = a.slice(); let i = a.length - 2; while (i >= 0 && a[i] >= a[i + 1]) i--; if (i < 0) return [a.reverse(), false]; let j = a.length - 1; while (a[j] <= a[i]) j--; [a[i], a[j]] = [a[j], a[i]]; const tail = a.splice(i + 1).reverse(); return [a.concat(tail), true]; };
      if (k === 1) {
        const base = R.shuffle(R.pick(['abcd', 'abcde', 'aabc', 'abbc', 'xyz', 'pqrs']).split('')), [np] = nextPerm(base), s = base.join('');
        const sortedAll = s.split('').sort().join(''), prevGuess = (() => { const a = base.slice(); let i = a.length - 2; while (i >= 0 && a[i] <= a[i + 1]) i--; if (i < 0) return a.reverse().join(''); let j = a.length - 1; while (a[j] >= a[i]) j--; [a[i], a[j]] = [a[j], a[i]]; return a.slice(0, i + 1).concat(a.slice(i + 1).reverse()).join(''); })();
        const swapOnly = (() => { const a = base.slice(); let i = a.length - 2; while (i >= 0 && a[i] >= a[i + 1]) i--; if (i < 0) return a.slice().reverse().join(''); let j = a.length - 1; while (a[j] <= a[i]) j--; [a[i], a[j]] = [a[j], a[i]]; return a.join(''); })();
        return oq(`string s = "${s}";\nauto b = s.begin(), e = s.end();\nnext_permutation(b, e);\ncout << s;`, '', np.join(''), [swapOnly, prevGuess, sortedAll, s.split('').reverse().join('')],
          `Find the rightmost i with s[i] < s[i + 1], swap s[i] with the rightmost larger char, and reverse the suffix after i${np.join('') === sortedAll ? '; from the last arrangement it wraps to sorted order' : ''}: ${np.join('')}.`);
      }
      const w = R.pick(['abcd', 'aabb', 'aabc', 'abc', 'aaabb', 'abcde', 'aabbc']), start = R.int(0, 2) ? w : R.shuffle(w.split('')).join('');
      let c = 0, cur = start.split(''), ok = true; while (ok) { c++; [cur, ok] = nextPerm(cur); }
      const cnts = {}; [...w].forEach(ch => cnts[ch] = (cnts[ch] || 0) + 1); const total = fact(w.length) / Object.values(cnts).reduce((a, b) => a * fact(b), 1);
      return nq(`string s = "${start}";\nauto b = s.begin(), e = s.end();\nint c = 0;\ndo c++;\nwhile (next_permutation(b, e));\ncout << c;`, '', c,
        start === [...start].sort().join('') ? `From sorted order the loop visits every distinct arrangement once: ${w.length}! divided by the factorials of the repeat counts = ${total}.` : `The loop starts at "${start}", not at sorted order, so it counts only the arrangements from there to the last: ${c} of ${total}.`);
    } }],
    [U[8]]: [{ id: 'ca-dp', make(R) {
      const k = R.int(0, 4);
      if (k === 0) { const coins = R.sample([1, 2, 3, 5, 7, 10], R.int(2, 4)).sort((a, b) => a - b), amt = R.int(5, 30);
        const memo = new Map(), go = (i, a) => { if (a === 0) return 1; if (i === coins.length || a < 0) return 0; const key = i + ',' + a; if (!memo.has(key)) memo.set(key, go(i, a - coins[i]) + go(i + 1, a)); return memo.get(key); };
        const ans = go(0, amt);
        return ref(`What does the lesson's ways(${arr(coins)}, ${amt}) return?`, ['ways'], `cout << ways(${arr(coins)}, ${amt});`, ans, `Counting combinations (order ignored) of coins ${coins.join(', ')} that make ${amt}: ${ans}.`); }
      if (k === 1) { const coins = R.sample([2, 3, 4, 5, 7, 9, 10], R.int(2, 3)).sort((a, b) => a - b), amt = R.int(5, 40);
        const dist = new Map([[0, 0]]); let frontier = [0]; while (frontier.length) { const nx = []; for (const a of frontier) for (const c of coins) { const b = a + c; if (b <= amt && !dist.has(b)) { dist.set(b, dist.get(a) + 1); nx.push(b); } } frontier = nx; }
        const ans = dist.has(amt) ? dist.get(amt) : -1;
        return ref(`What does the lesson's minCoins(${arr(coins)}, ${amt}) return?`, ['minc'], `cout << minCoins(${arr(coins)}, ${amt});`, ans, ans < 0 ? `No combination of ${coins.join(', ')} makes ${amt}.` : `The fewest coins from ${coins.join(', ')} making ${amt}: ${ans}.`); }
      if (k === 2) { const v = R.vec(R.int(6, 9), 1, 20), d = v.map(() => 1); for (let i = 0; i < v.length; i++) for (let j = 0; j < i; j++) if (v[j] < v[i]) d[i] = Math.max(d[i], d[j] + 1); const ans = Math.max(...d);
        return ref(`What does the lesson's lis(${arr(v)}) return?`, ['lis'], `cout << lis(${arr(v)});`, ans, `The longest strictly increasing subsequence has length ${ans}.`); }
      if (k === 3) { const n = R.int(3, 5), w = R.vec(n, 1, 6), val = R.vec(n, 5, 40), W = R.int(5, 12); let best = 0; for (const s of subsets([...w.keys()])) { const ww = s.reduce((a, i) => a + w[i], 0); if (ww <= W) best = Math.max(best, s.reduce((a, i) => a + val[i], 0)); }
        return ref(`What does the lesson's knap(${arr(w)}, ${arr(val)}, ${W}) return?`, ['knap'], `cout << knap(${arr(w)}, ${arr(val)}, ${W});`, best, `Checking every subset of items with total weight at most ${W}, the best value is ${best}.`); }
      const P = [['kitten', 'sitting'], ['flaw', 'lawn'], ['intention', 'execution'], ['bid', 'bad'], ['hedge', 'edge'], ['spread', 'spear'], ['long', 'along'], ['trade', 'tread'], ['market', 'basket'], ['quote', 'quota']];
      const [a, b] = R.pick(P), memo = new Map(), ed = (i, j) => { if (!i || !j) return i + j; const key = i * 100 + j; if (!memo.has(key)) memo.set(key, Math.min(ed(i - 1, j) + 1, ed(i, j - 1) + 1, ed(i - 1, j - 1) + (a[i - 1] !== b[j - 1] ? 1 : 0))); return memo.get(key); };
      const ans = ed(a.length, b.length);
      return ref(`What does the lesson's edit("${a}", "${b}") return?`, ['edit'], `cout << edit("${a}", "${b}");`, ans, `The fewest single-character insertions, deletions and substitutions turning ${a} into ${b}: ${ans}.`);
    } }],
    [U[9]]: [{ id: 'ca-graph', make(R) {
      const k = R.int(0, 3), n = R.int(5, 7);
      if (k === 3) {
        // Random DAG: orient edges along a hidden random order.
        const ord = R.shuffle([...Array(n).keys()]), pos = ord.map((_, i) => ord.indexOf(i)), es = [];
        const seen = new Set(); while (es.length < R.int(n - 1, n + 2)) { const a = R.int(0, n - 1), b = R.int(0, n - 1); if (a === b) continue; const [u, v] = pos[a] < pos[b] ? [a, b] : [b, a]; const key = u + '>' + v; if (seen.has(key)) continue; seen.add(key); es.push([u, v]); }
        const indeg = Array(n).fill(0); es.forEach(([, v]) => indeg[v]++); const out = [], done = new Set();
        while (out.length < n) { const u = [...Array(n).keys()].find(x => !done.has(x) && es.filter(([a, b]) => b === x && !done.has(a)).length === 0); done.add(u); out.push(u); }
        const outMax = []; const done2 = new Set(); while (outMax.length < n) { const c = [...Array(n).keys()].filter(x => !done2.has(x) && es.filter(([a, b]) => b === x && !done2.has(a)).length === 0); const u = Math.max(...c); done2.add(u); outMax.push(u); }
        const right = out.join(' ');
        return { q: `A directed graph on nodes 0 to ${n - 1} has edges ${es.map(([u, v]) => `${u}->${v}`).join(', ')}. What order does the lesson's topo return?`,
          cpp: withF(['bfs', 'topo'], `${buildG(n, es, true)}\nfor (int u : topo(g)) cout << u << ' ';`), c: mc(right, [outMax.join(' '), out.slice().reverse().join(' '), [...Array(n).keys()].join(' '), ord.join(' ')]),
          x: `Kahn's algorithm with a min-heap: at each step output the smallest node whose predecessors are all done. Order: ${right}.` };
      }
      const conn = k !== 1 || R.int(0, 2) === 0, es = graph(R, n, R.int(n - 1, n + 2) - (conn ? 0 : 2), conn);
      if (k === 1) { const p = [...Array(n).keys()], find = x => p[x] === x ? x : (p[x] = find(p[x])); es.forEach(([u, v]) => { p[find(u)] = find(v); }); const c = new Set([...Array(n).keys()].map(find)).size;
        return ref(`An undirected graph on nodes 0 to ${n - 1} has edges ${edgeText(es)}. What does the lesson's components return?`, ['bfs', 'dfs', 'comps'], `${buildG(n, es)}\ncout << components(g);`, c, `Merging the endpoints of every edge leaves ${c} separate group${c > 1 ? 's' : ''}${c === n ? ', every node alone' : ''}.`); }
      if (k === 0) { const D = floyd(n, es), t = R.int(1, n - 1), ans = D[0][t] === Infinity ? -1 : D[0][t];
        return ref(`An undirected graph on nodes 0 to ${n - 1} has edges ${edgeText(es)}. With d = bfs(g, 0) from the lesson, what is d[${t}]?`, ['bfs'], `${buildG(n, es)}\ncout << bfs(g, 0)[${t}];`, ans, ans < 0 ? `Node ${t} is not reachable from 0.` : `A shortest path from 0 to ${t} uses ${ans} edge${ans === 1 ? '' : 's'}.`); }
      const g = adj(n, es), seen = Array(n).fill(false), order = [], go = u => { seen[u] = true; order.push(u); for (const v of g[u]) if (!seen[v]) go(v); }; go(0);
      const bq = [0], bs = new Set([0]), border = []; while (bq.length) { const u = bq.shift(); border.push(u); for (const v of g[u]) if (!bs.has(v)) { bs.add(v); bq.push(v); } }
      const seen2 = Array(n).fill(false), rorder = [], go2 = u => { seen2[u] = true; rorder.push(u); for (const v of g[u].slice().reverse()) if (!seen2[v]) go2(v); }; go2(0);
      const right = order.join(' ');
      if (right === border.join(' ') && !this._retry) { this._retry = true; try { return this.make(R); } finally { this._retry = false; } }
      return { q: `An undirected graph on nodes 0 to ${n - 1} has edges ${edgeText(es)}, with each adjacency list sorted. In what order does the lesson's dfs from 0 first visit the nodes?`,
        cpp: withF(['bfs', 'dfs'], `${buildG(n, es)}\nvector<bool> seen(${n});\nvector<int> order;\ndfs(g, 0, seen, order);\nfor (int u : order) cout << u << ' ';`), c: mc(right, [border.join(' '), rorder.join(' '), order.slice().sort((a, b) => a - b).join(' '), order.slice(0, 1).concat(order.slice(1).reverse()).join(' ')]),
        x: `DFS follows the smallest unvisited neighbor as deep as possible, backtracking when stuck: ${right}.${right !== border.join(' ') ? ` (BFS would visit ${border.join(' ')}.)` : ''}` };
    } }],
    [U[10]]: [{ id: 'ca-paths', make(R) {
      const k = R.int(0, 3), n = R.int(4, 6);
      if (k <= 1) {
        const es = graph(R, n, R.int(n, n + 3), true), w = es.map(() => R.int(1, 9)), wt = es.map(([u, v], i) => `${u}-${v} (${w[i]})`).join(', ');
        if (k === 0) { const D = floyd(n, es, w), direct = t => { const i = es.findIndex(([u, v]) => (u === 0 && v === t) || (v === 0 && u === t)); return i < 0 ? Infinity : w[i]; }, good = [...Array(n).keys()].filter(t => t > 0 && D[0][t] < direct(t)), t = good.length ? R.pick(good) : R.int(1, n - 1);
          return ref(`Weighted undirected edges: ${wt}. With the lesson's dijkstra from node 0, what is the distance to node ${t}?`, ['dij'],
            `WG g(${n});\nfor (auto [u, v, w] : vector<array<int, 3>>${arr(es.map(([u, v], i) => arr([u, v, w[i]])))}) {\n  g[u].push_back({v, w});\n  g[v].push_back({u, w});\n}\ncout << dijkstra(g, 0)[${t}];`, D[0][t], `The cheapest path from 0 to ${t} costs ${D[0][t]}.`); }
        // Prim's algorithm as the independent check.
        const inT = new Set([0]); let total = 0; while (inT.size < n) { let best = null; es.forEach(([u, v], i) => { if (inT.has(u) !== inT.has(v) && (!best || w[i] < best[0])) best = [w[i], inT.has(u) ? v : u]; }); total += best[0]; inT.add(best[1]); }
        return ref(`Weighted undirected edges on nodes 0 to ${n - 1}: ${wt}. What does the lesson's mst return?`, ['dsu', 'mst'], `cout << mst(${n}, ${arr(es.map(([u, v], i) => arr([w[i], u, v])))});`, total, `A minimum spanning tree uses ${n - 1} edges with total weight ${total}.`);
      }
      if (k === 2) {
        const m = R.int(4, 6), pairs = Array.from({ length: m }, () => { let a, b; do { a = R.int(0, n - 1); b = R.int(0, n - 1); } while (a === b); return [a, b]; });
        const lab = [...Array(n).keys()]; let ok = 0; for (const [a, b] of pairs) { if (lab[a] !== lab[b]) { ok++; const old = lab[a]; for (let i = 0; i < n; i++) if (lab[i] === old) lab[i] = lab[b]; } }
        const comps = R.int(0, 1);
        return { q: `DSU is the union-find structure from the lesson. What does this print?`, code: `DSU d(${n});\nint ok = 0;\n${pairs.map(([a, b]) => `ok += d.unite(${a}, ${b});`).join('\n')}\ncout << ${comps ? `${n} - ok` : 'ok'};`,
          cpp: withF(['dsu'], `DSU d(${n});\nint ok = 0;\n${pairs.map(([a, b]) => `ok += d.unite(${a}, ${b});`).join('\n')}\ncout << ${comps ? `${n} - ok` : 'ok'};`), answer: comps ? n - ok : ok,
          x: `A unite succeeds only if its endpoints are in different sets: ${ok} of ${m} succeed${comps ? `, so ${n} - ${ok} = ${n - ok} sets remain` : ''}.` };
      }
      const iv = Array.from({ length: R.int(4, 7) }, () => { const s = R.int(0, 12); return [s, s + R.int(1, 5)]; });
      let best = 0; for (const sub of subsets(iv)) { const ss = sub.slice().sort((a, b) => a[0] - b[0]); if (ss.every((x, i) => i === 0 || x[0] >= ss[i - 1][1])) best = Math.max(best, sub.length); }
      return ref(`What does the lesson's maxDisjoint return for the intervals ${iv.map(([s, e]) => `[${s}, ${e})`).join(', ')}?`, ['iv'], `cout << maxDisjoint(${arr(iv.map(([s, e]) => arr([e, s])))});`, best,
        `Taking the earliest-ending compatible interval each time is optimal; at most ${best} of them are pairwise disjoint.`);
    } }],
    [U[11]]: [{ id: 'ca-bits', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const x = R.int(1, 255), y = R.int(1, 255), s = R.int(1, 4), i = R.int(0, 7), u = v => v >>> 0;
        const pc = v => v.toString(2).split('').filter(c => c === '1').length, ctz = v => { let c = 0; while (!(v >> c & 1)) c++; return c; };
        const E = [['x & y', u(x & y)], ['x | y', u(x | y)], ['x ^ y', u(x ^ y)], [`x << ${s}`, u(x << s)], [`x >> ${s}`, x >> s], ['x & (x - 1)', u(x & (x - 1))], ['x & -x', u(x & -x)], ['popcount(x)', pc(x)], ['countr_zero(x)', ctz(x)], ['bit_width(x)', x.toString(2).length], ['x ^ (x >> 1)', u(x ^ (x >> 1))], [`(x >> ${i}) & 1`, (x >> i) & 1], [`x | (1u << ${i})`, u(x | (1 << i))], [`x & ~(1u << ${i})`, u(x & ~(1 << i))]];
        const [ex, val] = R.pick(E), hex = R.int(0, 2) === 0;
        return nq(`unsigned x = ${hex ? '0x' + x.toString(16) : x};\nunsigned y = ${y};\ncout << (${ex});`, '', val, `In binary x = ${x.toString(2)}${/y/.test(ex) ? ` and y = ${y.toString(2)}` : ''}. ${ex} = ${val}${val > 1 ? ` (${val.toString(2)})` : ''}.`);
      }
      if (k === 1) { const m = R.int(1, 255), ans = 2 ** m.toString(2).split('').filter(c => c === '1').length - 1;
        return nq(`unsigned m = ${m}, c = 0;\nfor (unsigned s = m; s;\n     s = (s - 1) & m)\n  c++;\ncout << c;`, '', ans, `${m} is ${m.toString(2)}, with ${Math.log2(ans + 1)} set bits; every nonempty submask is visited once: 2^${Math.log2(ans + 1)} - 1 = ${ans}.`); }
      if (k === 2) { const pool = R.sample([...Array(60).keys()].map(i => i + 1), R.int(3, 4)), single = pool[0], v = R.shuffle(pool.concat(pool.slice(1)));
        return nq(`${vdecl('int', v)}\nint r = 0;\nfor (int x : v) r ^= x;\ncout << r;`, '', single, `Every value but ${single} appears twice and cancels, since x ^ x = 0.`); }
      const a = R.vec(R.int(3, 5), 1, 9), T = R.pick(subsets(a).filter(x => x.length).map(x => x.reduce((p, q) => p + q, 0))), ans = subsets(a).filter(s => s.reduce((p, q) => p + q, 0) === T).length;
      return nq(`${vdecl('int', a, 'a')}\nint n = a.size(), N = 1 << n;\nint c = 0;\nfor (int m = 0; m < N; m++) {\n  int s = 0;\n  for (int i = 0; i < n; i++)\n    if (m >> i & 1) s += a[i];\n  c += s == ${T};\n}\ncout << c;`, '', ans,
        `Each mask from 0 to 2^${a.length} - 1 selects a subset; ${ans} of the subsets sum to ${T}.`);
    } }]
  } });
})();
