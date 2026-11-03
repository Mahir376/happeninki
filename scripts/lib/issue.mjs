// Helpers for reading GitHub issue-form submissions.
import { writeFile } from 'node:fs/promises'

// Issue forms render as "### Label\n\nvalue" blocks; empty answers are "_No response_"
export function parseIssueBody(body, fields) {
  const sections = {}
  for (const part of (body || '').replace(/\r\n/g, '\n').split(/^### /m).slice(1)) {
    const nl = part.indexOf('\n')
    const label = part.slice(0, nl === -1 ? undefined : nl).trim()
    const value = nl === -1 ? '' : part.slice(nl + 1).trim()
    sections[label] = value === '_No response_' ? '' : value
  }
  const out = {}
  for (const [key, label] of Object.entries(fields)) out[key] = sections[label] ?? ''
  return out
}

const BRAND = { 'häppeninki': 'happeninki', happeninki: 'happeninki', ryym: 'ryym' }
export const brandOf = (s) => BRAND[s.trim().toLowerCase()] ?? (/both|molemmat/i.test(s) ? 'both' : s)

// All image links in a textarea (drag-and-drop uploads become markdown or <img>)
export function findImageUrls(text) {
  const urls = []
  for (const m of text.matchAll(/!\[[^\]]*\]\((https:\/\/[^)\s]+)\)/g)) urls.push(m[1])
  for (const m of text.matchAll(/<img[^>]+src="(https:\/\/[^"]+)"/gi)) urls.push(m[1])
  if (!urls.length) for (const m of text.matchAll(/https:\/\/\S+/g)) urls.push(m[0])
  return [...new Set(urls)]
}

export async function download(url) {
  const headers = {}
  if (/^https:\/\/(github\.com|[^/]*githubusercontent\.com)\//.test(url) && process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const res = await fetch(url, { headers, redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

// Result the workflow posts back as a comment
export async function finish(result) {
  await writeFile('.issue-result.json', JSON.stringify(result))
  console.log(result.message)
  if (!result.ok) process.exitCode = 1
}
