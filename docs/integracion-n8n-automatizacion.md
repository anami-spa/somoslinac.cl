# Integración n8n - Automatización de Inscripciones LINAC

**Fecha de creación:** 01 de Febrero 2026
**Estado:** Documentación para implementación futura
**Autor:** Documentación técnica LINAC

---

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura Propuesta](#arquitectura-propuesta)
3. [Automatizaciones a Implementar](#automatizaciones-a-implementar)
4. [Herramientas y Servicios](#herramientas-y-servicios)
5. [Flujo de Datos](#flujo-de-datos)
6. [Configuración Paso a Paso](#configuración-paso-a-paso)
7. [Código de Integración](#código-de-integración)
8. [Costos y Recursos](#costos-y-recursos)
9. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
10. [Roadmap de Implementación](#roadmap-de-implementación)

---

## 🎯 Resumen Ejecutivo

### Objetivo

Automatizar completamente el proceso de inscripción de estudiantes a los programas LINAC, desde el registro hasta la integración en grupos de WhatsApp.

### Beneficios

- ✅ **Ahorro de tiempo:** 90% de reducción en tareas manuales
- ✅ **Menos errores:** Automatización elimina errores humanos
- ✅ **Mejor experiencia:** Respuestas inmediatas a estudiantes
- ✅ **Trazabilidad:** Todo registrado automáticamente
- ✅ **Escalabilidad:** Soporta crecimiento sin aumentar staff

### Alcance

1. Envío automático de emails de confirmación
2. Registro en Google Sheets de todas las inscripciones
3. Almacenamiento de comprobantes en Google Drive
4. Adición automática a grupos de WhatsApp del curso

---

## 🏗️ Arquitectura Propuesta

### Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────┐
│                   USUARIO FINAL                          │
│              (Formulario de Inscripción)                 │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────────┐
        │   Formspree (Actual)        │
        │   xdadzwdd                  │
        └─────────────┬───────────────┘
                      │
                      │ Webhook
                      ▼
        ┌─────────────────────────────┐
        │         n8n Cloud           │
        │      (Orquestador)          │
        └─────────────┬───────────────┘
                      │
        ┌─────────────┼─────────────┬─────────────┬──────────────┐
        │             │             │             │              │
        ▼             ▼             ▼             ▼              ▼
    ┌─────┐      ┌─────┐      ┌─────┐      ┌─────┐       ┌─────┐
    │Gmail│      │Sheets│     │Drive│      │W.App│       │Slack│
    │SMTP │      │ API  │     │ API │      │ API │       │(opt)│
    └─────┘      └─────┘      └─────┘      └─────┘       └─────┘
        │             │             │             │              │
        ▼             ▼             ▼             ▼              ▼
    Email         Base de      Comprobantes   Grupo         Notif
    Confirm.      Datos        Organizados    Curso         Admin
```

### Opción Alternativa (Sin Formspree)

```
┌─────────────────────────────────────────────────────────┐
│              Formulario LINAC React                      │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ POST directo
                      ▼
        ┌─────────────────────────────┐
        │    n8n Webhook Endpoint     │
        │  https://n8n.tu-dominio.com │
        └─────────────┬───────────────┘
                      │
                  [resto igual]
```

---

## 🤖 Automatizaciones a Implementar

### 1. Email de Confirmación al Participante

**Trigger:** Nueva inscripción recibida

**Acción:**
- Enviar email personalizado
- Template con nombre del participante
- Detalles del programa
- Datos bancarios para pago
- Próximos pasos

**Template de Email:**

```html
Asunto: ✅ Confirmación de Inscripción - {nombre_programa}

Hola {nombre_participante},

¡Gracias por inscribirte al programa {nombre_programa}!

📋 RESUMEN DE TU INSCRIPCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Programa: {nombre_programa}
Precio: {precio}
RUT: {rut}
Email: {email}

💳 DATOS PARA PAGO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Banco: Banco Santander
Tipo: Cuenta corriente
RUT: 77.631.728-4
Titular: LINAC Capacitaciones SPA
N° Cuenta: 89017866
Email: linaccapacitaciones@gmail.com

⚠️ Importante: En el mensaje de la transferencia indica:
"{nombre_programa} - {nombre_participante}"

🔗 PAGO ONLINE:
También puedes pagar con tarjeta aquí:
{link_pago_online}

📤 PRÓXIMOS PASOS:
1. Realiza el pago
2. Sube tu comprobante en: {link_inscripcion}
3. Recibirás confirmación en 24-48 horas
4. Te agregaremos al grupo de WhatsApp del curso

¿Dudas? Responde a este email o escríbenos:
📧 linaccapacitaciones@gmail.com
📱 WhatsApp: +56 9 XXXX XXXX

¡Nos vemos pronto!

Equipo LINAC Capacitaciones
www.somoslinac.cl
```

---

### 2. Registro en Google Sheets

**Trigger:** Nueva inscripción recibida

**Acción:**
- Agregar nueva fila en hoja de cálculo
- Timestamp automático
- Estado: "Pendiente de pago"

**Estructura de la Hoja:**

| Timestamp | Programa | Nombre | RUT | Email | Teléfono | Tipo | Empresa | Cómo conoció | Precio | Estado | Comprobante | Fecha Pago | En WhatsApp |
|-----------|----------|--------|-----|-------|----------|------|---------|--------------|--------|--------|-------------|------------|-------------|
| 2026-02-01 20:30 | Speak Easy | Juan Pérez | 12.345.678-5 | juan@mail.com | +56912345678 | Individual | - | Redes | $180.000 | Pendiente | - | - | No |

**Columnas:**
1. Timestamp (automático)
2. Programa
3. Nombre completo
4. RUT
5. Email
6. Teléfono
7. Tipo inscripción (Individual/Empresa)
8. Nombre empresa (si aplica)
9. ¿Cómo nos conoció?
10. Precio
11. Estado (Pendiente/Pagado/Confirmado)
12. URL Comprobante
13. Fecha de pago
14. En WhatsApp (Sí/No)
15. Comentarios

---

### 3. Almacenamiento de Comprobantes en Google Drive

**Trigger:** Comprobante subido

**Acción:**
- Subir archivo a Google Drive
- Organizar en carpetas por:
  - Año
  - Mes
  - Programa
- Nombrar archivo: `{rut}_{nombre}_{timestamp}.{ext}`

**Estructura de Carpetas:**

```
LINAC Comprobantes/
├── 2026/
│   ├── Enero/
│   │   ├── Speak-Easy-Access/
│   │   │   ├── 12345678-5_juan-perez_20260115.jpg
│   │   │   └── 98765432-1_maria-lopez_20260120.pdf
│   │   ├── Toma-Las-Riendas/
│   │   └── Oratoria/
│   ├── Febrero/
│   └── Marzo/
└── 2027/
```

**Acción Adicional:**
- Actualizar Google Sheets con URL del comprobante
- Cambiar estado a "Comprobante recibido"

---

### 4. Notificación al Administrador

**Trigger:** Nueva inscripción o comprobante recibido

**Opciones:**

**Opción A: Email**
```
Para: linaccapacitaciones@gmail.com
Asunto: 🔔 Nueva Inscripción - {nombre_programa}

Nueva inscripción recibida:
👤 {nombre}
📧 {email}
📱 {telefono}
💰 {precio}

Ver en Sheets: {link_sheets}
```

**Opción B: Slack** (si usan)
```
💼 Nueva inscripción en {programa}
👤 {nombre} ({rut})
📧 {email}
💰 {precio}
```

**Opción C: Telegram** (alternativa)
```
🎓 NUEVA INSCRIPCIÓN

Programa: {programa}
Estudiante: {nombre}
Email: {email}
Precio: {precio}

Ver detalles: {link}
```

---

### 5. Agregar a Grupo de WhatsApp

**Trigger:** Comprobante verificado y pago confirmado

**Opciones de Implementación:**

#### Opción A: WhatsApp Business API (Oficial)

**Pros:**
- ✅ Oficial y permitido
- ✅ Confiable
- ✅ Soporte de Meta

**Contras:**
- ❌ Requiere verificación de negocio
- ❌ Costo mensual (~$40-100)
- ❌ Setup más complejo

**Flujo:**
1. Verificar pago en Sheets (estado = "Pagado")
2. Obtener teléfono del participante
3. Enviar invitación al grupo vía API
4. Actualizar Sheets: "En WhatsApp = Sí"

#### Opción B: Evolution API (Self-hosted)

**Pros:**
- ✅ Gratis
- ✅ Más control
- ✅ Self-hosted

**Contras:**
- ❌ No oficial (riesgo de ban)
- ❌ Requiere mantenimiento
- ❌ Necesita servidor 24/7

**Implementación:**
```bash
# Instalar Evolution API
docker run -d \
  --name evolution-api \
  -p 8080:8080 \
  atendai/evolution-api
```

#### Opción C: Manual con Notificación

**Flujo Semi-Automático:**
1. n8n detecta pago confirmado
2. Envía notificación al admin
3. Admin agrega manualmente al grupo
4. Admin marca en Sheets: "En WhatsApp = Sí"

**Más seguro para empezar**

---

## 🛠️ Herramientas y Servicios

### n8n (Orquestador)

**Opciones:**

#### Opción 1: n8n Cloud (Recomendado para empezar)
- **URL:** https://n8n.io/pricing
- **Costo:** $20/mes (plan básico)
- **Pros:** Setup inmediato, sin mantenimiento
- **Contras:** Costo mensual

#### Opción 2: n8n Self-hosted (Para escalar)
- **Hosting:** VPS (DigitalOcean, AWS, Hetzner)
- **Costo:** $5-10/mes
- **Pros:** Control total, más barato a largo plazo
- **Contras:** Requiere conocimientos técnicos

**Instalación Self-hosted:**
```bash
# Docker Compose
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=tu_password_seguro
      - N8N_HOST=n8n.tudominio.com
      - WEBHOOK_URL=https://n8n.tudominio.com/
    volumes:
      - ./n8n_data:/home/node/.n8n
```

---

### Google Workspace

**Servicios a usar:**
1. **Gmail** - Envío de emails
2. **Google Sheets** - Base de datos
3. **Google Drive** - Almacenamiento

**Costo:**
- Gmail SMTP: Gratis (límite 500 emails/día)
- Google Sheets: Gratis
- Google Drive: Gratis (15GB), $2/mes (100GB)

**Configuración necesaria:**
1. Crear cuenta de servicio en Google Cloud Console
2. Habilitar APIs:
   - Gmail API
   - Google Sheets API
   - Google Drive API
3. Descargar credenciales JSON
4. Compartir Sheets y Drive con la cuenta de servicio

---

### WhatsApp

#### Opción Recomendada: Evolution API

**Características:**
- Open source
- Self-hosted
- Compatible con n8n
- Conexión mediante QR

**Repositorio:**
```
https://github.com/EvolutionAPI/evolution-api
```

**Instalación:**
```bash
git clone https://github.com/EvolutionAPI/evolution-api
cd evolution-api
npm install
npm run start:prod
```

**Conexión desde n8n:**
```
Endpoint: http://localhost:8080
API Key: tu_api_key
```

---

## 📊 Flujo de Datos

### Estructura de Datos que Recibe n8n

```json
{
  "timestamp": "2026-02-01T20:30:00.000Z",
  "fuente": "formspree",
  "programa": {
    "id": "speak-easy-access",
    "nombre": "Speak Easy Access!",
    "precio": "$180.000 CLP",
    "precioNumero": 180000,
    "linkPago": "https://flow.cl/..."
  },
  "participante": {
    "nombreCompleto": "Juan Pérez González",
    "rut": "12.345.678-5",
    "email": "juan@ejemplo.com",
    "telefono": "+56912345678"
  },
  "inscripcion": {
    "tipo": "individual",
    "nombreEmpresa": null,
    "rutEmpresa": null,
    "comoConocio": "redes",
    "comentarios": "Quiero mejorar mi inglés para el trabajo"
  },
  "comprobante": {
    "enviado": false,
    "archivo": null,
    "nombre": null,
    "tipo": null,
    "tamano": null,
    "url": null
  }
}
```

### Cuando se Sube el Comprobante

```json
{
  "timestamp": "2026-02-01T21:00:00.000Z",
  "tipo": "comprobante",
  "participante": {
    "nombreCompleto": "Juan Pérez González",
    "email": "juan@ejemplo.com",
    "rut": "12.345.678-5"
  },
  "programa": "Speak Easy Access!",
  "comprobante": {
    "archivo": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "nombre": "comprobante_pago.jpg",
    "tipo": "image/jpeg",
    "tamano": "245670",
    "url": null
  }
}
```

---

## ⚙️ Configuración Paso a Paso

### Fase 1: Setup Inicial (1-2 horas)

#### 1.1 Crear cuenta n8n Cloud

```bash
1. Ir a https://n8n.io/
2. Sign up → Plan básico ($20/mes)
3. Verificar email
4. Acceder al dashboard
```

#### 1.2 Configurar Google Cloud

```bash
1. Ir a https://console.cloud.google.com/
2. Crear nuevo proyecto: "LINAC-Automatizacion"
3. Habilitar APIs:
   - Gmail API
   - Google Sheets API
   - Google Drive API
4. Crear cuenta de servicio:
   - Nombre: "n8n-linac"
   - Rol: Editor
5. Crear credenciales JSON
6. Descargar archivo: linac-service-account.json
```

#### 1.3 Preparar Google Sheets

```bash
1. Crear nueva hoja: "LINAC - Inscripciones 2026"
2. Crear columnas según estructura definida
3. Compartir con cuenta de servicio:
   - n8n-linac@proyecto.iam.gserviceaccount.com
   - Permiso: Editor
4. Copiar ID de la hoja (está en la URL)
```

#### 1.4 Preparar Google Drive

```bash
1. Crear carpeta: "LINAC Comprobantes"
2. Crear subcarpetas por año
3. Compartir con cuenta de servicio
4. Copiar ID de la carpeta
```

---

### Fase 2: Crear Workflow en n8n (2-3 horas)

#### 2.1 Crear Nuevo Workflow

```
Nombre: "LINAC - Inscripciones Automáticas"
```

#### 2.2 Agregar Nodos

**Nodo 1: Webhook Trigger**
```
Tipo: Webhook
Método: POST
Path: /linac-inscripcion
Respuesta: Immediately
```

**Nodo 2: Validar Datos**
```
Tipo: Function
Código:
  - Validar que existan campos requeridos
  - Normalizar formato de datos
  - Agregar timestamp si no existe
```

**Nodo 3: Gmail - Email Confirmación**
```
Tipo: Gmail
Acción: Send Email
Para: {{$json.participante.email}}
Asunto: Confirmación de Inscripción - {{$json.programa.nombre}}
Cuerpo: [Template HTML]
```

**Nodo 4: Google Sheets - Agregar Fila**
```
Tipo: Google Sheets
Acción: Append Row
Spreadsheet ID: [tu_sheet_id]
Hoja: Inscripciones
Valores: [mapear campos]
```

**Nodo 5: Slack/Email - Notificar Admin**
```
Tipo: Slack o Gmail
Para: admin@linac.cl
Mensaje: Nueva inscripción recibida
```

---

### Fase 3: Workflow de Comprobantes (1-2 horas)

**Workflow separado:** "LINAC - Comprobantes"

**Nodo 1: Webhook Comprobante**
```
Path: /linac-comprobante
```

**Nodo 2: Decodificar Base64**
```
Tipo: Function
Convertir base64 a buffer
```

**Nodo 3: Subir a Google Drive**
```
Tipo: Google Drive
Acción: Upload File
Carpeta: [ID carpeta programa]
Nombre: {{$json.rut}}_{{$json.nombre}}_{{timestamp}}.{{ext}}
```

**Nodo 4: Actualizar Google Sheets**
```
Tipo: Google Sheets
Acción: Update Row
Buscar por: RUT
Actualizar: URL comprobante, Estado = "Comprobante recibido"
```

**Nodo 5: Notificar Admin**
```
Nuevo comprobante recibido para revisión
```

---

### Fase 4: WhatsApp Integration (3-8 horas)

#### Opción Manual (Más Segura)

**Workflow:** "LINAC - Revisar Pagos"

```
Cada día a las 9:00 AM:
1. Leer Google Sheets
2. Filtrar: Estado = "Comprobante recibido" AND EnWhatsApp = "No"
3. Enviar email al admin con lista
4. Admin revisa comprobantes
5. Admin agrega manualmente a WhatsApp
6. Admin marca en Sheets: EnWhatsApp = "Sí"
```

#### Opción Automática (Evolution API)

**Workflow:** "LINAC - WhatsApp Auto"

```
Trigger: Webhook manual o cambio en Sheets
1. Detectar: Estado = "Pagado" AND EnWhatsApp = "No"
2. Llamar a Evolution API
3. Agregar contacto al grupo
4. Actualizar Sheets: EnWhatsApp = "Sí"
5. Registrar en log
```

---

## 💻 Código de Integración

### Modificar InscripcionPage.tsx

#### Opción A: Mantener Formspree + Webhook a n8n

**Configurar Formspree Webhook:**
```
1. Ir a Formspree dashboard
2. Form xdadzwdd → Settings → Webhooks
3. Agregar webhook:
   URL: https://tu-n8n.app.n8n.cloud/webhook/linac-inscripcion
   Events: submission
```

**No requiere cambios en código**

---

#### Opción B: POST Directo a n8n (Más Control)

**Modificar función `onSubmit` en InscripcionPage.tsx:**

```typescript
const onSubmit = async (data: RegistrationFormData) => {
  console.log("Formulario enviado:", data)
  setSubmittedData(data)

  // Preparar payload para n8n
  const payload = {
    timestamp: new Date().toISOString(),
    fuente: "formulario-web",
    programa: {
      id: programId,
      nombre: program.title,
      precio: program.price,
      precioNumero: program.priceNumber,
      linkPago: program.paymentLink,
    },
    participante: {
      nombreCompleto: data.fullName,
      rut: data.rut,
      email: data.email,
      telefono: data.phone,
    },
    inscripcion: {
      tipo: data.registrationType,
      nombreEmpresa: data.companyName || null,
      rutEmpresa: data.companyRut || null,
      comoConocio: data.howDidYouHear || null,
      comentarios: data.comments || null,
    },
    comprobante: {
      enviado: false,
      archivo: null,
    },
  }

  try {
    // Enviar a n8n
    const responseN8n = await fetch("https://tu-n8n.app.n8n.cloud/webhook/linac-inscripcion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!responseN8n.ok) {
      throw new Error("Error al enviar a n8n")
    }

    console.log("Datos enviados a n8n exitosamente")

    // También enviar a Formspree como backup (opcional)
    await fetch("https://formspree.io/f/xdadzwdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error("Error al enviar datos:", error)
    // Mostrar mensaje al usuario
    alert("Hubo un error al procesar tu inscripción. Por favor, intenta de nuevo.")
    return
  }

  setStep(2)
}
```

---

**Modificar función `handleSubmitProof`:**

```typescript
const handleSubmitProof = async () => {
  if (!uploadedFile || !submittedData) {
    alert("Por favor, carga tu comprobante de pago")
    return
  }

  setIsSubmitting(true)

  try {
    // Convertir archivo a base64
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64File = reader.result as string

      // Preparar payload
      const proofPayload = {
        timestamp: new Date().toISOString(),
        tipo: "comprobante",
        participante: {
          nombreCompleto: submittedData.fullName,
          email: submittedData.email,
          rut: submittedData.rut,
          telefono: submittedData.phone,
        },
        programa: {
          id: programId,
          nombre: program.title,
          precio: program.price,
        },
        comprobante: {
          archivo: base64File,
          nombre: uploadedFile.name,
          tipo: uploadedFile.type,
          tamano: uploadedFile.size.toString(),
        },
      }

      // Enviar a n8n
      const response = await fetch("https://tu-n8n.app.n8n.cloud/webhook/linac-comprobante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proofPayload),
      })

      if (!response.ok) {
        throw new Error("Error al enviar comprobante")
      }

      setSubmitSuccess(true)
      setIsSubmitting(false)
    }

    reader.readAsDataURL(uploadedFile)
  } catch (error) {
    console.error("Error al enviar comprobante:", error)
    alert("Hubo un error al enviar el comprobante. Por favor, intenta de nuevo.")
    setIsSubmitting(false)
  }
}
```

---

### Variables de Entorno

**Crear archivo `.env.local`:**

```bash
# n8n
VITE_N8N_WEBHOOK_INSCRIPCION=https://tu-n8n.app.n8n.cloud/webhook/linac-inscripcion
VITE_N8N_WEBHOOK_COMPROBANTE=https://tu-n8n.app.n8n.cloud/webhook/linac-comprobante

# Formspree (backup)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xdadzwdd
```

**Usar en código:**

```typescript
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_INSCRIPCION
const N8N_COMPROBANTE_URL = import.meta.env.VITE_N8N_WEBHOOK_COMPROBANTE
```

---

## 💰 Costos y Recursos

### Opción 1: Setup Económico (Recomendado para Empezar)

| Servicio | Costo Mensual | Notas |
|----------|---------------|-------|
| n8n Cloud | $20 | Plan básico |
| Google Workspace | $0 | Cuenta gratuita suficiente |
| Gmail SMTP | $0 | 500 emails/día gratis |
| Google Sheets | $0 | Gratis |
| Google Drive | $0-2 | 15GB gratis, 100GB $2/mes |
| WhatsApp (manual) | $0 | Proceso semi-automático |
| **TOTAL** | **$20-22/mes** | **Muy accesible** |

---

### Opción 2: Setup Profesional

| Servicio | Costo Mensual | Notas |
|----------|---------------|-------|
| n8n Self-hosted | $5-10 | VPS DigitalOcean/Hetzner |
| Google Workspace | $6 | Business Starter |
| SendGrid | $0-15 | 100 emails/día gratis |
| Google Drive | $2 | 100GB |
| WhatsApp Business API | $40-100 | Oficial de Meta |
| **TOTAL** | **$53-133/mes** | **Setup robusto** |

---

### Opción 3: Setup Escalable

| Servicio | Costo Mensual | Notas |
|----------|---------------|-------|
| n8n Self-hosted (cluster) | $20-50 | Alta disponibilidad |
| Google Workspace Business | $12 | 2TB storage |
| SendGrid Essentials | $20 | 50k emails/mes |
| Cloudinary | $0-89 | Optimización imágenes |
| WhatsApp Business API | $100 | Meta verificado |
| Monitoring (opcional) | $10 | UptimeRobot, etc. |
| **TOTAL** | **$162-281/mes** | **Empresa grande** |

---

### Estimación de Volumen

**Cálculo para 100 inscripciones/mes:**

- Emails: ~300 (confirmación + notifs)
- Almacenamiento: ~500MB/mes (comprobantes)
- Llamadas API: ~500/mes

**Todos los servicios gratuitos soportan este volumen**

---

## 🔒 Consideraciones de Seguridad

### Protección de Datos Personales

#### RGPD / Ley de Protección de Datos (Chile)

**Requisitos:**
1. ✅ Consentimiento explícito para almacenar datos
2. ✅ Política de privacidad actualizada
3. ✅ Derecho a solicitar eliminación de datos
4. ✅ Encriptación de datos sensibles
5. ✅ Acceso restringido a información

**Implementar:**

```typescript
// Agregar al formulario
const privacySchema = z.object({
  // ... campos existentes
  acceptDataProcessing: z.boolean().refine(val => val === true, {
    message: "Debes aceptar el procesamiento de datos"
  }),
  acceptWhatsApp: z.boolean(), // Opcional
})
```

---

### Seguridad de Webhooks

**Autenticación en n8n:**

```typescript
// En el código del formulario
const WEBHOOK_SECRET = import.meta.env.VITE_WEBHOOK_SECRET

const response = await fetch(webhookUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Webhook-Secret": WEBHOOK_SECRET,
  },
  body: JSON.stringify(payload),
})
```

**Validar en n8n:**

```javascript
// Nodo de validación en n8n
const secret = $('Webhook').item.json.headers['x-webhook-secret']
const expectedSecret = '{{$env.WEBHOOK_SECRET}}'

if (secret !== expectedSecret) {
  throw new Error('Invalid webhook secret')
}

return $input.all()
```

---

### Encriptación de Archivos

**Opción:** Encriptar comprobantes antes de subir a Drive

```typescript
// Usar crypto-js
import CryptoJS from 'crypto-js'

const encryptFile = (base64File: string, key: string) => {
  return CryptoJS.AES.encrypt(base64File, key).toString()
}

const decryptFile = (encryptedFile: string, key: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedFile, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}
```

---

### Acceso a Google Sheets

**Permisos mínimos:**
- Cuenta de servicio: Solo Editor
- No compartir con emails personales
- Activar 2FA en cuenta Google principal
- Rotar credenciales cada 6 meses

---

### Backup y Recuperación

**Estrategia:**

1. **Backup de Google Sheets:**
   - Exportar a CSV diariamente
   - Almacenar en S3 o Dropbox

2. **Backup de Comprobantes:**
   - Sincronización con Dropbox
   - O backup manual mensual

3. **Backup de Workflows n8n:**
   - Exportar workflows como JSON
   - Versionarlos en Git

**Script de backup automático:**

```javascript
// n8n workflow: "Backup Diario"
// Trigger: Cron - Todos los días a las 2 AM

// Nodo 1: Leer Google Sheets
// Nodo 2: Convertir a CSV
// Nodo 3: Subir a Dropbox
// Nodo 4: Enviar email confirmación
```

---

## 📅 Roadmap de Implementación

### Sprint 1: Setup Básico (Semana 1)

**Objetivo:** Emails y Google Sheets funcionando

**Tareas:**
- [ ] Crear cuenta n8n Cloud
- [ ] Configurar Google Cloud Console
- [ ] Crear Google Sheet con estructura
- [ ] Crear workflow básico en n8n
- [ ] Configurar Gmail SMTP
- [ ] Crear template de email
- [ ] Probar con datos de prueba
- [ ] Documentar credenciales

**Entregable:** Email automático + registro en Sheets

---

### Sprint 2: Comprobantes (Semana 2)

**Objetivo:** Almacenamiento automático en Drive

**Tareas:**
- [ ] Crear estructura de carpetas en Drive
- [ ] Compartir con cuenta de servicio
- [ ] Crear workflow de comprobantes
- [ ] Modificar `handleSubmitProof` en código
- [ ] Probar upload de imágenes
- [ ] Probar upload de PDFs
- [ ] Verificar actualización en Sheets
- [ ] Probar con archivos grandes

**Entregable:** Comprobantes guardados automáticamente

---

### Sprint 3: Notificaciones Admin (Semana 3)

**Objetivo:** Admin recibe notificaciones

**Tareas:**
- [ ] Decidir canal (Email/Slack/Telegram)
- [ ] Configurar integración elegida
- [ ] Crear templates de notificación
- [ ] Agregar nodos a workflows
- [ ] Configurar frecuencia de notifs
- [ ] Probar notificaciones
- [ ] Ajustar formato de mensajes

**Entregable:** Admin notificado de nuevas inscripciones

---

### Sprint 4: WhatsApp (Semana 4-5)

**Objetivo:** Integración con WhatsApp

**Opción A: Manual**
- [ ] Crear workflow de reporte diario
- [ ] Listar pendientes de agregar
- [ ] Proceso manual documentado

**Opción B: Evolution API**
- [ ] Instalar Evolution API en servidor
- [ ] Conectar con número de WhatsApp
- [ ] Crear grupos por programa
- [ ] Desarrollar workflow de adición
- [ ] Probar con números de prueba
- [ ] Implementar logging
- [ ] Monitorear por 1 semana

**Entregable:** Proceso de WhatsApp funcionando

---

### Sprint 5: Refinamiento (Semana 6)

**Objetivo:** Optimizar y pulir

**Tareas:**
- [ ] Revisar logs de errores
- [ ] Optimizar tiempos de respuesta
- [ ] Mejorar templates de emails
- [ ] Agregar analytics
- [ ] Crear dashboard de métricas
- [ ] Documentar procesos
- [ ] Training al equipo

**Entregable:** Sistema optimizado y documentado

---

## 📈 Métricas y Monitoreo

### KPIs a Medir

1. **Tasa de éxito de inscripciones**
   - Inscripciones completadas / Iniciadas
   - Meta: >90%

2. **Tiempo promedio de procesamiento**
   - Desde inscripción hasta confirmación
   - Meta: <5 minutos

3. **Tasa de error en automatizaciones**
   - Fallos / Total de ejecuciones
   - Meta: <1%

4. **Tiempo de respuesta al estudiante**
   - Email de confirmación
   - Meta: <1 minuto

5. **Comprobantes procesados**
   - Comprobantes subidos / Inscripciones
   - Meta: >95%

---

### Dashboard de Monitoreo

**Crear en Google Sheets:**

```
┌─────────────────────────────────────┐
│  DASHBOARD LINAC - Febrero 2026    │
├─────────────────────────────────────┤
│                                     │
│  📊 Total Inscripciones: 47        │
│  ✅ Pagadas: 42 (89%)              │
│  ⏳ Pendientes: 5 (11%)            │
│                                     │
│  📤 Comprobantes: 40 (95%)         │
│  💬 En WhatsApp: 38 (90%)          │
│                                     │
│  Por Programa:                      │
│  • Speak Easy: 15                   │
│  • Toma las Riendas: 8             │
│  • Oratoria: 12                     │
│  • Bootcamp: 12                     │
│                                     │
│  🕒 Última actualización: Hoy 10:30│
└─────────────────────────────────────┘
```

---

### Alertas Automáticas

**Configurar en n8n:**

```
Si:
- Tasa de error > 5%
- No hay inscripciones en 24h
- Comprobante no procesado en 1h
- Espacio en Drive < 10%

Entonces:
→ Enviar alerta al admin
→ Registrar en log
```

---

## 🧪 Testing y QA

### Checklist de Pruebas

#### Fase 1: Inscripción

- [ ] Formulario completo envía correctamente
- [ ] Email de confirmación llega (verificar spam)
- [ ] Datos se registran en Sheets correctamente
- [ ] Timestamp es correcto
- [ ] RUT se valida correctamente
- [ ] Campos opcionales manejan null
- [ ] Tipo empresa muestra campos adicionales

#### Fase 2: Comprobantes

- [ ] Upload de JPG funciona
- [ ] Upload de PNG funciona
- [ ] Upload de PDF funciona
- [ ] Archivos >5MB son rechazados
- [ ] Archivos .txt son rechazados
- [ ] Preview de imagen se muestra
- [ ] Nombre de archivo es correcto
- [ ] Carpetas se crean automáticamente
- [ ] URL se guarda en Sheets

#### Fase 3: Notificaciones

- [ ] Email al admin llega
- [ ] Formato del email es correcto
- [ ] Links funcionan
- [ ] Notificación de comprobante llega
- [ ] Timing es correcto (<1 min)

#### Fase 4: WhatsApp

- [ ] Invitación se envía
- [ ] Usuario recibe invitación
- [ ] Se marca en Sheets
- [ ] No se envía duplicado
- [ ] Manejo de errores funciona

---

### Datos de Prueba

```json
{
  "fullName": "TEST Juan Pérez",
  "email": "test@ejemplo.com",
  "phone": "+56912345678",
  "rut": "11.111.111-1",
  "registrationType": "individual",
  "howDidYouHear": "testing"
}
```

**Importante:** Usar prefijo "TEST" para identificar datos de prueba

---

## 🆘 Troubleshooting

### Problema: Email no llega

**Posibles causas:**
1. Email en spam
2. Límite de Gmail excedido
3. Credenciales incorrectas
4. Email inválido

**Solución:**
```
- Verificar carpeta spam
- Verificar límite diario (500 emails)
- Regenerar credenciales de app
- Validar email con regex
```

---

### Problema: Comprobante no se sube

**Posibles causas:**
1. Archivo muy grande
2. Permisos de Drive incorrectos
3. Formato no soportado
4. Error de red

**Solución:**
```
- Verificar tamaño <5MB
- Verificar permisos de carpeta
- Verificar extensión del archivo
- Agregar retry logic
```

---

### Problema: Sheets no se actualiza

**Posibles causas:**
1. ID de hoja incorrecto
2. Permisos insuficientes
3. Formato de datos incorrecto
4. Cuota de API excedida

**Solución:**
```
- Verificar Sheet ID
- Verificar cuenta de servicio tiene acceso
- Validar tipos de datos
- Revisar cuota en Google Cloud Console
```

---

### Problema: WhatsApp no agrega

**Posibles causas:**
1. Número bloqueado
2. Grupo lleno
3. API caída
4. Número inválido

**Solución:**
```
- Verificar estado del número
- Verificar límite del grupo (256 personas)
- Reiniciar Evolution API
- Validar formato E.164
```

---

## 📚 Recursos Adicionales

### Documentación Oficial

- **n8n:** https://docs.n8n.io/
- **Google Sheets API:** https://developers.google.com/sheets/api
- **Google Drive API:** https://developers.google.com/drive/api
- **Gmail API:** https://developers.google.com/gmail/api
- **WhatsApp Business API:** https://developers.facebook.com/docs/whatsapp
- **Evolution API:** https://doc.evolution-api.com/

### Tutoriales Recomendados

- n8n + Google Sheets: https://www.youtube.com/watch?v=example1
- Evolution API Setup: https://www.youtube.com/watch?v=example2
- Automatización de emails: https://www.youtube.com/watch?v=example3

### Comunidades

- **n8n Forum:** https://community.n8n.io/
- **n8n Discord:** https://discord.gg/n8n
- **Stack Overflow:** Tag [n8n]

---

## 📝 Notas Finales

### Recomendaciones

1. **Empezar simple:** Implementar emails + Sheets primero
2. **Probar extensivamente:** Usar datos de prueba
3. **Documentar todo:** Credenciales, workflows, procesos
4. **Monitorear constantemente:** Revisar logs diariamente al inicio
5. **Iterar:** Mejorar basado en feedback del equipo

### Próximos Pasos

1. Decidir entre n8n Cloud o Self-hosted
2. Crear cuentas necesarias
3. Comenzar con Sprint 1
4. Asignar responsable del proyecto
5. Definir timeline específico

---

## 📞 Soporte

**Documento creado por:** Equipo Técnico LINAC
**Fecha:** 01 de Febrero 2026
**Versión:** 1.0
**Última actualización:** 01/02/2026

Para dudas o aclaraciones sobre este documento, contactar a:
- 📧 Email: dev@linac.cl
- 💬 Slack: #tech-automation

---

**¡Éxito con la automatización!** 🚀
