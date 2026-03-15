// Tropa Permanente Academy - Main JavaScript

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Generate particles
document.addEventListener('DOMContentLoaded', () => {
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
        window.location.href = 'dashboard.html';
    } else {
        alert('Email o contraseña incorrectos');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        alert('Este email ya está registrado');
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

// UI Helper Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
    } text-white font-medium`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

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
