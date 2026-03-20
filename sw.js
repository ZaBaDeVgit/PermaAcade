const CACHE_NAME = "perma-academia-v2";
const APP_SHELL = [
    "index.html",
    "dashboard.html",
    "progreso.html",
    "temas.html",
    "tests.html",
    "lecturas.html",
    "videos.html",
    "podcasts.html",
    "presentaciones.html",
    "css/styles.css",
    "js/app.js",
    "js/config.js",
    "js/tests.js",
    "js/data/content.js",
    "favicon.svg",
    "manifest.webmanifest"
];

function isSameOrigin(requestUrl) {
    return requestUrl.origin === self.location.origin;
}

self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(
            keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        );
        await self.clients.claim();
    })());
});

self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    const requestUrl = new URL(event.request.url);
    if (!isSameOrigin(requestUrl)) return;

    const isAppShellRequest =
        event.request.mode === "navigate" ||
        ["script", "style", "document"].includes(event.request.destination) ||
        requestUrl.pathname.endsWith(".html") ||
        requestUrl.pathname.endsWith(".js") ||
        requestUrl.pathname.endsWith(".css") ||
        requestUrl.pathname.endsWith(".webmanifest");

    if (isAppShellRequest) {
        event.respondWith((async () => {
            try {
                const response = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, response.clone());
                return response;
            } catch {
                const cached = await caches.match(event.request);
                return cached || caches.match("index.html");
            }
        })());
        return;
    }

    event.respondWith((async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;

        try {
            const response = await fetch(event.request);
            if (response && response.status === 200) {
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, response.clone());
            }
            return response;
        } catch {
            return caches.match(event.request);
        }
    })());
});
