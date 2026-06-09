const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

const trust = [
  'envíos a todo el país',
  'pagá en cuotas',
  'cambios y devoluciones',
  'atención personalizada',
]

export default function ComoComprar() {
  return (
    <section style={{
      background: '#F2F2F0',
      padding: '140px 48px',
      borderTop: '1px solid rgba(10,10,10,0.06)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '100px',
      }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0.3,
          color: '#0A0A0A',
        }}>
          cómo comprar
        </p>
        <a
          href={'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent('Hola! Quiero comprar un par de lentes CRUDO.')}
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
          ir a whatsapp →
        </a>
      </div>

      {/* Señales de confianza */}
      <div style={{
        display: 'flex',
        gap: '48px',
        paddingTop: '48px',
        borderTop: '1px solid rgba(10,10,10,0.06)',
        flexWrap: 'wrap',
      }}>
        {trust.map((item) => (
          <span key={item} style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.28,
            color: '#0A0A0A',
          }}>
            — {item}
          </span>
        ))}
      </div>
    </section>
  )
}
