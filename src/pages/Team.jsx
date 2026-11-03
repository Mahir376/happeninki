import { Duo } from '../components/ui'
import { useI18n } from '../i18n'
import { TEAM } from '../data/team'
import { tr } from '../data/events'

export default function Team() {
  const { t, lang } = useI18n()
  return (
    <>
      <div className="wrap page-head">
        <h1 className="display"><span className="stretch">{t.residents.title}</span></h1>
        <p className="lede">{t.residents.intro}</p>
      </div>
      <section className="wrap section" style={{ paddingTop: 0 }} aria-label={t.residents.title}>
        <div className="team-grid">
          {TEAM.map((m) => (
            <article key={m.id} className="member">
              {m.image ? (
                <Duo src={m.image} alt={m.name} />
              ) : (
                <div className="member-blank" aria-hidden="true">
                  <b>{m.name[0]}</b>
                  <span>{t.ui.photosSoon}</span>
                </div>
              )}
              <h2 className="member-name" translate="no">{m.name}</h2>
              <p className="member-role">{m.roleText ? tr(m.roleText, lang) : t.ui.roles[m.role]}</p>
              {m.detail && <p className="member-detail" translate="no">{m.detail}</p>}
              {m.link && <a className="member-link" href={m.link} target="_blank" rel="noreferrer">{t.ui.portfolio}</a>}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
