export default function Editorial() {
  return (
    <section style={{
      background: '#F2F2F0',
      padding: '0 48px 160px',
      borderTop: '1px solid rgba(10,10,10,0.06)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '3px',
      }}>
        <div style={{
          gridRow: '1 / 3',
          background: '#E4E4E2',
          overflow: 'hidden',
          minHeight: '960px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.12, color: '#0A0A0A' }}>
            foto 1
          </span>
        </div>
        {[2, 3, 4, 5].map((n) => (
          <div key={n} style={{
            background: '#E4E4E2',
            overflow: 'hidden',
            minHeight: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.12, color: '#0A0A0A' }}>
              foto {n}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
