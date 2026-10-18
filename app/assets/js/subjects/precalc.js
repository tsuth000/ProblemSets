registerSubject({
  id: 'precalc', name: 'Precalculus', color: '#5B7F2B',
  blurb: 'Functions, transformations, exponentials, logarithms, conics, complex numbers',
  questions: [
    { id: 'pc1', skill: 'Functions', q: T`What is the domain of \(f(x) = \dfrac{\sqrt{x - 2}}{x - 5}\)?`,
      c: [T`\([2, 5) \cup (5, \infty)\)`, T`\((2, \infty)\)`, T`\([2, \infty)\)`, T`\((-\infty, 5) \cup (5, \infty)\)`],
      x: T`The root needs \(x \ge 2\), and the denominator needs \(x \ne 5\).` },
    { id: 'pc2', skill: 'Functions', q: T`A function satisfies \(f(-x) = f(x)\) for all \(x\). Its graph is:`,
      c: ['symmetric about the \\(y\\)-axis', 'symmetric about the origin', 'symmetric about the \\(x\\)-axis', 'a straight line'],
      x: T`That is the definition of an even function, such as \(x^2\) or \(\cos x\). Odd functions, \(f(-x) = -f(x)\), are symmetric about the origin.` },
    { id: 'pc3', skill: 'Composition and inverses', q: T`If \(f(x) = x^2\) and \(g(x) = x + 1\), what is \(f(g(2))\)?`,
      c: ['9', '5', '4', '6'],
      x: T`Work inside out: \(g(2) = 3\), then \(f(3) = 9\). The value 5 is \(g(f(2))\); composition is not commutative.` },
    { id: 'pc4', skill: 'Composition and inverses', q: T`What is the inverse of \(f(x) = \dfrac{x - 1}{3}\)?`,
      c: [T`\(f^{-1}(x) = 3x + 1\)`, T`\(f^{-1}(x) = 3x - 1\)`, T`\(f^{-1}(x) = \dfrac{3}{x - 1}\)`, T`\(f^{-1}(x) = \dfrac{x + 1}{3}\)`],
      x: T`Swap and solve: \(x = \frac{y - 1}{3}\) gives \(y = 3x + 1\).` },
    { id: 'pc5', skill: 'Transformations', q: T`Compared with \(y = f(x)\), the graph of \(y = f(x - 2) + 3\) is shifted:`,
      c: ['right 2 and up 3', 'left 2 and up 3', 'right 2 and down 3', 'left 2 and down 3'],
      x: T`Inside changes act on \(x\) in the opposite direction: \(x - 2\) shifts right. Outside changes act on \(y\) directly.` },
    { id: 'pc6', skill: 'Transformations', q: T`The graph of \(y = -f(x)\) is the graph of \(f\):`,
      c: ['reflected across the \\(x\\)-axis', 'reflected across the \\(y\\)-axis', 'shifted down 1', 'rotated 90 degrees'],
      x: T`Every output changes sign. \(f(-x)\) would reflect across the \(y\)-axis.` },
    { id: 'pc7', skill: 'Polynomial functions', q: T`For \(f(x) = -2x^5 + 3x^2 + 1\), what happens as \(x \to \infty\) and as \(x \to -\infty\)?`,
      c: [T`\(f \to -\infty\), and \(f \to \infty\)`, T`\(f \to \infty\), and \(f \to -\infty\)`, T`\(f \to -\infty\) in both directions`, T`\(f \to \infty\) in both directions`],
      x: T`The leading term \(-2x^5\) decides: odd degree with a negative coefficient falls to the right and rises to the left.` },
    { id: 'pc8', skill: 'Polynomial functions', q: T`At a zero of multiplicity 2, the graph of a polynomial:`,
      c: ['touches the \\(x\\)-axis and turns around', 'crosses the \\(x\\)-axis', 'has a vertical asymptote', 'is undefined'],
      x: T`Even multiplicity: the sign does not change. Odd multiplicity: the graph crosses.` },
    { id: 'pc9', skill: 'Rational functions', q: T`Where are the vertical asymptotes of \(\dfrac{x - 1}{(x - 1)(x + 2)}\)?`,
      c: [T`\(x = -2\) only`, T`\(x = 1\) and \(x = -2\)`, T`\(x = 1\) only`, 'There are none'],
      x: T`The factor \(x - 1\) cancels, leaving a hole at \(x = 1\). Only \(x + 2\) remains in the denominator.` },
    { id: 'pc10', skill: 'Rational functions', q: T`What is the horizontal asymptote of \(\dfrac{3x^2 + 1}{2x^2 - 5}\)?`,
      c: [T`\(y = \tfrac32\)`, T`\(y = 0\)`, 'None', T`\(y = 3\)`],
      x: T`Equal degrees: the asymptote is the ratio of leading coefficients.` },
    { id: 'pc11', skill: 'Rational functions', q: T`A rational function has a slant (oblique) asymptote when:`,
      c: ['the numerator\'s degree is exactly one more than the denominator\'s', 'the degrees are equal', 'the denominator has a higher degree', 'the denominator has a repeated root'],
      x: T`Polynomial division then leaves a linear quotient, which is the asymptote.` },
    { id: 'pc12', skill: 'Logarithms', q: T`Evaluate \(\log_2 32\).`, c: ['5', '16', '6', '4'],
      x: T`\(2^5 = 32\).` },
    { id: 'pc13', skill: 'Logarithms', q: T`Evaluate \(\ln(e^3)\).`, c: ['3', T`\(e^3\)`, '1', T`\(3e\)`],
      x: T`\(\ln\) and \(e^x\) are inverses.` },
    { id: 'pc14', skill: 'Logarithms', q: T`Which property is correct (for positive \(a\), \(b\))?`,
      c: [T`\(\log\frac ab = \log a - \log b\)`, T`\(\log(a + b) = \log a + \log b\)`, T`\(\frac{\log a}{\log b} = \log(a - b)\)`, T`\(\log(a^n) = (\log a)^n\)`],
      x: T`Logs turn products into sums and quotients into differences. There is no rule for \(\log(a + b)\). The power rule is \(\log a^n = n\log a\).` },
    { id: 'pc15', skill: 'Logarithms', q: T`Solve \(\log_3 x = 2\).`, c: ['9', '6', '8', T`\(\tfrac23\)`],
      x: T`Rewrite in exponential form: \(x = 3^2\).` },
    { id: 'pc16', skill: 'Logarithms', q: T`\(\log_5 20\) equals:`, c: [T`\(\dfrac{\ln 20}{\ln 5}\)`, T`\(\dfrac{\ln 5}{\ln 20}\)`, T`\(\ln 4\)`, T`\(\ln 20 - \ln 5\)`],
      x: T`Change of base: \(\log_b x = \frac{\ln x}{\ln b}\).` },
    { id: 'pc17', skill: 'Logarithms', q: T`Simplify \(e^{\ln 7}\).`, c: ['7', T`\(\ln 7\)`, T`\(7e\)`, T`\(e^7\)`],
      x: T`Inverse functions undo each other.` },
    { id: 'pc18', skill: 'Exponentials', q: T`Solve \(3^x = 81\).`, c: ['4', '27', '3', T`\(\tfrac{81}{3}\)`],
      x: T`\(81 = 3^4\).` },
    { id: 'pc19', skill: 'Exponentials', q: T`A population doubles every 5 years. By what factor does it grow in 15 years?`, c: ['8', '6', '3', '15'],
      x: T`Three doubling periods: \(2^3 = 8\).` },
    { id: 'pc20', skill: 'Exponentials', q: T`A substance has a half-life of 10 years. What fraction remains after 30 years?`, c: [T`\(\tfrac18\)`, T`\(\tfrac13\)`, T`\(\tfrac16\)`, T`\(\tfrac14\)`],
      x: T`Three half-lives: \(\left(\frac12\right)^3\).` },
    { id: 'pc21', skill: 'Sequences', q: T`An arithmetic sequence has \(a_1 = 3\) and \(d = 4\). Find \(a_{10}\).`, c: ['39', '43', '40', '36'],
      x: T`\(a_n = a_1 + (n - 1)d = 3 + 9(4)\).` },
    { id: 'pc22', skill: 'Sequences', q: T`Find \(1 + \frac12 + \frac14 + \frac18 + \cdots\).`, c: ['2', T`\(\tfrac32\)`, 'It diverges', T`\(\tfrac74\)`],
      x: T`Infinite geometric series with \(|r| = \frac12 < 1\): \(\frac{a}{1 - r} = \frac{1}{1/2}\).` },
    { id: 'pc23', skill: 'Conics', q: T`Describe \(\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1\).`,
      c: ['An ellipse with horizontal major axis of length 6', 'An ellipse with vertical major axis of length 6', 'A hyperbola', 'A circle of radius 3'],
      x: T`\(a = 3\) under \(x^2\) and \(b = 2\) under \(y^2\). The major axis length is \(2a = 6\).` },
    { id: 'pc24', skill: 'Conics', q: T`What are the center and radius of \((x - 1)^2 + (y + 2)^2 = 16\)?`,
      c: [T`center \((1, -2)\), radius 4`, T`center \((-1, 2)\), radius 4`, T`center \((1, -2)\), radius 16`, T`center \((1, 2)\), radius 4`],
      x: T`Standard form \((x - h)^2 + (y - k)^2 = r^2\).` },
    { id: 'pc25', skill: 'Complex numbers', q: T`Compute \((2 + 3i)(2 - 3i)\).`, c: ['13', '-5', T`\(4 - 9i\)`, '5'],
      x: T`\((a + bi)(a - bi) = a^2 + b^2\) since \(i^2 = -1\).` },
    { id: 'pc26', skill: 'Complex numbers', q: T`Evaluate \(i^{23}\).`, c: [T`\(-i\)`, T`\(i\)`, '-1', '1'],
      x: T`Powers of \(i\) repeat every 4. \(23 = 4(5) + 3\), and \(i^3 = -i\).` }
  ],
  generators: [
    { id: 'pg-log', skill: 'Logarithms', make(R) {
      const b = R.pick([2, 3, 5, 10]), lg = b === 10 ? '\\log' : `\\log_{${b}}`;
      if (R.int(0, 4) === 0) {
        return { q: T`Evaluate \(${lg} \sqrt{${b}}\).`, answer: 0.5,
          x: T`\(\sqrt{${b}} = ${b}^{1/2}\), so the logarithm is \(\tfrac12\).` };
      }
      const k = R.int(-3, b === 2 ? 7 : 4), arg = k >= 0 ? String(b ** k) : `\\frac{1}{${b ** -k}}`;
      return { q: T`Evaluate \(${lg} ${arg}\).`, answer: k,
        x: T`Ask what power of ${b} gives \(${arg}\): \(${b}^{${k}} = ${arg}\).` };
    } },
    { id: 'pg-exp', skill: 'Exponentials', make(R) {
      if (R.int(0, 1)) {
        const P = R.pick([500, 1000, 2500, 5000]), r = R.pick([3, 4, 5, 6, 8]), [n, word] = R.pick([[1, 'annually'], [4, 'quarterly'], [12, 'monthly']]), t = R.int(2, 20);
        const A = P * (1 + r / 100 / n) ** (n * t);
        return { q: T`$${P} is invested at ${r}% interest compounded ${word} for ${t} years. Find the final balance.`, answer: A, tol: 0.02, hint: 'Round to the nearest cent.',
          x: T`\(A = P\left(1 + \frac rn\right)^{nt} = ${P}\left(1 + \frac{${r / 100}}{${n}}\right)^{${n * t}} \approx ${R.fmt(A, 2)}\).` };
      }
      const a = R.int(2, 9), b = R.pick([2, 3, 5, 1.5]), c = a * R.int(3, 40) + R.int(1, 5), x = Math.log(c / a) / Math.log(b);
      return { q: T`Solve \(${a}\cdot ${b}^{x} = ${c}\).`, answer: x, tol: 0.005, hint: 'Round to 3 decimals.',
        x: T`Divide: \(${b}^x = \frac{${c}}{${a}}\). Take logs: \(x = \frac{\ln(${c}/${a})}{\ln ${b}} \approx ${R.fmt(x, 3)}\).` };
    } },
    { id: 'pg-compose', skill: 'Composition and inverses', make(R) {
      const a = R.nz(-4, 5), b = R.int(-6, 6), c = R.int(-5, 5), k = R.int(-3, 3), fFirst = R.int(0, 1) === 1;
      const f = x => a * x + b, g = x => x * x + c;
      const inner = fFirst ? g(k) : f(k), v = fFirst ? f(inner) : g(inner);
      return { q: T`Let \(f(x) = ${R.co(a)}x ${R.sgn(b, true)}\) and \(g(x) = x^2 ${R.sgn(c, true)}\). Find \(${fFirst ? 'f(g(' + k + '))' : 'g(f(' + k + '))'}\).`, answer: v,
        x: T`Inside first: \(${fFirst ? 'g' : 'f'}(${k}) = ${inner}\). Then \(${fFirst ? 'f' : 'g'}(${inner}) = ${v}\).` };
    } },
    { id: 'pg-seq', skill: 'Sequences', make(R) {
      const kind = R.int(0, 3), a1 = R.nz(-5, 9), n = R.int(5, 15);
      if (kind === 0) { const d = R.nz(-4, 6), an = a1 + (n - 1) * d;
        return { q: T`An arithmetic sequence has \(a_1 = ${a1}\) and common difference \(${d}\). Find \(a_{${n}}\).`, answer: an,
          x: T`\(a_n = a_1 + (n - 1)d = ${a1} + ${n - 1}(${d}) = ${an}\).` }; }
      if (kind === 1) { const d = R.nz(-4, 6), an = a1 + (n - 1) * d, S = n * (a1 + an) / 2;
        return { q: T`Find the sum of the first ${n} terms of the arithmetic sequence with \(a_1 = ${a1}\) and \(d = ${d}\).`, answer: S,
          x: T`\(a_{${n}} = ${an}\). \(S_n = \frac{n(a_1 + a_n)}{2} = \frac{${n}(${a1} + ${an})}{2} = ${R.fmt(S)}\).` }; }
      const [r, rt] = R.pick([[2, '2'], [3, '3'], [-2, '-2'], [0.5, '\\tfrac12']]), m = R.int(4, 8);
      if (kind === 2) { const an = a1 * r ** (m - 1);
        return { q: T`A geometric sequence has \(a_1 = ${a1}\) and ratio \(r = ${rt}\). Find \(a_{${m}}\).`, answer: an, tol: 0.01,
          x: T`\(a_n = a_1 r^{n-1} = ${a1}\,(${rt})^{${m - 1}} = ${R.fmt(an)}\).` }; }
      const S = a1 * (1 - r ** m) / (1 - r);
      return { q: T`Find the sum of the first ${m} terms of the geometric sequence with \(a_1 = ${a1}\) and \(r = ${rt}\).`, answer: S, tol: 0.01,
        x: T`\(S_n = a_1\frac{1 - r^n}{1 - r} = ${a1}\cdot\frac{1 - (${rt})^{${m}}}{1 - (${rt})} = ${R.fmt(S, 4)}\).` };
    } },
    { id: 'pg-asym', skill: 'Rational functions', make(R) {
      let a, b, c, d; do { a = R.nz(-6, 6); b = R.int(-9, 9); c = R.nz(-5, 5); d = R.int(-9, 9); } while (a * d === b * c);
      const f = T`f(x) = \dfrac{${R.co(a)}x ${R.sgn(b, true)}}{${R.co(c)}x ${R.sgn(d, true)}}`;
      if (R.int(0, 1)) return { q: T`Find the horizontal asymptote \(y = ?\) of \(${f}\).`, answer: a / c, tol: 0.01, hint: 'Fractions or decimals are fine.',
        x: T`The degrees are equal, so \(y = \frac{${a}}{${c}} = ${R.frac(a, c)}\).` };
      return { q: T`Find the vertical asymptote \(x = ?\) of \(${f}\).`, answer: -d / c, tol: 0.01, hint: 'Fractions or decimals are fine.',
        x: T`Set the denominator to zero: \(${R.co(c)}x ${R.sgn(d, true)} = 0\) gives \(x = ${R.frac(-d, c)}\). The numerator is not zero there, so it is an asymptote, not a hole.` };
    } },
    { id: 'pg-inverse', skill: 'Composition and inverses', make(R) {
      const a = R.nz(-3, 4), b = R.int(-9, 9), m = R.int(-3, 3), k = a * m ** 3 + b;
      return { q: T`Let \(f(x) = ${R.co(a)}x^3 ${R.sgn(b, true)}\). Find \(f^{-1}(${k})\).`, answer: m,
        x: T`\(f^{-1}(${k})\) is the \(x\) with \(f(x) = ${k}\): \(x^3 = \frac{${k} - (${b})}{${a}} = ${m ** 3}\), so \(x = ${m}\).` };
    } },
    { id: 'pg-circle', skill: 'Conics', make(R) {
      const h = R.int(-6, 6), k = R.int(-6, 6), r = R.int(1, 9), D = -2 * h, E = -2 * k, F = h * h + k * k - r * r;
      return { q: T`Find the radius of the circle \(x^2 + y^2 ${R.t(D, 'x')} ${R.t(E, 'y')} ${R.sgn(F, true)} = 0\).`, answer: r,
        x: T`Complete the square: \(${R.fac(h).replace('x', 'x')}^2 + ${R.fac(k).replace('x', 'y')}^2 = ${-F} + ${h * h} + ${k * k} = ${r * r}\). So \(r = ${r}\) with center \((${h}, ${k})\).` };
    } },
    { id: 'pg-complex', skill: 'Complex numbers', make(R) {
      const a = R.int(-6, 6), b = R.nz(-6, 6), c = R.int(-6, 6), d = R.nz(-6, 6), re = a * c - b * d, im = a * d + b * c, askRe = R.int(0, 1) === 1;
      const z = (x, y) => `${x} ${y < 0 ? '-' : '+'} ${Math.abs(y) === 1 ? '' : Math.abs(y)}i`;
      return { q: T`Find the ${askRe ? 'real' : 'imaginary'} part of \((${z(a, b)})(${z(c, d)})\).`, answer: askRe ? re : im,
        x: T`FOIL with \(i^2 = -1\): real part \(ac - bd = ${re}\), imaginary part \(ad + bc = ${im}\). The product is \(${z(re, im)}\).` };
    } }
  ]
});
