registerLearn('trig', [
  { title: 'Angles and radians', skill: 'Radians', body: T`
<p>A radian is the angle that cuts an arc equal to the radius. A full turn is \(2\pi\) radians, so</p>
\[\pi \text{ rad} = 180^\circ \qquad \text{deg}\to\text{rad: }\times\frac{\pi}{180} \qquad \text{rad}\to\text{deg: }\times\frac{180}{\pi}\]
<p>With \(\theta\) in radians: arc length \(s = r\theta\), sector area \(A = \frac12 r^2\theta\), linear speed \(v = r\omega\).</p>`,
    ex: { q: T`Convert \(225^\circ\) to radians and find the arc it cuts on a circle of radius 6.`, a: T`
<p>\(225\cdot\frac{\pi}{180} = \frac{5\pi}{4}\). \(s = 6\cdot\frac{5\pi}{4} = 7.5\pi \approx 23.6\).</p>` },
    trap: T`Using degrees in \(s = r\theta\). The formula only works in radians.` },

  { title: 'Right-triangle trigonometry', skill: 'Right triangles', body: T`
<p>SOH-CAH-TOA: \(\sin\theta = \frac{\text{opp}}{\text{hyp}}\), \(\cos\theta = \frac{\text{adj}}{\text{hyp}}\), \(\tan\theta = \frac{\text{opp}}{\text{adj}}\). Reciprocals: \(\csc = \frac1{\sin}\), \(\sec = \frac1{\cos}\), \(\cot = \frac1{\tan}\).</p>
<table class="tt"><tr><th>Triangle</th><th>Side ratios</th></tr>
<tr><td>30-60-90</td><td>\(1 : \sqrt3 : 2\)</td></tr><tr><td>45-45-90</td><td>\(1 : 1 : \sqrt2\)</td></tr></table>
<p>To find an angle from sides, use an inverse function: \(\theta = \arctan\frac{\text{opp}}{\text{adj}}\).</p>`,
    ex: { q: T`A 10 m ladder makes a \(60^\circ\) angle with the ground. How high does it reach?`, a: T`
<p>Height is opposite the angle: \(10\sin 60^\circ = 10\cdot\frac{\sqrt3}{2} = 5\sqrt3 \approx 8.66\) m.</p>` },
    trap: T`Labeling opposite and adjacent relative to the wrong angle. They depend on which acute angle you use.` },

  { title: 'The unit circle', skill: 'Unit circle', body: T`
<p>The point at angle \(\theta\) on the unit circle is \((\cos\theta, \sin\theta)\), and \(\tan\theta = \frac{\sin\theta}{\cos\theta}\).</p>
<table class="tt"><tr><th>\(\theta\)</th><th>\(0\)</th><th>\(\frac\pi6\)</th><th>\(\frac\pi4\)</th><th>\(\frac\pi3\)</th><th>\(\frac\pi2\)</th></tr>
<tr><td>\(\sin\)</td><td>0</td><td>\(\frac12\)</td><td>\(\frac{\sqrt2}2\)</td><td>\(\frac{\sqrt3}2\)</td><td>1</td></tr>
<tr><td>\(\cos\)</td><td>1</td><td>\(\frac{\sqrt3}2\)</td><td>\(\frac{\sqrt2}2\)</td><td>\(\frac12\)</td><td>0</td></tr></table>
<p>For other angles, find the reference angle (the acute angle to the \(x\)-axis) and attach the sign for the quadrant: all positive in I, sine in II, tangent in III, cosine in IV.</p>`,
    ex: { q: T`Evaluate \(\cos\frac{5\pi}{3}\) and \(\tan\frac{5\pi}{3}\).`, a: T`
<p>Reference angle \(\frac\pi3\), quadrant IV. \(\cos\frac{5\pi}3 = \frac12\) (positive) and \(\sin\frac{5\pi}3 = -\frac{\sqrt3}2\), so \(\tan\frac{5\pi}3 = -\sqrt3\).</p>` },
    trap: T`Mixing up which coordinate is which. Cosine is \(x\); sine is \(y\).` },

  { title: 'Graphs of sine and cosine', skill: 'Graphs', body: T`
\[y = A\sin\big(B(x - C)\big) + D\]
<p>Amplitude \(|A|\); period \(\frac{2\pi}{|B|}\); phase shift \(C\) (right if positive); midline \(y = D\); range \([D - |A|, D + |A|]\). Sine starts at the midline going up; cosine starts at a maximum.</p>`,
    ex: { q: T`Describe \(y = 3\cos(2x - \pi) + 1\).`, a: T`
<p>Factor out \(B\): \(3\cos\big(2(x - \frac\pi2)\big) + 1\). Amplitude 3, period \(\pi\), shift \(\frac\pi2\) right, midline \(y = 1\), range \([-2, 4]\).</p>` },
    trap: T`Reading the phase shift of \(\cos(2x - \pi)\) as \(\pi\). It is \(\frac{\pi}{2}\) once \(B\) is factored out.` },

  { title: 'Other trigonometric graphs', skill: 'Graphs', body: T`
<p>\(\tan x\) has period \(\pi\), zeros at \(k\pi\), and vertical asymptotes where \(\cos x = 0\): \(x = \frac\pi2 + k\pi\). \(\cot x\) has asymptotes where \(\sin x = 0\).</p>
<p>\(\sec x\) and \(\csc x\) have period \(2\pi\), asymptotes where cosine or sine is zero, and U-shaped branches touching \(\pm1\).</p>`,
    ex: { q: T`Find the vertical asymptotes of \(y = \tan 2x\).`, a: T`
<p>\(2x = \frac\pi2 + k\pi\), so \(x = \frac\pi4 + \frac{k\pi}{2}\). The period is \(\frac\pi2\).</p>` },
    trap: T`Using \(\frac{2\pi}{B}\) for tangent's period. Tangent and cotangent use \(\frac{\pi}{|B|}\).` },

  { title: 'Fundamental identities', skill: 'Identities', body: T`
\[\sin^2x + \cos^2x = 1 \qquad 1 + \tan^2x = \sec^2x \qquad 1 + \cot^2x = \csc^2x\]
<p>Quotient: \(\tan x = \frac{\sin x}{\cos x}\). Even/odd: \(\cos(-x) = \cos x\), \(\sin(-x) = -\sin x\), \(\tan(-x) = -\tan x\). Cofunction: \(\sin\left(\frac\pi2 - x\right) = \cos x\).</p>`,
    ex: { q: T`Simplify \(\dfrac{1 - \cos^2x}{\sin x\cos x}\).`, a: T`
<p>\(1 - \cos^2 x = \sin^2 x\), so the expression is \(\frac{\sin^2x}{\sin x\cos x} = \frac{\sin x}{\cos x} = \tan x\).</p>` },
    trap: T`Confusing \(\sin^2 x\), meaning \((\sin x)^2\), with \(\sin(x^2)\).` },

  { title: 'Sum, difference, and double angle', skill: 'Identities', body: T`
\[\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b\]
\[\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b\]
\[\sin 2x = 2\sin x\cos x\]
\[\cos 2x = \cos^2x - \sin^2x = 2\cos^2x - 1 = 1 - 2\sin^2x\]
<p>Power reduction, used constantly in calculus: \(\sin^2x = \frac{1 - \cos 2x}{2}\) and \(\cos^2x = \frac{1 + \cos 2x}{2}\).</p>`,
    ex: { q: T`Find the exact value of \(\sin 75^\circ\).`, a: T`
\[\begin{aligned}&\sin(45^\circ + 30^\circ)\\ &= \tfrac{\sqrt2}{2}\cdot\tfrac{\sqrt3}{2} + \tfrac{\sqrt2}{2}\cdot\tfrac12\\ &= \tfrac{\sqrt6 + \sqrt2}{4}\end{aligned}\]` },
    trap: T`Assuming \(\sin(a + b) = \sin a + \sin b\). Check with \(a = b = 90^\circ\): \(0 \ne 2\).` },

  { title: 'Proving identities', skill: 'Identities', body: T`
<p>Work on one side only and transform it into the other. Useful moves: rewrite everything in sine and cosine, combine fractions over a common denominator, factor, and apply a Pythagorean identity. Multiplying by a conjugate such as \(1 + \sin x\) often unlocks fractions.</p>`,
    ex: { q: T`Prove \(\sec x - \cos x = \sin x\tan x\).`, a: T`
\[\frac{1}{\cos x} - \cos x = \frac{1 - \cos^2x}{\cos x} = \frac{\sin^2x}{\cos x} = \sin x\cdot\frac{\sin x}{\cos x}\]` },
    trap: T`Treating the identity as an equation and doing the same operation to both sides. That assumes what you are trying to prove.` },

  { title: 'Inverse trigonometric functions', skill: 'Inverse trig', body: T`
<p>Each inverse returns one angle from a restricted range:</p>
<table class="tt"><tr><th>Function</th><th>Domain</th><th>Range</th></tr>
<tr><td>\(\arcsin x\)</td><td>\([-1, 1]\)</td><td>\([-\frac\pi2, \frac\pi2]\)</td></tr>
<tr><td>\(\arccos x\)</td><td>\([-1, 1]\)</td><td>\([0, \pi]\)</td></tr>
<tr><td>\(\arctan x\)</td><td>all reals</td><td>\((-\frac\pi2, \frac\pi2)\)</td></tr></table>
<p>For compositions like \(\sin(\arccos x)\), draw a right triangle with the given ratio.</p>`,
    ex: { q: T`Evaluate \(\sin\left(\arccos\frac35\right)\) and \(\arcsin\left(\sin\frac{5\pi}{6}\right)\).`, a: T`
<p>A triangle with adjacent 3, hypotenuse 5 has opposite 4, so the first is \(\frac45\).</p>
<p>\(\sin\frac{5\pi}6 = \frac12\), and \(\arcsin\frac12 = \frac\pi6\), not \(\frac{5\pi}6\).</p>` },
    trap: T`Reading \(\sin^{-1}x\) as \(\frac{1}{\sin x}\). It means arcsine; the reciprocal is \(\csc x\).` },

  { title: 'Trigonometric equations', skill: 'Equations', body: T`
<p>Isolate the trig function, find all solutions in one period using reference angles, then add multiples of the period for the general solution. Quadratic-type equations factor like ordinary quadratics.</p>
<p>For \(\sin(kx) = c\), solve for \(kx\) over \(k\) full periods, then divide by \(k\).</p>`,
    ex: { q: T`Solve \(2\cos^2x - \cos x - 1 = 0\) on \([0, 2\pi)\).`, a: T`
<p>\((2\cos x + 1)(\cos x - 1) = 0\). \(\cos x = -\frac12\) gives \(x = \frac{2\pi}{3}, \frac{4\pi}{3}\); \(\cos x = 1\) gives \(x = 0\).</p>` },
    trap: T`Dividing both sides by \(\sin x\) or \(\cos x\), which drops the solutions where it equals 0. Factor it out instead.` },

  { title: 'Law of sines and cosines', skill: 'Oblique triangles', body: T`
\[\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}\]
\[c^2 = a^2 + b^2 - 2ab\cos C\]
<p>Use the law of sines with a known side–angle pair (AAS, ASA, SSA). Use the law of cosines for SAS or SSS. Area \(= \frac12ab\sin C\).</p>
<p>SSA is ambiguous: there may be 0, 1, or 2 triangles, because \(\sin B = \sin(180^\circ - B)\).</p>`,
    ex: { q: T`A triangle has \(a = 7\), \(b = 8\), \(C = 60^\circ\). Find \(c\).`, a: T`
<p>\(c^2 = 49 + 64 - 2(56)\cos 60^\circ = 113 - 56 = 57\), so \(c = \sqrt{57} \approx 7.55\).</p>` },
    trap: T`Taking only the calculator's acute answer in an SSA problem. Check whether \(180^\circ - B\) also fits.` }
]);
