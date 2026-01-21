"use client"

import { Facebook, Instagram, Linkedin, ArrowUp, Heart } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gradient-to-br from-[#233a63] via-[#254e8a] to-[#316eb5] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-2">
              LINAC<span className="text-[#FBEA24]"> |</span>{" "}
              <span className="text-sm font-normal text-[#65A5CD]">Actitud Lingüística</span>
            </h2>
            <p className="text-[#65A5CD] mb-6 text-sm">Liderazgo e Innovación en Nuevas Áreas de Capacitación</p>
            <p className="text-[#65A5CD] text-sm leading-relaxed">
              Organismo de capacitación dedicado a ofrecer soluciones efectivas para el desarrollo personal, profesional
              y laboral.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://facebook.com/linac.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-lg hover:bg-[#FBEA24] hover:text-[#233a63] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/linac.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-lg hover:bg-[#FBEA24] hover:text-[#233a63] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/company/linac-cl"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-lg hover:bg-[#FBEA24] hover:text-[#233a63] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("programas")}
                  className="text-[#65A5CD] hover:text-[#FBEA24] transition-colors text-sm"
                >
                  Programas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("metodologia")}
                  className="text-[#65A5CD] hover:text-[#FBEA24] transition-colors text-sm"
                >
                  Metodología
                </button>
              </li>
              <li>
                <a href="#" className="text-[#65A5CD] hover:text-[#FBEA24] transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#65A5CD] hover:text-[#FBEA24] transition-colors text-sm">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Programas destacados */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nuestros Programas</h3>
            <ul className="space-y-3 text-[#65A5CD] text-sm">
              <li className="hover:text-[#FBEA24] transition-colors cursor-pointer">Speak Easy Access!</li>
              <li className="hover:text-[#FBEA24] transition-colors cursor-pointer">¡Toma las Riendas!</li>
              <li className="hover:text-[#FBEA24] transition-colors cursor-pointer">Oratoria y Comunicación</li>
              <li className="hover:text-[#FBEA24] transition-colors cursor-pointer">Programas Empresariales</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-[#65A5CD] text-sm">
              <li>Cochrane 440, Concepción</li>
              <li>
                <a href="tel:+56968291315" className="hover:text-[#FBEA24] transition-colors">
                  +56 9 68 29 13 15
                </a>
              </li>
              <li>
                <a href="mailto:linaccapacitaciones@gmail.com" className="hover:text-[#FBEA24] transition-colors">
                  linaccapacitaciones@gmail.com
                </a>
              </li>
              <li>Lun - Vie: 08:30 - 20:30</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#65A5CD] text-sm">© 2025 LINAC Capacitaciones. Todos los derechos reservados.</p>
          <p className="text-[#65A5CD] text-sm flex items-center gap-1">
            Desarrollado con <Heart size={14} className="text-red-400 fill-red-400" /> en Concepción, Chile
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#65A5CD] hover:text-[#FBEA24] text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-[#65A5CD] hover:text-[#FBEA24] text-sm transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 bg-[#FBEA24] hover:bg-[#FFEA4A] text-[#233a63] p-3 rounded-full shadow-lg transition-colors z-40"
        aria-label="Volver arriba"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}
