
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Carolina Muñoz",
    role: "Jefa de Recursos Humanos",
    company: "Hospital Regional de Concepción",
    image: "/professional-woman-chilean.jpg",
    content:
      "El programa de comunicación empática transformó la dinámica de nuestro equipo. Ahora tenemos un ambiente laboral más saludable y colaborativo.",
    rating: 5,
  },
  {
    name: "Roberto Sepúlveda",
    role: "Director de Operaciones",
    company: "Empresa Portuaria Talcahuano",
    image: "/professional-man-chilean-executive.jpg",
    content:
      "La metodología de LINAC es práctica y efectiva. Vimos resultados tangibles en el bienestar de nuestros colaboradores desde las primeras sesiones.",
    rating: 5,
  },
  {
    name: "María José Contreras",
    role: "Coordinadora de Capacitación",
    company: "Universidad del Biobío",
    image: "/professional-woman-educator.jpg",
    content:
      "Excelente trabajo en el diseño de programas a medida. Entendieron perfectamente nuestras necesidades y superaron nuestras expectativas.",
    rating: 5,
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonios" className="py-24 bg-[#f5f9ff] relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#316eb5]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FBEA24]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#316eb5] font-semibold text-sm uppercase tracking-wider">Testimonios</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#233a63] mt-3 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-lg text-[#35669A] max-w-2xl mx-auto">
            Organizaciones de la Región del Biobío que han confiado en nosotros.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white p-8 rounded-2xl hover:shadow-xl hover:shadow-[#316eb5]/10 transition-all duration-300 border border-gray-100 relative group"
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-6 right-6">
                <Quote className="text-[#316eb5]/10 group-hover:text-[#316eb5]/20 transition-colors" size={48} />
              </div>

              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-[#FBEA24] fill-[#FBEA24]" />
                ))}
              </div>

              <p className="text-[#35669A] mb-6 leading-relaxed relative z-10">{testimonial.content}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#316eb5]/20"
                />
                <div>
                  <h4 className="font-semibold text-[#233a63]">{testimonial.name}</h4>
                  <p className="text-sm text-[#65A5CD]">{testimonial.role}</p>
                  <p className="text-sm text-[#316eb5] font-medium">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
