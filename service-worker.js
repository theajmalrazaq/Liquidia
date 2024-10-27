const CACHE_NAME = 'app-cache-v2';
const urlsToCache = [
  '/', // Cache the root of the app
  'index.html',
  'style.css', // Example CSS
  'script.js', // Your main JavaScript file
  'offline.html', // Fallback offline page
  'assets/icons/apple-icon-152x152.png',
  'assets/icons/apple-icon-180x180.png',
  'assets/icons/apple-icon-precomposed.png',
  'assets/icons/apple-icon.png',
  'assets/icons/browserconfig.xml',
  'assets/icons/favicon-16x16.png',
  'assets/icons/favicon-32x32.png',
  'assets/icons/favicon-96x96.png',
  'assets/icons/favicon.ico',
  'assets/icons/ms-icon-70x70.png',
  'assets/icons/ms-icon-144x144.png',
  'assets/icons/ms-icon-150x150.png',
  'assets/icons/ms-icon-310x310.png',
  'assets/icons/logo_aqualator.svg',
  'manifest.json',
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
        return caches.match('offline.html');
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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
  .then((cache) => {
    console.log('Caching assets:', urlsToCache);
    return cache.addAll(urlsToCache);
  })
  .then(() => console.log('All assets cached'))
  .catch((error) => console.error('Error caching assets:', error))
  );
  self.skipWaiting();
});