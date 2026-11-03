import { useState, useEffect } from 'react'
import { getNextEvent, eventTime, tr } from '../data/events'
import { SOCIALS } from '../data/site'
import { useI18n } from '../i18n'

function timeLeftUntil(target) {
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

// concept: 'happeninki' | 'ryym' to show only that brand's next event
function EventTimer({ concept }) {
  const { lang, t } = useI18n()
  const event = getNextEvent(concept)
  const target = event ? eventTime(event) : 0
  const [timeLeft, setTimeLeft] = useState(() => (event ? timeLeftUntil(target) : null))

  useEffect(() => {
    if (!target) return
    const timer = setInterval(() => setTimeLeft(timeLeftUntil(target)), 1000)
    return () => clearInterval(timer)
  }, [target])

  if (!event) {
    return (
      <div className="flash-sale-container">
        <div className="header">
          <h2>{t.timer.next}</h2>
          <h1>{t.timer.tba}</h1>
          <p className="description">{t.timer.tbaText}</p>
        </div>
        <div className="cta-section">
          <a
            href={concept === 'ryym' ? SOCIALS.instagramRyym : SOCIALS.instagramHappeninki}
            target="_blank"
            rel="noreferrer"
            className="cta-button"
          >
            {t.timer.follow}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flash-sale-container">
      <div className="header">
        <h2>{timeLeft ? t.timer.next : t.timer.now}</h2>
        <h1>{event.title}</h1>
        <p className="description">{tr(event.tagline, lang) || event.subtitle}</p>
      </div>

      {timeLeft && (
        <div className="timer-container">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div className="timer-box" key={unit}>
              <span className={`timer-digit ${value !== 0 ? 'bounce' : ''}`}>{String(value).padStart(2, '0')}</span>
              <span className="timer-label">{t.timer.units[unit]}</span>
            </div>
          ))}
        </div>
      )}

      {event.ticketLink && (
        <div className="cta-section">
          <a href={event.ticketLink} target="_blank" rel="noreferrer" className="cta-button pulse">
            {t.timer.tickets}
          </a>
        </div>
      )}
    </div>
  )
}

export default EventTimer
