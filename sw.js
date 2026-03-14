/**
 * Service Worker for www.devsecopswithanshu.com
 * Aggressive caching strategy for optimal performance
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;

// Critical resources to cache immediately
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/assests/me.jpg',
  '/assests/cka.jpg',
  '/assests/cks.jpg',
  '/assests/gcp.jpg',
  '/assests/hashicorp.jpg',
];

// External CDN resources to cache on-demand
const CDN_CACHE_NAME = `cdn-cache-${CACHE_VERSION}`;

// Install event - precache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name.startsWith('portfolio-cache-') && name !== CACHE_NAME)
            .concat(cacheNames.filter(name => name.startsWith('cdn-cache-') && name !== CDN_CACHE_NAME))
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests for formspree or analytics
  if (url.origin !== location.origin &&
      (url.hostname.includes('formspree.io') ||
       url.hostname.includes('analytics') ||
       url.hostname.includes('tracking'))) {
    return;
  }

  // Cache-first strategy for same-origin resources
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request).then(fetchResponse => {
            // Clone response before caching
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
            return fetchResponse;
          });
        })
        .catch(() => {
          // Return offline page or cached version
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Stale-while-revalidate for CDN resources
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('cdnjs.cloudflare.com') ||
      url.hostname.includes('cdn.jsdelivr.net') ||
      url.hostname.includes('unpkg.com') ||
      url.hostname.includes('cdn.simpleicons.org')) {
    event.respondWith(
      caches.open(CDN_CACHE_NAME).then(cache => {
        return cache.match(request).then(cachedResponse => {
          const fetchPromise = fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
