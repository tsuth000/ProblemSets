registerSubject({
  id: 'stats', name: 'Statistical modeling', color: '#8E3B63',
  blurb: 'Inference, regression, GLMs, diagnostics, model selection',
  questions: [
    { id: 's1', skill: 'Inference', q: T`Which is the correct interpretation of a 95% confidence interval?`,
      c: ['If sampling were repeated many times, about 95% of intervals built this way would contain the true parameter', 'There is a 95% probability the true parameter lies in this specific interval', '95% of the data fall within the interval', 'The sample statistic is 95% likely to equal the parameter'],
      x: T`In frequentist inference the parameter is fixed. The 95% describes the long-run behavior of the procedure, not one computed interval.` },
    { id: 's2', skill: 'Inference', q: T`A p-value is:`,
      c: [T`the probability, assuming \(H_0\) is true, of data at least as extreme as observed`, T`the probability that \(H_0\) is true`, T`the probability that \(H_1\) is true`, 'the probability of a Type II error'],
      x: T`It is computed under \(H_0\). A small p-value means the data would be unusual if \(H_0\) held.` },
    { id: 's3', skill: 'Inference', q: T`A Type I error is:`,
      c: [T`rejecting \(H_0\) when it is true`, T`failing to reject \(H_0\) when it is false`, T`accepting \(H_1\) when it is true`, 'using the wrong test statistic'],
      x: T`Its probability is the significance level \(\alpha\). The second option is a Type II error.` },
    { id: 's4', skill: 'Inference', q: T`Holding everything else fixed, increasing the sample size makes a confidence interval:`,
      c: ['narrower', 'wider', 'unchanged', 'shifted toward zero'],
      x: T`The width scales with \(SE = s/\sqrt n\). Quadrupling \(n\) halves the width.` },
    { id: 's5', skill: 'Sampling', q: T`The central limit theorem says that for large \(n\):`,
      c: ['the sampling distribution of the sample mean is approximately normal', 'the population becomes normal', 'the sample itself looks normal', 'the sample mean equals the population mean'],
      x: T`It concerns the distribution of \(\bar X\) across samples, with variance \(\sigma^2/n\), regardless of the population's shape (given finite variance).` },
    { id: 's6', skill: 'Regression', q: T`In multiple regression, the coefficient \(\beta_1\) on \(x_1\) is:`,
      c: [T`the expected change in \(y\) per unit increase in \(x_1\), holding other predictors fixed`, T`the correlation between \(x_1\) and \(y\)`, T`the expected change in \(y\) per unit \(x_1\), ignoring other predictors`, T`the share of variance in \(y\) explained by \(x_1\)`],
      x: T`"Holding fixed" is what separates partial effects from the marginal slope in a simple regression.` },
    { id: 's7', skill: 'Regression', q: T`A categorical variable with 4 levels enters a model that has an intercept. How many dummy variables are needed?`,
      c: ['3', '4', '1', '2'],
      x: T`Using all 4 creates perfect collinearity with the intercept (the dummy variable trap). The omitted level is the baseline.` },
    { id: 's8', skill: 'Regression', q: T`Adding a predictor to an OLS model will:`,
      c: [T`never decrease \(R^2\)`, T`always increase adjusted \(R^2\)`, T`always decrease \(R^2\)`, 'always improve test error'],
      x: T`OLS can set the new coefficient to 0, so fit cannot worsen in-sample. Adjusted \(R^2\) penalizes the extra parameter and can fall.` },
    { id: 's9', skill: 'Regression', q: T`In \(\log y = \beta_0 + 0.05x\), a one-unit increase in \(x\) is associated with:`,
      c: [T`about a 5% increase in \(y\)`, T`a 0.05-unit increase in \(y\)`, T`a 5-unit increase in \(y\)`, T`a 0.05% increase in \(y\)`],
      x: T`\(y\) is multiplied by \(e^{0.05} \approx 1.051\).` },
    { id: 's10', skill: 'Regression', q: T`An interaction term \(x_1 x_2\) in a regression means:`,
      c: [T`the effect of \(x_1\) on \(y\) depends on the value of \(x_2\)`, T`\(x_1\) and \(x_2\) are correlated`, T`\(x_1\) causes \(x_2\)`, 'the model is nonlinear in its parameters'],
      x: T`\(\partial y / \partial x_1 = \beta_1 + \beta_3 x_2\). The model is still linear in the \(\beta\)s.` },
    { id: 's11', skill: 'Diagnostics', q: T`A residuals-vs-fitted plot shows a funnel that widens to the right. This indicates:`,
      c: ['heteroscedasticity', 'multicollinearity', 'autocorrelation', 'a good fit'],
      x: T`Error variance grows with the fitted value. Remedies include transforming \(y\), weighted least squares, or robust standard errors.` },
    { id: 's12', skill: 'Diagnostics', q: T`High variance inflation factors (VIF) indicate:`,
      c: ['multicollinearity among predictors', 'heteroscedastic errors', 'non-normal residuals', 'influential outliers'],
      x: T`\(\text{VIF}_j = 1/(1-R_j^2)\), where \(R_j^2\) comes from regressing \(x_j\) on the other predictors.` },
    { id: 's13', skill: 'Diagnostics', q: T`Residuals from a model of monthly sales show strong autocorrelation. Which assumption is violated?`,
      c: ['independence of errors', 'normality of predictors', 'linearity of the link', 'equal sample sizes'],
      x: T`Time-ordered data often carry correlated errors, which makes OLS standard errors too small. Consider ARIMA errors or HAC standard errors.` },
    { id: 's14', skill: 'GLMs', q: T`In logistic regression, \(\hat\beta_1 = 0.7\). A one-unit increase in \(x\):`,
      c: [T`multiplies the odds by \(e^{0.7} \approx 2.01\)`, 'raises the probability by 0.7', 'raises the probability by 70%', 'multiplies the probability by 2.01'],
      x: T`The model is linear in log-odds, so the effect is multiplicative on the odds. The change in probability depends on where you start.` },
    { id: 's15', skill: 'GLMs', q: T`Which model fits a response that counts events per unit time?`,
      c: ['Poisson regression with a log link', 'logistic regression', 'OLS on the raw counts with no transformation', 'linear discriminant analysis'],
      x: T`Counts are nonnegative integers with variance tied to the mean. Check for overdispersion; negative binomial handles it.` },
    { id: 's16', skill: 'GLMs', q: T`Maximum likelihood estimation chooses parameters that:`,
      c: ['make the observed data most probable under the model', 'minimize the number of parameters', 'make the residuals exactly normal', 'maximize the p-value'],
      x: T`For linear regression with normal errors, MLE of the coefficients coincides with OLS.` },
    { id: 's17', skill: 'Model selection', q: T`Overfitting typically shows up as:`,
      c: ['low training error and high test error', 'high training error and low test error', 'high error on both', 'low error on both'],
      x: T`The model has fit noise specific to the training sample, which does not generalize.` },
    { id: 's18', skill: 'Model selection', q: T`As model complexity increases, typically:`,
      c: ['bias decreases and variance increases', 'bias increases and variance decreases', 'both decrease', 'both increase'],
      x: T`Flexible models track the true function better on average but swing more from sample to sample.` },
    { id: 's19', skill: 'Model selection', q: T`Which regularization can shrink coefficients exactly to zero?`,
      c: ['Lasso (L1)', 'Ridge (L2)', 'OLS', 'Weighted least squares'],
      x: T`The L1 penalty's corners at zero make exact zeros optimal, so lasso performs variable selection. Ridge shrinks toward zero without reaching it.` },
    { id: 's20', skill: 'Model selection', q: T`When comparing models on the same data by AIC:`,
      c: ['lower AIC is preferred', 'higher AIC is preferred', 'AIC must be below 0.05', 'AIC ignores the number of parameters'],
      x: T`\(\text{AIC} = 2k - 2\ln\hat L\) rewards fit and penalizes parameters.` },
    { id: 's21', skill: 'Model selection', q: T`The main purpose of k-fold cross-validation is to:`,
      c: ['estimate out-of-sample prediction error', 'increase the training sample size', 'remove outliers', 'test for normality'],
      x: T`Each fold is held out once while the model trains on the rest; the held-out errors are averaged.` },
    { id: 's22', skill: 'Descriptive', q: T`A correlation of \(r = -0.9\) indicates:`,
      c: ['a strong negative linear relationship', 'a weak relationship', 'that 90% of y is caused by x', 'no linear relationship'],
      x: T`\(|r|\) near 1 means points lie near a line; the sign gives direction. \(r^2 = 0.81\) is the variance explained, not causation.` }
  ],
  generators: [
    { id: 'sg-sd', skill: 'Descriptive', make(R) {
      const xs = Array.from({ length: 5 }, () => R.int(1, 20)), n = 5, m = xs.reduce((a, b) => a + b) / n;
      const ss = xs.reduce((a, x) => a + (x - m) ** 2, 0), sd = Math.sqrt(ss / (n - 1));
      return { q: T`Find the sample standard deviation of \(${xs.join(',\\ ')}\).`, answer: sd, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(\bar x = ${R.fmt(m)}\). \(\sum (x_i - \bar x)^2 = ${R.fmt(ss)}\). \(s = \sqrt{${R.fmt(ss)}/4} = ${R.fmt(sd, 2)}\).` };
    } },
    { id: 'sg-z', skill: 'Descriptive', make(R) {
      const mu = R.int(40, 120), sd = R.int(4, 20), x = mu + R.nz(-3 * sd, 3 * sd), z = (x - mu) / sd;
      return { q: T`Scores have mean ${mu} and standard deviation ${sd}. What is the z-score of a score of ${x}?`, answer: z, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(z = \frac{${x} - ${mu}}{${sd}} = ${R.fmt(z, 2)}\).` };
    } },
    { id: 'sg-ols', skill: 'Regression', make(R) {
      const r = R.pick([-0.8, -0.6, -0.5, -0.3, 0.3, 0.4, 0.6, 0.7, 0.9]), sx = R.int(2, 10), sy = R.int(3, 25), xb = R.int(5, 50), yb = R.int(20, 200);
      const b1 = r * sy / sx, b0 = yb - b1 * xb, askSlope = R.int(0, 1) === 0;
      return { q: T`For a sample, \(\bar x = ${xb}\), \(\bar y = ${yb}\), \(s_x = ${sx}\), \(s_y = ${sy}\), and \(r = ${r}\). Find the least-squares ${askSlope ? 'slope \\(b_1\\)' : 'intercept \\(b_0\\)'}.`,
        answer: askSlope ? b1 : b0, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(b_1 = r\,s_y/s_x = ${r}\cdot ${sy}/${sx} = ${R.fmt(b1, 3)}\).${askSlope ? '' : T` \(b_0 = \bar y - b_1\bar x = ${yb} - (${R.fmt(b1, 3)})(${xb}) = ${R.fmt(b0, 2)}\).`}` };
    } },
    { id: 'sg-binom', skill: 'Sampling', make(R) {
      const n = R.int(5, 10), k = R.int(0, n), p = R.pick([0.2, 0.3, 0.4, 0.5, 0.6]), v = R.binom(n, k) * p ** k * (1 - p) ** (n - k);
      return { q: T`\(X \sim \text{Binomial}(n = ${n},\ p = ${p})\). Find \(P(X = ${k})\).`, answer: v, tol: 0.0006, hint: 'Round to 4 decimals.',
        x: T`\(\binom{${n}}{${k}}(${p})^{${k}}(${R.fmt(1 - p)})^{${n - k}} = ${R.binom(n, k)} \cdot ${R.fmt(p ** k, 6)} \cdot ${R.fmt((1 - p) ** (n - k), 6)} = ${R.fmt(v, 4)}\).` };
    } },
    { id: 'sg-ci', skill: 'Inference', make(R) {
      const n = R.pick([36, 49, 64, 100, 144]), s = R.int(5, 30), xb = R.int(50, 150), se = s / Math.sqrt(n), up = xb + 1.96 * se;
      return { q: T`A sample of \(n = ${n}\) has \(\bar x = ${xb}\) and \(s = ${s}\). Using \(z = 1.96\), find the upper bound of the 95% confidence interval for \(\mu\).`, answer: up, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(SE = ${s}/\sqrt{${n}} = ${R.fmt(se, 4)}\). Upper bound \(= ${xb} + 1.96(${R.fmt(se, 4)}) = ${R.fmt(up, 2)}\).` };
    } },
    { id: 'sg-logit', skill: 'GLMs', make(R) {
      const b0 = R.pick([-3, -2.5, -2, -1.5, -1, 0.5]), b1 = R.pick([0.2, 0.3, 0.4, 0.5, 0.8, 1.2]), x = R.int(1, 8), eta = b0 + b1 * x, p = 1 / (1 + Math.exp(-eta));
      return { q: T`A logistic model has \(\hat\beta_0 = ${b0}\) and \(\hat\beta_1 = ${b1}\). Find the predicted probability at \(x = ${x}\).`, answer: p, tol: 0.003, hint: 'Round to 3 decimals.',
        x: T`Linear predictor: \(${b0} + ${b1}(${x}) = ${R.fmt(eta, 2)}\). \(p = \frac{1}{1 + e^{${R.fmt(-eta, 2)}}} = ${R.fmt(p, 3)}\).` };
    } }
  ]
});
