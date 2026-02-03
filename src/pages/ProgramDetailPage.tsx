import { Suspense, lazy, useEffect } from "react"
import { Footer } from "@/components/Footer"

const ProgramDetail = lazy(() => import("@/components/ProgramDetail"))

export function ProgramDetailPage() {
  // Scroll al inicio al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[#316eb5] text-lg">Cargando...</div>
        </div>
      }>
        <ProgramDetail />
      </Suspense>
      <Footer />
    </>
  )
}
