export default function Concepto() {
  return (
    <section style={{ background: '#F2F2F0', padding: '160px 48px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '120px',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <div>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            opacity: 0.3,
            color: '#0A0A0A',
            marginBottom: '56px',
          }}>
            concepto
          </p>
          <p style={{
            color: '#0A0A0A',
            fontWeight: 300,
            fontSize: 'clamp(20px,2.8vw,32px)',
            lineHeight: 1.5,
            marginBottom: '40px',
          }}>
            Lo no procesado.<br />El ojo antes del dano.
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
            La tension de la marca: la ejecucion es refinada pero el concepto es crudo. Nada esta sobreexplicado.
          </p>
          <p style={{
            color: '#0A0A0A',
            fontSize: '11px',
            letterSpacing: '0.1em',
            opacity: 0.2,
            marginTop: '72px',
          }}>
            no todo combina. y se nota.
          </p>
        </div>
        <div style={{
          aspectRatio: '3/4',
          background: '#E6E6E4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: 0.15,
            color: '#0A0A0A',
          }}>
            foto editorial
          </span>
        </div>
      </div>
    </section>
  )
}
