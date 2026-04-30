import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const API_KEY = "327acdc6";

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <main style={{ padding: "20px", color: "white" }}>
      <h1>{movie.Title}</h1>

      <img src={movie.Poster} alt={movie.Title} />

      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rating:</strong> ⭐ {movie.imdbRating}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </main>
  );
}