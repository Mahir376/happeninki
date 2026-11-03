import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n, alternatePath, LANGS } from '../i18n'

const NAV_KEYS = ['events', 'happeninki', 'ryym', 'gallery', 'residents', 'rental', 'contact']
const LABEL = { happeninki: 'Häppeninki', ryym: 'RYYM' }

// FI / EN: goes to the same page in the other language
export function LangSwitch({ onNavigate }) {
  const { lang, t, pathname } = useI18n()
  return (
    <div className="lang-switch" role="group" aria-label={t.nav.lang}>
      {LANGS.map((l) => (
        <Link
          key={l}
          to={alternatePath(pathname, l)}
          hrefLang={l}
          lang={l}
          className={l === lang ? 'active' : ''}
          aria-current={l === lang ? 'true' : undefined}
          onClick={onNavigate}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}

function Navbar({ solid }) {
  const [open, setOpen] = useState(false)
  const { t, paths, routeKey } = useI18n()
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const link = (k, onClick) => (
    <Link to={paths[k]} onClick={onClick} aria-current={routeKey === k ? 'page' : undefined}>
      {LABEL[k] ?? t.nav[k]}
    </Link>
  )

  return (
    <header className={`nav ${solid || open ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <Link to={paths.home} className="nav-logo" onClick={close}>REIVIT.FI</Link>
      <nav aria-label={t.ui.mainNav}>
        <ul className="nav-links">
          {NAV_KEYS.map((k) => <li key={k}>{link(k)}</li>)}
        </ul>
      </nav>
      <LangSwitch onNavigate={close} />
      <button
        type="button"
        className="nav-burger"
        aria-label={t.nav.menu}
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <div className="nav-menu" id="nav-menu" aria-hidden={!open} inert={!open}>
        <ul>
          {['home', ...NAV_KEYS].map((k) => (
            <li key={k}>
              {k === 'home'
                ? <Link to={paths.home} onClick={close} aria-current={routeKey === 'home' ? 'page' : undefined}>REIVIT.FI</Link>
                : link(k, close)}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Navbar
