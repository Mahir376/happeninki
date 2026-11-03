import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'

export default function RCard() {
  const navigate = useNavigate()
  const { t, paths } = useI18n()
  const go = () => navigate(paths.ryym)

  return (
    <article
      className="concept-card concept-card--ryym"
      onClick={go}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && go()}
      aria-label={`${t.cards.goTo}: RYYM`}
    >
      <div className="concept-card-bg" aria-hidden="true" />
      <div className="concept-card-inner">
        <h2 className="concept-card-title">Ryym</h2>
        <p className="concept-card-sub">{t.cards.ryym}</p>
      </div>
    </article>
  )
}
