(function () {
    function renderMapas() {
        const grid = document.getElementById("mapasGrid");
        if (!grid) return;

        const completed = new Set(App.getProgress("lecturas"));
        grid.innerHTML = "";

        const heading = document.createElement("div");
        heading.className = "col-span-full mb-4 mt-4";
        heading.innerHTML = '<h3 class="font-orbitron text-lg font-bold text-purple-400">B1-T1: Constitución Española</h3>';
        grid.appendChild(heading);

        AcademyContent.readings.forEach((reading) => {
            const styles = AcademyContent.colorStyles[reading.color];
            const isFavorite = App.isFavorite("lecturas", reading.id);
            const card = document.createElement("article");
            card.className = `rounded-xl border border-slate-800/50 bg-slate-900/50 p-5 transition-all ${styles.accentBorder}`;

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
                    ${completed.has(reading.id) ? '<span class="text-xs text-emerald-400">✓ Revisado</span>' : ""}
                </div>
            `;

            card.querySelector("a").addEventListener("click", () => {
                App.updateProgress("lecturas", reading.id);
                App.rememberVisit({
                    title: reading.titulo,
                    subtitle: reading.desc,
                    url: reading.archivo,
                    kind: "lectura"
                });
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
                renderMapas();
            });

            grid.appendChild(card);
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
