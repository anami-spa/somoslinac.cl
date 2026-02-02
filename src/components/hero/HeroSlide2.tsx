import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, CheckCircle, Mic } from "lucide-react"

// Patrón de puntos decorativos
const DotPattern = ({ className = "" }: { className?: string }) => (
  <svg width="100" height="100" className={className}>
    {[...Array(7)].map((_, row) =>
      [...Array(7)].map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={10 + col * 14}
          cy={10 + row * 14}
          r="2"
          fill="currentColor"
          opacity="0.5"
        />
      ))
    )}
  </svg>
)

// Formas onduladas SVG
const WaveShape = () => (
  <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
    <path
      fill="#ffffff"
      fillOpacity="0.3"
      d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,181.3C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    />
  </svg>
)

export function HeroSlide2() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] py-20">
      {/* Patrón de puntos - Esquina superior izquierda */}
      <div className="absolute top-8 left-8 text-white/40">
        <DotPattern />
      </div>

      {/* Patrón de puntos - Esquina superior derecha */}
      <div className="absolute top-8 right-8 text-white/40">
        <DotPattern />
      </div>

      {/* Círculo decorativo */}
      <div className="absolute top-12 right-32 w-24 h-24 rounded-full border-4 border-white/30" />

      {/* Formas onduladas */}
      <WaveShape />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wider">LINAC</h2>
          </motion.div>

          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mic size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              HABLA CON SEGURIDAD,
              <br />
              CLARIDAD E IMPACTO
            </h1>
          </motion.div>

          {/* Grid: Foto + Info */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Foto circular */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#65A5CD] to-[#35669A] p-2">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {/* Placeholder para foto de Pamela */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-6xl text-white font-bold">PP</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-left space-y-4"
            >
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Pamela Pérez Toledo</h3>
                <p className="text-lg opacity-90 mb-1">Fonoaudióloga | Bilingüe</p>
                <p className="text-base opacity-80">Fundadora LINAC</p>
              </div>

              <div className="space-y-3 mt-6">
                {[
                  "Oratoria y uso de la voz para defender ideas",
                  "Inglés conversacional para profesionales",
                  "Actitud ganadora y comunicación asertiva",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1">
                      <CheckCircle size={20} className="text-[#F9A8D4]" />
                    </div>
                    <span className="text-white text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-12"
          >
            <button
              onClick={() => scrollToSection("contacto")}
              className="px-12 py-5 bg-[#F9A8D4] text-[#8B5CF6] font-bold text-lg rounded-full hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              INSCRÍBETE GRATIS
            </button>
          </motion.div>

          {/* Info del evento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white"
          >
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Calendar size={18} />
              <span className="text-sm font-medium">Próxima Charla: 15 de Febrero</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock size={18} />
              <span className="text-sm font-medium">17:00 a 19:00 hrs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin size={18} />
              <span className="text-sm font-medium">Cochrane 440, Concepción</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
