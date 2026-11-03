// ============================================================
// Events live in events.json (not here), so they can be added without
// touching code:
//   - GitHub: Issues > New issue > "New event" form (see README)
//   - Terminal: npm run add-event
//
// Fields per event:
//   start: date-time in Finnish local time (YYYY-MM-DDTHH:MM)
//   description / tagline: { fi, en }
//   image: path inside /public, or "" for a placeholder
//   ticketLink: "" hides the ticket button
//   lineup socials: leave "" if the artist has none, the link is hidden
// ============================================================
import EVENTS_DATA from './events.json'

export const EVENTS = EVENTS_DATA

// An event counts as "past" 6 hours after it starts, so it stays
// up as the next event while the night is still running.
const GRACE_MS = 6 * 60 * 60 * 1000

export const eventTime = (event) => new Date(event.start).getTime()
export const isPastEvent = (event, now = Date.now()) => eventTime(event) + GRACE_MS < now

export function getUpcomingEvents(now = Date.now()) {
  return EVENTS.filter((e) => !isPastEvent(e, now)).sort((a, b) => eventTime(a) - eventTime(b))
}

export function getPastEvents(now = Date.now()) {
  return EVENTS.filter((e) => isPastEvent(e, now)).sort((a, b) => eventTime(b) - eventTime(a))
}

// concept: 'happeninki' | 'ryym' | undefined (any)
export function getNextEvent(concept, now = Date.now()) {
  return (
    getUpcomingEvents(now).find((e) => !concept || e.concept === concept || e.concept === 'both') ?? null
  )
}

// Pick the right language from a { fi, en } field (plain strings work too)
export const tr = (field, lang) => (field && typeof field === 'object' ? field[lang] ?? field.en : field)

export function dateParts(event, months, weekdays) {
  const d = new Date(event.start)
  return {
    month: months[d.getMonth()],
    monthNum: d.getMonth() + 1,
    day: String(d.getDate()).padStart(2, '0'),
    dayNum: d.getDate(),
    weekday: weekdays ? weekdays[d.getDay()] : '',
    year: d.getFullYear(),
  }
}
