'use client'

import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'

function formatPrecio(precio: number) {
  return precio.toLocaleString('es-AR')
}

const PROVINCIAS_VALIDAS = ['CABA', 'Buenos Aires']

export default function Carrito() {
  const { items, totalPrecio, isOpen, cerrarCarrito, eliminarItem, vaciarCarrito } = useCarrito()
  const [loading, setLoading] = useState(false)
  const [direccion, setDireccion] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')
  const [provincia, setProvincia] = useState('')

  const envioValido =
    direccion.trim().length > 4 &&
    codigoPostal.trim().length >= 4 &&
    PROVINCIAS_VALIDAS.includes(provincia)

  const handleConfirmarPedido = async () => {
    if (items.length === 0 || !envioValido) return
    setLoading(true)
    try {
      const envio = {
        direccion: direccion.trim(),
        codigoPostal: codigoPostal.trim(),
        provincia,
      }
      localStorage.setItem('crudo_envio', JSON.stringify(envio))

      const res = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, envio }),
      })
      const data = await res.json()
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        console.error('Error creando preferencia:', data.error)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        onClick={cerrarCarrito}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.3)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />
      <aside style={{
        position: 'fixed', top: 0, right: 0,
        height: '100vh', width: '100%', maxWidth: '440px',
        background: '#F2F2F0', zIndex: 50,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
      }}>
        <div style={{ padding: '32px 32px 24px', borderBottom: '1px solid rgba(10,10,10,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', marginBottom: '8px' }}>Tu carrito</p>
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0A' }}>{items.length} producto{items.length === 1 ? '' : 's'}</p>
          </div>
          <button type="button" onClick={cerrarCarrito} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#0A0A0A', lineHeight: 1, padding: '4px' }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {items.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center', fontSize: '13px', opacity: 0.5, color: '#0A0A0A', border: '1px solid rgba(10,10,10,0.1)', borderRadius: '20px' }}>
              Tu carrito está vacío.
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} style={{ padding: '20px', border: '1px solid rgba(10,10,10,0.1)', borderRadius: '20px', marginBottom: '16px', background: 'rgba(255,255,255,0.6)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', marginBottom: '8px' }}>{item.cristal}</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: '#0A0A0A', letterSpacing: '0.08em' }}>{item.nombre}</p>
                    </div>
                    <button type="button" onClick={() => eliminarItem(item.id)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: 0.4, color: '#0A0A0A' }}>×</button>
                  </div>
                  <p style={{ fontSize: '13px', marginTop: '16px', color: '#0A0A0A' }}>$ {formatPrecio(item.precio)}</p>
                </div>
              ))}

              <p style={{ fontSize: '9px', letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', margin: '32px 0 16px' }}>
                Datos de envío
              </p>

              <select
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                style={{
                  width: '100%', padding: '14px 16px', marginBottom: '12px',
                  border: '1px solid rgba(10,10,10,0.15)', background: 'white',
                  fontSize: '13px', color: '#0A0A0A', borderRadius: '12px',
                }}
              >
                <option value="">Provincia</option>
                <option value="CABA">CABA</option>
                <option value="Buenos Aires">Buenos Aires</option>
              </select>

              <input
                type="text"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                placeholder="Código postal"
                style={{
                  width: '100%', padding: '14px 16px', marginBottom: '12px',
                  border: '1px solid rgba(10,10,10,0.15)', background: 'white',
                  fontSize: '13px', color: '#0A0A0A', borderRadius: '12px',
                }}
              />

              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección (calle, número, localidad)"
                style={{
                  width: '100%', padding: '14px 16px', marginBottom: '8px',
                  border: '1px solid rgba(10,10,10,0.15)', background: 'white',
                  fontSize: '13px', color: '#0A0A0A', borderRadius: '12px',
                }}
              />

              <p style={{ fontSize: '11px', opacity: 0.45, color: '#0A0A0A', marginBottom: '8px' }}>
                Por ahora enviamos solo a CABA y Provincia de Buenos Aires.
              </p>
            </>
          )}
        </div>

        <div style={{ padding: '24px 32px 40px', borderTop: '1px solid rgba(10,10,10,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.5, color: '#0A0A0A', marginBottom: '20px' }}>
            <span>Total</span>
            <span>$ {formatPrecio(totalPrecio)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0 || loading || !envioValido}
            onClick={handleConfirmarPedido}
            style={{
              width: '100%', padding: '18px',
              background: (items.length === 0 || !envioValido) ? 'rgba(10,10,10,0.3)' : '#0A0A0A',
              color: '#F2F2F0', border: 'none',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              cursor: (items.length === 0 || !envioValido) ? 'not-allowed' : 'pointer',
              borderRadius: '100px', marginBottom: '12px',
            }}
          >
            {loading ? 'procesando...' : 'confirmar pedido'}
          </button>
          {items.length > 0 && (
            <button
              type="button"
              onClick={vaciarCarrito}
              style={{
                width: '100%', padding: '18px',
                background: 'transparent', color: '#0A0A0A',
                border: '1px solid rgba(10,10,10,0.15)',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: '100px',
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