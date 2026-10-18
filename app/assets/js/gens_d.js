'use strict';
// Unit generators for Python (verified by executing the code) and Physics.
(() => {
  const pmod = (a, b) => ((a % b) + b) % b, pdiv = (a, b) => Math.floor(a / b);

  // ======================= PYTHON =======================
  registerUnitGens('python', {
    tag: { 'pg-slice': 'Strings and slicing', 'pg-floordiv': 'Numbers and arithmetic', 'pg-range': 'Comprehensions and generators', 'pg-comp': 'Comprehensions and generators', 'pg-while': 'Control flow', 'pg-dict': 'Lists, dicts, sets' },
    units: {
      'Names and objects': [
        { id: 'yu-alias', make(R) { const n = R.int(1, 4), k = R.int(1, 3), mode = R.pick(['append', 'plus', 'pluseq']), xs = Array.from({ length: n }, () => R.int(0, 9));
          const op = { append: 'b.append(9)', plus: 'b = b + [9]', pluseq: 'b += [9]' }[mode], code = `a = [${xs.join(', ')}]\nb = a\n${Array(k).fill(op).join('\n')}\nprint(len(a))`, ans = mode === 'plus' ? n : n + k;
          return { q: 'What does this print?', code, answer: ans,
            x: mode === 'plus' ? '`b + [9]` builds a new list each time and moves the name b to it; a is untouched.' : `a and b name the same list, and ${mode === 'append' ? 'append' : '+='} changes that list in place, so a sees all ${k} additions.` }; } }
      ],
      'Built-in types': [
        { id: 'yu-set', make(R) { const xs = Array.from({ length: R.int(5, 9) }, () => R.int(0, 5)), kind = R.int(0, 1);
          if (kind) return { q: 'What does this print?', code: `xs = [${xs.join(', ')}]\nprint(len(set(xs)))`, answer: new Set(xs).size, x: `A set keeps one copy of each value: {${[...new Set(xs)].sort((a, b) => a - b).join(', ')}}.` };
          const t = R.int(1, 4), u = R.int(1, 4); return { q: 'What does this print?', code: `t = (${Array(t).fill(1).join(', ')}${t === 1 ? ',' : ''})\nu = t + (${Array(u).fill(2).join(', ')}${u === 1 ? ',' : ''})\nprint(len(u))`, answer: t + u, x: 'Tuples are immutable; + builds a new, longer tuple. A one-element tuple needs a trailing comma.' }; } }
      ],
      'Numbers and arithmetic': [
        { id: 'yu-mod', make(R) { const a = R.int(-30, 30), b = R.int(2, 9), op = R.pick(['%', '//']), ans = op === '%' ? pmod(a, b) : pdiv(a, b);
          return { q: 'What does this print?', code: `print(${a} ${op} ${b})`, answer: ans,
            x: op === '//' ? `// rounds down (toward negative infinity): ${a}/${b} = ${(a / b).toFixed(3)}, which floors to ${ans}.` : `% gives the remainder matching floor division: ${a} = ${b}*${pdiv(a, b)} + ${ans}.` }; } }
      ],
      'Lists, dicts, sets': [
        { id: 'yu-listops', make(R) { const xs = Array.from({ length: R.int(3, 5) }, () => R.int(1, 9)), lines = [`xs = [${xs.join(', ')}]`], s = xs.slice();
          for (let i = 0; i < 3; i++) { const op = R.pick(['append', 'pop', 'pop0', 'insert']); const v = R.int(1, 9);
            if (op === 'append') { s.push(v); lines.push(`xs.append(${v})`); } else if (op === 'pop' && s.length > 1) { s.pop(); lines.push('xs.pop()'); } else if (op === 'pop0' && s.length > 1) { s.shift(); lines.push('xs.pop(0)'); } else { s.splice(1, 0, v); lines.push(`xs.insert(1, ${v})`); } }
          const ask = R.int(0, 1) === 1 && s.length > 1; lines.push(ask ? 'print(xs[1])' : 'print(sum(xs))');
          return { q: 'What does this print?', code: lines.join('\n'), answer: ask ? s[1] : s.reduce((a, b) => a + b, 0), x: `After the operations the list is [${s.join(', ')}].` }; } }
      ],
      'Control flow': [
        { id: 'yu-loop', make(R) { const a = R.int(0, 5), b = a + R.int(5, 15), st = R.pick([1, 1, 2, 3]), k = R.int(2, 4); let tot = 0; for (let i = a; i < b; i += st) { if (i % k === 0) continue; tot += i; }
          return { q: 'What does this print?', code: `total = 0\nfor i in range(${a}, ${b}${st > 1 ? `, ${st}` : ''}):\n    if i % ${k} == 0:\n        continue\n    total += i\nprint(total)`, answer: tot,
            x: `range(${a}, ${b}${st > 1 ? `, ${st}` : ''}) stops before ${b}. continue skips multiples of ${k}; the rest add to ${tot}.` }; } }
      ],
      'Functions and arguments': [
        { id: 'yu-defaults', make(R) { const B = R.int(2, 5), C = R.int(0, 9), X = R.int(1, 9), Y = R.int(2, 6), Z = R.int(0, 9), kind = R.int(0, 3);
          const call = [`f(${X})`, `f(${X}, ${Y})`, `f(${X}, c=${Z})`, `f(c=${Z}, a=${X})`][kind], ans = [X * B + C, X * Y + C, X * B + Z, X * B + Z][kind];
          return { q: 'What does this print?', code: `def f(a, b=${B}, c=${C}):\n    return a * b + c\n\nprint(${call})`, answer: ans, x: 'Missing arguments take their defaults; keyword arguments can come in any order.' }; } }
      ],
      'Scope and closures': [
        { id: 'yu-closure', make(R) { if (R.int(0, 1)) { const s = R.int(1, 5), k = R.int(1, 4);
            return { q: 'What does this print?', code: `def make(step):\n    n = 0\n    def inc():\n        nonlocal n\n        n += step\n        return n\n    return inc\n\nc = make(${s})\n${Array(k).fill('c()').join('\n')}\nprint(c())`, answer: s * (k + 1), x: `The closure keeps n alive between calls; after ${k + 1} calls n = ${s * (k + 1)}.` }; }
          const A = R.int(1, 9), B = R.int(10, 20), glob = R.int(0, 1) === 1;
          return { q: 'What does this print?', code: `x = ${A}\ndef f():\n${glob ? '    global x\n' : ''}    x = ${B}\n    return x\n\nf()\nprint(x)`, answer: glob ? B : A, x: glob ? 'global makes the assignment change the module-level x.' : 'Assigning inside f creates a new local x; the global x is untouched.' }; } }
      ],
      'Copying': [
        { id: 'yu-copy', make(R) { const how = R.pick(['a.copy()', 'list(a)', 'a[:]', 'copy.deepcopy(a)']), deep = how.startsWith('copy'), n0 = R.int(1, 3), n1 = R.int(1, 3);
          const code = `${deep ? 'import copy\n' : ''}a = [[${Array(n0).fill(1).join(', ')}], [${Array(n1).fill(2).join(', ')}]]\nb = ${how}\nb[0].append(9)\nb.append([7])\nprint(len(a[0]) + len(a))`;
          return { q: 'What does this print?', code, answer: (deep ? n0 : n0 + 1) + 2, x: deep ? 'A deep copy shares nothing: a is unchanged.' : 'A shallow copy has a new outer list but shares the inner lists: b[0].append changes a[0], but b.append does not change a.' }; } }
      ],
      'Exceptions': [
        { id: 'yu-except', make(R) { const ds = Array.from({ length: R.int(3, 5) }, () => R.pick([0, 1, 2, 3, 4, 6])), N = R.pick([12, 24, 30]); let tot = 0; for (const d of ds) tot += d === 0 ? 100 : pdiv(N, d);
          return { q: 'What does this print?', code: `total = 0\nfor d in [${ds.join(', ')}]:\n    try:\n        total += ${N} // d\n    except ZeroDivisionError:\n        total += 100\nprint(total)`, answer: tot, x: `Each zero raises ZeroDivisionError and adds 100 instead; the other values add ${N} // d.` }; } }
      ],
      'Classes': [
        { id: 'yu-class', make(R) { const m = R.int(1, 4), n = R.int(1, 9), k = R.int(2, 5);
          return { q: 'What does this print?', code: `class Counter:\n    count = 0\n    def __init__(self, n):\n        self.n = n\n        Counter.count += 1\n    def scaled(self, k):\n        return self.n * k\n\n${Array.from({ length: m }, (_, i) => `c${i} = Counter(${i === m - 1 ? n : i + 1})`).join('\n')}\nprint(Counter.count * 10 + c${m - 1}.scaled(${k}))`, answer: m * 10 + n * k,
            x: `count is a class attribute shared by all instances: it reaches ${m}. scaled uses the last object's own n = ${n}.` }; } }
      ],
      'Time complexity': [
        { id: 'yu-count', make(R) { const n = R.int(4, 30), kind = R.int(0, 3); let c = 0;
          if (kind === 0) for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) c++; else if (kind === 1) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) c++;
          else if (kind === 2) { let i = n; while (i > 1) { i = Math.floor(i / 2); c++; } } else for (let i = 0; i < n; i++) for (let j = i; j < n; j++) c++;
          const code = [`c = 0\nfor i in range(${n}):\n    for j in range(i):\n        c += 1\nprint(c)`, `c = 0\nfor i in range(${n}):\n    for j in range(${n}):\n        c += 1\nprint(c)`, `c, i = 0, ${n}\nwhile i > 1:\n    i //= 2\n    c += 1\nprint(c)`, `c = 0\nfor i in range(${n}):\n    for j in range(i, ${n}):\n        c += 1\nprint(c)`][kind];
          return { q: 'How many times does the counter increase? (What does this print?)', code, answer: c,
            x: [`0 + 1 + ... + ${n - 1} = n(n-1)/2: quadratic growth.`, `n * n = ${n * n}: quadratic.`, `Halving until 1 takes about log2(n) steps: logarithmic.`, `n + (n-1) + ... + 1 = n(n+1)/2: quadratic.`][kind] }; } }
      ],
      'NumPy essentials': [
        { id: 'yu-np', make(R) { const kind = R.int(0, 3);
          if (kind === 0) { const n = R.int(6, 30), k = R.int(2, 5); return { q: 'What does this print?', code: `import numpy as np\na = np.arange(${n})\nprint((a % ${k} == 0).sum())`, answer: Math.ceil(n / k), x: `The mask is True for 0, ${k}, ${2 * k}, ... below ${n}; True counts as 1.` }; }
          if (kind === 1) { const r = R.pick([2, 3, 4]), c = R.int(2, 6); return { q: 'What does this print?', code: `import numpy as np\na = np.arange(${r * c}).reshape(${r}, -1)\nprint(a.shape[1])`, answer: c, x: `-1 lets NumPy infer the size: ${r * c} / ${r} = ${c} columns.` }; }
          if (kind === 2) { const n = R.int(5, 15), t = R.int(1, n - 2); let s = 0; for (let i = t + 1; i < n; i++) s += i; return { q: 'What does this print?', code: `import numpy as np\na = np.arange(${n})\nprint(a[a > ${t}].sum())`, answer: s, x: `The boolean mask keeps ${t + 1} through ${n - 1}; their sum is ${s}.` }; }
          const n = R.int(3, 10), k = R.int(2, 5); return { q: 'What does this print?', code: `import numpy as np\na = np.arange(${n})\nprint((a * ${k}).sum())`, answer: k * n * (n - 1) / 2, x: `Elementwise multiply, then sum: ${k} * (0 + 1 + ... + ${n - 1}).` }; } }
      ]
    }
  });

  // ======================= PHYSICS =======================
  const g = 9.8;
  registerUnitGens('physics', {
    tag: { 'phg-stop': 'One-dimensional kinematics', 'phg-fall': 'One-dimensional kinematics', 'phg-proj': 'Projectile motion', 'phg-fric': "Newton's laws and free-body diagrams", 'phg-energy': 'Work and energy', 'phg-inel': 'Momentum and collisions', 'phg-circuit': 'Circuits', 'phg-pend': 'Oscillations' },
    units: {
      'Units and dimensional analysis': [
        { id: 'hu-units', make(R) { if (R.int(0, 1)) { const v = R.int(10, 150); return { q: T`Convert ${v} km/h to m/s, to two decimals.`, answer: v / 3.6, tol: 0.01, hint: 'Round to two decimals.', x: T`\(${v}\cdot\frac{1000\text{ m}}{3600\text{ s}} \approx ${R.fmt(v / 3.6, 2)}\) m/s.`, v: `Rational(${v}*1000, 3600)` }; }
          const v = R.int(2, 50); return { q: T`Convert ${v} m/s to km/h.`, answer: v * 3.6, tol: 0.01, x: T`\(${v}\cdot\frac{3600}{1000} = ${R.fmt(v * 3.6, 2)}\) km/h.`, v: `${v}*Rational(3600, 1000)` }; } }
      ],
      "Newton's laws and free-body diagrams": [
        { id: 'hu-incline', make(R) { const th = R.int(4, 12) * 5, mu = R.pick([0, 0.1, 0.2, 0.3]), a = g * (Math.sin(th * Math.PI / 180) - mu * Math.cos(th * Math.PI / 180));
          if (a <= 0) return this.make(R);
          return { q: T`A block slides down a \(${th}^\circ\) slope with friction coefficient ${mu} (\(g = 9.8\)). Find its acceleration in m/s², to two decimals.`, answer: a, tol: 0.01, hint: 'Round to two decimals.',
            x: T`Along the slope: \(mg\sin\theta - \mu mg\cos\theta = ma\), so \(a = 9.8(\sin${th}^\circ - ${mu}\cos${th}^\circ) \approx ${R.fmt(a, 2)}\).`, v: `9.8*(sin(pi*${th}/180) - ${mu}*cos(pi*${th}/180))` }; } }
      ],
      'Circular motion and gravitation': [
        { id: 'hu-circ', make(R) { const m = R.int(1, 10), v = R.int(2, 20), r = R.int(1, 12), F = m * v * v / r;
          return { q: T`A ${m} kg object moves at ${v} m/s in a circle of radius ${r} m. Find the centripetal force in N, to two decimals.`, answer: F, tol: 0.01, hint: 'Round to two decimals.', x: T`\(F = \frac{mv^2}{r} = \frac{${m}\cdot${v * v}}{${r}} \approx ${R.fmt(F, 2)}\) N.`, v: `Rational(${m}*${v}**2, ${r})` }; } }
      ],
      'Power': [
        { id: 'hu-power', make(R) { if (R.int(0, 1)) { const W = R.int(1, 50) * 100, t = R.int(2, 20); return { q: T`${W} J of work is done in ${t} s. Find the power in watts, to two decimals.`, answer: W / t, tol: 0.01, hint: 'Round to two decimals.', x: T`\(P = \frac Wt = \frac{${W}}{${t}}\).`, v: `Rational(${W}, ${t})` }; }
          const F = R.int(1, 20) * 50, v = R.int(2, 30); return { q: T`A force of ${F} N moves an object at a steady ${v} m/s. Find the power in watts.`, answer: F * v, x: T`\(P = Fv = ${F}\cdot${v}\).`, v: `${F}*${v}` }; } }
      ],
      'Rotation': [
        { id: 'hu-torque', make(R) { const r = R.int(1, 10) / 10, F = R.int(5, 50), th = R.int(2, 18) * 5, tau = r * F * Math.sin(th * Math.PI / 180);
          return { q: T`A ${F} N force acts ${r} m from a pivot, at \(${th}^\circ\) to the lever. Find the torque in N·m, to two decimals.`, answer: tau, tol: 0.01, hint: 'Round to two decimals.', x: T`\(\tau = rF\sin\theta = ${r}\cdot${F}\sin${th}^\circ \approx ${R.fmt(tau, 2)}\).`, v: `${r}*${F}*sin(pi*${th}/180)` }; } },
        { id: 'hu-inertia', make(R) { const ms = [R.int(1, 5), R.int(1, 5)], rs = [R.int(1, 4), R.int(1, 4)], I = ms[0] * rs[0] ** 2 + ms[1] * rs[1] ** 2;
          return { q: T`Point masses of ${ms[0]} kg at ${rs[0]} m and ${ms[1]} kg at ${rs[1]} m rotate about an axis. Find the moment of inertia in kg·m².`, answer: I, x: T`\(I = \sum mr^2 = ${ms[0]}(${rs[0]})^2 + ${ms[1]}(${rs[1]})^2 = ${I}\).`, v: `${ms[0]}*${rs[0]}**2 + ${ms[1]}*${rs[1]}**2` }; } }
      ],
      'Oscillations': [
        { id: 'hu-spring', make(R) { const m = R.int(1, 10) / 2, k = R.int(2, 40) * 5, T0 = 2 * Math.PI * Math.sqrt(m / k);
          return { q: T`A ${m} kg mass hangs on a spring with \(k = ${k}\) N/m. Find the period in seconds, to three decimals.`, answer: T0, tol: 0.0015, hint: 'Round to three decimals.', x: T`\(T = 2\pi\sqrt{m/k} = 2\pi\sqrt{${m}/${k}} \approx ${R.fmt(T0, 3)}\) s.`, v: `2*pi*sqrt(${m}/${k})` }; } }
      ],
      'Waves and sound': [
        { id: 'hu-wave', make(R) { const v = R.pick([340, 343, 1500, 300]), f = R.pick([50, 100, 170, 250, 440, 500, 1000]);
          if (R.int(0, 1)) return { q: T`A wave travels at ${v} m/s with frequency ${f} Hz. Find its wavelength in m, to three decimals.`, answer: v / f, tol: 0.0015, hint: 'Round to three decimals.', x: T`\(\lambda = \frac vf = \frac{${v}}{${f}}\).`, v: `Rational(${v}, ${f})` };
          const lam = R.pick([0.5, 1, 2, 4]); return { q: T`A wave travels at ${v} m/s with wavelength ${lam} m. Find its frequency in Hz.`, answer: v / lam, tol: 0.01, x: T`\(f = \frac{v}{\lambda} = \frac{${v}}{${lam}}\).`, v: `${v}/${lam}` }; } }
      ],
      'Fluids': [
        { id: 'hu-fluid', make(R) { if (R.int(0, 1)) { const h = R.int(1, 40); return { q: T`Find the gauge pressure ${h} m below the surface of water, in kPa (\(\rho = 1000\), \(g = 9.8\)).`, answer: 9.8 * h, tol: 0.01, x: T`\(P = \rho gh = 1000\cdot9.8\cdot${h}\) Pa \(= ${R.fmt(9.8 * h, 2)}\) kPa.`, v: `1000*9.8*${h}/1000` }; }
          const V = R.int(1, 20) / 1000; return { q: T`An object of volume ${V} m³ is fully submerged in water. Find the buoyant force in N (\(g = 9.8\)).`, answer: 1000 * V * 9.8, tol: 0.01, x: T`Weight of displaced water: \(\rho Vg = 1000\cdot${V}\cdot9.8\).`, v: `1000*${V}*9.8` }; } }
      ],
      'Electrostatics': [
        { id: 'hu-coulomb', make(R) { const q1 = R.int(1, 9), q2 = R.int(1, 9), r = R.int(1, 10) / 10, F = 8.99e9 * q1 * 1e-6 * q2 * 1e-6 / (r * r);
          return { q: T`Charges of ${q1} μC and ${q2} μC are ${r} m apart. Find the force between them in N, to two decimals (\(k = 8.99\times10^9\)).`, answer: F, tol: Math.max(0.01, F * 0.002), hint: 'Round to two decimals.',
            x: T`\(F = \frac{kq_1q_2}{r^2} = \frac{8.99\times10^9\cdot${q1}\times10^{-6}\cdot${q2}\times10^{-6}}{${r}^2} \approx ${R.fmt(F, 2)}\) N.`, v: `8.99e9*${q1}e-6*${q2}e-6/${r}**2` }; } }
      ],
      'Magnetism and induction': [
        { id: 'hu-emf', make(R) { if (R.int(0, 1)) { const N = R.int(1, 200), dP = R.int(1, 20) / 100, dt = R.int(1, 10) / 10; return { q: T`The flux through a ${N}-turn coil changes by ${dP} Wb in ${dt} s. Find the induced EMF in volts, to two decimals.`, answer: N * dP / dt, tol: 0.01, hint: 'Round to two decimals.', x: T`\(\mathcal E = N\frac{\Delta\Phi}{\Delta t} = ${N}\cdot\frac{${dP}}{${dt}}\).`, v: `${N}*${dP}/${dt}` }; }
          const q = R.int(1, 5), v = R.int(1, 20), B = R.int(1, 10) / 10, th = R.pick([30, 45, 60, 90]); return { q: T`A ${q} C charge moves at ${v} m/s at \(${th}^\circ\) to a ${B} T field. Find the force in N, to two decimals.`, answer: q * v * B * Math.sin(th * Math.PI / 180), tol: 0.01, hint: 'Round to two decimals.', x: T`\(F = qvB\sin\theta\).`, v: `${q}*${v}*${B}*sin(pi*${th}/180)` }; } }
      ],
      'Thermodynamics': [
        { id: 'hu-first', make(R) { const Q = R.int(-10, 30) * 50, W = R.int(-5, 20) * 50;
          const qs = Q >= 0 ? `absorbs ${Q} J of heat` : `gives off ${-Q} J of heat`, ws = W >= 0 ? `does ${W} J of work on its surroundings` : `has ${-W} J of work done on it`;
          return { q: T`A gas ${qs} and ${ws}. Find \(\Delta U\) in J.`, answer: Q - W, x: T`Heat in is positive and work done by the gas is positive, so \(Q = ${Q}\) J and \(W = ${W}\) J. First law: \(\Delta U = Q - W = ${Q} - (${W}) = ${Q - W}\).`, v: `${Q} - (${W})` }; } },
        { id: 'hu-carnot', make(R) { const Tc = R.int(25, 40) * 10, Th = Tc + R.int(5, 60) * 10;
          return { q: T`Find the Carnot efficiency between ${Th} K and ${Tc} K, to three decimals.`, answer: 1 - Tc / Th, tol: 0.0015, hint: 'Round to three decimals.', x: T`\(\eta = 1 - \frac{T_c}{T_h} = 1 - \frac{${Tc}}{${Th}}\).`, v: `1 - Rational(${Tc}, ${Th})` }; } }
      ]
    }
  });
})();
