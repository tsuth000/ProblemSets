'use strict';
// Quant interview preparation (version 1.6): aptitude-test speed skills and trading-style quantitative reasoning.
// Units teach every question type that their generators and fixed problems ask. Each generator carries an
// independent check (v: a SymPy/Python expression, or vk: a Python expression that must equal key).
(() => {
  const R0 = window.R;
  const frac = (n, d) => R0.frac(n, d);

  // ---------------- Spatial figures (inline SVG, used in questions and answer choices) ----------------
  // A chiral "flag" shape: every rotation and every mirror image looks different.
  const FLAG = 'M-4 18 L-4 -18 L14 -18 L14 -8 L4 -8 L4 18 Z M10 10 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0';
  const flag = (ang, mir) => `<svg class="qsp" viewBox="-26 -26 52 52" width="52" height="52" aria-hidden="true"><g transform="rotate(${ang}) scale(${mir ? -1 : 1},1)"><path d="${FLAG}"/></g></svg>`;
  const poly = n => { const pts = Array.from({ length: n }, (_, i) => { const t = -Math.PI / 2 + 2 * Math.PI * i / n; return `${(20 * Math.cos(t)).toFixed(1)},${(20 * Math.sin(t)).toFixed(1)}`; }).join(' ');
    return `<svg class="qsp" viewBox="-26 -26 52 52" width="52" height="52" aria-hidden="true"><polygon points="${pts}"/></svg>`; };
  const dots = n => { const pos = [[-12, -12], [12, 12], [12, -12], [-12, 12], [0, 0], [-12, 0], [12, 0], [0, -12], [0, 12]];
    return `<svg class="qsp" viewBox="-26 -26 52 52" width="52" height="52" aria-hidden="true"><rect x="-22" y="-22" width="44" height="44" rx="4" class="frame"/>${pos.slice(0, n).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5"/>`).join('')}</svg>`; };
  const row = cells => `<div class="qseq">${cells.join('')}<span class="qnext">?</span></div>`;
  window.QSPATIAL = { flag, poly, dots };

  // ---------------- Logic engines (the Python checker has its own independent versions) ----------------
  // Syllogisms over three nonempty categories: brute force over which of the 8 membership regions are inhabited.
  function syllogism(prem, concl) {
    const holds = (w, [kind, X, Y]) => {
      const reg = r => w[r], inX = r => r & (1 << 'ABC'.indexOf(X)), inY = r => r & (1 << 'ABC'.indexOf(Y)), rs = [0, 1, 2, 3, 4, 5, 6, 7].filter(reg);
      if (kind === 'all') return rs.every(r => !inX(r) || inY(r));
      if (kind === 'no') return rs.every(r => !(inX(r) && inY(r)));
      if (kind === 'some') return rs.some(r => inX(r) && inY(r));
      return rs.some(r => inX(r) && !inY(r)); // somenot
    };
    let t = 0, f = 0;
    for (let m = 0; m < 256; m++) {
      const w = [0, 1, 2, 3, 4, 5, 6, 7].map(r => (m >> r) & 1);
      const nonempty = [1, 2, 4].every(bit => [0, 1, 2, 3, 4, 5, 6, 7].some(r => w[r] && (r & bit)));
      if (!nonempty || !prem.every(p => holds(w, p))) continue;
      if (holds(w, concl)) t++; else f++;
    }
    return f === 0 ? 'True' : t === 0 ? 'False' : 'Cannot tell';
  }
  const SYL_NOUNS = [['bloops', 'razzies', 'lazzies'], ['zorks', 'mibs', 'tufs'], ['glims', 'plabs', 'drees'], ['vexes', 'hoons', 'quops']];
  const sylText = ([kind, X, Y], N) => {
    const n = { A: N[0], B: N[1], C: N[2] };
    return kind === 'all' ? `All ${n[X]} are ${n[Y]}` : kind === 'no' ? `No ${n[X]} are ${n[Y]}` : kind === 'some' ? `Some ${n[X]} are ${n[Y]}` : `Some ${n[X]} are not ${n[Y]}`;
  };
  const SYL_FORMS = [
    [[['all', 'A', 'B'], ['all', 'B', 'C']], ['all', 'A', 'C']],
    [[['all', 'A', 'B'], ['some', 'B', 'C']], ['some', 'A', 'C']],
    [[['no', 'A', 'B'], ['all', 'C', 'A']], ['no', 'C', 'B']],
    [[['all', 'A', 'B'], ['no', 'B', 'C']], ['no', 'A', 'C']],
    [[['some', 'A', 'B'], ['all', 'B', 'C']], ['some', 'A', 'C']],
    [[['all', 'A', 'B']], ['all', 'B', 'A']],
    [[['all', 'A', 'B'], ['all', 'C', 'B']], ['some', 'A', 'C']],
    [[['all', 'A', 'B'], ['all', 'B', 'C']], ['somenot', 'A', 'C']],
    [[['no', 'A', 'B'], ['some', 'C', 'A']], ['somenot', 'C', 'B']],
    [[['some', 'A', 'B'], ['some', 'B', 'C']], ['some', 'A', 'C']],
    [[['all', 'A', 'B'], ['no', 'B', 'C']], ['some', 'A', 'C']],
    [[['all', 'A', 'B']], ['some', 'A', 'B']]
  ];
  const NAMES = ['Ann', 'Ben', 'Cal', 'Dee', 'Eli', 'Fay'];

  // ---------------- Verbal banks ----------------
  // [word, synonym, antonym, cluster]: distractors never come from the same cluster.
  const WORDS = [
    ['abundant', 'plentiful', 'scarce', 1], ['meager', 'scant', 'ample', 1], ['benevolent', 'kind', 'malicious', 2], ['candid', 'frank', 'evasive', 3],
    ['concise', 'brief', 'verbose', 4], ['diligent', 'industrious', 'lazy', 5], ['frugal', 'thrifty', 'extravagant', 6], ['hostile', 'antagonistic', 'friendly', 2],
    ['lucid', 'clear', 'confusing', 8], ['novice', 'beginner', 'expert', 9], ['obstinate', 'stubborn', 'compliant', 10], ['ominous', 'threatening', 'auspicious', 11],
    ['placid', 'calm', 'agitated', 12], ['serene', 'tranquil', 'turbulent', 12], ['prudent', 'wise', 'reckless', 13], ['reticent', 'reserved', 'talkative', 14],
    ['scrutinize', 'examine', 'overlook', 15], ['tenacious', 'persistent', 'yielding', 10], ['vindicate', 'exonerate', 'incriminate', 17], ['zealous', 'fervent', 'apathetic', 5],
    ['amplify', 'magnify', 'diminish', 19], ['augment', 'increase', 'reduce', 19], ['ambiguous', 'vague', 'explicit', 8], ['conceal', 'hide', 'reveal', 20],
    ['consensus', 'agreement', 'dissent', 21], ['deteriorate', 'decline', 'improve', 22], ['eminent', 'renowned', 'unknown', 23], ['fragile', 'delicate', 'sturdy', 24],
    ['gregarious', 'sociable', 'reclusive', 14], ['impartial', 'unbiased', 'prejudiced', 25], ['prolong', 'extend', 'curtail', 19], ['mundane', 'ordinary', 'extraordinary', 27],
    ['obsolete', 'outdated', 'current', 28], ['optimistic', 'hopeful', 'pessimistic', 11], ['pliable', 'flexible', 'rigid', 10], ['rudimentary', 'basic', 'advanced', 9],
    ['sporadic', 'occasional', 'constant', 32], ['superficial', 'shallow', 'profound', 33], ['tentative', 'provisional', 'definitive', 34], ['volatile', 'unstable', 'steady', 12],
    ['wary', 'cautious', 'trusting', 13], ['adversary', 'opponent', 'ally', 2], ['affluent', 'wealthy', 'impoverished', 36], ['benign', 'harmless', 'harmful', 2]
  ];
  // Analogy relations; every pair is unique, so only one choice completes the stem.
  const REL = {
    'part to whole': [['petal', 'flower'], ['page', 'book'], ['wheel', 'car'], ['branch', 'tree'], ['finger', 'hand'], ['brick', 'wall']],
    'worker to tool': [['carpenter', 'hammer'], ['surgeon', 'scalpel'], ['painter', 'brush'], ['farmer', 'plow'], ['writer', 'pen'], ['tailor', 'needle']],
    'young to adult': [['puppy', 'dog'], ['kitten', 'cat'], ['calf', 'cow'], ['foal', 'horse'], ['cub', 'bear'], ['fawn', 'deer']],
    'degree': [['warm', 'hot'], ['cool', 'cold'], ['damp', 'soaked'], ['tired', 'exhausted'], ['happy', 'ecstatic'], ['hungry', 'starving']],
    'maker to product': [['baker', 'bread'], ['author', 'novel'], ['poet', 'poem'], ['composer', 'symphony'], ['sculptor', 'statue'], ['architect', 'blueprint']],
    'member to group': [['wolf', 'pack'], ['fish', 'school'], ['bee', 'swarm'], ['bird', 'flock'], ['lion', 'pride'], ['soldier', 'army']],
    'opposites': [['ascend', 'descend'], ['expand', 'contract'], ['accept', 'reject'], ['victory', 'defeat'], ['ancient', 'modern'], ['generous', 'stingy']],
    'instrument to measure': [['thermometer', 'temperature'], ['scale', 'weight'], ['clock', 'time'], ['ruler', 'length'], ['barometer', 'pressure'], ['odometer', 'distance']]
  };

  // ---------------- Helpers for distractors ----------------
  const near = (a, ds) => [...new Set(ds.map(x => +(+x).toFixed(4)))].filter(x => x !== a && Number.isFinite(x)).slice(0, 4);

  // ======================= SUBJECT =======================
  registerSubject({ id: 'quant', name: 'Quant interviews', color: '#2F5D50', blurb: 'Aptitude-test speed, probability, expected value, talking through a problem on camera', questions: [], generators: [] });

  const U = {
    format: 'How the assessment works', mental: 'Mental math', fdp: 'Fractions, decimals, percents', word: 'Word problems at speed', series: 'Number series',
    logic: 'Logic and ordering', verbal: 'Verbal reasoning', spatial: 'Spatial reasoning', prob: 'Probability under time pressure', ev: 'Expected value and games',
    market: 'Markets, edge, and bets', camera: 'Answering on camera'
  };

  registerLearn('quant', [
    { title: U.format, skill: U.format,
      hook: T`
<p>The process has three parts, and each one rewards a different kind of preparation.</p>
<table class="tt"><tr><th>Part</th><th>Format</th><th>What wins</th></tr>
<tr><td>Aptitude test</td><td>15 minutes, timed, no calculator, no penalty for wrong answers</td><td>speed on routine items, guessing instead of stalling</td></tr>
<tr><td>Behavioral tests</td><td>untimed, about 15 minutes, personality questions</td><td>answering honestly and consistently</td></tr>
<tr><td>Video interview</td><td>two quantitative questions, 5 seconds to prepare, 3 minutes each, one attempt, pen and paper allowed</td><td>a clear spoken structure and a stated final number</td></tr></table>`,
      body: T`
<h4>The aptitude test</h4>
<p>Criteria's standard cognitive aptitude test has 50 questions in 15 minutes: math and logic (arithmetic, word problems, number series, syllogisms), verbal (antonyms, synonyms, analogies), and spatial (shape sequences, odd one out). Fewer than 1% of test takers finish, and the average is about 24 correct. That is 18 seconds per question if you try them all.</p>
<p><b>Strategy.</b> Wrong answers cost nothing, so never leave a question blank. If a question has taken about 40 seconds and you see no path, eliminate what you can, guess, and move on. Easy items count exactly as much as hard ones; bank them first. The 15-minute simulation on this subject's page uses the same pacing and shows whether you are ahead of or behind 18 seconds per question.</p>
<h4>The behavioral tests</h4>
<p>These are personality questionnaires. They check consistency, since similar statements appear more than once in different wording. Answer as you actually behave at work, not as you imagine a trader should. There is nothing to drill.</p>
<h4>The video interview</h4>
<p>Five seconds is only enough to recognize the problem type, so the structure must be automatic before you start. The last unit of this path teaches a structure for a three-minute spoken answer, and the video practice mode reproduces the 5-second and 3-minute timers.</p>`,
      trap: T`Spending two minutes on one hard question. On this test that costs about six easier questions.`,
      vary: [[T`About how many seconds per question does a 50-question, 15-minute test allow?`, 18, T`\(900\div50\).`], [T`You have spent 45 seconds on a question and see no path. Best move?`, ['guess and move on', 'leave it blank', 'keep working until solved'], T`No penalty for wrong answers, and a stall costs easier items.`]] },

    { title: U.mental, skill: U.mental,
      hook: T`
<p>Without a calculator, speed comes from splitting numbers into pieces that are easy to multiply, then adding the pieces back.</p>
\[47 \times 6 = 40\times6 + 7\times6 = 240 + 42 = 282\]`,
      body: T`
<table class="tt"><tr><th>Situation</th><th>Move</th><th>Example</th></tr>
<tr><td>two digits times one digit</td><td>split the tens and ones</td><td>\(47\times6 = 240 + 42 = 282\)</td></tr>
<tr><td>near a round number</td><td>round, then correct</td><td>\(98\times 47 = 4700 - 2\times47 = 4606\)</td></tr>
<tr><td>two digits times two digits</td><td>split one factor</td><td>\(34\times 26 = 34\times 20 + 34\times 6 = 680 + 204 = 884\)</td></tr>
<tr><td>numbers equally spaced around a round one</td><td>difference of squares</td><td>\(47\times53 = 50^2 - 3^2 = 2491\)</td></tr>
<tr><td>a square</td><td>\((a + b)^2 = a^2 + 2ab + b^2\)</td><td>\(67^2 = 3600 + 840 + 49 = 4489\)</td></tr>
<tr><td>division</td><td>remove easy multiples</td><td>\(882 \div 7\): \(700 = 7\cdot100\), \(182 = 7\cdot26\), so 126</td></tr></table>
<p>Check the last digit before committing: \(47\times6\) must end in 2 because \(7\times6 = 42\). Check the size: \(47\times6\) is a bit under \(50\times6 = 300\).</p>`,
      ex: { q: T`Compute \(48 \times 52\) and \(96 \times 35\) without writing more than one line.`, a: T`
<p>\(48\) and \(52\) are each 2 from 50: \(50^2 - 2^2 = 2500 - 4 = 2496\).</p>
<p>\(96 = 100 - 4\): \(3500 - 4\times35 = 3500 - 140 = 3360\).</p>` },
      exs: [{ q: T`Compute \(73^2\).`, a: T`<p>\((70 + 3)^2 = 4900 + 2\cdot70\cdot3 + 9 = 4900 + 420 + 9 = 5329\).</p>` }],
      trap: T`Forgetting the cross term in a square: \(73^2\) is not \(4900 + 9\).`,
      vary: [[T`\(47 \times 6\)`, 282, T`\(240 + 42\).`], [T`\(47 \times 8\)`, 376, T`\(320 + 56\).`], [T`\(99 \times 47\)`, 4653, T`\(4700 - 47\).`], [T`\(49 \times 51\)`, 2499, T`\(50^2 - 1\).`], [T`\(65^2\)`, 4225, T`\(3600 + 600 + 25\).`]] },

    { title: U.fdp, skill: U.fdp,
      hook: T`
<p>Fractions, decimals, and percents are three spellings of the same number. Memorizing the common ones turns a two-step problem into one step.</p>`,
      body: T`
<table class="tt"><tr><th>Fraction</th><th>Decimal</th><th>Fraction</th><th>Decimal</th></tr>
<tr><td>\(\tfrac12\)</td><td>0.5</td><td>\(\tfrac18\)</td><td>0.125</td></tr>
<tr><td>\(\tfrac13\)</td><td>0.333</td><td>\(\tfrac38\)</td><td>0.375</td></tr>
<tr><td>\(\tfrac14\)</td><td>0.25</td><td>\(\tfrac58\)</td><td>0.625</td></tr>
<tr><td>\(\tfrac15\)</td><td>0.2</td><td>\(\tfrac16\)</td><td>0.1667</td></tr>
<tr><td>\(\tfrac17\)</td><td>0.142857</td><td>\(\tfrac19\)</td><td>0.111</td></tr>
<tr><td>\(\tfrac1{11}\)</td><td>0.0909</td><td>\(\tfrac1{12}\)</td><td>0.0833</td></tr></table>
<p>Multiples follow: \(\tfrac57 = 5\times0.142857 = 0.714\), \(\tfrac49 = 0.444\).</p>
<p><b>Percent of.</b> \(p\%\) of \(N\) is \(\frac{p}{100}N\). Break awkward percents into easy ones: \(15\% = 10\% + 5\%\); \(12.5\% = \tfrac18\).</p>
<p><b>Percent change</b> is \(\frac{\text{new} - \text{old}}{\text{old}}\times100\%\), always divided by the old value. A rise of \(x\%\) followed by a fall of \(x\%\) is a net loss of \(\frac{x^2}{100}\%\).</p>
<p><b>Comparing fractions.</b> Convert to decimals, or cross-multiply: \(\frac ab > \frac cd\) exactly when \(ad > bc\) (positive denominators).</p>`,
      ex: { q: T`What is 15% of 240? A price rises from 80 to 92; by what percent did it rise?`, a: T`
<p>\(10\%\) of 240 is 24 and \(5\%\) is 12, so \(15\%\) is 36.</p>
<p>The change is 12 on an old value of 80: \(\frac{12}{80} = 0.15\), a 15% rise.</p>` },
      trap: T`Dividing a percent change by the new value instead of the old one.`,
      vary: [[T`Write \(\tfrac38\) as a decimal.`, 0.375, T`Three eighths: \(3\times0.125\).`], [T`Write \(\tfrac58\) as a decimal.`, 0.625, T`Two more eighths.`], [T`What is 12.5% of 64?`, 8, T`\(12.5\% = \tfrac18\).`], [T`A price rises 20%, then falls 20%. What is the net percent change?`, -4, T`\(1.2\times0.8 = 0.96\): \(-\frac{20^2}{100}\%\).`]] },

    { title: U.word, skill: U.word,
      hook: T`<p>Most aptitude word problems are one of five templates. Recognize the template, write one equation, solve.</p>`,
      body: T`
<table class="tt"><tr><th>Template</th><th>Equation</th></tr>
<tr><td>average</td><td>total \(=\) average \(\times\) count</td></tr>
<tr><td>combined work</td><td>rates add: \(\frac1a + \frac1b = \frac1t\), so \(t = \frac{ab}{a + b}\)</td></tr>
<tr><td>ratio split</td><td>\(N\) in ratio \(a:b\) gives \(\frac{a}{a+b}N\) and \(\frac{b}{a+b}N\)</td></tr>
<tr><td>distance</td><td>distance \(=\) speed \(\times\) time</td></tr>
<tr><td>round trip average speed</td><td>\(\frac{2uv}{u + v}\), not \(\frac{u + v}{2}\)</td></tr></table>
<p>Why the round trip is not the plain average: you spend more time at the slower speed. Going 30 out and 60 back over 60 miles takes 2 hours plus 1 hour, so 120 miles in 3 hours is 40 mph.</p>`,
      ex: { q: T`Three numbers average 17. Two of them are 12 and 19. What is the third?`, a: T`<p>The total is \(3\times17 = 51\). The known two sum to 31, so the third is \(51 - 31 = 20\).</p>` },
      exs: [{ q: T`One pipe fills a tank in 6 hours and another in 12 hours. How long do both take together?`, a: T`<p>Rates: \(\frac16 + \frac1{12} = \frac{3}{12} = \frac14\) tank per hour, so 4 hours. Check with the formula: \(\frac{6\cdot12}{6 + 12} = \frac{72}{18} = 4\).</p>` }],
      trap: T`Averaging two speeds directly for a round trip.`,
      vary: [[T`Four numbers average 10. Three are 8, 9, and 15. Find the fourth.`, 8, T`Total 40, known 32.`], [T`Split 60 in the ratio 2:3. Find the larger part.`, 36, T`\(\frac35\times60\).`], [T`A pump fills a tank in 3 hours and another in 6. How many hours together?`, 2, T`\(\frac{3\cdot6}{9}\).`], [T`You drive 30 mph out and 60 mph back. Average speed for the round trip?`, 40, T`\(\frac{2\cdot30\cdot60}{90}\).`]] },

    { title: U.series, skill: U.series,
      hook: T`<p>Number series questions hide one rule. Check the rules in order of how common they are, and stop at the first that fits every term.</p>`,
      body: T`
<p><b>1. Differences.</b> Subtract each term from the next. Constant: arithmetic. Differences that themselves change by a constant: quadratic (take differences again).</p>
<p><b>2. Ratios.</b> Constant ratio: geometric (watch for a negative ratio, which alternates signs).</p>
<p><b>3. Alternation.</b> Two different steps that alternate (+5, −2, +5, −2), or two separate series interleaved: read the odd positions and the even positions separately.</p>
<p><b>4. Built from earlier terms.</b> Each term is the sum of the two before it, or double the previous plus one.</p>
<p><b>5. Known lists.</b> Squares \(1, 4, 9, 16, 25\), cubes \(1, 8, 27, 64\), primes \(2, 3, 5, 7, 11, 13\), each possibly shifted by a constant.</p>`,
      ex: { q: T`Find the next term: 3, 5, 9, 15, 23, ?`, a: T`<p>Differences: 2, 4, 6, 8. They grow by 2, so the next difference is 10 and the next term is \(23 + 10 = 33\).</p>` },
      exs: [{ q: T`Find the next term: 4, 10, 6, 12, 8, ?`, a: T`<p>Differences: \(+6, -4, +6, -4\): alternating steps. Next is \(8 + 6 = 14\). (Or read positions 1, 3, 5 as 4, 6, 8 and positions 2, 4 as 10, 12, 14.)</p>` }],
      trap: T`Stopping at a rule that fits the first three terms but not the rest. Check every term.`,
      vary: [[T`2, 5, 8, 11, ?`, 14, T`Add 3.`], [T`2, 6, 18, 54, ?`, 162, T`Multiply by 3.`], [T`1, 4, 9, 16, ?`, 25, T`Squares.`], [T`1, 1, 2, 3, 5, 8, ?`, 13, T`Each term is the sum of the two before it.`], [T`3, 7, 15, 31, ?`, 63, T`Double and add 1.`]] },

    { title: U.logic, skill: U.logic,
      hook: T`<p>Logic items test whether a conclusion is forced by the statements given, ignoring what you know about the world. Made-up words such as "bloops" are used so that only the logic remains.</p>`,
      body: T`
<h4>Syllogisms: draw circles</h4>
<p>Draw each category as a circle. "All A are B" puts circle A inside B. "No A are B" keeps them apart. "Some A are B" means they overlap at least partly. Then ask: is there any drawing that obeys every statement but breaks the conclusion?</p>
<table class="tt"><tr><th>Statements</th><th>Conclusion</th><th>Verdict</th></tr>
<tr><td>All A are B. All B are C.</td><td>All A are C.</td><td>True</td></tr>
<tr><td>All A are B. Some B are C.</td><td>Some A are C.</td><td>Cannot tell: the part of B that overlaps C may lie outside A.</td></tr>
<tr><td>All A are B.</td><td>All B are A.</td><td>Cannot tell: B may be bigger.</td></tr>
<tr><td>All A are B. No B are C.</td><td>Some A are C.</td><td>False</td></tr></table>
<p>"False" means the statements rule the conclusion out. "Cannot tell" means some drawings allow it and some do not. (These items assume every category has members.)</p>
<h4>If-then statements</h4>
<p>From "if P then Q": knowing P gives Q, and knowing not Q gives not P. Knowing Q tells you nothing about P, and knowing not P tells you nothing about Q.</p>
<h4>Ordering</h4>
<p>Write the names on a line as each comparison arrives: tallest on the left. Each new fact attaches one name to the line.</p>`,
      ex: { q: T`All zorks are mibs. Some mibs are tufs. Is it true that some zorks are tufs?`, a: T`<p>Draw zorks inside mibs. The tufs overlap mibs somewhere, but that overlap can sit in the part of mibs outside zorks. Another drawing puts it inside zorks. Both obey the statements, so the answer is <b>cannot tell</b>.</p>` },
      exs: [{ q: T`If the market opens up, Dee buys. Dee did not buy. Did the market open up?`, a: T`<p>"If P then Q" with not Q gives not P. <b>No</b>, the market did not open up.</p>` }],
      trap: T`Reversing an if-then: "if it rains the game is cancelled" and "the game was cancelled" do not prove it rained.`,
      vary: [[T`All A are B. All B are C. All A are C?`, ['True', 'False', 'Cannot tell'], T`Circles nest.`], [T`All A are B. All B are A?`, ['Cannot tell', 'True', 'False'], T`B may be larger than A.`], [T`If P then Q. Q is true. Is P true?`, ['Cannot tell', 'Yes', 'No'], T`Q can be true for other reasons.`], [T`If P then Q. Q is false. Is P true?`, ['No', 'Yes', 'Cannot tell'], T`P would have forced Q.`]] },

    { title: U.verbal, skill: U.verbal,
      hook: T`<p>Verbal items test vocabulary and word relationships. The most common trap is a choice with the opposite relationship: a synonym offered when the question asks for an antonym.</p>`,
      body: T`
<p><b>Opposites and synonyms.</b> Read the instruction word (OPPOSITE or SAME) last, right before you choose. Before looking at the choices, think of your own word; then pick the choice closest to it.</p>
<p><b>Analogies.</b> State the relationship in a sentence: "a puppy is a young dog." Then apply the same sentence to the second pair: "a kitten is a young cat." Common relationships:</p>
<table class="tt"><tr><th>Relationship</th><th>Example</th></tr>
<tr><td>part to whole</td><td>petal : flower</td></tr><tr><td>worker to tool</td><td>surgeon : scalpel</td></tr>
<tr><td>young to adult</td><td>foal : horse</td></tr><tr><td>degree (mild to strong)</td><td>warm : hot</td></tr>
<tr><td>maker to product</td><td>author : novel</td></tr><tr><td>member to group</td><td>wolf : pack</td></tr>
<tr><td>opposites</td><td>ascend : descend</td></tr><tr><td>instrument to what it measures</td><td>barometer : pressure</td></tr></table>`,
      ex: { q: T`Choose the word most nearly OPPOSITE to FRUGAL: thrifty, extravagant, cautious, modest.`, a: T`<p>Frugal means careful with money. Thrifty is a synonym, the trap. The opposite is <b>extravagant</b>.</p>` },
      exs: [{ q: T`TIRED : EXHAUSTED :: HUNGRY : ?`, a: T`<p>The sentence: "exhausted is extremely tired," a degree relationship. Extremely hungry is <b>starving</b>.</p>` }],
      trap: T`Choosing the synonym on an opposites question because it was the first familiar word.`,
      vary: [[T`Opposite of SCARCE:`, ['plentiful', 'rare', 'meager'], T`Scarce means in short supply.`], [T`Same as CANDID:`, ['frank', 'evasive', 'clever'], T`Candid means open and honest.`], [T`PAGE : BOOK :: PETAL : ?`, ['flower', 'stem', 'garden'], T`Part to whole.`], [T`CUB : BEAR :: FAWN : ?`, ['deer', 'forest', 'antler'], T`Young to adult.`]] },

    { title: U.spatial, skill: U.spatial,
      hook: T`<p>Spatial items show shapes that change by a rule from frame to frame, or a set where one shape breaks the rule. Track one feature at a time: rotation, count, or mirror image.</p>`,
      body: T`
<p><b>Rotation.</b> Follow one distinctive part of the shape, such as a dot or a corner, and measure how far it turns each frame (usually 45° or 90°). Count the same step once more for the next frame.</p>
<p><b>Counting.</b> Sides, dots, or lines often go up by one each frame.</p>
<p><b>Rotation versus mirror image.</b> Turning a shape never changes its handedness; flipping it does. In an odd-one-out set where the shapes are all turned differently, the mirror image is the one that does not belong. Test it: mentally rotate a candidate until its long edge matches another; if the small feature lands on the opposite side, it is a mirror image.</p>
${row([flag(0, false), flag(90, false), flag(180, false), flag(270, false)])}
<p class="ctr">The same flag turned 90° each frame. Next: back to the start.</p>`,
      ex: { q: T`Three shapes are rotations of one flag and one is its mirror image. How do you find the mirror image quickly?`, a: T`<p>Pick a reference shape. For each other shape, turn it in your head until its pole is vertical with the flag at the top. If the flag then points the same way as the reference, it is a rotation; if it points the other way, it is the mirror image.</p>` },
      trap: T`Treating a mirror image as a rotation. No amount of turning makes a left hand into a right hand.`,
      vary: [[T`A shape turns 45° clockwise each frame. After 8 frames it has turned how many degrees?`, 360, T`A full turn: back where it started.`], [T`The frames show 3, 4, 5, and 6 sides. How many sides next?`, 7, T`One more side each frame.`]] },

    { title: U.prob, skill: U.prob,
      hook: T`<p>Trading interviews favor probability you can do aloud in under a minute: dice, coins, cards, and urns. Four tools cover almost all of it.</p>`,
      body: T`
<p><b>1. Count equally likely outcomes.</b> Two dice have \(36\) ordered outcomes. The number of ways to roll a sum \(s\) is \(6 - |s - 7|\), so \(P(7) = \frac{6}{36}\), \(P(10) = \frac{3}{36}\).</p>
<p><b>2. Complement for "at least one".</b> \(P(\text{at least one six in } n \text{ rolls}) = 1 - \left(\frac56\right)^n\). Four rolls give \(1 - \frac{625}{1296} \approx 0.518\).</p>
<p><b>3. Multiply along a sequence, without replacement.</b> Two cards both aces: \(\frac{4}{52}\cdot\frac{3}{51} = \frac{1}{221}\). Second card matching the first card's suit: \(\frac{12}{51}\), since only the second draw matters.</p>
<p><b>4. Conditioning shrinks the sample space.</b> Given at least one die shows a 3 (11 outcomes), the chance the sum is 7 is \(\frac{2}{11}\): only (3, 4) and (4, 3).</p>
<p><b>Binomial counts.</b> Exactly \(k\) heads in \(n\) fair flips: \(\frac{\binom nk}{2^n}\).</p>
<p>Say fractions out loud, then convert: \(\frac{5}{18} \approx 0.28\). Interviewers care that you set it up correctly before you simplify.</p>`,
      ex: { q: T`An urn has 5 red and 3 blue balls. You draw two without replacement. What is the probability both are red?`, a: T`<p>\(\frac58\cdot\frac47 = \frac{20}{56} = \frac{5}{14} \approx 0.357\). Check with counting: \(\binom52/\binom82 = \frac{10}{28} = \frac5{14}\).</p>` },
      exs: [{ q: T`What is the probability of exactly 2 heads in 4 fair flips?`, a: T`<p>\(\binom42 = 6\) arrangements out of \(2^4 = 16\): \(\frac{6}{16} = \frac38\).</p>` }],
      trap: T`Adding probabilities for "at least one": \(4\times\frac16\) is not the chance of a six in four rolls, as six rolls would then give certainty.`,
      vary: [[T`P(sum of two dice is 7)`, 1 / 6, T`6 of 36.`], [T`P(sum is 10)`, 1 / 12, T`3 of 36.`], [T`P(at least one head in 3 flips)`, 7 / 8, T`\(1 - \frac18\).`], [T`P(two cards are both hearts)`, 1 / 17, T`\(\frac{13}{52}\cdot\frac{12}{51}\).`], [T`P(exactly 1 head in 3 flips)`, 3 / 8, T`\(\binom31/8\).`]] },

    { title: U.ev, skill: U.ev,
      hook: T`<p>Expected value is the probability-weighted average payoff: what a bet is worth per play over many plays. Trading firms ask about it constantly because a price is just an expected value plus a margin.</p>`,
      body: T`
\[E[X] = \sum x\,P(X = x)\]
<p><b>Linearity.</b> \(E[X + Y] = E[X] + E[Y]\) always, even for dependent variables. Expected sum of 10 dice: \(10\times3.5 = 35\). Expected number of sixes in 12 rolls: \(12\times\frac16 = 2\).</p>
<p><b>Waiting times.</b> If each try succeeds with probability \(p\), the expected number of tries is \(\frac1p\): 6 rolls to see a specific face, 2 flips to see a head.</p>
<p><b>Options to stop or continue.</b> Work backward. With one reroll allowed on a die, the second roll is worth 3.5, so keep a first roll of 4, 5, or 6 and reroll 1, 2, or 3:</p>
\[E = \tfrac16(4 + 5 + 6) + \tfrac36(3.5) = 2.5 + 1.75 = 4.25\]
<p><b>Maximum of two dice.</b> \(P(\max \le k) = \left(\frac k6\right)^2\), so \(P(\max = k) = \frac{k^2 - (k-1)^2}{36} = \frac{2k - 1}{36}\), and \(E[\max] = \frac{161}{36} \approx 4.47\).</p>`,
      ex: { q: T`You roll a die and are paid the number shown, but you may reroll once and keep the second roll. What is the game worth?`, a: T`<p>The reroll is worth 3.5. Keep anything above 3.5: 4, 5, or 6. Value: \(\frac16(4 + 5 + 6) + \frac12(3.5) = 4.25\).</p>` },
      exs: [{ q: T`A bet pays $10 with probability 0.3 and nothing otherwise. What is a fair price?`, a: T`<p>\(0.3\times10 = 3\). At $3 neither side has an edge; paying less than $3 gives the buyer positive expected value.</p>` }],
      trap: T`Rerolling on a 4 because "4 is below average." The comparison is with 3.5, the value of the reroll.`,
      vary: [[T`Expected value of one die roll.`, 3.5, T`\(\frac{21}{6}\).`], [T`Expected sum of 4 dice.`, 14, T`Linearity: \(4\times3.5\).`], [T`Expected number of rolls until a 6.`, 6, T`\(\frac{1}{1/6}\).`], [T`Expected rolls until a 5 or 6.`, 3, T`\(p = \frac13\).`], [T`A die game with one reroll allowed. Its value?`, 4.25, T`Keep 4 to 6.`]] },

    { title: U.market, skill: U.market,
      hook: T`<p>A market maker quotes two prices: a bid (where they buy) and an ask (where they sell). Profit comes from trading at prices better than fair value, called edge.</p>`,
      body: T`
<p>A quote "48 at 52" means bid 48, ask 52, spread 4. You can sell to them at 48 or buy from them at 52.</p>
<p><b>Edge.</b> If your fair value is \(F\), buying at the ask \(A\) has expected profit \(F - A\) per contract; selling at the bid \(B\) has expected profit \(B - F\). Trade only when one of these is positive.</p>
<p><b>Fair value of a contract</b> is its expected payoff. A contract paying the sum of two dice is worth 7; paying \(10\times\) one die is worth 35.</p>
<p><b>Why spreads exist.</b> The other side may know more than you. A wider spread protects against being picked off; a tighter spread wins more trades. When unsure, quote wider.</p>
<p><b>Making a market aloud.</b> Estimate a fair value, say your uncertainty, and quote around it: "I think about 35, so 33 at 37." Update when the other side trades: if they keep buying from you, your ask was too low.</p>`,
      ex: { q: T`A contract pays the sum of two dice in dollars. The market is 6.50 at 7.25. What should you do, and what is your expected profit?`, a: T`<p>Fair value is 7. Buying at 7.25 loses 0.25 on average. Selling at 6.50 also loses 0.50. Neither side has edge, so you do not trade.</p>` },
      trap: T`Buying because the price is "low" without comparing it to fair value.`,
      vary: [[T`The quote is 48 at 52. What is the spread?`, 4, T`Ask minus bid.`], [T`Fair value 55, quote 48 at 52. Expected profit per contract from buying?`, 3, T`\(55 - 52\).`], [T`A contract pays \(10\times\) a die roll. Fair value?`, 35, T`\(10\times3.5\).`]] },

    { title: U.camera, skill: U.camera,
      hook: T`<p>On a one-way video, nobody can rescue a silent minute. A fixed structure keeps you talking productively and makes partial work visible.</p>`,
      body: T`
<h4>A three-minute structure</h4>
<table class="tt"><tr><th>Time</th><th>Say</th></tr>
<tr><td>0:00 to 0:15</td><td>Restate the question and name the tool: "This is an expected value question with an option to stop, so I'll work backward."</td></tr>
<tr><td>0:15 to 2:15</td><td>Work on paper while narrating each step, including the numbers you write.</td></tr>
<tr><td>2:15 to 2:40</td><td>State the answer as a number: "So the game is worth 4.25."</td></tr>
<tr><td>2:40 to 3:00</td><td>Sanity check: a bound, an extreme case, or a second method.</td></tr></table>
<p><b>The 5 seconds.</b> Use them only to classify: counting, conditional probability, expected value, stopping problem, estimation, or arithmetic.</p>
<p><b>If you get stuck,</b> say the approach you would take, solve a smaller version aloud, then give your best estimate and why. A reasoned estimate beats silence.</p>
<p><b>Keep it plain.</b> Short sentences, numbers said clearly, no apology for thinking time. The video practice mode on this subject's page runs these timers and shows a model answer and a checklist afterward.</p>`,
      vary: [[T`What should come first in a recorded answer?`, ['restate the question and name the tool', 'the final number', 'an apology for needing time'], T`It frames everything that follows.`], [T`You are stuck at 1:30. Best move?`, ['solve a smaller case aloud and give a reasoned estimate', 'stay silent until it clicks', 'restart from the beginning'], T`Visible reasoning earns credit; silence earns none.`]],
      ex: { q: T`Model answer, spoken: "What is the probability of at least one six in four rolls of a die?"`, a: T`
<p>"This is an at-least-one question, so I'll use the complement."</p>
<p>"The chance of no six on one roll is five sixths. Four independent rolls: five sixths to the fourth, which is 625 over 1296."</p>
<p>"So the probability of at least one six is 1 minus 625 over 1296, which is 671 over 1296, about 0.52."</p>
<p>"Check: it should be less than the 4 times one sixth, two thirds, that you'd get by wrongly adding, and more than one sixth. 0.52 fits."</p>` } }
  ]);

  // ======================= FIXED PROBLEMS =======================
  addQuestions('quant', [
    { id: 'q3', skill: U.mental, q: T`Compute \(25 \times 48\).`, answer: 1200, x: T`\(25\times4 = 100\), so \(25\times48 = 100\times12\).` },
    { id: 'q4', skill: U.mental, q: T`Compute \(999 \times 7\).`, answer: 6993, x: T`\(7000 - 7\).` },
    { id: 'q5', skill: U.fdp, q: T`Which is largest?`, c: [T`\(\tfrac79\)`, T`\(\tfrac34\)`, T`\(0.77\)`, T`\(\tfrac{10}{13}\)`], x: T`\(\tfrac79 = 0.778\), \(\tfrac{10}{13} = 0.769\), \(0.77\), \(\tfrac34 = 0.75\).` },
    { id: 'q6', skill: U.fdp, q: T`A stock falls 50% and then rises 50%. What is the net percent change?`, answer: -25, x: T`\(0.5\times1.5 = 0.75\).` },
    { id: 'q7', skill: U.word, q: T`A bat and a ball cost $1.10 together. The bat costs $1.00 more than the ball. How much is the ball, in dollars?`, answer: 0.05, x: T`Ball \(b\), bat \(b + 1\): \(2b + 1 = 1.10\), so \(b = 0.05\). The tempting 0.10 would make the total 1.20.` },
    { id: 'q8', skill: U.word, q: T`A lily patch doubles in size every day and covers the lake on day 48. On what day did it cover half the lake?`, answer: 47, x: T`One doubling before full coverage.` },
    { id: 'q9', skill: U.series, q: T`Find the next term: 2, 3, 5, 7, 11, 13, ?`, answer: 17, x: T`Primes.` },
    { id: 'q10', skill: U.logic, q: T`No vexes are hoons. Some quops are vexes. Is it true that some quops are not hoons?`, c: ['True', 'False', 'Cannot tell'], x: T`The quops that are vexes cannot be hoons.` },
    { id: 'q11', skill: U.verbal, q: T`Choose the word most nearly OPPOSITE to VERBOSE.`, c: ['concise', 'wordy', 'loud', 'vague'], x: T`Verbose means using too many words. Wordy is the synonym trap.` },
    { id: 'q12', skill: U.prob, q: T`A family has two children, and at least one is a boy. What is the probability both are boys?`, answer: 1 / 3, tol: 0.001, x: T`Equally likely families BB, BG, GB, GG; GG is ruled out, leaving BB as 1 of 3.` },
    { id: 'q13', skill: U.prob, q: T`On a game show, you pick door 1 of 3. The host, who knows where the prize is, opens door 3 to show it is empty. Should you switch, and with what chance of winning?`, c: ['switch: 2/3', 'stay: 1/2 either way', 'stay: 2/3', 'switch: 1/2'], x: T`Your first pick wins 1/3 of the time. The host's knowledge moves the other 2/3 onto the remaining door.` },
    { id: 'q14', skill: U.ev, q: T`What is the expected number of fair coin flips until the first head?`, answer: 2, x: T`\(\frac1p\) with \(p = \frac12\).` },
    { id: 'q15', skill: U.ev, q: T`What is the expected product of two independent dice?`, answer: 12.25, x: T`Independence: \(E[XY] = E[X]E[Y] = 3.5^2\).` },
    { id: 'q16', skill: U.market, q: T`Your fair value is 55 and the market is 48 at 52. You should:`, c: ['buy at 52', 'sell at 48', 'buy at 48', 'do nothing'], x: T`Buying at the ask of 52 gains 3 in expectation; selling at 48 loses 7.` },
    { id: 'q17', skill: U.market, q: T`A wider bid-ask spread mainly protects a market maker from:`, c: ['trading against better-informed counterparties', 'trading too rarely', 'interest rate changes', 'rounding errors'], x: T`This risk is called adverse selection.` },
  ]);

  // ======================= GENERATORS =======================
  const pm = v => (v < 0 ? `(${v})` : `${v}`);
  registerUnitGens('quant', { units: {
    [U.mental]: [
      { id: 'qm-mul', sim: true, make(R) {
        const k = R.int(0, 3);
        if (k === 0) { const a = R.int(12, 98), b = R.int(3, 9), t = a - a % 10;
          return { q: T`Compute \(${a}\times${b}\).`, answer: a * b, d: near(a * b, [a * b + 10, a * b - 10, a * b + b, (a + 1) * b - 1, a * b + 2]), x: T`\(${t}\times${b} + ${a % 10}\times${b} = ${t * b} + ${(a % 10) * b} = ${a * b}\).`, v: `${a}*${b}` }; }
        if (k === 1) { const c = R.pick([50, 100, 30, 70]), d = R.int(1, 4), a = c - d, b = c + d;
          return { q: T`Compute \(${a}\times${b}\).`, answer: a * b, d: near(a * b, [c * c, a * b + d * d * 2, a * b - 10, a * b + 100]), x: T`Both are ${d} from ${c}: \(${c}^2 - ${d}^2 = ${c * c} - ${d * d} = ${a * b}\).`, v: `${a}*${b}` }; }
        if (k === 2) { const d = R.int(1, 4), b = R.int(12, 89), a = 100 - d;
          return { q: T`Compute \(${a}\times${b}\).`, answer: a * b, d: near(a * b, [a * b + 100, a * b - 10, 100 * b - d, a * b + d]), x: T`\(${a} = 100 - ${d}\): \(${100 * b} - ${d}\times${b} = ${100 * b} - ${d * b} = ${a * b}\).`, v: `${a}*${b}` }; }
        const a = R.int(12, 49), b = R.int(12, 49), bt = b - b % 10;
        return { q: T`Compute \(${a}\times${b}\).`, answer: a * b, d: near(a * b, [a * b + 10, a * b - a, a * b + 100, a * b - 1]), x: T`\(${a}\times${bt} + ${a}\times${b % 10} = ${a * bt} + ${a * (b % 10)} = ${a * b}\).`, v: `${a}*${b}` };
      } },
      { id: 'qm-sq', sim: true, make(R) {
        const n = R.int(13, 97), t = n - n % 10, o = n % 10;
        return { q: T`Compute \(${n}^2\).`, answer: n * n, d: near(n * n, [t * t + o * o, n * n + 10, n * n - 2 * n, n * n + 100]), x: T`\((${t} + ${o})^2 = ${t * t} + 2\cdot${t}\cdot${o} + ${o * o} = ${t * t} + ${2 * t * o} + ${o * o} = ${n * n}\).`, v: `${n}**2` };
      } },
      { id: 'qm-div', sim: true, make(R) {
        const d = R.int(3, 19), q = R.int(12, 99), n = d * q, h = Math.floor(q / 10) * 10;
        return { q: T`Compute \(${n}\div${d}\).`, answer: q, d: near(q, [q + 1, q - 1, q + 10, q - 10]), x: T`\(${d}\times${h} = ${d * h}\), leaving \(${n - d * h} = ${d}\times${q - h}\). So \(${h} + ${q - h} = ${q}\).`, v: `${n}//${d}` };
      } }
    ],
    [U.fdp]: [
      { id: 'qf-dec', sim: true, make(R) {
        const [n, d] = R.pick([[1, 8], [3, 8], [5, 8], [7, 8], [1, 6], [5, 6], [2, 7], [3, 7], [1, 9], [4, 9], [7, 9], [1, 12], [5, 12], [3, 16], [1, 11], [3, 11], [7, 20], [9, 40], [3, 25], [1, 3], [2, 3]]);
        const v = n / d;
        return { q: T`Write \(\tfrac{${n}}{${d}}\) as a decimal, to three places.`, answer: v, tol: 0.0011, hint: 'Three decimal places.', d: near(+v.toFixed(3), [+(v + 0.1).toFixed(3), +(v - 0.01).toFixed(3), +(d / n / 10).toFixed(3), +(n / (d + 1)).toFixed(3)]),
          x: T`${d % 8 === 0 ? T`Eighths: \(${n}\times0.125\)` : d === 7 ? T`Sevenths: \(${n}\times0.142857\)` : d === 9 ? T`Ninths repeat the numerator: \(0.${n}${n}${n}\ldots\)` : d === 11 ? T`Elevenths: \(${n}\times0.0909\)` : d === 6 || d === 12 || d === 3 ? (n === 1 ? T`\(\tfrac1{${d}} = ${R.fmt(1 / d, 4)}\ldots\)` : T`\(\tfrac1{${d}} = ${R.fmt(1 / d, 4)}\ldots\), times ${n}`) : T`Scale the denominator to 100 or 1000`} \(\approx ${R.fmt(v, 3)}\).`, v: `Rational(${n}, ${d})` };
      } },
      { id: 'qf-pct', sim: true, make(R) {
        if (R.int(0, 1)) { const p = R.pick([5, 12.5, 15, 20, 25, 35, 40, 60, 75, 120, 150]), N = R.pick([40, 48, 64, 80, 120, 160, 240, 360, 480]), v = p * N / 100;
          return { q: T`What is ${p}% of ${N}?`, answer: v, d: near(v, [v * 2, v / 2, v + 10, N - v]), x: T`${p === 12.5 ? T`\(12.5\% = \tfrac18\): \(${N}\div8\)` : p === 15 ? T`\(10\% + 5\%\): \(${N / 10} + ${N / 20}\)` : T`\(\frac{${p}}{100}\times${N}\)`} \(= ${R.fmt(v)}\).`, v: `Rational(${p * 10}, 1000)*${N}` }; }
        const old = R.pick([20, 25, 40, 50, 80, 120, 200, 250]), pc = R.pick([-40, -25, -20, -10, 10, 15, 20, 25, 50, 75]), nw = old * (100 + pc) / 100;
        return { q: T`A price moves from ${old} to ${R.fmt(nw)}. What is the percent change? (Use a negative number for a fall.)`, answer: pc, d: near(pc, [-pc, Math.round(100 * (nw - old) / nw), pc + 5, pc * 2]), x: T`\(\frac{${R.fmt(nw)} - ${old}}{${old}} = \frac{${R.fmt(nw - old)}}{${old}} = ${R.fmt(pc / 100)}\), so ${pc}%.`, v: `(Rational(${Math.round(nw * 100)}, 100) - ${old})*100/${old}` };
      } },
      { id: 'qf-big', make(R) {
        let fr; do { fr = R.sample([[2, 3], [3, 4], [4, 5], [5, 6], [5, 7], [7, 9], [7, 10], [9, 11], [11, 13], [10, 13], [5, 8], [13, 16]], 4); } while (new Set(fr.map(([a, b]) => a / b)).size < 4);
        const best = fr.reduce((m, f) => (f[0] / f[1] > m[0] / m[1] ? f : m));
        const c = [best, ...fr.filter(f => f !== best)].map(([a, b]) => T`\(\tfrac{${a}}{${b}}\)`);
        return { q: T`Which is largest?`, c, x: T`As decimals: ${fr.map(([a, b]) => T`\(\tfrac{${a}}{${b}} \approx ${R.fmt(a / b, 3)}\)`).join(', ')}.`, key: `${best[0]}/${best[1]}`, vk: `str(max([${fr.map(([a, b]) => `Rational(${a}, ${b})`).join(', ')}]))` };
      } }
    ],
    [U.word]: [
      { id: 'qw-avg', sim: true, make(R) {
        const n = R.int(3, 5), m = R.int(10, 40), known = Array.from({ length: n - 1 }, () => R.int(m - 9, m + 9)), last = n * m - known.reduce((a, b) => a + b, 0);
        return { q: T`${n} numbers average ${m}. ${n - 1 === 2 ? 'Two' : n - 1 === 3 ? 'Three' : 'Four'} of them are ${known.join(', ')}. What is the remaining number?`, answer: last, d: near(last, [m, last + n, last - 1, Math.round(known.reduce((a, b) => a + b, 0) / (n - 1))]),
          x: T`The total is \(${n}\times${m} = ${n * m}\). The known numbers sum to ${known.reduce((a, b) => a + b, 0)}, leaving ${last}.`, v: `${n}*${m} - (${known.join(' + ')})` };
      } },
      { id: 'qw-work', sim: true, make(R) {
        const [a, b] = R.pick([[3, 6], [4, 12], [6, 12], [10, 15], [12, 24], [20, 30], [6, 3], [12, 4], [2, 6], [15, 10]]), t = a * b / (a + b);
        return { q: T`One machine finishes a job in ${a} hours and another in ${b} hours. Working together, how many hours do they take?`, answer: t, d: near(t, [(a + b) / 2, Math.abs(a - b), Math.min(a, b) / 2, t + 1]), x: T`Rates add: \(\frac1{${a}} + \frac1{${b}}\). Time \(= \frac{${a}\cdot${b}}{${a} + ${b}} = \frac{${a * b}}{${a + b}} = ${R.fmt(t)}\).`, v: `1/(Rational(1, ${a}) + Rational(1, ${b}))` };
      } },
      { id: 'qw-ratio', sim: true, make(R) {
        const a = R.int(1, 5), b = R.int(a + 1, 8), k = R.int(3, 15), N = (a + b) * k;
        return { q: T`${N} is split in the ratio ${a}:${b}. What is the larger part?`, answer: b * k, d: near(b * k, [a * k, N / 2, N - a, b * k + k]), x: T`${a + b} equal shares of \(${N}\div${a + b} = ${k}\). The larger part is \(${b}\times${k} = ${b * k}\).`, v: `Rational(${b}, ${a + b})*${N}` };
      } },
      { id: 'qw-speed', sim: true, make(R) {
        const [u, w] = R.pick([[30, 60], [40, 60], [20, 30], [60, 90], [45, 90], [24, 40], [50, 75]]), t = 2 * u * w / (u + w);
        return { q: T`A car drives to a town at ${u} mph and returns along the same road at ${w} mph. What is its average speed for the round trip, in mph?`, answer: t, d: near(t, [(u + w) / 2, t + 2, w - u, t - 4]), x: T`Average speed is total distance over total time: \(\frac{2\cdot${u}\cdot${w}}{${u} + ${w}} = ${R.fmt(t)}\). The plain average ${(u + w) / 2} is too high because more time is spent at the slower speed.`, v: `2*${u}*${w}/Rational(${u + w})` };
      } }
    ],
    [U.series]: [
      { id: 'qn-next', sim: true, make(R) {
        const k = R.int(0, 7); let terms, next, why, py;
        if (k === 0) { const a = R.int(-10, 20), d = R.nz(-9, 12); terms = [0, 1, 2, 3, 4].map(i => a + d * i); next = a + 5 * d; why = T`Constant difference ${d}.`; py = `${a} + 5*${pm(d)}`; }
        else if (k === 1) { const a = R.int(1, 5), r = R.pick([2, 3, -2]); terms = [0, 1, 2, 3, 4].map(i => a * r ** i); next = a * r ** 5; why = T`Each term is ${r} times the one before.`; py = `${a}*(${r})**5`; }
        else if (k === 2) { const a = R.int(1, 20), p = R.int(3, 9), q = R.int(1, p - 1); terms = [a]; for (let i = 1; i < 6; i++) terms.push(terms[i - 1] + (i % 2 ? p : -q)); next = terms.pop(); why = T`Alternating steps: add ${p}, subtract ${q}.`; py = `${a} + 3*${p} - 2*${q}`; }
        else if (k === 3) { const a = R.int(1, 10), d = R.int(1, 5), c = R.int(1, 3); terms = [0, 1, 2, 3, 4].map(n => a + d * n + c * n * (n - 1) / 2); next = a + 5 * d + 10 * c; why = T`The differences grow by ${c} each time.`; py = `${a} + 5*${d} + ${c}*5*4//2`; }
        else if (k === 4) { const x = R.int(1, 5), y = R.int(x, 8); terms = [x, y]; while (terms.length < 6) terms.push(terms[terms.length - 1] + terms[terms.length - 2]); next = terms.pop(); terms = terms.slice(0, 5); why = T`Each term is the sum of the two before it.`; py = `(lambda f: f(f, [${x}, ${y}]))(lambda g, s: s[5] if len(s) > 5 else g(g, s + [s[-1] + s[-2]]))`; }
        else if (k === 5) { const a = R.int(1, 4), m = R.pick([2, 3]), c = R.pick([1, -1, 2]); terms = [a]; for (let i = 1; i < 6; i++) terms.push(terms[i - 1] * m + c); next = terms.pop(); why = T`Multiply by ${m}, then ${c > 0 ? 'add' : 'subtract'} ${Math.abs(c)}.`; py = `(lambda t: t*${m} + (${c}))((lambda t: t*${m} + (${c}))((lambda t: t*${m} + (${c}))((lambda t: t*${m} + (${c}))((lambda t: t*${m} + (${c}))(${a})))))`; }
        else if (k === 6) { const a = R.int(1, 9), d1 = R.int(2, 6), b = R.int(20, 40), d2 = R.nz(-5, 5); terms = [a, b, a + d1, b + d2, a + 2 * d1]; next = b + 2 * d2; why = T`Two series interleaved: odd positions add ${d1}, even positions ${d2 > 0 ? 'add' : 'subtract'} ${Math.abs(d2)}.`; py = `${b} + 2*${pm(d2)}`; }
        else { const c = R.int(-3, 5); terms = [1, 2, 3, 4, 5].map(n => n * n + c); next = 36 + c; why = T`Squares ${c ? `${c > 0 ? 'plus' : 'minus'} ${Math.abs(c)}` : ''}: \(n^2${c ? (c > 0 ? ' + ' + c : ' - ' + -c) : ''}\).`; py = `6**2 + (${c})`; }
        return { q: T`Find the next term: ${terms.join(', ')}, ?`, answer: next, d: near(next, [next + 1, next - 2, 2 * terms[4] - terms[3], next + 10]), x: why + T` Next: ${next}.`, v: py };
      } }
    ],
    [U.logic]: [
      { id: 'ql-syl', sim: true, make(R) {
        const [prem, concl] = R.pick(SYL_FORMS), N = R.pick(SYL_NOUNS), ans = syllogism(prem, concl);
        const order = ['True', 'False', 'Cannot tell'];
        return { q: T`${prem.map(p => sylText(p, N) + '.').join(' ')} Is it true that ${sylText(concl, N).replace(/^./, ch => ch.toLowerCase())}?`, c: [ans, ...order.filter(o => o !== ans)],
          x: ans === 'True' ? T`Every drawing of the circles that obeys the statements also obeys the conclusion.` : ans === 'False' ? T`The statements rule the conclusion out in every drawing.` : T`Some drawings that obey the statements satisfy the conclusion and others do not.`,
          key: ans, vk: `syl(${JSON.stringify(prem)}, ${JSON.stringify(concl)})` };
      } },
      { id: 'ql-order', sim: true, make(R) {
        const n = R.int(4, 5), people = R.sample(NAMES, n); // people[0] tallest
        const rels = R.shuffle(Array.from({ length: n - 1 }, (_, i) => [people[i], people[i + 1]]));
        const txt = rels.map(([a, b]) => (R.int(0, 1) ? `${a} is taller than ${b}.` : `${b} is shorter than ${a}.`)).join(' ');
        const ask = R.pick(['tallest', 'shortest', 'second tallest', 'second shortest']), idx = { tallest: 0, shortest: n - 1, 'second tallest': 1, 'second shortest': n - 2 }[ask];
        return { q: `${txt} Who is ${ask}?`, c: [people[idx], ...people.filter((_, i) => i !== idx).slice(0, 3)], x: `Lining them up from tallest: ${people.join(', ')}.`, key: people[idx], vk: `order_q(${JSON.stringify(rels)}, ${idx})` };
      } },
      { id: 'ql-if', sim: true, make(R) {
        const [P, Q, nP, nQ] = R.pick([['it rains', 'the game is cancelled', 'it did not rain', 'the game was not cancelled'], ['the alarm sounds', 'the doors lock', 'the alarm did not sound', 'the doors did not lock'], ['Eli trades', 'Fay hedges', 'Eli did not trade', 'Fay did not hedge'], ['the price rises', 'Ann sells', 'the price did not rise', 'Ann did not sell']]);
        const form = R.int(0, 3), cap = s => s[0].toUpperCase() + s.slice(1);
        const Qpast = { 'the game is cancelled': 'the game was cancelled', 'the doors lock': 'the doors locked', 'Fay hedges': 'Fay hedged', 'Ann sells': 'Ann sold' }[Q];
        const Ppast = { 'it rains': 'it rained', 'the alarm sounds': 'the alarm sounded', 'Eli trades': 'Eli traded', 'the price rises': 'the price rose' }[P];
        const facts = [`${cap(Ppast)}.`, `${cap(nQ)}.`, `${cap(Qpast)}.`, `${cap(nP)}.`][form];
        const askQ = form === 0 || form === 3, question = askQ ? `Is it true that ${Qpast}?` : `Is it true that ${Ppast}?`;
        const ans = form === 0 ? 'Yes' : form === 1 ? 'No' : 'Cannot tell';
        return { q: `If ${P}, then ${Q}. ${facts} ${question}`, c: [ans, ...['Yes', 'No', 'Cannot tell'].filter(o => o !== ans)],
          x: ['The condition happened, so the result follows.', 'If the condition had happened, the result would have too. It did not, so the condition did not happen.', 'The result can happen for other reasons, so it does not prove the condition.', 'The rule says nothing about what happens when the condition fails.'][form],
          key: ans, vk: `cond(${form})` };
      } }
    ],
    [U.verbal]: [
      { id: 'qv-word', sim: true, make(R) {
        const [w, syn, ant, cl] = R.pick(WORDS), opp = R.int(0, 1) === 1, others = R.sample(WORDS.filter(x => x[3] !== cl), 2).map(x => x[0]);
        return { q: `Choose the word most nearly ${opp ? 'OPPOSITE to' : 'the SAME as'} ${w.toUpperCase()}.`, c: [opp ? ant : syn, opp ? syn : ant, ...others],
          x: `${w[0].toUpperCase() + w.slice(1)} means ${syn}; its opposite is ${ant}.${opp ? ` "${syn[0].toUpperCase() + syn.slice(1)}" is the synonym trap.` : ` "${ant[0].toUpperCase() + ant.slice(1)}" is the opposite, the trap.`}`, key: 'curated', vk: `'curated'` };
      } },
      { id: 'qv-analogy', sim: true, make(R) {
        const rel = R.pick(Object.keys(REL)), [p1, p2] = R.sample(REL[rel], 2), otherRels = Object.keys(REL).filter(k => k !== rel);
        const ds = [R.pick(REL[rel].filter(x => x !== p1 && x !== p2))[1], ...R.sample(otherRels, 2).map(k => R.pick(REL[k])[1])];
        return { q: `${p1[0].toUpperCase()} : ${p1[1].toUpperCase()} :: ${p2[0].toUpperCase()} : ?`, c: [p2[1], ...ds], x: `The relationship is ${rel}: ${p1[0]} to ${p1[1]}, so ${p2[0]} to ${p2[1]}.`, key: 'curated', vk: `'curated'` };
      } }
    ],
    [U.spatial]: [
      { id: 'qs-rot', sim: true, make(R) {
        const step = R.pick([45, 90, -45, -90, 135]), a0 = R.pick([0, 45, 90, 135, 180, 225, 270, 315]), mir = R.int(0, 1) === 1, ang = i => ((a0 + step * i) % 360 + 360) % 360;
        const ans = ang(4);
        const c = [flag(ans, mir), flag(((ans + 90) % 360), mir), flag(ans, !mir), flag(((ans + 180) % 360), mir)];
        return { q: `The flag turns by the same amount each frame. Which comes next?${row([0, 1, 2, 3].map(i => flag(ang(i), mir)))}`, c, x: `It turns ${Math.abs(step)}° ${step > 0 ? 'clockwise' : 'counterclockwise'} each frame, so the next frame is one more step. The mirror-image choice has the dot on the wrong side.`, key: String(ans), vk: `str(((${a0} + ${step}*4) % 360 + 360) % 360)` };
      } },
      { id: 'qs-odd', sim: true, make(R) {
        const angs = R.sample([0, 45, 90, 135, 180, 225, 270, 315], 4), mir = R.int(0, 1) === 1;
        return { q: 'Three shapes are the same flag turned to different angles. Which one is different?', c: [flag(angs[0], !mir), flag(angs[1], mir), flag(angs[2], mir), flag(angs[3], mir)], x: 'Rotating never changes handedness. The odd one out is the mirror image: turn it upright and its dot is on the opposite side.', key: 'mirror', vk: `'mirror'` };
      } },
      { id: 'qs-count', sim: true, make(R) {
        if (R.int(0, 1)) { const s = R.int(3, 4);
          return { q: `Which comes next?${row([s, s + 1, s + 2, s + 3].map(poly))}`, c: [poly(s + 4), poly(s + 3), poly(s + 5), poly(s + 2)], x: `One more side each frame: ${s + 4} sides next.`, key: String(s + 4), vk: `str(${s} + 4)` }; }
        const [s, st] = R.pick([[1, 1], [2, 1], [1, 2]]);
        return { q: `Which comes next?${row([0, 1, 2, 3].map(i => dots(s + st * i)))}`, c: [dots(s + 4 * st), dots(s + 3 * st), dots(s + 4 * st - 1), dots(Math.min(9, s + 4 * st + 1))].filter((v, i, arr) => arr.indexOf(v) === i), x: `The dots go up by ${st} each frame: ${s + 4 * st} next.`, key: String(s + 4 * st), vk: `str(${s} + 4*${st})` };
      } }
    ],
    [U.prob]: [
      { id: 'qp-dice', make(R) {
        const k = R.int(0, 2);
        if (k === 0) { const s = R.int(2, 12), w = 6 - Math.abs(s - 7);
          return { q: T`Two fair dice are rolled. What is the probability their sum is ${s}?`, answer: w / 36, tol: 0.001, hint: 'A fraction such as 5/36, or a decimal to three places.', x: T`${w} of the 36 ordered outcomes: \(${frac(w, 36)}\).`, v: `Rational(sum(1 for a in range(1, 7) for b in range(1, 7) if a + b == ${s}), 36)` }; }
        if (k === 1) { const n = R.int(2, 6), f = R.int(1, 6);
          return { q: T`A fair die is rolled ${n} times. What is the probability that at least one roll is a ${f}?`, answer: 1 - (5 / 6) ** n, tol: 0.001, hint: 'A decimal to three places, or a fraction.', x: T`Complement: \(1 - \left(\frac56\right)^{${n}} = 1 - \frac{${5 ** n}}{${6 ** n}} \approx ${R.fmt(1 - (5 / 6) ** n, 3)}\).`, v: `1 - Rational(5, 6)**${n}` }; }
        const g = R.int(1, 6), sum = R.int(g + 1, g + 6), outs = [];
        for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a === g || b === g) outs.push([a, b]);
        const hit = outs.filter(([a, b]) => a + b === sum).length;
        return { q: T`Two fair dice are rolled and at least one shows a ${g}. What is the probability the sum is ${sum}?`, answer: hit / outs.length, tol: 0.001, hint: 'A fraction or a decimal to three places.',
          x: T`At least one ${g}: 11 outcomes (6 + 6, minus the double ${g} counted twice). Sum ${sum}: ${hit === 1 ? `only (${g}, ${g})` : `(${g}, ${sum - g}) and (${sum - g}, ${g})`}, so \(${frac(hit, 11)}\).`,
          v: `Rational(sum(1 for a in range(1, 7) for b in range(1, 7) if ${g} in (a, b) and a + b == ${sum}), sum(1 for a in range(1, 7) for b in range(1, 7) if ${g} in (a, b)))` };
      } },
      { id: 'qp-urn', make(R) {
        const r = R.int(2, 7), b = R.int(2, 7), n = r + b, both = R.int(0, 1) === 1;
        if (both) return { q: T`An urn holds ${r} red and ${b} blue balls. Two are drawn without replacement. What is the probability both are red?`, answer: r * (r - 1) / (n * (n - 1)), tol: 0.001, hint: 'A fraction or a decimal to three places.', x: T`\(\frac{${r}}{${n}}\cdot\frac{${r - 1}}{${n - 1}} = ${frac(r * (r - 1), n * (n - 1))}\).`, v: `Rational(${r}*${r - 1}, ${n}*${n - 1})` };
        return { q: T`An urn holds ${r} red and ${b} blue balls. Two are drawn without replacement. What is the probability they are different colors?`, answer: 2 * r * b / (n * (n - 1)), tol: 0.001, hint: 'A fraction or a decimal to three places.', x: T`Red then blue, or blue then red: \(2\cdot\frac{${r}}{${n}}\cdot\frac{${b}}{${n - 1}} = ${frac(2 * r * b, n * (n - 1))}\).`, v: `Rational(2*${r}*${b}, ${n}*${n - 1})` };
      } },
      { id: 'qp-flips', make(R) {
        const n = R.int(3, 6), k = R.int(0, n);
        return { q: T`A fair coin is flipped ${n} times. What is the probability of exactly ${k} head${k === 1 ? '' : 's'}?`, answer: R.binom(n, k) / 2 ** n, tol: 0.001, hint: 'A fraction or a decimal to three places.', x: T`\(\binom{${n}}{${k}} = ${R.binom(n, k)}\) arrangements out of \(2^{${n}} = ${2 ** n}\): \(${frac(R.binom(n, k), 2 ** n)}\).`, v: `Rational(binomial(${n}, ${k}), 2**${n})` };
      } },
      { id: 'qp-cards', make(R) {
        const k = R.int(0, 3);
        const Q = [[T`Two cards are drawn from a standard 52-card deck. What is the probability both are aces?`, 4 * 3 / (52 * 51), T`\(\frac{4}{52}\cdot\frac{3}{51} = \frac{1}{221}\).`, 'Rational(4*3, 52*51)'],
          [T`Two cards are drawn from a standard deck. What is the probability they are the same suit?`, 12 / 51, T`Whatever the first card, 12 of the remaining 51 match its suit: \(\frac{12}{51} = \frac4{17}\).`, 'Rational(12, 51)'],
          [T`Two cards are drawn from a standard deck. What is the probability they are the same color?`, 25 / 51, T`25 of the remaining 51 cards match the first card's color.`, 'Rational(25, 51)'],
          [T`Two cards are drawn from a standard deck. What is the probability at least one is an ace?`, 1 - (48 * 47) / (52 * 51), T`Complement: \(1 - \frac{48}{52}\cdot\frac{47}{51} = 1 - \frac{188}{221} = \frac{33}{221}\).`, '1 - Rational(48*47, 52*51)']][k];
        return { q: Q[0], answer: Q[1], tol: 0.001, hint: 'A fraction or a decimal to three places.', x: Q[2], v: Q[3] };
      } }
    ],
    [U.ev]: [
      { id: 'qe-reroll', make(R) {
        const d = R.pick([4, 6, 8, 10, 12, 20]), half = (d + 1) / 2, keep = Array.from({ length: d }, (_, i) => i + 1).filter(x => x > half), val = (keep.reduce((a, b) => a + b, 0) + (d - keep.length) * half) / d;
        return { q: T`You roll a fair ${d}-sided die and are paid the number shown. You may reroll once and keep the second roll. What is the game worth?`, answer: val, tol: 0.001, hint: 'A decimal to three places, or a fraction.',
          x: T`The reroll is worth \(${R.fmt(half)}\). Keep ${keep[0]} through ${d}; reroll the rest. Value \(= \frac1{${d}}\left(${keep[0]} + \cdots + ${d}\right) + \frac{${d - keep.length}}{${d}}(${R.fmt(half)}) = ${R.fmt(val, 4)}\).`, v: `sum(max(Rational(x), Rational(${d + 1}, 2)) for x in range(1, ${d + 1}))/${d}` };
      } },
      { id: 'qe-linear', make(R) {
        const k = R.int(0, 3), n = R.int(3, 20);
        if (k === 0) return { q: T`What is the expected sum of ${n} fair dice?`, answer: 3.5 * n, x: T`Linearity: \(${n}\times3.5 = ${R.fmt(3.5 * n)}\).`, v: `${n}*Rational(7, 2)` };
        if (k === 1) { const m = R.pick([6, 12, 18, 24, 30]); return { q: T`A fair die is rolled ${m} times. What is the expected number of sixes?`, answer: m / 6, x: T`Each roll contributes \(\frac16\): \(\frac{${m}}{6} = ${m / 6}\).`, v: `${m}*Rational(1, 6)` }; }
        if (k === 2) { const p = R.pick([[1, 6], [1, 3], [1, 2], [1, 4], [2, 5]]); return { q: T`Each attempt succeeds with probability \(${frac(p[0], p[1])}\), independently. What is the expected number of attempts until the first success?`, answer: p[1] / p[0], x: T`\(\frac1p = ${frac(p[1], p[0])}\).`, v: `1/Rational(${p[0]}, ${p[1]})` }; }
        const m = R.pick([2, 3, 5, 10]); return { q: T`A contract pays $${m} times the number shown on a fair die, but only if the number is even; otherwise it pays nothing. What is its fair value in dollars?`, answer: m * 2, x: T`\(\frac16(2 + 4 + 6)\times${m} = 2\times${m} = ${2 * m}\).`, v: `Rational(2 + 4 + 6, 6)*${m}` };
      } },
      { id: 'qe-two', make(R) {
        const k = R.int(0, 2);
        const Q = [[T`Two fair dice are rolled. What is the expected value of the larger number?`, 161 / 36, T`\(P(\max = k) = \frac{2k - 1}{36}\), so \(E = \frac{1\cdot1 + 2\cdot3 + 3\cdot5 + 4\cdot7 + 5\cdot9 + 6\cdot11}{36} = \frac{161}{36} \approx 4.47\).`, 'Rational(sum(max(a, b) for a in range(1, 7) for b in range(1, 7)), 36)'],
          [T`Two fair dice are rolled. What is the expected value of the smaller number?`, 91 / 36, T`The larger and smaller add to the sum, whose expected value is 7: \(7 - \frac{161}{36} = \frac{91}{36} \approx 2.53\).`, 'Rational(sum(min(a, b) for a in range(1, 7) for b in range(1, 7)), 36)'],
          [T`Two fair dice are rolled. What is the expected absolute difference between them?`, 70 / 36, T`Differences 1 to 5 occur 10, 8, 6, 4, 2 times out of 36: \(\frac{10 + 16 + 18 + 16 + 10}{36} = \frac{70}{36} \approx 1.94\).`, 'Rational(sum(abs(a - b) for a in range(1, 7) for b in range(1, 7)), 36)']][k];
        return { q: Q[0], answer: Q[1], tol: 0.001, hint: 'A decimal to three places, or a fraction.', x: Q[2], v: Q[3] };
      } }
    ],
    [U.market]: [
      { id: 'qk-edge', make(R) {
        const [desc, F, py] = R.pick([['$1 times the sum of two dice', 7, 'Rational(7)'], ['$10 times one die roll', 35, '10*Rational(7, 2)'], ['$10 for each head in 10 coin flips', 50, '10*10*Rational(1, 2)'], ['$36 times the larger of two dice', 161, '36*Rational(161, 36)']]);
        const sp = R.pick([1, 2, 3, 4]), mid = F + R.pick([-3, -2, -1, 1, 2, 3]) * sp / 2, B = mid - sp / 2, A = mid + sp / 2, buy = R.int(0, 1) === 1;
        const val = buy ? F - A : B - F;
        return { q: T`A contract pays ${desc}. The market is ${R.fmt(B)} at ${R.fmt(A)}. If you ${buy ? 'buy one at the ask' : 'sell one at the bid'}, what is your expected profit per contract?`, answer: val,
          x: T`Fair value is ${F}. ${buy ? T`Buying at ${R.fmt(A)}: \(${F} - ${R.fmt(A)} = ${R.fmt(val)}\).` : T`Selling at ${R.fmt(B)}: \(${R.fmt(B)} - ${F} = ${R.fmt(val)}\).`} ${val > 0 ? 'Positive edge: take the trade.' : 'Negative edge: pass.'}`, v: buy ? `${py} - Rational(${A * 2}, 2)` : `Rational(${B * 2}, 2) - ${py}` };
      } },
      { id: 'qk-fair', make(R) {
        const p = R.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.6, 0.75]), W = R.pick([10, 20, 40, 50, 100]), L = R.pick([0, 5, 10, 20]);
        const ev = p * W - (1 - p) * L;
        return { q: T`A bet wins $${W} with probability ${p} and loses $${L} otherwise.${L ? '' : ' (Losing costs nothing.)'} What is its expected value in dollars?`, answer: ev, x: T`\(${p}\times${W} - ${R.fmt(1 - p)}\times${L} = ${R.fmt(ev)}\).`, v: `Rational(${Math.round(p * 100)}, 100)*${W} - Rational(${Math.round((1 - p) * 100)}, 100)*${L}` };
      } }
    ]
  } });

  // ======================= VIDEO QUESTIONS (talk-through, 3 minutes) =======================
  // Each answer was checked numerically. "say" is a model spoken answer.
  window.VIDEO_QS = [
    { q: 'You roll a die and are paid the number shown in dollars. You may reroll once, but then must keep the second roll. What is the game worth, and what is your strategy?', ans: '$4.25', say: ['This is an expected value question with an option, so I will work backward from the last decision.', 'If I reroll, I get a fresh roll worth 3.5 on average.', 'So I keep a first roll above 3.5, which means 4, 5, or 6, and reroll 1, 2, or 3.', 'Value: half the time I keep 4, 5, or 6, averaging 5, which contributes 2.5. The other half I reroll and get 3.5, which contributes 1.75.', 'Total 4.25 dollars.', 'Check: it must beat 3.5, the no-option value, and stay below 6. It does.'] },
    { q: 'What is the probability of getting at least one six in four rolls of a fair die?', ans: '671/1296, about 0.518', say: ['At least one: use the complement.', 'No six on one roll is five sixths; on four independent rolls it is five sixths to the fourth, 625 over 1296.', 'So at least one six is 1 minus that: 671 over 1296, about 0.52.', 'Check: adding one sixth four times would give two thirds, which overcounts; the true value must be below that and above one sixth.'] },
    { q: 'Two dice are rolled. Given that at least one die shows a 3, what is the probability the sum is 7?', ans: '2/11', say: ['Conditional probability, so I will count the restricted outcomes.', 'Outcomes with at least one 3: six with the first die a 3, six with the second, minus the double-counted (3, 3): 11.', 'Of those, sum 7 means (3, 4) or (4, 3): 2.', 'Answer: 2 over 11, about 0.18.', 'Check: unconditionally P(7) is 1/6, about 0.17, so the condition barely changes it, which makes sense since a 3 leaves a 4 needed.'] },
    { q: 'What is the expected value of the larger of two dice?', ans: '161/36, about 4.47', say: ['I will find the distribution of the maximum.', 'The max is at most k when both dice are at most k: k squared over 36.', 'So P(max = k) is k squared minus (k minus 1) squared, over 36, which is 2k minus 1 over 36.', 'Expected value: sum of k times (2k minus 1) over 36: 1 + 6 + 15 + 28 + 45 + 66 = 161, over 36.', 'About 4.47.', 'Check: it is above 3.5, as a maximum should be, and below 6.'] },
    { q: 'What is the expected number of fair coin flips until you see two heads in a row?', ans: '6', say: ['I will set up states and expected values.', 'Let E be the expected flips from scratch, and F the expected flips when the last flip was a head.', 'From scratch: one flip, then half the time I am in state F, half the time back at scratch: E = 1 + F/2 + E/2.', 'From F: one flip, then half the time I am done, half the time back to scratch: F = 1 + E/2.', 'Substitute: E = 1 + (1 + E/2)/2 + E/2, so E = 1.5 + 3E/4, giving E/4 = 1.5 and E = 6.', 'Check: one head takes 2 flips on average, so two in a row should take noticeably more than 4. Six fits.'] },
    { q: 'You draw two cards from a standard deck. What is the probability they are the same color?', ans: '25/51, about 0.49', say: ['Only the second card matters once the first is drawn.', 'After any first card, 51 remain and 25 share its color.', 'So 25 over 51, about 0.49.', 'Check: slightly below one half, because removing the first card makes its color slightly scarcer.'] },
    { q: 'You are offered a game: flip a fair coin; heads you win $10, tails you lose $6. How much would you pay to play, and would you play it 100 times?', ans: 'Worth $2 per play', say: ['Expected value per play: half of 10 minus half of 6, which is 5 minus 3, so 2 dollars.', 'I would pay up to just under 2 dollars per play.', 'Over 100 plays the expected profit is 200 dollars. Each play has a standard deviation of 8, so 100 plays have 80; the profit is positive with high probability.', 'So yes, at a price below 2 dollars I would play many times.'] },
    { q: 'A revolver has six chambers. Two adjacent chambers hold bullets. The cylinder is spun, the trigger is pulled, and it is empty. Before the second pull, would you rather spin again or not?', ans: 'Do not spin: 3/4 versus 2/3 survival', say: ['I will compare the survival probability of each choice.', 'If I spin, 4 of 6 chambers are empty: two thirds.', 'If I do not spin: the empty chamber just fired is one of the 4 empty ones. The next chamber is a bullet only if I was on the empty chamber right before the bullets: 1 of 4. So survival is three quarters.', 'Three quarters beats two thirds, so do not spin.'] },
    { q: 'How many trailing zeros does 100 factorial have?', ans: '24', say: ['Each trailing zero needs a factor of 10, which is 2 times 5. Twos are plentiful, so count fives.', 'Multiples of 5 up to 100: 20. Multiples of 25 contribute a second five: 4 more.', 'Total 24.'] },
    { q: 'What is the expected number of rolls of a fair die to see all six faces at least once?', ans: '14.7', say: ['Split into stages: waiting for the first new face, the second, and so on.', 'When k faces are already seen, each roll is new with probability (6 minus k) over 6, so that stage takes 6 over (6 minus k) rolls on average.', 'Sum: 6 times (1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6).', 'The harmonic sum is 2.45, so 6 times 2.45 is 14.7.', 'Check: at least 6 rolls are needed, and the last face is slow to find, so 14.7 is plausible.'] },
    { q: 'Three fair dice are rolled. What is the probability the numbers are strictly increasing in the order rolled?', ans: '5/54', say: ['Choose which three distinct numbers appear: 6 choose 3, which is 20.', 'Each set of three distinct numbers can appear in exactly one increasing order.', 'Total outcomes: 6 cubed, 216.', 'So 20 over 216, which is 5 over 54, about 0.093.', 'Check: the chance all three differ is 120 over 216, and one of the 6 orders is increasing: 20 over 216. Same answer.'] },
    { q: 'You flip 3 fair coins and I flip 2. What is the probability you get more heads than I do?', ans: '1/2', say: ['Symmetry. Compare your first two coins with my two.', 'Call the chance you are ahead after two coins each p, behind also p by symmetry, and tied t, so 2p + t = 1.', 'Your third coin decides the rest. If you were ahead, you stay ahead. If behind, the best you can do is tie. If tied, you go ahead exactly when the third coin is heads.', 'So the probability is p + t/2, which is (1 - t)/2 + t/2 = 1/2.', 'Answer: one half, with no arithmetic beyond the symmetry.'] },
    { q: 'How many times do the hour and minute hands of a clock overlap in 12 hours?', ans: '11', say: ['The minute hand gains one full lap on the hour hand each time they meet.', 'In 12 hours the minute hand makes 12 laps and the hour hand 1, so the minute hand gains 11 laps.', 'So they meet 11 times, about every 65 and a half minutes.', 'Check: they do not meet between 11 and 1 except at 12, which is why it is 11 and not 12.'] },
    { q: 'You have 25 horses and a track that races 5 at a time with no timer. What is the fewest races needed to find the 3 fastest?', ans: '7', say: ['Race all 25 in five groups of 5: 5 races.', 'Race the five group winners: race 6. Call the winners A, B, C, D, E in finishing order.', 'A is the fastest overall. D and E and their groups are out, as are horses behind third place in A\'s group, second place in B\'s group, and anything behind C.', 'The candidates for second and third are A2, A3, B, B2, and C: five horses, race 7.', 'Its top two are second and third overall. Total 7.'] },
    { q: 'A contract pays the sum of two dice in dollars. Make me a market.', ans: 'Fair value 7; for example 6.75 at 7.25', say: ['Fair value is the expected sum: 3.5 plus 3.5, so 7.', 'There is no hidden information here, so I can quote tight around 7.', 'I will make it 6.75 at 7.25: I buy at 6.75 and sell at 7.25, a quarter of edge on each side.', 'If you think you know something, for example the dice are loaded, I would widen the market, since the person asking may know more than I do.'] },
    { q: 'A family has two children and at least one is a boy. What is the probability both are boys?', ans: '1/3', say: ['List the equally likely families: boy-boy, boy-girl, girl-boy, girl-girl.', 'The condition rules out girl-girl, leaving three.', 'Only one of those is boy-boy, so one third.', 'Note the contrast: if I knew the older child is a boy, it would be one half.'] },
    { q: 'Two numbers are chosen uniformly and independently from 0 to 1. What is the probability their sum is less than 1.5?', ans: '7/8', say: ['Geometric probability on the unit square.', 'The region where x plus y is at least 1.5 is a corner triangle with legs of 0.5.', 'Its area is one half times 0.5 times 0.5, which is one eighth.', 'So the probability the sum is below 1.5 is 7 eighths.'] },
    { q: 'What is the expected number of cards you draw from a shuffled deck until you see the first ace?', ans: '53/5 = 10.6', say: ['The four aces split the 48 other cards into five gaps, each equally large on average: 48 over 5, which is 9.6 cards.', 'The first ace comes after the first gap, so on average it is card 9.6 plus 1, or 10.6.', 'Check: with 4 aces in 52 cards, an ace every 13 cards would suggest about 13 as a loose upper value; 10.6 is a little less, which fits.'] },
    { q: 'Compute 37 times 43 in your head, then explain your method.', ans: '1591', say: ['Both numbers are 3 away from 40.', 'So the product is 40 squared minus 3 squared: 1600 minus 9.', 'That is 1591.', 'Check the last digit: 7 times 3 ends in 1. It does.'] },
    { q: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?', ans: '$0.05', say: ['Let the ball cost b. The bat is b plus 1.', 'Together: 2b plus 1 equals 1.10, so 2b is 0.10 and b is 0.05.', 'Check: ball 5 cents, bat 1.05, total 1.10, and the difference is exactly a dollar.', 'The intuitive 10 cents fails: the bat would be 1.10 and the total 1.20.'] }
  ];

  // ======================= SPRINT DECKS =======================
  const add = (id, title, blurb, gen) => window.DECKS.push({ id, title, subject: 'quant', blurb, items: [], gen });
  add('qmul', 'Multiplication', 'Two-digit products, near-round numbers, squares', R => {
    const k = R.int(0, 2);
    if (k === 0) { const a = R.int(12, 99), b = R.int(3, 9), p = a * b; return { p: `${a}\\times${b}`, a: String(p), d: [p + 10, p - b, p + 2].map(String) }; }
    if (k === 1) { const c = R.pick([20, 30, 40, 50, 60]), d = R.int(1, 5), p = (c - d) * (c + d); return { p: `${c - d}\\times${c + d}`, a: String(p), d: [c * c, p - d, p + 10].map(String) }; }
    const n = R.int(11, 29), p = n * n; return { p: `${n}^2`, a: String(p), d: [p + 10, p - n, p + 2 * n].map(String) };
  });
  add('qfrac', 'Fractions to decimals', 'Eighths, sevenths, ninths, twelfths', R => {
    const [n, d] = R.pick([[1, 8], [3, 8], [5, 8], [7, 8], [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [1, 9], [2, 9], [4, 9], [1, 12], [5, 12], [7, 12], [1, 11], [2, 11], [1, 16], [3, 16], [3, 40]]);
    const f = v => R.fmt(v, 3), a = f(n / d);
    return { p: `\\tfrac{${n}}{${d}}`, a, d: [...new Set([f(n / (d + 1)), f((n + 1) / d), f(n / d + 0.1), f(d / n / 10)])].filter(x => x !== a).slice(0, 3) };
  });
  add('qpct', 'Percents', 'Percent of a number, percent change', R => {
    const p = R.pick([5, 10, 12.5, 15, 20, 25, 30, 40, 75]), N = R.pick([40, 60, 80, 120, 160, 200, 240, 360]), v = p * N / 100;
    return { p: `${p}\\%\\text{ of }${N}`, a: R.fmt(v), d: [R.fmt(v * 2), R.fmt(v + 5), R.fmt(N - v)].filter(x => x !== R.fmt(v)) };
  });
})();

// ======================= 1.6.1: fuller teaching for every question type in this subject =======================
(() => {
  const S = window.SUBJECTS.find(s => s.id === 'quant'), card = t => S.learn.find(c => c.title === t);
  const add = (t, o) => { const c = card(t); if (!c) { window.LESSON_MISSES.push('quant: ' + t); return; }
    if (o.body) c.body = o.body; if (o.more) c.more = (c.more || '') + o.more; if (o.exs) c.exs = (c.exs || []).concat(o.exs); if (o.vary) c.vary = (c.vary || []).concat(o.vary); };
  // 6 x 6 table of two dice, each cell shaded by its value.
  const grid = (f, lo) => `<table class="tt dgrid"><tr><th></th>${[1, 2, 3, 4, 5, 6].map(b => `<th>${b}</th>`).join('')}</tr>${[1, 2, 3, 4, 5, 6].map(a => `<tr><th>${a}</th>${[1, 2, 3, 4, 5, 6].map(b => `<td class="v${f(a, b) - lo}">${f(a, b)}</td>`).join('')}</tr>`).join('')}</table>`;

  add('Expected value and games', {
    body: T`
\[E[X] = \sum x\,P(X = x)\]
<p>Multiply each payoff by its probability and add. When outcomes are equally likely, this is the plain average of the payoffs over all outcomes.</p>

<h4>Linearity: sums need no independence</h4>
<p>\(E[X + Y] = E[X] + E[Y]\) always, even when \(X\) and \(Y\) depend on each other. Expected sum of 10 dice: \(10\times3.5 = 35\). Expected number of sixes in 12 rolls: \(12\times\frac16 = 2\). Expected heads in 10 flips: 5.</p>

<h4>Independence: products need it</h4>
<p>Two random quantities are <b>independent</b> when knowing one tells you nothing about the other: separate dice, separate coins, draws with replacement. For independent \(X\) and \(Y\):</p>
\[E[XY] = E[X]\,E[Y] \qquad P(A \text{ and } B) = P(A)\,P(B)\]
<p>Two separate dice: \(E[XY] = 3.5\times3.5 = 12.25\). The rule fails without independence. A die times itself is \(X\cdot X = X^2\), and</p>
\[E[X^2] = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6} \approx 15.17 \ne 3.5^2\]
<p>The gap, \(\frac{91}{6} - 12.25 = \frac{35}{12}\), is the variance of one die. Variances also add for independent quantities: the sum of two dice has variance \(2\times\frac{35}{12} = \frac{35}{6}\).</p>
<p><b>Testing two events for independence:</b> compute \(P(A \text{ and } B)\) by counting and compare it with \(P(A)P(B)\).</p>
<p><b>Independent:</b> "first die even" and "sum is 7". \(P(A)P(B) = \frac12\cdot\frac16 = \frac1{12}\), and counting gives \(P(A \text{ and } B) = \frac{3}{36} = \frac1{12}\). They match.</p>
<p><b>Dependent:</b> "first die is 6" and "sum is at least 10". \(P(A)P(B) = \frac16\cdot\frac16 = \frac1{36}\), but counting gives \(\frac{3}{36}\). They differ.</p>
<p>A sum of 7 is independent of the first die because every first value leaves exactly one second value that works. A high first die makes a high sum more likely, so those events are dependent.</p>

<h4>Larger, smaller, and difference of two dice</h4>
<p>For anything that depends on both dice, list the 36 outcomes in a grid and average the cells. Count cells by value, multiply, and add.</p>
${grid((a, b) => Math.max(a, b), 1)}
<p class="ctr">The larger of the two dice. Value \(k\) fills an L-shape of \(2k - 1\) cells.</p>
<p><b>Larger:</b> weighted total \(1\cdot1 + 2\cdot3 + 3\cdot5 + 4\cdot7 + 5\cdot9 + 6\cdot11 = 161\), so \(E[\max] = \frac{161}{36} \approx 4.47\).</p>
<p><b>Smaller:</b> the larger plus the smaller is the sum, whose expected value is 7, so \(E[\min] = 7 - \frac{161}{36} = \frac{91}{36} \approx 2.53\). (Directly: \(P(\min \ge k) = \left(\frac{7 - k}{6}\right)^2\).)</p>
${grid((a, b) => Math.abs(a - b), 0)}
<p class="ctr">The absolute difference. Equal values run along diagonals.</p>
<p><b>Absolute difference:</b> the diagonals hold 6 zeros, then 10 ones, 8 twos, 6 threes, 4 fours, and 2 fives (counts fall by 2 for each step away from the main diagonal, after the first). Weighted total: \(0\cdot6 + 1\cdot10 + 2\cdot8 + 3\cdot6 + 4\cdot4 + 5\cdot2 = 70\). So</p>
\[E|X - Y| = \frac{70}{36} = \frac{35}{18} \approx 1.94\]
<p>Note that \(E|X - Y|\) is not \(|E[X] - E[Y]| = 0\): the absolute value must be taken outcome by outcome before averaging.</p>

<h4>Waiting times</h4>
<p>If each try succeeds with probability \(p\), the expected number of tries is \(\frac1p\): 6 rolls to see a specific face, 2 flips to see a head, 3 rolls to see a 5 or 6.</p>
<p><b>Patterns: use states.</b> For two heads in a row, let \(E\) be the expected flips from scratch and \(F\) the expected flips after a head. Then \(E = 1 + \frac12F + \frac12E\) and \(F = 1 + \frac12\cdot0 + \frac12E\). Solving gives \(E = 6\). Heads then tails takes only 4: wait 2 flips for a head, then 2 more for a tail, because a head never sets you back.</p>
<p><b>Stages.</b> To see all six faces, add the waits for each new face: \(\frac66 + \frac65 + \frac64 + \frac63 + \frac62 + \frac61 = 14.7\).</p>

<h4>Options to stop or continue</h4>
<p>Work backward from the last decision. With one reroll on a die with \(d\) faces, the reroll is worth \(\frac{d + 1}{2}\), so keep any first roll above that and reroll the rest. On a six-sided die, keep 4, 5, or 6:</p>
\[E = \tfrac16(4 + 5 + 6) + \tfrac36(3.5) = 2.5 + 1.75 = 4.25\]`,
    exs: [
      { q: T`Two dice are rolled. What is the expected absolute difference between them?`, a: T`
<p>Count the grid's diagonals: difference 0 in 6 cells, 1 in 10, 2 in 8, 3 in 6, 4 in 4, 5 in 2.</p>
<p>Weighted total: \(0 + 10 + 16 + 18 + 16 + 10 = 70\). Divide by 36: \(\frac{70}{36} = \frac{35}{18} \approx 1.94\).</p>
<p>Check: the difference ranges from 0 to 5 and small differences are most common, so a value a bit under 2 is plausible.</p>` },
      { q: T`Compare the expected product of two separate dice with the expected square of one die.`, a: T`
<p>Separate dice are independent: \(E[XY] = 3.5\times3.5 = 12.25\).</p>
<p>One die squared is not a product of independent dice: \(E[X^2] = \frac{91}{6} \approx 15.17\).</p>
<p>The square is larger because the big values get squared together; the difference \(\frac{35}{12}\) is the die's variance.</p>` },
      { q: T`Two dice are rolled. What is the expected value of the smaller number?`, a: T`<p>Larger plus smaller equals the sum, so \(E[\min] = E[\text{sum}] - E[\max] = 7 - \frac{161}{36} = \frac{91}{36} \approx 2.53\).</p>` }
    ],
    vary: [
      [T`Expected product of two separate dice.`, 12.25, T`Independent: \(3.5\times3.5\).`],
      [T`Expected square of one die roll.`, 91 / 6, T`\(\frac{1 + 4 + 9 + 16 + 25 + 36}{6}\): not \(3.5^2\), because \(X\) is not independent of itself.`],
      [T`Expected value of the smaller of two dice.`, 91 / 36, T`\(7 - \frac{161}{36}\).`],
      [T`Expected absolute difference of two dice.`, 35 / 18, T`\(\frac{70}{36}\) from the diagonals.`],
      [T`Two dice: are "first die is even" and "sum is 7" independent?`, ['Yes', 'No'], T`\(\frac3{36} = \frac12\cdot\frac16\).`]
    ]
  });

  add('Probability under time pressure', {
    more: T`
<h4>More patterns</h4>
<p><b>Either order.</b> "One red and one blue" can happen as red then blue or blue then red; add both: \(2\cdot\frac{r}{n}\cdot\frac{b}{n - 1}\).</p>
<p><b>At least one, without replacement.</b> Use the complement and multiply the "none" draws: at least one ace in two cards is \(1 - \frac{48}{52}\cdot\frac{47}{51} = \frac{33}{221}\).</p>
<p><b>Independent events.</b> \(P(A \text{ and } B) = P(A)P(B)\) and \(P(A \text{ or } B) = P(A) + P(B) - P(A)P(B)\). With replacement or separate devices, draws are independent; without replacement, they are not.</p>
<p><b>Two children.</b> Knowing at least one is a boy leaves BB, BG, GB: \(P(\text{BB}) = \frac13\). Knowing the older is a boy leaves BB, BG: \(\frac12\). The wording decides the sample space.</p>
<p><b>Monty Hall.</b> Your first door is right \(\frac13\) of the time. The host, who knows where the prize is, always opens an empty door, so switching wins whenever your first pick was wrong: \(\frac23\).</p>
<p><b>Symmetry.</b> When two players are in identical positions, their chances are equal, which often avoids computation. Three coins against two: compare two coins each (ahead and behind are equally likely); the extra coin breaks ties half the time, giving exactly \(\frac12\).</p>
<p><b>Continuous uniform numbers.</b> Two numbers from 0 to 1 form a point in the unit square, and probability is area. \(P(x + y < 1.5)\) is the square minus the corner triangle with legs 0.5: \(1 - \frac18 = \frac78\).</p>`,
    vary: [[T`P(one red, one blue) drawing 2 from 3 red and 2 blue, without replacement.`, 0.6, T`\(2\cdot\frac35\cdot\frac24\).`], [T`Independent events with \(P(A) = 0.5\), \(P(B) = 0.4\). Find \(P(A \text{ or } B)\).`, 0.7, T`\(0.5 + 0.4 - 0.2\).`]]
  });

  add('Mental math', { more: T`<p><b>Fives and twenty-fives.</b> \(\times5 = \times10\div2\) and \(\times25 = \times100\div4\): \(25\times48 = 4800\div4 = 1200\).</p>`, vary: [[T`\(25 \times 36\)`, 900, T`\(3600\div4\).`]] });
  add('Fractions, decimals, percents', { more: T`<p><b>Other denominators.</b> Scale to 100 or 1000: \(\tfrac{7}{20} = \tfrac{35}{100} = 0.35\), \(\tfrac{3}{25} = \tfrac{12}{100} = 0.12\), \(\tfrac{9}{40} = \tfrac{225}{1000} = 0.225\). Sixteenths are half of eighths: \(\tfrac3{16} = \tfrac12\cdot0.375 = 0.1875\).</p>`, vary: [[T`Write \(\tfrac{7}{20}\) as a decimal.`, 0.35, T`\(\tfrac{35}{100}\).`]] });
  add('Word problems at speed', { more: T`<p><b>Translate, do not guess.</b> "The bat costs $1.00 more than the ball" becomes bat \(= b + 1\). With the total: \(2b + 1 = 1.10\), so the ball is $0.05, not the tempting $0.10.</p><p><b>Doubling backward.</b> Anything that doubles daily was half its final size one day earlier: a patch that covers a lake on day 48 covered half on day 47.</p>`, vary: [[T`A pen and a cap cost $1.20; the pen costs $1.00 more than the cap. Cap price, in dollars?`, 0.1, T`\(2c + 1 = 1.20\).`]] });
  add('Logic and ordering', { more: T`
<p><b>"Some A are not B"</b> means at least one A lies outside circle B. It is <b>true</b> when the statements force it: from "No A are B" with A nonempty, some A are not B. It is <b>false</b> when the statements put every A inside B: from "All A are B", "some A are not B" is false.</p>
<p><b>"No A are B"</b> means the circles do not touch. From "All A are B" and "No B are C", A sits inside B, which is apart from C, so "No A are C" is true and "Some A are C" is false.</p>`,
    vary: [[T`All A are B. All B are C. Some A are not C?`, ['False', 'True', 'Cannot tell'], T`Every A is inside C.`]] });
  add('Answering on camera', { more: T`
<h4>Brainteaser patterns</h4>
<p><b>Relative speed.</b> Clock hands meet when the minute hand gains a full lap on the hour hand: 11 laps gained in 12 hours, so 11 meetings.</p>
<p><b>Elimination tournaments.</b> Track which candidates can still finish in the top places and race only those; 25 horses, 5 per race, top 3 takes 7 races.</p>
<p><b>Counting factors.</b> Trailing zeros of \(n!\) count factors of 5 (twos are plentiful): \(\lfloor\frac{100}{5}\rfloor + \lfloor\frac{100}{25}\rfloor = 24\).</p>
<p><b>Gaps.</b> Four aces split 48 other cards into 5 gaps of average size 9.6, so the first ace is on average card 10.6.</p>` });

  // Practice for independence, checked by exact counting.
  const EV_A = [['the first die is even', (a, b) => a % 2 === 0, 'a % 2 == 0'], ['the first die is a 6', (a, b) => a === 6, 'a == 6'], ['the first die is at most 2', (a, b) => a <= 2, 'a <= 2']];
  const EV_B = [['the sum is 7', (a, b) => a + b === 7, 'a + b == 7'], ['the sum is at least 10', (a, b) => a + b >= 10, 'a + b >= 10'], ['the second die is odd', (a, b) => b % 2 === 1, 'b % 2 == 1'], ['the dice match', (a, b) => a === b, 'a == b'], ['the sum is even', (a, b) => (a + b) % 2 === 0, '(a + b) % 2 == 0']];
  registerUnitGens('quant', { units: { 'Expected value and games': [
    { id: 'qe-indep', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const d1 = R.pick([4, 6, 8, 10, 12]), d2 = R.pick([4, 6, 8, 10, 12, 20]), v = (d1 + 1) / 2 * (d2 + 1) / 2;
        return { q: T`A fair ${d1}-sided die and a separate fair ${d2}-sided die are rolled. What is the expected product of the two numbers?`, answer: v, tol: 0.001,
          x: T`Separate dice are independent, so \(E[XY] = E[X]E[Y] = ${R.fmt((d1 + 1) / 2)}\times${R.fmt((d2 + 1) / 2)} = ${R.fmt(v, 4)}\).`, v: `Rational(${d1 + 1}, 2)*Rational(${d2 + 1}, 2)` }; }
      if (k === 1) { const d = R.pick([4, 6, 8, 10]), v = (d + 1) * (2 * d + 1) / 6;
        return { q: T`A fair ${d}-sided die is rolled once and you are paid the square of the number. What is the expected payoff?`, answer: v, tol: 0.001, hint: 'A decimal to three places, or a fraction.',
          x: T`Average the squares: \(\frac{1^2 + \cdots + ${d}^2}{${d}} = \frac{${d * (d + 1) * (2 * d + 1) / 6}}{${d}} \approx ${R.fmt(v, 3)}\). Not \(${R.fmt((d + 1) / 2)}^2\): one roll is not independent of itself.`, v: `Rational(sum(x*x for x in range(1, ${d + 1})), ${d})` }; }
      const [an, af, ap] = R.pick(EV_A), [bn, bf, bp] = R.pick(EV_B); let nA = 0, nB = 0, nAB = 0;
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) { const x = af(a, b), y = bf(a, b); nA += x; nB += y; nAB += x && y; }
      const ind = nAB * 36 === nA * nB, ans = ind ? 'Independent' : 'Not independent';
      return { q: T`Two fair dice are rolled. Are the events "${an}" and "${bn}" independent?`, c: [ans, ind ? 'Not independent' : 'Independent', 'Cannot tell without more information'],
        x: T`\(P(A) = \frac{${nA}}{36}\), \(P(B) = \frac{${nB}}{36}\), so \(P(A)P(B) = \frac{${nA * nB / 36}}{36}\). By counting, \(P(A \text{ and } B) = \frac{${nAB}}{36}\). ${ind ? 'They match: independent.' : 'They differ: not independent.'}`,
        key: ans, vk: `'Independent' if 36*sum(1 for a in range(1, 7) for b in range(1, 7) if (${ap}) and (${bp})) == sum(1 for a in range(1, 7) for b in range(1, 7) if ${ap})*sum(1 for a in range(1, 7) for b in range(1, 7) if ${bp}) else 'Not independent'` };
    } }
  ] } });
})();
