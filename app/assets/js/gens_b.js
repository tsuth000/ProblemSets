'use strict';
// Unit generators for Calculus I, Calculus II, Discrete math.
(() => {
  const FR = 'Fractions such as 5/2 are fine.';
  const lin = h => (h === 0 ? 'x' : h > 0 ? `x - ${h}` : `x + ${-h}`);
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));

  // ======================= CALCULUS I =======================
  registerUnitGens('calc1', {
    tag: { 'kg-limit': 'Limits and limit laws', 'kg-deriv': 'Differentiation rules', 'kg-tangent': 'Differentiation rules', 'kg-chain': 'The chain rule', 'kg-related': 'Related rates', 'kg-crit': 'Curve sketching and extrema', 'kg-opt': 'Optimization', 'kg-defint': 'Definite integrals and the FTC' },
    units: {
      'Limits and limit laws': [
        { id: 'ku-sqrt', make(R) { const a = R.int(1, 6);
          return { q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\sqrt{x + ${a * a}} - ${a}}{x}\).`, answer: 1 / (2 * a), hint: FR,
            x: T`Substitution gives \(\frac00\). Multiply by the conjugate: \(\frac{(x + ${a * a}) - ${a * a}}{x(\sqrt{x + ${a * a}} + ${a})} = \frac{1}{\sqrt{x + ${a * a}} + ${a}} \to \frac{1}{${2 * a}}\).`, v: `limit((sqrt(x + ${a * a}) - ${a})/x, x, 0)` }; } }
      ],
      'Limits at infinity': [
        { id: 'ku-inf', make(R) { const m = R.int(1, 3), n = R.int(m, 3), a = R.nz(-6, 6), c = R.nz(-5, 5), b = R.int(-9, 9), d = R.int(-9, 9), val = m === n ? a / c : 0;
          const pw = k => (k === 1 ? 'x' : `x^${k}`);
          return { q: T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{${R.co(a)}${pw(m)} ${R.sgn(b, true)}}{${R.co(c)}${pw(n)} ${R.sgn(d, true)}}\).`, answer: val, tol: 0.001, hint: FR,
            x: m === n ? T`Equal top degree: the limit is the ratio of leading coefficients, \(${R.frac(a, c)}\).` : T`The bottom has the higher degree, so the fraction goes to 0.`,
            v: `limit((${a}*x**${m} + (${b}))/(${c}*x**${n} + (${d})), x, oo)` }; } }
      ],
      'Special limits and the squeeze theorem': [
        { id: 'ku-sinlim', make(R) { const a = R.int(1, 6), b = R.int(1, 6), k = R.int(0, 2);
          const Q = [[T`\frac{\sin ${a}x}{${b}x}`, a / b, `sin(${a}*x)/(${b}*x)`, T`Rewrite as \(\frac{${a}}{${b}}\cdot\frac{\sin ${a}x}{${a}x} \to \frac{${a}}{${b}}\).`],
            [T`\frac{\tan ${a}x}{${b}x}`, a / b, `tan(${a}*x)/(${b}*x)`, T`\(\tan ${a}x = \frac{\sin ${a}x}{\cos ${a}x}\), and \(\cos ${a}x \to 1\): the limit is \(\frac{${a}}{${b}}\).`],
            [T`\frac{1 - \cos ${a}x}{x^2}`, a * a / 2, `(1 - cos(${a}*x))/x**2`, T`\(1 - \cos u \approx \frac{u^2}{2}\) for small \(u\): \(\frac{(${a}x)^2/2}{x^2} = ${R.frac(a * a, 2)}\).`]][k];
          return { q: T`Evaluate \(\displaystyle\lim_{x\to0}${Q[0]}\).`, answer: Q[1], hint: FR, x: Q[3], v: `limit(${Q[2]}, x, 0)` }; } }
      ],
      "L'Hôpital's rule": [
        { id: 'ku-lhop', make(R) { const a = R.int(1, 5), b = R.int(1, 5), k = R.int(0, 2);
          const Q = [[T`\frac{e^{${a}x} - 1}{${b}x}`, a / b, `(exp(${a}*x) - 1)/(${b}*x)`, T`\(\frac00\). Differentiate top and bottom: \(\frac{${a}e^{${a}x}}{${b}} \to \frac{${a}}{${b}}\).`],
            [T`\frac{\ln(1 + ${a}x)}{${b}x}`, a / b, `log(1 + ${a}*x)/(${b}*x)`, T`\(\frac00\). Differentiate: \(\frac{${a}/(1 + ${a}x)}{${b}} \to \frac{${a}}{${b}}\).`],
            [T`\frac{e^{${a}x} - 1 - ${a === 1 ? '' : a}x}{x^2}`, a * a / 2, `(exp(${a}*x) - 1 - ${a}*x)/x**2`, T`\(\frac00\) twice. Two rounds give \(\frac{${a * a}e^{${a}x}}{2} \to ${R.frac(a * a, 2)}\).`]][k];
          return { q: T`Evaluate \(\displaystyle\lim_{x\to0}${Q[0]}\).`, answer: Q[1], hint: FR, x: Q[3], v: `limit(${Q[2]}, x, 0)` }; } }
      ],
      'Continuity': [
        { id: 'ku-cont', make(R) { const c = R.nz(-3, 3), b1 = R.int(-6, 6), b2 = R.int(-6, 6), k = (c * c + b2 - b1) / c;
          return { q: T`For which \(k\) is \(f\) continuous? \(f(x) = kx ${R.sgn(b1, true)}\) for \(x < ${c}\), and \(f(x) = x^2 ${R.sgn(b2, true)}\) for \(x \ge ${c}\).`, answer: k, hint: FR,
            x: T`The pieces must meet at \(x = ${c}\): \(${c}k ${R.sgn(b1, true)} = ${c * c + b2}\), so \(k = ${R.frac(c * c + b2 - b1, c)}\).`, v: `solve(Eq(y*(${c}) + (${b1}), (${c})**2 + (${b2})), y)[0]` }; } }
      ],
      'IVT and MVT': [
        { id: 'ku-mvt', make(R) { if (R.int(0, 1)) { const p = R.int(-4, 4), a = R.int(-3, 2), b = a + R.int(1, 5);
            return { q: T`Find the \(c\) promised by the mean value theorem for \(f(x) = x^2 ${R.t(p, 'x')}\) on \([${a}, ${b}]\).`, answer: (a + b) / 2, hint: FR,
              x: T`Average slope \(= \frac{f(${b}) - f(${a})}{${b - a}} = ${a + b + p}\). Set \(f'(c) = 2c ${R.sgn(p, true)} = ${a + b + p}\): \(c = ${R.frac(a + b, 2)}\).`, v: `[s for s in solve(Eq(diff(x**2 + (${p})*x, x), ((${b})**2 + (${p})*(${b}) - (${a})**2 - (${p})*(${a}))/(${b - a})), x) if ${a} < s < ${b}][0]` }; }
          const b = R.int(1, 6);
          return { q: T`Find the \(c\) promised by the mean value theorem for \(f(x) = x^3\) on \([0, ${b}]\), to three decimals.`, answer: b / Math.sqrt(3), tol: 0.0015, hint: 'Round to three decimals.',
            x: T`Average slope \(\frac{${b ** 3}}{${b}} = ${b * b}\). \(3c^2 = ${b * b}\) gives \(c = \frac{${b}}{\sqrt3}\).`, v: `[s for s in solve(Eq(3*x**2, ${b * b}), x) if 0 < s < ${b}][0]` }; } }
      ],
      'The derivative': [
        { id: 'ku-avg', make(R) { const a = R.nz(-3, 3), b = R.int(-5, 5), p = R.int(-3, 3), h = R.pick([1, 0.5, 0.1]), val = a * (2 * p + h) + b;
          return { q: T`Find the average rate of change of \(f(x) = ${R.co(a)}x^2 ${R.t(b, 'x')}\) from \(x = ${p}\) to \(x = ${R.fmt(p + h)}\).`, answer: val, tol: 0.001,
            x: T`\(\frac{f(${R.fmt(p + h)}) - f(${p})}{${h}} = ${R.fmt(val, 3)}\). As the interval shrinks this approaches \(f'(${p}) = ${2 * a * p + b}\).`, v: `((${a}*x**2 + (${b})*x).subs(x, ${p} + ${h}) - (${a}*x**2 + (${b})*x).subs(x, ${p}))/${h}` }; } },
        { id: 'ku-defn', make(R) { const a = R.nz(-3, 3), b = R.int(-5, 5), c = R.int(-5, 5), p = R.int(-3, 3);
          return { q: T`Use \(f'(${p}) = \displaystyle\lim_{h\to0}\frac{f(${p} + h) - f(${p})}{h}\) for \(f(x) = ${R.co(a)}x^2 ${R.t(b, 'x')} ${R.sgn(c, true)}\).`, answer: 2 * a * p + b,
            x: T`\(f(${p} + h) - f(${p}) = ${R.lin([[2 * a * p + b, 'h'], [a, 'h^2']])}\). Divide by \(h\) and let \(h \to 0\): \(${2 * a * p + b}\).`, v: `limit(((${a}*(${p} + y)**2 + (${b})*(${p} + y) + (${c})) - (${a * p * p + b * p + c}))/y, y, 0)` }; } }
      ],
      'Differentiation rules': [
        { id: 'ku-prodquot', make(R) { if (R.int(0, 1)) { const m = R.int(2, 4), a = R.nz(-3, 3), b = R.int(-4, 4), p = R.int(-2, 2), val = m * p ** (m - 1) * (a * p + b) + p ** m * a;
            return { q: T`Find the derivative of \(x^{${m}}(${R.co(a)}x ${R.sgn(b, true)})\) at \(x = ${p}\).`, answer: val,
              x: T`Product rule: \(${m}x^{${m - 1}}(${R.co(a)}x ${R.sgn(b, true)}) + x^{${m}}\cdot${a}\). At \(x = ${p}\): \(${val}\).`, v: `diff(x**${m}*(${a}*x + (${b})), x).subs(x, ${p})` }; }
          let a, b, c, d, p; do { a = R.nz(-4, 4); b = R.int(-5, 5); c = R.nz(-3, 3); d = R.int(-5, 5); p = R.int(-3, 3); } while (c * p + d === 0 || a * d - b * c === 0);
          return { q: T`Find the derivative of \(\dfrac{${R.co(a)}x ${R.sgn(b, true)}}{${R.co(c)}x ${R.sgn(d, true)}}\) at \(x = ${p}\).`, answer: (a * d - b * c) / (c * p + d) ** 2, hint: FR,
            x: T`Quotient rule: \(\frac{${a}(${R.co(c)}x ${R.sgn(d, true)}) - ${c}(${R.co(a)}x ${R.sgn(b, true)})}{(${R.co(c)}x ${R.sgn(d, true)})^2} = \frac{${a * d - b * c}}{(${R.co(c)}x ${R.sgn(d, true)})^2}\). At \(x = ${p}\): \(${R.frac(a * d - b * c, (c * p + d) ** 2)}\).`,
            v: `diff((${a}*x + (${b}))/(${c}*x + (${d})), x).subs(x, ${p})` }; } }
      ],
      'The chain rule': [
        { id: 'ku-chain2', make(R) { const k = R.int(0, 2);
          if (k === 0) { const a = R.nz(-4, 4), b = R.int(-3, 3), val = a * Math.cos(b);
            return { q: T`Find the derivative of \(\sin(${R.co(a)}x ${R.sgn(b, true)})\) at \(x = 0\), to three decimals.`, answer: val, tol: 0.0015, hint: 'Round to three decimals.', x: T`\(\cos(${R.co(a)}x ${R.sgn(b, true)})\cdot${a}\); at 0 that is \(${a}\cos(${b}) \approx ${R.fmt(val, 3)}\).`, v: `diff(sin(${a}*x + (${b})), x).subs(x, 0)` }; }
          if (k === 1) { const a = R.pick([-1, 1, 2]), p = R.pick([-1, 1]), val = 2 * a * p * Math.exp(a * p * p);
            return { q: T`Find the derivative of \(e^{${a === 1 ? '' : a === -1 ? '-' : a}x^2}\) at \(x = ${p}\), to three decimals.`, answer: val, tol: 0.0015, hint: 'Round to three decimals.', x: T`\(e^{${a}x^2}\cdot${2 * a}x\); at \(x = ${p}\): \(${2 * a * p}e^{${a}} \approx ${R.fmt(val, 3)}\).`, v: `diff(exp(${a}*x**2), x).subs(x, ${p})` }; }
          const a = R.int(1, 4), b = R.int(1, 6), p = R.int(1, 3);
          return { q: T`Find the derivative of \(\ln(${R.co(a)}x^2 + ${b})\) at \(x = ${p}\).`, answer: 2 * a * p / (a * p * p + b), tol: 0.0015, hint: FR, x: T`\(\frac{${2 * a}x}{${R.co(a)}x^2 + ${b}}\); at \(x = ${p}\): \(${R.frac(2 * a * p, a * p * p + b)}\).`, v: `diff(log(${a}*x**2 + ${b}), x).subs(x, ${p})` }; } }
      ],
      'Implicit differentiation': [
        { id: 'ku-implicit', make(R) { const k = R.int(0, 2);
          if (k === 0) { const [p, q, h] = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]), sx = R.pick([1, -1]), sy = R.pick([1, -1]), X = sx * p, Y = sy * q;
            return { q: T`On \(x^2 + y^2 = ${h * h}\), find \(\frac{dy}{dx}\) at \((${X}, ${Y})\).`, answer: -X / Y, hint: FR, x: T`\(2x + 2yy' = 0\), so \(y' = -\frac xy = ${R.frac(-X, Y)}\).`, v: `idiff(x**2 + y**2 - ${h * h}, y, x).subs({x: ${X}, y: ${Y}})` }; }
          if (k === 1) { const p = R.nz(-4, 4), q = R.nz(-5, 5), c = p * q;
            return { q: T`On \(xy = ${c}\), find \(\frac{dy}{dx}\) at \((${p}, ${q})\).`, answer: -q / p, hint: FR, x: T`\(y + xy' = 0\), so \(y' = -\frac yx = ${R.frac(-q, p)}\).`, v: `idiff(x*y - (${c}), y, x).subs({x: ${p}, y: ${q}})` }; }
          let p, q; do { p = R.int(-3, 3); q = R.int(-3, 3); } while (p + 2 * q === 0); const c = p * p + p * q + q * q;
          return { q: T`On \(x^2 + xy + y^2 = ${c}\), find \(\frac{dy}{dx}\) at \((${p}, ${q})\).`, answer: -(2 * p + q) / (p + 2 * q), hint: FR,
            x: T`\(2x + y + xy' + 2yy' = 0\), so \(y' = -\frac{2x + y}{x + 2y} = ${R.frac(-(2 * p + q), p + 2 * q)}\).`, v: `idiff(x**2 + x*y + y**2 - ${c}, y, x).subs({x: ${p}, y: ${q}})` }; } }
      ],
      'Related rates': [
        { id: 'ku-rr', make(R) { const k = R.int(0, 2), r = R.int(1, 10), dr = R.int(1, 5);
          const Q = [[T`A circle's radius grows at ${dr} cm/s. How fast is its area growing when \(r = ${r}\) cm? Answer in cm²/s to two decimals.`, 2 * Math.PI * r * dr, `diff(pi*x**2, x).subs(x, ${r})*${dr}`, T`\(\frac{dA}{dt} = 2\pi r\frac{dr}{dt} = 2\pi(${r})(${dr})\).`],
            [T`A sphere's radius grows at ${dr} cm/s. How fast is its volume growing when \(r = ${r}\) cm? Answer in cm³/s to two decimals.`, 4 * Math.PI * r * r * dr, `diff(Rational(4, 3)*pi*x**3, x).subs(x, ${r})*${dr}`, T`\(\frac{dV}{dt} = 4\pi r^2\frac{dr}{dt} = 4\pi(${r})^2(${dr})\).`],
            [T`A square's side grows at ${dr} cm/s. How fast is its area growing when the side is ${r} cm?`, 2 * r * dr, `diff(x**2, x).subs(x, ${r})*${dr}`, T`\(\frac{dA}{dt} = 2s\frac{ds}{dt} = 2(${r})(${dr})\).`]][k];
          return { q: Q[0], answer: Q[1], tol: 0.01, hint: k < 2 ? 'Round to two decimals.' : undefined, x: Q[3], v: Q[2] }; } }
      ],
      'Curve sketching and extrema': [
        { id: 'ku-inflect', make(R) { const a = R.nz(-3, 3), b = R.int(-6, 6), c = R.int(-6, 6), d = R.int(-6, 6);
          return { q: T`At what \(x\) does \(f(x) = ${R.co(a)}x^3 ${R.t(b, 'x^2')} ${R.t(c, 'x')} ${R.sgn(d, true)}\) have its inflection point?`, answer: -b / (3 * a), hint: FR,
            x: T`\(f''(x) = ${6 * a}x ${R.sgn(2 * b, true)}\), which changes sign at \(x = ${R.frac(-b, 3 * a)}\).`, v: `solve(diff(${a}*x**3 + (${b})*x**2 + (${c})*x + (${d}), x, 2), x)[0]` }; } }
      ],
      'Antiderivatives': [
        { id: 'ku-ivp', make(R) { const a = R.nz(-3, 3) * 3, b = R.int(-4, 4) * 2, c = R.int(-5, 5), d = R.int(-6, 6), k = R.int(1, 3), val = a * k ** 3 / 3 + b * k * k / 2 + c * k + d;
          return { q: T`\(f'(x) = ${R.co(a)}x^2 ${R.t(b, 'x')} ${R.sgn(c, true)}\) and \(f(0) = ${d}\). Find \(f(${k})\).`, answer: val,
            x: T`\(f(x) = ${R.lin([[a / 3, 'x^3'], [b / 2, 'x^2'], [c, 'x'], [1, 'C']])}\), and \(f(0) = ${d}\) gives \(C = ${d}\). So \(f(${k}) = ${R.fmt(val)}\).`, v: `integrate(${a}*x**2 + (${b})*x + (${c}), (x, 0, ${k})) + (${d})` }; } }
      ],
      'Definite integrals and the FTC': [
        { id: 'ku-avgval', make(R) { const a = R.nz(-4, 4) * 3, b = R.int(-5, 5), L = R.int(1, 4);
          return { q: T`Find the average value of \(f(x) = ${R.co(a)}x^2 ${R.sgn(b, true)}\) on \([0, ${L}]\).`, answer: a * L * L / 3 + b,
            x: T`\(\frac{1}{${L}}\int_0^{${L}}(${R.co(a)}x^2 ${R.sgn(b, true)})\,dx = \frac{1}{${L}}\left(${R.frac(a * L ** 3, 3)} ${R.sgn(b * L, true)}\right) = ${a * L * L / 3 + b}\).`, v: `integrate(${a}*x**2 + (${b}), (x, 0, ${L}))/${L}` }; } }
      ],
      'Substitution': [
        { id: 'ku-usub', make(R) { const B = R.int(1, 2), c = R.int(0, 3), n = R.int(1, 3), val = ((B * B + c) ** (n + 1) - c ** (n + 1)) / (n + 1);
          return { q: T`Evaluate \(\displaystyle\int_0^{${B}} 2x\,(x^2 ${R.sgn(c, true)})^{${n}}\,dx\).`, answer: val, tol: 0.001, hint: FR,
            x: T`Let \(u = x^2 ${R.sgn(c, true)}\), \(du = 2x\,dx\); \(u\) runs from ${c} to ${B * B + c}. \(\int_{${c}}^{${B * B + c}} u^{${n}}\,du = \frac{${B * B + c}^{${n + 1}} - ${c}^{${n + 1}}}{${n + 1}} = ${R.frac((B * B + c) ** (n + 1) - c ** (n + 1), n + 1)}\).`, v: `integrate(2*x*(x**2 + ${c})**${n}, (x, 0, ${B}))` }; } }
      ]
    }
  });

  // ======================= CALCULUS II =======================
  const wallis = n => { let v = n % 2 ? 1 : Math.PI / 2; for (let k = n; k > 1; k -= 2) v *= (k - 1) / k; return v; };
  registerUnitGens('calc2', {
    tag: { 'mg-parts': 'Integration by parts', 'mg-pf': 'Partial fractions', 'mg-area': 'Area between curves', 'mg-vol': 'Volumes of revolution', 'mg-geo': 'Series basics', 'mg-radius': 'Power series', 'mg-taylor': 'Taylor and Maclaurin series', 'mg-ode': 'Differential equations' },
    units: {
      'Trigonometric integrals': [
        { id: 'mu-trig', make(R) { const n = R.int(1, 5), sinCase = R.int(0, 1) === 1, val = sinCase ? 2 * wallis(n) : wallis(n);
          return { q: sinCase ? T`Evaluate \(\displaystyle\int_0^{\pi}\sin^{${n}}x\,dx\), to three decimals.` : T`Evaluate \(\displaystyle\int_0^{\pi/2}\cos^{${n}}x\,dx\), to three decimals.`, answer: val, tol: 0.0015, hint: 'Round to three decimals.',
            x: n % 2 ? T`Odd power: save one factor for \(du\) and convert the rest with \(\sin^2 + \cos^2 = 1\). The result is \(\approx ${R.fmt(val, 3)}\).` : T`Even power: use the half-angle identity repeatedly. The result is \(\approx ${R.fmt(val, 3)}\).`,
            v: sinCase ? `integrate(sin(x)**${n}, (x, 0, pi))` : `integrate(cos(x)**${n}, (x, 0, pi/2))` }; } }
      ],
      'Trigonometric substitution': [
        { id: 'mu-tsub', make(R) { const a = R.int(1, 6), k = R.int(0, 2);
          const Q = [[T`\int_0^{${a}}\sqrt{${a * a} - x^2}\,dx`, Math.PI * a * a / 4, `integrate(sqrt(${a * a} - x**2), (x, 0, ${a}))`, T`\(x = ${a}\sin\theta\) gives a quarter of a disk of radius ${a}: \(\frac{\pi(${a})^2}{4}\).`],
            [T`\int_0^{${a}}\frac{dx}{${a * a} + x^2}`, Math.PI / (4 * a), `integrate(1/(${a * a} + x**2), (x, 0, ${a}))`, T`\(x = ${a}\tan\theta\): \(\frac{1}{${a}}\arctan\frac{x}{${a}}\Big|_0^{${a}} = \frac{\pi}{${4 * a}}\).`],
            [T`\int_0^{${a / 2}}\frac{dx}{\sqrt{${a * a} - x^2}}`, Math.PI / 6, `integrate(1/sqrt(${a * a} - x**2), (x, 0, Rational(${a}, 2)))`, T`\(x = ${a}\sin\theta\): \(\arcsin\frac{x}{${a}}\Big|_0^{${a / 2}} = \arcsin\frac12 = \frac\pi6\).`]][k];
          return { q: T`Evaluate \(\displaystyle${Q[0]}\), to three decimals.`, answer: Q[1], tol: 0.0015, hint: 'Round to three decimals.', x: Q[3], v: Q[2] }; } }
      ],
      'Improper integrals': [
        { id: 'mu-impr', make(R) { const c = R.int(1, 6);
          if (R.int(0, 1)) { const p = R.int(2, 4); return { q: T`Evaluate \(\displaystyle\int_1^\infty\frac{${c}}{x^{${p}}}\,dx\).`, answer: c / (p - 1), hint: FR, x: T`\(${c}\left[\frac{x^{${1 - p}}}{${1 - p}}\right]_1^\infty = \frac{${c}}{${p - 1}}\).`, v: `integrate(${c}/x**${p}, (x, 1, oo))` }; }
          const a = R.int(1, 5); return { q: T`Evaluate \(\displaystyle\int_0^\infty ${c}e^{-${a === 1 ? '' : a}x}\,dx\).`, answer: c / a, hint: FR, x: T`\(\left[-\frac{${c}}{${a}}e^{-${a}x}\right]_0^\infty = \frac{${c}}{${a}}\).`, v: `integrate(${c}*exp(-${a}*x), (x, 0, oo))` }; } }
      ],
      'Arc length and work': [
        { id: 'mu-work', make(R) { const k = R.int(1, 10) * 5, a = R.int(0, 3), b = a + R.int(1, 3);
          return { q: T`A spring has \(k = ${k}\) N/m. How much work, in J, stretches it from ${a} m to ${b} m beyond its natural length?`, answer: k * (b * b - a * a) / 2,
            x: T`\(W = \int_{${a}}^{${b}}${k}x\,dx = \frac{${k}}{2}(${b * b} - ${a * a}) = ${k * (b * b - a * a) / 2}\).`, v: `integrate(${k}*x, (x, ${a}, ${b}))` }; } },
        { id: 'mu-arc', make(R) { const [p, q, h] = R.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13]]), L = q * R.int(1, 3), c = R.int(-5, 5);
          return { q: T`Find the length of \(y = ${R.frac(p, q)}x ${R.sgn(c, true)}\) from \(x = 0\) to \(x = ${L}\).`, answer: L * h / q,
            x: T`\(\int_0^{${L}}\sqrt{1 + \left(${R.frac(p, q)}\right)^2}\,dx = ${L}\cdot\frac{${h}}{${q}} = ${L * h / q}\).`, v: `integrate(sqrt(1 + Rational(${p}, ${q})**2), (x, 0, ${L}))` }; } }
      ],
      'Sequences': [
        { id: 'mu-seqlim', make(R) { const a = R.nz(-6, 6), b = R.int(-9, 9), c = R.nz(-5, 5), d = R.int(-9, 9);
          return { q: T`Find \(\displaystyle\lim_{n\to\infty}\frac{${R.co(a)}n^2 ${R.sgn(b, true)}}{${R.co(c)}n^2 ${R.t(d, 'n')}}\).`, answer: a / c, tol: 0.001, hint: FR,
            x: T`Divide by \(n^2\): the lower-order terms vanish, leaving \(${R.frac(a, c)}\).`, v: `limit((${a}*n**2 + (${b}))/(${c}*n**2 + (${d})*n), n, oo)` }; } }
      ],
      'Series basics': [
        { id: 'mu-tele', make(R) { const k = R.int(1, 4), H = [0, 1, 1.5, 11 / 6, 25 / 12][k];
          return { q: T`Find \(\displaystyle\sum_{n=1}^\infty\frac{1}{n(n + ${k})}\).`, answer: H / k, tol: 0.001, hint: FR,
            x: T`\(\frac{1}{n(n + ${k})} = \frac{1}{${k}}\left(\frac1n - \frac{1}{n + ${k}}\right)\). The sum telescopes to \(\frac1{${k}}\left(${Array.from({ length: k }, (_, i) => i ? `\\frac1{${i + 1}}` : '1').join(' + ')}\right)\).`, v: `summation(1/(n*(n + ${k})), (n, 1, oo))` }; } }
      ],
      'Convergence tests': [
        { id: 'mu-conv', make(R) { const [tex, py, conv, why] = R.pick([['\\frac1{n^2}', '1/n**2', true, 'p-series with p = 2 > 1.'], ['\\frac1{\\sqrt n}', '1/sqrt(n)', false, 'p-series with p = 1/2 ≤ 1.'], ['\\frac1n', '1/n', false, 'The harmonic series.'],
            ['\\frac{1}{n^{3/2}}', '1/n**Rational(3, 2)', true, 'p-series with p = 3/2 > 1.'], ['\\frac{n}{n^2 + 1}', 'n/(n**2 + 1)', false, 'Behaves like 1/n (limit comparison).'], ['\\frac{1}{n^2 + 5}', '1/(n**2 + 5)', true, 'Smaller than 1/n².'],
            ['\\left(\\tfrac23\\right)^n', 'Rational(2, 3)**n', true, 'Geometric with r = 2/3.'], ['\\left(\\tfrac32\\right)^n', 'Rational(3, 2)**n', false, 'Geometric with r = 3/2: terms grow.'], ['\\frac{2^n}{n!}', '2**n/factorial(n)', true, 'Ratio test: 2/(n + 1) → 0.'],
            ['\\frac{n}{n + 1}', 'n/(n + 1)', false, 'Terms approach 1, not 0.'], ['\\frac{1}{n\\,2^n}', '1/(n*2**n)', true, 'Smaller than (1/2)ⁿ.'], ['\\frac{\\ln n}{n}', 'log(n)/n', false, 'Larger than 1/n for n ≥ 3.']]);
          return { q: T`Does \(\displaystyle\sum_{n=1}^\infty ${tex}\) converge?`, c: conv ? ['converges', 'diverges'] : ['diverges', 'converges'], x: why, key: conv ? 'True' : 'False', vk: `str(Sum(${py}, (n, 1, oo)).is_convergent())` }; } }
      ],
      'Absolute and conditional convergence': [
        { id: 'mu-alt', make(R) { const N = R.int(3, 20), p = R.int(1, 2);
          return { q: T`Using the alternating series bound, how large can the error be after ${N} terms of \(\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n${p === 2 ? '^2' : ''}}\)?`, answer: 1 / (N + 1) ** p, tol: 1e-7, hint: FR,
            x: T`At most the first omitted term: \(\frac{1}{${N + 1}${p === 2 ? '^2' : ''}} = ${R.frac(1, (N + 1) ** p)}\).`, v: `Rational(1, ${N + 1})**${p}` }; } }
      ],
      'Parametric and polar calculus': [
        { id: 'mu-param', make(R) { let a, b; do { a = R.int(1, 4); b = R.int(1, 4); } while (a === b); const t0 = R.int(1, 3), val = (b * t0 ** (b - 1)) / (a * t0 ** (a - 1));
          return { q: T`For \(x = ${R.mono(1, [['t', a]])}\), \(y = ${R.mono(1, [['t', b]])}\), find \(\frac{dy}{dx}\) at \(t = ${t0}\).`, answer: val, tol: 0.001, hint: FR,
            x: T`\(\frac{dy/dt}{dx/dt} = \frac{${R.mono(b, [['t', b - 1]])}}{${R.mono(a, [['t', a - 1]])}}\); at \(t = ${t0}\): \(${R.frac(b * t0 ** (b - 1), a * t0 ** (a - 1))}\).`, v: `(diff(t**${b}, t)/diff(t**${a}, t)).subs(t, ${t0})` }; } },
        { id: 'mu-polar', make(R) { const a = R.int(1, 5), k = R.int(0, 2);
          const Q = [[T`r = ${a}`, Math.PI * a * a, `integrate(Rational(1, 2)*${a}**2, (t, 0, 2*pi))`, T`A circle of radius ${a}: \(\frac12\int_0^{2\pi}${a * a}\,d\theta = ${a * a}\pi\).`],
            [T`r = ${a}\sin\theta`, Math.PI * a * a / 4, `integrate(Rational(1, 2)*(${a}*sin(t))**2, (t, 0, pi))`, T`A circle of diameter ${a}, traced once for \(0 \le \theta \le \pi\): \(\frac{\pi(${a})^2}{4}\).`],
            [T`r = ${a}\cos 2\theta`, Math.PI * a * a / 2, `integrate(Rational(1, 2)*(${a}*cos(2*t))**2, (t, 0, 2*pi))`, T`A four-petal rose: \(\frac12\int_0^{2\pi}${a * a}\cos^2 2\theta\,d\theta = \frac{${a * a}\pi}{2}\).`]][k];
          return { q: T`Find the total area enclosed by \(${Q[0]}\), to two decimals.`, answer: Q[1], tol: 0.01, hint: 'Round to two decimals.', x: Q[3], v: Q[2] }; } }
      ]
    }
  });

  // ======================= DISCRETE =======================
  const TF = [true, false];
  const rowsOf = n => (n === 1 ? TF.map(p => [p]) : n === 2 ? TF.flatMap(p => TF.map(q => [p, q])) : TF.flatMap(p => TF.flatMap(q => TF.map(r => [p, q, r]))));
  const FORMS = [
    ['p\\land q', (p, q) => p && q, 'p and q', 2], ['p\\lor q', (p, q) => p || q, 'p or q', 2], ['p\\to q', (p, q) => !p || q, '(not p) or q', 2], ['p\\leftrightarrow q', (p, q) => p === q, 'p == q', 2],
    ['p\\land\\neg q', (p, q) => p && !q, 'p and (not q)', 2], ['\\neg(p\\lor q)', (p, q) => !(p || q), 'not (p or q)', 2], ['(p\\land q)\\to r', (p, q, r) => !(p && q) || r, '(not (p and q)) or r', 3],
    ['p\\lor(q\\land r)', (p, q, r) => p || (q && r), 'p or (q and r)', 3], ['(p\\to q)\\land(q\\to r)', (p, q, r) => (!p || q) && (!q || r), '((not p) or q) and ((not q) or r)', 3],
    ['p\\lor\\neg p', p => p || !p, 'p or (not p)', 1], ['p\\land\\neg p', p => p && !p, 'p and (not p)', 1], ['(p\\land q)\\to p', (p, q) => !(p && q) || p, '(not (p and q)) or p', 2],
    ['p\\to(p\\lor q)', (p, q) => !p || p || q, '(not p) or (p or q)', 2], ['((p\\to q)\\land p)\\to q', (p, q) => !((!p || q) && p) || q, '(not (((not p) or q) and p)) or q', 2],
    ['(p\\to q)\\land(p\\land\\neg q)', (p, q) => (!p || q) && p && !q, '((not p) or q) and (p and (not q))', 2], ['(p\\lor q)\\to p', (p, q) => !(p || q) || p, '(not (p or q)) or p', 2],
    ['\\neg(p\\land q)\\leftrightarrow(\\neg p\\lor\\neg q)', (p, q) => !(p && q) === (!p || !q), '(not (p and q)) == ((not p) or (not q))', 2], ['(p\\land q)\\land\\neg(p\\lor q)', (p, q) => p && q && !(p || q), '(p and q) and (not (p or q))', 2]];
  // Inside-out columns for each formula: [name, template, value]. Tokens {p}, {A}, ... are letters or truth values.
  const imp = (a, b) => !a || b;
  const STEPS = {
    'p\\land q': [[['S', '{p} \\land {q}', e => e.p && e.q]], T`An "and" is true only when every part is true: the single row \(p\) T, \(q\) T.`],
    'p\\lor q': [[['S', '{p} \\lor {q}', e => e.p || e.q]], T`An "or" is false only when every part is false. That is one row (F, F), so \(4 - 1 = 3\).`],
    'p\\to q': [[['S', '{p} \\to {q}', e => imp(e.p, e.q)]], T`A conditional is false only in the row T \(\to\) F (\(p\) T, \(q\) F), so \(4 - 1 = 3\).`],
    'p\\leftrightarrow q': [[['S', '{p} \\leftrightarrow {q}', e => e.p === e.q]], T`A biconditional is true when the two sides match: T, T and F, F. That is 2 rows.`],
    'p\\land\\neg q': [[['A', '\\neg {q}', e => !e.q], ['S', '{p} \\land {A}', e => e.p && e.A]], T`Both parts must hold: \(p\) true and \(q\) false. That is 1 row.`],
    '\\neg(p\\lor q)': [[['A', '{p} \\lor {q}', e => e.p || e.q], ['S', '\\neg {A}', e => !e.A]], T`\(p\lor q\) is false in 1 row (F, F), and the negation is true exactly there: 1 row.`],
    '(p\\land q)\\to r': [[['A', '{p} \\land {q}', e => e.p && e.q], ['S', '{A} \\to {r}', e => imp(e.A, e.r)]], T`The conditional fails only when its hypothesis \(p\land q\) is true and \(r\) is false: \(p\) T, \(q\) T, \(r\) F. One false row, so \(8 - 1 = 7\).`],
    'p\\lor(q\\land r)': [[['A', '{q} \\land {r}', e => e.q && e.r], ['S', '{p} \\lor {A}', e => e.p || e.A]], T`Split on \(p\). The 4 rows with \(p\) true are all true. Among the 4 rows with \(p\) false, you need \(q\land r\), which holds in 1 of them. Total \(4 + 1 = 5\).`],
    '(p\\to q)\\land(q\\to r)': [[['A', '{p} \\to {q}', e => imp(e.p, e.q)], ['B', '{q} \\to {r}', e => imp(e.q, e.r)], ['S', '{A} \\land {B}', e => e.A && e.B]], T`Both conditionals must hold, so reading \(p, q, r\) in order the values may never drop from T to F. The allowed rows are TTT, FTT, FFT, FFF: 4 rows.`],
    '(p\\land q)\\to p': [[['A', '{p} \\land {q}', e => e.p && e.q], ['S', '{A} \\to {p}', e => imp(e.A, e.p)]], T`To fail, \(p\land q\) must be true while \(p\) is false, which is impossible. True in all 4 rows (a tautology).`],
    'p\\to(p\\lor q)': [[['A', '{p} \\lor {q}', e => e.p || e.q], ['S', '{p} \\to {A}', e => imp(e.p, e.A)]], T`To fail, \(p\) must be true while \(p\lor q\) is false, which is impossible. True in all 4 rows (a tautology).`],
    '((p\\to q)\\land p)\\to q': [[['A', '{p} \\to {q}', e => imp(e.p, e.q)], ['B', '{A} \\land {p}', e => e.A && e.p], ['S', '{B} \\to {q}', e => imp(e.B, e.q)]], T`To fail, the hypothesis must be true and \(q\) false. With \(q\) false, \(p\to q\) forces \(p\) false, and then the hypothesis is false. It never fails: all 4 rows (modus ponens).`],
    '(p\\to q)\\land(p\\land\\neg q)': [[['A', '{p} \\to {q}', e => imp(e.p, e.q)], ['B', '\\neg {q}', e => !e.q], ['C', '{p} \\land {B}', e => e.p && e.B], ['S', '{A} \\land {C}', e => e.A && e.C]], T`The second part needs \(p\) T and \(q\) F, which is exactly the row where \(p\to q\) is false. The parts never hold together: 0 rows.`],
    '(p\\lor q)\\to p': [[['A', '{p} \\lor {q}', e => e.p || e.q], ['S', '{A} \\to {p}', e => imp(e.A, e.p)]], T`It fails only when \(p\lor q\) is true and \(p\) is false: \(p\) F, \(q\) T. One false row, so \(4 - 1 = 3\).`],
    '\\neg(p\\land q)\\leftrightarrow(\\neg p\\lor\\neg q)': [[['A', '{p} \\land {q}', e => e.p && e.q], ['B', '\\neg {A}', e => !e.A], ['C', '\\neg {p} \\lor \\neg {q}', e => !e.p || !e.q], ['S', '{B} \\leftrightarrow {C}', e => e.B === e.C]], T`This is De Morgan's law: the two sides agree in every row, so the biconditional is true in all 4.`],
    '(p\\land q)\\land\\neg(p\\lor q)': [[['A', '{p} \\land {q}', e => e.p && e.q], ['B', '{p} \\lor {q}', e => e.p || e.q], ['C', '\\neg {B}', e => !e.B], ['S', '{A} \\land {C}', e => e.A && e.C]], T`\(p\land q\) needs both true, but then \(p\lor q\) is true and its negation false: 0 rows.`],
    'p\\lor\\neg p': [[['A', '\\neg {p}', e => !e.p], ['S', '{p} \\lor {A}', e => e.p || e.A]], ''],
    'p\\land\\neg p': [[['A', '\\neg {p}', e => !e.p], ['S', '{p} \\land {A}', e => e.p && e.A]], '']
  };
  const VARS = ['p', 'q', 'r'], TV = b => (b ? 'T' : 'F');
  const fillT = (tmpl, sub) => tmpl.replace(/\{(\w)\}/g, (m, k) => sub(k));
  const defsOf = tex => STEPS[tex][0].map(([nm, t]) => T`\(${nm} = ${fillT(t, k => k)}\)`).join(', ');
  // Runs the columns on one row: returns the environment with every named column filled in.
  const runRow = (tex, vals) => { const e = {}; vals.forEach((b, i) => { e[VARS[i]] = b; }); for (const [nm, , fn] of STEPS[tex][0]) e[nm] = fn(e); return e; };
  const truthTable = (tex, n) => { const cols = STEPS[tex][0].map(c => c[0]), head = [...VARS.slice(0, n), ...cols];
    const rows = rowsOf(n).map(r => { const e = runRow(tex, r); return '<tr>' + head.map((h, j) => (j === head.length - 1 && e[h] ? '<td><b>T</b></td>' : `<td>${TV(e[h])}</td>`)).join('') + '</tr>'; });
    return `<table class="tt tv"><tr>${head.map(h => T`<th>\(${h}\)</th>`).join('')}</tr>${rows.join('')}</table>`; };
  const rowOrder = n => (n === 1 ? 'T then F' : n === 2 ? T`\(p\) in blocks of 2, \(q\) alternating` : T`\(p\) in blocks of 4, \(q\) in blocks of 2, \(r\) alternating`);
  const evalSteps = (tex, vals) => { const e = runRow(tex, vals), sub = k => T`\mathrm{${TV(e[k])}}`;
    return STEPS[tex][0].map(([nm, t]) => T`<p>\(${nm} = ${fillT(t, k => k)} = ${fillT(t, sub)} = \mathrm{${TV(e[nm])}}\)</p>`).join(''); };
  const classify = (f, n) => { const v = rowsOf(n).map(r => f(...r)); return v.every(Boolean) ? 'tautology' : v.some(Boolean) ? 'contingency' : 'contradiction'; };
  const TWO = [['\\neg p\\lor q', (p, q) => !p || q, '(not p) or q'], ['\\neg q\\to\\neg p', (p, q) => q || !p, 'q or (not p)'], ['q\\to p', (p, q) => !q || p, '(not q) or p'], ['\\neg p\\to\\neg q', (p, q) => p || !q, 'p or (not q)'],
    ['p\\land\\neg q', (p, q) => p && !q, 'p and (not q)'], ['\\neg p\\land\\neg q', (p, q) => !p && !q, '(not p) and (not q)'], ['\\neg p\\lor\\neg q', (p, q) => !p || !q, '(not p) or (not q)'], ['\\neg(p\\land q)', (p, q) => !(p && q), 'not (p and q)'],
    ['\\neg(p\\lor q)', (p, q) => !(p || q), 'not (p or q)'], ['p\\lor q', (p, q) => p || q, 'p or q'], ['p\\land q', (p, q) => p && q, 'p and q'], ['p\\to q', (p, q) => !p || q, '(not p) or q'],
    ['(p\\to q)\\land(q\\to p)', (p, q) => (!p || q) && (!q || p), '((not p) or q) and ((not q) or p)'], ['p\\leftrightarrow q', (p, q) => p === q, 'p == q'], ['\\neg(p\\leftrightarrow q)', (p, q) => p !== q, 'p != q']];
  const sig = f => rowsOf(2).map(r => (f(...r) ? 1 : 0)).join('');
  const isPrime = m => { if (m < 2) return false; for (let d = 2; d * d <= m; d++) if (m % d === 0) return false; return true; };
  const tv = b => (b ? 'true' : 'false');

  registerUnitGens('discrete', {
    tag: { 'dg-comb': 'Counting principles', 'dg-perm': 'Counting principles', 'dg-stars': 'Counting principles', 'dg-modexp': 'Divisibility and modular arithmetic', 'dg-gcd': 'Divisibility and modular arithmetic', 'dg-incl': 'Inclusion–exclusion' },
    units: {
      'Propositions and truth tables': [
        { id: 'du-eval', make(R) { const [tex, f, py, n] = R.pick(FORMS.filter(F => F[3] > 1)), vals = Array.from({ length: n }, () => R.pick(TF)), out = f(...vals);
          const names = ['p', 'q', 'r'].slice(0, n);
          return { q: T`With ${names.map((v, i) => `\\(${v}\\) ${tv(vals[i])}`).join(', ')}, is \(${tex}\) true or false?`, c: out ? ['True', 'False'] : ['False', 'True'],
            x: T`<p>Name the pieces from the inside out: ${defsOf(tex)}. Then substitute the given values one piece at a time.</p>${evalSteps(tex, vals)}<p>So the statement is ${tv(out)}.</p>`, key: out ? 'True' : 'False', vk: `str(bool((lambda p, q=False, r=False: ${py})(${vals.map(b => (b ? 'True' : 'False')).join(', ')})))` }; } },
        { id: 'du-count', make(R) { const [tex, f, py, n] = R.pick(FORMS.filter(F => F[3] > 1)), cnt = rowsOf(n).filter(r => f(...r)).length;
          return { q: T`In how many rows of its truth table is \(${tex}\) true?`, answer: cnt, x: T`<p>1. Name the pieces from the inside out: ${defsOf(tex)}.</p><p>2. List all \(2^${n} = ${2 ** n}\) rows (${rowOrder(n)}) and fill each column from the ones before it.</p>${truthTable(tex, n)}<p>3. Count the T entries in column \(S\): ${cnt}.</p><p>Shortcut: ${STEPS[tex][1]}</p>`,
            v: `sum(1 for vv in product([True, False], repeat=${n}) if (lambda p, q=False, r=False: ${py})(*vv))` }; } }
      ],
      'Tautologies and contradictions': [
        { id: 'du-taut', make(R) { const [tex, f, py, n] = R.pick(FORMS), k = classify(f, n), others = ['tautology', 'contradiction', 'contingency'].filter(z => z !== k);
          return { q: T`Classify \(${tex}\).`, c: [k, ...others], x: T`<p>Name the pieces: ${defsOf(tex)}. Fill in every row.</p>${truthTable(tex, n)}<p>Column \(S\) is ${k === 'tautology' ? 'all T' : k === 'contradiction' ? 'all F' : 'a mix of T and F'}, so it is a ${k}.</p>`, key: k, vk: `cls(lambda p, q=False, r=False: ${py}, ${n})` }; } }
      ],
      'Equivalences and negation': [
        { id: 'du-equiv', make(R) { let t, eq, non; do { t = R.pick(TWO); eq = TWO.filter(o => o !== t && sig(o[1]) === sig(t[1])); non = TWO.filter(o => sig(o[1]) !== sig(t[1])); } while (!eq.length || non.length < 3);
          const good = R.pick(eq), bad = R.shuffle(non).slice(0, 3);
          return { q: T`Which formula is logically equivalent to \(${t[0]}\)?`, c: [T`\(${good[0]}\)`, ...bad.map(b => T`\(${b[0]}\)`)], x: T`Their truth tables match in every row.`, key: 'True', vk: `str(equiv(lambda p, q: ${t[2]}, lambda p, q: ${good[2]}))` }; } }
      ],
      'Quantifiers': [
        { id: 'du-quant', make(R) { const n = R.int(4, 9), k = R.int(2, 30), m = R.pick([12, 18, 24, 30, 36]);
          const [ptex, pjs, ppy] = R.pick([[`x^2 > ${k}`, x => x * x > k, `x*x > ${k}`], [`x \\mid ${m}`, x => m % x === 0, `${m} % x == 0`], ['x \\text{ is even}', x => x % 2 === 0, 'x % 2 == 0'], [`2x < ${k}`, x => 2 * x < k, `2*x < ${k}`], [k % 7 ? `x + ${k % 7} > 5` : 'x > 5', x => x + (k % 7) > 5, `x + ${k % 7} > 5`]]);
          const all = R.int(0, 1) === 1, dom = Array.from({ length: n }, (_, i) => i + 1), out = all ? dom.every(pjs) : dom.some(pjs);
          return { q: T`Over the domain \(\{1, 2, \dots, ${n}\}\), is \(${all ? '\\forall' : '\\exists'} x\,(${ptex})\) true?`, c: out ? ['True', 'False'] : ['False', 'True'],
            x: all ? T`"For all" needs every element to work. ${out ? 'Every one does.' : `It fails for x = ${dom.find(x => !pjs(x))}.`}` : T`"There exists" needs one example. ${out ? `x = ${dom.find(pjs)} works.` : 'None works.'}`,
            key: out ? 'True' : 'False', vk: `str(${all ? 'all' : 'any'}(${ppy} for x in range(1, ${n + 1})))` }; } }
      ],
      'Proof strategies': [
        { id: 'du-counter', make(R) { const p = R.pick([5, 11, 17, 41]), plus = R.int(0, 1) === 1, f = m => m * m + (plus ? m : -m) + p; let m = 0; while (isPrime(f(m))) m++;
          return { q: T`Find the smallest counterexample \(n \ge 0\) to "\(n^2 ${plus ? '+' : '-'} n + ${p}\) is prime for every \(n\)".`, answer: m,
            x: T`Test \(n = 0, 1, 2, \dots\): every value is prime until \(n = ${m}\), which gives \(${f(m)}\), not prime. One counterexample disproves a "for all" claim.`, v: `next(m for m in range(0, 200) if not isprime(m*m ${plus ? '+' : '-'} m + ${p}))` }; } }
      ],
      'Mathematical induction': [
        { id: 'du-sum', make(R) { const k = R.int(0, 3), n = R.int(5, 40);
          const Q = [[T`1 + 2 + \cdots + ${n}`, n * (n + 1) / 2, `summation(y, (y, 1, ${n}))`, T`\(\frac{n(n + 1)}{2}\) with \(n = ${n}\).`],
            [T`1^2 + 2^2 + \cdots + ${n}^2`, n * (n + 1) * (2 * n + 1) / 6, `summation(y**2, (y, 1, ${n}))`, T`\(\frac{n(n + 1)(2n + 1)}{6}\) with \(n = ${n}\).`],
            [T`1 + 3 + 5 + \cdots + ${2 * n - 1}`, n * n, `summation(2*y - 1, (y, 1, ${n}))`, T`The first \(n\) odd numbers sum to \(n^2\); here \(n = ${n}\).`],
            [T`1 + 2 + 4 + \cdots + 2^{${Math.min(n, 20) - 1}}`, 2 ** Math.min(n, 20) - 1, `summation(2**(y - 1), (y, 1, ${Math.min(n, 20)}))`, T`\(2^{n} - 1\) with \(n = ${Math.min(n, 20)}\) terms.`]][k];
          return { q: T`Find \(${Q[0]}\).`, answer: Q[1], x: Q[3], v: Q[2] }; } }
      ],
      'Sets and functions': [
        { id: 'du-sets', make(R) { const A = R.shuffle([...Array(12).keys()].map(i => i + 1)).slice(0, R.int(3, 7)).sort((a, b) => a - b), B = R.shuffle([...Array(12).keys()].map(i => i + 1)).slice(0, R.int(3, 7)).sort((a, b) => a - b);
          const op = R.pick(['cup', 'cap', 'minus']), S = { cup: [...new Set([...A, ...B])], cap: A.filter(a => B.includes(a)), minus: A.filter(a => !B.includes(a)) }[op];
          return { q: T`\(A = \{${A.join(', ')}\}\), \(B = \{${B.join(', ')}\}\). Find \(|A ${{ cup: '\\cup', cap: '\\cap', minus: '-' }[op]} B|\).`, answer: S.length,
            x: T`\(A ${{ cup: '\\cup', cap: '\\cap', minus: '-' }[op]} B = \{${S.sort((a, b) => a - b).join(', ')}\}\), which has ${S.length} element${S.length === 1 ? '' : 's'}.`,
            v: `len(set([${A}]) ${{ cup: '|', cap: '&', minus: '-' }[op]} set([${B}]))` }; } },
        { id: 'du-funcs', make(R) { const m = R.int(1, 4), n = R.int(1, 5), inj = R.int(0, 1) === 1; let val = inj ? (n >= m ? fact(n) / fact(n - m) : 0) : n ** m;
          return { q: T`How many ${inj ? 'one-to-one ' : ''}functions are there from a ${m}-element set to a ${n}-element set?`, answer: val,
            x: inj ? (n >= m ? T`The first input has ${n} choices, the next ${n - 1}, and so on: \(${Array.from({ length: m }, (_, i) => n - i).join('\\cdot')} = ${val}\).` : T`There are more inputs than outputs, so two inputs must share: none.`) : T`Each of the ${m} inputs independently picks one of ${n} outputs: \(${n}^{${m}} = ${val}\).`,
            v: `sum(1 for f in product(range(${n}), repeat=${m})${inj ? ` if len(set(f)) == ${m}` : ''})` }; } }
      ],
      'Relations': [
        { id: 'du-rel', make(R) { const all = []; for (const a of [1, 2, 3]) for (const b of [1, 2, 3]) all.push([a, b]);
          let rel = all.filter(() => R.int(0, 2) > 0); if (R.int(0, 2) === 0) rel = [...new Set([...rel, [1, 1], [2, 2], [3, 3]].map(String))].map(s => s.split(',').map(Number));
          const has = (a, b) => rel.some(([x, y]) => x === a && y === b), prop = R.pick(['reflexive', 'symmetric', 'transitive']);
          const out = prop === 'reflexive' ? [1, 2, 3].every(a => has(a, a)) : prop === 'symmetric' ? rel.every(([a, b]) => has(b, a)) : rel.every(([a, b]) => rel.every(([c, d]) => b !== c || has(a, d)));
          const py = `{${rel.map(([a, b]) => `(${a}, ${b})`).join(', ')}}`, chk = { reflexive: `all((a, a) in S for a in (1, 2, 3))`, symmetric: `all((b, a) in S for (a, b) in S)`, transitive: `all((a, d) in S for (a, b) in S for (c, d) in S if b == c)` }[prop];
          return { q: T`On \(\{1, 2, 3\}\), \(R = \{${rel.map(([a, b]) => `(${a},${b})`).join(', ')}\}\). Is \(R\) ${prop}?`, c: out ? ['Yes', 'No'] : ['No', 'Yes'],
            x: { reflexive: T`Reflexive needs \((1,1), (2,2), (3,3)\) all present.`, symmetric: T`Symmetric needs \((b, a)\) for every \((a, b)\).`, transitive: T`Transitive needs \((a, c)\) whenever \((a, b)\) and \((b, c)\) are present.` }[prop] + (out ? ' It holds.' : ' It fails somewhere.'),
            key: String(out ? 'True' : 'False'), vk: `str((lambda S: ${chk})(${rel.length ? py : 'set()'}))` }; } }
      ],
      'Binomial theorem': [
        { id: 'du-coef', make(R) { const n = R.int(3, 6), k = R.int(1, n - 1), a = R.pick([1, 2, 3, -1, -2]), b = R.pick([1, 2, -1, -2, 3]), C = fact(n) / (fact(k) * fact(n - k)), val = C * a ** k * b ** (n - k);
          return { q: T`Find the coefficient of \(x^{${k}}\) in \((${R.co(a)}x ${R.sgn(b, true)})^{${n}}\).`, answer: val,
            x: T`Choose \(${R.co(a)}x\) from ${k} of the ${n} brackets: \(\binom{${n}}{${k}}(${a})^{${k}}(${b})^{${n - k}} = ${C}\cdot${a ** k}\cdot${b ** (n - k)} = ${val}\).`, v: `Poly(expand((${a}*x + (${b}))**${n}), x).coeff_monomial(x**${k})` }; } }
      ],
      'Pigeonhole principle': [
        { id: 'du-pigeon', make(R) { const [m, things, holes] = R.pick([[12, 'people', 'birth months'], [7, 'people', 'days of the week'], [5, 'socks', 'colors'], [10, 'integers', 'last digits'], [4, 'cards', 'suits']]), k = R.int(2, 5);
          return { q: T`There are ${m} ${holes}. How many ${things} guarantee that at least ${k} share one?`, answer: m * (k - 1) + 1,
            x: T`With \(${m}\cdot${k - 1} = ${m * (k - 1)}\) you could have exactly ${k - 1} in each. One more forces ${k} somewhere: ${m * (k - 1) + 1}.`, v: `min(N for N in range(1, 1000) if -(-N // ${m}) >= ${k})` }; } }
      ],
      'Divisibility and modular arithmetic': [
        { id: 'du-modarith', make(R) { const m = R.int(3, 13), a = R.int(-40, 60), b = R.int(2, 40), c = R.int(-20, 20), val = (((a * b + c) % m) + m) % m;
          return { q: T`Find \((${a}\cdot${b} ${R.sgn(c, true)}) \bmod ${m}\).`, answer: val,
            x: T`Reduce first: \(${a} \equiv ${((a % m) + m) % m}\), \(${b} \equiv ${b % m}\), \(${c} \equiv ${((c % m) + m) % m}\) (mod ${m}). Combine and reduce again: ${val}.`, v: `(${a}*${b} + (${c})) % ${m}` }; } }
      ],
      'Graphs': [
        { id: 'du-graph', make(R) { const n = R.int(4, 7), deg = Array(n).fill(0); let E = 0;
          for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (R.int(0, 1)) { deg[i]++; deg[j]++; E++; }
          if (R.int(0, 2) === 0) return { q: T`How many edges does the complete graph \(K_{${n + 2}}\) have?`, answer: (n + 2) * (n + 1) / 2, x: T`Every pair is joined: \(\binom{${n + 2}}{2} = ${(n + 2) * (n + 1) / 2}\).`, v: `binomial(${n + 2}, 2)` };
          return { q: T`A graph has vertex degrees ${deg.join(', ')}. How many edges does it have?`, answer: E, x: T`Each edge adds 2 to the degree total: \(\frac{${deg.reduce((a, b) => a + b, 0)}}{2} = ${E}\).`, v: `sum([${deg}])//2` }; } }
      ],
      'Recurrence relations': [
        { id: 'du-rec', make(R) { const p = R.pick([2, 3, -1, -2]), q = R.int(-3, 5), a0 = R.int(-3, 5), k = R.int(3, 6); let a = a0; for (let i = 0; i < k; i++) a = p * a + q;
          return { q: T`\(a_0 = ${a0}\) and \(a_n = ${p}a_{n-1} ${R.sgn(q, true)}\). Find \(a_{${k}}\).`, answer: a,
            x: T`Step forward: \(${(() => { let s = a0, out = [a0]; for (let i = 0; i < k; i++) { s = p * s + q; out.push(s); } return out.join(',\\ '); })()}\).`, v: `reduce(lambda a, _: ${p}*a + (${q}), range(${k}), ${a0})` }; } }
      ],
      'Growth of functions': [
        { id: 'du-growth', make(R) { const k = R.int(1, 3), c = R.pick([2, 3, 10]);
          return { q: T`An \(O(${k === 1 ? 'n' : `n^{${k}}`})\) algorithm takes 1 second on some input. About how many seconds on an input ${c} times larger?`, answer: c ** k,
            x: k === 1 ? T`Linear time scales with the input: \(${c}\) times the input takes \(${c}\) times as long.` : T`\((${c}n)^{${k}} = ${c}^{${k}}n^{${k}}\): \(${c ** k}\) times as long.`, v: `simplify((${c}*y)**${k}/y**${k})` }; } }
      ]
    }
  });
})();
