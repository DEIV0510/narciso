import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import ScrollManager from './components/ScrollManager'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <LoadingScreen />
      <ScrollManager />
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
