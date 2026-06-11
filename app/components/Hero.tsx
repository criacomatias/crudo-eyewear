'use client'

import { useState, useEffect } from 'react'

const VIDEO_URL = "https://vnkaolrezbkzbwyrmlgn.supabase.co/storage/v1/object/public/media/Scene%20Builder%20-%20First%20person%20POV%20walking%20through%20Buenos%20Aires%20at%20night_%20Harsh%20neon%20lights%20and%20c.mp4"

const slides = [
  { type: 'video', src: VIDEO_URL },
  { type: 'image', src: '/hero-editorial.jpg' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>

      {slides.map((slide, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: current === i ? 1 : 0,
          transition: 'opacity 1.2s ease',
          zIndex: current === i ? 1 : 0,
        }}>
          {slide.type === 'video' ? (
            <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <img src={slide.src} alt="CRUDO" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          )}
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, transparent 40%, rgba(10,10,10,0.7) 100%)', zIndex: 2 }} />

      <div style={{ position: 'absolute', bottom: '80px', right: '60px', textAlign: 'right', zIndex: 10 }}>

        <p style={{ color: '#F5F0E8', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.5, marginTop: '16px' }}>
          Lo que usas dice lo que no decis.
        </p>
        <a href="#coleccion" style={{ display: 'inline-block', marginTop: '32px', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F5F0E8', textDecoration: 'none', border: '1px solid rgba(245,240,232,0.35)', padding: '14px 40px' }}>
          explorar coleccion
        </a>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '8px' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? '24px' : '6px',
            height: '6px',
            borderRadius: '3px',
            background: '#F5F0E8',
            opacity: i === current ? 0.9 : 0.3,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            padding: 0,
          }} />
        ))}
      </div>

    </section>
  )
}
