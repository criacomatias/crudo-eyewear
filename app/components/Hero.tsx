'use client'

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-end justify-center">

      <div className="absolute inset-0 bg-[#0A0A0A]">
        <iframe
          src="https://www.youtube.com/embed/zMaEeV2Nf1c?autoplay=1&mute=1&loop=1&playlist=zMaEeV2Nf1c&controls=0&showinfo=0&rel=0&modestbranding=1"
          className="absolute inset-0 w-full h-full border-none pointer-events-none"
          style={{ transform: 'scale(1.15)' }}
          allow="autoplay; encrypted-media"
          allowFullScreen={true}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]/90 pointer-events-none" />

      <div className="relative z-10 text-center pb-20">
        <img
          src="/crudo_logo.svg"
          alt="crudo. eyewear"
          className="w-[clamp(280px,40vw,600px)] mx-auto"
        />
        <p className="text-[#F5F0E8] text-[11px] tracking-[0.18em] uppercase opacity-40 mt-8">
          Lo que usás dice lo que no decís.
        </p>
        <a
          href="#coleccion"
          className="hero-cta"
          style={{
            display: 'inline-block',
            marginTop: '40px',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            textDecoration: 'none',
            border: '1px solid rgba(245,240,232,0.28)',
            padding: '14px 40px',
          }}
        >
          explorar colección
        </a>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontSize: '7px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#F5F0E8',
          opacity: 0.25,
        }}>scroll</span>
        <div style={{
          width: '1px',
          height: '44px',
          background: 'rgba(245,240,232,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div className="scroll-dot" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent, rgba(245,240,232,0.75), transparent)',
          }} />
        </div>
      </div>

    </section>
  )
}
