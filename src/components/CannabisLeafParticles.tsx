import { useEffect, useRef } from 'react'

const COLORS = ['#14b8a6', '#10b981', '#5eead4', '#34d399', '#0d9488', '#2dd4bf', '#6ee7b7']
const SPRING    = 0.055
const DAMPING   = 0.80
const DISPERSE_DECAY = 0.92
const MAX_PARTICLES  = 650
const REFORM_DELAY   = 100  // frames before re-forming after disperse

// ─── Draw a 7-fingered cannabis leaf silhouette onto an offscreen canvas ──────
function paintLeaf(size: number): ImageData {
  const off = document.createElement('canvas')
  off.width = off.height = size
  const ctx = off.getContext('2d')!
  const cx = size / 2, cy = size / 2
  const s = size * 0.42

  ctx.fillStyle = '#fff'

  // Each leaflet: [angleDeg (0=up), lengthScale, widthScale]
  const leaflets: [number, number, number][] = [
    [0,   1.00, 0.22],
    [28,  0.87, 0.18],  [-28,  0.87, 0.18],
    [55,  0.70, 0.15],  [-55,  0.70, 0.15],
    [80,  0.52, 0.12],  [-80,  0.52, 0.12],
  ]

  leaflets.forEach(([deg, ls, ws]) => {
    const rad = (deg - 90) * Math.PI / 180
    const len = s * ls
    const wid = s * ws
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rad + Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo( wid * 0.9, len * 0.30,  wid * 0.7, len * 0.68, 0, len)
    ctx.bezierCurveTo(-wid * 0.7, len * 0.68, -wid * 0.9, len * 0.30, 0, 0)
    ctx.fill()
    ctx.restore()
  })

  // Stem
  ctx.fillRect(cx - s * 0.04, cy, s * 0.08, s * 0.22)

  return ctx.getImageData(0, 0, size, size)
}

// ─── Sample filled pixels at a given stride ───────────────────────────────────
function sampleLeaf(size: number, stride: number): [number, number][] {
  const img = paintLeaf(size)
  const pts: [number, number][] = []
  for (let y = 0; y < size; y += stride)
    for (let x = 0; x < size; x += stride)
      if (img.data[(y * size + x) * 4 + 3] > 128) pts.push([x, y])
  return pts
}

interface P {
  x: number; y: number
  tx: number; ty: number
  vx: number; vy: number
  color: string; r: number; phase: number
}

interface Props { className?: string }

export default function CannabisLeafParticles({ className = '' }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const stateRef   = useRef({
    particles:  [] as P[],
    dispersing: false,
    timer:      0,
    tick:       0,
  })
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width  = W
    canvas.height = H

    // ── Build targets ──────────────────────────────────────────────────────
    const leafSize  = Math.min(W, H)
    const stride    = Math.max(3, Math.floor(Math.sqrt((leafSize * leafSize) / MAX_PARTICLES)))
    const raw       = sampleLeaf(leafSize, stride)

    const xs = raw.map(p => p[0]), ys = raw.map(p => p[1])
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const minY = Math.min(...ys), maxY = Math.max(...ys)
    const ox = (W - (maxX - minX)) / 2 - minX
    const oy = (H - (maxY - minY)) / 2 - minY

    const chosen = raw.sort(() => Math.random() - 0.5).slice(0, MAX_PARTICLES)

    stateRef.current.particles = chosen.map(([tx, ty]) => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      tx: tx + ox,
      ty: ty + oy,
      vx: 0, vy: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      r:     Math.random() * 1.4 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }))

    // ── Animation loop ─────────────────────────────────────────────────────
    function loop() {
      const s = stateRef.current
      s.tick++
      ctx.clearRect(0, 0, W, H)

      for (const p of s.particles) {
        if (s.dispersing) {
          p.vx *= DISPERSE_DECAY
          p.vy *= DISPERSE_DECAY
          p.vy += 0.08   // gentle gravity while scattered
        } else {
          const dx = p.tx - p.x
          const dy = p.ty - p.y
          p.vx += dx * SPRING
          p.vy += dy * SPRING
          // subtle idle float
          p.vx += Math.sin(s.tick * 0.018 + p.phase) * 0.025
          p.vy += Math.cos(s.tick * 0.013 + p.phase) * 0.025
          p.vx *= DAMPING
          p.vy *= DAMPING
        }
        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      if (s.dispersing) {
        s.timer++
        if (s.timer >= REFORM_DELAY) {
          // scatter to random positions so re-entry looks fresh
          for (const p of s.particles) {
            p.x  = Math.random() * W
            p.y  = Math.random() * H
            p.vx = 0; p.vy = 0
          }
          s.dispersing = false
          s.timer = 0
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    loop()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const s = stateRef.current
    if (s.dispersing) return
    const rect = canvasRef.current!.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    for (const p of s.particles) {
      const dx = p.x - mx, dy = p.y - my
      const dist = Math.hypot(dx, dy) + 1
      const force = Math.min(900 / (dist * dist), 18)
      p.vx += (dx / dist) * force
      p.vy += (dy / dist) * force
    }

    s.dispersing = true
    s.timer = 0
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      title="Click me"
      className={`cursor-pointer ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
