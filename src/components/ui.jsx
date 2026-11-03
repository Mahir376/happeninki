import { useI18n } from '../i18n'

// Photo or video tinted in the current ink (duotone).
// ink: 'violet' | 'red' | 'both' forces a colour, otherwise the page's ink is used.
export function Duo({ src, alt = '', ink, className = '', position, eager = false }) {
  return (
    <div className={`duo ${ink ? `duo--${ink}` : ''} ${className}`}>
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

export function HeroVideo({ ink }) {
  return (
    <div className={`duo ${ink ? `duo--${ink}` : ''}`} aria-hidden="true">
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
  const row = [...items, ...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...row, ...row].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}
