registerLearn('precalc', [
  { title: 'Functions and domain', skill: 'Functions', body: T`
<p>A function assigns each input exactly one output; a graph is a function iff every vertical line meets it at most once. The domain is every input that gives a real output. Restrictions come from three places:</p>
<p>Denominators cannot be 0. Even roots need a nonnegative inside. Logarithms need a positive argument.</p>
<p>Even functions (\(f(-x) = f(x)\)) are symmetric about the \(y\)-axis; odd functions (\(f(-x) = -f(x)\)) are symmetric about the origin.</p>`,
    ex: { q: T`Find the domain of \(f(x) = \ln(4 - x^2)\) and decide whether \(f\) is even or odd.`, a: T`
<p>Need \(4 - x^2 > 0\), so \(-2 < x < 2\). Since \(f(-x) = \ln(4 - x^2) = f(x)\), \(f\) is even.</p>` },
    trap: T`Including the endpoints of a log's domain. \(\ln 0\) is undefined.` },

  { title: 'Transformations', skill: 'Transformations', body: T`
<table class="tt"><tr><th>Equation</th><th>Effect on the graph of \(f\)</th></tr>
<tr><td>\(f(x) + k\)</td><td>up \(k\)</td></tr>
<tr><td>\(f(x - h)\)</td><td>right \(h\)</td></tr>
<tr><td>\(-f(x)\)</td><td>reflect across \(x\)-axis</td></tr>
<tr><td>\(f(-x)\)</td><td>reflect across \(y\)-axis</td></tr>
<tr><td>\(a f(x)\)</td><td>vertical stretch by \(a\)</td></tr>
<tr><td>\(f(bx)\)</td><td>horizontal compression by \(b\)</td></tr></table>
<p>Changes outside \(f\) act on outputs as written; changes inside act on inputs in reverse.</p>`,
    ex: { q: T`Describe \(y = -2\sqrt{x + 3} - 1\) starting from \(y = \sqrt x\).`, a: T`
<p>Shift left 3, stretch vertically by 2, reflect across the \(x\)-axis, shift down 1. The starting point \((0, 0)\) moves to \((-3, -1)\), and the graph heads down and to the right.</p>` },
    trap: T`Shifting \(f(x - 3)\) left. It moves right: you need a larger \(x\) to reach the same input.` },

  { title: 'Composition and inverses', skill: 'Composition and inverses', body: T`
<p>\((f\circ g)(x) = f(g(x))\): apply \(g\), then \(f\). Order matters.</p>
<p>A one-to-one function (passes the horizontal line test) has an inverse with \(f(f^{-1}(x)) = x\). To find it, swap \(x\) and \(y\) and solve for \(y\). The graphs of \(f\) and \(f^{-1}\) are reflections across \(y = x\), and their domain and range trade places.</p>`,
    ex: { q: T`Find the inverse of \(f(x) = \dfrac{2x + 1}{x - 3}\).`, a: T`
<p>Swap: \(x = \frac{2y + 1}{y - 3}\). Then \(xy - 3x = 2y + 1\), so \(y(x - 2) = 3x + 1\):</p>
\[f^{-1}(x) = \frac{3x + 1}{x - 2}\]` },
    trap: T`Writing \(f^{-1}(x) = \frac1{f(x)}\). The inverse undoes \(f\); the reciprocal does not.` },

  { title: 'Polynomial functions', skill: 'Polynomial functions', body: T`
<p>End behavior follows the leading term \(a_nx^n\). Even degree: both ends point the same way. Odd degree: opposite ways. A negative leading coefficient flips the picture.</p>
<p>A zero of odd multiplicity crosses the axis; even multiplicity touches and turns. Rational root theorem: rational zeros have the form \(\pm\frac{\text{factor of constant}}{\text{factor of leading coefficient}}\). A degree-\(n\) polynomial has exactly \(n\) complex zeros counted with multiplicity.</p>`,
    ex: { q: T`Find the zeros of \(x^3 - 4x^2 + x + 6\).`, a: T`
<p>Candidates \(\pm1, \pm2, \pm3, \pm6\). Test \(-1\): \(-1 - 4 - 1 + 6 = 0\). Divide by \(x + 1\) to get \(x^2 - 5x + 6 = (x - 2)(x - 3)\). Zeros: \(-1, 2, 3\).</p>` },
    trap: T`Judging end behavior from the first term written rather than the highest-degree term.` },

  { title: 'Rational functions', skill: 'Rational functions', body: T`
<p>Factor numerator and denominator. A factor that cancels gives a hole; a factor left in the denominator gives a vertical asymptote.</p>
<table class="tt"><tr><th>Degrees (top \(n\), bottom \(m\))</th><th>End behavior</th></tr>
<tr><td>\(n < m\)</td><td>horizontal asymptote \(y = 0\)</td></tr>
<tr><td>\(n = m\)</td><td>\(y = \) ratio of leading coefficients</td></tr>
<tr><td>\(n = m + 1\)</td><td>slant asymptote from long division</td></tr></table>`,
    ex: { q: T`Analyze \(f(x) = \dfrac{2x^2 - 2}{x^2 - x - 2}\).`, a: T`
<p>\(f(x) = \frac{2(x - 1)(x + 1)}{(x - 2)(x + 1)}\). Hole at \(x = -1\) (at height \(\frac{2(-2)}{-3} = \frac43\)); vertical asymptote \(x = 2\); horizontal asymptote \(y = 2\).</p>` },
    trap: T`Declaring a vertical asymptote at every zero of the original denominator before cancelling.` },

  { title: 'Exponential functions', skill: 'Exponentials', body: T`
<p>\(f(x) = ab^x\) grows if \(b > 1\) and decays if \(0 < b < 1\). The natural base \(e \approx 2.71828\) appears whenever growth is continuous.</p>
\[A = P\left(1 + \frac rn\right)^{nt} \qquad A = Pe^{rt} \qquad N = N_0\left(\tfrac12\right)^{t/h}\]
<p>(compounded \(n\) times per year; compounded continuously; half-life \(h\)).</p>`,
    ex: { q: T`$1000 earns 5% compounded monthly for 10 years. Find the balance.`, a: T`
<p>\(1000\left(1 + \frac{0.05}{12}\right)^{120} \approx 1647.01\). Continuous compounding would give \(1000e^{0.5} \approx 1648.72\).</p>` },
    trap: T`Using 5 instead of 0.05 for the rate.` },

  { title: 'Logarithms', skill: 'Logarithms', body: T`
<p>\(\log_b x = y\) means \(b^y = x\). \(\ln\) is base \(e\); \(\log\) alone usually means base 10.</p>
\[\log(MN) = \log M + \log N \qquad \log\tfrac MN = \log M - \log N \qquad \log M^p = p\log M\]
<p>Change of base: \(\log_b x = \frac{\ln x}{\ln b}\). Inverse pairs: \(b^{\log_b x} = x\) and \(\log_b b^x = x\).</p>`,
    ex: { q: T`Expand \(\log\dfrac{x^2\sqrt y}{z}\).`, a: T`
\[2\log x + \tfrac12\log y - \log z\]` },
    trap: T`Inventing a rule for \(\log(M + N)\). There is none.` },

  { title: 'Exponential and logarithmic equations', skill: 'Logarithms', body: T`
<p>If the variable is in an exponent, take a logarithm of both sides. If it is inside a log, combine logs into one and rewrite in exponential form. Always check log solutions: arguments must be positive.</p>`,
    ex: { q: T`Solve \(\log_2 x + \log_2(x - 2) = 3\).`, a: T`
<p>Combine: \(\log_2[x(x - 2)] = 3\), so \(x^2 - 2x = 8\), giving \(x = 4\) or \(x = -2\). Reject \(-2\) because \(\log_2(-2)\) is undefined. Answer: \(x = 4\).</p>` },
    trap: T`Keeping extraneous roots after combining logs.` },

  { title: 'Sequences and series', skill: 'Sequences', body: T`
<table class="tt"><tr><th></th><th>Arithmetic</th><th>Geometric</th></tr>
<tr><td>\(n\)th term</td><td>\(a_1 + (n - 1)d\)</td><td>\(a_1r^{n-1}\)</td></tr>
<tr><td>sum of \(n\)</td><td>\(\frac{n(a_1 + a_n)}{2}\)</td><td>\(a_1\frac{1 - r^n}{1 - r}\)</td></tr>
<tr><td>infinite sum</td><td>diverges (\(d \ne 0\))</td><td>\(\frac{a_1}{1 - r}\) if \(|r| < 1\)</td></tr></table>
<p>Sigma notation: \(\sum_{k=1}^n c = cn\), \(\sum_{k=1}^n k = \frac{n(n+1)}{2}\).</p>`,
    ex: { q: T`Evaluate \(\displaystyle\sum_{k=1}^{20}(3k + 2)\).`, a: T`
<p>\(3\sum k + \sum 2 = 3\cdot\frac{20\cdot21}{2} + 40 = 630 + 40 = 670\).</p>` },
    trap: T`Applying the infinite geometric formula when \(|r| \ge 1\). The series diverges.` },

  { title: 'Conic sections', skill: 'Conics', body: T`
<table class="tt"><tr><th>Conic</th><th>Standard form (center \((h,k)\))</th></tr>
<tr><td>circle</td><td>\((x - h)^2 + (y - k)^2 = r^2\)</td></tr>
<tr><td>parabola</td><td>\((x - h)^2 = 4p(y - k)\)</td></tr>
<tr><td>ellipse</td><td>\(\frac{(x - h)^2}{a^2} + \frac{(y - k)^2}{b^2} = 1\)</td></tr>
<tr><td>hyperbola</td><td>\(\frac{(x - h)^2}{a^2} - \frac{(y - k)^2}{b^2} = 1\)</td></tr></table>
<p>Complete the square in \(x\) and \(y\) to reach standard form. For ellipses \(c^2 = a^2 - b^2\); for hyperbolas \(c^2 = a^2 + b^2\), where \(c\) locates the foci.</p>`,
    ex: { q: T`Identify \(x^2 + y^2 - 4x + 6y - 12 = 0\).`, a: T`
<p>\((x^2 - 4x + 4) + (y^2 + 6y + 9) = 12 + 4 + 9\), so \((x - 2)^2 + (y + 3)^2 = 25\): a circle with center \((2, -3)\) and radius 5.</p>` },
    trap: T`Adding the completing-the-square constants to only one side.` },

  { title: 'Complex numbers', skill: 'Complex numbers', body: T`
<p>\(i^2 = -1\), and powers of \(i\) cycle: \(i, -1, -i, 1\). Add and multiply like binomials. The conjugate of \(a + bi\) is \(a - bi\), and \((a + bi)(a - bi) = a^2 + b^2\). Divide by multiplying top and bottom by the conjugate of the denominator.</p>
<p>Polar form: \(a + bi = r(\cos\theta + i\sin\theta)\) with \(r = \sqrt{a^2 + b^2}\). De Moivre: \([r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta + i\sin n\theta)\).</p>`,
    ex: { q: T`Compute \(\dfrac{3 + 2i}{1 - i}\).`, a: T`
\[\frac{(3 + 2i)(1 + i)}{(1 - i)(1 + i)} = \frac{3 + 5i + 2i^2}{2} = \frac{1 + 5i}{2}\]` },
    trap: T`Writing \(\sqrt{-4}\sqrt{-9} = \sqrt{36} = 6\). It is \((2i)(3i) = -6\); the product rule for roots needs nonnegative inputs.` },

  { title: 'Polar coordinates', body: T`
<p>A point is \((r, \theta)\): distance from the origin and angle from the positive \(x\)-axis.</p>
\[x = r\cos\theta \qquad y = r\sin\theta \qquad r^2 = x^2 + y^2 \qquad \tan\theta = \frac yx\]
<p>Choose \(\theta\) in the quadrant of the point; \(\arctan\) alone only returns quadrants I and IV.</p>`,
    ex: { q: T`Convert \((-1, \sqrt3)\) to polar coordinates.`, a: T`
<p>\(r = \sqrt{1 + 3} = 2\). The point is in quadrant II with reference angle \(\frac\pi3\), so \(\theta = \frac{2\pi}{3}\).</p>` },
    trap: T`Taking \(\theta = \arctan(-\sqrt3) = -\frac\pi3\), which points into quadrant IV.` }
]);
