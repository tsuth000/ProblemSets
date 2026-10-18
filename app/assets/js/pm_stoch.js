'use strict';
// Pure math track: Stochastic calculus. Every generator carries an independent check (v or vk) that verify.py evaluates by a
// different route from the closed form taught here: quadrature against the normal density, the generator's definition as a
// limit, boundary-value problems, moment ODEs, path enumeration, and generating functions.
(() => {
  registerSubject({ id: 'stoch', name: 'Stochastic calculus', color: '#2E5E6E', blurb: 'Random walks, Brownian motion, martingales, stopping times, the Itô integral, Itô’s lemma, SDEs, Feynman–Kac, Girsanov, Black–Scholes, simulation', questions: [], generators: [] });
  const U = ['Stochastic processes and filtrations', 'Random walks and Brownian motion', 'Brownian paths', 'Martingales', 'Stopping times and optional stopping', 'The Itô integral', 'Itô’s lemma', 'Stochastic differential equations', 'Feynman–Kac', 'Girsanov and change of measure', 'Black–Scholes', 'Simulation and Monte Carlo'];

  // Normal density and an accurate CDF (series for |x| < 3, continued fraction beyond; error below 1e-13).
  const phi = z => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
  function Phi(z) {
    const a = Math.abs(z) / Math.SQRT2; let erf;
    if (a < 3) { let term = a, sum = a; for (let n = 1; n < 120; n++) { term *= -a * a / n; sum += term / (2 * n + 1); } erf = 2 / Math.sqrt(Math.PI) * sum; }
    else { let f = 0; for (let n = 60; n >= 1; n--) f = n / 2 / (a + f); erf = 1 - Math.exp(-a * a) / Math.sqrt(Math.PI) / (a + f); }
    return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
  }
  const R0 = { fmt: (v, d = 4) => { if (Number.isInteger(v)) return String(v); const s = v.toFixed(d).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; } };
  const bs = (S, K, r, s, T) => { const d1 = (Math.log(S / K) + (r + s * s / 2) * T) / (s * Math.sqrt(T)), d2 = d1 - s * Math.sqrt(T); return { d1, d2, call: S * Phi(d1) - K * Math.exp(-r * T) * Phi(d2), put: K * Math.exp(-r * T) * Phi(-d2) - S * Phi(-d1) }; };
  // dX = mu dt + sig dW, written without zero or unit coefficients.
  const term = (v, sym) => v === 1 ? sym : v === -1 ? `-${sym}` : `${v}\\,${sym}`;
  const ouT = (th, m, sg) => `dX = ${m === 0 ? (th === 1 ? '-X' : `-${th}X`) : `${th === 1 ? '' : th}(${m} - X)`}\\,dt + ${term(sg, 'dW')}`;
  const sdeT = (mu, sg) => `dX = ${mu === 0 ? '' : `${term(mu, 'dt')} + `}${term(sg, 'dW')}`;
  const binom = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

  registerLearn('stoch', [
    { title: U[0], skill: U[0],
      hook: T`<p>A stochastic process is a random function of time: one random variable for each instant. To reason about it we also need to track what is known at each time, which is what a filtration records.</p>`,
      body: T`
<p>A <b>stochastic process</b> \((X_t)_{t \ge 0}\) is a family of random variables on one probability space \((\Omega, \mathcal F, P)\). Fixing an outcome \(\omega\) gives a <b>sample path</b> \(t \mapsto X_t(\omega)\).</p>
<p>A <b>filtration</b> is an increasing family of σ-algebras \(\mathcal F_s \subseteq \mathcal F_t\) for \(s \le t\): \(\mathcal F_t\) is the information available at time \(t\). The process is <b>adapted</b> if each \(X_t\) is \(\mathcal F_t\)-measurable, meaning its value is known at time \(t\). The <b>natural filtration</b> \(\mathcal F_t = \sigma(X_s : s \le t)\) is the history of the process itself.</p>
<p><b>Increments.</b> A process has <b>independent increments</b> if \(X_t - X_s\) is independent of \(\mathcal F_s\), and <b>stationary increments</b> if the law of \(X_{t} - X_s\) depends only on \(t - s\).</p>
<p><b>Random walk.</b> \(S_n = \xi_1 + \cdots + \xi_n\) with independent steps \(\xi_i = +1\) (probability \(p\)) or \(-1\) (probability \(q = 1 - p\)). Each step has mean \(p - q\) and variance \(1 - (p - q)^2 = 4pq\), so</p>
\[E[S_n] = n(p - q), \quad \operatorname{Var}(S_n) = 4npq\]
<p><b>Poisson process</b> with rate \(\lambda\): counts arrivals; \(N_0 = 0\), independent and stationary increments, and \(N_t - N_s \sim \text{Poisson}(\lambda(t - s))\):</p>
\[P(N_t = k) = e^{-\lambda t}\frac{(\lambda t)^k}{k!}, \quad E[N_t] = \operatorname{Var}(N_t) = \lambda t\]`,
      ex: { q: T`<p>Orders arrive as a Poisson process at 3 per minute. Find the probability of exactly 2 orders in a 40-second window, and the expected number in 5 minutes.</p>`, a: T`<p>40 seconds is \(\frac23\) minute, so the count is Poisson(2): \(e^{-2}\frac{2^2}{2!} = 2e^{-2} \approx 0.2707\). In 5 minutes, \(\lambda t = 15\).</p>` },
      trap: T`Adding the variances of the steps of a biased walk as if each were 1. A \(\pm1\) step has variance \(4pq\), which is 1 only when \(p = \frac12\).`,
      vary: [[T`A walk has \(p = 0.75\). Find \(E[S_{20}]\).`, 10, T`\(20(0.75 - 0.25)\).`], [T`Same walk: \(\operatorname{Var}(S_{20})\)?`, 15, T`\(4 \cdot 20 \cdot 0.75 \cdot 0.25\).`], [T`Poisson rate 2: \(P(N_1 = 0)\), four decimals?`, Math.exp(-2), T`\(e^{-2}\).`], [T`Is \(X_t = W_{t+1}\) adapted to the natural filtration of \(W\)?`, ['No: it uses the future', 'Yes', 'Only for t > 1'], T`At time \(t\) the value \(W_{t+1}\) is not yet known.`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Shrink the steps of a fair random walk and speed it up in the right proportion, and its paths converge to a continuous random curve: Brownian motion, the basic building block of continuous-time models in physics and finance.</p>`,
      body: T`
<p><b>Simple symmetric walk.</b> With \(p = \frac12\), \(S_n = k\) requires \(\frac{n+k}{2}\) up-steps, so</p>
\[P(S_n = k) = \binom{n}{\frac{n+k}{2}}2^{-n}\]
<p>when \(n + k\) is even and \(|k| \le n\), and 0 otherwise. \(E[S_n] = 0\) and \(\operatorname{Var}(S_n) = n\).</p>
<p><b>Scaling limit.</b> Step size \(\frac{1}{\sqrt n}\), \(n\) steps per unit time: \(W^{(n)}_t = S_{\lfloor nt \rfloor}/\sqrt n\) has variance about \(t\) and, by the central limit theorem, is nearly normal. Donsker's theorem: the whole path converges in law to Brownian motion.</p>
<p><b>Standard Brownian motion</b> \(W_t\):</p>
<ul><li>\(W_0 = 0\) and paths are continuous;</li><li>increments over disjoint intervals are independent;</li><li>\(W_t - W_s \sim N(0, t - s)\) for \(s < t\).</li></ul>
<p><b>Covariance.</b> For \(s \le t\), write \(W_t = W_s + (W_t - W_s)\); the second term is independent of \(W_s\), so</p>
\[\operatorname{Cov}(W_s, W_t) = \operatorname{Var}(W_s) = \min(s, t)\]
<p>Linear combinations of values of \(W\) are normal, with variance from the covariances:</p>
\[\operatorname{Var}(aW_s + bW_t) = a^2 s + b^2 t + 2ab\min(s, t)\]
<p>Probabilities come from the normal CDF \(\Phi\): \(P(W_t > c) = 1 - \Phi(c/\sqrt t)\).</p>`,
      ex: { q: T`<p>Find \(\operatorname{Var}(W_1 + W_4)\) and \(\operatorname{Corr}(W_1, W_4)\).</p>`, a: T`<p>\(1 + 4 + 2 \cdot 1 = 7\). The correlation is \(\frac{\min(1, 4)}{\sqrt{1 \cdot 4}} = \frac12\).</p>` },
      trap: T`Treating \(W_s\) and \(W_t\) as independent. Their increments are independent; the values share the path up to \(\min(s, t)\).`,
      vary: [[T`\(P(S_4 = 2)\) for the symmetric walk?`, 0.25, T`\(\binom43/16\).`], [T`\(P(S_5 = 2)\)?`, 0, T`\(n + k\) is odd.`], [T`\(\operatorname{Cov}(W_3, W_7)\)?`, 3, T`\(\min(3, 7)\).`], [T`\(\operatorname{Var}(W_2 - W_5)\)?`, 3, T`\(2 + 5 - 2 \cdot 2\), or simply the increment over length 3.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Brownian paths are continuous but wildly rough: they have no derivative anywhere and infinite length on every interval. What they do have is a finite quadratic variation, and that single fact is why stochastic calculus needs a new chain rule.</p>`,
      body: T`
<p><b>Quadratic variation.</b> Split \([0, T]\) into \(n\) steps of length \(\Delta = T/n\). Each squared increment has mean \(\Delta\) and variance \(2\Delta^2\) (a normal fourth moment is \(3\Delta^2\)), so</p>
\[E\Big[\sum (\Delta W)^2\Big] = T\]
\[\operatorname{Var}\Big[\sum (\Delta W)^2\Big] = \frac{2T^2}{n} \to 0\]
<p>The sum converges to \(T\): \([W]_T = T\), written \(dW^2 = dt\). For \(X_t = \mu t + \sigma W_t\), the drift contributes nothing in the limit and \([X]_T = \sigma^2 T\). A smooth function has quadratic variation 0.</p>
<p><b>Scaling.</b> For \(c > 0\), \(cW_{t/c^2}\) is again a standard Brownian motion.</p>
<p><b>Reflection principle.</b> For \(a > 0\), reflect the path after it first reaches \(a\); this pairs paths ending above \(a\) with paths ending below it, so</p>
\[P\Big(\max_{s \le t} W_s \ge a\Big) = 2P(W_t \ge a) = 2\Big(1 - \Phi\big(\tfrac{a}{\sqrt t}\big)\Big)\]
<p>This is also \(P(\tau_a \le t)\) for the first passage time \(\tau_a = \inf\{t : W_t = a\}\). Brownian motion reaches every level with probability 1, yet \(E[\tau_a] = \infty\).</p>`,
      ex: { q: T`<p>Find the probability that a standard Brownian motion reaches 1 by time 4.</p>`, a: T`<p>\(2(1 - \Phi(1/2)) = 2(1 - 0.6915) \approx 0.6171\).</p>` },
      trap: T`Expecting the sum of squared increments of Brownian motion to vanish as for a smooth curve. It converges to \(T\), not 0.`,
      vary: [[T`\([X]_2\) for \(X_t = 5t + 3W_t\)?`, 18, T`\(\sigma^2 T = 9 \cdot 2\).`], [T`\(\operatorname{Var}\big[\sum(\Delta W)^2\big]\) with \(T = 1\), \(n = 100\)?`, 0.02, T`\(2T^2/n\).`], [T`\(P(\max_{s \le 1} W_s \ge 0)\)?`, 1, T`Twice \(P(W_1 \ge 0) = \frac12\).`], [T`\(\operatorname{Var}(3W_{t/9})\) at \(t = 5\)?`, 5, T`\(9 \cdot \frac59\): scaling preserves Brownian motion.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>A martingale is the mathematical model of a fair game: given everything known now, its expected future value is its current value. Martingales turn hard probability questions into one-line computations.</p>`,
      body: T`
<p><b>Conditional expectation</b> \(E[X \mid \mathcal F_s]\) is the best estimate of \(X\) given the information at time \(s\). Rules: \(E[E[X \mid \mathcal F_s]] = E[X]\) (tower); known quantities factor out; independent ones average out.</p>
<p>A process \(M_t\) is a <b>martingale</b> if it is adapted, integrable, and \(E[M_t \mid \mathcal F_s] = M_s\) for \(s \le t\).</p>
<p><b>Computing with Brownian motion:</b> write \(W_t = W_s + Y\) with \(Y = W_t - W_s \sim N(0, t - s)\) independent of \(\mathcal F_s\). With \(W_s = w\):</p>
\[E[W_t^2 \mid \mathcal F_s] = w^2 + (t - s)\]
\[E[W_t^3 \mid \mathcal F_s] = w^3 + 3w(t - s)\]
\[E[e^{\theta W_t} \mid \mathcal F_s] = e^{\theta w + \theta^2(t - s)/2}\]
<p>So \(W_t\), \(W_t^2 - t\), \(W_t^3 - 3tW_t\) and \(e^{\theta W_t - \theta^2 t/2}\) are martingales, while \(W_t^2\) and \(e^{\theta W_t}\) are not.</p>
<p><b>Test.</b> \(f(t, W_t)\) is a martingale (for well-behaved \(f\)) exactly when</p>
\[f_t + \tfrac12 f_{ww} = 0\]
<p>This is the drift term from Itô's lemma, later in the path. For the fair walk, \(S_n\) and \(S_n^2 - n\) are martingales.</p>`,
      ex: { q: T`<p>Given \(W_2 = 1\), find \(E[W_5^3 \mid \mathcal F_2]\).</p>`, a: T`<p>\(w^3 + 3w(t - s) = 1 + 3 \cdot 1 \cdot 3 = 10\).</p>` },
      trap: T`Thinking \(W_t^2\) is a martingale because \(W_t\) is. Its conditional mean grows by \(t - s\); subtracting \(t\) restores the martingale.`,
      vary: [[T`Given \(W_1 = 2\), \(E[W_4^2 \mid \mathcal F_1]\)?`, 7, T`\(4 + 3\).`], [T`Given \(W_1 = -1\), \(E[W_3^3 \mid \mathcal F_1]\)?`, -7, T`\(-1 + 3(-1)(2)\).`], [T`Is \(tW_t\) a martingale?`, ['No', 'Yes'], T`\(f_t + \frac12 f_{ww} = w \ne 0\).`], [T`Is \(e^{2W_t - 2t}\) a martingale?`, ['Yes', 'No'], T`\(\theta = 2\), \(\theta^2/2 = 2\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>A stopping time is a rule for when to stop that uses only the information so far. Stopping a martingale at such a time does not change its expected value, which solves gambler's-ruin problems without summing over paths.</p>`,
      body: T`
<p>\(\tau\) is a <b>stopping time</b> if \(\{\tau \le t\} \in \mathcal F_t\) for every \(t\): you can tell at time \(t\) whether you have stopped. "The first time the walk hits 10" is a stopping time; "the time of the walk's maximum on [0, 1]" is not.</p>
<p><b>Optional stopping theorem.</b> If \(M\) is a martingale and \(\tau\) is a stopping time with, for instance, \(\tau\) bounded, or \(M_{t \wedge \tau}\) bounded and \(\tau < \infty\), then \(E[M_\tau] = E[M_0]\).</p>
<p><b>Fair gambler's ruin.</b> A symmetric walk starts at \(x\) and stops at 0 or \(N\). \(S\) is a martingale, so \(x = N \cdot P(\text{hit } N)\). And \(S_n^2 - n\) is a martingale, which gives the expected duration:</p>
\[P(\text{hit } N \text{ first}) = \frac xN, \quad E[\tau] = x(N - x)\]
<p><b>Biased walk</b> (\(p \ne q\)): \(r^{S_n}\) with \(r = q/p\) is a martingale, giving</p>
\[P(\text{hit } N \text{ first}) = \frac{1 - r^x}{1 - r^N}\]
<p><b>Brownian motion</b> started at 0, stopped at \(-a\) or \(b\): \(P(\text{hit } b) = \frac{a}{a + b}\) and \(E[\tau] = ab\). With drift, \(X_t = \mu t + W_t\), the martingale \(e^{-2\mu X_t}\) gives</p>
\[P(\text{hit } b) = \frac{1 - e^{2\mu a}}{e^{-2\mu b} - e^{2\mu a}}\]`,
      ex: { q: T`<p>A fair walk starts at 3 with barriers at 0 and 10. Find the probability of reaching 10 first and the expected number of steps.</p>`, a: T`<p>\(\frac{3}{10}\), and \(3 \cdot 7 = 21\) steps.</p>` },
      trap: T`Applying optional stopping to "the first time the walk reaches 1" without a lower barrier. \(E[S_\tau] = 1 \ne 0\): that \(\tau\) has infinite mean, and the theorem's conditions fail.`,
      vary: [[T`Fair walk from 4, barriers 0 and 5: \(P(\text{hit } 5)\)?`, 0.8, T`\(\frac45\).`], [T`Same: \(E[\tau]\)?`, 4, T`\(4 \cdot 1\).`], [T`BM from 0, barriers \(-2\) and 3: \(E[\tau]\)?`, 6, T`\(ab\).`], [T`Is "the last time before 1 that \(W = 0\)" a stopping time?`, ['No', 'Yes'], T`It needs the path after that time.`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Brownian paths have infinite length, so \(\int H\,dW\) cannot be an ordinary Stieltjes integral. Itô's construction evaluates the integrand at the left end of each step, which makes the integral a martingale.</p>`,
      body: T`
<p>For an adapted integrand \(H\), define</p>
\[\int_0^T H_t\,dW_t = \lim \sum_i H_{t_i}(W_{t_{i+1}} - W_{t_i})\]
<p>with the integrand at the <b>left</b> endpoint of each step, so it never looks into the increment it multiplies.</p>
<p><b>Properties.</b> The integral has mean 0 and is a martingale in \(T\). <b>Itô isometry</b>:</p>
\[E\Big[\Big(\int_0^T H\,dW\Big)^2\Big] = E\Big[\int_0^T H_t^2\,dt\Big]\]
<p>For a deterministic \(f\), \(\int_0^T f(t)\,dW_t \sim N\big(0, \int_0^T f^2\,dt\big)\).</p>
<p><b>The basic example.</b> Expanding \(W_T^2\) as a telescoping sum and using \(\sum(\Delta W)^2 \to T\):</p>
\[\int_0^T W_t\,dW_t = \frac{W_T^2 - T}{2}\]
<p>Ordinary calculus would give \(\frac{W_T^2}{2}\); the extra \(-\frac T2\) is the quadratic variation at work. The midpoint (Stratonovich) rule gives \(\frac{W_T^2}{2}\) but is not a martingale. From the formula, \(\operatorname{Var}\int_0^T W\,dW = \frac{T^2}{2}\), which agrees with the isometry: \(\int_0^T E[W_t^2]\,dt = \frac{T^2}{2}\).</p>`,
      ex: { q: T`<p>Find the variance of \(\int_0^2 t\,dW_t\) and of \(\int_0^2 W_t\,dW_t\).</p>`, a: T`<p>\(\int_0^2 t^2\,dt = \frac83\). For the second, \(\int_0^2 E[W_t^2]\,dt = \int_0^2 t\,dt = 2\).</p>` },
      trap: T`Evaluating the integrand at the right endpoint or midpoint. That changes the answer by the quadratic variation and destroys the martingale property.`,
      vary: [[T`\(\operatorname{Var}\int_0^3 dW_t\)?`, 3, T`\(\int_0^3 1\,dt\).`], [T`\(\operatorname{Var}\int_0^1 e^{t}\,dW_t\), four decimals?`, (Math.exp(2) - 1) / 2, T`\(\int_0^1 e^{2t}dt = \frac{e^2 - 1}{2}\).`], [T`\(\int_0^4 W\,dW\) on a path with \(W_4 = 3\)?`, 2.5, T`\(\frac{9 - 4}{2}\).`], [T`\(E\int_0^5 W\,dW\)?`, 0, T`Itô integrals have mean 0.`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>Itô's lemma is the chain rule of stochastic calculus. Because \(dW^2 = dt\), a second-order term that ordinary calculus discards survives and shifts the drift.</p>`,
      body: T`
<p>For \(dX_t = \mu\,dt + \sigma\,dW_t\) (\(\mu, \sigma\) may depend on \(t\) and \(X_t\)) and smooth \(f(t, x)\), expand to second order and apply the rules \(dW^2 = dt\), \(dt\,dW = 0\), \(dt^2 = 0\):</p>
\[df = \Big(f_t + \mu f_x + \tfrac12\sigma^2 f_{xx}\Big)dt + \sigma f_x\,dW\]
<p>The first bracket is the <b>drift</b>, the coefficient \(\sigma f_x\) the <b>diffusion</b>.</p>
<p><b>Examples</b> with \(X = W\) (\(\mu = 0\), \(\sigma = 1\)):</p>
\[d(W^2) = dt + 2W\,dW\]
\[d(e^{W}) = \tfrac12 e^{W}dt + e^{W}dW\]
<p><b>Geometric Brownian motion</b> \(dS = \mu S\,dt + \sigma S\,dW\), with \(f = \ln S\):</p>
\[d(\ln S) = \big(\mu - \tfrac12\sigma^2\big)dt + \sigma\,dW\]
<p>so the log-price grows at \(\mu - \frac12\sigma^2\), not \(\mu\): volatility drags down the typical growth rate.</p>
<p><b>Product rule.</b> \(d(XY) = X\,dY + Y\,dX + dX\,dY\), where \(dX\,dY = \sigma_X\sigma_Y\,dt\) for processes driven by the same \(W\).</p>`,
      ex: { q: T`<p>Find \(d(W_t^3)\) and \(d(tW_t)\).</p>`, a: T`<p>\(f = x^3\): \(f_x = 3x^2\), \(f_{xx} = 6x\), so \(d(W^3) = 3W\,dt + 3W^2\,dW\). For \(f = tx\): \(f_t = x\), \(f_{xx} = 0\), so \(d(tW) = W\,dt + t\,dW\).</p>` },
      trap: T`Applying the ordinary chain rule, \(d(W^2) = 2W\,dW\). The term \(\frac12 f_{xx}\sigma^2\,dt = dt\) is missing.`,
      vary: [[T`Drift of \(W_t^4\) at \(W_t = 2\)?`, 24, T`\(\frac12 \cdot 12w^2 = 6 \cdot 4\).`], [T`Diffusion of \(W_t^4\) at \(W_t = 2\)?`, 32, T`\(4w^3\).`], [T`Drift of \(\ln S\) for \(\mu = 0.08\), \(\sigma = 0.2\)?`, 0.06, T`\(0.08 - 0.02\).`], [T`Drift of \(e^{3W_t}\) at \(W_t = 0\)?`, 4.5, T`\(\frac12 \cdot 9\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>A stochastic differential equation describes how a quantity moves: a predictable drift plus random shocks scaled by a volatility. Two linear SDEs, geometric Brownian motion and the Ornstein–Uhlenbeck process, model most of finance and much of physics.</p>`,
      body: T`
<p>\(dX_t = a(t, X_t)\,dt + b(t, X_t)\,dW_t\) means \(X_t = X_0 + \int_0^t a\,ds + \int_0^t b\,dW\). If \(a\) and \(b\) are Lipschitz in \(x\), there is a unique solution.</p>
<p><b>Geometric Brownian motion</b>, \(dS = \mu S\,dt + \sigma S\,dW\): from Itô's lemma on \(\ln S\),</p>
\[S_t = S_0\exp\Big(\big(\mu - \tfrac12\sigma^2\big)t + \sigma W_t\Big)\]
\[E[S_t] = S_0e^{\mu t}, \quad \operatorname{Var}(S_t) = S_0^2e^{2\mu t}\big(e^{\sigma^2 t} - 1\big)\]
<p>The median is \(S_0e^{(\mu - \sigma^2/2)t}\), below the mean, and \(P(S_t > K) = \Phi\Big(\frac{\ln(S_0/K) + (\mu - \sigma^2/2)t}{\sigma\sqrt t}\Big)\).</p>
<p><b>Ornstein–Uhlenbeck</b> (mean reversion), \(dX = \theta(m - X)\,dt + \sigma\,dW\) with \(\theta > 0\):</p>
\[E[X_t] = m + (x_0 - m)e^{-\theta t}\]
\[\operatorname{Var}(X_t) = \frac{\sigma^2}{2\theta}\big(1 - e^{-2\theta t}\big)\]
<p>It is pulled toward \(m\) with half-life \(\frac{\ln 2}{\theta}\), and its stationary variance is \(\frac{\sigma^2}{2\theta}\). It models interest rates (Vasicek), spreads in pairs trading, and the velocity of a particle with friction.</p>`,
      ex: { q: T`<p>A stock follows GBM with \(S_0 = 100\), \(\mu = 0.1\), \(\sigma = 0.3\). Find the mean and median price after 2 years.</p>`, a: T`<p>Mean \(100e^{0.2} \approx 122.14\). Median \(100e^{(0.1 - 0.045) \cdot 2} = 100e^{0.11} \approx 111.63\).</p>` },
      trap: T`Taking \(\mu\) as the growth rate of a typical path. The median grows at \(\mu - \frac12\sigma^2\); only the mean grows at \(\mu\).`,
      vary: [[T`OU with \(\theta = \ln 2\): half-life?`, 1, T`\(\ln 2/\theta\).`], [T`OU with \(\sigma = 0.4\), \(\theta = 2\): stationary variance?`, 0.04, T`\(0.16/4\).`], [T`GBM \(S_0 = 50\), \(\mu = 0\): \(E[S_3]\)?`, 50, T`\(e^{0} = 1\).`], [T`OU from \(x_0 = 5\) to \(m = 1\), \(\theta = 1\): \(E[X_1]\), four decimals?`, 1 + 4 * Math.exp(-1), T`\(1 + 4e^{-1}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>The Feynman–Kac formula links expectations over random paths to partial differential equations: averaging a payoff over the future of a diffusion solves a backward heat equation, and vice versa.</p>`,
      body: T`
<p>Let \(dX = \mu(t, X)\,dt + \sigma(t, X)\,dW\) and</p>
\[u(t, x) = E\big[g(X_T) \mid X_t = x\big]\]
<p>Then \(u\) solves the <b>backward equation</b></p>
\[u_t + \mu u_x + \tfrac12\sigma^2u_{xx} = 0, \quad u(T, x) = g(x)\]
<p>Reason: \(u(t, X_t) = E[g(X_T) \mid \mathcal F_t]\) is a martingale, so its Itô drift vanishes. With discounting, \(u = E\big[e^{-r(T - t)}g(X_T) \mid X_t = x\big]\) solves the same equation with \(-ru\) added.</p>
<p><b>Brownian case.</b> For \(X = x + \mu(T - t) + \sigma W\), \(X_T\) given \(X_t = x\) is \(N\big(x + \mu(T - t), \sigma^2(T - t)\big)\), so \(u\) is a Gaussian average. With \(\tau = T - t\) and \(\mu = 0\):</p>
\[g = x^2:\ u = x^2 + \sigma^2\tau\]
\[g = x^3:\ u = x^3 + 3\sigma^2\tau x\]
\[g = e^{ax}:\ u = e^{ax + a^2\sigma^2\tau/2}\]
<p>With drift \(\mu\), replace \(x\) by \(x + \mu\tau\) inside these. Conversely, any \(u\) with \(u_t + \frac12u_{xx} = 0\) gives a martingale \(u(t, W_t)\).</p>`,
      ex: { q: T`<p>For standard Brownian motion and \(g(x) = x^2\), \(T = 3\), find \(u(1, 2)\) and check the PDE.</p>`, a: T`<p>\(u = x^2 + (T - t) = 4 + 2 = 6\). With \(u = x^2 + 3 - t\): \(u_t = -1\), \(\frac12u_{xx} = 1\), which sum to 0.</p>` },
      trap: T`Solving the PDE forward from an initial condition. Feynman–Kac fixes the terminal value \(u(T, x) = g(x)\) and runs backward in time.`,
      vary: [[T`\(\sigma = 1\), \(g = x^2\), \(\tau = 5\): \(u\) at \(x = 0\)?`, 5, T`\(0 + 5\).`], [T`\(\sigma = 1\), \(g = x^3\), \(\tau = 2\): \(u\) at \(x = 1\)?`, 7, T`\(1 + 3 \cdot 2 \cdot 1\).`], [T`Does \(u = x^2 - t\) solve \(u_t + \frac12u_{xx} = 0\)?`, ['Yes', 'No'], T`\(-1 + 1 = 0\).`], [T`Does \(u = e^{x - t}\) solve it?`, ['No', 'Yes'], T`\(-u + \frac12u \ne 0\); \(e^{x - t/2}\) would.`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Changing the probability measure can remove a drift from Brownian motion without changing which paths are possible. Girsanov's theorem is how pricing moves from real-world probabilities to risk-neutral ones.</p>`,
      body: T`
<p>Fix \(\theta\) and \(T\), and define a new measure \(Q\) by its density with respect to \(P\):</p>
\[Z_T = \frac{dQ}{dP} = e^{-\theta W_T - \frac12\theta^2T}\]
<p>\(Z_t = e^{-\theta W_t - \theta^2t/2}\) is a positive martingale with mean 1, so \(Q\) is a probability measure, and \(E_Q[X] = E_P[Z_TX]\).</p>
<p><b>Girsanov.</b> Under \(Q\), \(\widetilde W_t = W_t + \theta t\) is a standard Brownian motion. Equivalently, under \(Q\) the original \(W\) has drift \(-\theta\): \(W_T \sim N(-\theta T, T)\). So</p>
\[E_Q[W_T] = -\theta T, \quad E_Q[W_T^2] = T + \theta^2T^2\]
<p>The measures agree on which events are possible (they are equivalent); they disagree only on probabilities. \(E_P[Z_T^2] = e^{\theta^2T}\).</p>
<p><b>Risk-neutral pricing.</b> For a stock \(dS = \mu S\,dt + \sigma S\,dW\) and interest rate \(r\), take the <b>market price of risk</b> \(\theta = \frac{\mu - r}{\sigma}\). Under \(Q\), \(dS = rS\,dt + \sigma S\,d\widetilde W\): every asset drifts at the risk-free rate, and prices are discounted \(Q\)-expectations of payoffs.</p>`,
      ex: { q: T`<p>With \(\theta = 0.5\) and \(T = 4\), find \(E_Q[W_4]\) and \(Q(W_4 > 0)\).</p>`, a: T`<p>Under \(Q\), \(W_4 \sim N(-2, 4)\). \(E_Q[W_4] = -2\) and \(Q(W_4 > 0) = 1 - \Phi(1) \approx 0.1587\).</p>` },
      trap: T`Getting the sign of the new drift wrong. With density \(e^{-\theta W_T - \theta^2T/2}\), the shifted process \(W_t + \theta t\) is the Brownian motion, so \(W\) itself drifts at \(-\theta\).`,
      vary: [[T`\(\mu = 0.12\), \(r = 0.02\), \(\sigma = 0.25\): \(\theta\)?`, 0.4, T`\(0.1/0.25\).`], [T`\(\theta = 1\), \(T = 2\): \(E_Q[W_2]\)?`, -2, T`\(-\theta T\).`], [T`\(E_P[Z_T]\)?`, 1, T`A density integrates to 1.`], [T`\(\theta = 1\), \(T = 1\): \(E_Q[W_1^2]\)?`, 2, T`\(T + \theta^2T^2\).`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>Under the risk-neutral measure an option's price is the discounted expected payoff, and for a lognormal stock that expectation has a closed form. The Black–Scholes formula and its Greeks are the working vocabulary of every options desk.</p>`,
      body: T`
<p>Model: \(dS = rS\,dt + \sigma S\,d\widetilde W\) under \(Q\); constant \(r\) and \(\sigma\); no dividends. A European call with strike \(K\) and expiry \(T\):</p>
\[C = S\,\Phi(d_1) - Ke^{-rT}\Phi(d_2)\]
\[d_1 = \frac{\ln(S/K) + (r + \frac12\sigma^2)T}{\sigma\sqrt T}\]
\[d_2 = d_1 - \sigma\sqrt T\]
<p>\(\Phi(d_2)\) is the risk-neutral probability of finishing in the money, and the <b>digital call</b> paying 1 if \(S_T > K\) is worth \(e^{-rT}\Phi(d_2)\).</p>
<p><b>Put–call parity</b>: \(C - P = S - Ke^{-rT}\), so</p>
\[P = Ke^{-rT}\Phi(-d_2) - S\Phi(-d_1)\]
<table class="tt"><tr><th>Greek</th><th>Call</th><th>Put</th></tr>
<tr><td>Delta \(\partial V/\partial S\)</td><td>\(\Phi(d_1)\)</td><td>\(\Phi(d_1) - 1\)</td></tr>
<tr><td>Gamma \(\partial^2V/\partial S^2\)</td><td colspan="2">\(\frac{\varphi(d_1)}{S\sigma\sqrt T}\)</td></tr>
<tr><td>Vega \(\partial V/\partial\sigma\)</td><td colspan="2">\(S\varphi(d_1)\sqrt T\)</td></tr></table>
<p>Here \(\varphi\) is the standard normal density. Every option price \(V(t, S)\) satisfies the <b>Black–Scholes PDE</b>, Feynman–Kac with discounting:</p>
\[V_t + \tfrac12\sigma^2S^2V_{SS} + rSV_S - rV = 0\]
<p>A delta-hedged portfolio, long the option and short \(\Delta\) shares, has no \(dW\) term and so must earn the risk-free rate; that argument derives the PDE without any reference to \(\mu\).</p>`,
      ex: { q: T`<p>Price an at-the-money call with \(S = K = 100\), \(r = 5\%\), \(\sigma = 20\%\), \(T = 1\), and the matching put.</p>`, a: T`<p>\(d_1 = \frac{0.05 + 0.02}{0.2} = 0.35\), \(d_2 = 0.15\). \(C = 100(0.6368) - 95.123(0.5596) \approx 10.45\). By parity, \(P = 10.45 - 100 + 95.12 \approx 5.57\).</p>` },
      trap: T`Plugging the stock's real-world drift \(\mu\) into the formula. The price depends on \(r\), not \(\mu\): hedging removes the drift.`,
      vary: [[T`\(C = 8\), \(S = 50\), \(K = 50\), \(Ke^{-rT} = 48\): put price?`, 6, T`\(P = C - S + Ke^{-rT}\).`], [T`Call delta when \(d_1 = 0\)?`, 0.5, T`\(\Phi(0)\).`], [T`Put delta when the call delta is 0.7?`, -0.3, T`\(0.7 - 1\).`], [T`Does the call price depend on \(\mu\)?`, ['No', 'Yes, it rises with \\(\\mu\\)'], T`Only \(r\) enters.`]] },

    { title: U[11], skill: U[11],
      hook: T`<p>Most SDEs and most option payoffs have no closed form. Simulation replaces the stochastic integral by small random steps and the expectation by an average, with an error you can measure.</p>`,
      body: T`
<p><b>Euler–Maruyama.</b> For \(dX = a(X)\,dt + b(X)\,dW\) with step \(\Delta t\) and independent \(Z_n \sim N(0, 1)\):</p>
\[\begin{aligned}X_{n+1} = X_n &+ a(X_n)\Delta t \\ &+ b(X_n)\sqrt{\Delta t}\,Z_n\end{aligned}\]
<p>Its strong error (pathwise) shrinks like \(\sqrt{\Delta t}\), its weak error (in expectations) like \(\Delta t\). <b>Milstein</b> adds \(\frac12 b b'(X_n)\big((\Delta W)^2 - \Delta t\big)\) and reaches strong order 1. For GBM, step exactly instead:</p>
\[S_{n+1} = S_ne^{Y_n}\]
\[Y_n = \big(\mu - \tfrac12\sigma^2\big)\Delta t + \sigma\sqrt{\Delta t}\,Z_n\]
<p><b>Monte Carlo.</b> Estimate \(E[Y]\) by the mean \(\bar Y\) of \(N\) independent samples. Its <b>standard error</b> is \(s/\sqrt N\), with \(s\) the sample standard deviation, and a 95% interval is \(\bar Y \pm 1.96\,s/\sqrt N\). Halving the error takes four times as many samples; to reach a standard error \(\varepsilon\) you need \(N \ge (s/\varepsilon)^2\).</p>
<p><b>Variance reduction.</b> Antithetic variates pair each \(Z\) with \(-Z\); control variates subtract a correlated quantity with a known mean. Both cut \(s\), which is cheaper than raising \(N\).</p>`,
      ex: { q: T`<p>Take one Euler step for \(dX = -2X\,dt + 0.5\,dW\) from \(X_0 = 1\), with \(\Delta t = 0.04\) and \(Z = 1.2\).</p>`, a: T`<p>\(1 - 2(1)(0.04) + 0.5(0.2)(1.2) = 1 - 0.08 + 0.12 = 1.04\).</p>` },
      trap: T`Scaling the random term by \(\Delta t\) instead of \(\sqrt{\Delta t}\). The increment \(\Delta W\) has standard deviation \(\sqrt{\Delta t}\).`,
      vary: [[T`\(s = 20\), \(N = 400\): standard error?`, 1, T`\(20/20\).`], [T`To halve that error, the new \(N\)?`, 1600, T`Four times.`], [T`\(s = 5\), target \(\varepsilon = 0.1\): minimum \(N\)?`, 2500, T`\((5/0.1)^2\).`], [T`Euler step for \(dX = 3\,dt + 2\,dW\) from 0, \(\Delta t = 0.25\), \(Z = -1\)?`, -0.25, T`\(0.75 + 2(0.5)(-1)\).`]] }
  ]);

  addQuestions('stoch', [
    { id: 'sc1', skill: U[0], q: T`\(\mathcal F_t\) in a filtration represents:`, c: ['the information available at time t', 'the value of the process at t', 'the probability of an event at t', 'the future of the process'], x: T`An increasing family of σ-algebras.` },
    { id: 'sc2', skill: U[1], q: T`Which is not a defining property of standard Brownian motion?`, c: ['differentiable paths', 'continuous paths', 'independent increments', 'W_t - W_s ~ N(0, t - s)'], x: T`Brownian paths are nowhere differentiable.` },
    { id: 'sc3', skill: U[2], q: T`The quadratic variation of a continuously differentiable function on \([0, T]\) is:`, c: ['0', 'T', 'infinite', 'its total variation squared'], x: T`\(\sum(\Delta f)^2 \le \max|\Delta f| \sum|\Delta f| \to 0\).` },
    { id: 'sc4', skill: U[2], q: T`The expected first time standard Brownian motion reaches level 1 is:`, c: ['infinite', '1', '2', '1/2'], x: T`It is reached with probability 1, but \(P(\tau > t) \sim c/\sqrt t\) decays too slowly for a finite mean.` },
    { id: 'sc5', skill: U[3], q: T`For a martingale \(M\), \(E[M_t]\) is:`, c: ['constant in t', 'increasing in t', 'zero', 'equal to M_t'], x: T`Take expectations of \(E[M_t \mid \mathcal F_0] = M_0\).` },
    { id: 'sc6', skill: U[4], q: T`Which is a stopping time for Brownian motion?`, c: ['the first time W reaches 2', 'the time W attains its maximum on [0, 1]', 'the last zero before time 1', 'one second before W first reaches 2'], x: T`Only the first can be decided from the path so far.` },
    { id: 'sc7', skill: U[5], q: T`Why is the Itô integral evaluated at the left endpoint of each interval?`, c: ['so the integrand does not anticipate the increment, making the integral a martingale', 'because the right endpoint gives a larger value', 'to make the integral equal Stratonovich', 'for numerical stability only'], x: T`Left-point sums give mean-zero increments.` },
    { id: 'sc8', skill: U[6], q: T`In Itô calculus, \(dW_t \cdot dW_t\) equals:`, c: ['dt', '0', 'dW_t', '2dt'], x: T`Quadratic variation of Brownian motion.` },
    { id: 'sc9', skill: U[7], q: T`In geometric Brownian motion, the median of \(S_t\) compared with its mean is:`, c: ['lower', 'higher', 'equal', 'undefined'], x: T`Median \(S_0e^{(\mu - \sigma^2/2)t}\), mean \(S_0e^{\mu t}\).` },
    { id: 'sc10', skill: U[7], q: T`Which process reverts to a long-run mean?`, c: ['Ornstein–Uhlenbeck', 'geometric Brownian motion', 'Brownian motion with drift', 'the Poisson process'], x: T`The drift \(\theta(m - X)\) pulls it toward \(m\).` },
    { id: 'sc11', skill: U[8], q: T`Feynman–Kac represents the solution of a backward parabolic PDE as:`, c: ['an expectation over diffusion paths', 'a Fourier series', 'a sum over eigenvalues', 'a deterministic ODE solution'], x: T`\(u(t, x) = E[g(X_T) \mid X_t = x]\).` },
    { id: 'sc12', skill: U[9], q: T`Under the risk-neutral measure, a non-dividend stock drifts at:`, c: ['the risk-free rate r', 'its real-world drift μ', 'zero', 'the market price of risk'], x: T`Girsanov with \(\theta = (\mu - r)/\sigma\).` },
    { id: 'sc13', skill: U[10], q: T`Gamma is largest for an option that is:`, c: ['at the money and near expiry', 'deep in the money', 'deep out of the money', 'far from expiry'], x: T`\(\varphi(d_1)/(S\sigma\sqrt T)\) peaks near \(d_1 = 0\) and grows as \(T \to 0\).` },
    { id: 'sc14', skill: U[11], q: T`Monte Carlo error falls with the number of samples \(N\) like:`, c: ['1/√N', '1/N', '1/N²', 'e^{-N}'], x: T`Standard error \(s/\sqrt N\).` }
  ]);

  // ---------- generators ----------
  const dp = x => R0.fmt(x, 6);
  registerUnitGens('stoch', { units: {
    [U[0]]: [{ id: 'sc-proc', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const lam = R.pick([0.5, 1, 2, 3, 4]), t = R.pick([0.5, 1, 1.5, 2, 3]), n = R.int(0, 5), lt = lam * t, ans = Math.exp(-lt) * lt ** n / [1, 1, 2, 6, 24, 120][n];
        return { q: T`Arrivals follow a Poisson process with rate ${lam} per hour. Find the probability of exactly ${n} arrivals in ${t} hours, to four decimals.`, answer: ans, tol: 1e-4, x: T`\(N_t \sim \text{Poisson}(${lt})\): \(e^{-${lt}}\frac{${lt}^{${n}}}{${n}!}\).`, v: `pois_gf(nsimplify(${lt}), ${n})` }; }
      const n = R.int(4, 12), p = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]]), pv = p[0] / p[1], mean = n * (2 * pv - 1), vr = 4 * n * pv * (1 - pv), m = k === 1;
      return { q: T`A random walk takes ${n} steps of \(+1\) with probability \(\frac{${p[0]}}{${p[1]}}\) and \(-1\) otherwise. Find ${m ? T`\(E[S_{${n}}]\)` : T`\(\operatorname{Var}(S_{${n}})\)`}, to four decimals.`, answer: m ? mean : vr, tol: 1e-4,
        x: m ? T`\(n(p - q) = ${n}(${dp(2 * pv - 1)})\).` : T`\(4npq = 4 \cdot ${n} \cdot \frac{${p[0]}}{${p[1]}} \cdot \frac{${p[1] - p[0]}}{${p[1]}}\).`, v: `walk_moments(${Math.min(n, 12)}, '${p[0]}/${p[1]}')[${m ? 0 : 1}] * ${n} / ${Math.min(n, 12)}` };
    } }],
    [U[1]]: [{ id: 'sc-bm', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const n = R.int(4, 12), kk = R.int(-4, 4), ans = (n + kk) % 2 ? 0 : binom(n, (n + kk) / 2) / 2 ** n;
        return { q: T`For the simple symmetric random walk, find \(P(S_{${n}} = ${kk})\), to four decimals.`, answer: ans, tol: 1e-4, x: (n + kk) % 2 ? T`\(n + k = ${n + kk}\) is odd, so the walk cannot be there.` : T`\(\binom{${n}}{${(n + kk) / 2}}2^{-${n}}\).`, v: `walk_pmf(${n}, ${kk})` }; }
      if (k === 1) { const s = R.int(1, 5), t = s + R.int(1, 6), a = R.nz(-3, 3), b = R.nz(-3, 3), ans = a * a * s + b * b * t + 2 * a * b * s;
        return { q: T`Find \(\operatorname{Var}(${a === 1 ? '' : a === -1 ? '-' : a}W_{${s}} ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}W_{${t}})\).`, answer: ans, x: T`\(a^2s + b^2t + 2ab\min(s, t) = ${a * a * s} + ${b * b * t} + ${2 * a * b * s}\).`, v: `(${a}+(${b}))**2*${s} + (${b})**2*(${t}-${s})` }; }
      if (k === 2) { const t = R.pick([1, 2, 4, 9, 0.25]), c = R.pick([0.5, 1, 1.5, 2, -1]), ans = 1 - Phi(c / Math.sqrt(t));
        return { q: T`Find \(P(W_{${t}} > ${c})\) for standard Brownian motion, to four decimals.`, answer: ans, tol: 1e-4, x: T`\(W_{${t}} \sim N(0, ${t})\): \(1 - \Phi\big(${c}/\sqrt{${t}}\big)\).`, v: `gtail(${c}, 0, sqrt(nsimplify(${t})))` }; }
      const s = R.int(1, 8), t = s + R.int(1, 10);
      return { q: T`Find \(\operatorname{Corr}(W_{${s}}, W_{${t}})\), to four decimals.`, answer: Math.sqrt(s / t), tol: 1e-4, x: T`\(\frac{\min(s, t)}{\sqrt{st}} = \sqrt{${s}/${t}}\).`, v: `${s}/sqrt(${s}*${t})` };
    } }],
    [U[2]]: [{ id: 'sc-path', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const a = R.pick([0.5, 1, 1.5, 2, 3]), t = R.pick([1, 2, 4, 9]), ans = 2 * (1 - Phi(a / Math.sqrt(t)));
        return { q: T`Find the probability that standard Brownian motion reaches ${a} at some time in \([0, ${t}]\), to four decimals.`, answer: ans, tol: 1e-4, x: T`Reflection: \(2\big(1 - \Phi(${a}/\sqrt{${t}})\big)\).`, v: `fp_prob(${a}, ${t})` }; }
      if (k === 1) { const mu = R.int(-5, 5), sg = R.pick([0.5, 1, 2, 3]), T2 = R.int(1, 5);
        return { q: T`Find the quadratic variation \([X]_{${T2}}\) of \(X_t = ${mu}t + ${sg}W_t\).`, answer: sg * sg * T2, tol: 1e-9, x: T`Only the Brownian part contributes: \(\sigma^2T = ${sg * sg} \cdot ${T2}\).`, v: `limit(${mu}**2*${T2}**2/Symbol('m') + nsimplify(${sg})**2*${T2}, Symbol('m'), oo)` }; }
      if (k === 2) { const T2 = R.int(1, 4), n = R.pick([10, 50, 100, 200]);
        return { q: T`Split \([0, ${T2}]\) into ${n} equal steps. Find \(\operatorname{Var}\big[\sum(\Delta W)^2\big]\), to six decimals.`, answer: 2 * T2 * T2 / n, tol: 1e-6, x: T`Each squared increment has variance \(2\Delta^2\): \(n \cdot 2(T/n)^2 = 2T^2/n\).`, v: `${n}*(3*(Rational(${T2},${n}))**2 - (Rational(${T2},${n}))**2)` }; }
      const c = R.pick([2, 3, 4, 5]), t = R.int(1, 9);
      return { q: T`Find \(\operatorname{Var}(${c}W_{${t}/${c * c}})\).`, answer: t, tol: 1e-9, x: T`\(${c}^2 \cdot \frac{${t}}{${c * c}} = ${t}\): \(cW_{t/c^2}\) is again a Brownian motion.`, v: `${c}**2*Rational(${t},${c * c})` };
    } }],
    [U[3]]: [{ id: 'sc-mart', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const s = R.int(0, 3), t = s + R.int(1, 4), w = R.int(-3, 3), p = R.pick([2, 3]), d = t - s, ans = p === 2 ? w * w + d : w ** 3 + 3 * w * d;
        return { q: T`Given \(W_{${s}} = ${w}\), find \(E[W_{${t}}^{${p}} \mid \mathcal F_{${s}}]\).`, answer: ans, x: T`Write \(W_{${t}} = ${w} + Y\) with \(Y \sim N(0, ${d})\): ${p === 2 ? T`\(${w}^2 + ${d}\)` : T`\(${w}^3 + 3(${w})(${d})\)`}.`, v: `gE(lambda y: y**${p}, ${w}, ${Math.sqrt(d)})` }; }
      if (k === 1) { const s = R.int(0, 2), t = s + R.int(1, 3), w = R.pick([-1, 0, 0.5, 1]), th = R.pick([0.5, 1, 2]), ans = Math.exp(th * w + th * th * (t - s) / 2);
        return { q: T`Given \(W_{${s}} = ${w}\), find \(E[e^{${th}W_{${t}}} \mid \mathcal F_{${s}}]\), to four decimals.`, answer: ans, tol: 1e-4 * Math.max(1, ans), x: T`\(e^{\theta w + \theta^2(t - s)/2} = e^{${dp(th * w + th * th * (t - s) / 2)}}\).`, v: `gE(lambda y: _mp.exp(${th}*y), ${w}, ${Math.sqrt(t - s)})` }; }
      const C = [['W_t^3 - 3tW_t', 'w**3-3*t*w', 'yes'], ['W_t^3', 'w**3', 'no'], ['e^{W_t - t/2}', 'exp(w-t/2)', 'yes'], ['e^{W_t}', 'exp(w)', 'no'], ['W_t^2 - t', 'w**2-t', 'yes'], ['tW_t', 't*w', 'no'], ['W_t^4 - 6tW_t^2 + 3t^2', 'w**4-6*t*w**2+3*t**2', 'yes'], ['W_t^2 + t', 'w**2+t', 'no'], ['e^{2W_t - 2t}', 'exp(2*w-2*t)', 'yes'], ['\\cos(W_t)e^{t/2}', 'cos(w)*exp(t/2)', 'yes'], ['\\sin(W_t)', 'sin(w)', 'no']], [tex, expr, key] = R.pick(C);
      return { q: T`Is \(${tex}\) a martingale?`, c: key === 'yes' ? ['Yes', 'No'] : ['No', 'Yes'], key, vk: `is_mart('${expr}')`, x: T`Check \(f_t + \frac12f_{ww}\) for \(f(t, w) = ${tex.replace(/W_t/g, 'w')}\): it is ${key === 'yes' ? 'zero, so the process is a martingale' : 'not zero, so the process has a drift'}.` };
    } }],
    [U[4]]: [{ id: 'sc-stop', make(R) {
      const k = R.int(0, 3);
      if (k <= 1) { const Nn = R.int(5, 20), x = R.int(1, Nn - 1);
        return k === 0 ? { q: T`A fair \(\pm1\) walk starts at ${x} and stops at 0 or ${Nn}. Find the probability it reaches ${Nn} first, to four decimals.`, answer: x / Nn, tol: 1e-4, x: T`\(S\) is a martingale: \(x/N = ${x}/${Nn}\).`, v: `ruin(${Nn}, 0.5, ${x})[0]` }
          : { q: T`A fair \(\pm1\) walk starts at ${x} and stops at 0 or ${Nn}. Find the expected number of steps.`, answer: x * (Nn - x), tol: 1e-6, x: T`\(S_n^2 - n\) is a martingale: \(x(N - x) = ${x} \cdot ${Nn - x}\).`, v: `ruin(${Nn}, 0.5, ${x})[1]` }; }
      if (k === 2) { const p = R.pick([0.4, 0.45, 0.55, 0.6, 0.3]), Nn = R.int(5, 12), x = R.int(1, Nn - 1), r = (1 - p) / p, ans = (1 - r ** x) / (1 - r ** Nn);
        return { q: T`A walk steps \(+1\) with probability ${p} and \(-1\) otherwise. From ${x}, with barriers 0 and ${Nn}, find the probability of reaching ${Nn} first, to four decimals.`, answer: ans, tol: 1e-4, x: T`\(r = q/p = ${dp(r)}\): \(\frac{1 - r^{${x}}}{1 - r^{${Nn}}}\).`, v: `ruin(${Nn}, ${p}, ${x})[0]` }; }
      const mu = R.pick([-0.5, 0.25, 0.5, 1]), a = R.int(1, 3), b = R.int(1, 3), ans = (1 - Math.exp(2 * mu * a)) / (Math.exp(-2 * mu * b) - Math.exp(2 * mu * a));
      return { q: T`\(X_t = ${mu}t + W_t\) starts at 0. Find the probability it hits ${b} before \(-${a}\), to four decimals.`, answer: ans, tol: 1e-4, x: T`\(e^{-2\mu X_t}\) is a martingale: \(\frac{1 - e^{2\mu a}}{e^{-2\mu b} - e^{2\mu a}}\) with \(\mu = ${mu}\).`, v: `hit_drift(nsimplify(${mu}), ${a}, ${b})` };
    } }],
    [U[5]]: [{ id: 'sc-int', make(R) {
      const k = R.int(0, 2), T2 = R.int(1, 3);
      if (k === 0) { const F = [['t', 's', t => t ** 3 / 3], ['t^2', 's**2', t => t ** 5 / 5], ['e^{-t}', 'exp(-s)', t => (1 - Math.exp(-2 * t)) / 2], ['1 + t', '1+s', t => ((1 + t) ** 3 - 1) / 3], ['\\sqrt t', 'sqrt(s)', t => t * t / 2], ['e^{t}', 'exp(s)', t => (Math.exp(2 * t) - 1) / 2]], [tex, sx, g] = R.pick(F), ans = g(T2);
        return { q: T`Find \(\operatorname{Var}\big(\int_0^{${T2}} ${tex}\,dW_t\big)\), to four decimals.`, answer: ans, tol: 1e-4 * Math.max(1, ans), x: T`Itô isometry with a deterministic integrand: \(\int_0^{${T2}} \big(${tex}\big)^2dt = ${R0.fmt(ans, 4)}\).`, v: `ibp_var('${sx}', ${T2})` }; }
      if (k === 1) { const w = R.int(-4, 4);
        return { q: T`On a path with \(W_{${T2}} = ${w}\), find \(\int_0^{${T2}} W_t\,dW_t\).`, answer: (w * w - T2) / 2, x: T`\(\frac{W_T^2 - T}{2} = \frac{${w * w} - ${T2}}{2}\).`, v: `(lambda W2: (W2**2 - ${T2})/2)(${w})` }; }
      return { q: T`Find \(\operatorname{Var}\big(\int_0^{${T2}} W_t\,dW_t\big)\).`, answer: T2 * T2 / 2, tol: 1e-9, x: T`\(\int_0^{${T2}} E[W_t^2]\,dt = \int_0^{${T2}} t\,dt = \frac{${T2 * T2}}{2}\).`, v: `gE(lambda y: ((y**2 - ${T2})/2)**2, 0, sqrt(${T2})) - gE(lambda y: (y**2 - ${T2})/2, 0, sqrt(${T2}))**2` };
    } }],
    [U[6]]: [{ id: 'sc-ito', make(R) {
      const F = [['x^2', (t, x) => x * x, x => 2 * x, () => 2, 0, 'x**2'], ['x^3', (t, x) => x ** 3, x => 3 * x * x, x => 6 * x, 0, 'x**3'], ['e^{2x}', (t, x) => Math.exp(2 * x), x => 2 * Math.exp(2 * x), x => 4 * Math.exp(2 * x), 0, '_mp.exp(2*x)'],
        ['tx', (t, x) => t * x, () => 1, () => 0, 1, 't*x'], ['tx^2', (t, x) => t * x * x, x => 2 * x, () => 2, 2, 't*x**2'], ['\\sin x', (t, x) => Math.sin(x), x => Math.cos(x), x => -Math.sin(x), 0, '_mp.sin(x)']];
      const pick = R.pick(F), [tex, f, fx, fxx, ft, py] = pick, gbm = R.int(0, 3) === 0;
      if (gbm) { const mu = R.pick([0.05, 0.08, 0.1, 0.12]), sg = R.pick([0.1, 0.2, 0.3, 0.4]), ask = R.int(0, 1);
        return { q: T`\(dS = ${mu}S\,dt + ${sg}S\,dW\). Find the ${ask ? 'diffusion coefficient' : 'drift'} of \(\ln S_t\), to four decimals.`, answer: ask ? sg : mu - sg * sg / 2, tol: 1e-4, x: T`\(d(\ln S) = (\mu - \frac12\sigma^2)dt + \sigma\,dW = ${dp(mu - sg * sg / 2)}\,dt + ${sg}\,dW\).`,
          v: `${ask ? 'gen_vol' : 'gen_drift'}(lambda t, x: _mp.log(x), lambda t, x: ${mu}*x, lambda t, x: ${sg}*x, 0, 50)` }; }
      const mu = R.int(-2, 2), sg = R.pick([1, 2, 3]), t0 = R.int(0, 3), x0 = R.pick([-1, 0, 0.5, 1, 2]), ask = R.int(0, 1);
      const ftv = ft === 0 ? 0 : ft === 1 ? x0 : x0 * x0, tf = t0, fxv = (tex.startsWith('t') ? tf : 1) * fx(x0), fxxv = (tex.startsWith('t') ? tf : 1) * fxx(x0);
      const drift = ftv + mu * fxv + 0.5 * sg * sg * fxxv, diff = Math.abs(sg * fxv);
      return { q: T`\(${sdeT(mu, sg)}\). For \(f(t, x) = ${tex}\), find the ${ask ? 'diffusion coefficient (absolute value)' : 'drift'} of \(f(t, X_t)\) at \(t = ${t0}\), \(X_t = ${x0}\), to four decimals.`, answer: ask ? diff : drift, tol: 1e-4 * Math.max(1, Math.abs(ask ? diff : drift)),
        x: ask ? T`\(\sigma f_x = ${sg} \cdot ${dp(fxv)}\).` : T`\(f_t + \mu f_x + \frac12\sigma^2f_{xx} = ${dp(ftv)} + (${mu})(${dp(fxv)}) + \frac12(${sg * sg})(${dp(fxxv)})\).`,
        v: `${ask ? 'gen_vol' : 'gen_drift'}(lambda t, x: ${py}, lambda t, x: ${mu}, lambda t, x: ${sg}, ${t0}, ${x0})` };
    } }],
    [U[7]]: [{ id: 'sc-sde', make(R) {
      const k = R.int(0, 4);
      if (k <= 2) { const S0 = R.pick([50, 80, 100, 120]), mu = R.pick([0.04, 0.08, 0.1, 0.15]), sg = R.pick([0.15, 0.2, 0.3, 0.4]), t = R.pick([0.5, 1, 2, 3]);
        const lo = `${S0}*_mp.exp((${mu}-${sg}**2/2)*${t} + ${sg}*_mp.sqrt(${t})*y)`;
        if (k === 0) { const ans = S0 * Math.exp(mu * t); return { q: T`GBM with \(S_0 = ${S0}\), \(\mu = ${mu}\), \(\sigma = ${sg}\). Find \(E[S_{${t}}]\), to two decimals.`, answer: ans, tol: 0.01, x: T`\(S_0e^{\mu t} = ${S0}e^{${dp(mu * t)}}\).`, v: `gE(lambda y: ${lo}, 0, 1)` }; }
        if (k === 1) { const ans = S0 * Math.exp((mu - sg * sg / 2) * t); return { q: T`GBM with \(S_0 = ${S0}\), \(\mu = ${mu}\), \(\sigma = ${sg}\). Find the median of \(S_{${t}}\), to two decimals.`, answer: ans, tol: 0.01, x: T`\(S_0e^{(\mu - \sigma^2/2)t} = ${S0}e^{${dp((mu - sg * sg / 2) * t)}}\).`, v: `(lambda yq: ${ans} if abs(gtail(yq) - 0.5) < 1e-9 else -1)(_mp.findroot(lambda y: ${lo} - ${ans}, 0))` }; }
        const K = Math.round(S0 * R.pick([0.9, 1, 1.1, 1.2])), ans = Phi((Math.log(S0 / K) + (mu - sg * sg / 2) * t) / (sg * Math.sqrt(t)));
        return { q: T`GBM with \(S_0 = ${S0}\), \(\mu = ${mu}\), \(\sigma = ${sg}\). Find \(P(S_{${t}} > ${K})\), to four decimals.`, answer: ans, tol: 1e-4, x: T`\(\Phi\Big(\frac{\ln(${S0}/${K}) + (${mu} - ${sg * sg / 2})${t}}{${sg}\sqrt{${t}}}\Big)\).`, v: `gtail(_mp.findroot(lambda y: ${lo} - ${K}, 0))` }; }
      const th = R.pick([0.5, 1, 2, 3]), m = R.int(-2, 3), sg = R.pick([0.2, 0.5, 1]), x0 = m + R.nz(-3, 3), t = R.pick([0.5, 1, 2]);
      if (k === 3) { const ans = m + (x0 - m) * Math.exp(-th * t); return { q: T`\(${ouT(th, m, sg)}\), \(X_0 = ${x0}\). Find \(E[X_{${t}}]\), to four decimals.`, answer: ans, tol: 1e-4, x: T`\(m + (x_0 - m)e^{-\theta t} = ${m} + (${x0 - m})e^{-${th * t}}\).`, v: `ou_moments(nsimplify(${th}), ${m}, nsimplify(${sg}), ${x0}, nsimplify(${t}))[0]` }; }
      const ans = sg * sg / (2 * th) * (1 - Math.exp(-2 * th * t));
      return { q: T`\(${ouT(th, m, sg)}\), \(X_0 = ${x0}\). Find \(\operatorname{Var}(X_{${t}})\), to four decimals.`, answer: ans, tol: 1e-4, x: T`\(\frac{\sigma^2}{2\theta}(1 - e^{-2\theta t}) = \frac{${dp(sg * sg)}}{${2 * th}}(1 - e^{-${2 * th * t}})\).`, v: `ou_moments(nsimplify(${th}), ${m}, nsimplify(${sg}), ${x0}, nsimplify(${t}))[1]` };
    } }],
    [U[8]]: [{ id: 'sc-fk', make(R) {
      if (R.int(0, 3) === 0) { const C = [['x^2 - t', 'x**2 - t', 'yes'], ['x^2 + t', 'x**2 + t', 'no'], ['x^3 - 3tx', 'x**3 - 3*t*x', 'yes'], ['e^{x - t/2}', 'exp(x - t/2)', 'yes'], ['e^{x - t}', 'exp(x - t)', 'no'], ['x^4 - 6tx^2 + 3t^2', 'x**4 - 6*t*x**2 + 3*t**2', 'yes'], ['tx', 't*x', 'no'], ['e^{2x - 2t}', 'exp(2*x - 2*t)', 'yes']], [tex, ex, key] = R.pick(C);
        return { q: T`Does \(u(t, x) = ${tex}\) solve \(u_t + \frac12u_{xx} = 0\)?`, c: key === 'yes' ? ['Yes', 'No'] : ['No', 'Yes'], key, vk: `solves_heat('${ex}')`, x: T`Compute \(u_t + \frac12u_{xx}\) for \(u = ${tex}\): it is ${key === 'yes' ? '0' : 'not 0'}.` }; }
      const g = R.int(0, 2), mu = R.pick([0, 0, 1, -1]), sg = R.pick([1, 2]), T2 = R.int(2, 5), t = R.int(0, T2 - 1), x = R.int(-2, 2), tau = T2 - t, y = x + mu * tau, vv = sg * sg * tau;
      const a = R.pick([0.5, 1]), ans = g === 0 ? y * y + vv : g === 1 ? y ** 3 + 3 * vv * y : Math.exp(a * y + a * a * vv / 2);
      const gt = g === 0 ? 'x^2' : g === 1 ? 'x^3' : `e^{${a}x}`, gp = g === 0 ? 'y**2' : g === 1 ? 'y**3' : `_mp.exp(${a}*y)`;
      return { q: T`\(${sdeT(mu, sg)}\). Find \(u(${t}, ${x}) = E[g(X_{${T2}}) \mid X_{${t}} = ${x}]\) for \(g(x) = ${gt}\), to four decimals.`, answer: ans, tol: 1e-4 * Math.max(1, Math.abs(ans)),
        x: T`Given \(X_{${t}} = ${x}\), \(X_{${T2}} \sim N(${y}, ${vv})\), so \(u = ${g === 0 ? `${y}^2 + ${vv}` : g === 1 ? `${y}^3 + 3(${vv})(${y})` : `e^{${a}(${y}) + ${a * a}(${vv})/2}`}\).`, v: `gE(lambda y: ${gp}, ${y}, sqrt(${vv}))` };
    } }],
    [U[9]]: [{ id: 'sc-gir', make(R) {
      const k = R.int(0, 3), th = R.pick([0.25, 0.5, 1, 1.5]), T2 = R.pick([1, 2, 4]), D = `_mp.exp(-${th}*y - ${th}**2*${T2}/2)`;
      if (k === 0) return { q: T`\(\frac{dQ}{dP} = e^{-${th}W_{${T2}} - \frac12(${th})^2(${T2})}\). Find \(E_Q[W_{${T2}}]\).`, answer: -th * T2, tol: 1e-6, x: T`Under \(Q\), \(W\) has drift \(-\theta\): \(-${th} \cdot ${T2}\).`, v: `gE(lambda y: y*${D}, 0, sqrt(${T2}))` };
      if (k === 1) return { q: T`\(\frac{dQ}{dP} = e^{-${th}W_{${T2}} - \frac12(${th})^2(${T2})}\). Find \(E_Q[W_{${T2}}^2]\), to four decimals.`, answer: T2 + th * th * T2 * T2, tol: 1e-4, x: T`\(W_{${T2}} \sim N(-\theta T, T)\) under \(Q\): \(T + \theta^2T^2\).`, v: `gE(lambda y: y**2*${D}, 0, sqrt(${T2}))` };
      if (k === 2) { const a = R.pick([0, 0.5, 1, -1]), ans = 1 - Phi((a + th * T2) / Math.sqrt(T2));
        return { q: T`\(\frac{dQ}{dP} = e^{-${th}W_{${T2}} - \frac12(${th})^2(${T2})}\). Find \(Q(W_{${T2}} > ${a})\), to four decimals.`, answer: ans, tol: 1e-4, x: T`Under \(Q\), \(W_{${T2}} \sim N(${-th * T2}, ${T2})\): \(1 - \Phi\big(\frac{${a} + ${th * T2}}{\sqrt{${T2}}}\big)\).`, v: `gtail(${a}, 0, sqrt(${T2}), lambda y: ${D})` }; }
      return { q: T`For \(Z_T = e^{-${th}W_{${T2}} - \frac12(${th})^2(${T2})}\), find \(E_P[Z_T^2]\), to four decimals.`, answer: Math.exp(th * th * T2), tol: 1e-4 * Math.exp(th * th * T2), x: T`\(E[e^{-2\theta W_T}]e^{-\theta^2T} = e^{2\theta^2T - \theta^2T} = e^{\theta^2T}\).`, v: `gE(lambda y: ${D}**2, 0, sqrt(${T2}))` };
    } }],
    [U[10]]: [{ id: 'sc-bs', make(R) {
      const S = R.pick([80, 90, 100, 110, 120]), K = R.pick([90, 100, 110]), r = R.pick([0, 0.02, 0.05]), sg = R.pick([0.15, 0.2, 0.3, 0.4]), T2 = R.pick([0.25, 0.5, 1, 2]), b = bs(S, K, r, sg, T2), k = R.int(0, 4);
      const par = T`\(S = ${S}\), \(K = ${K}\), \(r = ${r}\), \(\sigma = ${sg}\), \(T = ${T2}\)`, dd = T`\(d_1 = ${dp(b.d1)}\), \(d_2 = ${dp(b.d2)}\)`;
      if (k === 0) return { q: T`Black–Scholes with ${par}. Find the call price, to three decimals.`, answer: b.call, tol: 2e-3, x: T`${dd}. \(C = S\Phi(d_1) - Ke^{-rT}\Phi(d_2)\).`, v: `bs_quad(${S}, ${K}, ${r}, ${sg}, ${T2}, 'call')` };
      if (k === 1) return { q: T`Black–Scholes with ${par}. Find the put price, to three decimals.`, answer: b.put, tol: 2e-3, x: T`${dd}. \(P = Ke^{-rT}\Phi(-d_2) - S\Phi(-d_1)\).`, v: `bs_quad(${S}, ${K}, ${r}, ${sg}, ${T2}, 'put')` };
      if (k === 2) { const put = R.int(0, 1), ans = Phi(b.d1) - (put ? 1 : 0); return { q: T`Black–Scholes with ${par}. Find the ${put ? 'put' : 'call'} delta, to four decimals.`, answer: ans, tol: 2e-4, x: T`${dd}. ${put ? T`\(\Phi(d_1) - 1\)` : T`\(\Phi(d_1)\)`}.`, v: `bs_greek(${S}, ${K}, ${r}, ${sg}, ${T2}, '${put ? 'put' : 'call'}', 'delta')` }; }
      if (k === 3) { const ans = phi(b.d1) / (S * sg * Math.sqrt(T2)); return { q: T`Black–Scholes with ${par}. Find gamma, to five decimals.`, answer: ans, tol: 2e-5, x: T`${dd}. \(\frac{\varphi(d_1)}{S\sigma\sqrt T}\).`, v: `bs_greek(${S}, ${K}, ${r}, ${sg}, ${T2}, 'call', 'gamma')` }; }
      const ans = Math.exp(-r * T2) * Phi(b.d2);
      return { q: T`Black–Scholes with ${par}. Find the price of a digital call paying 1 if \(S_T > K\), to four decimals.`, answer: ans, tol: 2e-4, x: T`${dd}. \(e^{-rT}\Phi(d_2)\).`, v: `bs_quad(${S}, ${K}, ${r}, ${sg}, ${T2}, 'digital')` };
    } }],
    [U[11]]: [{ id: 'sc-sim', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const th = R.pick([1, 2, 3]), m = R.int(-1, 2), sg = R.pick([0.5, 1, 2]), x0 = R.int(-2, 3), dt = R.pick([0.01, 0.04, 0.25]), z = [R.int(-20, 20) / 10, R.int(-20, 20) / 10];
        let x = x0; for (const zz of z) x = x + th * (m - x) * dt + sg * Math.sqrt(dt) * zz;
        return { q: T`Apply two Euler–Maruyama steps to \(${ouT(th, m, sg)}\) from \(X_0 = ${x0}\), with \(\Delta t = ${dt}\) and \(Z_1 = ${z[0]}\), \(Z_2 = ${z[1]}\). Find \(X_2\), to four decimals.`, answer: x, tol: 1e-4,
          x: T`\(X_{n+1} = X_n + ${th}(${m} - X_n)(${dt}) + ${sg}\sqrt{${dt}}\,Z_n\). \(X_1 = ${dp(x0 + th * (m - x0) * dt + sg * Math.sqrt(dt) * z[0])}\).`,
          v: `(lambda st: st(st(nsimplify(${x0}), nsimplify(${z[0]})), nsimplify(${z[1]})))(lambda xv, zz: xv + ${th}*(${m} - xv)*nsimplify(${dt}) + nsimplify(${sg})*sqrt(nsimplify(${dt}))*zz)` }; }
      if (k === 1) { const S0 = R.pick([50, 100]), mu = R.pick([0.05, 0.1]), sg = R.pick([0.2, 0.3]), dt = R.pick([1 / 12, 0.25, 1 / 52]), zz = R.int(-20, 20) / 10, ans = S0 * Math.exp((mu - sg * sg / 2) * dt + sg * Math.sqrt(dt) * zz), dts = dt === 0.25 ? '0.25' : dt === 1 / 12 ? '1/12' : '1/52';
        return { q: T`Take one exact GBM step with \(S_0 = ${S0}\), \(\mu = ${mu}\), \(\sigma = ${sg}\), \(\Delta t = ${dts}\), \(Z = ${zz}\). Find \(S_1\), to four decimals.`, answer: ans, tol: 1e-4 * S0 / 50, x: T`\(S_0\exp\big((\mu - \frac12\sigma^2)\Delta t + \sigma\sqrt{\Delta t}\,Z\big)\).`, v: `${S0}*exp((nsimplify(${mu}) - nsimplify(${sg})**2/2)*Rational('${dts}') + nsimplify(${sg})*sqrt(Rational('${dts}'))*nsimplify(${zz}))` }; }
      if (k === 2) { const s = R.pick([2, 5, 10, 25, 40]), n = R.pick([100, 400, 2500, 10000]);
        return { q: T`A Monte Carlo estimate uses \(N = ${n}\) samples with sample standard deviation ${s}. Find the half-width of the 95% confidence interval, to four decimals.`, answer: 1.96 * s / Math.sqrt(n), tol: 1e-4, x: T`\(1.96\,s/\sqrt N = 1.96 \cdot ${s}/${Math.sqrt(n)}\).`, v: `Rational(196,100)*${s}/sqrt(${n})` }; }
      const s = R.pick([2, 4, 5, 8, 12]), eps = R.pick([0.5, 0.2, 0.1, 0.05]), ans = Math.ceil((s / eps) ** 2 - 1e-9);
      return { q: T`Samples have standard deviation ${s}. Find the smallest \(N\) giving a standard error of at most ${eps}.`, answer: ans, x: T`\(N \ge (s/\varepsilon)^2 = (${s}/${eps})^2\).`, v: `ceiling((nsimplify(${s})/nsimplify(${eps}))**2)` };
    } }]
  } });
})();
