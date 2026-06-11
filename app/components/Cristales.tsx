import type { Cristal } from '../lib/supabase'

export default function Cristales({ cristales }: { cristales: Cristal[] }) {
  return (
    <section id="cristales" style={{ background: '#F2F2F0', padding: '100px 48px', borderTop: '1px solid rgba(10,10,10,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '40px' }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.15, color: '#0A0A0A' }}>03</span>
        <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, color: '#0A0A0A' }}>cristales</p>
      </div>
      <h2 className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700" style={{ color: '#0A0A0A', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.04, fontSize: 'clamp(40px,6vw,88px)', marginBottom: '120px' }}>
        cuatro cristales.<br />una funcion.
      </h2>
      <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '64px' }}>
        {cristales.map((cristal) => (
          <div key={cristal.id} className="cristal-card">
            <div className="cristal-swatch" style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: cristal.color_hex, marginBottom: '36px' }} />
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0A0A0A', marginBottom: '10px' }}>{cristal.nombre}</div>
            <div style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.3, color: '#0A0A0A', marginBottom: '20px' }}>{cristal.nm}</div>
            <div style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.75, opacity: 0.55, color: '#0A0A0A' }}>{cristal.uso}</div>
          </div>
        ))}
      </div>
    </section>
  )
}