import { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip, 
  CardActions, 
  Button,
  IconButton 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.id === movie.id);
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const { id, title, poster_path, vote_average, release_date } = movie;
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, { id, title, poster_path, vote_average, release_date }])
      );
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      '&:hover .favorite-icon': {
        opacity: 1
      }
    }}>
      {/* Favorite Icon */}
      <IconButton
        className="favorite-icon"
        onClick={toggleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: isFavorite ? '#00FF9C' : 'white',
          opacity: 0.7,
          transition: 'opacity 0.3s, transform 0.3s',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            opacity: 1,
            transform: 'scale(1.1)'
          }
        }}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>

      {/* Movie Poster */}
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="400"
          image={
            movie.poster_path 
              ? `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
              : '/placeholder-movie.png'
          }
          alt={movie.title}
          sx={{
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.03)'
            }
          }}
        />
      </Link>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </Typography>
        <Chip
          icon={<Star />}
          label={movie.vote_average?.toFixed(1) || 'N/A'}
          color="primary"
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>

      <CardActions>
        <Button
          component={Link}
          to={`/movie/${movie.id}`}
          size="small"
          color="primary"
          variant="contained"
          fullWidth
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;