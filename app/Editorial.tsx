export default function Editorial() {
  const fotos = [
    { id: 1, grande: true },
    { id: 2, grande: false },
    { id: 3, grande: false },
    { id: 4, grande: false },
    { id: 5, grande: false },
  ]

  return (
    <section className="grid grid-cols-3 gap-[2px] border-t-2 border-[#0A0A0A]">

      {/* Foto grande — ocupa 2 filas */}
      <div className="row-span-2 bg-[#111] overflow-hidden group" style={{ minHeight: '480px' }}>
        {/* <img src="/img/editorial-1.jpg" alt="editorial" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" /> */}
        <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '960px' }}>
          <span className="text-[10px] tracking-[0.18em] uppercase opacity-15 text-[#F5F0E8]">foto 1</span>
        </div>
      </div>

      {/* Fotos pequeñas */}
      {[2, 3, 4, 5].map((n) => (
        <div key={n} className="bg-[#111] overflow-hidden group" style={{ minHeight: '480px' }}>
          {/* <img src={`/img/editorial-${n}.jpg`} alt="editorial" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" /> */}
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] tracking-[0.18em] uppercase opacity-15 text-[#F5F0E8]">foto {n}</span>
          </div>
        </div>
      ))}

    </section>
  )
}