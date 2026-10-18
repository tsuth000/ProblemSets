registerLearn('stats', [
  { title: 'Describing data', skill: 'Descriptive', body: T`
<p>Center: mean \(\bar x\) (sensitive to outliers) and median (robust). Spread: sample variance \(s^2 = \frac{1}{n-1}\sum(x_i-\bar x)^2\), standard deviation \(s\), and interquartile range \(IQR = Q_3 - Q_1\) (robust).</p>
<p>The \(n - 1\) makes \(s^2\) unbiased: deviations from \(\bar x\) are slightly smaller than deviations from the true \(\mu\). A z-score \(z = (x-\bar x)/s\) is unitless and comparable across variables.</p>`,
    ex: { q: T`Find the mean and sample SD of 2, 4, 4, 4, 5, 5, 7, 9.`, a: T`
<p>\(\bar x = 40/8 = 5\). Squared deviations: 9, 1, 1, 1, 0, 0, 4, 16, summing to 32. \(s = \sqrt{32/7} \approx 2.14\). (The population SD, dividing by 8, is exactly 2.)</p>` },
    trap: T`Reporting the mean for heavily skewed data such as incomes. The median describes a typical value better.` },

  { title: 'Probability rules and Bayes', body: T`
<p>Complement: \(P(A^c) = 1 - P(A)\). Union: \(P(A\cup B) = P(A) + P(B) - P(A\cap B)\). Conditional: \(P(A\mid B) = \frac{P(A\cap B)}{P(B)}\). Independence: \(P(A\cap B) = P(A)P(B)\).</p>
\[P(A\mid B) = \frac{P(B\mid A)P(A)}{P(B)}\]<p>with the denominator from the law of total probability:</p>\[\begin{aligned}P(B) &= P(B\mid A)P(A)\\ &\quad + P(B\mid A^c)P(A^c)\end{aligned}\]`,
    ex: { q: T`A disease affects 1% of people. A test catches 99% of cases and has a 5% false positive rate. If you test positive, what is \(P(\text{disease})\)?`, a: T`
\[\frac{0.99(0.01)}{0.99(0.01) + 0.05(0.99)} = \frac{0.0099}{0.0594} \approx 0.167\]
<p>Only about 1 in 6: most positives come from the large healthy group.</p>` },
    trap: T`Confusing \(P(A\mid B)\) with \(P(B\mid A)\), or ignoring the base rate.` },

  { title: 'Random variables', skill: 'Sampling', body: T`
<p>\(E[aX+b] = aE[X]+b\) and \(\operatorname{Var}(aX+b) = a^2\operatorname{Var}(X)\). Expectations always add; variances add only for independent (or uncorrelated) variables: \(\operatorname{Var}(X\pm Y) = \operatorname{Var}X + \operatorname{Var}Y\).</p>
<table class="tt"><tr><th>Distribution</th><th>Mean</th><th>Variance</th><th>Use</th></tr>
<tr><td>\(\text{Bin}(n,p)\)</td><td>\(np\)</td><td>\(np(1-p)\)</td><td>successes in \(n\) trials</td></tr>
<tr><td>\(\text{Pois}(\lambda)\)</td><td>\(\lambda\)</td><td>\(\lambda\)</td><td>event counts</td></tr>
<tr><td>\(N(\mu,\sigma^2)\)</td><td>\(\mu\)</td><td>\(\sigma^2\)</td><td>continuous, symmetric</td></tr>
<tr><td>\(\text{Exp}(\lambda)\)</td><td>\(1/\lambda\)</td><td>\(1/\lambda^2\)</td><td>waiting times</td></tr></table>`,
    ex: { q: T`\(X\sim\text{Bin}(20, 0.3)\). Find its mean and SD.`, a: T`
<p>\(\mu = 20(0.3) = 6\). \(\sigma^2 = 20(0.3)(0.7) = 4.2\), so \(\sigma\approx 2.05\).</p>` },
    trap: T`Writing \(\operatorname{Var}(X - Y) = \operatorname{Var}X - \operatorname{Var}Y\). Variances of independent variables add even when you subtract.` },

  { title: 'Sampling distributions and the CLT', skill: 'Sampling', body: T`
<p>\(\bar X\) has mean \(\mu\) and standard error \(\sigma/\sqrt n\). By the central limit theorem, \(\bar X\) is approximately normal for large \(n\) whatever the population shape. For a proportion, \(\hat p\) has SE \(\sqrt{p(1-p)/n}\).</p>
<p>Quadrupling \(n\) halves the standard error.</p>`,
    ex: { q: T`Population mean 50, SD 12, \(n = 36\). Find \(P(\bar X > 53)\).`, a: T`
<p>\(SE = 12/6 = 2\). \(z = (53-50)/2 = 1.5\). \(P(Z > 1.5)\approx 0.067\).</p>` },
    trap: T`Using \(\sigma\) instead of \(\sigma/\sqrt n\) for a probability about a sample mean.` },

  { title: 'Confidence intervals', skill: 'Inference', body: T`
\[\text{estimate} \pm \text{critical value}\times SE\]
<p>For a mean with unknown \(\sigma\): \(\bar x \pm t^*_{n-1}\,s/\sqrt n\). For a proportion: \(\hat p \pm z^*\sqrt{\hat p(1-\hat p)/n}\). Common \(z^*\): 1.645 (90%), 1.96 (95%), 2.576 (99%).</p>
<p>Higher confidence widens the interval; larger \(n\) narrows it.</p>`,
    ex: { q: T`\(n = 25\), \(\bar x = 80\), \(s = 10\). Build a 95% interval.`, a: T`
<p>\(SE = 2\), \(t^*_{24} = 2.064\). \(80 \pm 4.13\), or \((75.87,\ 84.13)\).</p>` },
    trap: T`Saying "there is a 95% chance \(\mu\) is in this interval." The 95% describes the method's long-run hit rate.` },

  { title: 'Hypothesis testing', skill: 'Inference', body: T`
<p>State \(H_0\) and \(H_1\); choose \(\alpha\); compute a test statistic, typically \(\frac{\text{estimate} - \text{null value}}{SE}\); find the p-value; reject \(H_0\) if \(p \le \alpha\).</p>
<table class="tt"><tr><th></th><th>\(H_0\) true</th><th>\(H_0\) false</th></tr>
<tr><td>Reject</td><td>Type I error (\(\alpha\))</td><td>correct (power)</td></tr>
<tr><td>Fail to reject</td><td>correct</td><td>Type II error (\(\beta\))</td></tr></table>
<p>Power grows with sample size, effect size, and \(\alpha\).</p>`,
    ex: { q: T`With \(n = 25\), \(\bar x = 80\), \(s = 10\), test \(H_0\colon \mu = 75\) against \(\mu \ne 75\).`, a: T`
<p>\(t = (80 - 75)/2 = 2.5\) with 24 df. Two-sided \(p \approx 0.02 < 0.05\): reject \(H_0\).</p>` },
    trap: T`"Accepting" \(H_0\). Failing to reject means the data are compatible with \(H_0\), not that it is true.` },

  { title: 'Simple linear regression', skill: 'Regression', body: T`
\[\hat y = b_0 + b_1x, \qquad b_1 = r\frac{s_y}{s_x}, \qquad b_0 = \bar y - b_1\bar x\]
<p>Least squares minimizes \(\sum(y_i - \hat y_i)^2\). The line passes through \((\bar x, \bar y)\). \(R^2 = r^2\) is the share of variance in \(y\) explained. A residual is \(e_i = y_i - \hat y_i\).</p>`,
    ex: { q: T`\(\bar x = 10\), \(\bar y = 50\), \(s_x = 2\), \(s_y = 8\), \(r = 0.75\). Find the line and predict at \(x = 12\).`, a: T`
<p>\(b_1 = 0.75(8/2) = 3\), \(b_0 = 50 - 30 = 20\). \(\hat y(12) = 56\). \(R^2 = 0.5625\).</p>` },
    trap: T`Extrapolating far outside the observed \(x\) range, or reading the slope as a causal effect in observational data.` },

  { title: 'Inference for regression', skill: 'Regression', body: T`
<p>Test \(H_0\colon\beta_1 = 0\) with \(t = b_1/SE(b_1)\) on \(n - 2\) df (simple) or \(n - p - 1\) (multiple). Interval: \(b_1 \pm t^*SE(b_1)\).</p>
<p>A confidence interval for the mean response at \(x_0\) is narrower than a prediction interval for a single new observation, which adds the residual variance.</p>`,
    ex: { q: T`\(b_1 = 3\), \(SE = 0.8\), \(n = 30\). Test and build a 95% interval.`, a: T`
<p>\(t = 3.75\) on 28 df, \(p < 0.001\). With \(t^* = 2.048\): \(3 \pm 1.64\), or \((1.36, 4.64)\).</p>` },
    trap: T`Using a confidence interval when asked to predict one new case. That understates uncertainty.` },

  { title: 'Multiple regression', skill: 'Regression', body: T`
<p>\(y = \beta_0 + \beta_1x_1 + \cdots + \beta_px_p + \varepsilon\). Each \(\beta_j\) is the expected change in \(y\) per unit \(x_j\) holding the others fixed.</p>
<p>A \(k\)-level category needs \(k - 1\) dummies; each coefficient compares to the baseline level. An interaction \(x_1x_2\) makes the slope of \(x_1\) equal \(\beta_1 + \beta_3x_2\). The overall F-test checks whether any predictor matters. Adjusted \(R^2\) penalizes extra predictors.</p>`,
    ex: { q: T`Interpret \(\widehat{\text{price}} = 50 + 120\,\text{sqft} + 15\,\text{garage}\) (price in $1000s, sqft in thousands, garage = 1 if present).`, a: T`
<p>Holding garage status fixed, each extra 1,000 sq ft adds about $120k. Holding size fixed, a garage adds about $15k.</p>` },
    trap: T`Comparing raw coefficient sizes across predictors with different units to decide which matters most.` },

  { title: 'Diagnostics', skill: 'Diagnostics', body: T`
<p>Plot residuals against fitted values. Curvature: missing nonlinearity. Funnel: heteroscedasticity (try \(\log y\), weighted least squares, or robust SEs). Patterns in time order: autocorrelation. Normal Q–Q plot: tail behavior.</p>
<p>Leverage flags unusual \(x\) values; Cook's distance flags points that move the fit. \(\text{VIF}_j = 1/(1 - R_j^2)\) flags multicollinearity; values above 5 to 10 deserve attention.</p>`,
    ex: { q: T`Regressing \(x_3\) on the other predictors gives \(R^2 = 0.9\). Find its VIF.`, a: T`
<p>\(\text{VIF} = 1/(1 - 0.9) = 10\). The variance of \(\hat\beta_3\) is 10 times what it would be with uncorrelated predictors.</p>` },
    trap: T`Deleting outliers just because they are inconvenient. Investigate first; they may be errors or the most informative points.` },

  { title: 'Logistic regression', skill: 'GLMs', body: T`
\[\log\frac{p}{1-p} = \beta_0 + \beta_1x\]<p>Equivalently,</p>\[p = \frac{1}{1+e^{-(\beta_0+\beta_1x)}}\]
<p>\(e^{\beta_1}\) is the odds ratio for a one-unit increase in \(x\). The effect on probability is largest near \(p = 0.5\). Fit by maximum likelihood; assess with deviance, AIC, and classification metrics.</p>`,
    ex: { q: T`\(\hat\beta_0 = -4\), \(\hat\beta_1 = 0.05\) with \(x\) = age. Find \(p\) at 60 and the odds ratio for 10 years.`, a: T`
<p>\(\eta = -4 + 3 = -1\), \(p = 1/(1+e) \approx 0.269\). Odds ratio per 10 years: \(e^{0.5}\approx 1.65\).</p>` },
    trap: T`Reading \(\beta_1\) as a change in probability. It is a change in log-odds.` },

  { title: 'The GLM family', skill: 'GLMs', body: T`
<table class="tt"><tr><th>Response</th><th>Distribution</th><th>Link</th></tr>
<tr><td>continuous</td><td>normal</td><td>identity</td></tr>
<tr><td>binary</td><td>Bernoulli</td><td>logit</td></tr>
<tr><td>counts</td><td>Poisson</td><td>log</td></tr>
<tr><td>positive, skewed</td><td>gamma</td><td>log</td></tr></table>
<p>With a log link, \(e^{\beta}\) is a rate ratio. Use an offset \(\log(\text{exposure})\) for rates per unit time or population. If count variance exceeds the mean (overdispersion), use negative binomial or quasi-Poisson.</p>`,
    ex: { q: T`A Poisson model has \(\log\mu = 0.5 + 0.2x\). What does a one-unit increase in \(x\) do?`, a: T`
<p>Multiplies the expected count by \(e^{0.2}\approx1.22\), a 22% increase.</p>` },
    trap: T`Ignoring overdispersion. Standard errors come out too small and p-values too optimistic.` },

  { title: 'Model selection and regularization', skill: 'Model selection', body: T`
<p>Test error = bias² + variance + irreducible noise. Choose complexity by k-fold cross-validation or information criteria:</p>
\[\text{AIC} = 2k - 2\ln\hat L \qquad \text{BIC} = k\ln n - 2\ln\hat L\]
<p>Lower is better; BIC penalizes parameters more once \(n \ge 8\). Ridge adds \(\lambda\sum\beta_j^2\) and shrinks; lasso adds \(\lambda\sum|\beta_j|\) and can zero coefficients out. Standardize predictors before penalizing.</p>`,
    ex: { q: T`Model A: AIC 210.4 with 5 parameters. Model B: AIC 208.9 with 8. With \(n = 100\), which does BIC prefer?`, a: T`
<p>\(\text{BIC} = \text{AIC} + k(\ln n - 2)\). A: \(210.4 + 5(2.605) = 223.4\). B: \(208.9 + 8(2.605) = 229.7\). AIC slightly prefers B; BIC prefers A.</p>` },
    trap: T`Selecting variables and estimating test error on the same data. The error estimate will be optimistic.` }
]);
