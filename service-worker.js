importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/pages/about.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/pages/schedules.html', revision: '1' },
  { url: '/pages/standings.html', revision: '1' },
  { url: '/pages/teams.html', revision: '1' },
  { url: '/detail.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/FAB.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/preloader.js', revision: '1' },
  { url: '/js/registerSw.js', revision: '1' },
  { url: '/js/requestApi.js', revision: '1' },
  { url: '/icon/icon.png', revision: '1' },
  { url: '/icon/icon-192.png', revision: '1' },
  { url: '/icon/icon-128.png', revision: '1' },
  { url: '/icon/icon-64.png', revision: '1' },
  { url: '/foto.png', revision: '1' }
],  {
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      })
    ]
  })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Hai PSport Lovers !';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});