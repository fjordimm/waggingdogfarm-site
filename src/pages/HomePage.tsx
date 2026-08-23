import { PageShell } from '../components/PageShell'

export function HomePage() {
  return (
    <PageShell variant="home" currentPath="/">
      <img className="welcome-image" src="/images/cows.jpg" alt="Cows in a meadow" />
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
    </PageShell>
  )
}
