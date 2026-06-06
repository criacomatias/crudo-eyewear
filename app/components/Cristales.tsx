import type { Cristal } from '../lib/supabase'

export default function Cristales({ cristales }: { cristales: Cristal[] }) {
  return (
    <section id="cristales" style={{ background: '#F2F2F0', padding: '160px 48px' }}>
      <p style={{
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        opacity: 0.3,
        color: '#0A0A0A',
        marginBottom: '40px',
      }}>
        cristales
      </p>
      <h2 style={{
        color: '#0A0A0A',
        fontWeight: 300,
        letterSpacing: '-0.01em',
        lineHeight: 1.05,
        fontSize: 'clamp(40px,6vw,88px)',
        marginBottom: '120px',
      }}>
        cuatro cristales.<br />una funcion.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '64px' }}>
        {cristales.map((cristal) => (
          <div key={cristal.id}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: cristal.color_hex,
              marginBottom: '36px',
            }} />
            <div style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0A0A0A',
              marginBottom: '10px',
            }}>
              {cristal.nombre}
            </div>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.15em',
              opacity: 0.3,
              color: '#0A0A0A',
              marginBottom: '20px',
            }}>
              {cristal.nm}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.75,
              opacity: 0.55,
              color: '#0A0A0A',
            }}>
              {cristal.uso}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
