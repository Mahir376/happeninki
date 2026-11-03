import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { PageHead } from '../components/ui'

export default function Services() {
  const { t, paths } = useI18n()
  const s = t.services
  return (
    <>
      <PageHead title={s.title} lead={s.intro} />
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <div className="rows">
          {s.cards.map((card) => (
            <article className="row" key={card.title}>
              <h2 className="h2">{card.title}</h2>
              <div className="row-body">
                {card.p.map((p, i) =>
                  typeof p === 'string' ? <p key={i}>{p}</p> : <p key={i}>{p.pre}<Link to={paths[p.to]}>{p.link}</Link>{p.post}</p>,
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
