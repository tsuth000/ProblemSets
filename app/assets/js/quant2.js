'use strict';
// Version 1.7: harder quant aptitude material. Three new units (number puzzles, counting, risk and position sizing),
// harder word problems and Bayes, and the material behind a harder simulation mode. Every generator is checked
// independently (v: SymPy/Python expression; vk: Python expression equal to key).
(() => {
  const SID = 'quant', S = window.SUBJECTS.find(s => s.id === SID), card = t => S.learn.find(c => c.title === t);
  const more = (t, o) => { const c = card(t); if (!c) { window.LESSON_MISSES.push('quant: ' + t); return; }
    if (o.more) c.more = (c.more || '') + o.more; if (o.exs) c.exs = (c.exs || []).concat(o.exs); if (o.vary) c.vary = (c.vary || []).concat(o.vary); };
  const an = n => (/^(8|11|18)/.test(String(n)) ? 'an' : 'a');
  const near = (a, ds) => [...new Set(ds.map(x => +(+x).toFixed(4)))].filter(x => x !== a && Number.isFinite(x)).slice(0, 4);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a), lcm = (a, b) => a / gcd(a, b) * b;
  const ndiv = n => { let c = 0; for (let d = 1; d <= n; d++) if (n % d === 0) c++; return c; };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1)), C = (n, k) => (k < 0 || k > n ? 0 : Math.round(fact(n) / (fact(k) * fact(n - k))));

  // ======================= NEW UNITS =======================
  insertCard(SID, 'Number series', { title: 'Number puzzles', skill: 'Number puzzles',
    hook: T`
<p>Many hard aptitude questions are number theory in disguise: students clapping, lockers opening, lights blinking together. Translate the story into divisors, multiples, or remainders, and the arithmetic becomes short.</p>
<p>The classic: 30 students stand in a line. Student 1 claps for every student, student 2 for every second student, student 3 for every third, and so on. Student \(d\) claps for the multiples of \(d\), so the students clapping for student \(n\) are exactly the divisors of \(n\).</p>`,
    body: T`
<h4>Divisors come in pairs</h4>
<p>Each divisor \(d\) of \(n\) pairs with \(\frac nd\): for 12, the pairs are \(1\times12\), \(2\times6\), \(3\times4\), so 12 has 6 divisors. The count is odd only when some divisor pairs with itself, \(d = \frac nd\), which happens exactly when \(n\) is a perfect square: 16 has \(1\times16\), \(2\times8\), \(4\times4\), five divisors.</p>
<p>So in the clapping line, the students who hear an odd number of claps are the perfect squares: for 30 students, 1, 4, 9, 16, 25, which is 5. The same answer gives the lockers left open when each student toggles every \(d\)th locker. Up to \(N\), there are \(\lfloor\sqrt N\rfloor\) perfect squares.</p>
<p>A student who hears exactly 2 claps has exactly two divisors, 1 and itself: a prime.</p>
<h4>Counting divisors fast</h4>
<p>Factor into primes, add 1 to each exponent, and multiply: \(360 = 2^3\cdot3^2\cdot5\) has \((3+1)(2+1)(1+1) = 24\) divisors. Each divisor picks how many 2s (0 to 3), 3s (0 to 2), and 5s (0 or 1) to use.</p>
<h4>Counting multiples</h4>
<p>From 1 to \(N\), \(\lfloor N/k\rfloor\) numbers are multiples of \(k\). For "multiple of \(a\) or \(b\)," add and remove the overlap, which is the multiples of \(\operatorname{lcm}(a, b)\):</p>
\[\#(a \text{ or } b) = \left\lfloor\tfrac Na\right\rfloor + \left\lfloor\tfrac Nb\right\rfloor - \left\lfloor\tfrac{N}{\operatorname{lcm}(a,b)}\right\rfloor\]
<p>From 1 to 100, multiples of 3 or 5: \(33 + 20 - 6 = 47\). Neither: \(100 - 47 = 53\).</p>
<h4>Together again: lcm</h4>
<p>Lights blinking every 12 and 18 seconds, together at time 0, next blink together at \(\operatorname{lcm}(12, 18) = 36\) seconds. Find the lcm from prime factors: \(12 = 2^2\cdot3\), \(18 = 2\cdot3^2\), take the higher power of each: \(2^2\cdot3^2 = 36\). Equivalently, \(\operatorname{lcm}(a,b) = \frac{ab}{\gcd(a,b)}\).</p>
<h4>Last digits cycle</h4>
<p>Only the last digit of the base matters, and powers cycle with length at most 4: \(7, 9, 3, 1, 7, \ldots\). Divide the exponent by the cycle length; the remainder picks the position (remainder 0 means the last position). \(7^{2026}\): \(2026 = 4\cdot506 + 2\), the second entry, 9.</p>
<table class="tt"><tr><th>Last digit</th><th>Cycle</th></tr>
<tr><td>2</td><td>2, 4, 8, 6</td></tr><tr><td>3</td><td>3, 9, 7, 1</td></tr><tr><td>4</td><td>4, 6</td></tr><tr><td>7</td><td>7, 9, 3, 1</td></tr><tr><td>8</td><td>8, 4, 2, 6</td></tr><tr><td>9</td><td>9, 1</td></tr><tr><td>0, 1, 5, 6</td><td>never change</td></tr></table>
<h4>Remainders from digits</h4>
<p>A number leaves the same remainder on division by 9 (or by 3) as the sum of its digits. 4,812,375 has digit sum 30, and \(30 = 3\cdot9 + 3\), so the remainder mod 9 is 3. It is divisible by 3, since 30 is.</p>`,
    ex: { q: T`40 lockers start closed. Student 1 opens every locker, student 2 toggles every 2nd locker, student 3 every 3rd, and so on through student 40. How many lockers are open at the end?`, a: T`
<p>Locker \(n\) is toggled once for each divisor of \(n\). It ends open when it was toggled an odd number of times, which means \(n\) has an odd number of divisors.</p>
<p>That happens exactly for perfect squares, since divisors pair up as \(d\) and \(\frac nd\) except when \(d = \frac nd\).</p>
<p>Squares up to 40: 1, 4, 9, 16, 25, 36. Six lockers.</p>` },
    exs: [
      { q: T`How many integers from 1 to 200 are divisible by 4 or 6?`, a: T`<p>Multiples of 4: 50. Multiples of 6: 33. Both means multiples of \(\operatorname{lcm}(4, 6) = 12\): 16. Total \(50 + 33 - 16 = 67\).</p><p>The trap is using \(4\times6 = 24\) for the overlap; 12 is already a multiple of both.</p>` },
      { q: T`How many divisors does 72 have?`, a: T`<p>\(72 = 2^3\cdot3^2\). Exponents plus one: \(4\times3 = 12\) divisors.</p>` }
    ],
    trap: T`Using \(a\times b\) instead of \(\operatorname{lcm}(a,b)\) for the overlap when \(a\) and \(b\) share a factor.`,
    vary: [[T`In the clapping line with 30 students, how many claps does student 12 hear?`, 6, T`Divisors of 12: 1, 2, 3, 4, 6, 12.`], [T`How many claps does student 16 hear?`, 5, T`1, 2, 4, 8, 16: a perfect square, so an odd count.`], [T`With 30 students, how many hear an odd number of claps?`, 5, T`Squares up to 30.`], [T`With 50 students?`, 7, T`\(\lfloor\sqrt{50}\rfloor = 7\).`], [T`Last digit of \(3^{10}\)?`, 9, T`Cycle 3, 9, 7, 1; \(10 = 8 + 2\).`]] });

  insertCard(SID, 'Logic and ordering', { title: 'Counting and arrangements', skill: 'Counting and arrangements',
    hook: T`<p>Counting questions ask "how many ways." Build the count in stages and multiply, then fix any double counting by dividing or subtracting.</p>`,
    body: T`
<table class="tt"><tr><th>Situation</th><th>Count</th><th>Example</th></tr>
<tr><td>order \(n\) different items</td><td>\(n!\)</td><td>5 people in a row: 120</td></tr>
<tr><td>choose \(k\) of \(n\), order ignored</td><td>\(\binom nk = \frac{n!}{k!(n-k)!}\)</td><td>3 of 9: 84</td></tr>
<tr><td>letters with repeats</td><td>\(\frac{n!}{a!\,b!\cdots}\)</td><td>BANANA: \(\frac{6!}{3!\,2!} = 60\)</td></tr>
<tr><td>around a round table</td><td>\((n-1)!\)</td><td>6 people: 120</td></tr>
<tr><td>pairs among \(n\) (handshakes, games)</td><td>\(\binom n2\)</td><td>10 teams, each plays each once: 45</td></tr>
<tr><td>grid paths, \(m\) right and \(n\) up</td><td>\(\binom{m+n}{m}\)</td><td>4 right, 3 up: 35</td></tr></table>
<p><b>Repeated letters.</b> Swapping two identical letters gives the same word, so divide by the orderings of each repeated letter.</p>
<p><b>Must sit together:</b> glue the two into one block, arrange \(n - 1\) units, then order the pair inside: \(2(n-1)!\). <b>Must not sit together:</b> total minus together, \(n! - 2(n-1)!\).</p>
<p><b>At least one:</b> count everything, subtract the selections with none. Committees of 3 from 5 men and 4 women with at least one woman: \(\binom93 - \binom53 = 84 - 10 = 74\).</p>
<p><b>Overlapping groups.</b> \(|A \cup B| = |A| + |B| - |A \cap B|\). Of 50 people, 30 like A, 25 like B, 12 like both: \(30 + 25 - 12 = 43\) like at least one, so 7 like neither.</p>
<p><b>Polygon diagonals:</b> each vertex connects to \(n - 3\) others by a diagonal, and each diagonal has two ends: \(\frac{n(n-3)}{2}\).</p>`,
    ex: { q: T`In how many ways can 6 people sit in a row if two of them insist on sitting together? If two refuse to sit together?`, a: T`<p>Together: treat the pair as one block, giving 5 units: \(5! = 120\) orders, times 2 for the order inside the block: 240.</p><p>Apart: all orders minus together: \(720 - 240 = 480\).</p>` },
    exs: [{ q: T`How many distinct arrangements does the word LEVEL have?`, a: T`<p>5 letters with L twice and E twice: \(\frac{5!}{2!\,2!} = \frac{120}{4} = 30\).</p>` }],
    trap: T`Counting committees with \(n!\)-style ordering. A committee has no order; use \(\binom nk\).`,
    vary: [[T`Arrangements of the letters in TRADE.`, 120, T`Five different letters: \(5!\).`], [T`Arrangements of the letters in TRADER.`, 360, T`R repeats: \(\frac{6!}{2!}\).`], [T`10 teams each play every other team once. Games?`, 45, T`\(\binom{10}2\).`], [T`Diagonals in a hexagon.`, 9, T`\(\frac{6\cdot3}{2}\).`], [T`Grid paths with 2 steps right and 2 up.`, 6, T`\(\binom42\).`]] });

  insertCard(SID, 'Expected value and games', { title: 'Risk and position sizing', skill: 'Risk and position sizing',
    hook: T`<p>Expected value says whether a bet is good on average. Risk says whether you can afford to take it. Trading firms ask both, and the order matters: compute the expected value first, then size the position.</p>`,
    body: T`
<h4>Step 1: expected value decides the direction</h4>
<p>A client offers a bet with a 70% chance of gaining $50,000 and a 30% chance of losing $100,000, on an account of $500,000. Expected value: \(0.7(50{,}000) - 0.3(100{,}000) = 35{,}000 - 30{,}000 = +5{,}000\). Positive, so on expected value <b>you take it</b>. On a multiple-choice test with no stated risk limit, that is the expected answer. A one-time gain is not judged against an annual return target; extra expected value is still extra.</p>
<h4>Step 2: risk decides the size</h4>
<p><b>Breakeven probability.</b> A bet winning \(W\) or losing \(L\) is fair when \(pW = (1-p)L\), so \(p^* = \frac{L}{W + L}\). Here \(\frac{100}{150} = \frac23\); 70% clears it, but only barely.</p>
<p><b>Spread of outcomes.</b> A two-outcome bet has standard deviation \((W + L)\sqrt{p(1-p)}\): here \(150{,}000\sqrt{0.21} \approx 68{,}700\), large next to a mean of 5,000.</p>
<p><b>Loss as a share of capital.</b> The bad case loses \(\frac{100{,}000}{500{,}000} = 20\%\) of the account. If a firm rule caps a single trade's loss below that, the answer becomes "not at this size."</p>
<h4>Kelly sizing</h4>
<p>To grow capital fastest over many bets, choose the size that maximizes the expected logarithm of wealth. For a bet paying \(b\) to 1 (win \(b\) per 1 risked) with win probability \(p\), the best fraction of capital to risk is</p>
\[f^* = p - \frac{1 - p}{b}\]
<p>Even money (\(b = 1\)) with \(p = 0.6\): \(f^* = 0.2\), risk 20% of capital. If \(f^* \le 0\), do not bet.</p>
<p>For a bet that gains a fraction \(w\) of capital with probability \(p\) and loses a fraction \(l\) with probability \(q = 1 - p\), the best multiple of the offered size is</p>
\[k^* = \frac pl - \frac qw\]
<p>The client bet has \(w = 0.1\), \(l = 0.2\): \(k^* = \frac{0.7}{0.2} - \frac{0.3}{0.1} = 3.5 - 3 = 0.5\). <b>Take half of it.</b> At full size the expected log growth is \(0.7\ln1.1 + 0.3\ln0.8 \approx -0.0002\), just below zero: a positive-expectation bet that is too large for the account.</p>
<h4>How to answer aloud</h4>
<p>"Expected value is plus 5,000, so the bet is favorable. The downside is 20% of the account and the edge is thin: the breakeven probability is 67% against 70%. I would take it, sized down; Kelly says half."</p>`,
    ex: { q: T`A bet pays 2 to 1 and wins with probability 0.4. Should you take it, and what fraction of capital should you risk?`, a: T`<p>Expected value per $1: \(0.4(2) - 0.6(1) = +0.2\). Favorable.</p><p>Kelly: \(f^* = 0.4 - \frac{0.6}{2} = 0.1\). Risk 10% of capital.</p>` },
    exs: [{ q: T`What win probability makes a bet that wins $30 or loses $20 exactly fair?`, a: T`<p>\(p^* = \frac{L}{W + L} = \frac{20}{50} = 0.4\). Any higher probability makes it favorable.</p>` }],
    trap: T`Rejecting a positive-expectation bet because its gain looks small. Decide direction by expected value, then manage risk through size.`,
    vary: [[T`Win $50,000 at 70%, lose $100,000 at 30%. Expected value?`, 5000, T`\(35{,}000 - 30{,}000\).`], [T`Breakeven win probability for that bet, as a decimal.`, 2 / 3, T`\(\frac{100}{150}\).`], [T`Even-money bet with \(p = 0.55\). Kelly fraction?`, 0.1, T`\(0.55 - 0.45\).`], [T`Even money with \(p = 0.5\). Kelly fraction?`, 0, T`No edge, no bet.`]] });

  // ======================= MORE TEACHING IN EXISTING UNITS =======================
  more('Word problems at speed', { more: T`
<h4>Harder templates</h4>
<table class="tt"><tr><th>Template</th><th>Method</th></tr>
<tr><td>successive percent changes</td><td>multiply the factors: up 20%, down 25% is \(1.2\times0.75 = 0.9\), a 10% fall</td></tr>
<tr><td>mixtures</td><td>total amount of the ingredient over total volume: 10 L at 20% plus 30 L at 60% is \(\frac{2 + 18}{40} = 50\%\)</td></tr>
<tr><td>approaching objects</td><td>speeds add: 300 miles apart at 70 and 80 mph meet after \(\frac{300}{150} = 2\) hours</td></tr>
<tr><td>catching up</td><td>speeds subtract: a 20-mile lead closed at \(60 - 50\) mph takes 2 hours</td></tr>
<tr><td>three workers</td><td>rates add: 4, 6, and 12 hours give \(\frac1{1/4 + 1/6 + 1/12} = 2\) hours</td></tr>
<tr><td>ages</td><td>write today's ages as unknowns and shift both by the same years: if A is 3 times B now and twice B in 10 years, \(3B + 10 = 2(B + 10)\), so \(B = 10\)</td></tr></table>`,
    vary: [[T`A price rises 20%, then falls 25%. Net percent change?`, -10, T`\(1.2\times0.75 = 0.9\).`], [T`Two trains 300 miles apart approach at 70 and 80 mph. Hours to meet?`, 2, T`\(300\div150\).`]] });
  more('Probability under time pressure', { more: T`
<h4>Bayes with numbers: imagine 1,000 people</h4>
<p>A disease affects 1% of people. A test catches 90% of cases and wrongly flags 9% of healthy people. Of 1,000 people, 10 are sick and 9 of them test positive; 990 are healthy and about 89 test positive. So a positive test means sickness with probability \(\frac{9}{9 + 89} \approx 0.09\), not 0.9. In symbols:</p>
<p>In symbols, with prevalence \(p\), detection rate \(s\), and false-positive rate \(f\):</p>
\[P(\text{sick}\mid +) = \frac{s\,p}{s\,p + f(1 - p)}\]
<p><b>At least \(k\) successes.</b> Add the exact cases, or subtract the ones below \(k\): at least 2 heads in 4 flips is \(1 - \frac{1 + 4}{16} = \frac{11}{16}\).</p>`,
    vary: [[T`1% prevalence, 90% detection, 9% false positives. \(P(\text{sick}\mid+)\), to three decimals.`, 0.009 / (0.009 + 0.0891), T`\(\frac{0.009}{0.009 + 0.0891}\).`]] });

  // ======================= GENERATORS =======================
  registerUnitGens(SID, { units: {
    'Number puzzles': [
      { id: 'qz-clap', sim: true, hard: true, make(R) {
        const N = R.int(20, 150), k = R.int(0, 3), sq = Math.floor(Math.sqrt(N));
        if (k === 0) return { q: T`${N} students stand in a line, numbered 1 to ${N}. Student 1 claps for every student, student 2 claps for every second student, student 3 for every third student, and so on through student ${N}. How many students hear an odd number of claps?`, answer: sq, d: near(sq, [sq + 1, sq - 1, Math.floor(N / 2), sq * 2]),
          x: T`Student \(d\) claps for multiples of \(d\), so student \(n\) hears one clap per divisor of \(n\). The count is odd exactly for perfect squares: \(\lfloor\sqrt{${N}}\rfloor = ${sq}\).`, v: `sum(1 for n in range(1, ${N + 1}) if len(divisors(n)) % 2 == 1)` };
        if (k === 1) return { q: T`${N} lockers start closed. Student 1 opens every locker, student 2 toggles every 2nd locker, student 3 every 3rd, and so on through student ${N}. How many lockers end open?`, answer: sq, d: near(sq, [sq + 1, sq - 1, Math.floor(N / 2), N - sq]),
          x: T`Locker \(n\) is toggled once per divisor of \(n\); an odd count leaves it open. Only perfect squares have an odd number of divisors: ${sq}.`, v: `sum(1 for n in range(1, ${N + 1}) if len(divisors(n)) % 2 == 1)` };
        if (k === 2) { const n = R.pick([12, 18, 20, 24, 28, 30, 36, 40, 45, 48, 60, 72, 84, 90, 96].filter(x => x <= N)), dn = ndiv(n);
          return { q: T`In the same clapping line of ${N} students (student \(d\) claps for every \(d\)th student), how many claps does student ${n} hear?`, answer: dn, d: near(dn, [dn + 1, dn - 2, Math.floor(n / 2), dn * 2]),
            x: T`One clap per divisor of ${n}. Factor and multiply exponents plus one: ${dn} divisors.`, v: `len(divisors(${n}))` }; }
        const pc = Array.from({ length: N }, (_, i) => i + 1).filter(n => ndiv(n) === 2).length;
        return { q: T`In a clapping line of ${N} students (student \(d\) claps for every \(d\)th student), how many students hear exactly 2 claps?`, answer: pc, d: near(pc, [pc + 1, pc - 1, sq, pc + 5]),
          x: T`Exactly two divisors, 1 and itself, means a prime. There are ${pc} primes up to ${N}.`, v: `primepi(${N})` };
      } },
      { id: 'qz-mult', sim: true, hard: true, make(R) {
        const N = R.pick([100, 120, 150, 200, 250, 300, 500, 1000]), [a, b] = R.pick([[2, 3], [3, 5], [4, 6], [6, 9], [3, 7], [4, 10], [5, 7], [6, 8], [2, 5]]), L = lcm(a, b), k = R.int(0, 2);
        const fa = Math.floor(N / a), fb = Math.floor(N / b), fl = Math.floor(N / L), either = fa + fb - fl;
        const [txt, ans, py] = [[`divisible by ${a} or ${b}`, either, `sum(1 for n in range(1, ${N + 1}) if n % ${a} == 0 or n % ${b} == 0)`], [`divisible by neither ${a} nor ${b}`, N - either, `sum(1 for n in range(1, ${N + 1}) if n % ${a} and n % ${b})`], [`divisible by ${a} but not by ${b}`, fa - fl, `sum(1 for n in range(1, ${N + 1}) if n % ${a} == 0 and n % ${b})`]][k];
        return { q: T`How many integers from 1 to ${N} are ${txt}?`, answer: ans, d: near(ans, [ans + Math.floor(N / (a * b)) - fl, ans + fl, ans - 1, fa + fb]),
          x: T`Multiples of ${a}: ${fa}. Of ${b}: ${fb}. Of both, meaning of \(\operatorname{lcm}(${a}, ${b}) = ${L}\): ${fl}. Either: \(${fa} + ${fb} - ${fl} = ${either}\). ${k === 1 ? T`Neither: \(${N} - ${either} = ${ans}\).` : k === 2 ? T`${a} but not ${b}: \(${fa} - ${fl} = ${ans}\).` : ''}`, v: py };
      } },
      { id: 'qz-ndiv', sim: true, hard: true, make(R) {
        const e = [R.int(1, 4), R.int(0, 3), R.int(0, 2), R.int(0, 1)], n = 2 ** e[0] * 3 ** e[1] * 5 ** e[2] * 7 ** e[3], dn = (e[0] + 1) * (e[1] + 1) * (e[2] + 1) * (e[3] + 1);
        const fac = [[2, e[0]], [3, e[1]], [5, e[2]], [7, e[3]]].filter(([, x]) => x).map(([p, x]) => (x === 1 ? `${p}` : `${p}^{${x}}`)).join('\\cdot');
        return { q: T`How many positive divisors does ${n} have?`, answer: dn, d: near(dn, [dn + 2, dn - 1, e.reduce((a, b) => a + b, 0) + 1, dn * 2]),
          x: T`\(${n} = ${fac}\). Add 1 to each exponent and multiply: ${e.filter(x => x).map(x => x + 1).join(' \\(\\times\\) ')} \(= ${dn}\).`, v: `len(divisors(${n}))` };
      } },
      { id: 'qz-last', sim: true, hard: true, make(R) {
        const a = R.pick([2, 3, 4, 7, 8, 9, 12, 13, 17, 23]), n = R.int(10, 2030), b = a % 10, cyc = [b]; while (true) { const nx = (cyc[cyc.length - 1] * b) % 10; if (nx === cyc[0]) break; cyc.push(nx); }
        const pos = n % cyc.length, ans = cyc[(pos + cyc.length - 1) % cyc.length];
        return { q: T`What is the last digit of \(${a}^{${n}}\)?`, answer: ans, d: near(ans, [cyc[pos % cyc.length], (ans + 2) % 10, b, (ans + 5) % 10]),
          x: T`Only the last digit ${b} matters; its powers cycle ${cyc.join(', ')} (length ${cyc.length}). \(${n} \bmod ${cyc.length} = ${pos}\)${pos === 0 ? ', which means the last entry' : ''}, so the last digit is ${ans}.`, v: `pow(${a}, ${n}, 10)` };
      } },
      { id: 'qz-lcm', sim: true, hard: true, make(R) {
        const [a, b] = R.pick([[12, 18], [8, 12], [6, 15], [10, 15], [9, 12], [14, 21], [16, 24], [20, 30], [4, 6], [15, 25]]), L = lcm(a, b), k = R.int(0, 1);
        if (k === 0) return { q: T`Two lights blink together at time 0. One blinks every ${a} seconds, the other every ${b} seconds. After how many seconds do they next blink together?`, answer: L, d: near(L, [a * b, a + b, gcd(a, b), L * 2]), x: T`\(\operatorname{lcm}(${a}, ${b}) = \frac{${a}\cdot${b}}{\gcd(${a}, ${b})} = \frac{${a * b}}{${gcd(a, b)}} = ${L}\).`, v: `ilcm(${a}, ${b})` };
        const T0 = R.pick([5, 10, 15, 30, 60]) * 60;
        return { q: T`Two lights blink together at time 0, one every ${a} seconds and one every ${b} seconds. How many more times do they blink together in the next ${T0 / 60} minutes (counting one exactly at the end)?`, answer: Math.floor(T0 / L), d: near(Math.floor(T0 / L), [Math.floor(T0 / L) + 1, Math.floor(T0 / (a * b)), Math.floor(T0 / L) - 1, Math.floor(T0 / (a + b))]),
          x: T`They coincide every \(\operatorname{lcm} = ${L}\) seconds: \(\lfloor ${T0} / ${L}\rfloor = ${Math.floor(T0 / L)}\).`, v: `${T0} // ilcm(${a}, ${b})` };
      } },
      { id: 'qz-mod9', sim: true, make(R) {
        const n = R.int(1000000, 9999999), m = R.pick([9, 3]), ds = String(n).split('').reduce((a, b) => a + +b, 0);
        return { q: T`What is the remainder when ${n.toLocaleString('en-US')} is divided by ${m}?`, answer: n % m, d: near(n % m, [(n % m + 1) % m, (n % m + 2) % m, ds % 10, n % 10 % m]),
          x: T`Digit sum: ${ds}, and \(${ds} \bmod ${m} = ${n % m}\).`, v: `${n} % ${m}` };
      } }
    ],
    'Counting and arrangements': [
      { id: 'qc-word', sim: true, hard: true, make(R) {
        const w = R.pick(['LEVEL', 'BANANA', 'COFFEE', 'ACCESS', 'TRADER', 'MARKET', 'OPTION', 'SETTLE', 'HEDGE', 'RATIO', 'PAPER', 'ASSETS']);
        const cnt = {}; for (const ch of w) cnt[ch] = (cnt[ch] || 0) + 1; const reps = Object.entries(cnt).filter(([, c]) => c > 1), ans = fact(w.length) / reps.reduce((a, [, c]) => a * fact(c), 1);
        return { q: T`How many distinct arrangements of the letters in ${w} are there?`, answer: ans, d: near(ans, [fact(w.length), ans * 2, ans / 2, fact(w.length - 1)]),
          x: T`${w.length} letters${reps.length ? T` with ${reps.map(([ch, c]) => `${ch} ${c} times`).join(' and ')}` : ', all different'}: \(\frac{${w.length}!}{${reps.map(([, c]) => `${c}!`).join('\\,') || '1'}} = ${ans}\).`, v: `len(set(itertools.permutations('${w}')))` };
      } },
      { id: 'qc-seat', sim: true, hard: true, make(R) {
        const n = R.int(4, 7), k = R.int(0, 2), together = 2 * fact(n - 1);
        if (k === 2) return { q: T`In how many ways can ${n} people sit around a round table, if only their order around the table matters?`, answer: fact(n - 1), d: near(fact(n - 1), [fact(n), fact(n - 1) / 2, fact(n - 2), n * n]), x: T`Fix one person's seat to remove rotations, then arrange the rest: \((${n} - 1)! = ${fact(n - 1)}\).`, v: `factorial(${n - 1})` };
        const apart = k === 1, ans = apart ? fact(n) - together : together;
        return { q: T`In how many ways can ${n} people sit in a row if two particular people ${apart ? 'refuse to sit next to each other' : 'insist on sitting next to each other'}?`, answer: ans, d: near(ans, [apart ? together : fact(n) - together, fact(n), fact(n - 1), ans / 2]),
          x: T`Together: glue the pair into one unit, \((${n} - 1)! = ${fact(n - 1)}\), times 2 for their order: ${together}.${apart ? T` Apart: \(${n}! - ${together} = ${fact(n)} - ${together} = ${ans}\).` : ''}`, v: `sum(1 for p in itertools.permutations(range(${n})) if ${apart ? 'abs(p.index(0) - p.index(1)) != 1' : 'abs(p.index(0) - p.index(1)) == 1'})` };
      } },
      { id: 'qc-pairs', sim: true, hard: true, make(R) {
        const k = R.int(0, 2);
        if (k === 0) { const n = R.int(6, 30); return { q: T`${n} people each shake hands with every other person once. How many handshakes?`, answer: C(n, 2), d: near(C(n, 2), [n * (n - 1), n * n, C(n, 2) + n, C(n, 2) - 1]), x: T`One per pair: \(\binom{${n}}{2} = \frac{${n}\cdot${n - 1}}{2} = ${C(n, 2)}\).`, v: `binomial(${n}, 2)` }; }
        if (k === 1) { const n = R.int(5, 20); return { q: T`How many diagonals does a convex polygon with ${n} sides have?`, answer: n * (n - 3) / 2, d: near(n * (n - 3) / 2, [n * (n - 3), C(n, 2), n * (n - 2) / 2, n * (n - 3) / 2 + n]), x: T`Each vertex reaches \(${n} - 3\) others by a diagonal, and each diagonal is counted from both ends: \(\frac{${n}\cdot${n - 3}}{2} = ${n * (n - 3) / 2}\).`, v: `binomial(${n}, 2) - ${n}` }; }
        const m = R.int(2, 6), u = R.int(2, 5);
        return { q: T`Moving only right or up along grid lines, how many shortest paths go from \((0, 0)\) to \((${m}, ${u})\)?`, answer: C(m + u, m), d: near(C(m + u, m), [m * u, 2 ** (m + u), C(m + u, m) * 2, fact(m + u)]), x: T`Every path is a string of ${m} rights and ${u} ups; choose where the rights go: \(\binom{${m + u}}{${m}} = ${C(m + u, m)}\).`, v: `binomial(${m + u}, ${m})` };
      } },
      { id: 'qc-commit', sim: true, hard: true, make(R) {
        if (R.int(0, 1)) { const M = R.int(3, 7), W = R.int(2, 6), k = R.int(2, 4), ans = C(M + W, k) - C(M, k);
          return { q: T`A committee of ${k} is chosen from ${M} men and ${W} women. How many committees include at least one woman?`, answer: ans, d: near(ans, [C(M + W, k), W * C(M + W - 1, k - 1), C(W, k), ans + C(M, k) * 2]), x: T`All committees minus all-men committees: \(\binom{${M + W}}{${k}} - \binom{${M}}{${k}} = ${C(M + W, k)} - ${C(M, k)} = ${ans}\).`, v: `binomial(${M + W}, ${k}) - binomial(${M}, ${k})` }; }
        const T0 = R.pick([40, 50, 60, 80, 100]), a = R.int(Math.round(T0 * 0.3), Math.round(T0 * 0.6)), b = R.int(Math.round(T0 * 0.2), Math.round(T0 * 0.5)), both = R.int(Math.max(1, a + b - T0 + 1), Math.min(a, b) - 1), nei = T0 - a - b + both;
        return { q: T`Of ${T0} traders, ${a} trade options, ${b} trade futures, and ${both} trade${both === 1 ? 's' : ''} both. How many trade neither?`, answer: nei, d: near(nei, [T0 - a - b, T0 - a - b + 2 * both, both, T0 - a]), x: T`At least one: \(${a} + ${b} - ${both} = ${a + b - both}\). Neither: \(${T0} - ${a + b - both} = ${nei}\).`, v: `${T0} - (${a} + ${b} - ${both})` };
      } }
    ],
    'Risk and position sizing': [
      { id: 'qr-ev', sim: true, hard: true, make(R) {
        const A = R.pick([200000, 500000, 1000000]), p = R.pick([0.5, 0.6, 0.7, 0.75, 0.8, 0.9]), W = R.pick([10000, 20000, 25000, 40000, 50000]), L = R.pick([20000, 40000, 50000, 100000, 150000]);
        const ev = Math.round(p * W - (1 - p) * L), ask = R.int(0, 1);
        if (ask === 0) return { q: T`A client offers ${an(Math.round(p * 100))} ${Math.round(p * 100)}% chance of a $${W.toLocaleString('en-US')} gain and ${an(Math.round((1 - p) * 100))} ${Math.round((1 - p) * 100)}% chance of a $${L.toLocaleString('en-US')} loss on an account of $${A.toLocaleString('en-US')}. What is the expected value of taking it, in dollars?`, answer: ev, d: near(ev, [Math.round(p * W), W - L, -ev, Math.round(p * W - p * L)]),
          x: T`\(${p}\times${W} - ${R.fmt(1 - p)}\times${L} = ${Math.round(p * W)} - ${Math.round((1 - p) * L)} = ${ev}\).`, v: `Rational(${Math.round(p * 100)}, 100)*${W} - Rational(${Math.round((1 - p) * 100)}, 100)*${L}` };
        const ans = ev > 0 ? 'Yes: the expected value is positive' : ev < 0 ? 'No: the expected value is negative' : 'Indifferent: the expected value is zero';
        return { q: T`A client offers ${an(Math.round(p * 100))} ${Math.round(p * 100)}% chance of a $${W.toLocaleString('en-US')} gain and ${an(Math.round((1 - p) * 100))} ${Math.round((1 - p) * 100)}% chance of a $${L.toLocaleString('en-US')} loss on an account of $${A.toLocaleString('en-US')}. With no other constraints, should you take it?`,
          c: [ans, ...['Yes: the expected value is positive', 'No: the expected value is negative', 'No: the possible loss exceeds the possible gain', 'Yes: the win probability is above 50%'].filter(o => o !== ans).slice(0, 3)],
          x: T`Expected value: \(${p}\times${W} - ${R.fmt(1 - p)}\times${L} = ${ev}\). The sign decides; the sizes of the gain and loss alone do not.`, key: ev > 0 ? 'Yes' : ev < 0 ? 'No' : 'Zero', vk: `(lambda e: 'Yes' if e > 0 else 'No' if e < 0 else 'Zero')(Rational(${Math.round(p * 100)}, 100)*${W} - Rational(${Math.round((1 - p) * 100)}, 100)*${L})` };
      } },
      { id: 'qr-break', sim: true, hard: true, make(R) {
        const W = R.pick([10, 20, 30, 40, 50, 60, 100]), L = R.pick([10, 20, 30, 40, 50, 100]), p = L / (W + L);
        return { q: T`A bet wins $${W} or loses $${L}. What win probability makes it exactly fair? (Give a decimal or fraction.)`, answer: p, tol: 0.001, d: near(+p.toFixed(3), [+(W / (W + L)).toFixed(3), 0.5, +(L / W > 1 ? 0.9 : L / W).toFixed(3), +(p / 2).toFixed(3)]),
          x: T`Fair when \(p\cdot${W} = (1 - p)\cdot${L}\): \(p = \frac{${L}}{${W} + ${L}} = ${R.frac(L, W + L)}\).`, v: `Rational(${L}, ${W + L})` };
      } },
      { id: 'qr-kelly', sim: true, hard: true, make(R) {
        let b, p; do { b = R.pick([1, 1, 2, 3]); p = R.pick([0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7]); } while (p - (1 - p) / b <= 0);
        const f = p - (1 - p) / b;
        return { q: T`A bet pays ${b === 1 ? 'even money (1 to 1)' : `${b} to 1`} and wins with probability ${p}. By the Kelly criterion, what fraction of capital should you risk? (Decimal.)`, answer: f, tol: 0.001, d: near(+f.toFixed(3), [+(p - (1 - p)).toFixed(3), p, +(f * 2).toFixed(3), +(p * b - (1 - p)).toFixed(3)]),
          x: T`\(f^* = p - \frac{1 - p}{b} = ${p} - \frac{${R.fmt(1 - p)}}{${b}} = ${R.fmt(f, 4)}\).`, v: `Rational(${Math.round(p * 100)}, 100) - Rational(${Math.round((1 - p) * 100)}, 100)/${b}` };
      } },
      { id: 'qr-scale', hard: true, make(R) {
        let p, w, l, k; do { p = R.pick([0.6, 0.65, 0.7, 0.75, 0.8]); w = R.pick([0.05, 0.1, 0.2]); l = R.pick([0.1, 0.2, 0.3, 0.4]); k = p / l - (1 - p) / w; } while (!(k > 0.15 && k < 1.6));
        return { q: T`A bet gains ${Math.round(w * 100)}% of your capital with probability ${p} and loses ${Math.round(l * 100)}% with probability ${R.fmt(1 - p)}. To maximize long-run growth, what multiple of this bet should you take? (1 means the full bet.)`, answer: k, tol: 0.01, hint: 'Two decimals.',
          x: T`\(k^* = \frac pl - \frac qw = \frac{${p}}{${l}} - \frac{${R.fmt(1 - p)}}{${w}} = ${R.fmt(p / l, 3)} - ${R.fmt((1 - p) / w, 3)} = ${R.fmt(k, 3)}\).`, v: `Rational(${Math.round(p * 100)}, 100)/Rational(${Math.round(l * 100)}, 100) - Rational(${Math.round((1 - p) * 100)}, 100)/Rational(${Math.round(w * 100)}, 100)` };
      } },
      { id: 'qr-sd', hard: true, make(R) {
        const W = R.pick([10, 20, 50, 100]), L = R.pick([10, 20, 50, 100]), p = R.pick([0.2, 0.5, 0.8, 0.9, 0.36]), sd = (W + L) * Math.sqrt(p * (1 - p));
        return { q: T`A bet wins $${W} with probability ${p} and loses $${L} otherwise. What is the standard deviation of its payoff, in dollars?`, answer: sd, tol: 0.01, hint: 'Two decimals.',
          x: T`Two outcomes ${W + L} apart: \(\sigma = (W + L)\sqrt{p(1-p)} = ${W + L}\sqrt{${p}\cdot${R.fmt(1 - p)}} \approx ${R.fmt(sd, 2)}\).`, v: `(${W} + ${L})*sqrt(Rational(${Math.round(p * 100)}, 100)*Rational(${Math.round((1 - p) * 100)}, 100))` };
      } }
    ],
    'Word problems at speed': [
      { id: 'qw-hard', sim: true, hard: true, make(R) {
        const k = R.int(0, 5);
        if (k === 0) { const a = R.pick([10, 20, 25, 50]), b = R.pick([10, 20, 25, 40, 50]), up = R.int(0, 1), v = Math.round(((up ? (1 + a / 100) * (1 - b / 100) : (1 - a / 100) * (1 + b / 100)) - 1) * 10000) / 100;
          return { q: T`A price ${up ? 'rises' : 'falls'} ${a}% and then ${up ? 'falls' : 'rises'} ${b}%. What is the net percent change? (Negative for a fall.)`, answer: v, d: near(v, [up ? a - b : b - a, v + 5, -v, v - 2]), x: T`Multiply the factors: \(${up ? `${1 + a / 100}\\times${1 - b / 100}` : `${1 - a / 100}\\times${1 + b / 100}`} = ${R.fmt(1 + v / 100, 4)}\), a change of ${R.fmt(v)}%.`, v: up ? `(1 + Rational(${a}, 100))*(1 - Rational(${b}, 100))*100 - 100` : `(1 - Rational(${a}, 100))*(1 + Rational(${b}, 100))*100 - 100` }; }
        if (k === 1) { const x = R.pick([10, 20, 30]), px = R.pick([10, 20, 30]), y = R.pick([10, 20, 30, 40]), py = R.pick([40, 50, 60, 80]), v = (x * px + y * py) / (x + y);
          return { q: T`${x} liters of a ${px}% solution are mixed with ${y} liters of a ${py}% solution. What is the concentration of the mixture, in percent?`, answer: v, tol: 0.01, d: near(+v.toFixed(2), [(px + py) / 2, +(v + 5).toFixed(2), py - px, +(v - 4).toFixed(2)]), x: T`Ingredient: \(${x}(${px / 100}) + ${y}(${py / 100}) = ${R.fmt((x * px + y * py) / 100)}\) liters in ${x + y} liters: ${R.fmt(v, 2)}%.`, v: `Rational(${x}*${px} + ${y}*${py}, ${x + y})` }; }
        if (k === 2) { const D = R.pick([120, 180, 240, 300, 360, 420]), u = R.pick([40, 50, 60, 70, 80]), w = R.pick([30, 40, 50, 60, 90]), t = D / (u + w);
          return { q: T`Two trains start ${D} miles apart and travel toward each other at ${u} mph and ${w} mph. How many hours until they meet?`, answer: t, tol: 0.01, d: near(+t.toFixed(2), [D / Math.abs(u - w || 1), D / u, D / w, +(t * 2).toFixed(2)]), x: T`Closing speed is the sum, \(${u + w}\) mph: \(\frac{${D}}{${u + w}} = ${R.fmt(t, 3)}\) hours.`, v: `Rational(${D}, ${u + w})` }; }
        if (k === 3) { const g = R.pick([10, 15, 20, 30]), u = R.pick([50, 60, 70]), w = u - R.pick([5, 10, 15, 20]), t = g / (u - w);
          return { q: T`A car is ${g} miles behind a truck. The car drives ${u} mph and the truck ${w} mph. How many hours until the car catches up?`, answer: t, tol: 0.01, d: near(+t.toFixed(2), [g / (u + w), g / w, t * 2, t + 1]), x: T`The gap closes at \(${u} - ${w} = ${u - w}\) mph: \(\frac{${g}}{${u - w}} = ${R.fmt(t, 3)}\) hours.`, v: `Rational(${g}, ${u - w})` }; }
        if (k === 4) { const [a, b, c] = R.pick([[4, 6, 12], [3, 6, 6], [2, 3, 6], [6, 10, 15], [5, 20, 4], [10, 15, 30]]), t = 1 / (1 / a + 1 / b + 1 / c);
          return { q: T`Three workers can finish a job alone in ${a}, ${b}, and ${c} hours. Working together, how many hours do they take?`, answer: t, tol: 0.01, d: near(+t.toFixed(2), [(a + b + c) / 3, Math.min(a, b, c) / 2, t + 1, (a + b + c) / 9]), x: T`Rates add: \(\frac1{${a}} + \frac1{${b}} + \frac1{${c}} = ${R.frac(a * b + b * c + a * c, a * b * c)}\) of the job per hour, so \(${R.fmt(t, 3)}\) hour${Math.abs(t - 1) < 1e-9 ? '' : 's'}.`, v: `1/(Rational(1, ${a}) + Rational(1, ${b}) + Rational(1, ${c}))` }; }
        const B = R.int(5, 20), m = R.int(3, 4), n = R.int(2, m - 1), y = (m - n) * B / (n - 1);
        if (!Number.isInteger(y) || y < 1 || y > 40) return this.make(R);
        return { q: T`Ann is ${m} times as old as Ben. In ${y} years she will be ${n} times as old as he is. How old is Ben now?`, answer: B, d: near(B, [B + y, m * B, B - 1, y]), x: T`Today: Ann \(${m}B\), Ben \(B\). In ${y} years: \(${m}B + ${y} = ${n}(B + ${y})\), so \(${m - n}B = ${(n - 1) * y}\) and \(B = ${B}\).`, v: `solve(${m}*x + ${y} - ${n}*(x + ${y}), x)[0]` };
      } }
    ],
    'Probability under time pressure': [
      { id: 'qp-bayes', hard: true, make(R) {
        const prev = R.pick([0.01, 0.02, 0.05, 0.1]), sens = R.pick([0.8, 0.9, 0.95, 0.99]), fp = R.pick([0.05, 0.09, 0.1, 0.2]), tp = prev * sens, f = (1 - prev) * fp, v = tp / (tp + f);
        return { q: T`A condition affects ${R.fmt(prev * 100)}% of people. A test detects it ${R.fmt(sens * 100)}% of the time and gives a false positive for ${R.fmt(fp * 100)}% of people without it. A person tests positive. What is the probability they have the condition? (Three decimals.)`, answer: v, tol: 0.001, hint: 'Three decimals.',
          x: T`Out of 10,000 people: \(${R.fmt(10000 * prev)}\) have it and \(${R.fmt(10000 * tp)}\) of them test positive; \(${R.fmt(10000 * (1 - prev))}\) do not, and \(${R.fmt(10000 * f)}\) of them test positive. \(\frac{${R.fmt(10000 * tp)}}{${R.fmt(10000 * tp)} + ${R.fmt(10000 * f)}} \approx ${R.fmt(v, 3)}\).`,
          v: `(Rational(${Math.round(prev * 100)}, 100)*Rational(${Math.round(sens * 100)}, 100))/(Rational(${Math.round(prev * 100)}, 100)*Rational(${Math.round(sens * 100)}, 100) + Rational(${100 - Math.round(prev * 100)}, 100)*Rational(${Math.round(fp * 100)}, 100))` };
      } },
      { id: 'qp-atleast', hard: true, make(R) {
        const n = R.int(4, 7), k = R.int(2, Math.min(4, n - 1)); let below = 0; for (let j = 0; j < k; j++) below += C(n, j);
        return { q: T`A fair coin is flipped ${n} times. What is the probability of at least ${k} heads?`, answer: 1 - below / 2 ** n, tol: 0.001, hint: 'A fraction or three decimals.',
          x: T`Subtract fewer than ${k}: \(1 - \frac{${Array.from({ length: k }, (_, j) => `\\binom{${n}}{${j}}`).join(' + ')}}{2^{${n}}} = 1 - \frac{${below}}{${2 ** n}} = ${R.frac(2 ** n - below, 2 ** n)}\).`, v: `1 - Rational(sum(binomial(${n}, j) for j in range(${k})), 2**${n})` };
      } }
    ]
  } });

  // Mark the earlier quant generators that belong in the harder simulation.
  for (const id of ['qp-dice', 'qp-urn', 'qp-flips', 'qp-cards', 'qe-reroll', 'qe-linear', 'qe-two', 'qe-indep', 'qk-edge', 'qn-next', 'ql-syl', 'ql-order', 'qf-pct']) { const g = S.generators.find(x => x.id === id); if (g) g.hard = true; }

  // ======================= MORE VIDEO QUESTIONS =======================
  window.VIDEO_QS.push(
    { q: 'Thirty students stand in a line. Student 1 claps for every student, student 2 claps for every second student, student 3 for every third, and so on up to student 30. How many students hear an odd number of claps?', ans: '5', say: ['Student d claps for the multiples of d, so student n hears one clap for each divisor of n.', 'Divisors pair up: d with n over d. The count is odd only when a divisor pairs with itself, which means n is a perfect square.', 'Perfect squares up to 30: 1, 4, 9, 16, 25.', 'So 5 students.', 'Check one: student 12 has divisors 1, 2, 3, 4, 6, 12, six of them, even; student 9 has 1, 3, 9, three, odd.'] },
    { q: 'A client offers your $500,000 account a 70% chance of a $50,000 gain and a 30% chance of a $100,000 loss. Should you take it?', ans: 'Yes on expected value (+$5,000), ideally at half size', say: ['First the expected value: 0.7 times 50,000 is 35,000; 0.3 times 100,000 is 30,000. Net plus 5,000, so the bet is favorable.', 'Now the risk. The loss is 20% of the account, and the edge is thin: breakeven probability is 100 over 150, about 67%, against 70%.', 'Kelly sizing: the best multiple of the bet is p over the loss fraction minus q over the gain fraction: 0.7 over 0.2 minus 0.3 over 0.1, which is 3.5 minus 3, so one half.', 'So yes, I take it, but at half size. At full size the expected log growth is slightly negative.'] },
    { q: 'How many integers from 1 to 1000 are divisible by neither 6 nor 10?', ans: '767', say: ['Count multiples, then use inclusion-exclusion.', 'Multiples of 6: 166. Multiples of 10: 100.', 'Both means multiples of the lcm, 30, not 60: 33.', 'Either: 166 plus 100 minus 33, which is 233.', 'Neither: 1000 minus 233, so 767.'] },
    { q: 'A disease affects 1 in 1,000 people. A test is 99% accurate both ways. You test positive. What is the chance you have the disease?', ans: 'About 9%', say: ['Picture 100,000 people. 100 have the disease; 99 of them test positive.', 'Of the 99,900 healthy people, 1% test positive: 999.', 'Positives total 99 plus 999, which is 1,098, and 99 of them are sick.', 'So about 99 over 1,100, roughly 9%.', 'The rare base rate dominates the test accuracy.'] },
    { q: 'You and I alternate flipping a fair coin; the first to flip heads wins. You go first. What is your probability of winning?', ans: '2/3', say: ['Let p be the first flipper\'s chance of winning.', 'You win immediately with probability one half. Otherwise, with probability one half, I become the first flipper in an identical game, and you win only if I lose that game.', 'So p equals one half plus one half times (1 minus p).', 'That gives 1.5p equals 1, so p is two thirds.', 'Check: going first should be an advantage, and two thirds is above one half.'] }
  );
})();
