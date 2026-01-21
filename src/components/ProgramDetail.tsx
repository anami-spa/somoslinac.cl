
import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  ChevronRight,
  Clock,
  MapPin,
  Users,
  CreditCard,
  Building2,
  User,
  GraduationCap,
  Target,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  Globe,
  Heart,
  Mic,
  ArrowRight,
  FileText,
  Banknote,
  Video,
  Percent,
} from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Validación de RUT chileno
const validateRut = (rut: string) => {
  if (!rut) return false
  const cleanRut = rut.replace(/[.-]/g, "").toUpperCase()
  if (cleanRut.length < 8 || cleanRut.length > 9) return false

  const body = cleanRut.slice(0, -1)
  const dv = cleanRut.slice(-1)

  let sum = 0
  let multiplier = 2

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number.parseInt(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const expectedDv = 11 - (sum % 11)
  const calculatedDv = expectedDv === 11 ? "0" : expectedDv === 10 ? "K" : expectedDv.toString()

  return dv === calculatedDv
}

// Schema de validación con Zod
const registrationSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  rut: z.string().min(8, "RUT inválido"),
  registrationType: z.enum(["individual", "empresa"]),
  companyName: z.string().optional(),
  companyRut: z.string().optional(),
  howDidYouHear: z.string().optional(),
  comments: z.string().optional(),
  acceptTerms: z.boolean(),
  acceptPrivacy: z.boolean(),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

// Datos de los programas
const programsData = {
  "speak-easy-access": {
    id: "speak-easy-access",
    title: "Speak Easy Access!",
    subtitle: "Programa de Inglés",
    duration: "22 horas cronológicas",
    modality: "Presencial",
    level: "Todos los niveles",
    price: "$180.000 CLP",
    icon: Globe,
    gradient: "from-[#316eb5] to-[#254e8a]",
    accentColor: "#316eb5",
    description:
      "El inglés es una herramienta clave para acceder a mejores oportunidades, ampliar redes de contacto y proyectar una imagen segura y profesional. Este programa está diseñado para personas que desean superar sus barreras con el idioma y desarrollar confianza al comunicarse en contextos personales y laborales.",
    objectives: [
      "Desarrollar confianza y seguridad al comunicarse en inglés",
      "Ampliar oportunidades personales y laborales",
      "Eliminar el miedo a hablar inglés en público",
      "Potenciar imagen y proyección personal",
      "Mejorar la pronunciación y fluidez verbal",
      "Adquirir vocabulario práctico para situaciones cotidianas y profesionales",
    ],
    contents: [
      {
        title: "Módulo 1: Fundamentos de la comunicación",
        topics: [
          "Introducción al inglés conversacional",
          "Vocabulario esencial",
          "Pronunciación básica",
          "Ejercicios de escucha activa",
        ],
      },
      {
        title: "Módulo 2: Comunicación en contextos cotidianos",
        topics: ["Presentaciones personales", "Situaciones sociales", "Viajes y turismo", "Compras y servicios"],
      },
      {
        title: "Módulo 3: Inglés profesional",
        topics: ["Vocabulario de negocios", "Reuniones y presentaciones", "Correos electrónicos", "Negociación básica"],
      },
      {
        title: "Módulo 4: Práctica conversacional intensiva",
        topics: ["Role-playing situacional", "Debates guiados", "Presentaciones orales", "Feedback personalizado"],
      },
    ],
    methodology:
      "Metodología comunicativa con enfoque en la práctica oral. Cada sesión combina teoría breve con ejercicios prácticos, role-playing y conversación guiada. Se trabaja en grupos pequeños para maximizar la participación y el feedback personalizado.",
    targetAudience: [
      { icon: User, text: "Profesionales que necesitan mejorar su inglés laboral" },
      { icon: GraduationCap, text: "Estudiantes que buscan perfeccionar su comunicación" },
      { icon: Building2, text: "Ejecutivos y emprendedores" },
      { icon: Users, text: "Personas que desean viajar o emigrar" },
    ],
    practicalInfo: {
      startDate: "15 de Marzo, 2025",
      location: "Cochrane 440, Concepción",
      vacancies: 12,
    },
  },
  "toma-las-riendas": {
    id: "toma-las-riendas",
    title: "¡Toma las Riendas!",
    subtitle: "Coaching con Caballos",
    duration: "16 horas (2 jornadas)",
    modality: "Presencial experiencial",
    level: "Abierto",
    price: "$220.000 CLP",
    icon: Heart,
    gradient: "from-[#3CAA36] to-[#2d8a2a]",
    accentColor: "#3CAA36",
    description:
      "Experiencia vivencial transformadora donde el aprendizaje se encarna, se siente y se reflexiona a través de dinámicas con caballos. Este programa único combina coaching, desarrollo personal y la conexión con estos magníficos animales para lograr cambios profundos y duraderos.",
    objectives: [
      "Fomentar el autocuidado y gestión emocional consciente",
      "Potenciar empoderamiento personal en vida y trabajo",
      "Promover límites sanos y comunicación efectiva",
      "Desarrollar competencias de liderazgo positivo",
      "Conectar con la intuición y la presencia plena",
      "Fortalecer la autoconfianza y la toma de decisiones",
    ],
    contents: [
      {
        title: "Jornada 1: Conexión y autoconocimiento",
        topics: [
          "Introducción al coaching ecuestre",
          "Primer contacto con los caballos",
          "Ejercicios de presencia y respiración",
          "Identificación de patrones emocionales",
        ],
      },
      {
        title: "Jornada 2: Liderazgo y empoderamiento",
        topics: [
          "Dinámicas de liderazgo con caballos",
          "Establecimiento de límites",
          "Comunicación no verbal",
          "Integración de aprendizajes",
        ],
      },
    ],
    methodology:
      "Metodología experiencial basada en el Equine Assisted Learning (EAL). Los caballos actúan como espejos emocionales, reflejando nuestros estados internos y ayudándonos a tomar conciencia de nuestros patrones de comportamiento. No se requiere experiencia previa con caballos.",
    targetAudience: [
      { icon: User, text: "Personas en procesos de cambio personal" },
      { icon: Building2, text: "Líderes y directivos que buscan nuevas perspectivas" },
      { icon: Heart, text: "Profesionales de la salud y educación" },
      { icon: Users, text: "Equipos de trabajo (versión grupal)" },
    ],
    practicalInfo: {
      startDate: "22 de Marzo, 2025",
      location: "Centro Ecuestre (traslado desde Cochrane 440, Concepción)",
      vacancies: 8,
    },
  },
  "oratoria-comunicacion": {
    id: "oratoria-comunicacion",
    title: "Oratoria, Empoderamiento y Comunicación Asertiva",
    subtitle: "Comunicación Efectiva",
    duration: "22 horas cronológicas",
    modality: "Presencial",
    level: "Intermedio",
    price: "$250.000 CLP",
    icon: Mic,
    gradient: "from-[#FBEA24] to-[#e6d520]",
    accentColor: "#FBEA24",
    textDark: true,
    description:
      "Integra técnicas de oratoria, comunicación asertiva y empoderamiento, abordando aspectos expresivos y emocionales del habla. Este programa te preparará para comunicarte con impacto, claridad y autenticidad en cualquier contexto.",
    objectives: [
      "Fortalecer autoconfianza y presencia escénica",
      "Desarrollar autopercepción vocal y control de respiración",
      "Gestionar ansiedad al hablar en público",
      "Promover liderazgo basado en comunicación clara y empática",
      "Dominar técnicas de persuasión y argumentación",
      "Estructurar mensajes de alto impacto",
    ],
    contents: [
      {
        title: "Módulo 1: Fundamentos de la oratoria",
        topics: [
          "La voz como instrumento",
          "Respiración y proyección vocal",
          "Lenguaje corporal",
          "Manejo del espacio escénico",
        ],
      },
      {
        title: "Módulo 2: Comunicación asertiva",
        topics: ["Estilos de comunicación", "Escucha activa", "Expresión de emociones", "Manejo de conflictos"],
      },
      {
        title: "Módulo 3: Estructura del mensaje",
        topics: [
          "Storytelling",
          "Argumentación persuasiva",
          "Uso de recursos visuales",
          "Apertura y cierre impactante",
        ],
      },
      {
        title: "Módulo 4: Práctica y perfeccionamiento",
        topics: ["Presentaciones individuales", "Feedback grupal", "Sesiones 1:1 con coach", "Grabación y análisis"],
      },
    ],
    methodology:
      "Metodología activa-participativa con énfasis en la práctica constante. Incluye sesiones individuales de coaching vocal, grabaciones para autoevaluación y feedback personalizado. El programa culmina con una presentación final ante audiencia.",
    targetAudience: [
      { icon: Building2, text: "Ejecutivos y gerentes" },
      { icon: GraduationCap, text: "Docentes y formadores" },
      { icon: User, text: "Profesionales que realizan presentaciones frecuentes" },
      { icon: Mic, text: "Personas que desean superar el miedo escénico" },
    ],
    practicalInfo: {
      startDate: "1 de Abril, 2025",
      location: "Cochrane 440, Concepción",
      vacancies: 12,
    },
  },
  "bootcamp-contenido": {
    id: "bootcamp-contenido",
    title: "BOOTCAMP de Contenido",
    subtitle: "¡Crea, graba y publica!",
    duration: "3 semanas intensivas",
    modality: "Híbrida (Online + Presencial)",
    level: "Todos los niveles",
    price: "$60.000 CLP",
    originalPrice: "$75.000 CLP",
    discount: "20% dcto hasta 31 Dic 2025",
    icon: Video,
    gradient: "from-[#E91E63] to-[#9C27B0]",
    accentColor: "#E91E63",
    description:
      "Bootcamp intensivo en modalidad híbrida (online-presencial) diseñado especialmente para que aprendas sobre comunicación digital. El objetivo es entregar las herramientas necesarias para crear contenido estratégico para redes sociales. Finalizarás el programa con 1 video grabado de 1 minuto listo para publicar, más la planificación y seguimiento para la confección de 3 videos adicionales (30 segundos c/u).",
    objectives: [
      "Aprender técnicas de comunicación digital efectiva",
      "Crear contenido estratégico para redes sociales",
      "Grabar y editar videos profesionales",
      "Desarrollar tu marca personal digital",
      "Planificar contenido de forma sostenible",
      "Finalizar con 1 video de 1 minuto listo para publicar",
    ],
    contents: [
      {
        title: "Clase 1: Fundamentos de contenido digital (Online)",
        topics: [
          "Introducción a la comunicación digital",
          "Estrategia de contenido para redes sociales",
          "Identificación de tu audiencia objetivo",
          "Planificación de contenido",
        ],
        date: "Jueves 8 de Enero | 19:00 - 21:00 hrs",
      },
      {
        title: "Clase 2: Creación de guiones y storytelling (Online)",
        topics: [
          "Estructura de videos efectivos",
          "Técnicas de storytelling",
          "Escritura de guiones para redes",
          "Tips para captar atención",
        ],
        date: "Jueves 15 de Enero | 19:00 - 21:00 hrs",
      },
      {
        title: "Clase 3: Producción y edición básica (Online)",
        topics: [
          "Herramientas de grabación con celular",
          "Iluminación y audio básico",
          "Apps de edición recomendadas",
          "Preparación para la jornada presencial",
        ],
        date: "Jueves 22 de Enero | 19:00 - 21:00 hrs",
      },
      {
        title: "Clase 4: Experiencia técnica y grabación consciente (Presencial)",
        topics: [
          "Uso de sala de contenido profesional",
          "Grabación guiada de tu video final",
          "Feedback en tiempo real",
          "Planificación de próximos 3 videos",
        ],
        date: "Sábado 24 de Enero | 9:00 - 13:00 hrs",
      },
    ],
    methodology:
      "Metodología práctica con enfoque en el aprendizaje activo. 3 sesiones online de 2 horas cada una, más 1 jornada presencial de 4 horas con acceso a sala de contenido profesional. Cada sesión combina teoría aplicada con ejercicios prácticos para que termines el bootcamp con contenido real publicable.",
    targetAudience: [
      { icon: User, text: "Emprendedores que quieren potenciar su marca personal" },
      { icon: GraduationCap, text: "Profesionales que buscan presencia digital" },
      { icon: Building2, text: "Community managers y marketeros" },
      { icon: Users, text: "Cualquier persona que quiera crear contenido" },
    ],
    practicalInfo: {
      startDate: "8 de Enero, 2025",
      location: "Cochrane 440, Concepción (jornada presencial)",
      vacancies: 15,
    },
    paymentInfo: {
      bank: "Banco Santander",
      accountType: "Cuenta corriente",
      rut: "77.631.728-4",
      name: "LINAC Capacitaciones SPA",
      accountNumber: "89017866",
      email: "linaccapacitaciones@gmail.com",
      note: 'El mensaje de la transferencia debe indicar "BOOTCAMP de CONTENIDO"',
    },
  },
}

interface ProgramDetailProps {
  programId: string
  onBack?: () => void
}

export function ProgramDetail({ programId, onBack }: ProgramDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [registrationStep, setRegistrationStep] = useState(1)

  const program = programsData[programId as keyof typeof programsData]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      rut: "",
      registrationType: "individual",
      companyName: "",
      companyRut: "",
      howDidYouHear: "",
      comments: "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  })

  const registrationType = watch("registrationType")
  const acceptTerms = watch("acceptTerms")
  const acceptPrivacy = watch("acceptPrivacy")

  const onSubmit = (data: RegistrationFormData) => {
    if (!data.acceptTerms || !data.acceptPrivacy) {
      alert("Debes aceptar los términos y la política de privacidad")
      return
    }
    console.log("Formulario enviado:", data)
    setRegistrationStep(2)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(onSubmit, (errors) => {
      console.log("Errores de validación:", errors)
    })(e)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setRegistrationStep(1)
    reset()
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#233a63]">Programa no encontrado</p>
      </div>
    )
  }

  const Icon = program.icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f9ff]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={onBack} className="text-[#316eb5] hover:text-[#254e8a] transition-colors">
              Inicio
            </button>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-[#35669A]">Programas</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-[#233a63] font-medium">{program.title}</span>
          </nav>
        </div>
      </div>

      {/* Header del programa */}
      <section className={`bg-gradient-to-r ${program.gradient} py-16 lg:py-24`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            <div className="flex-1">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${program.textDark ? "bg-[#233a63]/20" : "bg-white/20"} mb-6`}
              >
                <Icon size={32} className={program.textDark ? "text-[#233a63]" : "text-white"} />
              </div>
              <span
                className={`text-sm font-medium ${program.textDark ? "text-[#233a63]/70" : "text-white/80"} uppercase tracking-wider`}
              >
                {program.subtitle}
              </span>
              <h1
                className={`text-3xl lg:text-5xl font-bold ${program.textDark ? "text-[#233a63]" : "text-white"} mt-2 mb-6`}
              >
                {program.title}
              </h1>

              {/* Etiquetas */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${program.textDark ? "bg-[#233a63]/10 text-[#233a63]" : "bg-white/20 text-white"}`}
                >
                  <Clock size={16} />
                  {program.duration}
                </span>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${program.textDark ? "bg-[#233a63]/10 text-[#233a63]" : "bg-white/20 text-white"}`}
                >
                  <MapPin size={16} />
                  {program.modality}
                </span>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${program.textDark ? "bg-[#233a63]/10 text-[#233a63]" : "bg-white/20 text-white"}`}
                >
                  <GraduationCap size={16} />
                  {program.level}
                </span>
              </div>

              {/* Precio */}
              <div className={`text-3xl lg:text-4xl font-bold ${program.textDark ? "text-[#233a63]" : "text-white"}`}>
                {program.price}
              </div>
              {program.originalPrice && (
                <div className="text-lg font-semibold text-gray-500 flex items-center gap-1">
                  <Percent size={16} />
                  {program.discount}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="lg:text-right">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 ${
                  program.textDark
                    ? "bg-[#233a63] text-white hover:bg-[#1a2d4d]"
                    : "bg-white text-[#233a63] hover:bg-gray-100"
                }`}
              >
                Inscríbete Ahora
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-12">
            {/* Descripción */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-[#233a63] mb-4 flex items-center gap-3">
                <BookOpen className="text-[#316eb5]" size={24} />
                Descripción
              </h2>
              <p className="text-[#35669A] leading-relaxed text-lg">{program.description}</p>
            </motion.section>

            {/* Objetivos */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-[#233a63] mb-6 flex items-center gap-3">
                <Target className="text-[#316eb5]" size={24} />
                Objetivos del Programa
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.objectives.map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${program.accentColor}20` }}
                    >
                      <CheckCircle2 size={18} style={{ color: program.accentColor }} />
                    </div>
                    <span className="text-[#233a63]">{objective}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Contenidos/Temario */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-[#233a63] mb-6 flex items-center gap-3">
                <FileText className="text-[#316eb5]" size={24} />
                Contenidos del Programa
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {program.contents.map((module, index) => (
                  <AccordionItem
                    key={index}
                    value={`module-${index}`}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                      <span className="text-[#233a63] font-semibold text-left">{module.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-2 text-[#35669A]">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: program.accentColor }} />
                            {topic}
                          </li>
                        ))}
                      </ul>
                      {module.date && <p className="text-sm text-gray-500 mt-4">{module.date}</p>}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.section>

            {/* Metodología */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-[#233a63] mb-4 flex items-center gap-3">
                <Lightbulb className="text-[#316eb5]" size={24} />
                Metodología
              </h2>
              <div className="bg-gradient-to-r from-[#f5f9ff] to-white p-6 rounded-xl border border-[#316eb5]/10">
                <p className="text-[#35669A] leading-relaxed">{program.methodology}</p>
              </div>
            </motion.section>

            {/* Dirigido a */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[#233a63] mb-6 flex items-center gap-3">
                <Users className="text-[#316eb5]" size={24} />
                Dirigido a
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.targetAudience.map((audience, index) => {
                  const AudienceIcon = audience.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#316eb5]/10 flex items-center justify-center"
                        style={{ backgroundColor: `${program.accentColor}15` }}
                      >
                        <AudienceIcon size={24} style={{ color: program.accentColor }} />
                      </div>
                      <span className="text-[#233a63]">{audience.text}</span>
                    </div>
                  )
                })}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información práctica */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#233a63] mb-6">Información Práctica</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#316eb5]/10 flex items-center justify-center">
                    <Clock size={20} className="text-[#316eb5]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#65A5CD]">Fecha de inicio</p>
                    <p className="font-semibold text-[#233a63]">{program.practicalInfo.startDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#316eb5]/10 flex items-center justify-center">
                    <MapPin size={20} className="text-[#316eb5]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#65A5CD]">Lugar</p>
                    <p className="font-semibold text-[#233a63]">{program.practicalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#316eb5]/10 flex items-center justify-center">
                    <Users size={20} className="text-[#316eb5]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#65A5CD]">Vacantes disponibles</p>
                    <p className="font-semibold text-[#233a63]">{program.practicalInfo.vacancies} personas</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <p className="text-sm text-[#65A5CD] mb-2">Inversión</p>
                <p className="text-3xl font-bold text-[#233a63]">{program.price}</p>
                {program.originalPrice && (
                  <div className="text-lg font-semibold text-gray-500 flex items-center gap-1">
                    <span className="line-through text-gray-400">{program.originalPrice}</span>
                    <Percent size={16} />
                    {program.discount}
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 px-6 bg-[#316eb5] text-white font-bold rounded-xl hover:bg-[#254e8a] transition-colors shadow-lg"
              >
                Inscríbete Ahora
              </motion.button>

              {/* Formas de pago */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-[#233a63] mb-4 text-sm flex items-center gap-2">
                  <CreditCard size={16} className="text-[#316eb5]" />
                  Formas de Pago
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {["WebPay", "PayPal", "Transferencia", "Orden de Compra"].map((method) => (
                    <div key={method} className="text-xs text-center py-2 px-3 bg-gray-50 rounded-lg text-[#35669A]">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal de Registro - Rediseño completo del modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-lg bg-white border-0 shadow-2xl p-0 gap-0 overflow-hidden">
          {/* Header del modal con gradiente */}
          <div className={`bg-gradient-to-r ${program.gradient} px-6 py-5`}>
            <h2 className={`text-xl font-bold ${program.textDark ? "text-[#233a63]" : "text-white"}`}>
              Inscripción al Programa
            </h2>
            <p className={`text-sm ${program.textDark ? "text-[#233a63]/80" : "text-white/80"} mt-1`}>
              {program.title} - {program.price}
            </p>
          </div>

          {registrationStep === 1 ? (
            <form onSubmit={handleFormSubmit} className="p-6 space-y-5 max-h-[60vh] overflow-y-auto bg-white">
              {/* Datos personales */}
              <div className="space-y-4">
                <h3 className="font-semibold text-[#233a63] text-sm uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-gray-100">
                  <User size={16} className="text-[#316eb5]" />
                  Datos Personales
                </h3>

                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-medium text-gray-700">
                    Nombre completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Juan Pérez González"
                    className={`h-10 bg-gray-50 border-gray-200 focus:bg-white ${errors.fullName ? "border-red-500 bg-red-50" : ""}`}
                    {...register("fullName")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      className={`h-10 bg-gray-50 border-gray-200 focus:bg-white ${errors.email ? "border-red-500 bg-red-50" : ""}`}
                      {...register("email")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium text-gray-700">
                      Teléfono <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="912345678"
                      className={`h-10 bg-gray-50 border-gray-200 focus:bg-white ${errors.phone ? "border-red-500 bg-red-50" : ""}`}
                      {...register("phone")}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rut" className="text-xs font-medium text-gray-700">
                    RUT <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="rut"
                    placeholder="12.345.678-9"
                    className={`h-10 bg-gray-50 border-gray-200 focus:bg-white ${errors.rut ? "border-red-500 bg-red-50" : ""}`}
                    {...register("rut")}
                  />
                </div>
              </div>

              {/* Tipo de inscripción */}
              <div className="space-y-3">
                <h3 className="font-semibold text-[#233a63] text-sm uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-gray-100">
                  <Building2 size={16} className="text-[#316eb5]" />
                  Tipo de Inscripción
                </h3>

                <RadioGroup
                  defaultValue="individual"
                  onValueChange={(value) => setValue("registrationType", value as "individual" | "empresa")}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" className="border-[#316eb5] text-[#316eb5]" />
                    <Label htmlFor="individual" className="text-sm cursor-pointer text-gray-700">
                      Individual
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="empresa" id="empresa" className="border-[#316eb5] text-[#316eb5]" />
                    <Label htmlFor="empresa" className="text-sm cursor-pointer text-gray-700">
                      Empresa
                    </Label>
                  </div>
                </RadioGroup>

                {registrationType === "empresa" && (
                  <div className="grid grid-cols-2 gap-4 pt-2 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <Label htmlFor="companyName" className="text-xs font-medium text-gray-700">
                        Nombre empresa
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Empresa S.A."
                        className="h-10 bg-gray-50 border-gray-200 focus:bg-white"
                        {...register("companyName")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="companyRut" className="text-xs font-medium text-gray-700">
                        RUT empresa
                      </Label>
                      <Input
                        id="companyRut"
                        placeholder="76.543.210-K"
                        className="h-10 bg-gray-50 border-gray-200 focus:bg-white"
                        {...register("companyRut")}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Información adicional */}
              <div className="space-y-3">
                <h3 className="font-semibold text-[#233a63] text-sm uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-gray-100">
                  <FileText size={16} className="text-[#316eb5]" />
                  Información Adicional
                </h3>

                <div className="space-y-1.5">
                  <Label htmlFor="howDidYouHear" className="text-xs font-medium text-gray-700">
                    ¿Cómo nos conociste?
                  </Label>
                  <Select onValueChange={(value) => setValue("howDidYouHear", value)}>
                    <SelectTrigger className="h-10 bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="redes">Redes sociales</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="recomendacion">Recomendación</SelectItem>
                      <SelectItem value="publicidad">Publicidad</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="comments" className="text-xs font-medium text-gray-700">
                    Comentarios (opcional)
                  </Label>
                  <textarea
                    id="comments"
                    placeholder="¿Tienes alguna pregunta?"
                    className="w-full h-16 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#316eb5] focus:border-transparent"
                    {...register("comments")}
                  />
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptTerms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setValue("acceptTerms", checked === true)}
                    className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#316eb5] data-[state=checked]:border-[#316eb5]"
                  />
                  <Label htmlFor="acceptTerms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                    Acepto los{" "}
                    <a href="#" className="text-[#316eb5] hover:underline font-medium">
                      términos y condiciones
                    </a>{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptPrivacy"
                    checked={acceptPrivacy}
                    onCheckedChange={(checked) => setValue("acceptPrivacy", checked === true)}
                    className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#316eb5] data-[state=checked]:border-[#316eb5]"
                  />
                  <Label htmlFor="acceptPrivacy" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                    Acepto la{" "}
                    <a href="#" className="text-[#316eb5] hover:underline font-medium">
                      política de privacidad
                    </a>{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>

              {/* Botón de envío */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!acceptTerms || !acceptPrivacy}
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#316eb5] to-[#254e8a] text-white font-semibold rounded-lg 
                             hover:from-[#254e8a] hover:to-[#1a3a5c] transition-all duration-300 shadow-md
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  Continuar al Pago
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          ) : (
            /* Paso 2: Confirmación y pago */
            <div className="p-6 space-y-5 bg-white">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-green-800">¡Registro completado!</h4>
                    <p className="text-sm text-green-700">Tus datos han sido guardados correctamente.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h4 className="font-semibold text-[#233a63] mb-3 text-sm">Resumen de tu inscripción</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Programa:</span>
                    <span className="font-medium text-[#233a63]">{program.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor:</span>
                    <span className="font-bold text-[#316eb5]">{program.price}</span>
                  </div>
                </div>
              </div>

              {program.paymentInfo && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h4 className="font-semibold text-[#233a63] mb-3 text-sm">Información de Pago</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Banco:</span>
                      <span className="font-medium text-[#233a63]">{program.paymentInfo.bank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo de cuenta:</span>
                      <span className="font-medium text-[#233a63]">{program.paymentInfo.accountType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RUT:</span>
                      <span className="font-medium text-[#233a63]">{program.paymentInfo.rut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre de la cuenta:</span>
                      <span className="font-medium text-[#233a63]">{program.paymentInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Número de cuenta:</span>
                      <span className="font-medium text-[#233a63]">{program.paymentInfo.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-[#233a63]">{program.paymentInfo.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nota:</span>
                      <span className="font-medium text-[#233a63]">{program.paymentInfo.note}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-semibold text-[#233a63] flex items-center gap-2 text-sm">
                  <CreditCard size={18} className="text-[#316eb5]" />
                  Selecciona tu método de pago
                </h4>

                <div className="grid gap-2">
                  {[
                    { name: "WebPay", desc: "Tarjeta de crédito o débito", color: "#00A6E0", icon: CreditCard },
                    { name: "PayPal", desc: "Pago internacional seguro", color: "#003087", icon: null },
                    { name: "Transferencia", desc: "Transferencia bancaria directa", color: "#233a63", icon: Banknote },
                  ].map((method) => (
                    <button
                      key={method.name}
                      type="button"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg hover:border-[#316eb5] hover:bg-gray-50 transition-all 
                                 flex items-center gap-3 text-left group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: method.color }}
                      >
                        {method.icon ? (
                          <method.icon className="text-white" size={20} />
                        ) : (
                          <span className="text-white font-bold text-xs">PP</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#233a63] group-hover:text-[#316eb5] text-sm">{method.name}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRegistrationStep(1)}
                className="w-full py-2 text-[#316eb5] hover:underline text-sm font-medium"
              >
                ← Volver a editar datos
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
