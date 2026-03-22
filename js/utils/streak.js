/**
 * PermaAcade Streak Utility
 * Study streak tracking with daily reset
 */
const Streak = {
  STORAGE_KEY: 'streak',
  
  /**
   * Get streak data
   * @returns {{current: number, longest: number, lastDate: string}}
   */
  getData() {
    return Storage.get(this.STORAGE_KEY, {
      current: 0,
      longest: 0,
      lastDate: null
    });
  },

  /**
   * Get current streak count
   * @returns {number}
   */
  getCurrent() {
    return this.getData().current;
  },

  /**
   * Get longest streak ever
   * @returns {number}
   */
  getLongest() {
    return this.getData().longest;
  },

  /**
   * Check if user studied today
   * @returns {boolean}
   */
  hasStudiedToday() {
    const data = this.getData();
    return data.lastDate === this.getTodayDate();
  },

  /**
   * Get today's date in YYYY-MM-DD format
   * @returns {string}
   */
  getTodayDate() {
    return new Date().toISOString().slice(0, 10);
  },

  /**
   * Get yesterday's date in YYYY-MM-DD format
   * @returns {string}
   */
  getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().slice(0, 10);
  },

  /**
   * Increment streak (call when user interacts with content)
   * @returns {{streak: number, isNew: boolean, isMilestone: boolean}}
   */
  increment() {
    const data = this.getData();
    const today = this.getTodayDate();
    const yesterday = this.getYesterdayDate();

    // Already counted today
    if (data.lastDate === today) {
      return { 
        streak: data.current, 
        isNew: false,
        isMilestone: false 
      };
    }

    let newStreak;
    let isNew = false;

    if (data.lastDate === yesterday) {
      // Consecutive day - increment
      newStreak = data.current + 1;
      isNew = true;
    } else if (!data.lastDate) {
      // First time ever
      newStreak = 1;
      isNew = true;
    } else {
      // Streak broken - start over
      newStreak = 1;
      isNew = true;
    }

    const newLongest = Math.max(data.longest, newStreak);
    const isMilestone = this.isMilestone(newStreak);

    const newData = {
      current: newStreak,
      longest: newLongest,
      lastDate: today
    };

    Storage.set(this.STORAGE_KEY, newData);

    return { 
      streak: newStreak, 
      isNew,
      isMilestone,
      longest: newLongest
    };
  },

  /**
   * Check if this is a milestone streak
   * @param {number} streak
   * @returns {boolean}
   */
  isMilestone(streak) {
    const milestones = [7, 14, 21, 30, 50, 100, 200, 365];
    return milestones.includes(streak);
  },

  /**
   * Get milestone celebration data
   * @param {number} streak
   * @returns {{emoji: string, title: string, message: string} | null}
   */
  getMilestoneData(streak) {
    const milestones = {
      7: { emoji: '🔥', title: '¡Una semana!', message: '7 días seguidos de estudio' },
      14: { emoji: '⭐', title: '¡Dos semanas!', message: '14 días de dedicación' },
      21: { emoji: '💪', title: '¡Tres semanas!', message: '21 días construyendo el hábito' },
      30: { emoji: '🏆', title: '¡Un mes completo!', message: '30 días de estudio连续' },
      50: { emoji: '🚀', title: '¡50 días!', message: 'Medio camino hacia los 100' },
      100: { emoji: '🎯', title: '¡100 días!', message: 'Un hito increíble' },
      200: { emoji: '👑', title: '¡200 días!', message: 'Eres imparable' },
      365: { emoji: '🏅', title: '¡Un año!', message: 'Dedicación absoluta' }
    };
    return milestones[streak] || null;
  },

  /**
   * Check if streak is at risk (user hasn't studied today and it's getting late)
   * @returns {boolean}
   */
  isAtRisk() {
    const data = this.getData();
    const today = this.getTodayDate();
    
    if (data.lastDate !== today && data.lastDate === this.getYesterdayDate()) {
      // It's tomorrow in their timezone and they haven't studied yet
      const hour = new Date().getHours();
      // At risk after 6 PM if no activity today
      return hour >= 18;
    }
    return false;
  },

  /**
   * Render streak badge to a container
   * @param {string} containerId
   */
  renderBadge(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const streak = this.getCurrent();
    const atRisk = this.isAtRisk();

    container.innerHTML = `
      <div class="flex items-center gap-2 px-3 py-2 rounded-xl ${atRisk ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-slate-800/50'}">
        <span class="text-lg">${atRisk ? '⚠️' : '🔥'}</span>
        <span class="font-bold ${atRisk ? 'text-amber-400' : 'text-white'}">${streak}</span>
        <span class="text-xs ${atRisk ? 'text-amber-300' : 'text-slate-400'}">días</span>
      </div>
    `;
  },

  /**
   * Show streak celebration animation
   * @param {number} streak
   */
  celebrate(streak) {
    const milestone = this.getMilestoneData(streak);
    if (!milestone) return;

    // Create celebration modal
    const modal = document.createElement('div');
    modal.id = 'streakCelebration';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/30 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in">
        <div class="text-6xl mb-4 animate-bounce">${milestone.emoji}</div>
        <h2 class="font-orbitron text-2xl font-bold text-white mb-2">${milestone.title}</h2>
        <p class="text-slate-400 mb-4">${milestone.message}</p>
        <div class="flex justify-center gap-1 mb-6">
          ${Array(streak).fill('<span class="text-xl">🔥</span>').join('')}
        </div>
        <button onclick="Streak.closeCelebration()" class="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-colors">
          ¡Genial!
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    // Auto-close after 5 seconds
    setTimeout(() => this.closeCelebration(), 5000);
  },

  /**
   * Close celebration modal
   */
  closeCelebration() {
    const modal = document.getElementById('streakCelebration');
    if (modal) modal.remove();
  }
};

// Freeze to prevent accidental modification
Object.freeze(Streak);
