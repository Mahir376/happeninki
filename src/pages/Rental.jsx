import { RENTAL } from '../data/rental'
import { CONTACT_EMAIL } from '../data/site'
import { PageHead } from '../components/ui'

export default function Rental({ lang = 'fi' }) {
  const c = RENTAL[lang]
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(c.quote.emailSubject)}&body=${encodeURIComponent(c.quote.emailBody)}`

  return (
    <div lang={c.lang}>
      <PageHead title={c.h1} lead={c.h1Sub}>
        <div className="prose" style={{ marginTop: 28, color: '#cfcac1' }}>
          {c.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
        <p style={{ marginTop: 32 }}><a href={mailto} className="btn btn--gold">{c.quote.button}</a></p>
      </PageHead>

      <section className="wrap section" style={{ paddingTop: 0 }}>
        <div className="rows">
          {c.sections.map((s) => (
            <article className="row" key={s.title}>
              <h2 className="h2">{s.title}</h2>
              <div className="row-body">
                {s.text.map((p) => <p key={p}>{p}</p>)}
                <div className="gear">
                  {s.gear.map((g, i) => (
                    <div key={g.label || i}>
                      {g.label && <h3>{g.label}</h3>}
                      <ul>{g.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  ))}
                </div>
                {s.after && <p style={{ marginTop: '1em' }}>{s.after}</p>}
              </div>
            </article>
          ))}
        </div>

        <div className="quote">
          <div>
            <h2 className="h2">{c.quote.title}</h2>
            {c.quote.text.map((p) => <p key={p}>{p}</p>)}
          </div>
          <a href={mailto} className="btn btn--gold">{c.quote.button}</a>
        </div>

        <section className="faq" aria-labelledby="faq-title">
          <div className="section-head"><h2 id="faq-title" className="h2">{c.faqTitle}</h2></div>
          {c.faq.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </section>
    </div>
  )
}
