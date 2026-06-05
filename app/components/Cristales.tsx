import type { Cristal } from '../lib/supabase'

export default function Cristales({ cristales }: { cristales: Cristal[] }) {
  return (
    <section className="bg-[#0A0A0A] px-12 py-36 border-t border-[#F5F0E8]/5">
      <p className="text-[10px] tracking-[0.22em] uppercase opacity-40 text-[#F5F0E8] mb-8">
        02 -- cristales
      </p>
      <h2 className="text-[#F5F0E8] font-light tracking-[0.06em] leading-[1.1] text-[clamp(28px,4vw,48px)] mb-16">
        cuatro cristales.<br />una funcion.
      </h2>
      <div className="grid grid-cols-4 gap-[2px]">
        {cristales.map((cristal) => (
          <div key={cristal.id} className="bg-[#0f0f0f] border border-[#F5F0E8]/[0.04] p-12">
            <div
              className="w-8 h-8 rounded-full mb-8"
              style={{ backgroundColor: cristal.color_hex }}
            />
            <div className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#F5F0E8] mb-4">
              {cristal.nombre}
            </div>
            <div className="text-[10px] tracking-[0.18em] opacity-40 text-[#F5F0E8] mb-6">
              {cristal.nm}
            </div>
            <div className="text-[13px] font-light tracking-[0.06em] leading-[1.6] opacity-65 text-[#F5F0E8]">
              {cristal.uso}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
