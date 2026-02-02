import { motion } from "framer-motion"
import { CheckCircle, Sparkles } from "lucide-react"

// Patrón de puntos decorativos
const DotPattern = ({ className = "" }: { className?: string }) => (
  <svg width="80" height="80" className={className}>
    {[...Array(5)].map((_, row) =>
      [...Array(5)].map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={10 + col * 16}
          cy={10 + row * 16}
          r="2"
          fill="currentColor"
          opacity="0.4"
        />
      ))
    )}
  </svg>
)

export function HeroSlide3() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const highlights = [
    {
      icon: "🎯",
      title: "Fonoaudióloga Certificada",
      highlight: "Expertise profesional en técnicas vocales",
    },
    {
      icon: "🌎",
      title: "Experta Bilingüe",
      highlight: "Inglés + Español, comunicación global",
    },
    {
      icon: "👥",
      title: "+500 Profesionales Capacitados",
      highlight: "Resultados comprobados con clientes reales",
    },
  ]

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#316eb5] via-[#254e8a] to-[#233a63]">
      {/* Patrón de puntos - Esquina superior */}
      <div className="absolute top-8 right-8 text-white/20">
        <DotPattern />
      </div>

      {/* Círculo decorativo grande */}
      <div className="absolute bottom-12 left-12 w-32 h-32 rounded-full border-4 border-white/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Lado izquierdo: Foto de Pamela (40%) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 flex flex-col items-center text-white"
            >
              {/* Foto circular con borde decorativo */}
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#FBEA24] to-[#FFEA4A] rounded-full blur-xl opacity-30" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#65A5CD] to-[#35669A] p-2">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {/* Placeholder para foto de Pamela */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-7xl text-white font-bold">PP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info de Pamela */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center space-y-2"
              >
                <h3 className="text-2xl md:text-3xl font-bold">Pamela Pérez Toledo</h3>
                <p className="text-lg opacity-90">Fonoaudióloga</p>
                <p className="text-base opacity-80">Fundadora LINAC</p>
              </motion.div>

              {/* Patrón de puntos decorativos abajo */}
              <div className="mt-6 text-white/20">
                <DotPattern />
              </div>
            </motion.div>

            {/* Lado derecho: Contenido (60%) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3 space-y-8 text-white"
            >
              {/* Badge con icono */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20"
              >
                <Sparkles size={18} className="text-[#FBEA24]" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Transformación Profesional
                </span>
              </motion.div>

              {/* Título principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">⚡</span>
                    <span>TRANSFORMA TU VOZ</span>
                  </span>
                  EN TU MEJOR HERRAMIENTA
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                  Domina la Oratoria, el Inglés y la Comunicación Profesional con metodología
                  práctica y vivencial
                </p>
              </motion.div>

              {/* Highlights con iconos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="space-y-4"
              >
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FBEA24] to-[#FFEA4A] flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle size={18} className="text-[#FBEA24]" />
                        <h4 className="font-bold text-lg">{item.title}</h4>
                      </div>
                      <p className="text-sm opacity-80">{item.highlight}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="px-8 py-4 bg-[#FBEA24] text-[#233a63] font-bold text-lg rounded-full hover:bg-[#FFEA4A] hover:shadow-2xl hover:shadow-[#FBEA24]/30 transition-all duration-300 transform hover:scale-105"
                >
                  AGENDA TU CLASE GRATIS
                </button>
                <button
                  onClick={() => scrollToSection("programas")}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  VER PROGRAMAS
                </button>
              </motion.div>

              {/* Info adicional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex items-center gap-2 text-sm opacity-80"
              >
                <div className="w-2 h-2 bg-[#FBEA24] rounded-full animate-pulse" />
                <span>📍 Concepción, Chile</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
