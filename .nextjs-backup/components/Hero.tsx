"use client"

import { ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const featuredProgram = {
  id: "bootcamp-contenido",
  title: "BOOTCAMP de Contenido",
  subtitle: "¡Crea, graba y publica!",
  startDate: "8 de Enero 2025",
  image: "/images/image.png",
}

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="inicio"
      className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-white via-[#f5f9ff] to-[#e8f0fa] relative overflow-hidden"
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#316eb5]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#FBEA24]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#65A5CD]/5 rounded-full blur-3xl" />

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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Efecto glow detrás de la imagen */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#316eb5]/20 to-[#ec4899]/20 rounded-3xl blur-2xl" />

              {/* Contenedor de la imagen */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => scrollToSection("programas")}
              >
                {/* Imagen promocional */}
                <img
                  src={featuredProgram.image || "/placeholder.svg"}
                  alt={`${featuredProgram.title} - ${featuredProgram.subtitle}`}
                  className="w-full h-auto object-cover"
                />

                {/* Overlay con gradiente sutil al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
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
                    <div className="w-3 h-3 bg-[#ec4899] rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wide">Próximo Curso</span>
                  </div>
                  <p className="text-lg font-bold mt-1">{featuredProgram.startDate}</p>
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
                    <span className="text-sm font-bold">Inscripciones Abiertas</span>
                  </div>
                  <p className="text-xs text-[#35669A] mt-1">Cupos limitados</p>
                </div>
              </motion.div>

              {/* Badge de descuento */}
              <motion.div
                initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
                animate={{ opacity: 1, rotate: -12, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="absolute top-4 -right-6 z-20"
              >
                <div className="bg-[#ec4899] text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold">-20% DCTO</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
