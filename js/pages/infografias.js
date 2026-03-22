(function () {
    const infografiaObserver = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const url = entry.target.dataset.infografiaUrl;
            if (url) {
                fetch(url, { method: "HEAD", cache: "force-cache" }).catch(() => {});
            }
            infografiaObserver.unobserve(entry.target);
        });
    }, { rootMargin: "200px" }) : null;

    function updateInfografiaCardStatus(card, isCompleted) {
        if (!card) return;
        const status = card.querySelector("[data-infografia-status]");
        const toggle = card.querySelector("[data-infografia-toggle]");
        if (status) {
            status.classList.toggle("hidden", !isCompleted);
        }
        if (toggle) {
            toggle.textContent = isCompleted ? "Quitar revisado" : "Marcar como revisado";
        }
    }

    function markInfografiaAsVisited(infografiaId, card) {
        App.updateProgress("infografias", infografiaId);
        updateInfografiaCardStatus(card, true);
    }

    function groupInfografias(infografias) {
        return infografias.reduce((groups, info) => {
            if (!groups[info.groupTitle]) {
                groups[info.groupTitle] = [];
            }
            groups[info.groupTitle].push(info);
            return groups;
        }, {});
    }

    function renderInfografias() {
        const grid = document.getElementById("infografiasGrid");
        if (!grid) return;

        const completed = new Set(App.getProgress("infografias"));
        if (infografiaObserver) {
            infografiaObserver.disconnect();
        }
        grid.innerHTML = "";
        const grouped = groupInfografias(AcademyContent.infografias || []);

        Object.entries(grouped).forEach(([groupTitle, infografias]) => {
            const heading = document.createElement("div");
            heading.className = "col-span-full mb-4 mt-4";
            heading.innerHTML = `<h3 class="font-orbitron text-lg font-bold text-indigo-400 border-l-4 border-indigo-500 pl-3">${groupTitle}</h3>`;
            grid.appendChild(heading);

            infografias.forEach((info) => {
                const styles = AcademyContent.colorStyles[info.color] || AcademyContent.colorStyles.cyan;
                const isFavorite = App.isFavorite("infografias", info.id);
                const isCompleted = completed.has(info.id);
                const card = document.createElement("article");
                card.className = `group relative rounded-2xl border border-slate-800/50 bg-slate-900/40 p-6 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 ${styles.accentBorder}`;
                card.dataset.infografiaUrl = info.archivo;
                infografiaObserver?.observe(card);

                card.innerHTML = `
                    <div class="mb-4 flex items-start justify-between">
                        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="rounded-full bg-slate-800/80 px-3 py-1 text-[10px] font-bold tracking-widest text-slate-400 border border-slate-700 uppercase">${info.type}</span>
                            <button type="button" class="favorite-toggle ${isFavorite ? "is-active" : ""} p-2 rounded-lg hover:bg-slate-800 transition-colors" data-favorite-info="${info.id}" aria-label="Favorito">
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                            </button>
                        </div>
                    </div>
                    <h4 class="mb-2 font-orbitron font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">${info.titulo}</h4>
                    <p class="mb-6 text-sm text-slate-400 leading-relaxed">${info.desc}</p>
                    
                    <div class="flex flex-col gap-3">
                        <div class="flex items-center justify-between">
                            <a href="${info.archivo}" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm font-bold hover:bg-indigo-500/20 transition-all border border-indigo-500/30" data-infografia-link>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                Visualizar
                            </a>
                            <a href="${info.archivo}" download class="ml-2 p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700" title="Descargar">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            </a>
                        </div>
                        
                        <div class="flex items-center justify-between pt-2 border-t border-slate-800/50">
                            <button type="button" class="text-[10px] font-black tracking-tighter text-slate-500 hover:text-indigo-400 transition-colors uppercase" data-infografia-toggle="${info.id}">
                                ${isCompleted ? "MARCADO" : "MARCAR REVISADO"}
                            </button>
                            <span class="flex items-center gap-1 text-[10px] font-bold text-emerald-400 ${isCompleted ? "" : "hidden"}" data-infografia-status>
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                COMPLETADO
                            </span>
                        </div>
                    </div>
                `;

                card.querySelector("[data-infografia-link]").addEventListener("click", () => {
                    markInfografiaAsVisited(info.id, card);
                    App.rememberVisit({
                        title: info.titulo,
                        subtitle: info.desc,
                        url: info.archivo,
                        kind: "infografia"
                    });
                });

                card.querySelector("[data-infografia-toggle]").addEventListener("click", (event) => {
                    const active = App.toggleProgress("infografias", event.currentTarget.dataset.infografiaToggle);
                    updateInfografiaCardStatus(card, Boolean(active));
                });

                card.querySelector("[data-favorite-info]").addEventListener("click", () => {
                    const active = App.toggleFavorite("infografias", {
                        id: info.id,
                        title: info.titulo,
                        subtitle: info.desc,
                        url: info.archivo,
                        color: info.color,
                        kind: "infografia"
                    });
                    App.showToast(active ? "Infografía guardada en favoritos" : "Infografía quitada de favoritos", "info");
                });

                updateInfografiaCardStatus(card, isCompleted);
                grid.appendChild(card);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        renderInfografias();
    });
})();
