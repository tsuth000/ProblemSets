# Browser checks at phone width: unit isolation in checks, reviews, and practice; no page errors; no horizontal overflow.
import json, sys
from playwright.sync_api import sync_playwright
URL = 'file:///home/claude/mathdrill/app/assets/index.html'
SHOTS = '/tmp/claude-0/shots/'
errs = []
def seed(page, state):
    page.add_init_script("window.__TEST__ = true;" + (f"localStorage.setItem('problemsets.v1', {json.dumps(json.dumps(state))});" if state is not None else "localStorage.clear();"))
with sync_playwright() as p:
    b = p.chromium.launch()
    def newpage(state=None):
        ctx = b.new_context(viewport={'width': 360, 'height': 780}, device_scale_factor=2, is_mobile=True, has_touch=True)
        pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append('pageerror ' + str(e))); pg.on('console', lambda m: m.type == 'error' and errs.append('console ' + m.text))
        seed(pg, state); pg.goto(URL); pg.wait_for_timeout(400); return pg
    # A. Every unit set stays inside its unit.
    pg = newpage(None)
    res = pg.evaluate("""() => { const out = []; for (const s of SUBJECTS) s.learn.forEach(c => { for (let k = 0; k < 6; k++) { const L = __T.buildUnitSet(s.id, c, 5);
        for (const i of L) if (i.item.unit !== c.title) out.push(`${s.id}/${c.title}: got ${i.item.id} from ${i.item.unit}`);
        const avail = Object.values(__T.ITEMS).filter(i => i.subject === s.id && i.unit === c.title).length; if (avail && L.length < Math.min(5, avail)) out.push(`${s.id}/${c.title}: short set ${L.length}`); } }); return out; }""")
    print('A unit sets:', 'ok' if not res else res[:10])
    # B. Fresh learner: topic practice and subject practice reach only unit 1 of each subject.
    res = pg.evaluate("""() => { const out = []; for (const s of SUBJECTS) for (let k = 0; k < 5; k++) { const L = __T.buildSession({ subject: s.id, len: 10 }).list;
        for (const i of L) if (i.item.unit !== s.learn[0].title) out.push(`${s.id}: ${i.item.id} from ${i.item.unit}`); }
        const lim = __T.buildSession({ subject: 'calc1', skill: 'Limits', len: 10 }).list.map(i => i.item.unit); if (lim.some(u => u !== 'Limits and limit laws')) out.push('calc1 Limits drill leaked ' + lim.join(',')); return out; }""")
    print('B fresh practice:', 'ok' if not res else res[:10])
    pg.close()
    # C. The reported case: Inequalities due for review, nothing else studied.
    today = '2026-10-05'
    state = {'units': {'algebra|Inequalities': {'stars': 2, 'due': '2026-10-01', 'step': 1}}, 'settings': {'length': 10}}
    pg = newpage(state)
    res = pg.evaluate("""() => { const out = []; for (let k = 0; k < 20; k++) { const ses = __T.buildToday(); for (const i of ses.list) if (i.item.unit !== 'Inequalities') out.push(i.item.id + ' from ' + i.item.unit); } return out; }""")
    print('C today review:', 'ok' if not res else sorted(set(res))[:10])
    pg.close()
    # D. Every lesson stage at 360 px: no horizontal page overflow.
    pg = newpage(None)
    units = pg.evaluate("() => SUBJECTS.map(s => [s.id, s.learn.length])")
    over = []; visited = 0
    for sid, n in units:
        for i in range(n):
            pg.evaluate("""([sid, i]) => { const b = document.createElement('button'); b.dataset.a = 'lesson'; b.dataset.sid = sid; b.dataset.i = i; document.getElementById('app').appendChild(b); b.click(); b.remove(); }""", [sid, i])
            pg.wait_for_timeout(30)
            if not pg.query_selector('.steps'): over.append(f'{sid}/{i}: lesson did not open'); continue
            for k in range(8):
                if 'undefined' in (pg.inner_text('.stage-h') if pg.query_selector('.stage-h') else ''): over.append(f'{sid}/{i} stage {k}: undefined heading')
                w = pg.evaluate("() => [document.documentElement.scrollWidth, innerWidth, [...document.querySelectorAll('.lesson-body, .worked, .sheet')].filter(e => e.scrollWidth > e.clientWidth + 2 && !e.closest('.katex-display')).length]")
                if w[0] > w[1] + 1: over.append(f'{sid}/{i} stage {k}: page {w[0]}')
                for d in pg.query_selector_all('details.sol'): d.evaluate("d => d.open = true")
                w = pg.evaluate("() => document.documentElement.scrollWidth - innerWidth")
                if w > 1: over.append(f'{sid}/{i} stage {k} solutions open: +{w}px')
                visited += 1
                nxt = pg.query_selector('.btn.primary[data-a="stage"]')
                if not nxt: break
                nxt.click(); pg.wait_for_timeout(20)
            pg.evaluate("() => window.appBack()")
    print('D overflow:', 'ok' if not over else over[:15], '| stages visited:', visited)
    # Screenshots of the Inequalities lesson: notes and worked examples.
    idx = pg.evaluate("() => SUBJECTS.find(s => s.id === 'algebra').learn.findIndex(c => c.title === 'Inequalities')")
    pg.evaluate("""(i) => { const b = document.createElement('button'); b.dataset.a = 'lesson'; b.dataset.sid = 'algebra'; b.dataset.i = i; document.getElementById('app').appendChild(b); b.click(); b.remove(); }""", idx)
    for k in range(3):
        pg.wait_for_timeout(300)
        for d in pg.query_selector_all('details.sol'): d.evaluate("d => d.open = true")
        pg.screenshot(path=f'{SHOTS}ineq_{k}.png', full_page=True)
        nxt = pg.query_selector('.btn.primary[data-a="stage"]')
        if nxt: nxt.click()
    b.close()
print('errors:', errs[:10] if errs else 'none')
