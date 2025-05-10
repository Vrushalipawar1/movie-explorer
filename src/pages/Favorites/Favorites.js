import { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MovieCard from '../../components/MovieCard/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
    
    // storage changes
    const handleStorageChange = () => {
      const updatedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(updatedFavs);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1">You haven't added any favorites yet.</Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;