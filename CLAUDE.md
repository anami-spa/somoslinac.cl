# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ IMPORTANTE: Migración Planificada a Inertia.js

Este proyecto será migrado a **Laravel + Inertia.js** en el futuro. Al desarrollar, considera:

- Mantener componentes en `Components/` lo más desacoplados posible
- Evitar dependencias fuertes de Next.js (App Router, Server Components, etc.)
- Preferir props explícitas sobre contextos de Next.js
- El formulario de contacto debe prepararse para endpoints Laravel
- La data de `programs` debe ser fácilmente exportable a backend

Ver `README-LARAVEL.md` para detalles de la migración.

## Comandos Esenciales

```bash
# Desarrollo
npm run dev           # Iniciar servidor de desarrollo en http://localhost:3000
# También funciona: pnpm dev (si está instalado)

# Build y producción
npm run build         # Compilar para producción
npm run start         # Iniciar servidor de producción

# Linting
npm run lint          # Ejecutar ESLint en el proyecto
```

## Arquitectura del Proyecto

### Stack Tecnológico
- **Framework**: Next.js 16 (App Router) con React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con configuración personalizada de marca LINAC
- **Animaciones**: Framer Motion para transiciones y efectos visuales
- **UI Components**: Radix UI + shadcn/ui (en `components/ui/`)
- **Validación**: Zod + React Hook Form
- **Analytics**: Vercel Analytics

### Estructura de Componentes

El proyecto tiene **dos directorios de componentes** con propósitos distintos:

1. **`Components/`** (con mayúscula): Componentes de página específicos del sitio LINAC
   - `Navigation.tsx`: Barra de navegación con scroll animado
   - `Hero.tsx`: Sección hero principal
   - `AboutUs.tsx`: Sección "Quiénes somos"
   - `Programs.tsx`: Grid de programas con data exportada
   - `ProgramDetail.tsx`: Vista detallada de cada programa
   - `Methodology.tsx`: Sección de metodología
   - `Testimonials.tsx`: Testimonios de clientes
   - `Contact.tsx`: Formulario de contacto
   - `Footer.tsx`: Footer del sitio
   - `WhatsAppButton.tsx`: Botón flotante de WhatsApp

2. **`components/ui/`** (minúscula): Componentes reutilizables de shadcn/ui
   - Sistema de diseño con componentes genéricos (Button, Card, Dialog, etc.)
   - No modificar sin necesidad, son componentes estándar

### Flujo de Navegación

El proyecto usa **navegación por estados** en lugar de routing tradicional:

- `app/page.tsx` maneja dos vistas principales:
  - Vista Home: muestra todos los componentes de sección
  - Vista Program Detail: cuando se selecciona un programa
- La navegación dentro de Home usa `scrollIntoView` para desplazamiento suave entre secciones
- Identificadores de sección: `inicio`, `programas`, `metodologia`, `contacto`

### Sistema de Colores LINAC

El proyecto usa una paleta corporativa definida en `app/globals.css`:

```css
/* Azules corporativos */
--linac-navy-dark: #233a63
--linac-navy-medium: #254e8a
--linac-blue: #316eb5
--linac-blue-medium: #35669A
--linac-blue-light: #65A5CD

/* Verdes (acentos) */
--linac-green-dark: #3CAA36
--linac-green-medium: #54B150
--linac-green-light: #8BC685

/* Amarillos (CTAs) */
--linac-yellow: #FBEA24
--linac-yellow-hover: #FFEA4A
```

**Uso consistente de colores**:
- Textos principales: `#233a63` (navy-dark)
- Links y acentos: `#316eb5` (blue)
- Botones CTA: `#FBEA24` (yellow)
- Fondos suaves: `#f5f9ff`

### Data de Programas

Los programas se definen en `Components/Programs.tsx` como un export constante:

```typescript
export const programs = [...]
```

Cada programa incluye:
- `id`: Identificador único
- `title`, `subtitle`, `description`
- `objectives`: Array de objetivos
- `duration`, `badge`, `price`, `originalPrice`
- `icon`: Componente de Lucide React
- `gradient`, `accentColor`: Colores del tema
- `textDark`: Boolean para contraste de texto

### Configuraciones Importantes

**TypeScript** (`tsconfig.json`):
- Path alias: `@/*` apunta a la raíz del proyecto
- Permite importar con `@/Components/`, `@/lib/`, etc.

**Next.js** (`next.config.mjs`):
- `ignoreBuildErrors: true` - Los errores de TS no bloquean el build
- `images.unoptimized: true` - Imágenes sin optimización

**Tailwind** (`tailwind.config.ts`):
- Sistema de colores personalizado basado en variables CSS
- Plugin `tailwindcss-animate` para animaciones
- Content paths incluye `*.{js,ts,jsx,tsx,mdx}` en raíz

## Consideraciones para Desarrollo

### Al Agregar Nuevos Componentes de Página
- Colocarlos en `Components/` (mayúscula)
- Usar convención `"use client"` si requieren interactividad
- Importar con el alias `@/Components/`
- Seguir el patrón de animaciones con Framer Motion (`motion`, `useInView`)

### Al Modificar Programas
- Editar la constante `programs` en `Components/Programs.tsx`
- Mantener la estructura de datos existente
- Los IDs deben coincidir con el contenido detallado en `ProgramDetail.tsx`

### Estilos y Diseño
- Preferir clases de Tailwind sobre CSS custom
- Usar la función `cn()` de `lib/utils.ts` para merge condicional de clases
- Respetar los colores de marca LINAC definidos en globals.css
- Mantener consistencia en bordes redondeados: `rounded-3xl` para cards, `rounded-full` para botones

## Preparación para Migración a Laravel + Inertia.js

### Arquitectura Actual vs Futura

**Actual (Next.js)**:
- Single Page Application con navegación por estado
- `app/page.tsx` maneja vistas mediante `selectedProgram` state
- Data hardcodeada en `programs` array
- Scroll suave con `scrollIntoView`

**Futuro (Inertia.js)**:
- Múltiples páginas Inertia con routing Laravel
- Rutas: `/`, `/programas/{id}`, `/contacto`, etc.
- Data desde backend (DB o config PHP)
- Props pasadas desde controladores Laravel

### Cambios Necesarios en la Migración

1. **Routing y Navegación**:
   - Convertir navegación por estado a rutas Laravel:
     ```php
     Route::get('/', [HomeController::class, 'index']);
     Route::get('/programas/{id}', [ProgramController::class, 'show']);
     Route::post('/contacto', [ContactController::class, 'store']);
     ```
   - Reemplazar `setSelectedProgram` con `router.visit()` de Inertia
   - Mantener scroll suave con anchors HTML estándar

2. **Componentes** (`Components/` → `resources/js/Components/`):
   - Mover todos los componentes de `Components/` a Laravel
   - Mantener `components/ui/` (shadcn) sin cambios
   - Cambiar imports de `@/Components/` a `@/Components/` (Laravel usa Vite alias)

3. **Data y Estado**:
   - Migrar `programs` array a:
     - Opción 1: Tabla MySQL `programs` (recomendado si habrá CRUD)
     - Opción 2: Config PHP `config/programs.php` (si es estático)
   - Pasar data como props de Inertia desde controladores
   - Eliminar useState para navegación, usar props `{ program: Program }`

4. **Formularios**:
   - `Contact.tsx`: Reemplazar `console.log` con `router.post('/contacto', data)`
   - Agregar validación Laravel (FormRequest)
   - Manejar errores con `errors` prop de Inertia
   - Agregar token CSRF automáticamente incluido por Inertia

5. **Layout y Configuración**:
   - Convertir `app/layout.tsx` a layout Inertia persistente
   - Mover `globals.css` a `resources/css/app.css`
   - Configurar Vite para Tailwind en Laravel
   - Mantener paleta de colores CSS variables

6. **Assets e Imágenes**:
   - Mover `/public` a Laravel `/public`
   - Usar helper `asset()` o Vite para referencias
   - Mantener `unoptimized: true` no aplicará (no hay Next.js Image)

### Patrones a Seguir AHORA

Para facilitar la migración futura:

✅ **SÍ hacer**:
- Componentes puros que reciben props explícitas
- Lógica de negocio separada en funciones puras
- Usar `lucide-react` (compatible con Inertia)
- Props drilling sobre Context API de React cuando sea posible
- Clases Tailwind directas, evitar CSS-in-JS dinámico complejo

❌ **NO hacer**:
- No usar `useRouter` de Next.js en nuevos componentes
- No usar Server Components o `async` components
- No usar `next/image` (usar `<img>` con Tailwind)
- No usar API Routes de Next.js (irán a Laravel)
- No crear Context API complejos que sean difíciles de reemplazar con props Inertia

### Recursos de Migración

- `README-LARAVEL.md`: Guía de migración paso a paso
- [Inertia.js Docs](https://inertiajs.com): Documentación oficial
- Los componentes ya usan estructura compatible con Inertia
- Tailwind config es transferible directamente
