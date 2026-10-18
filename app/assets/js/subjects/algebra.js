registerSubject({
  id: 'algebra', name: 'Algebra', color: '#B04A5A',
  blurb: 'Equations, inequalities, exponents, factoring, quadratics, lines',
  questions: [
    { id: 'a1', skill: 'Exponents', q: T`Simplify \((x^3)^2 \cdot x^{-4}\).`,
      c: [T`\(x^2\)`, T`\(x^5\)`, T`\(x^{10}\)`, T`\(x^{-2}\)`],
      x: T`\((x^3)^2 = x^6\), and \(x^6 \cdot x^{-4} = x^{6-4} = x^2\).` },
    { id: 'a2', skill: 'Exponents', q: T`Evaluate \(2^{-3}\).`,
      c: [T`\(\tfrac18\)`, T`\(-8\)`, T`\(-6\)`, T`\(\tfrac16\)`],
      x: T`A negative exponent means a reciprocal: \(2^{-3} = \frac{1}{2^3} = \frac18\). It never makes the value negative.` },
    { id: 'a3', skill: 'Exponents', q: T`Simplify \((2x^2y)^3\).`,
      c: [T`\(8x^6y^3\)`, T`\(6x^6y^3\)`, T`\(8x^5y^3\)`, T`\(2x^6y^3\)`],
      x: T`Every factor is cubed: \(2^3 (x^2)^3 y^3 = 8x^6y^3\).` },
    { id: 'a4', skill: 'Radicals', q: T`Simplify \(\sqrt{50}\).`,
      c: [T`\(5\sqrt2\)`, T`\(25\sqrt2\)`, T`\(2\sqrt5\)`, T`\(10\sqrt5\)`],
      x: T`\(\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt2\).` },
    { id: 'a5', skill: 'Radicals', q: T`Rationalize \(\dfrac{1}{\sqrt3 + 1}\).`,
      c: [T`\(\dfrac{\sqrt3 - 1}{2}\)`, T`\(\dfrac{\sqrt3 + 1}{2}\)`, T`\(\sqrt3 - 1\)`, T`\(\dfrac{\sqrt3 - 1}{4}\)`],
      x: T`Multiply by the conjugate: \(\frac{\sqrt3 - 1}{(\sqrt3+1)(\sqrt3-1)} = \frac{\sqrt3 - 1}{3 - 1}\).` },
    { id: 'a6', skill: 'Radicals', q: T`For \(x \ge 0\), \(x^{3/2}\) equals:`,
      c: [T`\((\sqrt x)^3\)`, T`\(\sqrt[3]{x^2}\)`, T`\(\tfrac32 x\)`, T`\(x^3 \cdot \sqrt2\)`],
      x: T`\(x^{m/n} = (\sqrt[n]{x})^m\). The denominator is the root, the numerator the power. \(\sqrt[3]{x^2}\) is \(x^{2/3}\).` },
    { id: 'a7', skill: 'Radicals', q: T`Which is true for all positive \(a\) and \(b\)?`,
      c: [T`\(\sqrt{ab} = \sqrt a\,\sqrt b\)`, T`\(\sqrt{a+b} = \sqrt a + \sqrt b\)`, T`\((a+b)^2 = a^2 + b^2\)`, T`\(\frac{1}{a+b} = \frac1a + \frac1b\)`],
      x: T`Roots and powers distribute over products, never over sums. Try \(a = b = 1\) on the others.` },
    { id: 'a8', skill: 'Factoring', q: T`Factor \(x^2 - 9\).`,
      c: [T`\((x-3)(x+3)\)`, T`\((x-3)^2\)`, T`\((x-9)(x+1)\)`, 'It does not factor over the integers'],
      x: T`Difference of squares: \(a^2 - b^2 = (a-b)(a+b)\).` },
    { id: 'a9', skill: 'Factoring', q: T`Factor \(x^2 + 5x + 6\).`,
      c: [T`\((x+2)(x+3)\)`, T`\((x+1)(x+6)\)`, T`\((x-2)(x-3)\)`, T`\((x+5)(x+1)\)`],
      x: T`Find two numbers with product 6 and sum 5: 2 and 3.` },
    { id: 'a10', skill: 'Factoring', q: T`Factor \(2x^2 + 7x + 3\).`,
      c: [T`\((2x+1)(x+3)\)`, T`\((2x+3)(x+1)\)`, T`\((2x-1)(x-3)\)`, T`\((x+3)(x+1)\)`],
      x: T`Expand to check: \((2x+1)(x+3) = 2x^2 + 6x + x + 3\).` },
    { id: 'a11', skill: 'Factoring', q: T`Factor \(x^3 - 8\).`,
      c: [T`\((x-2)(x^2+2x+4)\)`, T`\((x-2)^3\)`, T`\((x-2)(x^2-2x+4)\)`, T`\((x+2)(x^2-2x+4)\)`],
      x: T`Difference of cubes: \(a^3 - b^3 = (a-b)(a^2+ab+b^2)\) with \(b = 2\).` },
    { id: 'a12', skill: 'Polynomials', q: T`Expand \((x+3)^2\).`,
      c: [T`\(x^2+6x+9\)`, T`\(x^2+9\)`, T`\(x^2+3x+9\)`, T`\(x^2+6x+6\)`],
      x: T`\((a+b)^2 = a^2 + 2ab + b^2\). The middle term \(2ab = 6x\) is the one people drop.` },
    { id: 'a13', skill: 'Polynomials', q: T`What is the remainder when \(x^3 + 2x - 1\) is divided by \(x - 1\)?`,
      c: ['2', '0', '-1', '4'],
      x: T`Remainder theorem: the remainder on division by \(x - a\) is \(f(a)\). \(f(1) = 1 + 2 - 1 = 2\).` },
    { id: 'a14', skill: 'Polynomials', q: T`What is the degree of \((x^2+1)(x^3-x)\)?`,
      c: ['5', '6', '3', '2'],
      x: T`Degrees add when polynomials multiply: \(2 + 3 = 5\).` },
    { id: 'a15', skill: 'Quadratics', q: T`How many real solutions does \(x^2 - 4x + 5 = 0\) have?`,
      c: ['0', '1', '2', 'Infinitely many'],
      x: T`Discriminant \(b^2 - 4ac = 16 - 20 = -4 < 0\), so there are no real solutions (two complex ones).` },
    { id: 'a16', skill: 'Quadratics', q: T`What is the vertex of \(y = (x-2)^2 + 3\)?`,
      c: [T`\((2, 3)\)`, T`\((-2, 3)\)`, T`\((2, -3)\)`, T`\((3, 2)\)`],
      x: T`Vertex form \(y = a(x-h)^2 + k\) has vertex \((h, k)\). Note the sign inside: \(x - 2\) means \(h = 2\).` },
    { id: 'a17', skill: 'Quadratics', q: T`What is the sum of the roots of \(2x^2 - 6x + 1 = 0\)?`,
      c: ['3', '-3', '1/2', '6'],
      x: T`For \(ax^2 + bx + c\), the roots sum to \(-b/a = 6/2 = 3\) and multiply to \(c/a\).` },
    { id: 'a18', skill: 'Inequalities', q: T`Solve \(-2x + 3 > 7\).`,
      c: [T`\(x < -2\)`, T`\(x > -2\)`, T`\(x < 2\)`, T`\(x > -5\)`],
      x: T`\(-2x > 4\). Dividing by a negative flips the inequality: \(x < -2\).` },
    { id: 'a19', skill: 'Inequalities', q: T`Solve \(x^2 - x - 6 < 0\).`,
      c: [T`\(-2 < x < 3\)`, T`\(x < -2\) or \(x > 3\)`, T`\(-3 < x < 2\)`, T`\(x < 3\)`],
      x: T`\((x-3)(x+2) < 0\). An upward parabola is negative between its roots, \(-2\) and \(3\).` },
    { id: 'a20', skill: 'Absolute value', q: T`Solve \(|x - 3| < 2\).`,
      c: [T`\(1 < x < 5\)`, T`\(x < 5\)`, T`\(-1 < x < 5\)`, T`\(x < 1\) or \(x > 5\)`],
      x: T`\(|A| < c\) means \(-c < A < c\): \(-2 < x - 3 < 2\), so \(1 < x < 5\). The distance from \(x\) to 3 is less than 2.` },
    { id: 'a21', skill: 'Absolute value', q: T`Solve \(|2x + 1| = 7\).`,
      c: [T`\(x = 3\) or \(x = -4\)`, T`\(x = 3\) only`, T`\(x = 3\) or \(x = -3\)`, T`\(x = -4\) only`],
      x: T`\(2x + 1 = 7\) gives 3; \(2x + 1 = -7\) gives \(-4\).` },
    { id: 'a22', skill: 'Rational expressions', q: T`Simplify \(\dfrac{x^2 - 1}{x - 1}\) for \(x \ne 1\).`,
      c: [T`\(x + 1\)`, T`\(x - 1\)`, T`\(x\)`, T`\(\dfrac{1}{x-1}\)`],
      x: T`Factor first: \(\frac{(x-1)(x+1)}{x-1} = x + 1\). Cancel factors, never terms.` },
    { id: 'a23', skill: 'Rational expressions', q: T`Combine \(\dfrac1x + \dfrac{1}{x+1}\).`,
      c: [T`\(\dfrac{2x+1}{x(x+1)}\)`, T`\(\dfrac{2}{2x+1}\)`, T`\(\dfrac{1}{x^2+x}\)`, T`\(\dfrac{2}{x(x+1)}\)`],
      x: T`Common denominator \(x(x+1)\): \(\frac{(x+1) + x}{x(x+1)}\).` },
    { id: 'a24', skill: 'Lines and slope', q: T`What is the slope of the line through \((1, 2)\) and \((3, 8)\)?`,
      c: ['3', '1/3', '6', '5'],
      x: T`\(m = \frac{8 - 2}{3 - 1} = 3\).` },
    { id: 'a25', skill: 'Lines and slope', q: T`A line is perpendicular to \(y = 2x + 1\). Its slope is:`,
      c: [T`\(-\tfrac12\)`, '2', '-2', T`\(\tfrac12\)`],
      x: T`Perpendicular slopes are negative reciprocals: their product is \(-1\).` },
    { id: 'a26', skill: 'Systems of equations', q: T`Solve \(x + y = 5\), \(x - y = 1\).`,
      c: [T`\((3, 2)\)`, T`\((2, 3)\)`, T`\((4, 1)\)`, 'No solution'],
      x: T`Add the equations: \(2x = 6\), so \(x = 3\) and \(y = 2\).` },
    { id: 'a27', skill: 'Systems of equations', q: T`How many solutions do \(x + 2y = 4\) and \(2x + 4y = 9\) have?`,
      c: ['None', 'Exactly one', 'Infinitely many', 'Two'],
      x: T`Doubling the first gives \(2x + 4y = 8 \ne 9\). Same slope, different intercepts: parallel lines.` },
    { id: 'a28', skill: 'Linear equations', q: T`Solve \(3(x - 2) = 2x + 5\).`,
      c: ['11', '1', '7', '-1'],
      x: T`\(3x - 6 = 2x + 5\), so \(x = 11\).` },
    { id: 'a29', skill: 'Linear equations', q: T`Solve \(\dfrac{x}{3} - 1 = \dfrac{x}{4}\).`,
      c: ['12', '4', '-12', '7'],
      x: T`Multiply by 12: \(4x - 12 = 3x\), so \(x = 12\).` }
  ],
  generators: [
    { id: 'ag-lin', skill: 'Linear equations', make(R) {
      const x = R.int(-9, 9); let a, c; do { a = R.nz(-6, 9); c = R.nz(-6, 9); } while (a === c);
      const b = R.int(-12, 12), d = a * x + b - c * x;
      return { q: T`Solve for \(x\): \(${R.co(a)}x ${R.sgn(b, true)} = ${R.co(c)}x ${R.sgn(d, true)}\)`, answer: x,
        x: T`Collect \(x\) terms on the left and constants on the right: \(${a - c}x = ${d - b}\), so \(x = ${x}\).` };
    } },
    { id: 'ag-quad', skill: 'Quadratics', make(R) {
      let r1, r2; do { r1 = R.int(-9, 9); r2 = R.int(-9, 9); } while (r1 === r2);
      const B = -(r1 + r2), C = r1 * r2, big = Math.max(r1, r2), small = Math.min(r1, r2);
      return { q: T`Find the larger solution of \(x^2 ${R.t(B, 'x')} ${R.sgn(C, true)} = 0\).`, answer: big,
        x: T`Find two numbers with product \(${C}\) and sum \(${-B}\): \(${small}\) and \(${big}\). So \(${R.fac(r1)}${R.fac(r2)} = 0\), and the larger root is \(${big}\).` };
    } },
    { id: 'ag-slope', skill: 'Lines and slope', make(R) {
      const x1 = R.int(-6, 6), y1 = R.int(-8, 8); let x2; do { x2 = R.int(-6, 6); } while (x2 === x1);
      const y2 = R.int(-8, 8), m = (y2 - y1) / (x2 - x1);
      return { q: T`Find the slope of the line through \((${x1}, ${y1})\) and \((${x2}, ${y2})\).`, answer: m, tol: 0.01, hint: 'Fractions or decimals are fine.',
        x: T`\(m = \frac{${y2} - (${y1})}{${x2} - (${x1})} = \frac{${y2 - y1}}{${x2 - x1}} = ${R.frac(y2 - y1, x2 - x1)}\).` };
    } },
    { id: 'ag-sys', skill: 'Systems of equations', make(R) {
      const x = R.int(-6, 6), y = R.int(-6, 6); let a, b, c, d;
      do { [a, b, c, d] = R.vec(4, -5, 6); } while (a * d - b * c === 0 || [a, b, c, d].includes(0));
      const e = a * x + b * y, f = c * x + d * y, askX = R.int(0, 1) === 0;
      return { q: T`Solve for \(${askX ? 'x' : 'y'}\): \[\begin{aligned}${R.co(a)}x ${R.t(b, 'y')} &= ${e}\\ ${R.co(c)}x ${R.t(d, 'y')} &= ${f}\end{aligned}\]`, answer: askX ? x : y,
        x: askX
          ? T`Eliminate \(y\): multiply the first equation by \(${d}\), the second by \(${b}\), and subtract: \(${a * d - b * c}x = ${e * d - b * f}\), so \(x = ${x}\). Then \(y = ${y}\).`
          : T`Eliminate \(x\): multiply the first equation by \(${c}\), the second by \(${a}\), and subtract: \(${b * c - a * d}y = ${e * c - a * f}\), so \(y = ${y}\). Then \(x = ${x}\).` };
    } },
    { id: 'ag-exp', skill: 'Exponents', make(R) {
      const m = R.nz(-5, 9), n = R.nz(-5, 9), k = R.nz(-5, 9);
      if (R.int(0, 1)) {
        return { q: T`Simplify \(\dfrac{x^{${m}}\cdot x^{${n}}}{x^{${k}}}\) to the form \(x^p\). What is \(p\)?`, answer: m + n - k,
          x: T`Multiplying adds exponents and dividing subtracts them: \(${m} + (${n}) - (${k}) = ${m + n - k}\).` };
      }
      return { q: T`Simplify \((x^{${m}})^{${n}}\cdot x^{${k}}\) to the form \(x^p\). What is \(p\)?`, answer: m * n + k,
        x: T`A power of a power multiplies exponents: \((${m})(${n}) = ${m * n}\). Then add \(${k}\): \(p = ${m * n + k}\).` };
    } },
    { id: 'ag-vertex', skill: 'Quadratics', make(R) {
      const a = R.nz(-3, 3), h = R.int(-5, 5), k = R.int(-9, 9), b = -2 * a * h, c = a * h * h + k, askY = R.int(0, 1) === 1;
      const kind = a > 0 ? 'minimum' : 'maximum';
      return { q: askY ? T`Find the ${kind} value of \(y = ${R.co(a)}x^2 ${R.t(b, 'x')} ${R.sgn(c, true)}\).` : T`Find the \(x\)-coordinate of the vertex of \(y = ${R.co(a)}x^2 ${R.t(b, 'x')} ${R.sgn(c, true)}\).`,
        answer: askY ? k : h,
        x: T`\(x = -\frac{b}{2a} = -\frac{${b}}{${2 * a}} = ${h}\). Substitute \(x = ${h}\) into the whole equation, constant included: \(y = ${R.co(a)}(${h})^2 ${b ? `${b < 0 ? '-' : '+'} ${Math.abs(b)}(${h}) ` : ''}${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${a * h * h} ${b ? `${b * h < 0 ? '-' : '+'} ${Math.abs(b * h)} ` : ''}${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${k}\). That is the ${kind}, since \(a ${a > 0 ? '>' : '<'} 0\)${askY ? T`; the vertex is \((${h}, ${k})\)` : ''}.` };
    } },
    { id: 'ag-abs', skill: 'Absolute value', make(R) {
      const a = R.int(1, 3); let x1, x2;
      do { x1 = R.int(-6, 8); x2 = R.int(-8, 6); } while (x1 <= x2 || (a * (x1 + x2)) % 2 !== 0);
      const b = -a * (x1 + x2) / 2, c = a * (x1 - x2) / 2;
      return { q: T`Find the larger solution of \(|${R.co(a)}x ${R.sgn(b, true)}| = ${c}\).`, answer: x1,
        x: T`Split into \(${R.co(a)}x ${R.sgn(b, true)} = ${c}\) and \(${R.co(a)}x ${R.sgn(b, true)} = -${c}\). These give \(x = ${x1}\) and \(x = ${x2}\).` };
    } }
  ]
});
