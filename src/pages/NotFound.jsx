import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>404</h1>
      <p style={{ fontSize: "1.1rem", opacity: 0.85 }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.85rem 1.4rem",
          borderRadius: "999px",
          background: "#fff",
          color: "#111827",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        Go home
      </Link>
    </main>
  );
}