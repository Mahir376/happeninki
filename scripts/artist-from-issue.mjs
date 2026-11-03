// Turns a GitHub "Artist" issue into an entry in src/data/artists.json
// (the "Previously showcased" section). Editing the issue updates the same artist.
import { buildArtist, upsertArtist, saveArtistPhoto } from './lib/event-store.mjs'
import { parseIssueBody, brandOf, findImageUrls, download, finish } from './lib/issue.mjs'

// Must match the labels in .github/ISSUE_TEMPLATE/new-artist.yml
const FIELDS = {
  name: 'Artist name',
  from: 'Country',
  genre: 'Genre',
  concept: 'Brand',
  playedAt: 'Played at',
  instagram: 'Instagram link',
  soundcloud: 'SoundCloud link',
  photo: 'Photo',
}

const fields = parseIssueBody(process.env.ISSUE_BODY, FIELDS)
fields.concept = brandOf(fields.concept)
fields.issue = Number(process.env.ISSUE_NUMBER) || undefined

const { artist, errors } = buildArtist(fields)
if (errors.length) {
  await finish({ ok: false, message: 'Nothing was published yet. Please edit the issue and fix:\n\n' + errors.map((e) => `- ${e}`).join('\n') })
} else {
  let note = ''
  const [photoUrl] = findImageUrls(fields.photo)
  if (photoUrl) {
    try { artist.image = await saveArtistPhoto(await download(photoUrl), artist.id) }
    catch (err) { note = `\n\nThe photo could not be downloaded (${err.message}); edit the issue and drop it in again.` }
  }
  const { artist: saved, replaced } = await upsertArtist(artist)
  await finish({
    ok: true,
    title: saved.name,
    message: `${replaced ? `Updated **${saved.name}** in` : `Added **${saved.name}** to`} Previously showcased. The site goes live in about a minute.${note}`,
  })
}
