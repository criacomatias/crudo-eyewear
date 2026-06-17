'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Nav from '@/app/components/Nav'
import { supabase } from '@/app/lib/supabase'
import { useCarrito } from '@/app/context/CarritoContext'
import type { Producto } from '@/app/lib/supabase'

const cristalOptions = [
  { id: '1', nombre: 'Azul 420nm', extra: 0 },
  { id: '2', nombre: 'Amarillo', extra: 0 },
  { id: '3', nombre: 'Rojo', extra: 0 },
  { id: '4', nombre: 'Fotocromático', extra: 45000 },
]

function formatPrecio(precio: number) {
  return precio.toLocaleString('es-AR')
}

export default function ProductoPage() {
  const params = useParams()
  const slug = params.slug as string
  const [producto, setProducto] = useState<Producto | null>(null)
  const [cristalSeleccionado, setCristalSeleccionado] = useState(cristalOptions[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { agregarItem, abrirCarrito } = useCarrito()

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const { data, error: err } = await supabase
          .from('productos')
          .select('*')
          .eq('slug', slug)
          .single()
        if (err) throw err
        setProducto(data)
      } catch (err) {
        setError('Producto no encontrado')
      } finally {
        setLoading(false)
      }
    }
    fetchProducto()
  }, [slug])

  const precioFinal = producto ? producto.precio + cristalSeleccionado.extra : 0

  const handleAgregarCarrito = () => {
    if (!producto) return
    agregarItem({
      id: `${producto.id}-${cristalSeleccionado.id}-${Date.now()}`,
      nombre: producto.nombre,
      cristal: cristalSeleccionado.nombre,
      precio: precioFinal,
      slug: producto.slug,
    })
    abrirCarrito()
  }

  if (loading) return <div style={{ padding: '160px 48px', textAlign: 'center' }}>Cargando...</div>
  if (error || !producto) return <div style={{ padding: '160px 48px', textAlign: 'center' }}>{error || 'Producto no encontrado'}</div>

  return (
    <main style={{ background: '#F2F2F0', minHeight: '100vh' }}>
      <Nav />
      <section style={{ padding: '160px 48px 120px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'start',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={`/${slug}.png`}
              alt={producto.nombre}
              style={{ width: '100%', objectFit: 'contain' }}
            />
          </div>

          <div style={{ paddingTop: '40px' }}>
            <Link href="/#coleccion" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.4, color: '#0A0A0A', textDecoration: 'none' }}>
              ← COLECCIÓN
            </Link>

            <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 800, color: '#0A0A0A', margin: '32px 0 24px', textTransform: 'uppercase', lineHeight: 1.05 }}>
              {producto.nombre}
            </h1>

            <p style={{ fontSize: '18px', color: '#0A0A0A', marginBottom: '32px' }}>
              ${formatPrecio(precioFinal)} ARS
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.85, opacity: 0.6, color: '#0A0A0A', marginBottom: '48px', maxWidth: '420px' }}>
              {producto.descripcion}
            </p>

            <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, color: '#0A0A0A', marginBottom: '16px' }}>
              Elegí tu cristal
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px', marginBottom: '48px' }}>
              {cristalOptions.map((cristal) => (
                <button
                  key={cristal.id}
                  onClick={() => setCristalSeleccionado(cristal)}
                  style={{
                    padding: '14px 20px',
                    border: cristalSeleccionado.id === cristal.id ? '2px solid #0A0A0A' : '1px solid rgba(10,10,10,0.15)',
                    background: cristalSeleccionado.id === cristal.id ? '#0A0A0A' : 'transparent',
                    color: cristalSeleccionado.id === cristal.id ? '#F2F2F0' : '#0A0A0A',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cristal.nombre}
                  {cristal.extra > 0 && (
                    <span style={{ display: 'block', fontSize: '9px', opacity: 0.6, marginTop: '4px', fontWeight: 400 }}>
                      +${formatPrecio(cristal.extra)}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleAgregarCarrito}
              style={{
                width: '100%',
                padding: '20px 24px',
                background: '#0A0A0A',
                color: '#F2F2F0',
                border: 'none',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              AGREGAR AL CARRITO — ${formatPrecio(precioFinal)}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
