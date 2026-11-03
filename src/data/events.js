// ============================================================
// ALL EVENTS LIVE HERE. Add a new event to the top of the list
// and the countdown, landing page and events page update themselves.
//
// start: ISO date-time in Finnish local time (YYYY-MM-DDTHH:MM)
// description / tagline: { fi, en }
// image: path inside /public, or "" for a placeholder
// ticketLink: "" hides the ticket button
// lineup socials: leave "" if the artist has none, the link is hidden
// ============================================================

export const EVENTS = [
  {
    id: 'mirage-2026',
    title: 'MIRAGE - F2F RAVE',
    subtitle: 'RYYM X MUSTAKOLHOOSI',
    tagline: {
      fi: 'MAD MAX -TEEMAINEN 360-REIVI F2F-DJ-SETEILLÄ',
      en: 'A MAD MAX THEMED 360 RAVE WITH F2F DJ SETS',
    },
    concept: 'ryym',
    start: '2026-03-06T22:00',
    time: '22:00 - 04:30',
    location: 'Fame Nightclub, Tampere',
    image: '/img/mirage_poster.png',
    description: {
      fi: 'Joutomaateemainen 360-reivi Face2Face-DJ-setupilla. Ilta täynnä armotonta schranzia, raakaa industrialia ja säälimätöntä hard technoa.',
      en: 'Wasteland-themed 360 rave with a Face2Face DJ setup. A night full of relentless schranz, raw industrial, and merciless hard techno.',
    },
    ticketLink: 'https://kide.app/events/41bf96bb-89c0-4dc3-b25d-6059a67c2fb8',
    lineup: [
      { name: 'Agnia', genre: 'Industrial/Schranz', instagram: 'https://instagram.com/ryym_fi', soundcloud: '' },
      { name: 'Discolisko', genre: 'Hard Techno', instagram: '', soundcloud: '' },
      { name: 'Jori Samarin', genre: 'Raw', instagram: '', soundcloud: '' },
      { name: 'RSKS', genre: 'Hard Groove', instagram: '', soundcloud: '' },
    ],
  },
  {
    id: 'project-blacksite-2026',
    title: 'PROJECT BLACKSITE',
    subtitle: 'HÄPPENINKI 360 RAVE',
    concept: 'happeninki',
    start: '2026-01-31T21:00',
    time: '21:00 - 04:30',
    location: 'Fame Club, Tampere',
    image: '',
    description: {
      fi: 'Moniaistinen 360 asteen reivikokemus. Sukella undergroundin pimeälle puolelle kovimpien industrial- ja acid-biittiemme tahdissa.',
      en: 'A multi-sensory 360-degree rave experience. Dive into the dark side of the underground with our hardest industrial and acid beats.',
    },
    ticketLink: '',
    lineup: [
      { name: 'DJ Ricky', genre: 'Hard Groove', instagram: 'https://instagram.com/happeninki', soundcloud: '' },
      { name: 'Anselmi', genre: 'Hard Techno', instagram: '', soundcloud: '' },
    ],
  },
  {
    id: 'arctic-rave-cage-2025',
    title: 'ARCTIC RAVE CAGE',
    subtitle: 'RYYM & HÄPPENINKI PRESENTS',
    concept: 'both',
    start: '2025-12-05T22:00',
    time: '22:00 - 04:30',
    location: 'Fame Club, Tampere',
    image: '',
    description: {
      fi: 'Teräksen ja jään takana pääsee valloilleen raskas lineup. Pääesiintyjänä italialainen Axiver.',
      en: "Behind the steel and ice, we're unleashing a heavy-hitting lineup. Featuring Italian headliner Axiver.",
    },
    ticketLink: '',
    lineup: [
      { name: 'Axiver (ITA)', genre: 'Hard Techno', instagram: '', soundcloud: '' },
      { name: 'Schellt (UA)', genre: 'Schranz', instagram: '', soundcloud: '' },
    ],
  },
]

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

export function dateParts(event, months) {
  const d = new Date(event.start)
  return { month: months[d.getMonth()], day: String(d.getDate()).padStart(2, '0'), year: d.getFullYear() }
}
