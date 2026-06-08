const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

const pasos = [
  {
    n: '01',
    title: 'elegí.',
    desc: 'Revisá la colección, elegí el armazón y el cristal que mejor te representa.',
  },
  {
    n: '02',
    title: 'escribinos.',
    desc: 'Mandanos un mensaje por WhatsApp con tu elección. Te respondemos en minutos.',
  },
  {
    n: '03',
    title: 'recibís.',
    desc: 'Coordinamos entrega en Buenos Aires o enviamos a cualquier punto del país.',
  },
]

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '64px', marginBottom: '80px' }}>
        {pasos.map(({ n, title, desc }) => (
          <div key={n}>
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.15,
              color: '#0A0A0A',
            }}>
              {n}
            </span>
            <h3 style={{
              fontSize: 'clamp(28px,3.5vw,48px)',
              fontWeight: 300,
              letterSpacing: '-0.015em',
              color: '#0A0A0A',
              margin: '14px 0 20px',
              lineHeight: 1,
            }}>
              {title}
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.8,
              opacity: 0.5,
              color: '#0A0A0A',
            }}>
              {desc}
            </p>
          </div>
        ))}
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
