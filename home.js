/* Landing page as a playable page (see home.css).
   Scrolling is playback: every [data-ch] chapter carries a timecode (data-t,
   seconds) and the scroll position is mapped piecewise-linearly onto a 24:00
   "episode". The player bar shows it; marks the visitor drops live only in
   this browser's localStorage — nothing is sent anywhere (the site, like the
   app, makes no network calls of its own). Copy comes from #em-cfg so the EN
   and zh pages share this file. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var cfgEl = doc.getElementById('em-cfg');
  if (!cfgEl) return;
  var S = JSON.parse(cfgEl.textContent);
  var TOTAL = S.total || 1440;
  var KEY = 'earmemo.site.' + S.key;
  var mqPhone = window.matchMedia('(max-width: 820px)');
  var mqWide = window.matchMedia('(min-width: 1280px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (id) { return doc.getElementById(id); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var tpl = function (s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); };
  function fmt(t) {
    t = Math.max(0, Math.round(t));
    var m = Math.floor(t / 60), s = t % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  // Same shape as NoteExporter.formatTime in the app ("4:32").
  function fmtApp(t) {
    t = Math.max(0, Math.round(t));
    var s = t % 60;
    return Math.floor(t / 60) + ':' + (s < 10 ? '0' : '') + s;
  }
  function parseTc(str) {
    var m = /^(\d{1,3}):(\d{2})$/.exec(str || '');
    return m ? clamp(+m[1] * 60 + +m[2], 0, TOTAL) : null;
  }
  function el(tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- storage (per-viewer convenience only) ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var saved = load();
  var st = {
    time: 0,
    marks: (Array.isArray(saved.marks) ? saved.marks : []).filter(function (m) {
      return m && typeof m.t === 'number' && m.t >= 0 && m.t <= TOTAL;
    }).map(function (m) { return { id: m.id || Math.random(), t: m.t, text: String(m.text || '') }; }),
    fast: false,
    drawer: false,
    exporting: false,
    moved: false
  };
  var drawerPref = saved.drawer;
  var saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try {
        var data = { marks: st.marks, drawer: drawerPref };
        data.last = st.moved ? st.time : saved.last;
        localStorage.setItem(KEY, JSON.stringify(data));
      } catch (e) { /* private mode etc. — the page works without it */ }
    }, 250);
  }

  /* ---------- chapters ---------- */
  var secs = [].slice.call(doc.querySelectorAll('[data-ch]'));
  var CH = secs.map(function (s) {
    return { id: s.getAttribute('data-ch'), t: +s.getAttribute('data-t'), name: s.getAttribute('data-name'), note: s.getAttribute('data-note') || '' };
  });
  var noted = CH.filter(function (c) { return c.note; });
  var header = doc.querySelector('.site-header');
  function headH() { return header ? header.offsetHeight : 0; }
  function tops() { return secs.map(function (s) { return s.getBoundingClientRect().top + window.scrollY; }); }
  function maxY() { return Math.max(0, root.scrollHeight - window.innerHeight); }
  function chIndex(t) {
    var i = 0;
    for (var k = 0; k < CH.length; k++) if (CH[k].t <= t) i = k;
    return i;
  }
  function timeAt(sy) {
    var m = maxY();
    if (m > 0 && sy >= m - 2) return TOTAL;
    var T = tops(), y = sy + headH(), i = 0;
    for (var k = 0; k < T.length; k++) if (T[k] <= y + 1) i = k;
    var a = T[i], b = i + 1 < T.length ? T[i + 1] : m + headH();
    var ta = CH[i].t, tb = i + 1 < CH.length ? CH[i + 1].t : TOTAL;
    return ta + clamp((y - a) / Math.max(1, b - a), 0, 1) * (tb - ta);
  }
  function scrollToTime(t, instant) {
    var T = tops(), m = maxY(), i = chIndex(t);
    var a = T[i], b = i + 1 < T.length ? T[i + 1] : m + headH();
    var ta = CH[i].t, tb = i + 1 < CH.length ? CH[i + 1].t : TOTAL;
    var y = a + ((t - ta) / Math.max(1, tb - ta)) * (b - a) - headH();
    if (t >= TOTAL) y = m;
    window.scrollTo({ top: clamp(y, 0, m), behavior: instant || reduceMotion ? 'auto' : 'smooth' });
  }

  /* ---------- elements ---------- */
  var bar = $('p-bar'), fill = $('p-fill'), head = $('p-head'), barMarks = $('p-marks');
  var drawer = $('drawer'), scrim = $('scrim'), exportBox = $('export'), notesBtn = $('p-notes');
  var toastEl = $('toast'), resumeEl = $('resume');

  /* ---------- player bar ---------- */
  var last = {};
  function setText(id, v) {
    if (last[id] === v) return;
    last[id] = v;
    var n = $(id);
    if (n) n.textContent = v;
  }
  function renderPlayer() {
    var t = st.time, ci = chIndex(t), cur = CH[ci];
    var pct = (Math.min(TOTAL, t) / TOTAL * 100).toFixed(2) + '%';
    if (last.pct !== pct) { last.pct = pct; fill.style.width = pct; head.style.left = pct; }
    setText('p-cur', fmt(t));
    setText('p-rem', '-' + fmt((TOTAL - t) / (st.fast ? 2 : 1)));
    setText('p-sub-d', tpl(S.chapter, { n: ci + 1, name: cur.name }));
    setText('p-title-m', cur.name);
    setText('p-sub-m', fmt(t) + ' / ' + fmt(TOTAL));
    bar.setAttribute('aria-valuenow', String(Math.round(t)));
    bar.setAttribute('aria-valuetext', fmt(t) + ' · ' + cur.name);
    if (last.ch !== cur.id) {
      last.ch = cur.id;
      [].forEach.call(doc.querySelectorAll('.nrow'), function (r) {
        r.classList.toggle('on', r.getAttribute('data-id') === cur.id);
      });
    }
  }
  function sync() {
    var t = Math.round(timeAt(window.scrollY));
    if (t !== st.time) { st.time = t; if (st.moved) save(); }
    renderPlayer();
  }
  // Scroll events already arrive at most once per frame; sync() only reads
  // 11 section rects and writes a few changed text nodes.
  window.addEventListener('scroll', function () {
    if (!st.moved && window.scrollY > 0) st.moved = true;
    if (resumeEl && !resumeEl.hidden && window.scrollY > 320) hideResume();
    sync();
  }, { passive: true });
  window.addEventListener('resize', function () {
    if (mqPhone.matches && st.drawer && !st.sheetByUser) setDrawer(false);
    applyDrawerLayout();
    sync();
  });

  // Author marks on the bar (fixed), then the visitor's.
  noted.forEach(function (c) {
    var d = el('span', 'am');
    d.style.left = (c.t / TOTAL * 100).toFixed(2) + '%';
    barMarks.appendChild(d);
  });

  // Seek: tap anywhere on the bar; drag to scrub.
  var dragging = false, downX = 0;
  function seekAt(clientX, instant) {
    var r = bar.getBoundingClientRect();
    scrollToTime(clamp((clientX - r.left) / r.width, 0, 1) * TOTAL, instant);
  }
  bar.addEventListener('pointerdown', function (e) {
    dragging = true; downX = e.clientX;
    try { bar.setPointerCapture(e.pointerId); } catch (err) {}
    seekAt(e.clientX, false);
  });
  bar.addEventListener('pointermove', function (e) {
    if (dragging && Math.abs(e.clientX - downX) > 3) seekAt(e.clientX, true);
  });
  ['pointerup', 'pointercancel'].forEach(function (ev) { bar.addEventListener(ev, function () { dragging = false; }); });
  bar.addEventListener('keydown', function (e) {
    var t = st.time, ci = chIndex(t), to = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') to = t + 15;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') to = t - 15;
    else if (e.key === 'PageDown') to = ci + 1 < CH.length ? CH[ci + 1].t : TOTAL;
    else if (e.key === 'PageUp') to = t - CH[ci].t > 3 ? CH[ci].t : CH[Math.max(0, ci - 1)].t;
    else if (e.key === 'Home') to = 0;
    else if (e.key === 'End') to = TOTAL;
    if (to === null) return;
    e.preventDefault();
    scrollToTime(clamp(to, 0, TOTAL), true);
  });

  /* ---------- toast ---------- */
  var toastTimer = null;
  function flash(msg) {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.hidden = false;
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2600);
  }

  /* ---------- 2× skim ---------- */
  var speedBtn = $('p-speed');
  speedBtn.addEventListener('click', function () {
    var t = st.time;
    st.fast = !st.fast;
    root.classList.toggle('x2', st.fast);
    speedBtn.setAttribute('aria-pressed', String(st.fast));
    speedBtn.textContent = st.fast ? S.speedFast : S.speedSlow;
    flash(st.fast ? S.speedOnToast : S.speedOffToast);
    setTimeout(function () { if (t > 0) scrollToTime(t, true); sync(); }, 0);
  });

  /* ---------- notes drawer / sheet ---------- */
  function applyDrawerLayout() {
    root.classList.toggle('drawer-open', st.drawer && mqWide.matches);
    scrim.hidden = !(st.drawer && mqPhone.matches);
  }
  function setDrawer(on, byUser) {
    if (on === st.drawer) return;
    var t = st.time, pushes = mqWide.matches;
    st.drawer = on;
    st.sheetByUser = !!byUser;
    drawer.hidden = !on;
    if (!on) setExport(false);
    notesBtn.setAttribute('aria-expanded', String(on));
    applyDrawerLayout();
    if (byUser && !mqPhone.matches) { drawerPref = on; save(); }
    if (on && mqPhone.matches) drawer.focus({ preventScroll: true });
    if (!on && byUser && drawer.contains(doc.activeElement)) notesBtn.focus({ preventScroll: true });
    // Opening the drawer on a wide screen reflows the page; keep the listener's place.
    if (pushes && t > 0) setTimeout(function () { scrollToTime(t, true); }, 230);
  }
  notesBtn.addEventListener('click', function () { setDrawer(!st.drawer, true); });
  $('d-x').addEventListener('click', function () { setDrawer(false, true); });
  scrim.addEventListener('click', function () { setDrawer(false, true); });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (st.exporting) setExport(false);
    else if (st.drawer && mqPhone.matches) setDrawer(false, true);
  });

  // Author notes: static rows, rendered once.
  var dNotes = $('d-notes');
  noted.forEach(function (c) {
    var row = el('button', 'nrow');
    row.type = 'button';
    row.setAttribute('data-id', c.id);
    var meta = el('span', 'n-meta');
    meta.appendChild(el('i'));
    meta.appendChild(doc.createTextNode(fmt(c.t)));
    meta.appendChild(el('span', null, '· ' + c.name));
    row.appendChild(meta);
    row.appendChild(el('span', 'n-tx', c.note));
    row.addEventListener('click', function () {
      if (mqPhone.matches) setDrawer(false, true);
      scrollToTime(c.t);
    });
    dNotes.appendChild(row);
  });

  /* ---------- the visitor's marks ---------- */
  var dMarks = $('d-marks'), dEmpty = $('d-empty');
  function sortedMarks() { return st.marks.slice().sort(function (a, b) { return a.t - b.t; }); }
  function renderMarks() {
    var list = sortedMarks(), n = list.length;
    dMarks.textContent = '';
    dEmpty.hidden = n > 0;
    list.forEach(function (m) {
      var tc = fmt(m.t);
      var row = el('div', 'mrow');
      var go = el('button', 'm-go');
      go.type = 'button';
      go.setAttribute('aria-label', tpl(S.jumpTo, { t: tc }));
      go.appendChild(el('i'));
      go.appendChild(doc.createTextNode(tc));
      go.addEventListener('click', function () {
        if (mqPhone.matches) setDrawer(false, true);
        scrollToTime(m.t);
      });
      var input = el('input', 'm-tx');
      input.type = 'text';
      input.value = m.text;
      input.placeholder = S.markPlaceholder;
      input.setAttribute('aria-label', tpl(S.markLabel, { t: tc }));
      input.maxLength = 280;
      input.addEventListener('input', function () {
        m.text = input.value;
        save();
        if (st.exporting) renderExport();
      });
      var rm = el('button', 'm-rm');
      rm.type = 'button';
      rm.setAttribute('aria-label', S.removeMark);
      rm.innerHTML = '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#696A6D" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8"/></svg>';
      rm.addEventListener('click', function () {
        st.marks = st.marks.filter(function (x) { return x !== m; });
        save();
        renderAllMarks();
      });
      row.appendChild(go); row.appendChild(input); row.appendChild(rm);
      dMarks.appendChild(row);
    });
  }
  function renderBarMarks() {
    [].forEach.call(barMarks.querySelectorAll('.mm'), function (d) { d.remove(); });
    st.marks.forEach(function (m) {
      var d = el('span', 'mm');
      d.style.left = (m.t / TOTAL * 100).toFixed(2) + '%';
      barMarks.appendChild(d);
    });
  }
  function renderTally() {
    var n = st.marks.length, dots = $('tally-dots');
    dots.textContent = '';
    noted.forEach(function () { dots.appendChild(el('i')); });
    st.marks.forEach(function () { dots.appendChild(el('i', 'me')); });
    $('tally-line').textContent = n === 0 ? tpl(S.endNone, { a: noted.length }) : tpl(S.endSome, { n: n });
  }
  function renderCounts() {
    var n = st.marks.length;
    $('d-count').textContent = tpl(S.count, { a: noted.length, n: n });
    $('p-notes-n').textContent = String(noted.length + n);
    notesBtn.setAttribute('aria-label', tpl(S.notesLabel, { n: noted.length + n }));
  }
  function renderAllMarks() {
    renderMarks(); renderBarMarks(); renderTally(); renderCounts();
    if (st.exporting) renderExport();
  }
  function now() { sync(); return st.time; }
  function addMark() {
    var t = now();
    st.marks.push({ id: Date.now(), t: t, text: '' });
    save();
    renderAllMarks();
    if (!mqPhone.matches) setDrawer(true);
    flash(tpl(S.markedToast, { t: fmt(t) }));
  }
  [].forEach.call(doc.querySelectorAll('[data-act="mark"]'), function (b) { b.addEventListener('click', addMark); });

  /* ---------- Markdown export (same shape as the app's merged export) ---------- */
  function buildMd() {
    var items = noted.map(function (c) { return { t: c.t, title: c.name, body: c.note }; })
      .concat(st.marks.map(function (m) { return { t: m.t, title: '', body: m.text.trim() }; }))
      .sort(function (a, b) { return a.t - b.t; });
    var date = new Date().toLocaleString(S.locale, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    var md = '# ' + S.mdTitle + '\n\n' + tpl(S.mdCount, { n: items.length, date: date }) + '\n\n';
    md += '## ' + S.mdEpisode + '\n\n*' + S.mdAlbum + '*\n\n';
    items.forEach(function (it) {
      md += '### `' + fmtApp(it.t) + '`' + (it.title ? ' — ' + it.title : '') + '\n\n';
      if (it.body) md += it.body + '\n\n';
    });
    return md;
  }
  function renderExport() { $('e-pre').textContent = buildMd(); }
  function setExport(on) {
    st.exporting = on;
    exportBox.hidden = !on;
    if (on) { renderExport(); $('e-x').focus({ preventScroll: true }); }
  }
  function openExport() { setDrawer(true, true); setExport(true); }
  [].forEach.call(doc.querySelectorAll('[data-act="export"]'), function (b) { b.addEventListener('click', openExport); });
  $('e-x').addEventListener('click', function () { setExport(false); });
  $('e-copy').addEventListener('click', function () {
    copy(buildMd(), S.mdCopied, null);
  });
  $('e-dl').addEventListener('click', function () {
    var blob = new Blob([buildMd()], { type: 'text/markdown;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = el('a');
    a.href = url; a.download = S.mdFile;
    doc.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });
  function copy(text, okMsg, failMsg) {
    var done = function () { flash(okMsg); };
    var fail = function () { if (failMsg) flash(failMsg); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fail);
    else fail();
  }

  /* ---------- link to this moment ---------- */
  $('p-link').addEventListener('click', function () {
    var url = S.base + '#t=' + fmt(now());
    var shown = url.replace(/^https?:\/\//, '');
    copy(url, tpl(S.linkCopied, { url: shown }), tpl(S.linkShown, { url: shown }));
  });

  /* ---------- anything with data-t jumps there ---------- */
  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-t]');
    if (!a || a.hasAttribute('data-ch')) return;
    var t = +a.getAttribute('data-t');
    if (isNaN(t)) return;
    e.preventDefault();
    scrollToTime(t);
  });

  /* ---------- resume card ---------- */
  function hideResume() { if (resumeEl) resumeEl.hidden = true; }
  function maybeResume() {
    var t = saved.last;
    if (!resumeEl || typeof t !== 'number' || t < 60 || t > TOTAL - 20) return;
    if (location.hash || window.scrollY > 100) return;
    var ci = chIndex(t);
    var v = $('r-v');
    v.textContent = '';
    v.appendChild(el('span', 'tc', fmt(t)));
    v.appendChild(doc.createTextNode(' · ' + CH[ci].name));
    var marks = sortedMarks();
    var rm = $('r-m');
    rm.hidden = marks.length === 0;
    rm.textContent = marks.length ? tpl(S.resumeMarks, { n: marks.length, list: marks.slice(0, 3).map(function (m) { return fmt(m.t); }).join(S.listSep) + (marks.length > 3 ? '…' : '') }) : '';
    resumeEl.hidden = false;
    $('r-go').addEventListener('click', function () { hideResume(); scrollToTime(t); });
    $('r-skip').addEventListener('click', hideResume);
  }

  /* ---------- deep link: #t=08:16 ---------- */
  function fromHash(instant) {
    var m = /^#t=(.+)$/.exec(location.hash);
    var t = m ? parseTc(decodeURIComponent(m[1])) : null;
    if (t !== null) scrollToTime(t, instant);
  }
  window.addEventListener('hashchange', function () { fromHash(false); });

  /* ---------- boot ---------- */
  var yr = $('year');
  if (yr) yr.textContent = new Date().getFullYear();
  renderAllMarks();
  // Open by default where it sits beside the page; stay closed if the viewer closed it before.
  if (mqWide.matches && drawerPref !== false) setDrawer(true);
  applyDrawerLayout();
  sync();
  window.addEventListener('load', function () {
    fromHash(true);
    setTimeout(function () { sync(); maybeResume(); }, 50);
  });
})();
