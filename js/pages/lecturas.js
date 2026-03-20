(function () {
    const lecturaObserver = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const url = entry.target.dataset.readingUrl;
            if (url) {
                fetch(url, { method: "HEAD", cache: "force-cache" }).catch(() => {});
            }
            lecturaObserver.unobserve(entry.target);
        });
    }, { rootMargin: "200px" }) : null;

    function updateReadingCardStatus(card, isCompleted) {
        if (!card) return;
        const status = card.querySelector("[data-reading-status]");
        const toggle = card.querySelector("[data-reading-toggle]");
        if (status) {
            status.classList.toggle("hidden", !isCompleted);
        }
        if (toggle) {
            toggle.textContent = isCompleted ? "Quitar revisado" : "Marcar como revisado";
        }
    }

    function markReadingAsVisited(readingId, card) {
        App.updateProgress("lecturas", readingId);
        updateReadingCardStatus(card, true);
    }

    function groupReadings(readings) {
        return readings.reduce((groups, reading) => {
            if (!groups[reading.groupTitle]) {
                groups[reading.groupTitle] = [];
            }
            groups[reading.groupTitle].push(reading);
            return groups;
        }, {});
    }

    function renderMapas() {
        const grid = document.getElementById("mapasGrid");
        if (!grid) return;

        const completed = new Set(App.getProgress("lecturas"));
        if (lecturaObserver) {
            lecturaObserver.disconnect();
        }
        grid.innerHTML = "";
        const grouped = groupReadings(AcademyContent.readings);

        Object.entries(grouped).forEach(([groupTitle, readings]) => {
            const heading = document.createElement("div");
            heading.className = "col-span-full mb-4 mt-4";
            heading.innerHTML = `<h3 class="font-orbitron text-lg font-bold text-purple-400">${groupTitle}</h3>`;
            grid.appendChild(heading);

            readings.forEach((reading) => {
                const styles = AcademyContent.colorStyles[reading.color] || AcademyContent.colorStyles.cyan;
                const isFavorite = App.isFavorite("lecturas", reading.id);
                const isCompleted = completed.has(reading.id);
                const card = document.createElement("article");
                card.className = `rounded-xl border border-slate-800/50 bg-slate-900/50 p-5 transition-all ${styles.accentBorder}`;
                card.dataset.readingUrl = reading.archivo;
                lecturaObserver?.observe(card);

                card.innerHTML = `
                    <div class="mb-3 flex items-center justify-between">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg ${styles.badge}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                            </svg>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="rounded bg-slate-800 px-2 py-1 text-xs text-slate-400">${reading.type}</span>
                            <button type="button" class="favorite-toggle ${isFavorite ? "is-active" : ""}" data-favorite-reading="${reading.id}" aria-label="Favorito">
                                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                            </button>
                        </div>
                    </div>
                    <h4 class="mb-1 font-semibold text-white">${reading.titulo}</h4>
                    <p class="mb-3 text-sm text-slate-400">${reading.desc}</p>
                    <div class="flex items-center justify-between gap-3">
                        <a href="${reading.archivo}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-medium ${styles.accentText}">
                            Ver material
                        </a>
                        <button type="button" class="text-xs font-semibold border border-slate-700 rounded-full px-3 py-1 tracking-widest uppercase" data-reading-toggle="${reading.id}">
                            ${isCompleted ? "Quitar revisado" : "Marcar como revisado"}
                        </button>
                        <span class="text-xs text-emerald-400 ${isCompleted ? "" : "hidden"}" data-reading-status>✓ Revisado</span>
                    </div>
                `;

                card.querySelector("a").addEventListener("click", () => {
                    markReadingAsVisited(reading.id, card);
                    App.rememberVisit({
                        title: reading.titulo,
                        subtitle: reading.desc,
                        url: reading.archivo,
                        kind: "lectura"
                    });
                });

                card.querySelector("[data-reading-toggle]").addEventListener("click", (event) => {
                    const active = App.toggleProgress("lecturas", event.currentTarget.dataset.readingToggle);
                    updateReadingCardStatus(card, Boolean(active));
                });

                card.querySelector("[data-favorite-reading]").addEventListener("click", () => {
                    const active = App.toggleFavorite("lecturas", {
                        id: reading.id,
                        title: reading.titulo,
                        subtitle: reading.desc,
                        url: reading.archivo,
                        color: reading.color,
                        kind: "lectura"
                    });
                    App.showToast(active ? "Material guardado en favoritos" : "Material quitado de favoritos", "info");
                });

                updateReadingCardStatus(card, isCompleted);
                grid.appendChild(card);
            });
        });
    }

    function showTab(tab) {
        document.querySelectorAll(".tab-btn").forEach((button) => {
            button.classList.remove("bg-emerald-500/20", "text-emerald-400", "border-emerald-500/30");
            button.classList.add("bg-slate-800", "text-slate-400", "border-slate-700");
        });

        document.getElementById(`tab-${tab}`)?.classList.remove("bg-slate-800", "text-slate-400", "border-slate-700");
        document.getElementById(`tab-${tab}`)?.classList.add("bg-emerald-500/20", "text-emerald-400", "border-emerald-500/30");
    }

    window.showTab = showTab;

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        renderMapas();
    });
})();
