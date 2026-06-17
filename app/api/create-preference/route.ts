import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface CartItem {
  slug: string
  cristal: string
}

export async function POST(request: Request) {
  try {
    const { items } = await request.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
    }

    const resolvedItems = await Promise.all(
      (items as CartItem[]).map(async (item) => {
        const { data: producto, error: prodError } = await supabase
          .from('productos')
          .select('nombre, slug, precio, activo')
          .eq('slug', item.slug)
          .single()

        if (prodError || !producto || !producto.activo) {
          throw new Error(`Producto inválido: ${item.slug}`)
        }

        const { data: cristal, error: cristalError } = await supabase
          .from('cristales')
          .select('nombre, precio_adicional, activo')
          .eq('nombre', item.cristal)
          .single()

        if (cristalError || !cristal || !cristal.activo) {
          throw new Error(`Cristal inválido: ${item.cristal}`)
        }

        return {
          id: producto.slug,
          title: `CRUDO ${producto.nombre} — ${cristal.nombre}`,
          quantity: 1,
          unit_price: producto.precio + cristal.precio_adicional,
          currency_id: 'ARS',
        }
      })
    )

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: resolvedItems,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/compra/exito`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/compra/error`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/compra/pendiente`,
        },
        auto_return: 'approved',
      },
    })

    return NextResponse.json({ id: result.id, init_point: result.init_point })
  } catch (error) {
    console.error('MP Error:', error)
    return NextResponse.json({ error: 'Error creando preferencia' }, { status: 500 })
  }
}