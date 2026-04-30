import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";

const API_KEY = "327acdc6";

const categories = ["action", "comedy", "sci-fi", "drama", "animation"];

export default function HomePage() {
  const [rows, setRows] = useState({});
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let firstSet = false;
      const temp = {};

      for (const cat of categories) {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?s=${cat}&apikey=${API_KEY}`
          );
          const data = await res.json();

          const movies =
            data.Search?.map((m) => ({
              id: m.imdbID,
              title: m.Title,
              image:
                m.Poster !== "N/A"
                  ? m.Poster
                  : "https://via.placeholder.com/300x450",
            })) || [];

          temp[cat] = movies;

          if (!firstSet && movies.length > 0) {
            setFeatured(movies[0]);
            firstSet = true;
          }
        } catch {
          temp[cat] = [];
        }
      }

      setRows(temp);
    };

    fetchData();
  }, []);

  return (
    <main>
      {featured && (
        <div
          className="hero"
          style={{ backgroundImage: `url(${featured.image})` }}
        >
          <div className="hero-overlay">
            <h1>{featured.title}</h1>
            <button>Watch Now</button>
          </div>
        </div>
      )}

      {Object.entries(rows).map(([genre, movies]) => (
        <section key={genre}>
          <h2>{genre.toUpperCase()}</h2>
          <MovieGrid movies={movies} />
        </section>
      ))}
    </main>
  );
}