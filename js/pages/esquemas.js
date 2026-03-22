(function () {
    const listView = document.getElementById("listView");
    const detailView = document.getElementById("detailView");
    const grid = document.getElementById("esquemasGrid");
    const detailTitle = document.getElementById("detailTitle");
    const detailContent = document.getElementById("detailContent");

    function updateEsquemaCardStatus(card, isCompleted) {
        if (!card) return;
        const status = card.querySelector("[data-esquema-status]");
        const toggle = card.querySelector("[data-esquema-toggle]");
        if (status) {
            status.classList.toggle("hidden", !isCompleted);
        }
        if (toggle) {
            toggle.textContent = isCompleted ? "Revisado" : "Pendiente";
            toggle.classList.toggle("bg-emerald-500/20", isCompleted);
            toggle.classList.toggle("text-emerald-400", isCompleted);
            toggle.classList.toggle("bg-slate-800", !isCompleted);
            toggle.classList.toggle("text-slate-400", !isCompleted);
        }
    }

    function groupEsquemas(esquemas) {
        return esquemas.reduce((groups, item) => {
            if (!groups[item.groupTitle]) {
                groups[item.groupTitle] = [];
            }
            groups[item.groupTitle].push(item);
            return groups;
        }, {});
    }

    function renderEsquemas() {
        if (!grid) return;
        const completed = new Set(App.getProgress("esquemas"));
        grid.innerHTML = "";
        const grouped = groupEsquemas(AcademyContent.esquemas || []);

        Object.entries(grouped).forEach(([groupTitle, items]) => {
            const heading = document.createElement("div");
            heading.className = "col-span-full mb-4 mt-4";
            heading.innerHTML = `<h3 class="font-orbitron text-lg font-bold text-emerald-400">${groupTitle}</h3>`;
            grid.appendChild(heading);

            items.forEach((item) => {
                const styles = AcademyContent.colorStyles[item.color] || AcademyContent.colorStyles.cyan;
                const isFavorite = App.isFavorite("esquemas", item.id);
                const isCompleted = completed.has(item.id);
                const card = document.createElement("article");
                card.className = `group rounded-xl border border-slate-800/50 bg-slate-900/50 p-5 transition-all hover:bg-slate-900 ${styles.accentBorder} cursor-pointer`;
                
                card.innerHTML = `
                    <div class="mb-3 flex items-center justify-between">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg ${styles.badge}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                            </svg>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="rounded bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-700">${item.type}</span>
                            <button type="button" class="favorite-toggle ${isFavorite ? "is-active" : ""}" data-favorite-esquema="${item.id}" aria-label="Favorito">
                                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                            </button>
                        </div>
                    </div>
                    <h4 class="mb-1 font-bold text-white group-hover:text-emerald-400 transition-colors">${item.titulo}</h4>
                    <p class="mb-4 text-sm text-slate-400 line-clamp-2">${item.desc}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-medium text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">Ver esquema →</span>
                        <button type="button" class="text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter transition-all" data-esquema-toggle="${item.id}"></button>
                    </div>
                `;

                card.addEventListener("click", (e) => {
                    if (e.target.closest("[data-esquema-toggle]") || e.target.closest("[data-favorite-esquema]")) return;
                    openEsquema(item);
                });

                const toggleBtn = card.querySelector("[data-esquema-toggle]");
                toggleBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const active = App.toggleProgress("esquemas", item.id);
                    updateEsquemaCardStatus(card, Boolean(active));
                });

                card.querySelector("[data-favorite-esquema]").addEventListener("click", (e) => {
                    e.stopPropagation();
                    const active = App.toggleFavorite("esquemas", {
                        id: item.id,
                        title: item.titulo,
                        subtitle: item.desc,
                        url: "esquemas.html",
                        color: item.color,
                        kind: "esquema"
                    });
                    e.currentTarget.classList.toggle("is-active", active);
                    App.showToast(active ? "Esquema guardado en favoritos" : "Esquema quitado de favoritos", "info");
                });

                updateEsquemaCardStatus(card, isCompleted);
                grid.appendChild(card);
            });
        });
    }

    async function openEsquema(item) {
        detailTitle.textContent = item.titulo;
        detailContent.innerHTML = '<div class="flex justify-center p-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>';
        
        listView.classList.add("hidden");
        detailView.classList.remove("hidden");

        try {
            // Solo soportamos HTML (iframes)
            detailContent.innerHTML = `<iframe src="${item.archivo}" title="${item.titulo}"></iframe>`;
            
            App.updateProgress("esquemas", item.id);
            const card = document.querySelector(`[data-esquema-toggle="${item.id}"]`)?.closest("article");
            if (card) updateEsquemaCardStatus(card, true);

            App.rememberVisit({
                title: item.titulo,
                subtitle: item.desc,
                url: item.archivo,
                kind: "esquema"
            });
        } catch (error) {
            detailContent.innerHTML = `<div class="p-8 text-center text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">Error al cargar el esquema: ${error.message}</div>`;
        }
    }

    function backToList() {
        detailView.classList.add("hidden");
        listView.classList.remove("hidden");
    }

    window.backToList = backToList;

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        renderEsquemas();
    });
})();
