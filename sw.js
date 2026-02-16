const CACHE_NAME = 'travel-app-v20-final'; // 版本號，若有更新圖片建議修改此處

// 這裡列出所有需要被存到手機裡的檔案
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  
  // 核心圖片
  './背景圖.png',
  './TH flag.png',
  './bangkok_mrt_2025.png',
  './icon.png',       // 大圖示 (512x512)
  './icon-192.png',   // 小圖示 (192x192)
  
  // 底部導航圖示
  './airplane.png',
  './hotel.png',
  './liti.png',
  './train.png',
  './man.png',
  './shoppingbag.png',
  './note.png',
  './SOS.png',
  './ticket.png',     // 新增的票券圖示
  
  // 裝飾與動畫圖片
  './airplane1.png',  // 開場飛機
  './pattern1.png',   // 開場背景紋路
  './elephant.png',   // 標題大象
  
  // 音效檔案 (建議放入資料夾，若無則只會靜音)
  './opening.mp3',
  './bgm.mp3',
  './click.mp3',
  './flights.mp3',
  './hotel.mp3',
  './itinerary.mp3',
  './mrt.mp3',
  './tickets.mp3',
  './translate.mp3',
  './phrases.mp3',
  './shopping.mp3',
  './notes.mp3',
  './emergency.mp3'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // 使用 Promise.allSettled 或個別 catch，確保單一檔案遺失不影響整個 App 安裝
        return Promise.all(
            urlsToCache.map(url => {
                return cache.add(url).catch(err => {
                    console.log('⚠️ 檔案未找到 (不影響使用):', url);
                    return Promise.resolve(); // 忽略錯誤，繼續安裝
                });
            })
        );
      })
  );
});

// 攔截網路請求：有快取就用快取 (離線模式)，沒快取才上網抓
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有，直接回傳快取版本
        if (response) {
          return response;
        }
        // 否則發送網絡請求
        return fetch(event.request);
      })
  );
});

// 清除舊版本的快取
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});