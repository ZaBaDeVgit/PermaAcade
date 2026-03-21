// Tropa Permanente Academy - Auth Module v2.0
// Usa SHA-256 para hashear contraseñas (más seguro que texto plano)

class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
        }
    }

    // Hash de contraseña usando SHA-256
    static async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + 'tropa_permanente_salt_2024');
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Verificar contraseña
    static async verifyPassword(password, hash) {
        const passwordHash = await this.hashPassword(password);
        return passwordHash === hash;
    }

    // Registro de usuario
    static async register(userData) {
        const { name, email, password } = userData;
        
        if (!name || !email || !password) {
            throw new Error('Todos los campos son obligatorios');
        }

        if (password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('El email no es válido');
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            throw new Error('Este email ya está registrado');
        }

        const passwordHash = await this.hashPassword(password);

        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            passwordHash,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            progress: {
                temas: [],
                tests: [],
                videos: [],
                podcasts: [],
                lecturas: [],
                presentaciones: [],
                organigramas: []
            },
            stats: {
                testsCompleted: 0,
                correctAnswers: 0,
                totalQuestions: 0,
                streakDays: 0,
                lastActivity: null,
                categoryStats: {
                    bloque1: { attempted: 0, correct: 0 },
                    bloque2: { attempted: 0, correct: 0 },
                    bloque3: { attempted: 0, correct: 0 }
                },
                weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
                dailyStreak: []
            },
            preferences: {
                darkMode: true,
                notifications: true,
                soundEffects: false
            },
            achievements: []
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return newUser;
    }

    // Login
    static async login(email, password) {
        if (!email || !password) {
            throw new Error('Email y contraseña son obligatorios');
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

        if (!user) {
            throw new Error('Email o contraseña incorrectos');
        }

        const isValid = await Auth.verifyPassword(password, user.passwordHash);
        
        if (!isValid) {
            throw new Error('Email o contraseña incorrectos');
        }

        user.lastLogin = new Date().toISOString();
        Auth.updateUser(user);

        localStorage.setItem('currentUser', JSON.stringify(user));

        return user;
    }

    // Logout
    static logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    // Obtener usuario actual
    static getCurrentUser() {
        const stored = localStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : null;
    }

    // Verificar si está autenticado
    static isAuthenticated() {
        return !!localStorage.getItem('currentUser');
    }

    // Verificar acceso (redirigir si no está autenticado)
    static requireAuth(redirectTo = 'index.html') {
        if (!Auth.isAuthenticated()) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    }

    // Actualizar usuario
    static updateUser(user) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }

    // Actualizar progreso
    static updateProgress(category, itemId) {
        const user = Auth.getCurrentUser();
        if (!user) return;

        if (!user.progress[category]) {
            user.progress[category] = [];
        }

        if (!user.progress[category].includes(itemId)) {
            user.progress[category].push(itemId);
        }

        user.stats.lastActivity = new Date().toISOString();
        Auth.updateUser(user);
        return user;
    }

    // Registrar resultado de test
    static recordTestResult(questions, correct, bloque) {
        const user = Auth.getCurrentUser();
        if (!user) return;

        user.stats.testsCompleted++;
        user.stats.correctAnswers += correct;
        user.stats.totalQuestions += questions;
        user.stats.lastActivity = new Date().toISOString();

        // Estadísticas por bloque
        if (bloque && user.stats.categoryStats[bloque]) {
            user.stats.categoryStats[bloque].attempted += questions;
            user.stats.categoryStats[bloque].correct += correct;
        }

        // Actividad semanal
        const dayOfWeek = new Date().getDay();
        user.stats.weeklyActivity[dayOfWeek] += questions;

        // Actualizar racha
        Auth.updateStreak(user);

        // Guardar
        Auth.updateUser(user);
        return user;
    }

    // Actualizar racha
    static updateStreak(user) {
        const today = new Date().toDateString();
        const lastActivity = user.stats.lastActivity ? new Date(user.stats.lastActivity).toDateString() : null;

        if (lastActivity === today) {
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActivity === yesterday.toDateString()) {
            user.stats.streakDays++;
        } else if (lastActivity !== today) {
            user.stats.streakDays = 1;
        }

        if (!user.stats.dailyStreak) {
            user.stats.dailyStreak = [];
        }

        user.stats.dailyStreak.push({
            date: today,
            completed: true
        });

        if (user.stats.dailyStreak.length > 30) {
            user.stats.dailyStreak = user.stats.dailyStreak.slice(-30);
        }
    }

    // Obtener estadísticas completas
    static getStats() {
        const user = Auth.getCurrentUser();
        if (!user) return null;

        return {
            ...user.stats,
            accuracy: user.stats.totalQuestions > 0 
                ? Math.round((user.stats.correctAnswers / user.stats.totalQuestions) * 100) 
                : 0,
            progress: {
                temas: Auth.calculateProgress('temas', 20),
                tests: Auth.calculateProgress('tests', 100),
                videos: Auth.calculateProgress('videos', 30),
                podcasts: Auth.calculateProgress('podcasts', 20),
                lecturas: Auth.calculateProgress('lecturas', 10),
                presentaciones: Auth.calculateProgress('presentaciones', 5),
                organigramas: Auth.calculateProgress('organigramas', 4)
            }
        };
    }

    // Calcular progreso
    static calculateProgress(category, total) {
        const user = Auth.getCurrentUser();
        if (!user || !user.progress[category]) return 0;
        return Math.round((user.progress[category].length / total) * 100);
    }

    // Desbloquear logro
    static unlockAchievement(achievementId) {
        const user = Auth.getCurrentUser();
        if (!user || user.achievements.includes(achievementId)) return;

        user.achievements.push(achievementId);
        Auth.updateUser(user);

        const achievementNames = {
            'first_test': 'Primera Prueba',
            'streak_7': 'Racha de 7 días',
            'streak_30': 'Racha de 30 días',
            'accuracy_80': '80% de precisión',
            'all_topics': 'Todos los temas',
            '100_tests': '100 tests completados'
        };

        Components.Toast.success(`🏆 Logro desbloqueado: ${achievementNames[achievementId] || achievementId}`);
    }

    // Verificar logros automáticos
    static checkAchievements() {
        const user = Auth.getCurrentUser();
        if (!user) return;

        if (user.stats.testsCompleted >= 1) {
            Auth.unlockAchievement('first_test');
        }

        if (user.stats.streakDays >= 7) {
            Auth.unlockAchievement('streak_7');
        }

        if (user.stats.streakDays >= 30) {
            Auth.unlockAchievement('streak_30');
        }

        const accuracy = user.stats.totalQuestions > 0 
            ? (user.stats.correctAnswers / user.stats.totalQuestions) * 100 
            : 0;
        if (accuracy >= 80 && user.stats.totalQuestions >= 50) {
            Auth.unlockAchievement('accuracy_80');
        }

        if (user.stats.testsCompleted >= 100) {
            Auth.unlockAchievement('100_tests');
        }
    }
}

window.Auth = Auth;
