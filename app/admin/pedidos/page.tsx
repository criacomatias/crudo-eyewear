export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '@/app/lib/supabaseAdmin'

function formatPrecio(precio: number) {
  return precio.toLocaleString('es-AR')
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleString('es-AR')
}

export default async function PedidosPage() {
  const { data: pedidos, error } = await supabaseAdmin
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main style={{ background: '#F2F2F0', minHeight: '100vh', padding: '80px 48px' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', marginBottom: '48px' }}>
        CRUDO ADMIN - PEDIDOS
      </p>

      {error && <p style={{ color: '#B00020' }}>Error cargando pedidos.</p>}

      {pedidos && pedidos.length === 0 && (
        <p style={{ opacity: 0.5, color: '#0A0A0A' }}>Todavia no hay pedidos.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
        {pedidos?.map((pedido: any) => (
          <div key={pedido.id} style={{ padding: '24px', border: '1px solid rgba(10,10,10,0.12)', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', opacity: 0.5, color: '#0A0A0A' }}>{formatFecha(pedido.created_at)}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0A0A0A' }}>${formatPrecio(pedido.total)}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#0A0A0A', marginBottom: '8px' }}>
              {pedido.email_cliente || 'Sin email'}
            </p>
            <div style={{ fontSize: '12px', opacity: 0.7, color: '#0A0A0A' }}>
              {Array.isArray(pedido.items) && pedido.items.map((item: any, i: number) => (
                <div key={i}>{item.nombre} - {item.cristal} - ${formatPrecio(item.precio)}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
