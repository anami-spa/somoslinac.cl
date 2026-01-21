// Página principal para Laravel/Inertia.js
// En Laravel: Route::get('/', fn() => Inertia::render('Home'));

"use client"

import { useState } from "react"
import { Navigation } from "../Components/Navigation"
import { Hero } from "../Components/Hero"
import { AboutUs } from "../Components/AboutUs"
import { Programs } from "../Components/Programs"
import { Methodology } from "../Components/Methodology"
import { Testimonials } from "../Components/Testimonials"
import { Contact } from "../Components/Contact"
import { Footer } from "../Components/Footer"
import { WhatsAppButton } from "../Components/WhatsAppButton"
import { ProgramDetail } from "../Components/ProgramDetail"

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
