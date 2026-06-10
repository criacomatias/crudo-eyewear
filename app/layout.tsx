import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import FloatingCTA from './components/FloatingCTA'
import Carrito from './components/Carrito'
import { CarritoProvider } from './context/CarritoContext'
import ScrollReveal from './components/ScrollReveal'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CRUDO',
  description: 'Buenos Aires 2026.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={dmSans.className}>
        <CarritoProvider>
          <FloatingCTA />
          <Carrito />
          {children}
          <ScrollReveal />
        </CarritoProvider>
      </body>
    </html>
  )
}
