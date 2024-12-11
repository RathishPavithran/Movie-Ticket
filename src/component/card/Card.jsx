import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../usecontext/CartContext';
import Button from '../button/Button';
import './Card.css';

function MovieCard({ movie }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(movie);
    alert(`Success: Added "${movie.name}" to the cart!`);
  };

  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.name} className="movie-image" />
      <h2>{movie.name}</h2>
      <p><strong>Ticket Price:</strong> ₹{movie.ticketprice}</p>
      <div className="button-group">
        <Button
          text="Add to Cart"
          className="add-button"
          onClick={handleAddToCart}
        />
        <Link to={`/movie/${movie._id}`}>
          <Button text="View Details" className="view-button" />
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;