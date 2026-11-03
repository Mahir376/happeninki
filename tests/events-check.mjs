// Unit checks for event logic: node tests/events-check.mjs
import assert from 'node:assert/strict'
import { eventTime, eventIso, formatEventDate, isPastEvent, getUpcomingEvents, getPastEvents, getNextEvent, tr } from '../src/data/events.js'
import { buildEvent, parseDate, parseTime, parseLineup } from '../scripts/lib/event-store.mjs'

const winter = { start: '2026-12-12T22:00' }
const summer = { start: '2026-06-20T23:00' }
assert.equal(new Date(eventTime(winter)).toISOString(), '2026-12-12T20:00:00.000Z', 'winter is UTC+2')
assert.equal(new Date(eventTime(summer)).toISOString(), '2026-06-20T20:00:00.000Z', 'summer is UTC+3')
assert.equal(eventIso(winter), '2026-12-12T22:00:00+02:00')
assert.equal(eventIso(summer), '2026-06-20T23:00:00+03:00')
assert.equal(formatEventDate(winter, 'fi'), 'la 12.12.2026')
assert.equal(formatEventDate(winter, 'en'), 'Sat 12 Dec 2026')
assert.equal(formatEventDate(winter, 'en', { weekday: false }), '12 Dec 2026')

// Still "upcoming" until 6 h after doors, then archived
const start = eventTime(winter)
assert.equal(isPastEvent(winter, start + 5 * 3600e3), false)
assert.equal(isPastEvent(winter, start + 7 * 3600e3), true)

// Sorting and brand filter
const now = Date.UTC(2026, 0, 1)
const up = getUpcomingEvents(now).map((e) => e.start)
assert.deepEqual(up, [...up].sort())
const past = getPastEvents(Date.UTC(2030, 0, 1)).map((e) => e.start)
assert.deepEqual(past, [...past].sort().reverse())
const ryym = getNextEvent('ryym', now)
assert.ok(!ryym || ['ryym', 'both'].includes(ryym.concept))

assert.equal(tr({ fi: 'a', en: 'b' }, 'fi'), 'a')
assert.equal(tr({ fi: '', en: 'b' }, 'fi'), 'b', 'empty Finnish falls back to English')

// Form parsing
assert.equal(parseDate('6.3.2026'), '2026-03-06')
assert.equal(parseDate('2026-02-30'), null)
assert.equal(parseTime('22'), '22:00')
assert.equal(parseTime('4.30'), '04:30')
assert.equal(parseTime('25:00'), null)
assert.deepEqual(parseLineup('- A | Schranz | https://soundcloud.com/a\nB'), [
  { name: 'A', genre: 'Schranz', instagram: '', soundcloud: 'https://soundcloud.com/a' },
  { name: 'B', genre: '', instagram: '', soundcloud: '' },
])
const { errors } = buildEvent({ concept: 'ryym', title: 'X', date: '1.1.2027', startTime: '22', endTime: '4', location: 'Fame', descFi: 'x' })
assert.deepEqual(errors, [])
console.log('Event checks passed')
