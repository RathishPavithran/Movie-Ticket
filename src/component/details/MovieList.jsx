// MovieList.jsx
import React from 'react';
import MovieCard from '../card/Card';

function MovieList({ movies, handleAddToCart }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          handleAddToCart={handleAddToCart} // Pass down the function
        />
      ))}
    </div>
  );
}

export default MovieList;
