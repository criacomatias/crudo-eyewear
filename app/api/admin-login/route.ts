import { NextResponse } from 'next/server'
import { rateLimit, getClientIp } from '@/app/lib/rateLimit'

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { ok, retryAfter } = rateLimit(`admin-login:${ip}`, {
      limit: 5,
      windowMs: 5 * 60 * 1000,
    })

    if (!ok) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Probá de nuevo en unos minutos.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    const { password } = await request.json()
    if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin_session', process.env.ADMIN_SESSION_TOKEN || '', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      return response
    }
    return NextResponse.json({ error: 'Contrasena incorrecta' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}