// URL table for both languages (no React here, so the build can import it too).
// Finnish is the default language (root URLs), English lives under /en.

export const LANGS = ['fi', 'en']

export const ROUTES = {
  home:       { fi: '/',                en: '/en' },
  happeninki: { fi: '/happeninki',      en: '/en/happeninki' },
  ryym:       { fi: '/ryym',            en: '/en/ryym' },
  events:     { fi: '/tapahtumat',      en: '/en/events' },
  gallery:    { fi: '/galleria',        en: '/en/gallery' },
  residents:  { fi: '/residentit',      en: '/en/residents' },
  services:   { fi: '/palvelut',        en: '/en/services' },
  contact:    { fi: '/yhteystiedot',    en: '/en/contact' },
  rental:     { fi: '/kalustovuokraus', en: '/en/equipment-rental' },
}

// Old English-only URLs (already shared on Instagram etc.) -> new English pages
export const LEGACY_REDIRECTS = {
  '/events': ROUTES.events.en,
  '/content': ROUTES.gallery.en,
  '/team': ROUTES.residents.en,
  '/services': ROUTES.services.en,
  '/contact': ROUTES.contact.en,
}

export const normalizePath = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p)
export const langOf = (pathname) => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fi')

export function routeKeyOf(pathname) {
  const p = normalizePath(pathname)
  for (const [key, paths] of Object.entries(ROUTES)) {
    if (paths.fi === p || paths.en === p) return key
  }
  return null
}

// Same page in the other language (falls back to that language's home)
export function alternatePath(pathname, targetLang) {
  const key = routeKeyOf(pathname)
  return key ? ROUTES[key][targetLang] : ROUTES.home[targetLang]
}
