registerLearn('physics', [
  { title: 'Units and dimensional analysis', body: T`
<p>SI base units: meter, kilogram, second, ampere, kelvin. Derived: newton \(\text{N} = \text{kg}\cdot\text{m/s}^2\), joule \(\text{J} = \text{N}\cdot\text{m}\), watt \(\text{W} = \text{J/s}\), pascal \(\text{Pa} = \text{N/m}^2\), volt \(\text{V} = \text{J/C}\), ohm \(\Omega = \text{V/A}\).</p>
<p>Both sides of every equation must carry the same units. Checking units catches most algebra slips and lets you guess the form of a formula.</p>`,
    ex: { q: T`Check that \(T = 2\pi\sqrt{L/g}\) gives a time.`, a: T`
\[\sqrt{\frac{\text{m}}{\text{m/s}^2}} = \sqrt{\text{s}^2} = \text{s}\]` },
    trap: T`Mixing units, such as km/h with m/s². Convert to SI before substituting.` },

  { title: 'One-dimensional kinematics', skill: 'Kinematics', body: T`
<p>Velocity is the slope of position vs time; acceleration is the slope of velocity vs time; displacement is the area under velocity vs time. With constant \(a\):</p>
\[v = v_0 + at \qquad \Delta x = v_0t + \tfrac12at^2 \qquad v^2 = v_0^2 + 2a\Delta x \qquad \Delta x = \tfrac{v_0+v}{2}t\]
<p>Pick the equation that omits the quantity you neither know nor need.</p>`,
    ex: { q: T`A car goes from rest to 27 m/s in 9 s. Find its acceleration and the distance covered.`, a: T`
<p>\(a = 27/9 = 3\ \text{m/s}^2\). \(\Delta x = \tfrac12(3)(9^2) = 121.5\ \text{m}\).</p>` },
    trap: T`Confusing speed and velocity. A ball thrown up and caught has zero displacement and zero average velocity, but nonzero average speed.` },

  { title: 'Projectile motion', skill: 'Kinematics', body: T`
<p>Split into independent directions. Horizontal: \(v_x = v_0\cos\theta\), constant. Vertical: \(v_y = v_0\sin\theta - gt\).</p>
\[t_\text{flight} = \frac{2v_0\sin\theta}{g} \qquad R = \frac{v_0^2\sin2\theta}{g} \qquad H = \frac{v_0^2\sin^2\theta}{2g}\]
<p>These hold for level ground without air resistance. Range is maximized at 45°; complementary angles give equal ranges.</p>`,
    ex: { q: T`A ball is launched at 20 m/s and 30° over level ground. Find time, range, and maximum height.`, a: T`
<p>\(v_x = 17.32\), \(v_y = 10\) m/s. Time \(= 2(10)/9.8 = 2.04\) s. Range \(= 17.32(2.04) = 35.3\) m. Height \(= 10^2/19.6 = 5.10\) m.</p>` },
    trap: T`Using the level-ground range formula when the launch and landing heights differ. Solve the vertical equation for \(t\) instead.` },

  { title: "Newton's laws and free-body diagrams", skill: "Newton's laws", body: T`
<p>Draw every force on one object, choose axes (along a slope, if there is one), and write \(\sum F_x = ma_x\) and \(\sum F_y = ma_y\).</p>
<p>Weight \(mg\) down. Normal force perpendicular to the surface. Tension along the rope. Kinetic friction \(f_k = \mu_kN\) opposing sliding; static friction adjusts up to \(\mu_sN\). On an incline: \(mg\sin\theta\) along the slope, \(N = mg\cos\theta\) if nothing else pushes perpendicular.</p>`,
    ex: { q: T`A block slides down a 30° incline with \(\mu_k = 0.2\). Find its acceleration.`, a: T`
\[a = g(\sin\theta - \mu_k\cos\theta) = 9.8(0.5 - 0.173) = 3.20\ \text{m/s}^2\]` },
    trap: T`Putting \(ma\) on the free-body diagram as a force, or assuming \(N = mg\) on every surface.` },

  { title: 'Circular motion and gravitation', skill: 'Circular motion', body: T`
<p>Uniform circular motion needs a net inward force \(F_c = mv^2/r\). That force is supplied by something real: tension, friction, gravity, or a normal force.</p>
\[F_g = \frac{GMm}{r^2} \qquad v_\text{orbit} = \sqrt{\frac{GM}{r}} \qquad T^2 = \frac{4\pi^2}{GM}r^3\]
<p>\(G = 6.67\times10^{-11}\ \text{N}\cdot\text{m}^2/\text{kg}^2\).</p>`,
    ex: { q: T`What is the top speed around a flat curve of radius 50 m with \(\mu_s = 0.8\)?`, a: T`
<p>Friction supplies the centripetal force: \(\mu_smg = mv^2/r\), so \(v = \sqrt{\mu_sgr} = \sqrt{0.8(9.8)(50)} = 19.8\) m/s.</p>` },
    trap: T`Adding a separate "centrifugal force" in an inertial frame. Centripetal is the name of a net force, not an extra force.` },

  { title: 'Work and energy', skill: 'Energy', body: T`
\[W = \int\mathbf F\cdot d\mathbf r \qquad K = \tfrac12mv^2 \qquad U_g = mgh \qquad U_s = \tfrac12kx^2\]
<p>Work–energy theorem: \(W_\text{net} = \Delta K\). With only conservative forces, \(K + U\) is constant. With friction, \(K_i + U_i = K_f + U_f + f_kd\).</p>`,
    ex: { q: T`A spring (\(k = 200\) N/m) compressed 0.1 m launches a 0.05 kg ball. Find the launch speed.`, a: T`
<p>\(\tfrac12(200)(0.1)^2 = 1\) J becomes kinetic energy: \(v = \sqrt{2(1)/0.05} = \sqrt{40} = 6.32\) m/s.</p>` },
    trap: T`Counting work done by gravity and also including \(mgh\) as potential energy. Use one or the other.` },

  { title: 'Power', skill: 'Energy', body: T`
<p>\(P = W/t\) on average, and \(P = \mathbf F\cdot\mathbf v\) instantaneously. 1 horsepower \(\approx 746\) W. Efficiency is useful output over input.</p>`,
    ex: { q: T`What power lifts a 1200 kg car up a 5° hill at a steady 15 m/s, ignoring friction and drag?`, a: T`
\[P = mgv\sin\theta = 1200(9.8)(15)(0.0872) \approx 15.4\ \text{kW}\]` },
    trap: T`Using \(P = Fv\) with the full weight rather than its component along the motion.` },

  { title: 'Momentum and collisions', skill: 'Momentum', body: T`
<p>\(\mathbf p = m\mathbf v\). Impulse \(\mathbf J = \mathbf F_\text{avg}\Delta t = \Delta\mathbf p\). With no net external force, total momentum is conserved, component by component.</p>
<p>Elastic collisions also conserve kinetic energy. In 1D with \(m_2\) at rest:</p>
\[v_1' = \frac{m_1 - m_2}{m_1+m_2}v_1 \qquad v_2' = \frac{2m_1}{m_1+m_2}v_1\]
<p>Perfectly inelastic: the objects stick, and kinetic energy loss is maximal.</p>`,
    ex: { q: T`A 2 kg cart at 3 m/s hits a 1 kg cart at rest elastically. Find the final velocities.`, a: T`
<p>\(v_1' = \frac{1}{3}(3) = 1\) m/s and \(v_2' = \frac{4}{3}(3) = 4\) m/s. Check momentum: \(2 + 4 = 6\). Check energy: \(1 + 8 = 9\) J.</p>` },
    trap: T`Assuming kinetic energy is conserved in every collision. Only momentum is guaranteed.` },

  { title: 'Rotation', skill: 'Rotation', body: T`
<p>Rotational analogs: \(\theta, \omega, \alpha\) for position, velocity, acceleration; \(I\) for mass; \(\tau = rF\sin\phi\) for force. \(\sum\tau = I\alpha\), \(K = \tfrac12I\omega^2\), \(L = I\omega\), conserved with no external torque.</p>
<table class="tt"><tr><th>Shape (about center)</th><th>\(I\)</th></tr>
<tr><td>thin hoop</td><td>\(MR^2\)</td></tr><tr><td>solid disk or cylinder</td><td>\(\tfrac12MR^2\)</td></tr>
<tr><td>solid sphere</td><td>\(\tfrac25MR^2\)</td></tr><tr><td>rod about center</td><td>\(\tfrac1{12}ML^2\)</td></tr></table>
<p>Rolling without slipping: \(v = R\omega\), and kinetic energy is \(\tfrac12mv^2 + \tfrac12I\omega^2\).</p>`,
    ex: { q: T`A solid sphere rolls from rest down a height \(h\). Find its speed at the bottom.`, a: T`
\[\begin{aligned}mgh &= \tfrac12mv^2 + \tfrac12\cdot\tfrac25mR^2\cdot\frac{v^2}{R^2}\\ &= \tfrac{7}{10}mv^2\end{aligned}\]\[v = \sqrt{\tfrac{10}{7}gh}\]
<p>Slower than a sliding block (\(\sqrt{2gh}\)) because some energy goes into spin.</p>` },
    trap: T`Forgetting rotational kinetic energy for rolling objects.` },

  { title: 'Oscillations', skill: 'Oscillations', body: T`
<p>Simple harmonic motion: \(x = A\cos(\omega t + \phi)\), \(v_\text{max} = A\omega\), \(a_\text{max} = A\omega^2\), \(f = \omega/2\pi\), \(T = 1/f\).</p>
\[\omega_\text{spring} = \sqrt{k/m} \qquad \omega_\text{pendulum} = \sqrt{g/L}\]
<p>Total energy \(\tfrac12kA^2\) shifts between potential (at the ends) and kinetic (at the center). Period does not depend on amplitude for ideal SHM.</p>`,
    ex: { q: T`A 0.5 kg mass on a 50 N/m spring oscillates with amplitude 0.1 m. Find \(\omega\), \(T\), and \(v_\text{max}\).`, a: T`
<p>\(\omega = \sqrt{100} = 10\) rad/s, \(T = 2\pi/10 = 0.628\) s, \(v_\text{max} = 0.1(10) = 1\) m/s.</p>` },
    trap: T`Mixing angular frequency \(\omega\) (rad/s) with frequency \(f\) (Hz). They differ by \(2\pi\).` },

  { title: 'Waves and sound', skill: 'Waves', body: T`
<p>\(v = f\lambda\). The medium sets \(v\): on a string, \(v = \sqrt{T/\mu}\). Standing waves on a string fixed at both ends: \(\lambda_n = 2L/n\), \(f_n = nv/2L\).</p>
<p>Sound intensity level \(\beta = 10\log_{10}(I/I_0)\) dB; a factor of 10 in intensity adds 10 dB. Doppler: a source approaching you sounds higher.</p>`,
    ex: { q: T`A 0.65 m guitar string carries waves at 400 m/s. Find its fundamental frequency.`, a: T`
<p>\(f_1 = v/2L = 400/1.3 \approx 308\) Hz.</p>` },
    trap: T`Changing \(v\) when the frequency changes. In a fixed medium, raising \(f\) shortens \(\lambda\).` },

  { title: 'Fluids', skill: 'Fluids', body: T`
<p>Pressure at depth: \(P = P_0 + \rho gh\). Buoyant force equals the weight of fluid displaced: \(F_b = \rho_\text{fluid}V_\text{sub}g\). Continuity: \(A_1v_1 = A_2v_2\). Bernoulli along a streamline:</p>
\[P + \tfrac12\rho v^2 + \rho gh = \text{constant}\]`,
    ex: { q: T`Find the gauge pressure 10 m below the surface of water.`, a: T`
<p>\(\rho gh = 1000(9.8)(10) = 98{,}000\) Pa, about one atmosphere.</p>` },
    trap: T`Using the object's density in the buoyancy formula. It uses the fluid's density.` },

  { title: 'Electrostatics', skill: 'Fields', body: T`
\[F = k\frac{|q_1q_2|}{r^2} \qquad \mathbf E = \frac{\mathbf F}{q} \qquad V = k\frac{q}{r}\]<p>with \(k = 8.99\times10^9\ \text{N}\cdot\text{m}^2/\text{C}^2\).</p>
<p>Field lines point from positive to negative. \(\Delta U = q\Delta V\). Gauss's law: \(\oint\mathbf E\cdot d\mathbf A = Q_\text{enc}/\varepsilon_0\). Capacitors: \(C = Q/V\), parallel plates \(C = \varepsilon_0A/d\), energy \(\tfrac12CV^2\).</p>`,
    ex: { q: T`Find the force between two 2 µC charges 0.3 m apart.`, a: T`
\[F = \frac{8.99\times10^9\,(2\times10^{-6})^2}{0.09} \approx 0.40\ \text{N}\]` },
    trap: T`Forgetting to convert µC to C (multiply by \(10^{-6}\)).` },

  { title: 'Circuits', skill: 'Circuits', body: T`
<p>Ohm: \(V = IR\). Power: \(P = IV = I^2R = V^2/R\). Series resistors add; parallel resistors add as reciprocals. Kirchhoff: currents into a junction sum to zero; voltages around a loop sum to zero.</p>
<p>Series elements share current; parallel elements share voltage. RC circuits charge and discharge with time constant \(\tau = RC\).</p>`,
    ex: { q: T`A 12 V battery drives 3 Ω in series with 6 Ω ∥ 3 Ω. Find each current.`, a: T`
<p>Parallel pair: \(\frac{6\cdot3}{9} = 2\ \Omega\). Total \(5\ \Omega\), so \(I = 2.4\) A. The pair has \(2.4(2) = 4.8\) V across it: 0.8 A through 6 Ω and 1.6 A through 3 Ω.</p>` },
    trap: T`Assuming equal current through parallel branches. Current divides inversely to resistance.` },

  { title: 'Magnetism and induction', skill: 'Fields', body: T`
<p>\(\mathbf F = q\mathbf v\times\mathbf B\); on a wire, \(\mathbf F = I\mathbf L\times\mathbf B\). A charge in a uniform field circles with radius \(r = mv/(qB)\).</p>
<p>Faraday: \(\mathcal E = -N\frac{d\Phi_B}{dt}\) with \(\Phi_B = BA\cos\theta\). Lenz: the induced current opposes the change in flux. Long straight wire: \(B = \frac{\mu_0I}{2\pi r}\).</p>`,
    ex: { q: T`A 50-turn coil of area 0.02 m² sees \(B\) fall from 0.5 T to 0 in 0.1 s. Find the average emf.`, a: T`
\[\mathcal E = N\frac{\Delta\Phi}{\Delta t} = 50\cdot\frac{0.02(0.5)}{0.1} = 5\ \text{V}\]` },
    trap: T`Expecting an emf from a large but constant field. Only changing flux induces emf.` },

  { title: 'Thermodynamics', skill: 'Thermodynamics', body: T`
<p>\(PV = nRT\) with \(R = 8.314\) J/(mol·K) and \(T\) in kelvin. First law: \(\Delta U = Q - W\), \(W = \int P\,dV\).</p>
<table class="tt"><tr><th>Process</th><th>Held fixed</th><th>Key fact</th></tr>
<tr><td>isothermal</td><td>\(T\)</td><td>\(\Delta U = 0\), \(Q = W\)</td></tr>
<tr><td>isobaric</td><td>\(P\)</td><td>\(W = P\Delta V\)</td></tr>
<tr><td>isochoric</td><td>\(V\)</td><td>\(W = 0\), \(Q = \Delta U\)</td></tr>
<tr><td>adiabatic</td><td>no heat</td><td>\(Q = 0\), \(\Delta U = -W\)</td></tr></table>
<p>Heat engine efficiency \(\eta = W/Q_H \le 1 - T_C/T_H\) (Carnot). Entropy of an isolated system never decreases.</p>`,
    ex: { q: T`What is the maximum efficiency of an engine between 500 K and 300 K?`, a: T`
<p>\(1 - 300/500 = 0.40\), or 40%.</p>` },
    trap: T`Using Celsius in \(PV = nRT\) or the Carnot formula.` }
]);
