/* Landing page mini demo (index.html + zh/index.html, "Notes" section).
   A silent, simulated player: the playhead ticks forward while the card is on
   screen, "Mark" pins the current second, and tapping a timestamp jumps back.
   Nothing is stored or sent — reloading clears it. Copy comes from data-*
   attributes on [data-demo] so both locales share this file. The full
   page-as-audio experience lives on tour.html (home.js). */
(function () {
  'use strict';
  var doc = document;
  var yr = doc.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  var box = doc.querySelector('[data-demo]');
  if (!box) return;
  var D = box.dataset;
  var TOTAL = +D.total || 2520;
  var MAX_MARKS = 8;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var q = function (s) { return box.querySelector(s); };
  var bar = q('.demo-bar'), fill = q('.fill'), head = q('.head'), dots = q('.dots');
  var cur = q('.demo-cur'), pp = q('.demo-pp'), markBtn = q('.demo-mark'), list = q('.demo-list');

  function fmt(t) {
    t = Math.max(0, Math.round(t));
    var m = Math.floor(t / 60), s = t % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function el(tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var st = {
    t: +D.start || 0,
    playing: !reduceMotion,
    visible: false,
    dragging: false,
    marks: D.seedT ? [{ t: +D.seedT, text: D.seedTx || '' }] : []
  };

  var PLAY = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 2.2v9.6L11.5 7z" fill="currentColor"/></svg>';
  var PAUSE = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 2.5h2.4v9H3.5zM8.1 2.5h2.4v9H8.1z" fill="currentColor"/></svg>';
  function renderPP() {
    pp.innerHTML = st.playing ? PAUSE : PLAY;
    pp.setAttribute('aria-label', st.playing ? D.pause : D.play);
  }
  function renderHead() {
    var pct = (st.t / TOTAL * 100).toFixed(2) + '%';
    fill.style.width = pct;
    head.style.left = pct;
    cur.textContent = fmt(st.t);
  }
  function renderMarks() {
    dots.textContent = '';
    list.textContent = '';
    st.marks.slice().sort(function (a, b) { return a.t - b.t; }).forEach(function (m) {
      var d = el('span', 'dot');
      d.style.left = (m.t / TOTAL * 100).toFixed(2) + '%';
      dots.appendChild(d);

      var row = el('div', 'demo-mrow');
      var go = el('button', 'demo-go');
      go.type = 'button';
      go.setAttribute('aria-label', D.jump.replace('{t}', fmt(m.t)));
      go.appendChild(el('i'));
      go.appendChild(doc.createTextNode(fmt(m.t)));
      go.addEventListener('click', function () { st.t = m.t; renderHead(); });
      var input = el('input', 'demo-tx');
      input.type = 'text';
      input.value = m.text;
      input.placeholder = D.ph;
      input.maxLength = 140;
      input.setAttribute('aria-label', D.ph + ' · ' + fmt(m.t));
      input.addEventListener('input', function () { m.text = input.value; });
      m.input = input;
      var rm = el('button', 'demo-rm');
      rm.type = 'button';
      rm.setAttribute('aria-label', D.rm);
      rm.innerHTML = '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8"/></svg>';
      rm.addEventListener('click', function () {
        st.marks = st.marks.filter(function (x) { return x !== m; });
        renderMarks();
      });
      row.appendChild(go); row.appendChild(input); row.appendChild(rm);
      list.appendChild(row);
    });
    markBtn.disabled = st.marks.length >= MAX_MARKS;
  }

  markBtn.addEventListener('click', function () {
    var t = Math.round(st.t);
    if (st.marks.some(function (m) { return m.t === t; })) return;
    var m = { t: t, text: '' };
    st.marks.push(m);
    renderMarks();
    // Like the app: the mark is pinned and playback keeps going.
    // Focus only with a real pointer: on a phone it would pop the keyboard.
    if (m.input && finePointer) m.input.focus({ preventScroll: true });
  });
  pp.addEventListener('click', function () { st.playing = !st.playing; renderPP(); });
  // Seek: tap anywhere on the bar; drag to scrub (playhead holds while dragging).
  function seekAt(clientX) {
    var r = bar.getBoundingClientRect();
    st.t = Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * TOTAL;
    renderHead();
  }
  bar.addEventListener('pointerdown', function (e) {
    if (e.button > 0) return;
    st.dragging = true;
    bar.classList.add('is-drag');
    try { bar.setPointerCapture(e.pointerId); } catch (err) {}
    seekAt(e.clientX);
  });
  bar.addEventListener('pointermove', function (e) {
    if (st.dragging) seekAt(e.clientX);
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) {
    bar.addEventListener(ev, function () { st.dragging = false; bar.classList.remove('is-drag'); });
  });

  // Ten simulated seconds per real second, only while the card is on screen.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { st.visible = es[0].isIntersecting; }).observe(box);
  } else {
    st.visible = true;
  }
  setInterval(function () {
    if (!st.playing || !st.visible || st.dragging || doc.hidden) return;
    st.t = st.t + 1 >= TOTAL ? 0 : st.t + 1;
    renderHead();
  }, 100);

  renderPP();
  renderHead();
  renderMarks();
})();
