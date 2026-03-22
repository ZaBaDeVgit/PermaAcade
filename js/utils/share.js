/**
 * PermaAcade Share Utility
 * Share content with Web Share API or clipboard fallback
 */
const Share = {
  /**
   * Share content
   * @param {Object} options
   * @returns {Promise<boolean>}
   */
  async share(options = {}) {
    const {
      title = document.title,
      text = '',
      url = window.location.href,
      timestamp = null
    } = options;

    // Add timestamp if provided (for podcasts/videos)
    let shareUrl = url;
    if (timestamp !== null) {
      const separator = url.includes('?') ? '&' : '?';
      shareUrl = `${url}${separator}t=${Math.floor(timestamp)}`;
    }

    // Try Web Share API first (mobile)
    if (this.canUseWebShare()) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl
        });
        return true;
      } catch (error) {
        if (error.name === 'AbortError') {
          // User cancelled - not an error
          return false;
        }
        // Fall through to clipboard
      }
    }

    // Fallback: Copy to clipboard
    return this.copyToClipboard(shareUrl);
  },

  /**
   * Check if Web Share API is available
   * @returns {boolean}
   */
  canUseWebShare() {
    return !!(navigator.share && navigator.canShare);
  },

  /**
   * Copy text to clipboard
   * @param {string} text
   * @returns {Promise<boolean>}
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      App?.showToast?.('¡Enlace copiado!', 'success');
      return true;
    } catch (error) {
      // Fallback for older browsers
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        App?.showToast?.('¡Enlace copiado!', 'success');
        return true;
      } catch (fallbackError) {
        App?.showToast?.('No se pudo copiar el enlace', 'error');
        return false;
      }
    }
  },

  /**
   * Create share button
   * @param {string} containerId
   * @param {Object} options
   */
  createButton(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors';
    btn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
      </svg>
      <span class="text-sm">Compartir</span>
    `;

    btn.addEventListener('click', () => {
      this.share(options);
    });

    container.innerHTML = '';
    container.appendChild(btn);
  },

  /**
   * Create share dropdown
   * @param {string} containerId
   * @param {Object} options
   */
  createDropdown(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { platforms = ['copy', 'twitter', 'whatsapp', 'telegram'] } = options;

    const dropdown = document.createElement('div');
    dropdown.className = 'relative';
    
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors';
    btn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
      </svg>
      <span class="text-sm">Compartir</span>
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    `;

    const menu = document.createElement('div');
    menu.className = 'absolute bottom-full left-0 mb-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden hidden min-w-[160px]';
    menu.innerHTML = `
      <div class="py-1">
        ${platforms.map(platform => this.getPlatformButton(platform, options)).join('')}
      </div>
    `;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });

    // Close on click outside
    document.addEventListener('click', () => {
      menu.classList.add('hidden');
    });

    dropdown.appendChild(btn);
    dropdown.appendChild(menu);
    container.innerHTML = '';
    container.appendChild(dropdown);
  },

  /**
   * Get platform button HTML
   * @param {string} platform
   * @param {Object} options
   * @returns {string}
   */
  getPlatformButton(platform, options) {
    const { url, title } = options;
    
    const platforms = {
      copy: {
        icon: '📋',
        label: 'Copiar enlace',
        action: () => this.copyToClipboard(url)
      },
      twitter: {
        icon: '🐦',
        label: 'Twitter',
        action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
      },
      whatsapp: {
        icon: '💬',
        label: 'WhatsApp',
        action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank')
      },
      telegram: {
        icon: '✈️',
        label: 'Telegram',
        action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
      },
      facebook: {
        icon: '📘',
        label: 'Facebook',
        action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
      }
    };

    const p = platforms[platform];
    if (!p) return '';

    return `
      <button onclick="Share.getPlatformButton('${platform}', ${JSON.stringify(options)}).action(); this.closest('.relative').querySelector('div:last-child').classList.add('hidden');" class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-700/50 text-left text-sm text-slate-300 hover:text-white transition-colors">
        <span>${p.icon}</span>
        <span>${p.label}</span>
      </button>
    `;
  }
};

// Helper for onclick
Share.getPlatformButton = function(platform, options) {
  const { url, title } = options;
  
  const actions = {
    copy: () => Share.copyToClipboard(url),
    twitter: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank'),
    whatsapp: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank'),
    telegram: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank'),
    facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  };
  
  return { action: actions[platform] || (() => {}) };
};

// Freeze to prevent accidental modification
Object.freeze(Share);
