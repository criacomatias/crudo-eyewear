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
          Buenos Aires - Primera Coleccion 2026
        </p>
      </div>

    </section>
  )
}
