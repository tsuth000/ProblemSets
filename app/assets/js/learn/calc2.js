registerLearn('calc2', [
  { title: 'Integration by parts', skill: 'Integration techniques', body: T`
\[\int u\,dv = uv - \int v\,du\]
<p>Choose \(u\) by LIATE: logarithmic, inverse trig, algebraic, trigonometric, exponential. Repeated parts on \(x^ne^x\) or \(x^n\sin x\) goes faster in a table: differentiate \(u\) down to 0, integrate \(dv\) alongside, alternate signs. Integrals like \(\int e^x\sin x\,dx\) return to themselves; solve for the integral algebraically.</p>`,
    ex: { q: T`Evaluate \(\displaystyle\int x^2e^x\,dx\).`, a: T`
<p>Table: derivatives \(x^2, 2x, 2, 0\); integrals \(e^x, e^x, e^x\); signs \(+, -, +\).</p>
\[\begin{aligned}&\textstyle\int x^2e^x\,dx\\ &= x^2e^x - 2xe^x + 2e^x + C\\ &= e^x(x^2 - 2x + 2) + C\end{aligned}\]` },
    trap: T`Picking \(u = e^x\) in \(\int xe^x\,dx\). The new integral \(\int\frac{x^2}{2}e^x\,dx\) is harder than the original.` },

  { title: 'Trigonometric integrals', skill: 'Integration techniques', body: T`
<p>\(\int\sin^mx\cos^nx\,dx\): if either power is odd, save one factor of it for \(du\) and convert the rest with \(\sin^2 + \cos^2 = 1\). If both are even, use power reduction: \(\sin^2x = \frac{1 - \cos2x}{2}\), \(\cos^2x = \frac{1 + \cos2x}{2}\).</p>
<p>For \(\tan\) and \(\sec\): save \(\sec^2x\) for \(u = \tan x\), or \(\sec x\tan x\) for \(u = \sec x\).</p>`,
    ex: { q: T`Evaluate \(\displaystyle\int\sin^3x\,dx\).`, a: T`
<p>\(\int(1 - \cos^2x)\sin x\,dx\). With \(u = \cos x\), \(du = -\sin x\,dx\):</p>
\[-\cos x + \frac{\cos^3x}{3} + C\]` },
    trap: T`Using power reduction on an odd power. Peeling off one factor is faster.` },

  { title: 'Trigonometric substitution', skill: 'Integration techniques', body: T`
<table class="tt"><tr><th>Expression</th><th>Substitute</th><th>Identity used</th></tr>
<tr><td>\(\sqrt{a^2 - x^2}\)</td><td>\(x = a\sin\theta\)</td><td>\(1 - \sin^2 = \cos^2\)</td></tr>
<tr><td>\(\sqrt{a^2 + x^2}\)</td><td>\(x = a\tan\theta\)</td><td>\(1 + \tan^2 = \sec^2\)</td></tr>
<tr><td>\(\sqrt{x^2 - a^2}\)</td><td>\(x = a\sec\theta\)</td><td>\(\sec^2 - 1 = \tan^2\)</td></tr></table>
<p>Convert back to \(x\) with a reference triangle.</p>`,
    ex: { q: T`Evaluate \(\displaystyle\int_0^1\sqrt{1 - x^2}\,dx\).`, a: T`
<p>\(x = \sin\theta\), \(dx = \cos\theta\,d\theta\); limits \(0\) to \(\frac\pi2\).</p>
\[\int_0^{\pi/2}\cos^2\theta\,d\theta = \frac\pi4\]
<p>Check: it is a quarter of the unit disk.</p>` },
    trap: T`Forgetting to replace \(dx\) by \(a\cos\theta\,d\theta\).` },

  { title: 'Partial fractions', skill: 'Integration techniques', body: T`
<p>For a rational function with numerator degree below the denominator's (long divide first if not), factor the denominator and split:</p>
<table class="tt"><tr><th>Factor</th><th>Terms</th></tr>
<tr><td>\((x - a)\)</td><td>\(\frac{A}{x - a}\)</td></tr>
<tr><td>\((x - a)^2\)</td><td>\(\frac{A}{x - a} + \frac{B}{(x - a)^2}\)</td></tr>
<tr><td>\(x^2 + bx + c\) (irreducible)</td><td>\(\frac{Ax + B}{x^2 + bx + c}\)</td></tr></table>
<p>Find constants by plugging in roots or matching coefficients.</p>`,
    ex: { q: T`Evaluate \(\displaystyle\int\frac{5x - 1}{x^2 - x - 2}\,dx\).`, a: T`
<p>\(\frac{5x - 1}{(x - 2)(x + 1)} = \frac A{x - 2} + \frac B{x + 1}\), so \(5x - 1 = A(x + 1) + B(x - 2)\). \(x = 2\): \(A = 3\). \(x = -1\): \(B = 2\).</p>
\[3\ln|x - 2| + 2\ln|x + 1| + C\]` },
    trap: T`Skipping long division when the numerator's degree is not lower.` },

  { title: 'Improper integrals', skill: 'Improper integrals', body: T`
<p>Replace the infinite limit or the point of discontinuity with a variable and take a limit. The integral converges if the limit is finite.</p>
\[\int_1^\infty\frac{dx}{x^p}\text{ converges iff }p > 1 \qquad \int_0^1\frac{dx}{x^p}\text{ converges iff }p < 1\]
<p>Comparison: if \(0 \le f \le g\) and \(\int g\) converges, so does \(\int f\); if \(\int f\) diverges, so does \(\int g\).</p>`,
    ex: { q: T`Evaluate \(\displaystyle\int_0^\infty e^{-2x}\,dx\).`, a: T`
\[\lim_{b\to\infty}\left[-\tfrac12e^{-2x}\right]_0^b = 0 + \tfrac12 = \tfrac12\]` },
    trap: T`Missing a discontinuity inside the interval. \(\int_{-1}^1\frac{dx}{x^2}\) diverges, though careless evaluation gives \(-2\).` },

  { title: 'Area between curves', skill: 'Applications', body: T`
\[A = \int_a^b\big(f(x) - g(x)\big)\,dx\]<p class="ctr">with \(f \ge g\) on \([a, b]\)</p>
<p>Find intersections to set the limits. If the curves cross, split the integral or integrate \(|f - g|\). When curves are easier as functions of \(y\), integrate right minus left with respect to \(y\).</p>`,
    ex: { q: T`Find the area between \(y = x^2\) and \(y = 2x\).`, a: T`
<p>They meet at \(x = 0, 2\), with \(2x\) on top:</p>
\[\int_0^2(2x - x^2)\,dx = 4 - \tfrac83 = \tfrac43\]` },
    trap: T`Subtracting in the wrong order, which gives a negative area.` },

  { title: 'Volumes of revolution', skill: 'Applications', body: T`
<p><b>Disk/washer</b> (slices perpendicular to the axis): \(V = \pi\int(R^2 - r^2)\,dx\), outer radius \(R\), inner \(r\).</p>
<p><b>Shell</b> (strips parallel to the axis): \(V = 2\pi\int(\text{radius})(\text{height})\,dx\).</p>
<p>Radii are measured from the axis of rotation; for an axis such as \(y = -1\), add 1.</p>`,
    ex: { q: T`The region between \(y = x\) and \(y = x^2\) is rotated about the \(x\)-axis. Find the volume two ways.`, a: T`
<p>Washers: \(\pi\int_0^1(x^2 - x^4)\,dx = \pi\left(\frac13 - \frac15\right) = \frac{2\pi}{15}\).</p>
<p>Shells (in \(y\), radius \(y\), height \(\sqrt y - y\)): \(2\pi\int_0^1y(\sqrt y - y)\,dy = 2\pi\left(\frac25 - \frac13\right) = \frac{2\pi}{15}\).</p>` },
    trap: T`Writing \(\pi\int(R - r)^2\,dx\) for washers. It is \(R^2 - r^2\).` },

  { title: 'Arc length and work', skill: 'Applications', body: T`
\[L = \int_a^b\sqrt{1 + (y')^2}\,dx \qquad W = \int_a^bF(x)\,dx\]
<p>Springs: \(F = kx\) (Hooke's law). Pumping liquid: integrate (weight of a thin layer) times (distance it moves).</p>`,
    ex: { q: T`Find the length of \(y = \tfrac23x^{3/2}\) on \([0, 3]\).`, a: T`
<p>\(y' = \sqrt x\), so \(\sqrt{1 + x}\):</p>
\[\int_0^3\sqrt{1 + x}\,dx = \tfrac23(1 + x)^{3/2}\Big|_0^3 = \tfrac23(8 - 1) = \tfrac{14}{3}\]` },
    trap: T`Forgetting to square the derivative inside the root.` },

  { title: 'Sequences', skill: 'Sequences', body: T`
<p>A sequence converges if \(\lim_{n\to\infty}a_n\) is finite. Use function limits (including L'Hôpital) on \(f(x)\) with \(f(n) = a_n\). A bounded monotonic sequence converges.</p>
<table class="tt"><tr><th>Sequence</th><th>Limit</th></tr>
<tr><td>\(r^n\), \(|r| < 1\)</td><td>0</td></tr><tr><td>\(\frac{\ln n}{n}\)</td><td>0</td></tr>
<tr><td>\(n^{1/n}\)</td><td>1</td></tr><tr><td>\(\left(1 + \frac xn\right)^n\)</td><td>\(e^x\)</td></tr>
<tr><td>\(\frac{x^n}{n!}\)</td><td>0</td></tr></table>`,
    ex: { q: T`Find \(\displaystyle\lim_{n\to\infty}\frac{3n^2 + n}{2n^2 - 5}\).`, a: T`
<p>Divide by \(n^2\): \(\frac{3 + 1/n}{2 - 5/n^2} \to \frac32\).</p>` },
    trap: T`Confusing a sequence's limit with a series' sum. \(\frac1n \to 0\), yet \(\sum\frac1n\) diverges.` },

  { title: 'Series basics', skill: 'Series tests', body: T`
<p>\(\sum a_n\) converges if its partial sums \(S_N = a_1 + \cdots + a_N\) approach a limit.</p>
<p><b>Divergence test:</b> if \(a_n \not\to 0\), the series diverges. If \(a_n \to 0\), the test says nothing. <b>Geometric:</b> \(\sum ar^n\) converges to \(\frac{\text{first term}}{1 - r}\) iff \(|r| < 1\). <b>Telescoping:</b> write terms as differences so most cancel.</p>`,
    ex: { q: T`Evaluate \(\displaystyle\sum_{n=1}^\infty\frac{1}{n(n + 1)}\).`, a: T`
<p>\(\frac1{n(n+1)} = \frac1n - \frac1{n+1}\), so \(S_N = 1 - \frac1{N + 1} \to 1\).</p>` },
    trap: T`Using the divergence test to prove convergence.` },

  { title: 'Convergence tests', skill: 'Series tests', body: T`
<table class="tt"><tr><th>Test</th><th>Use when</th></tr>
<tr><td>p-series</td><td>\(\sum\frac1{n^p}\): converges iff \(p > 1\)</td></tr>
<tr><td>comparison</td><td>terms are bounded by a known series</td></tr>
<tr><td>limit comparison</td><td>terms behave like a known series for large \(n\)</td></tr>
<tr><td>integral</td><td>\(a_n = f(n)\), \(f\) positive and decreasing</td></tr>
<tr><td>alternating</td><td>\((-1)^nb_n\) with \(b_n\) decreasing to 0</td></tr>
<tr><td>ratio</td><td>factorials or exponentials</td></tr>
<tr><td>root</td><td>\(n\)th powers</td></tr></table>
<p>Ratio and root tests: limit below 1 converges, above 1 diverges, equal to 1 tells you nothing.</p>`,
    ex: { q: T`Does \(\displaystyle\sum\frac{n}{n^3 + 1}\) converge? Does \(\displaystyle\sum\frac{n!}{10^n}\)?`, a: T`
<p>First: \(\frac{n}{n^3 + 1}\big/\frac1{n^2} \to 1\), and \(\sum\frac1{n^2}\) converges, so it converges by limit comparison.</p>
<p>Second: the ratio is \(\frac{n + 1}{10} \to \infty\), so it diverges.</p>` },
    trap: T`Comparing in the wrong direction: being smaller than a divergent series proves nothing.` },

  { title: 'Absolute and conditional convergence', skill: 'Series tests', body: T`
<p>\(\sum a_n\) converges absolutely if \(\sum|a_n|\) converges; that implies convergence. If \(\sum a_n\) converges but \(\sum|a_n|\) diverges, it converges conditionally.</p>
<p>Alternating series error bound: stopping after \(N\) terms leaves an error at most \(b_{N+1}\), the first omitted term.</p>`,
    ex: { q: T`Classify \(\displaystyle\sum\frac{(-1)^{n+1}}{n}\) and bound the error after 99 terms.`, a: T`
<p>It converges (alternating test) to \(\ln2\), but \(\sum\frac1n\) diverges: conditional. Error \(\le \frac1{100}\).</p>` },
    trap: T`Assuming convergence of \(\sum a_n\) implies convergence of \(\sum|a_n|\).` },

  { title: 'Power series', skill: 'Power series', body: T`
<p>\(\sum c_n(x - a)^n\) converges on an interval centered at \(a\) with radius \(R\): absolutely for \(|x - a| < R\), divergent for \(|x - a| > R\). Find \(R\) with the ratio test, then test the two endpoints separately.</p>
<p>Inside the interval, a power series can be differentiated and integrated term by term with the same \(R\).</p>`,
    ex: { q: T`Find the interval of convergence of \(\displaystyle\sum_{n=1}^\infty\frac{x^n}{n\,3^n}\).`, a: T`
<p>Ratio: \(\frac{|x|}{3}\cdot\frac{n}{n + 1} \to \frac{|x|}3\), so \(R = 3\). At \(x = 3\): harmonic, diverges. At \(x = -3\): alternating harmonic, converges. Interval \([-3, 3)\).</p>` },
    trap: T`Skipping the endpoints. The ratio test is inconclusive there.` },

  { title: 'Taylor and Maclaurin series', skill: 'Taylor series', body: T`
\[f(x) = \sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x - a)^n\]
<table class="tt"><tr><th>Function</th><th>Maclaurin series</th><th>Valid for</th></tr>
<tr><td>\(e^x\)</td><td>\(\sum\frac{x^n}{n!}\)</td><td>all \(x\)</td></tr>
<tr><td>\(\sin x\)</td><td>\(\sum\frac{(-1)^nx^{2n+1}}{(2n+1)!}\)</td><td>all \(x\)</td></tr>
<tr><td>\(\cos x\)</td><td>\(\sum\frac{(-1)^nx^{2n}}{(2n)!}\)</td><td>all \(x\)</td></tr>
<tr><td>\(\frac1{1 - x}\)</td><td>\(\sum x^n\)</td><td>\(|x| < 1\)</td></tr>
<tr><td>\(\ln(1 + x)\)</td><td>\(\sum\frac{(-1)^{n+1}x^n}{n}\)</td><td>\(-1 < x \le 1\)</td></tr>
<tr><td>\(\arctan x\)</td><td>\(\sum\frac{(-1)^nx^{2n+1}}{2n+1}\)</td><td>\(|x| \le 1\)</td></tr></table>
<p>Build new series by substituting, multiplying, differentiating, or integrating known ones.</p>`,
    ex: { q: T`Approximate \(e^{0.1}\) with a degree-2 Taylor polynomial, and write the series for \(x^2e^{-x}\).`, a: T`
<p>\(1 + 0.1 + \frac{0.01}{2} = 1.105\) (true value 1.10517).</p>
<p>Substitute \(-x\) and multiply by \(x^2\): \(\sum\frac{(-1)^nx^{n+2}}{n!}\).</p>` },
    trap: T`Dropping the factorial in the coefficient \(\frac{f^{(n)}(a)}{n!}\).` },

  { title: 'Parametric and polar calculus', skill: 'Parametric and polar', body: T`
\[\frac{dy}{dx} = \frac{dy/dt}{dx/dt} \qquad L = \int\sqrt{x'(t)^2 + y'(t)^2}\,dt\]
\[A = \tfrac12\int_\alpha^\beta r^2\,d\theta \qquad L = \int\sqrt{r^2 + (r')^2}\,d\theta\]
<p>For polar slopes, use \(x = r\cos\theta\), \(y = r\sin\theta\) as parametric equations in \(\theta\).</p>`,
    ex: { q: T`Find the area enclosed by \(r = 2\sin\theta\).`, a: T`
<p>The curve traces once for \(0 \le \theta \le \pi\):</p>
\[\tfrac12\int_0^\pi4\sin^2\theta\,d\theta = 2\cdot\tfrac\pi2 = \pi\]
<p>Check: it is a circle of radius 1.</p>` },
    trap: T`Integrating over \(0\) to \(2\pi\) for a curve that traces twice, which doubles the area.` },

  { title: 'Differential equations', skill: 'Differential equations', body: T`
<p><b>Separable</b> \(\frac{dy}{dx} = g(x)h(y)\): move all \(y\) to one side, integrate both sides, apply the initial condition.</p>
<p>Exponential model \(y' = ky\): \(y = y_0e^{kt}\). Logistic \(P' = kP(1 - P/M)\): S-curve approaching carrying capacity \(M\). Euler's method: \(y_{n+1} = y_n + h\,f(x_n, y_n)\).</p>`,
    ex: { q: T`Solve \(\dfrac{dy}{dx} = xy\) with \(y(0) = 2\).`, a: T`
<p>\(\frac{dy}y = x\,dx\), so \(\ln|y| = \frac{x^2}{2} + C\) and \(y = Ae^{x^2/2}\). With \(y(0) = 2\): \(y = 2e^{x^2/2}\).</p>` },
    trap: T`Adding the constant as \(e^{x^2/2} + C\) instead of \(Ce^{x^2/2}\). Apply \(+C\) before exponentiating.` }
]);
