import type { Producto } from '../lib/supabase'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

function formatPrecio(precio: number) {
  return precio.toLocaleString('es-AR')
}

function getWhatsAppLink(producto: Producto) {
  const mensaje = encodeURIComponent(
    'Hola, quiero comprar ' + producto.nombre + ' - $' + formatPrecio(producto.precio) + ' ARS'
  )
  return 'https://wa.me/' + whatsapp + '?text=' + mensaje
}

export default function Coleccion({ productos }: { productos: Producto[] }) {
  return (
    <section id="coleccion" style={{ background: '#0A0A0A', padding: '80px 0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '0 48px',
        marginBottom: '48px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.4, color: '#F5F0E8', marginBottom: '12px' }}>
            primera coleccion
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.1, color: '#F5F0E8' }}>
            los seis.
          </h2>
        </div>
        <div style={{ textAlign: 'right', fontSize: '11px', letterSpacing: '0.12em', opacity: 0.4, lineHeight: 2, color: '#F5F0E8' }}>
          <div>basic — $65.000 ars</div>
          <div>premium — $120.000 ars</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
        {productos.map((producto) => (
          
            key={producto.id}
            href={getWhatsAppLink(producto)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              background: '#0f0f0f',
              aspectRatio: '3/4',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {producto.imagen_url ? (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '32px 24px 60px 24px',
                }}
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.15, color: '#F5F0E8' }}>{producto.nombre}</span>
              </div>
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 55%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 300, letterSpacing: '0.1em', color: '#F5F0E8' }}>{producto.nombre}.</div>
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.45, color: '#F5F0E8', marginTop: '4px' }}>{producto.linea}</div>
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.08em', opacity: 0.65, color: '#F5F0E8' }}>${formatPrecio(producto.precio)}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
