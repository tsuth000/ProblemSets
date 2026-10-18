'use strict';
// Pure math track, stage 2: Ordinary differential equations. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'ode', name: 'Differential equations', color: '#2D5C7A', blurb: 'First-order methods, stability, second-order linear equations, oscillations, linear systems and phase portraits, Laplace transforms, series solutions, Euler’s method', questions: [], generators: [] });
  const U = ['Classifying and checking solutions', 'Separable equations', 'First-order linear equations', 'Exact equations', 'Autonomous equations and stability', 'Second-order constant coefficients', 'Undetermined coefficients and resonance', 'Mechanical oscillations', 'Linear systems and phase portraits', 'Laplace transforms', 'Series solutions', 'Existence, uniqueness, and Euler’s method'];

  registerLearn('ode', [
    { title: U[0], skill: U[0],
      hook: T`<p>A differential equation relates an unknown function to its derivatives. Before solving one, classify it: the order, whether it is linear, and whether it is autonomous decide which method works.</p>`,
      body: T`
<p><b>Order:</b> the highest derivative present. \(y'' + 3y' = x\) is second order.</p>
<p><b>Linear:</b> \(y\) and its derivatives appear only to the first power, not multiplied together or inside other functions:</p>
\[a_n(x)y^{(n)} + \cdots + a_1(x)y' + a_0(x)y = g(x)\]
<p>Linear: \(y'' + x^2y = \sin x\). Nonlinear: \(y' = y^2\), \(yy' = 1\), \(y'' + \sin y = 0\). <b>Homogeneous</b> (for linear equations): \(g = 0\).</p>
<p><b>Autonomous:</b> no explicit \(x\) on the right of \(y' = f(y)\).</p>
<p><b>Checking a solution.</b> Substitute and simplify. Does \(y = e^{2x}\) solve \(y'' - 5y' + 6y = 0\)? \(4e^{2x} - 10e^{2x} + 6e^{2x} = 0\). Yes. Does \(y = e^{x}\)? \(1 - 5 + 6 = 2 \ne 0\). No.</p>
<p>For \(y'' + py' + qy = 0\), \(e^{rx}\) is a solution exactly when \(r^2 + pr + q = 0\), the characteristic equation.</p>
<p><b>General vs particular.</b> An \(n\)th-order equation's general solution has \(n\) arbitrary constants; initial conditions \(y(x_0), y'(x_0), \ldots\) pin them down.</p>`,
      ex: { q: T`Classify \(x^2y'' + xy' + (x^2 - 4)y = 0\), and check whether \(y = x^2\) solves \(x^2y'' - 3xy' + 4y = 0\).`, a: T`<p>Second order, linear, homogeneous, not autonomous (Bessel's equation of order 2).</p><p>\(y = x^2\): \(x^2(2) - 3x(2x) + 4x^2 = 2x^2 - 6x^2 + 4x^2 = 0\). Yes.</p>` },
      trap: T`Calling \(y'' + xy = 0\) nonlinear because of the \(x\). Coefficients may depend on \(x\); only \(y\) must appear linearly.`,
      vary: [[T`Order of \(y''' + y' = e^x\)?`, 3, T`Third derivative.`], [T`Is \(y' + y^2 = 0\) linear? 1 yes, 0 no.`, 0, T`\(y^2\).`], [T`Is \(y'' + e^xy = 0\) linear? 1 yes, 0 no.`, 1, T`Coefficient \(e^x\) is fine.`], [T`Does \(e^{-3x}\) solve \(y'' + y' - 6y = 0\)? 1 yes, 0 no.`, 1, T`\(9 - 3 - 6 = 0\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>If the equation splits as \(\frac{dy}{dx} = g(x)h(y)\), put every \(y\) on one side and every \(x\) on the other and integrate. Exponential growth, logistic growth, and cooling all work this way.</p>`,
      body: T`
\[\frac{dy}{h(y)} = g(x)\,dx \quad\Longrightarrow\quad \int\frac{dy}{h(y)} = \int g(x)\,dx + C\]
<p>Then use the initial condition to find \(C\). Check for constant solutions where \(h(y) = 0\); dividing by \(h\) can lose them.</p>
<table class="tt"><tr><th>Equation</th><th>Solution with \(y(0) = y_0\)</th></tr>
<tr><td>\(y' = ky\)</td><td>\(y_0e^{kt}\)</td></tr>
<tr><td>\(y' = ry\left(1 - \frac yK\right)\) (logistic)</td><td>\(\frac{K}{1 + \frac{K - y_0}{y_0}e^{-rt}}\)</td></tr>
<tr><td>\(y' = -k(y - A)\) (cooling)</td><td>\(A + (y_0 - A)e^{-kt}\)</td></tr>
<tr><td>\(y' = \frac xy\)</td><td>\(\sqrt{x^2 + y_0^2}\) (for \(y_0 > 0\))</td></tr>
<tr><td>\(y' = xy^2\)</td><td>\(\frac{1}{1/y_0 - x^2/2}\)</td></tr></table>
<p><b>Logistic facts.</b> Solutions tend to \(K\), the carrying capacity. Growth is fastest at \(y = \frac K2\).</p>
<p><b>Blow-up.</b> \(y' = y^2\), \(y(0) = 1\) gives \(y = \frac{1}{1 - x}\), which escapes to infinity at \(x = 1\): nonlinear equations can fail to have solutions for all time.</p>`,
      ex: { q: T`Solve \(y' = 2xy\), \(y(0) = 3\), and find \(y(1)\).`, a: T`<p>\(\frac{dy}{y} = 2x\,dx\), so \(\ln|y| = x^2 + C\) and \(y = Ae^{x^2}\). \(A = 3\). \(y(1) = 3e \approx 8.155\).</p>` },
      trap: T`Forgetting the constant of integration until after exponentiating, then adding it in the wrong place: \(e^{x^2 + C} = Ae^{x^2}\), not \(e^{x^2} + C\).`,
      vary: [[T`\(y' = 0.5y\), \(y(0) = 2\). \(y(2)\), three decimals.`, 2 * Math.E, T`\(2e\).`], [T`Logistic carrying capacity of \(y' = 3y(1 - y/40)\)?`, 40, T`\(K\).`], [T`\(y' = y^2\), \(y(0) = 1\). Blow-up time?`, 1, T`\(\frac{1}{1 - x}\).`], [T`Cooling: \(A = 20\), \(y_0 = 90\), \(k = \ln2\). \(y(1)\)?`, 55, T`\(20 + 70\cdot\frac12\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Every first-order linear equation \(y' + p(x)y = q(x)\) can be solved by one trick: multiply by an integrating factor that turns the left side into the derivative of a product.</p>`,
      body: T`
<p><b>Integrating factor</b> \(\mu(x) = e^{\int p\,dx}\). Then \(\mu y' + \mu py = (\mu y)'\), so</p>
\[(\mu y)' = \mu q \quad\Longrightarrow\quad y = \frac{1}{\mu}\left(\int\mu q\,dx + C\right)\]
<p><b>Example.</b> \(y' + 2y = e^x\), \(y(0) = 1\). \(\mu = e^{2x}\). \((e^{2x}y)' = e^{3x}\), so \(e^{2x}y = \frac{e^{3x}}{3} + C\) and \(y = \frac{e^x}{3} + Ce^{-2x}\). \(y(0) = \frac13 + C = 1\) gives \(C = \frac23\).</p>
<p><b>Structure.</b> General solution = particular solution + general homogeneous solution: \(\frac{e^x}3\) plus \(Ce^{-2x}\). With constant \(p > 0\) the homogeneous part decays, leaving the steady response.</p>
<p><b>Variable coefficients.</b> \(y' + \frac2xy = x\) (\(x > 0\)): \(\mu = e^{2\ln x} = x^2\). \((x^2y)' = x^3\), \(y = \frac{x^2}{4} + \frac{C}{x^2}\).</p>
<p><b>Mixing problems</b> lead here: a tank with volume \(V\), inflow rate \(r\) at concentration \(c\), outflow rate \(r\): \(A' = rc - \frac rVA\).</p>`,
      ex: { q: T`A 100 L tank holds pure water. Brine with 2 g/L flows in at 5 L/min and the mix flows out at 5 L/min. Find the salt after 10 minutes.`, a: T`<p>\(A' = 10 - \frac{A}{20}\), \(A(0) = 0\). Equilibrium 200; \(A = 200(1 - e^{-t/20})\). \(A(10) = 200(1 - e^{-0.5}) \approx 78.7\) g.</p>` },
      trap: T`Multiplying only the left side by \(\mu\).`,
      vary: [[T`Integrating factor of \(y' + 3y = x\)? Enter \(\mu(1)\), three decimals.`, Math.exp(3), T`\(e^{3x}\).`], [T`\(y' + y = 1\), \(y(0) = 0\). \(y(\ln 2)\)?`, 0.5, T`\(1 - e^{-x}\).`], [T`Steady state of \(y' + 4y = 8\)?`, 2, T`Set \(y' = 0\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Some equations are the total derivative of a function \(F(x, y)\) in disguise. Then the solution curves are simply the level sets \(F = C\).</p>`,
      body: T`
<p><b>Exact equation:</b> \(M(x, y)\,dx + N(x, y)\,dy = 0\) with \(M = F_x\), \(N = F_y\) for some \(F\). Then \(dF = 0\) and the solutions are \(F(x, y) = C\).</p>
<p><b>Test:</b> on a simply connected region, exact \(\iff M_y = N_x\) (equal mixed partials).</p>
<p><b>Finding \(F\).</b> Integrate \(M\) in \(x\), then fix the function of \(y\) using \(N\). Example: \((2xy + 3)\,dx + (x^2 + 4y)\,dy = 0\). \(M_y = 2x = N_x\). \(F = x^2y + 3x + h(y)\); \(F_y = x^2 + h' = x^2 + 4y\), so \(h = 2y^2\). Solutions: \(x^2y + 3x + 2y^2 = C\).</p>
<p><b>Line-integral view.</b> \(F(x_1, y_1) - F(0, 0) = \int_0^{x_1}M(x, 0)\,dx + \int_0^{y_1}N(x_1, y)\,dy\), integrating along the \(x\)-axis and then straight up. For an exact equation any path gives the same value.</p>
<p><b>Integrating factors.</b> If \(\frac{M_y - N_x}{N}\) depends only on \(x\), then \(\mu(x) = e^{\int\frac{M_y - N_x}{N}dx}\) makes the equation exact.</p>
<p><b>Bernoulli</b> \(y' + py = qy^n\) becomes linear with \(v = y^{1-n}\).</p>`,
      ex: { q: T`Is \((y\cos x + 2x)\,dx + (\sin x - 1)\,dy = 0\) exact? Find the solution through \((0, 3)\).`, a: T`<p>\(M_y = \cos x = N_x\): exact. \(F = y\sin x + x^2 + h(y)\), \(F_y = \sin x + h' = \sin x - 1\), \(h = -y\). \(F = y\sin x + x^2 - y\). At \((0, 3)\): \(F = -3\). Solution: \(y\sin x + x^2 - y = -3\).</p>` },
      trap: T`Comparing \(M_x\) with \(N_y\). The test crosses: \(M_y\) against \(N_x\).`,
      vary: [[T`Is \(y\,dx + x\,dy = 0\) exact? 1 yes, 0 no.`, 1, T`\(d(xy)\).`], [T`Is \(y\,dx - x\,dy = 0\) exact? 1 yes, 0 no.`, 0, T`\(1 \ne -1\).`], [T`For \(F = x^2y + 2y^2\), \(F(1, 2)\)?`, 10, T`\(2 + 8\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>For \(y' = f(y)\), you can sketch every solution without solving: mark where \(f = 0\) (equilibria) and where \(f\) is positive or negative. Arrows on the line show which equilibria attract and which repel.</p>`,
      body: T`
<p><b>Equilibria</b> are the zeros of \(f\). Between them, solutions increase where \(f > 0\) and decrease where \(f < 0\), and never cross an equilibrium (uniqueness).</p>
<p><b>Stability</b> of an equilibrium \(y^*\):</p>
<table class="tt"><tr><th>Sign of \(f\) (below, above)</th><th>Type</th><th>Test</th></tr>
<tr><td>\(+\), \(-\)</td><td>stable (sink)</td><td>\(f'(y^*) < 0\)</td></tr>
<tr><td>\(-\), \(+\)</td><td>unstable (source)</td><td>\(f'(y^*) > 0\)</td></tr>
<tr><td>same sign both sides</td><td>semistable</td><td>\(f'(y^*) = 0\), check signs</td></tr></table>
<p><b>Example.</b> \(y' = y(y - 2)(y - 5)\). Equilibria 0, 2, 5. Signs: below 0 negative, \((0, 2)\) positive, \((2, 5)\) negative, above 5 positive. So 0 is unstable, 2 stable, 5 unstable.</p>
<p><b>Repeated roots.</b> \(y' = (y - 1)^2\) is positive on both sides of 1: semistable (solutions below rise toward it, solutions above move away).</p>
<p><b>Harvesting.</b> \(y' = ry(1 - \frac yK) - h\): increasing \(h\) moves the equilibria together until they merge at \(h = \frac{rK}{4}\), a bifurcation beyond which the population collapses.</p>`,
      ex: { q: T`Classify the equilibria of \(y' = 4 - y^2\).`, a: T`<p>\(y = \pm2\). \(f'(y) = -2y\): \(f'(2) = -4 < 0\) stable; \(f'(-2) = 4 > 0\) unstable. Solutions starting above \(-2\) approach 2.</p>` },
      trap: T`Reading stability from the sign of \(f\) at the equilibrium. \(f\) is zero there; look at its sign on each side, or at \(f'\).`,
      vary: [[T`Equilibria of \(y' = y^3 - y\)?`, 3, T`\(0, \pm1\).`], [T`Is \(y = 0\) stable for \(y' = -3y\)? 1 yes, 0 no.`, 1, T`\(f' = -3\).`], [T`Maximum sustainable harvest for \(y' = 2y(1 - y/100) - h\)?`, 50, T`\(\frac{rK}{4}\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>For \(ay'' + by' + cy = 0\), guess \(y = e^{rx}\). The guess works exactly when \(r\) solves a quadratic, and the three kinds of roots give the three shapes of solution.</p>`,
      body: T`
<p><b>Characteristic equation</b> \(ar^2 + br + c = 0\).</p>
<table class="tt"><tr><th>Roots</th><th>General solution</th></tr>
<tr><td>real \(r_1 \ne r_2\)</td><td>\(c_1e^{r_1x} + c_2e^{r_2x}\)</td></tr>
<tr><td>repeated \(r\)</td><td>\((c_1 + c_2x)e^{rx}\)</td></tr>
<tr><td>\(\alpha \pm \beta i\)</td><td>\(e^{\alpha x}(c_1\cos\beta x + c_2\sin\beta x)\)</td></tr></table>
<p><b>Initial value problem.</b> \(y'' - y' - 6y = 0\), \(y(0) = 1\), \(y'(0) = 8\). Roots 3, \(-2\). \(c_1 + c_2 = 1\), \(3c_1 - 2c_2 = 8\): \(c_1 = 2\), \(c_2 = -1\). \(y = 2e^{3x} - e^{-2x}\).</p>
<p><b>Complex case.</b> \(y'' + 2y' + 5y = 0\): \(r = -1 \pm 2i\). \(y = e^{-x}(c_1\cos2x + c_2\sin2x)\). With \(y(0) = 0\), \(y'(0) = 2\): \(c_1 = 0\), \(2c_2 = 2\).</p>
<p><b>Why the extra \(x\)?</b> For a repeated root, \(e^{rx}\) gives only one solution; reduction of order produces \(xe^{rx}\).</p>
<p><b>Wronskian.</b> Two solutions form a fundamental set iff \(W = y_1y_2' - y_1'y_2 \ne 0\). Higher order works the same way: \(y''' - y = 0\) has roots \(1\) and \(-\frac12 \pm \frac{\sqrt3}{2}i\).</p>`,
      ex: { q: T`Solve \(y'' + 4y' + 4y = 0\), \(y(0) = 2\), \(y'(0) = -1\).`, a: T`<p>\(r = -2\) (double). \(y = (c_1 + c_2x)e^{-2x}\). \(c_1 = 2\); \(y'(0) = c_2 - 2c_1 = -1\), so \(c_2 = 3\). \(y = (2 + 3x)e^{-2x}\).</p>` },
      trap: T`Writing \(c_1e^{rx} + c_2e^{rx}\) for a repeated root. That is one constant in disguise.`,
      vary: [[T`Roots of the characteristic equation of \(y'' - 9y = 0\): enter the positive one.`, 3, T`\(r^2 = 9\).`], [T`\(y'' + 9y = 0\): angular frequency \(\beta\)?`, 3, T`\(\pm3i\).`], [T`\(y'' - 3y' + 2y = 0\), \(y(0) = 0\), \(y'(0) = 1\). \(y(\ln2)\)?`, 2, T`\(e^{2x} - e^x\): \(4 - 2\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>For a forced equation \(ay'' + by' + cy = g(x)\), guess a particular solution shaped like the forcing. When the forcing matches a natural solution, the response grows: resonance.</p>`,
      body: T`
<p><b>Structure:</b> \(y = y_h + y_p\), the homogeneous general solution plus any particular solution.</p>
<table class="tt"><tr><th>\(g(x)\)</th><th>Guess \(y_p\)</th></tr>
<tr><td>\(Ce^{kx}\)</td><td>\(Ae^{kx}\)</td></tr>
<tr><td>polynomial of degree \(n\)</td><td>general polynomial of degree \(n\)</td></tr>
<tr><td>\(C\cos\omega x\) or \(C\sin\omega x\)</td><td>\(A\cos\omega x + B\sin\omega x\)</td></tr></table>
<p><b>Exponential forcing.</b> For \(y'' + py' + qy = Ce^{kx}\), substituting \(Ae^{kx}\) gives \(A(k^2 + pk + q) = C\), so \(A = \frac{C}{k^2 + pk + q}\), as long as \(k\) is not a characteristic root.</p>
<p><b>Modification rule.</b> If the guess solves the homogeneous equation, multiply by \(x\) (or \(x^2\) for a double root). \(y'' - y = e^x\): try \(Axe^x\), giving \(A = \frac12\).</p>
<p><b>Resonance.</b> \(y'' + \omega^2y = \cos\omega x\): the natural guess fails, so try \(x(A\cos\omega x + B\sin\omega x)\). Result: \(y_p = \frac{x\sin\omega x}{2\omega}\), an oscillation with growing amplitude.</p>
<p><b>Variation of parameters</b> handles any \(g\): \(y_p = -y_1\int\frac{y_2g}{W}dx + y_2\int\frac{y_1g}{W}dx\) (for leading coefficient 1).</p>`,
      ex: { q: T`Find a particular solution of \(y'' + y' - 2y = 4x\).`, a: T`<p>Try \(Ax + B\): \(A - 2(Ax + B) = 4x\). So \(-2A = 4\), \(A = -2\); \(A - 2B = 0\), \(B = -1\). \(y_p = -2x - 1\).</p>` },
      trap: T`Guessing \(A\cos\omega x\) alone for cosine forcing when there is a \(y'\) term. The derivative brings in sine, so include both.`,
      vary: [[T`\(y'' + 3y' + 2y = 6e^{x}\): coefficient \(A\) of \(e^x\) in \(y_p\)?`, 1, T`\(\frac{6}{1 + 3 + 2}\).`], [T`\(y'' - y = e^x\): coefficient of \(xe^x\)?`, 0.5, T`Modification rule.`], [T`\(y'' + 4y = \cos2x\): coefficient of \(x\sin2x\)?`, 0.25, T`\(\frac{1}{2\omega}\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>A mass on a spring with friction obeys \(mx'' + cx' + kx = F(t)\). The same equation governs RLC circuits, and its three damping regimes show up everywhere in engineering.</p>`,
      body: T`
<p><b>Free undamped:</b> \(mx'' + kx = 0\). Natural angular frequency \(\omega_0 = \sqrt{k/m}\), period \(\frac{2\pi}{\omega_0}\).</p>
<p><b>Damping.</b> Characteristic equation \(mr^2 + cr + k = 0\), discriminant \(c^2 - 4mk\).</p>
<table class="tt"><tr><th>Regime</th><th>Condition</th><th>Behavior</th></tr>
<tr><td>Overdamped</td><td>\(c^2 > 4mk\)</td><td>two decaying exponentials</td></tr>
<tr><td>Critically damped</td><td>\(c^2 = 4mk\)</td><td>\((c_1 + c_2t)e^{-ct/2m}\), fastest return</td></tr>
<tr><td>Underdamped</td><td>\(c^2 < 4mk\)</td><td>decaying oscillation</td></tr></table>
<p>In the underdamped case the quasi-frequency is \(\mu = \sqrt{\frac km - \frac{c^2}{4m^2}}\), slightly below \(\omega_0\), and the envelope decays like \(e^{-ct/2m}\).</p>
<p><b>Forced response.</b> \(mx'' + cx' + kx = F_0\cos\omega t\) settles to amplitude</p>
\[\frac{F_0}{\sqrt{(k - m\omega^2)^2 + c^2\omega^2}}\]
<p>which peaks near \(\omega_0\) when damping is light. With \(c = 0\) and \(\omega = \omega_0\), the amplitude grows without bound.</p>
<p><b>RLC circuit:</b> \(Lq'' + Rq' + \frac1Cq = E(t)\): \(L\) plays mass, \(R\) damping, \(\frac1C\) stiffness.</p>`,
      ex: { q: T`\(m = 1\), \(k = 25\). Which \(c\) gives critical damping, and what is the quasi-frequency when \(c = 6\)?`, a: T`<p>\(c^2 = 4\cdot1\cdot25 = 100\): \(c = 10\). With \(c = 6\): \(\mu = \sqrt{25 - 9} = 4\).</p>` },
      trap: T`Using the natural frequency \(\omega_0\) as the oscillation frequency of a damped system. Damping lowers it.`,
      vary: [[T`Period of \(x'' + 16x = 0\), three decimals.`, Math.PI / 2, T`\(\frac{2\pi}{4}\).`], [T`Critical \(c\) for \(m = 2\), \(k = 8\)?`, 8, T`\(\sqrt{64}\).`], [T`Steady amplitude for \(x'' + 4x = 3\cos t\)?`, 1, T`\(\frac{3}{|4 - 1|}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>A system \(\mathbf x' = A\mathbf x\) is solved by eigenvectors: along each one, solutions grow or shrink exponentially. The eigenvalues of \(A\) alone decide the picture near the origin.</p>`,
      body: T`
<p><b>Solutions.</b> If \(A\mathbf v = \lambda\mathbf v\), then \(\mathbf x = e^{\lambda t}\mathbf v\). With two independent eigenvectors, \(\mathbf x = c_1e^{\lambda_1t}\mathbf v_1 + c_2e^{\lambda_2t}\mathbf v_2\). In general \(\mathbf x = e^{tA}\mathbf x_0\).</p>
<p><b>Classification</b> for \(2\times2\) \(A\), using \(\tau = \text{tr}\,A\), \(\Delta = \det A\), and eigenvalues \(\lambda = \frac{\tau \pm \sqrt{\tau^2 - 4\Delta}}{2}\):</p>
<table class="tt"><tr><th>Eigenvalues</th><th>Origin is</th></tr>
<tr><td>real, opposite signs (\(\Delta < 0\))</td><td>saddle (unstable)</td></tr>
<tr><td>real, both negative</td><td>stable node</td></tr>
<tr><td>real, both positive</td><td>unstable node</td></tr>
<tr><td>complex, negative real part</td><td>stable spiral</td></tr>
<tr><td>complex, positive real part</td><td>unstable spiral</td></tr>
<tr><td>purely imaginary</td><td>center</td></tr></table>
<p>Quick rule: \(\Delta < 0\) saddle; otherwise \(\tau < 0\) stable, \(\tau > 0\) unstable, \(\tau = 0\) center; complex when \(\tau^2 < 4\Delta\).</p>
<p><b>Second-order equations as systems.</b> \(y'' + py' + qy = 0\) is \(\mathbf x' = \begin{pmatrix}0 & 1\\ -q & -p\end{pmatrix}\mathbf x\) with \(\mathbf x = (y, y')\).</p>
<p><b>Nonlinear systems.</b> Near an equilibrium, linearize with the Jacobian. Saddles, nodes, and spirals persist; centers can turn into weak spirals. Predator–prey (Lotka–Volterra) has a center-like equilibrium surrounded by closed orbits.</p>`,
      ex: { q: T`Classify the origin for \(A = \begin{pmatrix}1 & -5\\ 1 & -3\end{pmatrix}\).`, a: T`<p>\(\tau = -2\), \(\Delta = -3 + 5 = 2\). \(\tau^2 - 4\Delta = 4 - 8 < 0\): complex with real part \(-1\). Stable spiral.</p>` },
      trap: T`Calling any system with negative trace stable. If \(\Delta < 0\), it is a saddle regardless.`,
      vary: [[T`Is \(\begin{pmatrix}2 & 0\\ 0 & -3\end{pmatrix}\) a saddle? 1 yes, 0 no.`, 1, T`Opposite signs.`], [T`Trace of the system for \(y'' + 3y' + 2y = 0\)?`, -3, T`\(-p\).`], [T`Is \(\begin{pmatrix}0 & 1\\ -4 & 0\end{pmatrix}\) a center? 1 yes, 0 no.`, 1, T`\(\pm2i\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>The Laplace transform turns differentiation into multiplication by \(s\). An initial value problem becomes algebra; solve for the transform, then invert with a table.</p>`,
      body: T`
\[\mathcal L\{f\}(s) = \int_0^\infty e^{-st}f(t)\,dt\]
<table class="tt"><tr><th>\(f(t)\)</th><th>\(F(s)\)</th></tr>
<tr><td>\(1\)</td><td>\(\frac1s\)</td></tr>
<tr><td>\(t^n\)</td><td>\(\frac{n!}{s^{n+1}}\)</td></tr>
<tr><td>\(e^{at}\)</td><td>\(\frac{1}{s - a}\)</td></tr>
<tr><td>\(\sin bt\), \(\cos bt\)</td><td>\(\frac{b}{s^2 + b^2}\), \(\frac{s}{s^2 + b^2}\)</td></tr>
<tr><td>\(e^{at}f(t)\)</td><td>\(F(s - a)\)</td></tr>
<tr><td>\(u(t - c)f(t - c)\)</td><td>\(e^{-cs}F(s)\)</td></tr>
<tr><td>\(\delta(t - c)\)</td><td>\(e^{-cs}\)</td></tr></table>
<p><b>Derivatives:</b> \(\mathcal L\{y'\} = sY - y(0)\), \(\mathcal L\{y''\} = s^2Y - sy(0) - y'(0)\).</p>
<p><b>Example.</b> \(y'' + y = 0\), \(y(0) = 0\), \(y'(0) = 2\): \(s^2Y - 2 + Y = 0\), \(Y = \frac{2}{s^2 + 1}\), \(y = 2\sin t\).</p>
<p><b>Inverting</b> uses partial fractions: \(\frac{3s + 1}{(s - 1)(s + 2)} = \frac{4/3}{s - 1} + \frac{5/3}{s + 2}\), so \(f = \frac43e^t + \frac53e^{-2t}\).</p>
<p><b>Convolution:</b> \(\mathcal L\{f * g\} = FG\), where \((f * g)(t) = \int_0^tf(\tau)g(t - \tau)d\tau\).</p>`,
      ex: { q: T`Solve \(y' - 3y = e^{t}\), \(y(0) = 1\), with Laplace transforms.`, a: T`<p>\(sY - 1 - 3Y = \frac{1}{s - 1}\), so \(Y = \frac{1}{s - 3} + \frac{1}{(s - 1)(s - 3)} = \frac{1}{s - 3} + \frac{1/2}{s - 3} - \frac{1/2}{s - 1}\). \(y = \frac32e^{3t} - \frac12e^t\).</p>` },
      trap: T`Dropping the initial values in \(\mathcal L\{y''\}\).`,
      vary: [[T`\(\mathcal L\{t^2\}\) at \(s = 2\)?`, 0.25, T`\(\frac{2}{8}\).`], [T`\(\mathcal L\{e^{3t}\}\) at \(s = 5\)?`, 0.5, T`\(\frac{1}{2}\).`], [T`\(\mathcal L\{\sin 2t\}\) at \(s = 0\)?`, 0.5, T`\(\frac{2}{4}\).`], [T`Inverse of \(\frac{1}{(s - 2)^2}\) at \(t = 1\), three decimals.`, Math.exp(2), T`\(te^{2t}\).`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>When coefficients vary, look for a power series solution \(y = \sum a_nx^n\). Substituting gives a recurrence for the coefficients, and the famous special functions (Airy, Legendre, Bessel) are born this way.</p>`,
      body: T`
<p><b>Ordinary point</b> \(x_0\) of \(y'' + P(x)y' + Q(x)y = 0\): \(P\) and \(Q\) are analytic there. Then two independent power series solutions exist, converging at least up to the nearest singular point.</p>
<p><b>Method.</b> \(y = \sum a_nx^n\), \(y'' = \sum(n + 2)(n + 1)a_{n+2}x^n\). Match coefficients of each power of \(x\).</p>
<p><b>\(y'' + y = 0\):</b> \(a_{n+2} = -\frac{a_n}{(n + 2)(n + 1)}\), giving \(a_0\cos x + a_1\sin x\).</p>
<p><b>Airy's equation \(y'' = xy\):</b> \((n + 2)(n + 1)a_{n+2} = a_{n-1}\), with \(a_2 = 0\). So \(a_3 = \frac{a_0}{6}\), \(a_4 = \frac{a_1}{12}\), \(a_5 = 0\), \(a_6 = \frac{a_3}{30} = \frac{a_0}{180}\).</p>
<p><b>Hermite-type \(y'' - xy' - y = 0\):</b> \(a_{n+2} = \frac{a_n}{n + 2}\).</p>
<p><b>Singular points.</b> At a regular singular point, the Frobenius method uses \(y = x^r\sum a_nx^n\), with \(r\) from the indicial equation. Bessel's equation \(x^2y'' + xy' + (x^2 - \nu^2)y = 0\) has \(r = \pm\nu\) at 0 and yields \(J_\nu\). Legendre's equation \((1 - x^2)y'' - 2xy' + \ell(\ell + 1)y = 0\) has polynomial solutions \(P_\ell\) when \(\ell\) is a whole number.</p>`,
      ex: { q: T`For \(y'' = xy\) with \(y(0) = 1\), \(y'(0) = 0\), find \(a_3\) and \(a_6\).`, a: T`<p>\(a_0 = 1\), \(a_1 = 0\), \(a_2 = 0\). \(a_3 = \frac{a_0}{3\cdot2} = \frac16\). \(a_6 = \frac{a_3}{6\cdot5} = \frac{1}{180}\).</p>` },
      trap: T`Shifting the index on only one side of the equation.`,
      vary: [[T`\(y'' + y = 0\), \(a_0 = 1\), \(a_1 = 0\): \(a_4\), four decimals.`, 1 / 24, T`\(\frac{1}{4!}\).`], [T`Airy, \(a_0 = 0\), \(a_1 = 1\): \(a_4\), four decimals.`, 1 / 12, T`\(\frac{a_1}{4\cdot3}\).`], [T`Indicial roots of Bessel's equation of order 3: enter the positive one.`, 3, T`\(r = \pm\nu\).`]] },

    { title: U[11], skill: U[11],
      hook: T`<p>Most differential equations have no formula solution. Two facts make them usable anyway: a theorem guaranteeing that a unique solution exists, and simple numerical methods that approximate it.</p>`,
      body: T`
<p><b>Picard–Lindelöf.</b> If \(f\) and \(\frac{\partial f}{\partial y}\) are continuous near \((x_0, y_0)\), then \(y' = f(x, y)\), \(y(x_0) = y_0\) has a unique solution on some interval around \(x_0\).</p>
<p><b>When uniqueness fails.</b> \(y' = 3y^{2/3}\), \(y(0) = 0\): both \(y = 0\) and \(y = x^3\) work, because \(\frac{\partial f}{\partial y} = 2y^{-1/3}\) blows up at \(y = 0\).</p>
<p><b>Picard iteration</b> \(y_{k+1}(x) = y_0 + \int_{x_0}^xf(t, y_k(t))\,dt\) converges to the solution. For \(y' = y\), \(y(0) = 1\), the iterates are the partial sums of \(e^x\).</p>
<p><b>Euler's method</b> with step \(h\):</p>
\[y_{n+1} = y_n + hf(x_n, y_n),\qquad x_{n+1} = x_n + h\]
<p>For \(y' = y\), \(y(0) = 1\), \(h = 0.5\), two steps: \(1 \to 1.5 \to 2.25\), versus \(e \approx 2.718\). The global error is proportional to \(h\) (first order): halving \(h\) roughly halves the error.</p>
<p><b>Better methods.</b> Improved Euler (Heun) averages slopes at both ends of the step and has error \(O(h^2)\). The classical fourth-order Runge–Kutta method has error \(O(h^4)\) and is the standard workhorse.</p>`,
      ex: { q: T`Use Euler's method with \(h = 0.1\) for \(y' = x + y\), \(y(0) = 1\), to estimate \(y(0.2)\).`, a: T`<p>\(y_1 = 1 + 0.1(0 + 1) = 1.1\). \(y_2 = 1.1 + 0.1(0.1 + 1.1) = 1.22\). (Exact: \(2e^{0.2} - 1.2 \approx 1.2428\).)</p>` },
      trap: T`Updating \(x\) and \(y\) in the wrong order, using \(f(x_{n+1}, y_n)\).`,
      vary: [[T`Euler, \(y' = 2y\), \(y(0) = 1\), \(h = 0.1\), one step?`, 1.2, T`\(1 + 0.1\cdot2\).`], [T`Euler's method global error order (power of \(h\))?`, 1, T`First order.`], [T`RK4 global error order?`, 4, T`Fourth order.`]] }
  ]);

  addQuestions('ode', [
    { id: 'od1', skill: U[0], q: T`Which equation is linear?`, c: [T`\(y'' + x^2y' + e^xy = \sin x\)`, T`\(y' = y^2\)`, T`\(yy'' = 1\)`, T`\(y'' + \sin y = 0\)`], x: T`The others involve \(y\) nonlinearly.` },
    { id: 'od2', skill: U[4], q: T`For \(y' = f(y)\), an equilibrium \(y^*\) with \(f'(y^*) < 0\) is:`, c: ['stable', 'unstable', 'semistable', 'not an equilibrium'], x: T`Nearby solutions move toward it.` },
    { id: 'od3', skill: U[5], q: T`For a repeated characteristic root \(r\), the general solution is:`, c: [T`\((c_1 + c_2x)e^{rx}\)`, T`\(c_1e^{rx} + c_2e^{rx}\)`, T`\(c_1e^{rx} + c_2e^{-rx}\)`, T`\(c_1\cos rx + c_2\sin rx\)`], x: T`Reduction of order supplies \(xe^{rx}\).` },
    { id: 'od4', skill: U[6], q: T`Resonance in \(y'' + \omega^2y = \cos\omega x\) produces a particular solution whose amplitude:`, c: ['grows linearly in x', 'decays', 'stays constant', 'grows exponentially'], x: T`\(\frac{x\sin\omega x}{2\omega}\).` },
    { id: 'od5', skill: U[8], q: T`If \(\det A < 0\) for a \(2\times2\) system \(\mathbf x' = A\mathbf x\), the origin is:`, c: ['a saddle', 'a stable node', 'a center', 'a spiral'], x: T`The eigenvalues are real with opposite signs.` },
    { id: 'od6', skill: U[9], q: T`\(\mathcal L\{y''\}\) equals:`, c: [T`\(s^2Y - sy(0) - y'(0)\)`, T`\(s^2Y\)`, T`\(s^2Y - y(0) - y'(0)\)`, T`\(sY - y'(0)\)`], x: T`Apply the first-derivative rule twice.` },
    { id: 'od7', skill: U[11], q: T`Which initial value problem has more than one solution?`, c: [T`\(y' = 3y^{2/3}\), \(y(0) = 0\)`, T`\(y' = y\), \(y(0) = 0\)`, T`\(y' = x + y\), \(y(0) = 1\)`, T`\(y' = \sin y\), \(y(0) = 1\)`], x: T`\(f_y\) is unbounded at \(y = 0\): both 0 and \(x^3\) work.` }
  ]);

  // ======================= GENERATORS =======================
  const sg = (c, t, first) => (c === 0 ? '' : `${first ? (c < 0 ? '-' : '') : c < 0 ? ' - ' : ' + '}${Math.abs(c) === 1 && t ? '' : Math.abs(c)}${t}`);
  const poly2 = (p, q, v = 'y') => `${v}''${sg(p, v + "'")}${sg(q, v)}`;
  const fct = k => (k <= 1 ? 1 : k * fct(k - 1));
  const ode1 = (f, x0, y0, x1) => `_mp.odefun(lambda x, y: ${f}, ${x0}, ${y0})(${x1})`;
  const ode2 = (f, x0, y0, v0, x1) => `_mp.odefun(lambda x, Y: [Y[1], ${f}], ${x0}, [${y0}, ${v0}])(${x1})[0]`;

  registerUnitGens('ode', { units: {
    [U[0]]: [
      { id: 'od-cls', make(R) {
        const E = [["y'' + 3y' + 2y = 0", 2, 1, "diff(f(x), x, 2) + 3*diff(f(x), x) + 2*f(x)"], ["y' = y^2 + x", 1, 0, "diff(f(x), x) - f(x)**2 - x"], ["y''' - xy = e^x", 3, 1, "diff(f(x), x, 3) - x*f(x) - exp(x)"], ["yy'' + (y')^2 = 0", 2, 0, "f(x)*diff(f(x), x, 2) + diff(f(x), x)**2"], ["y'' + \\sin y = 0", 2, 0, "diff(f(x), x, 2) + sin(f(x))"], ["x^2y'' + xy' + y = \\ln x", 2, 1, "x**2*diff(f(x), x, 2) + x*diff(f(x), x) + f(x) - log(x)"], ["(y')^3 = x", 1, 0, "diff(f(x), x)**3 - x"], ["y^{(4)} + y = 0", 4, 1, "diff(f(x), x, 4) + f(x)"], ["y' + e^xy = \\cos x", 1, 1, "diff(f(x), x) + exp(x)*f(x) - cos(x)"], ["y'' = \\sqrt{1 + (y')^2}", 2, 0, "diff(f(x), x, 2) - sqrt(1 + diff(f(x), x)**2)"]];
        const [t, o, lin, py] = R.pick(E), ask = R.int(0, 1);
        if (ask) return { q: T`What is the order of \(${t}\)?`, answer: o, x: T`The highest derivative is of order ${o}.`, v: `(lambda x, f: ode_order(${py}, f(x)))(Symbol('x'), Function('f'))` };
        return { q: T`Is \(${t}\) linear?`, c: lin ? ['Linear', 'Nonlinear'] : ['Nonlinear', 'Linear'], x: lin ? 'The unknown and its derivatives appear to the first power, with coefficients depending only on x.' : 'The unknown or a derivative appears squared, multiplied by another, or inside a function.', key: lin ? 'Linear' : 'Nonlinear', vk: `'${lin ? 'Linear' : 'Nonlinear'}'` };
      } },
      { id: 'od-check', make(R) {
        let r1, r2; do { r1 = R.int(-4, 4); r2 = R.int(-4, 4); } while (r1 === r2);
        const p = -(r1 + r2), q = r1 * r2, r = R.pick([r1, r2, r1 + 1, -r1, r2 - 1]), ok = r === r1 || r === r2;
        return { q: T`Does \(y = e^{${r}x}\) solve \(${poly2(p, q)} = 0\)?`, c: ok ? ['Yes', 'No'] : ['No', 'Yes'], x: T`Substitute: \(r^2 + pr + q = ${r * r} ${p * r < 0 ? '-' : '+'} ${Math.abs(p * r)} ${q < 0 ? '-' : '+'} ${Math.abs(q)} = ${r * r + p * r + q}\). ${ok ? 'Zero, so yes.' : 'Nonzero, so no.'}`, key: ok ? 'Yes' : 'No',
          vk: `(lambda x: 'Yes' if simplify(diff(exp(${r}*x), x, 2) + (${p})*diff(exp(${r}*x), x) + (${q})*exp(${r}*x)) == 0 else 'No')(Symbol('x'))` };
      } }
    ],
    [U[1]]: [{ id: 'od-sep', make(R) {
      const k = R.int(0, 4);
      if (k === 0) { const a = R.pick([0.2, 0.5, -0.3, 1, -1, 0.1]), y0 = R.int(1, 9), t1 = R.int(1, 4), v = y0 * Math.exp(a * t1); return { q: T`Solve \(y' = ${a}y\), \(y(0) = ${y0}\), and find \(y(${t1})\) to three decimals.`, answer: v, tol: Math.max(0.001, v * 1e-6), x: T`\(y = ${y0}e^{${a}t}\), so \(y(${t1}) = ${y0}e^{${R.fmt(a * t1, 3)}} \approx ${R.fmt(v, 4)}\).`, v: ode1(`${a}*y`, 0, y0, t1) }; }
      if (k === 1) { const r = R.pick([0.5, 1, 0.2, 2]), K = R.pick([50, 100, 200, 1000]), y0 = K / R.pick([10, 4, 5, 20]), t1 = R.int(1, 5), v = K / (1 + ((K - y0) / y0) * Math.exp(-r * t1));
        return { q: T`Logistic growth \(y' = ${r}y\left(1 - \frac{y}{${K}}\right)\), \(y(0) = ${y0}\). Find \(y(${t1})\) to two decimals.`, answer: v, tol: 0.01, x: T`\(y = \frac{${K}}{1 + ${R.fmt((K - y0) / y0, 4)}e^{-${r}t}}\), so \(y(${t1}) \approx ${R.fmt(v, 3)}\).`, v: ode1(`${r}*y*(1 - y/${K})`, 0, y0, t1) }; }
      if (k === 2) { const A = R.int(15, 25), y0 = R.int(60, 100), kk = R.pick([0.1, 0.2, 0.05]), t1 = R.int(2, 10), v = A + (y0 - A) * Math.exp(-kk * t1);
        return { q: T`Newton cooling: \(y' = -${kk}(y - ${A})\), \(y(0) = ${y0}\). Find \(y(${t1})\) to two decimals.`, answer: v, tol: 0.01, x: T`\(y = ${A} + ${y0 - A}e^{-${kk}t}\), so \(y(${t1}) \approx ${R.fmt(v, 3)}\).`, v: ode1(`-${kk}*(y - ${A})`, 0, y0, t1) }; }
      if (k === 3) { const y0 = R.int(1, 6), x1 = R.int(1, 5), v = Math.sqrt(x1 * x1 + y0 * y0); return { q: T`Solve \(y' = \frac{x}{y}\), \(y(0) = ${y0}\), and find \(y(${x1})\) to three decimals.`, answer: v, tol: 0.001, x: T`\(y\,dy = x\,dx\), so \(y^2 = x^2 + ${y0 * y0}\) and \(y(${x1}) = \sqrt{${x1 * x1 + y0 * y0}}\).`, v: ode1('x/y', 0, y0, x1) }; }
      const a = R.int(1, 3), y0 = R.pick([0.5, 0.25, 0.2]), x1 = R.pick([0.5, 1]); const v = 1 / (1 / y0 - a * x1 * x1 / 2);
      return { q: T`Solve \(y' = ${a}xy^2\), \(y(0) = ${y0}\), and find \(y(${x1})\) to three decimals.`, answer: v, tol: 0.001, x: T`\(-\frac1y = \frac{${a}x^2}{2} + C\), \(C = -${1 / y0}\). So \(y = \frac{1}{${1 / y0} - ${a / 2}x^2}\), and \(y(${x1}) \approx ${R.fmt(v, 4)}\).`, v: ode1(`${a}*x*y**2`, 0, y0, x1) };
    } }],
    [U[2]]: [{ id: 'od-lin', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.nz(-3, 3), b = R.int(1, 5), c = R.pick([0, 1, -1, 2]); if (c === -a) return this.make(R); const y0 = R.int(-2, 4), x1 = R.pick([0.5, 1, 1.5]);
        const A = b / (c + a), C = y0 - A, v = A * Math.exp(c * x1) + C * Math.exp(-a * x1);
        return { q: T`Solve \(y'${sg(a, 'y')} = ${b}${c ? `e^{${c}x}` : ''}\), \(y(0) = ${y0}\). Find \(y(${x1})\) to three decimals.`, answer: v, tol: 0.001, x: T`\(\mu = e^{${a}x}\). Particular solution \(${R.fmt(A, 4)}${c ? `e^{${c}x}` : ''}\), homogeneous \(Ce^{${-a}x}\), with \(C = ${R.fmt(C, 4)}\). \(y(${x1}) \approx ${R.fmt(v, 4)}\).`, v: ode1(`${b}*_mp.exp(${c}*x) - (${a})*y`, 0, y0, x1) }; }
      if (k === 1) { const m = R.int(0, 3), n = R.int(1, 3), y1 = R.int(0, 4), x1 = R.pick([2, 3, 1.5]);
        // y' + (n/x) y = x^m, y(1) = y1: (x^n y)' = x^{m+n}; x^n y = x^{m+n+1}/(m+n+1) + C.
        const C = y1 - 1 / (m + n + 1), v = (x1 ** (m + n + 1) / (m + n + 1) + C) / x1 ** n;
        return { q: T`Solve \(y' + \frac{${n}}{x}y = x^{${m}}\) for \(x > 0\), \(y(1) = ${y1}\). Find \(y(${x1})\) to three decimals.`, answer: v, tol: 0.001, x: T`\(\mu = x^{${n}}\): \((x^{${n}}y)' = x^{${m + n}}\), so \(x^{${n}}y = \frac{x^{${m + n + 1}}}{${m + n + 1}} + C\) with \(C = ${R.fmt(C, 4)}\). \(y(${x1}) \approx ${R.fmt(v, 4)}\).`, v: ode1(`x**${m} - ${n}*y/x`, 1, y1, x1) }; }
      const V = R.pick([100, 200, 50]), r = R.pick([2, 4, 5, 10]), c = R.pick([1, 2, 3, 0.5]), t1 = R.int(5, 30), v = c * V * (1 - Math.exp(-r * t1 / V));
      return { q: T`A ${V} L tank of pure water receives brine at ${c} g/L, ${r} L/min, and drains at ${r} L/min. How many grams of salt are in it after ${t1} minutes? (Two decimals.)`, answer: v, tol: 0.01, x: T`\(A' = ${r * c} - \frac{${r}}{${V}}A\), \(A(0) = 0\). \(A = ${c * V}\left(1 - e^{-${r}t/${V}}\right)\), so \(A(${t1}) \approx ${R.fmt(v, 3)}\).`, v: ode1(`${r * c} - ${r}*y/${V}`, 0, 0, t1) };
    } }],
    [U[3]]: [{ id: 'od-exact', make(R) {
      const a = R.int(-3, 3), b = R.int(-2, 2), c = R.int(-3, 3), d = R.int(-3, 3); if (!a && !b) return this.make(R);
      // F = a x^2 y + b x y^3 + c x + d y^2  => M = 2a x y + b y^3 + c, N = a x^2 + 3b x y^2 + 2d y
      const Mt = [`${2 * a}xy`, `${b}y^3`, `${c}`].filter((_, i) => [a, b, c][i]).join(' + ') || '0', Nt = [`${a}x^2`, `${3 * b}xy^2`, `${2 * d}y`].filter((_, i) => [a, b, d][i]).join(' + ') || '0';
      const ask = R.int(0, 1);
      if (ask) { const tw = R.int(0, 1), aa = tw ? a + 1 : a; const Mt2 = [`${2 * aa}xy`, `${b}y^3`, `${c}`].filter((_, i) => [aa, b, c][i]).join(' + ') || '0';
        return { q: T`Is \((${Mt2})\,dx + (${Nt})\,dy = 0\) exact?`, c: tw ? ['No', 'Yes'] : ['Yes', 'No'], x: T`\(M_y = ${2 * aa}x + ${3 * b}y^2\) and \(N_x = ${2 * a}x + ${3 * b}y^2\). ${tw ? 'They differ.' : 'They match.'}`, key: tw ? 'No' : 'Yes',
          vk: `(lambda x, y: 'Yes' if simplify(diff(${2 * aa}*x*y + ${b}*y**3 + ${c}, y) - diff(${a}*x**2 + ${3 * b}*x*y**2 + ${2 * d}*y, x)) == 0 else 'No')(Symbol('x'), Symbol('y'))` }; }
      const x1 = R.int(-2, 2), y1 = R.int(-2, 2), F = a * x1 * x1 * y1 + b * x1 * y1 ** 3 + c * x1 + d * y1 * y1;
      return { q: T`\((${Mt})\,dx + (${Nt})\,dy = 0\) is exact with potential \(F\), \(F(0, 0) = 0\). Find \(F(${x1}, ${y1})\).`, answer: F, x: T`Integrate \(M\) in \(x\) and match \(N\): \(F = ${[`${a}x^2y`, `${b}xy^3`, `${c}x`, `${d}y^2`].filter((_, i) => [a, b, c, d][i]).join(' + ') || '0'}\). At \((${x1}, ${y1})\): ${F}.`,
        v: `(lambda x, y: integrate((${2 * a}*x*y + ${b}*y**3 + ${c}).subs(y, 0), (x, 0, ${x1})) + integrate((${a}*x**2 + ${3 * b}*x*y**2 + ${2 * d}*y).subs(x, ${x1}), (y, 0, ${y1})))(Symbol('x'), Symbol('y'))` };
    } }],
    [U[4]]: [{ id: 'od-auto', make(R) {
      const rs = R.sample([-3, -2, -1, 0, 1, 2, 3, 4], R.int(2, 3)).sort((p, q) => p - q), sgn = R.pick([1, -1]), dbl = R.int(0, 3) === 0 ? R.pick(rs) : null;
      const fac = rs.map(r => (r === 0 ? 'y' : `(y ${r < 0 ? '+' : '-'} ${Math.abs(r)})`) + (r === dbl ? '^2' : '')).join('');
      const f = y => sgn * rs.reduce((p, r) => p * (y - r) ** (r === dbl ? 2 : 1), 1), ask = R.int(0, 1);
      if (ask) return { q: T`How many equilibria does \(y' = ${sgn < 0 ? '-' : ''}${fac}\) have?`, answer: rs.length, x: T`The zeros of the right side: ${rs.join(', ')}.`, v: `len(set(solve(${sgn}*${rs.map(r => `(Symbol('y') - (${r}))**${r === dbl ? 2 : 1}`).join('*')}, Symbol('y'))))` };
      const e = R.pick(rs), lo = f(e - 0.01), hi = f(e + 0.01), w = lo > 0 && hi < 0 ? 'Stable' : lo < 0 && hi > 0 ? 'Unstable' : 'Semistable';
      return { q: T`For \(y' = ${sgn < 0 ? '-' : ''}${fac}\), classify the equilibrium \(y = ${e}\).`, c: [w, ...['Stable', 'Unstable', 'Semistable'].filter(s => s !== w)], x: T`Sign of \(y'\) just below ${e}: ${lo > 0 ? 'positive' : 'negative'}; just above: ${hi > 0 ? 'positive' : 'negative'}. ${w === 'Stable' ? 'Solutions move toward it.' : w === 'Unstable' ? 'Solutions move away.' : 'Same sign on both sides.'}`, key: w,
        vk: `(lambda f: (lambda a, b: 'Stable' if a > 0 and b < 0 else 'Unstable' if a < 0 and b > 0 else 'Semistable')(f(Rational(${e}) - Rational(1, 1000)), f(Rational(${e}) + Rational(1, 1000))))(lambda y: ${sgn}*${rs.map(r => `(y - (${r}))**${r === dbl ? 2 : 1}`).join('*')})` };
    } }],
    [U[5]]: [
      { id: 'od-cc', make(R) {
        const k = R.int(0, 2); let p, q, desc;
        if (k === 0) { let r1, r2; do { r1 = R.int(-3, 2); r2 = R.int(-3, 2); } while (r1 === r2); p = -(r1 + r2); q = r1 * r2; desc = T`roots ${r1} and ${r2}`; }
        else if (k === 1) { const r = R.nz(-3, 2); p = -2 * r; q = r * r; desc = T`a double root ${r}`; }
        else { const al = R.int(-2, 1), be = R.int(1, 3); p = -2 * al; q = al * al + be * be; desc = T`roots \(${al} \pm ${be}i\)`; }
        const y0 = R.int(-2, 3), v0 = R.int(-3, 3), x1 = R.pick([0.5, 1]);
        // closed form via JS numeric integration (RK4) for the answer; verification via mpmath odefun.
        let y = y0, v = v0; const h = x1 / 2000; for (let i = 0; i < 2000; i++) { const f = (Y, V) => [V, -p * V - q * Y]; const k1 = f(y, v), k2 = f(y + h / 2 * k1[0], v + h / 2 * k1[1]), k3 = f(y + h / 2 * k2[0], v + h / 2 * k2[1]), k4 = f(y + h * k3[0], v + h * k3[1]); y += h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); v += h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]); }
        return { q: T`Solve \(${poly2(p, q)} = 0\), \(y(0) = ${y0}\), \(y'(0) = ${v0}\). Find \(y(${x1})\) to three decimals.`, answer: y, tol: 0.001, x: T`Characteristic equation \(r^2${sg(p, 'r')}${sg(q, '')} = 0\) has ${desc}. Fit the two constants to the initial values, then evaluate: \(y(${x1}) \approx ${R.fmt(y, 4)}\).`, v: ode2(`-(${p})*Y[1] - (${q})*Y[0]`, 0, y0, v0, x1) };
      } },
      { id: 'od-form', make(R) {
        const k = R.int(0, 2); let p, q;
        if (k === 0) { let r1, r2; do { r1 = R.int(-4, 4); r2 = R.int(-4, 4); } while (r1 === r2); p = -(r1 + r2); q = r1 * r2; }
        else if (k === 1) { const r = R.nz(-4, 4); p = -2 * r; q = r * r; }
        else { const al = R.int(-3, 3), be = R.int(1, 4); p = -2 * al; q = al * al + be * be; }
        const W = [T`\(c_1e^{r_1x} + c_2e^{r_2x}\)`, T`\((c_1 + c_2x)e^{rx}\)`, T`\(e^{\alpha x}(c_1\cos\beta x + c_2\sin\beta x)\)`];
        return { q: T`Which form does the general solution of \(${poly2(p, q)} = 0\) take?`, c: [W[k], ...W.filter((_, i) => i !== k)], x: T`The discriminant of \(r^2${sg(p, 'r')}${sg(q, '')}\) is \(${p * p - 4 * q}\): ${['positive', 'zero', 'negative'][k]}.`, key: 'f' + k, vk: `(lambda d: 'f0' if d > 0 else 'f1' if d == 0 else 'f2')(discriminant(Symbol('r')**2 + (${p})*Symbol('r') + (${q}), Symbol('r')))` };
      } }
    ],
    [U[6]]: [{ id: 'od-uc', make(R) {
      const k = R.int(0, 2), xs = "Symbol('x')";
      if (k === 0) { const p = R.int(-3, 3), q = R.int(-3, 4), kk = R.nz(-2, 3), C = R.int(1, 9), den = kk * kk + p * kk + q; if (!den) return this.make(R);
        return { q: T`Find \(A\) in the particular solution \(y_p = Ae^{${kk}x}\) of \(${poly2(p, q)} = ${C}e^{${kk}x}\).`, answer: C / den, tol: 1e-6, x: T`Substitute: \(A(${kk * kk}${sg(p * kk, '')}${sg(q, '')}) = ${C}\), so \(A = \frac{${C}}{${den}}\).`, v: `(lambda x, A: solve((diff(A*exp(${kk}*x), x, 2) + (${p})*diff(A*exp(${kk}*x), x) + (${q})*A*exp(${kk}*x) - ${C}*exp(${kk}*x)).subs(x, 0), A))(${xs}, Symbol('A'))` }; }
      if (k === 1) { const w = R.int(1, 4), C = R.int(1, 6);
        return { q: T`\(y'' + ${w * w}y = ${C}\cos${w}x\) is resonant. Its particular solution is \(y_p = Bx\sin${w}x\). Find \(B\).`, answer: C / (2 * w), tol: 1e-6, x: T`Try \(x(A\cos${w}x + B\sin${w}x)\): substitution gives \(A = 0\) and \(${2 * w}B = ${C}\), so \(B = \frac{${C}}{${2 * w}}\).`, v: `(lambda x, A, B: solve([c for c in Poly(expand((diff(x*(A*cos(${w}*x) + B*sin(${w}*x)), x, 2) + ${w * w}*x*(A*cos(${w}*x) + B*sin(${w}*x)) - ${C}*cos(${w}*x))), cos(${w}*x), sin(${w}*x)).coeffs()], [A, B])[B])(${xs}, Symbol('A'), Symbol('B'))` }; }
      const p = R.int(-3, 3), q = R.nz(-4, 4), m = R.int(1, 4), ask = R.int(0, 1);
      // y'' + p y' + q y = m x: y_p = A x + B with q A = m, p A + q B = 0.
      const A = m / q, B = -p * A / q;
      return { q: T`Find ${ask ? 'the constant term \\(B\\)' : 'the slope \\(A\\)'} of the particular solution \(y_p = Ax + B\) of \(${poly2(p, q)} = ${m}x\).`, answer: ask ? B : A, tol: 1e-6, x: T`Substitute: \(${p}A + ${q}(Ax + B) = ${m}x\). Match: \(${q}A = ${m}\) gives \(A = ${R.fmt(A, 4)}\); \(${p}A + ${q}B = 0\) gives \(B = ${R.fmt(B, 4)}\).`,
        v: `(lambda x, A, B: solve([c for c in Poly(expand((${p})*A + (${q})*(A*x + B) - ${m}*x), x).all_coeffs()], [A, B])[${ask ? 'B' : 'A'}])(${xs}, Symbol('A'), Symbol('B'))` };
    } }],
    [U[7]]: [{ id: 'od-osc', make(R) {
      const m = R.int(1, 4), kk = m * R.pick([4, 9, 16, 25, 1, 36]), k = R.int(0, 2);
      if (k === 0) { const cc = 2 * Math.sqrt(m * kk), c = R.pick([cc, Math.round(cc / 2), Math.round(cc * 1.5)]), w = c * c > 4 * m * kk ? 'Overdamped' : c * c === 4 * m * kk ? 'Critically damped' : 'Underdamped';
        return { q: T`Classify \(${m}x'' + ${c}x' + ${kk}x = 0\).`, c: [w, ...['Overdamped', 'Critically damped', 'Underdamped'].filter(s => s !== w)], x: T`\(c^2 - 4mk = ${c * c} - ${4 * m * kk} = ${c * c - 4 * m * kk}\).`, key: w, vk: `(lambda d: 'Overdamped' if d > 0 else 'Critically damped' if d == 0 else 'Underdamped')(${c}**2 - 4*${m}*${kk})` }; }
      if (k === 1) { const ask = R.int(0, 1), w0 = Math.sqrt(kk / m); return { q: T`A mass ${m} kg on a spring with \(k = ${kk}\) N/m, undamped. Find the ${ask ? 'period' : 'natural angular frequency'}${ask ? ' to three decimals' : ''}.`, answer: ask ? 2 * Math.PI / w0 : w0, tol: 0.001, x: T`\(\omega_0 = \sqrt{${kk}/${m}} = ${R.fmt(w0, 4)}\)${ask ? T`, period \(\frac{2\pi}{\omega_0} \approx ${R.fmt(2 * Math.PI / w0, 4)}\)` : ''}.`, v: ask ? `2*pi/sqrt(Rational(${kk}, ${m}))` : `sqrt(Rational(${kk}, ${m}))` }; }
      const c = R.int(1, Math.floor(2 * Math.sqrt(m * kk)) - 1), mu = Math.sqrt(kk / m - c * c / (4 * m * m));
      return { q: T`Find the quasi-frequency of \(${m}x'' + ${c}x' + ${kk}x = 0\), to three decimals.`, answer: mu, tol: 0.001, x: T`\(\mu = \sqrt{\frac{k}{m} - \frac{c^2}{4m^2}} = \sqrt{${R.fmt(kk / m, 4)} - ${R.fmt(c * c / (4 * m * m), 4)}}\).`, v: `im(solve(${m}*Symbol('r')**2 + ${c}*Symbol('r') + ${kk}, Symbol('r'))[0]).__abs__()` };
    } }],
    [U[8]]: [{ id: 'od-sys', make(R) {
      let a, b, c, d, tr, det, disc; do { a = R.int(-4, 4); b = R.int(-4, 4); c = R.int(-4, 4); d = R.int(-4, 4); tr = a + d; det = a * d - b * c; disc = tr * tr - 4 * det; } while (det === 0 || disc === 0 || (disc < 0 && tr === 0 && R.int(0, 2)));
      const w = det < 0 ? 'Saddle' : disc > 0 ? (tr < 0 ? 'Stable node' : 'Unstable node') : tr < 0 ? 'Stable spiral' : tr > 0 ? 'Unstable spiral' : 'Center';
      const ALL = ['Saddle', 'Stable node', 'Unstable node', 'Stable spiral', 'Unstable spiral', 'Center'];
      return { q: T`Classify the origin for \(\mathbf x' = \begin{pmatrix}${a} & ${b}\\ ${c} & ${d}\end{pmatrix}\mathbf x\).`, c: [w, ...R.shuffle(ALL.filter(s => s !== w)).slice(0, 3)], x: T`\(\tau = ${tr}\), \(\Delta = ${det}\), \(\tau^2 - 4\Delta = ${disc}\). ${det < 0 ? 'Negative determinant: saddle.' : disc > 0 ? 'Real eigenvalues of one sign: node.' : 'Complex eigenvalues: spiral or center by the sign of the trace.'}`, key: w,
        vk: `(lambda ev: (lambda re1, re2, im1: 'Saddle' if re1*re2 < 0 and im1 == 0 else ('Center' if re1 == 0 else ('Stable spiral' if re1 < 0 else 'Unstable spiral')) if im1 != 0 else ('Stable node' if re1 < 0 else 'Unstable node'))(re(ev[0]), re(ev[-1]), im(ev[0])))(list(Matrix([[${a}, ${b}], [${c}, ${d}]]).eigenvals(multiple=True)))` };
    } }],
    [U[9]]: [{ id: 'od-lap', make(R) {
      const k = R.int(0, 2), t = "Symbol('t', positive=True)", s = "Symbol('s', positive=True)";
      if (k === 0) { const n = R.int(0, 3), a = R.int(-2, 2), s0 = a + R.int(1, 4); return { q: T`Compute \(\mathcal L\{${n ? `t^{${n}}` : ''}${a ? `e^{${a}t}` : n ? '' : '1'}\}\) at \(s = ${s0}\).`, answer: fct(n) / (s0 - a) ** (n + 1), tol: 1e-6, x: T`\(\frac{${n}!}{(s - ${a})^{${n + 1}}}\) at \(s = ${s0}\): \(\frac{${fct(n)}}{${(s0 - a) ** (n + 1)}}\).`, v: `(lambda t, s: laplace_transform(t**${n}*exp(${a}*t), t, s, noconds=True).subs(s, ${s0}))(${t}, ${s})` }; }
      if (k === 1) { const b = R.int(1, 4), s0 = R.int(0, 4), cos = R.int(0, 1); return { q: T`Compute \(\mathcal L\{${cos ? '\\cos' : '\\sin'}\,${b}t\}\) at \(s = ${s0}\).`, answer: (cos ? s0 : b) / (s0 * s0 + b * b), tol: 1e-6, x: T`\(\frac{${cos ? 's' : b}}{s^2 + ${b * b}}\) at \(s = ${s0}\).`, v: `(lambda t, s: laplace_transform(${cos ? 'cos' : 'sin'}(${b}*t), t, s, noconds=True).subs(s, ${s0}))(${t}, ${s})` }; }
      let a, b; do { a = R.nz(-3, 3); b = R.nz(-3, 3); } while (a === b); const A = R.int(1, 5), t1 = R.pick([0.5, 1]);
      // F = A s / ((s - a)(s - b)) = (A a/(a - b))/(s - a) + (A b/(b - a))/(s - b)
      const v = (A * a / (a - b)) * Math.exp(a * t1) + (A * b / (b - a)) * Math.exp(b * t1);
      return { q: T`Find \(f(${t1})\), where \(\mathcal L\{f\} = \frac{${A}s}{${a ? `(s ${a < 0 ? '+' : '-'} ${Math.abs(a)})` : 's'}${b ? `(s ${b < 0 ? '+' : '-'} ${Math.abs(b)})` : 's'}}\). (Three decimals.)`, answer: v, tol: 0.001, x: T`Partial fractions: \(\frac{${R.fmt(A * a / (a - b), 4)}}{s - ${a}} + \frac{${R.fmt(A * b / (b - a), 4)}}{s - ${b}}\), so \(f = ${R.fmt(A * a / (a - b), 4)}e^{${a}t} + ${R.fmt(A * b / (b - a), 4)}e^{${b}t}\).`, v: `(lambda t, s: inverse_laplace_transform(${A}*s/((s - (${a}))*(s - (${b}))), s, t).subs(t, nsimplify(${t1})))(${t}, Symbol('s'))` };
    } }],
    [U[10]]: [{ id: 'od-ser', make(R) {
      const E = [["y'' + y = 0", 'diff(Y, x, 2) + Y', (a, n) => -a[n] / ((n + 2) * (n + 1)), 0], ["y'' = xy", 'diff(Y, x, 2) - x*Y', (a, n) => (n >= 1 ? a[n - 1] : 0) / ((n + 2) * (n + 1)), 1], ["y'' - xy' - y = 0", 'diff(Y, x, 2) - x*diff(Y, x) - Y', (a, n) => a[n] / (n + 2), 2], ["y'' - y = 0", 'diff(Y, x, 2) - Y', (a, n) => a[n] / ((n + 2) * (n + 1)), 3], ["y'' + xy = 0", 'diff(Y, x, 2) + x*Y', (a, n) => -(n >= 1 ? a[n - 1] : 0) / ((n + 2) * (n + 1)), 4]];
      const [tex, py, rec] = R.pick(E), a0 = R.int(-2, 3), a1 = R.int(-2, 3), k = R.int(2, 7); if (!a0 && !a1) return this.make(R);
      const a = [a0, a1]; for (let n = 0; n + 2 <= k; n++) a[n + 2] = rec(a, n);
      return { q: T`For \(${tex}\) with \(y(0) = ${a0}\), \(y'(0) = ${a1}\), write \(y = \sum a_nx^n\). Find \(a_{${k}}\) to five decimals.`, answer: a[k], tol: 1e-5, x: T`Matching powers of \(x\) gives a recurrence for \(a_{n+2}\). Starting from \(a_0 = ${a0}\), \(a_1 = ${a1}\): ${a.slice(2).map((v, i) => `a_{${i + 2}} = ${R.fmt(v, 5)}`).join(', ')}.`, v: `serco(lambda Y, x: ${py}, ${a0}, ${a1}, ${k})` };
    } }],
    [U[11]]: [{ id: 'od-euler', make(R) {
      const F = [['x + y', (x, y) => x + y, 'x + y'], ['2y', (x, y) => 2 * y, '2*y'], ['x - y', (x, y) => x - y, 'x - y'], ['xy', (x, y) => x * y, 'x*y'], ['y - x^2', (x, y) => y - x * x, 'y - x**2'], ['1 + y^2', (x, y) => 1 + y * y, '1 + y**2']];
      const [tex, f, py] = R.pick(F), y0 = R.int(0, 2), h = R.pick([0.1, 0.2, 0.25, 0.5]), n = R.int(2, 4);
      let x = 0, y = y0; const steps = []; for (let i = 0; i < n; i++) { y = y + h * f(x, y); x = +(x + h).toFixed(10); steps.push(`y_{${i + 1}} = ${R.fmt(y, 5)}`); }
      return { q: T`Use Euler's method with \(h = ${h}\) for \(y' = ${tex}\), \(y(0) = ${y0}\). Estimate \(y(${R.fmt(n * h, 4)})\) (${n} steps), to four decimals.`, answer: y, tol: 0.0001, x: T`\(y_{k+1} = y_k + ${h}f(x_k, y_k)\): ${steps.join(', ')}.`, v: `reduce(lambda s, i: (s[0] + nsimplify(${h}), s[1] + nsimplify(${h})*(lambda x, y: ${py})(s[0], s[1])), range(${n}), (0, ${y0}))[1]` };
    } }]
  } });
})();
