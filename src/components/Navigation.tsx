
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const navItems = [
    { label: "Nuestros Programas", id: "programas" },
    { label: "Metodología", id: "metodologia" },
    { label: "Contacto", id: "contacto" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.button
            onClick={() => scrollToSection("inicio")}
            className="flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-[#233a63]">
              LINAC
            </h1>
          </motion.button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-medium text-[#233a63] hover:text-[#316eb5] transition-colors duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection("contacto")}
              className="bg-[#FBEA24] text-[#233a63] px-6 py-2.5 rounded-full font-semibold hover:bg-[#FFEA4A] transition-colors duration-200 shadow-lg shadow-[#FBEA24]/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Inscríbete
            </motion.button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#233a63] hover:text-[#316eb5] p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-[#233a63] hover:text-[#316eb5] hover:bg-[#f5f9ff] rounded-lg font-medium"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => scrollToSection("contacto")}
                className="block w-full text-center px-4 py-3 bg-[#FBEA24] text-[#233a63] rounded-lg font-semibold mt-2"
              >
                Inscríbete
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
