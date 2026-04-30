import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { getWatchlist } from "../utils/watchlist";

export default function WatchlistPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  return (
    <div>
      <h1>Watchlist</h1>

      {movies.length === 0 ? (
        <p>No movies added yet</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
}