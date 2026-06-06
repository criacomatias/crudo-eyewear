'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        transition: 'background 0.4s ease',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(245,240,232,0.06)' : 'none',
      }}
    >
      <a href="/" style={{ textDecoration: 'none' }}>
        <img src="/crudo_logo.svg" alt="crudo." style={{ height: '28px', width: 'auto' }} />
      </a>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <a
          href="#coleccion"
          style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            textDecoration: 'none',
            opacity: 0.6,
          }}
        >
          coleccion
        </a>
        <a
          href="#cristales"
          style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            textDecoration: 'none',
            opacity: 0.6,
          }}
        >
          cristales
        </a>
        <a
          href="https://instagram.com/crudolentes"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            textDecoration: 'none',
            opacity: 0.6,
          }}
        >
          instagram
        </a>
      </div>
    </nav>
  )
}
