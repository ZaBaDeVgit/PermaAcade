(function () {
    const ICON = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
    `;

    function createTopicCard(topic, completed) {
        const styles = AcademyContent.colorStyles[topic.color];
        const isFavorite = App.isFavorite("temas", topic.id);
        const card = document.createElement("article");
        card.className = `tema-card bg-slate-900/50 border border-slate-800/50 rounded-xl p-6 transition-all ${styles.accentBorder}`;

        const header = document.createElement("div");
        header.className = "mb-4 flex items-center justify-between";

        const badge = document.createElement("div");
        badge.className = `flex h-12 w-12 items-center justify-center rounded-xl ${styles.badge}`;
        badge.innerHTML = `<span class="font-bold text-lg">${topic.number}</span>`;

        header.appendChild(badge);

        const headerActions = document.createElement("div");
        headerActions.className = "flex items-center gap-2";

        if (completed) {
            const done = document.createElement("span");
            done.className = "text-sm text-emerald-400";
            done.textContent = "✓ Completado";
            headerActions.appendChild(done);
        }

        const favorite = document.createElement("button");
        favorite.type = "button";
        favorite.className = `favorite-toggle ${isFavorite ? "is-active" : ""}`;
        favorite.setAttribute("aria-label", "Favorito");
        favorite.innerHTML = '<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>';
        favorite.addEventListener("click", (event) => {
            event.preventDefault();
            const active = App.toggleFavorite("temas", {
                id: topic.id,
                title: topic.title,
                subtitle: topic.desc,
                url: topic.pdf,
                color: topic.color,
                kind: "tema"
            });
            App.showToast(active ? "Tema guardado en favoritos" : "Tema quitado de favoritos", "info");
            renderTopics(document.getElementById("searchInput")?.value || "");
        });
        headerActions.appendChild(favorite);
        header.appendChild(headerActions);

        const title = document.createElement("h3");
        title.className = "mb-2 text-lg font-semibold text-white";
        title.textContent = topic.title;

        const desc = document.createElement("p");
        desc.className = "mb-4 text-sm text-slate-400";
        desc.textContent = topic.desc;

        const link = document.createElement("a");
        link.href = topic.pdf;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = `inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${styles.button}`;
        link.innerHTML = `${ICON}<span>Leer PDF</span>`;
        link.addEventListener("click", () => {
            App.updateProgress("temas", topic.id);
            App.rememberVisit({
                title: topic.title,
                subtitle: topic.desc,
                url: topic.pdf,
                kind: "tema"
            });
        });

        card.appendChild(header);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(link);

        return card;
    }

    function renderTopics(filter = "") {
        const grid = document.getElementById("temasGrid");
        if (!grid) return;

        const completed = new Set(App.getProgress("temas"));
        const normalized = filter.trim().toLowerCase();
        const topics = AcademyContent.topics.filter((topic) => {
            return !normalized || topic.title.toLowerCase().includes(normalized) || topic.desc.toLowerCase().includes(normalized);
        });

        grid.innerHTML = "";
        topics.forEach((topic) => {
            grid.appendChild(createTopicCard(topic, completed.has(topic.id)));
        });
    }

    function filterTemas() {
        const value = document.getElementById("searchInput")?.value || "";
        renderTopics(value);
    }

    window.filterTemas = filterTemas;

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        renderTopics();
    });
})();
