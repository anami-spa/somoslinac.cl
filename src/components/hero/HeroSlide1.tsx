import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { useNavigate } from "react-router-dom"

// Cursos destacados mini-slider
const featuredPrograms = [
  {
    id: "bootcamp-contenido",
    title: "BOOTCAMP de Contenido",
    image: `${import.meta.env.BASE_URL}images/image.png`,
    badge: "20% DCTO",
  },
  {
    id: "speak-easy-access",
    title: "Speak Easy Access!",
    image: `${import.meta.env.BASE_URL}professional-training-academy-classroom-with-stude.jpg`,
    badge: "Cupos Limitados",
  },
  {
    id: "toma-las-riendas",
    title: "¡Toma las Riendas!",
    image: `${import.meta.env.BASE_URL}emotional-intelligence-workshop.jpg`,
    badge: "Experiencial",
  },
  {
    id: "oratoria-comunicacion",
    title: "Oratoria",
    image: `${import.meta.env.BASE_URL}corporate-communication-training.jpg`,
    badge: "Inscripciones",
  },
]

export function HeroSlide1() {
  const navigate = useNavigate()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[#f5f9ff] via-white to-[#f5f9ff] overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#316eb5] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FBEA24] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#316eb5]/10 to-[#65A5CD]/10 px-5 py-2.5 rounded-full border border-[#316eb5]/20"
              >
                <div className="w-2 h-2 bg-[#316eb5] rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-[#316eb5] uppercase tracking-wide">
                  Capacitaciones Profesionales
                </span>
              </motion.div>

              {/* Título */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#233a63] leading-tight"
                >
                  Potencia tu{" "}
                  <span className="bg-gradient-to-r from-[#316eb5] to-[#65A5CD] bg-clip-text text-transparent">
                    Comunicación
                  </span>
                  <br />
                  Profesional
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-[#35669A] max-w-xl"
                >
                  Programas de Oratoria, Inglés y Liderazgo con metodología práctica y vivencial
                </motion.p>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-3"
              >
                {[
                  "Fonoaudióloga Certificada",
                  "Metodología Práctica y Vivencial",
                  "Presencial en Concepción",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#316eb5] to-[#65A5CD] flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <span className="text-[#233a63] font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => scrollToSection("programas")}
                  className="group px-8 py-4 bg-gradient-to-r from-[#316eb5] to-[#254e8a] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#316eb5]/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Ver Programas
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="px-8 py-4 bg-[#FBEA24] text-[#233a63] font-bold rounded-full hover:bg-[#FFEA4A] hover:shadow-xl hover:shadow-[#FBEA24]/30 transition-all duration-300"
                >
                  Agendar Clase Gratis
                </button>
              </motion.div>
            </motion.div>

            {/* Mini slider de programas */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative">
                {/* Slider */}
                <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
                  <div className="flex">
                    {featuredPrograms.map((program) => (
                      <div key={program.id} className="flex-[0_0_100%] px-2">
                        <div
                          onClick={() => navigate(`/programas/${program.id}`)}
                          className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
                        >
                          <img
                            src={program.image}
                            alt={program.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#233a63]/90 via-[#233a63]/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="inline-block px-3 py-1 bg-[#FBEA24] text-[#233a63] text-xs font-bold rounded-full mb-3">
                              {program.badge}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                            <div className="flex items-center gap-2 text-sm opacity-90">
                              <ArrowRight size={16} />
                              Ver detalles
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controles */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
                >
                  <ChevronLeft size={20} className="text-[#233a63]" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
                >
                  <ChevronRight size={20} className="text-[#233a63]" />
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {featuredPrograms.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => emblaApi?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === selectedIndex ? "bg-[#316eb5] w-8" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
