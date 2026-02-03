
import { Facebook, Instagram, Linkedin, ArrowUp, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export function Footer() {
  const navigate = useNavigate()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    // Si no estamos en home, navegar primero
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const quickLinks = [
    { label: "Inicio", action: () => navigate('/') },
    { label: "Nuestros Cursos", action: () => scrollToSection("programas") },
    { label: "Quiénes Somos", action: () => scrollToSection("nosotros") },
    { label: "Metodología", action: () => scrollToSection("metodologia") },
  ]

  const courses = [
    { name: "Speak Easy Access!", id: "speak-easy-access" },
    { name: "¡Toma las Riendas!", id: "toma-las-riendas" },
    { name: "Oratoria y Comunicación", id: "oratoria-comunicacion" },
    { name: "BOOTCAMP de Contenido", id: "bootcamp-contenido" },
  ]

  return (
    <footer className="relative bg-[#233a63] text-white overflow-hidden">
      {/* Patrón de ondas sonoras de fondo - Efecto Voice Waves */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="voice-waves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <g className="animate-pulse">
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#voice-waves)" />
        </svg>
      </div>

      {/* Gradiente overlay para profundidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#233a63] via-[#254e8a]/90 to-[#316eb5]/80" />

      {/* Blur circles para efecto glassmorphism */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#316eb5] rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FBEA24] rounded-full blur-3xl opacity-5 translate-x-1/2 translate-y-1/2" />

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* CTA Banner superior */}
        <div className="border-y border-white/10 bg-gradient-to-r from-[#316eb5]/20 to-[#254e8a]/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">¿Listo para potenciar tu comunicación?</h3>
                <p className="text-[#65A5CD] text-base">Solicita tu asesoría personalizada y transforma tu forma de comunicar</p>
              </div>
              <motion.button
                onClick={() => scrollToSection("contacto")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-[#FBEA24] hover:bg-[#FFEA4A] text-[#233a63] font-bold rounded-full transition-all duration-300 shadow-lg shadow-[#FBEA24]/20 hover:shadow-[#FBEA24]/40 whitespace-nowrap"
              >
                Solicitar Asesoría
                <Send size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Columna 1: Logo y descripción */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-2">
                  LINAC
                </h2>
                <p className="text-[#FBEA24] font-semibold mb-4 text-sm tracking-wide">
                  Actitud Lingüística
                </p>
                <p className="text-white/80 mb-6 text-sm leading-relaxed">
                  Liderazgo e Innovación en Nuevas Áreas de Capacitación
                </p>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Organismo certificado dedicado al desarrollo de habilidades comunicacionales y liderazgo profesional.
                </p>

                {/* Redes sociales con efecto hover mejorado */}
                <div className="flex gap-3">
                  <motion.a
                    href="https://facebook.com/linac.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-[#FBEA24] transition-all duration-300 border border-white/10 hover:border-[#FBEA24]"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} className="group-hover:text-[#233a63] transition-colors" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/linac.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-[#FBEA24] transition-all duration-300 border border-white/10 hover:border-[#FBEA24]"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} className="group-hover:text-[#233a63] transition-colors" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/company/linac-cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative bg-white/5 backdrop-blur-sm p-3 rounded-xl hover:bg-[#FBEA24] transition-all duration-300 border border-white/10 hover:border-[#FBEA24]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} className="group-hover:text-[#233a63] transition-colors" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Columna 2: Links rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold mb-6 text-white">Links Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="group flex items-center gap-2 text-white/70 hover:text-[#FBEA24] transition-colors text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#316eb5] group-hover:bg-[#FBEA24] transition-colors" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Columna 3: Cursos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-6 text-white">Nuestros Cursos</h3>
              <ul className="space-y-3">
                {courses.map((course, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(`/programas/${course.id}`)}
                      className="group flex items-center gap-2 text-white/70 hover:text-[#FBEA24] transition-colors text-sm text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#316eb5] group-hover:bg-[#FBEA24] transition-colors" />
                      {course.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Columna 4: Contacto con iconos mejorados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold mb-6 text-white">Contacto</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-2 bg-white/5 rounded-lg group-hover:bg-[#316eb5]/20 transition-colors">
                    <MapPin size={16} className="text-[#FBEA24]" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium mb-1">Oficina Central</p>
                    <p className="text-white/60 text-sm">Cochrane 440, Concepción</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-2 bg-white/5 rounded-lg group-hover:bg-[#316eb5]/20 transition-colors">
                    <Phone size={16} className="text-[#FBEA24]" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium mb-1">Teléfono</p>
                    <a
                      href="tel:+56968291315"
                      className="text-white/60 hover:text-[#FBEA24] text-sm transition-colors"
                    >
                      +56 9 68 29 13 15
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-2 bg-white/5 rounded-lg group-hover:bg-[#316eb5]/20 transition-colors">
                    <Mail size={16} className="text-[#FBEA24]" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium mb-1">Email</p>
                    <a
                      href="mailto:linaccapacitaciones@gmail.com"
                      className="text-white/60 hover:text-[#FBEA24] text-sm transition-colors break-all"
                    >
                      linaccapacitaciones@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-2 bg-white/5 rounded-lg group-hover:bg-[#316eb5]/20 transition-colors">
                    <Clock size={16} className="text-[#FBEA24]" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium mb-1">Horario</p>
                    <p className="text-white/60 text-sm">Lun - Vie: 08:30 - 20:30</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Separador con efecto glassmorphism */}
          <div className="relative my-12">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Footer bottom con mejor legibilidad */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-white/60">
              © {new Date().getFullYear()} LINAC Capacitaciones. Todos los derechos reservados.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="#"
                className="text-white/60 hover:text-[#FBEA24] transition-colors"
              >
                Política de Privacidad
              </a>
              <span className="text-white/20">•</span>
              <a
                href="#"
                className="text-white/60 hover:text-[#FBEA24] transition-colors"
              >
                Términos de Servicio
              </a>
              <span className="text-white/20">•</span>
              <a
                href="https://anami.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/20 hover:text-white/70 transition-all duration-300"
              >
                Desarrollado por Anami
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Botón scroll to top mejorado */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 bg-gradient-to-br from-[#FBEA24] to-[#FFEA4A] hover:from-[#FFEA4A] hover:to-[#FBEA24] text-[#233a63] p-4 rounded-2xl shadow-2xl shadow-[#FBEA24]/30 transition-all z-40 backdrop-blur-sm border-2 border-white/20"
        aria-label="Volver arriba"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ArrowUp size={22} strokeWidth={2.5} />
      </motion.button>
    </footer>
  )
}
