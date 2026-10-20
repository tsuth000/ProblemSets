registerSubject({
  id: 'discrete', name: 'Discrete mathematics', color: '#5E4B8B',
  blurb: 'Logic, proofs, counting, number theory, relations, graphs',
  questions: [
    { id: 'd1', skill: 'Logic', q: T`Which statement is logically equivalent to \(p \to q\)?`,
      c: [T`\(\neg q \to \neg p\)`, T`\(q \to p\)`, T`\(\neg p \to \neg q\)`, T`\(p \land \neg q\)`],
      x: T`The contrapositive \(\neg q \to \neg p\) always has the same truth value as \(p \to q\). The converse \(q \to p\) and inverse \(\neg p \to \neg q\) do not.` },
    { id: 'd2', skill: 'Logic', q: T`What is the negation of \(\forall x\, \exists y\, P(x,y)\)?`,
      c: [T`\(\exists x\, \forall y\, \neg P(x,y)\)`, T`\(\forall x\, \exists y\, \neg P(x,y)\)`, T`\(\exists x\, \exists y\, \neg P(x,y)\)`, T`\(\forall x\, \forall y\, \neg P(x,y)\)`],
      x: T`Each quantifier flips as the negation moves inward: \(\neg\forall x \to \exists x\,\neg\), then \(\neg\exists y \to \forall y\,\neg\).` },
    { id: 'd3', skill: 'Logic', q: T`The implication \(p \to q\) is false exactly when:`,
      c: ['\\(p\\) is true and \\(q\\) is false', '\\(p\\) is false and \\(q\\) is true', 'both are false', 'both are true'],
      x: T`A true hypothesis with a false conclusion is the only case that breaks an implication. A false hypothesis makes the implication vacuously true.` },
    { id: 'd4', skill: 'Logic', q: T`Which is equivalent to \(\neg(p \land q)\)?`,
      c: [T`\(\neg p \lor \neg q\)`, T`\(\neg p \land \neg q\)`, T`\(p \lor q\)`, T`\(\neg p \to q\)`],
      x: T`De Morgan's law: negating a conjunction gives the disjunction of the negations. Note \(\neg p \to q \equiv p \lor q\).` },
    { id: 'd5', skill: 'Proofs', q: T`In a proof by induction that \(P(n)\) holds for all \(n \ge 1\), the inductive step establishes:`,
      c: [T`\(P(k) \Rightarrow P(k+1)\) for every \(k \ge 1\)`, T`\(P(1)\) is true`, T`\(P(k)\) is true for every \(k\)`, T`\(P(k+1) \Rightarrow P(k)\) for every \(k \ge 1\)`],
      x: T`The base case gives \(P(1)\); the inductive step shows truth propagates from \(k\) to \(k+1\). Together they cover every \(n \ge 1\).` },
    { id: 'd6', skill: 'Proofs', q: T`The cleanest way to prove "if \(n^2\) is even, then \(n\) is even" is to:`,
      c: [T`assume \(n\) is odd and show \(n^2\) is odd`, T`assume \(n^2\) is even and write \(n = \sqrt{2k}\)`, T`check \(n = 1, 2, 3\)`, T`assume \(n\) is even and show \(n^2\) is even`],
      x: T`Contrapositive: if \(n = 2k+1\), then \(n^2 = 4k^2+4k+1 = 2(2k^2+2k)+1\), which is odd. The last option proves the converse, not the statement.` },
    { id: 'd7', skill: 'Pigeonhole', q: T`What is the minimum number of people needed to guarantee two share a birth month?`,
      c: ['13', '12', '24', '366'],
      x: T`With 12 months as boxes, 12 people could all differ. The 13th forces a repeat: \(\lceil 13/12 \rceil = 2\).` },
    { id: 'd8', skill: 'Pigeonhole', q: T`How many integers must you choose to guarantee two have the same remainder when divided by 7?`,
      c: ['8', '7', '14', '6'],
      x: T`There are 7 possible remainders (0 through 6). Eight integers force two into the same remainder class.` },
    { id: 'd9', skill: 'Counting', q: T`How many nonnegative integer solutions does \(x_1 + x_2 + x_3 = 10\) have?`,
      c: ['66', '120', '45', '1000'],
      x: T`Stars and bars: \(\binom{10+3-1}{3-1} = \binom{12}{2} = 66\).` },
    { id: 'd10', skill: 'Counting', q: T`How many subsets does a 5-element set have?`,
      c: ['32', '25', '10', '120'],
      x: T`Each element is in or out: \(2^5 = 32\), including the empty set and the full set.` },
    { id: 'd11', skill: 'Counting', q: T`How many functions are there from a 3-element set to a 4-element set?`,
      c: ['64', '81', '24', '12'],
      x: T`Each of the 3 inputs independently picks one of 4 outputs: \(4^3 = 64\).` },
    { id: 'd12', skill: 'Counting', q: T`How many injective functions are there from a 3-element set to a 4-element set?`,
      c: ['24', '64', '4', '12'],
      x: T`Choose distinct outputs in order: \(4 \cdot 3 \cdot 2 = P(4,3) = 24\).` },
    { id: 'd13', skill: 'Counting', q: T`How many bit strings of length 8 contain exactly three 1s?`,
      c: ['56', '24', '256', '336'],
      x: T`Choose the positions of the 1s: \(\binom{8}{3} = 56\).` },
    { id: 'd14', skill: 'Relations', q: T`On \(\mathbb{Z}\), define \(a \mathrel{R} b\) iff \(5 \mid (a-b)\). Then \(R\) is:`,
      c: ['an equivalence relation with 5 classes', 'a partial order', 'an equivalence relation with infinitely many classes', 'reflexive and symmetric but not transitive'],
      x: T`\(R\) is congruence mod 5: reflexive, symmetric, and transitive. The classes are the residues \(0,1,2,3,4\).` },
    { id: 'd15', skill: 'Relations', q: T`The relation \(\le\) on \(\mathbb{Z}\) fails which property required of an equivalence relation?`,
      c: ['Symmetry', 'Reflexivity', 'Transitivity', 'None; it is an equivalence relation'],
      x: T`\(2 \le 3\) but \(3 \not\le 2\). The relation is antisymmetric, which makes it a partial order.` },
    { id: 'd16', skill: 'Relations', q: T`If \(f: A \to B\) is injective and \(|A| = |B|\) is finite, then \(f\) is:`,
      c: ['also surjective, hence a bijection', 'not surjective', 'constant', 'undetermined without more information'],
      x: T`An injection maps \(|A|\) inputs to \(|A|\) distinct outputs, which fills all of \(B\) when \(|B| = |A|\).` },
    { id: 'd17', skill: 'Graphs', q: T`A graph has vertex degrees 3, 3, 2, 2, 2. How many edges does it have?`,
      c: ['6', '12', '5', '10'],
      x: T`Handshake lemma: \(\sum \deg = 12 = 2|E|\), so \(|E| = 6\).` },
    { id: 'd18', skill: 'Graphs', q: T`How many edges does a tree with 12 vertices have?`,
      c: ['11', '12', '66', '13'],
      x: T`Every tree on \(n\) vertices has exactly \(n - 1\) edges.` },
    { id: 'd19', skill: 'Graphs', q: T`A connected graph has an Euler circuit if and only if:`,
      c: ['every vertex has even degree', 'exactly two vertices have odd degree', 'it is a tree', 'it has a Hamiltonian cycle'],
      x: T`Each pass through a vertex uses two edges, so all degrees must be even. Exactly two odd vertices gives an Euler path, not a circuit.` },
    { id: 'd20', skill: 'Graphs', q: T`How many edges does the complete graph \(K_8\) have?`,
      c: ['28', '56', '64', '8'],
      x: T`\(\binom{8}{2} = \frac{8 \cdot 7}{2} = 28\).` },
    { id: 'd21', skill: 'Graphs', q: T`A graph is bipartite if and only if it:`,
      c: ['contains no odd cycle', 'contains no cycle', 'is connected', 'has an even number of vertices'],
      x: T`Two-coloring fails exactly when a cycle of odd length forces two adjacent vertices into the same color.` },
    { id: 'd22', skill: 'Number theory', q: T`What is \(3^{100} \bmod 7\)?`,
      c: ['4', '3', '1', '2'],
      x: T`Fermat: \(3^6 \equiv 1 \pmod 7\). Since \(100 = 6 \cdot 16 + 4\), \(3^{100} \equiv 3^4 = 81 \equiv 4 \pmod 7\).` },
    { id: 'd23', skill: 'Recurrences', q: T`The general solution of \(a_n = 5a_{n-1} - 6a_{n-2}\) is:`,
      c: [T`\(A \cdot 2^n + B \cdot 3^n\)`, T`\(A \cdot 5^n + B \cdot 6^n\)`, T`\((A + Bn)\,3^n\)`, T`\(A \cdot (-2)^n + B \cdot (-3)^n\)`],
      x: T`Characteristic equation \(r^2 - 5r + 6 = 0\) factors as \((r-2)(r-3)\), giving roots 2 and 3.` },
    { id: 'd24', skill: 'Growth', q: T`Which function grows fastest as \(n \to \infty\)?`,
      c: [T`\(n!\)`, T`\(2^n\)`, T`\(n^{100}\)`, T`\(n^2 \log n\)`],
      x: T`Factorial beats any exponential with fixed base, which beats any polynomial. Stirling: \(n! \approx \sqrt{2\pi n}\,(n/e)^n\).` }
  ],
  generators: [
    { id: 'dg-comb', skill: 'Counting', make(R) {
      const n = R.int(7, 15), k = R.int(2, 5), a = R.binom(n, k);
      const q = R.pick([T`How many ways can a committee of ${k} be chosen from ${n} people?`, T`A pizza shop offers ${n} toppings. How many pizzas have exactly ${k} different toppings?`,
        T`How many ${k}-card hands can be dealt from ${n} distinct cards?`, T`A reading list has ${n} books. How many ways can you choose ${k} of them to read?`,
        T`How many ways can ${k} of ${n} employees be picked for a training session?`, T`A test has ${n} questions and you must answer exactly ${k}. How many choices of questions are there?`]);
      return { q, answer: a, v: `binomial(${n}, ${k})`,
        x: T`Order does not matter: \(\binom{${n}}{${k}} = \dfrac{${n}!}{${k}!\,${n - k}!} = ${a}\).` };
    } },
    { id: 'dg-perm', skill: 'Counting', make(R) {
      const n = R.int(5, 12), k = R.int(2, 4); let a = 1; const f = [];
      for (let i = 0; i < k; i++) { a *= n - i; f.push(n - i); }
      const roles = ['a president', 'a vice president', 'a treasurer', 'a secretary'].slice(0, k);
      const q = R.pick([T`${n} runners race. How many different ways can the top ${k} finishing positions be filled?`, T`A club of ${n} members chooses ${roles.slice(0, -1).join(', ')} and ${roles[k - 1]}, all different people. How many outcomes are possible?`,
        T`How many ${k}-letter codes with no repeated letter can be made from ${n} letters?`, T`${n} songs are available. How many ways can you fill a playlist of ${k} different songs, where order matters?`,
        T`${n} horses run. How many ways can the first ${k} places finish?`, T`How many ways can ${k} of ${n} guests be seated in a row of ${k} chairs?`]);
      return { q, answer: a, v: `factorial(${n}) / factorial(${n - k})`,
        x: T`Order matters: \(P(${n},${k}) = ${f.join(' \\cdot ')} = ${a}\).` };
    } },
    { id: 'dg-stars', skill: 'Counting', make(R) {
      const k = R.int(3, 5), n = R.int(5, 14), a = R.binom(n + k - 1, k - 1);
      const vars = Array.from({ length: k }, (_, i) => `x_${i + 1}`).join(' + ');
      const q = R.pick([T`How many nonnegative integer solutions does \(${vars} = ${n}\) have?`, T`How many ways can ${n} identical cookies be shared among ${k} children, if a child may get none?`,
        T`A shop sells ${k} flavors of donut. How many different boxes of ${n} donuts are possible?`, T`How many ways can ${n} identical coins be dropped into ${k} labeled jars?`]);
      return { q, answer: a, v: `binomial(${n + k - 1}, ${k - 1})`,
        x: T`Stars and bars with \(n=${n}\), \(k=${k}\): \(\binom{${n}+${k}-1}{${k}-1} = \binom{${n + k - 1}}{${k - 1}} = ${a}\).` };
    } },
    { id: 'dg-modexp', skill: 'Number theory', make(R) {
      const p = R.pick([5, 7, 11, 13]); let a; do { a = R.int(2, 12); } while (a % p === 0);
      const b = R.int(25, 250), r = b % (p - 1); let v = 1; for (let i = 0; i < r; i++) v = (v * a) % p;
      return { q: T`Compute \(${a}^{${b}} \bmod ${p}\).`, answer: v,
        x: T`\(${p}\) is prime and \(${p} \nmid ${a}\), so Fermat gives \(${a}^{${p - 1}} \equiv 1\). Since \(${b} \bmod ${p - 1} = ${r}\), the result is \(${a}^{${r}} \bmod ${p} = ${v}\).` };
    } },
    { id: 'dg-gcd', skill: 'Number theory', make(R) {
      const g = R.int(2, 15); let x, y; do { x = R.int(3, 25); y = R.int(3, 25); } while (R.gcd(x, y) !== 1 || x === y);
      let a = g * Math.max(x, y), b = g * Math.min(x, y); const steps = [];
      while (b) { const q = Math.floor(a / b), r = a % b; steps.push(`${a} = ${q}\\cdot ${b} + ${r}`); a = b; b = r; }
      return { q: T`Find \(\gcd(${g * Math.max(x, y)},\, ${g * Math.min(x, y)})\).`, answer: g,
        x: T`Euclid's algorithm: \[\begin{aligned}${steps.join('\\\\')}\end{aligned}\] The last nonzero remainder is \(${g}\).` };
    } },
    { id: 'dg-incl', skill: 'Inclusion–exclusion', make(R) {
      const [a, b] = R.sample([2, 3, 4, 5, 6, 7, 9], 2), N = R.int(10, 99) * 10, l = R.lcm(a, b);
      const A = Math.floor(N / a), B = Math.floor(N / b), C = Math.floor(N / l);
      return { q: T`How many integers from 1 to ${N} are divisible by ${a} or ${b}?`, answer: A + B - C,
        x: T`\(\lfloor ${N}/${a} \rfloor + \lfloor ${N}/${b} \rfloor - \lfloor ${N}/\operatorname{lcm}(${a},${b}) \rfloor = ${A} + ${B} - ${C} = ${A + B - C}\).` };
    } }
  ]
});
