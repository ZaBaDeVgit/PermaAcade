# PermaAcade

Plataforma estática de preparación para Tropa Permanente con temario, tests, vídeos, podcasts y material visual.

## Características v2

### Dark Mode
- Toggle en el sidebar para cambiar entre tema claro y oscuro
- Detecta automáticamente la preferencia del sistema
- Persistencia en localStorage

### Búsqueda Global
- Campo de búsqueda en el header
- Busca en todos los tipos de contenido
- Atajo de teclado: `/` o `S`

### Sistema de Racha (Streak)
- Tracking de días consecutivos de estudio
- Celebración en milestones (7, 14, 30, 100 días)
- Alerta si no has estudiado hoy

### Historial de Escucha
- "Continuar donde lo dejaste" en el dashboard
- Guarda progreso por contenido

### Favoritos/Bookmarks
- Guarda contenido importante
- Accesible desde el dashboard

### Atajos de Teclado
- `?` o `S`: Mostrar ayuda de atajos
- `/`: Enfocar búsqueda
- `M`: Toggle dark mode
- `Espacio`: Play/Pause (en podcasts)
- `←/→`: Retroceder/Adelantar 10s (en podcasts)
- `G H/D/P/T`: Ir a Inicio/Dashboard/Podcasts/Tests

### PWA (Progressive Web App)
- Instalable en móvil y escritorio
- Shortcuts en el launcher
- Funciona offline (Service Worker)

### Notas Rápidas
- Añade notas personales a cualquier contenido
- Guardadas en localStorage

### Compartir Contenido
- Botón de compartir en podcasts/vídeos
- Web Share API o copia al portapapeles
- Incluye timestamp para compartir posición exacta

## Estructura

```
/
├── index.html              # Landing y acceso
├── dashboard.html          # Panel del alumno
├── temas.html              # PDFs del temario
├── tests.html              # Simulador de test
├── videos.html             # Vídeos de estudio
├── podcasts.html           # Audio de repaso
├── lecturas.html           # Mapas y esquemas
├── organigrama/            # Organigramas interactivos
├── js/
│   ├── app.js             # Runtime principal
│   ├── data/               # Contenido compartido
│   ├── pages/              # Lógica por página
│   └── utils/             # Utilidades (theme, streak, search, etc.)
├── css/
│   └── styles.css          # Estilos personalizados
└── manifest.json           # PWA manifest
```

## Utilidades (js/utils/)

- `storage.js` - Wrapper de localStorage
- `theme.js` - Dark mode
- `streak.js` - Tracking de racha
- `history.js` - Historial de contenido
- `search.js` - Búsqueda global
- `shortcuts.js` - Atajos de teclado
- `notes.js` - Notas rápidas
- `share.js` - Compartir contenido
- `analytics.js` - Analytics (Plausible, opcional)

## Notas

- App estática - autenticación local en el navegador
- Para multiusuario real se necesita backend
- Analytics Plausible deshabilitado por defecto (privacidad)
