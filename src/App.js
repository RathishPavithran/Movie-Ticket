import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './component/usecontext/CartContext';
import { AuthProvider, useAuth } from './component/usecontext/AuthContext';
import MovieList from './component/details/MovieList';
import MovieDetails from './component/details/MovieDetails';
import Cart from './component/cart/Cart';
import Login from './component/login/Login';
import Register from './component/login/Register';
import Navbar from './component/navbar/Navbar';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

function App() {
  const [movies, setMovies] = useState([]);

  // Fetch movies
  useEffect(() => {
    fetch('https://backend-crud-one.vercel.app/product')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent movies={movies} />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

const AppContent = ({ movies }) => {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Only render Navbar if not on the register page */}
      {location.pathname !== '/register' && location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<ProtectedRoute element={() => <MovieList movies={movies} />} />} />
        <Route path="/movie/:id" element={<ProtectedRoute element={MovieDetails} />} />
        <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
      </Routes>
    </div>
  );
};

export default App;
