(function () {
    const difficultyLabels = {
        mixed: "Mixto",
        easy: "Fácil",
        medium: "Medio",
        hard: "Difícil"
    };

    const topicTitles = {
        b1_t1_cortes: "B1-T1: Cortes Generales",
        b1_t1_gobierno: "B1-T1: El Gobierno",
        b1_t1_territorial: "B1-T1: Organización Territorial",
        b1_t1_poderjudicial: "B1-T1: Poder Judicial",
        b1_t2_defensa: "B1-T2: LO 5/2005 Defensa Nacional",
        b1_t3_ley40: "B1-T3: Ley 40/2015 RJSP",
        b1_t4_rd205: "B1-T4: RD 205/2024 Ministerio",
        b1_t5_rd521: "B1-T5: RD 521/2020 Organización FAS",
        b1_t6_instrucciones: "B1-T6: Instrucciones Organizativas",
        bloque1: "Bloque 1: Organización",
        b2_t1_ley39: "B2-T1: Ley 39/2007 y 8/2006",
        b2_t2_ordenanzas: "B2-T2: Reales Ordenanzas",
        b2_t3_ley9: "B2-T3: LO 9/2011 Derechos",
        b2_t4_ley8: "B2-T4: LO 8/2014 Disciplinario",
        b2_t5_quejas: "B2-T5: RD 176/2014 Quejas",
        b2_t6_igualdad: "B2-T6: LO 3/2007 Igualdad",
        b2_t7_observatorio: "B2-T7: Observatorio y Protocolo",
        b2_t8_ley39: "B2-T8: Ley 39/2015 PAC",
        bloque2: "Bloque 2: Jurídico-Social",
        b3_t1_seguridad: "B3-T1: Ley 36/2015 y Estrategia",
        b3_t2_pdc01: "B3-T2: PDC-01 Doctrina FAS",
        b3_t3_onu: "B3-T3: ONU",
        b3_t4_otan: "B3-T4: OTAN",
        b3_t5_osce: "B3-T5: OSCE",
        b3_t6_ue: "B3-T6: Unión Europea",
        b3_t7_misiones: "B3-T7: Misiones Internacionales",
        bloque3: "Bloque 3: Seguridad Nacional",
        completo: "Test completo",
        aleatorio_20: "Aleatorio 20",
        aleatorio_50: "Aleatorio 50",
        aleatorio_100: "Aleatorio 100",
        falladas: "Repaso de falladas"
    };

    let currentCategory = null;
    let currentTitle = "";
    let currentTest = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let timerInterval = null;
    let startTimestamp = 0;
    let defaultModalMarkup = "";
    let selectedDifficulty = "mixed";

    function isTopicCategory(category) {
        return /^b[123]_/.test(String(category || ""));
    }

    function getDifficultyLabel(mode = selectedDifficulty) {
        return difficultyLabels[mode] || difficultyLabels.mixed;
    }

    function shuffle(array) {
        const copy = [...array];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
        }
        return copy;
    }

    function cloneQuestion(question) {
        return {
            ...question,
            options: [...(question.options || [])]
        };
    }

    function questionKey(question) {
        return `${question.topicKey || "general"}::${question.q}`;
    }

    function serializeQuestion(question) {
        return {
            key: questionKey(question),
            q: question.q,
            options: [...question.options],
            correct: question.correct,
            difficulty: question.difficulty || "",
            topicKey: question.topicKey || "",
            topicTitle: question.topicTitle || topicTitles[question.topicKey] || ""
        };
    }

    function getAllBaseQuestions() {
        const source = window.testsData?.completo?.questions || [];
        return source.map(cloneQuestion);
    }

    function getWrongQuestionSet() {
        return App.getWrongQuestions().map((question) => ({
            ...question,
            options: [...(question.options || [])]
        }));
    }

    function getQuestionSet(category) {
        if (!window.testsData) return [];

        if (category === "falladas") {
            return shuffle(getWrongQuestionSet());
        }

        if (/^aleatorio_\d+$/.test(category)) {
            const amount = Number(category.split("_")[1]);
            return shuffle(getAllBaseQuestions()).slice(0, amount);
        }

        if (window.testsData[category]?.questions?.length) {
            const baseQuestions = window.testsData[category].questions.map(cloneQuestion);
            if (isTopicCategory(category) && selectedDifficulty !== "mixed") {
                return shuffle(baseQuestions.filter((question) => question.difficulty === selectedDifficulty));
            }
            return shuffle(baseQuestions);
        }

        return [];
    }

    function buildTitle(category) {
        if (category.startsWith("aleatorio_")) {
            return topicTitles[category] || `Aleatorio ${category.split("_")[1]}`;
        }
        if (category === "falladas") {
            return "Repaso de falladas";
        }
        let title = topicTitles[category] || window.testsData?.[category]?.title || "Test";
        if (isTopicCategory(category) && selectedDifficulty !== "mixed") {
            title = `${title} · ${getDifficultyLabel()}`;
        }
        return title;
    }

    function setDifficultyMode(mode, silent = false) {
        selectedDifficulty = difficultyLabels[mode] ? mode : "mixed";
        document.querySelectorAll("[data-difficulty-mode]").forEach((button) => {
            const active = button.dataset.difficultyMode === selectedDifficulty;
            button.classList.toggle("border-cyan-400", active);
            button.classList.toggle("bg-cyan-500/20", active);
            button.classList.toggle("text-white", active);
            button.classList.toggle("border-slate-700", !active);
            button.classList.toggle("bg-slate-900/60", !active);
            button.classList.toggle("text-slate-300", !active);
        });
        const label = document.getElementById("difficultyModeLabel");
        if (label) {
            label.textContent = getDifficultyLabel();
        }
        if (!silent) {
            App.showToast(`Modo ${getDifficultyLabel().toLowerCase()} activado`, "info");
        }
    }

    function saveDraftState() {
        if (!currentTest.length || !currentCategory) return;
        App.saveTestDraft({
            category: currentCategory,
            title: currentTitle,
            totalQuestions: currentTest.length,
            currentQuestionIndex,
            userAnswers,
            selectedDifficulty,
            startedAt: startTimestamp,
            questions: currentTest.map(serializeQuestion)
        });
    }

    function clearDraftBanner() {
        const banner = document.getElementById("draftResumeBanner");
        if (banner) {
            banner.classList.add("hidden");
            banner.innerHTML = "";
        }
    }

    function renderDraftBanner() {
        const banner = document.getElementById("draftResumeBanner");
        const draft = App.getTestDraft();
        if (!banner || !draft || !draft.questions?.length) {
            clearDraftBanner();
            return;
        }

        banner.classList.remove("hidden");
        banner.innerHTML = `
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h3 class="font-orbitron text-lg text-emerald-300">Tienes un test pendiente</h3>
                    <p class="mt-1 text-sm text-slate-300">${draft.title || "Test"} · Pregunta ${Number(draft.currentQuestionIndex || 0) + 1} de ${draft.totalQuestions || draft.questions.length}</p>
                </div>
                <div class="flex flex-wrap gap-3">
                    <button type="button" onclick="resumeSavedTest()" class="rounded-lg border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500/10">Reanudar</button>
                    <button type="button" onclick="discardSavedTest()" class="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800">Descartar</button>
                </div>
            </div>
        `;
    }

    function renderQuestionMeta(question) {
        const metaBar = document.getElementById("questionMetaBar");
        if (!metaBar || !question) return;

        const flagged = App.isFlaggedQuestion(questionKey(question));
        metaBar.innerHTML = `
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                ${question.topicTitle ? `<span style="padding:6px 10px; border-radius:999px; background:#0f172a; color:#93c5fd; font-size:12px; font-weight:700;">${question.topicTitle}</span>` : ""}
                ${question.difficulty ? `<span style="padding:6px 10px; border-radius:999px; background:#0f172a; color:#86efac; font-size:12px; font-weight:700;">${getDifficultyLabel(question.difficulty)}</span>` : ""}
            </div>
            <button type="button" onclick="toggleCurrentQuestionFlag()" style="padding:8px 12px; border-radius:999px; border:1px solid ${flagged ? "#facc15" : "#475569"}; background:${flagged ? "rgba(250,204,21,0.1)" : "transparent"}; color:${flagged ? "#fde047" : "#cbd5e1"}; font-size:12px; font-weight:700; cursor:pointer;">
                ${flagged ? "★ Duda guardada" : "☆ Marcar duda"}
            </button>
        `;
    }

    function renderQuestion() {
        const question = currentTest[currentQuestionIndex];
        if (!question) return;

        App.setText("currentQuestion", currentQuestionIndex + 1);
        App.setText("questionText", question.q);
        App.setWidth("progressBar", ((currentQuestionIndex + 1) / currentTest.length) * 100);
        renderQuestionMeta(question);

        const optionsContainer = document.getElementById("optionsContainer");
        optionsContainer.innerHTML = "";

        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "test-option mb-2 block w-full rounded-lg border border-slate-700 bg-slate-700/70 px-4 py-3 text-left text-white";
            if (userAnswers[currentQuestionIndex] === index) {
                button.classList.add("selected");
            }
            button.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;
            button.addEventListener("click", () => {
                userAnswers[currentQuestionIndex] = index;
                saveDraftState();
                renderQuestion();
            });
            optionsContainer.appendChild(button);
        });

        const prevBtn = document.getElementById("prevBtn");
        if (prevBtn) {
            prevBtn.disabled = currentQuestionIndex === 0;
            prevBtn.classList.toggle("opacity-50", currentQuestionIndex === 0);
        }

        App.setText("nextBtn", currentQuestionIndex === currentTest.length - 1 ? "Finalizar" : "Siguiente");
    }

    function startTimer(timestamp = Date.now()) {
        startTimestamp = timestamp;
        clearInterval(timerInterval);
        timerInterval = window.setInterval(() => {
            const seconds = Math.floor((Date.now() - startTimestamp) / 1000);
            const minutes = Math.floor(seconds / 60);
            const remainder = seconds % 60;
            App.setText("timer", `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`);
        }, 1000);
    }

    function ensureModalTemplate() {
        if (!defaultModalMarkup) {
            defaultModalMarkup = document.getElementById("testModal").innerHTML;
        }

        if (!document.getElementById("testTitle")) {
            document.getElementById("testModal").innerHTML = defaultModalMarkup;
        }
    }

    function openTestSession(category, questions, options = {}) {
        if (!questions.length) {
            App.showToast(category === "falladas" ? "Aún no hay preguntas falladas guardadas" : "No hay preguntas disponibles para este test", "warning");
            return;
        }

        ensureModalTemplate();

        currentCategory = category;
        currentTest = questions.map(cloneQuestion);
        currentTitle = options.title || buildTitle(category);
        currentQuestionIndex = options.currentQuestionIndex || 0;
        userAnswers = Array.isArray(options.userAnswers)
            ? [...options.userAnswers]
            : new Array(currentTest.length).fill(null);

        App.setText("testTitle", currentTitle);
        App.setText("totalQuestions", currentTest.length);
        document.getElementById("testModal").style.display = "block";
        document.getElementById("resultsContainer").classList.add("hidden");

        renderQuestion();
        startTimer(options.startedAt || Date.now());
        saveDraftState();
        clearDraftBanner();
    }

    function startTest(category) {
        const questions = getQuestionSet(category);
        openTestSession(category, questions);
    }

    function resumeSavedTest() {
        const draft = App.getTestDraft();
        if (!draft?.questions?.length) {
            App.showToast("No hay sesión guardada para reanudar", "warning");
            clearDraftBanner();
            return;
        }

        selectedDifficulty = draft.selectedDifficulty || selectedDifficulty;
        setDifficultyMode(selectedDifficulty, true);
        openTestSession(
            draft.category || "test_guardado",
            draft.questions,
            {
                title: draft.title || "Test en curso",
                currentQuestionIndex: Number(draft.currentQuestionIndex || 0),
                userAnswers: draft.userAnswers || [],
                startedAt: draft.startedAt || Date.now()
            }
        );
    }

    function discardSavedTest() {
        App.clearTestDraft();
        clearDraftBanner();
        App.showToast("Sesión guardada descartada", "info");
    }

    function nextQuestion() {
        if (userAnswers[currentQuestionIndex] === null) {
            App.showToast("Selecciona una respuesta antes de continuar", "warning");
            return;
        }

        if (currentQuestionIndex === currentTest.length - 1) {
            finishTest();
            return;
        }

        currentQuestionIndex += 1;
        saveDraftState();
        renderQuestion();
    }

    function prevQuestion() {
        if (currentQuestionIndex === 0) return;
        currentQuestionIndex -= 1;
        saveDraftState();
        renderQuestion();
    }

    function resetTest() {
        clearInterval(timerInterval);
        const modal = document.getElementById("testModal");
        if (defaultModalMarkup) {
            modal.innerHTML = defaultModalMarkup;
        }
        modal.style.display = "none";
        document.getElementById("resultsContainer").classList.add("hidden");
        currentCategory = null;
        currentTitle = "";
        currentTest = [];
        currentQuestionIndex = 0;
        userAnswers = [];
        App.setText("timer", "00:00");
    }

    function restartTest() {
        if (!currentCategory) return;
        startTest(currentCategory);
    }

    function cancelTest() {
        App.clearTestDraft();
        resetTest();
        App.showToast("Test cancelado", "info");
        renderDraftBanner();
    }

    function toggleCurrentQuestionFlag() {
        const question = currentTest[currentQuestionIndex];
        if (!question) return;
        const active = App.toggleFlaggedQuestion(serializeQuestion(question));
        App.showToast(active ? "Pregunta marcada como dudosa" : "Pregunta quitada de dudosas", "info");
        renderQuestionMeta(question);
    }

    function finishTest() {
        clearInterval(timerInterval);

        let correct = 0;
        const wrongEntries = [];

        currentTest.forEach((question, index) => {
            if (userAnswers[index] === question.correct) {
                correct += 1;
                return;
            }

            wrongEntries.push(serializeQuestion(question));
        });

        if (wrongEntries.length) {
            App.saveWrongQuestions(wrongEntries);
        }

        const wrong = currentTest.length - correct;
        const percent = Math.round((correct / currentTest.length) * 100);

        App.recordTestSession({
            testId: currentCategory,
            testName: currentTitle || buildTitle(currentCategory),
            totalQuestions: currentTest.length,
            correctAnswers: correct,
            wrongAnswers: wrong,
            scorePercent: percent
        });

        App.clearTestDraft();

        const reviewMarkup = currentTest.map((question, index) => {
            const selectedIndex = userAnswers[index];
            const correctIndex = question.correct;
            const selectedText = selectedIndex === null
                ? "Sin responder"
                : `${String.fromCharCode(65 + selectedIndex)}. ${question.options[selectedIndex]}`;
            const correctText = `${String.fromCharCode(65 + correctIndex)}. ${question.options[correctIndex]}`;
            const isCorrect = selectedIndex === correctIndex;
            const flagged = App.isFlaggedQuestion(questionKey(question));

            return `
                <div style="background: #0f172a; border: 1px solid ${isCorrect ? "#14532d" : "#7f1d1d"}; border-radius: 12px; padding: 18px; margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap;">
                        <div style="color: white; font-weight: 600; line-height: 1.5;">${index + 1}. ${question.q}</div>
                        <div style="display:flex; gap:8px; flex-wrap:wrap;">
                            ${flagged ? '<span style="padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; color: #fde047; background: rgba(250,204,21,0.12); border:1px solid rgba(250,204,21,0.4);">Dudosa</span>' : ""}
                            <span style="padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; color: white; background: ${isCorrect ? "#16a34a" : "#dc2626"};">
                                ${isCorrect ? "Correcta" : "Incorrecta"}
                            </span>
                        </div>
                    </div>
                    <div style="display: grid; gap: 8px;">
                        <div style="color: #cbd5e1; font-size: 14px;">
                            <strong style="color: #94a3b8;">Tu respuesta:</strong> ${selectedText}
                        </div>
                        <div style="color: #86efac; font-size: 14px;">
                            <strong style="color: #4ade80;">Respuesta correcta:</strong> ${correctText}
                        </div>
                    </div>
                </div>
            `;
        }).join("");

        const modal = document.getElementById("testModal");
        modal.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 30px; border: 1px solid #334155;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #06b6d4); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 36px;">${percent >= 50 ? "✓" : "✗"}</span>
                    </div>
                    <h2 style="font-size: 28px; color: white; margin: 0 0 10px 0;">Resultado del test</h2>
                    <p style="color: #94a3b8; margin: 0;">${currentTitle || buildTitle(currentCategory)}</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px;">
                    <div style="background: #0f172a; padding: 20px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #10b981;">${correct}</div>
                        <div style="color: #94a3b8; font-size: 14px;">Correctas</div>
                    </div>
                    <div style="background: #0f172a; padding: 20px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #ef4444;">${wrong}</div>
                        <div style="color: #94a3b8; font-size: 14px;">Incorrectas</div>
                    </div>
                    <div style="background: #0f172a; padding: 20px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #06b6d4;">${percent}%</div>
                        <div style="color: #94a3b8; font-size: 14px;">Puntuación</div>
                    </div>
                </div>
                <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:22px;">
                    <a href="tests.html?test=falladas" style="padding: 10px 18px; border: 1px solid #f59e0b; border-radius: 999px; color: #fde68a; text-decoration:none; font-size: 13px; font-weight:700;">Repasar falladas</a>
                    <a href="progreso.html" style="padding: 10px 18px; border: 1px solid #06b6d4; border-radius: 999px; color: #67e8f9; text-decoration:none; font-size: 13px; font-weight:700;">Ver Mi Espacio</a>
                </div>
                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 20px; color: white; margin: 0 0 16px 0;">Preguntas y respuestas</h3>
                    ${reviewMarkup}
                </div>
                <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                    <button onclick="resetTest()" style="padding: 14px 28px; border: 1px solid #475569; border-radius: 8px; color: white; cursor: pointer; background: transparent; font-size: 16px;">Volver al menú</button>
                    <button onclick="restartTest()" style="padding: 14px 28px; background: linear-gradient(90deg, #10b981, #06b6d4); border: none; border-radius: 8px; color: white; cursor: pointer; font-size: 16px; font-weight: bold;">Repetir test</button>
                </div>
            </div>
        `;

        renderDraftBanner();
    }

    function handleQueryStart() {
        const params = new URLSearchParams(window.location.search);
        if (params.get("resume") === "1") {
            resumeSavedTest();
            return;
        }

        const testId = params.get("test");
        if (testId) {
            startTest(testId);
        }
    }

    window.startTest = startTest;
    window.nextQuestion = nextQuestion;
    window.prevQuestion = prevQuestion;
    window.resetTest = resetTest;
    window.restartTest = restartTest;
    window.cancelTest = cancelTest;
    window.resumeSavedTest = resumeSavedTest;
    window.discardSavedTest = discardSavedTest;
    window.toggleCurrentQuestionFlag = toggleCurrentQuestionFlag;
    window.setDifficultyMode = setDifficultyMode;

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user) return;
        defaultModalMarkup = document.getElementById("testModal").innerHTML;
        setDifficultyMode("mixed", true);
        renderDraftBanner();
        handleQueryStart();
    });
})();
