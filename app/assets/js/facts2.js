'use strict';
// Fluency decks for Discrete, Calculus III, Linear algebra, Statistics, Python, and Physics.
(() => {
  const add = (id, title, subject, blurb, items) => window.DECKS.push({ id, title, subject, blurb, items });
  const tt = s => `\\texttt{${s}}`;

  add('logic', 'Logic and counting', 'discrete', 'Negations, equivalences, and counting formulas', [
    { p: '\\neg(p\\land q)', a: '\\neg p\\lor\\neg q' }, { p: '\\neg(p\\lor q)', a: '\\neg p\\land\\neg q' }, { p: 'p\\to q', a: '\\neg p\\lor q' },
    { p: '\\text{contrapositive of } p\\to q', a: '\\neg q\\to\\neg p' }, { p: '\\neg\\forall x\\,P(x)', a: '\\exists x\\,\\neg P(x)' }, { p: '\\neg\\exists x\\,P(x)', a: '\\forall x\\,\\neg P(x)' },
    { p: '\\binom52', a: '10' }, { p: '5!', a: '120' }, { p: '\\text{subsets of an } n\\text{-set}', a: '2^n' }, { p: '1 + 2 + \\cdots + n', a: '\\tfrac{n(n+1)}{2}' },
    { p: '\\text{edges of } K_n', a: '\\tfrac{n(n-1)}{2}' }, { p: '\\textstyle\\sum\\deg(v)', a: '2|E|' }, { p: '|A\\cup B|', a: '|A| + |B| - |A\\cap B|' }, { p: '\\gcd(48, 18)', a: '6' }
  ]);

  add('vectorcalc', 'Vector calculus', 'calc3', 'Products, operators, and integral theorems', [
    { p: 'u\\cdot v', a: '|u||v|\\cos\\theta' }, { p: '|u\\times v|', a: '|u||v|\\sin\\theta' }, { p: '\\nabla f\\text{ for } f = x^2 + y^2', a: '(2x, 2y)' },
    { p: '\\nabla\\cdot(x, y, z)', a: '3' }, { p: '\\text{polar } dA', a: 'r\\,dr\\,d\\theta' }, { p: '\\text{spherical } dV', a: '\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta' },
    { p: '\\text{steepest ascent}', a: '\\nabla f' }, { p: 'D_u f', a: '\\nabla f\\cdot u' }, { p: '\\nabla\\cdot(\\nabla\\times F)', a: '0' }, { p: '\\nabla\\times(\\nabla f)', a: '\\mathbf 0' },
    { p: '\\text{Lagrange condition}', a: '\\nabla f = \\lambda\\nabla g' }, { p: '\\text{second-derivative test } D', a: 'f_{xx}f_{yy} - f_{xy}^2' }, { p: '\\text{arc length of } r(t)', a: '\\int|r\'(t)|\\,dt' }, { p: '\\mathbf i\\times\\mathbf j', a: '\\mathbf k' }
  ]);

  add('matrices', 'Matrices', 'linalg', 'Determinants, inverses, and eigenvalue facts', [
    { p: '\\det\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}', a: 'ad - bc' }, { p: '\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}^{-1}', a: '\\tfrac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}' },
    { p: '\\operatorname{rank} + \\operatorname{nullity}', a: 'n\\ (\\text{columns})' }, { p: '\\det(AB)', a: '\\det A\\,\\det B' }, { p: '(AB)^T', a: 'B^TA^T' }, { p: '(AB)^{-1}', a: 'B^{-1}A^{-1}' },
    { p: '\\textstyle\\sum\\lambda_i', a: '\\operatorname{tr}A' }, { p: '\\textstyle\\prod\\lambda_i', a: '\\det A' }, { p: '\\text{normal equations}', a: 'A^TA\\hat x = A^Tb' }, { p: '\\text{projection of } u \\text{ on } v', a: '\\tfrac{u\\cdot v}{v\\cdot v}\\,v' },
    { p: 'Q \\text{ orthogonal}', a: 'Q^TQ = I' }, { p: '\\det\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}', a: '3' }, { p: '\\det(cA),\\ A\\ n\\times n', a: 'c^n\\det A' }, { p: '\\text{eigenvalues of } \\begin{bmatrix}2&0\\\\0&5\\end{bmatrix}', a: '2, 5' }
  ]);

  add('statfacts', 'Statistics', 'stats', 'Critical values, standard errors, and probability rules', [
    { p: 'z^*\\text{ for 95\\%}', a: '1.96' }, { p: 'z^*\\text{ for 99\\%}', a: '2.576' }, { p: 'z^*\\text{ for 90\\%}', a: '1.645' }, { p: 'SE(\\bar x)', a: '\\sigma/\\sqrt n' },
    { p: 'P(A\\cup B)', a: 'P(A) + P(B) - P(A\\cap B)' }, { p: 'P(A\\mid B)', a: '\\tfrac{P(A\\cap B)}{P(B)}' }, { p: 'E(aX + b)', a: 'aE(X) + b' }, { p: '\\operatorname{Var}(aX + b)', a: 'a^2\\operatorname{Var}(X)' },
    { p: 'R^2\\text{ with one predictor}', a: 'r^2' }, { p: '\\text{odds}', a: '\\tfrac{p}{1 - p}' }, { p: 'P(|Z| < 1)', a: '\\approx 0.68' }, { p: 'P(|Z| < 2)', a: '\\approx 0.95' },
    { p: '\\text{residual}', a: 'y - \\hat y' }, { p: 'df\\text{, simple regression}', a: 'n - 2' }, { p: 'z', a: '\\tfrac{x - \\mu}{\\sigma}' }
  ]);

  add('pyout', 'Python output', 'python', 'Predict the value of short expressions', [
    { p: tt('7 // 2'), a: tt('3') }, { p: tt('-7 // 2'), a: tt('-4') }, { p: tt('7 \\% 3'), a: tt('1') }, { p: tt('-7 \\% 3'), a: tt('2') }, { p: tt('2 ** 10'), a: tt('1024') },
    { p: tt("len('hello')"), a: tt('5') }, { p: tt("'ab' * 3"), a: tt("'ababab'") }, { p: tt('[1, 2, 3][-1]'), a: tt('3') }, { p: tt('bool([])'), a: tt('False') },
    { p: tt("bool('0')"), a: tt('True') }, { p: tt('3 == 3.0'), a: tt('True') }, { p: tt('type(1 / 2)'), a: tt('float') }, { p: tt("'PYTHON'[1:4]"), a: tt("'YTH'") },
    { p: tt('list(range(3))'), a: tt('[0, 1, 2]') }, { p: tt('round(2.5)'), a: tt('2') }, { p: tt("int('42') + 1"), a: tt('43') }, { p: tt('0.1 + 0.2 == 0.3'), a: tt('False') }
  ]);

  add('physformulas', 'Physics formulas', 'physics', 'Core relations and constants', [
    { p: 'F_{\\text{net}}', a: 'ma' }, { p: 'KE', a: '\\tfrac12mv^2' }, { p: 'PE_{\\text{grav}}', a: 'mgh' }, { p: 'p', a: 'mv' }, { p: 'W', a: 'Fd\\cos\\theta' },
    { p: 'P', a: 'W/t' }, { p: 'a_c', a: 'v^2/r' }, { p: 'V', a: 'IR' }, { p: '\\tau', a: 'rF\\sin\\theta' }, { p: '\\omega\\text{ (spring)}', a: '\\sqrt{k/m}' },
    { p: 'v\\text{ (wave)}', a: 'f\\lambda' }, { p: '\\Delta U', a: 'Q - W' }, { p: 'g', a: '9.8\\text{ m/s}^2' }, { p: 'R_{\\text{parallel}}\\ (2)', a: '\\tfrac{R_1R_2}{R_1 + R_2}' },
    { p: '\\eta_{\\text{Carnot}}', a: '1 - T_c/T_h' }, { p: 'T\\text{ (pendulum)}', a: '2\\pi\\sqrt{L/g}' }, { p: 'P\\text{ (fluid depth)}', a: '\\rho gh' }
  ]);
})();
