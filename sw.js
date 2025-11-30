const CACHE_NAME = 'travel-app-v31-update'; // 更新版本號

// 要快取的檔案清單
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './background.png',
  './pattern1.png',
  './TH flag.png',
  './icon.png',
  './icon-192.png',
  './bangkok_mrt_2025.png',
  './airplane.png',
  './airplane1.png',
  './hotel.png',
  './liti.png',
  './train.png',
  './man.png',
  './shoppingbag.png',
  './note.png',
  './SOS.png',
  './ticket.png',
  './map.png',
  './cloud.png',
  './cloud1.png',
  './star.png',
  './star1.png',
  './elephant.png',
  './elephant1.png',
  './elephant2.png',
  './cocotree.png',
  './coconut.png',
  './camera.png'
];

self.addEventListener('install', event => {
  // 強制立即啟用新的 Service Worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // 清除舊版本的快取
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
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