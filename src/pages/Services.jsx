import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import './Services.css'

export default function Services() {
  const { t, paths } = useI18n()
  const s = t.services
  return (
    <div className="content-wrapper content-wrapper--services app-fade-in">
      <h1 className="services-title">{s.title}</h1>
      <p className="services-intro">{s.intro}</p>

      <section className="services-grid">
        {s.cards.map((card) => (
          <article className="services-card" key={card.title}>
            <h2 className="services-card-title">{card.title}</h2>
            {card.p.map((p, i) =>
              typeof p === 'string' ? (
                <p className="services-card-p" key={i}>{p}</p>
              ) : (
                <p className="services-card-p" key={i}>
                  {p.pre}<Link to={paths[p.to]}>{p.link}</Link>{p.post}
                </p>
              ),
            )}
          </article>
        ))}
      </section>
    </div>
  )
}
