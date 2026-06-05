import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Producto = {
  id: string
  nombre: string
  slug: string
  linea: 'basic' | 'premium'
  precio: number
  descripcion: string
  imagen_url: string | null
  imagen_editorial_url: string | null
  orden: number
}

export type Cristal = {
  id: string
  nombre: string
  nm: string
  uso: string
  color_hex: string
}
