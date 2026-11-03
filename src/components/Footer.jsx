import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { SOCIALS, CONTACT_EMAIL } from '../data/site'
import { BRANDS } from '../data/brands'

function Footer() {
  const { t, paths } = useI18n()

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="footer-logos">
            <Link to={paths.happeninki}><img className="brand-logo brand-logo--happeninki" src={BRANDS.happeninki.logo} alt="Häppeninki" /></Link>
            <Link to={paths.ryym}><img className="brand-logo brand-logo--ryym" src={BRANDS.ryym.logo} alt="RYYM" /></Link>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <Link to={paths.events}>{t.nav.events}</Link>
            <Link to={paths.rental}>{t.footer.rental}</Link>
            <Link to={paths.contact}>{t.footer.contact}</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </nav>
          <p className="footer-small">© {new Date().getFullYear()} Häppeninki / RYYM Oy, Tampere. {t.ui.rights}</p>
        </div>
        <div className="footer-social">
          <a href={SOCIALS.instagramHappeninki} target="_blank" rel="noreferrer">Instagram</a>
          <a href={SOCIALS.instagramRyym} target="_blank" rel="noreferrer">RYYM IG</a>
          <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
