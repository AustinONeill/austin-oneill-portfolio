import { useEffect, useRef, useState } from 'react'

// ─── Config ──────────────────────────────────────────────────────────────────
const PS        = 5      // pixel square size (px)
const LETTER_SP = 2      // gap between letters (grid units)
const GRAVITY   = 0.38

const TEXT_COLORS = ['#14b8a6', '#5eead4', '#2dd4bf']
const BG_COLORS   = [
  'rgba(20,184,166,0.18)', 'rgba(20,184,166,0.10)', 'rgba(20,184,166,0.22)',
  'rgba(94,234,212,0.12)', 'rgba(45,212,191,0.15)', 'rgba(20,184,166,0.08)',
]

// ─── 5×7 pixel font ──────────────────────────────────────────────────────────
const GLYPHS: Record<string, string[]> = {
  C: ['01110','10001','10000','10000','10000','10001','01110'],
  L: ['10000','10000','10000','10000','10000','10000','11111'],
  I: ['01110','00100','00100','00100','00100','00100','01110'],
  K: ['10001','10010','10100','11000','10100','10010','10001'],
}

interface Pixel {
  gx: number; gy: number   // grid (home) position
  x:  number; y:  number   // current position
  vx: number; vy: number
  color: string
  bgColor: string
  isText: boolean
  delay: number
  falling: boolean
  done: boolean
}

// Build a full-width pixel grid; mark text pixels
function buildPixels(canvasW: number, stripY: number, stripH: number): Pixel[] {
  const cols = Math.floor(canvasW / PS)
  const rows = Math.floor(stripH / PS)

  // Determine which grid cells are part of the CLICK text
  const textSet = new Set<string>()
  const text = 'CLICK'
  const letterCols = text.split('').reduce((a, _, i) => a + 5 + (i < text.length - 1 ? LETTER_SP : 0), 0)
  const textStartCol = Math.floor((cols - letterCols) / 2)
  const textStartRow = Math.floor((rows - 7) / 2)

  let curCol = 0
  for (let ci = 0; ci < text.length; ci++) {
    const glyph = GLYPHS[text[ci]]
    if (!glyph) { curCol += 5 + LETTER_SP; continue }
    for (let row = 0; row < 7; row++)
      for (let col = 0; col < 5; col++)
        if (glyph[row][col] === '1')
          textSet.add(`${textStartRow + row},${textStartCol + curCol + col}`)
    curCol += 5 + LETTER_SP
  }

  // Build full grid
  const pixels: Pixel[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const gx = col * PS
      const gy = stripY + row * PS
      const isText = textSet.has(`${row},${col}`)
      pixels.push({
        gx, gy, x: gx, y: gy,
        vx: 0, vy: 0,
        color:   TEXT_COLORS[Math.floor(Math.random() * TEXT_COLORS.length)],
        bgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
        isText,
        delay: 0, falling: false, done: false,
      })
    }
  }
  return pixels
}

type Phase = 'idle' | 'falling' | 'resetting'

export default function PixelDrop() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const phaseRef   = useRef<Phase>('idle')
  const pixelsRef  = useRef<Pixel[]>([])
  const tickRef    = useRef(0)
  const rafRef     = useRef(0)
  const resetTimer = useRef(0)
  const navHRef    = useRef(64)
  const stripHRef  = useRef(0)
  const [navH, setNavH] = useState(64)
  const [stripH, setStripH] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const nav = document.querySelector('nav') as HTMLElement | null
      navHRef.current   = nav ? nav.offsetHeight : 64
      // Strip height = multiple of PS that fits ~3 rows padding + 7 text + 3 rows padding
      const sh = Math.floor((7 + 6) / 1) * PS  // 13 rows × 5px = 65px
      stripHRef.current = sh
      setNavH(navHRef.current)
      setStripH(sh)
      pixelsRef.current = buildPixels(canvas.width, navHRef.current, sh)
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
      ctx.clearRect(0, 0, W, H)

      const phase = phaseRef.current
      const blink = Math.floor(t / 40) % 2 === 0  // text blinks

      if (phase === 'idle') {
        for (const p of pixelsRef.current) {
          if (p.isText) {
            if (blink) {
              ctx.fillStyle = p.color
              ctx.fillRect(p.gx, p.gy, PS - 1, PS - 1)
            }
          } else {
            ctx.fillStyle = p.bgColor
            ctx.fillRect(p.gx, p.gy, PS - 1, PS - 1)
          }
        }

      } else if (phase === 'falling') {
        let allDone = true
        for (const p of pixelsRef.current) {
          if (p.done) continue
          if (!p.falling) {
            if (tickRef.current >= p.delay) { p.falling = true }
            else {
              ctx.fillStyle = p.isText ? p.color : p.bgColor
              ctx.fillRect(p.x, p.y, PS - 1, PS - 1)
              allDone = false; continue
            }
          }
          p.vy += GRAVITY
          p.vx += (Math.random() - 0.5) * 0.15
          p.x  += p.vx
          p.y  += p.vy
          if (p.y > H + PS) { p.done = true; continue }
          allDone = false
          ctx.fillStyle = p.isText ? p.color : p.bgColor
          ctx.fillRect(p.x, p.y, PS - 1, PS - 1)
        }
        if (allDone) { phaseRef.current = 'resetting'; resetTimer.current = 0 }

      } else {
        resetTimer.current++
        if (resetTimer.current > 70) {
          pixelsRef.current = buildPixels(W, navHRef.current, stripHRef.current)
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
    const rect = canvasRef.current!.getBoundingClientRect()
    const mx   = e.clientX - rect.left
    const now  = tickRef.current

    for (const p of pixelsRef.current) {
      const dist = Math.abs(p.gx + PS / 2 - mx)
      p.delay   = now + Math.round(dist * 0.05)
      p.falling = false; p.done = false
      p.x = p.gx; p.y = p.gy
      p.vx = (Math.random() - 0.5) * 1.5
      p.vy = -(Math.random() * 1.5 + 0.5)
    }
    phaseRef.current = 'falling'
  }

  return (
    <>
      <div
        onClick={handleStripClick}
        style={{
          position: 'fixed', top: navH, left: 0,
          width: '100%', height: stripH,
          zIndex: 41, cursor: 'pointer',
        }}
        aria-label="Click to drop pixels"
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 40,
        }}
      />
    </>
  )
}
