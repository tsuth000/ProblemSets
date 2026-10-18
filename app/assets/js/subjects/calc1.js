registerSubject({
  id: 'calc1', name: 'Calculus I', color: '#2E7A8C',
  blurb: 'Limits, continuity, derivatives, applications, basic integrals',
  questions: [
    { id: 'k1', skill: 'Limits', q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\sin x}{x}\).`, c: ['1', '0', 'It does not exist', T`\(\infty\)`],
      x: T`A fundamental limit, provable by the squeeze theorem. It is why \(\frac{d}{dx}\sin x = \cos x\).` },
    { id: 'k2', skill: 'Limits', q: T`Evaluate \(\displaystyle\lim_{x\to3}\frac{x^2 - 9}{x - 3}\).`, c: ['6', '0', 'It does not exist', '3'],
      x: T`Substitution gives \(\frac00\). Factor: \(\frac{(x-3)(x+3)}{x-3} = x + 3 \to 6\).` },
    { id: 'k3', skill: 'Limits', q: T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{3x^2 + 1}{5x^2 - x}\).`, c: [T`\(\tfrac35\)`, '0', T`\(\infty\)`, '3'],
      x: T`Divide top and bottom by \(x^2\): \(\frac{3 + 1/x^2}{5 - 1/x} \to \frac35\).` },
    { id: 'k4', skill: 'Limits', q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{1 - \cos x}{x}\).`, c: ['0', '1', T`\(\tfrac12\)`, 'It does not exist'],
      x: T`Multiply by \(\frac{1+\cos x}{1+\cos x}\): \(\frac{\sin^2 x}{x(1+\cos x)} = \frac{\sin x}{x}\cdot\frac{\sin x}{1+\cos x} \to 1 \cdot 0\).` },
    { id: 'k5', skill: 'Limits', q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{e^x - 1}{x}\).`, c: ['1', '0', T`\(e\)`, 'It does not exist'],
      x: T`\(\frac00\) form. L'Hôpital: \(\frac{e^x}{1} \to 1\). It is also the derivative of \(e^x\) at 0.` },
    { id: 'k6', skill: 'Continuity', q: T`\(f\) is continuous at \(a\) exactly when:`, c: [T`\(\lim_{x\to a} f(x)\) exists and equals \(f(a)\)`, T`\(f(a)\) is defined`, T`\(\lim_{x\to a} f(x)\) exists`, T`\(f\) is differentiable at \(a\)`],
      x: T`All three conditions are needed: \(f(a)\) defined, the limit exists, and they agree.` },
    { id: 'k7', skill: 'Continuity', q: T`Which is true of \(f(x) = |x|\) at \(x = 0\)?`, c: ['Continuous but not differentiable', 'Differentiable but not continuous', 'Both', 'Neither'],
      x: T`The graph has a corner: left slope \(-1\), right slope \(1\). Differentiable implies continuous, not the reverse.` },
    { id: 'k8', skill: 'Theorems', q: T`The intermediate value theorem guarantees a root of \(f\) in \([a, b]\) when:`, c: [T`\(f\) is continuous and \(f(a)\), \(f(b)\) have opposite signs`, T`\(f\) is differentiable`, T`\(f(a) = f(b)\)`, T`\(f'\) changes sign`],
      x: T`A continuous function cannot get from negative to positive without passing through 0.` },
    { id: 'k9', skill: 'Theorems', q: T`The mean value theorem says that if \(f\) is continuous on \([a,b]\) and differentiable on \((a,b)\), some \(c\) in \((a,b)\) satisfies:`, c: [T`\(f'(c) = \dfrac{f(b) - f(a)}{b - a}\)`, T`\(f(c) = 0\)`, T`\(f'(c) = 0\)`, T`\(f(c) = \dfrac{f(a) + f(b)}{2}\)`],
      x: T`Somewhere the instantaneous rate equals the average rate. Rolle's theorem is the special case \(f(a) = f(b)\).` },
    { id: 'k10', skill: 'Derivative rules', q: T`\(\dfrac{d}{dx}\cos x\) equals:`, c: [T`\(-\sin x\)`, T`\(\sin x\)`, T`\(-\cos x\)`, T`\(\sec^2 x\)`],
      x: T`Cosine decreases where sine is positive, as at \(x\) just above 0.` },
    { id: 'k11', skill: 'Derivative rules', q: T`\(\dfrac{d}{dx}\left[x^2\sin x\right]\) equals:`, c: [T`\(2x\sin x + x^2\cos x\)`, T`\(2x\cos x\)`, T`\(2x\sin x - x^2\cos x\)`, T`\(x^2\cos x\)`],
      x: T`Product rule: \((fg)' = f'g + fg'\).` },
    { id: 'k12', skill: 'Derivative rules', q: T`\(\dfrac{d}{dx}\left[\dfrac{x}{x+1}\right]\) equals:`, c: [T`\(\dfrac{1}{(x+1)^2}\)`, T`\(\dfrac{-1}{(x+1)^2}\)`, '1', T`\(\dfrac{2x+1}{(x+1)^2}\)`],
      x: T`Quotient rule: \(\frac{(1)(x+1) - x(1)}{(x+1)^2}\).` },
    { id: 'k13', skill: 'Derivative rules', q: T`\(\dfrac{d}{dx}\tan x\) equals:`, c: [T`\(\sec^2 x\)`, T`\(\sec x\tan x\)`, T`\(-\csc^2 x\)`, T`\(\cot x\)`],
      x: T`Quotient rule on \(\frac{\sin x}{\cos x}\): \(\frac{\cos^2 x + \sin^2 x}{\cos^2 x}\).` },
    { id: 'k14', skill: 'Chain rule', q: T`\(\dfrac{d}{dx}e^{3x}\) equals:`, c: [T`\(3e^{3x}\)`, T`\(e^{3x}\)`, T`\(3xe^{3x-1}\)`, T`\(e^3\)`],
      x: T`Chain rule: the outer derivative \(e^{3x}\) times the inner derivative 3.` },
    { id: 'k15', skill: 'Chain rule', q: T`\(\dfrac{d}{dx}\ln(x^2 + 1)\) equals:`, c: [T`\(\dfrac{2x}{x^2+1}\)`, T`\(\dfrac{1}{x^2+1}\)`, T`\(\dfrac{1}{2x}\)`, T`\(2x\ln(x^2+1)\)`],
      x: T`\(\frac{d}{dx}\ln u = \frac{u'}{u}\).` },
    { id: 'k16', skill: 'Implicit differentiation', q: T`If \(x^2 + y^2 = 25\), then \(\dfrac{dy}{dx}\) equals:`, c: [T`\(-\dfrac{x}{y}\)`, T`\(\dfrac{x}{y}\)`, T`\(-\dfrac{y}{x}\)`, T`\(2x + 2y\)`],
      x: T`\(2x + 2y\,y' = 0\). This is the slope of the circle; the tangent is perpendicular to the radius.` },
    { id: 'k17', skill: 'Related rates', q: T`A circle's radius grows at 2 cm/s. How fast is its area growing when \(r = 3\) cm?`, c: [T`\(12\pi\) cm²/s`, T`\(6\pi\) cm²/s`, T`\(9\pi\) cm²/s`, T`\(4\pi\) cm²/s`],
      x: T`\(\frac{dA}{dt} = 2\pi r\frac{dr}{dt} = 2\pi(3)(2)\).` },
    { id: 'k18', skill: 'Curve sketching', q: T`If \(f'(c) = 0\) and \(f''(c) < 0\), then \(f\) has:`, c: [T`a local maximum at \(c\)`, T`a local minimum at \(c\)`, T`an inflection point at \(c\)`, 'no conclusion'],
      x: T`Second derivative test: concave down at a flat point means a peak.` },
    { id: 'k19', skill: 'Curve sketching', q: T`An inflection point occurs where:`, c: ['concavity changes', T`\(f'(x) = 0\)`, T`\(f''(x) = 0\), always`, 'the function has a maximum'],
      x: T`\(f'' = 0\) is a candidate only. For \(x^4\) at 0, \(f'' = 0\) but concavity does not change.` },
    { id: 'k20', skill: 'Optimization', q: T`On a closed interval \([a,b]\), a continuous function's absolute maximum occurs at:`, c: ['a critical point or an endpoint', 'a critical point only', 'an endpoint only', T`the point where \(f'' = 0\)`],
      x: T`Extreme value theorem plus the closed interval method: evaluate \(f\) at every critical point and both endpoints.` },
    { id: 'k21', skill: 'Integrals', q: T`\(\displaystyle\int x^2\,dx\) equals:`, c: [T`\(\dfrac{x^3}{3} + C\)`, T`\(2x + C\)`, T`\(x^3 + C\)`, T`\(\dfrac{x^3}{3}\)`],
      x: T`Power rule in reverse: raise the power by one and divide by the new power. Indefinite integrals need \(+C\).` },
    { id: 'k22', skill: 'Integrals', q: T`\(\displaystyle\int \frac1x\,dx\) equals:`, c: [T`\(\ln|x| + C\)`, T`\(\dfrac{x^0}{0} + C\)`, T`\(-\dfrac{1}{x^2} + C\)`, T`\(\ln x\)`],
      x: T`The power rule fails at \(n = -1\). The absolute value covers \(x < 0\).` },
    { id: 'k23', skill: 'Integrals', q: T`\(\displaystyle\int 2x\cos(x^2)\,dx\) equals:`, c: [T`\(\sin(x^2) + C\)`, T`\(2\sin(x^2) + C\)`, T`\(x^2\sin(x^2) + C\)`, T`\(-\sin(x^2) + C\)`],
      x: T`Substitute \(u = x^2\), \(du = 2x\,dx\): \(\int\cos u\,du\).` },
    { id: 'k24', skill: 'Fundamental theorem', q: T`Evaluate \(\displaystyle\int_0^2 3x^2\,dx\).`, c: ['8', '12', '6', '4'],
      x: T`\(\left[x^3\right]_0^2 = 8 - 0\).` },
    { id: 'k25', skill: 'Fundamental theorem', q: T`\(\dfrac{d}{dx}\displaystyle\int_0^x \sin(t^2)\,dt\) equals:`, c: [T`\(\sin(x^2)\)`, T`\(2x\cos(x^2)\)`, T`\(\cos(x^2)\)`, T`\(\sin(x^2) - \sin 0\)`],
      x: T`FTC part 1: differentiating an accumulation function returns the integrand at the upper limit.` }
  ],
  generators: [
    { id: 'kg-deriv', skill: 'Derivative rules', make(R) {
      const a = R.nz(-4, 5), b = R.int(-6, 6), c = R.int(-9, 9), d = R.int(-9, 9), p = R.int(-3, 3), v = 3 * a * p * p + 2 * b * p + c;
      return { q: T`Let \(f(x) = ${R.co(a)}x^3 ${R.t(b, 'x^2')} ${R.t(c, 'x')} ${R.sgn(d, true)}\). Find \(f'(${p})\).`, answer: v,
        x: T`\(f'(x) = ${3 * a}x^2 ${R.t(2 * b, 'x')} ${R.sgn(c, true)}\). At \(x = ${p}\): \(${v}\).` };
    } },
    { id: 'kg-limit', skill: 'Limits', make(R) {
      let r, s; do { r = R.int(-6, 6); s = R.int(-6, 6); } while (r === s);
      const B = -(r + s), C = r * s;
      return { q: T`Evaluate \(\displaystyle\lim_{x\to${r}}\frac{x^2 ${R.t(B, 'x')} ${R.sgn(C, true)}}{${R.fac(r).replace(/^\(|\)$/g, '')}}\).`, answer: r - s,
        x: T`Direct substitution gives \(\frac00\). Factor: \(\frac{${R.fac(r)}${R.fac(s)}}{${R.fac(r)}} = ${R.fac(s).replace(/^\(|\)$/g, '')}\), which approaches \(${r} - (${s}) = ${r - s}\).` };
    } },
    { id: 'kg-tangent', skill: 'Derivative rules', make(R) {
      const a = R.nz(-3, 3), b = R.int(-5, 5), c = R.int(-6, 6), p = R.int(-3, 3), m = 2 * a * p + b, y0 = a * p * p + b * p + c, int = y0 - m * p, askB = R.int(0, 1) === 1;
      return { q: T`Find the ${askB ? 'y-intercept' : 'slope'} of the tangent line to \(y = ${R.co(a)}x^2 ${R.t(b, 'x')} ${R.sgn(c, true)}\) at \(x = ${p}\).`, answer: askB ? int : m,
        x: T`\(y' = ${2 * a}x ${R.sgn(b, true)}\), so the slope is \(m = ${m}\). The point is \((${p}, ${y0})\). Tangent: \(y = ${m}(x - (${p})) + ${y0}\), with intercept \(${int}\).` };
    } },
    { id: 'kg-defint', skill: 'Fundamental theorem', make(R) {
      const a = R.int(-2, 2), b = a + R.int(1, 3), c = R.nz(-3, 4), d = R.int(-4, 4), e = R.int(-5, 5);
      const F = x => c * x ** 3 / 3 + d * x * x / 2 + e * x, v = F(b) - F(a);
      return { q: T`Evaluate \(\displaystyle\int_{${a}}^{${b}} (${R.co(c)}x^2 ${R.t(d, 'x')} ${R.sgn(e, true)})\,dx\).`, answer: v, tol: 0.01, hint: 'Fractions or decimals are fine.',
        x: T`Antiderivative \(F(x) = ${R.co(c / 3) === '' || R.co(c / 3) === '-' ? R.co(c / 3) : R.frac(c, 3)}x^3 ${d ? (d > 0 ? '+' : '-') + ' ' + (Math.abs(d) === 2 ? '' : R.frac(Math.abs(d), 2)) + 'x^2' : ''} ${R.sgn(e)}${e ? 'x' : ''}\). \(F(${b}) - F(${a}) = ${R.fmt(F(b), 4)} - (${R.fmt(F(a), 4)}) = ${R.fmt(v, 4)}\).` };
    } },
    { id: 'kg-chain', skill: 'Chain rule', make(R) {
      const n = R.int(2, 4), a = R.nz(-3, 3), b = R.int(-3, 3), p = R.int(-2, 2), inner = a * p + b, v = n * a * inner ** (n - 1);
      return { q: T`Let \(f(x) = (${R.co(a)}x ${R.sgn(b, true)})^{${n}}\). Find \(f'(${p})\).`, answer: v,
        x: T`Chain rule: \(f'(x) = ${n}(${R.co(a)}x ${R.sgn(b, true)})^{${n - 1}}\cdot(${a})\). At \(x = ${p}\) the inner value is \(${inner}\), so \(f'(${p}) = ${n}(${inner})^{${n - 1}}(${a}) = ${v}\).` };
    } },
    { id: 'kg-opt', skill: 'Optimization', make(R) {
      const t = R.int(0, 2);
      if (t === 0) { const L = 20 * R.int(2, 20), A = L * L / 8;
        return { q: T`A farmer has ${L} m of fence to enclose a rectangle along a river; the river side needs no fence. What is the largest possible area, in m²?`, answer: A,
          x: T`With width \(x\) (two sides) and length \(${L} - 2x\): \(A = x(${L} - 2x)\), \(A' = ${L} - 4x = 0\) at \(x = ${R.fmt(L / 4)}\). Then \(A = ${R.fmt(L / 4)}\cdot ${R.fmt(L / 2)} = ${R.fmt(A)}\).` }; }
      if (t === 1) { const S = R.int(6, 60), P = S * S / 4;
        return { q: T`Two positive numbers sum to ${S}. What is their largest possible product?`, answer: P,
          x: T`\(P = x(${S} - x)\), \(P' = ${S} - 2x = 0\) at \(x = ${R.fmt(S / 2)}\). Maximum product \(= ${R.fmt(P)}\).` }; }
      const s = 6 * R.int(1, 5), x = s / 6, V = x * (s - 2 * x) ** 2;
      return { q: T`Squares are cut from the corners of a ${s} cm by ${s} cm sheet, and the sides are folded up into an open box. What is the largest possible volume, in cm³?`, answer: V,
        x: T`\(V = x(${s} - 2x)^2\). \(V' = (${s} - 2x)(${s} - 6x) = 0\) gives \(x = ${x}\) (the other root makes \(V = 0\)). \(V = ${x}\cdot ${s - 2 * x}^2 = ${V}\).` };
    } },
    { id: 'kg-related', skill: 'Related rates', make(R) {
      if (R.int(0, 1)) { const k = R.int(10, 100), r = R.int(2, 12), v = k / (4 * Math.PI * r * r);
        return { q: T`Air is pumped into a spherical balloon at ${k} cm³/s. How fast is the radius increasing when \(r = ${r}\) cm, in cm/s?`, answer: v, tol: 0.0006, hint: 'Round to 3 decimals.',
          x: T`\(V = \tfrac43\pi r^3\), so \(\frac{dV}{dt} = 4\pi r^2\frac{dr}{dt}\). \(\frac{dr}{dt} = \frac{${k}}{4\pi(${r})^2} \approx ${R.fmt(v, 4)}\).` }; }
      const L = R.pick([5, 10, 13, 25]), [xx, yy] = { 5: [3, 4], 10: [6, 8], 13: [5, 12], 25: [7, 24] }[L], s = R.pick([0.5, 1, 1.5, 2]), v = xx * s / yy;
      return { q: T`A ${L} m ladder leans on a wall. Its base slides away at ${s} m/s. How fast is the top sliding down when the base is ${xx} m from the wall, in m/s?`, answer: v, tol: 0.01, hint: 'Give the speed as a positive number, to 2 decimals.',
        x: T`\(x^2 + y^2 = ${L * L}\), so \(2x\,x' + 2y\,y' = 0\). At \(x = ${xx}\), \(y = ${yy}\): \(y' = -\frac{${xx}(${s})}{${yy}} \approx -${R.fmt(v, 3)}\). The top falls at about ${R.fmt(v, 2)} m/s.` };
    } },
    { id: 'kg-crit', skill: 'Curve sketching', make(R) {
      let p, q; do { p = R.int(-5, 4); q = R.int(p + 1, 6); } while ((p + q) % 2 !== 0);
      const b = -3 * (p + q) / 2, c = 3 * p * q, askMax = R.int(0, 1) === 1;
      return { q: T`Let \(f(x) = x^3 ${R.t(b, 'x^2')} ${R.t(c, 'x')}\). At what \(x\) does \(f\) have a local ${askMax ? 'maximum' : 'minimum'}?`, answer: askMax ? p : q,
        x: T`\(f'(x) = 3x^2 ${R.t(2 * b, 'x')} ${R.sgn(c, true)} = 3${R.fac(p)}${R.fac(q)}\). \(f'' = 6x ${R.sgn(2 * b, true)}\) is negative at \(x = ${p}\) (local max) and positive at \(x = ${q}\) (local min).` };
    } }
  ]
});
