// Turns the full-size photos in /media into web-sized copies in /public/img.
//
//   npm run optimize:images
//
//   media/gallery/12.jpg   -> public/img/gallery/12.jpg (max 2400 px)
//                          -> public/img/gallery/thumbs/12.jpg (640 px wide)
//   media/artists/x.JPG    -> public/img/artists/x.jpg
//   media/<anything>.png   -> public/img/<anything>.png
//   media/happeninki.png   -> favicon.png, apple-touch-icon.png, og-image.jpg
//
// /media is never modified and is git-ignored (originals stay on your computer).
// Already converted files are skipped, so re-running is fast.

import sharp from 'sharp'
import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const MEDIA = path.join(ROOT, 'media')
const PUBLIC = path.join(ROOT, 'public')
const OUT = path.join(PUBLIC, 'img')

const MAX_FULL = 2400
const THUMB_WIDTH = 640
const IMG_EXT = /\.(jpe?g|png)$/i
const LOGO = 'happeninki.png'

const mtime = (p) => stat(p).then((s) => s.mtimeMs, () => 0)
const mb = (n) => (n / 1048576).toFixed(1) + ' MB'

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function convert(src) {
  const rel = path.relative(MEDIA, src)
  const isPng = /\.png$/i.test(rel)
  const outRel = rel.replace(/\.(jpe?g|png)$/i, isPng ? '.png' : '.jpg')
  const dest = path.join(OUT, outRel)
  const isGallery = rel.split(path.sep)[0] === 'gallery'
  const thumb = isGallery ? path.join(OUT, 'gallery', 'thumbs', path.basename(outRel)) : null

  const srcTime = await mtime(src)
  if ((await mtime(dest)) > srcTime && (!thumb || (await mtime(thumb)) > srcTime)) return null

  await mkdir(path.dirname(dest), { recursive: true })
  let img = sharp(src).rotate().resize({ width: MAX_FULL, height: MAX_FULL, fit: 'inside', withoutEnlargement: true })
  img = isPng ? img.png({ compressionLevel: 9, palette: true, quality: 85 }) : img.jpeg({ quality: 80, mozjpeg: true })
  await img.toFile(dest)

  if (thumb) {
    await mkdir(path.dirname(thumb), { recursive: true })
    await sharp(src).rotate().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).jpeg({ quality: 72, mozjpeg: true }).toFile(thumb)
  }
  const [before, after] = [(await stat(src)).size, (await stat(dest)).size]
  console.log(`${outRel.padEnd(26)} ${mb(before).padStart(8)} -> ${mb(after)}`)
  return [before, after]
}

async function makeIcons() {
  const logo = path.join(MEDIA, LOGO)
  if (!(await mtime(logo))) return
  const black = { r: 0, g: 0, b: 0, alpha: 1 }
  await sharp(logo).resize(64, 64, { fit: 'contain', background: black }).png().toFile(path.join(PUBLIC, 'favicon.png'))
  await sharp(logo).resize(180, 180, { fit: 'contain', background: black }).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'))
  const inner = await sharp(logo).resize(900, 500, { fit: 'inside' }).toBuffer()
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: black } })
    .composite([{ input: inner, gravity: 'center' }])
    .jpeg({ quality: 85 })
    .toFile(path.join(PUBLIC, 'og-image.jpg'))
}

if (!(await mtime(MEDIA))) {
  console.error('No media/ folder found. Put full-size photos in media/ first (see README).')
  process.exit(1)
}

let before = 0
let after = 0
let count = 0
for await (const f of walk(MEDIA)) {
  if (!IMG_EXT.test(f) || path.relative(MEDIA, f) === LOGO) continue
  const r = await convert(f)
  if (r) { before += r[0]; after += r[1]; count++ }
}
await makeIcons()
console.log(count ? `\n${count} images: ${mb(before)} -> ${mb(after)}` : 'All images already up to date.')
