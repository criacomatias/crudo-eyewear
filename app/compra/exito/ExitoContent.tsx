'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ExitoContent() {
  const searchParams = useSearchParams()
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    const paymentId = searchParams.get('payment_id') || searchParams.get('collection_id')
    if (!paymentId) return

    const enviarEmail = async () => {
      try {
        const infoRes = await fetch(`/api/payment-info?id=${paymentId}`)
        const infoData = await infoRes.json()
        if (!infoData.email) return

        const carritoStr = localStorage.getItem('crudo_carrito')
        const items = carritoStr ? JSON.parse(carritoStr) : []
        const total = items.reduce((sum: number, item: any) => sum + item.precio, 0)

        const envioStr = localStorage.getItem('crudo_envio')
        const envio = envioStr ? JSON.parse(envioStr) : null

        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: infoData.email, items, total, paymentId, envio }),
        })

        localStorage.removeItem('crudo_carrito')
        localStorage.removeItem('crudo_envio')
        setEnviado(true)
      } catch (error) {
        console.error('Error enviando confirmacion:', error)
      }
    }

    enviarEmail()
  }, [searchParams])

  return (
    <div>
      <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, color: '#0A0A0A', marginBottom: '24px' }}>pedido confirmado</p>
      <h1 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 300, color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: '24px' }}>Tu pedido está en camino.</h1>
      <p style={{ fontSize: '15px', opacity: 0.5, color: '#0A0A0A', marginBottom: '48px' }}>Te vamos a contactar por WhatsApp para coordinar la entrega.</p>
      <a href="/" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0A0A0A', textDecoration: 'none', border: '1px solid rgba(10,10,10,0.2)', padding: '14px 40px' }}>volver al inicio</a>
    </div>
  )
}