import { supabase } from './lib/supabase'
import type { Producto, Cristal } from './lib/supabase'
import Hero from './components/Hero'

import Coleccion from './components/Coleccion'
import Concepto from './components/Concepto'
import Cristales from './components/Cristales'

import Lineas from './components/Lineas'
import Cierre from './components/Cierre'
import TestPersonalidad from './components/TestPersonalidad'
import ComoComprar from './components/ComoComprar'
import Nav from './components/Nav'

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
      <Nav />
      <Hero />

      <Coleccion productos={productos} />
      <Concepto />
      <Cristales cristales={cristales} />
      <Lineas productos={productos} />

      <TestPersonalidad />
      <Cierre />
      <ComoComprar />
    </main>
  )
}
