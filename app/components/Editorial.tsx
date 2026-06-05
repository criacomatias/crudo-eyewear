export default function Editorial() {
  return (
    <section className="grid grid-cols-3 gap-[2px] border-t-2 border-[#0A0A0A]">
      <div className="row-span-2 bg-[#111] overflow-hidden group" style={{ minHeight: '960px' }}>
        <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '960px' }}>
          <span className="text-[10px] tracking-[0.18em] uppercase opacity-15 text-[#F5F0E8]">foto 1</span>
        </div>
      </div>
      {[2, 3, 4, 5].map((n) => (
        <div key={n} className="bg-[#111] overflow-hidden group" style={{ minHeight: '480px' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] tracking-[0.18em] uppercase opacity-15 text-[#F5F0E8]">foto {n}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
