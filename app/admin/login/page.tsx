'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Contrasena incorrecta')
      }
    } catch (err) {
      setError('Error de conexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ background: '#F2F2F0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '360px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', marginBottom: '24px', textAlign: 'center' }}>
          CRUDO ADMIN
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contrasena"
          style={{
            width: '100%',
            padding: '16px 20px',
            border: '1px solid rgba(10,10,10,0.15)',
            background: 'transparent',
            fontSize: '14px',
            color: '#0A0A0A',
            marginBottom: '16px',
            borderRadius: '4px',
          }}
        />
        {error && (
          <p style={{ fontSize: '12px', color: '#B00020', marginBottom: '16px' }}>{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            background: '#0A0A0A',
            color: '#F2F2F0',
            border: 'none',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          {loading ? 'entrando...' : 'entrar'}
        </button>
      </form>
    </main>
  )
}
