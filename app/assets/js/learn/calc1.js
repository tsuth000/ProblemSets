registerLearn('calc1', [
  { title: 'Limits and limit laws', skill: 'Limits', body: T`
<p>\(\lim_{x\to a}f(x) = L\) means \(f(x)\) gets arbitrarily close to \(L\) as \(x\) approaches \(a\), regardless of \(f(a)\). The limit exists iff both one-sided limits exist and agree.</p>
<p>Limits respect sums, products, quotients (nonzero denominator), and powers, so try direct substitution first. If it gives \(\frac00\), simplify: factor and cancel, rationalize with a conjugate, or combine fractions.</p>`,
    ex: { q: T`Evaluate \(\displaystyle\lim_{x\to4}\frac{\sqrt x - 2}{x - 4}\).`, a: T`
<p>Substitution gives \(\frac00\). Factor \(x - 4 = (\sqrt x - 2)(\sqrt x + 2)\):</p>
\[\lim_{x\to4}\frac{1}{\sqrt x + 2} = \frac14\]` },
    trap: T`Concluding the limit does not exist because substitution gives \(\frac00\). That form says "do more work," not "no limit."` },

  { title: 'Limits at infinity', skill: 'Limits', body: T`
<p>For rational functions, divide numerator and denominator by the highest power of \(x\) in the denominator. Terms like \(\frac{c}{x^k}\) go to 0.</p>
<p>A finite limit at \(\pm\infty\) gives a horizontal asymptote. An infinite limit at \(a\) (\(f\to\pm\infty\) as \(x\to a\)) gives a vertical asymptote.</p>`,
    ex: { q: T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{\sqrt{x^2 + 1}}{2x + 3}\).`, a: T`
<p>Divide by \(x\) (positive for large \(x\), so \(x = \sqrt{x^2}\)): \(\frac{\sqrt{1 + 1/x^2}}{2 + 3/x} \to \frac12\).</p>` },
    trap: T`Treating \(\infty - \infty\) or \(\frac\infty\infty\) as 0 or 1. Both are indeterminate.` },

  { title: 'Special limits and the squeeze theorem', skill: 'Limits', body: T`
\[\lim_{x\to0}\frac{\sin x}{x} = 1 \qquad \lim_{x\to0}\frac{1 - \cos x}{x} = 0 \qquad \lim_{x\to0}\frac{e^x - 1}{x} = 1\]
<p>Squeeze theorem: if \(g \le f \le h\) near \(a\) and \(g, h \to L\), then \(f \to L\).</p>`,
    ex: { q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\sin 5x}{3x}\) and \(\displaystyle\lim_{x\to0}x^2\sin\frac1x\).`, a: T`
<p>\(\frac{\sin 5x}{3x} = \frac53\cdot\frac{\sin 5x}{5x} \to \frac53\).</p>
<p>\(-x^2 \le x^2\sin\frac1x \le x^2\), and both bounds go to 0, so the limit is 0.</p>` },
    trap: T`Cancelling inside a function: \(\frac{\sin 5x}{3x}\) is not \(\frac{\sin 5}{3}\).` },

  { title: "L'Hôpital's rule", skill: 'Limits', body: T`
<p>If \(\frac{f}{g}\) gives \(\frac00\) or \(\frac{\pm\infty}{\pm\infty}\), then \(\lim\frac fg = \lim\frac{f'}{g'}\) (when the right side exists). Differentiate top and bottom separately, not as a quotient.</p>
<p>Rewrite other indeterminate forms first: \(0\cdot\infty\) as a fraction; \(1^\infty\), \(0^0\), \(\infty^0\) by taking a logarithm.</p>`,
    ex: { q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{e^x - 1 - x}{x^2}\).`, a: T`
<p>\(\frac00\). Apply the rule: \(\frac{e^x - 1}{2x}\), still \(\frac00\). Again: \(\frac{e^x}{2} \to \frac12\).</p>` },
    trap: T`Applying L'Hôpital to a form that is not indeterminate, such as \(\frac{1}{0^+}\).` },

  { title: 'Continuity', skill: 'Continuity', body: T`
<p>\(f\) is continuous at \(a\) if \(f(a)\) is defined, \(\lim_{x\to a}f(x)\) exists, and they are equal. Discontinuities are removable (hole), jump, or infinite.</p>
<p>Polynomials, exponentials, sine, and cosine are continuous everywhere; rational, log, and root functions are continuous on their domains. Differentiable implies continuous, but not the reverse.</p>`,
    ex: { q: T`Find \(k\) so that \(f(x) = kx + 1\) for \(x < 2\) and \(f(x) = x^2\) for \(x \ge 2\) is continuous.`, a: T`
<p>The pieces must meet at \(x = 2\): \(2k + 1 = 4\), so \(k = \frac32\).</p>` },
    trap: T`Checking only that \(f(a)\) exists. Both one-sided limits must match it.` },

  { title: 'IVT and MVT', skill: 'Theorems', body: T`
<p><b>Intermediate value theorem:</b> if \(f\) is continuous on \([a, b]\), it takes every value between \(f(a)\) and \(f(b)\). Use it to prove a root exists.</p>
<p><b>Mean value theorem:</b> if \(f\) is continuous on \([a, b]\) and differentiable on \((a, b)\), some \(c\) in \((a,b)\) has \(f'(c) = \frac{f(b) - f(a)}{b - a}\). Rolle's theorem is the case \(f(a) = f(b)\), giving \(f'(c) = 0\).</p>`,
    ex: { q: T`Find the \(c\) promised by the MVT for \(f(x) = x^2\) on \([1, 3]\).`, a: T`
<p>Average slope \(\frac{9 - 1}{2} = 4\). Solve \(2c = 4\): \(c = 2\).</p>` },
    trap: T`Applying the theorems without checking the hypotheses, such as the MVT for \(|x|\) on \([-1, 1]\).` },

  { title: 'The derivative', skill: 'Derivative rules', body: T`
\[f'(x) = \lim_{h\to0}\frac{f(x + h) - f(x)}{h}\]
<p>\(f'(a)\) is the slope of the tangent line at \(a\) and the instantaneous rate of change. The tangent line is \(y = f(a) + f'(a)(x - a)\), which also serves as the linear approximation of \(f\) near \(a\).</p>
<p>A function fails to be differentiable at corners, cusps, vertical tangents, and discontinuities.</p>`,
    ex: { q: T`Use the definition to differentiate \(f(x) = x^2\).`, a: T`
\[\frac{(x + h)^2 - x^2}{h} = \frac{2xh + h^2}{h} = 2x + h \to 2x\]` },
    trap: T`Cancelling \(h\) before expanding the numerator. Expand, simplify, then let \(h\to0\).` },

  { title: 'Differentiation rules', skill: 'Derivative rules', body: T`
<table class="tt"><tr><th>Function</th><th>Derivative</th></tr>
<tr><td>\(x^n\)</td><td>\(nx^{n-1}\)</td></tr><tr><td>\(e^x\), \(a^x\)</td><td>\(e^x\), \(a^x\ln a\)</td></tr>
<tr><td>\(\ln x\)</td><td>\(\frac1x\)</td></tr><tr><td>\(\sin x\), \(\cos x\)</td><td>\(\cos x\), \(-\sin x\)</td></tr>
<tr><td>\(\tan x\)</td><td>\(\sec^2x\)</td></tr><tr><td>\(\sec x\)</td><td>\(\sec x\tan x\)</td></tr>
<tr><td>\(\arcsin x\)</td><td>\(\frac{1}{\sqrt{1 - x^2}}\)</td></tr><tr><td>\(\arctan x\)</td><td>\(\frac{1}{1 + x^2}\)</td></tr></table>
\[(fg)' = f'g + fg' \qquad \left(\frac fg\right)' = \frac{f'g - fg'}{g^2}\]`,
    ex: { q: T`Differentiate \(x^3e^x\) and \(\dfrac{\sin x}{x}\).`, a: T`
<p>Product: \(3x^2e^x + x^3e^x\). Quotient: \(\frac{x\cos x - \sin x}{x^2}\).</p>` },
    trap: T`Writing \((fg)' = f'g'\).` },

  { title: 'The chain rule', skill: 'Chain rule', body: T`
\[\frac{d}{dx}f(g(x)) = f'(g(x))\cdot g'(x)\]
<p>Differentiate the outer function, leave the inside alone, then multiply by the derivative of the inside. Repeat for each layer.</p>`,
    ex: { q: T`Differentiate \(\sin^3(2x)\).`, a: T`
<p>Layers: cube, then sine, then \(2x\).</p>
\[\begin{aligned}&\tfrac{d}{dx}\sin^3(2x)\\ &= 3\sin^2(2x)\cdot\cos(2x)\cdot 2\\ &= 6\sin^2(2x)\cos(2x)\end{aligned}\]` },
    trap: T`Forgetting the inner derivative: \(\frac{d}{dx}e^{x^2} = 2xe^{x^2}\), not \(e^{x^2}\).` },

  { title: 'Implicit differentiation', skill: 'Implicit differentiation', body: T`
<p>When \(y\) is not isolated, differentiate both sides with respect to \(x\), treating \(y\) as a function of \(x\): every \(y\) term picks up a factor \(y'\) by the chain rule. Then solve for \(y'\).</p>
<p>Logarithmic differentiation handles products, quotients, and variable exponents: take \(\ln\) of both sides first.</p>`,
    ex: { q: T`Find \(y'\) for \(x^3 + y^3 = 6xy\).`, a: T`
<p>\(3x^2 + 3y^2y' = 6y + 6xy'\). Collect \(y'\): \(y'(3y^2 - 6x) = 6y - 3x^2\).</p>
\[y' = \frac{2y - x^2}{y^2 - 2x}\]` },
    trap: T`Differentiating \(xy\) as \(y'\). It needs the product rule: \(y + xy'\).` },

  { title: 'Related rates', skill: 'Related rates', body: T`
<p>Steps: draw and label quantities that change; write an equation relating them; differentiate with respect to \(t\); substitute the known values at the instant asked about; solve.</p>`,
    ex: { q: T`A 5 m ladder slides away from a wall at 0.5 m/s. How fast is the top sliding down when the base is 3 m out?`, a: T`
<p>\(x^2 + y^2 = 25\), so \(2xx' + 2yy' = 0\). At \(x = 3\), \(y = 4\):</p>
\[y' = -\frac{3(0.5)}{4} = -0.375 \text{ m/s}\]` },
    trap: T`Substituting the instant's values before differentiating, which turns changing quantities into constants.` },

  { title: 'Curve sketching and extrema', skill: 'Curve sketching', body: T`
<p>Critical numbers: \(f' = 0\) or undefined. \(f' > 0\): increasing; \(f' < 0\): decreasing. First derivative test: \(f'\) changes \(+\) to \(-\) at a max, \(-\) to \(+\) at a min.</p>
<p>\(f'' > 0\): concave up; \(f'' < 0\): concave down. Inflection points are where concavity changes. Second derivative test at a critical point: \(f'' < 0\) max, \(f'' > 0\) min, \(f'' = 0\) inconclusive.</p>
<p>Closed interval method for absolute extrema: compare \(f\) at critical numbers and endpoints.</p>`,
    ex: { q: T`Find the absolute extrema of \(f(x) = x^3 - 3x^2 + 1\) on \([-1, 3]\).`, a: T`
<p>\(f' = 3x(x - 2) = 0\) at \(x = 0, 2\). Values: \(f(-1) = -3\), \(f(0) = 1\), \(f(2) = -3\), \(f(3) = 1\). Absolute max 1 (at 0 and 3); absolute min \(-3\) (at \(-1\) and 2).</p>` },
    trap: T`Calling every point with \(f'' = 0\) an inflection point. Check that the sign of \(f''\) actually changes.` },

  { title: 'Optimization', skill: 'Optimization', body: T`
<p>Name the quantity to optimize; write it in terms of one variable using the constraint; find the domain; set the derivative to zero; confirm a max or min with a sign chart, the second derivative test, or endpoint values.</p>`,
    ex: { q: T`Squares of side \(x\) are cut from a 12 by 12 sheet to make an open box. Maximize the volume.`, a: T`
<p>\(V = x(12 - 2x)^2\) on \(0 < x < 6\). \(V' = (12 - 2x)(12 - 6x) = 0\) gives \(x = 2\). \(V(2) = 2\cdot 8^2 = 128\).</p>` },
    trap: T`Forgetting the domain, which can produce critical points that are physically impossible.` },

  { title: 'Antiderivatives', skill: 'Integrals', body: T`
<table class="tt"><tr><th>\(f(x)\)</th><th>\(\int f\,dx\)</th></tr>
<tr><td>\(x^n\) (\(n \ne -1\))</td><td>\(\frac{x^{n+1}}{n+1} + C\)</td></tr>
<tr><td>\(\frac1x\)</td><td>\(\ln|x| + C\)</td></tr><tr><td>\(e^x\)</td><td>\(e^x + C\)</td></tr>
<tr><td>\(\cos x\)</td><td>\(\sin x + C\)</td></tr><tr><td>\(\sin x\)</td><td>\(-\cos x + C\)</td></tr>
<tr><td>\(\sec^2 x\)</td><td>\(\tan x + C\)</td></tr><tr><td>\(\frac1{1 + x^2}\)</td><td>\(\arctan x + C\)</td></tr></table>
<p>An initial condition pins down \(C\).</p>`,
    ex: { q: T`Find \(f\) if \(f'(x) = 6x^2 - 4\) and \(f(1) = 3\).`, a: T`
<p>\(f(x) = 2x^3 - 4x + C\). Then \(2 - 4 + C = 3\), so \(C = 5\).</p>` },
    trap: T`Dropping \(+C\) on indefinite integrals.` },

  { title: 'Definite integrals and the FTC', skill: 'Fundamental theorem', body: T`
<p>\(\int_a^b f(x)\,dx\) is the limit of Riemann sums: the signed area between \(f\) and the \(x\)-axis.</p>
<p><b>FTC part 1:</b> \(\frac{d}{dx}\int_a^x f(t)\,dt = f(x)\); with an upper limit \(g(x)\), multiply by \(g'(x)\). <b>Part 2:</b> \(\int_a^b f(x)\,dx = F(b) - F(a)\) for any antiderivative \(F\).</p>
<p>Average value: \(\frac{1}{b - a}\int_a^b f\,dx\). Total area uses \(|f|\).</p>`,
    ex: { q: T`Evaluate \(\displaystyle\int_0^\pi\sin x\,dx\).`, a: T`
<p>\(\left[-\cos x\right]_0^\pi = -(-1) - (-1) = 2\).</p>` },
    trap: T`Reporting a definite integral as area when \(f\) dips below the axis; those parts count negatively.` },

  { title: 'Substitution', skill: 'Integrals', body: T`
<p>Look for a function and its derivative: set \(u = g(x)\), \(du = g'(x)\,dx\), and rewrite the whole integral in \(u\). For definite integrals, convert the limits to \(u\)-values too.</p>`,
    ex: { q: T`Evaluate \(\displaystyle\int_0^1 x(x^2 + 1)^3\,dx\).`, a: T`
<p>\(u = x^2 + 1\), \(du = 2x\,dx\); limits become 1 and 2.</p>
\[\tfrac12\int_1^2u^3\,du = \tfrac12\cdot\frac{16 - 1}{4} = \frac{15}{8}\]` },
    trap: T`Changing variables but keeping the old \(x\)-limits.` }
]);
