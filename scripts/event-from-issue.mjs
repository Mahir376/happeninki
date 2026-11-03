// Turns a GitHub "Event" issue into an event in src/data/events.json.
// Works for upcoming and past events: the date decides where it shows.
// Run by .github/workflows/site-from-issue.yml with ISSUE_BODY, ISSUE_NUMBER, GITHUB_TOKEN.
import { buildEvent, upsertEvent, savePoster, saveEventPhotos } from './lib/event-store.mjs'
import { parseIssueBody, brandOf, findImageUrls, download, finish } from './lib/issue.mjs'

// Must match the labels in .github/ISSUE_TEMPLATE/new-event.yml
const FIELDS = {
  concept: 'Brand',
  title: 'Event title',
  subtitle: 'Subtitle',
  date: 'Date',
  startTime: 'Doors open',
  endTime: 'Ends',
  location: 'Venue',
  ticketLink: 'Ticket link',
  taglineFi: 'Tagline (Finnish)',
  taglineEn: 'Tagline (English)',
  descFi: 'Description (Finnish)',
  descEn: 'Description (English)',
  lineup: 'Lineup',
  poster: 'Poster',
  photos: 'Photos from the night',
}

const fields = parseIssueBody(process.env.ISSUE_BODY, FIELDS)
fields.concept = brandOf(fields.concept)
fields.issue = Number(process.env.ISSUE_NUMBER) || undefined

const { event, errors } = buildEvent(fields)
if (errors.length) {
  await finish({ ok: false, message: 'Nothing was published yet. Please edit the issue and fix:\n\n' + errors.map((e) => `- ${e}`).join('\n') })
} else {
  const notes = []
  const [posterUrl] = findImageUrls(fields.poster)
  if (posterUrl) {
    try { event.image = await savePoster(await download(posterUrl), event.id) }
    catch (err) { notes.push(`The poster could not be downloaded (${err.message}); edit the issue and drop it in again.`) }
  }
  const photoUrls = findImageUrls(fields.photos)
  if (photoUrls.length) {
    const buffers = []
    for (const url of photoUrls) {
      try { buffers.push(await download(url)) } catch (err) { notes.push(`One photo could not be downloaded (${err.message}).`) }
    }
    if (buffers.length) event.photos = await saveEventPhotos(buffers, event.id)
  }
  const { event: saved, replaced } = await upsertEvent(event)
  const when = new Date(`${saved.start}:00+02:00`) < new Date() ? 'It is in the past, so it shows under Past events.' : 'It shows under upcoming events.'
  await finish({
    ok: true,
    title: saved.title,
    message: `${replaced ? 'Updated' : 'Added'} **${saved.title}** (${saved.start.replace('T', ' ')}). ${when} The site goes live in about a minute.` +
      (saved.photos?.length ? ` ${saved.photos.length} photo(s) added.` : '') + (notes.length ? '\n\n' + notes.join('\n') : ''),
  })
}
