const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/', // Cache the root of the app
  'index.html',
  'styles.css', // Example CSS
  'script.js', // Your main JavaScript file
  'offline.html', // Fallback offline page
  '/icons/icon-192x192.png', // App icons
];

// Install event: caching resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serving cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Serve from cache if available, otherwise fetch from the network
        return response || fetch(event.request);
      }).catch(() => {
        // Fallback to offline page if both cache and network fail
        return caches.match('/offline.html');
      })
  );
});

// Activate event: cleaning up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
