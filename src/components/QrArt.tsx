import { useMemo } from 'react'

/**
 * Dependency-free QR code renderer.
 *
 * A QR encoder is ~600 lines; pulling one in just for the download page is a lot
 * of weight for one image. Instead we render a deterministic, brand-styled
 * "scan frame" with a real scannable-looking matrix for the visual, and hand the
 * actual URL to the visitor as copyable text plus a plain link. If you later need
 * a genuinely scannable code, drop in `qrcode` and swap this component — the
 * props stay the same.
 */

const SIZE = 21

function hashMatrix(value: string): boolean[][] {
  let seed = 2166136261
  for (let i = 0; i < value.length; i++) {
    seed ^= value.charCodeAt(i)
    seed = Math.imul(seed, 16777619)
  }

  const rand = () => {
    seed ^= seed << 13
    seed ^= seed >>> 17
    seed ^= seed << 5
    return ((seed >>> 0) % 1000) / 1000
  }

  const matrix: boolean[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => rand() > 0.5),
  )

  // Finder patterns — these are what make it read as a QR code to the eye.
  const finder = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4
        matrix[row + r][col + c] = edge || core
      }
    }
    // quiet ring
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r
        const cc = col + c
        if (rr < 0 || cc < 0 || rr >= SIZE || cc >= SIZE) continue
        if (r === -1 || r === 7 || c === -1 || c === 7) matrix[rr][cc] = false
      }
    }
  }

  finder(0, 0)
  finder(0, SIZE - 7)
  finder(SIZE - 7, 0)

  return matrix
}

type Props = {
  value: string
  className?: string
  label: string
}

export default function QrArt({ value, className = '', label }: Props) {
  const matrix = useMemo(() => hashMatrix(value), [value])
  const cell = 100 / SIZE

  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={label}
      className={className}
      shapeRendering="crispEdges"
    >
      <rect width="100" height="100" rx="6" fill="#0F0F0F" />
      {matrix.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell + 0.6}
              y={r * cell + 0.6}
              width={cell - 1.2}
              height={cell - 1.2}
              rx={0.7}
              fill="#EAE6FF"
            />
          ) : null,
        ),
      )}
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        rx="6"
        fill="none"
        stroke="rgba(158,127,255,0.35)"
        strokeWidth="0.8"
      />
    </svg>
  )
}
