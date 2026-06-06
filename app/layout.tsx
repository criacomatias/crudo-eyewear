import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CRUDO — lentes con criterio.',
  description: 'Seis armazones. Cuatro cristales. Una decision. Buenos Aires — Primera Coleccion 2025.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={dmSans.className}>
        {children}
      </body>
    </html>
  )
}
