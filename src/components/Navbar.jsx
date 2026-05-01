import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem 1.25rem",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(10, 14, 24, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
        <strong style={{ fontSize: "1.2rem", letterSpacing: "0.04em" }}>
          Cinema Atlas
        </strong>
      </Link>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link to="/" style={{ color: "#e5e7eb", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/search" style={{ color: "#e5e7eb", textDecoration: "none" }}>
          Search
        </Link>
        <Link to="/watchlist" style={{ color: "#e5e7eb", textDecoration: "none" }}>
          Watchlist
        </Link>
      </div>

      <button
        onClick={() => navigate("/login")}
        style={{
          border: "none",
          background: "#fff",
          color: "#111827",
          borderRadius: "999px",
          padding: "0.7rem 1rem",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        👤 Login
      </button>
    </nav>
  );
}