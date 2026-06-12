import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(request: Request) {
  try {
    const { items } = await request.json()

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.slug,
          title: `CRUDO ${item.nombre} — ${item.cristal}`,
          quantity: 1,
          unit_price: item.precio,
          currency_id: 'ARS',
        })),
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