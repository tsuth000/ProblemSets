registerLearn('algebra', [
  { title: 'Linear equations', skill: 'Linear equations', body: T`
<p>Solve by doing the same thing to both sides until \(x\) is alone: distribute, combine like terms, move \(x\) terms to one side and constants to the other, then divide by the coefficient.</p>
<p>Clear fractions early by multiplying every term by the least common denominator. An equation that reduces to a false statement like \(0 = 5\) has no solution; one that reduces to \(0 = 0\) holds for every \(x\).</p>`,
    ex: { q: T`Solve \(\dfrac x2 + 3 = \dfrac{x - 1}{3}\).`, a: T`
<p>Multiply every term by 6: \(3x + 18 = 2(x - 1) = 2x - 2\). Then \(x = -20\).</p>
<p>Check: \(-10 + 3 = -7\) and \(\frac{-21}{3} = -7\).</p>` },
    trap: T`Distributing a negative to only the first term: \(-(x - 4) = -x + 4\), not \(-x - 4\).` },

  { title: 'Inequalities', skill: 'Inequalities', body: T`
<p>Solve like an equation, with one extra rule: multiplying or dividing by a negative number flips the inequality.</p>
<p>Write answers in interval notation: brackets include an endpoint, parentheses exclude it, and \(\infty\) always gets a parenthesis. A compound inequality \(a < \text{expr} < b\) is solved by acting on all three parts at once.</p>
<p>For a quadratic inequality, find the roots, then test the sign between them. An upward parabola is negative between its roots.</p>`,
    ex: { q: T`Solve \(-3 \le 2x + 1 < 7\).`, a: T`
<p>Subtract 1 from all parts: \(-4 \le 2x < 6\). Divide by 2: \(-2 \le x < 3\), or \([-2, 3)\).</p>` },
    trap: T`Forgetting to flip the sign after dividing by a negative coefficient.` },

  { title: 'Absolute value', skill: 'Absolute value', body: T`
<p>\(|x|\) is the distance from \(x\) to 0, so it is never negative. \(|x - a|\) is the distance from \(x\) to \(a\).</p>
<table class="tt"><tr><th>Form (\(c > 0\))</th><th>Equivalent</th></tr>
<tr><td>\(|A| = c\)</td><td>\(A = c\) or \(A = -c\)</td></tr>
<tr><td>\(|A| < c\)</td><td>\(-c < A < c\)</td></tr>
<tr><td>\(|A| > c\)</td><td>\(A < -c\) or \(A > c\)</td></tr></table>
<p>If \(c < 0\), \(|A| = c\) and \(|A| < c\) have no solution, and \(|A| > c\) holds for every \(x\).</p>`,
    ex: { q: T`Solve \(|2x - 3| \ge 5\).`, a: T`
<p>\(2x - 3 \le -5\) or \(2x - 3 \ge 5\). So \(x \le -1\) or \(x \ge 4\): \((-\infty, -1] \cup [4, \infty)\).</p>` },
    trap: T`Writing "greater than" cases as a single compound inequality like \(-5 \ge 2x - 3 \ge 5\), which no number satisfies.` },

  { title: 'Exponent rules', skill: 'Exponents', body: T`
<table class="tt"><tr><th>Rule</th><th>Example</th></tr>
<tr><td>\(a^m a^n = a^{m+n}\)</td><td>\(x^2x^5 = x^7\)</td></tr>
<tr><td>\(\frac{a^m}{a^n} = a^{m-n}\)</td><td>\(\frac{x^7}{x^3} = x^4\)</td></tr>
<tr><td>\((a^m)^n = a^{mn}\)</td><td>\((x^2)^3 = x^6\)</td></tr>
<tr><td>\((ab)^n = a^nb^n\)</td><td>\((3x)^2 = 9x^2\)</td></tr>
<tr><td>\(a^{-n} = \frac1{a^n}\)</td><td>\(2^{-3} = \frac18\)</td></tr>
<tr><td>\(a^0 = 1\) (\(a \ne 0\))</td><td>\(7^0 = 1\)</td></tr>
<tr><td>\(a^{m/n} = (\sqrt[n]a)^m\)</td><td>\(8^{2/3} = 4\)</td></tr></table>`,
    ex: { q: T`Simplify \(\left(4x^{-2}y^3\right)^{1/2}\) for \(x, y > 0\).`, a: T`
<p>Apply the power to each factor: \(4^{1/2}x^{-1}y^{3/2} = \dfrac{2y^{3/2}}{x}\).</p>` },
    trap: T`Distributing a power over a sum: \((a + b)^2 = a^2 + 2ab + b^2\), not \(a^2 + b^2\).` },

  { title: 'Radicals', skill: 'Radicals', body: T`
<p>\(\sqrt{ab} = \sqrt a\sqrt b\) and \(\sqrt{a/b} = \sqrt a/\sqrt b\) for nonnegative \(a, b\). Simplify by pulling out perfect squares: \(\sqrt{72} = \sqrt{36}\sqrt2 = 6\sqrt2\).</p>
<p>Rationalize a denominator by multiplying by \(\sqrt b\), or by the conjugate when it is a sum: \((a + \sqrt b)(a - \sqrt b) = a^2 - b\).</p>
<p>\(\sqrt{x^2} = |x|\), not \(x\). An even root of a negative number is not real.</p>`,
    ex: { q: T`Rationalize \(\dfrac{2}{3 - \sqrt5}\).`, a: T`
\[\frac{2}{3 - \sqrt5}\cdot\frac{3 + \sqrt5}{3 + \sqrt5} = \frac{2(3 + \sqrt5)}{9 - 5} = \frac{3 + \sqrt5}{2}\]` },
    trap: T`Splitting a root over a sum: \(\sqrt{9 + 16} = 5\), not \(3 + 4\).` },

  { title: 'Polynomials', skill: 'Polynomials', body: T`
<p>Special products:</p>
\[(a + b)^2 = a^2 + 2ab + b^2 \qquad (a - b)^2 = a^2 - 2ab + b^2 \qquad (a + b)(a - b) = a^2 - b^2\]
<p>Divide by \(x - c\) with synthetic division. Remainder theorem: the remainder is \(f(c)\). Factor theorem: \(x - c\) is a factor iff \(f(c) = 0\).</p>`,
    ex: { q: T`Divide \(x^3 - 2x^2 + 4\) by \(x - 2\).`, a: T`
<p>Synthetic division with 2 on coefficients \(1, -2, 0, 4\): bring down 1; \(1\cdot 2 = 2\), \(-2 + 2 = 0\); \(0\cdot 2 = 0\), \(0 + 0 = 0\); \(0 \cdot 2 = 0\), \(4 + 0 = 4\).</p>
<p>Quotient \(x^2\), remainder 4. Check with the remainder theorem: \(f(2) = 8 - 8 + 4 = 4\).</p>` },
    trap: T`Skipping a missing power in synthetic division. Write a 0 for every absent term.` },

  { title: 'Factoring', skill: 'Factoring', body: T`
<p>Work in this order: (1) pull out the greatest common factor; (2) look for special forms; (3) factor trinomials; (4) try grouping for four terms.</p>
<table class="tt"><tr><th>Form</th><th>Factors</th></tr>
<tr><td>\(a^2 - b^2\)</td><td>\((a - b)(a + b)\)</td></tr>
<tr><td>\(a^3 - b^3\)</td><td>\((a - b)(a^2 + ab + b^2)\)</td></tr>
<tr><td>\(a^3 + b^3\)</td><td>\((a + b)(a^2 - ab + b^2)\)</td></tr>
<tr><td>\(x^2 + bx + c\)</td><td>\((x + p)(x + q)\), \(pq = c\), \(p + q = b\)</td></tr></table>
<p>For \(ax^2 + bx + c\) (the ac method), find two numbers whose product is \(ac\) and whose sum is \(b\), split the middle term, and group.</p>`,
    ex: { q: T`Factor \(6x^2 - x - 2\).`, a: T`
<p>\(ac = -12\); the numbers \(-4\) and \(3\) multiply to \(-12\) and add to \(-1\).</p>
<p>Split \(-x\) into \(-4x + 3x\) and group in pairs:</p>\[\begin{aligned}&6x^2 - 4x + 3x - 2\\ ={}\;& 2x(3x - 2) + (3x - 2)\\ ={}\;& (2x + 1)(3x - 2)\end{aligned}\]` },
    trap: T`Stopping too early. \(2x^2 - 8 = 2(x^2 - 4)\) still factors to \(2(x - 2)(x + 2)\).` },

  { title: 'Quadratic equations', skill: 'Quadratics', body: T`
<p>A quadratic equation can be written \(ax^2 + bx + c = 0\) with \(a \ne 0\). Get 0 on one side first, then choose a method.</p>
<table class="tt"><tr><th>Method</th><th>Use when</th></tr>
<tr><td>Square roots</td><td>no \(x\) term: \(x^2 = 9\) gives \(x = \pm 3\)</td></tr>
<tr><td>Factoring</td><td>integer roots are likely</td></tr>
<tr><td>Completing the square</td><td>\(a = 1\) and \(b\) is even</td></tr>
<tr><td>Quadratic formula</td><td>always works</td></tr></table>
<p><b>Factoring.</b> If a product is 0, one factor is 0. For \(x^2 + bx + c\), find two numbers that multiply to \(c\) and add to \(b\). With \(a \ne 1\), find two numbers that multiply to \(ac\) and add to \(b\), split the middle term with them, and factor by grouping.</p>
<p><b>The quadratic formula</b> comes from completing the square on \(ax^2 + bx + c = 0\):</p>
\[x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\]
<table class="tt"><tr><th>Discriminant \(b^2 - 4ac\)</th><th>Real solutions</th></tr>
<tr><td>positive</td><td>two</td></tr><tr><td>zero</td><td>one (repeated)</td></tr><tr><td>negative</td><td>none (two complex)</td></tr></table>
<p>The roots sum to \(-\frac ba\) and multiply to \(\frac ca\). Their average, \(-\frac{b}{2a}\), is the axis of symmetry of the graph (next unit).</p>`,
    ex: { q: T`Solve \(2x^2 + 3x - 2 = 0\).`, a: T`
\[x = \frac{-3 \pm\sqrt{9 + 16}}{4} = \frac{-3 \pm 5}{4}\]
<p>So \(x = \frac12\) or \(x = -2\). Factored: \((2x - 1)(x + 2) = 0\).</p>` },
    exs: [{ q: T`Solve \(3x^2 - 10x - 8 = 0\) by factoring.`, a: T`
<p>\(ac = -24\). Two numbers with product \(-24\) and sum \(-10\): \(-12\) and \(2\). Split the middle term and group:</p>
\[3x^2 - 12x + 2x - 8\]
\[= 3x(x - 4) + 2(x - 4)\]
<p>So \((3x + 2)(x - 4) = 0\), giving \(x = -\frac23\) or \(x = 4\).</p>` }],
    trap: T`Dividing both sides by \(x\) in \(x^2 = 3x\). That loses the solution \(x = 0\). Factor instead: \(x(x - 3) = 0\).` },

  { title: 'Graphs of quadratics', skill: 'Quadratics', body: T`
<p>The graph of \(y = ax^2 + bx + c\) is a <b>parabola</b>. It opens up when \(a > 0\) and down when \(a < 0\); a larger \(|a|\) makes it narrower.</p>
<p><b>Three forms, three things you can read off.</b></p>
<table class="tt"><tr><th>Form</th><th>Shows directly</th></tr>
<tr><td>Standard \(ax^2 + bx + c\)</td><td>\(y\)-intercept \(c\); direction from \(a\)</td></tr>
<tr><td>Vertex \(a(x - h)^2 + k\)</td><td>vertex \((h, k)\); axis \(x = h\)</td></tr>
<tr><td>Factored \(a(x - r_1)(x - r_2)\)</td><td>roots \(r_1, r_2\); axis halfway between</td></tr></table>
<h4>The axis of symmetry</h4>
<p>Every parabola is symmetric about a vertical line, its <b>axis of symmetry</b>, which passes through the vertex. Points the same distance to the left and right of it have the same height: if the axis is \(x = h\), then \(y(h - d) = y(h + d)\) for every \(d\). The answer to "find the axis of symmetry" is an equation of a vertical line, \(x = h\).</p>
<p><b>Where the formula comes from.</b> Completing the square on the standard form gives</p>
\[ax^2 + bx + c = a\Big(x + \frac{b}{2a}\Big)^2 + c - \frac{b^2}{4a}\]
<p>The squared term is smallest (zero) at \(x = -\frac{b}{2a}\), so that is the axis:</p>
\[x = -\frac{b}{2a}\]
<p>Use the signs of \(a\) and \(b\) exactly as they appear. For \(y = -x^2 - 8x - 20\), \(a = -1\) and \(b = -8\), so \(x = -\frac{-8}{2(-1)} = \frac{8}{-2} = -4\).</p>
<p><b>Three other ways to find the axis</b>, all giving the same line:</p>
<ul><li>From vertex form \(a(x - h)^2 + k\): the axis is \(x = h\). Watch the sign: \((x + 3)^2\) means \(h = -3\).</li>
<li>From the roots: the axis is their average, \(x = \frac{r_1 + r_2}{2}\). The quadratic formula shows why: the roots are \(-\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}\), equally spaced around \(-\frac{b}{2a}\). The formula \(-\frac{b}{2a}\) still works when there are no real roots.</li>
<li>From any two points at the same height: if \(y(p) = y(q)\), the axis is \(x = \frac{p + q}{2}\).</li></ul>
<h4>The vertex and the maximum or minimum</h4>
<p>The vertex is the point on the axis: \((h, k)\) with \(h = -\frac{b}{2a}\) and \(k = y(h)\). To get \(k\), substitute \(h\) into the whole equation, constant term included, or use \(k = c - \frac{b^2}{4a}\).</p>
<p>If \(a > 0\), \(k\) is the <b>minimum</b> value and the range is \(y \ge k\). If \(a < 0\), \(k\) is the <b>maximum</b> and the range is \(y \le k\). The question asks either for \(h\) (where the extreme happens) or for \(k\) (what the extreme value is); read which one.</p>
<h4>Completing the square with \(a \ne 1\)</h4>
<p>Factor \(a\) out of the \(x\) terms only, complete the square inside, then multiply back what you added:</p>
\[2x^2 + 8x + 3 = 2(x^2 + 4x) + 3\]
\[= 2(x^2 + 4x + 4) - 8 + 3\]
\[= 2(x + 2)^2 - 5\]
<p>Vertex \((-2, -5)\), axis \(x = -2\). The 4 added inside the bracket is multiplied by 2, so 8 is subtracted outside.</p>`,
    ex: { q: T`Find the vertex and roots of \(y = x^2 - 6x + 5\).`, a: T`
<p>Half of \(-6\) is \(-3\), and \((-3)^2 = 9\): \(y = (x^2 - 6x + 9) - 9 + 5 = (x - 3)^2 - 4\). Vertex \((3, -4)\), axis \(x = 3\).</p>
<p>Roots: \((x - 3)^2 = 4\), so \(x = 1\) or \(x = 5\). Their average is 3, the axis again.</p>` },
    exs: [
      { q: T`For \(y = 2x^2 - 12x + 7\), find the axis of symmetry, the vertex, and whether the vertex is a maximum or minimum.`, a: T`
<p>\(a = 2\), \(b = -12\): \(x = -\frac{-12}{2(2)} = 3\). The axis is \(x = 3\).</p>
<p>\(y(3) = 2(9) - 12(3) + 7 = 18 - 36 + 7 = -11\). Vertex \((3, -11)\). Since \(a > 0\), \(-11\) is the minimum.</p>
<p>Check the symmetry: \(y(1) = 2 - 12 + 7 = -3\) and \(y(5) = 50 - 60 + 7 = -3\). Points 2 units either side of \(x = 3\) match.</p>` },
      { q: T`For \(y = -x^2 - 8x - 20\), find the axis of symmetry and the maximum value.`, a: T`
<p>\(a = -1\), \(b = -8\): \(x = -\frac{-8}{2(-1)} = \frac{8}{-2} = -4\). The axis is \(x = -4\).</p>
<p>\(y(-4) = -(-4)^2 - 8(-4) - 20 = -16 + 32 - 20 = -4\). The maximum value is \(-4\) (here it happens to equal \(h\)). Check with \(k = c - \frac{b^2}{4a} = -20 - \frac{64}{-4} = -4\).</p>
<p>The discriminant is \(64 - 80 < 0\): the whole parabola lies below the \(x\)-axis, yet the axis of symmetry still exists.</p>` },
      { q: T`Find the axis of symmetry and the vertex of \(y = 3(x + 1)(x - 5)\).`, a: T`
<p>The roots are \(-1\) and \(5\); the axis is halfway: \(x = \frac{-1 + 5}{2} = 2\).</p>
<p>\(y(2) = 3(3)(-3) = -27\). Vertex \((2, -27)\), a minimum since \(a = 3 > 0\).</p>` },
      { q: T`A parabola passes through \((-3, 7)\) and \((5, 7)\). Find its axis of symmetry.`, a: T`
<p>The two points have the same height, so they are mirror images: \(x = \frac{-3 + 5}{2} = 1\).</p>` }],
    trap: T`Two common slips: reading the vertex of \((x + 2)^2 + 1\) as \((2, 1)\) instead of \((-2, 1)\); and dropping a sign in \(-\frac{b}{2a}\) when \(a\) or \(b\) is negative. Write the substitution out in full, with brackets around negatives.` },

  { title: 'Rational expressions', skill: 'Rational expressions', body: T`
<p>Simplify by factoring numerator and denominator, then cancelling common factors. Record the excluded values: anything that makes an original denominator zero.</p>
<p>To add or subtract, rewrite over the least common denominator. To solve an equation, multiply through by the LCD, solve, and discard any solution that makes a denominator zero (an extraneous solution).</p>`,
    ex: { q: T`Solve \(\dfrac{x}{x - 2} = \dfrac{2}{x - 2} + 3\).`, a: T`
<p>Multiply by \(x - 2\): \(x = 2 + 3(x - 2) = 3x - 4\), so \(x = 2\).</p>
<p>But \(x = 2\) makes the denominators zero. It is extraneous, so there is no solution.</p>` },
    trap: T`Cancelling terms instead of factors: \(\frac{x + 3}{x}\) is not \(3\).` },

  { title: 'Lines and slope', skill: 'Lines and slope', body: T`
\[m = \frac{y_2 - y_1}{x_2 - x_1}\]
<table class="tt"><tr><th>Form</th><th>Equation</th></tr>
<tr><td>slope-intercept</td><td>\(y = mx + b\)</td></tr>
<tr><td>point-slope</td><td>\(y - y_1 = m(x - x_1)\)</td></tr>
<tr><td>standard</td><td>\(Ax + By = C\), slope \(-A/B\)</td></tr></table>
<p>Parallel lines have equal slopes. Perpendicular slopes multiply to \(-1\). Horizontal lines have slope 0; vertical lines have undefined slope and equations \(x = a\).</p>`,
    ex: { q: T`Find the line through \((2, -1)\) perpendicular to \(3x - 4y = 8\).`, a: T`
<p>The given slope is \(\frac34\), so the perpendicular slope is \(-\frac43\).</p>
\[y + 1 = -\tfrac43(x - 2) \;\Rightarrow\; y = -\tfrac43x + \tfrac53\]` },
    trap: T`Subtracting coordinates in mismatched order, such as \(\frac{y_2 - y_1}{x_1 - x_2}\), which flips the sign.` },

  { title: 'Systems of equations', skill: 'Systems of equations', body: T`
<p><b>Substitution:</b> solve one equation for a variable and plug it into the other. <b>Elimination:</b> scale the equations so one variable cancels when you add or subtract.</p>
<p>Two lines meet once (one solution), are parallel (none), or coincide (infinitely many). Elimination reveals the last two as \(0 = c\) with \(c \ne 0\), or \(0 = 0\).</p>`,
    ex: { q: T`Solve \(2x + 3y = 12\) and \(x - y = 1\).`, a: T`
<p>From the second, \(x = y + 1\). Substitute: \(2(y + 1) + 3y = 12\), so \(5y = 10\), \(y = 2\), \(x = 3\).</p>` },
    trap: T`Finding one variable and stopping. A solution is an ordered pair.` },

  { title: 'Percent and proportion', body: T`
<p>Percent change \(= \frac{\text{new} - \text{old}}{\text{old}}\times 100\%\). An increase of \(p\%\) multiplies by \(1 + p/100\); a decrease multiplies by \(1 - p/100\). Successive changes multiply.</p>
<p>A proportion \(\frac ab = \frac cd\) can be solved by cross-multiplying: \(ad = bc\).</p>`,
    ex: { q: T`A price rises 20%, then falls 20%. What is the net change?`, a: T`
<p>\(1.2 \times 0.8 = 0.96\): a 4% decrease overall.</p>` },
    trap: T`Assuming equal percentage gains and losses cancel. The second change applies to a different base.` }
]);
