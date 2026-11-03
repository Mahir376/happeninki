// Applies text changed with the "Website text" form (src/data/content.json)
// on top of the built-in texts. Kept separate so i18n.js and rental.js stay simple.
import CONTENT from './data/content.json'

function setPath(obj, path, value) {
  const keys = path.split('.')
  let o = obj
  for (const k of keys.slice(0, -1)) {
    if (o[k] == null) return
    o = o[k]
  }
  const last = keys.at(-1)
  const current = o[last]
  if (current === undefined) return
  // Paragraph lists can contain links (objects); keep those where they were
  if (Array.isArray(current) && Array.isArray(value)) {
    const out = [...value]
    current.forEach((item, i) => { if (typeof item !== 'string') out.splice(Math.min(i, out.length), 0, item) })
    o[last] = out
  } else {
    o[last] = value
  }
}

// prefix '' for i18n texts, 'rental.' for the rental page
export function applyContent(dict, prefix = '') {
  for (const lang of ['fi', 'en']) {
    for (const [key, value] of Object.entries(CONTENT[lang] || {})) {
      const isRental = key.startsWith('rental.')
      if (prefix ? !isRental : isRental) continue
      if (dict[lang]) setPath(dict[lang], prefix ? key.slice(prefix.length) : key, value)
    }
  }
}
