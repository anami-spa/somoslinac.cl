
import { ArrowRight, Sparkles, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"

// Cursos destacados que se mostrarán en el slider
const featuredPrograms = [
  {
    id: "bootcamp-contenido",
    title: "BOOTCAMP de Contenido",
    subtitle: "¡Crea, graba y publica!",
    startDate: "8 de Enero 2025",
    image: "/images/image.png",
    badge: "Inscripciones Abiertas",
    discount: "-20% DCTO",
    hasDiscount: true,
  },
  // Puedes agregar más cursos aquí
  // {
  //   id: "speak-easy-access",
  //   title: "Speak Easy Access!",
  //   subtitle: "Programa de Inglés",
  //   startDate: "15 de Enero 2025",
  //   image: "/professional-training-academy-classroom-with-stude.jpg",
  //   badge: "Cupos Limitados",
  //   hasDiscount: false,
  // },
]

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

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

  return (
    <section
      id="inicio"
      className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-white via-[#f5f9ff] to-white relative overflow-hidden"
    >
      {/* Efectos de fondo simplificados */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#316eb5]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#3CAA36]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda - Contenido LINAC (sin cambios) */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#316eb5]/10 text-[#316eb5] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#316eb5]/20"
            >
              <Sparkles size={16} />
              Organismo de Capacitación - Región del Biobío
            </motion.div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#233a63] leading-tight text-balance">
              Liderazgo e Innovación en Nuevas Áreas de{" "}
              <span className="text-[#316eb5] relative">
                Capacitación
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 8" stroke="#FBEA24" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-[#35669A] leading-relaxed max-w-xl">
              Diseñamos experiencias a medida que fortalecen la salud, el bienestar emocional y mejoran la calidad de
              las relaciones interpersonales.
            </p>

            <div className="mt-6 space-y-2">
              {["Programas personalizados", "Metodología práctica", "Resultados medibles"].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 text-[#35669A]"
                >
                  <CheckCircle size={18} className="text-[#3CAA36]" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => scrollToSection("programas")}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#316eb5] text-white font-semibold rounded-full hover:bg-[#254e8a] transition-all duration-200 shadow-lg shadow-[#316eb5]/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explora Nuestros Programas
                <ArrowRight className="ml-2" size={20} />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("contacto")}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#316eb5] text-[#316eb5] font-semibold rounded-full hover:bg-[#316eb5] hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contáctanos
              </motion.button>
            </div>
          </motion.div>

          {/* Columna Derecha - Slider de Cursos Destacados */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {featuredPrograms.map((program, index) => (
                  <div key={program.id} className="flex-[0_0_100%] min-w-0 relative">
                    <AnimatePresence mode="wait">
                      {selectedIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          {/* Efecto sutil detrás de la imagen */}
                          <div className="absolute -inset-4 bg-gradient-to-br from-[#316eb5]/15 to-[#3CAA36]/10 rounded-3xl blur-2xl" />

                          {/* Contenedor de la imagen */}
                          <motion.div
                            className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer border border-[#316eb5]/10"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => scrollToSection("programas")}
                          >
                            {/* Imagen promocional */}
                            <img
                              src={program.image || "/placeholder.svg"}
                              alt={`${program.title} - ${program.subtitle}`}
                              className="w-full h-auto object-cover"
                            />

                            {/* Overlay con gradiente sutil al hacer hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#233a63]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>

                          {/* Badge flotante - Próximo Curso */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                            className="absolute -top-4 -left-4 z-20"
                          >
                            <div className="bg-[#FBEA24] text-[#233a63] px-5 py-3 rounded-2xl shadow-xl">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#3CAA36] rounded-full animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-wide">Próximo Curso</span>
                              </div>
                              <p className="text-lg font-bold mt-1">{program.startDate}</p>
                            </div>
                          </motion.div>

                          {/* Badge flotante - Inscripciones Abiertas */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                            className="absolute -bottom-4 -right-4 z-20"
                          >
                            <div className="bg-white text-[#233a63] px-5 py-3 rounded-2xl shadow-xl border-2 border-[#316eb5]">
                              <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-[#316eb5]" />
                                <span className="text-sm font-bold">{program.badge}</span>
                              </div>
                              <p className="text-xs text-[#35669A] mt-1">Cupos limitados</p>
                            </div>
                          </motion.div>

                          {/* Badge de descuento (si aplica) */}
                          {program.hasDiscount && (
                            <motion.div
                              initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
                              animate={{ opacity: 1, rotate: -12, scale: 1 }}
                              transition={{ delay: 1, type: "spring", stiffness: 200 }}
                              className="absolute top-4 -right-6 z-20"
                            >
                              <div className="bg-[#3CAA36] text-white px-4 py-2 rounded-full shadow-lg">
                                <span className="text-sm font-bold">{program.discount}</span>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles de navegación del slider (solo si hay más de 1 curso) */}
            {featuredPrograms.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-[#316eb5] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Curso anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-[#316eb5] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Siguiente curso"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicadores de puntos */}
                <div className="flex justify-center gap-2 mt-6">
                  {featuredPrograms.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => emblaApi?.scrollTo(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === selectedIndex ? "w-8 bg-[#316eb5]" : "w-2 bg-[#316eb5]/30"
                      }`}
                      aria-label={`Ir al curso ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
