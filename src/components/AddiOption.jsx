import { waLink } from '../data/site'

// Opción de compra con Addi (hasta 3 cuotas, 0% de interés — datos del banner
// oficial que mandó el cliente). El pago con Addi se coordina por WhatsApp,
// igual que el resto de pedidos (ver paymentMethods en data/cart.js), así que
// abre el chat con el mensaje listo para ese producto.
export function addiMessage({ name, price, sizeLabel } = {}) {
  if (!name) {
    return 'Hola, Gentleman Co. Quiero comprar y pagar con Addi (hasta 3 cuotas, 0% de interés). ¿Me ayudan con el proceso?'
  }
  const size = sizeLabel ? ` (${sizeLabel})` : ''
  const amount = price ? ` por $${price.toLocaleString('es-CO')}` : ''
  return `Hola, Gentleman Co. Quiero comprar el perfume ${name}${size}${amount} y pagar con Addi (hasta 3 cuotas, 0% de interés). ¿Me ayudan con el proceso?`
}

// Distintivo de Addi con su color de marca (texto blanco sobre azul, 5:1).
export function AddiBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-[5px] bg-addi px-1.5 py-px font-body text-[1em] font-semibold leading-tight tracking-normal text-white ${className}`}
    >
      Addi
    </span>
  )
}

// variant 'card' = línea compacta bajo los botones de una tarjeta de producto;
// 'button' = botón completo (ficha de producto y modal).
export default function AddiOption({ name, price, sizeLabel, variant = 'card', className = '' }) {
  const href = waLink(addiMessage({ name, price, sizeLabel }))
  const label = name ? `Comprar ${name} pagando con Addi, hasta 3 cuotas` : 'Comprar pagando con Addi, hasta 3 cuotas'

  if (variant === 'button') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`hw-btn-glow flex w-full items-center justify-center gap-2.5 rounded-full border border-gold-400/40 bg-night-900/70 px-6 py-3.5 font-body text-sm text-cream-50 hover:border-gold-300 hover:bg-night-800 sm:w-fit ${className}`}
      >
        <AddiBadge />
        <span>Paga hasta en 3 cuotas</span>
        <span className="text-xs text-ink-300">0% de interés</span>
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex min-h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-gold-500/20 bg-night-900/60 px-3 font-body text-[11px] text-cream-200/85 transition-colors duration-200 hover:border-gold-400/60 hover:text-cream-50 ${className}`}
    >
      {/* En la tarjeta angosta del móvil cabe sin el "Hasta". */}
      <span>
        <span className="max-sm:hidden">Hasta </span>3 cuotas con
      </span>
      <AddiBadge />
    </a>
  )
}
