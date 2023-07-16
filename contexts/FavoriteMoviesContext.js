// FavoriteMoviesContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoriteMoviesContext = createContext();

export const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Load favorite movies from AsyncStorage on component mount
    loadFavoriteMovies();
  }, []);

  useEffect(() => {
    // Save favorite movies to AsyncStorage whenever it changes
    saveFavoriteMovies();
  }, [favoriteMovies]);

  const loadFavoriteMovies = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteMovies');
      if (favorites) {
        setFavoriteMovies(JSON.parse(favorites));
      }
    } catch (error) {
      console.log('Error loading favorite movies:', error);
    }
  };

  const saveFavoriteMovies = async () => {
    try {
      // Save the favoriteMovies array to the device's storage
      await AsyncStorage.setItem(
        'favoriteMovies',
        JSON.stringify(favoriteMovies)
      );
    } catch (error) {
      console.log('Error saving favorite movies:', error);
    }
  };
  
  const addMovieToFavorites = (movie) => {
    // Check if the movie already exists in favoriteMovies
    const isMovieAlreadyFavorite = favoriteMovies.some(
      (favorite) => favorite.id === movie.id
    );
  
    // If the movie is already a favorite, display an alert message
    if (isMovieAlreadyFavorite) {
      alert("This movie is already in your favorites.");
    } else {
      // Add the movie to favoriteMovies if it doesn't already exist
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
    }
  };
  const removeMovieFromFavorites = (movieId) => {
    // Remove a movie from the favoriteMovies array based on its ID
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };
  
  const isMovieFavorite = (movieId) => {
    // Check if a movie with a given ID exists in the favoriteMovies array
    return favoriteMovies.some((movie) => movie.id === movieId);
  };
  
  const value = {
    favoriteMovies,
    addMovieToFavorites,
    removeMovieFromFavorites,
    isMovieFavorite,
  };
  
  return (
    <FavoriteMoviesContext.Provider value={value}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
  }  