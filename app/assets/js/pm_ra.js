'use strict';
// Pure math track, stage 1: Real analysis. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'ra', name: 'Real analysis', color: '#3E5C76', blurb: 'Epsilon proofs, sequences, series, continuity, derivatives, the Riemann integral, uniform convergence, metric spaces', questions: [], generators: [] });
  const U = ['Quantifiers and proof', 'Limits of sequences', 'Monotone and recursive sequences', 'Subsequences, Cauchy, limsup', 'Infinite series', 'Limits of functions, epsilon-delta', 'Continuity theorems', 'Derivatives: MVT, Taylor, L\u2019H\u00f4pital', 'The Riemann integral', 'Uniform convergence', 'Power series', 'Metric spaces and compactness'];

  registerLearn('ra', [
    { title: U[0], skill: U[0],
      hook: T`<p>Analysis turns "gets close to" into statements with quantifiers that can be proved or disproved. Reading and negating those statements is the first skill.</p>`,
      body: T`
<p><b>Quantifiers.</b> \(\forall\) means "for every", \(\exists\) means "there exists". Order matters: \(\forall x\, \exists y: y > x\) is true in \(\mathbb R\) (take \(y = x + 1\)), while \(\exists y\, \forall x: y > x\) claims a largest-of-everything \(y\), which is false.</p>
<p><b>Negation rule.</b> Swap every \(\forall\) and \(\exists\), keep the order, and negate the final condition. An implication \(P \Rightarrow Q\) negates to "\(P\) and not \(Q\)".</p>
<table class="tt"><tr><th>Statement</th><th>Negation</th></tr>
<tr><td>\(\forall x \in S: x \le M\)</td><td>\(\exists x \in S: x > M\)</td></tr>
<tr><td>\(\exists M\, \forall n: |a_n| \le M\)</td><td>\(\forall M\, \exists n: |a_n| > M\)</td></tr>
<tr><td>\(\forall\varepsilon > 0\, \exists N\, \forall n \ge N: |a_n - L| < \varepsilon\)</td><td>\(\exists\varepsilon > 0\, \forall N\, \exists n \ge N: |a_n - L| \ge \varepsilon\)</td></tr></table>
<p>The last row says: \(a_n \to L\) fails exactly when some fixed tolerance is broken infinitely often.</p>
<p><b>Proof patterns.</b> To prove \(\forall\varepsilon\, \exists N\), let \(\varepsilon\) be arbitrary and construct \(N\) from it. To disprove, produce one \(\varepsilon\) that defeats every \(N\). <b>Contrapositive:</b> \(P \Rightarrow Q\) is equivalent to \(\lnot Q \Rightarrow \lnot P\). <b>Contradiction:</b> assume the negation and derive something false.</p>
<p><b>The triangle inequality</b> \(|a + b| \le |a| + |b|\), and its reverse \(\big||a| - |b|\big| \le |a - b|\), drive almost every estimate in this subject.</p>`,
      ex: { q: T`Negate "\(f\) is bounded on \(S\)": \(\exists M\, \forall x \in S: |f(x)| \le M\).`, a: T`<p>\(\forall M\, \exists x \in S: |f(x)| > M\). In words: no matter how large a bound you name, some point exceeds it.</p>` },
      trap: T`Negating only the final inequality and leaving the quantifiers alone.`,
      vary: [[T`Negation of \(\forall x\, \exists y: x + y = 0\)?`, [T`\(\exists x\, \forall y: x + y \ne 0\)`, T`\(\forall x\, \exists y: x + y \ne 0\)`, T`\(\exists x\, \exists y: x + y \ne 0\)`], T`Swap both quantifiers, negate the condition.`], [T`Is \(\exists y\, \forall x \in \mathbb R: x < y\) true? 1 yes, 0 no.`, 0, T`No real exceeds every real.`], [T`Contrapositive of "if \(a_n\) converges, then \(a_n\) is bounded"?`, ['if a_n is unbounded, then a_n diverges', 'if a_n is bounded, then a_n converges', 'if a_n diverges, then a_n is unbounded'], T`\(\lnot Q \Rightarrow \lnot P\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>\(a_n \to L\) means: name any tolerance \(\varepsilon\), and from some index on every term stays within \(\varepsilon\) of \(L\). The proof is a recipe that turns \(\varepsilon\) into that index \(N\).</p>
\[\forall\varepsilon > 0\ \exists N\ \forall n \ge N:\ |a_n - L| < \varepsilon\]`,
      body: T`
<h4>Finding \(N\)</h4>
<p>Simplify \(|a_n - L|\), bound it by something simple, and solve for \(n\). For \(a_n = \frac{3n + 1}{n + 2}\), \(L = 3\):</p>
\[|a_n - 3| = \left|\frac{3n + 1 - 3n - 6}{n + 2}\right| = \frac{5}{n + 2}\]
<p>\(\frac{5}{n + 2} < \varepsilon\) exactly when \(n > \frac5\varepsilon - 2\). For \(\varepsilon = 0.01\): \(n > 498\), so the smallest valid \(N\) is 499. Since \(|a_n - 3|\) decreases, every later term also works.</p>
<h4>Limit laws and standard limits</h4>
<p>If \(a_n \to a\) and \(b_n \to b\), then sums, products, and quotients (with \(b \ne 0\)) converge to the matching combination. Divide by the highest power: \(\frac{2n^2 + n}{5n^2 - 3} = \frac{2 + 1/n}{5 - 3/n^2} \to \frac25\).</p>
<table class="tt"><tr><th>Sequence</th><th>Limit</th></tr>
<tr><td>\(\sqrt{n^2 + an} - n\)</td><td>\(\frac a2\) (multiply by the conjugate)</td></tr>
<tr><td>\(\left(1 + \frac an\right)^n\)</td><td>\(e^a\)</td></tr>
<tr><td>\(\sqrt[n]{n}\), \(\sqrt[n]{c}\) (\(c > 0\))</td><td>1</td></tr>
<tr><td>\(\sqrt[n]{a^n + b^n}\) (\(a, b > 0\))</td><td>\(\max(a, b)\)</td></tr>
<tr><td>\(r^n\), \(|r| < 1\)</td><td>0</td></tr></table>
<p>For \(\sqrt[n]{a^n + b^n}\) with \(a \ge b\): it lies between \(a\) and \(a\sqrt[n]{2}\), and both ends tend to \(a\).</p>`,
      ex: { q: T`Find \(\lim\left(\sqrt{n^2 + 6n} - n\right)\).`, a: T`<p>Multiply and divide by the conjugate:</p>\[\frac{(n^2 + 6n) - n^2}{\sqrt{n^2 + 6n} + n} = \frac{6}{\sqrt{1 + 6/n} + 1} \to \frac62 = 3\]` },
      trap: T`Picking \(N\) from \(n \ge \frac5\varepsilon - 2\) and forgetting \(N\) must be an integer that makes the inequality strict.`,
      vary: [[T`\(\lim\frac{4n^2 - 1}{2n^2 + n}\)?`, 2, T`Leading coefficients.`], [T`\(\lim\left(1 + \frac2n\right)^n\), four decimals.`, Math.exp(2), T`\(e^2\).`], [T`\(\lim\sqrt[n]{3^n + 5^n}\)?`, 5, T`The larger base.`], [T`\(\lim\left(\sqrt{n^2 + 10n} - n\right)\)?`, 5, T`\(\frac{10}{2}\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Often a sequence's limit cannot be written down until you know it exists. The monotone convergence theorem supplies existence; then the recursion itself gives the value.</p>`,
      body: T`
<p><b>Monotone convergence theorem.</b> A bounded monotone sequence converges: an increasing sequence bounded above converges to the supremum of its terms. This is the completeness of \(\mathbb R\) in sequence form.</p>
<p><b>Squeeze theorem.</b> If \(b_n \le a_n \le c_n\) and \(b_n, c_n \to L\), then \(a_n \to L\). Example: \(-\frac1n \le \frac{\sin n}{n} \le \frac1n\) gives \(\frac{\sin n}{n} \to 0\).</p>
<h4>Recursive sequences</h4>
<p>Plan: show monotone and bounded (usually by induction), conclude \(a_n \to L\), then take limits on both sides of the recursion.</p>
<table class="tt"><tr><th>Recursion</th><th>Limit equation</th><th>Limit</th></tr>
<tr><td>\(a_{n+1} = \sqrt{c + a_n}\)</td><td>\(L = \sqrt{c + L}\)</td><td>\(L^2 - L - c = 0\), positive root</td></tr>
<tr><td>\(a_{n+1} = \frac12\left(a_n + \frac{c}{a_n}\right)\)</td><td>\(L = \frac12\left(L + \frac cL\right)\)</td><td>\(\sqrt c\)</td></tr>
<tr><td>\(a_{n+1} = ra_n + b\), \(|r| < 1\)</td><td>\(L = rL + b\)</td><td>\(\frac{b}{1 - r}\)</td></tr></table>
<p>The second row is Newton's method for \(\sqrt c\) (the Babylonian method). The third converges because \(|a_{n+1} - L| = |r|\,|a_n - L|\), a contraction.</p>
<p>Taking limits only works after convergence is proved: \(a_{n+1} = 2a_n\) with \(a_1 = 1\) "solves" to \(L = 0\), yet diverges.</p>`,
      ex: { q: T`\(a_1 = 1\), \(a_{n+1} = \sqrt{6 + a_n}\). Find the limit.`, a: T`<p>Induction: \(a_n < 3\) (since \(\sqrt{6 + 3} = 3\)) and \(a_{n+1} > a_n\) (since \(6 + a > a^2\) for \(0 < a < 3\)). Bounded and increasing, so it converges. The limit solves \(L^2 = 6 + L\): \(L = 3\) (the root \(-2\) is negative).</p>` },
      trap: T`Solving the limit equation before proving convergence.`,
      vary: [[T`\(a_{n+1} = \sqrt{2 + a_n}\), \(a_1 = 0\). Limit?`, 2, T`\(L^2 = 2 + L\).`], [T`\(a_{n+1} = \frac12a_n + 3\). Limit?`, 6, T`\(\frac{3}{1/2}\).`], [T`\(a_{n+1} = \frac12\left(a_n + \frac{10}{a_n}\right)\), \(a_1 = 3\). Limit, three decimals.`, Math.sqrt(10), T`\(\sqrt{10}\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>A sequence that does not converge can still have convergent pieces. Bolzano–Weierstrass guarantees them, Cauchy's criterion detects convergence without knowing the limit, and limsup and liminf measure the oscillation.</p>`,
      body: T`
<p><b>Subsequence:</b> \(a_{n_1}, a_{n_2}, \ldots\) with \(n_1 < n_2 < \cdots\). If \(a_n \to L\), every subsequence tends to \(L\). So two subsequences with different limits prove divergence: \((-1)^n\) has even terms \(\to 1\) and odd terms \(\to -1\).</p>
<p><b>Bolzano–Weierstrass.</b> Every bounded sequence in \(\mathbb R\) (or \(\mathbb R^k\)) has a convergent subsequence. Proof idea: halve the interval repeatedly, keeping a half with infinitely many terms.</p>
<p><b>Cauchy sequence:</b> \(\forall\varepsilon\, \exists N\, \forall m, n \ge N: |a_m - a_n| < \varepsilon\). In \(\mathbb R\), Cauchy \(\iff\) convergent. This is another form of completeness; in \(\mathbb Q\), the decimal truncations of \(\sqrt2\) are Cauchy with no rational limit.</p>
<p><b>limsup and liminf.</b> \(\limsup a_n\) is the largest limit of any subsequence, \(\liminf a_n\) the smallest. A bounded sequence converges exactly when they are equal.</p>
<p>For \(a_n = c + (-1)^n\left(a + \frac bn\right)\) with \(a > 0\): even terms \(\to c + a\), odd terms \(\to c - a\), so \(\limsup = c + a\) and \(\liminf = c - a\).</p>`,
      ex: { q: T`Find \(\limsup\) and \(\liminf\) of \(a_n = 2 + (-1)^n\left(3 - \frac1n\right)\).`, a: T`<p>Even \(n\): \(2 + 3 - \frac1n \to 5\). Odd \(n\): \(2 - 3 + \frac1n \to -1\). These are the only subsequential limits, so \(\limsup = 5\), \(\liminf = -1\); the sequence diverges.</p>` },
      trap: T`Taking \(\limsup\) to be the largest term. For \(a_n = 1 + \frac1n\) the largest term is 2, but \(\limsup = 1\).`,
      vary: [[T`\(\limsup(-1)^n\)?`, 1, T`Even terms.`], [T`\(\liminf\left(1 + \frac1n\right)\)?`, 1, T`It converges to 1.`], [T`\(\limsup(-1)^n\left(4 + \frac1n\right)\)?`, 4, T`Even terms tend to 4.`], [T`\(\liminf\sin\frac{n\pi}{2}\)?`, -1, T`Takes \(1, 0, -1, 0\) repeatedly.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>A series \(\sum a_n\) converges when its partial sums converge. A few tests decide almost every series met in practice, and a few sums can be found exactly.</p>`,
      body: T`
<p><b>Divergence test.</b> If \(a_n \not\to 0\), the series diverges. The converse fails: \(\sum\frac1n\) diverges although \(\frac1n \to 0\).</p>
<table class="tt"><tr><th>Test</th><th>Use it for</th></tr>
<tr><td>\(p\)-series: \(\sum\frac1{n^p}\) converges iff \(p > 1\)</td><td>powers of \(n\)</td></tr>
<tr><td>Comparison, limit comparison</td><td>rational functions, roots</td></tr>
<tr><td>Ratio: \(\lim\left|\frac{a_{n+1}}{a_n}\right| < 1\)</td><td>factorials, exponentials</td></tr>
<tr><td>Root: \(\lim\sqrt[n]{|a_n|} < 1\)</td><td>\(n\)th powers</td></tr>
<tr><td>Integral / condensation</td><td>\(\frac{1}{n\ln n}\) (diverges)</td></tr>
<tr><td>Alternating: \(|a_n| \downarrow 0\)</td><td>\(\sum(-1)^nb_n\)</td></tr></table>
<p><b>Absolute vs conditional.</b> \(\sum a_n\) converges <b>absolutely</b> if \(\sum|a_n|\) converges (which implies convergence). It converges <b>conditionally</b> if it converges but \(\sum|a_n|\) does not, like \(\sum\frac{(-1)^n}{n}\). Riemann: a conditionally convergent series can be rearranged to sum to any value.</p>
<h4>Exact sums</h4>
\[\sum_{n=0}^\infty ar^n = \frac{a}{1 - r},\qquad \sum_{n=1}^\infty nr^n = \frac{r}{(1 - r)^2}\qquad (|r| < 1)\]
<p><b>Telescoping:</b> \(\frac{1}{n(n + k)} = \frac1k\left(\frac1n - \frac1{n + k}\right)\); the sum keeps the first \(k\) terms: \(\sum_{n\ge1}\frac{1}{n(n + k)} = \frac1k\left(1 + \frac12 + \cdots + \frac1k\right)\).</p>`,
      ex: { q: T`Classify \(\sum\frac{(-1)^n}{\sqrt n}\) and \(\sum\frac{n^2}{3^n}\).`, a: T`<p>First: \(\frac1{\sqrt n}\) decreases to 0, so it converges by the alternating test; \(\sum\frac1{\sqrt n}\) is a \(p\)-series with \(p = \frac12\), divergent. Conditionally convergent.</p><p>Second: ratio \(\frac{(n + 1)^2}{3n^2} \to \frac13 < 1\). Absolutely convergent.</p>` },
      trap: T`Concluding convergence from \(a_n \to 0\).`,
      vary: [[T`\(\sum_{n\ge0}\left(\frac23\right)^n\)?`, 3, T`\(\frac{1}{1 - 2/3}\).`], [T`\(\sum_{n\ge1}\frac{1}{n(n + 1)}\)?`, 1, T`Telescopes.`], [T`\(\sum_{n\ge1}\frac{n}{2^n}\)?`, 2, T`\(\frac{1/2}{(1/2)^2}\).`], [T`Does \(\sum\frac{1}{n^{1.01}}\) converge? 1 yes, 0 no.`, 1, T`\(p > 1\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>\(\lim_{x\to a}f(x) = L\) means: for every output tolerance \(\varepsilon\) there is an input tolerance \(\delta\) that keeps \(f(x)\) within \(\varepsilon\) of \(L\).</p>
\[\begin{aligned}&\forall\varepsilon > 0\ \exists\delta > 0:\\ &0 < |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon\end{aligned}\]`,
      body: T`
<p><b>Linear functions.</b> For \(f(x) = mx + b\): \(|f(x) - f(a)| = |m|\,|x - a|\), so \(\delta = \frac{\varepsilon}{|m|}\) works, and it is the largest that does.</p>
<p><b>Quadratics, the safe recipe.</b> For \(f(x) = x^2\) at \(a\): \(|x^2 - a^2| = |x - a|\,|x + a|\). Restrict \(\delta \le 1\); then \(|x + a| \le 2|a| + 1\), so \(\delta = \min\left(1, \frac{\varepsilon}{2|a| + 1}\right)\) works.</p>
<p><b>Quadratics, the largest \(\delta\).</b> For \(a > 0\) the binding side is \(x > a\): \(x^2 < a^2 + \varepsilon\) needs \(x < \sqrt{a^2 + \varepsilon}\), so the largest \(\delta\) is \(\sqrt{a^2 + \varepsilon} - a\). (The left side allows \(a - \sqrt{a^2 - \varepsilon}\), which is larger.)</p>
<p><b>Continuity</b> at \(a\): \(\lim_{x\to a}f(x) = f(a)\). <b>Sequential criterion:</b> \(f(x) \to L\) as \(x \to a\) iff \(f(x_n) \to L\) for every sequence \(x_n \to a\) (\(x_n \ne a\)). To show a limit fails, find two sequences with different limits: \(\sin\frac1x\) at 0 with \(x_n = \frac{1}{n\pi}\) and \(x_n = \frac{1}{2n\pi + \pi/2}\).</p>
<p><b>Standard limits:</b> \(\frac{x^2 - a^2}{x - a} \to 2a\), \(\frac{\sin kx}{x} \to k\), \(\frac{\sqrt{x + c^2} - c}{x} \to \frac{1}{2c}\) (rationalize).</p>`,
      ex: { q: T`Find the largest \(\delta\) for \(\lim_{x\to2}x^2 = 4\) with \(\varepsilon = 0.5\).`, a: T`<p>Right side: \(\sqrt{4.5} - 2 \approx 0.1213\). Left side: \(2 - \sqrt{3.5} \approx 0.1292\). The smaller one binds: \(\delta \approx 0.1213\). The recipe \(\min(1, \frac{0.5}{5}) = 0.1\) also works, just not as large.</p>` },
      trap: T`Letting \(\delta\) depend on \(x\). It may depend only on \(\varepsilon\) and \(a\).`,
      vary: [[T`Largest \(\delta\) for \(f(x) = 4x - 1\) with \(\varepsilon = 0.2\)?`, 0.05, T`\(\frac{0.2}{4}\).`], [T`\(\lim_{x\to0}\frac{\sin 5x}{x}\)?`, 5, T`\(5\cdot\frac{\sin 5x}{5x}\).`], [T`\(\lim_{x\to3}\frac{x^2 - 9}{x - 3}\)?`, 6, T`\(x + 3\).`], [T`\(\lim_{x\to0}\frac{\sqrt{x + 4} - 2}{x}\)?`, 0.25, T`\(\frac{1}{2\cdot2}\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Continuous functions on closed bounded intervals behave well: they hit every intermediate value, reach a maximum and minimum, and are uniformly continuous. Each fact fails if the interval is open or unbounded.</p>`,
      body: T`
<p><b>Intermediate value theorem.</b> If \(f\) is continuous on \([a, b]\) and \(y\) lies between \(f(a)\) and \(f(b)\), then \(f(c) = y\) for some \(c\). A sign change brackets a root.</p>
<p><b>Bisection.</b> Halve the bracket and keep the half with a sign change. After \(n\) steps the bracket has length \(\frac{b - a}{2^n}\), so the error is below \(\text{tol}\) once \(2^n > \frac{b - a}{\text{tol}}\): \(n = \left\lceil\log_2\frac{b - a}{\text{tol}}\right\rceil\) (strictly, the smallest \(n\) with \(\frac{b - a}{2^n} < \text{tol}\)).</p>
<p><b>Counting roots</b> combines the IVT with monotonicity. \(p(x) = x^3 - 3x + c\) has \(p' = 3(x^2 - 1)\): local max \(p(-1) = c + 2\), local min \(p(1) = c - 2\). Three real roots if \(|c| < 2\), two (one repeated) if \(|c| = 2\), one if \(|c| > 2\).</p>
<p><b>Extreme value theorem.</b> Continuous on \([a, b]\) implies a maximum and minimum are attained. \(\frac1x\) on \((0, 1]\) shows closedness matters.</p>
<p><b>Uniform continuity:</b> one \(\delta\) works for every point: \(\forall\varepsilon\, \exists\delta\, \forall x, y: |x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon\). Continuous on a closed bounded interval implies uniformly continuous (Heine–Cantor). A bounded derivative also suffices (by the MVT). Failures: \(x^2\) on \(\mathbb R\) (steepens), \(\frac1x\) and \(\sin\frac1x\) on \((0, 1)\) (blow up or oscillate near 0).</p>`,
      ex: { q: T`How many bisection steps on \([1, 2]\) guarantee error below \(10^{-3}\)?`, a: T`<p>Need \(\frac{1}{2^n} < 0.001\), so \(2^n > 1000\): \(2^9 = 512\), \(2^{10} = 1024\). Ten steps.</p>` },
      trap: T`Applying the IVT to a function with a jump: \(f = -1\) on \([-1, 0)\) and \(f = 1\) on \([0, 1]\) changes sign but never equals 0.`,
      vary: [[T`Real roots of \(x^3 - 3x + 1\)?`, 3, T`\(|c| < 2\).`], [T`Real roots of \(x^3 - 3x + 5\)?`, 1, T`\(|c| > 2\).`], [T`Bisection steps on \([0, 4]\) for error below 0.01?`, 9, T`\(2^n > 400\).`], [T`Is \(\sqrt x\) uniformly continuous on \([0, 1]\)? 1 yes, 0 no.`, 1, T`Continuous on a closed bounded interval.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>The mean value theorem links a function's average rate of change to its instantaneous rate, and Taylor's theorem extends it to polynomial approximations with a guaranteed error.</p>`,
      body: T`
<p><b>Rolle's theorem.</b> If \(f\) is continuous on \([a, b]\), differentiable inside, and \(f(a) = f(b)\), then \(f'(c) = 0\) somewhere inside. <b>Mean value theorem:</b> for some \(c \in (a, b)\),</p>
\[f'(c) = \frac{f(b) - f(a)}{b - a}\]
<p>For \(f(x) = x^2\), \(c = \frac{a + b}{2}\). For \(x^3\) on \([a, b]\) with \(0 \le a\): \(3c^2 = a^2 + ab + b^2\). Consequences: \(f' = 0\) on an interval forces \(f\) constant; \(|f'| \le M\) gives \(|f(x) - f(y)| \le M|x - y|\).</p>
<p><b>L'Hôpital's rule.</b> For a \(\frac00\) or \(\frac\infty\infty\) form, \(\lim\frac fg = \lim\frac{f'}{g'}\) when the right side exists. Repeat as needed: \(\frac{1 - \cos kx}{x^2} \to \frac{k\sin kx}{2x} \to \frac{k^2}{2}\); \(\frac{x - \sin x}{x^3} \to \frac16\); \(\frac{e^x - 1 - x}{x^2} \to \frac12\).</p>
<p><b>Taylor's theorem with Lagrange remainder.</b></p>
\[f(x) = \sum_{k=0}^{n}\frac{f^{(k)}(0)}{k!}x^k + \frac{f^{(n+1)}(c)}{(n + 1)!}x^{n+1}\]
<p>for some \(c\) between 0 and \(x\). For \(e^x\) at \(x = 1\): \(e^c < 3\), so the error is below \(\frac{3}{(n + 1)!}\). For \(\sin x\): every derivative is bounded by 1, so the error is at most \(\frac{|x|^{n+1}}{(n + 1)!}\).</p>`,
      ex: { q: T`How many terms \(\sum_{k=0}^n\frac1{k!}\) guarantee \(e\) to within \(10^{-4}\)?`, a: T`<p>Need \(\frac{3}{(n + 1)!} < 10^{-4}\), so \((n + 1)! > 30000\). \(7! = 5040\), \(8! = 40320\): \(n + 1 = 8\), \(n = 7\).</p>` },
      trap: T`Using L'Hôpital on a form that is not indeterminate: \(\lim_{x\to0}\frac{x + 1}{x + 2} = \frac12\), not \(\frac11\).`,
      vary: [[T`MVT point for \(x^2\) on \([1, 7]\)?`, 4, T`Midpoint.`], [T`\(\lim_{x\to0}\frac{1 - \cos 4x}{x^2}\)?`, 8, T`\(\frac{16}{2}\).`], [T`\(\lim_{x\to0}\frac{\ln(1 + 3x)}{x}\)?`, 3, T`\(\frac{3}{1 + 3x} \to 3\).`], [T`Smallest \(n\) with \(\frac{3}{(n + 1)!} < 0.01\)?`, 5, T`\(6! = 720 > 300\), \(5! = 120 < 300\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>The Riemann integral squeezes the area between upper sums, built from rectangles that overshoot, and lower sums, built from rectangles that undershoot. When the squeeze closes, the function is integrable.</p>`,
      body: T`
<p>Partition \([a, b]\) into pieces \([x_{i-1}, x_i]\). Let \(M_i\) and \(m_i\) be the sup and inf of \(f\) on each piece.</p>
\[U(f, P) = \sum M_i\,\Delta x_i,\qquad L(f, P) = \sum m_i\,\Delta x_i\]
<p>\(f\) is <b>integrable</b> when \(\inf_P U = \sup_P L\), equivalently: for every \(\varepsilon\) some partition has \(U - L < \varepsilon\).</p>
<p><b>Increasing functions, equal pieces.</b> With \(n\) pieces of width \(h = \frac{b - a}{n}\), the upper sum uses right endpoints and the lower sum left endpoints. They differ by one rectangle's worth:</p>
\[U - L = \big(f(b) - f(a)\big)\frac{b - a}{n}\]
<p>so every monotone function is integrable. For \(f(x) = x^2\) on \([0, 1]\): \(U_n = \frac1{n^3}\sum_{i=1}^n i^2 = \frac{(n + 1)(2n + 1)}{6n^2}\), and \(L_n = U_n - \frac1n\). Both tend to \(\frac13\).</p>
<p><b>What is integrable:</b> continuous functions, monotone functions, functions with finitely many discontinuities (bounded). Not integrable: the Dirichlet function (1 on rationals, 0 on irrationals): every \(U = 1\), every \(L = 0\). Lebesgue's criterion: a bounded function is Riemann integrable iff its discontinuities have measure zero.</p>
<p><b>Fundamental theorem.</b> If \(f\) is continuous, \(F(x) = \int_a^xf\) is differentiable with \(F' = f\); and \(\int_a^bf = G(b) - G(a)\) for any antiderivative \(G\).</p>`,
      ex: { q: T`Compute \(U\) and \(L\) for \(f(x) = x\) on \([0, 2]\) with 4 equal pieces.`, a: T`<p>\(h = 0.5\). Right endpoints \(0.5, 1, 1.5, 2\): \(U = 0.5(5) = 2.5\). Left endpoints \(0, 0.5, 1, 1.5\): \(L = 0.5(3) = 1.5\). \(U - L = (2 - 0)(0.5) = 1\); the integral 2 lies between.</p>` },
      trap: T`Using right endpoints for the upper sum of a decreasing function. The upper sum always uses each piece's maximum.`,
      vary: [[T`\(U - L\) for \(x^3\) on \([0, 2]\) with 8 equal pieces?`, 2, T`\(8\cdot\frac28\).`], [T`Upper sum of \(x^2\) on \([0, 1]\), 2 equal pieces?`, 0.625, T`\(0.5(0.25 + 1)\).`], [T`Lower sum of the Dirichlet function on \([0, 1]\)?`, 0, T`Every piece contains an irrational.`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>A sequence of continuous functions can converge to a discontinuous one: \(x^n\) on \([0, 1]\) tends to 0, except at \(x = 1\). Uniform convergence is the stronger mode that preserves continuity, integrals, and (with care) derivatives.</p>`,
      body: T`
<p><b>Pointwise:</b> \(f_n(x) \to f(x)\) for each \(x\), with \(N\) allowed to depend on \(x\). <b>Uniform:</b> one \(N\) works for every \(x\). Equivalently,</p>
\[\|f_n - f\|_\infty = \sup_x|f_n(x) - f(x)| \to 0\]
<p><b>Computing the sup.</b> Differentiate \(f_n - f\) and check critical points and endpoints.</p>
<table class="tt"><tr><th>\(f_n\)</th><th>Limit</th><th>\(\sup|f_n - f|\)</th><th>Uniform?</th></tr>
<tr><td>\(x^n(1 - x)\) on \([0, 1]\)</td><td>0</td><td>\(\frac{n^n}{(n + 1)^{n+1}}\) at \(x = \frac{n}{n+1}\)</td><td>yes</td></tr>
<tr><td>\(\frac{x}{1 + nx^2}\) on \([0, \infty)\)</td><td>0</td><td>\(\frac{1}{2\sqrt n}\) at \(x = \frac1{\sqrt n}\)</td><td>yes</td></tr>
<tr><td>\(\frac{nx}{1 + n^2x^2}\) on \([0, \infty)\)</td><td>0</td><td>\(\frac12\) at \(x = \frac1n\)</td><td>no</td></tr>
<tr><td>\(x^n\) on \([0, 1)\)</td><td>0</td><td>1</td><td>no</td></tr></table>
<p><b>What uniform convergence preserves.</b> A uniform limit of continuous functions is continuous. Integrals pass to the limit: \(\int_a^bf_n \to \int_a^bf\). For derivatives, you need \(f_n'\) to converge uniformly.</p>
<p><b>Weierstrass M-test.</b> If \(|g_k(x)| \le M_k\) for all \(x\) and \(\sum M_k < \infty\), then \(\sum g_k\) converges uniformly. So \(\sum\frac{\sin kx}{k^2}\) is continuous.</p>`,
      ex: { q: T`Does \(f_n(x) = \frac{nx}{1 + n^2x^2}\) converge uniformly on \([0, \infty)\)?`, a: T`<p>Pointwise limit 0. The derivative vanishes at \(nx = 1\), where \(f_n = \frac12\). So \(\|f_n\|_\infty = \frac12\) for every \(n\): not uniform. The bump slides toward 0 without shrinking.</p>` },
      trap: T`Concluding uniform convergence because each \(f_n(x)\) tends to 0. The bump can move.`,
      vary: [[T`\(\sup_{[0,1]}x^2(1 - x)\)?`, 4 / 27, T`\(\frac{2^2}{3^3}\).`], [T`\(\sup_{x\ge0}\frac{x}{1 + 4x^2}\)?`, 0.25, T`\(\frac{1}{2\sqrt4}\).`], [T`Is \(x^n \to 0\) uniform on \([0, \frac12]\)? 1 yes, 0 no.`, 1, T`\(\sup = 2^{-n} \to 0\).`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>A power series \(\sum c_n(x - a)^n\) converges on an interval centered at \(a\) and diverges outside it. The radius comes from the ratio or root test applied to the coefficients.</p>`,
      body: T`
<p><b>Radius of convergence:</b></p>
\[R = \lim_{n\to\infty}\left|\frac{c_n}{c_{n+1}}\right|\quad\text{or}\quad \frac1R = \limsup\sqrt[n]{|c_n|}\]
<p>(the first when the limit exists; the second always). Inside \(|x - a| < R\) the series converges absolutely, outside it diverges, and the endpoints need separate checks.</p>
<table class="tt"><tr><th>Series</th><th>\(R\)</th></tr>
<tr><td>\(\sum\frac{x^n}{n!}\)</td><td>\(\infty\)</td></tr>
<tr><td>\(\sum n!\,x^n\)</td><td>0</td></tr>
<tr><td>\(\sum\frac{n^k}{c^n}x^n\)</td><td>\(c\) (powers of \(n\) do not matter)</td></tr>
<tr><td>\(\sum\frac{x^{2n}}{c^n}\)</td><td>\(\sqrt c\) (substitute \(u = x^2\))</td></tr></table>
<p><b>Endpoints.</b> \(\sum\frac{x^n}{n}\) has \(R = 1\); at \(x = 1\) it is harmonic (diverges), at \(x = -1\) alternating harmonic (converges). Interval \([-1, 1)\).</p>
<p><b>Inside the radius</b> the series converges uniformly on every smaller closed interval, so it can be differentiated and integrated term by term with the same \(R\). From \(\frac{1}{1 - x} = \sum x^n\): \(\ln\frac1{1 - x} = \sum_{n\ge1}\frac{x^n}{n}\) and \(\frac{1}{(1 - x)^2} = \sum nx^{n-1}\).</p>`,
      ex: { q: T`Find the radius of \(\sum\frac{2^n}{n^2}(x - 1)^n\).`, a: T`<p>\(\left|\frac{c_n}{c_{n+1}}\right| = \frac{2^n(n + 1)^2}{2^{n+1}n^2} \to \frac12\). So \(R = \frac12\), centered at 1. Endpoints: \(\sum\frac{(\pm1)^n}{n^2}\) converges, so the interval is \([\frac12, \frac32]\).</p>` },
      trap: T`Inverting the ratio: \(\left|\frac{c_{n+1}}{c_n}\right| \to L\) gives \(R = \frac1L\), not \(L\).`,
      vary: [[T`Radius of \(\sum\frac{x^n}{3^n}\)?`, 3, T`Geometric in \(\frac x3\).`], [T`Radius of \(\sum 5^nx^n\)?`, 0.2, T`Need \(|5x| < 1\).`], [T`Radius of \(\sum\frac{x^{2n}}{9^n}\)?`, 3, T`\(x^2 < 9\).`], [T`Radius of \(\sum n^3x^n\)?`, 1, T`Powers of \(n\) do not change \(R\).`]] },

    { title: U[11], skill: U[11],
      hook: T`<p>Most of analysis only uses a notion of distance. Abstracting it to a metric space lets the same theorems run on vectors, functions, and strings.</p>`,
      body: T`
<p>A <b>metric</b> \(d\) satisfies \(d(x, y) \ge 0\) with equality iff \(x = y\), symmetry, and the triangle inequality \(d(x, z) \le d(x, y) + d(y, z)\).</p>
<table class="tt"><tr><th>Metric on \(\mathbb R^k\)</th><th>Formula</th></tr>
<tr><td>\(d_1\) (taxicab)</td><td>\(\sum|x_i - y_i|\)</td></tr>
<tr><td>\(d_2\) (Euclidean)</td><td>\(\sqrt{\sum(x_i - y_i)^2}\)</td></tr>
<tr><td>\(d_\infty\) (max)</td><td>\(\max|x_i - y_i|\)</td></tr></table>
<p>Always \(d_\infty \le d_2 \le d_1 \le k\,d_\infty\), so all three give the same convergent sequences. On functions, \(d(f, g) = \sup|f - g|\) is the uniform metric.</p>
<p><b>Open set:</b> every point has a ball around it inside the set. <b>Closed set:</b> contains all its limit points (equivalently, its complement is open). Sets can be both (\(\varnothing\), \(\mathbb R\)) or neither (\([0, 1)\), \(\mathbb Q\), \(\{\frac1n\}\), which misses its limit point 0).</p>
<p><b>Compact:</b> every sequence has a subsequence converging inside the set (equivalently, every open cover has a finite subcover). <b>Heine–Borel:</b> in \(\mathbb R^k\), compact \(\iff\) closed and bounded. \(\{0\} \cup \{\frac1n\}\) is compact; \(\mathbb Z\) and \([0, \infty)\) are closed but unbounded.</p>
<p>Continuous images of compact sets are compact, which is the extreme value theorem in general form. A metric space is <b>complete</b> if every Cauchy sequence converges in it: \(\mathbb R^k\) and \(C[a, b]\) with the sup metric are complete; \(\mathbb Q\) is not.</p>`,
      ex: { q: T`Find \(d_1\), \(d_2\), \(d_\infty\) between \((1, 5)\) and \((4, 1)\).`, a: T`<p>Differences 3 and 4. \(d_1 = 7\), \(d_2 = 5\), \(d_\infty = 4\).</p>` },
      trap: T`Assuming "not open" means closed. \([0, 1)\) is neither.`,
      vary: [[T`\(d_\infty\) between \((2, -1, 4)\) and \((0, 3, 5)\)?`, 4, T`Largest of 2, 4, 1.`], [T`\(d_1\) between \((2, -1, 4)\) and \((0, 3, 5)\)?`, 7, T`\(2 + 4 + 1\).`], [T`Is \([0, \infty)\) compact? 1 yes, 0 no.`, 0, T`Unbounded.`], [T`Is \(\{0\} \cup \{\frac1n : n \ge 1\}\) compact? 1 yes, 0 no.`, 1, T`Closed and bounded.`]] }
  ]);

  addQuestions('ra', [
    { id: 'ra1', skill: U[0], q: T`Which statement says \(a_n\) does not converge to \(L\)?`, c: [T`\(\exists\varepsilon > 0\, \forall N\, \exists n \ge N: |a_n - L| \ge \varepsilon\)`, T`\(\forall\varepsilon > 0\, \exists N\, \forall n \ge N: |a_n - L| \ge \varepsilon\)`, T`\(\exists\varepsilon > 0\, \exists N\, \forall n \ge N: |a_n - L| \ge \varepsilon\)`], x: T`Swap each quantifier and negate the inequality.` },
    { id: 'ra2', skill: U[2], q: T`Which theorem guarantees that a bounded increasing sequence converges?`, c: ['the monotone convergence theorem', 'the squeeze theorem', 'the mean value theorem', 'the ratio test'], x: T`It is completeness in sequence form.` },
    { id: 'ra3', skill: U[3], q: T`In \(\mathbb R\), a sequence is convergent if and only if it is:`, c: ['Cauchy', 'bounded', 'monotone', 'positive'], x: T`Bounded is necessary but not sufficient: \((-1)^n\).` },
    { id: 'ra4', skill: U[3], q: T`Bolzano–Weierstrass says every bounded sequence in \(\mathbb R\):`, c: ['has a convergent subsequence', 'converges', 'is monotone', 'is Cauchy'], x: T`Repeated halving traps a convergent subsequence.` },
    { id: 'ra5', skill: U[4], q: T`A conditionally convergent series:`, c: ['converges, but the series of absolute values diverges', 'converges only for some x', 'diverges, but its terms tend to 0', 'converges to 0'], x: T`Example \(\sum\frac{(-1)^n}{n}\).` },
    { id: 'ra6', skill: U[6], q: T`Which function is not uniformly continuous on its domain?`, c: [T`\(\frac1x\) on \((0, 1)\)`, T`\(x^2\) on \([0, 1]\)`, T`\(\sin x\) on \(\mathbb R\)`, T`\(\sqrt x\) on \([0, \infty)\)`], x: T`It blows up near 0; the others have bounded slope or compact domain (\(\sqrt x\) is uniformly continuous though its slope is unbounded near 0).` },
    { id: 'ra7', skill: U[8], q: T`The Dirichlet function (1 on rationals, 0 on irrationals) on \([0, 1]\) is:`, c: ['not Riemann integrable', 'Riemann integrable with integral 0', 'Riemann integrable with integral 1', 'continuous at every rational'], x: T`Every upper sum is 1 and every lower sum is 0.` },
    { id: 'ra8', skill: U[9], q: T`A uniform limit of continuous functions is:`, c: ['continuous', 'differentiable', 'a polynomial', 'possibly discontinuous'], x: T`Uniform convergence preserves continuity; pointwise does not.` },
    { id: 'ra9', skill: U[11], q: T`By Heine–Borel, a subset of \(\mathbb R^k\) is compact if and only if it is:`, c: ['closed and bounded', 'open and bounded', 'closed', 'bounded'], x: T`Both conditions are needed.` }
  ]);

  // ======================= GENERATORS =======================
  const NEG = [
    [T`\(\forall x\, \exists y: y > x\)`, T`\(\exists x\, \forall y: y \le x\)`, T`\(\forall x\, \exists y: y \le x\)`, T`\(\exists x\, \exists y: y \le x\)`],
    [T`\(\exists M\, \forall n: |a_n| \le M\)`, T`\(\forall M\, \exists n: |a_n| > M\)`, T`\(\exists M\, \forall n: |a_n| > M\)`, T`\(\forall M\, \forall n: |a_n| > M\)`],
    [T`\(\forall x \in S: x \le M\)`, T`\(\exists x \in S: x > M\)`, T`\(\forall x \in S: x > M\)`, T`\(\exists x \in S: x \ge M\)`],
    [T`\(\forall\varepsilon > 0\, \exists N\, \forall n \ge N: |a_n - L| < \varepsilon\)`, T`\(\exists\varepsilon > 0\, \forall N\, \exists n \ge N: |a_n - L| \ge \varepsilon\)`, T`\(\forall\varepsilon > 0\, \exists N\, \forall n \ge N: |a_n - L| \ge \varepsilon\)`, T`\(\exists\varepsilon > 0\, \exists N\, \forall n \ge N: |a_n - L| \ge \varepsilon\)`],
    [T`\(\forall\varepsilon > 0\, \exists\delta > 0\, \forall x: |x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon\)`, T`\(\exists\varepsilon > 0\, \forall\delta > 0\, \exists x: |x - a| < \delta\) and \(|f(x) - f(a)| \ge \varepsilon\)`, T`\(\exists\varepsilon > 0\, \forall\delta > 0\, \forall x: |x - a| \ge \delta \Rightarrow |f(x) - f(a)| \ge \varepsilon\)`, T`\(\forall\varepsilon > 0\, \exists\delta > 0\, \exists x: |x - a| < \delta\) and \(|f(x) - f(a)| \ge \varepsilon\)`],
    [T`\(\forall\varepsilon > 0\, \exists N\, \forall m, n \ge N: |a_m - a_n| < \varepsilon\)`, T`\(\exists\varepsilon > 0\, \forall N\, \exists m, n \ge N: |a_m - a_n| \ge \varepsilon\)`, T`\(\exists\varepsilon > 0\, \forall N\, \forall m, n \ge N: |a_m - a_n| \ge \varepsilon\)`, T`\(\forall\varepsilon > 0\, \forall N\, \exists m, n \ge N: |a_m - a_n| \ge \varepsilon\)`]
  ];
  // Series: [TeX of a_n, sympy expression in n, classification].
  const SER = [['\\frac{1}{n^2}', '1/n**2'], ['\\frac1n', '1/n'], ['\\frac{1}{\\sqrt n}', '1/sqrt(n)'], ['\\frac{n}{2^n}', 'n/2**n'], ['\\frac{n!}{n^n}', 'factorial(n)/n**n'], ['\\frac{1}{n\\ln(n + 1)}', '1/(n*log(n+1))'], ['\\frac{(-1)^n}{n}', '(-1)**n/n'], ['\\frac{(-1)^n}{n^2}', '(-1)**n/n**2'], ['\\frac{(-1)^n}{\\sqrt n}', '(-1)**n/sqrt(n)'], ['\\frac{n^2}{3^n}', 'n**2/3**n'], ['\\frac{1}{n^2 + 1}', '1/(n**2+1)'], ['\\frac{1}{n^{3/2}}', '1/n**Rational(3,2)'], ['\\frac{(-1)^nn}{n + 1}', '(-1)**n*n/(n+1)'], ['\\frac{2^n}{n!}', '2**n/factorial(n)'], ['\\frac{n}{n + 1}', 'n/(n+1)'], ['\\frac{(-1)^n}{\\ln(n + 1)}', '(-1)**n/log(n+1)'], ['\\frac{\\ln n}{n^2}', 'log(n)/n**2']];
  const SERA = { '1/n**2': 0, '1/n': 2, '1/sqrt(n)': 2, 'n/2**n': 0, 'factorial(n)/n**n': 0, '1/(n*log(n+1))': 2, '(-1)**n/n': 1, '(-1)**n/n**2': 0, '(-1)**n/sqrt(n)': 1, 'n**2/3**n': 0, '1/(n**2+1)': 0, '1/n**Rational(3,2)': 0, '(-1)**n*n/(n+1)': 2, '2**n/factorial(n)': 0, 'n/(n+1)': 2, '(-1)**n/log(n+1)': 1, 'log(n)/n**2': 0 };
  const SERW = ['Converges absolutely', 'Converges conditionally', 'Diverges'], SERK = ['abs', 'cond', 'div'];
  const SERX = { '1/n**2': 'p-series with p = 2.', '1/n': 'The harmonic series diverges.', '1/sqrt(n)': 'p-series with p = 1/2.', 'n/2**n': 'Ratio test: limit 1/2.', 'factorial(n)/n**n': 'Ratio test: limit 1/e.', '1/(n*log(n+1))': 'Integral or condensation test: like the integral of 1/(x ln x), which diverges.', '(-1)**n/n': 'Alternating test converges; absolute values form the harmonic series.', '(-1)**n/n**2': 'Absolute values form a p-series with p = 2.', '(-1)**n/sqrt(n)': 'Alternating test converges; absolute values form a p-series with p = 1/2.', 'n**2/3**n': 'Ratio test: limit 1/3.', '1/(n**2+1)': 'Compare with 1/n^2.', '1/n**Rational(3,2)': 'p-series with p = 3/2.', '(-1)**n*n/(n+1)': 'Terms do not tend to 0.', '2**n/factorial(n)': 'Ratio test: limit 0.', 'n/(n+1)': 'Terms tend to 1, not 0.', '(-1)**n/log(n+1)': 'Alternating test converges; 1/ln(n+1) exceeds 1/n, so absolute values diverge.', 'log(n)/n**2': 'Compare with 1/n^{3/2}, since ln n grows slower than any positive power.' };
  const UC = [['\\(x^2\\) on \\([0, 5]\\)', 1], ['\\(x^2\\) on \\(\\mathbb R\\)', 0], ['\\(\\frac1x\\) on \\((0, 1)\\)', 0], ['\\(\\frac1x\\) on \\([1, \\infty)\\)', 1], ['\\(\\sin x\\) on \\(\\mathbb R\\)', 1], ['\\(\\sin\\frac1x\\) on \\((0, 1)\\)', 0], ['\\(\\sqrt x\\) on \\([0, \\infty)\\)', 1], ['\\(e^x\\) on \\(\\mathbb R\\)', 0], ['\\(\\arctan x\\) on \\(\\mathbb R\\)', 1], ['\\(x\\sin x\\) on \\(\\mathbb R\\)', 0]];
  const TOP = [['\\([0, 1]\\)', 0], ['\\(\\{0\\} \\cup \\{\\frac1n : n \\ge 1\\}\\)', 0], ['\\(\\{1, 2, 3\\}\\)', 0], ['\\([0, \\infty)\\)', 1], ['\\(\\mathbb Z\\)', 1], ['\\((0, 1)\\)', 2], ['\\((0, 1) \\cup (2, 3)\\)', 2], ['\\(\\mathbb R \\setminus \\{0\\}\\)', 2], ['\\([0, 1)\\)', 3], ['\\(\\{\\frac1n : n \\ge 1\\}\\)', 3], ['\\(\\mathbb Q\\)', 3], ['\\([0, 1] \\cup [2, 3]\\)', 0]];
  const TOPW = ['Compact', 'Closed, not compact', 'Open', 'Neither open nor closed'];
  const fct = k => (k <= 1 ? 1 : k * fct(k - 1)), gcd = (a, b) => (b ? gcd(b, a % b) : a);

  registerUnitGens('ra', { units: {
    [U[0]]: [{ id: 'ra-neg', make(R) {
      const i = R.int(0, NEG.length - 1), [s, ...c] = NEG[i];
      return { q: T`Which is the negation of ${s}?`, c, x: T`Swap every \(\forall\) and \(\exists\) in order, then negate the final condition (an implication \(P \Rightarrow Q\) becomes \(P\) and not \(Q\)).`, key: 'n' + i, vk: `'n${i}'` };
    } }],
    [U[1]]: [
      { id: 'ra-N', make(R) {
        const p = R.int(1, 6), r = R.int(1, 5); let q; do { q = R.int(-6, 9); } while (q === p * r);
        const D = Math.abs(q - p * r), k = R.pick([10, 20, 50, 100, 1000]), N = D * k - r + 1;
        if (N < 1) return this.make(R);
        return { q: T`\(a_n = \frac{${p}n + ${q}}{n + ${r}} \to ${p}\). For \(\varepsilon = ${1 / k}\), find the smallest \(N\) such that \(|a_n - ${p}| < \varepsilon\) for every \(n \ge N\).`, answer: N,
          x: T`\(|a_n - ${p}| = \frac{${D}}{n + ${r}}\), which decreases in \(n\). Need \(n + ${r} > ${D * k}\), so \(n > ${D * k - r}\) and \(N = ${N}\).`, v: `min(n for n in range(1, ${D * k + 10}) if abs(Rational(${p}*n + ${q}, n + ${r}) - ${p}) < Rational(1, ${k}))` };
      } },
      { id: 'ra-lim', make(R) {
        const k = R.int(0, 3), n = "Symbol('n', positive=True)";
        if (k === 0) { const a = R.int(1, 9), b = R.int(-5, 5), c = R.int(1, 9), d = R.int(-5, 5); return { q: T`Find \(\lim_{n\to\infty}\frac{${a}n^2 + ${b}n}{${c}n^2 + ${d}}\).`, answer: a / c, tol: 1e-6, x: T`Divide top and bottom by \(n^2\): the limit is \(\frac{${a}}{${c}}\).`, v: `(lambda n: limit((${a}*n**2 + ${b}*n)/(${c}*n**2 + ${d}), n, oo))(${n})` }; }
        if (k === 1) { const a = R.int(1, 12); return { q: T`Find \(\lim_{n\to\infty}\left(\sqrt{n^2 + ${a}n} - n\right)\).`, answer: a / 2, tol: 1e-6, x: T`Multiply by the conjugate: \(\frac{${a}n}{\sqrt{n^2 + ${a}n} + n} \to \frac{${a}}{2}\).`, v: `(lambda n: limit(sqrt(n**2 + ${a}*n) - n, n, oo))(${n})` }; }
        if (k === 2) { const a = R.pick([-2, -1, 1, 2, 3, 0.5]); return { q: T`Find \(\lim_{n\to\infty}\left(1 + \frac{${a}}{n}\right)^n\) to four decimals.`, answer: Math.exp(a), tol: 0.0001, x: T`\(\left(1 + \frac an\right)^n \to e^a = e^{${a}} \approx ${R.fmt(Math.exp(a), 4)}\).`, v: `(lambda n: limit((1 + nsimplify(${a})/n)**n, n, oo))(${n})` }; }
        const a = R.int(2, 9); let b; do { b = R.int(2, 9); } while (b === a);
        return { q: T`Find \(\lim_{n\to\infty}\sqrt[n]{${a}^n + ${b}^n}\).`, answer: Math.max(a, b), x: T`\(${Math.max(a, b)} \le \sqrt[n]{${a}^n + ${b}^n} \le ${Math.max(a, b)}\sqrt[n]2\), and \(\sqrt[n]2 \to 1\).`, v: `(lambda n: limit((${a}**n + ${b}**n)**(1/n), n, oo))(${n})` };
      } }
    ],
    [U[2]]: [{ id: 'ra-rec', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const L = R.int(2, 6), c = L * (L - 1); return { q: T`\(a_1 = 1\) and \(a_{n+1} = \sqrt{${c} + a_n}\). The sequence is increasing and bounded. Find its limit.`, answer: L, x: T`\(L = \sqrt{${c} + L}\) gives \(L^2 - L - ${c} = 0\), so \(L = ${L}\) (the other root \(${1 - L}\) is negative).`, v: `reduce(lambda a, _: (${c} + a)**0.5, range(300), 1.0)` }; }
      if (k === 1) { const c = R.pick([2, 3, 5, 6, 7, 10, 11, 13]), a1 = Math.ceil(Math.sqrt(c)); return { q: T`\(a_1 = ${a1}\) and \(a_{n+1} = \frac12\left(a_n + \frac{${c}}{a_n}\right)\). Find the limit to four decimals.`, answer: Math.sqrt(c), tol: 0.0001, x: T`\(L = \frac12\left(L + \frac{${c}}{L}\right)\) gives \(L^2 = ${c}\): \(L = \sqrt{${c}}\).`, v: `reduce(lambda a, _: (a + ${c}/a)/2, range(60), ${a1}.0)` }; }
      const r = R.pick([0.5, 0.25, 0.2, -0.5, 0.75, 0.1]), b = R.int(-6, 9) || 3;
      return { q: T`\(a_1 = 0\) and \(a_{n+1} = ${r}a_n + ${b}\). Find the limit.`, answer: b / (1 - r), tol: 1e-6, x: T`A contraction with factor \(${Math.abs(r)} < 1\). \(L = ${r}L + ${b}\), so \(L = \frac{${b}}{1 - ${r}} = ${R.fmt(b / (1 - r), 4)}\).`, v: `reduce(lambda a, _: ${r}*a + ${b}, range(400), 0.0)` };
    } }],
    [U[3]]: [{ id: 'ra-limsup', make(R) {
      const a = R.int(1, 6), b = R.int(1, 5), c = R.int(-4, 4), sup = R.int(0, 1);
      return { q: T`Find \(${sup ? '\\limsup' : '\\liminf'}\) of \(a_n = ${c} + (-1)^n\left(${a} + \frac{${b}}{n}\right)\).`, answer: sup ? c + a : c - a, tol: 1e-6,
        x: T`Even terms \(\to ${c} + ${a} = ${c + a}\); odd terms \(\to ${c} - ${a} = ${c - a}\). ${sup ? 'limsup is the larger' : 'liminf is the smaller'} subsequential limit.`, v: `limit(${c} + ${sup ? '' : '-'}(${a} + ${b}/Symbol('m')), Symbol('m'), oo)` };
    } }],
    [U[4]]: [
      { id: 'ra-ser', make(R) {
        const [tex, py] = R.pick(SER), k = SERA[py];
        return { q: T`Classify \(\sum_{n=1}^{\infty}${tex}\).`, c: [SERW[k], ...SERW.filter((_, i) => i !== k)], x: SERX[py], key: SERK[k], vk: `sercls('${py}')` };
      } },
      { id: 'ra-sum', make(R) {
        const k = R.int(0, 2);
        if (k === 0) { const a = R.int(1, 6); let p, q; do { p = R.int(1, 4); q = p + R.int(1, 4); } while (gcd(p, q) > 1); return { q: T`Find \(\sum_{n=0}^{\infty}${a}\left(\frac{${p}}{${q}}\right)^n\).`, answer: a * q / (q - p), tol: 1e-6, x: T`Geometric: \(\frac{${a}}{1 - ${p}/${q}} = ${(a * q) % (q - p) === 0 ? a * q / (q - p) : `\\frac{${a * q / gcd(a * q, q - p)}}{${(q - p) / gcd(a * q, q - p)}}`}\).`, v: `summation(${a}*Rational(${p}, ${q})**Symbol('n', integer=True), (Symbol('n', integer=True), 0, oo))` }; }
        if (k === 1) { const kk = R.int(1, 5); let h = 0; for (let i = 1; i <= kk; i++) h += 1 / i; return { q: T`Find \(\sum_{n=1}^{\infty}\frac{1}{n(n + ${kk})}\).`, answer: h / kk, tol: 1e-6, x: T`\(\frac{1}{n(n + ${kk})} = \frac1{${kk}}\left(\frac1n - \frac1{n + ${kk}}\right)\). The sum telescopes to \(\frac1{${kk}}\left(1 + \cdots + \frac1{${kk}}\right) \approx ${R.fmt(h / kk, 4)}\).`, v: `(lambda n: summation(1/(n*(n + ${kk})), (n, 1, oo)))(Symbol('n', integer=True, positive=True))` }; }
        const q = R.int(2, 5);
        return { q: T`Find \(\sum_{n=1}^{\infty}\frac{n}{${q}^n}\).`, answer: (1 / q) / (1 - 1 / q) ** 2, tol: 1e-6, x: T`\(\sum nr^n = \frac{r}{(1 - r)^2}\) with \(r = \frac1{${q}}\): \(\frac{${q}}{${(q - 1) ** 2}}\).`, v: `(lambda n: summation(n/${q}**n, (n, 1, oo)))(Symbol('n', integer=True, positive=True))` };
      } }
    ],
    [U[5]]: [
      { id: 'ra-delta', make(R) {
        if (R.int(0, 1)) { const m = R.pick([2, 3, 4, 5, -2, -3, 10]), e = R.pick([0.1, 0.2, 0.5, 0.01, 0.3]), b = R.int(-5, 5), a = R.int(-3, 3);
          return { q: T`For \(f(x) = ${m}x + ${b}\) and \(\lim_{x\to${a}}f(x)\), find the largest \(\delta\) that works for \(\varepsilon = ${e}\).`, answer: e / Math.abs(m), tol: 1e-6, x: T`\(|f(x) - f(${a})| = ${Math.abs(m)}|x - ${a}| < ${e}\) exactly when \(|x - ${a}| < \frac{${e}}{${Math.abs(m)}}\).`, v: `solve(${Math.abs(m)}*Symbol('d', positive=True) - nsimplify(${e}))` }; }
        const a = R.int(1, 5), e = R.pick([0.1, 0.5, 1, 0.2]);
        return { q: T`For \(\lim_{x\to${a}}x^2 = ${a * a}\) with \(\varepsilon = ${e}\), find the largest \(\delta\), to four decimals.`, answer: Math.sqrt(a * a + e) - a, tol: 0.0001, x: T`The right side binds: \(x^2 < ${a * a} + ${e}\) needs \(x < \sqrt{${a * a + e}}\), so \(\delta = \sqrt{${a * a + e}} - ${a} \approx ${R.fmt(Math.sqrt(a * a + e) - a, 4)}\).`, v: `min(solve((${a} + Symbol('d', positive=True))**2 - ${a * a} - nsimplify(${e})) + solve(${a * a} - (${a} - Symbol('d', positive=True))**2 - nsimplify(${e})))` };
      } },
      { id: 'ra-flim', make(R) {
        const k = R.int(0, 2), x = "Symbol('x')";
        if (k === 0) { const a = R.int(-6, 6) || 2; return { q: T`Find \(\lim_{x\to${a}}\frac{x^2 - ${a * a}}{x - ${a}}\).`, answer: 2 * a, x: T`Factor: \(\frac{(x - ${a})(x + ${a})}{x - ${a}} = x + ${a} \to ${2 * a}\).`, v: `(lambda x: limit((x**2 - ${a * a})/(x - ${a}), x, ${a}))(${x})` }; }
        if (k === 1) { const a = R.int(2, 9), b = R.int(2, 5); return { q: T`Find \(\lim_{x\to0}\frac{\sin ${a}x}{${b}x}\).`, answer: a / b, tol: 1e-6, x: T`\(\frac{${a}}{${b}}\cdot\frac{\sin ${a}x}{${a}x} \to \frac{${a}}{${b}}\).`, v: `(lambda x: limit(sin(${a}*x)/(${b}*x), x, 0))(${x})` }; }
        const c = R.int(1, 6); return { q: T`Find \(\lim_{x\to0}\frac{\sqrt{x + ${c * c}} - ${c}}{x}\).`, answer: 1 / (2 * c), tol: 1e-6, x: T`Rationalize: \(\frac{1}{\sqrt{x + ${c * c}} + ${c}} \to \frac{1}{${2 * c}}\).`, v: `(lambda x: limit((sqrt(x + ${c * c}) - ${c})/x, x, 0))(${x})` };
      } }
    ],
    [U[6]]: [
      { id: 'ra-bis', make(R) {
        const L = R.pick([1, 2, 3, 4, 10]), t = R.pick([0.1, 0.01, 0.001, 0.0001, 0.05]); let n = 0; while (L / 2 ** n >= t) n++;
        return { q: T`Bisection starts on an interval of length ${L}. How many steps guarantee the bracket is shorter than ${t}?`, answer: n, x: T`Need \(\frac{${L}}{2^n} < ${t}\), so \(2^n > ${R.fmt(L / t, 4)}\): \(n = ${n}\).`, v: `min(n for n in range(200) if Rational(${L}, 2**n) < nsimplify(${t}))` };
      } },
      { id: 'ra-roots', make(R) {
        const c = R.int(-5, 5), cnt = Math.abs(c) < 2 ? 3 : Math.abs(c) === 2 ? 2 : 1;
        return { q: T`How many distinct real roots does \(x^3 - 3x${c ? ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}` : ''}\) have?`, answer: cnt, x: T`Local max \(p(-1) = ${c + 2}\), local min \(p(1) = ${c - 2}\). ${cnt === 3 ? 'Opposite signs: the IVT gives a root in each of three intervals.' : cnt === 2 ? 'One extreme value is 0: a repeated root plus one more.' : 'Both have the same sign: only one crossing.'}`, v: `len(set(real_roots(Symbol('x')**3 - 3*Symbol('x') + ${c})))` };
      } },
      { id: 'ra-uc', make(R) {
        const [f, y] = R.pick(UC);
        return { q: T`Is ${f} uniformly continuous?`, c: y ? ['Yes', 'No'] : ['No', 'Yes'], x: y ? 'Yes: a closed bounded domain, or a bounded derivative, or a function that flattens out.' : 'No: the slope grows without bound or the function oscillates faster and faster, so no single delta works.', key: y ? 'Yes' : 'No', vk: `'${y ? 'Yes' : 'No'}'` };
      } }
    ],
    [U[7]]: [
      { id: 'ra-mvt', make(R) {
        if (R.int(0, 1)) { const a = R.int(-5, 5), b = a + R.int(1, 8); return { q: T`Find the point \(c\) given by the mean value theorem for \(f(x) = x^2\) on \([${a}, ${b}]\).`, answer: (a + b) / 2, tol: 1e-6, x: T`\(2c = \frac{${b * b} - ${a * a}}{${b - a}} = ${a + b}\), so \(c = ${(a + b) / 2}\).`, v: `solve(2*Symbol('c') - Rational(${b * b - a * a}, ${b - a}))` }; }
        const a = R.int(0, 3), b = a + R.int(1, 4), c = Math.sqrt((a * a + a * b + b * b) / 3);
        return { q: T`Find the point \(c\) given by the mean value theorem for \(f(x) = x^3\) on \([${a}, ${b}]\), to four decimals.`, answer: c, tol: 0.0001, x: T`\(3c^2 = \frac{${b ** 3} - ${a ** 3}}{${b - a}} = ${a * a + a * b + b * b}\), so \(c = \sqrt{${a * a + a * b + b * b}/3} \approx ${R.fmt(c, 4)}\).`, v: `[r for r in solve(3*Symbol('c')**2 - Rational(${b ** 3 - a ** 3}, ${b - a})) if r > ${a}]` };
      } },
      { id: 'ra-lhop', make(R) {
        const k = R.int(0, 3), x = "Symbol('x')";
        if (k === 0) { const a = R.int(1, 6); return { q: T`Find \(\lim_{x\to0}\frac{1 - \cos ${a}x}{x^2}\).`, answer: a * a / 2, tol: 1e-6, x: T`L'Hôpital twice: \(\frac{${a}\sin ${a}x}{2x} \to \frac{${a * a}\cos ${a}x}{2} \to \frac{${a * a}}{2}\).`, v: `(lambda x: limit((1 - cos(${a}*x))/x**2, x, 0))(${x})` }; }
        if (k === 1) { const a = R.int(1, 6); return { q: T`Find \(\lim_{x\to0}\frac{\ln(1 + ${a}x)}{x}\).`, answer: a, x: T`L'Hôpital: \(\frac{${a}/(1 + ${a}x)}{1} \to ${a}\).`, v: `(lambda x: limit(log(1 + ${a}*x)/x, x, 0))(${x})` }; }
        if (k === 2) { const a = R.int(1, 4); return { q: T`Find \(\lim_{x\to0}\frac{e^{${a}x} - 1 - ${a}x}{x^2}\).`, answer: a * a / 2, tol: 1e-6, x: T`L'Hôpital twice: \(\frac{${a}e^{${a}x} - ${a}}{2x} \to \frac{${a * a}e^{${a}x}}{2} \to \frac{${a * a}}{2}\).`, v: `(lambda x: limit((exp(${a}*x) - 1 - ${a}*x)/x**2, x, 0))(${x})` }; }
        const a = R.int(1, 3); return { q: T`Find \(\lim_{x\to0}\frac{${a}x - \sin ${a}x}{x^3}\).`, answer: a ** 3 / 6, tol: 1e-6, x: T`Three applications of L'Hôpital, or \(\sin u = u - \frac{u^3}{6} + \cdots\): the limit is \(\frac{${a ** 3}}{6}\).`, v: `(lambda x: limit((${a}*x - sin(${a}*x))/x**3, x, 0))(${x})` };
      } },
      { id: 'ra-tay', make(R) {
        if (R.int(0, 1)) { const k = R.int(2, 8); let n = 0; while (3 / fct(n + 1) >= 10 ** -k) n++;
          return { q: T`Using the bound \(|R_n| < \frac{3}{(n + 1)!}\), find the smallest \(n\) for which \(\sum_{j=0}^n\frac1{j!}\) is guaranteed within \(10^{-${k}}\) of \(e\).`, answer: n, x: T`Need \((n + 1)! > 3\cdot10^{${k}}\). \(${n}! = ${fct(n)}\) is too small and \(${n + 1}! = ${fct(n + 1)}\) works, so \(n = ${n}\).`, v: `min(n for n in range(40) if Rational(3, factorial(n + 1)) < Rational(1, 10**${k}))` }; }
        const xx = R.pick([0.5, 1, 2]), k = R.int(2, 6); let n = 0; while (xx ** (n + 1) / fct(n + 1) >= 10 ** -k) n++;
        return { q: T`The Taylor polynomial of \(\sin x\) at 0 of degree \(n\) has error at most \(\frac{|x|^{n+1}}{(n + 1)!}\). Find the smallest \(n\) that guarantees error below \(10^{-${k}}\) at \(x = ${xx}\).`, answer: n, x: T`Test \(n = 0, 1, 2, \ldots\): \(\frac{${xx}^{${n + 1}}}{${n + 1}!} \approx ${(xx ** (n + 1) / fct(n + 1)).toExponential(2).replace(/e([-+]\d+)/, (m, e) => `\\times10^{${+e}}`)}\) is the first below \(10^{-${k}}\).`, v: `min(n for n in range(40) if nsimplify(${xx})**(n + 1)/factorial(n + 1) < Rational(1, 10**${k}))` };
      } }
    ],
    [U[8]]: [{ id: 'ra-riem', make(R) {
      const p = R.int(1, 3), b = R.int(1, 3), n = R.pick([2, 4, 5, 8, 10]), up = R.int(0, 2), h = b / n;
      let U = 0, L = 0; for (let i = 1; i <= n; i++) { U += (i * h) ** p * h; L += ((i - 1) * h) ** p * h; }
      const ask = ['upper sum', 'lower sum', 'difference \\(U - L\\)'][up], ans = [U, L, U - L][up];
      return { q: T`For \(f(x) = x^{${p}}\) on \([0, ${b}]\) with ${n} equal subintervals, find the ${ask}.`, answer: ans, tol: 1e-6,
        x: T`\(f\) is increasing, so the upper sum uses right endpoints and the lower sum left endpoints, with width \(h = ${R.fmt(h, 4)}\). \(U \approx ${R.fmt(U, 5)}\), \(L \approx ${R.fmt(L, 5)}\), and \(U - L = f(${b})\cdot h = ${R.fmt(U - L, 5)}\).`,
        v: `(lambda h: [sum((i*h)**${p}*h for i in range(1, ${n + 1})), sum(((i - 1)*h)**${p}*h for i in range(1, ${n + 1})), Rational(${b ** p})*h][${up}])(Rational(${b}, ${n}))` };
    } }],
    [U[9]]: [{ id: 'ra-sup', make(R) {
      const k = R.int(0, 2), n = R.int(2, 9);
      if (k === 0) return { q: T`\(f_n(x) = x^n(1 - x)\) on \([0, 1]\) tends to 0. Find \(\sup|f_{${n}}(x)|\) to four decimals.`, answer: n ** n / (n + 1) ** (n + 1), tol: 0.0001, x: T`\(f_n' = x^{n-1}(n - (n + 1)x) = 0\) at \(x = \frac{${n}}{${n + 1}}\), giving \(\frac{${n}^{${n}}}{${n + 1}^{${n + 1}}}\). This tends to 0, so the convergence is uniform.`, v: `float(np.max((lambda x: x**${n}*(1 - x))(np.linspace(0, 1, 2000001))))` };
      if (k === 1) return { q: T`\(f_n(x) = \frac{x}{1 + nx^2}\) on \([0, \infty)\) tends to 0. Find \(\sup f_{${n}}(x)\) to four decimals.`, answer: 1 / (2 * Math.sqrt(n)), tol: 0.0001, x: T`Maximum at \(x = \frac{1}{\sqrt{${n}}}\): \(\frac{1}{2\sqrt{${n}}}\). This tends to 0, so the convergence is uniform.`, v: `float(np.max((lambda x: x/(1 + ${n}*x**2))(np.linspace(0, 10, 2000001))))` };
      return { q: T`\(f_n(x) = \frac{nx}{1 + n^2x^2}\) on \([0, \infty)\) tends to 0. Find \(\sup f_{${n}}(x)\).`, answer: 0.5, tol: 0.0001, x: T`Maximum at \(x = \frac1{${n}}\), value \(\frac12\) for every \(n\). The sup does not tend to 0, so the convergence is not uniform.`, v: `float(np.max((lambda x: ${n}*x/(1 + ${n * n}*x**2))(np.linspace(0, 10, 2000001))))` };
    } }],
    [U[10]]: [{ id: 'ra-rad', make(R) {
      const k = R.int(0, 2), c = R.int(2, 6), p = R.int(1, 3), m = "Symbol('m', positive=True, integer=True)";
      if (k === 0) return { q: T`Find the radius of convergence of \(\sum_{n\ge1}\frac{n^{${p}}}{${c}^n}x^n\).`, answer: c, x: T`\(\left|\frac{c_n}{c_{n+1}}\right| = ${c}\left(\frac{n}{n + 1}\right)^{${p}} \to ${c}\).`, v: `(lambda m: limit(abs((m**${p}/${c}**m)/((m + 1)**${p}/${c}**(m + 1))), m, oo))(${m})` };
      if (k === 1) return { q: T`Find the radius of convergence of \(\sum_{n\ge1}\frac{${c}^n}{n^{${p}}}x^n\).`, answer: 1 / c, tol: 1e-6, x: T`Ratio \(\left|\frac{c_n}{c_{n+1}}\right| \to \frac1{${c}}\). Powers of \(n\) do not change \(R\).`, v: `(lambda m: limit(abs((${c}**m/m**${p})/(${c}**(m + 1)/(m + 1)**${p})), m, oo))(${m})` };
      const s = c * c;
      return { q: T`Find the radius of convergence of \(\sum_{n\ge0}\frac{x^{2n}}{${s}^n}\).`, answer: c, x: T`With \(u = x^2\), it is geometric in \(\frac{u}{${s}}\): need \(x^2 < ${s}\), so \(R = ${c}\).`, v: `(lambda m: 1/limit((Rational(1, ${s})**m)**(Rational(1, 2)/m), m, oo))(${m})` };
    } }],
    [U[11]]: [
      { id: 'ra-met', make(R) {
        const dim = R.int(2, 3), P = Array.from({ length: dim }, () => R.int(-5, 5)), Q = Array.from({ length: dim }, () => R.int(-5, 5)), d = P.map((v, i) => Math.abs(v - Q[i]));
        if (d.every(v => v === 0)) return this.make(R);
        const k = R.int(0, 2), name = ['d_1', 'd_2', 'd_\\infty'][k], ans = [d.reduce((s, v) => s + v, 0), Math.sqrt(d.reduce((s, v) => s + v * v, 0)), Math.max(...d)][k];
        return { q: T`Find \(${name}\) between \((${P.join(', ')})\) and \((${Q.join(', ')})\)${k === 1 ? ', to three decimals' : ''}.`, answer: ans, tol: k === 1 ? 0.001 : 1e-6, x: T`Coordinate differences: \(${d.join(', ')}\). \(d_1 = ${d.reduce((s, v) => s + v, 0)}\), \(d_2 = \sqrt{${d.reduce((s, v) => s + v * v, 0)}}\), \(d_\infty = ${Math.max(...d)}\).`,
          v: `(lambda d: [sum(d), sqrt(sum(t*t for t in d)), max(d)][${k}])([abs(a - b) for a, b in zip([${P}], [${Q}])])` };
      } },
      { id: 'ra-top', make(R) {
        const [s, k] = R.pick(TOP);
        return { q: T`As a subset of \(\mathbb R\), which best describes ${s}?`, c: [TOPW[k], ...TOPW.filter((_, i) => i !== k)], x: ['Closed and bounded, so compact by Heine–Borel.', 'Closed (it contains its limit points) but unbounded.', 'Every point has a small interval around it inside the set; it is not closed.', 'Not open (some point has no interval inside) and not closed (a limit point is missing).'][k], key: 't' + k, vk: `'t${k}'` };
      } }
    ]
  } });
})();
