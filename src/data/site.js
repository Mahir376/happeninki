// Site-wide facts used for SEO tags, structured data and the sitemap.
// Change SITE_URL here if the final domain is different.
export const SITE_URL = 'https://reivit.fi'
export const SITE_NAME = 'REIVIT.FI'
export const CONTACT_EMAIL = 'ryymfi@gmail.com'
// Who to contact for what (shown on the contact page)
export const CONTACTS = {
  bookings: 'santeri.happeninki@gmail.com', // booking inquiries, equipment rental
  artists: 'riku.happeninki@gmail.com', // artist inquiries, videographer / photographer services
  general: 'ryymfi@gmail.com', // everything else
}
export const SOCIALS = {
  instagramHappeninki: 'https://www.instagram.com/happeninki/',
  instagramRyym: 'https://www.instagram.com/ryym_fi/',
  tiktok: 'https://www.tiktok.com/@happeninki',
}

// Only real, verifiable details. No made-up address, hours or service area.
export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Häppeninki',
  alternateName: ['REIVIT.FI', 'RYYM'],
  url: SITE_URL,
  email: CONTACT_EMAIL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  sameAs: Object.values(SOCIALS),
}
