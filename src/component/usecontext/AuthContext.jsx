// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const login = ({ username, password }) => {
    const users = getUsers();
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const register = ({ username, password }) => {
    const users = getUsers();
    if (users.find((user) => user.username === username)) {
      return false; // Username already exists
    }
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // Save users to localStorage
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
