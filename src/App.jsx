import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <LoadingScreen />
      <ScrollToTop />
      <Header open={menuOpen} onOpenChange={setMenuOpen} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/perfumes/:slug" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton hideForMenu={menuOpen} />
    </>
  )
}
