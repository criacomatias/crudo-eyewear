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
  description: 'Seis armazones. Cuatro cristales. Una decisión. Buenos Aires — Primera Colección 2025.',
  openGraph: {
    title: 'CRUDO — lentes con criterio.',
    description: 'Seis armazones. Cuatro cristales. Una decisión.',
    siteName: 'CRUDO Eyewear',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${dmSans.className} bg-[#0A0A0A] text-[#F5F0E8]`}>
        {children}
      </body>
    </html>
  )
}