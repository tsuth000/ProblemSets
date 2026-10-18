'use strict';
// Pure math track, stage 1: Number theory. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'nt', name: 'Number theory', color: '#2F6B4F', blurb: 'Euclid, primes, congruences, CRT, Fermat and Euler, primitive roots, quadratic reciprocity, Diophantine equations, RSA, prime distribution', questions: [], generators: [] });
  const U = ['Divisibility and the Euclidean algorithm', 'Primes and factorization', 'Modular arithmetic', 'Linear congruences and the CRT', 'Fermat, Euler, and Wilson', 'Arithmetic functions', 'Orders and primitive roots', 'Quadratic residues', 'Diophantine equations', 'Cryptography: RSA and Diffie–Hellman', 'Distribution of primes'];

  registerLearn('nt', [
    { title: U[0], skill: U[0],
      hook: T`<p>Euclid's algorithm, over 2,000 years old, finds the greatest common divisor in a handful of steps, and run backward it writes the gcd as a combination of the two numbers. That combination is the engine behind modular inverses and RSA.</p>`,
      body: T`
<p><b>Division algorithm.</b> For \(b > 0\), every \(a\) is \(a = qb + r\) with \(0 \le r < b\).</p>
<p><b>Euclid's algorithm.</b> \(\gcd(a, b) = \gcd(b, r)\); repeat until the remainder is 0.</p>
\[\begin{aligned}252 &= 1\cdot198 + 54\\ 198 &= 3\cdot54 + 36\\ 54 &= 1\cdot36 + 18\\ 36 &= 2\cdot18\end{aligned}\]
<p>So \(\gcd(252, 198) = 18\).</p>
<p><b>Bézout's identity.</b> \(\gcd(a, b) = ax + by\) for some integers \(x, y\). Back-substitute: \(18 = 54 - 36 = 54 - (198 - 3\cdot54) = 4\cdot54 - 198 = 4(252 - 198) - 198 = 4\cdot252 - 5\cdot198\).</p>
<p>The solutions \(x\) form one residue class mod \(\frac{b}{g}\), so there is exactly one \(x\) with \(0 \le x < \frac bg\). Here \(x \equiv 4 \pmod{11}\).</p>
<p><b>Consequences.</b> \(ax + by = c\) is solvable iff \(\gcd(a, b) \mid c\). Euclid's lemma: if \(p\) is prime and \(p \mid ab\), then \(p \mid a\) or \(p \mid b\). Also \(\gcd(a, b)\cdot\text{lcm}(a, b) = ab\).</p>`,
      ex: { q: T`Find \(\gcd(161, 28)\) and integers with \(161x + 28y = \gcd\).`, a: T`<p>\(161 = 5\cdot28 + 21\), \(28 = 1\cdot21 + 7\), \(21 = 3\cdot7\). So the gcd is 7.</p><p>\(7 = 28 - 21 = 28 - (161 - 5\cdot28) = 6\cdot28 - 161\): \(x = -1\), \(y = 6\). The smallest nonnegative \(x\) is \(-1 + 4 = 3\) (period \(\frac{28}{7} = 4\)): \(161\cdot3 - 28\cdot17 = 7\).</p>` },
      trap: T`Stopping one step early: the gcd is the last nonzero remainder.`,
      vary: [[T`\(\gcd(84, 120)\)?`, 12, T`\(120 = 84 + 36\), \(84 = 2\cdot36 + 12\), \(36 = 3\cdot12\).`], [T`\(\text{lcm}(84, 120)\)?`, 840, T`\(\frac{84\cdot120}{12}\).`], [T`Is \(6x + 15y = 7\) solvable in integers? 1 yes, 0 no.`, 0, T`\(\gcd = 3 \nmid 7\).`], [T`Smallest \(x \ge 0\) with \(5x + 7y = 1\)?`, 3, T`\(15 - 14 = 1\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Every integer above 1 factors into primes in exactly one way. Most counting questions about divisors reduce to reading exponents off that factorization.</p>`,
      body: T`
<p><b>Fundamental theorem of arithmetic.</b> \(n = p_1^{e_1}\cdots p_k^{e_k}\), unique up to order. <b>Infinitely many primes</b> (Euclid): \(p_1\cdots p_k + 1\) has a prime factor outside any finite list.</p>
<p><b>Divisor counts.</b> A divisor chooses each exponent from \(0\) to \(e_i\):</p>
\[\tau(n) = \prod(e_i + 1),\qquad \sigma(n) = \prod\frac{p_i^{e_i+1} - 1}{p_i - 1}\]
<p>\(72 = 2^3\cdot3^2\): \(\tau = 4\cdot3 = 12\), \(\sigma = 15\cdot13 = 195\). \(\tau(n)\) is odd exactly when \(n\) is a perfect square (divisors pair off as \(d\), \(\frac nd\)). That answers the locker and clapping puzzles: positions with an odd number of divisors are the squares.</p>
<p><b>Legendre's formula.</b> The exponent of \(p\) in \(n!\):</p>
\[v_p(n!) = \left\lfloor\frac np\right\rfloor + \left\lfloor\frac{n}{p^2}\right\rfloor + \left\lfloor\frac{n}{p^3}\right\rfloor + \cdots\]
<p>Trailing zeros of \(n!\) equal \(v_5(n!)\): for \(100!\), \(20 + 4 = 24\).</p>
<p><b>Primality.</b> Trial division up to \(\sqrt n\) suffices: a composite has a factor at most its square root.</p>`,
      ex: { q: T`How many positive divisors does 360 have, and how many are even?`, a: T`<p>\(360 = 2^3\cdot3^2\cdot5\): \(\tau = 4\cdot3\cdot2 = 24\). Even divisors need exponent of 2 at least 1: \(3\cdot3\cdot2 = 18\).</p>` },
      trap: T`Counting factors of 10 in \(n!\) by \(\left\lfloor\frac{n}{10}\right\rfloor\). Each 5 pairs with a spare 2.`,
      vary: [[T`\(\tau(100)\)?`, 9, T`\(2^2 5^2\): \(3\cdot3\).`], [T`Trailing zeros of \(50!\)?`, 12, T`\(10 + 2\).`], [T`\(\sigma(12)\)?`, 28, T`\(1 + 2 + 3 + 4 + 6 + 12\).`], [T`Exponent of 3 in \(20!\)?`, 8, T`\(6 + 2\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Modular arithmetic is arithmetic on a clock: only the remainder matters. Reducing early keeps numbers small, and repeated squaring computes enormous powers in a few steps.</p>`,
      body: T`
<p>\(a \equiv b \pmod n\) means \(n \mid a - b\). Congruences can be added, subtracted, multiplied, and raised to powers. Division needs care: cancel \(c\) from \(ac \equiv bc\) only when \(\gcd(c, n) = 1\).</p>
<p><b>Repeated squaring.</b> To compute \(3^{45} \bmod 7\), write \(45 = 32 + 8 + 4 + 1\) and square: \(3^1 = 3\), \(3^2 = 2\), \(3^4 = 4\), \(3^8 = 2\), \(3^{16} = 4\), \(3^{32} = 2\). Multiply the needed ones: \(2\cdot2\cdot4\cdot3 = 48 \equiv 6\).</p>
<p><b>Cycles of powers.</b> Powers mod \(n\) repeat. Last digit of \(7^{k}\): 7, 9, 3, 1, repeating every 4, so \(7^{2026}\) ends in 9 (\(2026 \equiv 2 \pmod 4\)). Last two digits means working mod 100.</p>
<p><b>Divisibility tests</b> are congruences: \(10 \equiv 1 \pmod 9\), so a number is congruent to its digit sum mod 9 (and mod 3). \(10 \equiv -1 \pmod{11}\), so it is congruent to its alternating digit sum mod 11, starting from the units digit.</p>`,
      ex: { q: T`Find the last two digits of \(3^{20}\).`, a: T`<p>Mod 100: \(3^5 = 243 \equiv 43\), \(3^{10} \equiv 43^2 = 1849 \equiv 49\), \(3^{20} \equiv 49^2 = 2401 \equiv 1\). Last two digits 01.</p>` },
      trap: T`Dividing both sides of \(2x \equiv 2 \pmod 6\) by 2 to get \(x \equiv 1\). \(x = 4\) also works; the correct reduction is \(x \equiv 1 \pmod 3\).`,
      vary: [[T`\(2^{10} \bmod 7\)?`, 2, T`\(2^3 \equiv 1\), \(2^{10} = 2^9\cdot2\).`], [T`Last digit of \(3^{101}\)?`, 3, T`Cycle 3, 9, 7, 1; \(101 \equiv 1 \pmod 4\).`], [T`\(123456 \bmod 9\)?`, 3, T`Digit sum 21.`], [T`\(918082 \bmod 11\)?`, 0, T`\(2 - 8 + 0 - 8 + 1 - 9 = -22\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Solving \(ax \equiv b \pmod n\) is division in modular arithmetic, and the Chinese remainder theorem glues together answers modulo different numbers. Together they solve any system of linear congruences.</p>`,
      body: T`
<p><b>Linear congruence</b> \(ax \equiv b \pmod n\). Let \(g = \gcd(a, n)\).</p>
<ul><li>If \(g \nmid b\): no solution.</li>
<li>If \(g \mid b\): exactly \(g\) solutions mod \(n\). Divide through: \(\frac ag x \equiv \frac bg \pmod{\frac ng}\), then multiply by the inverse of \(\frac ag\).</li></ul>
<p>\(6x \equiv 4 \pmod{10}\): \(g = 2\), so \(3x \equiv 2 \pmod 5\), \(x \equiv 2\cdot2 = 4 \pmod 5\) (since \(3^{-1} \equiv 2\)). Mod 10: \(x = 4, 9\).</p>
<p><b>Chinese remainder theorem.</b> If \(n_1, \ldots, n_k\) are pairwise coprime, the system \(x \equiv a_i \pmod{n_i}\) has a unique solution mod \(N = n_1\cdots n_k\).</p>
<p><b>Construction.</b> \(x = \sum a_iN_iy_i\), where \(N_i = \frac{N}{n_i}\) and \(y_i \equiv N_i^{-1} \pmod{n_i}\). Or substitute step by step: \(x \equiv 2 \pmod 3\), \(x \equiv 3 \pmod 5\). Write \(x = 2 + 3t\); then \(3t \equiv 1 \pmod 5\), \(t \equiv 2\), \(x = 8\). Check: \(8 = 2\cdot3 + 2 = 5 + 3\). Answer \(x \equiv 8 \pmod{15}\).</p>`,
      ex: { q: T`Solve \(x \equiv 1 \pmod 4\), \(x \equiv 2 \pmod 5\), \(x \equiv 3 \pmod 7\).`, a: T`<p>\(x = 1 + 4t\); \(4t \equiv 1 \pmod 5\), \(t \equiv 4\): \(x \equiv 17 \pmod{20}\). Then \(x = 17 + 20s\); \(17 + 20s \equiv 3 + 6s \equiv 3 \pmod 7\), so \(s \equiv 0\). \(x \equiv 17 \pmod{140}\).</p>` },
      trap: T`Applying the CRT to moduli that share a factor. \(x \equiv 1 \pmod 4\), \(x \equiv 2 \pmod 6\) has no solution (odd versus even).`,
      vary: [[T`Smallest positive \(x\) with \(x \equiv 2 \pmod 3\), \(x \equiv 3 \pmod 4\)?`, 11, T`Unique mod 12.`], [T`Solutions of \(4x \equiv 6 \pmod{10}\) in \(\{0, \ldots, 9\}\)?`, 2, T`\(\gcd(4, 10) = 2\) divides 6.`], [T`Solve \(3x \equiv 1 \pmod 7\).`, 5, T`\(15 \equiv 1\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Three classical theorems collapse huge powers and factorials modulo a prime or any \(n\). They also underlie primality tests.</p>`,
      body: T`
<p><b>Fermat's little theorem.</b> For prime \(p\) and \(p \nmid a\): \(a^{p-1} \equiv 1 \pmod p\). Equivalently \(a^p \equiv a\) for all \(a\).</p>
<p><b>Euler's theorem.</b> For \(\gcd(a, n) = 1\): \(a^{\varphi(n)} \equiv 1 \pmod n\), with \(\varphi(n)\) the count of residues coprime to \(n\):</p>
\[\varphi(n) = n\prod_{p\mid n}\left(1 - \tfrac1p\right),\qquad \varphi(p^k) = p^k - p^{k-1}\]
<p><b>Reducing exponents.</b> \(a^e \equiv a^{e \bmod \varphi(n)} \pmod n\) when \(\gcd(a, n) = 1\). \(7^{222} \bmod 10\): \(\varphi(10) = 4\), \(222 \equiv 2\), so \(7^2 = 49 \equiv 9\).</p>
<p><b>Wilson's theorem.</b> \(p\) is prime iff \((p - 1)! \equiv -1 \pmod p\). The factors pair with their inverses, leaving only \(1\) and \(p - 1\). Corollary: \((p - 2)! \equiv 1 \pmod p\).</p>
<p><b>Fermat test.</b> If \(a^{n-1} \not\equiv 1 \pmod n\), then \(n\) is composite. The converse fails for Carmichael numbers like 561, which is why practical tests (Miller–Rabin) add a square-root check.</p>`,
      ex: { q: T`Find \(2^{100} \bmod 13\) and \(11! \bmod 13\).`, a: T`<p>\(2^{12} \equiv 1\); \(100 = 8\cdot12 + 4\), so \(2^{100} \equiv 2^4 = 16 \equiv 3\).</p><p>Wilson: \(12! \equiv -1\), and \(12 \equiv -1\), so \(11! \equiv 1\).</p>` },
      trap: T`Reducing an exponent mod \(n\) instead of mod \(\varphi(n)\).`,
      vary: [[T`\(\varphi(36)\)?`, 12, T`\(36\cdot\frac12\cdot\frac23\).`], [T`\(5^{18} \bmod 7\)?`, 1, T`\(18 = 3\cdot6\).`], [T`\(6! \bmod 7\)?`, 6, T`\(-1\).`], [T`\(\varphi(101)\)?`, 100, T`101 is prime.`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Functions like \(\tau\), \(\sigma\), \(\varphi\), and \(\mu\) are multiplicative: their value on \(n\) is the product of their values on the prime powers. Perfect numbers and Möbius inversion follow from that one property.</p>`,
      body: T`
<p>\(f\) is <b>multiplicative</b> if \(f(mn) = f(m)f(n)\) whenever \(\gcd(m, n) = 1\). So \(f\) is determined by its values on prime powers.</p>
<table class="tt"><tr><th>Function</th><th>On \(p^k\)</th></tr>
<tr><td>\(\tau(n)\), number of divisors</td><td>\(k + 1\)</td></tr>
<tr><td>\(\sigma(n)\), sum of divisors</td><td>\(1 + p + \cdots + p^k\)</td></tr>
<tr><td>\(\varphi(n)\), totient</td><td>\(p^k - p^{k-1}\)</td></tr>
<tr><td>\(\mu(n)\), Möbius</td><td>\(-1\) if \(k = 1\), 0 if \(k \ge 2\)</td></tr></table>
<p>So \(\mu(n) = 0\) if a square divides \(n\), and otherwise \((-1)^{\text{number of primes}}\): \(\mu(30) = -1\), \(\mu(6) = 1\), \(\mu(12) = 0\).</p>
<p><b>Identities.</b> \(\sum_{d\mid n}\varphi(d) = n\). \(\sum_{d\mid n}\mu(d) = 0\) for \(n > 1\). <b>Möbius inversion:</b> if \(g(n) = \sum_{d\mid n}f(d)\), then \(f(n) = \sum_{d\mid n}\mu(d)g\!\left(\frac nd\right)\).</p>
<p><b>Perfect, abundant, deficient.</b> Compare \(\sigma(n)\) with \(2n\): equal is perfect (6, 28, 496, 8128), larger is abundant (12, 18, 20), smaller is deficient (primes, prime powers). Euclid–Euler: even perfect numbers are exactly \(2^{p-1}(2^p - 1)\) with \(2^p - 1\) prime.</p>`,
      ex: { q: T`Classify 945 as perfect, abundant, or deficient.`, a: T`<p>\(945 = 3^3\cdot5\cdot7\). \(\sigma = 40\cdot6\cdot8 = 1920 > 1890 = 2\cdot945\). Abundant; it is the smallest odd abundant number.</p>` },
      trap: T`Applying multiplicativity to non-coprime factors: \(\tau(4) = 3\), not \(\tau(2)\tau(2) = 4\).`,
      vary: [[T`\(\mu(42)\)?`, -1, T`Three primes.`], [T`\(\mu(50)\)?`, 0, T`25 divides it.`], [T`\(\sigma(28)\)?`, 56, T`Perfect.`], [T`\(\sum_{d\mid 36}\varphi(d)\)?`, 36, T`Always \(n\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>The multiplicative order of \(a\) mod \(n\) is the length of the cycle of its powers. When some \(a\) cycles through every unit, it is a primitive root, and the units mod \(n\) form a cyclic group.</p>`,
      body: T`
<p><b>Order:</b> \(\text{ord}_n(a)\) is the least \(k \ge 1\) with \(a^k \equiv 1 \pmod n\). It divides \(\varphi(n)\), and \(a^m \equiv 1\) iff \(\text{ord}_n(a) \mid m\). So to find the order, test only divisors of \(\varphi(n)\).</p>
<p><b>Primitive root:</b> \(g\) with \(\text{ord}_n(g) = \varphi(n)\). Primitive roots exist exactly for \(n = 1, 2, 4, p^k, 2p^k\) (\(p\) an odd prime). When they exist, there are \(\varphi(\varphi(n))\) of them.</p>
<p><b>Test:</b> \(g\) is a primitive root mod \(p\) iff \(g^{(p-1)/q} \not\equiv 1\) for every prime \(q \mid p - 1\). Mod 11: \(p - 1 = 10\), check exponents 5 and 2. \(2^5 = 32 \equiv 10\), \(2^2 = 4\): 2 is a primitive root.</p>
<p><b>Decimal periods</b> are orders: the period of \(\frac1p\) is \(\text{ord}_p(10)\). Full-period primes (7, 17, 19, 23, 29, ...) are those with 10 a primitive root.</p>
<p><b>Discrete logarithm.</b> With a primitive root \(g\), each unit is \(g^k\) for one \(k\) mod \(\varphi(n)\). Computing \(k\) is believed hard for large \(p\), which secures Diffie–Hellman.</p>`,
      ex: { q: T`Find \(\text{ord}_{13}(5)\) and the smallest primitive root mod 13.`, a: T`<p>Divisors of 12: \(5^2 = 25 \equiv 12\), \(5^4 \equiv 144 \equiv 1\). Order 4.</p><p>2: \(2^{6} = 64 \equiv 12\), \(2^4 = 16 \equiv 3\), neither is 1, so 2 has order 12: the smallest primitive root.</p>` },
      trap: T`Testing all exponents up to \(\varphi(n)\). The order must divide \(\varphi(n)\), so check only divisors.`,
      vary: [[T`\(\text{ord}_7(2)\)?`, 3, T`\(2^3 = 8\).`], [T`Primitive roots mod 13?`, 4, T`\(\varphi(12)\).`], [T`Does 8 have a primitive root? 1 yes, 0 no.`, 0, T`\(U(8)\) has no element of order 4.`], [T`Smallest primitive root mod 7?`, 3, T`\(2\) has order 3.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Which numbers are perfect squares mod \(p\)? Half the nonzero residues are, and Gauss's law of quadratic reciprocity, which he called the golden theorem, links the answer mod \(p\) with the answer mod \(q\).</p>`,
      body: T`
<p>\(a\) is a <b>quadratic residue</b> mod \(p\) if \(x^2 \equiv a\) has a solution. Mod an odd prime \(p\), exactly \(\frac{p-1}{2}\) nonzero residues are squares. Mod 7: \(1, 4, 2\).</p>
<p><b>Legendre symbol</b> \(\left(\frac ap\right)\): \(1\) for a nonzero square, \(-1\) for a non-square, 0 if \(p \mid a\). The equation \(x^2 \equiv a \pmod p\) has \(1 + \left(\frac ap\right)\) solutions.</p>
<p><b>Euler's criterion:</b> \(\left(\frac ap\right) \equiv a^{(p-1)/2} \pmod p\). The symbol is multiplicative in \(a\).</p>
<table class="tt"><tr><th>Rule</th><th>Value</th></tr>
<tr><td>\(\left(\frac{-1}{p}\right)\)</td><td>\(1\) iff \(p \equiv 1 \pmod 4\)</td></tr>
<tr><td>\(\left(\frac{2}{p}\right)\)</td><td>\(1\) iff \(p \equiv \pm1 \pmod 8\)</td></tr>
<tr><td>Reciprocity, odd primes \(p \ne q\)</td><td>\(\left(\frac pq\right)\left(\frac qp\right) = (-1)^{\frac{p-1}{2}\frac{q-1}{2}}\)</td></tr></table>
<p>So \(\left(\frac pq\right) = \left(\frac qp\right)\) unless both are \(\equiv 3 \pmod 4\), when they are opposite.</p>
<p><b>Example.</b> \(\left(\frac{3}{11}\right)\): both \(\equiv 3 \pmod 4\), so \(= -\left(\frac{11}{3}\right) = -\left(\frac{2}{3}\right) = -(-1) = 1\). Check: \(5^2 = 25 \equiv 3\).</p>`,
      ex: { q: T`Is 5 a square mod 29? Is 2?`, a: T`<p>\(29 \equiv 1 \pmod 4\), so \(\left(\frac5{29}\right) = \left(\frac{29}5\right) = \left(\frac45\right) = 1\). Yes: \(11^2 = 121 \equiv 5\).</p><p>\(29 \equiv 5 \pmod 8\), so \(\left(\frac2{29}\right) = -1\). No.</p>` },
      trap: T`Applying reciprocity to a composite top: factor first, \(\left(\frac{6}{p}\right) = \left(\frac2p\right)\left(\frac3p\right)\).`,
      vary: [[T`\(\left(\frac{-1}{13}\right)\)?`, 1, T`\(13 \equiv 1 \pmod 4\).`], [T`\(\left(\frac{2}{7}\right)\)?`, 1, T`\(7 \equiv -1 \pmod 8\); \(3^2 \equiv 2\).`], [T`Solutions of \(x^2 \equiv 3 \pmod 7\)?`, 0, T`Squares are 1, 2, 4.`], [T`Nonzero quadratic residues mod 23?`, 11, T`\(\frac{22}{2}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>A Diophantine equation asks for integer solutions. Linear ones are solved completely by Euclid; quadratic ones lead to Pythagorean triples, sums of squares, and Pell's equation.</p>`,
      body: T`
<p><b>Linear:</b> \(ax + by = c\) with \(g = \gcd(a, b) \mid c\). From one solution \((x_0, y_0)\), all are \(x = x_0 + \frac bg t\), \(y = y_0 - \frac ag t\). To count nonnegative solutions, find the range of \(t\) keeping both coordinates \(\ge 0\). (For small cases: list \(y = 0, 1, 2, \ldots\) and test.)</p>
<p><b>Pythagorean triples.</b> Every primitive triple is \((m^2 - n^2,\ 2mn,\ m^2 + n^2)\) with \(m > n > 0\) coprime and of opposite parity. \((m, n) = (2, 1)\) gives \((3, 4, 5)\); \((3, 2)\) gives \((5, 12, 13)\); \((4, 1)\) gives \((15, 8, 17)\).</p>
<p><b>Sums of two squares</b> (Fermat). A prime \(p\) is \(a^2 + b^2\) iff \(p = 2\) or \(p \equiv 1 \pmod 4\). An integer is a sum of two squares iff every prime \(\equiv 3 \pmod 4\) appears to an even power: \(45 = 3^2\cdot5 = 36 + 9\) works; \(21 = 3\cdot7\) does not. Every positive integer is a sum of four squares (Lagrange).</p>
<p><b>Pell's equation</b> \(x^2 - Dy^2 = 1\) (\(D\) not a square) has infinitely many solutions. The smallest comes from a convergent of the continued fraction of \(\sqrt D\), and the rest from powers \((x_1 + y_1\sqrt D)^k\). \(D = 2\): \((3, 2)\); \(D = 3\): \((2, 1)\); \(D = 7\): \((8, 3)\); \(D = 13\): \((649, 180)\).</p>
<p><b>No solutions by congruences.</b> \(x^2 + y^2 = 4k + 3\) is impossible because squares are 0 or 1 mod 4. Fermat's last theorem (\(x^n + y^n = z^n\), \(n \ge 3\)) was proved by Wiles in 1995.</p>`,
      ex: { q: T`How many solutions in nonnegative integers does \(3x + 5y = 47\) have?`, a: T`<p>\(y\) must make \(47 - 5y\) divisible by 3: \(47 - 5y \equiv 2 - 2y \equiv 0 \pmod 3\), so \(y \equiv 1\). \(y = 1, 4, 7\) give \(x = 14, 9, 4\); \(y = 10\) is too big. Three solutions.</p>` },
      trap: T`Producing triples from \(m, n\) of the same parity and calling them primitive: \((3, 1)\) gives \((8, 6, 10)\), twice \((4, 3, 5)\).`,
      vary: [[T`Hypotenuse from \((m, n) = (5, 2)\)?`, 29, T`\(25 + 4\).`], [T`Smallest \(x > 1\) with \(x^2 - 5y^2 = 1\)?`, 9, T`\(81 - 80\).`], [T`Is 61 a sum of two squares? 1 yes, 0 no.`, 1, T`\(61 \equiv 1 \pmod 4\): \(25 + 36\).`], [T`Is 63 a sum of two squares? 1 yes, 0 no.`, 0, T`\(63 = 3^2\cdot7\), and 7 appears once.`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Public-key cryptography runs on number theory: multiplying primes is easy and factoring their product is hard, and exponentiation mod \(p\) is easy while undoing it is hard.</p>`,
      body: T`
<h4>RSA</h4>
<ol><li>Choose primes \(p, q\); set \(n = pq\) and \(\varphi(n) = (p - 1)(q - 1)\).</li>
<li>Choose \(e\) coprime to \(\varphi(n)\); compute \(d \equiv e^{-1} \pmod{\varphi(n)}\).</li>
<li>Public key \((n, e)\). Encrypt \(c = m^e \bmod n\); decrypt \(m = c^d \bmod n\).</li></ol>
<p>Decryption works by Euler: \(ed = 1 + k\varphi(n)\), so \(m^{ed} = m\cdot(m^{\varphi(n)})^k \equiv m\).</p>
<p><b>Example.</b> \(p = 5\), \(q = 11\): \(n = 55\), \(\varphi = 40\). \(e = 3\): \(d = 27\) since \(3\cdot27 = 81 \equiv 1 \pmod{40}\). Message 2: \(c = 8\); \(8^{27} \bmod 55 = 2\).</p>
<h4>Diffie–Hellman key exchange</h4>
<p>Public: prime \(p\) and generator \(g\). Alice picks secret \(a\) and sends \(A = g^a\); Bob picks \(b\) and sends \(B = g^b\). Both compute \(K = B^a = A^b = g^{ab} \pmod p\). An eavesdropper sees \(g^a\) and \(g^b\) but would need a discrete logarithm.</p>
<p><b>Security</b> rests on factoring \(n\) (RSA) and discrete logs (DH), both believed hard classically. Shor's quantum algorithm would solve both efficiently, which drives post-quantum cryptography.</p>`,
      ex: { q: T`Diffie–Hellman with \(p = 23\), \(g = 5\), \(a = 6\), \(b = 15\). Find the shared key.`, a: T`<p>\(A = 5^6 \bmod 23 = 8\). \(B = 5^{15} \bmod 23 = 19\). \(K = 19^6 \bmod 23 = 2\), and \(8^{15} \bmod 23 = 2\) agrees.</p>` },
      trap: T`Computing \(d\) as an inverse mod \(n\). It is the inverse mod \(\varphi(n)\).`,
      vary: [[T`RSA with \(p = 3\), \(q = 11\): \(\varphi(n)\)?`, 20, T`\(2\cdot10\).`], [T`RSA with \(\varphi(n) = 20\), \(e = 3\): \(d\)?`, 7, T`\(21 \equiv 1\).`], [T`Encrypt \(m = 4\) with \(n = 33\), \(e = 3\).`, 31, T`\(64 \bmod 33\).`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>Primes look random up close but follow precise laws at scale. Around \(x\), roughly one number in \(\ln x\) is prime.</p>`,
      body: T`
<p><b>Counting function</b> \(\pi(x)\) = number of primes \(\le x\): \(\pi(10) = 4\), \(\pi(100) = 25\), \(\pi(1000) = 168\).</p>
<p><b>Prime number theorem</b> (Hadamard, de la Vallée Poussin, 1896):</p>
\[\pi(x) \sim \frac{x}{\ln x}\]
<p>meaning the ratio tends to 1. \(\frac{1000}{\ln 1000} \approx 145\) versus 168; the logarithmic integral \(\text{li}(x)\) is far more accurate. The \(n\)th prime is about \(n\ln n\).</p>
<p><b>Gaps.</b> \(n! + 2, \ldots, n! + n\) are \(n - 1\) consecutive composites, so gaps are unbounded. Bertrand: there is always a prime between \(n\) and \(2n\). Twin primes are conjectured infinite; Zhang (2013) proved infinitely many gaps below 70 million, since lowered to 246.</p>
<p><b>Euler and the zeta function.</b> \(\zeta(s) = \sum\frac1{n^s} = \prod_p\frac{1}{1 - p^{-s}}\), an identity equivalent to unique factorization. \(\zeta(2) = \frac{\pi^2}{6}\), and the probability that two random integers are coprime is \(\frac{1}{\zeta(2)} = \frac{6}{\pi^2} \approx 0.608\). \(\sum\frac1p\) diverges, a stronger form of Euclid's theorem.</p>
<p><b>Dirichlet's theorem.</b> If \(\gcd(a, m) = 1\), infinitely many primes are \(\equiv a \pmod m\), evenly split among the \(\varphi(m)\) classes. <b>Riemann hypothesis:</b> all nontrivial zeros of \(\zeta\) have real part \(\frac12\), equivalent to \(|\pi(x) - \text{li}(x)| = O(\sqrt x\ln x)\). Unsolved.</p>`,
      ex: { q: T`Estimate the number of primes below \(10^6\) with the prime number theorem.`, a: T`<p>\(\frac{10^6}{\ln 10^6} = \frac{10^6}{13.82} \approx 72{,}382\). The true count is 78,498.</p>` },
      trap: T`Reading \(\pi(x) \sim \frac{x}{\ln x}\) as an equality; it only says the ratio tends to 1, and the difference grows.`,
      vary: [[T`\(\pi(30)\)?`, 10, T`2, 3, 5, 7, 11, 13, 17, 19, 23, 29.`], [T`\(\pi(50)\)?`, 15, T`Add 31, 37, 41, 43, 47.`], [T`Probability two random integers are coprime, three decimals?`, 6 / Math.PI ** 2, T`\(\frac6{\pi^2}\).`], [T`\(\frac{100}{\ln100}\), one decimal?`, 100 / Math.log(100), T`Versus \(\pi(100) = 25\).`]] }
  ]);

  addQuestions('nt', [
    { id: 'nt1', skill: U[0], q: T`\(ax + by = c\) has an integer solution exactly when:`, c: [T`\(\gcd(a, b)\) divides \(c\)`, T`\(c\) divides \(ab\)`, T`\(a\) and \(b\) are prime`, T`\(c > 0\)`], x: T`Bézout: the combinations of \(a\) and \(b\) are exactly the multiples of their gcd.` },
    { id: 'nt2', skill: U[1], q: T`A positive integer has an odd number of divisors exactly when it is:`, c: ['a perfect square', 'odd', 'prime', 'a power of 2'], x: T`Divisors pair as \(d\) and \(\frac nd\), except \(\sqrt n\).` },
    { id: 'nt3', skill: U[3], q: T`The Chinese remainder theorem requires the moduli to be:`, c: ['pairwise coprime', 'prime', 'equal', 'odd'], x: T`Otherwise a system may be inconsistent.` },
    { id: 'nt4', skill: U[4], q: T`561 satisfies \(a^{560} \equiv 1 \pmod{561}\) for every \(a\) coprime to 561, yet \(561 = 3\cdot11\cdot17\). Such numbers are called:`, c: ['Carmichael numbers', 'Mersenne primes', 'perfect numbers', 'Fermat primes'], x: T`They fool the Fermat test.` },
    { id: 'nt5', skill: U[6], q: T`For which modulus does a primitive root exist?`, c: ['18', '8', '12', '15'], x: T`\(18 = 2\cdot3^2\) has the form \(2p^k\).` },
    { id: 'nt6', skill: U[7], q: T`For an odd prime \(p\), \(-1\) is a quadratic residue exactly when:`, c: [T`\(p \equiv 1 \pmod 4\)`, T`\(p \equiv 3 \pmod 4\)`, T`\(p \equiv 1 \pmod 8\)`, 'always'], x: T`Euler's criterion: \((-1)^{(p-1)/2}\).` },
    { id: 'nt7', skill: U[8], q: T`Which prime is a sum of two squares?`, c: ['13', '7', '11', '19'], x: T`\(13 = 4 + 9\); primes \(\equiv 3 \pmod 4\) are not.` },
    { id: 'nt8', skill: U[9], q: T`The security of RSA rests on the difficulty of:`, c: ['factoring n = pq', 'computing gcds', 'modular exponentiation', 'testing primality'], x: T`Knowing \(p\) and \(q\) gives \(\varphi(n)\) and hence \(d\).` },
    { id: 'nt9', skill: U[10], q: T`The prime number theorem says \(\pi(x)\) is asymptotic to:`, c: [T`\(\frac{x}{\ln x}\)`, T`\(\sqrt x\)`, T`\(\frac x2\)`, T`\(x\ln x\)`], x: T`Density about \(\frac{1}{\ln x}\) near \(x\).` }
  ]);

  // ======================= GENERATORS =======================
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const fac = n => { const f = {}; for (let p = 2; n > 1; p++) while (n % p === 0) { f[p] = (f[p] || 0) + 1; n /= p; } return f; };
  const ftex = n => Object.entries(fac(n)).map(([p, e]) => (e > 1 ? `${p}^{${e}}` : p)).join('\\cdot');
  const phi = n => Object.keys(fac(n)).reduce((r, p) => (r / p) * (p - 1), n);
  const pw = (a, e, m) => { let r = 1, b = a % m; while (e > 0) { if (e & 1) r = (r * b) % m; b = (b * b) % m; e >>= 1; } return r; };
  const isP = n => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
  const PR = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  const ordm = (a, n) => { let k = 1, x = a % n; while (x !== 1) { x = (x * a) % n; k++; } return k; };

  registerUnitGens('nt', { units: {
    [U[0]]: [
      { id: 'nt-gcd', make(R) {
        const g = R.int(1, 30), a = g * R.int(2, 40), b = g * R.int(2, 40); if (a === b) return this.make(R);
        const steps = []; let x = Math.max(a, b), y = Math.min(a, b); while (y) { steps.push(`${x} = ${Math.floor(x / y)}\\cdot${y} + ${x % y}`); [x, y] = [y, x % y]; }
        return { q: T`Find \(\gcd(${a}, ${b})\) with the Euclidean algorithm.`, answer: x, x: T`\(${steps.join(';\\ ')}\). The last nonzero remainder is ${x}.`, v: `igcd(${a}, ${b})` };
      } },
      { id: 'nt-bez', make(R) {
        let a, b; do { a = R.int(10, 99); b = R.int(10, 99); } while (a === b || gcd(a, b) > 6);
        const g = gcd(a, b), m = b / g; let x = 0; while ((a * x - g) % b !== 0) x++;
        return { q: T`\(\gcd(${a}, ${b}) = ${g}\). Find the integer \(x\) with \(0 \le x < ${m}\) such that \(${a}x + ${b}y = ${g}\) for some integer \(y\).`, answer: x, x: T`Back-substitute Euclid's algorithm, then reduce mod \(\frac{${b}}{${g}} = ${m}\): \(x = ${x}\), \(y = ${(g - a * x) / b}\). Check: \(${a}\cdot${x} + ${b}\cdot(${(g - a * x) / b}) = ${g}\).`, v: `mod_inverse(${a / g}, ${m}) if ${m} > 1 else 0` };
      } }
    ],
    [U[1]]: [
      { id: 'nt-tau', make(R) {
        const n = R.pick([2, 2, 3, 6, 12, 10, 18, 20]) * R.pick([1, 2, 3, 4, 5, 6, 7, 9]) * R.pick([1, 2, 3, 5]), k = R.int(0, 1);
        const f = fac(n), tau = Object.values(f).reduce((s, e) => s * (e + 1), 1), sig = Object.entries(f).reduce((s, [p, e]) => s * ((p ** (e + 1) - 1) / (p - 1)), 1);
        return { q: k ? T`Find \(\sigma(${n})\), the sum of the positive divisors of ${n}.` : T`How many positive divisors does ${n} have?`, answer: k ? sig : tau,
          x: k ? T`\(${n} = ${ftex(n)}\): \(\sigma = ${Object.entries(f).map(([p, e]) => `\\frac{${p}^{${e + 1}} - 1}{${p} - 1}`).join('\\cdot')} = ${sig}\).` : T`\(${n} = ${ftex(n)}\): \(\tau = ${Object.values(f).map(e => `(${e} + 1)`).join('')} = ${tau}\).`,
          v: k ? `divisor_sigma(${n})` : `len([d for d in range(1, ${n + 1}) if ${n} % d == 0])` };
      } },
      { id: 'nt-leg', make(R) {
        const p = R.pick([2, 3, 5, 5, 7]), n = R.int(10, 200); let s = 0; const t = []; for (let q = p; q <= n; q *= p) { s += Math.floor(n / q); t.push(Math.floor(n / q)); }
        return { q: p === 5 && R.int(0, 1) ? T`How many trailing zeros does \(${n}!\) have?` : T`Find the exponent of ${p} in the prime factorization of \(${n}!\).`, answer: s, x: T`Legendre: \(${t.join(' + ')} = ${s}\).`, v: `multiplicity(${p}, factorial(${n}))` };
      } }
    ],
    [U[2]]: [
      { id: 'nt-pow', make(R) {
        const k = R.int(0, 2);
        if (k === 0) { const n = R.int(5, 30), a = R.int(2, 20), e = R.int(20, 300); return { q: T`Compute \(${a}^{${e}} \bmod ${n}\).`, answer: pw(a, e, n), x: T`Repeated squaring, reducing mod ${n} at each step, gives ${pw(a, e, n)}.`, v: `pow(${a}, ${e}, ${n})` }; }
        if (k === 1) { const a = R.int(2, 9), e = R.int(20, 999); return { q: T`Find the last digit of \(${a}^{${e}}\).`, answer: pw(a, e, 10), x: T`Last digits of powers of ${a} cycle; the cycle gives ${pw(a, e, 10)}.`, v: `pow(${a}, ${e}, 10)` }; }
        const a = R.pick([3, 7, 11, 13, 17, 19, 21]), e = R.int(10, 200);
        return { q: T`Find the last two digits of \(${a}^{${e}}\). (Enter a number from 0 to 99.)`, answer: pw(a, e, 100), x: T`Work mod 100 by repeated squaring: ${String(pw(a, e, 100)).padStart(2, '0')}.`, v: `pow(${a}, ${e}, 100)` };
      } },
      { id: 'nt-dig', make(R) {
        const m = R.pick([9, 11, 3]), n = R.int(10000, 9999999), ds = String(n).split('').map(Number);
        const alt = ds.reverse().reduce((s, d, i) => s + (i % 2 ? -d : d), 0);
        return { q: T`Find \(${n} \bmod ${m}\) using a digit test.`, answer: n % m, x: m === 11 ? T`Alternating sum from the units digit: ${alt}, and \(${alt} \bmod 11 = ${n % 11}\).` : T`Digit sum ${ds.reduce((s, d) => s + d, 0)}, and its remainder mod ${m} is ${n % m}.`, v: `${n} % ${m}` };
      } }
    ],
    [U[3]]: [
      { id: 'nt-lin', make(R) {
        const n = R.int(6, 40), a = R.int(2, n - 1), g = gcd(a, n), b = (g * R.int(0, n / g - 1) + (R.int(0, 4) ? 0 : 1)) % n;
        const sols = [...Array(n).keys()].filter(x => (a * x - b) % n === 0), ask = R.int(0, 1);
        if (!sols.length || ask) return { q: T`How many solutions does \(${a}x \equiv ${b} \pmod{${n}}\) have in \(\{0, 1, \ldots, ${n - 1}\}\)?`, answer: sols.length, x: T`\(\gcd(${a}, ${n}) = ${g}\). ${b % g ? `${g} does not divide ${b}: no solutions.` : `${g} divides ${b}, so there are ${g} solutions: ${sols.join(', ')}.`}`, v: `len([x for x in range(${n}) if (${a}*x - ${b}) % ${n} == 0])` };
        return { q: T`Find the smallest nonnegative solution of \(${a}x \equiv ${b} \pmod{${n}}\).`, answer: sols[0], x: T`\(\gcd(${a}, ${n}) = ${g}\). Divide by ${g} and invert ${a / g} mod ${n / g}; the solution${sols.length > 1 ? 's are' : ' is'} ${sols.join(', ')}.`, v: `min(x for x in range(${n}) if (${a}*x - ${b}) % ${n} == 0)` };
      } },
      { id: 'nt-crt', make(R) {
        const mods = R.int(0, 1) ? R.sample([3, 4, 5, 7, 11], 2) : R.sample([3, 4, 5, 7], 3);
        if (mods.some((m, i) => mods.some((q, j) => j > i && gcd(m, q) > 1))) return this.make(R);
        const N = mods.reduce((s, m) => s * m, 1), x = R.int(0, N - 1), rs = mods.map(m => x % m);
        return { q: T`Find the smallest nonnegative \(x\) with ${mods.map((m, i) => T`\(x \equiv ${rs[i]} \pmod{${m}}\)`).join(', ')}.`, answer: x, x: T`The moduli are coprime, so there is one solution mod ${N}. Substituting step by step gives \(x = ${x}\). Check: ${mods.map((m, i) => `${x} mod ${m} = ${rs[i]}`).join('; ')}.`, v: `crt([${mods}], [${rs}])[0]` };
      } }
    ],
    [U[4]]: [
      { id: 'nt-eul', make(R) {
        const k = R.int(0, 2);
        if (k === 0) { const n = R.int(10, 200); return { q: T`Compute \(\varphi(${n})\).`, answer: phi(n), x: T`\(${n} = ${ftex(n)}\), so \(\varphi = ${n}${Object.keys(fac(n)).map(p => `\\left(1 - \\frac1{${p}}\\right)`).join('')} = ${phi(n)}\).`, v: `totient(${n})` }; }
        if (k === 1) { const n = R.pick([10, 12, 14, 15, 18, 20, 21, 22, 25, 26, 7, 11, 13, 17]); let a; do { a = R.int(2, 30); } while (gcd(a, n) !== 1); const e = R.int(100, 5000), f = phi(n);
          return { q: T`Compute \(${a}^{${e}} \bmod ${n}\) using Euler's theorem.`, answer: pw(a, e, n), x: T`\(\varphi(${n}) = ${f}\) and \(${e} \equiv ${e % f} \pmod{${f}}\), so \(${a}^{${e}} \equiv ${a}^{${e % f}} \equiv ${pw(a, e, n)}\).`, v: `pow(${a}, ${e}, ${n})` }; }
        const p = R.pick(PR.slice(2, 12)), j = R.int(1, 3), f = (n => { let r = 1; for (let i = 2; i <= n; i++) r = (r * i) % p; return r; })(p - j);
        return { q: T`Compute \((${p} - ${j})! \bmod ${p}\).`, answer: f, x: T`Wilson: \(${p - 1}! \equiv -1\). ${j === 1 ? 'So the answer is ' + (p - 1) + '.' : j === 2 ? `Divide by \\(${p - 1} \\equiv -1\\): \\(${p - 2}! \\equiv 1\\).` : `Divide by \\((${p - 1})(${p - 2}) \\equiv (-1)(-2) = 2\\): \\(${p - 3}! \\equiv -2^{-1} \\equiv ${f}\\).`}`, v: `factorial(${p - j}) % ${p}` };
      } }
    ],
    [U[5]]: [
      { id: 'nt-mu', make(R) {
        const n = R.int(2, 200);
        return { q: T`Compute the Möbius function \(\mu(${n})\).`, answer: (f => (Object.values(f).some(e => e > 1) ? 0 : Object.keys(f).length % 2 ? -1 : 1))(fac(n)), x: T`\(${n} = ${ftex(n)}\). ${Object.values(fac(n)).some(e => e > 1) ? 'A square divides it: 0.' : `Square-free with ${Object.keys(fac(n)).length} prime${Object.keys(fac(n)).length > 1 ? 's' : ''}: \\((-1)^{${Object.keys(fac(n)).length}}\\).`}`, v: `mobius(${n})` };
      } },
      { id: 'nt-perf', make(R) {
        const n = R.pick([6, 28, 496, 12, 18, 20, 24, 30, 36, 40, 945, 8, 9, 10, 14, 15, 16, 21, 25, 27, 49, 70, 100, 8128, 120, 50]);
        const s = Object.entries(fac(n)).reduce((t, [p, e]) => t * ((p ** (e + 1) - 1) / (p - 1)), 1), w = s === 2 * n ? 'Perfect' : s > 2 * n ? 'Abundant' : 'Deficient';
        return { q: T`Is ${n} perfect, abundant, or deficient?`, c: [w, ...['Perfect', 'Abundant', 'Deficient'].filter(z => z !== w)], x: T`\(\sigma(${n}) = ${s}\) and \(2\cdot${n} = ${2 * n}\).`, key: w, vk: `(lambda s: 'Perfect' if s == ${2 * n} else 'Abundant' if s > ${2 * n} else 'Deficient')(sum(d for d in range(1, ${n + 1}) if ${n} % d == 0))` };
      } }
    ],
    [U[6]]: [
      { id: 'nt-ord', make(R) {
        const p = R.pick(PR.slice(1, 16)), a = R.int(2, p - 2), o = ordm(a, p), ask = R.int(0, 2);
        if (ask === 0) return { q: T`Find \(\text{ord}_{${p}}(${a})\).`, answer: o, x: T`The order divides \(${p - 1}\). Testing divisors, \(${a}^{${o}} \equiv 1\) first at ${o}.`, v: `n_order(${a}, ${p})` };
        if (ask === 1) { let g = 2; while (ordm(g, p) !== p - 1) g++; return { q: T`Find the smallest primitive root modulo ${p}.`, answer: g, x: T`Check \(g^{(${p - 1})/q} \not\equiv 1\) for each prime \(q \mid ${p - 1}\). ${g > 2 ? `Every smaller candidate fails; ${g} passes.` : '2 passes.'}`, v: `primitive_root(${p})` }; }
        return { q: T`How many primitive roots are there modulo ${p}?`, answer: phi(p - 1), x: T`\(\varphi(\varphi(${p})) = \varphi(${p - 1}) = ${phi(p - 1)}\).`, v: `sum(1 for g in range(1, ${p}) if n_order(g, ${p}) == ${p - 1})` };
      } },
      { id: 'nt-prex', make(R) {
        const n = R.int(5, 60), f = fac(n), ks = Object.keys(f).map(Number), odd = ks.filter(p => p > 2);
        const has = n === 2 || n === 4 || (odd.length === 1 && (f[2] || 0) <= 1);
        return { q: T`Does ${n} have a primitive root?`, c: has ? ['Yes', 'No'] : ['No', 'Yes'], x: T`\(${n} = ${ftex(n)}\). Primitive roots exist only for \(1, 2, 4, p^k, 2p^k\). ${has ? 'It has that form.' : 'It does not have that form.'}`, key: has ? 'Yes' : 'No', vk: `'Yes' if any(n_order(g, ${n}) == totient(${n}) for g in range(1, ${n}) if igcd(g, ${n}) == 1) else 'No'` };
      } }
    ],
    [U[7]]: [
      { id: 'nt-qr', make(R) {
        const p = R.pick(PR.slice(1)); let a; do { a = R.int(2, p - 1); } while (!a);
        const e = pw(a, (p - 1) / 2, p), L = e === 1 ? 1 : -1, ask = R.int(0, 2);
        if (ask === 0) return { q: T`Compute the Legendre symbol \(\left(\frac{${a}}{${p}}\right)\). (Enter 1 or \(-1\).)`, answer: L, x: T`Euler's criterion: \(${a}^{${(p - 1) / 2}} \equiv ${e === 1 ? 1 : -1} \pmod{${p}}\).`, v: `legendre_symbol(${a}, ${p})` };
        if (ask === 1) return { q: T`How many solutions does \(x^2 \equiv ${a} \pmod{${p}}\) have in \(\{0, \ldots, ${p - 1}\}\)?`, answer: 1 + L, x: T`\(1 + \left(\frac{${a}}{${p}}\right) = ${1 + L}\), since \(${a}^{${(p - 1) / 2}} \equiv ${L} \pmod{${p}}\).`, v: `len([x for x in range(${p}) if (x*x - ${a}) % ${p} == 0])` };
        const q = R.pick([-1, 2]), Lq = q === -1 ? (p % 4 === 1 ? 1 : -1) : ([1, 7].includes(p % 8) ? 1 : -1);
        return { q: T`Is \(${q}\) a quadratic residue modulo ${p}?`, c: Lq === 1 ? ['Yes', 'No'] : ['No', 'Yes'], x: q === -1 ? T`\(${p} \equiv ${p % 4} \pmod 4\): ${Lq === 1 ? 'yes' : 'no'}.` : T`\(${p} \equiv ${p % 8} \pmod 8\): ${Lq === 1 ? 'yes' : 'no'}.`, key: Lq === 1 ? 'Yes' : 'No', vk: `'Yes' if any((x*x - (${q})) % ${p} == 0 for x in range(${p})) else 'No'` };
      } },
      { id: 'nt-recip', make(R) {
        let p, q; do { p = R.pick(PR.slice(1, 10)); q = R.pick(PR.slice(3, 20)); } while (p >= q);
        const L = pw(p, (q - 1) / 2, q) === 1 ? 1 : -1, flip = p % 4 === 3 && q % 4 === 3;
        return { q: T`Use quadratic reciprocity to compute \(\left(\frac{${p}}{${q}}\right)\). (Enter 1 or \(-1\).)`, answer: L, x: T`${flip ? `Both are \\(\\equiv 3 \\pmod 4\\), so \\(\\left(\\frac{${p}}{${q}}\\right) = -\\left(\\frac{${q}}{${p}}\\right)\\).` : `Not both \\(\\equiv 3 \\pmod 4\\), so \\(\\left(\\frac{${p}}{${q}}\\right) = \\left(\\frac{${q}}{${p}}\\right)\\).`} Reduce the top: \(\left(\frac{${q}}{${p}}\right) = \left(\frac{${q % p}}{${p}}\right) = ${pw(q % p, (p - 1) / 2, p) === 1 ? 1 : -1}\) (Euler's criterion or another round of reciprocity). So \(\left(\frac{${p}}{${q}}\right) = ${L}\).`, v: `legendre_symbol(${p}, ${q})` };
      } }
    ],
    [U[8]]: [
      { id: 'nt-lind', make(R) {
        let a, b; do { a = R.int(2, 9); b = R.int(2, 11); } while (gcd(a, b) > 1 || a === b);
        const c = R.int(a * b, 6 * a * b); let cnt = 0; const ex = []; for (let y = 0; b * y <= c; y++) if ((c - b * y) % a === 0) { cnt++; ex.push(`(${(c - b * y) / a}, ${y})`); }
        return { q: T`How many solutions in nonnegative integers does \(${a}x + ${b}y = ${c}\) have?`, answer: cnt, x: T`Test \(y = 0, 1, 2, \ldots\) while \(${b}y \le ${c}\); the solutions recur every ${a} steps in \(y\): ${ex.join(', ')}.`, v: `sum(1 for y in range(0, ${c}//${b} + 1) if (${c} - ${b}*y) % ${a} == 0)` };
      } },
      { id: 'nt-pyth', make(R) {
        let m, n; do { m = R.int(2, 9); n = R.int(1, m - 1); } while (gcd(m, n) > 1 || (m - n) % 2 === 0);
        const k = R.int(0, 2), tri = [m * m - n * n, 2 * m * n, m * m + n * n];
        return { q: T`The primitive Pythagorean triple from \(m = ${m}\), \(n = ${n}\) is \((m^2 - n^2, 2mn, m^2 + n^2)\). Find ${['the odd leg', 'the even leg', 'the hypotenuse'][k]}.`, answer: tri[k], x: T`\((${tri.join(', ')})\). Check: \(${tri[0]}^2 + ${tri[1]}^2 = ${tri[0] ** 2 + tri[1] ** 2} = ${tri[2]}^2\).`, v: `[${tri}][${k}] if ${tri[0]}**2 + ${tri[1]}**2 == ${tri[2]}**2 and igcd(${tri[0]}, ${tri[1]}) == 1 else -1` };
      } },
      { id: 'nt-pell', make(R) {
        const D = R.pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23, 24]); let y = 1, x; for (; ; y++) { x = Math.round(Math.sqrt(D * y * y + 1)); if (x * x - D * y * y === 1) break; }
        return { q: T`Find the smallest solution of \(x^2 - ${D}y^2 = 1\) with \(y \ge 1\). Enter \(x\).`, answer: x, x: T`Try \(y = 1, 2, \ldots\) (or use the convergents of \(\sqrt{${D}}\)): \(${x}^2 - ${D}\cdot${y}^2 = ${x * x} - ${D * y * y} = 1\).`, v: `min(s[0] for s in diop_DN(${D}, 1))` };
      } },
      { id: 'nt-sq2', make(R) {
        const n = R.int(2, 200), f = fac(n), y = Object.entries(f).every(([p, e]) => +p % 4 !== 3 || e % 2 === 0);
        return { q: T`Is ${n} a sum of two squares of integers (zero allowed)?`, c: y ? ['Yes', 'No'] : ['No', 'Yes'], x: T`\(${n} = ${ftex(n)}\). ${y ? 'Every prime \\(\\equiv 3 \\pmod 4\\) appears to an even power.' : 'A prime \\(\\equiv 3 \\pmod 4\\) appears to an odd power.'}`, key: y ? 'Yes' : 'No', vk: `'Yes' if any(a*a + b*b == ${n} for a in range(15) for b in range(15)) else 'No'` };
      } }
    ],
    [U[9]]: [
      { id: 'nt-rsa', make(R) {
        let p, q; do { p = R.pick([3, 5, 7, 11, 13, 17]); q = R.pick([3, 5, 7, 11, 13, 17, 19, 23]); } while (p === q);
        const n = p * q, f = (p - 1) * (q - 1); let e; do { e = R.pick([3, 5, 7, 11, 13, 17]); } while (gcd(e, f) !== 1 || e >= f);
        let d = 1; while ((e * d) % f !== 1) d++; const k = R.int(0, 2), m = R.int(2, n - 1);
        if (k === 0) return { q: T`RSA with \(p = ${p}\), \(q = ${q}\), \(e = ${e}\). Find the private exponent \(d\) (with \(0 < d < \varphi(n)\)).`, answer: d, x: T`\(\varphi(n) = ${p - 1}\cdot${q - 1} = ${f}\), and \(${e}\cdot${d} = ${e * d} \equiv 1 \pmod{${f}}\).`, v: `mod_inverse(${e}, totient(${n}))` };
        if (k === 1) return { q: T`RSA public key \((n, e) = (${n}, ${e})\). Encrypt the message \(m = ${m}\).`, answer: pw(m, e, n), x: T`\(c = ${m}^{${e}} \bmod ${n} = ${pw(m, e, n)}\).`, v: `pow(${m}, ${e}, ${n})` };
        const c = pw(m, e, n);
        return { q: T`RSA with \(n = ${n} = ${p}\cdot${q}\), \(e = ${e}\). Decrypt the ciphertext \(c = ${c}\).`, answer: m, x: T`\(\varphi = ${f}\), \(d = ${d}\), and \(${c}^{${d}} \bmod ${n} = ${m}\).`, v: `pow(${c}, mod_inverse(${e}, (${p} - 1)*(${q} - 1)), ${n})` };
      } },
      { id: 'nt-dh', make(R) {
        const p = R.pick([11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]); let g = 2; while (ordm(g, p) !== p - 1) g++;
        const a = R.int(2, p - 2), b = R.int(2, p - 2), A = pw(g, a, p), B = pw(g, b, p), K = pw(B, a, p);
        return { q: T`Diffie–Hellman with \(p = ${p}\), \(g = ${g}\). Alice's secret is \(a = ${a}\) and Bob's is \(b = ${b}\). Find the shared key.`, answer: K, x: T`\(A = ${g}^{${a}} \bmod ${p} = ${A}\), \(B = ${g}^{${b}} \bmod ${p} = ${B}\). \(K = B^a = ${B}^{${a}} \bmod ${p} = ${K}\), matching \(A^b\).`, v: `pow(${g}, ${a * b}, ${p})` };
      } }
    ],
    [U[10]]: [{ id: 'nt-pi', make(R) {
      if (R.int(0, 1)) { const n = R.int(10, 200); let c = 0; for (let k = 2; k <= n; k++) if (isP(k)) c++; return { q: T`Find \(\pi(${n})\), the number of primes at most ${n}.`, answer: c, x: T`Count primes up to ${n} (sieve of Eratosthenes): ${c}.`, v: `primepi(${n})` }; }
      const k = R.int(3, 9);
      return { q: T`Estimate \(\pi(10^{${k}})\) with the prime number theorem, \(\frac{x}{\ln x}\). Round to the nearest whole number.`, answer: Math.round(10 ** k / (k * Math.log(10))), tol: Math.max(1, Math.round(10 ** k / (k * Math.log(10)) * 0.0005)), x: T`\(\ln 10^{${k}} = ${k}\ln10 \approx ${R.fmt(k * Math.log(10), 4)}\), so \(\frac{10^{${k}}}{${R.fmt(k * Math.log(10), 4)}} \approx ${Math.round(10 ** k / (k * Math.log(10))).toLocaleString('en-US')}\).`, v: `10**${k}/log(10**${k})` };
    } }]
  } });
})();
