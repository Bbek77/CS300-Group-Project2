import { useState } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

export default function LegacySearchContent() {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <main style={{ padding: "2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Search</h1>
        <p>Find movies and shows using keywords and filters.</p>

        <section style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
          <FilterBar selected={selectedGenre} onChange={setSelectedGenre} />
          <SearchBar selectedGenre={selectedGenre} />
        </section>
      </div>
    </main>
  );
}