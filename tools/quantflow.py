# Quant interview prep checks at phone width: simulation integrity, full UI runs, video practice with a fake microphone.
import re
from playwright.sync_api import sync_playwright
URL = 'file:///home/claude/mathdrill/app/assets/index.html'; SH = '/tmp/claude-0/shots/'
errs = []
with sync_playwright() as p:
    b = p.chromium.launch(args=['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'])
    ctx = b.new_context(viewport={'width': 360, 'height': 780}, device_scale_factor=2, permissions=['microphone'])
    pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append('pageerror ' + str(e))); pg.on('console', lambda m: m.type == 'error' and errs.append('console ' + m.text))
    pg.add_init_script("window.__TEST__ = true; localStorage.clear();"); pg.goto(URL); pg.wait_for_timeout(500)
    # A. 30 simulated tests: 50 questions, valid MC, numeric items show the true answer as the keyed choice.
    for mode, size in [('std', 50), ('hard', 30)]:
      res = pg.evaluate(r"""([mode, size]) => { const out = [], cats = {}; for (let k = 0; k < 30; k++) { const L = __T.buildSim(mode); if (L.length !== size) out.push('length ' + L.length);
        for (const q of L) { cats[q.cat] = (cats[q.cat] || 0) + 1;
          if (q.type !== 'mc' || q.correct < 0 || q.correct >= q.choices.length || q.choices.length < 3) out.push('bad mc ' + q.item.id);
          if (new Set(q.choices).size !== q.choices.length) out.push('dup ' + q.item.id + ' ' + q.choices.join('|'));
          if (q.answer != null) { const want = R.fmt(q.answer, q.tol ? 3 : 4); if (q.choices[q.correct] !== '\\(' + want + '\\)') out.push('key ' + q.item.id); } } }
        return { out: out.slice(0, 10), cats }; }""", [mode, size])
      print('A sim build', mode, ':', res['out'] or 'ok', res['cats'])
    # B. Home and subject entry points.
    home = pg.inner_text('#app'); print('B home has subject under Applied:', home.index('Applied') < home.index('Quant interviews') and home.index('Physics') < home.index('Quant interviews'))
    pg.click('button.subj[data-id="quant"]'); pg.wait_for_timeout(300)
    print('B panel buttons:', pg.locator('.qmode').count()); pg.screenshot(path=SH + 'q_subject.png', full_page=True)
    # C. Run a whole simulation through the UI.
    pg.click('.qmode[data-a="simstart"]:not([data-mode])'); pg.wait_for_timeout(300); pg.screenshot(path=SH + 'q_sim.png', full_page=True)
    over = []
    for i in range(50):
        if pg.evaluate("() => document.documentElement.scrollWidth > innerWidth + 1"): over.append(i)
        if i % 7 == 3: pg.click('button[data-a="simskip"]')
        else: pg.click('button.choice >> nth=0'); pg.click('button[data-a="simnext"]')
        pg.wait_for_timeout(15)
    pg.wait_for_timeout(300)
    print('C sim end view:', pg.evaluate("() => document.getElementById('app').dataset.view"), '| overflow on', over or 'none')
    for d in pg.query_selector_all('details.simrev')[:3]: d.evaluate("d => d.open = true")
    pg.screenshot(path=SH + 'q_simend.png', full_page=True)
    pg.evaluate("() => window.appBack()"); pg.wait_for_timeout(200)
    pg.click('.qmode[data-a="simstart"][data-mode="hard"]'); pg.wait_for_timeout(300); pg.screenshot(path=SH + 'q_hard.png', full_page=True)
    for i in range(30):
        pg.click('button.choice >> nth=0'); pg.click('button[data-a="simnext"]'); pg.wait_for_timeout(15)
    pg.wait_for_timeout(300); print('C2 hard sim end:', pg.evaluate("() => document.getElementById('app').dataset.view"), pg.inner_text('.title.score'))
    pg.evaluate("() => window.appBack()"); pg.wait_for_timeout(200)
    # D. Video practice with recording.
    pg.click('.qmode[data-a="vqstart"]'); pg.wait_for_timeout(200)
    pg.click('button[data-a="vqrec"]'); pg.wait_for_timeout(800)
    print('D rec toggle:', pg.inner_text('button[data-a="vqrec"]'))
    pg.click('button[data-a="vqgo"]'); pg.wait_for_timeout(1200); pg.screenshot(path=SH + 'q_vprep.png')
    pg.wait_for_timeout(4800); print('D phase after prep:', 'Answer aloud' in pg.inner_text('#app'))
    pg.screenshot(path=SH + 'q_vans.png'); pg.wait_for_timeout(2500)
    pg.click('button[data-a="vqdone"]'); pg.wait_for_timeout(1200)
    pg.click('button.vqc >> nth=0'); pg.click('button.vqc >> nth=2'); pg.wait_for_timeout(200)
    print('D review: audio', pg.locator('audio.vqaudio').count(), '| checks', pg.locator('button.vqc.on').count())
    pg.screenshot(path=SH + 'q_vrev.png', full_page=True)
    # E. Quant sprint decks.
    pg.evaluate("() => window.appBack()"); pg.wait_for_timeout(100)
    pg.click('.qmode[data-a="sprints"]'); pg.wait_for_timeout(200)
    for deck in ['qmul', 'qfrac', 'qpct']:
        pg.click(f'button.deck[data-id="{deck}"]'); pg.wait_for_timeout(200)
        for _ in range(15): pg.click('button.schoice >> nth=0'); pg.wait_for_timeout(950)
        pg.evaluate("() => window.appBack()"); pg.wait_for_timeout(150)
    print('E sprints ran')
    b.close()
print('errors:', errs or 'none')
