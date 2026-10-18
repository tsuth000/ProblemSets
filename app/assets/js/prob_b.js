'use strict';
// Probability and statistics, part B: units 11 to 19 (covariance through Bayesian inference).
(() => {
  const S = window.SUBJECTS.find(s => s.id === 'prob'), TB = window.PROB_TABLES, Phi = window.PROB_PHI, { ztab, ttab, ctab } = window.PROB_TAB;
  const U = ['Covariance and correlation', 'Transformations and generating functions', 'Inequalities and limit theorems', 'Point estimation', 'Sampling distributions', 'Confidence intervals', 'Hypothesis testing', 'Chi-square tests', 'Bayesian inference'];
  const tcrit = (df, col) => TB.t[String(df)][col], ccrit = (df, col) => TB.chi[String(df)][col];
  const ZC = { 90: 1.645, 95: 1.96, 99: 2.576 };
  const fct = n => (n <= 1 ? 1 : n * fct(n - 1)), Cn = (n, k) => (k < 0 || k > n ? 0 : Math.round(fct(n) / (fct(k) * fct(n - k))));
  const pct = v => Math.round(v * 100);
  // Exact standard normal CDF (Abramowitz and Stegun 7.1.26, error below 1e-7), for answers between table rows.
  const erf = x => { const s = Math.sign(x), a = Math.abs(x), t = 1 / (1 + 0.3275911 * a); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)); };
  const PhiX = z => 0.5 * (1 + erf(z / Math.SQRT2));

  S.learn.push(
    { title: U[0], skill: U[0],
      hook: T`<p>Covariance measures whether two quantities move together. It is the missing piece in the variance of a sum, and the core of portfolio risk: two assets that fall together add risk, two that offset each other remove it.</p>`,
      body: T`
\[\operatorname{Cov}(X, Y) = E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]E[Y]\]
<p><b>Properties.</b> \(\operatorname{Cov}(X, X) = \operatorname{Var}(X)\). It is symmetric and bilinear: \(\operatorname{Cov}(aX + b, cY + d) = ac\operatorname{Cov}(X, Y)\), and covariance distributes over sums.</p>
<p><b>Variance of a combination:</b></p>
\[\begin{aligned}&\operatorname{Var}(aX + bY)\\ &= a^2\operatorname{Var}X + b^2\operatorname{Var}Y\\ &\quad + 2ab\operatorname{Cov}(X, Y)\end{aligned}\]
<p><b>Correlation</b> rescales covariance to lie in \([-1, 1]\): \(\rho = \frac{\operatorname{Cov}(X, Y)}{\sigma_X\sigma_Y}\). \(\rho = \pm1\) exactly when \(Y\) is a linear function of \(X\).</p>
<p><b>Independence implies zero covariance, but not the reverse.</b> Take \(X\) uniform on \(\{-1, 0, 1\}\) and \(Y = X^2\): \(E[XY] = E[X^3] = 0 = E[X]E[Y]\), so \(\operatorname{Cov} = 0\), yet \(Y\) is a function of \(X\).</p>
<p><b>Two-asset portfolio.</b> Weights \(w\) and \(1 - w\), volatilities \(\sigma_1, \sigma_2\), correlation \(\rho\):</p>
\[\begin{aligned}\sigma_p^2 &= w^2\sigma_1^2 + (1 - w)^2\sigma_2^2\\ &\quad + 2w(1 - w)\rho\sigma_1\sigma_2\end{aligned}\]
<p>Equal weights with \(\sigma_1 = \sigma_2 = 20\%\): \(\rho = 1\) gives 20%, \(\rho = 0\) gives about 14.1%, \(\rho = -1\) gives 0.</p>`,
      ex: { q: T`\(\operatorname{Var}X = 4\), \(\operatorname{Var}Y = 9\), \(\operatorname{Cov}(X, Y) = -2\). Find \(\operatorname{Var}(X + Y)\), \(\operatorname{Var}(X - Y)\), and \(\rho\).`, a: T`<p>\(\operatorname{Var}(X + Y) = 4 + 9 - 4 = 9\). \(\operatorname{Var}(X - Y) = 4 + 9 + 4 = 17\).</p><p>\(\rho = \frac{-2}{2\cdot3} = -\frac13\).</p>` },
      trap: T`Dropping the \(2ab\operatorname{Cov}\) term, which is only correct for uncorrelated variables.`,
      vary: [[T`Independent, \(\operatorname{Var}X = 4\), \(\operatorname{Var}Y = 9\). \(\operatorname{Var}(X + Y)\)?`, 13, T`Covariance 0.`], [T`Same, \(\operatorname{Var}(X - Y)\)?`, 13, T`Variances add when subtracting too.`], [T`Now \(\operatorname{Cov} = 3\). \(\operatorname{Var}(X + Y)\)?`, 19, T`\(4 + 9 + 6\).`], [T`Same. Correlation?`, 0.5, T`\(\frac{3}{2\cdot3}\).`], [T`\(\operatorname{Cov}(X, Y) = 3\). Find \(\operatorname{Cov}(2X, -Y + 5)\).`, -6, T`\(2(-1)(3)\); constants drop out.`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Two tools handle functions of random variables. The <b>CDF method</b> finds the distribution of \(Y = g(X)\) directly. The <b>moment generating function</b> packs every moment into one function, and turns sums of independent variables into products.</p>`,
      body: T`
<h4>The CDF method</h4>
<p>Write \(F_Y(y) = P(g(X) \le y)\), solve the inequality for \(X\), and use \(X\)'s distribution. Differentiate for the density.</p>
<p>\(X \sim\) Uniform\((0, 1)\) and \(Y = X^2\): \(F_Y(y) = P(X \le \sqrt y) = \sqrt y\), so \(f_Y(y) = \frac{1}{2\sqrt y}\) on \((0, 1)\).</p>
<p>\(Y = -\ln X\): \(P(Y > s) = P(X < e^{-s}) = e^{-s}\), so \(Y \sim\) Exponential(1).</p>
<p>For increasing \(g\), \(f_Y(y) = f_X(g^{-1}(y))\left|\frac{d}{dy}g^{-1}(y)\right|\). A linear \(Y = aX + b\) has \(f_Y(y) = \frac{1}{|a|}f_X\!\left(\frac{y - b}{a}\right)\).</p>
<h4>Moment generating functions</h4>
\[M_X(t) = E[e^{tX}],\qquad M_X'(0) = E[X],\qquad M_X''(0) = E[X^2]\]
<table class="tt"><tr><th>Distribution</th><th>\(M(t)\)</th></tr>
<tr><td>Bernoulli\((p)\)</td><td>\(q + pe^t\)</td></tr><tr><td>Binomial\((n, p)\)</td><td>\((q + pe^t)^n\)</td></tr>
<tr><td>Poisson\((\lambda)\)</td><td>\(e^{\lambda(e^t - 1)}\)</td></tr><tr><td>Exponential\((\lambda)\)</td><td>\(\frac{\lambda}{\lambda - t}\), \(t < \lambda\)</td></tr>
<tr><td>Normal\((\mu, \sigma^2)\)</td><td>\(e^{\mu t + \sigma^2t^2/2}\)</td></tr></table>
<p><b>Sums.</b> For independent \(X, Y\): \(M_{X+Y}(t) = M_X(t)M_Y(t)\). Since an MGF identifies its distribution, Poisson\((\lambda_1)\) + Poisson\((\lambda_2)\) = Poisson\((\lambda_1 + \lambda_2)\), and independent normals sum to a normal.</p>`,
      ex: { q: T`Use the MGF \(M(t) = e^{3(e^t - 1)}\) to find \(E[X]\) and \(\operatorname{Var}(X)\).`, a: T`<p>\(M'(t) = 3e^tM(t)\), so \(E[X] = M'(0) = 3\).</p><p>\(M''(t) = 3e^tM(t) + 9e^{2t}M(t)\), so \(E[X^2] = 3 + 9 = 12\) and \(\operatorname{Var} = 12 - 9 = 3\). (Poisson(3), as expected.)</p>` },
      trap: T`Plugging into the density without the derivative factor: \(f_Y(y) \ne f_X(g^{-1}(y))\) unless \(g\) has slope 1.`,
      vary: [[T`\(X \sim\) U(0, 1), \(Y = X^2\). \(P(Y \le 0.25)\)?`, 0.5, T`\(P(X \le 0.5)\).`], [T`\(Y = X^3\). \(P(Y \le 0.125)\)?`, 0.5, T`\(P(X \le 0.5)\).`], [T`\(M(t) = (0.6 + 0.4e^t)^{10}\). Mean?`, 4, T`Binomial(10, 0.4).`], [T`\(M(t) = \frac{2}{2 - t}\). Mean?`, 0.5, T`Exponential(2).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>Averages of many independent observations settle down (the law of large numbers), and their fluctuations become normal in shape (the central limit theorem). Two inequalities bound tail probabilities with almost no information.</p>${fig('clt', {}, 'The distribution of a sample mean of a skewed population becomes bell-shaped as n grows.')}`,
      body: T`
<p><b>Markov:</b> for \(X \ge 0\), \(P(X \ge a) \le \frac{E[X]}{a}\).</p>
<p><b>Chebyshev:</b> \(P(|X - \mu| \ge k\sigma) \le \frac1{k^2}\). At least 75% of any distribution lies within 2 standard deviations, and 89% within 3. (For a normal, the true values are 95% and 99.7%; Chebyshev is weaker because it must hold for every distribution.)</p>
<p><b>Sample mean.</b> For independent observations with mean \(\mu\) and variance \(\sigma^2\): \(E[\bar X] = \mu\) and \(\operatorname{Var}(\bar X) = \frac{\sigma^2}{n}\).</p>
<p><b>Law of large numbers:</b> \(\bar X \to \mu\) as \(n \to \infty\); Chebyshev gives \(P(|\bar X - \mu| \ge \varepsilon) \le \frac{\sigma^2}{n\varepsilon^2} \to 0\).</p>
<p><b>Central limit theorem:</b> for large \(n\), \(\bar X \approx N\!\left(\mu, \frac{\sigma^2}{n}\right)\) and the sum \(\approx N(n\mu, n\sigma^2)\), whatever the shape of the population.</p>
<p><b>Normal approximation to the binomial</b> (when \(np\) and \(n(1-p)\) are both at least 10): \(X \approx N(np, np(1-p))\). Use a <b>continuity correction</b>, since a whole number \(k\) covers \([k - 0.5, k + 0.5]\): \(P(X \ge k) \approx P\!\left(Z \ge \frac{k - 0.5 - np}{\sqrt{np(1-p)}}\right)\) and \(P(X \le k) \approx \Phi\!\left(\frac{k + 0.5 - np}{\sqrt{np(1-p)}}\right)\).</p>
${ztab()}`,
      ex: { q: T`A fair coin is flipped 100 times. Approximate \(P(X \ge 60)\).`, a: T`<p>\(np = 50\), \(\sqrt{npq} = 5\). With the correction: \(z = \frac{59.5 - 50}{5} = 1.9\).</p><p>\(P \approx 1 - \Phi(1.9) = 1 - 0.9713 = 0.0287\).</p>` },
      exs: [{ q: T`Daily returns have mean 0.1% and standard deviation 2%, independent across days. Approximate the probability the average over 100 days exceeds 0.5%.`, a: T`<p>\(\bar X \approx N(0.1, (2/10)^2) = N(0.1, 0.2^2)\). \(z = \frac{0.5 - 0.1}{0.2} = 2\): \(1 - \Phi(2) = 0.0228\).</p>` }],
      trap: T`Using \(\sigma\) instead of \(\frac{\sigma}{\sqrt n}\) for the spread of a sample mean.`,
      vary: [[T`Chebyshev: at least what fraction lies within 2 standard deviations?`, 0.75, T`\(1 - \frac14\).`], [T`Within 3?`, 8 / 9, T`\(1 - \frac19\).`], [T`Markov: \(X \ge 0\), \(E[X] = 5\). Upper bound for \(P(X \ge 20)\)?`, 0.25, T`\(\frac5{20}\).`], [T`\(\sigma = 10\), \(n = 25\). Standard deviation of \(\bar X\)?`, 2, T`\(\frac{10}{5}\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>An <b>estimator</b> is a formula that turns data into a guess for an unknown parameter: \(\bar X\) for a mean, \(\hat p\) for a proportion. Statistics asks how good the guess is on average, and how to construct good ones.</p>`,
      body: T`
<p><b>Bias:</b> \(E[\hat\theta] - \theta\). Unbiased means the estimator is right on average. \(\bar X\) is unbiased for \(\mu\); \(S^2 = \frac1{n-1}\sum(X_i - \bar X)^2\) is unbiased for \(\sigma^2\), while dividing by \(n\) gives bias \(-\frac{\sigma^2}{n}\).</p>
<p><b>Mean squared error</b> combines both kinds of error:</p>
\[\operatorname{MSE}(\hat\theta) = E[(\hat\theta - \theta)^2] = \operatorname{Var}(\hat\theta) + \text{bias}^2\]
<p>A slightly biased estimator with much smaller variance can have lower MSE.</p>
<p><b>Method of moments.</b> Set sample moments equal to theoretical ones and solve. Uniform\((0, \theta)\) has mean \(\frac\theta2\), so \(\hat\theta = 2\bar X\).</p>
<p><b>Maximum likelihood.</b> Choose the parameter that makes the observed data most probable. Write the likelihood \(L(\theta) = \prod f(x_i;\theta)\), take logs, differentiate, set to 0.</p>
<p>Exponential example: \(\ln L = n\ln\lambda - \lambda\sum x_i\), so \(\frac{n}{\lambda} - \sum x_i = 0\) and \(\hat\lambda = \frac{1}{\bar x}\).</p>
<table class="tt"><tr><th>Model</th><th>MLE</th></tr>
<tr><td>Bernoulli\((p)\)</td><td>\(\hat p = \bar x\), the success fraction</td></tr><tr><td>Poisson\((\lambda)\)</td><td>\(\hat\lambda = \bar x\)</td></tr>
<tr><td>Exponential\((\lambda)\)</td><td>\(\hat\lambda = 1/\bar x\)</td></tr><tr><td>Normal\((\mu, \sigma^2)\)</td><td>\(\hat\mu = \bar x\), \(\hat\sigma^2 = \frac1n\sum(x_i - \bar x)^2\)</td></tr>
<tr><td>Uniform\((0, \theta)\)</td><td>\(\hat\theta = \max x_i\) (the likelihood \(\theta^{-n}\) falls as \(\theta\) grows, so take the smallest \(\theta\) the data allow)</td></tr></table>`,
      ex: { q: T`Waiting times 2, 5, 1, 4 are modeled as Exponential\((\lambda)\). Find the MLE of \(\lambda\) and the estimated mean wait.`, a: T`<p>\(\bar x = 3\), so \(\hat\lambda = \frac13\). By invariance, the MLE of the mean \(\frac1\lambda\) is 3.</p>` },
      trap: T`Setting the derivative of the likelihood to zero for Uniform\((0, \theta)\). Its likelihood has no interior maximum; the answer sits at the boundary, \(\max x_i\).`,
      vary: [[T`Bias 2, variance 5. MSE?`, 9, T`\(5 + 2^2\).`], [T`Counts 3, 5, 4 from Poisson\((\lambda)\). MLE of \(\lambda\)?`, 4, T`The sample mean.`], [T`Uniform\((0, \theta)\) data 2, 7, 3. MLE of \(\theta\)?`, 7, T`The maximum.`], [T`Same data. Method of moments estimate?`, 8, T`\(2\bar x = 2(4)\).`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Exact inference for normal data rests on three distributions built from standard normals: chi-square, \(t\), and \(F\). Their tables replace the \(z\) table when \(\sigma\) is unknown.</p>`,
      body: T`
<p><b>Chi-square</b> with \(k\) degrees of freedom is a sum of \(k\) independent squared standard normals: \(\chi^2_k = Z_1^2 + \cdots + Z_k^2\), with mean \(k\) and variance \(2k\).</p>
<p><b>Sample variance.</b> For normal data, \(\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}\), independent of \(\bar X\). One degree of freedom is spent estimating \(\mu\) by \(\bar x\). Consequences: \(E[S^2] = \sigma^2\) and \(\operatorname{Var}(S^2) = \frac{2\sigma^4}{n - 1}\).</p>
<p><b>Student's t.</b> Replacing \(\sigma\) by \(S\) in the standardized mean gives</p>
\[T = \frac{\bar X - \mu}{S/\sqrt n} \sim t_{n-1}\]
<p>The \(t\) density is bell-shaped with heavier tails than \(Z\), because \(S\) varies too. As df grows it approaches \(N(0, 1)\): the 95% cutoff is 2.228 at 10 df and 1.96 at infinity.</p>
<p><b>F.</b> A ratio of independent chi-squares, each divided by its df: \(F = \frac{\chi^2_a/a}{\chi^2_b/b}\). It compares two variances and underlies ANOVA and regression F-tests.</p>
<h4>t table</h4>${ttab()}
<h4>Chi-square table</h4>${ctab()}`,
      ex: { q: T`A sample of 10 from a normal population with \(\sigma^2 = 4\). Find \(c\) with \(P(S^2 > c) = 0.05\).`, a: T`<p>\(\frac{9S^2}{4} \sim \chi^2_9\). The table gives \(\chi^2_{0.05} = 16.919\) for 9 df.</p><p>\(P\!\left(\frac{9S^2}{4} > 16.919\right) = 0.05\), so \(c = \frac{4(16.919)}{9} \approx 7.52\).</p>` },
      trap: T`Using \(n\) degrees of freedom for \(S^2\) or for the one-sample \(t\). It is \(n - 1\).`,
      vary: [[T`Mean of \(\chi^2_8\)?`, 8, T`\(k\).`], [T`Variance of \(\chi^2_8\)?`, 16, T`\(2k\).`], [T`Sample of 15. df for the one-sample \(t\)?`, 14, T`\(n - 1\).`], [T`\(t_{0.025}\) with 10 df (table)?`, 2.228, T`Wider than 1.96.`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>A confidence interval comes from a <b>pivot</b>: a quantity built from data and parameter whose distribution is known. Trap the pivot between two table values, then solve the inequalities for the parameter.</p>${fig('ciCoverage', {}, 'Repeated samples: about 95% of the intervals cover the true mean.')}`,
      body: T`
<p><b>Derivation, known \(\sigma\).</b> \(P\!\left(-1.96 \le \frac{\bar X - \mu}{\sigma/\sqrt n} \le 1.96\right) = 0.95\). Solving for \(\mu\):</p>
\[\bar x \pm z^*\frac{\sigma}{\sqrt n},\qquad z^* = 1.645,\ 1.96,\ 2.576 \text{ for } 90, 95, 99\%\]
<p><b>Unknown \(\sigma\), normal data:</b> \(\bar x \pm t^*_{n-1}\frac{s}{\sqrt n}\) with \(t^*\) from the table.</p>
<p><b>Proportion</b> (large \(n\)): \(\hat p \pm z^*\sqrt{\frac{\hat p(1 - \hat p)}{n}}\).</p>
<p><b>Sample size</b> for margin \(E\): \(n = \left(\frac{z^*\sigma}{E}\right)^2\), rounded up. Halving the margin quadruples \(n\).</p>
<p><b>Variance:</b> from the chi-square pivot,</p>
\[\left[\frac{(n-1)s^2}{\chi^2_{0.025}},\ \frac{(n-1)s^2}{\chi^2_{0.975}}\right]\]
<p>Dividing by the larger cutoff gives the lower endpoint. The interval is not symmetric about \(s^2\).</p>
<p><b>Difference of means</b> (independent samples, known \(\sigma\)'s or large \(n\)): \((\bar x_1 - \bar x_2) \pm z^*\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}\).</p>
<p><b>Meaning.</b> 95% describes the procedure: in repeated sampling, 95% of intervals built this way cover \(\mu\).</p>`,
      ex: { q: T`\(n = 16\), \(\bar x = 50\), \(s = 8\), normal data. Build a 95% interval for \(\mu\).`, a: T`<p>\(t^*_{15} = 2.131\). Margin \(2.131\cdot\frac{8}{4} = 4.262\). Interval \((45.74, 54.26)\).</p>` },
      exs: [{ q: T`\(n = 11\), \(s^2 = 20\). Build a 95% interval for \(\sigma^2\).`, a: T`<p>df 10: \(\chi^2_{0.025} = 20.483\), \(\chi^2_{0.975} = 3.247\). \((n-1)s^2 = 200\).</p><p>Interval \(\left(\frac{200}{20.483}, \frac{200}{3.247}\right) \approx (9.76, 61.60)\).</p>` }],
      trap: T`Using \(z^*\) with a small sample and unknown \(\sigma\). The \(t\) cutoff is larger, and the interval should be wider.`,
      vary: [[T`\(\sigma = 10\), \(n = 25\), 95%. Margin of error?`, 3.92, T`\(1.96\cdot2\).`], [T`Same, \(n = 100\). Margin?`, 1.96, T`Quadruple \(n\), halve the margin.`], [T`\(\sigma = 10\), margin 1, 95%. Minimum \(n\)?`, 385, T`\(19.6^2 = 384.16\), round up.`], [T`\(\hat p = 0.5\), \(n = 100\), 95%. Margin?`, 0.098, T`\(1.96\cdot0.05\).`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>A test asks whether data are surprising under a default claim \(H_0\). Compute how many standard errors the estimate sits from the null value, then ask how often a result that extreme would happen if \(H_0\) were true.</p>${fig('pvalue', {}, 'The p-value is the tail area beyond the observed statistic, both tails for a two-sided test.')}`,
      body: T`
<table class="tt"><tr><th>Setting</th><th>Statistic</th><th>Reference</th></tr>
<tr><td>mean, \(\sigma\) known</td><td>\(z = \frac{\bar x - \mu_0}{\sigma/\sqrt n}\)</td><td>\(N(0, 1)\)</td></tr>
<tr><td>mean, \(\sigma\) unknown</td><td>\(t = \frac{\bar x - \mu_0}{s/\sqrt n}\)</td><td>\(t_{n-1}\)</td></tr>
<tr><td>proportion</td><td>\(z = \frac{\hat p - p_0}{\sqrt{p_0(1 - p_0)/n}}\)</td><td>\(N(0, 1)\)</td></tr>
<tr><td>paired data</td><td>\(t\) on the differences \(d_i\)</td><td>\(t_{n-1}\)</td></tr>
<tr><td>two means, \(\sigma\)'s known</td><td>\(z = \frac{\bar x_1 - \bar x_2}{\sqrt{\sigma_1^2/n_1 + \sigma_2^2/n_2}}\)</td><td>\(N(0, 1)\)</td></tr></table>
<p><b>p-value.</b> One-sided upper: \(P(Z \ge z)\). Two-sided: \(2P(Z \ge |z|)\). Reject \(H_0\) when \(p \le \alpha\), equivalently when the statistic passes the critical value (1.96 for two-sided \(\alpha = 0.05\)).</p>
<p><b>Errors.</b> Type I: reject a true \(H_0\), probability \(\alpha\). Type II: keep a false \(H_0\), probability \(\beta\). <b>Power</b> \(= 1 - \beta\).</p>
<p><b>Power of a one-sided \(z\) test</b> of \(\mu_0\) against a true mean \(\mu_1 > \mu_0\):</p>
\[\text{power} = 1 - \Phi\!\left(z_\alpha - \frac{\mu_1 - \mu_0}{\sigma/\sqrt n}\right)\]
<p>Power rises with the effect size, the sample size, and \(\alpha\), and falls with \(\sigma\).</p>
<p><b>Duality.</b> A two-sided test at level \(\alpha\) rejects exactly when \(\mu_0\) lies outside the \(1 - \alpha\) confidence interval.</p>
${ztab()}`,
      ex: { q: T`\(H_0\colon \mu = 100\), \(\sigma = 15\), \(n = 25\), \(\bar x = 106\). Two-sided p-value?`, a: T`<p>\(z = \frac{106 - 100}{15/5} = 2\). \(p = 2(1 - \Phi(2)) = 2(0.0228) = 0.0456\). Reject at 5%.</p>` },
      exs: [{ q: T`Same test, one-sided \(\alpha = 0.05\) (\(z_\alpha = 1.645\)). Power if the true mean is 106?`, a: T`<p>Shift \(= \frac{6}{3} = 2\). Power \(= 1 - \Phi(1.645 - 2) = 1 - \Phi(-0.355) \approx 0.64\).</p>` }],
      trap: T`Reading the p-value as the probability \(H_0\) is true. It is computed assuming \(H_0\) is true.`,
      vary: [[T`\(z = 1.5\), two-sided. p-value?`, 0.1336, T`\(2(1 - 0.9332)\).`], [T`\(z = 1.5\), one-sided upper. p-value?`, 0.0668, T`One tail.`], [T`\(n = 9\), \(\bar x = 52\), \(\mu_0 = 50\), \(s = 3\). \(t\)?`, 2, T`\(\frac{2}{3/3}\).`], [T`Is that significant two-sided at 5% with 8 df? (\(t^* = 2.306\))`, ['No', 'Yes'], T`\(2 < 2.306\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Chi-square tests compare observed counts with the counts a hypothesis predicts. Big gaps, measured relative to the expected counts, mean the hypothesis fits poorly.</p>`,
      body: T`
\[\chi^2 = \sum\frac{(O - E)^2}{E}\]
<p><b>Goodness of fit.</b> Do counts in \(k\) categories match given probabilities? \(E_i = np_i\); df \(= k - 1\) (minus one more for each parameter estimated from the data).</p>
<p><b>Independence</b> in an \(r\times c\) table: under independence, \(E = \frac{\text{row total}\times\text{column total}}{\text{grand total}}\); df \(= (r - 1)(c - 1)\).</p>
<p>Reject when \(\chi^2\) exceeds the table cutoff. The approximation needs expected counts of at least about 5.</p>
${ctab()}`,
      ex: { q: T`A die rolled 60 times shows 5, 8, 9, 8, 10, 20. Is it fair at the 5% level?`, a: T`<p>Each \(E = 10\). \(\chi^2 = \frac{25 + 4 + 1 + 4 + 0 + 100}{10} = 13.4\).</p><p>df 5, cutoff 11.070. \(13.4 > 11.070\): reject fairness.</p>` },
      exs: [{ q: T`A 2×2 table has rows (30, 20) and (20, 30). Find the expected count in the first cell and \(\chi^2\).`, a: T`<p>Row and column totals are all 50, grand total 100: each \(E = 25\).</p><p>\(\chi^2 = 4\cdot\frac{25}{25} = 4\). df 1, cutoff 3.841: reject independence.</p>` }],
      trap: T`Using percentages instead of counts in the formula. The statistic needs counts.`,
      vary: [[T`Goodness of fit with 6 categories. df?`, 5, T`\(k - 1\).`], [T`A 3×4 table. df for independence?`, 6, T`\((3-1)(4-1)\).`], [T`Row total 40, column total 30, grand total 120. Expected count?`, 10, T`\(\frac{40\cdot30}{120}\).`], [T`\(O = 15\), \(E = 10\). Contribution to \(\chi^2\)?`, 2.5, T`\(\frac{25}{10}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Bayesian inference treats an unknown parameter as uncertain and updates beliefs with data: posterior \(\propto\) likelihood \(\times\) prior. It is Bayes' rule applied to parameters.</p>`,
      body: T`
<p><b>Discrete prior.</b> A coin is fair or lands heads with probability 0.8, each with prior 0.5. After 3 heads in 3 flips:</p>
\[P(\text{biased}\mid HHH) = \frac{0.8^3(0.5)}{0.8^3(0.5) + 0.5^3(0.5)} = \frac{0.512}{0.637} \approx 0.80\]
<p><b>Beta-binomial.</b> A Beta\((a, b)\) prior on \(p\) has density \(\propto p^{a-1}(1 - p)^{b-1}\) and mean \(\frac{a}{a + b}\). After \(s\) successes and \(f\) failures the posterior is Beta\((a + s, b + f)\): add successes to \(a\) and failures to \(b\). Beta(1, 1) is the uniform prior.</p>
<p><b>Posterior mean as a compromise:</b></p>
\[\frac{a + s}{a + b + n} = \frac{a + b}{a + b + n}\cdot\frac{a}{a + b} + \frac{n}{a + b + n}\cdot\frac sn\]
<p>a weighted average of the prior mean and the sample proportion, with the data's weight growing with \(n\). The prior acts like \(a + b\) earlier observations.</p>
<p><b>Prediction.</b> The probability the next trial succeeds is the posterior mean. With a uniform prior and \(s\) successes in \(n\) trials it is \(\frac{s + 1}{n + 2}\) (Laplace's rule of succession).</p>
<p><b>Credible interval</b>: an interval holding 95% of the posterior probability. Unlike a confidence interval, it does say "the parameter is in here with probability 0.95", given the prior.</p>`,
      ex: { q: T`Prior Beta(2, 2) for a win rate. You observe 7 wins in 10 games. Find the posterior and its mean.`, a: T`<p>Beta\((2 + 7, 2 + 3) = \) Beta(9, 5). Mean \(\frac{9}{14} \approx 0.643\), between the prior mean 0.5 and the sample rate 0.7.</p>` },
      trap: T`Adding the number of trials to \(b\) instead of the number of failures.`,
      vary: [[T`Prior Beta(1, 1), 3 successes in 4. Posterior mean?`, 4 / 6, T`Beta(4, 2).`], [T`Prior Beta(5, 5), same data. Posterior mean?`, 8 / 14, T`Beta(8, 6): a stronger prior pulls toward 0.5.`], [T`Uniform prior, 0 successes in 2. P(next succeeds)?`, 0.25, T`\(\frac{0 + 1}{2 + 2}\).`]] }
  );

  addQuestions('prob', [
    { id: 'pr12', skill: U[0], q: T`If \(\operatorname{Cov}(X, Y) = 0\), then:`, c: ['X and Y are uncorrelated but may still be dependent', 'X and Y are independent', 'X = Y', 'Var(X + Y) = 0'], x: T`Zero covariance rules out linear dependence only. Example: \(Y = X^2\) with \(X\) symmetric.` },
    { id: 'pr13', skill: U[1], q: T`For independent \(X\) and \(Y\), the MGF of \(X + Y\) is:`, c: [T`\(M_X(t)M_Y(t)\)`, T`\(M_X(t) + M_Y(t)\)`, T`\(M_X(M_Y(t))\)`, T`\(M_X(2t)\)`], x: T`\(E[e^{t(X+Y)}] = E[e^{tX}]E[e^{tY}]\) by independence.` },
    { id: 'pr14', skill: U[2], q: T`The central limit theorem says that for large \(n\):`, c: ['the sample mean is approximately normal, whatever the population shape', 'the population becomes normal', 'the sample variance equals the population variance', 'every observation is normal'], x: T`It concerns the distribution of \(\bar X\) across samples.` },
    { id: 'pr15', skill: U[3], q: T`Why does \(S^2\) divide by \(n - 1\)?`, c: ['to make it unbiased for \\(\\sigma^2\\)', 'to minimize its variance', 'because one observation is discarded', 'to make it the MLE'], x: T`Deviations from \(\bar x\) are slightly smaller than from \(\mu\); dividing by \(n - 1\) corrects the average.` },
    { id: 'pr16', skill: U[4], q: T`Compared with the standard normal, the \(t\) distribution has:`, c: ['heavier tails', 'lighter tails', 'a different center', 'no symmetry'], x: T`It accounts for the extra uncertainty from estimating \(\sigma\).` },
    { id: 'pr17', skill: U[5], q: T`To halve a confidence interval's width with everything else fixed, the sample size must be:`, c: ['multiplied by 4', 'doubled', 'halved', 'multiplied by \\(\\sqrt2\\)'], x: T`The width scales with \(\frac1{\sqrt n}\).` },
    { id: 'pr18', skill: U[6], q: T`Increasing the significance level \(\alpha\) (all else fixed):`, c: ['raises power and raises the Type I error rate', 'lowers power', 'lowers the Type I error rate', 'has no effect on power'], x: T`A looser cutoff rejects more often in every situation.` },
    { id: 'pr19', skill: U[7], q: T`A chi-square independence test on a 2×3 table has how many degrees of freedom?`, c: ['2', '5', '6', '1'], x: T`\((2 - 1)(3 - 1)\).` },
    { id: 'pr20', skill: U[8], q: T`With a Beta\((a, b)\) prior and binomial data, the posterior is:`, c: [T`Beta\((a + s, b + n - s)\)`, T`Beta\((a + n, b + s)\)`, T`Beta\((s, n - s)\)`, 'normal'], x: T`Successes add to \(a\), failures to \(b\).` }
  ]);

  // ======================= GENERATORS =======================
  const Z = z => `(1 + erf(${z}/sqrt(2)))/2`;
  registerUnitGens('prob', { units: {
    [U[0]]: [
      { id: 'pcv-var', make(R) {
        const vx = R.int(1, 9), vy = R.int(1, 9), cv = R.int(-Math.floor(Math.sqrt(vx * vy)), Math.floor(Math.sqrt(vx * vy))), a = R.nz(-3, 3), b = R.nz(-3, 3), v = a * a * vx + b * b * vy + 2 * a * b * cv;
        return { q: T`\(\operatorname{Var}X = ${vx}\), \(\operatorname{Var}Y = ${vy}\), \(\operatorname{Cov}(X, Y) = ${cv}\). Find \(\operatorname{Var}(${R.lin([[a, 'X'], [b, 'Y']])})\).`, answer: v, x: T`\(${a * a}(${vx}) + ${b * b}(${vy}) + 2(${a})(${b})(${cv}) = ${v}\).`, v: `(${a})**2*${vx} + (${b})**2*${vy} + 2*(${a})*(${b})*(${cv})` };
      } },
      { id: 'pcv-corr', make(R) {
        const sx = R.int(1, 6), sy = R.int(1, 6), rho = R.pick([-0.8, -0.5, -0.25, 0.2, 0.4, 0.5, 0.75]), cv = rho * sx * sy, ask = R.int(0, 1);
        if (ask === 0) return { q: T`\(\sigma_X = ${sx}\), \(\sigma_Y = ${sy}\), \(\operatorname{Cov}(X, Y) = ${R.fmt(cv)}\). Find the correlation.`, answer: rho, tol: 1e-6, x: T`\(\rho = \frac{${R.fmt(cv)}}{${sx}\cdot${sy}} = ${rho}\).`, v: `Rational(${Math.round(cv * 100)}, 100)/(${sx}*${sy})` };
        return { q: T`\(\sigma_X = ${sx}\), \(\sigma_Y = ${sy}\), \(\rho = ${rho}\). Find \(\operatorname{Cov}(X, Y)\).`, answer: cv, tol: 1e-6, x: T`\(\rho\sigma_X\sigma_Y = ${rho}(${sx})(${sy}) = ${R.fmt(cv)}\).`, v: `Rational(${Math.round(rho * 100)}, 100)*${sx}*${sy}` };
      } },
      { id: 'pcv-port', make(R) {
        const w = R.pick([0.25, 0.5, 0.6, 0.75]), s1 = R.pick([10, 15, 20, 30]), s2 = R.pick([10, 20, 25, 40]), rho = R.pick([-0.5, 0, 0.3, 0.5, 1]), v = Math.sqrt(w * w * s1 * s1 + (1 - w) ** 2 * s2 * s2 + 2 * w * (1 - w) * rho * s1 * s2);
        return { q: T`A portfolio holds ${pct(w)}% in asset 1 (volatility ${s1}%) and ${pct(1 - w)}% in asset 2 (volatility ${s2}%), with correlation ${rho}. Find the portfolio volatility in percent.`, answer: v, tol: 0.01, hint: 'Two decimals.',
          x: T`\(\sigma_p^2 = ${w}^2(${s1})^2 + ${R.fmt(1 - w)}^2(${s2})^2 + 2(${w})(${R.fmt(1 - w)})(${rho})(${s1})(${s2}) = ${R.fmt(v * v, 3)}\), so \(\sigma_p \approx ${R.fmt(v, 3)}\%\).`,
          v: `sqrt(Rational(${pct(w)}, 100)**2*${s1}**2 + (1 - Rational(${pct(w)}, 100))**2*${s2}**2 + 2*Rational(${pct(w)}, 100)*(1 - Rational(${pct(w)}, 100))*Rational(${Math.round(rho * 10)}, 10)*${s1}*${s2})` };
      } },
      { id: 'pcv-tab', make(R) {
        let w; do { w = Array.from({ length: 4 }, () => R.int(1, 10)); } while (w.reduce((a, b) => a + b, 0) !== 20);
        const p = w.map(x => x / 20), pX1 = p[2] + p[3], pY1 = p[1] + p[3], cv = p[3] - pX1 * pY1;
        const tbl = `<table class="tt"><tr><th></th><th>\\(Y = 0\\)</th><th>\\(Y = 1\\)</th></tr><tr><th>\\(X = 0\\)</th><td>${R.fmt(p[0])}</td><td>${R.fmt(p[1])}</td></tr><tr><th>\\(X = 1\\)</th><td>${R.fmt(p[2])}</td><td>${R.fmt(p[3])}</td></tr></table>`;
        return { q: T`Joint PMF:${tbl}Find \(\operatorname{Cov}(X, Y)\).`, answer: cv, tol: 1e-6, x: T`\(E[XY] = P(X = 1, Y = 1) = ${R.fmt(p[3])}\). \(E[X] = ${R.fmt(pX1)}\), \(E[Y] = ${R.fmt(pY1)}\). \(\operatorname{Cov} = ${R.fmt(p[3])} - ${R.fmt(pX1)}(${R.fmt(pY1)}) = ${R.fmt(cv, 4)}\).`,
          v: `Rational(${w[3]}, 20) - Rational(${w[2] + w[3]}, 20)*Rational(${w[1] + w[3]}, 20)` };
      } }
    ],
    [U[1]]: [
      { id: 'pmgf', make(R) {
        const k = R.int(0, 3), ask = R.int(0, 1);
        let M, py, name, mean, varr;
        if (k === 0) { const n = R.int(3, 12), p = R.pick([0.2, 0.25, 0.4, 0.5]); M = T`(${R.fmt(1 - p)} + ${p}e^t)^{${n}}`; py = `(1 - Rational(${pct(p)}, 100) + Rational(${pct(p)}, 100)*exp(t))**${n}`; name = `Binomial(${n}, ${p})`; mean = n * p; varr = n * p * (1 - p); }
        else if (k === 1) { const l = R.int(1, 6); M = T`e^{${l}(e^t - 1)}`; py = `exp(${l}*(exp(t) - 1))`; name = `Poisson(${l})`; mean = l; varr = l; }
        else if (k === 2) { const l = R.pick([1, 2, 4, 5]); M = T`\frac{${l}}{${l} - t}`; py = `${l}/(${l} - t)`; name = `Exponential(${l})`; mean = 1 / l; varr = 1 / (l * l); }
        else { const m = R.nz(-3, 5), s2 = R.int(1, 9); M = T`e^{${m}t + ${s2}t^2/2}`; py = `exp(${m}*t + ${s2}*t**2/2)`; name = `Normal(${m}, ${s2})`; mean = m; varr = s2; }
        return { q: T`A random variable has moment generating function \(M(t) = ${M}\). Find its ${ask ? 'variance' : 'mean'}.`, answer: ask ? varr : mean, tol: 0.001,
          x: T`This is the MGF of ${name}. \(E[X] = M'(0) = ${R.fmt(mean, 4)}\)${ask ? T`; \(\operatorname{Var} = M''(0) - M'(0)^2 = ${R.fmt(varr, 4)}\)` : ''}.`,
          v: ask ? `diff(${py}, t, 2).subs(t, 0) - diff(${py}, t).subs(t, 0)**2` : `diff(${py}, t).subs(t, 0)` };
      } }
    ],
    [U[2]]: [
      { id: 'pcheb', make(R) {
        const mu = R.int(20, 80), sd = R.int(2, 10), k = R.pick([1.5, 2, 2.5, 3, 4]), c = k * sd, ask = R.int(0, 1);
        if (ask === 0) return { q: T`A distribution has mean ${mu} and standard deviation ${sd}. By Chebyshev, at least what fraction lies strictly between ${R.fmt(mu - c)} and ${R.fmt(mu + c)}?`, answer: 1 - 1 / (k * k), tol: 0.0006, x: T`That is \(k = \frac{${R.fmt(c)}}{${sd}} = ${k}\) standard deviations: at least \(1 - \frac1{k^2} = ${R.fmt(1 - 1 / (k * k), 4)}\).`, v: `1 - 1/Rational(${Math.round(k * 10)}, 10)**2` };
        const a = mu * R.pick([2, 3, 4, 5]);
        return { q: T`A nonnegative random variable has mean ${mu}. Give Markov's upper bound for \(P(X \ge ${a})\).`, answer: mu / a, tol: 0.0006, x: T`\(\frac{E[X]}{a} = \frac{${mu}}{${a}} = ${R.frac(mu, a)}\).`, v: `Rational(${mu}, ${a})` };
      } },
      { id: 'pclt', make(R) {
        const n = R.pick([16, 25, 36, 49, 64, 100]), sd = R.pick([4, 6, 10, 12, 20]), mu = R.int(20, 100), se = sd / Math.sqrt(n), z = R.pick([0.5, 1, 1.5, 2, 2.5]), up = R.int(0, 1), c = +(mu + (up ? z : -z) * se).toFixed(3);
        return { q: T`A population has mean ${mu} and standard deviation ${sd}. For a random sample of ${n}, approximate \(P(\bar X ${up ? '>' : '<'} ${R.fmt(c)})\).`, answer: 1 - Phi(z), tol: 0.0006, hint: 'Use the table; four decimals.',
          x: T`\(SE = \frac{${sd}}{\sqrt{${n}}} = ${R.fmt(se, 4)}\). \(z = \frac{${R.fmt(c)} - ${mu}}{${R.fmt(se, 4)}} = ${up ? '' : '-'}${z.toFixed(1)}\). ${up ? T`\(1 - \Phi(${z.toFixed(1)})\)` : T`\(\Phi(-${z.toFixed(1)}) = 1 - \Phi(${z.toFixed(1)})\)`} \(= ${(1 - Phi(z)).toFixed(4)}\).`, v: `1 - ${Z(`Rational(${Math.round(z * 10)}, 10)`)}` };
      } },
      { id: 'pnapx', make(R) {
        const [n, p, sd] = R.pick([[100, 0.5, 5], [900, 0.5, 15], [196, 0.5, 7]]), mean = n * p;
        let z; if (sd === 7) z = R.pick([0.5, 1.5, 2.5]); else z = R.pick([0.1, 0.3, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7, 1.9, 2.1, 2.3]);
        const up = R.int(0, 1), k = up ? mean + z * sd + 0.5 : mean - z * sd - 0.5;
        return { q: T`\(X \sim \text{Binomial}(${n}, ${p})\). Use the normal approximation with continuity correction to estimate \(P(X ${up ? '\\ge' : '\\le'} ${R.fmt(k)})\).`, answer: 1 - Phi(z), tol: 0.0006, hint: 'Use the table; four decimals.',
          x: T`Mean ${mean}, SD \(\sqrt{${n}(${p})(${R.fmt(1 - p)})} = ${sd}\). ${up ? T`\(P(X \ge ${R.fmt(k)}) \approx P\!\left(Z \ge \frac{${R.fmt(k - 0.5)} - ${mean}}{${sd}}\right) = 1 - \Phi(${z.toFixed(1)})\)` : T`\(P(X \le ${R.fmt(k)}) \approx \Phi\!\left(\frac{${R.fmt(k + 0.5)} - ${mean}}{${sd}}\right) = \Phi(-${z.toFixed(1)})\)`} \(= ${(1 - Phi(z)).toFixed(4)}\).`,
          v: up ? `1 - ${Z(`(Rational(${Math.round((k - 0.5) * 10)}, 10) - ${mean})/${sd}`)}` : `${Z(`(Rational(${Math.round((k + 0.5) * 10)}, 10) - ${mean})/${sd}`)}` };
      } }
    ],
    [U[3]]: [
      { id: 'pmle', make(R) {
        const k = R.int(0, 4), n = R.int(4, 6);
        if (k === 0) { const xs = Array.from({ length: n }, () => R.int(0, 8)); const m = xs.reduce((a, b) => a + b, 0) / n;
          return { q: T`Counts ${xs.join(', ')} come from a Poisson\((\lambda)\) model. Find the maximum likelihood estimate of \(\lambda\).`, answer: m, tol: 0.001, x: T`\(\hat\lambda = \bar x = \frac{${xs.reduce((a, b) => a + b, 0)}}{${n}} = ${R.fmt(m, 4)}\).`, v: `Rational(${xs.join(' + ')}, ${n})` }; }
        if (k === 1) { const xs = Array.from({ length: n }, () => R.int(1, 9)); const s = xs.reduce((a, b) => a + b, 0);
          return { q: T`Waiting times ${xs.join(', ')} come from an Exponential\((\lambda)\) model. Find the maximum likelihood estimate of \(\lambda\).`, answer: n / s, tol: 0.001, x: T`\(\hat\lambda = \frac{1}{\bar x} = \frac{${n}}{${s}} \approx ${R.fmt(n / s, 4)}\).`, v: `Rational(${n}, ${s})` }; }
        if (k === 2) { const m = R.int(10, 40), sN = R.int(1, m - 1);
          return { q: T`In ${m} independent trials there were ${sN} successes. Find the maximum likelihood estimate of the success probability.`, answer: sN / m, tol: 0.001, x: T`\(\hat p = \frac{${sN}}{${m}} \approx ${R.fmt(sN / m, 4)}\).`, v: `Rational(${sN}, ${m})` }; }
        if (k === 3) { const xs = Array.from({ length: n }, () => R.int(1, 30));
          return { q: T`Observations ${xs.join(', ')} come from Uniform\((0, \theta)\). Find the maximum likelihood estimate of \(\theta\).`, answer: Math.max(...xs), x: T`The likelihood is \(\theta^{-${n}}\) for \(\theta \ge \max x_i\) and 0 below it, so it is largest at \(\hat\theta = ${Math.max(...xs)}\).`, v: `max([${xs.join(', ')}])` }; }
        const xs = Array.from({ length: n }, () => R.int(1, 12)), m = xs.reduce((a, b) => a + b, 0) / n, s2 = xs.reduce((a, b) => a + (b - m) ** 2, 0) / n;
        return { q: T`Data ${xs.join(', ')} are modeled as normal. Find the maximum likelihood estimate of \(\sigma^2\) (divide by \(n\)).`, answer: s2, tol: 0.001, x: T`\(\bar x = ${R.fmt(m, 4)}\); \(\hat\sigma^2 = \frac1{${n}}\sum(x_i - \bar x)^2 = ${R.fmt(s2, 4)}\).`, v: `(lambda d: sum((v - Rational(sum(d), len(d)))**2 for v in d)/len(d))([${xs.join(', ')}])` };
      } },
      { id: 'pmse', make(R) {
        const k = R.int(0, 2);
        if (k === 0) { const b = R.int(-4, 4), v = R.int(1, 20); return { q: T`An estimator has bias ${b} and variance ${v}. Find its mean squared error.`, answer: v + b * b, x: T`\(\operatorname{MSE} = \operatorname{Var} + \text{bias}^2 = ${v} + ${b * b}\).`, v: `${v} + (${b})**2` }; }
        if (k === 1) { const s2 = R.int(2, 20), n = R.int(5, 20); return { q: T`For normal data with \(\sigma^2 = ${s2}\) and \(n = ${n}\), what is the bias of \(\hat\sigma^2 = \frac1n\sum(X_i - \bar X)^2\)?`, answer: -s2 / n, tol: 0.001, x: T`\(E[\hat\sigma^2] = \frac{n-1}{n}\sigma^2\), so the bias is \(-\frac{\sigma^2}{n} = -\frac{${s2}}{${n}}\).`, v: `-Rational(${s2}, ${n})` }; }
        const xs = Array.from({ length: R.int(4, 6) }, () => R.int(1, 20)), m = xs.reduce((a, b) => a + b, 0) / xs.length;
        return { q: T`Data ${xs.join(', ')} come from Uniform\((0, \theta)\). Find the method of moments estimate of \(\theta\).`, answer: 2 * m, tol: 0.001, x: T`Mean \(\frac\theta2 = \bar x = ${R.fmt(m, 4)}\), so \(\hat\theta = ${R.fmt(2 * m, 4)}\).`, v: `2*Rational(${xs.join(' + ')}, ${xs.length})` };
      } }
    ],
    [U[4]]: [
      { id: 'psd', make(R) {
        const k = R.int(0, 3);
        if (k === 0) { const d = R.int(2, 30), v = R.int(0, 1); return { q: T`Find the ${v ? 'variance' : 'mean'} of a chi-square distribution with ${d} degrees of freedom.`, answer: v ? 2 * d : d, x: T`Mean \(k\), variance \(2k\).`, v: v ? `2*${d}` : `${d}` }; }
        if (k === 1) { const s2 = R.int(2, 16), n = R.int(5, 30); return { q: T`Normal data, \(\sigma^2 = ${s2}\), \(n = ${n}\). Find \(\operatorname{Var}(S^2)\).`, answer: 2 * s2 * s2 / (n - 1), tol: 0.001, x: T`\(\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}\) has variance \(2(n - 1)\), so \(\operatorname{Var}(S^2) = \frac{2\sigma^4}{n - 1} = \frac{${2 * s2 * s2}}{${n - 1}}\).`, v: `Rational(2*${s2}**2, ${n - 1})` }; }
        if (k === 2) { const df = R.int(2, 30), col = R.int(0, 2), area = [0.05, 0.025, 0.005][col];
          return { q: T`For a \(t\) distribution with ${df} degrees of freedom, find \(t^*\) with \(P(T > t^*) = ${area}\).`, answer: tcrit(df, col), tol: 0.002, hint: 'From the t table.', x: T`Row df = ${df}, column \(t_{${area}}\): ${tcrit(df, col)}.`, v: `tq(${df}, 1 - Rational(${Math.round(area * 1000)}, 1000))` }; }
        const n = R.int(5, 16), df = n - 1, s2 = R.int(2, 10), c = s2 * ccrit(df, 1) / df;
        return { q: T`A normal sample of ${n} has \(\sigma^2 = ${s2}\). Find \(P(S^2 > ${R.fmt(c, 3)})\).`, answer: 0.05, tol: 0.002, x: T`\(\frac{${df}S^2}{${s2}} \sim \chi^2_{${df}}\). The cutoff becomes \(\frac{${df}(${R.fmt(c, 3)})}{${s2}} = ${ccrit(df, 1)}\), the table's \(\chi^2_{0.05}\) for ${df} df: probability 0.05.`, v: `1 - c2cdf(${df}, Rational(${Math.round(c * 1e6)}, 1000000)*${df}/${s2})` };
      } }
    ],
    [U[5]]: [
      { id: 'pci-z', make(R) {
        const lvl = R.pick([90, 95, 99]), n = R.pick([16, 25, 36, 64, 100]), s = R.pick([4, 5, 8, 10, 12, 20]), xb = R.int(20, 200), m = ZC[lvl] * s / Math.sqrt(n), low = R.int(0, 1);
        return { q: T`Known \(\sigma = ${s}\), \(n = ${n}\), \(\bar x = ${xb}\). Find the ${low ? 'lower' : 'upper'} endpoint of the ${lvl}% confidence interval for \(\mu\).`, answer: low ? xb - m : xb + m, tol: 0.01, hint: 'Two decimals.',
          x: T`Margin \(${ZC[lvl]}\cdot\frac{${s}}{\sqrt{${n}}} = ${R.fmt(m, 4)}\). ${low ? 'Lower' : 'Upper'}: \(${xb} ${low ? '-' : '+'} ${R.fmt(m, 4)} = ${R.fmt(low ? xb - m : xb + m, 3)}\).`, v: `${xb} ${low ? '-' : '+'} zq(Rational(${100 + lvl}, 200))*${s}/sqrt(${n})` };
      } },
      { id: 'pci-t', make(R) {
        const n = R.pick([5, 9, 10, 16, 25, 26]), s = R.int(2, 12), lvl = R.pick([90, 95, 99]), col = { 90: 0, 95: 1, 99: 2 }[lvl], ts = tcrit(n - 1, col), m = ts * s / Math.sqrt(n);
        return { q: T`Normal data: \(n = ${n}\), \(s = ${s}\). Find the margin of error of the ${lvl}% confidence interval for \(\mu\).`, answer: m, tol: 0.01, hint: 'Two decimals, using the t table.',
          x: T`df ${n - 1}, \(t^* = ${ts}\). Margin \(${ts}\cdot\frac{${s}}{\sqrt{${n}}} \approx ${R.fmt(m, 4)}\).`, v: `tq(${n - 1}, Rational(${100 + lvl}, 200))*${s}/sqrt(${n})` };
      } },
      { id: 'pci-n', make(R) {
        const lvl = R.pick([90, 95, 99]), s = R.pick([5, 8, 10, 15, 20]), E = R.pick([1, 2, 2.5, 4, 5]), raw = (ZC[lvl] * s / E) ** 2, n = Math.ceil(raw - 1e-9);
        return { q: T`With \(\sigma = ${s}\), what is the smallest sample size giving a ${lvl}% margin of error of at most ${E}?`, answer: n, x: T`\(\left(\frac{${ZC[lvl]}\cdot${s}}{${E}}\right)^2 = ${R.fmt(raw, 3)}\); round up to ${n}.`, v: `ceiling((Rational(${Math.round(ZC[lvl] * 1000)}, 1000)*${s}/Rational(${E * 2}, 2))**2)` };
      } },
      { id: 'pci-p', make(R) {
        const n = R.pick([100, 200, 400, 500, 1000]), ph = R.pick([0.2, 0.3, 0.4, 0.5, 0.6]), lvl = R.pick([90, 95, 99]), m = ZC[lvl] * Math.sqrt(ph * (1 - ph) / n);
        return { q: T`A survey of ${n} finds \(\hat p = ${ph}\). Find the margin of error of the ${lvl}% confidence interval.`, answer: m, tol: 0.0006, hint: 'Three decimals.', x: T`\(${ZC[lvl]}\sqrt{\frac{${ph}(${R.fmt(1 - ph)})}{${n}}} \approx ${R.fmt(m, 4)}\).`, v: `zq(Rational(${100 + lvl}, 200))*sqrt(Rational(${pct(ph)}, 100)*(1 - Rational(${pct(ph)}, 100))/${n})` };
      } },
      { id: 'pci-var', make(R) {
        const n = R.int(5, 16), df = n - 1, s2 = R.int(2, 30), low = R.int(0, 1), v = low ? df * s2 / ccrit(df, 2) : df * s2 / ccrit(df, 0);
        return { q: T`Normal data: \(n = ${n}\), \(s^2 = ${s2}\). Find the ${low ? 'lower' : 'upper'} endpoint of the 95% confidence interval for \(\sigma^2\).`, answer: v, tol: Math.max(0.02, v * 0.001), hint: 'Two decimals, using the chi-square table.',
          x: T`\((n-1)s^2 = ${df * s2}\). df ${df}: \(\chi^2_{0.025} = ${ccrit(df, 2)}\), \(\chi^2_{0.975} = ${ccrit(df, 0)}\). ${low ? T`Lower \(= \frac{${df * s2}}{${ccrit(df, 2)}}\)` : T`Upper \(= \frac{${df * s2}}{${ccrit(df, 0)}}\)`} \(\approx ${R.fmt(v, 3)}\).`, v: `${df * s2}/c2q(${df}, Rational(${low ? 975 : 25}, 1000))` };
      } }
    ],
    [U[6]]: [
      { id: 'ptz', make(R) {
        const n = R.pick([16, 25, 36, 64, 100]), s = R.pick([4, 5, 10, 20]), se = s / Math.sqrt(n), z = R.pick([0.8, 1.2, 1.5, 1.8, 2.0, 2.3, 2.6, 3.0]) * R.pick([1, -1]), mu0 = R.int(20, 100), xb = +(mu0 + z * se).toFixed(3), ask = R.int(0, 1);
        if (ask === 0) return { q: T`\(H_0\colon \mu = ${mu0}\), known \(\sigma = ${s}\), \(n = ${n}\), \(\bar x = ${R.fmt(xb)}\). Find the \(z\) statistic.`, answer: z, tol: 0.001, x: T`\(z = \frac{${R.fmt(xb)} - ${mu0}}{${s}/\sqrt{${n}}} = ${z.toFixed(1)}\).`, v: `(Rational(${Math.round(xb * 1000)}, 1000) - ${mu0})/(${s}/sqrt(${n}))` };
        const p = 2 * (1 - Phi(Math.abs(z)));
        return { q: T`\(H_0\colon \mu = ${mu0}\) against \(\mu \ne ${mu0}\), known \(\sigma = ${s}\), \(n = ${n}\), \(\bar x = ${R.fmt(xb)}\). Find the p-value.`, answer: p, tol: 0.0012, hint: 'Use the table; four decimals.', x: T`\(z = ${z.toFixed(1)}\). Two-sided: \(2(1 - \Phi(${Math.abs(z).toFixed(1)})) = ${p.toFixed(4)}\).`, v: `2*(1 - ${Z(`Rational(${Math.round(Math.abs(z) * 10)}, 10)`)})` };
      } },
      { id: 'ptt', make(R) {
        const n = R.pick([5, 9, 10, 16, 25]), s = R.int(2, 10), mu0 = R.int(10, 60), t = R.pick([1.2, 1.8, 2.1, 2.5, 3.2, 4.0]), xb = +(mu0 + t * s / Math.sqrt(n)).toFixed(4), crit = tcrit(n - 1, 1), ask = R.int(0, 1);
        if (ask === 0) return { q: T`\(H_0\colon \mu = ${mu0}\). A normal sample has \(n = ${n}\), \(\bar x = ${R.fmt(xb, 4)}\), \(s = ${s}\). Find the \(t\) statistic.`, answer: t, tol: 0.01, x: T`\(t = \frac{${R.fmt(xb, 4)} - ${mu0}}{${s}/\sqrt{${n}}} \approx ${t}\).`, v: `(Rational(${Math.round(xb * 10000)}, 10000) - ${mu0})/(${s}/sqrt(${n}))` };
        const rej = t > crit, ans = rej ? 'Reject H0' : 'Do not reject H0';
        return { q: T`Two-sided test at \(\alpha = 0.05\) of \(H_0\colon \mu = ${mu0}\): \(n = ${n}\), \(t = ${t}\). Decision?`, c: [ans, rej ? 'Do not reject H0' : 'Reject H0', 'Accept H1 with certainty'], x: T`df ${n - 1}, critical value \(t_{0.025} = ${crit}\). \(${t} ${rej ? '>' : '<'} ${crit}\).`, key: ans, vk: `'Reject H0' if Rational(${Math.round(t * 10)}, 10) > tq(${n - 1}, Rational(975, 1000)) else 'Do not reject H0'` };
      } },
      { id: 'ppow', make(R) {
        const n = R.pick([16, 25, 36, 64, 100]), s = R.pick([5, 10, 20]), se = s / Math.sqrt(n), d = R.pick([1, 1.5, 2, 2.5, 3]), mu0 = R.int(20, 100), v = 1 - PhiX(1.645 - d);
        return { q: T`One-sided test of \(H_0\colon \mu = ${mu0}\) against \(\mu > ${mu0}\) at \(\alpha = 0.05\), known \(\sigma = ${s}\), \(n = ${n}\). Find the power if the true mean is ${R.fmt(mu0 + d * se, 3)}.`, answer: v, tol: 0.03, hint: 'Use the nearest table value; two decimals.',
          x: T`The true mean is \(\frac{${R.fmt(d * se, 3)}}{${R.fmt(se, 3)}} = ${d}\) standard errors above \(\mu_0\). Power \(= 1 - \Phi(1.645 - ${d}) = 1 - \Phi(${R.fmt(1.645 - d, 3)}) \approx ${R.fmt(v, 2)}\).`, v: `1 - ${Z(`(Rational(1645, 1000) - Rational(${d * 10}, 10))`)}` };
      } },
      { id: 'pt2', make(R) {
        const k = R.int(0, 1);
        if (k === 0) { const [s1, s2, n1, n2] = R.pick([[3, 4, 9, 16], [6, 8, 36, 64], [5, 12, 25, 144], [4, 3, 16, 9]]), se = Math.sqrt(s1 * s1 / n1 + s2 * s2 / n2), z = R.pick([1.0, 1.5, 2.0, 2.5]), d = z * se, m2 = R.int(10, 50);
          return { q: T`Two independent samples: \(n_1 = ${n1}\), \(\sigma_1 = ${s1}\), \(\bar x_1 = ${R.fmt(m2 + d, 3)}\); \(n_2 = ${n2}\), \(\sigma_2 = ${s2}\), \(\bar x_2 = ${m2}\). Find the \(z\) statistic for \(H_0\colon \mu_1 = \mu_2\).`, answer: z, tol: 0.01,
            x: T`\(SE = \sqrt{\frac{${s1 * s1}}{${n1}} + \frac{${s2 * s2}}{${n2}}} = ${R.fmt(se, 4)}\). \(z = \frac{${R.fmt(d, 3)}}{${R.fmt(se, 4)}} = ${z}\).`, v: `Rational(${Math.round(d * 1000)}, 1000)/sqrt(Rational(${s1 * s1}, ${n1}) + Rational(${s2 * s2}, ${n2}))` }; }
        const n = R.int(4, 6), ds = Array.from({ length: n }, () => R.int(-2, 6)), m = ds.reduce((a, b) => a + b, 0) / n, sd = Math.sqrt(ds.reduce((a, b) => a + (b - m) ** 2, 0) / (n - 1));
        if (sd === 0) return this.make(R);
        return { q: T`Paired differences (after minus before): ${ds.join(', ')}. Find the paired \(t\) statistic for \(H_0\colon \mu_d = 0\).`, answer: m / (sd / Math.sqrt(n)), tol: 0.01, hint: 'Two decimals.',
          x: T`\(\bar d = ${R.fmt(m, 4)}\), \(s_d = ${R.fmt(sd, 4)}\). \(t = \frac{\bar d}{s_d/\sqrt{${n}}} \approx ${R.fmt(m / (sd / Math.sqrt(n)), 3)}\), with ${n - 1} df.`, v: `(lambda d: (Rational(sum(d), len(d)))/(sqrt(sum((v - Rational(sum(d), len(d)))**2 for v in d)/(len(d) - 1))/sqrt(len(d))))([${ds.join(', ')}])` };
      } }
    ],
    [U[7]]: [
      { id: 'pchi-gof', make(R) {
        const N = R.pick([60, 120]), E = N / 6; let O; do { O = Array.from({ length: 5 }, () => E + R.int(-6, 6)); O.push(N - O.reduce((a, b) => a + b, 0)); } while (O[5] < 1);
        const chi = O.reduce((a, o) => a + (o - E) ** 2 / E, 0), ask = R.int(0, 1);
        if (ask === 0) return { q: T`A die rolled ${N} times shows counts ${O.join(', ')} for faces 1 to 6. Find the chi-square statistic for fairness.`, answer: chi, tol: 0.01, hint: 'Two decimals.', x: T`Each \(E = ${E}\). \(\chi^2 = \frac{${O.map(o => (o - E) ** 2).join(' + ')}}{${E}} \approx ${R.fmt(chi, 3)}\).`, v: `sum(Rational((o - ${E})**2, ${E}) for o in [${O.join(', ')}])` };
        const rej = chi > 11.07, ans = rej ? 'Reject fairness' : 'Do not reject fairness';
        return { q: T`A die rolled ${N} times shows counts ${O.join(', ')}. Test fairness at the 5% level.`, c: [ans, rej ? 'Do not reject fairness' : 'Reject fairness', 'The test needs at least 600 rolls'], x: T`\(\chi^2 \approx ${R.fmt(chi, 3)}\) with 5 df; cutoff 11.070. ${rej ? 'Larger: reject.' : 'Smaller: no evidence of bias.'}`, key: ans, vk: `'Reject fairness' if sum(Rational((o - ${E})**2, ${E}) for o in [${O.join(', ')}]) > c2q(5, Rational(95, 100)) else 'Do not reject fairness'` };
      } },
      { id: 'pchi-ind', make(R) {
        const a = R.int(10, 40), b = R.int(10, 40), c = R.int(10, 40), d = R.int(10, 40), n = a + b + c + d, ask = R.int(0, 1);
        const tbl = `<table class="tt"><tr><th></th><th>yes</th><th>no</th></tr><tr><th>group 1</th><td>${a}</td><td>${b}</td></tr><tr><th>group 2</th><td>${c}</td><td>${d}</td></tr></table>`;
        const E = [(a + b) * (a + c) / n, (a + b) * (b + d) / n, (c + d) * (a + c) / n, (c + d) * (b + d) / n], O = [a, b, c, d], chi = O.reduce((s, o, i) => s + (o - E[i]) ** 2 / E[i], 0);
        if (ask === 0) return { q: T`Observed counts:${tbl}Under independence, what is the expected count for group 1, yes?`, answer: E[0], tol: 0.01, x: T`\(\frac{\text{row}\times\text{column}}{\text{total}} = \frac{${a + b}\cdot${a + c}}{${n}} \approx ${R.fmt(E[0], 3)}\).`, v: `Rational(${(a + b) * (a + c)}, ${n})` };
        return { q: T`Observed counts:${tbl}Find the chi-square statistic for independence.`, answer: chi, tol: 0.01, hint: 'Two decimals.', x: T`Expected counts ${E.map(e => R.fmt(e, 2)).join(', ')}. \(\chi^2 = \sum\frac{(O - E)^2}{E} \approx ${R.fmt(chi, 3)}\), with 1 df.`, v: `(lambda O, n: sum((O[i] - Rational(r*c, n))**2/Rational(r*c, n) for i, (r, c) in enumerate([(O[0] + O[1], O[0] + O[2]), (O[0] + O[1], O[1] + O[3]), (O[2] + O[3], O[0] + O[2]), (O[2] + O[3], O[1] + O[3])])))([${a}, ${b}, ${c}, ${d}], ${n})` };
      } }
    ],
    [U[8]]: [
      { id: 'pbay-coin', make(R) {
        const pb = R.pick([0.7, 0.75, 0.8, 0.9]), prior = R.pick([0.1, 0.2, 0.5]), n = R.int(2, 5), h = R.int(Math.ceil(n / 2), n), lb = pb ** h * (1 - pb) ** (n - h), lf = 0.5 ** n, post = lb * prior / (lb * prior + lf * (1 - prior));
        return { q: T`A coin is either fair or biased to land heads with probability ${pb}; prior probability of biased ${prior}. In ${n} flips it shows ${h} heads. What is the posterior probability it is biased?`, answer: post, tol: 0.0006, hint: 'Three decimals.',
          x: T`Likelihoods: biased \(${pb}^{${h}}(${R.fmt(1 - pb)})^{${n - h}} = ${R.fmt(lb, 5)}\), fair \(0.5^{${n}} = ${R.fmt(lf, 5)}\). Posterior \(= \frac{${R.fmt(lb, 5)}(${prior})}{${R.fmt(lb, 5)}(${prior}) + ${R.fmt(lf, 5)}(${R.fmt(1 - prior)})} \approx ${R.fmt(post, 4)}\).`,
          v: `(Rational(${pct(pb)}, 100)**${h}*(1 - Rational(${pct(pb)}, 100))**${n - h}*Rational(${pct(prior)}, 100))/(Rational(${pct(pb)}, 100)**${h}*(1 - Rational(${pct(pb)}, 100))**${n - h}*Rational(${pct(prior)}, 100) + Rational(1, 2)**${n}*(1 - Rational(${pct(prior)}, 100)))` };
      } },
      { id: 'pbay-beta', make(R) {
        const a = R.int(1, 6), b = R.int(1, 6), n = R.int(5, 30), s = R.int(0, n), ask = R.int(0, 1);
        if (ask === 0) return { q: T`Prior Beta\((${a}, ${b})\) on a success probability. Data: ${s} successes in ${n} trials. Find the posterior mean.`, answer: (a + s) / (a + b + n), tol: 0.0006, hint: 'Three decimals.', x: T`Posterior Beta\((${a + s}, ${b + n - s})\). Mean \(\frac{${a + s}}{${a + b + n}} \approx ${R.fmt((a + s) / (a + b + n), 4)}\).`, v: `Rational(${a} + ${s}, ${a} + ${b} + ${n})` };
        return { q: T`Prior Beta\((${a}, ${b})\). Data: ${s} successes in ${n} trials. The posterior is Beta\((\alpha, \beta)\). Find \(\beta\).`, answer: b + n - s, x: T`Failures add to \(b\): \(${b} + ${n - s} = ${b + n - s}\).`, v: `${b} + ${n} - ${s}` };
      } }
    ]
  } });

})();
