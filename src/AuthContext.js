import React, { createContext, useState } from "react";

// Create the Auth Context
export const AuthContext = createContext();

// Create the Auth Provider
export const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const login = () => {
    // Perform login logic here, e.g., API request
    // Once the login is successful, update the userLoggedIn state
    setUserLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic here, e.g., clear session, remove tokens
    // Update the userLoggedIn state accordingly
    setUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
