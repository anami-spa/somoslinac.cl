
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Pencil, Presentation, TrendingUp, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    description: "Analizamos las necesidades específicas de tu organización y equipo.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Diseño Personalizado",
    description: "Creamos un programa a medida basado en objetivos claros y medibles.",
  },
  {
    number: "03",
    icon: Presentation,
    title: "Implementación",
    description: "Ejecutamos las capacitaciones con metodologías dinámicas y participativas.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Seguimiento",
    description: "Evaluamos resultados y ajustamos para garantizar el impacto deseado.",
  },
]

export function Methodology() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="metodologia" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FBEA24]/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#316eb5]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#316eb5] font-semibold text-sm uppercase tracking-wider">Nuestra Metodología</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#233a63] mt-3 mb-4">Cómo trabajamos contigo</h2>
          <p className="text-lg text-[#35669A] max-w-2xl mx-auto">
            Un proceso estructurado que garantiza resultados tangibles y duraderos para tu organización.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#316eb5]/30 to-transparent" />
              )}

              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-[#f5f9ff] border-2 border-[#316eb5]/20 rounded-2xl flex items-center justify-center mx-auto group hover:bg-[#316eb5] hover:border-[#316eb5] transition-all duration-300">
                    <step.icon className="text-[#316eb5] group-hover:text-white transition-colors" size={36} />
                  </div>
                  <span className="absolute -top-3 -right-3 bg-[#FBEA24] text-[#233a63] text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#233a63] mb-3">{step.title}</h3>
                <p className="text-[#35669A]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-[#233a63] via-[#254e8a] to-[#316eb5] rounded-3xl p-8 lg:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle size={24} className="text-[#FBEA24]" />
                <span className="text-3xl font-bold">100%</span>
              </div>
              <p className="text-[#65A5CD]">Programas personalizados</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle size={24} className="text-[#FBEA24]" />
                <span className="text-3xl font-bold">+50</span>
              </div>
              <p className="text-[#65A5CD]">Empresas capacitadas</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle size={24} className="text-[#FBEA24]" />
                <span className="text-3xl font-bold">98%</span>
              </div>
              <p className="text-[#65A5CD]">Satisfacción de clientes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
