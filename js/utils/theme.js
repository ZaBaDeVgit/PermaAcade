/**
 * PermaAcade Theme Utility
 * Dark mode toggle with system preference detection
 */
const Theme = {
  STORAGE_KEY: 'theme',
  DARK_CLASS: 'dark',
  
  /**
   * Get current theme setting
   * @returns {'dark' | 'light' | 'system'}
   */
  getMode() {
    return Storage.get(this.STORAGE_KEY, 'system');
  },

  /**
   * Set theme mode
   * @param {'dark' | 'light' | 'system'} mode
   */
  setMode(mode) {
    Storage.set(this.STORAGE_KEY, mode);
    this.apply();
  },

  /**
   * Check if dark mode should be active
   * @returns {boolean}
   */
  isDark() {
    const mode = this.getMode();
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return mode === 'dark';
  },

  /**
   * Toggle between light and dark
   */
  toggle() {
    const current = this.isDark();
    this.setMode(current ? 'light' : 'dark');
  },

  /**
   * Apply theme to document
   */
  apply() {
    if (this.isDark()) {
      document.documentElement.classList.add(this.DARK_CLASS);
    } else {
      document.documentElement.classList.remove(this.DARK_CLASS);
    }
    this.updateToggleIcon();
    this.updateMetaThemeColor();
  },

  /**
   * Initialize theme system
   */
  init() {
    // Apply initial theme
    this.apply();

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.getMode() === 'system') {
        this.apply();
      }
    });

    // Create toggle button if not exists
    this.createToggleButton();

    // Prevent flash of wrong theme
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  },

  /**
   * Create dark mode toggle button in sidebar
   */
  createToggleButton() {
    // Check if already exists
    if (document.getElementById('themeToggle')) return;

    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Find the user area (after the nav)
    const nav = sidebar.querySelector('nav');
    if (!nav) return;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'themeToggle';
    toggleBtn.type = 'button';
    toggleBtn.className = 'flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-200 w-full';
    toggleBtn.setAttribute('aria-label', 'Cambiar tema');
    toggleBtn.setAttribute('title', 'Cambiar tema');
    toggleBtn.innerHTML = `
      <svg id="themeIconSun" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
      <svg id="themeIconMoon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
      </svg>
      <span class="sidebar-text text-sm font-medium">Tema</span>
    `;

    toggleBtn.addEventListener('click', () => this.toggle());

    // Insert after nav
    nav.insertAdjacentElement('afterend', toggleBtn);

    // Update icon state
    this.updateToggleIcon();
  },

  /**
   * Update toggle button icon based on current theme
   */
  updateToggleIcon() {
    const sunIcon = document.getElementById('themeIconSun');
    const moonIcon = document.getElementById('themeIconMoon');
    if (!sunIcon || !moonIcon) return;

    if (this.isDark()) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  },

  /**
   * Update meta theme-color for mobile browsers
   */
  updateMetaThemeColor() {
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = this.isDark() ? '#0f172a' : '#f8fafc';
  },

  /**
   * Get theme-aware color value
   * @param {string} lightColor
   * @param {string} darkColor
   * @returns {string}
   */
  getColor(lightColor, darkColor) {
    return this.isDark() ? darkColor : lightColor;
  }
};

// Freeze to prevent accidental modification
Object.freeze(Theme);
