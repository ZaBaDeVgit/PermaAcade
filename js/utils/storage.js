/**
 * PermaAcade Storage Utility
 * Typed localStorage wrapper with automatic JSON serialization
 */
const Storage = {
  PREFIX: 'perma_',

  /**
   * Get item from localStorage with JSON parsing
   * @param {string} key - Storage key (without prefix)
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Parsed value or default
   */
  get(key, defaultValue = null) {
    try {
      const fullKey = this.PREFIX + key;
      const item = localStorage.getItem(fullKey);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`Storage.get failed for ${key}:`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage with JSON serialization
   * @param {string} key - Storage key (without prefix)
   * @param {*} value - Value to store
   */
  set(key, value) {
    try {
      const fullKey = this.PREFIX + key;
      localStorage.setItem(fullKey, JSON.stringify(value));
    } catch (error) {
      console.warn(`Storage.set failed for ${key}:`, error);
      // Handle quota exceeded
      if (error.name === 'QuotaExceededError') {
        this.cleanup();
        try {
          localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
        } catch (retryError) {
          console.error('Storage quota exceeded even after cleanup');
        }
      }
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key (without prefix)
   */
  remove(key) {
    const fullKey = this.PREFIX + key;
    localStorage.removeItem(fullKey);
  },

  /**
   * Clear all PermaAcade items from localStorage
   */
  clear() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  },

  /**
   * Clean up old/unused storage keys
   */
  cleanup() {
    // Remove legacy keys without prefix
    const legacyKeys = ['theme', 'bookmarks', 'streak', 'history', 'notes'];
    legacyKeys.forEach(key => localStorage.removeItem(key));
    
    // Keep only last 50 history items
    const history = this.get('history', []);
    if (history.length > 50) {
      this.set('history', history.slice(0, 50));
    }

    // Keep only last 100 notes
    const notes = this.get('notes', {});
    const noteKeys = Object.keys(notes);
    if (noteKeys.length > 100) {
      const trimmed = {};
      noteKeys.slice(-100).forEach(key => {
        trimmed[key] = notes[key];
      });
      this.set('notes', trimmed);
    }
  },

  /**
   * Get all storage keys (for debugging)
   * @returns {string[]} Array of PermaAcade keys
   */
  keys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.PREFIX)) {
        keys.push(key.replace(this.PREFIX, ''));
      }
    }
    return keys;
  }
};

// Freeze to prevent accidental modification
Object.freeze(Storage);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}
