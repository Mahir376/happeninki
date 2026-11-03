import { useI18n } from '../i18n'
import { getArtists } from '../data/artists'
import { BRANDS } from '../data/brands'

const brandsOf = (concept) => (concept === 'both' ? ['happeninki', 'ryym'] : [concept])

// "Previously showcased" artists. concept filters to one brand; without it all are shown with their brand logo.
export default function Artists({ concept }) {
  const { t } = useI18n()
  const artists = getArtists(concept)
  if (!artists.length) return null
  return (
    <section className="section artists-section" aria-labelledby="artists-title">
      <div className="wrap">
        <h2 id="artists-title" className="display artists-title">{t.showcased}</h2>
        <ul className="artists-grid">
          {artists.map((a) => (
            <li className="artist-card" key={a.id}>
              {a.image ? (
                <div className="duo">
                  <img src={a.image} alt={a.name} loading="lazy" decoding="async" style={a.position ? { objectPosition: a.position } : undefined} />
                </div>
              ) : (
                <div className="duo duo--empty" aria-hidden="true">
                  <img src={BRANDS[a.concept === 'ryym' ? 'ryym' : 'happeninki'].logo} alt="" />
                </div>
              )}
              <h3 className="artist-card-name">{a.name}{a.from && <small>{a.from}</small>}</h3>
              {(a.genre || a.playedAt) && <p className="artist-card-meta">{[a.genre, a.playedAt].filter(Boolean).join(' / ')}</p>}
              <div className="artist-card-foot">
                {!concept && brandsOf(a.concept).map((b) => <img key={b} className="artist-card-brand" src={BRANDS[b].logo} alt={BRANDS[b].name} />)}
                {a.instagram && <a href={a.instagram} target="_blank" rel="noreferrer">Instagram</a>}
                {a.soundcloud && <a href={a.soundcloud} target="_blank" rel="noreferrer">SoundCloud</a>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
