"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function WhatsAppButton() {
  const phoneNumber = "56912345678"
  const message = "Hola, me interesa obtener más información sobre los programas de capacitación de LINAC."

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#3CAA36] hover:bg-[#54B150] text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2"
      aria-label="Contactar por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(60, 170, 54, 0.4)" }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  )
}
