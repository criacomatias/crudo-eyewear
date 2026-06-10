'use client'

import { useCarrito } from '../context/CarritoContext'

const WHATSAPP_NUMBER = '5491125132012'

function formatPrecio(precio: number) {
  return precio.toLocaleString('es-AR')
}

export default function Carrito() {
  const { items, totalPrecio, isOpen, cerrarCarrito, eliminarItem, vaciarCarrito } = useCarrito()

  const handleConfirmarPedido = () => {
    if (items.length === 0) return
    const mensaje = items
      .map((item, i) => `${i + 1}. ${item.nombre} / ${item.cristal} - $${formatPrecio(item.precio)}`)
      .join('\n')
    const texto = `Hola, quiero hacer el siguiente pedido:\n${mensaje}\nTotal: $${formatPrecio(totalPrecio)} ARS`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`, '_blank')
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={cerrarCarrito}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(0,0,0,0.3)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Panel */}
      <aside style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '100%',
        maxWidth: '440px',
        background: '#F2F2F0',
        zIndex: 50,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
      }}>
        {/* Header */}
        <div style={{
          padding: '32px 32px 24px',
          borderBottom: '1px solid rgba(10,10,10,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', marginBottom: '8px' }}>
              Tu carrito
            </p>
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0A' }}>
              {items.length} producto{items.length === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={cerrarCarrito}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#0A0A0A', lineHeight: 1, padding: '4px' }}
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {items.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center', fontSize: '13px', opacity: 0.5, color: '#0A0A0A', border: '1px solid rgba(10,10,10,0.1)', borderRadius: '20px' }}>
              Tu carrito está vacío.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{
                padding: '20px',
                border: '1px solid rgba(10,10,10,0.1)',
                borderRadius: '20px',
                marginBottom: '16px',
                background: 'rgba(255,255,255,0.6)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', marginBottom: '8px' }}>
                      {item.cristal}
                    </p>
                    <p style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: '#0A0A0A', letterSpacing: '0.08em' }}>
                      {item.nombre}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => eliminarItem(item.id)}
                    style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: 0.4, color: '#0A0A0A' }}
                  >
                    ×
                  </button>
                </div>
                <p style={{ fontSize: '13px', marginTop: '16px', color: '#0A0A0A' }}>
                  $ {formatPrecio(item.precio)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '24px 32px 40px', borderTop: '1px solid rgba(10,10,10,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.5, color: '#0A0A0A', marginBottom: '20px' }}>
            <span>Total</span>
            <span>$ {formatPrecio(totalPrecio)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={handleConfirmarPedido}
            style={{
              width: '100%',
              padding: '18px',
              background: items.length === 0 ? 'rgba(10,10,10,0.3)' : '#0A0A0A',
              color: '#F2F2F0',
              border: 'none',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: items.length === 0 ? 'not-allowed' : 'pointer',
              borderRadius: '100px',
              marginBottom: '12px',
            }}
          >
            confirmar pedido
          </button>
          {items.length > 0 && (
            <button
              type="button"
              onClick={vaciarCarrito}
              style={{
                width: '100%',
                padding: '18px',
                background: 'transparent',
                color: '#0A0A0A',
                border: '1px solid rgba(10,10,10,0.15)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '100px',
              }}
            >
              vaciar carrito
            </button>
          )}
        </div>
      </aside>
    </>
  )
}