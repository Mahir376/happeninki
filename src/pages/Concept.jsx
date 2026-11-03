import { HeroVideo, Logo, SectionHead } from '../components/ui'
import { EventList } from './Events'
import { useI18n } from '../i18n'

const ARTISTS = {
  happeninki: [
    { name: 'Beau Didier', from: 'NL', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/beau.jpg' },
    { name: 'Hujus', from: 'NL', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/hujus.jpg' },
    { name: 'Isaiah', from: 'NL', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/isaiah.jpg', pos: 'center 30%' },
  ],
  ryym: [
    { name: 'Schellt', from: 'UA', genre: 'Schranz', img: '/img/artists/schellt.jpg', pos: 'center 30%' },
    { name: 'Axiver', from: 'ITA', genre: 'Neo Rave', img: '/img/artists/axiver.jpg', pos: 'center 30%' },
    { name: 'Kaki', from: 'NL', genre: 'Hard Industrial / Experimental', img: '/img/artists/kaki.png' },
  ],
}

export default function Concept({ concept }) {
  const { t } = useI18n()
  return (
    <>
      <section className="hero hero--concept">
        <HeroVideo />
        <div className="wrap hero-inner">
          <h1><Logo brand={concept} eager /></h1>
          <p className="lead">{t[concept].intro}</p>
        </div>
      </section>
      <EventList concept={concept} showArchive={false} />
      <section className="section" aria-labelledby="artists-title">
        <div className="wrap">
          <SectionHead id="artists-title" title={t.showcased} />
          <ul className="people" style={{ marginTop: 32 }}>
            {ARTISTS[concept].map((a) => (
              <li className="person" key={a.name}>
                <div className="person-photo">
                  <img src={a.img} alt={a.name} loading="lazy" decoding="async" style={a.pos ? { objectPosition: a.pos } : undefined} />
                </div>
                <p className="person-name">{a.name} <span className="muted small">{a.from}</span></p>
                <p className="person-detail">{a.genre}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
