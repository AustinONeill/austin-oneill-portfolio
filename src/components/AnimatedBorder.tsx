interface AnimatedBorderProps {
  children: React.ReactNode
  /** 'controls' = LIVE badge + forward-marching dashes
   *  'code'     = scan line + reverse-marching dashes */
  variant?: 'controls' | 'code'
  className?: string
}

const CORNER = 22  // corner bracket size in px
const R      = 12  // border-radius matching rounded-xl

export default function AnimatedBorder({
  children,
  variant = 'controls',
  className = '',
}: AnimatedBorderProps) {
  const marchAnim = variant === 'code' ? 'dash-march-rev 2.8s linear infinite' : 'dash-march 2.2s linear infinite'

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>

      {/* ── Children ── */}
      {children}

      {/* ── SVG overlay: marching dashes + corner glow ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Marching dashed border */}
        <rect
          x="1" y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={R} ry={R}
          fill="none"
          stroke="rgba(20,184,166,0.55)"
          strokeWidth="1.5"
          strokeDasharray="7 5"
          vectorEffect="non-scaling-stroke"
          style={{ animation: marchAnim }}
        />

        {/* Pulsing glow on all 4 corners — circles */}
        {([
          [CORNER / 2,              CORNER / 2             ],
          [`calc(100% - ${CORNER/2}px)`, CORNER / 2             ],
          [CORNER / 2,              `calc(100% - ${CORNER/2}px)`],
          [`calc(100% - ${CORNER/2}px)`, `calc(100% - ${CORNER/2}px)`],
        ] as [string | number, string | number][]).map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx as string}
            cy={cy as string}
            r="3"
            fill="rgba(20,184,166,0.9)"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: `border-glow 2s ease-in-out infinite`,
              animationDelay: `${i * 0.22}s`,
            }}
          />
        ))}
      </svg>

      {/* ── Corner bracket lines (sharp L shapes over the SVG) ── */}
      {([
        { pos: 'top-0 left-0',     borders: 'border-t-2 border-l-2', delay: '0s'    },
        { pos: 'top-0 right-0',    borders: 'border-t-2 border-r-2', delay: '0.22s' },
        { pos: 'bottom-0 left-0',  borders: 'border-b-2 border-l-2', delay: '0.44s' },
        { pos: 'bottom-0 right-0', borders: 'border-b-2 border-r-2', delay: '0.66s' },
      ]).map(({ pos, borders, delay }) => (
        <div
          key={pos}
          className={`absolute ${pos} border-teal/80 ${borders}`}
          style={{
            width: CORNER,
            height: CORNER,
            animation: `corner-pulse 2s ease-in-out infinite`,
            animationDelay: delay,
          }}
        />
      ))}

      {/* ── Variant decorations ── */}
      {variant === 'controls' && (
        <div className="absolute top-2.5 right-3 flex items-center gap-1.5 z-10">
          <div
            className="w-2 h-2 rounded-full bg-teal"
            style={{ animation: 'live-ping 1.8s ease-in-out infinite' }}
          />
          <span className="text-teal text-[9px] font-mono font-bold tracking-[0.2em] opacity-90 select-none">
            LIVE
          </span>
        </div>
      )}

      {variant === 'code' && (
        <div
          className="absolute left-0 right-0 h-px pointer-events-none z-10"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.5) 30%, rgba(94,234,212,0.7) 50%, rgba(20,184,166,0.5) 70%, transparent 100%)',
            animation: 'scan-line 5s ease-in-out infinite',
            top: '2%',
          }}
        />
      )}
    </div>
  )
}
