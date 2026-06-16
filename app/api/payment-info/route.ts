import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get('id')

    if (!paymentId) {
      return NextResponse.json({ error: 'Falta payment id' }, { status: 400 })
    }

    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    })

    const data = await res.json()

    return NextResponse.json({ email: data.payer?.email || null })
  } catch (error) {
    console.error('Payment info error:', error)
    return NextResponse.json({ error: 'Error obteniendo info de pago' }, { status: 500 })
  }
}