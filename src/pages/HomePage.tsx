import { Suspense, lazy } from "react"
import { Hero } from "@/components/Hero"
import { Programs } from "@/components/Programs"
import { Footer } from "@/components/Footer"

// Lazy loading de componentes pesados
const AboutUs = lazy(() => import("@/components/AboutUs"))
const Methodology = lazy(() => import("@/components/Methodology"))
const Testimonials = lazy(() => import("@/components/Testimonials"))
const Contact = lazy(() => import("@/components/Contact"))

export function HomePage() {
  return (
    <>
      <Hero />
      <Programs />
      <Suspense fallback={<div className="h-20" />}>
        <AboutUs />
      </Suspense>
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
    </>
  )
}
