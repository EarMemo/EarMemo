/* The headphone section's "Play it" button: the same chime the app plays
   when a headphone press bookmarks (Sources/Player/MarkChime.swift — three
   notes, same envelope). Synthesized here; nothing is fetched, stored, or
   sent. Plays only on a click. */
(function () {
  var Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  var ctx;

  function chime() {
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
    src.start();
  }

  document.querySelectorAll('.hp-chime').forEach(function (b) {
    b.addEventListener('click', function () {
      chime();
      b.classList.remove('ring');
      void b.offsetWidth;
      b.classList.add('ring');
    });
  });
})();
