import { useI18n } from '../i18n'

// Photo in a cropped frame (natural colour)
export function Duo({ src, alt = '', className = '', position, eager = false }) {
  return (
    <div className={`duo ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  )
}

export function HeroVideo() {
  return (
    <div className="duo" aria-hidden="true">
      <video autoPlay muted loop playsInline preload="metadata" poster="/video/hero-poster.jpg">
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export function Ticker({ words }) {
  const { t } = useI18n()
  const items = words ?? t.ticker
  // Each track holds the list repeated, twice over, so the loop is seamless
  const rowA = Array(4).fill(items).flat()
  const rowB = Array(4).fill([...items].reverse()).flat()
  return (
    <div className="ticker" aria-hidden="true">
      {[rowA, rowB].map((row, r) => (
        <div className="ticker-row" key={r}>
          <div className="ticker-track">
            {[...row, ...row].map((w, i) => <span key={i}>{w}</span>)}
          </div>
        </div>
      ))}
    </div>
  )
}
