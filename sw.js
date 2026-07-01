const CACHE_NAME = "mobywatel-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./login.html",
    "./manifest.json",
    "./assets/icons/icon.png",
    "./assets/icons/icon-192.png"
    "./add.html"
    "./assistant.html"
    "./diia.html"
    "./documents.html"
    "./dowod.html"
    "./legszk.html"
    "./more.html"
    "./pesel.html"
    "./powiadomienia.html"
    "./prawojazdy.html"
    "./profiledata.html"
    "./qr.html"
    "./search.html"
    "./services.html"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(keys =>
                Promise.all(
                    keys.map(key => {
                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }
                    })
                )
            )
        ])
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});