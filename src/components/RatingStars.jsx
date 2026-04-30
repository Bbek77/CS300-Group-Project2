import { useAppContext } from "../context/AppContext";

export default function RatingStars({ movieId }) {
  const { ratings, rateMovie } = useAppContext();
  const current = ratings[movieId] || 0;

  return (
    <div>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onClick={() => rateMovie(movieId, n)}
          style={{
            cursor: "pointer",
            color: n <= current ? "gold" : "gray",
            fontSize: "18px",
            marginRight: "4px"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}