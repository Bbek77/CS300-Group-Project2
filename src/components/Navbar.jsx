import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* LOGO */}
      <h1 className="logo">
        <span className="jp">エベレスト</span>{" "}
        <span className="movie">MOVIE</span>
      </h1>

      {/* LINKS */}
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/search">Search</a>
        <a href="/watchlist">Watchlist</a>
      </div>

      {/* USER ICON */}
      <span
        className="user-icon"
        onClick={() => navigate("/login")}
      >
        👤
      </span>
    </nav>
  );
}