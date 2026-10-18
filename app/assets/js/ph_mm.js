'use strict';
// Theoretical physics track: Mathematical methods for physics. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'mm', name: 'Mathematical methods', color: '#2F5D50', blurb: 'Index notation, vector calculus, integral theorems, the delta function, Green’s functions, special functions, variational calculus, linear algebra for physics, asymptotics', questions: [], generators: [] });
  const U = ['Index notation and Levi-Civita', 'Vector calculus operators', 'Divergence and Stokes theorems', 'The Dirac delta', 'Green’s functions', 'Special functions', 'Calculus of variations', 'Linear algebra for physics', 'Asymptotics and Stirling'];

  registerLearn('mm', [
    { title: U[0], skill: U[0],
      hook: T`<p>Physics equations get long in components. Index notation, with the convention that repeated indices are summed, makes them short, and two symbols, \(\delta_{ij}\) and \(\varepsilon_{ijk}\), handle every dot and cross product.</p>`,
      body: T`
<p><b>Summation convention.</b> \(a_ib_i = \sum_ia_ib_i = \mathbf a\cdot\mathbf b\). A repeated (dummy) index is summed; a free index appears once on each side.</p>
<p><b>Kronecker delta</b> \(\delta_{ij}\) = 1 if \(i = j\), else 0. It swaps indices: \(\delta_{ij}a_j = a_i\). In 3D, \(\delta_{ii} = 3\).</p>
<p><b>Levi-Civita symbol</b> \(\varepsilon_{ijk}\): \(+1\) for even permutations of \(123\) (123, 231, 312), \(-1\) for odd (132, 213, 321), 0 if any index repeats.</p>
\[(\mathbf a \times \mathbf b)_i = \varepsilon_{ijk}a_jb_k,\qquad \det A = \varepsilon_{ijk}A_{1i}A_{2j}A_{3k}\]
<p><b>The ε–δ identity:</b></p>
\[\varepsilon_{ijk}\varepsilon_{imn} = \delta_{jm}\delta_{kn} - \delta_{jn}\delta_{km}\]
<p>Contracting further: \(\varepsilon_{ijk}\varepsilon_{ijn} = 2\delta_{kn}\) and \(\varepsilon_{ijk}\varepsilon_{ijk} = 6\).</p>
<p><b>Use.</b> \(\mathbf a \times (\mathbf b \times \mathbf c)\): \(\varepsilon_{ijk}a_j\varepsilon_{kmn}b_mc_n = (\delta_{im}\delta_{jn} - \delta_{in}\delta_{jm})a_jb_mc_n = b_i(\mathbf a\cdot\mathbf c) - c_i(\mathbf a\cdot\mathbf b)\), the BAC–CAB rule.</p>`,
      ex: { q: T`Show \(\nabla\cdot(\nabla \times \mathbf A) = 0\) in index notation.`, a: T`<p>\(\partial_i\varepsilon_{ijk}\partial_jA_k = \varepsilon_{ijk}\partial_i\partial_jA_k\). The derivative pair is symmetric in \(i, j\) while \(\varepsilon\) is antisymmetric, so the sum vanishes.</p>` },
      trap: T`Using the same dummy index twice in one product, as in \(a_ib_ic_i\). Each dummy index appears exactly twice.`,
      vary: [[T`\(\varepsilon_{231}\)?`, 1, T`Cyclic.`], [T`\(\varepsilon_{213}\)?`, -1, T`One swap.`], [T`\(\delta_{ij}\delta_{ij}\) in 3D?`, 3, T`\(\delta_{ii}\).`], [T`\(\varepsilon_{ijk}\varepsilon_{ijk}\)?`, 6, T`\(3!\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Gradient, divergence, curl, and Laplacian describe how fields vary in space. Electromagnetism, fluids, and quantum mechanics are written almost entirely in these four operators.</p>`,
      body: T`
<p><b>Cartesian.</b> \(\nabla f = (\partial_xf, \partial_yf, \partial_zf)\), \(\nabla\cdot\mathbf F = \partial_iF_i\), \((\nabla\times\mathbf F)_i = \varepsilon_{ijk}\partial_jF_k\), \(\nabla^2f = \partial_i\partial_if\).</p>
<p><b>Standard results</b> with \(\mathbf r = (x, y, z)\), \(r = |\mathbf r|\):</p>
<table class="tt"><tr><th>Expression</th><th>Value</th></tr>
<tr><td>\(\nabla\cdot\mathbf r\)</td><td>3</td></tr>
<tr><td>\(\nabla\times\mathbf r\)</td><td>0</td></tr>
<tr><td>\(\nabla r^n\)</td><td>\(nr^{n-2}\mathbf r\)</td></tr>
<tr><td>\(\nabla^2r^n\)</td><td>\(n(n + 1)r^{n-2}\)</td></tr>
<tr><td>\(\nabla\cdot\frac{\mathbf r}{r^3}\)</td><td>0 for \(r \ne 0\)</td></tr></table>
<p>So \(\frac1r\) (\(n = -1\)) is harmonic away from the origin.</p>
<p><b>Spherical Laplacian</b> (radial part): \(\nabla^2f = \frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{df}{dr}\right)\) for \(f(r)\). <b>Cylindrical:</b> \(\frac1s\frac{d}{ds}\left(s\frac{df}{ds}\right)\).</p>
<p><b>Identities.</b> \(\nabla\times\nabla f = 0\); \(\nabla\cdot(\nabla\times\mathbf F) = 0\); \(\nabla\times(\nabla\times\mathbf F) = \nabla(\nabla\cdot\mathbf F) - \nabla^2\mathbf F\); \(\nabla\cdot(f\mathbf F) = \nabla f\cdot\mathbf F + f\nabla\cdot\mathbf F\).</p>`,
      ex: { q: T`Compute \(\nabla\cdot\mathbf F\) and \(\nabla\times\mathbf F\) for \(\mathbf F = (yz, xz, xy)\).`, a: T`<p>\(\nabla\cdot\mathbf F = 0 + 0 + 0 = 0\). Curl: \((x - x, y - y, z - z) = 0\). In fact \(\mathbf F = \nabla(xyz)\).</p>` },
      trap: T`Applying the Cartesian Laplacian formula to components in spherical coordinates. Only the scalar formulas above transfer directly.`,
      vary: [[T`\(\nabla^2r^2\)?`, 6, T`\(2\cdot3\).`], [T`\(\nabla^2r^3\) at \(r = 1\)?`, 12, T`\(3\cdot4\cdot r\).`], [T`\(\nabla\cdot(x^2, y^2, z^2)\) at \((1, 2, 3)\)?`, 12, T`\(2 + 4 + 6\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>The divergence theorem trades a volume integral for a surface integral, and Stokes' theorem trades a surface integral for a line integral. Gauss's law and Ampère's law are these theorems applied to Maxwell's equations.</p>`,
      body: T`
<p><b>Divergence theorem.</b></p>
\[\iiint_V\nabla\cdot\mathbf F\,dV = \oint_{\partial V}\mathbf F\cdot d\mathbf A\]
<p><b>Stokes' theorem.</b></p>
\[\iint_S(\nabla\times\mathbf F)\cdot d\mathbf A = \oint_{\partial S}\mathbf F\cdot d\mathbf l\]
<p><b>Examples.</b></p>
<ul><li>\(\mathbf F = (ax, by, cz)\) through a sphere of radius \(R\): divergence \(a + b + c\), so the flux is \((a + b + c)\frac43\pi R^3\).</li>
<li>\(\mathbf F = \frac{\mathbf r}{r^3}\) through any surface enclosing the origin: \(4\pi\) (the field of a point charge). Through a surface not enclosing it: 0.</li>
<li>\(\mathbf F = (-y, x, 0)\) around a circle of radius \(R\) in the \(xy\)-plane: curl \((0, 0, 2)\), so the circulation is \(2\pi R^2\).</li></ul>
<p><b>Conservative fields.</b> On a simply connected region, \(\nabla\times\mathbf F = 0\) iff \(\mathbf F = \nabla\phi\) iff line integrals depend only on endpoints.</p>
<p><b>Green's identities</b> follow by applying the divergence theorem to \(f\nabla g\): \(\int(f\nabla^2g + \nabla f\cdot\nabla g)dV = \oint f\nabla g\cdot d\mathbf A\). They give uniqueness for Laplace and Poisson problems.</p>`,
      ex: { q: T`Find the flux of \(\mathbf F = (x^3, y^3, z^3)\) out of the unit sphere.`, a: T`<p>\(\nabla\cdot\mathbf F = 3r^2\). \(\int_0^13r^2\cdot4\pi r^2dr = \frac{12\pi}{5} \approx 7.540\).</p>` },
      trap: T`Applying the divergence theorem to \(\frac{\mathbf r}{r^3}\) through a sphere around the origin and getting 0 from \(\nabla\cdot = 0\). The field is singular at the origin: the flux is \(4\pi\).`,
      vary: [[T`Flux of \(\mathbf r\) out of a sphere of radius 2, divided by \(\pi\)?`, 32, T`\(3\cdot\frac43\pi\cdot8\).`], [T`Circulation of \((-y, x, 0)\) around the unit circle, divided by \(\pi\)?`, 2, T`\(2\pi R^2\).`], [T`Flux of \(\frac{\mathbf r}{r^3}\) out of a cube centered at the origin, divided by \(\pi\)?`, 4, T`Encloses the origin.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>The Dirac delta is an idealized spike: zero everywhere except one point, with total area 1. It models point charges and point masses, and it is the input whose response defines a Green's function.</p>`,
      body: T`
<p><b>Defining property.</b> \(\int f(x)\delta(x - a)\,dx = f(a)\) for continuous \(f\) (when \(a\) is inside the range of integration).</p>
<p><b>Scaling and composition.</b> \(\delta(cx) = \frac{\delta(x)}{|c|}\). If \(g\) has simple zeros \(x_i\):</p>
\[\delta(g(x)) = \sum_i\frac{\delta(x - x_i)}{|g'(x_i)|}\]
<p>Example: \(\int_{-\infty}^\infty e^x\delta(x^2 - 4)\,dx = \frac{e^2}{4} + \frac{e^{-2}}{4}\) (zeros \(\pm2\), \(|g'| = 4\)).</p>
<p><b>Derivatives.</b> \(\int f(x)\delta'(x - a)\,dx = -f'(a)\). The step function has \(H' = \delta\).</p>
<p><b>Representations.</b> Limits of narrow peaks: \(\frac{1}{\sqrt{\pi}\varepsilon}e^{-x^2/\varepsilon^2}\), or \(\delta(x) = \frac{1}{2\pi}\int e^{ikx}dk\) (the Fourier transform of 1).</p>
<p><b>Three dimensions.</b> \(\delta^3(\mathbf r) = \delta(x)\delta(y)\delta(z)\), and</p>
\[\nabla^2\frac1r = -4\pi\delta^3(\mathbf r)\]
<p>which encodes Coulomb's law: the potential of a point charge satisfies Poisson's equation with a delta source.</p>`,
      ex: { q: T`Evaluate \(\int_0^{10}x^2\delta(3x - 6)\,dx\).`, a: T`<p>\(\delta(3x - 6) = \frac13\delta(x - 2)\). Result \(\frac13\cdot4 = \frac43\).</p>` },
      trap: T`Forgetting the \(\frac{1}{|g'|}\) factor in \(\delta(g(x))\).`,
      vary: [[T`\(\int\cos x\,\delta(x)\,dx\)?`, 1, T`\(\cos0\).`], [T`\(\int_0^5x\,\delta(x - 7)\,dx\)?`, 0, T`7 is outside.`], [T`\(\int x^3\delta'(x - 1)\,dx\)?`, -3, T`\(-f'(1)\).`], [T`\(\int\delta(2x)\,dx\)?`, 0.5, T`\(\frac{1}{2}\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>To solve \(Ly = f\) for every source \(f\) at once, solve it once for a point source. The response \(G(x, s)\) to \(\delta(x - s)\) is the Green's function, and superposition does the rest.</p>`,
      body: T`
<p><b>Idea.</b> If \(LG(x, s) = \delta(x - s)\) with the boundary conditions, then</p>
\[y(x) = \int G(x, s)f(s)\,ds\]
<p><b>Construction for \(y'' = f\), \(y(0) = y(1) = 0\).</b> For \(x \ne s\), \(G'' = 0\), so \(G\) is linear on each side and vanishes at the ends: \(G = A(s)x\) for \(x < s\), \(B(s)(x - 1)\) for \(x > s\). Continuity at \(x = s\) and a jump of 1 in \(G'\) give</p>
\[G(x, s) = \begin{cases}x(s - 1) & x < s\\ s(x - 1) & x > s\end{cases}\]
<p>Check with \(f = 1\): \(y = \int_0^1G\,ds = \frac{x^2 - x}{2}\), and indeed \(y'' = 1\).</p>
<p><b>Other Green's functions.</b> Damped oscillator \(m\ddot x + kx = F(t)\) (from rest): \(G(t, s) = \frac{\sin\omega(t - s)}{m\omega}\) for \(t > s\), giving \(x = \int_0^tG(t, s)F(s)\,ds\). Poisson's equation in 3D: \(G = -\frac{1}{4\pi|\mathbf r - \mathbf r'|}\). Heat kernel: \(\frac{1}{\sqrt{4\pi kt}}e^{-x^2/4kt}\).</p>
<p><b>Reciprocity.</b> For self-adjoint problems, \(G(x, s) = G(s, x)\): the response at \(x\) to a source at \(s\) equals the response at \(s\) to a source at \(x\).</p>`,
      ex: { q: T`Use the Green's function to solve \(y'' = x\), \(y(0) = y(1) = 0\), and find \(y(\frac12)\).`, a: T`<p>\(y(x) = \int_0^xs(x - 1)s\,ds + \int_x^1x(s - 1)s\,ds = \frac{x^3 - x}{6}\). \(y(\frac12) = \frac{1/8 - 1/2}{6} = -\frac{1}{16}\).</p>` },
      trap: T`Making \(G\) itself jump at \(x = s\). \(G\) is continuous; its derivative jumps by 1 (divided by the leading coefficient).`,
      vary: [[T`\(G(0.25, 0.5)\) for \(y'' = f\), \(y(0) = y(1) = 0\)?`, -0.125, T`\(0.25(0.5 - 1)\).`], [T`\(G(0.5, 0.25)\) for the same problem?`, -0.125, T`Symmetric.`], [T`Solution of \(y'' = 1\), \(y(0) = y(1) = 0\), at \(x = 0.5\)?`, -0.125, T`\(\frac{x^2 - x}{2}\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>A handful of special functions appear again and again: the gamma function extends factorials, Legendre polynomials describe anything with spherical symmetry, Hermite polynomials give the quantum oscillator, and Bessel functions vibrate drums.</p>`,
      body: T`
<p><b>Gamma.</b> \(\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\), \(\Gamma(z + 1) = z\Gamma(z)\), \(\Gamma(n + 1) = n!\), \(\Gamma(\frac12) = \sqrt\pi\). So \(\Gamma(\frac52) = \frac32\cdot\frac12\sqrt\pi = \frac{3\sqrt\pi}{4}\).</p>
<p><b>Beta.</b> \(B(a, b) = \int_0^1t^{a-1}(1 - t)^{b-1}dt = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a + b)}\). \(B(2, 3) = \frac{1\cdot2}{24} = \frac{1}{12}\).</p>
<p><b>Legendre polynomials</b> \(P_\ell\): \(1, x, \frac{3x^2 - 1}{2}, \frac{5x^3 - 3x}{2}\). Recurrence \((\ell + 1)P_{\ell+1} = (2\ell + 1)xP_\ell - \ell P_{\ell-1}\); \(P_\ell(1) = 1\). Generating function:</p>
\[\frac{1}{\sqrt{1 - 2xt + t^2}} = \sum P_\ell(x)t^\ell\]
<p>which is the multipole expansion of \(\frac{1}{|\mathbf r - \mathbf r'|}\).</p>
<p><b>Hermite polynomials</b> \(H_n\) (physicists'): \(1, 2x, 4x^2 - 2, 8x^3 - 12x\); \(H_{n+1} = 2xH_n - 2nH_{n-1}\). They give the harmonic oscillator states \(H_n(x)e^{-x^2/2}\).</p>
<p><b>Bessel functions</b> \(J_\nu\) solve \(x^2y'' + xy' + (x^2 - \nu^2)y = 0\). The first zero of \(J_0\) is \(\approx 2.405\), which sets the lowest drum frequency.</p>`,
      ex: { q: T`Compute \(\Gamma(\frac72)\) and \(P_3(0.5)\).`, a: T`<p>\(\Gamma(\frac72) = \frac52\cdot\frac32\cdot\frac12\sqrt\pi = \frac{15\sqrt\pi}{8} \approx 3.323\). \(P_3(0.5) = \frac{5(0.125) - 1.5}{2} = -0.4375\).</p>` },
      trap: T`Writing \(\Gamma(n) = n!\). It is \((n - 1)!\).`,
      vary: [[T`\(\Gamma(5)\)?`, 24, T`\(4!\).`], [T`\(\Gamma(\frac12)^2\), four decimals.`, Math.PI, T`\(\pi\).`], [T`\(P_2(1)\)?`, 1, T`\(P_\ell(1) = 1\).`], [T`\(H_2(1)\)?`, 2, T`\(4 - 2\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Instead of finding a number that minimizes a function, the calculus of variations finds a whole function that minimizes an integral: the shortest path, the fastest slide, the shape of a hanging chain, or the actual motion of a mechanical system.</p>`,
      body: T`
<p><b>Functional</b> \(S[y] = \int_a^bL(x, y, y')\,dx\). If \(y\) makes \(S\) stationary with fixed endpoints, it satisfies the <b>Euler–Lagrange equation</b>:</p>
\[\frac{d}{dx}\frac{\partial L}{\partial y'} - \frac{\partial L}{\partial y} = 0\]
<p><b>Examples.</b></p>
<ul><li>Shortest path in the plane: \(L = \sqrt{1 + y'^2}\) gives \(y'' = 0\), a straight line.</li>
<li>\(L = y'^2 + ay^2\) gives \(y'' = ay\).</li>
<li>\(L = \frac12y'^2 + f(x)y\) gives \(y'' = f(x)\).</li></ul>
<p><b>Beltrami identity.</b> If \(L\) has no explicit \(x\), then \(L - y'\frac{\partial L}{\partial y'}\) is constant along solutions. This solves the catenary (\(L = y\sqrt{1 + y'^2}\), giving \(y = c\cosh\frac{x - x_0}{c}\)) and the brachistochrone (a cycloid).</p>
<p><b>Constraints</b> use Lagrange multipliers: maximize area with fixed perimeter and the answer is a circle (the isoperimetric problem).</p>
<p><b>In physics</b> the action \(S = \int(T - V)\,dt\) is stationary along true motions, so the Euler–Lagrange equations are the equations of motion (next subject).</p>`,
      ex: { q: T`Find the extremal of \(\int_0^1(y'^2 + 12xy)\,dx\) with \(y(0) = 0\), \(y(1) = 1\).`, a: T`<p>\(\frac{d}{dx}(2y') - 12x = 0\), so \(y'' = 6x\) and \(y = x^3 + cx\). \(y(1) = 1\) gives \(c = 0\): \(y = x^3\).</p>` },
      trap: T`Dropping the total \(x\)-derivative in \(\frac{d}{dx}\frac{\partial L}{\partial y'}\). It acts on \(y\) and \(y'\) as functions of \(x\).`,
      vary: [[T`Euler–Lagrange for \(L = y'^2 - 4y^2\) gives \(y'' = cy\). Find \(c\).`, -4, T`\(2y'' + 8y = 0\).`], [T`Extremal of \(\int_0^1y'^2\,dx\), \(y(0) = 0\), \(y(1) = 3\): \(y(0.5)\)?`, 1.5, T`Straight line.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Physical observables are symmetric (or Hermitian) matrices, so their eigenvalues are real and their eigenvectors orthogonal. Normal modes, principal axes, and quantum measurements all come down to diagonalizing them.</p>`,
      body: T`
<p><b>Hermitian matrices</b> (\(A^\dagger = A\)) have real eigenvalues and orthogonal eigenvectors, and are diagonalized by a unitary matrix. For a real symmetric \(2\times2\) matrix \(\begin{pmatrix}a & b\\ b & d\end{pmatrix}\):</p>
\[\lambda = \frac{a + d}{2} \pm \sqrt{\left(\frac{a - d}{2}\right)^2 + b^2}\]
<p><b>Normal modes.</b> For \(M\ddot{\mathbf x} = -K\mathbf x\), try \(\mathbf x = \mathbf ve^{i\omega t}\): \(K\mathbf v = \omega^2M\mathbf v\). Two equal masses \(m\) joined to walls and each other by springs \(k\): \(\omega^2 = \frac km\) (in phase) and \(\frac{3k}{m}\) (out of phase).</p>
<p><b>Pauli matrices</b>:</p>
\[\sigma_x = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix},\quad \sigma_y = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}\]
\[\sigma_z = \begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}\]
<p>Each squares to \(I\), has eigenvalues \(\pm1\), and \(\sigma_x\sigma_y = i\sigma_z\) (cyclically). Commutators: \([\sigma_i, \sigma_j] = 2i\varepsilon_{ijk}\sigma_k\).</p>
<p><b>Matrix exponential.</b> \(e^{A}\) for diagonalizable \(A = PDP^{-1}\) is \(Pe^DP^{-1}\). \(e^{i\theta\sigma_z} = \text{diag}(e^{i\theta}, e^{-i\theta})\); in general \(e^{i\theta\hat n\cdot\boldsymbol\sigma} = \cos\theta\,I + i\sin\theta\,\hat n\cdot\boldsymbol\sigma\). Also \(\det e^A = e^{\text{tr}A}\).</p>`,
      ex: { q: T`Find the eigenvalues of \(\begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix}\) and the normal-mode frequencies of two masses \(m = 1\) with stiffness matrix equal to it.`, a: T`<p>\(\lambda = 2 \pm 1\): 1 and 3. Eigenvectors: \((1, -1)\) for \(\lambda = 1\) and \((1, 1)\) for \(\lambda = 3\). Frequencies \(\omega = \sqrt\lambda\): 1 (masses opposite) and \(\sqrt3\) (masses together).</p>` },
      trap: T`Taking \(\omega = \lambda\) instead of \(\omega = \sqrt\lambda\) for normal modes.`,
      vary: [[T`\(\text{tr}(\sigma_x\sigma_y\sigma_z)\), imaginary part?`, 2, T`\(\sigma_x\sigma_y\sigma_z = iI\).`], [T`\(\det e^{A}\) for \(\text{tr}A = 0\)?`, 1, T`\(e^0\).`], [T`Largest eigenvalue of \(\begin{pmatrix}0 & 2\\ 2 & 3\end{pmatrix}\)?`, 4, T`\(1.5 + 2.5\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Physics often needs the size of an expression when a parameter is large: factorials with \(10^{23}\) particles, integrals with a large exponent. Asymptotic expansions give astonishingly accurate answers from a few terms.</p>`,
      body: T`
<p><b>Stirling's approximation.</b></p>
\[\ln n! = n\ln n - n + \tfrac12\ln(2\pi n) + \cdots\]
\[n! \approx \sqrt{2\pi n}\left(\frac ne\right)^n\]
<p>For \(n = 10\): \(\sqrt{20\pi}(10/e)^{10} \approx 3{,}598{,}696\) versus \(3{,}628{,}800\), a 0.8% error, roughly \(\frac{1}{12n}\). Statistical mechanics usually keeps only \(n\ln n - n\).</p>
<p><b>Laplace's method.</b> For large \(\lambda\), with \(g\) having a maximum at \(x_0\):</p>
\[\int e^{\lambda g(x)}dx \approx e^{\lambda g(x_0)}\sqrt{\frac{2\pi}{\lambda|g''(x_0)|}}\]
<p>Stirling follows from \(n! = \int_0^\infty e^{n\ln t - t}dt\).</p>
<p><b>Gaussian integrals:</b> \(\int e^{-ax^2}dx = \sqrt{\frac\pi a}\), \(\int x^2e^{-ax^2}dx = \frac12\sqrt{\frac{\pi}{a^3}}\).</p>
<p><b>Asymptotic series</b> can diverge yet still be useful: truncate near the smallest term. Perturbation series in quantum field theory behave this way.</p>
<p><b>Big-O.</b> \(f = O(g)\) means \(|f| \le C|g|\) eventually; \(f \sim g\) means \(\frac fg \to 1\).</p>`,
      ex: { q: T`Estimate \(\ln(100!)\) with \(n\ln n - n\) and with the \(\frac12\ln(2\pi n)\) term.`, a: T`<p>\(100\ln100 - 100 = 360.517\). Adding \(\frac12\ln(200\pi) = 3.221\): \(363.739\). The exact value is \(363.739\), so the correction term is essential at this size.</p>` },
      trap: T`Dropping \(\frac12\ln(2\pi n)\) when \(n\) is only moderately large.`,
      vary: [[T`\(\int_{-\infty}^\infty e^{-4x^2}dx\), four decimals.`, Math.sqrt(Math.PI / 4), T`\(\sqrt{\pi/4}\).`], [T`Relative error of Stirling at \(n = 10\), percent to one decimal.`, 0.8, T`About \(\frac{1}{12n}\).`]] }
  ]);

  addQuestions('mm', [
    { id: 'mm1', skill: U[0], q: T`\(\varepsilon_{ijk}a_jb_k\) is the \(i\)th component of:`, c: [T`\(\mathbf a \times \mathbf b\)`, T`\(\mathbf a \cdot \mathbf b\)`, T`\(\mathbf b \times \mathbf a\)`, T`\(\nabla \times \mathbf a\)`], x: T`Definition of the cross product.` },
    { id: 'mm2', skill: U[1], q: T`\(\nabla \times (\nabla f)\) equals:`, c: ['0', T`\(\nabla^2 f\)`, T`\(\nabla f\)`, 'undefined'], x: T`Mixed partials commute against an antisymmetric \(\varepsilon\).` },
    { id: 'mm3', skill: U[3], q: T`\(\nabla^2\frac1r\) equals:`, c: [T`\(-4\pi\delta^3(\mathbf r)\)`, '0 everywhere', T`\(\frac{2}{r^3}\)`, T`\(4\pi\)`], x: T`Zero away from the origin, with total flux \(-4\pi\).` },
    { id: 'mm4', skill: U[4], q: T`A Green's function \(G(x, s)\) for a second-order operator with leading coefficient 1 is:`, c: ['continuous, with a unit jump in its derivative at x = s', 'discontinuous at x = s', 'smooth everywhere', 'zero for x > s always'], x: T`Integrating \(G'' = \delta\) across \(s\) gives the jump.` },
    { id: 'mm5', skill: U[6], q: T`The curve of a hanging chain (minimizing potential energy at fixed length) is a:`, c: ['catenary', 'parabola', 'cycloid', 'circle'], x: T`\(y = c\cosh\frac{x - x_0}{c}\).` },
    { id: 'mm6', skill: U[7], q: T`Eigenvalues of a Hermitian matrix are:`, c: ['real', 'purely imaginary', 'of modulus 1', 'always positive'], x: T`\(\langle v, Av\rangle = \lambda\|v\|^2\) is real.` }
  ]);

  // ======================= GENERATORS =======================
  const fct = k => (k <= 1 ? 1 : k * fct(k - 1));
  const eps = (i, j, k) => (i === j || j === k || i === k ? 0 : [[1, 2, 3], [2, 3, 1], [3, 1, 2]].some(p => p[0] === i && p[1] === j && p[2] === k) ? 1 : -1);

  registerUnitGens('mm', { units: {
    [U[0]]: [{ id: 'mm-eps', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const i = R.int(1, 3), j = R.int(1, 3), l = R.int(1, 3); return { q: T`Find \(\varepsilon_{${i}${j}${l}}\).`, answer: eps(i, j, l), x: T`${eps(i, j, l) === 0 ? 'A repeated index gives 0.' : eps(i, j, l) === 1 ? 'An even (cyclic) permutation of 123.' : 'An odd permutation of 123.'}`, v: `LeviCivita(${i}, ${j}, ${l})` }; }
      if (k === 1) { const j = R.int(1, 3), kk = R.int(1, 3), m = R.int(1, 3), n = R.int(1, 3), val = (j === m && kk === n ? 1 : 0) - (j === n && kk === m ? 1 : 0);
        return { q: T`Evaluate \(\varepsilon_{i${j}${kk}}\varepsilon_{i${m}${n}}\), summing over \(i\).`, answer: val, x: T`\(\delta_{jm}\delta_{kn} - \delta_{jn}\delta_{km} = ${j === m && kk === n ? 1 : 0} - ${j === n && kk === m ? 1 : 0}\).`, v: `sum(LeviCivita(i, ${j}, ${kk})*LeviCivita(i, ${m}, ${n}) for i in range(1, 4))` }; }
      const a = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)], b = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)], i = R.int(1, 3);
      const cr = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
      return { q: T`With \(\mathbf a = (${a.join(', ')})\) and \(\mathbf b = (${b.join(', ')})\), compute \(\varepsilon_{${i}jk}a_jb_k\).`, answer: cr[i - 1], x: T`This is \((\mathbf a \times \mathbf b)_{${i}}\); \(\mathbf a \times \mathbf b = (${cr.join(', ')})\).`, v: `sum(LeviCivita(${i}, j, k)*[${a}][j - 1]*[${b}][k - 1] for j in range(1, 4) for k in range(1, 4))` };
    } }],
    [U[1]]: [{ id: 'mm-vc', make(R) {
      const k = R.int(0, 2), xs = "Symbol('x'), Symbol('y'), Symbol('z')";
      if (k === 0) { const n = R.int(-2, 4), r0 = R.int(1, 3); return { q: T`Compute \(\nabla^2r^{${n}}\) at a point with \(r = ${r0}\), to four decimals.`, answer: n * (n + 1) * r0 ** (n - 2), tol: 1e-4, x: T`\(\nabla^2r^n = n(n + 1)r^{n-2} = ${n * (n + 1)}\cdot${r0}^{${n - 2}}\).`, v: `(lambda x, y, z: (lambda f: (diff(f, x, 2) + diff(f, y, 2) + diff(f, z, 2)).subs({x: ${r0}, y: 0, z: 0}))(sqrt(x**2 + y**2 + z**2)**${n}))(${xs})` }; }
      const F = [['(x^2y, yz, xz^2)', 'x**2*y', 'y*z', 'x*z**2'], ['(xy, yz, zx)', 'x*y', 'y*z', 'z*x'], ['(y^2, x^2, z)', 'y**2', 'x**2', 'z'], ['(e^x\\cos y, e^x\\sin y, z^2)', 'exp(x)*cos(y)', 'exp(x)*sin(y)', 'z**2'], ['(yz, xz, xy)', 'y*z', 'x*z', 'x*y']], [t, P, Q, S] = R.pick(F), p = [R.int(-2, 2), R.int(-2, 2), R.int(-2, 2)];
      // compute in JS via finite differences is unreliable; evaluate symbolic derivatives with small table
      const d = (f, v) => ({ 'x**2*y': { x: (X, Y) => 2 * X * Y, y: X => X * X, z: () => 0 }, 'y*z': { x: () => 0, y: (X, Y, Z) => Z, z: (X, Y) => Y }, 'x*z**2': { x: (X, Y, Z) => Z * Z, y: () => 0, z: (X, Y, Z) => 2 * X * Z }, 'x*y': { x: (X, Y) => Y, y: X => X, z: () => 0 }, 'z*x': { x: (X, Y, Z) => Z, y: () => 0, z: X => X }, 'y**2': { x: () => 0, y: (X, Y) => 2 * Y, z: () => 0 }, 'x**2': { x: X => 2 * X, y: () => 0, z: () => 0 }, 'z': { x: () => 0, y: () => 0, z: () => 1 }, 'exp(x)*cos(y)': { x: (X, Y) => Math.exp(X) * Math.cos(Y), y: (X, Y) => -Math.exp(X) * Math.sin(Y), z: () => 0 }, 'exp(x)*sin(y)': { x: (X, Y) => Math.exp(X) * Math.sin(Y), y: (X, Y) => Math.exp(X) * Math.cos(Y), z: () => 0 }, 'z**2': { x: () => 0, y: () => 0, z: (X, Y, Z) => 2 * Z }, 'x*z': { x: (X, Y, Z) => Z, y: () => 0, z: X => X } })[f][v](...p);
      if (k === 1) { const val = d(P, 'x') + d(Q, 'y') + d(S, 'z'); return { q: T`Compute \(\nabla\cdot\mathbf F\) for \(\mathbf F = ${t}\) at \((${p.join(', ')})\), to four decimals.`, answer: val, tol: 1e-4, x: T`\(\partial_xF_x + \partial_yF_y + \partial_zF_z = ${R.fmt(d(P, 'x'), 4)} + ${R.fmt(d(Q, 'y'), 4)} + ${R.fmt(d(S, 'z'), 4)}\).`, v: `(lambda x, y, z: (diff(${P}, x) + diff(${Q}, y) + diff(${S}, z)).subs({x: ${p[0]}, y: ${p[1]}, z: ${p[2]}}))(${xs})` }; }
      const comp = R.int(0, 2), curl = [d(S, 'y') - d(Q, 'z'), d(P, 'z') - d(S, 'x'), d(Q, 'x') - d(P, 'y')];
      return { q: T`Compute the ${['x', 'y', 'z'][comp]}-component of \(\nabla\times\mathbf F\) for \(\mathbf F = ${t}\) at \((${p.join(', ')})\), to four decimals.`, answer: curl[comp], tol: 1e-4, x: T`\(\nabla\times\mathbf F = (\partial_yF_z - \partial_zF_y,\ \partial_zF_x - \partial_xF_z,\ \partial_xF_y - \partial_yF_x)\).`, v: `(lambda x, y, z: [diff(${S}, y) - diff(${Q}, z), diff(${P}, z) - diff(${S}, x), diff(${Q}, x) - diff(${P}, y)][${comp}].subs({x: ${p[0]}, y: ${p[1]}, z: ${p[2]}}))(${xs})` };
    } }],
    [U[2]]: [{ id: 'mm-flux', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.int(-2, 3), b = R.int(-2, 3), c = R.int(-2, 3), Rr = R.int(1, 3), val = (a + b + c) * 4 / 3 * Rr ** 3; return { q: T`Find the outward flux of \(\mathbf F = (${a}x, ${b}y, ${c}z)\) through the sphere of radius ${Rr}, divided by \(\pi\), to four decimals.`, answer: val, tol: 1e-4, x: T`Divergence \(${a + b + c}\), times volume \(\frac43\pi\cdot${Rr ** 3}\).`, v: `_mp.quad(lambda p, t: (${a}*(${Rr}*_mp.sin(p)*_mp.cos(t))**2 + ${b}*(${Rr}*_mp.sin(p)*_mp.sin(t))**2 + ${c}*(${Rr}*_mp.cos(p))**2)/${Rr}*${Rr}**2*_mp.sin(p), [0, _mp.pi], [0, 2*_mp.pi])/_mp.pi` }; }
      if (k === 1) { const n = R.int(1, 3), Rr = R.int(1, 2), val = 4 * (n + 2) * Rr ** (n + 3) / (n + 3); // F = r^n r vec, div = (n+3) r^n, flux = 4 pi R^{n+3}
        return { q: T`Find the outward flux of \(\mathbf F = r^{${n}}\mathbf r\) through the sphere of radius ${Rr}, divided by \(\pi\), to four decimals.`, answer: 4 * Rr ** (n + 3), tol: 1e-4, x: T`On the sphere \(\mathbf F\cdot\hat{\mathbf n} = R^{${n + 1}}\), times area \(4\pi R^2\): \(4\pi R^{${n + 3}}\). (Or integrate \(\nabla\cdot\mathbf F = ${n + 3}r^{${n}}\) over the ball.)`, v: `integrate(${n + 3}*Symbol('r')**${n}*4*Symbol('r')**2, (Symbol('r'), 0, ${Rr}))` }; }
      const Rr = R.int(1, 4), w = R.int(1, 3);
      return { q: T`Find the circulation of \(\mathbf F = (-${w}y, ${w}x, 0)\) counterclockwise around the circle of radius ${Rr} in the \(xy\)-plane, divided by \(\pi\).`, answer: 2 * w * Rr * Rr, x: T`Curl \((0, 0, ${2 * w})\) times area \(\pi\cdot${Rr * Rr}\).`, v: `(lambda t: integrate(-${w}*${Rr}*sin(t)*diff(${Rr}*cos(t), t) + ${w}*${Rr}*cos(t)*diff(${Rr}*sin(t), t), (t, 0, 2*pi))/pi)(Symbol('t'))` };
    } }],
    [U[3]]: [{ id: 'mm-delta', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const c = R.int(2, 5), a = R.int(1, 4), F = R.pick([['x^2', 'x**2', x => x * x], ['e^x', 'exp(x)', x => Math.exp(x)], ['\\cos x', 'cos(x)', x => Math.cos(x)], ['x^3 + 1', 'x**3 + 1', x => x ** 3 + 1]]), val = F[2](a) / c;
        return { q: T`Evaluate \(\int_{-10}^{10}${F[0]}\,\delta(${c}x - ${c * a})\,dx\), to four decimals.`, answer: val, tol: 1e-4, x: T`\(\delta(${c}x - ${c * a}) = \frac1{${c}}\delta(x - ${a})\): \(\frac{f(${a})}{${c}}\).`, v: `_mp.quad(lambda x: (lambda u: _mp.exp(-u**2/1e-8)/_mp.sqrt(_mp.pi*1e-8))(${c}*x - ${c * a})*(${F[1].replace('exp', '_mp.exp').replace('cos', '_mp.cos')}), [-10, ${a} - 0.01, ${a}, ${a} + 0.01, 10])` }; }
      if (k === 1) { const a = R.int(1, 3), F = R.pick([['e^x', 'exp(x)', x => Math.exp(x)], ['x^2 + x', 'x**2 + x', x => x * x + x], ['\\cos x', 'cos(x)', x => Math.cos(x)]]), val = (F[2](a) + F[2](-a)) / (2 * a);
        return { q: T`Evaluate \(\int_{-\infty}^{\infty}${F[0]}\,\delta(x^2 - ${a * a})\,dx\), to four decimals.`, answer: val, tol: 1e-4, x: T`Zeros \(\pm${a}\), \(|g'| = ${2 * a}\): \(\frac{f(${a}) + f(-${a})}{${2 * a}}\).`, v: `sum(_mp.quad(lambda x: (lambda u: _mp.exp(-u**2/1e-8)/_mp.sqrt(_mp.pi*1e-8))(x**2 - ${a * a})*(${F[1].replace('exp', '_mp.exp').replace('cos', '_mp.cos')}), [r - 0.01, r, r + 0.01]) for r in [-${a}, ${a}])` }; }
      const a = R.int(-2, 2), n = R.int(2, 4);
      return { q: T`Evaluate \(\int x^{${n}}\delta'(x ${a < 0 ? '+' : '-'} ${Math.abs(a)})\,dx\).`, answer: -n * a ** (n - 1), x: T`\(\int f\delta'(x - a) = -f'(a) = -${n}(${a})^{${n - 1}}\).`, v: `-diff(Symbol('x')**${n}, Symbol('x')).subs(Symbol('x'), ${a})` };
    } }],
    [U[4]]: [{ id: 'mm-green', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const x = R.pick([0.25, 0.5, 0.75, 0.2, 0.6]), s = R.pick([0.25, 0.5, 0.75, 0.4, 0.8]), G = x < s ? x * (s - 1) : s * (x - 1);
        return { q: T`For \(y'' = f\), \(y(0) = y(1) = 0\), find the Green's function value \(G(${x}, ${s})\).`, answer: G, tol: 1e-6, x: T`\(G = x(s - 1)\) for \(x < s\) and \(s(x - 1)\) for \(x > s\): ${x < s ? `\\(${x}(${s} - 1)\\)` : `\\(${s}(${x} - 1)\\)`}.`, v: `(lambda x, s: max(x - s, 0) - x*(1 - s))(nsimplify(${x}), nsimplify(${s}))` }; }
      const m = R.int(0, 2), x0 = R.pick([0.25, 0.5, 0.75]);
      // y'' = x^m, y(0)=y(1)=0: y = (x^{m+2} - x)/((m+1)(m+2))
      const val = (x0 ** (m + 2) - x0) / ((m + 1) * (m + 2));
      return { q: T`Solve \(y'' = ${m === 0 ? '1' : m === 1 ? 'x' : 'x^2'}\), \(y(0) = y(1) = 0\), using the Green's function, and give \(y(${x0})\) to five decimals.`, answer: val, tol: 1e-5, x: T`\(y = \int_0^1G(x, s)s^{${m}}ds = \frac{x^{${m + 2}} - x}{${(m + 1) * (m + 2)}}\).`, v: `(lambda x, s: integrate(s*(x - 1)*s**${m}, (s, 0, x)) + integrate(x*(s - 1)*s**${m}, (s, x, 1)))(nsimplify(${x0}), Symbol('s'))` };
    } }],
    [U[5]]: [{ id: 'mm-spec', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const h = R.int(1, 9), z = h / 2; let g = h % 2 ? Math.sqrt(Math.PI) : 1; for (let t = h % 2 ? 0.5 : 1; t < z; t += 1) g *= t; return { q: T`Compute \(\Gamma(${h % 2 ? `\\frac{${h}}{2}` : z})\), to four decimals.`, answer: g, tol: 1e-4 * Math.max(1, g), x: T`Use \(\Gamma(z + 1) = z\Gamma(z)\) down to \(\Gamma(${h % 2 ? '\\frac12' : 1}) = ${h % 2 ? '\\sqrt\\pi' : 1}\).`, v: `gamma(Rational(${h}, 2))` }; }
      if (k === 1) { const a = R.int(1, 4), b = R.int(1, 4); const val = fct(a - 1) * fct(b - 1) / fct(a + b - 1); return { q: T`Compute \(B(${a}, ${b}) = \int_0^1t^{${a - 1}}(1 - t)^{${b - 1}}dt\), to five decimals.`, answer: val, tol: 1e-5, x: T`\(\frac{\Gamma(${a})\Gamma(${b})}{\Gamma(${a + b})} = \frac{${fct(a - 1)}\cdot${fct(b - 1)}}{${fct(a + b - 1)}}\).`, v: `integrate(Symbol('t')**${a - 1}*(1 - Symbol('t'))**${b - 1}, (Symbol('t'), 0, 1))` }; }
      if (k === 2) { const l = R.int(2, 5), x0 = R.pick([0.5, -0.5, 0.2, 1, 0]); let p0 = 1, p1 = x0; for (let n = 1; n < l; n++) [p0, p1] = [p1, ((2 * n + 1) * x0 * p1 - n * p0) / (n + 1)];
        return { q: T`Compute the Legendre polynomial \(P_{${l}}(${x0})\), to five decimals.`, answer: p1, tol: 1e-5, x: T`Recurrence \((\ell + 1)P_{\ell+1} = (2\ell + 1)xP_\ell - \ell P_{\ell-1}\) from \(P_0 = 1\), \(P_1 = x\).`, v: `legendre(${l}, nsimplify(${x0}))` }; }
      const n = R.int(2, 5), x0 = R.int(-1, 2); let h0 = 1, h1 = 2 * x0; for (let m = 1; m < n; m++) [h0, h1] = [h1, 2 * x0 * h1 - 2 * m * h0];
      return { q: T`Compute the Hermite polynomial \(H_{${n}}(${x0})\) (physicists' convention).`, answer: h1, x: T`\(H_{n+1} = 2xH_n - 2nH_{n-1}\) from \(H_0 = 1\), \(H_1 = 2x\).`, v: `hermite(${n}, ${x0})` };
    } }],
    [U[6]]: [{ id: 'mm-var', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const c = R.int(1, 4), A = R.int(-2, 3); // L = y'^2/2 + c x y => y'' = c x ; y(0)=0, y(1)=A: y = c x^3/6 + (A - c/6) x
        const x0 = 0.5, val = c * x0 ** 3 / 6 + (A - c / 6) * x0;
        return { q: T`Find the extremal of \(\int_0^1\left(\tfrac12y'^2 + ${c}xy\right)dx\) with \(y(0) = 0\), \(y(1) = ${A}\), and give \(y(0.5)\) to five decimals.`, answer: val, tol: 1e-5, x: T`Euler–Lagrange: \(y'' = ${c}x\), so \(y = \frac{${c}x^3}{6} + cx\) with the constant fixed by \(y(1) = ${A}\).`, v: `dsolve(Derivative(Function('y')(Symbol('x')), Symbol('x'), 2) - ${c}*Symbol('x'), Function('y')(Symbol('x')), ics={Function('y')(0): 0, Function('y')(1): ${A}}).rhs.subs(Symbol('x'), Rational(1, 2))` }; }
      const a = R.pick([1, 4, 9]), w = Math.sqrt(a), sign = R.pick([1, -1]), A = R.int(1, 3);
      // L = y'^2 + sign*a*y^2  => y'' = sign*a*y ; y(0)=0,y(1)=A
      const val = sign > 0 ? A * Math.sinh(w * 0.5) / Math.sinh(w) : A * Math.sin(w * 0.5) / Math.sin(w);
      return { q: T`Find the extremal of \(\int_0^1\left(y'^2 ${sign > 0 ? '+' : '-'} ${a}y^2\right)dx\) with \(y(0) = 0\), \(y(1) = ${A}\), and give \(y(0.5)\) to four decimals.`, answer: val, tol: 1e-4, x: T`Euler–Lagrange: \(y'' = ${sign > 0 ? '' : '-'}${a}y\), so \(y = ${A}\frac{${sign > 0 ? '\\sinh' : '\\sin'}(${w}x)}{${sign > 0 ? '\\sinh' : '\\sin'}(${w})}\).`, v: `dsolve(Derivative(Function('y')(Symbol('x')), Symbol('x'), 2) - (${sign * a})*Function('y')(Symbol('x')), Function('y')(Symbol('x')), ics={Function('y')(0): 0, Function('y')(1): ${A}}).rhs.subs(Symbol('x'), Rational(1, 2))` };
    } }],
    [U[7]]: [{ id: 'mm-la', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.int(-3, 4), b = R.nz(-3, 3), d = R.int(-3, 4), hi = R.int(0, 1), m = (a + d) / 2, r = Math.sqrt(((a - d) / 2) ** 2 + b * b), val = hi ? m + r : m - r;
        return { q: T`Find the ${hi ? 'larger' : 'smaller'} eigenvalue of \(\begin{pmatrix}${a} & ${b}\\ ${b} & ${d}\end{pmatrix}\), to four decimals.`, answer: val, tol: 1e-4, x: T`\(\frac{a + d}{2} \pm \sqrt{\left(\frac{a - d}{2}\right)^2 + b^2} = ${m} \pm ${R.fmt(r, 4)}\).`, v: `float(sorted(np.linalg.eigvalsh(np.array([[${a}, ${b}], [${b}, ${d}]], dtype=float)))[${hi}])` }; }
      if (k === 1) { const kk = R.int(1, 4), m = R.int(1, 3), hi = R.int(0, 1), val = Math.sqrt((hi ? 3 : 1) * kk / m);
        return { q: T`Two masses \(m = ${m}\) are connected wall–spring–mass–spring–mass–spring–wall, all springs \(k = ${kk}\). Find the ${hi ? 'higher' : 'lower'} normal-mode angular frequency, to four decimals.`, answer: val, tol: 1e-4, x: T`\(K = k\begin{pmatrix}2 & -1\\ -1 & 2\end{pmatrix}\), eigenvalues \(k\) and \(3k\). \(\omega = \sqrt{\lambda/m}\).`, v: `float(np.sqrt(sorted(np.linalg.eigvalsh(np.array([[2*${kk}, -${kk}], [-${kk}, 2*${kk}]], dtype=float)/${m}))[${hi}]))` }; }
      const P = [['\\sigma_x\\sigma_y', 'i\\sigma_z', 'sx*sy'], ['\\sigma_y\\sigma_z', 'i\\sigma_x', 'sy*sz'], ['\\sigma_z\\sigma_x', 'i\\sigma_y', 'sz*sx'], ['\\sigma_y\\sigma_x', '-i\\sigma_z', 'sy*sx'], ['\\sigma_x^2', 'I', 'sx*sx'], ['[\\sigma_x, \\sigma_y]', '2i\\sigma_z', 'sx*sy - sy*sx']], [e, ans, py] = R.pick(P), opts = ['i\\sigma_z', 'i\\sigma_x', 'i\\sigma_y', '-i\\sigma_z', 'I', '2i\\sigma_z', '0'];
      const toPy = { 'i\\sigma_z': 'I*sz', 'i\\sigma_x': 'I*sx', 'i\\sigma_y': 'I*sy', '-i\\sigma_z': '-I*sz', 'I': 'eye(2)', '2i\\sigma_z': '2*I*sz', '0': 'zeros(2)' };
      return { q: T`Simplify \(${e}\).`, c: [T`\(${ans}\)`, ...R.shuffle(opts.filter(o => o !== ans)).slice(0, 3).map(o => T`\(${o}\)`)], x: T`Using \(\sigma_x\sigma_y = i\sigma_z\) cyclically, \(\sigma_j\sigma_i = -\sigma_i\sigma_j\) for \(i \ne j\), and \(\sigma_i^2 = I\).`, key: ans,
        vk: `(lambda sx, sy, sz: [k for k, v in ${'{' + Object.entries(toPy).map(([k2, v2]) => `'${k2.replace(/\\/g, '\\\\')}': ${v2}`).join(', ') + '}'}.items() if v == ${py}][0])(Matrix([[0, 1], [1, 0]]), Matrix([[0, -I], [I, 0]]), Matrix([[1, 0], [0, -1]]))` };
    } }],
    [U[8]]: [{ id: 'mm-asym', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const n = R.pick([10, 20, 50, 100, 1000]), ask = R.int(0, 1), st = n * Math.log(n) - n + (ask ? 0.5 * Math.log(2 * Math.PI * n) : 0);
        return { q: T`Estimate \(\ln(${n}!)\) using ${ask ? '\\(n\\ln n - n + \\frac12\\ln(2\\pi n)\\)' : '\\(n\\ln n - n\\)'}, to three decimals.`, answer: st, tol: 0.001, x: T`\(${n}\ln${n} - ${n}${ask ? ` + \\frac12\\ln(${2 * n}\\pi)` : ''} \approx ${R.fmt(st, 4)}\). Exact: \(\ln${n}! \approx ${R.fmt(st + (ask ? 1 / (12 * n) : 0.5 * Math.log(2 * Math.PI * n) + 1 / (12 * n)), 4)}\).`, v: `${n}*log(${n}) - ${n}${ask ? ` + log(2*pi*${n})/2` : ''}` }; }
      const a = R.pick([1, 2, 4, 0.5, 9]), m = R.int(0, 1), val = m ? 0.5 * Math.sqrt(Math.PI / a ** 3) : Math.sqrt(Math.PI / a);
      return { q: T`Compute \(\int_{-\infty}^{\infty}${m ? 'x^2' : ''}e^{-${a}x^2}dx\), to four decimals.`, answer: val, tol: 1e-4, x: m ? T`\(\frac12\sqrt{\frac{\pi}{a^3}}\) with \(a = ${a}\).` : T`\(\sqrt{\frac\pi a}\) with \(a = ${a}\).`, v: `integrate(Symbol('x')**${2 * m}*exp(-nsimplify(${a})*Symbol('x')**2), (Symbol('x'), -oo, oo))` };
    } }]
  } });
})();
