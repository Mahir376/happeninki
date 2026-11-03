import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { CONTACTS, SOCIALS } from '../data/site'

export default function Contact() {
  const { t, paths } = useI18n()
  const c = t.contact
  return (
    <>
      <div className="wrap page-head">
        <h1 className="display"><span className="stretch">{c.title}</span></h1>
        <p className="lede">{c.subtitle}</p>
      </div>
      <section className="paper section">
        <div className="wrap">
          <dl className="contact-list">
            {['bookings', 'artists', 'general'].map((k) => (
              <div className="contact-item" key={k}>
                <dt>{c.groups[k]}</dt>
                <dd><a href={`mailto:${CONTACTS[k]}`}>{CONTACTS[k]}</a></dd>
              </div>
            ))}
          </dl>
          <div className="contact-links">
            <a className="btn" href={SOCIALS.instagramHappeninki} target="_blank" rel="noreferrer">Instagram @happeninki</a>
            <a className="btn btn--line" href={SOCIALS.instagramRyym} target="_blank" rel="noreferrer">Instagram @ryym_fi</a>
          </div>
          <p style={{ marginTop: 36 }}>
            {c.renting.pre}<Link to={paths.rental}>{c.renting.link}</Link>{c.renting.post}
          </p>
        </div>
      </section>
    </>
  )
}
