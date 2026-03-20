(function () {
    let selectedPresentationId = null;

    function canUseOnlineViewer() {
        return window.location.protocol === "http:" || window.location.protocol === "https:";
    }

    function getPresentations() {
        return AcademyContent.presentations || [];
    }

    function getSelectedPresentation() {
        const presentations = getPresentations();
        return presentations.find((item) => item.id === selectedPresentationId) || presentations[0] || null;
    }

    function getViewerUrl(filePath) {
        const source = encodeURIComponent(`${window.location.origin}/${filePath}`);
        return `https://view.officeapps.live.com/op/embed.aspx?src=${source}`;
    }

    function renderViewer(presentation) {
        const container = document.getElementById("presentationViewerContainer");
        const modeBadge = document.getElementById("viewerModeBadge");
        const openButton = document.getElementById("featuredOpenButton");
        const downloadButton = document.getElementById("featuredDownloadButton");
        const title = document.getElementById("featuredPresentationTitle");
        const desc = document.getElementById("featuredPresentationDesc");

        if (!container || !openButton || !downloadButton || !title || !desc || !presentation) return;

        title.textContent = presentation.titulo;
        desc.textContent = presentation.desc;
        downloadButton.href = presentation.archivo;
        App.rememberVisit({
            title: presentation.titulo,
            subtitle: presentation.desc,
            url: "presentaciones.html",
            kind: "presentacion"
        });

        if (modeBadge) {
            modeBadge.textContent = canUseOnlineViewer() ? "Online" : "Local";
            modeBadge.className = canUseOnlineViewer() ? "font-orbitron text-lg text-emerald-400" : "font-orbitron text-lg text-amber-400";
        }

        openButton.onclick = () => {
            App.updateProgress("presentaciones", presentation.id);
            if (canUseOnlineViewer()) {
                const viewer = container.querySelector("iframe");
                if (viewer) {
                    viewer.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } else {
                App.showToast("En local se abrirá el archivo directamente.", "info");
                window.open(presentation.archivo, "_blank");
            }
            renderLibrary();
        };

        if (canUseOnlineViewer()) {
            container.innerHTML = `
                <iframe
                    title="${presentation.titulo}"
                    class="h-[420px] w-full md:h-[560px] xl:h-[680px]"
                    src="${getViewerUrl(presentation.archivo)}"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            `;
        } else {
            container.innerHTML = `
                <div class="flex h-full min-h-[420px] flex-col items-center justify-center gap-5 p-8 text-center">
                    <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-300">
                        <svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-orbitron text-2xl text-white">Vista online no disponible en file://</h3>
                        <p class="mt-3 max-w-xl text-slate-400">Cuando la subas a Render y se sirva por https, esta zona mostrará la presentación embebida. Mientras tanto puedes abrir o descargar el archivo directamente.</p>
                    </div>
                    <div class="flex flex-wrap justify-center gap-3">
                        <a href="${presentation.archivo}" target="_blank" class="rounded-xl bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/30">Abrir archivo</a>
                        <a href="${presentation.archivo}" download class="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">Descargar PPTX</a>
                    </div>
                </div>
            `;
        }
    }

    function renderLibrary() {
        const list = document.getElementById("presentacionesGrid");
        const count = document.getElementById("presentacionesCount");
        const presentations = getPresentations();
        const completed = new Set(App.getProgress("presentaciones"));
        const selected = getSelectedPresentation();

        if (!list) return;

        if (count) {
            count.textContent = `${presentations.length} archivo${presentations.length === 1 ? "" : "s"}`;
        }

        if (!presentations.length) {
            list.innerHTML = '<p class="text-slate-400">No hay presentaciones disponibles.</p>';
            return;
        }

        list.innerHTML = "";

        presentations.forEach((presentation) => {
            const styles = AcademyContent.colorStyles[presentation.color] || AcademyContent.colorStyles.cyan;
            const button = document.createElement("button");
            const isActive = selected && selected.id === presentation.id;
            const isFavorite = App.isFavorite("presentaciones", presentation.id);
            button.type = "button";
            button.className = `presentation-item rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-left transition hover:border-slate-600 ${isActive ? "is-active" : ""}`;
            button.innerHTML = `
                <div class="flex items-start justify-between gap-4">
                    <div class="flex items-start gap-3">
                        <div class="mt-1 flex h-11 w-11 items-center justify-center rounded-xl ${styles.badge}">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="font-semibold text-white">${presentation.titulo}</div>
                            <div class="mt-1 text-sm text-slate-400">${presentation.desc}</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="rounded-full bg-slate-800 px-2 py-1 text-[11px] font-semibold text-slate-300">${presentation.type || "PPTX"}</span>
                        <span class="favorite-toggle ${isFavorite ? "is-active" : ""}" data-favorite-presentation="${presentation.id}">
                            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                        </span>
                    </div>
                </div>
                <div class="mt-4 flex items-center justify-between gap-3 text-xs">
                    <span class="${completed.has(presentation.id) ? "text-emerald-400" : "text-slate-500"}">${completed.has(presentation.id) ? "Revisada" : "Pendiente"}</span>
                    <span class="text-slate-500">${canUseOnlineViewer() ? "Vista embebida" : "Apertura local"}</span>
                </div>
            `;

            button.addEventListener("click", () => {
                selectedPresentationId = presentation.id;
                App.updateProgress("presentaciones", presentation.id);
                renderViewer(presentation);
                renderLibrary();
            });

            button.querySelector("[data-favorite-presentation]")?.addEventListener("click", (event) => {
                event.stopPropagation();
                const active = App.toggleFavorite("presentaciones", {
                    id: presentation.id,
                    title: presentation.titulo,
                    subtitle: presentation.desc,
                    url: "presentaciones.html",
                    color: presentation.color,
                    kind: "presentacion"
                });
                App.showToast(active ? "Presentación guardada en favoritos" : "Presentación quitada de favoritos", "info");
                renderLibrary();
            });

            list.appendChild(button);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;

        const [firstPresentation] = getPresentations();
        selectedPresentationId = firstPresentation ? firstPresentation.id : null;
        renderViewer(getSelectedPresentation());
        renderLibrary();
    });
})();
