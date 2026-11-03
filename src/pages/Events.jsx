import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUpcomingEvents, getPastEvents, isPastEvent, eventTime, formatEventDate, eventDateParts, tr } from '../data/events'
import { useI18n } from '../i18n'
import { SOCIALS } from '../data/site'
import { Logo, PageHead, SectionHead } from '../components/ui'
import { BRANDS } from '../data/brands'

const brandsOf = (concept) => (concept === 'both' ? ['happeninki', 'ryym'] : [concept])

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
    <p className="countdown" role="timer" aria-live="off">
      {t.ui.startsIn}{' '}
      {Object.entries(left).map(([unit, value], i) => (
        <span key={unit}>{i > 0 && ' '}<b>{unit === 'days' ? value : String(value).padStart(2, '0')}</b> {t.ui.short[unit]}</span>
      ))}
    </p>
  )
}

export function EventCard({ event, countdown = false, headingLevel = 3 }) {
  const { lang, t } = useI18n()
  const { title, subtitle, time, location, ticketLink, lineup, image, concept } = event
  const past = isPastEvent(event)
  const H = `h${headingLevel}`
  const d = eventDateParts(event, lang)
  const tagline = tr(event.tagline, lang)

  return (
    <article className="event">
      {image ? (
        <div className="event-poster">
          <img src={image} alt={`${title}, ${t.events.poster}`} loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="event-poster event-poster--empty" aria-hidden="true">
          <Logo brand={concept === 'ryym' ? 'ryym' : 'happeninki'} />
        </div>
      )}

      <p className="event-date">
        <span className="wd">{d.wd}</span>
        <time className="day" dateTime={event.start}>{d.dm}</time>
        <span className="year">{d.y}</span>
        <span className="time">{time}</span>
      </p>

      <div className="event-main">
        <H className="event-title">{title}</H>
        {(subtitle || tagline) && <p className="event-sub">{[subtitle, tagline].filter(Boolean).join(' / ')}</p>}
        <p className="event-venue">{location}</p>
        {tr(event.description, lang) && <p className="event-desc">{tr(event.description, lang)}</p>}
        {lineup?.length > 0 && (
          <ul className="lineup" aria-label={t.ui.lineup}>
            {lineup.map((dj) => (
              <li key={dj.name}>
                <span className="name">{dj.name}</span>
                {dj.genre && <span className="genre">{dj.genre}</span>}
                {(dj.instagram || dj.soundcloud) && (
                  <span className="links">
                    {dj.instagram && <a href={dj.instagram} target="_blank" rel="noreferrer">Instagram</a>}
                    {dj.soundcloud && <a href={dj.soundcloud} target="_blank" rel="noreferrer">SoundCloud</a>}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="event-action">
        {brandsOf(concept).map((b) => <img key={b} className="event-brand" src={BRANDS[b].logo} alt={BRANDS[b].name} />)}
        {past ? (
          <span className="event-status">{t.events.concluded}</span>
        ) : ticketLink ? (
          <a className="btn btn--gold" href={ticketLink} target="_blank" rel="noreferrer">{t.events.getTickets}</a>
        ) : (
          <span className="event-status">{t.events.ticketsSoon}</span>
        )}
        {countdown && !past && <Countdown event={event} />}
      </div>
    </article>
  )
}

function Empty({ concept }) {
  const { t } = useI18n()
  const handles = concept === 'ryym' ? [['@ryym_fi', SOCIALS.instagramRyym]]
    : concept === 'happeninki' ? [['@happeninki', SOCIALS.instagramHappeninki]]
    : [['@happeninki', SOCIALS.instagramHappeninki], ['@ryym_fi', SOCIALS.instagramRyym]]
  return (
    <p className="empty">
      {concept ? t.ui.noEventsBrand : t.ui.emptyBoard} {t.ui.follow}{' '}
      {handles.map(([h, url], i) => (
        <span key={h}>{i > 0 && ' & '}<a href={url} target="_blank" rel="noreferrer">{h}</a></span>
      ))}.
    </p>
  )
}

function Archive({ events }) {
  const { lang, t } = useI18n()
  if (!events.length) return null
  return (
    <section className="archive" aria-labelledby="archive-title">
      <SectionHead id="archive-title" title={t.ui.past} />
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            <span className="date">{formatEventDate(e, lang, { weekday: false })}</span>
            <span>
              <span className="name">{e.title}</span>
              <span className="venue">{e.location}</span>
            </span>
            <span className="brand-marks">
              {brandsOf(e.concept).map((b) => <img key={b} src={BRANDS[b].logo} alt={BRANDS[b].name} />)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// concept: only that brand's events ('both' events show everywhere)
export function EventList({ concept, title, showArchive = true, linkAll = false }) {
  const { t, paths } = useI18n()
  const match = (e) => !concept || e.concept === concept || e.concept === 'both'
  const upcoming = getUpcomingEvents().filter(match)
  const past = getPastEvents().filter(match)
  return (
    <section className="section" aria-labelledby="events-title">
      <div className="wrap">
        <SectionHead id="events-title" title={title ?? t.ui.upNext} link={linkAll ? { to: paths.events, label: t.ui.allEvents } : null} />
        {upcoming.length === 0 ? <Empty concept={concept} /> : upcoming.map((e, i) => <EventCard key={e.id} event={e} countdown={i === 0} />)}
        {showArchive && <Archive events={past} />}
      </div>
    </section>
  )
}

export function RentalTeaser() {
  const { t, paths } = useI18n()
  return (
    <section className="section">
      <div className="wrap">
        <div className="teaser">
          <h2 className="h2">{t.rentalTeaser.text}</h2>
          <Link to={paths.rental} className="btn">{t.rentalTeaser.button}</Link>
        </div>
      </div>
    </section>
  )
}

export default function Events() {
  const { t } = useI18n()
  return (
    <>
      <PageHead title={t.events.title} />
      <EventList title={t.ui.upcoming} />
      <RentalTeaser />
    </>
  )
}
