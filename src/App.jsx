import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/navbar'

import Landing from './pages/Landing'
import Concept from './pages/Concept'
import Events from './pages/Events'
import Content from './pages/Content'
import Team from './pages/Team'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Rental from './pages/Rental'
import { applySeo } from './seo'
import { ROUTES, LANGS, LEGACY_REDIRECTS, normalizePath, useI18n } from './i18n'

const PAGES = {
  home: () => <Landing />,
  happeninki: () => <Concept concept="happeninki" />,
  ryym: () => <Concept concept="ryym" />,
  events: () => <Events />,
  gallery: () => <Content />,
  residents: () => <Team />,
  services: () => <Services />,
  contact: () => <Contact />,
  rental: (lang) => <Rental lang={lang} />,
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
    <div className="wrap page-head">
      <h1 className="display"><span className="stretch">404</span></h1>
      <p className="lede">{t.notFound.text}</p>
      <p style={{ marginTop: 28 }}><Link to={paths.home} className="btn">{t.notFound.back}</Link></p>
    </div>
  )
}

function Layout({ children }) {
  const { routeKey, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const theme = routeKey === 'happeninki' || routeKey === 'ryym' ? `theme-${routeKey}` : 'theme-landing'
  return (
    <div className={theme}>
      <a className="skip-link" href="#main">{t.ui.skip}</a>
      <Navbar solid={scrolled} />
      <main id="main">{children}</main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </div>
  )
}

function App() {
  return (
    <Router>
      <RouteEffects />
      <Layout>
        <Routes>
          {Object.entries(ROUTES).flatMap(([key, paths]) =>
            LANGS.map((lang) => <Route key={`${key}-${lang}`} path={paths[lang]} element={PAGES[key](lang)} />),
          )}
          {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
