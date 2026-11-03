# REIVIT.FI (Häppeninki + RYYM)

React + Vite site for Häppeninki and RYYM raves in Tampere.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Design

Two inks on black: Häppeninki violet `#7A3CFF` and RYYM red `#FF2A1A` for type and details;
photos and video are shown in their own colours. Events sit on a light concrete board. Fonts are Anton and Archivo
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

**Adding to the site from GitHub (works from your phone):** open the repo, go to
**Issues > New issue** and pick a form:

- **Event (upcoming or past):** title, date (6.3.2026 works), times, venue, tickets, descriptions in
  Finnish and English, lineup, poster, and for past nights a box to drag in photos. Upcoming events
  show on the front page with a countdown; past events go to Past events, where each one opens to
  show its poster, lineup and photos.
- **Team member (add or change):** add someone to the team page, or change an existing person's
  role, photo, genres or link (write their name as it is on the site; empty fields stay the same).
  Custom roles can be written in Finnish and English. A checkbox removes someone.
- **Website text (change a text):** pick the text from a list (front page headline, concept intros,
  genre strip, services texts, contact labels and more) and write the new Finnish and/or English
  version. A checkbox puts the original back. To make another text editable, add it to
  `scripts/lib/content-fields.mjs` and run `node scripts/build-content-form.mjs`.
- **Artist (previously showcased):** name, country, genre, brand, which night they played, Instagram
  and SoundCloud links and a photo. Shows on the front page and on the Häppeninki or RYYM page.

Submit, and a bot converts the images, checks the site builds, publishes it and replies on the issue
within about a minute. To change something later, edit the issue: the same entry updates, it is
never duplicated. If something is wrong (a bad date, a missing name) the bot replies with what to
fix. Only people with write access to the repo can publish.

Data lives in `src/data/events.json` and `src/data/artists.json`; images go to `public/img/posters`,
`public/img/events/<event>` and `public/img/artists`.

**New event from the terminal:** `npm run add-event` asks the same questions, then commit and push.
Events are stored in `src/data/events.json`.

**Team:** people on the team page are in `src/data/team.json` (use the Team member form).

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
