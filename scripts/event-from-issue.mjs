// Turns a GitHub "New event" issue into an event in src/data/events.json.
// Run by .github/workflows/add-event.yml. Reads the issue from env:
//   ISSUE_BODY, ISSUE_NUMBER, GITHUB_TOKEN
// Writes a short result for the workflow to post as a comment:
//   .event-result.json  { ok, message, title, id }

import { writeFile } from 'node:fs/promises'
import { buildEvent, upsertEvent, savePoster } from './lib/event-store.mjs'

// Must match the field labels in .github/ISSUE_TEMPLATE/new-event.yml
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
}

// Issue forms render as "### Label\n\nvalue" blocks; empty answers are "_No response_"
function parseIssueBody(body) {
  const sections = {}
  const parts = body.replace(/\r\n/g, '\n').split(/^### /m).slice(1)
  for (const part of parts) {
    const nl = part.indexOf('\n')
    const label = part.slice(0, nl).trim()
    const value = part.slice(nl + 1).trim()
    sections[label] = value === '_No response_' ? '' : value
  }
  const out = {}
  for (const [key, label] of Object.entries(FIELDS)) out[key] = sections[label] ?? ''
  return out
}

const BRAND = { 'häppeninki': 'happeninki', happeninki: 'happeninki', ryym: 'ryym' }
const brandOf = (s) => (BRAND[s.trim().toLowerCase()] ?? (/both|molemmat/i.test(s) ? 'both' : s))

function findImageUrl(text) {
  const md = text.match(/!\[[^\]]*\]\((https:\/\/[^)\s]+)\)/)
  if (md) return md[1]
  const html = text.match(/<img[^>]+src="(https:\/\/[^"]+)"/i)
  if (html) return html[1]
  const bare = text.match(/https:\/\/\S+/)
  return bare ? bare[0] : ''
}

async function download(url) {
  const headers = {}
  if (/^https:\/\/(github\.com|[^/]*githubusercontent\.com)\//.test(url) && process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const res = await fetch(url, { headers, redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function finish(result) {
  await writeFile('.event-result.json', JSON.stringify(result))
  console.log(result.message)
  if (!result.ok) process.exitCode = 1
}

const fields = parseIssueBody(process.env.ISSUE_BODY || '')
fields.concept = brandOf(fields.concept)
fields.issue = Number(process.env.ISSUE_NUMBER) || undefined

const { event, errors } = buildEvent(fields)
if (errors.length) {
  await finish({ ok: false, message: 'The event was not added yet. Please edit the issue and fix:\n\n' + errors.map((e) => `- ${e}`).join('\n') })
} else {
  let posterNote = ''
  const posterUrl = findImageUrl(fields.poster)
  if (posterUrl) {
    try {
      event.image = await savePoster(await download(posterUrl), event.id)
    } catch (err) {
      posterNote = `\n\nThe poster could not be downloaded (${err.message}), so the event shows a placeholder. Edit the issue and drop the image in again to retry.`
    }
  }
  const { event: saved, replaced } = await upsertEvent(event)
  await finish({
    ok: true,
    id: saved.id,
    title: saved.title,
    message: `${replaced ? 'Updated' : 'Added'} **${saved.title}** (${saved.start.replace('T', ' ')}). The site rebuilds and goes live in about a minute.${posterNote}`,
  })
}
