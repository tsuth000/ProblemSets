'use strict';
// Unit generators for Calculus III, Linear algebra, Statistics.
(() => {
  const FR = 'Fractions such as 5/2 are fine.';
  const vtex = v => `(${v.join(', ')})`, vpy = v => `Matrix([${v.join(', ')}])`;
  const mtex = M => `\\begin{bmatrix}${M.map(r => r.join('&')).join('\\\\')}\\end{bmatrix}`, mpy = M => `Matrix([${M.map(r => `[${r.join(', ')}]`).join(', ')}])`;
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0), norm = a => Math.sqrt(dot(a, a));
  const rank = M => { const A = M.map(r => r.slice()), rows = A.length, cols = A[0].length; let rk = 0;
    for (let c = 0; c < cols && rk < rows; c++) { let p = rk; while (p < rows && Math.abs(A[p][c]) < 1e-9) p++; if (p === rows) continue; [A[rk], A[p]] = [A[p], A[rk]];
      for (let r = 0; r < rows; r++) if (r !== rk) { const f = A[r][c] / A[rk][c]; for (let k = c; k < cols; k++) A[r][k] -= f * A[rk][k]; } rk++; } return rk; };
  // Integer matrix with a chosen rank: r random rows, the rest integer combinations of them.
  const withRank = (R, m, n, r) => { let base; do { base = Array.from({ length: r }, () => R.vec(n, -3, 3)); } while (rank(base) < r);
    const rows = base.slice(); while (rows.length < m) { const c = base.map(() => R.int(-2, 2)); rows.push(Array.from({ length: n }, (_, j) => base.reduce((s, b, i) => s + c[i] * b[j], 0))); } return R.shuffle(rows); };

  // ======================= CALCULUS III =======================
  registerUnitGens('calc3', {
    tag: { 'cg-dot': 'Vectors and the dot product', 'cg-cross': 'The cross product', 'cg-partial': 'Partial derivatives and the chain rule', 'cg-dirder': 'Gradient and directional derivatives', 'cg-dbl': 'Double integrals', 'cg-div': 'Vector fields, divergence, curl' },
    units: {
      'Vectors and the dot product': [
        { id: 'cu-angle', make(R) { let u, v; do { u = R.vec(2, -5, 5); v = R.vec(2, -5, 5); } while (!norm(u) || !norm(v)); const ang = Math.acos(Math.max(-1, Math.min(1, dot(u, v) / (norm(u) * norm(v))))) * 180 / Math.PI;
          return { q: T`Find the angle between \(${vtex(u)}\) and \(${vtex(v)}\), in degrees to one decimal.`, answer: ang, tol: 0.1, hint: 'Round to one decimal.',
            x: T`\(\cos\theta = \frac{u\cdot v}{|u||v|} = \frac{${dot(u, v)}}{\sqrt{${dot(u, u)}}\sqrt{${dot(v, v)}}}\), so \(\theta \approx ${R.fmt(ang, 1)}^\circ\).`, v: `acos(${vpy(u)}.dot(${vpy(v)})/(${vpy(u)}.norm()*${vpy(v)}.norm()))*180/pi` }; } }
      ],
      'The cross product': [
        { id: 'cu-tri', make(R) { let A, B, C, cr; do { A = R.vec(3, -3, 3); B = R.vec(3, -3, 3); C = R.vec(3, -3, 3); const u = B.map((x, i) => x - A[i]), w = C.map((x, i) => x - A[i]); cr = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]; } while (!norm(cr));
          return { q: T`Find the area of the triangle with vertices \(${vtex(A)}\), \(${vtex(B)}\), \(${vtex(C)}\), to two decimals.`, answer: norm(cr) / 2, tol: 0.01, hint: 'Round to two decimals.',
            x: T`Take two edge vectors from the first vertex; their cross product is \(${vtex(cr)}\). Area \(= \tfrac12|\cdot| = \tfrac12\sqrt{${dot(cr, cr)}} \approx ${R.fmt(norm(cr) / 2, 2)}\).`,
            v: `(${vpy(B)} - ${vpy(A)}).cross(${vpy(C)} - ${vpy(A)}).norm()/2` }; } }
      ],
      'Lines and planes': [
        { id: 'cu-pdist', make(R) { const n = R.pick([[1, 2, 2], [2, 3, 6], [1, 4, 8], [4, 4, 7], [2, 1, 2]]), d = R.int(-12, 12), P = R.vec(3, -4, 4), dist = Math.abs(dot(n, P) - d) / norm(n);
          return { q: T`Find the distance from \(${vtex(P)}\) to the plane \(${n[0]}x + ${n[1]}y + ${n[2]}z = ${d}\).`, answer: dist, tol: 0.001, hint: FR,
            x: T`\(\frac{|n\cdot P - d|}{|n|} = \frac{|${dot(n, P)} - (${d})|}{${norm(n)}} = ${R.frac(Math.abs(dot(n, P) - d), norm(n))}\).`, v: `Plane(Point3D(Rational(${d}, ${n[0]}), 0, 0), normal_vector=(${n})).distance(Point3D(${P}))` }; } },
        { id: 'cu-linepl', make(R) { let n, P, w; do { n = R.vec(3, -3, 3); P = R.vec(3, -4, 4); w = R.vec(3, -3, 3); } while (!dot(n, w) || n.includes(0)); const d = R.int(-10, 10), t = (d - dot(n, P)) / dot(n, w);
          return { q: T`The line \(r(t) = ${vtex(P)} + t${vtex(w)}\) meets the plane \(${R.co(n[0])}x ${R.t(n[1], 'y')} ${R.t(n[2], 'z')} = ${d}\) at which \(t\)?`, answer: t, hint: FR,
            x: T`Substitute: \(${dot(n, P)} + ${dot(n, w)}t = ${d}\), so \(t = ${R.frac(d - dot(n, P), dot(n, w))}\).`, v: `solve(Eq(${vpy(n)}.dot(${vpy(P)} + t*${vpy(w)}), ${d}), t)[0]` }; } }
      ],
      'Curves and motion': [
        { id: 'cu-speed', make(R) { const a = R.nz(-4, 4), b = R.nz(-3, 3), c = R.int(-4, 4), t0 = R.int(0, 3), sp = Math.sqrt(a * a + (2 * b * t0) ** 2 + c * c);
          return { q: T`Find the speed of \(r(t) = (${R.mono(a, [['t', 1]])},\ ${R.mono(b, [['t', 2]])},\ ${R.mono(c, [['t', 1]])})\) at \(t = ${t0}\), to two decimals.`, answer: sp, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(r'(t) = (${a},\ ${R.mono(2 * b, [['t', 1]])},\ ${c})\). At \(t = ${t0}\): \(|r'| = \sqrt{${a * a} + ${(2 * b * t0) ** 2} + ${c * c}} \approx ${R.fmt(sp, 2)}\).`, v: `sqrt(sum(diff(e, t)**2 for e in [${a}*t, ${b}*t**2, ${c}*t])).subs(t, ${t0})` }; } }
      ],
      'Functions of several variables and limits': [
        { id: 'cu-path', make(R) { const m = R.nz(-4, 4), quad = R.int(0, 1) === 1;
          return { q: quad ? T`For \(f = \dfrac{x^2y}{x^4 + y^2}\), find the limit at the origin along \(y = ${R.co(m)}x^2\).` : T`For \(f = \dfrac{xy}{x^2 + y^2}\), find the limit at the origin along \(y = ${R.co(m)}x\).`, answer: m / (1 + m * m), hint: FR,
            x: T`Substitute the path: everything reduces to \(\frac{${m}}{1 + ${m * m}} = ${R.frac(m, 1 + m * m)}\). Different \(m\) give different values, so the two-variable limit does not exist.`,
            v: quad ? `limit((x**2*y/(x**4 + y**2)).subs(y, ${m}*x**2), x, 0)` : `limit((x*y/(x**2 + y**2)).subs(y, ${m}*x), x, 0)` }; } }
      ],
      'Partial derivatives and the chain rule': [
        { id: 'cu-mixed', make(R) { const a = R.nz(-3, 3), m = R.int(1, 3), n = R.int(1, 3), p = R.int(-2, 2), q = R.int(-2, 2), val = a * m * n * p ** (m - 1) * q ** (n - 1);
          return { q: T`\(f = ${R.mono(a, [['x', m], ['y', n]])}\). Find \(f_{xy}\) at \((${p}, ${q})\).`, answer: val,
            x: T`\(f_x = ${R.mono(a * m, [['x', m - 1], ['y', n]])}\), then \(f_{xy} = ${R.mono(a * m * n, [['x', m - 1], ['y', n - 1]])}\). At \((${p}, ${q})\): \(${val}\).`, v: `diff(${a}*x**${m}*y**${n}, x, y).subs({x: ${p}, y: ${q}})` }; } }
      ],
      'Gradient and directional derivatives': [
        { id: 'cu-gradmag', make(R) { const a = R.nz(-3, 3), b = R.int(-3, 3), c = R.int(-3, 3), p = R.int(-2, 2), q = R.int(-2, 2), gx = 2 * a * p + b * q, gy = b * p + 2 * c * q;
          return { q: T`\(f = ${R.lin([[a, 'x^2'], [b, 'xy'], [c, 'y^2']])}\). Find \(|\nabla f|\) at \((${p}, ${q})\), to two decimals.`, answer: Math.hypot(gx, gy), tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(\nabla f = (${R.lin([[2 * a, 'x'], [b, 'y']])},\ ${R.lin([[b, 'x'], [2 * c, 'y']])}) = (${gx}, ${gy})\) there. Length \(\sqrt{${gx * gx} + ${gy * gy}}\).`, v: `sqrt(diff(${a}*x**2 + (${b})*x*y + (${c})*y**2, x)**2 + diff(${a}*x**2 + (${b})*x*y + (${c})*y**2, y)**2).subs({x: ${p}, y: ${q}})` }; } }
      ],
      'Tangent planes and linearization': [
        { id: 'cu-lin', make(R) { const a = R.int(1, 3), b = R.int(1, 3), dx = R.pick([0.1, -0.1, 0.2]), dy = R.pick([0.1, -0.1, -0.2]), L = a * a * b + 2 * a * b * dx + a * a * dy;
          return { q: T`Use the tangent plane of \(f = x^2y\) at \((${a}, ${b})\) to estimate \(f(${R.fmt(a + dx)}, ${R.fmt(b + dy)})\).`, answer: L, tol: 0.001,
            x: T`\(f = ${a * a * b}\), \(f_x = 2xy = ${2 * a * b}\), \(f_y = x^2 = ${a * a}\). Estimate: \(${a * a * b} + ${2 * a * b}(${dx}) + ${a * a}(${dy}) = ${R.fmt(L, 3)}\).`, v: `(x**2*y + diff(x**2*y, x)*(${dx}) + diff(x**2*y, y)*(${dy})).subs({x: ${a}, y: ${b}})` }; } }
      ],
      'Local extrema': [
        { id: 'cu-D', make(R) { const a = R.nz(-3, 3), b = R.int(-4, 4), c = R.nz(-3, 3), d = R.int(-4, 4);
          return { q: T`Find \(D = f_{xx}f_{yy} - f_{xy}^2\) for \(f = ${R.co(a)}x^2 ${R.t(b, 'xy')} ${R.t(c, 'y^2')} ${R.t(d, 'x')}\).`, answer: 4 * a * c - b * b,
            x: T`\(f_{xx} = ${2 * a}\), \(f_{yy} = ${2 * c}\), \(f_{xy} = ${b}\): \(D = ${4 * a * c} - ${b * b} = ${4 * a * c - b * b}\).`, v: `hessian(${a}*x**2 + (${b})*x*y + (${c})*y**2 + (${d})*x, (x, y)).det()` }; } },
        { id: 'cu-class', make(R) { let a, b, c; do { a = R.nz(-3, 3); b = R.int(-4, 4); c = R.nz(-3, 3); } while (4 * a * c - b * b === 0); const D = 4 * a * c - b * b, k = D < 0 ? 'saddle' : a > 0 ? 'minimum' : 'maximum';
          return { q: T`Classify the critical point at the origin of \(f = ${R.co(a)}x^2 ${R.t(b, 'xy')} ${R.t(c, 'y^2')}\).`, c: [k, ...['minimum', 'maximum', 'saddle'].filter(z => z !== k)],
            x: T`\(D = ${D}\)${D < 0 ? ' < 0: a saddle.' : `, positive, with \\(f_{xx} = ${2 * a}\\) ${a > 0 ? 'positive: a minimum' : 'negative: a maximum'}.`}`, key: k, vk: `cls2(Matrix([[${2 * a}, ${b}], [${b}, ${2 * c}]]))` }; } }
      ],
      'Lagrange multipliers': [
        { id: 'cu-lagr', make(R) { const [p, q, h] = R.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [6, 8, 10]]), r = R.int(1, 4), sa = R.pick([1, -1]), sb = R.pick([1, -1]), a = sa * p, b = sb * q;
          return { q: T`Find the maximum of \(${a}x ${R.sgn(b, true)}y\) on the circle \(x^2 + y^2 = ${r * r}\).`, answer: r * h,
            x: T`\(\nabla f = (${a}, ${b})\) parallel to \(\nabla g = (2x, 2y)\): the best point is \(${r}\cdot\frac{(${a}, ${b})}{${h}}\), giving \(${r}\sqrt{${a * a} + ${b * b}} = ${r * h}\).`, v: `max([(${a})*s[0] + (${b})*s[1] for s in solve([${a} - 2*z*x, ${b} - 2*z*y, x**2 + y**2 - ${r * r}], [x, y, z])])` }; } }
      ],
      'Polar, cylindrical, spherical': [
        { id: 'cu-polar', make(R) { const Rr = R.int(1, 3), k = R.int(1, 2), val = 2 * Math.PI * Rr ** (2 * k + 2) / (2 * k + 2);
          return { q: T`Evaluate \(\iint_D ${k === 1 ? '(x^2 + y^2)' : `(x^2 + y^2)^{${k}}`}\,dA\) over the disk of radius ${Rr}, to two decimals.`, answer: val, tol: 0.01, hint: 'Round to two decimals.',
            x: T`Polar: \(x^2 + y^2 = r^2\) and \(dA = r\,dr\,d\theta\), so \(\int_0^{2\pi}\!\int_0^{${Rr}} r^{${2 * k}}\cdot r\,dr\,d\theta = 2\pi\cdot\frac{${Rr}^{${2 * k + 2}}}{${2 * k + 2}} \approx ${R.fmt(val, 2)}\).`, v: `integrate(r**${2 * k}*r, (r, 0, ${Rr}), (t, 0, 2*pi))` }; } }
      ],
      'Line integrals and conservative fields': [
        { id: 'cu-gradwork', make(R) { const a = R.nz(-3, 3), b = R.int(-4, 4), A = R.vec(2, -3, 3), B = R.vec(2, -3, 3), phi = ([X, Y]) => a * X * X * Y + b * Y, val = phi(B) - phi(A);
          return { q: T`\(F = \nabla\varphi\) with \(\varphi = ${R.co(a)}x^2y ${R.t(b, 'y')}\). Find the work done by \(F\) from \(${vtex(A)}\) to \(${vtex(B)}\).`, answer: val,
            x: T`Conservative: only the endpoints matter. \(\varphi(B) - \varphi(A) = ${phi(B)} - (${phi(A)}) = ${val}\).`,
            v: `(lambda P: integrate((diff(P, x).subs({x: ${A[0]} + (${B[0] - A[0]})*t, y: ${A[1]} + (${B[1] - A[1]})*t}))*(${B[0] - A[0]}) + (diff(P, y).subs({x: ${A[0]} + (${B[0] - A[0]})*t, y: ${A[1]} + (${B[1] - A[1]})*t}))*(${B[1] - A[1]}), (t, 0, 1)))(${a}*x**2*y + (${b})*y)` }; } }
      ],
      "Green's theorem": [
        { id: 'cu-green', make(R) { const a = R.int(1, 4), b = R.int(1, 4), Rr = R.int(1, 3), val = (a + b) * Math.PI * Rr * Rr;
          return { q: T`Find the circulation of \(F = (-${a === 1 ? '' : a}y,\ ${b === 1 ? '' : b}x)\) counterclockwise around the circle of radius ${Rr}, to two decimals.`, answer: val, tol: 0.01, hint: 'Round to two decimals.',
            x: T`Green: \(\iint(\partial_xQ - \partial_yP)\,dA = \iint(${b} + ${a})\,dA = ${a + b}\cdot\pi(${Rr})^2 \approx ${R.fmt(val, 2)}\).`,
            v: `integrate((-${a}*${Rr}*sin(t))*(-${Rr}*sin(t)) + (${b}*${Rr}*cos(t))*(${Rr}*cos(t)), (t, 0, 2*pi))` }; } }
      ],
      'Stokes and the divergence theorem': [
        { id: 'cu-flux', make(R) { const a = R.int(-3, 4), b = R.int(-3, 4), c = R.int(1, 4), L = R.int(1, 3);
          return { q: T`Find the outward flux of \(F = (${R.mono(a, [['x', 1]])},\ ${R.mono(b, [['y', 1]])},\ ${R.mono(c, [['z', 1]])})\) through the boundary of the cube \([0, ${L}]^3\).`, answer: (a + b + c) * L ** 3,
            x: T`Divergence theorem: \(\nabla\cdot F = ${a + b + c}\), times the volume \(${L ** 3}\).`, v: `${a}*${L}*${L}**2 + ${b}*${L}*${L}**2 + ${c}*${L}*${L}**2` }; } }
      ]
    }
  });

  // ======================= LINEAR ALGEBRA =======================
  const aug = (A, b) => `\\left[\\begin{array}{${'c'.repeat(A[0].length)}|c}${A.map((r, i) => [...r, b[i]].join('&')).join('\\\\')}\\end{array}\\right]`;
  registerUnitGens('linalg', {
    tag: { 'lg-sys': 'Systems and row reduction', 'lg-mul': 'Matrix algebra', 'lg-inv': 'Inverses', 'lg-det2': 'Determinants', 'lg-det3': 'Determinants', 'lg-eig': 'Eigenvalues and eigenvectors' },
    units: {
      'Systems and row reduction': [
        { id: 'lu-rowop', make(R) { const a11 = R.nz(-3, 3), k = R.nz(-3, 3), a12 = R.int(-5, 5), b1 = R.int(-9, 9), a22 = R.int(-6, 6), b2 = R.int(-9, 9), a21 = k * a11, askB = R.int(0, 1) === 1;
          const M = [[a11, a12, b1], [a21, a22, b2]];
          return { q: T`In \(${aug([[a11, a12], [a21, a22]], [b1, b2])}\), apply \(R_2 \leftarrow R_2 ${k > 0 ? '-' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}R_1\). What is the new ${askB ? 'right-hand side' : 'second entry'} of \(R_2\)?`, answer: askB ? b2 - k * b1 : a22 - k * a12,
            x: T`The multiplier is \(\frac{${a21}}{${a11}} = ${k}\). New entry: \(${askB ? b2 : a22} - (${k})(${askB ? b1 : a12}) = ${askB ? b2 - k * b1 : a22 - k * a12}\). The first entry becomes 0.`, v: `(${mpy(M)}.row(1) - (${k})*${mpy(M)}.row(0))[${askB ? 2 : 1}]` }; } },
        { id: 'lu-3x3', make(R) { let A; do { A = [R.vec(3, -3, 3), R.vec(3, -3, 3), R.vec(3, -3, 3)]; } while (rank(A) < 3); const xs = R.vec(3, -4, 4), b = A.map(r => dot(r, xs)), i = R.int(0, 2);
          return { q: T`Solve by row reduction: \(${aug(A, b)}\). Find \(${['x', 'y', 'z'][i]}\).`, answer: xs[i],
            x: T`Eliminate below each pivot, then back-substitute. The solution is \((x, y, z) = ${vtex(xs)}\); check it in every row.`, v: `${mpy(A)}.solve(Matrix([${b}]))[${i}]` }; } }
      ],
      'Solution sets': [
        { id: 'lu-free', make(R) { const n = R.int(3, 5), m = R.int(2, 4), r = R.int(1, Math.min(m, n)), M = withRank(R, m, n, r), rk = rank(M);
          return { q: T`The homogeneous system \(Ax = 0\) has \(A = ${mtex(M)}\). How many free variables does it have?`, answer: n - rk,
            x: T`Row reduce: there are ${rk} pivots among ${n} columns, so ${n - rk} free variable${n - rk === 1 ? '' : 's'}.`, v: `${n} - ${mpy(M)}.rank()` }; } }
      ],
      'Subspaces': [
        { id: 'lu-dimnull', make(R) { const n = R.int(2, 4), m = R.int(1, 3), r = R.int(1, Math.min(m, n)), M = withRank(R, m, n, r), rk = rank(M);
          return { q: T`What is the dimension of the subspace \(\{x : Ax = 0\}\) for \(A = ${mtex(M)}\)?`, answer: n - rk,
            x: T`This set is the null space, a subspace of \(\mathbb R^{${n}}\). Its dimension is the number of free variables: \(${n} - ${rk} = ${n - rk}\).`, v: `len(${mpy(M)}.nullspace())` }; } }
      ],
      'Independence, basis, dimension': [
        { id: 'lu-rank3', make(R) { const r = R.int(1, 3), M = withRank(R, 3, 3, r), rk = rank(M);
          return { q: T`Find the dimension of the span of \(${M.map(vtex).join(',\\ ')}\).`, answer: rk,
            x: T`Row reduce the vectors as rows: ${rk} nonzero row${rk === 1 ? '' : 's'} remain, so the span has dimension ${rk}.${rk < 3 ? ' The vectors are dependent.' : ''}`, v: `${mpy(M)}.rank()` }; } }
      ],
      'Rank and rank–nullity': [
        { id: 'lu-nullity', make(R) { const m = R.int(2, 4), n = R.int(3, 5), r = R.int(1, Math.min(m, n)), M = withRank(R, m, n, r), rk = rank(M);
          return { q: T`\(A = ${mtex(M)}\). Find its nullity.`, answer: n - rk, x: T`The rank is ${rk}. Rank + nullity = number of columns = ${n}, so the nullity is ${n - rk}.`, v: `len(${mpy(M)}.nullspace())` }; } }
      ],
      'Linear transformations': [
        { id: 'lu-T', make(R) { const a = R.int(-3, 3), b = R.int(-3, 3), c = R.int(-3, 3), d = R.int(-3, 3), p = R.int(-3, 3), q = R.int(-3, 3), i = R.int(0, 1), out = [a * p + c * q, b * p + d * q];
          return { q: T`\(T(1, 0) = (${a}, ${b})\) and \(T(0, 1) = (${c}, ${d})\). Find the ${i ? 'second' : 'first'} component of \(T(${p}, ${q})\).`, answer: out[i],
            x: T`Linearity: \(T(${p}, ${q}) = ${p}(${a}, ${b}) + ${q}(${c}, ${d}) = (${out[0]}, ${out[1]})\).`, v: `(${mpy([[a, c], [b, d]])}*Matrix([${p}, ${q}]))[${i}]` }; } }
      ],
      'Diagonalization': [
        { id: 'lu-pow', make(R) { const P = R.pick([[[1, 1], [1, 2]], [[2, 1], [1, 1]], [[1, 0], [1, 1]], [[1, 2], [0, 1]], [[1, 1], [0, 1]]]), det = P[0][0] * P[1][1] - P[0][1] * P[1][0];
          const Pi = [[P[1][1] / det, -P[0][1] / det], [-P[1][0] / det, P[0][0] / det]]; let l1, l2; do { l1 = R.int(-2, 3); l2 = R.int(-2, 3); } while (l1 === l2);
          const mul = (X, Y) => X.map(r => Y[0].map((_, j) => r.reduce((s, v, k) => s + v * Y[k][j], 0))), A = mul(mul(P, [[l1, 0], [0, l2]]), Pi), k = R.int(2, 4);
          return { q: T`\(A = ${mtex(A)}\) has eigenvalues ${l1} and ${l2}. Find the trace of \(A^{${k}}\).`, answer: l1 ** k + l2 ** k,
            x: T`\(A = PDP^{-1}\), so \(A^{${k}} = PD^{${k}}P^{-1}\) has eigenvalues \(${l1}^{${k}}\) and \(${l2}^{${k}}\). The trace is their sum: \(${l1 ** k} + ${l2 ** k} = ${l1 ** k + l2 ** k}\).`, v: `(${mpy(A)}**${k}).trace()` }; } }
      ],
      'Orthogonality and Gram–Schmidt': [
        { id: 'lu-proj', make(R) { let u, v; do { u = R.vec(2, -5, 5); v = R.vec(2, -4, 4); } while (!dot(v, v));
          return { q: T`Find the scalar \(\dfrac{u\cdot v}{v\cdot v}\) for projecting \(u = ${vtex(u)}\) onto \(v = ${vtex(v)}\).`, answer: dot(u, v) / dot(v, v), tol: 0.001, hint: FR,
            x: T`\(\frac{${dot(u, v)}}{${dot(v, v)}} = ${R.frac(dot(u, v), dot(v, v))}\). The projection is that multiple of \(v\).`, v: `${vpy(u)}.dot(${vpy(v)})/${vpy(v)}.dot(${vpy(v)})` }; } },
        { id: 'lu-gs', make(R) { let v1, v2; do { v1 = R.vec(2, -4, 4); v2 = R.vec(2, -4, 4); } while (!dot(v1, v1) || v1[0] * v2[1] === v1[1] * v2[0]); const s = dot(v2, v1) / dot(v1, v1), i = R.int(0, 1), u2 = [v2[0] - s * v1[0], v2[1] - s * v1[1]];
          return { q: T`Gram–Schmidt with \(v_1 = ${vtex(v1)}\), \(v_2 = ${vtex(v2)}\): find the ${i ? 'second' : 'first'} component of \(u_2 = v_2 - \frac{v_2\cdot v_1}{v_1\cdot v_1}v_1\).`, answer: u2[i], tol: 0.001, hint: FR,
            x: T`\(\frac{v_2\cdot v_1}{v_1\cdot v_1} = ${R.frac(dot(v2, v1), dot(v1, v1))}\). Subtract that multiple of \(v_1\) from \(v_2\). Check: \(u_2\cdot v_1 = 0\).`, v: `(${vpy(v2)} - (${vpy(v2)}.dot(${vpy(v1)})/${vpy(v1)}.dot(${vpy(v1)}))*${vpy(v1)})[${i}]` }; } }
      ],
      'Least squares': [
        { id: 'lu-ls', make(R) { const ys = [0, 1, 2, 3].map(() => R.int(-5, 9)), xm = 1.5, ym = ys.reduce((a, b) => a + b, 0) / 4, b1 = ys.reduce((s, y, i) => s + (i - xm) * (y - ym), 0) / 5, ask = R.int(0, 1) === 1;
          return { q: T`Fit a least-squares line to \((0, ${ys[0]}), (1, ${ys[1]}), (2, ${ys[2]}), (3, ${ys[3]})\). Find the ${ask ? 'intercept' : 'slope'}.`, answer: ask ? ym - b1 * xm : b1, tol: 0.001, hint: FR,
            x: T`\(\bar x = 1.5\), \(\bar y = ${R.fmt(ym, 3)}\). Slope \(= \frac{\sum(x - \bar x)(y - \bar y)}{\sum(x - \bar x)^2} = ${R.fmt(b1, 3)}\)${ask ? T`; intercept \(= \bar y - b\bar x = ${R.fmt(ym - b1 * xm, 3)}\)` : ''}.`, v: `np.polyfit([0, 1, 2, 3], [${ys}], 1)[${ask ? 1 : 0}]` }; } }
      ],
      'Symmetric matrices and quadratic forms': [
        { id: 'lu-symeig', make(R) { const a = R.int(-4, 5), b = R.nz(-3, 3), c = R.int(-4, 5), big = (a + c) / 2 + Math.sqrt(((a - c) / 2) ** 2 + b * b);
          return { q: T`Find the larger eigenvalue of \(${mtex([[a, b], [b, c]])}\), to three decimals.`, answer: big, tol: 0.0015, hint: 'Round to three decimals.',
            x: T`\(\lambda = \frac{${a} + ${c}}{2} \pm \sqrt{\left(\frac{${a} - ${c}}{2}\right)^2 + ${b * b}}\). Symmetric matrices always have real eigenvalues.`, v: `max(np.linalg.eigvalsh(np.array([[${a}, ${b}], [${b}, ${c}]], float)))` }; } },
        { id: 'lu-def', make(R) { let a, b, c; do { a = R.nz(-4, 4); b = R.int(-3, 3); c = R.nz(-4, 4); } while (a * c - b * b === 0); const det = a * c - b * b, k = det < 0 ? 'indefinite' : a > 0 ? 'positive definite' : 'negative definite';
          return { q: T`Classify the quadratic form with matrix \(${mtex([[a, b], [b, c]])}\).`, c: [k, ...['positive definite', 'negative definite', 'indefinite'].filter(z => z !== k)],
            x: T`\(\det = ${det}\)${det < 0 ? ': eigenvalues of opposite sign, so indefinite.' : `, positive, and the diagonal entry ${a} is ${a > 0 ? 'positive: both eigenvalues positive.' : 'negative: both eigenvalues negative.'}`}`, key: k, vk: `defin(Matrix([[${a}, ${b}], [${b}, ${c}]]))` }; } }
      ],
      'Singular value decomposition': [
        { id: 'lu-svd', make(R) { let M; do { M = [R.vec(2, -4, 4), R.vec(2, -4, 4)]; } while (!M.flat().some(Boolean)); const [[a, b], [c, d]] = M, s1 = a * a + b * b + c * c + d * d, dt = a * d - b * c, sig = Math.sqrt((s1 + Math.sqrt(s1 * s1 - 4 * dt * dt)) / 2);
          return { q: T`Find the largest singular value of \(${mtex(M)}\), to three decimals.`, answer: sig, tol: 0.0015, hint: 'Round to three decimals.',
            x: T`Singular values are square roots of the eigenvalues of \(A^TA\). The largest is \(\approx ${R.fmt(sig, 3)}\): the most \(A\) can stretch a unit vector.`, v: `max(np.linalg.svd(np.array(${JSON.stringify(M)}, float))[1])` }; } }
      ]
    }
  });

  // ======================= STATISTICS =======================
  registerUnitGens('stats', {
    tag: { 'sg-sd': 'Describing data', 'sg-z': 'Describing data', 'sg-binom': 'Random variables', 'sg-ci': 'Confidence intervals', 'sg-ols': 'Simple linear regression', 'sg-logit': 'Logistic regression' },
    units: {
      'Describing data': [
        { id: 'su-median', make(R) { const xs = Array.from({ length: R.int(5, 8) }, () => R.int(1, 40)), s = xs.slice().sort((a, b) => a - b), n = s.length, med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2, mean = xs.reduce((a, b) => a + b, 0) / n, askMed = R.int(0, 1) === 1;
          return { q: T`Find the ${askMed ? 'median' : 'mean'} of ${xs.join(', ')}.`, answer: askMed ? med : mean, tol: 0.01, hint: 'Decimals are fine.',
            x: askMed ? T`Sorted: ${s.join(', ')}. ${n % 2 ? 'The middle value' : 'The average of the two middle values'} is ${R.fmt(med, 2)}.` : T`Sum ${xs.reduce((a, b) => a + b, 0)} divided by ${n}: ${R.fmt(mean, 2)}.`, v: `np.${askMed ? 'median' : 'mean'}([${xs}])` }; } }
      ],
      'Probability rules and Bayes': [
        { id: 'su-bayes', make(R) { const p = R.pick([0.5, 1, 2, 5, 10]) / 100, s = R.pick([80, 90, 95, 99]) / 100, f = R.pick([1, 2, 5, 10]) / 100, post = p * s / (p * s + (1 - p) * f);
          return { q: T`A condition affects ${p * 100}% of people. A test catches ${s * 100}% of cases and falsely flags ${f * 100}% of healthy people. Find \(P(\text{condition} \mid +)\), to three decimals.`, answer: post, tol: 0.0015, hint: 'Round to three decimals.',
            x: T`Per 10,000 people: \(${R.fmt(10000 * p * s, 1)}\) true positives and \(${R.fmt(10000 * (1 - p) * f, 1)}\) false positives. Ratio \(\approx ${R.fmt(post, 3)}\).`, v: `Rational(${p * 1000}, 1000)*Rational(${s * 100}, 100)/(Rational(${p * 1000}, 1000)*Rational(${s * 100}, 100) + (1 - Rational(${p * 1000}, 1000))*Rational(${f * 100}, 100))` }; } },
        { id: 'su-union', make(R) { const a = R.int(2, 7) / 10, b = R.int(2, 7) / 10, ind = R.int(0, 1) === 1, c = ind ? a * b : Math.min(a, b) * R.int(1, 5) / 10;
          return { q: ind ? T`\(A\) and \(B\) are independent with \(P(A) = ${a}\) and \(P(B) = ${b}\). Find \(P(A\cup B)\).` : T`\(P(A) = ${a}\), \(P(B) = ${b}\), \(P(A\cap B) = ${R.fmt(c, 3)}\). Find \(P(A\cup B)\).`, answer: a + b - c, tol: 0.001,
            x: T`\(P(A\cup B) = P(A) + P(B) - P(A\cap B) = ${a} + ${b} - ${R.fmt(c, 3)}\)${ind ? T`, with \(P(A\cap B) = P(A)P(B)\) for independent events` : ''}.`, v: `${a} + ${b} - ${ind ? `${a}*${b}` : c}` }; } }
      ],
      'Random variables': [
        { id: 'su-ev', make(R) { const xs = R.sample ? R.shuffle([0, 1, 2, 3, 4, 5, 10]).slice(0, 3) : [1, 2, 3], ps = R.pick([[0.2, 0.3, 0.5], [0.1, 0.6, 0.3], [0.25, 0.25, 0.5], [0.4, 0.4, 0.2]]), E = xs.reduce((s, x, i) => s + x * ps[i], 0), V = xs.reduce((s, x, i) => s + (x - E) ** 2 * ps[i], 0), askV = R.int(0, 1) === 1;
          return { q: T`\(X\) takes values ${xs.join(', ')} with probabilities ${ps.join(', ')}. Find \(${askV ? '\\operatorname{Var}(X)' : 'E(X)'}\).`, answer: askV ? V : E, tol: 0.001,
            x: askV ? T`\(E(X) = ${R.fmt(E, 3)}\); \(\operatorname{Var}(X) = \sum (x - \mu)^2 p = ${R.fmt(V, 3)}\).` : T`\(E(X) = \sum xp = ${xs.map((x, i) => `${x}(${ps[i]})`).join(' + ')} = ${R.fmt(E, 3)}\).`,
            v: askV ? `np.dot((np.array([${xs}]) - np.dot([${xs}], [${ps}]))**2, [${ps}])` : `np.dot([${xs}], [${ps}])` }; } }
      ],
      'Sampling distributions and the CLT': [
        { id: 'su-se', make(R) { const s = R.pick([4, 5, 8, 10, 12, 15, 20]), n = R.pick([16, 25, 36, 49, 64, 100]);
          if (R.int(0, 1)) return { q: T`\(\sigma = ${s}\) and \(n = ${n}\). Find the standard error of the mean.`, answer: s / Math.sqrt(n), tol: 0.001, x: T`\(\frac{\sigma}{\sqrt n} = \frac{${s}}{${Math.sqrt(n)}}\).`, v: `${s}/sqrt(${n})` };
          const se = R.pick([0.5, 1, 2]); return { q: T`\(\sigma = ${s}\). What sample size gives a standard error of ${se}?`, answer: (s / se) ** 2, x: T`\(\frac{${s}}{\sqrt n} = ${se}\) gives \(\sqrt n = ${s / se}\), so \(n = ${(s / se) ** 2}\).`, v: `solve(Eq(${s}/sqrt(y), ${se}), y)[0]` }; } }
      ],
      'Hypothesis testing': [
        { id: 'su-z', make(R) { const mu = R.int(40, 60), s = R.pick([5, 8, 10, 12]), n = R.pick([16, 25, 36, 64]), xb = mu + R.int(-6, 6) + R.pick([0, 0.5]), z = (xb - mu) / (s / Math.sqrt(n));
          return { q: T`Test \(H_0: \mu = ${mu}\) with \(\bar x = ${xb}\), \(\sigma = ${s}\), \(n = ${n}\). Find the \(z\) statistic, to two decimals.`, answer: z, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(z = \frac{\bar x - \mu_0}{\sigma/\sqrt n} = \frac{${R.fmt(xb - mu, 1)}}{${s}/${Math.sqrt(n)}} \approx ${R.fmt(z, 2)}\).`, v: `(${xb} - ${mu})/(${s}/sqrt(${n}))` }; } },
        { id: 'su-p', make(R) { const z = R.int(5, 32) / 10, erf = x => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
          const p = 2 * (1 - 0.5 * (1 + erf(z / Math.SQRT2)));
          return { q: T`Find the two-sided p-value for \(z = ${z}\), to three decimals.`, answer: p, tol: 0.0015, hint: 'Round to three decimals.',
            x: T`\(p = 2P(Z > ${z}) \approx ${R.fmt(p, 3)}\). ${p < 0.05 ? 'Below 0.05: significant at 5%.' : 'Not below 0.05.'}`, v: `2*(1 - (1 + erf(${z}/sqrt(2)))/2)` }; } }
      ],
      'Inference for regression': [
        { id: 'su-tslope', make(R) { const b = R.int(-30, 30) / 10 || 1.5, se = R.pick([0.2, 0.4, 0.5, 0.8, 1]), ask = R.int(0, 1) === 1;
          return { q: ask ? T`A slope estimate is ${b} with standard error ${se}. Find the upper end of the 95% CI using \(t^* = 2\).` : T`A slope estimate is ${b} with standard error ${se}. Find the \(t\) statistic for \(H_0: \beta_1 = 0\).`, answer: ask ? b + 2 * se : b / se, tol: 0.001,
            x: ask ? T`\(b \pm t^*SE = ${b} \pm 2(${se})\); upper end \(${R.fmt(b + 2 * se, 3)}\).` : T`\(t = \frac{b}{SE} = \frac{${b}}{${se}} = ${R.fmt(b / se, 3)}\).`, v: ask ? `${b} + 2*${se}` : `${b}/${se}` }; } }
      ],
      'Multiple regression': [
        { id: 'su-mreg', make(R) { const b0 = R.int(-10, 20), b1 = R.int(-5, 5), b2 = R.int(-5, 5), x1 = R.int(0, 8), x2 = R.int(0, 8);
          return { q: T`\(\hat y = ${R.lin([[b0, ''], [b1, 'x_1'], [b2, 'x_2']])}\). Predict \(y\) at \(x_1 = ${x1}\), \(x_2 = ${x2}\).`, answer: b0 + b1 * x1 + b2 * x2,
            x: T`\(${b0} + (${b1})(${x1}) + (${b2})(${x2}) = ${b0 + b1 * x1 + b2 * x2}\). Each coefficient is the effect of its variable with the other held fixed.`, v: `${b0} + (${b1})*${x1} + (${b2})*${x2}` }; } }
      ],
      'Diagnostics': [
        { id: 'su-resid', make(R) { const b0 = R.int(-5, 10), b1 = R.int(-4, 4), x = R.int(0, 9), y = b0 + b1 * x + R.int(-6, 6);
          return { q: T`The fitted line is \(\hat y = ${b0} ${R.t(b1, 'x')}\). Find the residual for the point \((${x}, ${y})\).`, answer: y - (b0 + b1 * x),
            x: T`\(\hat y = ${b0 + b1 * x}\). Residual = observed \(-\) predicted \(= ${y} - ${b0 + b1 * x} = ${y - (b0 + b1 * x)}\).`, v: `${y} - (${b0} + (${b1})*${x})` }; } }
      ],
      'Logistic regression': [
        { id: 'su-odds', make(R) { if (R.int(0, 1)) { const L = R.int(-30, 30) / 10, p = 1 / (1 + Math.exp(-L));
            return { q: T`The log-odds are ${L}. Find \(p\), to three decimals.`, answer: p, tol: 0.0015, hint: 'Round to three decimals.', x: T`\(p = \frac{1}{1 + e^{-(${L})}} \approx ${R.fmt(p, 3)}\).`, v: `1/(1 + exp(-(${L})))` }; }
          const p = R.pick([0.1, 0.2, 0.25, 0.6, 0.75, 0.8, 0.9]); return { q: T`\(p = ${p}\). Find the odds.`, answer: p / (1 - p), tol: 0.001, hint: FR, x: T`\(\frac{p}{1 - p} = \frac{${p}}{${R.fmt(1 - p, 2)}}\).`, v: `${p}/(1 - ${p})` }; } }
      ],
      'The GLM family': [
        { id: 'su-pois', make(R) { const b0 = R.int(-10, 15) / 10, b1 = R.int(-10, 10) / 10, x = R.int(0, 4), mu = Math.exp(b0 + b1 * x);
          return { q: T`A Poisson model has \(\log\mu = ${R.lin([[b0, ''], [b1, 'x']])}\). Find \(\mu\) at \(x = ${x}\), to two decimals.`, answer: mu, tol: 0.01, hint: 'Round to two decimals.',
            x: T`\(\mu = e^{${b0} + (${b1})(${x})} = e^{${R.fmt(b0 + b1 * x, 2)}} \approx ${R.fmt(mu, 2)}\).`, v: `exp(${b0} + (${b1})*${x})` }; } }
      ],
      'Model selection and regularization': [
        { id: 'su-aic', make(R) { const k = R.int(2, 8), lnL = -R.int(20, 200) / 2;
          return { q: T`A model has ${k} parameters and log-likelihood \(${lnL}\). Find its AIC.`, answer: 2 * k - 2 * lnL, x: T`\(AIC = 2k - 2\ln L = ${2 * k} + ${-2 * lnL} = ${2 * k - 2 * lnL}\). Lower is better.`, v: `2*${k} - 2*(${lnL})` }; } }
      ]
    }
  });
})();
