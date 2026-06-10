'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import type { Producto, Cristal } from '@/app/lib/supabase'

const cristalOptions = [
  { id: '1', nombre: 'Azul 420nm', nm: '420', color: '#4A90E2' },
  { id: '2', nombre: 'Amarillo', nm: 'amarillo', color: '#F5D547' },
  { id: '3', nombre: 'Rojo', nm: 'rojo', color: '#E74C3C' },
  { id: '4', nombre: 'Fotocromático', nm: 'fotocromatico', color: '#95A5A6' },
]

const whatsappNumber = '5491125132012'

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
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducto()
  }, [slug])

  const handleWhatsApp = () => {
    const mensaje = encodeURIComponent(
      `Hola, quiero ${producto?.nombre} con cristal ${cristalSeleccionado.nombre}`
    )
    const link = `https://wa.me/${whatsappNumber}?text=${mensaje}`
    window.open(link, '_blank')
  }

  if (loading) return <div style={{ padding: '160px 48px', textAlign: 'center' }}>Cargando...</div>
  if (error || !producto) return <div style={{ padding: '160px 48px', textAlign: 'center' }}>{error || 'Producto no encontrado'}</div>

  return (
    <main style={{ background: '#F2F2F0', minHeight: '100vh' }}>
      <section style={{ padding: '120px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          gap: '80px',
          maxWidth: '1600px',
          margin: '0 auto',
          alignItems: 'start',
        }}>
          {/* Imagen del producto */}
          <div style={{
            aspectRatio: '3/4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <img
              src={`/${slug}.png`}
              alt={producto.nombre}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Información del producto */}
          <div style={{ paddingTop: '40px' }}>
            {/* Línea */}
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.3,
              color: '#0A0A0A',
              marginBottom: '20px',
            }}>
            {producto.linea === 'basic' ? 'basic' : 'premium'}
            </p>

            {/* Nombre */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#0A0A0A',
              margin: '0 0 40px',
              lineHeight: 1.1,
              textTransform: 'uppercase',
            }}>
              {producto.nombre}
            </h1>

            {/* Precio */}
            <p style={{
              fontSize: '18px',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: '#0A0A0A',
              marginBottom: '48px',
            }}>
              ${formatPrecio(producto.precio)} ARS
            </p>

            {/* Descripción */}
            <p style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.85,
              opacity: 0.6,
              color: '#0A0A0A',
              marginBottom: '56px',
              maxWidth: '420px',
            }}>
              {producto.descripcion}
            </p>

            {/* Selector de cristal */}
            <div style={{ marginBottom: '56px' }}>
              <p style={{
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                opacity: 0.3,
                color: '#0A0A0A',
                marginBottom: '20px',
              }}>
                Elegí tu cristal
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }}>
                {cristalOptions.map((cristal) => (
                  <button
                    key={cristal.id}
                    onClick={() => setCristalSeleccionado(cristal)}
                    className="cristal-btn"
                    style={{
                      padding: '14px 20px',
                      border: cristalSeleccionado.id === cristal.id ? '2px solid #0A0A0A' : '1px solid rgba(10,10,10,0.15)',
                      background: cristalSeleccionado.id === cristal.id ? '#0A0A0A' : 'transparent',
                      color: cristalSeleccionado.id === cristal.id ? '#F2F2F0' : '#0A0A0A',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                      outline: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {cristal.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón CTA */}
            <button
              onClick={handleWhatsApp}
              className="cta-btn-product"
              style={{
                width: '100%',
                padding: '18px 24px',
                background: '#0A0A0A',
                color: '#F2F2F0',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              Quiero este →
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
