import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSlide1() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-b from-[#f5f9ff] via-white to-[#f5f9ff] overflow-hidden py-20">
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
                  Cursos de Oratoria, Inglés y Liderazgo con metodología práctica y vivencial
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
                  Ver Cursos
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

            {/* Imagen de prueba con diseño decorativo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative">
                {/* Efecto de fondo */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#316eb5]/20 to-[#65A5CD]/20 rounded-3xl blur-2xl" />

                {/* Banner del Curso de Oratoria */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg mx-auto">
                  <img
                    src="/curso_oratoria_banner_1770152734474.png"
                    alt="Curso de Oratoria - Potencia tu Comunicación Profesional"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
