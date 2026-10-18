'use strict';
// Pure math track, stage 1: Numbers and irrationals. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'nums', name: 'Numbers and irrationals', color: '#7A4E2D', blurb: 'Number systems, decimals, irrationality proofs, surds, continued fractions, transcendental numbers, countability', questions: [], generators: [] });
  const U = ['Number systems', 'Rationals and decimals', 'Proving irrationality', 'Arithmetic with irrationals', 'Surds and radicals', 'Density and approximation', 'Continued fractions', 'Famous constants: e, π, φ', 'Algebraic and transcendental numbers', 'Countable and uncountable', 'Completeness of the reals'];

  registerLearn('nums', [
    { title: U[0], skill: U[0],
      hook: T`<p>Each number system was invented to make an operation always possible. Subtraction forced the integers, division forced the rationals, limits forced the reals, and \(x^2 = -1\) forced the complex numbers.</p>
\[\mathbb N \subset \mathbb Z \subset \mathbb Q \subset \mathbb R \subset \mathbb C\]`,
      body: T`
<table class="tt"><tr><th>Set</th><th>Members</th><th>Closed under</th><th>Fails</th></tr>
<tr><td>\(\mathbb N\)</td><td>0, 1, 2, ... (some books start at 1)</td><td>\(+\), \(\times\)</td><td>\(3 - 5\)</td></tr>
<tr><td>\(\mathbb Z\)</td><td>..., \(-1\), 0, 1, ...</td><td>\(+\), \(-\), \(\times\)</td><td>\(1 \div 2\)</td></tr>
<tr><td>\(\mathbb Q\)</td><td>\(\frac pq\), \(q \ne 0\)</td><td>\(+\), \(-\), \(\times\), \(\div\) (nonzero)</td><td>\(\sqrt2\), limits</td></tr>
<tr><td>\(\mathbb R\)</td><td>all limits of rationals</td><td>the above, plus limits</td><td>\(\sqrt{-1}\)</td></tr>
<tr><td>\(\mathbb C\)</td><td>\(a + bi\)</td><td>all of the above, and every polynomial has a root</td><td>ordering</td></tr></table>
<p>The <b>irrational numbers</b> \(\mathbb R \setminus \mathbb Q\) are the reals that are not ratios of integers: \(\sqrt2\), \(\pi\), \(e\), \(\log_23\).</p>
<p><b>Classify a number</b> by simplifying first: \(\sqrt{16} = 4 \in \mathbb N\), \(0.\overline3 = \frac13 \in \mathbb Q\), \(\sqrt{12} = 2\sqrt3\) is irrational, \(\sqrt{-4} = 2i\) is not real.</p>`,
      ex: { q: T`Name the smallest of \(\mathbb N, \mathbb Z, \mathbb Q, \mathbb R, \mathbb C\) containing each: \(-\frac{12}{4}\), \(\sqrt{0.25}\), \(\sqrt{50}/\sqrt2\), \(1 + \sqrt{-9}\).`, a: T`<p>\(-\frac{12}{4} = -3 \in \mathbb Z\). \(\sqrt{0.25} = 0.5 \in \mathbb Q\). \(\sqrt{50}/\sqrt2 = \sqrt{25} = 5 \in \mathbb N\). \(1 + 3i \in \mathbb C\).</p>` },
      trap: T`Judging by appearance: \(\sqrt{50}/\sqrt2\) looks irrational but equals 5.`,
      vary: [[T`Smallest set containing \(\sqrt{49}\)?`, ['\\(\\mathbb N\\)', '\\(\\mathbb Q\\)', '\\(\\mathbb R\\)'], T`It is 7.`], [T`Smallest set containing \(-\sqrt{49}\)?`, ['\\(\\mathbb Z\\)', '\\(\\mathbb N\\)', '\\(\\mathbb R\\)'], T`\(-7\).`], [T`Smallest set containing \(\sqrt{4.9}\)?`, ['\\(\\mathbb R\\)', '\\(\\mathbb Q\\)', '\\(\\mathbb Z\\)'], T`\(4.9 = \frac{49}{10}\), and \(\sqrt{10}\) is irrational.`], [T`Smallest set containing \(\sqrt{-49}\)?`, ['\\(\\mathbb C\\)', '\\(\\mathbb R\\)', '\\(\\mathbb Z\\)'], T`\(7i\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>A fraction's decimal either stops or repeats forever, and which one happens depends only on the denominator. Irrational numbers are exactly the decimals that never stop and never repeat.</p>`,
      body: T`
<p><b>Terminating.</b> In lowest terms, \(\frac pq\) terminates exactly when \(q\) has no prime factors other than 2 and 5, because then \(q\) divides a power of 10: \(\frac{3}{40} = \frac{75}{1000} = 0.075\).</p>
<p><b>Repeating.</b> Otherwise the decimal repeats. Long division can only produce the remainders \(1, \ldots, q - 1\), so a remainder recurs within \(q - 1\) steps and the digits cycle from there. For \(q\) coprime to 10, the period of \(\frac1q\) is the smallest \(k\) with \(10^k \equiv 1 \pmod q\): 1 for \(q = 3\), 2 for 11, 3 for 37, 6 for 7 and 13.</p>
<p><b>Repeating decimal to fraction.</b> Multiply to line up the repeating blocks and subtract.</p>
\[x = 0.\overline{27}:\quad 100x - x = 27,\quad x = \tfrac{27}{99} = \tfrac{3}{11}\]
\[x = 0.1\overline6:\quad 100x - 10x = 16.\overline6 - 1.\overline6 = 15,\quad x = \tfrac{15}{90} = \tfrac16\]
<p>Shortcut: \(0.\overline{abc} = \frac{abc}{999}\); with \(m\) non-repeating digits first, subtract them and divide by \(\underbrace{9\cdots9}_{\text{period}}\underbrace{0\cdots0}_{m}\).</p>
<p>Consequence: \(0.\overline9 = \frac99 = 1\). A decimal has two forms only when it terminates.</p>`,
      ex: { q: T`Write \(0.3\overline{18}\) as a fraction in lowest terms.`, a: T`<p>\(1000x = 318.\overline{18}\) and \(10x = 3.\overline{18}\). Subtract: \(990x = 315\), so \(x = \frac{315}{990} = \frac{7}{22}\).</p>` },
      trap: T`Testing the denominator before reducing: \(\frac{3}{6}\) terminates because it equals \(\frac12\).`,
      vary: [[T`Write \(0.\overline{4}\) as a fraction.`, 4 / 9, T`\(\frac49\).`], [T`Write \(0.\overline{45}\) as a fraction.`, 5 / 11, T`\(\frac{45}{99}\).`], [T`Period of \(\frac17\)?`, 6, T`\(0.\overline{142857}\).`], [T`Does \(\frac{7}{80}\) terminate? Enter 1 for yes, 0 for no.`, 1, T`\(80 = 2^4\cdot5\).`], [T`Does \(\frac{7}{30}\) terminate? 1 for yes, 0 for no.`, 0, T`\(30\) has the factor 3.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>To prove a number is irrational, assume it is a fraction in lowest terms and derive a contradiction. The oldest example is \(\sqrt2\), known to the Pythagoreans.</p>`,
      body: T`
<h4>\(\sqrt2\) is irrational</h4>
<p>Suppose \(\sqrt2 = \frac pq\) in lowest terms. Then \(p^2 = 2q^2\), so \(p^2\) is even, so \(p\) is even: \(p = 2k\). Then \(4k^2 = 2q^2\), so \(q^2 = 2k^2\) and \(q\) is even. Both even contradicts lowest terms.</p>
<h4>\(\sqrt n\) for any non-square \(n\)</h4>
<p>By unique prime factorization, \(p^2 = nq^2\) has every prime appearing an even number of times on the left. On the right, some prime appears an odd number of times in \(n\) (since \(n\) is not a perfect square) and evenly in \(q^2\): impossible. So \(\sqrt n\) is either an integer or irrational, never a non-integer fraction. The same argument works for \(\sqrt[k]{n}\).</p>
<h4>The rational root theorem</h4>
<p>If \(\frac pq\) (lowest terms) solves \(a_nx^n + \cdots + a_0 = 0\) with integer coefficients, then \(p \mid a_0\) and \(q \mid a_n\). So find a polynomial with the number as a root, list the few rational candidates, and check none works. \(x = \sqrt2 + \sqrt3\) gives \(x^2 = 5 + 2\sqrt6\), \((x^2 - 5)^2 = 24\), so \(x^4 - 10x^2 + 1 = 0\). The only rational candidates are \(\pm1\), which fail, so \(\sqrt2 + \sqrt3\) is irrational.</p>
<h4>Logarithms</h4>
<p>If \(\log_23 = \frac pq\) with \(p, q > 0\), then \(2^p = 3^q\): even equals odd. Impossible.</p>`,
      ex: { q: T`Prove \(\sqrt[3]{2}\) is irrational.`, a: T`<p>Suppose \(\sqrt[3]2 = \frac pq\) in lowest terms. Then \(p^3 = 2q^3\), so \(p^3\) is even and \(p\) is even, \(p = 2k\). Then \(8k^3 = 2q^3\), \(q^3 = 4k^3\), so \(q\) is even. Contradiction.</p><p>(Or: the only rational roots of \(x^3 - 2\) could be \(\pm1, \pm2\), and none works.)</p>` },
      trap: T`Concluding that a sum of two irrationals is irrational. \(\sqrt2 + (-\sqrt2) = 0\); each case needs its own argument.`,
      vary: [[T`Is \(\sqrt{50}\) rational? 1 yes, 0 no.`, 0, T`50 is not a perfect square.`], [T`Is \(\sqrt{2.25}\) rational? 1 yes, 0 no.`, 1, T`\(\sqrt{\frac{9}{4}} = 1.5\).`], [T`How many rational candidates does the rational root theorem allow for \(x^2 - 6 = 0\)?`, 8, T`\(\pm1, \pm2, \pm3, \pm6\).`], [T`Is \(\log_416\) rational? 1 yes, 0 no.`, 1, T`It is 2.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Rational numbers form a closed system, but irrationals do not: combining two irrationals can land anywhere. Knowing which combinations are forced to be irrational saves long proofs.</p>`,
      body: T`
<table class="tt"><tr><th>Combination</th><th>Always</th><th>Why</th></tr>
<tr><td>rational \(+\) irrational</td><td>irrational</td><td>if \(r + x = s\) were rational, \(x = s - r\) would be too</td></tr>
<tr><td>nonzero rational \(\times\) irrational</td><td>irrational</td><td>\(x = \frac{s}{r}\) otherwise</td></tr>
<tr><td>irrational \(+\) irrational</td><td>either</td><td>\(\sqrt2 + \sqrt3\) irrational; \(\sqrt2 + (1 - \sqrt2) = 1\)</td></tr>
<tr><td>irrational \(\times\) irrational</td><td>either</td><td>\(\sqrt2\cdot\sqrt8 = 4\); \(\sqrt2\cdot\sqrt3 = \sqrt6\)</td></tr></table>
<p><b>Simplify before judging.</b> \((2 + \sqrt3)(2 - \sqrt3) = 4 - 3 = 1\), \(\sqrt{12} - 2\sqrt3 = 0\), \((\sqrt5)^4 = 25\), but \((\sqrt2 + \sqrt3)^2 = 5 + 2\sqrt6\) is irrational.</p>
<p><b>An irrational power can be rational.</b> Consider \(\sqrt2^{\sqrt2}\). If it is rational, done. If not, then \(\left(\sqrt2^{\sqrt2}\right)^{\sqrt2} = \sqrt2^{2} = 2\) is rational. Either way an irrational to an irrational power is rational, though this proof does not say which case holds. (It is the second: \(\sqrt2^{\sqrt2}\) is transcendental, by the Gelfond–Schneider theorem.)</p>`,
      ex: { q: T`Show that if \(x\) is irrational, then \(\frac{1}{x}\) and \(x + \frac12\) are irrational.`, a: T`<p>If \(\frac1x = r\) were rational (and nonzero), then \(x = \frac1r\) would be rational. If \(x + \frac12 = s\) were rational, \(x = s - \frac12\) would be. Both contradict \(x\) irrational.</p>` },
      trap: T`Assuming \(\sqrt a + \sqrt b = \sqrt{a + b}\). Square the left: \(a + b + 2\sqrt{ab}\).`,
      vary: [[T`Is \((3 + \sqrt5)(3 - \sqrt5)\) rational? 1 yes, 0 no.`, 1, T`\(9 - 5 = 4\).`], [T`Is \((\sqrt3 + \sqrt5)^2\) rational? 1 yes, 0 no.`, 0, T`\(8 + 2\sqrt{15}\).`], [T`Is \(\sqrt{18} - 3\sqrt2\) rational? 1 yes, 0 no.`, 1, T`It is 0.`], [T`Is \(\pi + 1\) rational? 1 yes, 0 no.`, 0, T`Rational plus irrational.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>A surd is an irrational root such as \(\sqrt{12}\). Three skills handle almost every surd: pull out square factors, clear roots from denominators, and undo nested roots.</p>`,
      body: T`
<p><b>Simplify:</b> \(\sqrt{ab} = \sqrt a\sqrt b\) for \(a, b \ge 0\). Pull out the largest square factor: \(\sqrt{72} = \sqrt{36\cdot2} = 6\sqrt2\). Simplified form has a square-free number under the root.</p>
<p><b>Rationalize:</b> multiply by the conjugate, since \((\sqrt a - \sqrt b)(\sqrt a + \sqrt b) = a - b\):</p>
\[\frac{6}{\sqrt5 - \sqrt2} = \frac{6(\sqrt5 + \sqrt2)}{5 - 2} = 2(\sqrt5 + \sqrt2)\]
<p><b>Denest:</b> \(\sqrt{a + 2\sqrt b} = \sqrt x + \sqrt y\) when \(x + y = a\) and \(xy = b\). Square the right side to check: \(x + y + 2\sqrt{xy}\). So \(\sqrt{5 + 2\sqrt6} = \sqrt3 + \sqrt2\) and \(\sqrt{7 - 4\sqrt3} = \sqrt{7 - 2\sqrt{12}} = 2 - \sqrt3\).</p>
<p><b>Compare without a calculator:</b> square both sides (both positive). \(\sqrt3 + \sqrt5\) versus \(\sqrt2 + \sqrt6\): squares \(8 + 2\sqrt{15}\) and \(8 + 2\sqrt{12}\), so the first is larger. With equal sums under the roots, the pair closer together wins.</p>`,
      ex: { q: T`Simplify \(\sqrt{11 + 6\sqrt2}\).`, a: T`<p>\(6\sqrt2 = 2\sqrt{18}\). Need \(x + y = 11\), \(xy = 18\): \(x = 9\), \(y = 2\). So \(\sqrt9 + \sqrt2 = 3 + \sqrt2\). Check: \((3 + \sqrt2)^2 = 11 + 6\sqrt2\).</p>` },
      trap: T`Writing \(\sqrt{a + b} = \sqrt a + \sqrt b\). \(\sqrt{9 + 16} = 5\), not 7.`,
      vary: [[T`\(\sqrt{72} = a\sqrt2\). Find \(a\).`, 6, T`\(36\cdot2\).`], [T`\(\sqrt{200} = a\sqrt2\). Find \(a\).`, 10, T`\(100\cdot2\).`], [T`\(\frac{4}{\sqrt3 - 1} = c(\sqrt3 + 1)\). Find \(c\).`, 2, T`\(\frac{4}{3 - 1}\).`], [T`\(\sqrt{4 + 2\sqrt3} = \sqrt x + 1\). Find \(x\).`, 3, T`\(x + 1 = 4\), \(x\cdot1 = 3\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Rationals and irrationals are both everywhere: between any two different real numbers there are infinitely many of each. Yet "most" reals are irrational, as a later unit shows.</p>`,
      body: T`
<p><b>Archimedean property.</b> For any real \(x\) there is an integer \(n > x\). Equivalently, \(\frac1n\) can be made smaller than any positive number.</p>
<p><b>Rationals are dense.</b> Given \(a < b\), choose \(n\) with \(\frac1n < b - a\). The multiples of \(\frac1n\) are spaced closer than the gap, so some \(\frac mn\) lands strictly inside \((a, b)\).</p>
<p><b>Irrationals are dense.</b> Apply the same step to \(\frac{a}{\sqrt2} < \frac{b}{\sqrt2}\) to get a rational \(r\) between them; then \(r\sqrt2\) is irrational (for \(r \ne 0\)) and lies in \((a, b)\).</p>
<p><b>Decimal approximation.</b> Truncating after \(k\) decimal places gives a rational within \(10^{-k}\). Bounding square roots by squares: \(\sqrt{40}\) lies between 6 and 7 because \(36 < 40 < 49\), and between 6.3 and 6.4 because \(39.69 < 40 < 40.96\).</p>
<p><b>Counting integers between roots.</b> Integers \(n\) with \(a < \sqrt n < b\) (for positive integers \(a, b\)) are those with \(a^2 < n < b^2\): there are \(b^2 - a^2 - 1\).</p>`,
      ex: { q: T`Find a rational and an irrational strictly between 0.31 and 0.32.`, a: T`<p>Rational: 0.315. Irrational: \(0.31 + \frac{\sqrt2}{1000} \approx 0.3114\), since rational plus nonzero rational times \(\sqrt2\) is irrational.</p>` },
      trap: T`Thinking the rationals have a "next" number. Between any two there is always another, their average.`,
      vary: [[T`Integers \(n\) with \(3 < \sqrt n < 5\)?`, 15, T`\(9 < n < 25\).`], [T`Between which integers is \(\sqrt{90}\)? Enter the lower.`, 9, T`\(81 < 90 < 100\).`], [T`Smallest \(n\) with \(\frac1n < 0.003\)?`, 334, T`\(n > 333.\overline3\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>A continued fraction writes a number as an integer part plus the reciprocal of what remains, over and over. It ends for rationals, repeats for square roots, and its truncations give the best possible fraction approximations: \(\pi \approx \frac{355}{113}\) is correct to 6 decimal places.</p>`,
      body: T`
\[x = a_0 + \cfrac{1}{a_1 + \cfrac{1}{a_2 + \cdots}} = [a_0; a_1, a_2, \ldots]\]
<p><b>Computing.</b> Take the integer part, subtract, take the reciprocal, repeat. For a rational this is Euclid's algorithm: \(\frac{415}{93} = 4 + \frac{43}{93}\), \(\frac{93}{43} = 2 + \frac{7}{43}\), \(\frac{43}{7} = 6 + \frac17\), \(\frac71 = 7\). So \(\frac{415}{93} = [4; 2, 6, 7]\). The expansion ends exactly when the number is rational.</p>
<p><b>Square roots repeat.</b> \(\sqrt2 = [1; 2, 2, 2, \ldots]\): if \(x = \sqrt2 - 1\), then \(\frac1x = \sqrt2 + 1 = 2 + x\). \(\sqrt3 = [1; \overline{1, 2}]\), \(\sqrt7 = [2; \overline{1, 1, 1, 4}]\). Lagrange's theorem: the expansion is eventually periodic exactly for irrational roots of quadratics.</p>
<p><b>Convergents.</b> Truncations \(\frac{p_k}{q_k}\) obey \(p_k = a_kp_{k-1} + p_{k-2}\), \(q_k = a_kq_{k-1} + q_{k-2}\) (start with \(p_{-1} = 1\), \(q_{-1} = 0\), \(p_0 = a_0\), \(q_0 = 1\)). They alternate above and below \(x\), with \(\left|x - \frac{p_k}{q_k}\right| < \frac{1}{q_k^2}\), and no fraction with a smaller denominator is closer.</p>
<p>\(\pi = [3; 7, 15, 1, 292, \ldots]\) gives \(3, \frac{22}{7}, \frac{333}{106}, \frac{355}{113}\). The large term 292 is why \(\frac{355}{113}\) is so accurate.</p>`,
      ex: { q: T`Find the continued fraction of \(\frac{43}{19}\) and its convergents.`, a: T`<p>\(43 = 2\cdot19 + 5\), \(19 = 3\cdot5 + 4\), \(5 = 1\cdot4 + 1\), \(4 = 4\cdot1\). So \([2; 3, 1, 4]\).</p><p>Convergents: \(2\), \(2 + \frac13 = \frac73\), \(\frac{1\cdot7 + 2}{1\cdot3 + 1} = \frac94\), \(\frac{4\cdot9 + 7}{4\cdot4 + 3} = \frac{43}{19}\).</p>` },
      trap: T`Treating \([a_0; a_1, a_2]\) as \(a_0 + \frac{1}{a_1} + \frac{1}{a_2}\). The fractions nest.`,
      vary: [[T`\([1; 2]\) as a fraction?`, 1.5, T`\(1 + \frac12\).`], [T`\([1; 2, 2]\)?`, 1.4, T`\(1 + \frac{1}{2 + 1/2} = \frac75\).`], [T`\([1; 2, 2, 2]\)?`, 17 / 12, T`Next convergent of \(\sqrt2\).`], [T`First partial quotient after \(a_0\) for \(\sqrt3\)?`, 1, T`\([1; 1, 2, 1, 2, \ldots]\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Three irrational constants run through all of mathematics: \(e\) from growth, \(\pi\) from circles, and the golden ratio \(\varphi\) from self-similarity.</p>`,
      body: T`
<h4>\(e \approx 2.71828\)</h4>
<p>\(e = \lim_{n\to\infty}\left(1 + \frac1n\right)^n = \sum_{k=0}^\infty\frac{1}{k!}\). <b>Irrational:</b> if \(e = \frac pq\), multiply \(e - \sum_{k=0}^q\frac1{k!}\) by \(q!\). The result is a positive integer, yet it equals \(\frac{1}{q+1} + \frac{1}{(q+1)(q+2)} + \cdots < \frac1q \le 1\): no integer lies strictly between 0 and 1.</p>
<h4>\(\pi \approx 3.14159\)</h4>
<p>The ratio of circumference to diameter. Archimedes trapped it between inscribed and circumscribed 96-gons: \(3\frac{10}{71} < \pi < 3\frac17\). Series include \(\frac\pi4 = 1 - \frac13 + \frac15 - \cdots\) (slow) and Machin's formula (fast). Irrational (Lambert, 1761) and transcendental (Lindemann, 1882).</p>
<h4>\(\varphi = \frac{1 + \sqrt5}{2} \approx 1.618\)</h4>
<p>The positive root of \(x^2 = x + 1\). So \(\varphi^2 = \varphi + 1\), \(\frac1\varphi = \varphi - 1\), and every power reduces to a linear expression: \(\varphi^n = F_n\varphi + F_{n-1}\), where \(F_n\) are the Fibonacci numbers \(1, 1, 2, 3, 5, 8, \ldots\). Ratios \(\frac{F_{n+1}}{F_n}\) converge to \(\varphi\), and \(\varphi = [1; 1, 1, 1, \ldots]\), the continued fraction with the slowest convergence: in that sense, the "most irrational" number.</p>
<p><b>Binet's formula:</b> \(F_n = \frac{\varphi^n - \psi^n}{\sqrt5}\) with \(\psi = \frac{1 - \sqrt5}{2}\).</p>`,
      ex: { q: T`Write \(\varphi^5\) as \(a\varphi + b\).`, a: T`<p>Multiply up from \(\varphi^2 = \varphi + 1\): \(\varphi^3 = \varphi^2 + \varphi = 2\varphi + 1\), \(\varphi^4 = 2\varphi^2 + \varphi = 3\varphi + 2\), \(\varphi^5 = 3\varphi^2 + 2\varphi = 5\varphi + 3\). Fibonacci coefficients, as predicted.</p>` },
      trap: T`Using \(\frac{22}{7}\) as the value of \(\pi\). It is an approximation, off in the third decimal place.`,
      vary: [[T`\(\varphi^2 - \varphi\)?`, 1, T`Defining equation.`], [T`\(\varphi^4 = a\varphi + b\). Find \(a\).`, 3, T`\(F_4 = 3\).`], [T`\(\frac{1}{\varphi}\) to three decimals.`, 0.618, T`\(\varphi - 1\).`], [T`\(\sum_{k=0}^{3}\frac{1}{k!}\), three decimals.`, 8 / 3, T`\(1 + 1 + \frac12 + \frac16\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>A number is <b>algebraic</b> if it solves a polynomial equation with integer coefficients, and <b>transcendental</b> otherwise. Every rational and every root like \(\sqrt[3]{5}\) is algebraic. \(e\) and \(\pi\) are transcendental, which is why circles cannot be squared with a compass and straightedge.</p>`,
      body: T`
<p><b>Minimal polynomial.</b> The lowest-degree monic polynomial with rational coefficients having \(\alpha\) as a root; its degree is the degree of \(\alpha\). Rationals have degree 1, \(\sqrt2\) degree 2, \(\sqrt[3]2\) degree 3, \(\sqrt2 + \sqrt3\) degree 4 (\(x^4 - 10x^2 + 1\)).</p>
<p><b>Building minimal polynomials.</b> Isolate a root and square. \(\alpha = a + \sqrt b\): \((x - a)^2 = b\), so \(x^2 - 2ax + a^2 - b\). For \(\alpha = \sqrt a + \sqrt b\) with \(\sqrt a\), \(\sqrt b\), \(\sqrt{ab}\) all irrational: \(x^4 - 2(a + b)x^2 + (a - b)^2\).</p>
<p><b>Closure.</b> Sums, products, and quotients of algebraic numbers are algebraic, and roots of polynomials with algebraic coefficients are algebraic.</p>
<p><b>Transcendental numbers.</b> Liouville (1844) built the first: \(\sum 10^{-n!} = 0.110001000\ldots\), approximated by rationals too well to be algebraic. Hermite proved \(e\) transcendental (1873), Lindemann \(\pi\) (1882). The Gelfond–Schneider theorem: \(a^b\) is transcendental for algebraic \(a \ne 0, 1\) and irrational algebraic \(b\), so \(2^{\sqrt2}\) is transcendental. Whether \(e + \pi\) is irrational is still unknown.</p>
<p><b>Most numbers are transcendental:</b> the algebraic numbers are countable (next unit) while the reals are not.</p>`,
      ex: { q: T`Find the minimal polynomial of \(1 + \sqrt3\).`, a: T`<p>\(x - 1 = \sqrt3\), so \((x - 1)^2 = 3\): \(x^2 - 2x - 2\). It is irreducible over \(\mathbb Q\) (its roots are irrational), so this is minimal; degree 2.</p>` },
      trap: T`Assuming every irrational is a root like \(\sqrt n\). Most irrationals are transcendental.`,
      vary: [[T`Degree of \(\sqrt[3]{7}\)?`, 3, T`\(x^3 - 7\) is irreducible.`], [T`Degree of \(\sqrt{16}\)?`, 1, T`It is 4.`], [T`Constant term of the minimal polynomial of \(\sqrt2 + \sqrt5\)?`, 9, T`\((2 - 5)^2\).`], [T`Constant term of the minimal polynomial of \(2 + \sqrt3\)?`, 1, T`\(x^2 - 4x + 1\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Two sets have the same size when their elements can be paired off exactly. With infinite sets this produces surprises: there are as many even numbers as integers, as many fractions as whole numbers, but strictly more real numbers than fractions.</p>`,
      body: T`
<p><b>Countable</b> means listable as a sequence \(a_1, a_2, \ldots\) (a bijection with \(\mathbb N\), or finite).</p>
<p><b>\(\mathbb Z\) is countable:</b> \(0, 1, -1, 2, -2, \ldots\). <b>\(\mathbb Q\) is countable:</b> arrange fractions \(\frac pq\) in a grid and sweep the diagonals \(p + q = 2, 3, 4, \ldots\), skipping repeats. <b>Countable unions</b> of countable sets are countable, so \(\mathbb Z\times\mathbb Z\), finite strings, and all polynomials with integer coefficients are countable. Each polynomial has finitely many roots, so the <b>algebraic numbers are countable</b>.</p>
<p><b>Cantor's diagonal argument: \((0, 1)\) is uncountable.</b> Given any list of decimals \(x_1, x_2, \ldots\), build \(y\) whose \(n\)th digit differs from the \(n\)th digit of \(x_n\) (use 5 or 6 to avoid \(0.\overline9\) issues). Then \(y\) differs from every \(x_n\), so no list contains all reals.</p>
<p><b>Consequences.</b> The irrationals and the transcendentals are uncountable: removing a countable set from an uncountable one leaves it uncountable. \((0, 1)\), \(\mathbb R\), and \(\mathbb R^2\) all have the same size. The power set of any set is strictly larger (Cantor), so there is no largest infinity.</p>`,
      ex: { q: T`Show the set of finite subsets of \(\mathbb N\) is countable but the set of all subsets is not.`, a: T`<p>Finite subsets: for each \(n\), the subsets of \(\{1, \ldots, n\}\) form a finite collection; the union over \(n\) is a countable union of finite sets.</p><p>All subsets: pair each subset with a binary sequence (1 where an element is present). A diagonal argument on binary sequences shows no list contains them all.</p>` },
      trap: T`Thinking density implies uncountability. The rationals are dense yet countable.`,
      vary: [[T`Subsets of a 10-element set?`, 1024, T`\(2^{10}\).`], [T`Is \(\mathbb Q\) countable? 1 yes, 0 no.`, 1, T`Diagonal sweep.`], [T`Are the irrationals countable? 1 yes, 0 no.`, 0, T`Otherwise \(\mathbb R\) would be a union of two countable sets.`], [T`Are the algebraic numbers countable? 1 yes, 0 no.`, 1, T`Countably many polynomials, finitely many roots each.`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>What separates \(\mathbb R\) from \(\mathbb Q\) is <b>completeness</b>: the rationals have holes where \(\sqrt2\) should be. The reals are built to fill every such hole, which is what makes calculus work.</p>`,
      body: T`
<p><b>Bounds.</b> \(M\) is an upper bound for \(S\) if \(s \le M\) for all \(s \in S\). The <b>supremum</b> \(\sup S\) is the least upper bound; the <b>infimum</b> \(\inf S\) the greatest lower bound. They need not belong to \(S\): \(\sup\{1 - \frac1n\} = 1\), never attained.</p>
<p><b>Completeness axiom.</b> Every nonempty set of reals that is bounded above has a supremum in \(\mathbb R\).</p>
<p><b>\(\mathbb Q\) fails it.</b> \(S = \{x \in \mathbb Q : x^2 < 2\}\) is bounded above, but its least upper bound would be \(\sqrt2\), not in \(\mathbb Q\). For any rational upper bound, a smaller rational upper bound exists.</p>
<p><b>Finding sup and inf.</b> Check the candidate is a bound, then show nothing smaller works: for any \(\varepsilon > 0\) some element exceeds \(\sup S - \varepsilon\).</p>
<table class="tt"><tr><th>Set</th><th>sup</th><th>inf</th></tr>
<tr><td>\(\{1 - \frac1n : n \ge 1\}\)</td><td>1 (not attained)</td><td>0</td></tr>
<tr><td>\(\{\frac{(-1)^n}{n}\}\)</td><td>\(\frac12\)</td><td>\(-1\)</td></tr>
<tr><td>\(\{\frac{n}{n+1}\}\)</td><td>1</td><td>\(\frac12\)</td></tr>
<tr><td>\(\{x : x^2 < 5\}\)</td><td>\(\sqrt5\)</td><td>\(-\sqrt5\)</td></tr></table>
<p><b>Constructions.</b> Reals can be built from rationals as Dedekind cuts (a real is the set of rationals below it) or as equivalence classes of Cauchy sequences of rationals. Both satisfy completeness, and any two complete ordered fields are the same up to relabeling.</p>`,
      ex: { q: T`Find \(\sup\) and \(\inf\) of \(S = \{\frac{2n + 1}{n} : n \ge 1\}\).`, a: T`<p>\(\frac{2n + 1}{n} = 2 + \frac1n\), decreasing in \(n\). Largest at \(n = 1\): 3, so \(\sup S = \max S = 3\).</p><p>The terms approach 2 from above and never reach it: \(\inf S = 2\), not attained. For any \(\varepsilon > 0\), choosing \(n > \frac1\varepsilon\) gives an element below \(2 + \varepsilon\).</p>` },
      trap: T`Assuming the supremum is the largest element. A set like \((0, 1)\) has supremum 1 but no largest element.`,
      vary: [[T`\(\sup\{1 - \frac1n\}\)?`, 1, T`Approached, never reached.`], [T`\(\inf\{1 - \frac1n : n \ge 1\}\)?`, 0, T`At \(n = 1\).`], [T`\(\sup\{\frac{(-1)^n}{n}\}\)?`, 0.5, T`At \(n = 2\).`], [T`\(\inf\{\frac{(-1)^n}{n}\}\)?`, -1, T`At \(n = 1\).`]] }
  ]);

  addQuestions('nums', [
    { id: 'nu1', skill: U[0], q: T`Which set is closed under division by nonzero elements?`, c: [T`\(\mathbb Q\)`, T`\(\mathbb Z\)`, T`\(\mathbb N\)`, 'the irrationals'], x: T`\(\frac{a/b}{c/d} = \frac{ad}{bc}\).` },
    { id: 'nu2', skill: U[1], q: T`\(0.\overline9\) equals:`, c: ['1', 'slightly less than 1', '0.9', 'undefined'], x: T`\(\frac99 = 1\); equivalently \(1 - 0.\overline9\) is smaller than every positive number.` },
    { id: 'nu3', skill: U[2], q: T`In the proof that \(\sqrt2\) is irrational, the contradiction is that:`, c: ['p and q are both even although the fraction was in lowest terms', 'p is negative', 'q is zero', '2 is not prime'], x: T`Both being even contradicts lowest terms.` },
    { id: 'nu4', skill: U[3], q: T`The sum of two irrational numbers is:`, c: ['sometimes rational, sometimes irrational', 'always irrational', 'always rational', 'always transcendental'], x: T`\(\sqrt2 + \sqrt3\) is irrational; \(\sqrt2 + (-\sqrt2) = 0\).` },
    { id: 'nu5', skill: U[6], q: T`A real number has a finite continued fraction exactly when it is:`, c: ['rational', 'algebraic', 'a square root', 'positive'], x: T`The algorithm is Euclid's, which ends only for ratios of integers.` },
    { id: 'nu6', skill: U[7], q: T`Which is the continued fraction of the golden ratio?`, c: [T`\([1; 1, 1, 1, \ldots]\)`, T`\([1; 2, 2, 2, \ldots]\)`, T`\([2; 1, 2, 1, \ldots]\)`, T`\([1; 6]\)`], x: T`\(\varphi = 1 + \frac1\varphi\).` },
    { id: 'nu7', skill: U[8], q: T`Which number is known to be transcendental?`, c: [T`\(\pi\)`, T`\(\sqrt[5]{7}\)`, T`\(\sqrt2 + \sqrt3\)`, T`\(\frac{22}{7}\)`], x: T`Lindemann, 1882. The others are algebraic.` },
    { id: 'nu8', skill: U[9], q: T`Which set is uncountable?`, c: ['the real numbers in [0, 1]', 'the rationals', 'the algebraic numbers', 'all finite binary strings'], x: T`Cantor's diagonal argument.` },
    { id: 'nu9', skill: U[10], q: T`Which property distinguishes \(\mathbb R\) from \(\mathbb Q\)?`, c: ['every bounded nonempty set has a least upper bound', 'closure under addition', 'density', 'being an ordered field'], x: T`Completeness. \(\mathbb Q\) is a dense ordered field but has holes.` }
  ]);

  // ======================= GENERATORS =======================
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const sqf = n => { let a = 1, b = n; for (let k = 2; k * k <= b; k++) while (b % (k * k) === 0) { b /= k * k; a *= k; } return [a, b]; };
  // Numbers to classify: [TeX, sympy expression, answer].
  const CLS = [['\\sqrt{16}', 'sqrt(16)'], ['-\\frac{12}{4}', '-Rational(12, 4)'], ['\\frac{7}{3}', 'Rational(7, 3)'], ['\\sqrt{12}', 'sqrt(12)'], ['\\sqrt{-9}', 'sqrt(-9)'], ['0.\\overline{6}', 'Rational(2, 3)'], ['\\pi', 'pi'], ['\\sqrt{50}/\\sqrt{2}', 'sqrt(50)/sqrt(2)'], ['\\sqrt{0.09}', 'sqrt(Rational(9, 100))'], ['\\sqrt{0.9}', 'sqrt(Rational(9, 10))'], ['-\\sqrt{25}', '-sqrt(25)'], ['1 + \\sqrt{-4}', '1 + sqrt(-4)'], ['e^0', 'exp(0)'], ['\\log_2 8', 'log(8, 2)'], ['\\log_2 5', 'log(5, 2)'], ['(\\sqrt3)^2', 'sqrt(3)**2'], ['\\sqrt{8}\\cdot\\sqrt{2}', 'sqrt(8)*sqrt(2)'], ['\\frac{\\sqrt{18}}{3}', 'sqrt(18)/3'], ['i^2', 'I**2'], ['\\sqrt[3]{-8}', '-2']];
  const SETS = ['\\(\\mathbb N\\)', '\\(\\mathbb Z\\)', '\\(\\mathbb Q\\)', '\\(\\mathbb R\\)', '\\(\\mathbb C\\)'], KEY = ['N', 'Z', 'Q', 'R', 'C'];
  const clsJS = { 'sqrt(16)': 0, '-Rational(12, 4)': 1, 'Rational(7, 3)': 2, 'sqrt(12)': 3, 'sqrt(-9)': 4, 'Rational(2, 3)': 2, 'pi': 3, 'sqrt(50)/sqrt(2)': 0, 'sqrt(Rational(9, 100))': 2, 'sqrt(Rational(9, 10))': 3, '-sqrt(25)': 1, '1 + sqrt(-4)': 4, 'exp(0)': 0, 'log(8, 2)': 0, 'log(5, 2)': 3, 'sqrt(3)**2': 0, 'sqrt(8)*sqrt(2)': 0, 'sqrt(18)/3': 3, 'I**2': 1, '-2': 1 };
  // Expressions for "is it rational?": [TeX, sympy].
  const RAT = [['(2 + \\sqrt3)(2 - \\sqrt3)', '(2 + sqrt(3))*(2 - sqrt(3))'], ['(\\sqrt2 + \\sqrt3)^2', '(sqrt(2) + sqrt(3))**2'], ['\\sqrt{12} - 2\\sqrt3', 'sqrt(12) - 2*sqrt(3)'], ['\\sqrt2 + \\sqrt8', 'sqrt(2) + sqrt(8)'], ['\\sqrt3\\cdot\\sqrt{12}', 'sqrt(3)*sqrt(12)'], ['(\\sqrt5)^4', 'sqrt(5)**4'], ['\\sqrt2 + \\sqrt3', 'sqrt(2) + sqrt(3)'], ['\\frac{\\sqrt{18}}{\\sqrt2}', 'sqrt(18)/sqrt(2)'], ['\\frac{\\sqrt6}{\\sqrt3}', 'sqrt(6)/sqrt(3)'], ['(1 + \\sqrt2)^2 - 2\\sqrt2', '(1 + sqrt(2))**2 - 2*sqrt(2)'], ['\\sqrt{2}\\cdot\\sqrt{3}', 'sqrt(2)*sqrt(3)'], ['(3 + \\sqrt7)(3 - \\sqrt7)', '(3 + sqrt(7))*(3 - sqrt(7))'], ['\\sqrt{27}/\\sqrt{3}', 'sqrt(27)/sqrt(3)'], ['\\sqrt5 - \\sqrt{20}', 'sqrt(5) - sqrt(20)'], ['(\\sqrt2 - 1)(\\sqrt2 + 1)', '(sqrt(2) - 1)*(sqrt(2) + 1)'], ['\\sqrt{2}^{\\,6}', 'sqrt(2)**6'], ['\\sqrt{45} - \\sqrt{20}', 'sqrt(45) - sqrt(20)']];
  const ratJS = { '(2 + sqrt(3))*(2 - sqrt(3))': 1, '(sqrt(2) + sqrt(3))**2': 0, 'sqrt(12) - 2*sqrt(3)': 1, 'sqrt(2) + sqrt(8)': 0, 'sqrt(3)*sqrt(12)': 1, 'sqrt(5)**4': 1, 'sqrt(2) + sqrt(3)': 0, 'sqrt(18)/sqrt(2)': 1, 'sqrt(6)/sqrt(3)': 0, '(1 + sqrt(2))**2 - 2*sqrt(2)': 1, 'sqrt(2)*sqrt(3)': 0, '(3 + sqrt(7))*(3 - sqrt(7))': 1, 'sqrt(27)/sqrt(3)': 1, 'sqrt(5) - sqrt(20)': 0, '(sqrt(2) - 1)*(sqrt(2) + 1)': 1, 'sqrt(2)**6': 1, 'sqrt(45) - sqrt(20)': 0 };
  const cf = (p, q) => { const a = []; while (q) { a.push(Math.floor(p / q)); [p, q] = [q, p % q]; } return a; };
  const fib = n => { let a = 0, b = 1; for (let i = 0; i < n; i++) [a, b] = [b, a + b]; return a; };

  registerUnitGens('nums', { units: {
    [U[0]]: [{ id: 'nn-cls', make(R) {
      const [tex, py] = R.pick(CLS), k = clsJS[py];
      return { q: T`What is the smallest of \(\mathbb N \subset \mathbb Z \subset \mathbb Q \subset \mathbb R \subset \mathbb C\) that contains \(${tex}\)?`, c: [SETS[k], ...SETS.filter((_, i) => i !== k).slice(0, 3)],
        x: T`Simplify first, then place it in the smallest set that contains it.`, key: KEY[k], vk: `numset(${py})` };
    } }],
    [U[1]]: [
      { id: 'nd-term', make(R) {
        let p, q; do { q = R.pick([6, 8, 12, 15, 16, 20, 21, 24, 25, 28, 30, 32, 40, 45, 48, 50, 60, 64, 75, 80, 125]); p = R.int(1, q - 1); } while (gcd(p, q) !== 1 && R.int(0, 3));
        const g = gcd(p, q), qq = q / g; let r = qq; while (r % 2 === 0) r /= 2; while (r % 5 === 0) r /= 5; const term = r === 1;
        return { q: T`Does the decimal for \(\frac{${p}}{${q}}\) terminate?`, c: term ? ['Yes', 'No'] : ['No', 'Yes'], x: T`${g > 1 ? T`Reduce first: \(\frac{${p}}{${q}} = \frac{${p / g}}{${qq}}\). ` : ''}${term ? `The denominator ${qq} has only the prime factors 2 and 5, so it terminates.` : `The denominator ${qq} has a prime factor other than 2 and 5, so the decimal repeats.`}`, key: term ? 'Yes' : 'No', vk: `'Yes' if set(factorint(Rational(${p}, ${q}).q)) <= {2, 5} else 'No'` };
      } },
      { id: 'nd-period', make(R) {
        const q = R.pick([3, 7, 9, 11, 13, 27, 33, 37, 41, 21, 17, 19]); let k = 1, r = 10 % q; while (r !== 1) { r = (r * 10) % q; k++; }
        return { q: T`What is the length of the repeating block in the decimal for \(\frac{1}{${q}}\)?`, answer: k, x: T`The period is the smallest \(k\) with \(10^k \equiv 1 \pmod{${q}}\): \(k = ${k}\).`, v: `n_order(10, ${q})` };
      } },
      { id: 'nd-frac', make(R) {
        if (R.int(0, 1)) { const d = R.int(1, 98), g = gcd(d, 99);
          return { q: T`Write \(0.\overline{${String(d).padStart(2, '0')}}\) as a fraction in lowest terms. (Enter it as a fraction such as 3/11.)`, answer: d / 99, tol: 1e-9, x: T`\(100x - x = ${d}\), so \(x = \frac{${d}}{99}${g > 1 ? ` = \\frac{${d / g}}{${99 / g}}` : ''}\).`, v: `Rational(${d}, 99)` }; }
        const a = R.int(0, 9), b = R.int(1, 8); if (a === b) return this.make(R);
        const num = 10 * a + b - a, g = gcd(num, 90);
        return { q: T`Write \(0.${a}\overline{${b}}\) as a fraction in lowest terms. (Enter it as a fraction such as 3/11.)`, answer: num / 90, tol: 1e-9, x: T`\(100x - 10x = ${10 * a + b}.\overline{${b}} - ${a}.\overline{${b}} = ${num}\), so \(x = \frac{${num}}{90}${g > 1 ? ` = \\frac{${num / g}}{${90 / g}}` : ''}\).`, v: `Rational(${a}, 10) + Rational(${b}, 90)` };
      } }
    ],
    [U[2]]: [
      { id: 'ni-sqrt', make(R) {
        const n = R.int(0, 2) === 0 ? R.int(2, 15) ** 2 * R.pick([1, 1, 4, 9]) : R.int(2, 200), sq = Number.isInteger(Math.sqrt(n)), ans = sq ? 'Rational' : 'Irrational';
        return { q: T`Is \(\sqrt{${n}}\) rational or irrational?`, c: [ans, sq ? 'Irrational' : 'Rational'], x: sq ? T`\(${n} = ${Math.sqrt(n)}^2\), so \(\sqrt{${n}} = ${Math.sqrt(n)}\).` : T`${n} is not a perfect square, so \(\sqrt{${n}}\) is irrational: an integer's square root is either an integer or irrational.`, key: ans, vk: `'Rational' if sqrt(${n}).is_rational else 'Irrational'` };
      } },
      { id: 'ni-rrt', make(R) {
        const n = R.pick([2, 3, 5, 6, 7, 10, 12, 15, 18, 20, 30]), k = R.pick([2, 3]);
        const cnt = (m => { let c = 0; for (let d = 1; d <= m; d++) if (m % d === 0) c++; return c; })(n);
        return { q: T`The rational root theorem lists the possible rational roots of \(x^{${k}} - ${n} = 0\). How many candidates are there (counting signs)?`, answer: 2 * cnt, x: T`Candidates are \(\pm\) the divisors of ${n} over \(\pm\) the divisors of 1: \(2\times${cnt} = ${2 * cnt}\). None works unless ${n} is a perfect ${k === 2 ? 'square' : 'cube'}.`, v: `2*divisor_count(${n})` };
      } }
    ],
    [U[3]]: [{ id: 'na-rat', make(R) {
      const [tex, py] = R.pick(RAT), r = ratJS[py], ans = r ? 'Rational' : 'Irrational';
      return { q: T`Is \(${tex}\) rational or irrational?`, c: [ans, r ? 'Irrational' : 'Rational'], x: T`Expand and simplify before judging. ${r ? 'Everything irrational cancels.' : 'An irrational part survives.'}`, key: ans, vk: `'Rational' if israt(${py}) else 'Irrational'` };
    } }],
    [U[4]]: [
      { id: 'ns-simp', make(R) {
        const a = R.int(2, 12), b = R.pick([2, 3, 5, 6, 7, 10, 11]), n = a * a * b;
        return { q: T`Write \(\sqrt{${n}}\) as \(a\sqrt{b}\) with \(b\) square-free. Find \(a\).`, answer: a, x: T`\(${n} = ${a * a}\cdot${b}\), so \(\sqrt{${n}} = ${a}\sqrt{${b}}\).`, v: `(lambda e: e.as_coeff_Mul()[0])(sqrt(${n}))` };
      } },
      { id: 'ns-rat', make(R) {
        let a, b; do { a = R.int(2, 15); b = R.int(1, a - 1); } while (Number.isInteger(Math.sqrt(a)) || Number.isInteger(Math.sqrt(b)) && b !== 1);
        const c = R.int(1, 5), k = c * (a - b);
        return { q: T`Write \(\dfrac{${k}}{\sqrt{${a}} - ${b === 1 ? '1' : `\\sqrt{${b}}`}}\) as \(c\left(\sqrt{${a}} + ${b === 1 ? '1' : `\\sqrt{${b}}`}\right)\). Find \(c\).`, answer: c, x: T`Multiply top and bottom by the conjugate: the denominator becomes \(${a} - ${b} = ${a - b}\), so \(c = \frac{${k}}{${a - b}} = ${c}\).`, v: `simplify(${k}/(sqrt(${a}) - sqrt(${b}))/(sqrt(${a}) + sqrt(${b})))` };
      } },
      { id: 'ns-denest', make(R) {
        let x, y; do { x = R.int(2, 12); y = R.int(1, x - 1); } while (Number.isInteger(Math.sqrt(x * y)));
        return { q: T`\(\sqrt{${x + y} + 2\sqrt{${x * y}}} = \sqrt x + \sqrt y\) with \(x > y\). Find \(x\).`, answer: x, x: T`Need \(x + y = ${x + y}\) and \(xy = ${x * y}\): \(x = ${x}\), \(y = ${y}\). Check: \((\sqrt{${x}} + \sqrt{${y}})^2 = ${x + y} + 2\sqrt{${x * y}}\).`, v: `max(solve(Symbol('z')**2 - ${x + y}*Symbol('z') + ${x * y}))` };
      } },
      { id: 'ns-cmp', make(R) {
        const S = R.int(8, 20); let a, b, c, d; do { a = R.int(1, S - 1); b = S - a; c = R.int(1, S - 1); d = S - c; } while (a * b === c * d || [a, b, c, d].some(v => Number.isInteger(Math.sqrt(v))));
        const first = a * b > c * d, A = T`\(\sqrt{${a}} + \sqrt{${b}}\)`, B = T`\(\sqrt{${c}} + \sqrt{${d}}\)`;
        return { q: T`Which is larger: \(\sqrt{${a}} + \sqrt{${b}}\) or \(\sqrt{${c}} + \sqrt{${d}}\)?`, c: [first ? A : B, first ? B : A], x: T`Square both: \(${S} + 2\sqrt{${a * b}}\) and \(${S} + 2\sqrt{${c * d}}\). The larger product wins.`, key: first ? 'first' : 'second', vk: `'first' if sqrt(${a}) + sqrt(${b}) > sqrt(${c}) + sqrt(${d}) else 'second'` };
      } }
    ],
    [U[5]]: [{ id: 'nden', make(R) {
      if (R.int(0, 1)) { const a = R.int(2, 9), b = a + R.int(1, 4); return { q: T`How many integers \(n\) satisfy \(${a} < \sqrt n < ${b}\)?`, answer: b * b - a * a - 1, x: T`Square: \(${a * a} < n < ${b * b}\), so \(${b * b} - ${a * a} - 1 = ${b * b - a * a - 1}\).`, v: `sum(1 for n in range(0, 500) if ${a} < sqrt(n) < ${b})` }; }
      const n = R.int(5, 400), lo = Math.floor(Math.sqrt(n)); if (lo * lo === n) return this.make(R);
      return { q: T`\(\sqrt{${n}}\) lies between two consecutive integers. Enter the smaller.`, answer: lo, x: T`\(${lo * lo} < ${n} < ${(lo + 1) ** 2}\).`, v: `floor(sqrt(${n}))` };
    } }],
    [U[6]]: [
      { id: 'ncf-rat', make(R) {
        let p, q, a; do { q = R.int(5, 40); p = R.int(q + 1, 4 * q); a = cf(p, q); } while (gcd(p, q) !== 1 || a.length < 3 || a.length > 5);
        const k = R.int(1, a.length - 1);
        return { q: T`The continued fraction of \(\frac{${p}}{${q}}\) is \([a_0; a_1, a_2, \ldots]\). Find \(a_{${k}}\).`, answer: a[k], x: T`Euclid's algorithm gives \([${a[0]}; ${a.slice(1).join(', ')}]\), so \(a_{${k}} = ${a[k]}\).`, v: `continued_fraction_periodic(${p}, ${q})[${k}]` };
      } },
      { id: 'ncf-conv', make(R) {
        const a = [R.int(0, 3), R.int(1, 5), R.int(1, 5), R.int(1, 5)].slice(0, R.int(3, 4));
        let p0 = 1, q0 = 0, p1 = a[0], q1 = 1; for (let i = 1; i < a.length; i++) { [p0, p1] = [p1, a[i] * p1 + p0]; [q0, q1] = [q1, a[i] * q1 + q0]; }
        return { q: T`Evaluate the continued fraction \([${a[0]}; ${a.slice(1).join(', ')}]\) as a fraction.`, answer: p1 / q1, tol: 1e-9, x: T`Work from the inside out, or use the recurrence \(p_k = a_kp_{k-1} + p_{k-2}\), \(q_k = a_kq_{k-1} + q_{k-2}\): \(\frac{${p1}}{${q1}}\).`, v: `continued_fraction_reduce([${a.join(', ')}])` };
      } },
      { id: 'ncf-root', make(R) {
        const n = R.pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23]), a0 = Math.floor(Math.sqrt(n));
        let m = 0, d = 1, a = a0; const per = []; do { m = d * a - m; d = (n - m * m) / d; a = Math.floor((a0 + m) / d); per.push(a); } while (a !== 2 * a0);
        const ask = R.int(0, 1);
        return { q: ask ? T`The continued fraction of \(\sqrt{${n}}\) is \([a_0; \overline{a_1, \ldots, a_k}]\). What is the period length \(k\)?` : T`The continued fraction of \(\sqrt{${n}}\) is \([a_0; a_1, \ldots]\). Find \(a_1\).`, answer: ask ? per.length : per[0],
          x: T`\(\sqrt{${n}} = [${a0}; \overline{${per.join(', ')}}]\). The period always ends with \(2a_0 = ${2 * a0}\).`, v: ask ? `len(continued_fraction_periodic(0, 1, ${n})[1])` : `continued_fraction_periodic(0, 1, ${n})[1][0]` };
      } }
    ],
    [U[7]]: [
      { id: 'nphi', make(R) {
        const n = R.int(3, 12), ask = R.int(0, 1);
        return { q: T`Write \(\varphi^{${n}}\) as \(a\varphi + b\) with integers \(a, b\). Find ${ask ? '\\(b\\)' : '\\(a\\)'}.`, answer: ask ? fib(n - 1) : fib(n), x: T`\(\varphi^n = F_n\varphi + F_{n-1}\), so \(\varphi^{${n}} = ${fib(n)}\varphi + ${fib(n - 1)}\).`, v: `(lambda e: e.coeff(sqrt(5))*2 if ${ask} == 0 else e.subs(sqrt(5), 0) - e.coeff(sqrt(5)))(expand(((1 + sqrt(5))/2)**${n}))` };
      } },
      { id: 'ne-sum', make(R) {
        const n = R.int(2, 8); let s = 0, f = 1; for (let k = 0; k <= n; k++) { if (k) f *= k; s += 1 / f; }
        return { q: T`Compute \(\sum_{k=0}^{${n}}\frac{1}{k!}\) to four decimals, a partial sum for \(e\).`, answer: s, tol: 0.0001, x: T`The sum is \(\approx ${R.fmt(s, 5)}\); the remaining error is less than \(\frac{1}{${n}!\cdot${n}}\).`, v: `sum(Rational(1, factorial(k)) for k in range(${n + 1}))` };
      } }
    ],
    [U[8]]: [{ id: 'nalg', make(R) {
      if (R.int(0, 1)) { let a, b; do { a = R.int(2, 11); b = R.int(a + 1, 15); } while ([a, b, a * b].some(v => Number.isInteger(Math.sqrt(v))));
        return { q: T`Find the constant term of the minimal polynomial of \(\sqrt{${a}} + \sqrt{${b}}\).`, answer: (a - b) ** 2, x: T`\(x^4 - 2(${a} + ${b})x^2 + (${a} - ${b})^2\): constant term ${(a - b) ** 2}.`, v: `Poly(minimal_polynomial(sqrt(${a}) + sqrt(${b}), Symbol('m'))).all_coeffs()[-1]` }; }
      const a = R.int(-5, 5), b = R.pick([2, 3, 5, 6, 7, 10]);
      return { q: T`Find the constant term of the minimal polynomial of \(${a ? a + ' + ' : ''}\sqrt{${b}}\).`, answer: a * a - b, x: a ? T`\(x ${a > 0 ? '-' : '+'} ${Math.abs(a)} = \sqrt{${b}}\), so \((x ${a > 0 ? '-' : '+'} ${Math.abs(a)})^2 = ${b}\) and \(x^2 ${a > 0 ? '-' : '+'} ${2 * Math.abs(a)}x ${a * a - b < 0 ? '-' : '+'} ${Math.abs(a * a - b)} = 0\). Constant term ${a * a - b}.` : T`\(x^2 - ${b} = 0\): constant term \(-${b}\).`, v: `Poly(minimal_polynomial(${a} + sqrt(${b}), Symbol('m'))).all_coeffs()[-1]` };
    } }],
    [U[9]]: [{ id: 'ncount', make(R) {
      const items = [['the even integers', 'Countable'], ['the rational numbers', 'Countable'], ['all pairs of integers', 'Countable'], ['the algebraic numbers', 'Countable'], ['finite subsets of the natural numbers', 'Countable'], ['finite strings over a 26-letter alphabet', 'Countable'], ['the real numbers in [0, 1]', 'Uncountable'], ['the irrational numbers', 'Uncountable'], ['the transcendental numbers', 'Uncountable'], ['all subsets of the natural numbers', 'Uncountable'], ['all infinite binary sequences', 'Uncountable'], ['points in the plane', 'Uncountable'], ['polynomials with integer coefficients', 'Countable'], ['the prime numbers', 'Countable']];
      const [s, a] = R.pick(items);
      return { q: T`Is the set of ${s} countable or uncountable?`, c: [a, a === 'Countable' ? 'Uncountable' : 'Countable'], x: a === 'Countable' ? 'It can be listed as a sequence: a countable union of finite or countable pieces.' : 'A diagonal argument, or containing an uncountable set, shows it cannot be listed.', key: a, vk: `'${a}'` };
    } }],
    [U[10]]: [{ id: 'nsup', make(R) {
      const k = R.int(0, 3), a = R.int(-3, 5), b = R.int(1, 6), ask = R.int(0, 1);
      if (k === 0) return { q: T`Find the ${ask ? 'infimum' : 'supremum'} of \(\{${a} - \frac{${b}}{n} : n = 1, 2, 3, \ldots\}\).`, answer: ask ? a - b : a, tol: 1e-6, x: T`The terms increase from \(${a - b}\) (at \(n = 1\)) toward ${a}, never reaching it: sup ${a} (not attained), inf ${a - b}.`, v: ask ? `min(${a} - Rational(${b}, n) for n in range(1, 3000))` : `limit(${a} - Rational(${b})/x, x, oo)` };
      if (k === 1) { const c = R.pick([2, 3, 5, 6, 7, 10]); return { q: T`Find the ${ask ? 'infimum' : 'supremum'} of \(\{x \in \mathbb R : x^2 < ${c}\}\), to three decimals.`, answer: (ask ? -1 : 1) * Math.sqrt(c), tol: 0.001, x: T`The set is \((-\sqrt{${c}}, \sqrt{${c}})\).`, v: `${ask ? '-' : ''}sqrt(${c})` }; }
      if (k === 2) return { q: T`Find the ${ask ? 'infimum' : 'supremum'} of \(\{\frac{(-1)^n}{n} : n \ge 1\}\).`, answer: ask ? -1 : 0.5, tol: 1e-6, x: T`Positive terms \(\frac12, \frac14, \ldots\) peak at \(n = 2\); negative terms \(-1, -\frac13, \ldots\) bottom out at \(n = 1\).`, v: ask ? `min(Rational((-1)**n, n) for n in range(1, 3000))` : `max(Rational((-1)**n, n) for n in range(1, 3000))` };
      return { q: T`Find the ${ask ? 'infimum' : 'supremum'} of \(\{\frac{${b}n}{n + 1} : n \ge 1\}\).`, answer: ask ? b / 2 : b, tol: 1e-6, x: T`\(\frac{${b}n}{n+1} = ${b} - \frac{${b}}{n + 1}\) increases from \(\frac{${b}}{2}\) toward ${b}.`, v: ask ? `min(Rational(${b}*n, n + 1) for n in range(1, 3000))` : `limit(${b}*x/(x + 1), x, oo)` };
    } }]
  } });
})();
