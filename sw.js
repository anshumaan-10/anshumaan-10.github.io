/**
 * Service Worker for www.devsecopswithanshu.com
 * Aggressive caching strategy for optimal performance
 */

const CACHE_VERSION = 'v18';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;

// Critical resources to cache immediately
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/portfolio.css?v=18',
  '/portfolio.js?v=18',
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

  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests for formspree or analytics
  if (url.origin !== location.origin &&
      (url.hostname.includes('formspree.io') ||
       url.hostname.includes('analytics') ||
       url.hostname.includes('tracking'))) {
    return;
  }

  // Network-first for HTML so deployments show up immediately
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(fetchResponse => {
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
          return fetchResponse;
        })
        .catch(() => caches.match(request).then(response => response || caches.match('/index.html')))
    );
    return;
  }

  // Stale-while-revalidate strategy for same-origin assets
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request)
          .then(fetchResponse => {
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
            return fetchResponse;
          })
          .catch(() => cachedResponse || caches.match('/index.html'));

        return cachedResponse || fetchPromise;
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
