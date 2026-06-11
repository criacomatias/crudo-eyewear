'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const preguntas = [
  {
    id: 1,
    texto: "Cuando algo te molesta, ¿qué hacés?",
    opciones: [
      { texto: "Lo guardás y seguís", armazon: "calma" },
      { texto: "Lo decís de frente", armazon: "rabia" },
      { texto: "Esperás el momento justo", armazon: "celos" },
      { texto: "Lo usás a tu favor", armazon: "orgullo" },
    ]
  },
  {
    id: 2,
    texto: "¿Cómo elegís lo que usás?",
    opciones: [
      { texto: "Lo que te hace sentir cómodo", armazon: "calma" },
      { texto: "Lo que nadie más tiene", armazon: "orgullo" },
      { texto: "Lo que dice algo sin hablar", armazon: "deseo" },
      { texto: "Lo que refleja cómo estás hoy", armazon: "amor" },
    ]
  },
  {
    id: 3,
    texto: "¿Qué buscás en una persona?",
    opciones: [
      { texto: "Que te deje espacio", armazon: "calma" },
      { texto: "Que te desafíe", armazon: "rabia" },
      { texto: "Que te sorprenda", armazon: "deseo" },
      { texto: "Que sea consistente", armazon: "amor" },
    ]
  },
  {
    id: 4,
    texto: "Un sábado a las 10pm, ¿dónde estás?",
    opciones: [
      { texto: "En casa, tranquilo", armazon: "calma" },
      { texto: "En algún lugar que no planeaste", armazon: "rabia" },
      { texto: "Con alguien específico", armazon: "amor" },
      { texto: "Donde todos quieren estar", armazon: "orgullo" },
    ]
  },
]

const resultados: Record<string, { precio: string; linea: string; descripcion: string }> = {
  calma: { precio: "$65.000", linea: "BASIC", descripcion: "Sabés exactamente quién sos. No necesitás demostrarlo." },
  rabia: { precio: "$120.000", linea: "PREMIUM", descripcion: "No pedís permiso. Lo que usás lo confirma." },
  deseo: { precio: "$65.000", linea: "BASIC", descripcion: "Hay algo en vos que atrae sin que lo busques." },
  celos: { precio: "$65.000", linea: "BASIC", descripcion: "Observás todo. Nada se te escapa." },
  orgullo: { precio: "$120.000", linea: "PREMIUM", descripcion: "Entrás a un lugar y se nota. Sin esfuerzo." },
  amor: { precio: "$120.000", linea: "PREMIUM", descripcion: "Todo lo que hacés tiene intensidad. Es inevitable." },
}

export default function TestPersonalidad() {
  const [paso, setPaso] = useState<'intro' | number | 'resultado'>('intro')
  const [puntajes, setPuntajes] = useState<Record<string, number>>({})
  const [resultado, setResultado] = useState<string | null>(null)
  const [visible, setVisible] = useState(true)
  const [letrasVisibles, setLetrasVisibles] = useState(0)

  const transicionar = (callback: () => void) => {
    setVisible(false)
    setTimeout(() => {
      callback()
      setVisible(true)
    }, 350)
  }

  const handleRespuesta = (armazon: string) => {
    const nuevos = { ...puntajes, [armazon]: (puntajes[armazon] || 0) + 1 }
    setPuntajes(nuevos)

    const siguientePaso = (paso as number) + 1
    transicionar(() => {
      if (siguientePaso > preguntas.length) {
        const ganador = Object.entries(nuevos).sort((a, b) => b[1] - a[1])[0][0]
        setResultado(ganador)
        setPaso('resultado')
      } else {
        setPaso(siguientePaso)
      }
    })
  }

  const reiniciar = () => {
    transicionar(() => {
      setPaso('intro')
      setPuntajes({})
      setResultado(null)
      setLetrasVisibles(0)
    })
  }

  useEffect(() => {
    if (paso === 'resultado' && resultado) {
      setLetrasVisibles(0)
      const nombre = resultado.toUpperCase()
      let i = 0
      const interval = setInterval(() => {
        i++
        setLetrasVisibles(i)
        if (i >= nombre.length) clearInterval(interval)
      }, 80)
      return () => clearInterval(interval)
    }
  }, [paso, resultado])

  const preguntaActual = typeof paso === 'number' ? preguntas[paso - 1] : null

  const contenidoStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  }

  return (
    <section style={{
      background: '#F2F2F0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 48px',
      borderTop: '1px solid rgba(10,10,10,0.06)',
    }}>
      <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', ...contenidoStyle }}>

        {paso === 'intro' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, color: '#3B1F0A', marginBottom: '32px' }}>
              test
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, color: '#3B1F0A', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '24px' }}>
              ¿Qué armazón<br />sos vos?
            </h2>
            <p style={{ fontSize: '15px', color: '#3B1F0A', opacity: 0.4, marginBottom: '64px', lineHeight: 1.7 }}>
              4 preguntas. Sin respuestas correctas.
            </p>
            <button
              onClick={() => transicionar(() => setPaso(1))}
              style={{
                background: 'transparent',
                border: '1px solid rgba(59,31,10,0.35)',
                color: '#3B1F0A',
                padding: '16px 48px',
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#3B1F0A'
                e.currentTarget.style.color = '#F2F2F0'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#3B1F0A'
              }}
            >
              empezar
            </button>
          </div>
        )}

        {preguntaActual && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
              {preguntas.map((_, i) => (
                <div key={i} style={{
                  height: '2px',
                  flex: 1,
                  background: i < (paso as number) ? '#3B1F0A' : 'rgba(59,31,10,0.15)',
                  transition: 'background 0.4s ease',
                }} />
              ))}
            </div>
            <h3 style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 300, color: '#3B1F0A', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '64px' }}>
              {preguntaActual.texto}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {preguntaActual.opciones.map((opcion, i) => (
                <button
                  key={i}
                  onClick={() => handleRespuesta(opcion.armazon)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(59,31,10,0.2)',
                    color: '#3B1F0A',
                    padding: '28px 24px',
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.5,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease, background 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#3B1F0A'
                    e.currentTarget.style.color = '#F2F2F0'
                    e.currentTarget.style.borderColor = '#3B1F0A'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#3B1F0A'
                    e.currentTarget.style.borderColor = 'rgba(59,31,10,0.2)'
                  }}
                >
                  {opcion.texto}
                </button>
              ))}
            </div>
          </div>
        )}

        {paso === 'resultado' && resultado && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.3, color: '#3B1F0A', marginBottom: '24px' }}>
              tu armazón es
            </p>
            <h2 style={{ fontSize: 'clamp(48px, 10vw, 120px)', fontWeight: 800, color: '#3B1F0A', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '40px', textTransform: 'uppercase' }}>
              {resultado.toUpperCase().slice(0, letrasVisibles)}
              <span style={{ opacity: 0 }}>{resultado.toUpperCase().slice(letrasVisibles)}</span>
            </h2>
            <img
              src={`/${resultado}.png`}
              alt={resultado}
              style={{ width: '100%', maxWidth: '320px', margin: '0 auto 32px', display: 'block', objectFit: 'contain' }}
            />
            <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.3, color: '#3B1F0A', marginBottom: '8px' }}>
              {resultados[resultado].linea} — {resultados[resultado].precio} ARS
            </p>
            <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300, color: '#3B1F0A', opacity: 0.7, lineHeight: 1.7, margin: '16px auto 48px', maxWidth: '480px' }}>
              {resultados[resultado].descripcion}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href={`/coleccion/${resultado}`}
                style={{ background: '#3B1F0A', color: '#F2F2F0', padding: '16px 40px', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 700 }}
              >
                ver {resultado.toUpperCase()}
              </Link>
              <button
                onClick={reiniciar}
                style={{ background: 'transparent', border: '1px solid rgba(59,31,10,0.35)', color: '#3B1F0A', padding: '16px 40px', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                repetir
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}