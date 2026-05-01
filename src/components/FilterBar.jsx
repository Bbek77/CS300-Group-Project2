import { useEffect, useState } from "react";
import { getGenres } from "../services/api";

export default function FilterBar({ selected = "", onChange }) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const data = await getGenres();
        if (mounted) setGenres(data?.genres || []);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
      <label htmlFor="genre-select" style={{ fontWeight: 700 }}>Filter:</label>
      <select
        id="genre-select"
        value={selected}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={loading}
        style={{
          padding: "0.8rem 1rem",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          color: "white",
        }}
      >
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
}