import MovieCard from "./MovieCard";

export default function MovieGrid({ movies = [], title }) {
  if (!movies.length) {
    return (
      <p style={{ opacity: 0.8, padding: "0.5rem 0" }}>No movies found.</p>
    );
  }

  return (
    <section style={{ marginTop: "1.25rem" }}>
      {title && (
        <h2 style={{ margin: "0 0 0.9rem", fontSize: "1.25rem" }}>{title}</h2>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "1rem",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}