import { useState } from "react";
import { searchMovies } from "../services/api";
import MovieGrid from "./MovieGrid";

export default function SearchBar({ onResults, selectedGenre = "" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery && !selectedGenre) {
      setResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchMovies(trimmedQuery, selectedGenre);
      const movies = data?.results ?? [];
      const filtered = trimmedQuery && selectedGenre
        ? movies.filter((movie) => Array.isArray(movie.genre_ids) && movie.genre_ids.includes(Number(selectedGenre)))
        : movies;

      setResults(filtered);
      if (typeof onResults === "function") {
        onResults(filtered);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search movies");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section style={{ marginTop: "1rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
        role="search"
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for movies, titles, or actors"
          aria-label="Search for movies"
          style={{
            flex: "1 1 260px",
            padding: "0.85rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            border: "none",
            borderRadius: "999px",
            padding: "0.85rem 1.2rem",
            background: "#fff",
            color: "#111827",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error ? (
        <p role="alert" style={{ color: "#fca5a5", marginTop: "0.75rem" }}>
          {error}
        </p>
      ) : null}

      <div style={{ marginTop: "1rem" }}>
        {results.length > 0 ? <MovieGrid movies={results} /> : null}
      </div>
    </section>
  );
}