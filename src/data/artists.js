// Previously showcased artists live in artists.json.
// Add one with the GitHub "New artist" form (see README), or edit the file.
//   concept: 'happeninki' | 'ryym' | 'both'
//   image: path inside /public ("" shows a placeholder)
//   position: optional CSS object-position for the photo crop, e.g. "center 30%"
import ARTISTS_DATA from './artists.json'

export const ARTISTS = ARTISTS_DATA

export function getArtists(concept) {
  return ARTISTS.filter((a) => !concept || a.concept === concept || a.concept === 'both')
}
