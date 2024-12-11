import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../usecontext/AuthContext';  // Assuming the AuthContext is being used
import './Register.css';

function Register() {
  const { register } = useAuth();  // Assuming you have a register function in AuthContext
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '', // New field for password confirmation
  });
  const [error, setError] = useState('');
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Register user (you need to add this functionality to your AuthContext)
    const success = register(formData);
    if (success) {
      navigate('/');  // Redirect to the login page after successful registration
    } else {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>REGISTER</h2>
        {error && <p className="error">{error}</p>}
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
