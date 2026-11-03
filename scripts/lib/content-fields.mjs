// Texts that can be changed with the GitHub "Website text" form.
// To make another text editable: add a line here, then run
//   node scripts/build-content-form.mjs
// which rewrites .github/ISSUE_TEMPLATE/website-text.yml.
//
// key: where the text lives (src/i18n.js, or src/data/rental.js for "rental.*")
// kind: 'text' (one piece of text), 'list' (comma separated words),
//       'paragraphs' (paragraphs separated by an empty line)
export const CONTENT_FIELDS = [
  { label: 'Front page: headline', key: 'landing.title', kind: 'text' },
  { label: 'Front page: line under the headline', key: 'landing.tagline', kind: 'text' },
  { label: 'Front page: Häppeninki short description', key: 'cards.happeninki', kind: 'text' },
  { label: 'Front page: RYYM short description', key: 'cards.ryym', kind: 'text' },
  { label: 'Front page: equipment rental question', key: 'rentalTeaser.text', kind: 'text' },
  { label: 'Genre strip words (comma separated)', key: 'ticker', kind: 'list' },
  { label: 'Häppeninki page: intro', key: 'happeninki.intro', kind: 'text' },
  { label: 'RYYM page: intro', key: 'ryym.intro', kind: 'text' },
  { label: 'Previously showcased: heading', key: 'showcased', kind: 'text' },
  { label: 'Message when no events are announced', key: 'ui.emptyBoard', kind: 'text' },
  { label: 'Events page: title', key: 'events.title', kind: 'text' },
  { label: 'Gallery page: intro', key: 'gallery.subtitle', kind: 'text' },
  { label: 'Team page: title', key: 'residents.title', kind: 'text' },
  { label: 'Team page: intro', key: 'residents.intro', kind: 'text' },
  { label: 'Services page: intro', key: 'services.intro', kind: 'text' },
  { label: 'Services: 1st service title', key: 'services.cards.0.title', kind: 'text' },
  { label: 'Services: 1st service text', key: 'services.cards.0.p', kind: 'paragraphs' },
  { label: 'Services: 2nd service title', key: 'services.cards.1.title', kind: 'text' },
  { label: 'Services: 2nd service text', key: 'services.cards.1.p', kind: 'paragraphs' },
  { label: 'Services: 3rd service title', key: 'services.cards.2.title', kind: 'text' },
  { label: 'Services: 3rd service text', key: 'services.cards.2.p', kind: 'paragraphs' },
  { label: 'Services: 4th service title', key: 'services.cards.3.title', kind: 'text' },
  { label: 'Services: 4th service text', key: 'services.cards.3.p', kind: 'paragraphs' },
  { label: 'Equipment rental page: intro', key: 'rental.intro', kind: 'paragraphs' },
  { label: 'Contact page: intro', key: 'contact.subtitle', kind: 'text' },
  { label: 'Contact page: label for bookings email', key: 'contact.groups.bookings', kind: 'text' },
  { label: 'Contact page: label for artists email', key: 'contact.groups.artists', kind: 'text' },
  { label: 'Contact page: label for general email', key: 'contact.groups.general', kind: 'text' },
  { label: 'Footer: copyright line', key: 'ui.rights', kind: 'text' },
]
