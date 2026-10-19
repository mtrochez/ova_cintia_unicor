document.addEventListener('DOMContentLoaded', () => {
    const storageKey = 'hye-unidad1-progreso';
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentPanes = document.querySelectorAll('.content-pane');
    const mobileNav = document.getElementById('mobile-nav');
    const activityButtons = document.querySelectorAll('.activity-subnav-btn');
    const activitySections = document.querySelectorAll('.activity-section');

    function switchPane(targetId) {
        contentPanes.forEach(pane => pane.classList.remove('active'));
        const pane = document.getElementById(targetId);
        if (pane) pane.classList.add('active');
        sidebarLinks.forEach(link => link.classList.toggle('active', link.dataset.target === targetId));
        if (mobileNav && mobileNav.value !== targetId) mobileNav.value = targetId;
    }

    sidebarLinks.forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        switchPane(link.dataset.target);
    }));

    if (mobileNav) mobileNav.addEventListener('change', event => switchPane(event.target.value));

    function switchActivity(sectionId) {
        activitySections.forEach(section => section.classList.toggle('hidden', section.id !== sectionId));
        activityButtons.forEach(button => {
            const active = button.dataset.activitySection === sectionId;
            button.classList.toggle('btn-main', active);
            button.classList.toggle('btn-soft', !active);
        });
    }

    activityButtons.forEach(button => button.addEventListener('click', () => switchActivity(button.dataset.activitySection)));
    switchActivity('act-a1');

    document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
        const counter = document.querySelector(`[data-counter-for="${textarea.id}"]`);
        const update = () => {
            if (counter) counter.textContent = `${textarea.value.length}/${textarea.maxLength}`;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textarea.addEventListener('input', update);
        update();
    });

    document.querySelectorAll('[data-copy]').forEach(button => {
        button.addEventListener('click', async () => {
            const target = document.getElementById(button.dataset.copy);
            if (!target) return;
            await navigator.clipboard.writeText(target.value || '');
            button.textContent = 'Copiado';
            setTimeout(() => button.textContent = 'Copiar texto', 1400);
        });
    });

    function collectProgress() {
        const data = {};
        document.querySelectorAll('textarea, input, select').forEach(element => {
            if (!element.id) return;
            data[element.id] = element.type === 'checkbox' ? element.checked : element.value;
        });
        return data;
    }

    function restoreProgress(data) {
        Object.entries(data || {}).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (!element) return;
            if (element.type === 'checkbox') element.checked = value;
            else element.value = value;
            element.dispatchEvent(new Event('input'));
        });
    }

    const status = document.getElementById('save-status');
    document.getElementById('save-progress')?.addEventListener('click', () => {
        localStorage.setItem(storageKey, JSON.stringify(collectProgress()));
        if (status) status.textContent = 'Progreso guardado.';
    });
    document.getElementById('restore-progress')?.addEventListener('click', () => {
        const saved = localStorage.getItem(storageKey);
        if (!saved) {
            if (status) status.textContent = 'No hay progreso guardado.';
            return;
        }
        restoreProgress(JSON.parse(saved));
        if (status) status.textContent = 'Progreso restaurado.';
    });
    document.getElementById('clear-progress')?.addEventListener('click', () => {
        localStorage.removeItem(storageKey);
        if (status) status.textContent = 'Guardado eliminado.';
    });

    function getValue(id) {
        const element = document.getElementById(id);
        return element ? (element.value || 'Sin diligenciar') : 'Sin diligenciar';
    }

    function getActivityExportData(scope) {
        const data = {
            a1: {
                title: 'Actividad 1. Foro de análisis',
                subtitle: 'El mito del observador neutral',
                body: `<div class="box">${getValue('a1-text')}</div>`
            },
            a2: {
                title: 'Actividad 2. Mapeo de obstáculos epistemológicos',
                subtitle: 'Análisis de obstáculo epistemológico',
                body: `
                    <p><strong>Obstáculo seleccionado:</strong> ${getValue('a2-obstacle')}</p>
                    <p><strong>Episodio o autor relacionado:</strong> ${getValue('a2-author')}</p>
                    <div class="box">${getValue('a2-text')}</div>
                `
            },
            a3: {
                title: 'Actividad 3. Taller de transposición didáctica',
                subtitle: 'Diseño de actividad de aula',
                body: `
                    <p><strong>Episodio histórico:</strong> ${getValue('a3-episode')}</p>
                    <div class="box">${getValue('a3-text')}</div>
                `
            }
        };
        return data[scope];
    }

    function buildActivityHtml(scope) {
        const activity = getActivityExportData(scope);
        const date = new Date().toLocaleString('es-CO');
        return `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Respuestas HYE Unidad 1</title>
                <style>
                    body { font-family: Arial, sans-serif; color: #263728; line-height: 1.55; margin: 36px; }
                    h1 { color: #14532d; margin-bottom: 4px; }
                    h2 { color: #14532d; border-bottom: 2px solid #b7791f; padding-bottom: 6px; margin-top: 28px; }
                    h3 { color: #6b4f2a; margin-bottom: 6px; }
                    .meta { color: #5f4a2f; font-size: 0.95rem; margin-bottom: 24px; }
                    .box { border: 1px solid #d7b98a; background: #fffaf0; border-radius: 10px; padding: 14px; margin: 10px 0 18px; white-space: pre-wrap; }
                    .footer { margin-top: 36px; font-size: 0.9rem; color: #5f4a2f; text-align: center; }
                </style>
            </head>
            <body>
                <h1>Respuesta de actividad</h1>
                <div class="meta">
                    <strong>Curso:</strong> Historia y Epistemología de las Ciencias Naturales<br>
                    <strong>Unidad 1:</strong> Un recorrido histórico por las visiones de ciencia<br>
                    <strong>Fecha de exportación:</strong> ${date}
                </div>

                <h2>${activity.title}</h2>
                <h3>${activity.subtitle}</h3>
                ${activity.body}

                <div class="footer">
                    Centro de Innovación en TIC para el apoyo de la Docencia CINTIA<br>
                    Universidad de Córdoba
                </div>
            </body>
            </html>
        `;
    }

    function exportWord(scope) {
        const html = buildActivityHtml(scope);
        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Respuesta_${scope.toUpperCase()}_HYE_Unidad1.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function exportPdf(scope) {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Permite las ventanas emergentes para guardar como PDF.');
            return;
        }
        printWindow.document.open();
        printWindow.document.write(buildActivityHtml(scope));
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 350);
    }

    document.querySelectorAll('.export-toggle').forEach(button => {
        button.addEventListener('click', event => {
            event.stopPropagation();
            const menu = button.parentElement?.querySelector('.export-menu');
            document.querySelectorAll('.export-menu').forEach(item => {
                if (item !== menu) item.classList.add('hidden');
            });
            menu?.classList.toggle('hidden');
        });
    });

    document.querySelectorAll('[data-export-format]').forEach(button => {
        button.addEventListener('click', () => {
            const scope = button.dataset.exportScope;
            button.closest('.export-menu')?.classList.add('hidden');
            if (button.dataset.exportFormat === 'word') exportWord(scope);
            if (button.dataset.exportFormat === 'pdf') exportPdf(scope);
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.export-menu-wrap')) {
            document.querySelectorAll('.export-menu').forEach(menu => menu.classList.add('hidden'));
        }
    });

    const questions = [
        { text: '¿Cuál es la crítica principal de Popper al inductivismo?', options: ['Que observa demasiado', 'Que no existe observación pura y la ciencia debe intentar refutar hipótesis', 'Que toda teoría es verdadera', 'Que las teorías no cambian'], answer: 1 },
        { text: 'Para Popper, una teoría científica debe ser:', options: ['Falsable', 'Indiscutible', 'Dogmática', 'Invisible'], answer: 0 },
        { text: 'Según Kuhn, un paradigma es:', options: ['Una opinión individual', 'Un modelo compartido por una comunidad científica', 'Un experimento aislado', 'Una lista de datos'], answer: 1 },
        { text: '¿Qué ocurre cuando se acumulan anomalías dentro de un paradigma?', options: ['Nada cambia', 'Puede surgir una crisis y una revolución científica', 'Se elimina la historia', 'La ciencia termina'], answer: 1 },
        { text: 'En Lakatos, el núcleo firme se protege mediante:', options: ['El cinturón protector de hipótesis auxiliares', 'La observación neutral', 'La negación de teorías', 'La memorización'], answer: 0 },
        { text: 'Las teorías abandonadas deben analizarse porque:', options: ['Fueron inútiles', 'Permiten comprender la evolución histórica del conocimiento', 'No pertenecen a la ciencia', 'No tienen valor didáctico'], answer: 1 },
        { text: 'Un modelo científico es:', options: ['Una copia exacta de la realidad', 'Una representación simplificada y útil', 'Una creencia religiosa', 'Un dato sin teoría'], answer: 1 },
        { text: 'El atomismo de Demócrito muestra que:', options: ['Toda teoría antigua era falsa', 'Algunas ideas pueden anticipar modelos aceptados siglos después', 'La ciencia no cambia', 'La experimentación no importa'], answer: 1 },
        { text: 'Humanizar la enseñanza de la ciencia implica:', options: ['Mostrarla como construcción histórica, social y cultural', 'Presentarla como verdad absoluta', 'Eliminar controversias', 'Evitar preguntas'], answer: 0 },
        { text: 'Una ruptura epistemológica se evidencia cuando:', options: ['Un marco explicativo cambia profundamente', 'Se repite una definición', 'Se memoriza una fórmula', 'No hay controversia'], answer: 0 }
    ];
    let current = 0;
    let answers = Array(questions.length).fill(null);
    const quizTitle = document.getElementById('quiz-title');
    const quizProgress = document.getElementById('quiz-progress');
    const quizText = document.getElementById('quiz-text');
    const quizOptions = document.getElementById('quiz-options');
    const quizPrev = document.getElementById('quiz-prev');
    const quizNext = document.getElementById('quiz-next');
    const quizResults = document.getElementById('quiz-results');
    const quizScore = document.getElementById('quiz-score');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizReview = document.getElementById('quiz-review');

    function renderQuiz() {
        const q = questions[current];
        quizTitle.textContent = `Pregunta ${current + 1}`;
        quizProgress.textContent = `${current + 1}/${questions.length}`;
        quizText.textContent = q.text;
        quizOptions.innerHTML = '';
        q.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `quiz-option ${answers[current] === index ? 'selected' : ''}`;
            button.textContent = option;
            button.addEventListener('click', () => {
                answers[current] = index;
                renderQuiz();
            });
            quizOptions.appendChild(button);
        });
        quizPrev.disabled = current === 0;
        quizNext.textContent = current === questions.length - 1 ? 'Finalizar' : 'Siguiente';
    }

    function finishQuiz() {
        const score = questions.reduce((total, q, index) => total + (answers[index] === q.answer ? 1 : 0), 0);
        quizScore.textContent = score;
        quizFeedback.textContent = score >= 8 ? 'Excelente comprensión epistemológica.' : score >= 6 ? 'Buen avance. Revisa los conceptos donde tuviste dudas.' : 'Conviene repasar los ejes conceptuales de la unidad.';
        quizReview.innerHTML = '';
        questions.forEach((q, index) => {
            const ok = answers[index] === q.answer;
            const item = document.createElement('div');
            item.className = `p-4 rounded-xl border ${ok ? 'bg-white border-green-300' : 'bg-red-50 border-red-200'}`;
            item.innerHTML = `<p class="font-bold ${ok ? 'text-green-800' : 'text-red-700'}">${ok ? 'Correcta' : 'Incorrecta'} - Pregunta ${index + 1}</p><p class="mt-1 text-slate-700">${q.text}</p><p class="mt-2 text-sm text-slate-600"><strong>Tu respuesta:</strong> ${answers[index] === null ? 'Sin responder' : q.options[answers[index]]}</p><p class="text-sm text-slate-600"><strong>Respuesta correcta:</strong> ${q.options[q.answer]}</p>`;
            quizReview.appendChild(item);
        });
        document.getElementById('quiz-box').style.display = 'none';
        quizResults.classList.remove('hidden');
    }

    quizPrev.addEventListener('click', () => {
        if (current > 0) {
            current--;
            renderQuiz();
        }
    });
    quizNext.addEventListener('click', () => {
        if (answers[current] === null) {
            alert('Selecciona una respuesta antes de continuar.');
            return;
        }
        if (current < questions.length - 1) {
            current++;
            renderQuiz();
        } else {
            finishQuiz();
        }
    });
    document.getElementById('quiz-restart').addEventListener('click', () => {
        current = 0;
        answers = Array(questions.length).fill(null);
        document.getElementById('quiz-box').style.display = '';
        quizResults.classList.add('hidden');
        renderQuiz();
    });
    renderQuiz();
});
