import { PageShell } from '../components/PageShell'

export function AboutPage() {
  return (
    <PageShell currentPath="/about">
      <section className="content-shell about-page">
        <header className="content-page__header">
          <h1 className="page-title">About</h1>
          <img src="/images/flower_divider.png" alt="" className="content-page__divider" />
        </header>
      </section>
    </PageShell>
  )
}
