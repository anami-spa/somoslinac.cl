"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { AboutUs } from "@/components/AboutUs"
import { Programs } from "@/components/Programs"
import { Methodology } from "@/components/Methodology"
import { Testimonials } from "@/components/Testimonials"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { ProgramDetail } from "@/components/ProgramDetail"

export default function Home() {
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
