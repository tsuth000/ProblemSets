'use strict';
// Expanded explanations and new units (version 1.5).
(() => {
  const F = window.FIGS, { Plot } = F.util;

  // Sign chart for a quadratic inequality: where the parabola is above or below the axis.
  F.signChart = {
    draw() {
      const f = x => (x + 2) * (x - 3), p = Plot({ x: [-4.5, 5.5], y: [-7.5, 8], h: 250 }).grid(1).axes({ xt: 1, yt: 2 });
      p.shade(x => Math.min(0, f(x)), () => 0, -2, 3, 'fb').fn(f, 'a');
      p.seg(-2, 0, 3, 0, 'band').dot(-2, 0, 'b', 5, true).dot(3, 0, 'b', 5, true);
      p.txt(-3.5, 0, '+', { dy: -10, a: 'middle', cls: 'tb' }).txt(0.5, 0, '\u2212', { dy: -10, a: 'middle', cls: 'tb' }).txt(4.3, 0, '+', { dy: -10, a: 'middle', cls: 'tb' });
      return p.svg();
    }
  };

  // ---------------- Algebra: inequalities ----------------
  amendCard('algebra', 'Inequalities', {
    body: T`
<p>Solve a linear inequality exactly like an equation, with one extra rule: <b>multiplying or dividing both sides by a negative number reverses the inequality.</b></p>
<p>Why: multiplying by \(-1\) mirrors the number line around 0, so the order of every pair of numbers flips. \(2 < 5\), but \(-2 > -5\). Adding or subtracting anything, or multiplying by a positive number, keeps the order.</p>
<table class="tt"><tr><th>Inequality</th><th>Interval</th><th>Number line</th></tr>
<tr><td>\(x > 2\)</td><td>\((2, \infty)\)</td><td>open dot, arrow right</td></tr>
<tr><td>\(x \le -1\)</td><td>\((-\infty, -1]\)</td><td>filled dot, arrow left</td></tr>
<tr><td>\(-2 \le x < 3\)</td><td>\([-2, 3)\)</td><td>filled, then open</td></tr></table>
<p>A compound inequality \(a < \text{expression} < b\) is solved by doing the same operation to all three parts at once. If you divide by a negative, reverse both signs and rewrite it with the smaller number on the left.</p>
<p>Quadratic inequalities have their own unit after the graphs of quadratics.</p>`,
    ex: { q: T`Solve \(-3 \le 1 - 2x < 7\).`, a: T`
<p>Subtract 1 from all parts: \(-4 \le -2x < 6\).</p>
<p>Divide all parts by \(-2\) and reverse both signs: \(2 \ge x > -3\).</p>
<p>Rewrite with the smaller number first: \(-3 < x \le 2\), or \((-3, 2]\).</p>` },
    trap: T`Forgetting to reverse the sign after dividing by a negative, or reversing it after dividing by a positive.`
  });
  addQuestions('algebra', [
    { id: 'a30', skill: 'Inequalities', q: T`Solve \(5 - x \ge 2\).`, c: [T`\(x \le 3\)`, T`\(x \ge 3\)`, T`\(x \le -3\)`, T`\(x \ge -3\)`], x: T`\(-x \ge -3\). Dividing by \(-1\) reverses the sign.` },
    { id: 'a31', skill: 'Inequalities', q: T`Write \(-1 < x \le 4\) in interval notation.`, c: [T`\((-1, 4]\)`, T`\([-1, 4)\)`, T`\((-1, 4)\)`, T`\([-1, 4]\)`], x: T`Strict \(<\) gives a parenthesis; \(\le\) gives a bracket.` },
    { id: 'a32', skill: 'Inequalities', q: T`Solve \(1 < 2x + 3 \le 9\).`, c: [T`\(-1 < x \le 3\)`, T`\(-1 \le x < 3\)`, T`\(2 < x \le 6\)`, T`\(-2 < x \le 6\)`], x: T`Subtract 3: \(-2 < 2x \le 6\). Divide by 2.` },
    { id: 'a33', skill: 'Inequalities', q: T`Which number satisfies \(-4x > 8\)?`, c: ['-3', '-2', '0', '3'], x: T`\(x < -2\). Only \(-3\) qualifies; \(-2\) itself fails because the inequality is strict.` },
    { id: 'a34', skill: 'Inequalities', q: T`Solve \(\dfrac{x}{-3} \le 2\).`, c: [T`\(x \ge -6\)`, T`\(x \le -6\)`, T`\(x \ge 6\)`, T`\(x \le 6\)`], x: T`Multiply by \(-3\) and reverse the sign.` }
  ]);

  // ---------------- Algebra: quadratic inequalities (new unit) ----------------
  insertCard('algebra', 'Graphs of quadratics', {
    title: 'Quadratic inequalities', skill: 'Quadratic inequalities',
    body: T`
<p>To solve \(ax^2 + bx + c < 0\) (or \(>\), \(\le\), \(\ge\)):</p>
<p><b>1.</b> Get 0 on one side. <b>2.</b> Find the roots by factoring or the quadratic formula. <b>3.</b> The roots split the number line into intervals; the sign of the quadratic is constant on each one. <b>4.</b> Test one point per interval, or use the shape: if \(a > 0\) the parabola opens up, so it is <b>negative between the roots</b> and <b>positive outside</b> them. <b>5.</b> Include the roots only for \(\le\) or \(\ge\).</p>
<table class="tt"><tr><th>\(a > 0\), roots \(r_1 < r_2\)</th><th>Solution</th></tr>
<tr><td>\(< 0\)</td><td>\(r_1 < x < r_2\)</td></tr><tr><td>\(\le 0\)</td><td>\(r_1 \le x \le r_2\)</td></tr>
<tr><td>\(> 0\)</td><td>\(x < r_1\) or \(x > r_2\)</td></tr><tr><td>\(\ge 0\)</td><td>\(x \le r_1\) or \(x \ge r_2\)</td></tr></table>
<p>No real roots: the parabola never crosses the axis, so it is always positive (if \(a > 0\)) or always negative.</p>`,
    ex: { q: T`Solve \(2x^2 + x - 3 > 0\).`, a: T`
<p>Factor: \((2x + 3)(x - 1) > 0\). Roots \(x = -\frac32\) and \(x = 1\).</p>
<table class="tt"><tr><th>Interval</th><th>Test point</th><th>\(2x + 3\)</th><th>\(x - 1\)</th><th>Product</th></tr>
<tr><td>\(x < -\frac32\)</td><td>\(-2\)</td><td>\(-\)</td><td>\(-\)</td><td>\(+\)</td></tr>
<tr><td>\(-\frac32 < x < 1\)</td><td>0</td><td>\(+\)</td><td>\(-\)</td><td>\(-\)</td></tr>
<tr><td>\(x > 1\)</td><td>2</td><td>\(+\)</td><td>\(+\)</td><td>\(+\)</td></tr></table>
<p>We want positive: \(x < -\frac32\) or \(x > 1\). The parabola opens up, so "outside the roots" agrees.</p>` },
    trap: T`Taking square roots of \(x^2 > 9\) and writing only \(x > 3\). The solution is \(x < -3\) or \(x > 3\).`,
    hook: T`
<p>A linear inequality has one boundary point. A quadratic has up to two, because a parabola can cross the \(x\)-axis twice. The question "where is \(x^2 - x - 6\) negative?" is the same as "where does the parabola dip below the axis?"</p>
${fig('signChart', {}, T`\(y = (x + 2)(x - 3)\) is negative (shaded) between its roots \(-2\) and 3, and positive outside them.`)}
<p>So: find where it equals zero, then decide which side of each root you want. The table method works for any factored expression; the picture is a quick check.</p>`,
    vary: [
      [T`Solve \(x^2 - 9 < 0\).`, [T`\(-3 < x < 3\)`, T`\(x < -3\) or \(x > 3\)`, T`\(x < 3\)`], T`Roots \(\pm3\); an upward parabola is negative between them.`],
      [T`Solve \(x^2 - 9 > 0\).`, [T`\(x < -3\) or \(x > 3\)`, T`\(-3 < x < 3\)`, T`\(x > 3\)`], T`The direction flipped, so now we want outside the roots.`],
      [T`How many integers satisfy \(x^2 - 9 \le 0\)?`, 7, T`\(-3 \le x \le 3\): the endpoints now count.`],
      [T`How many integers satisfy \(x^2 - 4x < 0\)?`, 3, T`\(x(x - 4) < 0\): \(0 < x < 4\), so 1, 2, 3.`],
      [T`How many real numbers satisfy \(x^2 + 1 < 0\)?`, 0, T`No real roots and the parabola opens up: it is always positive.`]
    ]
  });
  const a19 = SUBJECTS.find(s => s.id === 'algebra').questions.find(q => q.id === 'a19'); if (a19) a19.skill = 'Quadratic inequalities';
  addQuestions('algebra', [
    { id: 'a35', skill: 'Quadratic inequalities', q: T`Solve \(x^2 \ge 16\).`, c: [T`\(x \le -4\) or \(x \ge 4\)`, T`\(x \ge 4\)`, T`\(-4 \le x \le 4\)`, T`\(x \ge \pm4\)`], x: T`\(x^2 - 16 \ge 0\): outside the roots \(\pm4\), endpoints included.` },
    { id: 'a36', skill: 'Quadratic inequalities', q: T`Solve \((x - 1)(x - 5) \le 0\).`, c: [T`\(1 \le x \le 5\)`, T`\(x \le 1\) or \(x \ge 5\)`, T`\(1 < x < 5\)`, T`\(x \le 5\)`], x: T`Upward parabola: non-positive between the roots, inclusive.` },
    { id: 'a37', skill: 'Quadratic inequalities', q: T`Solve \(-x^2 + 4 > 0\).`, c: [T`\(-2 < x < 2\)`, T`\(x < -2\) or \(x > 2\)`, T`\(x > 2\)`, 'no solution'], x: T`Multiply by \(-1\) and reverse: \(x^2 - 4 < 0\).` }
  ]);

  // ---------------- Algebra: radicals ----------------
  amendCard('algebra', 'Radicals', {
    hook: T`
<p>\(\sqrt{49}\) asks: which nonnegative number squared gives 49? Answer: 7. Picture it as the side of a square with area 49.</p>
<p><b>Simplifying.</b> Split the number under the root into a perfect square times what is left, and take the square root of the perfect square: \(\sqrt{50} = \sqrt{25\cdot2} = \sqrt{25}\,\sqrt2 = 5\sqrt2\). Use the <i>largest</i> perfect square: \(\sqrt{72} = \sqrt{36\cdot2} = 6\sqrt2\). (Using \(\sqrt{4\cdot18} = 2\sqrt{18}\) is not finished, since 18 still contains 9.)</p>
<p><b>Adding and subtracting.</b> Radicals combine only when the part under the root matches, exactly like like terms: \(2\sqrt3 + 4\sqrt3 = 6\sqrt3\), just as \(2a + 4a = 6a\). When the radicands differ, simplify each one first; they often turn out to share a common root:</p>
\[\sqrt{12} + \sqrt{27} = 2\sqrt3 + 3\sqrt3 = 5\sqrt3\]
\[\begin{aligned}&\sqrt8 + \sqrt{18} - \sqrt{50}\\ ={}\;&2\sqrt2 + 3\sqrt2 - 5\sqrt2\\ ={}\;&0\end{aligned}\]
<p>If nothing is shared after simplifying, the sum stays as it is: \(\sqrt2 + \sqrt3\) cannot be combined, and it is not \(\sqrt5\).</p>
<p><b>Multiplying.</b> Multiply the numbers outside together and the numbers inside together, then simplify: \(\sqrt a\cdot\sqrt b = \sqrt{ab}\).</p>
\[(2\sqrt3)(5\sqrt6) = 10\sqrt{18} = 10\cdot3\sqrt2 = 30\sqrt2\]
<p>With sums, distribute (FOIL) as with any binomials: \((\sqrt2 + 3)(\sqrt2 - 1) = 2 - \sqrt2 + 3\sqrt2 - 3 = -1 + 2\sqrt2\).</p>
<p><b>Dividing.</b> \(\frac{\sqrt a}{\sqrt b} = \sqrt{\frac ab}\): \(\frac{\sqrt{72}}{\sqrt2} = \sqrt{36} = 6\). To clear a root from a denominator (rationalize), multiply top and bottom by that root: \(\frac{6}{\sqrt3} = \frac{6\sqrt3}{3} = 2\sqrt3\). For a sum such as \(3 - \sqrt5\), multiply by the conjugate \(3 + \sqrt5\), because \((3 - \sqrt5)(3 + \sqrt5) = 9 - 5\) has no root left.</p>`,
    vary: [
      [T`\(\sqrt{12} = a\sqrt3\). Find \(a\).`, 2, T`\(12 = 4\cdot3\).`],
      [T`\(\sqrt{12} + \sqrt{27} = a\sqrt3\). Find \(a\).`, 5, T`Different radicands, but both simplify to multiples of \(\sqrt3\): \(2\sqrt3 + 3\sqrt3\).`],
      [T`\(\sqrt{8} + \sqrt{18} = a\sqrt2\). Find \(a\).`, 5, T`Same idea with \(\sqrt2\): \(2\sqrt2 + 3\sqrt2\).`],
      [T`\((2\sqrt3)(5\sqrt6) = a\sqrt2\). Find \(a\).`, 30, T`Outside: \(2\cdot5\). Inside: \(\sqrt{18} = 3\sqrt2\).`],
      [T`Evaluate \(\dfrac{\sqrt{72}}{\sqrt2}\).`, 6, T`Divide under one root: \(\sqrt{36}\).`],
      [T`\(\dfrac{6}{\sqrt3} = a\sqrt3\). Find \(a\).`, 2, T`Multiply top and bottom by \(\sqrt3\): \(\frac{6\sqrt3}{3}\).`]
    ]
  });

  // ---------------- Trigonometry: right triangles ----------------
  amendCard('trig', 'Right-triangle trigonometry', {
    hook: T`
<p><b>Why the ratios are fixed.</b> Lean a ladder against a wall at \(40^\circ\). A ladder twice as long reaches twice as high and stands twice as far out; every side scales by the same factor. Triangles with the same angles are similar, so the ratios between their sides never change. Those ratios depend only on the angle, and we name them:</p>
\[\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}} \qquad \cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}} \qquad \tan\theta = \frac{\text{opposite}}{\text{adjacent}}\]
<p>"Opposite" and "adjacent" are measured from the angle you are using: the opposite side faces it, the adjacent side touches it, and the hypotenuse is always across from the right angle.</p>
${fig('rightTri', {}, 'Move the angle: the ratios change with the angle, never with the size.')}
<p><b>Where the special values come from.</b> Two triangles produce exact values you can rebuild any time with the Pythagorean theorem.</p>
<p><i>45-45-90:</i> cut a square with side 1 along its diagonal. The legs are 1 and 1, so the hypotenuse is \(\sqrt{1^2 + 1^2} = \sqrt2\). Then \(\sin45^\circ = \cos45^\circ = \frac{1}{\sqrt2} = \frac{\sqrt2}{2}\) and \(\tan45^\circ = 1\).</p>
<p><i>30-60-90:</i> cut an equilateral triangle with side 2 in half. The hypotenuse is 2, the short leg is half the base, 1, and the tall leg is \(\sqrt{2^2 - 1^2} = \sqrt3\). The \(30^\circ\) angle sits at the top, across from the short leg, so \(\sin30^\circ = \frac12\), \(\cos30^\circ = \frac{\sqrt3}{2}\), \(\tan30^\circ = \frac{1}{\sqrt3} = \frac{\sqrt3}{3}\). The \(60^\circ\) angle swaps opposite and adjacent: \(\sin60^\circ = \frac{\sqrt3}{2}\), \(\cos60^\circ = \frac12\), \(\tan60^\circ = \sqrt3\).</p>
${fig('specialTri', {}, 'Side ratios 1 : √3 : 2 and 1 : 1 : √2.')}
<p><b>The same angles in radians.</b> Since \(180^\circ = \pi\), divide: \(30^\circ = \frac\pi6\), \(45^\circ = \frac\pi4\), \(60^\circ = \frac\pi3\), \(90^\circ = \frac\pi2\). Every standard angle is a multiple of \(\frac\pi6\) (30°) or \(\frac\pi4\) (45°), so count copies:</p>
<table class="tt"><tr><th>Multiple</th><th>\(\frac{2\pi}3\)</th><th>\(\frac{3\pi}4\)</th><th>\(\frac{5\pi}6\)</th><th>\(\frac{7\pi}6\)</th><th>\(\frac{5\pi}4\)</th><th>\(\frac{5\pi}3\)</th></tr>
<tr><td>Degrees</td><td>120</td><td>135</td><td>150</td><td>210</td><td>225</td><td>300</td></tr></table>
<p>To convert anything else, multiply degrees by \(\frac{\pi}{180}\), or radians by \(\frac{180}{\pi}\).</p>`,
    vary: [
      [T`A 3-4-5 right triangle has \(\theta\) opposite the side 3. Find \(\sin\theta\).`, 0.6, T`Opposite over hypotenuse.`],
      [T`Same triangle. Find \(\tan\theta\).`, 0.75, T`Opposite over adjacent.`],
      [T`Now let \(\theta\) be the other acute angle. Find \(\sin\theta\).`, 0.8, T`Opposite and adjacent swap when you switch angles.`],
      [T`A 30-60-90 triangle has hypotenuse 8. Find the shortest side.`, 4, T`The short leg is half the hypotenuse.`],
      [T`Same triangle. Find the longer leg, to two decimals.`, 4 * Math.sqrt(3), T`Short leg times \(\sqrt3\): \(4\sqrt3\).`],
      [T`Evaluate \(\tan60^\circ\) to three decimals.`, Math.sqrt(3), T`\(\frac{\sqrt3}{1}\) from the 30-60-90 triangle.`],
      [T`Convert \(\frac{5\pi}6\) to degrees.`, 150, T`Five copies of \(30^\circ\).`],
      [T`Write \(225^\circ\) as \(k\pi\). Find \(k\).`, 1.25, T`\(\frac{225}{180} = \frac54\): five copies of \(\frac\pi4\).`]
    ]
  });

  // ---------------- Discrete: propositions and tautologies ----------------
  amendCard('discrete', 'Propositions and truth tables', {
    hook: T`
<p>Logic is the grammar of exact reasoning. Its basic unit is a <b>proposition</b>: a statement that is definitely true or definitely false.</p>
<p>Propositions: "7 is prime" (true), "Paris is in Spain" (false), "\(2 + 2 = 5\)" (false). Not propositions: "Close the door" (a command), "Is it raining?" (a question), "\(x > 3\)" (its truth depends on \(x\); it becomes a proposition once \(x\) is known).</p>
<p>We abbreviate propositions with letters: \(p\) = "it is raining", \(q\) = "I bring an umbrella". <b>Connectives</b> combine them:</p>
<table class="tt"><tr><th>Symbol</th><th>Read as</th><th>True when</th></tr>
<tr><td>\(\neg p\)</td><td>not \(p\)</td><td>\(p\) is false</td></tr>
<tr><td>\(p\land q\)</td><td>\(p\) and \(q\)</td><td>both are true</td></tr>
<tr><td>\(p\lor q\)</td><td>\(p\) or \(q\)</td><td>at least one is true</td></tr>
<tr><td>\(p\to q\)</td><td>if \(p\), then \(q\)</td><td>except when \(p\) is true and \(q\) is false</td></tr>
<tr><td>\(p\leftrightarrow q\)</td><td>\(p\) if and only if \(q\)</td><td>both have the same value</td></tr></table>
<p>Logical "or" is inclusive: "coffee or tea" is true if you have both. The conditional is a promise. "If it rains, I bring an umbrella" is broken only when it rains and I come without one. On a dry day I keep the promise whatever I carry.</p>
<p><b>Building a truth table.</b> A truth table lists every possible combination of truth values and works out the statement for each.</p>
<p>1. With \(n\) letters there are \(2^n\) rows. List them systematically: the first column alternates in blocks of half the rows, the next in blocks of a quarter, and so on.</p>
<p>2. Add one column for each piece of the formula, from the inside out.</p>
<p>3. Fill each column using the table above.</p>
<p>Example, \(\neg p\lor q\):</p>
<table class="tt"><tr><th>\(p\)</th><th>\(q\)</th><th>\(\neg p\)</th><th>\(\neg p\lor q\)</th></tr>
<tr><td>T</td><td>T</td><td>F</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>T</td><td>T</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td></tr></table>
<p>Its final column matches \(p\to q\) row for row, so the two formulas mean the same thing. Comparing final columns is how you test any claim about logic, which the next unit builds on.</p>`
  });

  insertCard('discrete', 'Propositions and truth tables', {
    title: 'Tautologies and contradictions', skill: 'Logic',
    body: T`
<table class="tt"><tr><th>Type</th><th>Final column of the truth table</th><th>Example</th></tr>
<tr><td>tautology</td><td>all T</td><td>\(p\lor\neg p\)</td></tr>
<tr><td>contradiction</td><td>all F</td><td>\(p\land\neg p\)</td></tr>
<tr><td>contingency</td><td>some T, some F</td><td>\(p\to q\)</td></tr></table>
<p>Two formulas \(A\) and \(B\) are <b>logically equivalent</b>, written \(A \equiv B\), exactly when \(A\leftrightarrow B\) is a tautology: they agree in every row.</p>
<p>An argument "from these premises, conclude this" is <b>valid</b> when (premises) \(\to\) (conclusion) is a tautology. Modus ponens, "\(p \to q\) and \(p\), therefore \(q\)", is valid because \(((p\to q)\land p)\to q\) is a tautology.</p>`,
    ex: { q: T`Show that \(((p\to q)\land p)\to q\) is a tautology.`, a: T`
<table class="tt"><tr><th>\(p\)</th><th>\(q\)</th><th>\(p\to q\)</th><th>\((p\to q)\land p\)</th><th>whole</th></tr>
<tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td><td>T</td></tr>
<tr><td>F</td><td>T</td><td>T</td><td>F</td><td>T</td></tr><tr><td>F</td><td>F</td><td>T</td><td>F</td><td>T</td></tr></table>
<p>Every row of the last column is T, so it is a tautology: the argument form is valid.</p>` },
    trap: T`Checking a single row. A formula that is true in the row you tried can still be false in another; a tautology must be true in all of them.`,
    hook: T`
<p>Some statements are true for reasons that have nothing to do with the facts. "It is raining or it is not raining" is true whatever the weather. Its form guarantees it. Such a statement is a <b>tautology</b>.</p>
<p>The opposite is a <b>contradiction</b>: false whatever the facts, like "it is raining and it is not raining". Everything in between, true in some situations and false in others, is a <b>contingency</b>. Most everyday statements are contingencies.</p>
<p>How to tell which is which: build the truth table and look only at the final column. All T means tautology, all F means contradiction, a mix means contingency.</p>
<p>Why it matters: an argument is valid exactly when "if the premises, then the conclusion" is a tautology. Truth tables turn "does this reasoning hold up?" into a mechanical check.</p>`,
    vary: [
      [T`Classify \(p\lor\neg p\).`, ['tautology', 'contradiction', 'contingency'], T`One of \(p\), \(\neg p\) is always true.`],
      [T`Classify \(p\land\neg p\).`, ['contradiction', 'tautology', 'contingency'], T`"Or" became "and": now both must hold, which never happens.`],
      [T`Classify \(p\to q\).`, ['contingency', 'tautology', 'contradiction'], T`False in exactly one row.`],
      [T`Classify \((p\land q)\to p\).`, ['tautology', 'contingency', 'contradiction'], T`If both hold, then certainly \(p\) holds.`],
      [T`In how many rows of its truth table is \(p\lor q\) true?`, 3, T`Every row except F, F.`]
    ]
  });

  // ---------------- Linear algebra: systems and row reduction ----------------
  amendCard('linalg', 'Systems and row reduction', {
    hook: T`
<p>A <b>linear equation</b> uses variables only to the first power, multiplied by numbers and added: \(2x + 3y = 12\) qualifies; \(xy = 6\) and \(x^2 + y = 1\) do not.</p>
<p>Geometrically, one linear equation in two unknowns is a line, and in three unknowns a plane. A <b>system</b> asks for the points that lie on all of them at once.</p>
${fig('system', {}, 'Two lines, one crossing point: the unique solution.')}
<p><b>Elimination</b>, from algebra, adds a multiple of one equation to another so that a variable cancels. Row reduction is the same idea done systematically. The variable names are dead weight, so keep only the numbers in an <b>augmented matrix</b>: one row per equation, one column per variable, and the right-hand sides after a bar.</p>
\[\begin{aligned}x + y + z &= 6\\ 2x + 3y + z &= 11\\ x - y + 2z &= 5\end{aligned}\]
<p>becomes</p>
\[\left[\begin{array}{ccc|c}1&1&1&6\\2&3&1&11\\1&-1&2&5\end{array}\right]\]
<p>Three <b>row operations</b> are allowed:</p>
<p>1. Swap two rows.</p>
<p>2. Multiply a row by a nonzero number.</p>
<p>3. Add a multiple of one row to another.</p>
<p>Each one can be undone, so the new system has exactly the same solutions as the old one.</p>
<p>The goal is <b>echelon form</b>: a staircase where each row's first nonzero entry (its <b>pivot</b>) sits to the right of the one above, with zeros below every pivot. Then the last equation has one unknown, and you substitute upward.</p>`,
    body: T`
<p><b>Forward elimination.</b> Use the first pivot to make every entry below it zero (\(R_i \leftarrow R_i - mR_1\), with \(m\) = entry \(\div\) pivot). Move to the next row and column and repeat. Swap rows if a pivot position holds 0.</p>
<p><b>Back substitution.</b> Solve the last row for its variable, substitute into the row above, and continue upward.</p>
<p><b>Reading the result.</b> A row \([\,0\ 0\ 0 \mid c\,]\) with \(c \ne 0\) says \(0 = c\): no solution. A column without a pivot is a free variable: infinitely many solutions. A pivot in every variable column means exactly one solution.</p>
<p>Going further and making each pivot 1 with zeros above it too gives <b>reduced</b> echelon form, from which the solution can be read directly.</p>`,
    ex: { q: T`Solve \(x + y + z = 6\), \(2x + 3y + z = 11\), \(x - y + 2z = 5\) by row reduction.`, a: T`
<p>\(R_2 \leftarrow R_2 - 2R_1\) and \(R_3 \leftarrow R_3 - R_1\):</p>
\[\left[\begin{array}{ccc|c}1&1&1&6\\0&1&-1&-1\\0&-2&1&-1\end{array}\right]\]
<p>\(R_3 \leftarrow R_3 + 2R_2\):</p>
\[\left[\begin{array}{ccc|c}1&1&1&6\\0&1&-1&-1\\0&0&-1&-3\end{array}\right]\]
<p>Back substitute: \(-z = -3\) gives \(z = 3\). Then \(y - 3 = -1\) gives \(y = 2\). Then \(x + 2 + 3 = 6\) gives \(x = 1\).</p>
<p>Check in the original second equation: \(2 + 6 + 3 = 11\).</p>` },
    trap: T`Applying a row operation to the coefficients but forgetting the right-hand side column.`,
    vary: [
      [T`Solve \(x + y = 5\), \(x - y = 1\). Find \(x\).`, 3, T`Add the rows.`],
      [T`In \(\left[\begin{array}{cc|c}1&2&4\\3&5&9\end{array}\right]\), apply \(R_2 \leftarrow R_2 - 3R_1\). What is the new middle entry of \(R_2\)?`, -1, T`\(5 - 3\cdot2\).`],
      [T`Same operation. What is the new right-hand side of \(R_2\)?`, -3, T`\(9 - 3\cdot4\): the bar column changes too.`],
      [T`So \(-y = -3\). Find \(x\) from \(x + 2y = 4\).`, -2, T`\(y = 3\), so \(x = 4 - 6\).`],
      [T`Solve \(x + y + z = 6\), \(y + z = 5\), \(z = 3\). Find \(y\).`, 2, T`Already in echelon form: back-substitute.`]
    ]
  });
})();
