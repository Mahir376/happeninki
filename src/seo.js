// One place for every page's title, description, language and structured data.
// Used in the browser (RouteEffects in App.jsx) and at build time
// (vite.config.js writes a static HTML file per page with these tags, plus
// sitemap.xml and robots.txt), so crawlers and link previews see them too.

import { SITE_URL, SITE_NAME, ORGANIZATION_LD } from './data/site.js'
import { RENTAL, faqLd } from './data/rental.js'
import { getUpcomingEvents, tr } from './data/events.js'
import { ROUTES } from './routes.js'

function eventsLd(lang) {
  return getUpcomingEvents().map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    description: tr(e.description, lang),
    startDate: e.start,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: e.location.split(',')[0], address: e.location },
    ...(e.image && { image: SITE_URL + e.image }),
    ...(e.ticketLink && { offers: { '@type': 'Offer', url: e.ticketLink, availability: 'https://schema.org/InStock' } }),
    organizer: { '@type': 'Organization', name: 'Häppeninki', url: SITE_URL },
    performer: (e.lineup || []).map((dj) => ({ '@type': 'Person', name: dj.name })),
  }))
}

// Title + description per page and language
const META = {
  home: {
    fi: [`${SITE_NAME} | Reivit Tampereella`, 'Häppeninki ja RYYM: house-, techno-, hard techno- ja harder styles -reivejä Tampereella. Tapahtumat, galleria, residentit ja kalustovuokraus.'],
    en: [`${SITE_NAME} | Raves in Tampere`, 'Häppeninki and RYYM: house, techno, hard techno and harder styles raves in Tampere. Events, gallery, residents and event equipment rental.'],
  },
  happeninki: {
    fi: ['Häppeninki | House- ja techno-reivit Tampereella', 'Häppeninki on house- ja techno-konsepti Tampereella: 360-setupit ja kansainväliset vieraat.'],
    en: ['Häppeninki | House & techno raves in Tampere', 'Häppeninki is a house and techno concept in Tampere with 360 setups and international guests.'],
  },
  ryym: {
    fi: ['RYYM | Hard techno ja harder styles Tampereella', 'RYYM on hard techno- ja harder styles -reivikonsepti Tampereella. Teemaillat, armottomat kickit ja varastotunnelma.'],
    en: ['RYYM | Hard techno & harder styles in Tampere', 'RYYM is a hard techno and harder styles rave concept in Tampere. Themed nights, relentless kicks and warehouse energy.'],
  },
  events: {
    fi: [`Tapahtumat | ${SITE_NAME}`, 'Tulevat ja menneet Häppeninki- ja RYYM-reivit Tampereella: päivämäärät, lineupit ja liput.'],
    en: [`Events | ${SITE_NAME}`, 'Upcoming and past Häppeninki and RYYM raves in Tampere: dates, lineups and tickets.'],
  },
  gallery: {
    fi: [`Galleria | ${SITE_NAME}`, 'Kuvia Häppeninki- ja RYYM-reiveistä Tampereella.'],
    en: [`Gallery | ${SITE_NAME}`, 'Photos from Häppeninki and RYYM raves in Tampere.'],
  },
  residents: {
    fi: [`Residentit | ${SITE_NAME}`, 'Tutustu Häppeningin ja RYYMin residentti-DJ:ihin Tampereella.'],
    en: [`Residents | ${SITE_NAME}`, 'Meet the resident DJs behind Häppeninki and RYYM in Tampere.'],
  },
  services: {
    fi: [`Palvelut | ${SITE_NAME}`, 'Tapahtumatuotanto, juhlien järjestäminen, DJ-palvelut ja kalustovuokraus Tampereella.'],
    en: [`Services | ${SITE_NAME}`, 'Event production, party hosting, DJ services and equipment rental in Tampere.'],
  },
  contact: {
    fi: [`Yhteystiedot | ${SITE_NAME}`, 'Ota yhteyttä Häppeninkiin ja RYYMiin: DJ-buukkaukset, tapahtumapalvelut ja kalustovuokraus Tampereella.'],
    en: [`Contact | ${SITE_NAME}`, 'Contact Häppeninki and RYYM for DJ bookings, event services and equipment rental in Tampere.'],
  },
  rental: {
    fi: [RENTAL.fi.seoTitle, RENTAL.fi.metaDescription],
    en: [RENTAL.en.seoTitle, RENTAL.en.metaDescription],
  },
}

function buildPage(key, lang) {
  const [title, description] = META[key][lang]
  const alternates = [
    { lang: 'fi', path: ROUTES[key].fi },
    { lang: 'en', path: ROUTES[key].en },
    { lang: 'x-default', path: ROUTES[key].fi },
  ]
  const jsonLd = key === 'home' ? [ORGANIZATION_LD]
    : key === 'events' ? eventsLd(lang)
    : key === 'rental' ? [ORGANIZATION_LD, faqLd(RENTAL[lang])]
    : []
  const og = key === 'rental' ? { ogTitle: RENTAL[lang].ogTitle, ogDescription: RENTAL[lang].ogDescription } : {}
  return { title, description, lang, alternates, jsonLd, ...og }
}

export const SEO_PAGES = Object.fromEntries(
  Object.keys(ROUTES).flatMap((key) => ['fi', 'en'].map((lang) => [ROUTES[key][lang], buildPage(key, lang)])),
)

export const NOT_FOUND = { title: `404 | ${SITE_NAME}`, description: META.home.en[1], lang: 'fi' }

// Head tags as an HTML string (used at build time).
export function headHtml(path, meta) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const url = SITE_URL + (path === '/' ? '/' : path)
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.ogTitle || meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.ogDescription || meta.description)}" />`,
    `<meta property="og:locale" content="${meta.lang === 'fi' ? 'fi_FI' : 'en_US'}" />`,
    ...(meta.alternates || []).map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${SITE_URL}${a.path}" />`),
    ...(meta.jsonLd || []).map((ld) => `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`),
  ]
  return tags.join('\n    ')
}

// Same tags, applied live in the browser on every route change.
export function applySeo(path) {
  const meta = SEO_PAGES[path] || NOT_FOUND
  const head = document.head
  document.documentElement.lang = meta.lang
  document.title = meta.title
  head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  // Remove the static per-page tags written at build time, then add fresh ones
  head.querySelectorAll('link[rel=canonical], link[rel=alternate][hreflang], script[type="application/ld+json"], meta[name=description], meta[property^="og:url"], meta[property="og:title"], meta[property="og:description"], meta[property="og:locale"]').forEach((el) => el.remove())
  const tpl = document.createElement('template')
  tpl.innerHTML = headHtml(path, meta)
  tpl.content.querySelectorAll('title').forEach((t) => t.remove())
  ;[...tpl.content.children].forEach((el) => {
    el.setAttribute('data-seo', '')
    if (el.tagName === 'SCRIPT') {
      const s = document.createElement('script') // innerHTML scripts are inert; JSON-LD only needs to exist
      s.type = 'application/ld+json'
      s.textContent = el.textContent
      s.setAttribute('data-seo', '')
      head.appendChild(s)
    } else head.appendChild(el)
  })
}
