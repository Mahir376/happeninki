import { HeroVideo, Ticker } from '../components/ui'
import Artists from '../components/Artists'
import { EventsBoard } from './Events'
import { useI18n } from '../i18n'
import { BRANDS } from '../data/brands'

const CONCEPTS = {
  happeninki: {
    name: 'Häppeninki',
    ink: 'violet',
    ticker: ['House', 'Techno', '360 setups', 'Safer space', 'Tampere'],
  },
  ryym: {
    name: 'RYYM',
    ink: 'red',
    ticker: ['Hard techno', 'Harder styles', 'Themed nights', 'Safer space', 'Tampere'],
  },
}

export default function Concept({ concept }) {
  const { t } = useI18n()
  const c = CONCEPTS[concept]
  return (
    <>
      <section className="hero">
        <HeroVideo />
        <div className="wrap hero-inner">
          <h1 className="hero-word"><img className={`brand-logo brand-logo--${concept}`} src={BRANDS[concept].logo} alt={c.name} /></h1>
          <p className="lede">{t[concept].intro}</p>
        </div>
      </section>
      <Ticker words={c.ticker} />
      <EventsBoard concept={concept} showArchive={false} />
      <Artists concept={concept} />
    </>
  )
}
