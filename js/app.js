// Tropa Permanente Academy - Main JavaScript

// Generate particles
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
});

// Auth Functions
function showLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function showRegisterModal() {
    document.getElementById('registerModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModals() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('registerModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function switchToRegister() {
    closeModals();
    setTimeout(showRegisterModal, 100);
}

function switchToLogin() {
    closeModals();
    setTimeout(showLoginModal, 100);
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        closeModals();
        showToast('¡Bienvenido de nuevo, ' + user.name + '!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);
    } else {
        showToast('Email o contraseña incorrectos', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showToast('Este email ya está registrado', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
        progress: {
            temas: [],
            tests: [],
            videos: [],
            podcasts: [],
            lecturas: []
        },
        stats: {
            testsCompleted: 0,
            correctAnswers: 0,
            totalQuestions: 0,
            streakDays: 0,
            lastActivity: null
        }
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    closeModals();
    window.location.href = 'dashboard.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
    return currentUser ? JSON.parse(currentUser) : null;
}

// Progress Functions
function updateProgress(category, itemId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    if (!currentUser.progress[category]) {
        currentUser.progress[category] = [];
    }
    
    if (!currentUser.progress[category].includes(itemId)) {
        currentUser.progress[category].push(itemId);
    }
    
    // Update stats
    currentUser.stats.lastActivity = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function recordTestResult(questions, correct) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    currentUser.stats.testsCompleted++;
    currentUser.stats.correctAnswers += correct;
    currentUser.stats.totalQuestions += questions;
    currentUser.stats.lastActivity = new Date().toISOString();
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function getProgressPercentage(category, totalItems) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.progress[category]) return 0;
    return Math.round((currentUser.progress[category].length / totalItems) * 100);
}

// UI Helper Functions - Modern Toast Notifications
function showToast(message, type = 'success', duration = 3000) {
    // Remove existing toasts
    document.querySelectorAll('.toast-notification').forEach(t => t.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast-notification fixed top-4 right-4 z-[9999] px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 border border-emerald-400',
        error: 'bg-gradient-to-r from-red-500 to-red-600 border border-red-400',
        warning: 'bg-gradient-to-r from-amber-500 to-orange-500 border border-amber-400',
        info: 'bg-gradient-to-r from-blue-500 to-cyan-500 border border-blue-400'
    };
    
    const icons = {
        success: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>',
        error: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',
        warning: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>',
        info: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    };
    
    toast.className += ` ${colors[type]} text-white`;
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="flex-shrink-0">${icons[type]}</div>
            <div class="font-medium">${message}</div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 hover:bg-white/20 rounded-lg p-1 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full');
    });
    
    // Auto remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Legacy alias for compatibility
function showNotification(message, type = 'success') {
    showToast(message, type === 'error' ? 'error' : type);
}

// Make functions available globally
window.showToast = showToast;
window.showNotification = showNotification;

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Calculate streak
function calculateStreak() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.stats.lastActivity) return 0;
    
    const lastActivity = new Date(currentUser.stats.lastActivity);
    const now = new Date();
    const diffDays = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) return 0;
    return diffDays === 0 ? currentUser.stats.streakDays : currentUser.stats.streakDays + 1;
}

// Initialize on all pages
document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth();
    if (user) {
        updateUserUI(user);
    }
});

function updateUserUI(user) {
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => el.textContent = user.name);
}
