import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { CONTACT_EMAIL, SOCIALS } from '../data/site'

export default function Contact() {
  const { t, paths } = useI18n()
  const c = t.contact
  return (
    <div className="content-wrapper app-fade-in">
      <h1 className="hero-title">{c.title}</h1>
      <h2 className="hero-subtitle">{c.subtitle}</h2>

      <div className="flash-sale-container">
        <p className="description">{c.email}: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        <a href={SOCIALS.instagramHappeninki} target="_blank" rel="noreferrer" className="cta-button" style={{ marginTop: '20px' }}>
          {c.dm}
        </a>
        <p className="description" style={{ marginTop: '20px' }}>
          {c.renting.pre}<Link to={paths.rental}>{c.renting.link}</Link>{c.renting.post}
        </p>
      </div>
    </div>
  )
}
