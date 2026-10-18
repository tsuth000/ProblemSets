'use strict';
// Theoretical physics track: Electromagnetism (upper division). Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'em', name: 'Electromagnetism', color: '#2E4A7A', blurb: 'Maxwell\u2019s equations, Gauss\u2019s law, potentials and images, energy and capacitance, Biot-Savart and Amp\u00e8re, dipoles, induction, electromagnetic waves, radiation, charged particle motion', questions: [], generators: [] });
  const U = ['Maxwell\u2019s equations', 'Gauss\u2019s law', 'Potentials, images, and multipoles', 'Energy and capacitance', 'Magnetostatics', 'Magnetic dipoles', 'Induction and inductance', 'Electromagnetic waves', 'Radiation', 'Charged particles in fields'];
  const K = 8.988e9, EPS = 8.854e-12, MU = 4 * Math.PI * 1e-7, C = 2.998e8, QE = 1.602e-19, ME = 9.109e-31;

  registerLearn('em', [
    { title: U[0], skill: U[0],
      hook: T`<p>Four equations describe every electric and magnetic phenomenon, from static charges to light. Each has a differential form (what happens at a point) and an integral form (what happens through a surface or around a loop).</p>`,
      body: T`
<table class="tt"><tr><th>Law</th><th>Differential form</th></tr>
<tr><td>Gauss</td><td>\(\nabla\cdot\mathbf E = \frac{\rho}{\varepsilon_0}\)</td></tr>
<tr><td>No monopoles</td><td>\(\nabla\cdot\mathbf B = 0\)</td></tr>
<tr><td>Faraday</td><td>\(\nabla\times\mathbf E = -\frac{\partial\mathbf B}{\partial t}\)</td></tr>
<tr><td>Ampère–Maxwell</td><td>\(\nabla\times\mathbf B = \mu_0\mathbf J + \mu_0\varepsilon_0\frac{\partial\mathbf E}{\partial t}\)</td></tr></table>
<p><b>Integral forms</b> follow from the divergence and Stokes theorems: flux of \(\mathbf E\) out of a closed surface is \(\frac{Q_{\text{enc}}}{\varepsilon_0}\); the emf around a loop is \(-\frac{d\Phi_B}{dt}\); and so on.</p>
<p><b>Reading a field.</b> Given \(\mathbf E\), the charge density is \(\rho = \varepsilon_0\nabla\cdot\mathbf E\). For \(\mathbf E = (ax, by, cz)\), \(\frac\rho{\varepsilon_0} = a + b + c\), uniform.</p>
<p><b>Charge conservation.</b> Taking the divergence of Ampère–Maxwell gives \(\frac{\partial\rho}{\partial t} + \nabla\cdot\mathbf J = 0\). Maxwell's displacement-current term \(\mu_0\varepsilon_0\partial_t\mathbf E\) is exactly what makes this consistent, and it is what allows electromagnetic waves.</p>
<p><b>Lorentz force:</b> \(\mathbf F = q(\mathbf E + \mathbf v\times\mathbf B)\). Constants: \(\varepsilon_0 = 8.854\times10^{-12}\) F/m, \(\mu_0 = 4\pi\times10^{-7}\) H/m, \(\frac{1}{\sqrt{\mu_0\varepsilon_0}} = c\).</p>`,
      ex: { q: T`\(\mathbf E = (x^2, 2xy, 0)\) (arbitrary units). Find \(\frac{\rho}{\varepsilon_0}\) at \((1, 2, 0)\), and decide whether this could be a static field.`, a: T`<p>\(\nabla\cdot\mathbf E = 2x + 2x = 4x = 4\). Curl: \(\partial_xE_y - \partial_yE_x = 2y - 0 = 2y \ne 0\). A static field must be curl-free (Faraday with \(\partial_t\mathbf B = 0\)), so it is not electrostatic.</p>` },
      trap: T`Forgetting that an electrostatic field must have zero curl.`,
      vary: [[T`\(\frac{\rho}{\varepsilon_0}\) for \(\mathbf E = (3x, -y, 2z)\)?`, 4, T`\(3 - 1 + 2\).`], [T`\(\nabla\cdot\mathbf B\) for any magnetic field?`, 0, T`No monopoles.`], [T`\(1/\sqrt{\mu_0\varepsilon_0}\) in units of \(10^8\) m/s, three decimals.`, 2.998, T`\(c\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>When a charge distribution has enough symmetry, Gauss's law gives the field in one line: the flux through a symmetric surface equals the enclosed charge over \(\varepsilon_0\).</p>`,
      body: T`
\[\oint\mathbf E\cdot d\mathbf A = \frac{Q_{\text{enc}}}{\varepsilon_0}\]
<table class="tt"><tr><th>Source</th><th>Field</th></tr>
<tr><td>Point charge / sphere, outside</td><td>\(\frac{kQ}{r^2}\)</td></tr>
<tr><td>Uniform ball (radius \(R\)), inside</td><td>\(\frac{kQr}{R^3}\)</td></tr>
<tr><td>Spherical shell, inside</td><td>0</td></tr>
<tr><td>Line charge \(\lambda\)</td><td>\(\frac{\lambda}{2\pi\varepsilon_0s}\)</td></tr>
<tr><td>Infinite plane \(\sigma\)</td><td>\(\frac{\sigma}{2\varepsilon_0}\)</td></tr>
<tr><td>Conductor surface</td><td>\(\frac{\sigma}{\varepsilon_0}\) (outside), 0 inside</td></tr></table>
<p>Here \(k = \frac{1}{4\pi\varepsilon_0} = 8.988\times10^9\) N m\(^2\)/C\(^2\).</p>
<p><b>Uniform ball.</b> Inside, only the charge within radius \(r\) counts: \(Q\frac{r^3}{R^3}\). So \(E\) grows linearly inside, peaks at \(r = R\), and falls as \(\frac1{r^2}\) outside.</p>
<p><b>Non-uniform density.</b> For \(\rho = \rho_0\frac{r}{R}\) in a ball: \(Q(r) = \int_0^r\rho_0\frac{r'}{R}4\pi r'^2dr' = \frac{\pi\rho_0r^4}{R}\), so \(E = \frac{\rho_0r^2}{4\varepsilon_0R}\) inside.</p>
<p><b>Symmetry matters.</b> Gauss's law always holds, but it gives the field only when symmetry fixes the field's direction and makes its magnitude constant on the surface.</p>`,
      ex: { q: T`A ball of radius 0.1 m carries 2 µC uniformly. Find \(E\) at \(r = 0.05\) m and \(r = 0.2\) m.`, a: T`<p>Inside: \(\frac{kQr}{R^3} = \frac{8.988\times10^9\cdot2\times10^{-6}\cdot0.05}{10^{-3}} \approx 8.99\times10^5\) N/C. Outside: \(\frac{kQ}{r^2} = \frac{1.798\times10^4}{0.04} \approx 4.49\times10^5\) N/C.</p>` },
      trap: T`Using the full charge \(Q\) for a point inside a uniform ball.`,
      vary: [[T`Ratio \(E(R/2)/E(R)\) for a uniform ball?`, 0.5, T`Linear inside.`], [T`Ratio \(E(2R)/E(R)\)?`, 0.25, T`Inverse square outside.`], [T`Field inside a charged spherical shell?`, 0, T`No enclosed charge.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>The electric potential turns vector problems into scalar ones. Three tools make it computable: superposition, the method of images for conductors, and the multipole expansion for far-away fields.</p>`,
      body: T`
<p>\(\mathbf E = -\nabla V\), and \(V\) satisfies Poisson's equation \(\nabla^2V = -\frac{\rho}{\varepsilon_0}\) (Laplace's where \(\rho = 0\)). Point charge: \(V = \frac{kq}{r}\).</p>
<p><b>Uniqueness</b> lets you guess: any \(V\) satisfying Poisson's equation and the boundary conditions is the answer.</p>
<p><b>Images.</b></p>
<ul><li>Charge \(q\) at height \(d\) above a grounded plane: replace the plane by \(-q\) at depth \(d\). The force on \(q\) is \(\frac{kq^2}{(2d)^2}\), attractive.</li>
<li>Charge \(q\) at distance \(a\) from the center of a grounded sphere of radius \(R\): image \(q' = -\frac{R}{a}q\) at distance \(\frac{R^2}{a}\) from the center.</li></ul>
<p><b>Multipole expansion.</b> Far from a bounded distribution:</p>
\[V \approx \frac{kQ}{r} + \frac{k\,\mathbf p\cdot\hat{\mathbf r}}{r^2} + \cdots,\qquad \mathbf p = \sum q_i\mathbf r_i\]
<p>A neutral distribution starts at the dipole term; \(\mathbf p\) is then independent of the origin. Dipole \(\pm q\) separated by \(d\): \(p = qd\), \(V = \frac{kp\cos\theta}{r^2}\), field \(\propto\frac{1}{r^3}\).</p>`,
      ex: { q: T`A charge \(q\) sits 3 cm from the center of a grounded sphere of radius 1 cm. Find the image.`, a: T`<p>\(q' = -\frac13q\), located \(\frac{1}{3}\) cm from the center toward \(q\).</p>` },
      trap: T`Placing the sphere's image at distance \(a - R\). It sits at \(\frac{R^2}{a}\) from the center.`,
      vary: [[T`Dipole moment (C·m) of \(+2\) C at \(z = 1\) m and \(-2\) C at \(z = -1\) m?`, 4, T`\(2\cdot1 - 2\cdot(-1)\).`], [T`Image charge for \(q = 6\), \(R = 2\), \(a = 4\)?`, -3, T`\(-\frac24\cdot6\).`], [T`Power of \(r\) in the far field of a pure dipole (\(E \propto r^{n}\))? Enter \(n\).`, -3, T`One more than the potential.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Assembling charges takes work, which is stored in the field. Capacitors are devices built to store that energy, and their capacitance depends only on geometry.</p>`,
      body: T`
<p><b>Energy in the field:</b> \(W = \frac{\varepsilon_0}{2}\int E^2\,dV\), energy density \(\frac{\varepsilon_0E^2}{2}\).</p>
<p><b>Uniform ball of charge:</b> \(W = \frac35\frac{kQ^2}{R}\). <b>Spherical shell:</b> \(\frac12\frac{kQ^2}{R}\). Point charges: \(W = \frac12\sum_{i\ne j}\frac{kq_iq_j}{r_{ij}}\).</p>
<p><b>Capacitance</b> \(C = \frac QV\), stored energy \(\frac12CV^2 = \frac{Q^2}{2C}\).</p>
<table class="tt"><tr><th>Geometry</th><th>\(C\)</th></tr>
<tr><td>Parallel plates (area \(A\), gap \(d\))</td><td>\(\frac{\varepsilon_0A}{d}\)</td></tr>
<tr><td>Isolated sphere</td><td>\(4\pi\varepsilon_0R\)</td></tr>
<tr><td>Concentric spheres \(a < b\)</td><td>\(\frac{4\pi\varepsilon_0ab}{b - a}\)</td></tr>
<tr><td>Coaxial cylinders, length \(L\)</td><td>\(\frac{2\pi\varepsilon_0L}{\ln(b/a)}\)</td></tr></table>
<p>A dielectric multiplies \(C\) by its constant \(\kappa\). In series, \(\frac1C = \sum\frac1{C_i}\); in parallel, \(C = \sum C_i\).</p>
<p><b>Scale.</b> The Earth as an isolated sphere has \(C = 4\pi\varepsilon_0(6.37\times10^6) \approx 0.71\) mF; a 1 m\(^2\) plate pair 1 mm apart has 8.85 nF.</p>`,
      ex: { q: T`A 10 µF capacitor is charged to 12 V. Find the stored energy and charge.`, a: T`<p>\(Q = CV = 120\) µC. \(W = \frac12CV^2 = \frac12(10^{-5})(144) = 0.72\) mJ.</p>` },
      trap: T`Using \(W = QV\) for a capacitor. The charge is added against a growing voltage, giving \(\frac12QV\).`,
      vary: [[T`\(C\) (pF) for plates 0.01 m\(^2\), gap 1 mm, two decimals.`, 88.54, T`\(\frac{\varepsilon_0A}{d}\).`], [T`Energy (J) in 2 F at 3 V?`, 9, T`\(\frac12\cdot2\cdot9\).`], [T`Two 6 µF in series (µF)?`, 3, T`Half.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Steady currents make magnetic fields. The Biot–Savart law adds up contributions from every bit of wire, and Ampère's law shortcuts the calculation when there is symmetry.</p>`,
      body: T`
<p><b>Biot–Savart:</b> \(d\mathbf B = \frac{\mu_0I}{4\pi}\frac{d\mathbf l\times\hat{\mathbf r}}{r^2}\).</p>
<p><b>Ampère:</b> \(\oint\mathbf B\cdot d\mathbf l = \mu_0I_{\text{enc}}\).</p>
<table class="tt"><tr><th>Source</th><th>\(B\)</th></tr>
<tr><td>Long straight wire, distance \(s\)</td><td>\(\frac{\mu_0I}{2\pi s}\)</td></tr>
<tr><td>Center of a loop of radius \(R\)</td><td>\(\frac{\mu_0I}{2R}\)</td></tr>
<tr><td>Loop axis, height \(z\)</td><td>\(\frac{\mu_0IR^2}{2(R^2 + z^2)^{3/2}}\)</td></tr>
<tr><td>Long solenoid, \(n\) turns/m</td><td>\(\mu_0nI\) inside, 0 outside</td></tr>
<tr><td>Toroid, \(N\) turns</td><td>\(\frac{\mu_0NI}{2\pi s}\)</td></tr></table>
<p><b>Inside a thick wire</b> of radius \(a\) with uniform current: \(B = \frac{\mu_0Is}{2\pi a^2}\), linear in \(s\).</p>
<p><b>Force between wires.</b> Parallel currents attract with force per length \(\frac{\mu_0I_1I_2}{2\pi d}\) (this used to define the ampere: 2×10\(^{-7}\) N/m for 1 A at 1 m).</p>
<p><b>Scale.</b> 10 A at 1 cm: \(B = 2\times10^{-4}\) T, about four times the Earth's field.</p>`,
      ex: { q: T`Find \(B\) on the axis of a loop (\(R = 0.1\) m, \(I = 5\) A) at \(z = 0.1\) m, in µT.`, a: T`<p>\(\frac{\mu_0IR^2}{2(R^2 + z^2)^{3/2}} = \frac{4\pi\times10^{-7}\cdot5\cdot0.01}{2(0.02)^{3/2}} \approx 11.1\) µT, about 35% of the center value 31.4 µT.</p>` },
      trap: T`Using \(\frac{\mu_0I}{2\pi R}\) (a straight wire) at the center of a loop. The loop gives \(\frac{\mu_0I}{2R}\), larger by \(\pi\).`,
      vary: [[T`\(B\) (µT) 2 cm from a wire with 4 A?`, 40, T`\(\frac{2\times10^{-7}\cdot4}{0.02}\).`], [T`Solenoid with 1000 turns/m, 2 A: \(B\) (mT), three decimals.`, 2.513, T`\(\mu_0nI\).`], [T`Force per length (µN/m) between wires 1 m apart with 1 A each?`, 0.2, T`\(2\times10^{-7}\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>A small current loop acts like a tiny bar magnet: a magnetic dipole. Its moment determines the torque it feels, its energy in a field, and the field it produces far away.</p>`,
      body: T`
<p><b>Dipole moment</b> of a planar loop: \(\mathbf m = I\mathbf A\) (area vector by the right-hand rule). For \(N\) turns, multiply by \(N\).</p>
<p><b>In a uniform field:</b> torque \(\boldsymbol\tau = \mathbf m\times\mathbf B\), energy \(U = -\mathbf m\cdot\mathbf B\), and no net force. In a non-uniform field, \(\mathbf F = \nabla(\mathbf m\cdot\mathbf B)\).</p>
<p><b>Dipole field</b> far away (same shape as the electric dipole):</p>
\[\mathbf B = \frac{\mu_0}{4\pi r^3}\left[3(\mathbf m\cdot\hat{\mathbf r})\hat{\mathbf r} - \mathbf m\right]\]
<p>On the axis \(B = \frac{\mu_0m}{2\pi r^3}\); at the equator, half that and reversed.</p>
<p><b>Vector potential.</b> \(\mathbf B = \nabla\times\mathbf A\), with \(\mathbf A = \frac{\mu_0}{4\pi}\frac{\mathbf m\times\hat{\mathbf r}}{r^2}\) for a dipole. In Coulomb gauge \(\nabla^2\mathbf A = -\mu_0\mathbf J\).</p>
<p><b>Atomic scale.</b> An electron orbiting with angular momentum \(L\) has \(m = \frac{e}{2m_e}L\). The Bohr magneton \(\mu_B = \frac{e\hbar}{2m_e} = 9.27\times10^{-24}\) J/T.</p>`,
      ex: { q: T`A 50-turn coil of area 4 cm\(^2\) carries 0.2 A in a 0.5 T field at 30° to its axis. Find the torque.`, a: T`<p>\(m = NIA = 50\cdot0.2\cdot4\times10^{-4} = 4\times10^{-3}\) A m\(^2\). \(\tau = mB\sin30° = 10^{-3}\) N m.</p>` },
      trap: T`Expecting a net force on a dipole in a uniform field. Only a torque acts.`,
      vary: [[T`\(m\) (A m\(^2\)) for a 2 A loop of area 0.5 m\(^2\)?`, 1, T`\(IA\).`], [T`Energy (J) of \(m = 3\) aligned with \(B = 2\) T?`, -6, T`\(-mB\).`], [T`Ratio of on-axis to equatorial dipole field strength?`, 2, T`Twice.`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>A changing magnetic flux drives a current: that is Faraday's law, the principle behind generators, transformers, and induction cooktops. Inductance measures how strongly a circuit opposes changes in its own current.</p>`,
      body: T`
<p><b>Faraday's law:</b> \(\mathcal E = -\frac{d\Phi_B}{dt}\), with \(\Phi_B = \int\mathbf B\cdot d\mathbf A\). Lenz's rule: the induced current opposes the change.</p>
<p><b>Examples.</b> A loop of area \(A\) in \(B(t) = B_0\sin\omega t\): \(\mathcal E = -AB_0\omega\cos\omega t\). A rod of length \(\ell\) sliding at \(v\) across a field \(B\): \(\mathcal E = B\ell v\). A coil of \(N\) turns spinning at \(\omega\) in \(B\): peak emf \(NBA\omega\).</p>
<p><b>Self-inductance</b> \(L = \frac{N\Phi}{I}\), so \(\mathcal E = -L\frac{dI}{dt}\). Long solenoid (\(n\) turns per meter, area \(A\), length \(\ell\)):</p>
\[L = \mu_0n^2A\ell\]
<p><b>Energy</b> \(U = \frac12LI^2\), stored in the field with density \(\frac{B^2}{2\mu_0}\).</p>
<p><b>Circuits.</b> An RL circuit has time constant \(\frac LR\); an LC circuit oscillates at \(\omega = \frac{1}{\sqrt{LC}}\). Mutual inductance is symmetric: \(M_{12} = M_{21}\).</p>
<p><b>Transformers:</b> \(\frac{V_s}{V_p} = \frac{N_s}{N_p}\).</p>`,
      ex: { q: T`A solenoid 0.5 m long, 2000 turns, radius 2 cm. Find \(L\) and the energy at 3 A.`, a: T`<p>\(n = 4000\)/m, \(A = \pi(0.02)^2 = 1.257\times10^{-3}\) m\(^2\). \(L = 4\pi\times10^{-7}\cdot1.6\times10^7\cdot1.257\times10^{-3}\cdot0.5 \approx 12.6\) mH. \(U = \frac12(0.0126)(9) \approx 57\) mJ.</p>` },
      trap: T`Forgetting the factor \(N\) when the flux links many turns.`,
      vary: [[T`Rod emf (V): \(B = 0.5\) T, \(\ell = 0.2\) m, \(v = 3\) m/s?`, 0.3, T`\(B\ell v\).`], [T`LC angular frequency for \(L = 1\) H, \(C = 0.25\) F?`, 2, T`\(\frac{1}{\sqrt{0.25}}\).`], [T`Energy (J) in 2 H at 3 A?`, 9, T`\(\frac12\cdot2\cdot9\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Maxwell combined his equations into a wave equation whose speed matched the measured speed of light. Light is an electromagnetic wave, with \(\mathbf E\) and \(\mathbf B\) oscillating at right angles to each other and to the direction of travel.</p>`,
      body: T`
<p>In vacuum, \(\nabla^2\mathbf E = \mu_0\varepsilon_0\partial_t^2\mathbf E\), so waves travel at \(c = \frac{1}{\sqrt{\mu_0\varepsilon_0}}\).</p>
<p><b>Plane wave.</b> \(\mathbf E = E_0\cos(kz - \omega t)\hat{\mathbf x}\), \(\mathbf B = \frac{E_0}{c}\cos(kz - \omega t)\hat{\mathbf y}\), with \(\omega = ck\). So \(B_0 = \frac{E_0}{c}\).</p>
<p><b>Energy flow.</b> Poynting vector \(\mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B\). Time-averaged intensity:</p>
\[I = \frac12c\varepsilon_0E_0^2\]
<p>Sunlight at Earth, \(I \approx 1361\) W/m\(^2\), has \(E_0 = \sqrt{\frac{2I}{c\varepsilon_0}} \approx 1013\) V/m.</p>
<p><b>Momentum.</b> Radiation pressure is \(\frac Ic\) on an absorber and \(\frac{2I}{c}\) on a perfect reflector: about 4.5 µPa for sunlight.</p>
<p><b>In matter</b> the speed is \(\frac cn\) with \(n = \sqrt{\varepsilon_r\mu_r}\). In a conductor, waves decay over the <b>skin depth</b> \(\delta = \sqrt{\frac{2}{\mu\sigma\omega}}\): about 2 mm for copper at 1 kHz, 6.5 µm at 100 MHz.</p>
<p><b>Polarization</b> describes the direction of \(\mathbf E\). Malus's law: a polarizer at angle \(\theta\) transmits \(I_0\cos^2\theta\).</p>`,
      ex: { q: T`A laser beam has intensity 1000 W/m\(^2\). Find \(E_0\) and \(B_0\).`, a: T`<p>\(E_0 = \sqrt{\frac{2000}{2.998\times10^8\cdot8.854\times10^{-12}}} \approx 868\) V/m. \(B_0 = \frac{E_0}{c} \approx 2.9\) µT.</p>` },
      trap: T`Using \(I = c\varepsilon_0E_0^2\) without the \(\frac12\) from time-averaging \(\cos^2\).`,
      vary: [[T`\(B_0\) (µT) for \(E_0 = 300\) V/m, three decimals.`, 300 / C * 1e6, T`\(E_0/c\).`], [T`Malus: fraction transmitted at 60°?`, 0.25, T`\(\cos^2 60°\).`], [T`Radiation pressure (µPa) on a reflector, \(I = 1361\) W/m\(^2\), two decimals.`, 2 * 1361 / C * 1e6, T`\(\frac{2I}{c}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Accelerating charges radiate. One formula, Larmor's, gives the power, and its \(\omega^4\) frequency dependence explains why the sky is blue.</p>`,
      body: T`
<p><b>Larmor formula</b> (nonrelativistic):</p>
\[P = \frac{q^2a^2}{6\pi\varepsilon_0c^3}\]
<p>The radiation is beamed perpendicular to the acceleration, with intensity \(\propto\sin^2\theta\).</p>
<p><b>Oscillating dipole</b> \(p(t) = p_0\cos\omega t\): \(a\) scales as \(\omega^2\), so the time-averaged power is \(\langle P\rangle = \frac{p_0^2\omega^4}{12\pi\varepsilon_0c^3}\).</p>
<p><b>Rayleigh scattering.</b> Small molecules driven by light radiate as dipoles, so scattered intensity \(\propto\frac{1}{\lambda^4}\). Blue light (450 nm) scatters \(\left(\frac{700}{450}\right)^4 \approx 5.9\) times more than red (700 nm).</p>
<p><b>Classical atom problem.</b> An electron orbiting a proton would radiate away its energy in about \(10^{-11}\) s: one of the failures that led to quantum mechanics.</p>
<p><b>Antennas.</b> A half-wave dipole antenna has radiation resistance about 73 Ω. Retarded potentials \(V(\mathbf r, t) = \frac{1}{4\pi\varepsilon_0}\int\frac{\rho(\mathbf r', t_r)}{|\mathbf r - \mathbf r'|}dV'\), with \(t_r = t - \frac{|\mathbf r - \mathbf r'|}{c}\), are the general tool.</p>`,
      ex: { q: T`An electron accelerates at \(10^{18}\) m/s\(^2\). Find the radiated power.`, a: T`<p>\(P = \frac{(1.602\times10^{-19})^2(10^{18})^2}{6\pi(8.854\times10^{-12})(2.998\times10^8)^3} \approx 5.7\times10^{-18}\) W.</p>` },
      trap: T`Expecting uniform motion to radiate. Only acceleration does.`,
      vary: [[T`Rayleigh ratio for 400 nm vs 800 nm?`, 16, T`\(2^4\).`], [T`Factor change in dipole power if \(\omega\) doubles?`, 16, T`\(\omega^4\).`], [T`Factor change in Larmor power if \(a\) triples?`, 9, T`\(a^2\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>A magnetic field bends a moving charge into a circle without changing its speed. This one fact runs cyclotrons, mass spectrometers, and the aurora.</p>`,
      body: T`
<p><b>Uniform \(\mathbf B\).</b> The force \(q\mathbf v\times\mathbf B\) is perpendicular to \(\mathbf v\), so it does no work. Circular motion with</p>
\[r = \frac{mv}{|q|B},\qquad \omega_c = \frac{|q|B}{m}\]
<p>The cyclotron frequency does not depend on speed (nonrelativistically). An electron in 1 T: \(\omega_c = 1.76\times10^{11}\) rad/s, \(f \approx 28\) GHz.</p>
<p>A velocity component along \(\mathbf B\) is unaffected, so the general path is a helix.</p>
<p><b>Crossed fields.</b> With \(\mathbf E \perp \mathbf B\), particles drift at \(\mathbf v_d = \frac{\mathbf E\times\mathbf B}{B^2}\), speed \(\frac EB\), regardless of charge. A velocity selector passes only \(v = \frac EB\).</p>
<p><b>Mass spectrometer.</b> Ions accelerated through voltage \(V\) gain \(\frac12mv^2 = qV\), then circle with \(r = \frac1B\sqrt{\frac{2mV}{q}}\): \(r \propto \sqrt m\).</p>
<p><b>Hall effect.</b> Current through a slab in a perpendicular field builds a transverse voltage \(V_H = \frac{IB}{nqt}\); its sign reveals the carriers' charge.</p>`,
      ex: { q: T`A proton moves at \(10^6\) m/s perpendicular to a 0.5 T field. Find the radius.`, a: T`<p>\(r = \frac{1.673\times10^{-27}\cdot10^6}{1.602\times10^{-19}\cdot0.5} \approx 2.09\) cm.</p>` },
      trap: T`Thinking the magnetic force speeds a particle up. It only turns it.`,
      vary: [[T`Drift speed (m/s) for \(E = 1000\) V/m, \(B = 0.1\) T?`, 10000, T`\(E/B\).`], [T`Factor change in radius if speed doubles?`, 2, T`\(r \propto v\).`], [T`Factor change in cyclotron period if \(B\) doubles?`, 0.5, T`\(\omega \propto B\).`]] }
  ]);

  addQuestions('em', [
    { id: 'em1', skill: U[0], q: T`Which equation would change if magnetic monopoles existed?`, c: [T`\(\nabla\cdot\mathbf B = 0\)`, T`\(\nabla\cdot\mathbf E = \rho/\varepsilon_0\)`, 'the Lorentz force law', 'charge conservation'], x: T`It would gain a magnetic charge density.` },
    { id: 'em2', skill: U[0], q: T`Maxwell's displacement current term is needed for:`, c: ['consistency with charge conservation and the existence of EM waves', 'Gauss\u2019s law', 'static magnetic fields', 'Ohm\u2019s law'], x: T`Without it, \(\nabla\cdot(\nabla\times\mathbf B) = 0\) would force \(\nabla\cdot\mathbf J = 0\).` },
    { id: 'em3', skill: U[1], q: T`The electric field inside a uniformly charged spherical shell is:`, c: ['zero', 'uniform and nonzero', 'proportional to r', 'inverse square'], x: T`No enclosed charge, and symmetry.` },
    { id: 'em4', skill: U[5], q: T`A magnetic dipole in a uniform field experiences:`, c: ['a torque but no net force', 'a net force but no torque', 'both', 'neither'], x: T`\(\nabla(\mathbf m\cdot\mathbf B) = 0\) for uniform \(\mathbf B\).` },
    { id: 'em5', skill: U[7], q: T`The sky is blue because scattered intensity scales as:`, c: [T`\(\lambda^{-4}\)`, T`\(\lambda^{-2}\)`, T`\(\lambda^{2}\)`, T`\(\lambda^{-1}\)`], x: T`Rayleigh scattering by dipoles.` },
    { id: 'em6', skill: U[9], q: T`A magnetic field acting on a moving charge:`, c: ['changes its direction but not its speed', 'changes its speed but not its direction', 'does positive work', 'has no effect at low speed'], x: T`\(\mathbf F \perp \mathbf v\).` }
  ]);

  // ======================= GENERATORS =======================
  registerUnitGens('em', { units: {
    [U[0]]: [{ id: 'em-max', make(R) {
      const F = [['(x^2, 2xy, 0)', 'x**2', '2*x*y', '0'], ['(3x, -y, 2z)', '3*x', '-y', '2*z'], ['(yz, xz, xy)', 'y*z', 'x*z', 'x*y'], ['(x^3, y^3, z)', 'x**3', 'y**3', 'z'], ['(xy, yz, zx)', 'x*y', 'y*z', 'z*x'], ['(e^x, 0, z^2)', 'exp(x)', '0', 'z**2']], [t, P, Q, S] = R.pick(F), p = [R.int(-2, 2), R.int(-2, 2), R.int(-2, 2)], ask = R.int(0, 1);
      const dv = { 'x**2': [2 * p[0], 0, 0], '2*x*y': [2 * p[1], 2 * p[0], 0], '0': [0, 0, 0], '3*x': [3, 0, 0], '-y': [0, -1, 0], '2*z': [0, 0, 2], 'y*z': [0, p[2], p[1]], 'x*z': [p[2], 0, p[0]], 'x*y': [p[1], p[0], 0], 'x**3': [3 * p[0] ** 2, 0, 0], 'y**3': [0, 3 * p[1] ** 2, 0], 'z': [0, 0, 1], 'z*x': [p[2], 0, p[0]], 'exp(x)': [Math.exp(p[0]), 0, 0], 'z**2': [0, 0, 2 * p[2]] };
      const div = dv[P][0] + dv[Q][1] + dv[S][2], curl = [dv[S][1] - dv[Q][2], dv[P][2] - dv[S][0], dv[Q][0] - dv[P][1]], stat = curl.every(c => Math.abs(c) < 1e-12);
      if (ask) return { q: T`An electric field (arbitrary units) is \(\mathbf E = ${t}\). Find \(\frac{\rho}{\varepsilon_0}\) at \((${p.join(', ')})\), to four decimals.`, answer: div, tol: 1e-4, x: T`Gauss: \(\frac\rho{\varepsilon_0} = \nabla\cdot\mathbf E\).`, v: `(lambda x, y, z: (diff(${P}, x) + diff(${Q}, y) + diff(${S}, z)).subs({x: ${p[0]}, y: ${p[1]}, z: ${p[2]}}))(Symbol('x'), Symbol('y'), Symbol('z'))` };
      const statAll = t === '(3x, -y, 2z)' || t === '(yz, xz, xy)' || t === '(x^3, y^3, z)' || t === '(e^x, 0, z^2)';
      return { q: T`Can \(\mathbf E = ${t}\) be an electrostatic field?`, c: statAll ? ['Yes', 'No'] : ['No', 'Yes'], x: statAll ? 'Its curl vanishes everywhere, as Faraday\u2019s law requires when nothing changes in time.' : 'Its curl is nonzero somewhere, which Faraday\u2019s law forbids for static fields.', key: statAll ? 'Yes' : 'No', vk: `(lambda x, y, z: 'Yes' if all(simplify(c) == 0 for c in [diff(${S}, y) - diff(${Q}, z), diff(${P}, z) - diff(${S}, x), diff(${Q}, x) - diff(${P}, y)]) else 'No')(Symbol('x'), Symbol('y'), Symbol('z'))` };
    } }],
    [U[1]]: [{ id: 'em-gauss', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const Q = R.int(1, 9), Rr = R.pick([0.1, 0.2, 0.05]), r = Rr * R.pick([0.25, 0.5, 2, 3]), E = r < Rr ? K * Q * 1e-6 * r / Rr ** 3 : K * Q * 1e-6 / (r * r);
        return { q: T`A ball of radius ${Rr} m carries ${Q} µC uniformly. Find \(E\) at \(r = ${R.fmt(r, 4)}\) m, in units of \(10^5\) N/C, to three decimals.`, answer: E / 1e5, tol: 0.001, x: r < Rr ? T`Inside: \(\frac{kQr}{R^3}\).` : T`Outside: \(\frac{kQ}{r^2}\).`, v: `(lambda s: 8.988e9*integrate(Piecewise((${Q}e-6/(Rational(4, 3)*pi*nsimplify(${Rr})**3), s < nsimplify(${Rr})), (0, True))*4*pi*s**2, (s, 0, nsimplify(${R.fmt(r, 6)})))/nsimplify(${R.fmt(r, 6)})**2/1e5)(Symbol('s', positive=True))` }; }
      if (k === 1) { const lam = R.int(1, 9), s = R.pick([0.01, 0.02, 0.05, 0.1]), E = lam * 1e-9 / (2 * Math.PI * EPS * s);
        return { q: T`An infinite line carries ${lam} nC/m. Find \(E\) at ${s} m, in kN/C, to three decimals.`, answer: E / 1000, tol: 0.001, x: T`\(\frac{\lambda}{2\pi\varepsilon_0s}\).`, v: `${lam}e-9/(2*pi*8.854e-12*${s})/1000` }; }
      const rho0 = R.int(1, 5), Rr = R.int(1, 3), r = R.pick([0.5, 1]) * Rr; // rho = rho0 r/R inside, units with eps0 = 1
      return { q: T`A ball of radius ${Rr} has charge density \(\rho = ${rho0}\frac{r}{${Rr}}\) (units with \(\varepsilon_0 = 1\)). Find \(E\) at \(r = ${r}\), to four decimals.`, answer: rho0 * r * r / (4 * Rr), tol: 1e-4, x: T`\(Q(r) = \frac{\pi\rho_0r^4}{R}\); \(E = \frac{Q(r)}{4\pi r^2} = \frac{\rho_0r^2}{4R}\).`, v: `(lambda s: integrate(${rho0}*s/${Rr}*4*pi*s**2, (s, 0, nsimplify(${r})))/(4*pi*nsimplify(${r})**2))(Symbol('s', positive=True))` };
    } }],
    [U[2]]: [{ id: 'em-pot', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const q = R.int(1, 9), Rr = R.int(1, 4), a = Rr * R.int(2, 4), ask = R.int(0, 1); return { q: T`A point charge \(q = ${q}\) (any unit) sits ${a} cm from the center of a grounded sphere of radius ${Rr} cm. Find the image charge's ${ask ? 'distance from the center (cm)' : 'value'}, to four decimals.`, answer: ask ? Rr * Rr / a : -Rr / a * q, tol: 1e-4, x: T`\(q' = -\frac Raq = ${R.fmt(-Rr / a * q, 4)}\) at \(\frac{R^2}{a} = ${R.fmt(Rr * Rr / a, 4)}\) cm.`,
          v: `(lambda qq, b: solve([qq*(${a} - ${Rr}) + ${q}*(${Rr} - b), qq*(${a} + ${Rr}) + ${q}*(${Rr} + b)], [qq, b], dict=True)[0][${ask ? 'b' : 'qq'}])(Symbol('qq'), Symbol('b'))` }; }
      if (k === 1) { const n = R.int(2, 4), qs = Array.from({ length: n }, () => R.nz(-4, 4)), zs = Array.from({ length: n }, () => R.int(-3, 3)), p = qs.reduce((s, q, i) => s + q * zs[i], 0);
        return { q: T`Charges ${qs.map((q, i) => T`\(${q}\) at \(z = ${zs[i]}\)`).join(', ')}. Find the \(z\)-component of the dipole moment \(\sum q_iz_i\).`, answer: p, x: T`\(${qs.map((q, i) => `(${q})(${zs[i]})`).join(' + ')} = ${p}\).${qs.reduce((s, q) => s + q, 0) ? ' The net charge is nonzero, so this depends on the origin.' : ''}`, v: `sum(q*z for q, z in zip([${qs}], [${zs}]))` }; }
      const q = R.int(1, 5), d = R.pick([0.01, 0.02, 0.05]), F = K * (q * 1e-6) ** 2 / (2 * d) ** 2;
      return { q: T`A ${q} µC charge is ${d} m above a grounded conducting plane. Find the attractive force, in N, to four decimals.`, answer: F, tol: Math.max(1e-4, F * 1e-6), x: T`Image \(-q\) at depth \(d\): \(F = \frac{kq^2}{(2d)^2}\).`, v: `8.988e9*(${q}e-6)**2/(2*${d})**2` };
    } }],
    [U[3]]: [{ id: 'em-cap', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const A = R.pick([0.01, 0.02, 0.1, 1]), d = R.pick([0.001, 0.0005, 0.002]), kap = R.pick([1, 2, 4]), Cv = kap * EPS * A / d;
        return { q: T`Parallel plates of area ${A} m\(^2\), gap ${d * 1000} mm${kap > 1 ? `, dielectric \\(\\kappa = ${kap}\\)` : ''}. Find \(C\) in pF, to two decimals.`, answer: Cv * 1e12, tol: 0.01, x: T`\(C = \frac{\kappa\varepsilon_0A}{d}\).`, v: `${kap}*8.854e-12*${A}/${d}*1e12` }; }
      if (k === 1) { const a = R.int(1, 4), b = a + R.int(1, 4), Cv = 4 * Math.PI * EPS * a * b / (b - a) * 0.01; // radii in cm
        return { q: T`Concentric spherical shells have radii ${a} cm and ${b} cm. Find the capacitance in pF, to three decimals.`, answer: Cv * 1e12, tol: 0.001, x: T`\(\frac{4\pi\varepsilon_0ab}{b - a}\) with lengths in meters.`, v: `(lambda r: 1/(integrate(1/(4*pi*8.854e-12*r**2), (r, ${a / 100}, ${b / 100}))))(Symbol('r', positive=True))*1e12` }; }
      if (k === 2) { const Cv = R.pick([1, 2, 10, 47, 100]), V = R.pick([3, 5, 9, 12, 24]), ask = R.int(0, 1); return { q: T`A ${Cv} µF capacitor at ${V} V. Find the ${ask ? 'stored energy in mJ' : 'charge in µC'}.`, answer: ask ? 0.5 * Cv * V * V / 1000 : Cv * V, tol: 1e-6, x: T`\(Q = CV\), \(W = \frac12CV^2\).`, v: ask ? `Rational(1, 2)*${Cv}e-6*${V}**2*1000` : `${Cv}*${V}` }; }
      const Q = R.int(1, 9), Rr = R.pick([0.1, 0.05, 0.2]), shell = R.int(0, 1), W = (shell ? 0.5 : 0.6) * K * (Q * 1e-6) ** 2 / Rr;
      return { q: T`Find the electrostatic energy of a ${shell ? 'thin spherical shell' : 'uniformly charged ball'} of radius ${Rr} m and charge ${Q} µC, in J, to four decimals.`, answer: W, tol: Math.max(1e-4, W * 2e-4), x: T`\(W = ${shell ? '\\frac12' : '\\frac35'}\frac{kQ^2}{R}\).`, v: shell ? `(lambda r: 8.854e-12/2*integrate((8.988e9*${Q}e-6/r**2)**2*4*pi*r**2, (r, ${Rr}, oo)))(Symbol('r', positive=True))` : `(lambda r: 8.854e-12/2*(integrate((8.988e9*${Q}e-6*r/${Rr}**3)**2*4*pi*r**2, (r, 0, ${Rr})) + integrate((8.988e9*${Q}e-6/r**2)**2*4*pi*r**2, (r, ${Rr}, oo))))(Symbol('r', positive=True))` };
    } }],
    [U[4]]: [{ id: 'em-bs', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const I = R.int(1, 10), Rr = R.pick([0.05, 0.1, 0.2]), z = R.pick([0, 0.05, 0.1, 0.2]), B = MU * I * Rr * Rr / (2 * (Rr * Rr + z * z) ** 1.5);
        return { q: T`Find \(B\) on the axis of a circular loop (\(R = ${Rr}\) m, \(I = ${I}\) A) at \(z = ${z}\) m, in µT, to three decimals.`, answer: B * 1e6, tol: 0.001, x: T`\(\frac{\mu_0IR^2}{2(R^2 + z^2)^{3/2}}\).`, v: `_mp.quad(lambda t: 1e-7*${I}*${Rr}*${Rr}/(${Rr}**2 + ${z}**2)**1.5, [0, 2*_mp.pi])*1e6` }; }
      if (k === 1) { const I = R.int(1, 20), s = R.pick([0.01, 0.02, 0.05, 0.1]), B = MU * I / (2 * Math.PI * s); return { q: T`Find \(B\) at ${s} m from a long straight wire carrying ${I} A, in µT, to three decimals.`, answer: B * 1e6, tol: 0.001, x: T`\(\frac{\mu_0I}{2\pi s}\).`, v: `_mp.quad(lambda zz: 1e-7*${I}*${s}/(${s}**2 + zz**2)**1.5, [-_mp.inf, _mp.inf])*1e6` }; }
      const n = R.pick([500, 1000, 2000, 5000]), I = R.pick([0.5, 1, 2, 3]), B = MU * n * I; return { q: T`A long solenoid has ${n} turns per meter and carries ${I} A. Find \(B\) inside, in mT, to four decimals.`, answer: B * 1000, tol: 1e-4, x: T`\(\mu_0nI\).`, v: `4*pi*1e-7*${n}*nsimplify(${I})*1000` };
    } }],
    [U[5]]: [{ id: 'em-dip', make(R) {
      const N = R.int(1, 100), I = R.pick([0.1, 0.2, 0.5, 1, 2]), A = R.pick([1e-4, 4e-4, 0.01]), B = R.pick([0.1, 0.5, 1]), th = R.pick([0, 30, 60, 90, 180]), m = N * I * A, ask = R.int(0, 1);
      const v = ask ? -m * B * Math.cos(th * Math.PI / 180) : m * B * Math.sin(th * Math.PI / 180);
      return { q: T`A ${N}-turn coil of area ${A} m\(^2\) carries ${I} A in a ${B} T field, its moment at ${th}° to the field. Find the ${ask ? 'potential energy' : 'torque'} in mJ (or mN m), to four decimals.`, answer: v * 1000, tol: 1e-4, x: T`\(m = NIA = ${R.fmt(m, 6)}\); ${ask ? T`\(U = -mB\cos\theta\)` : T`\(\tau = mB\sin\theta\)`}.`,
        v: `(lambda mv, Bv: ${ask ? '-mv.dot(Bv)' : 'mv.cross(Bv).norm()'}*1000)(Matrix([${m}*cos(${th}*pi/180), ${m}*sin(${th}*pi/180), 0]), Matrix([${B}, 0, 0]))` };
    } }],
    [U[6]]: [{ id: 'em-ind', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const N = R.pick([500, 1000, 2000]), l = R.pick([0.2, 0.5, 1]), r = R.pick([0.01, 0.02, 0.03]), L = MU * (N / l) ** 2 * Math.PI * r * r * l, ask = R.int(0, 1), I = R.int(1, 5);
        return { q: T`A solenoid of length ${l} m, ${N} turns, radius ${r} m. Find ${ask ? `the stored energy at ${I} A, in mJ` : 'its inductance in mH'}, to three decimals.`, answer: ask ? 0.5 * L * I * I * 1000 : L * 1000, tol: 0.001, x: T`\(L = \mu_0n^2A\ell = ${R.fmt(L * 1000, 4)}\) mH${ask ? T`; \(U = \frac12LI^2\)` : ''}.`, v: ask ? `Rational(1, 2)*4*pi*1e-7*(${N}/nsimplify(${l}))**2*pi*${r}**2*${l}*${I}**2*1000` : `4*pi*1e-7*(${N}/nsimplify(${l}))**2*pi*${r}**2*${l}*1000` }; }
      if (k === 1) { const B0 = R.pick([0.1, 0.5, 1]), w = R.pick([10, 50, 100, 377]), A = R.pick([0.01, 0.05, 0.1]), N = R.int(1, 50), peak = N * B0 * A * w;
        return { q: T`A ${N}-turn coil of area ${A} m\(^2\) sits in \(B = ${B0}\sin(${w}t)\) T (field along the axis). Find the peak emf in V, to three decimals.`, answer: peak, tol: 0.001, x: T`\(\mathcal E = -N\frac{d\Phi}{dt} = -NAB_0\omega\cos\omega t\); peak \(NAB_0\omega\).`, v: `(lambda t: (lambda f: float(np.max(np.abs(f(np.linspace(0, 2*np.pi/${w}, 4001))))))(lambdify(t, -${N}*diff(${A}*${B0}*sin(${w}*t), t), 'numpy')))(Symbol('t'))` }; }
      const L = R.pick([0.1, 0.5, 1, 2]), Cc = R.pick([1e-6, 1e-5, 1e-4, 0.25]), w = 1 / Math.sqrt(L * Cc);
      return { q: T`An LC circuit has \(L = ${L}\) H and \(C = ${Cc < 1e-3 ? `${Math.round(Cc * 1e6)}\\) µF` : `${Cc}\\) F`}. Find the angular frequency in rad/s, to three decimals.`, answer: w, tol: Math.max(0.001, w * 1e-6), x: T`\(\omega = \frac{1}{\sqrt{LC}}\).`, v: `1/sqrt(nsimplify(${L})*nsimplify(${Cc}))` };
    } }],
    [U[7]]: [{ id: 'em-wave', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const I = R.pick([100, 500, 1000, 1361, 5000]), E0 = Math.sqrt(2 * I / (C * EPS)); return { q: T`Find the amplitude \(E_0\) (V/m) of a plane wave with intensity ${I} W/m\(^2\), to the nearest V/m.`, answer: E0, tol: 1, x: T`\(E_0 = \sqrt{\frac{2I}{c\varepsilon_0}}\).`, v: `sqrt(2*${I}/(2.998e8*8.854e-12))` }; }
      if (k === 1) { const E0 = R.pick([100, 300, 1000, 50]); return { q: T`Find \(B_0\) in µT for a plane wave with \(E_0 = ${E0}\) V/m, to four decimals.`, answer: E0 / C * 1e6, tol: 1e-4, x: T`\(B_0 = \frac{E_0}{c}\).`, v: `${E0}/2.998e8*1e6` }; }
      if (k === 2) { const I = R.pick([1361, 1000, 100]), refl = R.int(0, 1); return { q: T`Find the radiation pressure (µPa) of a ${I} W/m\(^2\) beam on a perfect ${refl ? 'reflector' : 'absorber'}, to three decimals.`, answer: (refl ? 2 : 1) * I / C * 1e6, tol: 0.001, x: T`\(\frac{${refl ? '2' : ''}I}{c}\).`, v: `${refl ? 2 : 1}*${I}/2.998e8*1e6` }; }
      const th = R.pick([0, 30, 45, 60, 90]); return { q: T`Polarized light passes a polarizer at ${th}° to its polarization. What fraction is transmitted? (Four decimals.)`, answer: Math.cos(th * Math.PI / 180) ** 2, tol: 1e-4, x: T`Malus: \(\cos^2${th}°\).`, v: `cos(${th}*pi/180)**2` };
    } }],
    [U[8]]: [{ id: 'em-rad', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const l1 = R.pick([400, 450, 500]), l2 = R.pick([600, 650, 700, 800]); return { q: T`By what factor does Rayleigh scattering of ${l1} nm light exceed that of ${l2} nm light? (Three decimals.)`, answer: (l2 / l1) ** 4, tol: 0.001, x: T`\(\left(\frac{${l2}}{${l1}}\right)^4\).`, v: `Rational(${l2}, ${l1})**4` }; }
      if (k === 1) { const a = R.pick([1e17, 1e18, 1e20]), P = QE * QE * a * a / (6 * Math.PI * EPS * C ** 3), aT = `10^{${Math.round(Math.log10(a))}}`; return { q: T`An electron accelerates at \(${aT}\) m/s\(^2\). Find the Larmor power in units of \(10^{-18}\) W, to three decimals.`, answer: P * 1e18, tol: Math.max(0.001, P * 1e18 * 1e-5), x: T`\(P = \frac{e^2a^2}{6\pi\varepsilon_0c^3}\).`, v: `(1.602e-19)**2*(${a})**2/(6*pi*8.854e-12*(2.998e8)**3)*1e18` }; }
      const f = R.pick([2, 3, 0.5]), what = R.int(0, 1); return { q: T`An oscillating dipole's ${what ? 'amplitude \\(p_0\\)' : 'frequency \\(\\omega\\)'} is multiplied by ${f}. By what factor does the radiated power change? (Four decimals.)`, answer: what ? f * f : f ** 4, tol: 1e-4, x: T`\(\langle P\rangle \propto p_0^2\omega^4\).`, v: what ? `nsimplify(${f})**2` : `nsimplify(${f})**4` };
    } }],
    [U[9]]: [{ id: 'em-cyc', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const part = R.pick([['proton', 1.673e-27], ['electron', ME], ['alpha particle', 6.645e-27]]), qn = part[0] === 'alpha particle' ? 2 : 1, v = R.pick([1e5, 1e6, 5e6]), B = R.pick([0.1, 0.5, 1, 2]), r = part[1] * v / (qn * QE * B);
        return { q: T`A ${part[0]} moves at \(${v === 5e6 ? '5\\times10^{6}' : `10^{${Math.round(Math.log10(v))}}`}\) m/s perpendicular to a ${B} T field. Find the radius in mm, to three decimals.`, answer: r * 1000, tol: Math.max(0.001, r * 1000 * 1e-5), x: T`\(r = \frac{mv}{qB}\).`, v: `${part[1]}*${v}/(${qn}*1.602e-19*${B})*1000` }; }
      if (k === 1) { const B = R.pick([0.1, 0.5, 1, 1.5]); return { q: T`Find the electron cyclotron frequency \(f = \frac{eB}{2\pi m_e}\) in GHz for \(B = ${B}\) T, to three decimals.`, answer: QE * B / (2 * Math.PI * ME) / 1e9, tol: 0.001, x: T`\(\omega_c = \frac{eB}{m_e}\), \(f = \frac{\omega_c}{2\pi}\).`, v: `1.602e-19*${B}/(2*pi*9.109e-31)/1e9` }; }
      const E = R.pick([1000, 5000, 2e4]), B = R.pick([0.05, 0.1, 0.5]); return { q: T`Crossed fields \(E = ${E}\) V/m and \(B = ${B}\) T. Find the drift speed in m/s.`, answer: E / B, tol: 1e-6, x: T`\(v = \frac EB\), independent of charge and mass.`, v: `(lambda Ev, Bv: (Ev.cross(Bv)/Bv.dot(Bv)).norm())(Matrix([${E}, 0, 0]), Matrix([0, nsimplify(${B}), 0]))` };
    } }]
  } });
})();
