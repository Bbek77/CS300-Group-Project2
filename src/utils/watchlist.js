// src/utils/watchlist.js

export function getWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
}

export function addToWatchlist(movie) {
  const list = getWatchlist();

  // prevent duplicates
  if (list.find((m) => m.id === movie.id)) return;

  const updated = [...list, movie];
  localStorage.setItem("watchlist", JSON.stringify(updated));
}

export function removeFromWatchlist(id) {
  const list = getWatchlist().filter((m) => m.id !== id);
  localStorage.setItem("watchlist", JSON.stringify(list));
}

export function isInWatchlist(id) {
  const list = getWatchlist();
  return list.some((m) => m.id === id);
}