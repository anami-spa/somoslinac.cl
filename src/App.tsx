
import { useState } from "react"
import { Navigation } from "@/src/components/Navigation"
import { Hero } from "@/src/components/Hero"
import { AboutUs } from "@/src/components/AboutUs"
import { Programs } from "@/src/components/Programs"
import { Methodology } from "@/src/components/Methodology"
import { Testimonials } from "@/src/components/Testimonials"
import { Contact } from "@/src/components/Contact"
import { Footer } from "@/src/components/Footer"
import { WhatsAppButton } from "@/src/components/WhatsAppButton"
import { ProgramDetail } from "@/src/components/ProgramDetail"

function App() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)

  if (selectedProgram) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <ProgramDetail programId={selectedProgram} onBack={() => setSelectedProgram(null)} />
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <AboutUs />
      <Programs onProgramSelect={setSelectedProgram} />
      <Methodology />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
