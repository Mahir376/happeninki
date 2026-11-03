import { RENTAL } from '../data/rental'
import { CONTACT_EMAIL } from '../data/site'
import './Services.css'
import './Rental.css'

function GearList({ groups }) {
  return groups.map((g, i) => (
    <div className="rental-gear" key={g.label || i}>
      {g.label && <h4 className="rental-gear-label">{g.label}</h4>}
      <ul>
        {g.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  ))
}

export default function Rental({ lang = 'fi' }) {
  const c = RENTAL[lang]
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(c.quote.emailSubject)}&body=${encodeURIComponent(c.quote.emailBody)}`

  return (
    <div className="content-wrapper content-wrapper--services app-fade-in" lang={c.lang}>
      <h1 className="services-title rental-title">
        {c.h1}
        <span className="rental-title-sub">{c.h1Sub}</span>
      </h1>

      <div className="services-intro rental-intro">
        {c.intro.map((p) => <p key={p}>{p}</p>)}
        <a href={mailto} className="cta-button rental-cta">{c.quote.button}</a>
      </div>

      <section className="services-grid">
        {c.sections.map((s) => (
          <article className="services-card" key={s.title}>
            <h2 className="services-card-title">{s.title}</h2>
            {s.text.map((p) => <p className="services-card-p" key={p}>{p}</p>)}
            <GearList groups={s.gear} />
            {s.after && <p className="services-card-p">{s.after}</p>}
          </article>
        ))}

        <article className="services-card rental-quote-card">
          <h2 className="services-card-title">{c.quote.title}</h2>
          {c.quote.text.map((p) => <p className="services-card-p" key={p}>{p}</p>)}
          <a href={mailto} className="cta-button rental-cta">{c.quote.button}</a>
        </article>
      </section>

      <section className="rental-faq">
        <h2 className="services-card-title">{c.faqTitle}</h2>
        {c.faq.map(({ q, a }) => (
          <details key={q} className="rental-faq-item">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </div>
  )
}
