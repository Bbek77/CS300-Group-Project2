import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "watchlist";

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => readStorage());

  useEffect(() => {
    const onUpdate = () => setWatchlist(readStorage());
    window.addEventListener("watchlist-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("watchlist-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const save = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setWatchlist(next);
    window.dispatchEvent(new Event("watchlist-updated"));
  }, []);

  const add = useCallback((movie) => {
    const current = readStorage();
    if (current.some((m) => m.id === movie.id)) return;
    save([...current, movie]);
  }, [save]);

  const remove = useCallback((movieId) => {
    const current = readStorage();
    save(current.filter((m) => m.id !== movieId));
  }, [save]);

  const toggle = useCallback((movie) => {
    const current = readStorage();
    if (current.some((m) => m.id === movie.id)) {
      save(current.filter((m) => m.id !== movie.id));
      return;
    }
    save([...current, movie]);
  }, [save]);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  return { watchlist, add, remove, toggle, isInWatchlist, reload: () => setWatchlist(readStorage()) };
}