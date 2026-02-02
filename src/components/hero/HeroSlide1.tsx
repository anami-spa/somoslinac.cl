import { ArrowRight, CheckCircle, Sparkles, BookOpen, Users } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSlide1() {
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

                {/* Imagen principal o placeholder */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#316eb5] to-[#254e8a] h-[500px] flex items-center justify-center">
                  {/* Patrón de fondo decorativo */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Contenido del placeholder */}
                  <div className="relative z-10 text-center text-white p-8">
                    {/* Iconos decorativos */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="flex items-center justify-center gap-6 mb-8"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <BookOpen size={40} className="text-[#FBEA24]" />
                      </div>
                      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Sparkles size={48} className="text-white" />
                      </div>
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <Users size={40} className="text-[#FBEA24]" />
                      </div>
                    </motion.div>

                    {/* Texto */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <h3 className="text-3xl font-bold mb-4">LINAC</h3>
                      <p className="text-lg opacity-90 max-w-md mx-auto">
                        Liderazgo e Innovación en Nuevas Áreas de Capacitación
                      </p>
                      <div className="mt-6 inline-block px-6 py-2 bg-[#FBEA24] text-[#233a63] rounded-full font-bold text-sm">
                        Imagen de prueba
                      </div>
                    </motion.div>

                    {/* Elementos decorativos flotantes */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-8 right-8 w-16 h-16 rounded-full bg-[#FBEA24]/30 blur-xl"
                    />
                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-white/20 blur-xl"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
