registerSubject({
  id: 'physics', name: 'General physics', color: '#A04B24',
  blurb: 'Calculus-based introductory physics: mechanics, energy, waves, fluids, circuits, fields, thermodynamics; the base for the theory subjects',
  questions: [
    { id: 'ph1', skill: "Newton's laws", q: T`An object moves at constant velocity. The net force on it is:`,
      c: ['zero', 'in the direction of motion', 'opposite the motion', 'equal to its weight'],
      x: T`Constant velocity means \(\mathbf a = \mathbf 0\), so \(\sum\mathbf F = m\mathbf a = \mathbf 0\).` },
    { id: 'ph2', skill: 'Kinematics', q: T`At the top of a projectile's path (no air resistance), its acceleration is:`,
      c: [T`\(9.8\ \text{m/s}^2\) downward`, 'zero', 'horizontal', 'upward'],
      x: T`Gravity acts throughout the flight. Only the vertical velocity is zero at the top.` },
    { id: 'ph3', skill: 'Kinematics', q: T`A heavy ball and a light ball are dropped together from the same height (no air resistance). Which lands first?`,
      c: ['They land together', 'The heavy ball', 'The light ball', 'It depends on their volumes'],
      x: T`Gravitational force scales with mass, and so does inertia; \(a = g\) for both.` },
    { id: 'ph4', skill: 'Circular motion', q: T`In uniform circular motion, the acceleration points:`,
      c: ['toward the center', 'along the velocity', 'away from the center', 'nowhere; it is zero'],
      x: T`Speed is constant but direction changes. \(a_c = v^2/r\), directed inward.` },
    { id: 'ph5', skill: "Newton's laws", q: T`A truck collides head-on with a small car. During the collision, the force on the car is:`,
      c: ['equal in magnitude to the force on the truck', 'larger than the force on the truck', 'smaller than the force on the truck', 'zero'],
      x: T`Newton's third law. The car accelerates more because its mass is smaller.` },
    { id: 'ph6', skill: 'Momentum', q: T`In a perfectly inelastic collision between two carts on a frictionless track:`,
      c: ['momentum is conserved, kinetic energy is not', 'both are conserved', 'kinetic energy is conserved, momentum is not', 'neither is conserved'],
      x: T`No external horizontal force acts, so momentum is conserved. Kinetic energy goes into deformation and heat.` },
    { id: 'ph7', skill: 'Oscillations', q: T`The period of a simple pendulum (small angles) depends on:`,
      c: [T`its length and \(g\)`, 'its mass and length', 'its amplitude', 'its mass only'],
      x: T`\(T = 2\pi\sqrt{L/g}\); mass cancels.` },
    { id: 'ph8', skill: 'Oscillations', q: T`The mass on a spring is doubled. The period of oscillation:`,
      c: [T`is multiplied by \(\sqrt 2\)`, 'doubles', 'halves', 'is unchanged'],
      x: T`\(T = 2\pi\sqrt{m/k} \propto \sqrt m\).` },
    { id: 'ph9', skill: 'Energy', q: T`If an object's speed doubles, its kinetic energy:`,
      c: ['quadruples', 'doubles', 'is unchanged', 'halves'],
      x: T`\(K = \frac12 mv^2 \propto v^2\).` },
    { id: 'ph10', skill: 'Energy', q: T`A block slides across a horizontal floor. The work done on it by the normal force is:`,
      c: ['zero', 'positive', 'negative', 'equal to the work done by friction'],
      x: T`The normal force is perpendicular to the displacement: \(W = Fd\cos 90^\circ = 0\).` },
    { id: 'ph11', skill: 'Circuits', q: T`Several resistors in parallel have an equivalent resistance that is:`,
      c: ['less than the smallest resistor', 'greater than the largest resistor', 'the average of the resistors', 'equal to the sum'],
      x: T`Each branch adds another path for current, so \(1/R\) grows with every branch.` },
    { id: 'ph12', skill: 'Fields', q: T`Lenz's law states that an induced current:`,
      c: ['opposes the change in magnetic flux that produced it', 'reinforces the change in flux', 'flows parallel to the magnetic field', 'is independent of the rate of change'],
      x: T`This is the minus sign in Faraday's law, \(\mathcal E = -d\Phi_B/dt\), a consequence of energy conservation.` },
    { id: 'ph13', skill: 'Fields', q: T`Gauss's law relates the electric flux through a closed surface to:`,
      c: ['the net charge enclosed', 'the surface area', 'the charge outside the surface', 'the current through the surface'],
      x: T`\(\oint\mathbf E\cdot d\mathbf A = Q_\text{enc}/\varepsilon_0\). Outside charges contribute zero net flux.` },
    { id: 'ph14', skill: 'Fields', q: T`The magnetic force on a moving charged particle:`,
      c: ['does no work on it', 'always speeds it up', 'always slows it down', 'points along its velocity'],
      x: T`\(\mathbf F = q\mathbf v\times\mathbf B\) is perpendicular to \(\mathbf v\), so it changes direction but not speed.` },
    { id: 'ph15', skill: 'Thermodynamics', q: T`With \(W\) as work done by the system, the first law of thermodynamics is:`,
      c: [T`\(\Delta U = Q - W\)`, T`\(\Delta U = Q + W\)`, T`\(Q = \Delta U - W\)`, T`\(\Delta U = W - Q\)`],
      x: T`Heat added raises internal energy; work the system does on its surroundings lowers it.` },
    { id: 'ph16', skill: 'Thermodynamics', q: T`An ideal gas expands isothermally. Which is true?`,
      c: [T`\(\Delta U = 0\), so \(Q = W\)`, T`\(Q = 0\)`, T`\(W = 0\)`, 'Its temperature drops'],
      x: T`Ideal-gas internal energy depends only on \(T\), which is constant. All heat absorbed is converted to work.` },
    { id: 'ph17', skill: 'Circular motion', q: T`A satellite moves to a larger circular orbit. Its orbital speed:`,
      c: ['decreases', 'increases', 'stays the same', 'drops to zero'],
      x: T`\(v = \sqrt{GM/r}\) falls as \(r\) grows.` },
    { id: 'ph18', skill: 'Waves', q: T`A wave's frequency doubles while it stays in the same medium. Its wavelength:`,
      c: ['halves', 'doubles', 'is unchanged', 'quadruples'],
      x: T`The medium fixes \(v = f\lambda\), so \(\lambda\) scales as \(1/f\).` },
    { id: 'ph19', skill: 'Rotation', q: T`For a fixed force magnitude and lever arm, torque is largest when the force is:`,
      c: ['perpendicular to the lever arm', 'parallel to the lever arm', 'at 45 degrees', 'directed at the pivot'],
      x: T`\(\tau = rF\sin\theta\) peaks at \(\theta = 90^\circ\). A force aimed at the pivot gives zero torque.` },
    { id: 'ph20', skill: "Newton's laws", q: T`An object falling at terminal velocity has:`,
      c: ['zero acceleration', 'acceleration \\(g\\) downward', 'acceleration \\(g\\) upward', 'zero net velocity'],
      x: T`Drag has grown to equal the weight, so the net force is zero.` },
    { id: 'ph21', skill: 'Fluids', q: T`The buoyant force on a submerged object equals:`,
      c: ['the weight of the fluid it displaces', 'its own weight', 'its volume times its density', 'the fluid pressure at its depth'],
      x: T`Archimedes' principle: \(F_b = \rho_\text{fluid} V_\text{sub} g\).` },
    { id: 'ph22', skill: 'Momentum', q: T`Impulse is equal to:`,
      c: ['the change in momentum', 'the change in kinetic energy', 'force times distance', 'mass times acceleration'],
      x: T`\(\mathbf J = \int\mathbf F\,dt = \Delta\mathbf p\). Force times distance is work.` }
  ],
  generators: [
    { id: 'phg-stop', skill: 'Kinematics', make(R) {
      const v = R.int(10, 35), a = R.pick([3, 4, 5, 6, 7, 8]), d = v * v / (2 * a);
      return { q: T`A car moving at ${v} m/s brakes with constant deceleration ${a} m/s². How far does it travel before stopping, in meters?`, answer: d, tol: 0.1, hint: 'Round to 1 decimal.',
        x: T`\(v^2 = v_0^2 + 2a\Delta x\) with \(v = 0\): \(\Delta x = \frac{v_0^2}{2a} = \frac{${v}^2}{2(${a})} = ${R.fmt(d, 1)}\) m.` };
    } },
    { id: 'phg-fall', skill: 'Kinematics', make(R) {
      const h = R.int(5, 120), t = Math.sqrt(2 * h / 9.8);
      return { q: T`An object is dropped from rest ${h} m above the ground. How long does it take to land, in seconds? Use \(g = 9.8\ \text{m/s}^2\).`, answer: t, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(h = \frac12 gt^2\), so \(t = \sqrt{2h/g} = \sqrt{${2 * h}/9.8} = ${R.fmt(t, 2)}\) s.` };
    } },
    { id: 'phg-proj', skill: 'Kinematics', make(R) {
      const v = R.int(4, 25), h = R.int(2, 60), t = Math.sqrt(2 * h / 9.8), x = v * t;
      return { q: T`A ball is launched horizontally at ${v} m/s from a height of ${h} m. How far from the base does it land, in meters? Use \(g = 9.8\ \text{m/s}^2\).`, answer: x, tol: 0.05, hint: 'Round to 1 decimal.',
        x: T`Fall time \(t = \sqrt{2(${h})/9.8} = ${R.fmt(t, 3)}\) s. Horizontal distance \(= v t = ${v}(${R.fmt(t, 3)}) = ${R.fmt(x, 1)}\) m.` };
    } },
    { id: 'phg-fric', skill: "Newton's laws", make(R) {
      const m = R.int(2, 20), mu = R.pick([0.1, 0.15, 0.2, 0.25, 0.3]), fr = mu * m * 9.8, F = Math.ceil(fr) + R.int(5, 60), a = (F - fr) / m;
      return { q: T`A ${m} kg box is pushed across a floor with a horizontal force of ${F} N. The coefficient of kinetic friction is ${mu}. Find the acceleration in m/s². Use \(g = 9.8\ \text{m/s}^2\).`, answer: a, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`Friction \(= \mu mg = ${mu}(${m})(9.8) = ${R.fmt(fr, 2)}\) N. \(a = \frac{${F} - ${R.fmt(fr, 2)}}{${m}} = ${R.fmt(a, 2)}\) m/s².` };
    } },
    { id: 'phg-energy', skill: 'Energy', make(R) {
      const h = R.int(1, 50), v = Math.sqrt(2 * 9.8 * h);
      return { q: T`A sled starts from rest and slides down a frictionless hill with a vertical drop of ${h} m. What is its speed at the bottom, in m/s? Use \(g = 9.8\ \text{m/s}^2\).`, answer: v, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(mgh = \frac12 mv^2\), so \(v = \sqrt{2gh} = \sqrt{2(9.8)(${h})} = ${R.fmt(v, 2)}\) m/s. Mass and path shape do not matter.` };
    } },
    { id: 'phg-inel', skill: 'Momentum', make(R) {
      const m1 = R.int(1, 10), v1 = R.int(2, 15), m2 = R.int(1, 10), v2 = R.pick([0, 0, -R.int(1, 5)]), vf = (m1 * v1 + m2 * v2) / (m1 + m2);
      return { q: T`A ${m1} kg cart moving at ${v1} m/s collides with a ${m2} kg cart ${v2 === 0 ? 'at rest' : `moving at ${-v2} m/s in the opposite direction`}. They stick together. Find their final velocity in m/s (positive in the first cart's direction).`, answer: vf, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(v_f = \frac{m_1v_1 + m_2v_2}{m_1+m_2} = \frac{${m1}(${v1}) + ${m2}(${v2})}{${m1 + m2}} = ${R.fmt(vf, 2)}\) m/s.` };
    } },
    { id: 'phg-circuit', skill: 'Circuits', make(R) {
      const R1 = R.pick([2, 4, 5, 10, 12]), R2 = R.pick([3, 6, 12, 20]), R3 = R.pick([4, 6, 12, 30]), V = R.pick([6, 9, 12, 24]);
      const Rp = R2 * R3 / (R2 + R3), Rt = R1 + Rp, I = V / Rt;
      return { q: T`A ${V} V battery drives \(R_1 = ${R1}\ \Omega\) in series with a parallel pair \(R_2 = ${R2}\ \Omega\) and \(R_3 = ${R3}\ \Omega\). What current flows from the battery, in amperes?`, answer: I, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(R_{23} = \frac{${R2}\cdot${R3}}{${R2}+${R3}} = ${R.fmt(Rp, 3)}\ \Omega\). \(R_\text{total} = ${R1} + ${R.fmt(Rp, 3)} = ${R.fmt(Rt, 3)}\ \Omega\). \(I = V/R = ${V}/${R.fmt(Rt, 3)} = ${R.fmt(I, 2)}\) A.` };
    } },
    { id: 'phg-pend', skill: 'Oscillations', make(R) {
      const L = R.pick([0.25, 0.5, 0.8, 1, 1.5, 2, 2.5, 3]), T0 = 2 * Math.PI * Math.sqrt(L / 9.8);
      return { q: T`What is the period of a simple pendulum of length ${L} m, in seconds? Use \(g = 9.8\ \text{m/s}^2\).`, answer: T0, tol: 0.01, hint: 'Round to 2 decimals.',
        x: T`\(T = 2\pi\sqrt{L/g} = 2\pi\sqrt{${L}/9.8} = ${R.fmt(T0, 2)}\) s.` };
    } }
  ]
});
