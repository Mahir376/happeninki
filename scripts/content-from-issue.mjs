// Changes a text on the site from a GitHub "Website text" issue.
// Writes src/data/content.json, which is applied over the built-in texts.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { ROOT } from './lib/event-store.mjs'
import { CONTENT_FIELDS } from './lib/content-fields.mjs'
import { parseIssueBody, finish } from './lib/issue.mjs'

const FILE = path.join(ROOT, 'src/data/content.json')
const f = parseIssueBody(process.env.ISSUE_BODY, {
  which: 'Which text', fi: 'New Finnish text', en: 'New English text', reset: 'Undo',
})
const field = CONTENT_FIELDS.find((x) => x.label === f.which.trim())
const reset = /\[x\]/i.test(f.reset)

const toValue = (text) => {
  const t = text.trim()
  if (field.kind === 'list') return t.split(/[,\n]/).map((w) => w.trim()).filter(Boolean)
  if (field.kind === 'paragraphs') return t.split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)
  return t.replace(/\s*\n\s*/g, ' ')
}

if (!field) {
  await finish({ ok: false, message: 'Pick the text to change from the "Which text" list, then edit the issue.' })
} else if (!reset && !f.fi.trim() && !f.en.trim()) {
  await finish({ ok: false, message: 'Write the new text in Finnish, English or both, then edit the issue.' })
} else {
  const content = JSON.parse(await readFile(FILE, 'utf8'))
  const done = []
  for (const lang of ['fi', 'en']) {
    content[lang] ??= {}
    const text = f[lang].trim()
    if (text) {
      content[lang][field.key] = toValue(text)
      done.push(lang === 'fi' ? 'Finnish' : 'English')
    } else if (reset && (!f.fi.trim() || !f.en.trim())) {
      if (field.key in content[lang]) { delete content[lang][field.key]; done.push(`${lang === 'fi' ? 'Finnish' : 'English'} put back to the original`) }
    }
  }
  await writeFile(FILE, JSON.stringify(content, null, 2) + '\n')
  await finish({
    ok: true,
    title: field.label,
    message: done.length
      ? `Changed **${field.label}** (${done.join(', ')}). The site goes live in about a minute.`
      : `**${field.label}** already shows the original text, so nothing changed.`,
  })
}
