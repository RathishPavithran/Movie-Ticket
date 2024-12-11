import React from 'react';
import { useCart } from '../usecontext/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="movie-grid">
      {cartItems.map((item) => (
        <div key={item._id} className="movie-card">
          <img src={item.image} alt={item.name} className="movie-image" />
          <h2>{item.name}</h2>
          <p><strong>Ticket Price:</strong> ₹{item.ticketprice}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <div className="button-group">
            <button onClick={() => updateQuantity(item._id, 1)} className="update-button">+</button>
            <button onClick={() => updateQuantity(item._id, -1)} className="update-button">-</button>
            <button onClick={() => removeFromCart(item._id)} className="remove-button">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;