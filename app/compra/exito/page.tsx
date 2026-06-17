import { Suspense } from 'react'
import ExitoContent from './ExitoContent'

export default function ExitoPage() {
  return (
    <main style={{ background: '#F2F2F0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px' }}>
      <Suspense fallback={<p>Cargando...</p>}>
        <ExitoContent />
      </Suspense>
    </main>
  )
}