"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Target, Users, Lightbulb } from "lucide-react"

export function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Con el bienestar emocional y el desarrollo integral de cada persona.",
    },
    {
      icon: Target,
      title: "Efectividad",
      description: "Soluciones prácticas y medibles para el desarrollo profesional.",
    },
    {
      icon: Users,
      title: "Empatía",
      description: "Comunicación efectiva, empática y asertiva en todas nuestras interacciones.",
    },
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "Metodologías actualizadas y adaptadas a las necesidades actuales.",
    },
  ]

  return (
    <section id="nosotros" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iIzMxNmViNSIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#316eb5] font-semibold text-sm uppercase tracking-wider">¿Quiénes Somos?</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#233a63] mt-3 mb-6 text-balance">
              Transformamos el potencial humano en resultados extraordinarios
            </h2>

            <p className="text-lg text-[#35669A] leading-relaxed mb-6">
              Somos un organismo de capacitación dedicado a ofrecer soluciones efectivas para el desarrollo personal,
              profesional y laboral.
            </p>
            <p className="text-lg text-[#35669A] leading-relaxed">
              Diseñamos planes a medida para quienes buscan mejorar estrategias de comunicación efectiva, empática y
              asertiva, impulsando el crecimiento mediante el compromiso con la mejora continua y el autocuidado.
            </p>

            <div className="mt-10 flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#316eb5]">+500</p>
                <p className="text-[#35669A] text-sm">Profesionales capacitados</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#316eb5]">+50</p>
                <p className="text-[#35669A] text-sm">Empresas atendidas</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#316eb5]">98%</p>
                <p className="text-[#35669A] text-sm">Satisfacción</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-[#f5f9ff] p-6 rounded-2xl hover:bg-[#316eb5] group transition-all duration-300 hover:shadow-xl border border-[#316eb5]/10"
              >
                <div className="bg-[#316eb5]/10 group-hover:bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <value.icon className="text-[#316eb5] group-hover:text-white" size={24} />
                </div>
                <h3 className="font-semibold text-[#233a63] group-hover:text-white mb-2 transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm text-[#35669A] group-hover:text-white/80 transition-colors">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
