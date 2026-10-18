registerLessons('linalg', {
  'Systems and row reduction': {
    hook: T`
<p>Each linear equation in two unknowns is a line; a solution of the system is a point on every line at once.</p>
${fig('system', {}, T`Two lines, one crossing point.`)}
<p>Row reduction is elimination done systematically. Write only the coefficients in a grid (the augmented matrix), then add multiples of one row to another until the system is easy to read from the bottom up.</p>`,
    vary: [
      [T`Solve \(x + y = 5\), \(x - y = 1\). Find \(x\).`, 3, T`Add the rows: \(2x = 6\).`],
      [T`Solve \(x + y = 5\), \(x - y = 3\). Find \(x\).`, 4, T`Only one right-hand side changed.`],
      [T`Solve \(x + y + z = 6\), \(y + z = 5\), \(z = 3\). Find \(x\).`, 1, T`Already in echelon form: subtract the second row from the first.`],
      [T`Same system. Find \(y\).`, 2, T`Back-substitute \(z = 3\).`]
    ]
  },
  'Solution sets': {
    hook: T`
<p>A linear system has exactly one solution, none, or infinitely many. Never exactly two: two lines cannot cross twice.</p>
${fig('solutionCases', {}, 'The three possibilities for two lines.')}
<p>After row reduction, each column without a pivot is a free variable: you may pick its value freely, and each free variable adds a dimension to the solution set.</p>`,
    vary: [
      [T`How many solutions do \(x + y = 2\) and \(2x + 2y = 4\) have?`, ['infinitely many', 'none', 'exactly one'], T`The second equation is the first, doubled: the same line.`],
      [T`How many solutions do \(x + y = 2\) and \(2x + 2y = 5\) have?`, ['none', 'infinitely many', 'exactly one'], T`Same slope, different intercept: parallel lines.`],
      [T`How many free variables does \(x + y + z = 1\) have?`, 2, T`One pivot, three unknowns.`],
      [T`A consistent system has 4 unknowns and rank 2. How many free variables?`, 2, T`Unknowns minus pivots.`],
      [T`At least how many solutions does a homogeneous system \(Ax = 0\) have?`, 1, T`\(x = 0\) always works.`]
    ]
  },
  'Matrix algebra': {
    hook: T`
<p>Read \(Ax\) as a recipe: \(x\) says how much of each column of \(A\) to use. The result is a combination of the columns.</p>
${fig('colCombo', {}, 'Change the amounts and follow the tip-to-tail path.')}
<p>A product \(AB\) means "do \(B\), then \(A\)". Order matters: in general \(AB \ne BA\), just as putting on socks and then shoes differs from the reverse.</p>`,
    vary: [
      [T`\(\begin{bmatrix}1&2\\3&4\end{bmatrix}\begin{bmatrix}1\\1\end{bmatrix}\): find the first entry.`, 3, T`Column 1 plus column 2, first row: \(1 + 2\).`],
      [T`Same product: find the second entry.`, 7, T`\(3 + 4\).`],
      [T`\(A = \begin{bmatrix}1&2\\3&4\end{bmatrix}\), \(B = \begin{bmatrix}0&1\\1&0\end{bmatrix}\). Find the top-left entry of \(AB\).`, 2, T`\(B\) on the right swaps the columns of \(A\).`],
      [T`Same matrices. Find the top-left entry of \(BA\).`, 3, T`\(B\) on the left swaps the rows instead. \(AB \ne BA\).`],
      [T`How many entries does a \((2\times3)(3\times4)\) product have?`, 8, T`The result is \(2\times4\).`]
    ]
  },
  'Inverses': {
    hook: T`
<p>A matrix moves the plane. Its inverse moves it back. A rotation by \(30^\circ\) is undone by rotating \(-30^\circ\).</p>
${fig('linmap', { m: 'rot' }, 'Try each matrix. Which ones could be undone?')}
<p>An inverse exists only if nothing gets crushed. The projection squashes the plane onto a line, losing information that no matrix can restore.</p>`,
    vary: [
      [T`Find the bottom-right entry of \(\begin{bmatrix}2&0\\0&4\end{bmatrix}^{-1}\).`, 0.25, T`Undo a stretch by 4 with a stretch by \(\frac14\).`],
      [T`Find \(\det\begin{bmatrix}1&2\\3&4\end{bmatrix}\).`, -2, T`\(ad - bc = 4 - 6\).`],
      [T`Find the top-left entry of \(\begin{bmatrix}1&2\\3&4\end{bmatrix}^{-1}\).`, -2, T`\(\frac{1}{\det}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}\): \(\frac{4}{-2}\).`],
      [T`Is \(\begin{bmatrix}1&2\\2&4\end{bmatrix}\) invertible?`, ['No', 'Yes'], T`The second row is twice the first; the determinant is 0.`]
    ]
  },
  'Determinants': {
    hook: T`
<p>The determinant of a \(2\times2\) matrix is the factor by which it scales area. The unit square has area 1; its image has area \(|\det A|\). A negative determinant means orientation flipped, as in a mirror image.</p>
${fig('linmap', { m: 'scale' }, 'Compare each determinant with the area of the red shape.')}`,
    vary: [
      [T`Find \(\det\begin{bmatrix}3&0\\0&2\end{bmatrix}\).`, 6, T`A 3-by-2 rectangle.`],
      [T`Find \(\det\begin{bmatrix}3&1\\0&2\end{bmatrix}\).`, 6, T`Adding a shear does not change the area.`],
      [T`Find \(\det\begin{bmatrix}1&3\\2&6\end{bmatrix}\).`, 0, T`The columns are parallel; the square flattens.`],
      [T`\(A\) is \(2\times2\) with \(\det A = 5\). Find \(\det(2A)\).`, 20, T`Each of the two dimensions doubles: \(2^2\cdot5\).`],
      [T`\(\det A = 2\) and \(\det B = 3\). Find \(\det(AB)\).`, 6, T`Area factors multiply.`]
    ]
  },
  'Subspaces': {
    hook: T`
<p>A subspace is a flat set through the origin that is closed under addition and scaling. Add two vectors in it, or stretch one, and you stay inside.</p>
${fig('subspaceLine', {}, 'The blue line through 0 is a subspace. The shifted red line is not: adding two of its points leaves it.')}`,
    vary: [
      [T`Is the line \(y = 2x\) a subspace of \(\mathbb R^2\)?`, ['Yes', 'No'], T`It passes through 0 and is closed under addition and scaling.`],
      [T`Is the line \(y = 2x + 1\) a subspace?`, ['No', 'Yes'], T`It misses the origin.`],
      [T`Is the \(x\)-axis a subspace of \(\mathbb R^3\)?`, ['Yes', 'No'], T`A line through the origin.`],
      [T`Is \(\{(x, y) : x \ge 0\}\) a subspace?`, ['No', 'Yes'], T`Scaling \((1, 0)\) by \(-1\) leaves the set.`],
      [T`What is the dimension of the plane \(x + y + z = 0\)?`, 2, T`One equation removes one dimension from \(\mathbb R^3\).`]
    ]
  },
  'Independence, basis, dimension': {
    hook: T`
<p>Vectors are independent if none of them is a combination of the others: each adds a new direction. Two independent vectors in the plane reach every point; two parallel ones only reach a line.</p>
${fig('span2', {}, 'Turn v₂ until it lines up with v₁ and watch the grid of combinations collapse.')}
<p>A basis is an independent set that reaches everything. Every basis of a space has the same size: the dimension.</p>`,
    vary: [
      [T`Find the dimension of the span of \((1, 2)\) and \((2, 4)\).`, 1, T`The second is twice the first.`],
      [T`Find the dimension of the span of \((1, 2)\) and \((2, 5)\).`, 2, T`No longer parallel.`],
      [T`Find the dimension of the span of \((1,0,0), (0,1,0), (1,1,0)\).`, 2, T`The third is the sum of the first two.`],
      [T`What is the largest number of independent vectors in \(\mathbb R^3\)?`, 3, T`The dimension.`],
      [T`Can four vectors in \(\mathbb R^3\) be independent?`, ['No', 'Yes'], T`There are only three directions to add.`]
    ]
  },
  'Rank and rank–nullity': {
    hook: T`
<p>Think of a matrix as a machine that takes in \(n\) dimensions. Some dimensions survive (the rank: the dimension of the output), and some are crushed to zero (the nullity: the dimension of the null space). Nothing is lost track of:</p>
\[\text{rank} + \text{nullity} = n\]
${fig('linmap', { m: 'project' }, 'Projection keeps one dimension and crushes the other.')}`,
    vary: [
      [T`A \(3\times5\) matrix has rank 3. Find its nullity.`, 2, T`\(5 - 3\).`],
      [T`A \(3\times5\) matrix has rank 2. Find its nullity.`, 3, T`One less rank, one more nullity.`],
      [T`An invertible \(4\times4\) matrix: find its nullity.`, 0, T`Nothing is crushed.`],
      [T`Projection onto a line in \(\mathbb R^2\): find its rank.`, 1, T`The output is a line.`],
      [T`Same projection: find its nullity.`, 1, T`The perpendicular direction is crushed.`]
    ]
  },
  'Linear transformations': {
    hook: T`
<p>A linear transformation keeps grid lines straight, parallel, and evenly spaced, and keeps the origin fixed. So it is completely decided by where it sends the two basis vectors \(e_1\) and \(e_2\), and those images are exactly the columns of its matrix.</p>
${fig('linmap', {}, T`The blue and green arrows are the columns of \(A\).`)}`,
    vary: [
      [T`Find the top-right entry of the matrix that rotates by \(90^\circ\).`, -1, T`\(e_2 = (0, 1)\) goes to \((-1, 0)\), the second column.`],
      [T`Find the determinant of reflection across the \(x\)-axis.`, -1, T`Area kept, orientation flipped.`],
      [T`\(T(1, 0) = (2, 1)\) and \(T(0, 1) = (0, 3)\). Find the first component of \(T(1, 1)\).`, 2, T`\(T(1,1) = T(e_1) + T(e_2)\).`],
      [T`Same \(T\). Find the second component of \(T(1, 1)\).`, 4, T`\(1 + 3\).`],
      [T`Same \(T\). Find the second component of \(T(2, -1)\).`, -1, T`\(2(2, 1) - (0, 3)\).`]
    ]
  },
  'Eigenvalues and eigenvectors': {
    hook: T`
<p>Most vectors change direction when a matrix acts on them. A few special directions are only stretched: \(Ax = \lambda x\). Those are eigenvectors, and the stretch factor \(\lambda\) is the eigenvalue.</p>
${fig('eigen2', {}, 'Rotate x until Ax lines up with it.')}`,
    vary: [
      [T`Find the larger eigenvalue of \(\begin{bmatrix}2&0\\0&5\end{bmatrix}\).`, 5, T`Diagonal: the eigenvalues sit on the diagonal.`],
      [T`Find the larger eigenvalue of \(\begin{bmatrix}2&1\\1&2\end{bmatrix}\).`, 3, T`Along \((1, 1)\): \(A(1,1) = (3, 3)\).`],
      [T`Find the smaller eigenvalue of the same matrix.`, 1, T`Along \((1, -1)\).`],
      [T`Find the sum of the eigenvalues of \(\begin{bmatrix}4&1\\2&3\end{bmatrix}\).`, 7, T`The sum equals the trace, \(4 + 3\).`],
      [T`Find the product of its eigenvalues.`, 10, T`The product equals the determinant, \(12 - 2\).`]
    ]
  },
  'Diagonalization': {
    hook: T`
<p>In the coordinates given by its eigenvectors, a matrix does nothing but stretch each axis by its eigenvalue. Writing \(A = PDP^{-1}\) says: switch to eigen-coordinates, stretch, switch back.</p>
${fig('ellipseMap', {}, T`\(\begin{bmatrix}2&1\\1&2\end{bmatrix}\) turns the unit circle into an ellipse, stretched by 3 and 1 along its eigenvectors.`)}
<p>Powers become easy: \(A^k = PD^kP^{-1}\), and \(D^k\) just raises each eigenvalue to the \(k\)th power.</p>`,
    vary: [
      [T`\(D = \operatorname{diag}(2, 3)\). Find the bottom-right entry of \(D^3\).`, 27, T`Each diagonal entry is cubed.`],
      [T`\(A\) has eigenvalues 1 and 0.5. As \(k \to \infty\), what does the 0.5-part of \(A^k\) approach?`, 0, T`\(0.5^k \to 0\); only the eigenvalue-1 direction survives.`],
      [T`\(A\) has eigenvalues 2 and 3. Find the larger eigenvalue of \(A^2\).`, 9, T`Square each eigenvalue.`],
      [T`Same \(A\). Find the larger eigenvalue of \(A^{-1}\).`, 0.5, T`Reciprocals: \(\frac12\) and \(\frac13\).`]
    ]
  },
  'Orthogonality and Gram–Schmidt': {
    hook: T`
<p>Perpendicular (orthogonal) vectors are ideal coordinates: they do not overlap, so each component can be read off with one dot product.</p>
<p>Gram–Schmidt manufactures them. Keep \(v_1\). From \(v_2\), subtract its shadow (projection) on \(v_1\); what remains is perpendicular to \(v_1\).</p>
${fig('gramSchmidt', {}, T`\(v_2\) minus its projection on \(v_1\) is perpendicular to \(v_1\).`)}`,
    vary: [
      [T`Find the \(x\)-component of the projection of \((2, 3)\) onto \((1, 0)\).`, 2, T`Projecting onto the \(x\)-axis keeps the \(x\)-part.`],
      [T`Find the scalar \(\dfrac{u\cdot v}{v\cdot v}\) for projecting \(u = (2, 3)\) onto \(v = (3, 1)\).`, 0.9, T`\(\frac{6 + 3}{10}\).`],
      [T`Find \(\left|\tfrac{1}{\sqrt2}(1, 1)\right|\).`, 1, T`Dividing by the length gives a unit vector.`],
      [T`Find \((1, 2)\cdot(2, -1)\).`, 0, T`Orthogonal.`]
    ]
  },
  'Least squares': {
    hook: T`
<p>When there are more equations than unknowns, usually no exact solution exists: no single line passes through every data point. Least squares picks the line that minimizes the sum of squared vertical errors.</p>
${fig('leastSquares', {}, 'Red segments are the residuals being minimized.')}
<p>Geometrically, it projects the data onto the set of outputs the model can produce. The normal equations \(A^TA\hat x = A^Tb\) compute that projection.</p>`,
    vary: [
      [T`Fit a line to \((0,0), (1,1), (2,2)\). Find the slope.`, 1, T`The points already lie on \(y = x\).`],
      [T`Fit a line to \((0,1), (1,1), (2,1)\). Find the slope.`, 0, T`Flat data, flat line.`],
      [T`Fit a line to \((0,0), (1,1), (2,1)\). Find the slope.`, 0.5, T`\(\frac{\sum(x - \bar x)(y - \bar y)}{\sum(x - \bar x)^2} = \frac12\).`],
      [T`Same data. Find the intercept.`, 1 / 6, T`\(\bar y - b\bar x = \frac23 - \frac12\).`]
    ]
  },
  'Symmetric matrices and quadratic forms': {
    hook: T`
<p>Symmetric matrices have real eigenvalues and perpendicular eigenvectors. A quadratic form such as \(3x^2 + 2xy + 3y^2\) has elliptical contours whose axes are exactly those eigenvectors.</p>
${fig('quadForm', {}, T`Contours of \(3x^2 + 2xy + 3y^2\), with axes along \((1, 1)\) and \((1, -1)\).`)}
<p>If every eigenvalue is positive, the form is a bowl (positive definite). Mixed signs make a saddle.</p>`,
    vary: [
      [T`Write \(3x^2 + 2xy + 3y^2\) as \(x^TAx\). Find the off-diagonal entry of \(A\).`, 1, T`The \(2xy\) term splits evenly into two entries.`],
      [T`Find the sum of the eigenvalues of that \(A\).`, 6, T`The trace, \(3 + 3\).`],
      [T`Find the larger eigenvalue.`, 4, T`Along \((1, 1)\).`],
      [T`Is \(3x^2 + 2xy + 3y^2\) positive definite?`, ['Yes', 'No'], T`Eigenvalues 4 and 2 are both positive.`],
      [T`Classify \(x^2 - y^2\).`, ['indefinite', 'positive definite', 'negative definite'], T`Eigenvalues 1 and \(-1\): a saddle.`]
    ]
  },
  'Singular value decomposition': {
    hook: T`
<p>Every matrix, even a non-square one, does three simple things in order: rotate, stretch along perpendicular axes, rotate again. That is \(A = U\Sigma V^T\).</p>
${fig('ellipseMap', { svd: true }, 'The unit circle maps to an ellipse whose semi-axes are the singular values.')}
<p>Keeping only the largest singular values gives the best low-rank approximation, which is how SVD compresses images and finds patterns in data.</p>`,
    vary: [
      [T`Find the larger singular value of \(\operatorname{diag}(3, -2)\).`, 3, T`The stretch factors, ignoring sign.`],
      [T`Find the smaller singular value.`, 2, T`Signs move into \(U\) or \(V\); singular values are never negative.`],
      [T`A matrix has singular values 5, 2, 0. Find its rank.`, 2, T`Count the nonzero singular values.`],
      [T`What is the largest factor by which a matrix with singular values 5 and 2 can stretch a vector?`, 5, T`The largest singular value.`]
    ]
  }
});
