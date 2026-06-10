'use client'

import { useCarrito } from '../context/CarritoContext'

const WHATSAPP_NUMBER = '5491125132012'

function formatPrecio(precio: number) {
  return precio.toLocaleString('es-AR')
}

export default function Carrito() {
  const { items, totalPrecio, isOpen, cerrarCarrito, eliminarItem, vaciarCarrito } = useCarrito()

  const mensaje = items
    .map((item, index) => `${index + 1}. ${item.nombre} / ${item.cristal} - $${formatPrecio(item.precio)}`)
    .join('\n')

  const handleConfirmarPedido = () => {
    if (items.length === 0) return
    const total = formatPrecio(totalPrecio)
    const texto = `Hola, quiero hacer el siguiente pedido:\n${mensaje}\nTotal: $${total} ARS`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`, '_blank')
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={cerrarCarrito}
      />
      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#F2F2F0] p-8 shadow-2xl transition-transform duration-500 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-4">
          <div>
            <p className="text-[10px] tracking-[0.24em] uppercase text-[#0A0A0A]/50">Tu carrito</p>
            <p className="text-xl font-semibold text-[#0A0A0A]">{items.length} producto{items.length === 1 ? '' : 's'}</p>
          </div>
          <button
            type="button"
            onClick={cerrarCarrito}
            className="text-[22px] font-semibold leading-none text-[#0A0A0A] hover:text-[#3B1F0A]"
          >
            ×
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-[#0A0A0A]/10 bg-white/70 p-8 text-center text-sm text-[#0A0A0A]/70">
              Tu carrito está vacío.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-[28px] border border-[#0A0A0A]/10 bg-white/80 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-[0.22em] uppercase text-[#0A0A0A]/50">{item.cristal}</p>
                    <p className="mt-3 text-sm font-semibold uppercase text-[#0A0A0A]">{item.nombre}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => eliminarItem(item.id)}
                    className="text-lg font-semibold text-[#0A0A0A]/60 hover:text-[#0A0A0A]"
                  >
                    ×
                  </button>
                </div>
                <p className="mt-4 text-sm font-medium text-[#0A0A0A]">$ {formatPrecio(item.precio)}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-10 rounded-[32px] border border-[#0A0A0A]/10 bg-white/80 p-6">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.22em] text-[#0A0A0A]/60">
            <span>Total</span>
            <span>$ {formatPrecio(totalPrecio)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={handleConfirmarPedido}
            className="mt-6 w-full rounded-full bg-[#0A0A0A] px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#F2F2F0] transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-[#0A0A0A]/40"
          >
            confirmar pedido
          </button>
          {items.length > 0 && (
            <button
              type="button"
              onClick={vaciarCarrito}
              className="mt-4 w-full rounded-full border border-[#0A0A0A]/15 bg-transparent px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#0A0A0A]"
            >
              vaciar carrito
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
