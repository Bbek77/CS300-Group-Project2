import { useAppContext } from '../context/AppContext';

function SearchPage() {
  const { searchQuery, setSearchQuery, activeFilter, setActiveFilter, filteredMedia, toggleWatchlistItem, watchlistIds } =
    useAppContext();

  const filters = ['All', 'Movie', 'Series', 'Family', 'Comedy', 'Sci-Fi', 'Animation', 'Kids'];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Search</h1>
      <p>Find movies and shows using keywords and filters.</p>

      <section aria-labelledby="search-controls" style={{ marginTop: '1.5rem' }}>
        <h2 id="search-controls">Search Controls</h2>
        <input
          type="text"
          placeholder="Search titles..."
          aria-label="Search titles"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          style={{ padding: '0.5rem', minWidth: '260px' }}
        />

        <div style={{ marginTop: '1rem' }}>
          <strong>Filters:</strong>
          <ul style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', padding: 0, listStyle: 'none' }}>
            {filters.map((filter) => (
              <li key={filter}>
                <button
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    borderRadius: '999px',
                    border: '1px solid #2b3654',
                    backgroundColor: activeFilter === filter ? '#1f6feb' : '#0f172a',
                    color: '#f8fafc',
                    cursor: 'pointer'
                  }}
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <strong>Results ({filteredMedia.length}):</strong>
          <ul style={{ marginTop: '0.8rem' }}>
            {filteredMedia.map((mediaItem) => {
              const isSaved = watchlistIds.includes(mediaItem.id);

              return (
                <li key={mediaItem.id} style={{ marginBottom: '0.7rem' }}>
                  {mediaItem.title} — {mediaItem.type} • {mediaItem.genre} • ⭐ {mediaItem.rating}
                  <button
                    type="button"
                    onClick={() => toggleWatchlistItem(mediaItem.id)}
                    style={{ marginLeft: '0.6rem', cursor: 'pointer' }}
                  >
                    {isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default SearchPage;
