import type { Producto } from '../lib/supabase'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

export default function Lineas({ productos }: { productos: Producto[] }) {
  const basic = productos.filter((p) => p.linea === 'basic')
  const premium = productos.filter((p) => p.linea === 'premium')

  return (
    <section style={{
      background: '#F2F2F0',
      padding: '160px 48px',
      borderTop: '1px solid rgba(10,10,10,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '120px' }}>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0.15,
          color: '#0A0A0A',
        }}>04</span>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0.3,
          color: '#0A0A0A',
        }}>
          lineas
        </p>
      </div>
      <div
        className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}
      >
        {[
          { label: 'Basic', price: '$65.000', items: basic },
          { label: 'Premium', price: '$120.000', items: premium },
        ].map(({ label, price, items }) => (
          <div key={label}>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              opacity: 0.3,
              color: '#0A0A0A',
              marginBottom: '28px',
            }}>
              Linea {label}
            </div>
            <div style={{
              fontSize: 'clamp(48px,5vw,80px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#0A0A0A',
              marginBottom: '56px',
            }}>
              {price}{' '}
              <span style={{ fontSize: '14px', opacity: 0.25, letterSpacing: '0.1em' }}>ars</span>
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 300,
              letterSpacing: '0.08em',
              opacity: 0.35,
              lineHeight: 2.4,
              color: '#0A0A0A',
              marginBottom: '72px',
            }}>
              {items.map((p) => (
                <div key={p.id}>{p.nombre} — {p.descripcion}</div>
              ))}
            </div>
            <a
              href={'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent('Hola, quiero ver la linea ' + label + ' de CRUDO.')}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
              style={{
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                textDecoration: 'none',
              }}
            >
              ver armazones
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
