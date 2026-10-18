'use strict';
// Progression: XP, daily goal, streaks with shields, levels, unit mastery, spaced review, badges, themes.
//
// XP design. Every award is base x subject tier x a few factors that keep easy or repeated work from paying like new, hard work:
//   tier        1x Foundational ... 4x Graduate (TIERS below)
//   depth       later units in a subject pay up to 25% more
//   status      learning a unit (not yet mastered) or answering a due review: 1.25x; long-term (3-star) units outside a review: 0.6x
//   repetition  within one unit on one day, the first 15 correct answers pay in full, the next 15 half, the rest a fifth
//   level gap   once your level passes a tier's cap, that tier pays half
// Wrong answers pay nothing, one-time rewards (lessons, mastery, "Your turn" problems) pay once, and timed activities
// (sprints, aptitude simulations, video questions) pay in full only for the first few runs each day.
window.Game = (() => {
  const S = () => Store.get();
  const DAY = 86400000;
  const dayKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const today = () => dayKey(new Date());
  const addDays = (k, n) => { const [y, m, d] = k.split('-').map(Number); return dayKey(new Date(y, m - 1, d + n)); };
  // Review intervals in days after each successful recall.
  const INTERVALS = [1, 3, 7, 14, 30, 60, 120];
  // Base amounts, before the tier multiplier and the factors above.
  const XP = { right: 10, wrong: 0, vary: 5, lesson: 30, master: 60, review: 30, perfect: 0.2, sprint: 2 };
  const toasts = [];

  // ---------- Subject groups and difficulty tiers ----------
  const GROUPS = [
    { name: 'Foundations', ids: ['algebra', 'trig', 'precalc'] },
    { name: 'Calculus', ids: ['calc1', 'calc2', 'calc3'] },
    { name: 'Upper-level math', ids: ['linalg', 'discrete', 'prob', 'stats'] },
    { name: 'Pure math', ids: ['nums', 'ra', 'alg', 'nt', 'cx', 'top', 'ode', 'pde', 'meas', 'stoch', 'fa', 'dg'] },
    { name: 'Physics', ids: ['physics', 'mm', 'cm', 'em', 'sr', 'qm', 'sm', 'gr', 'qft'] },
    { name: 'C++', ids: ['cpp', 'cppm', 'cppa'] },
    { name: 'Applied', ids: ['python', 'quant'] }
  ];
  // [name, multiplier, level above which the tier pays half]
  const TIER_INFO = [null, ['Foundational', 1, 20], ['Core', 1.5, 35], ['Intermediate', 2, 55], ['Advanced', 3, 80], ['Graduate', 4, Infinity]];
  const TIERS = {
    algebra: 1, trig: 1, precalc: 1,
    calc1: 2, calc2: 2, physics: 2, python: 2, cpp: 2, nums: 2,
    calc3: 3, linalg: 3, discrete: 3, prob: 3, stats: 3, quant: 3, ode: 3, sr: 3, mm: 3, cppm: 3, cppa: 3,
    ra: 4, alg: 4, nt: 4, cx: 4, top: 4, pde: 4, cm: 4, em: 4,
    meas: 5, stoch: 5, fa: 5, dg: 5, qm: 5, sm: 5, gr: 5, qft: 5
  };
  const tier = sid => TIERS[sid] || 2;
  const tierName = sid => TIER_INFO[tier(sid)][0];
  const mult = sid => TIER_INFO[tier(sid)][1];
  // The tier multiplier, halved once the learner has outgrown the tier.
  const effMult = sid => mult(sid) * (level().L > TIER_INFO[tier(sid)][2] ? 0.5 : 1);
  const depth = (sid, title) => { const s = window.SUBJECTS && SUBJECTS.find(x => x.id === sid); if (!s || s.learn.length < 2) return 1; const i = s.learn.findIndex(c => c.title === title); return 1 + 0.25 * Math.max(0, i) / (s.learn.length - 1); };

  function init() {
    const st = S();
    st.units = st.units || {}; st.xp = st.xp || 0; st.xpDays = st.xpDays || {}; st.goalDays = st.goalDays || {};
    st.badges = st.badges || {}; st.sprints = st.sprints || {}; st.shieldDays = st.shieldDays || {};
    st.shields = st.shields || 0; st.bestStreak = st.bestStreak || 0; st.shieldAt = st.shieldAt || 0;
    st.counters = Object.assign({ lessons: 0, reviews: 0, perfect: 0, fixed: 0, sprintBest: 0 }, st.counters || {});
    st.varyDone = st.varyDone || {}; st.levelRewards = st.levelRewards || {};
    st.settings.goal = st.settings.goal || 100;
    if (!st.themesOwned) migrateThemes(st);
    applyShields();
  }

  // ---------- Streak ----------
  const counted = d => S().goalDays[d] || S().shieldDays[d];
  function streak() {
    let d = today(); if (!counted(d)) d = addDays(d, -1);
    let n = 0; while (counted(d)) { n++; d = addDays(d, -1); }
    return n;
  }
  // Shield capacity grows with level: 2, then 3 at level 25, 4 at 50, 5 at 75.
  const shieldCap = (L = level().L) => 2 + (L >= 25) + (L >= 50) + (L >= 75);
  // A shield covers one missed day, as long as the streak was alive the day before.
  function applyShields() {
    const st = S(); let changed = false;
    for (let back = 7; back >= 1; back--) {
      const d = addDays(today(), -back);
      if (!counted(d) && st.shields > 0 && counted(addDays(d, -1))) { st.shieldDays[d] = true; st.shields--; changed = true; }
    }
    if (changed) { toasts.push({ kind: 'shield', text: 'A streak shield covered a missed day.' }); Store.save(); }
  }

  // ---------- Levels ----------
  // XP from level L to L + 1 grows as L^1.3: 50 at level 1, about 1,000 at 10, 5,300 at 36, 20,000 at 100.
  const span = L => Math.round(50 * Math.pow(L, 1.3) / 5) * 5;
  const NEED = [0, 0];
  const need = L => { while (NEED.length <= L) NEED.push(NEED[NEED.length - 1] + span(NEED.length - 1)); return NEED[L]; };
  function level(xp = S().xp) {
    let L = 1; while (need(L + 1) <= xp) L++;
    return { L, into: xp - need(L), span: need(L + 1) - need(L) };
  }
  const xpToday = () => S().xpDays[today()] || 0;
  // Bonus XP for meeting weekly quests scales with level, so quests stay worth doing.
  const questXP = () => 50 + 10 * level().L;
  const LEVEL_REWARDS = [10, 25, 50, 75, 100];

  function addXP(n) {
    n = Math.round(n);
    if (!n) return;
    const st = S(), d = today(), before = level().L;
    st.xp += n; st.xpDays[d] = (st.xpDays[d] || 0) + n;
    if (!st.goalDays[d] && st.xpDays[d] >= st.settings.goal) {
      st.goalDays[d] = true; week().c.goals++;
      const s = streak();
      toasts.push({ kind: 'goal', text: `Daily goal met. ${s}-day streak.` });
      if (s > st.bestStreak) st.bestStreak = s;
      if (s % 7 === 0 && s > st.shieldAt && st.shields < shieldCap()) { st.shields++; st.shieldAt = s; toasts.push({ kind: 'shield', text: 'Seven days in a row: you earned a streak shield.' }); }
    }
    const after = level().L;
    if (after > before) {
      const r0 = rankInfo(before), r1 = rankInfo(after);
      toasts.push({ kind: 'level', text: r1.i > r0.i ? `Level ${after}: new rank, ${r1.title}.` : r1.grade !== r0.grade ? `Level ${after}: promoted to ${r1.title}.` : `Level ${after} reached.` });
      for (const L of LEVEL_REWARDS) if (L > before && L <= after && !st.levelRewards[L]) {
        st.levelRewards[L] = Date.now();
        if (st.shields < shieldCap(after)) { st.shields++; toasts.push({ kind: 'shield', text: `Level ${L} reward: a streak shield.` }); }
      }
      checkUnlocks();
    }
    questCheck();
  }

  // ---------- Answer XP ----------
  // Correct answers per unit today, reset at midnight.
  function unitDay() { const st = S(), d = today(); if (!st.unitDay || st.unitDay.d !== d) st.unitDay = { d, c: {} }; return st.unitDay.c; }
  const REP = c => c < 15 ? 1 : c < 30 ? 0.5 : 0.2;
  // XP for one answer, with the reasons for any reduction. review marks a due spaced review.
  function answerXP(sid, title, ok, review) {
    if (!ok) return { xp: 0, notes: [] };
    const notes = [], u = title ? unit(sid, title) : { stars: 0 }, due = review || (u.stars >= 2 && u.due && u.due <= today());
    let f = XP.right * mult(sid) * (title ? depth(sid, title) : 1);
    if (level().L > TIER_INFO[tier(sid)][2]) { f *= 0.5; notes.push(`half rate above level ${TIER_INFO[tier(sid)][2]} for ${TIER_INFO[tier(sid)][0].toLowerCase()} subjects`); }
    if (due) f *= 1.25;
    else if (u.stars < 2) f *= 1.25;
    else if (u.stars >= 3) { f *= 0.6; notes.push('reduced for a long-term unit outside its review'); }
    const c = title ? (unitDay()[sid + '|' + title] || 0) : 0, r = REP(c);
    if (r < 1) { f *= r; notes.push(`reduced after ${c} correct in this unit today`); }
    return { xp: Math.max(1, Math.round(f)), notes };
  }
  function awardAnswer(sid, title, ok, review) {
    const res = answerXP(sid, title, ok, review);
    if (ok && title) { const k = sid + '|' + title, c = unitDay(); c[k] = (c[k] || 0) + 1; }
    addXP(res.xp);
    return res;
  }
  // "Your turn" problems pay once each.
  function awardVary(sid, title, i) {
    const st = S(), k = `${sid}|${title}|${i}`;
    if (st.varyDone[k]) return 0;
    st.varyDone[k] = 1; const n = Math.round(XP.vary * effMult(sid)); addXP(n); return n;
  }
  // Timed activities: the first `free` runs each day pay in full, later runs a quarter.
  function activityXP(kind, base, free = 3) {
    const st = S(), d = today(); if (!st.actDay || st.actDay.d !== d) st.actDay = { d, c: {} };
    const c = st.actDay.c[kind] || 0; st.actDay.c[kind] = c + 1;
    const n = Math.round(base * (c < free ? 1 : 0.25)); addXP(n); return { xp: n, reduced: c >= free };
  }

  // ---------- Ranks ----------
  // Twenty-one named ranks, spread so that the prestigious titles come late; each rank but the last has grades I to III.
  const RANKS = [[1, 'Novice'], [4, 'Pupil'], [7, 'Student'], [10, 'Apprentice'], [14, 'Journeyman'], [18, 'Practitioner'], [23, 'Analyst'], [28, 'Theorist'],
    [34, 'Specialist'], [40, 'Expert'], [47, 'Virtuoso'], [54, 'Master'], [62, 'Senior master'], [70, 'Grandmaster'], [79, 'Scholar'], [88, 'Fellow'],
    [98, 'Luminary'], [110, 'Laureate'], [125, 'Polymath'], [140, 'Sage'], [160, 'Paragon']];
  // The rank at level L: name, grade (1 to 3, or 0 for the top rank), and the display title.
  function rankInfo(L = level().L) {
    const i = RANKS.filter(([l]) => L >= l).length - 1, [start, name] = RANKS[i], next = RANKS[i + 1];
    if (!next) return { i, name, grade: 0, title: name };
    const grade = 1 + Math.min(2, Math.floor(3 * (L - start) / (next[0] - start)));
    return { i, name, grade, title: `${name} ${['I', 'II', 'III'][grade - 1]}` };
  }
  const rank = (L = level().L) => rankInfo(L).title;
  const nextRank = (L = level().L) => RANKS.find(([l]) => l > L) || null;

  // ---------- Themes ----------
  // Light and dark themes are separate rewards, each with its own unlock condition.
  const LIGHT = { card: '#FCFDF9', graphite: '#59616F', ok: '#2E6A39', okBg: '#DCEAD4', no: '#B0271F', noBg: '#F5DDD7', blue: '#2D5A9A', red: '#B0271F', green: '#2E6A39', amber: '#B9781C', gold: '#C08A1E',
    blueBg: '#DCE6F3', amberBg: '#F6E7C8', goldBg: '#FBF4E2', heat: '#8A9AB3', teal: '#2F5D50', onAccent: '#FFFFFF', d: ['#FFFFFF', '#E6EEDC', '#CFE0C0', '#B5D1A2', '#97BF83', '#7AAA66'] };
  const DARK = { graphite: '#A3ADBB', ok: '#74C285', okBg: '#1F3A27', no: '#F08174', noBg: '#47231F', blue: '#86AEEA', red: '#F08174', green: '#74C285', amber: '#E3A84E', gold: '#DDAE45',
    blueBg: '#203250', amberBg: '#3E3120', goldBg: '#3A3020', heat: '#5F7392', teal: '#6FB39E', onAccent: '#11151B', d: ['#1A2028', '#1F3326', '#284530', '#33583B', '#3F6E47', '#4E8656'] };
  const THEMES = [
    { id: 'paper', name: 'Graph paper', mode: 'light', req: null, c: { paper: '#EEF2E6', paper2: '#F8FAF3', grid: '#DCE4D1', gridMajor: '#C9D5BA', rule: '#B4C0A3', ink: '#1E2A44' } },
    { id: 'blueprint', name: 'Blueprint', mode: 'light', req: ['level', 5], c: { paper: '#E6EEF5', paper2: '#F4F8FB', card: '#FAFCFE', grid: '#D2DEEA', gridMajor: '#B9CBDD', rule: '#A6BACE', ink: '#17304F' } },
    { id: 'ledger', name: 'Ledger', mode: 'light', req: ['level', 12], c: { paper: '#F3EEDF', paper2: '#FBF8EE', card: '#FEFCF6', grid: '#E6DEC6', gridMajor: '#D6CAA6', rule: '#C4B58C', ink: '#2C2A20' } },
    { id: 'slate', name: 'Slate', mode: 'light', req: ['level', 20], c: { paper: '#E8E9EC', paper2: '#F6F6F8', card: '#FCFCFD', grid: '#D9DBE0', gridMajor: '#C4C7CF', rule: '#ADB1BB', ink: '#1F2430' } },
    { id: 'sand', name: 'Sandstone', mode: 'light', req: ['level', 30], c: { paper: '#F2E9E4', paper2: '#FBF6F3', card: '#FEFBF9', grid: '#E6D8D0', gridMajor: '#D6C1B5', rule: '#C4A99B', ink: '#3A2430' } },
    { id: 'mint', name: 'Engineering pad', mode: 'light', req: ['path', 1], c: { paper: '#E6F1EC', paper2: '#F4FAF7', card: '#FBFEFC', grid: '#D1E4DA', gridMajor: '#B5D2C4', rule: '#9CBFAF', ink: '#163A32' } },
    { id: 'vellum', name: 'Vellum', mode: 'light', req: ['reviews', 50], c: { paper: '#F4F1EA', paper2: '#FCFBF7', card: '#FFFEFB', grid: '#E8E2D4', gridMajor: '#D8CFBB', rule: '#C2B79E', ink: '#262321' } },
    { id: 'rose', name: 'Rose quartz', mode: 'light', req: ['streak', 30], c: { paper: '#F3E8EC', paper2: '#FBF5F7', card: '#FEFAFB', grid: '#E8D6DD', gridMajor: '#D9BCC8', rule: '#C6A0B0', ink: '#3A1F2B' } },
    { id: 'night', name: 'Night graph', mode: 'dark', req: ['level', 3], c: { paper: '#141A22', paper2: '#1A222C', card: '#1F2833', grid: '#222C38', gridMajor: '#2D3947', rule: '#3B4858', ink: '#E3E8EF' } },
    { id: 'chalk', name: 'Chalkboard', mode: 'dark', req: ['streak', 7], c: { paper: '#1A2922', paper2: '#203229', card: '#25392F', grid: '#283D32', gridMajor: '#344E40', rule: '#45624F', ink: '#E9F0E6', graphite: '#A6B8A9' } },
    { id: 'midnight', name: 'Midnight blueprint', mode: 'dark', req: ['level', 25], c: { paper: '#0F1C32', paper2: '#14243E', card: '#182A47', grid: '#1B2F4E', gridMajor: '#253F64', rule: '#335078', ink: '#DCE8F7', graphite: '#95AAC6' } },
    { id: 'terminal', name: 'Terminal', mode: 'dark', req: ['group', 10, 'C++'], c: { paper: '#0D110F', paper2: '#131916', card: '#171E1A', grid: '#19211D', gridMajor: '#232F28', rule: '#2F3E36', ink: '#D5F4E2', graphite: '#8FB4A0' } },
    { id: 'observatory', name: 'Observatory', mode: 'dark', req: ['group', 10, 'Physics'], c: { paper: '#16132A', paper2: '#1D1934', card: '#221E3C', grid: '#241F40', gridMajor: '#302A52', rule: '#3F3766', ink: '#E6E1F7', graphite: '#A8A1C6' } },
    { id: 'obsidian', name: 'Obsidian', mode: 'dark', req: ['group', 10, 'Pure math'], c: { paper: '#000000', paper2: '#0A0A0B', card: '#111113', grid: '#141416', gridMajor: '#1F1F22', rule: '#2E2E33', ink: '#F2F2F2', graphite: '#A0A0A6' } },
    { id: 'graphite', name: 'Graphite', mode: 'dark', req: ['level', 40], c: { paper: '#1C1C1E', paper2: '#232325', card: '#29292C', grid: '#2B2B2F', gridMajor: '#39393E', rule: '#4A4A50', ink: '#ECECEE', graphite: '#A4A4AB' } },
    { id: 'ember', name: 'Ember', mode: 'dark', req: ['units', 100], c: { paper: '#1F1514', paper2: '#271B19', card: '#2D201E', grid: '#2E2120', gridMajor: '#3D2C2A', rule: '#503A36', ink: '#F2E4E0', graphite: '#BAA6A1' } }
  ];
  const mastered = ids => Object.entries(S().units).filter(([k, u]) => u.stars >= 2 && (!ids || ids.includes(k.slice(0, k.indexOf('|'))))).length;
  function reqMet(req) {
    if (!req) return true;
    const st = S(), [kind, n, g] = req;
    if (kind === 'level') return level().L >= n;
    if (kind === 'streak') return st.bestStreak >= n;
    if (kind === 'reviews') return st.counters.reviews >= n;
    if (kind === 'units') return mastered() >= n;
    if (kind === 'group') return mastered((GROUPS.find(x => x.name === g) || { ids: [] }).ids) >= n;
    if (kind === 'path') return !!(window.SUBJECTS && SUBJECTS.some(s => s.learn.length && s.learn.every(c => Game.complete(s.id, c))));
    return false;
  }
  function reqText(req) {
    if (!req) return 'Free';
    const [kind, n, g] = req;
    return { level: `Reach level ${n}`, streak: `Reach a ${n}-day streak`, reviews: `Pass ${n} spaced reviews`, units: `Master ${n} units`, group: `Master ${n} units in ${g}`, path: 'Complete a whole subject' }[kind];
  }
  const owned = id => !!(S().themesOwned || {})[id];
  const themeOpen = id => owned(id);
  function palette(id) {
    const t = THEMES.find(x => x.id === id) || THEMES[0];
    return Object.assign({ mode: t.mode }, t.mode === 'dark' ? DARK : LIGHT, t.c);
  }
  // Themes are kept once earned. Older saves keep every theme their level reached under the previous level curve.
  function migrateThemes(st) {
    st.themesOwned = { paper: 1 };
    const oldL = (() => { let L = 1; while (50 * (L + 1) * L <= st.xp) L++; return L; })(), old = { blueprint: 4, ledger: 8, slate: 12, sand: 16 };
    for (const [id, L] of Object.entries(old)) if (oldL >= L) st.themesOwned[id] = 1;
    if (st.settings.theme) st.themesOwned[st.settings.theme] = 1;
    for (const t of THEMES) if (reqMet(t.req)) st.themesOwned[t.id] = 1;
  }
  function checkUnlocks() {
    const st = S(); if (!st.themesOwned) return;
    for (const t of THEMES) if (!st.themesOwned[t.id] && reqMet(t.req)) { st.themesOwned[t.id] = Date.now(); toasts.push({ kind: 'badge', text: `New ${t.mode} theme unlocked: ${t.name}.` }); }
  }

  // ---------- Weekly quests ----------
  const weekKey = () => { const d = new Date(), dow = (d.getDay() + 6) % 7; return addDays(today(), -dow); };
  function week() {
    const st = S(), k = weekKey();
    if (!st.week || st.week.key !== k) st.week = { key: k, c: { answers: 0, masters: 0, reviews: 0, goals: 0, sprint: 0, lessons: 0, subjects: [], hard: 0 }, done: {}, bonus: false };
    st.week.c.hard = st.week.c.hard || 0;
    return st.week;
  }
  const QUESTS = [
    ['answers', n => `Answer ${n} problems correctly`, [60, 100, 150], c => c.answers], ['masters', n => `Master ${n} units`, [2, 3, 4], c => c.masters],
    ['reviews', n => `Pass ${n} spaced reviews`, [2, 4, 6], c => c.reviews], ['goals', n => `Meet your daily goal on ${n} days`, [3, 4, 5], c => c.goals],
    ['sprint', n => `Score ${n} in one fluency sprint`, [15, 20, 25], c => c.sprint], ['lessons', n => `Finish ${n} lessons`, [2, 3, 5], c => c.lessons],
    ['subjects', n => `Practice in ${n} different subjects`, [2, 3, 4], c => c.subjects.length],
    ['hard', n => `Answer ${n} problems correctly in advanced or graduate subjects`, [20, 40, 60], c => c.hard]];
  function quests() {
    const w = week(); let h = 0; for (const ch of w.key) h = (h * 31 + ch.charCodeAt(0)) % 9973;
    const units = Object.entries(S().units), hasMastered = units.some(([, u]) => u.stars >= 2), hasHard = units.some(([k, u]) => u.stars >= 1 && tier(k.slice(0, k.indexOf('|'))) >= 4);
    const pool = QUESTS.filter(q => (q[0] !== 'reviews' || hasMastered) && (q[0] !== 'hard' || hasHard)), out = [];
    while (out.length < 3) { const q = pool[h % pool.length]; if (!out.includes(q)) out.push(q); h = (h * 7 + 3) % 9973; }
    return out.map(([id, text, sizes, get]) => { const goal = sizes[h % sizes.length], have = Math.min(goal, get(w.c)); h = (h * 5 + 1) % 9973; return { id, text: text(goal), goal, have, done: have >= goal }; });
  }
  let questBusy = false;
  function questCheck() {
    if (questBusy) return; questBusy = true;
    const w = week(), qs = quests(), st = S(), q1 = questXP();
    for (const q of qs) if (q.done && !w.done[q.id]) { w.done[q.id] = true; toasts.push({ kind: 'goal', text: `Weekly quest complete: ${q.text}. +${q1} XP` }); addXP(q1); }
    if (!w.bonus && qs.every(q => q.done)) { w.bonus = true; st.perfectWeeks = (st.perfectWeeks || 0) + 1; toasts.push({ kind: 'badge', text: `All three weekly quests done. +${2 * q1} XP` }); addXP(2 * q1); }
    questBusy = false;
  }
  function noteAnswer(sid, ok) { const w = week(); if (ok) { w.c.answers++; if (tier(sid) >= 4) w.c.hard++; } if (!w.c.subjects.includes(sid)) w.c.subjects.push(sid); questCheck(); }

  // ---------- Memory strength ----------
  // 100% while a unit's review is not yet due; it fades the longer a due review waits.
  function memory(ids) {
    const t = today(), vals = [];
    for (const [k, u] of Object.entries(S().units)) {
      if (u.stars < 2 || !u.due || (ids && !ids.includes(k.slice(0, k.indexOf('|'))))) continue;
      if (u.due > t) { vals.push(1); continue; }
      const [y1, m1, d1] = u.due.split('-').map(Number), [y2, m2, d2] = t.split('-').map(Number), over = Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / DAY);
      vals.push(0.9 * Math.exp(-over / ((INTERVALS[u.box || 0] || 1) + 2)));
    }
    return vals.length ? Math.round(100 * vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  }

  // ---------- Certificates ----------
  // One course certificate per group, plus the older course names kept for saves that earned them.
  const COURSES = GROUPS.map(g => [g.name, g.ids]);
  function checkCerts() {
    const st = S(); st.certs = st.certs || {};
    const done = sid => { const s = SUBJECTS.find(x => x.id === sid); return s && s.learn.every(c => Game.complete(sid, c)); };
    for (const s of SUBJECTS) if (!st.certs[s.id] && done(s.id)) { st.certs[s.id] = Date.now(); toasts.push({ kind: 'badge', text: `Certificate earned: ${s.name}.` }); }
    for (const [name, ids] of COURSES) if (!st.certs[name] && ids.every(done)) { st.certs[name] = Date.now(); toasts.push({ kind: 'badge', text: `Course certificate earned: ${name}.` }); }
  }

  // ---------- Units ----------
  const ukey = (sid, title) => sid + '|' + title;
  const unit = (sid, title) => S().units[ukey(sid, title)] || { stars: 0 };
  const upd = (sid, title) => (S().units[ukey(sid, title)] = S().units[ukey(sid, title)] || { stars: 0 });
  function completeLesson(sid, title) {
    const u = upd(sid, title);
    if (!u.lesson) { u.lesson = Date.now(); u.stars = Math.max(u.stars, 1); S().counters.lessons++; week().c.lessons++; addXP(XP.lesson * effMult(sid)); questCheck(); }
    Store.save();
  }
  const passMark = n => Math.ceil(0.8 * n);
  function checkResult(sid, title, right, n) {
    const u0 = unit(sid, title);
    if (u0.stars >= 2) {
      if (u0.due && u0.due <= today()) return reviewResult(sid, title, right, n).pass;
      return n > 0 && right >= passMark(n);
    }
    const u = upd(sid, title), pass = n > 0 && right >= passMark(n);
    if (pass) {
      const first = u.stars < 2;
      u.stars = Math.max(u.stars, 2); u.lesson = u.lesson || Date.now();
      if (first) { u.mastered = Date.now(); u.box = 0; u.due = addDays(today(), INTERVALS[0]); week().c.masters++; addXP(XP.master * effMult(sid) * depth(sid, title)); questCheck(); checkUnlocks(); }
    }
    Store.save();
    return pass;
  }
  function reviewResult(sid, title, right, n) {
    const u = upd(sid, title), pass = n <= 2 ? right === n : right >= passMark(n);
    if (pass) {
      u.box = Math.min((u.box || 0) + 1, INTERVALS.length - 1);
      u.due = addDays(today(), INTERVALS[u.box]);
      if (u.box >= 2) u.stars = 3;
      S().counters.reviews++; week().c.reviews++; addXP(XP.review * effMult(sid)); questCheck(); checkUnlocks();
    } else {
      u.box = right ? (u.box || 0) : 0;
      u.due = addDays(today(), 1);
    }
    Store.save();
    return { pass, next: u.due };
  }
  function dueUnits() {
    const t = today(), out = [];
    for (const [k, u] of Object.entries(S().units)) if (u.stars >= 2 && u.due && u.due <= t) { const i = k.indexOf('|'); out.push({ sid: k.slice(0, i), title: k.slice(i + 1), due: u.due }); }
    return out.sort((a, b) => (a.due < b.due ? -1 : 1));
  }

  // ---------- Sprints ----------
  function sprintResult(deck, right, sid) {
    const st = S(), prev = st.sprints[deck] || 0, best = right > prev;
    if (best) st.sprints[deck] = right;
    if (right > st.counters.sprintBest) st.counters.sprintBest = right;
    const w = week(); if (right > w.c.sprint) w.c.sprint = right;
    const xp = activityXP('sprint', right * XP.sprint * effMult(sid)); Store.save();
    return { best, prev, xp: xp.xp, reduced: xp.reduced };
  }

  // ---------- Badges ----------
  const total = st => Object.values(st.subj).reduce((a, r) => a + r.c, 0);
  const groupsMastered = st => GROUPS.filter(g => Object.entries(st.units).some(([k, u]) => u.stars >= 2 && g.ids.includes(k.slice(0, k.indexOf('|'))))).length;
  const BADGES = [
    ['first-lesson', 'First lesson', 'Finish a lesson.', st => st.counters.lessons >= 1],
    ['first-master', 'Mastery', 'Pass your first mastery check.', () => mastered() >= 1],
    ['master-10', 'Ten units', 'Master 10 units.', () => mastered() >= 10],
    ['master-50', 'Fifty units', 'Master 50 units.', () => mastered() >= 50],
    ['master-150', 'Deep bench', 'Master 150 units.', () => mastered() >= 150],
    ['master-300', 'Encyclopedic', 'Master 300 units.', () => mastered() >= 300],
    ['retained', 'Long-term memory', 'Earn a third star by passing two spaced reviews.', st => Object.values(st.units).some(u => u.stars >= 3)],
    ['reviews-10', 'Spaced out', 'Pass 10 spaced reviews.', st => st.counters.reviews >= 10],
    ['reviews-100', 'Retention', 'Pass 100 spaced reviews.', st => st.counters.reviews >= 100],
    ['reviews-500', 'Total recall', 'Pass 500 spaced reviews.', st => st.counters.reviews >= 500],
    ['goal', 'On target', 'Meet your daily goal.', st => Object.keys(st.goalDays).length >= 1],
    ['streak-3', 'Three in a row', 'Reach a 3-day streak.', st => st.bestStreak >= 3],
    ['streak-7', 'Full week', 'Reach a 7-day streak.', st => st.bestStreak >= 7],
    ['streak-30', 'Habit', 'Reach a 30-day streak.', st => st.bestStreak >= 30],
    ['streak-100', 'Discipline', 'Reach a 100-day streak.', st => st.bestStreak >= 100],
    ['streak-365', 'Year round', 'Reach a 365-day streak.', st => st.bestStreak >= 365],
    ['perfect', 'Clean sheet', 'Get every problem right in a set of five or more.', st => st.counters.perfect >= 1],
    ['sprint-20', 'Quick recall', 'Answer 20 correctly in one sprint.', st => st.counters.sprintBest >= 20],
    ['sprint-35', 'Instant recall', 'Answer 35 correctly in one sprint.', st => st.counters.sprintBest >= 35],
    ['comeback', 'Comeback', 'Fix ten problems you had missed.', st => st.counters.fixed >= 10],
    ['problems-100', 'Hundred', 'Answer 100 problems correctly.', st => total(st) >= 100],
    ['problems-1000', 'Thousand', 'Answer 1,000 problems correctly.', st => total(st) >= 1000],
    ['problems-5000', 'Five thousand', 'Answer 5,000 problems correctly.', st => total(st) >= 5000],
    ['problems-10000', 'Ten thousand', 'Answer 10,000 problems correctly.', st => total(st) >= 10000],
    ['explorer', 'Explorer', 'Practice in five subjects.', st => Object.keys(st.subj).length >= 5],
    ['crossover', 'Crossover', 'Master a unit in five different groups.', st => groupsMastered(st) >= 5],
    ['advanced', 'Advanced', 'Master a unit in an advanced subject.', st => Object.entries(st.units).some(([k, u]) => u.stars >= 2 && tier(k.slice(0, k.indexOf('|'))) >= 4)],
    ['graduate', 'Deep end', 'Master a unit in a graduate subject.', st => Object.entries(st.units).some(([k, u]) => u.stars >= 2 && tier(k.slice(0, k.indexOf('|'))) >= 5)],
    ['rigor', 'Rigor', 'Complete every unit of an advanced or graduate subject.', () => SUBJECTS.some(s => tier(s.id) >= 4 && s.learn.every(c => Game.complete(s.id, c)))],
    ['perfect-week', 'Perfect week', 'Finish all three weekly quests.', st => (st.perfectWeeks || 0) >= 1],
    ['path', 'Path complete', 'Complete every unit in one subject.', () => SUBJECTS.some(s => s.learn && s.learn.every(c => Game.complete(s.id, c)))],
    ['course', 'Certified', 'Earn a course certificate for a whole group.', st => GROUPS.some(g => (st.certs || {})[g.name])],
    ['themes-8', 'Collector', 'Own eight themes.', st => Object.keys(st.themesOwned || {}).length >= 8],
    ['themes-all', 'Full palette', 'Own every theme.', st => THEMES.every(t => (st.themesOwned || {})[t.id])],
    ['rank-specialist', 'Specialist', 'Reach the rank of Specialist (level 34).', () => level().L >= 34],
    ['rank-master', 'Master', 'Reach the rank of Master (level 54).', () => level().L >= 54],
    ['rank-grandmaster', 'Grandmaster', 'Reach the rank of Grandmaster (level 70).', () => level().L >= 70],
    ['level-100', 'Centurion', 'Reach level 100.', () => level().L >= 100],
    ['rank-paragon', 'Paragon', 'Reach the top rank, Paragon (level 160).', () => level().L >= 160]
  ];
  function checkBadges() {
    const st = S(); let got = false; checkCerts(); checkUnlocks();
    for (const [id, name, , test] of BADGES) if (!st.badges[id] && test(st)) { st.badges[id] = Date.now(); toasts.push({ kind: 'badge', text: `Badge earned: ${name}.` }); got = true; }
    if (got) { checkUnlocks(); Store.save(); }
  }

  // ---------- Native reminder state ----------
  function syncNative() {
    if (!window.AndroidStore) return;
    const st = S(), s = streak(), due = dueUnits().length, met = st.goalDays[today()];
    const text = due ? `${due} review${due === 1 ? '' : 's'} due today.${s ? ` Keep your ${s}-day streak going.` : ''}`
      : s ? `Keep your ${s}-day streak going: today's goal is ${st.settings.goal} XP.` : 'Ten minutes of practice today. Your next lesson is ready.';
    try { window.AndroidStore.set('reminder.state', JSON.stringify({ met: met ? today() : '', text })); } catch (e) { /* bridge unavailable */ }
  }
  const save0 = Store.save;
  Store.save = () => { save0(); syncNative(); };

  return {
    init, XP, today, addDays, streak, level, need, span, xpToday, addXP, unit, completeLesson, checkResult, reviewResult, dueUnits,
    rank, rankInfo, nextRank, RANKS, THEMES, themeOpen, reqText, palette, checkUnlocks, quests, questXP, week, noteAnswer, memory, COURSES, GROUPS,
    TIER_INFO, tier, tierName, mult, effMult, answerXP, awardAnswer, awardVary, activityXP, shieldCap, LEVEL_REWARDS,
    sprintResult, BADGES, checkBadges, passMark, INTERVALS,
    popToasts: () => toasts.splice(0),
    // Set by the app once the item index exists.
    complete: () => false
  };
})();
