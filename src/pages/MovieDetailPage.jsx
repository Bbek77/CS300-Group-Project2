import React from 'react';
import './MovieDetailPage.css';




function MovieDetailPage({ movieId = 'unknown' }) {
 const movie = {
  title: 'Sample Movie',
  description: 'An example movie detail view with cast, rating, and overview.',
  rating: '8.4/10',
  cast: ['Actor One', 'Actor Two', 'Actor Three']
};




return (
  <main style={{ padding: '2rem' }}>
    <h1>{movie.title}</h1>
    <p>
      <strong>Movie ID:</strong> {movieId}
    </p>




    <section aria-labelledby="movie-description" style={{ marginTop: '1rem' }}>
      <h2 id="movie-description">Description</h2>
      <p>{movie.description}</p>
    </section>




    <section aria-labelledby="movie-rating" style={{ marginTop: '1rem' }}>
      <h2 id="movie-rating">Ratings</h2>
      <p>{movie.rating}</p>
    </section>




    <section aria-labelledby="movie-cast" style={{ marginTop: '1rem' }}>
      <h2 id="movie-cast">Cast</h2>
      <ul>
        {movie.cast.map((castMember) => (
          <li key={castMember}>{castMember}</li>
        ))}
      </ul>
    </section>
  </main>
);
}




export default MovieDetailPage;

