import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(236, 127, 169)', // Main pink
      light: 'rgb(255, 184, 224)', // Lighter pink
      dark: 'rgb(190, 89, 133)', // Darker pink
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: 'rgb(255, 184, 224)', // Light pink
      contrastText: 'rgb(190, 89, 133)', // Dark pink for contrast
    },
    background: {
      default: 'rgb(255, 237, 250)', // Very light pink
      paper: '#FFFFFF',
    },
    text: {
      primary: 'rgb(190, 89, 133)', // Dark pink
      secondary: 'rgb(236, 127, 169)', // Medium pink
    },
    success: {
      main: 'rgb(200, 242, 176)', // Soft mint green
    },
    warning: {
      main: 'rgb(255, 213, 205)', // Peach
    },
    error: {
      main: 'rgb(255, 183, 183)', // Soft pink
    },
    info: {
      main: 'rgb(184, 232, 252)', // Sky blue
    },
  },
  typography: {
    fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: 'rgb(190, 89, 133)', // Dark pink as default text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: 'rgba(236, 127, 169, 0.9)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(190, 89, 133, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(190, 89, 133, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(190, 89, 133, 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(236, 127, 169)',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(190, 89, 133, 0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 184, 224, 0.2)',
          color: 'rgb(190, 89, 133)',
          borderColor: 'rgba(236, 127, 169, 0.3)',
        },
      },
    },
  },
});

// Dark theme 
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#B8E8FC', // Soft blue
      contrastText: '#2D4356',
    },
    secondary: {
      main: '#D9ACF5', // Light purple
      contrastText: '#2D4356',
    },
    background: {
      default: '#1A1A2E', // Deep navy
      paper: '#16213E', // Dark blue
    },
    text: {
      primary: '#E8F9FD', // Off-white
      secondary: '#B8E8FC', // Light blue
    },
    success: {
      main: '#C1F2B0', // Mint green
    },
    warning: {
      main: '#FFD5CD', // Peach
    },
    error: {
      main: '#FFB7B7', // Soft pink
    },
    info: {
      main: '#A8D8EA', // Pastel blue
    },
  },
  typography: {
    fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          },
        },
      },
    },
  },
});