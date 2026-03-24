import { useEffect, useRef, useState } from 'react'

// ─── Config ──────────────────────────────────────────────────────────────────
const PS        = 5      // pixel square size (px)
const LETTER_SP = 2      // gap between letters (grid units)
const PAD_V     = 12     // vertical padding top/bottom
const GRAVITY   = 0.35
const COLORS    = ['#14b8a6', '#5eead4', '#2dd4bf', '#34d399', '#10b981', '#0d9488']

// ─── 5×7 pixel font ──────────────────────────────────────────────────────────
const GLYPHS: Record<string, string[]> = {
  C: ['01110','10001','10000','10000','10000','10001','01110'],
  L: ['10000','10000','10000','10000','10000','10000','11111'],
  I: ['01110','00100','00100','00100','00100','00100','01110'],
  K: ['10001','10010','10100','11000','10100','10010','10001'],
}

interface Pixel {
  gx: number; gy: number
  x:  number; y:  number
  vx: number; vy: number
  color: string
  delay: number
  falling: boolean
  done: boolean
}

function buildPixels(text: string, canvasW: number, startY: number): Pixel[] {
  const cols  = text.split('').reduce((a, _, i) => a + 5 + (i < text.length - 1 ? LETTER_SP : 0), 0)
  const totalW = cols * PS
  const startX = Math.round((canvasW - totalW) / 2)
  const sy     = startY + PAD_V
  const pixels: Pixel[] = []
  let curCol = 0

  for (let ci = 0; ci < text.length; ci++) {
    const glyph = GLYPHS[text[ci]]
    if (!glyph) { curCol += 5 + LETTER_SP; continue }
    for (let row = 0; row < 7; row++)
      for (let col = 0; col < 5; col++)
        if (glyph[row][col] === '1') {
          const gx = startX + (curCol + col) * PS
          const gy = sy + row * PS
          pixels.push({ gx, gy, x: gx, y: gy, vx: 0, vy: 0,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            delay: 0, falling: false, done: false })
        }
    curCol += 5 + LETTER_SP
  }
  return pixels
}

type Phase = 'idle' | 'falling' | 'resetting'

export default function PixelDrop() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const phaseRef     = useRef<Phase>('idle')
  const pixelsRef    = useRef<Pixel[]>([])
  const tickRef      = useRef(0)
  const rafRef       = useRef(0)
  const resetTimer   = useRef(0)
  const navHRef      = useRef(64)
  const stripHRef    = useRef(7 * PS + PAD_V * 2)
  const [navH, setNavH] = useState(64)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const nav = document.querySelector('nav') as HTMLElement | null
      navHRef.current = nav ? nav.offsetHeight : 64
      setNavH(navHRef.current)
      pixelsRef.current = buildPixels('CLICK', canvas.width, navHRef.current)
      phaseRef.current  = 'idle'
      tickRef.current   = 0
    }

    resize()
    window.addEventListener('resize', resize)

    function loop() {
      tickRef.current++
      const t  = tickRef.current
      const W  = canvas.width
      const H  = canvas.height
      const sy = navHRef.current
      const sh = stripHRef.current
      ctx.clearRect(0, 0, W, H)

      const phase = phaseRef.current

      if (phase === 'idle') {
        // subtle strip tint
        ctx.fillStyle = `rgba(20,184,166,${0.05 + 0.03 * Math.sin(t * 0.06)})`
        ctx.fillRect(0, sy, W, sh)

        // blink every 45 frames
        if (Math.floor(t / 45) % 2 === 0) {
          for (const p of pixelsRef.current) {
            ctx.fillStyle = p.color
            ctx.fillRect(p.gx, p.gy, PS - 1, PS - 1)
          }
        }

        // subtle bounce arrow
        ctx.fillStyle = `rgba(94,234,212,${0.4 + 0.25 * Math.sin(t * 0.09)})`
        ctx.font = '10px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('▼', W / 2, sy + sh - 2)

      } else if (phase === 'falling') {
        let allDone = true
        for (const p of pixelsRef.current) {
          if (p.done) continue
          if (!p.falling) {
            if (tickRef.current >= p.delay) { p.falling = true }
            else {
              ctx.fillStyle = p.color
              ctx.fillRect(p.x, p.y, PS - 1, PS - 1)
              allDone = false; continue
            }
          }
          p.vy += GRAVITY
          p.vx += (Math.random() - 0.5) * 0.18
          p.x  += p.vx
          p.y  += p.vy
          if (p.y > H + PS) { p.done = true; continue }
          allDone = false
          ctx.fillStyle = p.color
          ctx.fillRect(p.x, p.y, PS - 1, PS - 1)
        }
        if (allDone) { phaseRef.current = 'resetting'; resetTimer.current = 0 }

      } else {
        resetTimer.current++
        if (resetTimer.current > 70) {
          pixelsRef.current = buildPixels('CLICK', W, navHRef.current)
          phaseRef.current  = 'idle'
          tickRef.current   = 0
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    loop()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [])

  function handleStripClick(e: React.MouseEvent<HTMLDivElement>) {
    if (phaseRef.current !== 'idle') return
    const rect   = canvasRef.current!.getBoundingClientRect()
    const mx     = e.clientX - rect.left
    const now    = tickRef.current

    for (const p of pixelsRef.current) {
      const dist = Math.abs(p.gx - mx)
      p.delay   = now + Math.round(dist * 0.07)
      p.falling = false; p.done = false
      p.x = p.gx; p.y = p.gy
      p.vx = (Math.random() - 0.5) * 2
      p.vy = -(Math.random() * 1.5 + 0.5)   // slight upward pop
    }
    phaseRef.current = 'falling'
  }

  const sh = 7 * PS + PAD_V * 2

  return (
    <>
      {/* Invisible but clickable hit-area over the pixel strip */}
      <div
        onClick={handleStripClick}
        style={{
          position: 'fixed',
          top: navH,
          left: 0,
          width: '100%',
          height: sh,
          zIndex: 41,
          cursor: 'pointer',
        }}
        aria-label="Click to drop pixels"
      />
      {/* Full-screen canvas — pointer-events none so page stays usable */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          zIndex: 40,
        }}
      />
    </>
  )
}
