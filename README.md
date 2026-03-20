# PermaAcade

Plataforma estática de preparación para Tropa Permanente con temario, tests, vídeos, podcasts y material visual.

## Mejoras aplicadas

- Estado y progreso centralizados en `js/app.js`.
- Datos de contenido separados en `js/data/content.js`.
- Scripts por página en `js/pages/` en lugar de lógica repetida en cada HTML.
- Autenticación local más coherente con hash SHA-256 para nuevas contraseñas.
- Progreso real por recurso en temas, vídeos, podcasts, lecturas y tests.
- Corrección de erratas visibles del contenido.

## Estructura

- `index.html`: landing y acceso.
- `dashboard.html`: panel del alumno.
- `temas.html`: PDFs del temario.
- `tests.html`: simulador de test.
- `videos.html`: vídeos de estudio.
- `podcasts.html`: audio de repaso.
- `lecturas.html`: mapas y esquemas.
- `js/data/`: datos compartidos.
- `js/pages/`: lógica específica de cada vista.

## Notas

- Sigue siendo una app estática, así que la autenticación es local al navegador.
- Si se quiere seguridad real multiusuario, hace falta backend.
