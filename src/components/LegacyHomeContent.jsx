import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieGrid from './MovieGrid';
import { getPopularMovies, getGenres } from '../services/api';


function LegacyHomeContent() {
 const [movies, setMovies] = useState([]);
 const [genres, setGenres] = useState([]);
 const [featuredIndex, setFeaturedIndex] = useState(0);
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

 useEffect(() => {
   if (movies.length <= 1) return undefined;

   const timer = setInterval(() => {
     setFeaturedIndex((current) => (current + 1) % movies.length);
   }, 6000);

   return () => clearInterval(timer);
 }, [movies.length]);

 const featuredMovie = useMemo(() => movies[featuredIndex] || movies[0] || null, [movies, featuredIndex]);


 const moviesByGenre = {};
 genres.forEach((genre) => {
   moviesByGenre[genre.id] = {
     name: genre.name,
     movies: movies.filter((movie) => movie.genre_ids?.includes(genre.id))
   };
 });


 return (
   <main className="home-page">
     {featuredMovie && (
       <section
         style={{
           margin: '0 0 1.5rem',
           padding: '0 20px',
         }}
       >
         <div
           style={{
             position: 'relative',
             minHeight: '420px',
             borderRadius: '24px',
             overflow: 'hidden',
             backgroundImage: `linear-gradient(90deg, rgba(8,11,20,0.95) 0%, rgba(8,11,20,0.72) 35%, rgba(8,11,20,0.2) 100%), url(${featuredMovie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}` : featuredMovie.poster_path ? `https://image.tmdb.org/t/p/w1280${featuredMovie.poster_path}` : 'https://via.placeholder.com/1280x720?text=No+Backdrop'})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
           }}
         >
           <div
             style={{
               position: 'absolute',
               inset: 0,
               display: 'flex',
               alignItems: 'center',
               padding: '2rem',
             }}
           >
             <div style={{ maxWidth: '580px' }}>
               <div
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: '0.5rem',
                   padding: '0.45rem 0.8rem',
                   borderRadius: '999px',
                   background: 'rgba(255,255,255,0.12)',
                   backdropFilter: 'blur(10px)',
                   marginBottom: '1rem',
                   fontSize: '0.85rem',
                   letterSpacing: '0.05em',
                   textTransform: 'uppercase',
                 }}
               >
                 Featured Now
               </div>

               <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', margin: '0 0 0.75rem', lineHeight: 1.02 }}>
                 {featuredMovie.title}
               </h1>

               <p style={{ fontSize: '1rem', lineHeight: 1.7, maxWidth: '56ch', color: 'rgba(255,255,255,0.88)' }}>
                 {featuredMovie.overview || 'Discover trending movies and shows with a premium, fast-changing banner experience.'}
               </p>

               <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                 <Link
                   to={`/movie/${featuredMovie.id}`}
                   style={{
                     padding: '0.9rem 1.25rem',
                     borderRadius: '999px',
                     background: '#fff',
                     color: '#111827',
                     textDecoration: 'none',
                     fontWeight: 800,
                   }}
                 >
                   Watch Now
                 </Link>

                 <button
                   type="button"
                   onClick={() => setFeaturedIndex((current) => (current + 1) % movies.length)}
                   style={{
                     padding: '0.9rem 1.25rem',
                     borderRadius: '999px',
                     background: 'rgba(255,255,255,0.12)',
                     color: '#fff',
                     border: '1px solid rgba(255,255,255,0.16)',
                     cursor: 'pointer',
                     fontWeight: 700,
                   }}
                 >
                   Next Feature
                 </button>
               </div>
             </div>
           </div>
         </div>
       </section>
     )}

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