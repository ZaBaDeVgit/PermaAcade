/**
 * PermaAcade History Utility
 * Track recently played/accessed content
 */
const History = {
  STORAGE_KEY: 'history',
  MAX_ITEMS: 10,

  /**
   * Get history items
   * @returns {Array}
   */
  getAll() {
    return Storage.get(this.STORAGE_KEY, []);
  },

  /**
   * Add item to history
   * @param {Object} item - { type, id, title, progress, duration }
   */
  add(item) {
    const history = this.getAll();
    
    // Remove existing entry with same type+id
    const filtered = history.filter(h => !(h.type === item.type && h.id === item.id));
    
    // Add new entry at beginning
    filtered.unshift({
      ...item,
      timestamp: Date.now(),
      viewedAt: new Date().toISOString()
    });

    // Keep only last MAX_ITEMS
    const trimmed = filtered.slice(0, this.MAX_ITEMS);
    Storage.set(this.STORAGE_KEY, trimmed);
    
    return trimmed;
  },

  /**
   * Update progress for an item
   * @param {string} type
   * @param {string} id
   * @param {number} progress - 0-1
   */
  updateProgress(type, id, progress) {
    const history = this.getAll();
    const index = history.findIndex(h => h.type === type && h.id === id);
    
    if (index >= 0) {
      history[index].progress = progress;
      history[index].timestamp = Date.now();
      Storage.set(this.STORAGE_KEY, history);
    }
  },

  /**
   * Get last item (for resume)
   * @returns {Object|null}
   */
  getLast() {
    const history = this.getAll();
    return history[0] || null;
  },

  /**
   * Get history by type
   * @param {string} type
   * @returns {Array}
   */
  getByType(type) {
    return this.getAll().filter(h => h.type === type);
  },

  /**
   * Clear all history
   */
  clear() {
    Storage.remove(this.STORAGE_KEY);
  },

  /**
   * Render resume widget to container
   * @param {string} containerId
   * @param {Object} contentMap - Map of id -> content item for rendering
   */
  renderResumeWidget(containerId, contentMap = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const last = this.getLast();
    if (!last) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-500">
          <p class="text-sm">No hay contenido reciente</p>
          <p class="text-xs mt-1">Empieza a estudiar para ver tu progreso aquí</p>
        </div>
      `;
      return;
    }

    const content = contentMap[last.id] || {};
    const progress = last.progress || 0;
    const percent = Math.round(progress * 100);

    const icons = {
      podcast: '🎧',
      video: '🎬',
      lectura: '📖',
      test: '📝'
    };

    container.innerHTML = `
      <div class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
        <div class="text-3xl">${icons[last.type] || '📚'}</div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-emerald-400 font-medium mb-1">Continuar donde lo dejaste</p>
          <p class="text-white font-semibold truncate">${last.title || content.title || 'Contenido'}</p>
          <div class="mt-2 flex items-center gap-2">
            <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full transition-all" style="width: ${percent}%"></div>
            </div>
            <span class="text-xs text-slate-400">${percent}%</span>
          </div>
        </div>
        <a href="${last.url || this.getUrlForType(last.type, last.id)}" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors">
          Continuar
        </a>
      </div>
    `;
  },

  /**
   * Get URL for content type
   * @param {string} type
   * @param {string} id
   * @returns {string}
   */
  getUrlForType(type, id) {
    const urls = {
      podcast: `podcasts.html?id=${id}`,
      video: `videos.html?id=${id}`,
      lectura: `lecturas.html?id=${id}`,
      test: `tests.html?test=${id}`
    };
    return urls[type] || 'dashboard.html';
  }
};

// Freeze to prevent accidental modification
Object.freeze(History);
