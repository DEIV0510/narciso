import { formatCOP } from './products'
import { DEFAULT_SIZE_LABEL } from '../context/CartContext'

export const paymentMethods = ['Pago contra entrega', 'Transferencia bancaria']

// Arma el mensaje estructurado de pedido para WhatsApp a partir del carrito
// y los datos del cliente. El envío no se suma al total porque se calcula
// al finalizar (no hay tarifa real conocida que mostrar sin inventarla).
export function buildOrderMessage(items, customer) {
  const lines = items.map((item) => {
    const sizeLine = item.sizeLabel && item.sizeLabel !== DEFAULT_SIZE_LABEL ? `\nPresentación: ${item.sizeLabel}` : ''
    return `${item.qty} x ${item.fullName}${sizeLine}\nPrecio: ${formatCOP(item.price)}`
  })

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return [
    'Hola, quiero realizar el siguiente pedido en Narciso Parfum:',
    '',
    'PEDIDO:',
    '',
    lines.join('\n\n'),
    '',
    `Subtotal: ${formatCOP(subtotal)}`,
    '',
    'DATOS DEL CLIENTE:',
    '',
    `Nombre: ${customer.name}`,
    `Teléfono: ${customer.phone}`,
    `Ciudad: ${customer.city}`,
    `Dirección: ${customer.address}`,
    `Barrio: ${customer.neighborhood}`,
    `Indicaciones: ${customer.notes ? customer.notes : '—'}`,
    '',
    `Método de pago: ${customer.paymentMethod}`,
    '',
    `TOTAL DEL PEDIDO: ${formatCOP(subtotal)}`,
  ].join('\n')
}
