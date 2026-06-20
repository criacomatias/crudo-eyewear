import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vnkaolrezbkzbwyrmlgn.supabase.co',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sdk.mercadopago.com https://www.mercadopago.com https://*.mercadopago.com https://*.mlstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://vnkaolrezbkzbwyrmlgn.supabase.co https://*.mlstatic.com https://*.mercadopago.com",
      "connect-src 'self' https://vnkaolrezbkzbwyrmlgn.supabase.co https://api.mercadopago.com https://*.mercadopago.com",
      "frame-src 'self' https://*.mercadopago.com https://www.mercadopago.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://*.mercadopago.com",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()' },
          { key: 'Content-Security-Policy-Report-Only', value: csp },
        ],
      },
      {
        source: '/(.*).(png|jpg|jpeg|svg|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig