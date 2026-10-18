# Problem Sets (Android)

Offline practice app: discrete math, Calc III, linear algebra, statistical modeling, Python, physics.

## Rebuild
Requires JDK 17+ and Android SDK (platform 34, build-tools 35). Edit SDK path in build.sh, then run `./build.sh`.
Output: build/ProblemSets.apk. Keep release.keystore; updates must be signed with the same key to install over the old version.

## Adding questions
Each subject lives in assets/js/subjects/<name>.js.
- Fixed question: { id, skill, q, c: [correct, wrong, wrong, wrong], x: explanation }. The first choice is always the correct one; the app shuffles.
- Generator: { id, skill, make(R) { return { q, answer, tol?, hint?, x } } } for numeric answers, or return c: [...] for multiple choice.
- Math uses \( inline \) and \[ display \] (KaTeX). Wrap strings in T`...` so backslashes stay literal.
- Test in any desktop browser by opening assets/index.html.

## Version 1.3: learning path

- `assets/js/lessons/<subject>.js`: beginner layer for Algebra, Trigonometry, Precalculus, Calculus I and II. Each entry attaches to a concept note by title with `hook` (plain-language idea, may embed figures), optional `more` (extra figures for the symbols stage), and `vary` (variation problems: `[question, answer, what changed]`; a number is checked numerically, an array is multiple choice with the first option correct).
- `assets/js/figs.js`: SVG plotting helper and figure library. Embed a figure in any content with `fig(key, options, caption)`; figures with `controls` get sliders.
- `assets/js/game.js`: XP, daily goal, streaks with shields, levels, unit stars, spaced-review scheduling (1, 3, 7, 14, 30, 60, 120 days), and badges.
- `assets/js/facts.js`: fluency decks for 60-second sprints.
- `src/app/problemsets/Reminders.java`: optional daily reminder (inexact daily alarm, skipped once the day's goal is met, restored after reboot).

## Version 1.4: full coverage

- Lessons for all 11 subjects: `assets/js/lessons/{discrete,calc3,linalg,stats,python,physics}.js` join the five from 1.3. Python lessons write code as HTML, so `<` and `>` must be escaped.
- `assets/js/figs2.js` (discrete math, Calculus III, linear algebra) and `assets/js/figs3.js` (statistics, Python, physics) extend the figure library. Both use the helpers exported from `figs.js` as `FIGS.util`, including a simple oblique projection for 3D sketches.
- `assets/js/facts2.js`: six more fluency decks.

## Version 1.5

- Every unit has dedicated generators (`assets/js/gens_a.js` to `gens_d.js`, registered with `registerUnitGens`). Mastery checks, reviews, and in-lesson practice draw mostly from them. Each new generator returns `v` (an independent SymPy/Python expression for its answer) or `vk`/`key` for multiple choice; Python generators are verified by executing their code.
- `assets/js/content2.js`: expanded lessons and new units (Quadratic inequalities, Tautologies and contradictions) via `amendCard` and `insertCard`.
- `assets/js/board.js`: whiteboard. `game.js`: weekly quests, ranks, memory strength, certificates, themes.

## Version 1.9: pure math, stage 1

- New "Pure math" group with four subjects: `assets/js/pm_nums.js` (Numbers and irrationals), `pm_ra.js` (Real analysis), `pm_alg.js` (Abstract algebra), and `pm_nt.js` (Number theory). Each is one file holding its lessons, fixed problems, and unit generators.
- `tools/verify.py` gains `numset`, `israt`, and `sercls` helpers and imports continued fractions, CRT, permutations, partitions, and Pell solvers from SymPy.
- `tools/displays.py` accepts subject ids to limit the scan and also flags tables that need sideways scrolling at 360 px.

## Version 1.10: pure math, stage 2

- Four more "Pure math" subjects: `pm_cx.js` (Complex analysis), `pm_top.js` (Topology), `pm_ode.js` (Differential equations), and `pm_pde.js` (Fourier analysis and PDEs).
- `tools/verify.py` gains `surf` (surface from a gluing word), `serco` (power series coefficients by undetermined coefficients), and `nthroot` (nth positive root by sign scan, for eigenvalue checks). ODE answers are checked with mpmath's `odefun`; PDE answers are checked by confirming the formula satisfies the equation and the initial or boundary data before evaluating it.

## Version 1.11: pure math, stage 3 (graduate introduction)

- Three more "Pure math" subjects: `pm_meas.js` (Measure theory), `pm_fa.js` (Functional analysis), and `pm_dg.js` (Differential geometry).
- `tools/verify.py` gains `sigalg` (generated sigma-algebra size by closure) and `christoffel` (Christoffel symbols from a metric).
- `core.js` `tidyMath` no longer drops a 1 that is an exponent or subscript (so `\int_0^1x` keeps its upper limit).
- Table cells use slightly tighter padding so every lesson table fits a 360 px screen; `displays.py` reports 0 overflowing tables or displays.

## Version 1.12: theoretical physics, part 1

- New "Theoretical physics" group: `ph_mm.js` (Mathematical methods), `ph_cm.js` (Classical mechanics), `ph_em.js` (Electromagnetism), and `ph_sr.js` (Special relativity).
- `tools/verify.py` gains `eom` (equation of motion from a Lagrangian via SymPy's `euler_equations`). Physics answers are checked by an independent route where one exists: Biot-Savart and Gauss integrals, Lorentz matrices and the field tensor, numerical delta-function limits, and energy integrals over the field.

## Version 1.13: theoretical physics, part 2

- `ph_qm.js` (Quantum mechanics), `ph_sm.js` (Statistical mechanics), `ph_gr.js` (General relativity), and `ph_qft.js` (Quantum field theory, introduction) complete the "Theoretical physics" group.
- `tools/verify.py` gains `ricci_scalar` (Christoffel symbols, Riemann and Ricci tensors from a metric, evaluated at a sample point) and imports SymPy's hydrogen radial functions. Oscillator answers are checked with truncated ladder-operator matrices, spin answers with Pauli matrices and eigenvectors, and partition-function answers by differentiating ln Z.

## Version 1.14: C++

- New "C++" group: `cpp_fund.js` (C++ fundamentals), `cpp_mod.js` (Modern C++ and performance, with low-latency and trading examples), and `cpp_alg.js` (Algorithms in C++). Code questions are plain-text subjects like Python; snippets show the body of `main` with standard headers and `using namespace std;` assumed.
- Each C++ code question carries `cpp`, the complete program. `tools/cxx.py` compiles every distinct program with `g++ -std=c++20 -fsanitize=address,undefined` against a precompiled `<bits/stdc++.h>`, runs it, and caches the output by source hash. `tools/verify.py` compares stdout with the keyed answer; "Undefined behavior" answers must trip a sanitizer, "Throws" answers must end in the named exception, and "Does not compile" answers must fail with the expected diagnostic. Keyed answers are computed separately in JavaScript, usually by brute force or a different algorithm.
- `tools/cppvary.js` and `tools/cppvary.py` compile and run the lessons' "Your turn" problems the same way.
- `tools/validate.js` limits C++ code lines to what fits a 360 px screen (32 characters in practice, 30 to 36 in lessons) and requires at least three choices per C++ question; `tools/displays.py` also flags code blocks that would scroll sideways.
- Integer answers in code subjects are graded exactly (previously a relative tolerance could accept an answer such as 4294967294 for 4294967295).

## Version 1.15: XP tiers, themes, collapsible groups

- `game.js` holds the subject groups and a difficulty tier for every subject (Foundational 1×, Core 1.5×, Intermediate 2×, Advanced 3×, Graduate 4×). A correct answer pays 10 XP × tier, up to 25% more for later units, 25% more while learning a unit or answering a due review, and 40% less for 3-star units outside their review. Within one unit on one day, correct answers 16 to 30 pay half and later ones a fifth; a tier pays half once the learner passes its cap level. Wrong answers pay nothing, "Your turn" problems pay once, and sprints, aptitude tests and video questions pay in full only for the first few runs a day. Lessons, mastery and reviews scale with the tier; weekly quests pay 50 + 10 × level.
- Levels: the step from L to L + 1 costs 50 · L^1.3 XP (level 100 at about 856,000 XP). Ranks extend to Sage at level 100. Shield capacity grows at levels 25, 50 and 75, and levels 10, 25, 50, 75 and 100 each grant a shield.
- Sixteen themes, eight light and eight dark, each a separate reward (levels, streaks, reviews, mastered units, mastery within a group, a completed subject). Themes are kept once earned; saves from earlier versions keep every theme their level had reached. Palettes are applied as CSS custom properties from `Game.palette`; the stylesheet has no hard-coded colors left, the whiteboard pens follow the theme, and the Android shell switches status-bar icons to light on dark themes and remembers the last background color to avoid a light flash at launch.
- Home: subject groups collapse and expand (state saved), with a per-group summary and an expand-all control; each subject shows its tier. Progress has a "How XP works" panel and a themes list. Badges grow from 18 to 36, including tiered counts and advanced/graduate mastery.
- The introductory "Physics" subject is now "General physics", the first subject of the "Physics" group (formerly "Theoretical physics"); it is the prerequisite course the theory subjects build on, not a duplicate. Course certificates now exist for every group.

## Version 1.16: reliable reminders, a longer rank ladder

- Reminders use a one-shot alarm that may fire in Doze (`setExactAndAllowWhileIdle` when exact alarms are allowed, `setAndAllowWhileIdle` otherwise) and schedule the next day each time they fire, replacing an inexact repeating alarm that Android could postpone for hours or skip. The manifest adds `USE_EXACT_ALARM` (Android 13+), `SCHEDULE_EXACT_ALARM` (Android 12), and battery-optimization exemption requests. Alarms are re-registered at boot, after an app update, after clock or time-zone changes, and every time the app opens.
- Settings shows reminder health (notification permission and channel, exact timing, battery optimization, next and last alarm, and whether the last one was skipped because the goal was met), with buttons to fix each restriction, to post a test notification, and to run the real alarm path one minute out.
- Ranks: 21 named ranks from Novice to Paragon (level 160), each with grades I to III; Specialist now starts at level 34, Master at 54, Grandmaster at 70. The progress screen shows the full ladder.

## Version 1.17: files in C++

- `assets/js/cpp_files.js` appends two units to C++ fundamentals: "File streams" (ofstream, ifstream, open modes, append versus truncate, buffering and closing, correct read loops and the `eof()` pitfall, getline after `>>`, splitting with stringstream, binary write and file size) and "Paths and the filesystem library" (`fs::path` parts, quoted path output, exists, file_size, create_directories, remove, remove_all, directory_iterator).
- `tools/cxx.py` runs every compiled program in its own empty temporary directory, so file questions start from a clean folder; `tools/cppvary.py` adds the `fs` alias the snippets assume.

## Version 1.18: stochastic calculus

- `assets/js/pm_stoch.js`: a Graduate-tier "Stochastic calculus" subject in the Pure math group, after Measure theory. Twelve units: processes and filtrations, random walks and Brownian motion, Brownian paths (quadratic variation, scaling, reflection), martingales, stopping times and optional stopping, the Itô integral, Itô's lemma, SDEs (GBM, Ornstein–Uhlenbeck), Feynman–Kac, Girsanov, Black–Scholes and the Greeks, and simulation (Euler–Maruyama, Milstein, Monte Carlo error).
- `tools/verify.py` gains checks that avoid the lesson's closed forms: `gE`/`gtail` (quadrature against the normal density), `gen_drift`/`gen_vol` (Itô drift and diffusion from the generator's definition with an exact Gaussian step), `ibp_var` (Itô isometry via integration by parts), `bs_quad`/`bs_greek` (option prices as discounted lognormal expectations, Greeks by finite differences), `ruin` (first-step linear systems), `hit_drift` (boundary-value ODE), `ou_moments` (moment ODEs), `fp_prob` (first-passage density), `walk_moments`/`walk_pmf` (path enumeration and convolution), `pois_gf`, `is_mart` and `solves_heat`.
- `tools/validate.js` rejects literal `\uXXXX` escapes in rendered text (String.raw templates do not decode them).
- Numeric questions with a rounding tolerance now say so under the answer box instead of asking for an exact value.

## Version 1.19

- Algebra, vertex problems: the explanation now substitutes the vertex x-value into the whole equation, constant term included, and shows each term, so a maximum or minimum that coincides with the x-value no longer reads like a repeated step.

## Version 1.20: quadratics lessons

- Algebra, "Graphs of quadratics": rewritten notes on the three forms (standard, vertex, factored), the axis of symmetry (definition, the derivation of x = -b/(2a) by completing the square, sign handling, and three other routes: vertex form, the average of the roots, two points at equal height), the vertex as maximum or minimum, and completing the square with a ≠ 1. Four new worked examples and ten "Your turn" problems.
- Algebra, "Quadratic equations": a methods table, factoring with a ≠ 1 by the ac method, and a worked grouping example.
- `au-axis` now asks six kinds of axis question: standard form with and without real roots, factored form, vertex form, two points at equal height, and recovering b from a given axis; explanations show the signs of a and b explicitly.
