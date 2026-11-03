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
import EVENTS_DATA from './events.json' with { type: 'json' }

export const EVENTS = EVENTS_DATA

// An event counts as "past" 6 hours after it starts, so it stays
// up as the next event while the night is still running.
const GRACE_MS = 6 * 60 * 60 * 1000

// Event times are Finnish local time. Convert to a real moment in time so
// the countdown is right for visitors in any timezone (and across DST).
const parts = (start) => {
  const [d, t = '00:00'] = start.split('T')
  const [y, m, day] = d.split('-').map(Number)
  const [h, min] = t.split(':').map(Number)
  return { y, m, day, h, min }
}
function helsinkiOffsetMinutes(utcMs) {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Helsinki', hourCycle: 'h23',
    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
  })
  const p = Object.fromEntries(f.formatToParts(new Date(utcMs)).map((x) => [x.type, x.value]))
  return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - utcMs) / 60000
}
export function eventTime(event) {
  const { y, m, day, h, min } = parts(event.start)
  const asUtc = Date.UTC(y, m - 1, day, h, min)
  let ms = asUtc - helsinkiOffsetMinutes(asUtc) * 60000
  ms = asUtc - helsinkiOffsetMinutes(ms) * 60000 // second pass settles DST edges
  return ms
}
// ISO string with the Finnish offset, e.g. 2026-12-12T22:00:00+02:00 (for structured data)
export function eventIso(event) {
  const ms = eventTime(event)
  const off = helsinkiOffsetMinutes(ms)
  const sign = off >= 0 ? '+' : '-'
  const hh = String(Math.floor(Math.abs(off) / 60)).padStart(2, '0')
  const mm = String(Math.abs(off) % 60).padStart(2, '0')
  return `${event.start}:00${sign}${hh}:${mm}`
}
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
export const tr = (field, lang) =>
  field && typeof field === 'object' ? field[lang] || field[lang === 'fi' ? 'en' : 'fi'] || '' : field || ''

// Date shown on the site, from the event's own Finnish date (never shifted by the visitor's timezone)
//   fi: "la 12.12.2026"   en: "Sat 12 Dec 2026"
const WEEKDAYS = { fi: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// Pieces for the big date on event cards: fi { wd: 'la', dm: '12.12.', y: 2026 }, en { wd: 'Sat', dm: '12 Dec', y: 2026 }
export function eventDateParts(event, lang) {
  const { y, m, day } = parts(event.start)
  const wd = WEEKDAYS[lang === 'fi' ? 'fi' : 'en'][new Date(Date.UTC(y, m - 1, day)).getUTCDay()]
  return { wd, dm: lang === 'fi' ? `${day}.${m}.` : `${day} ${MONTHS_EN[m - 1]}`, y }
}

export function formatEventDate(event, lang, { weekday = true } = {}) {
  const { y, m, day } = parts(event.start)
  const wd = WEEKDAYS[lang === 'fi' ? 'fi' : 'en'][new Date(Date.UTC(y, m - 1, day)).getUTCDay()]
  const date = lang === 'fi' ? `${day}.${m}.${y}` : `${day} ${MONTHS_EN[m - 1]} ${y}`
  return weekday ? `${wd} ${date}` : date
}
