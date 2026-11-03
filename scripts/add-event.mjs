// Add an upcoming event from the terminal. Asks a few questions, then
// writes the event to the top of src/data/events.js and, if you give it a
// poster file, converts the poster for the website.
//
//   npm run add-event
//
// Press Enter to skip optional questions. Run "npm run lint && npm run build"
// afterwards to check, then commit and push as usual.

import { createInterface } from 'node:readline/promises'
import { readFile, writeFile, copyFile, access, mkdir } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const EVENTS_FILE = path.join(ROOT, 'src/data/events.js')
const rl = createInterface({ input: process.stdin, output: process.stdout })

async function ask(q, { optional = false, validate } = {}) {
  for (;;) {
    const a = (await rl.question(`${q}${optional ? ' (Enter to skip)' : ''}: `)).trim()
    if (!a && optional) return ''
    if (!a) { console.log('  Please enter a value.'); continue }
    const err = validate?.(a)
    if (err) { console.log('  ' + err); continue }
    return a
  }
}

const slug = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const isUrl = (s) => (/^https?:\/\//.test(s) ? null : 'Must start with https://')
const isDate = (s) => (/^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s)) ? null : 'Use the format YYYY-MM-DD, for example 2026-05-16')
const isTime = (s) => (/^\d{2}:\d{2}$/.test(s) ? null : 'Use the format HH:MM, for example 22:00')

console.log('\nNew event. Questions marked with (Finnish/English) need both languages.\n')

const concept = await ask('Brand: ryym or happeninki or both?', {
  validate: (s) => (['ryym', 'happeninki', 'both'].includes(s) ? null : 'Type ryym, happeninki or both'),
})
const title = await ask('Event title, e.g. MIRAGE - F2F RAVE')
const subtitle = await ask('Subtitle, e.g. RYYM X MUSTAKOLHOOSI', { optional: true })
const date = await ask('Date (YYYY-MM-DD)', { validate: isDate })
const startTime = await ask('Start time (HH:MM, 24h)', { validate: isTime })
const endTime = await ask('End time (HH:MM, 24h)', { validate: isTime })
const location = await ask('Venue and city, e.g. Fame Nightclub, Tampere')
const taglineFi = await ask('Tagline (Finnish), e.g. MAD MAX -TEEMAINEN 360-REIVI', { optional: true })
const taglineEn = await ask('Tagline (English)', { optional: true })
const descFi = await ask('Description (Finnish)')
const descEn = await ask('Description (English)')
const ticketLink = await ask('Ticket link (https://...)', { optional: true, validate: (s) => (s ? isUrl(s) : null) })

const lineup = []
console.log('\nLineup. Enter the artist names one at a time; leave the name empty to finish.')
for (let i = 1; ; i++) {
  const name = (await rl.question(`Artist ${i} name (Enter to finish): `)).trim()
  if (!name) break
  const genre = await ask(`  Genre for ${name}`, { optional: true })
  const instagram = await ask(`  Instagram link for ${name}`, { optional: true, validate: (s) => (s ? isUrl(s) : null) })
  const soundcloud = await ask(`  SoundCloud link for ${name}`, { optional: true, validate: (s) => (s ? isUrl(s) : null) })
  lineup.push({ name, genre, instagram, soundcloud })
}

let image = ''
const posterPath = await ask('Poster file path (drag the file here), or Enter to skip', { optional: true })
if (posterPath) {
  const src = posterPath.replace(/^["']|["']$/g, '')
  try {
    await access(src)
    const base = slug(title) + path.extname(src).toLowerCase()
    await mkdir(path.join(ROOT, 'media/posters'), { recursive: true })
    await copyFile(src, path.join(ROOT, 'media/posters', base))
    image = `/img/posters/${slug(title)}.jpg`
    console.log('  Poster copied to media/posters. It will be converted when you run npm run optimize:images.')
  } catch {
    console.log('  Could not find that file. Skipped the poster; add it later by editing the event.')
  }
}
rl.close()

const id = `${slug(title)}-${date.slice(0, 4)}`
const lines = [
  `  {`,
  `    id: ${q(id)},`,
  `    title: ${q(title)},`,
  subtitle ? `    subtitle: ${q(subtitle)},` : null,
  taglineFi || taglineEn ? `    tagline: { fi: ${q(taglineFi || taglineEn)}, en: ${q(taglineEn || taglineFi)} },` : null,
  `    concept: ${q(concept)},`,
  `    start: ${q(`${date}T${startTime}`)},`,
  `    time: ${q(`${startTime} - ${endTime}`)},`,
  `    location: ${q(location)},`,
  `    image: ${q(image)},`,
  `    description: { fi: ${q(descFi)}, en: ${q(descEn)} },`,
  `    ticketLink: ${q(ticketLink)},`,
  `    lineup: [`,
  ...lineup.map((a) => `      { name: ${q(a.name)}, genre: ${q(a.genre)}, instagram: ${q(a.instagram)}, soundcloud: ${q(a.soundcloud)} },`),
  `    ],`,
  `  },`,
].filter((l) => l !== null)

const src = await readFile(EVENTS_FILE, 'utf8')
const marker = 'export const EVENTS = ['
if (!src.includes(marker)) throw new Error('Could not find EVENTS list in events.js')
await writeFile(EVENTS_FILE, src.replace(marker, `${marker}\n${lines.join('\n')}`))

console.log(`\nAdded "${title}" (${date}) to src/data/events.js.`)
try {
  execFileSync('npx', ['eslint', 'src/data/events.js'], { cwd: ROOT, stdio: 'pipe' })
  console.log('Check passed. Commit and push when ready.')
} catch {
  console.log('Warning: the file did not pass the lint check. Open src/data/events.js and check the new entry.')
}
