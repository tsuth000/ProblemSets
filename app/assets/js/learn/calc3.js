registerLearn('calc3', [
  { title: 'Vectors and the dot product', skill: 'Vectors', body: T`
<p>A vector \(\mathbf v = \langle v_1, v_2, v_3\rangle\) has length \(|\mathbf v| = \sqrt{v_1^2+v_2^2+v_3^2}\). The unit vector in its direction is \(\mathbf v/|\mathbf v|\).</p>
\[\mathbf u\cdot\mathbf v = u_1v_1 + u_2v_2 + u_3v_3 = |\mathbf u||\mathbf v|\cos\theta\]
<p>The dot product is zero iff the vectors are orthogonal. Scalar projection of \(\mathbf v\) onto \(\mathbf u\): \(\frac{\mathbf v\cdot\mathbf u}{|\mathbf u|}\). Vector projection: \(\frac{\mathbf v\cdot\mathbf u}{\mathbf u\cdot\mathbf u}\,\mathbf u\). Work done by a constant force: \(W = \mathbf F \cdot \mathbf d\).</p>`,
    ex: { q: T`Find the angle between \(\langle 1,2,2\rangle\) and \(\langle 2,-1,2\rangle\).`, a: T`
<p>\(\mathbf u\cdot\mathbf v = 2 - 2 + 4 = 4\); both lengths are 3. So \(\cos\theta = \frac{4}{9}\) and \(\theta = \arccos(4/9) \approx 63.6^\circ\).</p>` },
    trap: T`Writing the dot product as a vector. It is a scalar; the cross product is the vector.` },

  { title: 'The cross product', skill: 'Vectors', body: T`
\[\mathbf u\times\mathbf v = \begin{vmatrix}\mathbf i & \mathbf j & \mathbf k\\ u_1&u_2&u_3\\ v_1&v_2&v_3\end{vmatrix}\]<p>Expanding along the top row:</p>\[\begin{aligned}\langle\, &u_2v_3 - u_3v_2,\\ &u_3v_1 - u_1v_3,\\ &u_1v_2 - u_2v_1\,\rangle\end{aligned}\]
<p>It is orthogonal to both factors, points by the right-hand rule, and has length \(|\mathbf u||\mathbf v|\sin\theta\), the parallelogram area. It is anticommutative: \(\mathbf v\times\mathbf u = -\mathbf u\times\mathbf v\). The triple product \(|\mathbf u\cdot(\mathbf v\times\mathbf w)|\) is the volume of the parallelepiped.</p>`,
    ex: { q: T`Compute \(\langle 1,2,0\rangle\times\langle 0,1,3\rangle\) and the parallelogram area.`, a: T`
<p>\(\langle 2\cdot3 - 0\cdot1,\ 0\cdot0 - 1\cdot3,\ 1\cdot1 - 2\cdot0\rangle = \langle 6,-3,1\rangle\). Check: dotting with each factor gives 0. Area \(= \sqrt{36+9+1} = \sqrt{46}\).</p>` },
    trap: T`Dropping the minus sign on the middle (\(\mathbf j\)) component when expanding the determinant.` },

  { title: 'Lines and planes', skill: 'Lines and planes', body: T`
<p>Line through \(P_0\) with direction \(\mathbf v\): \(\mathbf r(t) = \mathbf r_0 + t\mathbf v\). Plane through \(P_0\) with normal \(\mathbf n = \langle a,b,c\rangle\): \(a(x-x_0)+b(y-y_0)+c(z-z_0)=0\).</p>
<p>Three points determine a plane: cross two edge vectors for the normal. Distance from \(P_1\) to the plane \(ax+by+cz=d\):</p>
\[D = \frac{|ax_1+by_1+cz_1-d|}{\sqrt{a^2+b^2+c^2}}\]`,
    ex: { q: T`Find the plane through \((1,0,0)\), \((0,2,0)\), \((0,0,3)\).`, a: T`
<p>Edges \(\langle -1,2,0\rangle\) and \(\langle -1,0,3\rangle\). Cross: \(\langle 6,3,2\rangle\). Plane: \(6(x-1)+3y+2z=0\), so \(6x+3y+2z=6\). Check \((0,0,3)\): \(6\).</p>` },
    trap: T`Using a line's direction vector as a plane's normal. A plane's coefficients are its normal; a line's coefficients of \(t\) are its direction.` },

  { title: 'Curves and motion', skill: 'Curves', body: T`
<p>For \(\mathbf r(t)\): velocity \(\mathbf r'(t)\), speed \(|\mathbf r'(t)|\), acceleration \(\mathbf r''(t)\). Unit tangent \(\mathbf T = \mathbf r'/|\mathbf r'|\).</p>
\[L = \int_a^b |\mathbf r'(t)|\,dt \qquad \kappa = \frac{|\mathbf r'\times\mathbf r''|}{|\mathbf r'|^3}\]
<p>Curvature \(\kappa\) measures how fast the direction turns per unit length; a circle of radius \(R\) has \(\kappa = 1/R\).</p>`,
    ex: { q: T`Find the length of one turn of the helix \(\langle\cos t,\sin t,t\rangle\), \(0\le t\le 2\pi\).`, a: T`
<p>\(\mathbf r' = \langle -\sin t,\cos t,1\rangle\), so \(|\mathbf r'| = \sqrt{\sin^2 t+\cos^2 t+1} = \sqrt2\). \(L = \int_0^{2\pi}\sqrt2\,dt = 2\pi\sqrt2\).</p>` },
    trap: T`Integrating \(\mathbf r'(t)\) instead of \(|\mathbf r'(t)|\). That gives displacement, a vector, not distance traveled.` },

  { title: 'Functions of several variables and limits', skill: 'Limits', body: T`
<p>A function \(z = f(x,y)\) is a surface; its level curves \(f(x,y) = c\) form a contour map. A limit at \((a,b)\) must agree along every path of approach.</p>
<p>To show a limit does not exist, find two paths with different limits (lines \(y = mx\), parabolas \(y = x^2\)). To show it does exist, use a bound or polar coordinates: if \(|f - L| \le g(r)\) with \(g(r)\to 0\), the limit is \(L\).</p>`,
    ex: { q: T`Evaluate \(\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^2+y^2}\).`, a: T`
<p>In polar form the expression is \(\frac{r^3\cos^2\theta\sin\theta}{r^2} = r\cos^2\theta\sin\theta\). Its absolute value is at most \(r\), which goes to 0. The limit is 0.</p>` },
    trap: T`Concluding a limit exists because several straight-line paths agree. \(\frac{x^2y}{x^4+y^2}\) gives 0 on every line but \(\frac12\) along \(y = x^2\).` },

  { title: 'Partial derivatives and the chain rule', skill: 'Partial derivatives', body: T`
<p>\(f_x\) differentiates with respect to \(x\), treating other variables as constants. Clairaut: if mixed partials are continuous, \(f_{xy} = f_{yx}\).</p>
<p>Chain rule: sum over every path in the dependency tree.</p>
\[\frac{dz}{dt} = f_x\frac{dx}{dt} + f_y\frac{dy}{dt} \qquad \frac{\partial z}{\partial s} = f_x\frac{\partial x}{\partial s} + f_y\frac{\partial y}{\partial s}\]
<p>Implicit differentiation: if \(F(x,y,z) = 0\) defines \(z\), then \(\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}\).</p>`,
    ex: { q: T`For \(z = x^2+y^2\), \(x = \cos t\), \(y = \sin t\), find \(dz/dt\).`, a: T`
<p>\(\frac{dz}{dt} = 2x(-\sin t) + 2y(\cos t) = -2\cos t\sin t + 2\sin t\cos t = 0\). That makes sense: the path stays on the circle where \(z = 1\).</p>` },
    trap: T`Forgetting the inner derivatives \(dx/dt\), \(dy/dt\), or dropping a branch when a variable feeds into \(f\) along two paths.` },

  { title: 'Gradient and directional derivatives', skill: 'Gradient', body: T`
<p>\(\nabla f = \langle f_x, f_y, f_z\rangle\). For a unit vector \(\mathbf u\):</p>
\[D_{\mathbf u}f = \nabla f\cdot\mathbf u = |\nabla f|\cos\theta\]
<p>So \(f\) increases fastest in the direction of \(\nabla f\), at rate \(|\nabla f|\); decreases fastest along \(-\nabla f\); and does not change perpendicular to \(\nabla f\). The gradient is normal to level curves and level surfaces.</p>`,
    ex: { q: T`For \(f = x^2+3xy\), find \(D_{\mathbf u}f\) at \((1,2)\) toward \(\langle3,4\rangle\) and the maximum rate.`, a: T`
<p>\(\nabla f = \langle 2x+3y,\ 3x\rangle = \langle 8,3\rangle\). Unit vector \(\langle\frac35,\frac45\rangle\). \(D_{\mathbf u}f = \frac{24+12}{5} = 7.2\). Maximum rate: \(|\nabla f| = \sqrt{73}\approx 8.54\).</p>` },
    trap: T`Dotting with a non-unit direction vector. Normalize first, or the answer is scaled by the vector's length.` },

  { title: 'Tangent planes and linearization', skill: 'Partial derivatives', body: T`
\[\begin{aligned}z &= f(a,b) + f_x(a,b)(x-a)\\ &\quad + f_y(a,b)(y-b)\end{aligned}\]
<p>The tangent plane is the best linear approximation near \((a,b)\). Differential: \(dz = f_x\,dx + f_y\,dy\). For a level surface \(F(x,y,z) = k\), the tangent plane is \(\nabla F(P_0)\cdot\langle x-x_0,y-y_0,z-z_0\rangle = 0\).</p>`,
    ex: { q: T`Linearize \(f = x^2+y^2\) at \((1,2)\) and estimate \(f(1.1, 1.9)\).`, a: T`
<p>\(f(1,2)=5\), \(f_x=2\), \(f_y=4\). \(L = 5 + 2(x-1) + 4(y-2)\). \(L(1.1,1.9) = 5 + 0.2 - 0.4 = 4.8\). Exact: \(1.21+3.61 = 4.82\).</p>` },
    trap: T`Evaluating the partial derivatives at \((x,y)\) instead of the base point \((a,b)\). The slopes are constants.` },

  { title: 'Local extrema', skill: 'Optimization', body: T`
<p>Critical points: \(\nabla f = \mathbf 0\), or where a partial derivative does not exist. Second derivative test with \(D = f_{xx}f_{yy} - f_{xy}^2\):</p>
<table class="tt"><tr><th>\(D\)</th><th>\(f_{xx}\)</th><th>Conclusion</th></tr>
<tr><td>\(> 0\)</td><td>\(> 0\)</td><td>local minimum</td></tr>
<tr><td>\(> 0\)</td><td>\(< 0\)</td><td>local maximum</td></tr>
<tr><td>\(< 0\)</td><td>any</td><td>saddle point</td></tr>
<tr><td>\(= 0\)</td><td>any</td><td>inconclusive</td></tr></table>
<p>For absolute extrema on a closed, bounded region, also check the boundary.</p>`,
    ex: { q: T`Classify the critical point of \(f = x^2+y^2-2x-6y+14\).`, a: T`
<p>\(\nabla f = \langle 2x-2,\ 2y-6\rangle = \mathbf 0\) at \((1,3)\). \(f_{xx} = f_{yy} = 2\), \(f_{xy} = 0\), so \(D = 4 > 0\) with \(f_{xx} > 0\): a minimum, \(f(1,3) = 4\).</p>` },
    trap: T`Skipping the boundary on a closed region. The absolute max of \(x^2+y^2\) on the unit disk is on the edge, not at a critical point.` },

  { title: 'Lagrange multipliers', skill: 'Optimization', body: T`
<p>To optimize \(f\) subject to \(g(x,y) = k\), solve</p>
\[\nabla f = \lambda\nabla g, \qquad g(x,y) = k.\]
<p>Geometrically, at the optimum the level curve of \(f\) is tangent to the constraint curve. Evaluate \(f\) at every solution and compare. With two constraints, use \(\nabla f = \lambda\nabla g + \mu\nabla h\).</p>`,
    ex: { q: T`Maximize \(xy\) subject to \(x + y = 10\).`, a: T`
<p>\(\langle y, x\rangle = \lambda\langle 1,1\rangle\) gives \(x = y\). With \(x+y=10\): \(x=y=5\), \(f = 25\).</p>` },
    trap: T`Stopping at \(\lambda\). The multiplier is a tool; the answer is the points and values of \(f\).` },

  { title: 'Double integrals', skill: 'Multiple integrals', body: T`
<p>\(\iint_D f\,dA\) is the signed volume under \(z=f\). Fubini: over a rectangle, integrate in either order.</p>
<p>Type I region: \(a\le x\le b\), \(g_1(x)\le y\le g_2(x)\). Type II: \(c\le y\le d\), \(h_1(y)\le x\le h_2(y)\). Sketch the region before reversing order; some integrals are only doable in one order.</p>
<p>Average value: \(\frac{1}{\text{Area}(D)}\iint_D f\,dA\).</p>`,
    ex: { q: T`Evaluate \(\displaystyle\int_0^1\!\int_x^1 e^{y^2}\,dy\,dx\).`, a: T`
<p>\(e^{y^2}\) has no elementary antiderivative, so reverse. The region is \(0\le x\le y\le 1\):</p>
\[\int_0^1\!\int_0^y e^{y^2}\,dx\,dy = \int_0^1 y e^{y^2}\,dy = \frac{e-1}{2}.\]` },
    trap: T`Swapping the limits without redrawing the region. The new inner limits must be functions of the new outer variable.` },

  { title: 'Polar, cylindrical, spherical', skill: 'Multiple integrals', body: T`
<table class="tt"><tr><th>System</th><th>Coordinates</th><th>Element</th></tr>
<tr><td>Polar</td><td>\(x = r\cos\theta\)<br>\(y = r\sin\theta\)</td><td>\(r\,dr\,d\theta\)</td></tr>
<tr><td>Cylindrical</td><td>polar plus \(z\)</td><td>\(r\,dz\,dr\,d\theta\)</td></tr>
<tr><td>Spherical</td><td>\(x=\rho\sin\phi\cos\theta\)<br>\(y=\rho\sin\phi\sin\theta\)<br>\(z=\rho\cos\phi\)</td><td>\(\rho^2\sin\phi\)<br>\(d\rho\,d\phi\,d\theta\)</td></tr></table>
<p>General substitution: \(dA = \left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv\).</p>`,
    ex: { q: T`Evaluate \(\iint_{x^2+y^2\le4} e^{-(x^2+y^2)}\,dA\).`, a: T`
\[\int_0^{2\pi}\!\int_0^2 e^{-r^2}\,r\,dr\,d\theta = 2\pi\cdot\frac{1-e^{-4}}{2} = \pi(1-e^{-4})\]` },
    trap: T`Forgetting the Jacobian factor \(r\) or \(\rho^2\sin\phi\). Without it the integral is not an area or volume.` },

  { title: 'Vector fields, divergence, curl', skill: 'Vector fields', body: T`
<p>For \(\mathbf F = \langle P,Q,R\rangle\):</p>
\[\nabla\cdot\mathbf F = P_x + Q_y + R_z\]\[\begin{aligned}\nabla\times\mathbf F = \langle\, &R_y - Q_z,\\ &P_z - R_x,\\ &Q_x - P_y\,\rangle\end{aligned}\]
<p>Divergence measures net outflow per unit volume; curl measures local rotation. Identities: \(\nabla\times\nabla f = \mathbf 0\) and \(\nabla\cdot(\nabla\times\mathbf F) = 0\).</p>`,
    ex: { q: T`Find the divergence and curl of \(\mathbf F = \langle x^2y,\ yz,\ xz\rangle\).`, a: T`
<p>\(\nabla\cdot\mathbf F = 2xy + z + x\).</p>
<p>\(\nabla\times\mathbf F = \langle 0 - y,\ 0 - z,\ 0 - x^2\rangle = \langle -y,\ -z,\ -x^2\rangle\).</p>` },
    trap: T`Mixing up the order in the curl components. Expand the determinant with \(\nabla\) in the second row to get it right every time.` },

  { title: 'Line integrals and conservative fields', skill: 'Vector fields', body: T`
<p>Work along \(C\): \(\int_C\mathbf F\cdot d\mathbf r = \int_a^b\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt\). Scalar: \(\int_C f\,ds = \int_a^b f(\mathbf r(t))|\mathbf r'(t)|\,dt\).</p>
<p>If \(\mathbf F = \nabla f\), the integral is \(f(B) - f(A)\), independent of path, and zero around any closed loop. In 2D on a simply connected domain, \(\mathbf F\) is conservative iff \(P_y = Q_x\).</p>`,
    ex: { q: T`Evaluate \(\int_C y\,dx + x\,dy\) along any path from \((0,0)\) to \((2,3)\).`, a: T`
<p>\(P_y = 1 = Q_x\), and \(f = xy\) works. The integral is \(f(2,3) - f(0,0) = 6\).</p>` },
    trap: T`Applying the curl test on a domain with a hole. \(\frac{\langle -y, x\rangle}{x^2+y^2}\) has zero curl but circulates \(2\pi\) around the origin.` },

  { title: "Green's theorem", skill: 'Vector theorems', body: T`
\[\oint_C P\,dx + Q\,dy = \iint_D (Q_x - P_y)\,dA\]
<p>\(C\) is the positively oriented (counterclockwise) boundary of \(D\). A useful special case computes area: \(\text{Area} = \frac12\oint_C x\,dy - y\,dx\).</p>`,
    ex: { q: T`Evaluate \(\oint_C -y\,dx + x\,dy\) around the unit circle.`, a: T`
<p>\(Q_x - P_y = 1 - (-1) = 2\), so the integral is \(\iint_D 2\,dA = 2\pi\).</p>` },
    trap: T`Using a clockwise boundary without flipping the sign.` },

  { title: 'Stokes and the divergence theorem', skill: 'Vector theorems', body: T`
<p>Stokes, with \(\partial S\) oriented by the right-hand rule relative to the surface normal:</p>
\[\oint_{\partial S}\mathbf F\cdot d\mathbf r = \iint_S(\nabla\times\mathbf F)\cdot d\mathbf S\]
<p>Divergence, for a closed surface with outward normal:</p>
\[\oiint_{\partial E}\mathbf F\cdot d\mathbf S = \iiint_E\nabla\cdot\mathbf F\,dV\]
<p>Surface integrals: for \(\mathbf r(u,v)\), \(d\mathbf S = (\mathbf r_u\times\mathbf r_v)\,du\,dv\).</p>`,
    ex: { q: T`Find the outward flux of \(\mathbf F = \langle x,y,z\rangle\) through the sphere of radius \(a\).`, a: T`
<p>\(\nabla\cdot\mathbf F = 3\), so the flux is \(3\cdot\frac43\pi a^3 = 4\pi a^3\). Directly: \(\mathbf F\cdot\mathbf n = a\) on the sphere, times area \(4\pi a^2\).</p>` },
    trap: T`Applying the divergence theorem to an open surface. Close it with a cap, then subtract the cap's flux.` }
]);
