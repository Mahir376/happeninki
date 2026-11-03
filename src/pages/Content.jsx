import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n'
import './Content.css'

const GALLERY_SIZE = 67
const getThumbSrc = (index) => `/img/gallery/thumbs/${index + 1}.jpg`
const getFullSrc = (index) => `/img/gallery/${index + 1}.jpg`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const lightboxVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
}

const lightboxImageVariants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 0, scale: 0.96 },
}

function GalleryImage({ index, thumbSrc, fullSrc, onClick, label }) {
  const [src, setSrc] = useState(null)
  const [failed, setFailed] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && src === null) {
          setSrc(thumbSrc)
        }
      },
      { rootMargin: '400px', threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [thumbSrc, src])

  const handleError = () => {
    if (!failed) {
      setFailed(true)
      setSrc(fullSrc)
    }
  }

  return (
    <motion.div
      ref={wrapRef}
      className="gallery-item-wrap"
      variants={itemVariants}
      layout
    >
      <motion.div
        className="gallery-item"
        onClick={onClick}
        whileHover={{
          scale: 1.03,
          boxShadow: '0 12px 40px var(--accent-soft), 0 0 0 1px var(--accent-strong)',
        }}
        transition={{ duration: 0.25 }}
      >
        {src ? (
          <img
            src={src}
            alt={`${label} ${index + 1}`}
            className="gallery-img"
            loading="lazy"
            decoding="async"
            onError={handleError}
          />
        ) : (
          <div className="gallery-img-placeholder" aria-hidden />
        )}
        <div className="gallery-caption glassmorphism-caption">
          <span>{label} {index + 1}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Content() {
  const { t } = useI18n()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const images = Array.from({ length: GALLERY_SIZE }, (_, i) => ({
    id: i,
    thumbSrc: getThumbSrc(i),
    fullSrc: getFullSrc(i),
  }))

  return (
    <div className="content-wrapper content-wrapper--gallery">
      <h1 className="hero-title">{t.gallery.title}</h1>
      <h2 className="hero-subtitle">{t.gallery.subtitle}</h2>

      <motion.div
        className="gallery-masonry"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map(({ id, thumbSrc, fullSrc }, index) => (
          <GalleryImage
            key={id}
            index={index}
            thumbSrc={thumbSrc}
            fullSrc={fullSrc}
            onClick={() => setLightboxIndex(index)}
            label={t.gallery.photo}
          />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {lightboxIndex !== null && (
          <motion.div
            className="gallery-lightbox"
            onClick={() => setLightboxIndex(null)}
            variants={lightboxVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.2 }}
          >
            <motion.button
              type="button"
              className="gallery-lightbox-close"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              aria-label={t.gallery.close}
            >
              ×
            </motion.button>
            <motion.img
              src={images[lightboxIndex]?.fullSrc}
              alt={`${t.gallery.photo} ${lightboxIndex + 1}`}
              className="gallery-lightbox-img"
              variants={lightboxImageVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}