import React, { createContext, useContext, useState } from 'react';

// Create the authentication context that will be shared across the component tree
const AuthContext = createContext();

// AuthProvider wraps the app and makes authentication state available to all child components
export const AuthProvider = ({ children }) => {

  // Initialise token from localStorage so the user stays logged in after a page refresh
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Initialise user from localStorage with a try/catch to handle corrupted or missing JSON
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  // Persist the token and user to localStorage and update state when a user logs in
  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  // Clear the token and user from localStorage and reset state when a user logs out
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Expose token, user, login, and logout to all consuming components via context
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for convenient access to the auth context in any component
export const useAuth = () => useContext(AuthContext);