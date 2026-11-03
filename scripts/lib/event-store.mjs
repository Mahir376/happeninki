// Shared helpers for adding events: used by the terminal script
// (scripts/add-event.mjs) and the GitHub "New event" form
// (scripts/event-from-issue.mjs via .github/workflows/add-event.yml).

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

export const ROOT = path.resolve(import.meta.dirname, '..', '..')
export const EVENTS_JSON = path.join(ROOT, 'src/data/events.json')
const POSTER_DIR = path.join(ROOT, 'public/img/posters')
const EVENT_PHOTO_DIR = path.join(ROOT, 'public/img/events')
const ARTIST_DIR = path.join(ROOT, 'public/img/artists')
export const ARTISTS_JSON = path.join(ROOT, 'src/data/artists.json')
export const TEAM_JSON = path.join(ROOT, 'src/data/team.json')
const TEAM_DIR = path.join(ROOT, 'public/img/team')

export const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const isUrl = (s) => /^https?:\/\/\S+$/i.test(s)

// Accepts 2026-03-06, 6.3.2026, 06.03.2026, 6/3/2026
export function parseDate(input) {
  const s = input.trim()
  let y, m, d
  let match = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (match) [, y, m, d] = match
  else if ((match = s.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/))) [, d, m, y] = match
  else return null
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  if (date.getFullYear() !== Number(y) || date.getMonth() !== Number(m) - 1 || date.getDate() !== Number(d)) return null
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// Accepts 22:00, 22.00, 22
export function parseTime(input) {
  const match = input.trim().match(/^(\d{1,2})(?:[:.](\d{2}))?$/)
  if (!match) return null
  const h = Number(match[1])
  const min = Number(match[2] ?? 0)
  if (h > 23 || min > 59) return null
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`
}

// "Name | Genre | https://instagram... | https://soundcloud..." per line.
// Links can be in any order after the genre; they are recognised by domain.
export function parseLineup(text) {
  return text
    .split('\n')
    .map((line) => line.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split('|').map((p) => p.trim()).filter(Boolean)
      const [name, ...rest] = parts
      const links = rest.filter(isUrl)
      const genre = rest.find((p) => !isUrl(p)) ?? ''
      return {
        name,
        genre,
        instagram: links.find((l) => /instagram\.com/i.test(l)) ?? '',
        soundcloud: links.find((l) => /soundcloud\.com/i.test(l)) ?? '',
      }
    })
}

// Builds a validated event object. Returns { event, errors }.
export function buildEvent(f) {
  const errors = []
  const concept = { happeninki: 'happeninki', ryym: 'ryym', both: 'both' }[String(f.concept || '').toLowerCase()]
  if (!concept) errors.push('Brand must be Häppeninki, RYYM or both.')
  const title = (f.title || '').trim()
  if (!title) errors.push('Event title is missing.')
  const date = parseDate(f.date || '')
  if (!date) errors.push(`Date "${f.date || ''}" is not valid. Use for example 6.3.2026 or 2026-03-06.`)
  const start = parseTime(f.startTime || '')
  if (!start) errors.push(`Start time "${f.startTime || ''}" is not valid. Use for example 22:00.`)
  const end = parseTime(f.endTime || '')
  if (!end) errors.push(`End time "${f.endTime || ''}" is not valid. Use for example 04:00.`)
  if (!(f.location || '').trim()) errors.push('Venue is missing.')
  if (!(f.descFi || '').trim() && !(f.descEn || '').trim()) errors.push('Add a description in Finnish or English.')
  const ticketLink = (f.ticketLink || '').trim()
  if (ticketLink && !isUrl(ticketLink)) errors.push('Ticket link must start with https://')

  const descFi = (f.descFi || '').trim()
  const descEn = (f.descEn || '').trim()
  const tagFi = (f.taglineFi || '').trim()
  const tagEn = (f.taglineEn || '').trim()

  const event = {
    id: date ? `${slugify(title)}-${date.slice(0, 4)}` : slugify(title),
    title,
    subtitle: (f.subtitle || '').trim(),
    ...(tagFi || tagEn ? { tagline: { fi: tagFi || tagEn, en: tagEn || tagFi } } : {}),
    concept,
    start: date && start ? `${date}T${start}` : '',
    time: start && end ? `${start} - ${end}` : '',
    location: (f.location || '').trim(),
    image: f.image || '',
    description: { fi: descFi || descEn, en: descEn || descFi },
    ticketLink,
    lineup: Array.isArray(f.lineup) ? f.lineup : parseLineup(f.lineup || ''),
    ...(f.issue ? { issue: f.issue } : {}),
  }
  return { event, errors }
}

export async function readEvents() {
  return JSON.parse(await readFile(EVENTS_JSON, 'utf8'))
}

// Adds the event, or replaces the one created from the same GitHub issue.
export async function upsertEvent(event) {
  const events = await readEvents()
  const existing = event.issue ? events.findIndex((e) => e.issue === event.issue) : -1
  if (existing >= 0) {
    event.id = events[existing].id
    if (!event.image) event.image = events[existing].image
    if (!event.photos?.length && events[existing].photos?.length) event.photos = events[existing].photos
    events[existing] = event
  } else {
    let id = event.id
    for (let n = 2; events.some((e) => e.id === id); n++) id = `${event.id}-${n}`
    event.id = id
    events.unshift(event)
  }
  await writeFile(EVENTS_JSON, JSON.stringify(events, null, 2) + '\n')
  return { event, replaced: existing >= 0 }
}

// Converts a poster (file path or Buffer) to /public/img/posters/<id>.jpg
export async function savePoster(input, id) {
  await mkdir(POSTER_DIR, { recursive: true })
  const out = path.join(POSTER_DIR, `${id}.jpg`)
  await sharp(input).rotate().resize({ width: 1600, height: 2000, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#000000' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out)
  return `/img/posters/${id}.jpg`
}

// Photos from the night: /public/img/events/<id>/1.jpg, 2.jpg ...
export async function saveEventPhotos(inputs, id) {
  const dir = path.join(EVENT_PHOTO_DIR, id)
  await mkdir(dir, { recursive: true })
  const out = []
  for (const [i, input] of inputs.entries()) {
    const file = path.join(dir, `${i + 1}.jpg`)
    await sharp(input).rotate().resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true }).toFile(file)
    out.push(`/img/events/${id}/${i + 1}.jpg`)
  }
  return out
}

// ---------- Artists ----------

export function buildArtist(f) {
  const errors = []
  const name = (f.name || '').trim()
  if (!name) errors.push('Artist name is missing.')
  const concept = { happeninki: 'happeninki', ryym: 'ryym', both: 'both' }[String(f.concept || '').toLowerCase()]
  if (!concept) errors.push('Brand must be Häppeninki, RYYM or both.')
  for (const [label, v] of [['Instagram', f.instagram], ['SoundCloud', f.soundcloud]]) {
    if (v && !isUrl(v.trim())) errors.push(`${label} link must start with https://`)
  }
  const artist = {
    id: slugify(name),
    name,
    from: (f.from || '').trim().toUpperCase(),
    genre: (f.genre || '').trim(),
    concept,
    image: f.image || '',
    position: '',
    instagram: (f.instagram || '').trim(),
    soundcloud: (f.soundcloud || '').trim(),
    playedAt: (f.playedAt || '').trim(),
    ...(f.issue ? { issue: f.issue } : {}),
  }
  return { artist, errors }
}

export async function upsertArtist(artist) {
  const list = JSON.parse(await readFile(ARTISTS_JSON, 'utf8'))
  let i = artist.issue ? list.findIndex((a) => a.issue === artist.issue) : -1
  if (i < 0) i = list.findIndex((a) => a.id === artist.id && !a.issue)
  if (i >= 0) {
    if (!artist.image) artist.image = list[i].image
    artist.position = list[i].position || ''
    list[i] = artist
  } else {
    list.push(artist)
  }
  await writeFile(ARTISTS_JSON, JSON.stringify(list, null, 2) + '\n')
  return { artist, replaced: i >= 0 }
}

export async function saveArtistPhoto(input, id) {
  await mkdir(ARTIST_DIR, { recursive: true })
  await sharp(input).rotate().resize({ width: 1200, height: 1500, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(ARTIST_DIR, `${id}.jpg`))
  return `/img/artists/${id}.jpg`
}

// ---------- Team ----------

const ROLE_KEYS = { 'resident dj': 'dj', videographer: 'video', 'event production': 'production' }
export const roleKeyOf = (label) => {
  const l = (label || '').toLowerCase()
  return Object.entries(ROLE_KEYS).find(([k]) => l.startsWith(k))?.[1] ?? ''
}

// Adds a person, or updates the one with the same name (case-insensitive).
// Empty fields keep the current value. remove: true deletes the person.
export async function upsertMember(f) {
  const list = JSON.parse(await readFile(TEAM_JSON, 'utf8'))
  const name = (f.name || '').trim()
  if (!name) return { errors: ['Name is missing.'] }
  if (f.link && !isUrl(f.link.trim())) return { errors: ['Portfolio / Instagram link must start with https://'] }
  const i = list.findIndex((m) => m.name.toLowerCase() === name.toLowerCase())

  if (f.remove) {
    if (i < 0) return { errors: [`Nobody called ${name} is on the team page.`] }
    list.splice(i, 1)
    await writeFile(TEAM_JSON, JSON.stringify(list, null, 2) + '\n')
    return { action: 'removed', member: { name } }
  }

  const current = i >= 0 ? list[i] : { id: slugify(name), name, role: '', image: '', detail: '', link: '' }
  const m = { ...current, name: i >= 0 ? current.name : name }
  const key = roleKeyOf(f.role)
  const fi = (f.roleFi || '').trim()
  const en = (f.roleEn || '').trim()
  if (fi || en) { m.roleText = { fi: fi || en, en: en || fi }; if (key) m.role = key }
  else if (key) { m.role = key; delete m.roleText }
  if (!m.role && !m.roleText) return { errors: ['Pick a role, or write the role in Finnish or English.'] }
  if (f.detail?.trim()) m.detail = f.detail.trim()
  if (f.link?.trim()) m.link = f.link.trim()
  if (f.image) m.image = f.image
  if (i >= 0) list[i] = m
  else list.push(m)
  await writeFile(TEAM_JSON, JSON.stringify(list, null, 2) + '\n')
  return { action: i >= 0 ? 'updated' : 'added', member: m }
}

export async function saveTeamPhoto(input, id) {
  await mkdir(TEAM_DIR, { recursive: true })
  // portrait 3:4 crop, focused on the top where faces usually are
  await sharp(input).rotate().resize({ width: 1050, height: 1400, fit: 'cover', position: 'north' })
    .jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(TEAM_DIR, `${id}.jpg`))
  return `/img/team/${id}.jpg`
}
