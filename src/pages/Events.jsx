import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUpcomingEvents, getPastEvents, isPastEvent, eventTime, dateParts, tr } from '../data/events'
import { useI18n } from '../i18n'
import { SOCIALS } from '../data/site'

const BRAND_NAME = { happeninki: 'Häppeninki', ryym: 'RYYM' }

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

function Countdown({ event }) {
  const { t } = useI18n()
  const target = eventTime(event)
  const [left, setLeft] = useState(() => timeLeftUntil(target))
  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeftUntil(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  if (!left) return null
  return (
    <div className="countdown" role="timer" aria-label={t.ui.startsIn}>
      {Object.entries(left).map(([unit, value]) => (
        <div key={unit}>
          <b>{String(value).padStart(2, '0')}</b>
          <span>{t.timer.units[unit]}</span>
        </div>
      ))}
    </div>
  )
}

// The event as a ticket: strip on top (tickets | date | brand), details below
export function EventTicket({ event, countdown = false, headingLevel = 3 }) {
  const { lang, t } = useI18n()
  const { title, subtitle, time, location, ticketLink, lineup, image, concept } = event
  const d = dateParts(event, t.events.months, t.ui.weekdays)
  const past = isPastEvent(event)
  const H = `h${headingLevel}`
  const brand = concept === 'both' ? t.ui.both : BRAND_NAME[concept]

  return (
    <article className={`ticket ticket--${concept}`}>
      <div className="ticket-strip">
        {past ? (
          <span className="ticket-buy ticket-buy--off">{t.events.concluded}</span>
        ) : ticketLink ? (
          <a className="ticket-buy" href={ticketLink} target="_blank" rel="noreferrer">{t.events.getTickets}</a>
        ) : (
          <span className="ticket-buy ticket-buy--off">{t.events.ticketsSoon}</span>
        )}
        <span className="ticket-date">
          <time dateTime={event.start}>{d.weekday} {d.dayNum}.{d.monthNum}.{d.year}</time>
          <span aria-hidden="true">/</span>
          <span>{time}</span>
        </span>
        <span className="ticket-brand">{brand}</span>
      </div>

      <div className="ticket-body">
        {image ? (
          <div className="ticket-poster">
            <img src={image} alt={`${title} ${t.events.poster}`} loading="lazy" decoding="async" />
          </div>
        ) : (
          <div className="ticket-poster ticket-poster--empty" aria-hidden="true">{title}</div>
        )}

        <div>
          <H className="display ticket-title">{title}</H>
          {subtitle && <p className="ticket-sub">{subtitle}</p>}
          <p className="ticket-meta">{location}</p>
          {tr(event.tagline, lang) && <p className="ticket-meta">{tr(event.tagline, lang)}</p>}
          {countdown && !past && <Countdown event={event} />}
          <p className="ticket-desc">{tr(event.description, lang)}</p>

          {lineup?.length > 0 && (
            <div className="ticket-lineup">
              <ul aria-label={t.events.lineup}>
                {lineup.map((dj) => (
                  <li key={dj.name}>
                    <span className="dj-name">{dj.name}</span>
                    {dj.genre && <span className="dj-genre">{dj.genre}</span>}
                    <span className="dj-links">
                      {dj.instagram && <a href={dj.instagram} target="_blank" rel="noreferrer">Instagram</a>}
                      {dj.soundcloud && <a href={dj.soundcloud} target="_blank" rel="noreferrer">SoundCloud</a>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function EmptyBoard() {
  const { t } = useI18n()
  return (
    <p className="board-empty">
      {t.ui.emptyBoard} {t.ui.follow}{' '}
      <a href={SOCIALS.instagramHappeninki} target="_blank" rel="noreferrer">@happeninki</a> &{' '}
      <a href={SOCIALS.instagramRyym} target="_blank" rel="noreferrer">@ryym_fi</a>.
    </p>
  )
}

function Archive({ events }) {
  const { t } = useI18n()
  if (!events.length) return null
  return (
    <section className="archive" aria-labelledby="archive-title">
      <h2 id="archive-title" className="display">{t.ui.past}</h2>
      <ul>
        {events.map((e) => {
          const d = dateParts(e, t.events.months, t.ui.weekdays)
          return (
            <li key={e.id}>
              <span className="archive-date">{d.dayNum}.{d.monthNum}.{d.year}</span>
              <span>
                <span className="archive-title">{e.title}</span>
                <span className="archive-venue"> {e.location}</span>
              </span>
              <span className={`chip chip--${e.concept}`}>{e.concept === 'both' ? t.ui.both : BRAND_NAME[e.concept]}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

// concept: only show that brand's events ('both' events show everywhere)
export function EventsBoard({ concept, title, showArchive = true, limit }) {
  const { t } = useI18n()
  const match = (e) => !concept || e.concept === concept || e.concept === 'both'
  const upcoming = getUpcomingEvents().filter(match).slice(0, limit ?? undefined)
  const past = getPastEvents().filter(match)
  return (
    <section className="board section" aria-labelledby="board-title">
      <div className="wrap">
        <h2 id="board-title" className="display board-title">{title ?? t.ui.upNext}</h2>
        {upcoming.length === 0 ? <EmptyBoard /> : upcoming.map((e, i) => <EventTicket key={e.id} event={e} countdown={i === 0} />)}
        {showArchive && <Archive events={past} />}
      </div>
    </section>
  )
}

export function RentalTeaser() {
  const { t, paths } = useI18n()
  return (
    <section className="section">
      <div className="wrap teaser">
        <h2 className="display">{t.rentalTeaser.text}</h2>
        <Link to={paths.rental} className="btn">{t.rentalTeaser.button}</Link>
      </div>
    </section>
  )
}

export default function Events() {
  const { t } = useI18n()
  return (
    <>
      <div className="wrap page-head">
        <h1 className="display"><span className="stretch">{t.events.title}</span></h1>
      </div>
      <EventsBoard title={t.ui.upcoming} />
      <RentalTeaser />
    </>
  )
}
