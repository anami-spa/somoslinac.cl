
import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, Instagram } from "lucide-react"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    alert("¡Gracias por contactarnos! Nos comunicaremos contigo pronto.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-white to-[#f0f7ff]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#316eb5] font-semibold text-sm uppercase tracking-wider">Contacto</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#233a63] mt-3 mb-4">Contáctanos</h2>
          <p className="text-lg text-[#35669A] max-w-2xl mx-auto">
            Estamos aquí para ayudarte a encontrar el programa ideal
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Datos de contacto */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-[#233a63] mb-6">Información de Contacto</h3>
              <div className="space-y-5">
                <a href="tel:+56968291315" className="flex items-center gap-4 group">
                  <div className="bg-[#316eb5]/10 p-3 rounded-xl group-hover:bg-[#316eb5] transition-colors">
                    <Phone className="text-[#316eb5] group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#233a63]">Teléfono</h4>
                    <p className="text-[#35669A] group-hover:text-[#316eb5] transition-colors">+56 9 68 29 13 15</p>
                  </div>
                </a>
                <a href="mailto:linaccapacitaciones@gmail.com" className="flex items-center gap-4 group">
                  <div className="bg-[#316eb5]/10 p-3 rounded-xl group-hover:bg-[#316eb5] transition-colors">
                    <Mail className="text-[#316eb5] group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#233a63]">Email</h4>
                    <p className="text-[#35669A] group-hover:text-[#316eb5] transition-colors">
                      linaccapacitaciones@gmail.com
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="bg-[#316eb5]/10 p-3 rounded-xl">
                    <MapPin className="text-[#316eb5]" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#233a63]">Ubicación</h4>
                    <p className="text-[#35669A]">Cochrane 440, Concepción, Chile</p>
                  </div>
                </div>
                <a
                  href="https://instagram.com/linac.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-[#316eb5]/10 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-colors">
                    <Instagram className="text-[#316eb5] group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#233a63]">Instagram</h4>
                    <p className="text-[#35669A] group-hover:text-[#316eb5] transition-colors">@linac.cl</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="bg-[#316eb5]/10 p-3 rounded-xl">
                    <Clock className="text-[#316eb5]" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#233a63]">Horario de Atención</h4>
                    <p className="text-[#35669A]">Lunes a Viernes, 08:30 - 20:30 hrs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.7847815677867!2d-73.05138492350997!3d-36.82699597224455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5068f8c0bb3%3A0x4a0b0b4a4a0b0b4a!2sCochrane%20440%2C%20Concepci%C3%B3n%2C%20B%C3%ADo%20B%C3%ADo!5e0!3m2!1ses!2scl!4v1699999999999!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación LINAC"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="backdrop-blur-md bg-white/70 p-8 rounded-2xl border border-white/50 shadow-xl"
            >
              <h3 className="text-xl font-semibold text-[#233a63] mb-6">Envíanos un Mensaje</h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#233a63] mb-2">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#316eb5] focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#233a63] mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#316eb5] focus:border-transparent transition-all placeholder:text-gray-400"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#233a63] mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#316eb5] focus:border-transparent transition-all placeholder:text-gray-400"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#233a63] mb-2">
                    Asunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#316eb5] focus:border-transparent transition-all text-gray-700"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="consulta">Consulta general</option>
                    <option value="programas">Info sobre programas</option>
                    <option value="empresas">Cotización empresas</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#233a63] mb-2">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#316eb5] focus:border-transparent transition-all resize-none placeholder:text-gray-400"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#233a63] to-[#316eb5] text-white font-semibold rounded-xl hover:from-[#254e8a] hover:to-[#35669A] transition-all duration-300 shadow-lg shadow-[#316eb5]/30"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(49, 110, 181, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  Enviar Mensaje
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
