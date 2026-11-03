import { Link } from 'react-router-dom'
import { BRANDS } from '../data/brands'

export function Logo({ brand, className = '', eager = false }) {
  const b = BRANDS[brand]
  return (
    <img
      src={b.logo}
      alt={b.name}
      className={`logo logo--${brand} ${className}`}
      width={Math.round(b.ratio * 100)}
      height={100}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

export function HeroVideo() {
  return (
    <div className="hero-media" aria-hidden="true">
      <video autoPlay muted loop playsInline preload="metadata" poster="/video/hero-poster.jpg">
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

// Page title that shrinks to fit its longest word (see .title in theme.css)
export function Title({ children, as = 'h1', className = '' }) {
  const Tag = as
  const longest = String(children).split(/\s+/).reduce((m, w) => Math.max(m, w.length), 0)
  return <Tag className={`title ${className}`} style={{ '--chars': Math.max(longest, 8) }}>{children}</Tag>
}

export function PageHead({ title, lead, children }) {
  return (
    <div className="wrap page-head">
      <Title>{title}</Title>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  )
}

export function SectionHead({ title, id, link }) {
  return (
    <div className="section-head">
      <h2 id={id} className="h2">{title}</h2>
      {link && <Link to={link.to}>{link.label}</Link>}
    </div>
  )
}
