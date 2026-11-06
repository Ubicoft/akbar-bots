import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

type Orb = {
  x: number
  y: number
  r: number
  ox: number
  oy: number
  speed: number
  phase: number
  color: string
}

function readAccent() {
  const styles = getComputedStyle(document.documentElement)
  return {
    accent: styles.getPropertyValue('--accent').trim() || '#2f86ff',
    strong: styles.getPropertyValue('--accent-strong').trim() || '#79b4ff',
    deep: styles.getPropertyValue('--accent-deep').trim() || '#0d57e4',
  }
}

export function LivingBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let particles: Particle[] = []
    let orbs: Orb[] = []
    let t0 = performance.now()
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(48, Math.floor((w * h) / 28000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.8 + Math.random() * 1.8,
        a: 0.18 + Math.random() * 0.35,
      }))

      const c = readAccent()
      orbs = [
        { x: w * 0.75, y: h * 0.18, r: Math.max(180, w * 0.22), ox: 40, oy: 30, speed: 0.00035, phase: 0.2, color: c.strong },
        { x: w * 0.18, y: h * 0.55, r: Math.max(160, w * 0.18), ox: 50, oy: 40, speed: 0.00028, phase: 1.4, color: c.deep },
        { x: w * 0.55, y: h * 0.82, r: Math.max(140, w * 0.16), ox: 35, oy: 45, speed: 0.00042, phase: 2.6, color: c.accent },
        { x: w * 0.88, y: h * 0.7, r: Math.max(100, w * 0.12), ox: 25, oy: 28, speed: 0.0005, phase: 3.5, color: c.strong },
      ]
    }

    const draw = (now: number) => {
      const t = now - t0
      ctx.clearRect(0, 0, w, h)

      // soft mesh wash
      const mesh = ctx.createLinearGradient(0, 0, w, h)
      mesh.addColorStop(0, 'rgba(255,255,255,0.015)')
      mesh.addColorStop(0.5, 'rgba(255,255,255,0)')
      mesh.addColorStop(1, 'rgba(255,255,255,0.02)')
      ctx.fillStyle = mesh
      ctx.fillRect(0, 0, w, h)

      for (const orb of orbs) {
        const x = orb.x + Math.sin(t * orb.speed + orb.phase) * orb.ox
        const y = orb.y + Math.cos(t * orb.speed * 0.9 + orb.phase) * orb.oy
        const g = ctx.createRadialGradient(x, y, 0, x, y, orb.r)
        g.addColorStop(0, `${orb.color}55`)
        g.addColorStop(0.45, `${orb.color}22`)
        g.addColorStop(1, `${orb.color}00`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, orb.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduced) {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10

          ctx.beginPath()
          ctx.fillStyle = `rgba(255,255,255,${p.a})`
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }

        // subtle connecting lines near neighbors
        ctx.lineWidth = 1
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i]
            const b = particles[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.hypot(dx, dy)
            if (dist < 110) {
              ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - dist / 110)})`
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onTheme = () => resize()
    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    const mo = new MutationObserver(onTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      mo.disconnect()
    }
  }, [])

  return <canvas className="living-bg" ref={canvasRef} aria-hidden="true" />
}
