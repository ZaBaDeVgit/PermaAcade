(function () {
    function ensureVideoSource(videoElement) {
        if (videoElement.dataset.loaded === "true") return;
        const source = document.createElement("source");
        source.dataset.dynamicSource = "true";
        source.src = videoElement.dataset.videoSrc;
        source.type = "video/mp4";
        videoElement.appendChild(source);
        videoElement.load();
        videoElement.dataset.loaded = "true";
    }

    function hidePoster(videoElement) {
        const poster = videoElement.closest("article")?.querySelector(".video-poster");
        if (poster) {
            poster.classList.add("video-poster--hidden");
        }
    }

    function showPoster(videoElement) {
        const poster = videoElement.closest("article")?.querySelector(".video-poster");
        if (poster) {
            poster.classList.remove("video-poster--hidden");
        }
    }

    function markVideoAsViewed(videoId, card) {
        App.updateProgress("videos", videoId);
        const video = AcademyContent.videos.find((entry) => entry.id === videoId);

        if (video) {
            App.rememberVisit({
                title: video.titulo,
                subtitle: video.desc,
                url: "videos.html",
                kind: "video"
            });
        }

        if (!card) return;

        const status = card.querySelector("[data-video-status]");
        if (status) {
            status.textContent = "✓ Visto";
            status.classList.remove("hidden");
        }
    }

    function groupVideos(videos) {
        return videos.reduce((groups, video) => {
            if (!groups[video.groupTitle]) {
                groups[video.groupTitle] = [];
            }
            groups[video.groupTitle].push(video);
            return groups;
        }, {});
    }

    function renderVideos() {
        const grid = document.getElementById("videosGrid");
        if (!grid) return;

        const completed = new Set(App.getProgress("videos"));
        const grouped = groupVideos(AcademyContent.videos);
        grid.innerHTML = "";

        Object.entries(grouped).forEach(([groupTitle, videos]) => {
            const heading = document.createElement("div");
            heading.className = "col-span-full mb-4 mt-4";
            heading.innerHTML = `<h3 class="font-orbitron text-lg font-bold text-cyan-400">${groupTitle}</h3>`;
            grid.appendChild(heading);

            videos.forEach((video) => {
                const poster = AcademyContent.videoPosters[video.color] || "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 64, 175, 0.85))";
                const styles = AcademyContent.colorStyles[video.color] || AcademyContent.colorStyles.cyan;
                const isFavorite = App.isFavorite("videos", video.id);
                const card = document.createElement("article");
                card.className = `overflow-hidden rounded-xl border border-slate-800/50 bg-slate-900/50 transition-all ${styles.accentBorder} video-card`;

                card.innerHTML = `
                    <div class="relative aspect-video bg-slate-800 overflow-hidden">
                        <div class="video-poster" data-video-poster="${video.id}" style="background: ${poster};">
                            <div class="video-poster__label text-[10px] font-semibold tracking-[0.3em] uppercase">${groupTitle}</div>
                            <h3 class="video-poster__title text-xl font-bold">${video.titulo}</h3>
                            <p class="video-poster__desc text-sm text-slate-200">${video.desc}</p>
                            <button type="button" class="video-poster__play" data-video-poster-button="${video.id}" aria-label="Reproducir ${video.titulo}">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 5v14l11-7z"></path>
                                </svg>
                                <span>Reproducir</span>
                            </button>
                        </div>
                        <video controls preload="none" playsinline class="h-full w-full" data-video-id="${video.id}" data-video-src="${video.archivo}">
                            Tu navegador no soporta vídeo.
                        </video>
                    </div>
                    <div class="p-4">
                        <div class="mb-2 flex items-center justify-between gap-3">
                            <h3 class="font-semibold text-white">${video.titulo}</h3>
                            <div class="flex items-center gap-2">
                                <span class="text-xs text-emerald-400 ${completed.has(video.id) ? "" : "hidden"}" data-video-status>✓ Visto</span>
                                <button type="button" class="favorite-toggle ${isFavorite ? "is-active" : ""}" data-favorite-video="${video.id}" aria-label="Favorito">
                                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                                </button>
                            </div>
                        </div>
                        <p class="mb-4 text-sm text-slate-400">${video.desc}</p>
                        <div class="flex items-center justify-between gap-3">
                            <button class="rounded-lg px-4 py-2 text-sm font-medium transition-colors ${styles.button}" data-mark-video="${video.id}">
                                Marcar como visto
                            </button>
                            <a href="${video.archivo}" target="_blank" rel="noopener noreferrer" class="text-sm font-medium ${styles.accentText}">
                                Abrir archivo
                            </a>
                        </div>
                    </div>
                `;

                grid.appendChild(card);
            });
        });

        grid.querySelectorAll("[data-mark-video]").forEach((button) => {
            button.addEventListener("click", () => {
                markVideoAsViewed(button.dataset.markVideo, button.closest("article"));
            });
        });

        grid.querySelectorAll("[data-favorite-video]").forEach((button) => {
            button.addEventListener("click", () => {
                const video = AcademyContent.videos.find((entry) => entry.id === button.dataset.favoriteVideo);
                if (!video) return;
                const active = App.toggleFavorite("videos", {
                    id: video.id,
                    title: video.titulo,
                    subtitle: video.desc,
                    url: "videos.html",
                    color: video.color,
                    kind: "video"
                });
                App.showToast(active ? "Vídeo guardado en favoritos" : "Vídeo quitado de favoritos", "info");
                renderVideos();
            });
        });

        grid.querySelectorAll("[data-video-poster-button]").forEach((button) => {
            button.addEventListener("click", () => {
                const videoId = button.dataset.videoPosterButton;
                const videoEl = grid.querySelector(`video[data-video-id="${videoId}"]`);

                if (!videoEl) return;

                ensureVideoSource(videoEl);
                hidePoster(videoEl);
                videoEl.play();
                markVideoAsViewed(videoId, button.closest("article"));
            });
        });

        grid.querySelectorAll("video[data-video-id]").forEach((videoElement) => {
            videoElement.addEventListener("play", () => {
                ensureVideoSource(videoElement);
                hidePoster(videoElement);
                markVideoAsViewed(videoElement.dataset.videoId, videoElement.closest("article"));
            }, { once: true });

            videoElement.addEventListener("ended", () => {
                showPoster(videoElement);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        renderVideos();
    });
})();
