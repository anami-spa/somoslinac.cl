
import { ArrowRight, Sparkles, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

// Cursos destacados que se mostrarán en el slider
const featuredPrograms = [
  {
    id: "bootcamp-contenido",
    title: "BOOTCAMP de Contenido",
    subtitle: "¡Crea, graba y publica!",
    startDate: "8 de Enero 2025",
    image: `${import.meta.env.BASE_URL}images/image.png`,
    badge: "Inscripciones Abiertas",
    discount: "-20% DCTO",
    hasDiscount: true,
  },
  {
    id: "speak-easy-access",
    title: "Speak Easy Access!",
    subtitle: "Programa de Inglés",
    startDate: "15 de Enero 2025",
    image: `${import.meta.env.BASE_URL}professional-training-academy-classroom-with-stude.jpg`,
    badge: "Cupos Limitados",
    discount: "",
    hasDiscount: false,
  },
  {
    id: "toma-las-riendas",
    title: "¡Toma las Riendas!",
    subtitle: "Coaching con Caballos",
    startDate: "22 de Enero 2025",
    image: `${import.meta.env.BASE_URL}emotional-intelligence-workshop.jpg`,
    badge: "Experiencia Vivencial",
    discount: "",
    hasDiscount: false,
  },
  {
    id: "oratoria-comunicacion",
    title: "Oratoria y Comunicación Asertiva",
    subtitle: "Comunicación Efectiva",
    startDate: "29 de Enero 2025",
    image: `${import.meta.env.BASE_URL}corporate-communication-training.jpg`,
    badge: "Inscripciones Abiertas",
    discount: "-15% DCTO",
    hasDiscount: true,
  },
]

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Referencias para animaciones GSAP
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

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

  // Animaciones GSAP al cargar la página
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Badge de entrada
      tl.from(badgeRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })

      // Título con efecto de palabras separadas
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word")
        tl.from(
          words,
          {
            y: 100,
            opacity: 0,
            rotationX: -90,
            transformOrigin: "top center",
            duration: 1,
            stagger: 0.1,
          },
          "-=0.4"
        )
      }

      // Subtítulo con fade in desde abajo
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      )

      // Features con cascade
      tl.from(
        featuresRef.current?.children || [],
        {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
        },
        "-=0.4"
      )

      // Botones
      tl.from(
        buttonsRef.current?.children || [],
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )

      // Slider desde la derecha
      tl.from(
        sliderRef.current,
        {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      )
    })

    return () => ctx.revert()
  }, [])

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
          {/* Columna Izquierda - Contenido LINAC con GSAP */}
          <div>
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-[#316eb5]/10 text-[#316eb5] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#316eb5]/20"
            >
              <Sparkles size={16} />
              Organismo de Capacitación - Región del Biobío
            </div>

            <h1
              ref={titleRef}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#233a63] leading-tight text-balance"
            >
              <span className="word inline-block">Liderazgo</span>{" "}
              <span className="word inline-block">e</span>{" "}
              <span className="word inline-block">Innovación</span>{" "}
              <span className="word inline-block">en</span>{" "}
              <span className="word inline-block">Nuevas</span>{" "}
              <span className="word inline-block">Áreas</span>{" "}
              <span className="word inline-block">de</span>{" "}
              <span className="text-[#316eb5] relative word inline-block">
                Capacitación
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 8" stroke="#FBEA24" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 text-lg lg:text-xl text-[#35669A] leading-relaxed max-w-xl"
            >
              Diseñamos experiencias a medida que fortalecen la salud, el bienestar emocional y mejoran la calidad de
              las relaciones interpersonales.
            </p>

            <div ref={featuresRef} className="mt-6 space-y-2">
              {["Programas personalizados", "Metodología práctica", "Resultados medibles"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[#35669A]">
                  <CheckCircle size={18} className="text-[#3CAA36]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row gap-4">
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
          </div>

          {/* Columna Derecha - Slider de Cursos Destacados */}
          <div ref={sliderRef} className="relative">
            {/* Contenedor con padding para evitar que los badges se corten */}
            <div className="overflow-hidden px-8 py-8" ref={emblaRef}>
              <div className="flex">
                {featuredPrograms.map((program, index) => (
                  <div key={program.id} className="flex-[0_0_100%] min-w-0 relative px-2">
                    <div className="relative">
                      {/* Efecto sutil detrás de la imagen */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-[#316eb5]/15 to-[#3CAA36]/10 rounded-3xl blur-2xl" />

                      {/* Contenedor de la imagen */}
                      <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer border border-[#316eb5]/10"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => scrollToSection("programas")}
                      >
                        {/* Imagen promocional */}
                        <img
                          src={program.image || `${import.meta.env.BASE_URL}placeholder.svg`}
                          alt={`${program.title} - ${program.subtitle}`}
                          className="w-full h-auto object-cover"
                        />

                        {/* Overlay con gradiente sutil al hacer hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#233a63]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>

                      {/* Badge flotante - Próximo Curso */}
                      <div className="absolute top-2 left-2 z-20">
                        <div className="bg-[#FBEA24] text-[#233a63] px-4 py-2.5 rounded-xl shadow-xl">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-[#3CAA36] rounded-full animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wide">Próximo Curso</span>
                          </div>
                          <p className="text-base font-bold mt-0.5">{program.startDate}</p>
                        </div>
                      </div>

                      {/* Badge flotante - Inscripciones Abiertas */}
                      <div className="absolute bottom-2 right-2 z-20">
                        <div className="bg-white text-[#233a63] px-4 py-2.5 rounded-xl shadow-xl border-2 border-[#316eb5]">
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-[#316eb5]" />
                            <span className="text-sm font-bold">{program.badge}</span>
                          </div>
                          <p className="text-xs text-[#35669A] mt-0.5">Cupos limitados</p>
                        </div>
                      </div>

                      {/* Badge de descuento (si aplica) */}
                      {program.hasDiscount && (
                        <div className="absolute top-2 right-2 z-20">
                          <div className="bg-[#3CAA36] text-white px-4 py-2 rounded-full shadow-lg">
                            <span className="text-sm font-bold">{program.discount}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles de navegación del slider (solo si hay más de 1 curso) */}
            {featuredPrograms.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-[#316eb5] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Curso anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-[#316eb5] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
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
          </div>
        </div>
      </div>
    </section>
  )
}
