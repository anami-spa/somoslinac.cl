import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { HomePage } from "@/pages/HomePage"
import { ProgramDetailPage } from "@/pages/ProgramDetailPage"

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programas/:programId" element={<ProgramDetailPage />} />
        </Routes>
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  )
}

export default App
