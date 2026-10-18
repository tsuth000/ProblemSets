'use strict';
// Theoretical physics track: Statistical mechanics. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'sm', name: 'Statistical mechanics', color: '#7A3B2E', blurb: 'Microstates and entropy, temperature, the Boltzmann distribution, partition functions, equipartition and the Maxwell distribution, quantum statistics, blackbody radiation, mean-field transitions, information entropy', questions: [], generators: [] });
  const U = ['Microstates and entropy', 'Temperature and equilibrium', 'The Boltzmann distribution', 'Partition functions', 'Equipartition and kinetic theory', 'Fermi and Bose statistics', 'Blackbody radiation', 'Phase transitions and mean field', 'Entropy and information'];
  const KB = 1.380649e-23, KEV = 8.617333e-5, AMU = 1.66054e-27;

  registerLearn('sm', [
    { title: U[0], skill: U[0],
      hook: T`<p>A macroscopic state, like "this gas has energy \(E\)," corresponds to an astronomical number of microscopic arrangements. Entropy is the logarithm of that number, and the second law says systems drift toward macrostates with more arrangements.</p>`,
      body: T`
<p><b>Boltzmann entropy:</b> \(S = k_B\ln\Omega\), where \(\Omega\) counts the microstates compatible with the macrostate.</p>
<p><b>Two-state systems.</b> \(N\) spins with \(n\) up: \(\Omega = \binom Nn\). For \(N = 100\), \(\Omega(50) \approx 10^{29}\) while \(\Omega(0) = 1\): the half-and-half macrostate dominates overwhelmingly.</p>
<p><b>Einstein solid.</b> \(N\) oscillators sharing \(q\) energy quanta (stars and bars):</p>
\[\Omega(N, q) = \binom{q + N - 1}{q}\]
<p>\(N = 3\), \(q = 4\): \(\binom64 = 15\).</p>
<p><b>Additivity.</b> For independent subsystems \(\Omega = \Omega_A\Omega_B\), so \(S = S_A + S_B\). This is why entropy uses a logarithm.</p>
<p><b>Large numbers.</b> With Stirling, \(\ln\binom{N}{n} \approx N\left[-x\ln x - (1 - x)\ln(1 - x)\right]\) with \(x = \frac nN\); at \(x = \frac12\), \(S \approx Nk_B\ln2\).</p>
<p><b>Ideal gas (Sackur–Tetrode)</b> gives \(S = Nk_B\left[\ln\frac{V}{N\lambda^3} + \frac52\right]\), with thermal wavelength \(\lambda = \frac{h}{\sqrt{2\pi mk_BT}}\).</p>`,
      ex: { q: T`An Einstein solid has \(N = 4\) oscillators and \(q = 3\) quanta. Find \(\Omega\) and \(S/k_B\).`, a: T`<p>\(\Omega = \binom{6}{3} = 20\). \(S/k_B = \ln20 \approx 2.996\).</p>` },
      trap: T`Using \(\binom{q + N}{q}\) for the Einstein solid. There are \(N - 1\) bars separating \(N\) oscillators.`,
      vary: [[T`Microstates of 6 spins with 3 up?`, 20, T`\(\binom63\).`], [T`\(\Omega\) for \(N = 2\), \(q = 5\)?`, 6, T`\(\binom65\).`], [T`\(S/k_B\) of 10 independent coins, four decimals.`, 10 * Math.log(2), T`\(10\ln2\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Two systems exchanging energy settle where the total number of microstates is largest. At that point a single number, the temperature, is equal on both sides.</p>`,
      body: T`
<p><b>Definition:</b> \(\frac1T = \frac{\partial S}{\partial E}\) at fixed volume and particle number.</p>
<p><b>Equilibrium.</b> Systems A and B share total energy \(E\). The combined multiplicity \(\Omega_A(E_A)\Omega_B(E - E_A)\) peaks where \(\frac{\partial S_A}{\partial E_A} = \frac{\partial S_B}{\partial E_B}\), that is \(T_A = T_B\). Energy flows from the system with smaller \(\frac{\partial S}{\partial E}\) (hotter) to the one with larger.</p>
<p><b>Two Einstein solids.</b> \(N_A = 3\), \(N_B = 3\), \(q = 6\): multiplicities \(\Omega_A\Omega_B\) for \(q_A = 0, \ldots, 6\) are 28, 63, 90, 100, 90, 63, 28. The peak \(q_A = 3\) shares energy in proportion to size. For macroscopic systems the peak is so sharp that fluctuations are negligible.</p>
<p><b>Einstein solid temperature.</b> For large \(q, N\): \(S \approx k_B[(q + N)\ln(q + N) - q\ln q - N\ln N]\), giving \(\frac{\varepsilon}{k_BT} = \ln\left(1 + \frac Nq\right)\) with quantum size \(\varepsilon\).</p>
<p><b>Negative temperature.</b> In a spin system the entropy falls as energy approaches the maximum, so \(\frac{\partial S}{\partial E} < 0\): population inversion in lasers is a negative-temperature state, hotter than any positive temperature.</p>
<p><b>Second law.</b> Heat flowing from hot to cold increases total entropy: \(\Delta S = Q\left(\frac{1}{T_C} - \frac{1}{T_H}\right) > 0\).</p>`,
      ex: { q: T`1000 J of heat flows from a 500 K reservoir to a 300 K reservoir. Find the total entropy change.`, a: T`<p>\(\Delta S = \frac{1000}{300} - \frac{1000}{500} = 3.333 - 2 = 1.333\) J/K, positive as required.</p>` },
      trap: T`Thinking equilibrium means equal energies. It means equal temperatures; a big system holds more energy at the same temperature.`,
      vary: [[T`\(\Delta S\) (J/K) for 600 J from 400 K to 200 K?`, 1.5, T`\(3 - 1.5\).`], [T`Most probable \(q_A\) for \(N_A = N_B\), \(q = 10\)?`, 5, T`Equal sharing.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>A small system in contact with a large reservoir at temperature \(T\) visits each of its states with probability proportional to \(e^{-E/k_BT}\). This one formula drives chemistry, semiconductors, and atmospheric physics.</p>`,
      body: T`
\[P(s) = \frac{e^{-E_s/k_BT}}{Z},\qquad Z = \sum_se^{-E_s/k_BT}\]
<p><b>Two levels</b> separated by \(\varepsilon\): \(\frac{P_1}{P_0} = e^{-\varepsilon/k_BT}\), and \(P_1 = \frac{1}{e^{\varepsilon/k_BT} + 1}\). With degeneracies \(g\), multiply by \(g_1/g_0\).</p>
<p><b>Scale.</b> \(k_BT \approx 0.0259\) eV at 300 K (about \(\frac{1}{40}\) eV). Electronic excitations (a few eV) are frozen out at room temperature: \(e^{-10/0.0259}\) is utterly negligible for hydrogen's first excitation.</p>
<p><b>Atmosphere.</b> The barometric formula \(P(h) = P_0e^{-mgh/k_BT}\) is a Boltzmann factor; for air at 290 K the scale height is about 8.5 km.</p>
<p><b>Arrhenius law.</b> Reaction rates scale as \(e^{-E_a/k_BT}\). For a 0.5 eV barrier the rate at 310 K is about 1.9 times the rate at 300 K: roughly doubling every 10 K.</p>
<p><b>Constants:</b> \(k_B = 1.381\times10^{-23}\) J/K \(= 8.617\times10^{-5}\) eV/K.</p>`,
      ex: { q: T`A two-level system has \(\varepsilon = 0.05\) eV. Find the excited-state probability at 300 K.`, a: T`<p>\(\frac{\varepsilon}{k_BT} = \frac{0.05}{0.02585} = 1.934\). \(P_1 = \frac{1}{e^{1.934} + 1} \approx 0.126\).</p>` },
      trap: T`Forgetting to normalize: \(e^{-E/k_BT}\) is a relative weight, not a probability.`,
      vary: [[T`\(P_1/P_0\) when \(\varepsilon = k_BT\), four decimals.`, Math.exp(-1), T`\(e^{-1}\).`], [T`\(P_1\) when \(\varepsilon = 0\)?`, 0.5, T`Equal weights.`], [T`\(k_BT\) (eV) at 300 K, four decimals.`, KEV * 300, T`\(8.617\times10^{-5}\cdot300\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>The partition function \(Z\) is a single sum that knows all the thermodynamics: energy, free energy, entropy, and heat capacity are all derivatives of \(\ln Z\).</p>`,
      body: T`
<p>With \(\beta = \frac{1}{k_BT}\):</p>
\[\langle E\rangle = -\frac{\partial\ln Z}{\partial\beta},\qquad F = -k_BT\ln Z,\qquad S = \frac{\langle E\rangle - F}{T}\]
<p>Heat capacity \(C = \frac{\partial\langle E\rangle}{\partial T}\), and energy fluctuations \(\sigma_E^2 = k_BT^2C\).</p>
<table class="tt"><tr><th>System</th><th>\(Z\)</th><th>\(\langle E\rangle\)</th></tr>
<tr><td>Two levels \(0, \varepsilon\)</td><td>\(1 + e^{-\beta\varepsilon}\)</td><td>\(\frac{\varepsilon}{e^{\beta\varepsilon} + 1}\)</td></tr>
<tr><td>Quantum oscillator</td><td>\(\frac{e^{-\beta\hbar\omega/2}}{1 - e^{-\beta\hbar\omega}}\)</td><td>\(\frac{\hbar\omega}{2} + \frac{\hbar\omega}{e^{\beta\hbar\omega} - 1}\)</td></tr>
<tr><td>Free particle in 1D (classical)</td><td>\(\frac{L}{\lambda}\)</td><td>\(\frac12k_BT\)</td></tr></table>
<p><b>Independent subsystems</b> multiply: \(Z_{\text{tot}} = Z_1^N\) for distinguishable particles, \(\frac{Z_1^N}{N!}\) for identical ones in the classical limit.</p>
<p><b>Schottky anomaly.</b> The two-level heat capacity peaks near \(k_BT \approx 0.42\varepsilon\), then falls: once both levels are equally filled, adding heat stops changing anything.</p>
<p><b>Einstein model of solids.</b> \(3N\) quantum oscillators give \(C \to 3Nk_B\) at high \(T\) (Dulong–Petit) and freeze out exponentially at low \(T\).</p>`,
      ex: { q: T`For the quantum oscillator with \(\hbar\omega = k_BT\), find \(\langle E\rangle\) in units of \(\hbar\omega\).`, a: T`<p>\(\frac12 + \frac{1}{e - 1} = 0.5 + 0.582 = 1.082\). The classical value would be 1.</p>` },
      trap: T`Differentiating \(\ln Z\) with respect to \(T\) instead of \(\beta\) in the energy formula.`,
      vary: [[T`\(\langle E\rangle/\varepsilon\) for two levels at \(\beta\varepsilon = 0\)?`, 0.5, T`Equal populations.`], [T`High-temperature heat capacity of the Einstein solid per atom, in units of \(k_B\)?`, 3, T`Dulong–Petit.`], [T`\(\langle E\rangle/\hbar\omega\) as \(T \to 0\)?`, 0.5, T`Zero-point energy.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Classically, every quadratic term in the energy holds \(\frac12k_BT\) on average. That one rule gives the heat capacities of gases and the speeds of molecules.</p>`,
      body: T`
<p><b>Equipartition.</b> Each quadratic degree of freedom carries \(\frac12k_BT\). Monatomic gas: 3 (translation), \(C_V = \frac32Nk_B\). Diatomic at room temperature: 5 (plus 2 rotations), \(\frac52Nk_B\); vibration adds 2 more only when hot.</p>
<p><b>Ideal gas law:</b> \(PV = Nk_BT\).</p>
<p><b>Maxwell speed distribution:</b></p>
\[f(v) = 4\pi\left(\frac{m}{2\pi k_BT}\right)^{3/2}v^2e^{-mv^2/2k_BT}\]
<table class="tt"><tr><th>Speed</th><th>Formula</th></tr>
<tr><td>Most probable</td><td>\(\sqrt{\frac{2k_BT}{m}}\)</td></tr>
<tr><td>Mean</td><td>\(\sqrt{\frac{8k_BT}{\pi m}}\)</td></tr>
<tr><td>RMS</td><td>\(\sqrt{\frac{3k_BT}{m}}\)</td></tr></table>
<p>For N\(_2\) (28 u) at 300 K: 422, 476, 517 m/s. Lighter molecules move faster at the same temperature, which is why hydrogen and helium escape Earth's atmosphere.</p>
<p><b>Where equipartition fails.</b> Quantized degrees of freedom freeze out when \(k_BT \ll\) their level spacing: hydrogen's rotation below about 100 K, vibrations of most gases at room temperature, and the ultraviolet catastrophe of blackbody radiation.</p>`,
      ex: { q: T`Find the RMS speed of helium (4 u) at 300 K.`, a: T`<p>\(\sqrt{\frac{3(1.381\times10^{-23})(300)}{4(1.661\times10^{-27})}} \approx 1368\) m/s.</p>` },
      trap: T`Using the molar mass in kg/mol as the molecular mass. Divide by Avogadro's number (or use atomic mass units).`,
      vary: [[T`\(C_V/Nk_B\) for a monatomic gas?`, 1.5, T`3 halves.`], [T`\(C_V/Nk_B\) for a diatomic gas at room temperature?`, 2.5, T`5 halves.`], [T`Ratio \(v_{\text{rms}}/v_{\text{mp}}\), four decimals.`, Math.sqrt(1.5), T`\(\sqrt{3/2}\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>When particles are identical and their wavefunctions overlap, counting changes. Fermions refuse to share states and build the Fermi sea; bosons crowd together and can condense into one state.</p>`,
      body: T`
<p><b>Mean occupation</b> of a single-particle state of energy \(\varepsilon\) at chemical potential \(\mu\):</p>
\[\bar n_{FD} = \frac{1}{e^{(\varepsilon - \mu)/k_BT} + 1},\qquad \bar n_{BE} = \frac{1}{e^{(\varepsilon - \mu)/k_BT} - 1}\]
<p>Both reduce to the Boltzmann factor \(e^{-(\varepsilon - \mu)/k_BT}\) when it is small (dilute, hot limit).</p>
<p><b>Fermi–Dirac.</b> At \(T = 0\), states below \(\mu = E_F\) are full and above are empty. At \(\varepsilon = \mu\), \(\bar n = \frac12\) at any temperature. The step softens over a width of a few \(k_BT\). Only electrons within about \(k_BT\) of \(E_F\) can absorb heat, which is why metals' electronic heat capacity is tiny (\(\propto T\)).</p>
<p><b>Fermi energy</b> of a 3D electron gas: \(E_F = \frac{\hbar^2}{2m}(3\pi^2n)^{2/3}\). Copper (\(n = 8.5\times10^{28}\) m\(^{-3}\)): 7.0 eV, so \(T_F \approx 81{,}000\) K. Metals are deeply degenerate at room temperature.</p>
<p><b>Bose–Einstein.</b> \(\mu \le\) the lowest energy; as \(T\) drops, the ground state's occupation becomes macroscopic: Bose–Einstein condensation, observed in cold atoms (1995) and underlying superfluid helium.</p>
<p><b>Photons and phonons</b> have \(\mu = 0\) (their number is not conserved): \(\bar n = \frac{1}{e^{\hbar\omega/k_BT} - 1}\), the Planck distribution.</p>`,
      ex: { q: T`Find the FD occupation of a state 0.1 eV above \(\mu\) at 300 K, and the BE occupation of a mode with \(\hbar\omega = 0.05\) eV.`, a: T`<p>\(\frac{0.1}{0.02585} = 3.87\): \(\bar n_{FD} = \frac{1}{e^{3.87} + 1} \approx 0.0205\). \(\frac{0.05}{0.02585} = 1.934\): \(\bar n_{BE} = \frac{1}{e^{1.934} - 1} \approx 0.170\).</p>` },
      trap: T`Mixing the signs: \(+1\) for fermions (occupation at most 1), \(-1\) for bosons (unbounded).`,
      vary: [[T`FD occupation at \(\varepsilon = \mu\)?`, 0.5, T`Any temperature.`], [T`FD occupation at \(\varepsilon - \mu = -\infty\) (deep in the sea)?`, 1, T`Full.`], [T`BE occupation for \(\frac{\varepsilon - \mu}{k_BT} = \ln2\)?`, 1, T`\(\frac{1}{2 - 1}\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>A hot object glows with a spectrum fixed by its temperature alone. Explaining that spectrum forced Planck to introduce energy quanta in 1900, the birth of quantum theory.</p>`,
      body: T`
<p><b>Planck's law</b> (energy per volume per frequency):</p>
\[u(\nu) = \frac{8\pi h\nu^3}{c^3}\frac{1}{e^{h\nu/k_BT} - 1}\]
<p>At low frequency this becomes the classical Rayleigh–Jeans \(\frac{8\pi\nu^2k_BT}{c^3}\), which would diverge at high frequency (the ultraviolet catastrophe). The quantum factor cuts it off.</p>
<p><b>Wien's displacement law:</b> \(\lambda_{\max}T = 2.898\times10^{-3}\) m K. The Sun (5772 K) peaks near 502 nm; a human body (310 K) near 9.3 µm, in the infrared.</p>
<p><b>Stefan–Boltzmann law:</b> emitted power per area \(\sigma T^4\), with \(\sigma = 5.670\times10^{-8}\) W m\(^{-2}\) K\(^{-4}\). A gray body emits \(e\sigma T^4\) with emissivity \(e < 1\). Doubling the temperature multiplies the output by 16.</p>
<p><b>Cosmic microwave background:</b> a nearly perfect blackbody at 2.725 K, peaking at 1.06 mm (in wavelength).</p>
<p><b>Planetary temperature.</b> A planet absorbing sunlight \(S(1 - a)\pi R^2\) and radiating \(4\pi R^2\sigma T^4\) has \(T = \left[\frac{S(1 - a)}{4\sigma}\right]^{1/4}\): about 255 K for Earth, 33 K below the actual mean thanks to the greenhouse effect.</p>`,
      ex: { q: T`A star peaks at 400 nm. Find its surface temperature and the power per square meter it emits.`, a: T`<p>\(T = \frac{2.898\times10^{-3}}{4\times10^{-7}} \approx 7245\) K. \(\sigma T^4 \approx 5.67\times10^{-8}(7245)^4 \approx 1.56\times10^8\) W/m\(^2\).</p>` },
      trap: T`Using Celsius in \(T^4\). Always use kelvins.`,
      vary: [[T`Factor change in radiated power if \(T\) doubles?`, 16, T`\(2^4\).`], [T`Wien peak (µm) at 1000 K, four decimals.`, 2.898, T`\(\frac{2898}{1000}\).`], [T`Factor change in \(\lambda_{\max}\) if \(T\) triples, four decimals.`, 1 / 3, T`Inverse.`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Below a critical temperature, interacting spins spontaneously align and a magnet forms. Mean-field theory captures this by letting each spin feel the average of its neighbors, which turns the problem into one self-consistent equation.</p>`,
      body: T`
<p><b>Ising model.</b> Spins \(s_i = \pm1\), energy \(-J\sum_{\langle ij\rangle}s_is_j\) (neighbors), \(z\) neighbors each.</p>
<p><b>Mean field.</b> Replace neighbors by the average magnetization \(m\). Each spin feels an effective field \(zJm\), so</p>
\[m = \tanh\left(\frac{zJm}{k_BT}\right) = \tanh\left(\frac{T_c}{T}m\right),\qquad k_BT_c = zJ\]
<p>For \(T > T_c\) the only solution is \(m = 0\). For \(T < T_c\) two nonzero solutions \(\pm m_0\) appear: spontaneous symmetry breaking. Near \(T_c\), \(m_0 \approx \sqrt{3\left(1 - \frac{T}{T_c}\right)}\), the critical exponent \(\beta = \frac12\).</p>
<p><b>Solving.</b> Iterate \(m \leftarrow \tanh\left(\frac{T_c}{T}m\right)\) from \(m = 1\). At \(T = 0.5T_c\): \(m_0 \approx 0.957\).</p>
<p><b>Reality check.</b> In 1D there is no transition at any \(T > 0\) (mean field is wrong there). In 2D, Onsager's exact solution gives \(k_BT_c = \frac{2J}{\ln(1 + \sqrt2)} \approx 2.269J\) on the square lattice, versus mean field's \(4J\), and exponent \(\beta = \frac18\). Mean field improves in higher dimensions and is exact above four.</p>
<p><b>Landau theory.</b> Near \(T_c\), expand the free energy as \(F = a(T - T_c)m^2 + bm^4\); minimizing reproduces \(m_0 \propto (T_c - T)^{1/2}\).</p>`,
      ex: { q: T`Find the mean-field magnetization at \(T = 0.9T_c\).`, a: T`<p>Iterate \(m = \tanh(1.111m)\): it converges to \(m_0 \approx 0.525\). The small-\(m\) formula gives \(\sqrt{0.3} = 0.548\), a rough match.</p>` },
      trap: T`Expecting a nonzero magnetization above \(T_c\) in zero field.`,
      vary: [[T`Mean-field \(k_BT_c/J\) for the square lattice (\(z = 4\))?`, 4, T`\(zJ\).`], [T`Onsager's \(k_BT_c/J\), three decimals.`, 2 / Math.log(1 + Math.SQRT2), T`\(\frac{2}{\ln(1 + \sqrt2)}\).`], [T`Magnetization above \(T_c\) in zero field?`, 0, T`Only \(m = 0\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Entropy also measures missing information. Shannon's formula for the information in a message has exactly the form of Gibbs's entropy, and the two are the same idea.</p>`,
      body: T`
<p><b>Gibbs entropy:</b> \(S = -k_B\sum_ip_i\ln p_i\). For \(\Omega\) equally likely states it reduces to \(k_B\ln\Omega\).</p>
<p><b>Shannon entropy</b> in bits: \(H = -\sum p_i\log_2p_i\). A fair coin: 1 bit. A die: \(\log_26 \approx 2.585\) bits. A biased coin with \(p = 0.9\): \(H \approx 0.469\) bits.</p>
<p><b>Maximum entropy.</b> Among distributions with fixed average energy, the Boltzmann distribution has the largest entropy, which is one way to derive it.</p>
<p><b>Mixing entropy.</b> Mixing ideal gases with mole fractions \(x_i\) increases entropy by \(-Nk_B\sum x_i\ln x_i\): \(Nk_B\ln2\) for equal amounts of two gases. Mixing two samples of the same gas changes nothing (the Gibbs paradox, resolved by indistinguishability).</p>
<p><b>Landauer's principle.</b> Erasing one bit of information dissipates at least \(k_BT\ln2\) of heat: \(2.87\times10^{-21}\) J at 300 K. It resolves Maxwell's demon: the demon's memory must eventually be erased, paying back the entropy it seemed to remove.</p>
<p><b>Kullback–Leibler divergence</b> \(D(p\|q) = \sum p_i\ln\frac{p_i}{q_i} \ge 0\) measures the extra cost of assuming \(q\) when the truth is \(p\); the free energy above equilibrium equals \(k_BT\,D(p\|p_{\text{eq}})\).</p>`,
      ex: { q: T`Find the Shannon entropy of the distribution \((\frac12, \frac14, \frac14)\).`, a: T`<p>\(\frac12(1) + \frac14(2) + \frac14(2) = 1.5\) bits.</p>` },
      trap: T`Mixing logarithm bases. Bits use \(\log_2\); thermodynamic entropy uses \(\ln\) times \(k_B\).`,
      vary: [[T`Entropy (bits) of a fair 8-sided die?`, 3, T`\(\log_28\).`], [T`Landauer limit (units \(10^{-21}\) J) at 300 K, three decimals.`, KB * 300 * Math.log(2) * 1e21, T`\(k_BT\ln2\).`], [T`Mixing entropy per particle (units \(k_B\)) for equal amounts of two gases, four decimals.`, Math.log(2), T`\(\ln2\).`]] }
  ]);

  addQuestions('sm', [
    { id: 'sm1', skill: U[0], q: T`Entropy is defined via the logarithm of the multiplicity because:`, c: ['multiplicities of independent systems multiply, while entropies should add', 'it makes entropy dimensionless', 'logarithms are always positive', 'it was Boltzmann’s convention with no reason'], x: T`\(\ln(\Omega_A\Omega_B) = \ln\Omega_A + \ln\Omega_B\).` },
    { id: 'sm2', skill: U[1], q: T`Two systems in thermal contact reach equilibrium when they have equal:`, c: ['temperature', 'energy', 'entropy', 'heat capacity'], x: T`\(\partial S/\partial E\) matches.` },
    { id: 'sm3', skill: U[4], q: T`Equipartition fails for molecular vibrations at room temperature because:`, c: [T`the vibrational level spacing is much larger than \(k_BT\)`, 'molecules do not vibrate', 'vibrations are not quadratic', 'the gas is not ideal'], x: T`Quantized modes freeze out.` },
    { id: 'sm4', skill: U[5], q: T`The electronic heat capacity of a metal is small at room temperature because:`, c: [T`only electrons within about \(k_BT\) of the Fermi energy can be excited`, 'electrons are bosons', 'electrons do not carry energy', 'the lattice absorbs all heat'], x: T`Pauli blocking.` },
    { id: 'sm5', skill: U[6], q: T`Planck's quantum hypothesis resolved:`, c: ['the ultraviolet catastrophe', 'the photoelectric effect only', 'the Gibbs paradox', 'negative temperature'], x: T`It cuts off the high-frequency divergence.` },
    { id: 'sm6', skill: U[7], q: T`In the one-dimensional Ising model with nearest-neighbor coupling:`, c: ['there is no phase transition at positive temperature', 'mean field theory is exact', 'the critical temperature is 4J', 'the magnetization is always 1'], x: T`Domain walls cost finite energy but gain unbounded entropy.` }
  ]);

  // ======================= GENERATORS =======================
  const C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

  registerUnitGens('sm', { units: {
    [U[0]]: [{ id: 'sm-micro', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const N = R.int(4, 12), n = R.int(0, N); return { q: T`How many microstates have exactly ${n} of ${N} two-state spins up?`, answer: C(N, n), x: T`\(\binom{${N}}{${n}} = ${C(N, n)}\).`, v: `sum(1 for t in product((0, 1), repeat=${N}) if sum(t) == ${n})` }; }
      if (k === 1) { const N = R.int(2, 5), q = R.int(1, 6); return { q: T`An Einstein solid has \(N = ${N}\) oscillators and \(q = ${q}\) quanta. Find \(\Omega\).`, answer: C(q + N - 1, q), x: T`\(\binom{q + N - 1}{q} = \binom{${q + N - 1}}{${q}}\).`, v: `sum(1 for t in product(range(${q + 1}), repeat=${N}) if sum(t) == ${q})` }; }
      const N = R.int(2, 4), q = R.int(2, 5), Om = C(q + N - 1, q); return { q: T`Find \(S/k_B\) for an Einstein solid with \(N = ${N}\), \(q = ${q}\), to four decimals.`, answer: Math.log(Om), tol: 1e-4, x: T`\(\Omega = ${Om}\), \(S/k_B = \ln${Om}\).`, v: `log(sum(1 for t in product(range(${q + 1}), repeat=${N}) if sum(t) == ${q}))` };
    } }],
    [U[1]]: [{ id: 'sm-eq', make(R) {
      if (R.int(0, 1)) { const NA = R.int(1, 5), NB = R.int(1, 5), q = R.int(3, 10); let best = 0, bv = -1; for (let a = 0; a <= q; a++) { const w = C(a + NA - 1, a) * C(q - a + NB - 1, q - a); if (w > bv) { bv = w; best = a; } }
        let ties = 0; for (let a = 0; a <= q; a++) if (C(a + NA - 1, a) * C(q - a + NB - 1, q - a) === bv) ties++; if (ties > 1) return this.make(R);
        return { q: T`Einstein solids A (\(N_A = ${NA}\)) and B (\(N_B = ${NB}\)) share \(q = ${q}\) quanta. Find the most probable \(q_A\).`, answer: best, x: T`Maximize \(\Omega_A(q_A)\Omega_B(q - q_A)\); the peak is at \(q_A = ${best}\), roughly in proportion to size.`, v: `max(range(${q + 1}), key=lambda a: binomial(a + ${NA} - 1, a)*binomial(${q} - a + ${NB} - 1, ${q} - a))` }; }
      const Q = R.int(100, 2000), TH = R.pick([400, 500, 600, 800]), TC = R.pick([200, 250, 300]); return { q: T`${Q} J of heat flows from a ${TH} K reservoir to a ${TC} K reservoir. Find the total entropy change in J/K, to four decimals.`, answer: Q / TC - Q / TH, tol: 1e-4, x: T`\(\frac{${Q}}{${TC}} - \frac{${Q}}{${TH}}\).`, v: `Rational(${Q}, ${TC}) - Rational(${Q}, ${TH})` };
    } }],
    [U[2]]: [{ id: 'sm-boltz', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const eps = R.pick([0.01, 0.025, 0.05, 0.1, 0.2]), TK = R.pick([77, 150, 300, 600, 1000]), x = eps / (KEV * TK), g = R.pick([1, 1, 3]), P = g / (Math.exp(x) + g);
        return { q: T`A two-level system has gap ${eps} eV${g > 1 ? T` and the upper level is ${g}-fold degenerate` : ''}. Find the probability of the upper level at ${TK} K, to four decimals.`, answer: P, tol: 1e-4, x: T`\(\frac{\varepsilon}{k_BT} = ${R.fmt(x, 4)}\); \(P = \frac{${g}e^{-x}}{1 + ${g}e^{-x}}\).`, v: `(lambda Z: ${g}*exp(-nsimplify(${eps})/(8.617333e-5*${TK}))/Z)(1 + ${g}*exp(-nsimplify(${eps})/(8.617333e-5*${TK})))` }; }
      if (k === 1) { const TK = R.pick([250, 290, 300]), m = 29 * AMU, H = KB * TK / (m * 9.81) / 1000; return { q: T`Find the atmospheric scale height \(k_BT/mg\) in km for air (29 u) at ${TK} K, to three decimals.`, answer: H, tol: 0.001, x: T`\(\frac{(1.381\times10^{-23})(${TK})}{29(1.661\times10^{-27})(9.81)}\).`, v: `1.380649e-23*${TK}/(29*1.66054e-27*9.81)/1000` }; }
      const Ea = R.pick([0.3, 0.5, 0.7, 1.0]), T1 = 300, T2 = R.pick([310, 320, 350]), r = Math.exp(Ea / KEV * (1 / T1 - 1 / T2));
      return { q: T`A reaction has activation energy ${Ea} eV. By what factor does its Arrhenius rate grow from ${T1} K to ${T2} K? (Three decimals.)`, answer: r, tol: Math.max(0.001, r * 1e-5), x: T`\(\exp\left[\frac{E_a}{k_B}\left(\frac{1}{${T1}} - \frac{1}{${T2}}\right)\right]\).`, v: `exp(-nsimplify(${Ea})/(8.617333e-5*${T2}))/exp(-nsimplify(${Ea})/(8.617333e-5*${T1}))` };
    } }],
    [U[3]]: [{ id: 'sm-part', make(R) {
      const k = R.int(0, 2), x = R.pick([0.5, 1, 2, 3]);
      if (k === 0) return { q: T`Two levels \(0\) and \(\varepsilon\) at \(\beta\varepsilon = ${x}\). Find \(\langle E\rangle/\varepsilon\), to four decimals.`, answer: 1 / (Math.exp(x) + 1), tol: 1e-4, x: T`\(\frac{1}{e^{\beta\varepsilon} + 1}\).`, v: `(lambda b: -diff(log(1 + exp(-b)), b).subs(b, nsimplify(${x})))(Symbol('b'))` };
      if (k === 1) return { q: T`A quantum oscillator has \(\frac{\hbar\omega}{k_BT} = ${x}\). Find \(\langle E\rangle/\hbar\omega\), to four decimals.`, answer: 0.5 + 1 / (Math.exp(x) - 1), tol: 1e-4, x: T`\(\frac12 + \frac{1}{e^{x} - 1}\) with \(x = ${x}\).`, v: `(lambda b: -diff(log(exp(-b/2)/(1 - exp(-b))), b).subs(b, nsimplify(${x})))(Symbol('b'))` };
      return { q: T`Two levels \(0\) and \(\varepsilon\) at \(\beta\varepsilon = ${x}\). Find the heat capacity \(C/k_B\), to four decimals.`, answer: x * x * Math.exp(x) / (Math.exp(x) + 1) ** 2, tol: 1e-4, x: T`\(C/k_B = \frac{(\beta\varepsilon)^2e^{\beta\varepsilon}}{(e^{\beta\varepsilon} + 1)^2}\): the Schottky form.`, v: `(lambda b: (b**2*diff(log(1 + exp(-b)), b, 2)).subs(b, nsimplify(${x})))(Symbol('b'))` };
    } }],
    [U[4]]: [{ id: 'sm-maxw', make(R) {
      const G = [['N\\(_2\\)', 28], ['O\\(_2\\)', 32], ['He', 4], ['H\\(_2\\)', 2], ['Ar', 40], ['CO\\(_2\\)', 44]], [name, mu] = R.pick(G), TK = R.pick([100, 273, 300, 500, 1000]), m = mu * AMU, k = R.int(0, 2);
      const v = [Math.sqrt(2 * KB * TK / m), Math.sqrt(8 * KB * TK / (Math.PI * m)), Math.sqrt(3 * KB * TK / m)][k];
      return { q: T`Find the ${['most probable', 'mean', 'RMS'][k]} speed of ${name} (${mu} u) at ${TK} K, in m/s, to the nearest m/s.`, answer: v, tol: 1, x: T`${['\\(\\sqrt{2k_BT/m}\\)', '\\(\\sqrt{8k_BT/\\pi m}\\)', '\\(\\sqrt{3k_BT/m}\\)'][k]} with \(m = ${mu}\times1.661\times10^{-27}\) kg.`,
        v: `(lambda a: ${['[r for r in solve(diff(Symbol(\'s\')**2*exp(-a*Symbol(\'s\')**2), Symbol(\'s\')), Symbol(\'s\')) if r > 0][0]', '_mp.quad(lambda s: s*4*_mp.pi*(a/_mp.pi)**1.5*s**2*_mp.exp(-a*s**2), [0, _mp.inf])', '_mp.sqrt(_mp.quad(lambda s: s**2*4*_mp.pi*(a/_mp.pi)**1.5*s**2*_mp.exp(-a*s**2), [0, _mp.inf]))'][k]})(${m}/(2*1.380649e-23*${TK}))` };
    } }],
    [U[5]]: [{ id: 'sm-qstat', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const d = R.pick([-0.1, -0.05, 0, 0.05, 0.1, 0.2]), TK = R.pick([100, 300, 1000]), n = 1 / (Math.exp(d / (KEV * TK)) + 1); return { q: T`Find the Fermi–Dirac occupation of a state ${d >= 0 ? d + ' eV above' : -d + ' eV below'} \(\mu\) at ${TK} K, to four decimals.`, answer: n, tol: 1e-4, x: T`\(\frac{1}{e^{(\varepsilon - \mu)/k_BT} + 1}\) with \(\frac{\varepsilon - \mu}{k_BT} = ${R.fmt(d / (KEV * TK), 4)}\).`, v: `(lambda Z: exp(-${d}/(8.617333e-5*${TK}))/Z)(1 + exp(-${d}/(8.617333e-5*${TK})))` }; }
      if (k === 1) { const e = R.pick([0.01, 0.025, 0.05, 0.1]), TK = R.pick([100, 300, 1000]), x = e / (KEV * TK); return { q: T`Find the mean photon number in a mode with \(\hbar\omega = ${e}\) eV at ${TK} K, to four decimals.`, answer: 1 / (Math.exp(x) - 1), tol: 1e-4, x: T`Planck: \(\frac{1}{e^{${R.fmt(x, 4)}} - 1}\).`, v: `_mp.nsum(lambda n: n*_mp.exp(-n*${R.fmt(x, 12)}), [0, _mp.inf])/_mp.nsum(lambda n: _mp.exp(-n*${R.fmt(x, 12)}), [0, _mp.inf])` }; }
      const M = [['Cu', 8.47e28], ['Na', 2.65e28], ['Al', 18.1e28], ['Ag', 5.86e28]], [name, n] = R.pick(M), EF = (1.054571817e-34) ** 2 / (2 * 9.1093837e-31) * (3 * Math.PI ** 2 * n) ** (2 / 3) / 1.602176634e-19;
      return { q: T`Find the Fermi energy (eV) of ${name}, with \(n = ${(n / 1e28).toFixed(2)}\times10^{28}\) m\(^{-3}\), to three decimals.`, answer: EF, tol: 0.001, x: T`\(E_F = \frac{\hbar^2}{2m}(3\pi^2n)^{2/3}\).`, v: `(1.054571817e-34)**2/(2*9.1093837e-31)*(3*pi**2*${n})**Rational(2, 3)/1.602176634e-19` };
    } }],
    [U[6]]: [{ id: 'sm-bb', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const TK = R.pick([310, 1000, 3000, 5772, 10000, 2.725]); return { q: T`Find the Wien peak wavelength in µm for a blackbody at ${TK} K, to four decimals.`, answer: 2897.77 / TK, tol: 1e-4 * Math.max(1, 2897.77 / TK), x: T`\(\lambda_{\max} = \frac{2897.77}{${TK}}\) µm (with \(T\) in kelvins).`, v: `(lambda x0: 6.62607015e-34*2.99792458e8/(x0*1.380649e-23*${TK})*1e6)(nsolve(Symbol('x') - 5*(1 - exp(-Symbol('x'))), Symbol('x'), 5))` }; }
      if (k === 1) { const TK = R.pick([300, 1000, 3000, 5772]), e = R.pick([1, 0.9, 0.5]); return { q: T`Find the radiated power per area (kW/m\(^2\)) of a surface at ${TK} K with emissivity ${e}, to three decimals.`, answer: e * 5.670374e-8 * TK ** 4 / 1000, tol: Math.max(0.001, e * 5.670374e-8 * TK ** 4 / 1000 * 1e-5), x: T`\(e\sigma T^4\).`, v: `${e}*2*pi**5*1.380649e-23**4/(15*6.62607015e-34**3*2.99792458e8**2)*${TK}**4/1000` }; }
      const a = R.pick([0.3, 0.1, 0.75]), S = R.pick([1361, 589, 2601]); return { q: T`A planet receives ${S} W/m\(^2\) and has albedo ${a}. Find its equilibrium temperature (K), to two decimals.`, answer: (S * (1 - a) / (4 * 5.670374e-8)) ** 0.25, tol: 0.01, x: T`\(T = \left[\frac{S(1 - a)}{4\sigma}\right]^{1/4}\).`, v: `nsolve(4*5.670374e-8*Symbol('T')**4 - ${S}*(1 - ${a}), Symbol('T'), 250)` };
    } }],
    [U[7]]: [{ id: 'sm-ising', make(R) {
      const k = R.int(0, 1);
      if (k === 0) { const t = R.pick([0.3, 0.5, 0.7, 0.8, 0.9, 0.95]); let m = 1; for (let i = 0; i < 5000; i++) m = Math.tanh(m / t); return { q: T`Find the mean-field magnetization at \(T = ${t}T_c\), to four decimals.`, answer: m, tol: 1e-4, x: T`Solve \(m = \tanh(m/${t})\) by iteration from \(m = 1\): \(m_0 \approx ${R.fmt(m, 5)}\).`, v: `nsolve(Symbol('m') - tanh(Symbol('m')/nsimplify(${t})), Symbol('m'), 0.99)` }; }
      const z = R.pick([2, 4, 6, 8, 12]), J = R.pick([1, 0.5, 2]); return { q: T`Find the mean-field \(k_BT_c\) for coupling \(J = ${J}\) with \(z = ${z}\) neighbors.`, answer: z * J, tol: 1e-6, x: T`\(k_BT_c = zJ\).`, v: `(lambda m: solve(diff(tanh(${z}*${J}*m/Symbol('T')), m).subs(m, 0) - 1, Symbol('T'))[0])(Symbol('m'))` };
    } }],
    [U[8]]: [{ id: 'sm-info', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const D = R.pick([[0.5, 0.25, 0.25], [0.5, 0.5], [0.9, 0.1], [0.25, 0.25, 0.25, 0.25], [0.7, 0.2, 0.1], [0.125, 0.125, 0.25, 0.5]]), H = -D.reduce((s, p) => s + p * Math.log2(p), 0);
        return { q: T`Find the Shannon entropy (bits) of the distribution \((${D.join(', ')})\), to four decimals.`, answer: H, tol: 1e-4, x: T`\(-\sum p\log_2p\).`, v: `-sum(nsimplify(p)*log(nsimplify(p), 2) for p in [${D}])` }; }
      if (k === 1) { const TK = R.pick([4, 77, 300, 1000]); return { q: T`Find the Landauer limit \(k_BT\ln2\) at ${TK} K, in units of \(10^{-21}\) J, to four decimals.`, answer: KB * TK * Math.log(2) * 1e21, tol: 1e-4, x: T`\(1.381\times10^{-23}\cdot${TK}\cdot0.6931\).`, v: `1.380649e-23*${TK}*log(2)*1e21` }; }
      const xs = R.pick([[0.5, 0.5], [0.25, 0.75], [0.2, 0.3, 0.5], [0.1, 0.9]]), s = -xs.reduce((a, x) => a + x * Math.log(x), 0);
      return { q: T`Find the ideal mixing entropy per particle (units \(k_B\)) for mole fractions \((${xs.join(', ')})\), to four decimals.`, answer: s, tol: 1e-4, x: T`\(-\sum x_i\ln x_i\).`, v: `(lambda N: float(_mp.loggamma(N + 1) - sum(_mp.loggamma(N*x + 1) for x in [${xs}]))/N)(10**9)` };
    } }]
  } });
})();
