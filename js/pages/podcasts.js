(function () {
    let isPlaying = false;
    let currentPodcastId = null;
    const audioPlayer = new Audio();

    function getPodcast(id) {
        return AcademyContent.podcasts.find((podcast) => podcast.id === id);
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
                    </div>
                    <div class="shrink-0 text-right">
                        <span class="font-medium ${styles.accentText}">${podcast.duration}</span>
                        ${completed.has(podcast.id) ? '<div class="text-xs text-emerald-400">✓ Escuchado</div>' : ""}
                    </div>
                </div>
                <div class="mt-3 flex justify-end">
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
                App.showToast(active ? "Podcast guardado en favoritos" : "Podcast quitado de favoritos", "info");
                renderPodcasts();
            });
        });
    }

    function setPlayerInfo(podcast) {
        const cover = document.getElementById("fixedCover");
        const styles = AcademyContent.colorStyles[podcast.color] || AcademyContent.colorStyles.cyan;
        cover.className = `flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${styles.badge}`;
        cover.innerHTML = `
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
        `;
        App.setText("fixedTitle", podcast.title);
        App.setText("fixedDesc", podcast.desc);
        App.setText("fixedTotal", podcast.duration);
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

    function playPodcast(id) {
        const podcast = getPodcast(id);
        if (!podcast) return;

        currentPodcastId = id;
        setPlayerInfo(podcast);
        audioPlayer.src = podcast.archivo;
        audioPlayer.play();
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
            playPodcast(AcademyContent.podcasts[0].id);
            return;
        }

        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }

        isPlaying = !isPlaying;
        updatePlayButton();
    }

    function seekAudio(event) {
        const bar = event.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    }

    audioPlayer.addEventListener("ended", () => {
        isPlaying = false;
        updatePlayButton();
        App.setWidth("fixedProgress", 0);
        App.setText("fixedCurrent", "0:00");
    });

    audioPlayer.addEventListener("timeupdate", () => {
        if (!audioPlayer.duration) return;
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        App.setWidth("fixedProgress", progress);
        App.setText("fixedCurrent", formatTime(audioPlayer.currentTime));
    });

    audioPlayer.addEventListener("loadedmetadata", () => {
        App.setText("fixedTotal", formatTime(audioPlayer.duration));
    });

    window.playPodcast = playPodcast;
    window.togglePlay = togglePlay;
    window.seekAudio = seekAudio;

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        renderPodcasts();
    });
})();
