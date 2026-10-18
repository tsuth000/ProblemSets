'use strict';
// Version 1.5.1: teach every question type that the unit generators and fixed problems ask.
// extendCard appends to a unit without replacing what is there: more (HTML after the main notes),
// exs (extra worked examples), vary (extra "Your turn" problems, appended at the end).
(() => {
  const extendCard = (sid, title, add) => {
    const s = window.SUBJECTS.find(x => x.id === sid), card = s && s.learn.find(c => c.title === title);
    if (!card) { window.LESSON_MISSES.push(`${sid}: extend ${title}`); return; }
    if (add.more) card.more = (card.more || '') + add.more;
    if (add.exs) card.exs = (card.exs || []).concat(add.exs);
    if (add.vary) card.vary = (card.vary || []).concat(add.vary);
  };
  window.extendCard = extendCard;

  // ======================= ALGEBRA =======================
  extendCard('algebra', 'Inequalities', {
    more: T`
<h4>Integer solutions</h4>
<p>Some questions ask for whole numbers inside the solution set. Solve the inequality first, then read the integers off the number line.</p>
<table class="tt"><tr><th>Solution set</th><th>Question</th><th>Answer</th></tr>
<tr><td>\(x \ge 2.25\)</td><td>smallest integer</td><td>3</td></tr>
<tr><td>\(x > 3\)</td><td>smallest integer</td><td>4</td></tr>
<tr><td>\(x \le -1.5\)</td><td>largest integer</td><td>\(-2\)</td></tr>
<tr><td>\(x < 5\)</td><td>largest integer</td><td>4</td></tr></table>
<p>Move in the direction the solution set allows, never to the nearest integer. For \(x \ge 2.25\), rounding gives 2, but \(2 < 2.25\), so 2 is not a solution. For \(x \le -1.5\), the next integer in the allowed direction (leftward) is \(-2\), not \(-1\).</p>
<p>To count the integers in a range, find the smallest included integer \(m\) and the largest included integer \(M\). There are \(M - m + 1\) of them. A strict sign at an integer endpoint excludes that endpoint.</p>`,
    exs: [
      { q: T`Find the smallest integer \(x\) that satisfies \(-4x - 1 \le -10\).`, a: T`
<p>Add 1: \(-4x \le -9\).</p>
<p>Divide by \(-4\) and reverse the sign: \(x \ge \frac94 = 2.25\).</p>
<p>The integers at or above 2.25 are 3, 4, 5, and so on. The smallest is 3.</p>
<p>Check: \(x = 3\) gives \(-13 \le -10\), true. \(x = 2\) gives \(-9 \le -10\), false.</p>` },
      { q: T`How many integers satisfy \(-4 \le 3x + 6 < 11\)?`, a: T`
<p>Subtract 6 from all three parts: \(-10 \le 3x < 5\). Divide by 3: \(-\frac{10}{3} \le x < \frac53\), about \(-3.33 \le x < 1.67\).</p>
<p>Smallest included integer: \(-3\). Largest: 1.</p>
<p>The integers are \(-3, -2, -1, 0, 1\): \(1 - (-3) + 1 = 5\).</p>` }
    ],
    vary: [
      [T`Find the smallest integer \(x\) with \(x \ge 2.25\).`, 3, T`Move up to the next integer; 2 is too small.`],
      [T`Find the largest integer \(x\) with \(x < 5\).`, 4, T`The strict sign excludes 5 itself.`],
      [T`Find the largest integer \(x\) with \(x \le 5\).`, 5, T`Now 5 is allowed.`],
      [T`Find the smallest integer \(x\) that satisfies \(-2x + 1 \le -6\).`, 4, T`\(-2x \le -7\), so \(x \ge 3.5\).`],
      [T`How many integers satisfy \(-2 \le x < 3\)?`, 5, T`\(-2, -1, 0, 1, 2\), which is \(2 - (-2) + 1\).`]
    ]
  });

  extendCard('algebra', 'Absolute value', {
    more: T`
<h4>Counting integer solutions</h4>
<p>Rewrite the absolute value as a band first. \(|x + 3| = |x - (-3)|\), so \(|x + 3| < 3\) says \(x\) is within 3 of \(-3\): \(-6 < x < 0\). The integers strictly inside are \(-5, -4, -3, -2, -1\): five of them.</p>
<p>With integer center \(a\) and integer radius \(c\): \(|x - a| < c\) holds for \(2c - 1\) integers, and \(|x - a| \le c\) holds for \(2c + 1\), because the two endpoints now count.</p>`,
    exs: [{ q: T`How many integers satisfy \(|x - 2| \le 3\)?`, a: T`
<p>The distance from \(x\) to 2 is at most 3: \(-1 \le x \le 5\).</p>
<p>The integers are \(-1, 0, 1, 2, 3, 4, 5\): seven, which matches \(2(3) + 1\).</p>` }],
    vary: [
      [T`How many integers satisfy \(|x| < 3\)?`, 5, T`\(-2\) through 2.`],
      [T`How many integers satisfy \(|x| \le 3\)?`, 7, T`The endpoints \(\pm3\) now count.`],
      [T`How many integers satisfy \(|x + 1| < 4\)?`, 7, T`The center is \(-1\): \(-5 < x < 3\).`]
    ]
  });

  extendCard('algebra', 'Quadratic inequalities', {
    more: T`
<h4>Integer questions</h4>
<p>Solve for the interval first, then read integers off it.</p>
<p><b>Between the roots</b> (\(\le 0\) for an upward parabola): the integers run from the smallest integer at or above \(r_1\) to the largest at or below \(r_2\). Count them as \(M - m + 1\).</p>
<p><b>Outside the roots</b> (\(\ge 0\) for an upward parabola): every number between the roots fails. If \(r_1 < 0 < r_2\), the positive integers below \(r_2\) all fail, so the smallest positive solution is the smallest integer at or above \(r_2\) (above it, for a strict \(>\)).</p>`,
    exs: [
      { q: T`How many integers satisfy \(x^2 - 11x + 18 \le 0\)?`, a: T`
<p>Factor: \((x - 2)(x - 9) \le 0\). Roots 2 and 9.</p>
<p>The parabola opens up, so it is at or below zero between the roots: \(2 \le x \le 9\).</p>
<p>The integers 2 through 9: \(9 - 2 + 1 = 8\).</p>` },
      { q: T`Find the smallest positive integer that satisfies \(x^2 - x - 42 \ge 0\).`, a: T`
<p>Factor: \((x + 6)(x - 7) \ge 0\). Roots \(-6\) and 7.</p>
<p>Upward parabola, so it is nonnegative outside the roots: \(x \le -6\) or \(x \ge 7\).</p>
<p>The positive integers 1 through 6 lie between the roots and fail (at 6: \(36 - 6 - 42 = -12\)). The smallest positive solution is 7.</p>` }
    ],
    vary: [
      [T`Find the smallest positive integer that satisfies \(x^2 - 2x - 8 \ge 0\).`, 4, T`\((x - 4)(x + 2)\): outside the roots \(-2\) and 4.`],
      [T`Same expression with \(> 0\). Find the smallest positive integer.`, 5, T`The strict sign excludes the root 4.`]
    ]
  });

  extendCard('algebra', 'Systems of equations', {
    more: T`
<h4>Word problems</h4>
<p>Give each unknown count a letter, then write one equation per fact. A total number of items gives one equation; a total value (price times count) gives the other. Solve by substitution, then check both facts.</p>`,
    exs: [{ q: T`A theater sold 41 tickets for $241. Adult tickets cost $8 and child tickets $5. How many adult tickets were sold?`, a: T`
<p>Let \(a\) be adult tickets and \(c\) child tickets.</p>
<p>Count: \(a + c = 41\). Money: \(8a + 5c = 241\).</p>
<p>Substitute \(c = 41 - a\): \(8a + 5(41 - a) = 241\), so \(3a + 205 = 241\), \(3a = 36\), \(a = 12\).</p>
<p>Then \(c = 29\). Check: \(8(12) + 5(29) = 96 + 145 = 241\).</p>` }],
    vary: [
      [T`10 coins, all nickels and dimes, are worth 70 cents. How many dimes?`, 4, T`\(n + d = 10\) and \(5n + 10d = 70\). Substitute: \(50 + 5d = 70\).`],
      [T`Same 10 coins, now worth 80 cents. How many dimes?`, 6, T`\(50 + 5d = 80\).`]
    ]
  });

  // ======================= CALCULUS 1 =======================
  extendCard('calc1', 'Special limits and the squeeze theorem', {
    more: T`
<h4>Scaled versions</h4>
<p>Each standard limit stretches to other constants:</p>
\[\lim_{x\to0}\frac{\sin ax}{bx} = \frac ab \qquad \lim_{x\to0}\frac{\tan ax}{bx} = \frac ab \qquad \lim_{x\to0}\frac{1 - \cos ax}{x^2} = \frac{a^2}{2}\]
<p>Tangent: \(\tan ax = \frac{\sin ax}{\cos ax}\), and \(\cos ax \to 1\), so only the sine matters.</p>
<p>Cosine over \(x^2\): multiply top and bottom by \(1 + \cos ax\). The top becomes \(1 - \cos^2 ax = \sin^2 ax\), so the expression is \(\left(\frac{\sin ax}{x}\right)^2\cdot\frac{1}{1 + \cos ax} \to a^2\cdot\frac12\).</p>`,
    exs: [
      { q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\tan 3x}{2x}\).`, a: T`
<p>\(\frac{\tan 3x}{2x} = \frac{\sin 3x}{3x}\cdot\frac32\cdot\frac{1}{\cos 3x}\).</p>
<p>The three factors go to 1, \(\frac32\), and 1. The limit is \(\frac32\).</p>` },
      { q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{1 - \cos 2x}{x^2}\).`, a: T`
<p>Multiply top and bottom by \(1 + \cos 2x\): \(\frac{\sin^2 2x}{x^2(1 + \cos 2x)} = \left(\frac{\sin 2x}{x}\right)^2\cdot\frac{1}{1 + \cos 2x}\).</p>
<p>\(\frac{\sin 2x}{x} \to 2\) and \(1 + \cos 2x \to 2\), so the limit is \(\frac{4}{2} = 2\), which matches \(\frac{a^2}{2}\) with \(a = 2\).</p>` }
    ],
    vary: [
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\tan 2x}{x}\).`, 2, T`Tangent behaves like sine near 0.`],
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{1 - \cos x}{x^2}\).`, 0.5, T`\(\frac{a^2}{2}\) with \(a = 1\). Dividing by \(x^2\) instead of \(x\) changes the answer from 0.`]
    ]
  });

  extendCard('calc1', "L'Hôpital's rule", {
    more: T`<p>Derivatives you will need on top: \(\frac{d}{dx}e^{ax} = ae^{ax}\) and \(\frac{d}{dx}\ln(1 + ax) = \frac{a}{1 + ax}\), both from the chain rule.</p>`,
    exs: [{ q: T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\ln(1 + 2x)}{3x}\).`, a: T`
<p>At 0 the top is \(\ln 1 = 0\) and the bottom is 0: a \(\frac00\) form.</p>
<p>Differentiate each: the top gives \(\frac{2}{1 + 2x}\), the bottom gives 3.</p>
<p>\(\frac{2/(1 + 2x)}{3} \to \frac23\).</p>` }],
    vary: [
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\ln(1 + x)}{x}\).`, 1, T`\(\frac{1/(1 + x)}{1} \to 1\).`],
      [T`Evaluate \(\displaystyle\lim_{x\to0}\frac{\ln(1 + 4x)}{2x}\).`, 2, T`\(\frac{4/(1 + 4x)}{2} \to 2\).`]
    ]
  });

  extendCard('calc1', 'Related rates', {
    more: T`
<p>Formulas that come up most, with their time derivatives:</p>
<table class="tt"><tr><th>Shape</th><th>Formula</th><th>Rate</th></tr>
<tr><td>square</td><td>\(A = s^2\)</td><td>\(A' = 2s\,s'\)</td></tr>
<tr><td>circle</td><td>\(A = \pi r^2\)</td><td>\(A' = 2\pi r\,r'\)</td></tr>
<tr><td>cube</td><td>\(V = s^3\)</td><td>\(V' = 3s^2 s'\)</td></tr>
<tr><td>sphere</td><td>\(V = \tfrac43\pi r^3\)</td><td>\(V' = 4\pi r^2 r'\)</td></tr></table>
<p>For a decimal answer, multiply out \(\pi\) at the end: \(4\pi(10)^2(2) = 800\pi \approx 2513.27\).</p>`,
    vary: [[T`A sphere's radius grows at 1 cm/s. Find \(\frac{dV}{dt}\) at \(r = 2\) cm, as a multiple of \(\pi\).`, 16, T`\(4\pi r^2 r' = 4\pi(4)(1)\).`]]
  });

  // ======================= CALCULUS 2 =======================
  extendCard('calc2', 'Series basics', {
    more: T`
<h4>Telescoping with a gap</h4>
\[\frac{1}{n(n + k)} = \frac1k\left(\frac1n - \frac{1}{n + k}\right)\]
<p>Write out the first terms. Each negative piece \(-\frac{1}{n + k}\) cancels a positive piece \(k\) steps later, so only the first \(k\) positive pieces survive:</p>
\[\sum_{n=1}^\infty\frac{1}{n(n + k)} = \frac1k\left(1 + \frac12 + \cdots + \frac1k\right)\]`,
    exs: [{ q: T`Find \(\displaystyle\sum_{n=1}^\infty\frac{1}{n(n + 2)}\).`, a: T`
<p>\(\frac{1}{n(n + 2)} = \frac12\left(\frac1n - \frac{1}{n + 2}\right)\).</p>
<p>Inside the bracket: \(\left(1 - \frac13\right) + \left(\frac12 - \frac14\right) + \left(\frac13 - \frac15\right) + \left(\frac14 - \frac16\right) + \cdots\)</p>
<p>Every \(-\frac13, -\frac14, \dots\) cancels later. Only \(1 + \frac12\) survives, so the sum is \(\frac12\cdot\frac32 = \frac34\).</p>` }],
    vary: [[T`Find \(\displaystyle\sum_{n=1}^\infty\frac{1}{n(n + 3)}\).`, 11 / 18, T`\(\frac13\left(1 + \frac12 + \frac13\right) = \frac13\cdot\frac{11}{6}\).`]]
  });

  extendCard('calc2', 'Parametric and polar calculus', {
    more: T`
<h4>Shapes you will meet</h4>
<p>\(r = a\) is a circle of radius \(a\): area \(\pi a^2\). \(r = a\sin\theta\) is a circle of diameter \(a\), traced once for \(0 \le \theta \le \pi\): area \(\frac{\pi a^2}{4}\).</p>
<p>\(r = a\cos 2\theta\) is a four-petal rose. As \(\theta\) runs from 0 to \(2\pi\), each petal is traced exactly once, and \(\int_0^{2\pi}\cos^2 2\theta\,d\theta = \pi\), so the total area is</p>
\[\tfrac12\int_0^{2\pi}a^2\cos^2 2\theta\,d\theta = \frac{\pi a^2}{2}.\]`,
    exs: [{ q: T`Find the total area enclosed by \(r = 4\cos 2\theta\).`, a: T`
<p>A four-petal rose, traced once over \([0, 2\pi]\).</p>
<p>\(\frac12\int_0^{2\pi}16\cos^2 2\theta\,d\theta = 8\cdot\pi = 8\pi \approx 25.13\).</p>` }],
    vary: [[T`Find the area enclosed by \(r = 2\cos 2\theta\), as a multiple of \(\pi\).`, 2, T`\(\frac{\pi a^2}{2}\) with \(a = 2\).`]]
  });

  // ======================= DISCRETE =======================
  extendCard('discrete', 'Counting principles', {
    more: T`
<h4>Stars and bars</h4>
<p>How many ways can \(x_1 + x_2 + \cdots + x_k = n\) with every \(x_i\) a nonnegative integer? Draw \(n\) stars and \(k - 1\) bars in a row. The bars split the stars into \(k\) groups, read left to right as \(x_1, \dots, x_k\). For \(n = 6\), \(k = 3\):</p>
<p class="ctr">\(\star\star\mid\star\mid\star\star\star\) means \((2, 1, 3)\), and \(\mid\star\star\star\star\star\star\mid\) means \((0, 6, 0)\).</p>
<p>Every row of \(n + k - 1\) symbols with \(k - 1\) bars is one solution, so the count is the number of ways to place the bars:</p>
\[\binom{n + k - 1}{k - 1}\]
<p>This is the table's "order ignored, repetition allowed" entry: choosing \(n\) items from \(k\) types.</p>`,
    exs: [{ q: T`How many nonnegative integer solutions does \(x_1 + x_2 + x_3 = 5\) have?`, a: T`
<p>Five stars and two bars: 7 positions, choose 2 for the bars.</p>
<p>\(\binom{7}{2} = 21\).</p>` }],
    vary: [
      [T`How many nonnegative integer solutions does \(x_1 + x_2 = 4\) have?`, 5, T`\((0,4), (1,3), \dots, (4,0)\): \(\binom{5}{1}\).`],
      [T`How many nonnegative integer solutions does \(x_1 + x_2 + x_3 = 4\) have?`, 15, T`One more variable, one more bar: \(\binom{6}{2}\).`]
    ]
  });

  extendCard('discrete', 'Divisibility and modular arithmetic', {
    more: T`
<h4>Large powers with Fermat</h4>
<p>To find \(a^N \bmod p\) with \(p\) prime: reduce the base mod \(p\); if \(p \nmid a\), then \(a^{p-1} \equiv 1\), so only \(N \bmod (p - 1)\) matters.</p>`,
    exs: [{ q: T`Compute \(12^{226} \bmod 5\).`, a: T`
<p>Reduce the base: \(12 \equiv 2 \pmod 5\).</p>
<p>5 is prime and does not divide 2, so \(2^4 \equiv 1\).</p>
<p>Divide the exponent by 4: \(226 = 4\cdot56 + 2\). So \(2^{226} = (2^4)^{56}\cdot2^2 \equiv 1\cdot4 = 4\).</p>` }],
    vary: [
      [T`Find \(2^{10} \bmod 5\).`, 4, T`\(2^4 \equiv 1\) and \(10 = 8 + 2\), so \(2^2 = 4\).`],
      [T`Find \(3^{100} \bmod 7\).`, 4, T`\(3^6 \equiv 1\) and \(100 = 96 + 4\), so \(3^4 = 81 \equiv 4\).`]
    ]
  });

  // ======================= CALCULUS 3 =======================
  extendCard('calc3', 'Lines and planes', {
    more: T`
<h4>Where a line meets a plane</h4>
<p>Substitute the line's coordinates \(x(t), y(t), z(t)\) into the plane's equation. That leaves one equation in \(t\). Solve it, then put \(t\) back into the line for the point. If \(t\) cancels, a true statement such as \(0 = 0\) means the line lies in the plane, and a false one means the line is parallel to it.</p>`,
    exs: [{ q: T`The line \(\mathbf r(t) = (1, 4, -3) + t(-1, -3, 1)\) meets the plane \(3x + y - z = -5\) at which \(t\)?`, a: T`
<p>The line has \(x = 1 - t\), \(y = 4 - 3t\), \(z = -3 + t\).</p>
<p>Substitute: \(3(1 - t) + (4 - 3t) - (-3 + t) = 10 - 7t\). Set it equal to \(-5\): \(7t = 15\), so \(t = \frac{15}{7}\).</p>` }],
    vary: [
      [T`The line \((t, 0, 0)\) meets the plane \(x + y + z = 3\) at \(t =\)`, 3, T`Only \(x\) changes: \(t = 3\).`],
      [T`The line \((1, t, 2t)\) meets \(x + y + z = 7\) at \(t =\)`, 2, T`\(1 + 3t = 7\).`]
    ]
  });

  extendCard('calc3', 'The cross product', {
    more: T`<p><b>Triangle area.</b> A triangle with vertices \(P, Q, R\) is half the parallelogram spanned by \(\overrightarrow{PQ}\) and \(\overrightarrow{PR}\), so its area is \(\frac12\left|\overrightarrow{PQ}\times\overrightarrow{PR}\right|\).</p>`,
    exs: [{ q: T`Find the area of the triangle with vertices \((1, 0, 0)\), \((0, 2, 0)\), \((0, 0, 3)\).`, a: T`
<p>Edges from the first vertex: \(\langle -1, 2, 0\rangle\) and \(\langle -1, 0, 3\rangle\).</p>
<p>Cross product: \(\langle 2\cdot3 - 0\cdot0,\ 0\cdot(-1) - (-1)\cdot3,\ (-1)\cdot0 - 2\cdot(-1)\rangle = \langle 6, 3, 2\rangle\), with length \(\sqrt{36 + 9 + 4} = 7\).</p>
<p>Area \(= \frac12\cdot7 = 3.5\).</p>` }],
    vary: [[T`Find the area of the triangle with vertices \((0,0,0)\), \((3,0,0)\), \((1,2,0)\).`, 3, T`Half of the base-3, height-2 parallelogram.`]]
  });

  extendCard('calc3', 'Polar, cylindrical, spherical', {
    more: T`<p>For a linear substitution, the Jacobian is a plain determinant. With \(x = u + v\), \(y = u - v\): \(\frac{\partial(x,y)}{\partial(u,v)} = \begin{vmatrix}1&1\\1&-1\end{vmatrix} = -2\), so \(dA = 2\,du\,dv\).</p>`,
    vary: [[T`For \(x = 2u\), \(y = 3v\), find \(\left|\frac{\partial(x,y)}{\partial(u,v)}\right|\).`, 6, T`A diagonal matrix: \(2\cdot3\).`]]
  });

  // ======================= LINEAR ALGEBRA =======================
  extendCard('linalg', 'Symmetric matrices and quadratic forms', {
    more: T`
<h4>The \(2\times2\) shortcut</h4>
<p>For \(A = \begin{pmatrix}a&b\\b&d\end{pmatrix}\), solving \(\lambda^2 - (a + d)\lambda + (ad - b^2) = 0\) gives</p>
\[\lambda = \frac{a + d}{2} \pm \sqrt{\left(\frac{a - d}{2}\right)^2 + b^2}\]
<p>The eigenvalues multiply to \(\det A\) and add to \(a + d\). That classifies the form without finding them:</p>
<table class="tt"><tr><th>\(\det A\)</th><th>\(a\)</th><th>Form</th></tr>
<tr><td>negative</td><td>any</td><td>indefinite (signs differ)</td></tr>
<tr><td>positive</td><td>positive</td><td>positive definite</td></tr>
<tr><td>positive</td><td>negative</td><td>negative definite</td></tr>
<tr><td>zero</td><td>any</td><td>semidefinite</td></tr></table>`,
    exs: [{ q: T`Classify the quadratic form with matrix \(\begin{pmatrix}-1&1\\1&-4\end{pmatrix}\), and find its eigenvalues.`, a: T`
<p>\(\det = 4 - 1 = 3 > 0\), so both eigenvalues have the same sign. The diagonal entry \(-1\) is negative, so both are negative: negative definite.</p>
<p>Eigenvalues: \(\frac{-5}{2} \pm \sqrt{\left(\frac{3}{2}\right)^2 + 1} = -2.5 \pm \sqrt{3.25}\), about \(-0.70\) and \(-4.30\).</p>` }],
    vary: [
      [T`Find the larger eigenvalue of \(\begin{pmatrix}5&2\\2&2\end{pmatrix}\).`, 6, T`\(3.5 \pm \sqrt{1.5^2 + 4} = 3.5 \pm 2.5\).`],
      [T`Classify \(\begin{pmatrix}1&2\\2&1\end{pmatrix}\).`, [T`indefinite`, T`positive definite`, T`negative definite`], T`\(\det = 1 - 4 < 0\).`]
    ]
  });

  extendCard('linalg', 'Eigenvalues and eigenvectors', {
    more: T`<p>Related matrices share eigenvectors. If \(A\mathbf v = \lambda\mathbf v\), then \(A^2\mathbf v = \lambda^2\mathbf v\), \((A + cI)\mathbf v = (\lambda + c)\mathbf v\), and, when \(A\) is invertible, \(A^{-1}\mathbf v = \frac1\lambda\mathbf v\) (multiply \(A\mathbf v = \lambda\mathbf v\) by \(A^{-1}\) and divide by \(\lambda\)).</p>`,
    vary: [[T`\(A\) has eigenvalue 4. Find the matching eigenvalue of \(A^{-1}\).`, 0.25, T`\(\frac1\lambda\).`]]
  });

  extendCard('linalg', 'Subspaces', {
    more: T`<p>Dimension counts free parameters. A \(2\times2\) matrix has four entries you can choose independently, so the space of \(2\times2\) matrices has dimension 4 (a basis is the four matrices with a single entry 1). Polynomials of degree at most \(n\) have dimension \(n + 1\).</p>`,
    vary: [[T`What is the dimension of the space of \(2\times3\) matrices?`, 6, T`Six independent entries.`]]
  });

  // ======================= STATISTICS =======================
  extendCard('stats', 'Random variables', {
    more: T`<p>For a discrete variable given by a table, \(E(X) = \sum x\,P(X = x)\): multiply each value by its probability and add. Then \(\operatorname{Var}(X) = E(X^2) - (E X)^2\), with \(E(X^2) = \sum x^2 P(X = x)\).</p>`,
    exs: [{ q: T`\(X\) takes values 1, 3, 5 with probabilities 0.2, 0.3, 0.5. Find \(E(X)\).`, a: T`<p>\(1(0.2) + 3(0.3) + 5(0.5) = 0.2 + 0.9 + 2.5 = 3.6\).</p>` }],
    vary: [[T`\(X\) is 0 or 10 with probabilities 0.7 and 0.3. Find \(E(X)\).`, 3, T`\(0(0.7) + 10(0.3)\).`]]
  });

  extendCard('stats', 'Multiple regression', {
    more: T`<p><b>Logged response.</b> In \(\log y = \beta_0 + \beta_1x\), a one-unit increase in \(x\) multiplies \(y\) by \(e^{\beta_1}\). For small \(\beta_1\) that is about a \(100\beta_1\%\) change: \(\beta_1 = 0.05\) means roughly 5% higher \(y\) per unit of \(x\).</p>`,
    vary: [[T`In \(\log y = 2 + 0.03x\), about what percent does \(y\) change per unit of \(x\)?`, 3, T`\(100\beta_1\) for small \(\beta_1\).`]]
  });

  extendCard('stats', 'The GLM family', {
    more: T`<p>All of these models are fit by maximum likelihood: choose the parameters under which the observed data would have been most probable. For the normal linear model this gives the same estimates as least squares.</p>`
  });

  // ======================= PYTHON =======================
  extendCard('python', 'Numbers and arithmetic', {
    more: T`<p><code>bool</code> is a subclass of <code>int</code>: <code>True == 1</code> and <code>False == 0</code>, so <code>True + True</code> is <code>2</code> and <code>sum(flags)</code> counts the true ones. <code>/</code> returns a float even when the division is exact: <code>3 / 1</code> is <code>3.0</code>.</p>`,
    vary: [[T`What is <code>True + True + False</code>?`, 2, T`Booleans add as 1 and 0.`]]
  });

  extendCard('python', 'Strings and slicing', {
    more: T`<p>Lists slice the same way, and a list slice can be assigned to. <code>a[1:2] = [7, 8, 9]</code> replaces the one item at index 1 with three items, so <code>[1, 2, 3]</code> becomes <code>[1, 7, 8, 9, 3]</code>. Strings are immutable, so assigning into a string slice raises <code>TypeError</code>.</p>`,
    vary: [[T`<code>a = [1, 2, 3, 4]</code>, then <code>a[1:3] = [0]</code>. What is <code>a</code>?`, [T`<code>[1, 0, 4]</code>`, T`<code>[1, 0, 3, 4]</code>`, T`<code>[0, 2, 3, 4]</code>`], T`Items at 1 and 2 are replaced by one item.`]]
  });

  extendCard('python', 'Lists, dicts, sets', {
    more: T`<p><code>zip</code> stops at the shortest input: <code>list(zip([1, 2, 3], "ab"))</code> is <code>[(1, 'a'), (2, 'b')]</code>; the 3 is dropped.</p>`
  });

  extendCard('python', 'Exceptions', {
    more: T`<p><code>finally</code> runs even when the <code>try</code> block executes <code>return</code>. Python holds the return value, runs the <code>finally</code> block, then returns. So anything <code>finally</code> prints appears before the caller sees the returned value.</p>`
  });

  // ======================= PHYSICS =======================
  extendCard('physics', 'Thermodynamics', {
    more: T`<p><b>Signs in the first law.</b> \(Q > 0\) when heat flows into the gas and \(Q < 0\) when it gives heat off. \(W > 0\) when the gas does work on its surroundings (it expands) and \(W < 0\) when work is done on the gas (it is compressed). Put those signs into \(\Delta U = Q - W\).</p>`,
    vary: [[T`A gas gives off 200 J of heat while 300 J of work is done on it. Find \(\Delta U\) in J.`, 100, T`\(Q = -200\), \(W = -300\): \(-200 - (-300)\).`]]
  });

  extendCard('physics', 'Oscillations', {
    more: T`<p>Periods: \(T = 2\pi\sqrt{m/k}\) for a spring and \(T = 2\pi\sqrt{L/g}\) for a pendulum. Doubling the mass on a spring multiplies \(T\) by \(\sqrt2\); a pendulum's period does not depend on its mass at all.</p>`,
    vary: [[T`The mass on a spring is quadrupled. The period is multiplied by:`, 2, T`\(T\) grows like \(\sqrt m\).`]]
  });
  // ======================= Fixed problems that needed a sentence of teaching =======================
  extendCard('discrete', 'Sets and functions', {
    more: T`<p>For finite sets of the same size, one-to-one and onto go together: an injective \(f: A \to B\) with \(|A| = |B|\) hits \(|A|\) different outputs, which is all of \(B\), so it is bijective. The same holds starting from surjective.</p>`
  });
  extendCard('stats', 'Confidence intervals', {
    more: T`<p><b>What 95% means.</b> The method captures the true parameter in 95% of samples. Any one computed interval either contains it or does not; the 95% describes the procedure, not a probability about that fixed interval.</p>`
  });
  extendCard('stats', 'Hypothesis testing', {
    more: T`<p><b>The p-value</b> is the probability, computed assuming \(H_0\) is true, of a result at least as extreme as the one observed. It is not the probability that \(H_0\) is true.</p>`
  });
  extendCard('physics', 'One-dimensional kinematics', {
    more: T`<p><b>Free fall.</b> Without air resistance every object accelerates downward at \(g \approx 9.8\ \text{m/s}^2\), whatever its mass. A heavy ball and a light ball dropped together land together.</p>`
  });
  extendCard('physics', 'Projectile motion', {
    more: T`<p>Gravity is the only force, so the acceleration is \(g\) straight down at every point of the path. At the top the vertical velocity is 0, but the acceleration is still \(g\) downward.</p>`
  });
  extendCard('physics', 'Work and energy', {
    more: T`<p>For a constant force, \(W = Fd\cos\theta\), where \(\theta\) is the angle between the force and the motion. A force perpendicular to the motion, such as the normal force on a level floor, does no work. Kinetic energy grows with the square of speed: double the speed and \(K\) is four times as large.</p>`
  });
})();

// ======================= TRIGONOMETRY: solving right triangles step by step (1.5.2) =======================
(() => {
  const F = window.FIGS, { Plot } = F.util, PI = Math.PI;
  // A right triangle labeled from the marked angle. o.top puts the marked angle at the top vertex,
  // which swaps which leg is opposite and which is adjacent. o.lab overrides side labels.
  F.triSolve = {
    draw(s, o) {
      o = o || {};
      const deg = o.d || 38, t = deg * PI / 180, c = Math.cos(t), sn = Math.sin(t), L = 4;
      const p = Plot({ x: [-0.7, 5.2], y: [-0.8, 3.2], eq: true, w: 330, pad: 8 });
      const A = [0, 0], B = [L * c, 0], C = [L * c, L * sn], lab = Object.assign({ hyp: 'hypotenuse', opp: 'opposite', adj: 'adjacent' }, o.lab || {});
      p.poly([A, B, C], 'tri');
      const bottomCls = o.top ? 'b' : 'c', sideCls = o.top ? 'c' : 'b';
      p.seg(...A, ...B, bottomCls).seg(...B, ...C, sideCls).seg(...A, ...C, 'ink');
      p.add(`<path class="ax" d="M${p.X(B[0] - 0.25)} ${p.Y(0)}V${p.Y(0.25)}H${p.X(B[0])}"/>`);
      const ang = o.ang || (deg + '°');
      if (o.top) {
        const a0 = PI + t, a1 = 1.5 * PI;
        p.arc(C[0], C[1], 0.55, a0, a1, 'ink').txt(C[0] + 0.8 * Math.cos((a0 + a1) / 2), C[1] + 0.8 * Math.sin((a0 + a1) / 2), ang, { dy: 5, a: 'middle' });
        p.txt(B[0] / 2, 0, lab.opp, { dy: 18, a: 'middle', cls: 'tu b' });
        p.txt(B[0], C[1] / 2, lab.adj, { dx: 8, cls: 'tu c' });
      } else {
        p.arc(0, 0, 0.6, 0, t, 'ink').txt(0.85 * Math.cos(t / 2), 0.85 * Math.sin(t / 2), ang, { dx: 4, dy: 5, a: 'start' });
        p.txt(B[0] / 2, 0, lab.adj, { dy: 18, a: 'middle', cls: 'tu c' });
        p.txt(B[0], C[1] / 2, lab.opp, { dx: 8, cls: 'tu b' });
      }
      p.txt(C[0] / 2, C[1] / 2, lab.hyp, { dx: -10, dy: -6, a: 'end', cls: 'tu' });
      return p.svg();
    }
  };

  extendCard('trig', 'Right-triangle trigonometry', {
    more: T`
<h4>Solving a right triangle, step by step</h4>
<p>Every right-triangle problem is the same five steps. The example running through them: a right triangle has an angle of \(38^\circ\) and a hypotenuse of 8. Find the side opposite the \(38^\circ\) angle.</p>
${fig('triSolve', { d: 38, lab: { hyp: 'hyp = 8', opp: 'opp = x', adj: 'adj' } }, 'Stand at the marked angle: the opposite side faces it, the adjacent leg touches it.')}
<p><b>1. Label the sides from the angle you are using.</b> The hypotenuse is across from the right angle and is always the longest side. The opposite side is the leg that does not touch your angle. The adjacent side is the leg that does touch it. Here the 8 is the hypotenuse and the unknown \(x\) is opposite.</p>
<p><b>2. Choose the ratio.</b> Find the two sides involved: the one you know and the one you want. Cross off the third side; the remaining pair names the ratio.</p>
<table class="tt"><tr><th>Sides involved</th><th>Ratio</th><th>Memory aid</th></tr>
<tr><td>opposite and hypotenuse</td><td>\(\sin\theta = \frac{\text{opp}}{\text{hyp}}\)</td><td>SOH</td></tr>
<tr><td>adjacent and hypotenuse</td><td>\(\cos\theta = \frac{\text{adj}}{\text{hyp}}\)</td><td>CAH</td></tr>
<tr><td>opposite and adjacent</td><td>\(\tan\theta = \frac{\text{opp}}{\text{adj}}\)</td><td>TOA</td></tr></table>
<p>Opposite and hypotenuse are involved, so use sine.</p>
<p><b>3. Write the equation.</b> Put the angle on the left and the two sides on the right:</p>
\[\sin 38^\circ = \frac{x}{8}\]
<p>\(\sin 38^\circ\) is a plain number, about 0.6157, so this is an ordinary one-step equation.</p>
<p><b>4. Solve for the unknown.</b> Where the unknown sits decides the move:</p>
<table class="tt"><tr><th>Unknown is</th><th>Equation</th><th>Solve by</th><th>Result</th></tr>
<tr><td>on top</td><td>\(\sin 38^\circ = \frac{x}{8}\)</td><td>multiply both sides by 8</td><td>\(x = 8\sin 38^\circ\)</td></tr>
<tr><td>on the bottom</td><td>\(\cos 40^\circ = \frac{12}{x}\)</td><td>multiply by \(x\), then divide by \(\cos 40^\circ\)</td><td>\(x = \frac{12}{\cos 40^\circ}\)</td></tr>
<tr><td>the angle</td><td>\(\tan\theta = \frac{5}{12}\)</td><td>apply the inverse function</td><td>\(\theta = \tan^{-1}\frac{5}{12}\)</td></tr></table>
<p>For the example: \(x = 8\sin 38^\circ \approx 8(0.6157) \approx 4.93\).</p>
<p><b>5. Check.</b> A leg must be shorter than the hypotenuse: \(4.93 < 8\). The two acute angles add to \(90^\circ\). The Pythagorean theorem holds for all three sides. The value should sit between nearby special angles: \(38^\circ\) is between \(30^\circ\) and \(45^\circ\), so \(\sin 38^\circ\) is between 0.5 and 0.707, and \(x\) is between 4 and 5.66.</p>

<h4>Finding an angle: inverse functions</h4>
<p>\(\sin^{-1}\), \(\cos^{-1}\), and \(\tan^{-1}\) (also written arcsin, arccos, arctan) run the ratio backward: given a ratio, they return the angle. If \(\sin\theta = 0.6\), then \(\theta = \sin^{-1}(0.6) \approx 36.87^\circ\). The \(-1\) means &ldquo;inverse,&rdquo; not the reciprocal: \(\sin^{-1}x\) is not \(\frac{1}{\sin x}\).</p>

<h4>Where the numbers come from</h4>
<p>\(\sin 38^\circ\) is the opposite-over-hypotenuse ratio of every right triangle with a \(38^\circ\) angle. You could draw one carefully and measure; a calculator computes it to many digits. Only the special angles (30°, 45°, 60°) have short exact values. Set the calculator to degree mode (DEG) when angles are in degrees: in radian mode, &ldquo;sin 38&rdquo; is the sine of 38 radians, about 0.296, which is wrong here.</p>

<h4>The other acute angle swaps the labels</h4>
${fig('triSolve', { d: 38, top: true, ang: '52°' }, 'The same triangle seen from the 52° angle: the legs trade names. The hypotenuse never changes.')}
<p>The two acute angles add to \(90^\circ\), so the other angle here is \(52^\circ\). From that angle, the bottom leg is opposite and the vertical leg is adjacent. That is why \(\sin 38^\circ = \cos 52^\circ\).</p>
<p><b>Angles of elevation and depression.</b> The angle of elevation is measured up from the horizontal to a line of sight; the angle of depression is measured down from the horizontal. Either one is the marked angle of a right triangle whose legs are a horizontal distance and a height.</p>`,
    exs: [
      { q: T`A right triangle has an angle of \(38^\circ\) and a hypotenuse of 8. Find the side opposite that angle, to two decimals.`, a: T`
<p><b>Label:</b> 8 is the hypotenuse; the unknown \(x\) is opposite \(38^\circ\).</p>
<p><b>Ratio:</b> opposite and hypotenuse, so sine.</p>
<p><b>Equation:</b> \(\sin 38^\circ = \frac{x}{8}\).</p>
<p><b>Solve:</b> multiply both sides by 8: \(x = 8\sin 38^\circ \approx 8(0.6157) \approx 4.93\).</p>
<p><b>Check:</b> \(4.93 < 8\), and it lies between \(8(0.5) = 4\) and \(8(0.707) = 5.66\).</p>` },
      { q: T`A right triangle has an angle of \(40^\circ\), and the leg adjacent to it is 12. Find the hypotenuse, to two decimals.`, a: T`
<p><b>Label:</b> 12 is adjacent; the unknown \(x\) is the hypotenuse.</p>
<p><b>Ratio:</b> adjacent and hypotenuse, so cosine.</p>
<p><b>Equation:</b> \(\cos 40^\circ = \frac{12}{x}\). The unknown is on the bottom.</p>
<p><b>Solve:</b> multiply both sides by \(x\): \(x\cos 40^\circ = 12\). Divide by \(\cos 40^\circ\): \(x = \frac{12}{\cos 40^\circ} \approx \frac{12}{0.7660} \approx 15.66\).</p>
<p><b>Check:</b> the hypotenuse is longer than the leg, \(15.66 > 12\). Dividing by a number below 1 made the answer larger, as it should.</p>` },
      { q: T`A right triangle has legs 5 and 12. Find the angle opposite the side 5, to two decimals.`, a: T`
<p><b>Label:</b> from the angle \(\theta\), 5 is opposite and 12 is adjacent.</p>
<p><b>Ratio:</b> opposite and adjacent, so tangent: \(\tan\theta = \frac{5}{12}\).</p>
<p><b>Solve:</b> apply the inverse: \(\theta = \tan^{-1}\frac{5}{12} \approx 22.62^\circ\).</p>
<p><b>Check:</b> the hypotenuse is \(\sqrt{25 + 144} = 13\), and \(\sin^{-1}\frac{5}{13} \approx 22.62^\circ\) as well. The other acute angle is \(90^\circ - 22.62^\circ = 67.38^\circ\).</p>` },
      { q: T`Solve the whole right triangle with an angle of \(35^\circ\) and hypotenuse 20: find both legs and the other angle.`, a: T`
<p><b>Opposite leg:</b> \(\sin 35^\circ = \frac{x}{20}\), so \(x = 20\sin 35^\circ \approx 11.47\).</p>
<p><b>Adjacent leg:</b> \(\cos 35^\circ = \frac{y}{20}\), so \(y = 20\cos 35^\circ \approx 16.38\).</p>
<p><b>Other angle:</b> \(90^\circ - 35^\circ = 55^\circ\).</p>
<p><b>Check:</b> \(11.47^2 + 16.38^2 \approx 131.6 + 268.3 = 399.9 \approx 20^2\).</p>` }
    ],
    vary: [
      [T`A right triangle has a \(30^\circ\) angle and hypotenuse 10. Find the side opposite \(30^\circ\).`, 5, T`\(\sin 30^\circ = \frac{x}{10}\), so \(x = 10\cdot\frac12\).`],
      [T`Same triangle. Find the side adjacent to \(30^\circ\), to two decimals.`, 10 * Math.sqrt(3) / 2, T`Now adjacent and hypotenuse: \(x = 10\cos 30^\circ = 5\sqrt3\).`],
      [T`A different triangle: a \(30^\circ\) angle with the opposite side 4. Find the hypotenuse.`, 8, T`The unknown moved to the bottom: \(\sin 30^\circ = \frac{4}{x}\), so \(x = \frac{4}{1/2}\).`],
      [T`A \(45^\circ\) angle with adjacent side 7. Find the opposite side.`, 7, T`Opposite and adjacent: \(x = 7\tan 45^\circ = 7\).`],
      [T`The opposite side is 5 and the hypotenuse is 10. Find the angle in degrees.`, 30, T`\(\sin\theta = \frac12\), so \(\theta = \sin^{-1}\frac12\).`],
      [T`Same triangle. Find the other acute angle in degrees.`, 60, T`The acute angles add to \(90^\circ\).`],
      [T`The legs are 6 and 6. Find either acute angle in degrees.`, 45, T`\(\tan\theta = 1\).`]
    ]
  });

  // Practice that matches the steps above, with every answer checked independently.
  const r2 = v => Math.round(v * 100) / 100;
  registerUnitGens('trig', {
    units: {
      'Right-triangle trigonometry': [
        { id: 'tu-side-top', make(R) {
          const d = R.int(20, 70), k = R.int(0, 2), s = R.int(4, 30), t = d * Math.PI / 180;
          const [known, want, fn, val, py] = [['hypotenuse', 'opposite', '\\sin', s * Math.sin(t), `${s}*sin(${d}*pi/180)`],
            ['hypotenuse', 'adjacent', '\\cos', s * Math.cos(t), `${s}*cos(${d}*pi/180)`],
            ['adjacent', 'opposite', '\\tan', s * Math.tan(t), `${s}*tan(${d}*pi/180)`]][k];
          const word = k === 2 && R.int(0, 1);
          const q = word ? T`From ${s} m away on level ground, the angle of elevation to the top of a tree is \(${d}^\circ\). How tall is the tree, in meters to two decimals?`
            : T`A right triangle has an angle of \(${d}^\circ\), and the ${known} is ${s}. Find the side ${want} ${want === 'opposite' ? 'the angle' : 'to the angle'}, to two decimals.`;
          const lbl = { hypotenuse: 'hyp', opposite: 'opp', adjacent: 'adj' };
          return { q, answer: val, tol: 0.01, hint: 'Round to two decimals.',
            x: T`${word ? 'The distance along the ground is adjacent to the angle and the height is opposite. ' : ''}${lbl[want]} and ${lbl[known]}: use \(${fn}\). \(${fn} ${d}^\circ = \frac{x}{${s}}\), so \(x = ${s}${fn} ${d}^\circ \approx ${s}(${R.fmt(val / s, 4)}) \approx ${R.fmt(r2(val), 2)}\).`, v: py };
        } },
        { id: 'tu-side-bot', make(R) {
          const d = R.int(20, 70), k = R.int(0, 2), s = R.int(3, 25), t = d * Math.PI / 180;
          const [known, want, fn, ratio, py] = [['opposite', 'hypotenuse', '\\sin', Math.sin(t), `${s}/sin(${d}*pi/180)`],
            ['adjacent', 'hypotenuse', '\\cos', Math.cos(t), `${s}/cos(${d}*pi/180)`],
            ['opposite', 'adjacent', '\\tan', Math.tan(t), `${s}/tan(${d}*pi/180)`]][k], val = s / ratio;
          const lbl = { hypotenuse: 'hyp', opposite: 'opp', adjacent: 'adj' };
          return { q: T`A right triangle has an angle of \(${d}^\circ\), and the side ${known} ${known === 'opposite' ? 'the angle' : 'to the angle'} is ${s}. Find the ${want}${want === 'adjacent' ? ' side' : ''}, to two decimals.`, answer: val, tol: 0.01, hint: 'Round to two decimals.',
            x: T`${lbl[known]} and ${lbl[want]}: use \(${fn}\). \(${fn} ${d}^\circ = \frac{${s}}{x}\): the unknown is on the bottom. Multiply by \(x\) and divide by \(${fn} ${d}^\circ\): \(x = \frac{${s}}{${fn} ${d}^\circ} \approx \frac{${s}}{${R.fmt(ratio, 4)}} \approx ${R.fmt(r2(val), 2)}\).`, v: py };
        } },
        { id: 'tu-angle', make(R) {
          const m = R.int(1, 3), [a, b, h] = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]).map(v => v * m);
          const k = R.int(0, 2), [o, aj] = R.int(0, 1) ? [a, b] : [b, a];
          const [given, fn, inv, ratio, py] = [[`opposite side ${o} and adjacent side ${aj}`, '\\tan', '\\tan^{-1}', [o, aj], `atan(Rational(${o}, ${aj}))*180/pi`],
            [`opposite side ${o} and hypotenuse ${h}`, '\\sin', '\\sin^{-1}', [o, h], `asin(Rational(${o}, ${h}))*180/pi`],
            [`adjacent side ${aj} and hypotenuse ${h}`, '\\cos', '\\cos^{-1}', [aj, h], `acos(Rational(${aj}, ${h}))*180/pi`]][k];
          const val = Math.atan2(o, aj) * 180 / Math.PI;
          return { q: T`A right triangle has ${given}, measured from the angle \(\theta\). Find \(\theta\) in degrees, to two decimals.`, answer: val, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(${fn}\theta = \frac{${ratio[0]}}{${ratio[1]}}\), so \(\theta = ${inv}\frac{${ratio[0]}}{${ratio[1]}} \approx ${R.fmt(r2(val), 2)}^\circ\). Check: the other acute angle is \(90^\circ - \theta \approx ${R.fmt(r2(90 - val), 2)}^\circ\).`, v: py };
        } }
      ]
    }
  });
})();

// ======================= ALGEBRA: visual walkthroughs for polynomials (1.5.3) =======================
(() => {
  const F = window.FIGS, { Canvas } = F.util;
  const m = v => String(v).replace('-', '−'), par = v => (v < 0 ? `(${v})` : `${v}`);
  // Synthetic division states: 0 setup, 1 bring down, then multiply/add pairs, then the read-off.
  function synthStates(coef, c) {
    const n = coef.length, mid = Array(n).fill(null), bot = Array(n).fill(null), states = [];
    states.push({ mid: mid.slice(), bot: bot.slice(), hl: null, msg: `Write ${m(c)} in the box (the number that makes the divisor zero) and the coefficients ${coef.map(m).join(', ')} across the top. Every power needs a slot, so a missing term gets a 0.` });
    bot[0] = coef[0];
    states.push({ mid: mid.slice(), bot: bot.slice(), hl: ['bot', 0], msg: `Bring the first coefficient, ${m(coef[0])}, straight down below the line.` });
    for (let j = 1; j < n; j++) {
      mid[j] = bot[j - 1] * c;
      states.push({ mid: mid.slice(), bot: bot.slice(), hl: ['mid', j], arrow: ['mul', j], msg: `Multiply: ${m(bot[j - 1])} × ${m(c)} = ${m(mid[j])}. Write it in the next column, under ${m(coef[j])}.` });
      bot[j] = coef[j] + mid[j];
      states.push({ mid: mid.slice(), bot: bot.slice(), hl: ['bot', j], arrow: ['add', j], msg: `Add down the column: ${m(coef[j])} + ${m(mid[j])} = ${m(bot[j])}. Write it below the line.` });
    }
    const q = bot.slice(0, -1), deg = n - 2, r = bot[n - 1];
    const qtxt = q.map((v, i) => [v, deg - i]).filter(([v]) => v !== 0).map(([v, e], i) => { const a = Math.abs(v), co = a === 1 && e > 0 ? '' : a; return (i ? (v < 0 ? ' − ' : ' + ') : (v < 0 ? '−' : '')) + co + (e > 1 ? `x${e === 2 ? '²' : '³'}` : e === 1 ? 'x' : ''); }).join('') || '0';
    states.push({ mid: mid.slice(), bot: bot.slice(), hl: 'done', msg: `Read the bottom row. The last number, ${m(r)}, is the remainder. The others are the quotient's coefficients, starting one power lower than the dividend: ${qtxt}.${r === 0 ? ` A remainder of 0 means x ${c < 0 ? '+ ' + -c : '− ' + c} is a factor.` : ''}` });
    return states;
  }
  function drawSynth(coef, c, k) {
    const st = synthStates(coef, c), S = st[Math.max(0, Math.min(k, st.length - 1))], n = coef.length;
    const W = 340, H = 196, p = Canvas(W, H), x0 = 118, dx = Math.min(62, (W - x0 - 20) / (n - 1)), X = j => x0 + j * dx;
    const yT = 46, yM = 92, yL = 110, yB = 140, yLab = 174;
    const t = (x, y, s, cls) => p.add(`<text class="${cls}" x="${x}" y="${y}" text-anchor="middle">${s}</text>`);
    p.add(`<path class="ink" d="M78 22V${yL}H${W - 12}"/>`);
    t(48, yT, m(c), 'sd'); p.add(`<text class="sdl" x="48" y="${yT + 22}" text-anchor="middle">c</text>`);
    coef.forEach((v, j) => t(X(j), yT, m(v), 'sd'));
    const isHl = (row, j) => S.hl && S.hl !== 'done' && S.hl[0] === row && S.hl[1] === j;
    S.mid.forEach((v, j) => { if (v != null) t(X(j), yM, m(v), 'sd' + (isHl('mid', j) ? ' new' : '')); });
    S.bot.forEach((v, j) => { if (v != null) t(X(j), yB, m(v), 'sd' + (isHl('bot', j) ? ' new' : S.hl === 'done' && j < n - 1 ? ' q' : '')); });
    if (S.arrow && S.arrow[0] === 'mul') { const j = S.arrow[1]; p.seg(X(j - 1) + 10, yB - 20, X(j) - 12, yM + 6, 'b', 'b'); p.add(`<text class="sdl" x="${X(j - 1) + 14}" y="${yM + 6}" style="fill:var(--no)">×${m(c)}</text>`); }
    if (S.arrow && S.arrow[0] === 'add') { const j = S.arrow[1]; p.seg(X(j) + 22, yT - 8, X(j) + 22, yB - 4, 'b', 'b'); p.add(`<text class="sdl" x="${X(j) + 28}" y="${yM - 18}">add</text>`); }
    if (S.hl === 'done') {
      p.add(`<rect x="${X(n - 1) - 22}" y="${yB - 22}" width="44" height="32" rx="3" style="fill:none;stroke:var(--no);stroke-width:2"/>`);
      const deg = n - 2;
      for (let j = 0; j < n - 1; j++) p.add(`<text class="sdl" x="${X(j)}" y="${yLab}" text-anchor="middle" style="fill:var(--blue)">${deg - j > 1 ? 'x' + (deg - j === 2 ? '²' : '³') : deg - j === 1 ? 'x' : 'const'}</text>`);
      p.add(`<text class="sdl" x="${X(n - 1)}" y="${yLab}" text-anchor="middle" style="fill:var(--no)">remainder</text>`);
    }
    return { svg: p.svg(), msg: S.msg, total: st.length };
  }
  F.synthDiv = {
    controls: [{ k: 'k', label: 'step', min: 0, max: 8, step: 1, val: 0, fmt: v => `${v + 1} of 9` }],
    draw: (s, o) => drawSynth(o.coef || [2, -3, -11, 6], o.c != null ? o.c : 3, s.k).svg,
    read: (s, o) => drawSynth(o.coef || [2, -3, -11, 6], o.c != null ? o.c : 3, s.k).msg
  };
  F.synthDone = { draw: (s, o) => drawSynth(o.coef, o.c, 99).svg };

  // Box (area) method: rows are the first factor's terms, columns the second's. Like terms share a shade.
  F.boxMult = {
    draw(s, o) {
      const rows = o.rows, cols = o.cols, cells = o.cells, shade = o.shade, cw = Math.min(82, 250 / cols.length), ch = 48;
      const W = 70 + cols.length * cw + 10, H = 44 + rows.length * ch + 8, p = Canvas(W, H), L = 66, T = 40;
      cols.forEach((c, j) => p.add(`<text class="bxh" x="${L + j * cw + cw / 2}" y="${T - 12}" text-anchor="middle">${c}</text>`));
      rows.forEach((r, i) => p.add(`<text class="bxh" x="${L - 10}" y="${T + i * ch + ch / 2 + 6}" text-anchor="end">${r}</text>`));
      rows.forEach((r, i) => cols.forEach((c, j) => {
        p.add(`<rect class="tile ${shade[i][j]}" x="${L + j * cw}" y="${T + i * ch}" width="${cw}" height="${ch}"/>`);
        p.add(`<text class="bx" x="${L + j * cw + cw / 2}" y="${T + i * ch + ch / 2 + 6}" text-anchor="middle">${cells[i][j]}</text>`);
      }));
      return p.svg();
    }
  };

  const card = window.SUBJECTS.find(s => s.id === 'algebra').learn.find(c => c.title === 'Polynomials');
  // The old one-line synthetic division example becomes the second worked example, written out in full.
  card.ex = { q: T`Expand \((2x + 1)(x - 3)\).`, a: T`
${fig('boxMult', { rows: ['2x', '+1'], cols: ['x', '−3'], cells: [['2x²', '−6x'], ['x', '−3']], shade: [['ta', 'tb'], ['tb', 'tc']] }, 'Each cell is its row term times its column term. Cells with the same shade are like terms.')}
<p><b>Fill the grid.</b> Put the terms of one factor down the side and the other across the top, keeping each sign with its term. Multiply row by column:</p>
<p>Row \(2x\): \(\ 2x\cdot x = 2x^2\) and \(2x\cdot(-3) = -6x\)</p><p>Row \(+1\): \(\ 1\cdot x = x\) and \(1\cdot(-3) = -3\)</p>
<p><b>Combine like terms.</b> The two green cells both hold \(x\) terms: \(-6x + x = -5x\).</p>
\[(2x + 1)(x - 3) = 2x^2 - 5x - 3\]
<p><b>Check</b> at any number, say \(x = 1\): the left side is \((3)(-2) = -6\); the right side is \(2 - 5 - 3 = -6\).</p>` };
  extendCard('algebra', 'Polynomials', {
    more: T`
<h4>Multiplying: the box method</h4>
<p>FOIL (first, outer, inner, last) works only for two binomials. The box method works for any size: one cell per pair of terms, so a binomial times a trinomial gives a 2-by-3 grid with six products. Then add the cells that hold the same power. Worked examples follow in the next step.</p>

<h4>Dividing by \(x - c\): synthetic division</h4>
<p>Synthetic division is long division with the variables stripped out. It works when the divisor has the form \(x - c\). Step through it below for \((2x^3 - 3x^2 - 11x + 6) \div (x - 3)\).</p>
${fig('synthDiv', { coef: [2, -3, -11, 6], c: 3 }, 'Drag the slider one step at a time. Red marks what that step adds.')}
<p><b>Which \(c\)?</b> Use the number that makes the divisor zero. For \(x - 3\), \(c = 3\). For \(x + 2 = x - (-2)\), \(c = -2\).</p>
<p><b>The rhythm</b> is bring down, then multiply by \(c\) and add, column after column. The bottom row ends with the remainder; the numbers before it are the quotient, one degree lower than what you divided.</p>
<p><b>What the answer means.</b> Dividing \(f(x)\) by \(x - c\) gives \(f(x) = (x - c)\,q(x) + r\). Here \(2x^3 - 3x^2 - 11x + 6 = (x - 3)(2x^2 + 3x - 2) + 0\).</p>
<p><b>Remainder theorem.</b> Put \(x = c\) into that equation: the \((x - c)\) factor becomes 0, leaving \(f(c) = r\). So the remainder is the polynomial's value at \(c\), and you can find it without dividing at all. If \(f(c) = 0\), then \(x - c\) is a factor (the factor theorem).</p>`,
    exs: [
      { q: T`Divide \(x^3 - 2x^2 + 4\) by \(x + 1\).`, a: T`
${fig('synthDone', { coef: [1, -2, 0, 4], c: -1 })}
<p><b>Set up.</b> \(x + 1 = x - (-1)\), so \(c = -1\). The dividend has no \(x\) term, so its coefficients are \(1, -2, 0, 4\) with a 0 in the \(x\) slot.</p>
<p><b>Bring down</b> the 1.</p>
<p><b>Column 2:</b> \(1 \times (-1) = -1\); \(-2 + (-1) = -3\).</p>
<p><b>Column 3:</b> \(-3 \times (-1) = 3\); \(0 + 3 = 3\).</p>
<p><b>Column 4:</b> \(3 \times (-1) = -3\); \(4 + (-3) = 1\).</p>
<p><b>Read off.</b> Bottom row \(1, -3, 3 \mid 1\): quotient \(x^2 - 3x + 3\), remainder 1.</p>
\[\begin{aligned}&x^3 - 2x^2 + 4\\ &= (x + 1)(x^2 - 3x + 3) + 1\end{aligned}\]
<p><b>Check</b> with the remainder theorem: \(f(-1) = -1 - 2 + 4 = 1\).</p>` },
      { q: T`Expand \((x + 2)(x^2 - 3x + 4)\).`, a: T`
${fig('boxMult', { rows: ['x', '+2'], cols: ['x²', '−3x', '+4'], cells: [['x³', '−3x²', '4x'], ['2x²', '−6x', '8']], shade: [['', 'ta', 'tb'], ['ta', 'tb', 'tc']] }, 'Six cells for a binomial times a trinomial. Like terms run along the diagonals.')}
<p><b>Fill the grid</b>, one row at a time:</p><p>Row \(x\): \(\ x^3,\ -3x^2,\ 4x\)</p><p>Row \(+2\): \(\ 2x^2,\ -6x,\ 8\)</p>
<p><b>Combine:</b> \(x^2\) terms \(-3x^2 + 2x^2 = -x^2\); \(x\) terms \(4x - 6x = -2x\).</p>
\[\begin{aligned}&(x + 2)(x^2 - 3x + 4)\\ &= x^3 - x^2 - 2x + 8\end{aligned}\]
<p><b>Check</b> at \(x = 1\): \((3)(2) = 6\) and \(1 - 1 - 2 + 8 = 6\).</p>` }
    ],
    vary: [
      [T`Divide \(x^2 + 5x + 6\) by \(x + 2\) with synthetic division. What is the remainder?`, 0, T`\(c = -2\): bottom row \(1, 3 \mid 0\). So \(x + 2\) is a factor.`],
      [T`Same division. What is the constant term of the quotient?`, 3, T`The quotient is \(x + 3\).`],
      [T`Divide \(x^2 + 5x + 7\) by \(x + 2\). What is the remainder?`, 1, T`Only the constant changed, so only the last number changes: \(7 - 6\).`],
      [T`Divide \(x^3 - 8\) by \(x - 2\). What is the coefficient of \(x\) in the quotient?`, 2, T`Coefficients \(1, 0, 0, -8\) with \(c = 2\): bottom row \(1, 2, 4 \mid 0\), so \(x^2 + 2x + 4\).`]
    ]
  });

  // Practice for synthetic division itself, checked with SymPy's polynomial division.
  registerUnitGens('algebra', {
    units: {
      Polynomials: [
        { id: 'au-synth', make(R) {
          const c = R.nz(-3, 3), coef = [R.int(1, 3), R.int(-6, 6), R.int(-8, 8), R.int(-9, 9)];
          if (R.int(0, 2) === 0) coef[R.int(1, 2)] = 0;
          const st = synthStates(coef, c), bot = st[st.length - 1].bot, ask = R.int(0, 2), names = ['x^2', 'x', 'constant'];
          const poly = [[coef[0], 'x^3'], [coef[1], 'x^2'], [coef[2], 'x'], [coef[3], '']];
          const py = `Poly(div(${coef[0]}*x**3 + (${coef[1]})*x**2 + (${coef[2]})*x + (${coef[3]}), x - (${c}), x)[0], x).all_coeffs()[${ask}]`;
          return { q: T`Divide \(${R.lin(poly)}\) by \(${R.lin([[1, 'x'], [-c, '']])}\). What is the ${ask === 2 ? 'constant term of' : `coefficient of \\(${names[ask]}\\) in`} the quotient?`, answer: bot[ask],
            x: T`Synthetic division with \(c = ${c}\) on \(${coef.join(', ')}\): bring down ${coef[0]}${coef.slice(1).map((v, j) => `; \\(${bot[j]}\\cdot ${par(c)} = ${bot[j] * c}\\), \\(${v} + ${par(bot[j] * c)} = ${bot[j + 1]}\\)`).join('')}. Bottom row \(${bot.slice(0, 3).join(', ')} \mid ${bot[3]}\): the quotient is \(${R.lin([[bot[0], 'x^2'], [bot[1], 'x'], [bot[2], '']])}\).`, v: py };
        } }
      ]
    }
  });
})();
