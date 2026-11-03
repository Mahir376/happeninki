// Site check: every page in both languages, at phone to desktop widths.
//   npm run build && npm run preview -- --port 4180   (in another terminal)
//   node tests/site-check.mjs http://localhost:4180
// Reports: wrong-language text, html lang/title/canonical/hreflang,
// language switch target, elements wider than the screen, broken
// images, console errors and failed requests.
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { T } from '../src/i18n.js'
import { ROUTES } from '../src/routes.js'
import { RENTAL } from '../src/data/rental.js'

// Playwright: npx playwright install chromium (or any global install)
const { chromium } = createRequire(import.meta.url)('playwright')

const BASE = process.argv[2] || 'http://localhost:4180'
const WIDTHS = (process.env.WIDTHS || '320,390,768,1024,1440').split(',').map(Number)
const problems = []
const report = (page, msg) => problems.push(`${page}: ${msg}`)

// Every UI string per language, so we can spot one language leaking into the other
function strings(obj, out = new Set()) {
  if (typeof obj === 'string') { if (obj.trim().length >= 6) out.add(obj.trim()) }
  else if (Array.isArray(obj)) obj.forEach((v) => strings(v, out))
  else if (obj && typeof obj === 'object') Object.values(obj).forEach((v) => strings(v, out))
  return out
}
const fi = strings([T.fi, RENTAL.fi]); const en = strings([T.en, RENTAL.en])
const onlyFi = [...fi].filter((s) => !en.has(s)); const onlyEn = [...en].filter((s) => !fi.has(s))

const browser = await chromium.launch()
for (const [key, paths] of Object.entries(ROUTES)) {
  for (const lang of ['fi', 'en']) {
    const path = paths[lang]
    const other = lang === 'fi' ? 'en' : 'fi'
    // 1. Built HTML file (what Vercel serves to Google and link previews)
    const html = readFileSync(new URL(`../dist${path === '/' ? '' : path}/index.html`, import.meta.url), 'utf8')
    const htmlLang = html.match(/<html lang="([^"]+)"/)?.[1]
    if (htmlLang !== lang) report(path, `static html lang="${htmlLang}", expected ${lang}`)
    if (!html.includes(`rel="canonical" href="https://reivit.fi${path === '/' ? '/' : path}"`)) report(path, 'static canonical missing or wrong')
    if (!html.includes(`hreflang="${other}" href="https://reivit.fi${paths[other]}"`)) report(path, 'static hreflang to other language missing')

    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 900 } })
      const errors = []
      page.on('pageerror', (e) => errors.push('JS ' + e.message))
      page.on('console', (m) => m.type() === 'error' && errors.push('console ' + m.text()))
      page.on('response', (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`))
      await page.goto(BASE + path, { waitUntil: 'networkidle' })
      // scroll through so lazy images load
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)) } window.scrollTo(0, 0) })
      await page.waitForTimeout(300)
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth
        const wide = []
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el)
          if (cs.position === 'fixed' || el.closest('.ticker, .nav-menu, .skip-link, [aria-hidden="true"]')) continue
          const b = el.getBoundingClientRect()
          if (b.width && (b.right > vw + 1 || b.left < -1)) wide.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} ${Math.round(b.left)}..${Math.round(b.right)}`)
          // text with no side margin (touching the screen edge)
          if (b.width && el.matches('p, h1, h2, h3, li, a.btn') && el.closest('main') && !el.closest('.hero-media, .lightbox') && (b.left < 8 || b.right > vw - 8)) wide.push(`${el.tagName.toLowerCase()} touches the screen edge: "${el.textContent.trim().slice(0, 30)}"`)
          if (/^H[1-3]$/.test(el.tagName) && el.scrollWidth > el.clientWidth + 1) wide.push(`${el.tagName} text overflows its box: "${el.textContent.slice(0, 30)}"`)
        }
        const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src'))
        return {
          lang: document.documentElement.lang, title: document.title,
          text: document.body.innerText, scroll: document.documentElement.scrollWidth, vw,
          switchHref: document.querySelector(`.lang-switch a[hreflang="${document.documentElement.lang === 'fi' ? 'en' : 'fi'}"]`)?.getAttribute('href'),
          wide: wide.slice(0, 5), broken,
        }
      })
      if (width === 1440) {
        if (r.lang !== lang) report(path, `html lang after load is ${r.lang}`)
        const leaks = (lang === 'fi' ? onlyEn : onlyFi).filter((s) => r.text.includes(s))
        if (leaks.length) report(path, `${other.toUpperCase()} text on ${lang.toUpperCase()} page: ${leaks.slice(0, 4).map((s) => JSON.stringify(s.slice(0, 50))).join(', ')}`)
        if (r.switchHref !== paths[other]) report(path, `language switch goes to ${r.switchHref}, expected ${paths[other]}`)
      }
      if (r.scroll > r.vw) report(path, `@${width}px page scrolls sideways (${r.scroll}px)`)
      for (const w of r.wide) report(path, `@${width}px ${w}`)
      for (const b of r.broken) report(path, `broken image ${b}`)
      for (const e of [...new Set(errors)]) report(path, `@${width}px ${e}`)
      await page.close()
    }
  }
}
// Client-side navigation through the switch keeps the page
const p = await browser.newPage()
await p.goto(BASE + ROUTES.events.fi)
await p.click('.lang-switch a[hreflang="en"]')
await p.waitForTimeout(300)
if (new URL(p.url()).pathname !== ROUTES.events.en) report('switch', `FI events -> EN went to ${p.url()}`)
if ((await p.evaluate(() => document.documentElement.lang)) !== 'en') report('switch', 'lang not updated after switching')
await browser.close()

const unique = [...new Set(problems)]
console.log(unique.length ? unique.join('\n') : 'All checks passed')
process.exitCode = unique.length ? 1 : 0
