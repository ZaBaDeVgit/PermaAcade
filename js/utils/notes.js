/**
 * PermaAcade Notes Utility
 * Quick notes per content item
 */
const Notes = {
  STORAGE_KEY: 'notes',

  /**
   * Get all notes
   * @returns {Object}
   */
  getAll() {
    return Storage.get(this.STORAGE_KEY, {});
  },

  /**
   * Get note for specific content
   * @param {string} contentId
   * @returns {string|null}
   */
  get(contentId) {
    const notes = this.getAll();
    return notes[contentId]?.text || null;
  },

  /**
   * Get note with metadata
   * @param {string} contentId
   * @returns {Object|null}
   */
  getWithMeta(contentId) {
    const notes = this.getAll();
    return notes[contentId] || null;
  },

  /**
   * Save note for content
   * @param {string} contentId
   * @param {string} text
   * @returns {Object}
   */
  save(contentId, text) {
    const notes = this.getAll();
    notes[contentId] = {
      text: text.trim(),
      updatedAt: new Date().toISOString()
    };
    Storage.set(this.STORAGE_KEY, notes);
    return notes[contentId];
  },

  /**
   * Delete note
   * @param {string} contentId
   */
  delete(contentId) {
    const notes = this.getAll();
    delete notes[contentId];
    Storage.set(this.STORAGE_KEY, notes);
  },

  /**
   * Get all notes as array
   * @returns {Array}
   */
  getAllAsArray() {
    const notes = this.getAll();
    return Object.entries(notes)
      .map(([id, data]) => ({ id, ...data }))
      .filter(n => n.text)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  /**
   * Render notes button for content
   * @param {string} contentId
   * @param {string} containerId
   * @param {Object} options
   */
  renderButton(contentId, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const note = this.get(contentId);
    const hasNote = !!note;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
      hasNote 
        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' 
        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
    }`;
    btn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
      <span class="text-sm">${hasNote ? 'Nota' : 'Añadir nota'}</span>
    `;

    btn.addEventListener('click', () => this.showNoteModal(contentId, options));

    // Clear container and add button
    container.innerHTML = '';
    container.appendChild(btn);
  },

  /**
   * Show note modal
   * @param {string} contentId
   * @param {Object} options
   */
  showNoteModal(contentId, options = {}) {
    const { title = 'Nota', onSave = null } = options;
    const existingNote = this.get(contentId);

    const modal = document.createElement('div');
    modal.id = 'noteModal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="Notes.closeModal()"></div>
      <div class="relative bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-orbitron text-lg font-bold text-white">${title}</h2>
          <button onclick="Notes.closeModal()" class="text-slate-400 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <textarea 
          id="noteTextarea" 
          class="w-full h-40 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-emerald-500"
          placeholder="Escribe tu nota aquí..."
        >${existingNote || ''}</textarea>
        <div class="flex items-center justify-between mt-4">
          ${existingNote ? `
            <button onclick="Notes.deleteNote('${contentId}')" class="text-red-400 hover:text-red-300 text-sm">
              Eliminar nota
            </button>
          ` : '<div></div>'}
          <div class="flex gap-2">
            <button onclick="Notes.closeModal()" class="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors">
              Cancelar
            </button>
            <button onclick="Notes.saveNote('${contentId}')" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors">
              Guardar
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Focus textarea
    const textarea = document.getElementById('noteTextarea');
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  },

  /**
   * Save note from modal
   * @param {string} contentId
   */
  saveNote(contentId) {
    const textarea = document.getElementById('noteTextarea');
    if (!textarea) return;

    const text = textarea.value.trim();
    if (text) {
      this.save(contentId, text);
      App?.showToast?.('Nota guardada', 'success');
    }
    this.closeModal();
  },

  /**
   * Delete note
   * @param {string} contentId
   */
  deleteNote(contentId) {
    this.delete(contentId);
    this.closeModal();
    App?.showToast?.('Nota eliminada', 'info');
  },

  /**
   * Close modal
   */
  closeModal() {
    const modal = document.getElementById('noteModal');
    if (modal) modal.remove();
  }
};

// Freeze to prevent accidental modification
Object.freeze(Notes);
