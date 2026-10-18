// Beginner layer for Algebra: plain-language idea, picture, and a variation sequence per unit.
// vary: [question, answer, what changed]. A number is checked numerically; an array is multiple choice (first is correct).
registerLessons('algebra', {
  'Linear equations': {
    hook: T`
<p>An equation is a balance scale. The two sides weigh the same, and they stay balanced as long as you do the same thing to both.</p>
<p>Solving means undoing what was done to \(x\), in reverse order. In \(3x + 4 = 19\), the recipe was "multiply by 3, then add 4". Undo it backward: subtract 4, then divide by 3.</p>
<p>The bar model below shows the same idea without symbols. Three equal bars plus a block of 4 make 19. Remove the 4, and three bars make 15, so each bar is 5.</p>
${fig('barModel', { n: 3, c: 4, total: 19 }, T`\(3x + 4 = 19\) as a bar model.`)}
<p>Always finish by checking: \(3(5) + 4 = 19\).</p>`,
    vary: [
      [T`Solve \(2x + 3 = 11\).`, 4, 'Start here: subtract 3, then divide by 2.'],
      [T`Solve \(2x - 3 = 11\).`, 7, 'Only the sign of the 3 changed, so you add 3 instead of subtracting.'],
      [T`Solve \(2x - 3 = -11\).`, -4, 'Now the right side is negative. The steps are identical; only the number changes.'],
      [T`Solve \(-2x - 3 = -11\).`, 4, T`The coefficient became \(-2\). The last step divides by a negative number.`],
      [T`Solve \(2(x - 3) = 11\).`, 8.5, 'Brackets: divide both sides by 2 first, or distribute first. Both work.']
    ]
  },
  'Inequalities': {
    hook: T`
<p>An inequality describes a range of numbers instead of one. "You must be at least 16 to drive" is \(a \ge 16\): 16 counts, and so does every age above it.</p>
<p>On a number line, a filled dot means the endpoint is included and an open dot means it is not.</p>
${fig('numline', { range: [-5, 5], segs: [[-2, 3, true, false]] }, T`\(-2 \le x < 3\): includes \(-2\), stops just short of 3.`)}
<p>You solve an inequality exactly like an equation, with one new rule. Multiplying or dividing by a negative number reverses the direction. Check it with numbers: \(2 < 5\), but \(-2 > -5\).</p>`,
    vary: [
      [T`Solve \(x + 4 > 6\).`, [T`\(x > 2\)`, T`\(x < 2\)`, T`\(x > 10\)`], 'Start here: subtract 4 from both sides.'],
      [T`Solve \(-x + 4 > 6\).`, [T`\(x < -2\)`, T`\(x > -2\)`, T`\(x < 2\)`], T`The \(x\) term turned negative. Dividing by \(-1\) flips the sign.`],
      [T`Solve \(3x + 4 \ge 7\).`, [T`\(x \ge 1\)`, T`\(x > 1\)`, T`\(x \le 1\)`], T`The symbol \(\ge\) keeps the endpoint, so 1 is included.`],
      [T`Solve \(-3x + 4 \ge 7\).`, [T`\(x \le -1\)`, T`\(x \ge -1\)`, T`\(x \le 1\)`], 'Same numbers, negative coefficient: the direction reverses.']
    ]
  },
  'Absolute value': {
    hook: T`
<p>\(|x|\) is the distance from \(x\) to 0. Distance is never negative, so \(|-7| = 7\).</p>
<p>\(|x - 3|\) is the distance between \(x\) and 3. Reading it that way makes problems almost visual. "\(|x - 3| < 2\)" means "\(x\) is within 2 of 3": the band from 1 to 5.</p>
${fig('numline', { range: [-1, 7], segs: [[1, 5, false, false]], brace: [3, 5, '2'], pts: [[3, true]] }, T`\(|x - 3| < 2\): every point within 2 units of 3.`)}
<p>"\(|x - 3| > 2\)" means farther than 2 from 3: two rays pointing away from each other.</p>`,
    vary: [
      [T`Solve \(|x| = 5\). Enter the larger solution.`, 5, T`Two points are 5 from zero: 5 and \(-5\).`],
      [T`Solve \(|x - 2| = 5\). Enter the larger solution.`, 7, T`The center moved to 2. The distance is still 5, so the solutions are 7 and \(-3\).`],
      [T`Solve \(|x - 2| = 5\). Enter the smaller solution.`, -3, 'Same equation, other end of the band.'],
      [T`Solve \(|2x - 4| = 10\). Enter the larger solution.`, 7, T`Factor out 2: \(|x - 2| = 5\). It is the same problem in disguise.`],
      [T`How many solutions does \(|x - 2| = -5\) have?`, 0, 'A distance cannot be negative.']
    ]
  },
  'Exponent rules': {
    hook: T`
<p>An exponent counts repeated multiplication: \(2^3 = 2\cdot2\cdot2\). Every exponent rule comes from counting factors.</p>
<p>\(x^2\cdot x^3\) is two \(x\)'s times three \(x\)'s, five in all, so \(x^5\). Dividing cancels factors, so \(\frac{x^5}{x^2} = x^3\).</p>
<p>Follow the pattern below zero. Each step down divides by 2:</p>
<table class="tt"><tr><th>\(2^3\)</th><th>\(2^2\)</th><th>\(2^1\)</th><th>\(2^0\)</th><th>\(2^{-1}\)</th><th>\(2^{-2}\)</th></tr>
<tr><td>8</td><td>4</td><td>2</td><td>1</td><td>\(\frac12\)</td><td>\(\frac14\)</td></tr></table>
<p>So \(x^0 = 1\), and a negative exponent means a reciprocal, not a negative number.</p>`,
    vary: [
      [T`\(x^4\cdot x^3 = x^p\). Find \(p\).`, 7, 'Multiplying adds exponents.'],
      [T`\(x^4 \div x^3 = x^p\). Find \(p\).`, 1, 'Division instead: subtract.'],
      [T`\((x^4)^3 = x^p\). Find \(p\).`, 12, T`A power of a power: four \(x\)'s, three times over, multiply.`],
      [T`\(x^{-4}\cdot x^3 = x^p\). Find \(p\).`, -1, 'A negative exponent follows the same addition rule.'],
      [T`Evaluate \(4^{3/2}\).`, 8, T`Fractional exponent: the denominator is a root. \(\sqrt4 = 2\), then \(2^3 = 8\).`]
    ]
  },
  'Radicals': {
    hook: T`
<p>\(\sqrt{49}\) asks "which nonnegative number squared gives 49?" The answer is 7. Geometrically, it is the side of a square with area 49.</p>
<p>To simplify, pull out perfect squares: \(50 = 25\cdot2\), so \(\sqrt{50} = \sqrt{25}\sqrt2 = 5\sqrt2\). Radicals with the same root combine like terms: \(2\sqrt3 + 4\sqrt3 = 6\sqrt3\), just as \(2a + 4a = 6a\).</p>`,
    vary: [
      [T`\(\sqrt{12} = a\sqrt3\). Find \(a\).`, 2, T`\(12 = 4\cdot3\).`],
      [T`\(\sqrt{48} = a\sqrt3\). Find \(a\).`, 4, T`\(48 = 16\cdot3\). Bigger square factor, bigger coefficient.`],
      [T`\(\sqrt{75} = a\sqrt3\). Find \(a\).`, 5, T`\(75 = 25\cdot3\).`],
      [T`\(\sqrt{12} + \sqrt{48} = a\sqrt3\). Find \(a\).`, 6, T`Like radicals add like terms: \(2\sqrt3 + 4\sqrt3\).`],
      [T`Evaluate \(\sqrt3\cdot\sqrt{12}\).`, 6, T`Multiply under one root: \(\sqrt{36}\).`]
    ]
  },
  'Polynomials': {
    hook: T`
<p>A polynomial is a sum of terms such as \(3x^2\), \(-5x\), and \(7\). Multiplying polynomials is the distributive law used repeatedly: every term in the first bracket multiplies every term in the second.</p>
<p>The area model makes this visible. \((x + 2)(x + 3)\) is a rectangle with sides \(x + 2\) and \(x + 3\). Cut it into pieces and add their areas. Change \(p\) and \(q\) to see the pattern.</p>
${fig('areaModel', {}, T`Each piece is one product: \(x\cdot x\), \(x\cdot q\), \(p\cdot x\), \(p\cdot q\).`)}`,
    vary: [
      [T`Expand \((x + 2)(x + 3)\). What is the coefficient of \(x\)?`, 5, T`The two strips: \(2x + 3x\).`],
      [T`Expand \((x + 2)(x - 3)\). What is the coefficient of \(x\)?`, -1, T`One sign changed: \(2x - 3x\).`],
      [T`Expand \((x + 2)(x - 3)\). What is the constant term?`, -6, T`Same product; now look at \(2\cdot(-3)\).`],
      [T`Expand \((2x + 1)(x - 3)\). What is the coefficient of \(x\)?`, -5, T`Outer \(2x\cdot(-3) = -6x\) and inner \(1\cdot x = x\).`],
      [T`Expand \((x + 3)^2\). What is the coefficient of \(x\)?`, 6, T`A square repeats the factor: \(3x + 3x\). This is the middle term people forget.`]
    ]
  },
  'Factoring': {
    hook: T`
<p>Factoring runs multiplication backward. Given the area \(x^2 + 5x + 6\), find the rectangle's sides.</p>
<p>The pieces must fit into a rectangle: one \(x^2\) square, five \(x\)-strips, six unit squares. The unit squares form a 2-by-3 block, so the sides are \(x + 2\) and \(x + 3\).</p>
${fig('areaModel', { p: 2, q: 3 }, T`\(x^2 + 5x + 6 = (x + 2)(x + 3)\).`)}
<p>In numbers: find two numbers that multiply to the constant (6) and add to the middle coefficient (5).</p>`,
    vary: [
      [T`\(x^2 + 7x + 12 = (x + 3)(x + b)\). Find \(b\).`, 4, 'Multiply to 12, add to 7.'],
      [T`\(x^2 - 7x + 12 = (x - 3)(x - b)\). Find \(b\).`, 4, T`The middle sign flipped. Product still \(+12\), sum \(-7\): both numbers negative.`],
      [T`\(x^2 + x - 12 = (x + 4)(x - b)\). Find \(b\).`, 3, T`Product \(-12\): one number positive, one negative.`],
      [T`\(x^2 - x - 12 = (x - 4)(x + b)\). Find \(b\).`, 3, 'Swap which number is negative and the middle term changes sign.'],
      [T`\(x^2 - 16 = (x - 4)(x + b)\). Find \(b\).`, 4, 'No middle term: the numbers are opposites. A difference of squares.']
    ]
  },
  'Quadratic equations': {
    hook: T`
<p>If a product is zero, one of the factors must be zero. That single fact solves quadratics by factoring: \((x - 2)(x + 5) = 0\) forces \(x = 2\) or \(x = -5\).</p>
<p>The solutions (roots) are where the parabola crosses the \(x\)-axis. Move the sliders: a parabola can cross twice, touch once, or miss the axis entirely.</p>
${fig('parabola', {}, T`Roots are the green points. Lift the vertex above the axis with \(a > 0\) and they vanish.`)}
<p>When factoring is hard, the quadratic formula always works. The quantity under its root, \(b^2 - 4ac\), predicts how many real roots there are.</p>`,
    vary: [
      [T`Solve \((x - 2)(x + 5) = 0\). Enter the larger root.`, 2, 'Set each factor to zero.'],
      [T`Solve \(x^2 + 3x - 10 = 0\). Enter the larger root.`, 2, 'This is the previous equation multiplied out. Same roots.'],
      [T`Solve \(2x^2 + 6x - 20 = 0\). Enter the larger root.`, 2, 'Doubling every term does not move the roots.'],
      [T`How many real roots does \(x^2 + 3x + 10 = 0\) have?`, 0, T`Discriminant \(9 - 40 < 0\). The parabola stays above the axis.`],
      [T`How many distinct real roots does \(x^2 + 4x + 4 = 0\) have?`, 1, T`It is \((x + 2)^2\). Discriminant 0: the vertex sits on the axis.`]
    ]
  },
  'Graphs of quadratics': {
    hook: T`
<p>Every parabola is a copy of \(y = x^2\) that has been moved and stretched. Vertex form \(y = a(x - h)^2 + k\) tells you exactly how: shift right by \(h\), up by \(k\), stretch by \(a\), and flip if \(a < 0\).</p>
<p>The vertical line \(x = h\) through the vertex is the <b>axis of symmetry</b>: fold the graph along it and the two halves match.</p>
${fig('parabola', { a: 1, h: -2, k: 1 }, 'Move each slider separately and note which feature of the graph it controls. Only h moves the axis.')}`,
    vary: [
      [T`What is the axis of symmetry \(x = ?\) of \(y = (x - 3)^2 + 1\)?`, 3, T`Read \(h\) straight from the bracket.`],
      [T`What is the axis of symmetry of \(y = (x + 3)^2 + 1\)?`, -3, T`\(x + 3 = x - (-3)\), so \(h = -3\).`],
      [T`What is the minimum value of \(y = 2(x + 3)^2 + 1\)?`, 1, 'Stretching changes the width, not the vertex.'],
      [T`What is the maximum value of \(y = -2(x + 3)^2 + 1\)?`, 1, T`A negative \(a\) flips the parabola, so the vertex becomes the top.`],
      [T`What is the axis of symmetry of \(y = x^2 - 6x + 10\)?`, 3, T`Standard form: \(-\frac{b}{2a} = -\frac{-6}{2} = 3\).`],
      [T`What is the axis of symmetry of \(y = -2x^2 + 8x - 1\)?`, 2, T`\(-\frac{8}{2(-2)} = 2\). A negative \(a\) flips the sign of the quotient.`],
      [T`What is the axis of symmetry of \(y = -x^2 - 8x - 20\)?`, -4, T`\(-\frac{-8}{2(-1)} = \frac{8}{-2}\).`],
      [T`What is the maximum value of \(y = -x^2 - 8x - 20\)?`, -4, T`Substitute \(x = -4\): \(-16 + 32 - 20\).`],
      [T`What is the axis of symmetry of \(y = 3(x + 1)(x - 5)\)?`, 2, T`Halfway between the roots \(-1\) and 5.`],
      [T`A parabola passes through \((-3, 7)\) and \((5, 7)\). Its axis of symmetry?`, 1, T`Equal heights: the midpoint of \(-3\) and 5.`]
    ]
  },
  'Rational expressions': {
    hook: T`
<p>A rational expression is a fraction built from polynomials. Every fraction rule you know still applies: simplify by cancelling common factors, and add over a common denominator.</p>
<p>Two cautions. Only factors cancel, never terms: in \(\frac{x + 3}{x}\), the top \(x\) is part of a sum and cannot cancel. And a denominator can never be zero, so record the forbidden values before you simplify.</p>`,
    vary: [
      [T`Simplify \(\dfrac{x^2 - 4}{x - 2}\), then evaluate at \(x = 5\).`, 7, T`It simplifies to \(x + 2\).`],
      [T`Simplify \(\dfrac{x^2 - 4}{x + 2}\), then evaluate at \(x = 5\).`, 3, T`The other factor cancels this time, leaving \(x - 2\).`],
      [T`Simplify \(\dfrac{x^2 + 4x + 4}{x + 2}\), then evaluate at \(x = 5\).`, 7, T`A perfect square: \(\frac{(x+2)^2}{x+2} = x + 2\).`],
      [T`Which value of \(x\) is excluded from \(\dfrac{x + 1}{x - 4}\)?`, 4, 'The denominator is zero there.'],
      [T`\(\dfrac1x + \dfrac{1}{2x} = \dfrac{k}{2x}\). Find \(k\).`, 3, T`Rewrite \(\frac1x\) as \(\frac{2}{2x}\), then add.`]
    ]
  },
  'Lines and slope': {
    hook: T`
<p>Slope measures steepness: how far a line rises for each step it runs to the right. A road with slope 0.06 climbs 6 m for every 100 m forward.</p>
<p>Positive slope rises, negative slope falls, and zero is flat. In \(y = mx + b\), \(m\) is the slope and \(b\) is where the line crosses the \(y\)-axis.</p>
${fig('slope', {}, 'The green run and red rise form a right triangle. Their ratio is the slope.')}`,
    vary: [
      [T`Find the slope through \((0, 1)\) and \((2, 5)\).`, 2, 'Rise 4 over run 2.'],
      [T`Find the slope through \((0, 1)\) and \((2, -3)\).`, -2, 'The second point dropped below the first: negative slope.'],
      [T`Find the slope through \((0, 1)\) and \((4, -3)\).`, -1, 'Same drop, twice the run: half as steep.'],
      [T`Find the slope through \((0, 1)\) and \((4, 1)\).`, 0, 'No rise at all: a horizontal line.'],
      [T`What is the slope of a line perpendicular to one with slope \(\tfrac23\)?`, -1.5, T`Flip and change sign: \(-\frac32\).`]
    ]
  },
  'Systems of equations': {
    hook: T`
<p>Two equations in two unknowns describe two lines. The solution is the point on both lines at once: where they cross.</p>
${fig('system', {}, T`The lines meet at \((3, 2)\), the only point that satisfies both equations.`)}
<p>Parallel lines never meet (no solution). The same line written twice meets itself everywhere (infinitely many solutions).</p>`,
    vary: [
      [T`Solve \(x + y = 10\), \(x - y = 2\). Find \(x\).`, 6, T`Add the equations: \(2x = 12\).`],
      [T`Solve \(x + y = 10\), \(x - y = 4\). Find \(x\).`, 7, 'Only the second equation changed.'],
      [T`Solve \(x + y = 10\), \(2x - y = 2\). Find \(x\).`, 4, T`Adding still eliminates \(y\): \(3x = 12\).`],
      [T`How many solutions do \(x + y = 10\) and \(x + y = 12\) have?`, 0, 'Same left side, different totals: parallel lines.']
    ]
  },
  'Percent and proportion': {
    hook: T`
<p>Percent means "per hundred". A bar model makes percent changes concrete. A 20% increase adds a fifth of the original bar. A 20% decrease then removes a fifth of the new, longer bar. That is a bigger piece, so you end up below where you started.</p>
${fig('percentBar', {}, T`\(100 \to 120 \to 96\).`)}`,
    vary: [
      [T`What is 20% of 50?`, 10, 'Multiply by 0.2.'],
      [T`Increase 50 by 20%.`, 60, 'Multiply by 1.2.'],
      [T`Decrease 60 by 20%.`, 48, 'The 20% now applies to 60, not 50.'],
      [T`A price falls from 80 to 60. What is the percent decrease?`, 25, T`Divide the change by the original: \(\frac{20}{80}\).`],
      [T`A price rises 25%, then falls 20%. What is the net percent change?`, 0, T`\(1.25\times0.8 = 1\).`]
    ]
  }
});
