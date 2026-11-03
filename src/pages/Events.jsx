import { Link } from 'react-router-dom'
import { getUpcomingEvents, getPastEvents, isPastEvent, dateParts, tr } from '../data/events'
import { useI18n } from '../i18n'
import { SOCIALS } from '../data/site'

export function EventCard({ event }) {
  const { lang, t } = useI18n()
  const { title, subtitle, time, location, ticketLink, lineup, image } = event
  const { month, day } = dateParts(event, t.events.months)
  const isPast = isPastEvent(event)

  return (
    <article className={`event-card ${isPast ? 'event-past' : ''}`}>
      <div className="event-date-column">
        <div className="date-tag">
          <span className="date-month">{month}</span>
          <span className="date-day">{day}</span>
        </div>
        {isPast && <div className="past-badge">{t.events.past}</div>}
      </div>

      <div className="event-info-column">
        <div className="event-poster-container">
          {image ? (
            <img src={image} alt={`${title} ${t.events.poster}`} className="event-poster-img" loading="lazy" decoding="async" />
          ) : (
            <div className="poster-aspect-ratio">
              <p>{title}</p>
            </div>
          )}
        </div>

        <h2 className="event-card-title">{title}</h2>
        {subtitle && (
          <h3 className="hero-subtitle" style={{ textAlign: 'left', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
            {subtitle}
          </h3>
        )}

        <div className="event-meta-row">
          <span className="meta-item">{time}</span>
          <span className="meta-divider">|</span>
          <span className="meta-item">{location}</span>
        </div>

        <div className="event-description-text">
          <p>{tr(event.description, lang)}</p>
        </div>

        {lineup?.length > 0 && (
          <div className="lineup-section">
            <h4 className="lineup-header">{t.events.lineup}</h4>
            <ul className="lineup-list">
              {lineup.map((dj) => (
                <li key={dj.name} className="lineup-item">
                  <div className="dj-info">
                    <span className="dj-name">{dj.name}</span>
                    <span className="dj-genre">{dj.genre}</span>
                  </div>
                  <div className="dj-socials">
                    {dj.instagram && <a href={dj.instagram} target="_blank" rel="noreferrer">Instagram</a>}
                    {dj.soundcloud && <a href={dj.soundcloud} target="_blank" rel="noreferrer">SoundCloud</a>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="event-links">
          {isPast ? (
            <span className="past-event-status">{t.events.concluded}</span>
          ) : ticketLink ? (
            <a href={ticketLink} target="_blank" rel="noreferrer" className="cta-button ticket-btn">
              {t.events.getTickets}
            </a>
          ) : (
            <span className="past-event-status">{t.events.ticketsSoon}</span>
          )}
        </div>
      </div>
    </article>
  )
}

export function RentalTeaser() {
  const { t, paths } = useI18n()
  return (
    <section className="rental-teaser">
      <p>{t.rentalTeaser.text}</p>
      <Link to={paths.rental} className="cta-button">{t.rentalTeaser.button}</Link>
    </section>
  )
}

export default function Events() {
  const { t } = useI18n()
  const upcoming = getUpcomingEvents()
  const past = getPastEvents()
  const [a, and, b] = t.events.none

  return (
    <div className="content-wrapper app-fade-in">
      <h1 className="hero-title">{t.events.title}</h1>

      <div className="events-list">
        {upcoming.length === 0 && (
          <p className="hero-subtitle">
            {a}{' '}
            <a href={SOCIALS.instagramHappeninki} target="_blank" rel="noreferrer">@happeninki</a> {and}{' '}
            <a href={SOCIALS.instagramRyym} target="_blank" rel="noreferrer">@ryym_fi</a> {b}
          </p>
        )}
        {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
        {past.map((e) => <EventCard key={e.id} event={e} />)}
      </div>
      <RentalTeaser />
    </div>
  )
}
