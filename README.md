# Academia Tropa Permanente

Academia online gratuita para aprobar las pruebas de acceso a Tropa Permanente del Ejército de Tierra.

## Características

- 📚 **Temario Completo** - Todos los temas oficiales estructurados
- 📝 **Tests Ilimitados** - Practica con preguntas tipo examen
- 📊 **Seguimiento de Progreso** - Dashboard con estadísticas y gráficos
- 🎓 **Contenido Multimedia** - Vídeos, podcasts y presentaciones
- 📱 **PWA** - Instala la app en tu dispositivo
- 🔒 **Seguridad** - Contraseñas cifradas con SHA-256
- 🌙 **Dark Mode** - Interfaz oscura optimizada
- ♿ **Accesible** - Diseño responsive y WCAG

## Tecnologías

- HTML5, CSS3 (Tailwind CSS)
- JavaScript ES6+ (Vanilla)
- Chart.js para gráficos
- Service Worker para PWA
- Vitest para testing

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/zabadev/tropa-permanente.git

# Entrar en el directorio
cd tropa-permanente

# Instalar dependencias de desarrollo
npm install

# Ejecutar tests
npm test

# O usar un servidor local
npx serve .
```

## Estructura del Proyecto

```
/
├── index.html          # Página principal (Landing)
├── dashboard.html      # Panel de usuario
├── temas.html          # Temas teóricos
├── tests.html          # Tests interactivos
├── videos.html         # Vídeos explicativos
├── podcasts.html       # Podcasts de audio
├── presentaciones.html # Presentaciones
├── lecturas.html       # Resúmenes
├── manifest.json       # PWA manifest
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   ├── app.js         # Lógica principal
│   ├── auth.js        # Módulo de autenticación
│   ├── components.js  # Componentes UI
│   ├── sw.js          # Service Worker
│   └── tests.js       # Preguntas de test
├── tests/
│   ├── setup.js       # Configuración de tests
│   ├── auth.test.js    # Tests de autenticación
│   └── components.test.js # Tests de componentes
└── package.json
```

## Scripts Disponibles

```bash
npm test          # Ejecutar tests
npm run test:run  # Ejecutar tests una vez
npm run test:coverage  # Generar informe de cobertura
npm run test:watch # Tests en modo watch
```

## PWA

La aplicación funciona como Progressive Web App:

- ✅ Instalable en desktop y móvil
- ✅ Funciona offline
- ✅ Notificaciones push
- ✅ Tema oscuro/claro

## Seguridad

- Contraseñas hasheadas con SHA-256 + salt
- Validación de formularios
- Almacenamiento seguro en localStorage
- No se almacenan contraseñas en texto plano

## Contributing

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'Añadir nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

## Licencia

MIT License - ZaBaDeV © 2024

## Autor

**ZaBaDeV** - Desarrollador

- GitHub: [@zabadev](https://github.com/zabadev)
- Web: [zabadev.es](https://zabadev.es)
- Ko-fi: [ko-fi.com/zabadev](https://ko-fi.com/zabadev)

---

Hecho con ❤️ para servir a España 🇪🇸
