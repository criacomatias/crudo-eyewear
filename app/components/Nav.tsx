'use client'
import { useState, useEffect } from 'react'
import { useCarrito } from '@/app/context/CarritoContext'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { totalCantidad, toggleCarrito } = useCarrito()
  const pathname = usePathname()
  const isProductPage = pathname.startsWith('/coleccion/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = scrolled || isProductPage

  const linkStyle = {
    fontSize: '10px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: isDark ? '#0A0A0A' : '#F5F0E8',
    textDecoration: 'none',
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '28px 48px',
      transition: 'background 0.5s ease, border-color 0.5s ease',
      background: isDark ? 'rgba(242,242,240,0.97)' : 'transparent',
      borderBottom: isDark ? '1px solid rgba(10,10,10,0.06)' : '1px solid transparent',
      backdropFilter: isDark ? 'blur(12px)' : 'none',
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <img
          src="/crudo_logo.svg"
          alt="crudo."
          style={{
            height: '28px',
            width: 'auto',
            filter: 'none',
          }}
        />
      </a>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <a href="/#coleccion" className="nav-link" style={linkStyle}>coleccion</a>
        <a href="/#cristales" className="nav-link" style={linkStyle}>cristales</a>
        <a href="https://instagram.com/crudolentes" target="_blank" rel="noopener noreferrer" className="nav-link" style={linkStyle}>
          instagram
        </a>
        <button
          onClick={toggleCarrito}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isDark ? '#0A0A0A' : '#F5F0E8',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: 0,
            position: 'relative',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {totalCantidad > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#0A0A0A',
              color: '#F2F2F0',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              fontSize: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}>
              {totalCantidad}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
