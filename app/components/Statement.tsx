export default function Statement() {
  return (
    <section style={{ background: '#F2F2F0', padding: '140px 48px', textAlign: 'center' }}>
      <div style={{
        width: '1px',
        height: '72px',
        background: 'rgba(10,10,10,0.1)',
        margin: '0 auto 88px',
      }} />
      <p
        className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700"
        style={{
          color: '#0A0A0A',
          fontWeight: 300,
          letterSpacing: '-0.025em',
          lineHeight: 1.02,
          fontSize: 'clamp(44px,8vw,128px)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        Lo que usás dice{' '}
        <br />
        lo que no decís.
      </p>
      <div style={{
        width: '1px',
        height: '72px',
        background: 'rgba(10,10,10,0.1)',
        margin: '88px auto 0',
      }} />
    </section>
  )
}
