import React, { useEffect, useState } from 'react';
import MovieGrid from './MovieGrid';
import { getPopularMovies, getGenres } from '../services/api';


function LegacyHomeContent() {
 const [movies, setMovies] = useState([]);
 const [genres, setGenres] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);


 useEffect(() => {
   const fetchData = async () => {
     try {
       setLoading(true);
       const moviesData = await getPopularMovies();
       const genresData = await getGenres();
       setMovies(moviesData.results || []);
       setGenres(genresData.genres || []);
     } catch (err) {
       setError('Failed to load data');
       console.error(err);
     } finally {
       setLoading(false);
     }
   };


   fetchData();
 }, []);


 const moviesByGenre = {};
 genres.forEach((genre) => {
   moviesByGenre[genre.id] = {
     name: genre.name,
     movies: movies.filter((movie) => movie.genre_ids?.includes(genre.id))
   };
 });


 return (
   <main className="home-page">
     <section className="popular-header">
       <h1>Popular Movies</h1>
       <p>Discover the trending movies everyone is watching</p>
     </section>


     {loading && <p>Loading movies...</p>}
     {error && <p style={{ color: 'red' }}>{error}</p>}


     {!loading && (
       <div className="genre-sections">
         {Object.entries(moviesByGenre).map(([genreId, genreData]) => (
           genreData.movies.length > 0 && (
             <MovieGrid
               key={genreId}
               movies={genreData.movies}
               title={genreData.name}
             />
           )
         ))}
       </div>
     )}
   </main>
 );
}


export default LegacyHomeContent;