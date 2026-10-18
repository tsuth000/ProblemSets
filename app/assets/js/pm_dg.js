'use strict';
// Pure math track, stage 3: Differential geometry. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'dg', name: 'Differential geometry', color: '#7A3E62', blurb: 'Curves, curvature and torsion, surfaces, fundamental forms, Gaussian curvature, Gauss-Bonnet, geodesics, manifolds, differential forms, Riemannian metrics', questions: [], generators: [] });
  const U = ['Curves and arc length', 'Curvature and torsion', 'The Frenet frame', 'Surfaces and the first fundamental form', 'Gaussian and mean curvature', 'The Gauss–Bonnet theorem', 'Geodesics and Christoffel symbols', 'Manifolds and tangent spaces', 'Differential forms and Stokes', 'Riemannian metrics and intrinsic curvature'];

  registerLearn('dg', [
    { title: U[0], skill: U[0],
      hook: T`<p>Differential geometry applies calculus to curved shapes. For a curve, the first invariant is length, which does not depend on how fast you travel along it.</p>`,
      body: T`
<p>A parametrized curve \(\mathbf r(t)\) has velocity \(\mathbf r'(t)\) and speed \(|\mathbf r'(t)|\). <b>Arc length:</b></p>
\[L = \int_a^b|\mathbf r'(t)|\,dt\]
<p><b>Examples.</b></p>
<ul><li>Circle \((a\cos t, a\sin t)\): speed \(a\), length \(2\pi a\).</li>
<li>Helix \((a\cos t, a\sin t, bt)\): speed \(\sqrt{a^2 + b^2}\), so \(L = T\sqrt{a^2 + b^2}\) for \(0 \le t \le T\).</li>
<li>Graph \(y = f(x)\): \(L = \int\sqrt{1 + f'(x)^2}\,dx\). For \(y = \cosh x\) on \([0, c]\): \(\sqrt{1 + \sinh^2x} = \cosh x\), so \(L = \sinh c\).</li></ul>
<p><b>Arc length parameter.</b> \(s(t) = \int_a^t|\mathbf r'|\) lets you reparametrize at unit speed. Geometric quantities (curvature, torsion) are defined with respect to \(s\), so they do not depend on the parametrization.</p>
<p><b>Regular curve:</b> \(\mathbf r' \ne 0\). The cusp \((t^2, t^3)\) at \(t = 0\) is not regular.</p>`,
      ex: { q: T`Find the length of \(\mathbf r(t) = (t^2, \frac23t^3)\) for \(0 \le t \le \sqrt3\).`, a: T`<p>\(\mathbf r' = (2t, 2t^2)\), speed \(2t\sqrt{1 + t^2}\). \(L = \int_0^{\sqrt3}2t\sqrt{1 + t^2}\,dt = \frac23(1 + t^2)^{3/2}\Big|_0^{\sqrt3} = \frac23(8 - 1) = \frac{14}{3}\).</p>` },
      trap: T`Integrating the velocity vector instead of its length.`,
      vary: [[T`Length of the helix \((3\cos t, 3\sin t, 4t)\), \(0 \le t \le 2\pi\), four decimals.`, 10 * Math.PI, T`\(5\cdot2\pi\).`], [T`Length of \(y = \cosh x\) on \([0, \ln 3]\), four decimals.`, Math.sinh(Math.log(3)), T`\(\sinh\ln3 = \frac43\).`], [T`Speed of \((\cos2t, \sin2t)\)?`, 2, T`Radius 1, angular rate 2.`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Curvature measures how fast a curve turns; torsion measures how fast it twists out of its plane. Together they determine a space curve up to rigid motion.</p>`,
      body: T`
<p><b>Curvature</b> \(\kappa = \left|\frac{d\mathbf T}{ds}\right|\), the turning rate of the unit tangent per unit length. For any parametrization:</p>
\[\kappa = \frac{|\mathbf r' \times \mathbf r''|}{|\mathbf r'|^3},\qquad \tau = \frac{(\mathbf r' \times \mathbf r'')\cdot\mathbf r'''}{|\mathbf r' \times \mathbf r''|^2}\]
<p><b>Plane graph</b> \(y = f(x)\): \(\kappa = \frac{|f''|}{(1 + f'^2)^{3/2}}\). At a critical point it is \(|f''|\). The radius of curvature is \(\frac1\kappa\), the radius of the best-fitting (osculating) circle.</p>
<table class="tt"><tr><th>Curve</th><th>\(\kappa\)</th><th>\(\tau\)</th></tr>
<tr><td>Line</td><td>0</td><td>0</td></tr>
<tr><td>Circle of radius \(a\)</td><td>\(\frac1a\)</td><td>0</td></tr>
<tr><td>Helix \((a\cos t, a\sin t, bt)\)</td><td>\(\frac{a}{a^2 + b^2}\)</td><td>\(\frac{b}{a^2 + b^2}\)</td></tr></table>
<p><b>Torsion zero</b> (with \(\kappa \ne 0\)) means the curve lies in a plane. A helix has constant curvature and torsion; conversely, constant \(\kappa\) and \(\tau\) force a helix.</p>
<p><b>Example.</b> \(y = x^2\) at \(x = 1\): \(\kappa = \frac{2}{(1 + 4)^{3/2}} = \frac{2}{5\sqrt5} \approx 0.179\).</p>`,
      ex: { q: T`Find the curvature and torsion of \((2\cos t, 2\sin t, t)\).`, a: T`<p>\(a = 2\), \(b = 1\): \(\kappa = \frac{2}{5} = 0.4\), \(\tau = \frac15 = 0.2\).</p>` },
      trap: T`Using \(|f''|\) as the curvature away from critical points. The denominator \((1 + f'^2)^{3/2}\) matters.`,
      vary: [[T`Curvature of a circle of radius 4?`, 0.25, T`\(\frac14\).`], [T`Curvature of \(y = x^3\) at \(x = 0\)?`, 0, T`Inflection.`], [T`Curvature of \(y = x^2\) at the vertex?`, 2, T`\(|f''|\).`], [T`Torsion of the helix \((\cos t, \sin t, t)\)?`, 0.5, T`\(\frac{1}{2}\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>At each point of a space curve sits a moving frame of three perpendicular unit vectors: tangent, normal, and binormal. The Frenet–Serret equations describe how the frame rotates, with curvature and torsion as the rates.</p>`,
      body: T`
<p><b>Frame.</b> \(\mathbf T = \frac{\mathbf r'}{|\mathbf r'|}\); \(\mathbf N = \frac{\mathbf T'}{|\mathbf T'|}\) points toward the center of curvature; \(\mathbf B = \mathbf T \times \mathbf N\) is normal to the osculating plane.</p>
<p><b>Frenet–Serret equations</b> (derivatives in arc length):</p>
\[\mathbf T' = \kappa\mathbf N,\qquad \mathbf N' = -\kappa\mathbf T + \tau\mathbf B,\qquad \mathbf B' = -\tau\mathbf N\]
<p><b>Helix example.</b> \(\mathbf r = (a\cos t, a\sin t, bt)\), \(c = \sqrt{a^2 + b^2}\):</p>
<ul><li>\(\mathbf T = \frac1c(-a\sin t, a\cos t, b)\)</li>
<li>\(\mathbf N = (-\cos t, -\sin t, 0)\), pointing straight at the axis</li>
<li>\(\mathbf B = \frac1c(b\sin t, -b\cos t, a)\)</li></ul>
<p><b>Acceleration splits</b> into tangential and normal parts: \(\mathbf a = \frac{dv}{dt}\mathbf T + \kappa v^2\mathbf N\). Driving around a curve at speed \(v\), the sideways acceleration is \(\kappa v^2 = \frac{v^2}{\rho}\).</p>
<p><b>Fundamental theorem of curves.</b> Given smooth \(\kappa(s) > 0\) and \(\tau(s)\), there is a curve with these as curvature and torsion, unique up to a rigid motion.</p>`,
      ex: { q: T`Find \(\mathbf T\) and \(\mathbf B\) for \((3\cos t, 3\sin t, 4t)\) at \(t = 0\).`, a: T`<p>\(c = 5\). \(\mathbf T = \frac15(0, 3, 4)\). \(\mathbf N = (-1, 0, 0)\). \(\mathbf B = \frac15(0, -4, 3)\). Check: \(\mathbf T \times \mathbf N = \frac15(0\cdot0 - 4\cdot0, 4\cdot(-1) - 0, 0 - 3\cdot(-1)) = \frac15(0, -4, 3)\).</p>` },
      trap: T`Normalizing \(\mathbf r''\) to get \(\mathbf N\). The normal comes from \(\mathbf T'\), which removes the tangential part of the acceleration.`,
      vary: [[T`Normal acceleration at speed 20 on a curve with \(\kappa = 0.01\)?`, 4, T`\(\kappa v^2\).`], [T`\(\mathbf T\cdot\mathbf N\)?`, 0, T`Perpendicular.`], [T`\(|\mathbf B|\)?`, 1, T`Unit vector.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>A parametrized surface carries a ruler: the first fundamental form, which converts parameter changes into lengths. Lengths, angles, and areas on the surface all come from three functions \(E\), \(F\), \(G\).</p>`,
      body: T`
<p>For \(\mathbf x(u, v)\), the tangent vectors \(\mathbf x_u\), \(\mathbf x_v\) give</p>
\[E = \mathbf x_u\cdot\mathbf x_u,\quad F = \mathbf x_u\cdot\mathbf x_v,\quad G = \mathbf x_v\cdot\mathbf x_v\]
<p>and \(ds^2 = E\,du^2 + 2F\,du\,dv + G\,dv^2\). <b>Area element:</b> \(dA = \sqrt{EG - F^2}\,du\,dv\).</p>
<table class="tt"><tr><th>Surface</th><th>\(E, F, G\)</th></tr>
<tr><td>Sphere, angles \((\phi, \theta)\)</td><td>\(R^2, 0, R^2\sin^2\phi\)</td></tr>
<tr><td>Cylinder, \((\theta, z)\)</td><td>\(R^2, 0, 1\)</td></tr>
<tr><td>Graph \(z = f(x, y)\)</td><td>\(1 + f_x^2,\ f_xf_y,\ 1 + f_y^2\)</td></tr></table>
<p>(The sphere is \((R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi)\); the cylinder is \((R\cos\theta, R\sin\theta, z)\).)</p>
<p><b>Areas.</b> Sphere: \(\int_0^{2\pi}\int_0^\pi R^2\sin\phi\,d\phi\,d\theta = 4\pi R^2\). The zone between heights \(z_1\) and \(z_2\) has area \(2\pi R(z_2 - z_1)\) (Archimedes). Torus with tube radius \(r\) and center radius \(R\): \(4\pi^2Rr\).</p>
<p><b>Isometries</b> preserve \(E, F, G\). A cylinder unrolls isometrically onto a plane (same \(E, F, G\) as \((R\theta, z)\)); a sphere cannot, which is why every flat map distorts.</p>`,
      ex: { q: T`For \(z = x^2 + y^2\), find \(E, F, G\) at \((1, 2)\).`, a: T`<p>\(f_x = 2x = 2\), \(f_y = 2y = 4\). \(E = 1 + 4 = 5\), \(F = 8\), \(G = 1 + 16 = 17\). \(EG - F^2 = 85 - 64 = 21\).</p>` },
      trap: T`Forgetting the cross term \(F\) in the area element.`,
      vary: [[T`Area of a sphere zone, \(R = 5\), between \(z = 1\) and \(z = 3\), four decimals.`, 20 * Math.PI, T`\(2\pi\cdot5\cdot2\).`], [T`Torus area with \(R = 3\), \(r = 1\), four decimals.`, 12 * Math.PI ** 2, T`\(4\pi^2\cdot3\).`], [T`\(G\) for the cylinder of radius 2 in \((\theta, z)\)?`, 1, T`\(\mathbf x_z = (0, 0, 1)\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>At each point a surface bends most in one direction and least in the perpendicular one. The product of those two principal curvatures, the Gaussian curvature, tells domes (positive) from saddles (negative) from cylinders (zero).</p>`,
      body: T`
<p><b>Second fundamental form.</b> With unit normal \(\mathbf n\): \(L = \mathbf x_{uu}\cdot\mathbf n\), \(M = \mathbf x_{uv}\cdot\mathbf n\), \(N = \mathbf x_{vv}\cdot\mathbf n\). The principal curvatures \(k_1, k_2\) are the extreme normal curvatures.</p>
\[K = k_1k_2 = \frac{LN - M^2}{EG - F^2},\qquad H = \frac{k_1 + k_2}{2}\]
<p><b>Graphs</b> \(z = f(x, y)\):</p>
\[K = \frac{f_{xx}f_{yy} - f_{xy}^2}{(1 + f_x^2 + f_y^2)^2}\]
<p>At a critical point this is the Hessian determinant. So \(z = ax^2 + bxy + cy^2\) has \(K = 4ac - b^2\) at the origin: positive for a bowl, negative for a saddle.</p>
<table class="tt"><tr><th>Surface</th><th>\(K\)</th><th>\(H\)</th></tr>
<tr><td>Plane</td><td>0</td><td>0</td></tr>
<tr><td>Sphere radius \(R\)</td><td>\(\frac1{R^2}\)</td><td>\(\frac1R\)</td></tr>
<tr><td>Cylinder radius \(R\)</td><td>0</td><td>\(\frac{1}{2R}\)</td></tr>
<tr><td>Saddle \(z = xy\) at 0</td><td>\(-1\)</td><td>0</td></tr></table>
<p><b>Minimal surfaces</b> have \(H = 0\): soap films, the catenoid, the helicoid. <b>Theorema Egregium</b> (Gauss): \(K\) depends only on \(E, F, G\), so it is preserved by bending without stretching. That is why a pizza slice stiffens when you curl its crust: one direction is forced to stay flat.</p>`,
      ex: { q: T`Find \(K\) for \(z = x^2 - y^2 + xy\) at the origin and at \((1, 0)\).`, a: T`<p>\(f_{xx} = 2\), \(f_{yy} = -2\), \(f_{xy} = 1\): numerator \(-4 - 1 = -5\). At the origin \(K = -5\). At \((1, 0)\): \(f_x = 2\), \(f_y = 1\), so \(K = \frac{-5}{(1 + 4 + 1)^2} = -\frac{5}{36}\).</p>` },
      trap: T`Treating zero Gaussian curvature as flatness in every sense. A cylinder has \(K = 0\) but \(H \ne 0\).`,
      vary: [[T`\(K\) of a sphere of radius 2?`, 0.25, T`\(\frac1{R^2}\).`], [T`\(K\) of \(z = 3x^2 + 2y^2\) at 0?`, 24, T`\(6\cdot4\).`], [T`\(K\) of \(z = xy\) at 0?`, -1, T`\(0 - 1\).`], [T`\(H\) of a cylinder of radius 5?`, 0.1, T`\(\frac{1}{10}\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Add up the Gaussian curvature over a closed surface and you get \(2\pi\) times its Euler characteristic, no matter how the surface is bent. Local geometry integrates to global topology.</p>`,
      body: T`
<p><b>Gauss–Bonnet (closed surface).</b></p>
\[\int_SK\,dA = 2\pi\chi(S)\]
<p>Sphere: \(\frac{1}{R^2}\cdot4\pi R^2 = 4\pi = 2\pi\cdot2\). Torus: \(0\), with positive curvature on the outside cancelling negative curvature on the inside. Genus \(g\): \(4\pi(1 - g)\).</p>
<p><b>With boundary:</b> \(\int_RK\,dA + \int_{\partial R}k_g\,ds + \sum(\text{exterior angles}) = 2\pi\chi(R)\).</p>
<p><b>Geodesic triangles.</b> Sides are geodesics (\(k_g = 0\)), so the interior angles satisfy</p>
\[\alpha + \beta + \gamma = \pi + \int_\Delta K\,dA\]
<p>On a sphere of radius \(R\), the angle excess is \(\frac{\text{Area}}{R^2}\). The triangle with vertices at the north pole and two equator points a quarter turn apart has three right angles: excess \(\frac\pi2\), area \(\frac{4\pi R^2}{8}\). On a surface of curvature \(-1\), angle sums fall short of \(\pi\) by the area.</p>
<p><b>Polyhedral version (Descartes).</b> The angle defects (\(2\pi\) minus the face angles at each vertex) sum to \(2\pi\chi = 4\pi\) for a convex polyhedron: a cube has 8 vertices with defect \(\frac\pi2\) each.</p>`,
      ex: { q: T`A geodesic triangle on a sphere of radius 2 has angles 80°, 70°, 60°. Find its area.`, a: T`<p>Excess \(210° - 180° = 30° = \frac\pi6\). Area \(= R^2\cdot\frac\pi6 = \frac{2\pi}{3} \approx 2.094\).</p>` },
      trap: T`Forgetting the factor \(R^2\): the excess equals \(\int K\,dA = \frac{\text{Area}}{R^2}\).`,
      vary: [[T`\(\int K\,dA\) for a genus 2 surface, divided by \(\pi\)?`, -4, T`\(4\pi(1 - 2)\).`], [T`\(\int K\,dA\) for an ellipsoid, divided by \(\pi\)?`, 4, T`It is a sphere topologically.`], [T`Angle defect at each vertex of a regular tetrahedron, divided by \(\pi\)?`, 1, T`\(2\pi - 3\cdot\frac\pi3\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Geodesics are the straightest possible paths on a surface: they never turn left or right as seen from within the surface. Locally they are the shortest routes, like great circles on a globe.</p>`,
      body: T`
<p><b>Geodesic equation.</b> In coordinates with metric \(g_{ij}\):</p>
\[\ddot x^k + \Gamma^k_{ij}\dot x^i\dot x^j = 0,\qquad \Gamma^k_{ij} = \tfrac12g^{kl}(\partial_ig_{jl} + \partial_jg_{il} - \partial_lg_{ij})\]
<p><b>Christoffel symbols for \(ds^2 = dr^2 + f(r)^2d\theta^2\):</b> \(\Gamma^r_{\theta\theta} = -ff'\), \(\Gamma^\theta_{r\theta} = \Gamma^\theta_{\theta r} = \frac{f'}{f}\), all others 0. Polar coordinates on the plane (\(f = r\)): \(\Gamma^r_{\theta\theta} = -r\), \(\Gamma^\theta_{r\theta} = \frac1r\). Unit sphere (\(f = \sin r\)): \(-\sin r\cos r\) and \(\cot r\).</p>
<p><b>Great circles.</b> On a sphere the geodesics are great circles. The distance between points at latitude/longitude \((\varphi_1, \lambda_1)\) and \((\varphi_2, \lambda_2)\) is \(R\theta\), with</p>
\[\begin{aligned}\cos\theta = {}&\sin\varphi_1\sin\varphi_2\\ &+ \cos\varphi_1\cos\varphi_2\cos(\lambda_1 - \lambda_2)\end{aligned}\]
<p>(the angle between the two position vectors).</p>
<p><b>Clairaut's relation.</b> On a surface of revolution, a geodesic satisfies \(\rho\cos\psi = \text{const}\), where \(\rho\) is the distance to the axis and \(\psi\) the angle with the parallels. Meridians are always geodesics; a parallel is one only where the radius is extremal (like the equator).</p>`,
      ex: { q: T`Two cities on the equator (\(R = 6371\) km) are 90° of longitude apart. Find their great-circle distance.`, a: T`<p>\(\theta = 90° = \frac\pi2\). Distance \(6371\cdot\frac\pi2 \approx 10{,}008\) km, a quarter of the equator.</p>` },
      trap: T`Following a parallel of latitude: except at the equator, it is not a geodesic and is longer than the great-circle route.`,
      vary: [[T`\(\Gamma^r_{\theta\theta}\) in polar coordinates at \(r = 3\)?`, -3, T`\(-r\).`], [T`\(\Gamma^\theta_{r\theta}\) in polar coordinates at \(r = 4\)?`, 0.25, T`\(\frac1r\).`], [T`Angular distance (degrees) from the north pole to the equator?`, 90, T`Quarter turn.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>A manifold is a space that looks like \(\mathbb R^n\) near each point, even if globally it does not. Spheres, tori, and groups of rotations are all manifolds, and calculus works on them chart by chart.</p>`,
      body: T`
<p><b>Smooth manifold of dimension \(n\):</b> a space covered by charts (homeomorphisms of open pieces onto open sets of \(\mathbb R^n\)) whose transition maps are smooth. The sphere \(S^2\) needs at least two charts (stereographic projection from each pole).</p>
<p><b>Regular value theorem.</b> If \(F: \mathbb R^m \to \mathbb R^k\) is smooth and \(c\) is a regular value (\(DF\) has rank \(k\) on \(F^{-1}(c)\)), then \(F^{-1}(c)\) is a manifold of dimension \(m - k\). The sphere \(x^2 + y^2 + z^2 = 1\) has dimension \(3 - 1 = 2\); a curve cut out by two equations in \(\mathbb R^3\) has dimension 1.</p>
<p><b>Tangent space</b> \(T_pM\): the velocities of curves through \(p\), a vector space of dimension \(n\). For a level set, \(T_pM = \ker DF(p)\).</p>
<p><b>Matrix groups</b> (Lie groups):</p>
<table class="tt"><tr><th>Group</th><th>Dimension</th></tr>
<tr><td>\(GL_n(\mathbb R)\)</td><td>\(n^2\)</td></tr>
<tr><td>\(SL_n(\mathbb R)\)</td><td>\(n^2 - 1\)</td></tr>
<tr><td>\(O(n)\), \(SO(n)\)</td><td>\(\frac{n(n - 1)}{2}\)</td></tr>
<tr><td>\(U(n)\)</td><td>\(n^2\)</td></tr>
<tr><td>\(SU(n)\)</td><td>\(n^2 - 1\)</td></tr></table>
<p>\(SO(3)\), the rotations of space, has dimension 3 (axis direction plus angle) and is diffeomorphic to \(\mathbb{RP}^3\). \(SU(2)\) is the 3-sphere.</p>
<p><b>Orientability</b> and <b>compactness</b> are global properties: the Möbius band is a non-orientable 2-manifold with boundary.</p>`,
      ex: { q: T`What is the dimension of \(\{(x, y, z, w) : x^2 + y^2 = 1,\ z^2 + w^2 = 1\}\), and what is it?`, a: T`<p>Two independent equations in \(\mathbb R^4\): dimension 2. It is \(S^1 \times S^1\), a torus (the flat Clifford torus).</p>` },
      trap: T`Counting the equations defining \(O(n)\) as \(n^2\). \(A^TA = I\) is symmetric, so only \(\frac{n(n + 1)}{2}\) equations are independent.`,
      vary: [[T`\(\dim SO(4)\)?`, 6, T`\(\frac{4\cdot3}{2}\).`], [T`\(\dim SU(3)\)?`, 8, T`\(9 - 1\).`], [T`Dimension of a regular level set of \(F: \mathbb R^5 \to \mathbb R^2\)?`, 3, T`\(5 - 2\).`], [T`\(\dim T_pS^4\)?`, 4, T`Same as the manifold.`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Differential forms are the things you integrate over curves, surfaces, and higher-dimensional pieces. One rule, Stokes' theorem, unifies the fundamental theorem of calculus, Green's theorem, and the divergence theorem.</p>`,
      body: T`
<p><b>Forms on \(\mathbb R^2\).</b> 0-forms are functions, 1-forms \(P\,dx + Q\,dy\), 2-forms \(f\,dx \wedge dy\). The wedge product is antisymmetric: \(dy \wedge dx = -dx \wedge dy\), \(dx \wedge dx = 0\).</p>
<p><b>Exterior derivative.</b> \(df = f_x\,dx + f_y\,dy\), and</p>
\[d(P\,dx + Q\,dy) = (Q_x - P_y)\,dx \wedge dy\]
<p>Always \(d(d\omega) = 0\) (mixed partials commute). A form is <b>closed</b> if \(d\omega = 0\) and <b>exact</b> if \(\omega = d\eta\). Exact implies closed; on \(\mathbb R^2 \setminus \{0\}\), \(\frac{-y\,dx + x\,dy}{x^2 + y^2}\) is closed but not exact (its loop integral is \(2\pi\)).</p>
<p><b>Stokes' theorem:</b> \(\int_Md\omega = \int_{\partial M}\omega\). In the plane this is Green's theorem:</p>
\[\oint_{\partial D}P\,dx + Q\,dy = \iint_D(Q_x - P_y)\,dA\]
<p><b>Area from the boundary.</b> With \(\omega = \frac12(x\,dy - y\,dx)\), \(d\omega = dx \wedge dy\), so Area \(= \frac12\oint(x\,dy - y\,dx)\). For the ellipse \((a\cos t, b\sin t)\): \(\frac12\int_0^{2\pi}ab\,dt = \pi ab\).</p>
<p>In \(\mathbb R^3\), \(d\) on 0-, 1-, and 2-forms is gradient, curl, and divergence, and \(d^2 = 0\) is "curl grad = 0" and "div curl = 0".</p>`,
      ex: { q: T`For \(\omega = x^2y\,dx + xy^2\,dy\), find \(d\omega\) and \(\oint\omega\) around the unit square \([0, 1]^2\) (counterclockwise).`, a: T`<p>\(d\omega = (y^2 - x^2)\,dx \wedge dy\). Green: \(\iint_{[0,1]^2}(y^2 - x^2) = \frac13 - \frac13 = 0\).</p>` },
      trap: T`Getting the sign of \(Q_x - P_y\) backwards.`,
      vary: [[T`Area of the ellipse \((3\cos t, 2\sin t)\) by Green, four decimals.`, 6 * Math.PI, T`\(\pi ab\).`], [T`\(d\omega\) coefficient for \(\omega = -y\,dx + x\,dy\)?`, 2, T`\(1 + 1\).`], [T`\(d(df)\) for any smooth \(f\)?`, 0, T`\(d^2 = 0\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Riemann's insight: a space can carry its own notion of distance with no surrounding space at all. The metric alone determines curvature, and this is the mathematics of general relativity.</p>`,
      body: T`
<p>A <b>Riemannian metric</b> assigns an inner product \(g_p\) to each tangent space, smoothly. In coordinates \(ds^2 = g_{ij}\,dx^i\,dx^j\).</p>
<p><b>Curvature of a 2D metric</b> \(ds^2 = dr^2 + G(r)\,d\theta^2\) (geodesic polar form):</p>
\[K = -\frac{(\sqrt G)''}{\sqrt G}\]
<table class="tt"><tr><th>\(\sqrt G\)</th><th>\(K\)</th><th>Geometry</th></tr>
<tr><td>\(r\)</td><td>0</td><td>flat plane</td></tr>
<tr><td>\(a\sin\frac ra\)</td><td>\(\frac{1}{a^2}\)</td><td>sphere of radius \(a\)</td></tr>
<tr><td>\(a\sinh\frac ra\)</td><td>\(-\frac{1}{a^2}\)</td><td>hyperbolic plane</td></tr></table>
<p><b>Hyperbolic plane.</b> The upper half-plane with \(ds^2 = \frac{dx^2 + dy^2}{y^2}\) has \(K = -1\). Geodesics are vertical lines and semicircles centered on the \(x\)-axis. Circumferences grow exponentially: a circle of radius \(r\) has length \(2\pi\sinh r\).</p>
<p><b>Conformal metrics</b> \(ds^2 = e^{2\varphi}(dx^2 + dy^2)\) have \(K = -e^{-2\varphi}\Delta\varphi\). For the half-plane, \(\varphi = -\ln y\): \(\Delta\varphi = \frac{1}{y^2}\), \(K = -y^2\cdot\frac{1}{y^2} = -1\).</p>
<p><b>Higher dimensions.</b> Curvature becomes the Riemann tensor \(R^i{}_{jkl}\); contracting gives the Ricci tensor, which Einstein's equation \(R_{\mu\nu} - \frac12Rg_{\mu\nu} = 8\pi GT_{\mu\nu}\) ties to matter and energy.</p>`,
      ex: { q: T`Find \(K\) for \(ds^2 = dr^2 + 9\sin^2\frac r3\,d\theta^2\), and the circumference of the circle \(r = \frac{3\pi}{2}\).`, a: T`<p>\(\sqrt G = 3\sin\frac r3\), \((\sqrt G)'' = -\frac13\sin\frac r3\), so \(K = \frac19\): a sphere of radius 3. Circumference \(2\pi\sqrt G = 2\pi\cdot3\sin\frac\pi2 = 6\pi\), the equator.</p>` },
      trap: T`Applying the formula to \(G\) instead of \(\sqrt G\).`,
      vary: [[T`\(K\) for \(\sqrt G = 2\sinh\frac r2\)?`, -0.25, T`\(-\frac14\).`], [T`Circumference of a hyperbolic circle of radius 1 (\(K = -1\)), four decimals.`, 2 * Math.PI * Math.sinh(1), T`\(2\pi\sinh1\).`], [T`\(K\) of the upper half-plane metric?`, -1, T`Computed above.`]] }
  ]);

  addQuestions('dg', [
    { id: 'dg1', skill: U[1], q: T`A space curve with nonzero curvature lies in a plane exactly when:`, c: ['its torsion is identically 0', 'its curvature is constant', 'it is a helix', 'its speed is constant'], x: T`\(\mathbf B\) is constant iff \(\tau = 0\).` },
    { id: 'dg2', skill: U[4], q: T`Gauss's Theorema Egregium says Gaussian curvature:`, c: ['depends only on the first fundamental form', 'depends on the embedding in space', 'is always positive', 'equals the mean curvature'], x: T`It is intrinsic, preserved under bending without stretching.` },
    { id: 'dg3', skill: U[4], q: T`Which surface has \(K = 0\) but is not a plane?`, c: ['a cylinder', 'a sphere', 'a saddle', 'a torus'], x: T`One principal curvature is 0.` },
    { id: 'dg4', skill: U[5], q: T`The total Gaussian curvature of a torus is:`, c: ['0', T`\(4\pi\)`, T`\(-4\pi\)`, T`\(2\pi\)`], x: T`\(2\pi\chi = 0\).` },
    { id: 'dg5', skill: U[6], q: T`The geodesics of a round sphere are:`, c: ['great circles', 'parallels of latitude', 'all circles', 'spirals'], x: T`They are cut out by planes through the center.` },
    { id: 'dg6', skill: U[8], q: T`Stokes' theorem \(\int_Md\omega = \int_{\partial M}\omega\) in the plane is:`, c: [T`Green's theorem`, 'the divergence theorem in space', 'the mean value theorem', 'Gauss–Bonnet'], x: T`With \(\omega = P\,dx + Q\,dy\).` },
    { id: 'dg7', skill: U[9], q: T`In the hyperbolic plane, the angle sum of a geodesic triangle is:`, c: [T`less than \(\pi\)`, T`exactly \(\pi\)`, T`more than \(\pi\)`, T`always \(\frac\pi2\)`], x: T`\(K = -1\) makes the excess negative.` }
  ]);

  // ======================= GENERATORS =======================
  registerUnitGens('dg', { units: {
    [U[0]]: [{ id: 'dg-len', make(R) {
      const k = R.int(0, 2), ts = "Symbol('t', real=True)";
      if (k === 0) { const a = R.int(1, 5), b = R.int(1, 5), T1 = R.pick([1, 2, Math.PI, 2 * Math.PI]), Tt = { 1: '1', 2: '2', [Math.PI]: '\\pi', [2 * Math.PI]: '2\\pi' }[T1], Tp = { 1: '1', 2: '2', [Math.PI]: 'pi', [2 * Math.PI]: '2*pi' }[T1], L = T1 * Math.hypot(a, b);
        return { q: T`Find the length of the helix \((${a}\cos t, ${a}\sin t, ${b}t)\), \(0 \le t \le ${Tt}\), to four decimals.`, answer: L, tol: 1e-4, x: T`Speed \(\sqrt{${a * a} + ${b * b}}\), constant, times \(${Tt}\).`, v: `_mp.quad(lambda t: _mp.sqrt((${a}*_mp.sin(t))**2 + (${a}*_mp.cos(t))**2 + ${b}**2), [0, ${Tp.replace('pi', '_mp.pi')}])` }; }
      if (k === 1) { const c = R.pick([1, 2, Math.log(2), Math.log(3)]), ct = { 1: '1', 2: '2', [Math.log(2)]: '\\ln 2', [Math.log(3)]: '\\ln 3' }[c]; return { q: T`Find the arc length of \(y = \cosh x\) on \([0, ${ct}]\), to four decimals.`, answer: Math.sinh(c), tol: 1e-4, x: T`\(\sqrt{1 + \sinh^2x} = \cosh x\), so \(L = \sinh(${ct}) \approx ${R.fmt(Math.sinh(c), 4)}\).`, v: `_mp.quad(lambda x: _mp.sqrt(1 + _mp.sinh(x)**2), [0, ${c}])` }; }
      const n = R.int(2, 3), T1 = R.int(1, 2); // r = (t^2, c t^3) with c = 2/3 gives speed 2t sqrt(1+t^2); use general numeric
      const cc = 2 / 3, L = (2 / 3) * ((1 + T1 * T1) ** 1.5 - 1);
      return { q: T`Find the length of \(\left(t^2, \frac23t^3\right)\) for \(0 \le t \le ${T1}\), to four decimals.`, answer: L, tol: 1e-4, x: T`Speed \(2t\sqrt{1 + t^2}\); \(L = \frac23\left[(1 + t^2)^{3/2}\right]_0^{${T1}} \approx ${R.fmt(L, 4)}\).`, v: `_mp.quad(lambda t: _mp.sqrt((2*t)**2 + (2*t**2)**2), [0, ${T1}])` };
    } }],
    [U[1]]: [{ id: 'dg-curv', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.int(1, 4), b = R.int(0, 4), ask = R.int(0, 1); if (!b && ask) return this.make(R); const v = (ask ? b : a) / (a * a + b * b);
        return { q: T`Find the ${ask ? 'torsion' : 'curvature'} of \((${a}\cos t, ${a}\sin t, ${b}t)\), to four decimals.`, answer: v, tol: 1e-4, x: T`Helix: \(\kappa = \frac{a}{a^2 + b^2}\), \(\tau = \frac{b}{a^2 + b^2}\), with \(a = ${a}\), \(b = ${b}\).`,
          v: `(lambda t: (lambda r: (lambda r1, r2, r3: ${ask ? 'r1.cross(r2).dot(r3)/r1.cross(r2).norm()**2' : 'r1.cross(r2).norm()/r1.norm()**3'})(diff(r, t), diff(r, t, 2), diff(r, t, 3)).subs(t, 0))(Matrix([${a}*cos(t), ${a}*sin(t), ${b}*t])))(Symbol('t', real=True))` }; }
      if (k === 1) { const n = R.int(2, 4), c = R.int(1, 2), x0 = R.int(0, 1); const fp = c * n * x0 ** (n - 1), fpp = c * n * (n - 1) * x0 ** (n - 2), v = Math.abs(fpp) / (1 + fp * fp) ** 1.5;
        return { q: T`Find the curvature of \(y = ${c === 1 ? '' : c}x^{${n}}\) at \(x = ${x0}\), to four decimals.`, answer: v, tol: 1e-4, x: T`\(f' = ${fp}\), \(f'' = ${fpp}\): \(\kappa = \frac{${Math.abs(fpp)}}{(1 + ${fp * fp})^{3/2}} \approx ${R.fmt(v, 4)}\).`, v: `(lambda t: (lambda r: (lambda r1, r2: r1.cross(r2).norm()/r1.norm()**3)(diff(r, t), diff(r, t, 2)).subs(t, ${x0}))(Matrix([t, ${c}*t**${n}, 0])))(Symbol('t', real=True))` }; }
      const a = R.int(1, 3), b = R.int(1, 3), t0 = R.pick([0, Math.PI / 2]), tp = t0 ? 'pi/2' : '0';
      // ellipse (a cos t, b sin t): kappa = ab/(a^2 sin^2 + b^2 cos^2)^{3/2}
      const v = a * b / (a * a * Math.sin(t0) ** 2 + b * b * Math.cos(t0) ** 2) ** 1.5;
      return { q: T`Find the curvature of the ellipse \((${a}\cos t, ${b}\sin t)\) at \(t = ${t0 ? '\\frac\\pi2' : '0'}\), to four decimals.`, answer: v, tol: 1e-4, x: T`\(\kappa = \frac{ab}{(a^2\sin^2t + b^2\cos^2t)^{3/2}} \approx ${R.fmt(v, 4)}\).`, v: `(lambda t: (lambda r: (lambda r1, r2: r1.cross(r2).norm()/r1.norm()**3)(diff(r, t), diff(r, t, 2)).subs(t, ${tp}))(Matrix([${a}*cos(t), ${b}*sin(t), 0])))(Symbol('t', real=True))` };
    } }],
    [U[2]]: [{ id: 'dg-frenet', make(R) {
      const [a, b] = R.pick([[3, 4], [4, 3], [1, 1], [5, 12], [12, 5], [2, 1], [1, 2]]), c = Math.hypot(a, b), vec = R.pick(['T', 'B']), comp = R.int(0, 2);
      const T0 = [0, a / c, b / c], B0 = [0, -b / c, a / c], val = (vec === 'T' ? T0 : B0)[comp];
      return { q: T`For the helix \((${a}\cos t, ${a}\sin t, ${b}t)\) at \(t = 0\), find the ${['first', 'second', 'third'][comp]} component of \(\mathbf ${vec}\), to four decimals.`, answer: val, tol: 1e-4, x: T`\(c = ${Number.isInteger(c) ? c : `\\sqrt{${a * a + b * b}}`}\). \(\mathbf T = \frac1c(0, ${a}, ${b})\), \(\mathbf N = (-1, 0, 0)\), \(\mathbf B = \mathbf T \times \mathbf N = \frac1c(0, -${b}, ${a})\).`,
        v: `(lambda t: (lambda r: (lambda T: (lambda N: ${vec === 'T' ? 'T' : 'T.cross(N)'})(simplify(diff(T, t)/diff(T, t).norm())))(simplify(diff(r, t)/diff(r, t).norm())).subs(t, 0)[${comp}])(Matrix([${a}*cos(t), ${a}*sin(t), ${b}*t])))(Symbol('t', real=True))` };
    } }],
    [U[3]]: [{ id: 'dg-fff', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const F = [['x^2 + y^2', 'x**2 + y**2', (x, y) => [2 * x, 2 * y]], ['xy', 'x*y', (x, y) => [y, x]], ['x^2 - y^2', 'x**2 - y**2', (x, y) => [2 * x, -2 * y]], ['x^3 + y', 'x**3 + y', (x, y) => [3 * x * x, 1]]], [t, py, g] = R.pick(F), x0 = R.int(-2, 2), y0 = R.int(-2, 2), [fx, fy] = g(x0, y0), which = R.int(0, 3);
        const vals = [1 + fx * fx, fx * fy, 1 + fy * fy, (1 + fx * fx) * (1 + fy * fy) - (fx * fy) ** 2], name = ['E', 'F', 'G', 'EG - F^2'][which];
        return { q: T`For the graph \(z = ${t}\), find \(${name}\) at \((${x0}, ${y0})\).`, answer: vals[which], x: T`\(f_x = ${fx}\), \(f_y = ${fy}\): \(E = ${vals[0]}\), \(F = ${vals[1]}\), \(G = ${vals[2]}\), \(EG - F^2 = ${vals[3]}\).`,
          v: `(lambda x, y: (lambda X: (lambda Xu, Xv: [Xu.dot(Xu), Xu.dot(Xv), Xv.dot(Xv), Xu.dot(Xu)*Xv.dot(Xv) - Xu.dot(Xv)**2][${which}])(diff(X, x).subs({x: ${x0}, y: ${y0}}), diff(X, y).subs({x: ${x0}, y: ${y0}})))(Matrix([x, y, ${py}])))(Symbol('x'), Symbol('y'))` }; }
      if (k === 1) { const Rr = R.int(1, 6), z1 = R.int(-Rr, Rr - 1), z2 = R.int(z1 + 1, Rr), A = 2 * Math.PI * Rr * (z2 - z1);
        return { q: T`Find the area of the part of the sphere of radius ${Rr} between the planes \(z = ${z1}\) and \(z = ${z2}\), to four decimals.`, answer: A, tol: 1e-4, x: T`Archimedes: \(2\pi R(z_2 - z_1) = 2\pi\cdot${Rr}\cdot${z2 - z1}\).`, v: `(lambda p, th: integrate(integrate(${Rr}**2*sin(p), (p, acos(Rational(${z2}, ${Rr})), acos(Rational(${z1}, ${Rr})))), (th, 0, 2*pi)))(Symbol('p'), Symbol('th'))` }; }
      const Rr = R.int(2, 6), r = R.int(1, Rr - 1), A = 4 * Math.PI ** 2 * Rr * r;
      return { q: T`Find the surface area of the torus with center-circle radius ${Rr} and tube radius ${r}, to two decimals.`, answer: A, tol: 0.01, x: T`\(\mathbf x = ((R + r\cos v)\cos u, (R + r\cos v)\sin u, r\sin v)\) has \(\sqrt{EG - F^2} = r(R + r\cos v)\). Integrating: \(4\pi^2Rr = 4\pi^2\cdot${Rr}\cdot${r}\).`, v: `(lambda u, w: integrate(integrate(${r}*(${Rr} + ${r}*cos(w)), (w, 0, 2*pi)), (u, 0, 2*pi)))(Symbol('u'), Symbol('w'))` };
    } }],
    [U[4]]: [{ id: 'dg-gauss', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.int(-3, 3), b = R.int(-3, 3), c = R.int(-3, 3); if (!a && !b && !c) return this.make(R); const K = 4 * a * c - b * b;
        return { q: T`Find the Gaussian curvature of \(z = ${a}x^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}xy ${c < 0 ? '-' : '+'} ${Math.abs(c)}y^2\) at the origin.`, answer: K, x: T`At a critical point \(K = f_{xx}f_{yy} - f_{xy}^2 = (${2 * a})(${2 * c}) - (${b})^2 = ${K}\). ${K > 0 ? 'A bowl.' : K < 0 ? 'A saddle.' : 'Degenerate (parabolic).'}`,
          v: `(lambda x, y: (lambda f: ((diff(f, x, 2)*diff(f, y, 2) - diff(f, x, y)**2)/(1 + diff(f, x)**2 + diff(f, y)**2)**2).subs({x: 0, y: 0}))(${a}*x**2 + ${b}*x*y + ${c}*y**2))(Symbol('x'), Symbol('y'))` }; }
      if (k === 1) { const F = [['x^2 + y^2', 'x**2 + y**2'], ['xy', 'x*y'], ['x^2 - y^2', 'x**2 - y**2'], ['x^2 + 2y^2', 'x**2 + 2*y**2']], [t, py] = R.pick(F), x0 = R.int(-1, 1), y0 = R.int(-1, 1);
        const d = { 'x**2 + y**2': [2 * x0, 2 * y0, 2, 0, 2], 'x*y': [y0, x0, 0, 1, 0], 'x**2 - y**2': [2 * x0, -2 * y0, 2, 0, -2], 'x**2 + 2*y**2': [2 * x0, 4 * y0, 2, 0, 4] }[py], K = (d[2] * d[4] - d[3] ** 2) / (1 + d[0] ** 2 + d[1] ** 2) ** 2;
        return { q: T`Find the Gaussian curvature of \(z = ${t}\) at \((${x0}, ${y0})\), to four decimals.`, answer: K, tol: 1e-4, x: T`\(K = \frac{f_{xx}f_{yy} - f_{xy}^2}{(1 + f_x^2 + f_y^2)^2} = \frac{${d[2] * d[4] - d[3] ** 2}}{(1 + ${d[0] ** 2} + ${d[1] ** 2})^2} \approx ${R.fmt(K, 4)}\).`,
          v: `(lambda x, y: (lambda X: (lambda Xu, Xv, Xuu, Xuv, Xvv: (lambda n: (Xuu.dot(n)*Xvv.dot(n) - Xuv.dot(n)**2)/(Xu.dot(Xu)*Xv.dot(Xv) - Xu.dot(Xv)**2))(Xu.cross(Xv)/Xu.cross(Xv).norm()))(diff(X, x), diff(X, y), diff(X, x, 2), diff(X, x, y), diff(X, y, 2)))(Matrix([x, y, ${py}])).subs({x: ${x0}, y: ${y0}}))(Symbol('x', real=True), Symbol('y', real=True))` }; }
      const Rr = R.int(1, 5), s = R.pick(['sphere', 'cylinder']), ask = R.int(0, 1), val = s === 'sphere' ? (ask ? 1 / Rr : 1 / (Rr * Rr)) : (ask ? 1 / (2 * Rr) : 0);
      return { q: T`Find the ${ask ? 'mean' : 'Gaussian'} curvature of a ${s} of radius ${Rr}, to four decimals.`, answer: val, tol: 1e-4, x: s === 'sphere' ? T`Both principal curvatures are \(\frac1{${Rr}}\).` : T`Principal curvatures \(\frac1{${Rr}}\) (around) and 0 (along the axis).`,
        v: `(lambda u, w: (lambda X: (lambda Xu, Xv, Xuu, Xuv, Xvv: (lambda n: (lambda E, F, G, L, M, N: ${ask ? 'abs((E*N - 2*F*M + G*L)/(2*(E*G - F**2)))' : '(L*N - M**2)/(E*G - F**2)'})(Xu.dot(Xu), Xu.dot(Xv), Xv.dot(Xv), Xuu.dot(n), Xuv.dot(n), Xvv.dot(n)))(-Xu.cross(Xv)/Xu.cross(Xv).norm()))(diff(X, u), diff(X, w), diff(X, u, 2), diff(X, u, w), diff(X, w, 2)))(${s === 'sphere' ? `Matrix([${Rr}*sin(u)*cos(w), ${Rr}*sin(u)*sin(w), ${Rr}*cos(u)])` : `Matrix([${Rr}*cos(w), ${Rr}*sin(w), u])`}).subs({u: Rational(7, 10), w: Rational(3, 10)}))(Symbol('u', real=True), Symbol('w', real=True))` };
    } }],
    [U[5]]: [{ id: 'dg-gb', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const Rr = R.int(1, 4), A = [R.int(60, 120), R.int(60, 120), R.int(40, 120)]; const ex = A.reduce((s, x) => s + x, 0) - 180; if (ex <= 0) return this.make(R); const area = Rr * Rr * ex * Math.PI / 180;
        return { q: T`A geodesic triangle on a sphere of radius ${Rr} has angles ${A.map(x => x + '°').join(', ')}. Find its area, to four decimals.`, answer: area, tol: 1e-4, x: T`Excess \(${ex}° = ${R.fmt(ex * Math.PI / 180, 5)}\) rad. Area \(= R^2\cdot\text{excess} = ${Rr * Rr}\cdot${R.fmt(ex * Math.PI / 180, 5)}\).`, v: `${Rr}**2*(${A.join(' + ')} - 180)*pi/180` }; }
      if (k === 1) { const g = R.int(0, 5); return { q: T`Find \(\int_SK\,dA\) for a closed orientable surface of genus ${g}, divided by \(\pi\).`, answer: 4 * (1 - g), x: T`Gauss–Bonnet: \(2\pi\chi = 2\pi(2 - 2\cdot${g})\), so the ratio is \(${4 * (1 - g)}\).`, v: `2*(2 - 2*${g})` }; }
      const P = [['cube', 8, 3, 90], ['regular tetrahedron', 4, 3, 60], ['regular octahedron', 6, 4, 60], ['regular icosahedron', 12, 5, 60], ['regular dodecahedron', 20, 3, 108]], [name, V, m, ang] = R.pick(P), ask = R.int(0, 1), def = 360 - m * ang;
      return { q: ask ? T`Find the total angle defect of the ${name}, in degrees.` : T`Find the angle defect at one vertex of the ${name}, in degrees.`, answer: ask ? V * def : def, x: T`Each vertex has ${m} face angles of ${ang}°: defect \(360 - ${m * ang} = ${def}°\). Total \(${V}\cdot${def} = ${V * def}° = 4\pi\), as Descartes' theorem requires.`, v: ask ? `${V}*(360 - ${m}*${ang})` : `360 - ${m}*${ang}` };
    } }],
    [U[6]]: [{ id: 'dg-geo', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const la1 = R.int(-60, 60), la2 = R.int(-60, 60), lo1 = R.int(-120, 120), lo2 = R.int(-120, 120), Rr = R.pick([1, 6371]); const d2r = Math.PI / 180;
        const c = Math.sin(la1 * d2r) * Math.sin(la2 * d2r) + Math.cos(la1 * d2r) * Math.cos(la2 * d2r) * Math.cos((lo1 - lo2) * d2r), th = Math.acos(Math.min(1, Math.max(-1, c))), D = Rr * th;
        return { q: T`On a sphere of radius ${Rr}${Rr > 1 ? ' km' : ''}, find the great-circle distance between latitude/longitude \((${la1}°, ${lo1}°)\) and \((${la2}°, ${lo2}°)\), to ${Rr > 1 ? 'the nearest km' : 'four decimals'}.`, answer: D, tol: Rr > 1 ? 1 : 1e-4, x: T`\(\cos\theta = \sin\varphi_1\sin\varphi_2 + \cos\varphi_1\cos\varphi_2\cos\Delta\lambda \approx ${R.fmt(c, 5)}\), \(\theta \approx ${R.fmt(th, 5)}\), distance \(R\theta \approx ${R.fmt(D, 4)}\).`,
          v: `(lambda p, q: ${Rr}*acos(min(1.0, max(-1.0, float(np.dot(p, q))))))(np.array([np.cos(np.radians(${la1}))*np.cos(np.radians(${lo1})), np.cos(np.radians(${la1}))*np.sin(np.radians(${lo1})), np.sin(np.radians(${la1}))]), np.array([np.cos(np.radians(${la2}))*np.cos(np.radians(${lo2})), np.cos(np.radians(${la2}))*np.sin(np.radians(${lo2})), np.sin(np.radians(${la2}))]))` }; }
      const F = [['r', 'r', 'polar coordinates on the plane'], ['\\sin r', 'sin(r)', 'the unit sphere'], ['\\sinh r', 'sinh(r)', 'the hyperbolic plane'], ['2\\sin\\frac r2', '2*sin(r/2)', 'a sphere of radius 2']], [ft, fp, desc] = R.pick(F), r0 = R.pick([0.5, 1, 1.5, 2]), which = R.int(0, 1);
      const f = { 'r': [r0, 1], 'sin(r)': [Math.sin(r0), Math.cos(r0)], 'sinh(r)': [Math.sinh(r0), Math.cosh(r0)], '2*sin(r/2)': [2 * Math.sin(r0 / 2), Math.cos(r0 / 2)] }[fp], val = which ? f[1] / f[0] : -f[0] * f[1];
      return { q: T`For \(ds^2 = dr^2 + (${ft})^2d\theta^2\) (${desc}), find \(${which ? '\\Gamma^\\theta_{r\\theta}' : '\\Gamma^r_{\\theta\\theta}'}\) at \(r = ${r0}\), to four decimals.`, answer: val, tol: 1e-4, x: T`With \(f = ${ft}\): \(\Gamma^r_{\theta\theta} = -ff'\), \(\Gamma^\theta_{r\theta} = \frac{f'}{f}\). Value \(\approx ${R.fmt(val, 4)}\).`,
        v: `(lambda r, th: christoffel(Matrix([[1, 0], [0, (${fp})**2]]), [r, th], ${which ? '1, 0, 1' : '0, 1, 1'}).subs(r, nsimplify(${r0})))(Symbol('r', positive=True), Symbol('th'))` };
    } }],
    [U[7]]: [{ id: 'dg-man', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const n = R.int(2, 6), G = R.pick([['GL_n(\\mathbb R)', n * n, 'n**2'], ['SL_n(\\mathbb R)', n * n - 1, 'n**2 - 1'], ['SO(n)', n * (n - 1) / 2, 'n*(n - 1)//2'], ['O(n)', n * (n - 1) / 2, 'n*(n - 1)//2'], ['U(n)', n * n, 'n**2'], ['SU(n)', n * n - 1, 'n**2 - 1']]), name = G[0].replace('n', n);
        const pyv = { 'GL_n(\\mathbb R)': `${n}**2`, 'SL_n(\\mathbb R)': `${n}**2 - 1`, 'SO(n)': `${n}**2 - ${n}*(${n} + 1)//2`, 'O(n)': `${n}**2 - ${n}*(${n} + 1)//2`, 'U(n)': `2*${n}**2 - ${n}**2`, 'SU(n)': `2*${n}**2 - ${n}**2 - 1` }[G[0]];
        return { q: T`What is the dimension of the Lie group \(${name}\)?`, answer: G[1], x: T`${G[0].startsWith('S') && G[0] !== 'SO(n)' ? 'Remove one dimension for the determinant condition. ' : ''}${G[0].includes('O(n)') ? T`\(A^TA = I\) imposes \(\frac{n(n + 1)}{2}\) conditions on \(n^2\) entries, leaving \(\frac{n(n - 1)}{2}\).` : G[0].includes('U(n)') ? T`\(U(n)\) has dimension \(n^2\) (skew-Hermitian Lie algebra).` : T`All \(n^2\) entries vary.`} For \(n = ${n}\): ${G[1]}.`, v: pyv }; }
      const m = R.int(3, 7), kk = R.int(1, m - 1);
      return { q: T`\(F: \mathbb R^{${m}} \to \mathbb R^{${kk}}\) is smooth and \(c\) is a regular value. What is the dimension of \(F^{-1}(c)\)?`, answer: m - kk, x: T`Regular value theorem: \(${m} - ${kk} = ${m - kk}\).`, v: `${m} - Matrix(${kk}, ${m}, lambda i, j: 1 if i == j else 0).rank()` };
    } }],
    [U[8]]: [{ id: 'dg-forms', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const P = [['x^2y', 'x**2*y', (x, y) => x * x], ['y^2', 'y**2', (x, y) => 2 * y], ['-y', '-y', () => -1], ['xy', 'x*y', x => x], ['e^xy', 'exp(x)*y', x => Math.exp(x)]], Q = [['xy^2', 'x*y**2', (x, y) => y * y], ['x', 'x', () => 1], ['x^2', 'x**2', x => 2 * x], ['x + y', 'x + y', () => 1], ['\\sin x', 'sin(x)', x => Math.cos(x)]], [pt, pp, Py] = R.pick(P), [qt, qp, Qx] = R.pick(Q), x0 = R.int(-2, 2), y0 = R.int(-2, 2), val = Qx(x0, y0) - Py(x0, y0);
        return { q: T`\(\omega = ${pt}\,dx + ${qt}\,dy\). Find the coefficient of \(dx \wedge dy\) in \(d\omega\) at \((${x0}, ${y0})\), to four decimals.`, answer: val, tol: 1e-4, x: T`\(d\omega = (Q_x - P_y)\,dx \wedge dy\). At \((${x0}, ${y0})\): \(${R.fmt(Qx(x0, y0), 4)} - (${R.fmt(Py(x0, y0), 4)}) = ${R.fmt(val, 4)}\).`, v: `(lambda x, y: (diff(${qp}, x) - diff(${pp}, y)).subs({x: ${x0}, y: ${y0}}))(Symbol('x'), Symbol('y'))` }; }
      if (k === 1) { const a = R.int(1, 5), b = R.int(1, 5); return { q: T`Use \(\text{Area} = \frac12\oint(x\,dy - y\,dx)\) to find the area enclosed by \((${a}\cos t, ${b}\sin t)\), to four decimals.`, answer: Math.PI * a * b, tol: 1e-4, x: T`\(x\,dy - y\,dx = ${a * b}(\cos^2t + \sin^2t)\,dt\), so the area is \(\frac12\cdot2\pi\cdot${a * b} = ${a * b}\pi\).`, v: `(lambda t: Rational(1, 2)*integrate(${a}*cos(t)*diff(${b}*sin(t), t) - ${b}*sin(t)*diff(${a}*cos(t), t), (t, 0, 2*pi)))(Symbol('t'))` }; }
      const a = R.int(1, 3), b = R.int(1, 3), p = R.int(1, 2), q = R.int(1, 2); // ∮ over rectangle [0,a]x[0,b] of -x^p y^q... Green: ∬ (Q_x - P_y) with P = -y^2, Q = x^2 -> ∬ (2x + 2y)
      const val = a * a * b + a * b * b;
      return { q: T`Use Green's theorem to compute \(\oint_C(-y^2\,dx + x^2\,dy)\) counterclockwise around the rectangle \([0, ${a}]\times[0, ${b}]\).`, answer: val, x: T`\(Q_x - P_y = 2x + 2y\). \(\iint(2x + 2y)\,dA = ${a}^2\cdot${b} + ${a}\cdot${b}^2 = ${val}\).`, v: `(lambda t: sum(integrate(-(Y)**2*diff(X, t) + (X)**2*diff(Y, t), (t, 0, 1)) for X, Y in [(${a}*t, 0), (${a}, ${b}*t), (${a}*(1 - t), ${b}), (0, ${b}*(1 - t))]))(Symbol('t'))` };
    } }],
    [U[9]]: [{ id: 'dg-riem', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const a = R.int(1, 4), typ = R.pick(['sin', 'sinh', 'lin']), tex = typ === 'lin' ? `${a}r` : `${a === 1 ? '' : a}\\${typ}\\frac{r}{${a}}`.replace('\\frac{r}{1}', ' r'), py = typ === 'lin' ? `${a}*r` : `${a}*${typ}(r/${a})`, K = typ === 'sin' ? 1 / (a * a) : typ === 'sinh' ? -1 / (a * a) : 0;
        return { q: T`Find the Gaussian curvature of \(ds^2 = dr^2 + \left(${tex}\right)^2d\theta^2\), to four decimals.`, answer: K, tol: 1e-4, x: T`\(K = -\frac{(\sqrt G)''}{\sqrt G}\) with \(\sqrt G = ${tex}\): ${R.fmt(K, 4)}.`, v: `(lambda r: (lambda E, G: (lambda W: -(diff(diff(G, r)/W, r))/(2*W))(sqrt(E*G)))(1, (${py})**2).subs(r, Rational(7, 10)))(Symbol('r', positive=True))` }; }
      const r = R.pick([0.5, 1, 2, 3]), typ = R.pick(['hyperbolic', 'spherical', 'flat']), C = 2 * Math.PI * (typ === 'hyperbolic' ? Math.sinh(r) : typ === 'spherical' ? Math.sin(r) : r);
      return { q: T`Find the circumference of a geodesic circle of radius ${r} on a surface of constant curvature ${typ === 'hyperbolic' ? '\\(-1\\)' : typ === 'spherical' ? '\\(+1\\)' : '0'}, to four decimals.`, answer: C, tol: 1e-4, x: T`\(2\pi\sqrt{G(r)}\) with \(\sqrt G = ${typ === 'hyperbolic' ? '\\sinh r' : typ === 'spherical' ? '\\sin r' : 'r'}\).`, v: `_mp.quad(lambda th: ${typ === 'hyperbolic' ? `_mp.sinh(${r})` : typ === 'spherical' ? `_mp.sin(${r})` : r}, [0, 2*_mp.pi])` };
    } }]
  } });
})();
