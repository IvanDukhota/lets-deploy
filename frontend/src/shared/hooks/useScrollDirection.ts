import { useEffect, useRef, useState } from 'react'

export type ScrollDirection = 'up' | 'down'

// tracks whether the page is currently being scrolled up or down,
// ignoring jitter smaller than `threshold` px
export function useScrollDirection(threshold = 10): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('up')
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    lastY.current = window.scrollY

    function update() {
      const currentY = window.scrollY
      const diff = currentY - lastY.current

      // always show the header once we're back near the top
      if (currentY < threshold) {
        setDirection('up')
        lastY.current = currentY
      } else if (Math.abs(diff) >= threshold) {
        setDirection(diff > 0 ? 'down' : 'up')
        lastY.current = currentY
      }

      ticking.current = false
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return direction
}
