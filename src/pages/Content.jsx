import { useState, useEffect, useCallback } from 'react'
import { useI18n } from '../i18n'
import { PageHead } from '../components/ui'

const GALLERY_SIZE = 67
const thumb = (i) => `/img/gallery/thumbs/${i + 1}.jpg`
const full = (i) => `/img/gallery/${i + 1}.jpg`

export default function Content() {
  const { t } = useI18n()
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + GALLERY_SIZE) % GALLERY_SIZE)), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  return (
    <>
      <PageHead title={t.gallery.title} lead={t.gallery.subtitle} />
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <div className="gallery">
          {Array.from({ length: GALLERY_SIZE }, (_, i) => (
            <button type="button" key={i} onClick={() => setOpen(i)} aria-label={`${t.gallery.photo} ${i + 1}`}>
              <img src={thumb(i)} alt="" loading="lazy" decoding="async" width="640" height="853" style={{ height: 'auto' }} />
            </button>
          ))}
        </div>
      </section>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${t.gallery.photo} ${open + 1}`} onClick={close}>
          <img src={full(open)} alt={`${t.gallery.photo} ${open + 1}`} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lightbox-btn lightbox-close" onClick={close} aria-label={t.gallery.close} autoFocus>×</button>
          <button type="button" className="lightbox-btn lightbox-prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label={t.ui.prev}>‹</button>
          <button type="button" className="lightbox-btn lightbox-next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label={t.ui.next}>›</button>
          <p className="lightbox-count">{open + 1} / {GALLERY_SIZE}</p>
        </div>
      )}
    </>
  )
}
