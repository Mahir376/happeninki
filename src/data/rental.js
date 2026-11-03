// Equipment rental page content, Finnish and English.
// Text and SEO settings from "RENTAL EQUIPMENT (SEO for it).pdf".
// Edit text here; the page, meta tags, FAQ structured data and sitemap use it.

import { ROUTES } from '../routes.js'
import { applyContent } from '../content-overrides.js'

export const RENTAL_PATHS = ROUTES.rental

export const RENTAL = {
  fi: {
    lang: 'fi',
    path: RENTAL_PATHS.fi,
    seoTitle: 'Kalustovuokraus Tampere | Äänentoisto ja DJ-laitteet – Häppeninki',
    metaDescription:
      'Vuokraa äänentoisto, DJ-laitteet, valaistus ja tapahtumatekniikka Tampereella. Kysy tarjous – tarvittaessa hoidamme myös kuljetuksen, asennuksen ja teknisen toteutuksen.',
    ogTitle: 'Tapahtumakaluston vuokraus Tampereella – Häppeninki',
    ogDescription:
      'Äänentoistoa, Pioneer DJ -kalustoa, valaistusta ja tapahtumatekniikkaa. Kysy tarjous Häppeninkiltä Tampereella.',
    h1: 'Kalustovuokraus Tampereella',
    h1Sub: 'Äänentoisto, DJ-kalusto ja tapahtumatekniikka',
    intro: [
      'Etsitkö laadukasta äänentoistoa, DJ-laitteita tai tapahtumatekniikkaa Tampereella, tai muualla Suomessa järjestettävään tapahtumaan? Tarjoamme vuokralle tapahtumakalustoa reiveihin, klubeille, DJ-keikoille, yksityistilaisuuksiin ja muihin tapahtumiin.',
      'Kalustovalikoimaamme kuuluu tehokas äänentoistojärjestelmä, Pioneer DJ -soittimet, Allen & Heath -mikseri, liikkuvat valot, pikseliohjattavat LED-putket, usvakone sekä tapahtumateltta ja DJ-pöytä. Voit tiedustella yksittäisiä laitteita tai pyytää tarjouksen tapahtumaasi sopivasta kokonaisuudesta.',
      'Toimimme Tampereella. Tarpeen mukaan voimme sopia myös kaluston kuljetuksesta, asennuksesta ja tapahtuman teknisestä toteutuksesta. Kerro meille tapahtumasi ajankohta, paikka ja tarpeet – suunnitellaan toimiva ratkaisu yhdessä.',
      'Vuokraushinnat määräytyvät kaluston, vuokra-ajan ja palvelun laajuuden mukaan. Pyydä tarjous, niin palaamme sinulle sopivalla kokonaisuudella.',
    ],
    sections: [
      {
        title: 'Äänentoiston vuokraus Tampereella',
        text: [
          'Äänentoisto on tapahtuman perusta. Meidän äänentoistokalusto soveltuu DJ-keikoille, elektronisen musiikin tapahtumiin, techno-reiveihin, klubeille ja yksityistilaisuuksiin. Järjestelmän bassotoistoa varten käytössä on kaksi custom-rakenteista 18 tuuman subwooferia. Suurempiin tilaisuuksiin kokonaisuutta voidaan täydentää erillisellä Behringer-subwooferilla.',
        ],
        gear: [
          { label: 'Subwooferit', items: ['2 × custom 18" subwooferia, Beyma 18P1000Fe v2 -elementeillä, 1200 W AES / kpl', '1 × Behringer Eurolive B1800X Pro, 18" passiivisubwoofer, 400 W RMS'] },
          { label: 'Yläpääkaiuttimet', items: ['2 × custom-yläpäätä', 'Beyma 12MC500 -keski-/matalataajuuselementti', 'Beyma CD10Fe/N -diskanttidriveri ja TD-194-torvi', 'Noin 500 W AES / kaiutin'] },
          { label: 'Vahvistus ja signaalinkäsittely', items: ['2 × Behringer NX6000-4 -päätevahvistin', '1 × dbx DriveRack PA2 -digitaalinen kaiutinprosessori'] },
        ],
        after: 'Kaluston soveltuvuus ja tarvittava kokoonpano arvioidaan tapahtuman koon, tilan ja käyttötarkoituksen perusteella. Ota yhteyttä, niin katsotaan tapahtumaasi sopiva äänentoistoratkaisu.',
      },
      {
        title: 'DJ-kaluston vuokraus – Pioneer CDJ-2000NXS2 ja Xone:96',
        text: ['Tarvitsetko DJ-laitteet keikalle, klubille tai yksityisbileisiin? Meiltä voit tiedustella ammattikäyttöön suunniteltua DJ-kalustoa, joka sopii esimerkiksi techno- ja elektronisen musiikin tapahtumiin.'],
        gear: [{ items: ['2 × Pioneer CDJ-2000NXS2 -DJ-mediasoitin', '1 × Allen & Heath Xone:96 -DJ-mikseri'] }],
        after: 'Voit kysyä DJ-laitteita erikseen tai osana laajempaa tapahtumakaluston vuokrausta. Kerro tarjouspyynnössä, tarvitsetko lisäksi äänentoiston, valaistuksen tai teknistä apua.',
      },
      {
        title: 'Tapahtumavalaistuksen vuokraus – liikkuvat valot ja LED-putket',
        text: ['Valaistus rakentaa tapahtuman tunnelman ja tekee tilasta visuaalisesti kiinnostavan. Meidän valokalustollamme voit täydentää DJ-keikkaa, klubitapahtumaa, reivejä tai yksityistilaisuutta.'],
        gear: [{ items: ['2 × Elation Fuze Wash Z120 -liikkuva wash-valo', '6 × 10 metrin pikseliohjattava LED-putkivalo', 'Yhteensä 60 metriä LED-putkivalaistusta'] }],
        after: 'Valaistuksen sijoittelu ja kokonaisuus voidaan suunnitella tapahtumatilan ja muun tekniikan mukaan. Kysy tarjousta yksittäisistä valaisimista tai osana tapahtuman teknistä kokonaisuutta.',
      },
      {
        title: 'Tapahtumatehosteet – JEM Compact Hazer Pro',
        text: ['JEM Compact Hazer Pro -usvakoneella saat ilmaan tasaisen usvan, joka tuo valokeilat ja valaistuksen efektit paremmin näkyviin. Usva sopii erityisesti klubiympäristöihin, DJ-keikoille ja elektronisen musiikin tapahtumiin.'],
        gear: [{ items: ['1 × JEM Compact Hazer Pro -usvakone'] }],
      },
      {
        title: 'Tapahtumateltta ja DJ-pöytä',
        text: ['Kalustovalikoimasta löytyy myös tapahtumien käytännön järjestelyihin sopivaa kalustoa:'],
        gear: [{ items: ['1 × palosuojattu tapahtumateltta, 6 × 8 m (48 m²)', '1 × kokoontaitettava DJ-pöytä, mitat 150 × 100 × 50 cm'] }],
        after: 'Teltan ja DJ-pöydän saatavuus sekä käyttötarkoitukseen sopivuus varmistetaan tarjouspyynnön yhteydessä.',
      },
    ],
    quote: {
      title: 'Kalustovuokraus Tampereella – kysy tarjous',
      text: [
        'Suunnitteletko reivejä, klubitapahtumaa, DJ-keikkaa, yritystilaisuutta tai yksityisiä juhlia? Häppeninkiltä voit tiedustella äänentoistoa, DJ-kalustoa, tapahtumavalaistusta ja muuta tapahtumatekniikkaa Tampereella.',
        'Voimme sopia tarpeen mukaan myös kaluston kuljetuksesta, asennuksesta ja teknisestä toteutuksesta. Palvelun laajuus sovitaan aina tapahtuman tarpeiden mukaan.',
        'Kerro tarjouspyynnössä tapahtuman päivämäärä, sijainti, arvioitu osallistujamäärä ja tarvitsemasi kalusto. Hinta muodostetaan kaluston ja sovittavan palvelukokonaisuuden perusteella.',
        'Ota yhteyttä ja pyydä tarjous – rakennetaan tapahtumaasi sopiva kokonaisuus.',
      ],
      button: 'Pyydä tarjous',
      emailSubject: 'Tarjouspyyntö: kalustovuokraus',
      emailBody: 'Hei!\n\nTapahtuman päivämäärä:\nSijainti:\nArvioitu osallistujamäärä:\nTarvittava kalusto:\nTarvitaanko kuljetus / asennus / tekninen toteutus:\n\nTerveisin,\n',
    },
    faqTitle: 'Usein kysyttyä kalustovuokrauksesta',
    faq: [
      { q: 'Missä Häppeninki vuokraa tapahtumakalustoa?', a: 'Kalustovuokrauksen palvelualue on pääosin Tampere ja lähialueet. Muista sijainneista voidaan keskustella erikseen tarjouspyynnön yhteydessä.' },
      { q: 'Mitä kalustoa Häppeninkiltä voi vuokrata?', a: 'Valikoimaan kuuluu äänentoisto, subwooferit, yläpääkaiuttimet, Pioneer CDJ-2000NXS2 -soittimet, Allen & Heath Xone:96 -mikseri, valokalusto, LED-putket, usvakone, tapahtumateltta ja DJ-pöytä.' },
      { q: 'Paljonko kaluston vuokraus maksaa?', a: 'Vuokrahinta annetaan tarjouspyynnön perusteella. Hintaan vaikuttavat vuokrattava kalusto, vuokra-aika sekä mahdollinen kuljetus, asennus ja tekninen toteutus.' },
      { q: 'Onko kuljetus ja asennus mahdollista?', a: 'Kyllä. Tarpeen mukaan voimme sopia kaluston kuljetuksesta, asennuksesta ja tapahtuman teknisestä toteutuksesta. Palvelun sisältö sovitaan tapauskohtaisesti.' },
      { q: 'Voiko vuokrata vain yksittäisen laitteen?', a: 'Voit tiedustella yksittäisten laitteiden vuokrausta tai pyytää tarjouksen useamman laitteen kokonaisuudesta. Saatavuus vahvistetaan tarjouspyynnön yhteydessä.' },
    ],
  },

  en: {
    lang: 'en',
    path: RENTAL_PATHS.en,
    seoTitle: 'Event Equipment Rental in Tampere | Sound & DJ Gear – Häppeninki',
    metaDescription:
      'Rent sound systems, DJ equipment, lighting and event gear in Tampere. Request a quote. Delivery, setup and technical production can also be arranged.',
    ogTitle: 'Event Equipment Rental in Tampere – Häppeninki',
    ogDescription:
      'Sound systems, Pioneer DJ equipment, lighting and event technology for parties, club nights and events. Request a quote.',
    h1: 'Event Equipment Rental in Tampere',
    h1Sub: 'Sound Systems, DJ Gear & Event Technology',
    intro: [
      'Looking for quality sound, DJ equipment or event technology for an event in Tampere? We offer event equipment rental for raves, club nights, DJ performances, private parties and other events.',
      'Our equipment includes a powerful sound system, Pioneer DJ players, an Allen & Heath mixer, moving lights, pixel-controlled LED tubes, a hazer, an event tent and a foldable DJ table. You can enquire about individual items or request a quote for a complete setup tailored to your event.',
      'We are based in Tampere. Delivery, installation and technical event production can also be arranged when needed. Tell us about your event, its location and your technical requirements, and we will work out a suitable solution with you.',
      'Rental prices are provided on request and depend on the equipment, rental period and agreed services. Get in touch for a quote.',
    ],
    sections: [
      {
        title: 'Sound System Rental in Tampere',
        text: ["Sound is the foundation of a great event. Häppeninki's sound equipment is suitable for DJ performances, electronic music events, techno raves, club nights and private parties. The system features two custom-built 18-inch subwoofers. An additional Behringer subwoofer can be added for larger events."],
        gear: [
          { label: 'Subwoofers', items: ['2 × custom 18" subwoofers with Beyma 18P1000Fe v2 drivers, 1200 W AES each', '1 × Behringer Eurolive B1800X Pro, 18" passive subwoofer, 400 W RMS'] },
          { label: 'Top speakers', items: ['2 × custom-built top speakers', 'Beyma 12MC500 mid/low-frequency driver', 'Beyma CD10Fe/N compression driver and TD-194 horn', 'Approximately 500 W AES per speaker'] },
          { label: 'Amplification and signal processing', items: ['2 × Behringer NX6000-4 power amplifiers', '1 × dbx DriveRack PA2 digital loudspeaker processor'] },
        ],
        after: 'The suitable system configuration is assessed according to the size, venue and requirements of your event. Contact us and we can recommend a sound setup for your needs.',
      },
      {
        title: 'DJ Equipment Rental – Pioneer CDJ-2000NXS2 & Xone:96',
        text: ['Need DJ equipment for a gig, club night or private party? Ask Häppeninki about our DJ setup, suitable for professional DJ use, techno nights and electronic music events.'],
        gear: [{ items: ['2 × Pioneer CDJ-2000NXS2 DJ media players', '1 × Allen & Heath Xone:96 DJ mixer'] }],
        after: 'The DJ equipment can be enquired about separately or as part of a larger event setup. Let us know if you also need sound, lighting or technical assistance.',
      },
      {
        title: 'Event Lighting Rental – Moving Lights & LED Tubes',
        text: ["Lighting helps create the atmosphere and gives your event a distinctive visual identity. Häppeninki's lighting equipment can complement DJ performances, club nights, raves and private events."],
        gear: [{ items: ['2 × Elation Fuze Wash Z120 moving wash lights', '6 × 10-metre pixel-controlled LED tubes', '60 metres of LED tube lighting in total'] }],
        after: 'The lighting layout can be planned around your venue and the rest of the technical setup. Request a quote for individual fixtures or a combined event production package.',
      },
      {
        title: 'Event Effects – JEM Compact Hazer Pro',
        text: ['The JEM Compact Hazer Pro creates a fine, even haze that makes light beams and lighting effects more visible. It is a great addition to club environments, DJ performances and electronic music events.'],
        gear: [{ items: ['1 × JEM Compact Hazer Pro hazer'] }],
      },
      {
        title: 'Event Tent & DJ Table',
        text: ['Our available event equipment also includes practical items for event setups:'],
        gear: [{ items: ['1 × fire-retardant event tent, 6 × 8 m (48 m²)', '1 × foldable DJ table, dimensions 150 × 100 × 50 cm'] }],
        after: 'Availability and suitability for your intended use will be confirmed as part of the quote request.',
      },
    ],
    quote: {
      title: 'Event Equipment Rental in Tampere – Request a Quote',
      text: [
        'Planning a rave, club night, DJ performance, corporate event or private party? Ask Häppeninki about sound systems, DJ equipment, event lighting and other event technology in Tampere.',
        'When needed, we can also arrange delivery, installation and technical event production. The scope of the service is agreed according to the needs of each event.',
        'When requesting a quote, please include the event date, location, estimated audience size and the equipment you need. Pricing is based on the selected equipment and any additional services.',
        "Get in touch and request a quote – let's build the right setup for your event.",
      ],
      button: 'Request a quote',
      emailSubject: 'Quote request: equipment rental',
      emailBody: 'Hi!\n\nEvent date:\nLocation:\nEstimated audience size:\nEquipment needed:\nDelivery / installation / technical production needed:\n\nThanks,\n',
    },
    faqTitle: 'Frequently Asked Questions About Equipment Rental',
    faq: [
      { q: 'Where does Häppeninki offer equipment rental?', a: 'Our equipment rental service is based in Tampere. Other locations can be discussed separately when requesting a quote.' },
      { q: 'What equipment can I rent from Häppeninki?', a: 'Our selection includes sound systems, subwoofers, top speakers, Pioneer CDJ-2000NXS2 players, an Allen & Heath Xone:96 mixer, lighting, LED tubes, a hazer, an event tent and a DJ table.' },
      { q: 'How much does equipment rental cost?', a: 'Rental prices are provided on request. The price depends on the equipment, rental period and any agreed delivery, installation or technical production services.' },
      { q: 'Can you deliver and install the equipment?', a: 'Yes. Delivery, installation and technical event production can be arranged when needed. The exact service is agreed for each event.' },
      { q: 'Can I rent individual items?', a: 'You can enquire about individual items or request a quote for a complete equipment package. Availability is confirmed when we receive your enquiry.' },
    ],
  },
}

// Texts changed with the GitHub "Website text" form
applyContent(RENTAL, 'rental.')

export function faqLd(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: page.lang,
    mainEntity: page.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
}
