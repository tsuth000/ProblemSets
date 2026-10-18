registerLearn('linalg', [
  { title: 'Systems and row reduction', skill: 'Systems', body: T`
<p>Write \(A\mathbf x = \mathbf b\) as the augmented matrix \([A\mid\mathbf b]\). Three row operations preserve the solution set: swap rows, scale a row by a nonzero number, add a multiple of one row to another.</p>
<p>Echelon form has a staircase of leading entries (pivots). Reduced echelon form (RREF) has pivots equal to 1 with zeros above and below. RREF is unique.</p>
<p>Inconsistent iff a row reads \([0\ \cdots\ 0\mid c]\), \(c\ne0\). A consistent system has a unique solution iff every variable column has a pivot.</p>`,
    ex: { q: T`Solve \(x + 2y = 5\), \(3x + 4y = 6\).`, a: T`
\[\left[\begin{array}{cc|c}1&2&5\\3&4&6\end{array}\right]\]<p>Replace \(R_2\) with \(R_2 - 3R_1\):</p>\[\left[\begin{array}{cc|c}1&2&5\\0&-2&-9\end{array}\right]\]
<p>So \(y = 4.5\), \(x = 5 - 9 = -4\). Check: \(3(-4) + 4(4.5) = 6\).</p>` },
    trap: T`Changing two rows at once from the same old values, such as \(R_1 \leftarrow R_1 - R_2\) and \(R_2 \leftarrow R_2 - R_1\) in one step. That can destroy information.` },

  { title: 'Solution sets', skill: 'Systems', body: T`
<p>Variables without pivots are free. Write each pivot variable in terms of the free ones to get the parametric vector form.</p>
<p>The homogeneous system \(A\mathbf x = \mathbf 0\) always has \(\mathbf x = \mathbf 0\); it has nontrivial solutions iff there is a free variable. If \(\mathbf p\) solves \(A\mathbf x = \mathbf b\), every solution is \(\mathbf p + \mathbf v_h\) with \(\mathbf v_h\) in the null space: a shifted copy of the null space.</p>`,
    ex: { q: T`Describe all solutions of \(x + y + z = 1\) in \(\mathbb R^3\).`, a: T`
<p>\(y = s\), \(z = t\) are free, so \(x = 1 - s - t\):</p>
\[\mathbf x = \begin{pmatrix}1\\0\\0\end{pmatrix} + s\begin{pmatrix}-1\\1\\0\end{pmatrix} + t\begin{pmatrix}-1\\0\\1\end{pmatrix}\]
<p>A plane through \((1,0,0)\) parallel to the null space.</p>` },
    trap: T`Concluding "no solution" because there are more unknowns than equations. Such systems have no solution or infinitely many, never exactly one.` },

  { title: 'Matrix algebra', skill: 'Matrix algebra', body: T`
<p>\((AB)_{ij}\) is row \(i\) of \(A\) dotted with column \(j\) of \(B\). Equivalently, each column of \(AB\) is \(A\) times the corresponding column of \(B\).</p>
<p>Matrix multiplication is associative and distributive, but not commutative. \((AB)^T = B^TA^T\) and \((AB)^{-1} = B^{-1}A^{-1}\): the order reverses.</p>`,
    ex: { q: T`Check whether \(A = \begin{pmatrix}1&1\\0&1\end{pmatrix}\) and \(B = \begin{pmatrix}1&0\\1&1\end{pmatrix}\) commute.`, a: T`
\[AB = \begin{pmatrix}2&1\\1&1\end{pmatrix} \ne \begin{pmatrix}1&1\\1&2\end{pmatrix} = BA\]` },
    trap: T`Cancelling like real numbers. \(AB = 0\) does not imply \(A = 0\) or \(B = 0\), and \(AB = AC\) does not imply \(B = C\) unless \(A\) is invertible.` },

  { title: 'Inverses', skill: 'Invertibility', body: T`
\[\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1} = \frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}\]
<p>For larger matrices, row reduce \([A\mid I]\) to \([I\mid A^{-1}]\); if a pivot is missing, \(A\) is singular.</p>
<p>Invertible matrix theorem: for square \(A\), invertible \(\iff \det A\ne0 \iff\) \(n\) pivots \(\iff\) columns independent \(\iff\) columns span \(\mathbb R^n\) \(\iff\) \(A\mathbf x = \mathbf 0\) has only the trivial solution \(\iff\) 0 is not an eigenvalue.</p>`,
    ex: { q: T`Invert \(\begin{pmatrix}2&1\\5&3\end{pmatrix}\).`, a: T`
<p>\(\det = 6 - 5 = 1\), so the inverse is \(\begin{pmatrix}3&-1\\-5&2\end{pmatrix}\). Check: the product is \(I\).</p>` },
    trap: T`Computing \(A^{-1}\mathbf b\) when you only need to solve \(A\mathbf x = \mathbf b\). Row reduction is less work and more stable.` },

  { title: 'Determinants', skill: 'Determinants', body: T`
<p>Cofactor expansion along any row or column: \(\det A = \sum_j (-1)^{i+j}a_{ij}M_{ij}\). Expand along the row with the most zeros. A triangular matrix's determinant is the product of its diagonal.</p>
<table class="tt"><tr><th>Row operation</th><th>Effect on det</th></tr>
<tr><td>Swap two rows</td><td>multiply by \(-1\)</td></tr>
<tr><td>Scale a row by \(c\)</td><td>multiply by \(c\)</td></tr>
<tr><td>Add a multiple of a row</td><td>no change</td></tr></table>
<p>Geometrically, \(|\det A|\) is the factor by which \(A\) scales area or volume, and the sign records orientation.</p>`,
    ex: { q: T`Compute \(\det\begin{pmatrix}2&0&1\\1&3&2\\1&1&1\end{pmatrix}\).`, a: T`
<p>Row 1: \(2(3\cdot1 - 2\cdot1) - 0 + 1(1\cdot1 - 3\cdot1) = 2 - 2 = 0\). The matrix is singular; indeed \(R_1 = -R_2 + 3R_3\).</p>` },
    trap: T`Writing \(\det(A + B) = \det A + \det B\) or \(\det(cA) = c\det A\). The correct rule is \(\det(cA) = c^n\det A\).` },

  { title: 'Subspaces', skill: 'Subspaces', body: T`
<p>A subspace contains \(\mathbf 0\) and is closed under addition and scalar multiplication. The four fundamental subspaces of an \(m\times n\) matrix \(A\):</p>
<p>Column space \(\operatorname{Col}A \subseteq \mathbb R^m\): all \(A\mathbf x\). Null space \(\operatorname{Nul}A \subseteq \mathbb R^n\): solutions of \(A\mathbf x = \mathbf 0\). Row space \(\subseteq\mathbb R^n\), the orthogonal complement of the null space. Left null space \(\operatorname{Nul}A^T\), orthogonal to the column space.</p>`,
    ex: { q: T`Is \(\{(x,y) : y = 2x + 1\}\) a subspace of \(\mathbb R^2\)?`, a: T`
<p>No. \((0,0)\) is not on the line. Lines through the origin, like \(y = 2x\), are subspaces.</p>` },
    trap: T`Taking pivot columns of the RREF as a basis for \(\operatorname{Col}A\). Use the pivot columns of the original \(A\); row operations change the column space.` },

  { title: 'Independence, basis, dimension', skill: 'Independence', body: T`
<p>\(\mathbf v_1,\dots,\mathbf v_k\) are independent iff \(c_1\mathbf v_1+\cdots+c_k\mathbf v_k = \mathbf 0\) forces all \(c_i = 0\). Test: put them as columns and check for a pivot in every column.</p>
<p>A basis is an independent spanning set; every basis of a space has the same size, its dimension. In \(\mathbb R^n\): more than \(n\) vectors are dependent; fewer than \(n\) cannot span.</p>`,
    ex: { q: T`Are \((1,0,1)\), \((0,1,1)\), \((1,1,2)\) independent?`, a: T`
<p>No: the third is the sum of the first two. They span a plane, which has dimension 2.</p>` },
    trap: T`Checking only pairs. Three vectors can be pairwise non-parallel and still dependent, as here.` },

  { title: 'Rank and rank–nullity', skill: 'Rank–nullity', body: T`
<p>\(\operatorname{rank}A\) = number of pivots = \(\dim\operatorname{Col}A\) = \(\dim\operatorname{Row}A\). For \(A\) with \(n\) columns:</p>
\[\operatorname{rank}A + \dim\operatorname{Nul}A = n\]
<p>Each column either carries a pivot or corresponds to a free variable.</p>`,
    ex: { q: T`Find the rank and a null space basis for \(\begin{pmatrix}1&2&3\\2&4&6\end{pmatrix}\).`, a: T`
<p>Row 2 is twice row 1, so the rank is 1 and the nullity is \(3 - 1 = 2\). From \(x_1 = -2x_2 - 3x_3\): basis \((-2,1,0)\), \((-3,0,1)\).</p>` },
    trap: T`Using the number of rows instead of columns in rank–nullity.` },

  { title: 'Linear transformations', skill: 'Transformations', body: T`
<p>\(T\) is linear if \(T(\mathbf u+\mathbf v) = T\mathbf u + T\mathbf v\) and \(T(c\mathbf u) = cT\mathbf u\). Every linear \(T:\mathbb R^n\to\mathbb R^m\) is \(T\mathbf x = A\mathbf x\), where column \(j\) of \(A\) is \(T(\mathbf e_j)\).</p>
<p>One-to-one iff \(\ker T = \{\mathbf 0\}\) (pivot in every column). Onto iff the range is \(\mathbb R^m\) (pivot in every row). Composition corresponds to multiplication: \(S\circ T\) has matrix \(BA\).</p>
\[R_\theta = \begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix}\]`,
    ex: { q: T`Find the matrices for reflection across \(y = x\) and projection onto the \(x\)-axis.`, a: T`
<p>Reflection sends \(\mathbf e_1\mapsto\mathbf e_2\), \(\mathbf e_2\mapsto\mathbf e_1\): \(\begin{pmatrix}0&1\\1&0\end{pmatrix}\). Projection sends \(\mathbf e_1\mapsto\mathbf e_1\), \(\mathbf e_2\mapsto\mathbf 0\): \(\begin{pmatrix}1&0\\0&0\end{pmatrix}\), whose kernel is the \(y\)-axis.</p>` },
    trap: T`Assuming a map that adds a constant, like \(T\mathbf x = A\mathbf x + \mathbf b\) with \(\mathbf b \ne \mathbf 0\), is linear. It fails \(T(\mathbf 0) = \mathbf 0\).` },

  { title: 'Eigenvalues and eigenvectors', skill: 'Eigenvalues', body: T`
<p>\(A\mathbf v = \lambda\mathbf v\) with \(\mathbf v\ne\mathbf 0\). Eigenvalues solve \(\det(A - \lambda I) = 0\); eigenvectors span the null space of \(A - \lambda I\).</p>
<p>For \(2\times2\): \(\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0\). In general \(\sum\lambda_i = \operatorname{tr}A\) and \(\prod\lambda_i = \det A\). Triangular matrices have their diagonal entries as eigenvalues.</p>`,
    ex: { q: T`Find the eigenpairs of \(A = \begin{pmatrix}4&1\\2&3\end{pmatrix}\).`, a: T`
<p>\(\lambda^2 - 7\lambda + 10 = 0\), so \(\lambda = 5, 2\).</p>
<p>\(\lambda = 5\): \(A - 5I = \begin{pmatrix}-1&1\\2&-2\end{pmatrix}\), giving \(\mathbf v = (1,1)\). \(\lambda = 2\): \(\begin{pmatrix}2&1\\2&1\end{pmatrix}\), giving \(\mathbf v = (1,-2)\).</p>` },
    trap: T`Row reducing \(A\) before finding eigenvalues. Row operations change eigenvalues; only reduce \(A - \lambda I\).` },

  { title: 'Diagonalization', skill: 'Eigenvalues', body: T`
<p>\(A = PDP^{-1}\), with eigenvectors as the columns of \(P\) and eigenvalues on the diagonal of \(D\), works iff \(A\) has \(n\) independent eigenvectors. Then \(A^k = PD^kP^{-1}\), which makes powers and difference equations easy.</p>
<p>Distinct eigenvalues guarantee diagonalizability. With repeats, each eigenvalue's eigenspace dimension (geometric multiplicity) must equal its multiplicity as a root (algebraic multiplicity).</p>`,
    ex: { q: T`Is \(\begin{pmatrix}1&1\\0&1\end{pmatrix}\) diagonalizable?`, a: T`
<p>\(\lambda = 1\) is a double root, but \(A - I = \begin{pmatrix}0&1\\0&0\end{pmatrix}\) has a one-dimensional null space. Only one independent eigenvector, so no.</p>` },
    trap: T`Placing the eigenvalues in \(D\) in a different order from their eigenvectors in \(P\).` },

  { title: 'Orthogonality and Gram–Schmidt', skill: 'Orthogonality', body: T`
<p>With an orthogonal basis \(\mathbf u_1,\dots,\mathbf u_k\) of \(W\), the projection onto \(W\) is</p>
\[\operatorname{proj}_W\mathbf y = \sum_i\frac{\mathbf y\cdot\mathbf u_i}{\mathbf u_i\cdot\mathbf u_i}\mathbf u_i,\]
<p>the closest point in \(W\) to \(\mathbf y\). Gram–Schmidt builds that basis: subtract from each new vector its projections onto the earlier ones. Orthogonal matrices (\(Q^TQ = I\)) preserve lengths and angles.</p>`,
    ex: { q: T`Apply Gram–Schmidt to \(\mathbf v_1 = (1,1,0)\), \(\mathbf v_2 = (1,0,1)\).`, a: T`
<p>\(\mathbf u_1 = \mathbf v_1\). \(\mathbf u_2 = \mathbf v_2 - \frac{1}{2}\mathbf u_1 = (\tfrac12, -\tfrac12, 1)\). Check: \(\mathbf u_1\cdot\mathbf u_2 = 0\).</p>` },
    trap: T`Using the projection formula with a basis that is not orthogonal. It gives the wrong point.` },

  { title: 'Least squares', skill: 'Orthogonality', body: T`
<p>When \(A\mathbf x = \mathbf b\) has no solution, minimize \(\|A\mathbf x - \mathbf b\|\). The minimizer satisfies the normal equations:</p>
\[A^TA\hat{\mathbf x} = A^T\mathbf b\]
<p>\(A\hat{\mathbf x}\) is the projection of \(\mathbf b\) onto \(\operatorname{Col}A\). This is the linear algebra behind regression.</p>`,
    ex: { q: T`Fit \(y = \beta_0 + \beta_1x\) to \((0,1), (1,2), (2,2)\).`, a: T`
<p>\(A = \begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}\), \(\mathbf b = (1,2,2)\). \(A^TA = \begin{pmatrix}3&3\\3&5\end{pmatrix}\), \(A^T\mathbf b = (5,6)\). Solving: \(\beta_1 = 0.5\), \(\beta_0 = 7/6\).</p>` },
    trap: T`Writing \(\hat{\mathbf x} = A^{-1}\mathbf b\). \(A\) is usually not square.` },

  { title: 'Symmetric matrices and quadratic forms', skill: 'Symmetric matrices', body: T`
<p>Spectral theorem: a real symmetric matrix has real eigenvalues, orthogonal eigenvectors for distinct eigenvalues, and \(A = PDP^T\) with \(P\) orthogonal.</p>
<p>A quadratic form \(Q(\mathbf x) = \mathbf x^TA\mathbf x\) is positive definite iff all eigenvalues of \(A\) are positive. That is the multivariable second derivative test: a Hessian that is positive definite means a local minimum.</p>`,
    ex: { q: T`Classify \(Q = 2x^2 + 2xy + 2y^2\).`, a: T`
<p>\(A = \begin{pmatrix}2&1\\1&2\end{pmatrix}\) has eigenvalues 3 and 1, both positive, so \(Q\) is positive definite.</p>` },
    trap: T`Putting the full cross coefficient off the diagonal. For \(2xy\), each off-diagonal entry is 1, not 2.` },

  { title: 'Singular value decomposition', skill: 'SVD', body: T`
\[A = U\Sigma V^T\]
<p>\(V\) holds orthonormal eigenvectors of \(A^TA\); the singular values \(\sigma_i\) are square roots of its eigenvalues; \(\mathbf u_i = A\mathbf v_i/\sigma_i\). Every matrix has an SVD.</p>
<p>Rank equals the number of nonzero \(\sigma_i\). Keeping the \(k\) largest gives the best rank-\(k\) approximation (Eckart–Young), the basis of PCA and compression.</p>`,
    ex: { q: T`Find the singular values of \(\begin{pmatrix}3&0\\0&-2\end{pmatrix}\).`, a: T`
<p>\(A^TA = \operatorname{diag}(9,4)\), so \(\sigma_1 = 3\), \(\sigma_2 = 2\). The eigenvalue \(-2\) becomes the singular value 2.</p>` },
    trap: T`Equating singular values with eigenvalues. They match only for symmetric positive semidefinite matrices.` }
]);
