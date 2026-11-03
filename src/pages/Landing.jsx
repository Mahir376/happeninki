import HCard from '../components/HCard'
import RCard from '../components/RCard'
import { EventCard, RentalTeaser } from './Events'
import { getNextEvent } from '../data/events'
import { useI18n } from '../i18n'
import '../components/ConceptCards.css'

export default function Landing() {
  const { t } = useI18n()
  const next = getNextEvent()

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <h1 className="landing-hero-title">{t.landing.title}</h1>
        <p className="landing-hero-tagline">{t.landing.tagline}</p>
      </section>
      <section className="landing-cards">
        <HCard />
        <RCard />
      </section>
      {next && (
        <section className="landing-next-event">
          <h2 className="landing-next-event-heading">{t.landing.nextEvent}</h2>
          <EventCard event={next} />
        </section>
      )}
      <RentalTeaser />
    </div>
  )
}
