registerLessons('physics', {
  'Units and dimensional analysis': {
    hook: T`
<p>Units behave like algebra: they multiply, divide, and cancel. That makes them a free error check. If an equation claims a speed and its right side comes out in seconds, something is wrong before any number is computed.</p>
<p>To convert, multiply by fractions equal to 1, such as \(\frac{1000\text{ m}}{1\text{ km}}\), and cancel.</p>`,
    vary: [
      [T`Convert 72 km/h to m/s.`, 20, T`\(72\cdot\frac{1000}{3600}\).`],
      [T`Convert 36 km/h to m/s.`, 10, T`Half the speed, half the answer.`],
      [T`A joule is \(\text{kg}\cdot\text{m}^2\cdot\text{s}^{p}\). Find \(p\).`, -2, T`Energy is \(\frac12mv^2\): kg times (m/s)\(^2\).`],
      [T`Force times distance has units of:`, ['joules', 'watts', 'newtons'], T`Work is energy.`],
      [T`Falling from rest with \(g = 9.8\) m/s², find the speed after 3 s.`, 29.4, T`(m/s²)(s) gives m/s.`]
    ]
  },
  'One-dimensional kinematics': {
    hook: T`
<p>Position, velocity, and acceleration are linked by slopes and areas. Velocity is the slope of the position graph; the area under the velocity graph is the distance traveled.</p>
${fig('kinGraphs', {}, 'Constant acceleration: a straight velocity line and a curved position graph.')}`,
    vary: [
      [T`From rest with \(a = 2\) m/s², find \(v\) after 5 s.`, 10, T`\(v = at\).`],
      [T`Same motion. Find the distance after 5 s.`, 25, T`\(\frac12at^2\): the triangle under the velocity line.`],
      [T`A car at 10 m/s brakes at 2 m/s². How many seconds until it stops?`, 5, T`Velocity falls by 2 each second.`],
      [T`Same car. How far does it travel while stopping?`, 25, T`Average speed 5 m/s for 5 s.`],
      [T`A stone drops 20 m with \(g = 10\) m/s². Find the fall time.`, 2, T`\(20 = \frac12(10)t^2\).`]
    ]
  },
  'Projectile motion': {
    hook: T`
<p>The key fact: horizontal and vertical motion are independent. Horizontally nothing pushes, so speed stays constant. Vertically gravity pulls exactly as it does on a dropped object. Combine the two and you get a parabola.</p>
${fig('projectile', {}, 'Change the angle and speed and read the range.')}`,
    vary: [
      [T`Thrown horizontally at 10 m/s from 5 m up (\(g = 10\)). Find the time to land.`, 1, T`Only the vertical drop matters: \(5 = 5t^2\).`],
      [T`Same throw. Find the horizontal distance.`, 10, T`10 m/s for 1 s.`],
      [T`Launched at 20 m/s and \(30^\circ\). Find the initial vertical speed.`, 10, T`\(20\sin30^\circ\).`],
      [T`Same launch (\(g = 10\)). Find the time of flight.`, 2, T`Up for 1 s, down for 1 s.`],
      [T`Same launch. Find the range.`, 20 * Math.cos(Math.PI / 6) * 2, T`\((20\cos30^\circ)(2)\).`]
    ]
  },
  "Newton's laws and free-body diagrams": {
    hook: T`
<p>Draw the object alone with an arrow for every force acting on it: a free-body diagram. Add the forces as vectors. The net force equals \(ma\); if it is zero, the velocity does not change.</p>
${fig('incline', {}, 'On a slope, weight splits into a part along the slope and a part into it.')}`,
    vary: [
      [T`12 N acts on 3 kg. Find \(a\).`, 4, T`\(F/m\).`],
      [T`12 N right and 3 N left act on 3 kg. Find \(a\).`, 3, T`Use the net force, 9 N.`],
      [T`A block slides down a frictionless \(30^\circ\) slope (\(g = 10\)). Find \(a\).`, 5, T`\(g\sin30^\circ\).`],
      [T`Find the weight of 5 kg with \(g = 9.8\).`, 49, T`\(mg\).`],
      [T`A rope holds 2 kg at rest (\(g = 10\)). Find the tension.`, 20, T`Zero acceleration: tension balances weight.`]
    ]
  },
  'Circular motion and gravitation': {
    hook: T`
<p>Moving in a circle at constant speed is still acceleration, because the direction keeps changing. The acceleration points to the center with size \(v^2/r\). Something must supply that pull: string tension, friction, or gravity.</p>
${fig('circular', {}, 'Velocity is tangent; acceleration points inward.')}
<p>Gravity between masses weakens with the square of the distance.</p>`,
    vary: [
      [T`\(v = 4\) m/s, \(r = 2\) m. Find the centripetal acceleration.`, 8, T`\(16/2\).`],
      [T`The speed doubles. The acceleration is multiplied by:`, 4, T`It depends on \(v^2\).`],
      [T`Mass 3 kg, \(v = 4\), \(r = 2\). Find the required force.`, 24, T`\(m\,v^2/r\).`],
      [T`The distance between two masses doubles. Gravity is multiplied by:`, 0.25, T`Inverse square.`],
      [T`A 2\(\pi\) m circular track at 1 m/s. Find the lap time in seconds.`, 2 * Math.PI, T`Distance over speed.`]
    ]
  },
  'Work and energy': {
    hook: T`
<p>Energy changes form but its total stays fixed (without friction). A roller coaster trades height for speed and back again. Work is energy transferred by a force: force times the distance moved in the force's direction.</p>
${fig('energyTrack', {}, 'Potential and kinetic energy trade off; the total line never moves.')}`,
    vary: [
      [T`10 N pushes an object 3 m in the direction of motion. Find the work.`, 30, T`\(Fd\).`],
      [T`Same force at \(60^\circ\) to the motion. Find the work.`, 15, T`Only the parallel part counts: \(\cos60^\circ = \frac12\).`],
      [T`Find the kinetic energy of 2 kg at 3 m/s.`, 9, T`\(\frac12mv^2\).`],
      [T`An object falls 5 m from rest (\(g = 10\)). Find its speed.`, 10, T`\(mgh = \frac12mv^2\); the mass cancels.`],
      [T`Find the potential energy of 2 kg at 5 m (\(g = 10\)).`, 100, T`\(mgh\).`]
    ]
  },
  'Power': {
    hook: T`
<p>Power is how fast energy moves: joules per second, or watts. Two people climbing the same stairs do the same work; the faster one delivers more power.</p>
<p>Electricity is billed in kilowatt-hours: power multiplied by time, which is energy.</p>`,
    vary: [
      [T`600 J of work in 2 s. Find the power.`, 300, T`\(W/t\).`],
      [T`A 1 kW heater runs 3 hours. How many kWh?`, 3, T`Power times time.`],
      [T`A car pushes with 500 N at 20 m/s. Find the power in watts.`, 10000, T`\(P = Fv\).`],
      [T`A 100 W bulb runs for 10 hours. How many kWh?`, 1, T`\(0.1\text{ kW}\times10\text{ h}\).`]
    ]
  },
  'Momentum and collisions': {
    hook: T`
<p>Momentum is mass times velocity. In a collision the objects push on each other with equal and opposite forces, so whatever momentum one gains the other loses: the total stays fixed.</p>
${fig('collision', {}, 'Total momentum 6 kg·m/s before and after.')}
<p>Kinetic energy is not always conserved. When objects stick together, some of it becomes heat and sound.</p>`,
    vary: [
      [T`Find the momentum of 2 kg at 3 m/s.`, 6, T`\(mv\).`],
      [T`It hits and sticks to a 4 kg cart at rest. Find the final speed.`, 1, T`6 kg·m/s shared by 6 kg.`],
      [T`What impulse stops a 6 kg·m/s object?`, 6, T`Impulse equals change in momentum.`],
      [T`That stop takes 0.5 s. Find the average force.`, 12, T`Impulse divided by time.`],
      [T`How much kinetic energy did the sticking collision lose?`, 6, T`9 J before, \(\frac12(6)(1)^2 = 3\) J after.`]
    ]
  },
  'Rotation': {
    hook: T`
<p>Torque is the turning effect of a force. It depends on how hard you push, how far from the pivot, and the angle. That is why door handles sit far from the hinges.</p>
${fig('torque', {}, 'Only the perpendicular part of the force turns the bar.')}
<p>Rotation mirrors straight-line motion: torque plays the role of force, moment of inertia the role of mass, and angular acceleration the role of acceleration.</p>`,
    vary: [
      [T`\(r = 0.5\) m, \(F = 20\) N, perpendicular. Find the torque.`, 10, T`\(rF\).`],
      [T`Same, but at \(30^\circ\) to the bar.`, 5, T`\(rF\sin30^\circ\).`],
      [T`A wheel goes from rest to 10 rad/s in 5 s. Find \(\alpha\).`, 2, T`Change in \(\omega\) over time.`],
      [T`Find the moment of inertia of a 2 kg point mass at 3 m.`, 18, T`\(mr^2\).`],
      [T`\(I = 4\), \(\alpha = 2.5\). Find the torque.`, 10, T`\(\tau = I\alpha\).`]
    ]
  },
  'Oscillations': {
    hook: T`
<p>A mass on a spring is pulled back toward the middle with a force proportional to its displacement. The result is simple harmonic motion: a cosine in time, the same shape as the unit circle's projection.</p>
${fig('shm', {}, 'Watch where the mass moves fastest.')}
<p>A stiffer spring oscillates faster; a heavier mass oscillates slower: \(\omega = \sqrt{k/m}\).</p>`,
    vary: [
      [T`\(k = 8\) N/m, \(m = 2\) kg. Find \(\omega\).`, 2, T`\(\sqrt{8/2}\).`],
      [T`Same spring and mass. Find the period.`, Math.PI, T`\(T = \frac{2\pi}{\omega}\).`],
      [T`The mass is multiplied by 4. The period is multiplied by:`, 2, T`\(T \propto \sqrt m\).`],
      [T`A pendulum is 1 m long (\(g = 9.8\)). Find its period to two decimals.`, 2 * Math.PI * Math.sqrt(1 / 9.8), T`\(2\pi\sqrt{L/g}\): independent of the mass.`],
      [T`Amplitude 0.1 m, \(\omega = 2\). Find the maximum speed.`, 0.2, T`\(A\omega\), reached at the center.`]
    ]
  },
  'Waves and sound': {
    hook: T`
<p>A wave carries energy without carrying matter: each bit of rope moves up and down while the pattern travels along. Wavelength is the distance between crests, frequency is crests passing per second, and their product is the wave speed: \(v = f\lambda\).</p>
${fig('wave', {}, 'A snapshot of a wave.')}`,
    vary: [
      [T`\(f = 10\) Hz, \(\lambda = 2\) m. Find the speed.`, 20, T`\(f\lambda\).`],
      [T`\(v = 340\) m/s, \(f = 170\) Hz. Find \(\lambda\).`, 2, T`\(v/f\).`],
      [T`The frequency doubles at the same speed. \(\lambda\) is multiplied by:`, 0.5, T`Their product is fixed.`],
      [T`Find the period for \(f = 50\) Hz.`, 0.02, T`\(1/f\).`],
      [T`Sound gets 10 dB louder. Its intensity is multiplied by:`, 10, T`Decibels are logarithmic: each 10 dB is a factor of 10.`]
    ]
  },
  'Fluids': {
    hook: T`
<p>Pressure grows with depth because of the weight of the fluid above: \(P = \rho gh\). A submerged object feels more pressure on its bottom than its top, and that difference pushes up. The buoyant force equals the weight of fluid displaced.</p>
${fig('buoyancy', {}, 'Floating: buoyant force balances weight.')}`,
    vary: [
      [T`Find the gauge pressure 10 m under water, in kPa (\(\rho = 1000\), \(g = 10\)).`, 100, T`\(\rho gh = 100{,}000\) Pa.`],
      [T`Find the buoyant force on 0.002 m³ fully submerged in water, in N.`, 20, T`Weight of the displaced water: \(1000\cdot0.002\cdot10\).`],
      [T`A block of density 600 kg/m³ floats in water. What fraction is submerged?`, 0.6, T`The ratio of densities.`],
      [T`A pipe narrows to half its area. The flow speed is multiplied by:`, 2, T`Continuity: \(Av\) is constant.`]
    ]
  },
  'Electrostatics': {
    hook: T`
<p>Like charges repel and opposite charges attract, with a force that weakens as the inverse square of distance. The electric field describes the force a positive test charge would feel at each point.</p>
${fig('dipole', {}, 'Field arrows run from the positive charge to the negative one.')}`,
    vary: [
      [T`One charge doubles. The Coulomb force is multiplied by:`, 2, T`Force is proportional to each charge.`],
      [T`The distance triples. The force is multiplied by:`, 1 / 9, T`Inverse square.`],
      [T`A 2 C charge feels 6 N. Find the field strength in N/C.`, 3, T`\(E = F/q\).`],
      [T`A uniform field of 100 V/m over 0.5 m. Find the voltage.`, 50, T`\(V = Ed\).`],
      [T`Two negative charges:`, ['repel', 'attract', 'feel no force'], T`Like charges repel.`]
    ]
  },
  'Circuits': {
    hook: T`
<p>Voltage pushes, current flows, resistance resists: \(V = IR\). Resistors in series form one long obstacle, so their resistances add. Resistors in parallel offer extra paths, so the total resistance drops.</p>
${fig('circuit', {}, 'Series and parallel.')}`,
    vary: [
      [T`\(V = 12\) V, \(R = 4\ \Omega\). Find \(I\).`, 3, T`\(V/R\).`],
      [T`Find the total of \(2\ \Omega\) and \(4\ \Omega\) in series.`, 6, T`Add.`],
      [T`Find the total of \(6\ \Omega\) and \(3\ \Omega\) in parallel.`, 2, T`\(\frac16 + \frac13 = \frac12\).`],
      [T`Find the total of two \(10\ \Omega\) resistors in parallel.`, 5, T`Two equal paths halve the resistance.`],
      [T`\(I = 2\) A at \(V = 12\) V. Find the power.`, 24, T`\(P = IV\).`]
    ]
  },
  'Magnetism and induction': {
    hook: T`
<p>A current makes a magnetic field that circles the wire; the right-hand rule gives its direction. Magnetic fields push sideways on moving charges, never along their motion.</p>
${fig('wireB', {}, 'Field lines circle a current-carrying wire.')}
<p>Induction runs the other way: a changing magnetic flux through a loop drives a current. Generators and transformers rely on it.</p>`,
    vary: [
      [T`\(q = 2\) C, \(v = 3\) m/s, \(B = 0.5\) T, perpendicular. Find the force.`, 3, T`\(qvB\).`],
      [T`A wire carries 2 A over 0.5 m across 0.4 T. Find the force.`, 0.4, T`\(ILB\).`],
      [T`Flux changes by 0.6 Wb in 0.2 s. Find the induced EMF in V.`, 3, T`Rate of change of flux.`],
      [T`Same change through a 10-turn coil. Find the EMF.`, 30, T`Each turn contributes.`],
      [T`A charge moves parallel to \(B\). Find the force.`, 0, T`The magnetic force needs a perpendicular component.`]
    ]
  },
  'Thermodynamics': {
    hook: T`
<p>The first law is energy bookkeeping: heat added equals the change in internal energy plus the work the gas does. On a pressure-volume diagram, work is the area under the path, and a full cycle's net work is the area it encloses.</p>
${fig('pvCycle', {}, 'An engine cycle: net work equals the enclosed area.')}
<p>The second law limits engines: some heat must always be dumped to a colder place.</p>`,
    vary: [
      [T`\(Q = 500\) J is added and the gas does \(W = 200\) J of work. Find \(\Delta U\).`, 300, T`\(Q - W\).`],
      [T`An ideal gas changes isothermally. Find \(\Delta U\).`, 0, T`Its internal energy depends only on temperature.`],
      [T`Find the Carnot efficiency between 600 K and 300 K.`, 0.5, T`\(1 - T_c/T_h\).`],
      [T`Find the work done at 100 kPa constant pressure when volume grows by 0.02 m³, in J.`, 2000, T`\(P\Delta V\).`],
      [T`Convert \(0\ ^\circ\)C to kelvin.`, 273.15, T`Add 273.15.`]
    ]
  }
});
