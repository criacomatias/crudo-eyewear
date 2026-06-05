import type { Producto } from '../lib/supabase'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

export default function Lineas({ productos }: { productos: Producto[] }) {
  const basic = productos.filter((p) => p.linea === 'basic')
  const premium = productos.filter((p) => p.linea === 'premium')

  return (
    <section className="bg-[#0A0A0A] px-12 py-36 border-t border-[#F5F0E8]/5">
      <p className="text-[10px] tracking-[0.22em] uppercase opacity-40 text-[#F5F0E8] mb-16">
        03 -- lineas
      </p>
      <div className="grid grid-cols-2 gap-[2px]">
        <div className="bg-[#0f0f0f] border border-[#F5F0E8]/[0.04] p-16 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="text-[10px] font-medium tracking-[0.28em] uppercase opacity-50 text-[#F5F0E8]">
              Linea Basic
            </div>
            <div className="text-[#F5F0E8] font-light tracking-[0.04em] leading-none mt-6 text-[clamp(36px,5vw,64px)]">
              $65.000 <span className="text-[14px] opacity-40 tracking-[0.1em]">ars</span>
            </div>
            <div className="text-[11px] font-light tracking-[0.12em] opacity-45 leading-loose text-[#F5F0E8] mt-10">
              {basic.map((p) => (
                <div key={p.id}>{p.nombre} -- {p.descripcion}</div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <a
              href={'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent('Hola, quiero ver la linea Basic de CRUDO.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.22em] uppercase text-[#F5F0E8] border-b border-[#F5F0E8]/30 pb-1 hover:border-[#F5F0E8] transition-colors"
            >
              ver armazones
            </a>
          </div>
        </div>
        <div className="bg-[#0f0f0f] border border-[#F5F0E8]/[0.04] p-16 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="text-[10px] font-medium tracking-[0.28em] uppercase opacity-50 text-[#F5F0E8]">
              Linea Premium
            </div>
            <div className="text-[#F5F0E8] font-light tracking-[0.04em] leading-none mt-6 text-[clamp(36px,5vw,64px)]">
              $120.000 <span className="text-[14px] opacity-40 tracking-[0.1em]">ars</span>
            </div>
            <div className="text-[11px] font-light tracking-[0.12em] opacity-45 leading-loose text-[#F5F0E8] mt-10">
              {premium.map((p) => (
                <div key={p.id}>{p.nombre} -- {p.descripcion}</div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <a
              href={'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent('Hola, quiero ver la linea Premium de CRUDO.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.22em] uppercase text-[#F5F0E8] border-b border-[#F5F0E8]/30 pb-1 hover:border-[#F5F0E8] transition-colors"
            >
              ver armazones
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
