/**
 * PermaAcade Analytics Utility
 * Simple analytics using Plausible (privacy-friendly)
 */
const Analytics = {
  enabled: false, // Set to true when Plausible is configured
  domain: 'permaacade.com', // Replace with your domain
  
  /**
   * Initialize analytics
   */
  init() {
    if (!this.enabled) return;
    if (window.location.protocol === 'file:') return; // Don't track local files

    // Load Plausible script
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = this.domain;
    script.src = 'https://plausible.io/js/script.outbound-links.js';
    document.head.appendChild(script);

    // Track pageview
    this.pageview();
  },

  /**
   * Track pageview
   * @param {string} url - Optional custom URL
   */
  pageview(url) {
    if (!this.enabled) return;
    
    // Use Plausible's pageview function if available
    if (window.plausible) {
      window.plausible('pageview', {
        u: url || window.location.href
      });
    }
  },

  /**
   * Track custom event
   * @param {string} name - Event name
   * @param {Object} props - Optional event properties
   */
  track(name, props = {}) {
    if (!this.enabled) return;

    if (window.plausible) {
      window.plausible(name, { props });
    }
  },

  /**
   * Track content interaction
   * @param {string} type - Content type (podcast, video, test, etc.)
   * @param {string} action - Action (play, complete, start, etc.)
   * @param {string} id - Content ID
   */
  trackContent(type, action, id) {
    this.track(`content_${type}_${action}`, {
      content_id: id,
      page: window.location.pathname
    });
  },

  /**
   * Track test completion
   * @param {string} testId
   * @param {number} score - Score percentage
   * @param {number} duration - Time taken in seconds
   */
  trackTestComplete(testId, score, duration) {
    this.track('test_complete', {
      test_id: testId,
      score,
      duration
    });
  },

  /**
   * Track search query
   * @param {string} query
   * @param {number} results - Number of results
   */
  trackSearch(query, results) {
    this.track('search', {
      query,
      results
    });
  },

  /**
   * Track streak milestone
   * @param {number} streak - Current streak days
   */
  trackStreakMilestone(streak) {
    this.track('streak_milestone', {
      streak
    });
  }
};

// Freeze to prevent accidental modification
Object.freeze(Analytics);
