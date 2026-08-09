const CACHE = "bed-finder-v1.1.1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const cachePromise = caches.open(CACHE);

  const cachedResponsePromise = cachePromise.then((cache) =>
    cache.match(event.request)
  );

  const networkResponsePromise = fetch(event.request).then(
    async (networkResponse) => {
      if (networkResponse && networkResponse.ok) {
        const cache = await cachePromise;
        await cache.put(
          event.request,
          networkResponse.clone()
        );
      }

      return networkResponse;
    }
  );

  // 최신 파일을 캐시에 넣을 때까지
  // 서비스 워커가 종료되지 않도록 유지
  event.waitUntil(
    networkResponsePromise.catch(() => {})
  );

  event.respondWith(
    cachedResponsePromise.then((cachedResponse) => {
      return cachedResponse || networkResponsePromise;
    })
  );
});
