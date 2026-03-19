// Tests para los componentes UI
import { describe, it, expect, beforeEach } from 'vitest';

describe('Components', () => {
    beforeEach(async () => {
        // Limpiar el DOM
        document.body.innerHTML = '';
        
        // Cargar componentes
        await import('../js/components.js');
    });

    describe('Modal Component', () => {
        it('debe crear un modal con el ID correcto', () => {
            const modal = new Components.Modal({
                id: 'test-modal',
                title: 'Test Modal'
            });

            expect(modal.id).toBe('test-modal');
            expect(modal.title).toBe('Test Modal');
        });

        it('debe renderizar el HTML correctamente', () => {
            const modal = new Components.Modal({
                id: 'test-modal',
                title: 'Test Title',
                content: '<p>Test content</p>'
            });

            const html = modal.render();

            expect(html).toContain('id="test-modal"');
            expect(html).toContain('Test Title');
            expect(html).toContain('Test content');
        });

        it('debe abrir y cerrar el modal', () => {
            const modal = new Components.Modal({
                id: 'test-modal',
                title: 'Test'
            });

            modal.open();
            expect(document.getElementById('test-modal')).not.toBeNull();
            expect(document.getElementById('test-modal').classList.contains('hidden')).toBe(false);

            modal.close();
            expect(document.getElementById('test-modal').classList.contains('hidden')).toBe(true);
        });

        it('debe soportar diferentes tamaños', () => {
            const sizes = ['sm', 'md', 'lg', 'xl', 'full'];
            
            sizes.forEach(size => {
                const modal = new Components.Modal({ size });
                expect(modal.size).toBe(size);
            });
        });
    });

    describe('Button Component', () => {
        it('debe crear un botón con el texto correcto', () => {
            const button = new Components.Button({
                text: 'Click Me'
            });

            expect(button.text).toBe('Click Me');
        });

        it('debe renderizar el HTML correctamente', () => {
            const button = new Components.Button({
                text: 'Submit',
                variant: 'primary'
            });

            const html = button.render();

            expect(html).toContain('Click Me');
            expect(html).toContain('Submit');
            expect(html).toContain('type="button"');
        });

        it('debe soportar diferentes variantes', () => {
            const variants = ['primary', 'secondary', 'danger', 'success', 'ghost', 'outline'];
            
            variants.forEach(variant => {
                const button = new Components.Button({ variant });
                expect(button.variant).toBe(variant);
            });
        });

        it('debe soportar diferentes tamaños', () => {
            const sizes = ['sm', 'md', 'lg', 'xl'];
            
            sizes.forEach(size => {
                const button = new Components.Button({ size });
                expect(button.size).toBe(size);
            });
        });
    });

    describe('Card Component', () => {
        it('debe crear una tarjeta con título y contenido', () => {
            const card = new Components.Card({
                title: 'Card Title',
                content: 'Card content'
            });

            const html = card.render();

            expect(html).toContain('Card Title');
            expect(html).toContain('Card content');
        });

        it('debe ser clickeable si tiene href', () => {
            const card = new Components.Card({
                title: 'Link Card',
                href: '/test'
            });

            const html = card.render();
            expect(html).toContain('href="/test"');
        });

        it('debe renderizar footer si está presente', () => {
            const card = new Components.Card({
                title: 'Card',
                footer: '<button>Action</button>'
            });

            const html = card.render();
            expect(html).toContain('Action');
        });
    });

    describe('ProgressBar Component', () => {
        it('debe crear una barra de progreso', () => {
            const progress = new Components.ProgressBar({
                value: 50,
                max: 100
            });

            expect(progress.value).toBe(50);
            expect(progress.max).toBe(100);
        });

        it('debe calcular el porcentaje correctamente', () => {
            const progress = new Components.ProgressBar({
                value: 75,
                max: 100
            });

            expect(progress.getPercentage()).toBe(75);
        });

        it('debe limitar el porcentaje entre 0 y 100', () => {
            const progress1 = new Components.ProgressBar({
                value: 150,
                max: 100
            });
            expect(progress1.getPercentage()).toBe(100);

            const progress2 = new Components.ProgressBar({
                value: -10,
                max: 100
            });
            expect(progress2.getPercentage()).toBe(0);
        });

        it('debe renderizar el HTML con el ID correcto', () => {
            const progress = new Components.ProgressBar({
                id: 'test-progress',
                value: 50
            });

            const html = progress.render();
            expect(html).toContain('id="test-progress"');
        });
    });

    describe('Toast Component', () => {
        it('debe mostrar un toast de éxito', () => {
            Components.Toast.success('Test message');

            const toast = document.querySelector('.toast-notification');
            expect(toast).not.toBeNull();
            expect(toast.textContent).toContain('Test message');
        });

        it('debe mostrar un toast de error', () => {
            Components.Toast.error('Error message');

            const toast = document.querySelector('.toast-notification');
            expect(toast).not.toBeNull();
            expect(toast.textContent).toContain('Error message');
        });

        it('debe mostrar un toast de advertencia', () => {
            Components.Toast.warning('Warning message');

            const toast = document.querySelector('.toast-notification');
            expect(toast).not.toBeNull();
        });

        it('debe mostrar un toast de información', () => {
            Components.Toast.info('Info message');

            const toast = document.querySelector('.toast-notification');
            expect(toast).not.toBeNull();
        });

        it('debe eliminar los toasts anteriores', () => {
            Components.Toast.success('First');
            Components.Toast.success('Second');

            const toasts = document.querySelectorAll('.toast-notification');
            expect(toasts.length).toBe(1);
        });
    });

    describe('StatsCard Component', () => {
        it('debe crear una tarjeta de estadísticas', () => {
            const stats = new Components.StatsCard({
                label: 'Tests',
                value: 10,
                subtitle: 'completados'
            });

            const html = stats.render();

            expect(html).toContain('Tests');
            expect(html).toContain('10');
            expect(html).toContain('completados');
        });

        it('debe renderizar con un icono si se especifica', () => {
            const stats = new Components.StatsCard({
                label: 'Tests',
                value: 10,
                icon: 'tests'
            });

            const html = stats.render();
            expect(html).toContain('svg');
        });
    });

    describe('Spinner Component', () => {
        it('debe renderizar un spinner con mensaje', () => {
            const html = Components.Spinner.show('Cargando...');

            expect(html).toContain('Cargando...');
            expect(html).toContain('spinner');
        });

        it('debe renderizar un spinner inline', () => {
            const html = Components.Spinner.inline();

            expect(html).toContain('spinner');
        });
    });
});
