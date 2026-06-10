'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const init = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      )

      const elements = document.querySelectorAll('.scroll-reveal')
      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }

    const timer = setTimeout(init, 100)
    return () => clearTimeout(timer)
  }, [])

  return null
}