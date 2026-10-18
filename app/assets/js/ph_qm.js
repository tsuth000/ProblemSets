'use strict';
// Theoretical physics track: Quantum mechanics. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'qm', name: 'Quantum mechanics', color: '#3B3F7A', blurb: 'Wavefunctions and the Born rule, operators and uncertainty, wells, the oscillator, tunneling, spin, angular momentum, hydrogen, perturbation theory, identical particles', questions: [], generators: [] });
  const U = ['Wavefunctions and the Born rule', 'Operators and uncertainty', 'The infinite square well', 'The harmonic oscillator', 'Steps, barriers, and tunneling', 'Spin one-half', 'Angular momentum', 'The hydrogen atom', 'Perturbation theory', 'Time evolution and identical particles'];
  const HC = 197.327, MEC2 = 510999, E1NM = (HC * Math.PI) ** 2 / (2 * MEC2); // electron in 1 nm box, eV

  registerLearn('qm', [
    { title: U[0], skill: U[0],
      hook: T`<p>In quantum mechanics a particle is described by a wavefunction \(\psi(x)\), and \(|\psi|^2\) is a probability density. Every prediction is a probability computed from it.</p>`,
      body: T`
<p><b>Born rule.</b> The probability of finding the particle in \([a, b]\) is \(\int_a^b|\psi(x)|^2dx\). The wavefunction must be <b>normalized</b>: \(\int|\psi|^2 = 1\).</p>
<p><b>Normalizing.</b> \(\psi = Ax(L - x)\) on \([0, L]\): \(\int_0^LA^2x^2(L - x)^2dx = A^2\frac{L^5}{30}\), so \(A = \sqrt{\frac{30}{L^5}}\).</p>
<p><b>Infinite well states</b> \(\psi_n = \sqrt{\frac2L}\sin\frac{n\pi x}{L}\). The probability of the left quarter in the ground state:</p>
\[\int_0^{L/4}\frac2L\sin^2\frac{\pi x}{L}dx = \frac14 - \frac{1}{2\pi} \approx 0.091\]
<p>For large \(n\) the probability of any region approaches its classical share (\(\frac14\) here): the correspondence principle.</p>
<p><b>Global phase.</b> \(\psi\) and \(e^{i\alpha}\psi\) describe the same state. Relative phases between components do matter (interference).</p>
<p><b>Superposition.</b> If \(\psi = c_1\psi_1 + c_2\psi_2\) with orthonormal \(\psi_i\), a measurement of the corresponding observable yields outcome \(i\) with probability \(|c_i|^2\), so \(|c_1|^2 + |c_2|^2 = 1\).</p>`,
      ex: { q: T`\(\psi = \frac{1}{\sqrt5}(\psi_1 + 2\psi_2)\) in an infinite well. What is the probability of measuring \(E_2\)?`, a: T`<p>\(\left|\frac{2}{\sqrt5}\right|^2 = \frac45\). The state is normalized since \(\frac15 + \frac45 = 1\).</p>` },
      trap: T`Treating \(\psi\) itself as the probability. The density is \(|\psi|^2\).`,
      vary: [[T`Probability of the left half of a well in any stationary state?`, 0.5, T`Symmetric densities.`], [T`\(A\) for \(\psi = Ae^{-|x|}\) on \(\mathbb R\)?`, 1, T`\(\int e^{-2|x|} = 1\).`], [T`\(|c_2|^2\) for \(\psi = \frac{3}{5}\psi_1 + \frac45\psi_2\)?`, 0.64, T`\(\frac{16}{25}\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Observables are operators, and measured values are their eigenvalues. Operators that fail to commute cannot have sharp values simultaneously, which is the content of the uncertainty principle.</p>`,
      body: T`
<p><b>Position and momentum:</b> \(\hat x\psi = x\psi\), \(\hat p\psi = -i\hbar\psi'\). Their commutator:</p>
\[[\hat x, \hat p] = i\hbar\]
<p><b>Expectation values:</b> \(\langle A\rangle = \int\psi^*\hat A\psi\,dx\), and \(\sigma_A^2 = \langle A^2\rangle - \langle A\rangle^2\).</p>
<p><b>Uncertainty principle:</b> \(\sigma_A\sigma_B \ge \frac12|\langle[\hat A, \hat B]\rangle|\). For \(x\) and \(p\): \(\sigma_x\sigma_p \ge \frac\hbar2\), with equality for Gaussians.</p>
<p><b>Infinite well</b> (\(\psi_n\) on \([0, L]\)): \(\langle x\rangle = \frac L2\), \(\langle x^2\rangle = L^2\left(\frac13 - \frac{1}{2n^2\pi^2}\right)\), \(\langle p\rangle = 0\), \(\langle p^2\rangle = \left(\frac{n\pi\hbar}{L}\right)^2\). So \(\sigma_x\sigma_p = \frac\hbar2\sqrt{\frac{n^2\pi^2}{3} - 2}\), about \(0.568\hbar\) for \(n = 1\).</p>
<p><b>Hermitian operators</b> have real eigenvalues and orthogonal eigenvectors, matching real measurement outcomes. Compatible observables (commuting operators) share a complete set of eigenfunctions.</p>
<p><b>Ehrenfest's theorem:</b> \(\frac{d\langle x\rangle}{dt} = \frac{\langle p\rangle}{m}\), \(\frac{d\langle p\rangle}{dt} = -\langle V'(x)\rangle\): expectation values follow Newton's laws approximately.</p>`,
      ex: { q: T`Compute \([\hat x^2, \hat p]\).`, a: T`<p>\([\hat x^2, \hat p] = \hat x[\hat x, \hat p] + [\hat x, \hat p]\hat x = 2i\hbar\hat x\).</p>` },
      trap: T`Assuming \(\hat x\hat p = \hat p\hat x\). Order matters for operators.`,
      vary: [[T`Minimum \(\sigma_x\sigma_p\) in units of \(\hbar\)?`, 0.5, T`Gaussian.`], [T`\(\langle x\rangle\) for any infinite-well eigenstate with \(L = 6\)?`, 3, T`Center.`], [T`\(\langle p^2\rangle\) for \(n = 2\), \(L = \pi\), \(\hbar = 1\)?`, 4, T`\((2\pi/\pi)^2\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Confine a particle between hard walls and only standing waves fit, so the energy comes in discrete levels. This simplest quantum system already explains the colors of dyes and the sizes of quantum dots.</p>`,
      body: T`
<p>\(-\frac{\hbar^2}{2m}\psi'' = E\psi\) on \(0 < x < L\) with \(\psi(0) = \psi(L) = 0\):</p>
\[\psi_n = \sqrt{\tfrac2L}\sin\frac{n\pi x}{L},\qquad E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}\]
<p>For an electron in a 1 nm box, \(E_1 = \frac{(\pi\hbar c)^2}{2m_ec^2L^2} \approx 0.376\) eV, and \(E_n = 0.376\,n^2/L^2\) eV with \(L\) in nm.</p>
<p><b>Transitions.</b> A photon emitted from \(n_i \to n_f\) carries \(\Delta E = E_1(n_i^2 - n_f^2)\), with wavelength \(\lambda = \frac{hc}{\Delta E} = \frac{1239.84\text{ eV nm}}{\Delta E}\).</p>
<p><b>Features.</b> Zero-point energy \(E_1 > 0\) (a confined particle cannot be at rest, by uncertainty). Level spacing grows with \(n\). Shrinking the box raises all levels as \(\frac{1}{L^2}\): smaller quantum dots glow bluer.</p>
<p><b>Finite well.</b> With finite depth the wavefunction leaks into the walls as \(e^{-\kappa|x|}\), lowering the energies, and only finitely many bound states exist. A 1D well always has at least one bound state.</p>
<p><b>3D box</b> \(L\times L\times L\): \(E = E_1(n_x^2 + n_y^2 + n_z^2)\), with degeneracies (\(E = 6E_1\) from (2,1,1) and permutations: threefold).</p>`,
      ex: { q: T`An electron in a 0.5 nm box drops from \(n = 2\) to \(n = 1\). Find the photon wavelength.`, a: T`<p>\(E_1 = \frac{0.376}{0.25} = 1.504\) eV. \(\Delta E = 3E_1 = 4.51\) eV. \(\lambda = \frac{1239.84}{4.51} \approx 275\) nm (ultraviolet).</p>` },
      trap: T`Letting \(n = 0\) count as the ground state. \(\psi_0 = 0\) is not a state.`,
      vary: [[T`\(E_3/E_1\)?`, 9, T`\(n^2\).`], [T`Degeneracy of \(E = 3E_1\) in a cubic box?`, 1, T`Only (1,1,1).`], [T`Degeneracy of \(E = 9E_1\) in a cubic box?`, 3, T`(2,2,1) and permutations.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Every smooth potential looks like a parabola near its minimum, so the quantum harmonic oscillator appears everywhere: molecular vibrations, phonons, photons. Its evenly spaced ladder of levels is built with two operators.</p>`,
      body: T`
\[E_n = \left(n + \tfrac12\right)\hbar\omega,\qquad n = 0, 1, 2, \ldots\]
<p><b>Ladder operators.</b> \(\hat a = \sqrt{\frac{m\omega}{2\hbar}}\left(\hat x + \frac{i\hat p}{m\omega}\right)\), with \([\hat a, \hat a^\dagger] = 1\) and \(\hat H = \hbar\omega(\hat a^\dagger\hat a + \frac12)\).</p>
\[\hat a^\dagger|n\rangle = \sqrt{n + 1}\,|n + 1\rangle,\qquad \hat a|n\rangle = \sqrt n\,|n - 1\rangle\]
<p><b>Position and momentum:</b> \(\hat x = \sqrt{\frac{\hbar}{2m\omega}}(\hat a + \hat a^\dagger)\). So \(\langle n|\hat x|n\rangle = 0\) and \(\langle n|\hat x^2|n\rangle = \frac{\hbar}{m\omega}\left(n + \frac12\right)\). The only nonzero \(\langle m|\hat x|n\rangle\) have \(m = n \pm 1\): \(\langle n + 1|\hat x|n\rangle = \sqrt{\frac{\hbar}{2m\omega}}\sqrt{n + 1}\).</p>
<p><b>Ground state:</b> \(\psi_0 \propto e^{-m\omega x^2/2\hbar}\), a Gaussian with \(\sigma_x\sigma_p = \frac\hbar2\). <b>Virial theorem:</b> \(\langle T\rangle = \langle V\rangle = \frac{E_n}{2}\).</p>
<p><b>Selection rule.</b> Dipole transitions change \(n\) by \(\pm1\), so a vibrating molecule emits one frequency \(\omega\).</p>
<p><b>Coherent states</b> \(\hat a|\alpha\rangle = \alpha|\alpha\rangle\) oscillate like classical particles and describe laser light.</p>`,
      ex: { q: T`Compute \(\langle 2|\hat a^\dagger\hat a^\dagger|0\rangle\) and \(\langle 1|\hat x^2|1\rangle\) (units \(\hbar = m = \omega = 1\)).`, a: T`<p>\(\hat a^\dagger|0\rangle = |1\rangle\), \(\hat a^\dagger|1\rangle = \sqrt2|2\rangle\): the element is \(\sqrt2\). \(\langle 1|\hat x^2|1\rangle = 1 + \frac12 = 1.5\).</p>` },
      trap: T`Writing \(\hat a^\dagger|n\rangle = \sqrt n|n + 1\rangle\). The factor is \(\sqrt{n + 1}\).`,
      vary: [[T`\(E_3\) in units of \(\hbar\omega\)?`, 3.5, T`\(3 + \frac12\).`], [T`\(\langle 4|\hat a^\dagger|3\rangle\)?`, 2, T`\(\sqrt4\).`], [T`\(\langle 2|\hat x^2|2\rangle\) with \(\hbar = m = \omega = 1\)?`, 2.5, T`\(n + \frac12\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Quantum particles reflect from steps they classically could climb, and pass through barriers they classically could not. Tunneling powers alpha decay, scanning tunneling microscopes, and flash memory.</p>`,
      body: T`
<p><b>Step</b> \(V = 0\) for \(x < 0\), \(V_0\) for \(x > 0\), particle from the left with \(E > V_0\). With \(k_1 = \frac{\sqrt{2mE}}{\hbar}\), \(k_2 = \frac{\sqrt{2m(E - V_0)}}{\hbar}\):</p>
\[R = \left(\frac{k_1 - k_2}{k_1 + k_2}\right)^2,\qquad T = 1 - R = \frac{4k_1k_2}{(k_1 + k_2)^2}\]
<p>Even at \(E = 2V_0\) some reflection occurs: \(\frac{k_2}{k_1} = \frac{1}{\sqrt2}\), \(R \approx 0.029\).</p>
<p><b>Barrier</b> of height \(V_0\) and width \(a\), with \(E < V_0\). Inside, \(\psi \propto e^{-\kappa x}\) with \(\kappa = \frac{\sqrt{2m(V_0 - E)}}{\hbar}\). For a thick barrier:</p>
\[T \approx e^{-2\kappa a}\]
<p>(the exact formula has a prefactor of order 1). For an electron, \(\kappa = \frac{\sqrt{2(511000)(V_0 - E)}}{197.3}\) nm\(^{-1}\) with energies in eV: about 5.12 nm\(^{-1}\) for a 1 eV deficit.</p>
<p><b>Sensitivity.</b> Because \(T\) depends exponentially on width, a 0.1 nm change in gap changes an STM current by an order of magnitude, which is how it resolves single atoms.</p>
<p><b>Gamow factor.</b> Alpha decay rates span 30 orders of magnitude for a modest range of energies, because \(T \approx e^{-2\int\kappa\,dx}\) through the Coulomb barrier.</p>`,
      ex: { q: T`An electron with \(E = 2\) eV meets a 5 eV barrier 0.5 nm wide. Estimate \(T\).`, a: T`<p>\(\kappa = \frac{\sqrt{2(511000)(3)}}{197.3} \approx 8.87\) nm\(^{-1}\). \(T \approx e^{-2(8.87)(0.5)} = e^{-8.87} \approx 1.4\times10^{-4}\).</p>` },
      trap: T`Using \(e^{-\kappa a}\) for the probability. That is the amplitude decay; the probability squares it.`,
      vary: [[T`Step with \(k_2/k_1 = 0.5\): reflection probability, four decimals.`, 1 / 9, T`\((0.5/1.5)^2\).`], [T`Factor change in \(T \approx e^{-2\kappa a}\) when \(a\) doubles, if \(T = 0.01\) before?`, 0.01, T`\(T\) becomes \(10^{-4}\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Spin one-half is the simplest quantum system: two states. It has no classical analogue, yet it underlies magnetic resonance imaging and quantum computing.</p>`,
      body: T`
<p><b>States.</b> \(|\uparrow\rangle = \begin{pmatrix}1\\ 0\end{pmatrix}\), \(|\downarrow\rangle = \begin{pmatrix}0\\ 1\end{pmatrix}\) along \(z\). Spin operators \(\hat S_i = \frac\hbar2\sigma_i\), each with eigenvalues \(\pm\frac\hbar2\).</p>
<p><b>Spin along a direction</b> at polar angle \(\theta\) (in the \(xz\)-plane): \(|{+}\hat n\rangle = \cos\frac\theta2|\uparrow\rangle + \sin\frac\theta2|\downarrow\rangle\). For a particle prepared spin-up along \(z\), a measurement along \(\hat n\) gives \(+\frac\hbar2\) with probability</p>
\[P = \cos^2\frac\theta2\]
<p>At \(\theta = 90°\), 50/50; at \(\theta = 180°\), never up. Expectation \(\langle S_n\rangle = \frac\hbar2\cos\theta\).</p>
<p><b>Sequential Stern–Gerlach.</b> Filtering \(z\)-up, then \(x\)-up, then measuring \(z\) gives \(z\)-down half the time: the \(x\) measurement erases the earlier \(z\) information.</p>
<p><b>Larmor precession.</b> In a field \(B\hat z\), \(\hat H = -\gamma B\hat S_z\), and the spin precesses about \(z\) at \(\omega = \gamma B\). For protons, \(\frac{\gamma}{2\pi} = 42.58\) MHz/T: MRI at 3 T runs at 128 MHz.</p>
<p><b>Rabi oscillations.</b> A resonant drive with Rabi frequency \(\Omega\) flips the spin with probability \(\sin^2\frac{\Omega t}{2}\); a \(\pi\)-pulse (\(\Omega t = \pi\)) inverts it.</p>`,
      ex: { q: T`A spin is prepared up along \(z\) and measured along an axis 60° from \(z\). Find the probability of "up" and the expected value of \(S_n\).`, a: T`<p>\(\cos^230° = 0.75\). \(\langle S_n\rangle = \frac\hbar2(0.75 - 0.25) = \frac\hbar4 = \frac\hbar2\cos60°\).</p>` },
      trap: T`Using \(\cos^2\theta\) instead of \(\cos^2\frac\theta2\). Spinors rotate by half angles.`,
      vary: [[T`Probability of up along \(x\) after preparing up along \(z\)?`, 0.5, T`\(\cos^245°\).`], [T`MRI frequency (MHz) for protons at 1.5 T, two decimals.`, 42.58 * 1.5, T`\(42.58\cdot1.5\).`], [T`Spin-flip probability after a \(\pi\)-pulse?`, 1, T`\(\sin^2\frac\pi2\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Angular momentum in quantum mechanics is quantized in both magnitude and direction. Combining two angular momenta follows a precise counting rule that organizes atomic and nuclear spectra.</p>`,
      body: T`
<p><b>Eigenvalues.</b> \(\hat L^2 = \ell(\ell + 1)\hbar^2\) and \(\hat L_z = m\hbar\) with \(m = -\ell, \ldots, \ell\): \(2\ell + 1\) states. Orbital \(\ell\) is a whole number; spin \(s\) can be half-integer.</p>
<p>The magnitude \(\sqrt{\ell(\ell + 1)}\hbar\) always exceeds the largest \(L_z = \ell\hbar\): the vector can never point exactly along \(z\).</p>
<p><b>Commutators:</b> \([\hat L_x, \hat L_y] = i\hbar\hat L_z\) (cyclic), and each component commutes with \(\hat L^2\). Ladder operators \(\hat L_\pm\) raise and lower \(m\): \(\hat L_\pm|\ell, m\rangle = \hbar\sqrt{\ell(\ell + 1) - m(m \pm 1)}\,|\ell, m \pm 1\rangle\).</p>
<p><b>Addition.</b> Combining \(j_1\) and \(j_2\) gives total \(j = |j_1 - j_2|, \ldots, j_1 + j_2\) in integer steps, and the state counts match: \((2j_1 + 1)(2j_2 + 1) = \sum(2j + 1)\).</p>
<p>Two spin-\(\frac12\): triplet \(j = 1\) (3 states, symmetric) and singlet \(j = 0\) (1 state, antisymmetric, \(\frac{1}{\sqrt2}(|\uparrow\downarrow\rangle - |\downarrow\uparrow\rangle)\)). Orbital \(\ell = 1\) with spin \(\frac12\): \(j = \frac32\) and \(\frac12\), the fine-structure doublet \(p_{3/2}\), \(p_{1/2}\).</p>
<p><b>Clebsch–Gordan coefficients</b> give the expansion: \(|1, 0\rangle = \frac{1}{\sqrt2}(|\uparrow\downarrow\rangle + |\downarrow\uparrow\rangle)\).</p>`,
      ex: { q: T`Combine \(j_1 = 2\) and \(j_2 = \frac32\). List the allowed \(j\) and check the count.`, a: T`<p>\(j = \frac12, \frac32, \frac52, \frac72\). States: \(2 + 4 + 6 + 8 = 20 = 5\cdot4\).</p>` },
      trap: T`Adding magnitudes directly. Total \(j\) ranges between \(|j_1 - j_2|\) and \(j_1 + j_2\).`,
      vary: [[T`Number of \(m\) values for \(\ell = 3\)?`, 7, T`\(2\ell + 1\).`], [T`\(|L|/\hbar\) for \(\ell = 2\), four decimals.`, Math.sqrt(6), T`\(\sqrt6\).`], [T`Number of allowed \(j\) for \(j_1 = 2\), \(j_2 = 1\)?`, 3, T`1, 2, 3.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>The hydrogen atom is the one real atom quantum mechanics solves exactly. Its energy levels match the observed spectral lines to many digits, and its structure sets the pattern of the periodic table.</p>`,
      body: T`
\[E_n = -\frac{13.606\text{ eV}}{n^2},\qquad n = 1, 2, \ldots\]
<p>For each \(n\): \(\ell = 0, \ldots, n - 1\), \(m = -\ell, \ldots, \ell\): \(n^2\) orbital states, \(2n^2\) with spin.</p>
<p><b>Spectral lines.</b> \(\frac1\lambda = R_\infty\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right)\), \(R_\infty = 0.010974\) nm\(^{-1}\). Balmer (\(n_f = 2\)): H-α (3→2) at 656.3 nm, H-β (4→2) at 486.1 nm. Lyman (\(n_f = 1\)) is ultraviolet, starting at 121.6 nm.</p>
<p><b>Radial expectations</b> (Bohr radius \(a_0 = 0.0529\) nm): ground state \(\langle r\rangle = \frac32a_0\), most probable radius \(a_0\). In general \(\langle r\rangle = \frac{a_0}{2}[3n^2 - \ell(\ell + 1)]\).</p>
<p><b>Hydrogen-like ions</b> (nuclear charge \(Z\)): \(E_n = -\frac{13.6Z^2}{n^2}\) eV and radii shrink by \(Z\). He\(^+\) ground state: \(-54.4\) eV.</p>
<p><b>Beyond.</b> Fine structure (relativity and spin–orbit) splits levels by about \(\alpha^2 \approx 5\times10^{-5}\) of the gross energy; the Lamb shift needs QED.</p>`,
      ex: { q: T`Find the wavelength of the 5 → 2 transition in hydrogen.`, a: T`<p>\(\frac1\lambda = 0.010974\left(\frac14 - \frac{1}{25}\right) = 0.010974(0.21) = 0.0023045\) nm\(^{-1}\); \(\lambda \approx 434.0\) nm (H-γ, violet).</p>` },
      trap: T`Forgetting the factor of 2 for spin in the degeneracy of a shell.`,
      vary: [[T`Ionization energy (eV) from \(n = 2\), three decimals.`, 13.606 / 4, T`\(\frac{13.606}{4}\).`], [T`States (with spin) in shell \(n = 3\)?`, 18, T`\(2n^2\).`], [T`\(\langle r\rangle/a_0\) for the ground state?`, 1.5, T`\(\frac32\).`], [T`He\(^+\) ground-state energy (eV), two decimals.`, -13.606 * 4, T`\(Z^2\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Most real Hamiltonians are a solvable one plus a small correction. Perturbation theory computes the shift in energies as a series in that correction, and the first term is just an average.</p>`,
      body: T`
<p>\(\hat H = \hat H_0 + \hat H'\), with known \(\hat H_0|n\rangle = E_n^0|n\rangle\) (nondegenerate).</p>
\[E_n^{(1)} = \langle n|\hat H'|n\rangle,\qquad E_n^{(2)} = \sum_{k\ne n}\frac{|\langle k|\hat H'|n\rangle|^2}{E_n^0 - E_k^0}\]
<p>The second-order shift of the ground state is always negative.</p>
<p><b>Examples.</b></p>
<ul><li>Infinite well \([0, L]\) with an extra \(V_0\) on the right half: \(E_n^{(1)} = \frac{V_0}{2}\) (each state spends half its probability there).</li>
<li>Oscillator with \(\hat H' = \lambda x^2\) (\(\hbar = m = \omega = 1\)): \(E_n^{(1)} = \lambda(n + \frac12)\). Exact: \(\omega' = \sqrt{1 + 2\lambda}\), whose expansion matches.</li>
<li>Oscillator in a field, \(\hat H' = -qEx\): first order vanishes; second order gives \(-\frac{q^2E^2}{2m\omega^2}\), exactly the classical shift from completing the square.</li></ul>
<p><b>Degenerate levels</b> require diagonalizing \(\hat H'\) within the degenerate subspace first; the Stark effect in hydrogen \(n = 2\) splits the level linearly in the field this way.</p>
<p><b>Variational principle.</b> For any normalized trial state, \(\langle H\rangle \ge E_0\). A Gaussian trial for hydrogen gives \(-11.5\) eV against the exact \(-13.6\) eV.</p>`,
      ex: { q: T`A particle in a well \([0, L]\) gets a perturbation \(H' = \epsilon\frac{x}{L}\). Find the first-order shift of every level.`, a: T`<p>\(\langle x\rangle = \frac L2\) in every stationary state, so \(E^{(1)} = \frac\epsilon2\) for all \(n\).</p>` },
      trap: T`Including the \(k = n\) term in the second-order sum.`,
      vary: [[T`First-order shift for \(H' = 0.1x^2\) in the oscillator ground state (\(\hbar = m = \omega = 1\))?`, 0.05, T`\(0.1\cdot\frac12\).`], [T`Second-order shift for \(H' = -x\) (\(q = E = m = \omega = 1\))?`, -0.5, T`\(-\frac12\).`], [T`Shift of every well level for \(V_0 = 0.4\) on the right half?`, 0.2, T`\(\frac{V_0}{2}\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Stationary states only change by a phase, so all the dynamics comes from interference between energies. And when particles are identical, quantum mechanics demands the wavefunction be symmetric or antisymmetric, which explains the periodic table.</p>`,
      body: T`
<p><b>Time evolution.</b> \(i\hbar\partial_t\psi = \hat H\psi\). If \(\psi(0) = \sum c_n\psi_n\), then \(\psi(t) = \sum c_ne^{-iE_nt/\hbar}\psi_n\). Probabilities \(|c_n|^2\) never change; expectation values oscillate at the Bohr frequencies \(\frac{E_n - E_m}{\hbar}\).</p>
<p>In the infinite well, \(E_n \propto n^2\), so every state returns to itself after the <b>revival time</b> \(T = \frac{4mL^2}{\pi\hbar}\).</p>
<p><b>Identical particles.</b> Bosons (integer spin) have symmetric wavefunctions; fermions (half-integer spin) antisymmetric. Pauli exclusion: no two fermions share a single-particle state.</p>
<p><b>Filling levels.</b> \(N\) spin-\(\frac12\) fermions in a 1D box fill levels two at a time. With \(N = 5\): levels 1, 1, 2, 2, 3, so \(E = E_1(1 + 1 + 4 + 4 + 9) = 19E_1\). Bosons all sit in the lowest level: \(E = NE_1\).</p>
<p><b>Exchange effects.</b> Symmetric spatial states bunch together; antisymmetric ones avoid each other. This "exchange interaction" drives ferromagnetism and the covalent bond.</p>
<p><b>Fermi energy.</b> For electrons in a 3D box, \(E_F = \frac{\hbar^2}{2m}(3\pi^2n)^{2/3}\), about 7 eV for copper; it sets the scale of metallic properties.</p>`,
      ex: { q: T`Six spin-\(\frac12\) fermions occupy a 1D box. Find the ground-state energy in units of \(E_1\), and the energy of the highest occupied level.`, a: T`<p>Levels 1, 2, 3, each doubly filled: \(2(1 + 4 + 9) = 28E_1\). Highest occupied level \(9E_1\).</p>` },
      trap: T`Placing more than two spin-\(\frac12\) fermions in one spatial level.`,
      vary: [[T`Ground energy of 4 spin-\(\frac12\) fermions in a 1D box (units \(E_1\))?`, 10, T`\(2(1 + 4)\).`], [T`Ground energy of 4 spinless bosons (units \(E_1\))?`, 4, T`All in \(n = 1\).`], [T`Does \(|c_n|^2\) change in time for a time-independent \(H\)? 1 yes, 0 no.`, 0, T`Only phases change.`]] }
  ]);

  addQuestions('qm', [
    { id: 'qm1', skill: U[1], q: T`The canonical commutator is:`, c: [T`\([\hat x, \hat p] = i\hbar\)`, T`\([\hat x, \hat p] = 0\)`, T`\([\hat x, \hat p] = \hbar\)`, T`\([\hat x, \hat p] = -i\)`], x: T`Act on a test function with \(\hat p = -i\hbar\partial_x\).` },
    { id: 'qm2', skill: U[2], q: T`The ground state energy of a particle in a box is nonzero because:`, c: ['confinement forces a momentum spread (uncertainty)', 'the walls do work', 'of relativity', 'the particle is charged'], x: T`\(\sigma_p \gtrsim \frac\hbar L\).` },
    { id: 'qm3', skill: U[3], q: T`The harmonic oscillator levels are:`, c: ['evenly spaced by ħω', 'spaced as n²', 'spaced as 1/n²', 'continuous'], x: T`\(E_n = (n + \frac12)\hbar\omega\).` },
    { id: 'qm4', skill: U[5], q: T`A spin prepared up along \(z\) is measured along \(x\). The probability of "up" is:`, c: ['1/2', '1', '0', T`\(\cos^2 90°\)`], x: T`\(\cos^2 45°\).` },
    { id: 'qm5', skill: U[6], q: T`Two spin-\(\frac12\) particles combine into:`, c: ['a triplet (j = 1) and a singlet (j = 0)', 'only j = 1', 'only j = 0', 'j = 1/2 twice'], x: T`\(2\times2 = 3 + 1\).` },
    { id: 'qm6', skill: U[9], q: T`The Pauli exclusion principle applies to:`, c: ['identical fermions', 'identical bosons', 'all particles', 'only electrons in hydrogen'], x: T`Antisymmetry makes a doubly occupied state vanish.` }
  ]);

  // ======================= GENERATORS =======================
  registerUnitGens('qm', { units: {
    [U[0]]: [{ id: 'qm-born', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const n = R.int(1, 4), [a, b] = R.pick([[0, 0.25], [0, 0.5], [0.25, 0.75], [0, 1 / 3], [0.5, 1]]);
        const P = (b - a) - (Math.sin(2 * n * Math.PI * b) - Math.sin(2 * n * Math.PI * a)) / (2 * n * Math.PI);
        return { q: T`An infinite-well particle (width \(L\)) is in state \(n = ${n}\). Find the probability that it is between \(${R.fmt(a, 4)}L\) and \(${R.fmt(b, 4)}L\), to four decimals.`, answer: P, tol: 1e-4, x: T`\(\int\frac2L\sin^2\frac{n\pi x}{L}dx = \left[\frac xL - \frac{\sin(2n\pi x/L)}{2n\pi}\right]\) between the limits.`, v: `integrate(2*sin(${n}*pi*Symbol('u'))**2, (Symbol('u'), nsimplify(${a}), nsimplify(${b})))` }; }
      if (k === 1) { const L = R.int(1, 4); return { q: T`Find \(A\) normalizing \(\psi = Ax(${L} - x)\) on \([0, ${L}]\), to four decimals.`, answer: Math.sqrt(30 / L ** 5), tol: 1e-4, x: T`\(A^2\frac{L^5}{30} = 1\), so \(A = \sqrt{30/${L ** 5}}\).`, v: `1/sqrt(integrate((Symbol('x')*(${L} - Symbol('x')))**2, (Symbol('x'), 0, ${L})))` }; }
      const a = R.int(1, 4), b = R.int(1, 4), ask = R.int(0, 1), N = a * a + b * b;
      return { q: T`\(\psi \propto ${a}\psi_1 + ${b}\psi_2\) (orthonormal \(\psi_n\)). Find the probability of measuring \(E_{${ask + 1}}\), to four decimals.`, answer: (ask ? b * b : a * a) / N, tol: 1e-4, x: T`Normalize: divide by \(\sqrt{${N}}\). Probability \(\frac{${ask ? b * b : a * a}}{${N}}\).`, v: `(lambda c: (c/c.norm())[${ask}]**2)(Matrix([${a}, ${b}]))` };
    } }],
    [U[1]]: [{ id: 'qm-ops', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const n = R.int(1, 4), L = R.int(1, 3), v = L * L * (1 / 3 - 1 / (2 * n * n * Math.PI * Math.PI)); return { q: T`Find \(\langle x^2\rangle\) for the infinite-well state \(n = ${n}\) with \(L = ${L}\), to four decimals.`, answer: v, tol: 1e-4, x: T`\(L^2\left(\frac13 - \frac{1}{2n^2\pi^2}\right)\).`, v: `integrate(2/${L}*sin(${n}*pi*Symbol('x')/${L})**2*Symbol('x')**2, (Symbol('x'), 0, ${L}))` }; }
      if (k === 1) { const n = R.int(1, 4), v = 0.5 * Math.sqrt(n * n * Math.PI * Math.PI / 3 - 2); return { q: T`Find \(\sigma_x\sigma_p\) in units of \(\hbar\) for the infinite-well state \(n = ${n}\), to four decimals.`, answer: v, tol: 1e-4, x: T`\(\frac12\sqrt{\frac{n^2\pi^2}{3} - 2}\); always at least \(\frac12\).`, v: `(lambda x: (lambda psi: sqrt((integrate(psi**2*x**2, (x, 0, 1)) - integrate(psi**2*x, (x, 0, 1))**2)*integrate(diff(psi, x)**2, (x, 0, 1))))(sqrt(2)*sin(${n}*pi*x)))(Symbol('x'))` }; }
      const m = R.int(2, 5); return { q: T`\([\hat x^{${m}}, \hat p] = ci\hbar\hat x^{${m - 1}}\). Find \(c\).`, answer: m, x: T`\([\hat x^m, \hat p] = im\hbar\hat x^{m-1}\) by repeating \([\hat x, \hat p] = i\hbar\).`, v: `(lambda x, f: simplify((x**${m}*(-I*diff(f(x), x)) - (-I*diff(x**${m}*f(x), x)))/(I*x**${m - 1}*f(x))))(Symbol('x'), Function('f'))` };
    } }],
    [U[2]]: [{ id: 'qm-well', make(R) {
      const L = R.pick([0.2, 0.5, 1, 2]), k = R.int(0, 2), E1 = E1NM / (L * L);
      if (k === 0) { const n = R.int(1, 4); return { q: T`Find \(E_{${n}}\) (eV) for an electron in a ${L} nm infinite well, to four decimals.`, answer: n * n * E1, tol: 1e-4 * Math.max(1, n * n * E1), x: T`\(E_n = n^2\frac{(\pi\hbar c)^2}{2m_ec^2L^2} \approx n^2\cdot\frac{0.376}{${L}^2}\).`, v: `${n}**2*(pi*197.327)**2/(2*510999*${L}**2)` }; }
      if (k === 1) { const ni = R.int(2, 5), nf = R.int(1, ni - 1), dE = E1 * (ni * ni - nf * nf), lam = 1239.84 / dE; return { q: T`An electron in a ${L} nm well drops from \(n = ${ni}\) to \(n = ${nf}\). Find the photon wavelength in nm, to two decimals.`, answer: lam, tol: Math.max(0.01, lam * 1e-4), x: T`\(\Delta E = E_1(${ni * ni} - ${nf * nf}) = ${R.fmt(dE, 4)}\) eV; \(\lambda = \frac{1239.84}{\Delta E}\).`, v: `1239.84/(((pi*197.327)**2/(2*510999*${L}**2))*(${ni * ni} - ${nf * nf}))` }; }
      const S = R.pick([3, 6, 9, 11, 12, 14, 17, 18, 27]); let cnt = 0; for (let a = 1; a < 6; a++) for (let b = 1; b < 6; b++) for (let c = 1; c < 6; c++) if (a * a + b * b + c * c === S) cnt++;
      if (!cnt) return this.make(R);
      return { q: T`In a cubic box, what is the degeneracy of the level \(E = ${S}E_1\)?`, answer: cnt, x: T`Count ordered triples \((n_x, n_y, n_z)\) of positive integers with \(n_x^2 + n_y^2 + n_z^2 = ${S}\): ${cnt}.`, v: `sum(1 for t in product(range(1, 7), repeat=3) if t[0]**2 + t[1]**2 + t[2]**2 == ${S})` };
    } }],
    [U[3]]: [{ id: 'qm-sho', make(R) {
      const k = R.int(0, 2), N = 8, ops = "(lambda a: (a, a.T))(Matrix(" + N + ", " + N + ", lambda i, j: sqrt(j) if i == j - 1 else 0))";
      if (k === 0) { const n = R.int(0, 5), ask = R.int(0, 1); return { q: T`For the oscillator with \(\hbar = m = \omega = 1\), find ${ask ? `\\(\\langle ${n}|\\hat x^2|${n}\\rangle\\)` : `\\(E_{${n}}\\)`}.`, answer: n + 0.5, tol: 1e-6, x: ask ? T`\(\hat x = \frac{\hat a + \hat a^\dagger}{\sqrt2}\), so \(\langle n|\hat x^2|n\rangle = n + \frac12\).` : T`\(E_n = n + \frac12\).`, v: ask ? `(lambda A: ((A[0] + A[1])**2/2)[${n}, ${n}])(${ops})` : `(lambda A: (A[1]*A[0] + eye(${N})/2)[${n}, ${n}])(${ops})` }; }
      if (k === 1) { const n = R.int(0, 5), up = R.int(0, 1), m = up ? n + 1 : n - 1; if (m < 0) return this.make(R); return { q: T`Find \(\langle ${m}|\hat x|${n}\rangle\) (units \(\hbar = m = \omega = 1\)), to four decimals.`, answer: Math.sqrt(Math.max(n, m) / 2), tol: 1e-4, x: T`\(\hat x = \frac{\hat a + \hat a^\dagger}{\sqrt2}\): the element is \(\sqrt{\frac{${Math.max(n, m)}}{2}}\).`, v: `(lambda A: ((A[0] + A[1])/sqrt(2))[${m}, ${n}])(${ops})` }; }
      const n = R.int(0, 3), j = R.int(1, 3); let c = 1; for (let i = 1; i <= j; i++) c *= Math.sqrt(n + i);
      return { q: T`Find the coefficient \(c\) in \((\hat a^\dagger)^{${j}}|${n}\rangle = c\,|${n + j}\rangle\), to four decimals.`, answer: c, tol: 1e-4, x: T`Each \(\hat a^\dagger\) contributes \(\sqrt{k + 1}\): \(\sqrt{\frac{(${n + j})!}{${n}!}}\).`, v: `(lambda A: (A[1]**${j})[${n + j}, ${n}])(${ops})` };
    } }],
    [U[4]]: [{ id: 'qm-tun', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const r = R.pick([0.25, 0.5, 0.75, 0.9]), Rr = ((1 - r) / (1 + r)) ** 2; const E = R.int(2, 10), V0 = E * (1 - r * r);
        return { q: T`A particle with \(E = ${E}\) meets a step of height \(V_0 = ${R.fmt(V0, 4)}\) (same units). Find the reflection probability, to four decimals.`, answer: Rr, tol: 1e-4, x: T`\(\frac{k_2}{k_1} = \sqrt{\frac{E - V_0}{E}} = ${r}\); \(R = \left(\frac{1 - ${r}}{1 + ${r}}\right)^2\).`, v: `(lambda k1, k2: ((k1 - k2)/(k1 + k2))**2)(sqrt(nsimplify(${E})), sqrt(nsimplify(${E}) - nsimplify(${R.fmt(V0, 8)})))` }; }
      const dV = R.pick([0.5, 1, 2, 3, 4]), a = R.pick([0.1, 0.2, 0.5, 1]), kap = Math.sqrt(2 * MEC2 * dV) / HC, T1 = Math.exp(-2 * kap * a), ask = R.int(0, 1);
      return { q: ask ? T`An electron is ${dV} eV below the top of a barrier ${a} nm wide. Estimate \(\ln T \approx -2\kappa a\), to three decimals.` : T`Find \(\kappa\) (nm\(^{-1}\)) for an electron ${dV} eV below a barrier top, to four decimals.`, answer: ask ? -2 * kap * a : kap, tol: ask ? 0.001 : 1e-4, x: T`\(\kappa = \frac{\sqrt{2m_ec^2(V_0 - E)}}{\hbar c} = \frac{\sqrt{2(510999)(${dV})}}{197.327} \approx ${R.fmt(kap, 4)}\)${ask ? T`; \(-2\kappa a \approx ${R.fmt(-2 * kap * a, 4)}\), so \(T \approx ${T1.toExponential(2)}\)` : ''}.`, v: ask ? `-2*sqrt(2*510999*nsimplify(${dV}))/197.327*nsimplify(${a})` : `sqrt(2*510999*nsimplify(${dV}))/197.327` };
    } }],
    [U[5]]: [{ id: 'qm-spin', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const th = R.pick([30, 45, 60, 90, 120, 135, 150, 180]), ask = R.int(0, 1), P = Math.cos(th * Math.PI / 360) ** 2;
        return { q: T`A spin-\(\frac12\) particle is prepared up along \(z\) and measured along an axis at ${th}° to \(z\). Find ${ask ? 'the expected value of \\(S_n\\) in units of \\(\\hbar\\)' : 'the probability of "up"'}, to four decimals.`, answer: ask ? 0.5 * Math.cos(th * Math.PI / 180) : P, tol: 1e-4, x: T`\(P = \cos^2\frac\theta2 = ${R.fmt(P, 4)}\); \(\langle S_n\rangle = \frac\hbar2\cos\theta\).`,
          v: `(lambda n: (lambda up: ${ask ? "(up.H*(n[0]*Matrix([[0, 1], [1, 0]]) + n[2]*Matrix([[1, 0], [0, -1]]))/2*up)[0]" : "(lambda S: (lambda vals: [abs((v[2][0].H*up)[0])**2/(v[2][0].H*v[2][0])[0] for v in vals if v[0] == 1][0])(S.eigenvects()))(n[0]*Matrix([[0, 1], [1, 0]]) + n[2]*Matrix([[1, 0], [0, -1]]))"})(Matrix([1, 0])))([sin(${th}*pi/180), 0, cos(${th}*pi/180)])` }; }
      if (k === 1) { const B = R.pick([0.5, 1, 1.5, 3, 7]); return { q: T`Find the proton Larmor frequency in MHz at ${B} T (\(\gamma/2\pi = 42.577\) MHz/T), to three decimals.`, answer: 42.577 * B, tol: 0.001, x: T`\(f = 42.577\cdot${B}\).`, v: `42.577*nsimplify(${B})` }; }
      const ang = R.pick([30, 45, 60, 90, 120, 180]); return { q: T`A resonant drive rotates a spin by a pulse angle \(\Omega t = ${ang}°\). Find the spin-flip probability, to four decimals.`, answer: Math.sin(ang * Math.PI / 360) ** 2, tol: 1e-4, x: T`\(\sin^2\frac{\Omega t}{2}\).`, v: `abs((Matrix([[cos(${ang}*pi/360), -I*sin(${ang}*pi/360)], [-I*sin(${ang}*pi/360), cos(${ang}*pi/360)]])*Matrix([1, 0]))[1])**2` };
    } }],
    [U[6]]: [{ id: 'qm-am', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const j1 = R.pick([0.5, 1, 1.5, 2, 2.5, 3]), j2 = R.pick([0.5, 1, 1.5, 2]), ask = R.int(0, 1), js = []; for (let j = Math.abs(j1 - j2); j <= j1 + j2 + 1e-9; j++) js.push(j);
        return { q: ask ? T`Combining \(j_1 = ${j1}\) and \(j_2 = ${j2}\), what is the largest allowed \(j\)?` : T`Combining \(j_1 = ${j1}\) and \(j_2 = ${j2}\), how many distinct values of total \(j\) are allowed?`, answer: ask ? j1 + j2 : js.length, tol: 1e-9, x: T`\(j = ${js.join(', ')}\). Check: \(\sum(2j + 1) = ${js.reduce((s, j) => s + 2 * j + 1, 0)} = (2j_1 + 1)(2j_2 + 1)\).`, v: ask ? `nsimplify(${j1}) + nsimplify(${j2})` : `len([j for j in [abs(nsimplify(${j1}) - nsimplify(${j2})) + k for k in range(20)] if j <= nsimplify(${j1}) + nsimplify(${j2})])` }; }
      if (k === 1) { const l = R.int(1, 5), ask = R.int(0, 1); return { q: ask ? T`Find \(|\mathbf L|/\hbar\) for \(\ell = ${l}\), to four decimals.` : T`How many \(m\) values does \(\ell = ${l}\) allow?`, answer: ask ? Math.sqrt(l * (l + 1)) : 2 * l + 1, tol: 1e-4, x: T`\(|\mathbf L| = \sqrt{\ell(\ell + 1)}\hbar\); \(m = -\ell, \ldots, \ell\).`, v: ask ? `sqrt(${l}*(${l} + 1))` : `len(range(-${l}, ${l} + 1))` }; }
      const l = R.int(1, 3), m = R.int(-l, l - 1), c = Math.sqrt(l * (l + 1) - m * (m + 1));
      return { q: T`Find \(c\) in \(\hat L_+|${l}, ${m}\rangle = c\hbar\,|${l}, ${m + 1}\rangle\), to four decimals.`, answer: c, tol: 1e-4, x: T`\(\sqrt{\ell(\ell + 1) - m(m + 1)} = \sqrt{${l * (l + 1)} - (${m})(${m + 1})}\).`, v: `(lambda J: J[${l - m - 1}, ${l - m}])(Matrix(${2 * l + 1}, ${2 * l + 1}, lambda i, j: sqrt(${l}*(${l} + 1) - (${l} - j)*(${l} - j + 1)) if i == j - 1 else 0))` };
    } }],
    [U[7]]: [{ id: 'qm-hyd', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const nf = R.int(1, 3), ni = nf + R.int(1, 4), lam = 1 / (0.0109737 * (1 / (nf * nf) - 1 / (ni * ni))); return { q: T`Find the wavelength (nm) of the hydrogen transition \(${ni} \to ${nf}\), to one decimal.`, answer: lam, tol: 0.1, x: T`\(\frac1\lambda = R_\infty\left(\frac{1}{${nf * nf}} - \frac{1}{${ni * ni}}\right)\).`, v: `1239.84/(13.6057*(Rational(1, ${nf * nf}) - Rational(1, ${ni * ni})))` }; }
      if (k === 1) { const n = R.int(1, 5), Z = R.pick([1, 1, 2, 3]), ask = R.int(0, 1); return { q: ask ? T`How many states (including spin) are in shell \(n = ${n}\) of hydrogen?` : T`Find \(E_{${n}}\) (eV) for ${Z === 1 ? 'hydrogen' : Z === 2 ? 'He\\(^+\\)' : 'Li\\(^{2+}\\)'}, to three decimals.`, answer: ask ? 2 * n * n : -13.6057 * Z * Z / (n * n), tol: 1e-3, x: ask ? T`\(\sum_{\ell=0}^{n-1}2(2\ell + 1) = 2n^2\).` : T`\(-\frac{13.6057Z^2}{n^2}\).`, v: ask ? `sum(2*(2*l + 1) for l in range(${n}))` : `-13.6057*${Z * Z}/Rational(${n * n})` }; }
      const n = R.int(1, 3), l = R.int(0, n - 1), r = 0.5 * (3 * n * n - l * (l + 1));
      return { q: T`Find \(\langle r\rangle\) in units of \(a_0\) for the hydrogen state \(n = ${n}\), \(\ell = ${l}\).`, answer: r, tol: 1e-6, x: T`\(\frac{1}{2}[3n^2 - \ell(\ell + 1)] = \frac12[${3 * n * n} - ${l * (l + 1)}]\).`, v: `(lambda r: integrate(r**3*R_nl(${n}, ${l}, r, 1)**2, (r, 0, oo)))(Symbol('r', positive=True))` };
    } }],
    [U[8]]: [{ id: 'qm-pert', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const lam = R.pick([0.1, 0.05, 0.2, 0.01]), n = R.int(0, 3); return { q: T`Oscillator (\(\hbar = m = \omega = 1\)) with \(H' = ${lam}x^2\). Find the first-order shift of \(E_{${n}}\), to five decimals.`, answer: lam * (n + 0.5), tol: 1e-5, x: T`\(\lambda\langle n|x^2|n\rangle = \lambda(n + \frac12)\).`, v: `${lam}*integrate(Symbol('x')**2*(exp(-Symbol('x')**2/2)*hermite(${n}, Symbol('x')))**2, (Symbol('x'), -oo, oo))/integrate((exp(-Symbol('x')**2/2)*hermite(${n}, Symbol('x')))**2, (Symbol('x'), -oo, oo))` }; }
      if (k === 1) { const V0 = R.pick([0.2, 0.4, 1, 0.1]), n = R.int(1, 4), frac = R.pick([0.5, 0.25]);
        const exact = V0 * (frac + Math.sin(2 * n * Math.PI * (1 - frac)) / (2 * n * Math.PI));
        return { q: T`An infinite well \([0, L]\) gets an extra potential \(${V0}\) on the last ${frac === 0.5 ? 'half' : 'quarter'} \([${1 - frac}L, L]\). Find the first-order shift of \(E_{${n}}\), to four decimals.`, answer: exact, tol: 1e-4, x: T`\(E^{(1)} = V_0\cdot P(\text{particle in that region})\).`, v: `${V0}*integrate(2*sin(${n}*pi*Symbol('u'))**2, (Symbol('u'), nsimplify(${1 - frac}), 1))` }; }
      const q = R.int(1, 3), E = R.int(1, 3), w = R.int(1, 3); return { q: T`Oscillator (\(m = 1\), \(\omega = ${w}\), \(\hbar = 1\)) with \(H' = -${q * E}x\). Find the second-order energy shift, to four decimals.`, answer: -((q * E) ** 2) / (2 * w * w), tol: 1e-4, x: T`\(-\frac{(qE)^2}{2m\omega^2} = -\frac{${(q * E) ** 2}}{${2 * w * w}}\), matching the exact completed square.`, v: `(lambda x: (lambda V: V.subs(x, solve(diff(V, x), x)[0]))(Rational(${w * w}, 2)*x**2 - ${q * E}*x))(Symbol('x'))` };
    } }],
    [U[9]]: [{ id: 'qm-ident', make(R) {
      const N = R.int(2, 9), ferm = R.int(0, 2) > 0, ask = R.int(0, 1);
      if (!ferm) return { q: T`Find the ground-state energy of ${N} noninteracting spinless bosons in a 1D infinite well, in units of \(E_1\).`, answer: N, x: T`All occupy \(n = 1\): \(${N}E_1\).`, v: `${N}*1` };
      let E = 0, top = 0; for (let i = 0; i < N; i++) { const n = Math.floor(i / 2) + 1; E += n * n; top = n * n; }
      return { q: ask ? T`${N} noninteracting spin-\(\frac12\) fermions fill a 1D infinite well. Find the energy of the highest occupied level, in units of \(E_1\).` : T`Find the ground-state energy of ${N} noninteracting spin-\(\frac12\) fermions in a 1D infinite well, in units of \(E_1\).`, answer: ask ? top : E, x: T`Fill levels two at a time (spin up and down): ${Array.from({ length: N }, (_, i) => (Math.floor(i / 2) + 1) ** 2).join(' + ')}.`, v: ask ? `max(sorted([n*n for n in range(1, 20) for s in (0, 1)])[:${N}])` : `sum(sorted([n*n for n in range(1, 20) for s in (0, 1)])[:${N}])` };
    } }]
  } });
})();
