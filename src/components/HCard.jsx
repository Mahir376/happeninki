import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'

export default function HCard() {
  const navigate = useNavigate()
  const { t, paths } = useI18n()
  const go = () => navigate(paths.happeninki)

  return (
    <article
      className="concept-card concept-card--happeninki"
      onClick={go}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && go()}
      aria-label={`${t.cards.goTo}: Häppeninki`}
    >
      <div className="concept-card-bg" aria-hidden="true" />
      <div className="concept-card-inner">
        <h2 className="concept-card-title">Happeninki</h2>
        <p className="concept-card-sub">{t.cards.happeninki}</p>
      </div>
    </article>
  )
}
