const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "d66fba81057e436998592368121b1655";
const BASE_URL = "https://api.themoviedb.org/3";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}${path.includes("?") ? "&" : "?"}api_key=${API_KEY}`);
  return res.json();
}

export async function getPopularMovies() {
  try {
    const pages = [1, 2, 3];
    const allResults = [];

    for (const page of pages) {
      const data = await request(`/movie/popular?page=${page}`);
      allResults.push(...(data.results || []));
    }

    return { results: allResults };
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return { results: [] };
  }
}

export async function searchMovies(query, genreId = "") {
  if (!query && genreId) {
    return request(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`);
  }

  if (query && genreId) {
    return request(`/search/movie?query=${encodeURIComponent(query)}`);
  }

  return request(`/search/movie?query=${encodeURIComponent(query)}`);
}

export async function getMovieDetails(id) {
  return request(`/movie/${id}`);
}

export async function getGenres() {
  return request(`/genre/movie/list`);
}

export async function getMovieCredits(id) {
  return request(`/movie/${id}/credits`);
}

export async function getMovieVideos(id) {
  return request(`/movie/${id}/videos`);
}

export async function getMovieRecommendations(id) {
  try {
    return await request(`/movie/${id}/recommendations`);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return { results: [] };
  }
}