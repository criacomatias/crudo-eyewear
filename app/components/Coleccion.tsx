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
    <section id="coleccion" style={{ background: '#F2F2F0', padding: '160px 48px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '120px',
      }}>
        <div>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            opacity: 0.3,
            color: '#0A0A0A',
            marginBottom: '20px',
          }}>
            primera coleccion
          </p>
          <h2 style={{
            fontSize: 'clamp(40px,5vw,72px)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            color: '#0A0A0A',
          }}>
            los seis.
          </h2>
        </div>
        <div style={{
          textAlign: 'right',
          fontSize: '11px',
          letterSpacing: '0.1em',
          opacity: 0.3,
          lineHeight: 2.4,
          color: '#0A0A0A',
        }}>
          <div>basic — $65.000 ars</div>
          <div>premium — $120.000 ars</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '80px 64px' }}>
        {productos.map((producto) => (
          <a
            key={producto.id}
            href={getWhatsAppLink(producto)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div style={{
              aspectRatio: '3/4',
              overflow: 'hidden',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {producto.imagen_url ? (
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <span style={{
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  opacity: 0.12,
                  color: '#0A0A0A',
                }}>
                  {producto.nombre}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 300,
                letterSpacing: '0.08em',
                color: '#0A0A0A',
              }}>
                {producto.nombre}
              </div>
              <div style={{
                fontSize: '11px',
                letterSpacing: '0.06em',
                opacity: 0.4,
                color: '#0A0A0A',
              }}>
                ${formatPrecio(producto.precio)}
              </div>
            </div>
            <div style={{
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.2,
              color: '#0A0A0A',
              marginTop: '5px',
            }}>
              {producto.linea}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
