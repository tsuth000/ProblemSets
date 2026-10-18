'use strict';
// Theoretical physics track: General relativity. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'gr', name: 'General relativity', color: '#2B2B2B', blurb: 'The equivalence principle, metrics and tensors, curvature, Einstein\u2019s equations, Schwarzschild spacetime, orbits and light bending, black holes, gravitational waves, cosmology', questions: [], generators: [] });
  const U = ['The equivalence principle', 'Metrics and tensors', 'Curvature', 'Einstein\u2019s field equations', 'The Schwarzschild solution', 'Orbits and light bending', 'Black holes', 'Gravitational waves', 'Cosmology'];
  const G = 6.674e-11, C = 2.998e8, MS = 1.989e30, HB = 1.054571817e-34, KB = 1.380649e-23;

  registerLearn('gr', [
    { title: U[0], skill: U[0],
      hook: T`<p>In a closed elevator you cannot tell whether you are at rest on Earth or accelerating in empty space. Einstein built general relativity on that observation: gravity is not a force but the shape of spacetime.</p>`,
      body: T`
<p><b>Equivalence principle.</b> Gravitational and inertial mass are equal (tested to parts in \(10^{15}\)), so all bodies fall the same way. Locally, a freely falling frame is inertial: gravity can be removed at a point, but tidal effects remain.</p>
<p><b>Gravitational redshift.</b> Light climbing a height \(h\) in a field \(g\) loses frequency:</p>
\[\frac{\Delta f}{f} \approx \frac{gh}{c^2}\]
<p>Pound and Rebka measured \(2.5\times10^{-15}\) over 22.5 m in 1959. More generally clocks run at rates \(\sqrt{1 + 2\Phi/c^2}\), so clocks deeper in a potential run slower.</p>
<p><b>GPS.</b> Satellites at 20,200 km altitude feel a weaker potential: their clocks gain about 45.7 µs per day from gravity and lose about 7.2 µs per day from orbital speed (special relativity), a net gain of about 38.5 µs/day. Uncorrected, positions would drift about 11 km per day.</p>
<p><b>Light bends</b> in an accelerating elevator, so it must bend in gravity too. The equivalence argument gives half the true deflection; the other half comes from the curvature of space.</p>
<p><b>Weak-field metric.</b> \(ds^2 = -\left(1 + \frac{2\Phi}{c^2}\right)c^2dt^2 + \left(1 - \frac{2\Phi}{c^2}\right)d\mathbf x^2\), with \(\Phi\) the Newtonian potential. At Earth's surface \(\frac{|\Phi|}{c^2} \approx 7\times10^{-10}\).</p>`,
      ex: { q: T`Find the fractional frequency shift for light rising 100 m at Earth's surface.`, a: T`<p>\(\frac{gh}{c^2} = \frac{9.81\cdot100}{(2.998\times10^8)^2} \approx 1.09\times10^{-14}\).</p>` },
      trap: T`Expecting a higher clock to run slow. Clocks higher in the potential run fast.`,
      vary: [[T`Net GPS clock gain per day (µs), one decimal.`, 38.5, T`45.7 − 7.2.`], [T`\(\frac{gh}{c^2}\) for 22.5 m, in units of \(10^{-15}\), two decimals.`, 9.81 * 22.5 / (C * C) * 1e15, T`Pound–Rebka.`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>The metric tensor tells you how to measure intervals in a curved spacetime. Tensors are the objects whose equations hold in every coordinate system, which is what general covariance requires.</p>`,
      body: T`
<p><b>Line element</b> \(ds^2 = g_{\mu\nu}dx^\mu dx^\nu\) (sum over repeated indices, \(\mu, \nu = 0, \ldots, 3\)). Flat spacetime: \(\eta = \text{diag}(-1, 1, 1, 1)\) with \(x^0 = ct\).</p>
<p><b>Proper time</b> along a worldline: \(c\,d\tau = \sqrt{-ds^2}\). <b>Proper distance</b> between simultaneous events: \(\sqrt{ds^2}\).</p>
<p><b>Raising and lowering:</b> \(v_\mu = g_{\mu\nu}v^\nu\), \(v^\mu = g^{\mu\nu}v_\nu\), with \(g^{\mu\nu}\) the inverse matrix. Contractions like \(v^\mu v_\mu\) are scalars, the same in all coordinates.</p>
<p><b>Example.</b> Polar coordinates on the plane: \(ds^2 = dr^2 + r^2d\phi^2\), \(g = \text{diag}(1, r^2)\). A displacement \((dr, d\phi) = (0.1, 0.05)\) at \(r = 2\) has \(ds^2 = 0.01 + 4(0.0025) = 0.02\).</p>
<p><b>Transformation law.</b> Under a change of coordinates, \(g'_{\alpha\beta} = \frac{\partial x^\mu}{\partial x'^\alpha}\frac{\partial x^\nu}{\partial x'^\beta}g_{\mu\nu}\). A tensor equation true in one frame is true in all.</p>
<p><b>Covariant derivative</b> \(\nabla_\mu v^\nu = \partial_\mu v^\nu + \Gamma^\nu_{\mu\lambda}v^\lambda\) corrects for the changing basis vectors. Christoffel symbols \(\Gamma^\lambda_{\mu\nu} = \frac12g^{\lambda\sigma}(\partial_\mu g_{\nu\sigma} + \partial_\nu g_{\mu\sigma} - \partial_\sigma g_{\mu\nu})\) are not tensors: they vanish in a local inertial frame.</p>`,
      ex: { q: T`On the unit 2-sphere, \(ds^2 = d\theta^2 + \sin^2\theta\,d\phi^2\). Find the length of the circle \(\theta = \frac\pi3\).`, a: T`<p>\(d\theta = 0\): \(ds = \sin\frac\pi3\,d\phi\). Length \(2\pi\sin\frac\pi3 = \pi\sqrt3 \approx 5.441\).</p>` },
      trap: T`Forgetting that \(g^{\mu\nu}\) is the matrix inverse, not the reciprocal of each component (they agree only for diagonal metrics).`,
      vary: [[T`\(\eta_{\mu\nu}v^\mu v^\nu\) for \(v = (2, 1, 0, 0)\)?`, -3, T`\(-4 + 1\).`], [T`\(g^{\phi\phi}\) at \(r = 2\) in polar coordinates?`, 0.25, T`\(\frac{1}{r^2}\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Curvature is what prevents a vector carried around a closed loop from returning to itself. The Riemann tensor measures it; contracting gives the Ricci tensor and scalar that enter Einstein's equations.</p>`,
      body: T`
<p><b>Riemann tensor</b>: \(R^\rho{}_{\sigma\mu\nu} = \partial_\mu\Gamma^\rho_{\nu\sigma} - \partial_\nu\Gamma^\rho_{\mu\sigma} + \Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma} - \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}\). It vanishes identically iff the space is flat.</p>
<p><b>Contractions.</b> Ricci tensor \(R_{\sigma\nu} = R^\rho{}_{\sigma\rho\nu}\); Ricci scalar \(R = g^{\sigma\nu}R_{\sigma\nu}\).</p>
<p><b>Two dimensions.</b> All curvature is in one number: \(R = 2K\), twice the Gaussian curvature. Sphere of radius \(a\): \(R = \frac{2}{a^2}\). Hyperbolic plane of radius \(a\): \(R = -\frac{2}{a^2}\). An \(n\)-sphere of radius \(a\): \(R = \frac{n(n - 1)}{a^2}\).</p>
<p><b>Parallel transport.</b> Carry a vector around a geodesic triangle on a sphere: it returns rotated by the enclosed curvature, \(\int K\,dA\) (the angle excess). The triangle with three right angles rotates a vector by \(\frac\pi2\).</p>
<p><b>Geodesic deviation.</b> Nearby free-falling particles accelerate apart or together at a rate set by the Riemann tensor: these are tidal forces, and they are the coordinate-independent signature of gravity.</p>
<p><b>Counting.</b> In \(n\) dimensions the Riemann tensor has \(\frac{n^2(n^2 - 1)}{12}\) independent components: 1 in 2D, 6 in 3D, 20 in 4D.</p>`,
      ex: { q: T`Find the Ricci scalar of a 3-sphere of radius 2.`, a: T`<p>\(\frac{n(n - 1)}{a^2} = \frac{3\cdot2}{4} = 1.5\).</p>` },
      trap: T`Expecting the Ricci tensor to vanish whenever spacetime is curved. Outside a star \(R_{\mu\nu} = 0\) while Riemann does not vanish.`,
      vary: [[T`Riemann components in 4D?`, 20, T`\(\frac{16\cdot15}{12}\).`], [T`Ricci scalar of a sphere of radius 1?`, 2, T`\(2K\).`], [T`Ricci scalar of a flat plane in polar coordinates?`, 0, T`Flat.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>"Spacetime tells matter how to move; matter tells spacetime how to curve" (Wheeler). Einstein's field equations make the second half precise.</p>`,
      body: T`
\[G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu},\qquad G_{\mu\nu} = R_{\mu\nu} - \tfrac12Rg_{\mu\nu}\]
<p>\(T_{\mu\nu}\) is the stress–energy tensor (energy density, momentum flux, pressure). The coupling \(\frac{8\pi G}{c^4} \approx 2.08\times10^{-43}\) s\(^2\)/(kg m) is tiny: enormous energy densities produce modest curvature.</p>
<p><b>Why this form.</b> \(\nabla^\mu G_{\mu\nu} = 0\) identically (the Bianchi identity), matching local energy–momentum conservation \(\nabla^\mu T_{\mu\nu} = 0\).</p>
<p><b>Newtonian limit.</b> For slow motion and weak fields, the \(00\) component reduces to Poisson's equation \(\nabla^2\Phi = 4\pi G\rho\).</p>
<p><b>Trace-reversed form.</b> \(R_{\mu\nu} = \frac{8\pi G}{c^4}\left(T_{\mu\nu} - \frac12Tg_{\mu\nu}\right)\) (with \(\Lambda = 0\)). In vacuum, \(R_{\mu\nu} = 0\).</p>
<p><b>Cosmological constant</b> \(\Lambda\) acts like a vacuum energy with negative pressure; the observed value, about \(1.1\times10^{-52}\) m\(^{-2}\), drives the accelerating expansion.</p>
<p><b>Counting.</b> Ten equations (\(G\) is symmetric) for ten metric components, minus four coordinate freedoms and four Bianchi constraints.</p>`,
      ex: { q: T`What does \(R_{\mu\nu} = 0\) say about spacetime outside a spherical star?`, a: T`<p>It is the vacuum equation; with spherical symmetry its unique solution is the Schwarzschild metric (Birkhoff's theorem), whatever the star's internal structure.</p>` },
      trap: T`Thinking vacuum means flat. Vacuum means Ricci-flat; tidal (Weyl) curvature remains.`,
      vary: [[T`Number of independent components of a symmetric \(4\times4\) tensor?`, 10, T`\(\frac{4\cdot5}{2}\).`], [T`\(8\pi G/c^4\) in units of \(10^{-43}\), three decimals.`, 8 * Math.PI * G / C ** 4 * 1e43, T`\(2.076\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>The first exact solution of Einstein's equations, found by Schwarzschild in 1916, describes spacetime outside any spherical mass. Its characteristic radius marks where light can no longer escape.</p>`,
      body: T`
\[\begin{aligned}ds^2 = {}&-\left(1 - \frac{r_s}{r}\right)c^2dt^2\\ &+ \frac{dr^2}{1 - r_s/r} + r^2d\Omega^2\end{aligned}\]
<p>with \(r_s = \frac{2GM}{c^2}\).</p>
<p><b>Schwarzschild radius:</b> 2.95 km for the Sun, 8.87 mm for the Earth.</p>
<p><b>Time dilation.</b> A static clock at \(r\) ticks at \(\sqrt{1 - \frac{r_s}{r}}\) times the rate of a clock far away. At \(r = 2r_s\), 0.707.</p>
<p><b>Special radii:</b></p>
<table class="tt"><tr><th>Radius</th><th>Meaning</th></tr>
<tr><td>\(r_s\)</td><td>event horizon</td></tr>
<tr><td>\(1.5r_s\)</td><td>photon sphere (unstable circular light orbits)</td></tr>
<tr><td>\(3r_s\)</td><td>innermost stable circular orbit (ISCO)</td></tr></table>
<p><b>Coordinate versus physical.</b> The metric blows up at \(r = r_s\) only because of the coordinates; a free-falling observer crosses it in finite proper time. The real singularity is at \(r = 0\).</p>
<p><b>Proper distance</b> outward from \(r_1\) to \(r_2\) exceeds \(r_2 - r_1\): \(\int\frac{dr}{\sqrt{1 - r_s/r}}\). Space is stretched radially near the mass.</p>`,
      ex: { q: T`Find \(r_s\) for a 10 solar-mass black hole and the clock rate factor at \(r = 4r_s\).`, a: T`<p>\(r_s = 10\times2.954 = 29.5\) km. Rate \(\sqrt{1 - \frac14} = 0.866\).</p>` },
      trap: T`Calling \(r_s\) a physical singularity. Curvature invariants are finite there.`,
      vary: [[T`Clock rate factor at \(r = 2r_s\), four decimals.`, Math.SQRT1_2, T`\(\sqrt{1/2}\).`], [T`ISCO radius in units of \(r_s\)?`, 3, T`\(6GM/c^2\).`], [T`Photon sphere in units of \(r_s\)?`, 1.5, T`\(3GM/c^2\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Two of the classic tests of general relativity are small corrections to Newton: Mercury's orbit slowly rotates, and starlight bends twice as much as a Newtonian estimate predicts.</p>`,
      body: T`
<p><b>Perihelion precession</b> per orbit:</p>
\[\Delta\phi = \frac{6\pi GM}{c^2a(1 - e^2)}\]
<p>Mercury (\(a = 5.79\times10^{10}\) m, \(e = 0.2056\)): \(5.02\times10^{-7}\) rad per orbit; with 415 orbits per century, about 43 arcseconds per century, exactly the anomaly Newtonian perturbations could not explain.</p>
<p><b>Light deflection</b> by a mass \(M\) at impact parameter \(b\):</p>
\[\delta = \frac{4GM}{c^2b} = \frac{2r_s}{b}\]
<p>At the Sun's limb, \(1.75''\), confirmed by Eddington's 1919 eclipse expedition. The Newtonian (or equivalence-principle) value is half this.</p>
<p><b>Shapiro delay.</b> Radar signals passing the Sun are delayed by up to about 200 µs, measured to \(10^{-5}\) precision by Cassini.</p>
<p><b>Gravitational lensing.</b> Perfect alignment produces an Einstein ring of angular radius \(\theta_E = \sqrt{\frac{4GM}{c^2}\frac{D_{LS}}{D_LD_S}}\); lensing weighs galaxy clusters and revealed dark matter.</p>
<p><b>Effective potential.</b> For orbits, \(V_{\text{eff}} = -\frac{GM}{r} + \frac{L^2}{2r^2} - \frac{GML^2}{c^2r^3}\): the last term, absent in Newton, causes the precession and the ISCO.</p>`,
      ex: { q: T`Find the deflection of light grazing a white dwarf (\(M = 0.6M_\odot\), \(R = 7000\) km), in arcseconds.`, a: T`<p>\(\frac{4GM}{c^2R} = \frac{4(6.674\times10^{-11})(1.193\times10^{30})}{(2.998\times10^8)^2(7\times10^6)} \approx 5.06\times10^{-4}\) rad \(\approx 104''\).</p>` },
      trap: T`Using the Newtonian deflection \(\frac{2GM}{c^2b}\). General relativity doubles it.`,
      vary: [[T`Sun-limb deflection (arcseconds), two decimals.`, 4 * G * MS / (C * C * 6.957e8) * 206264.806, T`\(1.75''\).`], [T`Ratio of GR to Newtonian deflection?`, 2, T`Space curvature doubles it.`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>A black hole is a region from which nothing escapes. Classically it is perfectly black; quantum mechanically, Hawking showed it glows with a temperature inversely proportional to its mass and slowly evaporates.</p>`,
      body: T`
<p><b>Horizon area</b> \(A = 4\pi r_s^2 = \frac{16\pi G^2M^2}{c^4}\). In classical processes it never decreases (Hawking's area theorem), like entropy.</p>
<p><b>Hawking temperature:</b></p>
\[T_H = \frac{\hbar c^3}{8\pi GMk_B} \approx 6.17\times10^{-8}\text{ K}\cdot\frac{M_\odot}{M}\]
<p>Stellar black holes are far colder than the 2.7 K cosmic background, so today they absorb more than they emit.</p>
<p><b>Bekenstein–Hawking entropy:</b> \(S = \frac{k_Bc^3A}{4G\hbar} = \frac{k_BA}{4\ell_P^2}\), one quarter of the area in Planck units: about \(10^{77}k_B\) for a solar mass, vastly more than the star that formed it.</p>
<p><b>Evaporation time</b> \(t \approx \frac{5120\pi G^2M^3}{\hbar c^4}\), about \(2\times10^{67}\) years for a solar mass. Primordial holes near \(10^{11}\) kg would be finishing now.</p>
<p><b>Rotating (Kerr) black holes</b> have spin parameter \(a = \frac{J}{Mc} \le \frac{GM}{c^2}\); the ergosphere lets energy be extracted (the Penrose process). No-hair theorem: an isolated black hole is described by mass, spin, and charge only.</p>`,
      ex: { q: T`Find the Hawking temperature of a black hole of mass \(10^{12}\) kg.`, a: T`<p>\(T = \frac{(1.055\times10^{-34})(2.998\times10^8)^3}{8\pi(6.674\times10^{-11})(10^{12})(1.381\times10^{-23})} \approx 1.23\times10^{11}\) K: tiny black holes are extremely hot.</p>` },
      trap: T`Expecting heavier black holes to be hotter. Temperature falls as \(\frac1M\).`,
      vary: [[T`Factor change in \(T_H\) if \(M\) doubles?`, 0.5, T`\(\frac1M\).`], [T`Factor change in horizon area if \(M\) doubles?`, 4, T`\(M^2\).`], [T`Factor change in evaporation time if \(M\) doubles?`, 8, T`\(M^3\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Accelerating masses send ripples through spacetime at the speed of light. LIGO detected them in 2015 from two black holes merging 1.3 billion light-years away, by measuring a length change a thousandth the size of a proton.</p>`,
      body: T`
<p><b>Linearized gravity.</b> Writing \(g = \eta + h\) with small \(h\), the vacuum equations in a suitable gauge become a wave equation \(\Box h_{\mu\nu} = 0\): waves at speed \(c\) with two polarizations, \(+\) and \(\times\).</p>
<p><b>Strain.</b> A wave of amplitude \(h\) changes a length \(L\) by \(\Delta L = \frac12hL\). For LIGO (4 km arms) and \(h = 10^{-21}\): \(\Delta L = 2\times10^{-18}\) m.</p>
<p><b>Frequency.</b> A binary radiates mainly at twice its orbital frequency (the quadrupole pattern repeats every half orbit). As the orbit shrinks the frequency and amplitude rise: the chirp.</p>
<p><b>Quadrupole formula.</b> Gravitational radiation is quadrupolar (there is no dipole, by momentum conservation). For a circular binary of masses \(m_1, m_2\) at separation \(a\):</p>
\[P = \frac{32G^4}{5c^5}\frac{(m_1m_2)^2(m_1 + m_2)}{a^5}\]
<p>The Hulse–Taylor pulsar's orbital decay matches this to 0.2%, the first (indirect) detection.</p>
<p><b>GW170817</b>, a neutron star merger seen in light 1.7 s after the waves, showed gravitational waves travel at \(c\) to one part in \(10^{15}\).</p>`,
      ex: { q: T`A binary has orbital period 0.02 s. At what frequency does it radiate gravitational waves?`, a: T`<p>Orbital frequency 50 Hz, so 100 Hz.</p>` },
      trap: T`Equating the gravitational-wave frequency with the orbital frequency. It is twice that.`,
      vary: [[T`\(\Delta L\) (units \(10^{-18}\) m) for \(h = 10^{-21}\) on a 4 km arm?`, 2, T`\(\frac12hL\).`], [T`GW frequency (Hz) for an orbit at 30 Hz?`, 60, T`Twice.`], [T`Factor change in quadrupole power if separation halves?`, 32, T`\(a^{-5}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Applied to the whole universe, general relativity predicts that space itself expands. The Hubble law, the cosmic microwave background, and the age of the universe all follow from one equation for the scale factor.</p>`,
      body: T`
<p><b>FLRW metric</b> (flat case): \(ds^2 = -c^2dt^2 + a(t)^2d\mathbf x^2\). Physical distances scale with \(a(t)\); light stretches with it: \(1 + z = \frac{a_{\text{now}}}{a_{\text{then}}}\).</p>
<p><b>Hubble's law:</b> \(v = H_0d\), \(H = \frac{\dot a}{a}\). With \(H_0 = 70\) km/s/Mpc, a galaxy 100 Mpc away recedes at 7000 km/s. The Hubble time \(\frac{1}{H_0} \approx 14.0\) billion years estimates the age.</p>
<p><b>Friedmann equation:</b></p>
\[H^2 = \frac{8\pi G}{3}\rho - \frac{kc^2}{a^2} + \frac{\Lambda c^2}{3}\]
<p><b>Critical density</b> \(\rho_c = \frac{3H^2}{8\pi G} \approx 9.2\times10^{-27}\) kg/m\(^3\) for \(H_0 = 70\): about 5.5 hydrogen atoms per cubic meter. Observations give a flat universe with roughly 31% matter and 69% dark energy.</p>
<p><b>Scaling.</b> Matter density \(\propto a^{-3}\), radiation \(\propto a^{-4}\) (also redshifted), and \(\Lambda\) constant. A matter-only flat universe has \(a \propto t^{2/3}\) and age \(\frac{2}{3H_0}\).</p>
<p><b>CMB.</b> Released at \(z \approx 1100\) when the universe was about 3000 K, now cooled to \(\frac{3000}{1101} \approx 2.725\) K.</p>`,
      ex: { q: T`Light from a quasar left when the universe was \(\frac14\) its present size. Find \(z\).`, a: T`<p>\(1 + z = 4\), so \(z = 3\).</p>` },
      trap: T`Reading redshift as a Doppler speed for distant galaxies. It measures how much space expanded while the light traveled.`,
      vary: [[T`Recession speed (km/s) at 50 Mpc with \(H_0 = 70\)?`, 3500, T`\(70\cdot50\).`], [T`Scale factor (relative to now) at \(z = 1\)?`, 0.5, T`\(\frac{1}{1 + z}\).`], [T`Factor by which radiation energy density exceeds its present value at \(z = 1\)?`, 16, T`\((1 + z)^4\).`]] }
  ]);

  addQuestions('gr', [
    { id: 'gr1', skill: U[0], q: T`A clock on a mountain, compared with one at sea level, runs:`, c: ['fast', 'slow', 'at the same rate', 'backward'], x: T`Higher potential, faster rate.` },
    { id: 'gr2', skill: U[2], q: T`In two dimensions the Ricci scalar equals:`, c: ['twice the Gaussian curvature', 'the Gaussian curvature', 'zero always', 'the mean curvature'], x: T`\(R = 2K\).` },
    { id: 'gr3', skill: U[3], q: T`Einstein's vacuum equations (with \(\Lambda = 0\)) are:`, c: [T`\(R_{\mu\nu} = 0\)`, T`\(R^\rho{}_{\sigma\mu\nu} = 0\)`, T`\(g_{\mu\nu} = \eta_{\mu\nu}\)`, T`\(T_{\mu\nu} = g_{\mu\nu}\)`], x: T`Ricci-flat, not necessarily flat.` },
    { id: 'gr4', skill: U[4], q: T`At the Schwarzschild radius, a freely falling observer:`, c: ['crosses it in finite proper time and notices nothing special locally', 'is stopped forever', 'is torn apart at once', 'travels back in time'], x: T`It is a coordinate singularity.` },
    { id: 'gr5', skill: U[6], q: T`Hawking temperature is:`, c: ['inversely proportional to the mass', 'proportional to the mass', 'independent of the mass', 'proportional to the area'], x: T`\(T \propto \frac1M\).` },
    { id: 'gr6', skill: U[7], q: T`Gravitational radiation has no dipole term because of conservation of:`, c: ['momentum', 'energy', 'charge', 'angular momentum'], x: T`The mass dipole's second derivative is the total momentum's first derivative, which vanishes.` }
  ]);

  // ======================= GENERATORS =======================
  registerUnitGens('gr', { units: {
    [U[0]]: [{ id: 'gr-ep', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const h = R.pick([22.5, 100, 443, 1000]), v = 9.81 * h / (C * C) * 1e15; return { q: T`Find the gravitational frequency shift \(\frac{gh}{c^2}\) for a height of ${h} m, in units of \(10^{-15}\), to three decimals.`, answer: v, tol: Math.max(0.001, v * 3e-3), x: T`\(\frac{9.81\cdot${h}}{(2.998\times10^8)^2}\).`, v: `(lambda R0: integrate(9.81*R0**2/Symbol('r')**2, (Symbol('r'), R0, R0 + ${h}))/2.998e8**2*1e15)(6.371e6)` }; }
      const h = R.pick([20200, 35786, 400]), M = 5.972e24, Re = 6.371e6, r = Re + h * 1000, gr = G * M / (C * C) * (1 / Re - 1 / r) * 86400 * 1e6, vs = G * M / r, sr = -vs / (2 * C * C) * 86400 * 1e6, ask = R.int(0, 2), val = [gr, sr, gr + sr][ask];
      return { q: T`A satellite orbits at ${h} km altitude. Find the ${['gravitational', 'velocity (special-relativistic)', 'net'][ask]} clock-rate effect relative to the ground, in µs per day (ignore Earth's rotation), to two decimals.`, answer: val, tol: 0.01, x: T`Gravity: \(\frac{GM}{c^2}\left(\frac{1}{R_E} - \frac1r\right) = ${R.fmt(gr, 3)}\) µs/day. Speed: \(-\frac{v^2}{2c^2}\) with \(v^2 = \frac{GM}{r}\): \(${R.fmt(sr, 3)}\) µs/day.`, v: `(lambda r: (${['(1 - 2*6.674e-11*5.972e24/(2.998e8**2*r))**0.5/(1 - 2*6.674e-11*5.972e24/(2.998e8**2*6.371e6))**0.5 - 1', '(1 - 6.674e-11*5.972e24/(r*2.998e8**2))**0.5 - 1', '(1 - 2*6.674e-11*5.972e24/(2.998e8**2*r) - 6.674e-11*5.972e24/(r*2.998e8**2))**0.5/(1 - 2*6.674e-11*5.972e24/(2.998e8**2*6.371e6))**0.5 - 1'][ask]})*86400e6)(${r})` };
    } }],
    [U[1]]: [{ id: 'gr-met', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const v = [R.int(1, 4), R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)], s = -(v[0] ** 2) + v[1] ** 2 + v[2] ** 2 + v[3] ** 2; return { q: T`Compute \(\eta_{\mu\nu}v^\mu v^\nu\) for \(v = (${v.join(', ')})\) with \(\eta = \text{diag}(-1, 1, 1, 1)\).`, answer: s, x: T`\(-${v[0] ** 2} + ${v[1] ** 2} + ${v[2] ** 2} + ${v[3] ** 2} = ${s}\). ${s < 0 ? 'Timelike.' : s === 0 ? 'Null.' : 'Spacelike.'}`, v: `(Matrix([${v}]).T*diag(-1, 1, 1, 1)*Matrix([${v}]))[0]` }; }
      const th = R.pick([30, 45, 60, 90]), a = R.int(1, 5); return { q: T`On a sphere of radius ${a}, \(ds^2 = ${a * a}(d\theta^2 + \sin^2\theta\,d\phi^2)\). Find the length of the circle \(\theta = ${th}°\), to four decimals.`, answer: 2 * Math.PI * a * Math.sin(th * Math.PI / 180), tol: 1e-4, x: T`\(\int_0^{2\pi}${a}\sin${th}°\,d\phi\).`, v: `integrate(sqrt(${a * a}*sin(${th}*pi/180)**2), (Symbol('p'), 0, 2*pi))` };
    } }],
    [U[2]]: [{ id: 'gr-curv', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const a = R.int(1, 4), typ = R.pick(['sphere', 'hyperbolic']), val = (typ === 'sphere' ? 2 : -2) / (a * a); return { q: T`Find the Ricci scalar of the 2D metric \(ds^2 = dr^2 + ${typ === 'sphere' ? `${a * a}\\sin^2(r/${a})` : `${a * a}\\sinh^2(r/${a})`}\,d\phi^2\), to four decimals.`, answer: val, tol: 1e-4, x: T`This is a ${typ === 'sphere' ? 'sphere' : 'hyperbolic plane'} of radius ${a}: \(R = 2K = ${typ === 'sphere' ? '' : '-'}\frac{2}{${a * a}}\).`, v: `ricci_scalar(Matrix([[1, 0], [0, ${a * a}*${typ === 'sphere' ? 'sin' : 'sinh'}(Symbol('r', positive=True)/${a})**2]]), [Symbol('r', positive=True), Symbol('p')])` }; }
      if (k === 1) { const n = R.int(2, 5), a = R.int(1, 3); return { q: T`Find the Ricci scalar of an \(${n}\)-sphere of radius ${a}, to four decimals.`, answer: n * (n - 1) / (a * a), tol: 1e-4, x: T`\(\frac{n(n - 1)}{a^2} = \frac{${n * (n - 1)}}{${a * a}}\).`, v: n <= 3 ? `ricci_scalar(${n === 2 ? `Matrix([[${a * a}, 0], [0, ${a * a}*sin(Symbol('t1'))**2]])` : `diag(${a * a}, ${a * a}*sin(Symbol('t1'))**2, ${a * a}*sin(Symbol('t1'))**2*sin(Symbol('t2'))**2)`}, [${n === 2 ? "Symbol('t1'), Symbol('t2')" : "Symbol('t1'), Symbol('t2'), Symbol('t3')"}])` : `Rational(${n * (n - 1)}, ${a * a})` }; }
      const n = R.int(2, 5); return { q: T`How many independent components does the Riemann tensor have in ${n} dimensions?`, answer: n * n * (n * n - 1) / 12, x: T`\(\frac{n^2(n^2 - 1)}{12}\).`, v: `${n}**2*(${n}**2 - 1)//12` };
    } }],
    [U[3]]: [{ id: 'gr-efe', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const n = R.int(2, 6); return { q: T`How many independent components does a symmetric tensor have in ${n} dimensions (the number of Einstein equations there)?`, answer: n * (n + 1) / 2, x: T`\(\frac{n(n + 1)}{2}\).`, v: `len([(i, j) for i in range(${n}) for j in range(i, ${n})])` }; }
      const [rho, rt] = R.pick([[1000, '1000'], [5500, '5500'], [1e-26, '10^{-26}'], [1e17, '10^{17}']]), M = G * 4 * Math.PI * rho, ex = Math.floor(Math.log10(M)); return { q: T`For uniform density \(\rho = ${rt}\) kg/m\(^3\), Poisson's equation gives \(\nabla^2\Phi = 4\pi G\rho\). Find \(\nabla^2\Phi\) in s\(^{-2}\) as a coefficient times \(10^{${ex}}\), to three decimals.`, answer: M / 10 ** ex, tol: 0.001, x: T`\(4\pi(6.674\times10^{-11})\rho\).`, v: `4*pi*6.674e-11*${rho}/10**${ex}` };
    } }],
    [U[4]]: [{ id: 'gr-schw', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const m = R.pick([1, 10, 4.3e6, 0.5, 30, 6.5e9]); const rs = 2 * G * m * MS / (C * C) / 1000; return { q: T`Find the Schwarzschild radius in km for a mass of ${m >= 1e6 ? `\\(${(m / 10 ** Math.floor(Math.log10(m))).toFixed(1)}\\times10^{${Math.floor(Math.log10(m))}}\\)` : m} solar masses, to three significant figures.`, answer: rs, tol: rs * 2e-3, x: T`\(r_s = \frac{2GM}{c^2} \approx 2.954\) km per solar mass.`, v: `2*6.674e-11*${m}*1.989e30/2.998e8**2/1000` }; }
      if (k === 1) { const x = R.pick([1.5, 2, 3, 4, 10]); return { q: T`Find the rate of a static clock at \(r = ${x}r_s\) relative to one far away, to four decimals.`, answer: Math.sqrt(1 - 1 / x), tol: 1e-4, x: T`\(\sqrt{1 - \frac{1}{${x}}}\).`, v: `sqrt(1 - 1/nsimplify(${x}))` }; }
      const m = R.pick([1, 10, 4.3e6]), which = R.int(0, 1), rs = 2 * G * m * MS / (C * C) / 1000; return { q: T`Find the ${which ? 'photon sphere' : 'ISCO'} radius in km around ${m >= 1e6 ? `\\(${(m / 10 ** Math.floor(Math.log10(m))).toFixed(1)}\\times10^{${Math.floor(Math.log10(m))}}\\)` : m} solar masses, to three significant figures.`, answer: (which ? 1.5 : 3) * rs, tol: (which ? 1.5 : 3) * rs * 2e-3, x: T`${which ? '\\(1.5r_s\\)' : '\\(3r_s\\)'} with \(r_s = ${R.fmt(rs, 4)}\) km.`, v: which ? `(lambda r: [s for s in solve(diff((1 - 1/r)/r**2, r), r) if s > 0][0])(Symbol('r', positive=True))*2*6.674e-11*${m}*1.989e30/2.998e8**2/1000` : `3*2*6.674e-11*${m}*1.989e30/2.998e8**2/1000` };
    } }],
    [U[5]]: [{ id: 'gr-orb', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const B = [['the Sun at its limb', 1, 6.957e8], ['a white dwarf (0.6 \\(M_\\odot\\), 7000 km)', 0.6, 7e6], ['a neutron star (1.4 \\(M_\\odot\\), 12 km)', 1.4, 1.2e4], ['Jupiter (\\(9.55\\times10^{-4}M_\\odot\\), 71,500 km)', 9.55e-4, 7.15e7]], [name, m, b] = R.pick(B), d = 4 * G * m * MS / (C * C * b), ask = R.int(0, 1);
        if (m === 1.4) return { q: T`Find the light deflection (radians) for a ray grazing ${name}, using the weak-field formula, to four decimals.`, answer: d, tol: 1e-4, x: T`\(\frac{4GM}{c^2b}\); here the weak-field result is only rough, since the field is strong.`, v: `4*6.674e-11*${m}*1.989e30/(2.998e8**2*${b})` };
        return { q: T`Find the deflection of light grazing ${name}, in arcseconds, to three decimals.`, answer: d * 206264.806, tol: 0.001, x: T`\(\frac{4GM}{c^2b}\) radians, times 206,265.`, v: `4*6.674e-11*${m}*1.989e30/(2.998e8**2*${b})*180/pi*3600` }; }
      const P = [['Mercury', 5.791e10, 0.2056, 0.2408], ['Venus', 1.0821e11, 0.0068, 0.6152], ['Earth', 1.496e11, 0.0167, 1]], [name, a, e, yr] = R.pick(P), dphi = 6 * Math.PI * G * MS / (C * C * a * (1 - e * e)), ask = R.int(0, 1), cent = dphi * (100 / yr) * 206264.806;
      return { q: ask ? T`Find the GR perihelion precession of ${name} in arcseconds per century, to two decimals.` : T`Find the GR perihelion precession of ${name} per orbit, in units of \(10^{-7}\) rad, to three decimals.`, answer: ask ? cent : dphi * 1e7, tol: ask ? 0.01 : 0.001, x: T`\(\frac{6\pi GM}{c^2a(1 - e^2)}\) with \(a = ${a.toExponential(3)}\) m, \(e = ${e}\)${ask ? T`; times ${R.fmt(100 / yr, 2)} orbits per century` : ''}.`, v: ask ? `6*pi*6.674e-11*1.989e30/(2.998e8**2*${a}*(1 - ${e}**2))*(100/${yr})*180/pi*3600` : `6*pi*6.674e-11*1.989e30/(2.998e8**2*${a}*(1 - ${e}**2))*1e7` };
    } }],
    [U[6]]: [{ id: 'gr-bh', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const M = R.pick([1e10, 1e12, 1e15, MS, 10 * MS]), Th = HB * C ** 3 / (8 * Math.PI * G * M * KB), ex = Math.floor(Math.log10(Th));
        return { q: T`Find the Hawking temperature of a ${M === MS ? 'solar-mass' : M === 10 * MS ? '10 solar-mass' : `\\(10^{${Math.round(Math.log10(M))}}\\) kg`} black hole, as a coefficient times \(10^{${ex}}\) K, to three decimals.`, answer: Th / 10 ** ex, tol: 0.001, x: T`\(T = \frac{\hbar c^3}{8\pi GMk_B}\).`, v: `1.054571817e-34*2.998e8**3/(8*pi*6.674e-11*${M}*1.380649e-23)/10**${ex}` }; }
      const f = R.pick([2, 3, 10, 0.5]), what = R.int(0, 2); return { q: T`A black hole's mass is multiplied by ${f}. By what factor does its ${['Hawking temperature', 'horizon area', 'evaporation time'][what]} change? (Four decimals.)`, answer: [1 / f, f * f, f ** 3][what], tol: 1e-4 * Math.max(1, f ** 3), x: T`\(T \propto M^{-1}\), \(A \propto M^2\), \(t \propto M^3\).`, v: `nsimplify(${f})**${[-1, 2, 3][what]}` };
    } }],
    [U[7]]: [{ id: 'gr-gw', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const fo = R.pick([10, 30, 50, 100, 250]); return { q: T`A binary orbits at ${fo} Hz. Find its gravitational-wave frequency in Hz.`, answer: 2 * fo, x: T`The quadrupole pattern repeats twice per orbit.`, v: `(lambda t: 2*pi/[s for s in solve(cos(2*2*pi*${fo}*t) - 1, t) if s > 0][0]/(2*pi))(Symbol('t', positive=True))` }; }
      if (k === 1) { const [h, ht] = R.pick([[1e-21, '10^{-21}'], [5e-22, '5\\times10^{-22}'], [2e-21, '2\\times10^{-21}']]), [L, Lt] = R.pick([[4000, '4000'], [3000, '3000'], [2.5e9, '2.5\\times10^{9}']]), dL = 0.5 * h * L, ex = Math.floor(Math.log10(dL)); return { q: T`A wave of strain \(${ht}\) passes an arm of length \(${Lt}\) m. Find \(\Delta L\) as a coefficient times \(10^{${ex}}\) m, to three decimals.`, answer: dL / 10 ** ex, tol: 0.001, x: T`\(\Delta L = \frac12hL\).`, v: `${h}*${L}/2/10**${ex}` }; }
      const f = R.pick([0.5, 2, 0.8]); return { q: T`The separation of a circular binary is multiplied by ${f}. By what factor does the quadrupole-formula power change? (Four decimals.)`, answer: f ** -5, tol: 1e-4 * Math.max(1, f ** -5), x: T`\(P \propto a^{-5}\).`, v: `nsimplify(${f})**-5` };
    } }],
    [U[8]]: [{ id: 'gr-cos', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const H = R.pick([67, 70, 73]), d = R.pick([10, 50, 100, 400]); return { q: T`With \(H_0 = ${H}\) km/s/Mpc, find the recession speed (km/s) of a galaxy ${d} Mpc away.`, answer: H * d, x: T`\(v = H_0d\).`, v: `${H}*${d}` }; }
      if (k === 1) { const H = R.pick([67, 70, 73]), Hs = H * 1000 / 3.0857e22, rc = 3 * Hs * Hs / (8 * Math.PI * G); return { q: T`Find the critical density for \(H_0 = ${H}\) km/s/Mpc, in units of \(10^{-27}\) kg/m\(^3\), to three decimals.`, answer: rc * 1e27, tol: 0.001, x: T`\(\rho_c = \frac{3H^2}{8\pi G}\) with \(H = ${Hs.toExponential(4).replace(/e(-?\d+)/, (m, e) => `\\times10^{${+e}}`)}\) s\(^{-1}\).`, v: `3*(${H}*1000/3.0857e22)**2/(8*pi*6.674e-11)*1e27` }; }
      if (k === 2) { const z = R.pick([0.5, 1, 3, 1100, 9]), ask = R.int(0, 1); return { q: ask ? T`At redshift \(z = ${z}\), by what factor was the CMB temperature higher than today?` : T`Find the scale factor (relative to today) at redshift \(z = ${z}\), to five decimals.`, answer: ask ? 1 + z : 1 / (1 + z), tol: 1e-5, x: T`\(a = \frac{1}{1 + z}\); temperature scales as \(1 + z\).`, v: ask ? `1 + nsimplify(${z})` : `1/(1 + nsimplify(${z}))` }; }
      const H = R.pick([67, 70, 73]), ask = R.int(0, 1), tH = 1 / (H * 1000 / 3.0857e22) / 3.156e16; return { q: T`For \(H_0 = ${H}\) km/s/Mpc, find ${ask ? 'the age of a flat matter-only universe, \\(\\frac{2}{3H_0}\\),' : 'the Hubble time \\(1/H_0\\)'} in billions of years, to three decimals.`, answer: (ask ? 2 / 3 : 1) * tH, tol: 0.001, x: T`\(\frac{1}{H_0} = \frac{3.0857\times10^{19}}{${H}}\) s, divided by \(3.156\times10^{16}\) s per Gyr.`, v: ask ? `integrate(1/(Symbol('a')*(${H}*1000/3.0857e22)*Symbol('a')**Rational(-3, 2)), (Symbol('a'), 0, 1))/3.156e16` : `1/(${H}*1000/3.0857e22)/3.156e16` };
    } }]
  } });
})();
