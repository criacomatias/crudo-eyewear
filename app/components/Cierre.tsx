const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

export default function Cierre() {
  return (
    <>
      <section style={{
        position: 'relative',
        background: '#3B1F0A',
        padding: '160px 48px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Marca de agua CRUDO en el fondo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          <span style={{
            fontSize: 'clamp(160px,28vw,420px)',
            fontWeight: 300,
            letterSpacing: '-0.05em',
            color: '#F5F0E8',
            opacity: 0.04,
            lineHeight: 1,
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}>
            CRUDO
          </span>
        </div>

        {/* Contenido */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            opacity: 0.3,
            marginBottom: '72px',
          }}>
            coleccion 2026 — buenos aires
          </p>

          <p
            className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700"
            style={{
              color: '#F5F0E8',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              fontSize: 'clamp(40px,6.5vw,88px)',
              maxWidth: '900px',
              margin: '0 auto 80px',
            }}
          >
            no todo combina.<br />y se nota.
          </p>

          <a
            href={'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent('Hola, quiero conocer la coleccion CRUDO 2026.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] tracking-[0.22em] uppercase text-[#F5F0E8] no-underline border border-[#F5F0E8]/25 px-10 py-[14px] hover:border-[#F5F0E8]/60 hover:bg-[#F5F0E8]/5 transition-all duration-400"
          >
            ver coleccion
          </a>

          <div style={{
            width: '1px',
            height: '72px',
            background: 'rgba(245,240,232,0.1)',
            margin: '80px auto 0',
          }} />
        </div>
      </section>

      <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(245,240,232,0.05)' }}>
        {/* Cuerpo del footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '48px',
          padding: '72px 48px 64px',
        }}>
          {/* Col 1: Marca */}
          <div>
            <img
              src="/crudo_logo.svg"
              alt="crudo."
              style={{ height: '22px', width: 'auto', marginBottom: '24px', opacity: 0.9 }}
            />
            <p style={{
              fontSize: '12px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#F5F0E8',
              opacity: 0.3,
            }}>
              Lentes con criterio.<br />Buenos Aires, Argentina.
            </p>
          </div>

          {/* Col 2: Navegación */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '9px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              opacity: 0.2,
              marginBottom: '28px',
            }}>
              navegar
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'coleccion', href: '#coleccion' },
                { label: 'cristales', href: '#cristales' },
                { label: 'lineas', href: '#lineas' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[11px] tracking-[0.12em] uppercase text-[#F5F0E8]/30 hover:text-[#F5F0E8]/80 transition-all duration-300 no-underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Contacto */}
          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontSize: '9px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              opacity: 0.2,
              marginBottom: '28px',
            }}>
              contacto
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
              <a
                href="https://instagram.com/crudolentes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.12em] uppercase text-[#F5F0E8]/30 hover:text-[#F5F0E8]/80 transition-all duration-300 no-underline"
              >
                instagram
              </a>
              <a
                href={'https://wa.me/' + whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.12em] uppercase text-[#F5F0E8]/30 hover:text-[#F5F0E8]/80 transition-all duration-300 no-underline"
              >
                whatsapp
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px',
          borderTop: '1px solid rgba(245,240,232,0.04)',
        }}>
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            opacity: 0.15,
          }}>
            © 2026 Crudo Eyewear
          </span>
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            opacity: 0.15,
          }}>
            Buenos Aires, Argentina
          </span>
        </div>
      </footer>
    </>
  )
}
