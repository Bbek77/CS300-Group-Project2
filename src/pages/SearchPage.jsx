import { useState } from "react";
import MovieGrid from "../components/MovieGrid";

const API_KEY = "327acdc6";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await res.json();

      const results =
        data.Search?.map((m) => ({
          id: m.imdbID,
          title: m.Title,
          image:
            m.Poster !== "N/A"
              ? m.Poster
              : "https://via.placeholder.com/300x450",
        })) || [];

      setMovies(results);
    } catch {
      setMovies([]);
    }

    setLoading(false);
  };

  return (
    <div className="search-page">
      {/* BIG SEARCH BAR */}
      <div className="search-box">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, series..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button onClick={handleSearch}>🔍</button>
      </div>

      {/* STATUS */}
      {loading && <p className="search-status">Searching...</p>}
      {!loading && movies.length === 0 && query && (
        <p className="search-status">No results found</p>
      )}

      {/* RESULTS */}
      <MovieGrid movies={movies} />
    </div>
  );
}