'use client'

import { createContext, useContext, useEffect, useMemo, useReducer, ReactNode } from 'react'

export interface CarritoItem {
  id: string
  nombre: string
  cristal: string
  precio: number
  slug: string
}

interface CarritoState {
  items: CarritoItem[]
  isOpen: boolean
}

type CarritoAction =
  | { type: 'SET_ITEMS'; payload: CarritoItem[] }
  | { type: 'AGREGAR_ITEM'; payload: CarritoItem }
  | { type: 'ELIMINAR_ITEM'; payload: string }
  | { type: 'VACIAR_CARRITO' }
  | { type: 'ABRIR_CARRITO' }
  | { type: 'CERRAR_CARRITO' }
  | { type: 'TOGGLE_CARRITO' }

const initialState: CarritoState = {
  items: [],
  isOpen: false,
}

function reducer(state: CarritoState, action: CarritoAction): CarritoState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload }
    case 'AGREGAR_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    case 'ELIMINAR_ITEM':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) }
    case 'VACIAR_CARRITO':
      return { ...state, items: [] }
    case 'ABRIR_CARRITO':
      return { ...state, isOpen: true }
    case 'CERRAR_CARRITO':
      return { ...state, isOpen: false }
    case 'TOGGLE_CARRITO':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

interface CarritoContextValue {
  items: CarritoItem[]
  totalCantidad: number
  totalPrecio: number
  isOpen: boolean
  agregarItem: (item: CarritoItem) => void
  eliminarItem: (id: string) => void
  vaciarCarrito: () => void
  abrirCarrito: () => void
  cerrarCarrito: () => void
  toggleCarrito: () => void
}

const CarritoContext = createContext<CarritoContextValue | undefined>(undefined)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('crudo_carrito')
    if (!stored) return

    try {
      const items = JSON.parse(stored) as CarritoItem[]
      if (Array.isArray(items)) {
        dispatch({ type: 'SET_ITEMS', payload: items })
      }
    } catch {
      // ignore invalid storage
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('crudo_carrito', JSON.stringify(state.items))
  }, [state.items])

  const totalCantidad = useMemo(() => state.items.length, [state.items])
  const totalPrecio = useMemo(
    () => state.items.reduce((sum, item) => sum + item.precio, 0),
    [state.items]
  )

  const value: CarritoContextValue = {
    items: state.items,
    totalCantidad,
    totalPrecio,
    isOpen: state.isOpen,
    agregarItem: (item) => dispatch({ type: 'AGREGAR_ITEM', payload: item }),
    eliminarItem: (id) => dispatch({ type: 'ELIMINAR_ITEM', payload: id }),
    vaciarCarrito: () => dispatch({ type: 'VACIAR_CARRITO' }),
    abrirCarrito: () => dispatch({ type: 'ABRIR_CARRITO' }),
    cerrarCarrito: () => dispatch({ type: 'CERRAR_CARRITO' }),
    toggleCarrito: () => dispatch({ type: 'TOGGLE_CARRITO' }),
  }

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  }
  return context
}
