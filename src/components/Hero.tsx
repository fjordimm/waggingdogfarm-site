export function Hero() {
  return (
    <section className="hero-section" id="about">
      <div className="hero-copy">
        <p className="eyebrow">A cozy countryside home for every wag</p>
        <h1>Happy tails, fresh air, and patient care.</h1>
        <p className="hero-text">
          From sunny morning walks to calm evening cuddles, our farm offers a warm, welcoming space for dogs to feel right at home.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#visit">
            Plan a visit
          </a>
          <a className="btn btn-secondary" href="#services">
            Meet the farm
          </a>
        </div>
      </div>
      <div className="hero-card" id="visit">
        <h2>Today at the farm</h2>
        <ul>
          <li>Morning playtime in the meadow</li>
          <li>Fresh water and homemade treats</li>
          <li>Soft beds and quiet nap corners</li>
        </ul>
      </div>
    </section>
  )
}
