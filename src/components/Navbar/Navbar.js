import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  Favorite, 
  Home as HomeIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Home Button */}
        <IconButton 
          color="inherit" 
          component={Link} 
          to="/" 
          sx={{ mr: 1 }}
        >
          <HomeIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Movie Explorer
          </Link>
        </Typography>

        {/* Favorites Button */}
        <Button color="inherit" component={Link} to="/favorites">
          <Favorite sx={{ mr: 1 }} />
          Favorites
        </Button>

        {/* Theme Toggle */}
        <IconButton color="inherit" onClick={toggleTheme}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;