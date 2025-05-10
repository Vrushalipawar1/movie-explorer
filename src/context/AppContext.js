import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [lastSearched, setLastSearched] = useState('');

  // Load saved data from local storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedDarkMode = await localforage.getItem('darkMode');
        if (savedDarkMode !== null) setDarkMode(savedDarkMode);
        
        const savedUser = await localforage.getItem('user');
        if (savedUser) setUser(savedUser);
        
        const savedFavorites = await localforage.getItem('favorites');
        if (savedFavorites) setFavorites(savedFavorites);
        
        const savedLastSearched = await localforage.getItem('lastSearched');
        if (savedLastSearched) setLastSearched(savedLastSearched);
      } catch (error) {
        console.error('Error loading data from local storage:', error);
      }
    };
    
    loadData();
  }, []);

  // Save data to local storage when it changes
  useEffect(() => {
    localforage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (user) localforage.setItem('user', user);
  }, [user]);

  useEffect(() => {
    localforage.setItem('favorites', favorites);
  }, [favorites]);

  useEffect(() => {
    if (lastSearched) localforage.setItem('lastSearched', lastSearched);
  }, [lastSearched]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const login = (username, password) => { //validate credentials with a backend
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  const addFavorite = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movieId) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        user,
        login,
        logout,
        favorites,
        addFavorite,
        removeFavorite,
        lastSearched,
        setLastSearched,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);