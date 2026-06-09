export default function Concepto() {
  return (
    <section style={{
      background: '#F2F2F0',
      padding: '160px 48px',
      borderTop: '1px solid rgba(10,10,10,0.06)',
    }}>
      <div
        className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '120px',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '56px' }}>
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.15,
              color: '#0A0A0A',
            }}>02</span>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.3,
              color: '#0A0A0A',
            }}>
              concepto
            </p>
          </div>
          <p style={{
            color: '#0A0A0A',
            fontWeight: 300,
            fontSize: 'clamp(20px,2.8vw,34px)',
            lineHeight: 1.45,
            marginBottom: '48px',
            letterSpacing: '-0.01em',
          }}>
            Lo no procesado.<br />El ojo antes del daño.
          </p>
          <p style={{
            color: '#0A0A0A',
            fontWeight: 300,
            fontSize: 'clamp(15px,1.6vw,18px)',
            lineHeight: 1.85,
            opacity: 0.55,
            marginBottom: '24px',
          }}>
            Antes de las pantallas, antes del exceso de luz artificial.
          </p>
          <p style={{
            color: '#0A0A0A',
            fontWeight: 300,
            fontSize: 'clamp(15px,1.6vw,18px)',
            lineHeight: 1.85,
            opacity: 0.55,
          }}>
            La tensión de la marca: la ejecución es refinada pero el concepto es crudo. Nada está sobreexplicado.
          </p>
          <p style={{
            color: '#0A0A0A',
            fontSize: '11px',
            letterSpacing: '0.12em',
            opacity: 0.18,
            marginTop: '72px',
          }}>
            no todo combina. y se nota.
          </p>
        </div>
        <div style={{
          aspectRatio: '3/4',
          overflow: 'hidden',
        }}>
          <img
            src="/concepto-editorial.jpg"
            alt="Concepto editorial"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </section>
  )
}
