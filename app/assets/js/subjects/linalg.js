registerSubject({
  id: 'linalg', name: 'Linear algebra', color: '#8A6212',
  blurb: 'Systems, subspaces, determinants, eigenvalues, orthogonality',
  questions: [
    { id: 'l1', skill: 'Rank–nullity', q: T`A \(5 \times 7\) matrix has rank 4. What is the dimension of its null space?`,
      c: ['3', '1', '4', '2'],
      x: T`Rank–nullity uses the number of columns: \(7 - 4 = 3\).` },
    { id: 'l2', skill: 'Rank–nullity', q: T`What is the largest possible rank of a \(4 \times 6\) matrix?`,
      c: ['4', '6', '10', '24'],
      x: T`\(\operatorname{rank} \le \min(m, n) = 4\).` },
    { id: 'l3', skill: 'Determinants', q: T`\(A\) is \(3 \times 3\) with \(\det A = 3\). What is \(\det(2A)\)?`,
      c: ['24', '6', '12', '8'],
      x: T`Each of the 3 rows is scaled by 2: \(2^3 \cdot 3 = 24\).` },
    { id: 'l4', skill: 'Determinants', q: T`If \(\det A = 4\), what is \(\det(A^{-1})\)?`,
      c: ['1/4', '4', '-4', '16'],
      x: T`\(\det(A)\det(A^{-1}) = \det(I) = 1\).` },
    { id: 'l5', skill: 'Determinants', q: T`Swapping two rows of a square matrix multiplies its determinant by:`,
      c: ['-1', '1', '0', '2'],
      x: T`Each row interchange flips the sign. Adding a multiple of one row to another leaves it unchanged.` },
    { id: 'l6', skill: 'Eigenvalues', q: T`If \(\lambda\) is an eigenvalue of invertible \(A\), which is an eigenvalue of \(A^{-1}\)?`,
      c: [T`\(1/\lambda\)`, T`\(-\lambda\)`, T`\(\lambda\)`, T`\(\lambda^2\)`],
      x: T`From \(A\mathbf v = \lambda\mathbf v\), apply \(A^{-1}\): \(\mathbf v = \lambda A^{-1}\mathbf v\), so \(A^{-1}\mathbf v = \frac{1}{\lambda}\mathbf v\).` },
    { id: 'l7', skill: 'Eigenvalues', q: T`A \(3\times3\) matrix has eigenvalues \(2, -1, 5\). What is its trace?`,
      c: ['6', '-10', '8', '0'],
      x: T`The trace is the sum of the eigenvalues: \(2 - 1 + 5 = 6\). The determinant would be their product, \(-10\).` },
    { id: 'l8', skill: 'Eigenvalues', q: T`A \(3\times3\) matrix has eigenvalues \(1, 1, 2\). Is it diagonalizable?`,
      c: [T`It depends on whether the eigenspace for \(\lambda = 1\) is 2-dimensional`, 'Always', 'Never', 'Only if it is upper triangular'],
      x: T`A repeated eigenvalue needs geometric multiplicity equal to its algebraic multiplicity (2). \(I\)-like matrices pass; a Jordan block fails.` },
    { id: 'l9', skill: 'Invertibility', q: T`Which condition is NOT equivalent to an \(n\times n\) matrix \(A\) being invertible?`,
      c: [T`\(A\) has \(n\) distinct eigenvalues`, T`\(\det A \ne 0\)`, T`\(A\mathbf x = \mathbf 0\) has only the trivial solution`, T`The columns of \(A\) span \(\mathbb R^n\)`],
      x: T`\(\operatorname{diag}(0, 1)\) has distinct eigenvalues but is singular. The other three are parts of the invertible matrix theorem.` },
    { id: 'l10', skill: 'Independence', q: T`Four vectors in \(\mathbb R^3\) are:`,
      c: ['always linearly dependent', 'always linearly independent', 'independent iff none is zero', 'a basis for \\(\\mathbb R^3\\)'],
      x: T`\(\dim \mathbb R^3 = 3\), so any set with more than 3 vectors is dependent.` },
    { id: 'l11', skill: 'Independence', q: T`Are \(\langle 1, 2\rangle\) and \(\langle 2, 4\rangle\) linearly independent?`,
      c: ['No; one is a multiple of the other', 'Yes; neither is zero', 'Yes; they are in \\(\\mathbb R^2\\)', 'No; they are orthogonal'],
      x: T`\(\langle 2,4\rangle = 2\langle 1,2\rangle\), so \(2\mathbf v_1 - \mathbf v_2 = \mathbf 0\) is a nontrivial relation.` },
    { id: 'l12', skill: 'Symmetric matrices', q: T`A real symmetric matrix always:`,
      c: ['has real eigenvalues and is orthogonally diagonalizable', 'is invertible', 'has distinct eigenvalues', 'has positive eigenvalues'],
      x: T`This is the spectral theorem. Symmetric matrices can still be singular or have repeated or negative eigenvalues.` },
    { id: 'l13', skill: 'Orthogonality', q: T`For an orthogonal matrix \(Q\), \(Q^{-1}\) equals:`,
      c: [T`\(Q^T\)`, T`\(Q\)`, T`\(-Q\)`, T`\(\frac{1}{\det Q} Q\)`],
      x: T`Orthonormal columns give \(Q^TQ = I\).` },
    { id: 'l14', skill: 'Orthogonality', q: T`The least-squares solution \(\hat{\mathbf x}\) of \(A\mathbf x \approx \mathbf b\) satisfies:`,
      c: [T`\(A^TA\hat{\mathbf x} = A^T\mathbf b\)`, T`\(A\hat{\mathbf x} = \mathbf b\)`, T`\(AA^T\hat{\mathbf x} = \mathbf b\)`, T`\(\hat{\mathbf x} = A^T\mathbf b\)`],
      x: T`The residual \(\mathbf b - A\hat{\mathbf x}\) must be orthogonal to the column space: \(A^T(\mathbf b - A\hat{\mathbf x}) = \mathbf 0\).` },
    { id: 'l15', skill: 'Orthogonality', q: T`What is the projection of \(\langle 3, 4\rangle\) onto \(\langle 1, 0\rangle\)?`,
      c: [T`\(\langle 3, 0\rangle\)`, T`\(\langle 0, 4\rangle\)`, T`\(\langle 3, 4\rangle\)`, '3'],
      x: T`\(\frac{\langle 3,4\rangle\cdot\langle 1,0\rangle}{1}\langle 1,0\rangle = 3\langle 1,0\rangle\). The projection is a vector.` },
    { id: 'l16', skill: 'Subspaces', q: T`\(A\mathbf x = \mathbf b\) has a solution if and only if:`,
      c: [T`\(\mathbf b\) is in the column space of \(A\)`, T`\(\mathbf b\) is in the null space of \(A\)`, T`\(A\) is square`, T`\(\det A \ne 0\)`],
      x: T`\(A\mathbf x\) is a linear combination of the columns of \(A\) with weights from \(\mathbf x\).` },
    { id: 'l17', skill: 'Transformations', q: T`Which matrix rotates \(\mathbb R^2\) by 90° counterclockwise?`,
      c: [T`\(\begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix}\)`, T`\(\begin{pmatrix}0 & 1\\ -1 & 0\end{pmatrix}\)`, T`\(\begin{pmatrix}-1 & 0\\ 0 & -1\end{pmatrix}\)`, T`\(\begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}\)`],
      x: T`The columns are the images of \(\mathbf e_1 \mapsto \langle 0,1\rangle\) and \(\mathbf e_2 \mapsto \langle -1,0\rangle\).` },
    { id: 'l18', skill: 'Matrix algebra', q: T`\((AB)^T\) equals:`,
      c: [T`\(B^TA^T\)`, T`\(A^TB^T\)`, T`\(AB\)`, T`\(BA\)`],
      x: T`Transposing reverses the order of a product, as inversion does.` },
    { id: 'l19', skill: 'Matrix algebra', q: T`If \(A\) is \(m\times n\), the product \(AB\) is defined when \(B\) is:`,
      c: [T`\(n \times p\) for any \(p\)`, T`\(m \times n\)`, T`\(m \times p\) for any \(p\)`, T`\(p \times m\) for any \(p\)`],
      x: T`Inner dimensions must match. The result is \(m\times p\).` },
    { id: 'l20', skill: 'SVD', q: T`The singular values of \(A\) are:`,
      c: [T`square roots of the eigenvalues of \(A^TA\)`, T`the eigenvalues of \(A\)`, T`absolute values of the eigenvalues of \(A\)`, T`the diagonal entries of \(A\)`],
      x: T`\(A^TA = V\Sigma^2V^T\). They coincide with \(|\lambda|\) only for normal matrices such as symmetric ones.` },
    { id: 'l21', skill: 'Subspaces', q: T`What is the dimension of the vector space of all \(2\times 2\) real matrices?`,
      c: ['4', '2', '1', '8'],
      x: T`The four matrix units \(E_{11}, E_{12}, E_{21}, E_{22}\) form a basis.` },
    { id: 'l22', skill: 'Orthogonality', q: T`Gram–Schmidt applied to a basis produces:`,
      c: ['an orthogonal basis for the same subspace', 'the eigenvectors of the matrix', 'a basis for the null space', 'the reduced row echelon form'],
      x: T`Each step subtracts projections onto earlier vectors, preserving the span while enforcing orthogonality.` }
  ],
  generators: [
    { id: 'lg-det2', skill: 'Determinants', make(R) {
      const [a, b, c, d] = R.vec(4, -6, 9), v = a * d - b * c;
      return { q: T`Compute \(\det\begin{pmatrix}${a} & ${b}\\ ${c} & ${d}\end{pmatrix}\).`, answer: v,
        x: T`\(ad - bc = (${a})(${d}) - (${b})(${c}) = ${v}\).` };
    } },
    { id: 'lg-det3', skill: 'Determinants', make(R) {
      const m = [R.vec(3, -3, 4), R.vec(3, -3, 4), R.vec(3, -3, 4)];
      const [[a, b, c], [d, e, f], [g, h, i]] = m;
      const m1 = e * i - f * h, m2 = d * i - f * g, m3 = d * h - e * g, v = a * m1 - b * m2 + c * m3;
      return { q: T`Compute \(\det\begin{pmatrix}${m.map(r => r.join(' & ')).join('\\\\')}\end{pmatrix}\).`, answer: v,
        x: T`Expand along row 1: \(${a}(${m1}) - (${b})(${m2}) + (${c})(${m3}) = ${v}\), where each parenthesized term is the \(2\times2\) minor.` };
    } },
    { id: 'lg-mul', skill: 'Matrix algebra', make(R) {
      const A = [R.vec(3, -3, 5), R.vec(3, -3, 5)], B = [R.vec(2, -3, 5), R.vec(2, -3, 5), R.vec(2, -3, 5)];
      const i = R.int(0, 1), j = R.int(0, 1), v = A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j];
      const mat = M => T`\begin{pmatrix}${M.map(r => r.join(' & ')).join('\\\\')}\end{pmatrix}`;
      return { q: T`Let \(A = ${mat(A)}\) and \(B = ${mat(B)}\). Find the \((${i + 1},${j + 1})\) entry of \(AB\).`, answer: v,
        x: T`Row ${i + 1} of \(A\) dotted with column ${j + 1} of \(B\): \((${A[i][0]})(${B[0][j]}) + (${A[i][1]})(${B[1][j]}) + (${A[i][2]})(${B[2][j]}) = ${v}\).` };
    } },
    { id: 'lg-eig', skill: 'Eigenvalues', make(R) {
      const [l1, l2] = R.sample([-3, -2, -1, 1, 2, 3, 4, 5, 6], 2), k = R.pick([-2, -1, 1, 2]);
      const a = (k + 1) * l1 - k * l2, b = l2 - l1, c = k * (k + 1) * (l1 - l2), d = -k * l1 + (k + 1) * l2;
      const tr = a + d, det = a * d - b * c, big = Math.max(l1, l2);
      return { q: T`Find the larger eigenvalue of \(\begin{pmatrix}${a} & ${b}\\ ${c} & ${d}\end{pmatrix}\).`, answer: big,
        x: T`\(\operatorname{tr} = ${tr}\), \(\det = ${det}\). Solve \(\lambda^2 ${R.t(-tr, '\\lambda')} ${R.sgn(det, true)} = 0\), which factors with roots \(${Math.min(l1, l2)}\) and \(${big}\).` };
    } },
    { id: 'lg-inv', skill: 'Invertibility', make(R) {
      let a, b, c, d, det; do { [a, b, c, d] = R.vec(4, -5, 7); det = a * d - b * c; } while (det === 0);
      const pos = R.int(0, 3), num = [d, -b, -c, a][pos], lab = ['(1,1)', '(1,2)', '(2,1)', '(2,2)'][pos];
      return { q: T`Find the \(${lab}\) entry of \(A^{-1}\) for \(A = \begin{pmatrix}${a} & ${b}\\ ${c} & ${d}\end{pmatrix}\).`, answer: num / det, tol: 0.01,
        hint: 'Fractions like 3/7 or decimals are fine.',
        x: T`\(A^{-1} = \frac{1}{${det}}\begin{pmatrix}${d} & ${-b}\\ ${-c} & ${a}\end{pmatrix}\), so the entry is \(\frac{${num}}{${det}} ${Number.isInteger(num / det) ? '' : '\\approx'} ${R.fmt(num / det, 3)}\).` };
    } },
    { id: 'lg-sys', skill: 'Systems', make(R) {
      const x = R.int(-5, 6), y = R.int(-5, 6); let a, b, c, d;
      do { [a, b, c, d] = R.vec(4, -5, 6); } while (a * d - b * c === 0 || [a, b, c, d].includes(0));
      const e = a * x + b * y, f = c * x + d * y, D = a * d - b * c, askX = R.int(0, 1) === 0;
      return { q: T`Solve for \(${askX ? 'x' : 'y'}\): \[\begin{aligned}${R.co(a)}x ${R.t(b, 'y')} &= ${e}\\ ${R.co(c)}x ${R.t(d, 'y')} &= ${f}\end{aligned}\]`, answer: askX ? x : y,
        x: T`Cramer's rule with \(D = ${D}\): \(${askX ? 'x' : 'y'} = \frac{${askX ? e * d - b * f : a * f - e * c}}{${D}} = ${askX ? x : y}\). The full solution is \((${x}, ${y})\).` };
    } }
  ]
});
