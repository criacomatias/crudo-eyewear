import { supabase } from './lib/supabase'
import type { Producto, Cristal } from './lib/supabase'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Coleccion from './components/Coleccion'
import Concepto from './components/Concepto'
import Cristales from './components/Cristales'
import Editorial from './components/Editorial'
import Lineas from './components/Lineas'
import Cierre from './components/Cierre'

export const revalidate = 3600

async function getProductos(): Promise<Producto[]> {
  const { data } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('orden')
  return data || []
}

async function getCristales(): Promise<Cristal[]> {
  const { data } = await supabase
    .from('cristales')
    .select('*')
    .eq('activo', true)
  return data || []
}

export default async function Home() {
  const [productos, cristales] = await Promise.all([
    getProductos(),
    getCristales()
  ])

  return (
    <main>
      <Hero />
      <Statement />
      <Coleccion productos={productos} />
      <Concepto />
      <Cristales cristales={cristales} />
      <Editorial />
      <Lineas productos={productos} />
      <Cierre />
    </main>
  )
}