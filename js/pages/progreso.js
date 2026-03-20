(function () {
    function createFavoriteCard(entry) {
        const styles = AcademyContent.colorStyles[entry.color] || AcademyContent.colorStyles.cyan;
        return `
            <div class="search-result-card rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <div class="text-xs uppercase tracking-[0.16em] ${styles.accentText}">${entry.kind}</div>
                        <h4 class="mt-2 font-semibold text-white">${entry.title}</h4>
                        <p class="mt-1 text-sm text-slate-400">${entry.subtitle || "Sin descripción"}</p>
                    </div>
                    <button type="button" class="favorite-toggle is-active" data-remove-favorite="${entry.category}:${entry.id}" aria-label="Quitar favorito">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                    </button>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                    <a href="${entry.url}" class="study-chip ${styles.accentText}">Abrir</a>
                </div>
            </div>
        `;
    }

    function renderSummary(user) {
        const favorites = App.getFavorites();
        const favoriteCount = Object.values(favorites).reduce((sum, list) => sum + list.length, 0);
        App.setText("favoriteCount", favoriteCount);
        App.setText("wrongCount", App.getWrongQuestions().length);
        App.setText("flaggedCount", App.getFlaggedQuestions().length);
        App.setText("recentSessionsCount", user.results.tests.length);
    }

    function renderContinue() {
        const lastVisited = App.getLastVisited();
        const draft = App.getTestDraft();
        const wrongCount = App.getWrongQuestions().length;
        const flaggedCount = App.getFlaggedQuestions().length;

        const continueCard = document.getElementById("continueCard");
        const wrongCard = document.getElementById("wrongQuestionsCard");
        const flaggedCard = document.getElementById("flaggedQuestionsCard");

        if (continueCard) {
            continueCard.innerHTML = draft
                ? `
                    <div class="text-xs uppercase tracking-[0.16em] text-emerald-300">Continuar test</div>
                    <h3 class="mt-3 font-orbitron text-xl text-white">${draft.title || "Test en curso"}</h3>
                    <p class="mt-2 text-sm text-slate-300">Pregunta ${Number(draft.currentQuestionIndex || 0) + 1} de ${draft.totalQuestions || draft.questions?.length || 0}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                        <a href="tests.html?resume=1" class="study-chip text-emerald-200">Seguir donde lo dejaste</a>
                    </div>
                `
                : `
                    <div class="text-xs uppercase tracking-[0.16em] text-emerald-300">Último recurso</div>
                    <h3 class="mt-3 font-orbitron text-xl text-white">${lastVisited?.title || "Aún no has abierto ningún recurso"}</h3>
                    <p class="mt-2 text-sm text-slate-300">${lastVisited?.subtitle || "Cuando empieces a estudiar aparecerá aquí tu último contenido visitado."}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${lastVisited?.url ? `<a href="${lastVisited.url}" class="study-chip text-emerald-200">Abrir último recurso</a>` : '<a href="temas.html" class="study-chip text-emerald-200">Empezar a estudiar</a>'}
                    </div>
                `;
        }

        if (wrongCard) {
            wrongCard.innerHTML = `
                <div class="text-xs uppercase tracking-[0.16em] text-rose-300">Repaso inteligente</div>
                <h3 class="mt-3 font-orbitron text-xl text-white">${wrongCount} preguntas falladas guardadas</h3>
                <p class="mt-2 text-sm text-slate-300">Lanza un test solo con preguntas incorrectas para consolidar memoria de examen.</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    <a href="tests.html?test=falladas" class="study-chip text-rose-200">Repasar falladas</a>
                    <a href="tests.html?test=aleatorio_50" class="study-chip text-rose-200">Aleatorio de 50</a>
                </div>
            `;
        }

        if (flaggedCard) {
            flaggedCard.innerHTML = `
                <div class="text-xs uppercase tracking-[0.16em] text-cyan-300">Preguntas dudosas</div>
                <h3 class="mt-3 font-orbitron text-xl text-white">${flaggedCount} marcadas para revisar</h3>
                <p class="mt-2 text-sm text-slate-300">Las dudas del test quedan guardadas para que no se pierdan entre sesiones.</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    <a href="tests.html" class="study-chip text-cyan-200">Ir a tests</a>
                    <a href="tests.html?test=aleatorio_20" class="study-chip text-cyan-200">Sprint de 20</a>
                </div>
            `;
        }
    }

    function renderSearch(query = "") {
        const results = App.searchLibrary(query).slice(0, 30);
        const container = document.getElementById("searchResults");
        if (!container) return;

        if (!results.length) {
            container.innerHTML = '<p class="text-slate-400">No hay coincidencias.</p>';
            return;
        }

        container.innerHTML = results.map((entry) => {
            const styles = AcademyContent.colorStyles[entry.color] || AcademyContent.colorStyles.cyan;
            const isFavorite = App.isFavorite(entry.category, entry.id);
            return `
                <article class="search-result-card rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div class="min-w-0">
                            <div class="text-xs uppercase tracking-[0.16em] ${styles.accentText}">${entry.kind}</div>
                            <h3 class="mt-1 font-semibold text-white">${entry.title}</h3>
                            <p class="mt-1 text-sm text-slate-400">${entry.subtitle}</p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <a href="${entry.url}" class="study-chip ${styles.accentText}">Abrir</a>
                            <button type="button" class="favorite-toggle ${isFavorite ? "is-active" : ""}" data-search-favorite="${entry.category}:${entry.id}" aria-label="Favorito">
                                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61L12 17.771l-4.734 2.768a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.325 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"/></svg>
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join("");

        container.querySelectorAll("[data-search-favorite]").forEach((button) => {
            button.addEventListener("click", () => {
                const [category, id] = button.dataset.searchFavorite.split(":");
                const entry = App.searchLibrary("").find((item) => item.category === category && item.id === id);
                if (!entry) return;
                const active = App.toggleFavorite(category, entry);
                App.showToast(active ? "Guardado en favoritos" : "Quitado de favoritos", "info");
                renderSummary(App.getCurrentUser());
                renderFavorites();
                renderSearch(document.getElementById("searchLibraryInput")?.value || "");
            });
        });
    }

    function renderFavorites() {
        const container = document.getElementById("favoritesSections");
        if (!container) return;

        const favorites = App.getFavorites();
        const groups = Object.entries(favorites).filter(([, items]) => items.length);

        if (!groups.length) {
            container.innerHTML = '<p class="text-slate-400">Aún no has guardado favoritos.</p>';
            return;
        }

        container.innerHTML = groups.map(([group, items]) => `
            <section class="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <h3 class="font-orbitron text-lg text-white capitalize">${group}</h3>
                <div class="mt-4 grid gap-3">
                    ${items.slice(0, 6).map(createFavoriteCard).join("")}
                </div>
            </section>
        `).join("");

        container.querySelectorAll("[data-remove-favorite]").forEach((button) => {
            button.addEventListener("click", () => {
                const [category, id] = button.dataset.removeFavorite.split(":");
                const entry = App.getFavorites(category).find((item) => item.id === id);
                if (!entry) return;
                App.toggleFavorite(category, entry);
                renderSummary(App.getCurrentUser());
                renderFavorites();
                renderSearch(document.getElementById("searchLibraryInput")?.value || "");
            });
        });
    }

    function renderRecentResults(user) {
        const container = document.getElementById("recentResults");
        if (!container) return;
        if (!user.results.tests.length) {
            container.innerHTML = '<p class="text-slate-400">Todavía no hay resultados guardados.</p>';
            return;
        }

        container.innerHTML = user.results.tests.slice(0, 8).map((result) => `
            <article class="search-result-card rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 class="font-semibold text-white">${result.testName}</h3>
                        <p class="text-sm text-slate-400">${result.correctAnswers}/${result.totalQuestions} correctas · ${new Date(result.completedAt).toLocaleString("es-ES")}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="study-chip ${result.scorePercent >= 70 ? "text-emerald-300" : "text-amber-300"}">${result.scorePercent}%</span>
                        <a href="tests.html?test=${encodeURIComponent(result.testId)}" class="study-chip text-cyan-300">Repetir</a>
                    </div>
                </div>
            </article>
        `).join("");
    }

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;

        renderSummary(user);
        renderContinue();
        renderFavorites();
        renderSearch();
        renderRecentResults(user);

        document.getElementById("searchLibraryInput")?.addEventListener("input", (event) => {
            renderSearch(event.target.value);
        });
    });
})();
