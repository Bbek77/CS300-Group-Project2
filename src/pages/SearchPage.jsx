import { useState } from "react";
import MovieGrid from "../components/MovieGrid";

const API_KEY = "327acdc6";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

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
  };

  return (
    <div>
      <h1>Search</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <MovieGrid movies={movies} />
    </div>
  );
}