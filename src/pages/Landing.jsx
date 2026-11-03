import { Link } from 'react-router-dom'
import { HeroVideo, Logo } from '../components/ui'
import { EventList, RentalTeaser } from './Events'
import { useI18n } from '../i18n'

export default function Landing() {
  const { t, paths } = useI18n()
  return (
    <>
      <section className="hero">
        <HeroVideo />
        <div className="wrap hero-inner">
          <div className="brands">
            <Link to={paths.happeninki} className="brand">
              <Logo brand="happeninki" eager />
              <span className="brand-note">{t.cards.happeninki}</span>
            </Link>
            <span className="brands-divider" aria-hidden="true" />
            <Link to={paths.ryym} className="brand">
              <Logo brand="ryym" eager />
              <span className="brand-note">{t.cards.ryym}</span>
            </Link>
          </div>
          <div className="hero-line">
            <h1>{t.landing.title}</h1>
            <p>{t.landing.tagline}</p>
          </div>
        </div>
      </section>
      <EventList showArchive={false} linkAll />
      <RentalTeaser />
    </>
  )
}
