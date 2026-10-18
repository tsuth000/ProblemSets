'use strict';
// Pure math track, stage 3: Functional analysis. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'fa', name: 'Functional analysis', color: '#3B6B6B', blurb: 'Normed and Banach spaces, Hilbert spaces, orthonormal bases, operator norms, duality, the big theorems, spectra, contractions, weak convergence', questions: [], generators: [] });
  const U = ['Normed spaces', 'Banach spaces and sequence spaces', 'Inner products and Hilbert spaces', 'Orthonormal bases and best approximation', 'Bounded operators and operator norms', 'Dual spaces', 'The big theorems', 'Spectra and compact operators', 'Contraction mappings', 'Weak convergence'];

  registerLearn('fa', [
    { title: U[0], skill: U[0],
      hook: T`<p>Functional analysis does linear algebra in spaces of functions, which are infinite-dimensional. The first step is to measure size with a norm, which turns the space into one where limits make sense.</p>`,
      body: T`
<p>A <b>norm</b> satisfies \(\|v\| \ge 0\) with equality only at 0, \(\|cv\| = |c|\|v\|\), and \(\|u + v\| \le \|u\| + \|v\|\).</p>
<table class="tt"><tr><th>Norm on \(\mathbb R^n\)</th><th>Formula</th><th>Unit ball in \(\mathbb R^2\)</th></tr>
<tr><td>\(\|v\|_1\)</td><td>\(\sum|v_i|\)</td><td>diamond</td></tr>
<tr><td>\(\|v\|_2\)</td><td>\(\sqrt{\sum v_i^2}\)</td><td>disk</td></tr>
<tr><td>\(\|v\|_p\)</td><td>\(\left(\sum|v_i|^p\right)^{1/p}\)</td><td>between</td></tr>
<tr><td>\(\|v\|_\infty\)</td><td>\(\max|v_i|\)</td><td>square</td></tr></table>
<p>For \(v = (3, -4, 1)\): \(\|v\|_1 = 8\), \(\|v\|_2 = \sqrt{26}\), \(\|v\|_\infty = 4\). Always \(\|v\|_\infty \le \|v\|_p \le \|v\|_1\), and \(\|v\|_p \to \|v\|_\infty\) as \(p \to \infty\).</p>
<p><b>Equivalence.</b> In finite dimensions all norms are equivalent: \(c\|v\| \le \|v\|' \le C\|v\|\). So convergence does not depend on the norm. Example: \(\|v\|_\infty \le \|v\|_2 \le \sqrt n\|v\|_\infty\).</p>
<p><b>Infinite dimensions differ.</b> On \(C[0, 1]\), the sup norm \(\|f\|_\infty = \max|f|\) and the norm \(\|f\|_1 = \int_0^1|f|\) are not equivalent: \(f_n = x^n\) has \(\|f_n\|_1 = \frac1{n + 1} \to 0\) while \(\|f_n\|_\infty = 1\). The closed unit ball is compact iff the dimension is finite (Riesz).</p>`,
      ex: { q: T`Find \(\|(1, -2, 2)\|_p\) for \(p = 1, 2, 3, \infty\).`, a: T`<p>\(p = 1\): 5. \(p = 2\): \(\sqrt9 = 3\). \(p = 3\): \((1 + 8 + 8)^{1/3} = 17^{1/3} \approx 2.571\). \(p = \infty\): 2. The values decrease with \(p\).</p>` },
      trap: T`Assuming all norms are equivalent in infinite dimensions.`,
      vary: [[T`\(\|(3, 4)\|_2\)?`, 5, T`3-4-5.`], [T`\(\|(3, 4)\|_1\)?`, 7, T`Sum.`], [T`\(\|x^3\|_\infty\) on \([0, 2]\)?`, 8, T`Max.`], [T`\(\|x^3\|_1\) on \([0, 2]\)?`, 4, T`\(\frac{16}{4}\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>A Banach space is a normed space with no holes: every Cauchy sequence converges. Completeness is what makes infinite series, fixed point arguments, and limits of approximations work.</p>`,
      body: T`
<p><b>Complete examples.</b> \(\mathbb R^n\) with any norm; \(C[a, b]\) with the sup norm (a uniform limit of continuous functions is continuous); \(L^p\); and the sequence spaces</p>
\[\ell^p = \left\{(x_n) : \sum|x_n|^p < \infty\right\},\qquad \ell^\infty = \{\text{bounded sequences}\}\]
<p><b>Incomplete examples.</b> Polynomials on \([0, 1]\) with the sup norm (Taylor polynomials of \(e^x\) are Cauchy with a non-polynomial limit). \(C[0, 1]\) with \(\|f\|_1\): continuous ramps converge in \(L^1\) to a step function.</p>
<p><b>Geometric sequences.</b> For \(x_n = r^n\) (\(n \ge 0\), \(0 < r < 1\)):</p>
\[\|x\|_p = \left(\sum r^{np}\right)^{1/p} = \left(\frac{1}{1 - r^p}\right)^{1/p},\qquad \|x\|_\infty = 1\]
<p><b>Membership.</b> \(\left(\frac1n\right) \in \ell^2 \setminus \ell^1\); \(\left(\frac{1}{\sqrt n}\right) \in \ell^\infty \setminus \ell^2\). \(\ell^p \subseteq \ell^q\) for \(p < q\) (the reverse of the inclusion on finite measure spaces).</p>
<p><b>Absolutely convergent series.</b> A normed space is complete iff every series with \(\sum\|v_n\| < \infty\) converges.</p>`,
      ex: { q: T`Is \(x_n = \frac{1}{n^{0.6}}\) in \(\ell^1\)? \(\ell^2\)?`, a: T`<p>\(\ell^1\): \(\sum n^{-0.6}\) diverges (\(p = 0.6 < 1\)). \(\ell^2\): \(\sum n^{-1.2}\) converges. So it is in \(\ell^2\) only.</p>` },
      trap: T`Expecting \(\ell^1 \supseteq \ell^2\). For sequences the inclusion goes \(\ell^1 \subseteq \ell^2\).`,
      vary: [[T`\(\|(2^{-n})_{n\ge0}\|_1\)?`, 2, T`\(\frac{1}{1 - 1/2}\).`], [T`\(\|(2^{-n})_{n\ge0}\|_\infty\)?`, 1, T`First term.`], [T`Is \((1/n)\) in \(\ell^1\)? 1 yes, 0 no.`, 0, T`Harmonic.`], [T`\(\|(1/n)_{n\ge1}\|_2\), four decimals.`, Math.PI / Math.sqrt(6), T`\(\sqrt{\pi^2/6}\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>An inner product adds angles to lengths. Spaces with one, Hilbert spaces, behave most like Euclidean space: orthogonal projections exist and every element has coordinates in an orthonormal basis.</p>`,
      body: T`
<p><b>Inner product</b> \(\langle u, v\rangle\): linear in the first slot, conjugate symmetric, positive. Norm \(\|v\| = \sqrt{\langle v, v\rangle}\). On \(L^2[a, b]\): \(\langle f, g\rangle = \int_a^bf\bar g\).</p>
<p><b>Cauchy–Schwarz:</b> \(|\langle u, v\rangle| \le \|u\|\|v\|\), with equality iff parallel.</p>
<p><b>Parallelogram law:</b> \(\|u + v\|^2 + \|u - v\|^2 = 2\|u\|^2 + 2\|v\|^2\). A norm comes from an inner product iff it satisfies this (Jordan–von Neumann). Among the \(p\)-norms only \(p = 2\) does: \(u = (1, 0)\), \(v = (0, 1)\) in \(\|\cdot\|_1\) gives \(4 + 4 \ne 2 + 2\).</p>
<p><b>Projection onto a vector.</b> The closest multiple of \(g\) to \(f\) is \(\frac{\langle f, g\rangle}{\langle g, g\rangle}g\). In \(L^2[0, 1]\), projecting \(x^2\) onto \(x\): \(\frac{\int x^3}{\int x^2} = \frac{1/4}{1/3} = \frac34\).</p>
<p><b>Projection theorem.</b> In a Hilbert space, every closed subspace \(M\) has a unique closest point \(Pv\) to each \(v\), with \(v - Pv \perp M\); so \(H = M \oplus M^\perp\).</p>
<p><b>Gram–Schmidt</b> on \(1, x, x^2\) in \(L^2[-1, 1]\) gives multiples of the Legendre polynomials \(1, x, x^2 - \frac13\).</p>`,
      ex: { q: T`In \(L^2[0, 1]\), find the angle between \(f = 1\) and \(g = x\).`, a: T`<p>\(\langle f, g\rangle = \frac12\), \(\|f\| = 1\), \(\|g\| = \frac1{\sqrt3}\). \(\cos\theta = \frac{1/2}{1/\sqrt3} = \frac{\sqrt3}{2}\), so \(\theta = \frac\pi6\).</p>` },
      trap: T`Projecting with \(\frac{\langle f, g\rangle}{\|g\|}\) instead of \(\frac{\langle f, g\rangle}{\|g\|^2}\).`,
      vary: [[T`\(\langle x, x^2\rangle\) in \(L^2[0, 1]\)?`, 0.25, T`\(\int x^3\).`], [T`Projection coefficient of \(x\) onto 1 in \(L^2[0, 2]\)?`, 1, T`\(\frac{2}{2}\).`], [T`Does \(\|\cdot\|_\infty\) on \(\mathbb R^2\) satisfy the parallelogram law? 1 yes, 0 no.`, 0, T`\((1, 0), (0, 1)\): \(2 \ne 4\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>An orthonormal basis gives every vector coordinates, and truncating them gives the best approximation from a subspace. Fourier series and least-squares fits are both this one idea.</p>`,
      body: T`
<p><b>Orthonormal set</b> \(\{e_k\}\): \(\langle e_j, e_k\rangle = \delta_{jk}\). The best approximation of \(v\) from \(\text{span}\{e_1, \ldots, e_n\}\) is \(\sum\langle v, e_k\rangle e_k\).</p>
<p><b>Bessel:</b> \(\sum|\langle v, e_k\rangle|^2 \le \|v\|^2\). <b>Parseval:</b> equality for all \(v\) iff the set is complete (an orthonormal basis), and then \(v = \sum\langle v, e_k\rangle e_k\).</p>
<p><b>Squared error</b> of the best approximation: \(\|v\|^2 - \sum_{k\le n}|\langle v, e_k\rangle|^2\).</p>
<p><b>Legendre polynomials</b> \(P_0 = 1\), \(P_1 = x\), \(P_2 = \frac{3x^2 - 1}{2}\), \(P_3 = \frac{5x^3 - 3x}{2}\) are orthogonal on \([-1, 1]\) with \(\int_{-1}^1P_n^2 = \frac{2}{2n + 1}\). The best degree-\(n\) approximation of \(f\) in \(L^2[-1, 1]\) is \(\sum c_kP_k\) with</p>
\[c_k = \frac{2k + 1}{2}\int_{-1}^1fP_k\,dx\]
<p><b>Example.</b> Best constant approximation of \(x^2\) on \([-1, 1]\): \(c_0 = \frac12\int x^2 = \frac13\). Best linear: still \(\frac13\), since \(c_1 = \frac32\int x^3 = 0\).</p>
<p><b>Separable Hilbert spaces</b> all look like \(\ell^2\): the map \(v \mapsto (\langle v, e_k\rangle)\) is an isometric isomorphism.</p>`,
      ex: { q: T`Find the best approximation of \(e^x\) on \([-1, 1]\) by a constant, in \(L^2\), and the squared error.`, a: T`<p>\(c_0 = \frac12\int_{-1}^1e^x = \sinh1 \approx 1.1752\). Error: \(\int e^{2x} - 2c_0^2 = \sinh2 - 2\sinh^21 \approx 3.6269 - 2.7622 = 0.8647\).</p>` },
      trap: T`Forgetting the normalization \(\frac{2k + 1}{2}\) for the unnormalized Legendre polynomials.`,
      vary: [[T`\(\int_{-1}^1P_2^2\,dx\)?`, 0.4, T`\(\frac25\).`], [T`\(\int_{-1}^1P_1P_3\,dx\)?`, 0, T`Orthogonal.`], [T`Best constant approximation of \(x^4\) on \([-1, 1]\)?`, 0.2, T`\(\frac12\cdot\frac25\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>A linear map between normed spaces is continuous exactly when it is bounded: it stretches vectors by at most a fixed factor. That factor, the operator norm, depends on which norms you use.</p>`,
      body: T`
\[\|T\| = \sup_{v \ne 0}\frac{\|Tv\|}{\|v\|}\]
<p><b>Bounded ⇔ continuous</b> for linear maps. Every linear map between finite-dimensional spaces is bounded. Differentiation on polynomials with the sup norm on \([0, 1]\) is not: \(\|x^n\| = 1\) but \(\|nx^{n-1}\| = n\).</p>
<p><b>Matrix norms.</b></p>
<table class="tt"><tr><th>Vector norm</th><th>\(\|A\|\)</th></tr>
<tr><td>\(\ell^1\)</td><td>largest absolute column sum</td></tr>
<tr><td>\(\ell^\infty\)</td><td>largest absolute row sum</td></tr>
<tr><td>\(\ell^2\)</td><td>largest singular value \(\sqrt{\lambda_{\max}(A^TA)}\)</td></tr></table>
<p>For \(A = \begin{pmatrix}1 & -2\\ 3 & 4\end{pmatrix}\): \(\|A\|_1 = \max(4, 6) = 6\), \(\|A\|_\infty = \max(3, 7) = 7\).</p>
<p><b>Integral operators.</b> \((Kf)(x) = \int_0^1k(x, y)f(y)\,dy\) on \(C[0, 1]\) with the sup norm has \(\|K\| = \max_x\int_0^1|k(x, y)|\,dy\). The Volterra operator \(\int_0^xf\) has norm 1 there.</p>
<p><b>Neumann series.</b> If \(\|T\| < 1\), then \(I - T\) is invertible with \((I - T)^{-1} = \sum T^n\) and \(\|(I - T)^{-1}\| \le \frac{1}{1 - \|T\|}\).</p>`,
      ex: { q: T`Find \(\|A\|_2\) for \(A = \begin{pmatrix}3 & 0\\ 4 & 5\end{pmatrix}\).`, a: T`<p>\(A^TA = \begin{pmatrix}25 & 20\\ 20 & 25\end{pmatrix}\), eigenvalues 45 and 5. \(\|A\|_2 = \sqrt{45} \approx 6.708\).</p>` },
      trap: T`Mixing the rules: column sums give the \(\ell^1\) norm, row sums the \(\ell^\infty\) norm.`,
      vary: [[T`\(\|\text{diag}(2, -7, 3)\|_2\)?`, 7, T`Largest \(|\)entry\(|\).`], [T`\(\|K\|\) for \(k(x, y) = xy\) on \(C[0, 1]\)?`, 0.5, T`\(\max_x x\int y = \frac12\).`], [T`Bound on \(\|(I - T)^{-1}\|\) if \(\|T\| = 0.75\)?`, 4, T`\(\frac{1}{0.25}\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>The dual space collects all bounded linear functionals, the continuous ways to turn a vector into a number. Knowing the dual tells you what measurements a space supports.</p>`,
      body: T`
<p><b>Dual</b> \(X^*\): bounded linear maps \(X \to \mathbb R\) (or \(\mathbb C\)), with the operator norm.</p>
<p><b>Finite dimensions.</b> On \(\mathbb R^n\) with \(\|\cdot\|_p\), the functional \(\phi(v) = a\cdot v\) has norm \(\|a\|_q\), where \(\frac1p + \frac1q = 1\). So the dual of \(\ell^1\) carries \(\ell^\infty\), and \(\ell^2\) is its own dual.</p>
<p>Example: \(a = (3, -4)\). With the \(\ell^1\) norm on \(v\), \(\|\phi\| = \|a\|_\infty = 4\) (attained at \(v = (0, -1)\)). With the \(\ell^2\) norm, \(\|\phi\| = 5\). With \(\ell^\infty\), \(\|\phi\| = \|a\|_1 = 7\).</p>
<p><b>Sequence and function spaces.</b> \((\ell^p)^* = \ell^q\) and \((L^p)^* = L^q\) for \(1 \le p < \infty\) (for \(p = 1\), \(q = \infty\)). \((\ell^\infty)^*\) is strictly bigger than \(\ell^1\). \(C[a, b]^*\) is the space of signed measures (Riesz–Markov): \(f \mapsto f(0)\) is the Dirac measure.</p>
<p><b>Riesz representation (Hilbert).</b> Every bounded functional is \(\phi(v) = \langle v, w\rangle\) for a unique \(w\), with \(\|\phi\| = \|w\|\).</p>
<p><b>Hahn–Banach.</b> A bounded functional on a subspace extends to the whole space with the same norm. Consequence: for each \(v\) there is \(\phi\) with \(\|\phi\| = 1\) and \(\phi(v) = \|v\|\); functionals separate points.</p>`,
      ex: { q: T`On \(L^2[0, 1]\), find \(\|\phi\|\) for \(\phi(f) = \int_0^1xf(x)\,dx\).`, a: T`<p>Riesz: \(\phi(f) = \langle f, x\rangle\), so \(\|\phi\| = \|x\|_2 = \sqrt{\int_0^1x^2} = \frac{1}{\sqrt3} \approx 0.577\).</p>` },
      trap: T`Using \(\|a\|_p\) for the functional norm. It is the conjugate norm \(\|a\|_q\).`,
      vary: [[T`Norm of \(v \mapsto 2v_1 + v_2 - 2v_3\) on \((\mathbb R^3, \|\cdot\|_2)\)?`, 3, T`\(\sqrt{4 + 1 + 4}\).`], [T`Same functional on \((\mathbb R^3, \|\cdot\|_\infty)\)?`, 5, T`\(\|a\|_1\).`], [T`Norm of \(f \mapsto f(0)\) on \(C[0, 1]\) with the sup norm?`, 1, T`\(|f(0)| \le \|f\|_\infty\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Four theorems built on completeness give functional analysis its power. Each says that something true pointwise or algebraically is automatically true uniformly or continuously.</p>`,
      body: T`
<p><b>Baire category theorem.</b> A complete metric space is not a countable union of nowhere dense sets. Consequences: \(\mathbb R\) is uncountable; a Banach space of infinite dimension has no countable Hamel basis; "most" continuous functions are nowhere differentiable.</p>
<p><b>Uniform boundedness (Banach–Steinhaus).</b> If a family of bounded operators on a Banach space is bounded at each point (\(\sup_\alpha\|T_\alpha v\| < \infty\) for each \(v\)), then \(\sup_\alpha\|T_\alpha\| < \infty\). Consequence: there is a continuous function whose Fourier series diverges at a point.</p>
<p><b>Open mapping theorem.</b> A bounded linear surjection between Banach spaces maps open sets to open sets. <b>Inverse mapping:</b> a bounded linear bijection has a bounded inverse.</p>
<p><b>Closed graph theorem.</b> A linear map between Banach spaces is bounded iff its graph is closed.</p>
<p><b>Why completeness matters.</b> On polynomials with the sup norm (incomplete), the functionals \(\phi_n(p) = n\cdot(\text{coefficient of } x^n)\) are pointwise bounded (each polynomial has finitely many coefficients) but \(\|\phi_n\| \to \infty\).</p>
<p><b>Hahn–Banach</b> (previous unit) completes the list: extension and separation, needing no completeness at all.</p>`,
      ex: { q: T`Why can't an infinite-dimensional Banach space have a countable Hamel (algebraic) basis?`, a: T`<p>If \(\{e_1, e_2, \ldots\}\) were one, the space would be the union of the finite-dimensional subspaces \(\text{span}(e_1, \ldots, e_n)\). Each is closed with empty interior, so this contradicts Baire.</p>` },
      trap: T`Applying the open mapping theorem to an incomplete space.`,
      vary: [[T`Does a bounded linear bijection between Banach spaces have a bounded inverse? 1 yes, 0 no.`, 1, T`Inverse mapping theorem.`], [T`Can a Banach space be a countable union of nowhere dense sets? 1 yes, 0 no.`, 0, T`Baire.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>The spectrum generalizes eigenvalues to infinite dimensions. For compact operators it looks just like a matrix's, a sequence of eigenvalues shrinking to zero, which is why integral equations behave like linear systems.</p>`,
      body: T`
<p><b>Spectrum</b> \(\sigma(T) = \{\lambda : T - \lambda I \text{ is not invertible}\}\). It is closed, bounded by \(\|T\|\), and nonempty (in complex Banach spaces). In finite dimensions it is the set of eigenvalues.</p>
<p><b>Spectral radius</b> \(r(T) = \max|\lambda| = \lim\|T^n\|^{1/n} \le \|T\|\). For \(\begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}\), \(r = 0\) but \(\|T\| = 1\).</p>
<p><b>Compact operators</b> map bounded sets to sets with compact closure: limits of finite-rank operators, and integral operators with continuous (or \(L^2\)) kernels.</p>
<p><b>Spectral theorem (compact self-adjoint).</b> There is an orthonormal basis of eigenvectors, the eigenvalues are real, and nonzero ones have finite multiplicity and accumulate only at 0.</p>
<p><b>Examples on \(L^2[0, 1]\).</b></p>
<ul><li>Rank one, \(k(x, y) = g(x)g(y)\): one nonzero eigenvalue \(\|g\|^2\), eigenfunction \(g\). For \(k = xy\): \(\lambda = \frac13\).</li>
<li>\(k(x, y) = \min(x, y)\): \(Kf = \lambda f\) becomes \(-\lambda f'' = f\), \(f(0) = 0\), \(f'(1) = 0\), giving \(\lambda_n = \frac{1}{(n - \frac12)^2\pi^2}\).</li>
<li>Volterra \((Vf)(x) = \int_0^xf\): compact, \(\sigma(V) = \{0\}\), no eigenvalues at all.</li></ul>
<p><b>Fredholm alternative.</b> For compact \(K\) and \(\lambda \ne 0\): \(Kf - \lambda f = g\) has a unique solution for every \(g\) iff \(\lambda\) is not an eigenvalue.</p>`,
      ex: { q: T`Find the largest eigenvalue of \((Kf)(x) = \int_0^1\min(x, y)f(y)\,dy\).`, a: T`<p>\(n = 1\): \(\frac{1}{(\pi/2)^2} = \frac{4}{\pi^2} \approx 0.405\). It is also \(\|K\|\), since \(K\) is self-adjoint and positive.</p>` },
      trap: T`Expecting every operator to have an eigenvalue. The Volterra operator has none.`,
      vary: [[T`Spectral radius of \(\begin{pmatrix}0 & 4\\ 1 & 0\end{pmatrix}\)?`, 2, T`\(\lambda^2 = 4\).`], [T`Nonzero eigenvalue of \(k(x, y) = 1\) on \(L^2[0, 1]\)?`, 1, T`\(\|1\|^2\).`], [T`Spectral radius of the Volterra operator?`, 0, T`\(\|V^n\| \le \frac{1}{n!}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>If a map pulls every pair of points closer by a fixed factor, repeatedly applying it from any start converges to a unique fixed point. This one theorem proves existence for ODEs, integral equations, and Newton-type iterations.</p>`,
      body: T`
<p><b>Contraction:</b> \(d(Tx, Ty) \le q\,d(x, y)\) with \(q < 1\). For a differentiable \(T: \mathbb R \to \mathbb R\), the best \(q\) is \(\sup|T'|\).</p>
<p><b>Banach fixed point theorem.</b> On a complete metric space, a contraction has exactly one fixed point \(x^*\), and \(x_{n+1} = Tx_n\) converges to it from any \(x_0\), with</p>
\[d(x_n, x^*) \le \frac{q^n}{1 - q}d(x_0, x_1)\]
<p><b>Example.</b> \(T(x) = \frac12\cos x\): \(|T'| \le \frac12\), so it is a contraction on \(\mathbb R\). The fixed point solves \(x = \frac12\cos x\), \(x^* \approx 0.4502\). From \(x_0 = 0\), \(x_1 = 0.5\), the bound \(\frac{(1/2)^n}{1/2}(0.5) = 2^{-n}\) guarantees error below \(10^{-3}\) once \(n = 10\).</p>
<p><b>Picard–Lindelöf</b> follows: \((Ty)(x) = y_0 + \int_{x_0}^xf(t, y(t))\,dt\) is a contraction on a small enough interval (or with a weighted norm) when \(f\) is Lipschitz in \(y\).</p>
<p><b>Integral equations.</b> \(f(x) = g(x) + \lambda\int_0^1k(x, y)f(y)\,dy\) has a unique solution if \(|\lambda|\,\|K\| < 1\).</p>
<p><b>Completeness is needed:</b> \(T(x) = \frac x2\) on \((0, 1]\) contracts but has no fixed point there.</p>`,
      ex: { q: T`Is \(T(x) = \frac{x}{3} + \sin\frac{x}{4}\) a contraction on \(\mathbb R\)? Bound the error after 5 iterations if \(d(x_0, x_1) = 1\).`, a: T`<p>\(|T'| = \left|\frac13 + \frac14\cos\frac x4\right| \le \frac{7}{12} < 1\). Yes. Error \(\le \frac{(7/12)^5}{5/12} \approx 0.163\).</p>` },
      trap: T`Checking \(|T'| < 1\) at only one point. The bound must hold on the whole space.`,
      vary: [[T`Contraction constant of \(T(x) = 0.3\sin x + 2\)?`, 0.3, T`\(\sup|0.3\cos x|\).`], [T`Iterations needed with \(q = 0.5\), \(d(x_0, x_1) = 1\), error \(< 0.01\)?`, 8, T`\(\frac{0.5^n}{0.5} < 0.01\): \(n = 8\).`], [T`Fixed point of \(T(x) = \frac{x}{2} + 3\)?`, 6, T`\(x = \frac x2 + 3\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>In infinite dimensions, bounded sequences need not have convergent subsequences. Weak convergence, testing against every functional, restores compactness, and it is the right notion for oscillating sequences like \(\sin nx\).</p>`,
      body: T`
<p><b>Weak convergence</b> \(x_n \rightharpoonup x\): \(\phi(x_n) \to \phi(x)\) for every \(\phi \in X^*\). In a Hilbert space: \(\langle x_n, y\rangle \to \langle x, y\rangle\) for every \(y\).</p>
<p><b>Strong implies weak</b>, not conversely. The basis vectors \(e_n\) in \(\ell^2\): \(\langle e_n, y\rangle = y_n \to 0\) for every \(y \in \ell^2\), so \(e_n \rightharpoonup 0\), yet \(\|e_n\| = 1\).</p>
<p><b>Oscillation.</b> In \(L^2[0, \pi]\), \(\sin nx \rightharpoonup 0\) (Riemann–Lebesgue lemma: \(\int g(x)\sin nx\,dx \to 0\) for every integrable \(g\)), while \(\|\sin nx\|^2 = \frac\pi2\) for all \(n\). Example: \(\int_0^\pi x\sin nx\,dx = \frac{\pi(-1)^{n+1}}{n} \to 0\).</p>
<p><b>Facts.</b></p>
<ul><li>Weakly convergent sequences are bounded (uniform boundedness).</li>
<li>The norm is weakly lower semicontinuous: \(\|x\| \le \liminf\|x_n\|\).</li>
<li>In a Hilbert space, \(x_n \rightharpoonup x\) and \(\|x_n\| \to \|x\|\) together give strong convergence.</li>
<li>Banach–Alaoglu: the closed unit ball of \(X^*\) is weak-* compact. In a Hilbert space, every bounded sequence has a weakly convergent subsequence.</li></ul>
<p>This compactness drives existence proofs in the calculus of variations and PDEs: take a minimizing sequence, extract a weakly convergent subsequence, and use lower semicontinuity.</p>`,
      ex: { q: T`Does \(f_n = \sqrt{2}\sin(n\pi x)\) converge in \(L^2[0, 1]\)? Weakly?`, a: T`<p>\(\|f_n - f_m\|^2 = 2\) for \(n \ne m\) (orthonormal), so no subsequence converges strongly. Weakly, \(f_n \rightharpoonup 0\) by Riemann–Lebesgue.</p>` },
      trap: T`Concluding \(\|x\| = \lim\|x_n\|\) from weak convergence. The norm can drop in the limit.`,
      vary: [[T`\(\|\sin nx\|_{L^2[0, \pi]}^2\), four decimals.`, Math.PI / 2, T`\(\frac\pi2\).`], [T`Weak limit of \(e_n\) in \(\ell^2\): its norm?`, 0, T`\(e_n \rightharpoonup 0\).`], [T`\(\int_0^\pi x\sin 4x\,dx\), four decimals.`, -Math.PI / 4, T`\(\frac{\pi(-1)^5}{4}\).`]] }
  ]);

  addQuestions('fa', [
    { id: 'fa1', skill: U[0], q: T`In which setting are all norms equivalent?`, c: ['finite-dimensional vector spaces', 'every Banach space', 'Hilbert spaces', 'function spaces on [0, 1]'], x: T`Compactness of the unit sphere in finite dimensions.` },
    { id: 'fa2', skill: U[1], q: T`Which normed space is not complete?`, c: [T`\(C[0, 1]\) with \(\|f\|_1 = \int|f|\)`, T`\(C[0, 1]\) with the sup norm`, T`\(\ell^2\)`, T`\(\mathbb R^n\) with \(\|\cdot\|_1\)`], x: T`Continuous ramps converge in \(L^1\) to a step.` },
    { id: 'fa3', skill: U[2], q: T`A norm comes from an inner product exactly when it satisfies:`, c: ['the parallelogram law', 'the triangle inequality', 'Hölder’s inequality', 'completeness'], x: T`Jordan–von Neumann theorem.` },
    { id: 'fa4', skill: U[4], q: T`A linear map between normed spaces is continuous if and only if it is:`, c: ['bounded', 'injective', 'surjective', 'compact'], x: T`Continuity at 0 forces a uniform stretch bound.` },
    { id: 'fa5', skill: U[5], q: T`The dual of \(\ell^1\) is (isometric to):`, c: [T`\(\ell^\infty\)`, T`\(\ell^1\)`, T`\(\ell^2\)`, T`\(c_0\)`], x: T`Conjugate exponent of 1 is \(\infty\).` },
    { id: 'fa6', skill: U[6], q: T`Which theorem gives a continuous function whose Fourier series diverges at a point?`, c: ['uniform boundedness', 'Hahn–Banach', 'Riesz representation', 'Banach fixed point'], x: T`The Dirichlet kernels have unbounded \(L^1\) norms.` },
    { id: 'fa7', skill: U[7], q: T`The nonzero eigenvalues of a compact self-adjoint operator:`, c: ['are real and can accumulate only at 0', 'fill an interval', 'are all equal', 'must be positive'], x: T`Spectral theorem for compact self-adjoint operators.` },
    { id: 'fa8', skill: U[9], q: T`In \(\ell^2\), the standard basis vectors \(e_n\):`, c: ['converge weakly to 0 but not in norm', 'converge in norm to 0', 'do not converge weakly', 'converge weakly to (1, 1, 1, ...)'], x: T`\(\langle e_n, y\rangle = y_n \to 0\), \(\|e_n\| = 1\).` }
  ]);

  // ======================= GENERATORS =======================
  const pN = p => (p === Infinity ? '\\infty' : p);
  const pPy = p => (p === Infinity ? 'np.inf' : p);

  registerUnitGens('fa', { units: {
    [U[0]]: [{ id: 'fa-pnorm', make(R) {
      const n = R.int(2, 4), v = Array.from({ length: n }, () => R.int(-5, 5)); if (v.every(x => !x)) return this.make(R);
      const p = R.pick([1, 2, 3, Infinity]), a = v.map(Math.abs), val = p === Infinity ? Math.max(...a) : a.reduce((s, x) => s + x ** p, 0) ** (1 / p);
      return { q: T`Find \(\|(${v.join(', ')})\|_{${pN(p)}}\)${Number.isInteger(val) ? '' : ', to four decimals'}.`, answer: val, tol: 1e-4, x: p === Infinity ? T`The largest absolute entry: ${val}.` : T`\(\left(${a.map(x => `${x}^{${p}}`).join(' + ')}\right)^{1/${p}} = ${a.reduce((s, x) => s + x ** p, 0)}^{1/${p}} \approx ${R.fmt(val, 4)}\).`, v: `float(np.linalg.norm(np.array([${v}], dtype=float), ${pPy(p)}))` };
    } }],
    [U[1]]: [{ id: 'fa-seq', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const [r, rt] = R.pick([[0.5, '\\frac12'], [1 / 3, '\\frac13'], [0.25, '\\frac14'], [0.8, '0.8'], [2 / 3, '\\frac23']]), p = R.pick([1, 2, 3]), val = (1 / (1 - r ** p)) ** (1 / p);
        return { q: T`Find \(\|x\|_{\ell^{${p}}}\) for \(x_n = \left(${rt}\right)^n\), \(n = 0, 1, 2, \ldots\), to four decimals.`, answer: val, tol: 1e-4, x: T`\(\sum r^{np} = \frac{1}{1 - r^{${p}}}\); raise it to the power \(\frac1{${p}}\): \(\approx ${R.fmt(val, 4)}\).`, v: `summation(nsimplify(${r})**(${p}*Symbol('n', integer=True)), (Symbol('n', integer=True), 0, oo))**Rational(1, ${p})` }; }
      const a = R.pick([0.4, 0.5, 0.6, 0.75, 1, 1.5]), p = R.pick([1, 2, 3]), y = a * p > 1;
      return { q: T`Is \(x_n = n^{-${a}}\) in \(\ell^{${p}}\)?`, c: y ? ['Yes', 'No'] : ['No', 'Yes'], x: T`\(\sum n^{-${a}\cdot${p}}\) converges iff \(${R.fmt(a * p, 3)} > 1\). ${y ? 'It does.' : 'It does not.'}`, key: y ? 'Yes' : 'No', vk: `'Yes' if Sum(Symbol('n', integer=True, positive=True)**(-nsimplify(${a})*${p}), (Symbol('n', integer=True, positive=True), 1, oo)).is_convergent() else 'No'` };
    } }],
    [U[2]]: [
      { id: 'fa-proj', make(R) {
        const F = [['x', 'x'], ['x^2', 'x**2'], ['x^3', 'x**3'], ['1', '1'], ['e^x', 'exp(x)']], i = R.int(0, F.length - 1); let j; do { j = R.int(0, 3); } while (j === i);
        const [ft, fp] = F[i], [gt, gp] = F[j], L = R.pick([1, 2]);
        const pw = s => (s === '1' ? 0 : s === 'x' ? 1 : s === 'x**2' ? 2 : 3), I = (m) => L ** (m + 1) / (m + 1);
        const num = fp === 'exp(x)' ? (() => { const m = pw(gp); const ints = [Math.exp(L) - 1, Math.exp(L) * (L - 1) + 1, Math.exp(L) * (L * L - 2 * L + 2) - 2, Math.exp(L) * (L ** 3 - 3 * L * L + 6 * L - 6) + 6]; return ints[m]; })() : I(pw(fp) + pw(gp)), den = I(2 * pw(gp)), c = num / den;
        return { q: T`In \(L^2[0, ${L}]\), project \(f = ${ft}\) onto \(g = ${gt}\): find \(c\) with \(cg\) the closest multiple of \(g\) to \(f\). (Four decimals.)`, answer: c, tol: 1e-4, x: T`\(c = \frac{\langle f, g\rangle}{\langle g, g\rangle} = \frac{${R.fmt(num, 5)}}{${R.fmt(den, 5)}} \approx ${R.fmt(c, 4)}\), with both inner products integrals over \([0, ${L}]\).`,
          v: `(lambda x: integrate((${fp})*(${gp}), (x, 0, ${L}))/integrate((${gp})**2, (x, 0, ${L})))(Symbol('x'))` };
      } },
      { id: 'fa-para', make(R) {
        const p = R.pick([1, 2, 3, Infinity]);
        return { q: T`Does the norm \(\|\cdot\|_{${pN(p)}}\) on \(\mathbb R^2\) come from an inner product?`, c: p === 2 ? ['Yes', 'No'] : ['No', 'Yes'], x: p === 2 ? 'It is the dot product norm; the parallelogram law holds.' : T`Test \(u = (1, 0)\), \(v = (0, 1)\): \(\|u + v\|^2 + \|u - v\|^2 = ${R.fmt(2 * (p === Infinity ? 1 : 2 ** (2 / p)), 4)}\) but \(2\|u\|^2 + 2\|v\|^2 = 4\). The parallelogram law fails.`, key: p === 2 ? 'Yes' : 'No',
          vk: `(lambda N: 'Yes' if all(abs(N(u + v)**2 + N(u - v)**2 - 2*N(u)**2 - 2*N(v)**2) < 1e-9 for u in [np.array([1., 0.]), np.array([1., 2.]), np.array([3., -1.])] for v in [np.array([0., 1.]), np.array([2., 5.])]) else 'No')(lambda w: np.linalg.norm(w, ${pPy(p)}))` };
      } }
    ],
    [U[3]]: [{ id: 'fa-leg', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const m = R.int(0, 4), n = R.int(0, 4); return { q: T`Compute \(\int_{-1}^1P_{${m}}(x)P_{${n}}(x)\,dx\) for Legendre polynomials, to four decimals.`, answer: m === n ? 2 / (2 * n + 1) : 0, tol: 1e-4, x: m === n ? T`\(\frac{2}{2n + 1} = \frac{2}{${2 * n + 1}}\).` : 'Different degrees: orthogonal, so 0.', v: `integrate(legendre(${m}, Symbol('x'))*legendre(${n}, Symbol('x')), (Symbol('x'), -1, 1))` }; }
      const F = [['x^2', 'x**2'], ['x^4', 'x**4'], ['|x|', 'Abs(x)'], ['e^x', 'exp(x)'], ['x^3', 'x**3']], [t, py] = R.pick(F), kk = R.int(0, 2);
      const ints = { 'x**2': [2 / 3, 0, 4 / 15], 'x**4': [2 / 5, 0, 8 / 35], 'Abs(x)': [1, 0, 1 / 4], 'exp(x)': [Math.E - 1 / Math.E, 2 / Math.E, Math.E - 7 / Math.E], 'x**3': [0, 2 / 5, 0] }[py];
      const c = (2 * kk + 1) / 2 * ints[kk];
      return { q: T`In the best \(L^2[-1, 1]\) approximation of \(f = ${t}\) by \(\sum c_kP_k\), find \(c_{${kk}}\), to four decimals.`, answer: c, tol: 1e-4, x: T`\(c_{${kk}} = \frac{${2 * kk + 1}}{2}\int_{-1}^1f\,P_{${kk}}\,dx \approx ${R.fmt(c, 4)}\).`, v: `(lambda x: Rational(${2 * kk + 1}, 2)*integrate((${py})*legendre(${kk}, x), (x, -1, 1)))(Symbol('x', real=True))` };
    } }],
    [U[4]]: [{ id: 'fa-opn', make(R) {
      const n = 2, A = [[R.int(-4, 4), R.int(-4, 4)], [R.int(-4, 4), R.int(-4, 4)]]; if (A.flat().every(x => !x)) return this.make(R);
      const p = R.pick([1, Infinity, 2]);
      const val = p === 1 ? Math.max(...[0, 1].map(j => Math.abs(A[0][j]) + Math.abs(A[1][j]))) : p === Infinity ? Math.max(...A.map(r => Math.abs(r[0]) + Math.abs(r[1]))) : (() => { const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1], s = a * a + b * b + c * c + d * d, det = a * d - b * c; return Math.sqrt((s + Math.sqrt(s * s - 4 * det * det)) / 2); })();
      return { q: T`Find the operator norm \(\|A\|_{${pN(p)}}\) of \(A = \begin{pmatrix}${A[0][0]} & ${A[0][1]}\\ ${A[1][0]} & ${A[1][1]}\end{pmatrix}\)${Number.isInteger(val) ? '' : ', to four decimals'}.`, answer: val, tol: 1e-4, x: p === 1 ? 'Largest absolute column sum.' : p === Infinity ? 'Largest absolute row sum.' : T`Largest singular value, \(\sqrt{\lambda_{\max}(A^TA)} \approx ${R.fmt(val, 4)}\).`, v: `float(np.linalg.norm(np.array([[${A[0]}], [${A[1]}]], dtype=float), ${p === Infinity ? 'np.inf' : p}))` };
    } }],
    [U[5]]: [{ id: 'fa-dual', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const a = Array.from({ length: 3 }, () => R.nz(-4, 4)); const p = R.pick([1, 2, Infinity]), q = p === 1 ? Infinity : p === 2 ? 2 : 1, A = a.map(Math.abs), val = q === Infinity ? Math.max(...A) : q === 2 ? Math.hypot(...A) : A.reduce((s, x) => s + x, 0);
        return { q: T`Find the norm of \(\phi(v) = ${a[0]}v_1 ${a[1] < 0 ? '-' : '+'} ${Math.abs(a[1])}v_2 ${a[2] < 0 ? '-' : '+'} ${Math.abs(a[2])}v_3\) on \((\mathbb R^3, \|\cdot\|_{${pN(p)}})\)${Number.isInteger(val) ? '' : ', to four decimals'}.`, answer: val, tol: 1e-4, x: T`The dual norm is \(\|a\|_{${pN(q)}}\) with \(a = (${a.join(', ')})\): ${R.fmt(val, 4)}.`, v: `float(max(abs(${a[0]}*x + ${a[1]}*y + ${a[2]}*z)/np.linalg.norm(np.array([x, y, z], dtype=float), ${pPy(p)}) for x in np.linspace(-1, 1, 9) for y in np.linspace(-1, 1, 9) for z in np.linspace(-1, 1, 9) if (x, y, z) != (0, 0, 0)))` }; }
      const F = [['x', 'x', 1 / Math.sqrt(3)], ['x^2', 'x**2', 1 / Math.sqrt(5)], ['1', '1', 1], ['\\sqrt x', 'sqrt(x)', 1 / Math.sqrt(2)]], [t, py, val] = R.pick(F);
      return { q: T`On \(L^2[0, 1]\), find \(\|\phi\|\) for \(\phi(f) = \int_0^1${t === '1' ? '' : t}f(x)\,dx\), to four decimals.`, answer: val, tol: 1e-4, x: T`Riesz: \(\phi = \langle\cdot, ${t}\rangle\), so \(\|\phi\| = \|${t}\|_2 = \sqrt{\int_0^1(${t})^2dx}\).`, v: `(lambda x: sqrt(integrate((${py})**2, (x, 0, 1))))(Symbol('x', positive=True))` };
    } }],
    [U[6]]: [{ id: 'fa-big', make(R) {
      const P = [['A bounded linear bijection between Banach spaces has a bounded inverse.', 'Open mapping (inverse mapping) theorem'], ['If a family of bounded operators on a Banach space is bounded at every point, it is uniformly bounded.', 'Uniform boundedness principle'], ['A linear map between Banach spaces with closed graph is bounded.', 'Closed graph theorem'], ['A bounded functional on a subspace extends to the whole space with the same norm.', 'Hahn–Banach theorem'], ['A complete metric space is not a countable union of nowhere dense sets.', 'Baire category theorem'], ['Every bounded functional on a Hilbert space is an inner product with a fixed vector.', 'Riesz representation theorem']];
      const [s, name] = R.pick(P), names = P.map(x => x[1]);
      return { q: T`Which theorem states: ${s}`, c: [name, ...R.shuffle(names.filter(x => x !== name)).slice(0, 3)], x: T`This is the ${name}.`, key: name, vk: `'${name}'` };
    } }],
    [U[7]]: [{ id: 'fa-spec', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { let a, b, c, d; do { a = R.int(-4, 4); b = R.int(-4, 4); c = R.int(-4, 4); d = R.int(-4, 4); } while (!(a || b || c || d)); const tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det; const r = disc >= 0 ? Math.max(Math.abs((tr + Math.sqrt(disc)) / 2), Math.abs((tr - Math.sqrt(disc)) / 2)) : Math.sqrt(det);
        return { q: T`Find the spectral radius of \(\begin{pmatrix}${a} & ${b}\\ ${c} & ${d}\end{pmatrix}\)${Number.isInteger(r) ? '' : ', to four decimals'}.`, answer: r, tol: 1e-4, x: T`Eigenvalues solve \(\lambda^2 - ${tr}\lambda + ${det} = 0\). ${disc >= 0 ? 'Take the larger absolute value.' : T`They are complex conjugates with \(|\lambda|^2 = \det = ${det}\).`}`, v: `float(max(abs(np.linalg.eigvals(np.array([[${a}, ${b}], [${c}, ${d}]], dtype=float)))))` }; }
      if (k === 1) { const n = R.int(1, 4), val = 1 / ((n - 0.5) ** 2 * Math.PI ** 2); return { q: T`Find eigenvalue \(\lambda_{${n}}\) (in decreasing order) of \((Kf)(x) = \int_0^1\min(x, y)f(y)\,dy\) on \(L^2[0, 1]\), to five decimals.`, answer: val, tol: 1e-5, x: T`\(\lambda_n = \frac{1}{(n - \frac12)^2\pi^2}\): \(\frac{1}{${R.fmt((n - 0.5) ** 2, 3)}\pi^2}\).`, v: `sorted(np.linalg.eigvalsh(np.minimum.outer(np.linspace(0.5/1200, 1 - 0.5/1200, 1200), np.linspace(0.5/1200, 1 - 0.5/1200, 1200))/1200))[-${n}]` }; }
      const G = [['x', 'x', 1 / 3], ['1', '1', 1], ['x^2', 'x**2', 1 / 5], ['\\sqrt x', 'sqrt(x)', 0.5]], [t, py, val] = R.pick(G);
      return { q: T`Find the nonzero eigenvalue of \((Kf)(x) = \int_0^1k(x, y)f(y)\,dy\) with \(k(x, y) = g(x)g(y)\), \(g = ${t}\).`, answer: val, tol: 1e-6, x: T`Rank one: \(Kg = \|g\|^2g\), so \(\lambda = \int_0^1(${t})^2dx = ${R.fmt(val, 4)}\).`, v: `(lambda x: integrate((${py})**2, (x, 0, 1)))(Symbol('x', positive=True))` };
    } }],
    [U[8]]: [{ id: 'fa-contr', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.pick([0.2, 0.3, 0.5, 0.25, 0.6]), b = R.int(-3, 3), f = R.pick([['\\sin x', 'sin(x)', T`\(|T'(x)| = ${a}|\cos x| \le ${a}\), with equality at \(x = 0\).`], ['\\cos x', 'cos(x)', T`\(|T'(x)| = ${a}|\sin x| \le ${a}\), with equality at \(x = \frac\pi2\).`], ['\\arctan x', 'atan(x)', T`\(|T'(x)| = \frac{${a}}{1 + x^2} \le ${a}\), with equality at \(x = 0\).`]]); return { q: T`Find the best contraction constant \(q = \sup|T'|\) of \(T(x) = ${a}${f[0]} ${b < 0 ? '-' : '+'} ${Math.abs(b)}\) on \(\mathbb R\).`, answer: a, tol: 1e-6, x: f[2], v: `float(max(abs(${a}*diff(${f[1]}, Symbol('x')).subs(Symbol('x'), t)) for t in [Rational(k, 100) for k in range(-400, 401)]))` }; }
      if (k === 1) { const q = R.pick([0.5, 0.25, 0.8, 0.9, 0.6]), d0 = R.pick([1, 2, 0.5]), e = R.pick([0.01, 0.001, 0.0001]); let n = 0; while (q ** n / (1 - q) * d0 >= e) n++;
        return { q: T`A contraction has \(q = ${q}\) and \(d(x_0, x_1) = ${d0}\). How many iterations guarantee \(d(x_n, x^*) < ${e}\) by the a priori bound?`, answer: n, x: T`Need \(\frac{${q}^n}{1 - ${q}}\cdot${d0} < ${e}\). The smallest such \(n\) is ${n}.`, v: `min(n for n in range(500) if nsimplify(${q})**n/(1 - nsimplify(${q}))*nsimplify(${d0}) < nsimplify(${e}))` }; }
      const a = R.pick([0.5, 0.25, 0.2, 0.75]), b = R.int(-4, 6);
      return { q: T`Find the fixed point of \(T(x) = ${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}\).`, answer: b / (1 - a), tol: 1e-6, x: T`\(x = ${a}x + ${b}\) gives \(x = \frac{${b}}{1 - ${a}}\).`, v: `reduce(lambda x, _: ${a}*x + ${b}, range(200), 0.0)` };
    } }],
    [U[9]]: [{ id: 'fa-weak', make(R) {
      const n = R.int(1, 8), k = R.int(0, 1);
      if (k === 0) return { q: T`Compute \(\int_0^\pi x\sin(${n}x)\,dx\), to four decimals.`, answer: Math.PI * (-1) ** (n + 1) / n, tol: 1e-4, x: T`By parts: \(\frac{\pi(-1)^{n+1}}{n}\). As \(n \to \infty\) these tend to 0, illustrating \(\sin nx \rightharpoonup 0\).`, v: `integrate(Symbol('x')*sin(${n}*Symbol('x')), (Symbol('x'), 0, pi))` };
      const L = R.pick([1, 2, Math.PI]), Lt = L === Math.PI ? '\\pi' : L, Lp = L === Math.PI ? 'pi' : L;
      return { q: T`Compute \(\|\sin(${L === Math.PI ? `${n}x` : L === 1 ? `${n}\\pi x` : `${n}\\pi x/${L}`})\|_{L^2[0, ${Lt}]}^2\), to four decimals.`, answer: L / 2, tol: 1e-4, x: T`\(\int_0^L\sin^2\frac{n\pi x}{L}dx = \frac L2\) for every \(n\): the norms stay fixed while the functions converge weakly to 0.`, v: `integrate(sin(${n}*pi*Symbol('x')/(${Lp}))**2, (Symbol('x'), 0, ${Lp}))` };
    } }]
  } });
})();
