(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        
        App.showSupportModal();

        const content = window.AcademyContent;
        const totalTests = Object.keys(window.testsData || {}).filter((key) => !["bloque1", "bloque2", "bloque3", "completo"].includes(key)).length;

        App.setText("welcomeName", user.name);
        App.setText("testsCompleted", user.stats.testsCompleted || 0);
        App.setText("correctAnswers", user.stats.correctAnswers || 0);
        App.setText("streak", App.calculateStreak(user.stats.activityDates || []));

        // Update streak badge
        updateStreakBadge();
        
        // Render resume widget
        renderResumeWidget();
        
        // Render bookmarks
        renderBookmarks();

        const accuracy = user.stats.totalQuestions > 0
            ? Math.round((user.stats.correctAnswers / user.stats.totalQuestions) * 100)
            : 0;
        App.setText("accuracy", `${accuracy}%`);

        const progressMap = [
            ["temas", content.topics.length, "temasProgress", "temasProgressBar"],
            ["tests", totalTests, "testsProgress", "testsProgressBar"],
            ["videos", content.videos.length, "videosProgress", "videosProgressBar"],
            ["podcasts", content.podcasts.length, "podcastsProgress", "podcastsProgressBar"],
            ["lecturas", content.readings.length, "lecturasProgress", "lecturasProgressBar"],
            ["esquemas", (content.esquemas || []).length, "esquemasProgress", "esquemasProgressBar"],
            ["infografias", (content.infografias || []).length, "infografiasProgress", "infografiasProgressBar"],
            ["presentaciones", content.presentations.length, "presentacionesProgress", "presentacionesProgressBar"],
            ["organigramas", (content.organigrams || []).length, "organigramasProgress", "organigramasProgressBar"]
        ];

        progressMap.forEach(([category, total, labelId, barId]) => {
            const done = App.getProgress(category).length;
            const percent = total > 0 ? Math.round((done / total) * 100) : 0;
            App.setText(labelId, `${percent}%`);
            App.setWidth(barId, percent);
        });
        
        // Show streak warning if at risk
        if (typeof Streak !== 'undefined' && Streak.isAtRisk()) {
            showStreakWarning();
        }
    });
    
    function updateStreakBadge() {
        const streakBadge = document.getElementById('streakBadge');
        if (!streakBadge) return;
        
        const streak = typeof Streak !== 'undefined' ? Streak.getCurrent() : 0;
        const isAtRisk = typeof Streak !== 'undefined' && Streak.isAtRisk();
        
        streakBadge.innerHTML = `
            <div class="flex items-center gap-2 px-3 py-2 rounded-xl ${isAtRisk ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-slate-800/50'}">
                <span class="text-lg">${isAtRisk ? '⚠️' : '🔥'}</span>
                <span class="font-bold ${isAtRisk ? 'text-amber-400' : 'text-white'}">${streak}</span>
                <span class="text-xs ${isAtRisk ? 'text-amber-300' : 'text-slate-400'}">días</span>
            </div>
        `;
    }
    
    function renderResumeWidget() {
        const container = document.getElementById('resumeWidget');
        if (!container) return;
        
        const last = typeof History !== 'undefined' ? History.getLast() : null;
        
        if (!last) {
            container.innerHTML = `
                <div class="text-center py-6 text-slate-500">
                    <p class="text-sm">No hay contenido reciente</p>
                    <p class="text-xs mt-1">Explora podcasts, vídeos o tests para continuar</p>
                </div>
            `;
            return;
        }
        
        const icons = { podcast: '🎧', video: '🎬', lectura: '📖', test: '📝' };
        const progress = last.progress || 0;
        const percent = Math.round(progress * 100);
        
        container.innerHTML = `
            <div class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                <div class="text-3xl">${icons[last.type] || '📚'}</div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs text-emerald-400 font-medium mb-1">Continuar donde lo dejaste</p>
                    <p class="text-white font-semibold truncate">${last.title || 'Contenido'}</p>
                    <div class="mt-2 flex items-center gap-2">
                        <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div class="h-full bg-emerald-500 rounded-full transition-all" style="width: ${percent}%"></div>
                        </div>
                        <span class="text-xs text-slate-400">${percent}%</span>
                    </div>
                </div>
                <a href="${last.url}" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors">
                    Continuar
                </a>
            </div>
        `;
    }
    
    function renderBookmarks() {
        const container = document.getElementById('bookmarksWidget');
        if (!container) return;
        
        const user = App.getCurrentUser();
        if (!user) return;
        
        const allFavorites = [];
        const favorites = user.favorites || {};
        
        Object.entries(favorites).forEach(([category, items]) => {
            if (Array.isArray(items)) {
                items.slice(0, 3).forEach(item => {
                    allFavorites.push({ ...item, category });
                });
            }
        });
        
        if (allFavorites.length === 0) {
            container.innerHTML = `
                <div class="text-center py-6 text-slate-500">
                    <p class="text-sm">No tienes favoritos guardados</p>
                    <p class="text-xs mt-1">Guarda contenido importante para verlo aquí</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${allFavorites.slice(0, 4).map(item => {
                    const icons = { temas: '📚', videos: '🎬', podcasts: '🎧', lecturas: '📖', tests: '📝' };
                    return `
                        <a href="${item.url}" class="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors">
                            <span class="text-xl">${icons[item.category] || '📌'}</span>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-white truncate">${item.title}</p>
                                <p class="text-xs text-slate-500 truncate">${item.subtitle || item.kind}</p>
                            </div>
                            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    `;
                }).join('')}
            </div>
            ${allFavorites.length > 4 ? `<p class="text-center text-xs text-slate-500 mt-3">+${allFavorites.length - 4} más en tus favoritos</p>` : ''}
        `;
    }
    
    function showStreakWarning() {
        const container = document.getElementById('streakWarning');
        if (!container) return;
        
        container.innerHTML = `
            <div class="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
                <span class="text-2xl">⚠️</span>
                <div class="flex-1">
                    <p class="text-amber-400 font-semibold">¡No olvides tu racha!</p>
                    <p class="text-amber-300/70 text-sm">Interactúa con cualquier contenido para mantener tu racha de estudio.</p>
                </div>
            </div>
        `;
    }
})();
