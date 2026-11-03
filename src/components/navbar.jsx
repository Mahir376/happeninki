import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n, alternatePath, LANGS } from '../i18n'

const NAV_KEYS = ['events', 'gallery', 'residents', 'services', 'rental', 'contact']

// FI | EN: goes to the same page in the other language
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
      {t.nav[k]}
    </Link>
  )

  return (
    <header className={`nav ${solid || open ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <Link to={paths.home} className="nav-logo" translate="no" onClick={close}>REIVIT.FI</Link>

      <nav aria-label="Main">
        <ul className="nav-links">
          {NAV_KEYS.map((k) => <li key={k}>{link(k)}</li>)}
        </ul>
      </nav>

      <div className="nav-right">
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
      </div>

      <div className="nav-menu" id="nav-menu" aria-hidden={!open}>
        <ul>
          {NAV_KEYS.map((k) => <li key={k}>{link(k, close)}</li>)}
        </ul>
      </div>
    </header>
  )
}

export default Navbar
