import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface ParticleBackgroundProps {
  /** Dots per 10,000 px² of canvas area. Default: 5 */
  density?: number
  /** Hex color for dots and lines. Default: teal (#14b8a6) */
  color?: string
  /** Velocity multiplier 0–2. Default: 1 */
  speed?: number
  /** Pixel distance within which two particles connect. Default: 130 */
  linkDistance?: number
  className?: string
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '')
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

export default function ParticleBackground({
  density = 5,
  color = '#14b8a6',
  speed = 1,
  linkDistance = 130,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rgb = hexToRgb(color)

    let animId = 0
    let offScreen = false
    let tabHidden = false
    const mouse = { x: -9999, y: -9999 }
    let particles: Particle[] = []

    // ── Init ───────────────────────────────────────────────────────────────
    const init = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const { width: w, height: h } = canvas
      const count = Math.min(Math.floor((w * h) / 10000 * density), 90)

      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2
        const s = (0.2 + Math.random() * 0.5) * speed
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * s,
          vy: Math.sin(angle) * s,
          radius: 1.2 + Math.random() * 1.4,
        }
      })
    }

    // ── Draw ───────────────────────────────────────────────────────────────
    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)

      // Lines first (below dots)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.18
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
            ctx.lineWidth = 0.7
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.45)`
        ctx.fill()
      }
    }

    // ── Update ─────────────────────────────────────────────────────────────
    const update = () => {
      const { width: w, height: h } = canvas
      const repelRadius = 90
      const repelStrength = 0.04
      const maxSpeed = speed * 1.2

      for (const p of particles) {
        // Gentle mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < repelRadius && dist > 0) {
          const force = ((repelRadius - dist) / repelRadius) * repelStrength
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Speed cap with soft damping
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > maxSpeed) {
          p.vx = (p.vx / spd) * maxSpeed
          p.vy = (p.vy / spd) * maxSpeed
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges (smoother than bouncing for ambient feel)
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }
    }

    // ── Loop ───────────────────────────────────────────────────────────────
    const loop = () => {
      if (!offScreen && !tabHidden) {
        update()
        draw()
      }
      animId = requestAnimationFrame(loop)
    }

    // ── Handlers ───────────────────────────────────────────────────────────
    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(init, 150)
    }

    // Mouse tracked on window — canvas has pointer-events:none
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const onVisibility = () => {
      tabHidden = document.hidden
    }

    const observer = new IntersectionObserver(
      ([entry]) => { offScreen = !entry.isIntersecting },
      { threshold: 0 }
    )

    // ── Boot ───────────────────────────────────────────────────────────────
    init()

    if (reduced) {
      draw() // static snapshot, no RAF
    } else {
      animId = requestAnimationFrame(loop)
      window.addEventListener('resize', onResize)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('visibilitychange', onVisibility)
      observer.observe(canvas)
    }

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
    }
  }, [density, color, speed, linkDistance])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
