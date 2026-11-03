import { HeroVideo, Ticker, Duo } from '../components/ui'
import { EventsBoard } from './Events'
import { useI18n } from '../i18n'

const CONCEPTS = {
  happeninki: {
    name: 'Häppeninki',
    ink: 'violet',
    ticker: ['Hard groove', 'Hard bounce', 'Hypnotic techno', '360 setups', 'Safer space', 'Tampere'],
    artists: [
      { name: 'Beau Didier', from: 'NL', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/beau.jpg' },
      { name: 'Hujus', from: 'NL', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/hujus.jpg' },
      { name: 'Isaiah', from: 'NL', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/isaiah.jpg', pos: 'center 30%' },
    ],
  },
  ryym: {
    name: 'RYYM',
    ink: 'red',
    ticker: ['Industrial', 'Schranz', 'Raw techno', 'Themed nights', 'Safer space', 'Tampere'],
    artists: [
      { name: 'Schellt', from: 'UA', genre: 'Schranz', img: '/img/artists/schellt.jpg', pos: 'center 30%' },
      { name: 'Axiver', from: 'ITA', genre: 'Neo Rave', img: '/img/artists/axiver.jpg', pos: 'center 30%' },
      { name: 'Kaki', from: 'NL', genre: 'Hard Industrial / Experimental', img: '/img/artists/kaki.png' },
    ],
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
          <h1 className="display hero-word"><span className="stretch">{c.name}</span></h1>
          <p className="lede">{t[concept].intro}</p>
        </div>
      </section>
      <Ticker words={c.ticker} />
      <EventsBoard concept={concept} showArchive={false} />
      <section className="section" aria-labelledby="artists-title">
        <div className="wrap">
          <h2 id="artists-title" className="display artists-title">{t.showcased}</h2>
          <div className="artists">
            {c.artists.map((a) => (
              <div className="artist" key={a.name}>
                <div>
                  <p className="artist-name">{a.name}<small>{a.from}</small></p>
                  <p className="artist-genre">{a.genre}</p>
                </div>
                <Duo src={a.img} alt={a.name} position={a.pos} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
