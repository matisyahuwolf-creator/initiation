import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Bell from './components/Bell'
import Home from './routes/Home'
import Research from './routes/Research'
import ResearchEssay from './routes/ResearchEssay'
import Community from './routes/Community'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0a0a0a]">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/research/:slug" element={<ResearchEssay />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <Footer />
      <Bell />
    </div>
  )
}
