
import { useState, lazy, Suspense } from "react"
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { Programs } from "@/components/Programs"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"

// Lazy loading de componentes pesados
const ProgramDetail = lazy(() => import("@/components/ProgramDetail"))
const AboutUs = lazy(() => import("@/components/AboutUs"))
const Methodology = lazy(() => import("@/components/Methodology"))
const Testimonials = lazy(() => import("@/components/Testimonials"))
const Contact = lazy(() => import("@/components/Contact"))

function App() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)

  if (selectedProgram) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-[#316eb5] text-lg">Cargando...</div>
          </div>
        }>
          <ProgramDetail programId={selectedProgram} onBack={() => setSelectedProgram(null)} />
        </Suspense>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="h-20" />}>
        <AboutUs />
      </Suspense>
      <Programs onProgramSelect={setSelectedProgram} />
      <Suspense fallback={<div className="h-20" />}>
        <Methodology />
      </Suspense>
      <Suspense fallback={<div className="h-20" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="h-20" />}>
        <Contact />
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
