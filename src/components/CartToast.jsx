import { useCart } from '../context/CartContext'
import { IconCheck } from './icons'

export default function CartToast() {
  const { toast } = useCart()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-[98] flex justify-center px-4 sm:bottom-8"
    >
      <div
        key={toast?.id}
        className={`flex items-center gap-2.5 rounded-full bg-ink-900 px-5 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out ${
          toast ? 'translate-y-0 opacity-100 motion-safe:animate-fadeUp' : 'translate-y-3 opacity-0'
        }`}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-gold-400">
          <IconCheck className="h-4 w-4" />
        </span>
        <span className="font-body text-xs text-cream-50 sm:text-sm">{toast?.message}</span>
      </div>
    </div>
  )
}
