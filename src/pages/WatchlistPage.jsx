import { useAppContext } from '../context/AppContext';

function WatchlistPage() {
  const { watchlistIds, mediaCatalog, clearWatchlist, toggleWatchlistItem } = useAppContext();

  const watchlistItems = mediaCatalog.filter((mediaItem) => watchlistIds.includes(mediaItem.id));

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Watchlist</h1>
      <p>Your saved watchlist titles.</p>

      <section aria-labelledby="watchlists-title" style={{ marginTop: '1.5rem' }}>
        <h2 id="watchlists-title">Saved Items ({watchlistItems.length})</h2>

        {watchlistItems.length === 0 ? (
          <p>No saved titles yet. Add items from Search.</p>
        ) : (
          <>
            <button type="button" onClick={clearWatchlist} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
              Clear Watchlist
            </button>
            <ul>
              {watchlistItems.map((mediaItem) => (
                <li key={mediaItem.id} style={{ marginBottom: '0.7rem' }}>
                  {mediaItem.title} — {mediaItem.type} • {mediaItem.genre} • ⭐ {mediaItem.rating}
                  <button
                    type="button"
                    onClick={() => toggleWatchlistItem(mediaItem.id)}
                    style={{ marginLeft: '0.6rem', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}

export default WatchlistPage;
