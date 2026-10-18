registerLessons('calc2', {
  'Integration by parts': {
    hook: T`
<p>The product rule says \((uv)' = u'v + uv'\). Integrate both sides and rearrange, and you get integration by parts. It trades one integral for another.</p>
<p>The skill is choosing \(u\) so the new integral is easier. Pick the factor that gets simpler when differentiated: \(x\) becomes 1, and \(\ln x\) becomes \(\frac1x\).</p>`,
    vary: [
      [T`Evaluate \(\displaystyle\int_0^1 xe^x\,dx\).`, 1, T`\(u = x\): \(\left[(x - 1)e^x\right]_0^1 = 0 + 1\).`],
      [T`Evaluate \(\displaystyle\int_0^\pi x\sin x\,dx\).`, Math.PI, T`Same choice \(u = x\), with sine instead of the exponential.`],
      [T`Evaluate \(\displaystyle\int_1^e\ln x\,dx\).`, 1, T`No visible product: use \(u = \ln x\), \(dv = dx\).`],
      [T`Evaluate \(\displaystyle\int_0^1 xe^{2x}\,dx\).`, (Math.E ** 2 + 1) / 4, T`Inner constant 2: \(v = \frac12e^{2x}\).`]
    ]
  },
  'Trigonometric integrals': {
    hook: T`
<p>Powers of sine and cosine are tamed by identities. With an odd power, peel off one factor to serve as \(du\) and convert the rest using \(\sin^2 + \cos^2 = 1\). With only even powers, use the half-angle identity to lower the power.</p>`,
    vary: [
      [T`Evaluate \(\displaystyle\int_0^\pi\sin x\,dx\).`, 2, T`Warm-up.`],
      [T`Evaluate \(\displaystyle\int_0^\pi\sin^2x\,dx\).`, Math.PI / 2, T`Even power: \(\frac{1 - \cos2x}{2}\).`],
      [T`Evaluate \(\displaystyle\int_0^\pi\sin^3x\,dx\).`, 4 / 3, T`Odd power: \((1 - \cos^2x)\sin x\), with \(u = \cos x\).`],
      [T`Evaluate \(\displaystyle\int_0^{2\pi}\sin x\,dx\).`, 0, T`A full period: the top and bottom humps cancel.`]
    ]
  },
  'Trigonometric substitution': {
    hook: T`
<p>\(\sqrt{a^2 - x^2}\) is a leg of a right triangle with hypotenuse \(a\). Substituting \(x = a\sin\theta\) turns the square root into \(a\cos\theta\), and the integral becomes a trig integral. Draw the triangle to convert the answer back to \(x\).</p>
${fig('trigSubTri', {}, T`The triangle behind \(x = a\sin\theta\).`)}`,
    vary: [
      [T`Evaluate \(\displaystyle\int_0^1\sqrt{1 - x^2}\,dx\).`, Math.PI / 4, T`A quarter of the unit disk.`],
      [T`Evaluate \(\displaystyle\int_0^2\sqrt{4 - x^2}\,dx\).`, Math.PI, T`A quarter of a disk of radius 2: four times the area.`],
      [T`Evaluate \(\displaystyle\int_0^1\frac{dx}{1 + x^2}\).`, Math.PI / 4, T`\(x = \tan\theta\) gives \(\arctan x\).`],
      [T`Evaluate \(\displaystyle\int_0^1\frac{dx}{\sqrt{1 - x^2}}\).`, Math.PI / 2, T`\(x = \sin\theta\) gives \(\arcsin x\).`]
    ]
  },
  'Partial fractions': {
    hook: T`
<p>Adding fractions merges them: \(\frac1x - \frac1{x + 1} = \frac{1}{x(x + 1)}\). Partial fractions runs that backward, splitting one hard fraction into simple pieces you can integrate with logarithms.</p>`,
    vary: [
      [T`\(\dfrac{1}{x(x + 1)} = \dfrac Ax + \dfrac{B}{x + 1}\). Find \(A\).`, 1, T`Cover up \(x\) and set \(x = 0\).`],
      [T`Same decomposition. Find \(B\).`, -1, T`Set \(x = -1\).`],
      [T`\(\dfrac{1}{x(x + 2)} = \dfrac Ax + \dfrac{B}{x + 2}\). Find \(A\).`, 0.5, T`At \(x = 0\) the other factor is 2.`],
      [T`\(\dfrac{3}{(x - 1)(x + 2)} = \dfrac{A}{x - 1} + \dfrac{B}{x + 2}\). Find \(A\).`, 1, T`At \(x = 1\): \(\frac{3}{3}\).`]
    ]
  },
  'Improper integrals': {
    hook: T`
<p>Can an infinitely long region have finite area? Yes, if it thins out fast enough. The area under \(\frac1{x^2}\) from 1 onward is exactly 1. Under \(\frac1x\), which thins more slowly, the area grows forever.</p>
${fig('improper', {}, 'Push the upper limit and compare the two areas.')}`,
    vary: [
      [T`Evaluate \(\displaystyle\int_1^\infty\frac{dx}{x^2}\).`, 1, T`\(\left[-\frac1x\right]_1^\infty\).`],
      [T`Evaluate \(\displaystyle\int_1^\infty\frac{dx}{x^3}\).`, 0.5, T`A faster-shrinking integrand, a smaller area.`],
      [T`Evaluate \(\displaystyle\int_2^\infty\frac{dx}{x^2}\).`, 0.5, T`Starting later removes area.`],
      [T`Evaluate \(\displaystyle\int_0^\infty e^{-x}\,dx\).`, 1, T`Exponential decay is fast enough.`],
      [T`Does \(\displaystyle\int_1^\infty\frac{dx}{\sqrt x}\) converge?`, ['No, it diverges', 'Yes'], T`\(p = \frac12 \le 1\).`]
    ]
  },
  'Area between curves': {
    hook: T`
<p>The area between two curves is top minus bottom, added up across the interval. Find where the curves meet to set the limits.</p>
${fig('areaBetween', {}, T`\(\int_0^2 (2x - x^2)\,dx\).`)}`,
    vary: [
      [T`Find the area between \(y = x\) and \(y = x^2\).`, 1 / 6, T`They meet at 0 and 1.`],
      [T`Find the area between \(y = 2x\) and \(y = x^2\).`, 4 / 3, T`They now meet at 0 and 2.`],
      [T`Find the area between \(y = 3x\) and \(y = x^2\).`, 4.5, T`The pattern is \(\frac{k^3}{6}\).`],
      [T`Find the area between \(y = 4 - x^2\) and the \(x\)-axis.`, 32 / 3, T`The axis is the bottom curve, \(y = 0\).`]
    ]
  },
  'Volumes of revolution': {
    hook: T`
<p>Spin a flat region around an axis and it sweeps out a solid. Slice the solid like a loaf of bread. Each slice is a disk, or a washer (a disk with a hole), and its volume is \(\pi R^2\,dx\) minus the hole. Add up the slices.</p>
${fig('washer', {}, 'A washer slice of the region between y = x and y = x² spun around the x-axis.')}`,
    vary: [
      [T`Rotate the region under \(y = x\) on \([0, 1]\) about the \(x\)-axis. Give the volume divided by \(\pi\).`, 1 / 3, T`A cone: \(\int_0^1 x^2\,dx\).`],
      [T`Same, on \([0, 3]\). Volume divided by \(\pi\)?`, 9, T`Triple the size, 27 times the volume.`],
      [T`Rotate the region under \(y = \sqrt x\) on \([0, 4]\). Volume divided by \(\pi\)?`, 8, T`\(\int_0^4 x\,dx\).`],
      [T`Rotate the region between \(y = x\) and \(y = x^2\). Volume divided by \(\pi\)?`, 2 / 15, T`Washers: \(\int_0^1 (x^2 - x^4)\,dx\).`]
    ]
  },
  'Arc length and work': {
    hook: T`
<p>Approximate a curve by short straight segments. Each has length \(\sqrt{dx^2 + dy^2}\) by Pythagoras. Factor out \(dx\) and add them up: \(L = \int\sqrt{1 + (y')^2}\,dx\).</p>
${fig('arcLength', {}, 'More, shorter segments trace the curve more closely.')}
<p>Work follows the same pattern: force times distance, added up when the force changes along the way.</p>`,
    vary: [
      [T`Find the length of \(y = \tfrac34x\) from \(x = 0\) to \(x = 4\).`, 5, T`A straight line: a 3-4-5 triangle.`],
      [T`Find the length of \(y = 2x\) from \(x = 0\) to \(x = 3\).`, 3 * Math.sqrt(5), T`\(\int_0^3\sqrt{1 + 4}\,dx\).`],
      [T`A spring has \(k = 10\) N/m. Find the work, in J, to stretch it from 0 to 1 m.`, 5, T`\(\int_0^1 10x\,dx\).`],
      [T`Same spring, stretched from 0 to 2 m.`, 20, T`Twice the stretch takes four times the work.`]
    ]
  },
  'Sequences': {
    hook: T`
<p>A sequence is an endless list, and the question is where it settles. \(\frac1n\) settles at 0. \((-1)^n\) never settles; it flips forever. \(\left(1 + \frac1n\right)^n\) settles at \(e \approx 2.718\).</p>`,
    vary: [
      [T`Find \(\displaystyle\lim_{n\to\infty}\frac{n}{n + 1}\).`, 1, T`Top and bottom grow at the same rate.`],
      [T`Find \(\displaystyle\lim_{n\to\infty}\frac{2n}{n + 1}\).`, 2, T`The top doubled.`],
      [T`Find \(\displaystyle\lim_{n\to\infty}\frac{2n}{n^2 + 1}\).`, 0, T`The bottom now grows faster.`],
      [T`Find \(\displaystyle\lim_{n\to\infty}0.9^n\).`, 0, T`Repeated multiplication by a number below 1.`],
      [T`Find \(\displaystyle\lim_{n\to\infty}\frac{n^2 + 1}{3n^2}\).`, 1 / 3, T`Leading terms only.`]
    ]
  },
  'Series basics': {
    hook: T`
<p>A series adds the terms of a sequence. Track the running totals, called partial sums. If they settle, the series converges.</p>
<p>The harmonic series \(1 + \frac12 + \frac13 + \cdots\) has terms that go to 0, yet its totals climb forever. Terms shrinking to zero is not enough.</p>
${fig('partialSums', {}, 'Running totals of three series.')}`,
    vary: [
      [T`Find \(\displaystyle\sum_{n=0}^\infty\left(\tfrac12\right)^n\).`, 2, T`\(\frac{1}{1 - 1/2}\).`],
      [T`Find \(\displaystyle\sum_{n=1}^\infty\left(\tfrac12\right)^n\).`, 1, T`Starting at \(n = 1\) drops the first term, 1.`],
      [T`Find \(\displaystyle\sum_{n=0}^\infty\left(\tfrac13\right)^n\).`, 1.5, T`A smaller ratio.`],
      [T`Find \(\displaystyle\sum_{n=0}^\infty 3\left(\tfrac12\right)^n\).`, 6, T`Every term tripled.`],
      [T`Find \(\displaystyle\sum_{n=1}^\infty\frac{1}{n(n + 1)}\).`, 1, T`Telescoping: \(\frac1n - \frac{1}{n + 1}\).`]
    ]
  },
  'Convergence tests': {
    hook: T`
<p>Most series have no formula for their sum, but you can still decide whether they converge by comparing them with series you know: geometric series and p-series. Ask: for large \(n\), what does the term look like?</p>`,
    vary: [
      [T`\(\displaystyle\sum\frac1{n^2}\)`, ['converges', 'diverges'], T`A p-series with \(p = 2 > 1\).`],
      [T`\(\displaystyle\sum\frac{1}{\sqrt n}\)`, ['diverges', 'converges'], T`\(p = \frac12\): too slow.`],
      [T`\(\displaystyle\sum\frac{1}{n^2 + 5}\)`, ['converges', 'diverges'], T`For large \(n\) it looks like \(\frac1{n^2}\).`],
      [T`\(\displaystyle\sum\frac{n}{n + 1}\)`, ['diverges', 'converges'], T`The terms approach 1, not 0.`],
      [T`\(\displaystyle\sum\frac{2^n}{n!}\)`, ['converges', 'diverges'], T`The ratio test gives \(\frac{2}{n + 1} \to 0\).`]
    ]
  },
  'Absolute and conditional convergence': {
    hook: T`
<p>Alternating signs help a series converge: each term partly cancels the one before. \(1 - \frac12 + \frac13 - \cdots\) converges, even though \(1 + \frac12 + \frac13 + \cdots\) does not. Convergence that depends on that cancellation is called conditional.</p>`,
    vary: [
      [T`\(\displaystyle\sum\frac{(-1)^n}{n^2}\)`, ['converges absolutely', 'converges conditionally', 'diverges'], T`Even without the signs, \(\sum\frac1{n^2}\) converges.`],
      [T`\(\displaystyle\sum\frac{(-1)^n}{n}\)`, ['converges conditionally', 'converges absolutely', 'diverges'], T`It needs the signs to converge.`],
      [T`\(\displaystyle\sum(-1)^n\)`, ['diverges', 'converges conditionally', 'converges absolutely'], T`The terms do not shrink.`],
      [T`Bound the error after 9 terms of \(\displaystyle\sum\frac{(-1)^{n+1}}{n}\).`, 0.1, T`The first omitted term: \(\frac1{10}\).`]
    ]
  },
  'Power series': {
    hook: T`
<p>A power series is a polynomial that never ends. It converges near its center and fails beyond a certain distance \(R\), the radius of convergence, like a signal that reaches only so far from its tower.</p>
${fig('numline', { range: [-5, 5], segs: [[-3, 3, true, false]], pts: [[0, true, 'center']] }, T`\(\sum\frac{x^n}{n3^n}\) converges on \([-3, 3)\). Endpoints are checked separately.`)}`,
    vary: [
      [T`Find the radius of convergence of \(\sum x^n\).`, 1, T`Geometric: converges when \(|x| < 1\).`],
      [T`Find the radius of convergence of \(\sum\frac{x^n}{2^n}\).`, 2, T`Geometric in \(\frac x2\).`],
      [T`Find the radius of convergence of \(\sum\frac{(x - 5)^n}{2^n}\).`, 2, T`Moving the center does not change the radius.`],
      [T`Find the radius of convergence of \(\sum\frac{n\,x^n}{2^n}\).`, 2, T`Powers of \(n\) never change the radius.`],
      [T`Where is the center of \(\sum\frac{(x - 5)^n}{2^n}\)?`, 5, T`Read it from \(x - 5\).`]
    ]
  },
  'Taylor and Maclaurin series': {
    hook: T`
<p>A Taylor polynomial copies a function's value, slope, bend, and higher derivatives at one point. The more derivatives it matches, the farther it hugs the curve. Raise the degree and watch the polynomial cling to \(\sin x\) farther from 0.</p>
${fig('taylor', {}, 'Maclaurin polynomials of sin x.')}`,
    vary: [
      [T`Find the coefficient of \(x^2\) in the Maclaurin series of \(e^x\).`, 0.5, T`\(\frac1{2!}\).`],
      [T`Find the coefficient of \(x^3\) in \(e^x\).`, 1 / 6, T`\(\frac1{3!}\).`],
      [T`Find the coefficient of \(x^3\) in \(\sin x\).`, -1 / 6, T`Same size as in \(e^x\), with an alternating sign.`],
      [T`Find the coefficient of \(x^2\) in \(\cos x\).`, -0.5, T`Cosine keeps the even powers.`],
      [T`Find the coefficient of \(x^3\) in \(e^{2x}\).`, 4 / 3, T`Substitute \(2x\): \(\frac{2^3}{3!}\).`]
    ]
  },
  'Parametric and polar calculus': {
    hook: T`
<p>A parametric curve is a path traced over time: \(x(t)\) and \(y(t)\) are the coordinates at time \(t\), like a moving dot on a screen.</p>
<p>A polar curve gives distance from the origin as an angle sweeps around. Polar areas are built from thin pizza-slice wedges.</p>
${fig('polarArea', {}, T`\(r = 2\sin\theta\) traces a circle; each wedge has area about \(\tfrac12r^2\,d\theta\).`)}`,
    vary: [
      [T`For \(x = t^2\), \(y = t^3\), find \(\frac{dy}{dx}\) at \(t = 1\).`, 1.5, T`\(\frac{3t^2}{2t}\).`],
      [T`Same curve, at \(t = 2\).`, 3, T`\(\frac{3t}{2}\) at \(t = 2\).`],
      [T`Find the area inside \(r = 1\).`, Math.PI, T`\(\frac12\int_0^{2\pi}1\,d\theta\).`],
      [T`Find the area inside \(r = 2\).`, 4 * Math.PI, T`Double the radius, four times the area.`]
    ]
  },
  'Differential equations': {
    hook: T`
<p>A differential equation describes how something changes rather than what it is. \(\frac{dy}{dx} = xy\) says that the slope at each point equals \(x\) times \(y\).</p>
<p>Drawing those slopes as short dashes gives a slope field. A solution is any curve that follows the dashes.</p>
${fig('slopeField', { k: 'xy' }, T`The red curve \(y = e^{x^2/2}\) follows the field through \((0, 1)\).`)}`,
    vary: [
      [T`\(y' = 0.5y\), \(y(0) = 4\). Find \(y(2)\).`, 4 * Math.E, T`\(y = 4e^{0.5t}\).`],
      [T`A quantity grows by \(y' = ky\) and doubles every 3 years. Find \(k\).`, Math.log(2) / 3, T`\(e^{3k} = 2\).`],
      [T`For \(P' = P\left(1 - \frac{P}{100}\right)\), find the nonzero equilibrium.`, 100, T`Where the growth rate is zero.`],
      [T`Use one Euler step of size 0.5 on \(y' = y\), \(y(0) = 1\). Estimate \(y(0.5)\).`, 1.5, T`\(1 + 0.5\cdot1\). The true value is \(e^{0.5} \approx 1.65\).`]
    ]
  }
});
