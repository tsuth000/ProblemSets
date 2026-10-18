'use strict';
// C++ track, part 2: modern C++ and performance, with a low-latency and quantitative-finance angle.
// Code questions carry `cpp` (the full program); tools/verify.py compiles and runs each under UBSan and ASan.
(() => {
  const { pre, cd, prog, mc, oq, nq, g6, HEAD } = window.CPP, TR = window.CPP_TRACER;
  registerSubject({ id: 'cppm', name: 'Modern C++ and performance', color: '#1E6E8C', plain: true, blurb: 'RAII, smart pointers, move semantics, templates, constexpr, lambdas, the STL, memory layout, floating point, atomics, low-latency design', questions: [], generators: [] });
  const U = ['RAII and exceptions', 'Smart pointers', 'Copy and move semantics', 'Templates', 'constexpr and compile time', 'Lambdas', 'STL algorithms', 'Containers and their costs', 'Memory layout and alignment', 'Floating point', 'Concurrency and atomics', 'Low-latency techniques'];
  const MV = "struct M {\n  M() {}\n  M(const M&) { cout << 'c'; }\n  M(M&&) noexcept {\n    cout << 'm';\n  }\n  M& operator=(const M&) {\n    cout << 'C';\n    return *this;\n  }\n  M& operator=(M&&) noexcept {\n    cout << 'M';\n    return *this;\n  }\n};";
  const CRTP = 'template <class D>\nstruct Base {\n  D& self() {\n    return static_cast<D&>(*this);\n  }\n  int run(int x) {\n    return self().step(x) + 1;\n  }\n};';
  const RING = 'template <unsigned N>\nstruct Ring {\n  int buf[N];\n  unsigned h = 0, t = 0;\n  bool push(int x) {\n    if (t - h == N) return false;\n    buf[t++ & (N - 1)] = x;\n    return true;\n  }\n  int pop() {\n    return buf[h++ & (N - 1)];\n  }\n};';
  // %.17g, as cout prints after setprecision(17).
  const g17 = v => { let s = v.toPrecision(17); if (s.includes('e')) return s; if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, ''); return s; };
  // A vector declaration wrapped to 32-char lines.
  const vdecl = (ty, vals) => { const one = `vector<${ty}> v{${vals.join(', ')}};`; if (one.length <= 32) return one; const L = [`vector<${ty}> v{`]; let cur = ''; vals.forEach((x, i) => { const piece = String(x) + (i < vals.length - 1 ? ',' : '};'); if (cur && (`  ${cur} ${piece}`).length > 32) { L.push(`  ${cur}`); cur = piece; } else cur = cur ? `${cur} ${piece}` : piece; }); L.push(`  ${cur}`); return L.join('\n'); };
  // Pack cout operands into lines of at most 32 chars.
  const couts = es => { const L = []; let cur = []; for (const e of es) { const t = `cout << ${cur.concat(e).join(' << ')};`; if (t.length > 32 && cur.length) { L.push(`cout << ${cur.join(' << ')};`); cur = [e]; } else cur.push(e); } L.push(`cout << ${cur.join(' << ')};`); return L.join('\n'); };

  registerLearn('cppm', [
    { title: U[0], skill: U[0],
      hook: T`<p>In C++ a resource (memory, a file, a lock, a socket) is owned by an object: the constructor acquires it and the destructor releases it. Because destructors run on every exit from a scope, including an exception, cleanup cannot be forgotten. The idiom is called RAII, resource acquisition is initialization.</p>`,
      body: T`
${pre(T`{
  lock_guard<mutex> g(mu);
  book.update(order);
}  // g unlocks here`)}
<p>Whether ${cd('update')} returns or throws, ${cd('g')}'s destructor unlocks the mutex. The standard library applies the same pattern everywhere: ${cd('vector')} and ${cd('string')} free their memory, ${cd('fstream')} closes its file, ${cd('unique_ptr')} deletes its object. In modern code, ${cd('new')} and ${cd('delete')} rarely appear outside such classes.</p>
<p><b>Exceptions.</b> ${cd('throw x;')} abandons the current code and searches outward for a ${cd('catch')} whose type matches. On the way, every fully constructed local object in the scopes being left is destroyed, innermost first and in reverse order of construction; this is <b>stack unwinding</b>. Then the handler runs. Objects declared after the throw point were never constructed, so nothing happens to them.</p>
<p><b>A throwing constructor.</b> If a constructor throws, the object never existed, so its destructor does not run. Members and bases that were already constructed are destroyed. A class whose members each manage one resource is therefore leak-free even when construction fails partway.</p>
<p>The practice snippets reuse the tracer from C++ fundamentals: ${cd('T a(\'a\');')} prints ${cd('a')} when constructed and ${cd('A')} when destroyed.</p>
${pre(T`try {
  T a('a');
  T b('b');
  throw 1;
  T c('c');
} catch (int) {
  cout << '!';
}`)}
<p>This prints ${cd('abBA!')}: ${cd('c')} is never built, and both locals are destroyed before the handler runs.</p>
<p>Destructors should not throw; one that throws during unwinding calls ${cd('std::terminate')}. Mark functions that cannot throw ${cd('noexcept')}; containers rely on it (see Copy and move semantics).</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`struct W {
  T m{'m'};
  W() { throw 1; }
  ~W() { cout << 'w'; }
};
// in main:
try {
  T a('a');
  W w;
} catch (int) {
  cout << '!';
}`)}`, a: T`<p>${cd('a')} is built, then ${cd('w')}'s member ${cd('m')}. W's constructor throws, so ${cd('~W')} never runs, but ${cd('m')} is destroyed, then ${cd('a')}, then the handler runs. Output: ${cd('amMA!')}.</p>` },
      trap: T`Expecting the destructor of an object whose constructor threw to run. Only its already-constructed members and bases are cleaned up.`,
      vary: [[T`What does this print?${pre("try {\n  T a('a');\n  throw 1;\n} catch (int) {\n  cout << '!';\n}\nT b('b');")}`, ['aA!bB', 'a!AbB', 'aA!b'], T`Unwinding destroys a before the handler; b dies at the end of main.`],
        [T`Which objects does unwinding destroy?`, ['fully constructed locals in the scopes being left', 'every object in the program', 'only heap objects', 'none: destructors are skipped'], T`Heap objects owned only by raw pointers leak, which is why owners should be objects.`],
        [T`A destructor throws while the stack is already unwinding. What happens?`, ['std::terminate is called', 'the new exception replaces the old', 'both are caught', 'nothing'], T`Destructors are implicitly noexcept.`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Smart pointers are RAII owners for heap objects. ${cd('unique_ptr')} expresses sole ownership at zero cost; ${cd('shared_ptr')} counts owners and deletes the object when the last one lets go.</p>`,
      body: T`
<p><b>unique_ptr.</b> ${cd('auto p = make_unique<Order>(...);')} creates the object and its single owner. A unique_ptr cannot be copied, only moved: ${cd('auto q = std::move(p);')} transfers ownership and leaves ${cd('p')} null. The object is deleted when its owner is destroyed, reset (${cd('p.reset()')}), or assigned a new object. In ${cd('p = make_unique<T>(...)')}, the new object is created first (it is the right-hand side), then the old one is deleted.</p>
<p><b>shared_ptr.</b> ${cd('make_shared<T>(...)')} allocates the object and a control block holding a reference count. Copying a shared_ptr increments the count; destroying, resetting or reassigning one decrements it; the object is deleted when it reaches zero. Moving transfers ownership without changing the count and leaves the source empty. ${cd('use_count()')} reports the count, and 0 for an empty pointer.</p>
${pre(T`auto p = make_shared<int>(5);
auto q = p;            // 2
{
  auto r = q;          // 3
}                      // 2
auto m = std::move(q); // 2, q empty
p.reset();             // 1`)}
<p><b>weak_ptr</b> observes a shared object without owning it, so it does not change the count. ${cd('w.expired()')} is true once the object is gone, and ${cd('w.lock()')} returns a shared_ptr that is empty in that case. Two objects holding shared_ptrs to each other never reach zero and leak; make one of the links weak.</p>
<p><b>Cost.</b> unique_ptr is the size of a raw pointer and adds no overhead. shared_ptr is two pointers wide, and each copy does an atomic increment, which is costly on a hot path. Pass ${cd('const shared_ptr&')}, or a plain reference to the object, when the callee does not need to share ownership.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`auto a = make_unique<T>('a');
auto b = std::move(a);
cout << (a == nullptr);
b = make_unique<T>('c');
cout << '|';`)}`, a: T`<p>Creating ${cd('a')} prints ${cd('a')}. The move transfers ownership, so ${cd('a')} is null and 1 prints. The assignment creates ${cd('c')}, then deletes the old object (${cd('A')}). At the end of main, ${cd('b')} deletes ${cd('c')}. Output: ${cd('a1cA|C')}.</p>` },
      trap: T`Expecting ${cd('std::move')} of a shared_ptr to change the count. It transfers an existing ownership; only copies add owners.`,
      vary: [[T`What does this print?${pre('auto p = make_shared<int>(1);\nauto q = p;\nauto r = q;\nq.reset();\ncout << p.use_count();')}`, 2, T`Three owners, then one released.`],
        [T`What does this print?${pre('auto p = make_shared<int>(1);\nweak_ptr<int> w = p;\ncout << p.use_count();')}`, 1, T`A weak_ptr is not an owner.`],
        [T`What does this print?${pre('auto p = make_shared<int>(1);\nauto q = std::move(p);\ncout << p.use_count();')}`, 0, T`p is empty after the move.`],
        [T`Can a unique_ptr be copied?`, ['No; it can only be moved', 'Yes, deeply', 'Yes, sharing the object'], T`Copying would create two owners.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Copying a vector duplicates every element; moving it hands over the buffer in a few pointer assignments. C++ decides between the two from the value category of the source, and the decision is often the largest performance factor in otherwise identical code.</p>`,
      body: T`
<p><b>Lvalues and rvalues.</b> A named object is an lvalue; it may be used again, so initializing from it copies. A temporary such as ${cd('M()')} or a function's return value is an rvalue; nothing else can observe it, so it may be moved from. ${cd('std::move(x)')} moves nothing by itself: it casts ${cd('x')} to an rvalue, permitting a move. A moved-from object is valid but unspecified; a vector moved from by construction is empty.</p>
<table class="tt"><tr><th>Code</th><th>Runs</th></tr>
<tr><td>${cd('M b = a;')}</td><td>copy constructor</td></tr>
<tr><td>${cd('M b = std::move(a);')}</td><td>move constructor</td></tr>
<tr><td>${cd('b = a;')}</td><td>copy assignment</td></tr>
<tr><td>${cd('b = std::move(a);')}</td><td>move assignment</td></tr>
<tr><td>${cd('b = M();')}</td><td>move assignment</td></tr>
<tr><td>${cd('M b = M();')}</td><td>nothing extra</td></tr>
<tr><td>${cd('M b = make();')}</td><td>nothing extra</td></tr>
<tr><td>${cd('take(a);')}</td><td>copy constructor</td></tr>
<tr><td>${cd('take(M());')}</td><td>nothing extra</td></tr></table>
<p>Here ${cd('make()')} is ${cd('M make() { return M(); }')} and ${cd('take')} is ${cd('void take(M) {}')}. <b>Guaranteed copy elision</b> (C++17): when an object is initialized from a temporary of the same type, including a parameter and a returned temporary, the temporary is the object, so no copy or move runs. Assignment is different: the target already exists, so ${cd('b = M();')} must move.</p>
<p>The practice snippets use this tracer:</p>
${pre(MV)}
<p><b>Rule of zero.</b> A class whose members manage themselves (vectors, strings, smart pointers) needs no user-written copy, move or destructor; the generated ones are correct. If you write any of the five, write or delete all of them.</p>
<p><b>noexcept and reallocation.</b> When a vector grows, it moves its elements to the new buffer only if the move constructor is ${cd('noexcept')}; otherwise it copies them, so that a throw cannot leave the vector half-moved. A move constructor without ${cd('noexcept')} silently turns every reallocation into copies. With GCC's libstdc++, capacity goes 1, 2, 4, 8, ...: each reallocation relocates all existing elements, then the new element is added. ${cd('reserve(n)')} avoids reallocations until the size passes ${cd('n')}.</p>
<p>${cd('v.push_back(x)')} copies ${cd('x')}; ${cd('v.push_back(std::move(x))')} and ${cd('v.push_back(M())')} move; ${cd('v.emplace_back(args)')} constructs the element in place from the arguments.</p>`,
      ex: { q: T`<p>With the tracer ${cd('M')}, what does this print?</p>${pre(T`M a;
M b = a;
M c = std::move(a);
b = c;
c = M();`)}`, a: T`<p>Copy construct (${cd('c')}), move construct (${cd('m')}), copy assign (${cd('C')}), move assign from a temporary (${cd('M')}). Output: ${cd('cmCM')}.</p>` },
      trap: T`Thinking ${cd('std::move')} moves. It is only a cast; if the target type has no move constructor, or the object is const, the copy constructor runs.`,
      vary: [[T`With ${cd('M')}, what does this print?${pre('M a;\nM b = M();\ntake(a);\ntake(std::move(b));')}`, ['cm', 'mcm', 'cc'], T`M b = M() elides; the two calls copy then move.`],
        [T`With ${cd('M')}, what does this print?${pre('vector<M> v;\nv.reserve(2);\nM a;\nv.push_back(a);\nv.push_back(M());')}`, ['cm', 'cmm', 'mm'], T`No reallocation after reserve: one copy, one move.`],
        [T`A vector of a type whose move constructor is not noexcept grows. Its elements are:`, ['copied', 'moved', 'left in place'], T`Copying keeps the strong exception guarantee.`],
        [T`After ${cd('vector<int> w = std::move(v);')}, what is ${cd('v.size()')}?`, 0, T`Move construction leaves the source vector empty.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>A template is a pattern from which the compiler generates a function or class for each set of types it is used with. The generated code is as fast as code written by hand for that type, which is why the standard library and most high-performance C++ are built from templates.</p>`,
      body: T`
${pre(T`template <class T>
T half(T x) { return x / 2; }

half(7);          // T = int: 3
half(7.0);        // T = double: 3.5
half<double>(7);  // explicit: 3.5`)}
<p><b>Deduction.</b> The compiler deduces ${cd('T')} from the arguments, without conversions: ${cd('add(7, 2.0)')} for ${cd('T add(T, T)')} fails to compile because ${cd('T')} cannot be both int and double. Explicit arguments, ${cd('add<double>(7, 2.0)')}, fix ${cd('T')} and allow ordinary conversions.</p>
<p><b>Overloads and templates.</b> Non-template functions and template instantiations compete in overload resolution. A better conversion wins, so for ${cd("f('a')")} the template's exact match ${cd('f<char>')} beats a non-template ${cd('f(int)')}, which needs a promotion. On a tie, the non-template wins. An explicit template argument list, as in ${cd('f<int>(1)')}, considers only templates.</p>
<p><b>Explicit specialization</b> replaces the generic body for one type: after ${cd('template <> char f(double) {...}')}, every call that selects ${cd('f<double>')} runs that body.</p>
<p><b>Class templates and non-type parameters.</b> ${cd('array<int, 4>')} takes a type and a value. A class template can recurse on a value, with a specialization as the base case, and the whole computation happens at compile time:</p>
${pre(T`template <int N>
struct F {
  static constexpr int v =
    N * F<N - 1>::v;
};
template <>
struct F<0> {
  static constexpr int v = 1;
};
// F<5>::v is 120`)}
<p><b>Concepts</b> (C++20) state requirements: ${cd('template <std::integral T>')} accepts only integer types, with a readable error otherwise. Templates trade compile time and binary size for run-time speed; each distinct instantiation is separate code.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`template <class T>
char f(T) { return 't'; }
char f(int) { return 'i'; }
// in main:
cout << f(1) << f('a');
cout << f<int>(1);`)}`, a: T`<p>${cd('f(1)')}: the template and the non-template both match exactly, and the non-template wins the tie. ${cd("f('a')")}: the template matches exactly, the non-template needs a promotion. ${cd('f<int>(1)')} names the template explicitly. Output: ${cd('itt')}.</p>` },
      trap: T`Expecting template deduction to convert arguments. ${cd('max(3, 4.5)')} does not compile: ${cd('T')} would have to be both int and double.`,
      vary: [[T`With the lesson's ${cd('half')}, what is ${cd('half(9) + half(9.0)')}?`, 8.5, T`4 + 4.5.`],
        [T`With the lesson's ${cd('F')}, what is ${cd('F<4>::v')}?`, 24, T`4 · 3 · 2 · 1 · 1.`],
        [T`For ${cd('template <class T> T add(T a, T b)')}, the call ${cd('add(1, 2.0)')}:`, ['does not compile', 'returns 3', 'returns 3.0'], T`Conflicting deductions for T.`],
        [T`Where is a template's code generated?`, ['at compile time, once per distinct set of arguments', 'at run time, on first call', 'once for all types'], T`Each instantiation is separate machine code.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Work done at compile time costs nothing at run time. ${cd('constexpr')} lets ordinary-looking C++ run inside the compiler: lookup tables, configuration checks, unit conversions.</p>`,
      body: T`
<p>A ${cd('constexpr')} <b>variable</b> must be initialized by a constant expression and is fixed at compile time. A ${cd('constexpr')} <b>function</b> can run at compile time when its arguments are constants and the result is needed as a constant; with run-time arguments it runs as a normal function. Loops, local variables and branches are allowed.</p>
${pre(T`constexpr int gcd(int a, int b) {
  while (b) {
    int t = a % b;
    a = b;
    b = t;
  }
  return a;
}
constexpr int g = gcd(84, 36);
// g is 12`)}
<p>${cd('consteval')} (C++20) makes a function <b>immediate</b>: every call must be evaluated at compile time, so calling it with a run-time value, such as an ordinary ${cd('int n')}, does not compile. ${cd('static_assert(cond);')} checks a condition at compile time and stops the build if it is false.</p>
<p><b>Tables.</b> A constexpr lambda invoked immediately can fill an array during compilation:</p>
${pre(T`constexpr auto sq = [] {
  array<int, 10> a{};
  for (int i = 0; i < 10; i++)
    a[i] = i * i;
  return a;
}();
// sq[7] is 49`)}
<p><b>if constexpr</b> chooses a branch at compile time from a constant condition, typically a type trait; the discarded branch is not instantiated, so it may contain code that would not compile for that type.</p>
${pre(T`template <class T>
int g(T x) {
  if constexpr (
      is_integral_v<T>)
    return x * 2;
  else
    return -1;
}`)}
<p>${cd('is_integral_v<T>')} is true for every integer type, including ${cd('bool')} and ${cd('char')}, and false for floating types. ${cd("g('a')")} is 194 and ${cd('g(2.5)')} is −1.</p>`,
      ex: { q: T`<p>Does this compile, and if so what does it print?</p>${pre(T`constexpr int f(int n) {
  return n < 2 ? 1
               : n * f(n - 1);
}
// in main:
static_assert(f(4) == 24);
cout << f(5);`)}`, a: T`<p>4! = 24, so the assertion holds. Output: ${cd('120')}. With ${cd('== 25')} the program would not compile.</p>` },
      trap: T`Assuming every call of a constexpr function happens at compile time. Only calls in a constant context, such as initializing a constexpr variable, are guaranteed to; use consteval to force it.`,
      vary: [[T`What does ${cd('gcd(48, 18)')} from the lesson return?`, 6, T`48, 18, 12, 6, 0.`],
        [T`With the lesson's ${cd('sq')}, what is ${cd('sq[3] + sq[9]')}?`, 90, T`9 + 81.`],
        [T`With the lesson's ${cd('g')}, what is ${cd('g(true) + g(1.5f)')}?`, 1, T`bool is integral: 2. float is not: −1.`],
        [T`${cd('consteval int sq(int x)')} is called as ${cd('sq(n)')} with ${cd('int n = 3;')}. The result:`, ['does not compile', 'prints 9', 'runs at run time'], T`n is not a constant expression.`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>A lambda is an unnamed function object written inline. Its capture list decides what it remembers from the surrounding code, and whether it sees later changes.</p>`,
      body: T`
<p>${cd('[captures](params) { body }')}. The parameter list may be omitted when empty.</p>
<table class="tt"><tr><th>Capture</th><th>Meaning</th></tr>
<tr><td>${cd('[x]')}</td><td>copy of x, taken at creation</td></tr>
<tr><td>${cd('[&x]')}</td><td>reference to x</td></tr>
<tr><td>${cd('[=]')}</td><td>copy whatever is used</td></tr>
<tr><td>${cd('[&]')}</td><td>refer to whatever is used</td></tr>
<tr><td>${cd('[k = 0]')}</td><td>new member k, initialized</td></tr></table>
${pre(T`int x = 1;
auto f = [x] { return x; };
auto g = [&x] { return x; };
x = 5;
// f() is 1, g() is 5`)}
<p><b>mutable.</b> A by-value capture is a member of the lambda object and is const by default. ${cd('mutable')} allows the body to change it; the change persists between calls of that lambda object but never affects the original variable. Copying a lambda copies its captured state.</p>
${pre(T`int n = 0;
auto c = [n]() mutable {
  return ++n;
};
c(); c();  // returns 1, then 2
// n is still 0`)}
<p>A <b>generic lambda</b> takes ${cd('auto')} parameters: ${cd('[](auto a, auto b) { return a < b; }')}. Lambdas are the usual comparators and predicates for the STL algorithms. Each lambda has its own unique type; ${cd('auto')} stores it without overhead, while ${cd('std::function')} can hold any callable at the cost of type erasure and possibly a heap allocation.</p>
<p>A reference capture outliving its variable dangles. Capture by value for lambdas that are stored or passed to another thread.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`int n = 10;
auto c = [n]() mutable {
  return n += 5;
};
c();
auto d = c;
c();
cout << c() << ' ' << d();`)}`, a: T`<p>${cd('c')}'s copy of n goes 15, then ${cd('d')} copies that state. ${cd('c')} goes 20, then 25; ${cd('d()')} gives 20. Output: ${cd('25 20')}.</p>` },
      trap: T`Expecting a by-value capture to see later changes. The copy is taken when the lambda is created.`,
      vary: [[T`What does this print?${pre('int x = 2;\nauto f = [=] {\n  return x * 3;\n};\nx = 4;\ncout << f();')}`, 6, T`Copied at creation: 2 · 3.`],
        [T`The same with ${cd('[&]')}?`, 12, T`Reads x when called: 4 · 3.`],
        [T`What does this print?${pre('auto f = [k = 1]() mutable {\n  return k *= 2;\n};\nf(); f();\ncout << f();')}`, 8, T`2, 4, 8.`],
        [T`A lambda capturing ${cd('[&]')} is stored and called after the function that created it returns. The result:`, ['undefined behavior: dangling references', 'it sees the final values', 'a compile error'], T`The captured locals no longer exist.`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>The STL algorithms are loops that have been written, tested and optimized already. They work on iterator ranges, and a few of them have return values that are easy to misread.</p>`,
      body: T`
<p>An algorithm takes a half-open range ${cd('[first, last)')}, usually ${cd('v.begin(), v.end()')}. The snippets abbreviate these as ${cd('b')} and ${cd('e')}:</p>
${pre(T`auto b = v.begin(), e = v.end();`)}
<table class="tt"><tr><th>Call</th><th>Result</th></tr>
<tr><td>${cd('accumulate(b, e, 0)')}</td><td>sum; type of the 0</td></tr>
<tr><td>${cd('count_if(b, e, p)')}</td><td>how many satisfy p</td></tr>
<tr><td>${cd('find_if(b, e, p)')}</td><td>first match, or e</td></tr>
<tr><td>${cd('max_element(b, e)')}</td><td>first largest</td></tr>
<tr><td>${cd('sort(b, e, cmp)')}</td><td>ascending by cmp</td></tr>
<tr><td>${cd('unique(b, e)')}</td><td>new logical end</td></tr>
<tr><td>${cd('remove_if(b, e, p)')}</td><td>new logical end</td></tr></table>
<p>Algorithms that search return iterators; ${cd('it - b')} converts one to an index, and a search that fails returns ${cd('e')}, whose index is the size.</p>
<p><b>accumulate's type.</b> The running total has the type of the initial value. ${cd('accumulate(b, e, 0)')} over doubles adds each element to an int and stores the result back in the int, truncating at every step. Write ${cd('0.0')}.</p>
<p><b>Comparators</b> must be a strict weak ordering, like ${cd('<')}: ${cd('cmp(x, x)')} must be false. ${cd('sort')} is not stable, so equal elements may come out in any order; ${cd('stable_sort')} keeps their input order. ${cd('greater<>()')} sorts descending.</p>
<p><b>unique and remove_if do not shrink the container.</b> ${cd('unique')} collapses each run of equal adjacent elements to one, moving the survivors forward, and returns the end of the survivors. It removes only adjacent duplicates, so sort first to remove all duplicates. ${cd('remove_if')} moves the elements that do not match the predicate forward. Neither changes ${cd('size()')}; the erase idiom finishes the job:</p>
${pre(T`auto it = remove_if(b, e, p);
v.erase(it, e);`)}
<p>C++20 adds range versions, ${cd('ranges::sort(v)')}, that take the container directly.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`vector<int> v{4, 4, 1, 4, 1};
auto b = v.begin();
auto it = unique(b, v.end());
cout << it - b << ' ';
cout << v.size();`)}`, a: T`<p>The runs are 4 4, 1, 4, 1: four runs, so four survivors (4, 1, 4, 1). The size is unchanged. Output: ${cd('4 5')}.</p>` },
      trap: T`Expecting ${cd('remove_if')} or ${cd('unique')} to shrink the vector. They only rearrange; call ${cd('erase')}.`,
      vary: [[T`What does this print?${pre('vector<double> v(3, 0.5);\ncout << accumulate(\n  v.begin(), v.end(), 0);')}`, 0, T`0 + 0.5 truncates to 0 every time.`],
        [T`For ${cd('v{3, 9, 2, 9}')}, what is ${cd('max_element(b, e) - b')}?`, 1, T`The first of the equal maxima.`],
        [T`For ${cd('v{1, 2, 3}')}, ${cd('find_if')} with ${cd('x > 5')} returns an iterator whose index ${cd('it - b')} is:`, 3, T`No match returns e; its index is the size.`],
        [T`${cd('unique')} on ${cd('{2, 1, 2, 1}')} keeps how many elements?`, 4, T`No two equal elements are adjacent.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Choosing a container sets the cost of every operation on it. Asymptotic complexity is the first filter; memory layout, contiguous or node-based, often decides between options with the same O.</p>`,
      body: T`
<table class="tt"><tr><th>Container</th><th>Strength</th><th>Cost</th></tr>
<tr><td>${cd('vector')}</td><td>index, append O(1)</td><td>middle insert O(n)</td></tr>
<tr><td>${cd('deque')}</td><td>push at both ends O(1)</td><td>not contiguous</td></tr>
<tr><td>${cd('list')}</td><td>splice, insert at iterator O(1)</td><td>no index, poor locality</td></tr>
<tr><td>${cd('map')}, ${cd('set')}</td><td>sorted, O(log n)</td><td>a node per element</td></tr>
<tr><td>${cd('unordered_map')}</td><td>lookup O(1) average</td><td>no order, O(n) worst</td></tr>
<tr><td>${cd('priority_queue')}</td><td>max in O(1), push/pop O(log n)</td><td>no search</td></tr></table>
<p><b>Growth.</b> ${cd('push_back')} is amortized O(1): when the vector is full it allocates a larger buffer and relocates every element. GCC's libstdc++ and Clang's libc++ double the capacity (1, 2, 4, 8, ...); Microsoft's library grows by 1.5×. Starting empty, n pushes cause about log₂ n reallocations, and the total number of relocations stays below 2n.</p>
<table class="tt"><tr><th>Code (libstdc++)</th><th>capacity()</th></tr>
<tr><td>n pushes from empty</td><td>smallest power of 2 ≥ n</td></tr>
<tr><td>${cd('reserve(r)')}, then n ≤ r pushes</td><td>r</td></tr>
<tr><td>${cd('reserve(r)')}, then n > r pushes</td><td>r doubled until ≥ n</td></tr>
<tr><td>${cd('vector<int> v(n);')} then 1 push</td><td>2n</td></tr>
<tr><td>${cd('shrink_to_fit()')}</td><td>the size</td></tr></table>
<p><b>Locality.</b> A cache line is 64 bytes, and memory is fetched a line at a time. Iterating a vector of ints uses all 16 ints in each line, and the hardware prefetcher streams the next lines. A list or map visits nodes scattered across the heap, often a cache miss per node, so in practice a sorted vector with binary search frequently beats a ${cd('map')} of the same size for lookups.</p>
<p><b>Invalidation.</b> A vector reallocation invalidates all iterators and references into it; inserting or erasing invalidates those at or after the point. Node-based containers (${cd('list')}, ${cd('map')}) keep iterators to other elements valid.</p>`,
      ex: { q: T`<p>With libstdc++, what does this print?</p>${pre(T`vector<int> v;
v.reserve(5);
for (int i = 0; i < 12; i++)
  v.push_back(i);
cout << v.capacity();`)}`, a: T`<p>Capacity 5 lasts until the sixth push, which grows it to 10; the eleventh grows it to 20. Output: ${cd('20')}.</p>` },
      trap: T`Treating amortized O(1) as worst-case O(1). A single ${cd('push_back')} that reallocates copies or moves every element, a latency spike on a hot path; ${cd('reserve')} in advance.`,
      vary: [[T`With libstdc++, the capacity after 9 pushes into an empty vector?`, 16, T`1, 2, 4, 8, 16.`],
        [T`After ${cd('vector<int> v(6);')} and one ${cd('push_back')}?`, 12, T`It was full at 6, so it doubles.`],
        [T`Which container keeps keys sorted with O(log n) insert and lookup?`, ['map', 'unordered_map', 'vector', 'deque'], T`A balanced binary search tree.`],
        [T`Cost of ${cd('v.insert(v.begin(), x)')} on a vector of n elements?`, ['O(n)', 'O(1)', 'O(log n)'], T`Every element shifts right.`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>The compiler lays out a struct's members in declaration order, inserting padding so that each member sits at an address its type requires. The order you choose changes the struct's size, and the size changes how many fit in a cache line.</p>`,
      body: T`
<p><b>Alignment.</b> Each type has an alignment, a power of two, and its address must be a multiple of it. On x86-64: ${cd('char')} and ${cd('bool')} 1, ${cd('short')} 2, ${cd('int')} and ${cd('float')} 4, ${cd('double')}, ${cd('long long')} and pointers 8. ${cd('alignof(T)')} reports it.</p>
<p><b>Layout rules.</b> Each member is placed at the next offset that is a multiple of its alignment. The struct's alignment is the largest member alignment, and its size is rounded up to a multiple of that, so that consecutive array elements stay aligned.</p>
${pre(T`struct A {      // offset
  char c;       // 0
  double d;     // 8: 7 bytes pad
  int i;        // 16
};              // size 24 (4 tail)
struct B {
  double d;     // 0
  int i;        // 8
  char c;       // 12
};              // size 16`)}
<p>Ordering members by decreasing alignment minimizes padding; for power-of-two alignments it is optimal. ${cd('offsetof(S, m)')} gives a member's offset.</p>
<p><b>alignas.</b> ${cd('struct alignas(64) P { ... };')} forces 64-byte alignment, so ${cd('sizeof(P)')} is a multiple of 64 and each ${cd('P')} in an array starts its own cache line.</p>
<p><b>False sharing.</b> Two threads writing different variables that share one cache line force the line to bounce between cores, which can be slower than a single thread. Separate per-thread counters with ${cd('alignas(64)')}.</p>
<p><b>Array of structs vs struct of arrays.</b> If a loop reads only the prices of a million orders, ${cd('vector<Order>')} drags every order's other fields through the cache. A struct of arrays, ${cd('vector<double> px; vector<int> qty;')}, streams only what is used and lets the compiler vectorize.</p>`,
      ex: { q: T`<p>On x86-64, what is ${cd('sizeof(S)')}?</p>${pre(T`struct S {
  char a;
  int b;
  char c;
  short d;
};`)}`, a: T`<p>a at 0; b at 4 (3 bytes padding); c at 8; d at 10. The members end at 12, already a multiple of the alignment 4. Size: 12.</p>` },
      trap: T`Adding member sizes to get a struct's size. Padding between members and at the end usually makes it larger.`,
      vary: [[T`On x86-64, ${cd('sizeof')} of ${cd('struct { char a; double b; }')}?`, 16, T`b at offset 8; total 16.`],
        [T`${cd('sizeof')} of ${cd('struct { int a; char b; }')}?`, 8, T`5 bytes rounded up to the alignment 4.`],
        [T`${cd('sizeof')} of ${cd('struct alignas(64) P { int x; }')}?`, 64, T`Rounded up to the alignment.`],
        [T`Two threads increment adjacent ints in one array. The main slowdown is:`, ['false sharing of a cache line', 'integer overflow', 'branch misprediction'], T`Each write invalidates the other core's copy of the line.`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>A ${cd('double')} stores a binary fraction with 53 significant bits. Most decimal numbers, including 0.1 and every price with cents, cannot be stored exactly, and the rounding shows up in comparisons, conversions and sums.</p>`,
      body: T`
<p><b>Representation.</b> IEEE 754 double: sign, 11-bit exponent, 53-bit significand, about 15.95 decimal digits. Only fractions whose denominator is a power of two (0.5, 0.25, 0.375) are exact; ${cd('0.1')} is stored as the nearest double, slightly above 0.1. Machine epsilon, the gap above 1, is 2<sup>−52</sup> ≈ 2.2 × 10<sup>−16</sup>.</p>
${pre(T`cout << (0.1 + 0.2 == 0.3);  // 0
cout << setprecision(17)
     << 0.1 + 0.2;
// 0.30000000000000004`)}
<p><b>Comparing.</b> Test ${cd('fabs(a - b) <= tol')}, with a tolerance scaled to the magnitudes involved, never ${cd('==')} on computed values. Sums of exactly representable values that stay exact, such as ${cd('0.5 + 0.25')}, do compare equal.</p>
<p><b>Rounding.</b> Each operation rounds its exact result to the nearest double; a result exactly halfway between two doubles rounds to the one whose last significand bit is 0 (round half to even).</p>
<p><b>Integers.</b> Every integer up to 2<sup>53</sup> = 9007199254740992 is exact. Above it the gap between doubles is 2, so 2<sup>53</sup> + 1 rounds (to even) to 2<sup>53</sup>, and 2<sup>53</sup> + 3 to 2<sup>53</sup> + 4. Near 10<sup>16</sup> the gap is 2 as well, so adding 1 to a large total can do nothing at all.</p>
<p><b>Order matters.</b> Floating addition is not associative: ${cd('(big + 1) + 1')} can lose both ones, while ${cd('big + (1 + 1)')} keeps them. Sum small values first, or use Kahan summation, when accuracy matters.</p>
<p><b>Prices.</b> Converting a price to integer cents by truncation fails whenever the stored double is slightly below the true value: ${cd('1.15 * 100')} is 114.99999999999999, and ${cd('long long(1.15 * 100)')} is 114. Use ${cd('llround(p * 100)')}, or better, keep prices as integer ticks from the start. Trading systems do exactly that.</p>
<p><b>Special values.</b> ${cd('1.0 / 0.0')} is ${cd('inf')} under IEEE 754. ${cd('NaN')}, from ${cd('0.0 / 0.0')} or ${cd('sqrt(-1.0)')}, compares unequal to everything, itself included; test it with ${cd('isnan')}. ${cd('-ffast-math')} lets the compiler ignore these rules for speed.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`double p = 0.29;
long long a = p * 100;
long long b = llround(p * 100);
cout << a << ' ' << b;`)}`, a: T`<p>0.29 is stored slightly below 0.29, and ${cd('0.29 * 100')} is 28.999999999999996. Truncation gives 28; rounding gives 29. Output: ${cd('28 29')}.</p>` },
      trap: T`Converting a computed double to an integer by truncation. A value a hair below an integer drops a whole unit.`,
      vary: [[T`What does ${cd('cout << (0.5 + 0.25 == 0.75);')} print?`, 1, T`All three are exact binary fractions.`],
        [T`What does ${cd('cout << (0.1 + 0.7 == 0.8);')} print?`, 0, T`0.1 + 0.7 is 0.7999999999999999.`],
        [T`What is ${cd('(long long)(double)((1LL << 53) + 1) - (1LL << 53)')}?`, 0, T`2<sup>53</sup> + 1 rounds to the even neighbor 2<sup>53</sup>.`],
        [T`For ${cd('double n = NAN;')}, what does ${cd('cout << (n == n);')} print?`, 0, T`NaN is unequal to itself.`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>Two threads that touch the same memory without synchronization, with at least one writing, form a data race, and a data race is undefined behavior. Correct concurrent code makes every shared access either atomic or protected by a lock.</p>`,
      body: T`
<p><b>Threads.</b> ${cd('thread t(f);')} runs ${cd('f')} concurrently; ${cd('t.join()')} waits for it. A thread must be joined or detached before its ${cd('thread')} object is destroyed, or the program terminates; C++20's ${cd('jthread')} joins automatically.</p>
<p><b>Mutexes.</b> ${cd('lock_guard<mutex> g(mu);')} locks for the rest of the scope (RAII). Only one thread at a time runs code holding ${cd('mu')}, and its writes are visible to the next thread that locks it.</p>
<p><b>Atomics.</b> ${cd('atomic<int>')} operations are indivisible: ${cd('c++')}, ${cd('c += k')} and ${cd('c.fetch_add(k)')} on an atomic are single read-modify-write operations, so concurrent increments are never lost. On a plain ${cd('int')}, ${cd('c++')} is a load, an add and a store, and two threads can interleave them.</p>
<table class="tt"><tr><th>Call</th><th>Returns</th></tr>
<tr><td>${cd('a.fetch_add(k)')}</td><td>old value</td></tr>
<tr><td>${cd('a++')}</td><td>old value</td></tr>
<tr><td>${cd('++a')}, ${cd('a += k')}</td><td>new value</td></tr>
<tr><td>${cd('a.exchange(v)')}</td><td>old value</td></tr>
<tr><td>${cd('a.load()')}</td><td>current value</td></tr></table>
<p>${cd('a.compare_exchange_strong(e, d)')}: if ${cd('a')} equals ${cd('e')}, it stores ${cd('d')} and returns true; otherwise it copies the current value of ${cd('a')} into ${cd('e')} and returns false. Lock-free algorithms retry in a loop around it.</p>
<p><b>Memory order.</b> The default, ${cd('memory_order_seq_cst')}, behaves as if all atomic operations ran in one global order. ${cd('relaxed')} guarantees only atomicity, which suffices for a statistics counter. To publish data, write it, then store a flag with ${cd('release')}; a reader that loads the flag with ${cd('acquire')} and sees it set also sees the data.</p>
<p>Atomic increments on a shared variable are still slow under contention, because the cache line moves between cores; per-thread counters summed at the end scale better.</p>`,
      ex: { q: T`<p>What does this print?</p>${pre(T`atomic<int> c{0};
auto work = [&] {
  for (int j = 0; j < 500; j++)
    c++;
};
thread t1(work), t2(work);
t1.join();
t2.join();
cout << c;`)}`, a: T`<p>Atomic increments are never lost, so the result is always ${cd('1000')}. With a plain ${cd('int')} it would be a data race: undefined behavior, and in practice often less than 1000.</p>` },
      trap: T`Making a counter ${cd('volatile')} to fix a race. ${cd('volatile')} gives no atomicity and no ordering between threads; use ${cd('atomic')}.`,
      vary: [[T`What does this print?${pre("atomic<int> a{5};\nint x = a.fetch_add(3);\ncout << x << ' ' << a;")}`, ['5 8', '8 8', '5 5'], T`fetch_add returns the old value.`],
        [T`What does this print?${pre('atomic<int> a{5};\nint x = a.exchange(1);\ncout << x + a;')}`, 6, T`Returns 5 and stores 1.`],
        [T`${cd('a')} holds 7 and ${cd('e')} is 4. After ${cd('a.compare_exchange_strong(e, 9)')}, what is ${cd('e')}?`, 7, T`The comparison fails and e receives a's value.`],
        [T`Two threads each run ${cd('x++')} 1000 times on a plain ${cd('int x')}. The result is:`, ['undefined behavior: a data race', 'always 2000', 'always 1000'], T`Unsynchronized concurrent writes.`]] },

    { title: U[11], skill: U[11],
      hook: T`<p>In a trading system the time from market data to order is measured in microseconds or less, and the slow outliers matter as much as the average. Low-latency C++ keeps the hot path free of allocation, locks, system calls and unpredictable branches.</p>`,
      body: T`
<p><b>No allocation on the hot path.</b> ${cd('new')} and ${cd('malloc')} take locks or walk free lists and occasionally call the operating system. Preallocate: ${cd('reserve')} vectors, keep object pools, use fixed-capacity buffers.</p>
<p><b>Lock-free queues.</b> A single-producer single-consumer ring buffer passes messages between two threads with no lock. With capacity N a power of two, the head and tail are counters that only increase, the slot is ${cd('i & (N - 1)')} (cheaper than ${cd('i % N')}), the size is ${cd('t - h')} (correct even after unsigned wraparound), and the ring is full when that equals N. In a real two-thread ring, ${cd('h')} and ${cd('t')} are atomics with acquire and release ordering, each on its own cache line.</p>
${pre(RING)}
<p>A failed push returns false; the caller must handle it, since the ring never overwrites.</p>
<p><b>Static polymorphism.</b> A virtual call is an indirect jump that the compiler cannot inline. The curiously recurring template pattern (CRTP) passes the derived class to its base as a template argument, so the base calls derived code directly and the optimizer can inline it:</p>
${pre(CRTP)}
${pre(T`struct Fast : Base<Fast> {
  int step(int x) {
    return x * 2;
  }
};
// Fast().run(5) is 11`)}
<p><b>Branches.</b> Modern CPUs predict branches; a misprediction costs about 15 to 20 cycles. Keep the common path straight-line, hint with ${cd('[[likely]]')} and ${cd('[[unlikely]]')}, move error handling out of line, and prefer branch-free arithmetic on unpredictable data.</p>
<p><b>Other habits:</b> keep hot data contiguous and small (see Memory layout); integer ticks instead of doubles for prices; no exceptions or logging formatting on the hot path; pin threads to cores and spin rather than sleep; warm caches before the critical moment; measure with a cycle counter and look at the tail percentiles, not just the mean.</p>`,
      ex: { q: T`<p>With the lesson's ${cd('Ring')}, what does this print?</p>${pre(T`Ring<4> r;
int ok = 0;
for (int i = 1; i <= 6; i++)
  ok += r.push(i);
r.pop();
ok += r.push(9);
cout << ok << ' ' << r.pop();`)}`, a: T`<p>Pushes 1 to 4 succeed, 5 and 6 fail (full). The pop removes 1, making room for 9: ok = 5. The next pop returns 2. Output: ${cd('5 2')}.</p>` },
      trap: T`Using ${cd('i % N')} with an N that is not a power of two while computing the size as ${cd('t - h')} on wrapping counters. The mask trick and the wraparound arithmetic both rely on a power-of-two capacity.`,
      vary: [[T`For N = 16, which slot does counter value 37 use?`, 5, T`37 & 15 = 37 mod 16.`],
        [T`A ring with N = 8 has ${cd('h = 4294967294')} and ${cd('t = 3')} (unsigned 32-bit, after wraparound). How many items are queued?`, 5, T`t − h wraps to 5.`],
        [T`With the lesson's ${cd('Fast')}, what is ${cd('Fast().run(7)')}?`, 15, T`step gives 14; run adds 1.`],
        [T`Why can CRTP be faster than a virtual function?`, ['the call is resolved at compile time and can be inlined', 'it uses less memory per object', 'it avoids templates'], T`No indirect jump through a vtable.`]] }
  ]);

  addQuestions('cppm', [
    { id: 'cmq1', skill: U[0], q: 'What does RAII guarantee?', c: ['A resource is released when its owning object is destroyed, on every exit path', 'Resources are released at program exit only', 'Memory is garbage collected', 'Exceptions cannot occur'], x: 'The destructor runs at scope exit, whether by return, break or exception.' },
    { id: 'cmq2', skill: U[0], q: 'A constructor throws. Which destructors run?', c: ["Those of the members and bases already constructed, not the object's own", "The object's own destructor", 'None', 'All members, constructed or not'], x: 'The object never finished construction.' },
    { id: 'cmq3', skill: U[1], q: 'Which smart pointer has no overhead over a raw pointer?', c: ['unique_ptr', 'shared_ptr', 'weak_ptr', 'all of them'], x: 'shared_ptr carries a control block and atomic reference counting.' },
    { id: 'cmq4', skill: U[1], q: 'Two objects hold shared_ptrs to each other and nothing else refers to them. What happens?', c: ['They leak: each count stays at 1', 'They are freed at once', 'The program crashes', 'The compiler rejects it'], x: 'Make one of the links a weak_ptr.' },
    { id: 'cmq5', skill: U[2], q: 'What does std::move(x) do by itself?', c: ['Casts x to an rvalue so that a move may be chosen', 'Moves x into a new object', 'Empties x', 'Copies x'], x: 'The move happens only if a move constructor or assignment is then selected.' },
    { id: 'cmq6', skill: U[2], q: 'With the tracer M, what does this print?', code: "M a;\nM b = std::move(a);\nM c = M();\nb = M();", cpp: `${HEAD}${MV}\nint main() {\nM a;\nM b = std::move(a);\nM c = M();\nb = M();\n}\n`, c: ['mM', 'mmM', 'mMm', 'cM'], x: 'Move construction, an elided temporary, then move assignment from a temporary.' },
    { id: 'cmq7', skill: U[3], q: 'Why does std::max(3, 4.5) not compile?', c: ['T is deduced as int from one argument and double from the other', 'max needs three arguments', 'max is not a template', 'doubles cannot be compared'], x: 'Write std::max<double>(3, 4.5) or convert one argument.' },
    { id: 'cmq8', skill: U[3], q: 'A non-template f(int) and a template f(T) both match f(5) exactly. Which is called?', c: ['the non-template', 'the template', 'neither: ambiguous', 'whichever is declared first'], x: 'Ties go to the non-template function.' },
    { id: 'cmq9', skill: U[4], q: 'Which must be evaluated at compile time?', c: ['a call to a consteval function', 'any call to a constexpr function', 'any inline function', 'any template'], x: 'constexpr functions may also run at run time.' },
    { id: 'cmq10', skill: U[4], q: 'Does this compile?', code: 'constexpr int f(int n) {\n  return n * n;\n}\n// in main:\nstatic_assert(f(7) == 48);', cpp: `${HEAD}constexpr int f(int n) {\n  return n * n;\n}\nint main() {\nstatic_assert(f(7) == 48);\n}\n`, cerr: 'static assertion failed', c: ['Does not compile', 'Compiles and does nothing', 'Compiles, fails at run time', 'Compiles with a warning'], x: 'f(7) is 49, so the static assertion fails during compilation.' },
    { id: 'cmq11', skill: U[5], q: 'What does this print?', code: 'int x = 1;\nauto f = [x]() mutable {\n  return ++x;\n};\nf();\ncout << f() << x;', cpp: `${HEAD}int main() {\nint x = 1;\nauto f = [x]() mutable {\n  return ++x;\n};\nf();\ncout << f() << x;\n}\n`, c: ['31', '33', '21', '11'], x: "The lambda's copy goes 2, 3; the original x stays 1." },
    { id: 'cmq12', skill: U[6], q: 'What must follow remove_if to actually shrink a vector?', c: ['v.erase(it, v.end())', 'v.resize(0)', 'v.shrink_to_fit()', 'nothing; remove_if shrinks it'], x: 'remove_if returns the new logical end; erase removes the tail.' },
    { id: 'cmq13', skill: U[6], q: 'Which comparator is invalid for std::sort?', c: ['[](int a, int b) { return a <= b; }', '[](int a, int b) { return a < b; }', '[](int a, int b) { return a > b; }', 'std::greater<>()'], x: '<= is not a strict weak ordering: cmp(x, x) is true, and sort may read out of bounds.' },
    { id: 'cmq14', skill: U[7], q: 'Why does a sorted vector often beat std::map for lookups at the same O(log n)?', c: ['Contiguous memory uses the cache well; map nodes are scattered', 'map is not a search tree', 'vector lookups are O(1)', 'map copies keys on lookup'], x: 'Each map node visited can be a cache miss.' },
    { id: 'cmq15', skill: U[7], q: 'What does a vector reallocation invalidate?', c: ['every iterator, pointer and reference into it', 'only end()', 'nothing', 'only iterators after the last element'], x: 'The elements live at new addresses.' },
    { id: 'cmq16', skill: U[8], q: 'What is the alignment of a struct?', c: ['the largest alignment among its members', 'always 8', 'the sum of member alignments', 'always 1'], x: 'Its size is then a multiple of that alignment.' },
    { id: 'cmq17', skill: U[9], q: 'What does this print?', code: 'double n = 0.0 / 0.0;\ncout << (n == n) << (n != n);', cpp: `${HEAD}int main() {\ndouble n = 0.0 / 0.0;\ncout << (n == n) << (n != n);\n}\n`, c: ['01', '10', '11', '00'], x: 'NaN compares unequal to everything, including itself.' },
    { id: 'cmq18', skill: U[9], q: 'Why do trading systems store prices as integer ticks?', c: ['Decimal prices are not exact in binary floating point', 'Integers use less memory than doubles', 'Doubles cannot be negative', 'The standard requires it'], x: '0.1 and most prices with cents have no exact double; ticks are exact.' },
    { id: 'cmq19', skill: U[10], q: 'Which makes concurrent increments of a shared counter safe?', c: ['std::atomic<int>', 'volatile int', 'declaring it static', 'a larger integer type'], x: 'volatile gives neither atomicity nor ordering between threads.' },
    { id: 'cmq20', skill: U[10], q: 'A std::thread is destroyed without join() or detach(). What happens?', c: ['std::terminate is called', 'it is joined automatically', 'it is detached automatically', 'nothing'], x: 'std::jthread joins automatically; std::thread does not.' },
    { id: 'cmq21', skill: U[11], q: 'Why should a hot path avoid new and malloc?', c: ['Allocation has unpredictable latency: locks, free-list searches, system calls', 'They are deprecated', 'They always throw', 'They are not thread-safe'], x: 'Preallocate with pools and reserve.' },
    { id: 'cmq22', skill: U[11], q: 'Why must a mask-indexed ring buffer have a power-of-two capacity?', c: ['i & (N - 1) equals i % N only then', 'other sizes waste memory', 'the CPU requires it', 'atomics need it'], x: 'For N = 2^k, N - 1 is a mask of k low bits.' }
  ]);

  // ---------- generators ----------
  Object.assign(window, { CPP_MV: `${MV}\nM make() { return M(); }\nvoid take(M) {}`, CPP_RING: RING, CPP_CRTP: `${CRTP}\nstruct Fast : Base<Fast> {\n  int step(int x) {\n    return x * 2;\n  }\n};` });
  registerUnitGens('cppm', { units: {
    [U[0]]: [{ id: 'cm-raii', make(R) {
      if (R.int(0, 3) === 0) {
        const pre1 = R.int(0, 1);
        const body = `try {\n${pre1 ? "  T a('a');\n" : ''}  W w;\n} catch (int) {\n  cout << '!';\n}`;
        const A = pre1 ? 'a' : '', Au = pre1 ? 'A' : '';
        return oq(body, `${TR}\nstruct W {\n  T m{'m'};\n  W() { throw 1; }\n  ~W() { cout << 'w'; }\n};`, `${A}mM${Au}!`, [`${A}mwM${Au}!`, `${A}m!M${Au}`, `${A}m${Au}!`, `${A}mM!${Au}`],
          `W's constructor throws after m is built. ~W never runs because w never existed; m is destroyed, then ${pre1 ? 'a, ' : ''}then the handler runs.`);
      }
      const outer = R.int(0, 1), n = R.int(1, 3), viaF = R.int(0, 1), after = R.int(0, 1);
      const L = ['a', 'b', 'c'].slice(0, n);
      const lines = [];
      if (outer) lines.push("T o('o');");
      lines.push('try {'); L.forEach(c => lines.push(`  T ${c}('${c}');`)); lines.push(viaF ? '  f();' : '  throw 1;'); lines.push("  T z('z');"); lines.push('} catch (int) {', "  cout << '!';", '}');
      if (after) lines.push("T e('e');");
      const up = s => s.toUpperCase(), rev = xs => xs.slice().reverse();
      const built = (outer ? 'o' : '') + L.join('') + (viaF ? 'x' : '');
      const unwind = (viaF ? 'X' : '') + rev(L).map(up).join('');
      const tail = (after ? 'eE' : '') + (outer ? 'O' : '');
      const right = built + unwind + '!' + tail;
      return oq(lines.join('\n'), viaF ? `${TR}\nvoid f() {\n  T x('x');\n  throw 1;\n}` : TR, right,
        [built + '!' + unwind + tail, built + '!' + tail, built + L.map(up).join('') + (viaF ? 'X' : '') + '!' + tail, (outer ? 'o' : '') + L.join('') + (viaF ? 'x' : '') + 'z' + 'Z' + unwind + '!' + tail],
        `${viaF ? 'f builds x and throws. ' : ''}Unwinding destroys every fully constructed local in the scopes it leaves, innermost first and newest first (${unwind}), and only then runs the handler. z is never built.${outer || after ? ' Locals of main die at its end, in reverse order.' : ''}`);
    } }],
    [U[1]]: [{ id: 'cm-smart', make(R) {
      if (R.int(0, 2) === 0) {
        const opt = R.int(0, 2), addD = R.int(0, 1);
        const lines = ["auto a = make_unique<T>('a');", 'auto b = std::move(a);', 'cout << (a == nullptr);'];
        let out = 'a1', bObj = 'a', aObj = null;
        if (opt === 1) { lines.push("b = make_unique<T>('c');"); out += 'cA'; bObj = 'c'; }
        else if (opt === 2) { lines.push('b.reset();'); out += 'A'; bObj = null; }
        if (addD) { lines.push("a = make_unique<T>('d');"); out += 'd'; aObj = 'd'; }
        lines.push("cout << '|';"); out += '|';
        const end = (bObj ? bObj.toUpperCase() : '') + (aObj ? aObj.toUpperCase() : ''), right = out + end;
        const wrong1 = out + (aObj ? aObj.toUpperCase() : '') + (bObj ? bObj.toUpperCase() : '');
        const wrong2 = right.replace('a1', 'aa0').replace('|', '|A');
        const wrong3 = opt === 1 ? right.replace('cA', 'Ac') : right.replace('a1', 'a0');
        return oq(lines.join('\n'), TR, right, [wrong1, wrong2, wrong3, out],
          `The move leaves a null (1 prints). ${opt === 1 ? "Assigning a new object creates c first, then deletes the old one (A). " : opt === 2 ? 'reset deletes the object (A). ' : ''}${addD ? 'a gets a new object d. ' : ''}At the end of main, b is destroyed before a (reverse declaration order), each deleting what it owns: ${end || 'nothing'}.`);
      }
      // shared_ptr counting on one object
      const vars = { p: true }, order = ['p'], lines = ['auto p = make_shared<int>(7);'], names = ['q', 'r', 's'];
      const used = new Set(); let weak = R.int(0, 2) === 0; if (weak) lines.push('weak_ptr<int> w = p;');
      for (let t = 0; t < 4; t++) {
        const live = order.filter(n => vars[n]), any = order;
        const op = R.int(0, 4);
        if (op === 0 && names.length && live.length) { const n = names.shift(), s = R.pick(live); vars[n] = true; order.push(n); lines.push(`auto ${n} = ${s};`); used.add('copy'); }
        else if (op === 1 && names.length && live.length) { const n = names.shift(), s = R.pick(live); vars[n] = true; vars[s] = false; order.push(n); lines.push(`auto ${n} = std::move(${s});`); used.add('move'); }
        else if (op === 2 && live.length > 1) { const d = R.pick(live); vars[d] = false; lines.push(`${d}.reset();`); used.add('reset'); }
        else if (op === 3 && live.length) { const s = R.pick(live); lines.push(`{\n  auto t = ${s};\n  auto u = t;\n}`); used.add('block'); }
        else if (live.length) { const d = R.pick(any), s = R.pick(live); if (d === s) continue; vars[d] = true; lines.push(`${d} = ${s};`); used.add('assign'); }
      }
      const cnt = order.filter(n => vars[n]).length, tgt = R.pick(order);
      if (weak && R.int(0, 1)) {
        const kill = order.filter(n => vars[n]); const killAll = R.int(0, 1);
        if (killAll) kill.forEach(n => lines.push(`${n}.reset();`));
        const exp = killAll || cnt === 0 ? 1 : 0;
        return nq(`${lines.join('\n')}\ncout << w.expired();`, '', exp, `w does not own the int. ${killAll || cnt === 0 ? 'Every owner has released it, so it was deleted and w has expired.' : `${cnt} owner${cnt > 1 ? 's' : ''} remain, so it has not expired.`}`);
      }
      const ans = vars[tgt] ? cnt : 0;
      return nq(`${lines.join('\n')}\ncout << ${tgt}.use_count();`, '', ans,
        `${[used.has('copy') && 'A copy adds an owner.', used.has('move') && 'A move transfers ownership and empties the source.', used.has('reset') && 'reset releases one.', used.has('assign') && 'Assigning makes the target an owner (an empty target adds one).', used.has('block') && "The block's two copies are released when it ends.", weak && 'The weak_ptr does not count.'].filter(Boolean).join(' ')} ${vars[tgt] ? `${cnt} owner${cnt > 1 ? 's hold' : ' holds'} the int.` : `${tgt} is empty, so use_count() is 0.`}`);
    } }],
    [U[2]]: [{ id: 'cm-move', make(R) {
      if (R.int(0, 2) === 0) {
        const N = R.int(3, 9), nx = R.int(0, 1), res = R.int(0, 2) === 0 ? R.int(2, 6) : 0;
        let cap = res, size = 0, relocs = 0;
        for (let i = 0; i < N; i++) { if (size === cap) { relocs += size; cap = size ? 2 * size : 1; } size++; }
        const c = nx ? 0 : relocs, m = N + (nx ? relocs : 0);
        return Object.assign(oq(`vector<M> v;\n${res ? `v.reserve(${res});\n` : ''}for (int i = 0; i < ${N}; i++)\n  v.push_back(M());\ncout << M::c << ' ' << M::m;`,
          `struct M {\n  static int c, m;\n  M() {}\n  M(const M&) { c++; }\n  M(M&&)${nx ? ' noexcept' : ''} { m++; }\n};\nint M::c = 0, M::m = 0;`, `${c} ${m}`,
          [`${relocs} ${N}`, `0 ${N + relocs}`, `0 ${N}`, `${relocs} ${N + relocs}`],
          `Each push_back(M()) moves the temporary in: ${N} moves. Reallocations (capacity ${res ? `${res}, then doubling` : '1, 2, 4, ...'}) relocate ${relocs} elements in total, ${nx ? 'by moving, since the move constructor is noexcept' : 'by copying, since the move constructor is not noexcept'}.`), { q: 'With GCC (libstdc++), what does this print?' });
      }
      const decl = [], lines = ['M a;']; let out = '', bad = { el: '', mv: '', as: '' };
      const names = ['b', 'c', 'd', 'e']; const live = ['a'];
      const emit = (line, o, el, mv, as) => { lines.push(line); out += o; bad.el += el; bad.mv += mv; bad.as += as; };
      for (let t = 0; t < 4; t++) {
        const k = R.int(0, 10), s = R.pick(live);
        if (k <= 3 && names.length) { const n = names.shift(); live.push(n);
          if (k === 0) emit(`M ${n} = ${s};`, 'c', 'c', 'c', 'c');
          else if (k === 1) emit(`M ${n} = std::move(${s});`, 'm', 'm', 'c', 'm');
          else if (k === 2) emit(`M ${n} = M();`, '', 'm', '', '');
          else emit(`M ${n} = make();`, '', 'm', '', ''); }
        else if (k <= 7 && live.length > 1) { const d = R.pick(live.filter(x => x !== s));
          if (k === 4) emit(`${d} = ${s};`, 'C', 'C', 'C', 'c');
          else if (k === 5) emit(`${d} = std::move(${s});`, 'M', 'M', 'C', 'm');
          else if (k === 6) emit(`${d} = M();`, 'M', 'M', 'M', 'm');
          else emit(`${d} = make();`, 'M', 'M', 'M', 'm'); }
        else if (k === 8) emit(`take(${s});`, 'c', 'c', 'c', 'c');
        else if (k === 9) emit(`take(std::move(${s}));`, 'm', 'm', 'c', 'm');
        else emit('take(M());', '', 'm', '', '');
      }
      if (out.length < 2) return this.make(R);
      const ls = lines.join('\n');
      return oq(ls, MV + (/make\(/.test(ls) ? '\nM make() { return M(); }' : '') + (/take\(/.test(ls) ? '\nvoid take(M) {}' : ''), out, [bad.el, bad.mv, bad.as, out.split('').reverse().join('')],
        `Initializing from a named object copies (c); from std::move(x), moves (m); from a temporary or a returned temporary, nothing (guaranteed elision). Assigning prints C or M, since the target already exists; a temporary on the right moves. Output: ${out}.`);
    } }],
    [U[3]]: [{ id: 'cm-tmpl', make(R) {
      const k = R.int(0, 2);
      if (k === 0) {
        const C = [['f(1)', 'i'], ['f(1.0)', 'd'], ["f('a')", 't'], ['f(1L)', 't'], ['f<int>(1)', 't'], ['f(2.5f)', 't'], ['f(true)', 't'], ['f<double>(1)', 'd']];
        const cs = R.sample(C, 4), right = cs.map(c => c[1]).join('');
        const flip = i => right.split('').map((c, j) => j !== i ? c : c === 't' ? 'i' : 't').join('');
        return oq(couts(cs.map(c => c[0])), "template <class T>\nchar f(T) { return 't'; }\ntemplate <>\nchar f(double) { return 'd'; }\nchar f(int) { return 'i'; }", right, R.shuffle([0, 1, 2, 3]).map(flip),
          `${cs.map(c => `${c[0]}: ${{ i: 'the non-template f(int)', t: 'the generic template', d: 'the double specialization' }[c[1]]}`).join('; ')}. An exact template match beats a promotion; a tie goes to the non-template; explicit template arguments consider only templates.`);
      }
      if (k === 1) {
        const form = R.int(0, 2), N = form === 2 ? R.int(4, 20) : R.int(3, 8);
        const [rec, base, f] = [['N * F<N - 1>::v', 1, n => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }], ['N + F<N - 1>::v', 0, n => n * (n + 1) / 2], ['2 * F<N - 1>::v', 1, n => 2 ** n]][form];
        return nq(`cout << F<${N}>::v;`, `template <int N>\nstruct F {\n  static constexpr int v =\n    ${rec};\n};\ntemplate <>\nstruct F<0> {\n  static constexpr int v = ${base};\n};`, f(N),
          `The compiler instantiates F<${N}>, F<${N - 1}>, ..., down to the specialization F<0> = ${base}. ${['That is N!', 'That is 1 + 2 + ... + N', 'That is 2^N'][form]}: ${f(N)}.`);
      }
      const a = R.int(3, 25), b = R.int(3, 25); if (a % 2 === 0 || b % 2 === 0) return this.make(R);
      const ex = R.int(0, 1), ans = (ex ? a / 2 : Math.trunc(a / 2)) + b / 2;
      return nq(`cout << half${ex ? '<double>' : ''}(${a})\n     + half(${b}.0);`, 'template <class T>\nT half(T x) { return x / 2; }', ans,
        `${ex ? `half<double>(${a}) converts ${a} to double: ${a / 2}.` : `half(${a}) deduces T = int: integer division gives ${Math.trunc(a / 2)}.`} half(${b}.0) deduces double: ${b / 2}. Sum: ${ans}.`);
    } }],
    [U[4]]: [{ id: 'cm-cexpr', make(R) {
      const k = R.int(0, 3);
      if (k === 0) {
        const f = R.int(0, 2);
        if (f === 0) { const g = R.int(2, 12), a = g * R.int(2, 15), b = g * R.int(2, 15); let x = a, y = b; while (y) [x, y] = [y, x % y];
          return nq(`constexpr int x = gcd(${a}, ${b});\ncout << x;`, 'constexpr int gcd(int a,\n                  int b) {\n  while (b) {\n    int t = a % b;\n    a = b;\n    b = t;\n  }\n  return a;\n}', x, `Euclid's algorithm, run by the compiler: gcd(${a}, ${b}) = ${x}.`); }
        if (f === 1) { const b = R.int(2, 9), e = R.int(3, 12), m = R.int(7, 97); let r = 1; for (let i = 0; i < e; i++) r = r * b % m;
          return nq(`constexpr int x = pm(${b}, ${e}, ${m});\ncout << x;`, 'constexpr int pm(int b, int e,\n               int m) {\n  int r = 1;\n  while (e--) r = r * b % m;\n  return r;\n}', r, `${b}^${e} mod ${m}, reducing after each multiplication: ${r}.`); }
        const n = R.int(1000, 999999), s = String(n).split('').reduce((a, c) => a + +c, 0);
        return nq(`constexpr int x = ds(${n});\ncout << x;`, 'constexpr int ds(int n) {\n  int s = 0;\n  for (; n; n /= 10)\n    s += n % 10;\n  return s;\n}', s, `The digit sum of ${n}, computed at compile time: ${s}.`);
      }
      if (k === 1) {
        const i = R.int(0, 9), j = R.int(0, 9), cube = R.int(0, 1), f = x => cube ? x ** 3 : x * x;
        return nq(`cout << sq[${i}] + sq[${j}];`, `constexpr auto sq = [] {\n  array<int, 10> a{};\n  for (int i = 0; i < 10; i++)\n    a[i] = ${cube ? 'i * i * i' : 'i * i'};\n  return a;\n}();`, f(i) + f(j),
          `The table holds ${cube ? 'i^3' : 'i^2'}: ${f(i)} + ${f(j)}.`);
      }
      if (k === 2) {
        const n = R.int(3, 6), fact = m => m < 2 ? 1 : m * fact(m - 1), ok = R.int(0, 1), V = ok ? fact(n) : fact(n) + R.pick([-1, 1, n]);
        const right = ok ? String(fact(n + 1)) : 'Does not compile';
        const o = Object.assign(oq(`static_assert(f(${n}) == ${V});\ncout << f(${n + 1});`, 'constexpr int f(int n) {\n  return n < 2 ? 1\n               : n * f(n - 1);\n}', right,
          ok ? ['Does not compile', String(V), 'Compiles, then aborts'] : [String(fact(n + 1)), 'Compiles, then aborts', String(V)],
          `f(${n}) = ${n}! = ${fact(n)}. ${ok ? `The assertion holds, so the program prints ${n + 1}! = ${fact(n + 1)}.` : `The assertion compares it with ${V} and fails at compile time.`}`), { q: 'Does this compile, and if so, what does it print?' });
        if (!ok) o.cerr = 'static assertion failed';
        return o;
      }
      const C = [['5', 10], ['2.5', -1], ["'a'", 194], ['true', 2], ['7L', 14], ['1.5f', -1], ["'0'", 96], ['-3', -6]], cs = R.sample(C, 3);
      return nq(`cout << g(${cs[0][0]}) + g(${cs[1][0]})\n     + g(${cs[2][0]});`, 'template <class T>\nint g(T x) {\n  if constexpr (\n      is_integral_v<T>)\n    return x * 2;\n  else\n    return -1;\n}', cs.reduce((s, c) => s + c[1], 0),
        `${cs.map(c => `g(${c[0]}) = ${c[1]}`).join(', ')}. Integer types, including char and bool, take the first branch; floating types the second.`);
    } }],
    [U[5]]: [{ id: 'cm-lambda', make(R) {
      const k = R.int(0, 1);
      if (k === 0) {
        const A = R.int(1, 9), B = R.int(10, 30), caps = R.sample(['[x]', '[&x]', '[=]', '[&]'], 2), ops = [['x + 1', v => v + 1], ['x * 2', v => v * 2]];
        const byRef = c => c.includes('&'), val = (c, op) => op(byRef(c) ? B : A);
        const right = `${val(caps[0], ops[0][1])} ${val(caps[1], ops[1][1])}`;
        return oq(`int x = ${A};\nauto f = ${caps[0]} { return ${ops[0][0]}; };\nauto g = ${caps[1]} { return ${ops[1][0]}; };\nx = ${B};\ncout << f() << ' ' << g();`, '', right,
          [`${ops[0][1](B)} ${ops[1][1](B)}`, `${ops[0][1](A)} ${ops[1][1](A)}`, `${val(caps[1], ops[0][1])} ${val(caps[0], ops[1][1])}`],
          `${caps[0]} ${byRef(caps[0]) ? 'refers to x and sees ' + B : 'copied x = ' + A + ' at creation'}; ${caps[1]} ${byRef(caps[1]) ? 'refers to x and sees ' + B : 'copied x = ' + A + ' at creation'}.`);
      }
      const A = R.int(0, 10), S = R.int(1, 5), useInit = R.int(0, 1), ops = [];
      let c = A, d = null; const n0 = A;
      const nC = R.int(1, 3); for (let i = 0; i < nC; i++) { ops.push('c();'); c += S; }
      const copy = R.int(0, 1); if (copy) { ops.push('auto d = c;'); d = c; const m = R.int(0, 2); for (let i = 0; i < m; i++) { ops.push(R.int(0, 1) ? (c += S, 'c();') : (d += S, 'd();')); } }
      const cv = c + S, last = copy ? (d + S) : n0;
      const head = useInit ? `auto c = [n = ${A}]() mutable {\n  return n += ${S};\n};` : `int n = ${A};\nauto c = [n]() mutable {\n  return n += ${S};\n};`;
      const tail = copy ? "cout << c() << ' ' << d();" : useInit ? 'cout << c();' : "cout << c() << ' ' << n;";
      const right = copy || !useInit ? `${cv} ${last}` : String(cv);
      const wrongs = copy ? [`${cv} ${cv + S}`, `${cv} ${A + S}`, `${A + S} ${last}`] : useInit ? [String(A + S), String(cv - S), String(cv + S)] : [`${cv} ${cv}`, `${A + S} ${n0}`, `${cv} ${cv - S}`];
      return oq(`${head}\n${ops.join('\n')}\n${tail}`, '', right, wrongs,
        `The lambda owns its copy of n, which mutable lets it change; each call adds ${S} and the state persists between calls.${copy ? ' auto d = c copies the lambda with its current state; afterwards the two count separately.' : useInit ? '' : ` The original n is untouched: ${n0}.`}`);
    } }],
    [U[6]]: [{ id: 'cm-stl', make(R) {
      const k = R.int(0, 5), B = 'auto b = v.begin(), e = v.end();';
      if (k === 0) {
        const v = R.vec(R.int(3, 5), 1, 9).map(x => x + R.pick([0.25, 0.5, 0.75])); let acc = 0; for (const x of v) acc = Math.trunc(acc + x);
        const exact = v.reduce((a, b) => a + b, 0), dbl = R.int(0, 3) === 0;
        return oq(`${vdecl('double', v)}\n${B}\ncout << accumulate(b, e, ${dbl ? '0.0' : '0'});`, '', dbl ? g6(exact) : String(acc), dbl ? [String(acc), String(Math.trunc(exact)), String(Math.round(exact))] : [g6(exact), String(Math.round(exact)), String(Math.trunc(exact) + 1)],
          dbl ? `With 0.0 the total is a double: ${g6(exact)}.` : `The total has the type of the initial value, int: each step truncates (${v.map(x => '+' + x).join(' ')} gives ${acc}), not ${g6(exact)}.`);
      }
      if (k === 1) {
        const v = []; while (v.length < R.int(6, 9)) { const x = R.int(1, 3), r = R.int(1, 3); for (let i = 0; i < r; i++) v.push(x); }
        let runs = 0; v.forEach((x, i) => { if (i === 0 || x !== v[i - 1]) runs++; });
        const sz = R.int(0, 1);
        return nq(`${vdecl('int', v)}\n${B}\nauto it = unique(b, e);\ncout << ${sz ? 'v.size()' : 'it - b'};`, '', sz ? v.length : runs,
          sz ? `unique only rearranges; the size stays ${v.length}.` : `unique keeps one element per run of equal adjacent values. Runs: ${runs}.`);
      }
      if (k === 2) {
        const v = R.vec(R.int(5, 8), 1, 20), m = R.int(2, 4), er = R.int(0, 1), keep = v.filter(x => x % m !== 0);
        return nq(`${vdecl('int', v)}\n${B}\nauto p = [](int x) {\n  return x % ${m} == 0;\n};\nauto it = remove_if(b, e, p);\n${er ? 'v.erase(it, e);\n' : ''}cout << ${er ? 'v.size()' : 'it - b'};`, '', keep.length,
          `remove_if moves the ${keep.length} elements not divisible by ${m} to the front and returns the end of that run.${er ? ' erase then cuts the tail.' : ''} ${keep.length}.`);
      }
      if (k === 3) {
        const v = R.vec(R.int(5, 8), 1, 30), t = R.int(5, 32), i = v.findIndex(x => x > t), ans = i < 0 ? v.length : i;
        return nq(`${vdecl('int', v)}\n${B}\nauto p = [](int x) {\n  return x > ${t};\n};\ncout << find_if(b, e, p) - b;`, '', ans,
          i < 0 ? `No element exceeds ${t}, so find_if returns e, whose index is the size, ${v.length}.` : `The first element above ${t} is ${v[i]}, at index ${i}.`);
      }
      if (k === 4) {
        const v = R.vec(R.int(5, 7), 1, 9), mx = Math.max(...v), i = v.indexOf(mx), j = v.lastIndexOf(mx);
        if (i === j) { v[R.pick([...v.keys()].filter(z => z !== i))] = mx; }
        const fi = v.indexOf(mx), la = v.lastIndexOf(mx);
        return oq(`${vdecl('int', v)}\n${B}\nauto it = max_element(b, e);\ncout << *it << ' ' << it - b;`, '', `${mx} ${fi}`, [`${mx} ${la}`, `${mx} ${fi + 1}`, `${fi} ${mx}`],
          `max_element returns the first of the largest elements: ${mx} at index ${fi}.`);
      }
      const ds = R.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5), v = ds.map(d => R.int(1, 9) * 10 + d), desc = R.int(0, 1);
      const s = v.slice().sort((x, y) => desc ? y % 10 - x % 10 : x % 10 - y % 10);
      return oq(`${vdecl('int', v)}\n${B}\nsort(b, e, [](int x, int y) {\n  return x % 10 ${desc ? '>' : '<'} y % 10;\n});\nfor (int x : v)\n  cout << x << ' ';`, '', s.join(' '),
        [v.slice().sort((x, y) => x - y).join(' '), v.slice().sort((x, y) => y - x).join(' '), s.slice().reverse().join(' ')],
        `The comparator orders by last digit, ${desc ? 'descending' : 'ascending'}; the tens digits play no part.`);
    } }],
    [U[7]]: [{ id: 'cm-cont', make(R) {
      const k = R.int(0, 2);
      const grow = (cap, size) => size ? Math.max(cap * 2, 1) : 1;
      if (k === 0) {
        const form = R.int(0, 3), N = R.int(3, 40);
        if (form === 0) { let c = 1; while (c < N) c *= 2;
          return nq(`vector<int> v;\nfor (int i = 0; i < ${N}; i++)\n  v.push_back(i);\ncout << v.capacity();`, '', c, `Capacity doubles from 1: the first power of 2 at least ${N} is ${c}.`, 'With GCC (libstdc++), what does this print?'); }
        if (form === 1) { const r = R.int(3, 12); let c = r; while (c < N) c *= 2;
          return nq(`vector<int> v;\nv.reserve(${r});\nfor (int i = 0; i < ${N}; i++)\n  v.push_back(i);\ncout << v.capacity();`, '', c, N <= r ? `${N} elements fit in the reserved ${r}.` : `From ${r}, each reallocation doubles: ${c}.`, 'With GCC (libstdc++), what does this print?'); }
        if (form === 2) { const n = R.int(2, 20);
          return nq(`vector<int> v(${n});\nv.push_back(1);\ncout << v.capacity();`, '', 2 * n, `v(${n}) has size and capacity ${n}; one more element doubles it.`, 'With GCC (libstdc++), what does this print?'); }
        return nq(`vector<int> v;\nfor (int i = 0; i < ${N}; i++)\n  v.push_back(i);\nv.shrink_to_fit();\ncout << v.capacity();`, '', N, `shrink_to_fit reallocates to exactly the size, ${N}, in libstdc++ (the standard makes it a nonbinding request).`, 'With GCC (libstdc++), what does this print?');
      }
      if (k === 1) {
        const N = R.int(2, 100); let cap = 0, n = 0; for (let i = 0; i < N; i++) { if (i === cap) { n++; cap = cap ? cap * 2 : 1; } }
        return nq(`vector<int> v;\nint n = 0;\nfor (int i = 0; i < ${N}; i++) {\n  if (v.size() == v.capacity())\n    n++;\n  v.push_back(i);\n}\ncout << n;`, '', n,
          `A push reallocates when the vector is full: at sizes 0, 1, 2, 4, 8, ... below ${N}. That is ${n} times.`, 'With GCC (libstdc++), what does this print?');
      }
      const P = [['You need keys kept in sorted order, with O(log n) insert and lookup.', 'map', ['unordered_map', 'vector', 'list'], 'A map is a balanced search tree: sorted, O(log n) per operation.'],
        ['You need the fastest average lookup by key and never iterate in order.', 'unordered_map', ['map', 'list', 'deque'], 'Hashing gives O(1) average lookup; order is not kept.'],
        ['You push and pop at both the front and the back.', 'deque', ['vector', 'map', 'set'], 'deque supports O(1) operations at both ends; vector only at the back.'],
        ['You repeatedly need the largest remaining element.', 'priority_queue', ['list', 'unordered_set', 'deque'], 'A binary heap gives the max in O(1) and pop in O(log n).'],
        ['You append and read by index, and iterate in a tight loop.', 'vector', ['list', 'map', 'unordered_map'], 'Contiguous storage: O(1) index, amortized O(1) append, cache-friendly iteration.'],
        ['You splice whole sublists between sequences in O(1).', 'list', ['vector', 'deque', 'map'], 'Only a linked list can relink a range without copying it.'],
        ['You need to know whether a value is present, in sorted order, with no duplicates.', 'set', ['vector', 'unordered_multimap', 'deque'], 'A set keeps unique keys sorted with O(log n) lookup.']];
      const [q, a, w, x] = R.pick(P);
      return { q: `${q} Which container fits best?`, c: [a, ...w], x };
    } }],
    [U[8]]: [{ id: 'cm-layout', make(R) {
      const TY = [['char', 1], ['bool', 1], ['short', 2], ['int', 4], ['float', 4], ['double', 8], ['long long', 8]];
      const k = R.int(0, 3);
      if (k === 3) {
        const A = R.pick([16, 32, 64]), sz = R.int(1, A + 8), n = R.int(2, 5), s = Math.ceil(sz / A) * A;
        return nq(`P arr[${n}];\ncout << sizeof(arr);`, `struct alignas(${A}) P {\n  char c[${sz}];\n};`, n * s, `sizeof(P) is ${sz} rounded up to a multiple of ${A}: ${s}. The array holds ${n} of them: ${n * s}.`, 'On x86-64, what does this print?');
      }
      const mem = Array.from({ length: R.int(3, 5) }, () => R.pick(TY)), nm = 'abcde';
      const lay = ms => { let off = 0, al = 1; const offs = []; for (const [, s] of ms) { off = Math.ceil(off / s) * s; offs.push(off); off += s; al = Math.max(al, s); } return { offs, size: Math.ceil(off / al) * al }; };
      const L = lay(mem), struct = `struct S {\n${mem.map((m, i) => `  ${m[0]} ${nm[i]};`).join('\n')}\n};`;
      if (k === 0) return nq('cout << sizeof(S);', struct, L.size, `Offsets: ${mem.map((m, i) => `${nm[i]} at ${L.offs[i]}`).join(', ')}. The members end at ${L.offs[mem.length - 1] + mem[mem.length - 1][1]}, rounded up to the alignment ${Math.max(...mem.map(m => m[1]))}: ${L.size}.`, 'On x86-64, what does this print?');
      if (k === 1) { const i = R.int(1, mem.length - 1);
        return nq(`cout << offsetof(S, ${nm[i]});`, struct, L.offs[i], `Each member starts at the next multiple of its alignment: ${mem.map((m, j) => `${nm[j]} at ${L.offs[j]}`).join(', ')}.`, 'On x86-64, what does this print?'); }
      const sorted = mem.map((m, i) => [m, i]).sort((x, y) => y[0][1] - x[0][1] || x[1] - y[1]), Ls = lay(sorted.map(x => x[0]));
      if (Ls.size === L.size) return this.make(R);
      return { q: `On x86-64, sizeof(S) is ${L.size}. What is the smallest sizeof(S) you can get by reordering the members?`, code: struct,
        cpp: `${HEAD}struct S {\n${sorted.map(([m, i]) => `  ${m[0]} ${nm[i]};`).join('\n')}\n};\nint main() {\ncout << sizeof(S);\n}\n`, answer: Ls.size,
        x: `Order by decreasing alignment (${sorted.map(([m, i]) => nm[i]).join(', ')}): the members pack with padding only at the end, giving ${Ls.size}.` };
    } }],
    [U[9]]: [{ id: 'cm-float', make(R) {
      const k = R.int(0, 4);
      if (k === 0) {
        const P = [[0.1, 0.2, 0.3], [0.5, 0.25, 0.75], [0.1, 0.7, 0.8], [1.5, 2.25, 3.75], [0.2, 0.4, 0.6], [0.3, 0.6, 0.9], [0.25, 0.125, 0.375], [0.1, 0.1, 0.2], [0.7, 0.1, 0.8], [2.5, 0.5, 3]];
        const [a, b, z] = R.pick(P), eq = a + b === z ? 1 : 0;
        return nq(`double a = ${a}, b = ${b};\ncout << (a + b == ${z});`, '', eq, eq ? `The sum rounds to exactly the double nearest ${z}${[a, b, z].every(x => Number.isInteger(x * 1024)) ? '; these are exact binary fractions' : ''}.` : `${a} + ${b} is ${g17(a + b)} in double arithmetic, not the double nearest ${z} (${g17(z)}).`);
      }
      if (k === 1) {
        const P = [[0.1, 0.2], [0.5, 0.25], [0.1, 0.7], [0.3, 0.6], [1.1, 2.2], [0.25, 0.5], [0.2, 0.4]], [a, b] = R.pick(P), s = a + b;
        return oq(`cout << setprecision(17)\n     << ${a} + ${b};`, '', g17(s), [g6(s), g17(s + 2 ** -52 * Math.max(1, s)), s.toFixed(17)].filter(x => x !== g17(s)),
          `17 significant digits show the stored double exactly enough to distinguish it: ${g17(s)}.`);
      }
      if (k === 2) {
        const K = R.int(1, 7), v = 2n ** 53n + BigInt(K), d = BigInt(Number(v)) - v;
        return nq(`long long n = (1LL << 53) + ${K};\ndouble d = n;\ncout << (long long)d - n;`, '', Number(d),
          `Above 2^53 doubles are 2 apart. 2^53 + ${K} ${K % 2 ? `is halfway between two doubles and rounds to the one with an even significand, a change of ${d}` : 'is exactly representable'}.`);
      }
      if (k === 3) {
        const big = R.pick([1e16, 2 ** 53, 3e16]), form = R.int(0, 2), ex = ['(big + 1 + 1) - big', '(big + (1 + 1)) - big', '(big + 3) - big'][form];
        const val = [(big + 1 + 1) - big, (big + (1 + 1)) - big, (big + 3) - big][form];
        return nq(`double big = ${big === 2 ** 53 ? '9007199254740992.0' : big.toExponential().replace('e+', 'e')};\ncout << ${ex};`, '', val,
          `Near ${g6(big)} consecutive doubles are ${big >= 2 ** 54 ? 4 : 2} apart, and each addition rounds (half to even). ${['Each +1 is rounded away separately', 'The 2 is added at once and survives', 'big + 3 rounds to the nearest representable value'][form]}: ${val}.`);
      }
      let p; const want = R.int(0, 1);
      for (let t = 0; t < 200; t++) { p = R.int(1, 9999) / 100; if ((Math.trunc(p * 100) !== Math.round(p * 100)) === !!want) break; }
      const rnd = R.int(0, 3) === 0, tr = Math.trunc(p * 100), rd = Math.round(p * 100);
      return nq(`double p = ${p};\nlong long t = ${rnd ? 'llround(p * 100)' : 'p * 100'};\ncout << t;`, '', rnd ? rd : tr,
        rnd ? `llround rounds to the nearest integer: ${rd}.` : tr !== rd ? `${p} is stored slightly low, so p * 100 is ${g17(p * 100)}; converting to an integer truncates to ${tr}.` : `p * 100 is ${g17(p * 100)}, which truncates to ${tr}.`);
    } }],
    [U[10]]: [{ id: 'cm-atomic', make(R) {
      const k = R.int(0, 2);
      if (k === 0) {
        const N = R.int(2, 4), M = R.pick([100, 250, 500, 1000]), form = R.int(0, 2);
        const inc = ['c++;', 'c += 2;', 'c.fetch_add(3);'][form], per = [1, 2, 3][form];
        const mutex = R.int(0, 3) === 0;
        const decl = mutex ? 'mutex mu;\nint c = 0;' : 'atomic<int> c{0};', step = mutex ? `{\n      lock_guard<mutex> g(mu);\n      ${inc}\n    }` : inc;
        if (mutex && form === 2) return this.make(R);
        return nq(`${decl}\nauto work = [&] {\n  for (int j = 0; j < ${M}; j++)\n    ${step}\n};\nvector<thread> ts;\nfor (int i = 0; i < ${N}; i++)\n  ts.emplace_back(work);\nfor (auto& t : ts) t.join();\ncout << c;`, '', N * M * per,
          `${mutex ? 'Every update happens under the lock' : 'Every update is one atomic read-modify-write'}, so none is lost: ${N} threads × ${M} iterations × ${per} = ${N * M * per}.`);
      }
      if (k === 1) {
        let a = R.int(1, 9); const a0 = a, ops = R.sample([0, 1, 2, 3, 4], 3), names = ['x', 'y', 'z'], vals = [], lines = [`atomic<int> a{${a0}};`];
        ops.forEach((o, i) => { const v = R.int(2, 9); let r, s;
          if (o === 0) { r = a; a += v; s = `a.fetch_add(${v})`; } else if (o === 1) { r = a; a = v; s = `a.exchange(${v})`; } else if (o === 2) { a++; r = a; s = '++a'; } else if (o === 3) { r = a; a++; s = 'a++'; } else { a += v; r = a; s = `a += ${v}`; }
          lines.push(`int ${names[i]} = ${s};`); vals.push(r); });
        return nq(`${lines.join('\n')}\ncout << x + y + z;`, '', vals.reduce((p, q) => p + q, 0),
          `fetch_add, exchange and a++ return the old value; ++a and += return the new one. x = ${vals[0]}, y = ${vals[1]}, z = ${vals[2]}.`);
      }
      const A = R.int(1, 9), E = R.pick([A, R.int(1, 9)]), D = R.int(10, 20), ok = A === E;
      return { q: `atomic<int> a holds ${A} and int e is ${E}. After bool ok = a.compare_exchange_strong(e, ${D}), what are ok, a and e?`, cpp: `${HEAD}int main() {\natomic<int> a{${A}};\nint e = ${E};\nbool ok = a.compare_exchange_strong(e, ${D});\ncout << ok << ' ' << a << ' ' << e;\n}\n`,
        c: mc(ok ? `1 ${D} ${E}` : `0 ${A} ${A}`, ok ? [`1 ${D} ${D}`, `0 ${A} ${E}`, `1 ${A} ${E}`] : [`0 ${A} ${E}`, `1 ${D} ${E}`, `0 ${D} ${A}`]),
        x: ok ? `a equals e, so the exchange succeeds: a becomes ${D}, and e is unchanged.` : `a (${A}) differs from e (${E}), so nothing is stored and e receives a's current value, ${A}.` };
    } }],
    [U[11]]: [{ id: 'cm-lowlat', make(R) {
      const k = R.int(0, 2);
      if (k === 0) {
        const N = R.pick([4, 8]), P = R.int(N - 1, N + 3), pops = R.int(1, 3), extra = R.int(1, 3);
        const sim = (cap, mode) => { let q = [], ok = 0; const push = x => { if (q.length < cap) { q.push(x); ok++; } else if (mode === 'lossy') { q.shift(); q.push(x); } };
          for (let i = 1; i <= P; i++) push(i); for (let i = 0; i < pops; i++) mode === 'lifo' ? q.pop() : q.shift(); for (let i = 0; i < extra; i++) push(10 * (i + 1));
          return `${ok} ${mode === 'lifo' ? q[q.length - 1] : q[0]}`; };
        const right = sim(N, 'fifo');
        return Object.assign(oq(`Ring<${N}> r;\nint ok = 0;\nfor (int i = 1; i <= ${P}; i++)\n  ok += r.push(i);\n${'r.pop();\n'.repeat(pops)}for (int i = 1; i <= ${extra}; i++)\n  ok += r.push(10 * i);\ncout << ok << ' ' << r.pop();`, '', right,
          [sim(N, 'lossy'), sim(N - 1, 'fifo'), sim(N, 'lifo'), sim(N + 1, 'fifo')],
          `The ring holds ${N}; a push into a full ring fails and returns false. FIFO order: pops return the oldest item. Output: ${right}.`), { q: `Ring is the SPSC ring buffer from the lesson. What does this print?`, cpp: `${HEAD}${RING}\nint main() {\nRing<${N}> r;\nint ok = 0;\nfor (int i = 1; i <= ${P}; i++)\n  ok += r.push(i);\n${'r.pop();\n'.repeat(pops)}for (int i = 1; i <= ${extra}; i++)\n  ok += r.push(10 * i);\ncout << ok << ' ' << r.pop();\n}\n` });
      }
      if (k === 1) {
        const a = R.int(2, 5), b = R.int(1, 9), x = R.int(1, 9), y = R.int(1, 9);
        const D = `struct A : Base<A> {\n  int step(int x) {\n    return x * ${a};\n  }\n};\nstruct B : Base<B> {\n  int step(int x) {\n    return x + ${b};\n  }\n};`;
        return { q: 'Base is the CRTP template from the lesson. What does this print?', code: `${D}\n// in main:\ncout << A().run(${x})\n     + B().run(${y});`,
          cpp: `${HEAD}${CRTP}\n${D}\nint main() {\ncout << A().run(${x})\n     + B().run(${y});\n}\n`, answer: x * a + 1 + y + b + 1,
          x: `run calls the derived step through static_cast, then adds 1: (${x} · ${a} + 1) + (${y} + ${b} + 1).` };
      }
      const P = [['Which change most reduces tail latency from memory allocation in a hot loop?', ['Preallocate: reserve buffers and reuse objects from a pool', 'Switch from new to malloc', 'Use shared_ptr everywhere', 'Allocate larger objects'], 'Allocation can take locks or call the OS; preallocation removes it from the hot path.'],
        ['Two threads each update their own counter, and both counters share a cache line. The fix:', ['Align each counter to its own 64-byte line', 'Make the counters volatile', 'Use a mutex', 'Use smaller integers'], 'This is false sharing; separating the lines stops them bouncing between cores.'],
        ['A hot function calls a virtual method on an object whose type is known at compile time. A zero-cost alternative is:', ['CRTP or a template parameter', 'std::function', 'a function pointer table', 'dynamic_cast'], 'Static dispatch resolves the call at compile time, so it can be inlined.'],
        ['An unpredictable branch sits in the inner loop of a pricing kernel. One remedy:', ['Rewrite it as branch-free arithmetic or a select', 'Add more branches', 'Use exceptions', 'Insert sleep calls'], 'A mispredicted branch costs 15 to 20 cycles; a select has no branch to mispredict.'],
        ['A ring buffer of capacity 1000 uses i & (N - 1) for slots. The bug:', ['1000 is not a power of two, so the mask is not i mod N', 'The mask is too slow', 'Unsigned counters cannot wrap', 'Nothing'], '999 is not a run of low one-bits, so the mask skips slots.'],
        ['Why do low-latency threads often spin on a flag instead of waiting on a condition variable?', ['Waking a sleeping thread costs microseconds of scheduler latency', 'Condition variables are deprecated', 'Spinning uses less power', 'Flags need no synchronization'], 'Spinning trades a dedicated core for the lowest wake-up latency.']];
      const [q, c, x] = R.pick(P);
      return { q, c, x };
    } }]
  } });
})();
