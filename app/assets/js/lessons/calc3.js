registerLessons('calc3', {
  'Vectors and the dot product': {
    hook: T`
<p>A vector is an arrow: a length and a direction, with no fixed starting point. Add vectors tip to tail; the sum is the diagonal of the parallelogram they form.</p>
${fig('vecAdd', {}, T`\(u + v\) is the diagonal of the parallelogram.`)}
<p>The dot product measures how much two vectors point the same way: \(u\cdot v = |u||v|\cos\theta\). It is positive when they roughly agree, zero when they are perpendicular, and negative when they oppose.</p>`,
    more: T`${fig('dotProj', {}, 'The dot product is |u| times the signed length of the shadow of v on u.')}`,
    vary: [
      [T`Compute \((3, 1)\cdot(1, 2)\).`, 5, T`\(3 + 2\).`],
      [T`Compute \((3, 1)\cdot(-2, 6)\).`, 0, T`Zero: these vectors are perpendicular.`],
      [T`Find \(|(3, 4)|\).`, 5, T`\(\sqrt{9 + 16}\).`],
      [T`Find \(|(1, 2, 2)|\).`, 3, T`A third component just adds a third square.`],
      [T`Find the angle between \((1, 0)\) and \((1, 1)\), in degrees.`, 45, T`\(\cos\theta = \frac{1}{1\cdot\sqrt2}\).`]
    ]
  },
  'The cross product': {
    hook: T`
<p>In three dimensions, two vectors span a parallelogram. The cross product \(u\times v\) is a vector perpendicular to both, whose length is that parallelogram's area. Its direction follows the right-hand rule: curl your fingers from \(u\) toward \(v\) and your thumb points along \(u\times v\).</p>
${fig('cross3', {}, 'u and v lie flat; u × v stands straight up.')}
<p>Swapping the order flips the direction: \(v\times u = -(u\times v)\).</p>`,
    vary: [
      [T`\(\mathbf i\times\mathbf j\) equals:`, [T`\(\mathbf k\)`, T`\(-\mathbf k\)`, T`\(\mathbf 0\)`], T`The right-hand rule from \(x\) to \(y\) points along \(z\).`],
      [T`\(\mathbf j\times\mathbf i\) equals:`, [T`\(-\mathbf k\)`, T`\(\mathbf k\)`, T`\(\mathbf 0\)`], T`Reversing the order reverses the result.`],
      [T`Find \(|(1,0,0)\times(0,2,0)|\).`, 2, T`A 1-by-2 rectangle.`],
      [T`Find the area of the parallelogram spanned by \((3,0,0)\) and \((1,2,0)\).`, 6, T`Base 3, height 2.`],
      [T`\(u\times u\) equals:`, [T`\(\mathbf 0\)`, T`\(|u|^2\)`, T`\(u\)`], T`A flat parallelogram has no area.`]
    ]
  },
  'Lines and planes': {
    hook: T`
<p>A line needs a point and a direction: start at the point and walk along the direction vector. A plane needs a point and a normal vector: the plane is every point you can reach while staying perpendicular to the normal.</p>
${fig('linePlane', {}, T`The normal \(n\) sticks straight out of the plane.`)}
<p>That is why the coefficients in \(ax + by + cz = d\) are the normal vector \((a, b, c)\).</p>`,
    vary: [
      [T`Find the \(z\)-intercept of the plane \(2x + y - z = 4\).`, -4, T`Set \(x = y = 0\).`],
      [T`Find its \(x\)-intercept.`, 2, T`Set \(y = z = 0\).`],
      [T`What is the first component of a normal vector read from \(2x + y - z = 4\)?`, 2, T`The normal is \((2, 1, -1)\).`],
      [T`The line \(r(t) = (1, 2, 3) + t(2, 0, 1)\). Find \(z\) at \(t = 2\).`, 5, T`\(3 + 2\cdot1\).`],
      [T`Find the distance from the origin to the plane \(x + 2y + 2z = 6\).`, 2, T`\(\frac{|d|}{|n|} = \frac63\).`]
    ]
  },
  'Curves and motion': {
    hook: T`
<p>A vector function \(r(t)\) gives a position at each time, tracing a curve. Its derivative \(r'(t)\) is the velocity: tangent to the curve, with length equal to the speed.</p>
${fig('helix', {}, 'A helix: circling while rising.')}`,
    vary: [
      [T`\(r(t) = (t, t^2)\). Find the \(y\)-component of velocity at \(t = 3\).`, 6, T`\(\frac{d}{dt}t^2 = 2t\).`],
      [T`Find the speed of \(r(t) = (3t, 4t)\).`, 5, T`\(|(3, 4)|\), constant.`],
      [T`Find the speed of \(r(t) = (\cos t, \sin t)\).`, 1, T`Velocity \((-\sin t, \cos t)\) has length 1.`],
      [T`Find the speed of \(r(t) = (2\cos t, 2\sin t)\).`, 2, T`A bigger circle at the same angular rate is faster.`],
      [T`Find the arc length of \(r(t) = (3t, 4t)\) for \(0 \le t \le 2\).`, 10, T`Speed times time.`]
    ]
  },
  'Functions of several variables and limits': {
    hook: T`
<p>On a line you can approach a point from only two sides. In the plane you can approach from infinitely many directions, along lines or along curves. A limit exists only if every approach gives the same value.</p>
${fig('pathsLimit', {}, T`\(f = \dfrac{xy}{x^2 + y^2}\) along different lines into the origin. The values disagree, so there is no limit.`)}`,
    vary: [
      [T`Find \(\lim_{(x,y)\to(1,2)}(x^2 + y^2)\).`, 5, T`Continuous: substitute.`],
      [T`For \(f = \dfrac{xy}{x^2 + y^2}\), find the limit along \(y = x\).`, 0.5, T`\(\frac{x^2}{2x^2}\).`],
      [T`Same \(f\), along \(y = 0\).`, 0, T`A different path, a different value: the limit does not exist.`],
      [T`Same \(f\), along \(y = 2x\).`, 0.4, T`\(\frac{2x^2}{5x^2}\).`]
    ]
  },
  'Partial derivatives and the chain rule': {
    hook: T`
<p>Freeze every variable but one and differentiate as usual. \(f_x\) is the slope of the surface when you walk in the \(x\)-direction with \(y\) held fixed.</p>
${fig('surface', { slice: true }, 'Slicing the surface at fixed y leaves an ordinary curve.')}`,
    vary: [
      [T`\(f = x^2y\). Find \(f_x\) at \((1, 3)\).`, 6, T`Treat \(y\) as a constant: \(2xy\).`],
      [T`Same \(f\). Find \(f_y\) at \((1, 3)\).`, 1, T`Now \(x\) is the constant: \(x^2\).`],
      [T`\(f = x^2y + y^3\). Find \(f_y\) at \((1, 3)\).`, 28, T`\(x^2 + 3y^2\).`],
      [T`\(f = e^{xy}\). Find \(f_x\) at \((0, 5)\).`, 5, T`\(ye^{xy}\).`],
      [T`\(f = x^2y\). Find \(f_{xy}\) at \((1, 3)\).`, 2, T`Differentiate \(2xy\) with respect to \(y\).`]
    ]
  },
  'Gradient and directional derivatives': {
    hook: T`
<p>On a topographic map, contour lines join points of equal height. The gradient \(\nabla f\) is an arrow pointing straight uphill, perpendicular to the contours, and its length is the steepest slope available.</p>
${fig('contourGrad', {}, 'Red arrows: the gradient, crossing contours at right angles.')}
<p>The slope in any other direction \(u\) is \(\nabla f\cdot u\).</p>`,
    vary: [
      [T`\(f = x^2 + y^2\). Find the \(x\)-component of \(\nabla f\) at \((1, 2)\).`, 2, T`\(\nabla f = (2x, 2y)\).`],
      [T`Find \(|\nabla f|\) at \((1, 2)\).`, Math.sqrt(20), T`\(|(2, 4)|\): the steepest slope.`],
      [T`Find the slope at \((1, 2)\) in the direction \((1, 0)\).`, 2, T`\((2, 4)\cdot(1, 0)\).`],
      [T`Find the slope in the direction \((0, 1)\).`, 4, T`\((2, 4)\cdot(0, 1)\).`],
      [T`Find the slope in a direction perpendicular to \(\nabla f\).`, 0, T`Walking along a contour keeps the height constant.`]
    ]
  },
  'Tangent planes and linearization': {
    hook: T`
<p>Zoom in far enough on a smooth surface and it looks flat. That flat piece is the tangent plane, and it gives quick estimates near the point: \(f(x, y) \approx f(a, b) + f_x\,\Delta x + f_y\,\Delta y\).</p>
${fig('surface', { tp: true }, 'The red patch is the tangent plane.')}`,
    vary: [
      [T`\(f = x^2 + y^2\) at \((1, 1)\): the tangent plane is \(z = 2 + 2(x - 1) + 2(y - 1)\). Estimate \(f(1.1, 1)\).`, 2.2, T`Step \(0.1\) in \(x\) at slope 2.`],
      [T`Estimate \(f(1.1, 0.9)\).`, 2, T`The two steps cancel.`],
      [T`Compute the true value \(f(1.1, 0.9)\).`, 2.02, T`\(1.21 + 0.81\). The estimate was off by 0.02.`],
      [T`For \(f = xy\) at \((2, 3)\), what is the coefficient of \((x - 2)\) in the tangent plane?`, 3, T`\(f_x = y = 3\).`]
    ]
  },
  'Local extrema': {
    hook: T`
<p>At a peak or valley of a smooth surface, both partial derivatives are zero. But a zero gradient can also be a saddle: up in one direction, down in another.</p>
${fig('surface', {}, 'Switch between the bowl and the saddle.')}
<p>The second derivative test uses \(D = f_{xx}f_{yy} - f_{xy}^2\). \(D > 0\) means a true extremum; \(D < 0\) means a saddle.</p>`,
    vary: [
      [T`\(f = x^2 + y^2\). Find \(D\) at the origin.`, 4, T`\(2\cdot2 - 0\): positive, and \(f_{xx} > 0\), so a minimum.`],
      [T`\(f = x^2 - y^2\). Find \(D\) at the origin.`, -4, T`Negative: a saddle.`],
      [T`\(f = x^2 + y^2 - 4x\). Find the \(x\)-coordinate of the critical point.`, 2, T`\(f_x = 2x - 4 = 0\).`],
      [T`\(f = x^2 + xy + y^2\). Find \(D\).`, 3, T`\(2\cdot2 - 1^2\).`],
      [T`Classify the origin for \(f = x^2 + xy + y^2\).`, ['minimum', 'maximum', 'saddle'], T`\(D > 0\) and \(f_{xx} > 0\).`]
    ]
  },
  'Lagrange multipliers': {
    hook: T`
<p>Walk along a fixed path, such as a circle, across a hillside. The highest point on your path is where the path runs along a contour line instead of crossing it. There the two curves are tangent, so their gradients are parallel: \(\nabla f = \lambda\nabla g\).</p>
${fig('lagrange', {}, T`Maximize \(x + y\) on the circle \(x^2 + y^2 = 2\): the best contour just touches the circle at \((1, 1)\).`)}`,
    vary: [
      [T`Find the maximum of \(x + y\) on \(x^2 + y^2 = 2\).`, 2, T`At \((1, 1)\).`],
      [T`Find the minimum of \(x + y\) on the same circle.`, -2, T`At \((-1, -1)\), the opposite tangency.`],
      [T`Find the maximum of \(x + y\) on \(x^2 + y^2 = 8\).`, 4, T`A bigger circle reaches \((2, 2)\).`],
      [T`Find the maximum of \(xy\) subject to \(x + y = 10\).`, 25, T`\(\nabla f = (y, x)\) parallel to \((1, 1)\) gives \(x = y = 5\).`]
    ]
  },
  'Double integrals': {
    hook: T`
<p>A single integral adds up thin strips. A double integral adds up tiny columns over a region: each column has base \(dA\) and height \(f(x, y)\), and together they give the volume under the surface. With \(f = 1\) it gives the region's area.</p>
${fig('dblRegion', {}, T`The region between \(y = x^2\) and \(y = \sqrt x\), filled with small squares.`)}`,
    vary: [
      [T`Find \(\iint 1\,dA\) over \([0, 2]\times[0, 3]\).`, 6, T`The area of the rectangle.`],
      [T`Find \(\iint xy\,dA\) over \([0, 2]\times[0, 3]\).`, 9, T`It separates: \(\int_0^2 x\,dx\cdot\int_0^3 y\,dy = 2\cdot4.5\).`],
      [T`Find \(\iint (x + y)\,dA\) over \([0, 1]\times[0, 1]\).`, 1, T`\(\frac12 + \frac12\).`],
      [T`Find the area between \(y = x^2\) and \(y = \sqrt x\).`, 1 / 3, T`\(\int_0^1(\sqrt x - x^2)\,dx\).`]
    ]
  },
  'Polar, cylindrical, spherical': {
    hook: T`
<p>Circles are awkward in \(x\) and \(y\) but simple in polar coordinates. The catch is the area element. A small polar patch is roughly a rectangle with sides \(dr\) and \(r\,d\theta\), so \(dA = r\,dr\,d\theta\). Patches farther out are bigger.</p>
${fig('polarElement', {}, 'One polar patch.')}`,
    vary: [
      [T`Find the area of a disk of radius 2 using \(\int_0^{2\pi}\!\int_0^2 r\,dr\,d\theta\).`, 4 * Math.PI, T`\(2\pi\cdot2\).`],
      [T`Find \(\iint (x^2 + y^2)\,dA\) over the unit disk.`, Math.PI / 2, T`\(\int_0^{2\pi}\!\int_0^1 r^2\cdot r\,dr\,d\theta\).`],
      [T`Find the volume of a ball of radius 1.`, 4 * Math.PI / 3, T`Spherical coordinates: \(\int\!\int\!\int \rho^2\sin\phi\,d\rho\,d\phi\,d\theta\).`],
      [T`Find the volume of a cylinder with radius 1 and height 2.`, 2 * Math.PI, T`Cylindrical: \(\int_0^2\!\int_0^{2\pi}\!\int_0^1 r\,dr\,d\theta\,dz\).`]
    ]
  },
  'Vector fields, divergence, curl': {
    hook: T`
<p>A vector field attaches an arrow to every point, like a wind map. Two numbers summarize it locally. Divergence measures outflow: is this point a source or a sink? Curl measures spin: would a tiny paddle wheel here rotate?</p>
${fig('field', {}, 'A pure swirl and a pure source.')}`,
    vary: [
      [T`Find the divergence of \(F = (x, y)\).`, 2, T`\(\partial_x x + \partial_y y\).`],
      [T`Find the divergence of \(F = (-y, x)\).`, 0, T`A swirl creates no outflow.`],
      [T`Find the (scalar) curl \(\partial_x Q - \partial_y P\) of \(F = (-y, x)\).`, 2, T`\(1 - (-1)\).`],
      [T`Find the divergence of \(F = (x^2, y)\) at \((1, 1)\).`, 3, T`\(2x + 1\).`],
      [T`Find the curl of \(F = (x, y)\).`, 0, T`A source spreads out without spinning.`]
    ]
  },
  'Line integrals and conservative fields': {
    hook: T`
<p>Pushing a cart along a path through a force field, the work is the sum of force times displacement, \(\int F\cdot dr\).</p>
${fig('lineInt', {}, 'Moving with a swirling field the whole way round accumulates work.')}
<p>Some fields are gradients of a potential, like elevation. For those, only the endpoints matter, and any closed loop gives zero, just as hiking a loop returns you to your starting height.</p>`,
    vary: [
      [T`Find the work by \(F = (-y, x)\) once counterclockwise around the unit circle.`, 2 * Math.PI, T`\(F\) is tangent with length 1 all the way: \(1\cdot2\pi\).`],
      [T`Same field, around the circle of radius 2.`, 8 * Math.PI, T`Twice the force over twice the distance.`],
      [T`\(F = \nabla(xy)\). Find the work from \((0, 0)\) to \((2, 3)\).`, 6, T`Potential difference: \(6 - 0\).`],
      [T`\(F = \nabla(x^2 + y^2)\). Find the work around any closed loop.`, 0, T`Conservative: start and end heights match.`]
    ]
  },
  "Green's theorem": {
    hook: T`
<p>Cut a region into small cells and add up the circulation around each one. Every interior edge is traveled twice in opposite directions and cancels, leaving only the outer boundary.</p>
${fig('greenCells', {}, 'Interior edges cancel; the boundary remains.')}
<p>That is Green's theorem: circulation around the boundary equals the total curl inside.</p>`,
    vary: [
      [T`Use Green's theorem for \(F = (-y, x)\) around the unit circle: \(\iint 2\,dA\).`, 2 * Math.PI, T`Curl 2 times area \(\pi\).`],
      [T`Same field around the unit square \([0, 1]^2\).`, 2, T`Curl 2 times area 1.`],
      [T`The area of a region is \(\tfrac12\oint(x\,dy - y\,dx)\). For the unit circle, what is it?`, Math.PI, T`Half of the previous circle result.`],
      [T`\(F = (y, x)\). Find its circulation around any closed loop.`, 0, T`Its curl is \(1 - 1 = 0\).`]
    ]
  },
  'Stokes and the divergence theorem': {
    hook: T`
<p>The divergence theorem says the total flow out through a closed surface equals the total source strength inside. If water pours out of a balloon, something inside is producing it.</p>
${fig('fluxOut', {}, 'Sources inside show up as flow through the boundary.')}
<p>Stokes' theorem is Green's theorem on a curved surface: circulation around the edge equals the total curl through the surface.</p>`,
    vary: [
      [T`Find the divergence of \(F = (x, y, z)\).`, 3, T`One from each component.`],
      [T`Find the flux of \(F = (x, y, z)\) out of the unit sphere.`, 4 * Math.PI, T`Divergence 3 times volume \(\frac43\pi\).`],
      [T`Find the flux of the same field out of the unit cube \([0, 1]^3\).`, 3, T`Divergence 3 times volume 1.`],
      [T`Find the divergence of the curl of any smooth field.`, 0, T`\(\nabla\cdot(\nabla\times F) = 0\) always.`]
    ]
  }
});
