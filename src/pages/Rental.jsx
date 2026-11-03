import { RENTAL } from '../data/rental'
import { CONTACTS } from '../data/site'

export default function Rental({ lang = 'fi' }) {
  const c = RENTAL[lang]
  const mailto = `mailto:${CONTACTS.bookings}?subject=${encodeURIComponent(c.quote.emailSubject)}&body=${encodeURIComponent(c.quote.emailBody)}`

  return (
    <div lang={c.lang}>
      <div className="wrap page-head">
        <h1 className="display page-title-long">{c.h1}</h1>
        <p className="lede"><strong>{c.h1Sub}.</strong> {c.intro[0]}</p>
        <div style={{ marginTop: 28 }}><a href={mailto} className="btn">{c.quote.button}</a></div>
      </div>

      <section className="paper section">
        <div className="wrap">
          <div className="row-body" style={{ marginBottom: 'clamp(32px, 5vw, 64px)' }}>
            {c.intro.slice(1).map((p) => <p key={p} style={{ marginBottom: '1em' }}>{p}</p>)}
          </div>

          <div className="rows">
            {c.sections.map((s) => (
              <article className="row" key={s.title}>
                <h2 className="display row-title">{s.title}</h2>
                <div className="row-body">
                  {s.text.map((p) => <p key={p}>{p}</p>)}
                  <div className="gear">
                    {s.gear.map((g, i) => (
                      <div key={g.label || i}>
                        {g.label && <h3 className="gear-label"><span>{g.label}</span></h3>}
                        <ul>{g.items.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                  {s.after && <p style={{ marginTop: '1em' }}>{s.after}</p>}
                </div>
              </article>
            ))}
          </div>

          <div className="quote-box">
            <div>
              <h2 className="display">{c.quote.title}</h2>
              {c.quote.text.map((p) => <p key={p}>{p}</p>)}
            </div>
            <a href={mailto} className="btn">{c.quote.button}</a>
          </div>

          <section className="faq" aria-labelledby="faq-title">
            <h2 id="faq-title" className="display">{c.faqTitle}</h2>
            {c.faq.map(({ q, a }) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>
        </div>
      </section>
    </div>
  )
}
