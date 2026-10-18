'use strict';
// Theoretical physics track: Special relativity. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'sr', name: 'Special relativity', color: '#7A5A1E', blurb: 'Time dilation, Lorentz transformations, the interval, velocity addition, four-momentum, collisions and decays, Doppler shift, rapidity, field transformations', questions: [], generators: [] });
  const U = ['Time dilation and length contraction', 'Lorentz transformations', 'The spacetime interval', 'Velocity addition', 'Energy and momentum', 'Collisions, decays, and invariant mass', 'The relativistic Doppler effect', 'Rapidity and acceleration', 'Fields and relativity'];

  registerLearn('sr', [
    { title: U[0], skill: U[0],
      hook: T`<p>If every inertial observer measures the same speed of light, then moving clocks must run slow and moving rulers must shrink. Both effects are governed by one factor, \(\gamma\).</p>`,
      body: T`
<p><b>Postulates.</b> (1) The laws of physics are the same in all inertial frames. (2) Light travels at \(c\) in every inertial frame.</p>
<p><b>Lorentz factor:</b> \(\beta = \frac vc\), \(\gamma = \frac{1}{\sqrt{1 - \beta^2}}\). Values: \(\beta = 0.6\Rightarrow\gamma = 1.25\); \(0.8\Rightarrow\frac53\); \(0.99\Rightarrow7.09\).</p>
<p><b>Time dilation.</b> A clock moving at \(v\) ticks proper time \(\Delta\tau\) while the lab measures \(\Delta t = \gamma\Delta\tau\). The light clock shows why: in the lab the light travels a longer diagonal path at the same speed.</p>
<p><b>Length contraction.</b> An object of proper length \(L_0\) moving along its length measures \(L = \frac{L_0}{\gamma}\). Perpendicular lengths are unchanged.</p>
<p><b>Muons.</b> Created 15 km up with \(\beta = 0.998\) (\(\gamma \approx 15.8\)) and proper mean life 2.2 µs, they travel on average \(\gamma\beta c\tau \approx 10.4\) km instead of 660 m. In the muon's frame, the atmosphere is contracted by \(\gamma\) instead.</p>
<p><b>Low speeds.</b> \(\gamma \approx 1 + \frac12\beta^2\): a jet at 250 m/s gains about 1 ns per hour.</p>`,
      ex: { q: T`A spaceship passes at \(\beta = 0.8\). Its clock shows 6 s between two events on board. How long does Earth measure? Its proper length is 100 m; what length does Earth measure?`, a: T`<p>\(\gamma = \frac53\). Earth time \(6\cdot\frac53 = 10\) s. Length \(\frac{100}{5/3} = 60\) m.</p>` },
      trap: T`Applying time dilation to the wrong clock. The proper time belongs to the clock present at both events.`,
      vary: [[T`\(\gamma\) at \(\beta = 0.6\)?`, 1.25, T`\(1/0.8\).`], [T`\(\beta\) for \(\gamma = 2\), four decimals.`, Math.sqrt(3) / 2, T`\(\sqrt{1 - 1/4}\).`], [T`Proper length 30 m at \(\beta = 0.8\): measured length?`, 18, T`\(30\cdot0.6\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>The Lorentz transformation converts the coordinates of an event between two frames. It mixes space and time, and from it every relativistic effect follows, including the surprising fact that simultaneity depends on the observer.</p>`,
      body: T`
<p>Frame \(S'\) moves at \(v\) along \(x\) relative to \(S\). With \(c = 1\) (time in units where light covers one unit per unit):</p>
\[t' = \gamma(t - \beta x),\qquad x' = \gamma(x - \beta t),\qquad y' = y,\ z' = z\]
<p>The inverse flips the sign of \(\beta\). With units restored: \(t' = \gamma(t - \frac{vx}{c^2})\).</p>
<p><b>Relativity of simultaneity.</b> Two events at the same \(t\) but separated by \(\Delta x\) have \(\Delta t' = -\gamma\beta\Delta x\). Events simultaneous in \(S\) are not simultaneous in \(S'\).</p>
<p><b>Example.</b> \(\beta = 0.6\), event at \((t, x) = (5, 4)\): \(t' = 1.25(5 - 2.4) = 3.25\), \(x' = 1.25(4 - 3) = 1.25\). Check the invariant: \(25 - 16 = 9\) and \(3.25^2 - 1.25^2 = 9\).</p>
<p><b>Matrix form.</b> \(\begin{pmatrix}t'\\ x'\end{pmatrix} = \begin{pmatrix}\gamma & -\gamma\beta\\ -\gamma\beta & \gamma\end{pmatrix}\begin{pmatrix}t\\ x\end{pmatrix}\), with determinant 1. Composing two boosts along \(x\) gives another boost (velocities add relativistically).</p>
<p><b>The ladder paradox</b> and similar puzzles dissolve once simultaneity is tracked: "the ladder is entirely inside the barn" is a statement about simultaneous events, and frames disagree about those.</p>`,
      ex: { q: T`Two flashes occur at \(t = 0\) at \(x = 0\) and \(x = 10\) (light-seconds). In a frame moving at \(\beta = 0.6\), how far apart in time are they?`, a: T`<p>\(\Delta t' = \gamma(0 - 0.6\cdot10) = 1.25(-6) = -7.5\) s: the flash at \(x = 10\) happens 7.5 s earlier in the moving frame.</p>` },
      trap: T`Transforming time with \(t' = \frac{t}{\gamma}\) for every event. That shortcut only applies to a clock at rest in one of the frames.`,
      vary: [[T`\(\beta = 0.6\), event \((t, x) = (5, 4)\): \(t'\)?`, 3.25, T`\(1.25(5 - 2.4)\).`], [T`Same event: \(x'\)?`, 1.25, T`\(1.25(4 - 3)\).`], [T`Determinant of a Lorentz boost matrix?`, 1, T`\(\gamma^2 - \gamma^2\beta^2\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Distances and times differ between frames, but one combination does not: the spacetime interval. Its sign decides whether one event can cause another.</p>`,
      body: T`
\[\Delta s^2 = c^2\Delta t^2 - \Delta x^2 - \Delta y^2 - \Delta z^2\]
<p>(the "mostly minus" convention). It is the same in every inertial frame.</p>
<table class="tt"><tr><th>Sign</th><th>Type</th><th>Meaning</th></tr>
<tr><td>\(\Delta s^2 > 0\)</td><td>timelike</td><td>a frame exists where they happen at the same place; causal connection possible</td></tr>
<tr><td>\(\Delta s^2 = 0\)</td><td>lightlike</td><td>connected by a light signal</td></tr>
<tr><td>\(\Delta s^2 < 0\)</td><td>spacelike</td><td>a frame exists where they are simultaneous; no causal connection</td></tr></table>
<p>The time order of timelike-separated events is the same in all frames; for spacelike events it can flip.</p>
<p><b>Proper time</b> along a worldline: \(\tau = \int\sqrt{1 - \beta^2}\,dt = \int\frac{dt}{\gamma}\). For a timelike interval, \(\Delta\tau = \frac{\Delta s}{c}\), the time on a clock that travels straight between the events.</p>
<p><b>Twin paradox.</b> A twin travels 4 light-years out at \(\beta = 0.8\) and back. Earth time \(2\cdot\frac{4}{0.8} = 10\) years; traveler's proper time \(10\cdot0.6 = 6\) years. The straight worldline maximizes proper time; the traveler's path, which turns around, is shorter in proper time.</p>`,
      ex: { q: T`Event A at \((t, x) = (0, 0)\), event B at \((3, 5)\) (\(c = 1\)). Can A cause B?`, a: T`<p>\(\Delta s^2 = 9 - 25 = -16 < 0\): spacelike. No signal can connect them, and some frames see B before A.</p>` },
      trap: T`Mixing the signature convention. With \(+,-,-,-\), timelike intervals are positive; with \(-,+,+,+\) they are negative.`,
      vary: [[T`\(\Delta s^2\) for \(\Delta t = 5\), \(\Delta x = 3\) (\(c = 1\))?`, 16, T`\(25 - 9\).`], [T`Proper time between those events?`, 4, T`\(\sqrt{16}\).`], [T`Traveler's proper time (years) for a 10-year Earth trip at \(\beta = 0.6\)?`, 8, T`\(10\cdot0.8\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Speeds do not simply add: a ball thrown at \(0.5c\) from a rocket moving at \(0.5c\) travels at \(0.8c\), not \(c\). The relativistic addition rule keeps every speed below light.</p>`,
      body: T`
<p>An object moves at \(u'\) in \(S'\), which moves at \(v\) relative to \(S\) (same direction):</p>
\[u = \frac{u' + v}{1 + \frac{u'v}{c^2}}\]
<p>Examples (\(c = 1\)): \(0.5 \oplus 0.5 = \frac{1}{1.25} = 0.8\); \(0.9 \oplus 0.9 = \frac{1.8}{1.81} \approx 0.9945\); \(u' = 1\) gives \(u = 1\) for any \(v\).</p>
<p><b>Inverse.</b> The speed seen from \(S'\) of an object moving at \(u\) in \(S\): \(u' = \frac{u - v}{1 - uv}\). Two rockets approaching each other at \(0.6c\) each (in the ground frame) see each other at \(\frac{1.2}{1.36} \approx 0.882c\).</p>
<p><b>Closing speed versus relative speed.</b> In the ground frame the gap between the rockets closes at \(1.2c\); that is not the speed of any object, so it can exceed \(c\).</p>
<p><b>Perpendicular components</b> transform as \(u_y = \frac{u_y'}{\gamma(1 + u_x'v/c^2)}\), which gives the aberration of starlight.</p>
<p><b>Fizeau's experiment.</b> Light in moving water travels at \(\frac cn + v\left(1 - \frac{1}{n^2}\right)\) to first order, exactly what the addition rule predicts.</p>`,
      ex: { q: T`A spaceship moving at \(0.6c\) fires a probe forward at \(0.7c\) relative to itself. Find the probe's speed relative to Earth.`, a: T`<p>\(\frac{1.3}{1 + 0.42} = \frac{1.3}{1.42} \approx 0.9155c\).</p>` },
      trap: T`Adding speeds directly and getting more than \(c\).`,
      vary: [[T`\(0.5 \oplus 0.5\)?`, 0.8, T`\(\frac{1}{1.25}\).`], [T`\(0.3 \oplus 0.3\), four decimals.`, 0.6 / 1.09, T`\(\frac{0.6}{1.09}\).`], [T`\(c \oplus 0.9c\) (in units of \(c\))?`, 1, T`Light stays at \(c\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Energy and momentum combine into one four-vector whose length is the rest mass. \(E = mc^2\) is the energy of a particle at rest; everything else is kinetic.</p>`,
      body: T`
<p>For a particle of mass \(m\) at speed \(v\):</p>
\[E = \gamma mc^2,\qquad p = \gamma mv,\qquad E^2 = (pc)^2 + (mc^2)^2\]
<p>Kinetic energy \(K = (\gamma - 1)mc^2 \approx \frac12mv^2\) at low speed. Speed from energy: \(\beta = \frac{pc}{E}\). Photons: \(m = 0\), \(E = pc\).</p>
<p><b>Particle physics units.</b> Masses in MeV/\(c^2\), momenta in MeV/\(c\), energies in MeV: electron 0.511, proton 938.3, muon 105.7, pion 139.6. Then \(E^2 = p^2 + m^2\) with \(c = 1\).</p>
<p><b>Example.</b> A proton with \(K = 2\) GeV: \(E = 2938.3\) MeV, \(\gamma = 3.13\), \(p = \sqrt{E^2 - m^2} \approx 2785\) MeV/\(c\), \(\beta = \frac pE \approx 0.948\).</p>
<p><b>Four-momentum</b> \(p^\mu = (E/c, \mathbf p)\) has invariant square \(p^\mu p_\mu = m^2c^2\). Conservation of four-momentum combines conservation of energy and of momentum.</p>
<p><b>Mass-energy.</b> Binding energy shows up as missing mass: a deuteron weighs 2.224 MeV less than a free proton plus neutron. The Sun converts about \(4\times10^9\) kg of mass to radiation each second.</p>`,
      ex: { q: T`An electron (0.511 MeV) has momentum 1 MeV/\(c\). Find \(E\), \(K\), and \(\beta\).`, a: T`<p>\(E = \sqrt{1 + 0.261} \approx 1.123\) MeV. \(K = 0.612\) MeV. \(\beta = \frac{1}{1.123} \approx 0.890\).</p>` },
      trap: T`Using \(p = mv\) or \(K = \frac12mv^2\) at relativistic speeds.`,
      vary: [[T`\(\gamma\) for a proton with \(K = 938.3\) MeV?`, 2, T`\(E = 2mc^2\).`], [T`\(E\) (MeV) for \(p = 3\), \(m = 4\) (\(c = 1\))?`, 5, T`\(\sqrt{9 + 16}\).`], [T`Photon with \(E = 2\) MeV: \(p\) in MeV/\(c\)?`, 2, T`\(E = pc\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>In collisions and decays, conserve four-momentum and use invariants. The invariant mass of a system is the same in every frame, which turns most problems into one line of algebra.</p>`,
      body: T`
<p><b>Invariant mass</b> of a system: \(M^2c^4 = \left(\sum E\right)^2 - \left|\sum\mathbf pc\right|^2\). For two particles (\(c = 1\)):</p>
\[\begin{aligned}M^2 = {}&m_1^2 + m_2^2\\ &+ 2(E_1E_2 - p_1p_2\cos\theta)\end{aligned}\]
<p>Two photons of energies \(E_1\), \(E_2\) at angle \(\theta\): \(M^2 = 2E_1E_2(1 - \cos\theta)\). This is how the Higgs boson was found in diphoton pairs.</p>
<p><b>Two-body decay</b> at rest: \(M \to m_1 + m_2\). Each daughter has momentum</p>
\[p^* = \frac{\sqrt{(M^2 - \Sigma^2)(M^2 - \Delta^2)}}{2M}\]
<p>with \(\Sigma = m_1 + m_2\) and \(\Delta = m_1 - m_2\).</p>
<p>\(\pi^+ \to \mu^+\nu\) (139.6 → 105.7 + 0): \(p^* = \frac{139.6^2 - 105.7^2}{2\cdot139.6} \approx 29.8\) MeV/\(c\).</p>
<p><b>Threshold energy</b> for producing final masses \(\sum m_f\) from a beam on a fixed target \(m_t\): \(E_{\text{beam}} = \frac{(\sum m_f)^2 - m_b^2 - m_t^2}{2m_t}\). Antiproton production \(pp \to ppp\bar p\): \(E = \frac{(4m_p)^2 - 2m_p^2}{2m_p} = 7m_p\), kinetic energy \(6m_p \approx 5.6\) GeV. Colliders avoid this waste: head-on beams put all their energy into the invariant mass.</p>
<p><b>Compton scattering:</b> \(\lambda' - \lambda = \frac{h}{m_ec}(1 - \cos\theta)\), with \(\frac{h}{m_ec} = 2.426\) pm.</p>`,
      ex: { q: T`Two 50 GeV photons collide head-on. What is their invariant mass?`, a: T`<p>\(\theta = 180°\): \(M^2 = 2(50)(50)(2) = 10^4\) GeV\(^2\), so \(M = 100\) GeV. Back-to-back photons of equal energy have invariant mass equal to their total energy.</p>` },
      trap: T`Adding masses of decay products as if mass were conserved. Only energy and momentum are conserved.`,
      vary: [[T`Invariant mass of two 3 GeV photons at 90°, four decimals.`, Math.sqrt(18), T`\(\sqrt{2\cdot9}\).`], [T`Muon momentum (MeV/\(c\)) in \(\pi \to \mu\nu\), one decimal.`, (139.57 ** 2 - 105.66 ** 2) / (2 * 139.57), T`Formula with \(m_2 = 0\).`], [T`Compton shift (pm) at 90°, three decimals.`, 2.426, T`\(1 - \cos90° = 1\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Light from a source moving toward you is shifted to higher frequency, and away from you to lower. In relativity the formula includes time dilation, and it is how we measure the expansion of the universe.</p>`,
      body: T`
<p><b>Longitudinal Doppler effect</b> (source and observer approaching at speed \(\beta\)):</p>
\[f_{\text{obs}} = f\sqrt{\frac{1 + \beta}{1 - \beta}}\]
<p>Receding: swap the signs. At \(\beta = 0.6\) approaching, the factor is \(\sqrt{4} = 2\); receding, \(\frac12\).</p>
<p><b>Redshift</b> \(z = \frac{\lambda_{\text{obs}} - \lambda}{\lambda}\). For recession, \(1 + z = \sqrt{\frac{1 + \beta}{1 - \beta}}\), so \(\beta = \frac{(1 + z)^2 - 1}{(1 + z)^2 + 1}\). At low speed \(z \approx \beta\).</p>
<p><b>Transverse Doppler effect.</b> When the source moves perpendicular to the line of sight (in the observer's frame), \(f_{\text{obs}} = \frac f\gamma\): pure time dilation, with no classical counterpart.</p>
<p><b>Applications.</b> Radar guns, GPS corrections, measuring stellar and galactic velocities. (For distant galaxies the cosmological redshift comes from the expansion of space, but the special-relativistic formula describes nearby motions.)</p>`,
      ex: { q: T`A galaxy's hydrogen line (rest 656.3 nm) is observed at 721.9 nm. Find \(z\) and the recession speed.`, a: T`<p>\(z = \frac{65.6}{656.3} \approx 0.1\). \((1.1)^2 = 1.21\), \(\beta = \frac{0.21}{2.21} \approx 0.095\).</p>` },
      trap: T`Using \(z = \beta\) at high speed. That approximation fails once \(\beta\) is a sizable fraction of 1.`,
      vary: [[T`Frequency factor for a source approaching at \(\beta = 0.6\)?`, 2, T`\(\sqrt{1.6/0.4}\).`], [T`\(\beta\) for \(z = 1\) (receding)?`, 0.6, T`\(\frac{4 - 1}{4 + 1}\).`], [T`Transverse factor \(f_{\text{obs}}/f\) at \(\beta = 0.6\)?`, 0.8, T`\(\frac1\gamma\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Velocities do not add, but rapidities do. Rapidity is the hyperbolic angle of a boost, and it makes constant acceleration and repeated boosts as simple as rotations.</p>`,
      body: T`
<p><b>Rapidity</b> \(\phi = \text{artanh}\,\beta\), so \(\beta = \tanh\phi\), \(\gamma = \cosh\phi\), \(\gamma\beta = \sinh\phi\). A boost is a hyperbolic rotation:</p>
\[\begin{pmatrix}t'\\ x'\end{pmatrix} = \begin{pmatrix}\cosh\phi & -\sinh\phi\\ -\sinh\phi & \cosh\phi\end{pmatrix}\begin{pmatrix}t\\ x\end{pmatrix}\]
<p><b>Collinear boosts add rapidities:</b> \(\tanh(\phi_1 + \phi_2) = \frac{\tanh\phi_1 + \tanh\phi_2}{1 + \tanh\phi_1\tanh\phi_2}\), which is the velocity addition rule.</p>
<p><b>Constant proper acceleration</b> \(a\) (felt by the traveler), starting from rest, \(c = 1\):</p>
\[\phi = a\tau,\qquad t = \frac1a\sinh a\tau,\qquad x = \frac1a(\cosh a\tau - 1)\]
<p>The worldline is a hyperbola. With \(a = g \approx 1.03\) ly/yr\(^2\), after 1 year of proper time a rocket reaches \(\beta = \tanh(1.03) \approx 0.77\); after 5 years, \(\beta \approx 0.99993\) and it has covered about 85 light-years.</p>
<p><b>Rindler horizon.</b> A light signal sent from more than \(\frac{c^2}{a}\) behind the rocket at its start can never catch up, which links acceleration to horizons and, through the equivalence principle, to black holes.</p>`,
      ex: { q: T`Combine boosts of \(\beta = 0.5\) and \(\beta = 0.8\) using rapidities.`, a: T`<p>\(\text{artanh}0.5 = 0.5493\), \(\text{artanh}0.8 = 1.0986\). Sum 1.6479; \(\tanh1.6479 = 0.9286\). Check: \(\frac{1.3}{1.4} = 0.9286\).</p>` },
      trap: T`Adding velocities instead of rapidities when chaining boosts.`,
      vary: [[T`Rapidity of \(\beta = 0.6\), four decimals.`, Math.atanh(0.6), T`\(\frac12\ln4\).`], [T`\(\gamma\) for rapidity \(\ln2\)?`, 1.25, T`\(\cosh\ln2 = \frac{2 + 0.5}{2}\).`], [T`Proper time (units \(1/a\)) to reach \(\beta = \tanh2\)?`, 2, T`\(\phi = a\tau\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Electric and magnetic fields are two faces of one object. A pure electric field in one frame has a magnetic part in another, and two combinations of them are the same for every observer.</p>`,
      body: T`
<p><b>Field transformations</b> for a boost with velocity \(\mathbf v\) (components parallel and perpendicular to \(\mathbf v\)):</p>
\[\mathbf E'_\parallel = \mathbf E_\parallel,\quad \mathbf E'_\perp = \gamma(\mathbf E + \mathbf v\times\mathbf B)_\perp\]
\[\mathbf B'_\parallel = \mathbf B_\parallel,\quad \mathbf B'_\perp = \gamma\left(\mathbf B - \frac{\mathbf v\times\mathbf E}{c^2}\right)_\perp\]
<p><b>Invariants:</b> \(E^2 - c^2B^2\) and \(\mathbf E\cdot\mathbf B\). If \(E < cB\) everywhere and \(\mathbf E\cdot\mathbf B = 0\), some frame sees a pure magnetic field; if \(E > cB\), some frame sees a pure electric field. An electromagnetic wave has both invariants zero, so no frame can remove it.</p>
<p><b>Magnetism from electrostatics.</b> A neutral wire with a current looks charged to a moving test charge (length contraction changes the densities of positive and negative carriers differently), and the resulting electric force in that frame is exactly the magnetic force in the lab.</p>
<p><b>Field tensor.</b> \(F^{\mu\nu}\) packs \(\mathbf E\) and \(\mathbf B\) into one antisymmetric \(4\times4\) object; Maxwell's equations become \(\partial_\mu F^{\mu\nu} = \mu_0J^\nu\) and the invariants are \(F_{\mu\nu}F^{\mu\nu}\) and \(\det F\).</p>
<p><b>Moving point charge.</b> The field of a charge at constant velocity is compressed toward the plane perpendicular to its motion by the factor \(\gamma\).</p>`,
      ex: { q: T`In the lab, \(\mathbf B = (0, 0, 1)\) T and \(\mathbf E = 0\). A frame moves at \(v = 0.6c\) along \(x\). Find \(\mathbf E'\).`, a: T`<p>\(\mathbf v\times\mathbf B = 0.6c(\hat x\times\hat z) = -0.6c\,\hat y\). \(\mathbf E' = \gamma(-0.6c)\hat y = -0.75c\,\hat y \approx -2.25\times10^8\) V/m. Check: \(E'^2 - c^2B'^2 = -c^2\), with \(B' = 1.25\) T.</p>` },
      trap: T`Transforming the parallel components. Only the components perpendicular to the boost change.`,
      vary: [[T`Is \(E^2 - c^2B^2\) frame-independent? 1 yes, 0 no.`, 1, T`An invariant.`], [T`For a plane wave, \(\mathbf E\cdot\mathbf B\)?`, 0, T`Perpendicular fields.`], [T`\(B'\) (T) in the example above?`, 1.25, T`\(\gamma B\).`]] }
  ]);

  addQuestions('sr', [
    { id: 'sr1', skill: U[0], q: T`A clock moving relative to you:`, c: ['runs slow by the factor γ', 'runs fast by γ', 'runs at the same rate', 'stops'], x: T`Time dilation.` },
    { id: 'sr2', skill: U[2], q: T`If two events are spacelike separated:`, c: ['no signal can connect them, and their time order depends on the frame', 'one must cause the other', 'they occur at the same place in some frame', 'light connects them'], x: T`\(\Delta s^2 < 0\).` },
    { id: 'sr3', skill: U[2], q: T`In the twin paradox, the twin who ages less is the one who:`, c: ['changes inertial frames (turns around)', 'stays on Earth', 'moves faster on the outbound leg only', 'neither; they age equally'], x: T`The straight worldline maximizes proper time.` },
    { id: 'sr4', skill: U[4], q: T`The invariant \(E^2 - (pc)^2\) equals:`, c: [T`\((mc^2)^2\)`, '0', T`\(K^2\)`, T`\((\gamma mc^2)^2\)`], x: T`Rest energy squared.` },
    { id: 'sr5', skill: U[7], q: T`For collinear boosts, the quantity that simply adds is:`, c: ['rapidity', 'velocity', 'γ', 'momentum'], x: T`\(\tanh(\phi_1 + \phi_2)\) is the addition rule.` },
    { id: 'sr6', skill: U[8], q: T`Which quantity is the same in every inertial frame?`, c: [T`\(\mathbf E\cdot\mathbf B\)`, T`\(|\mathbf E|\)`, T`\(|\mathbf B|\)`, T`\(\mathbf E + \mathbf B\)`], x: T`Together with \(E^2 - c^2B^2\).` }
  ]);

  // ======================= GENERATORS =======================
  const gam = b => 1 / Math.sqrt(1 - b * b);
  const BETAS = [0.6, 0.8, 0.28, 0.96, 0.5, 0.9, 0.99, 0.3];

  registerUnitGens('sr', { units: {
    [U[0]]: [{ id: 'sr-td', make(R) {
      const b = R.pick(BETAS), g = gam(b), k = R.int(0, 3);
      if (k === 0) return { q: T`Find \(\gamma\) for \(\beta = ${b}\), to four decimals.`, answer: g, tol: 1e-4, x: T`\(\frac{1}{\sqrt{1 - ${b}^2}} = \frac{1}{\sqrt{${R.fmt(1 - b * b, 4)}}}\).`, v: `1/sqrt(1 - nsimplify(${b})**2)` };
      if (k === 1) { const tau = R.int(1, 10); return { q: T`A clock moving at \(\beta = ${b}\) ticks ${tau} s of proper time. How long does the lab measure? (Four decimals.)`, answer: g * tau, tol: 1e-4, x: T`\(\Delta t = \gamma\Delta\tau = ${R.fmt(g, 5)}\cdot${tau}\).`, v: `${tau}/sqrt(1 - nsimplify(${b})**2)` }; }
      if (k === 2) { const L0 = R.int(10, 200); return { q: T`A rod of proper length ${L0} m moves along its length at \(\beta = ${b}\). Find its measured length, to four decimals.`, answer: L0 / g, tol: 1e-4, x: T`\(L = \frac{L_0}{\gamma} = ${L0}\sqrt{1 - ${b}^2}\).`, v: `${L0}*sqrt(1 - nsimplify(${b})**2)` }; }
      const bb = R.pick([0.99, 0.995, 0.998, 0.9]), tau = 2.197; return { q: T`Muons (proper mean life 2.197 µs) move at \(\beta = ${bb}\). Find the mean distance traveled in km, to three decimals.`, answer: gam(bb) * bb * 2.998e8 * tau * 1e-6 / 1000, tol: 0.001, x: T`\(\gamma\beta c\tau\) with \(\gamma = ${R.fmt(gam(bb), 4)}\).`, v: `nsimplify(${bb})/sqrt(1 - nsimplify(${bb})**2)*2.998e8*2.197e-6/1000` };
    } }],
    [U[1]]: [{ id: 'sr-lt', make(R) {
      const b = R.pick([0.6, 0.8, 0.28, 0.96, 0.5]), t = R.int(-5, 10), x = R.int(-5, 10), ask = R.int(0, 1), g = gam(b), tp = g * (t - b * x), xp = g * (x - b * t);
      return { q: T`Frame \(S'\) moves at \(\beta = ${b}\) along \(x\) (\(c = 1\)). An event has \((t, x) = (${t}, ${x})\) in \(S\). Find ${ask ? "\\(x'\\)" : "\\(t'\\)"}, to four decimals.`, answer: ask ? xp : tp, tol: 1e-4, x: T`\(\gamma = ${R.fmt(g, 5)}\). \(t' = \gamma(t - \beta x) = ${R.fmt(tp, 4)}\), \(x' = \gamma(x - \beta t) = ${R.fmt(xp, 4)}\). Check: \(t'^2 - x'^2 = ${t * t - x * x}\).`,
        v: `(lambda b: (lambda L: (L*Matrix([${t}, ${x}]))[${ask}])(Matrix([[1, -b], [-b, 1]])/sqrt(1 - b**2)))(nsimplify(${b}))` };
    } }],
    [U[2]]: [{ id: 'sr-int', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const dt = R.int(0, 8), dx = R.int(0, 8), s2 = dt * dt - dx * dx, w = s2 > 0 ? 'Timelike' : s2 === 0 ? 'Lightlike' : 'Spacelike';
        return { q: T`Classify the separation between events with \(\Delta t = ${dt}\) and \(\Delta x = ${dx}\) (\(c = 1\)).`, c: [w, ...['Timelike', 'Lightlike', 'Spacelike'].filter(z => z !== w)], x: T`\(\Delta s^2 = ${dt * dt} - ${dx * dx} = ${s2}\).`, key: w, vk: `(lambda s: 'Timelike' if s > 0 else 'Lightlike' if s == 0 else 'Spacelike')((Matrix([${dt}, ${dx}]).T*diag(1, -1)*Matrix([${dt}, ${dx}]))[0])` }; }
      if (k === 1) { const dt = R.int(2, 13), dx = R.int(0, dt - 1); return { q: T`Find the proper time between events with \(\Delta t = ${dt}\) and \(\Delta x = ${dx}\) (\(c = 1\)), to four decimals.`, answer: Math.sqrt(dt * dt - dx * dx), tol: 1e-4, x: T`\(\Delta\tau = \sqrt{${dt * dt} - ${dx * dx}}\).`, v: `integrate(sqrt(1 - Rational(${dx}, ${dt})**2), (Symbol('t'), 0, ${dt}))` }; }
      const D = R.int(2, 10), b = R.pick([0.6, 0.8, 0.5, 0.9]), T1 = 2 * D / b, tau = T1 / gam(b), ask = R.int(0, 1);
      return { q: T`A twin travels ${D} light-years out and back at \(\beta = ${b}\). Find the ${ask ? "traveler's proper time" : 'Earth time'} in years, to four decimals.`, answer: ask ? tau : T1, tol: 1e-4, x: T`Earth: \(\frac{2\cdot${D}}{${b}} = ${R.fmt(T1, 4)}\). Traveler: divide by \(\gamma = ${R.fmt(gam(b), 4)}\).`, v: ask ? `2*integrate(sqrt(1 - nsimplify(${b})**2), (Symbol('t'), 0, ${D}/nsimplify(${b})))` : `2*${D}/nsimplify(${b})` };
    } }],
    [U[3]]: [{ id: 'sr-vadd', make(R) {
      const u = R.pick([0.5, 0.6, 0.7, 0.8, 0.9, 0.3, -0.5]), v = R.pick([0.5, 0.6, 0.8, 0.9, 0.4]), ask = R.int(0, 1);
      if (ask) { const w = (u + v) / (1 + u * v); return { q: T`A ship moves at \(${v}c\) relative to Earth and fires a probe at \(${u}c\) relative to itself (same line). Find the probe's speed relative to Earth, in units of \(c\), to four decimals.`, answer: w, tol: 1e-4, x: T`\(\frac{${u} + ${v}}{1 + (${u})(${v})} = ${R.fmt(w, 5)}\).`, v: `tanh(atanh(nsimplify(${u})) + atanh(nsimplify(${v})))` }; }
      const a = R.pick([0.5, 0.6, 0.8, 0.9]), w = 2 * a / (1 + a * a);
      return { q: T`Two rockets approach each other, each at \(${a}c\) relative to the ground. How fast does one see the other approaching, in units of \(c\), to four decimals?`, answer: w, tol: 1e-4, x: T`\(\frac{2(${a})}{1 + ${a}^2}\).`, v: `tanh(2*atanh(nsimplify(${a})))` };
    } }],
    [U[4]]: [{ id: 'sr-emom', make(R) {
      const P = [['electron', 0.511], ['proton', 938.3], ['muon', 105.7], ['pion', 139.6]], [name, m] = R.pick(P), k = R.int(0, 2);
      if (k === 0) { const pmom = R.pick([1, 10, 100, 500, 1000]), E = Math.sqrt(pmom * pmom + m * m), ask = R.int(0, 2); const vals = [E, E - m, pmom / E];
        return { q: T`${/^[aeiou]/.test(name) ? 'An' : 'A'} ${name} (\(m = ${m}\) MeV/\(c^2\)) has momentum ${pmom} MeV/\(c\). Find ${['its energy (MeV)', 'its kinetic energy (MeV)', 'its speed β'][ask]}, to four decimals.`, answer: vals[ask], tol: 1e-4, x: T`\(E = \sqrt{p^2 + m^2} = ${R.fmt(E, 5)}\), \(K = E - m\), \(\beta = \frac pE\).`, v: `(lambda E: [E, E - nsimplify(${m}), ${pmom}/E][${ask}])(sqrt(${pmom}**2 + nsimplify(${m})**2))` }; }
      if (k === 1) { const K = R.pick([1, 10, 100, 1000, 2000]), E = K + m, g = E / m, p = Math.sqrt(E * E - m * m), ask = R.int(0, 1);
        return { q: T`${/^[aeiou]/.test(name) ? 'An' : 'A'} ${name} (\(m = ${m}\) MeV) has kinetic energy ${K} MeV. Find ${ask ? 'its momentum (MeV/\\(c\\))' : '\\(\\gamma\\)'}, to four decimals.`, answer: ask ? p : g, tol: 1e-4, x: T`\(E = K + m = ${R.fmt(E, 4)}\), \(\gamma = \frac Em\), \(p = \sqrt{E^2 - m^2}\).`, v: ask ? `sqrt((${K} + nsimplify(${m}))**2 - nsimplify(${m})**2)` : `(${K} + nsimplify(${m}))/nsimplify(${m})` }; }
      const b = R.pick([0.6, 0.8, 0.9, 0.99]), g = gam(b);
      return { q: T`${/^[aeiou]/.test(name) ? 'An' : 'A'} ${name} moves at \(\beta = ${b}\). Find its kinetic energy in MeV, to three decimals.`, answer: (g - 1) * m, tol: 0.001, x: T`\(K = (\gamma - 1)mc^2\) with \(\gamma = ${R.fmt(g, 5)}\).`, v: `(1/sqrt(1 - nsimplify(${b})**2) - 1)*nsimplify(${m})` };
    } }],
    [U[5]]: [{ id: 'sr-coll', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const E1 = R.int(1, 60), E2 = R.int(1, 60), th = R.pick([60, 90, 120, 180]), M = Math.sqrt(2 * E1 * E2 * (1 - Math.cos(th * Math.PI / 180)));
        return { q: T`Two photons with energies ${E1} GeV and ${E2} GeV meet at ${th}°. Find their invariant mass in GeV, to four decimals.`, answer: M, tol: 1e-4, x: T`\(M^2 = 2E_1E_2(1 - \cos\theta)\).`, v: `(lambda p1, p2: sqrt((${E1} + ${E2})**2 - (p1 + p2).dot(p1 + p2)))(Matrix([${E1}, 0, 0]), Matrix([${E2}*cos(${th}*pi/180), ${E2}*sin(${th}*pi/180), 0]))` }; }
      if (k === 1) { const D = [['\\pi^+ \\to \\mu^+\\nu', 139.57, 105.66, 0], ['K^+ \\to \\mu^+\\nu', 493.68, 105.66, 0], ['\\Lambda \\to p\\pi^-', 1115.68, 938.27, 139.57], ['K^0 \\to \\pi^+\\pi^-', 497.61, 139.57, 139.57], ['\\pi^0 \\to \\gamma\\gamma', 134.98, 0, 0]], [t, M, m1, m2] = R.pick(D), p = Math.sqrt((M * M - (m1 + m2) ** 2) * (M * M - (m1 - m2) ** 2)) / (2 * M);
        return { q: T`Find the momentum (MeV/\(c\)) of each daughter in \(${t}\) at rest, to two decimals.`, answer: p, tol: 0.01, x: T`\(p^* = \frac{\sqrt{[M^2 - (m_1 + m_2)^2][M^2 - (m_1 - m_2)^2]}}{2M}\) with \(M = ${M}\), \(m_1 = ${m1}\), \(m_2 = ${m2}\).`, v: `nsolve(sqrt(Symbol('p')**2 + ${m1}**2) + sqrt(Symbol('p')**2 + ${m2}**2) - ${M}, Symbol('p'), ${M / 4})` }; }
      const th = R.pick([30, 60, 90, 120, 180]); return { q: T`Find the Compton wavelength shift in pm for scattering at ${th}°, to four decimals.`, answer: 2.42631 * (1 - Math.cos(th * Math.PI / 180)), tol: 1e-4, x: T`\(\frac{h}{m_ec}(1 - \cos\theta)\), with \(\frac{h}{m_ec} = 2.42631\) pm.`, v: `6.62607015e-34/(9.1093837e-31*2.99792458e8)*1e12*(1 - cos(${th}*pi/180))` };
    } }],
    [U[6]]: [{ id: 'sr-dop', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const b = R.pick([0.6, 0.8, 0.5, 0.28, 0.1]), app = R.int(0, 1), f = Math.sqrt((1 + b) / (1 - b)) ** (app ? 1 : -1); return { q: T`A source ${app ? 'approaches' : 'recedes'} at \(\beta = ${b}\). Find \(f_{\text{obs}}/f\), to four decimals.`, answer: f, tol: 1e-4, x: T`\(\sqrt{\frac{1 \pm \beta}{1 \mp \beta}}\): ${app ? 'greater' : 'less'} than 1.`, v: `(1/sqrt(1 - nsimplify(${b})**2))*(1 ${app ? '+' : '-'} nsimplify(${b}))` }; }
      if (k === 1) { const z = R.pick([0.1, 0.5, 1, 2, 3]), b = ((1 + z) ** 2 - 1) / ((1 + z) ** 2 + 1); return { q: T`A receding source shows redshift \(z = ${z}\). Find \(\beta\) from the special-relativistic formula, to four decimals.`, answer: b, tol: 1e-4, x: T`\((1 + z)^2 = ${R.fmt((1 + z) ** 2, 4)}\), \(\beta = \frac{(1 + z)^2 - 1}{(1 + z)^2 + 1}\).`, v: `[r for r in solve(sqrt((1 + Symbol('b'))/(1 - Symbol('b'))) - (1 + nsimplify(${z})), Symbol('b')) if 0 < r < 1][0]` }; }
      const b = R.pick([0.6, 0.8, 0.5]); return { q: T`For the transverse Doppler effect at \(\beta = ${b}\), find \(f_{\text{obs}}/f\), to four decimals.`, answer: 1 / gam(b), tol: 1e-4, x: T`\(\frac1\gamma = \sqrt{1 - ${b}^2}\).`, v: `sqrt(1 - nsimplify(${b})**2)` };
    } }],
    [U[7]]: [{ id: 'sr-rap', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const b1 = R.pick([0.5, 0.6, 0.8]), b2 = R.pick([0.3, 0.5, 0.6, 0.9]), w = Math.tanh(Math.atanh(b1) + Math.atanh(b2)); return { q: T`Combine collinear boosts of \(\beta = ${b1}\) and \(\beta = ${b2}\) using rapidities. Find the resulting \(\beta\), to four decimals.`, answer: w, tol: 1e-4, x: T`\(\phi = \text{artanh}\,${b1} + \text{artanh}\,${b2} = ${R.fmt(Math.atanh(b1) + Math.atanh(b2), 4)}\); \(\beta = \tanh\phi\).`, v: `(nsimplify(${b1}) + nsimplify(${b2}))/(1 + nsimplify(${b1})*nsimplify(${b2}))` }; }
      if (k === 1) { const tau = R.pick([0.5, 1, 2, 3]), a = 1.03, ask = R.int(0, 1), b = Math.tanh(a * tau), d = (Math.cosh(a * tau) - 1) / a; return { q: T`A rocket accelerates at \(a = 1.03\) ly/yr\(^2\) (about \(g\)) from rest for ${tau} years of proper time. Find ${ask ? 'the distance covered in light-years' : 'its final β'}, to four decimals.`, answer: ask ? d : b, tol: 1e-4, x: T`\(\phi = a\tau = ${R.fmt(a * tau, 4)}\); \(\beta = \tanh\phi\), \(x = \frac{\cosh\phi - 1}{a}\).`, v: ask ? `_mp.quad(lambda s: _mp.sinh(1.03*s), [0, ${tau}])` : `_mp.tanh(_mp.quad(lambda s: 1.03, [0, ${tau}]))` }; }
      const b = R.pick([0.6, 0.8, 0.5, 0.9, 0.96]); return { q: T`Find the rapidity of \(\beta = ${b}\), to four decimals.`, answer: Math.atanh(b), tol: 1e-4, x: T`\(\text{artanh}\beta = \frac12\ln\frac{1 + \beta}{1 - \beta}\).`, v: `log((1 + nsimplify(${b}))/(1 - nsimplify(${b})))/2` };
    } }],
    [U[8]]: [{ id: 'sr-field', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const E = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)], B = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)], ask = R.int(0, 1), v = ask ? E.reduce((s, e, i) => s + e * B[i], 0) : E.reduce((s, e) => s + e * e, 0) - B.reduce((s, x) => s + x * x, 0);
        return { q: T`With \(c = 1\), \(\mathbf E = (${E.join(', ')})\), \(\mathbf B = (${B.join(', ')})\). Find the invariant ${ask ? '\\(\\mathbf E\\cdot\\mathbf B\\)' : '\\(E^2 - B^2\\)'}.`, answer: v, x: ask ? T`Dot product.` : T`\(${E.reduce((s, e) => s + e * e, 0)} - ${B.reduce((s, x) => s + x * x, 0)}\).`, v: `(lambda F: ${ask ? '(F[0, 1]*F[2, 3] - F[0, 2]*F[1, 3] + F[0, 3]*F[1, 2])' : 'Rational(-1, 2)*sum(F[i, j]*(diag(1, -1, -1, -1)*F*diag(1, -1, -1, -1))[i, j] for i in range(4) for j in range(4))'})(Matrix([[0, -${E[0]}, -${E[1]}, -${E[2]}], [${E[0]}, 0, -${B[2]}, ${B[1]}], [${E[1]}, ${B[2]}, 0, -${B[0]}], [${E[2]}, -${B[1]}, ${B[0]}, 0]]))` }; }
      const Bz = R.int(1, 3), b = R.pick([0.6, 0.8, 0.28]), g = gam(b), ask = R.int(0, 1);
      return { q: T`In the lab \(\mathbf E = 0\) and \(\mathbf B = (0, 0, ${Bz})\) (units \(c = 1\)). A frame moves at \(\beta = ${b}\) along \(x\). Find ${ask ? "\\(B'_z\\)" : "\\(E'_y\\)"}, to four decimals.`, answer: ask ? g * Bz : -g * b * Bz, tol: 1e-4, x: T`\(\mathbf E' = \gamma(\mathbf v\times\mathbf B)\): \(E'_y = -\gamma\beta B_z\). \(B'_z = \gamma B_z\). Check: \(E'^2 - B'^2 = -B_z^2\).`,
        v: `(lambda b: (lambda L, F: (L*F*L.T)[${ask ? '1, 2' : '2, 0'}]*${ask ? '-1' : '1'})(Matrix([[1, -b, 0, 0], [-b, 1, 0, 0], [0, 0, sqrt(1 - b**2), 0], [0, 0, 0, sqrt(1 - b**2)]])/sqrt(1 - b**2), Matrix([[0, 0, 0, 0], [0, 0, -${Bz}, 0], [0, ${Bz}, 0, 0], [0, 0, 0, 0]])))(nsimplify(${b}))` };
    } }]
  } });
})();
