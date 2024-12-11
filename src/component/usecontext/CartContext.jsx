import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (movie) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === movie._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === movie._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...movie, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);