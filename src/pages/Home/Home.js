import { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import MovieCard from '../../components/MovieCard/MovieCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchTrendingMovies, searchMovies, getGenres } from '../../services/tmdb';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
  });

  // Load trending movies and genres on initial render
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [trending, genreList] = await Promise.all([
          fetchTrendingMovies(),
          getGenres()
        ]);
        setTrendingMovies(trending);
        if (!searchQuery) {
          setMovies(trending);
        }
        setGenres(genreList);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // Handle search with filters
  const handleSearch = useCallback(async (query, newSearch = true) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      const currentPage = newSearch ? 1 : page + 1;
      const results = await searchMovies(
        query, 
        currentPage, 
        query ? filters : null
      );
      
      setMovies(prev => 
        newSearch ? results.results : [...prev, ...results.results]
      );
      setTotalPages(results.total_pages);
      setPage(currentPage);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  // Infinite scroll effect
 /* useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        page >= totalPages ||
        !searchQuery
      ) {
        return;
      }
      handleSearch(searchQuery, false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, totalPages, searchQuery, handleSearch]);

  */


  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters and trigger new search
const applyFilters = () => {
  if (searchQuery) {
    handleSearch(searchQuery, true);
  } else {
    // If no search query, apply filters to trending movies
    setLoading(true);
    const filtered = trendingMovies.filter(movie => {
      if (filters.genre && !movie.genre_ids.includes(Number(filters.genre))) return false;
      if (filters.year && new Date(movie.release_date).getFullYear() !== Number(filters.year)) return false;
      if (filters.rating && movie.vote_average < Number(filters.rating)) return false;
      return true;
    });
    setMovies(filtered);
    setLoading(false);
  }
};

  // Reset filters
  const resetFilters = () => {
    setFilters({
      genre: '',
      year: '',
      rating: '',
    });
    if (searchQuery) {
      handleSearch(searchQuery, true);
    } else {
      setMovies(trendingMovies);
    }
  };

   // Load more movies
  const loadMore = () => {
    if (searchQuery && page < totalPages) {
      handleSearch(searchQuery, false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <SearchBar onSearch={(query) => handleSearch(query, true)} />
      
      {/* Filters UI */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mt: 3, 
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Genre</InputLabel>
          <Select
            value={filters.genre}
            label="Genre"
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          label="Year"
          type="number"
          size="small"
          value={filters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          sx={{ width: 100 }}
          inputProps={{ min: 1900, max: new Date().getFullYear() }}
        />
        
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Min Rating</InputLabel>
          <Select
            value={filters.rating}
            label="Min Rating"
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            <MenuItem value="">Any Rating</MenuItem>
            <MenuItem value="7">7+</MenuItem>
            <MenuItem value="8">8+</MenuItem>
            <MenuItem value="9">9+</MenuItem>
          </Select>
        </FormControl>
        
        <Button 
          variant="contained" 
          onClick={applyFilters}
          disabled={loading}
        >
          Apply Filters
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={resetFilters}
          disabled={loading}
        >
          Reset
        </Button>
      </Box>

      {/* Results title */}
      {searchQuery ? (
        <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
          Search Results for "{searchQuery}"
          {filters.genre || filters.year || filters.rating ? ' (Filtered)' : ''}
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
          {filters.genre || filters.year || filters.rating ? 'Filtered Trending Movies' : 'Trending Movies'}
        </Typography>
      )}

      {/* Loading indicator */}
      {loading && page === 1 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Movies grid */}
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item key={`${movie.id}-${movie.release_date}`} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {/* Bottom loading indicator for infinite scroll 
          {loading && page > 1 && ( 
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )} */}

          
{/* Load More button */}
          {!loading && searchQuery && page < totalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                onClick={loadMore}
                disabled={loading}
                size="large"
              >
                Load More
              </Button>
            </Box>
          )}

          {/* Loading indicator for load more */}
          {loading && page > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* No results message */}
          {!loading && movies.length === 0 && (
            <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
              No movies found matching your criteria.
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;