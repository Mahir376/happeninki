import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { CONTACT_EMAIL, SOCIALS } from '../data/site'
import { PageHead } from '../components/ui'

export default function Contact() {
  const { t, paths } = useI18n()
  const c = t.contact
  return (
    <>
      <PageHead title={c.title} lead={c.subtitle} />
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <a className="contact-mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <div className="btn-row" style={{ marginTop: 40 }}>
          <a className="btn" href={SOCIALS.instagramHappeninki} target="_blank" rel="noreferrer">Instagram @happeninki</a>
          <a className="btn" href={SOCIALS.instagramRyym} target="_blank" rel="noreferrer">Instagram @ryym_fi</a>
        </div>
        <p className="muted" style={{ marginTop: 40 }}>
          {c.renting.pre}<Link to={paths.rental}>{c.renting.link}</Link>{c.renting.post}
        </p>
      </section>
    </>
  )
}
