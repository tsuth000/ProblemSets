'use strict';
// Fluency decks for timed sprints. Each item is {p: prompt, a: answer} in LaTeX; a deck may instead supply gen() for fresh items.
(() => {
  const D = window.DECKS = [];
  const add = (id, title, subject, blurb, items, gen) => D.push({ id, title, subject, blurb, items, gen });

  // Unit circle values, built from the exact-value table in the trig subject.
  const { exact, angTex } = window.TRIG_EXACT;
  const ANG = [[0, 1], [1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6], [1, 1], [7, 6], [5, 4], [4, 3], [3, 2], [5, 3], [7, 4], [11, 6]];
  const uc = [];
  for (const [n, d] of ANG) {
    const t = n * Math.PI / d, s = Math.sin(t), c = Math.cos(t);
    uc.push({ p: `\\sin ${angTex(n, d)}`, a: exact(s) }, { p: `\\cos ${angTex(n, d)}`, a: exact(c) });
    uc.push({ p: `\\tan ${angTex(n, d)}`, a: Math.abs(c) < 1e-9 ? '\\text{undefined}' : exact(s / c) });
  }
  add('unitcircle', 'Unit circle values', 'trig', 'sin, cos, and tan at the 16 standard angles', uc);

  const rad = [];
  for (const deg of [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360]) {
    const g = (a, b) => (b ? g(b, a % b) : a), k = g(deg, 180);
    const tex = angTex(deg / k, 180 / k);
    rad.push({ p: `${deg}^\\circ`, a: tex }, { p: `${tex}\\text{ rad}`, a: `${deg}^\\circ` });
  }
  add('radians', 'Degrees and radians', 'trig', 'Convert the standard angles both ways', rad);

  add('trigid', 'Trig identities', 'trig', 'Pythagorean, double-angle, and symmetry identities', [
    { p: '\\sin^2x + \\cos^2x', a: '1' }, { p: '1 + \\tan^2x', a: '\\sec^2x' }, { p: '1 + \\cot^2x', a: '\\csc^2x' },
    { p: '\\sin 2x', a: '2\\sin x\\cos x' }, { p: '\\cos^2x - \\sin^2x', a: '\\cos 2x' }, { p: '\\sin^2 x', a: '\\tfrac{1 - \\cos 2x}{2}' },
    { p: '\\cos^2 x', a: '\\tfrac{1 + \\cos 2x}{2}' }, { p: '\\sin(-x)', a: '-\\sin x' }, { p: '\\cos(-x)', a: '\\cos x' },
    { p: '\\tan x', a: '\\tfrac{\\sin x}{\\cos x}' }, { p: '\\sec x', a: '\\tfrac{1}{\\cos x}' }, { p: '\\csc x', a: '\\tfrac{1}{\\sin x}' },
    { p: '\\sin\\left(\\tfrac\\pi2 - x\\right)', a: '\\cos x' }, { p: '\\sin(x + \\pi)', a: '-\\sin x' }, { p: '\\cos(x + 2\\pi)', a: '\\cos x' }
  ]);

  add('exponents', 'Exponent rules', 'algebra', 'Simplify powers, roots, and reciprocals', [
    { p: 'x^3\\cdot x^4', a: 'x^7' }, { p: '(x^3)^4', a: 'x^{12}' }, { p: 'x^8 / x^2', a: 'x^6' }, { p: 'x^{-2}', a: '\\tfrac{1}{x^2}' },
    { p: 'x^0', a: '1' }, { p: 'x^{1/2}', a: '\\sqrt x' }, { p: 'x^{2/3}', a: '\\sqrt[3]{x^2}' }, { p: '(2x)^3', a: '8x^3' },
    { p: '8^{2/3}', a: '4' }, { p: '16^{3/4}', a: '8' }, { p: '2^{-3}', a: '\\tfrac18' }, { p: '\\sqrt{50}', a: '5\\sqrt2' },
    { p: '\\sqrt{72}', a: '6\\sqrt2' }, { p: '\\sqrt{48}', a: '4\\sqrt3' }, { p: '\\left(\\tfrac23\\right)^{-2}', a: '\\tfrac94' }
  ]);

  add('factoring', 'Factoring patterns', 'algebra', 'Recognize special products on sight', [
    { p: 'x^2 - 9', a: '(x - 3)(x + 3)' }, { p: 'x^2 + 6x + 9', a: '(x + 3)^2' }, { p: 'x^2 - 6x + 9', a: '(x - 3)^2' },
    { p: 'x^2 + 5x + 6', a: '(x + 2)(x + 3)' }, { p: 'x^2 - x - 6', a: '(x - 3)(x + 2)' }, { p: 'x^2 + x - 6', a: '(x + 3)(x - 2)' },
    { p: 'x^3 - 8', a: '(x - 2)(x^2 + 2x + 4)' }, { p: 'x^3 + 8', a: '(x + 2)(x^2 - 2x + 4)' }, { p: '4x^2 - 25', a: '(2x - 5)(2x + 5)' },
    { p: 'x^2 - 7x + 12', a: '(x - 3)(x - 4)' }, { p: '2x^2 + 7x + 3', a: '(2x + 1)(x + 3)' }, { p: 'x^4 - 1', a: '(x^2 + 1)(x - 1)(x + 1)' }
  ]);

  add('logs', 'Logarithms', 'precalc', 'Log values and log rules', [
    { p: '\\log_2 32', a: '5' }, { p: '\\log_3 81', a: '4' }, { p: '\\log_{10} 0.001', a: '-3' }, { p: '\\log_5 1', a: '0' },
    { p: '\\ln e^7', a: '7' }, { p: 'e^{\\ln 5}', a: '5' }, { p: '\\log_4 2', a: '\\tfrac12' }, { p: '\\log_2\\tfrac14', a: '-2' },
    { p: '\\log(ab)', a: '\\log a + \\log b' }, { p: '\\log\\tfrac ab', a: '\\log a - \\log b' }, { p: '\\log a^n', a: 'n\\log a' },
    { p: '\\log_b x', a: '\\tfrac{\\ln x}{\\ln b}' }, { p: '\\ln 1', a: '0' }, { p: '\\log_9 27', a: '\\tfrac32' }
  ]);

  add('derivatives', 'Derivatives', 'calc1', 'The table every calculus problem leans on', [
    { p: '\\tfrac{d}{dx}x^n', a: 'nx^{n-1}' }, { p: '\\tfrac{d}{dx}e^x', a: 'e^x' }, { p: '\\tfrac{d}{dx}\\ln x', a: '\\tfrac1x' },
    { p: '\\tfrac{d}{dx}\\sin x', a: '\\cos x' }, { p: '\\tfrac{d}{dx}\\cos x', a: '-\\sin x' }, { p: '\\tfrac{d}{dx}\\tan x', a: '\\sec^2 x' },
    { p: '\\tfrac{d}{dx}\\sec x', a: '\\sec x\\tan x' }, { p: '\\tfrac{d}{dx}\\arcsin x', a: '\\tfrac{1}{\\sqrt{1 - x^2}}' }, { p: '\\tfrac{d}{dx}\\arctan x', a: '\\tfrac{1}{1 + x^2}' },
    { p: '\\tfrac{d}{dx}a^x', a: 'a^x\\ln a' }, { p: '\\tfrac{d}{dx}\\sqrt x', a: '\\tfrac{1}{2\\sqrt x}' }, { p: '\\tfrac{d}{dx}\\tfrac1x', a: '-\\tfrac{1}{x^2}' },
    { p: '\\tfrac{d}{dx}e^{3x}', a: '3e^{3x}' }, { p: '\\tfrac{d}{dx}\\sin 2x', a: '2\\cos 2x' }, { p: '\\tfrac{d}{dx}\\ln(x^2)', a: '\\tfrac2x' }, { p: '(fg)\'', a: 'f\'g + fg\'' }
  ]);

  add('integrals', 'Integrals', 'calc2', 'Antiderivatives to know without thinking', [
    { p: '\\int x^n\\,dx', a: '\\tfrac{x^{n+1}}{n+1} + C' }, { p: '\\int\\tfrac1x\\,dx', a: '\\ln|x| + C' }, { p: '\\int e^x\\,dx', a: 'e^x + C' },
    { p: '\\int\\cos x\\,dx', a: '\\sin x + C' }, { p: '\\int\\sin x\\,dx', a: '-\\cos x + C' }, { p: '\\int\\sec^2x\\,dx', a: '\\tan x + C' },
    { p: '\\int\\tfrac{dx}{1 + x^2}', a: '\\arctan x + C' }, { p: '\\int\\tfrac{dx}{\\sqrt{1 - x^2}}', a: '\\arcsin x + C' }, { p: '\\int e^{2x}\\,dx', a: '\\tfrac12e^{2x} + C' },
    { p: '\\int\\sec x\\tan x\\,dx', a: '\\sec x + C' }, { p: '\\int a^x\\,dx', a: '\\tfrac{a^x}{\\ln a} + C' }, { p: '\\int\\ln x\\,dx', a: 'x\\ln x - x + C' },
    { p: '\\int_0^1 x\\,dx', a: '\\tfrac12' }, { p: '\\int_0^\\pi\\sin x\\,dx', a: '2' }, { p: '\\int_1^e\\tfrac1x\\,dx', a: '1' }
  ]);

  add('series', 'Series', 'calc2', 'Maclaurin series and convergence facts', [
    { p: 'e^x', a: '\\sum\\tfrac{x^n}{n!}' }, { p: '\\sin x', a: '\\sum\\tfrac{(-1)^nx^{2n+1}}{(2n+1)!}' }, { p: '\\cos x', a: '\\sum\\tfrac{(-1)^nx^{2n}}{(2n)!}' },
    { p: '\\tfrac{1}{1 - x}', a: '\\sum x^n' }, { p: '\\ln(1 + x)', a: '\\sum\\tfrac{(-1)^{n+1}x^n}{n}' }, { p: '\\arctan x', a: '\\sum\\tfrac{(-1)^nx^{2n+1}}{2n+1}' },
    { p: '\\sum\\tfrac{1}{n^p}\\text{ converges iff}', a: 'p > 1' }, { p: '\\sum r^n\\text{ converges iff}', a: '|r| < 1' }, { p: '\\sum_{n=0}^\\infty r^n', a: '\\tfrac{1}{1 - r}' },
    { p: '\\sum\\tfrac1n', a: '\\text{diverges}' }, { p: '\\sum\\tfrac{1}{n^2}', a: '\\tfrac{\\pi^2}{6}' }, { p: '\\sum\\tfrac{(-1)^{n+1}}{n}', a: '\\ln 2' }
  ]);

  // Mental arithmetic, generated fresh each time.
  add('mental', 'Mental arithmetic', 'algebra', 'Squares, products, powers of 2, and fraction-decimal pairs', null, R => {
    const k = R.int(0, 4);
    if (k === 0) { const n = R.int(11, 25); return { p: `${n}^2`, a: String(n * n), d: [n * n + 10, n * n - 10, n * n + n].map(String) }; }
    if (k === 1) { const a = R.int(6, 15), b = R.int(6, 15); return { p: `${a}\\times${b}`, a: String(a * b), d: [a * b + a, a * b - b, a * (b + 1) + 1].map(String) }; }
    if (k === 2) { const n = R.int(5, 12); return { p: `2^{${n}}`, a: String(2 ** n), d: [2 ** (n + 1), 2 ** (n - 1), 2 ** n + 2].map(String) }; }
    if (k === 3) { const [n, d, v] = R.pick([[1, 8, '0.125'], [3, 8, '0.375'], [5, 8, '0.625'], [1, 16, '0.0625'], [1, 3, '0.\\overline{3}'], [2, 3, '0.\\overline{6}'], [1, 6, '0.1\\overline{6}'], [1, 12, '0.08\\overline{3}'], [3, 4, '0.75'], [1, 20, '0.05']]);
      return { p: `\\tfrac{${n}}{${d}}`, a: v, d: ['0.25', '0.125', '0.375', '0.6', '0.\\overline{3}', '0.15'].filter(x => x !== v).slice(0, 3) }; }
    const p = R.pick([5, 15, 20, 25, 40]), base = R.pick([40, 60, 80, 120, 240]);
    return { p: `${p}\\%\\text{ of }${base}`, a: String(p * base / 100), d: [p * base / 10, p * base / 100 + 5, base - p * base / 100].map(String) };
  });
})();
