import React from 'react';
import '../Rec_movies/Rec_movies.css';

const RecommendedMovies = ({ movies }) => {
  return (
    <section className="recommended-movies">
      <h2>Recommended for You</h2>
      <div className="movieR-grid">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movieR-card">
              <img src={movie.poster} alt={movie.title} className="movieR-poster" />
              <h3 className="movieR-title">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-movies">No recommendations available.</p>
        )}
      </div>
    </section>
  );
};

export default RecommendedMovies;
