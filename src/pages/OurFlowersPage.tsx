import { PageShell } from '../components/PageShell'
import { useEffect, useState } from 'react'

function useFlowerImages() {
  const [flowerImages, setFlowerImages] = useState<string[]>([])

  useEffect(() => {
    fetch('/images/our_flowers/manifest.json')
      .then((response) => response.json() as Promise<string[]>)
      .then(setFlowerImages)
      .catch(() => setFlowerImages([]))
  }, [])

  return flowerImages
}

function getFlowerName(filename: string) {
  return filename.replace(/\.(jpe?g|png|webp|gif)$/i, '')
}

function getFlowerImagePath(filename: string) {
  return `/images/our_flowers/${encodeURIComponent(filename)}`
}

export function OurFlowersPage() {
  const flowerImages = useFlowerImages()

  return (
    <PageShell currentPath="/our-flowers">
      <section className="content-shell flowers-page">
        <header className="flowers-page__header">
          <h1 className="page-title">Our Flowers</h1>
          <img src="/images/flower_divider.png" alt="" className="content-page__divider" />
        </header>
        <div className="flower-gallery">
          {flowerImages.map((filename) => (
            <figure className="flower-card" key={filename}>
              <img
                src={getFlowerImagePath(filename)}
                alt={getFlowerName(filename)}
                loading="lazy"
              />
              <figcaption>{getFlowerName(filename)}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
