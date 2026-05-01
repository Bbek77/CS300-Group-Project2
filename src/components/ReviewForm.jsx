import { useEffect, useState } from "react";

export default function ReviewForm({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ author: "", comment: "" });

  const storageKey = movieId ? `reviews_${movieId}` : null;

  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setReviews(Array.isArray(saved) ? saved : []);
    } catch {
      setReviews([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }, [reviews, storageKey]);

  const submitReview = (e) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.comment.trim()) return;
    const next = {
      id: Date.now(),
      author: formData.author,
      comment: formData.comment,
      date: new Date().toLocaleDateString(),
      rating,
    };
    setReviews([next, ...reviews]);
    setFormData({ author: "", comment: "" });
    setRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Your Review</h2>
      <form onSubmit={submitReview} style={{ display: "grid", gap: "0.8rem", marginTop: "1rem" }}>
        <div>
          <div style={{ marginBottom: "0.4rem", fontWeight: 700 }}>Your Rating</div>
          <div style={{ display: "flex", gap: "0.25rem", fontSize: "1.35rem", cursor: "pointer" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                role="button"
                tabIndex={0}
                style={{ color: star <= displayRating ? "#fbbf24" : "rgba(255,255,255,0.3)" }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Your name"
          value={formData.author}
          onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
          style={{ padding: "0.85rem 1rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white" }}
        />

        <textarea
          placeholder="Write your review..."
          rows={4}
          value={formData.comment}
          onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
          style={{ padding: "0.85rem 1rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white" }}
        />

        <button type="submit" style={{ border: "none", borderRadius: "999px", padding: "0.85rem 1.2rem", background: "#fff", color: "#111827", fontWeight: 700, cursor: "pointer", width: "fit-content" }}>
          Post Review
        </button>
      </form>

      <div style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
        {reviews.length === 0 ? (
          <p style={{ opacity: 0.8 }}>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <article key={review.id} style={{ padding: "1rem", borderRadius: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <strong>{review.author}</strong>
                <span style={{ opacity: 0.8 }}>{review.date}</span>
              </div>
              {review.rating > 0 ? <div style={{ color: "#fbbf24", marginTop: "0.35rem" }}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div> : null}
              <p style={{ marginTop: "0.5rem" }}>{review.comment}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}