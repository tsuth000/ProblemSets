registerLessons('calc1', {
  'Limits and limit laws': {
    hook: T`
<p>A limit asks where a function is heading, not where it is. Think of a doorway that has been bricked over: you can still tell exactly where the door would be, even though you cannot stand in it.</p>
<p>\(f(x) = \frac{x^2 - 9}{x - 3}\) is undefined at \(x = 3\), yet its values close in on 6 from both sides:</p>
<table class="tt"><tr><th>\(x\)</th><td>2.9</td><td>2.99</td><td>3.01</td><td>3.1</td></tr><tr><th>\(f(x)\)</th><td>5.9</td><td>5.99</td><td>6.01</td><td>6.1</td></tr></table>
${fig('limitHole', {}, 'The graph is the line y = x + 3 with one point missing. The limit fills in the gap.')}`,
    vary: [
      [T`Evaluate \(\displaystyle\lim_{x\to2}\frac{x^2 - 4}{x - 2}\).`, 4, T`Factor, cancel \(x - 2\), substitute.`],
      [T`Evaluate \(\displaystyle\lim_{x\to-2}\frac{x^2 - 4}{x + 2}\).`, -4, T`A different factor cancels this time, leaving \(x - 2\).`],
      [T`Evaluate \(\displaystyle\lim_{x\to2}(x^2 + 4)\).`, 8, T`No zero denominator, so just substitute.`],
      [T`Evaluate \(\displaystyle\lim_{x\to1}\frac{x^3 - 1}{x - 1}\).`, 3, T`\(x^3 - 1 = (x - 1)(x^2 + x + 1)\).`]
    ]
  },
  'Limits at infinity': {
    hook: T`
<p>As \(x\) grows huge, small terms stop mattering. When \(x\) is a billion, \(3x^2 + 1000\) is essentially \(3x^2\).</p>
<p>So \(\frac{3x^2 + 1}{5x^2 - x}\) behaves like \(\frac{3x^2}{5x^2} = \frac35\). Compare growth rates: whichever part of the fraction grows faster wins.</p>`,
    vary: [
      [T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{4x + 1}{2x - 3}\).`, 2, T`Equal growth: \(\frac42\).`],
      [T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{4x + 1}{2x^2 - 3}\).`, 0, T`The bottom grows faster.`],
      [T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{4x^2 + 1}{2x^2 - 3}\).`, 2, T`Equal degrees again.`],
      [T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{1 - 5x^3}{x^3 + 2}\).`, -5, T`Look past the order of the terms to the leading ones.`],
      [T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{x^2}{x + 1}\).`, [T`\(\infty\)`, '1', '0'], T`The top grows faster.`]
    ]
  },
  'Special limits and the squeeze theorem': {
    hook: T`
<p>If a function is trapped between two others, and both of them head to the same value, the trapped function has to go there too.</p>
<p>\(x^2\sin\frac1x\) wiggles infinitely fast near 0, but it is pinned between \(-x^2\) and \(x^2\), and both of those go to 0.</p>
${fig('squeeze', {}, T`The red curve cannot escape the green bounds.`)}`,
    vary: [
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\sin 3x}{3x}\).`, 1, T`The basic limit in disguise.`],
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\sin 3x}{x}\).`, 3, T`The denominator lost its 3, so multiply by 3.`],
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\sin 3x}{6x}\).`, 0.5, T`\(\frac36\).`],
      [T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{\sin x}{x}\).`, 0, T`Different destination: bounded top over a growing bottom.`],
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{1 - \cos x}{x}\).`, 0, T`A second standard limit worth memorizing.`]
    ]
  },
  "L'Hôpital's rule": {
    hook: T`
<p>When the top and bottom both go to 0, the ratio depends on how fast each gets there, and speed is a derivative. L'Hôpital's rule compares their rates: replace the top and bottom by their derivatives and try again.</p>`,
    vary: [
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\sin x}{x}\).`, 1, T`\(\frac{\cos x}{1} \to 1\).`],
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{e^{2x} - 1}{x}\).`, 2, T`The top's derivative is \(2e^{2x}\).`],
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{e^{2x} - 1}{3x}\).`, 2 / 3, T`Same top, a faster bottom.`],
      [T`Evaluate \(\displaystyle\lim_{x\to\infty}\frac{\ln x}{x}\).`, 0, T`An \(\frac\infty\infty\) form: \(\frac{1/x}{1} \to 0\).`],
      [T`Evaluate \(\displaystyle\lim_{x\to1}\frac{\ln x}{x - 1}\).`, 1, T`A \(\frac00\) form at a different point.`]
    ]
  },
  'Continuity': {
    hook: T`
<p>A continuous function is one you can draw without lifting your pen. Breaks come in three kinds: a hole (one point missing or misplaced), a jump (the graph leaps), and a blow-up (a vertical asymptote).</p>
${fig('continuity', {}, 'The three ways a graph can break.')}`,
    vary: [
      [T`For which \(k\) is \(f(x) = kx\) for \(x < 1\), \(x + 2\) for \(x \ge 1\), continuous?`, 3, T`Make the pieces meet at \(x = 1\): \(k = 3\).`],
      [T`Same pieces, but the switch happens at \(x = 2\). Find \(k\).`, 2, T`Now they must meet at \(x = 2\): \(2k = 4\).`],
      [T`Now the left piece is \(kx^2\), switching at \(x = 2\). Find \(k\).`, 1, T`\(4k = 4\).`],
      [T`What kind of discontinuity does \(\dfrac{x^2 - 1}{x - 1}\) have at \(x = 1\)?`, ['removable', 'jump', 'infinite'], T`The factor cancels, leaving a hole.`]
    ]
  },
  'IVT and MVT': {
    hook: T`
<p><b>Intermediate value theorem:</b> walk from the bottom of a hill to the top, and at some moment you stood at every height in between.</p>
<p><b>Mean value theorem:</b> drive 120 miles in 2 hours, and at some instant your speedometer read exactly 60 mph. Somewhere the tangent line is parallel to the secant line.</p>
${fig('mvt', {}, T`The green tangent at \(c\) is parallel to the red secant.`)}`,
    vary: [
      [T`For \(f(x) = x^2\) on \([0, 4]\), find the \(c\) promised by the MVT.`, 2, T`Average slope 4; \(2c = 4\).`],
      [T`Same function on \([0, 6]\). Find \(c\).`, 3, T`Average slope 6.`],
      [T`Find the average slope of \(f(x) = x^3\) on \([0, 3]\).`, 9, T`\(\frac{27 - 0}{3}\).`],
      [T`Does the IVT guarantee a root of \(x^2 - 2\) on \([1, 2]\)?`, ['Yes', 'No'], T`\(f(1) = -1 < 0 < 2 = f(2)\), and \(f\) is continuous.`]
    ]
  },
  'The derivative': {
    hook: T`
<p>Speed is distance over time, but over what time? An average uses two moments. A speedometer shows a single instant.</p>
<p>The derivative is the instant version: take the average slope over a tiny interval \(h\), and let \(h\) shrink toward 0. Shrink \(h\) below and watch the secant line pivot into the tangent line.</p>
${fig('secant', {}, T`\(f(x) = \tfrac12x^2 + \tfrac12\) near \(x = 1\).`)}`,
    vary: [
      [T`Find the average rate of change of \(x^2\) from \(x = 1\) to \(x = 3\).`, 4, T`\(\frac{9 - 1}{2}\).`],
      [T`Now from \(x = 1\) to \(x = 2\).`, 3, T`A narrower interval.`],
      [T`Now from \(x = 1\) to \(x = 1.1\).`, 2.1, T`Narrower still: \(\frac{1.21 - 1}{0.1}\).`],
      [T`Find the instantaneous rate of change of \(x^2\) at \(x = 1\).`, 2, T`The limit of the pattern 4, 3, 2.1, ...`]
    ]
  },
  'Differentiation rules': {
    hook: T`
<p>Using the limit definition every time would be slow, so we derive rules once and reuse them. The power rule handles \(x^n\); sums split apart; constants ride along.</p>
<p>Products and quotients need their own rules, because the derivative of a product is not the product of the derivatives.</p>`,
    vary: [
      [T`Find the derivative of \(x^5\) at \(x = 1\).`, 5, T`\(5x^4\).`],
      [T`Find the derivative of \(3x^5\) at \(x = 1\).`, 15, T`The constant rides along.`],
      [T`Find the derivative of \(3x^5 + x^2\) at \(x = 1\).`, 17, T`Sums split: \(15 + 2\).`],
      [T`Find the derivative of \(x\cdot x\) at \(x = 3\), using the product rule.`, 6, T`\(1\cdot x + x\cdot1 = 2x\). Not \(1\cdot1\).`],
      [T`Find the derivative of \(\dfrac{x^5}{x^2}\) at \(x = 1\).`, 3, T`Simplify first: \(x^3\).`]
    ]
  },
  'The chain rule': {
    hook: T`
<p>Picture gears. If gear A turns 3 times as fast as gear B, and B turns 2 times as fast as C, then A turns 6 times as fast as C. Rates passed along a chain multiply.</p>
<p>For a function inside a function, take the outer derivative (leaving the inside alone) and multiply by the inner derivative.</p>`,
    vary: [
      [T`Find the derivative of \((x^2)^3\) at \(x = 1\).`, 6, T`\(3(x^2)^2\cdot2x\). Check: it is \(x^6\).`],
      [T`Find the derivative of \((2x)^3\) at \(x = 1\).`, 24, T`\(3(2x)^2\cdot2\).`],
      [T`Find the derivative of \((2x + 1)^3\) at \(x = 0\).`, 6, T`\(3(1)^2\cdot2\).`],
      [T`Find the derivative of \(\sin 2x\) at \(x = 0\).`, 2, T`\(\cos 2x\cdot2\).`],
      [T`Find the derivative of \(e^{3x}\) at \(x = 0\).`, 3, T`\(e^{3x}\cdot3\).`]
    ]
  },
  'Implicit differentiation': {
    hook: T`
<p>Some curves, such as a circle, are not a single function \(y = f(x)\). They still have slopes.</p>
<p>Treat \(y\) as an unknown function of \(x\) and differentiate both sides. The chain rule gives every \(y\)-term a factor \(\frac{dy}{dx}\). Then solve for it.</p>
${fig('implicitCircle', {}, T`On \(x^2 + y^2 = 25\) the tangent is perpendicular to the radius.`)}`,
    vary: [
      [T`On \(x^2 + y^2 = 25\), find the slope at \((3, 4)\).`, -0.75, T`\(-\frac xy\).`],
      [T`Same circle, at \((4, 3)\).`, -4 / 3, T`Further around the circle, steeper.`],
      [T`Same circle, at \((3, -4)\).`, 0.75, T`The bottom half slopes the other way.`],
      [T`Same circle, at \((5, 0)\).`, ['undefined (vertical)', '0', '1'], T`\(y = 0\) in the denominator: a vertical tangent.`],
      [T`On \(xy = 6\), find the slope at \((2, 3)\).`, -1.5, T`\(y + xy' = 0\), so \(y' = -\frac yx\).`]
    ]
  },
  'Related rates': {
    hook: T`
<p>When quantities are tied together by an equation, their rates of change are tied together too. Find the equation that links them, differentiate it with respect to time, and substitute the values at the moment you care about.</p>
${fig('ladder', {}, T`\(x^2 + y^2 = 25\) links the ladder's base and top, so it links their speeds.`)}`,
    vary: [
      [T`A square's side grows at 2 cm/s. How fast is the area growing when the side is 5 cm?`, 20, T`\(A' = 2s\,s' = 2(5)(2)\).`],
      [T`Same, but when the side is 10 cm.`, 40, T`The same side rate on a bigger square adds more area.`],
      [T`A circle's radius grows at 1 cm/s. Find \(\frac{dA}{dt}\) at \(r = 3\), as a multiple of \(\pi\).`, 6, T`\(2\pi r\,r'\).`],
      [T`A cube's side grows at 1 cm/s. Find \(\frac{dV}{dt}\) when the side is 2 cm.`, 12, T`\(3s^2 s'\).`]
    ]
  },
  'Curve sketching and extrema': {
    hook: T`
<p>\(f'\) gives direction: positive means rising, negative means falling, and zero means level, at a peak, a valley, or a pause.</p>
<p>\(f''\) gives the bend: positive cups upward, negative caps downward. In the figure, the top graph peaks exactly where the bottom graph, its derivative, crosses zero.</p>
${fig('fDeriv', {}, T`\(f(x) = x^3 - 3x\) above its derivative \(f'(x) = 3x^2 - 3\). Between the zeros of \(f'\), where \(f' < 0\), the top graph falls; outside them it rises.`)}`,
    vary: [
      [T`How many critical points does \(x^3 - 3x\) have?`, 2, T`\(3x^2 - 3 = 0\).`],
      [T`At what \(x\) does \(x^3 - 3x\) have a local maximum?`, -1, T`\(f'\) changes from positive to negative there.`],
      [T`At what \(x\) is the inflection point of \(x^3 - 3x\)?`, 0, T`\(f'' = 6x\) changes sign at 0.`],
      [T`How many critical points does \(x^3\) have?`, 1, T`\(3x^2 = 0\) only at 0.`],
      [T`How many local extrema does \(x^3\) have?`, 0, T`It levels off at 0 but keeps rising: a critical point is not always an extremum.`]
    ]
  },
  'Optimization': {
    hook: T`
<p>Many problems ask for the best: the largest volume, the cheapest design, the shortest path. Write the quantity as a function of one variable, then look where its slope is zero.</p>
${fig('boxOpt', {}, 'Cut squares of side x from the corners of a 12-by-12 sheet and fold up the sides.')}`,
    vary: [
      [T`Two numbers add to 10. What is their largest possible product?`, 25, T`\(5\times5\).`],
      [T`Two numbers add to 20. What is their largest possible product?`, 100, T`Double the sum, four times the product.`],
      [T`A rectangle has perimeter 40. What is its largest possible area?`, 100, T`The same problem in disguise: the sides add to 20.`],
      [T`40 m of fence encloses three sides of a rectangle by a river. What is the largest area?`, 200, T`With one side free, the best shape is twice as long as it is wide: 10 by 20.`]
    ]
  },
  'Antiderivatives': {
    hook: T`
<p>Differentiation goes from position to speed. Antidifferentiation goes back: given the speed at every moment, you can recover the position, up to where you started. That unknown starting point is the \(+C\).</p>
<p>Every antiderivative rule is a derivative rule read backward.</p>`,
    vary: [
      [T`\(\int 3x^2\,dx\) equals:`, [T`\(x^3 + C\)`, T`\(6x + C\)`, T`\(x^3\)`], T`The derivative of \(x^3\) is \(3x^2\). Keep the \(+C\).`],
      [T`\(\int 6x^2\,dx = kx^3 + C\). Find \(k\).`, 2, T`Twice the previous integrand.`],
      [T`\(\int x^4\,dx = kx^5 + C\). Find \(k\).`, 0.2, T`Divide by the new power.`],
      [T`\(f'(x) = 2x\) and \(f(0) = 5\). Find \(f(2)\).`, 9, T`\(f(x) = x^2 + 5\).`],
      [T`\(f'(x) = \cos x\) and \(f(0) = 1\). Find \(f\left(\frac\pi2\right)\).`, 2, T`\(f(x) = \sin x + 1\).`]
    ]
  },
  'Definite integrals and the FTC': {
    hook: T`
<p>The area under a curve can be approximated by thin rectangles. More rectangles give a better estimate; in the limit, the estimate becomes exact.</p>
${fig('riemann', {}, 'Raise n and watch the error shrink.')}
<p>The Fundamental Theorem says you can skip the infinite sum. Find any antiderivative \(F\); the exact area is \(F(b) - F(a)\).</p>`,
    vary: [
      [T`Evaluate \(\displaystyle\int_0^2 x\,dx\).`, 2, T`A triangle: \(\frac12(2)(2)\).`],
      [T`Evaluate \(\displaystyle\int_0^4 x\,dx\).`, 8, T`Twice as wide and twice as tall: four times the area.`],
      [T`Evaluate \(\displaystyle\int_0^2 x^2\,dx\).`, 8 / 3, T`\(\left[\frac{x^3}{3}\right]_0^2\).`],
      [T`Evaluate \(\displaystyle\int_{-2}^2 x\,dx\).`, 0, T`The negative half cancels the positive half.`],
      [T`Evaluate \(\displaystyle\int_0^\pi\sin x\,dx\).`, 2, T`\([-\cos x]_0^\pi = 1 + 1\).`]
    ]
  },
  'Substitution': {
    hook: T`
<p>Substitution is the chain rule run backward. If the integrand contains a function together with that function's derivative, rename the inside \(u\), and the integral collapses into a simple one.</p>`,
    vary: [
      [T`Evaluate \(\displaystyle\int_0^1 2x\,dx\).`, 1, T`Warm-up, no substitution needed.`],
      [T`Evaluate \(\displaystyle\int_0^1 2x\,(x^2)^2\,dx\).`, 1 / 3, T`\(u = x^2\), \(du = 2x\,dx\): \(\int_0^1 u^2\,du\).`],
      [T`Evaluate \(\displaystyle\int_0^1 2x\,(x^2 + 1)\,dx\).`, 1.5, T`\(u = x^2 + 1\) runs from 1 to 2: \(\int_1^2 u\,du\).`],
      [T`Evaluate \(\displaystyle\int_0^{\pi/2}\cos x\sin x\,dx\).`, 0.5, T`\(u = \sin x\) runs from 0 to 1: \(\int_0^1 u\,du\).`]
    ]
  }
});
