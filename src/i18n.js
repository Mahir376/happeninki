// Finnish is the default language (root URLs), English lives under /en.
// All UI text for both languages is in this file. Event and rental texts
// are in src/data/events.js and src/data/rental.js.
import { useLocation } from 'react-router-dom'
import { applyContent } from './content-overrides'

import { ROUTES, langOf, routeKeyOf } from './routes.js'

export { ROUTES, LANGS, LEGACY_REDIRECTS, normalizePath, langOf, routeKeyOf, alternatePath } from './routes.js'

export function useI18n() {
  const { pathname } = useLocation()
  const lang = langOf(pathname)
  const paths = Object.fromEntries(Object.entries(ROUTES).map(([k, v]) => [k, v[lang]]))
  return { lang, t: T[lang], paths, pathname, routeKey: routeKeyOf(pathname) }
}

export const T = {
  fi: {
    nav: { events: 'Tapahtumat', gallery: 'Galleria', residents: 'Tiimi', services: 'Palvelut', rental: 'Kalustovuokraus', contact: 'Yhteystiedot', menu: 'Avaa valikko', lang: 'Kieli' },
    landing: {
      title: 'ETSITKÖ REIVEJÄ TAMPEREELLA?',
      tagline: 'MEILTÄ LÖYTYY!',
      nextEvent: 'Seuraava tapahtuma',
    },
    cards: {
      happeninki: 'House- ja techno-konseptimme',
      ryym: 'Hard techno- ja harder styles -konseptimme',
      goTo: 'Siirry sivulle',
    },
    rentalTeaser: { text: 'Tarvitsetko äänentoistoa, DJ-laitteita tai valoja omaan tapahtumaasi?', button: 'Kalustovuokraus' },
    happeninki: {
      intro: 'Häppeninki on house- ja techno-konseptimme Tampereella. Isot 360-setupit, rullaavat bassolinjat ja yleisö, joka pysyy valojen syttymiseen asti. Tuomme kansainvälisiä vieraita paikallisten artistien rinnalle ja pidämme tanssilattian turvallisempana tilana kaikille, jotka tulevat tanssimaan.',
    },
    ryym: {
      intro: 'RYYM on kovempi puoli: hard technoa ja harder styles -musiikkia täydellä paineella. Luvassa armottomia kickejä, varastotunnelmaa ja alusta asti rakennettuja teemailtoja joutomaareiveistä teräshäkkeihin. Kovaa, nopeaa ja tehty niille, jotka tulivat liikkumaan.',
    },
    showcased: 'Aiemmin esiintyneet',
    showcasedAria: 'Aiemmin esiintyneet artistit',
    timer: {
      next: 'SEURAAVA TAPAHTUMA:', now: 'NYT KÄYNNISSÄ:', tba: 'TULOSSA',
      tbaText: 'Seuraava päivämäärä julkaistaan ensimmäisenä Instagramissa.',
      follow: 'SEURAA PÄIVITYKSIÄ', tickets: 'OSTA LIPUT',
      units: { days: 'päivää', hours: 'tuntia', minutes: 'minuuttia', seconds: 'sekuntia' },
    },
    events: {
      title: 'Tapahtumat',
      none: ['Seuraava tapahtuma julkaistaan pian. Seuraa', 'ja', 'niin kuulet ensimmäisenä.'],
      past: 'MENNYT', concluded: 'Tapahtuma päättynyt', ticketsSoon: 'Liput tulossa pian',
      getTickets: 'Osta liput', lineup: 'LINEUP:', poster: 'juliste',
      months: ['TAM', 'HEL', 'MAA', 'HUH', 'TOU', 'KES', 'HEI', 'ELO', 'SYY', 'LOK', 'MAR', 'JOU'],
    },
    gallery: { title: 'Galleria', subtitle: 'Visuaalinen matka tapahtumiemme läpi.', photo: 'Kuva', close: 'Sulje' },
    residents: {
      title: 'Tiimimme',
      intro: 'Häppeningin ja RYYMin tiimi. Residentit soittavat illat, rakentavat äänet ja valot ja pyörittävät tapahtumat itse ensimmäisestä buukkauksesta viimeiseen biisiin, ja videokuvaajamme tallentaa kaiken. Haluatko jonkun meistä tapahtumaasi? Ota yhteyttä.',
      genre: 'Tyylilaji', aria: 'Residentti-DJ:t',
    },
    services: {
      title: 'Palvelumme',
      intro: 'Tarjoamme kokonaisvaltaisia tapahtumapalveluita yksityisjuhliin, opiskelijajärjestöille, festivaaleille, häihin, yritystapahtumiin ja klubi-iltoihin. Tavoitteenamme on luoda unohtumattomia elämyksiä yhdistämällä laadukas äänentoisto, mukaansatempaava valaistus ja ammattimainen toteutus.',
      cards: [
        {
          title: 'Kalustovuokraus',
          p: [
            'Tarjoamme ammattitason ääni- ja valokalustoa reiveihin, klubi-iltoihin ja yksityistilaisuuksiin. Kalustoomme kuuluu tehokas PA-järjestelmä, DJ-laitteet, valaisimet, usvakone sekä tapahtumatuotannon perustarvikkeet.',
            { pre: 'Katso koko kalustolista ', link: 'kalustovuokraussivulta', to: 'rental', post: '.' },
            'Voit vuokrata yksittäisiä laitteita tai valita kokonaisuuden, johon sisältyy kuljetus, asennus ja purku. Autamme valitsemaan oikean kokoonpanon tilan, yleisön ja tapahtuman konseptin perusteella.',
          ],
        },
        {
          title: 'Juhlien järjestäminen',
          p: [
            'Suunnittelemme ja toteutamme tapahtumat alusta loppuun. Olipa kyseessä syntymäpäivät, valmistujaiset, yritystapahtuma tai teemajuhlat, hoidamme konseptin, teknisen tuotannon, aikataulun ja tunnelman.',
            'Tarvittaessa tarjoamme myös DJ:t, esiintyjät ja koko tapahtuman koordinoinnin. Tavoitteemme on tehdä järjestämisestä vaivatonta isännälle ja illasta unohtumaton vieraille.',
          ],
        },
        {
          title: 'DJ-palvelut häihin ja syntymäpäiville',
          p: [
            'Tarjoamme kokeneita DJ-palveluita häihin, syntymäpäiville ja yksityistilaisuuksiin. Jokainen setti räätälöidään tilaisuuden tyylin ja asiakkaan musiikkitoiveiden mukaan.',
            'Häissä hoidamme illan kulun tervetulojuomista ja ensitanssista täyteen tanssilattiaan myöhään yöhön. Syntymäpäivillä ja yksityisjuhlissa huolehdimme, että tunnelma nousee luontevasti ja bileet jatkuvat.',
          ],
        },
        {
          title: 'Rave Cave kaikenlaisiin juhliin',
          p: [
            'Rave Cave on ainutlaatuinen, modulaarinen pop-up-klubikonseptimme, joka voidaan rakentaa lähes mihin tahansa sopivaan tilaan tai ulkotapahtuma-alueelle. Se yhdistää intiimin underground-tunnelman, tehokkaan äänentoiston ja mukaansatempaavan valaistuksen.',
            'Rave Cave sopii syntymäpäiville, häihin, opiskelijatapahtumiin, festivaaleille, polttareihin ja yksityistilaisuuksiin, ja se muuttaa tavalliset tilat unohtumattomiksi yöelämäkokemuksiksi. Osana suurempaa festivaalialuetta tai omana konseptinaan opiskelijatapahtumassa se luo yleisölle vahvan kohokohdan.',
          ],
        },
      ],
    },
    contact: {
      title: 'Yhteystiedot',
      subtitle: 'Ota yhteyttä palveluihin, DJ-buukkauksiin tai mihin tahansa muuhun liittyen.',
      email: 'Sähköposti', dm: 'Laita meille DM Instagramissa',
      groups: {
        bookings: 'Buukkaukset ja kalustovuokraus',
        artists: 'Artistitiedustelut sekä video- ja valokuvauspalvelut',
        general: 'Kaikki muu',
      },
      renting: { pre: 'Vuokraamassa kalustoa? Katso ensin ', link: 'kalustolista', post: '.' },
    },
    notFound: { text: 'Tätä sivua ei ole olemassa.', back: 'Takaisin etusivulle' },
    footer: { rental: 'Kalustovuokraus Tampere', contact: 'Yhteystiedot' },
    ui: {
      skip: 'Siirry sisältöön',
      open: 'Avaa',
      upNext: 'Seuraavaksi',
      upcoming: 'Tulevat',
      past: 'Menneet tapahtumat',
      emptyBoard: 'Seuraava päivämäärä julkaistaan pian.',
      follow: 'Seuraa',
      weekdays: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
      both: 'Häppeninki × RYYM',
      startsIn: 'Alkuun',
      roles: { dj: 'Residentti-DJ', video: 'Videokuvaaja', production: 'Tapahtumatuotanto, liiketoiminnan kehittäminen ja kaupalliset yhteistyöt' },
      photosSoon: 'Kuvat tulossa',
      portfolio: 'Katso portfolio',
      prev: 'Edellinen kuva',
      next: 'Seuraava kuva',
      rights: 'Kaikki oikeudet pidätetään.',
    },
    ticker: ['House', 'Techno', 'Hard techno', 'Harder styles', 'Safer space', 'Tampere'],
  },

  en: {
    nav: { events: 'Events', gallery: 'Gallery', residents: 'Team', services: 'Services', rental: 'Rental', contact: 'Contact Us', menu: 'Toggle menu', lang: 'Language' },
    landing: {
      title: 'LOOKING FOR RAVES IN TAMPERE?',
      tagline: 'WE GOT YOU COVERED!',
      nextEvent: 'Next event',
    },
    cards: {
      happeninki: 'Our house and techno concept',
      ryym: 'Our hard techno and harder styles concept',
      goTo: 'Go to',
    },
    rentalTeaser: { text: 'Need sound, DJ gear or lights for your own event?', button: 'Equipment rental' },
    happeninki: {
      intro: 'Häppeninki is our house and techno concept in Tampere. Big 360 setups, rolling basslines and a crowd that stays until the lights come on. We bring international guests next to local talent and keep the floor a safer space for everyone who comes to dance.',
    },
    ryym: {
      intro: 'RYYM is the harder side: hard techno and harder styles at full pressure. Expect relentless kicks, warehouse energy and themed nights built from the ground up, from wasteland raves to steel cages. Loud, fast and made for people who came to move.',
    },
    showcased: 'Previously showcased',
    showcasedAria: 'Previously showcased artists',
    timer: {
      next: 'NEXT EVENT:', now: 'HAPPENING NOW:', tba: 'TBA',
      tbaText: 'The next date drops on Instagram first.',
      follow: 'FOLLOW FOR UPDATES', tickets: 'GET TICKETS NOW',
      units: { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds' },
    },
    events: {
      title: 'Events',
      none: ['Next event will be announced soon. Follow', 'and', 'for drops.'],
      past: 'PAST', concluded: 'Event Concluded', ticketsSoon: 'Tickets coming soon',
      getTickets: 'Get Tickets', lineup: 'LINEUP:', poster: 'poster',
      months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    },
    gallery: { title: 'Gallery', subtitle: 'The visual journey of our events.', photo: 'Photo', close: 'Close' },
    residents: {
      title: 'Our Team',
      intro: 'The crew behind Häppeninki and RYYM. The residents play the nights, build the sound and light and run the events themselves, from the first booking to the last track, and our videographer captures all of it. Want one of us at your event? Get in touch.',
      genre: 'Genre', aria: 'Resident DJs',
    },
    services: {
      title: 'Our Services',
      intro: 'We provide full-service event solutions for private parties, student organizations, festivals, weddings, corporate events and club nights. Our goal is to create unforgettable experiences by combining high-quality sound, immersive lighting and professional execution.',
      cards: [
        {
          title: 'Equipment Rentals',
          p: [
            'We offer professional audio and lighting equipment for raves, club nights and private events. Our inventory includes powerful PA system, DJ equipment, lighting fixtures and hazer machines, and essential event production accessories.',
            { pre: 'See the full equipment list on our ', link: 'equipment rental page', to: 'rental', post: '.' },
            'You can rent individual pieces of equipment or choose a complete package with delivery, setup and teardown. We help you select the right setup based on your venue, audience size and event concept.',
          ],
        },
        {
          title: 'Party Hosting',
          p: [
            'We plan and execute events from start to finish. Whether it’s a birthday, graduation party, corporate event or themed celebration, we handle the concept, technical production, schedule and atmosphere.',
            'If needed, we also provide DJs, performers and full event coordination. Our mission is to make the process effortless for the host and unforgettable for the guests.',
          ],
        },
        {
          title: 'DJ Services for Weddings & Birthdays',
          p: [
            'We provide experienced DJ services for weddings, birthdays and private events. Every set is tailored to match the style of the occasion and the client’s musical preferences.',
            'For weddings, we manage the flow of the evening from welcome drinks and the first dance to a packed dance floor late into the night. For birthdays and private celebrations, we ensure the energy builds naturally and keeps the party going.',
          ],
        },
        {
          title: 'Rave Caves for all types of parties',
          p: [
            'Rave Cave is our unique, modular pop-up club concept that can be built inside almost any suitable venue or outdoor event area. It combines an intimate underground atmosphere with powerful sound and immersive lighting.',
            'Perfect for birthdays, weddings, student events, festivals, bachelor and bachelorette parties, and exclusive private events, Rave Cave transforms ordinary spaces into unforgettable nightlife experiences. Whether integrated into a larger festival area or set up as a standalone concept within a student event, it creates a high-impact focal point for the audience.',
          ],
        },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch for Services or DJ bookings or any other inquiries.',
      email: 'Email', dm: 'DM us on Instagram',
      groups: {
        bookings: 'Booking inquiries and equipment rental',
        artists: 'Artist inquiries and videographer / photographer services',
        general: 'Everything else',
      },
      renting: { pre: 'Renting gear? See the ', link: 'equipment list', post: ' first.' },
    },
    notFound: { text: "This page doesn't exist.", back: 'Back to start' },
    footer: { rental: 'Equipment rental Tampere', contact: 'Contact' },
    ui: {
      skip: 'Skip to content',
      open: 'Open',
      upNext: 'Up next',
      upcoming: 'Upcoming',
      past: 'Past events',
      emptyBoard: 'The next date drops soon.',
      follow: 'Follow',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      both: 'Häppeninki × RYYM',
      startsIn: 'Starts in',
      roles: { dj: 'Resident DJ', video: 'Videographer', production: 'Event Production, Business Development & Strategic Partnerships' },
      photosSoon: 'Photos coming soon',
      portfolio: 'See portfolio',
      prev: 'Previous photo',
      next: 'Next photo',
      rights: 'All rights reserved.',
    },
    ticker: ['House', 'Techno', 'Hard techno', 'Harder styles', 'Safer space', 'Tampere'],
  },
}

// Texts changed with the GitHub "Website text" form
applyContent(T)
