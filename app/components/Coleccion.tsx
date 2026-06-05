import type { Producto } from '../lib/supabase'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP

function formatPrecio(precio: number) {
  return precio.toLocaleString('es-AR')
}

function getWhatsAppLink(producto: Producto) {
  const mensaje = encodeURIComponent(
    'Hola, quiero comprar ' + producto.nombre + ' - $' + formatPrecio(producto.precio) + ' ARS'
  )
  return 'https://wa.me/' + whatsapp + '?text=' + mensaje
}

export default function Coleccion({ productos }: { productos: Producto[] }) {
  return (
    <section className="bg-[#0A0A0A] px-12 py-28" id="coleccion">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-[#F5F0E8] font-light tracking-[0.06em] leading-[1.1] text-[clamp(28px,4vw,48px)]">
          primera<br />coleccion.
        </h2>
        <div className="text-right text-[11px] tracking-[0.14em] opacity-45 leading-loose text-[#F5F0E8]">
          linea basic - $65.000 ars<br />
          linea premium - $120.000 ars<br />
          buenos aires, 2025
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[2px]">
        {productos.map((producto) => (
          <a
            key={producto.id}
            href={getWhatsAppLink(producto)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-[#111] aspect-[3/4] overflow-hidden flex flex-col justify-end"
          >
            {producto.imagen_url ? (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[#161616] flex items-center justify-center">
                <span className="text-[10px] tracking-[0.18em] uppercase opacity-20 text-[#F5F0E8]">
                  {producto.nombre}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 to-transparent pointer-events-none" />
            <div className="relative z-10 p-6 flex justify-between items-end">
              <div>
                <div className="text-[#F5F0E8] text-[14px] font-light tracking-[0.12em]">
                  {producto.nombre}.
                </div>
                <div className="text-[#F5F0E8] text-[9px] tracking-[0.2em] uppercase opacity-45 mt-1">
                  {producto.linea}
                </div>
              </div>
              <div className="text-[#F5F0E8] text-[12px] tracking-[0.1em] opacity-70">
                ${formatPrecio(producto.precio)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
