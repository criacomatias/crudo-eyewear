import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Cursor from './components/Cursor'
import FloatingCTA from './components/FloatingCTA'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CRUDO — lentes con criterio.',
  description: 'Lo que usás dice lo que no decís. Buenos Aires — Coleccion 2026.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={dmSans.className}>
        <div className="cursor" id="cursor" />
        <div className="cursor-follower" id="cursor-follower" />
        <Cursor />
        <FloatingCTA />
        {children}
      </body>
    </html>
  )
}
