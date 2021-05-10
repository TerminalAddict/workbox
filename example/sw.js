
importScripts("../local_workbox/workbox-v6.1.5/workbox-sw.js");

workbox.setConfig({
  debug: false,
  modulePathPrefix: "../local_workbox/workbox-v6.1.5/"
});

var CACHE_NAME='{{ site.site_name | slugify }}-cache';

workbox.precaching.precacheAndRoute([
{url: '/', revision: '1620607563' },
{url: '/404.html', revision: '1620607563' },
{url: '/contact.html', revision: '1620607563' },
{url: '/history.html', revision: '1620607563' },
{url: '/personal.html', revision: '1620607563' },
{url: '/projects.html', revision: '1620607563' },
{url: '/staff.html', revision: '1620607563' },
{url: '/sw.js', revision: '1620607563' },
{url: '/sitemap.xml', revision: '1620607563' },
{url: '/robots.txt', revision: '1620607563' }
], {
  directoryIndex: null,
});

// cache images
workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: CACHE_NAME,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 10 * 24 * 60 * 60 // 10 Days
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ],
  })
);

// cache styles
workbox.routing.registerRoute(
  ({request}) => request.destination === 'style',
  new workbox.strategies.CacheFirst({
    cacheName: CACHE_NAME,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 10 * 24 * 60 * 60 // 10 Days
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ],
  })
);

var urlsToCache = [
  '/',
  '/404.html',
  '/contact.html',
  '/history.html',
  '/personal.html',
  '/projects.html',
  '/staff.html',
  '/sw.js',
  '/sitemap.xml',
  '/robots.txt'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        console.log('Returned from cache');
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                console.log('Storing in cache');
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('message', (event) => {
  console.log('Message received');
  if (event.data && event.data.type === 'SKIP_WAITING') {
    return self.skipWaiting();
  }
});
