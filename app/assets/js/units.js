'use strict';
// Every fixed problem belongs to exactly one unit: the one whose lesson teaches it.
// Checks, reviews, and topic practice draw only from units, so a skill shared by several
// units (for example "Limits") can no longer pull a later unit's problem into an earlier check.
(() => {
  const MAP = {
    algebra: { a15: 'Quadratic equations', a16: 'Graphs of quadratics', a17: 'Quadratic equations' },
    trig: { t17: 'Graphs of sine and cosine', t18: 'Graphs of sine and cosine', t19: 'Other trigonometric graphs',
      t12: 'Fundamental identities', t15: 'Fundamental identities', t13: 'Sum, difference, and double angle', t14: 'Sum, difference, and double angle', t16: 'Sum, difference, and double angle' },
    precalc: { pc12: 'Logarithms', pc13: 'Logarithms', pc14: 'Logarithms', pc16: 'Logarithms', pc17: 'Logarithms', pc15: 'Exponential and logarithmic equations' },
    calc1: { k7: 'The derivative', k2: 'Limits and limit laws', k3: 'Limits at infinity', k1: 'Special limits and the squeeze theorem', k4: 'Special limits and the squeeze theorem', k5: 'Special limits and the squeeze theorem',
      k10: 'Differentiation rules', k11: 'Differentiation rules', k12: 'Differentiation rules', k13: 'Differentiation rules',
      k21: 'Antiderivatives', k22: 'Antiderivatives', k23: 'Substitution' },
    calc2: { m1: 'Integration by parts', m2: 'Integration by parts', m3: 'Partial fractions', m4: 'Trigonometric substitution', m5: 'Trigonometric integrals',
      m9: 'Area between curves', m10: 'Volumes of revolution', m11: 'Volumes of revolution',
      m14: 'Series basics', m16: 'Series basics', m15: 'Convergence tests', m18: 'Convergence tests', m19: 'Convergence tests', m17: 'Absolute and conditional convergence' },
    discrete: { d3: 'Propositions and truth tables', d1: 'Equivalences and negation', d4: 'Equivalences and negation', d2: 'Quantifiers',
      d5: 'Mathematical induction', d6: 'Proof strategies', d14: 'Relations', d15: 'Relations', d16: 'Sets and functions',
      d9: 'Counting principles', d10: 'Sets and functions', d11: 'Sets and functions', d12: 'Counting principles', d13: 'Counting principles' },
    calc3: { c14: 'The cross product', c15: 'The cross product', c19: 'Partial derivatives and the chain rule',
      c6: 'Local extrema', c7: 'Local extrema', c8: 'Lagrange multipliers', c22: 'Double integrals', c3: 'Polar, cylindrical, spherical', c4: 'Polar, cylindrical, spherical', c20: 'Polar, cylindrical, spherical',
      c5: 'Vector fields, divergence, curl', c12: 'Line integrals and conservative fields', c13: 'Line integrals and conservative fields',
      c9: "Green's theorem", c10: 'Stokes and the divergence theorem', c11: 'Stokes and the divergence theorem' },
    linalg: { l6: 'Eigenvalues and eigenvectors', l7: 'Eigenvalues and eigenvectors', l8: 'Diagonalization',
      l13: 'Orthogonality and Gram–Schmidt', l15: 'Orthogonality and Gram–Schmidt', l22: 'Orthogonality and Gram–Schmidt', l14: 'Least squares' },
    stats: { s5: 'Sampling distributions and the CLT', s1: 'Confidence intervals', s4: 'Confidence intervals', s2: 'Hypothesis testing', s3: 'Hypothesis testing',
      s6: 'Multiple regression', s7: 'Multiple regression', s8: 'Multiple regression', s9: 'Multiple regression', s10: 'Multiple regression',
      s14: 'Logistic regression', s15: 'The GLM family', s16: 'The GLM family' },
    python: { p1: 'Names and objects', p19: 'Names and objects', p11: 'Built-in types', p2: 'Functions and arguments', p17: 'Functions and arguments',
      p6: 'Scope and closures', p16: 'Scope and closures', p15: 'Exceptions' },
    physics: { ph3: 'One-dimensional kinematics', ph2: 'Projectile motion', ph9: 'Work and energy', ph10: 'Work and energy',
      ph13: 'Electrostatics', ph12: 'Magnetism and induction', ph14: 'Magnetism and induction' }
  };
  for (const s of window.SUBJECTS) {
    const titles = new Set(s.learn.map(c => c.title)), m = MAP[s.id] || {};
    for (const q of s.questions) {
      if (m[q.id]) { if (titles.has(m[q.id])) q.unit = m[q.id]; else window.LESSON_MISSES.push(`${s.id}: unit ${m[q.id]} for ${q.id}`); continue; }
      const owners = s.learn.filter(c => c.skill === q.skill);
      if (owners.length === 1) q.unit = owners[0].title; else window.LESSON_MISSES.push(`${s.id}: no unit for ${q.id}`);
    }
  }
  // Generators whose explanations show exponent 1 on purpose (exponent rules, powers of i).
  for (const s of window.SUBJECTS) for (const g of s.generators) if (g.id === 'ag-exp' || g.id === 'pu-ipow') g.raw = true;
})();
