// Tests para el módulo de autenticación
import { describe, it, expect, beforeEach } from 'vitest';

describe('Auth Module', () => {
    // Cargar el módulo de autenticación
    beforeEach(async () => {
        // Reset localStorage
        localStorage.clear();
        
        // Cargar el script de auth
        await import('../js/auth.js');
    });

    describe('hashPassword', () => {
        it('debe generar un hash consistente para la misma contraseña', async () => {
            const hash1 = await Auth.hashPassword('password123');
            const hash2 = await Auth.hashPassword('password123');
            expect(hash1).toBe(hash2);
        });

        it('debe generar hashes diferentes para contraseñas diferentes', async () => {
            const hash1 = await Auth.hashPassword('password123');
            const hash2 = await Auth.hashPassword('password456');
            expect(hash1).not.toBe(hash2);
        });

        it('debe generar un hash de 64 caracteres (SHA-256)', async () => {
            const hash = await Auth.hashPassword('test');
            expect(hash.length).toBe(64);
        });
    });

    describe('register', () => {
        it('debe registrar un nuevo usuario correctamente', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            const user = await Auth.register(userData);

            expect(user).toBeDefined();
            expect(user.name).toBe('Test User');
            expect(user.email).toBe('test@example.com');
            expect(user.passwordHash).toBeDefined();
            expect(user.id).toBeDefined();
        });

        it('debe guardar el usuario en localStorage', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            await Auth.register(userData);

            const storedUsers = JSON.parse(localStorage.getItem('users'));
            expect(storedUsers).toBeDefined();
            expect(storedUsers.length).toBe(1);
            expect(storedUsers[0].email).toBe('test@example.com');
        });

        it('debe lanzar error si el email ya está registrado', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            await Auth.register(userData);

            await expect(Auth.register({
                name: 'Another User',
                email: 'test@example.com',
                password: 'password456'
            })).rejects.toThrow('Este email ya está registrado');
        });

        it('debe lanzar error si la contraseña es muy corta', async () => {
            await expect(Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: '12345'
            })).rejects.toThrow('La contraseña debe tener al menos 6 caracteres');
        });

        it('debe lanzar error si el email no es válido', async () => {
            await expect(Auth.register({
                name: 'Test User',
                email: 'invalid-email',
                password: 'password123'
            })).rejects.toThrow('El email no es válido');
        });

        it('debe normalizar el email a minúsculas', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'TEST@EXAMPLE.COM',
                password: 'password123'
            });

            const storedUsers = JSON.parse(localStorage.getItem('users'));
            expect(storedUsers[0].email).toBe('test@example.com');
        });
    });

    describe('login', () => {
        it('debe iniciar sesión con credenciales correctas', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            const user = await Auth.login('test@example.com', 'password123');

            expect(user).toBeDefined();
            expect(user.email).toBe('test@example.com');
        });

        it('debe lanzar error con email incorrecto', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            await expect(Auth.login('wrong@example.com', 'password123'))
                .rejects.toThrow('Email o contraseña incorrectos');
        });

        it('debe lanzar error con contraseña incorrecta', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            await expect(Auth.login('test@example.com', 'wrongpassword'))
                .rejects.toThrow('Email o contraseña incorrectos');
        });

        it('debe ser case-insensitive para el email', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            const user = await Auth.login('TEST@EXAMPLE.COM', 'password123');
            expect(user).toBeDefined();
        });
    });

    describe('getCurrentUser', () => {
        it('debe devolver null si no hay usuario logueado', () => {
            const user = Auth.getCurrentUser();
            expect(user).toBeNull();
        });

        it('debe devolver el usuario actual si está logueado', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            const currentUser = Auth.getCurrentUser();
            expect(currentUser).toBeDefined();
            expect(currentUser.email).toBe('test@example.com');
        });
    });

    describe('isAuthenticated', () => {
        it('debe devolver false si no hay usuario logueado', () => {
            expect(Auth.isAuthenticated()).toBe(false);
        });

        it('debe devolver true si hay usuario logueado', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            expect(Auth.isAuthenticated()).toBe(true);
        });
    });

    describe('updateProgress', () => {
        it('debe actualizar el progreso de una categoría', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            const updatedUser = Auth.updateProgress('temas', 'tema-1');

            expect(updatedUser.progress.temas).toContain('tema-1');
        });

        it('no debe duplicar elementos en el progreso', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            Auth.updateProgress('temas', 'tema-1');
            Auth.updateProgress('temas', 'tema-1');

            const user = Auth.getCurrentUser();
            expect(user.progress.temas.filter(t => t === 'tema-1').length).toBe(1);
        });
    });

    describe('recordTestResult', () => {
        it('debe registrar el resultado de un test', async () => {
            await Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            const updatedUser = Auth.recordTestResult(10, 8);

            expect(updatedUser.stats.testsCompleted).toBe(1);
            expect(updatedUser.stats.correctAnswers).toBe(8);
            expect(updatedUser.stats.totalQuestions).toBe(10);
        });

        it('debe calcular la precisión correctamente', () => {
            // Initial state
            expect(Auth.getStats()).toBeNull();

            // After register
            Auth.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

            const stats = Auth.getStats();
            expect(stats.accuracy).toBe(0);

            // After test
            Auth.recordTestResult(10, 8);
            const newStats = Auth.getStats();
            expect(newStats.accuracy).toBe(80);
        });
    });
});
