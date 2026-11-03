import { useI18n } from '../i18n'
import './Team.css'

const RESIDENTS = [
  { id: 1, name: 'Mahir', image: 'r1.jpg', genre: 'Industrial / Hard Techno / Hardcore' },
  { id: 2, name: 'Riku', image: 'r2.jpg', genre: 'Hardgroove / Hypnotic' },
  { id: 3, name: 'Tiskimikko', image: 'r3.jpg', genre: 'Hard Techno / Schranz' },
]

export default function Team() {
  const { t } = useI18n()
  return (
    <div className="content-wrapper content-wrapper--team app-fade-in">
      <h1 className="hero-title">{t.residents.title}</h1>
      <p className="hero-subtitle">{t.residents.intro}</p>

      <section className="team-residents" aria-label={t.residents.aria}>
        <div className="team-residents-grid">
          {RESIDENTS.map((resident) => (
            <div key={resident.id} className="team-resident-card">
              <div className="team-resident-image-wrap">
                <img src={`/img/residents/${resident.image}`} alt={resident.name} className="team-resident-img" loading="lazy" decoding="async" />
              </div>
              <p className="team-resident-name">{resident.name}</p>
              <p className="team-resident-genre">{t.residents.genre}: {resident.genre}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
