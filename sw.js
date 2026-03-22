const CACHE_NAME = "perma-academia-v3";
const STATIC_CACHE = "perma-academia-static-v1";
const DYNAMIC_CACHE = "perma-academia-dynamic-v1";
const AUDIO_CACHE = "perma-academia-audio-v1";

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
    "infografias.html",
    "esquemas.html",
    "404.html",
    "css/styles.css",
    "css/tailwind-built.css",
    "js/app.js",
    "js/config.js",
    "js/tests.js",
    "js/data/content.js",
    "favicon.svg",
    "manifest.webmanifest"
];

const AUDIO_EXTENSIONS = [".m4a", ".mp3", ".ogg", ".wav", ".aac"];
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"];
const FONT_EXTENSIONS = [".woff", ".woff2", ".ttf", ".otf"];

function isSameOrigin(requestUrl) {
    return requestUrl.origin === self.location.origin;
}

function isAudioRequest(requestUrl) {
    return AUDIO_EXTENSIONS.some(ext => requestUrl.pathname.toLowerCase().endsWith(ext));
}

function isImageRequest(requestUrl) {
    return IMAGE_EXTENSIONS.some(ext => requestUrl.pathname.toLowerCase().endsWith(ext));
}

function isFontRequest(requestUrl) {
    return FONT_EXTENSIONS.some(ext => requestUrl.pathname.toLowerCase().endsWith(ext));
}

function getCacheForRequest(requestUrl) {
    if (isAudioRequest(requestUrl)) return AUDIO_CACHE;
    if (isImageRequest(requestUrl) || isFontRequest(requestUrl)) return DYNAMIC_CACHE;
    return STATIC_CACHE;
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL)),
            caches.open(DYNAMIC_CACHE),
            caches.open(AUDIO_CACHE)
        ]).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        const validCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, AUDIO_CACHE];
        await Promise.all(
            keys.filter((key) => !validCaches.includes(key)).map((key) => caches.delete(key))
        );
        await self.clients.claim();
    })());
});

self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
    if (event.data?.type === "CACHE_AUDIO") {
        const { url } = event.data;
        caches.open(AUDIO_CACHE).then(cache => {
            cache.add(url).catch(() => {});
        });
    }
    if (event.data?.type === "SHOW_NOTIFICATION") {
        const { title, body, icon, actionUrl } = event.data;
        
        self.registration.showNotification(title, {
            body: body,
            icon: icon || "favicon.svg",
            badge: "favicon.svg",
            tag: "perma-notification",
            renotify: false,
            requireInteraction: false,
            actions: actionUrl ? [
                { action: "donate", title: "Donar 💝" }
            ] : []
        });
    }
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    
    if (event.action === "donate") {
        event.waitUntil(
            clients.openWindow("https://ko-fi.com/zabadev")
        );
    } else {
        event.waitUntil(
            clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
                for (const client of clientList) {
                    if (client.url.includes("/dashboard") && "focus" in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow("/dashboard.html");
                }
            })
        );
    }
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    const requestUrl = new URL(event.request.url);

    if (!isSameOrigin(requestUrl)) {
        if (requestUrl.hostname === "fonts.googleapis.com" || 
            requestUrl.hostname === "fonts.gstatic.com") {
            event.respondWith(
                caches.match(event.request).then(cached => {
                    if (cached) return cached;
                    return fetch(event.request).then(response => {
                        if (response.ok) {
                            const clone = response.clone();
                            caches.open(DYNAMIC_CACHE).then(cache => cache.put(event.request, clone));
                        }
                        return response;
                    }).catch(() => new Response("", { status: 408 }));
                })
            );
            return;
        }
        return;
    }

    if (event.request.mode === "navigate" || 
        ["script", "style", "document"].includes(event.request.destination) ||
        requestUrl.pathname.endsWith(".html") ||
        requestUrl.pathname.endsWith(".js") ||
        requestUrl.pathname.endsWith(".css") ||
        requestUrl.pathname.endsWith(".webmanifest")) {
        
        event.respondWith(
            caches.open(STATIC_CACHE).then(async cache => {
                const cached = await cache.match(event.request);
                if (cached) {
                    fetch(event.request).then(response => {
                        if (response.ok) {
                            cache.put(event.request, response.clone());
                        }
                    }).catch(() => {});
                    return cached;
                }
                
                try {
                    const response = await fetch(event.request);
                    if (response.ok) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                } catch {
                    const fallback = await cache.match("index.html");
                    return fallback || new Response("Offline", { status: 503 });
                }
            })
        );
        return;
    }

    if (isAudioRequest(requestUrl)) {
        event.respondWith(
            caches.open(AUDIO_CACHE).then(async cache => {
                const cached = await cache.match(event.request);
                if (cached) return cached;
                
                try {
                    const response = await fetch(event.request);
                    if (response.ok) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                } catch {
                    return new Response("Audio unavailable offline", { status: 503 });
                }
            })
        );
        return;
    }

    event.respondWith(
        caches.open(DYNAMIC_CACHE).then(async cache => {
            const cached = await cache.match(event.request);
            if (cached) return cached;
            
            try {
                const response = await fetch(event.request);
                if (response.ok) {
                    cache.put(event.request, response.clone());
                }
                return response;
            } catch {
                if (isImageRequest(requestUrl)) {
                    return caches.match("favicon.svg");
                }
                return caches.match(event.request).catch(() => new Response("", { status: 404 }));
            }
        })
    );
});
