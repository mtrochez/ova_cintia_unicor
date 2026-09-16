/*
  script.js — Motor genérico de la plantilla OVA (Seminario Proyecto de
  Investigación I, MDDCN). Pensado para reutilizarse en las 3 unidades sin
  modificarlo: el contenido específico de cada unidad se define en su
  index.html mediante atributos data-*, no aquí.

  Convenciones que debe seguir el HTML para que este script funcione:
  - #ova-embed debe tener data-storage-key="..." (clave única por unidad
    para guardar el avance en localStorage).
  - Cada bloque exportable de una actividad debe tener
    data-export-title="..." (título que aparece en el documento exportado).
  - Cada campo que se deba guardar/restaurar/exportar (input, select,
    textarea) debe tener atributo data-track, además de su id y, si aplica,
    un <label for="id"> — el texto del label se usa como nombre del campo
    en la exportación.
  - Los checkboxes de checklist deben tener data-track para incluirse en
    guardar/restaurar/limpiar (no se exportan a Word/PDF, solo se guardan).

  TODO antes de publicar Unidad 1: revisar la exportación a "PDF" — igual
  que en el OVA de ejemplo, hoy genera un archivo HTML con extensión .pdf,
  que no es un PDF real. Definir si se deja así (como en el ejemplo) o se
  agrega una librería de generación de PDF real antes de construir la
  Actividad interactiva.
*/

(function () {
    const embed = document.getElementById('ova-embed');
    if (!embed) return;

    const courseTitle = embed.dataset.courseTitle || '';
    const unitLabel = embed.dataset.unitLabel || '';

    /* ---------- Navegación por secciones (sidebar + selector móvil) ---------- */

    /* ---------- Menú desplegable de Exportar ----------
       El menú (.export-menu) se mueve a ser hijo directo de #ova-embed la
       primera vez que se abre, y se posiciona con position:fixed calculado
       en JS. Esto es necesario por DOS motivos, no solo uno:
       1) .activity-ledger tiene overflow:hidden (para recortar su patrón de
          fondo a las esquinas redondeadas) y recortaba el menú si se
          quedaba dentro de esa tarjeta.
       2) .content-pane.active usa "transform" para su animación de
          transición — por especificación CSS, eso convierte a esa sección
          en el "containing block" de cualquier descendiente position:fixed,
          Y TAMBIÉN atrapa su orden de apilamiento (z-index) dentro del
          stacking context local de esa sección. Aunque el menú se
          posicionara bien, otro elemento de la página podía pintarse
          encima y bloquear el clic.
       Se mueve a #ova-embed (no a document.body) a propósito: #ova-embed
       no tiene transform ni overflow:hidden propios, así que resuelve los
       dos problemas de arriba igual — pero, a diferencia de document.body,
       sigue dentro del namespace #ova-embed del que dependen TODOS los
       estilos de este componente (incluido .export-menu), necesario para
       que el OVA no choque con el CSS de la página que lo incruste
       (Moodle). Moverlo fuera de #ova-embed dejaría el menú sin estilos. */

    const exportMenuByToggle = new Map();

    function closeAllExportMenus() {
        exportMenuByToggle.forEach((menu) => menu.classList.add('hidden'));
    }

    function positionExportMenu(toggleBtn, menu) {
        const btnRect = toggleBtn.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();
        const margin = 12;
        let left = btnRect.left;
        let top = btnRect.bottom + 8;
        if (left + menuRect.width > window.innerWidth - margin) {
            left = Math.max(margin, window.innerWidth - margin - menuRect.width);
        }
        if (top + menuRect.height > window.innerHeight - margin) {
            top = btnRect.top - 8 - menuRect.height;
            if (top < margin) top = margin;
        }
        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;
    }

    embed.querySelectorAll('.export-toggle').forEach((toggle) => {
        const menu = toggle.nextElementSibling;
        if (!menu || !menu.classList.contains('export-menu')) return;
        embed.appendChild(menu);
        exportMenuByToggle.set(toggle, menu);
    });

    window.addEventListener('scroll', closeAllExportMenus, { passive: true, capture: true });
    window.addEventListener('resize', closeAllExportMenus);
    document.addEventListener('click', function (e) {
        if (e.target.closest('.export-menu-wrap') || e.target.closest('.export-menu')) return;
        closeAllExportMenus();
    });

    document.addEventListener('click', function (e) {
        const exportToggle = e.target.closest('.export-toggle');
        if (exportToggle) {
            e.stopPropagation();
            const menu = exportMenuByToggle.get(exportToggle);
            if (menu) {
                const willOpen = menu.classList.contains('hidden');
                closeAllExportMenus();
                if (willOpen) {
                    menu.classList.remove('hidden');
                    positionExportMenu(exportToggle, menu);
                }
            }
        }

        const exportOption = e.target.closest('.export-option');
        if (exportOption) {
            e.stopPropagation();
            const scope = exportOption.dataset.exportScope;
            const format = exportOption.dataset.exportFormat;
            exportActivity(scope, format);
            closeAllExportMenus();
        }
    });

    function activateSection(target) {
        document.querySelectorAll('.sidebar-link').forEach((l) => {
            l.classList.toggle('active', l.dataset.target === target);
        });
        document.querySelectorAll('.content-pane').forEach((p) => {
            p.classList.toggle('active', p.id === target);
        });
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav) mobileNav.value = target;
    }

    embed.addEventListener('click', function (e) {
        const sidebarLink = e.target.closest('.sidebar-link');
        if (sidebarLink) {
            e.preventDefault();
            activateSection(sidebarLink.dataset.target);
        }

        if (e.target.matches('.activity-subnav-btn')) {
            const section = e.target.dataset.activitySection;
            document.querySelectorAll('.activity-subnav-btn').forEach((b) => {
                b.classList.remove('btn-main');
                b.classList.add('btn-soft');
            });
            e.target.classList.remove('btn-soft');
            e.target.classList.add('btn-main');
            document.querySelectorAll('.activity-section').forEach((s) => s.classList.add('hidden'));
            const activeSection = document.getElementById(section);
            if (activeSection) activeSection.classList.remove('hidden');
        }
    });

    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) {
        mobileNav.addEventListener('change', function () {
            activateSection(this.value);
        });
    }

    /* ---------- Contador de caracteres ---------- */

    embed.querySelectorAll('textarea[maxlength]').forEach((textarea) => {
        const counter = embed.querySelector(`[data-counter-for="${textarea.id}"]`);
        if (!counter) return;
        counter.textContent = `${textarea.value.length}/${textarea.getAttribute('maxlength')}`;
        textarea.addEventListener('input', function () {
            counter.textContent = `${this.value.length}/${this.getAttribute('maxlength')}`;
        });
    });

    /* ---------- Guardar / restaurar / limpiar avance (genérico vía data-track) ----------
       No hay un bloque de UI dedicado a "guardar y retomar": el avance se
       restaura solo al cargar la página (si hay algo guardado), y cada
       actividad guarda/limpia su propio progreso con los botones locales
       .local-save-btn / .local-clear-btn (junto a "Exportar"). Guardar
       siempre guarda TODOS los campos data-track de la unidad a la vez;
       Limpiar solo actúa sobre los campos data-track dentro del
       [data-export-scope] más cercano al botón — así cada unidad puede
       tener tantos botones locales como actividades tenga, sin tocar
       este script. */

    function getTrackedFields() {
        return Array.from(embed.querySelectorAll('[data-track]'));
    }

    function getScopeTrackedFields(scope) {
        const container = embed.querySelector(`[data-export-scope="${scope}"]`);
        return container ? Array.from(container.querySelectorAll('[data-track]')) : [];
    }

    const saveKey = embed.dataset.storageKey || 'ova_progress';

    function saveAllProgress(statusEl) {
        const progress = {};
        getTrackedFields().forEach((el) => {
            progress[el.id] = el.type === 'checkbox' ? el.checked : el.value;
        });
        localStorage.setItem(saveKey, JSON.stringify(progress));
        if (statusEl) statusEl.textContent = 'Guardado exitoso.';
    }

    function restoreAllProgress(statusEl) {
        const saved = localStorage.getItem(saveKey);
        if (!saved) {
            if (statusEl) statusEl.textContent = 'No hay avance guardado.';
            return;
        }
        const progress = JSON.parse(saved);
        getTrackedFields().forEach((el) => {
            if (!(el.id in progress)) return;
            if (el.type === 'checkbox') {
                el.checked = Boolean(progress[el.id]);
            } else {
                el.value = progress[el.id];
                el.dispatchEvent(new Event('input'));
            }
        });
        if (statusEl) statusEl.textContent = 'Avance restaurado.';
    }

    function clearScopeFields(scope, statusEl) {
        const fields = getScopeTrackedFields(scope);
        if (!fields.length) return;
        fields.forEach((el) => {
            if (el.type === 'checkbox') {
                el.checked = false;
            } else if (el.tagName === 'SELECT') {
                el.selectedIndex = 0;
                el.dispatchEvent(new Event('change'));
            } else {
                el.value = '';
                el.dispatchEvent(new Event('input'));
            }
        });
        // Persiste el limpiado también en localStorage: si no se actualiza
        // aquí, el auto-restore al recargar la página traería de vuelta los
        // valores "limpiados" porque seguirían guardados de un Guardar previo.
        const saved = localStorage.getItem(saveKey);
        if (saved) {
            const progress = JSON.parse(saved);
            fields.forEach((el) => {
                progress[el.id] = el.type === 'checkbox' ? false : '';
            });
            localStorage.setItem(saveKey, JSON.stringify(progress));
        }
        if (statusEl) statusEl.textContent = 'Campos limpiados.';
        // El botón "Limpiar" está al final de un formulario largo (varios
        // campos más arriba, fuera de la vista). Sin esto, el usuario limpia
        // los campos pero se queda mirando la fila de botones, sin ver que
        // los campos de más arriba quedaron vacíos — misma idea que el fix
        // de "Reiniciar" del cuestionario: llevar la vista de vuelta al
        // inicio de la actividad que se acaba de limpiar.
        const scopeContainer = embed.querySelector(`[data-export-scope="${scope}"]`);
        if (scopeContainer) scopeContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Restaura el avance guardado (si lo hay) apenas carga la página, sin
    // necesidad de un botón "Restaurar" dedicado.
    restoreAllProgress(null);

    document.querySelectorAll('.local-save-btn').forEach((btn) => {
        const scope = btn.dataset.statusTarget;
        const status = scope ? embed.querySelector(`[data-status-for="${scope}"]`) : null;
        btn.addEventListener('click', () => saveAllProgress(status));
    });

    document.querySelectorAll('.local-clear-btn').forEach((btn) => {
        const scope = btn.dataset.clearScope;
        const status = scope ? embed.querySelector(`[data-status-for="${scope}"]`) : null;
        btn.addEventListener('click', () => clearScopeFields(scope, status));
    });

    /* ---------- Actividades por pasos (opcional) ----------
       Cuando una actividad tiene muchos campos, envolver los grupos en
       <div class="activity-steps"><div class="activity-step" data-step="1">
       .../div><div class="activity-step" data-step="2">.../div>...
       <div class="step-nav">...botones .step-prev-btn/.step-next-btn y un
       <span class="step-indicator">...</span></div></div> permite navegar
       entre pasos con Anterior/Siguiente en vez de un solo formulario largo.
       Guardar/Limpiar/Exportar quedan FUERA de .activity-steps (en el mismo
       .field-panel) para que sigan aplicando a todos los campos de la
       actividad sin importar qué paso esté visible — collectExportFields()
       y getScopeTrackedFields() ya recorren todo el contenedor con
       querySelectorAll('[data-track]'), que encuentra los campos aunque su
       paso esté oculto con display:none. Si una unidad no usa este
       envoltorio, este bloque simplemente no hace nada. */
    document.querySelectorAll('.activity-steps').forEach((wrap) => {
        const steps = Array.from(wrap.querySelectorAll(':scope > .activity-step'));
        if (steps.length < 2) return;
        const prevBtn = wrap.querySelector('.step-prev-btn');
        const nextBtn = wrap.querySelector('.step-next-btn');
        const indicator = wrap.querySelector('.step-indicator');
        let current = 0;
        function render() {
            steps.forEach((s, i) => s.classList.toggle('active', i === current));
            if (indicator) indicator.textContent = `Paso ${current + 1} de ${steps.length}`;
            if (prevBtn) prevBtn.disabled = current === 0;
            if (nextBtn) nextBtn.disabled = current === steps.length - 1;
        }
        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (current === 0) return;
            current--;
            render();
            wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (current === steps.length - 1) return;
            current++;
            render();
            wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        render();
    });

    /* ---------- Selección visual de una sola opción (choice-cards) ----------
       Tarjetas cliqueables (con ícono) para elegir UNA opción entre varias
       cerradas, en vez de un campo de texto libre. Se vinculan a un <select>
       oculto que conserva el atributo data-track real — así guardar/
       restaurar/limpiar/exportar siguen funcionando sin ningún cambio,
       porque ese código solo sabe leer/escribir .value de cualquier campo
       con data-track, sin importar si es visible. El estado visual se
       recalcula siempre a partir del valor real del <select> (al iniciar,
       y cada vez que ese valor cambia por cualquier vía: clic en una
       tarjeta, restaurar avance guardado, o el botón Limpiar). */
    document.querySelectorAll('.choice-cards[data-choice-for]').forEach((group) => {
        const select = document.getElementById(group.dataset.choiceFor);
        if (!select) return;
        const cards = Array.from(group.querySelectorAll('.choice-card'));
        function sync() {
            cards.forEach((card) => {
                card.classList.toggle('selected', card.dataset.choiceValue === select.value);
            });
        }
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                select.value = card.dataset.choiceValue;
                select.dispatchEvent(new Event('change'));
                sync();
            });
        });
        select.addEventListener('change', sync);
        select.addEventListener('input', sync);
        sync();
    });

    /* ---------- Checklist de chips de selección múltiple (chip-multi) ----------
       Misma idea que las choice-cards, pero para varias opciones a la vez
       (ej. bases de datos consultadas, criterios de evaluación aplicados).
       El valor combinado (lista separada por comas, más el texto de "Otra"
       si aplica) se guarda en un <input type="hidden"> con data-track, así
       se exporta como una línea de texto legible sin tocar la lógica de
       exportación existente. */
    document.querySelectorAll('.chip-multi[data-choice-for]').forEach((group) => {
        const hidden = document.getElementById(group.dataset.choiceFor);
        if (!hidden) return;
        const chips = Array.from(group.querySelectorAll('.chip-toggle'));
        const otherWrap = document.querySelector(`.chip-other-wrap[data-choice-for="${group.dataset.choiceFor}"]`);
        const otherInput = otherWrap ? otherWrap.querySelector('input') : null;
        const otherChip = chips.find((c) => c.dataset.chipOther !== undefined);

        function applyValue() {
            const labels = chips.filter((c) => c.classList.contains('selected') && c.dataset.chipOther === undefined).map((c) => c.dataset.chipValue);
            if (otherChip && otherChip.classList.contains('selected') && otherInput && otherInput.value.trim()) {
                labels.push(otherInput.value.trim());
            }
            hidden.value = labels.join(', ');
        }

        function syncFromHidden() {
            const parts = (hidden.value || '').split(',').map((s) => s.trim()).filter(Boolean);
            const knownLabels = chips.filter((c) => c.dataset.chipOther === undefined).map((c) => c.dataset.chipValue);
            chips.forEach((chip) => {
                if (chip.dataset.chipOther === undefined) {
                    chip.classList.toggle('selected', parts.includes(chip.dataset.chipValue));
                }
            });
            const leftover = parts.filter((p) => !knownLabels.includes(p));
            if (otherChip) {
                otherChip.classList.toggle('selected', leftover.length > 0);
                if (otherWrap) otherWrap.classList.toggle('active', leftover.length > 0);
                if (otherInput) otherInput.value = leftover.join(', ');
            }
        }

        chips.forEach((chip) => {
            chip.addEventListener('click', () => {
                if (chip.dataset.chipOther !== undefined) {
                    chip.classList.toggle('selected');
                    const active = chip.classList.contains('selected');
                    if (otherWrap) otherWrap.classList.toggle('active', active);
                    if (!active && otherInput) otherInput.value = '';
                    if (active && otherInput) otherInput.focus();
                } else {
                    chip.classList.toggle('selected');
                }
                // No se dispara un evento sobre "hidden" aquí a propósito: el
                // clic ya actualizó el estado visual de forma directa, y
                // volver a sincronizar desde hidden.value (pensado para
                // cambios EXTERNOS como restaurar avance o Limpiar) podría
                // deseleccionar la tarjeta "Otra" mientras su campo de texto
                // todavía está vacío (recién elegida, sin escribir aún).
                applyValue();
            });
        });
        if (otherInput) {
            otherInput.addEventListener('input', applyValue);
        }
        // Estos dos sí cubren cambios externos al valor real (restaurar
        // avance guardado, o el botón Limpiar poniendo hidden.value = '').
        hidden.addEventListener('input', syncFromHidden);
        hidden.addEventListener('change', syncFromHidden);
        syncFromHidden();
    });

    /* ---------- Lista dinámica de "agregar ítem" (item-list) ----------
       Para campos que antes eran 2-4 cajas de texto sueltas para el mismo
       tipo de dato (causas, efectos, objetivos específicos, categorías de
       estudio...). El estudiante escribe un ítem, lo agrega (botón o Enter)
       y aparece como una tarjeta con botón de quitar. Los ítems se guardan
       en un <textarea> real pero oculto (data-track), uno por línea — así
       guardar/restaurar/limpiar/exportar siguen sin cambios, y el texto
       exportado queda legible (una línea por ítem). */
    document.querySelectorAll('.item-list[data-item-for]').forEach((wrap) => {
        const native = document.getElementById(wrap.dataset.itemFor);
        if (!native) return;
        const input = wrap.querySelector('.item-list-input');
        const addBtn = wrap.querySelector('.item-list-add');
        const chipsWrap = wrap.querySelector('.item-list-chips');
        const maxItems = parseInt(wrap.dataset.itemMax || '6', 10);

        function getItems() {
            return (native.value || '').split('\n').map((s) => s.trim()).filter(Boolean);
        }
        function setItems(items) {
            native.value = items.join('\n');
        }
        function render() {
            const items = getItems();
            if (chipsWrap) {
                chipsWrap.innerHTML = '';
                items.forEach((text, idx) => {
                    const chip = document.createElement('span');
                    chip.className = 'item-chip';
                    const label = document.createElement('span');
                    label.textContent = text;
                    chip.appendChild(label);
                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'item-remove';
                    removeBtn.setAttribute('aria-label', 'Quitar');
                    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    removeBtn.addEventListener('click', () => {
                        const current = getItems();
                        current.splice(idx, 1);
                        setItems(current);
                        render();
                    });
                    chip.appendChild(removeBtn);
                    chipsWrap.appendChild(chip);
                });
            }
            const atMax = items.length >= maxItems;
            if (addBtn) addBtn.disabled = atMax;
            if (input) input.disabled = atMax;
        }
        function addCurrent() {
            if (!input) return;
            const text = input.value.trim();
            if (!text) return;
            const items = getItems();
            if (items.length >= maxItems) return;
            items.push(text);
            setItems(items);
            input.value = '';
            render();
            input.focus();
        }
        if (addBtn) addBtn.addEventListener('click', addCurrent);
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addCurrent();
                }
            });
        }
        // Cambios externos (restaurar avance guardado, botón Limpiar).
        native.addEventListener('input', render);
        native.addEventListener('change', render);
        render();
    });

    /* ---------- Mini-tabla de filas repetibles (row-list) ----------
       Igual idea que item-list, pero para datos con varias columnas por
       fila (ej. matriz de consistencia: pregunta/objetivo/categoría/
       indicador). Cada fila se guarda como una sola línea de texto con
       formato "Columna: valor | Columna: valor..." dentro del mismo
       <textarea> oculto con data-track, para que el texto exportado sea
       legible sin tener que enseñarle este formato a nadie. */
    document.querySelectorAll('.row-list[data-row-for]').forEach((wrap) => {
        const native = document.getElementById(wrap.dataset.rowFor);
        if (!native) return;
        const cols = (wrap.dataset.rowCols || '').split(',').map((s) => s.trim()).filter(Boolean);
        if (!cols.length) return;
        const colInputs = Array.from(wrap.querySelectorAll('.row-list-col'));
        const addBtn = wrap.querySelector('.row-list-add');
        const tableWrap = wrap.querySelector('.row-list-table-wrap');
        const tbody = wrap.querySelector('.row-list-body');
        const maxRows = parseInt(wrap.dataset.rowMax || '6', 10);

        function parseRow(line) {
            const values = cols.map(() => '');
            line.split(' | ').forEach((segment) => {
                const sepIdx = segment.indexOf(': ');
                if (sepIdx === -1) return;
                const label = segment.slice(0, sepIdx).trim();
                const value = segment.slice(sepIdx + 2).trim();
                const colIdx = cols.indexOf(label);
                if (colIdx !== -1) values[colIdx] = value;
            });
            return values;
        }
        function formatRow(values) {
            return cols.map((c, i) => `${c}: ${values[i] || ''}`).join(' | ');
        }
        function getRows() {
            return (native.value || '').split('\n').map((s) => s.trim()).filter(Boolean).map(parseRow);
        }
        function setRows(rows) {
            native.value = rows.map(formatRow).join('\n');
        }
        function render() {
            const rows = getRows();
            if (tbody) {
                tbody.innerHTML = '';
                rows.forEach((values, idx) => {
                    const tr = document.createElement('tr');
                    values.forEach((v) => {
                        const td = document.createElement('td');
                        td.textContent = v;
                        tr.appendChild(td);
                    });
                    const tdRemove = document.createElement('td');
                    tdRemove.className = 'row-list-remove-cell';
                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'row-list-remove';
                    removeBtn.setAttribute('aria-label', 'Quitar fila');
                    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    removeBtn.addEventListener('click', () => {
                        const current = getRows();
                        current.splice(idx, 1);
                        setRows(current);
                        render();
                    });
                    tdRemove.appendChild(removeBtn);
                    tr.appendChild(tdRemove);
                    tbody.appendChild(tr);
                });
            }
            if (tableWrap) tableWrap.classList.toggle('hidden', rows.length === 0);
            const atMax = rows.length >= maxRows;
            if (addBtn) addBtn.disabled = atMax;
        }
        function addCurrent() {
            const values = colInputs.map((inp) => inp.value.trim());
            if (values.every((v) => !v)) return;
            const rows = getRows();
            if (rows.length >= maxRows) return;
            rows.push(values);
            setRows(rows);
            colInputs.forEach((inp) => { inp.value = ''; });
            render();
            if (colInputs[0]) colInputs[0].focus();
        }
        if (addBtn) addBtn.addEventListener('click', addCurrent);
        colInputs.forEach((inp) => {
            inp.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addCurrent();
                }
            });
        });
        native.addEventListener('input', render);
        native.addEventListener('change', render);
        render();
    });

    /* ---------- Exportación de actividades (Word / PDF) ---------- */

    function collectExportFields(container) {
        const fields = [];
        container.querySelectorAll('[data-track]').forEach((el) => {
            if (el.type === 'checkbox') return;
            const label = container.querySelector(`label[for="${el.id}"]`) || embed.querySelector(`label[for="${el.id}"]`);
            const fieldLabel = label ? label.textContent.trim() : el.id;
            fields.push({ label: fieldLabel, value: el.value || 'Sin diligenciar' });
        });
        return fields;
    }

    function buildActivityHtml(scope) {
        const container = document.querySelector(`[data-export-scope="${scope}"]`) || document.getElementById(scope);
        if (!container) return '<p>No se encontró la actividad a exportar.</p>';
        const title = container.dataset.exportTitle || container.id;
        const fields = collectExportFields(container);
        const date = new Date().toLocaleString('es-CO');
        const body = fields.map((f) => `<h3>${f.label}</h3><div class="box">${f.value}</div>`).join('');
        return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Respuesta - ${title}</title><style>body{font-family:Arial,sans-serif;color:#263728;line-height:1.55;margin:36px}h1{color:#14532d;margin-bottom:4px}h2{color:#14532d;border-bottom:2px solid #5b9c46;padding-bottom:6px;margin-top:28px}h3{color:#1b5e20;margin-bottom:6px}.meta{color:#46543c;font-size:.95rem;margin-bottom:24px}.box{border:1px solid #cfe6c8;background:#f4f9f2;border-radius:10px;padding:14px;margin:10px 0 18px;white-space:pre-wrap}.footer{margin-top:36px;font-size:.9rem;color:#46543c;text-align:center}</style></head><body><h1>Respuesta de actividad</h1><div class="meta"><strong>Curso:</strong> ${courseTitle}<br><strong>Unidad:</strong> ${unitLabel}<br><strong>Fecha de exportación:</strong> ${date}</div><h2>${title}</h2>${body}<div class="footer">Centro de Innovación en TIC para el apoyo de la Docencia CINTIA - Universidad de Córdoba</div></body></html>`;
    }

    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Genera un PDF real (no HTML disfrazado) con la librería jsPDF, cargada
    // vía CDN en index.html (window.jspdf.jsPDF). Reutiliza los mismos
    // campos que ya recolecta collectExportFields() para Word.
    function buildActivityPdf(scope) {
        if (!window.jspdf || !window.jspdf.jsPDF) return null;
        const container = document.querySelector(`[data-export-scope="${scope}"]`) || document.getElementById(scope);
        if (!container) return null;
        const title = container.dataset.exportTitle || container.id;
        const fields = collectExportFields(container);
        const date = new Date().toLocaleString('es-CO');

        const doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 48;
        const maxWidth = pageWidth - margin * 2;
        let y = margin;

        function ensureSpace(lines) {
            const needed = lines * 14;
            if (y + needed > pageHeight - margin) {
                doc.addPage();
                y = margin;
            }
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(20, 83, 45);
        doc.text('Respuesta de actividad', margin, y);
        y += 22;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(70, 84, 60);
        [`Curso: ${courseTitle}`, `Unidad: ${unitLabel}`, `Fecha de exportación: ${date}`].forEach((line) => {
            doc.text(line, margin, y);
            y += 14;
        });
        y += 10;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(20, 83, 45);
        const titleLines = doc.splitTextToSize(title, maxWidth);
        ensureSpace(titleLines.length + 1);
        doc.text(titleLines, margin, y);
        y += titleLines.length * 16 + 8;

        fields.forEach((f) => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(27, 94, 32);
            const labelLines = doc.splitTextToSize(f.label, maxWidth);
            ensureSpace(labelLines.length + 3);
            doc.text(labelLines, margin, y);
            y += labelLines.length * 14 + 2;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(38, 55, 40);
            const valueLines = doc.splitTextToSize(String(f.value), maxWidth);
            valueLines.forEach((line) => {
                ensureSpace(1);
                doc.text(line, margin, y);
                y += 13;
            });
            y += 10;
        });

        return doc;
    }

    function exportActivity(scope, format) {
        if (format === 'pdf') {
            const pdfDoc = buildActivityPdf(scope);
            if (pdfDoc) {
                pdfDoc.save(`Respuesta_${scope}.pdf`);
                return;
            }
            // Si jsPDF no cargó (p. ej. sin conexión a internet), no se genera
            // un archivo falso: se avisa en vez de descargar algo que no abre.
            alert('No se pudo generar el PDF (la librería no cargó). Verifica tu conexión a internet e inténtalo de nuevo.');
            return;
        }
        const html = buildActivityHtml(scope);
        // "word" se guarda con extensión .doc (no .docx): es el truco clásico
        // con el que Word abre directamente un archivo HTML sin marcarlo como
        // corrupto. Con extensión ".word" (como estaba antes) Windows no
        // reconoce el archivo y no se podía abrir con doble clic.
        const filename = `Respuesta_${scope}.doc`;
        downloadFile(filename, html);
    }

    /* ---------- Autoevaluación (quiz) ----------
       Las preguntas se leen de un bloque <script type="application/json"
       id="quiz-data"> en el index.html de cada unidad (no se editan aquí,
       para que este archivo siga siendo el mismo en las 3 unidades).
       Si no hay bloque de datos o el arreglo viene vacío, el quiz se
       oculta automáticamente y se muestra un aviso. */

    let quizQuestions = [];
    try {
        const quizDataEl = document.getElementById('quiz-data');
        if (quizDataEl) quizQuestions = JSON.parse(quizDataEl.textContent);
    } catch (e) {
        quizQuestions = [];
    }

    const quizBox = document.getElementById('quiz-box');
    const quizResults = document.getElementById('quiz-results');

    if (quizQuestions.length === 0) {
        if (quizBox) quizBox.innerHTML = '<p class="text-slate-600">La autoevaluación de esta unidad se publicará próximamente.</p>';
        if (quizResults) quizResults.classList.add('hidden');
    } else if (quizBox) {
        let currentQuestion = 0;
        let userAnswers = [];
        const quizTitle = document.getElementById('quiz-title');
        const quizText = document.getElementById('quiz-text');
        const quizOptions = document.getElementById('quiz-options');
        const quizProgress = document.getElementById('quiz-progress');
        const quizScore = document.getElementById('quiz-score');
        const quizFeedback = document.getElementById('quiz-feedback');
        const quizReview = document.getElementById('quiz-review');

        function loadQuestion() {
            const q = quizQuestions[currentQuestion];
            quizTitle.textContent = `Pregunta ${currentQuestion + 1}`;
            quizText.textContent = q.question;
            quizProgress.textContent = `${currentQuestion + 1}/${quizQuestions.length}`;
            quizOptions.innerHTML = '';
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'quiz-option';
                btn.textContent = opt;
                if (userAnswers[currentQuestion] === i) btn.classList.add('selected');
                btn.addEventListener('click', () => selectOption(i));
                quizOptions.appendChild(btn);
            });
            document.getElementById('quiz-prev').disabled = currentQuestion === 0;
            document.getElementById('quiz-next').textContent = currentQuestion === quizQuestions.length - 1 ? 'Finalizar' : 'Siguiente';
        }

        function selectOption(index) {
            userAnswers[currentQuestion] = index;
            loadQuestion();
        }

        document.getElementById('quiz-prev').addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
            }
        });

        document.getElementById('quiz-next').addEventListener('click', () => {
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                showResults();
            }
        });

        function showResults() {
            let score = 0;
            quizReview.innerHTML = '';
            quizQuestions.forEach((q, i) => {
                const correct = userAnswers[i] === q.correct;
                if (correct) score++;
                const reviewItem = document.createElement('div');
                reviewItem.className = correct ? 'p-3 rounded-lg bg-green-50 border border-green-200' : 'p-3 rounded-lg bg-red-50 border border-red-200';
                reviewItem.innerHTML = `<p class="font-bold">${i + 1}. ${q.question}</p><p class="text-sm mt-1">Tu respuesta: ${q.options[userAnswers[i]] || 'Sin responder'}</p>${!correct ? `<p class="text-sm text-green-700">Correcta: ${q.options[q.correct]}</p>` : ''}`;
                quizReview.appendChild(reviewItem);
            });
            quizScore.textContent = score;
            quizFeedback.textContent = score >= 7 ? '¡Excelente! Demuestras una buena comprensión de la unidad.' : score >= 5 ? 'Buen trabajo. Repasa algunos conceptos clave para fortalecer tu comprensión.' : 'Te recomendamos revisar nuevamente los contenidos de la unidad.';
            quizBox.classList.add('hidden');
            quizResults.classList.remove('hidden');
        }

        const quizRestart = document.getElementById('quiz-restart');
        if (quizRestart) {
            quizRestart.addEventListener('click', () => {
                currentQuestion = 0;
                userAnswers = [];
                quizBox.classList.remove('hidden');
                quizResults.classList.add('hidden');
                loadQuestion();
                // El bloque de resultados/revisión puede ser mucho más alto que
                // la primera pregunta del quiz (sobre todo con varias respuestas
                // falladas, donde se listan las correctas). Al reiniciar, el
                // contenido se encoge de golpe pero el navegador no ajusta el
                // scroll solo: si el usuario estaba desplazado hacia abajo para
                // ver el botón "Reiniciar", se queda viendo una pantalla en
                // blanco (el resto de la página, ahora mucho más corta, quedó
                // por encima de donde sigue apuntando el scroll). Se corrige
                // llevando la vista de vuelta al inicio del cuestionario.
                quizBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        loadQuestion();
    }
})();
