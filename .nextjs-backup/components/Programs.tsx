"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Globe, Heart, Mic, Clock, Sparkles, ArrowRight, Check, Video } from "lucide-react"

export const programs = [
  {
    id: "speak-easy-access",
    title: "Speak Easy Access!",
    subtitle: "Programa de Inglés",
    description:
      "El inglés es una herramienta clave para acceder a mejores oportunidades, ampliar redes de contacto y proyectar una imagen segura y profesional.",
    objectives: [
      "Desarrollar confianza y seguridad al comunicarse en inglés",
      "Ampliar oportunidades personales y laborales",
      "Eliminar el miedo a hablar inglés en público",
      "Potenciar imagen y proyección personal",
    ],
    duration: "22 horas cronológicas",
    badge: "Incluye práctica conversacional",
    icon: Globe,
    gradient: "from-[#316eb5] to-[#254e8a]",
    accentColor: "#316eb5",
    image: "/professional-training-academy-classroom-with-stude.jpg",
  },
  {
    id: "toma-las-riendas",
    title: "¡Toma las Riendas!",
    subtitle: "Coaching con Caballos",
    description:
      "Experiencia vivencial transformadora donde el aprendizaje se encarna, se siente y se reflexiona a través de dinámicas con caballos.",
    objectives: [
      "Fomentar el autocuidado y gestión emocional consciente",
      "Potenciar empoderamiento personal en vida y trabajo",
      "Promover límites sanos y comunicación efectiva",
      "Desarrollar competencias de liderazgo positivo",
    ],
    duration: "Modalidad experiencial",
    badge: "Actividades prácticas con caballos",
    icon: Heart,
    gradient: "from-[#3CAA36] to-[#2d8a2a]",
    accentColor: "#3CAA36",
    image: "/emotional-intelligence-workshop.jpg",
  },
  {
    id: "oratoria-comunicacion",
    title: "Oratoria, Empoderamiento y Comunicación Asertiva",
    subtitle: "Comunicación Efectiva",
    description:
      "Integra técnicas de oratoria, comunicación asertiva y empoderamiento, abordando aspectos expresivos y emocionales del habla.",
    objectives: [
      "Fortalecer autoconfianza y presencia escénica",
      "Desarrollar autopercepción vocal y control de respiración",
      "Gestionar ansiedad al hablar en público",
      "Promover liderazgo basado en comunicación clara y empática",
    ],
    duration: "22 horas cronológicas",
    badge: "Incluye sesiones 1:1",
    price: "$250.000 CLP",
    icon: Mic,
    gradient: "from-[#FBEA24] to-[#e6d520]",
    accentColor: "#FBEA24",
    textDark: true,
    image: "/corporate-communication-training.jpg",
  },
  {
    id: "bootcamp-contenido",
    title: "BOOTCAMP de Contenido",
    subtitle: "¡Crea, graba y publica!",
    description:
      "Bootcamp intensivo híbrido para aprender comunicación digital y crear contenido estratégico para redes sociales. Finaliza con videos listos para publicar.",
    objectives: [
      "Crear contenido estratégico para redes sociales",
      "Grabar y editar videos profesionales",
      "Desarrollar tu marca personal digital",
      "Planificar contenido de forma efectiva",
    ],
    duration: "3 semanas intensivas",
    badge: "20% dcto hasta 31 Dic",
    price: "$60.000 CLP",
    originalPrice: "$75.000 CLP",
    icon: Video,
    gradient: "from-[#E91E63] to-[#9C27B0]",
    accentColor: "#E91E63",
    image: "/professional-team-development-workshop-diverse-peo.jpg",
  },
]

interface ProgramsProps {
  onProgramSelect?: (programId: string) => void
}

export function Programs({ onProgramSelect }: ProgramsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="programas" className="py-24 bg-gradient-to-b from-[#f5f9ff] to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#316eb5] font-semibold text-sm uppercase tracking-wider bg-[#316eb5]/10 px-4 py-2 rounded-full">
            <Sparkles size={16} />
            Nuestros Programas Destacados
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#233a63] mt-6 mb-4">Transforma tu potencial</h2>
          <p className="text-lg text-[#35669A] max-w-2xl mx-auto">
            Programas diseñados para impulsar tu desarrollo personal y profesional con metodologías innovadoras.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon
            const isHovered = hoveredCard === program.id

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                <motion.div
                  animate={{ y: isHovered ? -8 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#316eb5]/15 transition-all duration-500 border border-gray-100"
                >
                  {/* Header con imagen de fondo y gradiente overlay */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Imagen de fondo */}
                    <img
                      src={program.image}
                      alt={program.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay con gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${program.gradient} opacity-90`} />

                    {/* Efectos decorativos */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                    {/* Contenido */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${program.textDark ? "bg-[#233a63]/20" : "bg-white/20"} mb-4 backdrop-blur-sm`}
                      >
                        <Icon size={28} className={program.textDark ? "text-[#233a63]" : "text-white"} />
                      </div>
                      <span
                        className={`text-xs font-medium ${program.textDark ? "text-[#233a63]/70" : "text-white/90"} uppercase tracking-wider`}
                      >
                        {program.subtitle}
                      </span>
                      <h3
                        className={`text-xl font-bold ${program.textDark ? "text-[#233a63]" : "text-white"} mt-1 leading-tight`}
                      >
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    {/* Badge */}
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
                      style={{ backgroundColor: `${program.accentColor}15`, color: program.accentColor }}
                    >
                      <Sparkles size={12} />
                      {program.badge}
                    </span>

                    <p className="text-[#35669A] text-sm leading-relaxed mb-5">{program.description}</p>

                    {/* Objetivos */}
                    <div className="space-y-2 mb-5">
                      {program.objectives.slice(0, 3).map((objective, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                            style={{ backgroundColor: `${program.accentColor}15` }}
                          >
                            <Check size={12} style={{ color: program.accentColor }} />
                          </div>
                          <span className="text-sm text-[#233a63]/80">{objective}</span>
                        </div>
                      ))}
                    </div>

                    {/* Duración y precio */}
                    <div className="flex items-center gap-4 text-sm text-[#65A5CD] mb-5 pb-5 border-b border-gray-100">
                      <span className="flex items-center gap-1.5">
                        <Clock size={16} className="text-[#316eb5]" />
                        {program.duration}
                      </span>
                      {program.price && (
                        <span className="font-semibold text-[#233a63]">
                          {program.originalPrice && (
                            <span className="text-sm line-through mr-2">{program.originalPrice}</span>
                          )}
                          {program.price}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onProgramSelect?.(program.id)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: isHovered ? program.accentColor : "transparent",
                        color: isHovered ? (program.textDark ? "#233a63" : "white") : program.accentColor,
                        border: `2px solid ${program.accentColor}`,
                      }}
                    >
                      Ver Detalles
                      <ArrowRight
                        size={18}
                        className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-[#35669A] mb-6">¿Necesitas más información sobre nuestros programas?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#316eb5] text-white font-semibold rounded-full hover:bg-[#254e8a] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Solicitar Información
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#FBEA24] text-[#233a63] font-semibold rounded-full hover:bg-[#e6d520] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Programa Personalizado
              <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
