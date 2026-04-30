import { useState, useEffect } from "react";

export default function useFetch(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "327acdc6";

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.Search) {
          const formatted = json.Search.map((m) => ({
            id: m.imdbID,
            title: m.Title,
            image:
              m.Poster !== "N/A"
                ? m.Poster
                : "https://via.placeholder.com/300x180"
          }));

          setData(formatted);
        } else {
          setData([]);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return { data, loading };
}