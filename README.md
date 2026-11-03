# REIVIT.FI (Häppeninki + RYYM)

React + Vite site for Häppeninki and RYYM raves in Tampere.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Languages

The site is in Finnish (default, root URLs) and English (under `/en`). The FI | EN switch in the
navbar goes to the same page in the other language.

- All interface text for both languages: `src/i18n.js`
- URLs for both languages: `src/routes.js` (old links like `/events` redirect to `/en/events`)
- Event texts: `description` and `tagline` in `src/data/events.js` take `{ fi, en }`
- Equipment rental page (fi + en, from the SEO brief): `src/data/rental.js`
- Page titles and meta descriptions: `src/seo.js`

`npm run build` writes a real HTML file for every page with its own title, description,
canonical, hreflang and structured data (FAQ, Organization, Event), plus `sitemap.xml` and
`robots.txt`. After going live, add `https://reivit.fi/sitemap.xml` in Google Search Console.

## Everyday updates

**New event:** edit `src/data/events.js` only. Add the event at the top. The landing page,
events page and both countdowns pick it up automatically and past events get the PAST badge
by themselves. Write `description` and `tagline` in both languages. Put the full-size poster in
`media/`, run `npm run optimize:images` and reference it as `/img/poster-name.jpg`.

**New photos:** put the full-size photo in `media/` (gallery photos in `media/gallery/`, named with
the next number: 68.jpg, 69.jpg, ...), bump `GALLERY_SIZE` in `src/pages/Content.jsx`, then run:

```bash
npm run optimize:images
```

It writes a web-sized copy to `public/img/` (and a thumbnail for gallery photos). The `media/`
folder holds the camera originals, stays on your computer and is never pushed to git.

## Publish (the pipeline)

```bash
npm run lint && npm run build     # must pass before pushing
git add .
git commit -m "Add <event name>"
git push
```

On push, GitHub Actions (`.github/workflows/ci.yml`) lints and builds the site and warns about
oversized files. The host (Vercel or Netlify, connected to the GitHub repo) rebuilds and deploys
automatically. Build command `npm run build`, output folder `dist`. Routing rewrites for
direct links like `/events` are already set in `vercel.json` and `public/_redirects`.

## Hero video

The site plays `public/video/hero.webm` / `hero.mp4` (720p, about 2 to 3 MB). To swap in a new clip:

```bash
ffmpeg -i new.mp4 -vf "scale=-2:720,fps=30" -c:v libx264 -preset slow -crf 29 -pix_fmt yuv420p -an -movflags +faststart public/video/hero.mp4
ffmpeg -i new.mp4 -vf "scale=-2:720,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 42 -an public/video/hero.webm
ffmpeg -ss 1 -i public/video/hero.mp4 -frames:v 1 -vf scale=1280:-2 public/video/hero-poster.jpg
```
