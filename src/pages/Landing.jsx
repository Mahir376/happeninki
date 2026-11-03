import { Link } from 'react-router-dom'
import { HeroVideo, Ticker } from '../components/ui'
import { EventsBoard, RentalTeaser } from './Events'
import { useI18n } from '../i18n'
import { BRANDS } from '../data/brands'
import Artists from '../components/Artists'

function Panel({ to, brand, name, sub, cta }) {
  return (
    <Link to={to} className="split-panel">
      <h2 className="split-name"><img className={`brand-logo brand-logo--${brand}`} src={BRANDS[brand].logo} alt={name} /></h2>
      <p className="split-sub">{sub}</p>
      <span className="split-go">{cta} {name}</span>
    </Link>
  )
}

export default function Landing() {
  const { t, paths } = useI18n()
  return (
    <>
      <section className="split" aria-labelledby="landing-title">
        <HeroVideo />
        <div className="split-shade" aria-hidden="true" />
        <h1 id="landing-title" className="display split-h1">
          {t.landing.title}
          <small>{t.landing.tagline}</small>
        </h1>
        <Panel to={paths.happeninki} brand="happeninki" name="Häppeninki" sub={t.cards.happeninki} cta={t.ui.open} />
        <Panel to={paths.ryym} brand="ryym" name="RYYM" sub={t.cards.ryym} cta={t.ui.open} />
      </section>
      <Ticker />
      <EventsBoard />
      <Artists />
      <RentalTeaser />
    </>
  )
}
