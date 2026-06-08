'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkStyle = {
    fontSize: '10px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: scrolled ? '#0A0A0A' : '#F5F0E8',
    textDecoration: 'none',
  }

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
        padding: '28px 48px',
        transition: 'background 0.5s ease, border-color 0.5s ease',
        background: scrolled ? 'rgba(242,242,240,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(10,10,10,0.06)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <a href="/" style={{ textDecoration: 'none' }}>
        <img src="/crudo_logo.svg" alt="crudo." style={{ height: '28px', width: 'auto' }} />
      </a>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <a href="#coleccion" className="nav-link" style={linkStyle}>coleccion</a>
        <a href="#cristales" className="nav-link" style={linkStyle}>cristales</a>
        <a
          href="https://instagram.com/crudolentes"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          style={linkStyle}
        >
          instagram
        </a>
      </div>
    </nav>
  )
}
