export default function Concepto() {
  return (
    <section className="bg-[#0A0A0A] px-12 py-36 grid grid-cols-2 gap-28 items-center border-t border-[#F5F0E8]/5">

      {/* Texto */}
      <div>
        <p className="text-[10px] tracking-[0.22em] uppercase opacity-40 text-[#F5F0E8] mb-14">
          01 — concepto
        </p>
        <p className="text-[#F5F0E8] font-light text-[clamp(15px,1.8vw,19px)] leading-[1.75] opacity-80">
          Lo no procesado.<br />El ojo antes del daño.
        </p>
        <p className="text-[#F5F0E8] font-light text-[clamp(15px,1.8vw,19px)] leading-[1.75] opacity-80 mt-6">
          Antes de las pantallas, antes del exceso de luz artificial.
        </p>
        <p className="text-[#F5F0E8] font-light text-[clamp(15px,1.8vw,19px)] leading-[1.75] opacity-80 mt-6">
          La tensión de la marca: la ejecución es refinada pero el concepto es crudo. Nada está sobreexplicado. Nada está decorado sin razón.
        </p>
        <p className="text-[#F5F0E8] text-[13px] tracking-[0.1em] opacity-35 mt-10">
          no todo combina. y se nota.
        </p>
      </div>

      {/* Imagen */}
      <div className="aspect-[3/4] bg-[#161616] flex items-center justify-center overflow-hidden">
        {/* <img src="/img/editorial-concepto.jpg" alt="CRUDO concepto" className="w-full h-full object-cover" /> */}
        <span className="text-[10px] tracking-[0.18em] uppercase opacity-20 text-[#F5F0E8]">
          foto editorial
        </span>
      </div>

    </section>
  )
}