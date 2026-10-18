registerLessons('trig', {
  'Angles and radians': {
    hook: T`
<p>Degrees divide a full turn into 360 parts, a number chosen by ancient astronomers for convenience. Radians measure an angle by something the circle itself provides: the radius.</p>
<p>Take the radius and lay it along the edge of the circle. The angle it spans is 1 radian, about \(57.3^\circ\). The circumference is \(2\pi\) radii, so a full turn is \(2\pi\) radians, and a half turn is \(\pi\).</p>
${fig('radian', {}, T`Drag the angle. At \(\theta = 1\) the arc \(s\) equals the radius \(r\).`)}
<p>Calculus uses radians because arc length is then simply \(s = r\theta\), with no conversion factor, and the derivative of \(\sin x\) comes out as exactly \(\cos x\).</p>`,
    vary: [
      [T`Convert \(\frac\pi2\) radians to degrees.`, 90, T`A quarter turn.`],
      [T`Convert \(\frac\pi3\) radians to degrees.`, 60, T`\(180 \div 3\).`],
      [T`Convert \(\frac{2\pi}3\) radians to degrees.`, 120, T`Twice the previous angle.`],
      [T`Convert \(\frac{5\pi}3\) radians to degrees.`, 300, T`Five copies of \(60^\circ\).`],
      [T`A central angle of 2 radians sits in a circle of radius 3. How long is its arc?`, 6, T`\(s = r\theta = 3\cdot2\).`]
    ]
  },
  'Right-triangle trigonometry': {
    hook: T`
<p>Lean a ladder against a wall at a fixed angle. Whether the ladder is short or long, the ratio height \(\div\) length is the same, because the triangles are scaled copies of each other. Those fixed ratios are sine, cosine, and tangent.</p>
<p>Name the sides from the angle's point of view. The <b>opposite</b> side faces the angle, the <b>adjacent</b> side touches it, and the <b>hypotenuse</b> is the longest side, across from the right angle.</p>
${fig('rightTri', {}, 'Move the angle and watch the three ratios change.')}
<p>Two triangles come up so often that their side ratios are worth memorizing:</p>
${fig('specialTri', {}, T`Halve an equilateral triangle for 30-60-90; halve a square for 45-45-90.`)}`,
    vary: [
      [T`A 3-4-5 right triangle has \(\theta\) opposite the side 3. Find \(\sin\theta\).`, 0.6, T`Opposite over hypotenuse: \(\frac35\).`],
      [T`Same triangle. Find \(\cos\theta\).`, 0.8, T`Adjacent over hypotenuse: \(\frac45\).`],
      [T`Same triangle. Find \(\tan\theta\).`, 0.75, T`Opposite over adjacent: \(\frac34\).`],
      [T`Now let \(\theta\) be the other acute angle, opposite the side 4. Find \(\sin\theta\).`, 0.8, T`Opposite and adjacent swap roles when you switch angles.`],
      [T`A 30-60-90 triangle has hypotenuse 8. How long is the shortest side?`, 4, T`The short leg is half the hypotenuse.`]
    ]
  },
  'The unit circle': {
    hook: T`
<p>Right triangles only cover angles between \(0^\circ\) and \(90^\circ\). The unit circle extends sine and cosine to every angle.</p>
<p>Draw a circle of radius 1 centered at the origin. Measure the angle counterclockwise from the positive \(x\)-axis. Where the angle's ray meets the circle, the <b>\(x\)-coordinate is \(\cos\theta\)</b> and the <b>\(y\)-coordinate is \(\sin\theta\)</b>. That is the definition; every other fact follows from it.</p>
${fig('unitCircle', {}, 'Step through the angles. Watch the signs: x is negative on the left half, y is negative on the bottom half.')}
<p>In quadrant I the point makes a right triangle with hypotenuse 1, so this matches SOH-CAH-TOA. Every other angle borrows its values from a quadrant-I reference angle and takes its signs from its quadrant.</p>`,
    more: T`${fig('unitChart', {}, 'The sixteen standard angles. Learn quadrant I; the rest are reflections of it.')}`,
    vary: [
      [T`Evaluate \(\cos 60^\circ\).`, 0.5, T`Quadrant I: everything positive.`],
      [T`Evaluate \(\cos 120^\circ\).`, -0.5, T`Same reference angle (\(60^\circ\)), now in quadrant II where \(x < 0\).`],
      [T`Evaluate \(\cos 240^\circ\).`, -0.5, T`Quadrant III: \(x\) is still negative.`],
      [T`Evaluate \(\cos 300^\circ\).`, 0.5, T`Quadrant IV: \(x\) is positive again.`],
      [T`Evaluate \(\sin 300^\circ\).`, [T`\(-\tfrac{\sqrt3}{2}\)`, T`\(\tfrac{\sqrt3}{2}\)`, T`\(-\tfrac12\)`], T`Same point, other coordinate. In quadrant IV, \(y < 0\).`]
    ]
  },
  'Graphs of sine and cosine': {
    hook: T`
<p>Run the unit-circle point around and record its height at each angle. That record is the sine wave. One lap is \(2\pi\), so the wave repeats every \(2\pi\).</p>
${fig('sineWave', {}, 'The height of the point on the circle becomes the height of the wave.')}
<p>Cosine is the same wave started at its peak, shifted left by \(\frac\pi2\).</p>
<p>In \(y = A\sin\big(B(x - C)\big) + D\) each letter does one job. \(A\) stretches the height, \(B\) squeezes the repeats, \(C\) slides the wave sideways, and \(D\) lifts the middle line.</p>`,
    more: T`${fig('sinGraph', {}, 'Change one letter at a time and name what moved.')}`,
    vary: [
      [T`What is the amplitude of \(y = 3\sin x\)?`, 3, T`Start here: \(A = 3\).`],
      [T`What is the amplitude of \(y = 3\sin 2x\)?`, 3, T`\(B\) changed. It squeezes the wave sideways but leaves the height alone.`],
      [T`What is the period of \(y = 3\sin 2x\)?`, [T`\(\pi\)`, T`\(2\pi\)`, T`\(4\pi\)`], T`\(\frac{2\pi}{2}\): twice the speed, half the period.`],
      [T`What is the maximum of \(y = 3\sin 2x + 1\)?`, 4, T`\(D = 1\) lifts the whole wave.`],
      [T`What is the minimum of \(y = -3\sin 2x + 1\)?`, -2, T`The flip swaps peaks and troughs; the range \([-2, 4]\) is unchanged.`]
    ]
  },
  'Other trigonometric graphs': {
    hook: T`
<p>\(\tan\theta = \frac{\sin\theta}{\cos\theta}\) is the slope of the angle's ray. At \(\theta = \frac\pi2\) the ray points straight up, its slope is undefined, and the graph shoots off to infinity: a vertical asymptote.</p>
<p>Tangent repeats every \(\pi\), half a lap, because the ray at \(\theta + \pi\) lies along the same line, pointing the other way.</p>
${fig('tanGraph', {}, T`Asymptotes sit where \(\cos x = 0\).`)}`,
    vary: [
      [T`Evaluate \(\tan\frac\pi4\).`, 1, T`A \(45^\circ\) ray has slope 1.`],
      [T`Evaluate \(\tan\frac{5\pi}4\).`, 1, T`Half a lap later: the same line, the same slope.`],
      [T`Evaluate \(\tan\frac{3\pi}4\).`, -1, T`This ray points into quadrant II, sloping down.`],
      [T`How many vertical asymptotes does \(\tan x\) have in \((0, 2\pi)\)?`, 2, T`At \(\frac\pi2\) and \(\frac{3\pi}2\).`],
      [T`What is the period of \(\tan 2x\)?`, [T`\(\frac\pi2\)`, T`\(\pi\)`, T`\(2\pi\)`], T`Tangent's period \(\pi\), divided by 2.`]
    ]
  },
  'Fundamental identities': {
    hook: T`
<p>An identity is an equation that is true for every angle. The most important one is the Pythagorean theorem in disguise.</p>
<p>On the unit circle the legs of the triangle are \(\cos\theta\) and \(\sin\theta\), and the hypotenuse is 1. So \(\cos^2\theta + \sin^2\theta = 1\) for every angle.</p>
${fig('pythagUnit', {}, 'Whatever the angle, the squares add to 1.')}
<p>Divide that identity by \(\cos^2\theta\) and you get \(1 + \tan^2\theta = \sec^2\theta\). Divide by \(\sin^2\theta\) and you get the cotangent version.</p>`,
    vary: [
      [T`If \(\sin\theta = 0.6\) and \(\theta\) is acute, find \(\cos\theta\).`, 0.8, T`\(\sqrt{1 - 0.36}\).`],
      [T`If \(\sin\theta = 0.6\) and \(\theta\) is in quadrant II, find \(\cos\theta\).`, -0.8, T`Same size, but the quadrant sets the sign.`],
      [T`If \(\cos\theta = 0.8\) and \(\theta\) is acute, find \(\tan\theta\).`, 0.75, T`\(\sin\theta = 0.6\), then divide.`],
      [T`If \(\tan\theta = 2\), find \(\sec^2\theta\).`, 5, T`\(1 + \tan^2\theta\).`],
      [T`Evaluate \(\sin^2(1.3) + \cos^2(1.3)\).`, 1, T`True for every angle, so no calculator is needed.`]
    ]
  },
  'Sum, difference, and double angle': {
    hook: T`
<p>\(\sin(a + b)\) is not \(\sin a + \sin b\). Adding angles is a rotation, and a rotation mixes sine and cosine together. The sum formulas record exactly how.</p>
<p>They let you build exact values for new angles from the ones you know: \(75^\circ = 45^\circ + 30^\circ\), \(15^\circ = 45^\circ - 30^\circ\). The double-angle formulas are the special case where both angles are equal.</p>`,
    vary: [
      [T`Evaluate \(\sin(30^\circ + 60^\circ)\).`, 1, T`It is \(\sin 90^\circ\). Note \(\sin30^\circ + \sin60^\circ \approx 1.37\), which is wrong.`],
      [T`Evaluate \(\cos(30^\circ + 60^\circ)\).`, 0, T`\(\cos 90^\circ\).`],
      [T`If \(\sin x = 0.6\) and \(\cos x = 0.8\), find \(\sin 2x\).`, 0.96, T`\(2(0.6)(0.8)\).`],
      [T`Same \(x\). Find \(\cos 2x\).`, 0.28, T`\(\cos^2 x - \sin^2 x = 0.64 - 0.36\).`],
      [T`If \(\sin x = 0.8\) and \(\cos x = 0.6\), find \(\cos 2x\).`, -0.28, T`Swapping sine and cosine flips the sign of \(\cos 2x\).`]
    ]
  },
  'Proving identities': {
    hook: T`
<p>Proving an identity means showing two different-looking expressions are the same thing in disguise. Pick the messier side and simplify it, one legal step at a time, until it becomes the other side.</p>
<p>When stuck, rewrite everything in sines and cosines. Almost every identity opens up that way.</p>`,
    vary: [
      [T`Simplify \(\tan x\cos x\).`, [T`\(\sin x\)`, T`\(\cos x\)`, T`\(1\)`], T`\(\frac{\sin x}{\cos x}\cdot\cos x\).`],
      [T`Simplify \(\sec x\cos x\).`, [T`\(1\)`, T`\(\sin x\)`, T`\(\sec^2 x\)`], T`Reciprocals multiply to 1.`],
      [T`Simplify \(\dfrac{1 - \cos^2 x}{\sin x}\).`, [T`\(\sin x\)`, T`\(\cos x\)`, T`\(\tan x\)`], T`The top is \(\sin^2 x\).`],
      [T`Simplify \(\dfrac{1 - \sin^2 x}{\cos x}\).`, [T`\(\cos x\)`, T`\(\sin x\)`, T`\(\sec x\)`], T`The previous problem with sine and cosine swapped.`]
    ]
  },
  'Inverse trigonometric functions': {
    hook: T`
<p>Sine takes an angle and returns a ratio. Arcsine runs backward: given the ratio, which angle produced it?</p>
<p>The difficulty is that many angles share a sine: \(30^\circ\), \(150^\circ\), \(390^\circ\), and so on. To give one answer, arcsine reports only angles between \(-90^\circ\) and \(90^\circ\).</p>
${fig('inverseSin', {}, T`The bold piece of \(\sin x\), reflected across \(y = x\), is \(\arcsin x\).`)}`,
    vary: [
      [T`Find \(\arcsin\frac12\) in degrees.`, 30, T`The angle in \([-90^\circ, 90^\circ]\) with sine \(\frac12\).`],
      [T`Find \(\arcsin\left(-\frac12\right)\) in degrees.`, -30, T`Arcsine is odd: the sign passes straight through.`],
      [T`Find \(\arccos\frac12\) in degrees.`, 60, T`Now cosine.`],
      [T`Find \(\arccos\left(-\frac12\right)\) in degrees.`, 120, T`Arccosine reports angles from \(0^\circ\) to \(180^\circ\), so a negative input lands in quadrant II.`],
      [T`Find \(\arctan 1\) in degrees.`, 45, T`The angle whose ray has slope 1.`]
    ]
  },
  'Trigonometric equations': {
    hook: T`
<p>\(\sin x = \frac12\) has infinitely many solutions, because the wave keeps crossing the line \(y = \frac12\). Within one lap, \([0, 2\pi)\), it crosses twice.</p>
${fig('trigEq', {}, T`Two crossings per lap: \(\frac\pi6\) and \(\frac{5\pi}6\).`)}
<p>The method: find the reference angle, decide which quadrants give the right sign, and list the angles there. For all solutions, add whole periods.</p>`,
    vary: [
      [T`How many solutions does \(\sin x = \frac12\) have on \([0, 2\pi)\)?`, 2, T`Quadrants I and II.`],
      [T`How many solutions does \(\sin x = -\frac12\) have on \([0, 2\pi)\)?`, 2, T`Negative sine: quadrants III and IV.`],
      [T`How many solutions does \(\sin x = 1\) have on \([0, 2\pi)\)?`, 1, T`The line touches the top of the wave once.`],
      [T`How many solutions does \(\sin x = 2\) have?`, 0, T`Sine never exceeds 1.`],
      [T`How many solutions does \(\sin 2x = \frac12\) have on \([0, 2\pi)\)?`, 4, T`Doubling the frequency fits two laps into the interval, doubling the crossings.`]
    ]
  },
  'Law of sines and cosines': {
    hook: T`
<p>Most triangles have no right angle. Label each side with the lowercase letter of the angle across from it.</p>
${fig('oblique', {}, T`Side \(a\) faces angle \(A\), and so on.`)}
<p>The law of cosines is the Pythagorean theorem with a correction term. When angle \(C\) is wider than \(90^\circ\), side \(c\) comes out longer than the Pythagorean value; when narrower, shorter.</p>
<p>The law of sines says each side is proportional to the sine of its opposite angle: the bigger the angle, the longer the side across from it.</p>`,
    more: T`${fig('ssa', {}, 'Given two sides and a non-included angle, the third side can swing to two positions: the ambiguous case.')}`,
    vary: [
      [T`\(a = 3\), \(b = 4\), \(C = 90^\circ\). Find \(c\).`, 5, T`\(\cos 90^\circ = 0\): plain Pythagoras.`],
      [T`\(a = 3\), \(b = 4\), \(C = 60^\circ\). Find \(c^2\).`, 13, T`\(25 - 24\cos60^\circ\). A narrower angle gives a shorter side.`],
      [T`\(a = 3\), \(b = 4\), \(C = 120^\circ\). Find \(c^2\).`, 37, T`\(\cos120^\circ = -\frac12\), so the correction adds.`],
      [T`\(a = 3\), \(b = 4\), \(C = 30^\circ\). Find the triangle's area.`, 3, T`\(\frac12ab\sin C = \frac12(12)\left(\frac12\right)\).`]
    ]
  }
});
