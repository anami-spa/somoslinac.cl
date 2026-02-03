
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Target, Users, Lightbulb, GraduationCap, Globe, Mic } from "lucide-react"

export function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const founderRef = useRef(null)
  const founderInView = useInView(founderRef, { once: true, margin: "-100px" })

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
                <p className="text-[#35669A] text-base">Profesionales capacitados</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#316eb5]">+50</p>
                <p className="text-[#35669A] text-base">Empresas atendidas</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#316eb5]">98%</p>
                <p className="text-[#35669A] text-base">Satisfacción</p>
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

        {/* Subsección: Fundadora */}
        <div className="mt-24 pt-24 border-t border-gray-200" ref={founderRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Columna izquierda: Imagen */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="https://placehold.co/800x800/316eb5/ffffff?text=Pamela+P%C3%A9rez+Toledo"
                  className="rounded-2xl shadow-2xl w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
                  alt="Pamela Pérez Toledo - Fundadora y Directora de LINAC"
                />
                <div className="absolute top-4 right-4 bg-[#FBEA24] text-[#233a63] px-3 py-1 rounded-full text-sm font-semibold">
                  Placeholder
                </div>
              </div>
            </motion.div>

            {/* Columna derecha: Bio + Credenciales */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#316eb5] font-semibold text-sm uppercase tracking-wider">
                Nuestra Directora
              </span>
              <h3 className="text-3xl lg:text-4xl font-bold text-[#233a63] mt-3 mb-3">
                Pamela Pérez Toledo
              </h3>
              <p className="text-xl text-[#316eb5] font-medium mb-6">
                Fundadora y Directora de LINAC
              </p>

              <p className="text-lg text-[#35669A] leading-relaxed mb-6">
                Fonoaudióloga certificada y experta bilingüe con amplia trayectoria en el desarrollo de habilidades
                comunicacionales para profesionales y empresas. Su pasión es potenciar el impacto de cada persona
                a través del poder de la voz y la comunicación efectiva.
              </p>

              <p className="text-lg text-[#35669A] leading-relaxed mb-8">
                Con una metodología integral que combina técnicas de fonoaudiología, coaching vocal y comunicación
                estratégica, ha transformado la forma en que cientos de profesionales se expresan, logrando que hablen
                con seguridad, claridad y presencia en cualquier escenario.
              </p>

              {/* Credenciales destacadas */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="text-[#316eb5] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-[#233a63]">Fonoaudióloga Certificada</p>
                    <p className="text-sm text-[#35669A]">Especialista en comunicación profesional y técnica vocal aplicada</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="text-[#316eb5] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-[#233a63]">Experta Bilingüe Español-Inglés</p>
                    <p className="text-sm text-[#35669A]">Capacitaciones en ambos idiomas para contextos nacionales e internacionales</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mic className="text-[#316eb5] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-[#233a63]">Coach en Oratoria y Comunicación</p>
                    <p className="text-sm text-[#35669A]">Transforma tu voz en tu mejor herramienta de liderazgo e impacto</p>
                  </div>
                </div>
              </div>

              {/* Quote destacada */}
              <div className="mt-8 bg-gradient-to-r from-[#316eb5] to-[#254e8a] p-6 rounded-2xl">
                <p className="text-white text-lg italic leading-relaxed">
                  "Tu voz es tu mejor herramienta. Mi misión es ayudarte a hablar con seguridad, claridad e impacto para alcanzar tus metas profesionales."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
