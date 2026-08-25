import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Catalog from './components/Catalog'
import ProductSpotlight from './components/ProductSpotlight'
import CraftProcess from './components/CraftProcess'
import FindYourFragrance from './components/FindYourFragrance'
import BrandSection from './components/BrandSection'
import Location from './components/Location'
import Socials from './components/Socials'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <LoadingScreen />
      <Header open={menuOpen} onOpenChange={setMenuOpen} />
      <main>
        <Hero />
        <Benefits />
        <Catalog />
        <ProductSpotlight />
        <CraftProcess />
        <FindYourFragrance />
        <BrandSection />
        <Location />
        <Socials />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton hideForMenu={menuOpen} />
    </>
  )
}
