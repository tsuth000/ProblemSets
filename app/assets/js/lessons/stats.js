registerLessons('stats', {
  'Describing data': {
    hook: T`
<p>Before modeling, look. A histogram shows the shape; a box plot summarizes the middle half and flags outliers.</p>
${fig('histBox', {}, 'A right-skewed sample: the long tail drags the mean above the median.')}
<p>The mean uses every value, so one extreme value can drag it far. The median only cares about order, so it resists outliers. Standard deviation measures the typical distance from the mean.</p>`,
    vary: [
      [T`Find the mean of 2, 4, 6.`, 4, T`Sum 12 over 3.`],
      [T`Find the median of 2, 4, 6, 100.`, 5, T`Middle two values averaged. The outlier barely matters.`],
      [T`Find the mean of 2, 4, 6, 100.`, 28, T`The same outlier pulls the mean from 4 to 28.`],
      [T`Find the range of 2, 4, 6, 100.`, 98, T`Max minus min: very sensitive to outliers.`],
      [T`Find the population standard deviation of 2, 4, 4, 4, 5, 5, 7, 9.`, 2, T`Mean 5; squared deviations sum to 32; \(\sqrt{32/8}\).`]
    ]
  },
  'Probability rules and Bayes': {
    hook: T`
<p>A disease affects 1% of people. A test catches 90% of cases but also flags 10% of healthy people. You test positive. How worried should you be?</p>
<p>Counting people instead of juggling percentages makes it clear. Out of 1000 people:</p>
${fig('bayesTree', {}, 'Natural frequencies: 108 positives, only 9 of them sick.')}
<p>Of the 108 positives, only 9 are sick: about 8%. When a condition is rare, most positives come from the large healthy group. That is Bayes' theorem in action.</p>`,
    vary: [
      [T`In the tree, what is \(P(\text{test } +)\)?`, 0.108, T`\(\frac{9 + 99}{1000}\).`],
      [T`What is \(P(\text{sick} \mid +)\)?`, 9 / 108, T`Restrict to the 108 positives.`],
      [T`Find \(P(\text{two heads in two fair flips})\).`, 0.25, T`Independent: multiply.`],
      [T`Find \(P(\text{at least one head in three flips})\).`, 0.875, T`One minus \(P(\text{no heads}) = \frac18\).`],
      [T`\(P(A) = 0.5\), \(P(B) = 0.4\), \(P(A\cap B) = 0.2\). Find \(P(A\cup B)\).`, 0.7, T`Add, then subtract the overlap.`]
    ]
  },
  'Random variables': {
    hook: T`
<p>A random variable attaches a number to each outcome: the total on two dice, the height of a random person. Its expected value is the long-run average; its variance measures spread.</p>
<p>Many quantities follow a bell-shaped normal distribution. Standardizing, \(z = \frac{x - \mu}{\sigma}\), turns any normal into the standard one, where the areas below are probabilities.</p>
${fig('normal', {}, 'Area under the curve between −z and z.')}`,
    vary: [
      [T`Find \(E(X)\) for one roll of a fair die.`, 3.5, T`\(\frac{1 + 2 + \cdots + 6}{6}\).`],
      [T`If \(E(X) = 3.5\), find \(E(2X + 1)\).`, 8, T`Expectation is linear.`],
      [T`If \(\operatorname{Var}(X) = 3\), find \(\operatorname{Var}(2X)\).`, 12, T`Variance scales by the square: \(2^2\cdot3\).`],
      [T`Find \(P(-1 < Z < 1)\) to two decimals.`, 0.68, T`The first part of the 68-95-99.7 rule.`],
      [T`Find \(P(Z > 1.96)\) to three decimals.`, 0.025, T`Each tail outside \(\pm1.96\) holds 2.5%.`]
    ]
  },
  'Sampling distributions and the CLT': {
    hook: T`
<p>Draw a sample and compute its mean. Draw another and the mean changes. The sample mean is itself a random variable, and the central limit theorem describes it: for large samples it is approximately normal, centered at the true mean, with spread \(\sigma/\sqrt n\).</p>
${fig('clt', {}, 'Start from a skewed distribution and increase n.')}
<p>Note the square root: to halve the uncertainty, you need four times as much data.</p>`,
    vary: [
      [T`\(\sigma = 10\) and \(n = 25\). Find the standard error \(\sigma/\sqrt n\).`, 2, T`\(10/5\).`],
      [T`Same \(\sigma\), \(n = 100\).`, 1, T`Four times the data halves the standard error.`],
      [T`What \(n\) gives a standard error of 0.5 when \(\sigma = 10\)?`, 400, T`\(\sqrt n = 20\).`],
      [T`The population mean is 50. What is the mean of the sample mean?`, 50, T`The sample mean is unbiased.`]
    ]
  },
  'Confidence intervals': {
    hook: T`
<p>A 95% confidence interval comes from a method that captures the true value 95% of the time. Any single interval either contains it or does not; the 95% describes the method's track record.</p>
${fig('ciCoverage', {}, 'Twenty intervals from twenty samples. Red ones miss the true mean.')}
<p>The interval is estimate \(\pm\) (critical value)(standard error), with critical value 1.96 for 95%.</p>`,
    vary: [
      [T`\(\bar x = 50\), \(SE = 2\). Find the upper end of the 95% interval.`, 53.92, T`\(50 + 1.96\cdot2\).`],
      [T`Find the lower end.`, 46.08, T`\(50 - 3.92\).`],
      [T`Find the width of that interval.`, 7.84, T`Twice the margin.`],
      [T`If \(n\) is multiplied by 4, the width is multiplied by:`, 0.5, T`\(SE\) shrinks by \(\sqrt4\).`],
      [T`Find the width of a 99% interval (\(z^* = 2.576\)) with \(SE = 2\).`, 10.304, T`More confidence costs a wider interval.`]
    ]
  },
  'Hypothesis testing': {
    hook: T`
<p>A test starts by assuming nothing interesting is happening: the null hypothesis. Then it asks how surprising the data would be under that assumption. The p-value is the probability of a result at least this extreme if the null were true.</p>
${fig('pvalue', {}, 'The shaded tails are the p-value for a two-sided test.')}
<p>A small p-value means the data and the null hypothesis fit poorly. It is not the probability that the null is true.</p>`,
    vary: [
      [T`Find the two-sided p-value for \(z = 1.96\).`, 0.05, T`Two tails of 2.5%.`],
      [T`With \(z = 2.58\), reject at the 1% level (two-sided)?`, ['Yes', 'No'], T`2.58 is the 1% cutoff, and 2.58 just reaches it.`],
      [T`\(p = 0.03\) and \(\alpha = 0.05\). Decision?`, ['reject the null', 'fail to reject', 'accept the null as proven'], T`\(p < \alpha\).`],
      [T`With \(\alpha = 0.05\), what is the Type I error rate when the null is true?`, 0.05, T`\(\alpha\) is exactly that rate.`]
    ]
  },
  'Simple linear regression': {
    hook: T`
<p>Regression draws the line that best predicts \(y\) from \(x\), in the least-squares sense. The slope says how much \(\hat y\) changes per unit of \(x\); the residuals are what the line misses.</p>
${fig('leastSquares', {}, 'Residuals are the vertical gaps.')}
<p>\(R^2\) is the fraction of the variation in \(y\) the line explains. With one predictor, \(R^2 = r^2\).</p>`,
    vary: [
      [T`\(\hat y = 2 + 3x\). Predict \(y\) at \(x = 4\).`, 14, T`Substitute.`],
      [T`Same line: when \(x\) rises by 1, \(\hat y\) rises by:`, 3, T`The slope.`],
      [T`The observed point is \((4, 15)\). Find its residual.`, 1, T`Observed minus predicted: \(15 - 14\).`],
      [T`\(r = 0.8\). Find \(R^2\).`, 0.64, T`Square the correlation.`],
      [T`\(r = 0.5\), \(s_y = 10\), \(s_x = 2\). Find the slope \(b_1 = r\,s_y/s_x\).`, 2.5, T`Correlation rescaled into units of \(y\) per \(x\).`]
    ]
  },
  'Inference for regression': {
    hook: T`
<p>A new sample would give a slightly different line. The slope estimate has its own standard error, and the usual recipe applies: \(t = \frac{b_1}{SE(b_1)}\) tests whether the true slope is zero, and \(b_1 \pm t^*SE\) gives a confidence interval.</p>`,
    vary: [
      [T`\(b_1 = 2\), \(SE = 0.5\). Find \(t\).`, 4, T`\(2/0.5\).`],
      [T`Using \(t^* \approx 2\), find the upper end of the 95% CI for the slope.`, 3, T`\(2 + 2\cdot0.5\).`],
      [T`\(t = 1.2\). Is the slope significant at 5%?`, ['No', 'Yes'], T`\(|t|\) is well below 2.`],
      [T`Find the degrees of freedom for simple regression with \(n = 30\).`, 28, T`\(n - 2\): two parameters estimated.`]
    ]
  },
  'Multiple regression': {
    hook: T`
<p>With several predictors, each coefficient is the effect of that variable with the others held fixed. That is what makes regression useful against confounding.</p>
<p>Ice cream sales and drownings rise together, but both are driven by hot weather. Add temperature to the model and the ice cream coefficient collapses toward zero.</p>`,
    vary: [
      [T`\(\hat y = 10 + 2x_1 - 3x_2\). Predict at \(x_1 = 1\), \(x_2 = 2\).`, 6, T`\(10 + 2 - 6\).`],
      [T`Same model: raising \(x_2\) by 1 with \(x_1\) fixed changes \(\hat y\) by:`, -3, T`Its coefficient.`],
      [T`How many parameters does a model with 3 predictors and an intercept have?`, 4, T`One per predictor, plus the intercept.`],
      [T`Adjusted \(R^2\) differs from \(R^2\) because it:`, ['penalizes extra predictors', 'is always larger', 'ignores the intercept'], T`Plain \(R^2\) never falls when you add a predictor.`]
    ]
  },
  'Diagnostics': {
    hook: T`
<p>A model can fit badly in ways a single number hides. Plot the residuals against the fitted values. A shapeless cloud is what you want; patterns are the model telling you what it missed.</p>
${fig('residualPlots', {}, 'A curve in the residuals means the straight line missed a bend.')}`,
    vary: [
      [T`A curved band in the residual plot suggests:`, ['a nonlinear pattern the model missed', 'perfect fit', 'too much data'], T`Add a curved term or transform a variable.`],
      [T`A funnel shape (spread growing with fitted value) suggests:`, ['non-constant variance', 'an outlier', 'a missing intercept'], T`Try a log transform.`],
      [T`A high-leverage point is one with:`, ['an unusual \\(x\\) value', 'a large residual', 'a small residual'], T`Leverage is about position in \(x\), which gives power to pull the line.`],
      [T`\(y = 10\) and \(\hat y = 12\). Find the residual.`, -2, T`Observed minus predicted.`]
    ]
  },
  'Logistic regression': {
    hook: T`
<p>To predict a yes/no outcome, a straight line is a poor fit: it runs below 0 and above 1. Logistic regression models the log-odds as a line, which bends the prediction into an S-curve between 0 and 1.</p>
${fig('logistic', {}, 'Outcomes are 0 or 1; the curve gives the probability of 1.')}
<p>A coefficient \(b\) multiplies the odds by \(e^b\) for each unit increase in its predictor.</p>`,
    vary: [
      [T`\(p = 0.5\). Find the odds \(\frac{p}{1 - p}\).`, 1, T`Even odds.`],
      [T`\(p = 0.8\). Find the odds.`, 4, T`\(0.8/0.2\).`],
      [T`The log-odds equal 0. Find \(p\).`, 0.5, T`Odds 1.`],
      [T`A coefficient is \(\ln 2\). Each unit of \(x\) multiplies the odds by:`, 2, T`\(e^{\ln 2}\).`],
      [T`The log-odds equal 2. Find \(p\) to three decimals.`, 0.881, T`\(\frac{1}{1 + e^{-2}}\).`]
    ]
  },
  'The GLM family': {
    hook: T`
<p>Linear, logistic, and Poisson regression share one recipe: a linear predictor, a link function connecting it to the mean, and a distribution for the noise. Choose the distribution by the type of outcome: normal for measurements, binomial for yes/no, Poisson for counts.</p>`,
    vary: [
      [T`Poisson with log link: \(\log\mu = 1 + 0.5x\). Find \(\mu\) at \(x = 2\).`, Math.E ** 2, T`\(e^{2}\).`],
      [T`Same model: each unit of \(x\) multiplies \(\mu\) by:`, Math.exp(0.5), T`\(e^{0.5}\).`],
      [T`The natural family for a yes/no outcome is:`, ['binomial (logistic)', 'Poisson', 'normal'], T`Two outcomes.`],
      [T`The natural family for counts of events is:`, ['Poisson', 'binomial', 'normal'], T`Nonnegative integers with a log link.`]
    ]
  },
  'Model selection and regularization': {
    hook: T`
<p>A model that is too simple misses real structure (underfitting). One that is too flexible memorizes noise (overfitting): its training error keeps dropping while its error on new data rises.</p>
${fig('biasVariance', {}, 'Choose complexity by error on new data, not training data.')}
<p>Cross-validation estimates new-data error. Regularization (ridge, LASSO) shrinks coefficients to tame flexibility.</p>`,
    vary: [
      [T`Adding predictors always lowers:`, ['training error', 'test error', 'both'], T`More flexibility always fits the training data at least as well.`],
      [T`Cross-validation estimates:`, ['error on new data', 'training error', 'the p-value'], T`Each fold is scored on data it did not train on.`],
      [T`LASSO can set coefficients to:`, ['exactly zero', 'infinity', 'one'], T`That is why it selects variables.`],
      [T`Find \(AIC = 2k - 2\ln L\) with \(k = 3\) and \(\ln L = -10\).`, 26, T`\(6 + 20\). Lower AIC is better.`]
    ]
  }
});
