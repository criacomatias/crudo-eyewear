'use client'
import { useState, useEffect } from 'react'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent('Hola! Quiero comprar un par de lentes CRUDO.')}
      target="_blank"
      rel="noopener noreferrer"
      className="float-cta"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 1000,
        background: '#0A0A0A',
        color: '#F5F0E8',
        padding: '14px 28px',
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.4s ease, transform 0.4s ease, background 0.2s ease',
      }}
    >
      consultar →
    </a>
  )
}
