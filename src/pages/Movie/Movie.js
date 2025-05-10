import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Chip, 
  Button, 
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import YouTube from 'react-youtube';
import { getMovieDetails } from '../../services/tmdb';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      const details = await getMovieDetails(id);
      setMovie(details);
      
      // Check if movie is in favorites
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsFavorite(favorites.some(fav => fav.id === details.id));
      setLoading(false);
    };
    loadMovieDetails();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const { id, title, poster_path, vote_average } = movie;
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, { id, title, poster_path, vote_average }])
      );
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return <Typography>Movie not found</Typography>;
  }

  const trailer = movie.videos?.results?.find(vid => vid.site === 'YouTube' && vid.type === 'Trailer');
  const topCast = movie.credits?.cast?.slice(0, 10) || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={`${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip
              icon={<StarIcon />}
              label={movie.vote_average.toFixed(1)}
              color="primary"
              sx={{ mr: 2 }}
            />
            <Typography variant="subtitle1">
              {new Date(movie.release_date).toLocaleDateString()} | {movie.runtime} mins
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            {movie.genres.map(genre => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <Button
            variant={isFavorite ? 'contained' : 'outlined'}
            startIcon={<FavoriteIcon />}
            onClick={toggleFavorite}
            sx={{ mb: 3 }}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
          <Typography variant="h5" gutterBottom>
            Overview
          </Typography>
          <Typography paragraph>{movie.overview}</Typography>
          
          {trailer && (
            <>
              <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                Trailer
              </Typography>
              <YouTube videoId={trailer.key} opts={{ width: '100%' }} />
            </>
          )}
          
          {topCast.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                Top Cast
              </Typography>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {topCast.map((person) => (
                  <div key={person.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar 
                          alt={person.name} 
                          src={person.profile_path ? 
                            `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w200${person.profile_path}` : 
                            '/default-avatar.jpg'
                          } 
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={person.name}
                        secondary={`as ${person.character}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetails;