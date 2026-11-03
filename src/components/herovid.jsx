function HeroVideo() {
  return (
    <video
      className="video-background"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/video/hero-poster.jpg"
      aria-hidden="true"
    >
      <source src="/video/hero.webm" type="video/webm" />
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  )
}

export default HeroVideo
