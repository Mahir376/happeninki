import { useI18n } from '../i18n'
import './artist-showcase.css'

// withInfoWrap: RYYM layout wraps name + genre in an extra div
export default function ArtistShowcase({ artists, withInfoWrap = false }) {
  const { t } = useI18n()
  return (
    <section className="showcased-artists" aria-label={t.showcasedAria}>
      <h3 className="showcased-artists-heading">{t.showcased}</h3>
      <div className="showcased-artists-grid">
        {artists.map((a) => {
          const info = (
            <>
              <p className="showcased-artist-name">{a.name}</p>
              <p className="showcased-artist-genre">{a.genre}</p>
            </>
          )
          return (
            <div className="showcased-artist" key={a.name}>
              <div className="showcased-artist-image-wrap">
                <img src={a.img} alt={a.name.replace(/\s*\(.*\)$/, '')} className="showcased-artist-img" loading="lazy" decoding="async" style={a.pos ? { objectPosition: a.pos } : undefined} />
              </div>
              {withInfoWrap ? <div className="showcased-artist-info">{info}</div> : info}
            </div>
          )
        })}
      </div>
    </section>
  )
}
