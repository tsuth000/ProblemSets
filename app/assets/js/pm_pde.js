'use strict';
// Pure math track, stage 2: Fourier analysis and partial differential equations. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'pde', name: 'Fourier analysis and PDEs', color: '#6B4E2E', blurb: 'Fourier series and transforms, classification, transport, heat, wave, and Laplace equations, separation of variables, Sturm-Liouville eigenvalues', questions: [], generators: [] });
  const U = ['Fourier series', 'Convergence and Parseval', 'Half-range series', 'The Fourier transform', 'Classifying PDEs', 'Transport equation and characteristics', 'The heat equation', 'The wave equation', 'Laplace\u2019s equation', 'Sturm\u2013Liouville eigenvalue problems'];

  registerLearn('pde', [
    { title: U[0], skill: U[0],
      hook: T`<p>Any reasonable periodic signal is a sum of sines and cosines. The Fourier coefficients measure how much of each frequency the signal contains, and computing them is just integration against each wave.</p>`,
      body: T`
<p>For \(f\) with period \(2L\):</p>
\[\begin{aligned}f(x) \sim \frac{a_0}{2} &+ \sum_{n=1}^\infty a_n\cos\frac{n\pi x}{L}\\ &+ \sum_{n=1}^\infty b_n\sin\frac{n\pi x}{L}\end{aligned}\]
\[a_n = \frac1L\int_{-L}^Lf(x)\cos\frac{n\pi x}{L}dx,\qquad b_n = \frac1L\int_{-L}^Lf(x)\sin\frac{n\pi x}{L}dx\]
<p>The formulas come from <b>orthogonality</b>: \(\int_{-L}^L\sin\frac{m\pi x}{L}\sin\frac{n\pi x}{L}dx = 0\) for \(m \ne n\), and similarly for the other pairs.</p>
<p><b>Symmetry shortcuts</b> (on \([-\pi, \pi]\), \(L = \pi\)): an even \(f\) has only cosines (\(b_n = 0\)); an odd \(f\) has only sines (\(a_n = 0\)).</p>
<table class="tt"><tr><th>\(f\) on \((-\pi, \pi)\)</th><th>Series</th></tr>
<tr><td>\(x\)</td><td>\(\sum\frac{2(-1)^{n+1}}{n}\sin nx\)</td></tr>
<tr><td>\(x^2\)</td><td>\(\frac{\pi^2}{3} + \sum\frac{4(-1)^n}{n^2}\cos nx\)</td></tr>
<tr><td>\(|x|\)</td><td>\(\frac\pi2 - \sum_{n\text{ odd}}\frac{4}{\pi n^2}\cos nx\)</td></tr>
<tr><td>square wave \(\text{sign}(x)\)</td><td>\(\sum_{n\text{ odd}}\frac{4}{\pi n}\sin nx\)</td></tr></table>
<p><b>Decay and smoothness.</b> Jumps give coefficients of size \(\frac1n\); corners (continuous with jumps in \(f'\)) give \(\frac1{n^2}\). Smoother functions have faster-decaying coefficients.</p>`,
      ex: { q: T`Compute \(b_n\) for \(f(x) = x\) on \((-\pi, \pi)\).`, a: T`<p>Odd, so only sines. \(b_n = \frac1\pi\int_{-\pi}^\pi x\sin nx\,dx = \frac2\pi\int_0^\pi x\sin nx\,dx\). By parts: \(\int_0^\pi x\sin nx\,dx = -\frac{\pi\cos n\pi}{n}\). So \(b_n = \frac{2(-1)^{n+1}}{n}\).</p>` },
      trap: T`Forgetting the factor \(\frac12\) on \(a_0\). With the \(\frac1L\) formula, the constant term is \(\frac{a_0}{2}\), the average of \(f\).`,
      vary: [[T`\(b_3\) for \(f = x\) on \((-\pi, \pi)\), three decimals.`, 2 / 3, T`\(\frac{2}{3}\).`], [T`\(a_1\) for \(f = x^2\) on \((-\pi, \pi)\)?`, -4, T`\(\frac{4(-1)}{1}\).`], [T`Constant term \(\frac{a_0}{2}\) for \(f = |x|\), three decimals.`, Math.PI / 2, T`The average of \(|x|\).`], [T`\(b_2\) for the square wave?`, 0, T`Only odd \(n\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>A Fourier series converges to the function wherever the function is smooth, and to the midpoint of a jump at a jump. Parseval's identity turns the series into a machine for summing infinite series of numbers.</p>`,
      body: T`
<p><b>Dirichlet's theorem.</b> If \(f\) is piecewise smooth, its Fourier series converges at every \(x\) to</p>
\[\frac{f(x^-) + f(x^+)}{2}\]
<p>the average of the one-sided limits. The square wave's series equals 0 at \(x = 0\) and at \(x = \pm\pi\). The series for \(x\) on \((-\pi, \pi)\), extended periodically, equals 0 at \(x = \pi\), not \(\pi\).</p>
<p><b>Gibbs phenomenon.</b> Near a jump, partial sums overshoot by about 9% of the jump size, and the overshoot does not shrink as more terms are added; it only narrows.</p>
<p><b>Parseval's identity</b> (period \(2\pi\)):</p>
\[\frac1\pi\int_{-\pi}^\pi f^2\,dx = \frac{a_0^2}{2} + \sum_{n\ge1}(a_n^2 + b_n^2)\]
<p>For \(f = x\): left side \(\frac{2\pi^2}{3}\), right side \(\sum\frac{4}{n^2}\). So \(\sum\frac1{n^2} = \frac{\pi^2}{6}\). From \(x^2\): \(\sum\frac1{n^4} = \frac{\pi^4}{90}\).</p>
<p><b>Evaluating at a point</b> also sums series: the \(x^2\) series at \(x = \pi\) gives \(\pi^2 = \frac{\pi^2}{3} + 4\sum\frac1{n^2}\), the same \(\frac{\pi^2}{6}\).</p>`,
      ex: { q: T`\(f = 1\) on \((0, \pi)\), \(f = -1\) on \((-\pi, 0)\). To what value does its Fourier series converge at \(x = 0\) and at \(x = \frac\pi2\)?`, a: T`<p>At 0: \(\frac{-1 + 1}{2} = 0\). At \(\frac\pi2\), where \(f\) is continuous: 1. Setting \(x = \frac\pi2\) in \(\sum\frac4{\pi n}\sin nx\) gives \(1 - \frac13 + \frac15 - \cdots = \frac\pi4\).</p>` },
      trap: T`Assuming the series equals \(f\) at a jump. It equals the midpoint.`,
      vary: [[T`\(\sum_{n\ge1}\frac{1}{n^2}\), four decimals.`, Math.PI ** 2 / 6, T`\(\frac{\pi^2}{6}\).`], [T`Series for \(f = x\) on \((-\pi, \pi)\) at \(x = \pi\)?`, 0, T`Midpoint of \(\pi\) and \(-\pi\).`], [T`Gibbs overshoot as a percent of the jump, nearest whole number?`, 9, T`About 8.95%.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>A function given only on \([0, L]\) can be extended to be odd or even, producing a pure sine series or a pure cosine series. Which one to use depends on the boundary conditions of the problem.</p>`,
      body: T`
<p><b>Sine series</b> (odd extension), natural for zero values at both ends:</p>
\[f(x) = \sum b_n\sin\frac{n\pi x}{L},\qquad b_n = \frac2L\int_0^Lf(x)\sin\frac{n\pi x}{L}dx\]
<p><b>Cosine series</b> (even extension), natural for zero slope at both ends:</p>
\[f(x) = \frac{a_0}{2} + \sum a_n\cos\frac{n\pi x}{L},\qquad a_n = \frac2L\int_0^Lf(x)\cos\frac{n\pi x}{L}dx\]
<table class="tt"><tr><th>\(f\) on \([0, L]\)</th><th>Sine coefficient \(b_n\)</th></tr>
<tr><td>\(1\)</td><td>\(\frac{2(1 - (-1)^n)}{n\pi}\): \(\frac{4}{n\pi}\) for odd \(n\), 0 for even</td></tr>
<tr><td>\(x\)</td><td>\(\frac{2L(-1)^{n+1}}{n\pi}\)</td></tr>
<tr><td>\(x(L - x)\)</td><td>\(\frac{4L^2(1 - (-1)^n)}{n^3\pi^3}\): \(\frac{8L^2}{n^3\pi^3}\) for odd \(n\)</td></tr></table>
<p>The \(x(L - x)\) coefficients decay like \(\frac1{n^3}\) because its odd extension is smooth with continuous derivative; the constant 1 has jumps in its odd extension, so its coefficients decay only like \(\frac1n\).</p>`,
      ex: { q: T`Find the sine series coefficient \(b_1\) of \(f(x) = x(2 - x)\) on \([0, 2]\).`, a: T`<p>\(L = 2\): \(b_1 = \frac{8L^2}{\pi^3} = \frac{32}{\pi^3} \approx 1.032\).</p>` },
      trap: T`Using \(\frac1L\) instead of \(\frac2L\) for half-range coefficients. Integrating over half the period doubles the factor.`,
      vary: [[T`Sine coefficient \(b_2\) of \(f = 1\) on \([0, \pi]\)?`, 0, T`Even \(n\).`], [T`Sine coefficient \(b_1\) of \(f = 1\) on \([0, \pi]\), three decimals.`, 4 / Math.PI, T`\(\frac4\pi\).`], [T`Cosine-series constant \(\frac{a_0}{2}\) for \(f = x\) on \([0, 4]\)?`, 2, T`Average value.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>A non-periodic signal has a continuous spectrum: instead of discrete frequencies \(n\), every frequency \(\omega\) appears with some weight. The Fourier transform computes those weights.</p>`,
      body: T`
\[\hat f(\omega) = \int_{-\infty}^{\infty}f(x)e^{-i\omega x}dx,\qquad f(x) = \frac{1}{2\pi}\int_{-\infty}^\infty\hat f(\omega)e^{i\omega x}d\omega\]
<p>(Conventions differ by where the \(2\pi\) goes.) For an even \(f\), \(\hat f(\omega) = 2\int_0^\infty f(x)\cos\omega x\,dx\).</p>
<table class="tt"><tr><th>\(f(x)\)</th><th>\(\hat f(\omega)\)</th></tr>
<tr><td>\(e^{-a|x|}\)</td><td>\(\frac{2a}{a^2 + \omega^2}\)</td></tr>
<tr><td>1 on \([-a, a]\), else 0</td><td>\(\frac{2\sin a\omega}{\omega}\)</td></tr>
<tr><td>\(e^{-ax^2}\)</td><td>\(\sqrt{\frac\pi a}e^{-\omega^2/4a}\)</td></tr></table>
<p><b>Properties.</b></p>
<ul><li>Shift: \(f(x - c) \mapsto e^{-ic\omega}\hat f\).</li>
<li>Scaling: \(f(kx) \mapsto \frac1{|k|}\hat f\left(\frac\omega k\right)\): squeezing in \(x\) spreads in \(\omega\).</li>
<li>Derivative: \(f' \mapsto i\omega\hat f\), which turns linear PDEs with constant coefficients into ODEs.</li>
<li>Convolution: \(\widehat{f * g} = \hat f\,\hat g\).</li>
<li>Plancherel: \(\int|f|^2 = \frac1{2\pi}\int|\hat f|^2\).</li></ul>
<p><b>Uncertainty principle.</b> A function and its transform cannot both be sharply concentrated: the Gaussian is the extreme case, and this is the mathematics behind Heisenberg's principle.</p>`,
      ex: { q: T`Find \(\hat f(0)\) and \(\hat f(1)\) for \(f(x) = e^{-2|x|}\).`, a: T`<p>\(\hat f(\omega) = \frac{4}{4 + \omega^2}\): \(\hat f(0) = 1\) (the total area), \(\hat f(1) = 0.8\).</p>` },
      trap: T`Forgetting that \(\hat f(0)\) is the integral of \(f\). It is a quick check on any transform.`,
      vary: [[T`\(\hat f(0)\) for \(f = 1\) on \([-3, 3]\)?`, 6, T`Area.`], [T`\(\hat f(2)\) for \(f = e^{-|x|}\)?`, 0.4, T`\(\frac{2}{1 + 4}\).`], [T`\(\hat f(0)\) for \(e^{-x^2}\), four decimals.`, Math.sqrt(Math.PI), T`\(\sqrt\pi\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Second-order linear PDEs come in three types, named after conic sections. The type predicts the behavior: diffusion smooths, waves travel, and equilibria are determined by their boundary values.</p>`,
      body: T`
<p>For \(Au_{xx} + Bu_{xy} + Cu_{yy} + \text{(lower order)} = 0\), compute the discriminant \(B^2 - 4AC\):</p>
<table class="tt"><tr><th>\(B^2 - 4AC\)</th><th>Type</th><th>Model</th></tr>
<tr><td>\(< 0\)</td><td>elliptic</td><td>Laplace \(u_{xx} + u_{yy} = 0\)</td></tr>
<tr><td>\(= 0\)</td><td>parabolic</td><td>heat \(u_t = ku_{xx}\)</td></tr>
<tr><td>\(> 0\)</td><td>hyperbolic</td><td>wave \(u_{tt} = c^2u_{xx}\)</td></tr></table>
<p>With variable coefficients the type can change from region to region: the Tricomi equation \(u_{xx} + xu_{yy} = 0\) is elliptic for \(x > 0\) and hyperbolic for \(x < 0\).</p>
<p><b>Other classifications.</b> Order (highest derivative); linear vs nonlinear (Burgers' \(u_t + uu_x = 0\) is nonlinear); homogeneous vs forced.</p>
<p><b>Well-posed problems</b> (Hadamard): a solution exists, is unique, and depends continuously on the data. The type decides which data are appropriate: initial and boundary data for heat and wave equations, boundary data only for Laplace's equation.</p>`,
      ex: { q: T`Classify \(u_{xx} + 4u_{xy} + 3u_{yy} = 0\) and \(u_{xx} + 2u_{xy} + 5u_{yy} = 0\).`, a: T`<p>First: \(16 - 12 = 4 > 0\), hyperbolic. Second: \(4 - 20 < 0\), elliptic.</p>` },
      trap: T`Using \(B^2 - 4AC\) with \(B\) taken as half the mixed coefficient. Here \(B\) is the full coefficient of \(u_{xy}\).`,
      vary: [[T`Type of \(u_t = 3u_{xx}\): 1 elliptic, 2 parabolic, 3 hyperbolic.`, 2, T`\(B^2 - 4AC = 0\).`], [T`Discriminant of \(u_{xx} - u_{yy} = 0\)?`, 4, T`\(0 + 4\).`], [T`Is \(u_t + uu_x = 0\) linear? 1 yes, 0 no.`, 0, T`\(uu_x\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>The simplest PDE, \(u_t + cu_x = 0\), says a profile slides along at speed \(c\) without changing shape. Following the lines along which information travels, the characteristics, solves it in one line.</p>`,
      body: T`
<p><b>Transport equation.</b> \(u_t + cu_x = 0\), \(u(x, 0) = f(x)\). Along the lines \(x - ct = \text{const}\), \(\frac{d}{dt}u(x_0 + ct, t) = cu_x + u_t = 0\), so \(u\) is constant there:</p>
\[u(x, t) = f(x - ct)\]
<p>To find \(u(x_0, t_0)\), trace back along the characteristic to \(t = 0\): \(u(x_0, t_0) = f(x_0 - ct_0)\).</p>
<p><b>With decay.</b> \(u_t + cu_x = -ku\) gives \(u = e^{-kt}f(x - ct)\).</p>
<p><b>Variable speed.</b> \(u_t + a(x)u_x = 0\): characteristics solve \(\frac{dx}{dt} = a(x)\). For \(u_t + xu_x = 0\): \(x = x_0e^t\), so \(u = f(xe^{-t})\).</p>
<p><b>Nonlinear: Burgers' equation</b> \(u_t + uu_x = 0\). The speed depends on \(u\), so faster parts overtake slower ones and characteristics cross: a shock forms at the first time \(t^* = -\frac{1}{\min f'}\).</p>`,
      ex: { q: T`Solve \(u_t + 3u_x = 0\), \(u(x, 0) = \frac{1}{1 + x^2}\). Find \(u(5, 1)\).`, a: T`<p>\(u = \frac{1}{1 + (x - 3t)^2}\). At \((5, 1)\): \(\frac{1}{1 + 4} = 0.2\).</p>` },
      trap: T`Writing \(f(x + ct)\). For \(u_t + cu_x = 0\) with \(c > 0\) the profile moves right, so the argument is \(x - ct\).`,
      vary: [[T`\(u_t + 2u_x = 0\), \(u(x, 0) = x^2\). \(u(3, 1)\)?`, 1, T`\((3 - 2)^2\).`], [T`Speed of the profile for \(u_t - 4u_x = 0\)? (Signed.)`, -4, T`\(u = f(x + 4t)\) moves left.`], [T`Burgers with \(f(x) = -x\): shock time?`, 1, T`\(-\frac{1}{-1}\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Heat spreads out: the heat equation \(u_t = ku_{xx}\) smooths every initial temperature profile. Separation of variables splits the solution into modes, and each mode decays at its own rate.</p>`,
      body: T`
<p><b>Problem:</b> \(u_t = ku_{xx}\) on \(0 < x < L\), \(u(0, t) = u(L, t) = 0\), \(u(x, 0) = f(x)\).</p>
<p><b>Separation.</b> Try \(u = X(x)T(t)\): \(\frac{T'}{kT} = \frac{X''}{X} = -\lambda\). The boundary conditions force \(X = \sin\frac{n\pi x}{L}\), \(\lambda_n = \left(\frac{n\pi}{L}\right)^2\), and then \(T = e^{-k\lambda_nt}\).</p>
\[u(x, t) = \sum_{n=1}^\infty b_ne^{-k(n\pi/L)^2t}\sin\frac{n\pi x}{L}\]
<p>with \(b_n\) the sine coefficients of \(f\). If \(f\) is already a sum of a few sines, read the \(b_n\) off directly.</p>
<p><b>Behavior.</b> Mode \(n\) decays with rate \(k(n\pi/L)^2\), so high frequencies die fastest and the profile smooths. For large \(t\), \(u \approx b_1e^{-k(\pi/L)^2t}\sin\frac{\pi x}{L}\).</p>
<p><b>Insulated ends</b> (\(u_x = 0\)) use cosines and keep the constant mode: the temperature tends to the average of \(f\). <b>Nonzero end temperatures</b> \(A\), \(B\): subtract the steady state \(A + (B - A)\frac xL\) first.</p>
<p><b>Infinite rod.</b> \(u = \frac{1}{\sqrt{4\pi kt}}\int e^{-(x - y)^2/4kt}f(y)\,dy\), convolution with a spreading Gaussian.</p>`,
      ex: { q: T`\(u_t = 2u_{xx}\) on \([0, \pi]\), zero ends, \(u(x, 0) = 3\sin x + \sin 4x\). Find \(u\).`, a: T`<p>\(u = 3e^{-2t}\sin x + e^{-32t}\sin4x\). The \(\sin4x\) mode decays 16 times faster.</p>` },
      trap: T`Decaying every mode at the same rate. The rate grows like \(n^2\).`,
      vary: [[T`Decay rate of mode 3 for \(u_t = u_{xx}\) on \([0, \pi]\)?`, 9, T`\(n^2\).`], [T`Insulated rod, initial \(u = 2 + \cos x\) on \([0, \pi]\). Limit temperature?`, 2, T`The average.`], [T`Steady state at \(x = 2\) for ends \(u(0) = 10\), \(u(4) = 30\)?`, 20, T`Linear interpolation.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>The wave equation \(u_{tt} = c^2u_{xx}\) moves shapes without smoothing them. On an infinite string, any disturbance splits into two halves travelling in opposite directions at speed \(c\).</p>`,
      body: T`
<p><b>d'Alembert's formula</b> for \(u(x, 0) = f(x)\), \(u_t(x, 0) = g(x)\) on the whole line:</p>
\[\begin{aligned}u(x, t) = {}&\tfrac12\big[f(x - ct) + f(x + ct)\big]\\ &+ \frac{1}{2c}\int_{x - ct}^{x + ct}g(s)\,ds\end{aligned}\]
<p>Information travels at speed exactly \(c\): \(u(x_0, t_0)\) depends only on the data in \([x_0 - ct_0, x_0 + ct_0]\), the domain of dependence.</p>
<p><b>Finite string</b> with fixed ends on \([0, L]\): separation gives standing waves</p>
\[u = \sum_n T_n(t)\sin\frac{n\pi x}{L}\]
\[T_n(t) = A_n\cos\frac{n\pi ct}{L} + B_n\sin\frac{n\pi ct}{L}\]
<p>with \(A_n\) the sine coefficients of \(f\) and \(B_n\frac{n\pi c}{L}\) those of \(g\).</p>
<p><b>Frequencies.</b> Mode \(n\) oscillates at angular frequency \(\omega_n = \frac{n\pi c}{L}\), or \(f_n = \frac{nc}{2L}\) cycles per second. The harmonics are whole multiples of the fundamental, which is why a string sounds musical. Doubling the tension multiplies \(c = \sqrt{T/\rho}\) by \(\sqrt2\).</p>
<p><b>Energy</b> \(\frac12\int(u_t^2 + c^2u_x^2)\,dx\) is conserved: waves do not decay.</p>`,
      ex: { q: T`\(u_{tt} = 4u_{xx}\), \(u(x, 0) = e^{-x^2}\), \(u_t(x, 0) = 0\). Find \(u(1, 0.5)\).`, a: T`<p>\(c = 2\): \(u = \frac{e^{-(x - 2t)^2} + e^{-(x + 2t)^2}}{2}\). At \((1, 0.5)\): \(\frac{e^0 + e^{-4}}{2} \approx 0.5092\).</p>` },
      trap: T`Dividing the integral term by \(c\) instead of \(2c\).`,
      vary: [[T`Fundamental frequency (Hz) of a 0.5 m string with \(c = 200\) m/s?`, 200, T`\(\frac{c}{2L}\).`], [T`\(u_{tt} = u_{xx}\), \(f = 0\), \(g = 1\). \(u(0, 3)\)?`, 3, T`\(\frac12\int_{-3}^3 1\).`], [T`Ratio of the 3rd harmonic to the fundamental?`, 3, T`Whole multiples.`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Laplace's equation describes steady states: equilibrium temperature, electrostatic potential, ideal fluid flow. Its solutions, harmonic functions, are determined entirely by their boundary values and never have interior peaks.</p>`,
      body: T`
<p>\(\Delta u = u_{xx} + u_{yy} = 0\). In polar coordinates:</p>
\[u_{rr} + \frac1ru_r + \frac{1}{r^2}u_{\theta\theta} = 0\]
<p><b>Mean value property.</b> \(u\) at the center of any disk equals its average over the boundary circle. <b>Maximum principle:</b> the maximum and minimum occur on the boundary. Consequence: the Dirichlet problem has at most one solution.</p>
<p><b>Disk of radius \(a\).</b> If the boundary values are \(u(a, \theta) = \frac{A_0}{2} + \sum(A_n\cos n\theta + B_n\sin n\theta)\), then</p>
\[u(r, \theta) = \frac{A_0}{2} + \sum_{n\ge1}\left(\frac ra\right)^nc_n(\theta)\]
<p>where \(c_n(\theta) = A_n\cos n\theta + B_n\sin n\theta\) are the boundary modes.</p>
<p>Each mode is scaled by \(\left(\frac ra\right)^n\), so the center value is \(\frac{A_0}{2}\), the boundary average. In Cartesian terms, \(r^n\cos n\theta = \text{Re}(x + iy)^n\).</p>
<p><b>Rectangle</b> \([0, a]\times[0, b]\) with \(u = f(x)\) on the top edge and 0 elsewhere:</p>
\[u = \sum b_n\frac{\sinh(n\pi y/a)}{\sinh(n\pi b/a)}\sin\frac{n\pi x}{a}\]
<p><b>Fundamental solutions.</b> \(\ln r\) in the plane and \(\frac1r\) in space are harmonic away from the origin; they are the potentials of a point charge.</p>`,
      ex: { q: T`On the unit disk, \(u(1, \theta) = 3 + 2\cos\theta - \sin2\theta\). Find \(u\) and \(u(0.5, \frac\pi4)\).`, a: T`<p>\(u = 3 + 2r\cos\theta - r^2\sin2\theta\). At \(r = \frac12\), \(\theta = \frac\pi4\): \(3 + 2\cdot\frac12\cdot\frac{\sqrt2}{2} - \frac14 \approx 3.457\).</p>` },
      trap: T`Scaling every mode by \(r\). Mode \(n\) scales by \(r^n\).`,
      vary: [[T`Center value of a harmonic function on the unit disk with boundary values \(5 + \cos3\theta\)?`, 5, T`Mean value.`], [T`Is \(x^2 - y^2\) harmonic? 1 yes, 0 no.`, 1, T`\(2 - 2\).`], [T`On the unit disk with \(u(1, \theta) = \cos2\theta\), find \(u(0.5, 0)\).`, 0.25, T`\(r^2\cos2\theta\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Separation of variables always leads to the same kind of problem: find the numbers \(\lambda\) for which \(-X'' = \lambda X\) has a nonzero solution meeting the boundary conditions. These eigenvalues set the frequencies and decay rates.</p>`,
      body: T`
<p><b>Model problems</b> on \([0, L]\) for \(X'' + \lambda X = 0\):</p>
<table class="tt"><tr><th>Boundary conditions</th><th>\(\lambda_n\)</th><th>\(X_n\)</th></tr>
<tr><td>\(X(0) = X(L) = 0\)</td><td>\(\left(\frac{n\pi}{L}\right)^2\), \(n \ge 1\)</td><td>\(\sin\frac{n\pi x}{L}\)</td></tr>
<tr><td>\(X'(0) = X'(L) = 0\)</td><td>\(\left(\frac{n\pi}{L}\right)^2\), \(n \ge 0\)</td><td>\(\cos\frac{n\pi x}{L}\)</td></tr>
<tr><td>\(X(0) = X'(L) = 0\)</td><td>\(\left(\frac{(n - \frac12)\pi}{L}\right)^2\), \(n \ge 1\)</td><td>\(\sin\frac{(n - \frac12)\pi x}{L}\)</td></tr></table>
<p><b>Derivation (mixed case).</b> \(X(0) = 0\) gives \(X = \sin\sqrt\lambda x\). Then \(X'(L) = \sqrt\lambda\cos\sqrt\lambda L = 0\), so \(\sqrt\lambda L = (n - \frac12)\pi\).</p>
<p><b>Sturm–Liouville theory.</b> For \(-(pX')' + qX = \lambda wX\) with separated boundary conditions: the eigenvalues are real and increase to infinity; eigenfunctions for different eigenvalues are orthogonal with weight \(w\); the \(n\)th eigenfunction has \(n - 1\) zeros inside; and the eigenfunctions form a complete basis, which is why Fourier-type expansions always work.</p>
<p><b>Robin conditions</b> like \(X'(L) + hX(L) = 0\) lead to transcendental equations, \(\tan\sqrt\lambda L = -\frac{\sqrt\lambda}{h}\), solved numerically.</p>`,
      ex: { q: T`Find the first two eigenvalues of \(X'' + \lambda X = 0\), \(X(0) = 0\), \(X'(2) = 0\).`, a: T`<p>\(\sqrt\lambda = \frac{(n - \frac12)\pi}{2}\): \(\lambda_1 = \frac{\pi^2}{16} \approx 0.617\), \(\lambda_2 = \frac{9\pi^2}{16} \approx 5.55\).</p>` },
      trap: T`Dropping \(\lambda = 0\) in the Neumann case. The constant function is an eigenfunction there.`,
      vary: [[T`\(\lambda_1\) for Dirichlet conditions on \([0, \pi]\)?`, 1, T`\((\pi/\pi)^2\).`], [T`Smallest Neumann eigenvalue?`, 0, T`Constants.`], [T`Zeros inside \((0, L)\) of the 4th Dirichlet eigenfunction?`, 3, T`\(n - 1\).`]] }
  ]);

  addQuestions('pde', [
    { id: 'pd1', skill: U[0], q: T`The Fourier series of an odd function on \((-\pi, \pi)\) contains:`, c: ['only sine terms', 'only cosine terms', 'only the constant term', 'both sines and cosines'], x: T`\(f\cos nx\) is odd, so \(a_n = 0\).` },
    { id: 'pd2', skill: U[1], q: T`At a jump discontinuity, a Fourier series converges to:`, c: ['the average of the left and right limits', 'the left limit', 'the right limit', 'it diverges'], x: T`Dirichlet's theorem.` },
    { id: 'pd3', skill: U[4], q: T`Laplace's equation \(u_{xx} + u_{yy} = 0\) is:`, c: ['elliptic', 'parabolic', 'hyperbolic', 'first order'], x: T`\(B^2 - 4AC = -4 < 0\).` },
    { id: 'pd4', skill: U[6], q: T`In the heat equation on an interval, high-frequency modes:`, c: ['decay fastest', 'decay slowest', 'never decay', 'grow'], x: T`Rate proportional to \(n^2\).` },
    { id: 'pd5', skill: U[7], q: T`In d'Alembert's solution, \(u(x_0, t_0)\) depends on the initial data only on:`, c: [T`\([x_0 - ct_0, x_0 + ct_0]\)`, 'the whole line', T`the point \(x_0\) alone`, T`\([0, x_0]\)`], x: T`Finite speed of propagation.` },
    { id: 'pd6', skill: U[8], q: T`A harmonic function on a bounded region attains its maximum:`, c: ['on the boundary', 'at the center', 'at an interior critical point', 'nowhere'], x: T`Maximum principle.` },
    { id: 'pd7', skill: U[3], q: T`Under the Fourier transform, differentiation \(f \mapsto f'\) becomes:`, c: [T`multiplication by \(i\omega\)`, T`division by \(i\omega\)`, 'convolution', 'a shift'], x: T`Integrate by parts.` }
  ]);

  // ======================= GENERATORS =======================
  const co1 = c => (c === 1 ? '' : c === -1 ? '-' : c), nn = n => (n === 1 ? '' : n);
  const sgn = (c, t) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 && t ? '' : Math.abs(c)}${t}`);
  const FS = [
    ['x', 'x', n => [0, 2 * (-1) ** (n + 1) / n], 0],
    ['x^2', 'x**2', n => [4 * (-1) ** n / (n * n), 0], Math.PI ** 2 / 3],
    ['|x|', 'Abs(x)', n => [n % 2 ? -4 / (Math.PI * n * n) : 0, 0], Math.PI / 2],
    ['\\text{sign}(x)', 'sign(x)', n => [0, n % 2 ? 4 / (Math.PI * n) : 0], 0],
    ['\\pi - x', 'pi - x', n => [0, -2 * (-1) ** (n + 1) / n], Math.PI],
    ['x + x^2', 'x + x**2', n => [4 * (-1) ** n / (n * n), 2 * (-1) ** (n + 1) / n], Math.PI ** 2 / 3]
  ];

  registerUnitGens('pde', { units: {
    [U[0]]: [{ id: 'pd-fs', make(R) {
      const [tex, py, co, c0] = R.pick(FS), n = R.int(1, 5), kind = R.int(0, 2);
      if (kind === 2) return { q: T`Find the constant term \(\frac{a_0}{2}\) of the Fourier series of \(f(x) = ${tex}\) on \((-\pi, \pi)\), to four decimals.`, answer: c0, tol: 1e-4, x: T`\(\frac{a_0}{2}\) is the average: \(\frac1{2\pi}\int_{-\pi}^\pi f\,dx \approx ${R.fmt(c0, 4)}\).`, v: `(lambda x: integrate(${py}, (x, -pi, pi))/(2*pi))(Symbol('x', real=True))` };
      const [a, b] = co(n), ans = kind ? b : a, nm = kind ? 'b' : 'a';
      return { q: T`Find the Fourier coefficient \(${nm}_{${n}}\) of \(f(x) = ${tex}\) on \((-\pi, \pi)\), to four decimals.`, answer: ans, tol: 1e-4, x: T`\(${nm}_n = \frac1\pi\int_{-\pi}^\pi f(x)${kind ? '\\sin' : '\\cos'} nx\,dx\). ${ans === 0 ? 'By symmetry (or parity of n) this one vanishes.' : T`For \(n = ${n}\): \(${R.fmt(ans, 4)}\).`}`, v: `(lambda x: integrate((${py})*${kind ? 'sin' : 'cos'}(${n}*x), (x, -pi, pi))/pi)(Symbol('x', real=True))` };
    } }],
    [U[1]]: [{ id: 'pd-conv', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.int(-3, 3), b = R.int(-3, 5); if (a === b) return this.make(R); const x0 = R.pick([0, Math.PI]);
        return { q: T`\(f = ${a}\) on \((-\pi, 0)\) and \(f = ${b}\) on \((0, \pi)\), extended with period \(2\pi\). To what does its Fourier series converge at \(x = ${x0 ? '\\pi' : '0'}\)?`, answer: (a + b) / 2, tol: 1e-6, x: T`A jump from ${x0 ? b : a} to ${x0 ? a : b}; the series converges to the midpoint \(\frac{${a} + ${b}}{2}\).`, v: `(lambda p: (p(-Rational(1, 10**9)) + p(Rational(1, 10**9)))/2)(lambda x: Piecewise((${a}, x < 0), (${b}, True)))` }; }
      if (k === 1) { const p = R.pick([2, 4]); return { q: T`Use Parseval's identity to evaluate \(\sum_{n\ge1}\frac{1}{n^{${p}}}\), to five decimals.`, answer: p === 2 ? Math.PI ** 2 / 6 : Math.PI ** 4 / 90, tol: 1e-5, x: p === 2 ? T`For \(f = x\): \(\frac1\pi\int x^2 = \frac{2\pi^2}{3} = \sum\frac{4}{n^2}\), so the sum is \(\frac{\pi^2}{6}\).` : T`For \(f = x^2\): \(\frac{2\pi^4}{5} = \frac{2\pi^4}{9} + \sum\frac{16}{n^4}\), so the sum is \(\frac{\pi^4}{90}\).`, v: `summation(1/Symbol('n')**${p}, (Symbol('n'), 1, oo))` }; }
      const N = R.int(1, 4);
      return { q: T`The square wave series \(\sum_{n\text{ odd}}\frac{4}{\pi n}\sin nx\) at \(x = \frac\pi2\) gives a series for \(\pi\). Using the terms through \(n = ${2 * N - 1}\), what partial sum of \(1 - \frac13 + \frac15 - \cdots\) results? (Four decimals.)`, answer: (() => { let s = 0; for (let j = 0; j < N; j++) s += (-1) ** j / (2 * j + 1); return s; })(), tol: 1e-4, x: T`\(\sin\frac{n\pi}{2} = \pm1\) alternately for odd \(n\), so the series is \(\frac4\pi(1 - \frac13 + \cdots) = 1\), and the full sum is \(\frac\pi4\). The first ${N} terms give the stated partial sum.`, v: `sum(Rational((-1)**j, 2*j + 1) for j in range(${N}))` };
    } }],
    [U[2]]: [{ id: 'pd-half', make(R) {
      const L = R.pick([1, 2, 3, Math.PI]), Lt = L === Math.PI ? '\\pi' : L, Lp = L === Math.PI ? 'pi' : L, n = R.int(1, 5), k = R.int(0, 2);
      const F = [['1', '1', (1 - (-1) ** n) * 2 / (n * Math.PI)], ['x', 'x', 2 * L * (-1) ** (n + 1) / (n * Math.PI)], [`x(${Lt} - x)`, `x*(${Lp} - x)`, 4 * L * L * (1 - (-1) ** n) / (n ** 3 * Math.PI ** 3)]][k];
      return { q: T`Find the sine-series coefficient \(b_{${n}}\) of \(f(x) = ${F[0]}\) on \([0, ${Lt}]\), to four decimals.`, answer: F[2], tol: 1e-4, x: T`\(b_n = \frac{2}{${Lt}}\int_0^{${Lt}}f(x)\sin\frac{n\pi x}{${Lt}}dx\). For \(n = ${n}\): \(${R.fmt(F[2], 4)}\).`, v: `(lambda x: 2/(${Lp})*integrate((${F[1]})*sin(${n}*pi*x/(${Lp})), (x, 0, ${Lp})))(Symbol('x', real=True))` };
    } }],
    [U[3]]: [{ id: 'pd-ft', make(R) {
      const k = R.int(0, 2), w = R.int(0, 3);
      if (k === 0) { const a = R.int(1, 4); return { q: T`Compute \(\hat f(${w})\) for \(f(x) = e^{-${a}|x|}\), with \(\hat f(\omega) = \int f(x)e^{-i\omega x}dx\). (Four decimals.)`, answer: 2 * a / (a * a + w * w), tol: 1e-4, x: T`\(\frac{2a}{a^2 + \omega^2} = \frac{${2 * a}}{${a * a + w * w}}\).`, v: `2*_mp.quad(lambda x: _mp.exp(-${a}*x)*_mp.cos(${w}*x), [0, _mp.inf])` }; }
      if (k === 1) { const a = R.int(1, 3); return { q: T`Compute \(\hat f(${w})\) for \(f = 1\) on \([-${a}, ${a}]\) and 0 elsewhere. (Four decimals.)`, answer: w ? 2 * Math.sin(a * w) / w : 2 * a, tol: 1e-4, x: w ? T`\(\frac{2\sin a\omega}{\omega} = \frac{2\sin ${a * w}}{${w}}\).` : T`At \(\omega = 0\) it is the area, \(${2 * a}\).`, v: `2*_mp.quad(lambda x: _mp.cos(${w}*x), [0, ${a}])` }; }
      const a = R.pick([1, 2, 0.5]); return { q: T`Compute \(\hat f(${w})\) for \(f(x) = e^{-${a}x^2}\). (Four decimals.)`, answer: Math.sqrt(Math.PI / a) * Math.exp(-w * w / (4 * a)), tol: 1e-4, x: T`\(\sqrt{\frac\pi a}e^{-\omega^2/4a}\) with \(a = ${a}\), \(\omega = ${w}\).`, v: `2*_mp.quad(lambda x: _mp.exp(-${a}*x**2)*_mp.cos(${w}*x), [0, _mp.inf])` };
    } }],
    [U[4]]: [{ id: 'pd-type', make(R) {
      const A = R.int(-3, 4), B = R.int(-4, 4), C = R.int(-3, 4); if (!A && !C) return this.make(R);
      const D = B * B - 4 * A * C, w = D < 0 ? 'Elliptic' : D === 0 ? 'Parabolic' : 'Hyperbolic';
      const terms = [[A, 'u_{xx}'], [B, 'u_{xy}'], [C, 'u_{yy}']].filter(([c]) => c);
      const eq = terms.map(([c, t], i) => (i === 0 ? `${c < 0 ? '-' : ''}${Math.abs(c) === 1 ? '' : Math.abs(c)}${t}` : sgn(c, t))).join('');
      return { q: T`Classify \(${eq} = 0\).`, c: [w, ...['Elliptic', 'Parabolic', 'Hyperbolic'].filter(s => s !== w)], x: T`\(B^2 - 4AC = ${B * B} - ${4 * A * C} = ${D}\).`, key: w, vk: `(lambda d: 'Elliptic' if d < 0 else 'Parabolic' if d == 0 else 'Hyperbolic')(Matrix([[${A}, Rational(${B}, 2)], [Rational(${B}, 2), ${C}]]).det()*(-4))` };
    } }],
    [U[5]]: [{ id: 'pd-trans', make(R) {
      const c = R.nz(-3, 3), x0 = R.int(-4, 6), t0 = R.pick([0.5, 1, 2]), k = R.int(0, 2), z = x0 - c * t0;
      const F = [['x^2', 'x**2', y => y * y], ['\\frac{1}{1 + x^2}', '1/(1 + x**2)', y => 1 / (1 + y * y)], ['e^{-x^2}', 'exp(-x**2)', y => Math.exp(-y * y)]][k];
      return { q: T`Solve \(u_t${sgn(c, 'u_x')} = 0\), \(u(x, 0) = ${F[0]}\). Find \(u(${x0}, ${t0})\) to four decimals.`, answer: F[2](z), tol: 1e-4, x: T`\(u = f(x ${c < 0 ? '+' : '-'} ${Math.abs(c) === 1 ? '' : Math.abs(c)}t)\). At \((${x0}, ${t0})\): \(f(${R.fmt(z, 4)}) \approx ${R.fmt(F[2](z), 5)}\).`,
        v: `(lambda x, t: (lambda u: u.subs({x: ${x0}, t: nsimplify(${t0})}) if simplify(diff(u, t) + (${c})*diff(u, x)) == 0 and simplify(u.subs(t, 0) - (${F[1]})) == 0 else nan)((${F[1]}).subs(x, x - (${c})*t)))(Symbol('x'), Symbol('t'))` };
    } }],
    [U[6]]: [{ id: 'pd-heat', make(R) {
      const kk = R.pick([1, 2, 0.5]), n1 = R.int(1, 3), n2 = n1 + R.int(1, 3), b1 = R.int(1, 5), b2 = R.int(-3, 3), x0 = R.pick([0.5, 1, 1.5, 2]), t0 = R.pick([0.1, 0.2, 0.5]), ask = R.int(0, 2);
      if (ask === 0) { const n = R.int(1, 5), L = R.pick([1, 2, Math.PI]), Lt = L === Math.PI ? '\\pi' : L, rate = kk * (n * Math.PI / L) ** 2;
        return { q: T`For \(u_t = ${kk}u_{xx}\) on \([0, ${Lt}]\) with zero ends, find the decay rate of mode ${n} (the constant in \(e^{-\text{rate}\cdot t}\)), to three decimals.`, answer: rate, tol: 0.001, x: T`Rate \(k\left(\frac{n\pi}{L}\right)^2 = ${kk}\left(\frac{${n}\pi}{${Lt}}\right)^2 \approx ${R.fmt(rate, 4)}\).`, v: `${kk}*(${n}*pi/(${L === Math.PI ? 'pi' : L}))**2` }; }
      const val = b1 * Math.exp(-kk * n1 * n1 * t0) * Math.sin(n1 * x0) + b2 * Math.exp(-kk * n2 * n2 * t0) * Math.sin(n2 * x0);
      return { q: T`\(u_t = ${kk}u_{xx}\) on \([0, \pi]\), \(u(0, t) = u(\pi, t) = 0\), \(u(x, 0) = ${co1(b1)}\sin ${nn(n1)}x${sgn(b2, `\\sin ${n2}x`)}\). Find \(u(${x0}, ${t0})\) to four decimals.`, answer: val, tol: 1e-4, x: T`Each mode decays by \(e^{-kn^2t}\): \(u = ${co1(b1)}e^{-${kk * n1 * n1}t}\sin ${nn(n1)}x${sgn(b2, `e^{-${kk * n2 * n2}t}\\sin ${n2}x`)}\).`,
        v: `(lambda x, t: (lambda u: u.subs({x: nsimplify(${x0}), t: nsimplify(${t0})}) if simplify(diff(u, t) - nsimplify(${kk})*diff(u, x, 2)) == 0 and simplify(u.subs(t, 0) - (${b1}*sin(${n1}*x) + (${b2})*sin(${n2}*x))) == 0 and u.subs(x, 0) == 0 and simplify(u.subs(x, pi)) == 0 else nan)(${b1}*exp(-nsimplify(${kk})*${n1 * n1}*t)*sin(${n1}*x) + (${b2})*exp(-nsimplify(${kk})*${n2 * n2}*t)*sin(${n2}*x)))(Symbol('x'), Symbol('t'))` };
    } }],
    [U[7]]: [{ id: 'pd-wave', make(R) {
      const c = R.int(1, 3), x0 = R.int(-2, 3), t0 = R.pick([0.5, 1]), k = R.int(0, 2);
      if (k === 2) { const L = R.pick([0.5, 0.65, 1, 2]), cc = R.pick([100, 200, 340, 150]), n = R.int(1, 4); return { q: T`A string of length ${L} m with wave speed ${cc} m/s and fixed ends. Find the frequency of harmonic ${n} in Hz.`, answer: n * cc / (2 * L), tol: 0.01, x: T`\(f_n = \frac{nc}{2L} = \frac{${n}\cdot${cc}}{${2 * L}}\).`, v: `${n}*${cc}/(2*nsimplify(${L}))` }; }
      const f = k ? ['e^{-x^2}', 'exp(-x**2)', y => Math.exp(-y * y)] : ['x^2', 'x**2', y => y * y], g = R.int(0, 2);
      const val = (f[2](x0 - c * t0) + f[2](x0 + c * t0)) / 2 + g * t0;
      return { q: T`\(u_{tt} = ${c * c}u_{xx}\) on the whole line, \(u(x, 0) = ${f[0]}\), \(u_t(x, 0) = ${g}\). Find \(u(${x0}, ${t0})\) to four decimals.`, answer: val, tol: 1e-4, x: T`d'Alembert with \(c = ${c}\): \(\frac{f(${x0} - ${c * t0}) + f(${x0} + ${c * t0})}{2} + \frac{1}{${2 * c}}\int_{${x0 - c * t0}}^{${x0 + c * t0}}${g}\,ds \approx ${R.fmt(val, 5)}\).`,
        v: `(lambda x, t: (lambda u: u.subs({x: ${x0}, t: nsimplify(${t0})}) if simplify(diff(u, t, 2) - ${c * c}*diff(u, x, 2)) == 0 and simplify(u.subs(t, 0) - (${f[1]})) == 0 and simplify(diff(u, t).subs(t, 0) - ${g}) == 0 else nan)(((${f[1]}).subs(x, x - ${c}*t) + (${f[1]}).subs(x, x + ${c}*t))/2 + ${g}*t))(Symbol('x'), Symbol('t'))` };
    } }],
    [U[8]]: [{ id: 'pd-lap', make(R) {
      const A0 = R.int(-3, 5), n1 = R.int(1, 2), n2 = R.int(3, 4), a1 = R.int(-3, 3), b2 = R.int(-3, 3), r0 = R.pick([0, 0.5, 0.25, 0.8]), th = R.pick([0, Math.PI / 4, Math.PI / 2, Math.PI]), thT = { 0: '0', [Math.PI / 4]: '\\frac\\pi4', [Math.PI / 2]: '\\frac\\pi2', [Math.PI]: '\\pi' }[th], thP = { 0: '0', [Math.PI / 4]: 'pi/4', [Math.PI / 2]: 'pi/2', [Math.PI]: 'pi' }[th];
      const val = A0 + a1 * r0 ** n1 * Math.cos(n1 * th) + b2 * r0 ** n2 * Math.sin(n2 * th);
      return { q: T`\(u\) is harmonic in the unit disk with \(u(1, \theta) = ${A0}${sgn(a1, `\\cos ${nn(n1)}\\theta`)}${sgn(b2, `\\sin ${n2}\\theta`)}\). Find \(u(${r0}, ${thT})\) to four decimals.`, answer: val, tol: 1e-4, x: T`Scale mode \(n\) by \(r^n\): \(u = ${A0}${sgn(a1, `r^{${n1}}\\cos ${nn(n1)}\\theta`)}${sgn(b2, `r^{${n2}}\\sin ${n2}\\theta`)}\).${r0 === 0 ? ' At the center only the average survives.' : ''}`,
        v: `(lambda r, th: (lambda u: u.subs({r: nsimplify(${r0}), th: ${thP}}) if simplify(diff(u, r, 2) + diff(u, r)/r + diff(u, th, 2)/r**2) == 0 and simplify(u.subs(r, 1) - (${A0} + (${a1})*cos(${n1}*th) + (${b2})*sin(${n2}*th))) == 0 else nan)(${A0} + (${a1})*r**${n1}*cos(${n1}*th) + (${b2})*r**${n2}*sin(${n2}*th)))(Symbol('r', positive=True), Symbol('th'))` };
    } }],
    [U[9]]: [{ id: 'pd-sl', make(R) {
      const L = R.pick([1, 2, 3, Math.PI]), Lt = L === Math.PI ? '\\pi' : L, Lp = L === Math.PI ? 'pi' : L, n = R.int(1, 4), k = R.int(0, 2);
      const BC = ['X(0) = 0,\\ X(L) = 0', "X'(0) = 0,\\ X'(L) = 0", "X(0) = 0,\\ X'(L) = 0"][k];
      const s = k === 2 ? (n - 0.5) * Math.PI / L : k === 1 ? (n - 1) * Math.PI / L : n * Math.PI / L, lam = s * s;
      const cond = ['sin(s*L)', 's*sin(s*L)', 'cos(s*L)'][k];
      return { q: T`Find the ${['first', 'second', 'third', 'fourth'][n - 1]} eigenvalue \(\lambda\) (counting from the smallest, including 0 if it occurs) of \(X'' + \lambda X = 0\) on \([0, ${Lt}]\) with \(${BC.replace(/L/g, Lt)}\), to four decimals.`, answer: lam, tol: 1e-4,
        x: T`${['Dirichlet: \\(\\sqrt\\lambda = \\frac{n\\pi}{L}\\), \\(n \\ge 1\\).', 'Neumann: \\(\\sqrt\\lambda = \\frac{n\\pi}{L}\\), \\(n \\ge 0\\), so the first eigenvalue is 0.', 'Mixed: \\(\\sqrt\\lambda = \\frac{(n - \\frac12)\\pi}{L}\\).'][k]} Here \(\lambda \approx ${R.fmt(lam, 4)}\).`, v: `nthroot(lambda s, L=${Lp === 'pi' ? '_mp.pi' : Lp}: ${cond.replace(/sin/g, '_mp.sin').replace(/cos/g, '_mp.cos')}, ${n}, ${k === 1 ? 'True' : 'False'})**2` };
    } }]
  } });
})();
