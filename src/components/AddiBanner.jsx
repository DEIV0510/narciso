import addiAvif from '../assets/img/addi-banner.avif'
import addiWebp from '../assets/img/addi-banner.webp'
import addiJpg from '../assets/img/addi-banner.jpg'
import addiAvif960 from '../assets/img/addi-banner-960.avif'
import addiWebp960 from '../assets/img/addi-banner-960.webp'
import addiJpg960 from '../assets/img/addi-banner-960.jpg'
import BannerCard from './BannerCard'
import { Fog } from './HalloweenFx'
import { Bats, Cobweb } from './HalloweenArt'
import { waLink } from '../data/site'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

// Banner real que envió el cliente anunciando Addi (paga hasta en 3 cuotas)
// como nuevo método de pago — mismo tratamiento que PromoBanner: la pieza ya
// viene diseñada, solo se envuelve en un enlace a WhatsApp para coordinar el
// pedido. "Addi" también queda disponible como opción en el checkout normal
// (ver paymentMethods en data/cart.js) y en cada botón de compra (AddiOption).
//
// Edición Halloween: la pieza ya es oscura y dorada, así que se respeta tal
// cual (trae la interfaz de Addi) y solo se ambienta por encima en zonas sin
// texto: viñeta nocturna, telaraña en la esquina de la roca, dos murciélagos
// en la penumbra superior y niebla baja a la derecha.
const message =
  'Hola, Gentleman Co. Vi que ahora puedo pagar con Addi (hasta 3 cuotas, 0% de interés) y quiero hacer mi pedido así.'

const BATS = [
  { left: '0%', top: '0%', w: '60%', delay: '-0.4s' },
  { left: '70%', top: '70%', w: '36%', delay: '-1.9s' },
]

export default function AddiBanner() {
  return (
    <BannerCard
      href={waLink(message)}
      alt="Paga tu fragancia Gentleman Co hasta en 3 cuotas con Addi, 0% de interés y aprobación inmediata"
      avif={[addiAvif960, addiAvif]}
      webp={[addiWebp960, addiWebp]}
      jpg={[addiJpg960, addiJpg]}
    >
      {HALLOWEEN_ACTIVE && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_55%,rgba(8,8,8,0.55)_100%)]"
          />
          <Cobweb corner="tr" className="absolute right-0 top-0 w-[20%] text-cream-200/35" />
          <Bats rim bats={BATS} className="absolute left-[44%] top-[3%] h-[12%] w-[11%]" />
          <Fog className="bottom-0 right-0 h-[26%] w-[56%] opacity-70" front={false} />
        </>
      )}
    </BannerCard>
  )
}
