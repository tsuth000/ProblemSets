registerSubject({
  id: 'calc3', name: 'Calculus III', color: '#1C6E6E',
  blurb: 'Vectors, partial derivatives, multiple integrals, vector calculus',
  questions: [
    { id: 'c1', skill: 'Gradient', q: T`At a point, \(\nabla f\) points in the direction of:`,
      c: ['greatest rate of increase of \\(f\\)', 'the level curve through the point', 'greatest rate of decrease of \\(f\\)', 'zero change in \\(f\\)'],
      x: T`\(D_{\mathbf u} f = |\nabla f|\cos\theta\) is largest at \(\theta = 0\), so the maximum rate of increase is \(|\nabla f|\) in the direction of \(\nabla f\).` },
    { id: 'c2', skill: 'Gradient', q: T`Relative to the level curve of \(f\) through a point, \(\nabla f\) is:`,
      c: ['perpendicular', 'tangent', 'at 45 degrees', 'unrelated'],
      x: T`Along a level curve \(f\) is constant, so \(\nabla f \cdot \mathbf r'(t) = 0\). The gradient is normal to the curve.` },
    { id: 'c3', skill: 'Multiple integrals', q: T`In polar coordinates, the area element \(dA\) is:`,
      c: [T`\(r\,dr\,d\theta\)`, T`\(dr\,d\theta\)`, T`\(r^2\,dr\,d\theta\)`, T`\(\sin\theta\,dr\,d\theta\)`],
      x: T`The Jacobian of \((r,\theta) \mapsto (r\cos\theta, r\sin\theta)\) is \(r\).` },
    { id: 'c4', skill: 'Multiple integrals', q: T`In spherical coordinates, the volume element \(dV\) is:`,
      c: [T`\(\rho^2\sin\phi\,d\rho\,d\phi\,d\theta\)`, T`\(\rho\sin\phi\,d\rho\,d\phi\,d\theta\)`, T`\(\rho^2\cos\phi\,d\rho\,d\phi\,d\theta\)`, T`\(r\,dr\,d\theta\,dz\)`],
      x: T`The spherical Jacobian is \(\rho^2 \sin\phi\), with \(\phi\) measured from the positive \(z\)-axis. The last option is cylindrical.` },
    { id: 'c5', skill: 'Vector fields', q: T`For a vector field \(\mathbf F\) with continuous second partials, \(\nabla \cdot (\nabla \times \mathbf F)\) equals:`,
      c: ['0', T`\(\nabla^2 \mathbf F\)`, T`\(|\mathbf F|\)`, 'It depends on \\(\\mathbf F\\)'],
      x: T`The mixed partials cancel pairwise by Clairaut's theorem, so the divergence of a curl is always zero.` },
    { id: 'c6', skill: 'Optimization', q: T`At a critical point, \(f_{xx} = 2\), \(f_{yy} = 3\), \(f_{xy} = 4\). The point is:`,
      c: ['a saddle point', 'a local minimum', 'a local maximum', 'inconclusive'],
      x: T`\(D = (2)(3) - 4^2 = -10 < 0\), which is a saddle.` },
    { id: 'c7', skill: 'Optimization', q: T`At a critical point, \(f_{xx} = 4\), \(f_{yy} = 1\), \(f_{xy} = 1\). The point is:`,
      c: ['a local minimum', 'a local maximum', 'a saddle point', 'inconclusive'],
      x: T`\(D = 4 - 1 = 3 > 0\) and \(f_{xx} > 0\), so the surface is concave up in every direction there.` },
    { id: 'c8', skill: 'Optimization', q: T`To find extrema of \(f(x,y)\) subject to \(g(x,y) = k\), Lagrange multipliers solve:`,
      c: [T`\(\nabla f = \lambda \nabla g\) together with \(g = k\)`, T`\(\nabla f = \mathbf 0\)`, T`\(\nabla f \cdot \nabla g = 0\)`, T`\(f = \lambda g\)`],
      x: T`At a constrained extremum the level curve of \(f\) is tangent to the constraint curve, so their normals (gradients) are parallel.` },
    { id: 'c9', skill: 'Vector theorems', q: T`Green's theorem converts \(\oint_C P\,dx + Q\,dy\) into:`,
      c: [T`\(\iint_D \left(Q_x - P_y\right) dA\)`, T`\(\iint_D \left(P_x + Q_y\right) dA\)`, T`\(\iint_D \left(P_y - Q_x\right) dA\)`, T`\(\iiint_E \nabla \cdot \mathbf F\, dV\)`],
      x: T`For a positively oriented (counterclockwise) boundary, the circulation equals the integral of the scalar curl \(Q_x - P_y\).` },
    { id: 'c10', skill: 'Vector theorems', q: T`The divergence theorem equates the outward flux of \(\mathbf F\) through a closed surface with:`,
      c: [T`\(\iiint_E \nabla \cdot \mathbf F\,dV\)`, T`\(\iint_S (\nabla\times\mathbf F)\cdot d\mathbf S\)`, T`\(\oint_C \mathbf F \cdot d\mathbf r\)`, 'zero'],
      x: T`Net outflow through the boundary equals the total source strength \(\nabla\cdot\mathbf F\) inside.` },
    { id: 'c11', skill: 'Vector theorems', q: T`Stokes' theorem equates \(\oint_{\partial S}\mathbf F\cdot d\mathbf r\) with:`,
      c: [T`\(\iint_S (\nabla\times\mathbf F)\cdot d\mathbf S\)`, T`\(\iiint_E \nabla\cdot\mathbf F\,dV\)`, T`\(\iint_S \mathbf F \cdot d\mathbf S\)`, T`\(\iint_S \nabla\cdot\mathbf F\,dA\)`],
      x: T`Circulation around the boundary equals the flux of the curl through any surface bounded by that curve.` },
    { id: 'c12', skill: 'Vector fields', q: T`Which is a potential function for \(\mathbf F = \langle 2xy,\ x^2 \rangle\)?`,
      c: [T`\(f = x^2 y\)`, T`\(f = x y^2\)`, T`\(f = 2x^2 y\)`, T`\(f = x^2 + y^2\)`],
      x: T`\(\partial_x(x^2 y) = 2xy\) and \(\partial_y(x^2 y) = x^2\).` },
    { id: 'c13', skill: 'Vector fields', q: T`With \(\mathbf F = \langle 2xy,\ x^2\rangle\), compute \(\int_C \mathbf F \cdot d\mathbf r\) along any path from \((0,0)\) to \((1,2)\).`,
      c: ['2', '1', '4', 'It depends on the path'],
      x: T`\(\mathbf F = \nabla(x^2y)\), so the integral is \(f(1,2) - f(0,0) = 2 - 0 = 2\).` },
    { id: 'c14', skill: 'Vectors', q: T`The cross product \(\mathbf u \times \mathbf v\) is:`,
      c: [T`orthogonal to both \(\mathbf u\) and \(\mathbf v\)`, T`parallel to \(\mathbf u\)`, 'a scalar', T`equal to \(\mathbf v \times \mathbf u\)`],
      x: T`\(\mathbf u\times\mathbf v\) is a vector normal to the plane of \(\mathbf u, \mathbf v\), and \(\mathbf v\times\mathbf u = -\mathbf u\times\mathbf v\).` },
    { id: 'c15', skill: 'Vectors', q: T`\(|\mathbf u \times \mathbf v|\) equals:`,
      c: [T`the area of the parallelogram spanned by \(\mathbf u\) and \(\mathbf v\)`, T`\(|\mathbf u||\mathbf v|\cos\theta\)`, 'the volume of a parallelepiped', 'the angle between them'],
      x: T`\(|\mathbf u\times\mathbf v| = |\mathbf u||\mathbf v|\sin\theta\), which is base times height.` },
    { id: 'c16', skill: 'Curves', q: T`The curve \(\mathbf r(t) = \langle \cos t,\ \sin t,\ t\rangle\) is:`,
      c: ['a helix', 'a circle', 'a parabola', 'a straight line'],
      x: T`The \(x,y\) components trace the unit circle while \(z\) rises linearly.` },
    { id: 'c17', skill: 'Curves', q: T`The arc length of \(\mathbf r(t)\) for \(a \le t \le b\) is:`,
      c: [T`\(\int_a^b |\mathbf r'(t)|\,dt\)`, T`\(|\mathbf r(b) - \mathbf r(a)|\)`, T`\(\int_a^b \mathbf r'(t)\,dt\)`, T`\(\int_a^b |\mathbf r(t)|\,dt\)`],
      x: T`Integrate speed. The second option is the straight-line distance, which is only a lower bound.` },
    { id: 'c18', skill: 'Lines and planes', q: T`Which is the plane through \((1,0,3)\) with normal \(\langle 1,2,-1\rangle\)?`,
      c: [T`\(x + 2y - z = -2\)`, T`\(x + 2y - z = 4\)`, T`\(x + 2y + 3z = 0\)`, T`\(x - 2y + z = 2\)`],
      x: T`\(1(x-1) + 2(y-0) - (z-3) = 0\) simplifies to \(x + 2y - z = -2\).` },
    { id: 'c19', skill: 'Partial derivatives', q: T`If \(z = f(x,y)\) with \(x = x(t),\ y = y(t)\), then \(dz/dt\) is:`,
      c: [T`\(f_x\,x'(t) + f_y\,y'(t)\)`, T`\(f_x + f_y\)`, T`\(f_x\,f_y\)`, T`\(f_x\,y'(t) + f_y\,x'(t)\)`],
      x: T`The multivariable chain rule sums over every path from \(z\) to \(t\).` },
    { id: 'c20', skill: 'Multiple integrals', q: T`For \(x = u + v\), \(y = u - v\), what is \(\left|\dfrac{\partial(x,y)}{\partial(u,v)}\right|\)?`,
      c: ['2', '1', '0', '4'],
      x: T`\(\det\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix} = -1 - 1 = -2\), with absolute value 2.` },
    { id: 'c21', skill: 'Limits', q: T`What is \(\displaystyle\lim_{(x,y)\to(0,0)} \frac{xy}{x^2+y^2}\)?`,
      c: ['It does not exist', '0', '1/2', '1'],
      x: T`Along \(y = mx\) the expression is \(\frac{m}{1+m^2}\), which depends on \(m\). Different paths give different limits.` },
    { id: 'c22', skill: 'Multiple integrals', q: T`\(\iint_D f(x,y)\,dA\) with \(f \ge 0\) represents:`,
      c: [T`the volume under \(z = f(x,y)\) above \(D\)`, T`the area of \(D\)`, T`the surface area of \(z = f\)`, T`the average value of \(f\)`],
      x: T`Riemann sums of \(f(x_i,y_i)\,\Delta A\) add up thin columns. Setting \(f = 1\) gives the area of \(D\).` }
  ],
  generators: [
    { id: 'cg-dot', skill: 'Vectors', make(R) {
      const u = R.vec(3, -5, 6), v = R.vec(3, -5, 6), d = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
      return { q: T`Compute \(\mathbf u \cdot \mathbf v\) for \(\mathbf u = \langle ${u} \rangle\), \(\mathbf v = \langle ${v} \rangle\).`, answer: d,
        x: T`\((${u[0]})(${v[0]}) + (${u[1]})(${v[1]}) + (${u[2]})(${v[2]}) = ${d}\).` };
    } },
    { id: 'cg-cross', skill: 'Vectors', make(R) {
      const u = R.vec(3, -4, 5), v = R.vec(3, -4, 5);
      const cr = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      const i = R.int(0, 2), nm = ['\\mathbf i', '\\mathbf j', '\\mathbf k'][i];
      const how = [T`u_2v_3 - u_3v_2 = (${u[1]})(${v[2]}) - (${u[2]})(${v[1]})`, T`u_3v_1 - u_1v_3 = (${u[2]})(${v[0]}) - (${u[0]})(${v[2]})`, T`u_1v_2 - u_2v_1 = (${u[0]})(${v[1]}) - (${u[1]})(${v[0]})`][i];
      return { q: T`For \(\mathbf u = \langle ${u} \rangle\) and \(\mathbf v = \langle ${v} \rangle\), find the \(${nm}\)-component of \(\mathbf u \times \mathbf v\).`, answer: cr[i],
        x: T`\(${how} = ${cr[i]}\). Full result: \(\langle ${cr} \rangle\).` };
    } },
    { id: 'cg-partial', skill: 'Partial derivatives', make(R) {
      const a = R.nz(-4, 5), m = R.int(2, 3), n = R.int(1, 3), b = R.nz(-6, 6), c = R.nz(-6, 6), p = R.nz(-2, 2), qv = R.nz(-2, 3);
      const wrtX = R.int(0, 1) === 0;
      const val = wrtX ? a * m * p ** (m - 1) * qv ** n + b : a * n * p ** m * qv ** (n - 1) + c;
      const f = T`f(x,y) = ${R.mono(a, [['x', m], ['y', n]])} ${R.t(b, 'x')} ${R.t(c, 'y')}`;
      const d = wrtX ? T`f_x = ${R.mono(a * m, [['x', m - 1], ['y', n]])} ${R.sgn(b, true)}` : T`f_y = ${R.mono(a * n, [['x', m], ['y', n - 1]])} ${R.sgn(c, true)}`;
      return { q: T`For \(${f}\), compute \(${wrtX ? 'f_x' : 'f_y'}(${p}, ${qv})\).`, answer: val,
        x: T`\(${d}\). Substituting \(x=${p},\ y=${qv}\) gives \(${val}\).` };
    } },
    { id: 'cg-dirder', skill: 'Gradient', make(R) {
      const a = R.nz(-3, 4), b = R.nz(-3, 4), c = R.nz(-3, 3), p = R.nz(-2, 3), qv = R.nz(-2, 3);
      const [ux, uy] = R.pick([[3, 4], [4, 3], [-3, 4], [4, -3], [3, -4], [-4, 3]]);
      const fx = 2 * a * p + c * qv, fy = 2 * b * qv + c * p, val = (fx * ux + fy * uy) / 5;
      return { q: T`Let \(f(x,y) = ${R.co(a)}x^2 ${R.t(b, 'y^2')} ${R.t(c, 'xy')}\). Find the directional derivative of \(f\) at \((${p}, ${qv})\) in the direction of \(\langle ${ux}, ${uy}\rangle\).`, answer: val, tol: 0.01,
        hint: 'Decimals are fine.',
        x: T`\(\nabla f = \langle ${2 * a}x ${R.t(c, 'y')},\ ${2 * b}y ${R.t(c, 'x')}\rangle = \langle ${fx}, ${fy}\rangle\) at the point. The unit vector is \(\langle ${ux}/5, ${uy}/5\rangle\), so \(D_{\mathbf u}f = \frac{(${fx})(${ux}) + (${fy})(${uy})}{5} = ${R.fmt(val)}\).` };
    } },
    { id: 'cg-dbl', skill: 'Multiple integrals', make(R) {
      const A = R.int(1, 4), B = R.int(1, 4), c = R.nz(-3, 5), d = R.nz(-3, 5), val = c * B * A * A / 2 + d * A * B * B / 2;
      return { q: T`Evaluate \(\displaystyle\int_0^{${A}}\!\int_0^{${B}} (${R.co(c)}x ${R.t(d, 'y')})\,dy\,dx\).`, answer: val, tol: 0.01,
        x: T`Inner: \(\int_0^{${B}} (${R.co(c)}x ${R.t(d, 'y')})\,dy = ${R.co(c * B)}x ${R.sgn(d * B * B / 2, true)}\). Outer: \(${c * B}\cdot\frac{${A}^2}{2} + ${R.fmt(d * B * B / 2)}\cdot ${A} = ${R.fmt(val)}\).` };
    } },
    { id: 'cg-div', skill: 'Vector fields', make(R) {
      const a = R.nz(-3, 4), b = R.nz(-3, 4), c = R.nz(-3, 4), P = R.vec(3, -2, 3), [x, y, z] = P;
      const val = 2 * a * x * y + b * z + 2 * c * x * z;
      return { q: T`Compute \(\nabla\cdot\mathbf F\) at \((${P})\) for \(\mathbf F = \langle ${R.co(a)}x^2y,\ ${R.co(b)}yz,\ ${R.co(c)}xz^2\rangle\).`, answer: val,
        x: T`\(\nabla\cdot\mathbf F = ${2 * a}xy ${R.t(b, 'z')} ${R.t(2 * c, 'xz')}\). At the point: \(${2 * a}(${x})(${y}) + ${b}(${z}) + ${2 * c}(${x})(${z}) = ${val}\).` };
    } }
  ]
});
