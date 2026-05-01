import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WatchlistButton from "./WatchlistButton";
import ReviewForm from "./ReviewForm";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
  getMovieVideos,
} from "../services/api";

export default function LegacyMovieDetailContent() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchData = async () => {
      try {
        setLoading(true);
        const [movieData, creditsData, videosData, recData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
          getMovieRecommendations(id),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
        setRecommendations(recData.results || []);

        const trailer = videosData.results?.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        setError("Failed to load movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <main style={{ padding: "2rem" }}><p>Loading...</p></main>;
  }

  if (error || !movie) {
    return <main style={{ padding: "2rem" }}><p>{error || "Movie not found"}</p></main>;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "https://via.placeholder.com/1280x720?text=No+Backdrop";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "https://via.placeholder.com/342x513?text=No+Poster";

  const cast = credits?.cast?.slice(0, 6) || [];
  const trailerUrl = trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : null;
  const recommended = recommendations.slice(0, 6) || [];

  return (
    <main>
      <section
        style={{
          minHeight: "320px",
          backgroundImage: `linear-gradient(180deg, rgba(8,11,20,0.2), rgba(8,11,20,0.96)), url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "2rem",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "minmax(240px, 300px) 1fr", gap: "1.5rem", alignItems: "end" }}>
          <img src={posterUrl} alt={movie.title} style={{ width: "100%", borderRadius: "18px", boxShadow: "0 16px 40px rgba(0,0,0,0.35)" }} />
          <div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", margin: 0 }}>{movie.title}</h1>
            {movie.release_date ? <p style={{ opacity: 0.8 }}>{new Date(movie.release_date).getFullYear()}</p> : null}
            {movie.runtime ? <p>{movie.runtime} minutes</p> : null}
            <p style={{ maxWidth: "65ch", lineHeight: 1.7 }}>{movie.overview}</p>
            {movie.vote_average ? <p style={{ color: "#fbbf24", fontWeight: 700 }}>Rating: {movie.vote_average.toFixed(1)}/10</p> : null}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <WatchlistButton movieId={movie.id} movieTitle={movie.title} moviePosterPath={movie.poster_path} />
              {trailerUrl ? (
                <a href={trailerUrl} target="_blank" rel="noreferrer" style={{ padding: "0.8rem 1rem", borderRadius: "999px", background: "#fff", color: "#111827", textDecoration: "none", fontWeight: 700 }}>
                  Watch Trailer
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
        <ReviewForm movieId={movie.id} movieTitle={movie.title} />

        {cast.length > 0 && (
          <section style={{ marginTop: "2rem" }}>
            <h2>Cast</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem" }}>
              {cast.map((member) => (
                <div key={member.id} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "16px", overflow: "hidden" }}>
                  {member.profile_path ? (
                    <img src={`https://image.tmdb.org/t/p/w185${member.profile_path}`} alt={member.name} style={{ width: "100%", display: "block" }} />
                  ) : (
                    <div style={{ aspectRatio: "2 / 3", display: "grid", placeItems: "center", background: "rgba(255,255,255,0.05)" }}>No Image</div>
                  )}
                  <div style={{ padding: "0.8rem" }}>
                    <strong style={{ display: "block" }}>{member.name}</strong>
                    <span style={{ opacity: 0.75, fontSize: "0.9rem" }}>{member.character || "Character"}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {recommended.length > 0 && (
          <section style={{ marginTop: "2rem" }}>
            <h2>Recommendations</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "1rem" }}>
              {recommended.map((rec) => (
                <Link key={rec.id} to={`/movie/${rec.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "16px", overflow: "hidden" }}>
                    <img src={rec.poster_path ? `https://image.tmdb.org/t/p/w185${rec.poster_path}` : "https://via.placeholder.com/185x278?text=No+Image"} alt={rec.title} style={{ width: "100%", display: "block" }} />
                    <div style={{ padding: "0.8rem" }}>
                      <strong>{rec.title}</strong>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}