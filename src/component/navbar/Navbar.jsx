import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../usecontext/CartContext';

function Navbar() {
  const { cartItems } = useCart();
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/movies" className="navbar-brand">Movie Booking</Link>
      </div>
      <div className="navbar-right">
        <Link to="/movies" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link">
          🛒Cart
          {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;