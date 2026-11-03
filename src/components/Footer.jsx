import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { SOCIALS, CONTACT_EMAIL } from '../data/site'
import { Logo } from './ui'

function Footer() {
  const { t, paths } = useI18n()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-logos">
            <Link to={paths.happeninki}><Logo brand="happeninki" /></Link>
            <Link to={paths.ryym}><Logo brand="ryym" /></Link>
          </div>
          <nav className="footer-links" aria-label={t.ui.footerNav}>
            <Link to={paths.events}>{t.nav.events}</Link>
            <Link to={paths.services}>{t.nav.services}</Link>
            <Link to={paths.rental}>{t.footer.rental}</Link>
            <Link to={paths.contact}>{t.footer.contact}</Link>
            <a href={SOCIALS.instagramHappeninki} target="_blank" rel="noreferrer">Instagram @happeninki</a>
            <a href={SOCIALS.instagramRyym} target="_blank" rel="noreferrer">Instagram @ryym_fi</a>
            <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer">TikTok</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} RYYM Oy, Tampere. {t.ui.rights}</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
