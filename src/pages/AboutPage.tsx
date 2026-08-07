import { PageShell } from '../components/PageShell'

export function AboutPage() {
  return (
    <PageShell currentPath="/about">
      <section className="about-page">
        <h1>About</h1>
        <p>
          Wagging Dog Farm is a small family-run sanctuary where happy dogs, rustic charm, and good
          food come together. We care for a growing pack of joyful pups, share seasonal stories, and
          welcome visitors who love animals, country living, and cozy farm life.
        </p>
        <article className="about-contact-card">
          <h2>Contact</h2>
          <p>
            Phone: <strong>(555) 123-4567</strong>
          </p>
          <p>
            Email: <strong>hello@waggingdogfarm.com</strong>
          </p>
          <p>
            Address: <strong>123 Wagging Tail Road, Countryside, USA</strong>
          </p>
          <p>
            Hours: <strong>Mon–Sat, 9am–5pm</strong>
          </p>
        </article>
      </section>
    </PageShell>
  )
}
