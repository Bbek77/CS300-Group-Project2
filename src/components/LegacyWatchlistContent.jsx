import { Link } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";

export default function LegacyWatchlistContent() {
  const { watchlist, remove } = useWatchlist();

  return (
    <main style={{ padding: "2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Watchlist</h1>
        <p>Your saved movies.</p>

        {watchlist.length === 0 ? (
          <p style={{ opacity: 0.8, marginTop: "1rem" }}>No movies in your watchlist yet.</p>
        ) : (
          <section style={{ marginTop: "1.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                gap: "1rem",
              }}
            >
              {watchlist.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Poster"}
                      alt={movie.title}
                      style={{ width: "100%", display: "block" }}
                    />
                    <div style={{ padding: "0.9rem" }}>
                      <h3 style={{ margin: 0 }}>{movie.title}</h3>
                    </div>
                  </Link>

                  <div style={{ padding: "0 0.9rem 0.9rem" }}>
                    <button
                      onClick={() => remove(movie.id)}
                      style={{
                        width: "100%",
                        border: "none",
                        borderRadius: "999px",
                        padding: "0.75rem 1rem",
                        cursor: "pointer",
                        background: "#ef4444",
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}