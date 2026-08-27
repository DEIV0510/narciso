import Hero from '../components/Hero'
import GenderFinder from '../components/GenderFinder'
import Catalog from '../components/Catalog'
import WhyNarciso from '../components/WhyNarciso'
import ProductSpotlight from '../components/ProductSpotlight'
import CraftProcess from '../components/CraftProcess'
import Experience from '../components/Experience'
import FindYourFragrance from '../components/FindYourFragrance'
import BrandSection from '../components/BrandSection'
import Location from '../components/Location'
import Socials from '../components/Socials'
import FinalCTA from '../components/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <GenderFinder />
      <Catalog />
      <WhyNarciso />
      <ProductSpotlight />
      <CraftProcess />
      <Experience />
      <FindYourFragrance />
      <BrandSection />
      <Location />
      <Socials />
      <FinalCTA />
    </>
  )
}
