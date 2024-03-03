// service-worker.js

const CACHE_NAME = 'cart-list-cache-v1';

const cacheFiles = [
  '/',
  '/index.html', // Adjust based on your project structure
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',
  '/style.css',
  '/script.js',
  '/assets',
  // Add other resources to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
