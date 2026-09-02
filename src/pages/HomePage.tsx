import { PageShell } from '../components/PageShell'
import { useEffect, useInsertionEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

function shuffleImages(images: string[]) {
  const shuffledImages = [...images]

  for (let index = shuffledImages.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffledImages[index], shuffledImages[swapIndex]] = [shuffledImages[swapIndex], shuffledImages[index]]
  }

  return shuffledImages
}

function getFlowerImagePath(filename: string) {
  return `/images/our_flowers/${encodeURIComponent(filename)}`
}

export function HomePage() {
  const [flowerImages, setFlowerImages] = useState<string[]>([])
  const [carouselDuration, setCarouselDuration] = useState('120s')
  const carouselTrackRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    fetch('/images/our_flowers/manifest.json')
      .then((response) => response.json() as Promise<string[]>)
      .then((images) => setFlowerImages(shuffleImages(images)))
      .catch(() => setFlowerImages([]))
  }, [])

  useEffect(() => {
    const imageGroup = carouselTrackRef.current?.querySelector<HTMLElement>('.welcome-flower-carousel__group')
    if (!imageGroup) return

    const updateDuration = () => {
      const pixelsPerSecond = 25
      setCarouselDuration(`${imageGroup.getBoundingClientRect().width / pixelsPerSecond}s`)
    }

    updateDuration()
    const resizeObserver = new ResizeObserver(updateDuration)
    resizeObserver.observe(imageGroup)

    return () => resizeObserver.disconnect()
  }, [flowerImages])

  return (
    <>
    <PageShell variant="home" currentPath="/">
      <img className="welcome-image" src="/images/background.jpg" alt="Cows in a meadow" />
      <section className="welcome-intro">
        <img className="welcome-intro__image" src="/images/lady.svg" alt="A woman standing in a field" />
        <div className="welcome-intro__copy">
          <p>This place is somethin’ special.</p>
          <p>
            Boots on and full of grit, we’ll coax this dry dirt into healthy soil and raise us some badass blooms.
          </p>
          <p>This IS our first rodeo, so do be kind, y’all.</p>

          <div className="welcome-intro__values">
            <p className="welcome-intro__values-heading">Around here we:</p>
            <p>Do right by the soil</p>
            <p>Mind the seasons</p>
            <p>Support local</p>
            <p>Welcome ALL folks</p>
            <p>Wag more, bark less</p>
          </div>

          <p>Flowers don’t grow themselves, darlin’. Let’s get to work.</p>
          <p>We’ll leave the gate open for you.</p>
        </div>
      </section>
      {flowerImages.length > 0 && (
        <a className="welcome-flower-carousel" href="/our-flowers" aria-label="View our flowers">
          <span
            className="welcome-flower-carousel__track"
            ref={carouselTrackRef}
            style={{ '--flower-carousel-duration': carouselDuration } as CSSProperties}
          >
            {[0, 1].map((groupIndex) => (
              <span className="welcome-flower-carousel__group" key={groupIndex}>
                {flowerImages.map((filename) => (
                  <img
                    className="welcome-flower-carousel__image"
                    key={`${groupIndex}-${filename}`}
                    src={getFlowerImagePath(filename)}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </span>
            ))}
          </span>
        </a>
      )}
      <section className="ig-feed-section">
        <div className="ig-feed-container">
          <div id="curator-feed-default-feed-layout"><a href="https://curator.io" target="_blank" className="crt-logo crt-tag">Powered by Curator.io</a></div>
        </div>
      </section>
    </PageShell>
    <script async src="https://cdn.curator.io/published/8800de40-9a59-410c-b71c-d82a7e0c80cf.js"></script>
    </>
  )
}
