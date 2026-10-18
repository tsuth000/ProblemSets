# List display equations that need sideways scrolling at 360 px, as the app renders them, in every lesson stage.
import sys
from playwright.sync_api import sync_playwright
ONLY = sys.argv[1:]
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 360, 'height': 780})
    pg.goto('file:///home/claude/mathdrill/app/assets/index.html'); pg.wait_for_timeout(400)
    out = []
    for sid, n in pg.evaluate("() => SUBJECTS.map(s => [s.id, s.learn.length])"):
        if ONLY and sid not in ONLY: continue
        for i in range(n):
            pg.evaluate("([s, i]) => { const b = document.createElement('button'); b.dataset.a = 'lesson'; b.dataset.sid = s; b.dataset.i = i; document.getElementById('app').appendChild(b); b.click(); b.remove(); }", [sid, i])
            title = pg.evaluate("([s, i]) => SUBJECTS.find(x => x.id === s).learn[i].title", [sid, i])
            for k in range(6):
                pg.wait_for_timeout(20)
                for d in pg.query_selector_all('details.sol'): d.evaluate("d => d.open = true")
                for w in pg.evaluate("() => [...document.querySelectorAll('.katex-display')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.querySelector('annotation') ? e.querySelector('annotation').textContent.slice(0, 70) : '?')"):
                    out.append(f'{sid}/{title} [stage {k}]: {w}')
                for w in pg.evaluate("() => [...document.querySelectorAll('pre.code')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => 'CODE ' + e.scrollWidth + '/' + e.clientWidth + ' ' + e.textContent.split('\\n').reduce((a, l) => l.length > a.length ? l : a, ''))"):
                    out.append(f'{sid}/{title} [stage {k}]: {w}')
                for w in pg.evaluate("() => [...document.querySelectorAll('table.tt')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => 'TABLE ' + e.scrollWidth + '/' + e.clientWidth + ' ' + e.textContent.slice(0, 50))"):
                    out.append(f'{sid}/{title} [stage {k}]: {w}')
                n2 = pg.query_selector('.btn.primary[data-a="stage"]')
                if not n2: break
                n2.click()
            pg.evaluate("() => window.appBack()")
    print(len(out)); print('\n'.join(out))
    b.close()
