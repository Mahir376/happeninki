// Adds or changes someone on the team page from a GitHub "Team member" issue.
// Matches existing people by name; empty fields keep what is already there.
import { upsertMember, saveTeamPhoto, slugify } from './lib/event-store.mjs'
import { parseIssueBody, findImageUrls, download, finish } from './lib/issue.mjs'

// Must match the labels in .github/ISSUE_TEMPLATE/team-member.yml
const FIELDS = {
  name: 'Name',
  role: 'Role',
  roleFi: 'Role in Finnish',
  roleEn: 'Role in English',
  detail: 'Genres or short description',
  link: 'Portfolio / Instagram link',
  photo: 'Photo',
  remove: 'Remove from the team page',
}

const f = parseIssueBody(process.env.ISSUE_BODY, FIELDS)
if (/^(other|muu)/i.test(f.role)) f.role = ''
f.remove = /\[x\]/i.test(f.remove)

const notes = []
const [photoUrl] = f.remove ? [] : findImageUrls(f.photo)
if (photoUrl && f.name.trim()) {
  try { f.image = await saveTeamPhoto(await download(photoUrl), slugify(f.name.trim())) }
  catch (err) { notes.push(`The photo could not be downloaded (${err.message}); edit the issue and drop it in again.`) }
}

const result = await upsertMember(f)
if (result.errors) {
  await finish({ ok: false, message: 'Nothing was changed yet. Please edit the issue and fix:\n\n' + result.errors.map((e) => `- ${e}`).join('\n') })
} else {
  const { action, member } = result
  const verb = { added: 'Added', updated: 'Updated', removed: 'Removed' }[action]
  await finish({
    ok: true,
    title: member.name,
    message: `${verb} **${member.name}** ${{ added: 'to', updated: 'on', removed: 'from' }[action]} the team page. The site goes live in about a minute.` + (notes.length ? '\n\n' + notes.join('\n') : ''),
  })
}
