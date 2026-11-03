import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { SOCIALS, CONTACT_EMAIL } from '../data/site'

const MARQUEE = '|  HARD-GROOVE  |  HARD BOUNCE  |  SAFER SPACE  |  TAMPERE '

function Footer() {
  const { t, paths } = useI18n()

  return (
    <footer className="site-footer">
      <div className="footer-marquee-wrap">
        <div className="footer-marquee">
          <span>{MARQUEE.repeat(4)}</span>
          <span>{MARQUEE.repeat(2)}</span>
        </div>
      </div>
      <nav className="footer-links" aria-label="Footer">
        <Link to={paths.rental}>{t.footer.rental}</Link>
        <Link to={paths.contact}>{t.footer.contact}</Link>
      </nav>
      <div className="footer-social">
        <a href={SOCIALS.instagramHappeninki} target="_blank" rel="noreferrer" aria-label="Instagram">
          <img src="/instagram.png" alt="Instagram" className="footer-icon" />
        </a>
        <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
          <img src="/tiktok.png" alt="TikTok" className="footer-icon" />
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email">
          <img src="/email.png" alt="Email" className="footer-icon" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
