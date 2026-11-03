# REIVIT.FI (Häppeninki + RYYM)

React + Vite site for Häppeninki and RYYM raves in Tampere.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Design

Two inks on black: Häppeninki violet `#7A3CFF` and RYYM red `#FF2A1A`; photos and video are
tinted in the ink of the page. Events sit on a light concrete board. Fonts are Anton and Archivo
(free, self-hosted via npm, no Google Fonts requests). All styles are in `src/styles/theme.css`.

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

**New event (easiest, works from your phone):**

1. On GitHub open the repo, go to **Issues > New issue** and pick **New event**.
2. Fill in the form (Finnish dates like 6.3.2026 work) and drag the poster into the Poster box.
3. Submit. A bot adds the event, converts the poster, checks the site builds, publishes it and
   replies on the issue within about a minute.
4. Need to change something? Edit the issue. The same event updates (it is never duplicated).

Only people with write access to the repo can publish this way. Past events move to the
archive by themselves 6 hours after they start.

**New event from the terminal:** `npm run add-event` asks the same questions, then commit and push.
Events are stored in `src/data/events.json`.

**Team:** people on the team page are in `src/data/team.js` (photo, role, genres, portfolio link).

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
