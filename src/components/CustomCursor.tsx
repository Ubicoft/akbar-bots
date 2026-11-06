import { useEffect, useRef, useState } from 'react'

type TrailDot = { x: number; y: number; life: number }

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const trailRef = useRef<HTMLCanvasElement | null>(null)
  const pos = useRef({ x: -100, y: -100, tx: -100, ty: -100 })
  const trail = useRef<TrailDot[]>([])
  const hovering = useRef(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const touch = window.matchMedia('(pointer: coarse)')
    const update = () => setEnabled(fine.matches && !touch.matches)
    update()
    fine.addEventListener('change', update)
    touch.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      touch.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }
    document.documentElement.classList.add('has-custom-cursor')

    const canvas = trailRef.current
    const ctx = canvas?.getContext('2d')
    let raf = 0
    let dpr = 1

    const resize = () => {
      if (!canvas || !ctx) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
      trail.current.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (trail.current.length > 28) trail.current.shift()
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      hovering.current = Boolean(
        target?.closest('a, button, .lang-switch, .theme-switch, .demo-feature, .price-panel'),
      )
    }

    const tick = () => {
      const p = pos.current
      p.x += (p.tx - p.x) * 0.28
      p.y += (p.ty - p.y) * 0.28

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.tx}px, ${p.ty}px, 0)`
        dotRef.current.dataset.hover = hovering.current ? '1' : '0'
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${hovering.current ? 1.55 : 1})`
        ringRef.current.dataset.hover = hovering.current ? '1' : '0'
      }

      if (ctx && canvas) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2f86ff'
        for (let i = 0; i < trail.current.length; i++) {
          const d = trail.current[i]
          d.life *= 0.9
          const alpha = d.life * 0.35
          const r = 3 + (1 - d.life) * 10
          ctx.beginPath()
          ctx.fillStyle = `${accent}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, '0')}`
          // fallback if hex parse fails — use rgba via canvas
          ctx.fillStyle = accent.startsWith('#')
            ? hexAlpha(accent, alpha)
            : `rgba(100,160,255,${alpha})`
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
          ctx.fill()
        }
        trail.current = trail.current.filter((d) => d.life > 0.04)
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('resize', resize)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <canvas className="cursor-trail" ref={trailRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  )
}

function hexAlpha(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = Number.parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r},${g},${b},${alpha})`
}
