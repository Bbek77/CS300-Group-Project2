import React from 'react';
import './HomePage.css';
import './WatchlistPage.css';




function WatchlistPage() {
  const watchlists = [
    { name: 'Weekend Picks', count: 6 },
    { name: 'Sci-Fi Favorites', count: 12 },
    { name: 'Must Watch TV', count: 4 }
  ];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Watchlist</h1>
      <p>Your saved watchlists and titles.</p>

      <section aria-labelledby="watchlists-title" style={{ marginTop: '1.5rem' }}>
        <h2 id="watchlists-title">Saved Watchlists</h2>
        <ul>
          {watchlists.map((watchlist) => (
            <li key={watchlist.name}>
              {watchlist.name} ({watchlist.count} items)
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}




export default WatchlistPage;

