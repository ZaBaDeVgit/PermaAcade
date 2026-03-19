// Tropa Permanente Academy - Main JavaScript v2.0

document.addEventListener('DOMContentLoaded', () => {
    initGlobal();
    initParticles();
    updateCurrentYear();
});

function initGlobal() {
    if (Auth.isAuthenticated()) {
        const user = Auth.getCurrentUser();
        updateUserUI(user);
    }
}

function initParticles() {
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
}

function updateCurrentYear() {
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
}

function updateUserUI(user) {
    if (!user) return;
    document.querySelectorAll('.user-name').forEach(el => el.textContent = user.name);
    document.querySelectorAll('.user-avatar').forEach(el => {
        el.textContent = user.name.charAt(0).toUpperCase();
    });
    document.querySelectorAll('.user-member-since').forEach(el => {
        el.textContent = new Date(user.createdAt).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
    });
}

// Modal Functions
function showLoginModal() {
    const modal = new Modal({
        id: 'loginModal',
        title: 'Iniciar Sesión',
        size: 'md',
        content: `
            <form id="loginForm" class="space-y-4">
                <div>
                    <label class="block text-slate-400 text-sm font-medium mb-2">Email</label>
                    <input type="email" id="loginEmail" required 
                        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" 
                        placeholder="tu@email.com">
                </div>
                <div>
                    <label class="block text-slate-400 text-sm font-medium mb-2">Contraseña</label>
                    <input type="password" id="loginPassword" required 
                        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" 
                        placeholder="••••••••">
                </div>
                <button type="submit" 
                    class="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/25">
                    Entrar
                </button>
            </form>
            <p class="text-slate-400 text-center mt-4">
                ¿No tienes cuenta? <button onclick="closeAllModals(); setTimeout(showRegisterModal, 100);" class="text-emerald-400 hover:text-emerald-300 font-medium">Regístrate</button>
            </p>
        `
    });
    modal.open();
    
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            await Auth.login(email, password);
            Components.Toast.success('¡Bienvenido de nuevo, ' + Auth.getCurrentUser().name + '!');
            Modal.close('loginModal');
            setTimeout(() => window.location.href = 'dashboard.html', 500);
        } catch (error) {
            Components.Toast.error(error.message);
        }
    });
}

function showRegisterModal() {
    const modal = new Modal({
        id: 'registerModal',
        title: 'Crear Cuenta',
        size: 'md',
        content: `
            <p class="text-slate-400 text-center mb-6">Comienza tu preparación gratis</p>
            <form id="registerForm" class="space-y-4">
                <div>
                    <label class="block text-slate-400 text-sm font-medium mb-2">Nombre</label>
                    <input type="text" id="registerName" required 
                        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" 
                        placeholder="Tu nombre">
                </div>
                <div>
                    <label class="block text-slate-400 text-sm font-medium mb-2">Email</label>
                    <input type="email" id="registerEmail" required 
                        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" 
                        placeholder="tu@email.com">
                </div>
                <div>
                    <label class="block text-slate-400 text-sm font-medium mb-2">Contraseña</label>
                    <input type="password" id="registerPassword" required minlength="6"
                        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors" 
                        placeholder="Mínimo 6 caracteres">
                </div>
                <button type="submit" 
                    class="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/25">
                    Crear Mi Cuenta
                </button>
            </form>
            <p class="text-slate-400 text-center mt-4">
                ¿Ya tienes cuenta? <button onclick="closeAllModals(); setTimeout(showLoginModal, 100);" class="text-emerald-400 hover:text-emerald-300 font-medium">Iniciar sesión</button>
            </p>
        `
    });
    modal.open();
    
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        try {
            await Auth.register({ name, email, password });
            Components.Toast.success('¡Cuenta creada exitosamente!');
            Modal.close('registerModal');
            setTimeout(() => window.location.href = 'dashboard.html', 500);
        } catch (error) {
            Components.Toast.error(error.message);
        }
    });
}

function closeAllModals() {
    Modal.closeAll();
}

function logout() {
    Auth.logout();
}

// Mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
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

// Get category color
function getCategoryColor(category) {
    const colors = {
        temas: 'emerald',
        tests: 'cyan',
        videos: 'blue',
        podcasts: 'purple',
        lecturas: 'amber',
        presentaciones: 'rose'
    };
    return colors[category] || 'emerald';
}

// Export to global
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.closeAllModals = closeAllModals;
window.logout = logout;
window.toggleMobileMenu = toggleMobileMenu;
window.formatDate = formatDate;
window.getCategoryColor = getCategoryColor;
