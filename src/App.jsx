import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import HeroVideo from './components/herovid'
import Navbar from './components/navbar'

import Home from './pages/Home'
import Events from './pages/Events'
import Content from './pages/Content'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Landing from './pages/Landing'
import Ryym from './pages/Ryym'
import Services from './pages/Services'
import Rental from './pages/Rental'
import { applySeo } from './seo'
import { ROUTES, LANGS, LEGACY_REDIRECTS, normalizePath, useI18n } from './i18n'

import './App.css'

const PAGES = {
  home: Landing,
  happeninki: Home,
  ryym: Ryym,
  events: Events,
  gallery: Content,
  residents: Team,
  services: Services,
  contact: Contact,
  rental: Rental,
}

// Scroll to top and update title, description, canonical, hreflang on every route change
function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    applySeo(normalizePath(pathname))
  }, [pathname])
  return null
}

function NotFound() {
  const { t, paths } = useI18n()
  return (
    <div className="content-wrapper app-fade-in">
      <h1 className="hero-title">404</h1>
      <p className="hero-subtitle">{t.notFound.text}</p>
      <div className="flash-sale-container">
        <Link to={paths.home} className="cta-button">{t.notFound.back}</Link>
      </div>
    </div>
  )
}

function LayoutWrapper({ children, navbarScrolled }) {
  const { routeKey } = useI18n()
  const themeClass = routeKey === 'happeninki' ? 'happeninki-theme' : routeKey === 'ryym' ? 'ryym-theme' : 'landing-theme'
  return (
    <div className={`app-fade-in ${themeClass}`}>
      <Navbar navbarScrolled={navbarScrolled} />
      <HeroVideo />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  const [navbarScrolled, setNavbarScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setNavbarScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <RouteEffects />
      <LayoutWrapper navbarScrolled={navbarScrolled}>
        <Routes>
          {Object.entries(ROUTES).flatMap(([key, paths]) =>
            LANGS.map((lang) => {
              const Page = PAGES[key]
              return <Route key={`${key}-${lang}`} path={paths[lang]} element={<Page lang={lang} />} />
            }),
          )}
          {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  )
}

export default App
