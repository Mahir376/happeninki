import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n, alternatePath, LANGS } from '../i18n'

const NAV_KEYS = ['events', 'gallery', 'residents', 'services', 'rental', 'contact']

// FI | EN toggle: goes to the same page in the other language
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

function Navbar({ navbarScrolled }) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, paths } = useI18n()
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className={`navbar ${navbarScrolled ? 'navbar--scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <Link to={paths.home} className="navbar-logo" onClick={closeMenu}>
        REIVIT.FI
      </Link>

      <ul className="navbar-links navbar-links-desktop">
        {NAV_KEYS.map((k) => (
          <li key={k}><Link to={paths[k]}>{t.nav[k]}</Link></li>
        ))}
      </ul>

      <div className="navbar-right">
        <LangSwitch onNavigate={closeMenu} />
        <button
          type="button"
          className="navbar-hamburger"
          aria-label={t.nav.menu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="navbar-hamburger-line" />
          <span className="navbar-hamburger-line" />
          <span className="navbar-hamburger-line" />
        </button>
      </div>

      <div className="navbar-mobile-overlay" aria-hidden={!isOpen} onClick={closeMenu}>
        <ul className="navbar-links navbar-links-mobile" onClick={(e) => e.stopPropagation()}>
          {NAV_KEYS.map((k) => (
            <li key={k}><Link to={paths[k]} onClick={closeMenu}>{t.nav[k]}</Link></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
