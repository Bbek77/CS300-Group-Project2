import useWatchlist from "../hooks/useWatchlist";

export default function WatchlistButton({ movieId, movieTitle, moviePosterPath }) {
  const { isInWatchlist, toggle } = useWatchlist();

  const movieObj = {
    id: movieId,
    title: movieTitle,
    poster_path: moviePosterPath || null,
  };

  const inList = isInWatchlist(movieId);

  return (
    <button
      onClick={() => toggle(movieObj)}
      aria-pressed={inList}
      title={inList ? "Remove from watchlist" : "Add to watchlist"}
      style={{
        border: "none",
        background: inList ? "#10b981" : "#fff",
        color: inList ? "#fff" : "#111827",
        borderRadius: "999px",
        padding: "0.8rem 1rem",
        cursor: "pointer",
        fontWeight: 700,
        minWidth: "3rem",
      }}
    >
      {inList ? "✓ Saved" : "+ Watchlist"}
    </button>
  );
}