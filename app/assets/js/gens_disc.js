'use strict';
// Discrete math, logic units: classification, falsifying rows, argument validity, equivalences, negation,
// converse/inverse/contrapositive. Formulas come from templates with random substitutions (js/logic.js),
// and every answer is recomputed from truth tables, so a substitution can never make a key wrong.
(() => {
  const L = window.Logic, P = L.parse;
  const LET = ['p', 'q', 'r'];
  const list = xs => (xs.length === 1 ? xs[0] : xs.length === 2 ? `${xs[0]} and ${xs[1]}` : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
  const quote = s => `“${s}”`;
  // Letters in order for English mode, so "if X then Y" reads as the scenario intends.
  const inOrder = src => { const t = P(src), map = {}; ['X', 'Y', 'Z'].forEach((s, i) => { map[s] = L.V(LET[i]); }); return L.fill(t, map); };
  const key = (scene, vs) => vs.map(v => T`\(${v}\) = ${quote(scene[LET.indexOf(v)][0])}`).join(', ');
  // Python check that the first formula is equivalent to the target and no other choice is.
  const uniqueEquiv = (target, good, bads, vs) => `str(equivn(${L.lambda(target, vs)}, ${L.lambda(good, vs)}, ${vs.length}) and not any(equivn(${L.lambda(target, vs)}, d, ${vs.length}) for d in [${bads.map(b => L.lambda(b, vs)).join(', ')}]))`;
  // Up to n distractors: listed mistakes first, then one-edit mutations, none equivalent to the target.
  function distractors(R, target, correct, listed, n = 3, maxW = 24) {
    const out = [], seen = new Set([L.tex(correct)]);
    const add = f => { const k = L.tex(f); if (out.length < n && !seen.has(k) && !L.equivalent(f, target) && L.width(f) <= maxW) { seen.add(k); out.push(f); } };
    R.shuffle(listed).forEach(add);
    R.shuffle(L.mutations(correct)).forEach(add);
    return out;
  }

  // ---------------- Classification templates ----------------
  const TAUT = [
    ['X|~X', 'This is the law of the excluded middle.'], ['X>X', 'Every statement implies itself.'], ['(X&Y)>X', 'This is simplification: from "both", conclude either one.'],
    ['X>(X|Y)', 'This is addition: a true statement makes any "or" containing it true.'], ['((X>Y)&X)>Y', 'This is modus ponens.'], ['((X>Y)&~Y)>~X', 'This is modus tollens.'],
    ['((X|Y)&~X)>Y', 'This is disjunctive syllogism.'], ['((X>Y)&(Y>Z))>(X>Z)', 'This is hypothetical syllogism: implications chain.'], ['(X>Y)=(~Y>~X)', 'An implication is equivalent to its contrapositive.'],
    ['~(X&Y)=(~X|~Y)', "This is De Morgan's law."], ['~(X|Y)=(~X&~Y)', "This is De Morgan's law."], ['(X>Y)=(~X|Y)', 'An implication says the same as "not the hypothesis, or the conclusion".'],
    ['X>(Y>X)', 'If the conclusion is true, the implication holds whatever the hypothesis.'], ['(X&~X)>Y', 'A false hypothesis makes the implication true.'], ['(X>Y)|(Y>X)', 'If one implication fails, its consequent is false, which makes the other one true.'],
    ['~~X=X', 'Two negations cancel.'], ['(X|(X&Y))=X', 'This is absorption: the extra "and" piece never changes the value.'], ['~(X&~X)', 'A statement and its negation are never both true.']
  ];
  const CONTRA = [
    ['X&~X', 'A statement and its negation are never both true.'], ['~(X|~X)', 'It negates the excluded middle, which is always true.'], ['(X>Y)&(X&~Y)', 'The second part is exactly the case where the first fails.'],
    ['~(X>(X|Y))', 'It negates a tautology.'], ['(X|Y)&(~X&~Y)', 'The second part says both are false, so the "or" cannot hold.'], ['(X=Y)&(X=~Y)', 'No statement can match both another statement and its negation.'],
    ['~((X&Y)>X)', 'It negates a tautology.'], ['(X&Y)&~X', 'It needs one part to be both true and false.'], ['~(X=X)', 'Every statement has the same value as itself.'], ['X=~X', 'No statement has the same value as its negation.']
  ];
  const CONT = [
    ['((X>Y)&Y)>X', 'This is the pattern of affirming the consequent, which is not valid.'], ['((X>Y)&~X)>~Y', 'This is the pattern of denying the antecedent, which is not valid.'],
    ['(X>Y)>(Y>X)', 'An implication does not imply its converse.'], ['(X|Y)>X', ''], ['X>(X&Y)', ''], ['(X>Y)=(Y>X)', 'An implication and its converse can differ.'],
    ['~(X&Y)=(~X&~Y)', 'This is a misstated De Morgan law.'], ['(X>Y)=(~X>~Y)', 'An implication and its inverse can differ.'], ['((X|Y)&X)>~Y', 'Logical "or" is inclusive, so knowing one part is true says nothing about the other.'],
    ['X>~X', ''], ['(X>Y)&(Y>X)', ''], ['(X|Y)&~(X&Y)', ''], ['X>(Y&Z)', ''], ['(X|Y)>Z', ''], ['(X>Y)>Z', '']
  ];
  const POOL = { tautology: TAUT, contradiction: CONTRA, contingency: CONT };
  const KINDS = ['tautology', 'contradiction', 'contingency'];
  const contingent = R => (R.int(0, 1) ? L.instance(R, R.pick(CONT)[0]).f : L.random(R, R.pick([['p', 'q'], ['p', 'q', 'r']]), R.int(2, 3)));

  // ---------------- Arguments ----------------
  const VALID = [
    [['X>Y', 'X'], 'Y', 'modus ponens'], [['X>Y', '~Y'], '~X', 'modus tollens'], [['X>Y', 'Y>Z'], 'X>Z', 'hypothetical syllogism'],
    [['X|Y', '~X'], 'Y', 'disjunctive syllogism'], [['X&Y'], 'X', 'simplification'], [['X', 'Y'], 'X&Y', 'conjunction'],
    [['X|Y', 'X>Z', 'Y>Z'], 'Z', 'proof by cases'], [['X>Y'], '~Y>~X', 'the contrapositive'], [['X>Y', 'X>Z'], 'X>(Y&Z)', 'combining two conclusions'],
    [['X>Y', '~Y'], '~X', 'modus tollens'], [['X', 'X>Y', 'Y>Z'], 'Z', 'two steps of modus ponens']
  ];
  const INVALID = [
    [['X>Y', 'Y'], 'X', 'affirming the consequent'], [['X>Y', '~X'], '~Y', 'denying the antecedent'], [['X>Y'], 'Y>X', 'confusing an implication with its converse'],
    [['X>Y'], '~X>~Y', 'confusing an implication with its inverse'], [['X|Y', 'X'], '~Y', 'treating "or" as exclusive'], [['X>Y', 'X>Z'], 'Y>Z', ''],
    [['X>Z', 'Y>Z'], 'X>Y', ''], [['X>Y', 'Y>Z'], 'Z>X', ''], [['X|Y', 'X>Z'], 'Z', ''], [['X>Y', 'Y>Z', 'Z'], 'X', 'affirming the consequent']
  ];
  const conj = fs => fs.reduce((a, b) => L.bin('and', a, b));

  // ---------------- Equivalence laws ----------------
  const LAWS = [
    ['X>Y', '~X|Y', 'an implication written with "or"', ['X|~Y', '~X&Y', 'Y>X', 'X&~Y']],
    ['X>Y', '~Y>~X', 'the contrapositive', ['Y>X', '~X>~Y', '~Y>X']],
    ['~(X&Y)', '~X|~Y', "De Morgan's law", ['~X&~Y', 'X|Y', '~X&Y']],
    ['~(X|Y)', '~X&~Y', "De Morgan's law", ['~X|~Y', 'X&Y', '~X|Y']],
    ['~(X>Y)', 'X&~Y', 'the negation of an implication', ['~X>~Y', '~X&Y', 'X>~Y', '~X&~Y']],
    ['X&(Y|Z)', '(X&Y)|(X&Z)', 'the distributive law', ['(X&Y)|Z', '(X|Y)&(X|Z)', '(X&Y)&Z']],
    ['X|(Y&Z)', '(X|Y)&(X|Z)', 'the distributive law', ['(X|Y)&Z', '(X&Y)|(X&Z)', 'X|(Y|Z)']],
    ['X=Y', '(X>Y)&(Y>X)', 'a biconditional as two implications', ['(X>Y)|(Y>X)', 'X&Y', 'X>Y']],
    ['~~X', 'X', 'double negation', ['~X']]
  ];
  const NEGS = ['X>Y', 'X&Y', 'X|Y', 'X&~Y', '~X|Y', 'X>~Y', 'X>(Y|Z)', 'X>(Y&Z)', '(X&Y)>Z', 'X&(Y|Z)', 'X|(Y&Z)', '(X|Y)>Z', '~X&Y'];
  // Mistakes people make when negating: negate the parts but keep the connective, or swap the connective only.
  const negLeaves = n => (n.op === 'var' ? L.not(n) : n.op === 'not' ? n.a : L.bin(n.op, negLeaves(n.a), negLeaves(n.b)));
  const swapOnly = n => (n.op === 'var' || n.op === 'not' ? n : L.bin({ and: 'or', or: 'and', imp: 'and', iff: 'iff' }[n.op], swapOnly(n.a), swapOnly(n.b)));
  const neg1 = n => (n.op === 'not' ? n.a : L.not(n));

  registerUnitGens('discrete', {
    units: {
      'Tautologies and contradictions': [
        { id: 'du-taut', make(R) {
          const want = R.pick(KINDS); let f, note = '';
          if (want === 'contingency' && R.int(0, 2) === 0) f = contingent(R);
          else { const [src, nt] = R.pick(POOL[want]); f = L.instance(R, src).f; note = nt; }
          const k = L.classify(f); if (k !== want) note = '';
          return { q: T`Classify \(${L.tex(f)}\).`, c: [k, ...KINDS.filter(z => z !== k)],
            x: T`<p>Name the pieces: ${L.defs(f)}. Fill in every row.</p>${L.table(f)}<p>Column \(S\) is ${k === 'tautology' ? 'all T' : k === 'contradiction' ? 'all F' : 'a mix of T and F'}, so it is a ${k}.${note ? ' ' + note : ''}</p>`,
            key: k, vk: `cls(${L.lambda(f)}, ${L.varsOf(f).length})` }; } },
        { id: 'du-falsify', make(R) {
          for (;;) {
            const f = contingent(R), vs = L.varsOf(f), rows = L.rowsOver(vs), F = rows.filter(r => !L.ev(f, r)), Tr = rows.filter(r => L.ev(f, r));
            if (!F.length || Tr.length < 3) continue;
            const bad = R.pick(F), good = R.sample(Tr, 3), lam = L.lambda(f, vs);
            return { q: T`Which assignment makes \(${L.tex(f)}\) false?`, c: [bad, ...good].map(r => L.rowText(vs, r)),
              x: T`<p>Substitute each choice and work inside out: ${L.defs(f)}. For ${L.rowText(vs, bad)}:</p>${L.steps(f, bad)}<p>One false row is a counterexample, so the formula is not a tautology. Each other choice makes it true.</p>`,
              key: 'True', vk: `str((not ${lam}(*${L.rowTuple(vs, bad)})) and all(${lam}(*t) for t in [${good.map(r => L.rowTuple(vs, r)).join(', ')}]))` };
          } } },
        { id: 'du-valid', make(R) {
          const ok = R.int(0, 1) === 1, [ps, cs, name] = R.pick(ok ? VALID : INVALID);
          const scene = R.pick(L.SCENES), eng = R.int(0, 1) === 1;
          let prem, concl;
          if (eng) { prem = ps.map(inOrder); concl = inOrder(cs); }
          else { const all = L.instance(R, '(' + ps.concat([cs]).join(')&(') + ')', { letters: true, maxCols: 99, maxW: 99 }).map; prem = ps.map(s => L.fill(P(s), all)); concl = L.fill(P(cs), all); }
          const words = eng ? prem.concat([concl]).map(f => L.english(f, scene)) : [];
          const english = eng && words.every(Boolean);
          const vs = L.varsOf(...prem, concl), whole = L.bin('imp', conj(prem), concl), valid = L.classify(whole) === 'tautology', kk = valid ? 'Valid' : 'Invalid';
          const all = r => prem.every(f => L.ev(f, r)), rows = L.rowsOver(vs), cex = rows.find(r => all(r) && !L.ev(concl, r));
          const labels = prem.map((_, i) => T`\(P_${i + 1}\)`).concat([T`\(C\)`]);
          const named = prem.concat([concl]).map((f, i) => [labels[i], f]);
          const q = english ? T`Premises: ${words.slice(0, -1).map(quote).join(' ')} Conclusion: ${quote(words[words.length - 1])} Is the argument valid?`
            : T`Premises: ${prem.map(f => T`\(${L.tex(f)}\)`).join(', ')}. Conclusion: \(${L.tex(concl)}\). Is the argument valid?`;
          const intro = (english ? T`<p>Write ${key(scene, vs)}.</p>` : '') + T`<p>${named.map(([h, f]) => `${h} \\(= ${L.tex(f)}\\)`).join(', ')}. An argument is valid when no row makes every premise T and the conclusion F. Rows with every premise T are in bold.</p>`;
          const tail = valid ? T`<p>In each bold row the conclusion is T, so the argument is valid${name ? `: this is ${name}` : ''}.</p>`
            : T`<p>In the row ${L.rowText(vs, cex)}, every premise is T and the conclusion is F. That row is a counterexample, so the argument is invalid${name && !ok ? ` (${name})` : ''}.</p>`;
          return { q, c: [kk, valid ? 'Invalid' : 'Valid'], x: intro + L.multiTable(vs, named, all) + tail,
            key: kk, vk: `'Valid' if cls(${L.lambda(whole, vs)}, ${vs.length}) == 'tautology' else 'Invalid'` }; } }
      ],
      'Equivalences and negation': [
        { id: 'du-equiv', make(R) {
          for (;;) {
            const [ls, rs, name, wrong] = R.pick(LAWS), flip = ls !== '~~X' && R.int(0, 4) < 2;
            const { f: left, map } = L.instance(R, ls, { maxW: 18 }), right = L.fill(P(rs), map);
            const given = flip ? right : left, correct = flip ? left : right;
            if (!L.fits(given, 8, 20) || !L.fits(correct, 8, 24)) continue;
            const listed = flip ? [] : wrong.map(w => L.fill(P(w), map)), bads = distractors(R, given, correct, listed);
            if (bads.length < 3) continue;
            const vs = L.varsOf(given, correct, ...bads), slots = Object.entries(map).map(([s, f]) => T`\(${s} = ${L.tex(f)}\)`);
            return { q: T`Which formula is logically equivalent to \(${L.tex(given)}\)?`, c: [correct, ...bads].map(f => T`\(${L.tex(f)}\)`),
              x: T`<p>This is ${name}: \(${L.tex(P(ls))} \equiv ${L.tex(P(rs))}\), with ${list(slots)}.</p><p>Check with a table: the two columns agree in every row, which is what equivalent means.</p>${L.multiTable(L.varsOf(given, correct), [['given', given], ['answer', correct]])}<p>Each other choice differs from the given formula in at least one row.</p>`,
              key: 'True', vk: uniqueEquiv(given, correct, bads, vs) };
          } } },
        { id: 'du-negate', make(R) {
          for (;;) {
            const src = R.pick(NEGS), scene = R.pick(L.SCENES), eng = R.int(0, 2) > 0;
            const g = eng ? inOrder(src) : L.instance(R, src, { maxW: 18 }).f, target = L.not(g), correct = L.negate(g);
            const listed = [negLeaves(g), swapOnly(g), g.op === 'imp' ? L.bin('imp', neg1(g.a), neg1(g.b)) : L.bin(g.op === 'and' ? 'and' : 'or', neg1(g.a), neg1(g.b)), g];
            const bads = distractors(R, target, correct, listed);
            if (bads.length < 3 || !L.fits(correct, 9, 26)) continue;
            const vs = L.varsOf(g, correct, ...bads), words = [g, correct, ...bads].map(f => L.english(f, scene)), english = eng && words.every(Boolean);
            const how = T`<p>Push the negation inward: \(\neg(A\land B) \equiv \neg A\lor\neg B\), \(\neg(A\lor B) \equiv \neg A\land\neg B\), \(\neg(A\to B) \equiv A\land\neg B\), and \(\neg\neg A \equiv A\). Here \(\neg(${L.tex(g)}) \equiv ${L.tex(correct)}\).</p>`;
            const check = T`<p>Check: the answer is T in exactly the rows where the original is F.</p>${L.multiTable(L.varsOf(g), [['original', g], ['answer', correct]])}`;
            if (english) return { q: T`Which statement is the negation of this one? ${quote(words[0])}`, c: words.slice(1), x: T`<p>Write ${key(scene, L.varsOf(g, correct, ...bads))}.</p>` + how + check, key: 'True', vk: uniqueEquiv(target, correct, bads, vs) };
            return { q: T`Which formula is the negation of \(${L.tex(g)}\)?`, c: [correct, ...bads].map(f => T`\(${L.tex(f)}\)`), x: how + check, key: 'True', vk: uniqueEquiv(target, correct, bads, vs) };
          } } },
        { id: 'du-cic', make(R) {
          for (;;) {
            const [as, bs] = R.pick([['X', 'Y'], ['X', 'Y'], ['~X', 'Y'], ['X', '~Y'], ['~X', '~Y'], ['X&Y', 'Z'], ['X', 'Y|Z'], ['X|Y', 'Z'], ['X', 'Y&Z']]);
            const scene = R.pick(L.SCENES), eng = R.int(0, 1) === 1;
            let A, B;
            if (eng) { A = inOrder(as); B = inOrder(bs); }
            else { const m = L.instance(R, `(${as})>(${bs})`, { letters: true }).map; A = L.fill(P(as), m); B = L.fill(P(bs), m); }
            const orig = L.bin('imp', A, B), forms = { converse: L.bin('imp', B, A), inverse: L.bin('imp', neg1(A), neg1(B)), contrapositive: L.bin('imp', neg1(B), neg1(A)), negation: L.bin('and', A, neg1(B)), original: orig };
            const kind = R.pick(['converse', 'inverse', 'contrapositive']), target = kind === 'contrapositive' ? orig : forms.converse;
            const others = (kind === 'contrapositive' ? ['converse', 'inverse', 'negation'] : ['contrapositive', 'negation', 'original']).map(k => forms[k]);
            if (L.equivalent(orig, forms.converse) || others.some(f => L.equivalent(f, target))) continue;
            const vs = L.varsOf(orig), words = [orig, forms[kind], ...others].map(f => L.english(f, scene)), english = eng && words.every(Boolean);
            const why = T`<p>For \(A \to B\): the converse is \(B \to A\), the inverse is \(\neg A \to \neg B\), and the contrapositive is \(\neg B \to \neg A\). Here \(A = ${L.tex(A)}\) and \(B = ${L.tex(B)}\), so the ${kind} is \(${L.tex(forms[kind])}\).</p><p>Only the contrapositive is equivalent to the original. The converse and the inverse are equivalent to each other.</p>`;
            const vk = uniqueEquiv(target, forms[kind], others, vs);
            if (english) return { q: T`What is the ${kind} of this statement? ${quote(words[0])}`, c: words.slice(1), x: T`<p>Write ${key(scene, vs)}.</p>` + why, key: 'True', vk };
            return { q: T`What is the ${kind} of \(${L.tex(orig)}\)?`, c: [forms[kind], ...others].map(f => T`\(${L.tex(f)}\)`), x: why, key: 'True', vk };
          } } }
      ]
    }
  });
})();
