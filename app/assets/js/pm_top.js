'use strict';
// Pure math track, stage 2: Topology. Every generator carries an independent check (v or vk).
(() => {
  registerSubject({ id: 'top', name: 'Topology', color: '#4A6A2F', blurb: 'Topological spaces, closure and interior, continuity, connectedness, compactness, separation, quotients, surfaces, Euler characteristic, fundamental group, homology', questions: [], generators: [] });
  const U = ['Topological spaces', 'Interior, closure, boundary', 'Continuity and homeomorphism', 'Connectedness', 'Compactness', 'Separation axioms', 'Products and quotients', 'Surfaces and Euler characteristic', 'Fundamental group and winding number', 'Introduction to homology'];

  registerLearn('top', [
    { title: U[0], skill: U[0],
      hook: T`<p>Topology studies the properties of a shape that survive stretching and bending but not tearing. To make "nearby" precise without distances, it declares which sets are open and asks only that the declaration be consistent.</p>`,
      body: T`
<p>A <b>topology</b> on a set \(X\) is a collection \(\tau\) of subsets, called open, such that:</p>
<ol><li>\(\varnothing\) and \(X\) are open.</li>
<li>Any union of open sets is open.</li>
<li>Any finite intersection of open sets is open.</li></ol>
<p>For a finite \(X\), check every pairwise union and intersection.</p>
<table class="tt"><tr><th>Topology</th><th>Open sets</th></tr>
<tr><td>Discrete</td><td>every subset</td></tr>
<tr><td>Indiscrete</td><td>only \(\varnothing\), \(X\)</td></tr>
<tr><td>Metric</td><td>sets containing a ball around each of their points</td></tr>
<tr><td>Cofinite</td><td>\(\varnothing\) and complements of finite sets</td></tr>
<tr><td>Sierpiński on \(\{a, b\}\)</td><td>\(\varnothing, \{a\}, \{a, b\}\)</td></tr></table>
<p><b>Why only finite intersections:</b> in \(\mathbb R\), \(\bigcap_n\left(-\frac1n, \frac1n\right) = \{0\}\), which is not open.</p>
<p><b>Closed sets</b> are complements of open sets. They are closed under finite unions and arbitrary intersections. A set can be both (\(\varnothing\), \(X\)) or neither.</p>
<p><b>Comparing topologies.</b> \(\tau_1\) is finer than \(\tau_2\) if \(\tau_1 \supseteq \tau_2\). The number of topologies on a 3-point set is 29; on a 4-point set, 355.</p>`,
      ex: { q: T`On \(X = \{a, b, c\}\), is \(\tau = \{\varnothing, \{a\}, \{b\}, X\}\) a topology?`, a: T`<p>No. \(\{a\} \cup \{b\} = \{a, b\}\) is missing. Adding \(\{a, b\}\) makes it a topology: every union and intersection now lands in the list.</p>` },
      trap: T`Checking unions and forgetting intersections, or the reverse.`,
      vary: [[T`Open sets in the discrete topology on 4 points?`, 16, T`\(2^4\).`], [T`Open sets in the indiscrete topology on 4 points?`, 2, T`\(\varnothing\) and \(X\).`], [T`Topologies on a 2-point set?`, 4, T`Indiscrete, two Sierpiński, discrete.`], [T`Is \(\{\varnothing, \{a\}, \{a, b\}, X\}\) a topology on \(\{a, b, c\}\)? 1 yes, 0 no.`, 1, T`A chain is closed under both operations.`]] },

    { title: U[1], skill: U[1],
      hook: T`<p>Every set has a largest open set inside it, its interior, and a smallest closed set containing it, its closure. What separates the two is the boundary.</p>`,
      body: T`
<p><b>Interior</b> \(A^\circ\): the union of all open sets inside \(A\). <b>Closure</b> \(\bar A\): the intersection of all closed sets containing \(A\). <b>Boundary</b> \(\partial A = \bar A \setminus A^\circ\).</p>
<p><b>Points of the closure.</b> \(x \in \bar A\) iff every open set containing \(x\) meets \(A\). In a metric space, iff some sequence in \(A\) converges to \(x\).</p>
<table class="tt"><tr><th>\(A \subseteq \mathbb R\)</th><th>Interior</th><th>Closure</th><th>Boundary</th></tr>
<tr><td>\([0, 1)\)</td><td>\((0, 1)\)</td><td>\([0, 1]\)</td><td>\(\{0, 1\}\)</td></tr>
<tr><td>\(\mathbb Q\)</td><td>\(\varnothing\)</td><td>\(\mathbb R\)</td><td>\(\mathbb R\)</td></tr>
<tr><td>\(\{\frac1n\}\)</td><td>\(\varnothing\)</td><td>\(\{\frac1n\} \cup \{0\}\)</td><td>the closure</td></tr>
<tr><td>\((0, 1) \cup \{2\}\)</td><td>\((0, 1)\)</td><td>\([0, 1] \cup \{2\}\)</td><td>\(\{0, 1, 2\}\)</td></tr></table>
<p><b>In a finite space</b>, list the closed sets (complements of the open ones). The closure of \(A\) is the smallest closed set containing \(A\); the interior is the largest open set inside \(A\).</p>
<p>Example: \(X = \{a, b, c\}\), \(\tau = \{\varnothing, \{a\}, \{a, b\}, X\}\). Closed sets: \(X, \{b, c\}, \{c\}, \varnothing\). So \(\overline{\{b\}} = \{b, c\}\), \(\overline{\{a\}} = X\), and \(\{b, c\}^\circ = \varnothing\).</p>
<p><b>Dense:</b> \(\bar A = X\). \(\mathbb Q\) and the irrationals are both dense in \(\mathbb R\).</p>`,
      ex: { q: T`Find the interior, closure, and boundary of \(A = [0, 2) \cup (2, 3]\) in \(\mathbb R\).`, a: T`<p>Interior \((0, 2) \cup (2, 3)\); closure \([0, 3]\); boundary \(\{0, 2, 3\}\). The point 2 is a boundary point: every interval around it meets \(A\) and also misses it.</p>` },
      trap: T`Thinking the boundary of an open set is empty. \(\partial(0, 1) = \{0, 1\}\).`,
      vary: [[T`Number of boundary points of \([0, 1) \cup (1, 2)\)?`, 3, T`0, 1, 2.`], [T`Is \(\mathbb Z\) dense in \(\mathbb R\)? 1 yes, 0 no.`, 0, T`It is closed and proper.`], [T`Size of the interior of \(\mathbb Q \cap [0, 1]\) (as a count of intervals)?`, 0, T`Empty.`]] },

    { title: U[2], skill: U[2],
      hook: T`<p>A map is continuous when it pulls open sets back to open sets. Two spaces are the same, topologically, when a continuous bijection with continuous inverse links them: a coffee mug and a doughnut.</p>`,
      body: T`
<p><b>Continuity.</b> \(f: X \to Y\) is continuous iff \(f^{-1}(V)\) is open in \(X\) for every open \(V \subseteq Y\). It suffices to check a basis of \(Y\). For metric spaces this matches the \(\varepsilon\)–\(\delta\) definition.</p>
<p><b>Finite example.</b> Let \(Y = \{1, 2\}\) be Sierpiński space with open sets \(\varnothing, \{1\}, Y\). A map \(f: X \to Y\) is continuous iff \(f^{-1}(\{1\})\) is open in \(X\). So continuous maps to Sierpiński space correspond exactly to open subsets of \(X\).</p>
<p><b>Always continuous:</b> constant maps; any map out of a discrete space; any map into an indiscrete space; compositions of continuous maps.</p>
<p><b>Homeomorphism:</b> a continuous bijection whose inverse is continuous. A continuous bijection need not be one: \(t \mapsto e^{it}\) from \([0, 2\pi)\) onto the circle has a discontinuous inverse at \(1\).</p>
<p><b>Invariants</b> distinguish spaces: compactness, connectedness, the number of components after removing a point, the fundamental group.</p>
<table class="tt"><tr><th>Pair</th><th>Homeomorphic?</th></tr>
<tr><td>\((0, 1)\) and \(\mathbb R\)</td><td>yes, via \(\tan(\pi(x - \frac12))\)</td></tr>
<tr><td>\([0, 1]\) and \((0, 1)\)</td><td>no (compact vs not)</td></tr>
<tr><td>circle and interval</td><td>no (removing a point disconnects the interval only)</td></tr>
<tr><td>\(\mathbb R\) and \(\mathbb R^2\)</td><td>no (removing a point disconnects \(\mathbb R\))</td></tr>
<tr><td>square and circle</td><td>yes</td></tr></table>`,
      ex: { q: T`Why are the letters T and O not homeomorphic?`, a: T`<p>Removing any single point from O leaves it connected. Removing the junction point of T leaves three pieces. A homeomorphism would preserve the number of pieces left after removing a point.</p>` },
      trap: T`Assuming a continuous bijection is a homeomorphism.`,
      vary: [[T`Is \((0, 1)\) homeomorphic to \(\mathbb R\)? 1 yes, 0 no.`, 1, T`A tangent stretch.`], [T`Is a disk homeomorphic to a square region? 1 yes, 0 no.`, 1, T`Radial rescaling.`], [T`Is \([0, 1)\) homeomorphic to \((0, 1)\)? 1 yes, 0 no.`, 0, T`Removing 0 from \([0, 1)\) leaves it connected; removing any point of \((0, 1)\) disconnects it.`]] },

    { title: U[3], skill: U[3],
      hook: T`<p>A space is connected if it cannot be split into two separate open pieces. Counting the pieces that remain after deleting points is one of the simplest ways to tell shapes apart.</p>`,
      body: T`
<p><b>Connected:</b> \(X\) is not the union of two disjoint nonempty open sets. Equivalently, the only sets both open and closed are \(\varnothing\) and \(X\).</p>
<p><b>In \(\mathbb R\)</b>, the connected sets are exactly the intervals. So the <b>components</b> of a union of intervals are its maximal intervals. Overlapping or touching intervals merge when the shared point is included: \([0, 1] \cup [1, 2] = [0, 2]\) is connected, but \([0, 1) \cup (1, 2]\) has two components because 1 is missing.</p>
<p><b>Continuous images</b> of connected sets are connected. That is the intermediate value theorem.</p>
<p><b>Path-connected:</b> any two points are joined by a path. Path-connected implies connected; the topologist's sine curve \(\{(x, \sin\frac1x) : x > 0\} \cup (\{0\}\times[-1, 1])\) is connected but not path-connected. Open connected subsets of \(\mathbb R^n\) are path-connected.</p>
<p><b>Cut points.</b> Removing \(k\) points from a line leaves \(k + 1\) components; from a circle (\(k \ge 1\)), \(k\); from \(\mathbb R^2\), one. Removing the center of an X leaves 4, of a Y leaves 3, and the crossing point of a figure eight leaves 2.</p>`,
      ex: { q: T`How many components does \([0, 2) \cup [2, 3] \cup (4, 5) \cup (5, 6)\) have?`, a: T`<p>\([0, 2) \cup [2, 3] = [0, 3]\) (2 is included). \((4, 5)\) and \((5, 6)\) do not merge (5 is missing). Components: \([0, 3]\), \((4, 5)\), \((5, 6)\): three.</p>` },
      trap: T`Merging \((0, 1) \cup (1, 2)\) because the intervals touch. The gap point 1 separates them.`,
      vary: [[T`Components of \(\mathbb R\) minus 3 points?`, 4, T`\(k + 1\).`], [T`Components of a circle minus 3 points?`, 3, T`\(k\).`], [T`Components of \(\mathbb R^2\) minus 5 points?`, 1, T`Paths go around.`], [T`Components of the letter X minus its center?`, 4, T`Four arms.`]] },

    { title: U[4], skill: U[4],
      hook: T`<p>Compactness is the topological version of "finite". It is what makes continuous functions on closed intervals attain their maximum, and it survives continuous maps and products.</p>`,
      body: T`
<p><b>Compact:</b> every open cover has a finite subcover. In metric spaces, equivalently, every sequence has a convergent subsequence (sequential compactness).</p>
<p><b>Failing covers.</b> \((0, 1)\) is covered by \(\left(\frac1n, 1\right)\), \(n \ge 2\), with no finite subcover. \(\mathbb R\) is covered by \((-n, n)\).</p>
<p><b>Heine–Borel.</b> In \(\mathbb R^n\), compact \(\iff\) closed and bounded. This fails in general metric spaces: the closed unit ball of an infinite-dimensional normed space is not compact.</p>
<p><b>Properties.</b></p>
<ul><li>Continuous images of compact sets are compact (so a real continuous function on a compact set attains its extremes).</li>
<li>Closed subsets of compact sets are compact.</li>
<li>Compact subsets of Hausdorff spaces are closed.</li>
<li>Tychonoff: any product of compact spaces is compact.</li>
<li>A continuous bijection from a compact space to a Hausdorff space is a homeomorphism.</li></ul>
<p><b>Unusual cases.</b> Every finite space is compact. In the cofinite topology every subset is compact: any one open set misses only finitely many points.</p>`,
      ex: { q: T`Is \(\{(x, y) : x^2 + y^2 = 1\} \cup \{(2, 0)\}\) compact? Is \(\{(x, y) : xy = 1\}\)?`, a: T`<p>The first is closed and bounded in \(\mathbb R^2\): compact. The hyperbola is closed but unbounded: not compact.</p>` },
      trap: T`Assuming closed and bounded implies compact outside \(\mathbb R^n\).`,
      vary: [[T`Is \([0, 1] \times [0, 1]\) compact? 1 yes, 0 no.`, 1, T`Tychonoff or Heine–Borel.`], [T`Is \(\mathbb Z\) compact? 1 yes, 0 no.`, 0, T`Unbounded; the singletons form a cover.`], [T`Is the unit sphere in \(\mathbb R^3\) compact? 1 yes, 0 no.`, 1, T`Closed and bounded.`]] },

    { title: U[5], skill: U[5],
      hook: T`<p>Separation axioms ask how well open sets can tell points apart. Metric spaces separate as well as possible; many natural non-metric spaces do not.</p>`,
      body: T`
<table class="tt"><tr><th>Axiom</th><th>Requirement</th></tr>
<tr><td>\(T_0\)</td><td>for distinct \(x, y\), some open set contains exactly one of them</td></tr>
<tr><td>\(T_1\)</td><td>each of \(x, y\) has an open set missing the other (points are closed)</td></tr>
<tr><td>\(T_2\) Hausdorff</td><td>\(x, y\) have disjoint open neighborhoods</td></tr>
<tr><td>Normal</td><td>disjoint closed sets have disjoint neighborhoods</td></tr></table>
<p>Each implies the one above it (normal plus \(T_1\) implies Hausdorff). <b>Metric spaces</b> are normal and Hausdorff.</p>
<p><b>Finite spaces.</b> A finite \(T_1\) space is discrete: each complement of a point is a finite union of closed points, so every singleton is open. So a finite space that is not discrete is not Hausdorff. Sierpiński space is \(T_0\) but not \(T_1\). An indiscrete space with 2 or more points is not even \(T_0\).</p>
<p><b>Why Hausdorff matters.</b> Limits of sequences are unique in Hausdorff spaces. In the indiscrete topology every sequence converges to every point. In the cofinite topology on an infinite set (which is \(T_1\) but not Hausdorff), the sequence \(1, 2, 3, \ldots\) converges to every point.</p>
<p><b>Urysohn's lemma</b> (normal spaces have continuous functions separating disjoint closed sets) and the <b>Urysohn metrization theorem</b> (second countable regular spaces are metrizable) connect these axioms back to metrics.</p>`,
      ex: { q: T`On \(X = \{a, b, c\}\) with \(\tau = \{\varnothing, \{a\}, \{b\}, \{a, b\}, X\}\), which separation axioms hold?`, a: T`<p>\(T_0\): \(a\) and \(b\) are separated by \(\{a\}\); \(a\) and \(c\) by \(\{a\}\); \(b\) and \(c\) by \(\{b\}\). Yes. \(T_1\): every open set containing \(c\) is \(X\), which contains \(a\). No. So not Hausdorff either.</p>` },
      trap: T`Treating \(T_0\) as symmetric. It only needs an open set around one of the two points.`,
      vary: [[T`Is Sierpiński space \(T_1\)? 1 yes, 0 no.`, 0, T`The only open set containing \(b\) also contains \(a\).`], [T`Is every metric space Hausdorff? 1 yes, 0 no.`, 1, T`Balls of radius \(\frac d2\).`], [T`Is the cofinite topology on \(\mathbb N\) Hausdorff? 1 yes, 0 no.`, 0, T`Any two nonempty open sets meet.`]] },

    { title: U[6], skill: U[6],
      hook: T`<p>New spaces come from old ones in two ways: products, like the torus as circle times circle, and quotients, which glue points together, like rolling a square into a cylinder and then a torus.</p>`,
      body: T`
<p><b>Product topology</b> on \(X \times Y\): generated by open boxes \(U \times V\). Projections are continuous, and a map into a product is continuous iff each coordinate is. \(S^1 \times S^1\) is the torus; \(S^1 \times [0, 1]\) is a cylinder.</p>
<p><b>Quotient topology.</b> Given an equivalence relation on \(X\), a set of classes is open iff the union of its classes is open in \(X\). The quotient map is the finest topology making the projection continuous.</p>
<p><b>Gluing a square.</b> Label the edges and read the word around the boundary; \(a^{-1}\) means the edge is traversed against its arrow.</p>
<table class="tt"><tr><th>Word</th><th>Surface</th></tr>
<tr><td>\(aa^{-1}\)</td><td>sphere</td></tr>
<tr><td>\(aba^{-1}b^{-1}\)</td><td>torus</td></tr>
<tr><td>\(abab^{-1}\)</td><td>Klein bottle</td></tr>
<tr><td>\(aa\) or \(abab\)</td><td>projective plane</td></tr></table>
<p><b>Reading a word.</b> It is orientable iff each letter appears once forward and once backward. Its Euler characteristic is \(V - E + 1\), with \(E\) the number of distinct letters and \(V\) the number of vertex classes after gluing.</p>
<p><b>Other quotients.</b> Collapsing the boundary circle of a disk to a point gives a sphere. Identifying antipodal points of a sphere gives the projective plane \(\mathbb{RP}^2\). A Möbius band is a square with one pair of opposite edges glued with a twist.</p>`,
      ex: { q: T`Identify the surface with boundary word \(abab^{-1}\).`, a: T`<p>\(a\) appears twice forward: nonorientable. Vertices: trace the corners; they all glue to one point, so \(V = 1\), \(E = 2\), \(\chi = 1 - 2 + 1 = 0\). Nonorientable with \(\chi = 0\): the Klein bottle.</p>` },
      trap: T`Treating every gluing of a square's edges in pairs as a torus. The arrow directions decide.`,
      vary: [[T`\(\chi\) of the surface with word \(aba^{-1}b^{-1}\)?`, 0, T`Torus: \(1 - 2 + 1\).`], [T`Is the Klein bottle orientable? 1 yes, 0 no.`, 0, T`\(a\) appears twice forward.`], [T`\(\chi\) of the sphere?`, 2, T`\(aa^{-1}\): \(V = 2\), \(E = 1\).`]] },

    { title: U[7], skill: U[7],
      hook: T`<p>Every closed surface is a sphere with handles or with crosscaps attached, and a single number, the Euler characteristic, together with orientability, says which.</p>`,
      body: T`
<p><b>Euler characteristic</b> \(\chi = V - E + F\) for any subdivision into vertices, edges, and faces. It does not depend on the subdivision. Every convex polyhedron has \(\chi = 2\): cube \(8 - 12 + 6\), tetrahedron \(4 - 6 + 4\), icosahedron \(12 - 30 + 20\).</p>
<p><b>Classification of closed surfaces.</b></p>
<table class="tt"><tr><th>Surface</th><th>\(\chi\)</th></tr>
<tr><td>Sphere</td><td>2</td></tr>
<tr><td>Orientable genus \(g\) (\(g\) handles)</td><td>\(2 - 2g\)</td></tr>
<tr><td>Projective plane</td><td>1</td></tr>
<tr><td>\(k\) crosscaps (\(k\) copies of \(\mathbb{RP}^2\))</td><td>\(2 - k\)</td></tr></table>
<p>The Klein bottle has \(k = 2\), \(\chi = 0\).</p>
<p><b>Connected sum</b> \(M \# N\) (remove a disk from each, glue along the circles): \(\chi(M \# N) = \chi(M) + \chi(N) - 2\). Torus # torus is genus 2 (\(\chi = -2\)); torus # \(\mathbb{RP}^2\) is three crosscaps (\(\chi = -1\)).</p>
<p><b>Other rules.</b> \(\chi(M \times N) = \chi(M)\chi(N)\) (so \(\chi(\text{torus}) = 0\cdot0\)). Removing an open disk lowers \(\chi\) by 1. For a triangulated surface \(3F = 2E\).</p>
<p><b>Polyhedra with holes.</b> A polyhedral surface with \(g\) tunnels has \(V - E + F = 2 - 2g\).</p>`,
      ex: { q: T`A torus is triangulated with 7 vertices. How many edges and triangles?`, a: T`<p>\(\chi = 0\): \(7 - E + F = 0\), and \(3F = 2E\). So \(F = \frac{2E}{3}\), \(7 - \frac E3 = 0\), \(E = 21\), \(F = 14\). (This is the minimal triangulation of the torus.)</p>` },
      trap: T`Using \(\chi = 2 - 2g\) for nonorientable surfaces. There it is \(2 - k\).`,
      vary: [[T`\(\chi\) of a genus 3 surface?`, -4, T`\(2 - 6\).`], [T`\(\chi\) of the dodecahedron (20 vertices, 30 edges)?`, 2, T`12 faces.`], [T`Genus of the orientable surface with \(\chi = -6\)?`, 4, T`\(2 - 2g = -6\).`], [T`\(\chi(\mathbb{RP}^2 \# \mathbb{RP}^2)\)?`, 0, T`Klein bottle.`]] },

    { title: U[8], skill: U[8],
      hook: T`<p>The fundamental group records the loops in a space that cannot be shrunk to a point. On the punctured plane, a loop's class is how many times it winds around the hole.</p>`,
      body: T`
<p><b>Homotopy.</b> Two loops at a base point are homotopic if one deforms continuously into the other. The classes, with "do one loop then the other" as the operation, form the <b>fundamental group</b> \(\pi_1(X)\).</p>
<table class="tt"><tr><th>Space</th><th>\(\pi_1\)</th></tr>
<tr><td>\(\mathbb R^n\), disk, sphere \(S^n\) (\(n \ge 2\))</td><td>trivial</td></tr>
<tr><td>Circle, punctured plane, annulus</td><td>\(\mathbb Z\)</td></tr>
<tr><td>Torus</td><td>\(\mathbb Z \times \mathbb Z\)</td></tr>
<tr><td>Figure eight (wedge of 2 circles)</td><td>free group on 2 generators</td></tr>
<tr><td>Projective plane</td><td>\(\mathbb Z_2\)</td></tr>
<tr><td>Plane minus \(k\) points</td><td>free group on \(k\) generators</td></tr></table>
<p><b>Winding number</b> of a closed curve \(\gamma\) around 0: the total change in \(\arg\gamma(t)\) divided by \(2\pi\). It is the integer \(n\) with \(\gamma \simeq\) the loop \(e^{int}\), and equals \(\frac{1}{2\pi i}\oint_\gamma\frac{dz}{z}\).</p>
<p><b>Dog-on-a-leash rule.</b> For \(\gamma(t) = ae^{imt} + be^{int}\) with \(|a| > |b|\), the winding number about 0 is \(m\): the big term drags the small one along. A circle \(c + re^{ikt}\) winds \(k\) times around 0 if \(|c| < r\), and 0 times if \(|c| > r\).</p>
<p><b>Applications.</b> Brouwer fixed point theorem: every continuous map of the disk to itself has a fixed point (otherwise the disk would retract onto its boundary circle, killing \(\pi_1 = \mathbb Z\)). The fundamental theorem of algebra follows from winding numbers too.</p>`,
      ex: { q: T`Find the winding number about 0 of \(\gamma(t) = 3e^{2it} + e^{-5it}\), \(0 \le t \le 2\pi\).`, a: T`<p>\(|3| > |1|\), so the \(e^{2it}\) term dominates: \(\gamma\) never passes through 0 and winds 2 times, like \(3e^{2it}\).</p>` },
      trap: T`Following the faster term. The larger modulus decides, not the larger frequency.`,
      vary: [[T`Winding number of \(e^{-3it}\) about 0?`, -3, T`Clockwise, three times.`], [T`Winding number of \(5 + e^{it}\) about 0?`, 0, T`The circle stays near 5.`], [T`Rank of \(\pi_1\) of the plane minus 3 points (number of free generators)?`, 3, T`One loop per hole.`], [T`Order of \(\pi_1(\mathbb{RP}^2)\)?`, 2, T`\(\mathbb Z_2\).`]] },

    { title: U[9], skill: U[9],
      hook: T`<p>Homology counts holes of each dimension with linear algebra: components, tunnels, cavities. Its ranks, the Betti numbers, add up with alternating signs to the Euler characteristic.</p>`,
      body: T`
<p><b>Chain complex.</b> For a simplicial complex, \(C_k\) is the vector space spanned by \(k\)-simplices, and the boundary map \(\partial_k: C_k \to C_{k-1}\) sends a simplex to the alternating sum of its faces: \(\partial[v_0v_1v_2] = [v_1v_2] - [v_0v_2] + [v_0v_1]\). Always \(\partial\circ\partial = 0\).</p>
<p><b>Homology</b> \(H_k = \ker\partial_k / \text{im}\,\partial_{k+1}\): cycles modulo boundaries. The <b>Betti number</b> \(b_k = \dim H_k\) counts independent \(k\)-dimensional holes.</p>
<table class="tt"><tr><th>Space</th><th>\(b_0, b_1, b_2\)</th></tr>
<tr><td>Point, disk</td><td>1, 0, 0</td></tr>
<tr><td>Circle</td><td>1, 1, 0</td></tr>
<tr><td>Sphere \(S^2\)</td><td>1, 0, 1</td></tr>
<tr><td>Torus</td><td>1, 2, 1</td></tr>
<tr><td>Genus \(g\) surface</td><td>1, \(2g\), 1</td></tr>
<tr><td>Wedge of \(k\) circles, graph</td><td>components, \(E - V + \text{components}\), 0</td></tr></table>
<p>(Over the rationals; the projective plane and Klein bottle have \(b_2 = 0\) because they are nonorientable, with \(b_1 = 0\) and 1.)</p>
<p><b>Euler–Poincaré formula:</b> \(\chi = b_0 - b_1 + b_2 - \cdots\). Torus: \(1 - 2 + 1 = 0\).</p>
<p><b>Graphs.</b> A connected graph has \(b_1 = E - V + 1\), the number of independent cycles. \(K_4\): \(6 - 4 + 1 = 3\).</p>
<p><b>Relation to \(\pi_1\).</b> \(H_1\) is the abelianization of \(\pi_1\) (Hurewicz): for the figure eight, the free group on 2 generators abelianizes to \(\mathbb Z^2\).</p>`,
      ex: { q: T`Find the Betti numbers of the genus 2 surface and check \(\chi\).`, a: T`<p>\(b_0 = 1\), \(b_1 = 4\), \(b_2 = 1\). \(\chi = 1 - 4 + 1 = -2 = 2 - 2\cdot2\). Consistent.</p>` },
      trap: T`Counting a sphere's interior as a hole of dimension 3. \(S^2\) has \(b_2 = 1\) (the enclosed cavity) and \(b_3 = 0\).`,
      vary: [[T`\(b_1\) of the torus?`, 2, T`Two independent loops.`], [T`\(b_1\) of \(K_5\) (10 edges, 5 vertices)?`, 6, T`\(10 - 5 + 1\).`], [T`\(b_2\) of the sphere?`, 1, T`One cavity.`], [T`\(b_1\) of a genus 3 surface?`, 6, T`\(2g\).`]] }
  ]);

  addQuestions('top', [
    { id: 'tp1', skill: U[0], q: T`Why does the definition of a topology require only finite intersections of open sets to be open?`, c: [T`infinite intersections of open sets can fail to be open, as \(\bigcap(-\frac1n, \frac1n) = \{0\}\)`, 'infinite intersections are always empty', 'unions would otherwise fail', 'it is a convention with no examples behind it'], x: T`In \(\mathbb R\), \(\{0\}\) is not open.` },
    { id: 'tp2', skill: U[2], q: T`Which pair is not homeomorphic?`, c: [T`\(\mathbb R\) and \(\mathbb R^2\)`, T`\((0, 1)\) and \(\mathbb R\)`, 'a circle and the boundary of a square', 'a disk and a filled triangle'], x: T`Removing a point disconnects \(\mathbb R\) but not \(\mathbb R^2\).` },
    { id: 'tp3', skill: U[3], q: T`The topologist's sine curve is:`, c: ['connected but not path-connected', 'path-connected but not connected', 'neither', 'compact and path-connected'], x: T`No path reaches the segment on the \(y\)-axis.` },
    { id: 'tp4', skill: U[4], q: T`A continuous bijection from a compact space to a Hausdorff space is:`, c: ['a homeomorphism', 'never a homeomorphism', 'a homeomorphism only if both are metric', 'constant'], x: T`It maps closed (compact) sets to compact, hence closed, sets.` },
    { id: 'tp5', skill: U[5], q: T`In a Hausdorff space, a convergent sequence has:`, c: ['a unique limit', 'at most two limits', 'every point as a limit', 'no limit'], x: T`Disjoint neighborhoods of two limits could not both contain the tail.` },
    { id: 'tp6', skill: U[6], q: T`Identifying antipodal points of the sphere \(S^2\) gives:`, c: ['the projective plane', 'the torus', 'the Klein bottle', 'the disk'], x: T`\(\mathbb{RP}^2 = S^2/(x \sim -x)\).` },
    { id: 'tp7', skill: U[8], q: T`The fundamental group of the torus is:`, c: [T`\(\mathbb Z \times \mathbb Z\)`, T`\(\mathbb Z\)`, 'trivial', 'the free group on 2 generators'], x: T`\(\pi_1(S^1 \times S^1) = \pi_1(S^1)\times\pi_1(S^1)\).` },
    { id: 'tp8', skill: U[8], q: T`Brouwer's fixed point theorem says every continuous map from the closed disk to itself:`, c: ['has a fixed point', 'is a homeomorphism', 'is constant', 'has a periodic point but maybe no fixed point'], x: T`A fixed-point-free map would give a retraction of the disk onto its boundary.` }
  ]);

  // ======================= GENERATORS =======================
  const PTS = ['a', 'b', 'c', 'd'];
  const setT = (m, n) => (m === 0 ? '\\varnothing' : m === (1 << n) - 1 ? 'X' : `\\{${PTS.filter((_, i) => m >> i & 1).join(', ')}\\}`);
  const setK = (m, n) => PTS.slice(0, n).filter((_, i) => m >> i & 1).join('') || 'empty';
  const pyS = (m, n) => `frozenset('${PTS.slice(0, n).filter((_, i) => m >> i & 1).join('')}')`;
  const isTop = (ms, n) => { const S = new Set(ms), F = (1 << n) - 1; if (!S.has(0) || !S.has(F)) return false; for (const a of S) for (const b of S) if (!S.has(a | b) || !S.has(a & b)) return false; return true; };
  const closeTop = (ms, n) => { const S = new Set([0, (1 << n) - 1, ...ms]); let ch = true; while (ch) { ch = false; for (const a of [...S]) for (const b of [...S]) for (const c of [a | b, a & b]) if (!S.has(c)) { S.add(c); ch = true; } } return [...S].sort((x, y) => x - y); };
  const randTop = (R, n) => closeTop(Array.from({ length: R.int(1, 3) }, () => R.int(1, (1 << n) - 2)), n);
  const tauT = (t, n) => `\\{${t.map(m => setT(m, n)).join(', ')}\\}`;
  const pyTau = (t, n) => `[${t.map(m => pyS(m, n)).join(', ')}]`;

  registerUnitGens('top', { units: {
    [U[0]]: [{ id: 'tp-istop', make(R) {
      const n = R.int(3, 3 + R.int(0, 1)); let t = randTop(R, n); const real = R.int(0, 1);
      if (!real) { const extra = t.filter(m => m && m !== (1 << n) - 1); if (extra.length < 2) return this.make(R); const cand = t.filter(m => m && m !== (1 << n) - 1 && t.some(a => a !== m && t.some(b => b !== m && ((a | b) === m || (a & b) === m)))); if (!cand.length) return this.make(R); const drop = R.pick(cand); if (drop === undefined) return this.make(R); t = t.filter(m => m !== drop); }
      const ok = isTop(t, n);
      return { q: T`On \(X = \{${PTS.slice(0, n).join(', ')}\}\), is \(\tau = ${tauT(t, n)}\) a topology?`, c: ok ? ['Yes', 'No'] : ['No', 'Yes'], x: ok ? 'It contains the empty set and X, and every union and intersection of two members is again a member.' : T`It fails closure: some union or intersection of two members is missing from the list.`, key: ok ? 'Yes' : 'No',
        vk: `(lambda T, X: 'Yes' if frozenset() in T and X in T and all((A | B) in T and (A & B) in T for A in T for B in T) else 'No')(set(${pyTau(t, n)}), frozenset('${PTS.slice(0, n).join('')}'))` };
    } }],
    [U[1]]: [{ id: 'tp-clos', make(R) {
      const n = 3 + R.int(0, 1), F = (1 << n) - 1, t = randTop(R, n); if (t.length < 3) return this.make(R);
      const closed = t.map(m => F ^ m), A = R.int(1, F - 1), ask = R.int(0, 1);
      const cl = closed.filter(c => (c & A) === A).reduce((x, c) => x & c, F), inn = t.filter(o => (o & A) === o).reduce((x, o) => x | o, 0), ans = ask ? inn : cl;
      const opts = [...new Set([ans, A, ask ? cl : inn, F, 0, A ^ F])].filter(m => m !== ans).slice(0, 3);
      return { q: T`On \(X = \{${PTS.slice(0, n).join(', ')}\}\) with \(\tau = ${tauT(t, n)}\), find the ${ask ? 'interior' : 'closure'} of \(A = ${setT(A, n)}\).`, c: [ans, ...opts].map(m => T`\(${setT(m, n)}\)`), x: ask ? T`The interior is the union of the open sets inside \(A\): \(${setT(inn, n)}\).` : T`Closed sets are the complements: \(${tauT([...closed].sort((x, y) => x - y), n)}\). The smallest one containing \(A\) is \(${setT(cl, n)}\).`, key: setK(ans, n),
        vk: `(lambda T, X, A: (lambda r: ''.join(sorted(r)) or 'empty')(${ask ? "reduce(lambda u, v: u | v, [O for O in T if O <= A], frozenset())" : "reduce(lambda u, v: u & v, [X - O for O in T if A <= X - O], X)"}))(${pyTau(t, n)}, frozenset('${PTS.slice(0, n).join('')}'), ${pyS(A, n)})` };
    } }],
    [U[2]]: [
      { id: 'tp-cont', make(R) {
        const n = 3, F = 7, t = randTop(R, n), f = PTS.slice(0, n).map(() => R.int(1, 2)), pre = f.reduce((m, v, i) => m | (v === 1 ? 1 << i : 0), 0), ok = t.includes(pre);
        return { q: T`\(X = \{a, b, c\}\) has topology \(${tauT(t, n)}\). \(Y = \{1, 2\}\) has open sets \(\varnothing, \{1\}, Y\). Is \(f: X \to Y\) with \(f(a) = ${f[0]}\), \(f(b) = ${f[1]}\), \(f(c) = ${f[2]}\) continuous?`, c: ok ? ['Yes', 'No'] : ['No', 'Yes'], x: T`Only \(\{1\}\) needs checking: \(f^{-1}(\{1\}) = ${setT(pre, n)}\), which is ${ok ? '' : 'not '}open in \(X\).`, key: ok ? 'Yes' : 'No',
          vk: `(lambda T, f: 'Yes' if all(frozenset(x for x in 'abc' if f[x] in V) in T for V in [set(), {1}, {1, 2}]) else 'No')(set(${pyTau(t, n)}), {'a': ${f[0]}, 'b': ${f[1]}, 'c': ${f[2]}})` };
      } },
      { id: 'tp-homeo', make(R) {
        const P = [['\\((0, 1)\\) and \\(\\mathbb R\\)', 1, 'A stretched tangent map is a homeomorphism.'], ['\\([0, 1]\\) and \\((0, 1)\\)', 0, 'One is compact and the other is not.'], ['a circle and \\([0, 1]\\)', 0, 'Removing an interior point disconnects the interval but not the circle.'], ['\\(\\mathbb R\\) and \\(\\mathbb R^2\\)', 0, 'Removing a point disconnects the line but not the plane.'], ['the boundary of a square and a circle', 1, 'Radial projection.'], ['a sphere and a torus', 0, 'Their fundamental groups differ (trivial versus \\(\\mathbb Z^2\\)).'], ['an open disk and \\(\\mathbb R^2\\)', 1, 'Radial stretch \\(r \\mapsto \\frac{r}{1 - r}\\).'], ['the letters T and Y', 1, 'Each is three arcs joined at one point.'], ['the letters O and Q', 0, 'Removing the point where the tail of Q meets the loop leaves 2 components; removing any point of O leaves 1.'], ['\\([0, 1)\\) and \\([0, \\infty)\\)', 1, 'The map \\(x \\mapsto \\frac{x}{1 - x}\\).'], ['a coffee mug and a solid torus', 1, 'One handle each, deformable into the other.'], ['the letters X and T', 0, 'Removing the center of X leaves 4 pieces; no point of T does that.']];
        const [s, y, why] = R.pick(P);
        return { q: T`Are ${s} homeomorphic?`, c: y ? ['Yes', 'No'] : ['No', 'Yes'], x: why, key: y ? 'Yes' : 'No', vk: `'${y ? 'Yes' : 'No'}'` };
      } }
    ],
    [U[3]]: [{ id: 'tp-comp', make(R) {
      if (R.int(0, 2) === 0) { const S = [['\\(\\mathbb R\\) with', 'points removed', k => k + 1], ['a circle with', 'points removed', k => k], ['\\(\\mathbb R^2\\) with', 'points removed', () => 1]]; const [a, b, f] = R.pick(S), k = R.int(1, 6);
        return { q: T`How many connected components does ${a} ${k} ${b} have?`, answer: f(k), x: T`${a.includes('circle') ? 'Each removed point cuts the circle once; the first cut opens it into an interval.' : a.includes('^2') ? 'Paths can go around isolated points in the plane.' : 'Each removed point splits one interval into two.'} Answer ${f(k)}.`, v: `${f(k)}` }; }
      const m = R.int(3, 5), iv = []; let x = R.int(-3, 0);
      for (let i = 0; i < m; i++) { const a = x + R.int(0, 1), b = a + R.int(1, 3); iv.push([a, b, R.int(0, 1), R.int(0, 1)]); x = b + R.int(-1, 1); }
      const T1 = iv.map(([a, b, l, r]) => `${l ? '[' : '('}${a}, ${b}${r ? ']' : ')'}`).join(' \\cup ');
      const lo = Math.min(...iv.map(v => v[0])) - 1, hi = Math.max(...iv.map(v => v[1])) + 1, mem = y => iv.some(([a, b, l, r]) => (y > a || (l && y === a)) && (y < b || (r && y === b)));
      let runs = 0, prev = false; for (let y = lo * 2; y <= hi * 2; y++) { const c = mem(y / 2); if (c && !prev) runs++; prev = c; }
      return { q: T`How many connected components does \(${T1}\) have?`, answer: runs, x: T`Merge intervals that overlap or share an included endpoint; an endpoint excluded from both sides keeps them apart. ${runs} maximal interval${runs > 1 ? 's remain' : ' remains'}.`,
        v: `(lambda iv: (lambda m: sum(1 for i in range(len(m)) if m[i] and (i == 0 or not m[i - 1])))([any((y > a or (l and y == a)) and (y < b or (r and y == b)) for a, b, l, r in iv) for y in [Rational(k, 2) for k in range(${lo * 2}, ${hi * 2 + 1})]]))([${iv.map(v => `(${v.join(', ')})`).join(', ')}])` };
    } }],
    [U[4]]: [{ id: 'tp-cpt', make(R) {
      const P = [['\\([0, 1] \\times [2, 5]\\) in \\(\\mathbb R^2\\)', 1, 'Closed and bounded.'], ['the open unit disk in \\(\\mathbb R^2\\)', 0, 'Not closed: points on the circle are limits.'], ['the unit circle in \\(\\mathbb R^2\\)', 1, 'Closed and bounded.'], ['the hyperbola \\(xy = 1\\)', 0, 'Closed but unbounded.'], ['\\(\\{(x, \\sin x) : 0 \\le x \\le 10\\}\\)', 1, 'A continuous image of \\([0, 10]\\).'], ['\\(\\mathbb Z\\) in \\(\\mathbb R\\)', 0, 'The singletons are an open cover with no finite subcover.'], ['any subset of \\(\\mathbb R\\) with the cofinite topology', 1, 'One open set misses only finitely many points.'], ['a finite topological space', 1, 'Finitely many open sets in total.'], ['\\(\\{\\frac1n : n \\ge 1\\}\\) in \\(\\mathbb R\\)', 0, 'Missing its limit point 0.'], ['\\(\\{0\\} \\cup \\{\\frac1n : n \\ge 1\\}\\) in \\(\\mathbb R\\)', 1, 'Closed and bounded.'], ['the closed unit ball in \\(\\ell^2\\) (infinite dimensional)', 0, 'The unit vectors \\(e_n\\) are at mutual distance \\(\\sqrt2\\): no convergent subsequence.'], ['the torus \\(S^1 \\times S^1\\)', 1, 'A product of compact spaces.'], ['\\([0, 1) \\) in \\(\\mathbb R\\)', 0, 'The cover \\([0, 1 - \\frac1n)\\) has no finite subcover.']];
      const [s, y, why] = R.pick(P);
      return { q: T`Is ${s} compact?`, c: y ? ['Yes', 'No'] : ['No', 'Yes'], x: why, key: y ? 'Yes' : 'No', vk: `'${y ? 'Yes' : 'No'}'` };
    } }],
    [U[5]]: [{ id: 'tp-sep', make(R) {
      const n = 3, t = randTop(R, n), ask = R.int(0, 2);
      const sepT0 = PTS.slice(0, n).every((_, i) => PTS.slice(0, n).every((__, j) => i === j || t.some(o => ((o >> i) & 1) !== ((o >> j) & 1))));
      const sepT1 = PTS.slice(0, n).every((_, i) => PTS.slice(0, n).every((__, j) => i === j || t.some(o => ((o >> i) & 1) && !((o >> j) & 1))));
      const haus = PTS.slice(0, n).every((_, i) => PTS.slice(0, n).every((__, j) => i === j || t.some(o => t.some(p => (o >> i & 1) && (p >> j & 1) && !(o & p)))));
      const name = ['\\(T_0\\)', '\\(T_1\\)', 'Hausdorff'][ask], y = [sepT0, sepT1, haus][ask];
      const py = ["all(any((x in O) != (y in O) for O in T) for x in X for y in X if x != y)", "all(any(x in O and y not in O for O in T) for x in X for y in X if x != y)", "all(any(x in O and y in P and not (O & P) for O in T for P in T) for x in X for y in X if x != y)"][ask];
      return { q: T`Is \(X = \{a, b, c\}\) with \(\tau = ${tauT(t, n)}\) ${name}?`, c: y ? ['Yes', 'No'] : ['No', 'Yes'], x: ask === 0 ? T`${y ? 'Every pair of points is distinguished by some open set.' : 'Some two points lie in exactly the same open sets.'}` : T`A finite space is ${ask === 1 ? '\\(T_1\\)' : 'Hausdorff'} only if it is discrete (8 open sets). This one has ${t.length}.`, key: y ? 'Yes' : 'No', vk: `(lambda T, X: 'Yes' if ${py} else 'No')(${pyTau(t, n)}, 'abc')` };
    } }],
    [U[6]]: [{ id: 'tp-word', make(R) {
      const W = [['aa^{-1}', 'aA'], ['aba^{-1}b^{-1}', 'abAB'], ['abab^{-1}', 'abaB'], ['aa', 'aa'], ['abab', 'abab'], ['aabb', 'aabb'], ['aa^{-1}bb^{-1}', 'aAbB'], ['aba^{-1}b^{-1}cdc^{-1}d^{-1}', 'abABcdCD'], ['abcabc', 'abcabc'], ['ab^{-1}ab', 'aBab'], ['abb^{-1}a^{-1}', 'abBA']];
      const [tex, w] = R.pick(W), NAMES = ['Sphere', 'Torus', 'Klein bottle', 'Projective plane', 'Genus 2 surface', 'Three crosscaps'];
      // vertex classes via union-find in JS, independent check in Python.
      const n = w.length, par = [...Array(n).keys()], find = x => (par[x] === x ? x : (par[x] = find(par[x]))), uni = (x, y) => { par[find(x)] = find(y); };
      const ends = i => (w[i] === w[i].toLowerCase() ? [i, (i + 1) % n] : [(i + 1) % n, i]);
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (w[i].toLowerCase() === w[j].toLowerCase()) { const [s1, e1] = ends(i), [s2, e2] = ends(j); uni(s1, s2); uni(e1, e2); }
      const V = new Set([...Array(n).keys()].map(find)).size, E = n / 2, chi = V - E + 1, ori = [...new Set(w.toLowerCase())].every(l => w.includes(l) && w.includes(l.toUpperCase()));
      const name = ori ? { 2: 'Sphere', 0: 'Torus', [-2]: 'Genus 2 surface' }[chi] : { 1: 'Projective plane', 0: 'Klein bottle', [-1]: 'Three crosscaps' }[chi];
      return { q: T`A polygon has boundary word \(${tex}\). Which surface does gluing produce?`, c: [name, ...R.shuffle(NAMES.filter(s => s !== name)).slice(0, 3)], x: T`${ori ? 'Each letter appears once forward and once backward: orientable.' : 'Some letter appears twice in the same direction: nonorientable.'} Vertex classes \(V = ${V}\), edges \(E = ${E}\), so \(\chi = ${V} - ${E} + 1 = ${chi}\).`, key: name, vk: `surf('${w}')` };
    } }],
    [U[7]]: [{ id: 'tp-chi', make(R) {
      const k = R.int(0, 3);
      if (k === 0) { const g = R.int(0, 6), h = R.int(0, 3), ask = R.int(0, 1); return ask ? { q: T`Find \(\chi\) of the connected sum of ${g} tori and ${h} projective planes${g + h === 0 ? ' (the sphere)' : ''}.`, answer: 2 - 2 * g - h, x: T`Each torus subtracts 2 and each projective plane subtracts 1 from the sphere's 2: \(2 - ${2 * g} - ${h} = ${2 - 2 * g - h}\).`, v: `2 + ${g}*(0 - 2) + ${h}*(1 - 2)` } : { q: T`An orientable closed surface has \(\chi = ${2 - 2 * g}\). What is its genus?`, answer: g, x: T`\(2 - 2g = ${2 - 2 * g}\), so \(g = ${g}\).`, v: `solve(2 - 2*Symbol('g') - (${2 - 2 * g}), Symbol('g'))` }; }
      if (k === 1) { const n = R.int(3, 12), typ = R.int(0, 1); const V = typ ? n + 1 : 2 * n, E = typ ? 2 * n : 3 * n, F = typ ? n + 1 : n + 2, ask = R.int(0, 2);
        return { q: T`A ${typ ? 'pyramid' : 'prism'} over a ${n}-gon has ${[`how many vertices`, `how many edges`, `how many faces`][ask]}? (Check with \(V - E + F = 2\).)`, answer: [V, E, F][ask], x: T`\(V = ${V}\), \(E = ${E}\), \(F = ${F}\): \(${V} - ${E} + ${F} = 2\).`, v: `[${V}, ${E}, ${F}][${ask}] if ${V} - ${E} + ${F} == 2 else -1` }; }
      if (k === 2) { const g = R.int(0, 3), V = R.int([4, 7, 10, 12][g], 14), chi = 2 - 2 * g, E = 3 * (V - chi), F = 2 * (V - chi), ask = R.int(0, 1);
        return { q: T`A triangulation of the ${g === 0 ? 'sphere' : g === 1 ? 'torus' : `genus ${g} surface`} has ${V} vertices. How many ${ask ? 'triangles' : 'edges'} does it have?`, answer: ask ? F : E, x: T`\(V - E + F = ${chi}\) and \(3F = 2E\), so \(V - \frac E3 = ${chi}\): \(E = 3(${V} - ${chi}) = ${E}\), \(F = ${F}\).`, v: `(lambda s: s[Symbol('${ask ? 'F' : 'E'}')])(solve([${V} - Symbol('E') + Symbol('F') - ${chi}, 3*Symbol('F') - 2*Symbol('E')], [Symbol('E'), Symbol('F')]))` }; }
      const g1 = R.int(0, 3), g2 = R.int(0, 3);
      return { q: T`Find \(\chi(M \times N)\) where \(M\) has \(\chi = ${2 - 2 * g1}\) and \(N\) has \(\chi = ${2 - 2 * g2}\).`, answer: (2 - 2 * g1) * (2 - 2 * g2), x: T`\(\chi\) is multiplicative for products: \((${2 - 2 * g1})(${2 - 2 * g2})\).`, v: `(${2 - 2 * g1})*(${2 - 2 * g2})` };
    } }],
    [U[8]]: [
      { id: 'tp-wind', make(R) {
        if (R.int(0, 1)) { const k = R.nz(-3, 3), c = R.int(-4, 4), r = R.int(1, 4); if (Math.abs(c) === r) return this.make(R); const ans = Math.abs(c) < r ? k : 0;
          return { q: T`Find the winding number about 0 of \(\gamma(t) = ${c} + ${r}e^{${k}it}\), \(0 \le t \le 2\pi\).`, answer: ans, x: T`A circle of radius ${r} about ${c}, traversed \(${k}\) times. ${ans ? `It encloses 0, so the winding number is ${k}.` : 'It does not enclose 0: winding number 0.'}`, v: `int(round(float(np.sum(np.diff(np.unwrap(np.angle(${c} + ${r}*np.exp(1j*${k}*np.linspace(0, 2*np.pi, 20001))))))/(2*np.pi))))` }; }
        const m = R.nz(-4, 4); let n; do { n = R.nz(-6, 6); } while (n === m); const a = R.int(2, 5), b = R.int(1, a - 1);
        return { q: T`Find the winding number about 0 of \(\gamma(t) = ${a}e^{${m}it} + ${b}e^{${n}it}\), \(0 \le t \le 2\pi\).`, answer: m, x: T`\(|${a}| > |${b}|\): the first term dominates, so \(\gamma\) never hits 0 and winds like \(e^{${m}it}\): \(${m}\).`, v: `int(round(float(np.sum(np.diff(np.unwrap(np.angle(${a}*np.exp(1j*${m}*np.linspace(0, 2*np.pi, 40001)) + ${b}*np.exp(1j*${n}*np.linspace(0, 2*np.pi, 40001))))))/(2*np.pi))))` };
      } },
      { id: 'tp-pi1', make(R) {
        const P = [['the circle', '\\(\\mathbb Z\\)'], ['the 2-sphere', 'trivial'], ['the torus', '\\(\\mathbb Z \\times \\mathbb Z\\)'], ['the figure eight', 'free group on 2 generators'], ['the projective plane', '\\(\\mathbb Z_2\\)'], ['the punctured plane \\(\\mathbb R^2 \\setminus \\{0\\}\\)', '\\(\\mathbb Z\\)'], ['\\(\\mathbb R^3\\)', 'trivial'], ['the solid torus', '\\(\\mathbb Z\\)'], ['the plane minus two points', 'free group on 2 generators'], ['an annulus', '\\(\\mathbb Z\\)'], ['a closed disk', 'trivial'], ['\\(\\mathbb R^3\\) minus a point', 'trivial']];
        const [s, g] = R.pick(P), all = ['\\(\\mathbb Z\\)', 'trivial', '\\(\\mathbb Z \\times \\mathbb Z\\)', 'free group on 2 generators', '\\(\\mathbb Z_2\\)'];
        return { q: T`What is the fundamental group of ${s}?`, c: [g, ...R.shuffle(all.filter(x => x !== g)).slice(0, 3)], x: g === 'trivial' ? T`${s[0].toUpperCase() + s.slice(1)} is simply connected: every loop contracts.` : T`${s[0].toUpperCase() + s.slice(1)} has fundamental group ${g}.`, key: g, vk: `'${g.replace(/\\/g, '\\\\')}'` };
      } }
    ],
    [U[9]]: [{ id: 'tp-betti', make(R) {
      const k = R.int(0, 2);
      if (k === 0) { const g = R.int(0, 6), i = R.int(0, 2); const b = [1, 2 * g, 1][i]; return { q: T`Find the Betti number \(b_{${i}}\) of the closed orientable surface of genus ${g}.`, answer: b, x: T`Genus \(g\): \(b_0 = 1\), \(b_1 = 2g = ${2 * g}\), \(b_2 = 1\). Check: \(1 - ${2 * g} + 1 = ${2 - 2 * g} = \chi\).`, v: `[1, 2 - (2 - 2*${g}), 1][${i}]` }; }
      if (k === 1) { const G = [['\\(K_4\\)', 4, 6], ['\\(K_5\\)', 5, 10], ['\\(K_{3,3}\\)', 6, 9], ['the cube graph', 8, 12], ['the Petersen graph', 10, 15], ['a cycle on 7 vertices', 7, 7], ['a tree on 9 vertices', 9, 8], ['\\(K_6\\)', 6, 15], ['the wheel with 6 spokes', 7, 12]]; const [s, V, E] = R.pick(G);
        return { q: T`Find the first Betti number \(b_1\) (number of independent cycles) of ${s}.`, answer: E - V + 1, x: T`Connected graph: \(b_1 = E - V + 1 = ${E} - ${V} + 1 = ${E - V + 1}\).`, v: `${E} - ${V} + 1` }; }
      const b0 = 1, b1 = R.int(0, 8), b2 = R.int(0, 1);
      return { q: T`A connected space has Betti numbers \(b_0 = ${b0}\), \(b_1 = ${b1}\), \(b_2 = ${b2}\), and no higher homology. Find \(\chi\).`, answer: b0 - b1 + b2, x: T`Euler–Poincaré: \(${b0} - ${b1} + ${b2} = ${b0 - b1 + b2}\).`, v: `${b0} - ${b1} + ${b2}` };
    } }]
  } });
})();
