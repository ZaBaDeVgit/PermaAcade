/**
 * PermaAcade Keyboard Shortcuts Utility
 * Global keyboard shortcuts handler
 */
const Shortcuts = {
  shortcuts: {
    '?': { label: 'Mostrar atajos', action: 'showHelp' },
    's': { label: 'Buscar', action: 'focusSearch' },
    'g h': { label: 'Ir a inicio', action: 'goHome' },
    'g d': { label: 'Ir a dashboard', action: 'goDashboard' },
    'g p': { label: 'Ir a podcasts', action: 'goPodcasts' },
    'g t': { label: 'Ir a tests', action: 'goTests' },
    'escape': { label: 'Cerrar modal/búsqueda', action: 'closeModal' },
    'm': { label: 'Toggle dark mode', action: 'toggleTheme' }
  },

  audioShortcuts: {
    ' ': { label: 'Play/Pause', action: 'togglePlay' },
    'arrowleft': { label: 'Retroceder 10s', action: 'seekBack' },
    'arrowright': { label: 'Adelantar 10s', action: 'seekForward' },
    'arrowup': { label: 'Subir volumen', action: 'volumeUp' },
    'arrowdown': { label: 'Bajar volumen', action: 'volumeDown' },
    'm': { label: 'Silenciar', action: 'toggleMute' }
  },

  /**
   * Initialize shortcuts handler
   */
  init() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  },

  /**
   * Handle keydown event
   * @param {KeyboardEvent} e
   */
  handleKeydown(e) {
    // Don't trigger if typing in input/textarea
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
      // Only allow Escape in inputs
      if (e.key !== 'Escape') return;
    }

    // Build shortcut key
    let key = e.key.toLowerCase();
    if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts
    if (e.altKey) return;

    // Handle special keys
    if (e.key === ' ') {
      e.preventDefault();
      key = ' ';
    }

    // Check for two-key combos (g + key)
    if (key === 'g' && !e.target.closest('input')) {
      this.waitingForSecondKey = true;
      setTimeout(() => { this.waitingForSecondKey = false; }, 1000);
      return;
    }

    if (this.waitingForSecondKey) {
      this.waitingForSecondKey = false;
      key = 'g ' + key;
    }

    // Check main shortcuts
    const shortcut = this.shortcuts[key];
    if (shortcut) {
      e.preventDefault();
      this.execute(shortcut.action);
      return;
    }

    // Check audio shortcuts (only on podcast pages)
    if (this.isPodcastPage()) {
      const audioShortcut = this.audioShortcuts[key];
      if (audioShortcut) {
        e.preventDefault();
        this.executeAudio(audioShortcut.action);
      }
    }
  },

  /**
   * Execute a shortcut action
   * @param {string} action
   */
  execute(action) {
    switch (action) {
      case 'showHelp':
        this.showHelp();
        break;
      case 'focusSearch':
        this.focusSearch();
        break;
      case 'goHome':
        window.location.href = 'index.html';
        break;
      case 'goDashboard':
        window.location.href = 'dashboard.html';
        break;
      case 'goPodcasts':
        window.location.href = 'podcasts.html';
        break;
      case 'goTests':
        window.location.href = 'tests.html';
        break;
      case 'closeModal':
        this.closeModal();
        break;
      case 'toggleTheme':
        Theme.toggle();
        break;
    }
  },

  /**
   * Execute audio-specific shortcut
   * @param {string} action
   */
  executeAudio(action) {
    const audio = document.querySelector('audio');
    if (!audio) return;

    switch (action) {
      case 'togglePlay':
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
        break;
      case 'seekBack':
        audio.currentTime = Math.max(0, audio.currentTime - 10);
        break;
      case 'seekForward':
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        break;
      case 'volumeUp':
        audio.volume = Math.min(1, audio.volume + 0.1);
        break;
      case 'volumeDown':
        audio.volume = Math.max(0, audio.volume - 0.1);
        break;
      case 'toggleMute':
        audio.muted = !audio.muted;
        break;
    }
  },

  /**
   * Check if current page has audio content
   * @returns {boolean}
   */
  isPodcastPage() {
    return window.location.pathname.includes('podcasts');
  },

  /**
   * Focus search input
   */
  focusSearch() {
    const input = document.getElementById('searchInput');
    if (input) {
      input.focus();
      input.select();
    }
  },

  /**
   * Close any open modal
   */
  closeModal() {
    // Close any visible modals
    document.querySelectorAll('.fixed.inset-0.z-\\[100\\]').forEach(modal => {
      modal.remove();
    });
    document.querySelectorAll('[id$="Modal"]').forEach(modal => {
      if (!modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
      }
    });
    document.body.style.overflow = '';
  },

  /**
   * Show shortcuts help overlay
   */
  showHelp() {
    // Don't show if already visible
    if (document.getElementById('shortcutsHelp')) {
      document.getElementById('shortcutsHelp').remove();
      return;
    }

    const shortcuts = [
      { key: '?', desc: 'Mostrar/ocultar atajos' },
      { key: '/', desc: 'Enfocar búsqueda' },
      { key: 'S', desc: 'Enfocar búsqueda' },
      { key: 'M', desc: 'Cambiar tema' },
      { key: 'Esc', desc: 'Cerrar modal' },
      { key: 'G H', desc: 'Ir a inicio' },
      { key: 'G D', desc: 'Ir a dashboard' },
      { key: 'G P', desc: 'Ir a podcasts' },
      { key: 'G T', desc: 'Ir a tests' }
    ];

    const audioShortcuts = [
      { key: 'Espacio', desc: 'Play/Pause' },
      { key: '←', desc: 'Retroceder 10s' },
      { key: '→', desc: 'Adelantar 10s' },
      { key: '↑', desc: 'Subir volumen' },
      { key: '↓', desc: 'Bajar volumen' },
      { key: 'M', desc: 'Silenciar' }
    ];

    const overlay = document.createElement('div');
    overlay.id = 'shortcutsHelp';
    overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
    overlay.innerHTML = `
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="Shortcuts.showHelp()"></div>
      <div class="relative bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-orbitron text-lg font-bold text-white">Atajos de Teclado</h2>
          <button onclick="Shortcuts.showHelp()" class="text-slate-400 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">General</h3>
          <div class="space-y-1">
            ${shortcuts.map(s => `
              <div class="flex items-center justify-between py-1">
                <span class="text-sm text-slate-300">${s.desc}</span>
                <kbd class="px-2 py-1 rounded bg-slate-800 text-xs text-emerald-400 font-mono">${s.key}</kbd>
              </div>
            `).join('')}
          </div>
        </div>

        ${this.isPodcastPage() ? `
        <div>
          <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Audio</h3>
          <div class="space-y-1">
            ${audioShortcuts.map(s => `
              <div class="flex items-center justify-between py-1">
                <span class="text-sm text-slate-300">${s.desc}</span>
                <kbd class="px-2 py-1 rounded bg-slate-800 text-xs text-emerald-400 font-mono">${s.key}</kbd>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on Escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
};

// Freeze to prevent accidental modification
Object.freeze(Shortcuts);
