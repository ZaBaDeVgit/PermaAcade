// Shared application runtime for the static academy site.
// Features: Dark mode, search, streak, shortcuts, analytics
(function () {
    // Initialize utilities on load
    document.addEventListener('DOMContentLoaded', () => {
        // Theme must init first to prevent flash
        if (typeof Theme !== 'undefined') Theme.init();
        
        // Search UI
        if (typeof Search !== 'undefined') Search.createUI();
        
        // Keyboard shortcuts
        if (typeof Shortcuts !== 'undefined') Shortcuts.init();
        
        // Analytics
        if (typeof Analytics !== 'undefined') Analytics.init();
    });
    const STORAGE_KEYS = {
        users: "academy.users",
        currentUserId: "academy.currentUserId",
        appVersion: "academy.appVersion",
        contentFingerprint: "academy.contentFingerprint"
    };

    function safeParse(value, fallback) {
        try {
            return JSON.parse(value);
        } catch {
            return fallback;
        }
    }

    function normalizeEmail(email) {
        return String(email || "").trim().toLowerCase();
    }

    function sanitizeName(name) {
        return String(name || "")
            .replace(/\s+/g, " ")
            .replace(/[<>]/g, "")
            .trim()
            .slice(0, 60);
    }

    function normalizeFavoriteEntry(entry, category) {
        if (!entry || typeof entry !== "object") return null;
        if (!entry.id) return null;

        return {
            id: String(entry.id),
            category: String(entry.category || category || "general"),
            title: String(entry.title || "Elemento"),
            subtitle: String(entry.subtitle || ""),
            url: String(entry.url || "#"),
            color: String(entry.color || "cyan"),
            kind: String(entry.kind || category || "general"),
            savedAt: entry.savedAt || new Date().toISOString()
        };
    }

    function calculateStreak(activityDates) {
        const uniqueDates = [...new Set(activityDates || [])].sort().reverse();
        if (uniqueDates.length === 0) return 0;

        let streak = 0;
        let cursor = new Date();
        cursor.setHours(0, 0, 0, 0);

        for (const activityDate of uniqueDates) {
            const entry = new Date(activityDate);
            entry.setHours(0, 0, 0, 0);

            if (entry.getTime() === cursor.getTime()) {
                streak += 1;
                cursor.setDate(cursor.getDate() - 1);
                continue;
            }

            if (streak === 0) {
                const yesterday = new Date(cursor);
                yesterday.setDate(yesterday.getDate() - 1);
                if (entry.getTime() === yesterday.getTime()) {
                    streak += 1;
                    cursor = yesterday;
                }
            }

            break;
        }

        return streak;
    }

    function ensureUserShape(user) {
        const progress = user.progress || {};
        const stats = user.stats || {};
        const results = user.results || {};

        return {
            id: user.id || `user_${Date.now()}`,
            name: sanitizeName(user.name) || "Alumno",
            email: normalizeEmail(user.email),
            passwordHash: user.passwordHash || null,
            password: user.password || null,
            createdAt: user.createdAt || new Date().toISOString(),
            progress: {
                temas: Array.isArray(progress.temas) ? progress.temas : [],
                tests: Array.isArray(progress.tests) ? progress.tests : [],
                videos: Array.isArray(progress.videos) ? progress.videos : [],
                podcasts: Array.isArray(progress.podcasts) ? progress.podcasts : [],
                lecturas: Array.isArray(progress.lecturas) ? progress.lecturas : [],
                esquemas: Array.isArray(progress.esquemas) ? progress.esquemas : [],
                infografias: Array.isArray(progress.infografias) ? progress.infografias : [],
                presentaciones: Array.isArray(progress.presentaciones) ? progress.presentaciones : [],
                organigramas: Array.isArray(progress.organigramas) ? progress.organigramas : []
            },
            results: {
                tests: Array.isArray(results.tests) ? results.tests : []
            },
            favorites: {
                temas: Array.isArray(user.favorites?.temas) ? user.favorites.temas.map((entry) => normalizeFavoriteEntry(entry, "temas")).filter(Boolean) : [],
                tests: Array.isArray(user.favorites?.tests) ? user.favorites.tests.map((entry) => normalizeFavoriteEntry(entry, "tests")).filter(Boolean) : [],
                videos: Array.isArray(user.favorites?.videos) ? user.favorites.videos.map((entry) => normalizeFavoriteEntry(entry, "videos")).filter(Boolean) : [],
                podcasts: Array.isArray(user.favorites?.podcasts) ? user.favorites.podcasts.map((entry) => normalizeFavoriteEntry(entry, "podcasts")).filter(Boolean) : [],
                lecturas: Array.isArray(user.favorites?.lecturas) ? user.favorites.lecturas.map((entry) => normalizeFavoriteEntry(entry, "lecturas")).filter(Boolean) : [],
                esquemas: Array.isArray(user.favorites?.esquemas) ? user.favorites.esquemas.map((entry) => normalizeFavoriteEntry(entry, "esquemas")).filter(Boolean) : [],
                infografias: Array.isArray(user.favorites?.infografias) ? user.favorites.infografias.map((entry) => normalizeFavoriteEntry(entry, "infografias")).filter(Boolean) : [],
                presentaciones: Array.isArray(user.favorites?.presentaciones) ? user.favorites.presentaciones.map((entry) => normalizeFavoriteEntry(entry, "presentaciones")).filter(Boolean) : [],
                organigramas: Array.isArray(user.favorites?.organigramas) ? user.favorites.organigramas.map((entry) => normalizeFavoriteEntry(entry, "organigramas")).filter(Boolean) : []
            },
            study: {
                lastVisited: user.study?.lastVisited && typeof user.study.lastVisited === "object" ? {
                    title: String(user.study.lastVisited.title || ""),
                    subtitle: String(user.study.lastVisited.subtitle || ""),
                    url: String(user.study.lastVisited.url || ""),
                    kind: String(user.study.lastVisited.kind || ""),
                    updatedAt: user.study.lastVisited.updatedAt || null
                } : null,
                lastTestDraft: user.study?.lastTestDraft && typeof user.study.lastTestDraft === "object" ? user.study.lastTestDraft : null,
                wrongQuestions: Array.isArray(user.study?.wrongQuestions) ? user.study.wrongQuestions : [],
                flaggedQuestions: Array.isArray(user.study?.flaggedQuestions) ? user.study.flaggedQuestions : []
            },
            stats: {
                testsCompleted: Number(stats.testsCompleted) || 0,
                correctAnswers: Number(stats.correctAnswers) || 0,
                totalQuestions: Number(stats.totalQuestions) || 0,
                streakDays: Number(stats.streakDays) || 0,
                lastActivity: stats.lastActivity || null,
                activityDates: Array.isArray(stats.activityDates) ? stats.activityDates : []
            }
        };
    }

    function loadUsers() {
        const legacyUsers = safeParse(localStorage.getItem("users"), null);
        const stored = safeParse(localStorage.getItem(STORAGE_KEYS.users), legacyUsers || []);
        const users = Array.isArray(stored) ? stored.map(ensureUserShape) : [];
        saveUsers(users);
        return users;
    }

    function saveUsers(users) {
        const normalized = users.map(ensureUserShape);
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(normalized));
        localStorage.setItem("users", JSON.stringify(normalized));
    }

    function saveCurrentUserId(userId) {
        if (userId) {
            localStorage.setItem(STORAGE_KEYS.currentUserId, userId);
        } else {
            localStorage.removeItem(STORAGE_KEYS.currentUserId);
        }
    }

    function loadCurrentUser() {
        const users = loadUsers();
        const currentUserId = localStorage.getItem(STORAGE_KEYS.currentUserId);
        const legacyCurrentUser = safeParse(localStorage.getItem("currentUser"), null);

        let user = users.find((entry) => entry.id === currentUserId) || null;
        if (!user && legacyCurrentUser) {
            user = users.find((entry) => entry.email === normalizeEmail(legacyCurrentUser.email)) || null;
        }

        if (!user) {
            localStorage.removeItem("currentUser");
            return null;
        }

        persistCurrentUser(user);
        return user;
    }

    function persistCurrentUser(user) {
        const normalized = ensureUserShape(user);
        const users = loadUsers();
        const index = users.findIndex((entry) => entry.id === normalized.id);

        if (index >= 0) {
            users[index] = normalized;
        } else {
            users.push(normalized);
        }

        saveUsers(users);
        saveCurrentUserId(normalized.id);
        localStorage.setItem("currentUser", JSON.stringify(normalized));
        return normalized;
    }

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(String(password || ""));
        const digest = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(digest))
            .map((value) => value.toString(16).padStart(2, "0"))
            .join("");
    }

    function todayIsoDate() {
        return new Date().toISOString().slice(0, 10);
    }

    function touchActivity(user) {
        const normalized = ensureUserShape(user);
        const activityDate = todayIsoDate();

        if (!normalized.stats.activityDates.includes(activityDate)) {
            normalized.stats.activityDates.push(activityDate);
        }

        normalized.stats.lastActivity = new Date().toISOString();
        normalized.stats.streakDays = calculateStreak(normalized.stats.activityDates);
        
        // Also update standalone streak utility for non-auth features
        if (typeof Streak !== 'undefined' && App.isLoggedIn()) {
            const streakResult = Streak.increment();
            if (streakResult.isMilestone) {
                setTimeout(() => Streak.celebrate(streakResult.streak), 500);
            }
        }
        
        return normalized;
    }

    async function login(email, password) {
        const users = loadUsers();
        const normalizedEmail = normalizeEmail(email);
        const candidate = users.find((user) => user.email === normalizedEmail);

        if (!candidate) {
            throw new Error("Email o contraseña incorrectos");
        }

        let valid = false;
        if (candidate.passwordHash) {
            valid = candidate.passwordHash === await hashPassword(password);
        } else if (candidate.password) {
            valid = candidate.password === String(password);
            if (valid) {
                candidate.passwordHash = await hashPassword(password);
                candidate.password = null;
            }
        }

        if (!valid) {
            throw new Error("Email o contraseña incorrectos");
        }

        const updatedUser = touchActivity(candidate);
        persistCurrentUser(updatedUser);
        return updatedUser;
    }

    async function register(name, email, password) {
        const users = loadUsers();
        const normalizedEmail = normalizeEmail(email);
        const normalizedName = sanitizeName(name);
        const normalizedPassword = String(password || "");

        if (!normalizedName) {
            throw new Error("Introduce un nombre válido");
        }

        if (normalizedPassword.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }

        if (users.some((user) => user.email === normalizedEmail)) {
            throw new Error("Este email ya está registrado");
        }

        const newUser = touchActivity({
            id: `user_${Date.now()}`,
            name: normalizedName,
            email: normalizedEmail,
            passwordHash: await hashPassword(normalizedPassword),
            createdAt: new Date().toISOString()
        });

        persistCurrentUser(newUser);
        return newUser;
    }

    function logout() {
        saveCurrentUserId(null);
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    }

    function requireAuth() {
        const user = loadCurrentUser();
        if (!user) {
            window.location.href = "index.html";
            return null;
        }

        return user;
    }

    function getCurrentUser() {
        return loadCurrentUser();
    }

    function getProgress(category) {
        const user = loadCurrentUser();
        if (!user) return [];
        return user.progress[category] || [];
    }

    function getFavorites(category = null) {
        const user = loadCurrentUser();
        if (!user) return category ? [] : {};
        if (category) {
            return user.favorites?.[category] || [];
        }
        return user.favorites || {};
    }

    function isFavorite(category, itemId) {
        return getFavorites(category).some((entry) => entry.id === itemId);
    }

    function toggleFavorite(category, entry) {
        const user = requireAuth();
        if (!user) return false;
        if (!user.favorites[category]) {
            user.favorites[category] = [];
        }

        const existingIndex = user.favorites[category].findIndex((favorite) => favorite.id === entry.id);
        let active = false;

        if (existingIndex >= 0) {
            user.favorites[category].splice(existingIndex, 1);
        } else {
            user.favorites[category].unshift(normalizeFavoriteEntry(entry, category));
            active = true;
        }

        persistCurrentUser(touchActivity(user));
        return active;
    }

    function rememberVisit(entry) {
        const user = requireAuth();
        if (!user) return null;

        user.study.lastVisited = {
            title: String(entry?.title || ""),
            subtitle: String(entry?.subtitle || ""),
            url: String(entry?.url || ""),
            kind: String(entry?.kind || ""),
            updatedAt: new Date().toISOString()
        };

        const updatedUser = touchActivity(user);
        persistCurrentUser(updatedUser);
        return updatedUser.study.lastVisited;
    }

    function getLastVisited() {
        return loadCurrentUser()?.study?.lastVisited || null;
    }

    function saveTestDraft(draft) {
        const user = requireAuth();
        if (!user) return null;
        user.study.lastTestDraft = draft ? { ...draft, savedAt: new Date().toISOString() } : null;
        const updatedUser = touchActivity(user);
        persistCurrentUser(updatedUser);
        return updatedUser.study.lastTestDraft;
    }

    function getTestDraft() {
        return loadCurrentUser()?.study?.lastTestDraft || null;
    }

    function clearTestDraft() {
        return saveTestDraft(null);
    }

    function mergeQuestionEntries(existingEntries, incomingEntries) {
        const map = new Map((existingEntries || []).map((entry) => [entry.key, entry]));
        (incomingEntries || []).forEach((entry) => {
            if (!entry?.key) return;
            map.set(entry.key, {
                ...map.get(entry.key),
                ...entry,
                updatedAt: new Date().toISOString()
            });
        });
        return Array.from(map.values());
    }

    function saveWrongQuestions(entries) {
        const user = requireAuth();
        if (!user) return [];
        user.study.wrongQuestions = mergeQuestionEntries(user.study.wrongQuestions, entries);
        const updatedUser = touchActivity(user);
        persistCurrentUser(updatedUser);
        return updatedUser.study.wrongQuestions;
    }

    function getWrongQuestions() {
        return loadCurrentUser()?.study?.wrongQuestions || [];
    }

    function toggleFlaggedQuestion(entry) {
        const user = requireAuth();
        if (!user || !entry?.key) return false;
        const index = user.study.flaggedQuestions.findIndex((item) => item.key === entry.key);
        let active = false;

        if (index >= 0) {
            user.study.flaggedQuestions.splice(index, 1);
        } else {
            user.study.flaggedQuestions.unshift({
                ...entry,
                updatedAt: new Date().toISOString()
            });
            active = true;
        }

        persistCurrentUser(touchActivity(user));
        return active;
    }

    function isFlaggedQuestion(key) {
        return (loadCurrentUser()?.study?.flaggedQuestions || []).some((entry) => entry.key === key);
    }

    function getFlaggedQuestions() {
        return loadCurrentUser()?.study?.flaggedQuestions || [];
    }

    function buildSearchIndex() {
        const items = [];
        const content = window.AcademyContent || {};
        const testsData = window.testsData || {};

        (content.topics || []).forEach((topic) => {
            items.push({
                id: topic.id,
                category: "temas",
                kind: "tema",
                title: topic.title,
                subtitle: topic.desc,
                color: topic.color,
                url: topic.pdf,
                pageUrl: "temas.html"
            });
        });

        (content.videos || []).forEach((video) => {
            items.push({
                id: video.id,
                category: "videos",
                kind: "video",
                title: video.titulo,
                subtitle: video.desc,
                color: video.color,
                url: "videos.html",
                pageUrl: "videos.html"
            });
        });

        (content.podcasts || []).forEach((podcast) => {
            items.push({
                id: podcast.id,
                category: "podcasts",
                kind: "podcast",
                title: podcast.title,
                subtitle: podcast.desc,
                color: podcast.color,
                url: "podcasts.html",
                pageUrl: "podcasts.html"
            });
        });

        (content.readings || []).forEach((reading) => {
            items.push({
                id: reading.id,
                category: "lecturas",
                kind: "lectura",
                title: reading.titulo,
                subtitle: reading.desc,
                color: reading.color,
                url: reading.archivo,
                pageUrl: "lecturas.html"
            });
        });

        (content.esquemas || []).forEach((item) => {
            items.push({
                id: item.id,
                category: "esquemas",
                kind: "esquema",
                title: item.titulo,
                subtitle: item.desc,
                color: item.color,
                url: "esquemas.html",
                pageUrl: "esquemas.html"
            });
        });

        (content.infografias || []).forEach((item) => {
            items.push({
                id: item.id,
                category: "infografias",
                kind: "infografia",
                title: item.titulo,
                subtitle: item.desc,
                color: item.color,
                url: item.archivo,
                pageUrl: "infografias.html"
            });
        });

        (content.presentations || []).forEach((presentation) => {
            items.push({
                id: presentation.id,
                category: "presentaciones",
                kind: "presentacion",
                title: presentation.titulo,
                subtitle: presentation.desc,
                color: presentation.color,
                url: "presentaciones.html",
                pageUrl: "presentaciones.html"
            });
        });

        (content.organigrams || []).forEach((organigram) => {
            items.push({
                id: organigram.id,
                category: "organigramas",
                kind: "organigrama",
                title: organigram.title,
                subtitle: organigram.description,
                color: organigram.color || "cyan",
                url: `organigrama/index.html#${encodeURIComponent(organigram.id)}`,
                pageUrl: `organigrama/index.html#${encodeURIComponent(organigram.id)}`
            });
        });

        Object.entries(testsData).forEach(([key, value]) => {
            if (!value?.questions?.length) return;
            items.push({
                id: key,
                category: "tests",
                kind: key.startsWith("examen_") ? "examen" : "test",
                title: value.title || key,
                subtitle: `${value.questions.length} preguntas`,
                color: key.startsWith("examen_") ? "rose" : "cyan",
                url: `tests.html?test=${encodeURIComponent(key)}`,
                pageUrl: `tests.html?test=${encodeURIComponent(key)}`
            });
        });

        items.push({
            id: "aleatorio_20",
            category: "tests",
            kind: "test",
            title: "Test aleatorio de 20 preguntas",
            subtitle: "Mezcla rápida de todo el temario",
            color: "emerald",
            url: "tests.html?test=aleatorio_20",
            pageUrl: "tests.html?test=aleatorio_20"
        });

        items.push({
            id: "falladas",
            category: "tests",
            kind: "test",
            title: "Repasar preguntas falladas",
            subtitle: "Solo preguntas incorrectas guardadas",
            color: "amber",
            url: "tests.html?test=falladas",
            pageUrl: "tests.html?test=falladas"
        });

        return items;
    }

    function searchLibrary(query = "") {
        const normalized = String(query || "").trim().toLowerCase();
        const index = buildSearchIndex();
        if (!normalized) {
            return index;
        }
        return index.filter((entry) => {
            return [entry.title, entry.subtitle, entry.kind, entry.category]
                .join(" ")
                .toLowerCase()
                .includes(normalized);
        });
    }

    function updateProgress(category, itemId) {
        const user = requireAuth();
        if (!user) return null;

        if (!user.progress[category]) {
            user.progress[category] = [];
        }

        if (!user.progress[category].includes(itemId)) {
            user.progress[category].push(itemId);
        }

        const updatedUser = touchActivity(user);
        persistCurrentUser(updatedUser);
        return updatedUser;
    }

    function toggleProgress(category, itemId) {
        const user = requireAuth();
        if (!user) return null;

        if (!user.progress[category]) {
            user.progress[category] = [];
        }

        const index = user.progress[category].indexOf(itemId);
        const nowActive = index < 0;

        if (nowActive) {
            user.progress[category].push(itemId);
        } else {
            user.progress[category].splice(index, 1);
        }

        const updatedUser = touchActivity(user);
        persistCurrentUser(updatedUser);
        return nowActive;
    }

    function recordTestSession(payload) {
        const user = requireAuth();
        if (!user) return null;

        const safePayload = {
            testId: payload.testId,
            testName: String(payload.testName || "Test"),
            totalQuestions: Number(payload.totalQuestions) || 0,
            correctAnswers: Number(payload.correctAnswers) || 0,
            wrongAnswers: Number(payload.wrongAnswers) || 0,
            scorePercent: Number(payload.scorePercent) || 0,
            completedAt: new Date().toISOString()
        };

        user.results.tests.unshift(safePayload);
        user.results.tests = user.results.tests.slice(0, 20);
        user.stats.testsCompleted += 1;
        user.stats.correctAnswers += safePayload.correctAnswers;
        user.stats.totalQuestions += safePayload.totalQuestions;
        user.progress.tests = Array.from(new Set([...(user.progress.tests || []), safePayload.testId]));

        const updatedUser = touchActivity(user);
        persistCurrentUser(updatedUser);
        return updatedUser;
    }

    function setText(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    function setWidth(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.style.width = `${Math.max(0, Math.min(100, value))}%`;
        }
    }

    function showToast(message, type = "success", duration = 3200) {
        document.querySelectorAll(".toast-notification").forEach((toast) => toast.remove());

        const palette = {
            success: "bg-emerald-500 border-emerald-400",
            error: "bg-red-500 border-red-400",
            warning: "bg-amber-500 border-amber-400",
            info: "bg-cyan-500 border-cyan-400"
        };

        const label = {
            success: "Correcto",
            error: "Error",
            warning: "Aviso",
            info: "Info"
        };

        const toast = document.createElement("div");
        toast.className = `toast-notification fixed top-4 right-4 z-[9999] max-w-sm rounded-xl border px-4 py-3 text-white shadow-2xl transition-all duration-300 translate-x-full ${palette[type] || palette.info}`;

        const content = document.createElement("div");
        content.className = "flex items-start gap-3";

        const badge = document.createElement("span");
        badge.className = "rounded-md bg-black/15 px-2 py-1 text-xs font-semibold uppercase tracking-wide";
        badge.textContent = label[type] || label.info;

        const text = document.createElement("p");
        text.className = "flex-1 text-sm font-medium leading-5";
        text.textContent = message;

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "rounded-md p-1 hover:bg-white/15";
        closeButton.setAttribute("aria-label", "Cerrar aviso");
        closeButton.textContent = "×";
        closeButton.addEventListener("click", () => toast.remove());

        content.appendChild(badge);
        content.appendChild(text);
        content.appendChild(closeButton);
        toast.appendChild(content);
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove("translate-x-full");
        });

        window.setTimeout(() => {
            toast.classList.add("translate-x-full");
            window.setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    function updateUserChrome(user) {
        const yearElement = document.getElementById("currentYear");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        const avatar = document.getElementById("userAvatar");
        if (avatar) {
            avatar.textContent = user.name.charAt(0).toUpperCase();
        }

        document.querySelectorAll(".user-name").forEach((element) => {
            element.textContent = user.name;
        });
    }

    function initProtectedPage() {
        const user = requireAuth();
        if (user) {
            updateUserChrome(user);
        }
        return user;
    }

    function ensureSidebarOverlay() {
        let overlay = document.getElementById("sidebarOverlay");
        if (overlay) return overlay;

        overlay = document.createElement("div");
        overlay.id = "sidebarOverlay";
        overlay.className = "sidebar-overlay fixed inset-0 z-30 bg-slate-950/70 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden";
        overlay.addEventListener("click", () => {
            closeSidebar();
        });
        document.body.appendChild(overlay);
        return overlay;
    }

    function openSidebar() {
        const sidebar = document.getElementById("sidebar");
        const overlay = ensureSidebarOverlay();
        if (!sidebar) return;

        sidebar.classList.remove("-translate-x-full");
        sidebar.classList.add("open");
        document.body.classList.add("sidebar-open");
        overlay.classList.remove("opacity-0", "pointer-events-none");
    }

    function closeSidebar() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("sidebarOverlay");
        if (!sidebar) return;

        if (window.innerWidth < 768) {
            sidebar.classList.add("-translate-x-full");
            sidebar.classList.remove("open");
            document.body.classList.remove("sidebar-open");
            if (overlay) {
                overlay.classList.add("opacity-0", "pointer-events-none");
            }
        }
    }

    function syncSidebarLayout() {
        const sidebar = document.getElementById("sidebar");
        const main = document.querySelector("main");
        const footer = document.querySelector("footer");
        const collapseIcon = document.getElementById("collapseIcon");
        const texts = document.querySelectorAll(".sidebar-text");
        const isDesktop = window.innerWidth >= 768;

        if (!sidebar || !main) return;

        const collapsed = document.body.classList.contains("sidebar-collapsed");
        sidebar.classList.toggle("w-20", collapsed && isDesktop);
        sidebar.classList.toggle("w-64", !collapsed && isDesktop);
        main.classList.toggle("md:ml-20", collapsed && isDesktop);
        main.classList.toggle("md:ml-64", !collapsed && isDesktop);

        if (footer) {
            footer.classList.toggle("md:ml-20", collapsed && isDesktop);
            footer.classList.toggle("md:ml-64", !collapsed && isDesktop);
        }

        if (collapseIcon) {
            collapseIcon.classList.toggle("rotate-180", collapsed && isDesktop);
        }

        texts.forEach((text) => {
            text.classList.toggle("opacity-0", collapsed && isDesktop);
        });
    }

    function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;

        if (window.innerWidth >= 768) {
            toggleSidebarCollapse();
            return;
        }

        if (sidebar.classList.contains("-translate-x-full")) {
            openSidebar();
        } else {
            closeSidebar();
        }
    }

    function toggleSidebarCollapse() {
        if (window.innerWidth < 768) {
            toggleSidebar();
            return;
        }

        document.body.classList.toggle("sidebar-collapsed");
        syncSidebarLayout();
    }

    function showModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        }
    }

    function showLoginModal() {
        showModal("loginModal");
    }

    function showRegisterModal() {
        showModal("registerModal");
    }

    function closeModals() {
        ["loginModal", "registerModal"].forEach((id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add("hidden");
            }
        });
        document.body.style.overflow = "";
    }

    function switchToRegister() {
        closeModals();
        window.setTimeout(showRegisterModal, 90);
    }

    function switchToLogin() {
        closeModals();
        window.setTimeout(showLoginModal, 90);
    }

    async function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail")?.value || "";
        const password = document.getElementById("loginPassword")?.value || "";

        try {
            const user = await login(email, password);
            closeModals();
            showToast(`Bienvenido de nuevo, ${user.name}`, "success");
            window.setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 450);
        } catch (error) {
            showToast(error.message, "error");
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        const name = document.getElementById("registerName")?.value || "";
        const email = document.getElementById("registerEmail")?.value || "";
        const password = document.getElementById("registerPassword")?.value || "";

        try {
            await register(name, email, password);
            closeModals();
            showToast("Cuenta creada correctamente", "success");
            window.setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 350);
        } catch (error) {
            showToast(error.message, "error");
        }
    }

    function toggleMobileMenu() {
        const menu = document.getElementById("mobileMenu");
        if (menu) {
            menu.classList.toggle("hidden");
        }
    }

    function createParticles(containerId = "particles", count = 15) {
        const particlesContainer = document.getElementById(containerId);
        if (!particlesContainer || particlesContainer.childElementCount > 0) {
            return;
        }

        for (let index = 0; index < count; index += 1) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }
    }

    function syncAppVersion() {
        const version = window.AcademyConfig?.appVersion;
        if (!version) return;

        const storedVersion = localStorage.getItem(STORAGE_KEYS.appVersion);
        if (storedVersion === version) return;

        localStorage.setItem(STORAGE_KEYS.appVersion, version);

        if ("caches" in window) {
            caches.keys().then((keys) => Promise.all(
                keys
                    .filter((key) => key.startsWith("perma-academia-"))
                    .map((key) => caches.delete(key))
            )).catch(() => {
                // Ignore cache cleanup failures on restricted browsers.
            });
        }

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistration().then((registration) => {
                registration?.update().catch(() => {
                    // Ignore transient update failures.
                });
            }).catch(() => {
                // Ignore missing registrations.
            });
        }
    }

    async function clearAppCaches() {
        if (!("caches" in window)) return;

        const keys = await caches.keys();
        await Promise.all(
            keys
                .filter((key) => key.startsWith("perma-academia-"))
                .map((key) => caches.delete(key))
        );
    }

    function setRefreshButtonState(label) {
        const indicator = document.getElementById("contentRefreshIndicator");
        if (!indicator) return;

        if (!label) {
            indicator.classList.add("hidden");
            indicator.textContent = "";
            return;
        }

        indicator.textContent = label;
        indicator.classList.remove("hidden");
    }

    async function fetchContentFingerprint() {
        const response = await fetch(`js/data/content.js?ts=${Date.now()}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("No se pudo consultar la versión remota del contenido");
        }

        const etag = response.headers.get("etag");
        const lastModified = response.headers.get("last-modified");
        const text = await response.text();
        const size = String(text.length);

        return [etag || "", lastModified || "", size].join("|");
    }

    async function checkForContentUpdate(options = {}) {
        const { silent = false } = options;

        if (window.location.protocol === "file:") {
            return false;
        }

        try {
            const fingerprint = await fetchContentFingerprint();
            const stored = localStorage.getItem(STORAGE_KEYS.contentFingerprint);

            if (!stored) {
                localStorage.setItem(STORAGE_KEYS.contentFingerprint, fingerprint);
                setRefreshButtonState("");
                return false;
            }

            if (stored !== fingerprint) {
                setRefreshButtonState("Nueva version");
                if (!silent) {
                    showToast("Hay contenido nuevo disponible", "info", 2600);
                }
                return true;
            }

            setRefreshButtonState("");
            return false;
        } catch {
            return false;
        }
    }

    async function refreshApplicationContent() {
        showToast("Actualizando contenido...", "info", 2200);
        showSupportModal();

        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                await registration?.update();
                if (registration?.waiting) {
                    registration.waiting.postMessage({ type: "SKIP_WAITING" });
                    return;
                }
            } catch {
                // Ignore update failures and continue with cache cleanup + reload.
            }
        }

        try {
            await clearAppCaches();
        } catch {
            // Ignore cache cleanup failures and continue with reload.
        }

        try {
            const fingerprint = await fetchContentFingerprint();
            localStorage.setItem(STORAGE_KEYS.contentFingerprint, fingerprint);
        } catch {
            // Ignore fingerprint refresh failures and continue with reload.
        }

        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("_refresh", String(Date.now()));
        window.location.replace(nextUrl.toString());
    }

    function injectRefreshButton() {
        if (document.getElementById("contentRefreshButton")) return;
        if (document.getElementById("updateBtn")) return; // No crear si ya existe en sidebar
        if (!document.body) return;

        const button = document.createElement("button");
        button.type = "button";
        button.id = "contentRefreshButton";
        button.setAttribute("aria-label", "Actualizar contenido");
        button.title = "Actualizar contenido";
        button.textContent = "Actualizar";
        button.style.position = "fixed";
        button.style.right = "16px";
        button.style.bottom = "16px";
        button.style.zIndex = "70";
        button.style.display = "inline-flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.gap = "8px";
        button.style.padding = "10px 14px";
        button.style.borderRadius = "9999px";
        button.style.border = "1px solid rgba(34, 197, 94, 0.35)";
        button.style.background = "rgba(2, 6, 23, 0.92)";
        button.style.color = "#86efac";
        button.style.fontSize = "13px";
        button.style.fontWeight = "700";
        button.style.boxShadow = "0 10px 30px rgba(2, 6, 23, 0.35)";
        button.style.backdropFilter = "blur(10px)";
        button.style.webkitBackdropFilter = "blur(10px)";
        button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v6h6"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 20v-6h-6"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 9a8 8 0 00-13.66-3L4 10"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 15a8 8 0 0013.66 3L20 14"></path>
            </svg>
            <span>Actualizar</span>
            <span id="contentRefreshIndicator" class="hidden rounded-full bg-emerald-500/20 px-2 py-1 text-[11px] font-semibold text-emerald-200">Nueva version</span>
        `;

        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-1px)";
            button.style.borderColor = "rgba(74, 222, 128, 0.6)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "translateY(0)";
            button.style.borderColor = "rgba(34, 197, 94, 0.35)";
        });
        button.addEventListener("click", () => {
            button.disabled = true;
            button.style.opacity = "0.8";
            refreshApplicationContent();
        });

        document.body.appendChild(button);
    }

    function registerServiceWorker() {
        if (!("serviceWorker" in navigator)) return;
        if (window.location.protocol !== "http:" && window.location.protocol !== "https:") return;

        window.addEventListener("load", () => {
            let refreshing = false;

            function updateRegistration(registration) {
                registration?.update().catch(() => {
                    // Ignore transient update failures.
                });
            }

            function activateWaitingWorker(registration) {
                if (!registration?.waiting) return;
                registration.waiting.postMessage({ type: "SKIP_WAITING" });
            }

            navigator.serviceWorker.addEventListener("controllerchange", () => {
                if (refreshing) return;
                refreshing = true;
                window.location.reload();
            });

            navigator.serviceWorker.register(`sw.js?v=${encodeURIComponent(window.AcademyConfig?.appVersion || "1")}`).then((registration) => {
                if (registration.waiting) {
                    activateWaitingWorker(registration);
                }

                registration.addEventListener("updatefound", () => {
                    const worker = registration.installing;
                    if (!worker) return;

                    worker.addEventListener("statechange", () => {
                        if (worker.state === "installed" && navigator.serviceWorker.controller) {
                            activateWaitingWorker(registration);
                        }
                    });
                });

                updateRegistration(registration);
                window.addEventListener("focus", () => updateRegistration(registration));
                document.addEventListener("visibilitychange", () => {
                    if (document.visibilityState === "visible") {
                        updateRegistration(registration);
                    }
                });
            }).catch(() => {
                // Keep silent on static hosts if service worker fails.
            });
        });
    }

    function showSupportModal() {
        const modalId = "supportModal";
        if (document.getElementById(modalId)) return;
        
        const shownKey = "academy.support.modal.shown";
        const lastShown = localStorage.getItem(shownKey);
        const oneHour = 60 * 60 * 1000;
        if (lastShown && (Date.now() - parseInt(lastShown)) < oneHour) return;
        localStorage.setItem(shownKey, Date.now().toString());

        const modal = document.createElement("div");
        modal.id = modalId;
        modal.className = "fixed inset-0 z-[100] flex items-center justify-center p-4";
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="App.closeSupportModal()"></div>
            <div class="relative bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </div>
                <h2 class="font-orbitron text-xl md:text-2xl font-bold text-white mb-3">Creado por ZaBaDeV</h2>
                <p class="text-slate-400 mb-6">Este contenido es gratuito y ha sido creado con mucho esfuerzo. Si te resulta útil, considera apoyarme con una pequeña donación.</p>
                <a href="https://ko-fi.com/zabadev" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-semibold transition-all mb-3">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    Donar en Ko-fi
                </a>
                <button onclick="App.closeSupportModal()" class="block w-full mt-3 text-slate-500 hover:text-slate-300 text-sm transition-colors">
                    Cerrar
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.querySelector("div:last-child").classList.add("animate-fade-in-up"), 10);
    }

    function closeSupportModal() {
        const modal = document.getElementById("supportModal");
        if (modal) {
            modal.remove();
        }
    }

    function isLoggedIn() {
        return Boolean(loadCurrentUser());
    }

    window.App = {
        calculateStreak,
        createParticles,
        buildSearchIndex,
        clearTestDraft,
        getCurrentUser,
        getFavorites,
        getFlaggedQuestions,
        getLastVisited,
        getProgress,
        getTestDraft,
        getWrongQuestions,
        handleLogin,
        handleRegister,
        initProtectedPage,
        isFavorite,
        isFlaggedQuestion,
        isLoggedIn,
        loadUsers,
        logout,
        rememberVisit,
        refreshApplicationContent,
        saveTestDraft,
        saveWrongQuestions,
        searchLibrary,
        normalizeEmail,
        recordTestSession,
        requireAuth,
        setText,
        setWidth,
        showLoginModal,
        showRegisterModal,
        closeModals,
        showToast,
        switchToLogin,
        switchToRegister,
        toggleMobileMenu,
        toggleFavorite,
        toggleFlaggedQuestion,
        toggleSidebar,
        toggleSidebarCollapse,
        touchActivity,
        updateProgress,
        toggleProgress,
        updateUserChrome,
        showSupportModal,
        closeSupportModal
    };

    window.showLoginModal = showLoginModal;
    window.showRegisterModal = showRegisterModal;
    window.closeModals = closeModals;
    window.switchToRegister = switchToRegister;
    window.switchToLogin = switchToLogin;
    window.handleLogin = handleLogin;
    window.handleRegister = handleRegister;
    window.toggleMobileMenu = toggleMobileMenu;
    window.toggleSidebar = toggleSidebar;
    window.toggleSidebarCollapse = toggleSidebarCollapse;
    window.logout = logout;
    window.closeSupportModal = closeSupportModal;

    document.addEventListener("DOMContentLoaded", () => {
        const user = loadCurrentUser();
        if (user) {
            updateUserChrome(user);
        }
        ensureSidebarOverlay();
        syncSidebarLayout();
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                document.body.classList.remove("sidebar-open");
                const overlay = document.getElementById("sidebarOverlay");
                if (overlay) {
                    overlay.classList.add("opacity-0", "pointer-events-none");
                }
            } else {
                closeSidebar();
            }
            syncSidebarLayout();
        });
        document.querySelectorAll("#sidebar a").forEach((link) => {
            link.addEventListener("click", () => {
                closeSidebar();
            });
        });
        createParticles();
        syncAppVersion();
        registerServiceWorker();
        injectRefreshButton();
        checkForContentUpdate({ silent: true });
        window.addEventListener("focus", () => {
            checkForContentUpdate({ silent: true });
        });
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                checkForContentUpdate({ silent: true });
            }
        });
    });
    
    function showLoading(id, options = {}) {
        const container = document.getElementById(id);
        if (!container) return;
        const { text = "Cargando...", spinner = true } = options;
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 gap-4">
                ${spinner ? '<div class="spinner w-10 h-10"></div>' : ''}
                <p class="text-slate-400 text-sm">${text}</p>
            </div>
        `;
        container.classList.remove("hidden");
    }
    
    function hideLoading(id) {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = "";
        }
    }
    
    // Expose utilities globally
    window.App.showLoading = showLoading;
    window.App.hideLoading = hideLoading;
    
    // Expose utility modules
    window.Storage = Storage;
    window.Theme = Theme;
    window.Streak = Streak;
    window.Search = Search;
    window.Shortcuts = Shortcuts;
    window.Analytics = Analytics;
})();
