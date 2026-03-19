// Tropa Permanente Academy - Component System v2.0

// ============================================
// MODAL COMPONENT
// ============================================
class Modal {
    constructor(options = {}) {
        this.id = options.id || `modal-${Date.now()}`;
        this.title = options.title || '';
        this.content = options.content || '';
        this.size = options.size || 'md';
        this.showClose = options.showClose !== false;
        this.onClose = options.onClose || null;
        this.isOpen = false;
    }

    static sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full'
    };

    render() {
        return `
            <div id="${this.id}" class="fixed inset-0 z-50 hidden">
                <div class="modal-backdrop absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onclick="window.Modal.close('${this.id}')"></div>
                <div class="flex items-center justify-center min-h-screen p-4">
                    <div class="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 md:p-8 w-full ${Modal.sizes[this.size]} animate-scale-in shadow-2xl">
                        ${this.showClose ? `
                            <button onclick="window.Modal.close('${this.id}')" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        ` : ''}
                        ${this.title ? `<h3 class="font-orbitron font-bold text-2xl text-white mb-6 text-center">${this.title}</h3>` : ''}
                        <div class="modal-content">${this.content}</div>
                    </div>
                </div>
            </div>
        `;
    }

    open() {
        if (!document.getElementById(this.id)) {
            document.body.insertAdjacentHTML('beforeend', this.render());
        }
        const modal = document.getElementById(this.id);
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }

    close() {
        const modal = document.getElementById(this.id);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            this.isOpen = false;
            if (this.onClose) this.onClose();
        }
    }

    static close(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            const instance = window.Modal.instances[id];
            if (instance && instance.onClose) instance.onClose();
            setTimeout(() => modal.remove(), 300);
        }
    }

    static closeAll() {
        document.querySelectorAll('.fixed.z-50[id^="modal"]').forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.style.overflow = '';
    }
}

window.Modal = Modal;
Modal.instances = {};

// ============================================
// BUTTON COMPONENT
// ============================================
class Button {
    constructor(options = {}) {
        this.text = options.text || 'Button';
        this.variant = options.variant || 'primary';
        this.size = options.size || 'md';
        this.icon = options.icon || null;
        this.iconPosition = options.iconPosition || 'left';
        this.disabled = options.disabled || false;
        this.loading = options.loading || false;
        this.onClick = options.onClick || null;
        this.className = options.className || '';
        this.type = options.type || 'button';
    }

    static variants = {
        primary: 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-lg hover:shadow-emerald-500/25',
        secondary: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white',
        success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-white',
        ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white',
        outline: 'border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white bg-transparent'
    };

    static sizes = {
        sm: 'px-3 py-1.5 text-sm rounded-lg',
        md: 'px-5 py-2.5 text-base rounded-lg',
        lg: 'px-8 py-4 text-lg rounded-xl',
        xl: 'px-10 py-5 text-xl rounded-xl'
    };

    render() {
        const iconSvg = this.icon ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${this.icon}"></path></svg>` : '';
        
        return `
            <button 
                type="${this.type}"
                class="font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${Button.variants[this.variant]} ${Button.sizes[this.size]} ${this.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'} ${this.className}"
                ${this.disabled || this.loading ? 'disabled' : ''}
                ${this.onClick ? `onclick="${this.onClick}"` : ''}
            >
                ${this.loading ? '<span class="spinner w-5 h-5"></span>' : ''}
                ${this.icon && this.iconPosition === 'left' ? iconSvg : ''}
                <span>${this.text}</span>
                ${this.icon && this.iconPosition === 'right' ? iconSvg : ''}
            </button>
        `;
    }
}

// ============================================
// CARD COMPONENT
// ============================================
class Card {
    constructor(options = {}) {
        this.title = options.title || '';
        this.content = options.content || '';
        this.footer = options.footer || '';
        this.variant = options.variant || 'default';
        this.padding = options.padding || 'md';
        this.hoverable = options.hoverable || false;
        this.href = options.href || null;
        this.onClick = options.onClick || null;
        this.className = options.className || '';
    }

    static variants = {
        default: 'bg-slate-900/50 border-slate-800/50',
        emerald: 'bg-emerald-500/10 border-emerald-500/30',
        cyan: 'bg-cyan-500/10 border-cyan-500/30',
        blue: 'bg-blue-500/10 border-blue-500/30',
        purple: 'bg-purple-500/10 border-purple-500/30',
        amber: 'bg-amber-500/10 border-amber-500/30',
        rose: 'bg-rose-500/10 border-rose-500/30'
    };

    static paddings = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    render() {
        const content = `
            ${this.title ? `<h3 class="font-semibold text-white mb-2">${this.title}</h3>` : ''}
            ${this.content ? `<div class="text-slate-400">${this.content}</div>` : ''}
            ${this.footer ? `<div class="mt-4 pt-4 border-t border-slate-700/50">${this.footer}</div>` : ''}
        `;

        const cardClass = `border rounded-2xl ${Card.variants[this.variant]} ${Card.paddings[this.padding]} ${this.hoverable ? 'hover:scale-[1.02] transition-transform cursor-pointer' : ''} ${this.className}`;

        if (this.href) {
            return `<a href="${this.href}" class="${cardClass} block">${content}</a>`;
        }

        if (this.onClick) {
            return `<div class="${cardClass}" onclick="${this.onClick}">${content}</div>`;
        }

        return `<div class="${cardClass}">${content}</div>`;
    }
}

// ============================================
// PROGRESS BAR COMPONENT
// ============================================
class ProgressBar {
    constructor(options = {}) {
        this.value = options.value || 0;
        this.max = options.max || 100;
        this.label = options.label || '';
        this.showPercentage = options.showPercentage !== false;
        this.variant = options.variant || 'emerald';
        this.size = options.size || 'md';
        this.animated = options.animated !== false;
        this.id = options.id || `progress-${Date.now()}`;
    }

    static variants = {
        emerald: 'from-emerald-500 to-cyan-500',
        cyan: 'from-cyan-500 to-blue-500',
        blue: 'from-blue-500 to-purple-500',
        purple: 'from-purple-500 to-pink-500',
        amber: 'from-amber-500 to-orange-500',
        rose: 'from-rose-500 to-pink-500'
    };

    static sizes = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4'
    };

    getPercentage() {
        return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
    }

    render() {
        const percentage = this.getPercentage();
        return `
            <div class="progress-bar-container">
                ${this.label || this.showPercentage ? `
                    <div class="flex justify-between items-center mb-2">
                        ${this.label ? `<span class="text-sm text-slate-400">${this.label}</span>` : ''}
                        ${this.showPercentage ? `<span class="text-sm font-bold ${this.variant === 'emerald' ? 'text-emerald-400' : 'text-' + this.variant + '-400'}">${Math.round(percentage)}%</span>` : ''}
                    </div>
                ` : ''}
                <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        id="${this.id}"
                        class="h-full bg-gradient-to-r ${ProgressBar.variants[this.variant]} rounded-full ${this.animated ? 'progress-bar-animated' : ''}"
                        style="width: 0%"
                    ></div>
                </div>
            </div>
        `;
    }

    update(value) {
        this.value = value;
        const el = document.getElementById(this.id);
        if (el) {
            el.style.width = this.getPercentage() + '%';
        }
    }
}

// ============================================
// TOAST COMPONENT
// ============================================
class Toast {
    constructor(options = {}) {
        this.message = options.message || '';
        this.type = options.type || 'success';
        this.duration = options.duration || 3000;
        this.icon = options.icon || null;
    }

    static types = {
        success: { color: 'from-emerald-500 to-emerald-600', border: 'border-emerald-400' },
        error: { color: 'from-red-500 to-red-600', border: 'border-red-400' },
        warning: { color: 'from-amber-500 to-orange-500', border: 'border-amber-400' },
        info: { color: 'from-blue-500 to-cyan-500', border: 'border-blue-400' }
    };

    static icons = {
        success: 'M5 13l4 4L19 7',
        error: 'M6 18L18 6M6 6l12 12',
        warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };

    static show(message, type = 'success', duration = 3000) {
        document.querySelectorAll('.toast-notification').forEach(t => t.remove());

        const config = Toast.types[type];
        const iconPath = Toast.icons[type];

        const toast = document.createElement('div');
        toast.className = `toast-notification fixed top-4 right-4 z-[9999] px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 translate-x-full bg-gradient-to-r ${config.color} border ${config.border} text-white max-w-md`;
        toast.innerHTML = `
            <div class="flex items-center gap-3">
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path>
                </svg>
                <div class="font-medium">${message}</div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-auto hover:bg-white/20 rounded-lg p-1 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.remove('translate-x-full'));

        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    static success(message, duration) { Toast.show(message, 'success', duration); }
    static error(message, duration) { Toast.show(message, 'error', duration); }
    static warning(message, duration) { Toast.show(message, 'warning', duration); }
    static info(message, duration) { Toast.show(message, 'info', duration); }
}

// ============================================
// STATS CARD COMPONENT
// ============================================
class StatsCard {
    constructor(options = {}) {
        this.label = options.label || '';
        this.value = options.value || 0;
        this.subtitle = options.subtitle || '';
        this.icon = options.icon || null;
        this.iconBg = options.iconBg || 'emerald';
        this.variant = options.variant || 'default';
    }

    static iconBgColors = {
        emerald: 'bg-emerald-500/20 text-emerald-400',
        cyan: 'bg-cyan-500/20 text-cyan-400',
        blue: 'bg-blue-500/20 text-blue-400',
        purple: 'bg-purple-500/20 text-purple-400',
        amber: 'bg-amber-500/20 text-amber-400',
        rose: 'bg-rose-500/20 text-rose-400'
    };

    static icons = {
        tests: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
        correct: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        accuracy: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        streak: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
    };

    render() {
        const iconHtml = this.icon && StatsCard.icons[this.icon] ? `
            <div class="w-10 h-10 rounded-lg flex items-center justify-center ${StatsCard.iconBgColors[this.iconBg]}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${StatsCard.icons[this.icon]}"></path>
                </svg>
            </div>
        ` : '';

        return `
            <div class="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 hover:border-${this.iconBg}-500/50 transition-all">
                <div class="flex items-center gap-3 mb-3">
                    ${iconHtml}
                    <span class="text-slate-400 text-sm">${this.label}</span>
                </div>
                <div class="font-orbitron font-bold text-2xl md:text-3xl text-white">${this.value}</div>
                ${this.subtitle ? `<div class="text-slate-500 text-xs mt-1">${this.subtitle}</div>` : ''}
            </div>
        `;
    }
}

// ============================================
// CHART COMPONENT (Simple SVG-based)
// ============================================
class Chart {
    static donut(data, options = {}) {
        const size = options.size || 120;
        const strokeWidth = options.strokeWidth || 12;
        const colors = options.colors || ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'];
        
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        
        let offset = 0;
        const circles = data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const dashArray = (percentage / 100) * circumference;
            const dashOffset = -offset;
            offset += dashArray;
            
            return `
                <circle 
                    cx="${size/2}" 
                    cy="${size/2}" 
                    r="${radius}" 
                    fill="none" 
                    stroke="${colors[index % colors.length]}" 
                    stroke-width="${strokeWidth}"
                    stroke-dasharray="${dashArray} ${circumference}"
                    stroke-dashoffset="${dashOffset}"
                    transform="rotate(-90 ${size/2} ${size/2})"
                    style="transition: stroke-dasharray 1s ease"
                />
            `;
        }).join('');

        return `
            <div class="inline-block relative" style="width: ${size}px; height: ${size}px;">
                <svg width="${size}" height="${size}">
                    <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="#334155" stroke-width="${strokeWidth}" />
                    ${circles}
                </svg>
                ${options.center ? `<div class="absolute inset-0 flex items-center justify-center"><span class="font-bold text-white">${options.center}</span></div>` : ''}
            </div>
        `;
    }

    static barVertical(data, options = {}) {
        const width = options.width || 300;
        const height = options.height || 200;
        const barWidth = options.barWidth || 30;
        const color = options.color || '#10b981';
        
        const max = Math.max(...data.map(d => d.value));
        const barSpacing = (width - (data.length * barWidth)) / (data.length + 1);
        
        const bars = data.map((item, index) => {
            const barHeight = (item.value / max) * (height - 30);
            const x = barSpacing + (index * (barWidth + barSpacing));
            const y = height - barHeight - 20;
            
            return `
                <rect 
                    x="${x}" 
                    y="${y}" 
                    width="${barWidth}" 
                    height="${barHeight}" 
                    fill="${color}" 
                    rx="4"
                    class="hover:opacity-80 transition-opacity"
                >
                    <title>${item.label}: ${item.value}</title>
                </rect>
                <text x="${x + barWidth/2}" y="${height - 5}" fill="#94a3b8" text-anchor="middle" font-size="10">${item.label}</text>
            `;
        }).join('');

        return `
            <svg width="${width}" height="${height}" class="overflow-visible">
                ${bars}
            </svg>
        `;
    }
}

// ============================================
// LOADING SPINNER
// ============================================
class Spinner {
    static show(message = 'Cargando...') {
        return `
            <div class="flex flex-col items-center justify-center p-8">
                <div class="spinner w-12 h-12 mb-4"></div>
                <p class="text-slate-400">${message}</p>
            </div>
        `;
    }

    static inline() {
        return '<span class="spinner w-5 h-5 inline-block"></span>';
    }
}

// Export all components
window.Components = {
    Modal,
    Button,
    Card,
    ProgressBar,
    Toast,
    StatsCard,
    Chart,
    Spinner
};
