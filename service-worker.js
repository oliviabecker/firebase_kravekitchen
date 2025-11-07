const CACHE_NAME = 'krave-kitchen-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/recipes.html',
  '/recipe.html',
  '/add.html',
  '/about.html',
  '/style.css',
  '/firebase.js',
  '/indexedDB.js',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/spaghetti.jpg',
  '/images/pancakes.jpg',
  '/images/cheesecake.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];


self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app assets');
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; 
      }
      return fetch(event.request) 
        .catch(() => {
      
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});


self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
