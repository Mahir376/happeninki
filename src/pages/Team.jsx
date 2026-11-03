import { PageHead } from '../components/ui'
import { useI18n } from '../i18n'
import { TEAM } from '../data/team'

export default function Team() {
  const { t } = useI18n()
  return (
    <>
      <PageHead title={t.residents.title} lead={t.residents.intro} />
      <section className="wrap section" style={{ paddingTop: 0 }} aria-label={t.residents.title}>
        <ul className="people">
          {TEAM.map((m) => (
            <li key={m.id} className="person">
              {m.image ? (
                <div className="person-photo"><img src={m.image} alt={m.name} loading="lazy" decoding="async" /></div>
              ) : (
                <div className="person-photo person-photo--empty">{t.ui.photosSoon}</div>
              )}
              <h2 className="person-name">{m.name}</h2>
              <p className="person-role">{t.ui.roles[m.role]}</p>
              {m.detail && <p className="person-detail">{m.detail}</p>}
              {m.link && <a className="person-link" href={m.link} target="_blank" rel="noreferrer">{t.ui.portfolio}</a>}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
