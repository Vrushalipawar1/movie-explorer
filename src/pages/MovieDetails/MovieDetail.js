import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, CircularProgress, Chip, Button, Paper, Divider} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { getMovieDetails, getMovieTrailer } from '../../services/tmdb';
import { useAppContext } from '../../context/AppContext';
import MovieCard from '../../components/MovieCard/MovieCard';


const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useAppContext();
  const isFavorite = favorites.some(fav => fav.id === Number(movieId));

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        const movieDetails = await getMovieDetails(movieId);
        const movieTrailer = await getMovieTrailer(movieId);
        setMovie(movieDetails);
        setTrailer(movieTrailer);
        setLoading(false);
      } catch (error) {
        console.error('Error loading movie details:', error);
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Movie not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <MovieCard movie={movie} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {movie.title}
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="subtitle1" color="text.secondary" mr={2}>
              {new Date(movie.release_date).getFullYear()}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mr={2}>
              ⭐ {movie.vote_average.toFixed(1)}/10
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {movie.runtime} min
            </Typography>
          </Box>
          
          <Box mb={2}>
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          
          <Button
            variant="contained"
            startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
            onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
            sx={{ mb: 3 }}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
          
          <Typography variant="h5" gutterBottom>
            Overview
          </Typography>
          <Typography paragraph>
            {movie.overview}
          </Typography>
          
          {trailer && (
            <>
              <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                Trailer
              </Typography>
              <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  title={`${movie.title} Trailer`}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </>
          )}
          
          {movie.credits?.cast?.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                Cast
              </Typography>
              <Grid container spacing={2}>
                {movie.credits.cast.slice(0, 6).map((person) => (
                  <Grid item xs={6} sm={4} md={3} key={person.id}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                          alt={person.name}
                          style={{ width: '100%', borderRadius: '4px' }}
                        />
                      ) : (
                        <Box sx={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography>No Image</Typography>
                        </Box>
                      )}
                      <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        {person.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {person.character}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetail;