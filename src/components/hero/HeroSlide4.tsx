import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react"
import { useEffect, useState } from "react"

// Counter animado para los stats
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}</span>
}

export function HeroSlide4() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const topics = [
    { label: "Inglés", gradient: "from-[#316eb5] to-[#65A5CD]" },
    { label: "Oratoria", gradient: "from-[#254e8a] to-[#316eb5]" },
    { label: "Liderazgo", gradient: "from-[#233a63] to-[#254e8a]" },
    { label: "Presencia", gradient: "from-[#35669A] to-[#65A5CD]" },
  ]

  const stats = [
    {
      icon: Users,
      value: 500,
      suffix: "+",
      label: "Alumnos",
      color: "text-[#FBEA24]",
    },
    {
      icon: TrendingUp,
      value: 95,
      suffix: "%",
      label: "Satisfacción",
      color: "text-[#8BC685]",
    },
    {
      icon: Award,
      value: 10,
      suffix: "+",
      label: "Años",
      color: "text-[#65A5CD]",
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20">
      {/* Imagen/Video de fondo */}
      <div className="absolute inset-0">
        {/* Por ahora usamos un gradiente, se puede reemplazar con imagen/video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#233a63] via-[#254e8a] to-[#316eb5]" />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-[#233a63]/85 backdrop-blur-sm" />
        {/* Patrón de textura */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Logo y subtítulo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-2">LINAC</h2>
            <p className="text-lg opacity-80">Academia de Comunicación</p>
          </motion.div>

          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              POTENCIA TU COMUNICACIÓN
              <br />
              <span className="text-[#FBEA24]">PROFESIONAL</span>
            </h1>
          </motion.div>

          {/* Pills de temas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {topics.map((topic, index) => (
              <motion.div
                key={topic.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`px-6 py-3 bg-gradient-to-r ${topic.gradient} rounded-full font-semibold text-sm md:text-base hover:scale-105 transition-transform duration-300 cursor-default`}
              >
                {topic.label}
              </motion.div>
            ))}
          </motion.div>

          {/* Quote inspiracional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-10 max-w-3xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -left-4 -top-4 text-6xl text-[#FBEA24] opacity-30">"</div>
              <p className="text-xl md:text-2xl italic font-light leading-relaxed px-8">
                Transformamos profesionales en comunicadores seguros e influyentes
              </p>
              <div className="absolute -right-4 -bottom-4 text-6xl text-[#FBEA24] opacity-30">"</div>
            </div>
            <p className="mt-6 text-sm opacity-70">
              — Pamela Pérez Toledo, Fonoaudióloga —
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <button
              onClick={() => scrollToSection("programas")}
              className="group px-10 py-4 bg-[#FBEA24] text-[#233a63] font-bold text-lg rounded-full hover:bg-[#FFEA4A] hover:shadow-2xl hover:shadow-[#FBEA24]/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              VER TODOS LOS CURSOS
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              AGENDAR CITA
            </button>
          </motion.div>

          {/* Stats animados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon size={24} />
                  </div>
                  <div className="text-4xl font-bold">
                    <AnimatedCounter end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm opacity-80 uppercase tracking-wide">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Elemento decorativo flotante */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-20 h-20 rounded-full bg-[#FBEA24]/20 blur-2xl"
      />
    </section>
  )
}
