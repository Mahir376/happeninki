import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

export default function Services() {
  const { t, paths } = useI18n()
  const s = t.services
  return (
    <>
      <div className="wrap page-head">
        <h1 className="display"><span className="stretch">{s.title}</span></h1>
        <p className="lede">{s.intro}</p>
      </div>
      <section className="paper section">
        <div className="wrap rows">
          {s.cards.map((card) => (
            <article className="row" key={card.title}>
              <h2 className="display row-title">{card.title}</h2>
              <div className="row-body">
                {card.p.map((p, i) =>
                  typeof p === 'string' ? (
                    <p key={i}>{p}</p>
                  ) : (
                    <p key={i}>{p.pre}<Link to={paths[p.to]}>{p.link}</Link>{p.post}</p>
                  ),
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
