'use strict';
(() => {
  const $app = document.getElementById('app');
  const S = () => Store.get();
  const subjById = id => SUBJECTS.find(s => s.id === id);
  const GROUPS = Game.GROUPS;
  const skillKey = (sid, skill) => sid + '|' + skill;
  const pct = (c, n) => (n ? Math.round((100 * c) / n) : 0);
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  // "today", "tomorrow", or "in N days" for a YYYY-MM-DD key.
  const rel = k => { const [y, m, d] = k.split('-').map(Number), t = new Date(), a = Date.UTC(y, m - 1, d), b = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), n = Math.round((a - b) / 86400000);
    return n <= 0 ? 'today' : n === 1 ? 'tomorrow' : `in ${n} days`; };
  Game.init();

  // ---------- Item index ----------
  const ITEMS = {};
  for (const s of SUBJECTS) {
    for (const q of s.questions) ITEMS[q.id] = { id: q.id, subject: s.id, skill: q.skill, unit: q.unit, kind: 'static', ref: q };
    for (const g of s.generators) ITEMS[g.id] = { id: g.id, subject: s.id, skill: g.skill, unit: g.unit, kind: 'gen', ref: g };
  }
  const skillsOf = sid => [...new Set(Object.values(ITEMS).filter(i => i.subject === sid).map(i => i.skill))];
  const missedIn = sid => Object.keys(S().missed).filter(id => ITEMS[id] && (!sid || ITEMS[id].subject === sid));

  // ---------- Units (concept notes in path order) ----------
  // Every item belongs to exactly one unit (generators by registration, fixed problems by js/units.js).
  const unitItems = (sid, title) => Object.values(ITEMS).filter(i => i.subject === sid && i.unit === title);
  const unitGens = (sid, title) => unitItems(sid, title).filter(i => i.kind === 'gen');
  const hasCheck = (sid, card) => unitItems(sid, card.title).length > 0;
  // Units the learner has reached on the path (started, finished, or next up). With studiedOnly, just units
  // whose lesson has been read through (at least one star).
  const unitKey = (sid, title) => sid + '|' + title;
  function reachedUnits(studiedOnly) {
    const out = new Set();
    for (const s of SUBJECTS) s.learn.forEach((c, i) => { if (Game.unit(s.id, c.title).stars >= 1 || (!studiedOnly && unlocked(s, i))) out.add(unitKey(s.id, c.title)); });
    return out;
  }
  // A unit set: mostly freshly generated problems for this unit, plus about one in four from the fixed problems
  // taught in this same unit. Nothing comes from other units, even ones that share a skill name.
  function buildUnitSet(sid, card, len) {
    const gens = unitGens(sid, card.title), stat = R.shuffle(unitItems(sid, card.title).filter(i => i.kind === 'static'));
    const list = [], nStatic = gens.length ? Math.min(stat.length, Math.floor(len / 4)) : Math.min(stat.length, len);
    for (const it of stat.slice(0, nStatic)) { const inst = instantiate(it); if (inst) list.push(inst); }
    let bag = []; let guard = 0;
    while (list.length < len && gens.length && guard++ < 100) { if (!bag.length) bag = R.shuffle(gens.slice()); const inst = instantiate(bag.pop()); if (inst) list.push(inst); }
    return R.shuffle(list);
  }
  const complete = (sid, card) => { const u = Game.unit(sid, card.title); return hasCheck(sid, card) ? u.stars >= 2 : u.stars >= 1; };
  Game.complete = complete;
  const unlocked = (s, i) => i === 0 || complete(s.id, s.learn[i - 1]) || Game.unit(s.id, s.learn[i].title).stars > 0;
  const nextIndex = s => s.learn.findIndex(c => !complete(s.id, c));
  const doneCount = s => s.learn.filter(c => complete(s.id, c)).length;
  function suggestLesson() {
    const order = [S().settings.lastSubject].concat(GROUPS.flatMap(g => g.ids)).filter(Boolean);
    for (const id of order) { const s = subjById(id); if (!s) continue; const i = nextIndex(s); if (i >= 0) return { s, i }; }
    return null;
  }

  // ---------- Question instances ----------
  function instantiate(item) {
    const subj = subjById(item.subject);
    let base;
    try { base = item.kind === 'static' ? item.ref : item.ref.make(R); } catch (e) { return null; }
    const t = subj.plain ? esc : item.kind === 'gen' && !item.ref.raw ? tidyMath : (v => v);
    const inst = { item, subj, q: t(base.q), code: base.code, x: t(base.x || ''), hint: base.hint, d: base.d, state: 'open' };
    if (base.c) {
      const order = R.shuffle(base.c.map((_, i) => i));
      inst.type = 'mc'; inst.choices = order.map(i => t(base.c[i])); inst.correct = order.indexOf(0); inst.pick = -1;
    } else {
      if (!Number.isFinite(base.answer)) return null;
      inst.type = 'num'; inst.answer = base.answer; inst.tol = base.tol; inst.input = '';
    }
    return inst;
  }

  function buildSession(opts) {
    const st = S(), len = opts.len || st.settings.length || 10;
    let pool = Object.values(ITEMS);
    if (opts.subject) pool = pool.filter(i => i.subject === opts.subject);
    if (opts.group != null) pool = pool.filter(i => GROUPS[opts.group].ids.includes(i.subject));
    if (opts.skill) pool = pool.filter(i => i.skill === opts.skill);
    if (opts.skillset) pool = pool.filter(i => opts.skillset.has(skillKey(i.subject, i.skill)));
    // Practice never reaches past the lessons: only units already reached on the path (missed-problem review aside).
    if (!opts.missed) { const ok = opts.units || reachedUnits(false); pool = pool.filter(i => ok.has(unitKey(i.subject, i.unit))); }
    if (opts.missed) pool = pool.filter(i => st.missed[i.id]);
    const weight = it => {
      let w = 1;
      if (st.missed[it.id]) w += 3;
      if (!st.items[it.id]) w += it.kind === 'static' ? 1.5 : 0.5;
      const sk = st.skills[skillKey(it.subject, it.skill)];
      if (sk && sk.n >= 3) w += (1 - sk.c / sk.n) * 2;
      return w;
    };
    const target = opts.missed ? Math.min(len, pool.length) : len;
    const picks = [];
    let avail = pool.slice(), guard = 0;
    while (picks.length < target && pool.length && guard++ < 200) {
      if (!avail.length) avail = pool.filter(i => i.kind === 'gen');
      if (!avail.length) break;
      const ws = avail.map(weight), total = ws.reduce((a, b) => a + b, 0);
      let r = Math.random() * total, k = 0;
      while (k < avail.length - 1 && (r -= ws[k]) > 0) k++;
      const inst = instantiate(avail[k]);
      avail.splice(k, 1);
      if (inst) picks.push(inst);
    }
    return { opts, list: picks, i: 0, xp0: st.xp };
  }

  // Today's session: due reviews first, then missed problems, then practice on units already studied. Interleaved.
  function buildToday() {
    const list = [], dueList = Game.dueUnits().slice(0, 5);
    for (const u of dueList) {
      const s = subjById(u.sid), card = s && s.learn.find(c => c.title === u.title);
      if (!card || !hasCheck(s.id, card)) continue;
      for (const inst of buildUnitSet(s.id, card, 2)) { inst.unit = u; list.push(inst); }
    }
    for (const id of R.shuffle(missedIn()).slice(0, Math.max(0, 8 - list.length))) { const inst = instantiate(ITEMS[id]); if (inst) list.push(inst); }
    if (list.length < 8) {
      const studied = reachedUnits(true);
      const opts = studied.size ? { units: studied } : { subject: S().settings.lastSubject || 'algebra' };
      for (const inst of buildSession(Object.assign(opts, { len: 8 - list.length })).list) list.push(inst);
    }
    return { opts: { mode: 'today' }, list: R.shuffle(list), i: 0, xp0: S().xp };
  }

  function parseNum(raw) {
    const s = String(raw).trim().replace(/[\u2212\u2013]/g, '-').replace(/\s+/g, '').replace(/,/g, '');
    const num = /^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i;
    if (num.test(s)) return parseFloat(s);
    const m = s.match(/^([-+]?(?:\d+\.?\d*|\.\d+))\/([-+]?(?:\d+\.?\d*|\.\d+))$/);
    if (m && parseFloat(m[2]) !== 0) return parseFloat(m[1]) / parseFloat(m[2]);
    return NaN;
  }

  function grade(inst) {
    if (inst.type === 'mc') return inst.pick === inst.correct;
    const v = parseNum(inst.input), a = inst.answer;
    if (!Number.isFinite(v)) return null;
    // Code output is exact: an integer printed by a program has no rounding slack.
    const tol = inst.tol != null ? inst.tol + 1e-9 : inst.subj.plain && Number.isInteger(a) ? 1e-9 : 1e-6 * Math.max(1, Math.abs(a));
    return Math.abs(v - a) <= tol;
  }

  function record(inst, ok) {
    const st = S(), id = inst.item.id, bump = (o, k) => { const r = o[k] || (o[k] = { n: 0, c: 0 }); r.n++; if (ok) r.c++; return r; };
    bump(st.items, id).last = Date.now();
    bump(st.skills, skillKey(inst.item.subject, inst.item.skill));
    bump(st.subj, inst.item.subject);
    if (ok) { if (st.missed[id]) st.counters.fixed++; delete st.missed[id]; } else st.missed[id] = true;
    const d = Game.today();
    st.days[d] = (st.days[d] || 0) + 1;
    const aw = Game.awardAnswer(inst.item.subject, inst.item.unit, ok, !!inst.unit);
    inst.xp = aw.xp; inst.xpNotes = aw.notes;
    Game.noteAnswer(inst.item.subject, ok);
    Store.save();
  }

  // ---------- Navigation ----------
  const stack = [{ view: 'home' }];
  const top = () => stack[stack.length - 1];
  const go = r => { stack.push(r); render(true); };
  const replace = r => { stack[stack.length - 1] = r; render(true); };
  window.appBack = () => { if (window.Board && Board.isOpen()) { Board.close(); return true; } if (stack.length > 1) { stack.pop(); render(true); return true; } return false; };
  // Return to an existing screen instead of stacking a duplicate on top.
  const popTo = pred => { for (let i = stack.length - 1; i >= 0; i--) if (pred(stack[i])) { stack.length = i + 1; return true; } return false; };
  window.appResume = () => { Game.init(); armReminder(); if (['home', 'settings', 'progress'].includes(top().view)) render(false); };

  // ---------- Shared pieces ----------
  function totals(filter) {
    let n = 0, c = 0;
    for (const [k, v] of Object.entries(S().subj)) if (!filter || filter === k) { n += v.n; c += v.c; }
    return { n, c };
  }
  const STAR = on => `<svg class="star${on ? ' on' : ''}" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.8L10 14.8l-5.1 2.8 1.1-5.8-4.3-4 5.8-.7z"/></svg>`;
  const stars = (n, max = 3) => `<span class="stars" role="img" aria-label="${n} of ${max} stars">${Array.from({ length: max }, (_, k) => STAR(k < n)).join('')}</span>`;
  function ring(v, goal, size = 92) {
    const r = size / 2 - 7, c = 2 * Math.PI * r, f = Math.min(1, goal ? v / goal : 0);
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${v} of ${goal} XP today">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-bg"/>
      ${f > 0 ? '' : '<!--'}<circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-fg${f >= 1 ? ' full' : ''}" stroke-dasharray="${(c * f).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>${f > 0 ? '' : '-->'}
      <text x="50%" y="47%" text-anchor="middle" class="ring-n">${v}</text><text x="50%" y="66%" text-anchor="middle" class="ring-l">of ${goal} XP</text></svg>`;
  }
  function weekStrip() {
    const st = S(), now = new Date(), dow = (now.getDay() + 6) % 7, t = Game.today();
    return '<div class="week" aria-label="This week">' + Array.from({ length: 7 }, (_, k) => {
      const d = Game.addDays(t, k - dow), cls = st.goalDays[d] ? 'met' : st.shieldDays[d] ? 'shield' : (st.xpDays[d] ? 'some' : '');
      return `<span class="wd ${cls}${d === t ? ' now' : ''}"><i>${'MTWTFSS'[k]}</i></span>`;
    }).join('') + '</div>';
  }
  // Stack formulas separated by \qquad so display math fits a phone screen.
  // A chain like "A = B = C" becomes an aligned block with one relation per line.
  function alignChain(tex) {
    if (tex.includes('\\begin') || tex.includes('\\\\')) return tex;
    const cuts = []; let depth = 0, lr = 0;
    for (let i = 0; i < tex.length; i++) {
      const c = tex[i];
      if (c === '\\') {
        const w = (tex.slice(i + 1).match(/^[a-zA-Z]+/) || [''])[0];
        if (w === 'left') lr++; else if (w === 'right') lr--;
        else if (w === 'approx' && !depth && !lr) cuts.push([i, 7]);
        i += Math.max(w.length, 1); continue;
      }
      if (c === '{') depth++; else if (c === '}') depth--;
      else if (c === '=' && !depth && !lr && tex[i - 1] !== ':') cuts.push([i, 1]);
    }
    // Rough printed width: each command counts as one glyph; braces and spacing commands count as nothing.
    const vw = s => s.replace(/\\(left|right|big|Big|displaystyle|textstyle|tfrac|dfrac|frac|,|!|;|quad|qquad)(?![a-zA-Z])/g, '').replace(/\\[a-zA-Z]+/g, 'x').replace(/[{}^_&\s]/g, '').length;
    if (!cuts.length || (cuts.length === 1 && vw(tex) <= 28)) return tex;
    const lhs = tex.slice(0, cuts[0][0]).trim(), firstRhs = tex.slice(cuts[0][0], cuts[1] ? cuts[1][0] : tex.length);
    const ownLine = vw(lhs) + vw(firstRhs) > 26;
    const lines = cuts.map(([at, len], k) => {
      const end = k + 1 < cuts.length ? cuts[k + 1][0] : tex.length;
      return `&${tex.substr(at, len)} ${tex.slice(at + len, end).trim()}`;
    });
    return `\\begin{aligned}${ownLine ? `&${lhs}\\\\` + lines.join('\\\\') : lhs + ' ' + lines.join('\\\\')}\\end{aligned}`;
  }
  const stackDisplays = html => html.replace(/\\\[([\s\S]*?)\\\]/g, (m, inner) => {
    const parts = inner.includes('\\qquad') && !inner.includes('\\begin') ? inner.split('\\qquad').map(x => x.trim().replace(/,$/, '')) : [inner];
    return parts.map(x => `\\[${alignChain(x)}\\]`).join('');
  });

  // ---------- Home ----------
  function viewHome() {
    const st = S(), streak = Game.streak(), lv = Game.level(), due = Game.dueUnits().length, missed = missedIn().length, sug = suggestLesson();
    const sub = due ? `${plural(due, 'review')} due${missed ? `, ${missed} to fix` : ''}` : missed ? `${plural(missed, 'missed problem')} to fix` : 'Practice on what you have studied';
    const row = s => {
      const r = st.subj[s.id], n = s.learn.length, d = doneCount(s);
      const mem = Game.memory([s.id]), line = `${d} of ${plural(n, 'unit')} complete${r ? `, ${pct(r.c, r.n)}% correct` : ''}${mem != null ? `, memory ${mem}%` : ''}`;
      return `<li><button class="subj" data-a="subject" data-id="${s.id}" style="--tab:${s.color}">
        <span class="subj-name">${s.name}</span>
        <span class="tierchip">${Game.tierName(s.id)}, ${Game.mult(s.id)}× XP</span>
        <span class="subj-blurb">${s.blurb}</span>
        <span class="subj-stats">${line}</span>
        <span class="bar thin" aria-hidden="true"><span style="width:${pct(d, n)}%"></span></span>
      </button></li>`;
    };
    const coll = st.settings.collapsed || {}, units = Object.keys(st.units);
    const started = g => g.ids.some(id => st.subj[id] || units.some(k => k.startsWith(id + '|')));
    const anyStarted = GROUPS.some(started);
    const isOpen = (g, gi) => g.name in coll ? !coll[g.name] : anyStarted ? started(g) : gi === 0;
    const groups = GROUPS.map((g, gi) => {
      const ss = g.ids.map(subjById).filter(Boolean), open = isOpen(g, gi), tiers = [...new Set(ss.map(x => Game.mult(x.id)))].sort((a, b) => a - b);
      const nu = ss.reduce((a, x) => a + x.learn.length, 0), nd = ss.reduce((a, x) => a + doneCount(x), 0);
      return `<section class="sgroup${open ? ' open' : ''}">
        <div class="sgroup-head"><button class="sgroup-toggle" data-a="group" data-g="${gi}" aria-expanded="${open}"><span class="chev" aria-hidden="true"></span><span class="sg-name">${g.name}</span>
          <span class="sg-sum">${plural(ss.length, 'subject')}, ${nd} of ${nu} units, ${tiers.length > 1 ? `${tiers[0]}× to ${tiers[tiers.length - 1]}×` : `${tiers[0]}×`} XP</span></button>
          ${open ? `<button class="link" data-a="start" data-group="${gi}">Mixed set</button>` : ''}</div>
        ${open ? `<ul class="subjects">${ss.map(row).join('')}</ul>` : ''}
      </section>`; }).join('');
    const allOpen = GROUPS.every(isOpen);
    return `<header class="top">
        <h1 class="title">Problem sets</h1>
      </header>
      <section class="today">
        ${ring(Game.xpToday(), st.settings.goal)}
        <div class="tstat">
          <p class="tbig">${streak}<span>day streak</span></p>
          <p class="tsmall">${Game.rank()}, level ${lv.L}. ${lv.span - lv.into} XP to level ${lv.L + 1}${st.shields ? `. ${plural(st.shields, 'shield')}` : ''}</p>
          <span class="bar" aria-hidden="true"><span style="width:${pct(lv.into, lv.span)}%"></span></span>
          ${weekStrip()}
        </div>
      </section>
      <div class="actions stack">
        <button class="btn primary big" data-a="today"><span>Start today's session</span><small>${sub}</small></button>
        ${sug ? `<button class="btn big" data-a="lesson" data-sid="${sug.s.id}" data-i="${sug.i}"><span>Next lesson</span><small>${sug.s.name}, unit ${sug.i + 1}: ${sug.s.learn[sug.i].title}</small></button>` : ''}
        <div class="actions row">
          <button class="btn" data-a="sprints">Fluency sprint</button>
          <button class="btn" data-a="symbols">Symbol chart</button>
        </div>
      </div>
      ${questsCard()}
      <div class="sg-all"><button class="link" data-a="groupsall" data-v="${allOpen ? 1 : 0}">${allOpen ? 'Collapse all subjects' : 'Expand all subjects'}</button></div>
      ${groups}
      <footer class="foot"><button class="link" data-a="progress">Progress and badges</button><button class="link" data-a="settings">Settings</button></footer>`;
  }

  function questsCard() {
    const qs = Game.quests(), done = qs.filter(q => q.done).length;
    return `<section class="quests"><div class="qhead"><h2>This week</h2><span class="qcount">${done} of 3 quests</span></div>
      ${qs.map(q => `<div class="quest${q.done ? ' done' : ''}"><span class="qtext">${q.text}</span><span class="qnum">${q.have}/${q.goal}</span><span class="bar thin" aria-hidden="true"><span style="width:${pct(q.have, q.goal)}%"></span></span></div>`).join('')}
      <p class="qnote">${Game.questXP()} XP per quest, ${2 * Game.questXP()} more for all three, rising with your level. New quests every Monday.</p></section>`;
  }

  // ---------- Subject ----------
  function viewSubject(r) {
    const s = subjById(r.id), t = totals(s.id), missed = missedIn(s.id).length, tab = r.tab || 'path';
    S().settings.lastSubject = s.id;
    const meta = `${doneCount(s)} of ${plural(s.learn.length, 'unit')} complete${t.n ? `. ${plural(t.n, 'problem')} answered, ${pct(t.c, t.n)}% correct` : ''}`;
    let body;
    if (tab === 'path') {
      const next = nextIndex(s), due = new Set(Game.dueUnits().filter(u => u.sid === s.id).map(u => u.title));
      body = (s.id === 'quant' ? quantPanel() : '') + `<p class="hint">Work through the units in order. Each one moves from the idea to a picture to symbols, then practice that changes one thing at a time, then a mastery check. Mastered units come back for spaced review.</p><ol class="path">` + s.learn.map((c, i) => {
        const u = Game.unit(s.id, c.title), open = unlocked(s, i), done = complete(s.id, c);
        const status = due.has(c.title) ? '<span class="tag due">Review due</span>' : i === next ? '<span class="tag next">Next</span>' : !open ? '<span class="tag lock">Locked</span>' : '';
        return `<li><button class="unit${done ? ' done' : ''}${open ? '' : ' locked'}${i === next ? ' cur' : ''}" data-a="lesson" data-sid="${s.id}" data-i="${i}">
          <span class="unum">${i + 1}</span>
          <span class="utext"><span class="utitle">${c.title}</span>${hasCheck(s.id, c) ? stars(u.stars) : `<span class="umeta">${u.stars ? 'Read' : 'Reading only'}</span>`}</span>
          ${status}</button></li>`;
      }).join('') + '</ol>';
    } else if (tab === 'skills') {
      const reached = reachedUnits(false), open = new Set(Object.values(ITEMS).filter(i => i.subject === s.id && reached.has(unitKey(s.id, i.unit))).map(i => i.skill));
      const all = skillsOf(s.id), rows = all.filter(k => open.has(k)).map(k => ({ k, rec: S().skills[skillKey(s.id, k)] }))
        .sort((a, b) => (a.rec ? a.rec.c / a.rec.n : 2) - (b.rec ? b.rec.c / b.rec.n : 2));
      const later = all.length - rows.length;
      body = `<p class="hint">Weakest first. Tap a topic to drill it. Practice covers only the units you have reached on the path${later ? `; ${plural(later, 'more topic')} open${later === 1 ? 's' : ''} as you go` : ''}.</p><ul class="skills">` + rows.map(({ k, rec }) => `
        <li><button class="skill" data-a="start" data-subject="${s.id}" data-skill="${esc(k)}">
          <span class="skill-name">${k}</span>
          <span class="skill-stat">${rec ? `${rec.c} of ${rec.n}` : 'New'}</span>
          <span class="bar" aria-hidden="true"><span style="width:${rec ? pct(rec.c, rec.n) : 0}%"></span></span>
        </button></li>`).join('') + '</ul>';
    } else if (tab === 'learn') {
      body = `<p class="hint">Reference notes for every unit, including the pictures and worked examples.</p><div class="concepts">` + s.learn.map((l, i) => `<details><summary>${l.title}</summary><div class="concept">
          ${l.hook ? `<div class="plain"><p class="wl">Overview</p>${stackDisplays(l.hook)}</div>` : ''}
          ${stackDisplays(l.body)}${l.more ? stackDisplays(l.more) : ''}
          ${examplesOf(l).map(e => `<div class="worked"><p class="wl">Worked example</p><div class="wq">${e.q}</div><details class="sol"><summary>Show solution</summary><div class="wa">${stackDisplays(e.a)}</div></details></div>`).join('')}
          ${l.trap ? `<div class="trap"><p class="wl">Common mistake</p><p>${l.trap}</p></div>` : ''}
          <div class="btnrow"><button class="btn small" data-a="lesson" data-sid="${s.id}" data-i="${i}">Open lesson</button>
          ${hasCheck(s.id, l) && (unlocked(s, i) || Game.unit(s.id, l.title).stars > 0) ? `<button class="btn small" data-a="unitdrill" data-sid="${s.id}" data-i="${i}">Practice this unit</button>` : ''}</div>
        </div></details>`).join('') + '</div>';
    } else {
      body = `<p class="hint">Notation used in ${s.name}. The full chart is on the home screen.</p>` + symbolGroups(SYMBOLS.filter(g => g.subjects.includes(s.id)).sort((a, b) => a.subjects.length - b.subjects.length), '');
    }
    const tabs = [['path', 'Path'], ['skills', 'Practice'], ['learn', 'Notes'], ['symbols', 'Symbols']];
    return `<header class="top" style="--tab:${s.color}">
        <button class="back" data-a="back">Back</button>
        <h1 class="title subj-title">${s.name}</h1>
        <p class="meta">${meta}</p>
        <p class="meta tiermeta">${Game.tierName(s.id)} tier: ${Game.mult(s.id)}× XP${Game.effMult(s.id) < Game.mult(s.id) ? ', halved at your level' : ''}.</p>
      </header>
      <div class="actions">
        <button class="btn primary" data-a="start" data-subject="${s.id}">Practice set</button>
        ${missed ? `<button class="btn" data-a="start" data-subject="${s.id}" data-missed="1">Review ${plural(missed, 'missed problem')}</button>` : ''}
      </div>
      <div class="tabs" role="tablist">${tabs.map(([k, n]) => `<button role="tab" aria-selected="${tab === k}" data-a="tab" data-tab="${k}">${n}</button>`).join('')}</div>
      ${body}`;
  }

  // ---------- Lesson ----------
  const examplesOf = card => (card.ex ? [card.ex] : []).concat(card.exs || []);
  function stagesOf(s, card) {
    const out = [];
    if (card.hook) out.push(['hook', 'Overview']);
    out.push(['formal', card.hook ? 'Symbols' : 'Idea']);
    if (card.ex) out.push(['example', card.exs && card.exs.length ? 'Examples' : 'Example']);
    if (card.vary) out.push(['vary', 'Your turn']);
    out.push(hasCheck(s.id, card) ? ['check', 'Check'] : ['done', 'Finish']);
    return out;
  }
  const varyAnswer = v => Array.isArray(v[1]) ? v[1][0] : `\\(${R.fmt(v[1], 4)}\\)`;

  function viewLesson(r) {
    const s = subjById(r.sid), card = s.learn[r.i], stages = stagesOf(s, card), [kind] = stages[r.k], u = Game.unit(s.id, card.title);
    r.maxk = Math.max(r.maxk || 0, r.k);
    if (kind === 'check' || kind === 'done') Game.completeLesson(s.id, card.title);
    const steps = `<ol class="steps">${stages.map(([, name], k) => `<li><button class="step${k === r.k ? ' cur' : ''}${k < r.k ? ' past' : ''}" data-a="stage" data-k="${k}" ${k > r.maxk ? 'disabled' : ''}>${name}</button></li>`).join('')}</ol>`;
    const lock = !unlocked(s, r.i) && r.k === 0 ? `<div class="banner"><p>Unit ${r.i} comes first in this path. You can read this lesson now, or prove you already know it with a mastery check.</p>${hasCheck(s.id, card) ? '<button class="btn small" data-a="checkstart">Test out</button>' : ''}</div>` : '';
    let body = '', cta = '';
    const cont = label => `<button class="btn primary" data-a="stage" data-k="${r.k + 1}">${label || 'Continue'}</button>`;
    if (kind === 'hook') { body = `<div class="lesson-body">${stackDisplays(card.hook)}</div>`; cta = cont(); }
    else if (kind === 'formal') {
      body = `<div class="lesson-body concept">${stackDisplays(card.body)}${card.more ? stackDisplays(card.more) : ''}</div>${card.trap ? `<div class="trap"><p class="wl">Common mistake</p><p>${card.trap}</p></div>` : ''}`;
      cta = cont();
    } else if (kind === 'example') {
      const exs = examplesOf(card);
      body = `<p class="hint">Try each one on paper first, then compare with the solution.</p>` + exs.map((e, k) => `<div class="worked"><p class="wl">Worked example${exs.length > 1 ? ` ${k + 1} of ${exs.length}` : ''}</p><div class="wq">${e.q}</div><details class="sol"><summary>Show solution</summary><div class="wa">${stackDisplays(e.a)}</div></details></div>`).join('');
      cta = cont();
    } else if (kind === 'vary') {
      const V = card.vary; r.vs = r.vs || V.map(() => ({ state: 'open', input: '', pick: -1 }));
      const vi = r.vi || 0, v = V[vi], vs = r.vs[vi], done = vs.state !== 'open';
      if (Array.isArray(v[1]) && !vs.order) vs.order = R.shuffle(v[1].map((_, k) => k));
      const trail = `<div class="vtrail" aria-label="Variation progress">${V.map((_, k) => `<span class="seg ${r.vs[k].state === 'right' ? 'ok' : r.vs[k].state === 'wrong' ? 'no' : k === vi ? 'cur' : ''}"></span>`).join('')}</div>`;
      let ans;
      if (Array.isArray(v[1])) {
        ans = `<div class="choices" role="radiogroup">${vs.order.map(k => {
          let cls = 'choice'; if (vs.pick === k) cls += ' picked';
          if (done && k === 0) cls += ' is-right'; if (done && k === vs.pick && k !== 0) cls += ' is-wrong';
          return `<button class="${cls}" role="radio" aria-checked="${vs.pick === k}" data-a="vpick" data-k="${k}" ${done ? 'disabled' : ''}><span class="ctext">${v[1][k]}</span></button>`;
        }).join('')}</div>`;
      } else {
        ans = `<div class="numwrap"><label class="numlabel" for="vnum">Your answer</label>
          <input id="vnum" class="num ${done ? (vs.state === 'right' ? 'is-right' : 'is-wrong') : ''}" inputmode="decimal" autocomplete="off" value="${esc(vs.input)}" ${done ? 'disabled' : ''}>
          ${done ? '' : '<div class="keys"><button data-a="vkey" data-k="-">Negative</button><button data-a="vkey" data-k="/">Fraction</button><button data-a="vkey" data-k=".">Decimal</button></div>'}</div>`;
      }
      const fb = done ? `<div class="feedback ${vs.state === 'right' ? 'ok' : 'no'}"><p class="verdict">${vs.state === 'right' ? `Correct.${vs.xp ? ` +${vs.xp} XP` : ''}` : `Not quite. The answer is ${varyAnswer(v)}.`}</p><p class="why"><b>${vi === 0 ? 'Note' : 'What changed'}:</b> ${v[2]}</p></div>` : '';
      body = `<p class="hint">Each problem changes one thing from the one before. Notice what changed and how the answer responds.</p>${trail}
        <article class="sheet vsheet" style="--tab:${s.color}"><p class="vnum-l">Problem ${vi + 1} of ${V.length}</p><div class="qtext">${v[0]}</div>${ans}${fb}</article>`;
      cta = !done ? `<button class="btn primary" data-a="vcheck" ${Array.isArray(v[1]) && vs.pick < 0 ? 'disabled' : ''}>Check</button><button class="link" data-a="stage" data-k="${r.k + 1}">Skip to the check</button>`
        : vi < V.length - 1 ? '<button class="btn primary" data-a="vnext">Next problem</button>' : cont() + '<button class="btn" data-a="drill">Practice with fresh problems</button>';
    } else if (kind === 'check') {
      const next = s.learn[r.i + 1];
      body = `<div class="panel checkpanel">
          ${u.stars >= 2 && u.due && u.due <= Game.today() ? `<p><b>Review due.</b> Five fresh problems; get ${Game.passMark(5)} right and the next review moves further out.</p>` : `<p>Five problems on this unit, generated fresh each time, so the answers cannot be memorized. Get ${Game.passMark(5)} right to master the unit.</p>`}
          <p>A mastered unit returns for short reviews after 1, 3, 7, 14, and 30 days. Recall it each time and the gaps keep growing; that spacing is what moves it into long-term memory. The third star comes after two successful reviews.</p>
          <p class="cstat">${stars(u.stars)} ${u.stars >= 2 ? `Mastered.${u.due ? ` Next review ${rel(u.due)}.` : ''}` : u.stars === 1 ? 'Lesson finished. Check not yet passed.' : ''}</p>
        </div>`;
      cta = `<button class="btn primary" data-a="checkstart">${u.stars >= 2 ? (u.due && u.due <= Game.today() ? 'Start review' : 'Take the check again') : 'Start mastery check'}</button><button class="btn" data-a="drill">Practice with fresh problems</button>${u.stars >= 2 && next ? `<button class="btn" data-a="lesson" data-sid="${s.id}" data-i="${r.i + 1}" data-replace="1">Next unit</button>` : ''}`;
    } else {
      const next = s.learn[r.i + 1];
      body = `<div class="panel checkpanel"><p>This unit has no problem bank of its own, so it is complete once read. Its ideas appear in the practice sets of later units.</p></div>`;
      cta = next ? `<button class="btn primary" data-a="lesson" data-sid="${s.id}" data-i="${r.i + 1}" data-replace="1">Next unit</button>` : '<button class="btn primary" data-a="back">Back to the path</button>';
    }
    return `<header class="top" style="--tab:${s.color}">
        <button class="back" data-a="back">${s.name}</button>
        <p class="meta">Unit ${r.i + 1} of ${s.learn.length}</p>
        <h1 class="title lesson-title">${card.title}</h1>
      </header>
      ${steps}${lock}
      <h2 class="stage-h">${{ Overview: 'Material overview', Symbols: 'In symbols', Example: 'Worked example', Examples: 'Worked examples', 'Your turn': 'Your turn: variation practice', Check: 'Mastery check', Finish: 'Lesson complete', Idea: 'The idea' }[stages[r.k][1]]}</h2>
      ${body}
      <div class="dock">${cta}</div>`;
  }

  // ---------- Quiz ----------
  function sessionLabel(o) {
    const s = o.subject && subjById(o.subject);
    if (o.mode === 'check') return `${o.review ? 'Review' : 'Mastery check'}: ${o.unit}`;
    if (o.mode === 'drill') return `Practice: ${o.unit}`;
    if (o.mode === 'today') return "Today's session";
    if (o.skill) return `${o.skill} drill`;
    if (o.missed) return s ? `${s.name} review` : 'Review of missed problems';
    if (o.group != null) return `${GROUPS[o.group].name} mixed set`;
    return s ? `${s.name} set` : 'Mixed set';
  }

  function viewQuiz(r) {
    const ses = r.session, inst = ses.list[ses.i], n = ses.list.length, done = inst.state !== 'open';
    const segs = ses.list.map((q, k) => `<span class="seg ${q.state === 'right' ? 'ok' : q.state === 'wrong' ? 'no' : k === ses.i ? 'cur' : ''}"></span>`).join('');
    let answer;
    if (inst.type === 'mc') {
      answer = `<div class="choices${inst.subj.plain ? ' mono' : ''}" role="radiogroup">` + inst.choices.map((c, k) => {
        let cls = 'choice';
        if (inst.pick === k) cls += ' picked';
        if (done && k === inst.correct) cls += ' is-right';
        if (done && k === inst.pick && k !== inst.correct) cls += ' is-wrong';
        return `<button class="${cls}" role="radio" aria-checked="${inst.pick === k}" data-a="pick" data-k="${k}" ${done ? 'disabled' : ''}>
          <span class="letter">${'ABCDEF'[k]}</span><span class="ctext">${c}</span></button>`;
      }).join('') + '</div>';
    } else {
      answer = `<div class="numwrap">
        <label class="numlabel" for="num">Your answer</label>
        <input id="num" class="num ${done ? (inst.state === 'right' ? 'is-right' : 'is-wrong') : ''}" inputmode="decimal" autocomplete="off" autocorrect="off" spellcheck="false" value="${esc(inst.input)}" ${done ? 'disabled' : ''}>
        ${done ? '' : '<div class="keys"><button data-a="key" data-k="-">Negative</button><button data-a="key" data-k="/">Fraction</button><button data-a="key" data-k=".">Decimal</button></div>'}
        <p class="hint">${inst.hint || (inst.tol ? 'Round as the question asks; a small rounding difference is accepted.' : 'Give the exact value.')} Fractions such as 3/4 are accepted.</p>
      </div>`;
    }
    let fb = '';
    if (done) {
      const ok = inst.state === 'right';
      const given = inst.type === 'num' ? ` The answer is ${R.fmt(inst.answer, 4)}${fracOf(inst.answer) ? ` (${fracOf(inst.answer)})` : ''}.` : '';
      fb = `<div class="feedback ${ok ? 'ok' : 'no'}"><p class="verdict">${ok ? `Correct. +${inst.xp || 0} XP${inst.xpNotes && inst.xpNotes.length ? `<span class="xpnote"> (${inst.xpNotes.join('; ')})</span>` : ''}` : 'Not quite.' + given}</p><div class="explain">${inst.x}</div></div>`;
    }
    const last = ses.i === n - 1;
    const cta = !done ? `<button class="btn primary" data-a="check" ${inst.type === 'mc' && inst.pick < 0 ? 'disabled' : ''}>Check answer</button>`
      : `<button class="btn primary" data-a="next">${last ? 'See results' : 'Next problem'}</button>`;
    return `<div class="quizbar">
        <button class="back" data-a="back">End set</button>
        <div class="segs" aria-label="Problem ${ses.i + 1} of ${n}">${segs}</div>
      </div>
      <article class="sheet" style="--tab:${inst.subj.color}">
        <div class="titleblock">
          <div class="tb"><span class="tb-l">${ses.opts.mode === 'check' ? 'Check' : 'Subject'}</span><span class="tb-v">${inst.subj.name}</span></div>
          <div class="tb"><span class="tb-l">Topic</span><span class="tb-v">${inst.item.skill}</span></div>
          <div class="tb tb-n"><span class="tb-l">Sheet</span><span class="tb-v">${ses.i + 1} of ${n}</span></div>
        </div>
        ${inst.unit ? `<p class="revtag">Spaced review: ${inst.unit.title}</p>` : ''}
        <div class="problem"><div class="qtext">${inst.q}</div>${inst.code ? `<pre class="code"><code>${esc(inst.code)}</code></pre>` : ''}</div>
        ${answer}
        ${fb}
      </article>
      <div class="dock">${cta}</div>`;
  }

  // Scoring that happens once, when a session ends.
  function finishSession(ses) {
    const n = ses.list.length, right = ses.list.filter(q => q.state === 'right').length, o = ses.opts;
    if (n >= 5 && right === n) { S().counters.perfect++; ses.bonus = Math.max(5, Math.round(Game.XP.perfect * ses.list.reduce((a, q) => a + (q.xp || 0), 0))); Game.addXP(ses.bonus); }
    if (o.mode === 'check') ses.pass = Game.checkResult(o.subject, o.unit, right, n);
    if (o.mode === 'check' && o.review) ses.next = Game.unit(o.subject, o.unit).due;
    if (o.mode === 'today') {
      const by = {};
      for (const q of ses.list) if (q.unit) { const k = q.unit.sid + '|' + q.unit.title; (by[k] = by[k] || { u: q.unit, n: 0, c: 0 }).n++; if (q.state === 'right') by[k].c++; }
      ses.reviews = Object.values(by).map(b => Object.assign(b, Game.reviewResult(b.u.sid, b.u.title, b.c, b.n)));
    }
    Store.save();
  }

  function viewSummary(r) {
    const ses = r.session, o = ses.opts, n = ses.list.length, right = ses.list.filter(q => q.state === 'right').length;
    const missedHere = ses.list.filter(q => q.state === 'wrong').length, gained = S().xp - ses.xp0;
    const rows = ses.list.map((q, k) => `<li class="${q.state === 'right' ? 'ok' : 'no'}">
        <span class="res">${q.state === 'right' ? 'Correct' : 'Missed'}</span>
        <span class="rtopic">${k + 1}. ${q.item.skill}</span>
        <span class="rsub">${q.subj.name}</span></li>`).join('');
    let banner = '', actions;
    if (o.mode === 'check') {
      const s = subjById(o.subject), next = s.learn[o.i + 1];
      banner = o.review ? (ses.pass ? `<div class="banner good"><p><b>Review passed.</b> Next review ${rel(ses.next)}.</p></div>` : `<div class="banner"><p><b>Not yet.</b> This unit comes back tomorrow. Reread the lesson before then.</p></div>`)
        : ses.pass
        ? `<div class="banner good"><p><b>Unit mastered.</b> First review tomorrow; each successful review spaces the next one further out.</p></div>`
        : `<div class="banner"><p><b>Not yet.</b> You need ${Game.passMark(n)} of ${n}. Reread the idea, redo the variation problems, and try again.</p></div>`;
      actions = ses.pass
        ? `${next ? `<button class="btn primary" data-a="lesson" data-sid="${s.id}" data-i="${o.i + 1}" data-replace="1">Next unit: ${next.title}</button>` : ''}<button class="btn" data-a="subject" data-id="${s.id}" data-replace="1">Back to the path</button>`
        : `<button class="btn primary" data-a="lesson" data-sid="${s.id}" data-i="${o.i}" data-replace="1">Review the lesson</button><button class="btn" data-a="again">Try the check again</button>`;
    } else {
      if (o.mode === 'today' && ses.reviews && ses.reviews.length) {
        banner = `<div class="banner"><p><b>Spaced reviews</b></p><ul class="revlist">${ses.reviews.map(b => `<li>${b.u.title}: ${b.pass ? `remembered, next review ${rel(b.next)}` : 'needs another look, back tomorrow'}</li>`).join('')}</ul></div>`;
      }
      const sj = o.subject && subjById(o.subject);
      actions = o.mode === 'drill' ? `<button class="btn primary" data-a="again">More fresh problems</button><button class="btn" data-a="back">Back to the lesson</button>`
        : `<button class="btn primary" data-a="again">Start another set</button>${sj ? `<button class="btn" data-a="subject" data-id="${sj.id}" data-replace="1">Back to ${sj.name}</button>` : ''}<button class="btn" data-a="home">Done</button>`;
    }
    const note = right === n ? 'Every problem correct.' : `${plural(missedHere, 'problem')} added to your review list.`;
    return `<header class="top">
        <p class="meta">${sessionLabel(o)}</p>
        <h1 class="title score">${right} of ${n}</h1>
        <p class="meta">${note} +${gained} XP. Today: ${Game.xpToday()} of ${S().settings.goal} XP.</p>
      </header>
      ${banner}
      <div class="actions">${actions}</div>
      <ul class="results">${rows}</ul>`;
  }

  // ---------- Fluency sprints ----------
  let timer = null;
  const SPRINT_MS = 60000;
  function sprintQ(deck, last) {
    let it, guard = 0;
    do { it = deck.gen ? deck.gen(R) : R.pick(deck.items); } while (last && it.p === last.p && guard++ < 10);
    let others = it.d || R.shuffle([...new Set(deck.items.map(x => x.a))].filter(a => a !== it.a)).slice(0, 3);
    others = others.filter(a => a !== it.a).slice(0, 3);
    const choices = R.shuffle([it.a, ...others]);
    return { p: it.p, a: it.a, choices, pick: -1 };
  }
  const big = t => String(t).replace(/\\tfrac/g, '\\frac');
  // A non-integer that is exactly a simple fraction, as text: 0.181818... -> "2/11".
  const fracOf = v => { if (Number.isInteger(v)) return ''; for (let d = 2; d <= 2000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return `${n}/${d}`; } return ''; };
  function viewSprints() {
    const best = S().sprints;
    return `<header class="top"><button class="back" data-a="back">Back</button><h1 class="title">Fluency sprints</h1>
        <p class="meta">Sixty seconds of rapid recall. Facts you know instantly free your attention for the actual problem; that fluency is a core part of Singapore and Shanghai practice.</p></header>
      <ul class="decks">${DECKS.map(d => `<li><button class="deck" data-a="sprint" data-id="${d.id}" style="--tab:${subjById(d.subject).color}">
          <span class="dname">${d.title}</span><span class="dblurb">${d.blurb}</span><span class="dbest">${best[d.id] ? `Best: ${best[d.id]}` : 'Not tried yet'}</span></button></li>`).join('')}</ul>`;
  }
  function viewSprint(r) {
    const q = r.q, left = Math.max(0, r.end - Date.now());
    return `<div class="quizbar"><button class="back" data-a="back">Stop</button><div class="timebar"><span id="timefill" style="width:${(100 * left / SPRINT_MS).toFixed(1)}%"></span></div><span id="timesec" class="secs">${Math.ceil(left / 1000)}</span></div>
      <p class="meta center">${r.deck.title}. Correct: <b>${r.right}</b></p>
      <div class="sprintq">\\[${big(q.p)}\\]</div>
      <div class="sgrid">${q.choices.map((c, k) => {
        let cls = 'schoice'; if (q.pick >= 0 && c === q.a) cls += ' is-right'; if (q.pick === k && c !== q.a) cls += ' is-wrong';
        return `<button class="${cls}" data-a="spick" data-k="${k}" ${q.pick >= 0 ? 'disabled' : ''}>\\(\\displaystyle ${big(c)}\\)</button>`;
      }).join('')}</div>`;
  }
  function viewSprintEnd(r) {
    const acc = r.total ? pct(r.right, r.total) : 0;
    const miss = r.miss.slice(0, 12).map(m => `<li><span>\\(${m.p}\\)</span><span>\\(${m.a}\\)</span></li>`).join('');
    return `<header class="top"><p class="meta">${r.deck.title}</p><h1 class="title score">${r.right}</h1>
        <p class="meta">${r.right} correct of ${r.total} (${acc}%). ${r.res.best ? (r.res.prev ? `New best, up from ${r.res.prev}.` : 'First score recorded.') : `Best: ${S().sprints[r.deck.id]}.`} +${r.res.xp} XP${r.res.reduced ? ' (reduced: after three sprints a day, sprints pay a quarter)' : ''}.</p></header>
      <div class="actions"><button class="btn primary" data-a="sprint" data-id="${r.deck.id}" data-replace="1">Go again</button><button class="btn" data-a="back">Choose a deck</button></div>
      ${miss ? `<section class="panel"><h2>Review these</h2><ul class="misses">${miss}</ul></section>` : '<p class="hint">No misses.</p>'}`;
  }
  function startSprint(id, rep) {
    const deck = DECKS.find(d => d.id === id), r = { view: 'sprint', deck, end: Date.now() + SPRINT_MS, right: 0, total: 0, miss: [] };
    r.q = sprintQ(deck);
    (rep ? replace : go)(r);
    clearInterval(timer);
    timer = setInterval(() => {
      if (top() !== r) { clearInterval(timer); return; }
      const left = r.end - Date.now(), f = document.getElementById('timefill'), sec = document.getElementById('timesec');
      if (f) f.style.width = `${Math.max(0, 100 * left / SPRINT_MS).toFixed(1)}%`;
      if (sec) sec.textContent = Math.max(0, Math.ceil(left / 1000));
      if (left <= 0 && !r.lock) endSprint(r);
    }, 100);
  }
  function endSprint(r) {
    clearInterval(timer);
    const res = Game.sprintResult(r.deck.id, r.right, r.deck.subject);
    replace({ view: 'sprintEnd', deck: r.deck, right: r.right, total: r.total, miss: r.miss, res });
  }

  // ---------- Quant interview prep ----------
  const QS = () => { const st = S(); st.quant = st.quant || { sims: [], best: 0, vq: 0, vqSeen: [] }; return st.quant; };
  const mmss = ms => { const t = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
  function quantPanel() {
    const q = QS(), last = q.sims[q.sims.length - 1];
    return `<section class="panel qpanel"><h2>Test-day practice</h2>
      <button class="qmode" data-a="simstart" data-mode="hard"><span class="qm-t">Quant aptitude test (harder)</span><span class="qm-d">30 trading-style questions in 15 minutes: number puzzles, counting, probability, expected value and risk.${q.bestHard ? ` Best: ${q.bestHard} of 30.` : ''}</span></button>
      <button class="qmode" data-a="simstart"><span class="qm-t">Cognitive aptitude simulation</span><span class="qm-d">50 mixed questions in 15 minutes, no calculator, 18 seconds each on pace.${q.best ? ` Best: ${q.best} of 50${last ? `; last: ${last.s}` : ''}.` : ''}</span></button>
      <button class="qmode" data-a="vqstart"><span class="qm-t">Video question practice</span><span class="qm-d">5 seconds to prepare, 3 minutes to answer aloud, then a model answer.${q.vq ? ` Practiced: ${q.vq}.` : ''}</span></button>
      <button class="qmode" data-a="sprints"><span class="qm-t">Mental math sprints</span><span class="qm-d">60-second multiplication, fraction, and percent drills.</span></button>
    </section>`;
  }

  // Aptitude simulation: a mix like the Criteria test, every item multiple choice, no going back.
  const SIM_MS = 15 * 60000;
  // Harder mode: the units a trading firm's own quantitative test draws on, at 30 seconds per question.
  const SIM_HARD = [['Number puzzles', 'Number puzzles', 6], ['Counting and arrangements', 'Counting', 5], ['Probability under time pressure', 'Probability', 6], ['Expected value and games', 'Expected value', 3], ['Risk and position sizing', 'Risk', 3], ['Word problems at speed', 'Word problems', 3], ['Number series', 'Series', 2], ['Logic and ordering', 'Logic', 2]];
  const SIM_MIX = [['Mental math', 'Math', 5], ['Fractions, decimals, percents', 'Math', 6], ['Word problems at speed', 'Math', 9], ['Number series', 'Series', 8], ['Logic and ordering', 'Logic', 8], ['Verbal reasoning', 'Verbal', 8], ['Spatial reasoning', 'Spatial', 6]];
  function simChoices(inst) {
    if (inst.type === 'mc') return inst;
    const a = inst.answer, f = v => R.fmt(v, inst.tol ? 3 : 4), want = f(a), ds = (inst.d || []).map(f);
    const fallback = a > 0 && a < 1 ? [a / 2, 1 - a, Math.min(0.99, a + 0.1), Math.min(0.99, a * 1.5), Math.max(0.01, a - 0.1)] : [a + 1, a - 1, a * 2, a + 10, a / 2, a - 10];
    const pool = [...new Set(ds.concat(fallback.map(f)))].filter(x => x !== want);
    const opts = R.shuffle([want, ...pool.slice(0, 4)]);
    return Object.assign(inst, { type: 'mc', choices: opts.map(x => `\\(${x}\\)`), correct: opts.indexOf(want), pick: -1 });
  }
  function buildSim(mode) {
    const list = [], hard = mode === 'hard';
    for (const [unit, cat, n] of hard ? SIM_HARD : SIM_MIX) {
      const gens = Object.values(ITEMS).filter(i => i.subject === 'quant' && i.unit === unit && i.kind === 'gen' && (hard ? i.ref.hard : i.ref.sim));
      const seen = new Set(); let guard = 0;
      while (list.filter(x => x.cat === cat && x.unit === unit).length < n && guard++ < 200) {
        const it = gens[guard % gens.length], inst = instantiate(it);
        if (!inst || seen.has(inst.q)) continue;
        seen.add(inst.q); inst.cat = cat; inst.unit = unit; list.push(simChoices(inst));
      }
    }
    return R.shuffle(list);
  }
  function viewSim(r) {
    const inst = r.list[r.i], left = r.end - Date.now(), n = r.list.length;
    const pace = Math.floor((Date.now() - r.t0) / r.pace), diff = r.i - pace;
    return `<div class="quizbar"><button class="back" data-a="simstop">${r.confirm ? 'Tap again to end' : 'End test'}</button><span class="simclock" id="simclock">${mmss(left)}</span></div>
      <p class="meta center"><span>Question ${r.i + 1} of ${n}</span> &middot; <span id="simpace">${diff >= 0 ? (diff ? `${diff} ahead of pace` : 'On pace') : `${-diff} behind pace`}</span></p>
      <article class="sheet" style="--tab:#2F5D50"><div class="qtext">${inst.q}</div>
        <div class="choices" role="radiogroup">${inst.choices.map((c, k) => `<button class="choice${r.pick === k ? ' picked' : ''}" role="radio" aria-checked="${r.pick === k}" data-a="simpick" data-k="${k}"><span class="letter">${'ABCDE'[k]}</span><span class="ctext">${c}</span></button>`).join('')}</div>
      </article>
      <div class="actions"><button class="btn primary" data-a="simnext" ${r.pick < 0 ? 'disabled' : ''}>${r.i === n - 1 ? 'Finish' : 'Next'}</button><button class="btn" data-a="simskip">Skip</button></div>
      <p class="hint center">No calculator. Wrong answers cost nothing, so guess rather than skip when you can eliminate even one choice.</p>`;
  }
  function startSim(rep, mode) {
    const list = buildSim(mode), r = { view: 'sim', mode, list, pace: SIM_MS / list.length, i: 0, pick: -1, t0: Date.now(), end: Date.now() + SIM_MS, answers: [] };
    (rep ? replace : go)(r);
    clearInterval(timer);
    timer = setInterval(() => {
      if (top() !== r) { clearInterval(timer); return; }
      const left = r.end - Date.now(), c = document.getElementById('simclock'), p = document.getElementById('simpace');
      if (c) { c.textContent = mmss(left); c.classList.toggle('low', left < 60000); }
      if (p) { const diff = r.i - Math.floor((Date.now() - r.t0) / r.pace); p.textContent = diff >= 0 ? (diff ? `${diff} ahead of pace` : 'On pace') : `${-diff} behind pace`; }
      if (left <= 0) endSim(r);
    }, 250);
  }
  function simAdvance(r, skip) {
    const inst = r.list[r.i];
    r.answers.push({ inst, pick: skip ? -1 : r.pick, ms: Date.now() - (r.tq || r.t0) });
    r.tq = Date.now(); r.pick = -1; r.confirm = false;
    if (r.i === r.list.length - 1) { endSim(r); return; }
    r.i++; render(true);
  }
  function endSim(r) {
    clearInterval(timer);
    const right = r.answers.filter(a => a.pick === a.inst.correct).length, q = QS(), hard = r.mode === 'hard', bk = hard ? 'bestHard' : 'best';
    const prev = q[bk]; q.sims.push({ d: Game.today(), s: right, n: r.answers.filter(a => a.pick >= 0).length, m: hard ? 'hard' : 'std' }); q[bk] = Math.max(q[bk] || 0, right);
    Game.activityXP('sim', right * Game.XP.sprint * (hard ? 2 : 1) * Game.mult('quant'), 2); Store.save();
    replace({ view: 'simEnd', mode: r.mode, answers: r.answers, total: r.list.length, right, prev, used: Math.min(SIM_MS, Date.now() - r.t0) });
  }
  function viewSimEnd(r) {
    const cats = {}, ans = r.answers;
    for (const a of ans) { const c = cats[a.inst.cat] = cats[a.inst.cat] || { n: 0, c: 0, ms: 0 }; c.n++; c.ms += a.ms; if (a.pick === a.inst.correct) c.c++; }
    const attempted = ans.filter(a => a.pick >= 0).length;
    const rows = Object.entries(cats).map(([k, v]) => `<tr><td>${k}</td><td>${v.c} of ${v.n}</td><td>${Math.round(v.ms / v.n / 1000)} s</td></tr>`).join('');
    const review = ans.map((a, k) => { const ok = a.pick === a.inst.correct;
      return `<details class="simrev ${ok ? 'ok' : 'no'}"><summary><span class="rnum">${k + 1}.</span> ${ok ? 'Correct' : a.pick < 0 ? 'Skipped' : 'Missed'} &middot; ${a.inst.cat}</summary>
        <div class="qtext">${a.inst.q}</div><p>${a.pick >= 0 && !ok ? `Your answer: ${a.inst.choices[a.pick]}. ` : ''}Correct: ${a.inst.choices[a.inst.correct]}.</p><div class="explain">${a.inst.x}</div></details>`; }).join('');
    const hard = r.mode === 'hard';
    return `<header class="top"><p class="meta">${hard ? 'Quant aptitude test' : 'Cognitive aptitude simulation'}</p><h1 class="title score">${r.right}</h1>
        <p class="meta">${r.right} correct of ${r.total}, ${attempted} answered in ${mmss(r.used)}. ${r.prev ? (r.right > r.prev ? `New best, up from ${r.prev}.` : `Best: ${Math.max(r.prev, r.right)}.`) : 'First score recorded.'}${hard ? '' : ' The published average on the standard Criteria test is about 24.'}</p></header>
      <div class="actions"><button class="btn primary" data-a="simstart" data-replace="1"${hard ? ' data-mode="hard"' : ''}>Take another</button><button class="btn" data-a="back">Done</button></div>
      <section class="panel"><h2>By category</h2><table class="tt simtab"><tr><th>Category</th><th>Correct</th><th>Avg time</th></tr>${rows}</table>
      <p class="hint">Target pace is ${hard ? 30 : 18} seconds. A category that is both slow and inaccurate is where an hour of the path's lessons pays off most.</p></section>
      <section class="panel"><h2>Review</h2>${review || '<p class="hint">No questions answered.</p>'}</section>`;
  }

  // Video question practice: 5 s to prepare, 3 min to answer aloud, then a model answer and a checklist.
  const VQ_PREP = 5000, VQ_ANS = 180000;
  const VQ_CHECKS = ['Restated the question and named the method in the first 15 seconds', 'Narrated each step instead of working silently', 'Stated a final number clearly', 'Checked the answer with a bound, an extreme case, or a second method', 'Finished inside 3 minutes'];
  const canRecord = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  function pickVq() {
    const q = QS(), n = VIDEO_QS.length; q.vqSeen = (q.vqSeen || []).filter(i => i < n);
    if (q.vqSeen.length >= n) q.vqSeen = [];
    const open = VIDEO_QS.map((_, i) => i).filter(i => !q.vqSeen.includes(i)), i = R.pick(open);
    q.vqSeen.push(i); return i;
  }
  function startVq(rep) {
    const r = { view: 'vq', phase: 'intro', idx: pickVq(), checks: VQ_CHECKS.map(() => false), rec: !!(top().rec && top().view === 'vq') };
    (rep ? replace : go)(r);
  }
  function vqTick(r) {
    clearInterval(timer);
    timer = setInterval(() => {
      if (top() !== r) { clearInterval(timer); stopRec(r, true); return; }
      const left = r.until - Date.now(), c = document.getElementById('vqclock');
      if (c) { c.textContent = r.phase === 'prep' ? String(Math.max(0, Math.ceil(left / 1000))) : mmss(left); c.classList.toggle('low', r.phase === 'answer' && left < 30000); }
      if (left <= 0) { if (r.phase === 'prep') vqAnswer(r); else if (r.phase === 'answer') vqFinish(r); }
    }, 200);
  }
  function vqPrep(r) { r.phase = 'prep'; r.until = Date.now() + VQ_PREP; render(true); vqTick(r); }
  function vqAnswer(r) { r.phase = 'answer'; r.until = Date.now() + VQ_ANS; r.t0 = Date.now(); render(false); vqTick(r); if (r.rec) startRec(r); }
  function vqFinish(r) {
    clearInterval(timer); r.used = Date.now() - (r.t0 || Date.now()); r.phase = 'review'; stopRec(r, false);
    const q = QS(); q.vq = (q.vq || 0) + 1; if (r.used >= 60000) Game.activityXP('vq', Game.XP.review * Game.mult('quant')); Store.save(); render(true);
  }
  function toggleRec(r) {
    if (r.rec) { r.rec = false; render(false); return; }
    if (!canRecord()) { r.recMsg = 'Recording is not available on this device. Answer aloud anyway.'; render(false); return; }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(st => { st.getTracks().forEach(t => t.stop()); r.rec = true; r.recMsg = ''; render(false); })
      .catch(() => { r.rec = false; r.recMsg = 'Microphone permission was not granted. Answer aloud anyway.'; render(false); });
  }
  function startRec(r) {
    if (!canRecord()) return;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(st => {
      if (top() !== r || r.phase !== 'answer') { st.getTracks().forEach(t => t.stop()); return; }
      const chunks = [], mr = new MediaRecorder(st); r.mr = mr; r.stream = st;
      mr.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
      mr.onstop = () => { st.getTracks().forEach(t => t.stop()); if (chunks.length && !r.discard) { r.audio = URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || 'audio/webm' })); if (top() === r) render(false); } };
      mr.start();
    }).catch(() => { r.recMsg = 'Recording could not start. Answer aloud anyway.'; });
  }
  function stopRec(r, discard) { r.discard = discard; if (r.mr && r.mr.state !== 'inactive') r.mr.stop(); else if (r.stream) r.stream.getTracks().forEach(t => t.stop()); }
  function viewVq(r) {
    const Q = VIDEO_QS[r.idx];
    if (r.phase === 'intro') return `<header class="top"><button class="back" data-a="back">Back</button><h1 class="title">Video question</h1>
        <p class="meta">Like the recorded interview: the question appears, you get 5 seconds, then 3 minutes to answer aloud. Keep paper and a pen ready. Afterward you see a model answer and a checklist.</p></header>
      <section class="panel"><label class="recrow"><span><b>Record my answer</b><br><span class="hint">Audio stays on this phone for playback right after. Nothing is saved or sent.</span></span>
        <button class="btn small${r.rec ? ' primary' : ''}" data-a="vqrec">${r.rec ? 'On' : 'Off'}</button></label>${r.recMsg ? `<p class="hint">${r.recMsg}</p>` : ''}</section>
      <div class="actions"><button class="btn primary" data-a="vqgo">Show the question</button></div>`;
    const qbox = `<article class="sheet vqsheet" style="--tab:#2F5D50"><p class="vnum-l">Question</p><div class="qtext">${Q.q}</div></article>`;
    if (r.phase === 'prep') return `<p class="meta center">Prepare</p><div class="vqclock" id="vqclock">${Math.max(0, Math.ceil((r.until - Date.now()) / 1000))}</div>${qbox}`;
    if (r.phase === 'answer') return `<p class="meta center">${r.rec ? '<span class="recdot"></span>Recording. ' : ''}Answer aloud</p><div class="vqclock" id="vqclock">${mmss(r.until - Date.now())}</div>${qbox}
      <div class="actions"><button class="btn primary" data-a="vqdone">I'm done</button></div>`;
    const score = r.checks.filter(Boolean).length;
    return `<header class="top"><p class="meta">Video question &middot; ${mmss(r.used)} used</p><h1 class="title">Model answer</h1></header>
      ${qbox}
      ${r.audio ? `<section class="panel"><h2>Your answer</h2><audio controls src="${r.audio}" class="vqaudio"></audio></section>` : ''}
      <section class="panel"><p class="vqans">Answer: <b>${Q.ans}</b></p><ol class="vqsay">${Q.say.map(t => `<li>${t}</li>`).join('')}</ol></section>
      <section class="panel"><h2>Checklist</h2><ul class="vqchecks">${VQ_CHECKS.map((c, k) => `<li><button class="vqc${r.checks[k] ? ' on' : ''}" data-a="vqcheck" data-k="${k}" aria-pressed="${r.checks[k]}"><span class="box"></span>${c}</button></li>`).join('')}</ul>
      <p class="hint">${score} of ${VQ_CHECKS.length}. ${score === VQ_CHECKS.length ? 'A complete answer.' : 'Aim for all five on the next one.'}</p></section>
      <div class="actions"><button class="btn primary" data-a="vqstart" data-replace="1">Next question</button><button class="btn" data-a="back">Done</button></div>`;
  }

  // ---------- Progress ----------
  function viewProgress() {
    const st = S(), lv = Game.level(), s = Game.streak();
    const weeks = 15, t = Game.today(), dow = (new Date().getDay() + 6) % 7, start = Game.addDays(t, -(weeks - 1) * 7 - dow), goal = st.settings.goal;
    let cells = '';
    for (let w = 0; w < weeks; w++) for (let d = 0; d < 7; d++) {
      const k = Game.addDays(start, w * 7 + d), x = st.xpDays[k] || 0;
      const lvl = k > t ? 'future' : st.goalDays[k] ? 'l3' : x >= goal / 2 ? 'l2' : x > 0 ? 'l1' : st.shieldDays[k] ? 'sh' : '';
      cells += `<span class="hc ${lvl}" style="grid-column:${w + 1};grid-row:${d + 1}" title="${k}: ${x} XP"></span>`;
    }
    const badges = Game.BADGES.map(([id, name, desc]) => `<li class="badge${st.badges[id] ? ' got' : ''}"><span class="bmark" aria-hidden="true">${STAR(!!st.badges[id])}</span><span class="bname">${name}</span><span class="bdesc">${desc}</span></li>`).join('');
    const paths = SUBJECTS.map(sj => { const d = doneCount(sj), n = sj.learn.length, three = sj.learn.filter(c => Game.unit(sj.id, c.title).stars >= 3).length;
      return `<li><span class="pname">${sj.name}</span><span class="pstat">${d} of ${n}${three ? `, ${three} with 3 stars` : ''}</span><span class="bar" style="--fill:${sj.color}"><span style="width:${pct(d, n)}%"></span></span></li>`; }).join('');
    return `<header class="top"><button class="back" data-a="back">Back</button><h1 class="title">Progress</h1>
        <p class="meta">${st.xp.toLocaleString()} XP in total. ${Game.BADGES.filter(b => st.badges[b[0]]).length} of ${Game.BADGES.length} badges.</p></header>
      <section class="panel stats3">
        <div><span class="snum">${lv.L}</span><span class="slab">level</span></div>
        <div><span class="snum">${s}</span><span class="slab">day streak</span></div>
        <div><span class="snum">${st.bestStreak}</span><span class="slab">best streak</span></div>
      </section>
      <p class="hint">Rank: <b>${Game.rank()}</b>${Game.nextRank() ? `. Next rank, ${Game.nextRank()[1]}, at level ${Game.nextRank()[0]}` : ', the top rank'}. Perfect weeks: ${st.perfectWeeks || 0}.</p>
      ${rankLadder(lv.L)}
      <p class="hint">${lv.span - lv.into} XP to level ${lv.L + 1}. Streak shields: ${st.shields} of ${Game.shieldCap()}. You earn one for every seven days in a row and at levels ${Game.LEVEL_REWARDS.join(', ')}; one covers a single missed day automatically. You can hold more at levels 25, 50 and 75.</p>
      ${xpRules()}
      <section class="panel"><h2>Last ${weeks} weeks</h2><div class="heat">${cells}</div>
        <p class="legend"><span class="hc l1"></span> practiced <span class="hc l2"></span> half the goal <span class="hc l3"></span> goal met</p></section>
      <section class="panel"><h2>Memory strength</h2><p class="hint">How well your mastered units are holding. It stays at 100% while reviews are on schedule and fades the longer a due review waits.</p>
        ${(() => { const rows = SUBJECTS.map(sj => [sj, Game.memory([sj.id])]).filter(([, m]) => m != null); return rows.length ? `<ul class="paths">${rows.map(([sj, m]) => `<li><span class="pname">${sj.name}</span><span class="pstat">${m}%</span><span class="bar" style="--fill:${m >= 80 ? 'var(--ok)' : m >= 50 ? 'var(--amber)' : 'var(--no)'}"><span style="width:${m}%"></span></span></li>`).join('')}</ul>` : '<p class="hint">Master a unit to start tracking.</p>'; })()}</section>
      <section class="panel"><h2>Certificates</h2><p class="hint">Earned by completing every unit in a subject, and every subject in a course.</p><ul class="certs">
        ${SUBJECTS.map(sj => { const d = doneCount(sj), n = sj.learn.length, got = (st.certs || {})[sj.id]; return `<li class="cert${got ? ' got' : ''}"><span class="cname">${sj.name}</span><span class="cstat2">${got ? `Earned ${new Date(got).toLocaleDateString()}` : `${d} of ${n} units`}</span></li>`; }).join('')}
        ${Game.COURSES.map(([name, ids]) => { const got = (st.certs || {})[name], k = ids.filter(id => (st.certs || {})[id]).length; return `<li class="cert course${got ? ' got' : ''}"><span class="cname">${name} course</span><span class="cstat2">${got ? `Earned ${new Date(got).toLocaleDateString()}` : `${k} of ${ids.length} subjects`}</span></li>`; }).join('')}
      </ul></section>
      <section class="panel"><h2>Paths</h2><ul class="paths">${paths}</ul></section>
      <section class="panel"><h2>Badges</h2><ul class="badges">${badges}</ul></section>
      <section class="panel"><h2>Themes</h2><p class="hint">${Game.THEMES.filter(t => Game.themeOpen(t.id)).length} of ${Game.THEMES.length} owned. Choose one in Settings.</p><ul class="certs">${Game.THEMES.map(t => `<li class="cert${Game.themeOpen(t.id) ? ' got' : ''}"><span class="cname">${t.name} (${t.mode})</span><span class="cstat2">${Game.themeOpen(t.id) ? 'Owned' : Game.reqText(t.req)}</span></li>`).join('')}</ul></section>`;
  }
  // The full rank ladder, with the current rank marked.
  function rankLadder(L) {
    const cur = Game.rankInfo(L).i;
    return `<section class="panel"><h2>Ranks</h2><p class="hint">Each rank has grades I, II and III before the next. The top rank, Paragon, is open-ended.</p><ol class="ladder">${Game.RANKS.map(([l, n], i) => `<li class="${i < cur ? 'past' : i === cur ? 'cur' : ''}"><span>${n}</span><span class="lvl">level ${l}${i === cur ? `, you: ${Game.rank(L)}` : ''}</span></li>`).join('')}</ol></section>`;
  }
  // How XP is computed, shown on the progress screen.
  function xpRules() {
    const tiers = Game.TIER_INFO.slice(1).map(([n, m, cap], i) => `<tr><td><b>${n}</b><br>${m}× XP<br><small>${cap === Infinity ? 'never halved' : `half above level ${cap}`}</small></td><td>${SUBJECTS.filter(s => Game.tier(s.id) === i + 1).map(s => s.name).join(', ')}</td></tr>`).join('');
    return `<section class="panel"><h2>How XP works</h2>
      <p class="hint">A correct answer is worth 10 XP times its subject's tier, and later units in a subject pay up to 25% more. Wrong answers earn nothing.</p>
      <table class="tt xptab"><tr><th>Tier</th><th>Subjects</th></tr>${tiers}</table>
      <p class="hint">Learning a unit you have not yet mastered, or answering a due review, pays 25% more. Practicing a 3-star unit before its review is due pays 40% less. In one unit on one day, the first 15 correct answers pay in full, the next 15 half, and the rest a fifth. Lessons, mastery checks and reviews scale with the tier too, and each "Your turn" problem pays once. Sprints, aptitude tests and video questions pay in full for the first few runs each day. Weekly quests pay ${Game.questXP()} XP at your level, more as you rise.</p>
      <p class="hint">Levels need more XP as they rise: ${[2, 10, 25, 50, 100].map(L => `level ${L} at ${Game.need(L).toLocaleString()}`).join(', ')}.</p></section>`;
  }

  // ---------- Settings ----------
  function viewSettings(r) {
    const st = S(), len = st.settings.length || 10, goal = st.settings.goal, rem = st.settings.reminder || { on: false, hour: 19 };
    const nat = window.AndroidReminder, permitted = nat ? nat.permitted() : false;
    const counts = SUBJECTS.map(s => `<li>${s.name}: ${s.questions.length} fixed problems, ${s.generators.length} generators, ${s.learn.length} units${s.learn.some(c => c.vary) ? `, ${s.learn.reduce((a, c) => a + (c.vary ? c.vary.length : 0), 0)} variation problems` : ''}</li>`).join('');
    const hours = [7, 9, 12, 17, 19, 21];
    return `<header class="top">
        <button class="back" data-a="back">Back</button>
        <h1 class="title">Settings</h1>
      </header>
      <section class="panel">
        <h2>Daily goal</h2>
        <div class="seg-pick" role="radiogroup">${[[50, 'Light'], [100, 'Steady'], [200, 'Intense']].map(([v, n]) => `<button role="radio" aria-checked="${v === goal}" data-a="goal" data-v="${v}">${n}<small>${v} XP</small></button>`).join('')}</div>
        <p class="hint">A correct answer earns 10 XP times the subject's tier, from 1× (Foundations) to 4× (graduate subjects). Progress and badges explains the full rules. Steady is about 10 to 15 minutes.</p>
      </section>
      <section class="panel">
        <h2>Daily reminder</h2>
        ${nat ? `<div class="seg-pick" role="radiogroup"><button role="radio" aria-checked="${!rem.on}" data-a="rem" data-v="off">Off</button>${hours.map(h => `<button role="radio" aria-checked="${rem.on && rem.hour === h}" data-a="rem" data-v="${h}">${h % 12 || 12} ${h < 12 ? 'am' : 'pm'}</button>`).join('')}</div>
          <p class="hint">The reminder is skipped on days you have already met your goal.</p>
          ${reminderStatus(rem)}`
        : '<p class="hint">Reminders are available in the Android app.</p>'}
      </section>
      <section class="panel">
        <h2>Themes</h2>
        ${['light', 'dark'].map(m => `<h3 class="thead">${m === 'light' ? 'Light' : 'Dark'}</h3><div class="themes">${Game.THEMES.filter(t => t.mode === m).map(t => { const open = Game.themeOpen(t.id), p = Game.palette(t.id);
          return `<button class="theme" data-a="theme" data-v="${t.id}" aria-pressed="${(st.settings.theme || 'paper') === t.id}" ${open ? '' : 'disabled'}><span class="swatch" style="background:linear-gradient(135deg, ${p.paper} 50%, ${p.ink} 50%)"></span><span>${t.name}</span><small>${open ? '&nbsp;' : Game.reqText(t.req)}</small></button>`; }).join('')}</div>`).join('')}
        <p class="hint">Each theme is its own reward, light and dark alike. Once earned, a theme stays yours.</p>
      </section>
      <section class="panel">
        <h2>Problems per set</h2>
        <div class="seg-pick" role="radiogroup">${[5, 10, 20].map(v => `<button role="radio" aria-checked="${v === len}" data-a="len" data-v="${v}">${v}</button>`).join('')}</div>
      </section>
      <section class="panel">
        <h2>Question bank</h2>
        <ul class="counts">${counts}</ul>
        <p class="hint">Generators build a new problem with a worked solution every time they are drawn.</p>
      </section>
      <section class="panel">
        <h2>Progress</h2>
        <button class="btn danger" data-a="reset">${r.confirm ? 'Tap again to erase all progress' : 'Erase all progress'}</button>
      </section>`;
  }

  // Reminder health from the Android shell: permission, channel, exact timing, battery restriction, next and last alarm.
  function reminderStatus(rem) {
    let st = {}; try { st = JSON.parse(window.AndroidReminder.status ? window.AndroidReminder.status() : '{}'); } catch (e) { st = {}; }
    if (!window.AndroidReminder.status) return '';
    const when = ms => { const d = new Date(ms), t = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), k = Game.today();
      const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; return `${day === k ? 'today' : day === Game.addDays(k, 1) ? 'tomorrow' : day === Game.addDays(k, -1) ? 'yesterday' : d.toLocaleDateString()} at ${t}`; };
    const row = (ok, label, fix) => `<li class="rstat ${ok ? 'ok' : 'no'}"><span class="rdot" aria-hidden="true"></span><span>${label}</span>${!ok && fix ? fix : ''}</li>`;
    const rows = [
      row(st.permitted && st.channel, st.permitted ? (st.channel ? 'Notifications allowed' : 'The "Daily practice" channel is turned off') : 'Notifications blocked', '<button class="btn small" data-a="perm">Allow</button>'),
      row(st.exact, st.exact ? 'Exact timing allowed' : 'Exact timing not allowed: the reminder may arrive late', '<button class="btn small" data-a="remfix" data-v="exact">Allow</button>'),
      row(!st.battery, st.battery ? 'Battery optimization can delay or drop reminders' : 'Not restricted by battery optimization', '<button class="btn small" data-a="remfix" data-v="battery">Remove restriction</button>')];
    const next = rem.on && st.on && st.next ? `Next reminder ${when(st.next)}.` : rem.on ? 'No alarm is scheduled; reopen this screen to schedule it.' : 'Reminders are off.';
    const last = st.last ? ` Last alarm ${when(st.last)}${st.lastSkipped ? ', skipped because the goal was met' : ', notification posted'}.` : '';
    return `<ul class="rstats">${rows.join('')}</ul><p class="hint">${next}${last}</p>
      <div class="btnrow"><button class="btn small" data-a="remtest" data-v="now">Send a test now</button><button class="btn small" data-a="remtest" data-v="alarm">Test the alarm in 1 minute</button></div>
      ${top().remtest ? `<p class="hint">${top().remtest === 'alarm' ? 'Test alarm set. Lock the phone; a test notification should arrive in about a minute.' : 'Test sent. If nothing appeared, notifications are blocked in Android settings.'}</p>` : ''}`;
  }
  // Re-arm the daily alarm whenever the app opens, so a force stop or a lost alarm cannot silence reminders for good.
  function armReminder() {
    const rem = S().settings.reminder;
    if (window.AndroidReminder && rem && rem.on) { try { window.AndroidReminder.schedule(rem.hour, 0); } catch (e) { /* older shell */ } }
  }

  // ---------- Symbol chart ----------
  function symbolGroups(groups, query) {
    const q = query.trim().toLowerCase();
    const out = groups.map(g => {
      const items = g.items.filter(it => !q || [it.n, it.m, it.s, it.e || '', g.title].join(' ').toLowerCase().includes(q));
      if (!items.length) return '';
      const rows = items.map(it => `<li class="sym">
          <div class="sym-s">${g.code ? `<code>${esc(it.s)}</code>` : `\\(${it.s}\\)`}</div>
          <div class="sym-t"><span class="sym-n">${it.n}</span><span class="sym-m">${it.m}</span>${it.e ? `<span class="sym-e">${g.code ? `<code>${esc(it.e)}</code>` : `\\(${it.e}\\)`}</span>` : ''}</div>
        </li>`).join('');
      return `<section class="symgroup"><h2>${g.title}</h2><ul class="syms">${rows}</ul></section>`;
    }).join('');
    return out || '<p class="hint">No symbols match. Try a name such as "gradient" or a word such as "variance".</p>';
  }

  function viewSymbols(r) {
    const cat = r.cat || 'all', groups = cat === 'all' ? SYMBOLS : SYMBOLS.filter(g => g.id === cat);
    const total = SYMBOLS.reduce((a, g) => a + g.items.length, 0);
    const chips = [{ id: 'all', title: 'All' }].concat(SYMBOLS).map(g =>
      `<button class="chip" aria-pressed="${g.id === cat}" data-a="cat" data-cat="${g.id}">${g.title}</button>`).join('');
    return `<header class="top">
        <button class="back" data-a="back">Back</button>
        <h1 class="title">Symbol chart</h1>
        <p class="meta">${total} symbols with names, meanings, and examples.</p>
      </header>
      <input id="symq" class="search" type="search" placeholder="Search by name or meaning" autocomplete="off" value="${esc(r.query || '')}" aria-label="Search symbols">
      <div class="chips">${chips}</div>
      <div id="symlist">${symbolGroups(groups, r.query || '')}</div>`;
  }

  // ---------- Render ----------
  const KATEX_OPTS = { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false, ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option'] };
  const VIEWS = { home: viewHome, subject: viewSubject, lesson: viewLesson, quiz: viewQuiz, summary: viewSummary, settings: viewSettings, symbols: viewSymbols, sprints: viewSprints, sprint: viewSprint, sprintEnd: viewSprintEnd, sim: viewSim, simEnd: viewSimEnd, vq: viewVq, progress: viewProgress };

  function showToasts() {
    Game.checkBadges();
    const list = Game.popToasts();
    if (!list.length) return;
    let box = document.getElementById('toasts');
    if (!box) { box = document.createElement('div'); box.id = 'toasts'; box.setAttribute('role', 'status'); document.body.appendChild(box); }
    for (const t of list) {
      const el = document.createElement('p'); el.className = 'toast ' + t.kind; el.textContent = t.text; box.appendChild(el);
      setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 400); }, 3200);
    }
  }

  // Each theme is a full palette; the stylesheet reads only these custom properties.
  const VARS = { paper: '--paper', paper2: '--paper-2', card: '--card', grid: '--grid', gridMajor: '--grid-major', rule: '--rule', ink: '--ink', graphite: '--graphite', ok: '--ok', okBg: '--ok-bg', no: '--no', noBg: '--no-bg',
    blue: '--blue', red: '--red', green: '--green', amber: '--amber', gold: '--gold', blueBg: '--blue-bg', amberBg: '--amber-bg', goldBg: '--gold-bg', heat: '--heat', teal: '--teal', onAccent: '--on-accent' };
  function applyTheme() {
    let th = S().settings.theme || 'paper'; if (!Game.themeOpen(th)) th = 'paper';
    const p = Game.palette(th), root = document.documentElement;
    for (const [k, v] of Object.entries(VARS)) if (p[k]) root.style.setProperty(v, p[k]);
    p.d.forEach((c, i) => root.style.setProperty(`--d${i}`, c));
    root.dataset.theme = th; root.dataset.mode = p.mode;
    const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = p.paper;
    try { if (window.AndroidReminder && window.AndroidReminder.setBars) window.AndroidReminder.setBars(p.paper); } catch (e) { /* older shell */ }
  }
  applyTheme();
  armReminder();
  function render(scrollTop) {
    const r = top();
    if (!['sprint', 'sim', 'vq'].includes(r.view)) clearInterval(timer);
    $app.innerHTML = VIEWS[r.view](r);
    $app.dataset.view = r.view;
    if (window.renderMathInElement) renderMathInElement($app, KATEX_OPTS);
    FIGS.mount($app);
    const bk = r.view === 'quiz' ? `q${r.session.uid}-${r.session.i}` : r.view === 'lesson' ? `l${r.sid}-${r.i}-${r.k}-${r.vi || 0}` : null;
    if (window.Board) Board.setAvailable(!!bk, bk);
    if (scrollTop) window.scrollTo(0, 0);
    for (const id of ['num', 'vnum']) {
      const el = document.getElementById(id);
      if (el && !el.disabled) el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); act(id === 'num' ? 'check' : 'vcheck'); } });
    }
    showToasts();
  }

  function startSession(opts) {
    let ses;
    if (opts.mode === 'today') ses = buildToday();
    else if (opts.mode === 'check' || opts.mode === 'drill') { const card = subjById(opts.subject).learn.find(c => c.title === opts.unit); ses = { opts, list: buildUnitSet(opts.subject, card, opts.len || 5), i: 0, xp0: S().xp }; }
    else ses = buildSession(opts);
    ses.uid = Math.random().toString(36).slice(2);
    if (!ses.list.length) return;
    go({ view: 'quiz', session: ses });
  }

  function act(a, el) {
    const r = top();
    const nav = (route) => (el && el.dataset.replace ? replace : go)(route);
    switch (a) {
      case 'back': window.appBack(); break;
      case 'home': stack.length = 1; render(true); break;
      case 'subject': {
        const id = el.dataset.id;
        if (el.dataset.replace) { if (!popTo(x => x.view === 'subject' && x.id === id)) { popTo(x => x.view === 'home'); stack.push({ view: 'subject', id }); } render(true); }
        else go({ view: 'subject', id });
        break;
      }
      case 'settings': go({ view: 'settings' }); break;
      case 'progress': go({ view: 'progress' }); break;
      case 'symbols': go({ view: 'symbols' }); break;
      case 'sprints': go({ view: 'sprints' }); break;
      case 'simstart': startSim(!!el.dataset.replace, el.dataset.mode); break;
      case 'simpick': { if (r.view === 'sim') { r.pick = +el.dataset.k; render(false); } break; }
      case 'simnext': if (r.view === 'sim') simAdvance(r, false); break;
      case 'simskip': if (r.view === 'sim') simAdvance(r, true); break;
      case 'simstop': if (r.view === 'sim') { if (r.confirm) endSim(r); else { r.confirm = true; render(false); } } break;
      case 'vqstart': startVq(!!el.dataset.replace); break;
      case 'vqrec': if (r.view === 'vq') toggleRec(r); break;
      case 'vqgo': if (r.view === 'vq') vqPrep(r); break;
      case 'vqdone': if (r.view === 'vq') vqFinish(r); break;
      case 'vqcheck': if (r.view === 'vq') { r.checks[+el.dataset.k] = !r.checks[+el.dataset.k]; render(false); } break;
      case 'sprint': startSprint(el.dataset.id, !!el.dataset.replace); break;
      case 'cat': r.cat = el.dataset.cat; render(false); break;
      case 'tab': r.tab = el.dataset.tab; render(false); break;
      case 'today': {
        const ses = buildToday();
        if (ses.list.length) go({ view: 'quiz', session: ses });
        else { const sg = suggestLesson(); if (sg) go({ view: 'lesson', sid: sg.s.id, i: sg.i, k: 0 }); }
        break;
      }
      case 'lesson': {
        const sid = el.dataset.sid, i = +el.dataset.i, s = subjById(sid), card = s.learn[i], u = Game.unit(sid, card.title);
        S().settings.lastSubject = sid;
        // A unit with a review due opens straight on its review.
        const k = u.stars >= 2 && u.due && u.due <= Game.today() ? stagesOf(s, card).length - 1 : 0;
        const route = { view: 'lesson', sid, i, k, maxk: k ? stagesOf(s, card).length - 1 : 0 };
        if (el.dataset.replace && top().view !== 'lesson') { if (!popTo(x => x.view === 'subject' && x.id === sid)) popTo(x => x.view === 'home'); go(route); }
        else nav(route);
        break;
      }
      case 'stage': r.k = +el.dataset.k; render(true); break;
      case 'checkstart': {
        const s = subjById(r.sid), card = s.learn[r.i];
        const u = Game.unit(s.id, card.title);
        startSession({ subject: s.id, skill: card.skill, len: 5, mode: 'check', unit: card.title, i: r.i, review: u.stars >= 2 && !!u.due && u.due <= Game.today() });
        break;
      }
      case 'drill': { const s = subjById(r.sid), card = s.learn[r.i]; startSession({ subject: s.id, mode: 'drill', unit: card.title, i: r.i, len: S().settings.length || 10 }); break; }
      case 'vpick': { const vs = r.vs[r.vi || 0]; if (vs.state === 'open') { vs.pick = +el.dataset.k; render(false); } break; }
      case 'vkey': {
        const inp = document.getElementById('vnum'), k = el.dataset.k;
        if (k === '-') inp.value = inp.value.startsWith('-') ? inp.value.slice(1) : '-' + inp.value; else inp.value += k;
        r.vs[r.vi || 0].input = inp.value; inp.focus(); break;
      }
      case 'vcheck': {
        const vi = r.vi || 0, v = subjById(r.sid).learn[r.i].vary[vi], vs = r.vs[vi];
        if (vs.state !== 'open') break;
        let ok;
        if (Array.isArray(v[1])) { if (vs.pick < 0) break; ok = vs.pick === 0; }
        else {
          vs.input = document.getElementById('vnum').value;
          const x = parseNum(vs.input);
          if (!Number.isFinite(x)) { document.getElementById('vnum').classList.add('invalid'); break; }
          ok = subjById(r.sid).plain && Number.isInteger(v[1]) ? x === v[1] : Math.abs(x - v[1]) <= Math.max(0.005, 0.001 * Math.abs(v[1]));
        }
        vs.state = ok ? 'right' : 'wrong';
        if (ok) { vs.xp = Game.awardVary(r.sid, subjById(r.sid).learn[r.i].title, vi); Store.save(); }
        render(false);
        const fb = document.querySelector('.feedback'); if (fb) fb.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' });
        break;
      }
      case 'vnext': r.vi = (r.vi || 0) + 1; render(false); break;
      case 'unitdrill': { const s = subjById(el.dataset.sid), card = s.learn[+el.dataset.i]; startSession({ subject: s.id, mode: 'drill', unit: card.title, i: +el.dataset.i, len: S().settings.length || 10 }); break; }
      case 'start': startSession({ subject: el.dataset.subject, skill: el.dataset.skill, missed: !!el.dataset.missed, group: el.dataset.group != null ? +el.dataset.group : undefined }); break;
      case 'pick': { const inst = r.session.list[r.session.i]; if (inst.state === 'open') { inst.pick = +el.dataset.k; render(false); } break; }
      case 'key': {
        const inp = document.getElementById('num'), k = el.dataset.k;
        if (k === '-') inp.value = inp.value.startsWith('-') ? inp.value.slice(1) : '-' + inp.value;
        else inp.value += k;
        r.session.list[r.session.i].input = inp.value; inp.focus();
        break;
      }
      case 'check': {
        const inst = r.session.list[r.session.i];
        if (inst.state !== 'open') break;
        if (inst.type === 'num') {
          inst.input = document.getElementById('num').value;
          if (!Number.isFinite(parseNum(inst.input))) {
            const inp = document.getElementById('num');
            inp.classList.add('invalid'); inp.setAttribute('aria-invalid', 'true');
            const h = inp.parentElement.querySelector('.hint'); if (h) h.textContent = 'Enter a number, decimal, or fraction such as -3/4.';
            break;
          }
        } else if (inst.pick < 0) break;
        const ok = grade(inst);
        inst.state = ok ? 'right' : 'wrong';
        record(inst, ok);
        render(false);
        const fb = document.querySelector('.feedback');
        if (fb) fb.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' });
        break;
      }
      case 'next': {
        const ses = r.session;
        if (ses.i < ses.list.length - 1) { ses.i++; render(true); } else { finishSession(ses); replace({ view: 'summary', session: ses }); }
        break;
      }
      case 'again': {
        const o = r.session.opts; stack.pop();
        startSession(o.missed ? { subject: o.subject } : o); break;
      }
      case 'spick': {
        const q = r.q; if (q.pick >= 0 || Date.now() > r.end) break;
        q.pick = +el.dataset.k; r.total++;
        if (q.choices[q.pick] === q.a) r.right++; else r.miss.push({ p: q.p, a: q.a });
        r.lock = true; render(false);
        setTimeout(() => { if (top() !== r) return; r.lock = false; if (Date.now() >= r.end) endSprint(r); else { r.q = sprintQ(r.deck, q); render(false); } }, q.choices[q.pick] === q.a ? 260 : 900);
        break;
      }
      case 'len': S().settings.length = +el.dataset.v; Store.save(); render(false); break;
      case 'group': { const st = S(), g = GROUPS[+el.dataset.g], open = el.getAttribute('aria-expanded') === 'true'; st.settings.collapsed = st.settings.collapsed || {}; st.settings.collapsed[g.name] = open; Store.save(); render(false); break; }
      case 'groupsall': { const st = S(), close = el.dataset.v === '1'; st.settings.collapsed = {}; for (const g of GROUPS) st.settings.collapsed[g.name] = close; Store.save(); render(false); break; }
      case 'theme': { const th = Game.THEMES.find(t => t.id === el.dataset.v); if (th && Game.themeOpen(th.id)) { S().settings.theme = th.id; Store.save(); applyTheme(); render(false); } break; }
      case 'goal': S().settings.goal = +el.dataset.v; Store.save(); render(false); break;
      case 'rem': {
        const v = el.dataset.v, rem = S().settings.reminder = { on: v !== 'off', hour: v === 'off' ? (S().settings.reminder || {}).hour || 19 : +v };
        if (window.AndroidReminder) {
          if (rem.on) { window.AndroidReminder.schedule(rem.hour, 0); if (!window.AndroidReminder.permitted()) window.AndroidReminder.requestPermission(); }
          else window.AndroidReminder.cancel();
        }
        Store.save(); render(false); break;
      }
      case 'perm': if (window.AndroidReminder) window.AndroidReminder.requestPermission(); break;
      case 'remfix': if (window.AndroidReminder) { if (el.dataset.v === 'battery') window.AndroidReminder.openBattery(); else window.AndroidReminder.openExact(); } break;
      case 'remtest': if (window.AndroidReminder) { if (!window.AndroidReminder.permitted()) { window.AndroidReminder.requestPermission(); break; } if (el.dataset.v === 'alarm') window.AndroidReminder.testAlarm(); else window.AndroidReminder.testNow(); r.remtest = el.dataset.v; render(false); } break;
      case 'reset': if (r.confirm) { Store.reset(); Game.init(); r.confirm = false; } else r.confirm = true; render(false); break;
    }
  }

  $app.addEventListener('click', e => {
    const el = e.target.closest('[data-a]');
    if (!el || el.disabled) return;
    act(el.dataset.a, el);
  });
  $app.addEventListener('input', e => {
    if (e.target.id === 'symq') {
      const r = top(); r.query = e.target.value;
      const list = document.getElementById('symlist');
      list.innerHTML = symbolGroups(r.cat && r.cat !== 'all' ? SYMBOLS.filter(g => g.id === r.cat) : SYMBOLS, r.query);
      if (window.renderMathInElement) renderMathInElement(list, KATEX_OPTS);
      return;
    }
    if (e.target.id === 'num' && top().view === 'quiz') {
      const s = top().session; s.list[s.i].input = e.target.value;
      e.target.classList.remove('invalid'); e.target.removeAttribute('aria-invalid');
    }
    if (e.target.id === 'vnum' && top().view === 'lesson') { const r = top(); r.vs[r.vi || 0].input = e.target.value; e.target.classList.remove('invalid'); }
  });

  // Test hook for the automated flow checks; inert unless a test harness sets window.__TEST__ before load.
  if (window.__TEST__) window.__T = { buildUnitSet, buildToday, buildSession, ITEMS, reachedUnits, unitKey, buildSim };
  render(true);
})();
