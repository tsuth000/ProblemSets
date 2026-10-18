(() => {
  // Exact unit-circle values for the special angles.
  const EXACT = [[0, '0'], [0.5, '\\tfrac12'], [Math.SQRT2 / 2, '\\tfrac{\\sqrt2}{2}'], [Math.sqrt(3) / 2, '\\tfrac{\\sqrt3}{2}'], [1, '1'], [Math.sqrt(3), '\\sqrt3'], [Math.sqrt(3) / 3, '\\tfrac{\\sqrt3}{3}']];
  const exact = v => {
    if (!Number.isFinite(v) || Math.abs(v) > 1e6) return null;
    for (const [n, tex] of EXACT) if (Math.abs(Math.abs(v) - n) < 1e-9) return (v < 0 && n !== 0 ? '-' : '') + tex;
    return null;
  };
  const ANGLES = [[0, 1], [1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6], [1, 1], [7, 6], [5, 4], [4, 3], [3, 2], [5, 3], [7, 4], [11, 6]];
  const angTex = (n, d) => n === 0 ? '0' : d === 1 ? (n === 1 ? '\\pi' : `${n}\\pi`) : `\\frac{${n === 1 ? '' : n}\\pi}{${d}}`;
  window.TRIG_EXACT = { exact, angTex };

  registerSubject({
    id: 'trig', name: 'Trigonometry', color: '#B9781C',
    blurb: 'Unit circle, right triangles, identities, graphs, inverse functions',
    questions: [
      { id: 't1', skill: 'Unit circle', q: T`Evaluate \(\sin\frac{\pi}{6}\).`, c: [T`\(\tfrac12\)`, T`\(\tfrac{\sqrt3}{2}\)`, T`\(\tfrac{\sqrt2}{2}\)`, '1'],
        x: T`\(\frac\pi6 = 30^\circ\). In a 30-60-90 triangle with hypotenuse 1, the side opposite \(30^\circ\) is \(\frac12\).` },
      { id: 't2', skill: 'Unit circle', q: T`Evaluate \(\cos\frac{3\pi}{4}\).`, c: [T`\(-\tfrac{\sqrt2}{2}\)`, T`\(\tfrac{\sqrt2}{2}\)`, T`\(-\tfrac12\)`, T`\(-\tfrac{\sqrt3}{2}\)`],
        x: T`Reference angle \(\frac\pi4\) in quadrant II, where cosine is negative.` },
      { id: 't3', skill: 'Unit circle', q: T`Evaluate \(\tan\frac{\pi}{3}\).`, c: [T`\(\sqrt3\)`, T`\(\tfrac{\sqrt3}{3}\)`, '1', T`\(\tfrac{\sqrt3}{2}\)`],
        x: T`\(\tan = \frac{\sin}{\cos} = \frac{\sqrt3/2}{1/2} = \sqrt3\).` },
      { id: 't4', skill: 'Unit circle', q: T`Evaluate \(\sin\frac{7\pi}{6}\).`, c: [T`\(-\tfrac12\)`, T`\(\tfrac12\)`, T`\(-\tfrac{\sqrt3}{2}\)`, T`\(\tfrac{\sqrt3}{2}\)`],
        x: T`Reference angle \(\frac\pi6\) in quadrant III, where sine is negative.` },
      { id: 't5', skill: 'Unit circle', q: T`In which quadrant is \(\sin\theta < 0\) and \(\cos\theta > 0\)?`, c: ['IV', 'II', 'III', 'I'],
        x: T`Cosine is the \(x\)-coordinate and sine the \(y\)-coordinate: \(x > 0\), \(y < 0\) is quadrant IV.` },
      { id: 't6', skill: 'Unit circle', q: T`Evaluate \(\sec\frac{\pi}{3}\).`, c: ['2', T`\(\tfrac12\)`, T`\(\tfrac{2}{\sqrt3}\)`, T`\(\sqrt3\)`],
        x: T`\(\sec = \frac{1}{\cos}\), and \(\cos\frac\pi3 = \frac12\).` },
      { id: 't7', skill: 'Radians', q: T`Convert \(150^\circ\) to radians.`, c: [T`\(\frac{5\pi}{6}\)`, T`\(\frac{3\pi}{4}\)`, T`\(\frac{2\pi}{3}\)`, T`\(\frac{5\pi}{3}\)`],
        x: T`Multiply by \(\frac{\pi}{180}\): \(\frac{150\pi}{180} = \frac{5\pi}{6}\).` },
      { id: 't8', skill: 'Radians', q: T`What arc length does a central angle of \(\frac\pi2\) cut on a circle of radius 4?`, c: [T`\(2\pi\)`, T`\(4\pi\)`, T`\(\pi\)`, T`\(8\pi\)`],
        x: T`\(s = r\theta = 4 \cdot \frac\pi2\). The formula needs \(\theta\) in radians.` },
      { id: 't9', skill: 'Right triangles', q: T`A right triangle has opposite side 3 and hypotenuse 5. What is \(\cos\theta\)?`, c: [T`\(\tfrac45\)`, T`\(\tfrac35\)`, T`\(\tfrac34\)`, T`\(\tfrac43\)`],
        x: T`The adjacent side is \(\sqrt{25 - 9} = 4\), so \(\cos\theta = \frac{\text{adj}}{\text{hyp}} = \frac45\).` },
      { id: 't10', skill: 'Right triangles', q: T`A 30-60-90 triangle has hypotenuse 10. How long is the shortest side?`, c: ['5', T`\(5\sqrt3\)`, T`\(10\sqrt3\)`, T`\(\tfrac{10}{\sqrt3}\)`],
        x: T`The sides are in ratio \(1 : \sqrt3 : 2\). The short leg is half the hypotenuse.` },
      { id: 't11', skill: 'Right triangles', q: T`If \(\theta\) is acute and \(\tan\theta = \tfrac34\), what is \(\sin\theta\)?`, c: [T`\(\tfrac35\)`, T`\(\tfrac45\)`, T`\(\tfrac34\)`, T`\(\tfrac37\)`],
        x: T`Opposite 3, adjacent 4, hypotenuse 5.` },
      { id: 't12', skill: 'Identities', q: T`\(1 + \tan^2 x\) equals:`, c: [T`\(\sec^2 x\)`, T`\(\csc^2 x\)`, T`\(\cot^2 x\)`, '1'],
        x: T`Divide \(\sin^2 x + \cos^2 x = 1\) by \(\cos^2 x\).` },
      { id: 't13', skill: 'Identities', q: T`\(\sin 2x\) equals:`, c: [T`\(2\sin x\cos x\)`, T`\(2\sin x\)`, T`\(\sin^2 x - \cos^2 x\)`, T`\(\sin x\cos x\)`],
        x: T`From the sum formula with both angles equal to \(x\).` },
      { id: 't14', skill: 'Identities', q: T`Which is a correct formula for \(\cos 2x\)?`, c: [T`\(\cos^2 x - \sin^2 x\)`, T`\(2\cos x\)`, T`\(\cos^2 x + \sin^2 x\)`, T`\(1 - 2\cos^2 x\)`],
        x: T`The three forms are \(\cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x\).` },
      { id: 't15', skill: 'Identities', q: T`Which function is even?`, c: [T`\(\cos x\)`, T`\(\sin x\)`, T`\(\tan x\)`, T`\(\csc x\)`],
        x: T`\(\cos(-x) = \cos x\). Sine, tangent, and their reciprocals are odd.` },
      { id: 't16', skill: 'Identities', q: T`\(\sin(a + b)\) equals:`, c: [T`\(\sin a\cos b + \cos a\sin b\)`, T`\(\sin a + \sin b\)`, T`\(\sin a\sin b + \cos a\cos b\)`, T`\(\sin a\cos b - \cos a\sin b\)`],
        x: T`The last option is \(\sin(a - b)\). Sine is not additive.` },
      { id: 't17', skill: 'Graphs', q: T`What is the period of \(y = \sin 3x\)?`, c: [T`\(\frac{2\pi}{3}\)`, T`\(6\pi\)`, '3', T`\(\frac{\pi}{3}\)`],
        x: T`Period \(= \frac{2\pi}{|B|}\). Multiplying the input by 3 compresses the graph.` },
      { id: 't18', skill: 'Graphs', q: T`What is the amplitude of \(y = -4\cos 2x + 1\)?`, c: ['4', '-4', '5', '2'],
        x: T`Amplitude is \(|A|\). The minus sign reflects the graph; the \(+1\) shifts the midline.` },
      { id: 't19', skill: 'Graphs', q: T`What is the period of \(y = \tan x\)?`, c: [T`\(\pi\)`, T`\(2\pi\)`, T`\(\frac\pi2\)`, 'It has none'],
        x: T`\(\tan(x + \pi) = \tan x\). Sine and cosine have period \(2\pi\).` },
      { id: 't20', skill: 'Inverse trig', q: T`Evaluate \(\arcsin\frac12\).`, c: [T`\(\frac\pi6\)`, T`\(\frac{5\pi}{6}\)`, T`\(-\frac\pi6\)`, T`\(\frac\pi3\)`],
        x: T`\(\sin\frac{5\pi}{6}\) is also \(\frac12\), but arcsine returns values only in \([-\frac\pi2, \frac\pi2]\).` },
      { id: 't21', skill: 'Inverse trig', q: T`Evaluate \(\arccos(-1)\).`, c: [T`\(\pi\)`, T`\(-\frac\pi2\)`, '0', T`\(2\pi\)`],
        x: T`Arccosine returns values in \([0, \pi]\); \(\cos\pi = -1\).` },
      { id: 't22', skill: 'Inverse trig', q: T`What is the range of \(\arctan x\)?`, c: [T`\(\left(-\frac\pi2, \frac\pi2\right)\)`, T`\([0, \pi]\)`, T`\(\left[-\frac\pi2, \frac\pi2\right]\)`, T`\((-\infty, \infty)\)`],
        x: T`Open interval: \(\tan\) never reaches \(\pm\frac\pi2\), where it has asymptotes.` },
      { id: 't23', skill: 'Equations', q: T`Solve \(2\sin x = 1\) on \([0, 2\pi)\).`, c: [T`\(\frac\pi6,\ \frac{5\pi}{6}\)`, T`\(\frac\pi6\) only`, T`\(\frac\pi3,\ \frac{2\pi}{3}\)`, T`\(\frac\pi6,\ \frac{7\pi}{6}\)`],
        x: T`\(\sin x = \frac12\) in quadrants I and II, where sine is positive.` },
      { id: 't24', skill: 'Equations', q: T`How many solutions does \(\sin x = 0\) have on \([0, 2\pi)\)?`, c: ['2', '1', '3', '0'],
        x: T`\(x = 0\) and \(x = \pi\). The value \(2\pi\) is excluded by the half-open interval.` },
      { id: 't25', skill: 'Oblique triangles', q: T`The law of cosines states:`, c: [T`\(c^2 = a^2 + b^2 - 2ab\cos C\)`, T`\(c^2 = a^2 + b^2\)`, T`\(c^2 = a^2 + b^2 + 2ab\cos C\)`, T`\(\frac{a}{\sin A} = \frac{b}{\sin B}\)`],
        x: T`When \(C = 90^\circ\), \(\cos C = 0\) and it reduces to the Pythagorean theorem.` },
      { id: 't26', skill: 'Oblique triangles', q: T`Given two sides and a non-included angle (SSA), how many triangles are possible?`, c: ['0, 1, or 2', 'Exactly 1', 'Always 2', 'Always 0'],
        x: T`This is the ambiguous case of the law of sines. Check whether \(\sin B > 1\), \(= 1\), or whether \(180^\circ - B\) also fits.` }
    ],
    generators: [
      { id: 'tg-unit', skill: 'Unit circle', make(R) {
        const [n, d] = R.pick(ANGLES), th = n * Math.PI / d, fn = R.pick(['sin', 'cos', 'tan']);
        const s = Math.sin(th), co = Math.cos(th);
        const val = fn === 'sin' ? s : fn === 'cos' ? co : (Math.abs(co) < 1e-9 ? NaN : s / co);
        const show = v => { const e = exact(v); return e === null ? 'undefined' : T`\(${e}\)`; };
        const right = show(val);
        const pool = (fn === 'tan' ? [0, 1, -1, Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3) / 3, -Math.sqrt(3) / 3, NaN] : [0, 0.5, -0.5, Math.SQRT2 / 2, -Math.SQRT2 / 2, Math.sqrt(3) / 2, -Math.sqrt(3) / 2, 1, -1]).map(show);
        const prefer = [show(-val), show(fn === 'sin' ? co : fn === 'cos' ? s : co / s)];
        const choices = [right];
        for (const ch of prefer.concat(R.shuffle(pool))) if (choices.length < 4 && !choices.includes(ch)) choices.push(ch);
        const A = angTex(n, d);
        return { q: T`Evaluate \(${'\\' + fn} ${A}\).`, c: choices,
          x: T`The point at angle \(${A}\) on the unit circle is \((\cos, \sin) = \left(${exact(co)},\ ${exact(s)}\right)\).${fn === 'tan' ? (Number.isNaN(val) ? ' Cosine is 0 there, so tangent is undefined.' : ' Tangent is sine over cosine.') : ''}` };
      } },
      { id: 'tg-convert', skill: 'Radians', make(R) {
        if (R.int(0, 1)) {
          const deg = 15 * R.int(1, 23), rad = deg * Math.PI / 180;
          return { q: T`Convert \(${deg}^\circ\) to radians.`, answer: rad, tol: 0.01, hint: 'Give a decimal, such as 2.62.',
            x: T`\(${deg}\cdot\frac{\pi}{180} = ${angTex(deg / R.gcd(deg, 180), 180 / R.gcd(deg, 180))} \approx ${R.fmt(rad, 3)}\).` };
        }
        const d = R.pick([3, 4, 6, 12]); let n; do { n = R.int(1, 2 * d - 1); } while (R.gcd(n, d) !== 1);
        const deg = 180 * n / d;
        return { q: T`Convert \(${angTex(n, d)}\) radians to degrees.`, answer: deg,
          x: T`Multiply by \(\frac{180^\circ}{\pi}\): \(\frac{${n}\cdot 180}{${d}} = ${deg}^\circ\).` };
      } },
      { id: 'tg-right', skill: 'Right triangles', make(R) {
        if (R.int(0, 1)) {
          const [p, q] = R.pick([[3, 4], [5, 12], [8, 15], [7, 24]]), k = R.int(1, 3), a = p * k, b = q * k, ang = Math.atan(a / b) * 180 / Math.PI;
          return { q: T`A right triangle has legs ${a} and ${b}. Find the angle opposite the side of length ${a}, in degrees.`, answer: ang, tol: 0.1, hint: 'Round to 1 decimal.',
            x: T`\(\tan\theta = \frac{\text{opp}}{\text{adj}} = \frac{${a}}{${b}}\), so \(\theta = \arctan\frac{${a}}{${b}} \approx ${R.fmt(ang, 1)}^\circ\).` };
        }
        const h = R.int(5, 30), th = R.int(20, 70), opp = h * Math.sin(th * Math.PI / 180);
        return { q: T`A ${h} m ladder leans against a wall at ${th}° to the ground. How high up the wall does it reach, in meters?`, answer: opp, tol: 0.01, hint: 'Round to 2 decimals.',
          x: T`The height is opposite the angle and the ladder is the hypotenuse: \(${h}\sin ${th}^\circ \approx ${R.fmt(opp, 2)}\) m.` };
      } },
      { id: 'tg-arc', skill: 'Radians', make(R) {
        const r = R.int(2, 15), deg = 5 * R.int(4, 60), th = deg * Math.PI / 180, area = R.int(0, 1) === 1;
        const v = area ? 0.5 * r * r * th : r * th;
        return { q: T`A circle has radius ${r}. Find the ${area ? 'area of the sector' : 'length of the arc'} cut by a central angle of \(${deg}^\circ\).`, answer: v, tol: 0.01, hint: 'Round to 2 decimals.',
          x: T`In radians, \(\theta = ${deg}\cdot\frac{\pi}{180} \approx ${R.fmt(th, 4)}\). ${area ? T`\(A = \tfrac12 r^2\theta = \tfrac12(${r})^2(${R.fmt(th, 4)})` : T`\(s = r\theta = ${r}(${R.fmt(th, 4)})`} \approx ${R.fmt(v, 2)}\).` };
      } },
      { id: 'tg-lawcos', skill: 'Oblique triangles', make(R) {
        const a = R.int(3, 15), b = R.int(3, 15), C = 5 * R.int(4, 28), c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * Math.PI / 180));
        return { q: T`A triangle has sides \(a = ${a}\), \(b = ${b}\), and included angle \(C = ${C}^\circ\). Find side \(c\).`, answer: c, tol: 0.01, hint: 'Round to 2 decimals.',
          x: T`\(c^2 = ${a}^2 + ${b}^2 - 2(${a})(${b})\cos ${C}^\circ \approx ${R.fmt(c * c, 3)}\), so \(c \approx ${R.fmt(c, 2)}\).` };
      } },
      { id: 'tg-graph', skill: 'Graphs', make(R) {
        const A = R.nz(-5, 5), [B, Btex] = R.pick([[1, ''], [2, '2'], [3, '3'], [4, '4'], [0.5, '\\tfrac12 ']]), D = R.int(-4, 4), fn = R.pick(['sin', 'cos']);
        const kind = R.pick(['amp', 'per', 'max']);
        const f = T`y = ${R.co(A)}${'\\' + fn}(${Btex}x) ${R.sgn(D, true)}`;
        if (kind === 'amp') return { q: T`What is the amplitude of \(${f}\)?`, answer: Math.abs(A), x: T`Amplitude \(= |A| = ${Math.abs(A)}\).` };
        if (kind === 'per') return { q: T`What is the period of \(${f}\)?`, answer: 2 * Math.PI / B, tol: 0.01, hint: 'Decimals are fine.',
          x: T`Period \(= \frac{2\pi}{|B|} = \frac{2\pi}{${R.fmt(B)}} \approx ${R.fmt(2 * Math.PI / B, 3)}\).` };
        return { q: T`What is the maximum value of \(${f}\)?`, answer: Math.abs(A) + D,
          x: T`The graph oscillates \(|A| = ${Math.abs(A)}\) above and below the midline \(y = ${D}\), so the maximum is \(${Math.abs(A) + D}\).` };
      } },
      { id: 'tg-inv', skill: 'Inverse trig', make(R) {
        const fn = R.pick(['arcsin', 'arccos', 'arctan']);
        const k = fn === 'arctan' ? R.pick([-3, -2, -1.5, -0.5, 0.5, 1.5, 2, 3, 4]) : R.pick([-0.9, -0.6, -0.4, -0.2, 0.2, 0.35, 0.6, 0.75, 0.9]);
        const v = (fn === 'arcsin' ? Math.asin(k) : fn === 'arccos' ? Math.acos(k) : Math.atan(k)) * 180 / Math.PI;
        const range = { arcsin: T`[-90^\circ, 90^\circ]`, arccos: T`[0^\circ, 180^\circ]`, arctan: T`(-90^\circ, 90^\circ)` }[fn];
        return { q: T`Find \(${'\\' + fn}(${k})\) in degrees.`, answer: v, tol: 0.1, hint: 'Round to 1 decimal.',
          x: T`A calculator in degree mode gives \(${R.fmt(v, 1)}^\circ\), which lies in the principal range \(${range}\).` };
      } }
    ]
  });
})();
