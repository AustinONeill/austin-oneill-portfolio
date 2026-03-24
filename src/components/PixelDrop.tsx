import { useEffect, useRef, useState } from 'react'

const PS        = 5
const LETTER_SP = 2
const GRAVITY   = 0.38

const TEXT_COLORS = ['#14b8a6', '#5eead4', '#2dd4bf']
const BG_COLORS   = [
  'rgba(20,184,166,0.18)', 'rgba(20,184,166,0.10)', 'rgba(20,184,166,0.22)',
  'rgba(94,234,212,0.12)', 'rgba(45,212,191,0.15)', 'rgba(20,184,166,0.08)',
]

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
  color: string; bgColor: string
  isText: boolean
  delay: number; falling: boolean; done: boolean
}

function buildPixels(canvasW: number, stripY: number, stripH: number): Pixel[] {
  const cols = Math.floor(canvasW / PS)
  const rows = Math.floor(stripH / PS)
  const textSet = new Set<string>()
  const text = 'CLICK'
  const letterCols = text.split('').reduce((a, _, i) => a + 5 + (i < text.length - 1 ? LETTER_SP : 0), 0)
  const textStartCol = Math.floor((cols - letterCols) / 2)
  const textStartRow = Math.floor((rows - 7) / 2)
  let curCol = 0
  for (let ci = 0; ci < text.length; ci++) {
    const glyph = GLYPHS[text[ci]]
    if (!glyph) { curCol += 5 + LETTER_SP; continue }
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 5; c++)
        if (glyph[r][c] === '1') textSet.add(`${textStartRow + r},${textStartCol + curCol + c}`)
    curCol += 5 + LETTER_SP
  }
  const pixels: Pixel[] = []
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++) {
      const gx = col * PS, gy = stripY + row * PS
      const isText = textSet.has(`${row},${col}`)
      pixels.push({
        gx, gy, x: gx, y: gy, vx: 0, vy: 0,
        color:   TEXT_COLORS[Math.floor(Math.random() * TEXT_COLORS.length)],
        bgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
        isText, delay: 0, falling: false, done: false,
      })
    }
  return pixels
}

function triggerDrop(pixels: Pixel[], mx: number, tick: number) {
  for (const p of pixels) {
    const dist = Math.abs(p.gx + PS / 2 - mx)
    p.delay   = tick + Math.round(dist * 0.05)
    p.falling = false; p.done = false
    p.x = p.gx; p.y = p.gy
    p.vx = (Math.random() - 0.5) * 1.5
    p.vy = -(Math.random() * 1.5 + 0.5)
  }
}

type Phase = 'idle' | 'falling' | 'gone'

export default function PixelDrop() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const phaseRef   = useRef<Phase>('idle')
  const pixelsRef  = useRef<Pixel[]>([])
  const tickRef    = useRef(0)
  const rafRef     = useRef(0)
  const navHRef    = useRef(64)
  const stripHRef  = useRef(65)
  const [navH, setNavH] = useState(64)
  const [stripH, setStripH] = useState(65)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const nav = document.querySelector('nav') as HTMLElement | null
      navHRef.current  = nav ? nav.offsetHeight : 64
      const sh = Math.floor(13 * PS)   // 13 rows
      stripHRef.current = sh
      setNavH(navHRef.current)
      setStripH(sh)
      if (phaseRef.current === 'idle')
        pixelsRef.current = buildPixels(canvas.width, navHRef.current, sh)
    }

    resize()
    window.addEventListener('resize', resize)

    // ── Drop on scroll ────────────────────────────────────────────────────
    function onScroll() {
      if (phaseRef.current !== 'idle') return
      triggerDrop(pixelsRef.current, window.innerWidth / 2, tickRef.current)
      phaseRef.current = 'falling'
    }
    window.addEventListener('scroll', onScroll, { passive: true, once: true })

    // ── Drop on any click ─────────────────────────────────────────────────
    function onClick(e: MouseEvent) {
      if (phaseRef.current !== 'idle') return
      triggerDrop(pixelsRef.current, e.clientX, tickRef.current)
      phaseRef.current = 'falling'
    }
    window.addEventListener('click', onClick)

    // ── Animation loop ────────────────────────────────────────────────────
    function loop() {
      tickRef.current++
      const t = tickRef.current
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      const phase = phaseRef.current
      const blink = Math.floor(t / 40) % 2 === 0

      if (phase === 'idle') {
        for (const p of pixelsRef.current) {
          if (p.isText) {
            if (blink) { ctx.fillStyle = p.color; ctx.fillRect(p.gx, p.gy, PS - 1, PS - 1) }
          } else {
            ctx.fillStyle = p.bgColor; ctx.fillRect(p.gx, p.gy, PS - 1, PS - 1)
          }
        }
      } else if (phase === 'falling') {
        let allDone = true
        for (const p of pixelsRef.current) {
          if (p.done) continue
          if (!p.falling) {
            if (tickRef.current >= p.delay) p.falling = true
            else {
              ctx.fillStyle = p.isText ? p.color : p.bgColor
              ctx.fillRect(p.x, p.y, PS - 1, PS - 1)
              allDone = false; continue
            }
          }
          p.vy += GRAVITY
          p.vx += (Math.random() - 0.5) * 0.15
          p.x += p.vx; p.y += p.vy
          if (p.y > H + PS) { p.done = true; continue }
          allDone = false
          ctx.fillStyle = p.isText ? p.color : p.bgColor
          ctx.fillRect(p.x, p.y, PS - 1, PS - 1)
        }
        if (allDone) phaseRef.current = 'gone'
      }
      // 'gone' — canvas stays clear, strip never returns

      rafRef.current = requestAnimationFrame(loop)
    }

    loop()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      {/* Clickable hit area over strip while idle */}
      <div
        style={{
          position: 'fixed', top: navH, left: 0,
          width: '100%', height: stripH,
          zIndex: 41, cursor: 'pointer',
          pointerEvents: phaseRef.current === 'idle' ? 'auto' : 'none',
        }}
        aria-hidden="true"
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
