export default function ErrorPage() {
  return (
    <main style={{ background: '#F2F2F0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px' }}>
      <div>
        <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, color: '#0A0A0A', marginBottom: '24px' }}>error en el pago</p>
        <h1 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 300, color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: '24px' }}>Algo salió mal.</h1>
        <p style={{ fontSize: '15px', opacity: 0.5, color: '#0A0A0A', marginBottom: '48px' }}>Podés intentarlo de nuevo o contactarnos por WhatsApp.</p>
        <a href="/" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0A0A0A', textDecoration: 'none', border: '1px solid rgba(10,10,10,0.2)', padding: '14px 40px' }}>volver al inicio</a>
      </div>
    </main>
  )
}