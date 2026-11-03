import EventTimer from '../components/EventTimer'
import ArtistShowcase from '../components/ArtistShowcase'
import { useI18n } from '../i18n'

const ARTISTS = [
  { name: 'Beau Didier (NL)', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/beau.jpg' },
  { name: 'Hujus (NL)', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/hujus.jpg' },
  { name: 'Isaiah (NL)', genre: 'Hypnotic techno / Hard groove', img: '/img/artists/isaiah.jpg', pos: 'center 30%' },
]

export default function Home() {
  const { t } = useI18n()
  return (
    <div className="content-wrapper app-fade-in">
      <h1 className="hero-title">HÄPPENINKI</h1>
      <p className="hero-subtitle">{t.happeninki.intro}</p>
      <ArtistShowcase artists={ARTISTS} />
      <EventTimer concept="happeninki" />
    </div>
  )
}
