import { PageShell } from '../components/PageShell'

export function HomePage() {
  return (
    <PageShell variant="home" currentPath="/">
      <section className="hero-panel" />
    </PageShell>
  )
}
