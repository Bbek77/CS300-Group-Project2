import { useState } from "react";
import { addToWatchlist, isInWatchlist } from "../utils/watchlist";

export default function MovieCard({ movie }) {
  const [saved, setSaved] = useState(isInWatchlist(movie.id));

  const handleAdd = (e) => {
    e.stopPropagation(); // prevent card click
    addToWatchlist(movie);
    setSaved(true);
  };

  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} />

      {/* WATCHLIST BUTTON (shows on hover) */}
      <button
        className={`watchlist-btn ${saved ? "saved" : ""}`}
        onClick={handleAdd}
      >
        {saved ? "✔" : "+"}
      </button>
    </div>
  );
}