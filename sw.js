const CACHE = "bed-finder-v1.1.0";

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

  event.respondWith(

    caches.match(event.request).then((cachedResponse) => {

      const networkFetch = fetch(event.request)

        .then((networkResponse) => {

          if (
            networkResponse &&
            networkResponse.status === 200
          ) {

            caches.open(CACHE).then((cache) => {

              cache.put(
                event.request,
                networkResponse.clone()
              );

            });

          }

          return networkResponse;

        })

        .catch(() => cachedResponse);

      return cachedResponse || networkFetch;

    })

  );

});
