# Integración con Laravel + Inertia.js

## Estructura de archivos

Copia los archivos a tu proyecto Laravel de la siguiente manera:

```
resources/
├── js/
│   ├── Pages/
│   │   └── Home.tsx          ← Copiar desde Pages/Home.tsx
│   └── Components/
│       ├── Navigation.tsx    ← Copiar desde Components/
│       ├── Hero.tsx
│       ├── Services.tsx
│       ├── Courses.tsx
│       ├── Team.tsx
│       ├── Testimonials.tsx
│       ├── Contact.tsx
│       ├── Footer.tsx
│       └── WhatsAppButton.tsx
└── css/
    └── app.css               ← Copiar desde css/app.css
```

## Configuración de rutas en Laravel

En `routes/web.php`:

```php
<?php

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});
```

## Dependencias npm necesarias

```bash
npm install lucide-react
```

## Configuración de Tailwind

Asegúrate de tener Tailwind CSS configurado. En `tailwind.config.js`:

```js
export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.tsx',
    './resources/**/*.ts',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Notas importantes

1. Los componentes usan imports relativos (`../Components/`) que funcionan con la estructura de Inertia
2. Las imágenes placeholder (`/placeholder.svg`) deben reemplazarse con imágenes reales
3. El formulario de contacto actualmente usa `console.log` - conectar con tu backend Laravel
4. El número de WhatsApp debe actualizarse en `WhatsAppButton.tsx`
```

```tsx file="app/page.tsx" isDeleted="true"
...deleted...
