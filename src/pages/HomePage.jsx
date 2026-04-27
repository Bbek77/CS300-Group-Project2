import './HomePage.css';

function HomePage() {
  const navItems = ['Home', 'Search', 'Watchlist', 'Originals', 'Movies', 'Series'];
  const studioTiles = ['Disney', 'Pixar', 'Marvel', 'Star Wars', 'National Geographic'];
  const recommended = [
    'The Simpsons',
    'The Mandalorian',
    'Clone Wars',
    'Mickey Mouse Clubhouse',
    'Jessie'
  ];

  return (
    <main className="home-page">
      <header className="home-nav">
        <div className="brand">StreamBox+</div>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item} className="nav-item">
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">Featured</p>
          <h1 id="hero-title">Frozen II</h1>
          <p className="hero-description">Adventure, family, and magic in a world beyond Arendelle.</p>
          <button type="button" className="hero-button">
            Watch Now
          </button>
        </div>
      </section>

      <section className="studios" aria-label="Studio collections">
        {studioTiles.map((studio) => (
          <article key={studio} className="studio-tile">
            <h2>{studio}</h2>
          </article>
        ))}
      </section>

      <section className="recommendations" aria-labelledby="recommended-title">
        <h2 id="recommended-title">Recommended For You</h2>
        <div className="recommendation-grid">
          {recommended.map((title) => (
            <article key={title} className="recommendation-card">
              <div className="card-thumb" />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
