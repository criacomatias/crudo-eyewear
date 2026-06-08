'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const follower = document.getElementById('cursor-follower')

    const onMove = (e: MouseEvent) => {
      if (cursor) cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
      if (follower) follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
    }

    window.addEventListener('mousemove', onMove)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return null
}
