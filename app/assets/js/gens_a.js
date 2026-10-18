'use strict';
// Unit generators for Algebra, Trigonometry, Precalculus.
// Each returns v: an independent SymPy/Python expression for the answer, checked by the build harness.
(() => {
  // Step wording for moving a constant: "Subtract 3: ", "Add 4: ", or nothing for 0.
  const moveStep = (b, all) => (b > 0 ? `Subtract ${b}${all ? ' from all three parts' : ''}: ` : b < 0 ? `Add ${-b}${all ? ' to all three parts' : ''}: ` : '');
  const lin = h => (h === 0 ? 'x' : h > 0 ? `x - ${h}` : `x + ${-h}`);
  const FR = 'Fractions such as 5/2 are fine.';
  const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  const SQF = [2, 3, 5, 6, 7, 10];

  // ======================= ALGEBRA =======================
  registerUnitGens('algebra', {
    tag: { 'ag-lin': 'Linear equations', 'ag-abs': 'Absolute value', 'ag-exp': 'Exponent rules', 'ag-quad': 'Quadratic equations', 'ag-vertex': 'Graphs of quadratics', 'ag-slope': 'Lines and slope', 'ag-sys': 'Systems of equations' },
    units: {
      'Linear equations': [
        { id: 'au-frac', make(R) { const a = R.int(2, 6), k = R.int(-6, 8), x = a * k, b = R.nz(-9, 9), c = k + b;
          return { q: T`Solve \(\dfrac{x}{${a}} ${R.sgn(b, true)} = ${c}\).`, answer: x, x: T`Subtract ${b}: \(\frac{x}{${a}} = ${k}\). Multiply both sides by ${a}: \(x = ${x}\).`, v: `solve(Eq(x/${a} + (${b}), ${c}), x)[0]` }; } },
        { id: 'au-paren', make(R) { let a, c; do { a = R.nz(-5, 6); c = R.nz(-5, 6); } while (a === c); const x = R.int(-8, 8), b = R.nz(-6, 6), d = a * (x + b) - c * x;
          return { q: T`Solve \(${R.co(a)}(x ${R.sgn(b, true)}) = ${R.co(c)}x ${R.sgn(d, true)}\).`, answer: x,
            x: T`Distribute: \(${R.co(a)}x ${R.sgn(a * b, true)} = ${R.co(c)}x ${R.sgn(d, true)}\). Collect \(x\) on the left: \(${a - c}x = ${d - a * b}\), so \(x = ${x}\).`, v: `solve(Eq(${a}*(x + (${b})), ${c}*x + (${d})), x)[0]` }; } }
      ],
      'Inequalities': [
        { id: 'au-ineq-dir', make(R) { const a = R.nz(-5, 5), k = R.nz(-6, 6), b = R.int(-9, 9), c = a * k + b, op = R.pick(['<', '>', '\\le', '\\ge']);
          const flip = { '<': '>', '>': '<', '\\le': '\\ge', '\\ge': '\\le' }, res = a > 0 ? op : flip[op], key = { '<': 'lt', '>': 'gt', '\\le': 'le', '\\ge': 'ge' };
          const py = { '<': '<', '>': '>', '\\le': '<=', '\\ge': '>=' }[op];
          return { q: T`Solve \(${R.co(a)}x ${R.sgn(b, true)} ${op} ${c}\).`, c: [T`\(x ${res} ${k}\)`, T`\(x ${flip[res]} ${k}\)`, T`\(x ${res} ${-k}\)`, T`\(x ${flip[res]} ${-k}\)`],
            x: a === 1 ? T`${moveStep(b)}\(x ${res} ${k}\).` : T`${moveStep(b)}\(${R.co(a)}x ${op} ${c - b}\). Divide by ${a}${a < 0 ? ', a negative number, so the inequality reverses' : ''}: \(x ${res} ${k}\).`, key: `${key[res]}|${k}`, vk: `ineqkey(${a}, ${b}, '${py}', ${c})` }; } },
        { id: 'au-ineq-int', make(R) { const a = R.nz(-5, 5), b = R.int(-9, 9), c = R.int(-15, 15), strict = R.int(0, 1) === 1, op = strict ? '<' : '\\le';
          const ok = n => (strict ? a * n + b < c : a * n + b <= c); let ans = null;
          if (a > 0) { for (let n = -200; n <= 200; n++) if (ok(n)) ans = n; } else { for (let n = 200; n >= -200; n--) if (ok(n)) ans = n; }
          const dir = a > 0 ? (strict ? '<' : '\\le') : (strict ? '>' : '\\ge'), word = a > 0 ? 'largest' : 'smallest', pyop = strict ? '<' : '<=';
          return { q: T`Find the ${word} integer \(x\) that satisfies \(${R.co(a)}x ${R.sgn(b, true)} ${op} ${c}\).`, answer: ans,
            x: T`${moveStep(b)}\(${R.co(a)}x ${op} ${c - b}\). ${a === 1 ? 'So' : `Divide by ${a}${a < 0 ? ' and reverse the sign' : ''}:`} \(x ${dir} ${R.frac(c - b, a)}\)${(c - b) % a ? T`, about \(${R.fmt((c - b) / a, 2)}\)` : ''}. ${(c - b) % a === 0 && strict ? `The bound itself is excluded, so step ${a > 0 ? 'down' : 'up'} one: ` : `Moving ${a > 0 ? 'down' : 'up'} to an integer: `}the ${word} integer is ${ans}.`,
            v: `${a > 0 ? 'max' : 'min'}(n for n in range(-200, 201) if ${a}*n + (${b}) ${pyop} ${c})` }; } },
        { id: 'au-ineq-comp', make(R) { const a = R.int(1, 4), b = R.int(-6, 6), lo = R.int(-12, 0), hi = lo + R.int(4, 16); let cnt = 0;
          for (let n = -100; n <= 100; n++) if (lo <= a * n + b && a * n + b < hi) cnt++;
          return { q: T`How many integers satisfy \(${lo} \le ${R.co(a)}x ${R.sgn(b, true)} < ${hi}\)?`, answer: cnt,
            x: T`${moveStep(b, true)}\(${lo - b} \le ${R.co(a)}x < ${hi - b}\).${a === 1 ? '' : T` Divide by ${a}: \(${R.frac(lo - b, a)} \le x < ${R.frac(hi - b, a)}\).`} The integers run from ${Math.ceil((lo - b) / a)} to ${Math.ceil((hi - b) / a) - 1}: \(${Math.ceil((hi - b) / a) - 1} - (${Math.ceil((lo - b) / a)}) + 1 = ${cnt}\).`,
            v: `sum(1 for n in range(-100, 101) if ${lo} <= ${a}*n + (${b}) < ${hi})` }; } }
      ],
      'Absolute value': [
        { id: 'au-abs-count', make(R) { const h = R.int(-6, 6), r = R.int(1, 6), strict = R.int(0, 1) === 1, cnt = strict ? 2 * r - 1 : 2 * r + 1;
          return { q: T`How many integers satisfy \(|${lin(h)}| ${strict ? '<' : '\\le'} ${r}\)?`, answer: cnt,
            x: T`The distance from \(x\) to \(${h}\) is ${strict ? 'less than' : 'at most'} ${r}: \(${h - r} ${strict ? '<' : '\\le'} x ${strict ? '<' : '\\le'} ${h + r}\). ${strict ? T`The endpoints \(${h - r}\) and \(${h + r}\) are exactly ${r} away, so the strict sign excludes them.` : T`The endpoints \(${h - r}\) and \(${h + r}\) are exactly ${r} away, so they count.`} ${cnt === 1 ? T`The only integer is \(${h}\): 1 of them, which` : T`The integers are \(${Array.from({ length: cnt }, (_, i) => h - r + (strict ? 1 : 0) + i).join(', ')}\): ${cnt} of them, which`} is \(${strict ? `2(${r}) - 1` : `2(${r}) + 1`}\).`,
            v: `sum(1 for n in range(-50, 51) if abs(n - (${h})) ${strict ? '<' : '<='} ${r})` }; } }
      ],
      'Exponent rules': [
        { id: 'au-exp-frac', make(R) { const k = R.int(2, 5), n = R.pick([2, 3]), b = k ** n, m = R.nz(-3, 3), val = m > 0 ? k ** m : 1 / k ** -m;
          return { q: T`Evaluate \(${b}^{${m}/${n}}\).`, answer: val, hint: FR,
            x: T`The denominator is a root: \(${n === 2 ? `\\sqrt{${b}}` : `\\sqrt[3]{${b}}`} = ${k}\). Then apply the power ${m}: \(${k}^{${m}} = ${m > 0 ? k ** m : R.frac(1, k ** -m)}\).`, v: `Rational(${b})**Rational(${m}, ${n})` }; } }
      ],
      'Radicals': [
        { id: 'au-rad-simp', make(R) { const m = R.pick(SQF), a = R.int(2, 9), n = a * a * m;
          return { q: T`\(\sqrt{${n}} = a\sqrt{${m}}\). Find \(a\).`, answer: a, x: T`Largest perfect-square factor: \(${n} = ${a * a}\cdot${m}\), and \(\sqrt{${a * a}} = ${a}\).`, v: `sqrt(${n})/sqrt(${m})` }; } },
        { id: 'au-rad-comb', make(R) { const m = R.pick(SQF), a = R.int(1, 7), b = R.int(1, 7), s = R.pick([1, -1]), c = a + s * b, op = s > 0 ? '+' : '-';
          const term = k => (k === 1 ? `\\sqrt{${m}}` : `${k}\\sqrt{${m}}`);
          return { q: T`\(\sqrt{${a * a * m}} ${op} \sqrt{${b * b * m}} = c\sqrt{${m}}\). Find \(c\).`, answer: c,
            x: T`Simplify each root first: \(\sqrt{${a * a * m}} = ${term(a)}\) and \(\sqrt{${b * b * m}} = ${term(b)}\). Both are multiples of \(\sqrt{${m}}\), so combine the coefficients: \(${a} ${op} ${b} = ${c}\).`,
            v: `(sqrt(${a * a * m}) ${op} sqrt(${b * b * m}))/sqrt(${m})` }; } },
        { id: 'au-rad-mult', make(R) { const m = R.pick(SQF), a = R.int(1, 4), b = R.int(1, 4), p = m * a * a, q = m * b * b * R.pick([1, 4]), ans = Math.sqrt(p * q);
          return { q: T`Evaluate \(\sqrt{${p}}\cdot\sqrt{${q}}\).`, answer: ans, x: T`Multiply under one root: \(\sqrt{${p}\cdot${q}} = \sqrt{${p * q}} = ${ans}\).`, v: `sqrt(${p})*sqrt(${q})` }; } },
        { id: 'au-rad-div', make(R) { const m = R.pick(SQF), k = R.int(2, 9), p = m * k * k;
          return { q: T`Evaluate \(\dfrac{\sqrt{${p}}}{\sqrt{${m}}}\).`, answer: k, x: T`Divide under one root: \(\sqrt{\frac{${p}}{${m}}} = \sqrt{${k * k}} = ${k}\).`, v: `sqrt(${p})/sqrt(${m})` }; } },
        { id: 'au-rad-rat', make(R) { const m = R.pick([2, 3, 5, 6, 7]), k = R.int(1, 12);
          return { q: T`Rationalize: \(\dfrac{${k}}{\sqrt{${m}}} = c\sqrt{${m}}\). Find \(c\).`, answer: k / m, hint: FR,
            x: T`Multiply top and bottom by \(\sqrt{${m}}\): \(\frac{${k}\sqrt{${m}}}{${m}}\), so \(c = ${R.frac(k, m)}\).`, v: `${k}/sqrt(${m})/sqrt(${m})` }; } }
      ],
      'Polynomials': [
        { id: 'au-poly-coef', make(R) { const a = R.nz(-4, 5), b = R.nz(-6, 6), c = R.nz(-4, 5), d = R.nz(-6, 6), ask = R.pick(['x', '1', 'x**2']);
          const val = { x: a * d + b * c, 1: b * d, 'x**2': a * c }[ask], what = { x: 'the coefficient of \\(x\\)', 1: 'the constant term', 'x**2': 'the coefficient of \\(x^2\\)' }[ask];
          return { q: T`Expand \((${R.co(a)}x ${R.sgn(b, true)})(${R.co(c)}x ${R.sgn(d, true)})\). What is ${what}?`, answer: val,
            x: T`FOIL: first \(${a * c}x^2\), outer \(${a * d}x\), inner \(${b * c}x\), last \(${b * d}\). Result: \(${a * c}x^2 ${R.t(a * d + b * c, 'x')} ${R.sgn(b * d, true)}\).`,
            v: `Poly(expand((${a}*x + (${b}))*(${c}*x + (${d}))), x).coeff_monomial(${ask})` }; } },
        { id: 'au-poly-rem', make(R) { const p = R.int(-4, 4), q = R.int(-6, 6), r = R.int(-9, 9), s = R.nz(-3, 3), val = s ** 3 + p * s * s + q * s + r;
          return { q: T`Find the remainder when \(x^3 ${R.t(p, 'x^2')} ${R.t(q, 'x')} ${R.sgn(r, true)}\) is divided by \(${lin(s)}\).`, answer: val,
            x: T`Remainder theorem: the remainder is \(f(${s}) = ${s ** 3} ${R.sgn(p * s * s, true)} ${R.sgn(q * s, true)} ${R.sgn(r, true)} = ${val}\).`,
            v: `rem(x**3 + (${p})*x**2 + (${q})*x + (${r}), x - (${s}), x)` }; } }
      ],
      'Factoring': [
        { id: 'au-fact', make(R) { let p, q; do { p = R.int(-9, 9); q = R.int(-9, 9); } while (p === q); if (p > q) [p, q] = [q, p];
          return { q: T`Factor \(x^2 ${R.t(p + q, 'x')} ${R.sgn(p * q, true)}\) as \((x + p)(x + q)\) with \(p < q\). Find \(q\).`, answer: q,
            x: T`Find two numbers with product \(${p * q}\) and sum \(${p + q}\): \(${p}\) and \(${q}\).`, v: `max([-s for s in solve(x**2 + (${p + q})*x + (${p * q}), x)])` }; } },
        { id: 'au-fact-ac', make(R) { let a, b, d, mid, C, sols; do { a = R.int(2, 5); b = R.nz(-7, 7); d = R.nz(-7, 7); mid = a * d + b; C = b * d; sols = []; for (let z = -30; z <= 30; z++) if (z && (mid - a * z) * z === C) sols.push(z); } while (sols.length !== 1 || R.gcd(a, b) !== 1);
          return { q: T`\(${a}x^2 ${R.t(mid, 'x')} ${R.sgn(C, true)} = (${a}x + b)(x + d)\) with integers \(b\), \(d\). Find \(d\).`, answer: d,
            x: T`\((${a}x + b)(x + d) = ${a}x^2 + (${a}d + b)x + bd\). So \(bd = ${C}\) and \(${a}d + b = ${mid}\): \(d = ${d}\), \(b = ${b}\).`, v: `[z for z in range(-30, 31) if z != 0 and (${mid} - ${a}*z)*z == ${C}]` }; } }
      ],
      'Quadratic equations': [
        { id: 'au-qf', make(R) { let a, b, c, D; do { a = R.nz(-3, 4); b = R.int(-8, 8); c = R.int(-9, 9); D = b * b - 4 * a * c; } while (D <= 0 || Number.isInteger(Math.sqrt(D)));
          const big = Math.max((-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a));
          return { q: T`Find the larger solution of \(${R.co(a)}x^2 ${R.t(b, 'x')} ${R.sgn(c, true)} = 0\), to three decimals.`, answer: big, tol: 0.0015, hint: 'Round to three decimals.',
            x: T`It does not factor nicely. \(x = \frac{${-b} \pm\sqrt{${D}}}{${2 * a}}\); the larger value is \(${R.fmt(big, 3)}\).`, v: `max(solve(${a}*x**2 + (${b})*x + (${c}), x))` }; } },
        { id: 'au-disc', make(R) { let a = R.nz(-3, 3), b, c; if (R.int(0, 3) === 0) { const r = R.int(-4, 4); b = -2 * a * r; c = a * r * r; } else { b = R.int(-8, 8); c = R.int(-9, 9); }
          const D = b * b - 4 * a * c, n = D > 0 ? 2 : D === 0 ? 1 : 0;
          return { q: T`How many distinct real solutions does \(${R.co(a)}x^2 ${R.t(b, 'x')} ${R.sgn(c, true)} = 0\) have?`, answer: n,
            x: T`Discriminant \(b^2 - 4ac = ${b * b} - (${4 * a * c}) = ${D}\), which is ${D > 0 ? 'positive: two' : D === 0 ? 'zero: one' : 'negative: none'}.`, v: `len([s for s in solve(${a}*x**2 + (${b})*x + (${c}), x) if s.is_real])` }; } }
      ],
      'Graphs of quadratics': [
        { id: 'au-axis', make(R) {
          const k = R.int(0, 5), a = R.nz(-3, 3), quad = (A, B, C) => `${R.co(A)}x^2 ${R.t(B, 'x')} ${R.sgn(C, true)}`, sgnB = v => (v < 0 ? `(${v})` : v);
          if (k === 0) { const r1 = R.int(-7, 6), r2 = R.int(r1 + 1, 8), B = -a * (r1 + r2), C = a * r1 * r2;
            return { q: T`Find the axis of symmetry \(x = ?\) of \(y = ${quad(a, B, C)}\).`, answer: (r1 + r2) / 2, hint: 'Decimals such as 2.5 are fine.',
              x: T`\(a = ${a}\), \(b = ${B}\): \(x = -\frac{b}{2a} = -\frac{${B}}{2${sgnB(a)}} = ${R.frac(r1 + r2, 2)}\). Check: the roots are ${r1} and ${r2}, and their average is the same.`, v: `solve(diff(${a}*x**2 + (${B})*x + (${C}), x), x)[0]` }; }
          if (k === 1) { const B = R.nz(-9, 9), C = R.int(-9, 9), h = -B / (2 * a);
            return { q: T`Find the axis of symmetry \(x = ?\) of \(y = ${quad(a, B, C)}\).`, answer: h, hint: 'Fractions such as 3/4 or decimals are fine.',
              x: T`\(a = ${a}\), \(b = ${B}\): \(x = -\frac{b}{2a} = -\frac{${B}}{2${sgnB(a)}} = ${R.frac(-B, 2 * a)}\). This works whether or not the parabola crosses the \(x\)-axis.`, v: `solve(diff(${a}*x**2 + (${B})*x + (${C}), x), x)[0]` }; }
          if (k === 2) { const r1 = R.int(-8, 6), r2 = R.int(r1 + 1, 9);
            return { q: T`Find the axis of symmetry \(x = ?\) of \(y = ${R.co(a)}${R.fac(r1)}${R.fac(r2)}\).`, answer: (r1 + r2) / 2, hint: 'Decimals such as 2.5 are fine.',
              x: T`The roots are ${r1} and ${r2}. The axis is halfway between them: \(\frac{${r1} + ${sgnB(r2)}}{2} = ${R.frac(r1 + r2, 2)}\). The leading factor \(${a}\) stretches or flips the parabola but does not move the axis.`, v: `solve(diff(${a}*(x - (${r1}))*(x - (${r2})), x), x)[0]` }; }
          if (k === 3) { const h = R.int(-7, 7), kk = R.int(-9, 9);
            return { q: T`Find the axis of symmetry \(x = ?\) of \(y = ${R.co(a)}(x ${R.sgn(-h, true)})^2 ${R.sgn(kk, true)}\).`.replace('(x )', '(x)'), answer: h,
              x: T`Vertex form \(a(x - h)^2 + k\) has axis \(x = h\). Here \(x ${R.sgn(-h, true)} = x - (${h})\), so \(h = ${h}\).`, v: `solve(diff(${a}*(x - (${h}))**2 + (${kk}), x), x)[0]` }; }
          if (k === 4) { const p = R.int(-9, 4), q = R.int(p + 1, 10), y0 = R.int(-9, 9);
            return { q: T`A parabola passes through \((${p}, ${y0})\) and \((${q}, ${y0})\). Find its axis of symmetry \(x = ?\)`, answer: (p + q) / 2, hint: 'Decimals such as 2.5 are fine.',
              x: T`The points have the same height, so they are mirror images across the axis: \(x = \frac{${p} + ${sgnB(q)}}{2} = ${R.frac(p + q, 2)}\).`, v: `solve(diff(Symbol('A')*(x - (${p}))*(x - (${q})) + ${y0}, x), x)[0]` }; }
          const h = R.nz(-6, 6), C = R.int(-9, 9), B = -2 * a * h;
          return { q: T`The axis of symmetry of \(y = ${R.co(a)}x^2 + bx ${R.sgn(C, true)}\) is \(x = ${h}\). Find \(b\).`, answer: B,
            x: T`\(-\frac{b}{2a} = ${h}\) with \(a = ${a}\) gives \(b = -2ah = -2(${a})(${h}) = ${B}\).`, v: `solve(Eq(-Symbol('b')/(2*(${a})), ${h}), Symbol('b'))[0]` };
        } }
      ],
      'Quadratic inequalities': [
        { id: 'au-qi-count', make(R) { const r1 = R.int(-7, 5), r2 = R.int(r1 + 1, r1 + 9), strict = R.int(0, 1) === 1, B = -(r1 + r2), C = r1 * r2, cnt = strict ? r2 - r1 - 1 : r2 - r1 + 1;
          return { q: T`How many integers satisfy \(x^2 ${R.t(B, 'x')} ${R.sgn(C, true)} ${strict ? '<' : '\\le'} 0\)?`, answer: cnt,
            x: T`Factor: \(${R.fac(r1)}${R.fac(r2)}\). An upward parabola is ${strict ? 'negative' : 'at or below zero'} between its roots: \(${r1} ${strict ? '<' : '\\le'} x ${strict ? '<' : '\\le'} ${r2}\). That is ${cnt} integers.`,
            v: `sum(1 for n in range(-60, 61) if n*n + (${B})*n + (${C}) ${strict ? '<' : '<='} 0)` }; } },
        { id: 'au-qi-out', make(R) { const r1 = R.int(-8, 0), r2 = R.int(1, 9), strict = R.int(0, 1) === 1, B = -(r1 + r2), C = r1 * r2; let ans = 1;
          while (!(strict ? (ans - r1) * (ans - r2) > 0 : (ans - r1) * (ans - r2) >= 0)) ans++;
          return { q: T`Find the smallest positive integer that satisfies \(x^2 ${R.t(B, 'x')} ${R.sgn(C, true)} ${strict ? '>' : '\\ge'} 0\).`, answer: ans,
            x: T`Roots ${r1} and ${r2}; an upward parabola is ${strict ? 'positive' : 'nonnegative'} outside them: \(x ${strict ? '<' : '\\le'} ${r1}\) or \(x ${strict ? '>' : '\\ge'} ${r2}\). The smallest positive integer there is ${ans}.`,
            v: `min(n for n in range(1, 100) if n*n + (${B})*n + (${C}) ${strict ? '>' : '>='} 0)` }; } }
      ],
      'Rational expressions': [
        { id: 'au-rat-eval', make(R) { const a = R.int(1, 7); let k; do { k = R.int(-6, 9); } while (Math.abs(k) === a); const sq = R.int(0, 1) === 1;
          const tex = sq ? `\\dfrac{x^2 + ${2 * a}x + ${a * a}}{x + ${a}}` : `\\dfrac{x^2 - ${a * a}}{x - ${a}}`, py = sq ? `(x**2 + ${2 * a}*x + ${a * a})/(x + ${a})` : `(x**2 - ${a * a})/(x - ${a})`;
          return { q: T`Simplify \(${tex}\), then evaluate at \(x = ${k}\).`, answer: k + a,
            x: T`${sq ? T`The top is \((x + ${a})^2\)` : T`The top is \((x - ${a})(x + ${a})\)`}; cancel the common factor to get \(x + ${a}\), which is \(${k + a}\) at \(x = ${k}\).`, v: `(${py}).subs(x, ${k})` }; } },
        { id: 'au-rat-eq', make(R) { const k = R.nz(-5, 5), m = R.nz(-4, 4), a = k * m, h = R.int(-6, 6);
          return { q: T`Solve \(\dfrac{${a}}{${lin(h)}} = ${k}\).`, answer: h + m, x: T`Multiply by \(${lin(h)}\): \(${a} = ${k}(${lin(h)})\), so \(${lin(h)} = ${m}\) and \(x = ${h + m}\). It does not make the denominator zero, so it stands.`, v: `solve(Eq(${a}/(x - (${h})), ${k}), x)[0]` }; } }
      ],
      'Lines and slope': [
        { id: 'au-line-b', make(R) { const x1 = R.int(-5, 5), y1 = R.int(-8, 8), m2 = R.nz(-6, 6), b = y1 - m2 * x1 / 2;
          return { q: T`A line has slope \(${R.frac(m2, 2)}\) and passes through \((${x1}, ${y1})\). Find its \(y\)-intercept.`, answer: b, hint: FR,
            x: T`\(b = y_1 - mx_1 = ${y1} - (${R.frac(m2, 2)})(${x1}) = ${R.frac(2 * y1 - m2 * x1, 2)}\).`, v: `solve(Eq(${y1}, Rational(${m2}, 2)*(${x1}) + y), y)[0]` }; } },
        { id: 'au-perp', make(R) { let dx, dy; do { dx = R.nz(-6, 6); dy = R.nz(-6, 6); } while (false); const x1 = R.int(-4, 4), y1 = R.int(-4, 4);
          return { q: T`Find the slope of a line perpendicular to the line through \((${x1}, ${y1})\) and \((${x1 + dx}, ${y1 + dy})\).`, answer: -dx / dy, hint: FR,
            x: T`The line's slope is \(${R.frac(dy, dx)}\). Flip it and change the sign: \(${R.frac(-dx, dy)}\).`, v: `-1/Rational(${dy}, ${dx})` }; } }
      ],
      'Systems of equations': [
        { id: 'au-sys-word', make(R) { const ad = R.int(5, 40), ch = R.int(5, 40), pa = R.pick([8, 10, 12, 15]), pc = R.pick([4, 5, 6]), N = ad + ch, M = pa * ad + pc * ch;
          return { q: T`A theater sold ${N} tickets for $${M}. Adult tickets cost $${pa} and child tickets $${pc}. How many adult tickets were sold?`, answer: ad,
            x: T`With \(a + c = ${N}\) and \(${pa}a + ${pc}c = ${M}\): substitute \(c = ${N} - a\) to get \(${pa - pc}a = ${M - pc * N}\), so \(a = ${ad}\).`, v: `solve([Eq(x + y, ${N}), Eq(${pa}*x + ${pc}*y, ${M})], [x, y])[x]` }; } }
      ],
      'Percent and proportion': [
        { id: 'au-pct', make(R) { const p = R.pick([10, 20, 25, 30, 40, 50]), q = R.pick([10, 20, 25, 30, 40, 50]), net = ((1 + p / 100) * (1 - q / 100) - 1) * 100;
          return { q: T`A price rises ${p}%, then falls ${q}%. What is the net percent change? (Negative means a decrease.)`, answer: net, tol: 0.01,
            x: T`Multiply the factors: \(${1 + p / 100}\times${1 - q / 100} = ${R.fmt(1 + net / 100, 4)}\), a change of ${R.fmt(net, 2)}%.`, v: `(Rational(100 + ${p}, 100)*Rational(100 - ${q}, 100) - 1)*100` }; } },
        { id: 'au-prop', make(R) { const a = R.int(1, 12), b = R.int(2, 9), k = R.int(2, 6), c = b * k;
          return { q: T`Solve \(\dfrac{${a}}{${b}} = \dfrac{x}{${c}}\).`, answer: a * k, x: T`Cross-multiply: \(${b}x = ${a * c}\), so \(x = ${a * k}\).`, v: `solve(Eq(Rational(${a}, ${b}), x/${c}), x)[0]` }; } }
      ]
    }
  });

  // ======================= TRIGONOMETRY =======================
  const SPEC = [[30, '\\tfrac12', '\\tfrac{\\sqrt3}{2}', '\\tfrac{\\sqrt3}{3}'], [45, '\\tfrac{\\sqrt2}{2}', '\\tfrac{\\sqrt2}{2}', '1'], [60, '\\tfrac{\\sqrt3}{2}', '\\tfrac12', '\\sqrt3']];
  registerUnitGens('trig', {
    tag: { 'tg-convert': 'Angles and radians', 'tg-arc': 'Angles and radians', 'tg-right': 'Right-triangle trigonometry', 'tg-unit': 'The unit circle', 'tg-graph': 'Graphs of sine and cosine', 'tg-inv': 'Inverse trigonometric functions', 'tg-lawcos': 'Law of sines and cosines' },
    units: {
      'Angles and radians': [
        { id: 'tu-degrad', make(R) { const d = R.pick([15, 30, 45, 60, 75, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360, 405, 540]);
          return { q: T`Write \(${d}^\circ\) as \(k\pi\) radians. Find \(k\).`, answer: d / 180, hint: FR, x: T`\(${d}^\circ\cdot\frac{\pi}{180^\circ} = ${R.frac(d, 180)}\pi\).`, v: `Rational(${d}, 180)` }; } }
      ],
      'Right-triangle trigonometry': [
        { id: 'tu-special', make(R) { const kind = R.int(0, 3), s = R.int(2, 12);
          const Q = [[T`A 30-60-90 triangle has short leg ${s}. Find the hypotenuse.`, 2 * s, T`The hypotenuse is twice the short leg.`, `${s}/sin(pi/6)`],
            [T`A 30-60-90 triangle has short leg ${s}. Find the long leg, to two decimals.`, s * Math.sqrt(3), T`Long leg = short leg \(\times\sqrt3\) = \(${s}\sqrt3\).`, `${s}*tan(pi/3)`],
            [T`A 45-45-90 triangle has legs of length ${s}. Find the hypotenuse, to two decimals.`, s * Math.SQRT2, T`Hypotenuse = leg \(\times\sqrt2\) = \(${s}\sqrt2\).`, `${s}/cos(pi/4)`],
            [T`A 30-60-90 triangle has hypotenuse ${2 * s}. Find the short leg.`, s, T`The short leg is half the hypotenuse.`, `${2 * s}*sin(pi/6)`]][kind];
          return { q: Q[0], answer: Q[1], tol: 0.01, hint: 'Round to two decimals if needed.', x: Q[2], v: Q[3] }; } },
        { id: 'tu-ratio', make(R) { const [p, q, h] = R.pick(TRIPLES), k = R.int(1, 3), swap = R.int(0, 1) === 1, opp = (swap ? q : p) * k, adj = (swap ? p : q) * k, hyp = h * k, fn = R.pick(['sin', 'cos', 'tan']);
          const val = { sin: opp / hyp, cos: adj / hyp, tan: opp / adj }[fn], num = { sin: opp, cos: adj, tan: opp }[fn], den = { sin: hyp, cos: hyp, tan: adj }[fn];
          return { q: T`A right triangle has legs ${opp} (opposite \(\theta\)) and ${adj} (adjacent to \(\theta\)). Find \(${'\\' + fn}\theta\).`, answer: val, tol: 0.001, hint: FR,
            x: T`The hypotenuse is \(\sqrt{${opp}^2 + ${adj}^2} = ${hyp}\). \(${'\\' + fn}\theta = \frac{${num}}{${den}} = ${R.frac(num, den)}\).`, v: `${fn}(atan(Rational(${opp}, ${adj})))` }; } },
        { id: 'tu-spval', make(R) { const [d, s, c, t] = R.pick(SPEC), fn = R.pick(['sin', 'cos', 'tan']), val = Math[fn](d * Math.PI / 180), ex = { sin: s, cos: c, tan: t }[fn];
          return { q: T`Evaluate \(${'\\' + fn} ${d}^\circ\) to three decimals.`, answer: val, tol: 0.0015, hint: 'Round to three decimals.',
            x: T`From the ${d === 45 ? '45-45-90' : '30-60-90'} triangle: \(${'\\' + fn} ${d}^\circ = ${ex} \approx ${R.fmt(val, 3)}\).`, v: `${fn}(pi*${d}/180)` }; } }
      ],
      'The unit circle': [
        { id: 'tu-ref', make(R) { let a; do { a = R.int(1, 71) * 5; } while (a % 90 === 0); const m = a % 180, ref = Math.min(m, 180 - m);
          return { q: T`Find the reference angle of \(${a}^\circ\), in degrees.`, answer: ref,
            x: T`\(${a}^\circ\) is in quadrant ${['I', 'II', 'III', 'IV'][Math.floor(a % 360 / 90)]}. Its acute angle to the \(x\)-axis is \(${ref}^\circ\).`, v: `acos(Abs(cos(pi*${a}/180)))*180/pi` }; } }
      ],
      'Graphs of sine and cosine': [
        { id: 'tu-shift', make(R) { const B = R.int(1, 4), C = R.nz(-6, 6);
          return { q: T`Find the phase shift of \(y = \sin(${B === 1 ? '' : B}x ${C > 0 ? '-' : '+'} ${Math.abs(C)})\). Positive means right.`, answer: C / B, tol: 0.01, hint: FR,
            x: T`Factor out \(B\): \(\sin\big(${B === 1 ? '' : B}(x ${C > 0 ? '-' : '+'} ${R.frac(Math.abs(C), B)})\big)\). The shift is \(${R.frac(C, B)}\).`, v: `solve(${B}*x - (${C}), x)[0]` }; } }
      ],
      'Other trigonometric graphs': [
        { id: 'tu-asym', make(R) { const [B, Bt, Bp] = R.pick([[1, '', '1'], [2, '2', '2'], [3, '3', '3'], [4, '4', '4'], [0.5, '\\tfrac12', 'Rational(1, 2)']]);
          return { q: T`Find the first positive vertical asymptote of \(y = \tan(${Bt}x)\), to two decimals.`, answer: Math.PI / (2 * B), tol: 0.01, hint: 'Round to two decimals.',
            x: T`Tangent blows up where \(\cos(${Bt}x) = 0\): first at \(${Bt}x = \frac\pi2\), so \(x = \frac{\pi}{2\cdot${R.fmt(B)}} \approx ${R.fmt(Math.PI / (2 * B), 3)}\).`, v: `min([s for s in solve(cos(${Bp}*x), x) if s > 0])` }; } },
        { id: 'tu-period', make(R) { const fn = R.pick(['tan', 'cot', 'sec', 'csc']), B = R.int(1, 4), per = (fn === 'tan' || fn === 'cot' ? Math.PI : 2 * Math.PI) / B;
          return { q: T`Find the period of \(y = ${'\\' + fn}(${B === 1 ? '' : B}x)\), to two decimals.`, answer: per, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(${'\\' + fn}\) has period \(${fn === 'tan' || fn === 'cot' ? '\\pi' : '2\\pi'}\); dividing by ${B} gives \(\approx ${R.fmt(per, 3)}\).`, v: `periodicity(${fn}(${B}*x), x)` }; } }
      ],
      'Fundamental identities': [
        { id: 'tu-pyth', make(R) { const [p, q, h] = R.pick(TRIPLES), Q = R.int(1, 4), ss = Q <= 2 ? 1 : -1, cs = Q === 1 || Q === 4 ? 1 : -1, ask = R.pick(['cos', 'tan']);
          const th = { 1: `asin(Rational(${p}, ${h}))`, 2: `pi - asin(Rational(${p}, ${h}))`, 3: `pi + asin(Rational(${p}, ${h}))`, 4: `2*pi - asin(Rational(${p}, ${h}))` }[Q];
          const val = ask === 'cos' ? cs * q / h : (ss * p) / (cs * q);
          return { q: T`\(\sin\theta = ${R.frac(ss * p, h)}\) and \(\theta\) is in quadrant ${['I', 'II', 'III', 'IV'][Q - 1]}. Find \(${'\\' + ask}\theta\).`, answer: val, tol: 0.001, hint: FR,
            x: T`\(\cos^2\theta = 1 - \sin^2\theta = ${R.frac(q * q, h * h)}\), so \(|\cos\theta| = ${R.frac(q, h)}\); in quadrant ${['I', 'II', 'III', 'IV'][Q - 1]} cosine is ${cs > 0 ? 'positive' : 'negative'}.${ask === 'tan' ? T` Then \(\tan\theta = \frac{\sin\theta}{\cos\theta} = ${R.frac(ss * p, cs * q)}\).` : ''}`, v: `${ask}(${th})` }; } }
      ],
      'Sum, difference, and double angle': [
        { id: 'tu-double', make(R) { const [p, q, h] = R.pick(TRIPLES), ask = R.pick(['sin', 'cos']), val = ask === 'sin' ? 2 * p * q / (h * h) : (q * q - p * p) / (h * h);
          return { q: T`\(\theta\) is acute with \(\sin\theta = ${R.frac(p, h)}\). Find \(${'\\' + ask} 2\theta\).`, answer: val, tol: 0.001, hint: FR,
            x: T`\(\cos\theta = ${R.frac(q, h)}\). ${ask === 'sin' ? T`\(\sin2\theta = 2\sin\theta\cos\theta = ${R.frac(2 * p * q, h * h)}\).` : T`\(\cos2\theta = \cos^2\theta - \sin^2\theta = ${R.frac(q * q - p * p, h * h)}\).`}`, v: `${ask}(2*asin(Rational(${p}, ${h})))` }; } },
        { id: 'tu-sum', make(R) { const A = R.pick([30, 45, 60, 90, 120, 135]), B = R.pick([15, 30, 45, 60]), ask = R.pick(['sin', 'cos']), plus = R.int(0, 1) === 1, ang = plus ? A + B : A - B;
          return { q: T`Evaluate \(${'\\' + ask}(${A}^\circ ${plus ? '+' : '-'} ${B}^\circ)\) to three decimals.`, answer: Math[ask](ang * Math.PI / 180), tol: 0.0015, hint: 'Round to three decimals.',
            x: T`Either use the ${plus ? 'sum' : 'difference'} formula with the known values, or note the angle is \(${ang}^\circ\): \(\approx ${R.fmt(Math[ask](ang * Math.PI / 180), 3)}\).`, v: `${ask}(pi*${A}/180 ${plus ? '+' : '-'} pi*${B}/180)` }; } }
      ],
      'Proving identities': [
        { id: 'tu-ideval', make(R) { const L = [['\\dfrac{1 - \\cos^2\\theta}{\\sin\\theta\\cos\\theta}', '\\tan\\theta', '(1 - cos(t)**2)/(sin(t)*cos(t))', Math.tan],
          ['\\sec\\theta - \\cos\\theta', '\\sin\\theta\\tan\\theta', '1/cos(t) - cos(t)', d => Math.sin(d) * Math.tan(d)], ['\\dfrac{\\sin 2\\theta}{2\\cos\\theta}', '\\sin\\theta', 'sin(2*t)/(2*cos(t))', Math.sin],
          ['(\\sin\\theta + \\cos\\theta)^2 - 1', '\\sin 2\\theta', '(sin(t) + cos(t))**2 - 1', d => Math.sin(2 * d)], ['\\dfrac{\\tan\\theta}{\\sec\\theta}', '\\sin\\theta', 'tan(t)*cos(t)', Math.sin],
          ['\\cos^4\\theta - \\sin^4\\theta', '\\cos 2\\theta', 'cos(t)**4 - sin(t)**4', d => Math.cos(2 * d)], ['\\dfrac{1}{1 + \\tan^2\\theta}', '\\cos^2\\theta', '1/(1 + tan(t)**2)', d => Math.cos(d) ** 2]];
          const [E, S, py, f] = R.pick(L), d = R.pick([20, 35, 50, 70, 110, 160, 200, 290]), val = f(d * Math.PI / 180);
          return { q: T`Simplify \(${E}\), then evaluate it at \(\theta = ${d}^\circ\) to three decimals.`, answer: val, tol: 0.0015, hint: 'Round to three decimals.',
            x: T`It simplifies to \(${S}\), which is \(\approx ${R.fmt(val, 3)}\) at \(${d}^\circ\).`, v: `(lambda t: ${py})(pi*${d}/180)` }; } }
      ],
      'Inverse trigonometric functions': [
        { id: 'tu-invcomp', make(R) { const [p, q, h] = R.pick(TRIPLES), k = R.int(0, 2);
          const Q = [[T`\(\sin\left(\arccos\tfrac{${q}}{${h}}\right)\)`, p / h, `sin(acos(Rational(${q}, ${h})))`, T`Draw a triangle with adjacent ${q} and hypotenuse ${h}; the opposite side is ${p}. So the answer is \(${R.frac(p, h)}\).`],
            [T`\(\tan\left(\arcsin\tfrac{${p}}{${h}}\right)\)`, p / q, `tan(asin(Rational(${p}, ${h})))`, T`Opposite ${p}, hypotenuse ${h}, so adjacent ${q}: \(${R.frac(p, q)}\).`],
            [T`\(\cos\left(\arctan\tfrac{${p}}{${q}}\right)\)`, q / h, `cos(atan(Rational(${p}, ${q})))`, T`Opposite ${p}, adjacent ${q}, hypotenuse ${h}: \(${R.frac(q, h)}\).`]][k];
          return { q: T`Evaluate ${Q[0]}.`, answer: Q[1], tol: 0.001, hint: FR, x: Q[3], v: Q[2] }; } }
      ],
      'Trigonometric equations': [
        { id: 'tu-eqcount', make(R) { const fn = R.pick(['sin', 'cos']), k = R.int(1, 4), [tex, py, val] = R.pick([['0', '0', 0], ['\\tfrac12', 'Rational(1, 2)', 0.5], ['-\\tfrac12', '-Rational(1, 2)', -0.5], ['1', '1', 1], ['-1', '-1', -1], ['\\tfrac{\\sqrt2}{2}', 'sqrt(2)/2', 0.7], ['2', '2', 2]]);
          const n = Math.abs(val) > 1 ? 0 : Math.abs(val) === 1 ? k : 2 * k;
          return { q: T`How many solutions does \(${'\\' + fn}(${k === 1 ? '' : k}x) = ${tex}\) have on \([0, 2\pi)\)?`, answer: n,
            x: T`${Math.abs(val) > 1 ? T`\(${'\\' + fn}\) never exceeds 1 in size.` : T`On \([0, 2\pi)\) the argument \(${k === 1 ? '' : k}x\) covers ${k} full cycle${k > 1 ? 's' : ''}. Each cycle gives ${Math.abs(val) === 1 ? 'one solution (the peak or trough)' : 'two solutions'}, so ${n}.`}`,
            v: `len(solveset(${fn}(${k}*x) - (${py}), x, Interval.Ropen(0, 2*pi)))` }; } }
      ],
      'Law of sines and cosines': [
        { id: 'tu-lawsin', make(R) { const A = R.int(5, 16) * 5, B = R.int(5, Math.min(26, 34 - A / 5)) * 5, a = R.int(4, 15), b = a * Math.sin(B * Math.PI / 180) / Math.sin(A * Math.PI / 180);
          return { q: T`A triangle has \(A = ${A}^\circ\), \(B = ${B}^\circ\), and \(a = ${a}\). Find \(b\), to two decimals.`, answer: b, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(\frac{b}{\sin B} = \frac{a}{\sin A}\), so \(b = \frac{${a}\sin${B}^\circ}{\sin${A}^\circ} \approx ${R.fmt(b, 2)}\).`, v: `${a}*sin(pi*${B}/180)/sin(pi*${A}/180)` }; } },
        { id: 'tu-area', make(R) { const a = R.int(3, 14), b = R.int(3, 14), C = R.int(4, 30) * 5, A = 0.5 * a * b * Math.sin(C * Math.PI / 180);
          return { q: T`Find the area of a triangle with sides ${a} and ${b} and included angle \(${C}^\circ\), to two decimals.`, answer: A, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(\tfrac12ab\sin C = \tfrac12(${a})(${b})\sin${C}^\circ \approx ${R.fmt(A, 2)}\).`, v: `Rational(1, 2)*${a}*${b}*sin(pi*${C}/180)` }; } }
      ]
    }
  });

  // ======================= PRECALCULUS =======================
  registerUnitGens('precalc', {
    tag: { 'pg-compose': 'Composition and inverses', 'pg-inverse': 'Composition and inverses', 'pg-asym': 'Rational functions', 'pg-exp': 'Exponential functions', 'pg-log': 'Logarithms', 'pg-seq': 'Sequences and series', 'pg-circle': 'Conic sections', 'pg-complex': 'Complex numbers' },
    units: {
      'Functions and domain': [
        { id: 'pu-eval', make(R) { const a = R.nz(-3, 3), b = R.int(-6, 6), c = R.int(-9, 9), k = R.int(-5, 5), v = a * k * k + b * k + c;
          return { q: T`\(f(x) = ${R.co(a)}x^2 ${R.t(b, 'x')} ${R.sgn(c, true)}\). Find \(f(${k})\).`, answer: v, x: T`\(${a}(${k})^2 + (${b})(${k}) + (${c}) = ${v}\). Square first: a negative input squared is positive.`, v: `(${a}*x**2 + (${b})*x + (${c})).subs(x, ${k})` }; } },
        { id: 'pu-domain', make(R) { const b = R.int(1, 5), a = R.int(-12, 12), up = R.int(0, 1) === 1;
          return { q: up ? T`Find the smallest \(x\) in the domain of \(f(x) = \sqrt{${R.co(b)}x ${R.sgn(-a, true)}}\).` : T`Find the largest \(x\) in the domain of \(f(x) = \sqrt{${a} - ${R.co(b)}x}\).`, answer: a / b, hint: FR,
            x: T`The inside must be at least 0: ${up ? T`\(${R.co(b)}x \ge ${a}\)` : T`\(${R.co(b)}x \le ${a}\)`}, so the boundary is \(x = ${R.frac(a, b)}\).`, v: `solve(${a} - ${b}*x, x)[0]` }; } }
      ],
      'Transformations': [
        { id: 'pu-transf', make(R) { const [ft, fp, ms] = R.pick([['x^2', 'm**2', [-3, -2, -1, 0, 1, 2, 3]], ['|x|', 'abs(m)', [-4, -2, -1, 0, 1, 3]], ['\\sqrt x', 'sqrt(m)', [0, 1, 4, 9]]]);
          const a = R.nz(-3, 3), h = R.int(-4, 4), k = R.int(-5, 5), m = R.pick(ms), fv = { 'x^2': m * m, '|x|': Math.abs(m), '\\sqrt x': Math.sqrt(m) }[ft], val = a * fv + k;
          return { q: T`\(f(x) = ${ft}\) and \(g(x) = ${R.co(a)}f(${lin(h)}) ${R.sgn(k, true)}\). Find \(g(${h + m})\).`, answer: val,
            x: T`At \(x = ${h + m}\), the inside is \(${h + m} - (${h}) = ${m}\), and \(f(${m}) = ${fv}\). Stretch by ${a}, then shift by ${k}: \(${a}\cdot${fv} ${R.sgn(k, true)} = ${val}\).`, v: `(lambda m: ${a}*${fp} + (${k}))(${m})` }; } }
      ],
      'Polynomial functions': [
        { id: 'pu-cross', make(R) { const rs = R.shuffle([-4, -3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 3), ms = rs.map(() => R.int(1, 3)), deg = ms.reduce((a, b) => a + b, 0), cross = ms.filter(m => m % 2).length, askDeg = R.int(0, 2) === 0;
          const tex = rs.map((r, i) => `${R.fac(r).replace(/^x$/, 'x')}${ms[i] > 1 ? `^{${ms[i]}}` : ''}`).join(''), py = rs.map((r, i) => `(x - (${r}))**${ms[i]}`).join('*');
          return { q: askDeg ? T`What is the degree of \(${tex}\)?` : T`At how many of its zeros does the graph of \(${tex}\) cross the \(x\)-axis?`, answer: askDeg ? deg : cross,
            x: askDeg ? T`Add the exponents: ${ms.join(' + ')} = ${deg}.` : T`A zero crosses when its multiplicity is odd. Multiplicities: ${ms.join(', ')}. Odd ones: ${cross}.`,
            v: askDeg ? `degree(expand(${py}), x)` : `sum(1 for r, mm in roots(expand(${py}), x).items() if mm % 2 == 1)` }; } }
      ],
      'Rational functions': [
        { id: 'pu-hole', make(R) { const [a, b, c] = R.shuffle([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]).slice(0, 3), val = (a - b) / (a - c);
          return { q: T`\(f(x) = \dfrac{${R.fac(a)}${R.fac(b)}}{${R.fac(a)}${R.fac(c)}}\) has a hole at \(x = ${a}\). Find its \(y\)-coordinate.`, answer: val, hint: FR,
            x: T`Cancel \(${R.fac(a)}\) to get \(\frac{${lin(b)}}{${lin(c)}}\), then substitute \(x = ${a}\): \(\frac{${a - b}}{${a - c}} = ${R.frac(a - b, a - c)}\).`, v: `limit((x - (${a}))*(x - (${b}))/((x - (${a}))*(x - (${c}))), x, ${a})` }; } }
      ],
      'Exponential functions': [
        { id: 'pu-half', make(R) { const A0 = R.pick([40, 80, 100, 160, 200, 500]), h = R.pick([2, 3, 5, 8, 10]), t = R.int(1, 30), A = A0 * 0.5 ** (t / h);
          return { q: T`A ${A0} g sample has a half-life of ${h} years. How much remains after ${t} years, to two decimals?`, answer: A, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(A = ${A0}\left(\tfrac12\right)^{${t}/${h}} \approx ${R.fmt(A, 2)}\) g.`, v: `${A0}*Rational(1, 2)**Rational(${t}, ${h})` }; } }
      ],
      'Logarithms': [
        { id: 'pu-logsum', make(R) { const b = R.pick([2, 3, 5, 10]), m = R.int(0, b === 2 ? 5 : 3), n = R.int(0, b === 2 ? 5 : 3), M = b ** m, N = b ** n, sub = R.int(0, 1) === 1;
          return { q: T`Evaluate \(\log_{${b}}${M} ${sub ? '-' : '+'} \log_{${b}}${N}\).`, answer: sub ? m - n : m + n,
            x: T`\(\log_{${b}}${M} = ${m}\) and \(\log_{${b}}${N} = ${n}\). (Equivalently, ${sub ? 'subtracting logs divides' : 'adding logs multiplies'}: \(\log_{${b}}${sub ? `\\frac{${M}}{${N}}` : M * N}\).)`, v: `log(${M}, ${b}) ${sub ? '-' : '+'} log(${N}, ${b})` }; } }
      ],
      'Exponential and logarithmic equations': [
        { id: 'pu-logeq', make(R) { const b = R.pick([2, 3, 5]), k = R.int(1, b === 2 ? 5 : 3), h = R.int(-5, 5);
          return { q: T`Solve \(\log_{${b}}(${lin(h)}) = ${k}\).`, answer: b ** k + h, x: T`Rewrite as an exponent: \(${lin(h)} = ${b}^{${k}} = ${b ** k}\), so \(x = ${b ** k + h}\).`, v: `solve(log(x - (${h}), ${b}) - ${k}, x)[0]` }; } },
        { id: 'pu-expeq', make(R) { const b = R.pick([2, 3, 5]), a = R.int(1, 3), c = R.int(-4, 4), k = R.int(0, b === 2 ? 7 : 4);
          return { q: T`Solve \(${b}^{${a === 1 ? '' : a}x ${R.sgn(c, true)}} = ${b ** k}\).`, answer: (k - c) / a, hint: FR,
            x: T`\(${b ** k} = ${b}^{${k}}\), so the exponents match: \(${R.co(a)}x ${R.sgn(c, true)} = ${k}\), giving \(x = ${R.frac(k - c, a)}\).`, v: `[s for s in solve(${b}**(${a}*x + (${c})) - ${b ** k}, x) if s.is_real][0]` }; } }
      ],
      'Sequences and series': [
        { id: 'pu-infgeo', make(R) { const a = R.nz(-9, 9), [rn, rd] = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [-1, 2], [-1, 3], [2, 5]]), S = a / (1 - rn / rd);
          return { q: T`Find \(${a} ${rn < 0 ? '-' : '+'} ${a}\left(${R.frac(Math.abs(rn), rd)}\right) + ${a}\left(${R.frac(rn, rd)}\right)^2 + \cdots\)`, answer: S, tol: 0.001, hint: FR,
            x: T`Geometric with \(r = ${R.frac(rn, rd)}\), \(|r| < 1\): \(\frac{${a}}{1 - (${R.frac(rn, rd)})} = ${R.frac(a * rd, rd - rn)}\).`, v: `summation(${a}*Rational(${rn}, ${rd})**n, (n, 0, oo))` }; } }
      ],
      'Conic sections': [
        { id: 'pu-ellipse', make(R) { const [A, B, C] = R.pick([[5, 4, 3], [5, 3, 4], [13, 12, 5], [13, 5, 12], [10, 8, 6], [17, 15, 8], [17, 8, 15]]), ask = R.int(0, 1) === 0;
          return { q: ask ? T`How far is each focus of \(\dfrac{x^2}{${A * A}} + \dfrac{y^2}{${B * B}} = 1\) from the center?` : T`How long is the major axis of \(\dfrac{x^2}{${A * A}} + \dfrac{y^2}{${B * B}} = 1\)?`, answer: ask ? C : 2 * A,
            x: ask ? T`\(c = \sqrt{a^2 - b^2} = \sqrt{${A * A} - ${B * B}} = ${C}\).` : T`\(a = ${A}\), so the major axis is \(2a = ${2 * A}\).`, v: ask ? `sqrt(${A * A} - ${B * B})` : `2*sqrt(${A * A})` }; } }
      ],
      'Complex numbers': [
        { id: 'pu-cdiv', make(R) { const a = R.int(-6, 6), b = R.int(-6, 6), c = R.nz(-4, 4), d = R.nz(-4, 4), D = c * c + d * d, re = (a * c + b * d) / D, im = (b * c - a * d) / D, askRe = R.int(0, 1) === 1;
          const z = (u, w) => `${u} ${w < 0 ? '-' : '+'} ${Math.abs(w)}i`;
          return { q: T`Find the ${askRe ? 'real' : 'imaginary'} part of \(\dfrac{${z(a, b)}}{${z(c, d)}}\).`, answer: askRe ? re : im, tol: 0.001, hint: FR,
            x: T`Multiply top and bottom by the conjugate \(${z(c, -d)}\). The denominator becomes \(${D}\); the top becomes \(${a * c + b * d} ${b * c - a * d < 0 ? '-' : '+'} ${Math.abs(b * c - a * d)}i\).`, v: `${askRe ? 're' : 'im'}((${a} + ${b}*I)/(${c} + ${d}*I))` }; } },
        { id: 'pu-ipow', make(R) { const n = R.int(2, 60), askRe = R.int(0, 1) === 1, cyc = [[1, 0], [0, 1], [-1, 0], [0, -1]][n % 4];
          return { q: T`Find the ${askRe ? 'real' : 'imaginary'} part of \(i^{${n}}\).`, answer: askRe ? cyc[0] : cyc[1],
            x: T`Powers of \(i\) repeat every 4: \(${n} = 4\cdot${Math.floor(n / 4)} + ${n % 4}\), so \(i^{${n}} = i^{${n % 4}} = ${['1', 'i', '-1', '-i'][n % 4]}\).`, v: `${askRe ? 're' : 'im'}(I**${n})` }; } }
      ],
      'Polar coordinates': [
        { id: 'pu-polar', make(R) { if (R.int(0, 1)) { const [p, q, h] = R.pick(TRIPLES), k = R.int(1, 3), sx = R.pick([1, -1]), sy = R.pick([1, -1]);
            return { q: T`Find \(r\) for the point \((${sx * p * k}, ${sy * q * k})\).`, answer: h * k, x: T`\(r = \sqrt{x^2 + y^2} = ${h * k}\).`, v: `sqrt(${p * k}**2 + ${q * k}**2)` }; }
          const r = R.int(1, 9), d = R.pick([30, 45, 60, 120, 135, 150, 210, 240, 300, 330]), fn = R.pick(['cos', 'sin']), val = r * Math[fn](d * Math.PI / 180);
          return { q: T`Find ${fn === 'cos' ? '\\(x\\)' : '\\(y\\)'} for \(r = ${r}\), \(\theta = ${d}^\circ\), to two decimals.`, answer: val, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(${fn === 'cos' ? 'x = r\\cos\\theta' : 'y = r\\sin\\theta'} = ${r}${'\\' + fn}${d}^\circ \approx ${R.fmt(val, 2)}\).`, v: `${r}*${fn}(pi*${d}/180)` }; } }
      ]
    }
  });
})();
