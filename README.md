# Cospail · Administración de Pagos

Panel de administración para consultar, filtrar y conciliar los pagos recibidos a través de la banca móvil (Cooperativa de Agua Cospail · R.L.).

**Stack:** React 19 + TypeScript + Vite · TanStack React Query · React Router · Tailwind CSS v4 · Recharts

## Requisitos

- Node.js 20+ (probado con Node 22) y npm.

## Desarrollo

```bash
npm install
cp .env.example .env   # en Windows: copy .env.example .env
```

Completa tu `.env` con la URL de la API de desarrollo (sin slash final):

```env
VITE_API_BASE_URL=https://localhost:7020/api
```

Luego:

```bash
npm run dev     # servidor de desarrollo
npm run lint    # verificación ESLint
npm run build   # compilación de producción (tsc + vite)
npm run preview # vista previa del build local
```

> El archivo `.env` es local y no se versiona. El `.env.example` es solo la plantilla.

### Variables de entorno

| Variable            | Requerida | Descripción                                  |
| ------------------- | --------- | -------------------------------------------- |
| `VITE_API_BASE_URL` | Sí        | URL base de la API, sin slash final (`.../api`) |

## Producción

> Importante: las variables `VITE_*` se **embeben al compilar**. El valor de
> `VITE_API_BASE_URL` debe estar definido **al momento del build**; poner un
> `.env` junto al `dist/` ya compilado no tiene efecto.

### Opción A — Vercel (recomendada si el repo está en Git)

1. Importa el repositorio en Vercel (framework: Vite).
2. En *Settings → Environment Variables* agrega `VITE_API_BASE_URL` con la URL de producción.
3. Cada push a la rama principal despliega automáticamente.
4. El fallback SPA (`/panel`, `/reporte` → `index.html`) lo maneja Vercel por defecto.

### Opción B — VPS con nginx

1. Compila con la URL de producción:
   ```bash
   VITE_API_BASE_URL=https://api.tudominio.com/api npm run build
   ```
   En PowerShell:
   ```powershell
   $env:VITE_API_BASE_URL="https://api.tudominio.com/api"; npm run build
   ```
2. Copia el contenido de `dist/` al directorio servido por nginx.
3. Configura el fallback SPA (requerido por React Router) y HTTPS:
   ```nginx
   server {
     listen 443 ssl;
     server_name admin.tudominio.com;
     root /var/www/cospail-payments-admin;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

## Estructura del proyecto

```
src/
├── api/            # cliente axios + endpoints admin
├── app/            # router (lazy), providers, auth-storage, guards
├── components/     # AdminShell, modales, badges + ui/ (Button, Card, Field, Feedback)
├── features/       # report/ (filtros, tabla, paginación) y analytics/ (KPIs, gráfica)
├── hooks/          # wrappers de React Query
├── lib/            # routes, env, formatters, errors (es-BO)
├── pages/          # login, panel (analytics), reporte, 404
└── types/          # DTOs + PaymentStatus como fuente única
```

Rutas: `/` (login) · `/panel` (dashboard) · `/reporte` · `/dashboard` redirige a `/panel` por compatibilidad.

## QA pre-release

Antes de cada despliegue, recorrer la checklist de `QA-CHECKLIST.md` (login, panel, reporte, modal, sesión 401, navegación y build).
