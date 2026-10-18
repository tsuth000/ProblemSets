registerSubject({
  id: 'calc2', name: 'Calculus II', color: '#1F4F6E',
  blurb: 'Integration techniques, applications, sequences, series, Taylor series',
  questions: [
    { id: 'm1', skill: 'Integration techniques', q: T`\(\displaystyle\int xe^x\,dx\) equals:`, c: [T`\((x - 1)e^x + C\)`, T`\(xe^x + C\)`, T`\(\tfrac12x^2e^x + C\)`, T`\((x + 1)e^x + C\)`],
      x: T`By parts with \(u = x\), \(dv = e^x\,dx\): \(xe^x - \int e^x\,dx\).` },
    { id: 'm2', skill: 'Integration techniques', q: T`For \(\displaystyle\int x\ln x\,dx\) by parts, the better choice of \(u\) is:`, c: [T`\(\ln x\)`, T`\(x\)`, T`\(x\ln x\)`, '1'],
      x: T`LIATE: logs before algebraic. Differentiating \(\ln x\) simplifies it, and \(x\,dx\) is easy to integrate.` },
    { id: 'm3', skill: 'Integration techniques', q: T`The partial fraction decomposition of \(\dfrac{1}{x(x+1)}\) is:`, c: [T`\(\dfrac1x - \dfrac{1}{x+1}\)`, T`\(\dfrac1x + \dfrac{1}{x+1}\)`, T`\(\dfrac{1}{x+1} - \dfrac1x\)`, T`\(\dfrac{1}{x^2} + \dfrac1x\)`],
      x: T`\(\frac{A}{x} + \frac{B}{x+1}\): \(1 = A(x+1) + Bx\). \(x = 0\) gives \(A = 1\); \(x = -1\) gives \(B = -1\).` },
    { id: 'm4', skill: 'Integration techniques', q: T`For an integrand containing \(\sqrt{a^2 - x^2}\), the standard substitution is:`, c: [T`\(x = a\sin\theta\)`, T`\(x = a\tan\theta\)`, T`\(x = a\sec\theta\)`, T`\(u = a^2 - x^2\), always`],
      x: T`Then \(\sqrt{a^2 - a^2\sin^2\theta} = a\cos\theta\). Use \(\tan\) for \(a^2 + x^2\) and \(\sec\) for \(x^2 - a^2\).` },
    { id: 'm5', skill: 'Integration techniques', q: T`To integrate \(\sin^2 x\), rewrite it as:`, c: [T`\(\dfrac{1 - \cos 2x}{2}\)`, T`\(1 - \cos^2 x\)`, T`\(\dfrac{1 + \cos 2x}{2}\)`, T`\(2\sin x\cos x\)`],
      x: T`The power-reduction identity turns an even power into first-power cosines.` },
    { id: 'm6', skill: 'Improper integrals', q: T`\(\displaystyle\int_1^\infty\frac{1}{x^p}\,dx\) converges exactly when:`, c: [T`\(p > 1\)`, T`\(p \ge 1\)`, T`\(p < 1\)`, T`\(p > 0\)`],
      x: T`At \(p = 1\) it is \(\ln x \to \infty\). On \((0, 1]\) the condition reverses: \(\int_0^1 x^{-p}\,dx\) converges iff \(p < 1\).` },
    { id: 'm7', skill: 'Improper integrals', q: T`Evaluate \(\displaystyle\int_1^\infty\frac{1}{x^2}\,dx\).`, c: ['1', 'It diverges', '2', T`\(\tfrac12\)`],
      x: T`\(\lim_{b\to\infty}\left[-\frac1x\right]_1^b = 0 + 1\).` },
    { id: 'm8', skill: 'Improper integrals', q: T`Evaluate \(\displaystyle\int_0^1\frac{1}{\sqrt x}\,dx\).`, c: ['2', 'It diverges', '1', T`\(\tfrac12\)`],
      x: T`The integrand blows up at 0, but \(\left[2\sqrt x\right]_0^1 = 2\) is finite.` },
    { id: 'm9', skill: 'Applications', q: T`What is the area between \(y = x\) and \(y = x^2\) on \([0, 1]\)?`, c: [T`\(\tfrac16\)`, T`\(\tfrac12\)`, T`\(\tfrac13\)`, T`\(\tfrac56\)`],
      x: T`\(x \ge x^2\) there: \(\int_0^1 (x - x^2)\,dx = \frac12 - \frac13\).` },
    { id: 'm10', skill: 'Applications', q: T`The region under \(y = \sqrt x\) on \([0, 4]\) is rotated about the \(x\)-axis. Its volume is:`, c: [T`\(8\pi\)`, T`\(16\pi\)`, T`\(4\pi\)`, T`\(\frac{16\pi}{3}\)`],
      x: T`Disks: \(\pi\int_0^4 (\sqrt x)^2\,dx = \pi\int_0^4 x\,dx = 8\pi\).` },
    { id: 'm11', skill: 'Applications', q: T`The shell method for rotation about the \(y\)-axis uses:`, c: [T`\(2\pi\int_a^b x\,f(x)\,dx\)`, T`\(\pi\int_a^b f(x)^2\,dx\)`, T`\(\pi\int_a^b x^2\,dx\)`, T`\(2\pi\int_a^b f(x)\,dx\)`],
      x: T`Each shell has radius \(x\), height \(f(x)\), and thickness \(dx\): circumference times height times thickness.` },
    { id: 'm12', skill: 'Sequences', q: T`Evaluate \(\displaystyle\lim_{n\to\infty}\left(1 + \frac1n\right)^n\).`, c: [T`\(e\)`, '1', T`\(\infty\)`, '2'],
      x: T`This is one definition of \(e\). The \(1^\infty\) form is indeterminate, not 1.` },
    { id: 'm13', skill: 'Sequences', q: T`Evaluate \(\displaystyle\lim_{n\to\infty} n^{1/n}\).`, c: ['1', '0', T`\(\infty\)`, T`\(e\)`],
      x: T`\(\ln n^{1/n} = \frac{\ln n}{n} \to 0\), so the limit is \(e^0 = 1\).` },
    { id: 'm14', skill: 'Series tests', q: T`Does \(\displaystyle\sum_{n=1}^\infty\frac1n\) converge?`, c: ['No, it diverges', 'Yes, because the terms go to 0', T`Yes, to \(\ln 2\)`, T`Yes, to \(\frac{\pi^2}{6}\)`],
      x: T`The harmonic series diverges (integral test, or grouping terms). Terms going to 0 is necessary, not sufficient.` },
    { id: 'm15', skill: 'Series tests', q: T`Does \(\displaystyle\sum_{n=1}^\infty\frac{1}{n^2}\) converge?`, c: ['Yes', 'No', 'Only conditionally', 'The test is inconclusive'],
      x: T`p-series with \(p = 2 > 1\). Its sum is \(\frac{\pi^2}{6}\).` },
    { id: 'm16', skill: 'Series tests', q: T`Evaluate \(\displaystyle\sum_{n=0}^\infty\left(\frac23\right)^n\).`, c: ['3', '2', T`\(\tfrac32\)`, 'It diverges'],
      x: T`Geometric with first term 1 and \(r = \frac23\): \(\frac{1}{1 - 2/3}\).` },
    { id: 'm17', skill: 'Series tests', q: T`The series \(\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}\):`, c: ['converges conditionally', 'converges absolutely', 'diverges', 'oscillates without converging'],
      x: T`Alternating series test gives convergence (to \(\ln 2\)); the absolute values form the harmonic series, which diverges.` },
    { id: 'm18', skill: 'Series tests', q: T`The ratio test is inconclusive when \(\displaystyle\lim\left|\frac{a_{n+1}}{a_n}\right|\) equals:`, c: ['1', '0', T`\(\infty\)`, T`\(\tfrac12\)`],
      x: T`Both \(\sum\frac1n\) and \(\sum\frac1{n^2}\) give ratio limit 1, yet one diverges and the other converges.` },
    { id: 'm19', skill: 'Series tests', q: T`\(\displaystyle\sum\frac{1}{n^2 + 1}\) converges by comparison with:`, c: [T`\(\sum\frac1{n^2}\)`, T`\(\sum\frac1n\)`, T`\(\sum\frac1{\sqrt n}\)`, T`\(\sum 1\)`],
      x: T`\(\frac1{n^2+1} < \frac1{n^2}\), and \(\sum\frac1{n^2}\) converges.` },
    { id: 'm20', skill: 'Power series', q: T`What is the radius of convergence of \(\displaystyle\sum_{n=0}^\infty\frac{x^n}{n!}\)?`, c: [T`\(\infty\)`, '1', '0', T`\(e\)`],
      x: T`Ratio: \(\frac{|x|}{n+1} \to 0 < 1\) for every \(x\). This is the series for \(e^x\).` },
    { id: 'm21', skill: 'Power series', q: T`What is the radius of convergence of \(\displaystyle\sum_{n=0}^\infty\frac{x^n}{2^n}\)?`, c: ['2', T`\(\tfrac12\)`, '1', T`\(\infty\)`],
      x: T`Geometric in \(\frac x2\): converges when \(|x/2| < 1\).` },
    { id: 'm22', skill: 'Taylor series', q: T`The Maclaurin series of \(e^x\) is:`, c: [T`\(\sum_{n=0}^\infty\frac{x^n}{n!}\)`, T`\(\sum_{n=0}^\infty x^n\)`, T`\(\sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!}\)`, T`\(\sum_{n=1}^\infty\frac{x^n}{n}\)`],
      x: T`Every derivative of \(e^x\) at 0 is 1, so the coefficients are \(\frac1{n!}\). The third option is \(\cos x\).` },
    { id: 'm23', skill: 'Taylor series', q: T`The Maclaurin series of \(\sin x\) begins:`, c: [T`\(x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots\)`, T`\(1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots\)`, T`\(x + \frac{x^3}{3!} + \frac{x^5}{5!} + \cdots\)`, T`\(x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots\)`],
      x: T`Sine is odd, so only odd powers appear, with alternating signs. The last option is \(\ln(1+x)\).` },
    { id: 'm24', skill: 'Taylor series', q: T`For \(|x| < 1\), \(\dfrac{1}{1 - x}\) equals:`, c: [T`\(\sum_{n=0}^\infty x^n\)`, T`\(\sum_{n=0}^\infty (-x)^n\)`, T`\(\sum_{n=1}^\infty \frac{x^n}{n}\)`, T`\(\sum_{n=0}^\infty nx^n\)`],
      x: T`The geometric series. Substituting \(-x\) gives \(\frac1{1+x}\).` },
    { id: 'm25', skill: 'Taylor series', q: T`In the Taylor series of \(f\) about \(a\), the coefficient of \((x - a)^n\) is:`, c: [T`\(\dfrac{f^{(n)}(a)}{n!}\)`, T`\(f^{(n)}(a)\)`, T`\(\dfrac{f(a)}{n!}\)`, T`\(\dfrac{f^{(n)}(0)}{n}\)`],
      x: T`Differentiating \(n\) times and setting \(x = a\) leaves \(n!\,c_n\).` },
    { id: 'm26', skill: 'Parametric and polar', q: T`For a curve \(x(t)\), \(y(t)\), the slope \(\dfrac{dy}{dx}\) is:`, c: [T`\(\dfrac{dy/dt}{dx/dt}\)`, T`\(\dfrac{dx/dt}{dy/dt}\)`, T`\(\dfrac{dy}{dt}\cdot\dfrac{dx}{dt}\)`, T`\(\dfrac{d^2y}{dt^2}\)`],
      x: T`Chain rule: \(\frac{dy}{dt} = \frac{dy}{dx}\frac{dx}{dt}\).` },
    { id: 'm27', skill: 'Parametric and polar', q: T`The area enclosed by a polar curve \(r = f(\theta)\), \(\alpha \le \theta \le \beta\), is:`, c: [T`\(\tfrac12\int_\alpha^\beta r^2\,d\theta\)`, T`\(\int_\alpha^\beta r\,d\theta\)`, T`\(\int_\alpha^\beta r^2\,d\theta\)`, T`\(\pi\int_\alpha^\beta r^2\,d\theta\)`],
      x: T`Each thin sector has area \(\frac12 r^2\,d\theta\).` },
    { id: 'm28', skill: 'Differential equations', q: T`The general solution of \(\dfrac{dy}{dx} = ky\) is:`, c: [T`\(y = Ce^{kx}\)`, T`\(y = kx + C\)`, T`\(y = e^{kx} + C\)`, T`\(y = Cx^k\)`],
      x: T`Separate: \(\frac{dy}{y} = k\,dx\), so \(\ln|y| = kx + c\).` },
    { id: 'm29', skill: 'Differential equations', q: T`What are the equilibrium solutions of \(\dfrac{dP}{dt} = kP\left(1 - \dfrac PM\right)\)?`, c: [T`\(P = 0\) and \(P = M\)`, T`\(P = M\) only`, T`\(P = 0\) only`, T`\(P = M/2\)`],
      x: T`Set the right side to 0. For \(k > 0\), \(P = M\) is stable; \(P = M/2\) is where growth is fastest.` }
  ],
  generators: [
    { id: 'mg-geo', skill: 'Series tests', make(R) {
      const [r, rt] = R.pick([[1 / 2, '\\frac12'], [1 / 3, '\\frac13'], [2 / 3, '\\frac23'], [3 / 4, '\\frac34'], [-1 / 2, '-\\frac12'], [-1 / 3, '-\\frac13'], [1 / 4, '\\frac14'], [2 / 5, '\\frac25']]);
      const a = R.nz(-6, 9), start = R.int(0, 1), first = a * r ** start, S = first / (1 - r);
      return { q: T`Evaluate \(\displaystyle\sum_{n=${start}}^\infty ${a === 1 ? '' : a === -1 ? '-' : a}\left(${rt}\right)^n\).`, answer: S, tol: 0.01, hint: 'Fractions or decimals are fine.',
        x: T`Geometric with \(|r| < 1\). First term \(${start ? T`${a}\cdot ${rt}` : a} = ${R.fmt(first, 4)}\). Sum \(= \frac{\text{first}}{1 - r} = \frac{${R.fmt(first, 4)}}{1 - (${rt})} = ${R.fmt(S, 4)}\).` };
    } },
    { id: 'mg-parts', skill: 'Integration techniques', make(R) {
      if (R.int(0, 1)) { const a = R.int(1, 3), v = Math.exp(a) * (a - 1) / (a * a) + 1 / (a * a);
        return { q: T`Evaluate \(\displaystyle\int_0^1 xe^{${a === 1 ? '' : a}x}\,dx\).`, answer: v, tol: 0.01, hint: 'Round to 2 decimals.',
          x: T`By parts with \(u = x\), \(dv = e^{${a === 1 ? '' : a}x}dx\): \(\int xe^{${a === 1 ? '' : a}x}dx = e^{${a === 1 ? '' : a}x}\left(\frac{x}{${a}} - \frac{1}{${a * a}}\right)\). From 0 to 1: \(${R.fmt(v, 4)}\).` }; }
      const b = R.int(2, 6), v = b * Math.log(b) - b + 1;
      return { q: T`Evaluate \(\displaystyle\int_1^{${b}}\ln x\,dx\).`, answer: v, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`By parts with \(u = \ln x\), \(dv = dx\): \(\int\ln x\,dx = x\ln x - x\). So \((${b}\ln ${b} - ${b}) - (0 - 1) \approx ${R.fmt(v, 4)}\).` };
    } },
    { id: 'mg-area', skill: 'Applications', make(R) {
      if (R.int(0, 1)) { const k = R.int(1, 6), v = k ** 3 / 6;
        return { q: T`Find the area between \(y = x^2\) and \(y = ${k === 1 ? '' : k}x\).`, answer: v, tol: 0.01, hint: 'Fractions or decimals are fine.',
          x: T`They meet at \(x = 0\) and \(x = ${k}\), with \(${k === 1 ? '' : k}x\) on top. \(\int_0^{${k}}(${k === 1 ? '' : k}x - x^2)\,dx = \frac{${k}^3}{2} - \frac{${k}^3}{3} = ${R.frac(k ** 3, 6)}\).` }; }
      const m = R.int(1, 5), c = m * m, v = 4 * m ** 3 / 3;
      return { q: T`Find the area between \(y = ${c} - x^2\) and the \(x\)-axis.`, answer: v, tol: 0.01, hint: 'Fractions or decimals are fine.',
        x: T`Roots at \(\pm ${m}\). \(\int_{-${m}}^{${m}}(${c} - x^2)\,dx = 2\left(${c}\cdot ${m} - \frac{${m}^3}{3}\right) = ${R.frac(4 * m ** 3, 3)}\).` };
    } },
    { id: 'mg-vol', skill: 'Applications', make(R) {
      if (R.int(0, 1)) { const m = R.int(1, 4), b = R.int(1, 5), v = Math.PI * m * m * b ** 3 / 3;
        return { q: T`The region under \(y = ${m === 1 ? '' : m}x\) on \([0, ${b}]\) is rotated about the \(x\)-axis. Find the volume.`, answer: v, tol: 0.05, hint: 'Round to 2 decimals.',
          x: T`Disks: \(\pi\int_0^{${b}}(${m === 1 ? '' : m}x)^2\,dx = \pi\cdot\frac{${m * m}\cdot ${b}^3}{3} \approx ${R.fmt(v, 2)}\). It is a cone of radius ${m * b} and height ${b}.` }; }
      const b = R.int(1, 9), v = Math.PI * b * b / 2;
      return { q: T`The region under \(y = \sqrt x\) on \([0, ${b}]\) is rotated about the \(x\)-axis. Find the volume.`, answer: v, tol: 0.05, hint: 'Round to 2 decimals.',
        x: T`Disks: \(\pi\int_0^{${b}} x\,dx = \frac{\pi\cdot ${b}^2}{2} \approx ${R.fmt(v, 2)}\).` };
    } },
    { id: 'mg-taylor', skill: 'Taylor series', make(R) {
      const k = R.pick([-3, -2, 2, 3]), n = R.int(2, 5);
      let fact = 1; for (let i = 2; i <= n; i++) fact *= i;
      if (R.int(0, 1)) { const v = k ** n / fact;
        return { q: T`Find the coefficient of \(x^{${n}}\) in the Maclaurin series of \(e^{${k}x}\).`, answer: v, tol: 0.001, hint: 'Fractions such as 9/2 are fine.',
          x: T`Substitute \(${k}x\) into \(\sum\frac{u^n}{n!}\): the term is \(\frac{(${k}x)^{${n}}}{${n}!}\), so the coefficient is \(\frac{${k ** n}}{${fact}} = ${R.frac(k ** n, fact)}\).` }; }
      return { q: T`Find the coefficient of \(x^{${n}}\) in the Maclaurin series of \(\dfrac{1}{1 ${k < 0 ? '+' : '-'} ${Math.abs(k)}x}\).`, answer: k ** n,
        x: T`Geometric series with ratio \(${k}x\): \(\sum (${k}x)^n\). The coefficient of \(x^{${n}}\) is \((${k})^{${n}} = ${k ** n}\).` };
    } },
    { id: 'mg-radius', skill: 'Power series', make(R) {
      const a = R.int(-4, 4), shift = a === 0 ? 'x' : `(x ${a > 0 ? '-' : '+'} ${Math.abs(a)})`;
      if (R.int(0, 1)) { const b = R.int(2, 6), p = R.int(0, 3);
        return { q: T`Find the radius of convergence of \(\displaystyle\sum_{n=1}^\infty\frac{${p ? `n^{${p}}` : ''}${shift}^n}{${b}^n}\).`, answer: b,
          x: T`Ratio test: \(${p ? T`\left(\frac{n+1}{n}\right)^{${p}}` : ''}\frac{|${shift.replace(/[()]/g, '')}|}{${b}} \to \frac{|${shift.replace(/[()]/g, '')}|}{${b}}\). Converges when this is below 1: \(R = ${b}\). Powers of \(n\) never change \(R\).` }; }
      const k = R.int(2, 5);
      return { q: T`Find the radius of convergence of \(\displaystyle\sum_{n=1}^\infty\frac{${k}^n${shift}^n}{n^2}\).`, answer: 1 / k, tol: 0.001, hint: 'Fractions are fine.',
        x: T`Ratio test: the limit is \(${k}\,|${shift.replace(/[()]/g, '')}|\), which is below 1 when \(|${shift.replace(/[()]/g, '')}| < \frac1{${k}}\). \(R = \frac1{${k}}\).` };
    } },
    { id: 'mg-ode', skill: 'Differential equations', make(R) {
      const k = R.pick([0.02, 0.05, 0.1, 0.3, -0.1, -0.25, -0.05]), y0 = R.int(10, 500), T0 = R.int(2, 20), v = y0 * Math.exp(k * T0);
      return { q: T`Solve \(\dfrac{dy}{dt} = ${k}y\) with \(y(0) = ${y0}\). Find \(y(${T0})\).`, answer: v, tol: Math.max(0.01, v * 0.0005), hint: 'Round to 2 decimals.',
        x: T`Separable: \(y = y_0e^{kt} = ${y0}e^{${k}t}\). At \(t = ${T0}\): \(${y0}e^{${R.fmt(k * T0, 3)}} \approx ${R.fmt(v, 2)}\).` };
    } },
    { id: 'mg-pf', skill: 'Integration techniques', make(R) {
      const c = R.int(1, 4), a = R.int(1, 4), b = a + R.int(1, 5), v = Math.log((b * (a + c)) / (a * (b + c))) / c;
      return { q: T`Evaluate \(\displaystyle\int_{${a}}^{${b}}\frac{dx}{x(x + ${c})}\).`, answer: v, tol: 0.001, hint: 'Round to 3 decimals.',
        x: T`Partial fractions: \(\frac{1}{x(x+${c})} = \frac1{${c}}\left(\frac1x - \frac1{x+${c}}\right)\). So the integral is \(\frac1{${c}}\left[\ln\frac{x}{x+${c}}\right]_{${a}}^{${b}} = \frac1{${c}}\ln\frac{${b}\cdot${a + c}}{${a}\cdot${b + c}} \approx ${R.fmt(v, 4)}\).` };
    } }
  ]
});
