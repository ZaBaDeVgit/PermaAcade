/**
 * PermaAcade Search Utility
 * Global search with in-memory index
 */
const Search = {
  index: null,
  DEBOUNCE_MS: 300,

  /**
   * Build search index from AcademyContent
   * @returns {Array}
   */
  buildIndex() {
    if (this.index) return this.index;

    const items = [];
    const content = window.AcademyContent || {};
    const testsData = window.testsData || {};

    // Topics
    (content.topics || []).forEach(topic => {
      items.push({
        id: topic.id,
        category: 'temas',
        kind: 'tema',
        title: topic.title,
        subtitle: topic.desc,
        color: topic.color,
        url: topic.pdf,
        pageUrl: 'temas.html',
        icon: '📚'
      });
    });

    // Videos
    (content.videos || []).forEach(video => {
      items.push({
        id: video.id,
        category: 'videos',
        kind: 'video',
        title: video.titulo,
        subtitle: video.desc,
        color: video.color,
        url: 'videos.html',
        pageUrl: 'videos.html',
        icon: '🎬'
      });
    });

    // Podcasts
    (content.podcasts || []).forEach(podcast => {
      items.push({
        id: podcast.id,
        category: 'podcasts',
        kind: 'podcast',
        title: podcast.title,
        subtitle: podcast.desc,
        color: podcast.color,
        url: 'podcasts.html',
        pageUrl: 'podcasts.html',
        icon: '🎧'
      });
    });

    // Readings
    (content.readings || []).forEach(reading => {
      items.push({
        id: reading.id,
        category: 'lecturas',
        kind: 'lectura',
        title: reading.titulo,
        subtitle: reading.desc,
        color: reading.color,
        url: reading.archivo,
        pageUrl: 'lecturas.html',
        icon: '📖'
      });
    });

    // Esquemas
    (content.esquemas || []).forEach(item => {
      items.push({
        id: item.id,
        category: 'esquemas',
        kind: 'esquema',
        title: item.titulo,
        subtitle: item.desc,
        color: item.color,
        url: 'esquemas.html',
        pageUrl: 'esquemas.html',
        icon: '🗺️'
      });
    });

    // Infografías
    (content.infografias || []).forEach(item => {
      items.push({
        id: item.id,
        category: 'infografias',
        kind: 'infografia',
        title: item.titulo,
        subtitle: item.desc,
        color: item.color,
        url: item.archivo,
        pageUrl: 'infografias.html',
        icon: '📊'
      });
    });

    // Presentaciones
    (content.presentations || []).forEach(pres => {
      items.push({
        id: pres.id,
        category: 'presentaciones',
        kind: 'presentacion',
        title: pres.titulo,
        subtitle: pres.desc,
        color: pres.color,
        url: 'presentaciones.html',
        pageUrl: 'presentaciones.html',
        icon: '📽️'
      });
    });

    // Organigrams
    (content.organigrams || []).forEach(org => {
      items.push({
        id: org.id,
        category: 'organigramas',
        kind: 'organigrama',
        title: org.title,
        subtitle: org.description,
        color: org.color || 'cyan',
        url: `organigrama/index.html#${encodeURIComponent(org.id)}`,
        pageUrl: `organigrama/index.html`,
        icon: '🏛️'
      });
    });

    // Tests
    Object.entries(testsData).forEach(([key, value]) => {
      if (!value?.questions?.length) return;
      items.push({
        id: key,
        category: 'tests',
        kind: key.startsWith('examen_') ? 'examen' : 'test',
        title: value.title || key,
        subtitle: `${value.questions.length} preguntas`,
        color: key.startsWith('examen_') ? 'rose' : 'cyan',
        url: `tests.html?test=${encodeURIComponent(key)}`,
        pageUrl: `tests.html`,
        icon: '📝'
      });
    });

    // Special tests
    items.push({
      id: 'aleatorio_20',
      category: 'tests',
      kind: 'test',
      title: 'Test aleatorio de 20 preguntas',
      subtitle: 'Mezcla rápida de todo el temario',
      color: 'emerald',
      url: 'tests.html?test=aleatorio_20',
      pageUrl: 'tests.html',
      icon: '🎲'
    });

    items.push({
      id: 'falladas',
      category: 'tests',
      kind: 'test',
      title: 'Repasar preguntas falladas',
      subtitle: 'Solo preguntas incorrectas guardadas',
      color: 'amber',
      url: 'tests.html?test=falladas',
      pageUrl: 'tests.html',
      icon: '📌'
    });

    this.index = items;
    return items;
  },

  /**
   * Search index for query
   * @param {string} query
   * @param {number} limit - Max results per category
   * @returns {Array}
   */
  query(query, limit = 5) {
    const index = this.buildIndex();
    const normalized = String(query || '').trim().toLowerCase();

    if (!normalized) return index.slice(0, 10);

    const results = index.filter(item => {
      const searchable = [
        item.title,
        item.subtitle,
        item.kind,
        item.category
      ].join(' ').toLowerCase();

      return searchable.includes(normalized);
    });

    // Group by category
    const grouped = {};
    results.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      if (grouped[item.category].length < limit) {
        grouped[item.category].push(item);
      }
    });

    // Flatten with category headers
    const flat = [];
    Object.entries(grouped).forEach(([category, items]) => {
      flat.push({ type: 'header', category });
      flat.push(...items);
    });

    return flat;
  },

  /**
   * Create search UI component
   */
  createUI() {
    // Check if already exists
    if (document.getElementById('globalSearch')) return;

    const header = document.querySelector('header') || document.querySelector('nav');
    if (!header) return;

    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.id = 'globalSearch';
    searchContainer.className = 'relative';
    searchContainer.innerHTML = `
      <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 focus-within:border-emerald-500/50 transition-colors">
        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input 
          type="text" 
          id="searchInput"
          placeholder="Buscar..." 
          class="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-40 focus:w-64 transition-all"
        />
        <kbd class="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-xs text-slate-500 bg-slate-700/50">/</kbd>
      </div>
      <div id="searchResults" class="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden hidden z-50 max-h-96 overflow-y-auto"></div>
    `;

    header.appendChild(searchContainer);

    // Event listeners
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    let debounceTimer;

    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => this.showResults(e.target.value), this.DEBOUNCE_MS);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) {
        this.showResults(input.value);
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target)) {
        results.classList.add('hidden');
      }
    });

    // Keyboard shortcut: / to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        input.focus();
      }
      if (e.key === 'Escape') {
        input.blur();
        results.classList.add('hidden');
      }
    });
  },

  /**
   * Show search results dropdown
   * @param {string} query
   */
  showResults(query) {
    const results = document.getElementById('searchResults');
    if (!results) return;

    if (!query.trim()) {
      results.classList.add('hidden');
      return;
    }

    const items = this.query(query);

    if (items.length === 0) {
      results.innerHTML = `
        <div class="p-4 text-center text-slate-500">
          <p class="text-sm">No se encontraron resultados</p>
        </div>
      `;
      results.classList.remove('hidden');
      return;
    }

    const categoryLabels = {
      temas: '📚 Temas',
      videos: '🎬 Vídeos',
      podcasts: '🎧 Podcasts',
      lecturas: '📖 Lecturas',
      esquemas: '🗺️ Esquemas',
      infografias: '📊 Infografías',
      presentaciones: '📽️ Presentaciones',
      organigramas: '🏛️ Organigramas',
      tests: '📝 Tests'
    };

    results.innerHTML = items.map(item => {
      if (item.type === 'header') {
        return `
          <div class="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-800/50 sticky top-0">
            ${categoryLabels[item.category] || item.category}
          </div>
        `;
      }
      return `
        <a href="${item.url}" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/70 transition-colors border-b border-slate-800/50 last:border-0">
          <span class="text-lg">${item.icon}</span>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">${item.title}</p>
            <p class="text-xs text-slate-500 truncate">${item.subtitle}</p>
          </div>
          <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      `;
    }).join('');

    results.classList.remove('hidden');
  }
};

// Freeze to prevent accidental modification
Object.freeze(Search);
