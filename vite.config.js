import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { rm, readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { SEO_PAGES, headHtml } from './src/seo.js'
import { SITE_URL } from './src/data/site.js'

// Old full-size files that may still sit in public/ on someone's computer.
// The site uses the optimized copies in public/img and public/video, so
// these are stripped from the build to keep the deploy small.
const LEGACY_ORIGINALS = [
  'gallery', 'residents', 'herovid1.mp4', 'herovid1.webm', 'herovid1.webp', 'Kaki.mp4',
  'artist-beau.jpg', 'artist-hujus.JPG', 'artist-isaiah.jpg', 'artist-axiver.jpg',
  'artist-kaki.png', 'artist-schellt.JPG', 'mirage_poster.png', 'overlay1.jpg', 'overlay2.jpg',
  'happeninki.png', 'vite.svg',
]

const stripLegacyMedia = () => ({
  name: 'strip-legacy-media',
  apply: 'build',
  async closeBundle() {
    for (const p of LEGACY_ORIGINALS) await rm(path.resolve('dist', p), { recursive: true, force: true })
  },
})

// Writes dist/<page>/index.html for every page with its own <title>,
// description, canonical, hreflang and JSON-LD, so Google, WhatsApp and
// Instagram previews see the right tags without running JavaScript.
// Also writes sitemap.xml and robots.txt.
const seoPages = () => ({
  name: 'seo-pages',
  apply: 'build',
  async closeBundle() {
    const dist = path.resolve('dist')
    const template = await readFile(path.join(dist, 'index.html'), 'utf8')
    for (const [route, meta] of Object.entries(SEO_PAGES)) {
      const html = template
        .replace(/<html lang="[^"]*">/, `<html lang="${meta.lang}">`)
        .replace(/<title>.*?<\/title>/s, headHtml(route, meta))
      const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html')
      await mkdir(path.dirname(out), { recursive: true })
      await writeFile(out, html)
    }
    const today = new Date().toISOString().slice(0, 10)
    const urls = Object.entries(SEO_PAGES).map(([route, meta]) => {
      const alts = (meta.alternates || [])
        .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${SITE_URL}${a.path}"/>`)
        .join('')
      return `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>${alts}\n  </url>`
    })
    await writeFile(
      path.join(dist, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
    )
    await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), stripLegacyMedia(), seoPages()],
})
