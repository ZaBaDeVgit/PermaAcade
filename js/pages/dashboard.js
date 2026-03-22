(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;

        const content = window.AcademyContent;
        const totalTests = Object.keys(window.testsData || {}).filter((key) => !["bloque1", "bloque2", "bloque3", "completo"].includes(key)).length;

        App.setText("welcomeName", user.name);
        App.setText("testsCompleted", user.stats.testsCompleted || 0);
        App.setText("correctAnswers", user.stats.correctAnswers || 0);
        App.setText("streak", App.calculateStreak(user.stats.activityDates || []));

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
    });
})();
