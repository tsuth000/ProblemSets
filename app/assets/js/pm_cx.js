'use strict';
// Pure math track, stage 2: Complex analysis. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'cx', name: 'Complex analysis', color: '#8A3B3B', blurb: 'Complex numbers, analytic functions, Cauchy-Riemann, contour integrals, Cauchy formula, Laurent series, residues, real integrals, Rouché, conformal maps', questions: [], generators: [] });
  const U = ['Complex numbers and polar form', 'Powers and roots of unity', 'Exponential, logarithm, and powers', 'Analytic functions and Cauchy–Riemann', 'Contour integrals', 'Cauchy’s theorem and integral formula', 'Taylor and Laurent series', 'Singularities and residues', 'Real integrals by residues', 'Counting zeros: argument principle and Rouché', 'Conformal and Möbius maps'];

  registerLearn('cx', [
    { title: U[0], skill: U[0],
      hook: T`<p>A complex number \(z = x + iy\) is a point in the plane. Adding complex numbers adds vectors; multiplying them multiplies lengths and adds angles. That geometric rule makes rotation and scaling into arithmetic.</p>`,
      body: T`
<p><b>Arithmetic.</b> \(i^2 = -1\). \((a + bi)(c + di) = (ac - bd) + (ad + bc)i\). Divide by multiplying top and bottom by the conjugate of the bottom:</p>
\[\frac{1 + 2i}{3 - i} = \frac{(1 + 2i)(3 + i)}{10} = \frac{1 + 7i}{10}\]
<p><b>Conjugate and modulus.</b> \(\bar z = x - iy\), \(|z| = \sqrt{x^2 + y^2}\), \(z\bar z = |z|^2\). \(|zw| = |z||w|\), \(\left|\frac zw\right| = \frac{|z|}{|w|}\), and \(|z + w| \le |z| + |w|\).</p>
<p><b>Polar form.</b> \(z = r(\cos\theta + i\sin\theta) = re^{i\theta}\) with \(r = |z|\) and \(\theta = \arg z\). The <b>principal argument</b> \(\text{Arg}\,z\) lies in \((-\pi, \pi]\); compute it with the quadrant in mind: \(\text{Arg}(-1 - i) = -\frac{3\pi}{4}\), not \(\frac\pi4\).</p>
<p><b>Multiplication in polar form:</b> \(r_1e^{i\theta_1}\cdot r_2e^{i\theta_2} = r_1r_2e^{i(\theta_1 + \theta_2)}\). Multiplying by \(i = e^{i\pi/2}\) rotates by 90°.</p>
<p><b>Euler's formula</b> \(e^{i\theta} = \cos\theta + i\sin\theta\) follows from the power series of \(e^x\), \(\cos\), and \(\sin\). At \(\theta = \pi\): \(e^{i\pi} + 1 = 0\).</p>`,
      ex: { q: T`Write \(z = -\sqrt3 + i\) in polar form, and find \(\frac{1}{z}\).`, a: T`<p>\(r = 2\). The point is in quadrant II with reference angle \(\frac\pi6\), so \(\theta = \frac{5\pi}{6}\): \(z = 2e^{5\pi i/6}\).</p><p>\(\frac1z = \frac12e^{-5\pi i/6} = \frac{\bar z}{|z|^2} = \frac{-\sqrt3 - i}{4}\).</p>` },
      trap: T`Taking \(\arctan\frac yx\) as the argument in every quadrant. It is off by \(\pi\) when \(x < 0\).`,
      vary: [[T`\(|3 - 4i|\)?`, 5, T`\(\sqrt{9 + 16}\).`], [T`Real part of \(\frac{1 + 2i}{3 - i}\)?`, 0.1, T`\(\frac{1 + 7i}{10}\).`], [T`\(\text{Arg}(-1 - i)\) in radians, three decimals.`, -3 * Math.PI / 4, T`Quadrant III.`], [T`\(|(1 + i)^{6}|\)?`, 8, T`\(\sqrt2^{\,6}\).`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>In polar form, powers and roots become easy: raise the length to the power and multiply the angle. The \(n\)th roots of any number sit evenly around a circle.</p>`,
      body: T`
<p><b>De Moivre:</b> \((re^{i\theta})^n = r^ne^{in\theta}\). \((1 + i)^8 = (\sqrt2)^8e^{8\cdot i\pi/4} = 16e^{2\pi i} = 16\).</p>
<p><b>\(n\)th roots.</b> The solutions of \(w^n = re^{i\theta}\) are</p>
\[w_k = r^{1/n}e^{i(\theta + 2\pi k)/n},\qquad k = 0, 1, \ldots, n - 1\]
<p>They form a regular \(n\)-gon of radius \(r^{1/n}\). The cube roots of \(8i = 8e^{i\pi/2}\) are \(2e^{i\pi/6}\), \(2e^{5i\pi/6}\), \(2e^{3i\pi/2} = -2i\).</p>
<p><b>Roots of unity.</b> \(\omega = e^{2\pi i/n}\); the roots of \(z^n = 1\) are \(1, \omega, \ldots, \omega^{n-1}\). Their sum is 0 for \(n \ge 2\) (they balance around the circle) and their product is \((-1)^{n+1}\). These are Vieta's formulas for \(z^n - 1\).</p>
<p><b>Trig identities from De Moivre.</b> Expand \((\cos\theta + i\sin\theta)^3\) and match real parts: \(\cos3\theta = \cos^3\theta - 3\cos\theta\sin^2\theta = 4\cos^3\theta - 3\cos\theta\).</p>`,
      ex: { q: T`Find all solutions of \(z^4 = -16\).`, a: T`<p>\(-16 = 16e^{i\pi}\). Roots: \(2e^{i(\pi + 2\pi k)/4}\), angles \(\frac\pi4, \frac{3\pi}4, \frac{5\pi}4, \frac{7\pi}4\): \(\pm\sqrt2 \pm \sqrt2i\).</p>` },
      trap: T`Listing only one root. \(z^n = w\) has exactly \(n\) solutions for \(w \ne 0\).`,
      vary: [[T`Real part of \((1 + i)^4\)?`, -4, T`\(4e^{i\pi}\).`], [T`Sum of the 7th roots of unity?`, 0, T`Vieta.`], [T`Modulus of each cube root of \(27i\)?`, 3, T`\(27^{1/3}\).`], [T`Product of the 4th roots of unity?`, -1, T`\((-1)^{5}\).`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>The complex exponential wraps the imaginary axis around the unit circle, so it repeats every \(2\pi i\). Undoing it gives a logarithm with infinitely many values, one for each turn.</p>`,
      body: T`
<p><b>Exponential.</b> \(e^{x + iy} = e^x(\cos y + i\sin y)\), so \(|e^z| = e^{\text{Re}\,z}\) and \(\arg e^z = \text{Im}\,z\). It is never 0 and has period \(2\pi i\).</p>
<p><b>Trig and hyperbolic.</b> \(\cos z = \frac{e^{iz} + e^{-iz}}{2}\), \(\sin z = \frac{e^{iz} - e^{-iz}}{2i}\). They are unbounded: \(\cos(iy) = \cosh y\).</p>
<p><b>Logarithm.</b> \(\log z = \ln|z| + i\arg z\), multivalued by \(2\pi i\). The <b>principal branch</b> \(\text{Log}\,z = \ln|z| + i\,\text{Arg}\,z\) is analytic off the negative real axis (the branch cut). \(\text{Log}(-1) = i\pi\), \(\text{Log}(i) = \frac{i\pi}{2}\).</p>
<p><b>Complex powers.</b> \(z^c = e^{c\log z}\), one value per branch. Principal value: \(i^i = e^{i\,\text{Log}\,i} = e^{i\cdot i\pi/2} = e^{-\pi/2} \approx 0.2079\), a real number.</p>
<p>Rules like \(\text{Log}(zw) = \text{Log}\,z + \text{Log}\,w\) can fail by \(2\pi i\) when the arguments add past \(\pi\).</p>`,
      ex: { q: T`Find the principal value of \((1 + i)^{i}\).`, a: T`<p>\(\text{Log}(1 + i) = \ln\sqrt2 + \frac{i\pi}{4}\). Multiply by \(i\): \(-\frac\pi4 + i\ln\sqrt2\). So \((1 + i)^i = e^{-\pi/4}e^{i\ln\sqrt2} \approx 0.456(\cos0.347 + i\sin0.347)\), modulus \(e^{-\pi/4} \approx 0.456\).</p>` },
      trap: T`Assuming \(|e^{z}| = e^{|z|}\). Only the real part of \(z\) sets the modulus.`,
      vary: [[T`\(|e^{2 + 5i}|\), three decimals.`, Math.exp(2), T`\(e^2\).`], [T`Imaginary part of \(\text{Log}(-e)\), three decimals.`, Math.PI, T`\(1 + i\pi\).`], [T`\(i^i\), four decimals.`, Math.exp(-Math.PI / 2), T`\(e^{-\pi/2}\).`], [T`\(\cos(i\ln 2)\)?`, 1.25, T`\(\cosh(\ln2) = \frac{2 + 1/2}{2}\).`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>Complex differentiability is far stricter than real differentiability: the limit must be the same from every direction in the plane. Functions that pass are called analytic, and they turn out to be infinitely differentiable and equal to their power series.</p>`,
      body: T`
<p>\(f'(z_0) = \lim_{h\to0}\frac{f(z_0 + h) - f(z_0)}{h}\) with \(h\) complex. Writing \(f = u + iv\) and comparing \(h\) real with \(h\) imaginary gives the <b>Cauchy–Riemann equations</b>:</p>
\[u_x = v_y,\qquad u_y = -v_x\]
<p>If the partial derivatives are continuous and satisfy CR, \(f\) is differentiable with \(f' = u_x + iv_x\).</p>
<p><b>Tests.</b> \(f = z^2 = (x^2 - y^2) + i(2xy)\): \(u_x = 2x = v_y\), \(u_y = -2y = -v_x\). Analytic. \(f = \bar z = x - iy\): \(u_x = 1\), \(v_y = -1\). Not analytic anywhere. \(|z|^2\) is differentiable only at 0. A quick test: an analytic function can be written using \(z\) alone, with no \(\bar z\).</p>
<p><b>Harmonic functions.</b> If \(f\) is analytic, \(u\) and \(v\) satisfy Laplace's equation \(u_{xx} + u_{yy} = 0\). Conversely, a harmonic \(u\) on a simply connected domain has a <b>harmonic conjugate</b> \(v\) making \(u + iv\) analytic. For \(u = x^2 - y^2\): \(v_y = u_x = 2x\) gives \(v = 2xy + g(x)\), and \(v_x = -u_y = 2y\) forces \(g' = 0\).</p>
<p><b>Derivative rules</b> are the familiar ones: \((z^n)' = nz^{n-1}\), \((e^z)' = e^z\), and the product, quotient, and chain rules.</p>`,
      ex: { q: T`Is \(u = x^3 - 3xy^2 + 2y\) harmonic? Find a conjugate.`, a: T`<p>\(u_{xx} = 6x\), \(u_{yy} = -6x\): harmonic. \(v_y = u_x = 3x^2 - 3y^2\), so \(v = 3x^2y - y^3 + g(x)\). Then \(v_x = 6xy + g' = -u_y = 6xy - 2\), so \(g = -2x\). \(f = z^3 - 2iz\).</p>` },
      trap: T`Checking only one of the two CR equations.`,
      vary: [[T`Is \(\bar z\) analytic? 1 yes, 0 no.`, 0, T`\(u_x = 1 \ne v_y = -1\).`], [T`Is \(e^x\cos y\) harmonic? 1 yes, 0 no.`, 1, T`Real part of \(e^z\).`], [T`\(f(z) = z^3\). \(|f'(1 + i)|\)?`, 6, T`\(3(1 + i)^2 = 6i\).`], [T`Is \(x^2 + y^2\) harmonic? 1 yes, 0 no.`, 0, T`Laplacian 4.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>A contour integral adds up \(f(z)\,dz\) along a path in the plane. Parametrize the path, and it becomes an ordinary integral in one real variable.</p>`,
      body: T`
<p>For a path \(z(t)\), \(a \le t \le b\):</p>
\[\int_C f(z)\,dz = \int_a^b f(z(t))\,z'(t)\,dt\]
<p><b>Circle</b> of radius \(r\) about \(a\): \(z = a + re^{it}\), \(dz = ire^{it}\,dt\), \(0 \le t \le 2\pi\). <b>Segment</b> from \(p\) to \(q\): \(z = p + t(q - p)\), \(0 \le t \le 1\).</p>
<p><b>The key integral.</b> Around a circle centered at \(a\):</p>
\[\oint (z - a)^n\,dz = \begin{cases}2\pi i & n = -1\\ 0 & n \ne -1\end{cases}\]
<p>since \(\int_0^{2\pi}ir^{n+1}e^{i(n+1)t}dt\) vanishes unless \(n + 1 = 0\).</p>
<p><b>Antiderivatives.</b> If \(F' = f\) on a region containing the path, \(\int_Cf\,dz = F(\text{end}) - F(\text{start})\), independent of the path: \(\int_C z^2\,dz = \frac{q^3 - p^3}{3}\). \(\frac1z\) has no single-valued antiderivative around 0, which is why its loop integral is \(2\pi i\).</p>
<p><b>Non-analytic integrands depend on the path.</b> \(\oint_{|z| = r}\bar z\,dz = \int_0^{2\pi}re^{-it}\cdot ire^{it}dt = 2\pi ir^2\).</p>
<p><b>ML bound:</b> \(\left|\int_Cf\,dz\right| \le M\cdot L\), with \(M = \max_C|f|\) and \(L\) the path length.</p>`,
      ex: { q: T`Compute \(\int_C z\,dz\) and \(\int_C\bar z\,dz\) along the segment from 0 to \(1 + i\).`, a: T`<p>\(z = t(1 + i)\), \(dz = (1 + i)dt\). \(\int_0^1t(1 + i)^2dt = \frac{2i}{2} = i\) (also \(\frac{(1 + i)^2}{2}\)). \(\int_0^1t(1 - i)(1 + i)dt = \frac22 = 1\).</p>` },
      trap: T`Forgetting the \(z'(t)\) factor.`,
      vary: [[T`\(\oint_{|z|=3}\frac{dz}{z}\) divided by \(\pi i\)?`, 2, T`\(2\pi i\).`], [T`\(\oint_{|z|=1}z^5\,dz\)?`, 0, T`Antiderivative exists.`], [T`\(\oint_{|z|=2}\bar z\,dz\) divided by \(\pi i\)?`, 8, T`\(2\pi i\cdot4\).`], [T`\(\int_0^{i}2z\,dz\)?`, -1, T`\(i^2\).`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Cauchy's theorem says analytic functions integrate to zero around closed loops. His integral formula goes further: the values inside a loop are determined by the values on it.</p>`,
      body: T`
<p><b>Cauchy's theorem.</b> If \(f\) is analytic on and inside a simple closed curve \(C\), then \(\oint_Cf\,dz = 0\). Loops can be deformed freely through regions where \(f\) is analytic.</p>
<p><b>Cauchy's integral formula.</b> For \(a\) inside \(C\) (counterclockwise):</p>
\[f(a) = \frac{1}{2\pi i}\oint_C\frac{f(z)}{z - a}\,dz,\qquad f^{(n)}(a) = \frac{n!}{2\pi i}\oint_C\frac{f(z)}{(z - a)^{n+1}}\,dz\]
<p>So \(\oint\frac{f(z)}{(z - a)^{n+1}}dz = \frac{2\pi i}{n!}f^{(n)}(a)\) when \(a\) is inside, and 0 when \(a\) is outside.</p>
<p><b>Examples.</b> \(\oint_{|z|=2}\frac{e^z}{z - 1}dz = 2\pi ie\). \(\oint_{|z|=2}\frac{e^{3z}}{z^3}dz = \frac{2\pi i}{2!}\cdot9 = 9\pi i\). \(\oint_{|z|=1}\frac{\cos z}{z - 3}dz = 0\) (the point 3 is outside).</p>
<p><b>Consequences.</b> Analytic functions are infinitely differentiable. <b>Liouville:</b> a bounded entire function is constant. <b>Fundamental theorem of algebra:</b> if \(p\) had no root, \(\frac1p\) would be bounded and entire. <b>Maximum modulus:</b> \(|f|\) on a bounded region peaks on the boundary.</p>`,
      ex: { q: T`Compute \(\oint_{|z|=3}\frac{z^2}{(z - 1)(z + 5)}dz\).`, a: T`<p>Only \(z = 1\) is inside. Write the integrand as \(\frac{g(z)}{z - 1}\) with \(g = \frac{z^2}{z + 5}\), analytic inside. Answer \(2\pi ig(1) = 2\pi i\cdot\frac16 = \frac{\pi i}{3}\).</p>` },
      trap: T`Including a singular point that lies outside the contour.`,
      vary: [[T`\(\oint_{|z|=2}\frac{z^2}{z - 1}dz\) divided by \(\pi i\)?`, 2, T`\(2\pi i\cdot1\).`], [T`\(\oint_{|z|=1}\frac{e^z}{z^2}dz\) divided by \(\pi i\)?`, 2, T`\(2\pi i\cdot e^0\).`], [T`\(\oint_{|z|=1}\frac{dz}{z - 2}\)?`, 0, T`2 is outside.`], [T`A bounded entire function is: 1 constant, 0 possibly not.`, 1, T`Liouville.`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>An analytic function equals its Taylor series on the largest disk that avoids its singularities. Around a singularity, a Laurent series with negative powers takes over.</p>`,
      body: T`
<p><b>Taylor.</b> If \(f\) is analytic on \(|z - a| < R\), then \(f(z) = \sum c_n(z - a)^n\) there with \(c_n = \frac{f^{(n)}(a)}{n!}\). The <b>radius of convergence is the distance from \(a\) to the nearest singularity</b>. \(\frac{1}{1 + z^2}\) at 0 has radius 1 because of \(\pm i\), which explains why its real series fails beyond \(|x| = 1\) though nothing goes wrong on the real line.</p>
<p><b>Standard series:</b> \(\frac{1}{1 - z} = \sum z^n\) (\(|z| < 1\)), \(e^z = \sum\frac{z^n}{n!}\), \(\sin z = z - \frac{z^3}{6} + \cdots\).</p>
<p><b>Laurent series.</b> On an annulus \(r < |z - a| < R\), \(f(z) = \sum_{n=-\infty}^\infty c_n(z - a)^n\). Build them from geometric series. For \(\frac{1}{z(1 - z)}\):</p>
<ul><li>\(0 < |z| < 1\): \(\frac1z\cdot\sum z^n = \frac1z + 1 + z + \cdots\)</li>
<li>\(|z| > 1\): \(\frac{1}{z}\cdot\frac{-1}{z(1 - 1/z)} = -\frac1{z^2} - \frac1{z^3} - \cdots\)</li></ul>
<p>The same function has different Laurent series on different annuli.</p>
<p><b>Substitution.</b> \(e^{1/z} = \sum\frac{1}{n!z^n}\) for \(z \ne 0\); \(\frac{\sin z}{z^4} = \frac{1}{z^3} - \frac{1}{6z} + \frac{z}{120} - \cdots\). The coefficient \(c_{-1}\) is the residue (next unit).</p>`,
      ex: { q: T`Radius of convergence of the Taylor series of \(\frac{1}{z^2 - 4z + 13}\) about \(z = 1\)?`, a: T`<p>Singularities at \(z = 2 \pm 3i\). Distance from 1: \(|1 \pm 3i| = \sqrt{10}\). Radius \(\sqrt{10}\).</p>` },
      trap: T`Reading the radius off the real line. Complex singularities off the axis limit it too.`,
      vary: [[T`Radius of the Taylor series of \(\frac{1}{1 + z^2}\) at 0?`, 1, T`\(\pm i\).`], [T`Radius of the Taylor series of \(\frac{1}{z - 3}\) at \(z = i\), three decimals.`, Math.sqrt(10), T`\(|3 - i|\).`], [T`Coefficient of \(\frac1z\) in \(\frac{\sin z}{z^4}\), three decimals.`, -1 / 6, T`From \(-\frac{z^3}{6}\).`], [T`Coefficient of \(z^{-2}\) in \(e^{1/z}\)?`, 0.5, T`\(\frac1{2!}\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>An isolated singularity is removable, a pole, or essential, and the residue, the \(\frac{1}{z - a}\) coefficient, is all that survives when you integrate around it.</p>`,
      body: T`
<table class="tt"><tr><th>Type</th><th>Laurent principal part</th><th>Example at 0</th></tr>
<tr><td>Removable</td><td>none</td><td>\(\frac{\sin z}{z}\)</td></tr>
<tr><td>Pole of order \(m\)</td><td>finitely many, lowest \((z - a)^{-m}\)</td><td>\(\frac{1}{z^2}\)</td></tr>
<tr><td>Essential</td><td>infinitely many</td><td>\(e^{1/z}\)</td></tr></table>
<p>Near a pole \(|f| \to \infty\); near an essential singularity \(f\) comes arbitrarily close to every value (Casorati–Weierstrass). For \(\frac{g}{h}\) with \(g(a) \ne 0\), the pole order is the order of the zero of \(h\) at \(a\).</p>
<p><b>Residue formulas.</b></p>
<ul><li>Simple pole: \(\text{Res}_a f = \lim_{z\to a}(z - a)f(z)\). For \(\frac{g}{h}\) with a simple zero of \(h\): \(\frac{g(a)}{h'(a)}\).</li>
<li>Pole of order \(m\): \(\text{Res}_af = \frac{1}{(m - 1)!}\lim_{z\to a}\frac{d^{m-1}}{dz^{m-1}}\left[(z - a)^mf(z)\right]\).</li>
<li>Otherwise read \(c_{-1}\) from the Laurent series.</li></ul>
<p><b>Residue theorem.</b> \(\oint_Cf\,dz = 2\pi i\sum\text{Res}\), summing over the singularities inside \(C\).</p>
<p>Example: \(\oint_{|z|=2}\frac{dz}{z^2 - 1}\). Residues \(\frac{1}{2z}\) at \(\pm1\): \(\frac12\) and \(-\frac12\). Total 0.</p>`,
      ex: { q: T`Find \(\text{Res}_{z=0}\frac{e^{2z}}{z^3}\).`, a: T`<p>Pole of order 3. \(e^{2z} = 1 + 2z + 2z^2 + \cdots\); dividing by \(z^3\), the \(\frac1z\) coefficient is 2. (Formula: \(\frac{1}{2!}\frac{d^2}{dz^2}e^{2z}\big|_0 = \frac{4}{2} = 2\).)</p>` },
      trap: T`Using the simple-pole formula at a double pole.`,
      vary: [[T`\(\text{Res}_{z=2}\frac{z}{z - 2}\)?`, 2, T`\(g(2)\).`], [T`Order of the pole of \(\frac{1}{z^2(z - 1)}\) at 0?`, 2, T`Double zero below.`], [T`\(\text{Res}_{z=0}\frac{\cos z}{z}\)?`, 1, T`\(\cos0\).`], [T`\(\text{Res}_{z=0}e^{1/z}\)?`, 1, T`\(c_{-1} = \frac1{1!}\).`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>Hard real integrals often become easy loop integrals: close the real line with a large semicircle, or turn an integral over \([0, 2\pi]\) into one around the unit circle, then add residues.</p>`,
      body: T`
<h4>Rational functions on \(\mathbb R\)</h4>
<p>If \(\deg Q \ge \deg P + 2\) and \(Q\) has no real zeros, close in the upper half-plane; the arc contributes nothing as \(R \to \infty\):</p>
\[\int_{-\infty}^{\infty}\frac{P}{Q}dx = 2\pi i\sum_{\text{Im}\,a > 0}\text{Res}_a\frac PQ\]
<p>\(\int\frac{dx}{x^2 + a^2}\): residue at \(ia\) is \(\frac{1}{2ia}\), so the integral is \(\frac\pi a\). \(\int\frac{dx}{(x^2 + a^2)(x^2 + b^2)} = \frac{\pi}{ab(a + b)}\). \(\int\frac{dx}{(x^2 + a^2)^2} = \frac{\pi}{2a^3}\).</p>
<h4>Fourier-type integrals</h4>
<p>For \(k > 0\), write \(\cos kx = \text{Re}\,e^{ikx}\); \(e^{ikz}\) decays in the upper half-plane (Jordan's lemma):</p>
\[\int_{-\infty}^\infty\frac{\cos kx}{x^2 + a^2}dx = \frac{\pi e^{-ka}}{a}\]
<h4>Trigonometric integrals over \([0, 2\pi]\)</h4>
<p>Set \(z = e^{i\theta}\): \(\cos\theta = \frac{z + z^{-1}}{2}\), \(d\theta = \frac{dz}{iz}\). For \(a > |b|\):</p>
\[\int_0^{2\pi}\frac{d\theta}{a + b\cos\theta} = \frac{2\pi}{\sqrt{a^2 - b^2}}\]`,
      ex: { q: T`Compute \(\int_{-\infty}^\infty\frac{dx}{x^2 + 2x + 5}\).`, a: T`<p>Roots \(-1 \pm 2i\); upper one \(-1 + 2i\). Residue \(\frac{1}{2z + 2} = \frac{1}{4i}\). Integral \(2\pi i\cdot\frac{1}{4i} = \frac\pi2\).</p>` },
      trap: T`Adding residues from the lower half-plane as well.`,
      vary: [[T`\(\int_{-\infty}^\infty\frac{dx}{x^2 + 4}\), three decimals.`, Math.PI / 2, T`\(\frac\pi2\).`], [T`\(\int_0^{2\pi}\frac{d\theta}{5 + 3\cos\theta}\), three decimals.`, Math.PI / 2, T`\(\frac{2\pi}{4}\).`], [T`\(\int_{-\infty}^\infty\frac{dx}{(x^2 + 1)^2}\), three decimals.`, Math.PI / 2, T`\(\frac{\pi}{2}\).`], [T`\(\int_{-\infty}^\infty\frac{\cos x}{x^2 + 1}dx\), three decimals.`, Math.PI / Math.E, T`\(\frac{\pi}{e}\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>How many roots does a polynomial have inside a disk? Without solving it, compare it on the boundary circle with its largest term: the two have the same number of zeros inside.</p>`,
      body: T`
<p><b>Argument principle.</b> For \(f\) analytic with no zeros on \(C\), the number of zeros inside (with multiplicity) minus the number of poles is</p>
\[\frac{1}{2\pi i}\oint_C\frac{f'}{f}\,dz\]
<p>the number of times \(f(z)\) winds around 0 as \(z\) traverses \(C\).</p>
<p><b>Rouché's theorem.</b> If \(|g| < |f|\) on \(C\), then \(f\) and \(f + g\) have the same number of zeros inside \(C\).</p>
<p><b>Recipe.</b> On \(|z| = R\), pick the term that dominates the sum of the others' moduli.</p>
<ul><li>\(z^5 + 6z^2 + 1\) on \(|z| = 1\): \(|6z^2| = 6 > |z^5| + 1 = 2\). Same count as \(6z^2\): 2 zeros in \(|z| < 1\).</li>
<li>On \(|z| = 2\): \(|z^5| = 32 > 6\cdot4 + 1 = 25\). All 5 zeros lie in \(|z| < 2\), so 3 lie in the annulus \(1 < |z| < 2\).</li></ul>
<p><b>Other consequences.</b> The fundamental theorem of algebra (\(z^n\) dominates on a large circle). Hurwitz: limits of zero-free analytic functions are zero-free or identically zero.</p>`,
      ex: { q: T`How many zeros does \(z^4 - 5z + 1\) have in \(|z| < 1\)?`, a: T`<p>On \(|z| = 1\): \(|-5z| = 5 > |z^4| + 1 = 2\). Same as \(-5z\): one zero.</p>` },
      trap: T`Choosing a dominant term that only wins at some points of the circle. The inequality must hold everywhere on \(C\).`,
      vary: [[T`Zeros of \(z^6 + 9z^3 + 1\) in \(|z| < 1\)?`, 3, T`\(9 > 2\).`], [T`Zeros of \(z^3 + z + 10\) in \(|z| < 1\)?`, 0, T`\(10 > 2\).`], [T`Zeros of \(z^7 - 3z + 1\) in \(|z| < 2\)?`, 7, T`\(128 > 7\).`]] },

    { title: U[10], skill: U[10],
      hook: T`<p>An analytic map with nonzero derivative preserves angles: it is conformal. Möbius transformations, the fractions \(\frac{az + b}{cz + d}\), are the most useful ones, sending circles and lines to circles and lines.</p>`,
      body: T`
<p><b>Conformality.</b> If \(f'(z_0) \ne 0\), \(f\) rotates every curve through \(z_0\) by \(\arg f'(z_0)\) and scales by \(|f'(z_0)|\), so angles between curves are preserved. \(z^2\) at 0 doubles angles (\(f'(0) = 0\)).</p>
<p><b>Möbius transformations</b> \(T(z) = \frac{az + b}{cz + d}\), \(ad - bc \ne 0\). They form a group under composition (matching \(2\times2\) matrices up to scale), map circles and lines to circles and lines, and are determined by the images of three points.</p>
<p><b>Fixed points</b> solve \(z = \frac{az + b}{cz + d}\), i.e. \(cz^2 + (d - a)z - b = 0\): at most two unless \(T\) is the identity. If \(c = 0\), \(\infty\) is fixed.</p>
<p><b>Standard maps.</b></p>
<table class="tt"><tr><th>Map</th><th>Sends</th></tr>
<tr><td>\(\frac{z - i}{z + i}\) (Cayley)</td><td>upper half-plane \(\to\) unit disk</td></tr>
<tr><td>\(e^{i\theta}\frac{z - a}{1 - \bar az}\), \(|a| < 1\)</td><td>disk \(\to\) disk, \(a \mapsto 0\)</td></tr>
<tr><td>\(e^z\)</td><td>strip \(0 < \text{Im}\,z < \pi\) \(\to\) upper half-plane</td></tr>
<tr><td>\(z^2\)</td><td>first quadrant \(\to\) upper half-plane</td></tr></table>
<p><b>Riemann mapping theorem.</b> Every simply connected proper open subset of \(\mathbb C\) maps conformally onto the unit disk. Conformal maps carry harmonic functions to harmonic functions, which is how 2D heat flow and fluid problems get solved on awkward shapes.</p>`,
      ex: { q: T`Find the fixed points of \(T(z) = \frac{2z + 1}{z + 2}\), and \(T(i)\).`, a: T`<p>\(z^2 + 2z = 2z + 1\), so \(z^2 = 1\): \(z = \pm1\).</p><p>\(T(i) = \frac{2i + 1}{i + 2} = \frac{(1 + 2i)(2 - i)}{5} = \frac{4 + 3i}{5}\).</p>` },
      trap: T`Forgetting to check \(ad - bc \ne 0\). \(\frac{2z + 4}{z + 2} = 2\) is constant, not Möbius.`,
      vary: [[T`Image of \(i\) under the Cayley map \(\frac{z - i}{z + i}\)?`, 0, T`\(i\mapsto0\).`], [T`Fixed points of \(\frac{1}{z}\): how many?`, 2, T`\(\pm1\).`], [T`Angle magnification of \(z^3\) at 0?`, 3, T`Angles triple.`], [T`\(|T(0)|\) for \(T(z) = \frac{z - 0.5}{1 - 0.5z}\)?`, 0.5, T`\(-0.5\).`]] }
  ]);

  addQuestions('cx', [
    { id: 'cx1', skill: U[3], q: T`Which function is analytic everywhere in \(\mathbb C\)?`, c: [T`\(e^z\)`, T`\(\bar z\)`, T`\(|z|^2\)`, T`\(\text{Re}\,z\)`], x: T`The others fail Cauchy–Riemann.` },
    { id: 'cx2', skill: U[5], q: T`Liouville's theorem says a bounded entire function is:`, c: ['constant', 'a polynomial of degree 1', 'periodic', 'zero'], x: T`Cauchy's estimate forces \(f' = 0\).` },
    { id: 'cx3', skill: U[6], q: T`The Taylor series of an analytic function about \(a\) converges on the disk whose radius is:`, c: ['the distance to the nearest singularity', 'always infinite', 'the distance to the nearest real singularity', '1'], x: T`Complex singularities count too.` },
    { id: 'cx4', skill: U[7], q: T`What kind of singularity does \(e^{1/z}\) have at 0?`, c: ['essential', 'removable', 'simple pole', 'pole of order 2'], x: T`Infinitely many negative powers.` },
    { id: 'cx5', skill: U[7], q: T`\(\frac{\sin z}{z}\) at \(z = 0\) has:`, c: ['a removable singularity', 'a simple pole', 'an essential singularity', 'a branch point'], x: T`\(\frac{\sin z}{z} = 1 - \frac{z^2}{6} + \cdots\).` },
    { id: 'cx6', skill: U[9], q: T`Rouché's theorem compares two functions on a contour when:`, c: [T`\(|g| < |f|\) everywhere on the contour`, T`\(f = g\) at one point`, T`\(f\) and \(g\) have the same degree`, T`\(|g| < |f|\) at the center`], x: T`Then \(f\) and \(f + g\) have equally many zeros inside.` },
    { id: 'cx7', skill: U[10], q: T`Möbius transformations map circles and lines to:`, c: ['circles and lines', 'ellipses', 'parabolas', 'points'], x: T`Generalized circles are preserved.` },
    { id: 'cx8', skill: U[2], q: T`The principal branch \(\text{Log}\,z\) is discontinuous across:`, c: ['the negative real axis', 'the positive real axis', 'the imaginary axis', 'the unit circle'], x: T`\(\text{Arg}\) jumps from \(\pi\) to \(-\pi\) there.` }
  ]);

  // ======================= GENERATORS =======================
  const cplx = (a, b) => (b === 0 ? `${a}` : a === 0 ? `${b === 1 ? '' : b === -1 ? '-' : b}i` : `${a} ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}i`);
  const py = (a, b) => `(${a} + ${b}*I)`;
  const fct = k => (k <= 1 ? 1 : k * fct(k - 1));
  const fz = a => (a === 0 ? 'z' : `(z ${a < 0 ? '+' : '-'} ${Math.abs(a)})`), sgn = (c, t) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 && t ? '' : Math.abs(c)}${t}`);
  const piT = a => (a === 1 ? '\\pi' : `${a}\\pi`), fmtc = (re, im, f) => (Math.abs(im) < 1e-12 ? f(re) : Math.abs(re) < 1e-12 ? `${f(im)}i` : `${f(re)} ${im < 0 ? '-' : '+'} ${f(Math.abs(im))}i`);

  registerUnitGens('cx', { units: {
    [U[0]]: [
      { id: 'cx-arith', make(R) {
        const a = R.nz(-6, 6), b = R.nz(-6, 6), c = R.nz(-5, 5), d = R.nz(-5, 5), k = R.int(0, 3);
        const re = [a * c - b * d, (a * c + b * d) / (c * c + d * d)][k >> 1], im = [a * d + b * c, (b * c - a * d) / (c * c + d * d)][k >> 1];
        const op = k >> 1 ? '/' : '*', expr = k >> 1 ? T`\(\frac{${cplx(a, b)}}{${cplx(c, d)}}\)` : T`\((${cplx(a, b)})(${cplx(c, d)})\)`, part = k & 1 ? 'imaginary' : 'real';
        return { q: T`Find the ${part} part of ${expr}.`, answer: k & 1 ? im : re, tol: 1e-6, x: k >> 1 ? T`Multiply by the conjugate \(${cplx(c, -d)}\): the denominator is ${c * c + d * d}, the numerator \(${cplx(a * c + b * d, b * c - a * d)}\).` : T`\((ac - bd) + (ad + bc)i = ${cplx(a * c - b * d, a * d + b * c)}\).`, v: `(${k & 1 ? 'im' : 're'})(${py(a, b)}${op}${py(c, d)})` };
      } },
      { id: 'cx-polar', make(R) {
        const a = R.nz(-6, 6), b = R.int(-6, 6), ask = R.int(0, 1), r = Math.hypot(a, b), th = Math.atan2(b, a);
        return { q: ask ? T`Find \(|${cplx(a, b)}|\), to three decimals.` : T`Find the principal argument \(\text{Arg}(${cplx(a, b)})\) in radians, in \((-\pi, \pi]\), to three decimals.`, answer: ask ? r : th, tol: 0.001,
          x: ask ? T`\(\sqrt{${a * a} + ${b * b}} = \sqrt{${a * a + b * b}}\).` : T`The point \((${a}, ${b})\) lies ${a > 0 ? 'right of the imaginary axis, so \\(\\arctan\\frac yx\\) is correct' : 'left of the imaginary axis, so adjust \\(\\arctan\\frac yx\\) by \\(\\pm\\pi\\)'}: \(\text{Arg} \approx ${R.fmt(th, 4)}\).`, v: ask ? `Abs(${py(a, b)})` : `arg(${py(a, b)})` };
      } }
    ],
    [U[1]]: [
      { id: 'cx-pow', make(R) {
        const [a, b] = R.pick([[1, 1], [1, -1], [-1, 1], [1, 0], [0, 1], [1, 2], [2, 1], [1, -2], [2, 2]]), n = R.int(3, 8), ask = R.int(0, 1);
        let re = 1, im = 0; for (let i = 0; i < n; i++) [re, im] = [re * a - im * b, re * b + im * a];
        return { q: T`Find the ${ask ? 'imaginary' : 'real'} part of \((${cplx(a, b)})^{${n}}\).`, answer: ask ? im : re, x: T`De Moivre, or repeated multiplication: \((${cplx(a, b)})^{${n}} = ${cplx(re, im)}\).`, v: `(${ask ? 'im' : 're'})(expand(${py(a, b)}**${n}))` };
      } },
      { id: 'cx-roots', make(R) {
        const n = R.int(2, 8), k = R.int(0, 2), m = R.pick([1, 8, 16, 27, 32, 64, 81]), arg = R.pick([0, 0.5, 1, 1.5]);
        if (k === 0) return { q: T`What is the modulus of each solution of \(z^{${n}} = ${m}${arg ? `e^{${piT(arg)} i}` : ''}\)? (Three decimals.)`, answer: m ** (1 / n), tol: 0.001, x: T`All roots have modulus \(${m}^{1/${n}} \approx ${R.fmt(m ** (1 / n), 4)}\).`, v: `Abs(${m}**Rational(1, ${n}))` };
        if (k === 1) { const which = R.int(0, 1); return { q: T`Find the ${which ? 'product' : 'sum'} of the ${n}th roots of unity.`, answer: which ? (n % 2 ? 1 : -1) : 0, x: which ? T`Vieta for \(z^{${n}} - 1\): the product of the roots is \((-1)^{${n}}\cdot(-1) = ${n % 2 ? 1 : -1}\).` : T`Vieta: the \(z^{${n - 1}}\) coefficient of \(z^{${n}} - 1\) is 0.`, v: which ? `nsimplify(prod([exp(2*pi*I*j/${n}) for j in range(${n})]).expand(complex=True))` : `nsimplify(sum(exp(2*pi*I*j/${n}) for j in range(${n})).expand(complex=True))` }; }
        const th0 = arg * Math.PI, j = R.int(0, n - 1), ang = (th0 + 2 * Math.PI * j) / n;
        return { q: T`The solutions of \(z^{${n}} = ${arg ? `e^{${piT(arg)} i}` : '1'}\) are \(e^{i\theta_k}\) with \(\theta_k = \frac{${arg ? piT(arg) + ' + ' : ''}2\pi k}{${n}}\). Find \(\theta_{${j}}\) in radians, to three decimals.`, answer: ang, tol: 0.001, x: T`\(\theta_{${j}} = \frac{${R.fmt(th0, 4)} + ${R.fmt(2 * Math.PI * j, 4)}}{${n}} \approx ${R.fmt(ang, 4)}\).`, v: `(nsimplify(${arg})*pi + 2*pi*${j})/${n}` };
      } }
    ],
    [U[2]]: [{ id: 'cx-exp', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const a = R.int(-3, 3), b = R.int(-9, 9); return { q: T`Find \(|e^{${cplx(a, b)}}|\), to four decimals.`, answer: Math.exp(a), tol: 0.0001, x: T`\(|e^{x + iy}| = e^x = e^{${a}}\).`, v: `Abs(exp(${py(a, b)}))` }; }
      if (k === 1) { const a = R.nz(-5, 5), b = R.int(-5, 5); return { q: T`Find the imaginary part of \(\text{Log}(${cplx(a, b)})\), to three decimals.`, answer: Math.atan2(b, a), tol: 0.001, x: T`\(\text{Im}\,\text{Log}\,z = \text{Arg}\,z \approx ${R.fmt(Math.atan2(b, a), 4)}\).`, v: `im(log(${py(a, b)}))` }; }
      if (k === 2) { const a = R.nz(-5, 5), b = R.int(-5, 5); return { q: T`Find the real part of \(\text{Log}(${cplx(a, b)})\), to three decimals.`, answer: Math.log(Math.hypot(a, b)), tol: 0.001, x: T`\(\text{Re}\,\text{Log}\,z = \ln|z| = \ln\sqrt{${a * a + b * b}}\).`, v: `re(log(${py(a, b)}))` }; }
      const [z, zt, lnr, ar] = R.pick([['I', 'i', 0, Math.PI / 2], ['-1', '-1', 0, Math.PI], ['(-I)', '-i', 0, -Math.PI / 2], ['E*I', 'ei', 1, Math.PI / 2]]), c = R.pick([[0, 1], [0, 2], [0, -1], [1, 1]]);
      // z^c with c = c0 + c1 i: exp(c Log z) = exp((c0 + c1 i)(lnr + i ar)); modulus exp(c0 lnr - c1 ar).
      const mod = Math.exp(c[0] * lnr - c[1] * ar);
      return { q: T`Find the modulus of the principal value of \(${zt.length > 1 ? `(${zt})` : zt}^{${cplx(c[0], c[1])}}\), to four decimals.`, answer: mod, tol: 0.0001, x: T`\(z^c = e^{c\,\text{Log}\,z}\) with \(\text{Log}\,z = ${lnr} + ${R.fmt(ar, 4)}i\). The modulus is \(e^{\text{Re}(c\,\text{Log}\,z)} = e^{${R.fmt(c[0] * lnr - c[1] * ar, 4)}}\).`, v: `Abs(exp(${py(c[0], c[1])}*log(${z})))` };
    } }],
    [U[3]]: [
      { id: 'cx-cr', make(R) {
        const F = [['z^2', 'x**2 - y**2', '2*x*y', 1], ['\\bar z', 'x', '-y', 0], ['|z|^2', 'x**2 + y**2', '0', 0], ['e^z', 'exp(x)*cos(y)', 'exp(x)*sin(y)', 1], ['z\\bar z + z', 'x**2 + y**2 + x', 'y', 0], ['x^2 + iy^2', 'x**2', 'y**2', 0], ['z^3', 'x**3 - 3*x*y**2', '3*x**2*y - y**3', 1], ['\\text{Re}\\,z', 'x', '0', 0], ['\\frac{1}{z} \\ (z \\ne 0)', 'x/(x**2 + y**2)', '-y/(x**2 + y**2)', 1], ['e^{\\bar z}', 'exp(x)*cos(y)', '-exp(x)*sin(y)', 0], ['iz + 2', '2 - y', 'x', 1], ['\\sin z', 'sin(x)*cosh(y)', 'cos(x)*sinh(y)', 1]];
        const [t, u, v, y] = R.pick(F);
        return { q: T`Is \(f(z) = ${t}\) analytic on its domain?`, c: y ? ['Yes', 'No'] : ['No', 'Yes'], x: y ? 'Its real and imaginary parts satisfy both Cauchy-Riemann equations, and it is built from z alone.' : 'The Cauchy-Riemann equations fail on an open set (the formula involves the conjugate of z).', key: y ? 'Yes' : 'No',
          vk: `(lambda x, y: 'Yes' if simplify(diff(${u}, x) - diff(${v}, y)) == 0 and simplify(diff(${u}, y) + diff(${v}, x)) == 0 else 'No')(Symbol('x', real=True), Symbol('y', real=True))` };
      } },
      { id: 'cx-harm', make(R) {
        const a = R.int(-4, 4), b = R.int(-4, 4), c = R.int(-4, 4), harm = R.int(0, 1), d = harm ? -a : R.pick([a, a + 1, a + 2].filter(t => t !== -a));
        const u = `${a}x^2 + ${b}xy + ${d}y^2 + ${c}x`;
        return { q: T`Is \(u(x, y) = ${u}\) harmonic?`, c: a + d === 0 ? ['Yes', 'No'] : ['No', 'Yes'], x: T`\(u_{xx} + u_{yy} = ${2 * a} + ${2 * d} = ${2 * a + 2 * d}\). ${a + d === 0 ? 'Zero: harmonic.' : 'Nonzero: not harmonic.'}`, key: a + d === 0 ? 'Yes' : 'No',
          vk: `(lambda x, y: 'Yes' if simplify(diff(${a}*x**2 + ${b}*x*y + ${d}*y**2 + ${c}*x, x, 2) + diff(${a}*x**2 + ${b}*x*y + ${d}*y**2 + ${c}*x, y, 2)) == 0 else 'No')(Symbol('x'), Symbol('y'))` };
      } },
      { id: 'cx-deriv', make(R) {
        const n = R.int(2, 4), a = R.int(-2, 2), b = R.nz(-2, 2), ask = R.int(0, 1);
        let re = 1, im = 0; for (let i = 0; i < n - 1; i++) [re, im] = [re * a - im * b, re * b + im * a]; re *= n; im *= n;
        return { q: T`\(f(z) = z^{${n}}\). Find the ${ask ? 'imaginary' : 'real'} part of \(f'(${cplx(a, b)})\).`, answer: ask ? im : re, x: T`\(f'(z) = ${n}z^{${n - 1}}\), so \(f'(${cplx(a, b)}) = ${cplx(re, im)}\).`, v: `(${ask ? 'im' : 're'})(expand(diff(Symbol('z')**${n}, Symbol('z')).subs(Symbol('z'), ${py(a, b)})))` };
      } }
    ],
    [U[4]]: [{ id: 'cx-cint', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const n = R.int(-3, 3), r = R.int(1, 4), a = R.int(-2, 2); return { q: T`Compute \(\oint_{|z - ${a}| = ${r}}(z - ${a})^{${n}}\,dz\), divided by \(\pi i\).`, answer: n === -1 ? 2 : 0, x: n === -1 ? T`Exponent \(-1\) gives \(2\pi i\), so the ratio is 2.` : T`Exponent \(${n} \ne -1\): the integral is 0.`, v: `(lambda t: integrate((${r}*exp(I*t))**${n}*I*${r}*exp(I*t), (t, 0, 2*pi))/(pi*I))(Symbol('t', real=True))` }; }
      if (k === 1) { const r = R.int(1, 4); return { q: T`Compute \(\oint_{|z| = ${r}}\bar z\,dz\), divided by \(\pi i\).`, answer: 2 * r * r, x: T`\(z = ${r}e^{it}\): \(\int_0^{2\pi}${r}e^{-it}\cdot i${r}e^{it}dt = 2\pi i\cdot${r * r}\).`, v: `(lambda t: integrate(${r}*exp(-I*t)*I*${r}*exp(I*t), (t, 0, 2*pi))/(pi*I))(Symbol('t', real=True))` }; }
      const p = [R.int(-2, 2), R.int(-2, 2)], q = [R.int(-2, 2), R.int(-2, 2)]; if (p[0] === q[0] && p[1] === q[1]) return this.make(R);
      const m = R.int(1, 2), ask = R.int(0, 1);
      const pw = (x, y, e) => { let a = 1, b = 0; for (let i = 0; i < e; i++) [a, b] = [a * x - b * y, a * y + b * x]; return [a, b]; };
      const [qa, qb] = pw(q[0], q[1], m + 1), [pa, pb] = pw(p[0], p[1], m + 1), val = [(qa - pa) / (m + 1), (qb - pb) / (m + 1)];
      return { q: T`Compute the ${ask ? 'imaginary' : 'real'} part of \(\int_C z^{${m}}\,dz\), where \(C\) is the segment from \(${cplx(p[0], p[1])}\) to \(${cplx(q[0], q[1])}\).`, answer: val[ask], tol: 1e-6, x: T`\(z^{${m}}\) has antiderivative \(\frac{z^{${m + 1}}}{${m + 1}}\), so the integral is \(\frac{(${cplx(q[0], q[1])})^{${m + 1}} - (${cplx(p[0], p[1])})^{${m + 1}}}{${m + 1}} = ${fmtc(val[0], val[1], t => R.fmt(t, 4))}\).`,
        v: `(lambda t: (${ask ? 'im' : 're'})(integrate((${py(p[0], p[1])} + t*(${py(q[0] - p[0], q[1] - p[1])}))**${m}*${py(q[0] - p[0], q[1] - p[1])}, (t, 0, 1))))(Symbol('t', real=True))` };
    } }],
    [U[5]]: [{ id: 'cx-cif', make(R) {
      const a = R.int(-3, 3), r = R.int(1, 4), inside = Math.abs(a) < r, n = R.int(1, 3), k = R.int(1, 3), f = R.int(0, 1);
      // f(z) = e^{kz} or z^4; integral of f/(z - a)^n = 2 pi i f^{(n-1)}(a)/(n-1)!
      let deriv; if (f === 0) deriv = k ** (n - 1) * Math.exp(k * a); else { const p = 4, d = n - 1; deriv = d > p ? 0 : (fct(p) / fct(p - d)) * a ** (p - d); }
      const val = inside ? 2 * deriv / fct(n - 1) : 0, ftex = f === 0 ? `e^{${k}z}` : 'z^4', fpy = f === 0 ? `exp(${k}*z)` : 'z**4';
      return { q: T`Compute \(\oint_{|z| = ${r}}\frac{${ftex}}{${a ? `(z ${a < 0 ? '+' : '-'} ${Math.abs(a)})` : 'z'}^{${n}}}\,dz\), divided by \(\pi i\). (Four decimals if needed.)`, answer: val, tol: Math.max(1e-4, Math.abs(val) * 1e-6),
        x: inside ? T`\(${a}\) lies inside. Cauchy's formula: \(\frac{2\pi i}{${n - 1}!}f^{(${n - 1})}(${a})\) with \(f = ${ftex}\), giving \(${R.fmt(val, 5)}\pi i\).` : T`\(|${a}| \ge ${r}\), so the singularity is not inside the contour and the integral is 0.`,
        v: `(lambda z: 0 if ${inside ? 0 : 1} else residue(${fpy}/(z - ${a})**${n}, z, ${a})*2)(Symbol('z'))` };
    } }],
    [U[6]]: [
      { id: 'cx-rad', make(R) {
        const a = R.int(-3, 3), b = R.int(1, 4), x0 = R.int(-3, 3), y0 = R.int(-2, 2), d1 = Math.hypot(a - x0, b - y0), d2 = Math.hypot(a - x0, -b - y0), rad = Math.min(d1, d2);
        if (rad < 1e-9) return this.make(R);
        return { q: T`Find the radius of convergence of the Taylor series of \(\frac{1}{z^2${sgn(-2 * a, 'z')} + ${a * a + b * b}}\) about \(z_0 = ${cplx(x0, y0)}\), to three decimals.`, answer: rad, tol: 0.001,
          x: T`Singularities at \(${cplx(a, b)}\) and \(${cplx(a, -b)}\). Distances from \(z_0\): ${R.fmt(d1, 4)} and ${R.fmt(d2, 4)}. The radius is the smaller.`, v: `min(Abs(r - ${py(x0, y0)}) for r in solve(Symbol('z')**2 - ${2 * a}*Symbol('z') + ${a * a + b * b}, Symbol('z')))` };
      } },
      { id: 'cx-laur', make(R) {
        const k = R.int(0, 2);
        if (k === 0) { const m = R.int(1, 5), j = R.int(0, 4); return { q: T`Find the coefficient of \(z^{${-j}}\) in the Laurent series of \(e^{${m}/z}\) about 0.`, answer: m ** j / fct(j), tol: 1e-6, x: T`\(e^{${m}/z} = \sum\frac{${m}^n}{n!z^n}\): the coefficient is \(\frac{${m}^{${j}}}{${j}!}\).`, v: `series(exp(${m}*Symbol('w')), Symbol('w'), 0, 8).removeO().coeff(Symbol('w'), ${j})` }; }
        if (k === 1) { const p = R.int(2, 6), j = R.int(-p, 2);
          // sin z / z^p = sum (-1)^m z^{2m+1-p}/(2m+1)!; coefficient of z^j: need 2m+1-p = j.
          const m = (j + p - 1) / 2, ans = Number.isInteger(m) && m >= 0 ? (-1) ** m / fct(2 * m + 1) : 0;
          return { q: T`Find the coefficient of \(z^{${j}}\) in the Laurent series of \(\frac{\sin z}{z^{${p}}}\) about 0, to five decimals.`, answer: ans, tol: 1e-5, x: T`\(\frac{\sin z}{z^{${p}}} = \sum_m\frac{(-1)^mz^{2m+1-${p}}}{(2m + 1)!}\). ${ans ? T`The term \(z^{${j}}\) comes from \(m = ${m}\).` : 'No term has this exponent, so the coefficient is 0.'}`, v: `series(sin(Symbol('z'))/Symbol('z')**${p}, Symbol('z'), 0, 6).removeO().coeff(Symbol('z'), ${j})` }; }
        const a = R.int(2, 5), j = R.int(1, 4);
        return { q: T`In the region \(|z| > ${a}\), \(\frac{1}{z - ${a}} = \sum_{n\ge1}c_nz^{-n}\). Find \(c_{${j}}\).`, answer: a ** (j - 1), x: T`\(\frac{1}{z - ${a}} = \frac1z\cdot\frac{1}{1 - ${a}/z} = \sum_{n\ge1}\frac{${a}^{n-1}}{z^n}\).`, v: `series(1/(1/Symbol('w') - ${a}), Symbol('w'), 0, 8).removeO().coeff(Symbol('w'), ${j})` };
      } }
    ],
    [U[7]]: [
      { id: 'cx-res', make(R) {
        const k = R.int(0, 2), z = "Symbol('z')";
        if (k === 0) { const a = R.int(-4, 4); let b, c; do { b = R.int(-4, 4); c = R.int(-5, 5); } while (b === a || c === -a);
          return { q: T`Find \(\text{Res}_{z = ${a}}\frac{z${sgn(c, '')}}{${fz(a)}${fz(b)}}\).`, answer: (a + c) / (a - b), tol: 1e-6, x: T`Simple pole: \(\lim_{z\to${a}}(z - ${a})f(z) = \frac{${a} + ${c}}{${a} - ${b}} = ${R.fmt((a + c) / (a - b), 4)}\).`, v: `(lambda z: residue((z + ${c})/((z - ${a})*(z - ${b})), z, ${a}))(${z})` }; }
        if (k === 1) { const m = R.int(2, 4), c = R.int(1, 3); return { q: T`Find \(\text{Res}_{z = 0}\frac{e^{${c}z}}{z^{${m}}}\), to four decimals.`, answer: c ** (m - 1) / fct(m - 1), tol: 1e-4, x: T`The \(\frac1z\) term comes from \(\frac{(${c}z)^{${m - 1}}}{${m - 1}!}\): residue \(\frac{${c}^{${m - 1}}}{${m - 1}!}\).`, v: `(lambda z: residue(exp(${c}*z)/z**${m}, z, 0))(${z})` }; }
        const a = R.int(1, 4);
        return { q: T`Find \(\text{Res}_{z = ${a}i}\frac{1}{z^2 + ${a * a}}\). Enter the imaginary part, to four decimals.`, answer: -1 / (2 * a), tol: 1e-4, x: T`\(\frac{g}{h'} = \frac{1}{2z}\) at \(${a}i\): \(\frac{1}{${2 * a}i} = -\frac{i}{${2 * a}}\).`, v: `(lambda z: im(residue(1/(z**2 + ${a * a}), z, ${a}*I)))(${z})` };
      } },
      { id: 'cx-sing', make(R) {
        const S = [['\\frac{\\sin z}{z}', 'Removable', 'sin(z)/z'], ['\\frac{1 - \\cos z}{z^2}', 'Removable', '(1 - cos(z))/z**2'], ['\\frac{e^z - 1}{z}', 'Removable', '(exp(z) - 1)/z'], ['\\frac{1}{z^3}', 'Pole', '1/z**3'], ['\\frac{\\cos z}{z^2}', 'Pole', 'cos(z)/z**2'], ['\\frac{e^z}{z}', 'Pole', 'exp(z)/z'], ['\\frac{1}{\\sin z}', 'Pole', '1/sin(z)'], ['e^{1/z}', 'Essential', ''], ['\\sin\\frac1z', 'Essential', ''], ['z\\,e^{1/z^2}', 'Essential', ''], ['\\frac{\\sin z}{z^3}', 'Pole', 'sin(z)/z**3'], ['\\cos\\frac1z', 'Essential', '']];
        const [t, w, e] = R.pick(S);
        return { q: T`Classify the singularity of \(${t}\) at \(z = 0\).`, c: [w, ...['Removable', 'Pole', 'Essential'].filter(s => s !== w)], x: { Removable: 'The Laurent series has no negative powers (the limit at 0 exists).', Pole: 'Finitely many negative powers: the function blows up.', Essential: 'Substituting 1/z into a power series gives infinitely many negative powers.' }[w], key: w,
          vk: e ? `(lambda z: (lambda L: 'Removable' if L.is_finite else 'Pole')(limit(${e}, z, 0)))(Symbol('z'))` : `'Essential'` };
      } },
      { id: 'cx-rthm', make(R) {
        const a = R.int(1, 3), b = R.int(-3, -1), r = R.int(1, 4), ins = [a, b].filter(t => Math.abs(t) < r);
        const val = ins.reduce((s, t) => s + (t === a ? 1 / (a - b) : 1 / (b - a)), 0) * 2;
        return { q: T`Compute \(\oint_{|z| = ${r}}\frac{dz}{(z - ${a})(z + ${-b})}\), divided by \(\pi i\).`, answer: val, tol: 1e-6, x: T`Poles at ${a} and ${b}; inside: ${ins.length ? ins.join(' and ') : 'none'}. Residues \(\frac{1}{${a - b}}\) at ${a} and \(-\frac{1}{${a - b}}\) at ${b}. Sum inside times \(2\pi i\).`, v: `(lambda z: 2*sum(residue(1/((z - ${a})*(z - (${b}))), z, p) for p in [${a}, ${b}] if abs(p) < ${r}))(Symbol('z'))` };
      } }
    ],
    [U[8]]: [{ id: 'cx-real', make(R) {
      const k = R.int(0, 3), x = "Symbol('x', real=True)";
      if (k === 0) { const a = R.int(1, 5), b = R.int(1, 5); if (a === b) return this.make(R); const v = Math.PI / (a * b * (a + b)); return { q: T`Compute \(\int_{-\infty}^\infty\frac{dx}{(x^2 + ${a * a})(x^2 + ${b * b})}\), to five decimals.`, answer: v, tol: 1e-5, x: T`Residues at \(${a}i\) and \(${b}i\) sum to give \(\frac{\pi}{ab(a + b)} = \frac{\pi}{${a * b * (a + b)}}\).`, v: `(lambda x: integrate(1/((x**2 + ${a * a})*(x**2 + ${b * b})), (x, -oo, oo)))(${x})` }; }
      if (k === 1) { const a = R.int(2, 6), b = R.int(1, a - 1); const v = 2 * Math.PI / Math.sqrt(a * a - b * b); return { q: T`Compute \(\int_0^{2\pi}\frac{d\theta}{${a} + ${b}\cos\theta}\), to four decimals.`, answer: v, tol: 1e-4, x: T`\(\frac{2\pi}{\sqrt{${a}^2 - ${b}^2}} = \frac{2\pi}{\sqrt{${a * a - b * b}}}\).`, v: `_mp.quad(lambda t: 1/(${a} + ${b}*_mp.cos(t)), [0, 2*_mp.pi])` }; }
      if (k === 2) { const a = R.int(1, 4), kk = R.int(1, 3); const v = Math.PI * Math.exp(-kk * a) / a; return { q: T`Compute \(\int_{-\infty}^\infty\frac{\cos ${kk}x}{x^2 + ${a * a}}dx\), to five decimals.`, answer: v, tol: 1e-5, x: T`\(\frac{\pi e^{-ka}}{a} = \frac{\pi e^{-${kk * a}}}{${a}}\).`, v: `_mp.quadosc(lambda t: _mp.cos(${kk}*t)/(t**2 + ${a * a}), [0, _mp.inf], omega=${kk})*2` }; }
      const p = R.int(-3, 3), q = R.int(1, 4), v = Math.PI / q;
      return { q: T`Compute \(\int_{-\infty}^\infty\frac{dx}{x^2 ${-2 * p < 0 ? '-' : '+'} ${Math.abs(2 * p)}x + ${p * p + q * q}}\), to four decimals.`, answer: v, tol: 1e-4, x: T`Upper root \(${cplx(p, q)}\); residue \(\frac{1}{2(${q}i)}\); integral \(2\pi i\cdot\frac{1}{${2 * q}i} = \frac{\pi}{${q}}\).`, v: `(lambda x: integrate(1/(x**2 - ${2 * p}*x + ${p * p + q * q}), (x, -oo, oo)))(${x})` };
    } }],
    [U[9]]: [{ id: 'cx-rouche', make(R) {
      const n = R.int(4, 8), m = R.int(1, n - 1), c = R.int(n + 3, 12) * R.pick([1, -1]), d = R.pick([1, -1, 2]), ask = R.int(0, 1);
      const r = ask ? 1 : 3, poly = `z^{${n}} ${c < 0 ? '-' : '+'} ${Math.abs(c)}z^{${m}} ${d < 0 ? '-' : '+'} ${Math.abs(d)}`;
      // On |z|=1: |c| > 1 + |d| so m zeros. On |z|=3 need 3^n > |c| 3^m + |d|.
      if (!ask && 3 ** n <= Math.abs(c) * 3 ** m + Math.abs(d)) return this.make(R);
      const ans = ask ? m : n;
      return { q: T`How many zeros (with multiplicity) does \(${poly}\) have in \(|z| < ${r}\)?`, answer: ans, x: ask ? T`On \(|z| = 1\): \(|${c}z^{${m}}| = ${Math.abs(c)} > 1 + ${Math.abs(d)}\). Rouché: same count as \(${c}z^{${m}}\), namely ${m}.` : T`On \(|z| = 3\): \(3^{${n}} = ${3 ** n} > ${Math.abs(c)}\cdot3^{${m}} + ${Math.abs(d)} = ${Math.abs(c) * 3 ** m + Math.abs(d)}\). Same count as \(z^{${n}}\): ${n}.`,
        v: `sum(1 for t in np.roots([1] + [0]*${n - m - 1} + [${c}] + [0]*${m - 1} + [${d}]) if abs(t) < ${r})` };
    } }],
    [U[10]]: [{ id: 'cx-mob', make(R) {
      let a, b, c, d; do { a = R.nz(-3, 3); b = R.nz(-3, 3); c = R.nz(-2, 2); d = R.nz(-3, 3); } while (a * d - b * c === 0);
      const k = R.int(0, 1);
      if (k === 0) { const [x0, y0] = [R.int(-2, 2), R.int(-2, 2)], den = [c * x0 + d, c * y0], num = [a * x0 + b, a * y0]; const D = den[0] ** 2 + den[1] ** 2; if (!D) return this.make(R);
        const re = (num[0] * den[0] + num[1] * den[1]) / D, ask = R.int(0, 1), im = (num[1] * den[0] - num[0] * den[1]) / D;
        return { q: T`\(T(z) = \frac{${a}z + ${b}}{${c}z + ${d}}\). Find the ${ask ? 'imaginary' : 'real'} part of \(T(${cplx(x0, y0)})\).`, answer: ask ? im : re, tol: 1e-6, x: T`\(T(${cplx(x0, y0)}) = \frac{${cplx(num[0], num[1])}}{${cplx(den[0], den[1])}}\), and dividing gives \(${fmtc(re, im, t => R.fmt(t, 4))}\).`, v: `(${ask ? 'im' : 're'})(simplify((${a}*${py(x0, y0)} + ${b})/(${c}*${py(x0, y0)} + ${d})))` }; }
      const disc = (d - a) ** 2 + 4 * b * c, cnt = disc === 0 ? 1 : 2;
      return { q: T`How many fixed points in \(\mathbb C\) does \(T(z) = \frac{${a}z + ${b}}{${c}z + ${d}}\) have?`, answer: cnt, x: T`Fixed points solve \(${c}z^2${sgn(d - a, 'z')}${sgn(-b, '')} = 0\), with discriminant \(${disc}\). ${cnt === 1 ? 'Zero: one double fixed point.' : 'Nonzero: two fixed points.'}`, v: `len(set(solve(${c}*Symbol('z')**2 + ${d - a}*Symbol('z') - (${b}), Symbol('z'))))` };
    } }]
  } });
})();
