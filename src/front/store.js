import React, { useState, useEffect, createContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';


export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const API_URL = "https://cautious-doodle-5grr5q9q667q3pg9x-3001.app.github.dev";


  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setIsLoggedIn(true);
    }
  }, []);


  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };


  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

 
  const authContextValue = {
    isLoggedIn,
    login,
    logout,
    API_URL
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;