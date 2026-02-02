# Propuestas de Rediseño Hero - LINAC

**Fecha:** 01 de Febrero 2026
**Objetivo:** Crear un Hero impactante para perfeccionamiento profesional
**Rubro:** Oratoria, Inglés, Actitud Ganadora

---

## 🎯 Análisis del Afiche de Referencia

### Elementos Clave a Replicar en Web:
- ✅ **Gradientes vibrantes** (morado/rosa)
- ✅ **Formas orgánicas** (ondas, círculos)
- ✅ **Foto de la profesional** destacada
- ✅ **Texto grande e impactante**
- ✅ **CTAs claros** (botones grandes)
- ✅ **Puntos decorativos** (patrón de diseño)
- ✅ **Información estructurada** con iconos
- ✅ **Credenciales visibles** (título profesional)

---

## 📐 Propuesta 1: "Hero con Split Screen Dinámico"

### Concepto
Split screen moderno con imagen de Pamela a la izquierda y contenido dinámico a la derecha. Gradientes sutiles de marca LINAC.

### Diseño Visual

```
┌────────────────────────────────────────────────────────────────┐
│  NAVEGACIÓN (fixed)                                             │
├───────────────────────────┬────────────────────────────────────┤
│                           │                                     │
│   ┌─────────────────┐    │  ⚡ TRANSFORMA TU VOZ EN TU       │
│   │                 │    │     MEJOR HERRAMIENTA               │
│   │                 │    │                                     │
│   │   FOTO PAMELA   │    │  Domina la Oratoria, el Inglés     │
│   │   (circular)    │    │  y la Comunicación Profesional     │
│   │                 │    │                                     │
│   │  [Gradiente]    │    │  ✓ Fonoaudióloga Certificada       │
│   └─────────────────┘    │  ✓ Experta Bilingüe                │
│                           │  ✓ +500 Profesionales Capacitados  │
│   Pamela Pérez Toledo    │                                     │
│   Fonoaudióloga          │  [AGENDA TU CLASE GRATIS] [VER PROGRAMAS]
│   Fundadora LINAC        │                                     │
│                           │  📍 Concepción, Chile              │
│   [Patrón de puntos]     │                                     │
│                           │                                     │
└───────────────────────────┴────────────────────────────────────┘
```

### Características Técnicas

**Layout:**
- Altura: 100vh
- Grid: 40% imagen / 60% contenido
- Responsive: Stack vertical en móvil

**Colores:**
```css
Fondo izquierdo: linear-gradient(135deg, #316eb5 0%, #254e8a 100%)
Fondo derecho: #ffffff
Acento: #FBEA24 (botones)
Texto: #233a63
```

**Animaciones:**
- Foto: Fade in + scale desde 0.8 a 1
- Título: Typing effect con cursor
- Badges: Slide in desde la izquierda (stagger)
- Botones: Pulse suave continuo

**Elementos Decorativos:**
- Patrón de puntos en esquina inferior izquierda
- Formas orgánicas sutiles en fondo
- Línea divisoria con gradiente

### Copy Sugerido

**Headline (H1):**
```
⚡ TRANSFORMA TU VOZ EN TU MEJOR HERRAMIENTA
```

**Subheadline (H2):**
```
Domina la Oratoria, el Inglés y la Comunicación Profesional
```

**Bullets:**
```
✓ Fonoaudióloga Certificada
✓ Experta Bilingüe con 10+ años de experiencia
✓ +500 Profesionales Capacitados en Chile
```

**CTAs:**
```
Primario: AGENDA TU CLASE GRATIS
Secundario: VER PROGRAMAS
```

---

## 📐 Propuesta 2: "Hero Tipo Evento con Gradiente Vibrante"

### Concepto
Inspirado directamente en el afiche del evento. Gradiente morado/rosa con foto circular de Pamela y diseño moderno con formas onduladas.

### Diseño Visual

```
┌────────────────────────────────────────────────────────────────┐
│  [Patrón puntos]          LINAC          [Patrón puntos]  [○]  │
│                                                                 │
│            🎤 HABLA CON SEGURIDAD, CLARIDAD E IMPACTO          │
│                                                                 │
│     ┌─────────────────┐          Pamela Pérez Toledo          │
│     │                 │          Fonoaudióloga | Bilingüe      │
│     │   FOTO PAMELA   │          Fundadora LINAC               │
│     │   (circular)    │                                        │
│     │                 │          ✓ Oratoria Profesional        │
│     │  [Fondo cyan]   │          ✓ Inglés Conversacional       │
│     └─────────────────┘          ✓ Actitud Ganadora            │
│                                                                 │
│                    [INSCRÍBETE GRATIS]                         │
│                                                                 │
│      [~] Próxima Charla: 15 de Febrero                        │
│      [⏰] 17:00 a 19:00 hrs                                    │
│      [📍] Cochrane 440, Concepción                            │
│                                                                 │
│  [Formas onduladas en la parte inferior]                      │
└────────────────────────────────────────────────────────────────┘
```

### Características Técnicas

**Layout:**
- Altura: 90vh
- Centro absoluto
- Contenido centrado verticalmente

**Colores:**
```css
Fondo principal:
  linear-gradient(135deg,
    #8B5CF6 0%,    /* Morado vibrante */
    #EC4899 50%,   /* Rosa */
    #F59E0B 100%   /* Naranja/amarillo */
  )

Foto fondo:
  linear-gradient(135deg, #65A5CD 0%, #35669A 100%)

Botón CTA: #F9A8D4 (rosa suave)
Texto: #FFFFFF
```

**Animaciones:**
- Fondo: Gradiente animado (hue rotation sutil)
- Foto: Entrada con bounce desde arriba
- Texto: Fade in secuencial
- Formas onduladas: Movimiento parallax
- Puntos decorativos: Pulsación suave

**Elementos Decorativos:**
- Patrón de puntos (7x7) en esquinas superiores
- Círculo grande transparente superior derecha
- Formas onduladas SVG en parte inferior
- Degradado overlay sutil

### Copy Sugerido

**Headline (H1):**
```
🎤 HABLA CON SEGURIDAD, CLARIDAD E IMPACTO
```

**Credenciales:**
```
Pamela Pérez Toledo
Fonoaudióloga | Bilingüe
Fundadora LINAC
```

**Beneficios:**
```
✓ Oratoria y uso de la voz para defender ideas
✓ Inglés conversacional para profesionales
✓ Actitud ganadora y comunicación asertiva
```

**CTA:**
```
INSCRÍBETE GRATIS
```

**Info Evento:**
```
📅 Próxima Charla: 15 de Febrero
⏰ 17:00 a 19:00 hrs
📍 Cochrane 440, Concepción
```

---

## 📐 Propuesta 3: "Hero Minimalista con Video Background"

### Concepto
Diseño limpio y moderno con video/animación de fondo (o imagen dinámica), overlay oscuro y contenido centrado. Enfoque en claridad y profesionalismo.

### Diseño Visual

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [VIDEO/IMAGEN DE FONDO: Pamela hablando en conferencia]      │
│  [Overlay: rgba(35, 58, 99, 0.85)]                            │
│                                                                 │
│                          LINAC                                  │
│                  Academia de Comunicación                       │
│                                                                 │
│              POTENCIA TU COMUNICACIÓN PROFESIONAL              │
│                                                                 │
│     [Inglés]    [Oratoria]    [Liderazgo]    [Presencia]     │
│                                                                 │
│          "Transformamos profesionales en comunicadores          │
│                      seguros e influyentes"                     │
│                                                                 │
│               - Pamela Pérez, Fonoaudióloga -                  │
│                                                                 │
│              [EXPLORAR PROGRAMAS]  [AGENDAR CITA]             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ 500+         │  │ 95%          │  │ 10+          │        │
│  │ Estudiantes  │  │ Satisfacción │  │ Años         │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│                         [Scroll ↓]                             │
└────────────────────────────────────────────────────────────────┘
```

### Características Técnicas

**Layout:**
- Altura: 100vh
- Contenido centrado absoluto
- Video/imagen fullscreen de fondo

**Colores:**
```css
Overlay: rgba(35, 58, 99, 0.85) /* Navy dark con transparencia */
Texto principal: #FFFFFF
Acento: #FBEA24
Badges: rgba(255, 255, 255, 0.1) con border #65A5CD
```

**Animaciones:**
- Video de fondo: Loop suave (sin sonido)
- Texto: Fade in con desplazamiento vertical
- Badges: Counter animado (0 → valor final)
- Scroll indicator: Bounce infinito

**Elementos Interactivos:**
- Pills interactivos (Inglés, Oratoria, etc.) con hover effect
- Stats cards con hover scale
- Parallax sutil en scroll

### Copy Sugerido

**Supratitle:**
```
LINAC
Academia de Comunicación y Desarrollo Personal
```

**Headline (H1):**
```
POTENCIA TU COMUNICACIÓN PROFESIONAL
```

**Pills/Tags:**
```
[Inglés Fluido]  [Oratoria Efectiva]  [Liderazgo]  [Presencia Escénica]
```

**Quote:**
```
"Transformamos profesionales en comunicadores
seguros e influyentes"
- Pamela Pérez, Fonoaudióloga Fundadora
```

**CTAs:**
```
Primario: EXPLORAR PROGRAMAS
Secundario: AGENDAR CITA GRATUITA
```

**Stats:**
```
500+ Estudiantes Capacitados
95% Satisfacción Garantizada
10+ Años de Experiencia
```

---

## 🎨 Comparación de Propuestas

| Aspecto | Propuesta 1 | Propuesta 2 | Propuesta 3 |
|---------|-------------|-------------|-------------|
| **Estilo** | Corporativo moderno | Vibrante y juvenil | Minimalista premium |
| **Impacto Visual** | Alto (split screen) | Muy alto (gradiente) | Medio-alto (elegante) |
| **Similitud al afiche** | Media | Alta | Baja |
| **Complejidad técnica** | Media | Alta | Media-alta |
| **Adaptabilidad móvil** | Buena | Excelente | Excelente |
| **Enfoque** | Profesional/Personal | Evento/Capacitación | Institucional |
| **Ideal para** | Landing corporativa | Campaña específica | Marca premium |

---

## 🔧 Elementos Comunes a Todas las Propuestas

### Must-Have:

1. **Foto de Pamela Pérez Toledo**
   - Profesional
   - Buena iluminación
   - Fondo neutro o corporativo
   - Alta resolución (mín 2000x2000px)

2. **Credenciales visibles:**
   - Fonoaudióloga
   - Bilingüe / Experta en idiomas
   - Fundadora LINAC

3. **CTAs claros:**
   - Primario: Acción inmediata (Inscríbete, Agenda)
   - Secundario: Exploración (Ver programas, Conocer más)

4. **Prueba social:**
   - Número de estudiantes
   - Años de experiencia
   - Testimonios o satisfacción

5. **Ubicación:**
   - Concepción, Chile
   - Dirección física (Cochrane 440)

### Elementos Opcionales:

- 🎯 Próximo evento/charla gratuita
- 📊 Estadísticas de impacto
- 🏆 Certificaciones o acreditaciones
- 💬 Testimonio destacado
- 🎬 Video testimonial

---

## 📱 Consideraciones Responsive

### Breakpoints:

**Desktop (>1024px):**
- Layout completo como mockup
- Animaciones completas
- Video background (si aplica)

**Tablet (768px - 1024px):**
- Propuesta 1: Stack vertical, foto arriba
- Propuesta 2: Reducir tamaños, mantener layout
- Propuesta 3: Reducir padding, mantener centrado

**Mobile (<768px):**
- Propuesta 1: Foto circular pequeña arriba + contenido
- Propuesta 2: Layout vertical completo
- Propuesta 3: Imagen de fondo fija, stats en fila

---

## 🎬 Animaciones Sugeridas

### Para todas las propuestas:

```typescript
// Secuencia de entrada
1. Fade in del fondo/imagen (0.5s)
2. Slide in del título principal (0.7s, delay 0.2s)
3. Fade in del subtítulo (0.5s, delay 0.5s)
4. Stagger de bullets/badges (0.3s cada uno, delay 0.8s)
5. Bounce de CTAs (0.5s, delay 1.2s)
6. Fade in de stats/info adicional (0.5s, delay 1.5s)
```

### Animaciones continuas:

```typescript
// Elementos que se mantienen animados
- Botón primario: Pulse suave cada 2s
- Patrón de puntos: Fade in/out aleatorio
- Formas orgánicas: Float sutil
- Gradiente: Hue rotation lento (360° en 60s)
- Scroll indicator: Bounce infinito
```

---

## 🖼️ Assets Necesarios

### Imágenes:

1. **Foto Pamela Pérez Toledo**
   - Formato: PNG con fondo transparente
   - Tamaño: 2000x2000px mínimo
   - Calidad: Alta resolución
   - Estilos:
     - Profesional (traje/blazer)
     - Sonriendo
     - Mirada a cámara

2. **Foto alternativa (para Propuesta 3)**
   - Pamela dando clase/conferencia
   - Formato: JPG
   - Tamaño: 1920x1080px mínimo
   - Calidad: Alta

3. **Video (opcional, Propuesta 3)**
   - Formato: MP4, WebM
   - Duración: 10-20 segundos loop
   - Sin sonido
   - Peso optimizado (<5MB)

### SVGs:

1. **Formas orgánicas (ondas)**
```svg
<svg viewBox="0 0 1440 320">
  <path fill="#ffffff"
    d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,181.3C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
  </path>
</svg>
```

2. **Patrón de puntos**
```svg
<svg width="100" height="100">
  <!-- 7x7 grid de círculos pequeños -->
  <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.5"/>
  <!-- Repetir para crear patrón -->
</svg>
```

### Iconos:

- 📍 Ubicación (MapPin)
- 📅 Calendario (Calendar)
- ⏰ Reloj (Clock)
- ✓ Check (CheckCircle)
- 🎤 Micrófono (Mic)
- 🌍 Globo (Globe)
- 💬 Mensaje (MessageCircle)

---

## 💻 Stack Técnico Propuesto

### Librerías Adicionales:

```json
{
  "framer-motion": "^10.x", // Ya instalado
  "react-intersection-observer": "^9.x", // Para scroll animations
  "react-countup": "^6.x", // Para stats animados
  "swiper": "^11.x", // Si se usa slider (Propuesta 2)
  "react-player": "^2.x" // Para video background (Propuesta 3)
}
```

### Componentes a Crear:

```
src/components/hero/
├── HeroSplitScreen.tsx        (Propuesta 1)
├── HeroEventStyle.tsx         (Propuesta 2)
├── HeroVideoBackground.tsx    (Propuesta 3)
├── shared/
│   ├── AnimatedStats.tsx
│   ├── CTAButtons.tsx
│   ├── DotPattern.tsx
│   ├── OrganicShapes.tsx
│   └── ProfessionalCard.tsx
```

---

## 📊 Recomendación

### 🥇 Para Empezar: **Propuesta 2 (Hero Tipo Evento)**

**Por qué:**
- ✅ Mayor similitud con el afiche de referencia
- ✅ Muy impactante visualmente
- ✅ Transmite energía y modernidad
- ✅ Perfecto para captar atención
- ✅ Gradientes están de moda
- ✅ Se adapta bien a móvil

**Cuándo usar:**
- Campaña de lanzamiento
- Promoción de evento específico
- Primera impresión impactante

---

### 🥈 Para Profesionalismo: **Propuesta 1 (Split Screen)**

**Por qué:**
- ✅ Balance entre impacto y profesionalismo
- ✅ Muestra bien a la profesional
- ✅ Estructura clara y organizada
- ✅ Fácil de escanear información
- ✅ Corporativo pero moderno

**Cuándo usar:**
- Landing permanente
- Enfoque B2B (empresas)
- Credibilidad profesional

---

### 🥉 Para Premium: **Propuesta 3 (Minimalista)**

**Por qué:**
- ✅ Elegante y sofisticado
- ✅ Enfoque en calidad sobre cantidad
- ✅ Video agrega dinamismo
- ✅ Stats dan confianza

**Cuándo usar:**
- Rebranding premium
- Público corporativo alto nivel
- Diferenciación de mercado

---

## 🎯 Plan de Acción Recomendado

### Opción A: Implementar Una Propuesta

1. **Elegir propuesta** (recomiendo Propuesta 2)
2. **Conseguir assets:**
   - Foto profesional de Pamela
   - Definir copy exacto
3. **Implementar componente**
4. **Ajustar animaciones**
5. **Testing responsive**
6. **Lanzar**

**Tiempo:** 1-2 días

---

### Opción B: Slider de Heros (Más Impactante)

1. **Implementar las 3 propuestas**
2. **Crear slider automático:**
   - Cambio cada 5-7 segundos
   - Transiciones suaves
   - Controles de navegación
3. **Priorizar Hero 2 como principal**
4. **Testing exhaustivo**

**Tiempo:** 3-4 días

**Ventajas:**
- ✅ Más contenido dinámico
- ✅ Diferentes mensajes
- ✅ Mayor engagement
- ✅ Sensación de sitio vivo

---

### Opción C: A/B Testing

1. **Implementar 2 propuestas**
2. **Mostrar aleatoriamente a visitantes**
3. **Medir conversiones:**
   - Clics en CTAs
   - Tiempo en página
   - Scroll depth
4. **Elegir ganadora**
5. **Optimizar**

**Tiempo:** 2 semanas de testing

---

## 📝 Próximos Pasos

1. **Revisar las 3 propuestas**
2. **Elegir una (o combinar elementos)**
3. **Recopilar feedback del equipo**
4. **Preparar assets necesarios**
5. **Yo procedo a implementar**

---

## 💬 Preguntas para Definir

Antes de implementar, necesitaríamos definir:

1. **¿Hay próximo evento/charla programado?**
   - Fecha, hora, lugar
   - Si es presencial u online

2. **¿Qué CTA es prioritario?**
   - Inscripción a programa
   - Agendar clase gratuita
   - Ver catálogo

3. **¿Tenemos foto profesional de Pamela?**
   - Si no, ¿podemos hacer una sesión?

4. **¿Hay video disponible?**
   - Para Propuesta 3
   - O podemos crear uno

5. **¿Preferencia de estilo?**
   - Juvenil y vibrante (Prop. 2)
   - Profesional y equilibrado (Prop. 1)
   - Premium y minimalista (Prop. 3)

---

**¿Cuál propuesta te gusta más? ¿O quieres que combine elementos de varias?** 🎨
