# Independent check of generator answers: SymPy for v, key expressions for vk, real execution for Python code.
import json, sys, io, contextlib, math, html, re, signal
import sympy as sp
from sympy import *
x, y, z, t, n, k, r, u, v_ = symbols('x y z t n k r u v')
def ineqkey(a, b, op, c):
    bound = Rational(c - b, a); flip = {'<': '>', '>': '<', '<=': '>=', '>=': '<='}
    o = op if a > 0 else flip[op]
    return {'<': 'lt', '>': 'gt', '<=': 'le', '>=': 'ge'}[o] + '|' + str(bound)
def cls2(M):
    d = M.det()
    return 'saddle' if d < 0 else ('minimum' if M[0, 0] > 0 else 'maximum')
def defin(M):
    ev = [N(e) for e in M.eigenvals(multiple=True)]
    if all(e > 0 for e in ev): return 'positive definite'
    if all(e < 0 for e in ev): return 'negative definite'
    return 'indefinite'
import builtins, itertools, functools, re as _re
import numpy as np
def cls(f, nv):
    vals = [f(*vv) for vv in itertools.product([True, False], repeat=nv)]
    return 'tautology' if all(vals) else 'contradiction' if not any(vals) else 'contingency'
def equiv(f, g):
    return all(bool(f(*vv)) == bool(g(*vv)) for vv in itertools.product([True, False], repeat=2))

# Independent logic checkers for the quant subject.
def syl(prem, concl):
    # Worlds: which of the 8 regions of three sets are inhabited; every set nonempty.
    def holds(w, st):
        kind, X, Y = st; xi, yi = 'ABC'.index(X), 'ABC'.index(Y)
        regs = [r for r in range(8) if w[r]]
        inx = lambda r: (r >> xi) & 1; iny = lambda r: (r >> yi) & 1
        if kind == 'all': return all(iny(r) for r in regs if inx(r))
        if kind == 'no': return not any(inx(r) and iny(r) for r in regs)
        if kind == 'some': return any(inx(r) and iny(r) for r in regs)
        return any(inx(r) and not iny(r) for r in regs)
    outs = set()
    for w in itertools.product([0, 1], repeat=8):
        if not all(any(w[r] and (r >> b) & 1 for r in range(8)) for b in range(3)): continue
        if all(holds(w, p) for p in prem): outs.add(holds(w, concl))
    return 'True' if outs == {True} else 'False' if outs == {False} else 'Cannot tell'
def order_q(rels, idx):
    # rels: [taller, shorter] pairs forming a chain; rank people by how many are below them.
    people = sorted({p for r in rels for p in r})
    below = {p: set() for p in people}
    for _ in people:
        for a, b in rels: below[a] |= {b} | below[b]
    ranked = sorted(people, key=lambda p: -len(below[p]))
    return ranked[idx]
def cond(form):
    # Premise P -> Q plus one fact; answer the asked proposition across all consistent truth assignments.
    fact = [lambda p, q: p, lambda p, q: not q, lambda p, q: q, lambda p, q: not p][form]
    ask = [lambda p, q: q, lambda p, q: p, lambda p, q: p, lambda p, q: q][form]
    vals = {ask(p, q) for p in (True, False) for q in (True, False) if ((not p) or q) and fact(p, q)}
    return 'Yes' if vals == {True} else 'No' if vals == {False} else 'Cannot tell'

# Distribution helpers for the probability subject (independent of the app's tables).
import mpmath as _mp
_mp.mp.dps = 30
def _bis(f, lo, hi):
    lo, hi = _mp.mpf(lo), _mp.mpf(hi)
    for _ in range(200):
        mid = (lo + hi)/2
        if f(mid) > 0: hi = mid
        else: lo = mid
    return (lo + hi)/2
def zq(p): return Float(_mp.sqrt(2)*_mp.erfinv(2*_mp.mpf(str(N(p, 30))) - 1), 20)
def tq(df, p): return Float(_bis(lambda t: 1 - 0.5*_mp.betainc(_mp.mpf(df)/2, 0.5, 0, df/(df + t*t), regularized=True) - _mp.mpf(str(N(p, 30))), 0, 1000), 20)
def c2cdf(k, x): return Float(_mp.gammainc(_mp.mpf(k)/2, 0, _mp.mpf(str(N(x, 30)))/2, regularized=True), 20)
def c2q(k, p): return Float(_bis(lambda x: _mp.gammainc(_mp.mpf(k)/2, 0, x/2, regularized=True) - _mp.mpf(str(N(p, 30))), 0, 500), 20)
from sympy.ntheory.continued_fraction import continued_fraction_periodic, continued_fraction_reduce
from sympy.ntheory.modular import crt
from sympy.combinatorics import Permutation
from sympy.functions.combinatorial.numbers import partition
from sympy.solvers.diophantine.diophantine import diop_DN
def numset(e):
    e = nsimplify(expand(sympify(e)))
    if not e.is_real: return 'C'
    if e.is_integer: return 'N' if e >= 0 else 'Z'
    if e.is_rational: return 'Q'
    return 'R'
def israt(e):
    e = nsimplify(expand(sympify(e)))
    r = e.is_rational
    if r is None: r = Poly(minimal_polynomial(e, Symbol('_m'))).degree() == 1
    return bool(r)
def sercls(e):
    n = Symbol('n', integer=True, positive=True)
    E = sympify(e, locals={'n': n})
    if not Sum(E, (n, 1, oo)).is_convergent(): return 'div'
    return 'abs' if Sum(Abs(E), (n, 1, oo)).is_convergent() else 'cond'
def surf(w):
    n = len(w); par = list(range(n))
    def find(x):
        while par[x] != x: x = par[x]
        return x
    def ends(i): return (i, (i + 1) % n) if w[i].islower() else ((i + 1) % n, i)
    for i in range(n):
        for j in range(i + 1, n):
            if w[i].lower() == w[j].lower():
                (s1, e1), (s2, e2) = ends(i), ends(j)
                par[find(s1)] = find(s2); par[find(e1)] = find(e2)
    V = len({find(x) for x in range(n)}); chi = V - n // 2 + 1
    ori = all(w.count(c) == 1 and w.count(c.upper()) == 1 for c in set(w.lower()))
    return ({2: 'Sphere', 0: 'Torus', -2: 'Genus 2 surface'} if ori else {1: 'Projective plane', 0: 'Klein bottle', -1: 'Three crosscaps'}).get(chi, '?')
def serco(res, a0, a1, k):
    x = Symbol('x'); N = k + 4
    c = symbols('c0:%d' % (N + 1))
    Y = sum(c[i]*x**i for i in range(N + 1))
    e = expand(res(Y, x))
    eqs = [e.coeff(x, i) for i in range(N - 1)] + [c[0] - a0, c[1] - a1]
    sol = solve(eqs, c[:N + 1], dict=True)[0]
    return sol[c[k]]
def nthroot(f, n, include0=False, hi=60, steps=60000):
    roots = [0] if include0 else []
    prev_s = _mp.mpf('1e-9'); prev = f(prev_s)
    for i in range(1, steps + 1):
        s = hi * _mp.mpf(i) / steps; v = f(s)
        if v == 0 or (prev < 0) != (v < 0):
            roots.append(_mp.findroot(f, (prev_s, s), solver='bisect') if v != 0 else s)
            if len(roots) >= n: return roots[n - 1]
        prev_s, prev = s, v
    return _mp.nan
def sigalg(X, C):
    S = {frozenset(), X} | set(C)
    while True:
        T = S | {X - A for A in S} | {A | B for A in S for B in S}
        if T == S: return len(S)
        S = T
def christoffel(g, X, k, i, j):
    gi = g.inv(); n = len(X)
    return simplify(Rational(1, 2)*sum(gi[k, l]*(diff(g[j, l], X[i]) + diff(g[i, l], X[j]) - diff(g[i, j], X[l])) for l in range(n)))
from sympy.calculus.euler import euler_equations
from sympy.physics.hydrogen import R_nl
def eom(Lf, q0, v0):
    t = Symbol('t'); q = Function('q')(t)
    L = Lf(q, diff(q, t)); eq = euler_equations(L, q, t)[0]
    acc = solve(eq.lhs, diff(q, t, 2))[0]
    return acc.subs(diff(q, t), v0).subs(q, q0)
def ricci_scalar(g, X):
    n = len(X); gi = g.inv()
    Gm = [[[simplify(Rational(1, 2)*sum(gi[a, d]*(diff(g[d, b], X[c]) + diff(g[d, c], X[b]) - diff(g[b, c], X[d])) for d in range(n))) for c in range(n)] for b in range(n)] for a in range(n)]
    def Riem(a, b, c, d):
        return diff(Gm[a][d][b], X[c]) - diff(Gm[a][c][b], X[d]) + sum(Gm[a][c][e]*Gm[e][d][b] - Gm[a][d][e]*Gm[e][c][b] for e in range(n))
    Ric = Matrix(n, n, lambda b, d: sum(Riem(a, b, a, d) for a in range(n)))
    return N(sum(gi[b, d]*Ric[b, d] for b in range(n) for d in range(n)).subs({X[i]: Rational(7 + i, 10) for i in range(n)}), 20)

# ---------- Stochastic calculus checks: each takes a route independent of the closed form taught in the lesson ----------
def gE(f, mean=0, sd=1):
    """E[f(X)] for X ~ N(mean, sd^2), by numerical quadrature against the normal density."""
    mean, sd = _mp.mpf(str(N(sympify(mean), 40))), _mp.mpf(str(N(sympify(sd), 40)))
    # The density is below e^-800 beyond |z| = 40, so the finite range loses nothing and keeps f's argument near the mean.
    return _mp.quad(lambda z: f(mean + sd * z) * _mp.exp(-z * z / 2), [-40, -8, -2, 0, 2, 8, 40]) / _mp.sqrt(2 * _mp.pi)
def gtail(cut, mean=0, sd=1, f=lambda y: 1):
    """E[f(X); X > cut] for X ~ N(mean, sd^2): quadrature of the density from the cut upward (no use of Phi)."""
    mean, sd, cut = (_mp.mpf(str(N(sympify(q), 40))) for q in (mean, sd, cut))
    z0 = (cut - mean) / sd
    return _mp.quad(lambda z: f(mean + sd * z) * _mp.exp(-z * z / 2), [z0, z0 + 2, z0 + 8, max(z0 + 9, 40)]) / _mp.sqrt(2 * _mp.pi)
def gen_drift(f, mu, sig, t0, x0, h='1e-12'):
    """Drift of f(t, X_t) at (t0, x0) from the definition lim (E f(t+h, X_{t+h}) - f(t, x)) / h, with one exact Gaussian step."""
    with _mp.workdps(60):
        h, t0, x0 = _mp.mpf(h), _mp.mpf(t0), _mp.mpf(x0)
        E = gE(lambda y: f(t0 + h, y), x0 + mu(t0, x0) * h, sig(t0, x0) * _mp.sqrt(h))
        return (E - f(t0, x0)) / h
def gen_vol(f, mu, sig, t0, x0, h='1e-12'):
    """Diffusion coefficient of f(t, X_t): sqrt(Var(f(X_{t+h})) / h) as h -> 0."""
    with _mp.workdps(60):
        h, t0, x0 = _mp.mpf(h), _mp.mpf(t0), _mp.mpf(x0)
        m, s = x0 + mu(t0, x0) * h, sig(t0, x0) * _mp.sqrt(h)
        e1 = gE(lambda y: f(t0 + h, y), m, s); e2 = gE(lambda y: f(t0 + h, y) ** 2, m, s)
        return _mp.sqrt((e2 - e1 ** 2) / h)
def ibp_var(fs, T):
    """Var of int_0^T f(s) dW_s via integration by parts, f(T) W_T - int f'(s) W_s ds, and Cov(W_s, W_u) = min(s, u)."""
    s_, u_ = symbols('s_ u_', positive=True); f = sympify(fs).subs(Symbol('s'), s_); g = diff(f, s_); fT = f.subs(s_, T)
    a = fT ** 2 * T - 2 * fT * integrate(g * s_, (s_, 0, T))
    b = 2 * integrate(integrate(g * g.subs(s_, u_) * s_, (s_, 0, u_)).subs(u_, u_), (u_, 0, T))
    return N(a + b, 20)
def bs_quad(S, K, r, sig, T, kind):
    """Discounted risk-neutral expectation of the payoff over the lognormal terminal price."""
    S, K, r, sig, T = map(_mp.mpf, (S, K, r, sig, T))
    pay = {'call': lambda x: max(x - K, 0), 'put': lambda x: max(K - x, 0), 'digital': lambda x: 1 if x > K else 0}[kind]
    z0 = (_mp.log(K / S) - (r - sig ** 2 / 2) * T) / (sig * _mp.sqrt(T))
    f = lambda z: pay(S * _mp.exp((r - sig ** 2 / 2) * T + sig * _mp.sqrt(T) * z)) * _mp.exp(-z * z / 2)
    return _mp.exp(-r * T) * _mp.quad(f, [-_mp.inf, z0 - 6, z0, z0 + 6, _mp.inf]) / _mp.sqrt(2 * _mp.pi)
def bs_greek(S, K, r, sig, T, kind, which):
    with _mp.workdps(40):
        h = _mp.mpf('1e-6') * S
        p = lambda x: bs_quad(x, K, r, sig, T, kind)
        return (p(S + h) - p(S - h)) / (2 * h) if which == 'delta' else (p(S + h) - 2 * p(S) + p(S - h)) / h ** 2
def ruin(Nn, p, x):
    """Gambler's ruin by solving the first-step linear system: (P(reach N before 0), E[duration])."""
    M = np.zeros((Nn + 1, Nn + 1)); bP = np.zeros(Nn + 1); bT = np.zeros(Nn + 1)
    for i in range(Nn + 1):
        M[i, i] = 1
        if 0 < i < Nn: M[i, i + 1] -= p; M[i, i - 1] -= 1 - p; bT[i] = 1
    bP[Nn] = 1
    return float(np.linalg.solve(M, bP)[x]), float(np.linalg.solve(M, bT)[x])
def hit_drift(mu, a, b):
    """P(BM with drift mu hits b before -a), from the boundary-value problem u''/2 + mu u' = 0."""
    xx = Symbol('xx'); uf = Function('uf')
    sol = dsolve(Eq(uf(xx).diff(xx, 2) / 2 + sympify(mu) * uf(xx).diff(xx), 0), uf(xx), ics={uf(-sympify(a)): 0, uf(sympify(b)): 1})
    return N(sol.rhs.subs(xx, 0), 20)
def ou_moments(th, m, sg, x0, tt):
    """Mean and variance of an OU process from the moment ODEs m' = th (m - M), V' = -2 th V + sg^2."""
    tau = Symbol('tau'); M_ = Function('M_'); V_ = Function('V_')
    Ms = dsolve(Eq(M_(tau).diff(tau), sympify(th) * (sympify(m) - M_(tau))), M_(tau), ics={M_(0): sympify(x0)}).rhs
    Vs = dsolve(Eq(V_(tau).diff(tau), -2 * sympify(th) * V_(tau) + sympify(sg) ** 2), V_(tau), ics={V_(0): 0}).rhs
    return N(Ms.subs(tau, sympify(tt)), 20), N(Vs.subs(tau, sympify(tt)), 20)
def fp_prob(a, tt):
    """P(first passage to level a by time t), by integrating the first-passage density."""
    a = _mp.mpf(a)
    return _mp.quad(lambda s: a / _mp.sqrt(2 * _mp.pi * s ** 3) * _mp.exp(-a * a / (2 * s)), [0, tt])
def walk_moments(nn, p):
    """Mean and variance of a +-1 random walk after nn steps, by enumerating every path."""
    p = Rational(p); m = Rational(0); m2 = Rational(0)
    for steps in itertools.product([1, -1], repeat=nn):
        k = steps.count(1); pr = p ** k * (1 - p) ** (nn - k); s = sum(steps); m += pr * s; m2 += pr * s * s
    return m, m2 - m * m
def walk_pmf(nn, kk):
    """P(S_n = k) for the simple symmetric walk, by convolving the one-step distribution."""
    d = np.array([1.0])
    for _ in range(nn): d = np.convolve(d, [0.5, 0, 0.5])
    i = kk + nn
    return float(d[i]) if 0 <= i < len(d) else 0.0
def pois_gf(lt, kk):
    """P(N = k) for Poisson(lt), as a coefficient of the generating function exp(lt (s - 1))."""
    s_ = Symbol('s_')
    return N(series(exp(sympify(lt) * (s_ - 1)), s_, 0, kk + 1).removeO().coeff(s_, kk), 20)
def is_mart(fs):
    """'yes' if f(t, W_t) has zero drift, from the generator's definition (an exact Gaussian step and h -> 0) at several points."""
    tt, w = symbols('t w'); f = lambdify((tt, w), sympify(fs, locals={'t': tt, 'w': w}), 'mpmath')
    d = [abs(gen_drift(f, lambda a, b: 0, lambda a, b: 1, t0, w0)) for t0, w0 in [(0.3, -0.7), (1.1, 0.4), (2.5, 1.3)]]
    return 'yes' if max(d) < 1e-6 else 'no'
def solves_heat(fs):
    """'yes' if u(t, x) satisfies u_t + u_xx / 2 = 0."""
    tt, xx = symbols('t x'); f = sympify(fs, locals={'t': tt, 'x': xx})
    return 'yes' if simplify(diff(f, tt) + diff(f, xx, 2) / 2) == 0 else 'no'
env = dict(globals())
for b in ['sum', 'min', 'max', 'abs', 'round', 'any', 'all', 'range', 'len', 'str', 'int', 'float', 'bool', 'sorted', 'list', 'set']: env[b] = getattr(builtins, b)
env['product'] = itertools.product; env['permutations'] = itertools.permutations; env['prod'] = math.prod; env['pow'] = builtins.pow; env['reduce'] = functools.reduce; env['np'] = np; env['cls'] = cls; env['equiv'] = equiv; env['syl'] = syl; env['zq'] = zq; env['tq'] = tq; env['c2cdf'] = c2cdf; env['c2q'] = c2q; env['order_q'] = order_q; env['cond'] = cond
from cxx import run_cpp
from concurrent.futures import ThreadPoolExecutor
jobs = json.load(open(sys.argv[1]))
srcs = sorted({j['cpp'] for j in jobs if j.get('cpp')})
with ThreadPoolExecutor(3) as ex: CPPOUT = dict(zip(srcs, ex.map(run_cpp, srcs)))
bad, done = [], 0
for j in jobs:
    try:
        if j.get('cpp'):
            out = CPPOUT[j['cpp']].strip()
            if j.get('c') is not None:
                want = html.unescape(j['c'][0]).strip()
                if want == 'Undefined behavior': ok = out.startswith('RUNTIME') and ('runtime error' in out or 'AddressSanitizer' in out or 'SEGV' in out or 'RUNTIME -11' in out)
                elif want in ('Does not compile', 'It does not compile'): ok = out.startswith('COMPILE ERROR') and bool(j.get('cerr')) and j['cerr'] in out
                elif want.startswith('Throws '): ok = out.startswith('RUNTIME') and want.split('::')[-1] in out and 'Sanitizer' not in out
                else: ok = out == want
                if not ok: bad.append((j['id'], 'cpp', out[:300], want))
            else:
                try: ok = int(out) == j['answer'] if float(j['answer']).is_integer() and not j.get('tol') else abs(float(out) - j['answer']) <= (j.get('tol') or 0) + 1e-6 * max(1, abs(j['answer']))
                except ValueError: ok = False
                if not ok: bad.append((j['id'], 'cpp', out, j['answer']))
        elif j.get('code') is not None and not j['sid'].startswith('cpp'):
            buf = io.StringIO()
            g = {}
            try:
                with contextlib.redirect_stdout(buf): exec(j['code'], g)
                out = buf.getvalue().strip()
            except Exception as e:
                out = type(e).__name__
            if j.get('c') is not None:
                want = html.unescape(_re.sub(r'<[^>]+>', '', j['c'][0])).strip()
                if not (out == want or want.startswith(out) and out or out.startswith(want.split(':')[0])):
                    bad.append((j['id'], 'code', out, want))
            else:
                if abs(float(out) - j['answer']) > 1e-6 * max(1, abs(j['answer'])):
                    bad.append((j['id'], 'code', out, j['answer']))
        elif j.get('v'):
            raw = eval(j['v'], env)
            cands = list(raw) if isinstance(raw, (list, tuple)) else [raw]
            vals = [float(N(c)) for c in cands]
            tol = (j.get('tol') or 0) + 1e-6 * max(1, abs(j['answer']))
            if not any(abs(val - j['answer']) <= tol for val in vals): bad.append((j['id'], j['v'], vals, j['answer']))
        elif j.get('vk'):
            got = str(eval(j['vk'], env))
            if got != str(j['key']): bad.append((j['id'], j['vk'], got, j['key']))
        else:
            continue
        done += 1
    except Exception as e:
        bad.append((j['id'], 'ERROR', repr(e)[:150], j.get('v') or j.get('vk')))
seen = set()
for b in bad:
    if b[0] in seen: continue
    seen.add(b[0]); print('MISMATCH', b)
print(f'verified {done} instances; {len(bad)} mismatches')
