export default function RatingStars({ movieVoteAverage }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <strong>TMDB Rating</strong>
      <span style={{ color: "#fbbf24" }}>
        {typeof movieVoteAverage === "number"
          ? `${movieVoteAverage.toFixed(1)}/10`
          : "N/A"}
      </span>
    </div>
  );
}