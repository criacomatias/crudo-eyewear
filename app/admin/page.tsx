import Link from 'next/link'

export default function AdminHome() {
  return (
    <main style={{ background: '#F2F2F0', minHeight: '100vh', padding: '80px 48px' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', marginBottom: '48px' }}>
        CRUDO ADMIN
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px' }}>
        <Link href="/admin/pedidos" style={{ padding: '20px', border: '1px solid rgba(10,10,10,0.15)', textDecoration: 'none', color: '#0A0A0A', fontSize: '14px', fontWeight: 600, background: 'white' }}>
          Ver pedidos {String.fromCharCode(8594)}
        </Link>
      </div>
    </main>
  )
}
