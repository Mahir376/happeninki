// Add an upcoming event from the terminal. Asks a few questions, then
// adds the event to src/data/events.json and converts the poster.
//
//   npm run add-event
//
// Easier option: fill in the "New event" form on GitHub (see README),
// which does the same thing and publishes the site automatically.

import { createInterface } from 'node:readline/promises'
import { access } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { buildEvent, upsertEvent, savePoster, parseDate, parseTime, isUrl, ROOT } from './lib/event-store.mjs'

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

const checkUrl = (s) => (isUrl(s) ? null : 'Must start with https://')

console.log('\nNew event. Press Enter to skip optional questions.\n')

const f = {}
f.concept = await ask('Brand: ryym, happeninki or both', {
  validate: (s) => (['ryym', 'happeninki', 'both'].includes(s.toLowerCase()) ? null : 'Type ryym, happeninki or both'),
})
f.title = await ask('Event title, e.g. MIRAGE - F2F RAVE')
f.subtitle = await ask('Subtitle, e.g. RYYM X MUSTAKOLHOOSI', { optional: true })
f.date = await ask('Date, e.g. 6.3.2026', { validate: (s) => (parseDate(s) ? null : 'Use for example 6.3.2026 or 2026-03-06') })
f.startTime = await ask('Doors open, e.g. 22:00', { validate: (s) => (parseTime(s) ? null : 'Use for example 22:00') })
f.endTime = await ask('Ends, e.g. 04:30', { validate: (s) => (parseTime(s) ? null : 'Use for example 04:30') })
f.location = await ask('Venue and city, e.g. Fame Nightclub, Tampere')
f.ticketLink = await ask('Ticket link', { optional: true, validate: (s) => (s ? checkUrl(s) : null) })
f.taglineFi = await ask('Tagline in Finnish', { optional: true })
f.taglineEn = await ask('Tagline in English', { optional: true })
f.descFi = await ask('Description in Finnish', { optional: true })
f.descEn = await ask('Description in English', { optional: !!f.descFi })

f.lineup = []
console.log('\nLineup: one artist at a time, leave the name empty to finish.')
for (let i = 1; ; i++) {
  const name = (await rl.question(`Artist ${i} name: `)).trim()
  if (!name) break
  const genre = await ask(`  Genre for ${name}`, { optional: true })
  const instagram = await ask(`  Instagram link`, { optional: true, validate: (s) => (s ? checkUrl(s) : null) })
  const soundcloud = await ask(`  SoundCloud link`, { optional: true, validate: (s) => (s ? checkUrl(s) : null) })
  f.lineup.push({ name, genre, instagram, soundcloud })
}

const posterPath = (await ask('Poster file (drag the file here)', { optional: true })).replace(/^["']|["']$/g, '')
rl.close()

const { event, errors } = buildEvent(f)
if (errors.length) {
  console.log('\nNot saved:\n' + errors.map((e) => '  - ' + e).join('\n'))
  process.exit(1)
}
if (posterPath) {
  try {
    await access(posterPath)
    event.image = await savePoster(posterPath, event.id)
    console.log('  Poster converted to ' + event.image)
  } catch {
    console.log('  Could not read that poster file, so the event shows a placeholder for now.')
  }
}
const { event: saved } = await upsertEvent(event)
console.log(`\nAdded "${saved.title}" (${saved.start.replace('T', ' ')}) to src/data/events.json.`)
try {
  execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'pipe' })
  console.log('The site builds fine. Commit and push to publish.')
} catch {
  console.log('Warning: the site did not build. Check src/data/events.json.')
}
