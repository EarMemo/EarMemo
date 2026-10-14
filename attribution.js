/* Source-only App Store campaign attribution. No cookies, storage or beacons. */
(function () {
  'use strict';
  var source = new URL(window.location.href).searchParams.get('utm_source');
  var fromChatGPT = source && source.toLowerCase() === 'chatgpt.com';
  if (!fromChatGPT && document.referrer) {
    try {
      var host = new URL(document.referrer).hostname.toLowerCase();
      fromChatGPT = host === 'chatgpt.com' || host.endsWith('.chatgpt.com');
    } catch (_) {
      return;
    }
  }
  if (!fromChatGPT) return;

  document.querySelectorAll('a[href*="apps.apple.com/"]').forEach(function (anchor) {
    var url = new URL(anchor.href);
    if (url.hostname !== 'apps.apple.com' ||
        !url.pathname.includes('id6771007097') ||
        url.searchParams.get('pt') !== '128926686') return;
    url.searchParams.set('ct', 'site_chatgpt');
    anchor.href = url.toString();
  });
}());
