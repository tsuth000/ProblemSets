'use strict';
// Theoretical physics track: Introduction to quantum field theory. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'qft', name: 'Quantum field theory (intro)', color: '#5A2E7A', blurb: 'Natural units, relativistic wave equations, quantized fields, symmetries, Feynman diagrams, cross sections and decay rates, QED, gauge theories and the Standard Model, running couplings', questions: [], generators: [] });
  const U = ['Natural units and scales', 'Relativistic wave equations', 'Quantizing a field', 'Symmetries and conservation', 'Feynman diagrams', 'Cross sections and decay rates', 'Quantum electrodynamics', 'Gauge theories and the Standard Model', 'Renormalization and running couplings'];
  const HBC = 0.1973269804, HBAR = 6.582119569e-25; // GeV fm, GeV s

  registerLearn('qft', [
    { title: U[0], skill: U[0],
      hook: T`<p>Particle physicists set \(\hbar = c = 1\). Then energy, momentum, and mass share one unit (GeV), while length and time are inverse GeV. Two conversion constants translate back to everyday units.</p>`,
      body: T`
<p><b>Conversions.</b></p>
<table class="tt"><tr><th>Quantity</th><th>Factor</th></tr>
<tr><td>Length</td><td>\(\hbar c = 0.1973\) GeV fm</td></tr>
<tr><td>Time</td><td>\(\hbar = 6.582\times10^{-25}\) GeV s</td></tr>
<tr><td>Cross section</td><td>\((\hbar c)^2 = 0.3894\) GeV\(^2\) mb</td></tr></table>
<p>So \(1\text{ GeV}^{-1} = 0.1973\) fm \(= 6.58\times10^{-25}\) s. A length of 1 fm is \(5.07\) GeV\(^{-1}\).</p>
<p><b>Compton wavelength</b> \(\lambda = \frac{\hbar}{mc}\): the proton's (0.938 GeV) is 0.21 fm; the pion's (0.1396 GeV) is 1.41 fm, the range of the nuclear force (Yukawa's argument).</p>
<p><b>Scales.</b></p>
<ul><li>Electron mass 0.511 MeV; proton 938 MeV; W 80.4 GeV; Z 91.2 GeV; Higgs 125 GeV; top 173 GeV.</li>
<li>Planck mass \(\sqrt{\hbar c/G} = 1.22\times10^{19}\) GeV, where gravity becomes as strong as the other forces.</li>
<li>LHC collisions at 13.6 TeV probe distances near \(\frac{0.197}{13600}\) fm \(\approx 1.5\times10^{-5}\) fm.</li></ul>
<p><b>Why it works.</b> With \(\hbar = c = 1\), every quantity has a dimension of mass to some power: \([E] = [p] = [m] = 1\), \([x] = [t] = -1\), \([\sigma] = -2\). Dimensional analysis becomes powerful: a cross section at high energy with no other scale must go like \(\frac{1}{s}\).</p>`,
      ex: { q: T`Convert a lifetime of \(10^{-23}\) s into an energy width.`, a: T`<p>\(\Gamma = \frac{\hbar}{\tau} = \frac{6.582\times10^{-25}\text{ GeV s}}{10^{-23}\text{ s}} = 0.0658\) GeV \(= 65.8\) MeV.</p>` },
      trap: T`Forgetting that length is inverse energy: a higher-energy probe resolves smaller distances.`,
      vary: [[T`1 fm in GeV\(^{-1}\), three decimals.`, 1 / HBC, T`\(\frac{1}{0.1973}\).`], [T`Pion Compton wavelength (fm), three decimals.`, HBC / 0.13957, T`\(\frac{0.1973}{0.1396}\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Combining quantum mechanics with relativity, the Schrödinger equation must be replaced. The Klein–Gordon equation describes spin-0 particles; the Dirac equation describes electrons, and it predicted antimatter.</p>`,
      body: T`
<p><b>Klein–Gordon equation:</b> \((\partial_t^2 - \nabla^2 + m^2)\phi = 0\). Plane waves \(e^{-i(Et - \mathbf p\cdot\mathbf x)}\) require</p>
\[E^2 = \mathbf p^2 + m^2\]
<p>Both signs of \(E\) appear. Interpreted as a single-particle equation this is a problem (negative probabilities); in field theory the negative-energy solutions become antiparticles.</p>
<p><b>Group velocity</b> \(\frac{dE}{dp} = \frac pE < 1\): massive particles move slower than light.</p>
<p><b>Dirac equation:</b> \((i\gamma^\mu\partial_\mu - m)\psi = 0\), with \(4\times4\) matrices obeying \(\{\gamma^\mu, \gamma^\nu\} = 2\eta^{\mu\nu}\). Squaring it gives Klein–Gordon for each component. The four components hold spin up and down for both particle and antiparticle.</p>
<p><b>Predictions.</b> The electron's magnetic moment with \(g = 2\) (QED corrections give \(g - 2 \approx \frac{\alpha}{\pi}\)), spin-orbit coupling, and the positron (found by Anderson in 1932).</p>
<p><b>Yukawa potential.</b> Exchange of a massive scalar gives \(V(r) = -\frac{g^2}{4\pi}\frac{e^{-mr}}{r}\), with range \(\frac1m\). For massless exchange (the photon) this becomes Coulomb's \(\frac1r\).</p>`,
      ex: { q: T`A proton (0.938 GeV) has momentum 2 GeV. Find its energy and speed.`, a: T`<p>\(E = \sqrt{4 + 0.880} = 2.209\) GeV. \(v = \frac pE = 0.905\).</p>` },
      trap: T`Discarding negative-energy solutions. In field theory they describe antiparticles.`,
      vary: [[T`\(E\) for \(p = 3\), \(m = 4\) (natural units)?`, 5, T`\(\sqrt{9 + 16}\).`], [T`Components of a Dirac spinor?`, 4, T`Spin up/down for particle and antiparticle.`], [T`\(\{\gamma^0, \gamma^0\}\) with signature \((+, -, -, -)\)?`, 2, T`\(2\eta^{00}\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>A quantum field is an infinite collection of harmonic oscillators, one for each momentum. Exciting an oscillator by one quantum creates one particle, which is why every electron in the universe is identical.</p>`,
      body: T`
<p><b>Modes.</b> Each momentum \(\mathbf p\) is an oscillator of frequency \(\omega_p = \sqrt{\mathbf p^2 + m^2}\), with operators obeying \([a_{\mathbf p}, a^\dagger_{\mathbf q}] = (2\pi)^3\delta^3(\mathbf p - \mathbf q)\).</p>
<p><b>States.</b> The vacuum \(|0\rangle\) has every oscillator in its ground state. \(a^\dagger_{\mathbf p}|0\rangle\) is a one-particle state with energy \(\omega_p\). A general state lists occupation numbers \(n_{\mathbf p}\), with energy above the vacuum</p>
\[E = \sum_{\mathbf p}n_{\mathbf p}\,\omega_{\mathbf p}\]
<p><b>Statistics.</b> Commutators make particles bosons (any occupation). Fermion fields use anticommutators \(\{b, b^\dagger\} = 1\), which force \(n = 0\) or 1: the Pauli principle, derived. The spin–statistics theorem ties integer spin to bosons and half-integer spin to fermions.</p>
<p><b>Vacuum energy.</b> Each mode contributes \(\frac12\omega\), summing to infinity; only energy differences are measured. The Casimir force between plates (\(\frac{\pi^2\hbar c}{240d^4}\) per area) is a measurable difference in vacuum energy.</p>
<p><b>Antiparticles.</b> A complex field has two kinds of quanta, particles and antiparticles, with opposite charge and the same mass.</p>`,
      ex: { q: T`A massless field in a box has modes with \(\omega = 1, 2, 3\) (arbitrary units). Find the energy above the vacuum of the state with 2 quanta in mode 1 and 1 in mode 3.`, a: T`<p>\(2(1) + 1(3) = 5\).</p>` },
      trap: T`Counting \(\frac12\omega\) per particle. The zero-point energy belongs to the vacuum, not to the quanta.`,
      vary: [[T`Maximum occupation of a fermion mode?`, 1, T`Anticommutation.`], [T`Energy above vacuum: 3 quanta in a mode with \(\omega = 2\)?`, 6, T`\(3\cdot2\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Symmetry dictates physics. Every continuous symmetry of the action gives a conserved current (Noether), and the symmetries of spacetime decide which particles can exist: they are labeled by mass and spin.</p>`,
      body: T`
<p><b>Noether currents.</b> A phase symmetry \(\psi \to e^{i\alpha}\psi\) gives a conserved current \(j^\mu\) with \(\partial_\mu j^\mu = 0\) and conserved charge \(Q = \int j^0d^3x\): electric charge, baryon number, lepton number.</p>
<p><b>Spacetime symmetries.</b> Translations give energy–momentum; rotations and boosts give angular momentum and center-of-mass motion.</p>
<p><b>Counting generators.</b> Rotations \(SO(n)\): \(\frac{n(n - 1)}{2}\). The Lorentz group \(SO(3, 1)\): 6 (3 rotations, 3 boosts). The Poincaré group in \(d\) spacetime dimensions: \(\frac{d(d + 1)}{2}\) (10 in four dimensions). Unitary \(SU(N)\): \(N^2 - 1\).</p>
<p><b>Discrete symmetries.</b> C (charge conjugation), P (parity), T (time reversal). The weak force violates P maximally (Wu, 1957) and CP slightly; the CPT theorem says the combination is exact in any local relativistic quantum field theory, so particles and antiparticles have equal masses and lifetimes.</p>
<p><b>Spontaneous breaking.</b> When the vacuum is less symmetric than the laws, massless Goldstone bosons appear, one per broken generator (pions, approximately, from chiral symmetry). In gauge theories they are absorbed instead, giving gauge bosons mass: the Higgs mechanism.</p>`,
      ex: { q: T`How many Goldstone bosons arise when \(SO(3)\) breaks to \(SO(2)\)?`, a: T`<p>Broken generators: \(3 - 1 = 2\). Two Goldstone bosons (spin waves in a ferromagnet are the analogue, with subtleties).</p>` },
      trap: T`Counting the Lorentz group's generators as 4. It has 3 rotations and 3 boosts.`,
      vary: [[T`Generators of the Poincaré group in 4D?`, 10, T`4 + 6.`], [T`Generators of \(SU(3)\)?`, 8, T`\(9 - 1\).`], [T`Goldstone bosons for \(SU(2) \to U(1)\)?`, 2, T`\(3 - 1\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Feynman diagrams are a bookkeeping device for perturbation theory: each picture stands for one term in the expansion of a scattering amplitude, with lines for particles and vertices for interactions.</p>`,
      body: T`
<p><b>Elements.</b> External lines are incoming and outgoing particles; internal lines (propagators) are virtual particles, \(\frac{i}{p^2 - m^2}\) for a scalar; vertices carry the coupling constant and enforce momentum conservation.</p>
<p><b>Order counting.</b> An amplitude with \(V\) vertices of coupling \(g\) is proportional to \(g^V\); the probability goes as \(g^{2V}\). In QED, \(e^-e^- \to e^-e^-\) at lowest order has two vertices: amplitude \(\propto e^2 \propto \alpha\).</p>
<p><b>Loops.</b> For a connected diagram with \(I\) internal lines and \(V\) vertices:</p>
\[L = I - V + 1\]
<p>Tree diagrams have \(L = 0\) and give classical physics; each loop adds a factor of the coupling (and \(\hbar\)) and an unconstrained momentum integral, the source of ultraviolet divergences.</p>
<p><b>Topology.</b> In a theory with only cubic vertices (like \(\phi^3\) or QED's \(\bar\psi\gamma\psi A\)), \(3V = 2I + E\), where \(E\) counts external lines. Combining: \(L = \frac{V - E}{2} + 1\).</p>
<p><b>Channels.</b> For \(2 \to 2\) scattering, the exchanged momentum defines Mandelstam variables \(s = (p_1 + p_2)^2\), \(t = (p_1 - p_3)^2\), \(u = (p_1 - p_4)^2\), with \(s + t + u = \sum m_i^2\).</p>`,
      ex: { q: T`A QED diagram for electron–electron scattering has 4 vertices and 4 external lines. How many loops and internal lines?`, a: T`<p>Cubic vertices: \(3(4) = 2I + 4\), so \(I = 4\). \(L = 4 - 4 + 1 = 1\): a one-loop correction, of relative size about \(\alpha\).</p>` },
      trap: T`Counting external lines as internal. Only lines connecting two vertices are propagators.`,
      vary: [[T`Loops with \(I = 5\), \(V = 4\)?`, 2, T`\(5 - 4 + 1\).`], [T`Power of \(\alpha\) in the cross section for a 2-vertex QED process?`, 2, T`\(e^4 \propto \alpha^2\).`], [T`\(s + t + u\) for four massless particles?`, 0, T`Sum of masses squared.`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Experiments measure rates. A cross section is the effective target area a particle presents; multiplied by how many collisions a machine delivers, it gives the number of events. A decay width is the inverse lifetime.</p>`,
      body: T`
<p><b>Units.</b> 1 barn = \(10^{-28}\) m\(^2\) = 100 fm\(^2\). Typical: total proton–proton about 100 mb at the LHC; Higgs production about 50 pb; rare processes in fb.</p>
<p><b>Event counts:</b> \(N = \sigma\mathcal L_{\text{int}}\), with integrated luminosity in inverse barns. Example: \(\sigma = 50\) pb and \(\mathcal L_{\text{int}} = 140\) fb\(^{-1}\) give \(50\times10^3\) fb \(\times140\) fb\(^{-1} = 7\times10^6\) Higgs bosons.</p>
<p><b>Decay width.</b> \(\Gamma = \frac{\hbar}{\tau}\); total width is the sum of partial widths, and the branching ratio is \(\frac{\Gamma_i}{\Gamma}\). Z boson: \(\Gamma = 2.495\) GeV, \(\tau \approx 2.6\times10^{-25}\) s.</p>
<p><b>Breit–Wigner resonance.</b> Near a resonance of mass \(M\), \(\sigma(E) \propto \frac{\Gamma^2/4}{(E - M)^2 + \Gamma^2/4}\): a peak whose full width at half maximum is \(\Gamma\).</p>
<p><b>Fermi's golden rule.</b> Rate \(= 2\pi|M|^2\rho\) (density of final states). For a two-body decay of a particle at rest, \(\Gamma = \frac{|\mathbf p|}{8\pi M^2}|\mathcal M|^2\).</p>
<p><b>Distance traveled</b> before decay: \(\gamma\beta c\tau\). A B meson (\(c\tau = 455\) µm) with \(\gamma\beta = 10\) flies about 4.6 mm, enough to see a displaced vertex.</p>`,
      ex: { q: T`A process has \(\sigma = 2\) fb. How many events are expected in 300 fb\(^{-1}\)?`, a: T`<p>\(2\times300 = 600\) events.</p>` },
      trap: T`Mixing up pb and fb. 1 pb = 1000 fb.`,
      vary: [[T`Events for \(\sigma = 1\) pb in 1 fb\(^{-1}\)?`, 1000, T`\(1000\) fb \(\times\) 1 fb\(^{-1}\).`], [T`Lifetime (units \(10^{-25}\) s) for \(\Gamma = 2.495\) GeV, three decimals.`, HBAR / 2.495 * 1e25, T`\(\hbar/\Gamma\).`], [T`FWHM of a Breit–Wigner with \(\Gamma = 0.1\) GeV (GeV)?`, 0.1, T`\(\Gamma\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Quantum electrodynamics, the quantum theory of light and charge, is the most precisely tested theory in science. Its strength is set by one number, the fine-structure constant, about 1/137.</p>`,
      body: T`
\[\alpha = \frac{e^2}{4\pi\varepsilon_0\hbar c} \approx \frac{1}{137.036}\]
<p>Because \(\alpha\) is small, perturbation theory converges quickly (at first): each order is about 100 times smaller.</p>
<p><b>Electron \(g - 2\).</b> Schwinger's one-loop result \(a_e = \frac{g - 2}{2} = \frac{\alpha}{2\pi} \approx 0.00116\). Including five loops, theory and experiment agree to about one part in \(10^{12}\).</p>
<p><b>\(e^+e^- \to \mu^+\mu^-\)</b> at energies far above the muon mass:</p>
\[\sigma = \frac{4\pi\alpha^2}{3s} \approx \frac{86.8\text{ nb}}{s/\text{GeV}^2}\]
<p>At \(\sqrt s = 10\) GeV: 0.868 nb. The \(\frac1s\) fall-off is dimensional analysis in action.</p>
<p><b>Other processes:</b> Compton scattering, pair annihilation \(e^+e^- \to \gamma\gamma\), bremsstrahlung, and the Lamb shift (a 1057 MHz splitting between hydrogen's \(2s\) and \(2p_{1/2}\) levels, from vacuum fluctuations).</p>
<p><b>Ratio R.</b> \(R = \frac{\sigma(e^+e^- \to \text{hadrons})}{\sigma(e^+e^- \to \mu^+\mu^-)} = 3\sum_qQ_q^2\). Below the charm threshold (u, d, s): \(3\left(\frac49 + \frac19 + \frac19\right) = 2\). The factor 3 is the number of quark colors.</p>`,
      ex: { q: T`Find \(\sigma(e^+e^- \to \mu^+\mu^-)\) at \(\sqrt s = 30\) GeV.`, a: T`<p>\(s = 900\) GeV\(^2\). \(\sigma = \frac{86.8}{900} \approx 0.0964\) nb \(= 96.4\) pb.</p>` },
      trap: T`Using \(\sqrt s\) instead of \(s\) in the \(\frac1s\) formula.`,
      vary: [[T`\(\frac{\alpha}{2\pi}\), five decimals.`, 1 / 137.036 / (2 * Math.PI), T`Schwinger's term.`], [T`R with u, d, s, c quarks, four decimals.`, 10 / 3, T`\(3(\frac49 + \frac19 + \frac19 + \frac49)\).`], [T`\(\sigma\) (nb) at \(\sqrt s = 10\) GeV, three decimals.`, 0.868, T`\(\frac{86.8}{100}\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>All the forces of the Standard Model come from one principle: demand that a symmetry hold separately at every point of spacetime, and you are forced to introduce gauge fields, the force carriers.</p>`,
      body: T`
<p><b>Gauge principle.</b> Making \(\psi \to e^{i\alpha(x)}\psi\) a symmetry requires a field \(A_\mu\) transforming as \(A_\mu \to A_\mu - \frac1e\partial_\mu\alpha\): that is electromagnetism, with a massless photon. Non-abelian groups (Yang–Mills) give self-interacting gauge bosons, one per generator.</p>
<p><b>Standard Model group</b> \(SU(3)_C \times SU(2)_L \times U(1)_Y\):</p>
<table class="tt"><tr><th>Factor</th><th>Bosons</th><th>Force</th></tr>
<tr><td>\(SU(3)\)</td><td>8 gluons</td><td>strong</td></tr>
<tr><td>\(SU(2)\times U(1)\)</td><td>\(W^\pm\), \(Z\), \(\gamma\) (3 + 1)</td><td>electroweak</td></tr></table>
<p>Total: \(8 + 3 + 1 = 12\) gauge bosons.</p>
<p><b>Higgs mechanism.</b> The Higgs field's vacuum value \(v = 246\) GeV breaks \(SU(2)\times U(1)\) to electromagnetism. Three would-be Goldstone bosons become the longitudinal modes of \(W^\pm\) and \(Z\), which gain mass: \(m_W = \frac{gv}{2} \approx 80.4\) GeV, \(m_Z = \frac{m_W}{\cos\theta_W} \approx 91.2\) GeV. Fermion masses come from Yukawa couplings \(m_f = \frac{y_fv}{\sqrt2}\); the top quark has \(y_t \approx 1\).</p>
<p><b>Matter.</b> Three generations, each with two quarks (in three colors) and two leptons. Electric charge \(Q = T_3 + \frac Y2\). Anomalies cancel only when quark and lepton charges are as observed, a deep consistency check.</p>`,
      ex: { q: T`From \(m_W = 80.4\) GeV and \(m_Z = 91.19\) GeV, find \(\sin^2\theta_W\).`, a: T`<p>\(\cos^2\theta_W = \left(\frac{80.4}{91.19}\right)^2 = 0.7774\), so \(\sin^2\theta_W \approx 0.223\).</p>` },
      trap: T`Counting the photon in \(SU(2)\). It is a mixture of the neutral \(SU(2)\) boson and the \(U(1)\) boson.`,
      vary: [[T`Gauge bosons of \(SU(5)\)?`, 24, T`\(25 - 1\).`], [T`Standard Model gauge bosons?`, 12, T`8 + 3 + 1.`], [T`Top Yukawa for \(m_t = 173\) GeV, \(v = 246\), three decimals.`, 173 * Math.SQRT2 / 246, T`\(\frac{\sqrt2m_t}{v}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Loop diagrams are infinite, yet QFT makes finite predictions. Renormalization absorbs the infinities into measured parameters, and the price is that coupling "constants" change with the energy scale.</p>`,
      body: T`
<p><b>Renormalization.</b> Express predictions in terms of physically measured quantities (the electron's charge and mass at some scale); the divergences cancel between bare parameters and loops. Renormalizable theories need only finitely many such inputs.</p>
<p><b>Running QED coupling.</b> Vacuum polarization screens charge, so \(\alpha\) grows with energy. One loop, one charged fermion of mass \(m\), for \(Q \gg m\):</p>
\[\alpha(Q) = \frac{\alpha}{1 - \frac{\alpha}{3\pi}\ln\frac{Q^2}{m^2}}\]
<p>With all charged particles, \(\alpha(m_Z) \approx \frac{1}{128}\).</p>
<p><b>QCD: asymptotic freedom.</b> Gluon self-interactions antiscreen, so the strong coupling falls at high energy:</p>
\[\alpha_s(Q) = \frac{12\pi}{(33 - 2n_f)\ln(Q^2/\Lambda^2)}\]
<p>With \(n_f = 5\), \(\Lambda \approx 0.2\) GeV: \(\alpha_s(91\text{ GeV}) \approx 0.134\) at one loop (the measured value is 0.118). At low energy \(\alpha_s\) becomes large and quarks are confined. Gross, Wilczek, and Politzer received the 2004 Nobel Prize for this.</p>
<p><b>Unification.</b> Extrapolated, the three Standard Model couplings come close to meeting near \(10^{15}\)–\(10^{16}\) GeV, the motivation for grand unified theories.</p>
<p><b>Effective field theory.</b> Physics at low energy does not depend on the details at high energy except through a few parameters: the modern view of why renormalization works.</p>`,
      ex: { q: T`Compute the one-loop \(\alpha_s\) at \(Q = 10\) GeV with \(n_f = 5\), \(\Lambda = 0.2\) GeV.`, a: T`<p>\(\ln\frac{100}{0.04} = \ln2500 = 7.824\). \(\alpha_s = \frac{12\pi}{23\cdot7.824} \approx 0.2095\).</p>` },
      trap: T`Expecting the strong coupling to grow with energy like QED's. Asymptotic freedom makes it shrink.`,
      vary: [[T`\(33 - 2n_f\) for \(n_f = 6\)?`, 21, T`Still positive: asymptotic freedom holds.`], [T`Largest \(n_f\) keeping QCD asymptotically free?`, 16, T`\(33 - 2n_f > 0\).`]] }
  ]);

  addQuestions('qft', [
    { id: 'qf1', skill: U[1], q: T`The negative-energy solutions of relativistic wave equations are interpreted in field theory as:`, c: ['antiparticles', 'unphysical and discarded', 'tachyons', 'bound states'], x: T`Dirac's sea, reinterpreted by field quantization.` },
    { id: 'qf2', skill: U[2], q: T`Anticommuting creation and annihilation operators imply:`, c: ['Fermi statistics and Pauli exclusion', 'Bose statistics', 'massless particles', 'charge conservation'], x: T`\(b^{\dagger2} = 0\).` },
    { id: 'qf3', skill: U[3], q: T`The CPT theorem implies that particles and antiparticles have equal:`, c: ['masses and lifetimes', 'charges', 'magnetic moments of the same sign', 'baryon numbers'], x: T`CPT maps a particle to its antiparticle.` },
    { id: 'qf4', skill: U[4], q: T`Tree-level Feynman diagrams (no loops) correspond to:`, c: ['the classical limit', 'vacuum energy', 'renormalization', 'ultraviolet divergences'], x: T`Loops carry powers of \(\hbar\).` },
    { id: 'qf5', skill: U[7], q: T`The W and Z bosons acquire mass through:`, c: ['the Higgs mechanism', 'confinement', 'Yukawa couplings', 'the Casimir effect'], x: T`They absorb the would-be Goldstone bosons.` },
    { id: 'qf6', skill: U[8], q: T`Asymptotic freedom means the strong coupling:`, c: ['decreases at high energy', 'increases at high energy', 'is constant', 'vanishes at low energy'], x: T`Gluon self-interactions antiscreen color charge.` }
  ]);

  // ======================= GENERATORS =======================
  registerUnitGens('qft', { units: {
    [U[0]]: [{ id: 'qf-units', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const m = R.pick([['proton', 0.93827], ['pion', 0.13957], ['electron', 0.000511], ['W boson', 80.37], ['kaon', 0.49368]]), lam = HBC / m[1]; return { q: T`Find the reduced Compton wavelength \(\frac{\hbar}{mc}\) of the ${m[0]} (\(m = ${m[1]}\) GeV) in fm, to four significant figures.`, answer: lam, tol: lam * 1e-3, x: T`\(\frac{\hbar c}{mc^2} = \frac{0.19733\text{ GeV fm}}{${m[1]}\text{ GeV}}\).`, v: `1.054571817e-34*2.99792458e8/(${m[1]}*1.602176634e-10)*1e15` }; }
      if (k === 1) { const tau = R.pick([1e-23, 2.6e-25, 8.5e-17, 1e-20]), G = HBAR / tau, ex = Math.floor(Math.log10(G)); return { q: T`A particle has lifetime \(${tau.toExponential(1).replace(/e(-?\d+)/, (mm, e) => `\\times10^{${+e}}`)}\) s. Find its width \(\Gamma\) in GeV, as a coefficient times \(10^{${ex}}\), to three decimals.`, answer: G / 10 ** ex, tol: 0.001, x: T`\(\Gamma = \frac{\hbar}{\tau}\) with \(\hbar = 6.582\times10^{-25}\) GeV s.`, v: `1.054571817e-34/1.602176634e-10/${tau}/10**${ex}` }; }
      const E = R.pick([1, 10, 100, 1000, 13600]); return { q: T`Find the distance scale \(\frac{\hbar c}{E}\) in fm probed at \(E = ${E}\) GeV, as a coefficient times \(10^{${Math.floor(Math.log10(HBC / E))}}\), to three decimals.`, answer: HBC / E / 10 ** Math.floor(Math.log10(HBC / E)), tol: 0.001, x: T`\(\frac{0.1973}{${E}}\) fm.`, v: `1.054571817e-34*2.99792458e8/(${E}*1.602176634e-10)*1e15/10**${Math.floor(Math.log10(HBC / E))}` };
    } }],
    [U[1]]: [{ id: 'qf-kg', make(R) {
      const k = R.int(0, 2), p = R.pick([0.5, 1, 2, 5, 10]), m = R.pick([0.13957, 0.93827, 0.105658, 1.5]);
      if (k === 0) return { q: T`A particle of mass ${m} GeV has momentum ${p} GeV. Find its energy in GeV, to four decimals.`, answer: Math.sqrt(p * p + m * m), tol: 1e-4, x: T`\(E = \sqrt{p^2 + m^2}\).`, v: `(lambda E: [s for s in solve(E**2 - ${p}**2 - nsimplify(${m})**2, E) if s > 0][0])(Symbol('E'))` };
      if (k === 1) return { q: T`A particle of mass ${m} GeV has momentum ${p} GeV. Find its group velocity \(\frac{dE}{dp}\), to four decimals.`, answer: p / Math.sqrt(p * p + m * m), tol: 1e-4, x: T`\(\frac{dE}{dp} = \frac pE\).`, v: `diff(sqrt(Symbol('p')**2 + nsimplify(${m})**2), Symbol('p')).subs(Symbol('p'), nsimplify(${p}))` };
      const mu = R.pick([0.13957, 0.5, 0.0005]), r = R.pick([1, 2, 5]), ratio = Math.exp(-mu * r / HBC); return { q: T`A Yukawa potential from exchange of a ${mu} GeV particle. At \(r = ${r}\) fm, find the suppression factor \(e^{-mr}\) relative to Coulomb, to four decimals.`, answer: ratio, tol: 1e-4, x: T`\(mr = \frac{${mu}\cdot${r}}{0.1973} = ${R.fmt(mu * r / HBC, 4)}\).`, v: `exp(-${mu}*${r}/(1.054571817e-34*2.99792458e8/1.602176634e-10*1e15))` };
    } }],
    [U[2]]: [{ id: 'qf-occ', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const w = [1, 2, 3, 4].slice(0, R.int(2, 4)), n = w.map(() => R.int(0, 3)); return { q: T`Modes have frequencies \(${w.join(', ')}\) with occupation numbers \(${n.join(', ')}\). Find the energy above the vacuum.`, answer: w.reduce((s, x, i) => s + x * n[i], 0), x: T`\(\sum n_k\omega_k = ${w.map((x, i) => `${n[i]}\\cdot${x}`).join(' + ')}\).`, v: `(lambda H: H.subs({Symbol('n%d' % i): v for i, v in enumerate([${n}])}))(sum(Symbol('n%d' % i)*w for i, w in enumerate([${w}])))` }; }
      const N = R.int(2, 4), M = R.int(2, 4), bos = R.int(0, 1); const C = (a, b) => { let r = 1; for (let i = 1; i <= b; i++) r = r * (a - b + i) / i; return Math.round(r); }; const ans = bos ? C(N + M - 1, N) : C(M, N);
      if (!bos && N > M) return this.make(R);
      return { q: T`How many distinct states have ${N} identical ${bos ? 'bosons' : 'fermions (one spin state)'} distributed over ${M} modes?`, answer: ans, x: bos ? T`Occupation numbers summing to ${N}: \(\binom{${N + M - 1}}{${N}}\).` : T`Each mode holds 0 or 1: choose ${N} of ${M}, \(\binom{${M}}{${N}}\).`, v: `sum(1 for t in product(range(${bos ? N + 1 : 2}), repeat=${M}) if sum(t) == ${N})` };
    } }],
    [U[3]]: [{ id: 'qf-sym', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const n = R.int(2, 6), grp = R.pick(['SO', 'SU']), val = grp === 'SO' ? n * (n - 1) / 2 : n * n - 1; return { q: T`How many generators does \(${grp}(${n})\) have?`, answer: val, x: grp === 'SO' ? T`Antisymmetric real matrices: \(\frac{n(n - 1)}{2}\).` : T`Traceless Hermitian matrices: \(n^2 - 1\).`, v: grp === 'SO' ? `len([(i, j) for i in range(${n}) for j in range(i + 1, ${n})])` : `${n}**2 - 1` }; }
      if (k === 1) { const d = R.int(2, 11); return { q: T`How many generators does the Poincaré group have in ${d} spacetime dimensions?`, answer: d * (d + 1) / 2, x: T`\(d\) translations plus \(\frac{d(d - 1)}{2}\) Lorentz generators.`, v: `${d} + len([(i, j) for i in range(${d}) for j in range(i + 1, ${d})])` }; }
      const P = [['SU(2)', 'U(1)', 3, 1], ['SO(3)', 'SO(2)', 3, 1], ['SU(3)', 'SU(2)', 8, 3], ['SO(4)', 'SO(3)', 6, 3], ['SU(2)\\times SU(2)', 'SU(2)', 6, 3], ['SU(3)\\times SU(3)', 'SU(3)', 16, 8]], [g, h, a, b] = R.pick(P);
      return { q: T`How many Goldstone bosons appear when a global \(${g}\) symmetry breaks to \(${h}\)?`, answer: a - b, x: T`One per broken generator: \(${a} - ${b}\).`, v: `${a} - ${b}` };
    } }],
    [U[4]]: [{ id: 'qf-feyn', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const V = R.int(2, 8), E = R.pick([2, 4]); if ((3 * V - E) % 2) return this.make(R); const I = (3 * V - E) / 2, L = I - V + 1; if (L < 0) return this.make(R);
        return { q: T`A connected diagram in a theory with only cubic vertices has ${V} vertices and ${E} external lines. How many loops does it have?`, answer: L, x: T`\(3V = 2I + E\) gives \(I = ${I}\); \(L = I - V + 1 = ${L}\).`, v: `(lambda I: I - ${V} + 1)(solve(3*${V} - 2*Symbol('I') - ${E}, Symbol('I'))[0])` }; }
      const V = R.int(2, 6); return { q: T`A QED amplitude has ${V} vertices. To what power of \(\alpha\) is the corresponding rate proportional?`, answer: V, x: T`Amplitude \(\propto e^{${V}}\); rate \(\propto e^{${2 * V}} \propto \alpha^{${V}}\).`, v: `degree((Symbol('e')**${V})**2, Symbol('e'))//2` };
    } }],
    [U[5]]: [{ id: 'qf-xsec', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const [s, u] = R.pick([[50, 'pb'], [2, 'fb'], [0.5, 'pb'], [10, 'fb'], [100, 'fb']]), L = R.pick([1, 36, 140, 300, 3000]), N = s * (u === 'pb' ? 1000 : 1) * L; return { q: T`A process has \(\sigma = ${s}\) ${u}. How many events are expected in ${L} fb\(^{-1}\)?`, answer: N, tol: 1e-6, x: T`\(N = \sigma\mathcal L = ${s * (u === 'pb' ? 1000 : 1)}\text{ fb}\times${L}\text{ fb}^{-1}\).`, v: `${s}e-${u === 'pb' ? 36 : 39}*${L}e39` }; }
      if (k === 1) { const ct = R.pick([455, 312, 26.8e3, 7.8e3]), gb = R.pick([1, 5, 10, 20]); return { q: T`A particle has \(c\tau = ${ct}\) µm and \(\gamma\beta = ${gb}\). Find its mean flight distance in mm, to three decimals.`, answer: ct * gb / 1000, tol: 0.001, x: T`\(\gamma\beta c\tau\).`, v: `${ct}*${gb}/1000` }; }
      const br = R.pick([[2.495, 0.0337], [2.085, 0.1071], [0.0041, 0.58]]), [Gt, b] = br; return { q: T`A particle has total width ${Gt} GeV and a branching ratio ${b} to some channel. Find that partial width in MeV, to three decimals.`, answer: Gt * b * 1000, tol: 0.001, x: T`\(\Gamma_i = \text{BR}\cdot\Gamma\).`, v: `${Gt}*${b}*1000` };
    } }],
    [U[6]]: [{ id: 'qf-qed', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const rs = R.pick([10, 30, 58, 91.2, 200]), s = rs * rs, sig = 4 * Math.PI / (3 * 137.036 ** 2 * s) * 0.3893794 * 1e9; return { q: T`Find \(\sigma(e^+e^- \to \mu^+\mu^-)\) at \(\sqrt s = ${rs}\) GeV (QED only), in pb, to two decimals.`, answer: sig, tol: Math.max(0.01, sig * 1e-4), x: T`\(\frac{4\pi\alpha^2}{3s}\) converted with \((\hbar c)^2 = 0.3894\) GeV\(^2\) mb: \(\frac{86.8\text{ nb}}{${s}}\).`, v: `4*pi*(1/137.036)**2/(3*${s})*0.3893794*1e9` }; }
      if (k === 1) { const Q = R.pick([['u, d, s', [2 / 3, -1 / 3, -1 / 3]], ['u, d, s, c', [2 / 3, -1 / 3, -1 / 3, 2 / 3]], ['u, d, s, c, b', [2 / 3, -1 / 3, -1 / 3, 2 / 3, -1 / 3]]]), r = 3 * Q[1].reduce((a, q) => a + q * q, 0); return { q: T`Find \(R = 3\sum_qQ_q^2\) with active quarks ${Q[0]}, to four decimals.`, answer: r, tol: 1e-4, x: T`\(3\left(${Q[1].map(q => (q > 0 ? '\\frac49' : '\\frac19')).join(' + ')}\right)\).`, v: `3*sum(q**2 for q in [${Q[1].map(q => (q > 0 ? 'Rational(2, 3)' : 'Rational(-1, 3)')).join(', ')}])` }; }
      return { q: T`Find Schwinger's \(a_e = \frac{\alpha}{2\pi}\) with \(\alpha = 1/137.036\), in units of \(10^{-3}\), to four decimals.`, answer: 1 / 137.036 / (2 * Math.PI) * 1000, tol: 1e-4, x: T`\(\frac{1}{2\pi\cdot137.036}\).`, v: `1000/(2*pi*137.036)` };
    } }],
    [U[7]]: [{ id: 'qf-sm', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const N = R.int(2, 6); return { q: T`How many gauge bosons does an \(SU(${N})\) gauge theory have?`, answer: N * N - 1, x: T`One per generator: \(N^2 - 1\).`, v: `len([1 for i in range(${N}) for j in range(${N})]) - 1` }; }
      if (k === 1) { const mW = R.pick([80.37, 80.4, 79.8]), mZ = 91.1876; return { q: T`From \(m_W = ${mW}\) GeV and \(m_Z = ${mZ}\) GeV, find \(\sin^2\theta_W\), to four decimals.`, answer: 1 - (mW / mZ) ** 2, tol: 1e-4, x: T`\(1 - \left(\frac{m_W}{m_Z}\right)^2\).`, v: `sin(acos(${mW}/${mZ}))**2` }; }
      const F = [['top', 172.7], ['bottom', 4.18], ['tau', 1.777], ['muon', 0.10566], ['electron', 0.000511], ['charm', 1.27]], [f, m] = R.pick(F), y = Math.SQRT2 * m / 246.22, ex = Math.floor(Math.log10(y));
      return { q: T`Find the Yukawa coupling \(y = \frac{\sqrt2m}{v}\) of the ${f} (\(m = ${m}\) GeV, \(v = 246.22\) GeV), as a coefficient times \(10^{${ex}}\), to three decimals.`, answer: y / 10 ** ex, tol: 0.001, x: T`\(\frac{\sqrt2\cdot${m}}{246.22}\).`, v: `solve(Symbol('y')*246.22/sqrt(2) - ${m}, Symbol('y'))[0]/10**${ex}` };
    } }],
    [U[8]]: [{ id: 'qf-run', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const Q = R.pick([5, 10, 30, 91.19, 1000]), nf = R.pick([4, 5, 6]), L = R.pick([0.2, 0.25]), a = 12 * Math.PI / ((33 - 2 * nf) * Math.log(Q * Q / (L * L))); return { q: T`Find the one-loop \(\alpha_s(Q)\) at \(Q = ${Q}\) GeV with \(n_f = ${nf}\) and \(\Lambda = ${L}\) GeV, to four decimals.`, answer: a, tol: 1e-4, x: T`\(\frac{12\pi}{${33 - 2 * nf}\ln(${Q}^2/${L}^2)}\).`, v: `(lambda t: 1/(1/Symbol('a0') + (33 - 2*${nf})/(12*pi)*t).subs(Symbol('a0'), oo))(log(${Q}**2/${L}**2))` }; }
      const m = 0.000511, Q = R.pick([1, 10, 91.19]), a0 = 1 / 137.036, a = a0 / (1 - a0 / (3 * Math.PI) * Math.log(Q * Q / (m * m)));
      return { q: T`Using only the electron loop, find \(1/\alpha(Q)\) at \(Q = ${Q}\) GeV (start from \(1/\alpha = 137.036\) at \(m_e = 0.511\) MeV), to three decimals.`, answer: 1 / a, tol: 0.001, x: T`\(\frac1{\alpha(Q)} = \frac1\alpha - \frac{1}{3\pi}\ln\frac{Q^2}{m_e^2}\).`, v: `137.036 - integrate(Rational(2, 3)/(pi*Symbol('mu')), (Symbol('mu'), ${m}, ${Q}))` };
    } }]
  } });
})();
