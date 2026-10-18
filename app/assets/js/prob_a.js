'use strict';
// Probability and statistics (version 1.8): a calculus-based probability course and an introduction to mathematical
// statistics. Part A: tables, figures, and units 1 to 10. Every generator has an independent check (v or vk).
(() => {
  // z, t, and chi-square tables, computed with mpmath (normal CDF, regularized incomplete beta and gamma) and rounded.
  const TB = window.PROB_TABLES = {"phi":{"0.0":0.5,"0.1":0.5398,"0.2":0.5793,"0.3":0.6179,"0.4":0.6554,"0.5":0.6915,"0.6":0.7257,"0.7":0.758,"0.8":0.7881,"0.9":0.8159,"1.0":0.8413,"1.1":0.8643,"1.2":0.8849,"1.3":0.9032,"1.4":0.9192,"1.5":0.9332,"1.6":0.9452,"1.7":0.9554,"1.8":0.9641,"1.9":0.9713,"2.0":0.9772,"2.1":0.9821,"2.2":0.9861,"2.3":0.9893,"2.4":0.9918,"2.5":0.9938,"2.6":0.9953,"2.7":0.9965,"2.8":0.9974,"2.9":0.9981,"3.0":0.9987,"3.1":0.999,"3.2":0.9993,"3.3":0.9995,"3.4":0.9997},"t":{"1":[6.314,12.706,63.657],"2":[2.92,4.303,9.925],"3":[2.353,3.182,5.841],"4":[2.132,2.776,4.604],"5":[2.015,2.571,4.032],"6":[1.943,2.447,3.707],"7":[1.895,2.365,3.499],"8":[1.86,2.306,3.355],"9":[1.833,2.262,3.25],"10":[1.812,2.228,3.169],"11":[1.796,2.201,3.106],"12":[1.782,2.179,3.055],"13":[1.771,2.16,3.012],"14":[1.761,2.145,2.977],"15":[1.753,2.131,2.947],"16":[1.746,2.12,2.921],"17":[1.74,2.11,2.898],"18":[1.734,2.101,2.878],"19":[1.729,2.093,2.861],"20":[1.725,2.086,2.845],"21":[1.721,2.08,2.831],"22":[1.717,2.074,2.819],"23":[1.714,2.069,2.807],"24":[1.711,2.064,2.797],"25":[1.708,2.06,2.787],"26":[1.706,2.056,2.779],"27":[1.703,2.052,2.771],"28":[1.701,2.048,2.763],"29":[1.699,2.045,2.756],"30":[1.697,2.042,2.75],"40":[1.684,2.021,2.704],"60":[1.671,2.0,2.66],"120":[1.658,1.98,2.617],"inf":[1.645,1.96,2.576]},"chi":{"1":[0.001,3.841,5.024,6.635],"2":[0.051,5.991,7.378,9.21],"3":[0.216,7.815,9.348,11.345],"4":[0.484,9.488,11.143,13.277],"5":[0.831,11.07,12.833,15.086],"6":[1.237,12.592,14.449,16.812],"7":[1.69,14.067,16.013,18.475],"8":[2.18,15.507,17.535,20.09],"9":[2.7,16.919,19.023,21.666],"10":[3.247,18.307,20.483,23.209],"11":[3.816,19.675,21.92,24.725],"12":[4.404,21.026,23.337,26.217],"13":[5.009,22.362,24.736,27.688],"14":[5.629,23.685,26.119,29.141],"15":[6.262,24.996,27.488,30.578]}};
  const Phi = z => (z < 0 ? +(1 - TB.phi[(-z).toFixed(1)]).toFixed(4) : TB.phi[z.toFixed(1)]);
  window.PROB_PHI = Phi;
  const ztab = () => {
    const keys = Object.keys(TB.phi), rows = Math.ceil(keys.length / 3);
    let h = '<table class="tt ztab"><tr><th>\\(z\\)</th><th>\\(\\Phi(z)\\)</th><th>\\(z\\)</th><th>\\(\\Phi(z)\\)</th><th>\\(z\\)</th><th>\\(\\Phi(z)\\)</th></tr>';
    for (let r = 0; r < rows; r++) h += '<tr>' + [0, 1, 2].map(c => { const k = keys[r + c * rows]; return k ? `<td>${k}</td><td>${TB.phi[k].toFixed(4)}</td>` : '<td></td><td></td>'; }).join('') + '</tr>';
    return h + '</table><p class="ctr hint">\\(\\Phi(z) = P(Z \\le z)\\). For negative \\(z\\), use \\(\\Phi(-z) = 1 - \\Phi(z)\\).</p>';
  };
  const ttab = () => `<table class="tt ztab"><tr><th>df</th><th>\\(t_{0.05}\\)</th><th>\\(t_{0.025}\\)</th><th>\\(t_{0.005}\\)</th></tr>${Object.entries(TB.t).map(([d, v]) => `<tr><td>${d === 'inf' ? '\\(\\infty\\)' : d}</td><td>${v[0].toFixed(3)}</td><td>${v[1].toFixed(3)}</td><td>${v[2].toFixed(3)}</td></tr>`).join('')}</table><p class="ctr hint">Upper-tail area in the subscript: \\(t_{0.025}\\) gives a 95% two-sided interval or test.</p>`;
  const ctab = () => `<table class="tt ztab"><tr><th>df</th><th>\\(\\chi^2_{0.975}\\)</th><th>\\(\\chi^2_{0.05}\\)</th><th>\\(\\chi^2_{0.025}\\)</th><th>\\(\\chi^2_{0.01}\\)</th></tr>${Object.entries(TB.chi).map(([d, v]) => `<tr><td>${d}</td>${[0, 1, 2, 3].map(i => `<td>${v[i].toFixed(3)}</td>`).join('')}</tr>`).join('')}</table><p class="ctr hint">Subscript = area to the right. \\(\\chi^2_{0.975}\\) is the lower cutoff for a 95% interval.</p>`;
  window.PROB_TAB = { ztab, ttab, ctab };

  // ---------------- Figures ----------------
  const F = window.FIGS, { Plot } = F.util;
  const fct = n => (n <= 1 ? 1 : n * fct(n - 1)), Cn = (n, k) => (k < 0 || k > n ? 0 : Math.round(fct(n) / (fct(k) * fct(n - k))));
  const PMFS = {
    bin3: { name: 'Binomial(10, 0.3)', f: k => (k > 10 ? 0 : Cn(10, k) * 0.3 ** k * 0.7 ** (10 - k)), m: 3, v: 2.1 },
    bin7: { name: 'Binomial(10, 0.7)', f: k => (k > 10 ? 0 : Cn(10, k) * 0.7 ** k * 0.3 ** (10 - k)), m: 7, v: 2.1 },
    pois: { name: 'Poisson(3)', f: k => Math.exp(-3) * 3 ** k / fct(k), m: 3, v: 3 },
    geo: { name: 'Geometric(0.3)', f: k => (k < 1 ? 0 : 0.7 ** (k - 1) * 0.3), m: 1 / 0.3, v: 0.7 / 0.09 }
  };
  F.pmfBars = {
    controls: [{ k: 'd', label: 'distribution', options: [['bin3', 'Bin(10, 0.3)'], ['bin7', 'Bin(10, 0.7)'], ['pois', 'Poisson(3)'], ['geo', 'Geom(0.3)']], val: 'bin3' }],
    draw(s) {
      const D = PMFS[s.d], p = Plot({ x: [-0.8, 12.8], y: [0, 0.4], h: 200 }).axes({ xt: [0, 2, 4, 6, 8, 10, 12].map(v => [v, String(v)]), yt: [[0.1, '0.1'], [0.2, '0.2'], [0.3, '0.3']], xl: 'k', yl: '' });
      for (let k = 0; k <= 12; k++) { const h = D.f(k); if (h > 0.0005) p.poly([[k - 0.35, 0], [k + 0.35, 0], [k + 0.35, h], [k - 0.35, h]], 'rect'); }
      p.seg(D.m, 0, D.m, 0.37, 'b dash'); p.txt(D.m, 0.37, 'mean', { dy: -4, a: 'middle', cls: 'tk' });
      return p.svg();
    },
    read: s => { const D = PMFS[s.d]; return `${D.name}: mean ${D.m.toFixed(2)}, variance ${D.v.toFixed(2)}. Bar heights are P(X = k) and add to 1.`; }
  };
  F.pdfArea = {
    controls: [{ k: 't', label: 'cutoff t', min: 0.1, max: 4, step: 0.1, val: 1, fmt: v => v.toFixed(1) }],
    draw(s) {
      const f = x => (x < 0 ? 0 : Math.exp(-x)), p = Plot({ x: [-0.3, 5], y: [0, 1.1], h: 190 }).axes({ xt: [1, 2, 3, 4].map(v => [v, String(v)]), yt: [[0.5, '0.5'], [1, '1']], xl: 'x', yl: 'f(x)' });
      p.shade(f, () => 0, 0, s.t, 'fa').fn(f, 'a', 0, 4.9).seg(s.t, 0, s.t, f(s.t), 'b');
      return p.svg();
    },
    read: s => `For the Exponential(1) density, P(X ≤ ${s.t.toFixed(1)}) is the shaded area: 1 − e^(−${s.t.toFixed(1)}) = ${(1 - Math.exp(-s.t)).toFixed(4)}. Total area is 1.`
  };

  // ======================= SUBJECT =======================
  registerSubject({ id: 'prob', name: 'Probability and statistics', color: '#5B4B8A', blurb: 'Distributions, expectation, limit theorems, estimation, intervals, and tests, with the math behind them', questions: [], generators: [] });
  const U = ['Sample spaces and the axioms', 'Counting for probability', 'Conditional probability and Bayes', 'Discrete random variables', 'Bernoulli, binomial, geometric', 'Poisson, hypergeometric, negative binomial', 'Continuous random variables', 'Uniform, exponential, gamma', 'The normal distribution', 'Joint distributions'];
  window.PROB_UNITS_A = U;

  registerLearn('prob', [
    { title: U[0], skill: U[0],
      hook: T`<p>Probability starts with an experiment and its <b>sample space</b> \(S\), the set of all possible outcomes. An <b>event</b> is a subset of \(S\). When outcomes are equally likely, \(P(A) = \frac{|A|}{|S|}\): count and divide. Two dice have 36 equally likely ordered outcomes, and "sum is 4" is the event \(\{(1,3), (2,2), (3,1)\}\), so \(P = \frac{3}{36}\).</p>`,
      body: T`
<h4>The three axioms</h4>
<p>Every probability rule follows from three statements:</p>
<p>1. \(P(A) \ge 0\) for every event. 2. \(P(S) = 1\). 3. If \(A_1, A_2, \ldots\) are disjoint, \(P(A_1 \cup A_2 \cup \cdots) = P(A_1) + P(A_2) + \cdots\).</p>
<h4>Consequences</h4>
<p><b>Complement:</b> \(A\) and \(A^c\) are disjoint with union \(S\), so \(P(A^c) = 1 - P(A)\), and \(P(\varnothing) = 0\).</p>
<p><b>Monotonicity:</b> if \(A \subseteq B\), then \(P(A) \le P(B)\).</p>
<p><b>Difference:</b> \(P(A \cap B^c) = P(A) - P(A \cap B)\) ("A but not B").</p>
<p><b>Inclusion–exclusion:</b> adding \(P(A)\) and \(P(B)\) counts the overlap twice:</p>
\[\begin{aligned}&P(A \cup B)\\ &= P(A) + P(B) - P(A \cap B)\end{aligned}\]
\[\begin{aligned}&P(A \cup B \cup C)\\ &= P(A) + P(B) + P(C)\\ &\quad - P(AB) - P(AC) - P(BC)\\ &\quad + P(ABC)\end{aligned}\]
<p><b>Exactly one</b> of \(A, B\): \(P(A) + P(B) - 2P(A \cap B)\). <b>Neither:</b> \(1 - P(A \cup B)\).</p>
${fig('venn2', {}, 'Pick a region to see which pieces of the diagram it uses.')}`,
      ex: { q: T`\(P(A) = 0.5\), \(P(B) = 0.4\), and \(P(A \cup B) = 0.7\). Find \(P(A \cap B)\), the probability of exactly one, and the probability of neither.`, a: T`<p>\(P(A \cap B) = 0.5 + 0.4 - 0.7 = 0.2\).</p><p>Exactly one: \(0.5 + 0.4 - 2(0.2) = 0.5\).</p><p>Neither: \(1 - 0.7 = 0.3\). Check: \(0.2 + 0.5 + 0.3 = 1\).</p>` },
      exs: [{ q: T`In a class, 20 students take French, 15 Spanish, 10 German; 6 take French and Spanish, 4 French and German, 3 Spanish and German, and 2 all three. How many take at least one language?`, a: T`<p>\(20 + 15 + 10 - 6 - 4 - 3 + 2 = 34\).</p>` }],
      trap: T`Adding \(P(A) + P(B)\) for events that can happen together. Subtract the overlap unless the events are disjoint.`,
      vary: [[T`\(P(A) = 0.3\). Find \(P(A^c)\).`, 0.7, T`Complement.`], [T`\(P(A) = 0.3\), \(P(B) = 0.5\), disjoint. Find \(P(A \cup B)\).`, 0.8, T`No overlap to remove.`], [T`Now \(P(A \cap B) = 0.1\). Find \(P(A \cup B)\).`, 0.7, T`Subtract the overlap once.`], [T`Same events. Find \(P(\text{exactly one})\).`, 0.6, T`\(0.3 + 0.5 - 2(0.1)\).`], [T`Same events. Find \(P(A \text{ but not } B)\).`, 0.2, T`\(0.3 - 0.1\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>With equally likely outcomes, probability is a ratio of two counts. The only rule is consistency: if you count ordered outcomes on top, count ordered outcomes on the bottom too.</p>`,
      body: T`
<table class="tt"><tr><th>Choosing \(k\) from \(n\)</th><th>Without replacement</th><th>With replacement</th></tr>
<tr><td>order matters</td><td>\(\frac{n!}{(n-k)!}\)</td><td>\(n^k\)</td></tr>
<tr><td>order ignored</td><td>\(\binom nk\)</td><td>\(\binom{n+k-1}{k}\)</td></tr></table>
<p><b>Multinomial coefficient.</b> Splitting \(n\) items into groups of sizes \(n_1, \ldots, n_r\): \(\frac{n!}{n_1!\cdots n_r!}\).</p>
<p><b>All different.</b> \(n\) rolls of a \(d\)-sided die all differ with probability \(\frac{d(d-1)\cdots(d-n+1)}{d^n}\). The birthday problem is the same calculation with \(d = 365\); at 23 people a shared birthday passes 50%.</p>
<p><b>Card hands.</b> A 5-card hand with exactly \(k\) hearts: choose the hearts and the non-hearts separately, \(\frac{\binom{13}{k}\binom{39}{5-k}}{\binom{52}{5}}\).</p>
<p><b>Specific members.</b> A random committee of \(k\) from \(n\) contains two particular people with probability \(\frac{\binom{n-2}{k-2}}{\binom nk} = \frac{k(k-1)}{n(n-1)}\).</p>`,
      ex: { q: T`Three dice are rolled. What is the probability all three show different numbers?`, a: T`<p>Ordered outcomes: \(6^3 = 216\). All different, ordered: \(6\cdot5\cdot4 = 120\). Probability \(\frac{120}{216} = \frac59 \approx 0.556\).</p>` },
      exs: [{ q: T`What is the probability a 5-card hand has exactly 2 hearts?`, a: T`<p>\(\frac{\binom{13}{2}\binom{39}{3}}{\binom{52}{5}} = \frac{78\cdot9139}{2{,}598{,}960} \approx 0.274\).</p>` }],
      trap: T`Counting ordered outcomes in the numerator and unordered ones in the denominator.`,
      vary: [[T`Two dice. P(both show different numbers)?`, 5 / 6, T`\(\frac{6\cdot5}{36}\).`], [T`Four dice. P(all different)?`, 360 / 1296, T`\(\frac{6\cdot5\cdot4\cdot3}{6^4}\).`], [T`A committee of 3 is chosen from 10 people. P(it includes both Ann and Ben)?`, 6 / 90, T`\(\frac{3\cdot2}{10\cdot9}\).`], [T`Arrange AABB randomly. P(the two As are adjacent)?`, 0.5, T`6 distinct orders: AABB, ABAB, ABBA, BAAB, BABA, BBAA. Three keep the As together.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Conditioning on \(B\) means restricting attention to the outcomes where \(B\) happened and rescaling so they total 1.</p>\[P(A\mid B) = \frac{P(A \cap B)}{P(B)}\]`,
      body: T`
<p><b>Multiplication rule:</b> \(P(A \cap B) = P(B)P(A\mid B) = P(A)P(B\mid A)\). Chains extend: \(P(ABC) = P(A)P(B\mid A)P(C\mid AB)\).</p>
<p><b>Law of total probability.</b> If \(B_1, \ldots, B_k\) split the sample space into disjoint pieces,</p>
\[P(A) = \sum_i P(A\mid B_i)P(B_i)\]
<p><b>Bayes' rule</b> reverses the conditioning:</p>
\[P(B_j\mid A) = \frac{P(A\mid B_j)P(B_j)}{\sum_i P(A\mid B_i)P(B_i)}\]
${fig('bayesTree', {}, 'Multiply along branches; add the branches that end in the observed event; divide.')}
<p><b>Independence:</b> \(P(A \cap B) = P(A)P(B)\), equivalently \(P(A\mid B) = P(A)\). Disjoint events with positive probability are never independent: knowing one happened rules the other out.</p>`,
      ex: { q: T`Urn 1 has 3 red and 2 blue balls; urn 2 has 1 red and 4 blue. A fair coin picks the urn, then a ball is drawn. It is red. What is the probability it came from urn 1?`, a: T`<p>Total probability: \(P(R) = \frac12\cdot\frac35 + \frac12\cdot\frac15 = \frac{4}{10}\).</p><p>Bayes: \(P(U_1\mid R) = \frac{\frac12\cdot\frac35}{\frac4{10}} = \frac{3/10}{4/10} = \frac34\).</p>` },
      exs: [{ q: T`Two dice are rolled. Given the sum is 8, what is the probability the first die is 3?`, a: T`<p>Sum 8: (2,6), (3,5), (4,4), (5,3), (6,2), five outcomes. One has first die 3: \(\frac15\).</p>` }],
      trap: T`Confusing \(P(A\mid B)\) with \(P(B\mid A)\). A positive test given disease is not disease given a positive test.`,
      vary: [[T`\(P(A \cap B) = 0.12\), \(P(B) = 0.4\). Find \(P(A\mid B)\).`, 0.3, T`\(0.12/0.4\).`], [T`Independent with \(P(A) = 0.3\), \(P(B) = 0.4\). Find \(P(A \cap B)\).`, 0.12, T`Multiply.`], [T`Disjoint with \(P(A) = 0.3\), \(P(B) = 0.4\). Find \(P(A \cap B)\).`, 0, T`Disjoint means no overlap.`], [T`Two dice, sum is 7. P(first die is 6)?`, 1 / 6, T`Six outcomes, one with a 6 first.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>A random variable assigns a number to each outcome: the sum of two dice, the number of heads, a payoff. Its <b>probability mass function</b> (PMF) \(p(x) = P(X = x)\) lists each value with its probability.</p>`,
      body: T`
<p>A PMF is nonnegative and sums to 1. The <b>cumulative distribution function</b> \(F(x) = P(X \le x)\) is a step function that climbs from 0 to 1.</p>
<p><b>Expectation:</b> \(E[X] = \sum x\,p(x)\), the balance point of the PMF.</p>
<p><b>Expectation of a function</b> (no need to find the distribution of \(g(X)\)): \(E[g(X)] = \sum g(x)\,p(x)\).</p>
<p><b>Variance:</b> \(\operatorname{Var}(X) = E[(X - \mu)^2] = E[X^2] - (E[X])^2\); standard deviation \(\sigma = \sqrt{\operatorname{Var}(X)}\).</p>
<p><b>Linear changes:</b> \(E[aX + b] = aE[X] + b\) and \(\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)\). Adding a constant shifts without spreading; scaling by \(a\) scales the spread by \(|a|\).</p>
<table class="tt"><tr><th>\(x\)</th><td>0</td><td>1</td><td>2</td></tr><tr><th>\(p(x)\)</th><td>0.2</td><td>0.5</td><td>0.3</td></tr></table>
<p>Here \(E[X] = 0.5 + 0.6 = 1.1\), \(E[X^2] = 0.5 + 1.2 = 1.7\), \(\operatorname{Var}(X) = 1.7 - 1.21 = 0.49\), \(\sigma = 0.7\).</p>`,
      ex: { q: T`\(X\) takes values 1, 2, 4 with probabilities 0.5, 0.3, 0.2. Find \(E[X]\), \(\operatorname{Var}(X)\), and \(\operatorname{Var}(3X + 2)\).`, a: T`<p>\(E[X] = 0.5 + 0.6 + 0.8 = 1.9\). \(E[X^2] = 0.5 + 1.2 + 3.2 = 4.9\).</p><p>\(\operatorname{Var}(X) = 4.9 - 3.61 = 1.29\). \(\operatorname{Var}(3X + 2) = 9(1.29) = 11.61\).</p>` },
      trap: T`Writing \(\operatorname{Var}(aX + b) = a\operatorname{Var}(X) + b\). The constant adds nothing and the scale is squared.`,
      vary: [[T`\(E[X] = 4\). Find \(E[2X - 3]\).`, 5, T`Linearity.`], [T`\(\operatorname{Var}(X) = 4\). Find \(\operatorname{Var}(2X - 3)\).`, 16, T`\(2^2\cdot4\).`], [T`\(E[X] = 2\), \(\operatorname{Var}(X) = 3\). Find \(E[X^2]\).`, 7, T`\(\operatorname{Var} + \mu^2\).`], [T`PMF 0.2, 0.5, 0.3 on 0, 1, 2. Find \(P(X \ge 1)\).`, 0.8, T`\(0.5 + 0.3\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Three distributions come from repeating one yes-or-no trial with success probability \(p\): one trial (Bernoulli), the number of successes in \(n\) trials (binomial), and the number of trials until the first success (geometric).</p>${fig('pmfBars', {}, 'Bar heights are probabilities. The dashed line marks the mean.')}`,
      body: T`
<table class="tt"><tr><th>Distribution</th><th>\(P(X = k)\)</th><th>Mean</th><th>Variance</th></tr>
<tr><td>Bernoulli\((p)\)</td><td>\(p\) at 1, \(q = 1 - p\) at 0</td><td>\(p\)</td><td>\(pq\)</td></tr>
<tr><td>Binomial\((n, p)\)</td><td>\(\binom nk p^k q^{n-k}\)</td><td>\(np\)</td><td>\(npq\)</td></tr>
<tr><td>Geometric\((p)\), \(k = 1, 2, \ldots\)</td><td>\(q^{k-1}p\)</td><td>\(\frac1p\)</td><td>\(\frac{q}{p^2}\)</td></tr></table>
<p><b>Why binomial.</b> A particular sequence with \(k\) successes has probability \(p^kq^{n-k}\), and \(\binom nk\) sequences have exactly \(k\) successes. The mean and variance follow because \(X\) is a sum of \(n\) independent Bernoullis: means add and, by independence, variances add.</p>
<p><b>Why geometric.</b> The first success on trial \(k\) needs \(k - 1\) failures then a success. The tail is simpler: \(P(X > k) = q^k\), the first \(k\) trials all fail. It is memoryless: \(P(X > m + k\mid X > m) = q^k\).</p>`,
      ex: { q: T`A basketball player makes 70% of free throws. In 5 shots, what is the probability of exactly 4 makes? Of at least 4?`, a: T`<p>\(P(4) = \binom54(0.7)^4(0.3) = 5(0.2401)(0.3) = 0.36015\).</p><p>\(P(5) = 0.7^5 = 0.16807\). At least 4: \(0.36015 + 0.16807 \approx 0.528\).</p>` },
      exs: [{ q: T`A die is rolled until a 6 appears. Find the probability it takes more than 3 rolls, and the expected number of rolls.`, a: T`<p>More than 3 rolls means the first three are not 6: \(\left(\frac56\right)^3 = \frac{125}{216} \approx 0.579\). Expected rolls: \(\frac1{1/6} = 6\).</p>` }],
      trap: T`Forgetting the \(\binom nk\): \(p^kq^{n-k}\) is the probability of one particular order, not of \(k\) successes.`,
      vary: [[T`Binomial(10, 0.3). Mean?`, 3, T`\(np\).`], [T`Binomial(10, 0.3). Variance?`, 2.1, T`\(npq = 10(0.3)(0.7)\).`], [T`Binomial(4, 0.5). \(P(X = 2)\)?`, 0.375, T`\(\frac{6}{16}\).`], [T`Geometric(0.25). Mean number of trials?`, 4, T`\(\frac1p\).`], [T`Geometric(0.25). \(P(X > 2)\)?`, 0.5625, T`\(0.75^2\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>The Poisson distribution counts rare events in a fixed window: calls per hour, defects per meter, trades per second. Its single parameter \(\lambda\) is both the mean and the variance.</p>`,
      body: T`
<p><b>Poisson\((\lambda)\):</b> \(P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}\) for \(k = 0, 1, 2, \ldots\); mean \(\lambda\), variance \(\lambda\).</p>
<p><b>Rates scale with the window.</b> At 3 per hour, a 20-minute window has \(\lambda = 1\). Independent Poisson counts add: Poisson\((\lambda_1)\) + Poisson\((\lambda_2)\) is Poisson\((\lambda_1 + \lambda_2)\).</p>
<p><b>Poisson approximation.</b> Binomial\((n, p)\) with large \(n\) and small \(p\) is close to Poisson\((np)\): 1,000 trials at \(p = 0.002\) behave like Poisson(2).</p>
<p><b>Hypergeometric:</b> drawing \(n\) without replacement from \(N\) items of which \(K\) are special,</p>
\[P(X = k) = \frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn},\qquad E[X] = n\frac KN\]
<p>It is the without-replacement version of the binomial: same mean, smaller variance.</p>
<p><b>Negative binomial:</b> the trial on which the \(r\)th success occurs: \(P(X = n) = \binom{n-1}{r-1}p^rq^{n-r}\); mean \(\frac rp\). The last trial must be the \(r\)th success, so only the first \(n - 1\) trials are arranged.</p>`,
      ex: { q: T`Orders arrive at 4 per minute on average, as a Poisson process. Find the probability of no orders in a 30-second window, and of at most 1 order in a minute.`, a: T`<p>30 seconds: \(\lambda = 2\), \(P(0) = e^{-2} \approx 0.135\).</p><p>One minute: \(\lambda = 4\), \(P(X \le 1) = e^{-4}(1 + 4) = 5e^{-4} \approx 0.092\).</p>` },
      exs: [{ q: T`A box has 10 parts, 3 defective. Draw 4 without replacement. P(exactly 1 defective)?`, a: T`<p>\(\frac{\binom31\binom73}{\binom{10}{4}} = \frac{3\cdot35}{210} = \frac12\).</p>` }],
      trap: T`Using the binomial for draws without replacement from a small population. Each draw changes the odds; use the hypergeometric.`,
      vary: [[T`Poisson(2). \(P(X = 0)\), three decimals.`, Math.exp(-2), T`\(e^{-2}\).`], [T`Poisson(2). Variance?`, 2, T`Equal to the mean.`], [T`3 per hour. \(\lambda\) for 2 hours?`, 6, T`Rates scale with the window.`], [T`Third success on trial 5, \(p = 0.5\). Probability?`, 6 / 32, T`\(\binom42(0.5)^5\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>A continuous random variable, such as a waiting time or a price change, takes values in an interval. Single points have probability 0; probability is <b>area under a density curve</b>.</p>${fig('pdfArea', {}, 'Probability is the shaded area under the density.')}`,
      body: T`
<p>A <b>density</b> \(f\) satisfies \(f(x) \ge 0\) and \(\int_{-\infty}^\infty f(x)\,dx = 1\). Then \(P(a \le X \le b) = \int_a^b f(x)\,dx\), and \(P(X = a) = 0\), so \(<\) and \(\le\) give the same probability.</p>
<p>The <b>CDF</b> \(F(x) = P(X \le x) = \int_{-\infty}^x f(t)\,dt\) rises from 0 to 1, and \(f = F'\). So \(P(a < X \le b) = F(b) - F(a)\).</p>
<p><b>Expectation and variance</b> replace sums by integrals: \(E[X] = \int x f(x)\,dx\), \(E[g(X)] = \int g(x)f(x)\,dx\), \(\operatorname{Var}(X) = E[X^2] - (E[X])^2\).</p>
<p>The <b>median</b> \(m\) solves \(F(m) = \frac12\); the \(q\)th percentile solves \(F(x) = q\).</p>
<p><b>Finding the constant.</b> If \(f(x) = cx^2\) on \([0, 3]\), then \(\int_0^3 cx^2\,dx = 9c = 1\), so \(c = \frac19\).</p>`,
      ex: { q: T`\(f(x) = 2x\) on \([0, 1]\). Find \(P(X \le \frac12)\), \(E[X]\), \(\operatorname{Var}(X)\), and the median.`, a: T`<p>\(F(x) = x^2\), so \(P(X \le \frac12) = \frac14\).</p><p>\(E[X] = \int_0^1 2x^2\,dx = \frac23\). \(E[X^2] = \int_0^1 2x^3\,dx = \frac12\). \(\operatorname{Var} = \frac12 - \frac49 = \frac1{18}\).</p><p>Median: \(m^2 = \frac12\), \(m = \frac{1}{\sqrt2} \approx 0.707\).</p>` },
      trap: T`Reading \(f(x)\) as a probability. A density can exceed 1; only areas are probabilities.`,
      vary: [[T`\(f(x) = c\) on \([0, 4]\). Find \(c\).`, 0.25, T`Area \(4c = 1\).`], [T`\(f(x) = cx\) on \([0, 2]\). Find \(c\).`, 0.5, T`\(\int_0^2 cx\,dx = 2c\).`], [T`\(F(x) = x^3\) on \([0, 1]\). \(P(X \le 0.5)\)?`, 0.125, T`\(F(0.5)\).`], [T`Same \(F\). Find \(f(x)\) at \(x = 0.5\).`, 0.75, T`\(f = 3x^2\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Two continuous shapes appear constantly: the flat <b>uniform</b> density and the decaying <b>exponential</b> density for waiting times. Sums of exponentials give the <b>gamma</b>.</p>`,
      body: T`
<table class="tt"><tr><th></th><th>Uniform\((a, b)\)</th><th>Exponential\((\lambda)\)</th><th>Gamma\((k, \lambda)\)</th></tr>
<tr><td>density</td><td>\(\frac{1}{b - a}\) on \([a, b]\)</td><td>\(\lambda e^{-\lambda x}\), \(x \ge 0\)</td><td>sum of \(k\) independent Exp\((\lambda)\)</td></tr>
<tr><td>mean</td><td>\(\frac{a + b}{2}\)</td><td>\(\frac1\lambda\)</td><td>\(\frac k\lambda\)</td></tr>
<tr><td>variance</td><td>\(\frac{(b - a)^2}{12}\)</td><td>\(\frac1{\lambda^2}\)</td><td>\(\frac k{\lambda^2}\)</td></tr></table>
<p><b>Uniform probabilities</b> are length ratios: \(P(c \le X \le d) = \frac{d - c}{b - a}\) for \([c, d]\) inside \([a, b]\).</p>
<p><b>Exponential survival:</b> \(P(X > t) = e^{-\lambda t}\), CDF \(1 - e^{-\lambda t}\), median \(\frac{\ln2}{\lambda}\).</p>
<p><b>Memorylessness:</b> \(P(X > s + t\mid X > s) = \frac{e^{-\lambda(s + t)}}{e^{-\lambda s}} = e^{-\lambda t}\). Having waited \(s\) changes nothing about the remaining wait.</p>
<p><b>Link to Poisson.</b> If events occur as a Poisson process with rate \(\lambda\), the waits between them are Exponential\((\lambda)\), and the wait until the \(k\)th event is Gamma\((k, \lambda)\).</p>
<p><b>Racing exponentials.</b> For independent \(X \sim\) Exp\((\lambda_1)\) and \(Y \sim\) Exp\((\lambda_2)\), \(\min(X, Y) \sim\) Exp\((\lambda_1 + \lambda_2)\) and \(P(X < Y) = \frac{\lambda_1}{\lambda_1 + \lambda_2}\).</p>`,
      ex: { q: T`A component's lifetime is exponential with mean 5 years. Find P(it lasts more than 10 years), and P(it lasts 3 more years given it has lasted 4).`, a: T`<p>\(\lambda = \frac15\). \(P(X > 10) = e^{-2} \approx 0.135\).</p><p>Memoryless: \(P(X > 7\mid X > 4) = P(X > 3) = e^{-0.6} \approx 0.549\).</p>` },
      trap: T`Treating the exponential parameter as the mean. Exponential\((\lambda)\) has mean \(\frac1\lambda\).`,
      vary: [[T`Uniform(0, 10). \(P(2 \le X \le 5)\)?`, 0.3, T`Length 3 of 10.`], [T`Uniform(0, 12). Variance?`, 12, T`\(\frac{144}{12}\).`], [T`Exponential with mean 2. \(\lambda\)?`, 0.5, T`\(\frac1{\text{mean}}\).`], [T`Exp(1). \(P(X > 1)\), three decimals.`, Math.exp(-1), T`\(e^{-1}\).`], [T`Sum of 3 independent Exp(2). Mean?`, 1.5, T`\(\frac k\lambda\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>The normal distribution is the bell curve: symmetric about its mean \(\mu\), with spread set by \(\sigma\). It appears because sums of many small independent effects are approximately normal (the central limit theorem, a later unit).</p>${fig('normal', {}, 'Area within ±z of the mean. The middle 95% reaches z = 1.96.')}`,
      body: T`
<p><b>Standardize</b> to use one table: if \(X \sim N(\mu, \sigma^2)\), then \(Z = \frac{X - \mu}{\sigma} \sim N(0, 1)\), and</p>
\[P(X \le x) = \Phi\!\left(\frac{x - \mu}{\sigma}\right)\]
<p><b>Symmetry:</b> \(\Phi(-z) = 1 - \Phi(z)\). <b>Upper tail:</b> \(P(Z > z) = 1 - \Phi(z)\). <b>Between:</b> \(P(a < Z < b) = \Phi(b) - \Phi(a)\).</p>
<p><b>Rule of thumb:</b> about 68%, 95%, and 99.7% within 1, 2, and 3 standard deviations.</p>
<p><b>Percentiles</b> run the table backward: the 90th percentile has \(\Phi(z) = 0.90\), \(z \approx 1.28\), so \(x = \mu + 1.28\sigma\).</p>
<p><b>Combining normals.</b> For independent normals, \(aX + bY\) is normal with mean \(a\mu_X + b\mu_Y\) and variance \(a^2\sigma_X^2 + b^2\sigma_Y^2\). A difference \(X - Y\) has variance \(\sigma_X^2 + \sigma_Y^2\): variances add even when you subtract.</p>
${ztab()}`,
      ex: { q: T`Heights are \(N(170, 10^2)\) cm. Find \(P(X > 185)\) and \(P(160 < X < 180)\).`, a: T`<p>\(z = \frac{185 - 170}{10} = 1.5\): \(1 - \Phi(1.5) = 1 - 0.9332 = 0.0668\).</p><p>\(z = \pm1\): \(\Phi(1) - \Phi(-1) = 0.8413 - 0.1587 = 0.6826\).</p>` },
      exs: [{ q: T`\(X \sim N(10, 3^2)\) and \(Y \sim N(6, 4^2)\) are independent. Find \(P(X > Y)\).`, a: T`<p>\(D = X - Y \sim N(4, 3^2 + 4^2) = N(4, 5^2)\). \(P(D > 0) = P\!\left(Z > \frac{0 - 4}{5}\right) = P(Z > -0.8) = \Phi(0.8) = 0.7881\).</p>` }],
      trap: T`Dividing by the variance instead of the standard deviation when standardizing.`,
      vary: [[T`\(P(Z \le 1)\)`, 0.8413, T`Table.`], [T`\(P(Z > 1)\)`, 0.1587, T`\(1 - 0.8413\).`], [T`\(P(Z \le -1)\)`, 0.1587, T`Symmetry.`], [T`\(P(-1 < Z < 1)\)`, 0.6826, T`The 68% rule, exactly.`], [T`\(N(50, 4^2)\). \(P(X \le 56)\)?`, 0.9332, T`\(z = 1.5\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Two random variables at once have a <b>joint distribution</b>: a table of \(P(X = x, Y = y)\) in the discrete case, or a density over a region of the plane in the continuous case.</p>`,
      body: T`
<p><b>Marginals.</b> Sum across a row or column of a joint table to recover one variable's distribution: \(p_X(x) = \sum_y p(x, y)\). For densities, integrate out the other variable: \(f_X(x) = \int f(x, y)\,dy\).</p>
<p><b>Conditionals.</b> \(P(Y = y\mid X = x) = \frac{p(x, y)}{p_X(x)}\): one row of the table, rescaled to total 1.</p>
<p><b>Independence</b> means every cell equals the product of its margins: \(p(x, y) = p_X(x)p_Y(y)\). One failing cell is enough to show dependence. For densities, \(f(x, y) = f_X(x)f_Y(y)\), which requires a rectangular region.</p>
<p><b>Probabilities of regions.</b> \(P((X, Y) \in A) = \iint_A f(x, y)\,dA\). For example, with \(f = 1\) on the unit square, \(P(X + Y \le 1) = \frac12\), the area of the triangle below the line.</p>
<p><b>Expectations:</b> \(E[g(X, Y)] = \sum\sum g(x, y)p(x, y)\) or \(\iint g f\,dA\).</p>
<table class="tt"><tr><th></th><th>\(Y = 0\)</th><th>\(Y = 1\)</th><th>\(p_X\)</th></tr><tr><th>\(X = 0\)</th><td>0.1</td><td>0.3</td><td>0.4</td></tr><tr><th>\(X = 1\)</th><td>0.2</td><td>0.4</td><td>0.6</td></tr><tr><th>\(p_Y\)</th><td>0.3</td><td>0.7</td><td>1</td></tr></table>
<p class="ctr">\(p_X(0)p_Y(0) = 0.12 \ne 0.1\): dependent.</p>`,
      ex: { q: T`Using the table above, find \(P(Y = 1\mid X = 0)\) and \(E[XY]\).`, a: T`<p>\(P(Y = 1\mid X = 0) = \frac{0.3}{0.4} = 0.75\).</p><p>\(XY = 1\) only in the cell \(X = 1, Y = 1\): \(E[XY] = 0.4\).</p>` },
      exs: [{ q: T`\(f(x, y) = c\) on the triangle \(0 < y < x < 1\). Find \(c\) and \(P(X < \frac12)\).`, a: T`<p>The triangle has area \(\frac12\), so \(c = 2\).</p><p>\(X < \frac12\) cuts off a smaller triangle of area \(\frac18\): probability \(2\cdot\frac18 = \frac14\).</p>` }],
      trap: T`Checking independence on one cell that happens to factor. Every cell must factor.`,
      vary: [[T`Table above. \(P(X = 1)\)?`, 0.6, T`Row total.`], [T`\(P(Y = 0)\)?`, 0.3, T`Column total.`], [T`\(P(X = 1\mid Y = 0)\)?`, 2 / 3, T`\(\frac{0.2}{0.3}\).`], [T`\(f = 1\) on the unit square. \(P(X + Y \le 1)\)?`, 0.5, T`Triangle area.`]] }
  ]);

  // ======================= FIXED PROBLEMS =======================
  addQuestions('prob', [
    { id: 'pr1', skill: U[0], q: T`Events \(A\) and \(B\) are disjoint with positive probabilities. Are they independent?`, c: ['No: \\(P(A \\cap B) = 0 \\ne P(A)P(B)\\)', 'Yes, always', 'Only if \\(P(A) = P(B)\\)', 'Cannot tell'], x: T`Disjoint events exclude each other, which is strong dependence.` },
    { id: 'pr2', skill: U[0], q: T`Which is always true?`, c: [T`\(P(A \cup B) \le P(A) + P(B)\)`, T`\(P(A \cup B) = P(A) + P(B)\)`, T`\(P(A \cap B) = P(A)P(B)\)`, T`\(P(A) \le P(A \cap B)\)`], x: T`Inclusion–exclusion subtracts a nonnegative overlap.` },
    { id: 'pr3', skill: U[1], q: T`In a room of 23 people (365 equally likely birthdays), the chance that some two share a birthday is closest to:`, c: ['0.51', '0.06', '0.25', '0.95'], x: T`\(1 - \frac{365\cdot364\cdots343}{365^{23}} \approx 0.507\).` },
    { id: 'pr4', skill: U[2], q: T`A test is 99% accurate for both sick and healthy people, and 1 in 1,000 people is sick. Given a positive test, the probability of being sick is about:`, c: ['0.09', '0.99', '0.5', '0.001'], x: T`\(\frac{0.99(0.001)}{0.99(0.001) + 0.01(0.999)} \approx 0.09\).` },
    { id: 'pr5', skill: U[3], q: T`For any random variable, \(\operatorname{Var}(X)\) equals:`, c: [T`\(E[X^2] - (E[X])^2\)`, T`\((E[X])^2 - E[X^2]\)`, T`\(E[X^2]\)`, T`\(E[(X - 1)^2]\)`], x: T`Expand \(E[(X - \mu)^2]\).` },
    { id: 'pr6', skill: U[4], q: T`Which describes the number of tosses until the first head?`, c: ['geometric', 'binomial', 'Poisson', 'hypergeometric'], x: T`Trials until the first success.` },
    { id: 'pr7', skill: U[5], q: T`For a Poisson random variable, the variance:`, c: ['equals the mean', 'equals the mean squared', 'is always 1', 'is twice the mean'], x: T`Both are \(\lambda\).` },
    { id: 'pr8', skill: U[6], q: T`For a continuous random variable, \(P(X = 2)\) is:`, c: ['0', T`\(f(2)\)`, T`\(F(2)\)`, '1'], x: T`A single point has no area.` },
    { id: 'pr9', skill: U[7], q: T`The exponential distribution is the only continuous distribution that is:`, c: ['memoryless', 'symmetric', 'bounded', 'discrete'], x: T`\(P(X > s + t\mid X > s) = P(X > t)\).` },
    { id: 'pr10', skill: U[8], q: T`About what fraction of a normal population lies within 2 standard deviations of the mean?`, c: ['95%', '68%', '99.7%', '50%'], x: T`\(\Phi(2) - \Phi(-2) = 0.9544\).` },
    { id: 'pr11', skill: U[9], q: T`If \(X\) and \(Y\) are independent, then \(P(X = x, Y = y)\) equals:`, c: [T`\(P(X = x)P(Y = y)\)`, T`\(P(X = x) + P(Y = y)\)`, T`\(P(X = x\mid Y = y)\)`, '0'], x: T`Definition of independence.` }
  ]);

  // ======================= GENERATORS =======================
  const r2 = v => Math.round(v * 100) / 100, pct = v => Math.round(v * 100);
  registerUnitGens('prob', { units: {
    [U[0]]: [
      { id: 'pa-sets', make(R) {
        const a = R.int(2, 7) / 10, b = R.int(2, 7) / 10, ab = R.int(Math.max(0, Math.round((a + b - 1) * 10)) + (a + b > 1 ? 0 : 0), Math.round(Math.min(a, b) * 10) - 1) / 10, un = +(a + b - ab).toFixed(2), k = R.int(0, 3);
        const Q = [[T`\(P(A) = ${a}\), \(P(B) = ${b}\), \(P(A \cap B) = ${ab}\). Find \(P(A \cup B)\).`, un, T`\(${a} + ${b} - ${ab} = ${R.fmt(un)}\).`, `Rational(${pct(a)} + ${pct(b)} - ${pct(ab)}, 100)`],
          [T`\(P(A) = ${a}\), \(P(B) = ${b}\), \(P(A \cup B) = ${un}\). Find \(P(A \cap B)\).`, ab, T`\(${a} + ${b} - ${un} = ${R.fmt(ab)}\).`, `Rational(${pct(a)} + ${pct(b)} - ${pct(un)}, 100)`],
          [T`\(P(A) = ${a}\), \(P(B) = ${b}\), \(P(A \cap B) = ${ab}\). Find the probability that exactly one occurs.`, +(a + b - 2 * ab).toFixed(2), T`\(${a} + ${b} - 2(${ab}) = ${R.fmt(+(a + b - 2 * ab).toFixed(2))}\).`, `Rational(${pct(a)} + ${pct(b)} - 2*${pct(ab)}, 100)`],
          [T`\(P(A) = ${a}\), \(P(B) = ${b}\), \(P(A \cap B) = ${ab}\). Find the probability that neither occurs.`, +(1 - un).toFixed(2), T`\(1 - P(A \cup B) = 1 - ${R.fmt(un)} = ${R.fmt(+(1 - un).toFixed(2))}\).`, `1 - Rational(${pct(a)} + ${pct(b)} - ${pct(ab)}, 100)`]][k];
        return { q: Q[0], answer: Q[1], x: Q[2], v: Q[3] };
      } },
      { id: 'pa-three', make(R) {
        const A = R.int(15, 30), B = R.int(12, 25), Cc = R.int(10, 20), abc = R.int(1, 4), ab = abc + R.int(1, 5), ac = abc + R.int(1, 4), bc = abc + R.int(1, 4), tot = A + B + Cc - ab - ac - bc + abc;
        return { q: T`In a survey, ${A} people use app A, ${B} use B, ${Cc} use C; ${ab} use A and B, ${ac} use A and C, ${bc} use B and C, and ${abc} use all three. How many use at least one?`, answer: tot,
          x: T`Inclusion–exclusion: \(${A} + ${B} + ${Cc} - ${ab} - ${ac} - ${bc} + ${abc} = ${tot}\).`, v: `${A} + ${B} + ${Cc} - ${ab} - ${ac} - ${bc} + ${abc}` };
      } },
      { id: 'pa-dice', make(R) {
        const k = R.int(0, 1);
        if (k === 0) { const s = R.int(3, 11); let n = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) n += a + b <= s;
          return { q: T`Two fair dice are rolled. What is the probability the sum is at most ${s}?`, answer: n / 36, tol: 0.001, hint: 'A fraction or three decimals.', x: T`${n} of the 36 outcomes have sum at most ${s}${s > 7 ? T`; easier as \(1 - \)(sum above ${s})` : ''}: \(${R.frac(n, 36)}\).`, v: `Rational(sum(1 for a in range(1, 7) for b in range(1, 7) if a + b <= ${s}), 36)` }; }
        const m = R.int(2, 5);
        return { q: T`Two fair dice are rolled. What is the probability that the larger number is exactly ${m}?`, answer: (2 * m - 1) / 36, tol: 0.001, hint: 'A fraction or three decimals.', x: T`\(P(\max \le ${m}) - P(\max \le ${m - 1}) = \frac{${m * m} - ${(m - 1) ** 2}}{36} = ${R.frac(2 * m - 1, 36)}\).`, v: `Rational(sum(1 for a in range(1, 7) for b in range(1, 7) if max(a, b) == ${m}), 36)` };
      } }
    ],
    [U[1]]: [
      { id: 'pc-distinct', make(R) {
        const d = R.pick([6, 8, 10, 12]), n = R.int(2, 4); let num = 1; for (let i = 0; i < n; i++) num *= d - i;
        return { q: T`A fair ${d}-sided die is rolled ${n} times. What is the probability all ${n} results are different?`, answer: num / d ** n, tol: 0.001, hint: 'Three decimals or a fraction.', x: T`\(\frac{${Array.from({ length: n }, (_, i) => d - i).join('\\cdot')}}{${d}^{${n}}} = \frac{${num}}{${d ** n}} \approx ${R.fmt(num / d ** n, 3)}\).`, v: `Rational(${num}, ${d}**${n})` };
      } },
      { id: 'pc-hand', make(R) {
        const k = R.int(0, 3), v = Cn(13, k) * Cn(39, 5 - k) / Cn(52, 5);
        return { q: T`A 5-card hand is dealt from a standard deck. What is the probability it contains exactly ${k} heart${k === 1 ? '' : 's'}?`, answer: v, tol: 0.001, hint: 'Three decimals.', x: T`\(\frac{\binom{13}{${k}}\binom{39}{${5 - k}}}{\binom{52}{5}} = \frac{${Cn(13, k)}\cdot${Cn(39, 5 - k)}}{2{,}598{,}960} \approx ${R.fmt(v, 3)}\).`, v: `binomial(13, ${k})*binomial(39, ${5 - k})/binomial(52, 5)` };
      } },
      { id: 'pc-comm', make(R) {
        const n = R.int(8, 20), k = R.int(3, 6), v = k * (k - 1) / (n * (n - 1));
        return { q: T`A committee of ${k} is chosen at random from ${n} people. What is the probability it includes two particular people?`, answer: v, tol: 0.001, hint: 'A fraction or three decimals.', x: T`\(\frac{\binom{${n - 2}}{${k - 2}}}{\binom{${n}}{${k}}} = \frac{${k}\cdot${k - 1}}{${n}\cdot${n - 1}} = ${R.frac(k * (k - 1), n * (n - 1))}\).`, v: `binomial(${n - 2}, ${k - 2})/binomial(${n}, ${k})` };
      } }
    ],
    [U[2]]: [
      { id: 'pb-urns', make(R) {
        const r1 = R.int(1, 5), b1 = R.int(1, 5), r2_ = R.int(1, 5), b2 = R.int(1, 5), ask = R.int(0, 1), p1 = r1 / (r1 + b1), p2 = r2_ / (r2_ + b2), pr = (p1 + p2) / 2;
        if (ask === 0) return { q: T`Urn 1 has ${r1} red and ${b1} blue balls; urn 2 has ${r2_} red and ${b2} blue. A fair coin chooses the urn and one ball is drawn. What is the probability it is red?`, answer: pr, tol: 0.001, hint: 'A fraction or three decimals.', x: T`Total probability: \(\frac12\cdot${R.frac(r1, r1 + b1)} + \frac12\cdot${R.frac(r2_, r2_ + b2)} \approx ${R.fmt(pr, 4)}\).`, v: `Rational(1, 2)*Rational(${r1}, ${r1 + b1}) + Rational(1, 2)*Rational(${r2_}, ${r2_ + b2})` };
        return { q: T`Urn 1 has ${r1} red and ${b1} blue balls; urn 2 has ${r2_} red and ${b2} blue. A fair coin chooses the urn and one ball is drawn. It is red. What is the probability it came from urn 1?`, answer: p1 / (p1 + p2), tol: 0.001, hint: 'A fraction or three decimals.', x: T`Bayes: \(\frac{\frac12\cdot${R.frac(r1, r1 + b1)}}{\frac12\cdot${R.frac(r1, r1 + b1)} + \frac12\cdot${R.frac(r2_, r2_ + b2)}} \approx ${R.fmt(p1 / (p1 + p2), 3)}\).`, v: `Rational(${r1}, ${r1 + b1})/(Rational(${r1}, ${r1 + b1}) + Rational(${r2_}, ${r2_ + b2}))` };
      } },
      { id: 'pb-dice', make(R) {
        const s = R.int(4, 10), a = R.int(Math.max(1, s - 6), Math.min(6, s - 1)); let n = 0; for (let x = 1; x <= 6; x++) if (s - x >= 1 && s - x <= 6) n++;
        return { q: T`Two fair dice are rolled and the sum is ${s}. What is the probability the first die shows ${a}?`, answer: 1 / n, tol: 0.001, hint: 'A fraction or three decimals.', x: T`Sum ${s} has ${n} equally likely outcomes; exactly one has first die ${a}: \(${R.frac(1, n)}\).`, v: `Rational(1, sum(1 for x in range(1, 7) for y in range(1, 7) if x + y == ${s}))` };
      } },
      { id: 'pb-test', make(R) {
        const p = R.pick([0.01, 0.02, 0.05, 0.1, 0.2]), s = R.pick([0.8, 0.9, 0.95, 0.99]), f = R.pick([0.02, 0.05, 0.1]), v = s * p / (s * p + f * (1 - p));
        return { q: T`A condition has prevalence ${p}. A test detects it with probability ${s} and has false-positive rate ${f}. Given a positive test, what is the probability of the condition?`, answer: v, tol: 0.001, hint: 'Three decimals.', x: T`\(\frac{${s}(${p})}{${s}(${p}) + ${f}(${R.fmt(1 - p)})} \approx ${R.fmt(v, 3)}\).`, v: `(Rational(${pct(s)}, 100)*Rational(${pct(p)}, 100))/(Rational(${pct(s)}, 100)*Rational(${pct(p)}, 100) + Rational(${pct(f)}, 100)*(1 - Rational(${pct(p)}, 100)))` };
      } }
    ],
    [U[3]]: [
      { id: 'pd-table', make(R) {
        const xs = R.sample([0, 1, 2, 3, 4, 5], 3).sort((a, b) => a - b); let p; do { p = [R.int(1, 6), R.int(1, 6)]; } while (p[0] + p[1] >= 10); p = [p[0] / 10, p[1] / 10, +(1 - (p[0] + p[1]) / 10).toFixed(1)];
        const E = xs.reduce((s, x, i) => s + x * p[i], 0), E2 = xs.reduce((s, x, i) => s + x * x * p[i], 0), V = E2 - E * E, k = R.int(0, 2);
        const tbl = T`\(X\) takes values ${xs.join(', ')} with probabilities ${p.join(', ')}.`;
        const py = `[${xs.join(', ')}], [Rational(${pct(p[0])}, 100), Rational(${pct(p[1])}, 100), Rational(${pct(p[2])}, 100)]`;
        if (k === 0) return { q: tbl + ' Find \\(E[X]\\).', answer: E, tol: 1e-6, x: T`\(${xs.map((x, i) => `${x}(${p[i]})`).join(' + ')} = ${R.fmt(E, 4)}\).`, v: `(lambda xs, ps: sum(a*b for a, b in zip(xs, ps)))(${py})` };
        if (k === 1) return { q: tbl + ' Find \\(\\operatorname{Var}(X)\\).', answer: V, tol: 0.0001, x: T`\(E[X] = ${R.fmt(E, 4)}\), \(E[X^2] = ${R.fmt(E2, 4)}\), so \(\operatorname{Var} = ${R.fmt(E2, 4)} - ${R.fmt(E, 4)}^2 = ${R.fmt(V, 4)}\).`, v: `(lambda xs, ps: sum(a*a*b for a, b in zip(xs, ps)) - sum(a*b for a, b in zip(xs, ps))**2)(${py})` };
        return { q: tbl + ' Find \\(E[X^2]\\).', answer: E2, tol: 1e-6, x: T`Square each value, keep the probabilities: \(${xs.map((x, i) => `${x * x}(${p[i]})`).join(' + ')} = ${R.fmt(E2, 4)}\).`, v: `(lambda xs, ps: sum(a*a*b for a, b in zip(xs, ps)))(${py})` };
      } },
      { id: 'pd-lin', make(R) {
        const m = R.int(-3, 8), v = R.int(1, 9), a = R.nz(-4, 4), b = R.int(-6, 6), k = R.int(0, 2);
        if (k === 0) return { q: T`\(E[X] = ${m}\) and \(\operatorname{Var}(X) = ${v}\). Find \(E[${R.lin([[a, 'X'], [b, '']])}]\).`, answer: a * m + b, x: T`\(${a}(${m}) + (${b}) = ${a * m + b}\).`, v: `${a}*${m} + ${b}` };
        if (k === 1) return { q: T`\(E[X] = ${m}\) and \(\operatorname{Var}(X) = ${v}\). Find \(\operatorname{Var}(${R.lin([[a, 'X'], [b, '']])})\).`, answer: a * a * v, x: T`The constant drops out and the scale is squared: \((${a})^2(${v}) = ${a * a * v}\).`, v: `(${a})**2*${v}` };
        return { q: T`\(E[X] = ${m}\) and \(\operatorname{Var}(X) = ${v}\). Find \(E[X^2]\).`, answer: v + m * m, x: T`\(E[X^2] = \operatorname{Var}(X) + (E[X])^2 = ${v} + ${m * m} = ${v + m * m}\).`, v: `${v} + (${m})**2` };
      } }
    ],
    [U[4]]: [
      { id: 'pbin-pmf', make(R) {
        const n = R.int(3, 10), p = R.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6]), k = R.int(0, n), v = Cn(n, k) * p ** k * (1 - p) ** (n - k);
        return { q: T`\(X \sim \text{Binomial}(${n}, ${p})\). Find \(P(X = ${k})\).`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(\binom{${n}}{${k}}(${p})^{${k}}(${R.fmt(1 - p)})^{${n - k}} = ${Cn(n, k)}\cdot${R.fmt(p ** k, 6)}\cdot${R.fmt((1 - p) ** (n - k), 6)} \approx ${R.fmt(v, 4)}\).`, v: `binomial(${n}, ${k})*Rational(${pct(p)}, 100)**${k}*(1 - Rational(${pct(p)}, 100))**${n - k}` };
      } },
      { id: 'pbin-tail', make(R) {
        const n = R.int(3, 12), p = R.pick([0.1, 0.2, 0.3, 0.5]), k = R.int(0, 1);
        if (k === 0) { const v = 1 - (1 - p) ** n; return { q: T`\(X \sim \text{Binomial}(${n}, ${p})\). Find \(P(X \ge 1)\).`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`Complement: \(1 - (${R.fmt(1 - p)})^{${n}} \approx ${R.fmt(v, 4)}\).`, v: `1 - (1 - Rational(${pct(p)}, 100))**${n}` }; }
        const v = (1 - p) ** n + n * p * (1 - p) ** (n - 1);
        return { q: T`\(X \sim \text{Binomial}(${n}, ${p})\). Find \(P(X \le 1)\).`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(P(0) + P(1) = (${R.fmt(1 - p)})^{${n}} + ${n}(${p})(${R.fmt(1 - p)})^{${n - 1}} \approx ${R.fmt(v, 4)}\).`, v: `(1 - Rational(${pct(p)}, 100))**${n} + ${n}*Rational(${pct(p)}, 100)*(1 - Rational(${pct(p)}, 100))**${n - 1}` };
      } },
      { id: 'pbin-mv', make(R) {
        const n = R.pick([10, 20, 25, 50, 100, 200]), p = R.pick([0.1, 0.2, 0.25, 0.4, 0.5]), k = R.int(0, 2);
        const Q = [[T`mean`, n * p, `${n}*Rational(${pct(p)}, 100)`], [T`variance`, n * p * (1 - p), `${n}*Rational(${pct(p)}, 100)*(1 - Rational(${pct(p)}, 100))`], [T`standard deviation`, Math.sqrt(n * p * (1 - p)), `sqrt(${n}*Rational(${pct(p)}, 100)*(1 - Rational(${pct(p)}, 100)))`]][k];
        return { q: T`\(X \sim \text{Binomial}(${n}, ${p})\). Find its ${Q[0]}.`, answer: Q[1], tol: 0.01, hint: 'Two decimals if needed.', x: T`Mean \(np = ${R.fmt(n * p)}\); variance \(npq = ${R.fmt(n * p * (1 - p), 4)}\); standard deviation \(\sqrt{npq} \approx ${R.fmt(Math.sqrt(n * p * (1 - p)), 3)}\).`, v: Q[2] };
      } },
      { id: 'pgeo', make(R) {
        const p = R.pick([0.1, 0.2, 0.25, 0.4, 0.5]), q = 1 - p, k = R.int(0, 3), m = R.int(2, 5);
        const Q = [[T`\(P(X = ${m})\), the first success on trial ${m}`, q ** (m - 1) * p, `(1 - Rational(${pct(p)}, 100))**${m - 1}*Rational(${pct(p)}, 100)`, T`\(q^{${m - 1}}p = (${R.fmt(q)})^{${m - 1}}(${p})\)`],
          [T`\(P(X > ${m})\)`, q ** m, `(1 - Rational(${pct(p)}, 100))**${m}`, T`the first ${m} trials fail: \((${R.fmt(q)})^{${m}}\)`],
          [T`\(E[X]\)`, 1 / p, `1/Rational(${pct(p)}, 100)`, T`\(\frac1p\)`], [T`\(\operatorname{Var}(X)\)`, q / (p * p), `(1 - Rational(${pct(p)}, 100))/Rational(${pct(p)}, 100)**2`, T`\(\frac{q}{p^2}\)`]][k];
        return { q: T`\(X\) is the number of trials until the first success, with success probability ${p} per trial. Find ${Q[0]}.`, answer: Q[1], tol: 0.0006, hint: 'Three decimals if needed.', x: T`Geometric: ${Q[3]} \(\approx ${R.fmt(Q[1], 4)}\).`, v: Q[2] };
      } }
    ],
    [U[5]]: [
      { id: 'ppois', make(R) {
        const rate = R.pick([1, 2, 3, 4, 6]), t = R.pick([0.5, 1, 2]), lam = rate * t, k = R.int(0, 2), m = R.int(0, 3);
        const unit = R.pick(['hour', 'minute', 'day']), win = t === 1 ? `one ${unit}` : t === 0.5 ? `half a ${unit}` : `2 ${unit}s`;
        if (k === 0) { const v = Math.exp(-lam) * lam ** m / fct(m); return { q: T`Events occur as a Poisson process at ${rate} per ${unit}. Find the probability of exactly ${m} event${m === 1 ? '' : 's'} in ${win}.`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(\lambda = ${rate}\times${t} = ${R.fmt(lam)}\). \(\frac{e^{-${R.fmt(lam)}}${R.fmt(lam)}^{${m}}}{${m}!} \approx ${R.fmt(v, 4)}\).`, v: `exp(-Rational(${lam * 2}, 2))*Rational(${lam * 2}, 2)**${m}/factorial(${m})` }; }
        if (k === 1) { const v = Math.exp(-lam) * (1 + lam); return { q: T`Events occur as a Poisson process at ${rate} per ${unit}. Find the probability of at most 1 event in ${win}.`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(\lambda = ${R.fmt(lam)}\): \(P(0) + P(1) = e^{-${R.fmt(lam)}}(1 + ${R.fmt(lam)}) \approx ${R.fmt(v, 4)}\).`, v: `exp(-Rational(${lam * 2}, 2))*(1 + Rational(${lam * 2}, 2))` }; }
        const v = 1 - Math.exp(-lam); return { q: T`Events occur as a Poisson process at ${rate} per ${unit}. Find the probability of at least one event in ${win}.`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(1 - P(0) = 1 - e^{-${R.fmt(lam)}} \approx ${R.fmt(v, 4)}\).`, v: `1 - exp(-Rational(${lam * 2}, 2))` };
      } },
      { id: 'phyper', make(R) {
        const N = R.int(8, 15), K = R.int(2, Math.min(6, N - 2)), n = R.int(2, Math.min(5, N - 1)), k = R.int(Math.max(0, n - (N - K)), Math.min(n, K)), v = Cn(K, k) * Cn(N - K, n - k) / Cn(N, n);
        return { q: T`A box holds ${N} items, ${K} of them defective. ${n} are drawn without replacement. What is the probability exactly ${k} ${k === 1 ? 'is' : 'are'} defective?`, answer: v, tol: 0.0006, hint: 'Three decimals or a fraction.', x: T`Hypergeometric: \(\frac{\binom{${K}}{${k}}\binom{${N - K}}{${n - k}}}{\binom{${N}}{${n}}} = \frac{${Cn(K, k)}\cdot${Cn(N - K, n - k)}}{${Cn(N, n)}} \approx ${R.fmt(v, 4)}\).`, v: `binomial(${K}, ${k})*binomial(${N - K}, ${n - k})/binomial(${N}, ${n})` };
      } },
      { id: 'pnegbin', make(R) {
        const p = R.pick([0.2, 0.3, 0.4, 0.5, 0.6]), r = R.int(2, 3), n = r + R.int(0, 4), ask = R.int(0, 1);
        if (ask === 1) return { q: T`Trials succeed with probability ${p}. What is the expected number of trials until the ${r === 2 ? 'second' : 'third'} success?`, answer: r / p, tol: 0.001, x: T`Negative binomial mean \(\frac rp = \frac{${r}}{${p}} = ${R.fmt(r / p, 4)}\).`, v: `${r}/Rational(${pct(p)}, 100)` };
        const v = Cn(n - 1, r - 1) * p ** r * (1 - p) ** (n - r);
        return { q: T`Trials succeed with probability ${p}. What is the probability the ${r === 2 ? 'second' : 'third'} success happens on trial ${n}?`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`Trial ${n} is a success, and the first ${n - 1} trials hold ${r - 1}: \(\binom{${n - 1}}{${r - 1}}(${p})^{${r}}(${R.fmt(1 - p)})^{${n - r}} \approx ${R.fmt(v, 4)}\).`, v: `binomial(${n - 1}, ${r - 1})*Rational(${pct(p)}, 100)**${r}*(1 - Rational(${pct(p)}, 100))**${n - r}` };
      } }
    ],
    [U[6]]: [
      { id: 'pcont', make(R) {
        const k = R.int(1, 3), b = R.int(1, 3), c = (k + 1) / b ** (k + 1), ask = R.int(0, 2), t = +(b * R.pick([0.25, 0.5, 0.75])).toFixed(2);
        const fx = T`f(x) = c\,x${k > 1 ? `^{${k}}` : ''}`;
        if (ask === 0) return { q: T`\(${fx}\) on \([0, ${b}]\) and 0 elsewhere. Find \(c\).`, answer: c, tol: 0.0006, x: T`\(\int_0^{${b}} c\,x^{${k}}\,dx = c\frac{${b}^{${k + 1}}}{${k + 1}} = 1\), so \(c = \frac{${k + 1}}{${b ** (k + 1)}}\).`, v: `1/integrate(x**${k}, (x, 0, ${b}))` };
        if (ask === 1) { const v = (t / b) ** (k + 1); return { q: T`\(X\) has density \(${fx}\) on \([0, ${b}]\), with \(c\) chosen to make it a density. Find \(P(X \le ${t})\).`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(c = \frac{${k + 1}}{${b ** (k + 1)}}\), so \(F(x) = \left(\frac{x}{${b}}\right)^{${k + 1}}\) and \(F(${t}) \approx ${R.fmt(v, 4)}\).`, v: `integrate(x**${k}, (x, 0, Rational(${Math.round(t * 100)}, 100)))/integrate(x**${k}, (x, 0, ${b}))` }; }
        const v = (k + 1) / (k + 2) * b;
        return { q: T`\(X\) has density \(${fx}\) on \([0, ${b}]\), with \(c\) chosen to make it a density. Find \(E[X]\).`, answer: v, tol: 0.0006, x: T`\(E[X] = \int_0^{${b}} x\,c\,x^{${k}}\,dx = \frac{${k + 1}}{${k + 2}}\cdot${b} = ${R.fmt(v, 4)}\).`, v: `integrate(x**${k + 1}, (x, 0, ${b}))/integrate(x**${k}, (x, 0, ${b}))` };
      } },
      { id: 'pcdf', make(R) {
        const k = R.int(2, 4), a = R.pick([0.2, 0.3, 0.5]), b = R.pick([0.6, 0.8, 0.9]), ask = R.int(0, 2);
        if (ask === 0) { const v = b ** k - a ** k; return { q: T`\(X\) has CDF \(F(x) = x^{${k}}\) on \([0, 1]\). Find \(P(${a} < X \le ${b})\).`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(F(${b}) - F(${a}) = ${R.fmt(b ** k, 5)} - ${R.fmt(a ** k, 5)} \approx ${R.fmt(v, 4)}\).`, v: `Rational(${Math.round(b * 10)}, 10)**${k} - Rational(${Math.round(a * 10)}, 10)**${k}` }; }
        if (ask === 1) { const v = 0.5 ** (1 / k); return { q: T`\(X\) has CDF \(F(x) = x^{${k}}\) on \([0, 1]\). Find its median.`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`Solve \(m^{${k}} = \frac12\): \(m = 2^{-1/${k}} \approx ${R.fmt(v, 4)}\).`, v: `Rational(1, 2)**Rational(1, ${k})` }; }
        const v = k / (k + 1); return { q: T`\(X\) has CDF \(F(x) = x^{${k}}\) on \([0, 1]\). Find \(E[X]\).`, answer: v, tol: 0.0006, x: T`Density \(f = F' = ${k}x^{${k - 1}}\); \(E[X] = \int_0^1 ${k}x^{${k}}\,dx = \frac{${k}}{${k + 1}}\).`, v: `integrate(x*diff(x**${k}, x), (x, 0, 1))` };
      } }
    ],
    [U[7]]: [
      { id: 'punif', make(R) {
        const a = R.int(0, 5), b = a + R.pick([4, 6, 8, 10, 12]), c = a + R.int(0, (b - a) / 2), d = c + R.int(1, b - c), ask = R.int(0, 2);
        if (ask === 0) return { q: T`\(X \sim \text{Uniform}(${a}, ${b})\). Find \(P(${c} \le X \le ${d})\).`, answer: (d - c) / (b - a), tol: 0.0006, x: T`Length ratio: \(\frac{${d} - ${c}}{${b} - ${a}} = ${R.frac(d - c, b - a)}\).`, v: `Rational(${d - c}, ${b - a})` };
        if (ask === 1) return { q: T`\(X \sim \text{Uniform}(${a}, ${b})\). Find \(\operatorname{Var}(X)\).`, answer: (b - a) ** 2 / 12, tol: 0.0006, x: T`\(\frac{(${b} - ${a})^2}{12} = \frac{${(b - a) ** 2}}{12} \approx ${R.fmt((b - a) ** 2 / 12, 4)}\).`, v: `integrate(x**2/${b - a}, (x, ${a}, ${b})) - integrate(x/${b - a}, (x, ${a}, ${b}))**2` };
        return { q: T`\(X \sim \text{Uniform}(${a}, ${b})\). Find \(E[X]\).`, answer: (a + b) / 2, x: T`The midpoint: \(\frac{${a} + ${b}}{2}\).`, v: `integrate(x/${b - a}, (x, ${a}, ${b}))` };
      } },
      { id: 'pexp', make(R) {
        const mean = R.pick([2, 4, 5, 10]), lam = 1 / mean, t = R.pick([1, 2, 3, 5]), s = R.pick([1, 2, 4]), ask = R.int(0, 3);
        if (ask === 0) { const v = Math.exp(-t / mean); return { q: T`A lifetime is exponential with mean ${mean}. Find the probability it exceeds ${t}.`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(\lambda = \frac1{${mean}}\): \(P(X > ${t}) = e^{-${t}/${mean}} \approx ${R.fmt(v, 4)}\).`, v: `exp(-Rational(${t}, ${mean}))` }; }
        if (ask === 1) { const v = Math.exp(-t / mean); return { q: T`A lifetime is exponential with mean ${mean}. Given it has already lasted ${s}, find the probability it lasts at least ${t} more.`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`Memoryless: \(P(X > ${s} + ${t}\mid X > ${s}) = P(X > ${t}) = e^{-${t}/${mean}} \approx ${R.fmt(v, 4)}\).`, v: `exp(-Rational(${s + t}, ${mean}))/exp(-Rational(${s}, ${mean}))` }; }
        if (ask === 2) { const v = mean * Math.LN2; return { q: T`A lifetime is exponential with mean ${mean}. Find its median.`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`\(1 - e^{-m/${mean}} = \frac12\), so \(m = ${mean}\ln2 \approx ${R.fmt(v, 4)}\).`, v: `${mean}*log(2)` }; }
        const m2 = R.pick([2, 3, 6]), v = 1 / (1 / mean + 1 / m2);
        return { q: T`Two independent exponential waiting times have means ${mean} and ${m2}. What is the expected time until the first of them ends?`, answer: v, tol: 0.0006, x: T`The minimum is exponential with rate \(\frac1{${mean}} + \frac1{${m2}}\), so its mean is \(\frac{1}{1/${mean} + 1/${m2}} \approx ${R.fmt(v, 4)}\).`, v: `1/(Rational(1, ${mean}) + Rational(1, ${m2}))` };
      } },
      { id: 'pgam', make(R) {
        const k = R.int(2, 6), rate = R.pick([0.5, 1, 2, 4]), ask = R.int(0, 1);
        return { q: T`Customers arrive as a Poisson process at ${rate} per minute. Find the ${ask ? 'variance of' : 'expected'} time until the ${k}th arrival, in minutes${ask ? ' squared' : ''}.`, answer: ask ? k / rate ** 2 : k / rate, tol: 0.0006,
          x: T`The wait is Gamma\((${k}, ${rate})\), a sum of ${k} independent Exp\((${rate})\) gaps: mean \(\frac{${k}}{${rate}}\), variance \(\frac{${k}}{${rate}^2}\).`, v: ask ? `${k}/Rational(${rate * 2}, 2)**2` : `${k}/Rational(${rate * 2}, 2)` };
      } }
    ],
    [U[8]]: [
      { id: 'pnorm', make(R) {
        const mu = R.pick([50, 70, 100, 170, 500]), sd = R.pick([2, 4, 5, 10, 15, 20]), z1 = R.int(-25, 25) / 10, z2 = Math.min(3.4, z1 + R.int(5, 20) / 10), x1 = +(mu + z1 * sd).toFixed(1), x2 = +(mu + z2 * sd).toFixed(1), ask = R.int(0, 2);
        const E = z => `(1 + erf(Rational(${Math.round(z * 10)}, 10)/sqrt(2)))/2`;
        if (ask === 0) return { q: T`\(X \sim N(${mu}, ${sd}^2)\). Find \(P(X \le ${x1})\).`, answer: Phi(z1), tol: 0.0006, hint: 'Use the table; four decimals.', x: T`\(z = \frac{${x1} - ${mu}}{${sd}} = ${z1.toFixed(1)}\): \(\Phi(${z1.toFixed(1)}) = ${Phi(z1).toFixed(4)}\)${z1 < 0 ? T`, from \(1 - \Phi(${(-z1).toFixed(1)})\)` : ''}.`, v: E(z1) };
        if (ask === 1) return { q: T`\(X \sim N(${mu}, ${sd}^2)\). Find \(P(X > ${x1})\).`, answer: 1 - Phi(z1), tol: 0.0006, hint: 'Use the table; four decimals.', x: T`\(z = ${z1.toFixed(1)}\): \(1 - \Phi(${z1.toFixed(1)}) = ${(1 - Phi(z1)).toFixed(4)}\).`, v: `1 - ${E(z1)}` };
        return { q: T`\(X \sim N(${mu}, ${sd}^2)\). Find \(P(${x1} < X < ${x2})\).`, answer: Phi(z2) - Phi(z1), tol: 0.0008, hint: 'Use the table; four decimals.', x: T`\(z\)-scores ${z1.toFixed(1)} and ${z2.toFixed(1)}: \(\Phi(${z2.toFixed(1)}) - \Phi(${z1.toFixed(1)}) = ${Phi(z2).toFixed(4)} - ${Phi(z1).toFixed(4)} = ${(Phi(z2) - Phi(z1)).toFixed(4)}\).`, v: `${E(z2)} - ${E(z1)}` };
      } },
      { id: 'pnorm-q', make(R) {
        const mu = R.pick([50, 100, 200, 500]), sd = R.pick([4, 5, 10, 20]), z = R.pick([0.5, 0.8, 1.0, 1.2, 1.5, 2.0]), up = R.int(0, 1), q = Phi(z);
        return { q: T`\(X \sim N(${mu}, ${sd}^2)\). Find the value \(x\) with \(P(X ${up ? '>' : '\\le'} x) = ${(up ? 1 - q : q).toFixed(4)}\).`, answer: mu + (up ? z : z) * sd * (1), tol: 0.11,
          x: T`${up ? T`An upper tail of ${(1 - q).toFixed(4)} means \(\Phi(z) = ${q.toFixed(4)}\)` : T`\(\Phi(z) = ${q.toFixed(4)}\)`}, so \(z = ${z.toFixed(1)}\) from the table, and \(x = ${mu} + ${z.toFixed(1)}(${sd}) = ${R.fmt(mu + z * sd)}\).`, v: `${mu} + Rational(${Math.round(z * 10)}, 10)*${sd}` };
      } },
      { id: 'pnorm-sum', make(R) {
        const [sx, sy, s] = R.pick([[3, 4, 5], [6, 8, 10]]), mx = R.int(10, 40), D = R.int(-12, 15), my = mx - D, z = D / s;
        return { q: T`\(X \sim N(${mx}, ${sx}^2)\) and \(Y \sim N(${my}, ${sy}^2)\) are independent. Find \(P(X > Y)\).`, answer: Phi(z), tol: 0.0006, hint: 'Use the table; four decimals.',
          x: T`\(X - Y \sim N(${mx - my}, ${sx}^2 + ${sy}^2) = N(${mx - my}, ${s}^2)\). \(P(X - Y > 0) = P\!\left(Z > \frac{${-(mx - my)}}{${s}}\right) = \Phi(${z.toFixed(1)}) = ${Phi(z).toFixed(4)}\).`, v: `(1 + erf(Rational(${mx - my}, ${s})/sqrt(2)))/2` };
      } }
    ],
    [U[9]]: [
      { id: 'pjoint', make(R) {
        // Six cells in twentieths that sum to 1.
        let w; do { w = Array.from({ length: 6 }, () => R.int(1, 6)); } while (w.reduce((a, b) => a + b, 0) !== 20);
        const p = w.map(v => v / 20), g = (i, j) => p[i * 3 + j], px = [0, 1].map(i => g(i, 0) + g(i, 1) + g(i, 2)), py = [0, 1, 2].map(j => g(0, j) + g(1, j)), ask = R.int(0, 3);
        const tbl = `<table class="tt"><tr><th></th><th>\\(Y = 0\\)</th><th>\\(Y = 1\\)</th><th>\\(Y = 2\\)</th></tr>${[0, 1].map(i => `<tr><th>\\(X = ${i}\\)</th>${[0, 1, 2].map(j => `<td>${R.fmt(g(i, j))}</td>`).join('')}</tr>`).join('')}</table>`;
        const pyArr = `[${w.join(', ')}]`;
        if (ask === 0) { const j = R.int(0, 2); return { q: T`Joint PMF of \(X\) and \(Y\):${tbl}Find \(P(Y = ${j})\).`, answer: py[j], tol: 1e-6, x: T`Add the column: \(${R.fmt(g(0, j))} + ${R.fmt(g(1, j))} = ${R.fmt(py[j])}\).`, v: `Rational(${pyArr}[${j}] + ${pyArr}[${3 + j}], 20)` }; }
        if (ask === 1) { const i = R.int(0, 1), j = R.int(0, 2); return { q: T`Joint PMF of \(X\) and \(Y\):${tbl}Find \(P(Y = ${j}\mid X = ${i})\).`, answer: g(i, j) / px[i], tol: 0.0006, hint: 'A fraction or three decimals.', x: T`\(\frac{P(X = ${i}, Y = ${j})}{P(X = ${i})} = \frac{${R.fmt(g(i, j))}}{${R.fmt(px[i])}} \approx ${R.fmt(g(i, j) / px[i], 4)}\).`, v: `Rational(${pyArr}[${i * 3 + j}], sum(${pyArr}[${i * 3}:${i * 3 + 3}]))` }; }
        if (ask === 2) { const EY = py[1] + 2 * py[2]; return { q: T`Joint PMF of \(X\) and \(Y\):${tbl}Find \(E[Y]\).`, answer: EY, tol: 1e-6, x: T`Marginal of \(Y\): ${py.map(v => R.fmt(v)).join(', ')}. \(E[Y] = 0(${R.fmt(py[0])}) + 1(${R.fmt(py[1])}) + 2(${R.fmt(py[2])}) = ${R.fmt(EY)}\).`, v: `Rational(sum(j*(${pyArr}[j] + ${pyArr}[3 + j]) for j in range(3)), 20)` }; }
        const ind = [0, 1].every(i => [0, 1, 2].every(j => Math.abs(g(i, j) - px[i] * py[j]) < 1e-9)), ans = ind ? 'Independent' : 'Not independent';
        return { q: T`Joint PMF of \(X\) and \(Y\):${tbl}Are \(X\) and \(Y\) independent?`, c: [ans, ind ? 'Not independent' : 'Independent', 'Cannot tell from a table'], x: T`Margins: \(p_X = (${px.map(v => R.fmt(v)).join(', ')})\), \(p_Y = (${py.map(v => R.fmt(v)).join(', ')})\). ${ind ? 'Every cell equals the product of its margins.' : T`For example, \(p_X(0)p_Y(0) = ${R.fmt(px[0] * py[0], 4)}\) but the cell is ${R.fmt(g(0, 0))}.`}`,
          key: ans, vk: `(lambda w: 'Independent' if all(w[3*i + j]*20 == sum(w[3*i:3*i + 3])*(w[j] + w[3 + j]) for i in range(2) for j in range(3)) else 'Not independent')(${pyArr})` };
      } },
      { id: 'pjoint-c', make(R) {
        const a = R.int(0, 2), b = R.int(0, 2), s = R.pick([0.5, 0.25, 0.75]), ask = R.int(0, 1), c = (a + 1) * (b + 1);
        const f = T`f(x, y) = c\,${a ? (a === 1 ? 'x' : `x^{${a}}`) : ''}${b ? (b === 1 ? 'y' : `y^{${b}}`) : ''}${!a && !b ? '1' : ''}`;
        if (ask === 0) return { q: T`\(${f}\) on the unit square \(0 \le x, y \le 1\). Find \(c\).`, answer: c, x: T`\(\int_0^1\!\int_0^1 x^{${a}}y^{${b}}\,dy\,dx = \frac1{${a + 1}}\cdot\frac1{${b + 1}}\), so \(c = ${c}\).`, v: `1/integrate(x**${a}*y**${b}, (x, 0, 1), (y, 0, 1))` };
        const v = s ** (a + 1);
        return { q: T`\(${f}\) on the unit square, with \(c\) chosen to make it a density. Find \(P(X \le ${s})\).`, answer: v, tol: 0.0006, hint: 'Three decimals.', x: T`The density factors, so \(X\) has marginal \(${a + 1}x^{${a}}\) and \(P(X \le ${s}) = ${s}^{${a + 1}} \approx ${R.fmt(v, 4)}\).`, v: `integrate(${c}*x**${a}*y**${b}, (x, 0, Rational(${Math.round(s * 100)}, 100)), (y, 0, 1))` };
      } }
    ]
  } });
})();
