import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();  // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  // Fetch movie details based on the ID from the URL
  useEffect(() => {
    fetch(`https://backend-crud-one.vercel.app/product/${id}`)
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(error => console.error('Error fetching movie data:', error));
  }, [id]);

  // If movie is not yet loaded, display a loading message
  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-card">
        <img src={movie.image} alt={movie.name} className="movie-image" />
        <h2 className="movie-name">{movie.name}</h2>
        <p><strong>Release Date:</strong> {movie.releasedate}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Budget:</strong> ₹{movie.budget}</p>
        <p><strong>Ticket Price:</strong> ₹{movie.ticketprice}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
