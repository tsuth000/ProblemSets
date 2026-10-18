registerLessons('precalc', {
  'Functions and domain': {
    hook: T`
<p>A function is a machine: put in an input, get exactly one output. A vending machine is a function from buttons to snacks. It would be broken if one button sometimes gave chips and sometimes candy.</p>
<p>The domain is the set of inputs the machine accepts. In algebra, an input breaks the machine in three ways: it makes a denominator zero, puts a negative number under an even root, or gives a logarithm a number that is not positive.</p>`,
    vary: [
      [T`\(f(x) = x^2 - 3x\). Find \(f(4)\).`, 4, T`Substitute: \(16 - 12\).`],
      [T`Same \(f\). Find \(f(-4)\).`, 28, T`A negative squared is positive: \(16 + 12\).`],
      [T`Which \(x\) is excluded from the domain of \(f(x) = \dfrac{1}{x - 3}\)?`, 3, T`The denominator is zero there.`],
      [T`What is the smallest \(x\) in the domain of \(f(x) = \sqrt{x - 3}\)?`, 3, T`The inside must be at least 0.`],
      [T`What is the largest \(x\) in the domain of \(f(x) = \sqrt{3 - x}\)?`, 3, T`The inside reversed, so the domain points the other way.`]
    ]
  },
  'Transformations': {
    hook: T`
<p>Learn a handful of parent graphs, such as \(x^2\), \(|x|\), \(\sqrt x\), \(\frac1x\), and \(e^x\), and you can sketch thousands of others by moving them.</p>
<p>Changes outside the function act on outputs: they move the graph up or down, or stretch it. Changes inside act on inputs, and they act in the direction opposite to the sign you see: \(f(x - 2)\) moves right.</p>
${fig('transform', {}, 'The faint curve is the parent graph. The red dot tracks where the origin moved.')}`,
    vary: [
      [T`What is the \(x\)-coordinate of the vertex of \(y = (x - 2)^2\)?`, 2, T`Inside \(-2\) moves right.`],
      [T`What is the \(x\)-coordinate of the vertex of \(y = (x + 2)^2\)?`, -2, T`The sign inside flipped, so the shift reverses.`],
      [T`What is the \(y\)-coordinate of the vertex of \(y = (x + 2)^2 - 5\)?`, -5, T`Outside changes move the graph exactly as written.`],
      [T`At what \(x\) does \(y = \sqrt{x - 4}\) start?`, 4, T`The same horizontal rule, applied to a different parent.`],
      [T`What is the maximum value of \(y = -|x| + 3\)?`, 3, T`Flipped downward, then lifted 3.`]
    ]
  },
  'Composition and inverses': {
    hook: T`
<p>Composition chains machines: the output of \(g\) becomes the input of \(f\). Read \(f(g(x))\) from the inside out.</p>
<p>An inverse runs a machine backward. If \(f\) turns 2 into 7, then \(f^{-1}\) turns 7 back into 2. On a graph, swapping inputs and outputs reflects the curve across the line \(y = x\).</p>
${fig('inverseReflect', {}, T`\(e^x\) and \(\ln x\) undo each other. The point \((0, 1)\) on one becomes \((1, 0)\) on the other.`)}`,
    vary: [
      [T`\(f(x) = 2x + 1\), \(g(x) = x^2\). Find \(f(g(3))\).`, 19, T`\(g(3) = 9\), then \(f(9)\).`],
      [T`Same functions. Find \(g(f(3))\).`, 49, T`The order changed: \(f(3) = 7\), then \(g(7)\).`],
      [T`For \(f(x) = 2x + 1\), find \(f^{-1}(7)\).`, 3, T`Which input gives 7?`],
      [T`Find \(f^{-1}(f(10))\).`, 10, T`Undoing returns the original input.`],
      [T`If \(f(4) = 9\), find \(f^{-1}(9)\).`, 4, T`No formula needed: the inverse swaps the pair.`]
    ]
  },
  'Polynomial functions': {
    hook: T`
<p>Far from the origin, a polynomial behaves like its leading term. Once \(x\) is large, \(x^3 - 100x\) looks like \(x^3\).</p>
<p>Near the origin, the zeros shape the graph. Each factor \((x - r)\) puts a zero at \(r\). If a factor appears an even number of times, the graph only touches the axis there and turns back.</p>
${fig('polyZeros', {}, T`\(f(x) = \tfrac14(x + 2)(x - 1)^2(x - 3)\).`)}`,
    vary: [
      [T`The zeros of \((x - 1)(x + 4)\) are added together. What is the sum?`, -3, T`Zeros at 1 and \(-4\).`],
      [T`What is the degree of \(x^3(x - 2)^2\)?`, 5, T`Degrees add: \(3 + 2\).`],
      [T`As \(x \to \infty\), \(f(x) = -x^4 + 10x\) goes to:`, [T`\(-\infty\)`, T`\(\infty\)`, '0'], T`The leading term \(-x^4\) wins.`],
      [T`At \(x = 2\), the graph of \((x - 2)^3\):`, ['crosses the axis', 'touches and turns', 'has an asymptote'], T`Odd multiplicity crosses.`],
      [T`What is the most real zeros a degree-5 polynomial can have?`, 5, T`One per degree, at most.`]
    ]
  },
  'Rational functions': {
    hook: T`
<p>Divide by a number close to zero and the result is huge. Near a zero of the denominator, the graph shoots up or down: a vertical asymptote.</p>
<p>For very large \(x\), only the leading terms matter, so the graph levels off at their ratio: a horizontal asymptote. If a factor cancels from top and bottom, the graph has a single missing point, a hole.</p>
${fig('rational', {}, T`\(\dfrac{2x^2 - 2}{x^2 - x - 2}\): asymptotes \(x = 2\) and \(y = 2\), and a hole at \(x = -1\).`)}`,
    vary: [
      [T`Find the horizontal asymptote \(y = ?\) of \(\dfrac{3x + 1}{x - 2}\).`, 3, T`Equal degrees: ratio of leading coefficients.`],
      [T`Find the vertical asymptote \(x = ?\) of the same function.`, 2, T`Where the denominator is zero.`],
      [T`Find the horizontal asymptote of \(\dfrac{3x + 1}{x^2 - 2}\).`, 0, T`The bottom now grows faster.`],
      [T`Find the horizontal asymptote of \(\dfrac{6x^2}{2x^2 + 1}\).`, 3, T`Equal degrees again: \(\frac62\).`],
      [T`Where is the hole in \(\dfrac{x - 1}{(x - 1)(x + 3)}\)?`, 1, T`The cancelled factor.`]
    ]
  },
  'Exponential functions': {
    hook: T`
<p>Linear growth adds the same amount each step. Exponential growth multiplies by the same factor each step. A salary of $1 that doubles daily pays $1, $2, $4, $8, and passes a million dollars on day 21.</p>
${fig('expCurves', {}, T`Bases above 1 grow; bases between 0 and 1 decay. Every curve passes through \((0, 1)\).`)}`,
    vary: [
      [T`Evaluate \(2^5\).`, 32, T`Five doublings.`],
      [T`A quantity doubles every 3 years. By what factor does it grow in 12 years?`, 16, T`Four doubling periods: \(2^4\).`],
      [T`A quantity halves every 3 years. What fraction remains after 12 years?`, 0.0625, T`Four halvings: \(\left(\frac12\right)^4\).`],
      [T`100 grows by 10% per year. What is it after 2 years?`, 121, T`Multiply by 1.1 twice, not add 10 twice.`],
      [T`What is \(b^0\) for any \(b > 0\)?`, 1, T`This is why every curve passes through \((0, 1)\).`]
    ]
  },
  'Logarithms': {
    hook: T`
<p>A logarithm answers "what exponent?". \(\log_2 8 = 3\) because \(2^3 = 8\).</p>
<p>Logarithms turn multiplication into addition. That is why a log scale can fit enormous ranges on one axis, as earthquake magnitudes and decibels do, and why the slide rule worked.</p>`,
    vary: [
      [T`Evaluate \(\log_2 8\).`, 3, T`\(2^3 = 8\).`],
      [T`Evaluate \(\log_2 16\).`, 4, T`One more doubling, one more in the log.`],
      [T`Evaluate \(\log_2\frac18\).`, -3, T`A reciprocal flips the sign of the exponent.`],
      [T`Evaluate \(\log_{10} 1000\).`, 3, T`A new base, the same question.`],
      [T`\(\log_2 8 + \log_2 4 = \log_2 N\). Find \(N\).`, 32, T`A sum of logs is the log of the product.`]
    ]
  },
  'Exponential and logarithmic equations': {
    hook: T`
<p>When the unknown sits in an exponent, logarithms bring it down to ground level: \(\log(b^x) = x\log b\).</p>
<p>When the unknown sits inside a logarithm, rewrite the log as an exponent. Then check your answer, because a logarithm's input must be positive.</p>`,
    vary: [
      [T`Solve \(2^x = 32\).`, 5, T`Write 32 as a power of 2.`],
      [T`Solve \(2^{x + 1} = 32\).`, 4, T`The exponent is \(x + 1\) now, so \(x\) is one less.`],
      [T`Solve \(3^{2x} = 81\).`, 2, T`\(2x = 4\).`],
      [T`Solve \(\log_2 x = 5\).`, 32, T`Rewrite as \(x = 2^5\).`],
      [T`Solve \(\log_2(x - 1) = 3\).`, 9, T`\(x - 1 = 8\).`]
    ]
  },
  'Sequences and series': {
    hook: T`
<p>An arithmetic sequence adds a fixed step: 3, 7, 11, 15. A geometric sequence multiplies by a fixed ratio: 3, 6, 12, 24.</p>
<p>A geometric series can add forever and still give a finite total. Fill a square with half of it, then half of what is left, then half again. The pieces never overflow the square.</p>
${fig('geoSquares', {}, T`\(\tfrac12 + \tfrac14 + \tfrac18 + \cdots = 1\).`)}`,
    vary: [
      [T`Find the next term: 3, 7, 11, ...`, 15, T`Add 4.`],
      [T`Find the 10th term of 3, 7, 11, ...`, 39, T`Nine steps of 4 after the first term.`],
      [T`Find the next term: 3, 6, 12, ...`, 24, T`Multiply by 2 instead of adding.`],
      [T`Find \(1 + \frac12 + \frac14 + \cdots\).`, 2, T`\(\frac{1}{1 - 1/2}\).`],
      [T`Find \(1 + \frac13 + \frac19 + \cdots\).`, 1.5, T`A smaller ratio gives a smaller total.`]
    ]
  },
  'Conic sections': {
    hook: T`
<p>Slice a double cone with a flat plane. Cutting straight across gives a circle; tilting the cut gives an ellipse; cutting parallel to the cone's side gives a parabola; cutting steeper still gives a hyperbola.</p>
${fig('conics', {}, 'The four conics in standard position.')}
<p>Completing the square turns a messy equation into a standard form, from which you can read the center and size.</p>`,
    vary: [
      [T`What is the radius of \(x^2 + y^2 = 49\)?`, 7, T`\(r^2 = 49\).`],
      [T`What is the \(x\)-coordinate of the center of \((x - 2)^2 + (y + 1)^2 = 49\)?`, 2, T`The circle moved; its radius did not.`],
      [T`How long is the major axis of \(\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1\)?`, 10, T`\(2a = 2\cdot5\).`],
      [T`What is the radius of \(x^2 + y^2 - 6x = 0\)?`, 3, T`Complete the square: \((x - 3)^2 + y^2 = 9\).`]
    ]
  },
  'Complex numbers': {
    hook: T`
<p>No real number squares to \(-1\), so we invent one, \(i\), and keep every other rule of algebra.</p>
<p>A complex number \(a + bi\) is a point \((a, b)\) in a plane: real part across, imaginary part up. Multiplying by \(i\) rotates a point a quarter turn. Two quarter turns face backward, which is why \(i^2 = -1\).</p>
${fig('complexPlane', {}, T`\(z = 3 + 2i\) and its conjugate \(\bar z = 3 - 2i\), mirrored across the real axis.`)}`,
    vary: [
      [T`Find the real part of \((3 + 2i) + (1 - 5i)\).`, 4, T`Add real parts.`],
      [T`Find the imaginary part of the same sum.`, -3, T`Add imaginary parts.`],
      [T`Compute \((3 + 2i)(3 - 2i)\).`, 13, T`A number times its conjugate is \(a^2 + b^2\), always real.`],
      [T`Find \(|3 + 4i|\).`, 5, T`The distance from the origin: a 3-4-5 triangle.`],
      [T`Evaluate \(i^8\).`, 1, T`Eight quarter turns are two full turns.`]
    ]
  },
  'Polar coordinates': {
    hook: T`
<p>Instead of "go 1 left and \(\sqrt3\) up", polar coordinates say "face \(120^\circ\) and walk 2 units". Both describe the same point.</p>
${fig('polarPoint', {}, T`\((-1, \sqrt3)\) in rectangular form is \(\left(2, \tfrac{2\pi}{3}\right)\) in polar form.`)}
<p>Polar coordinates suit anything circular or rotating: radar, orbits, spirals.</p>`,
    vary: [
      [T`Find \(r\) for the point \((3, 4)\).`, 5, T`\(r = \sqrt{x^2 + y^2}\).`],
      [T`Find \(x\) for \(r = 2\), \(\theta = 0\).`, 2, T`Facing straight along the \(x\)-axis.`],
      [T`Find \(y\) for \(r = 2\), \(\theta = \frac\pi2\).`, 2, T`Facing straight up.`],
      [T`Find \(x\) for \(r = 2\), \(\theta = \pi\).`, -2, T`Facing left.`],
      [T`Find \(\theta\) in degrees, between 0 and 360, for the point \((0, -5)\).`, 270, T`Straight down.`]
    ]
  }
});
