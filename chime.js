/* The headphone section's "Play it" button: the same chime the app plays
   when a headphone press bookmarks (Sources/Player/MarkChime.swift — three
   notes, same envelope). Synthesized here; nothing is fetched, stored, or
   sent. Plays only on a click: the drawn earbud is pressed twice first, and
   the chime follows the second press, as on AirPods. */
(function () {
  var Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  var ctx;

  function chime(delay) {
    ctx = ctx || new Ctx();
    var rate = ctx.sampleRate;
    var notes = [[1318.5, 0.06], [1108.7, 0.06], [1760, 0.13]];
    var total = 0;
    notes.forEach(function (n) { total += Math.floor(rate * n[1]); });
    var buf = ctx.createBuffer(1, total, rate);
    var d = buf.getChannelData(0);
    var o = 0;
    notes.forEach(function (n) {
      var count = Math.floor(rate * n[1]);
      for (var i = 0; i < count; i++) {
        var t = i / rate;
        var attack = Math.min(1, t / 0.004);
        var release = Math.min(1, (count - i) / (rate * 0.005));
        d[o + i] = Math.sin(2 * Math.PI * n[0] * t) * attack * release * Math.exp(-t * 18) * 0.45;
      }
      o += count;
    });
    var src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(ctx.currentTime + delay);
  }

  document.querySelectorAll('.hp-chime').forEach(function (b) {
    b.addEventListener('click', function () {
      var buds = b.closest('section').querySelector('.hp-buds');
      chime(buds ? 0.42 : 0);
      [b, buds].forEach(function (el) {
        if (!el) return;
        var cls = el === b ? 'ring' : 'press';
        el.classList.remove(cls);
        void el.getBoundingClientRect();
        el.classList.add(cls);
      });
    });
  });
})();
