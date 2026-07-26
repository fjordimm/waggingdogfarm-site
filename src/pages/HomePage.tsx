import { PageShell } from '../components/PageShell'

export function HomePage() {
  return (
    <PageShell variant="home">
      <section className="hero-panel">
        <div className="hero-panel__content">
          <p className="eyebrow">A quiet farmstead</p>
          <h1>Wagging Dog Farm</h1>
        </div>
      </section>
    </PageShell>
  )
}
