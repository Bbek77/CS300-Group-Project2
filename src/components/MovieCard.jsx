import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : movie.image || "https://via.placeholder.com/300x450?text=No+Poster";

  const rating = typeof movie.vote_average === "number"
    ? movie.vote_average.toFixed(1)
    : null;

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#111827",
          boxShadow: "0 12px 30px rgba(0,0,0,0.24)",
          minHeight: "100%",
        }}
      >
        <img
          src={posterUrl}
          alt={movie.title}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.9) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1rem",
          }}
        >
          <strong style={{ fontSize: "1rem", lineHeight: 1.3 }}>
            {movie.title}
          </strong>
          {rating && (
            <span style={{ marginTop: "0.35rem", color: "#fbbf24" }}>
              ⭐ {rating}/10
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}