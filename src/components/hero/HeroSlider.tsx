import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HeroSlide1 } from "./HeroSlide1"
import { HeroSlide2 } from "./HeroSlide2"
import { HeroSlide3 } from "./HeroSlide3"
import { HeroSlide4 } from "./HeroSlide4"

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30, // Duración de la transición en frames (más suave)
    },
    [
      Autoplay({
        delay: 7000, // 7 segundos por slide
        stopOnInteraction: false, // Continúa después de interacción
        stopOnMouseEnter: true, // Pausa al hacer hover
        stopOnFocusIn: true, // Pausa al enfocar
      }),
    ]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        scrollNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [scrollPrev, scrollNext])

  const slides = [
    { component: <HeroSlide1 />, color: "#316eb5" },
    { component: <HeroSlide2 />, color: "#EC4899" },
    { component: <HeroSlide3 />, color: "#254e8a" },
    { component: <HeroSlide4 />, color: "#233a63" },
  ]

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider principal */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              {slide.component}
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegación - Flechas */}
      <div
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 md:opacity-60"
        }`}
      >
        <button
          onClick={scrollPrev}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
          aria-label="Slide anterior"
        >
          <ChevronLeft
            size={24}
            className="text-[#233a63] group-hover:scale-110 transition-transform"
          />
        </button>
      </div>

      <div
        className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 md:opacity-60"
        }`}
      >
        <button
          onClick={scrollNext}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
          aria-label="Siguiente slide"
        >
          <ChevronRight
            size={24}
            className="text-[#233a63] group-hover:scale-110 transition-transform"
          />
        </button>
      </div>

      {/* Indicadores de puntos (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? "w-8 h-3 opacity-100"
                  : "w-3 h-3 opacity-50 hover:opacity-75"
              }`}
              style={{
                backgroundColor: index === selectedIndex ? slide.color : "#ffffff",
              }}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Indicador de pausa (opcional, se muestra al hacer hover) */}
      {isHovered && (
        <div className="absolute top-8 right-8 z-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium">
          ⏸ Pausado
        </div>
      )}
    </div>
  )
}
