import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/app/lib/supabase'
import { rateLimit, getClientIp } from '@/app/lib/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY)

interface Envio {
  direccion: string
  codigoPostal: string
  provincia: string
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { ok, retryAfter } = rateLimit(`send-confirmation:${ip}`, {
      limit: 10,
      windowMs: 60 * 1000,
    })

    if (!ok) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Esperá un momento.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    const { email, items, total, paymentId, envio } = (await request.json()) as {
      email: string
      items: any[]
      total: number
      paymentId?: string
      envio?: Envio
    }

    if (!paymentId) {
      return NextResponse.json({ error: 'Falta payment id' }, { status: 400 })
    }

    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    })

    if (!mpRes.ok) {
      console.error('Pago inexistente o error MP:', paymentId, mpRes.status)
      return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 })
    }

    const pago = await mpRes.json()

    if (pago.status !== 'approved') {
      console.error('Pago no aprobado:', paymentId, pago.status)
      return NextResponse.json({ error: 'Pago no aprobado' }, { status: 403 })
    }

    const montoReal = Number(pago.transaction_amount)
    if (Math.abs(montoReal - Number(total)) > 1) {
      console.error('Monto no coincide. Cliente dijo:', total, 'MP cobró:', montoReal)
      return NextResponse.json({ error: 'Monto inválido' }, { status: 400 })
    }

    const emailReal = pago.payer?.email || email

    const { data: existente } = await supabase
      .from('pedidos')
      .select('id')
      .eq('payment_id', paymentId)
      .maybeSingle()

    if (existente) {
      return NextResponse.json({ success: true, duplicated: true })
    }

    try {
      await supabase.from('pedidos').insert({
        email_cliente: emailReal,
        items,
        total: montoReal,
        payment_id: paymentId,
        direccion_envio: envio?.direccion || null,
        codigo_postal: envio?.codigoPostal || null,
        provincia: envio?.provincia || null,
      })
    } catch (dbError) {
      console.error('Error guardando pedido:', dbError)
    }

    const itemsHtml = items
      .map((item: any) => `<li>${item.nombre} - ${item.cristal} - $${item.precio.toLocaleString('es-AR')}</li>`)
      .join('')

    const envioHtml = envio
      ? `<p>Envío a: ${envio.direccion}, ${envio.provincia} (CP ${envio.codigoPostal})</p>`
      : ''

    await resend.emails.send({
      from: 'CRUDO <onboarding@resend.dev>',
      to: emailReal,
      subject: 'Tu pedido CRUDO esta confirmado',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="font-size: 24px; font-weight: 300;">Tu pedido esta confirmado.</h1>
          <p>Gracias por tu compra. Esto es lo que pediste:</p>
          <ul>${itemsHtml}</ul>
          <p style="font-weight: 700;">Total: $${montoReal.toLocaleString('es-AR')} ARS</p>
          ${envioHtml}
          <p>Te vamos a contactar por WhatsApp para coordinar la entrega.</p>
          <p style="opacity: 0.5; font-size: 12px; margin-top: 32px;">CRUDO - Buenos Aires, Argentina</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send confirmation error:', error)
    return NextResponse.json({ error: 'Error procesando confirmación' }, { status: 500 })
  }
}