import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import ScrollManager from './components/ScrollManager'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import CartToast from './components/CartToast'
import { CartProvider } from './context/CartContext'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <CartProvider>
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
      <CartDrawer />
      <CheckoutModal />
      <CartToast />
    </CartProvider>
  )
}
