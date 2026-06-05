export default function Cierre() {
  return (
    <>
      <section className="bg-[#3B1F0A] py-40 px-12 text-center">
        <p className="text-[#F5F0E8] font-light tracking-[0.06em] leading-[1.25] text-[clamp(24px,4.5vw,56px)] max-w-3xl mx-auto">
          no todo combina.<br />y se nota.
        </p>
        <span className="block text-[11px] tracking-[0.28em] uppercase opacity-45 text-[#F5F0E8] mt-16">
          crudo. eyewear
        </span>
      </section>

      <footer className="bg-[#0A0A0A] px-12 py-14 flex justify-between items-center border-t border-[#F5F0E8]/5">
        <span className="text-[11px] tracking-[0.2em] uppercase opacity-40 text-[#F5F0E8]">
          crudo. eyewear
        </span>
        <div className="flex gap-10">
          <a
            href="https://instagram.com/crudolentes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.14em] uppercase text-[#F5F0E8] opacity-40 hover:opacity-100 transition-opacity"
          >
            @crudolentes
          </a>
        </div>
        <span className="text-[11px] tracking-[0.14em] uppercase opacity-25 text-[#F5F0E8]">
          Buenos Aires 2025
        </span>
      </footer>
    </>
  )
}
