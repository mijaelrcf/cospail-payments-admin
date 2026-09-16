# Checklist QA pre-release

Recorrer antes de cada despliegue a producción.

## Login (`/`)
- [ ] Login válido → redirige a `/panel`.
- [ ] Credenciales inválidas → “Credenciales incorrectas”, sin sesión creada.
- [ ] API caída → mensaje de error de conexión.
- [ ] Mostrar/ocultar contraseña alterna el texto y el `aria-label`.
- [ ] Con sesión activa, `/` redirige a `/panel`.
- [ ] Botón Ingresar se deshabilita (“Ingresando…”) durante la petición.

## Panel (`/panel`)
- [ ] KPIs Hoy / Este mes / Este año + gráfica mensual cargan.
- [ ] Cambiar año recarga datos.
- [ ] Error API → tarjeta roja con Reintentar funcional.

## Reporte (`/reporte`)
- [ ] Filtros por defecto (hoy + PagoRegistrado) cargan datos.
- [ ] “Hasta” < “Desde” → error inline, sin petición.
- [ ] Limpiar restaura filtros y página 1.
- [ ] Botón Ver abre el modal; X / `Esc` / backdrop lo cierran.
- [ ] Paginación: botones deshabilitan en bordes, contador y rango correctos.
- [ ] Sin resultados → estado vacío; error API → mensaje del backend + Reintentar.

## Sesión y navegación
- [ ] 401 en cualquier petición → limpia sesión y redirige a `/`.
- [ ] 401 en login NO redirige (solo muestra error).
- [ ] Cerrar sesión limpia y lleva a `/`; atrás no muestra datos previos.
- [ ] Recarga directa en `/panel` y `/reporte` funciona (fallback SPA del servidor).
- [ ] `/dashboard` redirige a `/panel`; ruta inexistente muestra 404.

## Build
- [ ] `npm run lint` y `npm run build` en verde.
- [ ] `VITE_API_BASE_URL` del build apunta a la API real.
- [ ] Sin `console.error` inesperados durante el recorrido.
