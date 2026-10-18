registerLearn('discrete', [
  { title: 'Propositions and truth tables', skill: 'Logic', body: T`
<p>A proposition is a statement that is either true or false. Compound statements are built with connectives: negation \(\neg p\), conjunction \(p \land q\), disjunction \(p \lor q\) (inclusive "or"), implication \(p \to q\), and biconditional \(p \leftrightarrow q\).</p>
<table class="tt"><tr><th>\(p\)</th><th>\(q\)</th><th>\(p\land q\)</th><th>\(p\lor q\)</th><th>\(p\to q\)</th><th>\(p\leftrightarrow q\)</th></tr>
<tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>F</td></tr>
<tr><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td></tr></table>
<p>A tautology is true in every row; a contradiction is false in every row. Two statements are logically equivalent (\(\equiv\)) when their columns match in every row.</p>`,
    ex: { q: T`Is \((p \land (p \to q)) \to q\) a tautology?`, a: T`
<p>An implication can only fail when its hypothesis is true and its conclusion false. So suppose \(q\) is false and \(p \land (p\to q)\) is true. Then \(p\) is true, and \(p \to q\) with \(p\) true forces \(q\) true. That contradicts \(q\) false, so no row fails. It is a tautology (modus ponens).</p>` },
    trap: T`Reading \(p \to q\) as "\(p\) causes \(q\)." It only rules out the case \(p\) true, \(q\) false. When \(p\) is false the implication is true no matter what \(q\) is.` },

  { title: 'Equivalences and negation', skill: 'Logic', body: T`
<p>The workhorse equivalences:</p>
\[p \to q \equiv \neg p \lor q \equiv \neg q \to \neg p\]
\[\neg(p \land q) \equiv \neg p \lor \neg q \qquad \neg(p \lor q) \equiv \neg p \land \neg q\]
\[p \land (q \lor r) \equiv (p \land q) \lor (p \land r)\]
<p>For \(p \to q\): the converse is \(q \to p\), the inverse is \(\neg p \to \neg q\), and the contrapositive is \(\neg q \to \neg p\). Only the contrapositive is equivalent to the original. The converse and inverse are equivalent to each other.</p>
<p>Negating an implication gives a conjunction: \(\neg(p \to q) \equiv p \land \neg q\).</p>`,
    ex: { q: T`Negate "If it rains, then the game is canceled."`, a: T`
<p>With \(p\) = "it rains" and \(q\) = "the game is canceled," \(\neg(p \to q) \equiv p \land \neg q\): "It rains and the game is not canceled."</p>` },
    trap: T`Negating "if \(p\) then \(q\)" as "if not \(p\) then not \(q\)." That is the inverse, which is not a negation at all.` },

  { title: 'Quantifiers', skill: 'Logic', body: T`
<p>\(\forall x\, P(x)\) means \(P\) holds for every \(x\) in the domain; \(\exists x\, P(x)\) means at least one \(x\) satisfies it. The domain matters: \(\exists x\,(x^2 = 2)\) is true over \(\mathbb R\) and false over \(\mathbb Q\).</p>
<p>Negation flips each quantifier and moves inward:</p>
\[\neg\forall x\,P(x) \equiv \exists x\,\neg P(x) \qquad \neg\exists x\,P(x) \equiv \forall x\,\neg P(x)\]
<p>Order matters for mixed quantifiers. \(\forall x\,\exists y\,(y > x)\) is true over \(\mathbb Z\) (each \(x\) gets its own \(y\)). \(\exists y\,\forall x\,(y > x)\) is false (no single largest integer).</p>`,
    ex: { q: T`Negate \(\forall \varepsilon > 0\ \exists \delta > 0\ \forall x\ \big(|x - a| < \delta \to |f(x) - L| < \varepsilon\big)\).`, a: T`
<p>Flip each quantifier and negate the implication as \(p \land \neg q\):</p>
\[\begin{aligned}&\exists \varepsilon > 0\ \forall \delta > 0\ \exists x\\ &\big(|x-a| < \delta \land |f(x) - L| \ge \varepsilon\big)\end{aligned}\]
<p>This is exactly what it means for \(\lim_{x\to a} f(x) \ne L\).</p>` },
    trap: T`Swapping the order of \(\forall\) and \(\exists\) while negating. The order stays the same; only the symbols flip.` },

  { title: 'Proof strategies', skill: 'Proofs', body: T`
<p><b>Direct proof:</b> assume the hypothesis, derive the conclusion. <b>Contrapositive:</b> to prove \(p \to q\), assume \(\neg q\) and derive \(\neg p\). <b>Contradiction:</b> assume the statement is false and derive something impossible. <b>Cases:</b> split the domain into exhaustive cases and prove each.</p>
<p>To disprove a universal claim, one counterexample is enough. To prove an existential claim, one example is enough. Examples never prove a universal claim.</p>
<p>Useful definitions: \(n\) is even iff \(n = 2k\); odd iff \(n = 2k+1\); \(r\) is rational iff \(r = a/b\) with integers \(a, b\), \(b \ne 0\).</p>`,
    ex: { q: T`Prove that \(\sqrt 2\) is irrational.`, a: T`
<p>Suppose \(\sqrt 2 = a/b\) in lowest terms. Then \(a^2 = 2b^2\), so \(a^2\) is even, so \(a\) is even (contrapositive: odd squared is odd). Write \(a = 2k\): \(4k^2 = 2b^2\), so \(b^2 = 2k^2\) and \(b\) is even. Both even contradicts lowest terms.</p>` },
    trap: T`Proving the converse by accident. Write down exactly what you assume and what you must reach before starting.` },

  { title: 'Mathematical induction', skill: 'Proofs', body: T`
<p>To prove \(P(n)\) for all \(n \ge n_0\):</p>
<p><b>Base case:</b> verify \(P(n_0)\). <b>Inductive step:</b> assume \(P(k)\) for an arbitrary \(k \ge n_0\) (the inductive hypothesis) and prove \(P(k+1)\).</p>
<p><b>Strong induction</b> assumes \(P(n_0), P(n_0+1), \dots, P(k)\) all hold. Use it when \(P(k+1)\) depends on cases further back, such as recurrences or factorization into primes.</p>`,
    ex: { q: T`Prove \(1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}\) for \(n \ge 1\).`, a: T`
<p>Base: \(n=1\) gives \(1 = \frac{1\cdot 2}{2}\). Step: assume \(1 + \cdots + k = \frac{k(k+1)}{2}\). Then</p>
\[\begin{aligned}&1 + \cdots + k + (k+1)\\ &\quad= \frac{k(k+1)}{2} + (k+1)\\ &\quad= \frac{(k+1)(k+2)}{2},\end{aligned}\]
<p>which is the formula for \(n = k+1\).</p>` },
    trap: T`Assuming \(P(k+1)\) in the inductive step, or skipping the base case. Without a base case, "if \(P(k)\) then \(P(k+1)\)" proves nothing.` },

  { title: 'Sets and functions', skill: 'Relations', body: T`
<p>Set operations: \(A \cup B\), \(A \cap B\), \(A \setminus B\), complement \(\overline A\), Cartesian product \(A \times B = \{(a,b)\}\) with \(|A\times B| = |A||B|\). The power set \(\mathcal P(A)\) has \(2^{|A|}\) elements.</p>
<p>A function \(f: A \to B\) assigns each element of the domain \(A\) exactly one element of the codomain \(B\). The range is the set of outputs actually hit.</p>
<p><b>Injective:</b> \(f(a_1) = f(a_2) \Rightarrow a_1 = a_2\). <b>Surjective:</b> every \(b \in B\) equals some \(f(a)\). <b>Bijective:</b> both, which is exactly when \(f^{-1}\) exists.</p>`,
    ex: { q: T`Is \(f: \mathbb Z \to \mathbb Z\), \(f(n) = 2n + 1\) injective? Surjective?`, a: T`
<p>Injective: \(2n_1 + 1 = 2n_2 + 1\) gives \(n_1 = n_2\). Not surjective: every output is odd, so \(4\) is never hit. Over \(\mathbb R \to \mathbb R\), the same formula is a bijection.</p>` },
    trap: T`Confusing codomain with range. Surjectivity depends on the codomain you declare.` },

  { title: 'Relations', skill: 'Relations', body: T`
<p>A relation \(R\) on \(A\) is a subset of \(A \times A\). Key properties:</p>
<p>Reflexive: \(a\,R\,a\) for all \(a\). Symmetric: \(a\,R\,b \Rightarrow b\,R\,a\). Antisymmetric: \(a\,R\,b\) and \(b\,R\,a \Rightarrow a = b\). Transitive: \(a\,R\,b\) and \(b\,R\,c \Rightarrow a\,R\,c\).</p>
<p>An <b>equivalence relation</b> (reflexive, symmetric, transitive) partitions \(A\) into disjoint equivalence classes \([a]\). A <b>partial order</b> (reflexive, antisymmetric, transitive) ranks elements, possibly leaving some incomparable, like \(\subseteq\) or divisibility.</p>`,
    ex: { q: T`On \(\mathbb Z\), let \(a \sim b\) iff \(a - b\) is even. Describe the classes.`, a: T`
<p>Reflexive: \(a - a = 0\) is even. Symmetric: \(b - a = -(a-b)\). Transitive: \((a-b) + (b-c) = a - c\). The two classes are the even integers \([0]\) and the odd integers \([1]\).</p>` },
    trap: T`Treating antisymmetric as "not symmetric." Equality on any set is both symmetric and antisymmetric.` },

  { title: 'Counting principles', skill: 'Counting', body: T`
<p><b>Sum rule:</b> disjoint choices add. <b>Product rule:</b> sequential independent choices multiply.</p>
<table class="tt"><tr><th>Choosing \(k\) from \(n\)</th><th>Repetition not allowed</th><th>Repetition allowed</th></tr>
<tr><td>Order matters</td><td>\(P(n,k) = \frac{n!}{(n-k)!}\)</td><td>\(n^k\)</td></tr>
<tr><td>Order ignored</td><td>\(\binom{n}{k} = \frac{n!}{k!(n-k)!}\)</td><td>\(\binom{n+k-1}{k}\)</td></tr></table>
<p>For "at least one" questions, use the complement: total minus the count with none.</p>`,
    ex: { q: T`How many 5-card hands contain exactly 2 hearts?`, a: T`
<p>Choose the 2 hearts from 13 and the other 3 cards from the 39 non-hearts:</p>
\[\binom{13}{2}\binom{39}{3} = 78 \cdot 9139 = 712{,}842.\]` },
    trap: T`Counting "at least one heart" as \(13 \cdot \binom{51}{4}\). Hands with several hearts get counted multiple times. Use \(\binom{52}{5} - \binom{39}{5}\).` },

  { title: 'Binomial theorem', skill: 'Counting', body: T`
\[(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}\]
<p>Pascal's rule \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\) builds Pascal's triangle. Setting \(x = y = 1\) gives \(\sum_k \binom{n}{k} = 2^n\); setting \(x = -1, y = 1\) gives \(\sum_k (-1)^k\binom{n}{k} = 0\) for \(n \ge 1\).</p>
<p>Symmetry: \(\binom{n}{k} = \binom{n}{n-k}\).</p>`,
    ex: { q: T`Find the coefficient of \(x^3\) in \((2x - 1)^5\).`, a: T`
<p>The term with \(x^3\) is \(\binom{5}{3}(2x)^3(-1)^2 = 10 \cdot 8x^3 \cdot 1 = 80x^3\). The coefficient is 80.</p>` },
    trap: T`Forgetting to raise the coefficient and sign along with the variable: \((2x)^3 = 8x^3\), not \(2x^3\).` },

  { title: 'Inclusion–exclusion', skill: 'Inclusion–exclusion', body: T`
\[\begin{aligned}&|A\cup B\cup C|\\ &\quad= |A|+|B|+|C|\\ &\quad - |A\cap B| - |A\cap C| - |B\cap C|\\ &\quad + |A\cap B\cap C|\end{aligned}\]
<p>In general, add single sets, subtract pairs, add triples, and alternate. For divisibility, \(\lfloor N/d \rfloor\) counts multiples of \(d\) up to \(N\), and "divisible by both \(a\) and \(b\)" means divisible by \(\operatorname{lcm}(a,b)\).</p>`,
    ex: { q: T`How many integers from 1 to 100 are divisible by 2, 3, or 5?`, a: T`
\[\begin{aligned}&50 + 33 + 20\\ &\quad - 16 - 10 - 6\\ &\quad + 3 = 74\end{aligned}\]
<p>The pair terms use \(\lfloor 100/6 \rfloor\), \(\lfloor 100/10 \rfloor\), \(\lfloor 100/15 \rfloor\), and the triple term uses \(\lfloor 100/30 \rfloor\).</p>` },
    trap: T`Using \(\lfloor N/(ab) \rfloor\) when \(a\) and \(b\) share a factor. Multiples of both 4 and 6 are multiples of 12, not 24.` },

  { title: 'Pigeonhole principle', skill: 'Pigeonhole', body: T`
<p>If \(N\) objects go into \(k\) boxes, some box holds at least \(\lceil N/k \rceil\). The hard part is choosing the boxes: remainders, intervals, colors, or regions.</p>`,
    ex: { q: T`Five points lie in a unit square. Show two are within \(\frac{\sqrt 2}{2}\) of each other.`, a: T`
<p>Cut the square into four \(\frac12 \times \frac12\) squares. Five points in four boxes put two in the same small square, whose diagonal is \(\frac{\sqrt 2}{2}\).</p>` },
    trap: T`Expecting the principle to say which box. It only guarantees existence.` },

  { title: 'Divisibility and modular arithmetic', skill: 'Number theory', body: T`
<p>\(a \mid b\) means \(b = ak\) for an integer \(k\). Division algorithm: \(a = qb + r\) with \(0 \le r < b\). \(a \equiv b \pmod m\) means \(m \mid (a-b)\). Congruences can be added, subtracted, multiplied, and raised to powers.</p>
<p>Euclid's algorithm finds \(\gcd(a,b)\); running it backward gives Bézout's identity \(\gcd(a,b) = sa + tb\). An inverse of \(a\) mod \(m\) exists iff \(\gcd(a,m) = 1\).</p>
<p>Fermat: for prime \(p \nmid a\), \(a^{p-1} \equiv 1 \pmod p\). Euler: \(a^{\varphi(m)} \equiv 1 \pmod m\) when \(\gcd(a,m)=1\).</p>`,
    ex: { q: T`Find \(\gcd(252, 198)\) and the inverse of 3 mod 7.`, a: T`
\[\begin{aligned}252 &= 1\cdot198 + 54\\ 198 &= 3\cdot 54 + 36\\ 54 &= 1\cdot 36 + 18\\ 36 &= 2\cdot 18 + 0\end{aligned}\]
<p>So \(\gcd = 18\). For the inverse, \(3 \cdot 5 = 15 \equiv 1 \pmod 7\), so \(3^{-1} \equiv 5\).</p>` },
    trap: T`Dividing both sides of a congruence by a number that shares a factor with the modulus. \(2 \cdot 3 \equiv 2 \cdot 1 \pmod 4\), yet \(3 \not\equiv 1 \pmod 4\).` },

  { title: 'Graphs', skill: 'Graphs', body: T`
<p>A graph \(G = (V, E)\) has vertices and edges; \(\deg(v)\) counts edges at \(v\). Handshake lemma: \(\sum_v \deg(v) = 2|E|\).</p>
<p>A tree is connected with no cycles; on \(n\) vertices it has \(n-1\) edges. \(K_n\) has \(\binom n2\) edges. Bipartite iff no odd cycle.</p>
<p><b>Euler</b> circuits use every edge once: connected and all degrees even. <b>Hamilton</b> cycles visit every vertex once; no simple test exists. Connected planar graphs satisfy \(V - E + F = 2\).</p>`,
    ex: { q: T`Is there a simple graph with degrees 3, 3, 3, 1?`, a: T`
<p>The sum is 10, which is even, so the handshake lemma does not rule it out. But with 4 vertices, a degree-3 vertex is adjacent to all others, so each of the three degree-3 vertices is adjacent to the fourth. That vertex would have degree 3, not 1. No such graph exists.</p>` },
    trap: T`Mixing up Euler (every edge once) and Hamilton (every vertex once).` },

  { title: 'Recurrence relations', skill: 'Recurrences', body: T`
<p>For a linear homogeneous recurrence \(a_n = c_1 a_{n-1} + c_2 a_{n-2}\), try \(a_n = r^n\) to get the characteristic equation \(r^2 - c_1 r - c_2 = 0\).</p>
<p>Distinct roots: \(a_n = A r_1^n + B r_2^n\). Repeated root \(r\): \(a_n = (A + Bn) r^n\). Use the initial conditions to solve for \(A, B\).</p>`,
    ex: { q: T`Solve \(a_n = a_{n-1} + 6a_{n-2}\) with \(a_0 = 1\), \(a_1 = 8\).`, a: T`
<p>\(r^2 - r - 6 = (r-3)(r+2) = 0\). So \(a_n = A\cdot 3^n + B(-2)^n\). From \(A + B = 1\) and \(3A - 2B = 8\): \(A = 2\), \(B = -1\).</p>
\[a_n = 2\cdot 3^n - (-2)^n\]
<p>Check: \(a_2 = a_1 + 6a_0 = 14\), and \(2 \cdot 9 - 4 = 14\).</p>` },
    trap: T`Using \(A r^n + B r^n\) for a repeated root. That is one free constant, not two; the second solution is \(n r^n\).` },

  { title: 'Growth of functions', skill: 'Growth', body: T`
<p>\(f = O(g)\) if \(|f(n)| \le C|g(n)|\) for all \(n \ge n_0\): an upper bound. \(f = \Omega(g)\) is a lower bound; \(f = \Theta(g)\) is both.</p>
\[1 \prec \log n \prec \sqrt n \prec n \prec n\log n\]\[\prec n^2 \prec 2^n \prec n! \prec n^n\]
<p>Constants and lower-order terms drop out. Logarithm bases differ only by a constant factor.</p>`,
    ex: { q: T`Show \(3n^2 + 5n = O(n^2)\).`, a: T`
<p>For \(n \ge 1\), \(5n \le 5n^2\), so \(3n^2 + 5n \le 8n^2\). Take \(C = 8\), \(n_0 = 1\).</p>` },
    trap: T`Reading \(O\) as "exactly." \(n = O(n^2)\) is true; it is just not tight. Use \(\Theta\) for tight bounds.` }
]);
