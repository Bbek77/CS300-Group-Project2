import { useRef } from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies = [] }) {
  const rowRef = useRef();

  const scroll = (dir) => {
    if (!rowRef.current) return;
    rowRef.current.scrollLeft += dir === "left" ? -300 : 300;
  };

  return (
    <div className="movie-row-wrapper">
      <button className="row-arrow left" onClick={() => scroll("left")}>
        ❮
      </button>

      <div className="movies-row" ref={rowRef}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <button className="row-arrow right" onClick={() => scroll("right")}>
        ❯
      </button>
    </div>
  );
}