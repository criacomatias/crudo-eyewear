import type { Producto } from '../lib/supabase'
import Link from 'next/link'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

function formatPrecio(precio: number) {
  return precio.toLocaleString('es-AR')
}

function getProductoImagePath(slug: string) {
  return `/${slug}.png`
}

export default function Coleccion({ productos }: { productos: Producto[] }) {
  return (
    <section id="coleccion" style={{
      background: '#F2F2F0',
      padding: '160px 48px',
      borderTop: '1px solid rgba(10,10,10,0.06)',
    }}>
      <div
        className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '120px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '20px' }}>
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.15,
              color: '#0A0A0A',
            }}>01</span>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.3,
              color: '#0A0A0A',
            }}>
              coleccion limitada 2026
            </p>
          </div>
          <h2 style={{
            fontSize: 'clamp(40px,5vw,72px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
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

      <div
        className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '80px 48px' }}
      >
        {productos.map((producto) => (
          <Link
            key={producto.id}
            href={`/coleccion/${producto.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div className="product-card" style={{ cursor: 'pointer' }}>
              <div style={{
                aspectRatio: '3/4',
                overflow: 'hidden',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={getProductoImagePath(producto.slug)}
                  alt={producto.nombre}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: '#0A0A0A', textTransform: 'uppercase' }}>
                  {producto.nombre?.toUpperCase()}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '0.04em', color: '#0A0A0A' }}>
                  ${formatPrecio(producto.precio)}
                </div>
              </div>
              <div style={{
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.2,
                color: '#0A0A0A',
                marginTop: '6px',
              }}>
                {producto.linea}
              </div>
              <div style={{
                fontSize: '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                opacity: 0.35,
                marginTop: '14px',
              }}>
                ver producto →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
