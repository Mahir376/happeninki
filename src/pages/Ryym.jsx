import EventTimer from '../components/EventTimer'
import ArtistShowcase from '../components/ArtistShowcase'
import { useI18n } from '../i18n'

const ARTISTS = [
  { name: 'Schellt (UA)', genre: 'Schranz', img: '/img/artists/schellt.jpg', pos: 'center 30%' },
  { name: 'Axiver (ITA)', genre: 'Neo Rave', img: '/img/artists/axiver.jpg', pos: 'center 30%' },
  { name: 'Kaki (NL)', genre: 'Hard Industrial / Experimental', img: '/img/artists/kaki.png' },
]

export default function Ryym() {
  const { t } = useI18n()
  return (
    <div className="ryym-wrapper app-fade-in">
      <h1 className="hero-title hero-title--ryym">RYYM</h1>
      <p className="hero-subtitle">{t.ryym.intro}</p>
      <ArtistShowcase artists={ARTISTS} withInfoWrap />
      <EventTimer concept="ryym" />
    </div>
  )
}
