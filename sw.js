const CACHE_NAME = 'travel-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './背景圖.png',
  './TH flag.png',
  './bangkok_mrt_2025.png',
  './airplane.png',
  './hotel.png',
  './liti.png',
  './train.png',
  './ticket.png',
  './man.png',
  './shoppingbag.png',
  './note.png',
  './SOS.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果緩存有，就用緩存的（離線可用）
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );

});
