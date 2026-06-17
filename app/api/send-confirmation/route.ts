import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderItem {
  nombre: string
  cristal: string
  precio: number
}

export async function POST(request: Request) {
  try {
    const { email, items, total } = await request.json()

    if (!email || !Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const itemsHtml = (items as OrderItem[])
      .map((item) => `<li>${item.nombre} — ${item.cristal} — $${item.precio.toLocaleString('es-AR')}</li>`)
      .join('')

    const { error } = await resend.emails.send({
      from: 'CRUDO <onboarding@resend.dev>', // ⚠️ pendiente: definir dominio propio o SendGrid antes del 20
      to: email,
      subject: 'Tu pedido CRUDO está confirmado',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="font-size: 24px; font-weight: 300;">Tu pedido está confirmado.</h1>
          <p>Gracias por tu compra. Esto es lo que pediste:</p>
          <ul>${itemsHtml}</ul>
          <p style="font-weight: 700;">Total: $${total.toLocaleString('es-AR')} ARS</p>
          <p>Te vamos a contactar por WhatsApp para coordinar la entrega.</p>
          <p style="opacity: 0.5; font-size: 12px; margin-top: 32px;">CRUDO — Buenos Aires, Argentina</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Error enviando email' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('send-confirmation error:', error)
    return NextResponse.json({ error: 'Error enviando email' }, { status: 500 })
  }
}