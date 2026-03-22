(function () {
    let isPlaying = false;
    let currentPodcastId = null;
    let currentPlaybackRate = 1;
    const audioPlayer = new Audio();
    
    const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const STORAGE_KEY = "academy.podcastPosition";

    function getPodcast(id) {
        return AcademyContent.podcasts.find((podcast) => podcast.id === id);
    }

    function savePosition(id, position) {
        try {
            const positions = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            positions[id] = position;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
        } catch {}
    }

    function getSavedPosition(id) {
        try {
            const positions = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            return positions[id] || 0;
        } catch {
            return 0;
        }
    }

    function renderPodcasts() {
        const list = document.getElementById("podcastsList");
        if (!list) return;

        const completed = new Set(App.getProgress("podcasts"));
        list.innerHTML = "";

        AcademyContent.podcasts.forEach((podcast) => {
            const styles = AcademyContent.colorStyles[podcast.color] || AcademyContent.colorStyles.cyan;
            const isActive = currentPodcastId === podcast.id;
            const isFavorite = App.isFavorite("podcasts", podcast.id);
            const savedPos = getSavedPosition(podcast.id);
            const hasProgress = savedPos > 0;
            const card = document.createElement("button");
            card.type = "button";
            card.className = `podcast-item w-full rounded-xl border border-slate-800/50 bg-slate-900/50 p-4 text-left transition-all ${styles.accentBorder} ${isActive ? "ring-1 ring-white/20" : ""}`;
            card.addEventListener("click", () => playPodcast(podcast.id));

            card.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${styles.badge}">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                        </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="truncate font-semibold text-white">${podcast.title}</h3>
                        <p class="truncate text-sm text-slate-400">${podcast.desc}</p>
                        ${hasProgress ? '<div class="text-xs text-amber-400 mt-1">⟳ Continuar</div>' : ''}
                    </div>
                    <div class="shrink-0 text-right">
                        <span class="font-medium ${styles.accentText}">${podcast.duration}</span>
                        ${completed.has(podcast.id) ? '<div class="text-xs text-emerald-400">✓</div>' : ""}
                    </div>
                </div>
                <div class="mt-3 flex justify-end gap-2">
                    <span class="favorite-toggle ${isFavorite ? "is-active" : ""}" data-favorite-podcast="${podcast.id}" aria-label="Favorito" role="button" tabindex="0">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                    </span>
                </div>
            `;

            list.appendChild(card);
        });

        list.querySelectorAll("[data-favorite-podcast]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const podcast = getPodcast(button.dataset.favoritePodcast);
                if (!podcast) return;
                const active = App.toggleFavorite("podcasts", {
                    id: podcast.id,
                    title: podcast.title,
                    subtitle: podcast.desc,
                    url: "podcasts.html",
                    color: podcast.color,
                    kind: "podcast"
                });
                App.showToast(active ? "Podcast guardado" : "Podcast removido", "info");
                renderPodcasts();
            });
        });
    }

    function renderSearchFilter() {
        const container = document.getElementById("podcastSearchContainer");
        if (!container) return;
        
        container.innerHTML = `
            <div class="mb-6 flex flex-col sm:flex-row gap-4">
                <div class="flex-1 relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" id="podcastSearchInput" placeholder="Buscar podcasts..." 
                           class="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors">
                </div>
                <select id="podcastFilterSelect" class="px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors">
                    <option value="">Todos los podcasts</option>
                    <option value="cyan">Bloque 1</option>
                    <option value="emerald">Bloque 2</option>
                    <option value="blue">Bloque 3</option>
                    <option value="purple">Bloque 4</option>
                    <option value="rose">Bloque 5</option>
                </select>
            </div>
        `;
        
        const searchInput = document.getElementById("podcastSearchInput");
        const filterSelect = document.getElementById("podcastFilterSelect");
        
        if (searchInput) {
            searchInput.addEventListener("input", filterPodcasts);
        }
        if (filterSelect) {
            filterSelect.addEventListener("change", filterPodcasts);
        }
    }

    function filterPodcasts() {
        const searchInput = document.getElementById("podcastSearchInput");
        const filterSelect = document.getElementById("podcastFilterSelect");
        const list = document.getElementById("podcastsList");
        if (!list) return;

        const query = (searchInput?.value || "").toLowerCase().trim();
        const colorFilter = filterSelect?.value || "";

        const filtered = AcademyContent.podcasts.filter(podcast => {
            const matchesSearch = !query || 
                podcast.title.toLowerCase().includes(query) ||
                podcast.desc.toLowerCase().includes(query);
            const matchesColor = !colorFilter || podcast.color === colorFilter;
            return matchesSearch && matchesColor;
        });

        if (filtered.length === 0) {
            list.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-slate-400">No se encontraron podcasts</p>
                    <p class="text-slate-500 text-sm mt-1">Intenta con otros términos de búsqueda</p>
                </div>
            `;
            return;
        }

        const completed = new Set(App.getProgress("podcasts"));
        list.innerHTML = "";

        filtered.forEach((podcast) => {
            const styles = AcademyContent.colorStyles[podcast.color] || AcademyContent.colorStyles.cyan;
            const isActive = currentPodcastId === podcast.id;
            const isFavorite = App.isFavorite("podcasts", podcast.id);
            const savedPos = getSavedPosition(podcast.id);
            const hasProgress = savedPos > 0;
            const card = document.createElement("button");
            card.type = "button";
            card.className = `podcast-item w-full rounded-xl border border-slate-800/50 bg-slate-900/50 p-4 text-left transition-all ${styles.accentBorder} ${isActive ? "ring-1 ring-white/20" : ""}`;
            card.addEventListener("click", () => playPodcast(podcast.id));

            card.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${styles.badge}">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                        </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="truncate font-semibold text-white">${podcast.title}</h3>
                        <p class="truncate text-sm text-slate-400">${podcast.desc}</p>
                        ${hasProgress ? '<div class="text-xs text-amber-400 mt-1">⟳ Continuar</div>' : ''}
                    </div>
                    <div class="shrink-0 text-right">
                        <span class="font-medium ${styles.accentText}">${podcast.duration}</span>
                        ${completed.has(podcast.id) ? '<div class="text-xs text-emerald-400">✓</div>' : ""}
                    </div>
                </div>
                <div class="mt-3 flex justify-end gap-2">
                    <span class="favorite-toggle ${isFavorite ? "is-active" : ""}" data-favorite-podcast="${podcast.id}" aria-label="Favorito" role="button" tabindex="0">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                    </span>
                </div>
            `;

            list.appendChild(card);
        });

        list.querySelectorAll("[data-favorite-podcast]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const podcast = getPodcast(button.dataset.favoritePodcast);
                if (!podcast) return;
                const active = App.toggleFavorite("podcasts", {
                    id: podcast.id,
                    title: podcast.title,
                    subtitle: podcast.desc,
                    url: "podcasts.html",
                    color: podcast.color,
                    kind: "podcast"
                });
                App.showToast(active ? "Podcast guardado" : "Podcast removido", "info");
                filterPodcasts();
            });
        });
    }

    function setPlayerInfo(podcast) {
        const cover = document.getElementById("fixedCover");
        const styles = AcademyContent.colorStyles[podcast.color] || AcademyContent.colorStyles.cyan;
        cover.className = `w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.badge}`;
        cover.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
        `;
        App.setText("fixedTitle", podcast.title);
        App.setText("fixedDesc", podcast.desc);
        App.setText("fixedTotal", podcast.duration);
        
        updateSpeedButton();
        updateDownloadButton(podcast);
    }

    function updatePlayButton() {
        const icon = document.getElementById("fixedPlayIcon");
        if (!icon) return;
        icon.innerHTML = isPlaying
            ? '<path d="M6 4h4v16H6zM14 4h4v16h-4z"></path>'
            : '<path d="M8 5v14l11-7z"></path>';
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60) || 0;
        const secs = Math.floor(seconds % 60) || 0;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    function updateSpeedButton() {
        const speedBtn = document.getElementById("speedBtn");
        if (speedBtn) {
            speedBtn.textContent = `${currentPlaybackRate}x`;
            speedBtn.className = `px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                currentPlaybackRate !== 1 
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" 
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`;
        }
    }

    function cycleSpeed() {
        const currentIndex = PLAYBACK_RATES.indexOf(currentPlaybackRate);
        const nextIndex = (currentIndex + 1) % PLAYBACK_RATES.length;
        currentPlaybackRate = PLAYBACK_RATES[nextIndex];
        audioPlayer.playbackRate = currentPlaybackRate;
        updateSpeedButton();
        App.showToast(`Velocidad: ${currentPlaybackRate}x`, "info", 1500);
    }

    function updateDownloadButton(podcast) {
        const downloadBtn = document.getElementById("downloadBtn");
        if (downloadBtn && podcast) {
            downloadBtn.classList.remove("hidden");
            downloadBtn.onclick = () => downloadPodcast(podcast);
        }
    }

    function downloadPodcast(podcast) {
        if (!podcast || !podcast.archivo) return;
        const link = document.createElement("a");
        link.href = podcast.archivo;
        link.download = podcast.archivo.split("/").pop() || "podcast.m4a";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        App.showToast("Descargando podcast...", "info", 2000);
    }

    function playPodcast(id) {
        const podcast = getPodcast(id);
        if (!podcast) return;

        if (currentPodcastId === id && !audioPlayer.paused) {
            audioPlayer.pause();
            isPlaying = false;
            updatePlayButton();
            return;
        }

        currentPodcastId = id;
        setPlayerInfo(podcast);
        
        const savedPosition = getSavedPosition(id);
        audioPlayer.src = podcast.archivo;
        audioPlayer.playbackRate = currentPlaybackRate;
        
        if (savedPosition > 0) {
            audioPlayer.currentTime = savedPosition;
        }
        
        audioPlayer.play().catch(err => {
            console.warn("Playback failed:", err);
        });
        
        isPlaying = true;
        document.getElementById("fixedPlayer")?.classList.remove("translate-y-full");
        App.updateProgress("podcasts", podcast.id);
        App.rememberVisit({
            title: podcast.title,
            subtitle: podcast.desc,
            url: "podcasts.html",
            kind: "podcast"
        });
        updatePlayButton();
        renderPodcasts();
    }

    function togglePlay() {
        if (!currentPodcastId) {
            playPodcast(AcademyContent.podcasts[0]?.id);
            return;
        }

        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play().catch(err => {
                console.warn("Playback failed:", err);
            });
        }

        isPlaying = !isPlaying;
        updatePlayButton();
    }

    function seekAudio(event) {
        const bar = event.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        audioPlayer.currentTime = percent * audioPlayer.duration;
    }

    audioPlayer.addEventListener("ended", () => {
        isPlaying = false;
        updatePlayButton();
        App.setWidth("fixedProgress", 0);
        App.setText("fixedCurrent", "0:00");
        if (currentPodcastId) {
            savePosition(currentPodcastId, 0);
        }
    });

    audioPlayer.addEventListener("timeupdate", () => {
        if (!audioPlayer.duration) return;
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        App.setWidth("fixedProgress", progress);
        App.setText("fixedCurrent", formatTime(audioPlayer.currentTime));
        
        if (currentPodcastId && Math.floor(audioPlayer.currentTime) % 10 === 0) {
            savePosition(currentPodcastId, audioPlayer.currentTime);
        }
    });

    audioPlayer.addEventListener("loadedmetadata", () => {
        App.setText("fixedTotal", formatTime(audioPlayer.duration));
    });

    audioPlayer.addEventListener("pause", () => {
        isPlaying = false;
        updatePlayButton();
    });

    audioPlayer.addEventListener("play", () => {
        isPlaying = true;
        updatePlayButton();
    });

    window.playPodcast = playPodcast;
    window.togglePlay = togglePlay;
    window.seekAudio = seekAudio;
    window.cycleSpeed = cycleSpeed;

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        renderSearchFilter();
        renderPodcasts();
    });
})();
