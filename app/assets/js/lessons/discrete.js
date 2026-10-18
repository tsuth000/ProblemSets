registerLessons('discrete', {
  'Propositions and truth tables': {
    hook: T`
<p>A proposition is a sentence that is either true or false. "It is raining" qualifies; "Close the door" does not. Connectives build larger statements from smaller ones, and a truth table lists every combination of truth values.</p>
<table class="tt"><tr><th>\(p\)</th><th>\(q\)</th><th>\(p\land q\)</th><th>\(p\lor q\)</th><th>\(p\to q\)</th></tr>
<tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td></tr></table>
<p>The conditional \(p \to q\) surprises people. Think of it as a promise: "If it rains, I will bring an umbrella." The promise is broken only when it rains and I do not bring one. If it never rains, I kept my word.</p>`,
    vary: [
      [T`How many rows does a truth table with 2 variables have?`, 4, T`Each variable is T or F: \(2\times2\).`],
      [T`How many rows with 3 variables?`, 8, T`Each new variable doubles the rows.`],
      [T`\(p\) is true and \(q\) is false. What is \(p \to q\)?`, ['False', 'True'], T`The only way to break the promise.`],
      [T`\(p\) is false and \(q\) is false. What is \(p \to q\)?`, ['True', 'False'], T`The hypothesis is false, so the promise was never tested.`],
      [T`\(p\) is false and \(q\) is false. What is \(p \lor q\)?`, ['False', 'True'], T`"Or" needs at least one true part.`]
    ]
  },
  'Equivalences and negation': {
    hook: T`
<p>Two statements are equivalent if they have identical truth tables. The most useful equivalences tell you how to negate.</p>
<p>De Morgan's laws: "it is not true that the store is open and has milk" means the store is closed <b>or</b> has no milk. Negation flips "and" into "or", and "or" into "and".</p>
<p>The negation of "if \(p\) then \(q\)" is "\(p\) and not \(q\)": the only way a conditional fails.</p>`,
    vary: [
      [T`Negate: \(x > 0\) and \(y > 0\).`, [T`\(x \le 0\) or \(y \le 0\)`, T`\(x \le 0\) and \(y \le 0\)`, T`\(x < 0\) or \(y < 0\)`], T`"And" becomes "or", and each part is negated.`],
      [T`Negate: \(x > 0\) or \(y > 0\).`, [T`\(x \le 0\) and \(y \le 0\)`, T`\(x \le 0\) or \(y \le 0\)`, T`\(x < 0\) and \(y < 0\)`], T`Now "or" becomes "and".`],
      [T`Negate: "If it rains, the game is canceled."`, ['It rains and the game is not canceled.', 'If it does not rain, the game is not canceled.', 'It does not rain and the game is canceled.'], T`The conditional fails only when the hypothesis holds and the conclusion does not.`],
      [T`Which is equivalent to \(p \to q\)?`, [T`\(\neg q \to \neg p\)`, T`\(q \to p\)`, T`\(\neg p \to \neg q\)`], T`The contrapositive. The converse and inverse are different statements.`]
    ]
  },
  'Quantifiers': {
    hook: T`
<p>\(\forall\) means "for every" and \(\exists\) means "there exists". Their order matters. "Everyone has a mother" is \(\forall x\,\exists y\): each person has their own. "Someone is everyone's mother" is \(\exists y\,\forall x\): one person for all, which is false.</p>
<p>Negation swaps the quantifier. "Not every swan is white" means "some swan is not white".</p>`,
    vary: [
      [T`Negate \(\forall x\,P(x)\).`, [T`\(\exists x\,\neg P(x)\)`, T`\(\forall x\,\neg P(x)\)`, T`\(\exists x\,P(x)\)`], T`One counterexample is enough to break "for all".`],
      [T`Negate \(\exists x\,P(x)\).`, [T`\(\forall x\,\neg P(x)\)`, T`\(\exists x\,\neg P(x)\)`, T`\(\forall x\,P(x)\)`], T`"There is none" means every \(x\) fails.`],
      [T`Over the integers, is \(\forall x\,\exists y\,(y > x)\) true?`, ['True', 'False'], T`For each \(x\), choose \(y = x + 1\).`],
      [T`Over the integers, is \(\exists y\,\forall x\,(y > x)\) true?`, ['False', 'True'], T`Swapping the order demands one integer larger than every integer.`]
    ]
  },
  'Proof strategies': {
    hook: T`
<p>A proof is a chain in which every link is a definition, an assumption, or an earlier result. Four strategies cover most situations:</p>
<p><b>Direct:</b> assume the hypothesis and reason forward. <b>Contrapositive:</b> prove "not \(q\) implies not \(p\)" instead. <b>Contradiction:</b> assume the statement is false and derive something impossible. <b>Counterexample:</b> to disprove a "for all" claim, one failure suffices.</p>`,
    vary: [
      [T`To disprove "every prime is odd", you need:`, ['one counterexample', 'a proof by induction', 'a truth table'], T`The prime 2 settles it.`],
      [T`The cleanest way to prove "if \(n^2\) is even, then \(n\) is even" is:`, ['contrapositive', 'counterexample', 'direct from \\(n^2\\) even'], T`Assume \(n\) is odd and show \(n^2\) is odd.`],
      [T`"\(\sqrt2\) is irrational" is classically proved by:`, ['contradiction', 'induction', 'counterexample'], T`Assume \(\sqrt2 = \frac pq\) in lowest terms and show both are even.`],
      [T`Find the smallest \(n \ge 0\) for which \(n^2 + n + 41\) is not prime.`, 40, T`\(40^2 + 40 + 41 = 41^2\). Checking many cases is not a proof.`]
    ]
  },
  'Mathematical induction': {
    hook: T`
<p>Picture an endless row of dominoes. To be sure all of them fall, you need two facts: the first one falls (the base case), and whenever one falls it knocks over the next (the inductive step).</p>
${fig('dominoes', {}, 'Base case plus inductive step: every domino falls.')}
<p>In the inductive step you assume the statement for \(n = k\) and prove it for \(n = k + 1\). That assumption is not circular; it is the "if this domino falls" part.</p>`,
    vary: [
      [T`Find \(1 + 2 + \cdots + 10\).`, 55, T`\(\frac{n(n+1)}{2}\) with \(n = 10\).`],
      [T`Find \(1 + 2 + \cdots + 100\).`, 5050, T`The same formula, proved once by induction, works for every \(n\).`],
      [T`Find \(1 + 3 + 5 + \cdots + 19\).`, 100, T`The first \(n\) odd numbers sum to \(n^2\); here \(n = 10\).`],
      [T`Find \(2^0 + 2^1 + \cdots + 2^5\).`, 63, T`\(2^{n+1} - 1\): another formula induction proves.`]
    ]
  },
  'Sets and functions': {
    hook: T`
<p>A set is a collection of distinct objects. Venn diagrams make the operations visual: union is "in either", intersection is "in both", difference is "in the first but not the second".</p>
${fig('venn2', {}, 'Pick a region to shade it.')}
<p>A function from \(A\) to \(B\) sends every element of \(A\) to exactly one element of \(B\). It is one-to-one if no two inputs share an output, and onto if every element of \(B\) is hit.</p>`,
    more: T`${fig('mapping', {}, 'Left: every input has one arrow. Right: a sends two arrows and b sends none.')}`,
    vary: [
      [T`\(|A| = 5\), \(|B| = 4\), \(|A\cap B| = 2\). Find \(|A\cup B|\).`, 7, T`Adding counts the overlap twice; subtract it once.`],
      [T`Same sets, but now disjoint. Find \(|A\cup B|\).`, 9, T`No overlap, nothing to subtract.`],
      [T`How many subsets does \(\{a, b, c\}\) have?`, 8, T`Each element is in or out: \(2^3\).`],
      [T`How many functions are there from a 3-element set to a 2-element set?`, 8, T`Two choices for each of three inputs.`],
      [T`How many of those functions are one-to-one?`, 0, T`Three inputs cannot have different outputs with only two to choose from.`]
    ]
  },
  'Relations': {
    hook: T`
<p>A relation is any rule that pairs elements: "is a sibling of", "\(\le\)", "has the same remainder mod 3". Three properties matter most. Reflexive: everything relates to itself. Symmetric: if \(a\) relates to \(b\), then \(b\) relates to \(a\). Transitive: relations chain.</p>
<p>A relation with all three is an equivalence relation, and it sorts a set into separate groups. "Born in the same month" sorts people into 12 classes.</p>`,
    vary: [
      [T`"\(\le\)" on the real numbers is:`, ['reflexive, antisymmetric, and transitive', 'symmetric', 'an equivalence relation'], T`A partial (in fact total) order, not an equivalence.`],
      [T`"Has the same remainder when divided by 3" is:`, ['an equivalence relation', 'a partial order', 'neither'], T`Reflexive, symmetric, transitive.`],
      [T`How many equivalence classes does congruence mod 3 have?`, 3, T`Remainders 0, 1, 2.`],
      [T`Is "is a parent of" transitive?`, ['No', 'Yes'], T`A parent of a parent is a grandparent, not a parent.`]
    ]
  },
  'Counting principles': {
    hook: T`
<p>When a choice happens in stages, multiply the options at each stage. Three shirts and two pairs of pants give \(3\times2 = 6\) outfits: the tree below has six leaves.</p>
${fig('countTree', {}, 'Each branch is one complete choice.')}
<p>If order matters (president, then vice president), you are counting arrangements. If it does not (a two-person committee), divide out the orderings of each group.</p>`,
    vary: [
      [T`3 shirts, 2 pants, 4 hats. How many outfits?`, 24, T`Another stage, another factor.`],
      [T`In how many orders can 4 books stand on a shelf?`, 24, T`\(4!\): 4 choices, then 3, then 2, then 1.`],
      [T`Choose a president and a vice president from 5 people.`, 20, T`Order matters: \(5\cdot4\).`],
      [T`Choose a 2-person committee from 5 people.`, 10, T`Order no longer matters, so each pair was counted twice.`],
      [T`Choose a 3-person committee from 5 people.`, 10, T`Choosing 3 to include equals choosing 2 to leave out.`]
    ]
  },
  'Binomial theorem': {
    hook: T`
<p>Expanding \((a + b)^4\) means choosing \(a\) or \(b\) from each of the four brackets. The coefficient of \(a^2b^2\) counts the ways to pick which two brackets supply the \(b\)'s: \(\binom42 = 6\).</p>
${fig('pascal', {}, T`Pascal's triangle: each entry is the sum of the two above. Row 4 gives the coefficients of \((a + b)^4\).`)}`,
    vary: [
      [T`Find \(\binom42\).`, 6, T`Read it from row 4.`],
      [T`Find the coefficient of \(x^2y^2\) in \((x + y)^4\).`, 6, T`The same count, as a coefficient.`],
      [T`Find the coefficient of \(x^3\) in \((x + 1)^4\).`, 4, T`\(\binom43\).`],
      [T`Find the coefficient of \(x^3\) in \((x + 2)^4\).`, 8, T`The one bracket that supplies a 2 multiplies the count by 2.`],
      [T`Find \(\binom50 + \binom51 + \cdots + \binom55\).`, 32, T`Set \(a = b = 1\): \(2^5\).`]
    ]
  },
  'Inclusion–exclusion': {
    hook: T`
<p>To count a union, adding the separate counts counts the overlap twice, so subtract it once. With three sets, the pairwise overlaps are subtracted, but that removes the triple overlap one time too many, so add it back.</p>
${fig('venn3', {}, 'Darker regions are counted more than once by the plain sum.')}`,
    vary: [
      [T`How many integers from 1 to 100 are divisible by 2 or 3?`, 67, T`\(50 + 33 - 16\).`],
      [T`Divisible by 2 or 5?`, 60, T`\(50 + 20 - 10\).`],
      [T`Divisible by 2, 3, or 5?`, 74, T`\(50 + 33 + 20 - 16 - 10 - 6 + 3\).`],
      [T`Divisible by none of 2, 3, 5?`, 26, T`The complement of the previous count.`]
    ]
  },
  'Pigeonhole principle': {
    hook: T`
<p>Put more pigeons than holes and some hole holds two. Obvious, yet it proves surprising things: in any group of 13 people, two share a birth month.</p>
${fig('pigeons', {}, 'Five items in four boxes.')}
<p>The skill is deciding what the "holes" are.</p>`,
    vary: [
      [T`How many people guarantee that two share a birth month?`, 13, T`12 holes, one more pigeon.`],
      [T`How many guarantee that three share a birth month?`, 25, T`Fill every month twice, then one more: \(2\cdot12 + 1\).`],
      [T`Socks in 3 colors: how many draws guarantee a matching pair?`, 4, T`3 holes.`],
      [T`From 1 to 10, how many numbers must you pick to guarantee two that sum to 11?`, 6, T`The holes are the pairs (1, 10), (2, 9), ..., (5, 6).`]
    ]
  },
  'Divisibility and modular arithmetic': {
    hook: T`
<p>Modular arithmetic is clock arithmetic. Nine o'clock plus five hours is two o'clock: \(9 + 5 \equiv 2 \pmod{12}\). Only the remainder matters.</p>
${fig('clock', {}, 'Add hours and see where you land.')}
<p>You can reduce at every step: to find a remainder of a big product, reduce each factor first.</p>`,
    vary: [
      [T`Find \(17 \bmod 5\).`, 2, T`\(17 = 3\cdot5 + 2\).`],
      [T`Find \(-3 \bmod 5\).`, 2, T`Remainders run from 0 to 4: \(-3 = -5 + 2\).`],
      [T`Find \((17 + 23) \bmod 5\).`, 0, T`\(2 + 3 = 5 \equiv 0\).`],
      [T`Find \((17\cdot23) \bmod 5\).`, 1, T`Reduce first: \(2\cdot3 = 6 \equiv 1\).`],
      [T`Find \(\gcd(48, 18)\).`, 6, T`Euclid: \(48 \bmod 18 = 12\), \(18 \bmod 12 = 6\), \(12 \bmod 6 = 0\).`]
    ]
  },
  'Graphs': {
    hook: T`
<p>A graph is dots (vertices) joined by lines (edges): cities and roads, people and friendships, web pages and links. The degree of a vertex is how many edges touch it.</p>
${fig('graphDeg', {}, 'Each vertex is labeled with its degree.')}
<p>Every edge has two ends, so the degrees always add up to twice the number of edges. That is the handshake lemma.</p>`,
    vary: [
      [T`The degrees in the figure are 2, 4, 2, 3, 3. How many edges?`, 7, T`Half of 14.`],
      [T`How many edges does the complete graph \(K_5\) have?`, 10, T`Every pair joined: \(\binom52\).`],
      [T`How many edges does \(K_6\) have?`, 15, T`\(\binom62\).`],
      [T`Can a graph have degrees 3, 3, 3?`, ['No', 'Yes'], T`The degrees sum to 9, which is odd.`],
      [T`How many edges does a tree with 10 vertices have?`, 9, T`A tree always has one fewer edge than vertices.`]
    ]
  },
  'Recurrence relations': {
    hook: T`
<p>A recurrence defines each term from earlier ones. In the Tower of Hanoi you move a stack of disks to another peg, one at a time, never placing a larger disk on a smaller one.</p>
${fig('hanoi', {}, 'Three pegs, three disks.')}
<p>To move \(n\) disks: move the top \(n - 1\) aside, move the largest, then move the \(n - 1\) back on top. So \(T(n) = 2T(n - 1) + 1\), which works out to \(T(n) = 2^n - 1\).</p>`,
    vary: [
      [T`With \(T(1) = 1\) and \(T(n) = 2T(n-1) + 1\), find \(T(3)\).`, 7, T`\(T(2) = 3\), then \(2\cdot3 + 1\).`],
      [T`Find \(T(4)\).`, 15, T`One more step of the same rule.`],
      [T`Find \(T(10)\).`, 1023, T`Use the closed form \(2^{10} - 1\) instead of stepping.`],
      [T`Fibonacci: \(F_1 = F_2 = 1\), \(F_n = F_{n-1} + F_{n-2}\). Find \(F_8\).`, 21, T`1, 1, 2, 3, 5, 8, 13, 21.`],
      [T`\(a_0 = 2\), \(a_n = 3a_{n-1}\). Find \(a_4\).`, 162, T`Geometric: \(2\cdot3^4\).`]
    ]
  },
  'Growth of functions': {
    hook: T`
<p>Big-O notation compares how fast running times grow as the input gets large, ignoring constant factors. The ranking below matters far more than any constant.</p>
${fig('growth', {}, T`\(\log n \ll n \ll n\log n \ll n^2 \ll 2^n\).`)}
<p>A useful test: double the input. A linear algorithm takes twice as long, a quadratic one four times as long, and an exponential one squares its running time.</p>`,
    vary: [
      [T`The input doubles. How many times longer does an \(O(n^2)\) algorithm take?`, 4, T`\((2n)^2 = 4n^2\).`],
      [T`Same question for \(O(n^3)\).`, 8, T`\((2n)^3\).`],
      [T`What is \(\log_2\) of one million, to the nearest whole number?`, 20, T`\(2^{20} \approx 10^6\): binary search needs about 20 steps.`],
      [T`Which grows fastest?`, [T`\(n!\)`, T`\(2^n\)`, T`\(n^{100}\)`], T`Factorial beats every exponential, which beats every polynomial.`]
    ]
  }
});
