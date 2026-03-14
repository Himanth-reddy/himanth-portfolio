import { useEffect, useRef, useState } from 'react'

const HOVER_TARGETS = 'a,button,input,textarea,select,label,.hov'

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const rafRef = useRef(0)
  const [isTouchMode, setIsTouchMode] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none)')

    const syncTouchMode = () => {
      setIsTouchMode(mediaQuery.matches)
    }

    syncTouchMode()
    mediaQuery.addEventListener('change', syncTouchMode)

    return () => {
      mediaQuery.removeEventListener('change', syncTouchMode)
    }
  }, [])

  useEffect(() => {
    if (isTouchMode || !dotRef.current || !ringRef.current) {
      return undefined
    }

    const dot = dotRef.current
    const ring = ringRef.current

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY

    const animate = () => {
      ringX += (targetX - ringX) * 0.14
      ringY += (targetY - ringY) * 0.14
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      rafRef.current = window.requestAnimationFrame(animate)
    }

    const onMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY

      dot.style.opacity = '1'
      ring.style.opacity = '1'
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
    }

    const onMouseDown = () => {
      ring.classList.add('cursor-ring-press')
    }

    const onMouseUp = () => {
      ring.classList.remove('cursor-ring-press')
    }

    const onPointerOver = (event) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const hoveredTarget = target.closest(HOVER_TARGETS)
      if (!hoveredTarget) {
        return
      }

      ring.classList.add('cursor-ring-hover')
      dot.classList.add('cursor-dot-hover')
    }

    const onPointerOut = (event) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const fromTarget = target.closest(HOVER_TARGETS)
      if (!fromTarget) {
        return
      }

      const relatedTarget = event.relatedTarget
      if (relatedTarget instanceof Element && relatedTarget.closest(HOVER_TARGETS)) {
        return
      }

      ring.classList.remove('cursor-ring-hover')
      dot.classList.remove('cursor-dot-hover')
    }

    const onMouseLeaveViewport = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeaveViewport)
    document.addEventListener('mouseover', onPointerOver)
    document.addEventListener('mouseout', onPointerOut)

    rafRef.current = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeaveViewport)
      document.removeEventListener('mouseover', onPointerOver)
      document.removeEventListener('mouseout', onPointerOut)
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [isTouchMode])

  if (isTouchMode) {
    return null
  }

  return (
    <>
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <span ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

export default Cursor