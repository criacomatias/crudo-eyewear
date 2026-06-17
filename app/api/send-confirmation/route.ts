import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/app/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, items, total, paymentId } = await request.json()

    try {
      await supabase.from('pedidos').insert({
        email_cliente: email,
        items,
        total,
        payment_id: paymentId || null,
      })
    } catch (dbError) {
      console.error('Error guardando pedido:', dbError)
    }

    const itemsHtml = items
      .map((item: any) => `<li>${item.nombre} - ${item.cristal} - $${item.precio.toLocaleString('es-AR')}</li>`)
      .join('')

    await resend.emails.send({
      from: 'CRUDO <onboarding@resend.dev>',
      to: email,
      subject: 'Tu pedido CRUDO esta confirmado',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="font-size: 24px; font-weight: 300;">Tu pedido esta confirmado.</h1>
          <p>Gracias por tu compra. Esto es lo que pediste:</p>
          <ul>${itemsHtml}</ul>
          <p style="font-weight: 700;">Total: $${total.toLocaleString('es-AR')} ARS</p>
          <p>Te vamos a contactar por WhatsApp para coordinar la entrega.</p>
          <p style="opacity: 0.5; font-size: 12px; margin-top: 32px;">CRUDO - Buenos Aires, Argentina</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Error enviando email' }, { status: 500 })
  }
}
