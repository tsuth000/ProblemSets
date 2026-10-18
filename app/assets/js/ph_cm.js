'use strict';
// Theoretical physics track: Classical mechanics. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'cm', name: 'Classical mechanics', color: '#5A4632', blurb: 'Lagrangians, conservation laws and Noether, central forces and Kepler, small oscillations, rigid bodies, Hamiltonians, Poisson brackets, rotating frames, adiabatic invariants', questions: [], generators: [] });
  const U = ['Lagrangian mechanics', 'Symmetries and conservation laws', 'Central forces and orbits', 'Small oscillations', 'Rigid body motion', 'Hamiltonian mechanics', 'Poisson brackets', 'Rotating reference frames', 'Action and adiabatic invariants'];

  registerLearn('cm', [
    { title: U[0], skill: U[0],
      hook: T`<p>Newton's laws need forces, including the constraint forces you don't care about. Lagrange's method needs only energies: write \(L = T - V\) in any convenient coordinates, and one formula produces the equations of motion.</p>`,
      body: T`
<p><b>Generalized coordinates</b> \(q_i\): any parameters that fix the configuration (an angle for a pendulum, an arc length for a bead on a wire). Constraints are built in.</p>
<p><b>Euler–Lagrange equations</b> (from stationary action \(S = \int L\,dt\)):</p>
\[\frac{d}{dt}\frac{\partial L}{\partial\dot q_i} - \frac{\partial L}{\partial q_i} = 0\]
<p><b>Simple pendulum</b> (length \(\ell\)): \(L = \frac12m\ell^2\dot\theta^2 + mg\ell\cos\theta\), so \(m\ell^2\ddot\theta = -mg\ell\sin\theta\), i.e. \(\ddot\theta = -\frac g\ell\sin\theta\).</p>
<p><b>Atwood machine</b> (masses \(m_1\), \(m_2\), pulley massless): one coordinate \(x\). \(L = \frac12(m_1 + m_2)\dot x^2 + (m_1 - m_2)gx\), so \(\ddot x = \frac{m_1 - m_2}{m_1 + m_2}g\).</p>
<p><b>Mass on an incline</b> of angle \(\alpha\) (no friction): \(\ddot s = g\sin\alpha\). <b>Particle in a potential</b> \(V(x)\): \(m\ddot x = -V'(x)\), Newton's law recovered.</p>
<p><b>Recipe.</b> (1) Choose coordinates. (2) Write \(T\) (often \(\frac12m|\dot{\mathbf r}|^2\) expressed in those coordinates) and \(V\). (3) Apply Euler–Lagrange to each coordinate.</p>`,
      ex: { q: T`A bead slides on a frictionless wire \(y = x^2\) under gravity. Write \(L\) in terms of \(x\).`, a: T`<p>\(\dot y = 2x\dot x\), so \(T = \frac12m\dot x^2(1 + 4x^2)\) and \(V = mgx^2\). \(L = \frac12m(1 + 4x^2)\dot x^2 - mgx^2\). Euler–Lagrange: \(m(1 + 4x^2)\ddot x + 4mx\dot x^2 + 2mgx = 0\).</p>` },
      trap: T`Writing \(L = T + V\). The Lagrangian is the difference; the sum is the energy.`,
      vary: [[T`Atwood with \(m_1 = 3\), \(m_2 = 1\), \(g = 9.8\): acceleration?`, 4.9, T`\(\frac{2}{4}g\).`], [T`Pendulum \(\ell = 2\), \(g = 9.8\): \(\ddot\theta\) at \(\theta = \frac\pi2\)?`, -4.9, T`\(-\frac g\ell\).`], [T`Incline at 30°, \(g = 9.8\): acceleration?`, 4.9, T`\(g\sin30°\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Every continuous symmetry of a system comes with a conserved quantity. Lagrange's formalism makes this automatic: if a coordinate does not appear in \(L\), its momentum is constant.</p>`,
      body: T`
<p><b>Generalized momentum</b> \(p_i = \frac{\partial L}{\partial\dot q_i}\). If \(q_i\) is <b>cyclic</b> (absent from \(L\)), Euler–Lagrange gives \(\dot p_i = 0\).</p>
<p><b>Noether's theorem.</b></p>
<table class="tt"><tr><th>Symmetry of \(L\)</th><th>Conserved</th></tr>
<tr><td>Time translation (\(L\) has no explicit \(t\))</td><td>energy \(h = \sum p_i\dot q_i - L\)</td></tr>
<tr><td>Spatial translation</td><td>linear momentum</td></tr>
<tr><td>Rotation about an axis</td><td>angular momentum about it</td></tr></table>
<p><b>Example.</b> A particle in a central potential, in polar coordinates: \(L = \frac12m(\dot r^2 + r^2\dot\phi^2) - V(r)\). \(\phi\) is cyclic, so \(p_\phi = mr^2\dot\phi = \ell\) is constant: angular momentum, and Kepler's equal-area law.</p>
<p><b>The energy function</b> \(h\) equals \(T + V\) when \(T\) is quadratic in velocities and the constraints do not depend on time. A bead on a rotating hoop conserves \(h\) but not \(T + V\) (the motor does work).</p>
<p><b>Galilean boost symmetry</b> gives uniform motion of the center of mass.</p>`,
      ex: { q: T`For \(L = \frac12(\dot x^2 + \dot y^2) - V(x - y)\), what is conserved?`, a: T`<p>Translating both coordinates by the same amount leaves \(L\) unchanged, so \(p_x + p_y = \dot x + \dot y\) is conserved (total momentum). Energy is conserved too, since \(L\) has no explicit \(t\).</p>` },
      trap: T`Expecting a conserved momentum for a coordinate that appears only through its velocity in \(L\) but whose \(L\) depends on time explicitly. Cyclic means absent from \(L\); time dependence affects only energy.`,
      vary: [[T`\(L = \frac12m(\dot r^2 + r^2\dot\phi^2) + \frac kr\): number of conserved quantities among \(\{p_\phi, h\}\)?`, 2, T`Both.`], [T`\(m = 2\), \(r = 3\), \(\dot\phi = 0.5\): \(p_\phi\)?`, 9, T`\(mr^2\dot\phi\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>With angular momentum conserved, a two-body problem reduces to one dimension in an effective potential. That single trick explains circular orbits, ellipses, and escape.</p>`,
      body: T`
<p><b>Effective potential.</b> With \(\ell = mr^2\dot\phi\):</p>
\[E = \tfrac12m\dot r^2 + V_{\text{eff}}(r),\qquad V_{\text{eff}} = V(r) + \frac{\ell^2}{2mr^2}\]
<p>The second term is the centrifugal barrier.</p>
<p><b>Gravity / Coulomb</b> \(V = -\frac kr\): the minimum of \(V_{\text{eff}}\) is at \(r_0 = \frac{\ell^2}{mk}\), a circular orbit with energy \(-\frac{k}{2r_0}\). Orbits are conic sections: ellipses for \(E < 0\), a parabola for \(E = 0\), hyperbolas for \(E > 0\).</p>
<p><b>Kepler's laws.</b> (1) Ellipses with the sun at a focus. (2) Equal areas in equal times (\(\ell\) conserved). (3)</p>
\[T^2 = \frac{4\pi^2}{GM}a^3\]
<p>For the Earth, \(a = 1\) AU and \(T = 1\) year; Mars at \(a = 1.524\) AU has \(T = 1.524^{1.5} \approx 1.88\) years.</p>
<p><b>Speeds.</b> Circular: \(v = \sqrt{\frac{GM}{r}}\). Escape: \(v = \sqrt{\frac{2GM}{r}}\), larger by \(\sqrt2\). Vis-viva: \(v^2 = GM\left(\frac2r - \frac1a\right)\).</p>
<p><b>Reduced mass.</b> Two bodies interacting through \(V(|\mathbf r_1 - \mathbf r_2|)\) behave like one body of mass \(\mu = \frac{m_1m_2}{m_1 + m_2}\) in that potential.</p>`,
      ex: { q: T`A satellite is in a circular orbit of radius \(r\). How much faster must it go to escape?`, a: T`<p>Circular \(\sqrt{GM/r}\), escape \(\sqrt{2GM/r}\): multiply by \(\sqrt2\), a 41.4% increase.</p>` },
      trap: T`Using the orbit's radius at one point in Kepler's third law. It needs the semi-major axis.`,
      vary: [[T`Period (years) at \(a = 4\) AU around the Sun?`, 8, T`\(4^{1.5}\).`], [T`Reduced mass of two 2 kg masses?`, 1, T`\(\frac{4}{4}\).`], [T`Ratio of escape to circular speed, four decimals.`, Math.SQRT2, T`\(\sqrt2\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Near a stable equilibrium every system is a set of harmonic oscillators. Expanding the potential to second order turns any problem into linear algebra.</p>`,
      body: T`
<p><b>One degree of freedom.</b> At a minimum \(q_0\) of \(V\) with \(L = \frac12m\dot q^2 - V(q)\):</p>
\[\omega^2 = \frac{V''(q_0)}{m}\]
<p>Example: \(V = x^4 - 2x^2\) has minima at \(x = \pm1\) with \(V'' = 12x^2 - 4 = 8\); with \(m = 2\), \(\omega = 2\).</p>
<p><b>Pendulum:</b> \(V = -mg\ell\cos\theta\), \(T = \frac12m\ell^2\dot\theta^2\): \(\omega^2 = \frac{mg\ell}{m\ell^2} = \frac g\ell\). A physical pendulum (rigid body, center of mass at distance \(d\)) has \(\omega^2 = \frac{mgd}{I}\).</p>
<p><b>Many degrees of freedom.</b> \(T = \frac12\dot{\mathbf q}^TM\dot{\mathbf q}\), \(V \approx \frac12\mathbf q^TK\mathbf q\). Normal modes solve \(\det(K - \omega^2M) = 0\). Each mode oscillates at its own frequency; general motion is a superposition.</p>
<p><b>Coupled pendula</b> (length \(\ell\), coupled by a spring \(k\)): \(\omega_1^2 = \frac g\ell\) (swinging together, spring unstretched) and \(\omega_2^2 = \frac g\ell + \frac{2k}{m}\) (opposite). Starting one pendulum alone produces beats, energy sloshing between them at the difference frequency.</p>
<p><b>Linear triatomic molecule</b> (masses \(m, M, m\), springs \(k\)): \(\omega = 0\) (translation), \(\sqrt{k/m}\), and \(\sqrt{\frac km\left(1 + \frac{2m}{M}\right)}\).</p>`,
      ex: { q: T`A particle of mass 1 moves in \(V = \frac{1}{x} + x\) for \(x > 0\). Find the equilibrium and the small-oscillation frequency.`, a: T`<p>\(V' = -\frac{1}{x^2} + 1 = 0\) at \(x = 1\). \(V'' = \frac{2}{x^3} = 2\). \(\omega = \sqrt2\).</p>` },
      trap: T`Expanding about a maximum. There \(V'' < 0\) and the equilibrium is unstable.`,
      vary: [[T`\(\omega\) for \(V = 8x^2\), \(m = 4\)?`, 2, T`\(\frac{16}{4}\).`], [T`Pendulum \(\ell = 9.8\) m, \(g = 9.8\): \(\omega\)?`, 1, T`\(\sqrt{g/\ell}\).`], [T`Coupled pendula, \(g/\ell = 4\), \(k/m = 1\): higher \(\omega^2\)?`, 6, T`\(4 + 2\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>A rigid body's resistance to rotation depends on how its mass is spread around the axis. The moment of inertia plays the role of mass, and rolling couples rotation to translation.</p>`,
      body: T`
<p><b>Moment of inertia</b> \(I = \sum m_ir_i^2 = \int r^2\,dm\) about an axis.</p>
<table class="tt"><tr><th>Body (mass \(M\))</th><th>Axis</th><th>\(I\)</th></tr>
<tr><td>Rod, length \(L\)</td><td>center</td><td>\(\frac{1}{12}ML^2\)</td></tr>
<tr><td>Rod</td><td>end</td><td>\(\frac13ML^2\)</td></tr>
<tr><td>Hoop, radius \(R\)</td><td>center</td><td>\(MR^2\)</td></tr>
<tr><td>Disk / cylinder</td><td>center</td><td>\(\frac12MR^2\)</td></tr>
<tr><td>Solid sphere</td><td>center</td><td>\(\frac25MR^2\)</td></tr>
<tr><td>Hollow sphere</td><td>center</td><td>\(\frac23MR^2\)</td></tr></table>
<p><b>Parallel axis theorem:</b> \(I = I_{\text{cm}} + Md^2\). The rod about its end: \(\frac{1}{12}ML^2 + M\left(\frac L2\right)^2 = \frac13ML^2\).</p>
<p><b>Rolling without slipping</b> down an incline of angle \(\alpha\): with \(I = \beta MR^2\),</p>
\[a = \frac{g\sin\alpha}{1 + \beta}\]
<p>The solid sphere (\(\beta = \frac25\)) beats the disk (\(\frac12\)), which beats the hoop (1), regardless of mass or size.</p>
<p><b>Inertia tensor.</b> \(\mathbf L = I\boldsymbol\omega\) with \(I_{ij} = \int(r^2\delta_{ij} - x_ix_j)dm\). Along the principal axes (eigenvectors) \(\mathbf L\) is parallel to \(\boldsymbol\omega\). Euler's equations \(I_1\dot\omega_1 = (I_2 - I_3)\omega_2\omega_3\) (and cyclic) show that rotation about the intermediate axis is unstable: the tennis racket theorem.</p>`,
      ex: { q: T`A solid cylinder and a hollow sphere roll down the same incline. Which arrives first?`, a: T`<p>Cylinder \(\beta = \frac12\): \(a = \frac{2}{3}g\sin\alpha\). Hollow sphere \(\beta = \frac23\): \(a = \frac35g\sin\alpha\). The cylinder wins.</p>` },
      trap: T`Using \(I = MR^2\) for every round object.`,
      vary: [[T`\(I\) of a 3 kg rod of length 2 m about its end?`, 4, T`\(\frac13\cdot3\cdot4\).`], [T`Rolling acceleration of a hoop on a 30° incline, \(g = 9.8\)?`, 2.45, T`\(\frac{4.9}{2}\).`], [T`\(I\) of a 2 kg disk of radius 1 about a point on its rim (axis perpendicular)?`, 3, T`\(1 + 2\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Hamilton's formulation trades \(n\) second-order equations for \(2n\) first-order ones in positions and momenta. Phase space becomes the stage, and this is the form quantum mechanics and statistical mechanics build on.</p>`,
      body: T`
<p><b>Legendre transform.</b> \(p = \frac{\partial L}{\partial\dot q}\), then</p>
\[H(q, p) = p\dot q - L\]
<p>expressed in \(q\) and \(p\). For \(L = \frac12m\dot q^2 - V\): \(p = m\dot q\) and \(H = \frac{p^2}{2m} + V(q)\), the energy.</p>
<p><b>Hamilton's equations:</b></p>
\[\dot q = \frac{\partial H}{\partial p},\qquad \dot p = -\frac{\partial H}{\partial q}\]
<p><b>Charged particle in a magnetic field.</b> \(L = \frac12m\dot{\mathbf r}^2 + q\dot{\mathbf r}\cdot\mathbf A - q\phi\), so \(\mathbf p = m\dot{\mathbf r} + q\mathbf A\) (canonical momentum differs from \(m\mathbf v\)) and \(H = \frac{(\mathbf p - q\mathbf A)^2}{2m} + q\phi\).</p>
<p><b>Phase space.</b> Each trajectory is a curve in \((q, p)\). For the oscillator \(H = \frac{p^2}{2m} + \frac12m\omega^2q^2\), the curves are ellipses with area \(\frac{2\pi E}{\omega}\). <b>Liouville's theorem:</b> the flow preserves phase-space volume, the foundation of statistical mechanics.</p>
<p>If \(H\) does not depend on \(t\) explicitly, \(\frac{dH}{dt} = 0\): energy is conserved.</p>`,
      ex: { q: T`Find \(H\) and Hamilton's equations for \(L = \frac12m(\dot r^2 + r^2\dot\phi^2) - V(r)\).`, a: T`<p>\(p_r = m\dot r\), \(p_\phi = mr^2\dot\phi\). \(H = \frac{p_r^2}{2m} + \frac{p_\phi^2}{2mr^2} + V(r)\). \(\dot p_\phi = -\partial_\phi H = 0\); \(\dot p_r = \frac{p_\phi^2}{mr^3} - V'(r)\).</p>` },
      trap: T`Substituting \(\dot q\) into \(H\) as a velocity. \(H\) must be written in terms of \(p\).`,
      vary: [[T`\(H\) for \(m = 2\), \(V = 3q^2\) at \(q = 1\), \(p = 4\)?`, 7, T`\(\frac{16}{4} + 3\).`], [T`\(p\) for \(L = \frac12\cdot3\dot q^2\) at \(\dot q = 2\)?`, 6, T`\(m\dot q\).`], [T`Phase-space area of an oscillator orbit with \(E = 2\), \(\omega = 1\), divided by \(\pi\)?`, 4, T`\(\frac{2\pi E}{\omega}\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>The Poisson bracket packages Hamilton's equations into one operation and reveals the algebra of conserved quantities. Replace it by a commutator and you get quantum mechanics.</p>`,
      body: T`
\[\{f, g\} = \sum_i\left(\frac{\partial f}{\partial q_i}\frac{\partial g}{\partial p_i} - \frac{\partial f}{\partial p_i}\frac{\partial g}{\partial q_i}\right)\]
<p><b>Basic brackets:</b> \(\{q_i, p_j\} = \delta_{ij}\), \(\{q_i, q_j\} = \{p_i, p_j\} = 0\). Antisymmetric, bilinear, Leibniz rule, Jacobi identity.</p>
<p><b>Time evolution:</b> \(\frac{df}{dt} = \{f, H\} + \frac{\partial f}{\partial t}\). So \(f\) is conserved iff \(\{f, H\} = 0\) (for no explicit time dependence).</p>
<p><b>Angular momentum</b> \(L_z = xp_y - yp_x\) and its partners satisfy</p>
\[\{L_x, L_y\} = L_z\quad\text{(and cyclic)},\qquad \{L_z, L^2\} = 0\]
<p><b>Poisson's theorem.</b> The bracket of two conserved quantities is conserved.</p>
<p><b>Canonical transformations</b> preserve the brackets: \((q, p) \mapsto (Q, P)\) is canonical iff \(\{Q, P\} = 1\). Example: \(Q = \arctan\frac{q}{p}\), \(P = \frac12(q^2 + p^2)\) turns the oscillator \(H = \frac12(p^2 + q^2)\) into \(H = P\), whose motion is trivial.</p>
<p><b>Dirac's rule:</b> quantization replaces \(\{f, g\}\) by \(\frac{1}{i\hbar}[\hat f, \hat g]\), so \(\{x, p\} = 1\) becomes \([\hat x, \hat p] = i\hbar\).</p>`,
      ex: { q: T`Compute \(\{x^2, p^2\}\) and \(\{xp, H\}\) for \(H = \frac{p^2}{2}\).`, a: T`<p>\(\{x^2, p^2\} = 2x\cdot2p = 4xp\). \(\{xp, \frac{p^2}{2}\} = p\cdot p - 0 = p^2\): so \(\frac{d}{dt}(xp) = p^2\) for a free particle.</p>` },
      trap: T`Swapping the order of the two terms, which flips the sign.`,
      vary: [[T`\(\{q, p\}\)?`, 1, T`Basic bracket.`], [T`\(\{p, q\}\)?`, -1, T`Antisymmetry.`], [T`\(\{q^3, p\}\) at \(q = 2\)?`, 12, T`\(3q^2\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>In a rotating frame such as the Earth, Newton's laws pick up fictitious forces. The centrifugal force flings outward, and the Coriolis force deflects moving objects, steering hurricanes and Foucault's pendulum.</p>`,
      body: T`
<p>In a frame rotating with angular velocity \(\boldsymbol\Omega\):</p>
\[m\ddot{\mathbf r} = \mathbf F - 2m\boldsymbol\Omega\times\dot{\mathbf r} - m\boldsymbol\Omega\times(\boldsymbol\Omega\times\mathbf r)\]
<p>The second term is the <b>Coriolis</b> force, the third the <b>centrifugal</b> force (magnitude \(m\Omega^2\rho\), with \(\rho\) the distance from the axis).</p>
<p><b>Earth.</b> \(\Omega = \frac{2\pi}{86164\text{ s}} \approx 7.29\times10^{-5}\) s\(^{-1}\) (sidereal day). At the equator the centrifugal acceleration is \(\Omega^2R \approx 0.034\) m/s\(^2\), which is why \(g\) is smaller there.</p>
<p><b>Coriolis size.</b> For horizontal motion at speed \(v\) and latitude \(\lambda\), the horizontal deflecting acceleration is \(2\Omega v\sin\lambda\). It deflects to the right in the northern hemisphere. A 30 m/s wind at 45° N: \(2(7.29\times10^{-5})(30)(0.707) \approx 3.1\times10^{-3}\) m/s\(^2\).</p>
<p><b>Foucault pendulum.</b> Its swing plane turns once every \(\frac{1\text{ sidereal day}}{\sin\lambda}\): about 34 hours at 45°, 24 hours at the poles, never at the equator.</p>
<p><b>Rotating space station.</b> Artificial gravity \(\Omega^2r\): for \(g\) at \(r = 100\) m, \(\Omega = \sqrt{9.8/100} \approx 0.31\) rad/s, about 3 rpm.</p>`,
      ex: { q: T`Find the Foucault precession period at latitude 30°.`, a: T`<p>\(\frac{23.93\text{ h}}{\sin30°} = 47.9\) hours.</p>` },
      trap: T`Using 24 hours instead of the sidereal day of 23.93 hours for the Earth's rotation rate. The difference is small but real.`,
      vary: [[T`Artificial gravity at \(r = 50\) m, \(\Omega = 0.4\) rad/s?`, 8, T`\(0.16\cdot50\).`], [T`Foucault period (hours) at the North Pole, two decimals.`, 23.93, T`One sidereal day.`], [T`Coriolis horizontal acceleration at the equator?`, 0, T`\(\sin0 = 0\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>When a system's parameters change slowly, energy is not conserved, but a cleverer quantity is: the action, the area of the orbit in phase space. This adiabatic invariant became the seed of the old quantum theory.</p>`,
      body: T`
<p><b>Action variable</b> for a periodic orbit: \(J = \oint p\,dq\), the phase-space area enclosed.</p>
<p><b>Oscillator.</b> The orbit is an ellipse with semi-axes \(\sqrt{2mE}\) and \(\sqrt{\frac{2E}{m\omega^2}}\), so \(J = \frac{2\pi E}{\omega}\).</p>
<p><b>Adiabatic invariance.</b> If a parameter changes slowly compared with the period, \(J\) stays (very nearly) constant. For an oscillator whose frequency is raised slowly from \(\omega_1\) to \(\omega_2\):</p>
\[E_2 = E_1\frac{\omega_2}{\omega_1}\]
<p>A pendulum whose string is slowly shortened: \(\omega \propto \ell^{-1/2}\), so \(E \propto \ell^{-1/2}\), and the angular amplitude grows like \(\ell^{-3/4}\).</p>
<p><b>Particle in a box</b> of width \(L\) at speed \(v\): \(J = 2mvL\). Slowly compressing the box raises \(v\) as \(\frac1L\), which is adiabatic compression of a one-dimensional gas.</p>
<p><b>Bohr–Sommerfeld.</b> The old quantum rule \(J = nh\) gives the oscillator levels \(E = n\hbar\omega\) (the exact result adds \(\frac12\)). Action-angle variables \((J, \theta)\) make any integrable system's motion uniform: \(\dot\theta = \frac{\partial H}{\partial J}\).</p>`,
      ex: { q: T`An oscillator with \(E = 3\) J and \(\omega = 2\) rad/s has its spring slowly stiffened until \(\omega = 5\). Find the new energy.`, a: T`<p>\(\frac{E}{\omega}\) is invariant: \(\frac32 = \frac{E_2}{5}\), so \(E_2 = 7.5\) J.</p>` },
      trap: T`Assuming energy is conserved under a slow change. The external agent does work; the action is what is conserved.`,
      vary: [[T`\(J\) for \(E = 5\), \(\omega = 2\), divided by \(\pi\)?`, 5, T`\(\frac{2E}{\omega}\).`], [T`Box width halved slowly: factor change in speed?`, 2, T`\(vL\) constant.`], [T`Pendulum length quartered slowly: factor change in energy?`, 2, T`\(E \propto \ell^{-1/2}\).`]] }
  ]);

  addQuestions('cm', [
    { id: 'cm1', skill: U[0], q: T`The Lagrangian of a conservative system is:`, c: [T`\(T - V\)`, T`\(T + V\)`, T`\(V - T\)`, T`\(\frac12(T + V)\)`], x: T`Stationary \(\int(T - V)dt\) gives Newton's laws.` },
    { id: 'cm2', skill: U[1], q: T`If \(L\) does not depend on a coordinate \(q\), then:`, c: [T`\(\partial L/\partial\dot q\) is conserved`, T`\(q\) is constant`, T`\(\dot q\) is constant`, 'the energy is zero'], x: T`Euler–Lagrange gives \(\dot p_q = 0\).` },
    { id: 'cm3', skill: U[2], q: T`Kepler's second law (equal areas in equal times) expresses conservation of:`, c: ['angular momentum', 'energy', 'linear momentum', 'the Runge–Lenz vector'], x: T`Areal speed \(\frac{\ell}{2m}\).` },
    { id: 'cm4', skill: U[4], q: T`Which rolls down an incline fastest?`, c: ['a solid sphere', 'a solid cylinder', 'a hollow sphere', 'a hoop'], x: T`Smallest \(\beta = I/MR^2 = \frac25\).` },
    { id: 'cm5', skill: U[4], q: T`Free rotation about which principal axis is unstable?`, c: ['the intermediate axis', 'the largest-moment axis', 'the smallest-moment axis', 'none'], x: T`The tennis racket theorem.` },
    { id: 'cm6', skill: U[5], q: T`Liouville's theorem says Hamiltonian flow:`, c: ['preserves phase-space volume', 'conserves momentum', 'is always periodic', 'reduces entropy'], x: T`The flow is divergence-free in \((q, p)\).` },
    { id: 'cm7', skill: U[6], q: T`A quantity \(f\) with no explicit time dependence is conserved exactly when:`, c: [T`\(\{f, H\} = 0\)`, T`\(\{f, q\} = 0\)`, T`\(\partial f/\partial q = 0\)`, T`\(f = H\)`], x: T`\(\dot f = \{f, H\}\).` }
  ]);

  // ======================= GENERATORS =======================
  const G = 9.8;

  registerUnitGens('cm', { units: {
    [U[0]]: [{ id: 'cm-lag', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const l = R.pick([0.5, 1, 2, 2.5]), th = R.pick([Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2]), tt = { [Math.PI / 6]: '\\frac\\pi6', [Math.PI / 4]: '\\frac\\pi4', [Math.PI / 3]: '\\frac\\pi3', [Math.PI / 2]: '\\frac\\pi2' }[th], tp = { [Math.PI / 6]: 'pi/6', [Math.PI / 4]: 'pi/4', [Math.PI / 3]: 'pi/3', [Math.PI / 2]: 'pi/2' }[th], m = R.int(1, 3);
        return { q: T`A pendulum of length ${l} m and mass ${m} kg has \(L = \frac12m\ell^2\dot\theta^2 + mg\ell\cos\theta\), \(g = 9.8\). Find \(\ddot\theta\) at \(\theta = ${tt}\), to three decimals.`, answer: -G / l * Math.sin(th), tol: 0.001, x: T`Euler–Lagrange: \(\ddot\theta = -\frac g\ell\sin\theta = -\frac{9.8}{${l}}\sin${tt}\).`, v: `eom(lambda q, qd: Rational(1, 2)*${m}*nsimplify(${l})**2*qd**2 + ${m}*Rational(98, 10)*nsimplify(${l})*cos(q), ${tp}, 0)` }; }
      if (k === 1) { const m1 = R.int(1, 6), m2 = R.int(1, 6); if (m1 === m2) return this.make(R);
        return { q: T`Atwood machine: \(m_1 = ${m1}\) kg, \(m_2 = ${m2}\) kg, massless pulley, \(g = 9.8\). With \(x\) the descent of \(m_1\), \(L = \frac12(m_1 + m_2)\dot x^2 + (m_1 - m_2)gx\). Find \(\ddot x\), to three decimals.`, answer: (m1 - m2) / (m1 + m2) * G, tol: 0.001, x: T`\((m_1 + m_2)\ddot x = (m_1 - m_2)g\), so \(\ddot x = \frac{${m1 - m2}}{${m1 + m2}}\cdot9.8\).`, v: `eom(lambda q, qd: Rational(1, 2)*${m1 + m2}*qd**2 + (${m1 - m2})*Rational(98, 10)*q, 0, 0)` }; }
      const c = R.int(1, 3), x0 = R.pick([0.5, 1, 2]), v0 = R.int(0, 2);
      // bead on y = c x^2: L = 1/2 (1 + 4c^2 x^2) xd^2 - g c x^2 (m = 1)
      const acc = -(4 * c * c * x0 * v0 * v0 + 2 * G * c * x0) / (1 + 4 * c * c * x0 * x0);
      return { q: T`A bead (mass 1) slides on the wire \(y = ${c === 1 ? '' : c}x^2\) under gravity \(g = 9.8\), with \(L = \frac12(1 + ${4 * c * c}x^2)\dot x^2 - 9.8\cdot${c}x^2\). Find \(\ddot x\) when \(x = ${x0}\), \(\dot x = ${v0}\), to three decimals.`, answer: acc, tol: 0.001, x: T`Euler–Lagrange: \((1 + ${4 * c * c}x^2)\ddot x + ${4 * c * c}x\dot x^2 + ${R.fmt(2 * G * c, 3)}x = 0\).`, v: `eom(lambda q, qd: Rational(1, 2)*(1 + ${4 * c * c}*q**2)*qd**2 - Rational(98, 10)*${c}*q**2, nsimplify(${x0}), ${v0})` };
    } }],
    [U[1]]: [{ id: 'cm-cons', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const m = R.int(1, 4), r = R.int(1, 5), w = R.pick([0.5, 1, 2, 1.5]); return { q: T`For \(L = \frac12m(\dot r^2 + r^2\dot\phi^2) - V(r)\) with \(m = ${m}\), find the conserved \(p_\phi\) when \(r = ${r}\), \(\dot\phi = ${w}\).`, answer: m * r * r * w, tol: 1e-6, x: T`\(\phi\) is cyclic: \(p_\phi = \frac{\partial L}{\partial\dot\phi} = mr^2\dot\phi = ${m}\cdot${r * r}\cdot${w}\).`, v: `diff(Rational(1, 2)*${m}*(Symbol('rd')**2 + Symbol('r')**2*Symbol('pd')**2), Symbol('pd')).subs({Symbol('r'): ${r}, Symbol('pd'): nsimplify(${w})})` }; }
      const S = [['\\frac12m(\\dot x^2 + \\dot y^2) - mgy', '\\(p_x\\)', ['\\(p_y\\)', '\\(p_x + p_y\\)', '\\(p_x - p_y\\)'], 'x does not appear in L'], ['\\frac12m(\\dot r^2 + r^2\\dot\\phi^2) + \\frac kr', '\\(p_\\phi\\)', ['\\(p_r\\)', '\\(p_r + p_\\phi\\)', '\\(rp_r\\)'], '\\(\\phi\\) does not appear in L'], ['\\frac12(\\dot x^2 + \\dot y^2) - V(x - y)', '\\(p_x + p_y\\)', ['\\(p_x\\)', '\\(p_y\\)', '\\(p_x - p_y\\)'], 'L is unchanged when x and y shift together'], ['\\frac12m(\\dot\\rho^2 + \\rho^2\\dot\\phi^2 + \\dot z^2) - V(\\rho)', '\\(p_\\phi\\) and \\(p_z\\)', ['\\(p_\\rho\\) only', '\\(p_\\rho\\) and \\(p_z\\)', '\\(p_\\rho\\) and \\(p_\\phi\\)'], 'both \\(\\phi\\) and z are absent from L']];
      const i = R.int(0, S.length - 1), [L, c, wrong, why] = S[i];
      return { q: T`For \(L = ${L}\), which momentum is conserved?`, c: [c, ...wrong], x: T`Because ${why}.`, key: 'm' + i, vk: `'m${i}'` };
    } }],
    [U[2]]: [{ id: 'cm-kep', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.pick([0.39, 0.72, 1.52, 5.2, 9.54, 2, 4, 9, 16]), T1 = a ** 1.5; return { q: T`A planet orbits the Sun with semi-major axis ${a} AU. Find its period in years, to three decimals.`, answer: T1, tol: 0.001, x: T`Kepler III in solar units: \(T = a^{3/2} = ${a}^{1.5}\).`, v: `nsimplify(${a})**Rational(3, 2)` }; }
      if (k === 1) { const l = R.int(1, 6), m = R.int(1, 3), kk = R.int(1, 6), r0 = l * l / (m * kk), ask = R.int(0, 1);
        return { q: T`For \(V = -\frac{${kk}}{r}\), \(m = ${m}\), \(\ell = ${l}\), find ${ask ? 'the energy of' : 'the radius of'} the circular orbit${ask ? ', to four decimals' : ', to four decimals'}.`, answer: ask ? -kk / (2 * r0) : r0, tol: 1e-4, x: T`Minimize \(V_{\text{eff}} = -\frac{${kk}}{r} + \frac{${l * l}}{${2 * m}r^2}\): \(r_0 = \frac{\ell^2}{mk} = ${R.fmt(r0, 4)}\)${ask ? T`, energy \(-\frac{k}{2r_0} = ${R.fmt(-kk / (2 * r0), 4)}\)` : ''}.`,
          v: ask ? `(lambda r: (-${kk}/r + Rational(${l * l}, ${2 * m})/r**2).subs(r, solve(diff(-${kk}/r + Rational(${l * l}, ${2 * m})/r**2, r), r)[0]))(Symbol('r', positive=True))` : `solve(diff(-${kk}/Symbol('r', positive=True) + Rational(${l * l}, ${2 * m})/Symbol('r', positive=True)**2, Symbol('r', positive=True)), Symbol('r', positive=True))[0]` }; }
      const M = R.pick([[5.97e24, 6.371e6, 'Earth'], [7.35e22, 1.737e6, 'the Moon'], [6.42e23, 3.39e6, 'Mars']]), Gc = 6.674e-11, sci = (x, d) => { const [mn, ex] = x.toExponential(d).split('e'); return `${mn}\\times10^{${+ex}}`; }, ask = R.int(0, 1), v = Math.sqrt((ask ? 2 : 1) * Gc * M[0] / M[1]);
      return { q: T`Find the ${ask ? 'escape' : 'circular orbital'} speed at the surface of ${M[2]} (\(M = ${sci(M[0], 2)}\) kg, \(R = ${sci(M[1], 3)}\) m), in m/s, to the nearest 10.`, answer: v, tol: 10, x: T`\(v = \sqrt{\frac{${ask ? 2 : ''}GM}{R}} \approx ${Math.round(v)}\) m/s.`, v: `sqrt(${ask ? 2 : 1}*6.674e-11*${M[0]}/${M[1]})` };
    } }],
    [U[3]]: [{ id: 'cm-small', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.int(1, 3), b = R.int(1, 4), m = R.int(1, 4); // V = a x^4 - 2 a b^2 x^2? keep: V = a x^4 - 2 a b x^2, minima at x^2 = b, V'' = 12 a x^2 - 4 a b = 8 a b
        const w = Math.sqrt(8 * a * b / m); return { q: T`A particle of mass ${m} moves in \(V = ${a === 1 ? '' : a}x^4 - ${2 * a * b}x^2\). Find the angular frequency of small oscillations about a minimum, to four decimals.`, answer: w, tol: 1e-4, x: T`Minima at \(x^2 = ${b}\); \(V'' = ${12 * a}x^2 - ${4 * a * b} = ${8 * a * b}\). \(\omega = \sqrt{${8 * a * b}/${m}}\).`, v: `(lambda x: sqrt(diff(${a}*x**4 - ${2 * a * b}*x**2, x, 2).subs(x, sqrt(${b}))/${m}))(Symbol('x', positive=True))` }; }
      if (k === 1) { const a = R.int(1, 4), b = R.int(1, 4), m = R.int(1, 3); // V = a/x + b x, min at x = sqrt(a/b), V'' = 2a/x^3
        const x0 = Math.sqrt(a / b), w = Math.sqrt(2 * a / x0 ** 3 / m); return { q: T`A particle of mass ${m} moves in \(V = \frac{${a}}{x} + ${b === 1 ? '' : b}x\) (\(x > 0\)). Find the small-oscillation angular frequency, to four decimals.`, answer: w, tol: 1e-4, x: T`Equilibrium \(x_0 = \sqrt{${a}/${b}}\); \(V'' = \frac{${2 * a}}{x_0^3}\). \(\omega = \sqrt{V''/m} \approx ${R.fmt(w, 4)}\).`, v: `(lambda x: sqrt(diff(${a}/x + ${b}*x, x, 2).subs(x, solve(diff(${a}/x + ${b}*x, x), x)[0])/${m}))(Symbol('x', positive=True))` }; }
      const g = R.pick([9.8, 4, 1]), l = R.pick([1, 2, 0.5]), km = R.pick([1, 2, 3, 0.5]), hi = R.int(0, 1), w2 = g / l + (hi ? 2 * km : 0);
      return { q: T`Two identical pendula (\(g/\ell = ${R.fmt(g / l, 4)}\)) are coupled by a spring with \(k/m = ${km}\). Find the ${hi ? 'higher' : 'lower'} normal-mode angular frequency, to four decimals.`, answer: Math.sqrt(w2), tol: 1e-4, x: T`\(\omega^2 = \frac g\ell${hi ? ' + \\frac{2k}{m}' : ''} = ${R.fmt(w2, 4)}\).`, v: `float(np.sqrt(sorted(np.linalg.eigvalsh(np.array([[${g / l} + ${km}, -${km}], [-${km}, ${g / l} + ${km}]])))[${hi}]))` };
    } }],
    [U[4]]: [{ id: 'cm-rigid', make(R) {
      const k = R.int(0, 2), B = [['solid sphere', 0.4], ['solid cylinder', 0.5], ['hoop', 1], ['hollow sphere', 2 / 3]];
      if (k === 0) { const [name, beta] = R.pick(B), ang = R.pick([30, 20, 45, 10]), a = G * Math.sin(ang * Math.PI / 180) / (1 + beta); return { q: T`A ${name} rolls without slipping down a ${ang}° incline (\(g = 9.8\)). Find its acceleration, to three decimals.`, answer: a, tol: 0.001, x: T`\(a = \frac{g\sin\alpha}{1 + \beta}\) with \(\beta = I/MR^2 = ${R.fmt(beta, 4)}\).`, v: `eom(lambda q, qd: Rational(1, 2)*(1 + nsimplify(${beta}))*qd**2 + Rational(98, 10)*sin(${ang}*pi/180)*q, 0, 0)` }; }
      if (k === 1) { const M = R.int(1, 5), L = R.int(1, 4), d = R.pick([0, L / 4, L / 2]); const I = M * L * L / 12 + M * d * d;
        return { q: T`Find the moment of inertia of a uniform rod (mass ${M} kg, length ${L} m) about a perpendicular axis ${d === 0 ? 'through its center' : d === L / 2 ? 'through one end' : `${d} m from its center`}, to four decimals.`, answer: I, tol: 1e-4, x: T`\(\frac{1}{12}ML^2 + Md^2 = ${R.fmt(M * L * L / 12, 4)} + ${R.fmt(M * d * d, 4)}\).`, v: `integrate(Rational(${M}, ${L})*(Symbol('s') - nsimplify(${d}))**2, (Symbol('s'), -Rational(${L}, 2), Rational(${L}, 2)))` }; }
      const M = R.int(1, 5), Rr = R.int(1, 3), [name, beta] = R.pick(B.slice(0, 2)), I = beta * M * Rr * Rr + M * Rr * Rr;
      return { q: T`Find the moment of inertia of a ${name} (mass ${M} kg, radius ${Rr} m) about an axis tangent to its surface, parallel to a ${name === 'solid sphere' ? 'diameter' : 'the symmetry axis'}, to four decimals.`, answer: I, tol: 1e-4, x: T`Parallel axis: \(${R.fmt(beta, 3)}MR^2 + MR^2 = ${R.fmt(I, 4)}\).`,
        v: name === 'solid sphere' ? `(lambda r, th, ph: integrate(integrate(integrate(Rational(${M}*3, 4)/pi/${Rr}**3*((r*sin(th)*cos(ph) - ${Rr})**2 + (r*sin(th)*sin(ph))**2)*r**2*sin(th), (r, 0, ${Rr})), (th, 0, pi)), (ph, 0, 2*pi)))(Symbol('r'), Symbol('th'), Symbol('ph'))` : `(lambda r, ph: integrate(integrate(${M}/(pi*${Rr}**2)*((r*cos(ph) - ${Rr})**2 + (r*sin(ph))**2)*r, (r, 0, ${Rr})), (ph, 0, 2*pi)))(Symbol('r'), Symbol('ph'))` };
    } }],
    [U[5]]: [{ id: 'cm-ham', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const m = R.int(1, 4), kk = R.int(1, 5), q = R.int(-2, 2), p = R.int(-4, 4), H = p * p / (2 * m) + kk * q * q / 2;
        return { q: T`For \(L = \frac12\cdot${m}\dot q^2 - \frac12\cdot${kk}q^2\), find the Hamiltonian's value at \(q = ${q}\), \(p = ${p}\), to four decimals.`, answer: H, tol: 1e-4, x: T`\(p = ${m}\dot q\), \(H = p\dot q - L = \frac{p^2}{${2 * m}} + \frac{${kk}}{2}q^2\).`, v: `(lambda q, qd, p: (p*qd - (Rational(${m}, 2)*qd**2 - Rational(${kk}, 2)*q**2)).subs(qd, solve(diff(Rational(${m}, 2)*qd**2, qd) - p, qd)[0]).subs({q: ${q}, p: ${p}}))(Symbol('q'), Symbol('qd'), Symbol('p'))` }; }
      const m = R.int(1, 3), qc = R.int(1, 3), Ac = R.int(-2, 2), v = R.int(-3, 3);
      return { q: T`A particle (mass ${m}, charge ${qc}) moves in 1D with \(L = \frac12m\dot x^2 + qA\dot x\), \(A = ${Ac}\). Find its canonical momentum when \(\dot x = ${v}\).`, answer: m * v + qc * Ac, x: T`\(p = \frac{\partial L}{\partial\dot x} = m\dot x + qA = ${m * v} + ${qc * Ac}\). It differs from \(m\dot x\) by \(qA\).`, v: `diff(Rational(${m}, 2)*Symbol('xd')**2 + ${qc}*(${Ac})*Symbol('xd'), Symbol('xd')).subs(Symbol('xd'), ${v})` };
    } }],
    [U[6]]: [{ id: 'cm-pb', make(R) {
      const F = [['q^2', 'q**2'], ['p^2', 'p**2'], ['qp', 'q*p'], ['q^3', 'q**3'], ['p^3', 'p**3'], ['q^2p', 'q**2*p'], ['\\sin q', 'sin(q)'], ['e^p', 'exp(p)']], [ft, fp] = R.pick(F); let g; do { g = R.pick(F); } while (g[1] === fp);
      const q0 = R.int(-2, 2), p0 = R.int(-2, 2);
      const dq = { 'q**2': (q) => 2 * q, 'p**2': () => 0, 'q*p': (q, p) => p, 'q**3': q => 3 * q * q, 'p**3': () => 0, 'q**2*p': (q, p) => 2 * q * p, 'sin(q)': q => Math.cos(q), 'exp(p)': () => 0 }, dp = { 'q**2': () => 0, 'p**2': (q, p) => 2 * p, 'q*p': q => q, 'q**3': () => 0, 'p**3': (q, p) => 3 * p * p, 'q**2*p': q => q * q, 'sin(q)': () => 0, 'exp(p)': (q, p) => Math.exp(p) };
      const val = dq[fp](q0, p0) * dp[g[1]](q0, p0) - dp[fp](q0, p0) * dq[g[1]](q0, p0);
      if (Math.abs(val) < 1e-12 && R.int(0, 4)) return this.make(R);
      return { q: T`Compute the Poisson bracket \(\{${ft}, ${g[0]}\}\) at \(q = ${q0}\), \(p = ${p0}\), to four decimals.`, answer: val, tol: 1e-4, x: T`\(\{f, g\} = f_qg_p - f_pg_q\).`, v: `(lambda q, p: (diff(${fp}, q)*diff(${g[1]}, p) - diff(${fp}, p)*diff(${g[1]}, q)).subs({q: ${q0}, p: ${p0}}))(Symbol('q'), Symbol('p'))` };
    } }],
    [U[7]]: [{ id: 'cm-rot', make(R) {
      const k = R.int(0, 2), Om = 7.292e-5;
      if (k === 0) { const v = R.int(10, 50), lat = R.pick([15, 30, 45, 60, 90]), a = 2 * Om * v * Math.sin(lat * Math.PI / 180); return { q: T`Find the horizontal Coriolis acceleration of a wind at ${v} m/s at latitude ${lat}°, in units of \(10^{-3}\) m/s\(^2\), to three decimals. (\(\Omega = 7.292\times10^{-5}\) s\(^{-1}\).)`, answer: a * 1000, tol: 0.001, x: T`\(2\Omega v\sin\lambda = 2(7.292\times10^{-5})(${v})\sin${lat}°\).`, v: `(lambda O, vv: float(abs((2*O.cross(vv))[1]))*1000)(Matrix([0, 7.292e-5*cos(${lat}*pi/180), 7.292e-5*sin(${lat}*pi/180)]), Matrix([${v}, 0, 0]))` }; }
      if (k === 1) { const lat = R.pick([30, 45, 60, 90, 20]), P = 23.934 / Math.sin(lat * Math.PI / 180); return { q: T`Find the Foucault pendulum precession period at latitude ${lat}°, in hours, to two decimals. (Sidereal day 23.934 h.)`, answer: P, tol: 0.01, x: T`\(\frac{23.934}{\sin${lat}°}\).`, v: `23.934/sin(${lat}*pi/180)` }; }
      const r = R.pick([50, 100, 200, 400]), g = R.pick([9.8, 4.9, 3.7]), w = Math.sqrt(g / r), rpm = w * 60 / (2 * Math.PI), ask = R.int(0, 1);
      return { q: T`A rotating station of radius ${r} m should provide artificial gravity ${g} m/s\(^2\). Find the required ${ask ? 'rotation rate in rpm' : 'angular velocity in rad/s'}, to four decimals.`, answer: ask ? rpm : w, tol: 1e-4, x: T`\(\Omega^2r = g\), \(\Omega = \sqrt{${g}/${r}} \approx ${R.fmt(w, 5)}\) rad/s${ask ? ', times \\(\\frac{60}{2\\pi}\\)' : ''}.`, v: ask ? `sqrt(nsimplify(${g})/${r})*60/(2*pi)` : `sqrt(nsimplify(${g})/${r})` };
    } }],
    [U[8]]: [{ id: 'cm-adia', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const E = R.int(1, 9), w1 = R.int(1, 4), w2 = R.int(1, 8); if (w1 === w2) return this.make(R); return { q: T`An oscillator with \(E = ${E}\) J and \(\omega = ${w1}\) rad/s has its frequency slowly changed to ${w2} rad/s. Find the new energy.`, answer: E * w2 / w1, tol: 1e-6, x: T`\(J = \frac{2\pi E}{\omega}\) is adiabatically invariant: \(E_2 = ${E}\cdot\frac{${w2}}{${w1}}\).`, v: `solve(2*pi*Symbol('E2')/${w2} - 2*pi*${E}/${w1}, Symbol('E2'))` }; }
      if (k === 1) { const E = R.int(1, 9), w = R.int(1, 4), m = R.int(1, 3), J = 2 * E / w; return { q: T`Find the action \(J = \oint p\,dq\) of an oscillator with \(m = ${m}\), \(\omega = ${w}\), \(E = ${E}\), divided by \(\pi\).`, answer: J, tol: 1e-6, x: T`An ellipse with semi-axes \(\sqrt{2mE}\) and \(\sqrt{2E/m\omega^2}\): area \(\frac{2\pi E}{\omega}\).`, v: `(lambda q: 2*integrate(sqrt(2*${m}*(${E} - Rational(1, 2)*${m}*${w}**2*q**2)), (q, -sqrt(Rational(2*${E}, ${m}*${w}**2)), sqrt(Rational(2*${E}, ${m}*${w}**2))))/pi)(Symbol('q', real=True))` }; }
      const f = R.pick([2, 4, 9, 0.25]);
      return { q: T`A pendulum's length is slowly divided by ${f}. By what factor does its oscillation energy change? (Four decimals.)`, answer: Math.sqrt(f), tol: 1e-4, x: T`\(\omega \propto \ell^{-1/2}\) rises by \(\sqrt{${f}}\); with \(\frac E\omega\) invariant, \(E\) rises by the same factor.`, v: `sqrt(nsimplify(${f}))` };
    } }]
  } });
})();
